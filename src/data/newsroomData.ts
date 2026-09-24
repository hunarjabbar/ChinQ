import { NewsroomArticle, NewsroomCategory, NewsroomAuthor, NewsroomTag } from '../types/newsroom';

export const newsroomCategories: NewsroomCategory[] = [
  {
    id: 'cat-bilateral',
    slug: 'bilateral',
    name: {
      en: 'Bilateral Projects',
      ar: 'المشاريع الثنائية',
      zh: '双边合作项目',
      ckb: 'پڕۆژە دوولایەنەکان',
    },
    description: {
      en: 'High-level joint commission projects and sovereign bilateral developments.',
      ar: 'مشاريع اللجنة المشتركة رفيعة المستوى والتطورات السيادية الثنائية.',
      zh: '高层联合委员会项目及主权级双边经贸发展。',
      ckb: 'پڕۆژەکانی لێژنەی باڵای هاوبەش و پێشکەوتنە سەروەرییە دوولایەنەکان.',
    },
    displayOrder: 1,
    status: 'active',
  },
  {
    id: 'cat-energy',
    slug: 'energy',
    name: {
      en: 'Energy & Infrastructure',
      ar: 'الطاقة والبنية التحتية',
      zh: '能源与重大基建',
      ckb: 'وزە و ژێرخانی ستراتیژی',
    },
    description: {
      en: 'Upstream oil & gas, grid modernization, and solar civil engineering.',
      ar: 'قطاع النفط والغاز، تحديث شبكات الطاقة والهندسة المدنية الشمسية.',
      zh: '油气上游开发、电网现代化改造及光伏土木工程。',
      ckb: 'کەرتی نەوت و گاز، نوێکردنەوەی تۆڕی کارەبا و ئەندازیاری مەدەنی تیشکی خۆر.',
    },
    displayOrder: 2,
    status: 'active',
  },
  {
    id: 'cat-bri',
    slug: 'bri',
    name: {
      en: 'Belt & Road Initiative',
      ar: 'مبادرة الحزام والطريق',
      zh: '一带一路倡议',
      ckb: 'دەستپێشخەریی پشتێن و ڕێگە',
    },
    description: {
      en: 'Strategic connectivity corridors, port logistics, and rail links.',
      ar: 'ممرات الربط الاستراتيجي، لوجستيات الموانئ وشبكات السكك الحديدية.',
      zh: '战略互联互通走廊、港口物流网络与铁路干线。',
      ckb: 'ڕێڕەوە ستراتیژییەکانی بەستنەوە، لۆجستی مەرز و بەندەرەکان و هێڵی ئاسن.',
    },
    displayOrder: 3,
    status: 'active',
  },
  {
    id: 'cat-finance',
    slug: 'finance',
    name: {
      en: 'Finance & Settlement',
      ar: 'المالية والتسوية النقدية',
      zh: '金融结算与本币互换',
      ckb: 'دارایی و پاکتاوی نەختینەیی',
    },
    description: {
      en: 'Direct IQD/RMB clearing, central bank mechanisms, and trade finance.',
      ar: 'المقاصة المباشرة بين الدينار واليوان، آليات البنوك المركزية وتمويل التجارة.',
      zh: '伊拉克第纳尔与人民币直接清算机制及跨境贸易融资。',
      ckb: 'پاکتاوی ڕاستەوخۆی دینار و یوان، میکانیزمەکانی بانکی ناوەندی و دارایی بازرگانی.',
    },
    displayOrder: 4,
    status: 'active',
  },
  {
    id: 'cat-diplomacy',
    slug: 'diplomacy',
    name: {
      en: 'Diplomacy & Culture',
      ar: 'الدبلوماسية والتبادل الثقافي',
      zh: '外交与人文交流',
      ckb: 'دیپلۆماسی و ئاڵوگۆڕی کەلتووری',
    },
    description: {
      en: 'Consular treaties, academic exchanges, and multilateral summits.',
      ar: 'المعاهدات القنصلية، التبادلات الأكاديمية والقمم متعددة الأطراف.',
      zh: '领事协定、学术交流与多边经济峰会。',
      ckb: 'پەیماننامە کونسوڵگەرییەکان، ئاڵوگۆڕی ئەکادیمی و کۆڕبەندە فرەلایەنەکان.',
    },
    displayOrder: 5,
    status: 'active',
  },
];

export const newsroomAuthors: NewsroomAuthor[] = [
  {
    id: 'author-tariq',
    slug: 'tariq-al-hashimi',
    name: {
      en: 'Dr. Tariq Al-Hashimi',
      ar: 'د. طارق الهاشمي',
      zh: '塔里克·哈希米 博士',
      ckb: 'د. تاریق هاشمی',
    },
    title: {
      en: 'Senior Geopolitical Fellow, CISE',
      ar: 'زميل أول للدراسات الجيوسياسية، معهد CISE',
      zh: 'CISE 资深地缘战略研究员',
      ckb: 'توێژەری باڵای جیۆپۆلەتیکی لە پەیمانگای CISE',
    },
    bio: {
      en: 'Specializing in sovereign energy security and China-Middle East macroeconomic integration.',
      ar: 'متخصص في أمن الطاقة السيادي والتكامل الاقتصادي الكلي بين الصين والشرق الأوسط.',
      zh: '专注于国家主权能源安全战略及中国—中东宏观经济深度一体化研究。',
      ckb: 'شارەزای ئاسایشی سەروەری وزە و تەواوکاری ئابووریی نێوان چین و ڕۆژهەڵاتی ناوەڕاست.',
    },
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    publicLinks: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
    status: 'active',
  },
  {
    id: 'author-zhang',
    slug: 'zhang-wei',
    name: {
      en: 'Zhang Wei',
      ar: 'تشانغ وي',
      zh: '张伟',
      ckb: 'ژانگ وێی',
    },
    title: {
      en: 'Bilateral Macroeconomics Lead, Beijing Desk',
      ar: 'رئيس وحدة الاقتصاد الكلي الثنائي، مكتب بكين',
      zh: '北京分部双边宏观经济研究总监',
      ckb: 'سەرپەرشتیاری ئابووریی ماکرۆی دوولایەنە، نووسینگەی پەکین',
    },
    bio: {
      en: 'Former financial policy researcher tracking cross-border currency clearing frameworks.',
      ar: 'باحث سياسات مالية سابق يتابع أطر المقاصة النقدية والمدفوعات عبر الحدود.',
      zh: '前金融政策分析学者，长期跟进跨境人民币清算通道与央行政策协同。',
      ckb: 'توێژەری پێشووی سیاسەتی دارایی کە چاودێری چوارچێوەکانی پاکتاوی دراوی سنووربەزێن دەکات.',
    },
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    publicLinks: {
      linkedin: 'https://linkedin.com',
      weibo: 'https://weibo.com',
    },
    status: 'active',
  },
  {
    id: 'author-rebin',
    slug: 'rebin-star',
    name: {
      en: 'Rebin Star',
      ar: 'ريبين ستار',
      zh: '雷宾·斯塔尔',
      ckb: 'ڕێبین ستار',
    },
    title: {
      en: 'Kurdistan Regional Infrastructure Analyst, Sulaymaniyah Desk',
      ar: 'محلل البنية التحتية لإقليم كردستان، مكتب السليمانية',
      zh: '苏莱曼尼亚分部库尔德地区基建分析师',
      ckb: 'شیکارکاری ژێرخانی هەرێمی کوردستان، نووسینگەی سلێمانی',
    },
    bio: {
      en: 'Focusing on logistics nodes, industrial zones, and manufacturing joint ventures.',
      ar: 'يركز على العقد اللوجستية والمناطق الصناعية والمشاريع التصنيعية المشتركة.',
      zh: '重点关注物流枢纽节点、工业特区规划及高端制造联合投资实体。',
      ckb: 'تەرکیز دەکاتە سەر گرێکوێرە لۆجستییەکان، ناوچە پیشەسازییەکان و پڕۆژە هاوبەشەکانی دروستکردن.',
    },
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    status: 'active',
  },
];

