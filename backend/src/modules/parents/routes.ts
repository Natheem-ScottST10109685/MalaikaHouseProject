import { Router } from 'express';
import { requireAuth } from '../../auth/middleware.js';
import { requireRole } from '../../auth/roles.js';

const router = Router();

router.get('/parent/dashboard', requireAuth, requireRole('PARENT'), async (req, res) => {
  res.json({ message: `Welcome, user ${req.user!.sub}`, role: req.user!.role });
});

export default router;