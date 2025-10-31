import { Router } from "express";
import { prisma } from "../../db/index.js";
import { Prisma, Audience } from "@prisma/client";
import { requireAuth } from "../../auth/middleware.js";
import { z } from "zod";

const router = Router();

function roleFromReq(req: any): "PARENT" | "PARTNER" | string {
  return (req.user?.role as any) ?? "PARENT";
}

function isAudienceAllowed(audience: string | Audience | null | undefined, role: string) {
  const a = (audience as Audience) ?? Audience.INTERNAL;
  if (role === "PARTNER") return a === Audience.EXTERNAL || a === Audience.BOTH;
  return a === Audience.INTERNAL || a === Audience.BOTH;
}

function isVisibilityAllowed(visibility: string | null | undefined, role: string) {
  const v = visibility ?? "PRIVATE";
  if (role === "PARTNER") return v === "PUBLIC";
  return v === "PUBLIC" || v === "PRIVATE";
}

router.get("/parent/appointments", requireAuth, async (req, res) => {
  const userId = req.user!.sub;
  const childId = (req.query.childId as string) || undefined;
  const futureOnly = String(req.query.future || "").toLowerCase() === "true";
  const now = new Date();

  const kids = await prisma.child.findMany({
    where: childId ? { id: childId, parentId: userId } : { parentId: userId },
    select: { id: true, firstName: true, lastName: true },
  });
  const childIds = kids.map(k => k.id);
  if (!childIds.length) return res.json({ items: [] });

  const where: any = { childId: { in: childIds } };
  if (futureOnly) where.endAt = { gte: now };

  const items = await prisma.appointment.findMany({
    where,
    orderBy: { startAt: "asc" },
    select: {
      id: true, type: true, location: true, status: true,
      startAt: true, endAt: true,
      child: { select: { id: true, firstName: true, lastName: true } },
      event: {
        select: {
          id: true, title: true, type: true, startAt: true, endAt: true,
          location: true, status: true,
          club: { select: { id: true, name: true } },
          audience: true, visibility: true,
        }
      }
    }
  });

  res.json({ items });
});

router.post("/parent/appointments", requireAuth, async (req, res) => {
  const userId = req.user!.sub;
  const role = roleFromReq(req);

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
      id: true, title: true, type: true, startAt: true, endAt: true,
      location: true, status: true,
      audience: true, visibility: true, publishStatus: true, capacity: true,
    }
  });
  if (!event) return res.status(404).json({ error: "EVENT_NOT_FOUND" });

  if (event.publishStatus !== "PUBLISHED") {
    return res.status(403).json({ error: "NOT_PUBLISHED" });
  }
  if (!isAudienceAllowed(event.audience as Audience, role)) {
    return res.status(403).json({ error: "AUDIENCE_NOT_ALLOWED" });
  }
  if (!isVisibilityAllowed(event.visibility, role)) {
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
  const role = roleFromReq(req);
  const now = new Date();

  const base: Prisma.EventWhereInput = {
    endAt: { gte: now },
    publishStatus: "PUBLISHED",
  };

  const whereForExternal: Prisma.EventWhereInput = {
    ...base,
    visibility: "PUBLIC",
    audience: { in: [Audience.EXTERNAL, Audience.BOTH] as Audience[] },
  };

  const whereForInternal: Prisma.EventWhereInput = {
    ...base,
    audience: { in: [Audience.INTERNAL, Audience.BOTH] as Audience[] },
  };

  const where: Prisma.EventWhereInput = role === "PARTNER" ? whereForExternal : whereForInternal;

  const items = await prisma.event.findMany({
    where,
    orderBy: { startAt: "asc" },
    select: {
      id: true, title: true, type: true,
      startAt: true, endAt: true, location: true,
      facilitator: true, status: true,
      visibility: true, audience: true,
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
    where: { childId: { in: childIds }, event: { endAt: { lt: now } } },
    orderBy: [{ event: { endAt: "desc" } }],
    select: {
      id: true, status: true, createdAt: true,
      child: { select: { id: true, firstName: true, lastName: true } },
      event: { select: { id: true, title: true, type: true, location: true, startAt: true, endAt: true } },
    },
  });

  res.json({ items });
});

router.get("/parent/clubs", requireAuth, async (req, res) => {
  const role = roleFromReq(req);
  const now = new Date();

  const audienceFilter: Prisma.EnumAudienceFilter<"Club"> = {
    in: (role === "PARTNER"
      ? [Audience.EXTERNAL, Audience.BOTH]
      : [Audience.INTERNAL, Audience.BOTH]) as Audience[],
  };

  const clubs = await prisma.club.findMany({
    where: { active: true, audience: audienceFilter },
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          events: {
            where: { endAt: { gte: now }, publishStatus: "PUBLISHED" },
          },
        },
      },
    },
  });

  res.json({
    items: clubs.map(c => ({
      id: c.id,
      name: c.name,
      description: c.description,
      audience: c.audience,
      upcomingEvents: c._count.events,
    })),
  });
});

router.post("/parent/clubs/:clubId/enroll", requireAuth, async (req, res) => {
  const userId = req.user!.sub;
  const role = roleFromReq(req);
  const { clubId } = req.params;
  const { childId } = z.object({ childId: z.string().min(1) }).parse(req.body);

  const child = await prisma.child.findFirst({
    where: { id: childId, parentId: userId },
    select: { id: true },
  });
  if (!child) return res.status(403).json({ error: "CHILD_NOT_OWNED" });

  const club = await prisma.club.findUnique({
    where: { id: clubId },
    select: { id: true, audience: true },
  });
  if (!club) return res.status(404).json({ error: "CLUB_NOT_FOUND" });
  if (!isAudienceAllowed(club.audience as Audience, role)) {
    return res.status(403).json({ error: "AUDIENCE_NOT_ALLOWED" });
  }

  const now = new Date();
  const audienceIn = role === "PARTNER"
    ? [Audience.EXTERNAL, Audience.BOTH] as Audience[]
    : [Audience.INTERNAL, Audience.BOTH] as Audience[];

  const events = await prisma.event.findMany({
    where: {
      clubId,
      endAt: { gte: now },
      publishStatus: "PUBLISHED",
      audience: { in: audienceIn },
      ...(role === "PARTNER" ? { visibility: "PUBLIC" } : {}),
    },
    orderBy: { startAt: "asc" },
    select: {
      id: true, title: true, type: true, startAt: true, endAt: true, location: true,
      capacity: true, visibility: true, audience: true,
    },
  });

  if (events.length === 0) return res.json({ created: 0 });

  let created = 0;
  for (const ev of events) {
    if (!isAudienceAllowed(ev.audience as Audience, role)) continue;
    if (!isVisibilityAllowed(ev.visibility, role)) continue;

    const existing = await prisma.appointment.findFirst({
      where: { childId, eventId: ev.id },
      select: { id: true },
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
      select: { id: true },
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
      },
    });
    created++;
  }

  res.json({ created });
});

export default router;
