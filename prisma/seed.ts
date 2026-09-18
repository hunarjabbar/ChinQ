import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import { ADDITIONAL_TOPICS } from '../src/data/topics.js';
import { seedOpinions } from '../server/opinionSeeder.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Clean up existing data in correct sequence to prevent constraint failures
  console.log('🧹 Cleaning existing data...');
  await prisma.liveUpdate.deleteMany();
  await prisma.liveEvent.deleteMany();
  await prisma.articleTranslation.deleteMany();
  await prisma.article.deleteMany();
  await prisma.marketData.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.study.deleteMany();
  await prisma.partnershipApplication.deleteMany();
  await prisma.telexDispatch.deleteMany();
  await prisma.book.deleteMany();
  await prisma.tourismSpot.deleteMany();
  await prisma.womenFeature.deleteMany();
  await prisma.visaFlight.deleteMany();
  await prisma.podcast.deleteMany();
  await prisma.systemAnnouncement.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.user.deleteMany();

  // 2. Seed Users
  console.log('👥 Creating users...');
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || crypto.randomBytes(16).toString('hex');
  const editorPassword = process.env.EDITOR_INITIAL_PASSWORD || crypto.randomBytes(16).toString('hex');
  const adminHash = await bcrypt.hash(adminPassword, 10);
  const editorHash = await bcrypt.hash(editorPassword, 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@iraqchinaagency.com',
      password: adminHash,
      name: 'System Admin',
      role: 'ADMIN',
    },
  });

  const adminMedia = await prisma.user.create({
    data: {
      email: 'admin@iraqchinaagency.media',
      password: adminHash,
      name: 'Test Admin',
      role: 'ADMIN',
    },
  });

  const editorMedia = await prisma.user.create({
    data: {
      email: 'editor@iraqchinaagency.media',
      password: editorHash,
      name: 'Test Editor',
      role: 'EDITOR',
    },
  });

  const author1 = await prisma.user.create({
    data: {
      email: 'j.aliraqi@iraqchinaagency.com',
      name: 'Jasim Al-Iraqi',
      role: 'AUTHOR',
    },
  });

  const author2 = await prisma.user.create({
    data: {
      email: 'w.chen@iraqchinaagency.com',
      name: 'Wei Chen',
      role: 'AUTHOR',
    },
  });

  // 3. Seed Categories (with required multilingual fields matching schema.prisma)
  console.log('📂 Creating categories...');
  const catEnergy = await prisma.category.create({
    data: {
      slug: 'energy',
      name: 'Energy',
      nameEn: 'Energy',
      nameAr: 'طاقة',
      nameZh: '能源',
    },
  });

  const catEconomy = await prisma.category.create({
    data: {
      slug: 'economy',
      name: 'Economy',
      nameEn: 'Economy',
      nameAr: 'اقتصاد',
      nameZh: '经济',
    },
  });

  const catPolitics = await prisma.category.create({
    data: {
      slug: 'politics',
      name: 'Politics',
      nameEn: 'Politics',
      nameAr: 'سياسة',
      nameZh: '政治',
    },
  });

  const catBeltRoad = await prisma.category.create({
    data: {
      slug: 'belt-road',
      name: 'Belt & Road',
      nameEn: 'Belt & Road',
      nameAr: 'مبادرة الحزام والطريق',
      nameZh: '一带一路',
    },
  });

  const catTechnology = await prisma.category.create({
    data: {
      slug: 'technology',
      name: 'Technology',
      nameEn: 'Technology',
      nameAr: 'تكنولوجيا',
      nameZh: '科技',
    },
  });

  const catOpinion = await prisma.category.create({
    data: {
      slug: 'opinion',
      name: 'Opinion',
      nameEn: 'Opinion',
      nameAr: 'آراء',
      nameZh: '观点',
    },
  });

  const catAi = await prisma.category.create({
    data: { slug: 'ai', name: 'AI', nameEn: 'AI', nameAr: 'الذكاء الاصطناعي', nameZh: '人工智能' }
  });
  const catFood = await prisma.category.create({
    data: { slug: 'food-beverage', name: 'Food & Beverage', nameEn: 'Food & Beverage', nameAr: 'الأغذية والمشروبات', nameZh: '餐饮' }
  });
  const catExpo = await prisma.category.create({
    data: { slug: 'expo', name: 'Expo', nameEn: 'Expo', nameAr: 'معرض', nameZh: '博览会' }
  });
  const catStats = await prisma.category.create({
    data: { slug: 'business-statistics', name: 'Business Statistics', nameEn: 'Business Statistics', nameAr: 'إحصاءات الأعمال', nameZh: '商业统计' }
  });

  const catCulture = await prisma.category.create({
    data: {
      slug: 'culture',
      name: 'Culture',
      nameEn: 'Culture',
      nameAr: 'ثقافة',
      nameZh: '文化',
    },
  });

  console.log('📂 Seeding 40 additional categories...');
  for (const topic of ADDITIONAL_TOPICS) {
    await prisma.category.create({
      data: {
        slug: topic.slug,
        name: topic.name,
        nameEn: topic.nameEn,
        nameAr: topic.nameAr,
        nameZh: topic.nameZh
      }
    });
  }

  // 4. Seed Tags
  console.log('🏷️ Creating tags...');
  const tagBRI = await prisma.tag.create({ data: { name: 'BRI' } });
  const tagOil = await prisma.tag.create({ data: { name: 'Oil & Gas' } });
  const tagDiplomacy = await prisma.tag.create({ data: { name: 'Diplomacy' } });
  const tagEducation = await prisma.tag.create({ data: { name: 'Education' } });

  // 5. Seed Articles with Trilingual Translations
  console.log('📰 Creating trilingual articles...');

  // Article 1: Energy Sector
  await prisma.article.create({
    data: {
      slug: 'sinopec-announces-investment-southern-iraq-oil',
      authorId: author2.id,
      categoryId: catEnergy.id,
      status: 'PUBLISHED',
      imageUrl: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=1200&auto=format&fit=crop',
      tags: { connect: [{ id: tagOil.id }, { id: tagBRI.id }] },
      translations: {
        create: [
          {
            lang: 'en',
            title: 'Sinopec Announces $2.5B Investment in Southern Iraqi Oil Fields',
            excerpt: 'The Chinese energy giant commits to modernizing extraction technologies.',
            content: "In a monumental shift for the region's energy sector, Sinopec has committed to modernizing extraction technologies in Basra, promising a 20% increase in daily barrel output by 2028 while introducing green-capture mechanisms to reduce gas flaring.",
          },
          {
            lang: 'ar',
            title: 'سينوبك تعلن عن استثمار بقيمة 2.5 مليار دولار في حقول النفط بجنوب العراق',
            excerpt: 'عملاق الطاقة الصيني يلتزم بتحديث تقنيات الاستخراج.',
            content: 'في تحول تاريخي لقطاع الطاقة في المنطقة، التزمت شركة سينوبك بتحديث تقنيات الاستخراج في البصرة، واعدة بزيادة قدرها 20٪ في إنتاج البراميل اليومي بحلول عام 2028 مع إدخال آليات التقاط صديقة للبيئة للحد من حرق الغاز.',
          },
          {
            lang: 'zh',
            title: '中石化宣布在伊拉克南部油田投资25亿美元',
            excerpt: '中国能源巨头承诺对提取技术进行现代化改造。',
            content: '这是该地区能源部门的一个重大转变，中石化承诺对巴士拉的提取技术进行现代化改造，承诺到2028年将日产量提高20%，同时引入绿色捕获机制以减少天然气燃烧。',
          },
          {
            lang: 'ckb',
            title: 'سینۆپێک وەبەرهێنانی ٢.٥ ملیار دۆلاری لە کێڵگە نەوتییەکانی باشووری عێراق ڕادەگەیەنێت',
            excerpt: 'کۆمپانیای زەبەلاحی وزەی چین بەڵێن دەدات تەکنەلۆجیاکانی دەرهێنان نوێ بکاتەوە.',
            content: 'لە گۆڕانکارییەکی گەورەدا بۆ کەرتی وزەی ناوچەکە، سینۆپێک بەڵێنی داوە کە تەکنەلۆجیاکانی دەرهێنان لە بەسرە نوێ بکاتەوە، بەڵێنی زیادکردنی ٢٠٪ی بەرهەمی ڕۆژانەی بەرمیل تا ساڵی ٢٠٢٨ دەدات لە کاتێکدا میکانیزمی گرتنی سەوز دەناسێنێت بۆ کەمکردنەوەی سووتانی گاز.',
          }
        ]
      }
    }
  });

  // Article 2: Economy & Infrastructure
  await prisma.article.create({
    data: {
      slug: 'al-faw-grand-port-hits-65-completion',
      authorId: author1.id,
      categoryId: catEconomy.id,
      status: 'PUBLISHED',
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
      tags: { connect: [{ id: tagBRI.id }, { id: tagDiplomacy.id }] },
      translations: {
        create: [
          {
            lang: 'en',
            title: 'Al Faw Grand Port Hits 65% Completion Under Belt and Road Initiative',
            excerpt: 'Strategic port project advances ahead of schedule.',
            content: 'The Al Faw Grand Port project, a critical node in the Belt and Road Initiative, has reached 65% completion. Chinese engineering firms working alongside Iraqi contractors report that the main breakwater and primary container terminal will be operational by next year.',
          },
          {
            lang: 'ar',
            title: 'ميناء الفاو الكبير يحقق نسبة إنجاز 65٪ ضمن مبادرة الحزام والطريق',
            excerpt: 'مشروع الميناء الاستراتيجي يتقدم قبل الموعد المحدد.',
            content: 'وصل مشروع ميناء الفاو الكبير، وهو عقدة حاسمة في مبادرة الحزام والطريق، إلى نسبة إنجاز 65٪. وتفيد شركات الهندسة الصينية العاملة إلى جانب المقاولين العراقيين أن كاسر الأمواج الرئيسي ومحطة الحاويات الأولية سيبدأ تشغيلهما بحلول العام المقبل.',
          },
          {
            lang: 'zh',
            title: '“一带一路”倡议下，法奥大港项目完成率达到65%',
            excerpt: '战略港口项目提前推进。',
            content: '作为“一带一路”倡议中的关键节点，法奥大港项目已达到65%的完成率。与伊拉克承包商合作 of 中国工程公司报告称，主防波堤和主要集装箱码头将于明年投入运营。',
          },
          {
            lang: 'ckb',
            title: 'بەندەری گەورەی فاو گەیشتە ٦٥٪ی تەواوبوونی لەژێر دەستپێشخەری کەمەر و ڕێگادا',
            excerpt: 'پڕۆژەی بەندەری ستراتیژی پێش کاتی دیاریکراو پێش دەکەوێت.',
            content: 'پڕۆژەی بەندەری گەورەی فاو، کە گرێیەکی گرنگە لە دەستپێشخەری کەمەر و ڕێگا، گەیشتە ٦٥٪ی تەواوبوونی. کۆمپانیا ئەندازیارییە چینییەکان کە شانبەشانی بەڵێندەرانی عێراقی کاردەکەن ڕادەگەیەنن کە بەربەستی سەرەکی شەپۆلەکان و وێستگەی سەرەکی کۆنتێنەرەکان تا ساڵی داهاتوو دەکەونە کار.',
          }
        ]
      }
    }
  });

  // Article 3: Culture & Education
  await prisma.article.create({
    data: {
      slug: 'mandarin-institute-opens-sulaymaniyah',
      authorId: author2.id,
      categoryId: catCulture.id,
      status: 'PUBLISHED',
      imageUrl: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=1200&auto=format&fit=crop',
      tags: { connect: [{ id: tagEducation.id }, { id: tagDiplomacy.id }] },
      translations: {
        create: [
          {
            lang: 'en',
            title: 'New Mandarin Language Institute Opens in Sulaymaniyah',
            excerpt: 'Cultural exchange deepens with new educational initiatives in the Kurdistan Region.',
            content: 'In a significant boost to cultural ties, a new Mandarin Language Institute has officially opened its doors in Sulaymaniyah. The center aims to bridge the language gap for local business leaders and students looking to engage with Chinese markets and universities.',
          },
          {
            lang: 'ar',
            title: 'افتتاح معهد جديد للغة الماندرين في السليمانية',
            excerpt: 'التبادل الثقافي يتعمق مع مبادرات تعليمية جديدة في إقليم كردستان.',
            content: 'في دفعة قوية للعلاقات الثقافية، فتح معهد جديد للغة الماندرين أبوابه رسمياً في السليمانية. يهدف المركز إلى سد الفجوة اللغوية لقادة الأعمال والطلاب المحليين الذين يتطلعون إلى الانخراط مع الأسواق والجامعات الصينية.',
          },
          {
            lang: 'zh',
            title: '苏莱曼尼亚开设新普通话学院',
            excerpt: '库尔德斯坦地区的新教育举措深化了文化交流。',
            content: '为了大力推动文化联系，一家新的普通话学院已在苏莱曼尼亚正式开放。该中心旨在为希望与中国市场和大学接触的当地商界领袖和学生搭建语言桥梁。',
          },
          {
            lang: 'ckb',
            title: 'پەیمانگایەکی نوێی زمانی ماندارینی لە سلێمانی کرایەوە',
            excerpt: 'ئاڵوگۆڕی کولتووری لەگەڵ دەستپێشخەرییە نوێیەکانی پەروەردەیی لە هەرێمی کوردستان قووڵتر دەبێتەوە.',
            content: 'لە هەنگاوێکی گرنگدا بۆ بەهێزکردنی پەیوەندییە کولتوورییەکان، پەیمانگایەکی نوێی زمانی ماندارینی بە فەرمی دەرگاکانی لە سلێمانی کردەوە. ئامانجی ناوەندەکە پردکردنی بۆشایی زمانییە بۆ سەرکردە بازرگانییە خۆجێییەکان و ئەو خوێندکارانەی کە دەیانەوێت لەگەڵ بازاڕ و زانکۆ چینییەکاندا پەیوەندی ببەستن.',
          }
        ]
      }
    }
  });

  // 6. Seed Market Data
  console.log('📈 Creating market data...');
  await prisma.marketData.createMany({
    data: [
      { symbol: 'BRENT', name: 'Brent Crude', price: 82.45, change: 1.2, changePercent: 1.48 },
      { symbol: 'CNY_IQD', name: 'CNY/IQD', price: 181.12, change: -0.05, changePercent: -0.69 },
      { symbol: 'USD_IQD', name: 'USD/IQD', price: 1310.0, change: 0.0, changePercent: 0.0 },
      { symbol: 'SSE_COMPOSITE', name: 'Shanghai Composite', price: 3020.14, change: 0.8, changePercent: 0.27 },
    ],
  });

  // 7. Seed Live Event
  console.log('🔴 Creating live event...');
  const liveEvent = await prisma.liveEvent.create({
    data: {
      slug: 'iraq-china-summit-2026',
      isActive: true,
      titleEn: 'Live: Iraq-China Economic Summit 2026',
      titleAr: 'مباشر: القمة الاقتصادية العراقية الصينية 2026',
      titleZh: '直播：2026年伊拉克-中国经济峰会',
      titleCkb: 'ڕاستەوخۆ: لووتکەی ئابووری عێراق-چین ٢٠٢٦',
      summaryEn: 'Real-time updates from the strategic partnership summit in Beijing.',
      summaryAr: 'تحديثات في الوقت الفعلي من قمة الشراكة الاستراتيجية في بكين.',
      summaryZh: '北京战略合作伙伴关系峰会实时更新。',
      summaryCkb: 'نوێکردنەوەکانی کاتی ڕاستەقینە لە لووتکەی هاوبەشی ستراتیژی لە بێجینگ.',
      updates: {
        create: [
          {
            contentEn: 'The summit has officially commenced with opening remarks from both delegations.',
            contentAr: 'بدأت القمة رسمياً بكلمات افتتاحية من كلا الوفدين.',
            contentZh: '峰会正式开始，双方代表团致开幕词。',
            contentCkb: 'لووتکەکە بە فەرمی دەستی پێکرد بە وتەی کردنەوەی هەردوو شاندەکە.',
            isImportant: true
          },
          {
            contentEn: 'Discussions on energy infrastructure investments are currently underway.',
            contentAr: 'تجري حالياً مناقشات حول استثمارات البنية التحتية للطاقة.',
            contentZh: '目前正在讨论能源基础设施投资。',
            contentCkb: 'گفتوگۆکان لەسەر وەبەرهێنانی ژێرخانی وزە لە ئێستادا بەردەوامن.',
            isImportant: false
          }
        ]
      }
    }
  });

  // Seed opinions
  await seedOpinions();

  // Seed Chinese Products
  console.log('🛍️ Seeding Chinese products...');
  await prisma.chineseProduct.deleteMany();
  const sampleChineseProducts = [
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
  for (const item of sampleChineseProducts) {
    await prisma.chineseProduct.create({ data: item });
  }


  // 8. Seed Admin Credentials (Development Only)
  if (process.env.NODE_ENV !== 'production') {
    console.log('🔒 Seeding admin credentials for development...');
    
    const credentialsToEnsure = [
      {
        email: "editor@iraqi-chineseagency.com",
        name: "ICA Chief Editor",
        role: "EDITOR",
      },
      {
        email: "admin@iraqi-chineseagency.com",
        name: "ICA Sovereign Admin",
        role: "ADMIN",
      }
    ];

    for (const cred of credentialsToEnsure) {
      const exists = await prisma.user.findUnique({
        where: { email: cred.email },
      });
      if (!exists) {
        const generatedPassword = crypto.randomBytes(8).toString('hex');
        const hash = await bcrypt.hash(generatedPassword, 10);
        await prisma.user.create({
          data: {
            email: cred.email,
            password: hash,
            name: cred.name,
            role: cred.role,
          },
        });
        console.log(`✅ Created test credential: ${cred.email} (${cred.role})`);
        console.log(`   Password: ${generatedPassword}`);
        console.log(`   !!! Please save this password securely !!!`);
      }
    }
  }

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
