import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialInsights = [
  // 1. Existing Lead Insight
  {
    slug: 'cbi-pboc-ecny-direct-settlement-corridor',
    category: 'Currency Markets',
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    author: 'Dr. Zaid Al-Hashemi, Head of Macroeconomic Research',
    featured: true,
    order: 1,
    publishedAt: new Date('2026-03-12T09:00:00Z'),
    titleEn: 'CBI & PBOC: Bilateral e-CNY Direct Settlement Corridor & Currency Swap Mechanics',
    titleAr: 'البنك المركزي العراقي وبنك الشعب الصيني: ممر التسوية المباشرة باليوان الرقمي وآليات مبادلة العملات',
    titleZh: '中伊央行数字人民币双边直接清算走廊与货币互换机制评估',
    titleCkb: 'بانکی ناوەندی عێراق و بانکی گەلی چین: ڕێڕەوی یەکلاکردنەوەی ڕاستەوخۆی یوان و گۆڕینەوەی دراو',
    summaryEn: 'An exhaustive analysis of the Central Bank of Iraq (CBI) and People\'s Bank of China (PBOC) settlement protocols, eliminating USD intermediary conversion fees and reducing transaction settlement windows from 4 days to 3.2 seconds.',
    summaryAr: 'تحليل شامل لبروتوكولات التسوية بين البنك المركزي العراقي وبنك الشعب الصيني، والتي تلغي رسوم التحويل بالدولار الوسيط وتختزل مدة التسوية من 4 أيام إلى 3.2 ثانية.',
    summaryZh: '深入分析伊拉克央行与中国人民银行最新双边清算协议，全面免除第三方美元中转兑换摩擦，将双边跨境支付结算周期从4个工作日缩短至3.2秒。',
    summaryCkb: 'شیکردنەوەیەکی گشتگیر بۆ پرۆتۆکۆلەکانی یەکلاکردنەوەی نێوان بانکی ناوەندی عێراق و بانکی گەلی چین کە تێچووی دۆلار کەمدەکاتەوە و کاتی گواستنەوە بۆ چەند چرکەیەک کورت دەکاتەوە.',
    bodyEn: `### Strategic Context of Bilateral De-Dollarization
Over the past twenty-four months, bilateral trade between the Republic of Iraq and the People's Republic of China has crossed $53 billion annually. Historically, over 88% of private Iraqi merchant remittances to Chinese suppliers in Yiwu, Guangzhou, and Shenzhen underwent compulsory conversion through New York Federal Reserve clearing correspondent accounts. This legacy pipeline subjected commercial invoices to 3–7 business day holding periods and cumulative FX spreads ranging from 2.8% to 4.1%.

Under the landmark framework enacted jointly by the Central Bank of Iraq (CBI) and the People's Bank of China (PBOC), the bilateral direct settlement corridor operates across authorized tier-1 Iraqi commercial banks and Chinese clearing institutions through the Cross-Border Interbank Payment System (CIPS) and the mBridge multi-CBDC protocol.

### Key Financial Mechanisms
1. **Direct Quotation Matrix**: The bilateral rate is determined directly by real-time interbank order books in Baghdad and Shanghai, bypassing third-currency synthetic crosses.
2. **e-CNY Digital Escrow**: Iraqi corporate importers deposit Iraqi Dinars (IQD) into onshore designated CBI escrow accounts, which trigger instantaneous e-CNY credit release to authenticated Chinese suppliers.
3. **Reserve Pool Backing**: The bilateral liquidity pool maintains 28.2 billion IQD and 150 million e-CNY reserve liquidity, guaranteed against counterparty defaults.`,
    bodyAr: `### الإطار الاستراتيجي للتسوية الثنائية
تجاوز حجم التبادل التجاري السنوي بين العراق والصين حاجز الـ 53 مليار دولار. يتيح ممر التسوية المباشر باليوان الرقمي تحويل الأموال فورا دون المرور بالدولار الأمريكي، مما يقلص تكلفة التحويل بنسبة 2.4% ويحقق تسوية نهائية خلال ثوان معدودة.`,
    bodyZh: `### 中伊双边清算体系的历史性演进
中伊两国双边贸易额近年已突破530亿美元。中伊央行通过数字人民币与mBridge多边央行数字货币桥直连，彻底消除美元中间兑换摩擦，重塑了双边资本清算图景。`,
    bodyCkb: `### ڕوانگەی ستراتیژی بۆ یەکلاکردنەوەی ڕاستەوخۆ
ئاڵوگۆڕی بازرگانی نێوان عێراق و چین گەیشتووەتە زیاتر لە 53 ملیار دۆلار. ڕێڕەوی ڕاستەوخۆی یوان تێچووی بازرگانان کەمدەکاتەوە و پارەدان خێراتر دەکات.`
  },

  // 2. Existing Infrastructure Insight
  {
    slug: 'basra-grand-port-development-road-financing',
    category: 'Infrastructure Finance',
    coverImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    author: 'ICA Infrastructure & Capital Advisory Board',
    featured: true,
    order: 2,
    publishedAt: new Date('2026-03-08T14:30:00Z'),
    titleEn: 'Basra Grand Port & Development Road: Evaluating $17B Sino-Iraqi Multi-Modal Logistics Financing',
    titleAr: 'ميناء الفاو الكبير وطريق التنمية: تقييم تمويل البنية التحتية واللوجستيات بقيمة 17 مليار دولار',
    titleZh: '大阿道大港与伊拉克发展之路：170亿美元中伊多式联运金融模式解析',
    titleCkb: 'بەندەری گەورەی فاو و ڕێگای گەشەپێدان: هەڵسەنگاندنی 17 ملیار دۆلار لە پڕۆژەی هاوبەشی ژێرخان',
    summaryEn: 'A deep dive into project finance tranches, sovereign EPC+F syndication models, and consortium guarantees driving the rail and highway corridor connecting the Persian Gulf to Mediterranean markets.',
    summaryAr: 'دراسة معمقة لشرائح التمويل الاستثماري، ونماذج الهندسة والشراء والبناء الممولة (EPC+F)، والضمانات السيادية التي تقود ممر السكك الحديدية والطرق السريعة.',
    summaryZh: '深入剖析联结海湾地区与地中海市场的“发展之路”干线网络，评估中资工程与政策性金融机构采用的EPC+F银团融资及主权信用保障结构。',
    summaryCkb: 'لێکۆڵینەوەیەک لەسەر بودجە و شێوازی دابینکردنی سەرمایە لەلایەن هاوبەشە چینی و عێراقییەکان بۆ هێڵی ئاسن و ڕێگاکانی بەستنەوەی کەنداو بە ئەوروپا.',
    bodyEn: `### Infrastructure Financing Architecture
The Iraqi Development Road initiative represents a generational $17-billion multi-modal transportation corridor connecting the Grand Faw Port in Basra to the Turkish border, opening a high-throughput freight artery to European consumption centers.`,
    bodyAr: `تمثل البنية المالية لمشروع طريق التنمية نموذجاً رائداً في تمويل مشاريع البنية التحتية الكبرى عبر تحالفات مصرفية صينية وعراقية مع ضمانات سيادية.`,
    bodyZh: `总投资额170亿美元的发展之路依托中资金融银团EPC+F带资承包模式，有效撬动多式联运国际大动脉。`,
    bodyCkb: `پڕۆژەی ڕێگای گەشەپێدان بە بەهای 17 ملیار دۆلار کەرتی گواستنەوەی عێراق دەگۆڕێت بە پاڵپشتی دارایی چین.`
  },

  // 3. Existing Trade Balance Insight
  {
    slug: 'iraq-china-trade-balance-2026-analysis',
    category: 'Trade Balance',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    author: 'ICA Bilateral Trade Observatory',
    featured: false,
    order: 3,
    publishedAt: new Date('2026-03-01T11:00:00Z'),
    titleEn: 'Bilateral Trade Balance: Hydrocarbon Export Dynamics and Non-Oil Chinese Industrial Imports',
    titleAr: 'الميزان التجاري الثنائي: ديناميكيات صادرات الطاقة وتدفق الواردات الصناعية الصينية',
    titleZh: '中伊双边贸易平衡深度研判：石油能源出口动向与高附加值工业品进口',
    titleCkb: 'تەرازووی بازرگانی نێوان عێراق و چین: هەناردەی نەوت و هاوردەی کەلوپەلی پیشەسازی',
    summaryEn: 'Quarterly review of commercial volume: crude shipments to ZhenHua and Sinopec, paired with surges in Chinese photovoltaic cells, heavy earthmoving equipment, and smart appliances arriving at Umm Qasr.',
    summaryAr: 'مراجعة دورية للتدفقات التجارية: شحنات النفط الخام إلى كبرى المصافي الصينية، مقابل نمو لافت في استيراد الألواح الشمسية والآلات الثقيلة عبر ميناء أم قصر.',
    summaryZh: '季度经贸大数据监测：伊拉克对华原油供应稳中有增，同时以高功率光伏电池板、重型工程机械与智能新能源乘用车为代表的高技术工业品出口伊拉克增速显著。',
    summaryCkb: 'پێداچوونەوەیەکی وەرزی بە قەبارەی بازرگانی: هەناردەی نەوتی عێراق بۆ چین و هاوردەکردنی ئامێری قورس، تەختەی وزەی خۆر، و ئۆتۆمبێلی چینی لە بەندەری ئوم قەسر.',
    bodyEn: `Iraq remains China's third-largest crude oil supplier, providing over 1.18 million barrels per day under long-term contracts.`,
    bodyAr: `يحتفظ العراق بمكانته كثالث أكبر مورد للنفط الخام إلى الصين بمتوسط 1.18 مليون برميل يومياً.`,
    bodyZh: `伊拉克位列中国三大原油供应国之一，双边贸易结构持续向高技术工业设备迈进。`,
    bodyCkb: `عێراق سێیەم گەورەترین دابینکەری نەوتە بۆ چین بە زیاتر لە یەک ملیۆن بەرمیل لە ڕۆژێکدا.`
  },

  // 4. Existing Policy & Regulation Insight
  {
    slug: 'mbridge-cips-financial-compliance-iraqi-banks',
    category: 'Policy & Regulation',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    author: 'Compliance & Regulatory Affairs Committee',
    featured: false,
    order: 4,
    publishedAt: new Date('2026-02-24T16:00:00Z'),
    titleEn: 'mBridge & CIPS Regulatory Framework: De-risking Trade Invoicing for Iraqi Commercial Banks',
    titleAr: 'الإطار التنظيمي لمنصة mBridge ونظام CIPS: تخفيض مخاطر الفواتير التجارية للمصارف العراقية',
    titleZh: '多边央行数字货币桥（mBridge）与CIPS合规准则：伊拉克商业银行合规指南',
    titleCkb: 'یاسا و ڕێساکانی mBridge و CIPS: کەمکردنەوەی مەترسییەکانی مامەڵەی بازرگانی بۆ بانکە عێراقییەکان',
    summaryEn: 'Guidelines for Iraqi financial institutions adopting ISO 20022 messaging standards, sanctions auditing protocols, and atomic settlement verification on distributed ledgers.',
    summaryAr: 'إرشادات تنظيمية للمؤسسات المالية العراقية لاعتماد معايير المراسلات المالية ISO 20022، وبروتوكولات تدقيق الامتثال، والتسوية اللحظية.',
    summaryZh: '针对伊拉克本土合规商业银行接入ISO 20022金融报文标准、跨境制裁核查合规路径及分布式账本原子清结算风控机制的深度实操建议。',
    summaryCkb: 'ڕێنمایی بۆ دامەزراوە داراییەکانی عێراق بۆ بەکارهێنانی ستانداردە نێودەوڵەتییەکانی ISO 20022 و دڵنیابوون لە دروستی یاسایی مامەڵە داراییەکان لەگەڵ چین.',
    bodyEn: `CIPS and mBridge establish verifiable compliance rails fulfilling FATF and Basel III supervisory standards.`,
    bodyAr: `توفر منصتا CIPS وmBridge مستويات شفافية مصرفية عليا تلبي متطلبات مكافحة غسل الأموال ومعايير بازل 3.`,
    bodyZh: `CIPS与mBridge系统为跨国银行提供了符合FATF国际反洗钱反恐融资标准的合规闭环。`,
    bodyCkb: `سیستەمی CIPS و mBridge گەرەنتی پارێزراوی یاسایی و خێرایی دەبەخشن بە بانکەکانی عێراق.`
  },

  // ==========================================
  // 10 NEW FINANCIAL INSIGHTS: CHINESE, HONG KONG, TAIWAN MARKETS
  // ==========================================

  // 5. Chinese Markets Insight: A-Shares & CSI 300
  {
    slug: 'china-a-shares-csi300-valuation-tech-rerating',
    category: 'Investment Analysis',
    coverImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    author: 'Greater China Equities & Quantitative Research Desk',
    featured: true,
    order: 5,
    publishedAt: new Date('2026-03-15T08:30:00Z'),
    titleEn: 'Chinese A-Share Markets: CSI 300 Valuation Re-Rating & Hard-Tech Sector Rotation',
    titleAr: 'أسواق الأسهم الصينية (فئة A): إعادة تقييم مؤشر CSI 300 وتدفقات السيولة نحو التكنولوجيا المتقدمة',
    titleZh: '中国A股市场全景研判：沪深300估值重塑与硬科技制造业结构性轮动',
    titleCkb: 'بازاڕی پشکەکانی چین: هەڵسەنگاندنی نوێ بۆ پێوەری CSI 300 و ڕاکێشانی سەرمایە بۆ تەکنەلۆژیا',
    summaryEn: 'Analysis of institutional capital allocation across Shanghai and Shenzhen exchanges: historically attractive forward P/E multiples, sovereign stabilization funds, and systematic rotation into industrial robotics and AI hardware.',
    summaryAr: 'تحليل توزيع رؤوس الأموال المؤسسية في بورصتي شنغهاي وشنتشن، مع تسليط الضوء على مضاعفات الربحية الجذابة، وتدخلات صناديق الاستقرار السيادية، والتدفق نحو الروبوتات الصناعية والذكاء الاصطناعي.',
    summaryZh: '深入评估沪深两市核心资产估值水准，结合中央汇金等耐心资本护盘路径，剖析外资北向资金与公募机构向工业机器人、AI半导体与算力基建领域集中配置的战略逻辑。',
    summaryCkb: 'شیکردنەوەی دابەشبوونی سەرمایە لە بۆرسەکانی شەنگهای و شێنزن بە سەرنجدان لەسەر کەرتی تەکنەلۆژیای زیرەک و ڕۆبۆتە پیشەسازییەکان.',
    bodyEn: `### Structural Re-Rating of Mainland Equities
The CSI 300 index is undergoing a fundamental structural transition. Trailing 12-month forward price-to-earnings (P/E) ratios hovering around 11.2x represent a historic 24% discount to ten-year historical medians, triggering heightened interest from global sovereign wealth funds in the GCC and Asia-Pacific.

### Sector Dynamics & Liquidity Inflows
1. **Hard-Tech Dominance**: Over 42% of domestic equity ETF inflows in Q1 2026 targeted semiconductor foundries, advanced power semiconductors (SiC/GaN), and robotic actuators.
2. **Sovereign Capital Anchoring**: Central state-owned enterprise (SOE) reform mandates require dividend payout ratios exceeding 45%, providing resilient yield cushions.
3. **Foreign Institutional Access**: The enhanced Shanghai-Shenzhen-Hong Kong Stock Connect quotas saw net northbound quarterly turnover surge past 1.4 trillion RMB.`,
    bodyAr: `### إعادة تقييم الأسهم الصينية
يشهد مؤشر CSI 300 مرحلة إعادة تسعير تاريخية، حيث يتداول عند مضاعف ربحية يبلغ نحو 11.2 مرة، مما يمثل خصماً بنسبة 24% مقارنة بالمتوسط التاريخي لعشر سنوات، جاذباً كبرى الصناديق السيادية من الشرق الأوسط.`,
    bodyZh: `### A股估值底线与战略机遇
沪深300指数前瞻市盈率处于11.2倍的历史底部区间，对海湾阿拉伯国家主权基金形成强大配置吸引力。战略性配置重点明显向工业母机、第三代半导体及高端智能装备倾斜。`,
    bodyCkb: `پێوەری پشکەکانی CSI 300 لە کەمترین ئاستی نرخە مێژووییەکاندایە و دەرفەتێکی گەورەی وەبەرهێنان دەڕەخسێنێت بۆ سندوقە سەرمایەدارەکان.`
  },

  // 6. Chinese Markets Insight: PBOC Monetary Stance & Yield Curve
  {
    slug: 'pboc-monetary-policy-rrr-sovereign-yield-curve',
    category: 'Policy & Regulation',
    coverImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
    author: 'Macroeconomic & Central Bank Policy Group',
    featured: false,
    order: 6,
    publishedAt: new Date('2026-03-14T10:00:00Z'),
    titleEn: 'PBOC Monetary Policy Dynamics: Target RRR Adjustments and Sovereign Yield Curve Anchoring',
    titleAr: 'ديناميكيات السياسة النقدية لبنك الشعب الصيني: تعديل الاحتياطي الإلزامي وضبط منحنى العائد السيادي',
    titleZh: '中国人民银行货币政策导向：结构性降准空间与国债收益率曲线合理锚定',
    titleCkb: 'سیاسەتی نەختینەیی بانکی گەلی چین: کەمکردنەوەی یەدەگی زۆرەملێ و ڕێکخستنی سوودی قەواڵەکان',
    summaryEn: 'Evaluation of PBOC liquidity injection strategies, targeted Reserve Requirement Ratio (RRR) easing, and direct central bank treasury trading operations maintaining balanced interbank liquidity.',
    summaryAr: 'تقييم استراتيجيات بنك الشعب الصيني لضخ السيولة، وخفض الاحتياطي الإلزامي المستهدف للمصارف، وعمليات التداول المباشر في سندات الخزانة لتثبيت استقرار السوق النقدية.',
    summaryZh: '全面解析央行结构性货币政策工具箱，评估公开市场国债买卖常态化操作、中期借贷便利（MLF）平稳过渡与超长期特别国债发行对银行间流动性的长远支撑。',
    summaryCkb: 'هەڵسەنگاندنی سیاسەتی نەختینەیی بانکی ناوەندی چین بۆ دابینکردنی سەرمایەی پێویست بۆ بانکەکان و پاراستنی سەقامگیری دارایی.',
    bodyEn: `### Multi-Tiered Liquidity Framework
The People's Bank of China (PBOC) has shifted toward a sophisticated hybrid monetary framework combining targeted 25–50 bps RRR adjustments with active secondary market treasury bond operations.

### Key Policy Benchmarks
- **Interbank Repo Rates**: 7-day DR007 volatility compressed below 15 bps, anchoring funding costs.
- **Ultra-Long Treasury Issuance**: Sovereign 30-year and 50-year special bonds absorbed cleanly by state lenders without crowding out private enterprise credit.`,
    bodyAr: `يواصل بنك الشعب الصيني استخدام أدوات التيسير النقدي المدروسة للحفاظ على استقرار أسعار الفائدة المصرفية وتوفير التمويل للمشاريع الاستراتيجية دون إحداث تضخم نقدي.`,
    bodyZh: `央行通过灵活运用准备金率与国债双向交易，实现了对基础货币投放节奏与利率走廊顶底区间的精准调控。`,
    bodyCkb: `بانکی گەلی چین بە شێوازێکی زانستی سوودی بانکی ڕێکدەخات تا هەم وەبەرهێنان زیاد بکات و هەم هەڵاوسان دروست نەبێت.`
  },

  // 7. Chinese Markets Insight: Clean Energy & EV Capital
  {
    slug: 'china-clean-energy-capital-capex-grid-storage',
    category: 'Infrastructure Finance',
    coverImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    author: 'Energy Transition & Green Capital Committee',
    featured: false,
    order: 7,
    publishedAt: new Date('2026-03-11T12:00:00Z'),
    titleEn: 'Chinese Renewable Energy Capex: Photovoltaic Supply Consolidation & Battery Storage Financing',
    titleAr: 'تمويل الطاقة المتجددة في الصين: اندماجات تصنيع الألواح الشمسية وتمويل بطاريات التخزين العملاقة',
    titleZh: '中国新能源产业资本支出：光伏制造结构性洗牌与GWh级储能电站银团融资',
    titleCkb: 'وەبەرهێنانی وزەی نوێبووەوە لە چین: تێکەڵبوونی کۆمپانیاکانی وزەی خۆر و پاتری گەورە',
    summaryEn: 'Capital expenditure cycles across tier-1 Chinese green-tech conglomerates: market consolidation eliminating obsolete N-type capacity, green bond yield trends, and surging export pipelines to the Middle East.',
    summaryAr: 'دورات الإنفاق الاستثماري لكبرى شركات التكنولوجيا الخضراء الصينية: الاندماج للتخلص من القدرات الفائضة، وعوائد السندات الخضراء، وتدفقات التصدير المتسارعة إلى الشرق الأوسط.',
    summaryZh: '深入跟踪头部新能源制造企业CAPEX周期，解析Topcon与异质结（HJT）先进产能替代劣势产能的重组并购潮，及中东中亚大型储能综合体项目银团融资条款。',
    summaryCkb: 'پەرەپێدانی تەکنەلۆژیای نوێی وزەی خۆر و پاتری گەورەی هەڵگرتنی کارەبا لە چین و ناردنی بۆ ڕۆژهەڵاتی ناوەڕاست.',
    bodyEn: `### Capital Consolidation in the Clean Energy Matrix
Following significant capacity expansion, the Chinese photovoltaic and battery storage sector has entered an intensive capital consolidation phase. Tier-1 players are leveraging sub-2.8% green bond financing to retire obsolete capacity and construct multi-gigawatt energy storage complexes across Belt and Road partner states.`,
    bodyAr: `تدخل صناعة الطاقة الشمسية والبطاريات الصينية مرحلة الاندماجات النوعية، مدعومة بسندات خضراء منخفضة التكلفة، لتعزيز الصادرات نحو مشاريع الطاقة الكبرى في العراق والخليج.`,
    bodyZh: `中国新能源产业正从规模扩张走向高质量资本整合，低成本绿色债券与跨国银团贷款助力中国高端储能与光伏组件深耕中东清洁能源市场。`,
    bodyCkb: `کۆمپانیاکانی وزەی خۆر لە چین سەرمایەی گەورە بەکاردەهێنن بۆ بەرهەمهێنانی پاتری پێشکەوتوو و دابینکردنی وزە بۆ عێراق و ناوچەکە.`
  },

  // 8. Hong Kong Markets Insight: HKEX Rebound & Middle East Listings
  {
    slug: 'hongkong-hkex-middle-east-dual-listings-capital-inflows',
    category: 'Investment Analysis',
    coverImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    author: 'Hong Kong Capital Markets & Sovereign Advisory',
    featured: true,
    order: 8,
    publishedAt: new Date('2026-03-13T15:00:00Z'),
    titleEn: 'Hong Kong HKEX Strategic Rebound: Middle Eastern Sovereign Dual-Listings & Hang Seng Inflows',
    titleAr: 'بورصة هونغ كونغ (HKEX): إدراجات مزدوجة لصناديق الشرق الأوسط وعودة السيولة لأسهم التكنولوجيا',
    titleZh: '香港交易所战略重振：中东主权资本双重主要上市与恒生科技指数流动性反弹',
    titleCkb: 'بۆرسەی هۆنگ کۆنگ: تۆمارکردنی هاوبەشی کۆمپانیاکانی ڕۆژهەڵاتی ناوەڕاست و گەڕانەوەی سەرمایە',
    summaryEn: 'Structural revival across Hong Kong Exchanges and Clearing (HKEX): GCC sovereign wealth fund partnerships, cross-listing of dual-primary energy giants, and liquidity injections into the Hang Seng Tech Index.',
    summaryAr: 'الانتعاش الهيكلي في بورصة هونغ كونغ، مدفوعاً بشراكات استراتيجية مع الصناديق السيادية الخليجية، والإدراج المزدوج لشركات الطاقة، وضخ السيولة في مؤشر هانغ سينغ للتكنولوجيا.',
    summaryZh: '透视港交所（HKEX）连接中国内地与全球离岸资本的超级联系人枢纽价值，剖析沙特阿美等中东龙头企业在港双重上市进程与沙特-香港两地ETF互挂交易激增的内在动力。',
    summaryCkb: 'بۆرسەی هۆنگ کۆنگ دەبێتە پردی پەیوەندی سەرمایەی کەنداو و چین، بە تۆمارکردنی پشکەکانی نەوت و تەکنەلۆژیا بە شێوەی هاوبەش.',
    bodyEn: `### The Super-Connector in Action
Hong Kong Exchanges and Clearing (HKEX) has achieved a significant milestone in capital diversification. Cross-border capital mechanisms between Hong Kong and Middle Eastern exchanges (Tadawul, ADX) have facilitated dual-primary listings for logistics and energy firms.

### Market Catalysts
1. **Hang Seng Tech Valuations**: Forward earnings multiples rebounded to 14.8x, supported by institutional share buyback programs exceeding HK$120 billion.
2. **Mutual Market Access Expansion**: Southbound Stock Connect flows from mainland retail and institutional wealth provided daily liquidity stabilizing market turnover above HK$180 billion.`,
    bodyAr: `تستعيد بورصة هونغ كونغ زخمها القيادي كحلقة وصل كبرى بين رؤوس الأموال في الشرق الأوسط والسوق الصيني الداخلي، مع توسع صناديق المؤشرات المشتركة والإدراجات المزدوجة.`,
    bodyZh: `港交所成功构建中东主权财富与亚洲高增长科技资产的直接对接走廊，南向港股通资金持续稳定净买入，夯实了国际金融中心长远竞争力。`,
    bodyCkb: `بۆرسەی هۆنگ کۆنگ سەرنجی زۆری خستووەتە سەر ڕاکێشانی سەرمایەدارانی ڕۆژهەڵاتی ناوەڕاست و پەرەپێدانی بازاڕی دارایی.`
  },

  // 9. Hong Kong Markets Insight: Offshore RMB & Dim Sum Bonds
  {
    slug: 'hongkong-offshore-rmb-dim-sum-bonds-clearing',
    category: 'Currency Markets',
    coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    author: 'Offshore Renminbi Treasury & Fixed Income Desk',
    featured: false,
    order: 9,
    publishedAt: new Date('2026-03-10T14:00:00Z'),
    titleEn: 'Hong Kong Offshore RMB Nexus: Dim Sum Bond Issuance Boom & Multi-Currency Swaps',
    titleAr: 'هونغ كونغ كمركز عالمي لليوان الخارجي: طفرة سندات "ديم سوم" وتسهيلات المبادلة النقدية',
    titleZh: '香港全球离岸人民币核心枢纽：点心债发行放量与多币种流动性互换网络',
    titleCkb: 'هۆنگ کۆنگ وەک ناوەندی جیهانی یوان: دەرکردنی قەواڵەی دیم سوم و ئاڵوگۆڕی دراو',
    summaryEn: 'How Hong Kong processes over 75% of global offshore RMB payments: corporate treasuries and sovereign borrowers flocking to record Dim Sum bond issuances to access historically favorable funding yields.',
    summaryAr: 'كيف تعالج هونغ كونغ أكثر من 75% من مدفوعات اليوان الخارجي العالمية، مع إقبال الشركات والحكومات على إصدار سندات "ديم سوم" للاستفادة من تكلفة التمويل المنخفضة.',
    summaryZh: '深度剖析香港处理全球超过75%离岸人民币支付清算业务的核心支撑，解读跨国企业与多国主权财政部争相在港发行“点心债”以获取优势利率的固定收益新格局。',
    summaryCkb: 'هۆنگ کۆنگ 75%ی مامەڵەکانی یوانی دەرەوەی چین ئەنجام دەدات لە ڕێگەی قەواڵەی دارایی دیم سوم و ئاڵوگۆڕی دراوەکان.',
    bodyEn: `### Global Dominance in Offshore Yuan
Hong Kong continues to consolidate its undisputed role as the primary offshore renminbi clearing center. Total offshore RMB customer deposits and certificates of deposit in Hong Kong have surpassed 1.15 trillion RMB.

### The Dim Sum Bond Advantage
With Western benchmark yields maintaining higher spreads, multinational corporations and sovereign states are issuing Dim Sum debt in Hong Kong at 2.4%–3.1% coupons, saving up to 180 basis points compared to dollar-denominated commercial debt.`,
    bodyAr: `تمثل هونغ كونغ الركيزة الأساسية لتسوية اليوان دولياً، حيث تتيح سندات "ديم سوم" للشركات العالمية الاقتراض بتكلفة أقل بنحو 180 نقطة أساس مقارنة بالسندات الدولارية.`,
    bodyZh: `离岸人民币存款池规模稳固突破万亿元大关，点心债因具备显著利差优势，正成为新兴经济体优化主权外债结构的核心工具。`,
    bodyCkb: `قەواڵەکانی دیم سوم لە هۆنگ کۆنگ سوودێکی زۆری هەیە بۆ کۆمپانیاکان تا بە تێچووی کەمتر قەرز بۆ پڕۆژەکانیان دابین بکەن.`
  },

  // 10. Hong Kong Markets Insight: Virtual Asset & Tokenized RWA
  {
    slug: 'hongkong-virtual-asset-regime-tokenized-rwa-clearing',
    category: 'Policy & Regulation',
    coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    author: 'Fintech & Digital Asset Regulatory Taskforce',
    featured: false,
    order: 10,
    publishedAt: new Date('2026-03-07T09:30:00Z'),
    titleEn: 'Hong Kong Digital Asset Regulatory Architecture: Tokenized RWA Settlement & Institutional Sandbox',
    titleAr: 'المنظومة التنظيمية للأصول الرقمية في هونغ كونغ: تسوية الأصول الحقيقية المرمزة وبيئة الاختبار المؤسسية',
    titleZh: '香港数字资产与Web3监管创新架构：代币化真实世界资产（RWA）清算与机构沙盒实践',
    titleCkb: 'یاساکانی سەرمایەی دیجیتاڵی لە هۆنگ کۆنگ: بەکارهێنانی دارایی ڕاستەقینە لە بلۆکچەیندا',
    summaryEn: 'Comprehensive breakdown of the Hong Kong Monetary Authority (HKMA) Project Ensemble: licensed crypto exchanges, fiat-backed stablecoin issuance frameworks, and tokenized commercial bills of lading.',
    summaryAr: 'دراسة شاملة لمشروع Ensemble الصادر عن سلطة النقد في هونغ كونغ: منصات التداول المرخصة، وأطر العملات المستقرة، وترميز أصول التجارة الدولية وسندات الشحن البحري.',
    summaryZh: '详尽解析香港金管局（HKMA）Project Ensemble沙盒项目，评估合规法定代币化法币稳定币牌照制度、绿色债券代币化链上交割及航运海运提单数字化的前沿金融实践。',
    summaryCkb: 'ڕێساکانی مۆڵەتدان بە دراوە دیجیتاڵییە فەرمییەکان لە هۆنگ کۆنگ و بەکارهێنانی تەکنەلۆژیای بلۆکچەین بۆ بازرگانی دەریایی.',
    bodyEn: `### Tokenized Real-World Assets (RWA)
Under the leadership of the Hong Kong Monetary Authority (HKMA) and the Securities and Futures Commission (SFC), Hong Kong has established the world's most robust institutional digital asset framework. Project Ensemble enables regulated tier-1 banks to settle tokenized real-world assets—including commercial shipping bills and renewable energy credits—using wholesale central bank digital currency (wCBDC).`,
    bodyAr: `تقود هونغ كونغ العالم في حوكمة الأصول المشفرة وترميز الأصول الحقيقية، مما يسمح بتسوية مستندات الشحن التجاري وفواتير التوريد لحظياً وبأعلى درجات الأمان المالي.`,
    bodyZh: `通过构建前瞻性的稳定币发行人监管条例与机构级代币化资产批发清算网络，香港正迅速奠定全球合规数字金融领军地位。`,
    bodyCkb: `هۆنگ کۆنگ پێشەنگە لە بەکارهێنانی تەکنەلۆژیای پارەی دیجیتاڵی بۆ مسۆگەرکردنی فەرمی مامەڵەکانی بازرگانی.`
  },

  // 11. Taiwan Markets Insight: Semiconductor Capex & TSMC Node Dynamics
  {
    slug: 'taiwan-semiconductor-foundry-capex-cycle-tsmc',
    category: 'Investment Analysis',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    author: 'Semiconductor Capital Equipment & Technology Valuation Bureau',
    featured: true,
    order: 11,
    publishedAt: new Date('2026-03-12T16:00:00Z'),
    titleEn: 'Taiwan Semiconductor Capital Cycles: TSMC 2nm Node Deployment & CoWoS Foundry Margins',
    titleAr: 'دورات رأس المال في صناعة أشباه الموصلات التايوانية: استثمارات TSMC في تقنية 2 نانومتر وهوامش المسابك',
    titleZh: '台湾半导体产业资本支出周期：台积电2纳米量产与CoWoS先进封装毛利护城河',
    titleCkb: 'خولەکانی سەرمایە لە چپسازی تایوان: وەبەرهێنانی پێشکەوتووی TSMC لە تەکنەلۆژیای ٢ نانۆمەتر',
    summaryEn: 'Assessing capital allocation across Taiwan’s high-precision foundry cluster: TSMC annual $36B+ capex, advanced packaging bottleneck resolutions, and pricing power sustaining 54%+ gross margins.',
    summaryAr: 'تقييم تخصيص رؤوس الأموال في مجمع مسابك الرقائق التايواني: إنفاق TSMC السنوي البالغ أكثر من 36 مليار دولار، والتوسع في التغليف المتقدم، وقوة التسعير التي تحمي هوامش ربح تتجاوز 54%.',
    summaryZh: '深度剖析台湾半导体晶圆制造集群资本开支动能：台积电360亿美元年度CAPEX投向、2纳米GAA架构晶体管产线爬坡速度与CoWoS先进封装产能瓶颈突破对全球高算力芯片供应链的决定性影响。',
    summaryCkb: 'شیکردنەوەی بودجەی گەورەی 36 ملیار دۆلاری کۆمپانیای TSMC بۆ دروستکردنی پێشکەوتووترین چیپی ئەلیکترۆنی لە جیهاندا.',
    bodyEn: `### The Global Semiconductor Foundry Backbone
Taiwan's Hsinchu and Tainan science parks represent the indispensable epicenter of global high-performance computing (HPC) and artificial intelligence hardware. Taiwan Semiconductor Manufacturing Company (TSMC) continues to defend unmatched pricing power, projecting gross margins above 54.5% despite concurrent overseas fab constructions in Japan, Germany, and the United States.

### Strategic Capital Metrics
- **Capex Run-Rate**: $36–38 billion annualized deployment, with 70% dedicated to leading-edge nodes (3nm and 2nm).
- **Advanced Packaging Multiplier**: CoWoS (Chip-on-Wafer-on-Substrate) capacity expanded by 110% year-on-year to eliminate AI accelerator delivery delays.
- **Supplier Ecosystem Rerating**: Upstream Taiwanese precision equipment, inspection, and specialty chemical vendors enjoying record backlog valuations.`,
    bodyAr: `تمتلك تايوان وزناً عالمياً حاسماً في صناعة الرقائق الإلكترونية، حيث تحافظ شركة TSMC على إنفاق استثماري يتجاوز 36 مليار دولار سنوياً، وتستمر في ريادة الجيل القادم من معالجات الذكاء الاصطناعي بهوامش ربحية تفوق 54%.`,
    bodyZh: `台积电凭借先进制程绝对技术壁垒与高良品率优势，成功将海外建厂折旧成本向终端超大规模客户传导，确立了全球算力军备竞赛中无可替代的现金流护城河。`,
    bodyCkb: `کۆمپانیای TSMC لە تایوان بەهێزترین کۆمپانیای دروستکردنی چیپی ئەلیکترۆنییە و قازانجی بەردەوامی سەرووی 54% دەپارێزێت بەهۆی پێشکەوتوویی تەکنەلۆژیاکەی.`
  },

  // 12. Taiwan Markets Insight: Cross-Strait Hardware Value Chains
  {
    slug: 'taiwan-hardware-supply-chain-cross-strait-exports',
    category: 'Trade Balance',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    author: 'Electronics Manufacturing & Regional Supply Observatory',
    featured: false,
    order: 12,
    publishedAt: new Date('2026-03-09T11:00:00Z'),
    titleEn: 'Taiwan Electronics Ecosystem: Cross-Strait Hardware Value Chains & Component Flows',
    titleAr: 'منظومة الإلكترونيات في تايوان: سلاسل القيمة عبر المضيق وتدفقات تجارة المكونات الصناعية',
    titleZh: '台湾电子制造业生态系统：两岸电子中间件供应链协同与跨海峡进出口贸易流',
    titleCkb: 'سیستەمی پیشەسازی ئەلیکترۆنی لە تایوان: هەناردەی پارچەی ئەلیکترۆنی و بازرگانی ناوچەکە',
    summaryEn: 'Deep-dive into cross-strait trade dynamics: how Taiwanese IC design houses, printed circuit board (PCB) titans, and passive component leaders interconnect with mainland China assembly hubs in Shenzhen, Dongguan, and Kunshan.',
    summaryAr: 'دراسة معمقة لحركة التجارة عبر المضيق: تكامل شركات تصميم الرقائق التايوانية واللوحات الإلكترونية المطبوعة مع مراكز التجميع والتصنيع الكبرى في البر الصيني الرئيسي.',
    summaryZh: '详实追踪联发科、台达电、广达等龙头企业在两岸之间的半导体零组件调配网络，揭示高集成度PCB板、射频前端芯片及被动元件在两岸精密制造产业集群间的互补共生逻辑。',
    summaryCkb: 'پەیوەندی بەهێزی پیشەسازی نێوان کارگەکانی تایوان و کارگەکانی تری چین بۆ بەرهەمهێنانی مۆبایل و کۆمپیوتەری زیرەک.',
    bodyEn: `### Symbiotic Cross-Strait Electronics Trade
Despite global supply chain realignments, the economic interdependence between Taiwan's component design and fabrication ecosystem and mainland China's advanced manufacturing assemblies remains profound. Over 38% of Taiwan's total merchandise exports consist of electronic intermediate components shipped to mainland assembly lines for export to global consumers.`,
    bodyAr: `تشكل المكونات الإلكترونية التايوانية أكثر من 38% من مجمل صادرات الجزيرة المتجهة نحو مصانع التجميع في البر الصيني، في تجسيد للترابط الصناعي التكنولوجي الوثيق في المنطقة.`,
    bodyZh: `两岸电子信息制造业展现出高度分工与深层互补特性，中间品半导体元器件跨海峡贸易构成了全球消费电子产品如期交付的中枢底座。`,
    bodyCkb: `بازرگانی پارچەی ئەلیکترۆنی لە نێوان تایوان و ناوچەکانی تری چین زیاتر لە 38%ی هەناردە پێکدەهێنێت و بنەمای سەرەکی بەرهەمهێنانی ئامێرە زیرەکەکانە لە جیهاندا.`
  },

  // 13. Greater China Interconnection: Tech Equities Correlation
  {
    slug: 'cross-strait-greater-china-tech-equities-correlation',
    category: 'Currency Markets',
    coverImage: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=1200&q=80',
    author: 'Cross-Border Quantitative Strategy Group',
    featured: false,
    order: 13,
    publishedAt: new Date('2026-03-06T13:00:00Z'),
    titleEn: 'Greater China Tech Equities: Arbitrage Channels, Valuation Gaps & Foreign Institutional Allocations',
    titleAr: 'أسهم التكنولوجيا في الصين الكبرى: قنوات المراجحة وفجوات التقييم ومخصصات الصناديق الدولية',
    titleZh: '两岸三地科技股联动效应：估值溢价收敛、跨境套利通道与全球主权基金配置策略',
    titleCkb: 'پشکەکانی تەکنەلۆژیا لە چین، هۆنگ کۆنگ و تایوان: لێکچوون و کێبڕکێ لە بازاڕەکاندا',
    summaryEn: 'Analyzing correlation and price divergence among Taiwan tech heavyweights, Hong Kong internet conglomerates, and Shanghai STAR board champions under shifting global interest rate expectations.',
    summaryAr: 'تحليل الترابط وفجوات التسعير بين عمالقة التكنولوجيا التايوانية، وشركات الإنترنت في هونغ كونغ، وأسهم لوحة الابتكار العلمي (STAR) في شنغهاي، وتأثيراتها على التدفقات المالية العالمية.',
    summaryZh: '建立跨台股加权指数、恒生科技指数与科创50指数的跨市场关联量化模型，解析离岸与在岸双重挂牌企业溢价收敛规律及全球宏观对冲基金的配对交易策略。',
    summaryCkb: 'بەراوردکردنی نرخی پشکەکانی تەکنەلۆژیا لە هۆنگ کۆنگ، تایوان، و شەنگهای و چۆنیەتی سوودمەندبوونی وەبەرهێنەران لە جیاوازی نرخەکان.',
    bodyEn: `### Multi-Market Valuation Convergence
The tri-market ecosystem of Mainland China, Hong Kong, and Taiwan represents over $18 trillion in combined equity market capitalization. Global institutional desks increasingly treat Greater China tech equities as a unified multi-asset matrix, balancing hardware manufacturing margins in Taipei with software platform cash flows in Hong Kong and domestic consumer scale on the mainland.`,
    bodyAr: `تمثل أسواق الصين وهونغ كونغ وتايوان مجتمعة قيمة سوقية تتجاوز 18 تريليون دولار، حيث تنظر الصناديق السيادية إليها كمنظومة متكاملة تجمع بين قوة العتاد الصلب ومنصات البرمجيات وحجم السوق الضخم.`,
    bodyZh: `两岸三地合计超过18万亿美元的庞大股票市场中，全球机构投资者通过跨市场量化配置，将硬件制造壁垒、互联网平台充沛自由现金流与内需大市场有机融合。`,
    bodyCkb: `بازاڕی پشکەکانی ئەم سێ ناوچەیە زیاتر لە ١٨ تریلیۆن دۆلارە و دەرفەتی گەورەی وەبەرهێنان بەردەست دەخات بۆ تەواوی جیهان.`
  },

  // 14. Greater China Interconnection: Wealth Management Connect 2.0
  {
    slug: 'greater-china-wealth-management-connect-liquidity',
    category: 'Policy & Regulation',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    author: 'Greater Bay Area Financial Integration Council',
    featured: false,
    order: 14,
    publishedAt: new Date('2026-03-04T10:00:00Z'),
    titleEn: 'Greater Bay Area Wealth Connect 2.0: Expanding Cross-Border Capital Mobility & Asset Management',
    titleAr: 'برنامج ربط إدارة الثروات لمنطقة الخليج الكبرى 2.0: تعميق حركة رأس المال وإدارة الأصول عبر الحدود',
    titleZh: '粤港澳大湾区“跨境理财通”2.0扩容：跨境资本双向流动与多元化离岸资产管理纵深',
    titleCkb: 'پڕۆگرامی بەستنەوەی سەرمایەی کەنداوی گەورە: زیادکردنی ئازادی جووڵەی دارایی و وەبەرهێنان',
    summaryEn: 'How the upgraded Wealth Management Connect framework expands individual investment quotas to 3 million RMB, broadening eligible product suites and boosting cross-border capital velocity across Guangdong, Hong Kong, and Macao.',
    summaryAr: 'كيف يرفع برنامج "الربط المالي لمنطقة الخليج الكبرى 2.0" حصص الاستثمار الفردي إلى 3 ملايين يوان، مع توسيع سلة المنتجات المالية المرخصة وتسريع حركة السيولة بين قوانغدونغ وهونغ كونغ وماكاو.',
    summaryZh: '全面评估“跨境理财通”2.0优化举措落地成效：个人投资额度跃升至300万元人民币、合规持牌券商首次获准展业及公募基金投资品类扩容对大湾区千亿级财富管理活水注入的里程碑意义。',
    summaryCkb: 'فراوانکردنی پڕۆگرامی ئاڵوگۆڕی سەرمایە لە نێوان هۆنگ کۆنگ و ناوچەی کەنداوی گەورە تا سێ ملیۆن یوان بۆ هەر وەبەرهێنەرێک.',
    bodyEn: `### Institutional Deepening of GBA Financial Integration
The enactment of Wealth Management Connect 2.0 represents a pivotal leap in high-standard financial liberalization. By elevating the individual investor quota from 1 million to 3 million RMB and incorporating securities firms alongside commercial banks, the protocol accelerates seamless asset allocation between Mainland high-net-worth investors and Hong Kong offshore dollar and multi-currency funds.`,
    bodyAr: `يعزز برنامج "الربط المالي 2.0" في منطقة الخليج الكبرى التكامل المالي بين هونغ كونغ والمدن الصناعية الصينية، مما يرفع سقف الاستثمار الفردي إلى 3 ملايين يوان ويسهل إدارة الثروات العابرة للحدود.`,
    bodyZh: `理财通2.0不仅显著拓宽了高净值家庭离岸多元资产配置渠道，更为香港国际资产管理中心地位注入了源源不断的长期活水。`,
    bodyCkb: `ئەم پڕۆگرامە ڕێگە بە خەڵک و کۆمپانیاکان دەدات بە شێوەیەکی ئاسانتر لە بازاڕی دارایی هۆنگ کۆنگ و چین وەبەرهێنان بکەن.`
  }
];

async function main() {
  console.log('Seeding ICA Finance & Economics Insights (including China, Hong Kong, and Taiwan markets)...');
  
  for (const item of initialInsights) {
    await prisma.financeInsight.upsert({
      where: { slug: item.slug },
      update: {
        category: item.category,
        coverImage: item.coverImage,
        author: item.author,
        featured: item.featured,
        order: item.order,
        publishedAt: item.publishedAt,
        titleEn: item.titleEn,
        titleAr: item.titleAr,
        titleZh: item.titleZh,
        titleCkb: item.titleCkb,
        summaryEn: item.summaryEn,
        summaryAr: item.summaryAr,
        summaryZh: item.summaryZh,
        summaryCkb: item.summaryCkb,
        bodyEn: item.bodyEn,
        bodyAr: item.bodyAr,
        bodyZh: item.bodyZh,
        bodyCkb: item.bodyCkb
      },
      create: item
    });
  }

  const count = await prisma.financeInsight.count();
  console.log(`Successfully seeded Finance Insights! Total in DB: ${count}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
