import { Router } from "express";
import { prisma } from "../../db/index.js";
import { requireAuth } from "../../auth/middleware.js";
import { z } from "zod";

const router = Router();

router.get("/notifications/unread-count", requireAuth, async (req, res) => {
  const userId = req.user!.sub;
  const count = await prisma.notification.count({
    where: {
      isRead: false,
      OR: [{ userId }, { userId: null }],
    },
  });
  res.json({ count });
});

router.get("/notifications", requireAuth, async (req, res) => {
  const limit = Math.max(1, Math.min(50, parseInt(String(req.query.limit ?? "10"), 10) || 10));
  const items = await prisma.notification.findMany({
    where: { OR: [{ userId: req.user!.sub }, { userId: null }] },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  res.json({ items });
});

router.patch("/notifications/:id/read", requireAuth, async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
  const { isRead } = z.object({ isRead: z.boolean() }).parse(req.body);


  const n = await prisma.notification.findUnique({ where: { id } });
  if (!n || !(n.userId === null || n.userId === req.user!.sub)) {
    return res.status(404).json({ error: "NOT_FOUND" });
  }

  const updated = await prisma.notification.update({
    where: { id },
    data: { isRead },
  });

  res.json(updated);
});

router.post("/notifications/mark-all-read", requireAuth, async (req, res) => {
  await prisma.notification.updateMany({
    where: { OR: [{ userId: req.user!.sub }, { userId: null }] },
    data: { isRead: true },
  });
  res.json({ ok: true });
});

export default router;
