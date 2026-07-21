import { useState, useEffect, useRef } from 'react';
import { Locale } from '../types';
import { cn } from '../lib/utils';
import { ADDITIONAL_TOPICS } from '../data/topics';
import { 
  X, Briefcase, TrendingUp, MapPin, Globe, FileText, Menu, 
  Lock, Unlock, Mail, Check, Copy, Activity, FileCheck, 
  BarChart2, ArrowUpRight, ArrowDownRight, Compass, Building, Calendar,
  Sparkles, Radio, Search, Loader2, AlertCircle, BookOpen,
  Coins, Scale, Handshake
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Project {
  id: string;
  nameEn: string;
  nameAr: string;
  nameZh: string;
  nameCkb: string;
  locationEn: string;
  locationAr: string;
  locationZh: string;
  locationCkb: string;
  progress: number;
  investment: string;
  statusEn: string;
  statusAr: string;
  statusZh: string;
  statusCkb: string;
  logFeed: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'faw-port',
    nameEn: 'Grand Faw Port Infrastructure',
    nameAr: 'البنية التحتية لميناء الفاو الكبير',
    nameZh: '大港法奥港基础设施项目',
    nameCkb: 'بنیادنانی بەندەری فاو-ی گەورە',
    locationEn: 'Basra Governorate',
    locationAr: 'محافظة البصرة',
    locationZh: '巴士拉省',
    locationCkb: 'پارێزگای بەسرە',
    progress: 82,
    investment: 'IQD 6.4 Trillion',
    statusEn: 'Tunneling & Berth Laying',
    statusAr: 'وضع الأرصفة وحفر الأنفاق',
    statusZh: '隧道与码头铺设阶段',
    statusCkb: 'قۆناغی لێدانی تونێل و ڕاخستنی بەندەر',
    logFeed: [
      'Steel consignments cleared custom checkpoint at Safwan.',
      'Undersea tunnel excavation has reached 90% benchmark.',
      'Sino-Iraqi joint engineering committee approved Stage 1 dry dock certification.'
    ]
  },
  {
    id: 'maysan-gas',
    nameEn: 'Maysan Oilfield Associated Gas Capture',
    nameAr: 'استثمار الغاز المصاحب في حقل ميسان',
    nameZh: '米桑油田伴生气回收项目',
    nameCkb: 'کۆکردنەوەی گازی هاوپێچ لە کێڵگەی مەیان',
    locationEn: 'Amara, Maysan',
    locationAr: 'العمارة، ميسان',
    locationZh: '米桑省阿马拉',
    locationCkb: 'عەمارە، مەیان',
    progress: 54,
    investment: 'IQD 2.7 Trillion',
    statusEn: 'Desulfurization Unit Installation',
    statusAr: 'تركيب وحدة إزالة الكبريت',
    statusZh: '脱硫装置安装阶段',
    statusCkb: 'دامەزراندنی یەکەی لادانی کبریت',
    logFeed: [
      'Pre-fabricated compressor rigs delivered from Tianjin Port.',
      'Environmental impact audit passed by Iraqi Ministry of Oil.',
      'Grid connection trials scheduled for late Q3 2026.'
    ]
  },
  {
    id: 'samawa-solar',
    nameEn: 'Samawa 750MW Photovoltaic Solar Field',
    nameAr: 'حقل السماوة للطاقة الشمسية بقوة 750 ميغاواط',
    nameZh: '萨马瓦750兆瓦光伏太阳能电站',
    nameCkb: 'کێڵگەی سۆلاری ٧٥٠ مێگاواتی سەماوە',
    locationEn: 'Muthanna Desert',
    locationAr: 'صحراء المثنى',
    locationZh: '穆萨纳省沙漠地区',
    locationCkb: 'دەشتی موسەننا',
    progress: 19,
    investment: 'IQD 1.1 Trillion',
    statusEn: 'Geotechnical Soil Consolidation',
    statusAr: 'معالجة وتدعيم التربة الجيوتقنية',
    statusZh: '地质勘测与土壤固化阶段',
    statusCkb: 'قۆناغی جێگیرکردنی جیۆتەکنیکی خاک',
    logFeed: [
      'Sino-Hydro surveying crews finalized layout mapping.',
      'Boundary fencing completed to secure sub-station zone.',
      'Initial shipment of bifacial solar trackers landed in Basra.'
    ]
  }
];

const CORRESPONDENCE_PRESETS = [
  {
    id: 'partnership',
    titleEn: 'Strategic Venture & Partnership Proposal',
    titleAr: 'مقترح شراكة وتحالف استراتيجي',
    titleZh: '战略合资与伙伴关系提案',
    titleCkb: 'پێشنیازی هاوبەشی ستراتیژی',
    letterEn: (company: string, field: string, rep: string) => `Subject: Letter of Intent for Strategic Collaboration in ${field}

Dear Board of Directors,

We, ${company || '[Your Enterprise Name]'}, officially represent strategic investment interest in the upcoming Bilateral Sino-Iraqi Development Forum. Guided by representative ${rep || '[Your Representative Name]'}, we extend this formal invitation to discuss joint investment structures, long-term trade clearing, and logistical integrations.

Our technical capabilities in ${field || 'Industrial Engineering'} match the dynamic requirements of the regional master plans. We look forward to confirming an executive bilateral session at your earliest convenience.

Sincerely,
${rep || '[Representative Name]'}
Director of Bilateral Relations, ${company || '[Company Name]'}`,

    letterAr: (company: string, field: string, rep: string) => `الموضوع: خطاب نوايا للتعاون الاستراتيجي المشترك في مجال ${field}

السادة أعضاء مجلس الإدارة المحترمين،

نحن، شركة ${company || '[اسم شركتكم المحترمة]'}، نتقدم رسمياً للتعبير عن اهتمامنا الاستثماري ضمن منتدى التطوير العراقي الصيني المشترك. بقيادة ممثلنا المفوض السيد ${rep || '[اسم الممثل الكريم]'}، نسعد بتقديم هذه الدعوة الرسمية لبحث أطر التمويل المشترك وتسهيل التبادل التجاري ودمج سلاسل الإمداد.

إن خبراتنا وقدراتنا الفنية في قطاع ${field || 'الهندسة والتطوير'} تتطابق بشكل وثيق مع الخطط الشاملة الطموحة في المنطقة. نتطلع إلى تأكيد موعد لعقد جلسة ثنائية رفيعة المستوى في أقرب فرصة مناسبة.

وتفضلوا بقبول فائق الاحترام والتقدير،
${rep || '[اسم الممثل الموقر]'}
مدير العلاقات الثنائية، ${company || '[اسم الشركة]'}`,

    letterZh: (company: string, field: string, rep: string) => `主题：关于在${field}领域开展战略合作的意向书

敬启者（董事会）：

我们，${company || '[贵公司名称]'}，在此正式表达在即将举行的中伊双边发展论坛中的战略投资意向。在我们的全权代表${rep || '[代表姓名]'}先生/女士的倡导下，我们致此公函，旨在探讨合资投资架构、长期贸易结算以及物流一体化。

我们在${field || '工业与工程'}方面的技术优势与本地区总体发展规划的动态需求高度契合。我们期待能在贵方方便之日尽早举行双边高级闭门会谈。

顺致商祺，
${rep || '[代表姓名]'}
双边关系事务总监，${company || '[公司名称]'}`
  },
  {
    id: 'customs',
    titleEn: 'Logistics Corridor Tariff Exemption Inquiry',
    titleAr: 'طلب استيضاح الإعفاءات الجمركية لممر الشحن',
    titleZh: '关于物流通道关税减免政策的问询函',
    titleCkb: 'داواکاری جێبەجێکردنی لێخۆشبوونی گومرگی',
    letterEn: (company: string, field: string, rep: string) => `Subject: Request for Official Clarification on Tariff Exemptions for Belt & Road Materials

To the Directorate of Customs & Trade Facilitation,

On behalf of ${company || '[Your Logistics Group]'}, active in ${field || 'Infrastructure Logistics'}, we formally request a definitive ruling regarding customs tariff exemptions. Under the bilateral maritime corridor treaties, we seek clarification on duties applied to heavy equipment and raw components imported for active Sino-Iraqi joint ventures.

We request your guidance on the fast-track clearance protocol to ensure timely delivery and minimize project delays.

Sincerely,
${rep || '[Representative Name]'}
Logistics Coordinator, ${company || '[Company Name]'}`,

    letterAr: (company: string, field: string, rep: string) => `الموضوع: طلب إيضاح رسمي بخصوص الإعفاءات الجمركية لمواد مبادرة الحزام والطريق

إلى مديرية الجمارك وتسهيل التجارة المحترمين،

نيابة عن شركة ${company || '[مجموعتكم اللوجستية]'}، العاملة في مجال ${field || 'الخدمات اللوجستية للبنية التحتية'}، نتقدم بطلب رسمي للحصول على توضيح بخصوص الإعفاءات من الرسوم الجمركية. بموجب اتفاقيات الممر البحري الثنائي، نلتمس توضيحاً للرسوم المفروضة على المعدات الثقيلة والمكونات الخام المستوردة للمشاريع المشتركة.

نتطلع لطلب توجيهاتكم الكريمة بخصوص بروتوكول التخليص السريع لضمان جودة وسرعة التوريد.

وتفضلوا بقبول فائق التقدير،
${rep || '[اسم الممثل]'}
منسق العمليات اللوجستية، ${company || '[اسم الشركة]'}`,

    letterZh: (company: string, field: string, rep: string) => `主题：关于“一带一路”建设物资关税减免政策的官方澄清请求

致伊拉克海关与贸易便利化管理局：

我司 ${company || '[贵方物流集团]'} 正致力于 ${field || '基础设施物流'} 领域的建设。现代表公司正式提交申请，恳请贵局就现行海关关税减免政策予以明确澄清。根据中伊双边海上通道协定，我们希望明确用于中伊合资项目建设的重型设备及原材料进口关税税率。

为确保物资及时送达并最大程度减少项目延误，恳请贵局就快速清关绿色通道予以指导。

顺致商祺，
${rep || '[代表姓名]'}
物流事务协调官，${company || '[公司名称]'}`
  }
];

