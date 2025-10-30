import { Router } from "express";
import { prisma } from "../../db/index.js";
import { requireAuth } from "../../auth/middleware.js";
import { requireRole } from "../../auth/roles.js";
import { z } from "zod";

const router = Router();

router.get("/admin/notifications", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const limit = Math.min(Math.max(parseInt(String(req.query.limit ?? "20"), 10) || 20, 1), 100);
  const cursor = String(req.query.cursor ?? "");

  const where = {};
  const orderBy = { createdAt: "desc" as const };

  const items = await prisma.notification.findMany({
    where,
    orderBy,
    take: limit + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  });

  let nextCursor: string | null = null;
  if (items.length > limit) {
    const next = items.pop()!;
    nextCursor = next.id;
  }

  res.json({ items, nextCursor });
});

router.get("/admin/notifications/unread-count", requireAuth, requireRole("ADMIN"), async (_req, res) => {
  const count = await prisma.notification.count({ where: { isRead: false } });
  res.json({ count });
});

router.patch("/admin/notifications/:id/read", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
  const { isRead } = z.object({ isRead: z.boolean() }).parse(req.body);

  const updated = await prisma.notification.update({
    where: { id },
    data: {
      isRead,
      readAt: isRead ? new Date() : null,
    },
  });

  res.json(updated);
});

router.post("/admin/notifications/mark-all-read", requireAuth, requireRole("ADMIN"), async (_req, res) => {
  await prisma.notification.updateMany({
    where: { isRead: false },
    data: { isRead: true, readAt: new Date() },
  });
  res.json({ ok: true });
});

export default router;
