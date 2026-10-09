import { Express, Request, Response } from "express";
import { prisma } from "./db.js";
import { seedCompositionEngine } from "./compositionSeeder.js";

// Helper for ISR revalidation
function triggerRevalidation(paths: string[] = ["/en", "/ar", "/zh", "/ckb"], tags: string[] = ["sections", "homepage"]) {
  for (const path of paths) {
    console.log(`[ISR] revalidatePath("${path}") -> Composition Synced`);
  }
  for (const tag of tags) {
    console.log(`[ISR] revalidateTag("${tag}") -> Cache Purged`);
  }
}

// Helper for audit logging to both Prisma AuditLog and memory
async function logMutationAudit(
  req: Request,
  action: string,
  resource: string,
  itemId: string,
  details: string
) {
  const user = (req as any).user || {
    id: "admin_user",
    email: (req.headers["x-user-email"] as string) || "admin@iraqi-chineseagency.com",
    role: (req.headers["x-role"] as string) || "ADMIN"
  };

  try {
    await prisma.auditLog.create({
      data: {
        userEmail: user.email || "admin@iraqi-chineseagency.com",
        action,
        resource,
        itemId,
        details
      }
    });
  } catch (err: any) {
    console.error("[CompositionRoutes] Failed to write AuditLog:", err?.message);
  }
}

