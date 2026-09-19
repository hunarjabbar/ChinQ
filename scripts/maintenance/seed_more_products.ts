import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.chineseProduct.create({
    data: {
      titleEn: "Hybrid Solar Inverter 5kW",
      titleAr: "عاكس طاقة شمسية هجين 5 كيلو واط",
      titleZh: "5kW 混合太阳能逆变器",
      titleCkb: "ئینڤێرتەری وزەی خۆری تێکەڵ 5kW",
      descriptionEn: "High-efficiency solar inverter tailored for regions with frequent power fluctuations.",
      descriptionAr: "عاكس طاقة شمسية عالي الكفاءة مصمم للمناطق ذات تقلبات الطاقة المتكررة.",
      descriptionZh: "专为电力波动频繁地区设计的高效太阳能逆变器。",
      descriptionCkb: "ئینڤێرتەری وزەی خۆری بەتوانا کە تایبەت کراوە بۆ ئەو ناوچانەی کارەبایان ناجێگیرە.",
      imageUrl: "https://images.unsplash.com/photo-1620804473855-3e288e53096b?auto=format&fit=crop&q=80&w=800",
      link: "https://example.com/inverter",
      category: "Energy",
      order: 3,
      isFeatured: true
    }
  });

  await prisma.chineseProduct.create({
    data: {
      titleEn: "Next-Gen 5G Smartphone",
      titleAr: "هاتف ذكي للجيل الخامس",
      titleZh: "新一代 5G 智能手机",
      titleCkb: "مۆبایلی زیرەکی نەوەی نوێی 5G",
      descriptionEn: "Affordable flagship performance with extended battery life for daily intensive use.",
      descriptionAr: "أداء رائد بأسعار معقولة مع عمر بطارية طويل للاستخدام المكثف اليومي.",
      descriptionZh: "具有超长电池寿命和高性价比的旗舰性能，适合日常重度使用。",
      descriptionCkb: "مۆبایلێکی خێرا بە نرخێکی گونجاو و پاترییەکی بەهێز بۆ بەکارهێنانی ڕۆژانە.",
      imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351cb31b?auto=format&fit=crop&q=80&w=800",
      link: "https://example.com/smartphone",
      category: "Electronics",
      order: 4,
      isFeatured: true
    }
  });

  await prisma.chineseProduct.create({
    data: {
      titleEn: "Smart Split Air Conditioner",
      titleAr: "مكيف هواء جداري ذكي",
      titleZh: "智能分体式空调",
      titleCkb: "سپلێتی زیرەکی هەڵواسراو",
      descriptionEn: "Energy-saving cooling system optimized for extreme summer temperatures.",
      descriptionAr: "نظام تبريد موفر للطاقة محسن لدرجات حرارة الصيف القصوى.",
      descriptionZh: "专为夏季极端高温优化的节能冷却系统。",
      descriptionCkb: "سیستەمی ساردکەرەوەی پاشەکەوتکەری وزە بۆ کەشوهەوای گەرمی هاوین.",
      imageUrl: "https://images.unsplash.com/photo-1616781296683-1768407cd294?auto=format&fit=crop&q=80&w=800",
      link: "https://example.com/ac",
      category: "Home Appliances",
      order: 5,
      isFeatured: true
    }
  });

  await prisma.chineseProduct.create({
    data: {
      titleEn: "HD Wireless Security System",
      titleAr: "نظام كاميرات مراقبة لاسلكي",
      titleZh: "高清无线安防系统",
      titleCkb: "سیستەمی کامێرای چاودێری بێ وایەر",
      descriptionEn: "4K outdoor surveillance cameras with night vision and remote cloud backup.",
      descriptionAr: "كاميرات مراقبة خارجية بدقة 4K مع رؤية ليلية ونسخ احتياطي سحابي عن بعد.",
      descriptionZh: "具有夜视和远程云备份功能的 4K 户外监控摄像机。",
      descriptionCkb: "کامێرای چاودێری دەرەوەی 4K بە بینینی شەوانە و پاشەکەوتکردنی هەوری.",
      imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
      link: "https://example.com/security",
      category: "Security",
      order: 6,
      isFeatured: true
    }
  });

  await prisma.chineseProduct.create({
    data: {
      titleEn: "E-Max Urban Scooter",
      titleAr: "سكوتر كهربائي للمدينة",
      titleZh: "城市电动滑板车",
      titleCkb: "سکۆتەری کارەبایی شار",
      descriptionEn: "Foldable electric scooter designed for quick urban commutes and traffic avoidance.",
      descriptionAr: "سكوتر كهربائي قابل للطي مصمم للتنقل السريع في المدينة وتجنب الازدحام المروري.",
      descriptionZh: "专为城市快速通勤和避开交通拥堵而设计的可折叠电动滑板车。",
      descriptionCkb: "سکۆتەرێکی کارەبایی چەماوە بۆ هاتوچۆی خێرای ناو شار و خۆلادان لە قەرەباڵغی.",
      imageUrl: "https://images.unsplash.com/photo-1558235282-3e2b9cb0eec8?auto=format&fit=crop&q=80&w=800",
      link: "https://example.com/scooter",
      category: "Auto",
      order: 7,
      isFeatured: true
    }
  });

  console.log("Seeded 5 trending products.");
}
main().catch(console.error).finally(() => prisma.$disconnect());
