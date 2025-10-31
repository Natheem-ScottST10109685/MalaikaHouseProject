import { Router } from "express";
import { prisma } from "../../db/index.js";
import { requireAuth } from "../../auth/middleware.js";
import { requireRole } from "../../auth/roles.js";
import { z } from "zod";

const router = Router();

const metricsSchema = z.object({
  socialSkills:  z.number().int().min(0).max(10),
  teamwork:      z.number().int().min(0).max(10),
  participation: z.number().int().min(0).max(10),
  focus:         z.number().int().min(0).max(10),
  creativity:    z.number().int().min(0).max(10),
  effort:        z.number().int().min(0).max(10),
  discipline:    z.number().int().min(0).max(10),
});

const createSchema = z.object({
  childId: z.string().min(1),
  eventId: z.string().min(1).optional().nullable(),
  overallComment: z.string().optional().nullable(),
}).and(metricsSchema);

const updateSchema = z.object({
  childId: z.string().min(1).optional(),
  eventId: z.string().min(1).optional().nullable(),
  overallComment: z.string().optional().nullable(),
}).and(metricsSchema.partial());

function computeProgressScore(m: z.infer<typeof metricsSchema>): number {
  const arr = [
    m.socialSkills,
    m.teamwork,
    m.participation,
    m.focus,
    m.creativity,
    m.effort,
    m.discipline,
  ];
  const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
  return Math.round(avg * 2) / 2;
}

router.get("/", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const page = Math.max(parseInt(String(req.query.page ?? "1"), 10) || 1, 1);
  const pageSize = Math.min(
    Math.max(parseInt(String(req.query.pageSize ?? "20"), 10) || 20, 1),
    100
  );

  const childId = String(req.query.childId ?? "").trim();
  const eventId = String(req.query.eventId ?? "").trim();
  const from = String(req.query.from ?? "").trim();
  const to = String(req.query.to ?? "").trim();
  const q = String(req.query.q ?? "").trim();

  const where: any = {};

  if (childId) where.childId = childId;
  if (eventId) where.eventId = eventId;
  if (from || to) {
    where.createdAt = {};
    if (from) where.createdAt.gte = new Date(from);
    if (to) where.createdAt.lte = new Date(to);
  }
  if (q) {
    where.OR = [
      { overallComment: { contains: q, mode: "insensitive" } },
      { child: { firstName: { contains: q, mode: "insensitive" } } },
      { child: { lastName: { contains: q, mode: "insensitive" } } },
      { event: { title: { contains: q, mode: "insensitive" } } },
    ];
  }

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
        createdBy: { select: { id: true, email: true } },
      },
    }),
  ]);

  res.json({
    page,
    pageSize,
    total,
    hasMore: page * pageSize < total,
    items,
  });
});

router.get("/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
  const report = await prisma.studentReport.findUnique({
    where: { id },
    include: {
      child: { select: { id: true, firstName: true, lastName: true } },
      event: { select: { id: true, title: true, startAt: true, endAt: true } },
      createdBy: { select: { id: true, email: true } },
    },
  });
  if (!report) return res.status(404).json({ error: "NOT_FOUND" });
  res.json(report);
});

router.post("/", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const body = createSchema.parse(req.body);

  const child = await prisma.child.findUnique({ where: { id: body.childId } });
  if (!child) return res.status(404).json({ error: "Child not found" });

  if (body.eventId) {
    const ev = await prisma.event.findUnique({ where: { id: body.eventId } });
    if (!ev) return res.status(404).json({ error: "Event not found" });
  }

  const progressScore = computeProgressScore(body);

  const created = await prisma.studentReport.create({
    data: {
        childId: body.childId,
        eventId: body.eventId ?? null,
        createdById: req.user!.sub!,
        overallComment: body.overallComment ?? null,
        progressScore,

        socialSkills:  body.socialSkills,
        teamwork:      body.teamwork,
        participation: body.participation,
        focus:         body.focus,
        creativity:    body.creativity,
        effort:        body.effort,
        discipline:    body.discipline,
    },
    include: {
      child: { select: { id: true, firstName: true, lastName: true } },
      event: { select: { id: true, title: true, startAt: true } },
      createdBy: { select: { id: true, email: true } },
    },
  });

  res.status(201).json(created);
});

router.patch("/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
  const body = updateSchema.parse(req.body);

  if (body.childId) {
    const child = await prisma.child.findUnique({ where: { id: body.childId } });
    if (!child) return res.status(404).json({ error: "Child not found" });
  }
  if (body.eventId) {
    const ev = await prisma.event.findUnique({ where: { id: body.eventId } });
    if (!ev) return res.status(404).json({ error: "Event not found" });
  }

  const metricKeys = Object.keys(metricsSchema.shape);
  const anyMetricProvided = metricKeys.some((k) => k in body);
  const progressScore = anyMetricProvided
    ? computeProgressScore({
        socialSkills:  body.socialSkills  ?? 0,
        teamwork:      body.teamwork      ?? 0,
        participation: body.participation ?? 0,
        focus:         body.focus         ?? 0,
        creativity:    body.creativity    ?? 0,
        effort:        body.effort        ?? 0,
        discipline:    body.discipline    ?? 0,
      })
    : undefined;

  const updated = await prisma.studentReport.update({
    where: { id },
    data: {
      childId: body.childId ?? undefined,
      eventId: body.eventId ?? undefined,
      overallComment: body.overallComment ?? undefined,
      progressScore,

      socialSkills:  body.socialSkills  ?? undefined,
      teamwork:      body.teamwork      ?? undefined,
      participation: body.participation ?? undefined,
      focus:         body.focus         ?? undefined,
      creativity:    body.creativity    ?? undefined,
      effort:        body.effort        ?? undefined,
      discipline:    body.discipline    ?? undefined,
    },
    include: {
      child: { select: { id: true, firstName: true, lastName: true } },
      event: { select: { id: true, title: true, startAt: true } },
      createdBy: { select: { id: true, email: true } },
    },
  });

  res.json(updated);
});


router.delete("/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
  await prisma.studentReport.delete({ where: { id } });
  res.json({ ok: true });
});

export default router;
