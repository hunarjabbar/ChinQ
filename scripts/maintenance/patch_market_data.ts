import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.marketData.updateMany({
    where: { symbol: 'CNY_USD' },
    data: { symbol: 'CNY_IQD', name: 'CNY/IQD', price: 181.12 }
  });
  await prisma.marketData.updateMany({
    where: { symbol: 'IQD_USD' },
    data: { symbol: 'USD_IQD', name: 'USD/IQD', price: 1310.0 }
  });
}
main().then(() => prisma.$disconnect());
