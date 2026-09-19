import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.partner.findFirst({ where: { name: 'Asiacell' } });
  if (!existing) {
    await prisma.partner.create({
      data: {
        name: 'Asiacell',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Asiacell_logo.svg/1024px-Asiacell_logo.svg.png',
        websiteUrl: 'https://www.asiacell.com',
        descriptionEn: 'Asiacell is a leading provider of quality mobile telecommunications and data services in Iraq, connecting millions with reliable networks and driving digital transformation across the region.',
        descriptionAr: 'آسيا سيل هي المزود الرائد لخدمات الاتصالات المتنقلة والبيانات عالية الجودة في العراق، حيث تربط الملايين بشبكات موثوقة وتقود التحول الرقمي في جميع أنحاء المنطقة.',
        descriptionZh: 'Asiacell 是伊拉克领先的优质移动通信和数据服务提供商，通过可靠的网络连接数百万人，并推动整个地区的数字化转型。',
        descriptionCkb: 'ئاسیاسێڵ پێشەنگە لە دابینکردنی خزمەتگوزارییەکانی پەیوەندی مۆبایل و داتا لە عێراق، ملیۆنان کەس بە تۆڕە متمانەپێکراوەکان دەبەستێتەوە و پێشەنگی وەرچەرخانی دیجیتاڵییە لە ناوچەکەدا.',
        isActive: true,
        order: 1
      }
    });
    console.log('Asiacell seeded successfully!');
  } else {
    console.log('Asiacell already exists.');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
