import { Router } from 'express';
import { prisma } from '../../db/index.js';
import { requireAuth } from '../../auth/middleware.js';
import { requireRole } from '../../auth/roles.js';
import { z } from 'zod';

const router = Router();

router.get('/admin/notifications', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const limit = Math.min(parseInt(String(req.query.limit ?? '20'), 10) || 20, 100);
  const items = await prisma.notification.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
  res.json(items);
});

router.get('/admin/notifications/unread-count', requireAuth, requireRole('ADMIN'), async (_req, res) => {
  const count = await prisma.notification.count({ where: { read: false } });
  res.json({ count });
});

router.patch('/admin/notifications/:id/read', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const params = z.object({ id: z.string().min(1) }).parse(req.params);
  const body = z.object({ read: z.boolean() }).parse(req.body);
  const updated = await prisma.notification.update({
    where: { id: params.id },
    data: { read: body.read },
  });
  res.json(updated);
});

export default router;
