import { Router } from "express";
import { prisma } from "../../db/index.js";
import { requireAuth } from "../../auth/middleware.js";
import { z } from "zod";

const router = Router();

router.get("/parent/appointments", requireAuth, async (req, res) => {
  const userId = req.user!.sub;

  const kids = await prisma.child.findMany({
    where: { parentId: userId },
    select: { id: true, firstName: true, lastName: true },
  });
  const childIds = kids.map(k => k.id);
  if (!childIds.length) return res.json({ items: [] });

  const items = await prisma.appointment.findMany({
    where: { childId: { in: childIds } },
    orderBy: { startAt: "asc" },
    select: {
      id: true, type: true, location: true, status: true,
      startAt: true, endAt: true,
      child: { select: { id: true, firstName: true, lastName: true } },
      event: { select: { id: true, title: true, type: true } }
    }
  });

  res.json({ items });
});

router.post("/parent/appointments", requireAuth, async (req, res) => {
  const userId = req.user!.sub;

  const body = z.object({
    childId: z.string().min(1),
    eventId: z.string().min(1),
  }).parse(req.body);

  const child = await prisma.child.findFirst({
    where: { id: body.childId, parentId: userId },
    select: { id: true }
  });
  if (!child) return res.status(403).json({ error: "CHILD_NOT_OWNED" });

  const event = await prisma.event.findUnique({
    where: { id: body.eventId },
    select: { id: true, title: true, type: true, startAt: true, endAt: true, location: true, status: true }
  });
  if (!event) return res.status(404).json({ error: "EVENT_NOT_FOUND" });

  const existing = await prisma.appointment.findFirst({
    where: { childId: body.childId, eventId: body.eventId }
  });
  if (existing) return res.status(409).json({ error: "ALREADY_BOOKED" });

  const overlap = await prisma.appointment.findFirst({
    where: {
      childId: body.childId,
      startAt: { lt: event.endAt },
      endAt:   { gt: event.startAt },
    },
    select: { id: true }
  });
  if (overlap) return res.status(409).json({ error: "TIME_CONFLICT" });

  const appt = await prisma.appointment.create({
    data: {
      childId: body.childId,
      eventId: body.eventId,
      type: event.type || event.title,
      startAt: event.startAt,
      endAt: event.endAt,
      location: event.location,
      status: "Scheduled",
    },
    select: {
      id: true, childId: true, eventId: true, type: true,
      startAt: true, endAt: true, location: true, status: true
    }
  });

  res.status(201).json(appt);
});

router.get("/parent/events", requireAuth, async (_req, res) => {
  const now = new Date();
  const items = await prisma.event.findMany({
    where: { endAt: { gte: now } },
    orderBy: { startAt: "asc" },
    select: {
      id: true, title: true, type: true, startAt: true, endAt: true,
      location: true, facilitator: true, status: true
    }
  });
  res.json({ items });
});

router.get("/parent/appointments/history", requireAuth, async (req, res) => {
  const userId = req.user!.sub;

  const kids = await prisma.child.findMany({
    where: { parentId: userId },
    select: { id: true },
  });
  const childIds = kids.map(k => k.id);
  if (childIds.length === 0) return res.json({ items: [] });

  const now = new Date();

  const items = await prisma.appointment.findMany({
    where: {
      childId: { in: childIds },
      event: { endAt: { lt: now } },
    },
    orderBy: [{ event: { endAt: "desc" } }],
    select: {
      id: true,
      status: true,
      createdAt: true,
      child: { select: { id: true, firstName: true, lastName: true } },
      event: {
        select: {
          id: true,
          title: true,
          type: true,
          location: true,
          startAt: true,
          endAt: true,
        },
      },
    },
  });

  res.json({ items });
});

export default router;
