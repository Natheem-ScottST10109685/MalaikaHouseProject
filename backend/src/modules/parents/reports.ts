import { Router } from "express";
import { prisma } from "../../db/index.js";
import { requireAuth } from "../../auth/middleware.js";
import { z } from "zod";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  const parentId = req.user!.sub!;
  const childId = String(req.query.childId ?? "").trim();
  const page = Math.max(parseInt(String(req.query.page ?? "1"), 10) || 1, 1);
  const pageSize = Math.min(Math.max(parseInt(String(req.query.pageSize ?? "20"), 10) || 20, 1), 100);

  const where: any = {
    child: { parentId },
  };
  if (childId) where.childId = childId;

  const [total, items] = await Promise.all([
    prisma.studentReport.count({ where }),
    prisma.studentReport.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        child: { select: { id: true, firstName: true, lastName: true } },
        event: { select: { id: true, title: true, startAt: true } },
      },
    }),
  ]);

  res.json({ page, pageSize, total, hasMore: page * pageSize < total, items });
});

router.get("/summary", requireAuth, async (req, res) => {
  const parentId = req.user!.sub!;
  const childId = String(req.query.childId ?? "").trim() || undefined;

  const whereBase: any = { child: { parentId } };
  const where = childId ? { ...whereBase, childId } : whereBase;

  const overallAgg = await prisma.studentReport.aggregate({
    where,
    _avg: { progressScore: true },
    _count: { _all: true },
  });

  const groups = await prisma.studentReport.groupBy({
    by: ["childId"],
    where: whereBase,
    _avg: { progressScore: true },
    _count: { _all: true },
  });

  const childIds = groups.map(g => g.childId);
  const childMap = new Map<string, { firstName: string; lastName: string }>();
  if (childIds.length) {
    const kids = await prisma.child.findMany({
      where: { id: { in: childIds } },
      select: { id: true, firstName: true, lastName: true },
    });
    kids.forEach(k => childMap.set(k.id, { firstName: k.firstName, lastName: k.lastName }));
  }

  const perChild = groups.map(g => ({
    childId: g.childId,
    avg: g._avg.progressScore ?? null,
    count: g._count._all,
    child: childMap.get(g.childId) ?? null,
  }));

  res.json({
    overallAvg: overallAgg._avg.progressScore ?? null,
    overallCount: overallAgg._count._all ?? 0,
    perChild,
  });
});

router.get("/:id", requireAuth, async (req, res) => {
  const parentId = req.user!.sub!;
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);

  const report = await prisma.studentReport.findFirst({
    where: { id, child: { parentId } },
    include: {
      child: { select: { id: true, firstName: true, lastName: true } },
      event: { select: { id: true, title: true, startAt: true, location: true } },
      createdBy: { select: { id: true, email: true } },
    },
  });

  if (!report) return res.status(404).json({ error: "NOT_FOUND" });
  res.json(report);
});

export default router;
