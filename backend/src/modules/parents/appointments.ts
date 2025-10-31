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
  const role = (req.user as any)?.role ?? "PARENT";

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
    select: {
      id: true, title: true, type: true, startAt: true, endAt: true, location: true, status: true,
      audience: true, visibility: true, capacity: true
    }
  });
  if (!event) return res.status(404).json({ error: "EVENT_NOT_FOUND" });

  const allowedAudience = role === "PARTNER" ? ["EXTERNAL", "BOTH"] : ["INTERNAL", "BOTH"];
  const allowedVisibility = role === "PARTNER" ? ["PUBLISHED"] : ["PUBLISHED", "PRIVATE"];
  if (!allowedAudience.includes(event.audience ?? "INTERNAL")) {
    return res.status(403).json({ error: "AUDIENCE_NOT_ALLOWED" });
  }
  if (!allowedVisibility.includes(event.visibility ?? "PUBLISHED")) {
    return res.status(403).json({ error: "VISIBILITY_NOT_ALLOWED" });
  }

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

  if (typeof event.capacity === "number") {
    const booked = await prisma.appointment.count({ where: { eventId: event.id } });
    if (booked >= event.capacity) {
      return res.status(409).json({ error: "CAPACITY_FULL" });
    }
  }

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
    select: { id: true, childId: true, eventId: true, type: true, startAt: true, endAt: true, location: true, status: true }
  });

  res.status(201).json(appt);
});

router.get("/parent/events", requireAuth, async (req, res) => {
  const now = new Date();
  const role = (req.user as any)?.role ?? "PARENT";
  const audienceIn = role === "PARTNER" ? ["EXTERNAL", "BOTH"] : ["INTERNAL", "BOTH"];
  const visibilityIn = role === "PARTNER" ? ["PUBLISHED"] : ["PUBLISHED", "PRIVATE"];

  const items = await prisma.event.findMany({
    where: {
      endAt: { gte: now },
      audience: { in: audienceIn as any },
      visibility: { in: visibilityIn as any },
    },
    orderBy: { startAt: "asc" },
    select: {
      id: true,
      title: true,
      type: true,
      startAt: true,
      endAt: true,
      location: true,
      facilitator: true,
      status: true,
      capacity: true,
      price: true,
      club: { select: { id: true, name: true } },
    },
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

router.get("/parent/clubs", requireAuth, async (req, res) => {
  const now = new Date();

  const clubs = await prisma.club.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
    select: {
      id: true, name: true, description: true, audience: true,
      createdAt: true, updatedAt: true,
      _count: {
        select: {
          events: {
            where: { endAt: { gte: now } }
          }
        }
      }
    }
  });

  res.json({ items: clubs.map(c => ({
    id: c.id,
    name: c.name,
    description: c.description,
    audience: c.audience,
    upcomingEvents: c._count.events,
  })) });
});

router.post("/parent/clubs/:clubId/enroll", requireAuth, async (req, res) => {
  const userId = req.user!.sub;
  const { clubId } = req.params;
  const { childId } = req.body as { childId: string };

  const child = await prisma.child.findFirst({ where: { id: childId, parentId: userId }, select: { id: true } });
  if (!child) return res.status(403).json({ error: "CHILD_NOT_OWNED" });

  const now = new Date();
  const events = await prisma.event.findMany({
    where: { clubId, endAt: { gte: now } },
    orderBy: { startAt: "asc" },
    select: {
      id: true, title: true, type: true, startAt: true, endAt: true, location: true,
      capacity: true,
    }
  });

  if (events.length === 0) return res.json({ created: 0 });

  let created = 0;
  for (const ev of events) {
    const existing = await prisma.appointment.findFirst({
      where: { childId, eventId: ev.id }, select: { id: true }
    });
    if (existing) continue;

    if (typeof ev.capacity === "number") {
      const booked = await prisma.appointment.count({ where: { eventId: ev.id } });
      if (booked >= ev.capacity) continue;
    }

    const overlap = await prisma.appointment.findFirst({
      where: {
        childId,
        startAt: { lt: ev.endAt },
        endAt:   { gt: ev.startAt },
      },
      select: { id: true }
    });
    if (overlap) continue;

    await prisma.appointment.create({
      data: {
        childId,
        eventId: ev.id,
        type: ev.type || ev.title,
        startAt: ev.startAt,
        endAt: ev.endAt,
        location: ev.location,
        status: "Scheduled",
      }
    });
    created++;
  }

  res.json({ created });
});

export default router;
