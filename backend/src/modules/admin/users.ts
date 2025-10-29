import { Router } from "express";
import { prisma } from "../../db/index.js";
import { requireAuth } from "../../auth/middleware.js";
import { requireRole } from "../../auth/roles.js";
import { z } from "zod";
import crypto from "crypto";
import { hashPassword } from "../../auth/password.js";
import { logActivity } from "../../log/activity.js";
import { sendEmail } from "../../lib/mailer.js";

const router = Router();

router.get("/admin/users", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const page = Math.max(parseInt(String(req.query.page ?? "1"), 10) || 1, 1);
  const pageSize = Math.min(Math.max(parseInt(String(req.query.pageSize ?? "20"), 10) || 20, 1), 100);
  const role = String(req.query.role ?? "") as "ADMIN" | "PARENT" | "PARTNER" | "STAFF" | "";
  const q = String(req.query.q ?? "").trim();

  const where: any = {};
  if (role) where.role = role;
  if (q) where.email = { contains: q, mode: "insensitive" };

  const [total, items] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: { id: true, email: true, role: true, isActive: true, createdAt: true },
    }),
  ]);

  res.json({ page, pageSize, total, items, hasMore: page * pageSize < total });
});

router.get("/admin/users/stats", requireAuth, requireRole("ADMIN"), async (_req, res) => {
  const [total, admins, parents, partners, staff] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.user.count({ where: { role: "PARENT" } }),
    prisma.user.count({ where: { role: "PARTNER" } }),
    prisma.user.count({ where: { role: "STAFF" } }),
  ]);
  res.json({ total, admins, parents, partners, staff });
});

router.post("/admin/users", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const body = z
    .object({
      email: z.string().email(),
      role: z.enum(["ADMIN", "PARENT", "PARTNER", "STAFF"]),
    })
    .parse(req.body);

  const exists = await prisma.user.findUnique({ where: { email: body.email } });
  if (exists) return res.status(409).json({ error: { code: "EMAIL_TAKEN" } });

  const tempPassword = crypto.randomBytes(9).toString("base64url");
  const passwordHash = await hashPassword(tempPassword);

  const user = await prisma.user.create({
    data: { email: body.email, passwordHash, role: body.role },
    select: { id: true, email: true, role: true },
  });

  await logActivity(req, {
    action: "USER_CREATE",
    targetType: "USER",
    targetId: user.id,
    metadata: { role: body.role, email: body.email },
  });

  res.status(201).json({ ...user, tempPassword });
});

router.post("/admin/users/invite", requireAuth, requireRole("ADMIN"), async (req, res) => {
  try {
    const { email, role } = z
      .object({
        email: z.string().email(),
        role: z.enum(["ADMIN", "PARENT", "PARTNER", "STAFF"]),
      })
      .parse(req.body);

    const user = await prisma.user.upsert({
      where: { email },
      update: { role, mustResetPassword: true, isActive: true },
      create: {
        email,
        role,
        mustResetPassword: true,
        isActive: true,
        passwordHash: crypto.randomBytes(32).toString("hex"),
      },
      select: { id: true, email: true, role: true },
    });

    const plain = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(plain).digest("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 48); // 48h

    await prisma.passwordResetToken.create({
      data: { userId: user.id, tokenHash, expiresAt },
    });

    const resetUrl = `${
      process.env.FRONTEND_ORIGIN ?? "http://localhost:5173"
    }/reset-password?token=${plain}`;

    await sendEmail({
      to: email,
      subject: "Set up your Malaika House account",
      html: `
        <p>Hello,</p>
        <p>You’ve been invited to join the Malaika House platform.</p>
        <p><a href="${resetUrl}">Click here to set your password</a> (link expires in 48 hours).</p>
      `,
    });

    res.json({ ok: true, user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create user" });
  }
});

router.get("/admin/users/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) return res.status(404).json({ error: { code: "NOT_FOUND" } });
  res.json(user);
});


router.put("/admin/users/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
  const body = z
    .object({
      email: z.string().email().optional(),
      role: z.enum(["ADMIN", "PARENT", "PARTNER", "STAFF"]).optional(),
      isActive: z.boolean().optional(),
    })
    .parse(req.body);

  try {
    const updated = await prisma.user.update({
      where: { id },
      data: body,
      select: { id: true, email: true, role: true, isActive: true, updatedAt: true },
    });

    await logActivity(req, {
      action: "USER_UPDATE",
      targetType: "USER",
      targetId: updated.id,
      metadata: { role: updated.role, isActive: updated.isActive },
    });

    res.json(updated);
  } catch (e) {
    if ((e as any)?.code === "P2002") {
      return res.status(409).json({ error: { code: "EMAIL_TAKEN" } });
    }
    throw e;
  }
});


router.post("/admin/users/:id/disable", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);

  const updated = await prisma.user.update({
    where: { id },
    data: { isActive: false },
    select: { id: true, email: true, role: true, isActive: true, updatedAt: true },
  });

  await logActivity(req, {
    action: "USER_DISABLE",
    targetType: "USER",
    targetId: updated.id,
    metadata: { isActive: updated.isActive },
  });

  res.json(updated);
});

router.delete("/admin/users/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);

  await prisma.passwordResetToken.deleteMany({ where: { userId: id } });
  await prisma.session.deleteMany({ where: { userId: id } });

  await prisma.user.delete({ where: { id } });

  await logActivity(req, {
    action: "USER_DELETE",
    targetType: "USER",
    targetId: id,
  });

  res.status(204).send();
});

export default router;
