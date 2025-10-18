import { Router } from 'express';
import { prisma } from '../db/index.js';
import { z } from 'zod';
import { hashPassword, verifyPassword } from './password.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken, accessMs, refreshMs } from './tokens.js';
import { v4 as uuid } from 'uuid';

const router = Router();

const credSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

router.post('/auth/register', async (req, res, next) => {
  try {
    const { email, password } = credSchema.parse(req.body);
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ error: { code: 'EMAIL_TAKEN' } });

    const user = await prisma.user.create({
      data: { email, passwordHash: await hashPassword(password) }
    });

    res.status(201).json({ id: user.id, email: user.email });
  } catch (e) { next(e); }
});

router.post('/auth/login', async (req, res, next) => {
  try {
    const { email, password } = credSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS' } });

    const ok = await verifyPassword(user.passwordHash, password);
    if (!ok) return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS' } });

    const refreshToken = signRefreshToken({ sub: user.id, jti: uuid() });
    const accessToken  = signAccessToken({ sub: user.id, role: user.role });

    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + refreshMs()),
        ip: req.ip,
        userAgent: req.headers['user-agent'] ?? undefined
      }
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true',
      sameSite: 'lax',
      maxAge: refreshMs()
    }).json({ accessToken, expiresIn: accessMs() });
  } catch (e) { next(e); }
});

router.post('/auth/refresh', async (req, res, next) => {
  try {
    const token = req.cookies?.refresh_token;
    if (!token) return res.status(401).json({ error: { code: 'NO_REFRESH' } });

    const payload = verifyRefreshToken(token) as any;
    const session = await prisma.session.findUnique({ where: { refreshToken: token } });

    if (!session || session.expiresAt < new Date()) {
      return res.status(401).json({ error: { code: 'REFRESH_EXPIRED' } });
    }

    await prisma.session.delete({ where: { refreshToken: token } });
    const newRefresh = signRefreshToken({ sub: payload.sub, jti: uuid() });
    await prisma.session.create({
      data: { userId: payload.sub, refreshToken: newRefresh, expiresAt: new Date(Date.now() + refreshMs()) }
    });

    const newAccess = signAccessToken({ sub: payload.sub });
    res.cookie('refresh_token', newRefresh, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true',
      sameSite: 'lax',
      maxAge: refreshMs()
    }).json({ accessToken: newAccess, expiresIn: accessMs() });
  } catch (e) { next(e); }
});

router.post('/auth/logout', async (req, res, next) => {
  try {
    const token = req.cookies?.refresh_token;
    if (token) await prisma.session.delete({ where: { refreshToken: token } }).catch(() => {});
    res.clearCookie('refresh_token').json({ ok: true });
  } catch (e) { next(e); }
});

export default router;