import re

with open("server.ts", "r", encoding="utf-8") as f:
    content = f.read()

middleware = """
  const authMiddleware = async (req: any, res: any, next: any) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ error: "Unauthorized" });
      const token = authHeader.split(" ")[1];
      const jwt = await import("jsonwebtoken");
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "chinq_secret_key_123");
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user) return res.status(401).json({ error: "Unauthorized" });
      req.user = user;
      next();
    } catch (e) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  const adminMiddleware = async (req: any, res: any, next: any) => {
    authMiddleware(req, res, () => {
      if (req.user.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });
      next();
    });
  };
"""

content = content.replace("app.post(\"/api/admin/articles\"", middleware + "\n  app.post(\"/api/admin/articles\"")

# Add authMiddleware to /api/admin/* routes
def replace_route(route_start):
    global content
    content = content.replace(route_start, route_start.replace('", async', '", authMiddleware, async'))

replace_route('app.post("/api/admin/articles", async')
replace_route('app.put("/api/admin/articles/:id", async')
replace_route('app.delete("/api/admin/articles/:id", async')

# And adminMiddleware to user routes
replace_route('app.get("/api/admin/users", async')
content = content.replace('app.get("/api/admin/users", authMiddleware, async', 'app.get("/api/admin/users", adminMiddleware, async')

replace_route('app.post("/api/admin/users", async')
content = content.replace('app.post("/api/admin/users", authMiddleware, async', 'app.post("/api/admin/users", adminMiddleware, async')

replace_route('app.put("/api/admin/users/:id", async')
content = content.replace('app.put("/api/admin/users/:id", authMiddleware, async', 'app.put("/api/admin/users/:id", adminMiddleware, async')

replace_route('app.delete("/api/admin/users/:id", async')
content = content.replace('app.delete("/api/admin/users/:id", authMiddleware, async', 'app.delete("/api/admin/users/:id", adminMiddleware, async')

# Live events
replace_route('app.post("/api/admin/live", async')
replace_route('app.put("/api/admin/live/:id", async')
replace_route('app.delete("/api/admin/live/:id", async')

# Live updates
replace_route('app.post("/api/admin/live/:id/updates", async')
replace_route('app.delete("/api/admin/live/updates/:updateId", async')

with open("server.ts", "w", encoding="utf-8") as f:
    f.write(content)
