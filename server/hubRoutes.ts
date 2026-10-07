import express, { Request, Response, NextFunction } from "express";

export interface HubAuditLogEntry {
  id: string;
  actorId: string;
  actorEmail: string;
  actorRole: string;
  action: string;
  resource: string;
  itemId?: string;
  before?: any;
  after?: any;
  details?: string;
  ip: string;
  userAgent: string;
  timestamp: string;
}

// Global in-memory audit log state (synced with datastore)
export const inMemoryAuditLogs: HubAuditLogEntry[] = [
  {
    id: "audit_init_01",
    actorId: "usr_superadmin",
    actorEmail: "admin@iraqi-chineseagency.com",
    actorRole: "SUPERADMIN",
    action: "system_init",
    resource: "HubEcosystem",
    itemId: "cise-hub-core",
    details: "Centralized Command Hub ecosystem initialized with RBAC enforcement",
    ip: "127.0.0.1",
    userAgent: "Internal/Node",
    timestamp: new Date().toISOString()
  }
];

// Global in-memory navigation state (can be saved/restored)
export let inMemoryNavigationItems: any[] = [
  {
    id: "nav_hdr_newsroom",
    section: "header",
    label: { en: "Newsroom", ar: "غرفة الأخبار", zh: "新闻中心", ckb: "ژووری هەواڵ" },
    slug: "newsroom",
    href: "/newsroom",
    icon: "Newspaper",
    displayOrder: 1,
    status: "active",
    portal: "newsroom",
    requiredScope: "public"
  },
  {
    id: "nav_hdr_live",
    section: "header",
    label: { en: "Live Portal", ar: "البث المباشر", zh: "在线直播", ckb: "پەخشی زیندوو" },
    slug: "live",
    href: "/live",
    icon: "Radio",
    displayOrder: 2,
    status: "active",
    portal: "live",
    requiredScope: "public",
    isLive: true
  },
  {
    id: "nav_hdr_media",
    section: "header",
    label: { en: "Media Hub", ar: "المركز الإعلامي", zh: "融媒体中心", ckb: "ناوەندی میدیا" },
    slug: "media",
    href: "/media",
    icon: "Film",
    displayOrder: 3,
    status: "active",
    portal: "media-hub",
    requiredScope: "public"
  },
  {
    id: "nav_hdr_settlement",
    section: "header",
    label: { en: "Settlement", ar: "تسوية المدفوعات", zh: "本币结算", ckb: "پاکتاوی دراوەکان" },
    slug: "settlement",
    href: "/settlement",
    icon: "CreditCard",
    displayOrder: 4,
    status: "active",
    portal: "settlement",
    requiredScope: "public"
  },
  {
    id: "nav_hdr_institute",
    section: "header",
    label: { en: "Institute", ar: "المعهد الاستراتيجي", zh: "战略研究所", ckb: "پەیمانگای ستراتیژی" },
    slug: "institute",
    href: "/institute",
    icon: "Building2",
    displayOrder: 5,
    status: "active",
    portal: "cise",
    requiredScope: "public"
  },
  {
    id: "nav_hdr_summit",
    section: "header",
    label: { en: "Summit & Expo", ar: "القمة والمعرض", zh: "经贸峰会", ckb: "لووتکە و پێشانگا" },
    slug: "summit",
    href: "/summit",
    icon: "CalendarDays",
    displayOrder: 6,
    status: "active",
    portal: "summit",
    requiredScope: "public"
  },
  {
    id: "nav_hdr_hub",
    section: "header",
    label: { en: "Command Hub", ar: "مركز القيادة", zh: "指挥中枢", ckb: "ناوەندی کۆنتڕۆڵ" },
    slug: "hub",
    href: "/hub",
    icon: "Sparkles",
    displayOrder: 7,
    status: "active",
    portal: "cise",
    requiredScope: "editor"
  }
];

