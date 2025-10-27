import { Router } from "express";
import { prisma } from "../../db/index.js";
import { requireAuth } from "../../auth/middleware.js";
import { requireRole } from "../../auth/roles.js";

const router = Router();

router.get('/admin/activity', requireAuth, requireRole('ADMIN'), async (req, res) => {
    const page = Math.max(parseInt(String(req.query.page ?? '1'), 10) || 1, 1);
    const pageSize = Math.min(Math.max(parseInt(String(req.query.pageSize ?? '20'), 10) || 20, 1), 100);
    const actor = String(req.query.actor ?? '').trim();
    const action = String(req.query.action ?? '').trim();
    const targetType = String(req.query.targetType ?? '').trim();

    const where: any = {};
    if (actor) where.actorEmail = { contains: actor, mode: 'insensitive' };
    if (action) where.action = { contains: action, mode: 'insensitive' };
    if (targetType) where.targetType = { contains: targetType, mode: 'insensitive' };

    const [total, items] = await Promise.all([
        prisma.activityLog.count({ where }),
        prisma.activityLog.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize,
            select: {
                id: true, actorEmail: true, actorRole: true, action: true, status: true, targetType: true, targetId: true, createdAt: true,
            },
        }),
    ]);

    res.json({ page, pageSize, total, hasMore: page * pageSize < total, items });
});

export default router;