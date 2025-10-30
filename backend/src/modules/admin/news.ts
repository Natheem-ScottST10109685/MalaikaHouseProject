import { Router } from "express";
import { prisma } from "../../db/index.js";
import { requireAuth } from "../../auth/middleware.js";
import { requireRole } from "../../auth/roles.js";
import { z } from "zod";
import slugifyModule from "slugify";
import { logActivity } from "../../log/activity.js";

async function createNotification({ title, message, severity = "info" }: {title: string; message: string; severity?: "info" | "warning" | "error"}) {
  await prisma.notification.create({
    data: { title, message, severity },
  });
}

const router = Router();

const slugify: (s: string, opts?: any) => string = (slugifyModule as any).default ?? (slugifyModule as any);

const createSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED"]).default("DRAFT"),
  publishAt: z.string().datetime().optional(),
});

const updateSchema = createSchema.partial();

router.get("/admin/news", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const q = String(req.query.q ?? "").trim();
  const where = q ? { OR: [{ title: { contains: q, mode: "insensitive" } }, { excerpt: { contains: q, mode: "insensitive" } }] } : {};

  const items = await prisma.newsPost.findMany({
    where,
    orderBy: [{ status: "asc" }, { publishAt: "desc" }, { createdAt: "desc" }],
  });
  res.json(items);
});

router.post("/admin/news", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const body = createSchema.parse(req.body);
  const slug = slugify(body.title, { lower: true, strict: true });

  const post = await prisma.newsPost.create({
    data: {
      title: body.title,
      slug,
      excerpt: body.excerpt ?? null,
      content: body.content ?? null,
      status: body.status,
      publishAt: body.publishAt ? new Date(body.publishAt) : null,
      authorId: req.user?.id,
    },
  });

  await logActivity(req, {
    action: "NEWS_CREATE",
    targetType: "NEWS",
    targetId: post.id,
    metadata: { title: post.title, status: post.status },
  });

  await createNotification({
    title: "New post created",
    message: `“${post.title}” was created (${post.status.toLowerCase()}).`,
  });

  res.status(201).json(post);
});

router.patch("/admin/news/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
  const body = updateSchema.parse(req.body);

  const updated = await prisma.newsPost.update({
    where: { id },
    data: {
      title: body.title ?? undefined,
      slug: body.title ? slugify(body.title, { lower: true, strict: true }) : undefined,
      excerpt: body.excerpt ?? undefined,
      content: body.content ?? undefined,
      status: body.status ?? undefined,
      publishAt: body.publishAt ? new Date(body.publishAt) : body.publishAt === null ? null : undefined,
    },
  });

  await logActivity(req, {
    action: "NEWS_UPDATE",
    targetType: "NEWS",
    targetId: updated.id,
    metadata: { title: updated.title, status: updated.status },
  });

  res.json(updated);
});

router.post("/admin/news/:id/publish", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);

  const post = await prisma.newsPost.update({
    where: { id },
    data: { status: "PUBLISHED", publishAt: new Date() },
  });

  await logActivity(req, {
    action: "NEWS_PUBLISH",
    targetType: "NEWS",
    targetId: post.id,
    metadata: { title: post.title },
  });

  await createNotification({
    title: "New update published",
    message: `“${post.title}” is now live.`,
  });

  res.json(post);
});

router.delete("/admin/news/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
  await prisma.newsPost.delete({ where: { id } });
  await logActivity(req, {
    action: "NEWS_DELETE",
    targetType: "NEWS",
    targetId: id,
  });
  res.json({ ok: true });
});

export default router;
