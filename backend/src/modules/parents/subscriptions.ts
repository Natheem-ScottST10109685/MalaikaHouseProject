import { Router } from "express";
import { prisma } from "../../db/index.js";
import { requireAuth } from "../../auth/middleware.js";
import { z } from "zod";
import { Prisma, Audience, Visibility, PublishStatus } from "@prisma/client";

const router = Router();

function roleFromReq(req: any): "PARENT" | "PARTNER" | string {
  return (req.user?.role as any) ?? "PARENT";
}

function addPeriod(date: Date, period: string) {
  const d = new Date(date);
  const p = (period || "").toLowerCase();
  switch (p) {
    case "monthly":
    case "month":
      d.setMonth(d.getMonth() + 1);
      break;
    case "yearly":
    case "annual":
    case "year":
      d.setFullYear(d.getFullYear() + 1);
      break;
    case "quarterly":
    case "quarter":
      d.setMonth(d.getMonth() + 3);
      break;
    case "weekly":
    case "week":
      d.setDate(d.getDate() + 7);
      break;
    case "daily":
    case "day":
      d.setDate(d.getDate() + 1);
      break;
    default:
      d.setMonth(d.getMonth() + 1);
  }
  return d;
}

router.get("/plans", requireAuth, async (_req, res) => {
  const plans = await prisma.subscriptionPlan.findMany({
    where: { active: true },
    orderBy: { price: "asc" },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      period: true,
      durationMonths: true,
      maxChildren: true,
      autoApplyEvents: true,
      active: true,
      scope: true,
      clubId: true,
      eventTag: true,
      club: { select: { id: true, name: true } },
    },
  });
  res.json(plans);
});

