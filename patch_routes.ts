import fs from 'fs';

const code = fs.readFileSync('server.app.ts', 'utf8');

const routes = `
  // --- Videos CRUD ---
  app.get("/api/videos", async (req, res) => {
    try {
      const { q, region, category, trending, featured } = req.query;
      const where: any = {};

      if (region && typeof region === "string" && region !== "ALL") where.region = region;
      if (category && typeof category === "string" && category !== "ALL") where.category = category;
      if (trending === "true") where.isTrending = true;
      if (featured === "true") where.isFeatured = true;

      if (q && typeof q === "string") {
        where.OR = [
          { titleEn: { contains: q } },
          { descriptionEn: { contains: q } },
        ];
      }

      const items = await prisma.video.findMany({
        where,
        orderBy: { publishedAt: "desc" },
      });
      res.json(items);
    } catch (e: any) {
      console.error("Error fetching videos:", e);
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  app.get("/api/videos/:idOrSlug", async (req, res) => {
    try {
      const { idOrSlug } = req.params;
      const item = await prisma.video.findFirst({
        where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
      });
      if (!item) return res.status(404).json({ error: "Not found" });
      res.json(item);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch video" });
    }
  });

  app.post("/api/videos", authMiddleware, async (req, res) => {
    try {
      const body = req.body;
      const slug = body.slug || \`video-\${Date.now()}-\${(body.titleEn||"").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}\`;
      const newItem = await prisma.video.create({
        data: {
          ...body,
          slug,
          publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
        },
      });
      res.json(newItem);
    } catch (e: any) {
      console.error("Error creating video:", e);
      res.status(500).json({ error: "Failed to create video" });
    }
  });

  app.put("/api/videos/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id; delete data.createdAt; delete data.updatedAt;
      if (data.publishedAt) data.publishedAt = new Date(data.publishedAt);
      const updated = await prisma.video.update({ where: { id }, data });
      res.json(updated);
    } catch (e: any) {
      console.error("Error updating video:", e);
      res.status(500).json({ error: "Failed to update video" });
    }
  });

  app.delete("/api/videos/:id", authMiddleware, async (req, res) => {
    try {
      await prisma.video.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to delete video" });
    }
  });

  // --- Documentaries CRUD ---
  app.get("/api/documentaries", async (req, res) => {
    try {
      const { q, region, category, trending, featured } = req.query;
      const where: any = {};
      if (region && typeof region === "string" && region !== "ALL") where.region = region;
      if (category && typeof category === "string" && category !== "ALL") where.category = category;
      if (trending === "true") where.isTrending = true;
      if (featured === "true") where.isFeatured = true;

      if (q && typeof q === "string") {
        where.OR = [
          { titleEn: { contains: q } },
          { synopsisEn: { contains: q } },
        ];
      }

      const items = await prisma.documentary.findMany({
        where,
        orderBy: { publishedAt: "desc" },
      });
      res.json(items);
    } catch (e: any) {
      console.error("Error fetching documentaries:", e);
      res.status(500).json({ error: "Failed to fetch documentaries" });
    }
  });

  app.get("/api/documentaries/:idOrSlug", async (req, res) => {
    try {
      const { idOrSlug } = req.params;
      const item = await prisma.documentary.findFirst({
        where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
      });
      if (!item) return res.status(404).json({ error: "Not found" });
      res.json(item);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch documentary" });
    }
  });

  app.post("/api/documentaries", authMiddleware, async (req, res) => {
    try {
      const body = req.body;
      const slug = body.slug || \`doc-\${Date.now()}-\${(body.titleEn||"").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}\`;
      const newItem = await prisma.documentary.create({
        data: {
          ...body,
          slug,
          publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
        },
      });
      res.json(newItem);
    } catch (e: any) {
      console.error("Error creating documentary:", e);
      res.status(500).json({ error: "Failed to create documentary" });
    }
  });

  app.put("/api/documentaries/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id; delete data.createdAt; delete data.updatedAt;
      if (data.publishedAt) data.publishedAt = new Date(data.publishedAt);
      const updated = await prisma.documentary.update({ where: { id }, data });
      res.json(updated);
    } catch (e: any) {
      console.error("Error updating documentary:", e);
      res.status(500).json({ error: "Failed to update documentary" });
    }
  });

  app.delete("/api/documentaries/:id", authMiddleware, async (req, res) => {
    try {
      await prisma.documentary.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to delete documentary" });
    }
  });
`;

if (!code.includes('/api/videos')) {
  const insertionPoint = code.indexOf('app.delete("/api/podcasts/:id"');
  if (insertionPoint !== -1) {
    const endOfPodcastDelete = code.indexOf('});', insertionPoint) + 3;
    const newCode = code.slice(0, endOfPodcastDelete) + '\n' + routes + code.slice(endOfPodcastDelete);
    fs.writeFileSync('server.app.ts', newCode);
    console.log('Routes added successfully.');
  } else {
    console.log('Could not find insertion point.');
  }
} else {
  console.log('Routes already exist.');
}
