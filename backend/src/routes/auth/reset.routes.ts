import { Router } from "express";
import crypto from "crypto";
import { prisma } from "../../db/index.js";
import { z } from "zod";
import { hashPassword } from "../../auth/password.js";

const router = Router();

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

router.post("/auth/validate-reset-token", async (req, res) => {
  const { token } = z.object({ token: z.string().min(1) }).parse(req.body);

  const tokenHash = hashToken(token);
  const row = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });

  const valid = !!row && !row.usedAt && row.expiresAt > new Date();
  res.json({ ok: valid });
});

router.post("/auth/reset-password", async (req, res) => {
  const { token, password } = z
    .object({
      token: z.string().min(1),
      password: z.string().min(8, "Password must be at least 8 characters"),
    })
    .parse(req.body);

  const tokenHash = hashToken(token);
  const row = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });

  if (!row || row.usedAt || row.expiresAt < new Date()) {
    return res.status(400).json({ error: "invalid_or_expired" });
  }

  const passwordHash = await hashPassword(password);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: row.userId },
      data: { passwordHash, mustResetPassword: false },
    }),
    prisma.passwordResetToken.update({
      where: { tokenHash },
      data: { usedAt: new Date() },
    }),
  ]);

  res.json({ ok: true });
});

export default router;
