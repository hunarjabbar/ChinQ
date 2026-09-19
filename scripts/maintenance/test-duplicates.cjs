const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const articles = await prisma.article.findMany({ select: { slug: true, id: true } });
  const counts = {};
  articles.forEach(a => counts[a.slug] = (counts[a.slug] || 0) + 1);
  const duplicates = Object.keys(counts).filter(k => counts[k] > 1);
  console.log("Duplicates:", duplicates);
}
run();
