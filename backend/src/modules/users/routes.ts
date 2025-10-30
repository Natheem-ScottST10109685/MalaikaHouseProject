import { Router } from 'express';
import { prisma } from '../../db/index.js';
import { requireAuth } from '../../auth/middleware.js';
import { z } from 'zod';
import { verifyPassword, hashPassword } from '../../auth/password.js';
import { logActivity } from '../../log/activity.js';

const router = Router();

router.get("/users/me", requireAuth, async (req, res) => {
  const me = await prisma.user.findUnique({
    where: { id: req.user!.sub },
    select: { id: true, email: true, role: true, createdAt: true, updatedAt: true },
  });
  res.json(me);
});

router.patch("/users/me", requireAuth, async (req, res) => {
  const body = z.object({
    email: z.string().email().optional(),

    currentPassword: z.string().min(1).optional(),
    newPassword: z.string().min(8).optional(),
  }).parse(req.body);

  const updates: any = {};

  if (body.email) {
    const exists = await prisma.user.findUnique({ where: { email: body.email } });
    if (exists && exists.id !== req.user!.sub) {
      return res.status(409).json({ error: { code: "EMAIL_TAKEN" } });
    }
    updates.email = body.email;
  }

  if (body.currentPassword || body.newPassword) {
    if (!body.currentPassword || !body.newPassword) {
      return res.status(400).json({ error: { code: "PASSWORD_FIELDS_REQUIRED" } });
    }
    const me = await prisma.user.findUnique({ where: { id: req.user!.sub } });
    if (!me) return res.status(404).json({ error: { code: "NOT_FOUND" } });

    const ok = await verifyPassword(body.currentPassword, me.passwordHash);
    if (!ok) return res.status(400).json({ error: { code: "CURRENT_PASSWORD_INCORRECT" } });

    updates.passwordHash = await hashPassword(body.newPassword);
    updates.mustResetPassword = false;
  }

  if (Object.keys(updates).length === 0) {
    return res.json({ ok: true });
  }

  const updated = await prisma.user.update({
    where: { id: req.user!.sub },
    data: updates,
    select: { id: true, email: true, role: true, updatedAt: true },
  });

  await logActivity(req, {
    action: "USER_SELF_UPDATE",
    targetType: "USER",
    targetId: updated.id,
    metadata: { updatedFields: Object.keys(updates) },
  });

  res.json(updated);
});

export default router;