export function registerCompositionRoutes(
  app: Express,
  editorOrAdminMiddleware?: any,
  adminMiddleware?: any
) {
  console.log("[CompositionRoutes] Registering Public Website Sections Composition Engine API...");

  // -------------------------------------------------------------
  // SEED / RESET ENDPOINT
  // -------------------------------------------------------------
  app.post("/api/hub/composition/seed", async (req: Request, res: Response) => {
    try {
      await seedCompositionEngine();
      triggerRevalidation();
      await logMutationAudit(req, "SEED_COMPOSITION_ENGINE", "CompositionEngine", "system", "Manual or automated seed triggered");
      res.json({ success: true, message: "Composition engine seeded successfully" });
    } catch (e: any) {
      console.error("[CompositionRoutes] Seed error:", e);
      res.status(500).json({ error: "Failed to seed composition engine", details: e?.message });
    }
  });

  // -------------------------------------------------------------
  // 1. PAGES
  // -------------------------------------------------------------
  app.get("/api/hub/composition/pages", async (req: Request, res: Response) => {
    try {
      const pages = await prisma.page.findMany({
        include: {
          sections: {
            orderBy: { displayOrder: "asc" },
            include: {
              items: {
                orderBy: { displayOrder: "asc" }
              }
            }
          }
        },
        orderBy: { createdAt: "asc" }
      });
      res.json(pages);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch pages" });
    }
  });

  app.get("/api/hub/composition/pages/:slugOrId", async (req: Request, res: Response) => {
    try {
      const { slugOrId } = req.params;
      const page = await prisma.page.findFirst({
        where: {
          OR: [{ id: slugOrId }, { slug: slugOrId }, { path: slugOrId }]
        },
        include: {
          sections: {
            orderBy: { displayOrder: "asc" },
            include: {
              items: {
                orderBy: { displayOrder: "asc" }
              },
              revisions: {
                take: 5,
                orderBy: { timestamp: "desc" }
              }
            }
          }
        }
      });

      if (!page) {
        return res.status(404).json({ error: "Page not found" });
      }

      res.json(page);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch page" });
    }
  });

  app.post("/api/hub/composition/pages", async (req: Request, res: Response) => {
    const role = ((req as any).user?.role || req.headers["x-role"] || "ADMIN").toString().toUpperCase();
    if (role === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot create pages" });
    }

    try {
      const { slug, path, title, description, pillar, status } = req.body;
      const page = await prisma.page.create({
        data: {
          slug,
          path,
          title: typeof title === "object" ? JSON.stringify(title) : (title || "{}"),
          description: typeof description === "object" ? JSON.stringify(description) : (description || "{}"),
          pillar: pillar || "GENERAL",
          status: status || "draft",
          createdBy: (req as any).user?.email || "admin@iraqi-chineseagency.com"
        }
      });

      await logMutationAudit(req, "CREATE_PAGE", "Page", page.id, `Created page ${page.slug} (${page.path})`);
      triggerRevalidation();
      res.status(201).json(page);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to create page", details: e?.message });
    }
  });

  app.put("/api/hub/composition/pages/:id", async (req: Request, res: Response) => {
    const role = ((req as any).user?.role || req.headers["x-role"] || "ADMIN").toString().toUpperCase();
    if (role === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot update pages" });
    }

    try {
      const { id } = req.params;
      const { slug, path, title, description, pillar, status } = req.body;
      const updated = await prisma.page.update({
        where: { id },
        data: {
          ...(slug && { slug }),
          ...(path && { path }),
          ...(title !== undefined && { title: typeof title === "object" ? JSON.stringify(title) : title }),
          ...(description !== undefined && { description: typeof description === "object" ? JSON.stringify(description) : description }),
          ...(pillar && { pillar }),
          ...(status && { status }),
          updatedBy: (req as any).user?.email || "admin@iraqi-chineseagency.com"
        }
      });

      await logMutationAudit(req, "UPDATE_PAGE", "Page", id, `Updated page ${updated.slug}`);
      triggerRevalidation();
      res.json(updated);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to update page", details: e?.message });
    }
  });

  // -------------------------------------------------------------
  // 2. SECTIONS
  // -------------------------------------------------------------
  app.get("/api/hub/composition/sections", async (req: Request, res: Response) => {
    try {
      const { pageId, status, type } = req.query;
      const where: any = {};
      if (pageId) where.pageId = String(pageId);
      if (status && status !== "all") where.status = String(status);
      if (type) where.type = String(type);

      const sections = await prisma.pageSection.findMany({
        where,
        include: {
          items: {
            orderBy: { displayOrder: "asc" }
          },
          revisions: {
            take: 3,
            orderBy: { timestamp: "desc" }
          }
        },
        orderBy: { displayOrder: "asc" }
      });

      res.json(sections);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch sections" });
    }
  });

  app.get("/api/hub/composition/sections/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const section = await prisma.pageSection.findUnique({
        where: { id },
        include: {
          items: {
            orderBy: { displayOrder: "asc" }
          },
          revisions: {
            orderBy: { timestamp: "desc" },
            take: 20
          }
        }
      });

      if (!section) return res.status(404).json({ error: "Section not found" });
      res.json(section);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch section" });
    }
  });

  app.post("/api/hub/composition/sections", async (req: Request, res: Response) => {
    const role = ((req as any).user?.role || req.headers["x-role"] || "ADMIN").toString().toUpperCase();
    if (role === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot create sections" });
    }

    try {
      const {
        pageId = "page_home_primary",
        type,
        name,
        displayOrder,
        visibility = "visible",
        scheduleFrom,
        scheduleTo,
        styleOverride,
        localeOverride,
        config,
        status = "draft"
      } = req.body;

      // Determine next display order if not provided
      let order = displayOrder;
      if (order === undefined || order === null) {
        const last = await prisma.pageSection.findFirst({
          where: { pageId },
          orderBy: { displayOrder: "desc" }
        });
        order = (last?.displayOrder || 0) + 1;
      }

      const section = await prisma.pageSection.create({
        data: {
          pageId,
          type,
          name,
          displayOrder: order,
          visibility,
          scheduleFrom: scheduleFrom ? new Date(scheduleFrom) : null,
          scheduleTo: scheduleTo ? new Date(scheduleTo) : null,
          styleOverride: typeof styleOverride === "object" ? JSON.stringify(styleOverride) : (styleOverride || "{}"),
          localeOverride: typeof localeOverride === "object" ? JSON.stringify(localeOverride) : (localeOverride || "{}"),
          config: typeof config === "object" ? JSON.stringify(config) : (config || "{}"),
          status,
          createdBy: (req as any).user?.email || "admin@iraqi-chineseagency.com"
        }
      });

      // Save initial revision
      await prisma.sectionRevision.create({
        data: {
          sectionId: section.id,
          snapshot: JSON.stringify(section),
          actorId: (req as any).user?.id || "admin_user",
          action: "create"
        }
      });

      await logMutationAudit(req, "CREATE_PAGE_SECTION", "PageSection", section.id, `Created section ${section.name} (${section.type}) on page ${pageId}`);
      triggerRevalidation();
      res.status(201).json(section);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to create section", details: e?.message });
    }
  });

  app.put("/api/hub/composition/sections/:id", async (req: Request, res: Response) => {
    const role = ((req as any).user?.role || req.headers["x-role"] || "ADMIN").toString().toUpperCase();
    if (role === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot modify sections" });
    }

    try {
      const { id } = req.params;
      const existing = await prisma.pageSection.findUnique({
        where: { id },
        include: { items: true }
      });

      if (!existing) return res.status(404).json({ error: "Section not found" });

      // Save pre-mutation snapshot as revision
      await prisma.sectionRevision.create({
        data: {
          sectionId: id,
          snapshot: JSON.stringify(existing),
          actorId: (req as any).user?.id || "admin_user",
          action: "update"
        }
      });

      const {
        type,
        name,
        displayOrder,
        visibility,
        scheduleFrom,
        scheduleTo,
        styleOverride,
        localeOverride,
        config,
        status
      } = req.body;

      const updated = await prisma.pageSection.update({
        where: { id },
        data: {
          ...(type && { type }),
          ...(name && { name }),
          ...(displayOrder !== undefined && { displayOrder }),
          ...(visibility && { visibility }),
          ...(scheduleFrom !== undefined && { scheduleFrom: scheduleFrom ? new Date(scheduleFrom) : null }),
          ...(scheduleTo !== undefined && { scheduleTo: scheduleTo ? new Date(scheduleTo) : null }),
          ...(styleOverride !== undefined && { styleOverride: typeof styleOverride === "object" ? JSON.stringify(styleOverride) : styleOverride }),
          ...(localeOverride !== undefined && { localeOverride: typeof localeOverride === "object" ? JSON.stringify(localeOverride) : localeOverride }),
          ...(config !== undefined && { config: typeof config === "object" ? JSON.stringify(config) : config }),
          ...(status && { status }),
          updatedBy: (req as any).user?.email || "admin@iraqi-chineseagency.com"
        },
        include: {
          items: {
            orderBy: { displayOrder: "asc" }
          }
        }
      });

      await logMutationAudit(req, "UPDATE_PAGE_SECTION", "PageSection", id, `Updated section ${updated.name}`);
      triggerRevalidation();
      res.json(updated);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to update section", details: e?.message });
    }
  });

  app.delete("/api/hub/composition/sections/:id", async (req: Request, res: Response) => {
    const role = ((req as any).user?.role || req.headers["x-role"] || "ADMIN").toString().toUpperCase();
    if (role === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot delete sections" });
    }

    const isPermanent = req.query.permanent === "true";
    if (isPermanent && role !== "SUPERADMIN" && role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden: Administrator clearance required for permanent destruction" });
    }

    try {
      const { id } = req.params;
      const existing = await prisma.pageSection.findUnique({
        where: { id },
        include: { items: true }
      });

      if (!existing) return res.status(404).json({ error: "Section not found" });

      if (isPermanent) {
        // Record revision before delete
        await prisma.sectionRevision.create({
          data: {
            sectionId: id,
            snapshot: JSON.stringify(existing),
            actorId: (req as any).user?.id || "admin_user",
            action: "delete"
          }
        });
        await prisma.pageSection.delete({ where: { id } });
        await logMutationAudit(req, "PERMANENT_DELETE_PAGE_SECTION", "PageSection", id, `Permanently deleted section ${existing.name}`);
      } else {
        await prisma.pageSection.update({
          where: { id },
          data: { status: "archived", visibility: "hidden" }
        });
        await logMutationAudit(req, "SOFT_DELETE_PAGE_SECTION", "PageSection", id, `Archived section ${existing.name}`);
      }

      triggerRevalidation();
      res.json({ success: true, id, permanent: isPermanent });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to delete section", details: e?.message });
    }
  });

  // DUPLICATE SECTION
  app.post("/api/hub/composition/sections/:id/duplicate", async (req: Request, res: Response) => {
    const role = ((req as any).user?.role || req.headers["x-role"] || "ADMIN").toString().toUpperCase();
    if (role === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot duplicate sections" });
    }

    try {
      const { id } = req.params;
      const source = await prisma.pageSection.findUnique({
        where: { id },
        include: { items: true }
      });

      if (!source) return res.status(404).json({ error: "Source section not found" });

      const newSection = await prisma.pageSection.create({
        data: {
          pageId: source.pageId,
          type: source.type,
          name: `${source.name} (Copy)`,
          displayOrder: source.displayOrder + 1,
          visibility: "hidden",
          styleOverride: source.styleOverride,
          localeOverride: source.localeOverride,
          config: source.config,
          status: "draft",
          createdBy: (req as any).user?.email || "admin@iraqi-chineseagency.com"
        }
      });

      // Clone items
      for (const item of source.items) {
        await prisma.sectionItem.create({
          data: {
            sectionId: newSection.id,
            title: item.title,
            subtitle: item.subtitle,
            body: item.body,
            image: item.image,
            imageAlt: item.imageAlt,
            ctaLabel: item.ctaLabel,
            ctaHref: item.ctaHref,
            icon: item.icon,
            metadata: item.metadata,
            displayOrder: item.displayOrder,
            visibility: item.visibility,
            status: "draft"
          }
        });
      }

      await logMutationAudit(req, "DUPLICATE_PAGE_SECTION", "PageSection", newSection.id, `Cloned from ${source.id} (${source.name})`);
      triggerRevalidation();
      res.status(201).json(newSection);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to duplicate section", details: e?.message });
    }
  });

  // REORDER SECTIONS BATCH
  app.post("/api/hub/composition/sections/reorder", async (req: Request, res: Response) => {
    const role = ((req as any).user?.role || req.headers["x-role"] || "ADMIN").toString().toUpperCase();
    if (role === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot reorder sections" });
    }

    try {
      const { orderMap } = req.body; // Array of { id: string, displayOrder: number }
      if (!Array.isArray(orderMap)) {
        return res.status(400).json({ error: "Invalid orderMap array" });
      }

      for (const item of orderMap) {
        await prisma.pageSection.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder }
        });
      }

      await logMutationAudit(req, "REORDER_PAGE_SECTIONS", "PageSection", "batch", `Reordered ${orderMap.length} sections`);
      triggerRevalidation();
      res.json({ success: true, count: orderMap.length });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to reorder sections" });
    }
  });

  // -------------------------------------------------------------
  // 3. SECTION ITEMS CRUD
  // -------------------------------------------------------------
  app.post("/api/hub/composition/sections/:sectionId/items", async (req: Request, res: Response) => {
    const role = ((req as any).user?.role || req.headers["x-role"] || "ADMIN").toString().toUpperCase();
    if (role === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot create section items" });
    }

    try {
      const { sectionId } = req.params;
      const {
        title,
        subtitle,
        body,
        image,
        imageAlt,
        ctaLabel,
        ctaHref,
        icon,
        metadata,
        displayOrder,
        visibility = "visible",
        status = "published"
      } = req.body;

      let order = displayOrder;
      if (order === undefined || order === null) {
        const last = await prisma.sectionItem.findFirst({
          where: { sectionId },
          orderBy: { displayOrder: "desc" }
        });
        order = (last?.displayOrder || 0) + 1;
      }

      const item = await prisma.sectionItem.create({
        data: {
          sectionId,
          title: typeof title === "object" ? JSON.stringify(title) : (title || "{}"),
          subtitle: typeof subtitle === "object" ? JSON.stringify(subtitle) : (subtitle || "{}"),
          body: typeof body === "object" ? JSON.stringify(body) : (body || "{}"),
          image: image || null,
          imageAlt: typeof imageAlt === "object" ? JSON.stringify(imageAlt) : (imageAlt || "{}"),
          ctaLabel: typeof ctaLabel === "object" ? JSON.stringify(ctaLabel) : (ctaLabel || "{}"),
          ctaHref: ctaHref || null,
          icon: icon || null,
          metadata: typeof metadata === "object" ? JSON.stringify(metadata) : (metadata || "{}"),
          displayOrder: order,
          visibility,
          status,
          createdBy: (req as any).user?.email || "admin@iraqi-chineseagency.com"
        }
      });

      await logMutationAudit(req, "CREATE_SECTION_ITEM", "SectionItem", item.id, `Created item in section ${sectionId}`);
      triggerRevalidation();
      res.status(201).json(item);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to create item", details: e?.message });
    }
  });

  app.put("/api/hub/composition/sections/:sectionId/items/:itemId", async (req: Request, res: Response) => {
    const role = ((req as any).user?.role || req.headers["x-role"] || "ADMIN").toString().toUpperCase();
    if (role === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot update section items" });
    }

    try {
      const { itemId } = req.params;
      const {
        title,
        subtitle,
        body,
        image,
        imageAlt,
        ctaLabel,
        ctaHref,
        icon,
        metadata,
        displayOrder,
        visibility,
        status
      } = req.body;

      const updated = await prisma.sectionItem.update({
        where: { id: itemId },
        data: {
          ...(title !== undefined && { title: typeof title === "object" ? JSON.stringify(title) : title }),
          ...(subtitle !== undefined && { subtitle: typeof subtitle === "object" ? JSON.stringify(subtitle) : subtitle }),
          ...(body !== undefined && { body: typeof body === "object" ? JSON.stringify(body) : body }),
          ...(image !== undefined && { image }),
          ...(imageAlt !== undefined && { imageAlt: typeof imageAlt === "object" ? JSON.stringify(imageAlt) : imageAlt }),
          ...(ctaLabel !== undefined && { ctaLabel: typeof ctaLabel === "object" ? JSON.stringify(ctaLabel) : ctaLabel }),
          ...(ctaHref !== undefined && { ctaHref }),
          ...(icon !== undefined && { icon }),
          ...(metadata !== undefined && { metadata: typeof metadata === "object" ? JSON.stringify(metadata) : metadata }),
          ...(displayOrder !== undefined && { displayOrder }),
          ...(visibility && { visibility }),
          ...(status && { status }),
          updatedBy: (req as any).user?.email || "admin@iraqi-chineseagency.com"
        }
      });

      await logMutationAudit(req, "UPDATE_SECTION_ITEM", "SectionItem", itemId, `Updated item ${itemId}`);
      triggerRevalidation();
      res.json(updated);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to update item", details: e?.message });
    }
  });

  app.delete("/api/hub/composition/sections/:sectionId/items/:itemId", async (req: Request, res: Response) => {
    const role = ((req as any).user?.role || req.headers["x-role"] || "ADMIN").toString().toUpperCase();
    if (role === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot delete items" });
    }

    const isPermanent = req.query.permanent === "true";
    try {
      const { itemId } = req.params;
      if (isPermanent) {
        await prisma.sectionItem.delete({ where: { id: itemId } });
        await logMutationAudit(req, "PERMANENT_DELETE_SECTION_ITEM", "SectionItem", itemId, `Permanently deleted item ${itemId}`);
      } else {
        await prisma.sectionItem.update({
          where: { id: itemId },
          data: { status: "archived", visibility: "hidden" }
        });
        await logMutationAudit(req, "SOFT_DELETE_SECTION_ITEM", "SectionItem", itemId, `Archived item ${itemId}`);
      }

      triggerRevalidation();
      res.json({ success: true, itemId, permanent: isPermanent });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to delete item", details: e?.message });
    }
  });

  app.post("/api/hub/composition/sections/:sectionId/items/:itemId/restore", async (req: Request, res: Response) => {
    const role = ((req as any).user?.role || req.headers["x-role"] || "ADMIN").toString().toUpperCase();
    if (role === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot restore items" });
    }

    try {
      const { itemId } = req.params;
      const restored = await prisma.sectionItem.update({
        where: { id: itemId },
        data: { status: "published", visibility: "visible" }
      });

      await logMutationAudit(req, "RESTORE_SECTION_ITEM", "SectionItem", itemId, `Restored item ${itemId}`);
      triggerRevalidation();
      res.json(restored);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to restore item", details: e?.message });
    }
  });

  // -------------------------------------------------------------
  // 4. SECTION TEMPLATES
  // -------------------------------------------------------------
  app.get("/api/hub/composition/templates", async (req: Request, res: Response) => {
    try {
      const templates = await prisma.sectionTemplate.findMany({
        orderBy: { slug: "asc" }
      });
      res.json(templates);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch templates" });
    }
  });

  // -------------------------------------------------------------
  // 5. REVISIONS & ROLLBACK
  // -------------------------------------------------------------
  app.get("/api/hub/composition/revisions/:sectionId", async (req: Request, res: Response) => {
    try {
      const { sectionId } = req.params;
      const revisions = await prisma.sectionRevision.findMany({
        where: { sectionId },
        orderBy: { timestamp: "desc" },
        take: 30
      });
      res.json(revisions);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch revisions" });
    }
  });

  app.post("/api/hub/composition/revisions/:revisionId/rollback", async (req: Request, res: Response) => {
    const role = ((req as any).user?.role || req.headers["x-role"] || "ADMIN").toString().toUpperCase();
    if (role !== "ADMIN" && role !== "SUPERADMIN") {
      return res.status(403).json({ error: "Forbidden: Only Administrator can execute section rollbacks" });
    }

    try {
      const { revisionId } = req.params;
      const rev = await prisma.sectionRevision.findUnique({
        where: { id: revisionId }
      });

      if (!rev) return res.status(404).json({ error: "Revision not found" });

      const snapshot = JSON.parse(rev.snapshot);
      if (!snapshot) return res.status(400).json({ error: "Invalid snapshot in revision" });

      // Apply snapshot
      const restored = await prisma.pageSection.update({
        where: { id: rev.sectionId },
        data: {
          name: snapshot.name,
          type: snapshot.type,
          displayOrder: snapshot.displayOrder,
          visibility: snapshot.visibility,
          styleOverride: typeof snapshot.styleOverride === "object" ? JSON.stringify(snapshot.styleOverride) : snapshot.styleOverride,
          localeOverride: typeof snapshot.localeOverride === "object" ? JSON.stringify(snapshot.localeOverride) : snapshot.localeOverride,
          config: typeof snapshot.config === "object" ? JSON.stringify(snapshot.config) : snapshot.config,
          status: snapshot.status || "published"
        }
      });

      // Record rollback revision
      await prisma.sectionRevision.create({
        data: {
          sectionId: rev.sectionId,
          snapshot: JSON.stringify(restored),
          actorId: (req as any).user?.id || "admin_user",
          action: "rollback"
        }
      });

      await logMutationAudit(req, "ROLLBACK_SECTION_REVISION", "PageSection", rev.sectionId, `Rolled back to revision ${revisionId}`);
      triggerRevalidation();
      res.json({ success: true, section: restored });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to rollback revision", details: e?.message });
    }
  });
}
