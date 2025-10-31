import { Router } from 'express';
import { prisma } from '../db/index.js';
import { z } from 'zod';
import { hashPassword, verifyPassword } from './password.js';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  accessMs,
  refreshMs
} from './tokens.js';
import { v4 as uuid } from 'uuid';
import { sha256base64url } from './tokenStore.js';
import { logActivity } from '../log/activity.js';

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
  } catch (e) {
    next(e);
  }
});

router.post('/auth/login', async (req, res, next) => {
  try {
    const { email, password } = credSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS' } });

    const ok = await verifyPassword(user.passwordHash, password);
    if (!ok) return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS' } });

    const refreshToken = signRefreshToken({ sub: user.id, jti: uuid() });
    const accessToken = signAccessToken({ sub: user.id, role: user.role });

    const refreshTokenHash = sha256base64url(refreshToken);

    await prisma.session.create({
      data: {
        userId: user.id,
        refreshTokenHash,
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
    });

    res.json({
      accessToken,
      expiresIn: accessMs(),
      user: { id: user.id, email: user.email, role: user.role },
      dashboard: 
        user.role === "ADMIN"
        ? "/admin"
        : user.role === "PARTNER"
        ? "/external-parent"
        : user.role === "STAFF"
        ? "/staff"
        : "/parent",
    });

    await logActivity(req, {
      action: 'LOGIN',
      status: 'FAIL',
      targetType: 'AUTH',
      metadata: { reason: 'INVALID_CREDENTIALS', email },
      actorEmailOverride: email,
    });

    await logActivity(req, {
      action: 'LOGIN',
      status: 'SUCCESS',
      targetType: 'AUTH',
      targetId: user.id,
    });

  } catch (e) {
    next(e);
  }
});

router.post('/auth/refresh', async (req, res, next) => {
  try {
    const token = req.cookies?.refresh_token;
    if (!token) return res.status(401).json({ error: { code: 'NO_REFRESH' } });

    const payload = verifyRefreshToken(token) as any;

    const currentHash = sha256base64url(token);
    const session = await prisma.session.findUnique({ where: { refreshTokenHash: currentHash } });

    if (!session || session.expiresAt < new Date()) {
      return res.status(401).json({ error: { code: 'REFRESH_EXPIRED' } });
    }

    await prisma.session.delete({ where: { refreshTokenHash: currentHash } });

    const newRefresh = signRefreshToken({ sub: payload.sub, jti: uuid() });
    const newHash = sha256base64url(newRefresh);

    await prisma.session.create({
      data: {
        userId: payload.sub,
        refreshTokenHash: newHash,
        expiresAt: new Date(Date.now() + refreshMs()),
        ip: req.ip,
        userAgent: req.headers['user-agent'] ?? undefined
      }
    });

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { role: true }
    });
    const newAccess = signAccessToken({ sub: payload.sub, role: user?.role });

    await logActivity(req, {
      action: 'REFRESH_ROTATE',
      targetType: 'AUTH',
      targetId: payload.sub,
    });

    res
      .cookie('refresh_token', newRefresh, {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === 'true',
        sameSite: 'lax',
        maxAge: refreshMs()
      })
      .json({ accessToken: newAccess, expiresIn: accessMs() });
  
  } catch (e) {
    next(e);
  }
});

router.post('/auth/logout', async (req, res, next) => {
  try {
    const token = req.cookies?.refresh_token;
    if (token) {
      const hash = sha256base64url(token);
      await prisma.session.delete({ where: { refreshTokenHash: hash } }).catch(() => {});
    }
    res.clearCookie('refresh_token').json({ ok: true });
  } catch (e) {
    next(e);
  }

  await logActivity(req, {
    action: 'LOGOUT',
    targetType: 'AUTH',
  });

});

export default router;
