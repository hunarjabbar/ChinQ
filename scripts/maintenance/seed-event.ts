import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const event = await prisma.liveEvent.create({
    data: {
      slug: 'test-event-1',
      titleEn: 'Test Event 1',
      titleAr: 'الحدث التجريبي الأول',
      titleZh: '测试事件1',
      isActive: true,
    }
  });
  console.log('Created event:', event);
}
main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
