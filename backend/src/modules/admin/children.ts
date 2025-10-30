import { Router } from "express";
import { prisma } from "../../db/index.js";
import { requireAuth } from "../../auth/middleware.js";
import { requireRole } from "../../auth/roles.js";
import { z } from "zod";
import { logActivity } from "../../log/activity.js";

const router = Router();

async function resolveParentId({ parentId, parentEmail }: { parentId?: string; parentEmail?: string }) {
  if (parentId) return parentId;
  if (parentEmail) {
    const parent = await prisma.user.findUnique({ where: { email: parentEmail } });
    if (!parent) throw new Error("PARENT_NOT_FOUND");
    return parent.id;
  }
  throw new Error("PARENT_REQUIRED");
}

router.get("/admin/children", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const page = Math.max(parseInt(String(req.query.page ?? "1"), 10) || 1, 1);
  const pageSize = Math.min(Math.max(parseInt(String(req.query.pageSize ?? "20"), 10) || 20, 1), 100);
  const q = String(req.query.q ?? "").trim();
  const parentId = String(req.query.parentId ?? "").trim();

  const where: any = {};
  if (q) {
    where.OR = [
      { firstName: { contains: q, mode: "insensitive" } },
      { lastName: { contains: q, mode: "insensitive" } },
      { parent: { email: { contains: q, mode: "insensitive" } } },
    ];
  }
  if (parentId) where.parentId = parentId;

  const [total, items] = await Promise.all([
    prisma.child.count({ where }),
    prisma.child.findMany({
      where,
      orderBy: [{ createdAt: "desc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { parent: { select: { id: true, email: true, role: true } } },
    }),
  ]);

  res.json({ page, pageSize, total, hasMore: page * pageSize < total, items });
});

router.get("/admin/users/:id/children", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
  const items = await prisma.child.findMany({
    where: { parentId: id },
    orderBy: { createdAt: "desc" },
  });
  res.json(items);
});

router.post("/admin/children", requireAuth, requireRole("ADMIN"), async (req, res) => {
  try {
    const body = z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      dateOfBirth: z.string().optional(),
      grade: z.string().optional(),
      notes: z.string().optional(),
      parentId: z.string().optional(),
      parentEmail: z.string().email().optional(),
    }).parse(req.body);

    const parentId = await resolveParentId({ parentId: body.parentId, parentEmail: body.parentEmail });

    const child = await prisma.child.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null,
        grade: body.grade ?? null,
        notes: body.notes ?? null,
        parentId,
      },
      include: { parent: { select: { id: true, email: true, role: true } } },
    });

    await logActivity(req, {
      action: "CHILD_CREATE",
      targetType: "CHILD",
      targetId: child.id,
      metadata: { parentEmail: child.parent.email },
    });

    res.status(201).json(child);
  } catch (err: any) {
    const message = err?.message === "PARENT_NOT_FOUND" ? "Parent email not found" :
                    err?.message === "PARENT_REQUIRED" ? "Parent is required" : "Failed to create child";
    res.status(400).json({ error: message });
  }
});

router.get("/admin/children/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
  const child = await prisma.child.findUnique({
    where: { id },
    include: { parent: { select: { id: true, email: true, role: true } } },
  });
  if (!child) return res.status(404).json({ error: "NOT_FOUND" });
  res.json(child);
});

router.patch("/admin/children/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  try {
    const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
    const body = z.object({
      firstName: z.string().min(1).optional(),
      lastName: z.string().min(1).optional(),
      dateOfBirth: z.string().optional(),
      grade: z.string().optional(),
      notes: z.string().optional(),
      isActive: z.boolean().optional(),
      parentId: z.string().optional(),
      parentEmail: z.string().email().optional(),
    }).parse(req.body);

    const newParentId = (body.parentId || body.parentEmail)
      ? await resolveParentId({ parentId: body.parentId, parentEmail: body.parentEmail })
      : undefined;

    const updated = await prisma.child.update({
      where: { id },
      data: {
        firstName: body.firstName ?? undefined,
        lastName: body.lastName ?? undefined,
        dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : body.dateOfBirth === null ? null : undefined,
        grade: body.grade ?? undefined,
        notes: body.notes ?? undefined,
        isActive: body.isActive ?? undefined,
        parentId: newParentId,
      },
      include: { parent: { select: { id: true, email: true, role: true } } },
    });

    await logActivity(req, {
      action: "CHILD_UPDATE",
      targetType: "CHILD",
      targetId: updated.id,
    });

    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err?.message ?? "Failed to update child" });
  }
});

router.post("/admin/children/:id/disable", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
  const updated = await prisma.child.update({ where: { id }, data: { isActive: false } });
  await logActivity(req, { action: "CHILD_DISABLE", targetType: "CHILD", targetId: updated.id });
  res.json(updated);
});

router.delete("/admin/children/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
  await prisma.child.delete({ where: { id } });
  await logActivity(req, { action: "CHILD_DELETE", targetType: "CHILD", targetId: id });
  res.json({ ok: true });
});

export default router;
