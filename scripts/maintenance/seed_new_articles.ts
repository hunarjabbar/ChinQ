import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const author = await prisma.user.findFirst({ where: { role: 'AUTHOR' } });
  if (!author) return;

  const ai = await prisma.category.findUnique({ where: { slug: 'ai' } });
  const food = await prisma.category.findUnique({ where: { slug: 'food-beverage' } });
  const expo = await prisma.category.findUnique({ where: { slug: 'expo' } });
  const stats = await prisma.category.findUnique({ where: { slug: 'business-statistics' } });

  if (ai) {
    await prisma.article.create({
      data: {
        slug: 'ai-adoption-iraq-2026',
        authorId: author.id,
        categoryId: ai.id,
        status: 'PUBLISHED',
        imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop',
        translations: {
          create: [
            { lang: 'en', title: 'AI Adoption Surges in Iraqi Financial Sector', excerpt: 'Banks implement new AI-driven compliance tools.', content: 'Local banks are increasingly turning to artificial intelligence...' },
            { lang: 'ar', title: 'ارتفاع اعتماد الذكاء الاصطناعي في القطاع المالي العراقي', excerpt: 'البنوك تنفذ أدوات امتثال جديدة تعتمد على الذكاء الاصطناعي.', content: 'تتجه البنوك المحلية بشكل متزايد إلى الذكاء الاصطناعي...' },
            { lang: 'zh', title: '伊拉克金融业人工智能采用激增', excerpt: '银行实施新的人工智能合规工具。', content: '本地银行越来越多地转向人工智能...' },
            { lang: 'ckb', title: 'بەکارهێنانی زیرەکی دەستکرد لە کەرتی دارایی عێراقدا بەرزدەبێتەوە', excerpt: 'بانکەکان ئامرازی نوێی پابەندبوون بەپێی زیرەکی دەستکرد جێبەجێ دەکەن.', content: 'بانکە ناوخۆییەکان زیاتر و زیاتر ڕوو لە زیرەکی دەستکرد دەکەن...' },
          ]
        }
      }
    });
  }

  if (food) {
    await prisma.article.create({
      data: {
        slug: 'new-food-brands-enter-market',
        authorId: author.id,
        categoryId: food.id,
        status: 'PUBLISHED',
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop',
        translations: {
          create: [
            { lang: 'en', title: 'Asian Food & Beverage Brands Enter Middle East', excerpt: 'A new wave of culinary investments.', content: 'Major Asian food conglomerates are setting up manufacturing...' },
            { lang: 'ar', title: 'العلامات التجارية الآسيوية للأغذية والمشروبات تدخل الشرق الأوسط', excerpt: 'موجة جديدة من استثمارات الطهي.', content: 'تقوم كبرى شركات الأغذية الآسيوية بإنشاء مصانع...' },
            { lang: 'zh', title: '亚洲餐饮品牌进入中东', excerpt: '新一波烹饪投资。', content: '亚洲大型食品企业集团正在建立制造中心...' },
            { lang: 'ckb', title: 'براندە ئاسیاییەکانی خۆراک و خواردنەوە دەچنە ناو ڕۆژهەڵاتی ناوەڕاست', excerpt: 'شەپۆلێکی نوێی وەبەرهێنانی چێشتلێنان.', content: 'کۆمپانیا گەورەکانی خۆراکی ئاسیایی خەریکی دروستکردنی کارگەن...' },
          ]
        }
      }
    });
  }

  if (expo) {
    await prisma.article.create({
      data: {
        slug: 'baghdad-international-expo-2026',
        authorId: author.id,
        categoryId: expo.id,
        status: 'PUBLISHED',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
        translations: {
          create: [
            { lang: 'en', title: 'Baghdad International Expo 2026 Breaks Records', excerpt: 'Over 500 tech companies showcase innovations.', content: 'The annual trade fair saw unprecedented attendance...' },
            { lang: 'ar', title: 'معرض بغداد الدولي 2026 يحطم الأرقام القياسية', excerpt: 'أكثر من 500 شركة تقنية تعرض ابتكاراتها.', content: 'شهد المعرض التجاري السنوي حضوراً غير مسبوق...' },
            { lang: 'zh', title: '2026年巴格达国际博览会打破纪录', excerpt: '超过500家科技公司展示创新。', content: '一年一度的贸易博览会出席人数空前...' },
            { lang: 'ckb', title: 'پێشانگای نێودەوڵەتی بەغدا ٢٠٢٦ ژمارە پێوانەییەکان دەشکێنێت', excerpt: 'زیاتر لە ٥٠٠ کۆمپانیای تەکنەلۆجیا داهێنانەکانیان نمایش دەکەن.', content: 'پێشانگا بازرگانییە ساڵانەکە ئامادەبوونێکی بێوێنەی بەخۆیەوە بینی...' },
          ]
        }
      }
    });
  }

  if (stats) {
    await prisma.article.create({
      data: {
        slug: 'q3-business-growth-statistics',
        authorId: author.id,
        categoryId: stats.id,
        status: 'PUBLISHED',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
        translations: {
          create: [
            { lang: 'en', title: 'Q3 Business Growth Statistics Released', excerpt: 'Tech sector outpaces traditional manufacturing.', content: 'The latest statistical digest reveals strong growth...' },
            { lang: 'ar', title: 'إصدار إحصاءات نمو الأعمال للربع الثالث', excerpt: 'قطاع التكنولوجيا يتفوق على التصنيع التقليدي.', content: 'تكشف أحدث ملخصات إحصائية عن نمو قوي...' },
            { lang: 'zh', title: '第三季度业务增长统计发布', excerpt: '科技领域的发展超过了传统制造业。', content: '最新的统计摘要显示出强劲的增长...' },
            { lang: 'ckb', title: 'ئامارەکانی گەشەی بازرگانی چارەکی سێیەم بڵاوکرانەوە', excerpt: 'کەرتی تەکنەلۆجیا پێش پیشەسازی نەریتی دەکەوێت.', content: 'نوێترین کورتەی ئاماری گەشەیەکی بەهێز ئاشکرا دەکات...' },
          ]
        }
      }
    });
  }

  console.log("Seeded additional articles");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
