import { Router } from "express";
import crypto from "crypto";
import { prisma } from "../../db/index.js";
import { sendEmail } from "../../lib/mailer.js";
import { requireAuthAdmin } from "../../auth/middleware.js";

const router = Router();

router.post("/api/admin/users/invite", requireAuthAdmin, async (req, res) => {
    const { email, role } = req.body as { email: string; role: string };
    if (!email || !role) return res.status(400).json({ error: "email and role required" });

    const user = await prisma.user.upsert({
        where: { email },
        update: { role, isActive: true, mustResetPassword: true },
        create: {
            email,
            role,
            isActive: true,
            mustResetPassword: true,
            passwordHash: crypto.randomBytes(32).toString("hex"),
        },
    });

    const plain = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(plain).digest("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 48);

    await prisma.passwordResetToken.create({
        data: { userId: user.id, tokenHash, expiresAt },
    });

    const base = process.env.FRONTEND_ORIGIN ?? "http://localhost:5173";
    const resetUrl = `${base}/reset-password?token=${plain}`;

    await sendEmail({
        to: email,
        subject: "Your Malaika House account invite",
        html: `
        <p>Hello,</p>
        <p>You've been invited to the Malaika House portal as <b>${role}</b>.</p>
        <p>Click the link below to set your password:</p>
        <p><a href="${resetUrl}">Set your password</a></p>
        <p><small>THis link expires in 48 hours.</small></p>
        `,
    });

    return res.json({ ok: true, user: { id: user.id, email: user.email, role: user.role } });
});

export default router;