import { prisma } from './db.js';
import { ADDITIONAL_TOPICS } from '../src/data/topics.js';

export async function autoSeedMoreNews() {
  try {
    console.log('🔄 Checking database for additional news logs...');

    // Ensure all 40 additional categories exist in database
    for (const topic of ADDITIONAL_TOPICS) {
      const existing = await prisma.category.findUnique({
        where: { slug: topic.slug }
      });
      if (!existing) {
        console.log(`📁 Seeding additional category in db: ${topic.slug}`);
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
    }
    
    // Retrieve required models for connection
    const author = await prisma.user.findFirst({
      where: { role: 'AUTHOR' }
    });
    if (!author) {
      console.log('⚠️ No author found in database. Skipping additional news seeding.');
      return;
    }

    // Ensure all 11 core categories exist in the database
    const coreCategories = [
      { slug: 'politics', name: 'Politics', nameEn: 'Politics', nameAr: 'سياسة', nameZh: '政治' },
      { slug: 'economy', name: 'Economy', nameEn: 'Economy', nameAr: 'اقتصاد', nameZh: '经济' },
      { slug: 'energy', name: 'Energy', nameEn: 'Energy', nameAr: 'طاقة', nameZh: '能源' },
      { slug: 'belt-road', name: 'Belt & Road', nameEn: 'Belt & Road', nameAr: 'مبادرة الحزام والطريق', nameZh: '一带一路' },
      { slug: 'technology', name: 'Technology', nameEn: 'Technology', nameAr: 'تكنولوجيا', nameZh: '科技' },
      { slug: 'culture', name: 'Culture', nameEn: 'Culture', nameAr: 'ثقافة', nameZh: '文化' },
      { slug: 'opinion', name: 'Opinion', nameEn: 'Opinion', nameAr: 'آراء', nameZh: '观点' },
      { slug: 'ai', name: 'AI', nameEn: 'AI', nameAr: 'الذكاء الاصطناعي', nameZh: '人工智能' },
      { slug: 'food-beverage', name: 'Food & Beverage', nameEn: 'Food & Beverage', nameAr: 'الأغذية والمشروبات', nameZh: '餐饮' },
      { slug: 'expo', name: 'Expo', nameEn: 'Expo', nameAr: 'معرض', nameZh: '博览会' },
      { slug: 'business-statistics', name: 'Business Statistics', nameEn: 'Business Statistics', nameAr: 'إحصاءات الأعمال', nameZh: '商业统计' }
    ];

    for (const cat of coreCategories) {
      const existing = await prisma.category.findUnique({
        where: { slug: cat.slug }
      });
      if (!existing) {
        console.log(`📁 Seeding core category: ${cat.slug}`);
        await prisma.category.create({
          data: {
            slug: cat.slug,
            name: cat.name,
            nameEn: cat.nameEn,
            nameAr: cat.nameAr,
            nameZh: cat.nameZh
          }
        });
      }
    }

    const catEnergy = await prisma.category.findUnique({ where: { slug: 'energy' } });
    const catEconomy = await prisma.category.findUnique({ where: { slug: 'economy' } });
    const catCulture = await prisma.category.findUnique({ where: { slug: 'culture' } });
    const catPolitics = await prisma.category.findUnique({ where: { slug: 'politics' } });
    const catBeltRoad = await prisma.category.findUnique({ where: { slug: 'belt-road' } });
    const catTechnology = await prisma.category.findUnique({ where: { slug: 'technology' } });
    const catOpinion = await prisma.category.findUnique({ where: { slug: 'opinion' } });
    const catAi = await prisma.category.findUnique({ where: { slug: 'ai' } });
    const catFood = await prisma.category.findUnique({ where: { slug: 'food-beverage' } });
    const catExpo = await prisma.category.findUnique({ where: { slug: 'expo' } });
    const catStats = await prisma.category.findUnique({ where: { slug: 'business-statistics' } });

    if (!catEnergy || !catEconomy || !catCulture || !catPolitics || !catBeltRoad || !catTechnology || !catOpinion || !catAi || !catFood || !catExpo || !catStats) {
      console.log('⚠️ Core categories not fully seeded yet. Skipping additional news seeding.');
      return;
    }

    // ==========================================
    // 1. ENERGY ARTICLES
    // ==========================================

    // Article A: CNPC Basra Gas Capture
    const art4Slug = 'cnpc-iraq-flare-gas-capture-deal';
    if (!(await prisma.article.findUnique({ where: { slug: art4Slug } }))) {
      console.log(`📰 Seeding additional article: ${art4Slug}`);
      await prisma.article.create({
        data: {
          slug: art4Slug,
          authorId: author.id,
          categoryId: catEnergy.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'CNPC and Iraq Sign Landmark Basra Flare Gas Capture and Energy Pact',
                excerpt: 'International Partnership: China National Petroleum Corporation (CNPC) delivers technological transfer to reduce environmental impact and capture wasted energy in Basra fields.',
                content: 'Baghdad-Beijing Bilateral Dispatch — In a major step toward regional climate commitments, China National Petroleum Corporation (CNPC) and the Iraqi Ministry of Oil have finalized a comprehensive gas flaring mitigation pact in Basra. Under the strategic framework, CNPC will transfer specialized high-efficiency extraction and compression systems to eliminate gas flaring across Southern Iraq. This cooperative framework is projected to secure over 150 million standard cubic feet of clean gas daily, powering local thermal plants and creating hundreds of skilled technical jobs for Iraqi engineers.'
              },
              {
                lang: 'ar',
                title: 'مؤسسة البترول الوطنية الصينية والعراق يوقعان اتفاقية تاريخية لالتقاط غاز الشعلة في البصرة',
                excerpt: 'شراكة دولية: تقدم مؤسسة البترول الوطنية الصينية (CNPC) نقلة تكنولوجية للحد من الأثر البيئي واستغلال الطاقة المهدرة في حقول البصرة.',
                content: 'بغداد - بكين — في خطوة رئيسية نحو الالتزامات المناخية الإقليمية، وقعت مؤسسة البترول الوطنية الصينية (CNPC) ووزارة النفط العراقية اتفاقية شاملة للحد من حرق الغاز المصاص في البصرة. وبموجب الإطار الاستراتيجي، ستقوم CNPC بنقل أنظمة استخراج وضغط متخصصة عالية الكفاءة للقضاء على حرق الغاز في جنوب العراق. ومن المتوقع أن يؤمن هذا الإطار التعاوني أكثر من 150 مليون قدم مكعب قياسي من الغاز النظيف يومياً، مما يساهم في تشغيل المحطات الحرارية المحلية وتوفير مئات الوظائف الفنية للمهندسين العراقيين.'
              },
              {
                lang: 'zh',
                title: '中国石油与伊拉克签署巴士拉火炬气回收及能源地标性合作协议',
                excerpt: '国际伙伴关系：中国石油天然气集团（CNPC）向伊拉克巴士拉油田转让先进的火炬气回收技术，以减轻环境影响并利用清洁能源。',
                content: '巴格达-北京双边快讯 — 作为落实区域气候承诺的重要举措，中国石油天然气集团公司（CNPC）与伊拉克石油部在巴士拉敲定了全面的伴生气减排协议。在这一战略框架下，中石油将提供高效的提取与压缩专利技术，以消除伊拉克南部的伴生气燃烧。该合作项目预计每天将回收超过1.5亿标准立方英尺的清洁天然气，为当地热电厂提供动力，并为伊拉克工程师创造数百个高技能技术岗位。'
              },
              {
                lang: 'ckb',
                title: 'کۆمپانیای نیشتمانی نەوتی چین و عێراق ڕێککەوتننامەیەکی مێژوویی بۆ گرتنی گازی بەفیڕۆچوو لە بەسرە واژۆ دەکەن',
                excerpt: 'هاوبەشی نێودەوڵەتی: کۆمپانیای نیشتمانی نەوتی چین (CNPC) تەکنەلۆجیای پێشکەوتوو پێشکەش دەکات بۆ کەمکردنەوەی کاریگەرییە ژینگەییەکان و بەکارهێنانی وزەی بەفیڕۆچوو لە کێڵگەکانی بەسرە.',
                content: 'بەغدا-پەکین — لە هەنگاوێکی گرنگدا بەرەو پابەندبوونە ژینگەییە هەرێمییەکان، کۆمپانیای نیشتمانی نەوتی چین (CNPC) و وەزارەتی نەوتی عێراق ڕێککەوتنێکی گشتگیریان بۆ کەمکردنەوەی سووتانی گازی هاوەڵ لە بەسرە کۆتایی پێهێنا. لەژێر ئەم چوارچێوە ستراتیژییەدا، CNPC سیستەمی نوێ و کارامەی دەرهێنان و پەستاندنی گاز دەگوازێتەوە بۆ نەهێشتنی سووتانی گاز لە باشووری عێراق. پێشبینی دەکرێت ئەم پڕۆژەیە ڕۆژانە زیاتر لە ١٥٠ ملیۆن پێ سێجا گازی پاک دابین بکات بۆ دابینکردنی وزەی وێستگەکانی کارەبا.'
              }
            ]
          }
        }
      });
    }

    // Article B: SCMP Green Energy Solar
    const art9Slug = 'scmp-iraq-china-solar-green-transition';
    if (!(await prisma.article.findUnique({ where: { slug: art9Slug } }))) {
      console.log(`📰 Seeding additional article: ${art9Slug}`);
      await prisma.article.create({
        data: {
          slug: art9Slug,
          authorId: author.id,
          categoryId: catEnergy.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'SCMP Green Energy: Chinese Photovoltaic Giants Power Southern Iraq’s Renewable Grid',
                excerpt: 'Bilateral Renewable Initiative: Chinese solar industry leaders ink multi-gigawatt PV pipeline deals in Basra to address regional power shortages.',
                content: 'Basra/Shenzhen — In an exclusive report on global energy transitions, the South China Morning Post highlights how Iraq is partnering with Chinese photovoltaic (PV) giants to build a network of large-scale solar farms in Basra and surrounding governorates. To alleviate chronic seasonal electricity blackouts, the Iraqi Ministry of Electricity has finalized a 2-gigawatt solar agreement with leading Chinese manufacturers. This initiative will not only inject clean electricity directly into the national grid but will also integrate modern AI-driven smart grids to optimize distribution across highly populated southern sectors, marking an important step towards a greener, resilient Middle East.'
              },
              {
                lang: 'ar',
                title: 'SCMP للطاقة الخضراء: عمالقة الخلايا الكهروضوئية الصينيون يغذون شبكة الطاقة المتجددة بجنوب العراق',
                excerpt: 'مبادرة ثنائية للطاقة المتجددة: رواد صناعة الطاقة الشمسية الصينيون يوقعون صفقات بمليارات الواطات في البصرة لمعالجة نقص الطاقة الإقليمي.',
                content: 'البصرة / شنتشن — في تقرير حصري حول تحولات الطاقة العالمية، سلطت صحيفة جنوب الصين الصباحية الضوء على كيفية شراكة العراق مع عمالقة الخلايا الكهروضوئية الصينيين لبناء شبكة من مزارع الطاقة الشمسية واسعة النطاق في البصرة والمحافظات المجاورة. وللتخفيف من انقطاع التيار الكهربائي الموسمي المستمر، وقعت وزارة الكهرباء العراقية اتفاقية طاقة شمسية بقوة 2 جيجاوات مع أبرز الشركات المصنعة الصينية. ولن تضخ هذه المبادرة الكهرباء النظيفة مباشرة في الشبكة الوطنية فحسب، بل ستدمج أيضاً الشبكات الذكية الحديثة المعتمدة على الذكاء الاصطناعي لتحسين التوزيع.'
              },
              {
                lang: 'zh',
                title: '南华早报绿色能源报道：中国光伏巨头全面助力伊拉克南部新能源电网建设',
                excerpt: '双边清洁能源倡议：中国太阳能领军企业与伊拉克电力部在巴士拉签署多吉瓦级光伏电站合同，解决该国南部长期电力短缺问题。',
                content: '巴士拉/深圳 — 在一篇关于全球能源转型的独家报道中，《南华早报》着重分析了伊拉克如何同中国光伏巨头联手，在巴士拉及周边省份部署大型太阳能发电网络的进展。为缓解长期存在的季节性供电紧张，伊拉克电力部已同中国头部光伏制造商签署了总装机容量达2吉瓦的太阳能电站合作协议。该项目不仅能直接向伊拉克国家电网输送大量清洁电力，还将引入现代AI驱动的智能微网系统来优化高人口密度区域 of 电力调度，标志着中东绿色低碳转型迈出坚实一步。'
              },
              {
                lang: 'ckb',
                title: 'وزەی سەوزی SCMP: کۆمپانیا گەورەکانی بواری وزەی خۆری چینی تۆڕی وزەی نوێبووەوە لە باشووری عێراق بەهێز دەکەن',
                excerpt: 'دەستپێشخەری وزەی نوێبووەوە: ڕابەرانی پیشەسازی وزەی خۆری چینی ڕێککەوتنی گەورە لە بەسرە واژۆ دەکەن بۆ چارەسەرکردنی کێشەی بێ کارەبایی.',
                content: 'بەسرە/شینژن — لە ڕاپۆرتێکی تایبەتدا سەبارەت بە گواستنەوەی وزە لە جیهاندا، ساوس چاینا مۆرنینگ پۆست تیشک دەخاتە سەر هاوبەشی نێوان عێراق و کۆمپانیا پێشەنگەکانی وزەی خۆری چین بۆ دروستکردنی کێڵگەی وزەی خۆر لە بەسرە. بۆ کەمکردنەوەی پچڕانی کارەبا لە هاویندا، وەزارەتی کارەبای عێراق گرێبەستێکی ٢ گێگاواتی وزەی خۆری لەگەڵ کۆمپانیا چینییەکان واژۆکردووە.'
              }
            ]
          }
        }
      });
    }

    // ==========================================
    // 2. ECONOMY ARTICLES
    // ==========================================

    // Article A: Central Bank of Iraq Yuan Settlement
    const art5Slug = 'cbi-approves-yuan-import-trade-settlement';
    if (!(await prisma.article.findUnique({ where: { slug: art5Slug } }))) {
      console.log(`📰 Seeding additional article: ${art5Slug}`);
      await prisma.article.create({
        data: {
          slug: art5Slug,
          authorId: author.id,
          categoryId: catEconomy.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'Central Bank of Iraq Solidifies RMB Chinese Yuan Trade Settlements to Boost Liquidity',
                excerpt: 'Local Source Reporting: The Central Bank of Iraq (CBI) approves direct Chinese Yuan transactions for private sector trade imports, easing foreign exchange demands.',
                content: 'Baghdad National News Desk — The Central Bank of Iraq (CBI) has issued final regulatory circulars enabling local banks to settle trade transactions directly in Chinese Yuan (RMB). Local financial analysts praise this move as a pragmatic shift that eases structural demands on US dollars while expediting customs clearances for Chinese industrial machinery. The decision marks a significant integration of regional capital corridors, stabilizing commodity importing channels between Basra and key Chinese trading hubs.'
              },
              {
                lang: 'ar',
                title: 'البنك المركزي العراقي يرسخ تسوية المعاملات التجارية باليوان الصيني لتعزيز السيولة المالية',
                excerpt: 'مصادر محلية: البنك المركزي العراقي يوافق على المعاملات المباشرة باليوان الصيني لاستيرادات القطاع الخاص، مما يخفف الطلب على العملات الأجنبية الأخرى.',
                content: 'بغداد — أصدر البنك المركزي العراقي تعاميم تنظيمية نهائية تتيح للمصارف المحلية تسوية المعاملات التجارية مباشرة باليوان الصيني (RMB). وأشاد محللون ماليون عراقيون بهذه الخطوة كتحول عملي يقلل الضغط الهيكلي على الدولار الأمريكي، مع تسريع التخليص الجمركي للآلات والمعدات الصناعية المستوردة من الصين. يمثل هذا القرار خطوة استراتيجية نحو تعزيز استقرار قنوات الاستيراد المباشر بين الموانئ العراقية ومراكز التصنيع الصينية الكبرى.'
              },
              {
                lang: 'zh',
                title: '伊拉克央行确立人民币贸易结算体系以增强外汇流动性',
                excerpt: '本地媒体报道：伊拉克中央银行（CBI）批准私营部门进口贸易直接使用人民币结算，有效缓解了对其他主要外币的依赖压力。',
                content: '巴格达国家金融电讯 — 伊拉克中央银行（CBI）已发布最终监管通告，允许本地银行直接以人民币结算与中国的双边贸易。本地金融学家对此举表示高度赞赏，认为这是一个务实的政策转变，既能有效缓解国内美元的流动性压力，又能加快中国工业机械进入伊拉克的清关流程。该决策标志着两国资本通道的进一步深度交融，有利于稳定巴格达与中国主要贸易枢纽之间的商品进口网络。'
              },
              {
                lang: 'ckb',
                title: 'بانکی ناوەندی عێراق بەکارهێنانی یوانی چینی بۆ جێگیرکردنی بازرگانی چەسپاند بۆ زیادکردنی نەختینە',
                excerpt: 'ڕاپۆرتی سەرچاوە ناوخۆییەکان: بانکی ناوەندی عێراق (CBI) ڕەزامەندی نیشاندا لەسەر بەکارهێنانی ڕاستەوخۆی یوانی چینی بۆ هاوردەکردنی بازرگانی کەرتی تایبەت.',
                content: 'بەغدا — بانکی ناوەندی عێراق ڕێنمایی نوێی بۆ بانکە ناوخۆییەکان دەرکرد بۆ یەکلاکردنەوەی مامەڵە بازرگانییەکان بە یوانی چینی (RMB) بە شێوەیەكي ڕاستەوخۆ. شرۆڤەکارانی دارایی لە عێراق پێشوازی دەکەن لەم هەنگاوە کە دەبێتە هۆی کەمکردنەوەی فشار لەسەر دۆلاری ئەمریکی و خێراکردنی کارەکانی گومرگ بۆ کەلوپەلی هاوردەکراو لە چینەوە.'
              }
            ]
          }
        }
      });
    }

    // Article B: SCMP Al Faw Port
    const art7Slug = 'scmp-al-faw-port-development-road-hub';
    if (!(await prisma.article.findUnique({ where: { slug: art7Slug } }))) {
      console.log(`📰 Seeding SCMP replica article: ${art7Slug}`);
      await prisma.article.create({
        data: {
          slug: art7Slug,
          authorId: author.id,
          categoryId: catEconomy.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'SCMP Report: Al Faw Grand Port Positions Iraq as Crucial Node on China’s Belt and Road',
                excerpt: 'Special Insight: Leading analysts detail how Iraq’s mega port project integrates with China’s Maritime Silk Road and the regional Development Road initiative.',
                content: 'Hong Kong/Baghdad — The South China Morning Post (SCMP) reports that Iraq\'s ambitious Al Faw Grand Port has emerged as a cornerstone of China\'s Belt and Road Initiative (BRI) in the Persian Gulf. As construction progresses on the massive terminal, strategic planners from Beijing and Baghdad are working to coordinate the port with the proposed "Development Road"—a 1,200 km highway and rail corridor connecting Southern Iraq to Europe via Turkey. SCMP analysts highlight that this multimodal network could bypass traditional maritime bottlenecks, shaving up to 15 days off standard transit times between East Asia and Europe. Chinese state-owned enterprises are actively bidding for railway construction and logistics hubs along the route, further entrenching the "oil-for-infrastructure" paradigm.'
              },
              {
                lang: 'ar',
                title: 'تقرير SCMP: ميناء الفاو الكبير يضع العراق كعقدة حاسمة في مبادرة الحزام والطريق الصينية',
                excerpt: 'رؤية خاصة: يفصل كبار المحللين كيف يتكامل مشروع ميناء العراق العملاق مع طريق الحرير البحري الصيني ومبادرة طريق التنمية الإقليمية.',
                content: 'هونغ كونغ / بغداد — أفادت صحيفة جنوب الصين الصباحية (SCMP) أن ميناء الفاو الكبير الطموح في العراق قد برز كحجر زاوية لمبادرة الحزام والطريق الصينية (BRI) في الخليج العربي. ومع تقدم أعمال البناء في المحطة الضخمة، يعمل المخططون الاستراتيجيون من بكين وبغداد على تنسيق الميناء مع "طريق التنمية" المقترح — وهو ممر بري وسكك حديدية بطول 1,200 كيلومتر يربط جنوب العراق بأوروبا عبر تركيا. ويسلط محللو SCMP الضوء على أن هذه الشبكة متعددة الوسائط يمكن أن تتجاوز الاختناقات البحرية التقليدية، مما يقلل ما يصل إلى 15 يوماً من أوقات النقل القياسية بين شرق آسيا وأوروبا.'
              },
              {
                lang: 'zh',
                title: '南华早报：巴士拉阿尔法奥港使伊拉克成为中国“一带一路”倡议关键节点',
                excerpt: '专题洞察：顶级分析师详述伊拉克这一超级港口项目如何同中国海上丝绸之络及地区“发展之路”倡议深度融合。',
                content: '香港/巴格达 — 《南华早报》（SCMP）报道指出，伊拉克雄心勃勃的阿尔法奥大港已成为中国在海湾地区推进“一带一路”倡议的基石。随着该超级码头的建设不断取得新进展，北京和巴格达的战略规划人员正致力于将该港口与规划中的“发展之路”——一条连接伊拉克南部与欧洲（经由土耳其）的长达1200公里的公路和铁路通道——进行一体化对接。《南华早报》分析师强调，这一多式联运网络能绕过传统海上瓶颈，使东亚至欧洲的标准转运时间缩短多达15天。'
              },
              {
                lang: 'ckb',
                title: 'ڕاپۆرتی SCMP: بەندەری گەورەی فاو پێگەی عێراق وەک گرێیەکی گرنگ لە دەستپێشخەری پشتێنە و ڕێگای چین بەهێز دەکات',
                excerpt: 'تێڕوانینی تایبەت: شرۆڤەکارانی باڵا دەریدەخەن چۆن پڕۆژە زەبەلاحەکەی عێراق تێکەڵ بە ڕێگای ئاوریشمی دەریایی چین و دەستپێشخەری ڕێگای گەشەپێدان دەبێت.',
                content: 'هۆنگ کۆنگ/بەغدا — ڕۆژنامەی ساوس چاینا مۆرنینگ پۆست (SCMP) بڵاویکردەوە کە بەندەری گەورەی فاو لە عێراق وەک بەردی بناغەی دەستپێشخەری پشتێنە و ڕێگای چین لە کەنداودا دەرکەوتووە. شانبەشانی بەرەوپێشچوونی کارەکانی ئەم وێستگە گەورەیە، داڕێژەرانی ستراتیژی لە پەکین و بەغدا کاردەکەن بۆ ڕێکخستنی ئەم بەندەرە لەگەڵ پڕۆژەی "ڕێگای گەشەپێدان" کە ڕێگایەکی خێرا و هێڵی شەمەندەفەری ١٢٠٠ کیلۆمەترییە و باشووری عێراق بە ئەوروپاوە دەبەستێتەوە لە ڕێگەی تورکیاوە.'
              }
            ]
          }
        }
      });
    }

    // Article C: SCMP Nasiriyah Airport (Infrastructure/Economy)
    const art8Slug = 'scmp-nasiriyah-airport-china-infrastructure';
    if (!(await prisma.article.findUnique({ where: { slug: art8Slug } }))) {
      console.log(`📰 Seeding SCMP replica article: ${art8Slug}`);
      await prisma.article.create({
        data: {
          slug: art8Slug,
          authorId: author.id,
          categoryId: catEconomy.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'Nasiriyah Airport Redesign Speeds Up Under China-Iraq "Oil-for-Infrastructure" Paradigm',
                excerpt: 'Infrastructure Dispatch: Handled by CSCEC, the massive airport project transitions China-Iraq bilateral cooperation from energy focus to civilian air logistics hubs.',
                content: 'Nasiriyah/Beijing — Under the bilateral "oil-for-infrastructure" model covered extensively by the South China Morning Post, the Nasiriyah International Airport project has entered its final construction phase. Being executed by China State Construction Engineering Corporation (CSCEC), the project represents a major pivot of China-Iraq cooperation from purely upstream energy assets to critical civil infrastructure. Once fully operational in late 2026, the modern hub will handle over one million passengers annually and establish Southern Iraq as an aviation logistics center for the Middle East, facilitating seamless business connections for multinational investors and regional traders.'
              },
              {
                lang: 'ar',
                title: 'تسارع إعادة تصميم مطار الناصرية بموجب نموذج "النفط مقابل البنية التحتية" بين العراق والصين',
                excerpt: 'إرسالية البنية التحتية: ينقل مشروع المطار الضخم الذي تديره CSCEC التعاون الثنائي بين الصين والعراق من التركيز على الطاقة إلى مراكز الطيران المدني لوجستياً.',
                content: 'الناصرية / بكين — بموجب نموذج "النفط مقابل البنية التحتية" الثنائي الذي غطته صحيفة جنوب الصين الصباحية على نطاق واسع، دخل مشروع مطار الناصرية الدولي مرحلة البناء النهائية. ويمثل المشروع، الذي تنفذه الشركة الصينية الحكومية لهندسة البناء (CSCEC)، محوراً رئيسياً في تحول التعاون العراقي الصيني من أصول الطاقة البحتة إلى البنية التحتية المدنية الحيوية. وبمجرد تشغيل هذا المركز الحديث بالكامل في أواخر عام 2026، سيتعامل مع أكثر من مليون مسافر سنوياً ويؤسس جنوب العراق كمركز لوجستي للطيران في الشرق الأوسط.'
              },
              {
                lang: 'zh',
                title: '中伊“石油换基建”框架下 纳西里耶国际机场改扩建工程全面加速',
                excerpt: '基建动态：由中国建筑（CSCEC）承建的这一大型机场项目，标志着中伊双边合作从传统能源开采向民用航空物流枢纽的重大转型。',
                content: '纳西里耶/北京 — 在《南华早报》多次深度报道的中伊“石油换重建”合作框架下，纳西里耶国际机场项目已进入最后主体施工阶段。该工程由中国建筑集团有限公司（CSCEC）承建，是中伊双边合作向重大民生民用基础设施领域延伸的代表之作。机场预计将于2026年下半年正式投入运营，设计年客流量达100万人次，将极大提升伊拉克南部地区的民航运力，并使该区域成为辐射中东的航空物流集散中心，为多国投资者及本地贸易商提供极大的出行便利。'
              },
              {
                lang: 'ckb',
                title: 'کارەکانی فڕۆکەخانەی ناسیریە لەژێر پڕۆژەی "نەوت بەرامبەر بە ژێرخان" خێراتر دەبێت',
                excerpt: 'بەرەوپێشچوونی ژێرخان: پڕۆژە زەبەلاحەکەی فڕۆکەخانە کە لەلایەن کۆمپانیای CSCEC جێجێ دەکرێت، هاوکارییەکانی چین و عێراق بەرەو گواستنەوەی فڕۆکەوانی مدەنی دەبات.',
                content: 'ناسیریە/پەکین — لەژێر پڕۆژەی دوو لایەنەی "نەوت بەرامبەر بە بنیادنانەوە"، پڕۆژەی فڕۆکەخانەی نێودەوڵەتی ناسیریە پێ دەنێتە قۆناغی کۆتایی دروستکردنیەوە. ئەم پڕۆژەیە کە لەلایەن کۆمپانیای ئەندازیاری بیناسازی نیشتمانی چین (CSCEC) ئەنجام دەدرێت، بازدانێکی گرنگە لە تەنها هاوکاری وزەوە بەرەو ژێرخانی گرنگی مەدەنی.'
              }
            ]
          }
        }
      });
    }

    // ==========================================
    // 3. POLITICS ARTICLES
    // ==========================================

    // Article A: China-Iraq Baghdad Summit
    const artPol1 = 'china-iraq-strategic-partnership-baghdad-summit';
    if (!(await prisma.article.findUnique({ where: { slug: artPol1 } }))) {
      console.log(`📰 Seeding politics article: ${artPol1}`);
      await prisma.article.create({
        data: {
          slug: artPol1,
          authorId: author.id,
          categoryId: catPolitics.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'China and Iraq Cement Strategic Ties During High-Level Baghdad Summit',
                excerpt: 'Bilateral Diplomacy: High-level Chinese delegation visits Baghdad to discuss regional stability, sovereign investments, and the expansion of the strategic partnership.',
                content: 'Baghdad — A senior delegation from the Chinese Ministry of Foreign Affairs concluded a historic three-day visit to Baghdad, reaffirming deep sovereign ties between the two nations. In joint sessions with the Iraqi Prime Minister, both sides emphasized commitment to long-term regional stability, safe maritime corridors, and the protection of mutual investments. The summit concluded with a memorandum on sovereign guarantees for future industrial projects, marking a new chapter in diplomatic and economic partnerships.'
              },
              {
                lang: 'ar',
                title: 'الصين والعراق يرسخان العلاقات الاستراتيجية خلال قمة بغداد رفيعة المستوى',
                excerpt: 'الدبلوماسية الثنائية: وفد صيني رفيع المستوى يزور بغداد لمناقشة الاستقرار الإقليمي والاستثمارات السيادية وتوسيع الشراكة الاستراتيجية.',
                content: 'بغداد — اختتم وفد رفيع المستوى من وزارة الخارجية الصينية زيارة تاريخية استمرت ثلاثة أيام إلى بغداد، مؤكداً مجدداً على العلاقات السيادية العميقة بين البلدين. وفي جلسات مشتركة مع رئيس الوزراء العراقي، أكد الجانبان التزامهما بالاستقرار الإقليمي طويل الأجل، والممرات البحرية الآمنة، وحماية الاستثمارات المتبادلة. واختتمت القمة بمذكرة تفاهم بشأن الضمانات السيادية للمشاريع الصناعية المستقبلية.'
              },
              {
                lang: 'zh',
                title: '中伊高级别巴格达峰会圆满落幕 两国重申深化战略伙伴关系',
                excerpt: '双边外交：中国外交部高级代表团访问巴格达，就地区稳定、主权投资以及扩大双边战略伙伴关系进行深入磋商。',
                content: '巴格达 — 中国外交部高级代表团结束了对巴格达为期三天的历史性访问，重申了两国深厚的主权关系。在与伊拉克总理的会谈中，双方强调致力于维护地区长期稳定、保障海上安全通道并保护互利投资。峰会以签署未来工业项目主权担保备忘录落下帷幕，标志着双边外交与经济合作进入新篇章。'
              },
              {
                lang: 'ckb',
                title: 'چین و عێراق پەیوەندییە ستراتیژییەکانیان لە لووتکەی باڵای بەغداد بەهێزتر دەکەن',
                excerpt: 'دیپلۆماسی دوولایەنە: شاندێکی باڵای چین سەردانی بەغدا دەکات بۆ تاوتوێکردنی سەقامگیری ناوچەکە و وەبەرهێنانی دەوڵەتی.',
                content: 'بەغدا — شاندێکی باڵای وەزارەتی دەرەوەی چین سەردانێکی مێژوویی سێ ڕۆژەی بۆ بەغدا کۆتایی پێهێنا و پەیوەندییە قووڵەکانی نێوان هەردوو وڵاتی دووپاتکردەوە. لە دانیشتنە هاوبەشەکاندا لەگەڵ سەرۆک وەزیرانی عێراق، هەردوولا جەختیان لەسەر پابەندبوونی خۆیان بۆ سەقامگیری درێژخایەنی ناوچەکە کردەوە.'
              }
            ]
          }
        }
      });
    }

    // Article B: Judicial Treaty
    const artPol2 = 'iraq-china-judicial-mutual-assistance-treaty';
    if (!(await prisma.article.findUnique({ where: { slug: artPol2 } }))) {
      console.log(`📰 Seeding politics article: ${artPol2}`);
      await prisma.article.create({
        data: {
          slug: artPol2,
          authorId: author.id,
          categoryId: catPolitics.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'Iraq and China Ratify Mutual Judicial and Administrative Assistance Treaty',
                excerpt: 'Bilateral Diplomacy: New administrative treaty streamlines commerce, protects property rights, and simplifies dispute resolution for Chinese enterprises.',
                content: 'Baghdad — The Iraqi Parliament has ratified a comprehensive mutual judicial and administrative assistance treaty with China. The bilateral compact is designed to establish a clear, standardized framework for commercial dispute resolution, protect intellectual property, and expedite judicial inquiries involving joint venture firms. Legal experts from the Ministry of Justice stated that this treaty offers a major boost to sovereign security and builds immense trust for foreign direct investments.'
              },
              {
                lang: 'ar',
                title: 'العراق والصين يصادقان على معاهدة المساعدة القضائية والإدارية المتبادلة',
                excerpt: 'الدبلوماسية الثنائية: المعاهدة الإدارية الجديدة تبسط التجارة وتحمي حقوق الملكية وتسهل تسوية النزاعات للشركات الصينية.',
                content: 'بغداد — صادق البرلمان العراقي على معاهدة شاملة للمساعدة القضائية والإدارية المتبادلة مع الصين. تم تصميم الميثاق الثنائي لوضع إطار واضح وموحد لتسوية النزاعات التجارية، وحماية الملكية الفكرية، وتسريع الاستفسارات القضائية المتعلقة بالمشروعات المشتركة. وصرح خبراء قانونيون بوزارة العدل أن هذه المعاهدة تقدم دفعة قوية للأمن السيادي وتبني ثقة هائلة للاستثمارات الأجنبية المباشرة.'
              },
              {
                lang: 'zh',
                title: '伊拉克与中国正式批准双边司法与行政协助互助条约',
                excerpt: '双边外交：全新签署的行政条约规范了双边商事行为，保护知识产权，并简化了在伊中资企业的商事纠纷解决机制。',
                content: '巴格达 — 伊拉克国民议会正式批准了与中国的一项全面司法与行政协助互助条约。该双边协定旨在建立一个清晰、标准化的商事争端解决框架，保护跨国知识产权，并加快涉及合资企业的司法协助调查。司法部法律专家指出，该条约极大增强了主权合规安全性，为外国直接投资（FDI）树立了强有力的市场信心。'
              },
              {
                lang: 'ckb',
                title: 'عێراق و چین پەیماننامەی هاوکاری دادوەری و کارگێڕی هاوبەش پەسەند دەکەن',
                excerpt: 'دیپلۆماسی دوولایەنە: پەیماننامە کارگێڕییە نوێیەکە بازرگانی ئاسان دەکات و کێشە یاساییەکان چارەسەر دەکات.',
                content: 'بەغدا — پەرلەمانی عێراق پەیماننامەیەکی گشتگیری بۆ هاوکاری دادوەری و کارگێڕی هاوبەش لەگەڵ چین پەسەند کرد. ئەم ڕێککەوتنە بۆ چارەسەرکردنی کێشە بازرگانییەکان و پاراستنی مافی خاوەندارێتی فیکری داڕێژراوە.'
              }
            ]
          }
        }
      });
    }

    // ==========================================
    // 4. BELT & ROAD ARTICLES
    // ==========================================

    // Article A: Historic Mosul Highway
    const artBelt1 = 'belt-road-historic-mosul-highway-reconstruction';
    if (!(await prisma.article.findUnique({ where: { slug: artBelt1 } }))) {
      console.log(`📰 Seeding belt-road article: ${artBelt1}`);
      await prisma.article.create({
        data: {
          slug: artBelt1,
          authorId: author.id,
          categoryId: catBeltRoad.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'Historic Silk Highway Connecting Mosul and Eastern Frontiers Reconstructed Under Belt & Road',
                excerpt: 'Infrastructure Deals: Reconstruction of the 240km highway network begins, aimed at restoring critical transport links to Iraq\'s northern agricultural heartlands.',
                content: 'Mosul — Under the Belt and Road Initiative, construction has officially commenced on the comprehensive rehabilitation of the historic Mosul-Kirkuk-Khanaqin highway. The project, executed by China Communications Construction Company (CCCC), will modernize 240 kilometers of high-capacity freight corridors, adding smart weigh-stations and heavy-load concrete reinforcement. This critical artery will facilitate faster transport of agricultural goods and reconstruction materials, linking Northern Iraq directly to the trans-regional Silk Road networks.'
              },
              {
                lang: 'ar',
                title: 'إعادة بناء الطريق الحريري التاريخي الذي يربط الموصل بالحدود الشرقية ضمن مبادرة الحزام والطريق',
                excerpt: 'صفقات البنية التحتية: بدء إعادة بناء شبكة الطرق السريعة بطول 240 كم، بهدف استعادة روابط النقل الحيوية إلى المناطق الزراعية في شمال العراق.',
                content: 'الموصل — تحت مظلة مبادرة الحزام والطريق، بدأت أعمال البناء رسمياً في التأهيل الشامل لطريق الموصل - كركوك - خانقين التاريخي. وسيقوم المشروع، الذي تنفذه شركة إنشاءات الاتصالات الصينية (CCCC)، بتحديث 240 كيلومتراً من ممرات الشحن عالية السعة، مع إضافة محطات وزن ذكية وتعزيزات خرسانية للأحمال الثقيلة لتسهيل حركة البضائع الزراعية ومواد البناء.'
              },
              {
                lang: 'zh',
                title: '一带一路框架下连接摩苏尔与东部边境的历史丝路公路重建工程开工',
                excerpt: '基建合同：240公里高速公路网重建工作正式启动，旨在恢复伊拉克北部农业腹地与东部边疆的关键物流纽带。',
                content: '摩苏尔 — 在“一带一路”倡议框架下，历史悠久的摩苏尔-基尔库克-哈纳qin公路综合整治工程正式开工建设。该项目由中国交通建设股份有限公司（CCCC）承建，将对240公里的重载货运走廊进行现代化升级，增设智能称重站并进行重载路面补强。这一关键交通大动脉将极大加速农产品与重建材料的运输，使伊拉克北部直接融入跨区域丝绸之路物流网络。'
              },
              {
                lang: 'ckb',
                title: 'نوێکردنەوەی ڕێگای مێژوویی ئاوریشم لە نێوان مووسڵ و سنوورەکانی ڕۆژهەڵات لەژێر پڕۆژەی کەمەر و ڕێگا',
                excerpt: 'گرێبەستی ژێرخان: دەستپێکردنی کارەکانی نۆژەنکردنەوەی ٢٤٠ کم ڕێگای سەرەکی بۆ بەستنەوەی ناوچە کشتوکاڵییەکان.',
                content: 'مووسڵ — لەژێر دەستپێشخەری کەمەر و ڕێگادا، کارەکانی نۆژەنکردنەوەی گشتگیری ڕێگای مێژوویی مووسڵ-کەرکووک-خانەقین دەستی پێکرد. پڕۆژەکە کە لەلایەن کۆمپانیای چینی (CCCC) جێبەجێ دەکرێت، ٢٤٠ کم ڕێگای گواستنەوەی بارهەڵگرەکان مۆدێرن دەکات.'
              }
            ]
          }
        }
      });
    }

    // Article B: Baghdad Residential Complex (Belt & Road)
    const artBelt2 = 'belt-road-reconstruction-baghdad-residential-complex';
    if (!(await prisma.article.findUnique({ where: { slug: artBelt2 } }))) {
      console.log(`📰 Seeding belt-road article: ${artBelt2}`);
      await prisma.article.create({
        data: {
          slug: artBelt2,
          authorId: author.id,
          categoryId: catBeltRoad.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'China State Construction Signs Mega Deal for 10,000-Unit Residential Complex in Baghdad',
                excerpt: 'Infrastructure Expansion: Strategic development aims to address capital housing shortages with eco-friendly smart city concepts and localized material supplies.',
                content: 'Baghdad — To tackle chronic housing deficits, the Iraqi National Investment Commission has signed a historic contract with China State Construction Engineering Corporation (CSCEC). The agreement launches the construction of a massive 10,000-unit mixed-income housing development on Baghdad\'s outskirts. Integrating green building standards, rooftop solar panels, and localized water recycling grids, this smart city enclave will establish a benchmark for urban reconstruction. The project will generate over 8,000 local building sector jobs and utilize Iraqi cement and steel suppliers, driving direct domestic economic stimulus.'
              },
              {
                lang: 'ar',
                title: 'الشركة الصينية لهندسة البناء توقع صفقة ضخمة لإنشاء مجمع سكني يضم 10 آلاف وحدة في بغداد',
                excerpt: 'توسع البنية التحتية: يهدف التطوير الاستراتيجي إلى معالجة نقص الإسكان في العاصمة باستخدام مفاهيم المدن الذكية الصديقة للبيئة.',
                content: 'بغداد — لمعالجة العجز المزمن في قطاع الإسكان، وقعت الهيئة الوطنية للاستثمار العراقية عقداً تاريخياً مع الشركة الصينية الحكومية لهندسة البناء (CSCEC). ويطلق الاتفاق أعمال البناء لمشروع سكني ضخم يضم 10,000 وحدة سكنية لمحدودي ومتوسطي الدخل على أطراف بغداد، مجهز بأحدث معايير الأبنية الخضراء وألواح الطاقة الشمسية وشبكات تدوير المياه.'
              },
              {
                lang: 'zh',
                title: '中国建筑签署巴格达万套保障性住宅综合社区超级项目建设合同',
                excerpt: '基础设施扩建：旨在通过环保型智能城市理念和高度本土化建材供应链，缓解伊拉克首都巴格达的严峻住房短缺。',
                content: '巴格达 — 为解决首都长期面临的住房赤字，伊拉克国家投资委员会与中国建筑集团有限公司（CSCEC）正式签署历史性建设合同。双方将联合在巴格达郊区兴建一座包含10000套各类住宅的大型现代化低碳社区。该项目将全面引入绿色建筑标准，配备屋顶光伏发电与高等级中水循环系统，打造成巴格达震后城市复兴与智城示范点，预计可直接提供超8000个建筑业岗位并大量采用本土钢材。'
              },
              {
                lang: 'ckb',
                title: 'کۆمپانیای بیناسازی دەوڵەتی چین گرێبەستێکی گەورە بۆ دروستکردنی ١٠,٠٠٠ یەکەی نیشتەجێبوون لە بەغدا واژۆ دەکات',
                excerpt: 'پەرەپێدانی ژێرخان: پڕۆژەیەکی مۆدێرن و ژینگەدۆست بۆ چارەسەرکردنی کێشەی نیشتەجێبوون لە پایتەخت.',
                content: 'بەغدا — بۆ چارەسەرکردنی کێشەی کەمبوونی خانوو لە بەغدا، دەستەی نیشتیمانی وەبەرهێنانی عێراق گرێبەستێکی مێژوویی لەگەڵ کۆمپانیای چینی CSCEC واژۆکرد بۆ دروستکردنی ١٠ هەزار یەکەی نیشتەجێبوون لە دەرەوەی شارەکە.'
              }
            ]
          }
        }
      });
    }

    // ==========================================
    // 5. TECHNOLOGY ARTICLES
    // ==========================================

    // Article A: Huawei Fiber and 5G Grid
    const artTech1 = 'ministry-communications-huawei-fiber-5g-upgrade';
    if (!(await prisma.article.findUnique({ where: { slug: artTech1 } }))) {
      console.log(`📰 Seeding technology article: ${artTech1}`);
      await prisma.article.create({
        data: {
          slug: artTech1,
          authorId: author.id,
          categoryId: catTechnology.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'Ministry of Communications Partners with Huawei for National Fiber-Optic and 5G Grid',
                excerpt: 'Innovation & Tech: Multi-year technological alliance targets rural connectivity and high-speed data backbone installations across twelve provinces.',
                content: 'Baghdad — The Iraqi Ministry of Communications has finalized a strategic digital grid expansion contract with Huawei. Under the agreement, the global tech giant will install over 8,000 kilometers of high-capacity fiber-optic cables and upgrade urban base stations to full 5G capability. This partnership is designed to establish a resilient, high-speed digital backbone, significantly reducing latency and expanding reliable high-speed internet access to rural schools, clinics, and municipal offices across twelve provinces.'
              },
              {
                lang: 'ar',
                title: 'وزارة الاتصالات تتعاون مع هواوي لإنشاء شبكة وطنية للألياف الضوئية والجيل الخامس',
                excerpt: 'الابتكار والتكنولوجيا: تحالف تكنولوجي متعدد السنوات يستهدف الاتصال الريفي وتركيب العمود الفقري للبيانات عالية السرعة في اثنتي عشرة محافظة.',
                content: 'بغداد — وقعت وزارة الاتصالات العراقية عقداً استراتيجياً مع شركة هواوي لتوسيع الشبكة الرقمية الوطنية. وبموجب الاتفاقية، سيقوم عملاق التكنولوجيا العالمي بتركيب أكثر من 8,000 كيلومتر من كابلات الألياف الضوئية عالية السعة وترقية محطات البث الحضرية إلى قدرة الجيل الخامس الكاملة (5G). ويهدف هذا المشروع إلى إنشاء بنية تحتية رقمية مرنة عالية السرعة، مما يقلل بشكل كبير من زمن الاستجابة ويوسع نطاق الوصول الموثوق للإنترنت في المدارس والعيادات والمكاتب البلدية الريفية.'
              },
              {
                lang: 'zh',
                title: '伊拉克通信部与华为达成国家光纤与5G网络升级战略合作',
                excerpt: '科技创新：为期数年的技术联盟旨在实现乡镇网络覆盖，并在12个省份部署高速光纤数据骨干网。',
                content: '巴格达 — 伊拉克通信部与全球领先科技企业华为签署了国家骨干数字网扩容战略合同。根据协议，华为将主导铺设超过8000公里的高带宽光纤电缆，并对大中型城市的移动基站全面实施5G功能升级。该合作旨在为伊拉克全境打通一条高韧性、低延迟的高速数字大通道，确保偏远省份的学校、医疗诊所及市政办公机构能享受到高品质、稳定且低成本的宽带和移动网络接入。'
              },
              {
                lang: 'ckb',
                title: 'وەزارەتی پەیوەندییەکان لەگەڵ کۆمپانیای هواوی بۆ تۆرێ مۆدێرنی فایبەر و 5G گرێبەست واژۆ دەکات',
                excerpt: 'تەکنەلۆژیا و داهێنان: پڕۆژەیەکی گەورە بۆ گەیاندنی هێڵی خێرای ئینتەرنێت و فایبەر ئۆپتیک بۆ ١٢ پارێزگا.',
                content: 'بەغدا — وەزارەتی پەیوەندییەکانی عێراق گرێبەستێکی گەورەی لەگەڵ هواوی واژۆکرد بۆ دروستکردنی تۆڕی نیشتمانی فایبەر ئۆپتیک بە درێژایی ٨٠٠٠ کیلۆمەتر و بەرزکردنەوەی ئاستی هێڵەکان بۆ 5G.'
              }
            ]
          }
        }
      });
    }

    // Article B: Microelectronics Park
    const artTech2 = 'tigris-yellow-river-microelectronics-science-park';
    if (!(await prisma.article.findUnique({ where: { slug: artTech2 } }))) {
      console.log(`📰 Seeding technology article: ${artTech2}`);
      await prisma.article.create({
        data: {
          slug: artTech2,
          authorId: author.id,
          categoryId: catTechnology.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'Joint Tigris-Yellow River Microelectronics and Science Park Inaugurated in Baghdad',
                excerpt: 'Innovation & Tech: New high-tech incubator provides localized training in embedded hardware, robotics, and cloud systems for young Iraqi researchers.',
                content: 'Baghdad — In a significant step toward technological self-reliance, the Iraqi Ministry of Higher Education and Chinese academic institutes have inaugurated the Tigris-Yellow River Microelectronics and Science Park in Baghdad. The state-of-the-art incubator features specialized laboratories for embedded hardware design, robotics, and cloud networking. Supported by Chinese tech donations, the park will offer fully-funded vocational workshops and research fellowships for young Iraqi engineers, accelerating local innovation.'
              },
              {
                lang: 'ar',
                title: 'افتتاح مجمع دجلة والنهر الأصفر للإلكترونيات الدقيقة والعلوم في بغداد',
                excerpt: 'الابتكار والتكنولوجيا: حاضنة تكنولوجية جديدة تقدم تدريباً محلياً على الأنظمة المدمجة والروبوتات والأنظمة السحابية للباحثين العراقيين الشباب.',
                content: 'بغداد — في خطوة هامة نحو الاعتماد التكنولوجي الذاتي، افتتحت وزارة التعليم العالي والبحث العلمي العراقية والمعاهد الأكاديمية الصينية مجمع دجلة والنهر الأصفر للإلكترونيات الدقيقة والعلوم في بغداد. وتضم الحاضنة المتطورة مختبرات متخصصة في تصميم الأجهزة المدمجة، والروبوتات، والشبكات السحابية. وسيقدم المجمع، المدعوم بتبرعات تكنولوجية صينية، ورش عمل مهنية ممولة بالكامل وزمالات بحثية للمهندسين العراقيين الشباب لتسريع الابتكار المحلي.'
              },
              {
                lang: 'zh',
                title: '巴格达正式启用“底格里斯河-黄河”微电子与科学产业园',
                excerpt: '科技创新：全新高科技孵化中心将为伊拉克青年学者提供嵌入式硬件、机器人设计及云端计算的专业化本土技能培训。',
                content: '巴格达 — 为提升在核心科技领域的自主研发与应用水平，伊拉克高等教育部联合中国数家顶尖学术研究机构，在巴格达共同落成启用了“底格里斯河-黄河”微电子与科学产业园。该孵化器配备了世界一流的研究设备，专注于嵌入式微芯片设计、特种机器人研制、物联网和大型云计算管理系统。得益于中方提供的一批先进硬核设备物资捐赠，产业园将面向优秀的伊拉克青年毕业工程师，提供全额资助的职业技术集训与联合课题学术资助。'
              },
              {
                lang: 'ckb',
                title: 'پارکی تەکنەلۆژیا و زانستی هاوبەشی دیجلە و ڕووباری زەرد لە بەغدا دەکرێتەوە',
                excerpt: 'تەکنەلۆژیا و داهێنان: سەنتەرێکی نوێی زانستی بۆ دابینکردنی ڕاهێنانی مۆدێرن لەسەر ڕۆبۆت و دروستکردنی کەلوپەلی ئەلیکترۆنی.',
                content: 'بەغدا — وەزارەتی خوێندنی باڵای عێراق بە هاوکاری پەیمانگاکانی چین پارکی زانستی دیجلە و ڕووباری زەردیان لە بەغدا کردەوە بۆ پێشکەشکردنی ڕاهێنان لەسەر تەکنەلۆژیای مۆدێرن بە گەنجان.'
              }
            ]
          }
        }
      });
    }

    // ==========================================
    // 6. CULTURE ARTICLES
    // ==========================================

    // Article A: PowerChina 1000 Smart Schools
    const art6Slug = 'powerchina-delivers-first-phase-smart-schools';
    if (!(await prisma.article.findUnique({ where: { slug: art6Slug } }))) {
      console.log(`📰 Seeding additional article: ${art6Slug}`);
      await prisma.article.create({
        data: {
          slug: art6Slug,
          authorId: author.id,
          categoryId: catCulture.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'PowerChina Delivers Phase 1 of 1,000 Model Smart Schools Across Iraqi Provinces',
                excerpt: 'Educational Exchange: New school facilities featuring modern solar power microgrids and high-tech sports complexes are officially handed over to the Ministry of Education.',
                content: 'Baghdad Ministry Desk — Under the bilateral China-Iraq framework agreement, PowerChina has successfully handed over the initial batch of model schools across multiple Iraqi provinces. Built with structural sustainability in mind, each campus features dedicated high-capacity solar microgrids, advanced digital computer labs, and multi-sport complexes. The Iraqi Ministry of Education confirmed that these campuses will accommodate over 50,000 local students starting this academic year, showcasing a highly practical dimension of the strategic partnership.'
              },
              {
                lang: 'ar',
                title: 'باور تشاينا تسلم المرحلة الأولى من مشروع 1000 مدرسة نموذجية ذكية في المحافظات العراقية',
                excerpt: 'التبادل التعليمي والثقافي: تسليم منشآت مدرسية حديثة مجهزة بشبكات طاقة شمسية وملاعب رياضية متطورة رسمياً إلى وزارة التربية العراقية.',
                content: 'بغداد — بموجب الاتفاقية الإطارية الثنائية بين العراق والصين، سلمت شركة باور تشاينا بنجاح الدفعة الأولى من المدارس النموذجية في عدة محافظات عراقية. تم بناء المدارس وفقاً لمعايير الاستدامة الإنشائية، وتتميز كل مدرسة بشبكات طاقة شمسية مستقلة، ومختبرات حاسوب رقمية متطورة، ومجمعات رياضية متعددة الاستخدامات. وأكدت وزارة التربية العراقية أن هذه المدارس ستستوعب أكثر من 50,000 طالب محلي بدءاً من هذا العام الدراسي.'
              },
              {
                lang: 'zh',
                title: '中国电建正式交付伊拉克省份首批1000所示范性智能学校',
                excerpt: '教育与民生：配备现代化太阳能微电网和高科技运动设施的新型校舍正式移交给伊拉克教育部，可容纳5万多名本地学生就读。',
                content: '巴格达教育部快讯 — 根据中伊双边框架协议，中国电建（PowerChina）已在伊拉克多个省份成功交付了首批示范性学校。这些学校的建设秉承了可持续发展的建筑理念，每所校园都配备了独立的高容量太阳能微电网、先进的数字计算机实验室和综合多功能运动场。伊拉克教育部证实，自本学年起，这些校区将容纳超过50,000名本地学生，展示了中伊战略伙伴关系极具实用温度的民生维度。'
              },
              {
                lang: 'ckb',
                title: 'پاوەرچاینا قۆناغی یەکەمی ١٠٠٠ قوتابخانەی مۆدێرن و زیرەک لە پارێزگاکانی عێراق ڕادەست دەکات',
                excerpt: 'ئاڵوگۆڕی پەروەردەیی: دامەزراوەی نوێی قوتابخانەکان کە تۆڕی وزەی خۆری نوێیان تێدایە بە فەرمی ڕادەستی وەزارەتی پەروەردە کران.',
                content: 'بەغدا — لە چوارچێوەی ڕێککەوتنی دوو لایەنەی عێراق و چین، کۆمپانیای پاوەرچاینا بە سەرکەوتوویی یەکەم گرووپی قوتابخانە زیرەکەکانی لە پارێزگاکانی عێراق ڕادەستکرد. ئەم قوتابخانانە بە شێوازێکی مۆدێرن و هاوچەرخ دروستکراون و وزەی خۆر بۆ دابینکردنی کارەباکەیان بەکاردەهێنرێت.'
              }
            ]
          }
        }
      });
    }

    // Article B: Ancient Heritage Pact
    const artCult3 = 'iraq-china-archeology-heritage-preservation-pact';
    if (!(await prisma.article.findUnique({ where: { slug: artCult3 } }))) {
      console.log(`📰 Seeding culture article: ${artCult3}`);
      await prisma.article.create({
        data: {
          slug: artCult3,
          authorId: author.id,
          categoryId: catCulture.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'Iraq and China Sign Ancient Heritage and Archaeological Preservation Pact',
                excerpt: 'Educational Exchange: Joint historical research teams to collaborate on restoring ancient Mesopotamian and Yellow River cultural heritage sites.',
                content: 'Babylon — The Iraqi Ministry of Culture and the National Heritage Administration of China have formalized a landmark heritage preservation pact. Under the cooperative program, specialist archaeologists from both nations will deploy advanced multi-spectral laser scanning and non-invasive soil radar to document and restore ancient historical ruins. The project will bridge academic research on the ancient civilizations of the Tigris-Euphrates and Yellow River basins, fostering deep cultural understanding and joint tourism exhibitions.'
              },
              {
                lang: 'ar',
                title: 'العراق والصين يوقعان اتفاقية لحماية التراث الآثاري والحفاظ على الآثار القديمة',
                excerpt: 'التبادل التعليمي: فرق البحث التاريخي المشتركة تتعاون لإعادة ترميم مواقع التراث الرافديني والصيني القديم.',
                content: 'بابل — أبرمت وزارة الثقافة والسياحة والآثار العراقية مع الهيئة الوطنية للتراث الثقافي بالصين اتفاقية حماية تاريخية للتراث المشترك. وبموجب البرنامج التعاوني، سيوظف علماء آثار متخصصون من كلا البلدين تقنيات مسح ليزري متطورة وأجهزة رادار أرضية غير اختراقية لتوثيق وترميم الأنقاض التاريخية القديمة. وسيربط المشروع الأبحاث الأكاديمية حول الحضارات القديمة لحوض دجلة والفرات والنهر الأصفر.'
              },
              {
                lang: 'zh',
                title: '中伊签署关于加强古代两河流域与黄河流域历史遗迹考古保护战略协定',
                excerpt: '文化与教育：联合考古团队将利用新一代透地雷达及高精度激光扫描仪共同对古巴比伦及两河文化遗址实施精细化文档化与修复。',
                content: '巴比伦 — 伊拉克文化与旅游部同中国国家文物局正式签署了一项划时代的古代历史文化遗产保护双边战略协作协定。在此框架下，来自中国社会科学院及伊拉克各学术机构的联合专家组，将率先应用先进的多光谱三维激光扫描和非接触式透地物理雷达，对巴比伦及周边历史核心遗存实施数字化精确建档与无损安全修复。该项目致力于通过对比研究两河流域文明（美索不达米亚）与黄河流域中华古文明的共性规律。'
              },
              {
                lang: 'ckb',
                title: 'عێراق و چین ڕێککەوتنامەی پاراستنی شوێنەوارە دێرینەکان واژۆ دەکەن',
                excerpt: 'ئاڵوگۆڕی ڕۆشنبیری: تیمە هاوبەشەکانی شوێنەوارناسی کار دەکەن لەسەر نۆژەنکردنەوەی شوێنەوارە مێژووییەکانی میزۆپۆتامیا و چین.',
                content: 'بابل — وەزارەتی ڕۆشنبیری عێراق بە فەرمی لەگەڵ دەستەی شوێنەواری چین ڕێککەوتنێکی نوێی مێژوویی واژۆکرد بۆ بەکارهێنانی تەکنەلۆژیای پێشکەوتووی لێزەر بۆ سکانکردن و نۆژەنکردنەوەی شوێنەوارە دێرینەکانی بابلی کۆن.'
              }
            ]
          }
        }
      });
    }

    // ==========================================
    // 7. OPINION ARTICLES
    // ==========================================

    // Article A: Beyond Black Gold
    const artOp1 = 'opinion-beyond-black-gold-iraq-china-sustainable-future';
    if (!(await prisma.article.findUnique({ where: { slug: artOp1 } }))) {
      console.log(`📰 Seeding opinion article: ${artOp1}`);
      await prisma.article.create({
        data: {
          slug: artOp1,
          authorId: author.id,
          categoryId: catOpinion.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'Beyond Black Gold: How Iraq-China Cooperation Can Unlock a Sustainable Post-Oil Era',
                excerpt: 'Editorials & Voices: A deep analysis of how bilateral technology transfer can assist Iraq in diversifying its economy away from petroleum dependencies.',
                content: 'Baghdad — For decades, the Iraq-China relationship has been viewed through the narrow lens of crude oil exports. However, as the global energy landscape undergoes a rapid green transition, both nations must look beyond black gold. By leveraging Chinese expertise in photovoltaic microgrids, dry-land agriculture, and digital infrastructure, Iraq can lay the foundation for a sustainable, resilient post-oil economy. True strategic partnership lies not in the extraction of raw materials, but in the reciprocal transfer of technology and human capital.'
              },
              {
                lang: 'ar',
                title: 'ما بعد الذهب الأسود: كيف يمكن للتعاون العراقي الصيني أن يفتح حقبة مستدامة لما بعد النفط',
                excerpt: 'الافتتاحيات والأصوات: تحليل عميق لكيفية مساعدة نقل التكنولوجيا الثنائية للعراق في تنويع اقتصاده بعيداً عن الاعتماد على النفط.',
                content: 'بغداد — لعقود من الزمن، نُظر إلى العلاقة العراقية الصينية من خلال المنظور الضيق لصادرات النفط الخام. ومع ذلك، مع مرور مشهد الطاقة العالمي بتحول أخضر سريع، يجب على كلا البلدين التطلع إلى ما بعد الذهب الأسود. ومن خلال الاستفادة من الخبرة الصينية في شبكات الخلايا الكهروضوئية الصغيرة، والزراعة في الأراضي الجافة، والبنية التحتية الرقمية، يستطيع العراق وضع الأساس لاقتصاد مستدام ومرن لما بعد النفط.'
              },
              {
                lang: 'zh',
                title: '超越黑金：中伊战略合作如何解锁可持续发展的后石油时代',
                excerpt: '社论与声音：深度剖析双边技术转移如何切实协助伊拉克实现经济结构去石油化与多元化转型。',
                content: '巴格达 — 长期以来，中伊双边合作常被等同于单纯的原油进出口。然而在全球能源格局正经历绿色转型升级的当下，两国目光应当更加长远。通过全面引入中方在光伏微电网、旱地滴灌农业及现代数字化基建方面的成熟技术，伊拉克完全有能力为其后石油时代的多元化经济布局打下坚实基础。真正的战略级合作从不在于对地下资源的索取，而在于技术和高素质人才的互惠转移与长效培养。'
              },
              {
                lang: 'ckb',
                title: 'لە دەرەوەی زێڕی ڕەش: چۆن هاوکاری عێراق و چین دەتوانێت سەردەمێکی نوێ و بەردەوام دوای نەوت دابین بکات',
                excerpt: 'بیروڕا: شرۆڤەیەکی قووڵ لەسەر چۆنیەتی هاوکاریکردنی عێراق بۆ هەمەجۆرکردنی ئابوورییەکەی لە دەرەوەی نەوت.',
                content: 'بەغدا — بۆ چەندین ساڵە، پەیوەندی نێوان عێراق و چین لە ڕێگەی هەناردەکردنی نەوتەوە بینراوە. بەڵام ئێستا پێویستە هەردوولا سەیری دەرەوەی نەوت بکەن بۆ گواستنەوەی تەکنەلۆژیا و کارهێنانی وزەی خۆر.'
              }
            ]
          }
        }
      });
    }

    // Article B: Cultural Bridges
    const artOp2 = 'opinion-new-renaissance-on-tigris-cultural-alliances';
    if (!(await prisma.article.findUnique({ where: { slug: artOp2 } }))) {
      console.log(`📰 Seeding opinion article: ${artOp2}`);
      await prisma.article.create({
        data: {
          slug: artOp2,
          authorId: author.id,
          categoryId: catOpinion.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'A New Renaissance on the Tigris: Cultivating Long-term Cultural Bridges',
                excerpt: 'Editorials & Voices: Exploring how academic exchanges, language academies, and civil construction build mutual understanding and friendship between people.',
                content: 'Sulaymaniyah — While mega-infrastructure deals dominate front pages, the true strength of international partnerships lies in the relationships built between communities. The rising popularity of Mandarin Language academies in Sulaymaniyah, combined with trilingual vocational schools, is cultivating a new generation of bicultural leaders. These educational alliances do not just bridge language gaps; they foster mutual respect, blending the rich historical heritage of the Tigris and the Yellow River into a vibrant, cooperative future.'
              },
              {
                lang: 'ar',
                title: 'نهضة جديدة على ضفاف دجلة: زراعة جسور ثقافية طويلة الأجل',
                excerpt: 'الافتتاحيات والأصوات: استكشاف كيف يبني التبادل الأكاديمي، وأكاديميات اللغات، والبناء المدني التفهم المتبادل والصداقة بين الشعوب.',
                content: 'السليمانية — بينما تهيمن صفقات البنية التحتية الضخمة على الصفحات الأولى، فإن القوة الحقيقية للشراكات الدولية تكمن في العلاقات التي تبنى بين المجتمعات. إن الشعبية المتزايدة لأكاديميات لغة الماندرين في السليمانية، جنباً إلى جنب مع المدارس المهنية ثلاثية اللغات، تعمل على تنشئة جيل جديد من القادة ثنائيي الثقافة.'
              },
              {
                lang: 'zh',
                title: '底格里斯河畔的新文艺复兴：铺设长周期人文与文化沟通之桥',
                excerpt: '社论与声音：探讨学术交流、语言学院及民生工程如何在普通两国民众间建立深厚的信任和长远友谊。',
                content: '苏莱曼尼亚 — 尽管大型基建工程经常占据新闻头条，但国际合作最稳固的基石依然在于民间交往。苏莱曼尼亚省中文学习班的日益普及，以及各省多语种职业培训学校的建立，正在积极孕育一代兼具全球视野与本土情怀的双语青年领袖。这种教育与文化上的联盟不仅抹平了语言和地域上的阻隔，更通过将底格里斯河和黄河这两大古老文明的灿烂底蕴融汇一体，照亮了中伊合作充满活力的人文前景。'
              },
              {
                lang: 'ckb',
                title: 'ڕێنسانسێکی نوێ لەسەر دیجلە: دروستکردنی پردی ڕۆشنبیری درێژخایەن',
                excerpt: 'بیروڕا: تاوتوێکردنی چۆنیەتی کارکردنی خوێندنگا و ئەکادیمیاکانی زمان بۆ نێوان کۆمەڵگەکان.',
                content: 'سلێمانی — لە کاتێکدا گرێبەستە گەورەکانی ژێرخان گرنگی زۆریان پێ دەدرێت، هێزی ڕاستەقینەی هاوبەشی لە پەیوەندی نێوان کۆمەڵگەکان دایە. زیادبوونی خولی فێربوونی زمانی چینی لە سلێمانی دەروازەیەکی نوێیە.'
              }
            ]
          }
        }
      });
    }

    // ==========================================
    // 8. AI ARTICLES
    // ==========================================

    // Article A: Baidu Learning Labs
    const artAi1 = 'iraq-universities-integrate-baidu-ai-learning-labs';
    if (!(await prisma.article.findUnique({ where: { slug: artAi1 } }))) {
      console.log(`📰 Seeding AI article: ${artAi1}`);
      await prisma.article.create({
        data: {
          slug: artAi1,
          authorId: author.id,
          categoryId: catAi.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'Iraqi Universities Partner with Baidu to Establish Advanced AI and Machine Learning Labs',
                excerpt: 'Artificial Intelligence: Core training centers to focus on natural language processing and computer vision applications for public sector services.',
                content: 'Baghdad — Five major Iraqi universities have signed cooperation agreements with Chinese search and AI pioneer Baidu to establish advanced Machine Learning laboratories. These centers will focus on training local computer scientists in deep neural networks, computer vision, and Arabic natural language processing. The Ministry of Higher Education noted that the goal is to develop localized AI models that can optimize traffic routing in historic city centers and automate municipal public services.'
              },
              {
                lang: 'ar',
                title: 'جامعات عراقية تتعاون مع بايدو لإنشاء مختبرات متقدمة للذكاء الاصطناعي وتعلم الآلة',
                excerpt: 'الذكاء الاصطناعي: مراكز التدريب الأساسية تركز على معالجة اللغة الطبيعية وتطبيقات الرؤية الحاسوبية لخدمات القطاع العام.',
                content: 'بغداد — وقعت خمس جامعات عراقية رئيسية اتفاقيات تعاون مع شركة "بايدو" الصينية الرائدة في مجال البحث والذكاء الاصطناعي لإنشاء مختبرات متقدمة لتعلم الآلة. وستركز هذه المراكز على تدريب علماء الكمبيوتر المحليين على الشبكات العصبية العميقة، والرؤية الحاسوبية، ومعالجة اللغة العربية الطبيعية.'
              },
              {
                lang: 'zh',
                title: '伊拉克多所高校联合百度 共同设立人工智能与深度学习实验室',
                excerpt: '人工智能：核心科研训练中心将专注于自然语言处理（NLP）及计算机视觉在公共服务领域的应用与开发。',
                content: '巴格达 — 伊拉克五所核心国立大学已与中国人工智能巨头百度签署战略合作协议，共同组建高水平的机器学习与人工智能实验室。实验室将重点针对深层神经网络、机器视觉开发以及阿拉伯语自然语言处理开展基础技术人才培养。伊拉克高等教育部指出，此举旨在结合本土实际需求，研发能有效优化历史街区智能交通流引导、提升市政数字政务自动化服务水平的定制化AI大模型。'
              },
              {
                lang: 'ckb',
                title: 'زانکۆکانی عێراق لەگەڵ کۆمپانیای بایدۆ بۆ دروستکردنی تاقیگەی مۆدێرنی ژیری دەستکرد هاوبەشی دەکەن',
                excerpt: 'ژیری دەستکرد: تاقیگە نوێیەکان سەرنج دەخەنە سەر فێربوونی ئامێرەکان و دروستکردنی پڕۆگرامی مۆدێرن بۆ دامودەزگاکانی دەوڵەت.',
                content: 'بەغدا — پێنج زانکۆی سەرەکی عێراق ڕێککەوتنیان لەگەڵ کۆمپانیای بایدۆی چینی واژۆکرد بۆ دروستکردنی تاقیگەی پێشکەوتووی فێربوونی ئامێری و ژیری دەستکرد.'
              }
            ]
          }
        }
      });
    }

    // Article B: Basra Neural Mapping
    const artAi2 = 'basra-seismic-surveys-neural-network-mapping';
    if (!(await prisma.article.findUnique({ where: { slug: artAi2 } }))) {
      console.log(`📰 Seeding AI article: ${artAi2}`);
      await prisma.article.create({
        data: {
          slug: artAi2,
          authorId: author.id,
          categoryId: catAi.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'Chinese Geo-Tech Giants Deploy Neural Networks for Basra Subsurface Seismic Surveys',
                excerpt: 'Artificial Intelligence: Advanced machine learning algorithms map underground structures with high precision, minimizing experimental test drilling.',
                content: 'Basra — In a breakthrough for digital geology, Chinese petroleum engineering teams in Basra have successfully deployed advanced artificial neural networks for subsurface mapping. By processing decades of seismic soundwave data through deep-learning models, the AI can construct high-definition three-dimensional models of underground layers. This neural network mapping achieves high precision without the need for destructive exploratory drilling, drastically reducing cost and minimizing environmental impacts.'
              },
              {
                lang: 'ar',
                title: 'شركات جيوتكنولوجية صينية تنشر شبكات عصبية للمسوح الزلزالية تحت السطح في البصرة',
                excerpt: 'الذكاء الاصطناعي: خوارزميات تعلم الآلة المتقدمة ترسم خرائط للهياكل الأرضية بدقة عالية، مما يقلل من الحفر التجريبي.',
                content: 'البصرة — في طفرة نوعية للجيولوجيا الرقمية، نجحت فرق الهندسة البترولية الصينية في البصرة في نشر شبكات عصبية اصطناعية متقدمة للمسح ورسم الخرائط تحت السطح. ومن خلال معالجة عقود من بيانات الموجات الصوتية الزلزالية عبر نماذج التعلم العميق، يستطيع الذكاء الاصطناعي بناء نماذج ثلاثية الأبعاد عالية الدقة للطبقات الجوفية.'
              },
              {
                lang: 'zh',
                title: '中地质科技团队在巴士拉部署人工神经网络进行精细化地下三维地震勘探',
                excerpt: '人工智能：高阶机器学习算法对地表深层结构实施高精度还原成像，最大限度减少了试验性勘探打井。',
                content: '巴士拉 — 数字化地质勘探研究迎来重要突破。中方驻巴士拉的石油勘测工程团队成功将先进的人工神经网络（ANN）引入油气地下物理勘探中。通过将过去数十年积累的多维地震波段海量数据，输入深度学习大模型，AI能自动剔除杂波干扰并快速构建出高精度三维地层解构模型。该技术的应用使地下多介质识别精度达历史新高，彻底规避了传统高密度试验打井对地表生态的扰动，大幅降低了勘察成本。'
              },
              {
                lang: 'ckb',
                title: 'کۆمپانیا چینییەکان مۆدێلی دەماری ژیری دەستکرد بۆ ڕووپێوی بوومەلەرزەیی لە بەسرە بەکاردەهێنن',
                excerpt: 'ژیری دەستکرد: پڕۆگرامە پێشکەوتووەکان نەخشەی زەوی بە وردی دەکێشن بەبێ پێویستی بە لێدانی چاڵ لە زەویدا.',
                content: 'بەسرە — لە دەستکەوتێکی نوێی بواری جیۆلۆجی، ئەندازیارانی چین لە بەسرە بە سەرکەوتوویی تۆڕە دەمارییە دەستکردەکانیان بۆ ڕووپێوی ژێر زەوی بەکارهێنا بۆ دۆزینەوەی سەرچاوەکان.'
              }
            ]
          }
        }
      });
    }

    // ==========================================
    // 9. FOOD & BEVERAGE ARTICLES
    // ==========================================

    // Article A: Date Palm Exports
    const artFood1 = 'iraq-expands-date-palm-exports-chinese-markets';
    if (!(await prisma.article.findUnique({ where: { slug: artFood1 } }))) {
      console.log(`📰 Seeding food article: ${artFood1}`);
      await prisma.article.create({
        data: {
          slug: artFood1,
          authorId: author.id,
          categoryId: catFood.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'Iraq Expands Premium Date Palm Exports to Southern Chinese Maritime Hubs',
                excerpt: 'Culinary Industry: Streamlined customs and phytosanitary clearance agreements signed in late 2025 boost agricultural trade between Basra and Shenzhen.',
                content: 'Basra — Iraqi agricultural cooperatives have secured major export channels to Southern China, under a bilateral phytosanitary clearing pact signed in late 2025. The agreement streamlines customs inspections in Shenzhen and Guangzhou ports for premium Iraqi dates, particularly the highly valued Zahdi and Hillawi varieties. Agricultural economists project that direct maritime shipping lines will double Iraq\'s fruit export revenue by 2027, providing critical financial support to traditional farmers in Southern provinces.'
              },
              {
                lang: 'ar',
                title: 'العراق يوسع صادرات التمور الفاخرة إلى المراكز البحرية في جنوب الصين',
                excerpt: 'الصناعة الغذائية:اتفاقيات التخليص الجمركي والصحي المبسطة الموقعة في أواخر عام 2025 تعزز التجارة الزراعية بين البصرة وشنتشن.',
                content: 'البصرة — نجحت الجمعيات الزراعية العراقية في تأمين قنوات تصدير رئيسية إلى جنوب الصين، بموجب اتفاقية ثنائية لتسهيل الفحوصات النباتية وقعت في أواخر عام 2025. يبسط الاتفاق عمليات التفتيش الجمركي في موانئ شنتشن وغوانغتشو للتمور العراقية الممتازة، لا سيما صنف "الزهدي" و"الحلاوي". ويتوقع خبراء الاقتصاد الزراعي أن تضاعف خطوط الشحن البحري المباشرة إيرادات تصدير الفاكهة في العراق بحلول عام 2027.'
              },
              {
                lang: 'zh',
                title: '伊拉克扩大对华高端椰枣出口 直达中国南部沿海各大港口',
                excerpt: '餐饮与农业：2025年底签署的双边植物检疫简化协定极大便利了巴士拉至深圳、广州的椰枣海运贸易通道。',
                content: '巴士拉 — 依托2025底签署的双边植物健康检疫互认与通关便利化协定，伊拉克多家农业合作社已成功锁定了销往中国华南地区的大宗出口渠道。根据该协议，伊拉克出产的优质椰枣（特别是享誉海外的“扎赫迪”与“希拉维”品种）在深圳和广州口岸通关时，将享受绿色检疫通道和全流程快速放行。农业经济学家预测，直航海运线的开辟将在2027年前使伊拉克椰枣出口额翻番，从而使广大南部省份的手工椰枣农户切实增收。'
              },
              {
                lang: 'ckb',
                title: 'عێراق هەناردەکردنی خورمای نایاب بۆ بەندەرەکانی باشووری چین زیاد دەکات',
                excerpt: 'پیشەسازی خۆراک: ڕێککەوتنی ئاسانکاری گومرگی لە ساڵی ٢٠٢٥ وا دەکات بازرگانی کشتوکاڵی بەسرە و شینژن بەهێزتر بێت.',
                content: 'بەسرە — کۆمەڵە کشتوکاڵییەکانی عێراق توانیان کەناڵی گرنگ بۆ هەناردەکردنی خورما بۆ باشووری چین بەدەستبهێنن بەپێی ڕێککەوتنێکی نوێی گومرگی.'
              }
            ]
          }
        }
      });
    }

    // Article B: Tea Supplier Base
    const artFood2 = 'chinese-jasmine-tea-suppliers-baghdad-commercial-base';
    if (!(await prisma.article.findUnique({ where: { slug: artFood2 } }))) {
      console.log(`📰 Seeding food article: ${artFood2}`);
      await prisma.article.create({
        data: {
          slug: artFood2,
          authorId: author.id,
          categoryId: catFood.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'Chinese Jasmine and Green Tea Suppliers Establish First Commercial Base in Baghdad',
                excerpt: 'Culinary Industry: Customized tea blends designed for Middle Eastern palates find high demand as cultural tastes and food pairings converge.',
                content: 'Baghdad — High-quality Chinese tea suppliers have officially established a regional distribution center in Baghdad\'s historic commercial district. Recognizing the deep tea-drinking culture of Iraq, Chinese blenders have developed specialized jasmine and roasted green tea varieties tailored to Middle Eastern preferences. The distribution hub will supply local cafes and traditional souks, hosting cultural brewing workshops that showcase the shared heritage of tea-drinking along the ancient Silk Road.'
              },
              {
                lang: 'ar',
                title: 'موردو الشاي الياسمين والأخضر الصيني ينشئون أول قاعدة تجارية لهم في بغداد',
                excerpt: 'الصناعة الغذائية: خلطات الشاي المخصصة للمذاق الشرق أوسطي تجد طلباً متزايداً مع تقارب الأذواق الثقافية والمأكولات.',
                content: 'بغداد — افتتح موردو الشاي الصيني عالي الجودة مركز توزيع إقليمي في المنطقة التجارية التاريخية ببغداد. وتقديراً لثقافة شرب الشاي العميقة في العراق، طور صانعو الشاي الصينيون أصنافاً متخصصة من شاي الياسمين والشاي الأخضر المحمص المصممة خصيصاً لتناسب تفضيلات المستهلكين في الشرق الأوسط. وسيقوم هذا المركز بإمداد المقاهي المحلية والأسواق التقليدية.'
              },
              {
                lang: 'zh',
                title: '中国茉莉花及绿茶供应商在巴格达设立首个大宗茶叶商贸基地',
                excerpt: '餐饮与农业：针对中东民众饮茶习惯定制改良的拼配茶在巴格达市场热销，拉动两国饮食文化交融。',
                content: '巴格达 — 伴随着中东茶叶消费市场的蓬勃增长，数家高品质中国绿茶及花茶出口商已在巴格达历史悠久的商贸街区正式设立了区域直销与配送中心。考虑到伊拉克民众根深蒂固的高浓度饮茶习惯，中国拼配大师对出海的茉莉花茶和浓香型熟绿茶进行了适口性技术调整，使其香气更浓郁且不易苦涩。该集散基地将直接为巴格达大小咖啡馆和传统老巴扎直供货源。'
              },
              {
                lang: 'ckb',
                title: 'مۆڵەتنامەی یەکەم بنکەی بازرگانی چای چینی لە بەغدا ڕادەگەیەنرێت',
                excerpt: 'پیشەسازی خۆراک: هێنانی جۆرە جیاوازەکانی چای یاسمین و چای سەوزی چینی بۆ بازاڕەکانی بەغدا.',
                content: 'بەغدا — گەورە دابینکەرانی چای چینی بە فەرمی سەنتەرێکی گەورەی دابەشکردنی چایان لە گەڕەکە کۆن و بازرگانییەکانی بەغدا کردەوە بۆ دابینکردنی چای یاسمینی نایاب.'
              }
            ]
          }
        }
      });
    }

    // ==========================================
    // 10. EXPO ARTICLES
    // ==========================================

    // Article A: Basra Expo 2026
    const artExp1 = 'basra-china-iraq-trade-expo-2026-opens';
    if (!(await prisma.article.findUnique({ where: { slug: artExp1 } }))) {
      console.log(`📰 Seeding expo article: ${artExp1}`);
      await prisma.article.create({
        data: {
          slug: artExp1,
          authorId: author.id,
          categoryId: catExpo.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: '2026 China-Iraq Business and Trade Expo Opens in Basra with 150+ Technical Exhibitors',
                excerpt: 'Trade Fairs: The annual industrial showcase centers on solar panels, water purification systems, and heavy construction equipment.',
                content: 'Basra — The highly anticipated 2026 China-Iraq Business and Trade Expo has opened its doors in Basra. This year\'s event features over 150 leading Chinese manufacturing and technology corporations presenting state-of-the-art solutions. Key exhibits include high-efficiency solar microgrids, advanced reverse-osmosis water purification systems, and heavy-duty urban excavation equipment. Organizing committees anticipate the three-day exhibition will generate over $250 million in direct commercial contracts and joint-venture declarations.'
              },
              {
                lang: 'ar',
                title: 'افتتاح معرض الصين والعراق للأعمال والتجارة لعام 2026 في البصرة بمشاركة أكثر من 150 عارضاً',
                excerpt: 'المعارض التجارية: يركز المعرض الصناعي السنوي على الألواح الشمسية، وأنظمة تنقية المياه، ومعدات البناء الثقيلة.',
                content: 'البصرة — فتح معرض الصين والعراق للأعمال والتجارة لعام 2026 المرتقب أبوابه في البصرة. ويضم حدث هذا العام أكثر من 150 شركة تصنيع وتكنولوجيا صينية رائدة تعرض أحدث الحلول والابتكارات. وتشمل المعروضات الرئيسية الشبكات الشمسية الصغيرة عالية الكفاءة، وأنظمة تنقية المياه بالتبادل الأسموزي العكسي المتقدمة، ومعدات الحفر الثقيلة للمدن.'
              },
              {
                lang: 'zh',
                title: '2026年中伊双边商贸与工业装备博览会在巴士拉隆重开幕',
                excerpt: '展会动态：年度工业大展聚焦分布式光伏微电网、工业级反渗透水处理设备及重型城市挖掘工程机械。',
                content: '巴士拉 — 备受瞩目的“2026年中伊双边商贸与工业装备博览会”在南部核心工业城市巴士拉正式拉开帷幕。本届博览会吸引了超过150家来自中国制造及高新技术领域的骨干企业参展。现场核心展品涵盖了新一代高转化率太阳能微网、大型反渗透苦咸水淡化净化系统、以及适合中东恶劣地貌的重载市政工程施工机械。'
              },
              {
                lang: 'ckb',
                title: 'پێشانگای بازرگانی چین و عێراق ٢٠٢٦ لە بەسرە بە بەشداری پتر لە ١٥٠ کۆمپانیا دەست پێدەکات',
                excerpt: 'پیشانگای بازرگانی: چالاکییە نوێیەکان دەری دەخەن چۆن داهێنانی نوێ بۆ کەلوپەلی کارەبایی و ئاو دابین دەکرێت.',
                content: 'بەسرە — پێشانگای زۆر چاوەڕوانکراوی بازرگانی نێوان چین و عێراق بۆ ساڵی ٢٠٢٦ بە فەرمی لە بەسرە کرایەوە بە بەشداری ١٥٠ کۆمپانیای گەورەی پیشەسازی.'
              }
            ]
          }
        }
      });
    }

    // Article B: Canton Fair
    const artExp2 = 'iraqi-business-delegation-secures-agreements-canton-fair';
    if (!(await prisma.article.findUnique({ where: { slug: artExp2 } }))) {
      console.log(`📰 Seeding expo article: ${artExp2}`);
      await prisma.article.create({
        data: {
          slug: artExp2,
          authorId: author.id,
          categoryId: catExpo.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'Iraqi Trade Delegation Secures $420M in Purchase Agreements at 139th Canton Fair',
                excerpt: 'Trade Fairs: Private sector buyers finalize procurement of electrical goods and renewable energy components in Guangzhou.',
                content: 'Guangzhou — A large delegation of Iraqi private sector importers has successfully concluded negotiations at the 139th Canton Fair in Guangzhou, securing $420 million in purchasing agreements. The procurement contracts focus heavily on modern household appliances, high-grade electrical distribution gear, and solar photovoltaic hardware. Industry leaders noted that direct bank-to-bank settlements in Chinese Yuan greatly accelerated transactions, reducing currency exchange risks for Iraqi traders.'
              },
              {
                lang: 'ar',
                title: 'وفد تجاري عراقي يضمن اتفاقيات شراء بقيمة 420 مليون دولار في معرض كانتون الـ 139',
                excerpt: 'المعارض التجارية: ينهي مشتري القطاع الخاص عقود توريد السلع الكهربائية ومكونات الطاقة المتجددة في غوانغتشو.',
                content: 'غوانغتشو — اختتم وفد كبير من مستوردي القطاع الخاص العراقي بنجاح مفاوضاتهم في معرض كانتون الـ 139 في غوانغتشو، حيث حصلوا على اتفاقيات شراء بقيمة 420 مليون دولار. وتركز عقود الشراء بشكل مكثف على الأجهزة المنزلية الحديثة، ومعدات التوزيع الكهربائي عالية الجودة، ومعدات الطاقة الشمسية الكهروضوئية.'
              },
              {
                lang: 'zh',
                title: '伊拉克采购团在第139届广交会现场签下达4.2亿美元采购订单',
                excerpt: '展会动态：大批伊拉克私营企业买家在广州完成对电力成套设备及新能源光伏硬件组件的直接签单。',
                content: '广州 — 伴随着第139届中国进出口商品交易会（广交会）在广州顺利闭幕，由百余家伊拉克民营骨干进口商组成的采购团成果丰硕，现场达成了总额约4.2亿美元的商品采购订单。本次大宗订货合同主要集中在高端智能家电、高等级工业配电箱柜、以及可满足中东极端高温工作的分布式光伏逆变组件。'
              },
              {
                lang: 'ckb',
                title: 'شاندی عێراق بە بڕی ٤٢٠ ملیۆن دۆلار ڕێککەوتن لە پێشانگای كانتۆن واژۆ دەکەن',
                excerpt: 'پیشانگای بازرگانی: بازرگانانی کەرتی تایبەتی عێراق گرێبەستی گەورەی کڕینی کەلوپەلی وزەی خۆر لە گوانگژۆ ئەنجام دەدەن.',
                content: 'گوانگژۆ — شاندێکی گەورەی بازرگانانی کەرتی تایبەتی عێراق توانیان لە ١٣٩هەمین پێشانگای نێودەوڵەتی كانتۆن لە گوانگژۆ، بە بڕی ٤٢٠ ملیۆن دۆلار گرێبەستی کڕین واژۆ بکەن.'
              }
            ]
          }
        }
      });
    }

    // ==========================================
    // 11. BUSINESS STATISTICS ARTICLES
    // ==========================================

    // Article A: Bilateral Trade Volume
    const artStat1 = 'china-iraq-bilateral-trade-volume-record-2025';
    if (!(await prisma.article.findUnique({ where: { slug: artStat1 } }))) {
      console.log(`📰 Seeding statistics article: ${artStat1}`);
      await prisma.article.create({
        data: {
          slug: artStat1,
          authorId: author.id,
          categoryId: catStats.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'China-Iraq Bilateral Trade Volume Reaches Record $53 Billion in Fiscal Year 2025',
                excerpt: 'Market Data: Detailed customs data shows a 14% increase in non-oil trade, driven by machinery imports and consumer electronics.',
                content: 'Beijing/Baghdad — Custom statistics released by bilateral trade ministries confirm that trade volume between China and Iraq hit a record $53 billion in the fiscal year 2025. While crude oil exports still comprise a significant portion of the value, non-oil commerce grew by a robust 14%. This diversification was driven by massive Iraqi procurement of heavy industrial cranes, precision telecoms hardware, and consumer electronics, cementing China\'s position as Iraq\'s largest trading partner.'
              },
              {
                lang: 'ar',
                title: 'حجم التبادل التجاري الثنائي بين الصين والعراق يبلغ رقماً قياسياً قدره 53 مليار دولار في 2025',
                excerpt: 'بيانات السوق: تظهر بيانات الجمارك التفصيلية زيادة بنسبة 14٪ في التجارة غير النفطية، مدفوعة بطلب الآلات الثقيلة والإلكترونيات.',
                content: 'بكين/بغداد — أكدت الإحصاءات الجمركية الرسمية الصادرة عن وزارات التجارة في كلا البلدين أن حجم التبادل التجاري الثنائي بين الصين والعراق وصل إلى مستوى قياسي بلغ 53 مليار دولار في السنة المالية 2025. وبينما لا تزال صادرات النفط الخام تشكل حصة كبيرة من القيمة الإجمالية، نمت التجارة غير النفطية بنسبة قوية بلغت 14٪.'
              },
              {
                lang: 'zh',
                title: '2025财政年度中伊双边贸易总额突破530亿美元创历史新高',
                excerpt: '市场数据：海关明细数据显示，以机械设备和数码消费电子为主的非油类贸易比重大幅上升14%。',
                content: '北京/巴格达 — 两国商务部门联合公布的最新海关统计数据显示，中伊两国双边贸易总额在2025财政年度冲上530亿美元历史新高。尽管原油采买仍占交易总货值的主导地位，但非油类商品双向贸易额逆势上涨了14%。这一结构性改善主要受益于伊拉克国内对重型工程门吊、高精密光纤网关及智能消费电子设备的强劲采购。'
              },
              {
                lang: 'ckb',
                title: 'قەبارەی بازرگانی دوولایەنەی نێوان چین و عێراق گەیشتە ڕیکۆردی نوێی ٥٣ ملیار دۆلار لە ٢٠٢٥',
                excerpt: 'ئامارەکانی بازاڕ: داتا نوێیەکان نیشان دەدەن بازرگانی دەرەوەی نەوت بە ڕێژەی ١٤٪ بەرز بووەتەوە بەهۆی هێنانی کەلوپەلی قورس.',
                content: 'بەکین/بەغدا — داتا فەرمییەکانی گومرگ پشتڕاستی دەکەنەوە کە قەبارەی بازرگانی نێوان چین و عێراق لە ساڵی ٢٠٢٥ گەیشتووەتە ٥٣ ملیار دۆلار، کە پێگەی چین وەک گەورەترین شەریکی بازرگانی عێراق جێگیر دەکات.'
              }
            ]
          }
        }
      });
    }

    // Article B: Basra Port Authority
    const artStat2 = 'basra-shipping-data-q1-2026-chinese-cargo-surge';
    if (!(await prisma.article.findUnique({ where: { slug: artStat2 } }))) {
      console.log(`📰 Seeding statistics article: ${artStat2}`);
      await prisma.article.create({
        data: {
          slug: artStat2,
          authorId: author.id,
          categoryId: catStats.id,
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop',
          translations: {
            create: [
              {
                lang: 'en',
                title: 'Basra Port Authority Q1 2026 Data: Container Cargo Arrivals from China Surge 22%',
                excerpt: 'Market Data: High-volume shipping manifests highlight steady inflows of industrial steel, modular housing components, and agricultural machines.',
                content: 'Basra — The Basra Port Authority has released its official trade performance report for the first quarter of 2026. The data highlights a remarkable 22% increase in containerized cargo arrivals from major Chinese shipping lines compared to the same period in 2025. High-volume manifests reveal that inflows consist primarily of structural industrial steel, pre-fabricated modular housing panels, and high-precision agricultural sowing machinery, reflecting a major construction boom in Iraq\'s southern regions.'
              },
              {
                lang: 'ar',
                title: 'بيانات موانئ البصرة للربع الأول من 2026: شحنات الحاويات الصينية تقفز بنسبة 22٪',
                excerpt: 'بيانات السوق: تسلط بيانات الشحن الضوء على تدفقات مستمرة من الفولاذ الصناعي ومكونات المباني الجاهزة والآلات الزراعية.',
                content: 'البصرة — أصدرت سلطة موانئ البصرة تقريرها الرسمي لأداء التجارة للربع الأول من عام 2026. وتسلط البيانات الضوء على زيادة ملحوظة بنسبة 22٪ في وصول شحنات الحاويات من خطوط الشحن الصينية الكبرى مقارنة بالفترة نفسها من عام 2025. وتكشف بيانات الشحن أن الواردات تتكون أساساً من الفولاذ الإنشائي الصناعي، وألواح الإسكان الجاهزة، وآلات البذر الزراعي عالية الدقة.'
              },
              {
                lang: 'zh',
                title: '巴士拉港口局2026年首季度报告：自华到港集装箱大货量激增22%',
                excerpt: '市场数据：高密度货运提单显示，建筑钢结构、预制板及现代农机具源源不断输入伊拉克各港口。',
                content: '巴士拉 — 巴士拉港口局发布了2026年第一季度官方贸易进出口运营报告。数据显示，自华到港集装箱重载运量较2025年同期大幅激增了22%。海关高密度提单明细指出，到港货物品类高度集中于工业用热轧型钢材、拼装式模块化房屋围护预制板、以及多功能精密农业大田整地播种机。'
              },
              {
                lang: 'ckb',
                title: 'ئاماری بەندەرەکانی بەسرە لە چارەکی یەکەمی ٢٠٢٦: بارگرانی کەشتییە چینییەکان ٢٢٪ زیادی کردووە',
                excerpt: 'ئامارەکانی بازاڕ: داتاکان نیشان دەدەن هاتنی شیشی پیشەسازی و پارچەی تەلاری جاهیز و ئامێری کشتوکاڵی بەردەوامە.',
                content: 'بەسرە — بەڕێوەبەرایەتی بەندەرەکانی بەسرە ڕاپۆرتی فەرمی خۆی بۆ چارەکی یەکەمی ٢٠٢٦ بڵاوکردەوە، کە نیشانی دەدات هاتنی کۆنتێنەری کەلوپەلی پیشەسازی بە ڕێژەی ٢٢٪ بەراورد بە ساڵی ڕابردوو زیادی کردووە.'
              }
            ]
          }
        }
      });
    }

    console.log('✅ Additional news logs verified & seeded successfully.');
  } catch (e) {
    console.error('❌ Failed to seed additional news logs:', e);
  }
}
