import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

const publicRoute = `
  app.post("/api/public/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Valid email is required" });
      }
      
      const existing = await prisma.newsletterSubscriber.findUnique({
        where: { email },
      });
      
      if (existing) {
        if (!existing.isActive) {
          const updated = await prisma.newsletterSubscriber.update({
            where: { email },
            data: { isActive: true }
          });
          return res.json({ success: true, message: "Re-subscribed successfully" });
        }
        return res.status(400).json({ error: "Email is already subscribed" });
      }
      
      const subscriber = await prisma.newsletterSubscriber.create({
        data: { email }
      });
      
      res.json({ success: true, subscriber });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to subscribe" });
    }
  });
`;

const adminRoutes = `
  app.get("/api/admin/newsletter", adminMiddleware, async (req, res) => {
    try {
      const subscribers = await prisma.newsletterSubscriber.findMany({
        orderBy: { createdAt: "desc" },
      });
      res.json(subscribers);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch subscribers" });
    }
  });

  app.delete("/api/admin/newsletter/:id", adminMiddleware, async (req, res) => {
    try {
      await prisma.newsletterSubscriber.delete({
        where: { id: req.params.id },
      });
      res.json({ success: true });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to delete subscriber" });
    }
  });
`;

// Find a good place to insert publicRoute, e.g., before app.post("/api/public/telexes"
code = code.replace(
  '  app.post("/api/public/telexes", async (req, res) => {',
  publicRoute + '\n  app.post("/api/public/telexes", async (req, res) => {'
);

// Find a good place to insert adminRoutes, e.g., before app.get("/api/admin/stats"
code = code.replace(
  '  app.get("/api/admin/stats", adminMiddleware, async (req, res) => {',
  adminRoutes + '\n  app.get("/api/admin/stats", adminMiddleware, async (req, res) => {'
);

fs.writeFileSync('server.ts', code);
