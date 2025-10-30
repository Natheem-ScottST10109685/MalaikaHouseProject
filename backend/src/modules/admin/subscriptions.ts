import { Router } from "express";
import { prisma } from "../../db/index.js";
import { requireAuth } from "../../auth/middleware.js";
import { requireRole } from "../../auth/roles.js";
import { z } from "zod";

const router = Router();

router.post("/", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const schema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number(),
    period: z.string(),
    durationMonths: z.number().optional(),
    maxChildren: z.number().optional(),
    autoApplyEvents: z.boolean().optional(),
  });
  const data = schema.parse(req.body);

  const plan = await prisma.subscriptionPlan.create({ data });
  res.json(plan);
});

router.get("/", requireAuth, requireRole("ADMIN"), async (_req, res) => {
  const plans = await prisma.subscriptionPlan.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(plans);
});

router.get("/:id/subscribers", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = req.params;
  const subs = await prisma.subscription.findMany({
    where: { planId: id },
    include: {
      parent: { select: { id: true, email: true } },
      children: { include: { child: true } },
    },
  });
  res.json(subs);
});

router.patch("/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
  const body = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    period: z.string().optional(),
    durationMonths: z.number().optional(),
    maxChildren: z.number().optional(),
    autoApplyEvents: z.boolean().optional(),
    active: z.boolean().optional(),
  }).parse(req.body);

  const updated = await prisma.subscriptionPlan.update({
    where: { id },
    data: body,
  });

  res.json(updated);
});

router.delete("/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
  await prisma.subscriptionPlan.delete({ where: { id } });
  res.json({ ok: true });
});

export default router;
