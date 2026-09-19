const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const articles = await prisma.article.findMany({
    where: { category: { slug: 'historical-figures' } },
    select: { slug: true }
  });
  console.log(articles.map(a => a.slug));
}
run();