router.get("/active", requireAuth, async (req, res) => {
  const userId = req.user!.sub!;

  const rawItems = await prisma.subscription.findMany({
    where: { parentId: userId, status: "ACTIVE" },
    include: {
      plan: {
        select: {
          id: true,
          name: true,
          period: true,
          scope: true,
          clubId: true,
          eventTag: true,
          autoApplyEvents: true,
          club: { select: { id: true, name: true } },
        },
      },
      children: {
        include: {
          child: { select: { id: true, firstName: true, lastName: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const items = rawItems.map((s) => {
    const periodLabel = s.plan?.period ?? "monthly";
    const anchor = s.startDate ?? s.createdAt;
    const nextBillingAt = addPeriod(anchor, periodLabel).toISOString();
    return { ...s, periodLabel, nextBillingAt };
  });

  let summary: null | {
    planName: string;
    nextBillingAt: string | null;
    autoRenew: boolean;
    totalChildren: number;
    plan?: {
      id: string;
      scope: "ALL" | "CLUB" | "EVENT_TAG";
      clubId?: string | null;
      eventTag?: string | null;
      club?: { id: string; name: string } | null;
    };
  } = null;

  if (items.length > 0) {
    const primary = items[0];
    summary = {
      planName: primary.plan?.name ?? "—",
      nextBillingAt: primary.nextBillingAt ?? null,
      autoRenew: !!primary.autoRenew,
      totalChildren: primary.children?.length || 0,
      plan: primary.plan
        ? {
            id: primary.plan.id,
            scope: primary.plan.scope as any,
            clubId: primary.plan.clubId ?? null,
            eventTag: primary.plan.eventTag ?? null,
            club: primary.plan.club ?? null,
          }
        : undefined,
    };
  }

  res.json({ items, summary });
});

router.post("/", requireAuth, async (req, res) => {
  const userId = req.user!.sub;
  const role = roleFromReq(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const body = z
    .object({
      planId: z.string().min(1),
      childIds: z.array(z.string().min(1)).min(1),
    })
    .parse(req.body);

  const plan = await prisma.subscriptionPlan.findUnique({
    where: { id: body.planId },
    select: {
      id: true,
      name: true,
      price: true,
      maxChildren: true,
      period: true,
      scope: true,
      clubId: true,
      eventTag: true,
      autoApplyEvents: true,
    },
  });
  if (!plan) return res.status(404).json({ error: "Plan not found" });

  const children = await prisma.child.findMany({
    where: { id: { in: body.childIds }, parentId: userId },
    select: { id: true },
  });
  if (children.length !== body.childIds.length) {
    return res.status(403).json({ error: "One or more children do not belong to your account" });
  }

  if (plan.maxChildren != null && body.childIds.length > plan.maxChildren) {
    return res.status(400).json({ error: `Plan allows up to ${plan.maxChildren} children.` });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const subscription = await tx.subscription.create({
        data: {
          parentId: userId,
          planId: plan.id,
          cost: plan.price,
          status: "ACTIVE",
          autoRenew: true,
          children: {
            create: body.childIds.map((cid) => ({ childId: cid })),
          },
        },
        include: {
          children: true,
          plan: { select: { scope: true, clubId: true, eventTag: true, autoApplyEvents: true } },
        },
      });

      if (subscription.plan?.autoApplyEvents) {
        const now = new Date();

        const where: Prisma.EventWhereInput = {
          publishStatus: PublishStatus.PUBLISHED,
          startAt: { gte: now },
        };

        if (role === "PARTNER") {
          where.visibility = Visibility.PUBLIC;
          where.audience = { in: [Audience.EXTERNAL, Audience.BOTH] };
        } else {
          where.audience = { in: [Audience.INTERNAL, Audience.BOTH] };
        }

        if (subscription.plan.scope === "CLUB" && subscription.plan.clubId) {
          where.clubId = subscription.plan.clubId;
        } else if (subscription.plan.scope === "EVENT_TAG" && subscription.plan.eventTag) {
          where.type = subscription.plan.eventTag;
        }

        const upcomingEvents = await tx.event.findMany({
          where,
          select: {
            id: true,
            type: true,
            startAt: true,
            endAt: true,
            location: true,
            capacity: true,
          },
          orderBy: { startAt: "asc" },
        });

        for (const ev of upcomingEvents) {
          for (const c of subscription.children) {
            const exists = await tx.appointment.findFirst({
              where: { childId: c.childId, eventId: ev.id },
              select: { id: true },
            });
            if (exists) continue;

            if (typeof ev.capacity === "number") {
              const booked = await tx.appointment.count({ where: { eventId: ev.id } });
              if (booked >= ev.capacity) continue;
            }

            const conflict = await tx.appointment.findFirst({
              where: {
                childId: c.childId,
                startAt: { lt: ev.endAt },
                endAt: { gt: ev.startAt },
              },
              select: { id: true },
            });
            if (conflict) continue;

            await tx.appointment.create({
              data: {
                childId: c.childId,
                eventId: ev.id,
                type: ev.type,
                startAt: ev.startAt,
                endAt: ev.endAt,
                location: ev.location ?? null,
                status: "Scheduled",
              },
            });
          }
        }
      }

      return subscription;
    });

    res.json(result);
  } catch (e: any) {
    console.error(e);
    res.status(400).json({ error: e?.message || "Failed to create subscription" });
  }
});

router.patch("/:id/auto-renew", requireAuth, async (req, res) => {
  const userId = req.user!.sub;
  const { id } = req.params;
  const { autoRenew } = z.object({ autoRenew: z.boolean() }).parse(req.body);

  const sub = await prisma.subscription.findFirst({ where: { id, parentId: userId } });
  if (!sub) return res.status(404).json({ error: "NOT_FOUND" });
  if (sub.status !== "ACTIVE") return res.status(400).json({ error: "Subscription not active" });

  const updated = await prisma.subscription.update({
    where: { id },
    data: { autoRenew },
  });
  res.json(updated);
});

router.post("/:id/cancel", requireAuth, async (req, res) => {
  const userId = req.user!.sub;
  const { id } = req.params;

  const sub = await prisma.subscription.findFirst({ where: { id, parentId: userId } });
  if (!sub) return res.status(404).json({ error: "NOT_FOUND" });
  if (sub.status !== "ACTIVE") return res.status(400).json({ error: "Already cancelled or inactive" });

  const updated = await prisma.subscription.update({
    where: { id },
    data: {
      status: "CANCELLED",
      autoRenew: false,
      endDate: new Date(),
    },
  });
  res.json(updated);
});

export default router;