export const newsroomTags: NewsroomTag[] = [
  {
    id: 'tag-currency',
    slug: 'currency-clearing',
    name: { en: 'Currency Clearing', ar: 'المقاصة النقدية', zh: '货币清算', ckb: 'پاکتاوی دراو' },
    status: 'active',
  },
  {
    id: 'tag-infrastructure',
    slug: 'infrastructure',
    name: { en: 'Infrastructure', ar: 'البنية التحتية', zh: '基础设施', ckb: 'ژێرخان' },
    status: 'active',
  },
  {
    id: 'tag-bri',
    slug: 'belt-and-road',
    name: { en: 'Belt & Road', ar: 'الحزام والطريق', zh: '一带一路', ckb: 'پشتێن و ڕێگە' },
    status: 'active',
  },
  {
    id: 'tag-trade',
    slug: 'trade-policy',
    name: { en: 'Trade Policy', ar: 'السياسة التجارية', zh: '经贸政策', ckb: 'سیاسەتی بازرگانی' },
    status: 'active',
  },
  {
    id: 'tag-technology',
    slug: 'technology',
    name: { en: 'Technology Transfer', ar: 'نقل التكنولوجيا', zh: '技术转移', ckb: 'گواستنەوەی تەکنەلۆژیا' },
    status: 'active',
  },
];

