import { prisma } from './db.js';

export async function seedSourcingPillars() {
  try {
    const count = await prisma.sourcingPillar.count();
    if (count > 0) {
      return;
    }

    console.log("Seeding initial 4 Sourcing Service Pillars into database...");

    const pillars = [
      {
        slug: 'audits',
        serviceCode: 'FACTORY_AUDIT',
        iconName: 'Factory',
        order: 1,
        isActive: true,
        titleEn: 'On-Site Factory Audits',
        titleAr: 'تدقيق المصانع الميداني',
        titleZh: '原厂合规审计',
        titleCkb: 'پشکنینی مەیدانی کارگەکان',
        tagEn: '48h Field Dispatch',
        tagAr: 'فحص ميداني خلال 48 ساعة',
        tagZh: '48小时现场进驻',
        tagCkb: 'پشکنینی مەیدانی ٤٨ کاتژمێر',
        updateBadgeEn: '2026 Bilateral Audit Protocol',
        updateBadgeAr: 'بروتوكول التدقيق المعتمد 2026',
        updateBadgeZh: '2026中伊双边验厂互认准则',
        updateBadgeCkb: 'ستانداردی نوێکراوەی ٢٠٢٦',
        descEn: 'On-site technical evaluation of production lines, legal compliance, real capacity, and Middle East desert resilience.',
        descAr: 'زيارات تفتيش ميدانية لمصانع الصين للتحقق من الموثوقية القانونية والمالية والطاقة الإنتاجية الحقيقية.',
        descZh: '中伊通讯社专业工程与法务团队深入中国制造车间，实地审查资质、环保、真实产能及中东极端工况适配力。',
        descCkb: 'سەردانی مەیدانی بۆ کارگە چینییەکان بۆ دڵنیابوون لە شایستەیی یاسایی و توانای ڕاستەقینەی بەرهەمهێنان.',
        leadSummaryEn: 'Sovereign on-the-ground technical and corporate verification across Chinese manufacturing hubs to eliminate intermediary shell entities and guarantee industrial execution capacity.',
        leadSummaryAr: 'حماية المستورد العراقي من مخاطر الشركات الوهمية والوسطاء غير المعتمدين من خلال التدقيق الميداني الشامل في مواقع الإنتاج.',
        leadSummaryZh: '依托常驻北京、上海及广州的工贸核验专员，杜绝空壳贸易中介与产能欺诈，出具具法律效力的25页权威实地验厂报告。',
        leadSummaryCkb: 'پاراستنی سەرمایەی بازرگانانی عێراق و کوردستان لە ڕێگەی پشکنینی ڕاستەوخۆ لە ناو کارگەکانی چین بە ڕاپۆرتی فەرمی.',
        wordCount: 335,
        readTimeEn: '2 Min Read',
        readTimeAr: 'قراءة في دقيقتين',
        readTimeZh: '2 分钟精读',
        readTimeCkb: '٢ خولەک خوێندنەوە',
        metricsJson: JSON.stringify([
          { label: 'Dispatch Speed', value: '48 - 72 Hours', sub: 'On-Site Arrival' },
          { label: 'Jurisdiction', value: 'All 31 Provinces', sub: 'Mainland China Hubs' },
          { label: 'Accreditation', value: 'CCPIT & NECIPS', sub: 'National Registry' },
          { label: 'Risk Protection', value: '100% Anti-Fraud', sub: 'Zero Shell Entities' }
        ]),
        comprehensiveSpecificationEn: JSON.stringify([
          'The Iraq-China Agency (ICA) operates dedicated, on-the-ground industrial auditing divisions stationed permanently in Beijing, Shanghai, and Guangzhou. For Iraqi enterprises, state reconstruction ministries, and private contractors entering commercial contracts with Chinese manufacturers, on-site physical auditing represents the frontline defense against corporate fraud, shell trading entities, and counterfeit production facilities.',
          'Our technical inspection team comprises senior certified quality control engineers, licensed corporate legal auditors, and bilingual Mandarin-Arabic trade specialists who physically visit production facilities across China\'s major industrial provinces—including Guangdong, Zhejiang, Jiangsu, and Shandong. Before our inspectors cross the factory threshold, we perform rigorous pre-audit verification against the National Enterprise Credit Information Publicity System (NECIPS), verifying registered capital, verified business scope, tax status, judicial litigation history, and ultimate beneficial ownership.',
          'During the comprehensive on-site factory audit, inspectors evaluate production line operational capacity, factory workforce size, equipment calibration logs, raw material inventory buffers, environmental protection licenses, and occupational health certifications. We cross-examine export track records, verified ISO 9001 and ISO 14001 compliance standards, and verify whether the factory possesses genuine internal laboratory testing equipment capable of simulating Middle Eastern operating environments. Our team records high-definition video walkthroughs and photographic evidence of manufacturing lines, inventory depots, and testing rigs with tamper-proof cryptographic GPS and time-stamped metadata.',
          'Under the 2026 Sino-Iraqi Bilateral Trade Integrity Protocol, ICA has established direct information-sharing channels with the China Council for the Promotion of International Trade (CCPIT) and the Iraqi Ministry of Trade\'s Companies Registration Directorate. Within 48 to 72 hours of completing the physical site inspection, we deliver an exhaustive 25-page bilingual audit dossier. This report provides a quantitative integrity score, creditworthiness evaluation, production risk matrix, and definitive commercial clearance advisory. By utilizing ICA factory audits, Iraqi importers eliminate intermediary trading markups, avoid ghost manufacturers, and ensure their contractual counterparties possess the industrial capability to execute contracted deliveries reliably.'
        ]),
        comprehensiveSpecificationAr: JSON.stringify([
          'تُشكل الوكالة العراقية الصينية (ICA) المرجعية المؤسسية المعتمدة لإجراء التدقيق الميداني والتحقق الفني من المصانع داخل المقاطعات الصناعية الصينية الكبرى، مثل قوانغدونغ، تشجيانغ، جيانغسو، وشاندونغ. تهدف هذه الخدمة السيادية إلى حماية المستوردين العراقيين، والشركات الإنشائية، والجهات الحكومية من مخاطر التعامل مع الشركات الوهمية، أو الوسطاء التجاريين غير المرخصين، أو المصانع التي تفتقر إلى القدرة التشغيلية الحقيقية لتلبية العقود المبرمة.',
          'يبدأ بروتوكول التدقيق بفحص قانوني مسبق عبر النظام الوطني للمعلومات الائتمانية للمؤسسات في الصين (NECIPS)، للتأكد من رأس المال المدفوع، والوضع الضريبي، والسجل القضائي، والتراخيص البيئية. يعقب ذلك إيفاد فريق هندسي وقانوني متخصص من مكاتبنا الدائمة في بكين وشنغهاي لمعاينة خطوط الإنتاج على أرض الواقع، وفحص مستودعات المواد الخام، والتأكد من صيانة ومعايرة المعدات الثقيلة، ومراجعة سجلات السلامة المهنية وشهادات ISO 9001 و ISO 14001.',
          'يقوم المفتشون بتوثيق خطوط التجميع ومختبرات الفحص الداخلي عبر تصوير فيديو عالي الدقة (4K) مع علامات مائية جغرافية (GPS) وأختام زمنية غير قابلة للتلاعب. كما يتم فحص قدرة المنتجات على تحمل الظروف البيئية القاسية في العراق والشرق الأوسط، مثل درجات الحرارة المتجاوزة 50 درجة مئوية والعواصف الترابية الشديدة.',
          'وفقاً لتحديثات البروتوكول التجاري المشترك لعام 2026، ترتبط الوكالة بقنوات تبادل بيانات مباشرة مع المجلس الصيني لترويج التجارة الدولية (CCPIT) ودائرة تسجيل الشركات في وزارة التجارة العراقية. يحصل العميل خلال 48 إلى 72 ساعة على ملف تدقيق شامل ثنائي اللغة يتألف من 25 صفحة، يتضمن مؤشراً دقيقاً للجدارة الائتمانية، وتقييماً لمخاطر الإنتاج، وتوصية تعاقدية حاسمة تضمن أمان الاستثمار التجاري قبل تحويل أي مبالغ نقدية للمصنع.'
        ]),
        comprehensiveSpecificationZh: JSON.stringify([
          '中伊通讯社（ICA）依托设在驻北京、上海及广州的常设产业核验特派处，为伊拉克进口商、战后重建总承包商以及私营企业主提供中国制造业原厂的独立第三方驻场实地勘验。在当前复杂的跨国贸易环境中，实地验厂是阻断皮包贸易中介、虚假注册壳公司及产能欺诈的最高防线。',
          '在审核团队出发前，特派组率先通过国家企业信用信息公示系统（NECIPS）及中国贸促会（CCPIT）商业征信库，穿透式核实目标企业的实缴注册资本、实际控制人、司法涉诉案件、税务评级以及排污环保许可。随后，由具备中级以上工程资质的质检工程师与涉外法务联合进驻生产车间，实地清点流水线真实工位、精密数控机床与重型冲压设备的运转率，审查原材料安全库存与批次检验记录。',
          '质检组重点核实工厂是否具备针对中东极端干热沙漠气候（耐受+55°C高温及强风沙侵蚀）的内部专业实验室，并对流水线实效产能进行量化测算。现场核验全过程采用具备GPS卫星定位与时间戳防伪水印的4K超清摄像进行闭环留痕。',
          '根据2026年最新实施的中伊双边贸易互信准则，中伊通讯社与伊拉克贸易部企业注册总局建立定期信披通道。勘验结束后48至72小时内，中伊通讯社向客户出具长达25页的中阿双语权威审计报告，包含企业信用评级量化积分、交付违约风险矩阵以及法律签约指导建议，全面护航伊拉克对华采购资金的安全链条。'
        ]),
        comprehensiveSpecificationCkb: JSON.stringify([
          'ئاژانسی عێراق و چین (ICA) لە ڕێگەی تیمە پسپۆڕ و ئەندازیارییەکانیەوە لە پەکین، شەنگەهای و گوانگژۆ، خزمەتگوزاری پشکنینی مەیدانی و باوەڕپێکراو پێشکەش بە بازرگانان و کۆمپانیاکانی عێراق و هەرێمی کوردستان دەکات. ئەم پشکنینە مەیدانییە ڕێگری لە فێڵکردن، کۆمپانیا وەهمییەکان و ناوەندگیرە بێ متمانەکان دەکات کە زیان بە سەرمایەی نیشتمانی دەگەیەنن.',
          'تیمی پشکنین پێش چوونیان بۆ کارگەکە، لە سیستەمی فەرمی تۆماری بازرگانی چین (NECIPS) وردبینی لە سەرمایەی کۆمپانیاکە، باج، کێشە یاساییەکان و مۆڵەتە ژینگەییەکان دەکەن. پاشان ئەندازیارانی شارەزا سەردانی کارگەکان لە شارە پیشەسازییە گەورەکانی وەک گوانگدۆنگ، ژێجیانگ و جیانگسو دەکەن، بۆ پشکنینی هێڵەکانی بەرهەمهێنان، توانای ڕۆژانەی کارگە، ژمارەی کرێکاران و جۆرایەتی ئامێرەکان بە پێی ستانداردەکانی ISO 9001 و ISO 14001.',
          'هەروەها پشکنین بۆ ئەوە دەکرێت ئایا بەرهەمەکان بەرگەی کەشوهەوای توندی عێراق و گەرمای سەروو ٥٠ پلە دەگرن یاخود نا. هەموو قۆناغەکان بە ڤیدیۆی کوالیتی بەرز و لۆکەیشنی GPSی دەستکاری نەکراو بە دۆکیومێنت دەکرێن بۆ سەلماندنی واقیعی بوونی کارگەکە.',
          'بەپێی ڕێککەوتنی بازرگانی ٢٠٢٦، ڕاپۆرتێکی ٢٥ لاپەڕەیی بە دوو زمانی عەرەبی و ئینگلیزی لە ماوەی ٤٨ تا ٧٢ کاتژمێردا پێشکەش بە کڕیار دەکرێت بۆ دڵنیابوون لە شایستەیی و توانای کارگەکە پێش ناردنی هیچ بڕە پارەیەک، ئەمەش سەلامەتی تەواو بە سەرمایەگوزارییەکان دەبەخشێت.'
        ]),
        updates2026En: JSON.stringify([
          'Direct live data-exchange with CCPIT corporate registry and Iraqi Ministry of Trade Companies Directorate.',
          'Mandatory environmental resilience testing for extreme Middle East heat (+55°C) and desert dust ingress.',
          'Tamper-evident 4K video inspection logs verified with dual Beidou/GPS cryptographic timestamps.'
        ]),
        updates2026Ar: JSON.stringify([
          'الربط المباشر مع قاعدة بيانات المجلس الصيني (CCPIT) ودائرة تسجيل الشركات العراقية لعام 2026',
          'اعتماد ملحق فحص الصمود المناخي للشرق الأوسط (مقاومة درجات الحرارة فوق 50+ والغبار الصحراوي)',
          'نظام التوثيق الفيديوي عالي الدقة (4K) المزود بالأختام الزمنية الفضائية المشفرة غير القابلة للتزييف'
        ]),
        updates2026Zh: JSON.stringify([
          '2026年正式连通中国贸促会（CCPIT）与伊拉克贸易部双向涉企信用黑白名单数据库',
          '出台针对中东地区+55°C极端高温与沙漠沙尘环境的专属原厂耐受力实测认证准则',
          '全线启用带防伪时间戳与GPS北斗双模卫星加密水印的4K实景勘查影像留痕系统'
        ]),
        updates2026Ckb: JSON.stringify([
          'پەیوەندی ڕاستەوخۆ بە داتابەیسی باوەڕپێکراوی ٢٠٢٦',
          'پشکنینی تایبەت بۆ بەرگەگرتنی گەرمای ٥٥+ پلە',
          'سیستەمی ڤیدیۆیی 4K بە لۆکەیشنی GPS'
        ]),
        deliverablesEn: JSON.stringify([
          '25-Page Signed & Stamped Bilingual Factory Audit Dossier',
          'Full NECIPS Enterprise Registry & Judicial Litigation Extract',
          '4K Video Inspection Walkthrough & High-Resolution Photographic Log',
          'Commercial Risk Scoring Matrix & Legal Procurement Clearance Advisory'
        ]),
        deliverablesAr: JSON.stringify([
          'ملف تدقيق رسمي ثنائي اللغة من 25 صفحة مختوم بختم الوكالة الرسمي',
          'سجل الائتمان التجاري الصيني المعتمد والفحص القضائي الشامل',
          'تسجيلات فيديو 4K للمصنع وصور فوتوغرافية عالية الدقة للمعدات',
          'شهادة التقييم الائتماني النهائي وتوصية الشراء والتعاقد الآمن'
        ]),
        deliverablesZh: JSON.stringify([
          '25页中阿/中英双语版《权威实地验厂综合评估报告书》（盖中伊通讯社官方防伪钢印）',
          '国家企业信用信息公示系统（NECIPS）官方征信穿透底档与司法诉讼审查报告',
          '现场4K高清生产线、实验室仪器实测及仓储库容全景录像与高清特写图集',
          '中伊双边贸易委员会合规评级证书与采购风险对冲决策建议书'
        ]),
        deliverablesCkb: JSON.stringify([
          'ڕاپۆرتی ٢٥ لاپەڕەیی بە مۆری فەرمی',
          'تۆماری فەرمی باج و مۆڵەتی کارگە',
          'ڤیدیۆی 4K و وێنەی سەرجەم بەشەکانی کارگە',
          'بڕوانامەی متمانەی کارگە و ڕێنمایی گرێبەست'
        ]),
        standardsJson: JSON.stringify(['ISO 9001:2015', 'CCPIT Verified', 'Iraqi MoT Protocol', 'NECIPS Audited'])
      },
      {
        slug: 'sourcing',
        serviceCode: 'PRODUCT_SOURCING',
        iconName: 'Search',
        order: 2,
        isActive: true,
        titleEn: 'Direct Product Sourcing',
        titleAr: 'توريد البضائع والآلات',
        titleZh: '一手货源直采',
        titleCkb: 'دابینکردنی ڕاستەوخۆ',
        tagEn: 'Tier-1 Industrial Clusters',
        tagAr: 'ربط مباشر بالمجمعات الصناعية',
        tagZh: '直通头部产业集群',
        tagCkb: 'ناوەندە پیشەسازییەکان',
        updateBadgeEn: '2026 Direct Wholesale Corridor',
        updateBadgeAr: 'ممر الشراء بسعر المصنع 2026',
        updateBadgeZh: '2026出厂价闭环竞价走廊',
        updateBadgeCkb: 'ڕێڕەوی کڕین بە نرخی کارگە ٢٠٢٦',
        descEn: 'Direct access to premier Chinese manufacturing clusters for industrial machinery, solar energy systems, and raw materials at verified wholesale rates.',
        descAr: 'وصول مباشر إلى كبرى المجمعات الصناعية الصينية لشراء الآلات ومعدات الطاقة والمواد الخام بأسعار المصنع.',
        descZh: '直接连通源头产业带与国家级产业集群，以一手出厂批发价采购重型工程设备、光伏储能与大宗工业原料。',
        descCkb: 'دەستڕاگەیشتنی ڕاستەوخۆ بە کارگە سەرەکییەکانی چین بۆ کڕینی ئامێری قورس و پێداویستییەکان بە نرخی کارگە.',
        leadSummaryEn: 'Bypassing speculative middleman markups by connecting Iraqi procurement directly with China’s premier state-certified industrial clusters and Tier-1 original equipment manufacturers (OEMs).',
        leadSummaryAr: 'إلغاء هوامش الربح المتراكمة للوسطاء بنسبة 18% إلى 35% من خلال ربط المستوردين العراقيين بمصادر الإنتاج الأولية مباشرة.',
        leadSummaryZh: '剔除传统外贸中18%至35%的多层倒手加价，依托双边专席开展规范竞价，直通江苏常州、徐州、广东佛山等制造业腹地。',
        leadSummaryCkb: 'لابردنی دەڵاڵ و ناوەندگیرەکان و کەمکردنەوەی تێچوو بە ڕێژەی ١٨٪ تا ٣٥٪ بە پەیوەندی ڕاستەوخۆ لەگەڵ کارگەکان.',
        wordCount: 335,
        readTimeEn: '2 Min Read',
        readTimeAr: 'قراءة في دقيقتين',
        readTimeZh: '2 分钟精读',
        readTimeCkb: '٢ خولەک خوێندنەوە',
        metricsJson: JSON.stringify([
          { label: 'Cost Savings', value: '18% - 35%', sub: 'Middleman Markup Cut' },
          { label: 'Manufacturer Tier', value: 'Tier-1 & State Hubs', sub: 'Original Equipment Mfrs' },
          { label: 'Contract Law', value: 'Dual Jurisdiction', sub: 'Bilingual Enforceable' },
          { label: 'Payment Escrow', value: 'e-CNY / IQD Escrow', sub: 'Sovereign Clearing Eligible' }
        ]),
        comprehensiveSpecificationEn: JSON.stringify([
          'Navigating cross-border procurement between Iraq and China requires cutting through redundant layers of commercial commission agents, export brokers, and regional distributors who systematically inflate equipment costs by 18% to 35%. The Iraq-China Agency\'s sovereign product sourcing service bridges Iraqi importers, construction consortia, healthcare providers, and agricultural operators directly to China\'s premier state-recognized manufacturing clusters and Tier-1 industrial powerhouses.',
          'ICA maintains strategic liaison partnerships with China’s premier industrial federations, including the China Machinery Industry Federation, the China Photovoltaic Industry Association (CPIA), the China National Light Industry Council, and municipal commerce bureaus across industrial epicenters such as Changzhou (solar & renewables), Wenzhou (electrical switchgear & pumps), Xuzhou (heavy construction machinery), Foshan (building materials & ceramics), and Weihai (marine equipment). When an Iraqi client submits technical specifications, our bilateral sourcing desks in Beijing and Baghdad initiate structured competitive bidding among pre-vetted original equipment manufacturers (OEMs).',
          'Our team conducts comprehensive commercial price benchmarking, bill-of-materials (BOM) analysis, and technical spec-matching to ensure all sourced machinery, components, and raw materials strictly conform to Iraqi project requirements and desert-hardened operational standards. We supervise contract drafting under dual-jurisdiction legal templates that integrate bilingual Mandarin-Arabic clauses, protecting warranty obligations, spare-parts supply guarantees, and on-site engineering installation commitments. We also review supplier solvency ratios, factory supply-chain stability, and historical delivery punctuality across previous state infrastructure projects to prevent costly project stalls.',
          'In alignment with 2026 bilateral digital settlement frameworks, all procurement contracts facilitated through ICA are fully eligible for direct IQD-to-e-CNY sovereign clearing corridors. This bypasses SWIFT intermediary conversion penalties and safeguards purchase funds in escrow until initial production milestones are physically certified by our engineers. Whether procuring heavy excavators, grid-scale solar inverters, hospital-grade diagnostic systems, or prefabricated steel structures, ICA guarantees genuine ex-factory wholesale pricing, zero hidden markups, and direct access to original engineering design teams for long-term project viability across all Iraqi governorates.'
        ]),
        comprehensiveSpecificationAr: JSON.stringify([
          'تُتيح خدمة التوريد المباشر من الوكالة العراقية الصينية (ICA) للمستوردين العراقيين وشركات المقاولات والقطاعات الصناعية الاستفادة القصوى من القوة التصنيعية للصين، عبر إلغاء السماسرة والموزعين والوسطاء التجاريين الذين يتسببون في رفع التكاليف بنسب تتراوح بين 18% و 35%. نحن نربط المشتري العراقي مباشرة بأكبر المجمعات الصناعية المعتمدة ومصانع الفئة الأولى (Tier-1).',
          'تمتلك الوكالة شراكات مؤسسية استراتيجية مع كبرى الاتحادات الصناعية الصينية، كالاتحاد الصيني لصناعة الآلات، وجمعية الصناعات الكهروضوئية (الطاقة الشمسية)، ومجالس التجارة في المدن الصناعية الرائدة مثل تشانغتشو، وفوشان (مواد البناء والسيراميك)، وتشانغشا وشوزهو (الآلات الإنشائية والمعدات الثقيلة)، وونتشو (المعدات الكهربائية ومضخات المياه). عند تقديم مواصفات المشروع، ينظم مكتب التوريد مناقصات مغلقة بين المصانع لضمان الحصول على أفضل سعر تصنيع حقيقي.',
          'تشمل خدماتنا تدقيق جداول الكميات والمواصفات الفنية (BOM)، والتأكد من مطابقة المعدات للمعايير المناخية الصارمة في العراق، وصياغة عقود تجارية ثنائية اللغة (عربي - صيني) تضمن حقوق الضمان، وتوفير قطع الغيار الأصلية لمدة لا تقل عن 5 سنوات، وإلزام المصنع بإرسال مهندسي تركيب وتشغيل عند الطلب. كما نقوم بمراجعة الملاءة المالية للمورد لمنع تعثر المشاريع.',
          'ضمن الإطار المالي المحدث لعام 2026، تستفيد عقود التوريد المبرمة عبر الوكالة من ممر التسوية المباشر بالدينار العراقي واليوان الرقمي (e-CNY)، مع نظام الضمان المالي المشترك (Escrow) الذي يحتجز دفعات المورد إلى حين اجتياز البضائع لاختبارات الجودة في المصنع. يضمن هذا النهج للمستوردين في بغداد والبصرة وأربيل الحصول على معدات عالمية بأقل كلفة وبحماية قانونية كاملة.'
        ]),
        comprehensiveSpecificationZh: JSON.stringify([
          '中伊通讯社（ICA）一手货源直采服务致力于打破传统中伊跨国贸易中层层转包、中间商层层加价的弊端（传统中间环节溢价高达18%至35%）。我们直接搭建伊拉克进口商、基础设施建设总包商、医疗卫生系统及农业灌溉机构与中国国家级产业集群、头部一级制造企业（Tier-1）之间的直连高速公路。',
          '依托与中国机械工业联合会、中国光伏行业协会、中国轻工业联合会以及各大重点工业城市的深度协作，中伊通讯社直通江苏常州（光伏与新能源装备）、徐州（工程机械集群）、广东佛山（陶瓷建材与卫浴）、浙江温州（工业电气与泵阀）等全球核心制造基地。在收到伊拉克的具体技术图纸与采购清单后，我们在中伊两地专席启动闭环竞价招标，直接获取最具竞争力的出厂底价。',
          '我们的工程专家团队协助客户开展物料清单（BOM）穿透分析，确保所采购机电产品完全匹配伊拉克电网波动范围与极端高温沙漠工况。同时，提供受双边法律保护的中阿双语标准采购合同，严格锁定产品质保期、原厂备件长效供应承诺及技术驻场指导服务。我们全面评估供应商财务偿债能力与历史合同履约率，杜绝工程延误风险。',
          '配合2026年最新落地的中伊主权资金清算体系，所有经由中伊通讯社促成的采购合同均可接入第纳尔与数字人民币（e-CNY）点对点支付走廊，免除美金中转繁复摩擦与汇率剥削，并享有里程碑生产资金托管安全保障，让每一笔伊拉克重建采购资金都切实转化为硬核工业价值。'
        ]),
        comprehensiveSpecificationCkb: JSON.stringify([
          'خزمەتگوزاری دابینکردنی ڕاستەوخۆی کاڵا لە ئاژانسی عێراق و چین (ICA) دەستڕاگەیشتنی ڕاستەوخۆ بۆ بازرگانان و کۆمپانیاکانی بیناسازی لە عێراق و کوردستان بە کارگە سەرەکییەکانی چین دابین دەکات، بەبێ دەستوەردانی دەڵاڵ و ناوەندگیرەکان کە زۆرجار نرخەکان بە ڕێژەی ١٨٪ تا ٣٥٪ بەرز دەکەنەوە.',
          'ئێمە پەیوەندی بەهێزمان لەگەڵ گەورەترین یەکێتییە پیشەسازییەکانی چین هەیە، لەوانە کەرتی ئامێری قورس، وزەی خۆر، کەلوپەلی بیناسازی، و کەرەستەی ئەلیکترۆنی لە ناوەندە پیشەسازییە گەورەکانی وەک چانگژۆ، فۆشان و وێنزۆ. کاتێک کڕیار داواکاری پێشکەش دەکات، تیمەکانمان لە پەکین و بەغدا کێبڕکێ لە نێوان کارگەکان دروست دەکەن بۆ دەستکەوتنی کەمترین نرخی کارگە.',
          'هەروەها پشکنین بۆ کوالیتی و گونجاوی ئامێرەکان لەگەڵ ژینگەی ناوچەکە دەکرێت، لەگەڵ گرێبەستی فەرمی بە دوو زمانی عەرەبی و چینی بۆ گەرەنتی کردنی پارچەی یەدەگ و خزمەتگوزاری دوای فرۆشتن بۆ ماوەی ٥ ساڵ. هەروەها دڵنیادەبینەوە لە توانای دارایی کارگەکە بۆ ئەوەی پڕۆژەکان دوانەکەون.',
          'بەپێی ڕێکارە داراییەکانی ٢٠٢٦، پارەدان دەتوانرێت ڕاستەوخۆ بە دینار و یوانی دیجیتاڵی (e-CNY) ئەنجام بدرێت بە پارێزراوی تەواو لە ڕێگەی حسابی متمانەپێکراوەوە تا ئەو کاتەی کاڵاکە بە فەرمی پشکنینی بۆ دەکرێت و پەسەند دەکرێت.'
        ]),
        updates2026En: JSON.stringify([
          'Direct escrow integration linking CBI institutional accounts and PBOC digital Yuan (e-CNY).',
          'Official transparent cost-benchmarking indexes for heavy machinery, solar PV, and power gear.',
          'Mandatory 5-year OEM spare parts supply covenants and on-site commissioning guarantees in contracts.'
        ]),
        updates2026Ar: JSON.stringify([
          'تفعيل حسابات الضمان المشتركة بين البنك المركزي العراقي وبنك الشعب الصيني (e-CNY) لعقود التوريد 2026',
          'نموذج الشفافية السعرية المعتمد للآلات الثقيلة ومعدات الطاقة المتجددة ومحولات الطاقة',
          'إلزامية بند توريد قطع الغيار الأصلية لمدة 5 سنوات وضمان إيفاد المهندسين في العقود الرسمية'
        ]),
        updates2026Zh: JSON.stringify([
          '全面打通伊拉克中央银行（CBI）与数字人民币（e-CNY）定向工程采购托管履约账户',
          '建立重型工程机械、光伏组件及电网变压器专项出厂成本透明对标模型',
          '中阿双语标准采购合同中强制纳入5年原厂核心备件质保与工程师派驻条款'
        ]),
        updates2026Ckb: JSON.stringify([
          'چالاککردنی حسابی پارێزراوی هاوبەش بۆ دابینکردن بە یوان',
          'مۆدێلی نرخی ڕاستەقینەی ئامێرە قورسەکان و وزەی خۆر',
          'مەرجی فەرمی دابینکردنی پارچەی یەدەگ بۆ ٥ ساڵ لە گرێبەستدا'
        ]),
        deliverablesEn: JSON.stringify([
          'Itemized Ex-Factory Wholesale Price Comparison & BOM Benchmark Dossier',
          'Dual-Jurisdiction Bilingual Commercial Purchase Agreement & Arbitration Clauses',
          'Manufacturer 5-Year Core Component Warranty & Field Engineering Mandate',
          'Milestone Escrow Authorization Letter for Sovereign IQD/e-CNY Settlement'
        ]),
        deliverablesAr: JSON.stringify([
          'جدول مقارنة الأسعار المباشرة من المصنع وتحليل تكلفة المواد (BOM)',
          'عقد شراء ملزم قانونياً باللغتين العربية والصينية خاضع للتحكيم الدولي',
          'شهادة ضمان أصلية للقطع الأساسية وتفويض فني معتمد لخدمات الصيانة',
          'خطاب اعتماد مصرفي للدفع عبر الضمان المالي لمراحل الإنتاج (Escrow)'
        ]),
        deliverablesZh: JSON.stringify([
          '原厂出厂价（Ex-Factory Price）全透明竞价清单与BOM物料成本比对报告',
          '受双边国际经贸仲裁委认可的中阿双语法定采购协议（包含违约赔偿惩罚条款）',
          '原厂出具的5年核心部件正品保证书与售后技术工程师派驻授权书',
          '双边数字人民币托管履约确认函（Milestone Escrow Clearance Letter）'
        ]),
        deliverablesCkb: JSON.stringify([
          'خشتەی بەراوردی نرخ لە کارگە و پێکهاتەی کاڵا',
          'گرێبەستی فەرمی بە دوو زمان بە مەرجی قەرەبووکردنەوە',
          'بڕوانامەی گەرەنتی پارچەی ئەسڵی و خزمەتگوزاری چاککردنەوە',
          'پەسەندکردنی پارەدانی قۆناغ بە قۆناغ لە ڕێگەی حسابی پارێزراو'
        ]),
        standardsJson: JSON.stringify(['BOM Audited', 'China Machinery Fed', 'CPIA Solar Standard', 'Bilingual Contract'])
      },
      {
        slug: 'qc',
        serviceCode: 'QUALITY_CONTROL',
        iconName: 'ShieldCheck',
        order: 3,
        isActive: true,
        titleEn: 'Pre-Shipment Quality Control',
        titleAr: 'مراقبة الجودة والفحص',
        titleZh: '出港前质检 (QC)',
        titleCkb: 'کۆنترۆڵی جۆرایەتی پێش بارکردن',
        tagEn: 'COSQC & ISO 17020 Standard',
        tagAr: 'معايير التقييس والسيطرة النوعية',
        tagZh: 'COSQC与ISO严格标准',
        tagCkb: 'ستانداردی COSQC و ISO',
        updateBadgeEn: '2026 Extreme Climate Stress Testing',
        updateBadgeAr: 'اختبارات الصمود لبيئة العراق 2026',
        updateBadgeZh: '2026中东耐极端沙尘与高温测试',
        updateBadgeCkb: 'پشکنینی بەرگەگرتنی گەرما و تۆز',
        descEn: 'Multi-point statistical sampling, harsh Middle East environmental simulation, and supervised container sealing before vessel boarding.',
        descAr: 'بروتوكولات فحص صارمة متعددة المراحل قبل شحن الحاويات للقضاء على أي عيوب تصنيعية أو عدم مطابقة للمواصفات.',
        descZh: '离港前多重盲测抽检与中东耐候性能强化测试，全程监管装箱封条，杜绝瑕疵品与假冒伪劣货物出海。',
        descCkb: 'پشکنینی توند پێش بارکردن بەپێی ستانداردە نێودەوڵەتییەکان بۆ ڕێگریکردن لە هەر کەموکوڕییەک لە بەرهەمەکاندا.',
        leadSummaryEn: 'Executing rigorous ANSI/ASQ Z1.4 blind sampling and certified Iraqi COSQC compliance testing to ensure zero defective goods enter Iraqi ports of entry.',
        leadSummaryAr: 'فحص شامل متوافق بنسبة 100% مع معايير الجهاز المركزي للتقييس والسيطرة النوعية العراقي (COSQC) واختبارات الإجهاد الحراري.',
        leadSummaryZh: '严格依据伊拉克中央标准化与质量控制局（COSQC）准则与国际ISO/IEC 17020规范，执行100%独立盲抽与耐+55°C老化测试。',
        leadSummaryCkb: 'پشکنینی ورد بەپێی ستانداردەکانی دەزگای کۆنترۆڵی جۆری عێراق (COSQC) و بەرگەگرتنی گەرمای سەروو ٥٥ پلە.',
        wordCount: 330,
        readTimeEn: '2 Min Read',
        readTimeAr: 'قراءة في دقيقتين',
        readTimeZh: '2 分钟精读',
        readTimeCkb: '٢ خولەک خوێندنەوە',
        metricsJson: JSON.stringify([
          { label: 'Sampling Model', value: '100% Blind ANSI/ASQ', sub: 'Zero Vendor Bias' },
          { label: 'Climate Stress', value: '+55°C Desert Test', sub: 'IP65/IP68 Validated' },
          { label: 'Inspection Cert', value: 'Official COI Issued', sub: 'Direct Port Acceptance' },
          { label: 'Tamper Sealing', value: 'QR Bolt Seals', sub: 'Cryptographic Seals' }
        ]),
        comprehensiveSpecificationEn: JSON.stringify([
          'To protect Iraq\'s national infrastructure, consumer markets, and capital investment from substandard, defective, or counterfeit imports, the Iraq-China Agency executes rigorous multi-point pre-shipment quality control (QC) and container loading supervision throughout China\'s export manufacturing hubs. Every industrial shipment destined for Umm Qasr Port, Basra Oil Terminal, Baghdad International Airport, or Erbil dry ports must satisfy stringent operational criteria before departure.',
          'Our certified quality assurance engineers operate in accordance with international ISO/IEC 17020 inspection protocols, ANSI/ASQ Z1.4 statistical sampling standards, and the authoritative standards established by Iraq’s Central Organization for Standardization and Quality Control (COSQC). We conduct 100% blind sampling rather than vendor-selected sample reviews, verifying critical physical dimensions, electronic tolerance, structural welding integrity, surface coating thickness, tensile yield strength, and fire-retardant compliance.',
          'Recognizing the extreme environmental operating realities across Iraq—including prolonged summer temperatures exceeding +55°C, high-density desert dust storms, and voltage instability in regional power grids—ICA mandates specialized environmental resilience stress tests. Electrical components, solar panels, and cooling compressors undergo thermal endurance chamber cycling, dielectric insulation tests, and ingress protection (IP65/IP68) dust ingress validation in accredited laboratories prior to export approval.',
          'Once goods successfully pass technical testing, our inspectors personally oversee container stuffing at port staging warehouses in Shanghai, Ningbo, Qingdao, and Shenzhen. We verify carton count against the commercial packing list, inspect humidity control dessicants, examine pallet strapping and lashing integrity to withstand maritime transit, and attach numbered, tamper-evident bolt seals backed by cryptographic QR barcodes. The official ICA Certificate of Inspection (CoI) and complete photographic dossier are digitally uploaded to the Iraqi customs clearance portal, enabling accelerated green-lane processing upon vessel docking and shielding Iraqi importers from catastrophic port-of-entry rejections.',
          'Furthermore, in the event of manufacturing non-compliance detected during testing, our on-site engineers immediately trigger binding rectification orders, mandating factory remediation or complete batch replacement prior to customs dispatch, guaranteeing zero financial exposure for the buyer.'
        ]),
        comprehensiveSpecificationAr: JSON.stringify([
          'تُعد خدمة مراقبة الجودة والفحص قبل الشحن (QC) من الركائز الأساسية التي توفرها الوكالة لحماية السوق العراقي والمشاريع الاستراتيجية من دخول البضائع الرديئة أو غير المطابقة للمواصفات. يتم تنفيذ كافة عمليات المعاينة وفقاً للمعايير الصارمة للجهاز المركزي للتقييس والسيطرة النوعية العراقي (COSQC) والبروتوكول الدولي ISO/IEC 17020.',
          'تعتمد فرقنا أسلوب الفحص العشوائي الأعمى الصارم وفق جدول العينات المعياري ANSI/ASQ Z1.4، رافضة تماماً الاكتفاء بالعينات التي يختارها المصنع. يقوم مهندسونا بفحص الأبعاد الهندسية، وسلامة اللحام الهيكلي، ومقاومة الشد، وسماكة الطلاء، ومقاومة الحريق، والتحمل الكهربائي للأجهزة تحت تقلبات الجهد الكهربائي المتكررة.',
          'نظراً لطبيعة المناخ في العراق، تخضع المعدات والآلات والألواح الشمسية والمحولات لاختبارات إجهاد حراري خاصة داخل غرف محاكاة بيئية تصل إلى +55 درجة مئوية، واختبارات العزل ضد الرمال والغبار الدقيق (معايير IP65 و IP68). لا يتم منح الموافقة على الشحن إلا بعد اجتياز هذه الاختبارات المعملية بنجاح بنسبة 100%.',
          'عند مرحلة التحميل، يشرف مفتشونا ميدانياً على عملية تعبئة الحاويات في موانئ التصدير الصينية كشنغهاي ونينغبو وقوانغتشو. يتم التأكد من سلامة التغليف، وتثبيت الطرود بأحزمة أمان متطورة، ووضع مواد امتصاص الرطوبة، وإغلاق الحاوية بأختام بولت فولاذية مرقمة ومزودة بباركود رقمي مشفر. تصدر الوكالة شهادة فحص وتفتيش رسمية (COI) مدمجة في النظام الجمركي العراقي، مما يضمن التخليص الأخضر الفوري في الموانئ العراقية وتفادي رفض الشحنات.',
          'في حال اكتشاف أي خلل مصنعي أثناء الفحص، تصدر الوكالة أمراً ملزماً للمصنع بإعادة التصنيع أو استبدال الدفعة بالكامل دون أي تكلفة إضافية على المستورد العراقي.'
        ]),
        comprehensiveSpecificationZh: JSON.stringify([
          '为了坚决遏止劣质品、仿冒品和不达标产品流入伊拉克基础设施建设与消费品市场，中伊通讯社（ICA）在中国各大沿海港口及重点制造重镇执行严密的出港前批次质量检验（QC）与全流程装箱监装。所有发往伊拉克乌姆盖斯尔港、巴士拉港、巴格达及埃尔比勒的货物，在离港前均须通过严苛的技术大纲考验。',
          '质检体系严格遵从国际ISO/IEC 17020独立检验机构准则、ANSI/ASQ Z1.4统计抽样国际标准，并全面接轨伊拉克中央标准化与质量控制局（COSQC）强制性国家规范。我们采取100%独立盲抽模式，杜绝工厂挑拣送检；实测几何公差、电子电气绝缘抗阻、钢结构探伤焊缝强度、防腐防锈涂层膜厚以及阻燃绝缘等级。',
          '针对伊拉克常年突破+55°C极端地表高温、沙尘暴侵蚀以及电网电压谐波波动剧烈的严峻环境，特派质检组组织实施耐候性强化老化测试、IP65/IP68沙尘密封阻绝验证与热应变测试。只有在权威检测数据完全合格后，方可签署出港许可。',
          '在最后的集装箱封箱阶段，质检员进驻宁波、上海、青岛及深圳等口岸监管仓，现场核验件数、抗浪涌加固绑扎带与工业级防潮干燥剂，并亲手施加带有防伪加密二维码的唯一编号钢制高保封条。签发的官方出港质检证书（COI）直传伊拉克港口海关系统，享受绿色通道快速验放，彻底终结滞港退运风险。',
          '一旦在检测中发现质量不合格现象，中伊通讯社质检组即刻启动法律强制返工与整批退货程序，确保伊拉克买家资金绝不承担瑕疵货风险。'
        ]),
        comprehensiveSpecificationCkb: JSON.stringify([
          'خزمەتگوزاری کۆنترۆڵی جۆرایەتی (QC) پێش بارکردن لەلایەن ئاژانسی عێراق و چینەوە بۆ پاراستنی بازاڕی عێراق و هەرێمی کوردستانە لە کاڵای خراپ، ساختە و بێ کوالیتی. هەموو پشکنینەکان بەپێی ستانداردەکانی دەزگای کۆنترۆڵی جۆری عێراق (COSQC) و ستانداردی جیهانی ISO/IEC 17020 ئەنجام دەدرێن.',
          'ئەندازیارانی ئێمە نموونەی هەڕەمەکی لە کۆگاکان هەڵدەبژێرن و پشکنین بۆ قەبارە، بەهێزی لەحیم، بەرگەگرتنی کارەبایی، و ماددە سەرەتاییەکان دەکەن. بە لەبەرچاوگرتنی کەشوهەوای گەرمی عێراق و کوردستان، ئامێرەکان تاقی دەکرێنەوە بۆ بەرگەگرتنی پلەی گەرمای سەروو ٥٥ پلە و تۆزوخۆڵ بەپێی ستانداردەکانی IP65 و IP68.',
          'لە کاتی بارکردنی کۆنتێنەرەکان لە بەندەرەکانی شەنگەهای، نینگبۆ و شێنزن، نوێنەرانی ئێمە لەوێن بۆ دڵنیابوون لە شێوازی پاکەتکردن و بەستنەوەی کاڵاکان. پاشان مۆری تایبەتی دژە فێڵ بە ژمارە و کۆدی QR لە کۆنتێنەرەکان دەدرێت و بڕوانامەی فەرمی پشکنین (COI) دەردەچێت، ئەمەش دەبێتە هۆی پاککردنەوەی خێرای گومرگی لە بەندەری ئوم قەسر بەبێ گیروگرفت.',
          'ئەگەر لە کاتی پشکنیندا کاڵاکان کێشەیان هەبێت، دەستبەجێ فەرمانی چاککردنەوە یان گۆڕینی کاڵاکە دەدرێتە کارگەکە پێش ئەوەی باربکرێت، بەبێ ئەوەی کڕیار تووشی هیچ زەرەرێکی دارایی ببێتەوە.'
        ]),
        updates2026En: JSON.stringify([
          'Direct digital integration with Iraqi COSQC electronic conformity verification database.',
          'Specialized laboratory test suites for power-grid voltage fluctuations and solar inverter thermal derating.',
          'Smart tamper-evident bolt seals equipped with cryptographic QR verification and GPS telemetry logs.'
        ]),
        updates2026Ar: JSON.stringify([
          'التكامل الرقمي المباشر مع منصة الجهاز المركزي للتقييس والسيطرة النوعية العراقي (COSQC) لعام 2026',
          'إجراء اختبارات معملية إلزامية لمقاومة تذبذب الجهد الكهربائي وموجات الحرارة للأجهزة ومعدات الطاقة',
          'تطبيق أختام البولت الفولاذية الذكية المزودة برمز استجابة سريعة (QR) مشفر مع التتبع الفضائي'
        ]),
        updates2026Zh: JSON.stringify([
          '全面执行2026中伊进出口检验检测互认大纲，直连伊拉克COSQC数字检验备案平台',
          '针对中东电网谐波畸变、高压浪涌以及光伏逆变器高温降额设置专项实验室实测指标',
          '集装箱铅封升级为北斗/GPS感应与不可逆加密防伪二维码高保密钢丝锁'
        ]),
        updates2026Ckb: JSON.stringify([
          'پەیوەستبوونی دیجیتاڵی بە سیستەمی کۆنترۆڵی جۆری عێراق ٢٠٢٦',
          'پشکنینی توند بۆ بەرگەگرتنی کارەبا و پلەی گەرمای بەرز',
          'مۆری زیرەکی فولازی بە کۆدی پارێزراوی QR'
        ]),
        deliverablesEn: JSON.stringify([
          'Official Certificate of Inspection (CoI) Endorsed for Expedited Green-Lane Clearance',
          'Laboratory Climate Stress, IP Dust Protection & Dielectric Endurance Test Report',
          'Full Photographic & Video Container Stuffing Supervision & Lashing Dossier',
          'Numbered Cryptographic Bolt Seal Verification Certificate with QR Hash'
        ]),
        deliverablesAr: JSON.stringify([
          'شهادة الفحص والتفتيش الرسمية (COI) المعتمدة للتخليص الجمركي الفوري',
          'تقرير الاختبارات المعملية للتحمل الحراري والعزل ضد الغبار والتذبذب الكهربائي',
          'ملف التوثيق الفيديوي والصوري لعملية التعبئة والتثبيت داخل الحاوية',
          'شهادة الختم الأمني الفولاذي المرقم للحاوية'
        ]),
        deliverablesZh: JSON.stringify([
          '官方正本出港前批次质量检测证书（COI Certificate of Inspection，具海关免检绿色通道效力）',
          '实验室耐高温（+55°C）、防尘（IP65/IP68）与抗浪涌耐压权威实验数据报告',
          '装箱全程4K照片与高清视频监装归档卷宗（含箱体无损检查与防潮布设记录）',
          '唯一加密编号高保钢封防伪凭条（Tamper-Evident High Security Seal Certificate）'
        ]),
        deliverablesCkb: JSON.stringify([
          'بڕوانامەی پشکنینی کوالیتی (COI) بۆ دەرچوونی خێرای گومرگی',
          'ڕاپۆرتی تاقیگەیی بەرگەگرتنی گەرما و تۆز',
          'دۆکیومێنتی ڤیدیۆ و وێنەی بارکردنی کاڵاکان لە ناو کۆنتێنەر',
          'بڕوانامەی مۆری پارێزراوی کۆنتێنەر'
        ]),
        standardsJson: JSON.stringify(['COSQC Aligned', 'ISO/IEC 17020', 'ANSI/ASQ Z1.4', 'IP68 Certified'])
      },
      {
        slug: 'logistics',
        serviceCode: 'LOGISTICS',
        iconName: 'Ship',
        order: 4,
        isActive: true,
        titleEn: 'Logistics & Customs Clearance',
        titleAr: 'الشحن والتخليص الجمركي',
        titleZh: '航运与绿色通关',
        titleCkb: 'گواستنەوە و گومرگی خێرا',
        tagEn: 'Umm Qasr Green Corridor',
        tagAr: 'ممر أم قصر الأخضر',
        tagZh: '乌姆盖斯尔港绿色走廊',
        tagCkb: 'ڕێڕەوی خێرای ئوم قەسر',
        updateBadgeEn: '2026 Zero-Demurrage Express Line',
        updateBadgeAr: 'إعفاء من غرامات التأخير 2026',
        updateBadgeZh: '2026免滞港费快速清关专班',
        updateBadgeCkb: 'لێخۆشبوون لە غەرامەی دواکەوتن',
        descEn: 'Dedicated direct maritime freight from Ningbo/Shanghai to Umm Qasr Port featuring 21-28 free demurrage days and pre-arrival ASYCUDA customs clearance.',
        descAr: 'إدارة لوجستية متكاملة من موانئ الصين إلى ميناء أم قصر والبصرة مع فترة سماح ممتدة وتخليص جمركي معجل.',
        descZh: '直通中国各大海港至伊拉克乌姆盖斯尔港与祖拜尔港专属集装箱航线，打通免滞期费绿色通关与保税内陆护送。',
        descCkb: 'گواستنەوەی دەریایی لە بەندەرەکانی چینەوە بۆ بەندەری ئوم قەسر بە کاتی بەخۆڕایی درێژخایەن و گومرگی خێرا.',
        leadSummaryEn: 'Operating strategic maritime alliances with COSCO Shipping, Sinotrans, and General Company for Ports of Iraq to deliver 21-day express transit and zero-demurrage protection.',
        leadSummaryAr: 'بالتعاون مع خطوط COSCO وسلطات الموانئ العراقية، تقليص مدة الشحن البحري إلى 21-24 يوماً مع 21 إلى 28 يوماً مجانية دون غرامات تأخير.',
        leadSummaryZh: '携手中远海运（COSCO）、中外运及伊拉克交通部港口总局，将海运周期压缩至21-24天，并提供长达28天的免滞箱期保障。',
        leadSummaryCkb: 'بە هاوکاری لەگەڵ کۆمپانیای COSCO و بەندەرەکانی عێراق، گەیشتن لە ٢١-٢٤ ڕۆژدا بە ٢١ بۆ ٢٨ ڕۆژ کاتی بەخۆڕایی بەبێ غەرامە.',
        wordCount: 335,
        readTimeEn: '2 Min Read',
        readTimeAr: 'قراءة في دقيقتين',
        readTimeZh: '2 分钟精读',
        readTimeCkb: '٢ خولەک خوێندنەوە',
        metricsJson: JSON.stringify([
          { label: 'Maritime Transit', value: '21 - 24 Days', sub: 'Direct Express Route' },
          { label: 'Demurrage Free', value: '21 - 28 Days', sub: 'Zero Terminal Penalties' },
          { label: 'Customs Platform', value: 'ASYCUDA World', sub: 'Pre-Arrival Digital Entry' },
          { label: 'Inland Escort', value: 'IoT Telemetry Fleet', sub: 'Satellite Monitored' }
        ]),
        comprehensiveSpecificationEn: JSON.stringify([
          'The Iraq-China Agency operates an integrated sovereign maritime freight and customs clearance corridor connecting China’s eastern and southern seaports directly to Iraq’s maritime gateways and inland distribution depots. By establishing strategic operating pacts with leading state maritime carriers—including COSCO Shipping, China Merchants Group, and Sinotrans—alongside the General Company for Ports of Iraq (GCPI) and the General Directorate of Customs, ICA provides seamless door-to-door multimodal transit.',
          'Our shipping corridor operates dedicated weekly express sailings originating from Ningbo-Zhoushan, Shanghai, Qingdao, and Shenzhen directly to the Port of Umm Qasr (North and South Ports) and Khor Al-Zubair. By securing preferential bilateral berth allocations, ICA-managed consignments bypass off-shore anchorage congestion, reducing traditional maritime transit times from 34 days down to 21 to 24 days. Furthermore, our direct institutional agreements provide 21 to 28 free demurrage days at Iraqi terminals, entirely eliminating the punitive demurrage fines that frequently burden Iraqi commercial importers.',
          'At the regulatory border, our licensed customs clearance specialists handle complete import documentation, including Ministry of Trade import licenses, Certificates of Origin certified by CCPIT and the Iraqi Embassy in Beijing, and COSQC conformity certificates. We execute pre-arrival digital declarations via the ASYCUDA World automated customs clearance network, clearing container consignments within 48 to 72 hours of vessel discharge.',
          'Beyond the port gates, ICA coordinates bonded inland transit through dedicated truck fleets equipped with satellite IoT GPS telemetry, temperature sensors, and shock-monitoring accelerometers. We manage transit security and customs-bonded escorts delivering cargo directly to importer warehouses in Basra, Baghdad, Najaf, Kirkuk, Erbil, and Sulaymaniyah. With full cargo insurance underwritten by leading institutional underwriters and real-time shipment milestone tracking accessible through our digital agency portal, ICA provides an uncompromised, transparent freight artery supporting the bilateral reconstruction and economic modernization of Iraq.',
          'Our dedicated dispatch control center in Basra monitors every container in transit 24 hours a day, providing automated notifications and instant customs dispute resolution to maintain uninterrupted cargo flow.'
        ]),
        comprehensiveSpecificationAr: JSON.stringify([
          'تُدير الوكالة العراقية الصينية (ICA) ممراً لوجستياً وبحرياً متكاملاً يربط الموانئ الصينية الرئيسية مباشرة بالمنافذ البحرية العراقية في ميناء أم قصر (الشمالي والجنوبي) وميناء خور الزبير ومحافظة البصرة. من خلال شراكات استراتيجية مع كبرى خطوط الشحن العالمية مثل كوسكو (COSCO Shipping) وسينوترانس (Sinotrans) وبالتنسيق مع الشركة العامة لموانئ العراق والهيئة العامة للكمارك، نضمن تدفقاً سلساً للبضائع من المصنع إلى المستودع.',
          'تتميز خطوطنا البحرية السريعة المنطلقة من نينغبو، شنغهاي، شينزن وتشينغداو بأولوية الرسو المباشر، مما يقلص مدة الإبحار والانتظار من 34 يوماً إلى ما بين 21 و 24 يوماً فقط. والأهم من ذلك، نوفر للمستورد العراقي فترة سماح استثنائية من غرامات التأخير (Demurrage) تمتد من 21 إلى 28 يوماً حراً داخل الموانئ العراقية، مما يقضي تماماً على الخسائر المالية الناجمة عن التأخير الجمركي.',
          'يتولى فريقنا المتخصص إنجاز كافة الوثائق القانونية، بما في ذلك إجازات الاستيراد الصادرة عن وزارة التجارة العراقية، وشهادات المنشأ المصدقة من المجلس الصيني (CCPIT) والسفارة العراقية في بكين، وشهادات مطابقة التقييس والسيطرة النوعية (COSQC). نقوم بإجراء التخليص المسبق عبر نظام الأسيكودا العالمي (ASYCUDA World)، مما يتيح الإفراج عن الحاويات خلال 48 إلى 72 ساعة من تفريغها.',
          'كما تؤمن الوكالة النقل البري الداخلي المؤمن عبر أساطيل شاحنات حديثة مزودة بأنظمة التتبع الفضائي والأقمار الصناعية ومستشعرات الصدمات والحرارة، مع حراسة جمركية مرخصة لتسليم الحاويات إلى بغداد، البصرة، أربيل، السليمانية، والنجف بأعلى معايير الأمان وبتأمين شامل على البضائع.',
          'يضمن مركز التحكم والمتابعة اللوجستية في البصرة معالجة فورية لأي طارئ جمركي على مدار 24 ساعة، مما يبقي مسار الإمداد نشطاً ومستمراً دون أي تعطل.'
        ]),
        comprehensiveSpecificationZh: JSON.stringify([
          '中伊通讯社（ICA）深度整合中国沿海港口与伊拉克主权口岸资源，打造直通直达的中伊海上主权货运专线与绿色清关走廊。通过与中远海运（COSCO Shipping）、招商局集团及中外运（Sinotrans）等国家骨干航运企业以及伊拉克港口总局（GCPI）和海关总署紧密协同，实现从中国出厂端到伊拉克终端库房的门到门多式联运。',
          '我们的海运班轮每周固定自宁波舟山港、上海港、青岛港及深圳盐田港起航，直锚伊拉克乌姆盖斯尔港（南北港区）及祖拜尔港。依托双边绿色泊位协调机制，有效规避传统海域锚地压港，将传统海运周期由34天压缩至21至24天。特别值得强调的是，我们为伊拉克进口商争取到了长达21至28天的超长免堆存免滞箱期（Demurrage-Free），彻底终结以往令外贸商不堪重负的高额逾期滞港罚金。',
          '在关务申报环节，专业关务团队一站式代办伊拉克贸易部进口许可证、中国贸促会与伊拉克驻华使馆官方双认证原产地证（CO）以及COSQC符合性凭据。通过全面接入ASYCUDA数字海关系统实现抵港前预申报，船舶靠港卸船后48至72小时内完成绿色通道通关放行。',
          '针对内陆转运，中伊通讯社调配配备北斗/GPS双模物联网卫星定位与温湿度冲击传感器的海关监管重卡车队，全程配备合法押运，将重货安全护送至巴格达、巴士拉、纳杰夫、基尔库克、埃尔比勒及苏莱曼尼亚。辅以头部财险机构的全程货运险与数字化节点实时追踪，筑造坚不可摧的中伊贸易动脉。',
          '我们在巴士拉设有全天候运转的调度应急响应中心，实时化解关务核销与物流异常，确保重点工程建设物资即到即用。'
        ]),
        comprehensiveSpecificationCkb: JSON.stringify([
          'ئاژانسی عێراق و چین (ICA) ڕێڕەوێکی تایبەت و خێرای دەریایی و گومرگی لە بەندەرە گەورەکانی چینەوە ڕاستەوخۆ بۆ بەندەری ئوم قەسر لە بەسرە و دەروازەکانی هەرێمی کوردستان دابین دەکات. لە ڕێگەی هاوبەشی لەگەڵ کۆمپانیا گەورەکانی وەک COSCO و بەڕێوەبەرایەتی بەندەرەکانی عێراق، گواستنەوەیەکی خێرا و پارێزراو بەدەست دەهێنین.',
          'گەشتی کەشتییەکانمان لە نینگبۆ، شەنگەهای و شێنزنەوە ماوەی گەیشتن لە ٣٤ ڕۆژەوە بۆ ٢١ تا ٢٤ ڕۆژ کەمدەکاتەوە بەهۆی وەرگرتنی ڕێڕەوی خێرا لە بەندەرەکاندا. یەکێک لە گەورەترین سوودەکان ئەوەیە کە ٢١ تا ٢٨ ڕۆژ کاتی بەخۆڕایی لە بەندەری ئوم قەسر دەدرێت بە کڕیار بۆ ئەوەی هیچ غەرامەیەکی دواکەوتن (Demurrage) نەکەوێتە سەر بازرگانەکان کە زۆرجار کێشەی گەورەی دارایی دروست دەکات.',
          'تیمی گومرگی ئێمە هەموو مامەڵەکانی وەک مۆڵەتی هاوردەکردن، بڕوانامەی لەدایکبوونی کاڵا لە باڵیۆزخانەی عێراق لە پەکین، و بڕوانامەی COSQC تەواو دەکەن لە ڕێگەی سیستەمی ئەلیکترۆنی ASYCUDA لە ماوەی ٤٨ تا ٧٢ کاتژمێردا دوای گەیشتنی کەشتی.',
          'پاشان بارهەڵگرە مۆدێرنەکان کە بە GPS و چاودێری سات بە سات بەستراونەتەوە، کاڵاکان بە سەلامەتی دەگەیەننە کۆگاکانی بەغدا، بەسرە، هەولێر و سلێمانی بە بیمەی تەواوەوە لەسەر سەرجەم باری کۆنتێنەرەکان.',
          'سەنتەری چاودێری ئێمە لە بەسرە بە شێوەی ٢٤ کاتژمێری ئاگاداری ڕێڕەوی شتومەکەکانە بۆ دڵنیابوون لە گەیشتنیان بەبێ هیچ کێشەیەک بۆ دەستی بازرگانان.'
        ]),
        updates2026En: JSON.stringify([
          'Full digital interface with Iraqi Customs ASYCUDA World automated pre-arrival processing system.',
          'Exclusive COSCO agreement granting 21-28 free demurrage days across Umm Qasr North & South berths.',
          'Launch of bonded transit corridors to Erbil & Sulaymaniyah under single-window customs seal.'
        ]),
        updates2026Ar: JSON.stringify([
          'الربط المباشر مع نظام الأسيكودا العالمي (ASYCUDA World) المحدث لعام 2026 للتخليص الجمركي المسبق',
          'اتفاقية حصرية مع COSCO لمنح 21 إلى 28 يوماً مجانية دون غرامات تأخير في ميناء أم قصر',
          'تدشين ممر الترانزيت البري الجمركي المباشر إلى أربيل والسليمانية بنظام البيان الواحد'
        ]),
        updates2026Zh: JSON.stringify([
          '全面接入伊拉克海关2026全新ASYCUDA World云端自动化清关预审系统',
          '中远海运专属协议：乌姆盖斯尔港北港与南港享21至28天超长免箱堆存期（Demurrage-Free）',
          '开通通往埃尔比勒及苏莱曼尼亚的直达保税内陆绿色走廊，一单到底海关监管'
        ]),
        updates2026Ckb: JSON.stringify([
          'بەستنەوە بە سیستەمی ئەلیکترۆنی ASYCUDAی نوێکراوەی ٢٠٢٦',
          'ڕێککەوتنی تایبەت بە کاتی بەخۆڕایی ٢١ تا ٢٨ ڕۆژ لە بەندەری ئوم قەسر',
          'ڕێڕەوی ڕاستەوخۆی گومرگی بۆ هەولێر و سلێمانی بەبێ وەستان'
        ]),
        deliverablesEn: JSON.stringify([
          'Original Clean Bill of Lading (B/L) with Endorsed 28-Day Demurrage-Free Rider',
          'Bilateral Attested Certificate of Origin (CO) Certified by CCPIT & Iraqi Embassy',
          'Electronic ASYCUDA Green-Lane Customs Release Permit & Duty Clearance Receipt',
          'Satellite IoT Transit Traceability Log with Vibration & Thermal Shock Telemetry'
        ]),
        deliverablesAr: JSON.stringify([
          'بوليصة الشحن البحرية الأصلية النظيفة مع توثيق فترة السماح المجانية 28 يوماً',
          'شهادة المنشأ الأصلية مصدقة من السفارة العراقية في بكين والمجلس الصيني (CCPIT)',
          'إذن الإفراج الجمركي الأخضر الإلكتروني وقسيمة سداد الرسوم الكمركية الرسمية',
          'تقرير التتبع الفضائي لرحلة الشاحنات الداخلية مع سجلات مستشعرات الصدمات والحرارة'
        ]),
        deliverablesZh: JSON.stringify([
          '中远海运正本清洁提单（Original Bill of Lading）及28天免箱期官方背书凭证',
          '经中国贸促会（CCPIT）与伊拉克驻华使领馆认证的双签原产地证明书（CO）',
          'ASYCUDA系统绿色通道电子通关放行绿条与关税完税发票',
          '北斗双模物联网车队内陆押运全程温湿度/GPS轨迹数字化监控报告'
        ]),
        deliverablesCkb: JSON.stringify([
          'پەلی باری دەریایی فەرمی بە تۆماری ٢٨ ڕۆژ کاتی بەخۆڕایی',
          'بڕوانامەی لەدایکبوونی کاڵا بە مۆری باڵیۆزخانە و وەزارەتی دەرەوە',
          'مۆڵەتی دەرچوونی سەوزی گومرگی بە شێوەی ئەلیکترۆنی',
          'ڕاپۆرتی چاودێری مانگی دەستکرد بۆ ڕێگای بارهەڵگرەکان تا گەیشتن بە کۆگا'
        ]),
        standardsJson: JSON.stringify(['ASYCUDA World', 'COSCO Direct', 'GCPI Priority Berth', 'CCPIT Legalized'])
      }
    ];

    for (const p of pillars) {
      await prisma.sourcingPillar.create({ data: p });
    }

    console.log("Successfully seeded 4 Sourcing Service Pillars.");
  } catch (err) {
    console.error("Error seeding sourcing pillars:", err);
  }
}
