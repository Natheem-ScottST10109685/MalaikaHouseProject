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

router.get("/admin/events", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const q = String(req.query.q ?? "").trim();
  const clubId = String(req.query.clubId ?? "").trim();

  const where: any = {};
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { type: { contains: q, mode: "insensitive" } },
      { facilitator: { contains: q, mode: "insensitive" } },
      { location: { contains: q, mode: "insensitive" } },
    ];
  }
  if (clubId) where.clubId = clubId;

  const events = await prisma.event.findMany({
    where,
    orderBy: { startAt: "asc" },
    include: { club: { select: { id: true, name: true } } },
  });

  res.json(events);
});

router.get("/admin/events/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
  const ev = await prisma.event.findUnique({
    where: { id },
    include: { club: { select: { id: true, name: true } } },
  });
  if (!ev) return res.status(404).json({ error: "NOT_FOUND" });
  res.json(ev);
});

router.post("/admin/events", requireAuth, requireRole("ADMIN"), async (req, res) => {
  try {
    const Schema = z.object({
      title: z.string().min(1),
      type: z.string().min(1),

      startAt: z.string().datetime(),
      endAt: z.string().datetime(),

      location: z.string().optional(),
      facilitator: z.string().optional(),
      status: z.string().default("Upcoming").optional(),

      audience: z.preprocess(
        (v) => (typeof v === "string" ? v.toUpperCase() : v),
        z.enum(["INTERNAL", "EXTERNAL", "BOTH"]).default("INTERNAL")
      ).optional(),

      visibility: z.preprocess(
        (v) => (typeof v === "string" ? v.toUpperCase() : v),
        z.enum(["PUBLIC", "PRIVATE"]).default("PRIVATE")
      ).optional(),

      capacity: z.number().int().positive().optional(),
      price: z.number().nonnegative().optional(),
      clubId: z.string().optional(),
    });

    const body = Schema.parse(req.body);

    const event = await prisma.event.create({
      data: {
        title: body.title,
        type: body.type,
        startAt: new Date(body.startAt),
        endAt: new Date(body.endAt),

        location: body.location ?? null,
        facilitator: body.facilitator ?? null,
        status: body.status ?? "Upcoming",

        audience: body.audience ?? "INTERNAL",
        visibility: body.visibility ?? "PRIVATE",

        capacity: body.capacity ?? null,
        price: body.price ?? null,
        ...(body.clubId ? { club: { connect: { id: body.clubId } } } : {}),

      },
      include: {
        club: true,
      },
    });
    res.status(201).json(event);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json(err.issues);
    }
    console.error(err);
    res.status(400).json({ error: "Failed to create event" });
  }
});

router.patch("/admin/events/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
  const body = z.object({
    title: z.string().optional(),
    type: z.string().optional(),
    startAt: z.string().datetime().optional(),
    endAt: z.string().datetime().optional(),
    location: z.string().optional(),
    facilitator: z.string().optional(),
    status: z.string().optional(),
    audience: z.enum(["INTERNAL", "EXTERNAL", "BOTH"]).optional(),
    visibility: z.enum(["PUBLIC", "PRIVATE"]).optional(),
    capacity: z.number().int().positive().nullable().optional(),
    price: z.number().nonnegative().nullable().optional(),
    clubId: z.string().nullable().optional(),
  }).parse(req.body);

  const updated = await prisma.event.update({
    where: { id },
    data: {
      ...("title" in body ? { title: body.title! } : {}),
      ...("type" in body ? { type: body.type! } : {}),
      ...("startAt" in body ? { startAt: new Date(body.startAt!) } : {}),
      ...("endAt" in body ? { endAt: new Date(body.endAt!) } : {}),
      ...("location" in body ? { location: body.location ?? null } : {}),
      ...("facilitator" in body ? { facilitator: body.facilitator ?? null } : {}),
      ...("status" in body ? { status: body.status! } : {}),
      ...("audience" in body ? { audience: body.audience! } : {}),
      ...("visibility" in body ? { visibility: body.visibility! } : {}),
      ...("capacity" in body ? { capacity: body.capacity ?? null } : {}),
      ...("price" in body ? { price: body.price ?? null } : {}),
      ...( "clubId" in body
          ? (body.clubId ? { club: { connect: { id: body.clubId } } } : { club: { disconnect: true } })
          : {}),
    },
    include: { club: { select: { id: true, name: true } } },
  });

  res.json(updated);
});

router.delete("/admin/events/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
  await prisma.event.delete({ where: { id } });
  res.json({ ok: true });
});

router.get('/admin/clubs', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const active = String(req.query.active ?? "").toLowerCase();
  const where = active === "true" ? { /* active: true */ } : {};
  const clubs = await prisma.club.findMany({ where, orderBy: { createdAt: 'desc' } });
  res.json(clubs);
});

router.get('/admin/clubs/:id', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);

  const club = await prisma.club.findUnique({
    where: { id },
    select: {
      id: true, name: true, description: true, tier: true, monthlyFee: true, sessions: true,
      createdAt: true, updatedAt: true,
    },
  });
  if (!club) return res.status(404).json({ error: "NOT_FOUND" });

  const events = await prisma.event.findMany({
    where: { clubId: id },
    orderBy: { startAt: "asc" },
    select: {
      id: true, title: true, type: true, startAt: true, endAt: true,
      location: true, facilitator: true, status: true, audience: true, visibility: true,
      capacity: true, price: true,
    },
  });

  res.json({ club, events });
});

router.post('/admin/clubs', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const body = z.object({
    name: z.string().min(2),
    description: z.string().optional(),
    tier: z.string().optional(),
    monthlyFee: z.number().optional(),
    sessions: z.number().optional(),
  }).parse(req.body);

  const club = await prisma.club.create({ data: body });
  await logActivity(req, { action: 'CLUB_CREATE', targetType: 'CLUB', targetId: club.id });
  res.status(201).json(club);
});

router.patch('/admin/clubs/:id', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updated = await prisma.club.update({ where: { id }, data });
  await logActivity(req, { action: 'CLUB_UPDATE', targetType: 'CLUB', targetId: id });
  res.json(updated);
});

router.delete('/admin/clubs/:id', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const { id } = req.params;
  await prisma.club.delete({ where: { id } });
  await logActivity(req, { action: 'CLUB_DELETE', targetType: 'CLUB', targetId: id });
  res.json({ ok: true });
});

export default router;
