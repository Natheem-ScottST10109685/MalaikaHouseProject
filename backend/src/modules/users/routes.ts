import { Router } from 'express';
import { prisma } from '../../db/index.js';

const router = Router();

router.get('/users/:id', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: String(req.params.id) },
    select: { id: true, email: true, role: true }
  });
  if (!user) return res.status(404).json({ error: { code: 'NOT_FOUND' } });
  res.json(user);
});

export default router;
