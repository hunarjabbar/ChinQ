const fs = require('fs');
let code = fs.readFileSync('server.app.ts', 'utf-8');

const putRoute = `  app.put("/api/admin/articles/:id", authMiddleware, async (req: any, res: any) => {
    try {
      const { slug, categoryId, imageUrl, translations } = req.body;
      const article = await prisma.article.update({
        where: { id: req.params.id },
        data: {
          slug,
          categoryId: categoryId || null,
          imageUrl: imageUrl || null,
        }
      });
      
      // Update translations
      if (translations && Array.isArray(translations)) {
        for (const t of translations) {
          const existing = await prisma.articleTranslation.findFirst({
            where: { articleId: article.id, languageCode: t.languageCode }
          });
          if (existing) {
            await prisma.articleTranslation.update({
              where: { id: existing.id },
              data: {
                title: t.title,
                content: t.content,
                excerpt: t.excerpt
              }
            });
          } else {
            await prisma.articleTranslation.create({
              data: {
                articleId: article.id,
                languageCode: t.languageCode,
                title: t.title,
                content: t.content,
                excerpt: t.excerpt
              }
            });
          }
        }
      }

      res.json({ success: true, article });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to update article" });
    }
  });

`;

code = code.replace('  app.delete("/api/admin/articles/:id",', putRoute + '  app.delete("/api/admin/articles/:id",');
fs.writeFileSync('server.app.ts', code);
console.log("Patched server.app.ts");
