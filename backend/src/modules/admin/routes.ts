import { Router } from 'express';
import { prisma } from '../../db/index.js';
import { requireAuth } from '../../auth/middleware.js';
import { requireRole } from '../../auth/roles.js';

const router = Router();

router.get('/admin/dashboard', requireAuth, requireRole('ADMIN'), async (_req, res) => {
  const [users, parents, admins] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: 'PARENT' } }),
    prisma.user.count({ where: { role: 'ADMIN' } }),
  ]);
  res.json({ users, parents, admins });
});

export default router;
