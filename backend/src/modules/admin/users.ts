import { Router } from 'express';
import { prisma } from '../../db/index.js';
import { requireAuth } from '../../auth/middleware.js';
import { requireRole } from '../../auth/roles.js';

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
      select: { id: true, email: true, role: true, createdAt: true }
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

export default router;
