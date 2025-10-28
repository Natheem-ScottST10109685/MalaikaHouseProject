import { Router } from "express";
import crypto from "crypto";
import { prisma } from "../../db/index.js";
import { sendEmail } from "../../lib/mailer.js";

const router = Router();

router.post("/api/admin/parents/invite", async (req, res) => {
  const { email, child } = req.body as { email: string; child?: any };
  if (!email) return res.status(400).json({ error: "Email required" });

  const user = await prisma.user.upsert({
    where: { email },
    update: { role: "PARENT", mustResetPassword: true, isActive: true },
    create: {
      email,
      role: "PARENT",
      mustResetPassword: true,
      isActive: true,
      passwordHash: crypto.randomBytes(32).toString("hex"),
    },
  });

  if (child?.firstName && child?.lastName) {
    await prisma.child.create({
      data: {
        firstName: child.firstName,
        lastName: child.lastName,
        dob: child.dob ? new Date(child.dob) : null,
        parentId: user.id,
      },
    });
  }

  const plain = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(plain).digest("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 48);

  await prisma.passwordResetToken.create({
    data: { userId: user.id, tokenHash, expiresAt },
  });

  const resetUrl = `${process.env.FRONTEND_ORIGIN ?? "http://localhost:5173"}/reset-password?token=${plain}`;
  await sendEmail({
    to: email,
    subject: "Set up your Malaika House parent account",
    html: `
      <p>Hello,</p>
      <p>You’ve been invited to Malaika House parent portal. Click the link below to set your password:</p>
      <p><a href="${resetUrl}">Set your password</a></p>
      <p>This link expires in 48 hours.</p>
    `,
  });

  res.json({ ok: true });
});

export default router;
