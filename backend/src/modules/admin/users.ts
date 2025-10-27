import { Router } from 'express';
import { prisma } from '../../db/index.js';
import { requireAuth } from '../../auth/middleware.js';
import { requireRole } from '../../auth/roles.js';
import crypto from 'crypto';
import { z } from 'zod';
import { hashPassword } from '../../auth/password.js';
import { logActivity } from '../../log/activity.js';

const router = Router();

router.get('/admin/users', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const page = Math.max(parseInt(String(req.query.page ?? '1'), 10) || 1, 1);
  const pageSize = Math.min(Math.max(parseInt(String(req.query.pageSize ?? '20'), 10) || 20, 1), 100);
  const role = String(req.query.role ?? '') as 'ADMIN' | 'PARENT' | 'PARTNER' | 'STAFF' | '';
  const q = String(req.query.q ?? '').trim();

  const where: any = {};
  if (role) where.role = role;
  if (q) where.email = { contains: q, mode: 'insensitive' };

  const [total, items] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: { id: true, email: true, role: true, isActive: true, createdAt: true }
    })
  ]);

  res.json({
    page, pageSize, total, items,
    hasMore: page * pageSize < total
  });
});

router.get('/admin/users/stats', requireAuth, requireRole('ADMIN'), async (_req, res) => {
  const [total, admins, parents, partners, staff] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: 'ADMIN' } }),
    prisma.user.count({ where: { role: 'PARENT' } }),
    prisma.user.count({ where: { role: 'PARTNER' } }),
    prisma.user.count({ where: { role: 'STAFF' } }),
  ]);
  res.json({ total, admins, parents, partners, staff });
});

router.post('/admin/users', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const body = z.object({
    email: z.string().email(),
    role: z.enum(['ADMIN', 'PARENT', 'PARTNER', 'STAFF']),
  }).parse(req.body);

  const exists = await prisma.user.findUnique({ where: { email: body.email }});
  if (exists) return res.status(409).json({ error: { code: 'EMAIL_TAKEN' }});

  const tempPassword = crypto.randomBytes(9).toString('base64url');
  const passwordHash = await hashPassword(tempPassword);

  const user = await prisma.user.create({
    data: {
      email: body.email,
      passwordHash,
      role: body.role,
    },
    select: { id: true, email: true, role: true }
  });

  await logActivity(req, {
    action: 'USER_CREATE',
    targetType: 'USER',
    targetId: user.id,
    metadata: { role: body.role, email: body.email },
  });

  res.status(201).json({ ...user, tempPassword });
});

router.get('/admin/users/:id', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, role: true, isActive: true, createdAt: true, updatedAt: true }
  });

  if (!user) return res.status(404).json({ error: { code: 'NOT_FOUND' } });
  res.json(user);
});

router.patch('/admin/users/:id', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
  const body = z.object({
    role: z.enum(['ADMIN','PARENT','PARTNER','STAFF']).optional(),
    isActive: z.boolean().optional(),
  }).parse(req.body);

  const updated = await prisma.user.update({
    where: { id },
    data: body,
    select: { id: true, email: true, role: true, isActive: true, updatedAt: true }
  });

  await logActivity(req, {
    action: 'USER_UPDATE',
    targetType: 'USER',
    targetId: updated.id,
    metadata: { role: updated.role, isActive: updated.isActive },
  });

  res.json(updated);
});

export default router;
