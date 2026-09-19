import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.chineseProduct.createMany({
    data: [
      {
        titleEn: "Geely Atlas Pro",
        titleAr: "جيلي أطلس برو",
        titleZh: "吉利博越 Pro",
        titleCkb: "جیلی ئەتڵەس پرۆ",
        descriptionEn: "A smart hybrid SUV offering premium comfort and advanced tech, perfect for Iraq's modern families.",
        descriptionAr: "سيارة دفع رباعي هجينة ذكية توفر راحة فائقة وتكنولوجيا متقدمة، مثالية للعائلات العراقية.",
        descriptionZh: "一款智能混合动力SUV，提供卓越舒适感和先进技术，非常适合伊拉克现代家庭。",
        descriptionCkb: "ئۆتۆمبێلێکی زیرەکی هایبریدە کە ئاسوودەیی نایاب و تەکنەلۆژیای پێشکەوتوو پێشکەش دەکات، نموونەییە بۆ خێزانە مۆدێرنەکانی عێراق.",
        imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
        link: "https://global.geely.com",
        category: "EVS",
        isFeatured: true,
        order: 1
      },
      {
        titleEn: "Xiaomi Smart Home Ecosystem",
        titleAr: "نظام شاومي المنزلي الذكي",
        titleZh: "小米智能家居生态",
        titleCkb: "سیستەمی ماڵی زیرەکی شاومی",
        descriptionEn: "Interconnected smart appliances bringing energy efficiency and automation to Iraqi households.",
        descriptionAr: "أجهزة منزلية ذكية مترابطة توفر كفاءة في استهلاك الطاقة وأتمتة للمنازل العراقية.",
        descriptionZh: "互联智能家电为伊拉克家庭带来能源效率和自动化。",
        descriptionCkb: "ئامێرە زیرەکە بەیەکەوە بەستراوەکان کە کارایی وزە و ئۆتۆماتیکی دەهێننە ماڵەکانی عێراق.",
        imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80",
        link: "https://mi.com",
        category: "ELECTRONICS",
        isFeatured: true,
        order: 2
      },
      {
        titleEn: "Sany Heavy Machinery",
        titleAr: "ساني للمعدات الثقيلة",
        titleZh: "三一重机",
        titleCkb: "ئامێرە قورسەکانی سانی",
        descriptionEn: "Durable construction equipment supporting Iraq's nationwide rebuilding and infrastructure projects.",
        descriptionAr: "معدات بناء متينة تدعم مشاريع إعادة الإعمار والبنية التحتية في جميع أنحاء عێراق.",
        descriptionZh: "耐用的建筑设备，支持伊拉克全国范围的重建和基础设施项目。",
        descriptionCkb: "ئامێری بیناسازی بەهێز کە پشتگیری لە پڕۆژەکانی دووبارە بونیادنانەوە و ژێرخانی سەرانسەری عێراق دەکات.",
        imageUrl: "https://images.unsplash.com/photo-1582239618196-857e2fb2d354?auto=format&fit=crop&q=80",
        link: "https://sanyglobal.com",
        category: "MACHINERY",
        isFeatured: true,
        order: 3
      }
    ]
  });
  console.log("Seeded Chinese products");
}
main().catch(console.error).finally(() => prisma.$disconnect());
