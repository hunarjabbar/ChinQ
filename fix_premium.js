import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

const replacement = `app.get("/api/studies/:slug", async (req, res) => {
    try {
      const study = await prisma.study.findUnique({
        where: { slug: req.params.slug },
        include: { author: true },
      });
      if (!study) return res.status(404).json({ error: "Not found" });

      if (study.isPremium) {
        let isSubscribed = false;
        const authHeader = req.headers.authorization;
        if (authHeader) {
          try {
            const token = authHeader.split(" ")[1];
            const jwt = await import("jsonwebtoken");
            const JWT_SECRET = process.env.JWT_SECRET || "iraq-china-daily-secret-key-2026-development";
            const decoded = jwt.default.verify(token, JWT_SECRET);
            const user = await prisma.user.findUnique({ where: { id: decoded.id } });
            if (user && user.subscriptionStatus === "ACTIVE") {
              isSubscribed = true;
            }
          } catch(e) {}
        }
        
        if (!isSubscribed) {
          // withhold content
          study.content = study.content ? study.content.substring(0, 300) + "..." : "";
        }
      }

      res.json(study);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch study" });
    }
  });`;

code = code.replace(/app\.get\("\/api\/studies\/:slug", async \(req, res\) => {[\s\S]*?res\.status\(500\)\.json\({ error: "Failed to fetch study" }\);\s*}\s*}\);/, replacement);
fs.writeFileSync('server.ts', code);
