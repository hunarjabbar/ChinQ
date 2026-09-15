
import { prisma } from "./db.js";

export async function seedBricsTopics() {
  const count = await prisma.bricsTopic.count();
  if (count > 0) return;

  console.log("🌱 Seeding BRICS topics...");

  const topics = [
    {
      slug: "iraq-potential-brics-accession",
      titleEn: "Strategic Analysis: Iraq's Potential Accession to BRICS+",
      titleAr: "تحليل استراتيجي: انضمام العراق المحتمل إلى بريكس+",
      titleZh: "战略分析：伊拉克加入金砖国家+的潜力",
      titleCkb: "شیکردنەوەی ستراتیژی: ئەگەری پەیوەندیکردنی عێراق بە برێکس+",
      summaryEn: "Iraq explores the economic benefits of joining the BRICS+ alliance to diversify global partnerships.",
      summaryAr: "العراق يستكشف الفوائد الاقتصادية للانضمام إلى تحالف بريكس+ لتنويع الشراكات العالمية.",
      summaryZh: "伊拉克正在探索加入金砖国家+联盟的经济利益，以实现全球伙伴关系的多元化。",
      summaryCkb: "عێراق سوودە ئابوورییەکانی پەیوەندیکردن بە هاوپەیمانی برێکس+ دەکۆڵێتەوە بۆ هەمەجۆرکردنی هاوبەشییە جیهانییەکان.",
      contentEn: "As the BRICS alliance expands, Iraq's strategic position as a major energy producer and its growing ties with China and Russia place it in a unique position for potential membership. This study examines the fiscal implications and geopolitical shifts required for such a transition.",
      contentAr: "مع توسع تحالف بريكس، فإن موقع العراق الاستراتيجي كمنتج رئيسي للطاقة وعلاقاته المتنامية مع الصين وروسيا يضعه في موقع فريد للعضوية المحتملة. تبحث هذه الدراسة في الآثار المالية والتحولات الجيوسياسية المطلوبة لهذا الانتقال.",
      contentZh: "随着金砖国家联盟的扩大，伊拉克作为主要能源生产国的战略地位及其与中国和俄罗斯日益增长的联系使其在潜在成员资格方面处于独特地位。本研究探讨了这种转变所需的财政影响和地缘政治转变。",
      contentCkb: "لەگەڵ فراوانبوونی هاوپەیمانی برێکس، پێگەی ستراتیژی عێراق وەک بەرهەمهێنەرێکی سەرەکی وزە و پەیوەندییە گەشەسەندووەکانی لەگەڵ چین و ڕوسیا دەیخاتە پێگەیەکی بێوێنە بۆ ئەندامێتی ئەگەری. ئەم توێژینەوەیە لێکەوتە داراییەکان و گۆڕانکارییە جیۆپۆلیتیکییە پێویستەکان بۆ گواستنەوەیەکی لەو شێوەیە دەخاتە ڕوو.",
      imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1200",
      category: "GEOPOLITICS",
      isFeatured: true,
      order: 1
    },
    {
      slug: "brics-alternative-payment-systems-iraq",
      titleEn: "BRICS Alternative Payment Systems: Implications for the Iraqi Dinar",
      titleAr: "أنظمة الدفع البديلة لبريكس: تداعياتها على الدينار العراقي",
      titleZh: "金砖国家替代支付系统：对伊拉克第纳尔的影响",
      titleCkb: "سیستەمە جێگرەوەکانی پارەدانی برێکس: کاریگەرییەکانی لەسەر دیناری عێراقی",
      summaryEn: "Examining the integration of mBridge and BRICS Pay within the Iraqi financial landscape.",
      summaryAr: "فحص تكامل mBridge و BRICS Pay داخل المشهد المالي العراقي.",
      summaryZh: "探讨 mBridge 和 BRICS Pay 在伊拉克金融领域中的整合。",
      summaryCkb: "تاوتوێکردنی تێکەڵکردنی mBridge و BRICS Pay لە چوارچێوەی ژینگەی دارایی عێراقدا.",
      contentEn: "With the global trend toward de-dollarization, BRICS members are developing cross-border payment systems that bypass traditional networks. Iraq, as a key partner in the Belt and Road Initiative, is positioned to benefit from these financial innovations to stabilize the Dinar and facilitate direct trade with China.",
      contentAr: "مع التوجه العالمي نحو إلغاء الدولار، يعمل أعضاء بريكس على تطوير أنظمة دفع عبر الحدود تتجاوز الشبكات التقليدية. العراق، كشريك رئيسي في مبادرة الحزام والطريق، في وضع يسمح له بالاستفادة من هذه الابتكارات المالية لاستقرار الدينار وتسهيل التجارة المباشرة مع الصين.",
      contentZh: "随着全球去美元化趋势，金砖国家成员正在开发绕过传统网络的跨境支付系统向。伊拉克作为“一带一路”倡议的关键伙伴，有能力从这些金融创新中受益，以稳定第纳尔并促进与中国的直接贸易。",
      contentCkb: "لەگەڵ ئاراستەی جیهانی بەرەو نادۆلارکردن، ئەندامانی برێکس سیستەمی پارەدانی سنووربەزێن پەرەپێدەدەن کە تۆڕە تەقلیدییەکان تێدەپەڕێنن. عێراق، وەک هاوبەشێکی سەرەکی لە دەستپێشخەری پشتێن و ڕێگا، لە پێگەیەکدایە کە سوود لەم داهێنانە داراییانە وەربگرێت بۆ سەقامگیرکردنی دینار و ئاسانکاری بازرگانی ڕاستەوخۆ لەگەڵ چین.",
      imageUrl: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=1200",
      category: "FINANCE",
      isFeatured: true,
      order: 2
    },
    {
      slug: "iraq-china-energy-security-brics",
      titleEn: "Energy Sovereignty: Iraq's Role in BRICS+ Resource Security",
      titleAr: "سيادة الطاقة: دور العراق في أمن موارد بريكس+",
      titleZh: "能源主权：伊拉克在金砖国家+资源安全中的角色",
      titleCkb: "سەروەری وزە: ڕۆڵی عێراق لە ئاسایشی سەرچاوەکانی برێکس+",
      summaryEn: "How Iraq's vast energy reserves are becoming a cornerstone of the BRICS+ strategic resource pool.",
      summaryAr: "كيف تصبح احتياطيات الطاقة الهائلة في العراق حجر الزاوية في مجمع الموارد الاستراتيجية لبريكس+.",
      summaryZh: "伊拉克巨大的能源储备如何成为金砖国家+战略资源池的基石。",
      summaryCkb: "چۆن یەدەگی زەبەلاحی وزەی عێراق دەبێتە بەردی بناغەی کۆمەڵەی سەرچاوە ستراتیژییەکانی برێکس+.",
      contentEn: "Iraq's inclusion in BRICS+ discussions highlights its importance in global energy security. By aligning with BRICS+ nations, Iraq can secure long-term technology transfers and infrastructure investment in its oil and gas sectors.",
      contentAr: "يسلط انضمام العراق إلى مناقشات بريكس+ الضوء على أهميته في أمن الطاقة العالمي. من خلال التوافق مع دول بريكس+، يمكن للعراق تأمين نقل التكنولوجيا على المدى الطويل والاستثمار في البنية التحتية في قطاعات النفط والغاز.",
      contentZh: "伊拉克参与金砖国家+讨论凸显了其在全球能源安全中的重要性。通过与金砖国家+成员结盟，伊拉克可以确保其石油和天然气行业的长期技术转让和基础设施投资。",
      contentCkb: "بەشداربوونی عێراق لە گفتوگۆکانی برێکس+ تیشک دەخاتە سەر گرنگییەکەی لە ئاسایشی وزەی جیهانیدا. بە هاوتەریب بوون لەگەڵ نەتەوەکانی برێکس+، عێراق دەتوانێت گواستنەوەی تەکنەلۆژیا و وەبەرهێنانی ژێرخان لە کەرتەکانی نەوت و گازدا بۆ ماوەیەکی درێژ دەستەبەر بکات.",
      imageUrl: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1200",
      category: "ENERGY",
      isFeatured: true,
      order: 3
    },
    {
      slug: "mbridge-integration-iraqi-banking",
      titleEn: "mBridge Integration: Modernizing the Iraqi Banking Corridor",
      titleAr: "تكامل mBridge: تحديث ممر الخدمات المصرفية العراقي",
      titleZh: "mBridge 集成：伊拉克银行走廊的现代化",
      titleCkb: "تێکهەڵکێشکردنی mBridge: مۆدێرنکردنی ڕێڕەوی بانکی عێراقی",
      summaryEn: "A deep dive into the technical implementation of mBridge for direct IQD to E-CNY settlement.",
      summaryAr: "تعمق في التنفيذ التقني لـ mBridge لتسوية مباشرة من الدينار العراقي إلى اليوان الرقمي الصيني.",
      summaryZh: "深入探讨 mBridge 在第纳尔对数字人民币直接结算中的技术实现。",
      summaryCkb: "قووڵبوونەوە لە جێبەجێکردنی تەکنیکی mBridge بۆ یەکلاکردنەوەی ڕاستەوخۆی دینار بۆ یوانی دیجیتاڵی چینی.",
      contentEn: "The mBridge platform is revolutionizing how Iraq conducts trade with China. By using central bank digital currencies, the platform reduces transaction costs and settlement times, providing a secure alternative to SWIFT.",
      contentAr: "تحدث منصة mBridge ثورة في كيفية إجراء العراق للتجارة مع الصين. من خلال استخدام العملات الرقمية للمصارف المركزية، تقلل المنصة من تكاليف المعاملات وأوقات التسوية، مما يوفر بديلاً آمناً لـ SWIFT.",
      contentZh: "mBridge 平台正在彻底改变伊拉克与中国的贸易方式。通过使用央行数字货币，该平台降低了交易成本并缩短了结算时间，为 SWIFT 提供了一个安全的替代方案。",
      contentCkb: "پلاتفۆرمی mBridge شۆڕشێک لە چۆنیەتی ئەنجامدانی بازرگانی عێراق لەگەڵ چین دروست دەکات. بە بەکارهێنانی دراوە دیجیتاڵییەکانی بانکە ناوەندییەکان، پلاتفۆرمەکە تێچووی مامەڵەکان و کاتی یەکلاکردنەوە کەم دەکاتەوە.",
      imageUrl: "https://images.unsplash.com/photo-1518183275089-c437a0228e04?auto=format&fit=crop&q=80&w=1200",
      category: "FINANCE",
      isFeatured: true,
      order: 4
    }
  ];

  for (const topic of topics) {
    await prisma.bricsTopic.upsert({
      where: { slug: topic.slug },
      update: topic,
      create: topic,
    });
  }

  console.log("✅ BRICS topics seeded.");
}