export const newsroomArticles: NewsroomArticle[] = [
  {
    id: 'art-01',
    slug: 'cbi-pboc-direct-currency-clearing-commences',
    title: {
      en: 'Historic Direct Currency Clearing Commences Between Central Bank of Iraq and PBOC',
      ar: 'بدء المقاصة النقدية المباشرة التاريخية بين البنك المركزي العراقي وبنك الشعب الصيني',
      zh: '伊拉克央行与中国人民银行正式启动历史性双边本币直接清算结算体系',
      ckb: 'دەستپێکردنی مێژوویی پاکتاوی ڕاستەوخۆی دراو لە نێوان بانکی ناوەندی عێراق و بانکی گەلی چین',
    },
    subtitle: {
      en: 'New operational framework eliminates intermediate dollar conversion fees and safeguards commercial trade flows.',
      ar: 'إطار تشغيلي جديد يلغي رسوم تحويل الدولار الوسيط ويحمي التدفقات التجارية المشتركة.',
      zh: '全新主权清算框架全面消除第三方美元中转损耗与汇率滑点，全方位保障双边贸易资金链。',
      ckb: 'چوارچێوەیەکی نوێی کارکردن خەرجی گۆڕینەوەی دۆلاری ناوبژیوان ناهێڵێت و بازرگانی دەپارێزێت.',
    },
    excerpt: {
      en: 'The Central Bank of Iraq (CBI) and the People’s Bank of China (PBOC) have activated the sovereign IQD-RMB bilateral clearing window, enabling certified commercial banking partners to execute instant settlements.',
      ar: 'أعلن البنك المركزي العراقي وبنك الشعب الصيني تفعيل نافذة المقاصة الثنائية السيادية بين الدينار واليوان، مما يتيح للبنوك المعتمدة تنفيذ التسويات الفورية المباشرة.',
      zh: '伊拉克中央银行（CBI）与中国人民银行（PBOC）联合宣布启动第纳尔与人民币双边直接清算专用通道，授权合规商业银行即时完成跨境贸易结算。',
      ckb: 'بانکی ناوەندی عێراق و بانکی گەلی چین کاراکردنی پەنجەرەی فەرمی پاکتاوی دوولایەنەی دینار و یوانیان ڕاگەیاند کە توانای پاکتاوی دەستبەجێ بە بانکە باوەڕپێکراوەکان دەبەخشێت.',
    },
    body: {
      en: `The Central Bank of Iraq (CBI) and the People's Bank of China (PBOC) have officially enacted the bilateral direct currency clearing framework. Under this historic protocol, commercial importers and sovereign agencies in Baghdad, Erbil, and Beijing can settle invoice transactions directly between the Iraqi Dinar (IQD) and Chinese Renminbi (RMB), entirely bypassing third-party intermediary currencies and SWIFT intermediary surcharges.

Governor-level working sessions held simultaneously in Baghdad and Beijing established real-time automated clearing conduits via authorized custody banks. This structural transformation reduces cross-border settlement latency from five business days down to under 4 hours, generating an estimated $380M in annual frictional transaction cost savings for bilateral commercial operators.

Key Financial Protocol Milestones:
1. Designated Tier-1 clearing houses established in Baghdad and Shanghai.
2. Full regulatory compliance alignment with AML Law No. 39 of 2015 and international ISO 20022 messaging standards.
3. Daily direct parity fixing published transparently at 09:00 UTC by joint monetary authorities.
4. Liquidity backstop facilities guaranteed through sovereign foreign reserve swap lines.

Institutional market participants can now route trade transactions via the newly launched ICA Payment Settlement Portal, tracking clearance states through seven rigorous verifiable cryptographic checkpoints.`,
      ar: `دشن البنك المركزي العراقي وبنك الشعب الصيني رسمياً إطار المقاصة النقدية الثنائية المباشرة. بموجب هذا البروتوكول التاريخي، أصبح بإمكان المستوردين التجاريين والمؤسسات السيادية في بغداد وأربيل وبكين تسوية فواتير المشتريات والمعاملات مباشرة بين الدينار العراقي واليوان الصيني، دون الحاجة للمرور عبر عملات وسيطة أو تحمل رسوم التحويل الإضافية.

عقدت جلسات العمل المشتركة بين محافظي البنكين في بغداد وبكين وأرست قنوات مقاصة مؤتمتة فورية عبر مصارف الحفظ المعتمدة. يؤدي هذا التحول الهيكلي إلى تقليص زمن التسوية من خمسة أيام عمل إلى أقل من أربع ساعات، مما يوفر ما يقارب 380 مليون دولار سنوياً من الرسوم المالية للمتعاملين التجاريين.

أبرز ركائز البروتوكول المالي:
1. إنشاء غرف مقاصة معتمدة من الفئة الأولى في بغداد وشانغهاي.
2. الامتثال التام لأحكام قانون مكافحة غسل الأموال العراقي رقم 39 لسنة 2015 ومعايير ISO 20022 العالمية.
3. نشر سعر الصرف التوازني المباشر يومياً في تمام الساعة 09:00 بتوقيت غرينتش.
4. ضمان خطوط مبادلة سيولة احتياطية لحماية استقرار التدفقات النقدية.

يمكن للشركات والمصارف المعتمدة الآن إجراء المعاملات عبر بوابة تسوية المدفوعات التابعة لوكالة ICA وتتبع مراحل التحويل عبر سبع مراحل تدقيق مشفرة.`,
      zh: `伊拉克中央银行（CBI）与中国人民银行（PBOC）正式确立并实施双边本币直接清算结算全新机制。依照此项里程碑式协议，巴格达、埃尔比勒及北京两地合规进出口企业与主权实体，可直接使用伊拉克第纳尔（IQD）与中国人民币（RMB）双向结算贸易订单，彻底规避传统第三方中转货币汇率损耗与多重代理行扣费。

两国央行高级工作会议在巴格达与北京同步闭幕，确认通过两地托管清算总行建立自动化实时对账清算通道。该项重大战略举措将跨境大额贸易结算周期由原先的5个工作日大幅压缩至4小时以内，预计每年为双边工商业企业节约超过3.8亿美元资金中转摩擦成本。

本币清算核心机制要点：
1. 于巴格达和上海设立双向主权级一级清算行；
2. 全面契合伊拉克2015年第39号反洗钱法规及国际金融ISO 20022报文标准；
3. 每日格林尼治标准时间09:00准时向市场公开发布权威官方直接清算平价；
4. 依托央行双边本币互换协议提供充裕的日间流动性兜底支持。

企事业单位现可通过全新上线的ICA支付结算门户提交贸易结汇申请，并在统一追踪系统中透明核验全流程加密审计日志。`,
      ckb: `بانکی ناوەندی عێراق و بانکی گەلی چین بە فەرمی چوارچێوەی پاکتاوی نەختینەیی ڕاستەوخۆی نێوان هەردوو دراویان جێبەجێ کرد. بەپێی ئەم پرۆتۆکۆلە مێژوویە، هاوردەکارانی بازرگانی و دامەزراوە فەرمییەکان لە بەغدا، هەولێر و پەکین دەتوانن پسوولەی مامەڵەکان ڕاستەوخۆ بە دیناری عێراقی و یوانی چینی یەکلایی بکەنەوە بەبێ پێویستی بە دۆلار یان خەرجی زیادی ناوبژیوان.

کۆبوونەوە هاوبەشەکانی نێوان پارێزگارانی هەردوو بانک لە بەغدا و پەکین ڕێڕەوی ئۆتۆماتیکی پاکتاوی خێرایان لە ڕێگەی بانکە سەرەکییەکانەوە جێگیر کرد. ئەم گۆڕانکارییە کاتی پاکتاو لە ٥ ڕۆژەوە بۆ کەمتر لە ٤ کاتژمێر کەمدەکاتەوە و ساڵانە ٣٨٠ ملیۆن دۆلار بۆ کەرتی بازرگانی دەگەڕێنێتەوە.

خاڵە سەرەکییەکانی پرۆتۆکۆلەکە:
١. دامەزراندنی ژووری پاکتاوی پلە یەک لە بەغدا و شانگهای.
٢. پابەندبوونی تەواو بە یاسای ڕێگری لە سپیکردنەوەی پارە ژمارە ٣٩ی ساڵی ٢٠١٥ و پێوەرەکانی ISO 20022.
٣. ڕاگەیاندنی ڕۆژانەی نرخی فەرمی لە کاتژمێر ٠٩:٠٠ی بەیانی بە کاتی گرینویچ.
٤. دابینکردنی هێڵی یەدەگی نەختینەیی لە لایەن بانکە ناوەندییەکانەوە.

کۆمپانیا باوەڕپێکراوەکان دەتوانن لە ڕێگەی دەروازەی پاکتاوی پارەدانی ICA مامەڵەکانیان ئەنجام بدەن و بە ٧ قۆناغی پارێزراو بەدواداچوونی بۆ بکەن.`,
    },
    heroImage: {
      url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Central Bank of Iraq and PBOC monetary clearing terminal',
        ar: 'محطة المقاصة النقدية للبنك المركزي العراقي وبنك الشعب الصيني',
        zh: '伊拉克央行与中国人民银行货币清算系统控制台',
        ckb: 'ئامێری پاکتاوی نەختینەیی بانکی ناوەندی عێراق و بانکی چین',
      },
      credit: 'ICA Monetary Bureau / Baghdad Desk',
    },
    category: newsroomCategories[3],
    tags: [newsroomTags[0], newsroomTags[3]],
    author: newsroomAuthors[1],
    publishDate: '2026-09-24',
    updatedDate: '2026-09-24',
    status: 'published',
    featured: true,
    breaking: true,
    readTimeMinutes: 5,
    languageOfOrigin: 'en',
    translationStatus: { en: true, ar: true, zh: true, ckb: true },
    seo: {
      title: {
        en: 'CBI and PBOC Direct Currency Clearing Window Goes Live',
        ar: 'تفعيل نافذة المقاصة النقدية المباشرة بين البنك المركزي العراقي وبنك الشعب الصيني',
        zh: '伊拉克央行与中国人民银行直通本币清算系统正式投运',
        ckb: 'کاراکردنی پەنجەرەی پاکتاوی ڕاستەوخۆی دراوی نێوان بانکی ناوەندی عێراق و بانکی چین',
      },
      description: {
        en: 'Direct settlement between Iraqi Dinar and Chinese Yuan operationalized to cut cross-border transaction friction.',
        ar: 'بدء التسوية المباشرة بين الدينار العراقي واليوان الصيني لتقليص تكاليف التحويل التجاري.',
        zh: '伊拉克第纳尔与人民币跨境直接结算正式运行，全面降低双边贸易摩擦成本。',
        ckb: 'دەستپێکردنی پاکتاوی ڕاستەوخۆی دینار و یوان بۆ نەهێشتنی خەرجی زیادی بازرگانی.',
      },
    },
    createdBy: 'editorial-admin',
    updatedBy: 'editorial-admin',
    createdAt: '2026-09-24T00:00:00.000Z',
    updatedAt: '2026-09-24T02:00:00.000Z',
    fixture: true,
  },
  {
    id: 'art-02',
    slug: 'sulaymaniyah-corridor-infrastructure-milestone',
    title: {
      en: 'Sulaymaniyah Infrastructure Corridor Reaches 70% Completion Under Belt & Road Framework',
      ar: 'ممر البنية التحتية في السليمانية يحقق 70% نسبة إنجاز ضمن إطار الحزام والطريق',
      zh: '苏莱曼尼亚物流走廊工程完成度突破70%，一带一路区域枢纽功能初步显现',
      ckb: 'ڕێڕەوی ژێرخانی سلێمانی دەگاتە ٧٠٪ی تەواوبوون لە چوارچێوەی پشتێن و ڕێگەدا',
    },
    subtitle: {
      en: 'Advanced dry-port facilities and high-load freight arteries link regional manufacturing directly to international trade routes.',
      ar: 'مرافق الميناء الجاف المتقدمة وشرايين الشحن تربط التصنيع الإقليمي بطرق التجارة الدولية.',
      zh: '先进国际内陆港物流园区及特重型货运干线全面联通区域高新制造业与国际货运网络。',
      ckb: 'بەندەری وشکانی و هێڵە سەرەکییەکانی گواستنەوە پیشەسازی ناوچەکە بە ڕێگە نێودەوڵەتییەکان دەبەستنەوە.',
    },
    excerpt: {
      en: 'Engineers from China Railway Construction Corporation and Iraqi joint teams have successfully laid the main structural foundation for the Sulaymaniyah multimodal logistics park.',
      ar: 'أنجز مهندسو شركة إنشاءات السكك الحديدية الصينية بالتعاون مع الفرق العراقية المشتركة الهيكل الرئيسي لمجمع السليمانية اللوجستي متعدد الوسائط.',
      zh: '中国铁建联合伊拉克工程团队圆满完成苏莱曼尼亚多式联运智慧物流园核心建筑基底铺设，项目提前迎来关键节点。',
      ckb: 'ئەندازیارانی کۆمپانیای دروستکردنی هێڵی ئاسنی چین و تیمە هاوبەشەکانی عێراق پایەی سەرەکی کۆمەڵگەی لۆجستی سلێمانییان تەواو کرد.',
    },
    body: {
      en: `Construction on the Sulaymaniyah Freight Hub and Logistics Corridor has officially crossed the 70% milestone, three months ahead of scheduled targets. The massive project, jointly backed by the Iraqi-Chinese Joint Economic Commission and executed by China Railway Construction Corporation (CRCC) in partnership with local Kurdish engineering contractors, represents a central anchor for northern transport modernization.

Covering over 1.4 million square meters, the multimodal facility incorporates cold-chain pharmaceutical warehousing, bonded customs processing depots, and high-capacity container intermodal junctions linking highways to planned federal rail systems.

Economic Impact Metrics:
- 1,800 local technical and operational jobs sustained during active construction.
- Anticipated 45% reduction in transit transit time between Persian Gulf terminals and northern industrial zones.
- Direct digital customs integration with China Customs single-window system.`,
      ar: `تجاوز العمل في مركز السليمانية للشحن والممر اللوجستي حاجز 70% من الإنجاز، متقدماً بثلاثة أشهر عن الجدول الزمني المعتمد. ويعد هذا المشروع الضخم، المدعوم من اللجنة الاقتصادية العراقية الصينية المشتركة وتنفذه شركة CRCC بالشراكة مع مقاولين محليين، ركيزة أساسية لتحديث النقل في الشمال.

يمتد المجمع على مساحة تتجاوز 1.4 مليون متر مربع، ويضم مستودعات للتبريد الدوائي ومحطات جمركية ومراكز لنقل الحاويات متعددة الوسائط.`,
      zh: `苏莱曼尼亚综合货运枢纽与商贸物流走廊工程施工进展正式突破70%大关，较原定工期提前整整一个季度。该重大基建项目由中伊联合经济委员会全程牵头立项，中国铁建（CRCC）携手库尔德自治区本土工程企业共同实施，是伊拉克北部交通网络现代化的核心基石。

整个物流园占地超过140万平方米，配备智能化医药冷链仓库、保税海关智能查验中心以及衔接高速干道与未来联邦铁路线的集装箱多式联运转运中心。`,
      ckb: `کارکردن لە ناوەندی بارهەڵگری و لۆجستی سلێمانی بە فەرمی لە ٧٠٪ی قۆناغەکانی تەواو کرد، سێ مانگ پێش وادەی دیاریکراو. ئەم پڕۆژە گەورەیە کە لەلایەن لێژنەی هاوبەشی ئابووری عێراق-چین سەرپەرشتی دەکرێت و کۆمپانیای CRCC بە هاوبەشی کۆمپانیا خۆجێییەکان ئەنجامی دەدات، پایەیەکی سەرەکییە بۆ گەشەپێدانی کەرتی گواستنەوە.

ڕووبەری پڕۆژەکە زیاتر لە ١.٤ ملیۆن مەتر چوارگۆشەیە و کۆگای پێشکەوتووی دەرمان و ناوەندی گومرگی و گواستنەوەی کانتینەر لەخۆدەگرێت.`,
    },
    heroImage: {
      url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Sulaymaniyah logistics corridor construction site',
        ar: 'موقع بناء ممر السليمانية اللوجستي',
        zh: '苏莱曼尼亚商贸物流走廊施工现场',
        ckb: 'شوێنی کارکردنی ڕێڕەوی لۆجستی سلێمانی',
      },
      credit: 'CRCC Engineering / Kurdistan Regional Directorate',
    },
    category: newsroomCategories[1],
    tags: [newsroomTags[1], newsroomTags[2]],
    author: newsroomAuthors[2],
    publishDate: '2026-09-22',
    updatedDate: '2026-09-23',
    status: 'published',
    featured: false,
    breaking: false,
    readTimeMinutes: 4,
    languageOfOrigin: 'en',
    translationStatus: { en: true, ar: true, zh: true, ckb: true },
    seo: {
      title: {
        en: 'Sulaymaniyah Infrastructure Hub 70% Completed',
        ar: 'إنجاز 70% من مجمع السليمانية اللوجستي',
        zh: '苏莱曼尼亚物流走廊完成度突破70%',
        ckb: '٧٠٪ی پڕۆژەی ناوەندی لۆجستی سلێمانی تەواو بوو',
      },
      description: {
        en: 'Multimodal dry-port logistics hub in Sulaymaniyah nears completion under BRI coordination.',
        ar: 'اقتراب إنجاز مجمع السليمانية اللوجستي المتكامل ضمن مبادرة الحزام والطريق.',
        zh: '一带一路框架下苏莱曼尼亚多式联运内陆港枢纽全面提速。',
        ckb: 'نزیکبوونەوەی تەواوبوونی ناوەندی لۆجستی فرەلایەنەی سلێمانی لە چوارچێوەی پشتێن و ڕێگە.',
      },
    },
    createdBy: 'editorial-admin',
    updatedBy: 'editorial-admin',
    createdAt: '2026-09-22T08:00:00.000Z',
    updatedAt: '2026-09-23T10:00:00.000Z',
    fixture: true,
  },
  {
    id: 'art-03',
    slug: 'iraq-china-economic-summit-2026-roadmap',
    title: {
      en: 'Strategic Joint Committee Advances 2026 Bilateral Trade Expo Roadmap',
      ar: 'اللجنة الاستراتيجية المشتركة تقر خارطة طريق معرض التجارة الثنائية 2026',
      zh: '伊中战略联合委员会发布2026双边经贸峰会与博览会工作路线图',
      ckb: 'لێژنەی ستراتیژی هاوبەش نەخشەڕێگای پێشانگای بازرگانی دوولایەنەی ٢٠٢٦ پەسەند دەکات',
    },
    subtitle: {
      en: 'Four ministerial pavilions, 300 tier-1 industrial enterprises, and cross-border tech licensing slated for Sulaymaniyah convention.',
      ar: 'أربعة أجنحة وزارية و300 مؤسسة صناعية كبرى وتراخيص نقل تكنولوجيا ضمن أعمال القمة في السليمانية.',
      zh: '设四大部委级主题展馆，300余家行业龙头领军企业及百项跨境技术专利转移将亮相苏莱曼尼亚。',
      ckb: 'چوار باڵیۆزخانەی وەزاری، ٣٠٠ کۆمپانیای پیشەسازی و مۆڵەتی تەکنەلۆژیا لە کۆڕبەندی سلێمانی کۆدەبنەوە.',
    },
    excerpt: {
      en: 'Diplomatic envoys from Baghdad and Beijing finalized the programmatic agenda for the upcoming Iraq-China Economic Summit & Bilateral Expo, locking in dedicated tracks for sovereign finance and green manufacturing.',
      ar: 'وضع المبعوثون الدبلوماسيون في بغداد وبكين اللمسات النهائية لأجندة قمة العراق والصين الاقتصادية والمعرض الثنائي القادم.',
      zh: '来自巴格达与北京的官方外交经贸代表团近日敲定即将召开的伊拉克—中国经济峰会暨双边博览会正式议程，锁定主权金融与绿色工业两大核心赛道。',
      ckb: 'شاندە دیپلۆماسییەکانی بەغدا و پەکین کارنامەی فەرمی کۆڕبەندی ئابووریی عێراق-چین و پێشانگای دوولایەنەی داهاتوویان پەسەند کرد.',
    },
    body: {
      en: `The preparatory committee for the Iraq-China Economic Summit & Bilateral Expo concluded a crucial multi-session planning conference. Scheduled to convene at the Sulaymaniyah International Convention Center, the flagship summit will gather ministerial delegations, provincial governors, sovereign wealth asset managers, and over 300 major state and private enterprises.

Program Tracks Confirmed:
1. Sovereign Finance & Bilateral Banking Architecture
2. Energy Transition, Petrochemical Refining & Gas Capture
3. Digital Economy, Telecom Infrastructure & Smart Governance
4. Higher Education, Vocational Training & Academic Partnerships`,
      ar: `اختتمت اللجنة التحضيرية لقمة العراق والصين الاقتصادية والمعرض الثنائي اجتماعاتها التخطيطية. ستعقد القمة في مركز السليمانية الدولي للمؤتمرات بمشاركة وفود وزارية ومحافظين ومسؤولي صناديق سيادية وأكثر من 300 شركة كبرى.`,
      zh: `伊拉克—中国经济峰会暨双边博览会筹备委员会今日圆满结束全天闭门规划会议。本次盛会定于苏莱曼尼亚国际会展中心隆重举行，将汇聚两国部委级高级代表团、省长、主权基金管理机构及300余家两国顶尖工商业旗舰企业。`,
      ckb: `لێژنەی ئامادەکاری کۆڕبەندی ئابووری عێراق-چین و پێشانگای دوولایەنە کۆبوونەوەکانی تەواو کرد. کۆڕبەندەکە لە ناوەندی نێودەوڵەتی کۆنگرەکانی سلێمانی بە بەشداری وەزیران و زیاتر لە ٣٠٠ کۆمپانیای گەورە بەڕێوەدەچێت.`,
    },
    heroImage: {
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Bilateral summit planning committee conference',
        ar: 'مؤتمر اللجنة التخطيطية للقمة الثنائية',
        zh: '双边经贸峰会筹委会全体会议现场',
        ckb: 'کۆنفرانسی لێژنەی ئامادەکاری کۆڕبەندی دوولایەنە',
      },
      credit: 'ICA Summit Bureau / Protocol Division',
    },
    category: newsroomCategories[0],
    tags: [newsroomTags[3], newsroomTags[1]],
    author: newsroomAuthors[0],
    publishDate: '2026-09-20',
    updatedDate: '2026-09-21',
    status: 'published',
    featured: false,
    breaking: false,
    readTimeMinutes: 3,
    languageOfOrigin: 'en',
    translationStatus: { en: true, ar: true, zh: true, ckb: true },
    seo: {
      title: {
        en: 'Strategic Joint Committee Unveils 2026 Expo Roadmap',
        ar: 'خارطة طريق المعرض الثنائي لعام 2026',
        zh: '2026中伊双边经贸博览会官方路线图公布',
        ckb: 'ڕاگەیاندنی نەخشەڕێگای پێشانگای بازرگانی ٢٠٢٦',
      },
      description: {
        en: 'Preparations for the Iraq-China Economic Summit enter final operational sprint.',
        ar: 'استعدادات قمة العراق والصين الاقتصادية تدخل مرحلتها التشغيلية الأخيرة.',
        zh: '伊中经济峰会筹备工作进入最终实操冲刺阶段。',
        ckb: 'ئامادەکارییەکانی کۆڕبەندی ئابووری عێراق-چین دەچێتە قۆناغی کۆتایی جێبەجێکردنەوە.',
      },
    },
    createdBy: 'editorial-admin',
    updatedBy: 'editorial-admin',
    createdAt: '2026-09-20T12:00:00.000Z',
    updatedAt: '2026-09-21T09:00:00.000Z',
    fixture: true,
  },
  {
    id: 'art-04',
    slug: 'digital-silk-road-telecom-backbone-operational',
    title: {
      en: 'Digital Silk Road High-Capacity Telecommunications Backbone Operationalized',
      ar: 'تشغيل العمود الفقري للاتصالات فائق السعة ضمن طريق الحرير الرقمي',
      zh: '数字丝绸之路大容量高通量跨境通信骨干网正式通电试运行',
      ckb: 'کاراکردنی هێڵی سەرەکی پەیوەندییە خێراکان لە چوارچێوەی ڕێگەی ئاوریشمی دیجیتاڵی',
    },
    subtitle: {
      en: 'Direct fiber optic connectivity connects Basra submarine cable landings directly to inland transit rings.',
      ar: 'ربط مباشر بالألياف الضوئية يصل كابلات البصرة البحرية بحلقات العبور الداخلية.',
      zh: '高韧性直连光纤网络无缝串联巴士拉深海光缆登陆站与内陆高速数据交换环网。',
      ckb: 'هێڵی ڕاستەوخۆی ڕیشاڵی بینایی کەیبڵی دەریایی بەسرە بە تۆڕی داتای ناوخۆیی دەبەستێتەوە.',
    },
    excerpt: {
      en: 'Iraqi Ministry of Communications engineers, alongside network architects from Huawei and ZTE, have officially lighted the 800Gbps core transmission ring connecting southern ports to national data hubs.',
      ar: 'دشن مهندسو وزارة الاتصالات العراقية بالتعاون مع خبراء هواوي وZTE حلقة النقل المركزية بسعة 800 غيغابت/ثانية التي تربط الموانئ بمراكز البيانات.',
      zh: '伊拉克通信部技术专家联合华为与中兴通信网络架构师，正式点亮贯穿南部港口至国家级数据枢纽的800Gbps核心主干传输环网。',
      ckb: 'ئەندازیارانی وەزارەتی گەیاندنی عێراق هاوشانی شارەزایانی هواوی و ZTE تۆڕی سەرەکی گواستنەوەی ٨٠٠ گێگابایتیان کارا کرد.',
    },
    body: {
      en: `The Ministry of Communications in Baghdad, partnering with leading international telecoms technology consortiums, has achieved commercial switch-on for the first phase of the national Digital Silk Road backbone.

Providing redundant high-throughput routing across Basra, Nasiriyah, Najaf, Baghdad, and Erbil, the DWDM optical network dramatically lowers packet latency for regional cloud platforms and sovereign electronic payment settlement processing centers.`,
      ar: `أعلنت وزارة الاتصالات تشغيل المرحلة الأولى من شبكة طريق الحرير الرقمي الوطنية. توفر شبكة الألياف الضوئية مسارات بيانات فائقة السرعة بين البصرة والنجف وبغداد وأربيل، مما يخفض زمن استجابة مراكز البيانات والمدفوعات الإلكترونية.`,
      zh: `伊拉克通信部携手国际领军通信科技联合体，正式实现国家级“数字丝绸之路”骨干传输网一期工程商用投产。该系统采用超高速DWDM波分复用光通信体系，为跨国金融结算中心提供安全高可用的网络底座。`,
      ckb: `وەزارەتی گەیاندنی عێراق کاراکردنی فازی یەکەمی تۆڕی ڕێگەی ئاوریشمی دیجیتاڵی ڕاگەیاند. ئەم تۆڕە خێراییەکی باڵا لە نێوان بەسرە، نەجەف، بەغدا و هەولێر دابین دەکات و کاتی پاکتاوی ئەلیکترۆنی کەمدەکاتەوە.`,
    },
    heroImage: {
      url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Optical fiber communication backbone center',
        ar: 'مركز شبكات الألياف الضوئية للاتصالات',
        zh: '光纤骨干网核心数据枢纽机房',
        ckb: 'ناوەندی سەرەکی تۆڕی پەیوەندییە ڕیشاڵییەکان',
      },
      credit: 'Ministry of Communications / Technical Affairs Bureau',
    },
    category: newsroomCategories[2],
    tags: [newsroomTags[4], newsroomTags[1]],
    author: newsroomAuthors[1],
    publishDate: '2026-09-18',
    updatedDate: '2026-09-19',
    status: 'published',
    featured: false,
    breaking: false,
    readTimeMinutes: 4,
    languageOfOrigin: 'en',
    translationStatus: { en: true, ar: true, zh: true, ckb: true },
    seo: {
      title: {
        en: 'Digital Silk Road Telecom Backbone Activated in Iraq',
        ar: 'تفعيل شبكة طريق الحرير الرقمي في العراق',
        zh: '伊拉克数字丝绸之路核心骨干网正式点亮',
        ckb: 'کاراکردنی تۆڕی سەرەکی ڕێگەی ئاوریشمی دیجیتاڵی لە عێراق',
      },
      description: {
        en: 'High-speed 800Gbps transmission ring operationalized to support bilateral digital commerce.',
        ar: 'تشغيل حلقة نقل رقمية بسرعة 800 غيغابت/ثانية لدعم التجارة الرقمية الثنائية.',
        zh: '800Gbps高通量传输网投产，全方位支撑双边数字商务。',
        ckb: 'کاراکردنی تۆڕی خێرای ٨٠٠ گێگابایت بۆ پاڵپشتی بازرگانی دیجیتاڵی.',
      },
    },
    createdBy: 'editorial-admin',
    updatedBy: 'editorial-admin',
    createdAt: '2026-09-18T10:00:00.000Z',
    updatedAt: '2026-09-19T06:00:00.000Z',
    fixture: true,
  },
  {
    id: 'art-05',
    slug: 'agricultural-technology-transfer-euphrates',
    title: {
      en: 'Agricultural Technology Transfer Centers Established in Central Euphrates Basin',
      ar: 'إنشاء مراكز نقل التكنولوجيا الزراعية في حوض الفرات الأوسط',
      zh: '中伊农业科技转移联合示范中心于中幼发拉底河流域正式揭牌设立',
      ckb: 'دامەزراندنی ناوەندەکانی گواستنەوەی تەکنەلۆژیای کشتوکاڵی لە حەوزی فوراتی ناوەڕاست',
    },
    subtitle: {
      en: 'Water-saving precision drip irrigation and drought-resilient grain hybrid trials begin in Babylon and Karbala.',
      ar: 'بدء تجارب الري الدقيق الموفر للمياه والأصناف المقاومة للجفاف في بابل وكربلاء.',
      zh: '全天候智能节水精准滴灌系统与耐盐碱高产作物品种培育试验在巴比伦与卡尔巴拉两省同步启动。',
      ckb: 'دەستپێکردنی تاقیکردنەوەی ئاودێری دڵۆپەیی و گەنمی بەرگەگری وشکەساڵی لە بابل و کەربەلا.',
    },
    excerpt: {
      en: 'In partnership with the Chinese Academy of Agricultural Sciences (CAAS), three specialized technology transfer field laboratories have commenced deployment along the Euphrates agricultural corridor.',
      ar: 'بالشراكة مع الأكاديمية الصينية للعلوم الزراعية، بدأت ثلاثة مختبرات حقلية لنقل التكنولوجيا أعمالها في ممر الفرات الزراعي.',
      zh: '依托中国农业科学院（CAAS）核心科研支撑，三处专精农业科技转移实训基地于幼发拉底河现代农业走廊全面展开实质化运作。',
      ckb: 'بە هاوبەشی لەگەڵ ئەکادیمیای زانستی کشتوکاڵی چین، سێ تاقیگەی تایبەتمەندی گواستنەوەی تەکنەلۆژیا لە حەوزی فورات دەستیان بە کار کرد.',
    },
    body: {
      en: `Addressing severe climate-induced regional water stress, the Iraqi-Chinese Agricultural Cooperation Taskforce has launched three flagship demonstration centers in Babylon, Karbala, and Qadisiyah.

Utilizing automated solar-powered sub-surface irrigation and AI-governed soil moisture telemetry systems developed in Ningxia and Xinjiang, the pilot projects aim to reduce agricultural water consumption by 55% while stabilizing staple wheat and barley yields.`,
      ar: `استجابة لشح المياه، أطلقت مجموعة العمل الزراعية المشتركة ثلاثة مراكز نموذجية في بابل وكربلاء والقادسية. تعتمد المشاريع على منظومات ري بالطاقة الشمسية توفر 55% من استهلاك المياه مع الحفاظ على إنتاجية المحاصيل.`,
      zh: `为积极应对全球气候变化及中东地区水资源压力，中伊农业经贸科技联合工作组于巴比伦、卡尔巴拉及盖迪西亚三省正式落成三大现代化农业综合示范园区。`,
      ckb: `بۆ ڕووبەڕووبوونەوەی کەمئاوی، گرووپی هاوبەشی کشتوکاڵی سێ ناوەندی لە بابل، کەربەلا و قادسییە کردەوە. پڕۆژەکان سیستەمی زیرەکی ئاودێری بەکاردەهێنن کە بە رێژەی ٥٥٪ بەفیڕۆچوونی ئاو کەمدەکاتەوە.`,
    },
    heroImage: {
      url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Modern agricultural technology irrigation center',
        ar: 'مركز التكنولوجيا الزراعية والري الحديث',
        zh: '现代农业精准灌溉科技示范田',
        ckb: 'ناوەندی تەکنەلۆژیای کشتوکاڵ و ئاودێری سەردەمیانە',
      },
      credit: 'Ministry of Agriculture / Bilateral Technical Desk',
    },
    category: newsroomCategories[0],
    tags: [newsroomTags[4], newsroomTags[3]],
    author: newsroomAuthors[0],
    publishDate: '2026-09-15',
    updatedDate: '2026-09-16',
    status: 'published',
    featured: false,
    breaking: false,
    readTimeMinutes: 3,
    languageOfOrigin: 'en',
    translationStatus: { en: true, ar: true, zh: true, ckb: true },
    seo: {
      title: {
        en: 'Agricultural Tech Transfer Launched in Euphrates Basin',
        ar: 'إطلاق نقل التكنولوجيا الزراعية في حوض الفرات',
        zh: '中伊农业科技转移中心正式投入运行',
        ckb: 'دەستپێکردنی گواستنەوەی تەکنەلۆژیای کشتوکاڵی لە حەوزی فورات',
      },
      description: {
        en: 'Precision irrigation and drought-resilient agricultural technologies deployed along Euphrates basin.',
        ar: 'نشر تقنيات الري الدقيق والمحاصيل المقاومة للجفاف في حوض الفرات.',
        zh: '精准滴灌及耐旱农业高新技术全面服务幼发拉底河沿岸农产区。',
        ckb: 'بەکارخستنی تەکنەلۆژیای ئاودێری ورد و بەرهەمی بەرگەگر لە فورات.',
      },
    },
    createdBy: 'editorial-admin',
    updatedBy: 'editorial-admin',
    createdAt: '2026-09-15T09:00:00.000Z',
    updatedAt: '2026-09-16T11:00:00.000Z',
    fixture: true,
  },
  {
    id: 'art-06',
    slug: 'diplomatic-consular-fast-track-trade-delegations',
    title: {
      en: 'Diplomatic Consular Fast-Track Protocol Enters Force for Trade Delegations',
      ar: 'دخول بروتوكول المسار القنصلي السريع للوفود التجارية حيز التنفيذ',
      zh: '中伊商贸代表团领事签证全流程绿色通道便利化互惠机制正式生效',
      ckb: 'چوونە بواری جێبەجێکردنی پرۆتۆکۆلی کونسوڵگەری خێرا بۆ شاندە بازرگانییەکان',
    },
    subtitle: {
      en: 'Streamlined biometric pre-clearance and multi-entry commercial accreditation accelerate cross-border corporate movement.',
      ar: 'تسهيل الفحص البيومتري المسبق والاعتماد التجاري متعدد الدخول يسرعان حركة الشركات عبر الحدود.',
      zh: '生物识别预查验与多年多次商务通关互认大幅提速跨国企业高管与技术骨干双向往来。',
      ckb: 'ئاسانکاری لە پشکنینی بایۆمەتری و کارتی هاتووچۆی فرەجار جووڵەی کۆمپانیاکان خێراتر دەکات.',
    },
    excerpt: {
      en: 'The consular directorates of the Iraqi Ministry of Foreign Affairs and the Chinese Ministry of Foreign Affairs have formally enacted the fast-track accreditation protocol, granting reciprocal 72-hour priority clearance.',
      ar: 'فعلت الدائرتان القنصليتان في وزارتي خارجية العراق والصين بروتوكول الاعتماد السريع، مما يمنح أولوية منح التأشيرات خلال 72 ساعة.',
      zh: '伊拉克外交部与中国外交部领事司正式联合签署并落地商务考察全流程绿色通道机制，符合资质的双边企业代表团将享受到72小时极速签证核发服务。',
      ckb: 'فەرمانگەی کونسوڵگەری وەزارەتەکانی دەرەوەی عێراق و چین پرۆتۆکۆلی خێرایان کارا کرد کە لە ماوەی ٧٢ کاتژمێردا ڤیزا بە شاندەکان دەبەخشێت.',
    },
    body: {
      en: `Under reciprocal agreements finalized between Baghdad, Erbil, and Beijing, accredited corporate delegates, technical project teams, and certified academic researchers now enjoy streamlined commercial entry procedures.

The initiative eliminates redundant consular documentation requirements and integrates directly with the ICA Consular Services and Visa Centre directory.`,
      ar: `بموجب الاتفاقيات المتبادلة بين بغداد وأربيل وبكين، يحظى ممثلو الشركات والفرق الفنية المعتمدة بإجراءات دخول تجارية ميسرة وسريعة ترتبط مباشرة بدليل مركز التأشيرات التابع لوكالة ICA.`,
      zh: `依照巴格达、埃尔比勒及北京三地领事主管机构联合达成的互惠共识，通过资质认证的经贸考察代表团、常驻工程技术团队及高校访问学者将享受快速过境签批流程，全面接驳ICA领事签证服务中心直通平台。`,
      ckb: `بەپێی ڕێککەوتنی هاوبەشی نێوان بەغدا، هەولێر و پەکین، نوێنەرانی کۆمپانیاکان و تیمە ئەندازیارییە باوەڕپێکراوەکان بە شێوەیەکی خێرا و ڕاستەوخۆ لە ڕێگەی ناوەندی ڤیزای ICA مۆڵەتی هاتووچۆ وەردەگرن.`,
    },
    heroImage: {
      url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'International diplomatic airport terminal',
        ar: 'صالة المطار الدبلوماسي الدولي',
        zh: '国际商贸代表团空港专用通道',
        ckb: 'هۆڵی فڕۆکەخانەی دیپلۆماسی نێودەوڵەتی',
      },
      credit: 'ICA Consular Affairs Bureau / Protocol Desk',
    },
    category: newsroomCategories[4],
    tags: [newsroomTags[3], newsroomTags[0]],
    author: newsroomAuthors[0],
    publishDate: '2026-09-12',
    updatedDate: '2026-09-13',
    status: 'published',
    featured: false,
    breaking: false,
    readTimeMinutes: 3,
    languageOfOrigin: 'en',
    translationStatus: { en: true, ar: true, zh: true, ckb: true },
    seo: {
      title: {
        en: 'Fast-Track Consular Protocol Enacted for Bilateral Trade',
        ar: 'تفعيل البروتوكول القنصلي السريع للتجارة الثنائية',
        zh: '中伊商贸全流程领事签证便利化通道正式生效',
        ckb: 'کاراکردنی پرۆتۆکۆلی کونسوڵگەری خێرا بۆ بازرگانی دوولایەنە',
      },
      description: {
        en: 'Reciprocal 72-hour commercial visa processing enacted between Iraq and China.',
        ar: 'بدء منح التأشيرات التجارية المتبادلة خلال 72 ساعة بين العراق والصين.',
        zh: '中伊两国启动72小时快速商业签证办理机制。',
        ckb: 'دەستپێکردنی پێدانی ڤیزای بازرگانی لە ماوەی ٧٢ کاتژمێردا لە نێوان عێراق و چین.',
      },
    },
    createdBy: 'editorial-admin',
    updatedBy: 'editorial-admin',
    createdAt: '2026-09-12T14:00:00.000Z',
    updatedAt: '2026-09-13T08:00:00.000Z',
    fixture: true,
  },
  {
    id: 'art-07',
    slug: 'basra-dual-cycle-solar-energy-park-approved',
    title: {
      en: 'Green Energy Transition: Dual-Cycle 1,000MW Solar Facility Approved in Basra',
      ar: 'تحول الطاقة الخضراء: الموافقة على مجمع طاقة شمسية مزدوج بسعة 1000 ميغاوات في البصرة',
      zh: '绿色能源新范式：巴士拉1000兆瓦大型光热光伏双循环新能源电站获批立项',
      ckb: 'گواستنەوە بەرەو وزەی سەوز: پەسەندکردنی کۆمەڵگەی وزەی خۆری ١٠٠٠ مێگاوات لە بەسرە',
    },
    subtitle: {
      en: 'Power Construction Corporation of China anchors clean energy grid integration for southern heavy industries.',
      ar: 'شركة باور تشاينا تدعم ربط الطاقة النظيفة بشبكة الصناعات الثقيلة في الجنوب.',
      zh: '中国电建牵头实施清洁电能与南部重工业基地深度融合，年发电量预计突破20亿千瓦时。',
      ckb: 'کۆمپانیای پاوەر چاینا پڕۆژەی وزەی پاک بۆ پیشەسازییە قورسەکانی باشوور جێبەجێ دەکات.',
    },
    excerpt: {
      en: 'The Iraqi Ministry of Electricity and Power Construction Corporation of China (PowerChina) have signed final project execution contracts for the construction of a 1,000-megawatt dual-cycle solar and thermal generation complex.',
      ar: 'وقعت وزارة الكهرباء العراقية وشركة باور تشاينا عقود التنفيذ النهائية لبناء مجمع لتوليد الطاقة الشمسية والحرارية بسعة 1000 ميغاوات.',
      zh: '伊拉克电力部与中国电力建设集团（PowerChina）正式签署1000兆瓦大型光伏及储能新能源综合电站投资总承包最终执行合同。',
      ckb: 'وەزارەتی کارەبای عێراق و کۆمپانیای پاوەر چاینا گرێبەستی کۆتایی دروستکردنی وێستگەی وزەی خۆری ١٠٠٠ مێگاواتیان واژۆ کرد.',
    },
    body: {
      en: `In a landmark stride for national energy diversification, the Iraqi Supreme Committee for Investments and PowerChina have sealed final approvals for the 1,000MW Basra Clean Energy Complex.

Combining high-efficiency monocrystalline photovoltaic panels with battery energy storage systems (BESS), the facility is engineered to provide stable baseline power to the Al-Faw Grand Port development and surrounding petrochemical corridors.`,
      ar: `في خطوة تاريخية لتنويع مصادر الطاقة، وقعت الهيئة العليا للاستثمار وشركة باور تشاينا الموافقات النهائية لمجمع البصرة للطاقة النظيفة بسعة 1000 ميغاوات لدعم ميناء الفاو الكبير والصناعات البتروكيماوية.`,
      zh: `作为伊拉克国家能源结构多元化转型的标志性战略节点，伊拉克投资最高委员会与中国电建集团今日正式敲定巴士拉1000兆瓦清洁能源示范基地的最终批复。电站将为大阿尔法乌港区及周边沿海石化产业集群提供坚实的清洁基荷电力保障。`,
      ckb: `لە هەنگاوێکی مێژووییدا، دەستەی باڵای وەبەرهێنان و کۆمپانیای پاوەر چاینا ڕێککەوتنی کۆتاییان بۆ وێستگەی وزەی خاوێنی بەسرە واژۆ کرد بە مەبەستی دابینکردنی کارەبای بەندەری گەورەی فاو.`,
    },
    heroImage: {
      url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Basra utility-scale solar energy plant',
        ar: 'محطة الطاقة الشمسية العملاقة في البصرة',
        zh: '巴士拉兆瓦级大型光伏新能源电站',
        ckb: 'وێستگەی گەورەی وزەی خۆری لە بەسرە',
      },
      credit: 'Ministry of Electricity / Renewable Energy Bureau',
    },
    category: newsroomCategories[1],
    tags: [newsroomTags[1], newsroomTags[0]],
    author: newsroomAuthors[0],
    publishDate: '2026-09-08',
    updatedDate: '2026-09-09',
    status: 'published',
    featured: false,
    breaking: false,
    readTimeMinutes: 4,
    languageOfOrigin: 'en',
    translationStatus: { en: true, ar: true, zh: true, ckb: true },
    seo: {
      title: {
        en: '1000MW Solar Facility Approved for Basra',
        ar: 'الموافقة على مجمع طاقة شمسية بسعة 1000 ميغاوات بالبصرة',
        zh: '巴士拉1000兆瓦大型光伏电站正式获批',
        ckb: 'پەسەندکردنی وێستگەی ١٠٠٠ مێگاواتی وزەی خۆر لە بەسرە',
      },
      description: {
        en: 'Clean energy transition project in Basra signed with PowerChina to power southern industries.',
        ar: 'مشروع الطاقة النظيفة في البصرة بالشراكة مع باور تشاينا لتغذية صناعات الجنوب.',
        zh: '巴士拉绿色能源示范项目签约落地，为伊拉克南部工商业集群输送清洁电力。',
        ckb: 'پڕۆژەی وزەی پاک لە بەسرە لەگەڵ کۆمپانیای پاوەر چاینا بۆ دابینکردنی کارەبا.',
      },
    },
    createdBy: 'editorial-admin',
    updatedBy: 'editorial-admin',
    createdAt: '2026-09-08T07:00:00.000Z',
    updatedAt: '2026-09-09T08:00:00.000Z',
    fixture: true,
  },
];
