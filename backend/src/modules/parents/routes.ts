import { Router } from 'express';
import { requireAuth } from '../../auth/middleware.js';
import { requireRole } from '../../auth/roles.js';
import { prisma } from "../../db/index.js";

const router = Router();

router.get('/parent/dashboard', requireAuth, requireRole('PARENT'), async (req, res) => {
  res.json({ message: `Welcome, user ${req.user!.sub}`, role: req.user!.role });
});

router.get("/parent/overview", requireAuth, async (req, res) => {
  const userId = req.user!.sub;

  const me = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, role: true },
  });

  const children = await prisma.child.findMany({
    where: { parentId: userId },
    select: { id: true, firstName: true, lastName: true, grade: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  const kpis = {
    sessionsRemaining: 2,
    upcomingCount: 1,
    progressScore: "—",
    planName: "—",
    autoRenewDate: null as Date | null,
  };

  res.json({ me, children, kpis });
});

router.get("/parent/sessions", requireAuth, async (req, res) => {
  const userId = req.user!.sub;

  const kids = await prisma.child.findMany({
    where: { parentId: userId },
    select: { id: true },
  });
  const childIds = kids.map(k => k.id);
  if (childIds.length === 0) return res.json({ upcoming: [], recent: [] });

  const now = new Date();

  const upcoming = await prisma.appointment.findMany({
    where: { childId: { in: childIds }, startAt: { gte: now } },
    orderBy: { startAt: "asc" },
    take: 10,
    select: { id: true, startAt: true, endAt: true, type: true, location: true, status: true },
  });

  const recent = await prisma.appointment.findMany({
    where: { childId: { in: childIds }, startAt: { lt: now } },
    orderBy: { startAt: "desc" },
    take: 10,
    select: { id: true, startAt: true, endAt: true, type: true, location: true, status: true },
  });

  res.json({ upcoming, recent });
});

export default router;