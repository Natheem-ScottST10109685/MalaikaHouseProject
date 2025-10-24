import { Router } from 'express';
import { prisma } from '../../db/index.js';
import { requireAuth } from '../../auth/middleware.js';

const router = Router();

router.get('/users/me', requireAuth, async (req, res) => {
  const me = await prisma.user.findUnique({
    where: { id: req.user!.sub },
    select: { id: true, email: true, role: true, createdAt: true }
  });
  res.json(me);
});

export default router;