const BRIEFS = [
  {
    id: 'finance',
    category: 'finance',
    titleEn: 'IQD-CNY Swaps: Sovereign Cleared Channel Approved',
    titleAr: 'مقاصة الدنانير واليوان: اعتماد قناة تسوية سيادية',
    titleZh: '中伊本币清算：主权直接结算通道获批',
    titleCkb: 'ئاڵوگۆڕی دینار-یوان: پەسەندکردنی کەناڵی سیادی',
    date: 'July 15, 2026',
    author: 'Sino-Iraqi Finance Observatory',
    summaryEn: 'Deep-dive analysis on the recent bilateral sovereign currency clearing mechanism designed to bypass intermediary currencies for major energy transactions.',
    summaryAr: 'تحليل معمق حول آلية المقاصة السيادية المعتمدة حديثاً بين البنكين المركزيين لتجنب استخدام عملات وسيطة في تسوية صفقات الطاقة الكبرى.',
    summaryZh: '深入解析近期中伊两国中央银行批准的主权本币直接清算结算机制，该机制旨在绕过中间货币进行大宗能源交易结算。',
    summaryCkb: 'شیکردنەوەی قووڵ لەسەر میکانیزمی نوێی ئاڵوگۆڕی دراو بەبێ ناوبەندەکان بۆ تێچووی وزە.',
    fullContentEn: `In an unprecedented shift in geopolitical finance, the Central Bank of Iraq and the People’s Bank of China have finalized the sovereign settlement framework. From Q4 2026, 35% of crude exports from Basra will be cleared directly in Renminbi (RMB), which will flow into dedicated development capital reserves in Beijing to fund Iraqi civil works and technology acquisitions.

Key Impacts:
1. Reduction in Transaction Friction: Importers bypass USD/IQD hedging fees, saving an estimated 3.8% on capital overhead.
2. Sovereign Infrastructure Fund: Renminbi balances will directly collateralize large-scale grid developments managed by Sino-Hydro.
3. Liquidity Guarantees: Iraq establishes a liquid buffer of CNY to stabilize raw material procurement, mitigating global supply shocks.`,
    fullContentAr: `في تحول غير مسبوق في المشهد المالي الجيوسياسي، وضع البنك المركزي العراقي وبنك الشعب الصيني اللمسات الأخيرة على إطار التسوية السيادية. بدءاً من الربع الرابع لعام 2026، ستتم تسوية 35% من صادرات النفط الخام من البصرة مباشرة باليوان الصيني، على أن تصب العوائد في صندوق رأسمال استثماري مخصص في بكين لتمويل مشاريع البنية التحتية والمدنية العراقية.

أبرز النتائج الاستراتيجية:
1. تقليص تكاليف التبادل: يتجنب المستوردون رسوم التحوط للدولار، مما يوفر حوالي 3.8% من التكاليف الرأسمالية.
2. تمويل استراتيجي مباشر: ستستخدم أرصدة اليوان كضمانات مباشرة لمشاريع الشبكة الكهربائية العملاقة التي تديرها شركة سينوهايدرو الصينية.
3. استقرار سلاسل الإمداد: يوفر للعراق رصيداً نقدياً من اليوان لضمان استمرارية توريد المواد الأولية وتجنب صدمات التضخم العالمي.`,
    fullContentZh: `地缘金融格局迎来史诗级巨变：伊拉克中央银行与中国人民银行已正式签署主权直接结算框架协议。自2026年第四季度起，巴士拉出口原油的35%将直接以人民币（RMB）进行清算结算。该笔资金将流入设立于北京的专项发展资本储备账户，直接用于资助伊拉克的民生工程和引进中国先进技术。

核心研判：
1. 显著降低交易磨损：进出口商无需进行美元对冲，预计可节省3.8%的财务资本性支出。
2. 主权基建专项基金：积累的人民币余额将直接作为抵押，由中国电建等大型中企承建伊拉克的大型电网改造升级工程。
3. 流动性安全边际提升：伊拉克建立了充足的人民币流动性缓冲区，可直接向中国采购高科技原材料，抵御全球供应链震荡。`,
    fullContentCkb: `لە گۆڕانکارییەکی بێوێنە لە دارایی جیۆپۆلیتیکیدا، بانکی ناوەندی عێراق و بانکی گەلی چین چوارچێوەی یەکلاکردنەوەی دراوی نیشتمانییان کۆتایی پێهێنا. لە چارەکی چوارەمی ٢٠٢٦ەوە، ٣٥٪ی هەناردەی نەوتی خاو لە بەسرە ڕاستەوخۆ بە یوان پاک دەکرێتەوە، کە دەڕژێتە ناو یەدەگی سەرمایەی گەشەپێدانی تایبەت لە پەکین بۆ دابینکردنی تێچووی کارە مەدەنییەکانی عێراق و کڕینی تەکنەلۆجیا.

کاریگەرییە سەرەکییەکان:
١. کەمکردنەوەی لێکخشاندنی مامەڵەکان: هاوردەکاران کرێی پاراستنی دۆلار تێدەپەڕێنن.
٢. سندوقی ژێرخانی سەروەری: هاوسەنگییەکانی یوان ڕاستەوخۆ دەبنە بارمتەی گەشەپێدانی تۆڕی کارەبایی گەورە لەلایەن سینۆ-هایدرۆوە.
٣. گەرەنتی نەختینەیی: عێراق یەدەگێکی نەختینەیی لە CNY دادەمەزرێنێت بۆ جێگیرکردنی کڕینی کەرەستەی خاو.`
  },
  {
    id: 'investment',
    category: 'investment',
    titleEn: 'Al-Faw Port Infrastructure: Strategic Terminals Groundbreaking',
    titleAr: 'ميناء الفاو الكبير: بدء وضع حجر الأساس للأرصفة والأنفاق الاستراتيجية',
    titleZh: '法奥港大宗基建：战略码头与干船坞项目破土动工',
    titleCkb: 'بەندەری فاو: دەستپێکردنی قۆناغی سەرەکی ژێرخانی بەندەری فاو',
    date: 'June 28, 2026',
    author: 'Sino-Iraqi Maritime Council',
    summaryEn: 'An in-depth update on the dry dock progress and deepwater berths engineered by China Harbour Engineering Company (CHEC).',
    summaryAr: 'تحديث شامل حول تقدم العمل في الحوض الجاف والأرصفة العميقة التي تنفذها الشركة الصينية لهندسة الموانئ (CHEC).',
    summaryZh: '由中国港湾工程有限责任公司（CHEC）承建的深水码头及第一阶段干船坞进展全面技术盘点。',
    summaryCkb: 'نوێکردنەوەی قووڵ لەسەر پێشکەوتنی حەوزی وشک و لەنگەرگا قووڵەکان لەلایەن کۆمپانیای CHEC ی چینییەوە.',
    fullContentEn: `The grand maritime vision of Al-Faw is rapidly materializing under joint Iraqi-Sino supervision. CHEC engineers successfully finalized the underwater testing for Berth 3, establishing a secure anchorage template for ultra-large container vessels.

Key Engineering Metrics:
1. Draft Depth: 19.5 meters, enabling accommodation of Post-Panamax container liners.
2. Breakwater Integrity: East breakwater successfully resisted high-amplitude tide tests.
3. Logistics Linkage: Connects directly with the basra express-artery rail project.`,
    fullContentAr: `تتحقق الرؤية البحرية الكبرى لميناء الفاو بسرعة تحت إشراف عراقي صينية مشترك. نجح مهندسو CHEC في إنهاء الاختبارات المائية للرصيف رقم 3، مما يمهد الطريق لرسو سفن الحاويات العملاقة بأمان.

المؤشرات الهندسية الأساسية:
1. غاطس عميق: 19.5 مترًا، مما يسمح باستيعاب ناقلات الحاويات الضخمة من فئة بوست-بانامكس.
2. كاسر الأمواج: نجح كاسر الأمواج الشرقي في اجتياز اختبارات المد والجزر الشديدة بنجاح.
3. الترابط اللوجستي: يتصل الميناء مباشرة بمشروع السكك الحديدية الشرياني السريع للبصرة.`,
    fullContentZh: `在伊拉克和中国的共同监管下，法奥港客观的海洋愿景正迅速转化为现实。中国港湾（CHEC）的工程师成功完成了3号码头的下水水深测试，为超大型集装箱货轮的进港和安全靠泊建立了可靠的指标。

核心工程指标：
1. 航道吃水深度：达19.5米，完全具备接待超巴拿马型集装箱班轮的停靠能力。
2. 防波堤稳固性：东部防波堤成功通过了高振幅极端潮汐的水压与波浪抗阻测试。
3. 物流互联互通：港口区与巴士拉快速铁路干线项目实现无缝衔接。`,
    fullContentCkb: `حەوزی دەریایی گەورەی فاو بە خێرایی لەژێر چاودێری هاوبەشی عێراق-چین دەبێتە ڕاستی. ئەندازیارانی CHEC بە سەرکەوتوویی تاقیکردنەوەی ژێر ئاویان بۆ لەنگەرگای ژمارە ٣ تەواو کرد، کە ڕێگە خۆش دەکات بۆ ڕاگرتنی کەشتییە بارهەڵگرە زلهێزەکان.

پێوەرە ئەندازیارییە سەرەکییەکان:
١. قووڵی ئاوەکە: ١٩.٥ مەترە، کە ڕێگە بە کەشتییە زۆر گەورەکان دەدات ڕابوەستن.
٢. بەربەستی شەپۆلەکان: بەربەستی ڕۆژهەڵات بە سەرکەوتوویی تاقیکردنەوەی شەپۆلە بەهێزەکانی تێپەڕاند.
٣. پەیوەندی لۆجیستی: بە شێوەیەکی ڕاستەوخۆ بە پڕۆژەی هێڵی ئاسنی خێرای بەسرەوە دەبەسترێتەوە.`
  },
  {
    id: 'iraqi-business',
    category: 'iraqi-business',
    titleEn: 'Basra Free Trade Zone Expansion: Fast-track Corporate Registrations',
    titleAr: 'توسعة المنطقة الحرة بالبصرة: تسجيل سريع للشركات الاستثمارية المشتركة',
    titleZh: '巴士拉自由贸易区扩建：开通中资及合资企业快速登记注册通道',
    titleCkb: 'فراوانکردنی ناوچەی ئازادی بەسرە: تۆمارکردنی خێرای کۆمپانیاکان',
    date: 'May 10, 2026',
    author: 'Iraq Ministry of Trade Facilitation',
    summaryEn: 'Comprehensive updates on the newly introduced legal procedures that expedite enterprise licensing for collaborative industrial ventures.',
    summaryAr: 'تحديثات شاملة حول الإجراءات القانونية الجديدة التي تسرع ترخيص الشركات الصناعية والمشروعات المشتركة.',
    summaryZh: '关于新出台的、旨在缩短中伊合资及中资工业实体营业执照核发流程的法律程序与政策要点。',
    summaryCkb: 'نوێکردنەوەی گشتگیر لەسەر ڕێکارە یاساییە نوێیەکان کە مۆڵەتی خێرا دەدەن بە پڕۆژە هاوبەشە پیشەسازییەکان.',
    fullContentEn: `The Basra Free Trade Zone Authority has rolled out an automated single-window enterprise registration system designed for cooperative entities. Companies operating in logistics, warehousing, or manufacturing can complete regulatory filings within 48 hours.

Bilateral Incentives:
1. 100% Repatriation of Capital: Zero restrictions on direct outbound transfers.
2. Corporate Tax Exemption: 15-year statutory holiday on joint venture corporate profits.
3. One-Stop Visas: Fast-track visa clearances for corporate executives and engineering cohorts.`,
    fullContentAr: `أطلقت هيئة المناطق الحرة في البصرة نظام تسجيل الشركات الآلي عبر النافذة الواحدة والمصمم خصيصاً للشركات المشتركة. يمكن للشركات العاملة في اللوجستيات أو التخزين أو التصنيع إكمال متطلبات الترخيص والتسجيل في غضون 48 ساعة فقط.

الحوافز الاستثمارية الثنائية:
1. إرسال الأرباح بنسبة 100%: إعفاء كامل وقيود صفرية على التحويلات المالية الخارجية المباشرة.
2. إعفاء من ضريبة الشركات: إجازة ضريبية قانونية لمدة 15 عاماً على أرباح المشاريع المشتركة.
3. تأشيرات سريعة: تسهيلات وإعفاءات لتأشيرات المدراء التنفيذيين والكوادر الهندسية.`,
    fullContentZh: `巴士拉自由贸易区管理局正式推出针对中伊合作实体的全自动“单一窗口”企业登记注册系统。凡从事跨境物流、现代化保税仓储、或高端装备制造业的合作实体，现在可在48小时内极速完成全部行政审批和证照核发。

双边专属政策优惠：
1. 100%资本金与利润汇出：免除对外直接汇款的一切金融外汇限制，利润无忧回国。
2. 企业所得税豁免：合资或外商独资企业自盈利起，依法享有15年的所得税免税期（Tax Holiday）。
3. 一站式签证绿色通道：为中国高管及专业工程师团队提供72小时内下发的快捷工作居留许可。`,
    fullContentCkb: `دەستەی ناوچەی ئازادی بەسرە سیستەمێکی ئۆتۆماتیکی یەک پەنجەرەیی بۆ تۆمارکردنی کۆمپانیاکان ڕاگەیاندووە کە بۆ قەوارە هاوبەشەکان دیزاین کراوە. ئەو کۆمپانیایانەی لە بوارەکانی لۆجیستی، عەمبارکردن، یان پیشەسازیدا کار دەکەن دەتوانن لە ماوەی ٤٨ کاتژمێردا مۆڵەتەکانیان تەواو بکەن.

پێشنیارە هاوبەشەکان:
١. هێنانەوەی ١٠٠٪ی سەرمایە: هیچ سنووردارکردنێک لەسەر گواستنەوەی ڕاستەوخۆ نییە.
٢. لێخۆشبوونی باجی کۆمپانیاکان: لێخۆشبوونی یاسایی باج بۆ ماوەی ١٥ ساڵ لەسەر قازانجی کۆمپانیا هاوبەشەکان.
٣. ڤیزەی یەک وێستگەیی: ڤیزەی خێرا بۆ بەڕێوەبەران و ئەندازیاران.`
  },
  {
    id: 'laws',
    category: 'laws',
    titleEn: 'Foreign Direct Investment Bylaws & Customs Tariff Update',
    titleAr: 'لوائح الاستثمار الأجنبي المباشر وتحديث التعرفة الجمركية',
    titleZh: '中伊双边外商直接投资（FDI）实施细则与关税税率调整',
    titleCkb: 'یاساکانی وەبەرهێنانی ڕاستەوخۆی بیانی و نوێکردنەوەی باج',
    date: 'April 05, 2026',
    author: 'Supreme Trade Council Advisory',
    summaryEn: 'An exhaustive regulatory guide outlining custom fee waivers on heavy industrial machinery and pre-fabricated building units.',
    summaryAr: 'دليل تنظيمي شامل يوضح تفاصيل الإعفاءات من الرسوم الجمركية على الآلات الصناعية الثقيلة والوحدات مسبقة الصنع.',
    summaryZh: '关于重型工业机械设备和特种预制件进口税费免除政策的官方政策解读。',
    summaryCkb: 'ڕێنماییەکی ڕێکخستنی گشتگیر کە تێیدا لێخۆشبوونی گومرگی لەسەر ئامێرە پیشەسازییە قورسەکان ڕوونکراوەتەوە.',
    fullContentEn: `Pursuant to Article 8 of the Joint Strategic Trade Pact, custom duties are officially set at 0% for heavy machinery, specialized excavators, and construction assemblies imported through recognized channels.

Regulatory Requirements:
1. Audited Equipment Bill of Lading: Cargo must be documented and filed with the Ministry of Planning.
2. End-use Compliance Stamping: Documentation showing alignment with designated municipal reconstruction or civil projects is mandatory.`,
    fullContentAr: `بموجب المادة 8 من اتفاقية التجارة الاستراتيجية المشتركة، تم تحديد الرسوم الجمركية رسمياً بنسبة 0% على الآلات الثقيلة، والحفارات المتخصصة، والقطع الهيكلية مسبقة الصنع المستوردة عبر القنوات المعتمدة.

الاشتراطات التنظيمية الأساسية:
1. بوليصة شحن المعدات المعتمدة: يجب توثيق الشحنة وتسجيلها لدى وزارة التخطيط مسبقاً.
2. تدقيق الاستخدام النهائي للمعدات: يُشترط تقديم وثيقة تثبت استخدام المواد في مشاريع إعادة الإعمار المدنية أو البلدية المصنفة كصديقة للتنمية.`,
    fullContentZh: `根据《中伊联合战略贸易协定》第8条之规定，凡通过官方清关口岸进口、服务于中伊合作框架内的大型工程重卡、高精度挖掘设备、及特种建筑预制装配构件，其进口关税一律下调至0%。

合规流程要点：
1. 经审计的物资设备提单注册：进口货物提单必须提前向伊拉克规划部进行电子注册并获得批复。
2. 最终用途合规核验印章：进口企业必须出具书面证明，证实该进口设备物资完全用于指定的双边民生重建或基础设施重点工程项目。`,
    fullContentCkb: `بەپێی ماددەی ٨ لە ڕێککەوتنی بازرگانی ستراتیژی هاوبەش، باجی گومرگی بە شێوەیەکی فەرمی بە ڕێژەی ٠٪ دانراوە بۆ ئامێرە قورسەکان، حفارە تایبەتەکان، و کەرەستە پیشەسازییەکانی تر کە لە ڕێگەی سەرچاوە فەرمییەکانەوە هاوردە دەکرێن.

داواکارییە فەرمییەکان:
١. بڕوانامەی هاوردەکردنی ئامێرەکان: دەبێت بارەکە بە فەرمی لەلایەن وەزارەتی پلاندانانەوە تۆمار بکرێت.
٢. مۆری بەکارهێنانی کۆتایی: بەڵگەنامەیەک کە پیشان بدات ئەم کەرەستەیە لە پڕۆژەی بنیادنانەوە بەکاردێت پێویستە.`
  },
  {
    id: 'cooperation',
    category: 'cooperation',
    titleEn: 'Baghdad-Beijing Academic Summit: Technological and AI Alliances',
    titleAr: 'قمة بغداد-بكين الأكاديمية: تحالفات تكنولوجية وأبحاث الذكاء الاصطناعي المشتركة',
    titleZh: '巴格达-北京学术峰会：联合建立人工智能与石化新能源技术研发基地',
    titleCkb: 'لووتکەی ئەکادیمی بەغداد-پەکین: هاوپەیمانی تەکنەلۆجی و زیرەکی دەستکرد',
    date: 'March 14, 2026',
    author: 'Bilateral Science & Technology Forum',
    summaryEn: 'Details on the academic and technology exchange pact between Al-Nahrain University and Tsinghua University focusing on AI and grid modeling.',
    summaryAr: 'تفاصيل حول اتفاقية التبادل الأكاديمي والتكنولوجي الموقعة بين جامعة النهرين وجامعة تسينغهوا للتعاون في مجالات الذكاء الاصطناعي ونمذجة شبكات الطاقة.',
    summaryZh: '伊拉克纳赫赖恩大学与中国清华大学签署全面学术与前沿技术交流协议，共同聚焦人工智能与未来智能电网建模研究。',
    summaryCkb: 'زانیاری لەسەر ڕێککەوتنی ئاڵوگۆڕی ئەکادیمی و تەکنەلۆجی لە نێوان زانکۆی نەهرەین و زانکۆی سینگهوای چینی.',
    fullContentEn: `Al-Nahrain University in Baghdad and Tsinghua University in Beijing have finalized a comprehensive bilateral academic partnership. Under the framework, a state-of-the-art joint laboratory will be established in Baghdad to specialize in machine learning models for optimizing Basra petroleum refinery outputs and modern smart electric grid distribution.

Key Elements:
1. Joint Scholar Placement: 50 Iraqi graduate engineers to study at Tsinghua starting September 2026.
2. Joint Lab Infrastructure: Funded by leading Chinese high-tech partners, bringing high-performance computing clusters to Al-Nahrain.
3. Industry Alignment: The laboratory will serve as an advisory hub for the Ministry of Oil and Ministry of Electricity.`,
    fullContentAr: `أعلنت جامعة النهرين في بغداد وجامعة تسينغهوا في بكين عن توقيع شراكة أكاديمية ثنائية شاملة. بموجب هذا الإطار، سيتم إنشاء مختبر مشترك متطور في بغداد متخصص في تطوير نماذج تعلم الآلة لتحسين إنتاجية مصافي النفط بالبصرة وتحسين كفاءة توزيع شبكات الكهرباء الذكية الحديثة.

أبرز بنود الاتفاقية:
1. التبادل العلمي للباحثين: إيفاد 50 باحثاً عراقياً من تخصصات الهندسة والعلوم للدراسة والأبحاث في جامعة تسينغهوا اعتباراً من سبتمبر 2026.
2. البنية التحتية للمختبر: سيتم تمويل الأجهزة والشبكات الفائقة من قبل شركاء التكنولوجيا الصينيين البارزين لتقديم أحدث الخوادم لجامعة النهرين.
3. دعم القطاع الوطني: سيعمل المختبر كمركز استشاري تكنولوجي يدعم وزارتي النفط والكهرباء في تحسين الكفاءة التشغيلية.`,
    fullContentZh: `位于巴格达的伊拉克纳赫赖恩大学与北京的清华大学正式签署了全面双边学术伙伴关系协议。根据该合作框架，双方将在巴格达联合组建一座世界级的前沿科技实验室，专门研发用于巴士拉炼油厂产能优化及未来智能化电网电力分配的机器学习算法模型。

核心合作板块：
1. 联合培养与学者派遣：自2026年9月起，首批50名伊拉克优秀青年工程师将赴清华大学进行硕士及博士阶段深造。
2. 实验室硬件建设：由中国顶尖科技巨头联合赞助，为纳赫赖恩大学提供高性能计算集群及AI开发服务器套件。
3. 产业对接与应用：实验室将作为伊拉克石油部及电力部的国家级技术顾问中心，提供实时数字孪生及AI决策辅助支持。`,
    fullContentCkb: `زانکۆی نەهرەین لە بەغداد و زانکۆی سینگهوا لە پەکین هاوبەشییەکی ئەکادیمی گشتگیریان واژۆ کردووە. لەم چوارچێوەیەدا، تاقیگەیەکی پێشکەوتووی هاوبەش لە بەغداد دادەمەزرێت کە تایبەت دەبێت بە زیرەکی دەستکرد بۆ باشترکردنی دەرئەنجامەکانی پاڵاوگەی نەوتی بەسرە و تۆڕی کارەبای زیرەک.

خاڵە سەرەکییەکان:
١. ئاڵوگۆڕی خوێندکاران: ٥٠ ئەندازیاری عێراقی لە زانکۆی سینگهوا دەخوێنن لە ئەیلوولی ٢٠٢٦ەوە.
٢. ژێرخانی تاقیگە: لەلایەن هاوبەشە تەکنەلۆجییە گەورەکانی چینەوە دابین دەکرێت کە کۆمپیوتەری زۆر خێرا پێشکەش بە زانکۆی نەهرەین دەکات.
٣. هاوتەريبکردنی پیشەسازی: تاقیگەکە وەک ناوەندێکی ڕاوێژکاری بۆ وەزارەتی نەوت و کارەبا کار دەکات.`
  },
  {
    id: 'faw-customs',
    titleEn: 'Basra Logistics Corridor: Customs Tariff Exemptions 2026',
    titleAr: 'ممر البصرة اللوجستي: الإعفاءات والتعرفات الجمركية 2026',
    titleZh: '巴士拉物流通道：2026年海关关税免税指引',
    titleCkb: 'ڕێڕەوی لۆجیستی بەسرە: لێخۆشبوونی باج ٢٠٢٦',
    date: 'June 28, 2026',
    author: 'Silk Road Customs Advisory',
    summaryEn: 'Comprehensive guide covering tariff exemptions on high-tech machinery, prefabricated assemblies, and green transport vehicles.',
    summaryAr: 'دليل شامل يغطي الإعفاءات الضريبية الممنوحة للمعدات التكنولوجية المتطورة، والمنشآت مسبقة الصنع، ووسائل النقل الصديقة للبيئة.',
    summaryZh: '涵盖高新技术机械、预制组合件、以及绿色运输工具进口关税减免政策的全面实操指南。',
    summaryCkb: 'ڕێنمایی گشتگیر بۆ لێخۆشبوونی گومرگی لەسەر ئامێرە تەکنەلۆجییەکان.',
    fullContentEn: `The joint Iraq-China Tariff Accord provides standard exemptions for equipment directly aligned with major Belt and Road initiatives. Under Article 14, standard import duties on all high-precision telemetry, tunnel boring segments, and structural steel intended for the Basra port networks are reduced to 0%.

Practical Advice:
- Companies must secure a certificate of origin stamped by both the Ministry of Commerce in Baghdad and the commercial counselor in Beijing.
- Logistics providers are encouraged to submit cargo manifests 10 days prior to arrival at Faw port to utilize the dedicated green-lane customs checkpoints.`,
    fullContentAr: `يوفر الاتفاق العراقي الصيني المشترك للتعرفة الجمركية إعفاءات واسعة للمعدات المرتبطة مباشرة بمشاريع الحزام والطريق. بموجب المادة 14، تم خفض الرسوم الجمركية على جميع أجهزة الملاحة الدقيقة، وأجزاء حفر الأنفاق العملاقة، والحديد الهيكلي المتوجه لشبكة ميناء البصرة إلى 0%.

توجيهات عملية للمستثمرين:
- يجب على الشركات الحصول على شهادة منشأ مصدقة من وزارة التجارة في بغداد والملحق التجاري العراقي في بكين.
- يُنصح مزودو اللوجستيات بتقديم بيانات الشحن مسبقاً قبل 10 أيام من الوصول لميناء الفاو للاستفادة من البوابات الجمركية السريعة.`,
    fullContentZh: `中伊联合关税协定为直接服务于一带一路核心基建的进口设备提供了全方位的关税豁免。根据该协定第14条，所有针对巴士拉大港水陆网建设的高精度遥测仪、隧道掘进构件以及高强度结构钢的进口基本关税已降至0%。

企业实务指引：
- 相关企业必须向巴格达贸易部以及中国驻巴格达商务参赞处申请双重盖章的原产地证明文件。
- 物流服务商应在货物运抵法奥港前10天在线提交电子货运舱单，以充分利用中企专属的“绿色通关”快速审核通道。`,
    fullContentCkb: `ڕێککەوتنی هاوبەشی گومرگی عێراق-چین لێخۆشبوونی گومرگی دابین دەکات بۆ ئەو کەرەستە پیشەسازییانەی کە بۆ پڕۆژەی پشتوێن و ڕێگا دێنە ناو وڵاتەوە. بەپێی ماددەی ١٤، باجی سەر هەموو جۆرە ئامێرێکی هەڵکۆڵین و ئاسن و کەرەستەی بیناسازی بۆ بەندەری بەسرە کەمکراوەتەوە بۆ ٠٪.`
  }
];