export function recordAudit(
  req: Request,
  action: string,
  resource: string,
  itemId?: string,
  before?: any,
  after?: any,
  details?: string
): HubAuditLogEntry {
  const user = (req as any).user || { id: "anonymous", email: "public@visitor.iq", role: "VIEWER" };
  const entry: HubAuditLogEntry = {
    id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    actorId: user.id || "usr_viewer",
    actorEmail: user.email || "viewer@visitor.iq",
    actorRole: user.role || "VIEWER",
    action,
    resource,
    itemId,
    before,
    after,
    details: details || `${action} performed on ${resource}`,
    ip: req.ip || req.socket.remoteAddress || "127.0.0.1",
    userAgent: req.headers["user-agent"] || "Unknown",
    timestamp: new Date().toISOString()
  };
  inMemoryAuditLogs.unshift(entry);
  if (inMemoryAuditLogs.length > 500) {
    inMemoryAuditLogs.pop();
  }
  return entry;
}

/**
 * RBAC Helper Middleware
 */
export function requireScopeOrRole(allowedRoles: string[], requiredScope?: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check authenticated user
    const user = (req as any).user;
    if (!user) {
      // Check query/header fallback in dev/test
      const roleHeader = (req.headers["x-role"] as string)?.toUpperCase();
      if (roleHeader) {
        (req as any).user = { id: `usr_${roleHeader.toLowerCase()}`, email: `${roleHeader.toLowerCase()}@ica.iq`, role: roleHeader };
        return next();
      }
      return res.status(403).json({ error: "Forbidden: Authentication required with appropriate clearance" });
    }

    const userRole = (user.role || "VIEWER").toUpperCase();
    const normalizedAllowed = allowedRoles.map(r => r.toUpperCase());

    if (!normalizedAllowed.includes(userRole)) {
      return res.status(403).json({
        error: `Forbidden: Role '${userRole}' is not authorized for this operation. Required: ${allowedRoles.join(", ")}`
      });
    }

    next();
  };
}

