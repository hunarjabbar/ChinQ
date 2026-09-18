import fs from 'fs';

let code = fs.readFileSync('server.app.ts', 'utf8');

const regex = /app\.delete\("\/api\/podcasts\/:id", authMiddleware, async \(req, res\) => \{\n\s*try \{\n\s*const \{ id \} = req\.params;\n\s*await prisma\.podcast\.delete\(\{ where: \{ id \} \}\);\n\s*\/\/ --- Videos CRUD ---/g;

if (regex.test(code)) {
  code = code.replace(
    /app\.delete\("\/api\/podcasts\/:id", authMiddleware, async \(req, res\) => \{\n\s*try \{\n\s*const \{ id \} = req\.params;\n\s*await prisma\.podcast\.delete\(\{ where: \{ id \} \}\);\n\s*\/\/ --- Videos CRUD ---/g,
    `app.delete("/api/podcasts/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.podcast.delete({ where: { id } });
      res.json({ success: true, message: "Podcast deleted successfully" });
    } catch (e: any) {
      console.error("Error deleting podcast:", e);
      res.status(500).json({ error: "Failed to delete podcast" });
    }
  });

  // --- Videos CRUD ---`
  );
  fs.writeFileSync('server.app.ts', code);
  console.log('Fixed');
} else {
  console.log('Regex did not match');
}
