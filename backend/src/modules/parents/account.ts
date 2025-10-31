import { Router } from "express";
import { prisma } from "../../db/index.js";
import { requireAuth, requireAuthAdmin } from "../../auth/middleware.js";
import { z } from "zod";
import { verifyPassword, hashPassword } from "../../auth/password.js";

const router = Router();

router.get("/parent/profile", requireAuth, async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "UNAUTHENTICATED" });
  const userId = req.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, role: true, createdAt: true, updatedAt: true },
  });

  const children = await prisma.child.findMany({
    where: { parentId: userId },
    select: {
      id: true, firstName: true, lastName: true, grade: true,
      dateOfBirth: true, isActive: true, createdAt: true,
    },
    orderBy: { firstName: "asc" },
  });

  res.json({ user, children });
});

router.patch("/parent/profile", requireAuth, async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "UNAUTHENTICATED" });
  const userId = req.user.id;

  const body = z.object({ email: z.string().email().optional() }).parse(req.body);
  if (!Object.keys(body).length) return res.json({ ok: true });

  const updated = await prisma.user.update({
    where: { id: userId },
    data: body,
    select: { id: true, email: true, updatedAt: true },
  });

  res.json({ ok: true, user: updated });
});

router.post("/parent/change-password", requireAuth, async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "UNAUTHENTICATED" });
  const userId = req.user.id;

  const { currentPassword, newPassword } = z.object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(8),
  }).parse(req.body);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { passwordHash: true },
  });
  if (!user) return res.status(404).json({ error: "NOT_FOUND" });

  const ok = await verifyPassword(currentPassword, user.passwordHash);
  if (!ok) return res.status(400).json({ error: "INVALID_CURRENT_PASSWORD" });

  const passwordHash = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash, mustResetPassword: false },
  });

  res.json({ ok: true });
});

router.get("/me/payments", requireAuth, async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "UNAUTHENTICATED" });
  const userId = req.user.id;

  const rows = await prisma.payment.findMany({
    where: { parentId: userId },
    orderBy: { createdAt: "desc" },
  });
  res.json(rows);
});

router.post("/test/create-payment", requireAuthAdmin, async (req, res) => {
  const {
    parentId,
    amountCents,
    currency = "ZAR",
    status = "PAID",
    method = "EFT",
    reference,
    notes,
  } = req.body;

  const created = await prisma.payment.create({
    data: { parentId, amountCents, currency, status, method, reference, notes },
  });
  res.json(created);
});

export default router;