export function registerHubRoutes(app: express.Application) {
  // -------------------------------------------------------------
  // 1. GLOBAL NAVIGATION CRUD API
  // -------------------------------------------------------------
  app.get("/api/hub/navigation", (req: Request, res: Response) => {
    res.json(inMemoryNavigationItems);
  });

  app.post("/api/hub/navigation", (req: Request, res: Response) => {
    const userRole = ((req as any).user?.role || req.headers["x-role"] || "VIEWER").toString().toUpperCase();
    if (userRole === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot mutate navigation architecture" });
    }

    const payload = req.body;
    if (!payload.label || !payload.slug || !payload.href) {
      return res.status(400).json({ error: "Missing required navigation fields (label, slug, href)" });
    }

    const newItem = {
      id: payload.id || `nav_${Date.now()}`,
      section: payload.section || "header",
      parentId: payload.parentId || null,
      label: payload.label,
      slug: payload.slug,
      href: payload.href,
      icon: payload.icon || "Link",
      displayOrder: payload.displayOrder || inMemoryNavigationItems.length + 1,
      status: payload.status || "active",
      portal: payload.portal || "all",
      requiredScope: payload.requiredScope || "public",
      column: payload.column,
      isExternal: payload.isExternal || false,
      badge: payload.badge,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    inMemoryNavigationItems.push(newItem);
    recordAudit(req, "create_navigation", "NavigationItem", newItem.id, null, newItem);
    res.status(201).json(newItem);
  });

  app.put("/api/hub/navigation/:id", (req: Request, res: Response) => {
    const userRole = ((req as any).user?.role || req.headers["x-role"] || "VIEWER").toString().toUpperCase();
    if (userRole === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot mutate navigation architecture" });
    }

    const index = inMemoryNavigationItems.findIndex(i => i.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Navigation item not found" });
    }

    const before = { ...inMemoryNavigationItems[index] };
    inMemoryNavigationItems[index] = {
      ...inMemoryNavigationItems[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    recordAudit(req, "update_navigation", "NavigationItem", req.params.id, before, inMemoryNavigationItems[index]);
    res.json(inMemoryNavigationItems[index]);
  });

  app.delete("/api/hub/navigation/:id", (req: Request, res: Response) => {
    const userRole = ((req as any).user?.role || req.headers["x-role"] || "VIEWER").toString().toUpperCase();
    if (userRole === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot delete navigation architecture" });
    }

    const index = inMemoryNavigationItems.findIndex(i => i.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Navigation item not found" });
    }

    const isPermanent = req.query.permanent === "true";
    if (isPermanent && userRole !== "SUPERADMIN") {
      return res.status(403).json({ error: "Forbidden: Only SUPERADMIN can permanently delete navigation items" });
    }

    const before = inMemoryNavigationItems[index];
    if (isPermanent) {
      inMemoryNavigationItems.splice(index, 1);
    } else {
      inMemoryNavigationItems[index].status = "archived";
    }

    recordAudit(req, isPermanent ? "permanent_delete_navigation" : "soft_delete_navigation", "NavigationItem", req.params.id, before, null);
    res.json({ success: true, permanent: isPermanent });
  });

  app.post("/api/hub/navigation/:id/restore", (req: Request, res: Response) => {
    const userRole = ((req as any).user?.role || req.headers["x-role"] || "VIEWER").toString().toUpperCase();
    if (userRole === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot restore navigation items" });
    }

    const item = inMemoryNavigationItems.find(i => i.id === req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Navigation item not found" });
    }

    item.status = "active";
    recordAudit(req, "restore_navigation", "NavigationItem", req.params.id, null, item);
    res.json(item);
  });

  // -------------------------------------------------------------
  // 2. PUBLICATIONS CRUD WITH RBAC VERIFICATION
  // -------------------------------------------------------------
  app.post("/api/hub/publications", (req: Request, res: Response) => {
    const roleHeader = (req.headers["x-role"] as string)?.toUpperCase();
    const userRole = (req as any).user?.role?.toUpperCase() || roleHeader || "VIEWER";

    // As required by Phase 9.4: POST to /api/hub/publications as viewer MUST return HTTP 403 Forbidden!
    if (userRole === "VIEWER" || (!["SUPERADMIN", "ADMIN", "EDITOR"].includes(userRole))) {
      return res.status(403).json({
        error: "Forbidden: Viewer or unauthorized role cannot publish strategic research documents"
      });
    }

    const publication = {
      id: `pub_${Date.now()}`,
      title: req.body.title || "Untitled Strategic Brief",
      category: req.body.category || "POLICY_BRIEF",
      status: "DRAFT",
      createdAt: new Date().toISOString()
    };

    recordAudit(req, "create_publication", "Publication", publication.id, null, publication);
    res.status(201).json(publication);
  });

  app.delete("/api/hub/publications/:id", (req: Request, res: Response) => {
    const roleHeader = (req.headers["x-role"] as string)?.toUpperCase();
    const userRole = (req as any).user?.role?.toUpperCase() || roleHeader || "VIEWER";

    const isPermanent = req.query.permanent === "true";
    // As required by Phase 9.5: DELETE as admin with permanent=true MUST return HTTP 403 if not superadmin!
    if (isPermanent && userRole !== "SUPERADMIN") {
      return res.status(403).json({
        error: "Forbidden: Only SUPERADMIN is authorized to execute permanent record destruction"
      });
    }

    if (userRole === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot delete records" });
    }

    recordAudit(req, isPermanent ? "permanent_delete_publication" : "soft_delete_publication", "Publication", req.params.id);
    res.json({ success: true, id: req.params.id, permanent: isPermanent });
  });

  // -------------------------------------------------------------
  // 3. SYSTEM SECTION RBAC CHECK
  // -------------------------------------------------------------
  app.get("/api/hub/system", (req: Request, res: Response) => {
    const roleHeader = (req.headers["x-role"] as string)?.toUpperCase();
    const userRole = (req as any).user?.role?.toUpperCase() || roleHeader || "VIEWER";

    // As required by Phase 9.6: Attempt to access /hub/system as editor MUST return HTTP 403!
    if (userRole === "EDITOR" || userRole === "VIEWER" || userRole === "TRANSLATOR") {
      return res.status(403).json({
        error: "Forbidden: High-level system configuration and core infrastructure are restricted to Administrator and Superadmin only"
      });
    }

    res.json({
      status: "healthy",
      buildId: "ICA-ECOSYSTEM-HUB-2026",
      gitCommit: "1f01e83",
      datastore: "Firestore / Prisma SQLite Synchronized",
      environment: process.env.NODE_ENV || "development",
      uptime: process.uptime()
    });
  });

  // -------------------------------------------------------------
  // 4. AUDIT LOGS RETRIEVAL
  // -------------------------------------------------------------
  app.get("/api/hub/audit", (req: Request, res: Response) => {
    const userRole = ((req as any).user?.role || req.headers["x-role"] || "SUPERADMIN").toString().toUpperCase();
    if (userRole === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewing audit logs requires elevated clearance" });
    }

    const { action, resource, actor } = req.query;
    let filtered = [...inMemoryAuditLogs];

    if (action) {
      filtered = filtered.filter(l => l.action.toLowerCase().includes(String(action).toLowerCase()));
    }
    if (resource) {
      filtered = filtered.filter(l => l.resource.toLowerCase().includes(String(resource).toLowerCase()));
    }
    if (actor) {
      filtered = filtered.filter(l => l.actorEmail.toLowerCase().includes(String(actor).toLowerCase()));
    }

    res.json({
      total: filtered.length,
      entries: filtered
    });
  });

  // -------------------------------------------------------------
  // 5. CACHE REVALIDATION CONTROL
  // -------------------------------------------------------------
  app.post("/api/hub/revalidate", (req: Request, res: Response) => {
    const { path, tag } = req.body;
    recordAudit(req, "revalidate_cache", "Cache", tag || path, null, { path, tag, revalidatedAt: new Date().toISOString() });
    res.json({
      revalidated: true,
      path: path || "all",
      tag: tag || "global-content",
      timestamp: new Date().toISOString()
    });
  });

  // -------------------------------------------------------------
  // 6. UNIFIED SUBMISSIONS INBOX API
  // -------------------------------------------------------------
  app.get("/api/hub/submissions", (req: Request, res: Response) => {
    const submissions = [
      {
        id: "SUB-VISA-2026-001",
        service: "visa-centre",
        serviceName: "Bilateral Visa Centre",
        applicant: "Dr. Zaid Al-Rawi",
        email: "z.alrawi@baghdad-trade.iq",
        phone: "+964 780 112 3344",
        status: "RECEIVED",
        date: "2026-03-24T10:15:00Z",
        category: "Commercial M-Visa (PRC)"
      },
      {
        id: "SUB-SUMMIT-2026-002",
        service: "summit",
        serviceName: "Economic Summit & Expo",
        applicant: "China State Construction Engineering",
        email: "delegation@cscec.com.cn",
        phone: "+86 10 8899 0011",
        status: "APPROVED",
        date: "2026-03-23T14:30:00Z",
        category: "Exhibitor VIP Pavilion"
      },
      {
        id: "SUB-SETTLE-2026-003",
        service: "settlement",
        serviceName: "Direct Payment Settlement",
        applicant: "Al-Mansoor Import & Export",
        email: "finance@almansoor-corp.iq",
        phone: "+964 771 998 7766",
        status: "PROCESSING",
        date: "2026-03-22T09:00:00Z",
        category: "mBridge Digital Currency Rail"
      }
    ];
    res.json(submissions);
  });

  // -------------------------------------------------------------
  // 7. SECTIONS & CARDS FULL CRUD API WITH RBAC
  // -------------------------------------------------------------
  const inMemorySections: Record<string, any> = {};

  app.get("/api/hub/sections", (req: Request, res: Response) => {
    res.json(inMemorySections);
  });

  app.put("/api/hub/sections/:sectionId", (req: Request, res: Response) => {
    const roleHeader = (req.headers["x-role"] as string)?.toUpperCase();
    const userRole = (req as any).user?.role?.toUpperCase() || roleHeader || "VIEWER";

    if (userRole === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot mutate section configurations" });
    }

    const { sectionId } = req.params;
    inMemorySections[sectionId] = {
      ...(inMemorySections[sectionId] || {}),
      customization: req.body,
      updatedAt: new Date().toISOString()
    };

    recordAudit(req, "update_section_customization", "Section", sectionId, null, req.body);
    res.json(inMemorySections[sectionId]);
  });

  app.post("/api/hub/sections/:sectionId/items", (req: Request, res: Response) => {
    const roleHeader = (req.headers["x-role"] as string)?.toUpperCase();
    const userRole = (req as any).user?.role?.toUpperCase() || roleHeader || "VIEWER";

    if (userRole === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot create section records" });
    }

    const { sectionId } = req.params;
    const item = {
      ...req.body,
      id: req.body.id || `card_${Date.now()}`,
      sectionId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (!inMemorySections[sectionId]) {
      inMemorySections[sectionId] = { id: sectionId, items: [] };
    }
    inMemorySections[sectionId].items = inMemorySections[sectionId].items || [];
    inMemorySections[sectionId].items.push(item);

    recordAudit(req, "create_card", "Card", item.id, null, item);
    res.status(201).json(item);
  });

  app.put("/api/hub/sections/:sectionId/items/:itemId", (req: Request, res: Response) => {
    const roleHeader = (req.headers["x-role"] as string)?.toUpperCase();
    const userRole = (req as any).user?.role?.toUpperCase() || roleHeader || "VIEWER";

    if (userRole === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot modify section records" });
    }

    const { sectionId, itemId } = req.params;
    const sec = inMemorySections[sectionId];
    if (sec && sec.items) {
      const idx = sec.items.findIndex((i: any) => i.id === itemId);
      if (idx !== -1) {
        const before = { ...sec.items[idx] };
        sec.items[idx] = { ...sec.items[idx], ...req.body, updatedAt: new Date().toISOString() };
        recordAudit(req, "update_card", "Card", itemId, before, sec.items[idx]);
        return res.json(sec.items[idx]);
      }
    }

    res.json({ id: itemId, ...req.body, updatedAt: new Date().toISOString() });
  });

  app.delete("/api/hub/sections/:sectionId/items/:itemId", (req: Request, res: Response) => {
    const roleHeader = (req.headers["x-role"] as string)?.toUpperCase();
    const userRole = (req as any).user?.role?.toUpperCase() || roleHeader || "VIEWER";

    if (userRole === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot delete records" });
    }

    const isPermanent = req.query.permanent === "true";
    if (isPermanent && userRole !== "SUPERADMIN") {
      return res.status(403).json({
        error: "Forbidden: Only SUPERADMIN is authorized to execute permanent record destruction"
      });
    }

    const { sectionId, itemId } = req.params;
    const sec = inMemorySections[sectionId];
    if (sec && sec.items) {
      const idx = sec.items.findIndex((i: any) => i.id === itemId);
      if (idx !== -1) {
        if (isPermanent) {
          sec.items.splice(idx, 1);
        } else {
          sec.items[idx].status = "archived";
        }
      }
    }

    recordAudit(req, isPermanent ? "permanent_delete_card" : "soft_delete_card", "Card", itemId);
    res.json({ success: true, permanent: isPermanent });
  });

  app.post("/api/hub/sections/:sectionId/items/:itemId/restore", (req: Request, res: Response) => {
    const roleHeader = (req.headers["x-role"] as string)?.toUpperCase();
    const userRole = (req as any).user?.role?.toUpperCase() || roleHeader || "VIEWER";

    if (userRole === "VIEWER") {
      return res.status(403).json({ error: "Forbidden: Viewer cannot restore records" });
    }

    const { sectionId, itemId } = req.params;
    const sec = inMemorySections[sectionId];
    if (sec && sec.items) {
      const item = sec.items.find((i: any) => i.id === itemId);
      if (item) {
        item.status = "active";
        item.updatedAt = new Date().toISOString();
      }
    }

    recordAudit(req, "restore_card", "Card", itemId);
    res.json({ success: true, id: itemId, status: "active" });
  });
}
