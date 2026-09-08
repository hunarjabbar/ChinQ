const fs = require('fs');

// Fix server.app.ts
let serverCode = fs.readFileSync('server.app.ts', 'utf-8');

const adminGetArticle = `
  app.get("/api/admin/articles/:id", authMiddleware, async (req: any, res: any) => {
    try {
      const article = await prisma.article.findUnique({
        where: { id: req.params.id },
        include: { translations: true, category: true, author: true },
      });
      if (!article) return res.status(404).json({ error: "Article not found" });
      res.json(article);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });
`;

serverCode = serverCode.replace('  app.put("/api/admin/articles/:id",', adminGetArticle + '\\n  app.put("/api/admin/articles/:id",');
fs.writeFileSync('server.app.ts', serverCode);

// Fix TrilingualEditor.tsx
let editorCode = fs.readFileSync('src/components/TrilingualEditor.tsx', 'utf-8');
editorCode = editorCode.replace(/apiFetch\('\/api\/articles\/' \+ id\)/g, "apiFetch('/api/admin/articles/' + id)");
editorCode = editorCode.replace(/t\.languageCode/g, "t.lang"); // Also fix the property name where we map to formData!
fs.writeFileSync('src/components/TrilingualEditor.tsx', editorCode);

console.log("Fixed server.app.ts and TrilingualEditor.tsx");
