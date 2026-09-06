const fs = require('fs');
let serverContent = fs.readFileSync('server.ts', 'utf8');

// Add GET /api/admin/subscribers to server.ts
if (!serverContent.includes('/api/admin/subscribers')) {
    const api = `
  app.get("/api/admin/subscribers", authMiddleware, async (req, res) => {
    try {
      const subscribers = await prisma.newsletterSubscriber.findMany({
        orderBy: { createdAt: 'desc' }
      });
      res.json(subscribers);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch subscribers" });
    }
  });
`;
    serverContent = serverContent.replace('app.get("/api/admin/users"', api + '\n  app.get("/api/admin/users"');
    fs.writeFileSync('server.ts', serverContent);
}

