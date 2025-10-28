import { Router } from "express";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "../db/index.js";

const router = Router();

function hashToken(t: string) {
  return crypto.createHash("sha256").update(t).digest("hex");
}

router.post("/api/auth/validate-reset-token", async (req, res) => {
  const { token } = req.body as { token: string };
  if (!token) return res.status(400).json({ ok: false });

  const tokenHash = hashToken(token);
  const row = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });
  if (!row || row.usedAt || row.expiresAt < new Date()) return res.json({ ok: false });
  res.json({ ok: true });
});

router.post("/api/auth/reset-password", async (req, res) => {
  const { token, password } = req.body as { token: string; password: string };
  if (!token || !password) return res.status(400).json({ error: "token and password required" });

  const tokenHash = hashToken(token);
  const row = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });
  if (!row || row.usedAt || row.expiresAt < new Date()) {
    return res.status(400).json({ error: "invalid_or_expired" });
  }

  const hash = await bcrypt.hash(password, 12);
  await prisma.$transaction([
    prisma.user.update({ where: { id: row.userId }, data: { passwordHash: hash, mustResetPassword: false } }),
    prisma.passwordResetToken.update({ where: { tokenHash }, data: { usedAt: new Date() } }),
  ]);

  res.json({ ok: true });
});

export default router;
