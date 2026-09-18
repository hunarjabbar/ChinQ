import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const trendingProducts = [
  {
    titleEn: 'BYD Song Plus EV & PHEV Crossover',
    titleAr: 'بي واي دي سونغ بلس الكهربائية والهجينة',
    titleZh: '比亚迪宋PLUS新能源智能SUV',
    titleCkb: 'بی وای دی سۆنگ پلەس کارەبایی و هایبرید',
    descriptionEn: 'The leading smart electric crossover in Iraq\'s expanding clean energy automotive market, featuring ultra-safe Blade Battery technology and 605km extended range.',
    descriptionAr: 'الكروس أوفر الكهربائي الذكي الأكثر طلباً في سوق السيارات العراقي، مدعوم بتقنية بطارية Blade الفائقة الأمان ومدى قيادة يصل إلى 605 كم.',
    descriptionZh: '伊拉克新能源汽车市场畅销榜首的智能紧凑型SUV，搭载高安全刀片电池与DiPilot智能驾驶辅助，综合工况续航达605公里。',
    descriptionCkb: 'پڕفرۆشترین ئۆتۆمبێلی کارەبایی زیرەک لە بازاڕی عێراق، بە پاتری Blade ی پێشکەوتوو و توانای بڕینی 605 کم بە یەک بارگاویکردن.',
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80',
    category: 'AUTOMOTIVE',
    link: '/en/contact?inquiry=byd-song-plus',
    isFeatured: true,
    order: 1
  },
  {
    titleEn: 'LONGi Hi-MO X6 High-Efficiency Solar PV Modules',
    titleAr: 'ألواح لونجي هاي-إم أو الشمسية الكهروضوئية فائقة الكفاءة',
    titleZh: '隆基绿能 Hi-MO X6 高效耐高温光伏组件',
    titleCkb: 'تەختەی وزەی خۆری لۆنجی بە کوالێتی بەرز',
    descriptionEn: 'High-efficiency HPBC cell technology engineered for extreme high-temperature desert climates in southern and central Iraq, boasting 23.3% peak module efficiency.',
    descriptionAr: 'ألواح كهروضوئية عالية الكفاءة مصممة خصيصاً لمقاومة درجات الحرارة المرتفعة والمناخ الصحراوي في العراق، بكفاءة تشغيلية رائدة تصل إلى 23.3%.',
    descriptionZh: '专为中东及伊拉克高温沙漠严苛环境研发的高效HPBC光伏组件，转换效率达23.3%，保障严寒酷暑下的全天候发电稳定性。',
    descriptionCkb: 'تەختەی وزەی خۆری بەرزترین کوالێتی کە تایبەت دروستکراوە بۆ کەشوهەوای گەرم و بیابانی عێراق بە توانای کارکردنی 23.3%.',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    category: 'SOLAR_ENERGY',
    link: '/en/contact?inquiry=longi-solar-iraq',
    isFeatured: true,
    order: 2
  },
  {
    titleEn: 'XCMG XE215D Heavy Hydraulic Excavator',
    titleAr: 'حفار هيدروليكي ثقيل من إكس سي إم جي (XCMG)',
    titleZh: '徐工集团 XE215D 旗舰级智能液压挖掘机',
    titleCkb: 'حەفارەی هایدرۆلیکی قورسی XCMG',
    descriptionEn: 'Premium heavy excavation machinery deployed across Iraq\'s national infrastructure reconstruction, highway corridors, and Belt and Road projects.',
    descriptionAr: 'حفارات هيدروليكية ذكية متينة تعتمد عليها كبرى مشاريع إعادة إعمار البنية التحتية والموانئ والطرق السريعة في مختلف المحافظات العراقية.',
    descriptionZh: '广泛应用于伊拉克全国基础设施重建、公路网络以及“一带一路”重点工业标杆工地的旗舰级中重型智能液压挖掘机。',
    descriptionCkb: 'حەفارەی هایدرۆلیکی پێشکەوتوو کە لە پڕۆژەکانی ئاوەدانکردنەوەی ژێرخان و پڕۆژەکانی ڕێگای ئاوریشم لە عێراق بەکاردەهێنرێت.',
    imageUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    category: 'HEAVY_MACHINERY',
    link: '/en/contact?inquiry=xcmg-heavy-machinery',
    isFeatured: true,
    order: 3
  },
  {
    titleEn: 'Gree Tropical T3 Inverter Air Conditioners',
    titleAr: 'مكيفات غري الاستوائية الموفرة للطاقة بضاغط T3',
    titleZh: '格力 T3 超重载热带变频节能空调',
    titleCkb: 'سپلێتی گری گەرمایی بەهێز بۆ هاوینی عێراق',
    descriptionEn: 'Heavy-duty T3 compressor air conditioning units engineered to sustain continuous powerful cooling in Iraqi summer temperatures exceeding 55°C with minimal energy draw.',
    descriptionAr: 'أنظمة تكييف استوائية متطورة بضاغط T3 فائق التحمل، مصممة لتحقيق تبريد فائق مستمر حتى في ذروة صيف العراق عند درجات حرارة تتجاوز 55 مئوية.',
    descriptionZh: '配备超强T3热带压缩机的全直流变频冷暖空调，专为55℃极端酷热中东盛夏工况量身打造，高效节能制冷。',
    descriptionCkb: 'سپلێت و سیستەمی فێنککەرەوەی پێشکەوتوو بە کۆمپرێسەری بەهێزی T3 کە لە پلەی گەرمای زیاتر لە 55 پلە بە کەمترین کارەبا کار دەکات.',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    category: 'HOME_APPLIANCES',
    link: '/en/contact?inquiry=gree-tropical-ac',
    isFeatured: true,
    order: 4
  },
  {
    titleEn: 'Xiaomi 14 Ultra & Smart AIoT Ecosystem',
    titleAr: 'شاومي 14 ألترا مع منظومة إنترنت الأشياء والذكاء الاصطناعي',
    titleZh: '小米14 Ultra 徕卡全焦段旗舰与澎湃智联生态',
    titleCkb: 'شاۆمی 14 ئۆڵترا و سیستەمی ماڵی زیرەک',
    descriptionEn: 'Flagship Leica quad-camera mobile imaging technology and smart home ecosystem trending rapidly among tech-savvy Iraqi professionals and youth across Baghdad and Erbil.',
    descriptionAr: 'الهاتف الرائد المزود بعدسات Leica الاحترافية ومنظومة المنزل الذكي المتكاملة الأكثر رواجاً ومبيعاً في أسواق الإلكترونيات في بغداد وأربيل.',
    descriptionZh: '搭载徕卡光学全焦段四摄系统的小米影像旗舰手机及澎湃OS智能物联网生态，在中东及伊拉克各大都市科技消费者群体中持续引领热潮。',
    descriptionCkb: 'مۆبایلی زیرەکی پێشکەوتوو بە کامێرای پیشەگەری لایکا و سیستەمی ماڵی زیرەک، یەکێک لە پڕفرۆشترینەکان لە بازاڕەکانی بەغدا و هەولێر.',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    category: 'CONSUMER_ELECTRONICS',
    link: '/en/contact?inquiry=xiaomi-iraq',
    isFeatured: true,
    order: 5
  },
  {
    titleEn: 'Changan UNI-K AWD Intelligent Luxury SUV',
    titleAr: 'شانجان يوني-كي الذكية رباعية الدفع الفاخرة',
    titleZh: '长安 UNI-K 智电全轮驱动未来感豪华旗舰SUV',
    titleCkb: 'ئۆتۆمبێلی شانگان یونی کەی چوار دەفەر',
    descriptionEn: 'Futuristic design language paired with luxury cabin appointments and intelligent all-wheel-drive, dominating modern urban transport in Iraqi metropolitan hubs.',
    descriptionAr: 'سيارة كروس أوفر مستقبلية بتصميم جريء ومقصورة مجهزة بأحدث تقنيات الرفاهية والأمان، تحظى بشعبية متزايدة في شوارع المدن العراقية.',
    descriptionZh: '融合未来科幻机甲设计语言与奢华舒适座舱的智能旗舰SUV，在伊拉克各大主要都市道路与家庭市场深受欢迎。',
    descriptionCkb: 'ئۆتۆمبێلی مۆدێرنی خێزانی بە دیزاینێکی داهێنەرانە و پڕ لە تایبەتمەندی ئاسوودەیی کە خواستی زۆری لەسەرە لە شارەکانی عێراق.',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    category: 'AUTOMOTIVE',
    link: '/en/contact?inquiry=changan-iraq',
    isFeatured: true,
    order: 6
  }
];

async function seed() {
  console.log('🌱 Seeding Chinese Products...');
  await prisma.chineseProduct.deleteMany();
  for (const item of trendingProducts) {
    await prisma.chineseProduct.create({
      data: item
    });
  }
  console.log(`✅ Successfully seeded ${trendingProducts.length} Chinese Products!`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
