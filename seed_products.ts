import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.chineseProduct.deleteMany({}); // clear existing
  await prisma.chineseProduct.create({
    data: {
      titleEn: "EV Auto Series",
      titleAr: "سلسلة سيارات EV",
      titleZh: "电动汽车系列",
      titleCkb: "زنجیرەی ئۆتۆمبێلی EV",
      descriptionEn: "Next generation electric vehicles.",
      descriptionAr: "الجيل القادم من السيارات الكهربائية.",
      descriptionZh: "下一代电动汽车。",
      descriptionCkb: "نەوەی داهاتووی ئۆتۆمبێلی کارەبایی.",
      imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
      link: "https://example.com/ev",
      category: "Auto",
      order: 1
    }
  });

  await prisma.chineseProduct.create({
    data: {
      titleEn: "Solar Panels Pro",
      titleAr: "ألواح شمسية برو",
      titleZh: "太阳能板 Pro",
      titleCkb: "پەنێڵی خۆری پڕۆ",
      descriptionEn: "High efficiency commercial solar panels.",
      descriptionAr: "ألواح شمسية تجارية عالية الكفاءة.",
      descriptionZh: "高效商用太阳能板。",
      descriptionCkb: "پەنێڵی خۆری بازرگانی بە توانای بەرز.",
      imageUrl: "https://images.unsplash.com/photo-1509391366360-1e97f52ce23b?auto=format&fit=crop&q=80&w=800",
      link: "https://example.com/solar",
      category: "Energy",
      order: 2
    }
  });

  console.log("Seeded");
}
main().catch(console.error).finally(() => prisma.$disconnect());