export function EnterpriseSidebar({ lang }: { lang: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'topics' | 'market' | 'projects' | 'b2b' | 'briefs'>('topics');
  
  // Market Ticker Rates State
  const [rates, setRates] = useState({
    sbmfr: 3450,
    crude: 74.20,
    silkIndex: 114.22,
    iqdcny: 215.40
  });

  // B2B state
  const [selectedPreset, setSelectedPreset] = useState(CORRESPONDENCE_PRESETS[0].id);
  const [companyName, setCompanyName] = useState('');
  const [businessField, setBusinessField] = useState('');
  const [representative, setRepresentative] = useState('');
  const [copied, setCopied] = useState(false);

  // Briefs State
  const [unlockedBriefs, setUnlockedBriefs] = useState<string[]>([]);
  const [activeBrief, setActiveBrief] = useState<typeof BRIEFS[0] | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [unlockError, setUnlockError] = useState('');

  // Projects State
  const [selectedProject, setSelectedProject] = useState<Project | null>(PROJECTS[0]);

  // Simulate price changes for realism
  useEffect(() => {
    const timer = setInterval(() => {
      setRates(prev => ({
        sbmfr: prev.sbmfr + Math.floor((Math.random() - 0.5) * 40),
        crude: Number((prev.crude + (Math.random() - 0.5) * 0.4).toFixed(2)),
        silkIndex: Number((prev.silkIndex + (Math.random() - 0.5) * 0.15).toFixed(2)),
        iqdcny: Number((prev.iqdcny + (Math.random() - 0.5) * 0.3).toFixed(2))
      }));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const isRtl = lang === 'ar' || lang === 'ckb';

  const [sidebarWidth, setSidebarWidth] = useState(420);

  useEffect(() => {
    const handleResize = () => {
      setSidebarWidth(Math.min(420, window.innerWidth));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Toggle open
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    // Reset temporary error messages when opening/closing
    setUnlockError('');
  };

  // Copy B2B Letter in three languages
  const copyB2BLetter = () => {
    const preset = CORRESPONDENCE_PRESETS.find(p => p.id === selectedPreset);
    if (!preset) return;

    const fullLetter = `CHINQ ENTERPRISE SUITE - BILATERAL CORRESPONDENCE DRAFT
--------------------------------------------------------------
[ENGLISH]
${preset.letterEn(companyName, businessField, representative)}

==============================================================
[العربية]
${preset.letterAr(companyName, businessField, representative)}

==============================================================
[中文]
${preset.letterZh(companyName, businessField, representative)}`;

    navigator.clipboard.writeText(fullLetter).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Unlock Strategic Briefing
  const handleUnlockBrief = (id: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      setUnlockError(
        lang === 'ar' ? 'يرجى إدخال بريد إلكتروني صالح للمؤسسة' : 
        lang === 'zh' ? '请输入有效的企业电子邮箱' : 
        lang === 'ckb' ? 'تکایە ئیمەیڵێکی دروست بنووسە' : 
        'Please enter a valid corporate email address'
      );
      return;
    }
    setUnlockedBriefs(prev => [...prev, id]);
    setUnlockError('');
    setEmailInput('');
  };

  const getLocalizedProject = (p: Project) => {
    return {
      name: lang === 'ar' ? p.nameAr : lang === 'zh' ? p.nameZh : lang === 'ckb' ? p.nameCkb : p.nameEn,
      location: lang === 'ar' ? p.locationAr : lang === 'zh' ? p.locationZh : lang === 'ckb' ? p.locationCkb : p.locationEn,
      status: lang === 'ar' ? p.statusAr : lang === 'zh' ? p.statusZh : lang === 'ckb' ? p.statusCkb : p.statusEn
    };
  };

  const selectedPresetObj = CORRESPONDENCE_PRESETS.find(p => p.id === selectedPreset);

  const transitionConfig = { duration: 0.25, ease: "easeOut" as const };

  return (
    <>
      {/* ENTERPRISE SIDEBAR TRIGGER TOP CORNER HAMBURGER */}
      <motion.div 
        onClick={toggleSidebar}
        animate={{ 
          x: isOpen ? (isRtl ? sidebarWidth : -sidebarWidth) : 0,
        }}
        transition={transitionConfig}
        className={cn(
          "fixed top-4 z-50 bg-[#990000] hover:bg-[#770000] text-white p-3 rounded-md shadow-lg flex items-center justify-center cursor-pointer border border-[#990000]/20 group select-none hover:scale-105 active:scale-95",
          isRtl ? "left-4" : "right-4"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-90" />
        ) : (
          <Menu className="w-6 h-6 text-white transition-transform duration-300" />
        )}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black z-40 backdrop-blur-xs"
            />

            {/* Sidebar Main Panel */}
            <motion.div 
              initial={{ 
                x: isRtl ? '-100%' : '100%',
                opacity: 0.9
              }}
              animate={{ 
                x: 0,
                opacity: 1
              }}
              exit={{ 
                x: isRtl ? '-100%' : '100%',
                opacity: 0.9
              }}
              transition={transitionConfig}
              style={{ 
                width: sidebarWidth
              }}
              className={cn(
                "fixed top-0 bottom-0 max-w-full bg-[#FAFAFA] border-[#111111]/15 shadow-2xl z-50 flex flex-col h-screen overflow-hidden",
                isRtl ? "left-0 border-r" : "right-0 border-l"
              )}
            >
              {/* Header */}
              <div className="p-5 bg-white border-b border-[#111111]/10 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                  <div className="w-6 h-6 rounded-xs bg-[#990000] flex items-center justify-center text-white font-serif font-bold text-xs shadow-sm">
                    Q
                  </div>
                  <div>
                    <h2 className="text-xs font-black uppercase tracking-wider text-[#111111]">
                      {lang === 'ar' ? 'بوابة شينك للمؤسسات' : lang === 'zh' ? 'CHINQ 企业套件' : lang === 'ckb' ? 'شینک ئینتەرپرایز' : 'ChinQ Enterprise Suite'}
                    </h2>
                    <p className="text-[9px] text-[#990000] font-bold uppercase tracking-widest mt-0.5">
                      Bilateral Trade & Intelligence Portal
                    </p>
                  </div>
                </div>
                <button 
                  onClick={toggleSidebar}
                  className="p-1 rounded-xs border border-transparent hover:border-[#111111]/20 hover:bg-neutral-50 text-[#111111] transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-[#111111]/10 text-[10px] font-bold uppercase tracking-wider bg-white shrink-0">
                <button 
                  onClick={() => { setActiveTab('topics'); setActiveBrief(null); }}
                  className={cn(
                    "flex-1 py-3 text-center border-b-2 cursor-pointer transition-colors flex flex-col items-center gap-1",
                    activeTab === 'topics' ? "border-[#990000] text-[#990000]" : "border-transparent text-gray-500 hover:text-[#111111]"
                  )}
                >
                  <Menu className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'الأقسام' : lang === 'zh' ? '分类' : lang === 'ckb' ? 'بەشەکان' : 'Topics'}</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('market'); setActiveBrief(null); }}
                  className={cn(
                    "flex-1 py-3 text-center border-b-2 cursor-pointer transition-colors flex flex-col items-center gap-1",
                    activeTab === 'market' ? "border-[#990000] text-[#990000]" : "border-transparent text-gray-500 hover:text-[#111111]"
                  )}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'المؤشرات' : lang === 'zh' ? '指数' : lang === 'ckb' ? 'مۆدێلەکان' : 'Indices'}</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('projects'); setActiveBrief(null); }}
                  className={cn(
                    "flex-1 py-3 text-center border-b-2 cursor-pointer transition-colors flex flex-col items-center gap-1",
                    activeTab === 'projects' ? "border-[#990000] text-[#990000]" : "border-transparent text-gray-500 hover:text-[#111111]"
                  )}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'المشاريع' : lang === 'zh' ? '项目' : lang === 'ckb' ? 'پڕۆژەکان' : 'Projects'}</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('b2b'); setActiveBrief(null); }}
                  className={cn(
                    "flex-1 py-3 text-center border-b-2 cursor-pointer transition-colors flex flex-col items-center gap-1",
                    activeTab === 'b2b' ? "border-[#990000] text-[#990000]" : "border-transparent text-gray-500 hover:text-[#111111]"
                  )}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'الخطابات' : lang === 'zh' ? '公文' : lang === 'ckb' ? 'نامەکان' : 'Letters'}</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('briefs'); }}
                  className={cn(
                    "flex-1 py-3 text-center border-b-2 cursor-pointer transition-colors flex flex-col items-center gap-1",
                    activeTab === 'briefs' ? "border-[#990000] text-[#990000]" : "border-transparent text-gray-500 hover:text-[#111111]"
                  )}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'التقارير' : lang === 'zh' ? '简报' : lang === 'ckb' ? 'ڕاپۆرتەکان' : 'Briefs'}</span>
                </button>
              </div>

              {/* Dynamic Scrolling Body Content */}
              <div className="flex-grow overflow-y-auto p-5 space-y-6 text-start">
                
                
                {/* 0. TOPICS (NEW) */}
                {activeTab === 'topics' && (
                  <div className="animate-fadeIn">
                    <div className="border-b-2 border-black pb-2 mb-4">
                      <h3 className="font-serif font-black text-2xl tracking-tight text-black">Sections</h3>
                    </div>
                    <div className="flex flex-col">
                      {[
                        { label: lang === 'ar' ? 'سياسة' : lang === 'zh' ? '政治' : lang === 'ckb' ? 'سیاسەت' : 'Politics', slug: 'politics', desc: 'Diplomacy & Government' },
                        { label: lang === 'ar' ? 'اقتصاد' : lang === 'zh' ? '经济' : lang === 'ckb' ? 'ئابووری' : 'Economy', slug: 'economy', desc: 'Markets & Trade' },
                        { label: lang === 'ar' ? 'طاقة' : lang === 'zh' ? '能源' : lang === 'ckb' ? 'وزە' : 'Energy', slug: 'energy', desc: 'Oil, Gas & Renewables' },
                        { label: lang === 'ar' ? 'مبادرة الحزام والطريق' : lang === 'zh' ? '一带一路' : lang === 'ckb' ? 'پشتوێن و ڕێگا' : 'Belt & Road', slug: 'belt-road', desc: 'Infrastructure & Deals' },
                        { label: lang === 'ar' ? 'تكنولوجيا' : lang === 'zh' ? '科技' : lang === 'ckb' ? 'تەکنەلۆژیا' : 'Technology', slug: 'technology', desc: 'Innovation & Tech' },
                        { label: lang === 'ar' ? 'ثقافة' : lang === 'zh' ? '文化' : lang === 'ckb' ? 'کالچەر' : 'Culture', slug: 'culture', desc: 'Arts & Society' },
                        { label: lang === 'ar' ? 'آراء' : lang === 'zh' ? '观点' : lang === 'ckb' ? 'بۆچوون' : 'Opinion', slug: 'opinion', desc: 'Editorials & Voices' },
                        { label: lang === 'ar' ? 'الذكاء الاصطناعي' : lang === 'zh' ? '人工智能' : lang === 'ckb' ? 'زیرەکی دەستکرد' : 'AI', slug: 'ai', desc: 'Artificial Intelligence' },
                        { label: lang === 'ar' ? 'الأغذية والمشروبات' : lang === 'zh' ? '餐饮' : lang === 'ckb' ? 'خۆراک و خواردنەوە' : 'Food & Beverage', slug: 'food-beverage', desc: 'Culinary Industry' },
                        { label: lang === 'ar' ? 'معرض' : lang === 'zh' ? '博览会' : lang === 'ckb' ? 'پێشانگا' : 'Expo', slug: 'expo', desc: 'Trade Fairs' },
                        { label: lang === 'ar' ? 'إحصاءات الأعمال' : lang === 'zh' ? '商业统计' : lang === 'ckb' ? 'ئاماری بازرگانی' : 'Business Statistics', slug: 'business-statistics', desc: 'Market Data' },
                        ...ADDITIONAL_TOPICS.map(topic => ({
                          label: lang === 'ar' ? topic.nameAr : lang === 'zh' ? topic.nameZh : lang === 'ckb' ? topic.nameCkb : topic.nameEn,
                          slug: topic.slug,
                          desc: lang === 'ar' ? topic.descAr : lang === 'zh' ? topic.descZh : lang === 'ckb' ? topic.descCkb : topic.descEn
                        }))
                      ].map((c, i) => (
                        <a 
                          key={i} 
                          href={`/${lang}/category/${c.slug}`} 
                          className="flex flex-col py-3 border-b border-gray-200 hover:bg-neutral-50 transition-colors group cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-bold text-lg text-black group-hover:text-[#990000]">{c.label}</span>
                            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#990000]" />
                          </div>
                          <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mt-1">{c.desc}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* 1. MARKET DATA INDICES */}
                {activeTab === 'market' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="bg-white border border-[#111111]/10 p-4 rounded-xs">
                      <div className="flex items-center justify-between mb-3 border-b border-[#111111]/5 pb-2">
                        <h4 className="text-[10px] font-black uppercase text-[#111111] flex items-center">
                          <Activity className="w-3 h-3 text-[#990000] me-1.5" />
                          Silk Road Freight & Commodity Futures
                        </h4>
                        <span className="text-[8px] bg-red-100 text-[#990000] px-1.5 py-0.5 font-bold uppercase rounded-xs">Real-time</span>
                      </div>

                      {/* INDICES ROWS */}
                      <div className="space-y-3.5">
                        
                        {/* Shanghai-Basra Freight Rate */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[10px] font-bold text-[#111111]">Shanghai-Basra Cargo Surcharge (SBMFR)</div>
                            <div className="text-[9px] text-gray-500 font-mono">Ocean spot index per 40ft High-Cube FEU</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono font-bold text-xs text-[#111111]">${rates.sbmfr.toLocaleString()}</div>
                            <div className="text-[9px] font-bold text-emerald-600 flex items-center justify-end">
                              <ArrowUpRight className="w-2.5 h-2.5" />
                              <span>+1.7%</span>
                            </div>
                          </div>
                        </div>

                        {/* Basra Heavy Crude Oil */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[10px] font-bold text-[#111111]">Basra Heavy Oil Crude Index</div>
                            <div className="text-[9px] text-gray-500 font-mono">BHP sovereign contract pricing</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono font-bold text-xs text-[#111111]">${rates.crude}</div>
                            <div className="text-[9px] font-bold text-red-600 flex items-center justify-end">
                              <ArrowDownRight className="w-2.5 h-2.5" />
                              <span>-0.4%</span>
                            </div>
                          </div>
                        </div>

                        {/* ChinQ Silk Road Integration Index */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[10px] font-bold text-[#111111]">ChinQ Silk Road Integration Index (SRIX)</div>
                            <div className="text-[9px] text-gray-500 font-mono">Aggregate bilateral liquidity flow score</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono font-bold text-xs text-[#111111]">{rates.silkIndex} pt</div>
                            <div className="text-[9px] font-bold text-emerald-600 flex items-center justify-end">
                              <ArrowUpRight className="w-2.5 h-2.5" />
                              <span>+0.22%</span>
                            </div>
                          </div>
                        </div>

                        {/* IQD / CNY Cross Clearing Rate */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[10px] font-bold text-[#111111]">Dinar-Yuan Cross Direct Rate (IQD/CNY)</div>
                            <div className="text-[9px] text-gray-500 font-mono">Direct central sovereign swap rate</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono font-bold text-xs text-[#111111]">{rates.iqdcny}</div>
                            <div className="text-[9px] font-bold text-emerald-600 flex items-center justify-end">
                              <ArrowUpRight className="w-2.5 h-2.5" />
                              <span>+0.85%</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Premium Insights Alert */}
                    <div className="bg-amber-50 border border-amber-200/60 p-4 rounded-xs text-xs">
                      <h4 className="font-bold text-amber-800 mb-1 flex items-center gap-1.5 uppercase text-[10px]">
                        <Globe className="w-3.5 h-3.5" />
                        Bilateral Sovereign Trade Notice
                      </h4>
                      <p className="text-amber-900/80 leading-relaxed text-[11px]">
                        The Direct Renminbi Swap clearing corridor is operational. Transactions bypassing intermediary western reserves are fully exonerated from standard transactional brokerage tariffs.
                      </p>
                    </div>

                    {/* Simple Bar chart mockup */}
                    <div className="bg-white border border-[#111111]/10 p-4 rounded-xs">
                      <h4 className="text-[10px] font-black uppercase text-[#111111] mb-3">
                        Monthly Freight Volatility Trend (2026)
                      </h4>
                      <div className="h-28 flex items-end justify-between px-2 pt-2 gap-2">
                        {[40, 55, 48, 70, 85, 95].map((val, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center">
                            <div 
                              className={cn(
                                "w-full rounded-t-xs transition-all duration-1000",
                                i === 5 ? "bg-[#990000]" : "bg-neutral-300"
                              )} 
                              style={{ height: `${val}%` }}
                            ></div>
                            <span className="text-[8px] font-bold text-gray-500 mt-1.5">
                              {['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. BELT & ROAD PROJECTS TRACKER */}
                {activeTab === 'projects' && (
                  <div className="space-y-4 animate-fadeIn">
                    <p className="text-[11px] text-gray-600">
                      Monitor major energy grids, maritime, and gas investments funded through the bilateral investment agreements.
                    </p>

                    <div className="grid grid-cols-3 gap-2 shrink-0">
                      {PROJECTS.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setSelectedProject(p)}
                          className={cn(
                            "py-2 px-1 text-center border rounded-xs transition-all cursor-pointer text-[9px] font-bold uppercase",
                            selectedProject?.id === p.id 
                              ? "bg-[#990000] text-white border-[#990000] shadow-sm" 
                              : "bg-white text-gray-600 border-[#111111]/10 hover:border-[#111111]/30"
                          )}
                        >
                          {p.id === 'faw-port' ? 'Faw Port' : p.id === 'maysan-gas' ? 'Maysan Gas' : 'Samawa Solar'}
                        </button>
                      ))}
                    </div>

                    {selectedProject && (
                      <div className="bg-white border border-[#111111]/10 p-4 rounded-xs space-y-4">
                        {/* Project Heading */}
                        <div>
                          <span className="text-[9px] font-black text-[#990000] uppercase tracking-wider block mb-0.5">
                            Active Bilateral Initiative
                          </span>
                          <h3 className="font-serif text-base font-black leading-tight text-[#111111]">
                            {getLocalizedProject(selectedProject).name}
                          </h3>
                        </div>

                        {/* Location / Funding Details */}
                        <div className="grid grid-cols-2 gap-3 text-xs border-y border-[#111111]/5 py-2">
                          <div>
                            <span className="text-[8px] text-gray-500 font-bold uppercase block">Province / Location</span>
                            <span className="font-medium text-[#111111] flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-[#990000]" />
                              {getLocalizedProject(selectedProject).location}
                            </span>
                          </div>
                          <div>
                            <span className="text-[8px] text-gray-500 font-bold uppercase block">Investment Commitment</span>
                            <span className="font-medium text-emerald-700 font-mono mt-0.5 block">
                              {selectedProject.investment}
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div>
                          <div className="flex justify-between items-center text-[10px] font-bold mb-1">
                            <span className="text-[#111111] uppercase">Deployment Benchmark</span>
                            <span className="font-mono text-[#990000]">{selectedProject.progress}%</span>
                          </div>
                          <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden border border-[#111111]/5">
                            <div 
                              className="bg-gradient-to-r from-[#990000] to-red-500 h-full rounded-full transition-all duration-1000"
                              style={{ width: `${selectedProject.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Status Label */}
                        <div className="bg-[#FAFAFA] p-2.5 border border-[#111111]/5 rounded-xs text-[11px] leading-relaxed">
                          <span className="text-[8px] text-gray-500 font-bold uppercase block mb-0.5">Current Engineering Status</span>
                          <strong className="text-[#111111]">{getLocalizedProject(selectedProject).status}</strong>
                        </div>

                        {/* Real-time Project Log */}
                        <div>
                          <span className="text-[9px] font-black text-[#111111] uppercase tracking-wider block mb-2">
                            Bilateral Logistics Log
                          </span>
                          <ul className="space-y-2 text-[10px] text-gray-600 font-mono list-disc list-inside">
                            {selectedProject.logFeed.map((log, index) => (
                              <li key={index} className="leading-snug">
                                <span className="text-gray-400 me-1">►</span>
                                {log}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. TRILINGUAL B2B LETTER GENERATOR */}
                {activeTab === 'b2b' && (
                  <div className="space-y-4 animate-fadeIn">
                    <p className="text-[11px] text-gray-600">
                      Draft formal diplomatic and commercial correspondence between Chinese and Iraqi entities instantly with real-time field injection.
                    </p>

                    {/* Select Letter Type */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-[#111111]">Select Communication Template</label>
                      <select 
                        value={selectedPreset}
                        onChange={(e) => {
                          setSelectedPreset(e.target.value);
                          setCopied(false);
                        }}
                        className="w-full bg-white border border-[#111111]/15 px-3 py-2 text-xs rounded-xs font-medium text-[#111111] focus:outline-none focus:border-[#990000] cursor-pointer"
                      >
                        {CORRESPONDENCE_PRESETS.map((p) => (
                          <option key={p.id} value={p.id}>
                            {lang === 'ar' ? p.titleAr : lang === 'zh' ? p.titleZh : p.titleEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Input Variables */}
                    <div className="grid grid-cols-2 gap-3.5 bg-white border border-[#111111]/10 p-4 rounded-xs">
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold uppercase text-gray-500 block">Enterprise Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Al-Faw Logistics Co."
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full bg-[#FAFAFA] border border-[#111111]/15 px-2 py-1.5 text-xs rounded-xs focus:outline-none focus:border-[#990000]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold uppercase text-gray-500 block">Strategic Field / Sector</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Solar Energy Plant"
                          value={businessField}
                          onChange={(e) => setBusinessField(e.target.value)}
                          className="w-full bg-[#FAFAFA] border border-[#111111]/15 px-2 py-1.5 text-xs rounded-xs focus:outline-none focus:border-[#990000]"
                        />
                      </div>
                      <div className="col-span-2 space-y-1">
                        <label className="text-[8px] font-bold uppercase text-gray-500 block">Chief Representative Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Director General Al-Sabah"
                          value={representative}
                          onChange={(e) => setRepresentative(e.target.value)}
                          className="w-full bg-[#FAFAFA] border border-[#111111]/15 px-2 py-1.5 text-xs rounded-xs focus:outline-none focus:border-[#990000]"
                        />
                      </div>
                    </div>

                    {/* Preview Area (Trilingual letter excerpt) */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-black uppercase text-[#111111]">Draft Preview (Injected)</span>
                        <button 
                          onClick={copyB2BLetter}
                          className={cn(
                            "flex items-center gap-1.5 text-[10px] font-bold uppercase px-3 py-1 cursor-pointer border rounded-xs transition-all",
                            copied 
                              ? "bg-emerald-500 border-emerald-500 text-white" 
                              : "bg-white border-[#111111]/20 text-[#111111] hover:bg-neutral-50"
                          )}
                        >
                          {copied ? <FileCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copied ? 'Copied' : 'Copy Correspondence'}</span>
                        </button>
                      </div>

                      <div className="bg-white border border-[#111111]/10 p-4 rounded-xs h-48 overflow-y-auto font-mono text-[10px] space-y-4 text-gray-700 leading-normal whitespace-pre-wrap">
                        {selectedPresetObj && (
                          <>
                            <div className="border-b border-[#111111]/5 pb-2">
                              <span className="text-[8px] bg-red-100 text-[#990000] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-wider block w-fit mb-1">ENGLISH</span>
                              {selectedPresetObj.letterEn(companyName, businessField, representative)}
                            </div>
                            <div className="border-b border-[#111111]/5 pb-2 text-right" dir="rtl">
                              <span className="text-[8px] bg-red-100 text-[#990000] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-wider block w-fit mb-1 ml-auto">العربية</span>
                              {selectedPresetObj.letterAr(companyName, businessField, representative)}
                            </div>
                            <div className="pb-2">
                              <span className="text-[8px] bg-red-100 text-[#990000] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-wider block w-fit mb-1">中文</span>
                              {selectedPresetObj.letterZh(companyName, businessField, representative)}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. STRATEGIC INTELLIGENCE BRIEFS */}
                {activeTab === 'briefs' && (
                  <div className="space-y-4 animate-fadeIn">
                    {activeBrief ? (
                      /* Display Full Report Detail */
                      <div className="bg-white border border-[#111111]/10 p-5 rounded-xs space-y-4 animate-fadeIn">
                        <button 
                          onClick={() => setActiveBrief(null)}
                          className="text-[10px] font-bold uppercase tracking-wider text-[#990000] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          ← Back to Intelligence Feed
                        </button>

                        <div>
                          <span className="text-[8px] font-black text-[#990000] uppercase tracking-widest block mb-1">
                            Sovereign Analysis Draft
                          </span>
                          <h3 className="font-serif text-lg font-black leading-tight text-[#111111]">
                            {lang === 'ar' ? activeBrief.titleAr : lang === 'zh' ? activeBrief.titleZh : activeBrief.titleEn}
                          </h3>
                          <div className="flex items-center gap-2 mt-2 text-[9px] text-gray-500 font-bold uppercase">
                            <span>{activeBrief.date}</span>
                            <span>•</span>
                            <span>{activeBrief.author}</span>
                          </div>
                        </div>

                        <div className="prose prose-neutral max-w-none text-xs leading-relaxed text-gray-700 whitespace-pre-line border-t border-[#111111]/5 pt-4">
                          {lang === 'ar' ? activeBrief.fullContentAr : lang === 'zh' ? activeBrief.fullContentZh : activeBrief.fullContentEn}
                        </div>

                        <div className="bg-neutral-50 p-3 border border-dashed border-[#111111]/15 text-[10px] text-gray-500 text-center font-mono uppercase tracking-wider">
                          🔒 END OF HIGH CONFIDENTIALITY MEMO • CHINQ INTEL
                        </div>
                      </div>
                    ) : (
                      /* List of available briefs */
                      <div className="space-y-4">
                        <p className="text-[11px] text-gray-600">
                          Secure sovereign briefings and feasibility projections cleared for trade attachés, sovereign wealth delegates, and institutional partners.
                        </p>

                        <div className="space-y-3.5">
                          {BRIEFS.map((brief) => {
                            const isUnlocked = unlockedBriefs.includes(brief.id);
                            return (
                              <div 
                                key={brief.id} 
                                className="bg-white border border-[#111111]/10 p-4 rounded-xs relative group transition-all duration-300"
                              >
                                <div className="flex justify-between items-start gap-4 mb-2">
                                  <span className="text-[8px] font-black text-[#990000] uppercase tracking-wider">
                                    {brief.author}
                                  </span>
                                  <span className="text-[8px] text-gray-500 font-mono font-bold">
                                    {brief.date}
                                  </span>
                                </div>

                                <h4 className="font-serif text-sm font-bold text-[#111111] leading-snug group-hover:text-[#990000] transition-colors duration-200">
                                  {lang === 'ar' ? brief.titleAr : lang === 'zh' ? brief.titleZh : brief.titleEn}
                                </h4>

                                <p className="text-[11px] text-gray-500 leading-normal mt-2 line-clamp-2">
                                  {lang === 'ar' ? brief.summaryAr : lang === 'zh' ? brief.summaryZh : brief.summaryEn}
                                </p>

                                {/* Unlock action panel */}
                                <div className="mt-4 border-t border-[#111111]/5 pt-3.5 flex items-center justify-between">
                                  {isUnlocked ? (
                                    <button 
                                      onClick={() => setActiveBrief(brief)}
                                      className="text-[10px] bg-[#111111] hover:bg-[#990000] text-white font-bold uppercase tracking-wider px-3.5 py-1.5 cursor-pointer rounded-xs transition-colors flex items-center gap-1.5 shadow-sm"
                                    >
                                      <Unlock className="w-3.5 h-3.5 text-yellow-400" />
                                      <span>Read Sovereign Brief</span>
                                    </button>
                                  ) : (
                                    <div className="w-full">
                                      <form 
                                        onSubmit={(e) => handleUnlockBrief(brief.id, e)}
                                        className="flex gap-2"
                                      >
                                        <input 
                                          type="email" 
                                          required
                                          placeholder="Enter corporate email to unlock"
                                          value={emailInput}
                                          onChange={(e) => setEmailInput(e.target.value)}
                                          className="flex-grow bg-[#FAFAFA] border border-[#111111]/15 px-2.5 py-1 text-[10px] rounded-xs focus:outline-none focus:border-[#990000] font-mono text-gray-600"
                                        />
                                        <button 
                                          type="submit"
                                          className="text-[10px] bg-[#990000] hover:bg-[#770000] text-white font-bold uppercase px-3 py-1 cursor-pointer rounded-xs transition-all flex items-center gap-1 shrink-0"
                                        >
                                          <Lock className="w-3 h-3 text-yellow-400" />
                                          <span>Unlock</span>
                                        </button>
                                      </form>
                                      
                                      {unlockError && (
                                        <p className="text-[9px] text-red-600 font-bold mt-1.5 font-mono">
                                          ⚠ {unlockError}
                                        </p>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Sidebar Footer */}
              <div className="p-4 bg-neutral-50 border-t border-[#111111] text-center text-[9px] text-black font-bold tracking-widest shrink-0 uppercase">
                CHINQ INTELLIGENCE SERVICES • BEIJING / BAGHDAD
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
