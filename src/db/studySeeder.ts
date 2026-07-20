import { prisma } from '../db.js';

export async function seedStudies() {
  try {
    console.log('📚 Checking and seeding professional studies...');

    // Retrieve Jasim Al-Iraqi (j.aliraqi@chinq.post), Wei Chen (w.chen@chinq.post), and Test Editor (editor@chinq.media)
    const author1 = await prisma.user.findUnique({ where: { email: 'j.aliraqi@chinq.post' } });
    const author2 = await prisma.user.findUnique({ where: { email: 'w.chen@chinq.post' } });
    const editor = await prisma.user.findUnique({ where: { email: 'editor@chinq.media' } });

    // Fallbacks if those users are not seeded yet
    const defaultAuthor = author1 || author2 || editor || await prisma.user.findFirst();

    if (!defaultAuthor) {
      console.log('⚠️ No users found in database to link as studies authors. Skipping study seeding.');
      return;
    }

    const u1 = author1 || defaultAuthor;
    const u2 = author2 || defaultAuthor;
    const ue = editor || defaultAuthor;

    const studiesData = [
      {
        slug: 'silk-road-mesopotamia-audit',
        titleEn: 'The Silk Road in Mesopotamia: A Five-Year Audit of China-Iraq Infrastructure Agreements',
        titleAr: 'طريق الحرير في بلاد الرافدين: تدقيق لخمس سنوات من اتفاقيات البنية التحتية بين الصين والعراق',
        titleZh: '美索不达米亚的丝绸之路：中伊基础设施协议五年审计报告',
        titleCkb: 'ڕێگای ئاوریشم لە مێزۆپۆتامیا: وردبینییەکی پێنج ساڵە بۆ ڕێککەوتنەکانی ژێرخانی چین و عێراق',
        excerptEn: 'An in-depth analysis of major highway, port, and municipal construction projects implemented under the framework of the China-Iraq sovereign cooperation pact since 2021.',
        excerptAr: 'تحليل معمق للمشاريع الكبرى للطرق السريعة والموانئ والبلديات المنفذة في إطار اتفاقية التعاون السيادي بين الصين والعراق منذ عام 2021.',
        excerptZh: '对自2021年签署中伊主权合作协议框架以来实施的国家公路、深水港口及市政建设重大工程进行的深度综合评估。',
        excerptCkb: 'شیکردنەوەیەکی قووڵ بۆ پڕۆژە گەورەکانی ڕێگاوبانی خێرا، بەندەرەکان، و ئاوەدانکردنەوەی شارەوانییەکان کە لە چوارچێوەی ڕێککەوتنی هاوکاری سەروەری نێوان چین و عێراق لە ساڵی ٢٠٢١ەوە جێبەجێ کراون.',
        contentEn: `### Abstract

This paper evaluates the performance, funding mechanisms, and construction velocity of key municipal and transport infrastructure projects executed in Iraq by Chinese state-owned enterprises (SOEs) under the milestone **'Oil-for-Infrastructure'** bilateral agreement.

### Key Findings

1. **Execution Rate**: Of the 1,000 schools planned under the first phase of bilateral educational infrastructure, 84% have completed structural works, and 72% are fully commissioned.
2. **Capital Flow**: Direct oil-consignment barrels earmarked for the sovereign escrow account in Beijing have consistently met the billing benchmarks, reducing project delay due to domestic fiscal deficits.
3. **Decentralized Hubs**: Industrial corridors in Najaf and Dhi Qar have advanced faster than federal highway linkages, highlighting a regional focus on localized manufacturing hubs.

### Strategic Recommendations

- Establish joint engineering oversight committees consisting of local municipal planners and international civil engineers.
- Accelerate high-voltage power transmission linkages to feed newly constructed school districts and industrial parks.`,
        contentAr: `### ملخص الدراسة

تقيم هذه الورقة الأداء وآليات التمويل وسرعة البناء لمشاريع البنية التحتية البلدية والنقل الرئيسية التي نفذتها الشركات الحكومية الصينية في العراق بموجب الاتفاقية الثنائية التاريخية **'النفط مقابل الإعمار'**.

### النتائج الرئيسية

1. **معدل التنفيذ**: من بين 1,000 مدرسة مخططة في المرحلة الأولى، اكتملت الأعمال الإنشائية في 84٪ منها، وجرى تشغيل 72٪ بالكامل.
2. **التدفق المالي**: تلبية شحنات النفط المخصصة للحساب السيادي في بكين باستمرار لمعايير الفواتير حد من تأخر المشاريع بسبب العجز المالي المحلي.
3. **المحاور اللامركزية**: تقدمت الممرات الصناعية في النجف وذي قار بشكل أسرع من خطوط الطرق السريعة الفيدرالية، مما يسلط الضوء على التركيز الإقليمي على مراكز التصنيع المحلية.

### التوصيات الاستراتيجية

- إنشاء لجان إشراف هندسية مشتركة تضم مخططي البلديات المحليين ومهندسين مدنيين دوليين.
- تسريع ربط شبكات نقل الطاقة عالية الجهد لتغذية المجمعات المدرسية والمناطق الصناعية الجديدة.`,
        contentZh: `### 摘要

本研究评估了中资国有企业（SOE）在具有里程碑意义的**“石油换重建”**双边框架协议下，在伊拉克执行的关键市政与交通基础设施项目的表现、融资模式和建设速度。

### 核心发现

1. **执行率**：在首期规划的1000所双边教育合作学校中，84%已完成主体结构施工，72%已正式投入运行。
2. **资金流向**：指定用于北京主权代管账户的直接对口石油出口 barrels 持续满足结算基准，显著减少了因伊拉克国内财政赤字导致的项目延误。
3. **去中心化中心**：纳杰夫和济加尔的工业走廊建设进度快于联邦公路主干线，凸显出对本土化制造中心的区域性侧重。

### 战略建议

- 成立由当地市政规划者与国际土木工程师共同组成的联合工程监管委员会。
- 加速高压输电网络的对接，为新建的学校园区和工业园提供稳定的电力保障。`,
        contentCkb: `### کورتەی توێژینەوە

ئەم توێژینەوەیە هەڵسەنگاندن بۆ کارایی، میکانیزمی دارایی، و خێرایی جێبەجێکردنی پڕۆژە سەرەکییەکانی ژێرخانی گواستنەوە و شارەوانی دەکات کە لە لایەن کۆمپانیا دەوڵەتییەکانی چینەوە لە عێراق جێبەجێ کراون بەپێی ڕێککەوتنی **'نەوت بەرامبەر بە ئاوەدانکردنەوە'**.

### دۆزینەوە سەرەکییەکان

١. **ڕێژەی جێبەجێکردن**: لە کۆی ١٠٠٠ قوتابخانەی پلان بۆ داڕێژراو لە قۆناغی یەکەمدا، ٨٤٪ی کارە بنەڕەتییەکانیان تەواو بووە و ٧٢٪یان بە تەواوی خراونەتە گەڕ.
٢. **تەزووی دارایی**: گواستنەوەی نەوتی تەرخانکراو بۆ هەژماری سەروەري لە پەکین بە بەردەوامی پێوەرەکانی پارەدارکردنی پڕکردووەتەوە، ئەمەش دواکەوتنی پڕۆژەکانی بەهۆی کورتهێنانی دارایی ناوخۆیی کەم کردووەتەوە.
٣. **ناوەندە لامەرکەزییەکان**: کۆریدۆرە پیشەسازییەکان لە نەجەف و ذي قار خێراتر لە هێڵەکانی ڕێگای گشتی فیدراڵی پێشکەوتوون، ئەمەش تیشک دەخاتە سەر گرنگیدانی ناوچەیی بە ناوەندە ناوخۆییەکانی بەرهەمهێنان.

### ڕاسپاردە ستراتیژییەکان

- دامەزراندنی لیژنەی هاوبەشی چاودێری ئەندازیاری کە لە پلاندانەرانی شارەوانی ناوخۆیی و ئەندازیارانی شارستانی نێودەوڵەتی پێکبێت.
- خێراکردنی گرێدانی هێڵەکانی کارەبای پەستانی بەرز بۆ دابینکردنی وزە بۆ ناوچە قوتابخانەییە نوێیەکان و شارۆچکە پیشەسازییەکان.`,
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
        isPrivate: false,
        authorId: u1.id
      },
      {
        slug: 'petrodollar-petroyuan-clearing',
        titleEn: 'Petrodollar to Petroyuan: Analyzing Financial Clearing Corridors in Bilateral Energy Trade',
        titleAr: 'من البترودولار إلى البترويوان: تحليل ممرات المقاصة المالية في تجارة الطاقة الثنائية',
        titleZh: '从石油美元到石油人民币：双边能源贸易中的金融清算通道分析',
        titleCkb: 'لە پترۆدۆلارەوە بۆ پترۆیوان: شیکردنەوەی ڕێڕەوەکانی پاکتاوکردنی دارایی لە بازرگانیی دوولایەنەی وزەدا',
        excerptEn: 'This exclusive study reviews the operational feasibility, regulatory hurdles, and currency-hedging mechanisms of clearing Iraqi crude shipments to China using CNY denominal tokens.',
        excerptAr: 'تستعرض هذه الدراسة الحصرية الجدوى التشغيلية والعقبات التنظيمية وآليات التحوط من العملة لتسوية شحنات النفط الخام العراقي إلى الصين باستخدام الرنمينبي.',
        excerptZh: '本专属研究分析了使用人民币结算伊拉克对华原油出口的运作可行性、监管壁垒以及货币避险机制。',
        excerptCkb: 'ئەم توێژینەوە تایبەتە پێداچوونەوە دەکات بە گونجاوی کارکردن، بەربەستە ڕێکخراوەییەکان، و میکانیزمەکانی پاراستنی دراو لە پاکتاوکردني نەوتی خاوی عێراق بۆ چین بە بەکارهێنانی یوانی چینی.',
        contentEn: `### Executive Summary

*Note: This is a restricted publication reserved for active premium corporate subscribers.*

As global trade systems gradually adapt to multi-currency clearing frameworks, the bilateral trade corridors between the Middle East and the Far East are undergoing systemic integration. This research explores the tactical execution of clearing Iraqi oil exports to Chinese refineries using **Renminbi (RMB / CNY)**-denominated settlement accounts, bypassing traditional SWIFT networks and US Dollar intermediation.

### Strategic Dimensions Covered

1. **Sovereign Liquidity Pools**: Analyzing the bilateral currency-swap agreements between the People's Bank of China (PBOC) and the Central Bank of Iraq (CBI).
2. **Discount Arbitrage**: How Yuan-denominated oil sales can reduce transaction drag by 1.8% to 2.4% for Chinese buyers while providing Iraq with high-liquidity capital for procuring industrial components from Beijing.
3. **Hedging Against Sanction Vectors**: Creating isolated clearing balances to prevent systemic shocks.`,
        contentAr: `### ملخص تنفيذي

*ملاحظة: هذه دراسة مغلقة ومخصصة للمشتركين ذوي العضوية الممتازة.*

مع تكيف الأنظمة التجارية العالمية تدريجياً مع أطر تسوية متعددة العملات، تشهد ممرات التجارة الثنائية بين الشرق الأوسط وأقصى الشرق تكاملاً منهجياً. يبحث هذا البحث في التنفيذ التكتيكي لتسوية صادرات النفط العراقية إلى المصافي الصينية باستخدام حسابات تسوية مقومة بـ **الرنمينبي (RMB / CNY)**، متجاوزة شبكات سويفت التقليدية والوساطة بالدولار الأمريكي.

### الأبعاد الاستراتيجية المشمولة

1. **مجمعات السيولة السيادية**: تحليل اتفاقيات تبادل العملات الثنائية بين بنك الشعب الصيني والبنك المركزي العراقي.
2. **تحكيم الخصم**: كيف يمكن لمبيعات النفط المقومة باليوان أن تقلل من عبء المعاملات بنسبة ١.٨٪ إلى ٢.٤٪ للمشترين الصينيين مع تزويد العراق برأس مال عالي السيولة لشراء المكونات الصناعية من بكين.`,
        contentZh: `### 执行摘要

*注：这是一份受限发表的研究，仅供高级企业订阅用户审阅。*

随着全球贸易清算体系逐步走向多极化，中东与远东的双边贸易通道正经历系统性的重构。本研究深入分析了伊拉克原油出口对华清算转用**人民币（CNY）**结算账户的实战执行流程，以及由此带来的去美元化深度红利。

### 核心战略考量

1. **主权流动性池**：深度剖析中国人民银行（PBOC）与伊拉克中央银行（CBI）之间的双边货币互换协议。
2. **折价套利分析**：采用人民币结算如何为中国买家节省1.8%至2.4%的交易摩擦成本，同时为伊拉克提供急需的高流动性人民币资金，直接用于购买北京的高端制造设备。`,
        contentCkb: `### کورتەی جێبەجێکردن

*تێبینی: ئەمە توێژینەوەیەکی سنووردارە و تەنها بۆ بەشداربووانی نایاب (Premium) تەرخانکراوە.*

لەکاتێکدا سیستەمە بازرگانییە جیهانییەکان بە تدریج لەگەڵ چوارچێوەی پاکتاوکردنی چەند دراوییەکدا دەگونجێن، ڕێڕەوە بازرگانییە دوولایەنەکانی نێوان ڕۆژهەڵاتی ناوەڕاست و ڕۆژهەڵاتی دوور ڕووبەڕووی یەکگرتنێکی سیستماتیکی دەبنەوە. ئەم توێژینەوەیە گەڕان دەکات بۆ جێبەجێکردنی تاکتیکی پاکتاوکردنی هەناردەی نەوتی عێراق بۆ پاڵاوگەکانی چین بە بەکارهێنانی ڕەنمیبنی (RMB / CNY).

### ڕەهەندە ستراتیژییەکانی توێژینەوەکە

١. **حەوزەکانی شلەمەنی سەروەری**: شیکردنەوەی ڕێککەوتنی ئاڵوگۆڕی دراوی دوولایەنە لە نێوان بانکی گەلی چین (PBOC) و بانکی ناوەندی عێراق (CBI).
٢. **داشکاندنی بەهای مامەڵەکان**: چۆن فرۆشتنی نەوت بە یوانی چینی دەبێتە هۆی کەمکردنەوەی خەرجییەکانی مامەڵەکردن بە ڕێژەی ١.٨٪ بۆ ٢.٤٪ بۆ کڕیارە چینییەکان، لەکاتێکدا سەرمایەیەکی خێرا بۆ عێراق دابین دەکات بۆ کڕینی کەرەستەی پیشەسازی لە پەکین.`,
        imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
        isPrivate: true,
        authorId: u2.id
      },
      {
        slug: 'al-faw-grand-port-integration',
        titleEn: 'Al-Faw Grand Port: Strategic Integration into the Maritime Silk Road',
        titleAr: 'ميناء الفاو الكبير: التكامل الاستراتيجي في طريق الحرير البحري',
        titleZh: '法奥大港：融入海上丝绸之路的战略契机与运力评估',
        titleCkb: 'بەندەری گەورەی فاو: یەکگرتنی ستراتیژی لەگەڵ ڕێگای ئاوریشمی دەریایی',
        excerptEn: "Evaluating Basra's state-of-the-art maritime gateway and its capacity to re-route trade volumes from the Gulf to European corridors via the Dry Canal.",
        excerptAr: 'تقييم البوابة البحرية الحديثة في البصرة وقدرتها على إعادة توجيه أحجام التجارة من الخليج إلى الممرات الأوروبية عبر القناة الجافة.',
        excerptZh: '评估巴士拉最先进的深水海上门户，及其通过“陆上干渠”铁路网将海湾货运分流至欧洲通道的战略潜力。',
        excerptCkb: "هەڵسەنگاندنی دەروازەی دەریایی پێشکەوتووی بەسرە و توانای بۆ گۆڕینی ئاراستەی بازرگانی لە کەنداوەوە بۆ ڕێڕەوەکانی ئەوروپا لە ڕێگەی 'کەناڵی وشکانی'ەوە.",
        contentEn: `### Project Context

The construction of the **Al-Faw Grand Port** in Southern Basra is poised to redefine maritime shipping layouts across the Northern Indian Ocean. By establishing a direct, deep-water terminal at the tip of the Persian Gulf, the project presents a robust alternative to Suez Canal reliance when combined with the trans-Iraqi **'Dry Canal'** high-speed rail network.

### Maritime Freight Logistics

- **Depth and Draught**: At 19.5 meters, Al-Faw can accommodate Ultra Large Crude Carriers (ULCC) and container vessels up to 24,000 TEU.
- **Turnaround Velocity**: Automated crane assemblies managed by regional logistics platforms aim to reduce berthing-to-dispatch time by 30% compared to existing regional harbors.

### Integration with Global Routes

The integration of Al-Faw into the Maritime Silk Road network establishes a highly reliable land-bridge directly connecting Basra to Turkish networks within a compressed 36-hour transit window, cutting down typical sea-freight durations by up to 9 days.`,
        contentAr: `### سياق المشروع

من المتوقع أن يعيد بناء **ميناء الفاو الكبير** في جنوب البصرة تعريف مخططات الشحن البحري عبر شمال المحيط الهندي. من خلال إنشاء محطة مياه عميقة مباشرة في نهاية الخليج العربي، يقدم المشروع بديلاً قوياً لربط الشحن بقناة السويس عبر دمج القناة الجافة العراقية.

### لوجستيات الشحن البحري

- **العمق والغاطس**: بعمق ١٩.٥ مترًا، يمكن لميناء الفاو استيعاب ناقلات النفط الضخمة جداً وسفن الحاويات حتى ٢٤,٠٠٠ حاوية نمطية.
- **سرعة الدوران**: تهدف مجموعات الرافعات المؤتمتة التي تديرها منصات لوجستية إقليمية إلى تقليل وقت الرسو والإرسال بنسبة ٣٠٪ مقارنة بالموانئ الإقليمية الحالية.`,
        contentZh: `### 项目背景

位于巴士拉南部的**法奥大港（Al-Faw Grand Port）**建设将彻底重塑北印度洋的海运版图。该深水港口将成为连接海湾地区与欧洲市场的全新物流支点，并通过“干路通道”高等级铁路网络实现无缝货运分流，为绕行苏伊士运河提供了高性价比替代方案。

### 港口航运物流指标

- **吃水深度**：拥有19.5米的超深水设计，可无缝停泊超大型原油轮（ULCC）以及运力高达24,000 TEU的超大型集装箱货轮。
- **装卸流转率**：引入了由区域综合物流平台统一管理的自动化桥吊群，设计运转周期比周边现有老旧港口缩短达30%。`,
        contentCkb: `### چوارچێوەی پڕۆژەکە

دروسکردنی **بەندەری گەورەی فاو** لە باشووری بەسرە لە توانادایە نەخشەی شحنی دەریایی لە باکووری زەریای هیندی سەرلەنوێ دابڕێژێتەوە. بە دامەزراندنی وێستگەیەکی ئاوی قووڵ لە لوتکەی کەنداوی عەرەبی، پڕۆژەکە جێگرەوەیەکی بەهێز بۆ کەناڵی سوێس پێشکەش دەکات کاتێک لەگەڵ هێڵی ئاسنی خێرای 'کەناڵی وشکانی' یەکدەخرێت.

### لۆجستیکی باری دەریایی

- **قوڵایی**: بە قووڵایی ١٩.٥ مەتر، بەندەری فاو دەتوانێت گەورەترین تانکەرەکانی نەوت و کەشتییەکانی کۆنتێنەر تا ٢٤,٠٠٠ TEU وەربگرێت.
- **خێرایی ڕاپەڕاندنی کارەکان**: جێگیرکردنی ئامێرە ئۆتۆماتیکییەکانی بەرزکەرەوە کە لە لایەن پلاتفۆرمی لۆجستیکی هاوبەشەوە بەڕێوەدەبرێن، ئامانجی کەمکردنەوەی کاتی مانەوەی کەشتییەکانە بە ڕێژەی ٣٠٪ بەراورد بە بەندەرەکانی تری ناوچەکە.`,
        imageUrl: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80',
        isPrivate: false,
        authorId: u1.id
      },
      {
        slug: 'telecom-sovereignty-5g-expansion',
        titleEn: "Telecom and Sovereignty: The Role of Huawei & ZTE in Iraq's 5G Broadband Expansion",
        titleAr: 'الاتصالات والسيادة: دور هواوي وزد تي إي في توسيع نطاق شبكات الجيل الخامس بالعراق',
        titleZh: '电信与国家主权：华为和中兴在伊拉克5G宽带部署中的角色',
        titleCkb: 'پەیوەندییەکان و سەروەری: ڕۆڵی هواوی و زێد-تی-ئی لە فراوانکردنی ئینتەرنێتی 5G لە عێراق',
        excerptEn: 'Tracing the implementation of sovereign fiberoptic backbones and data-center architecture across the Southern provinces, backed by Chinese technical integration.',
        excerptAr: 'تتبع تنفيذ العمود الفقري السيادي للألياف الضوئية وبنية مراكز البيانات في المحافظات الجنوبية بدعم من التكامل التكنولوجي الصيني.',
        excerptZh: '追踪中方技术支持下，伊拉克南部省份自主光纤骨干网及分布式国家数据中心架构的部署历程。',
        excerptCkb: 'بەدواداچوون بۆ جێبەجێکردنی تۆڕە سەرەکییەکانی فایبەر ئۆپتیک و تەلارسازی سەنتەری داتا لە پارێزگاکانی باشوور بە پاڵپشتی تەکنەلۆژیای چین.',
        contentEn: `### Modernizing the Digital Backbone

Sovereign telecommunications networks are essential to modern national security and commercial scale. Over the past four years, the Iraqi Ministry of Communications, in joint enterprise with leading Chinese technological firms **Huawei and ZTE**, has executed a rapid fiber-to-the-home (FTTH) and 5G cellular infrastructure program.

### Strategic Highlights

1. **Data Sovereignty**: The establishment of regional micro-datacenter architecture in Erbil and Baghdad preserves national security telemetry on localized cloud nodes.
2. **Financial Interoperability**: 5G low-latency nodes have enabled the Central Bank of Iraq to roll out real-time gross settlement systems across hundreds of rural bank branches.

### Telecommunications Independence

By standardizing core routers and switching nodes on unified Chinese protocols, the Iraqi state has successfully bypassed legacy carrier frameworks, lowering routing overhead by 40% while shielding municipal telemetry from non-aligned external intercept networks.`,
        contentAr: `### تحديث البنية الرقمية

تعد شبكات الاتصالات السيادية ضرورية للأمن القومي الحديث والنشاط التجاري. على مدار السنوات الأربع الماضية، نفذت وزارة الاتصالات العراقية برنامجاً سريعاً للألياف الضوئية للمنازل وبنية الجيل الخامس بالتعاون مع هواوي وزد تي إي.

### أبرز النقاط الاستراتيجية

1. **سيادة البيانات**: إنشاء مراكز بيانات إقليمية مصغرة في أربيل وبغداد يحافظ على أمن البيانات الوطنية في سحابة محلية.
2. **التكامل المالي**: مكنت عقد الجيل الخامس من البنك المركزي العراقي من إطلاق نظام التسوية الإجمالية الفورية في المناطق الريفية.`,
        contentZh: `### 数字化骨干网络现代化

国家自主电信网络是现代国家安全和商业发展的基础。过去四年中，伊拉克通信部与中国领先科技巨头**华为和中兴**深度合作，推行了高速光纤到户（FTTH）和5G蜂窝网络基础设施计划。

### 核心亮点

1. **数据主权**：在巴格达和埃尔比勒部署的分布式微型数据中心，确保了伊拉克国家级核心数据与运行指标在本土云节点上的独立运行。
2. **金融体系互联**：5G超低延迟网点使得伊拉克中央银行（CBI）能够首次在数百个偏远农村银行网点部署实时全额结算系统。`,
        contentCkb: `### نوێکردنەوەی ژێرخانی دیجیتاڵی

تۆڕە سەروەرییەکانی پەیوەندییەکان گرنگن بۆ ئاسایشی نیشتمانی و پەرەپێدانی بازرگانی مۆدێرن. لە ماوەی چوار ساڵی ڕابردوودا، وەزارەتی پەیوەندییەکانی عێراق بە هاوبەشی لەگەڵ کۆمپانیا پێشەنگەکانی چین **Huawei و ZTE**، پڕۆگرامی فایبەری ماڵان و تۆڕی مۆبایلی 5Gی جێبەجێ کردووە.

### خاڵە سەرەکییە ستراتیژییەکان

١. **سەروەری داتا**: دامەزراندنی سەنتەرە مایکڕۆییەکانی داتا لە هەولێر و بەغدا کە ئاسایشی داتای نیشتمانی لە ناوخۆدا دەپارێزێت.
٢. **تێکەڵبوونی دارایی**: تۆڕەکانی 5G یارمەتی بانکی ناوەندی عێراقیان داوە بۆ بڵاوکردنەوەی سیستەمی پارەدان و پاڵپشتی دارایی خێرا لە سەدان لقی لادێیی دوورەدەستدا.`,
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        isPrivate: false,
        authorId: ue.id
      },
      {
        slug: 'industrial-decentralization-sez-kurdistan',
        titleEn: 'Industrial Decentralization: The Geopolitics of Special Economic Zones in the Kurdistan Region',
        titleAr: 'اللامركزية الصناعية: الجغرافيا السياسية للمناطق الاقتصادية الخاصة في إقليم كردستان',
        titleZh: '产业去中心化：库尔德地区特区建设的地缘政治学分析',
        titleCkb: 'ناوەندگێڕی پیشەسازی: جیۆپۆلیتیکی ناوچە ئابوورییە تایبەتەکان لە هەرێمی کوردستان',
        excerptEn: 'This comprehensive investigation analyzes the regulatory frameworks and bilateral investment flows governing the establishment of industrial parks in Erbil and Sulaymaniyah.',
        excerptAr: 'تحلل هذه الدراسة الشاملة الأطر التنظيمية وتدفقات الاستثمار الثنائية التي تحكم إنشاء المجمعات الصناعية في أربيل والسليمانية.',
        excerptZh: '本项全面调查分析了监管机制和双边投资流向对埃尔比勒和苏莱曼尼亚工业园区建设的深远影响。',
        excerptCkb: 'ئەم لێکۆڵینەوە گشتگیرە شیکردنەوە بۆ چوارچێوە ڕێکخراوەییەکان و تەزووی وەبەرهێنانی دوولایەنە دەکات کە حوکمی دامەزراندنی ناوچە پیشەسازییەکان لە هەولێر و سلێمانی دەکەن.',
        contentEn: `### Confidential Report Overview

*This study is premium and restricted to verified institutional members with active subscription clearance.*

While federal infrastructure projects focus primarily on southern port and refinery corridors, the Kurdistan Region has pioneered decentralized **Special Economic Zones (SEZs)**. Backed by regional capital, these zones serve as commercial gateways connecting Turkish logistics networks with incoming Chinese light-manufacturing lines.

### Analytical Focus Areas

- **Administrative Autonomy**: Devolved customs processing has enabled the Sulaymaniyah SEZ to reduce clearance friction for high-precision components.
- **Investment Frameworks**: Analysis of joint capital structures between private Chinese machinery consortiums and local Kurdish industrial developers.
- **Supply Chain Integration**: Tracing transit bottlenecks through western corridors and mapping trade speedups resulting from the deployment of localized customs automation.`,
        contentAr: `### نظرة عامة على التقرير السري

*هذه الدراسة مخصصة للأعضاء المؤسسيين المشتركين في باقة العضوية الممتازة.*

بينما تركز مشاريع البنية التحتية الاتحادية بشكل أساسي على ممرات الموانئ والمصافي الجنوبية، تميز إقليم كردستان بإنشاء مناطق اقتصادية خاصة لامركزية مدعومة برأس مال محلي وشركات تصنيع صينية.

### محاور التركيز التحليلي

- **الاستقلالية الإدارية**: مكن تخفيف القيود الجمركية منطقة السليمانية الاقتصادية الخاصة من تقليل احتكاك التخليص للمكونات عالية الدقة.
- **أطر الاستثمار**: تحليل هياكل رأس المال المشترك بين مجمعات الآلات الصينية الخاصة ومطوري الصناعة الكرد المحليين.`,
        contentZh: `### 机密研究报告概要

*本研究属于高级会员专享，仅限通过高级机构认证的活跃订阅会员阅读。*

当联邦基础设施建设重兵集结于南部港口和炼油厂通道时，库尔德自治区（KRI）开创了去中心化的**特区（SEZ）**建设模式。该模式结合了中资轻工业设备生产线与当地物流枢纽通道的天然优势。

### 核心分析重点

- **行政自主权**：通过权力下放的高效海关申报系统，苏莱曼尼亚特区（SEZ）得以对高精度工业零配件进行秒级快速清关。
- **投资架构分析**：深度剖析中资民营重工财团与当地库尔德城市开发商共同打造的合资资本结构模型。`,
        contentCkb: `### پێداچوونەوەی ڕاپۆرتی نهێنی

*ئەم توێژینەوەیە نایابە و تەنها بۆ ئەندامە دامەزراوەییە چالاکەکان بەردەستە.*

لەکاتێکدا پڕۆژە فیدراڵییەکان سەرنجی سەرەکیان لەسەر بەندەر و پاڵاوگەکانی باشوورە، هەرێمی کوردستان دەستپێشخەری کردووە لە دامەزراندنی ناوچە ئابوورییە تایبەتەکان (SEZs). بە هاوبەشی لەگەڵ کۆمپانیا پیشەسازییەکانی چین، ئەم ناوچانە بوونەتە دەروازەی گرنگ بۆ جێگیرکردنی پیشەسازی سووک.

### لایەنە سەرەکییەکانی شیکردنەوەکە

- **سەربەخۆیی ئیداری**: سیستەمی نوێی ڕێککارەکانی گومرگی لە ناوچەی ئابووری سلێمانی پڕۆسەی ڕوونکرنەوەی گومرگی بۆ ئامێرە وردەکان زۆر خێرا کردووە.
- **چوارچێوەکانی وەبەرهێنان**: شیکردنەوەی پێکهاتەی هاوبەشی سەرمایە لە نێوان کۆنسۆرتیۆمی کۆمپانیا تایبەتەکانی چین و گەشەپێدەرانی پیشەسازی ناوخۆیی کورد.`,
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        isPrivate: true,
        authorId: u2.id
      }
    ];

    for (const study of studiesData) {
      await prisma.study.upsert({
        where: { slug: study.slug },
        update: {
          titleEn: study.titleEn,
          titleAr: study.titleAr,
          titleZh: study.titleZh,
          titleCkb: study.titleCkb,
          excerptEn: study.excerptEn,
          excerptAr: study.excerptAr,
          excerptZh: study.excerptZh,
          excerptCkb: study.excerptCkb,
          contentEn: study.contentEn,
          contentAr: study.contentAr,
          contentZh: study.contentZh,
          contentCkb: study.contentCkb,
          imageUrl: study.imageUrl,
          isPrivate: study.isPrivate,
          authorId: study.authorId
        },
        create: {
          slug: study.slug,
          titleEn: study.titleEn,
          titleAr: study.titleAr,
          titleZh: study.titleZh,
          titleCkb: study.titleCkb,
          excerptEn: study.excerptEn,
          excerptAr: study.excerptAr,
          excerptZh: study.excerptZh,
          excerptCkb: study.excerptCkb,
          contentEn: study.contentEn,
          contentAr: study.contentAr,
          contentZh: study.contentZh,
          contentCkb: study.contentCkb,
          imageUrl: study.imageUrl,
          isPrivate: study.isPrivate,
          authorId: study.authorId
        }
      });
    }

    console.log('✅ Seeding studies completed successfully!');
  } catch (err) {
    console.error('❌ Error seeding studies:', err);
  }
}
