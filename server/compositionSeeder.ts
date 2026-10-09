import { prisma } from "./db.js";
import { CANONICAL_SECTION_REGISTRY, CanonicalSectionType } from "../src/types/composition.js";

export async function seedCompositionEngine() {
  console.log("[CompositionSeeder] Checking Page and Section tables...");

  const existingPages = await prisma.page.count();
  if (existingPages > 0) {
    console.log(`[CompositionSeeder] ${existingPages} pages already exist. Ensuring templates exist...`);
    await seedTemplatesOnly();
    return;
  }

  console.log("[CompositionSeeder] Seeding default Home Page and 15 Canonical Sections...");

  // 1. Create Default Home Page
  const homePage = await prisma.page.create({
    data: {
      id: "page_home_primary",
      slug: "home",
      path: "/",
      title: JSON.stringify({
        en: "Home - Iraqi-Chinese Agency",
        ar: "الرئيسية - الوكالة العراقية الصينية",
        zh: "首页 - 伊拉克中国通讯社",
        ckb: "سەرەکی - ئاژانسی عێراقی-چینی"
      }),
      description: JSON.stringify({
        en: "Official sovereign bilateral intelligence, economic settlement rails, and strategic partnership portal.",
        ar: "البوابة الرسمية للاستخبارات الاقتصادية والسيادية والتسويات التجارية والشراكة الإستراتيجية بين جمهورية العراق وجمهورية الصين الشعبية.",
        zh: "中伊双边经贸主权情报中枢、直接本币清算网关与战略互联互通旗舰门户。",
        ckb: "دەروازەی فەرمی هەواڵگری ئابووری، پاکتاوی ڕاستەوخۆی دراو و پڕۆژە هاوبەشەکانی نێوان عێراق و چین."
      }),
      pillar: "GENERAL",
      status: "published",
      createdBy: "system_seeder",
      updatedBy: "system_seeder"
    }
  });

  // 2. Seed 15 Section Templates
  await seedTemplatesOnly();

  // 3. Define the 15 Initial PageSections
  const canonicalTypes: { type: CanonicalSectionType; name: string; items: any[] }[] = [
    {
      type: "hero",
      name: "Hero Section",
      items: [
        {
          title: {
            en: "Sino-Iraqi Sovereign Partnership & Strategic Gateway",
            ar: "الشراكة السيادية العراقية الصينية والبوابة الاستراتيجية",
            zh: "中伊战略伙伴关系与主权经贸发展中枢",
            ckb: "هاوبەشی سەروەری عێراقی-چینی و دەروازەی ستراتیژی"
          },
          subtitle: {
            en: "OFFICIAL BILATERAL DIPLOMATIC & ECONOMIC GATEWAY",
            ar: "البوابة الدبلوماسية والاقتصادية الثنائية الرسمية",
            zh: "官方双边外交与经贸中枢",
            ckb: "دەروازەی فەرمی دیپلۆماسی و ئابووری دوولایەنە"
          },
          body: {
            en: "Direct sovereign intelligence, economic integration rails, and cultural exchange bridges between the Republic of Iraq and the People's Republic of China.",
            ar: "المعلومات الاستخباراتية السيادية المباشرة، وقنوات التكامل الاقتصادي، وجسور التبادل الثقافي بين العراق والصين.",
            zh: "连接伊拉克共和国与中华人民共和国的主权战略情报、本币清算通道与人文交流纽带。",
            ckb: "زانیارییە ستراتیژییەکان، کەناڵەکانی دارایی و پەیوەندییە کەلتوورییەکان."
          },
          ctaLabel: {
            en: "Explore Initiatives",
            ar: "استكشف المبادرات",
            zh: "探索重点项目",
            ckb: "دەستپێشخەرییەکان"
          },
          ctaHref: "/initiatives",
          image: "/images/hero-diplomatic.jpg"
        }
      ]
    },
    {
      type: "live-broadcast",
      name: "Live Broadcast Band",
      items: [
        {
          title: {
            en: "ON AIR: Baghdad-Beijing Diplomatic Chamber Forum 2026",
            ar: "بث حي: منتدى الغرفة الدبلوماسية بغداد-بكين 2026",
            zh: "正在直播：2026巴格达-北京双边外交与投资论坛",
            ckb: "پەخشی ڕاستەوخۆ: کۆڕبەندی بەغدا-پەکین ٢٠٢٦"
          },
          subtitle: {
            en: "4K Quad-Lingual Low Latency Bilateral Feed",
            ar: "بث متزامن فائق الدقة بـ 4 لغات",
            zh: "四语同声传译 4K 超低延迟直播",
            ckb: "پەخشی چوارزمانە بە کوالیتی بەرز"
          },
          body: {
            en: "High-level bilateral negotiations on Grand Faw corridor infrastructure and direct commercial clearing.",
            ar: "مفاوضات ثنائية رفيعة المستوى حول مشاريع ميناء الفاو وطريق التنمية والتسويات المباشرة.",
            zh: "关于大阿福港走廊基础设施建设与中伊双向直连清算机制的高级别磋商。",
            ckb: "کۆبوونەوەی باڵا لەسەر ژێرخانی بەندەری فاو و پاکتاوی دارایی."
          },
          ctaLabel: {
            en: "Watch Live Stream",
            ar: "شاهد البث الحي",
            zh: "进入直播大厅",
            ckb: "سەیری پەخش بکە"
          },
          ctaHref: "/live"
        }
      ]
    },
    {
      type: "ticker",
      name: "Intelligence Wire Ticker",
      items: [
        {
          title: {
            en: "Grand Faw Port Rail Link: Civil engineering phase signed in Beijing",
            ar: "ميناء الفاو الكبير: توقيع عقود الهندسة المدنية في بكين",
            zh: "大阿福港铁路联运线：土建工程协议在京正式签署",
            ckb: "هێڵی شەمەندەفەری بەندەری فاو: واژۆکردنی گرێبەست لە پەکین"
          },
          ctaHref: "/newsroom"
        },
        {
          title: {
            en: "mBridge Liquidity Pool: Central Bank of Iraq settles first digital Yuan trade",
            ar: "منصة mBridge: البنك المركزي العراقي يسوي أول صفقة تجارية باليوان الرقمي",
            zh: "mBridge流动性池：伊拉克央行完成首单数字人民币大宗跨境结算",
            ckb: "بانکی ناوەندی عێراق یەکەم مامەڵەی بە یوانی دیجیتاڵی ئەنجامدا"
          },
          ctaHref: "/settlement"
        },
        {
          title: {
            en: "Bilateral Trade 2026: Non-oil trade reaches record $14.8 Billion",
            ar: "التبادل التجاري 2026: التجارة غير النفطية تسجل رقماً قياسياً قدره 14.8 مليار دولار",
            zh: "2026双边贸易：非石油经贸规模达创纪录的148亿美元",
            ckb: "بازرگانی دوولایەنە لە ٢٠٢٦: ئاستی بازرگانی غەیرە نەوتی گەیشتە ١٤.٨ ملیار دۆلار"
          },
          ctaHref: "/newsroom"
        }
      ]
    },
    {
      type: "stats-strip",
      name: "Quick Stats Strip",
      items: [
        {
          title: { en: "$53.4B", ar: "53.4 مليار $", zh: "534亿美元", ckb: "٥٣.٤ ملیار $" },
          subtitle: { en: "Annual Bilateral Trade Volume", ar: "حجم التبادل التجاري السنوي", zh: "年双边贸易总额", ckb: "قەبارەی ساڵانەی بازرگانی" }
        },
        {
          title: { en: "¥48.2B", ar: "48.2 مليار ¥", zh: "482亿元人民币", ckb: "٤٨.٢ ملیار ¥" },
          subtitle: { en: "Direct Clearing Liquidity", ar: "حجم سيولة التسويات المباشرة", zh: "双边本币直接清算池", ckb: "سیولەی پاکتاوی ڕاستەوخۆ" }
        },
        {
          title: { en: "124", ar: "124", zh: "124", ckb: "١٢٤" },
          subtitle: { en: "Active BRI Projects", ar: "مشاريع الحزام والطريق النشطة", zh: "在建一带一路战略重点工程", ckb: "پڕۆژە چالاکەکانی پشتوێن و ڕێگا" }
        },
        {
          title: { en: "86", ar: "86", zh: "86", ckb: "٨٦" },
          subtitle: { en: "Bilateral Delegations", ar: "وفود تجارية ودبلوماسية متبادلة", zh: "年度高层双向政企互访团", ckb: "شاندی فەرمی دوولایەنە" }
        }
      ]
    },
    {
      type: "world-stories",
      name: "World Stories Section",
      items: [
        {
          title: {
            en: "Development Road Strategic Alignment with Belt and Road",
            ar: "مواءمة طريق التنمية الاستراتيجي مع مبادرة الحزام والطريق",
            zh: "伊拉克“发展之路”与“一带一路”倡议战略深度对接全面提速",
            ckb: "هاوتەریبکردنی ڕێگای گەشەپێدان لەگەڵ پشتوێن و ڕێگا"
          },
          body: {
            en: "Comprehensive tripartite study between Baghdad, Ankara, and Beijing on multimodal freight corridor connectivity.",
            ar: "دراسة شاملة ثلاثية بين بغداد وأنقرة وبكين حول ربط ممرات الشحن متعدد الوسائط.",
            zh: "中土伊三国智库就多式联运大走廊技术标准与物流枢纽建设发布联合评估蓝皮书。",
            ckb: "توێژینەوەی هاوبەشی بەغدا، ئەنقەرە و پەکین لەسەر ڕێڕەوی گواستنەوە."
          },
          ctaHref: "/newsroom",
          image: "/images/hero-diplomatic.jpg"
        },
        {
          title: {
            en: "Currency Sovereignty: De-dollarization in Bilateral Energy Deals",
            ar: "السيادة النقدية: تسوية عقود الطاقة بالعملات الوطنية",
            zh: "货币主权：中伊大宗能源采购与基建工程双向本币化提质扩面",
            ckb: "سەروەری دراو: مامەڵەی وزە بە دراوی نیشتمانی"
          },
          body: {
            en: "Strategic shift toward bilateral RMB-IQD instruments eliminates third-party clearing vulnerabilities.",
            ar: "التحول نحو أدوات اليوان والدينار يحمي التبادلات التجارية من تقلبات العقوبات.",
            zh: "采用中伊双向本币直连结算机制，彻底消除第三方中间清算机构带来的结算风险。",
            ckb: "بەکارهێنانی دینار و یوان پارێزگاری لە بازرگانی هاوبەش دەکات."
          },
          ctaHref: "/settlement",
          image: "/images/hero-diplomatic.jpg"
        },
        {
          title: {
            en: "Southern Iraq Industrial Parks: High-Tech Manufacturing Clusters",
            ar: "المدن الصناعية في جنوب العراق: مجمعات التصنيع المتقدمة",
            zh: "伊拉克南部临港产业园：引进中国先进制造业集群与高新园区",
            ckb: "شارە پیشەسازییەکان لە باشووری عێراق"
          },
          body: {
            en: "Joint industrial special economic zones established near Basra and Grand Faw Port.",
            ar: "إنشاء مناطق اقتصادية صناعية خاصة قرب البصرة وميناء الفاو الكبير.",
            zh: "依托大阿福港与巴士拉自贸区建设伊中联合现代高端装备与新能源制造示范区。",
            ckb: "دامەزراندنی ناوچەی ئابووری پیشەسازی لە نزیک بەسڕە."
          },
          ctaHref: "/newsroom",
          image: "/images/hero-diplomatic.jpg"
        }
      ]
    },
    {
      type: "trending",
      name: "Trending Section",
      items: [
        {
          title: {
            en: "Top Bilateral Decree: Mutual Commercial Visa Fast-Track Framework",
            ar: "مرسوم ثنائي: تفعيل المسار السريع للتأشيرات التجارية لرجال الأعمال",
            zh: "热点双边法令：中伊商务人员出入境绿色通道互惠协定生效",
            ckb: "ڕێنمایی نوێ: کارئاسانی بۆ پێدانی ڤیزای بازرگانی"
          },
          ctaHref: "/institute/visa-centre"
        },
        {
          title: {
            en: "Sinosure Master Credit Line for Iraqi Strategic Infrastructure",
            ar: "خط ائتمان شامل من شركة سينوشور للمشاريع الاستراتيجية في العراق",
            zh: "中国信保面向伊拉克国家级重大基建项目提供专项主权承保额度",
            ckb: "هێڵی دارایی سینۆشور بۆ پڕۆژە ستراتیژییەکانی عێراق"
          },
          ctaHref: "/institute/insurance-facilitation"
        },
        {
          title: {
            en: "Digital Silk Road: 5G Backbone Deployment in Baghdad and Erbil",
            ar: "طريق الحرير الرقمي: نشر شبكات الجيل الخامس في بغداد وأربيل",
            zh: "数字丝绸之路：巴格达与埃尔比勒骨干光纤与5G基站升级工程",
            ckb: "ڕێگای ئاوریشمی دیجیتاڵی لە بەغدا و هەولێر"
          },
          ctaHref: "/newsroom"
        },
        {
          title: {
            en: "Al Faw Dry Canal: Intermodal Container Transit Tariffs Announced",
            ar: "القناة الجافة لميناء الفاو: إعلان تعرفة عبور الحاويات متعددة الوسائط",
            zh: "大阿福港陆桥干线：多式联运标准集装箱过境费率正式公布",
            ckb: "دیاریکردنی تێچووی گواستنەوەی کانتینەر لە کەناڵی وشکانی فاو"
          },
          ctaHref: "/newsroom"
        },
        {
          title: {
            en: "University of Baghdad & Peking University Joint Geoscience Lab",
            ar: "مختبر مشترك لعلوم الأرض بين جامعة بغداد وجامعة بكين",
            zh: "北京大学与巴格达大学联合地球科学与能源可持续发展实验室揭牌",
            ckb: "تاقیگەی هاوبەشی زانکۆی بەغدا و زانکۆی پەکین"
          },
          ctaHref: "/institute/chinese-center"
        }
      ]
    },
    {
      type: "strategic-initiatives",
      name: "Strategic Initiatives Section",
      items: [
        {
          title: { en: "Bilateral Economic Summit & Expo", ar: "القمة الاقتصادية والمعرض الثنائي", zh: "中伊经济峰会与产业博览会", ckb: "لووتکەی ئابووری و پێشانگای هاوبەش" },
          subtitle: { en: "Sulaymaniyah & Beijing Flagship Platform", ar: "منصة السليمانية وبكين الرائدة", zh: "苏莱曼尼亚与北京年度旗舰盛会", ckb: "پلاتفۆرمی سەرەکی لە سلێمانی و پەکین" },
          ctaHref: "/summit"
        },
        {
          title: { en: "Bilateral Currency Settlement Gateway", ar: "بوابة تسوية المدفوعات بالعملات الوطنية", zh: "双边本币直连结算与清算网关", ckb: "دەروازەی پاکتاوی دراوە نیشتمانییەکان" },
          subtitle: { en: "IQD-CNY Direct Cross-Border Rail", ar: "مسار العبور المالي المباشر بين الدينار واليوان", zh: "第纳尔与人民币去中间化跨境通道", ckb: "کەناڵی ڕاستەوخۆی دینار و یوان" },
          ctaHref: "/settlement"
        },
        {
          title: { en: "Bilateral Visa & Tourism Centre", ar: "مركز التأشيرات والوفود التجارية", zh: "双向签证与高端商旅服务中心", ckb: "ناوەندی ڤیزا و گەشتیاری دوولایەنە" },
          subtitle: { en: "Official Sovereign Diplomatic Concierge", ar: "خدمات التأشيرات الدبلوماسية والتجارية الرسمية", zh: "官方主权外事认证与VIP商务协助", ckb: "خزمەتگوزاری فەرمی ڤیزای بازرگانی" },
          ctaHref: "/institute/visa-centre"
        },
        {
          title: { en: "Sinosure Insurance Facilitation Desk", ar: "مكتب تسهيل تأمين الصادرات سينوشور", zh: "中国信保专项承保与风险管理专席", ckb: "مێزی ئاسانکاری بیمەی هەناردەی سینۆشور" },
          subtitle: { en: "Credit Guarantee & Marine Risk Mitigation", ar: "ضمان الائتمان وتغطية المخاطر البحرية والتجارية", zh: "海外买方信贷保证与海运综合险保障", ckb: "دەستەبەری دارایی و بیمەی کەشتیوانی" },
          ctaHref: "/institute/insurance-facilitation"
        },
        {
          title: { en: "Chinese Language & Cultural Centre", ar: "مركز اللغة والثقافة الصينية", zh: "中伊语言文化与高等学术交流中心", ckb: "ناوەندی زمان و کەلتووری چینی" },
          subtitle: { en: "Official HSK Testing & Sovereign Cadre Training", ar: "اختبارات HSK الرسمية وتدريب الكوادر الدبلوماسية", zh: "官方HSK汉语等级考试与涉外干部培训基地", ckb: "تاقیکردنەوەی فەرمی HSK و ڕاهێنانی ستاف" },
          ctaHref: "/institute/chinese-center"
        },
        {
          title: { en: "Sovereign Sourcing & Procurement Hub", ar: "مركز التوريد والوساطة التجارية السيادية", zh: "主权直采与跨国招投标采购中枢", ckb: "ناوەندی کڕین و دابینکردنی سەروەری" },
          subtitle: { en: "Direct Tier-1 Factory Procurement Rail", ar: "ربط مباشر بالمصانع الصينية الكبرى", zh: "直通中国顶级工业制造源头企业", ckb: "پەیوەندی ڕاستەوخۆ بە کارگە گەورەکانی چین" },
          ctaHref: "/hub/management/sourcing"
        }
      ]
    },
    {
      type: "featured-publications",
      name: "Featured Publications",
      items: [
        {
          title: {
            en: "Al Faw Dry Canal: Multimodal Corridor Transit Feasibility 2026-2035",
            ar: "القناة الجافة لميناء الفاو: الجدوى الفنية والاقتصادية للعبور متعدد الوسائط 2026-2035",
            zh: "大阿福港陆海联运大走廊过境运输可行性研究总报告(2026-2035)",
            ckb: "توێژینەوەی کەناڵی وشکانی فاو بۆ ٢٠٢٦-٢٠٣٥"
          },
          body: {
            en: "Authoritative CISE research study analyzing rail container throughput and tariff models.",
            ar: "دراسة استراتيجية محكمة من معهد CISE تحلل طاقة الشحن وسيناريوهات التعرفة الجمركية.",
            zh: "中伊战略研究所重点课题：集装箱铁路换装效率、通关一体化与费率测算模型。",
            ckb: "توێژینەوەی ستراتیژی لەسەر بارکردنی شەمەندەفەر و باجی گومرگی."
          },
          ctaHref: "/institute/publications"
        },
        {
          title: {
            en: "De-Dollarization Handbook: Operating RMB-IQD Settlement Mechanisms",
            ar: "دليل العملات الوطنية: آليات التشغيل الفعلي لتسويات الدينار واليوان",
            zh: "去美元化实务手册：中伊本币直接清算结算体系实操全指引",
            ckb: "ڕێبەری کرداری پاکتاوی دراوە نیشتمانییەکان"
          },
          body: {
            en: "Operational banking manual for commercial banks and importers using digital Yuan and Central Bank of Iraq rails.",
            ar: "دليل مصرفي تطبيقي للمصارف التجارية والمستوردين للتعامل باليوان الرقمي ومنصة المقاصة.",
            zh: "面向商业银行与进出口企业的实操手册，详细拆解mBridge数字清算与外汇申报全流程。",
            ckb: "ڕێبەری بانکی بۆ بەکارهێنانی یوانی دیجیتاڵی."
          },
          ctaHref: "/institute/publications"
        },
        {
          title: {
            en: "Solar & Clean Energy Corridors in Central Iraq: Bilateral Investment Atlas",
            ar: "أطلس الاستثمار الثنائي: ممرات الطاقة الشمسية والنظيفة في وسط العراق",
            zh: "中伊双边清洁能源走廊投资图册：光伏电站与储能微网布局规划",
            ckb: "ئەتڵەسی وەبەرهێنانی وزەی پاک لە ناوەڕاستی عێراق"
          },
          body: {
            en: "Comprehensive geospatial survey of 10 GW solar projects partnered with PowerChina and Energy China.",
            ar: "مسح جغرافي وميداني متكامل لمشاريع الطاقة الشمسية بقدرة 10 غيغاوات بالشراكة مع الشركات الصينية.",
            zh: "与中国电建、能建联合勘测的十吉瓦级光伏产业带全生命周期投资与并网测算报告。",
            ckb: "پڕۆژەکانی وزەی خۆر بە توانای ١٠ گێگاوات بە هاوبەشی کۆمپانیا چینییەکان."
          },
          ctaHref: "/institute/publications"
        }
      ]
    },
    {
      type: "data-snapshot",
      name: "Data Snapshot",
      items: [
        {
          title: { en: "1 RMB = 182.45 IQD", ar: "1 يوان = 182.45 دينار", zh: "1元人民币 = 182.45伊拉克第纳尔", ckb: "١ یوان = ١٨٢.٤٥ دینار" },
          subtitle: { en: "Official Direct Central Bank FX Clearing Benchmark", ar: "سعر الصرف المرجعي المباشر للتسويات بين البنكين المركزيين", zh: "中伊两国央行间直接双向基准清算牌价", ckb: "نرخی فەرمی بانکی ناوەندی بۆ پاکتاو" }
        },
        {
          title: { en: "92.4% Port Progress", ar: "نسبة إنجاز 92.4% في ميناء الفاو", zh: "大阿福港一期工程综合完成率 92.4%", ckb: "٩٢.٤٪ ڕێژەی تەواوبوونی بەندەری فاو" },
          subtitle: { en: "Five Berths and Navigation Basin Civil Works Verification", ar: "جاهزية الأرصفة الخمسة وحوض الملاحة البحري", zh: "五大深水泊位及防波堤工程全部通过主体验收", ckb: "تەواوبوونی پێنج بەلەنگەر و حەوزی کەشتیوانی" }
        }
      ]
    },
    {
      type: "expert-spotlight",
      name: "Expert Spotlight",
      items: [
        {
          title: { en: "Prof. Dr. Tariq Al-Janabi", ar: "أ.د. طارق الجنابي", zh: "塔里克·贾纳比 教授", ckb: "پ.د. تاریق جەنابی" },
          subtitle: { en: "Senior Macroeconomist & Energy Policy Lead", ar: "كبير الخبراء الاقتصاديين ومسؤول ملف الطاقة", zh: "资深宏观经济学家兼中伊能源合作首席顾问", ckb: "پسپۆڕی باڵای ئابووری و سەرپەرشتیاری دۆسیەی وزە" },
          body: { en: "Advising the Joint Bilateral Economic Council on currency pegging, sovereign guarantees, and Al Faw rail funding models.", ar: "مستشار المجلس الاقتصادي الثنائي في نماذج تمويل سكة حديد الفاو والضمانات السيادية.", zh: "长期为双边联合经济委员会提供主权承保、货币直接结算与铁路大通道投融资架构咨询。", ckb: "ڕاوێژکاری ئەنجومەنی ئابووری هاوبەش بۆ دارایی و گەرەنتییە سەروەرییەکان." }
        },
        {
          title: { en: "Eng. Wang Chengyuan", ar: "المهندس وانغ تشنغيوان", zh: "王承远 教授级高工", ckb: "ئەندازیار وانگ چێنگیوان" },
          subtitle: { en: "Lead Infrastructure & Port Systems Architect", ar: "كبير مهندسي البنية التحتية وأنظمة الموانئ", zh: "跨国特大型港口物流与干线走廊总工程师", ckb: "ئەندازیاری باڵای ژێرخان و بەندەرەکان" },
          body: { en: "Over 25 years overseeing maritime engineering, deep-sea dredging, and intermodal transport corridors across West Asia.", ar: "أكثر من 25 عاماً من الخبرة في الهندسة البحرية وتعميق الموانئ وممرات النقل الإقليمية.", zh: "拥有25年以上中东特大型深水港口吹填疏浚与公铁海多式联运大走廊建设实务总包经验。", ckb: "زیاتر لە ٢٥ ساڵ ئەزموون لە ئەندازیاری دەریاوانی و بەندەرەکان." }
        },
        {
          title: { en: "Dr. Leyla Barzani", ar: "د. ليلى بارزاني", zh: "莱拉·巴尔扎尼 博士", ckb: "د. لەیلا بارزانی" },
          subtitle: { en: "Director of Academic & Bilateral Language Exchange", ar: "مديرة التبادل الأكاديمي واللغوي الثنائي", zh: "中伊人文教育交流中心学术总监兼特聘导师", ckb: "بەڕێوەبەری ئاڵوگۆڕی ئەکادیمی و زمان" },
          body: { en: "Architect of the trilingual curriculum connecting Iraqi universities with top Chinese academic institutes.", ar: "مطورة المناهج الثلاثية التي تربط الجامعات العراقية بأرقى المعاهد الأكاديمية الصينية.", zh: "主持制定中伊联合培养双语高层次涉外人才培养方案及学术互认双向机制。", ckb: "داڕێژەری پرۆگرامی سێ زمانەی زانکۆکانی عێراق و پەیمانگاکانی چین." }
        }
      ]
    },
    {
      type: "media-preview",
      name: "Media Preview",
      items: [
        {
          title: {
            en: "Documentary Reel: The Iron Silk Road Over Tigris and Euphrates",
            ar: "سلسلة وثائقية: طريق الحرير الحديدي فوق دجلة والفرات",
            zh: "4K大型纪录片先导片：《幼发拉底河上的钢铁新丝路》",
            ckb: "دۆکیۆمێنتاری: ڕێگای ئاوریشمی ئاسنین بەسەر دیجلە و فورات"
          },
          subtitle: { en: "Full 4K Cinematic Co-Production", ar: "إنتاج سينمائي مشترك فائق الدقة 4K", zh: "中伊融媒体联合出品 4K全画幅超高清", ckb: "بەرهەمی هاوبەشی 4K" },
          ctaHref: "/media"
        },
        {
          title: {
            en: "Leadership Dialogue: Minister of Transport on Al Faw Dry Canal Launch",
            ar: "حوار خاص: وزير النقل يتحدث عن إطلاق القناة الجافة لميناء الفاو",
            zh: "高端访谈实录：交通部长详解大阿福港陆桥干线投运全景",
            ckb: "دیداری تایبەت: وەزیری گواستنەوە دەربارەی کەناڵی وشکانی فاو"
          },
          subtitle: { en: "Exclusive Bilateral Televised Special", ar: "حلقة تلفزيونية خاصة وحصرية", zh: "独家深度对话栏目", ckb: "بەرنامەی تایبەتی تەلەفزیۆنی" },
          ctaHref: "/media"
        },
        {
          title: {
            en: "Cultural Chronicles: From Chang'an to Baghdad Across Two Millennia",
            ar: "سجلات الحضارة: من تشانغآن إلى بغداد عبر ألفي عام",
            zh: "文明回响：《从长安到巴格达：跨越两千年的文明对话》",
            ckb: "تۆماری کەلتووری: لە چانگان تا بەغدا لە دوو هەزار ساڵدا"
          },
          subtitle: { en: "Historical Fellowship Series", ar: "سلسلة دراسات وأفلام تاريخية", zh: "国家级历史人文专题展播", ckb: "زنجیرەی مێژوویی هاوبەش" },
          ctaHref: "/media"
        }
      ]
    },
    {
      type: "upcoming-events",
      name: "Upcoming Events",
      items: [
        {
          title: {
            en: "Annual Bilateral Trade & Industrial Exposition 2026",
            ar: "المعرض والمؤتمر الصناعي التجاري الثنائي السنوي 2026",
            zh: "2026伊中双边产业贸易与投资对接年度博览会",
            ckb: "پێشانگا و کۆنفرانسی ساڵانەی بازرگانی ٢٠٢٦"
          },
          subtitle: { en: "Sulaymaniyah International Expo Fairground", ar: "أرض معارض السليمانية الدولية", zh: "苏莱曼尼亚国际博览中心", ckb: "پێشانگای نێودەوڵەتی سلێمانی" },
          body: { en: "Featuring 400+ leading state-owned enterprises, tier-1 suppliers, and banking institutions.", ar: "بمشاركة أكثر من 400 شركة كبرى وهيئة حكومية ومصرف.", zh: "汇聚400余家重点央国企、高端设备制造商与双边金融机构。", ckb: "بە بەشداری زیاتر لە ٤٠٠ کۆمپانیا و بانکی گەورە." },
          ctaHref: "/summit"
        },
        {
          title: {
            en: "Bilateral Infrastructure Financing Round Table: Beijing",
            ar: "طاولة مستديرة لتمويل البنية التحتية الثنائية: بكين",
            zh: "双边重大基建投融资闭门圆桌峰会（北京）",
            ckb: "کۆڕبەندی دارایی ژێرخانی دوولایەنە لە پەکین"
          },
          subtitle: { en: "Diaoyutai State Guesthouse, Beijing", ar: "دار دياويوتاي للضيافة، بكين", zh: "北京 钓鱼台国宾馆", ckb: "پەکین" },
          body: { en: "High-level closed-door assembly of sovereign wealth funds, Silk Road Fund, and Iraqi ministerial leadership.", ar: "اجتماع رفيع المستوى للصناديق السيادية وصندوق طريق الحرير والوزارات العراقية.", zh: "丝路基金、主权财富基金与伊拉克核心经济部委高层闭门战略对话。", ckb: "کۆبوونەوەی ئاست بەرزی سندوقە سەروەرییەکان." },
          ctaHref: "/summit"
        },
        {
          title: {
            en: "Basra Logistics and Maritime Intermodal Summit",
            ar: "قمة البصرة للوجستيات والنقل البحري متعدد الوسائط",
            zh: "巴士拉港航物流与多式联运区域国际峰会",
            ckb: "لووتکەی لۆجستی و گواستنەوەی دەریایی لە بەسڕە"
          },
          subtitle: { en: "Grand Faw Maritime Port Auditorium", ar: "قاعة ميناء الفاو الكبير للمؤتمرات", zh: "大阿福港国际海事会议中心", ckb: "هۆڵی کۆنفرانسی بەندەری فاو" },
          body: { en: "Focus on dry canal freight scheduling, bonded customs corridors, and Gulf trade integration.", ar: "التركيز على جدولة الشحن بالقناة الجافة والمناطق الحرة والجمارك.", zh: "聚焦陆海新通道运力排布、保税物流走廊与海湾经贸一体化。", ckb: "تیشک خستنە سەر کەناڵی وشکانی و ناوچەی ئازاد." },
          ctaHref: "/summit"
        }
      ]
    },
    {
      type: "partners-marquee",
      name: "Strategic Partners Marquee",
      items: [
        { title: { en: "CSCEC - China State Construction", ar: "الشركة الصينية العامة للهندسة الإنشائية", zh: "中国建筑集团有限公司 (CSCEC)", ckb: "کۆمپانیای CSCEC بۆ بیناسازی" } },
        { title: { en: "CNOOC - China National Offshore Oil", ar: "الشركة الوطنية الصينية للنفط البحري", zh: "中国海洋石油集团有限公司 (CNOOC)", ckb: "کۆمپانیای نیشتمانی نەوتی چین" } },
        { title: { en: "Sinopec Group", ar: "مجموعة سينوبك العالمية", zh: "中国石化集团 (Sinopec)", ckb: "گرووپی سینۆپیک" } },
        { title: { en: "Industrial and Commercial Bank of China", ar: "البنك الصناعي والتجاري الصيني", zh: "中国工商银行 (ICBC)", ckb: "بانکی پیشەسازی و بازرگانی چین" } },
        { title: { en: "Central Bank of Iraq (CBI)", ar: "البنك المركزي العراقي", zh: "伊拉克中央银行 (CBI)", ckb: "بانکی ناوەندی عێراق" } },
        { title: { en: "Ministry of Transport - Republic of Iraq", ar: "وزارة النقل العراقية", zh: "伊拉克共和国交通部", ckb: "وەزارەتی گواستنەوەی عێراق" } },
        { title: { en: "Grand Faw Port Authority", ar: "إدارة ميناء الفاو الكبير", zh: "大阿福港管理局", ckb: "بەڕێوەبەرایەتی بەندەری فاو" } },
        { title: { en: "Trade Bank of Iraq (TBI)", ar: "المصرف العراقي للتجارة", zh: "伊拉克贸易银行 (TBI)", ckb: "بانکی بازرگانی عێراق" } }
      ]
    },
    {
      type: "newsletter-signup",
      name: "Newsletter Intelligence Signup",
      items: [
        {
          title: {
            en: "Diplomatic & Economic Intelligence Dispatch",
            ar: "الاشتراك بالنشرة البريدية الاستخبارية الدبلوماسية والاقتصادية",
            zh: "中伊高层经贸决策内参直接订阅",
            ckb: "بەشداری لە نامەی هەواڵی ئابووری و دیپلۆماسی"
          },
          body: {
            en: "Daily telegraph dispatches directly to ministry directors, multinational executives, and licensed economic delegates.",
            ar: "برقيات وتحليلات يومية تصل مباشرة إلى بريد المدراء والمسؤولين التنفيذيين.",
            zh: "面向部委主官、跨国集团高管与持牌经贸代表直发的每日双边经贸机要通讯。",
            ckb: "بروسکەی ڕۆژانەی دیپلۆماسی بۆ بەڕێوەبەر و بازرگانان."
          },
          ctaLabel: {
            en: "Subscribe to Wires",
            ar: "اشتراك في البرقيات",
            zh: "立即开通机要专送",
            ckb: "بەشداربە"
          }
        }
      ]
    },
    {
      type: "app-download-pwa",
      name: "Download App PWA Promo Card",
      items: [
        {
          title: {
            en: "Deploy Sovereign Encrypted PWA to Mobile",
            ar: "تثبيت تطبيق PWA المشفر على الهواتف الذكية",
            zh: "安装主权级离线加密移动客户端 (PWA)",
            ckb: "دابەزاندنی ئەپی پارێزراوی مۆبایل"
          },
          body: {
            en: "Zero-store instant installation with biometric authentication, offline cryptographic telex caching, and push alarms.",
            ar: "تثبيت فوري بدون متجر تطبيقات مع دعم البصمة وتخزين البرقيات بدون إنترنت.",
            zh: "无需应用商店，一键即刻部署至iOS与安卓桌面，支持生物识别与离线通讯加密。",
            ckb: "دابەزاندنی خێرا بەبێ ئەپستۆر بە سیستەمی پەنجەمۆر."
          },
          ctaLabel: {
            en: "Install Secure PWA",
            ar: "تثبيت التطبيق الآمن",
            zh: "立即安装桌面客户端",
            ckb: "ئەپەکە دابەزێنە"
          }
        }
      ]
    }
  ];

  // 4. Create the sections and items in order
  for (let i = 0; i < canonicalTypes.length; i++) {
    const sectionDef = canonicalTypes[i];
    const registryInfo = CANONICAL_SECTION_REGISTRY[sectionDef.type];

    const section = await prisma.pageSection.create({
      data: {
        pageId: homePage.id,
        type: sectionDef.type,
        name: sectionDef.name,
        displayOrder: i + 1,
        visibility: "visible",
        config: JSON.stringify(registryInfo?.defaultConfig || {}),
        styleOverride: JSON.stringify({}),
        localeOverride: JSON.stringify({}),
        status: "published",
        createdBy: "system_seeder",
        updatedBy: "system_seeder"
      }
    });

    // Create Items
    for (let j = 0; j < sectionDef.items.length; j++) {
      const it = sectionDef.items[j];
      await prisma.sectionItem.create({
        data: {
          sectionId: section.id,
          title: JSON.stringify(it.title || {}),
          subtitle: JSON.stringify(it.subtitle || {}),
          body: JSON.stringify(it.body || {}),
          image: it.image || null,
          imageAlt: JSON.stringify({ en: sectionDef.name, ar: sectionDef.name, zh: sectionDef.name, ckb: sectionDef.name }),
          ctaLabel: JSON.stringify(it.ctaLabel || {}),
          ctaHref: it.ctaHref || null,
          displayOrder: j + 1,
          visibility: "visible",
          status: "published",
          createdBy: "system_seeder",
          updatedBy: "system_seeder"
        }
      });
    }

    // Create Initial Baseline Revision
    await prisma.sectionRevision.create({
      data: {
        sectionId: section.id,
        snapshot: JSON.stringify({
          section,
          itemsCount: sectionDef.items.length,
          type: sectionDef.type,
          displayOrder: i + 1
        }),
        actorId: "system_seeder",
        action: "seed_baseline"
      }
    });
  }

  // Record audit log
  await prisma.auditLog.create({
    data: {
      userEmail: "system_seeder@iraqi-chineseagency.com",
      action: "SEED_COMPOSITION_ENGINE",
      resource: "PageSection",
      itemId: homePage.id,
      details: "Seeded default HomePage with 15 Canonical Sections and items"
    }
  });

  console.log("[CompositionSeeder] Successfully seeded Page, PageSection, SectionItem, SectionTemplate, SectionRevision!");
}

export async function seedTemplatesOnly() {
  const existingTemplates = await prisma.sectionTemplate.count();
  if (existingTemplates > 0) return;

  const types = Object.keys(CANONICAL_SECTION_REGISTRY) as CanonicalSectionType[];
  for (const typeKey of types) {
    const reg = CANONICAL_SECTION_REGISTRY[typeKey];
    await prisma.sectionTemplate.create({
      data: {
        slug: `template_${typeKey}`,
        type: typeKey,
        name: JSON.stringify(reg.name),
        description: JSON.stringify(reg.description),
        defaultConfig: JSON.stringify(reg.defaultConfig),
        status: "active"
      }
    });
  }
  console.log(`[CompositionSeeder] Seeded ${types.length} canonical SectionTemplates.`);
}
