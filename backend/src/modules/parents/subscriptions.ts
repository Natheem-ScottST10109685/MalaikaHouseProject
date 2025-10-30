import { Router } from "express";
import { prisma } from "../../db/index.js";
import { requireAuth } from "../../auth/middleware.js";
import { z } from "zod";

const router = Router();

router.get("/plans", requireAuth, async (_req, res) => {
  const plans = await prisma.subscriptionPlan.findMany({
    where: { active: true },
    orderBy: { price: "asc" },
  });
  res.json(plans);
});

router.get("/active", requireAuth, async (req, res) => {
  const userId = req.user!.sub;

  const subs = await prisma.subscription.findMany({
    where: { parentId: userId, status: "ACTIVE" },
    include: {
      plan: true,
      children: {
        include: { child: { select: { id: true, firstName: true, lastName: true } } }
      }
    },
    orderBy: { createdAt: "desc" },
  });

  res.json(subs);
});

router.post("/", requireAuth, async (req, res) => {
  const userId = req.user!.sub;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const body = z.object({
    planId: z.string().min(1),
    childIds: z.array(z.string().min(1)).min(1)
  }).parse(req.body);

  const plan = await prisma.subscriptionPlan.findUnique({ where: { id: body.planId } });
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
          planId: body.planId,
          cost: plan.price,
          status: "ACTIVE",
          children: {
            create: body.childIds.map((cid) => ({ childId: cid })),
          },
        },
        include: { children: true, plan: true },
      });

      if (plan.autoApplyEvents) {
        const now = new Date();

        const upcomingEvents = await tx.event.findMany({
          where: { startAt: { gte: now } },
          select: { id: true, type: true, startAt: true, endAt: true, location: true },
        });

        for (const ev of upcomingEvents) {
          for (const c of subscription.children) {
            const exists = await tx.appointment.findFirst({
              where: { childId: c.childId, eventId: ev.id },
              select: { id: true },
            });
            if (!exists) {
              await tx.appointment.create({
                data: {
                  child: { connect: { id: c.childId } },
                  event: { connect: { id: ev.id } },

                  type: ev.type,
                  startAt: ev.startAt,
                  endAt: ev.endAt,

                  location: ev.location ?? null,
                  status: "BOOKED",
                },
              });
            }
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

export default router;