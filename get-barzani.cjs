const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const article = await prisma.article.findUnique({ where: { slug: 'history-mustafa-barzani' } });
  console.log(article.imageUrl);
}
run();
