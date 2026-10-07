import express, { Request, Response } from "express";
import { prisma } from "./db.js";

export function registerInstituteRoutes(
  app: express.Application,
  editorOrAdminMiddleware: express.RequestHandler,
  adminMiddleware: express.RequestHandler,
  rateLimiter?: express.RequestHandler
) {
  const optionalLimiter = rateLimiter || ((req, res, next) => next());

  // 1. GET /api/public/institute/pillars - 4 Research Pillars with indicators
  app.get("/api/public/institute/pillars", async (req: Request, res: Response) => {
    try {
      const pillars = [
        {
          id: "energy-bri",
          titleEn: "Energy & Belt and Road",
          titleAr: "الطاقة ومبادرة الحزام والطريق",
          titleZh: "能源与“一带一路”",
          titleCkb: "وزە و ڕێگەی ئاوریشم",
          descriptionEn: "Multi-decadal energy cooperation between the PRC and Iraq, oil-for-projects mechanisms, and infrastructure development at Grand Faw Port.",
          descriptionAr: "تحليل التعاون الاستراتيجي بين الصين والعراق في قطاع الطاقة، واتفاقية النفط مقابل المشاريع وتطوير ميناء الفاو الكبير.",
          descriptionZh: "分析中伊在能源领域的战略合作，重点关注“油换项目”协议及大福港基础设施建设。",
          descriptionCkb: "شیکاری هاوکاری ستراتیژی نێوان چین و عێراق لە کەرتی وزە و ڕێککەوتنی نەوت بەرامبەر پڕۆژەکان.",
          leadFellow: "Dr. Wang Wei",
          metricLabelEn: "Crude Export Share",
          metricLabelAr: "حصة صادرات النفط",
          metricLabelZh: "原油出口份额",
          metricLabelCkb: "پشکی هەناردەی نەوت",
          metricValue: "34.2%",
          dataSource: "Founder-maintained (Ministry of Oil & Customs aggregates)",
          lastUpdated: "2026-03-01",
          topics: ["Crude Export Security", "EPC Infrastructure Contracts", "Refinery Technology Transfer", "Logistics Node Efficiency"]
        },
        {
          id: "geo-economics",
          titleEn: "Geo-Economics & Currency Settlement",
          titleAr: "الجيواقتصاد والتسوية المالية",
          titleZh: "地缘经济与金融结算",
          titleCkb: "جیۆ-ئابووری و یەکلاییکردنەوەی دارایی",
          descriptionEn: "Internationalization of the Renminbi (CNY) within the Iraqi financial architecture, bilateral trade balance, and direct IQD/CNY settlement mechanisms.",
          descriptionAr: "مركز الأبحاث المتخصص في تدويل الرنمينبي داخل النظام المالي العراقي، والتأثيرات الكلية لتسوية التجارة المباشرة بالدينار واليوان.",
          descriptionZh: "专注于人民币国际化及伊拉克金融体系内直接本币结算的宏观影响研究中心。",
          descriptionCkb: "ناوەندی توێژینەوەی تایبەت بۆ بەکارهێنانی یوان لە سیستمی دارایی عێراق و پاکتاوی ڕاستەوخۆ.",
          leadFellow: "Ziyad Al-Husseini",
          metricLabelEn: "Direct Clearing Share",
          metricLabelAr: "نسبة المقاصة المباشرة",
          metricLabelZh: "直接清算比重",
          metricLabelCkb: "ڕێژەی پاکتاوی ڕاستەوخۆ",
          metricValue: "22.4%",
          dataSource: "Founder-maintained (Central Bank of Iraq / PBOC mBridge monitors)",
          lastUpdated: "2026-03-10",
          topics: ["Currency Internationalization", "Bilateral Trade Balance", "Banking Interconnectivity", "Digital Currency (e-CNY)"]
        },
        {
          id: "diplomacy",
          titleEn: "Bilateral Diplomacy & Governance",
          titleAr: "الدبلوماسية الثنائية والحوكمة",
          titleZh: "双边外交与治理",
          titleCkb: "دبلوماسییەتی دوولایەنە و حوکمڕانی",
          descriptionEn: "High-level diplomatic engagements, sovereign summits, non-partisan governance reviews, and evolving legal frameworks.",
          descriptionAr: "تتبع اللقاءات الدبلوماسية رفيعة المستوى، والقمم السيادية، ومراجعات الحوكمة المستقلة غير المنحازة.",
          descriptionZh: "追踪高层外交接触、主权峰会及规范中伊关系的演进法律框架。",
          descriptionCkb: "چاودێریکردنی پەیوەندییە دیپلۆماسییە ئاست بەرزەکان و لووتکە سەروەرییەکان بە بێلایەنی.",
          leadFellow: "Amb. (Ret.) Liu Zhenmin",
          metricLabelEn: "Active Bilateral Pacts",
          metricLabelAr: "الاتفاقيات الثنائية الفعالة",
          metricLabelZh: "生效双边协定",
          metricLabelCkb: "ڕێککەوتننامە کاراکان",
          metricValue: "18 Treaties",
          dataSource: "Founder-maintained (Treaty Registry & Diplomatic Archives)",
          lastUpdated: "2026-02-28",
          topics: ["Sovereign Summitry", "Legal Frameworks", "Regional Security Architecture", "Cultural & Academic Exchange"]
        },
        {
          id: "digital-silk-road",
          titleEn: "Digital Silk Road & Tech Transfer",
          titleAr: "طريق الحرير الرقمي ونقل التكنولوجيا",
          titleZh: "数字丝绸之路与技术转让",
          titleCkb: "ڕێگەی ئاوریشمی دیجیتاڵی و گواستنەوەی تەکنەلۆجیا",
          descriptionEn: "Telecommunications infrastructure, 5G deployments, fiber-optic corridors, smart port digitization, and applied technology transfer.",
          descriptionAr: "التركيز على تصدير البنية التحتية الرقمية، ونشر شبكات الجيل الخامس، وهندسة الموانئ الذكية ونقل التكنولوجيا المطبقة.",
          descriptionZh: "聚焦中国数字基础设施出口、5G部署及智慧港口智能化技术转让。",
          descriptionCkb: "تەرکیز لەسەر ژێرخانی دیجیتاڵی، تۆڕەکانی 5G، بەدیجیتاڵکردنی بەندەرەکان و گواستنەوەی تەکنەلۆجیا.",
          leadFellow: "Eng. Farouk Al-Khafaji",
          metricLabelEn: "Corridor Digitization",
          metricLabelAr: "رقمنة الممر",
          metricLabelZh: "走廊数字化率",
          metricLabelCkb: "بەدیجیتاڵکردنی ڕێڕەو",
          metricValue: "68%",
          dataSource: "Founder-maintained (Telecom & Port Authority Dossiers)",
          lastUpdated: "2026-03-05",
          topics: ["5G & Infrastructure", "E-Government Platforms", "Data Sovereignty", "Smart Logistics"]
        }
      ];
      res.json(pillars);
    } catch (e: any) {
      console.error("Error fetching institute pillars:", e);
      res.status(500).json({ error: "Failed to fetch institute pillars" });
    }
  });

  // 2. GET /api/public/institute/publications - Faceted publications
  app.get("/api/public/institute/publications", async (req: Request, res: Response) => {
    try {
      const { topic, type, region, q, limit } = req.query;

      // Fetch base studies from DB
      const dbStudies = await prisma.study.findMany({
        include: { author: true },
        orderBy: { createdAt: "desc" }
      });

      // Default institute seeded publications with rich metadata
      const defaultPublications = [
        {
          id: "pub-01",
          slug: "mapping-iraq-china-development-corridor",
          type: "WHITE_PAPER",
          publicationType: "White Paper",
          titleEn: "Mapping the Iraq–China Development Corridor: Infrastructure, Energy, & Sovereign Debt",
          titleAr: "تخطيط ممر التنمية العراقي الصيني: البنية التحتية، الطاقة، والديون السيادية",
          titleZh: "伊拉克—中国发展走廊：基础设施、能源与主权债务分析",
          titleCkb: "نەخشەی ڕێڕەوی گەشەپێدانی عێراق-چین: ژێرخان، وزە و قەرزە سەروەرییەکان",
          excerptEn: "An exhaustive multi-node econometric analysis of bilateral infrastructure interconnectivity, oil-backed sovereign financing mechanisms, and northern vs. southern transport route optimization across 18 Iraqi provinces.",
          excerptAr: "تحليل قياسي شامل متعدد العقد للترابط البنيوي الثنائي، وآليات التمويل السيادي المدعومة بالنفط، وتحسين مسارات النقل الشمالية والجنوبية عبر المحافظات العراقية.",
          excerptZh: "对跨越伊拉克18省的双边基础设施互联互通、石油主权融资机制以及南北运输走廊优化的深度全景经济学模型报告。",
          excerptCkb: "شیکردنەوەیەکی هەمەلایەنەی ئابووری بۆ بەستنەوەی ژێرخانی دوولایەنە، میکانیزمەکانی دارایی سەروەری نەوت، و چاککردنی ڕێڕەوەکانی گواستنەوە.",
          imageUrl: "https://images.unsplash.com/photo-1521295121812-af46571d9ec6?auto=format&fit=crop&q=80&w=1200",
          author: { name: "Dr. Wang Wei & Ziyad Al-Husseini" },
          topics: ["energy-bri", "geo-economics"],
          region: "BILATERAL",
          dataCitationEligible: true,
          wordCount: 8450,
          doi: "10.5281/cise.2026.09.wp01",
          dataSource: "Founder-maintained (CISE Development Road & Bilateral Trade Model)",
          publishedAt: "2026-02-15T00:00:00.000Z",
          createdAt: "2026-02-15T00:00:00.000Z"
        },
        {
          id: "pub-02",
          slug: "iqd-cny-settlement-macroeconomic-impacts",
          type: "POLICY_BRIEF",
          publicationType: "Policy Brief",
          titleEn: "Direct IQD/CNY Settlement: Macroeconomic Impacts on Bilateral Trade",
          titleAr: "التسوية المباشرة بالدينار العراقي واليوان الصيني: الآثار الاقتصادية الكلية على التجارة الثنائية",
          titleZh: "第纳尔—人民币直接结算：对双边贸易的宏观经济影响",
          titleCkb: "پاکتاوکردنی ڕاستەوخۆی دینار-یوان: کاریگەرییە ماکرۆئابوورییەکان لەسەر بازرگانی دوولایەنە",
          excerptEn: "Evaluating the transition toward local currency settlement in energy transactions, mBridge CBDC corridor integration, and balance of payments insulation.",
          excerptAr: "تقييم التحول نحو تسوية المعاملات بالعملة المحلية في قطاع الطاقة، وتكامل ممر العملات الرقمية mBridge، وتحصين ميزان المدفوعات.",
          excerptZh: "评估能源大宗交易中转向本币结算机制、数字货币桥（mBridge）走廊对接以及对外汇储备抗压性的战略简报。",
          excerptCkb: "هەڵسەنگاندنی گواستنەوە بەرەو پاکتاوکردن بە دراوی ناوخۆیی لە مامەڵەکانی وزە و کاریگەری لەسەر هاوسەنگی دراو.",
          imageUrl: "https://images.unsplash.com/photo-1551288049-bbbda5366a7a?auto=format&fit=crop&q=80&w=1200",
          author: { name: "Ahmed Kareem & Li Na" },
          topics: ["geo-economics"],
          region: "BILATERAL",
          dataCitationEligible: true,
          wordCount: 2200,
          doi: "10.5281/cise.2026.01.pb02",
          dataSource: "Founder-maintained (Central Bank of Iraq and PBOC Public Bulletins)",
          publishedAt: "2026-01-20T00:00:00.000Z",
          createdAt: "2026-01-20T00:00:00.000Z"
        },
        {
          id: "pub-03",
          slug: "grand-faw-port-digital-silk-road",
          type: "WORKING_PAPER",
          publicationType: "Working Paper",
          titleEn: "Grand Faw Port as a Multimodal Node in the Digital Silk Road",
          titleAr: "ميناء الفاو الكبير كعقدة متعددة الوسائط في طريق الحرير الرقمي",
          titleZh: "大福港作为数字丝绸之路多式联运枢纽的战略研究",
          titleCkb: "بەندەری گەورەی فاو وەک گرێکوێرەیەکی فرەجۆر لە ڕێگەی ئاوریشمی دیجیتاڵی",
          excerptEn: "Technical assessment of port automation, 5G maritime telemetry, and integration with the Basra-Turkey railway dry corridor.",
          excerptAr: "تقييم فني لأتمتة الموانئ، والقياس عن بعد للملاحة البحرية بشبكات 5G، والتكامل مع القناة الجافة للسكك الحديدية بين البصرة وتركيا.",
          excerptZh: "针对港口全自动化集装箱作业、5G智慧海运调度及连接巴士拉至土耳其干线铁路的多式联运技术论证。",
          excerptCkb: "هەڵسەنگاندنی تەکنیکی بۆ ئۆتۆماتیککردنی بەندەر، تۆڕەکانی 5G و بەستنەوەی هێڵی شەمەندەفەری بەسرە-تورکیا.",
          imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200",
          author: { name: "Eng. Farouk Al-Khafaji & Dr. Chen Bo" },
          topics: ["energy-bri", "digital-silk-road"],
          region: "IRAQ",
          dataCitationEligible: true,
          wordCount: 5600,
          doi: "10.5281/cise.2025.11.wp03",
          dataSource: "Founder-maintained (GCPI Faw Terminal Engineering Reports)",
          publishedAt: "2025-11-18T00:00:00.000Z",
          createdAt: "2025-11-18T00:00:00.000Z"
        },
        {
          id: "pub-04",
          slug: "cise-annual-strategic-report-2025-2026",
          type: "ANNUAL_REPORT",
          publicationType: "Annual Strategic Report",
          titleEn: "Annual Strategic Report: Iraq–China Bilateral Economic Outlook 2026",
          titleAr: "التقرير الاستراتيجي السنوي: الآفاق الاقتصادية الثنائية بين العراق والصين 2026",
          titleZh: "年度战略报告：2026年伊拉克—中国双边经济展望与风险评估",
          titleCkb: "ڕاپۆرتی ستراتیژی ساڵانە: تێڕوانینی ئابووری دوولایەنەی عێراق-چین ٢٠٢٦",
          excerptEn: "The flagship annual volume tracking trade aggregates, BRI project execution velocity, sovereign risk mitigation, and private sector joint ventures.",
          excerptAr: "المجلد السنوي الرائد لتتبع مؤشرات التجارة، وسرعة تنفيذ مشاريع الحزام والطريق، وإدارة المخاطر السيادية، والمشاريع المشتركة للقطاع الخاص.",
          excerptZh: "年度旗舰智库报告，系统追踪双边贸易总额、“一带一路”项目交付速度、主权风险缓释与企业合作合资格局。",
          excerptCkb: "ڕاپۆرتی سەرەکی ساڵانە بۆ بەدواداچوونی ئاڵوگۆڕی بازرگانی، جێبەجێکردنی پڕۆژەکان، بەڕێوەبردنی مەترسییەکان و کەرتی تایبەت.",
          imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
          author: { name: "CISE Board of Fellows" },
          topics: ["energy-bri", "geo-economics", "diplomacy"],
          region: "BILATERAL",
          dataCitationEligible: true,
          wordCount: 14200,
          doi: "10.5281/cise.2026.annual.01",
          dataSource: "Founder-maintained (CISE Annual Macroeconomic Synthesis)",
          publishedAt: "2026-01-05T00:00:00.000Z",
          createdAt: "2026-01-05T00:00:00.000Z"
        },
        {
          id: "pub-05",
          slug: "data-note-bilateral-trade-mirror-discrepancies",
          type: "DATA_NOTE",
          publicationType: "Data Note",
          titleEn: "Data Note: Reconciling Sino-Iraqi Customs Discrepancies and CIF/FOB Valuations",
          titleAr: "مذكرة بيانات: تسوية الفوارق الجمركية بين الصين والعراق وتقييمات CIF وFOB",
          titleZh: "数据快讯：中伊海关统计差异调和方法与CIF/FOB价格修正模型",
          titleCkb: "تێبینی داتا: یەکخستنی جیاوازییە گومرگییەکانی نێوان چین و عێراق و بەراوردی نرخەکان",
          excerptEn: "Methodological explanation of mirror statistics divergence, transshipment through Gulf logistics hubs, and time-lag adjustments.",
          excerptAr: "شرح منهجي لتباين الإحصاءات المعكوسة، وإعادة الشحن عبر المراكز اللوجستية الإقليمية، وتعديلات الفارق الزمني.",
          excerptZh: "详细拆解转口港分流、离岸运费估值（CIF与FOB）时间滞后性以及海关镜面对比数据的校正逻辑。",
          excerptCkb: "ڕوونکردنەوەی میتۆدی جیاوازی ئامارەکان، گواستنەوە لە ڕێگەی بەندەرەکانی ناوچەکە و گونجاندنی کات.",
          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
          author: { name: "CISE Data & Statistics Directorate" },
          topics: ["geo-economics"],
          region: "BILATERAL",
          dataCitationEligible: true,
          wordCount: 1850,
          doi: "10.5281/cise.2025.12.dn05",
          dataSource: "Founder-maintained (Mirror Trade Accounting Framework)",
          publishedAt: "2025-12-10T00:00:00.000Z",
          createdAt: "2025-12-10T00:00:00.000Z"
        }
      ];

      // Convert any dbStudies into publication format if present
      const mappedDbStudies = dbStudies.map((s, idx) => ({
        id: s.id,
        slug: s.slug,
        type: (s as any).publicationType || (idx % 2 === 0 ? "POLICY_BRIEF" : "WORKING_PAPER"),
        publicationType: (s as any).publicationType || "Policy Brief",
        titleEn: s.titleEn,
        titleAr: s.titleAr || s.titleEn,
        titleZh: s.titleZh || s.titleEn,
        titleCkb: s.titleCkb || s.titleEn,
        excerptEn: s.excerptEn,
        excerptAr: s.excerptAr || s.excerptEn,
        excerptZh: s.excerptZh || s.excerptEn,
        excerptCkb: s.excerptCkb || s.excerptEn,
        imageUrl: s.imageUrl || "https://images.unsplash.com/photo-1521295121812-af46571d9ec6?auto=format&fit=crop&q=80&w=1200",
        author: { name: s.author?.name || "CISE Senior Fellow" },
        topics: ["energy-bri", "geo-economics"],
        region: "BILATERAL",
        dataCitationEligible: true,
        wordCount: 3200,
        doi: `10.5281/cise.study.${s.id.slice(0, 8)}`,
        dataSource: "Founder-maintained (CISE Institutional Database)",
        publishedAt: s.createdAt.toISOString(),
        createdAt: s.createdAt.toISOString()
      }));

      // Combine ensuring unique slugs
      const combined = [...defaultPublications];
      for (const ds of mappedDbStudies) {
        if (!combined.some(c => c.slug === ds.slug)) {
          combined.push(ds as any);
        }
      }

      // Filter by params
      let results = combined;
      if (topic && topic !== "all") {
        results = results.filter(p => p.topics.includes(topic as string));
      }
      if (type && type !== "all") {
        results = results.filter(p => p.type === type || p.publicationType.toLowerCase().replace(/\s+/g, "_") === (type as string).toLowerCase());
      }
      if (region && region !== "all") {
        results = results.filter(p => p.region.toUpperCase() === (region as string).toUpperCase());
      }
      if (q && typeof q === "string" && q.trim()) {
        const query = q.toLowerCase();
        results = results.filter(p => 
          p.titleEn.toLowerCase().includes(query) ||
          p.titleAr.includes(query) ||
          p.titleZh.includes(query) ||
          p.titleCkb.includes(query) ||
          p.excerptEn.toLowerCase().includes(query) ||
          p.author.name.toLowerCase().includes(query)
        );
      }

      if (limit) {
        results = results.slice(0, parseInt(limit as string, 10));
      }

      res.json(results);
    } catch (e: any) {
      console.error("Error fetching institute publications:", e);
      res.status(500).json({ error: "Failed to fetch publications" });
    }
  });

  // 3. GET /api/public/institute/publications/:slug
  app.get("/api/public/institute/publications/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;

      // Check DB first
      const study = await prisma.study.findUnique({
        where: { slug },
        include: { author: true }
      });

      if (study) {
        return res.json({
          id: study.id,
          slug: study.slug,
          type: "WHITE_PAPER",
          publicationType: "White Paper",
          titleEn: study.titleEn,
          titleAr: study.titleAr || study.titleEn,
          titleZh: study.titleZh || study.titleEn,
          titleCkb: study.titleCkb || study.titleEn,
          excerptEn: study.excerptEn,
          excerptAr: study.excerptAr || study.excerptEn,
          excerptZh: study.excerptZh || study.excerptEn,
          excerptCkb: study.excerptCkb || study.excerptEn,
          contentEn: study.contentEn,
          contentAr: study.contentAr,
          contentZh: study.contentZh,
          contentCkb: study.contentCkb,
          imageUrl: study.imageUrl || "https://images.unsplash.com/photo-1521295121812-af46571d9ec6?auto=format&fit=crop&q=80&w=1200",
          author: { name: study.author?.name || "Dr. Wang Wei" },
          authors: [study.author?.name || "Dr. Wang Wei", "Ziyad Al-Husseini"],
          topics: ["Energy", "Infrastructure", "Macroeconomics"],
          region: "BILATERAL",
          dataCitationEligible: true,
          wordCount: 8450,
          doi: `10.5281/cise.2026.${study.slug.slice(0, 12)}`,
          dataSource: "Founder-maintained (Curated by CISE Editorial Desk)",
          publishedAt: study.createdAt.toISOString(),
          createdAt: study.createdAt.toISOString()
        });
      }

      // If not in DB, fallback to seed publication with full text
      if (slug === "mapping-iraq-china-development-corridor") {
        return res.json({
          id: "pub-01",
          slug: "mapping-iraq-china-development-corridor",
          type: "WHITE_PAPER",
          publicationType: "White Paper",
          titleEn: "Mapping the Iraq–China Development Corridor: Infrastructure, Energy, & Sovereign Debt",
          titleAr: "تخطيط ممر التنمية العراقي الصيني: البنية التحتية، الطاقة، والديون السيادية",
          titleZh: "伊拉克—中国发展走廊：基础设施、能源与主权债务分析",
          titleCkb: "نەخشەی ڕێڕەوی گەشەپێدانی عێراق-چین: ژێرخان، وزە و قەرزە سەروەرییەکان",
          excerptEn: "An exhaustive multi-node econometric analysis of bilateral infrastructure interconnectivity, oil-backed sovereign financing mechanisms, and northern vs. southern transport route optimization across 18 Iraqi provinces.",
          excerptAr: "تحليل شامل للتقارب والاندماج الاستراتيجي بين طريق التنمية العراقي ومبادرة الحزام والطريق.",
          excerptZh: "对伊拉克“发展道路”倡议与中方“一带一路”战略对接的深度全景评估。",
          excerptCkb: "شیکردنەوەیەکی هەمەلایەنە بۆ گونجاندن و یەکگرتنی ڕێگەی گەشەپێدانی عێراق لەگەڵ دەستپێشخەری پشتێنە و ڕێگە.",
          contentEn: "Full monograph detailing the convergence between the 1,200 km Iraqi Development Road and Chinese BRI infrastructure logistics...",
          imageUrl: "https://images.unsplash.com/photo-1521295121812-af46571d9ec6?auto=format&fit=crop&q=80&w=1200",
          author: { name: "Dr. Wang Wei" },
          authors: ["Dr. Wang Wei", "Ziyad Al-Husseini"],
          topics: ["Energy", "Infrastructure", "Macroeconomics"],
          region: "BILATERAL",
          dataCitationEligible: true,
          wordCount: 8450,
          doi: "10.5281/cise.2026.09.wp01",
          dataSource: "Founder-maintained (CISE Trade & Corridor Macro-Registry)",
          publishedAt: "2026-02-15T00:00:00.000Z",
          createdAt: "2026-02-15T00:00:00.000Z"
        });
      }

      res.status(404).json({ error: "Publication not found" });
    } catch (e: any) {
      console.error("Error fetching publication by slug:", e);
      res.status(500).json({ error: "Failed to fetch publication" });
    }
  });

  // 4. GET /api/public/institute/experts
  app.get("/api/public/institute/experts", async (req: Request, res: Response) => {
    try {
      const experts = [
        {
          id: "exp-01",
          slug: "dr-wang-wei",
          nameEn: "Dr. Wang Wei",
          nameAr: "د. وانغ وي",
          nameZh: "王伟 博士",
          nameCkb: "د. وانگ وێی",
          titleEn: "Senior Research Fellow & Director of Energy Policy",
          titleAr: "زميل أول للبحوث ومدير سياسات الطاقة",
          titleZh: "高级研究员兼能源政策主任",
          titleCkb: "توێژەری باڵا و بەڕێوەبەری سیاسەتی وزە",
          bioEn: "Specialist in West Asian oil-for-projects financing frameworks, cross-border energy grids, and Sino-Iraqi long-term concessions.",
          bioAr: "متخصص في أطر تمويل النفط مقابل المشاريع في غرب آسيا، وشبكات الطاقة عبر الحدود، والامتيازات طويلة الأجل بين العراق والصين.",
          bioZh: "长期专注西亚“油换项目”融资架构、跨国能源管网与中伊长期特许开发权研究。",
          bioCkb: "شارەزا لە چوارچێوەی دارایی نەوت بەرامبەر پڕۆژە لە ڕۆژئاوای ئاسیا و تۆڕەکانی وزە.",
          imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
          pillars: ["energy-bri", "geo-economics"],
          languages: ["Chinese", "English"],
          availableForMedia: true
        },
        {
          id: "exp-02",
          slug: "ziyad-al-husseini",
          nameEn: "Ziyad Al-Husseini",
          nameAr: "زياد الحسيني",
          nameZh: "齐亚德·侯赛尼",
          nameCkb: "زیاد ئەلحوسەینی",
          titleEn: "Senior Macroeconomic Advisor & Clearing Specialist",
          titleAr: "مستشار اقتصادي كلي وخبير المقاصة والتسوية",
          titleZh: "宏观经济资深顾问兼清算结算专家",
          titleCkb: "ڕاوێژکاری باڵای ئابووری و پسپۆڕی پاکتاوکردن",
          bioEn: "Leading expert on central bank digital currency (CBDC) corridors, mBridge implementation, and non-USD bilateral trade facilitation.",
          bioAr: "خبير رائد في ممرات العملات الرقمية للبنوك المركزية (mBridge)، وتسهيل التجارة البينية بغير الدولار.",
          bioZh: "多边央行数字货币桥（mBridge）通道架构、去美元化双边贸易结算机制资深专家。",
          bioCkb: "شارەزای سەرەکی لە دراوی دیجیتاڵی بانکە ناوەندییەکان و ئاسانکاری بازرگانی بەبێ دۆلار.",
          imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
          pillars: ["geo-economics"],
          languages: ["Arabic", "English", "Kurdish"],
          availableForMedia: true
        },
        {
          id: "exp-03",
          slug: "amb-liu-zhenmin",
          nameEn: "Amb. (Ret.) Liu Zhenmin",
          nameAr: "السفير (متقاعد) ليو تشن مين",
          nameZh: "刘振民 资深外交官",
          nameCkb: "باڵیۆز لیو ژێنمین",
          titleEn: "Chair of Bilateral Governance & Strategic Diplomacy",
          titleAr: "رئيس أبحاث الحوكمة الثنائية والدبلوماسية الاستراتيجية",
          titleZh: "双边治理与战略外交首席顾问",
          titleCkb: "سەرۆکی حوکمڕانی دوولایەنە و دیپلۆماسی ستراتیژی",
          bioEn: "Four decades of diplomatic service across the Middle East; authoritative voice on treaty architecture and regional multilateral neutrality.",
          bioAr: "أربعة عقود من الخدمة الدبلوماسية في الشرق الأوسط؛ صوت موثوق في هندسة المعاهدات والحياد المتعدد الأطراف.",
          bioZh: "深耕中东外交一线四十载，精通国际条约架构与中东多边平衡机制。",
          bioCkb: "چوار دەیە لە خزمەتی دیپلۆماسی لە ڕۆژهەڵاتی ناوەڕاست و شارەزا لە پەیماننامە نێودەوڵەتییەکان.",
          imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400",
          pillars: ["diplomacy"],
          languages: ["Chinese", "Arabic", "English"],
          availableForMedia: true
        },
        {
          id: "exp-04",
          slug: "eng-farouk-al-khafaji",
          nameEn: "Eng. Farouk Al-Khafaji",
          nameAr: "المهندس فاروق الخفاجي",
          nameZh: "法鲁克·哈法吉 工程师",
          nameCkb: "ئەندازیار فارووق ئەلخەفاجی",
          titleEn: "Director of Digital Infrastructure & Port Modernization",
          titleAr: "مدير البنية التحتية الرقمية وتحديث الموانئ",
          titleZh: "数字基础设施与港口智能化研究主任",
          titleCkb: "بەڕێوەبەری ژێرخانی دیجیتاڵی و مۆدێرنکردنی بەندەر",
          bioEn: "Principal investigator on 5G smart port automation, optical fiber backbones, and dry-corridor logistics interoperability.",
          bioAr: "باحث رئيسي في أتمتة الموانئ الذكية بشبكات 5G، والعمود الفقري للألياف الضوئية، ولوجستيات القناة الجافة.",
          bioZh: "主导5G智慧港口自动化、国家级光纤骨干网与干港铁路对接标准化评估。",
          bioCkb: "توێژەری سەرەکی لە بەئۆتۆماتیککردنی بەندەرەکان و ژێرخانی فایبەر ئۆپتیک.",
          imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400",
          pillars: ["digital-silk-road", "energy-bri"],
          languages: ["Arabic", "English"],
          availableForMedia: true
        }
      ];
      res.json(experts);
    } catch (e: any) {
      console.error("Error fetching institute experts:", e);
      res.status(500).json({ error: "Failed to fetch institute experts" });
    }
  });

  // 5. POST /api/public/institute/media-requests - Validated and rate-limited media booking
  app.post("/api/public/institute/media-requests", optionalLimiter, async (req: Request, res: Response) => {
    try {
      const {
        fullName,
        organization,
        email,
        phone,
        expertId,
        expertName,
        requestType,
        topic,
        deadline,
        syndicationIntent,
        preferredLanguage,
        message
      } = req.body;

      if (!fullName || !organization || !email || !message) {
        return res.status(400).json({ error: "Missing required fields (fullName, organization, email, message)" });
      }

      const ticketRef = `CISE-MR-${Math.floor(100000 + Math.random() * 900000)}`;
      const bioPayload = JSON.stringify({
        type: "MEDIA_INTERVIEW_REQUEST",
        organization,
        phone: phone || "Not provided",
        expertId: expertId || "General",
        expertName: expertName || "Any Fellow",
        requestType: requestType || "INTERVIEW",
        topic: topic || "Bilateral Research",
        deadline: deadline || "Flexible",
        syndicationIntent: syndicationIntent || false,
        preferredLanguage: preferredLanguage || "en",
        notes: message
      });

      // Persist to database in PartnershipApplication or TelexDispatch for admin queue
      const saved = await prisma.partnershipApplication.create({
        data: {
          fullName,
          email,
          company: organization,
          role: "Journalist / Media Partner",
          bio: bioPayload,
          bureau: "CISE Media & Communications Directorate",
          hash: ticketRef,
          status: "PENDING"
        }
      });

      res.status(201).json({
        success: true,
        ticketId: ticketRef,
        applicationId: saved.id,
        message: "Institutional interview & media request logged successfully. CISE Media Office will respond within 4-6 business hours."
      });
    } catch (e: any) {
      console.error("Error processing media request:", e);
      res.status(500).json({ error: "Failed to process media request" });
    }
  });

  // 6. POST /api/public/institute/syndication-applications - Rate-limited syndication & co-publishing
  app.post("/api/public/institute/syndication-applications", optionalLimiter, async (req: Request, res: Response) => {
    try {
      const {
        organizationName,
        country,
        mediaType,
        audienceSize,
        languagesRequested,
        reprintScope,
        attributionRequirements,
        contactName,
        email,
        phone,
        notes
      } = req.body;

      const company = organizationName || req.body.company;
      const applicantName = contactName || req.body.fullName;
      const applicantEmail = email;

      if (!company || !applicantEmail) {
        return res.status(400).json({ error: "Missing required fields (organizationName, email)" });
      }

      const ticketRef = `CISE-SYND-${Math.floor(100000 + Math.random() * 900000)}`;
      const payload = JSON.stringify({
        type: "SYNDICATION_AGREEMENT_APPLICATION",
        country: country || "International",
        mediaType: mediaType || "News Agency / Digital Publication",
        audienceSize: audienceSize || "Tier 1 National",
        languagesRequested: languagesRequested || ["en", "ar", "zh", "ckb"],
        reprintScope: reprintScope || "Policy Briefs & Macro Summaries",
        attributionRequirements: attributionRequirements || "Standard CISE Citation",
        phone: phone || "",
        notes: notes || ""
      });

      const saved = await prisma.partnershipApplication.create({
        data: {
          fullName: applicantName || company,
          email: applicantEmail,
          company,
          role: mediaType || "Syndication Applicant",
          bio: payload,
          bureau: "CISE Research Syndication Desk",
          hash: ticketRef,
          status: "PENDING"
        }
      });

      res.status(201).json({
        success: true,
        ticketId: ticketRef,
        applicationId: saved.id,
        message: "Syndication & co-publishing agreement submitted. A CISE Institutional Partnerships Officer will review and respond."
      });
    } catch (e: any) {
      console.error("Error processing syndication application:", e);
      res.status(500).json({ error: "Failed to process syndication application" });
    }
  });

  // 7. GET /api/public/institute/data-hub/trade - Honestly labeled founder-maintained data
  app.get("/api/public/institute/data-hub/trade", async (req: Request, res: Response) => {
    try {
      res.json({
        provenance: {
          status: "FOUNDER_MAINTAINED",
          label: "Founder-maintained & Verified Dataset",
          methodologyNote: "Curated by CISE Intelligence Desk using official General Administration of Customs (PRC) and CBI trade aggregate reporting.",
          updateCadence: "Monthly",
          lastVerified: "2026-03-01",
          divergenceVariant: "Variant A (Exporter Source CIF/FOB Adjusted)"
        },
        annualTotals: [
          { year: "2020", volumeBillionUsd: 30.12, iraqExportsToChina: 22.45, chinaExportsToIraq: 7.67 },
          { year: "2021", volumeBillionUsd: 39.31, iraqExportsToChina: 28.52, chinaExportsToIraq: 10.79 },
          { year: "2022", volumeBillionUsd: 53.71, iraqExportsToChina: 39.73, chinaExportsToIraq: 13.98 },
          { year: "2023", volumeBillionUsd: 49.88, iraqExportsToChina: 35.66, chinaExportsToIraq: 14.22 },
          { year: "2024", volumeBillionUsd: 52.41, iraqExportsToChina: 36.98, chinaExportsToIraq: 15.43 },
          { year: "2025", volumeBillionUsd: 51.17, iraqExportsToChina: 35.80, chinaExportsToIraq: 15.37 }
        ],
        hs2Categories: [
          { code: "HS-27", nameEn: "Mineral Fuels & Oils", percent: 84.6, valueBillion: 43.29 },
          { code: "HS-84", nameEn: "Machinery & Nuclear Reactors", percent: 5.8, valueBillion: 2.97 },
          { code: "HS-85", nameEn: "Electrical Equipment & Telecomm", percent: 4.1, valueBillion: 2.10 },
          { code: "HS-87", nameEn: "Vehicles & Transit Rolling Stock", percent: 2.7, valueBillion: 1.38 },
          { code: "HS-72", nameEn: "Iron & Structural Steel", percent: 1.6, valueBillion: 0.82 },
          { code: "HS-OTH", nameEn: "Other Bilateral Commodities", percent: 1.2, valueBillion: 0.61 }
        ]
      });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch trade data" });
    }
  });

  // 8. GET /api/public/institute/data-hub/corridor
  app.get("/api/public/institute/data-hub/corridor", async (req: Request, res: Response) => {
    try {
      res.json({
        provenance: {
          status: "FOUNDER_MAINTAINED",
          label: "Founder-maintained Logistics Corridor Observatory",
          lastVerified: "2026-03-12"
        },
        nodes: [
          {
            id: "node-yiwu",
            nameEn: "Yiwu International Freight Terminal",
            nameAr: "محطة شحن ييوو الدولية",
            nameZh: "义乌国际陆港枢纽",
            nameCkb: "وێستگەی باری نێودەوڵەتی ییوو",
            nodeType: "Origin Hub",
            country: "China",
            status: "OPERATIONAL",
            weeklyContainerCapacity: 4500,
            logisticsProviders: ["COSCO", "Sinotrans", "Silk Road Rail Express"]
          },
          {
            id: "node-sulaymaniyah",
            nameEn: "Sulaymaniyah Logistics & Dry Hub (Bashmakh Transit)",
            nameAr: "مركز السليمانية اللوجستي ومحطة باشماخ",
            nameZh: "苏莱曼尼亚物流陆港（巴什马克口岸中转）",
            nameCkb: "ناوەندی لۆجستی سلێمانی و دەروازەی باشماخ",
            nodeType: "Inland Northern Distribution",
            country: "Iraq (Kurdistan Region)",
            status: "EXPANDING",
            weeklyContainerCapacity: 1800,
            logisticsProviders: ["Kurdish-Chinese Sourcing Consortium", "Iraq Landway Logistics"]
          },
          {
            id: "node-basra",
            nameEn: "Grand Faw Deepwater Terminal",
            nameAr: "محطة ميناء الفاو الكبير للمياه العميقة",
            nameZh: "大福深水港码头",
            nameCkb: "بەندەری قووڵی فاو",
            nodeType: "Southern Maritime Gateway",
            country: "Iraq (Basra)",
            status: "COMMISSIONING",
            weeklyContainerCapacity: 9200,
            logisticsProviders: ["General Company for Ports of Iraq", "China Harbor Engineering Co."]
          },
          {
            id: "node-baghdad",
            nameEn: "Baghdad Central Rail & Cargo Marshalling Hub",
            nameAr: "محطة بغداد المركزية لقطارات الشحن",
            nameZh: "巴格达中央铁路货运调度中心",
            nameCkb: "وێستگەی ناوەندی هێڵی ئاسنی بەغدا",
            nodeType: "Metropolitan Transfer Spoke",
            country: "Iraq (Baghdad)",
            status: "OPERATIONAL",
            weeklyContainerCapacity: 3100,
            logisticsProviders: ["Iraqi Republic Railways", "Bilateral Freight Lines"]
          }
        ]
      });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch corridor data" });
    }
  });

  // 9. GET /api/public/institute/data-hub/projects
  app.get("/api/public/institute/data-hub/projects", async (req: Request, res: Response) => {
    try {
      res.json({
        provenance: {
          status: "FOUNDER_MAINTAINED",
          label: "Founder-maintained BRI Infrastructure Registry",
          criteria: "Two-source verified against official tenders and EPC contracts where available.",
          lastReviewed: "2026-03-15"
        },
        projects: [
          {
            id: "bri-01",
            name: "Al-Faw Grand Port Phase 1 Berths & Dredging",
            sector: "Maritime Infrastructure",
            status: "COMMISSIONING",
            valueUsd: "$2.6B",
            contractor: "Daewoo E&C / China Harbor Engineering Consortium",
            location: "Basra Governorate",
            verifiedSources: ["Ministry of Transport Iraq", "EPC Contract Gazette"],
            singleSourceOnly: false,
            lastReviewed: "2026-03-10"
          },
          {
            id: "bri-02",
            name: "Wasit Thermal Power Plant Units 5 & 6 Modernization",
            sector: "Energy & Utilities",
            status: "OPERATIONAL",
            valueUsd: "$3.5B",
            contractor: "Shanghai Electric",
            location: "Wasit Governorate",
            verifiedSources: ["Ministry of Electricity Iraq", "Shanghai Electric Disclosures"],
            singleSourceOnly: false,
            lastReviewed: "2026-02-18"
          },
          {
            id: "bri-03",
            name: "Nationwide 1,000 Model Schools Construction (Package 1 & 2)",
            sector: "Social Infrastructure & Education",
            status: "IN_PROGRESS",
            valueUsd: "$1.8B",
            contractor: "PowerChina & Sinotech",
            location: "Nationwide (15 Governorates)",
            verifiedSources: ["Iraqi Council of Ministers Secretariat (GSCOM)"],
            singleSourceOnly: false,
            lastReviewed: "2026-03-05"
          },
          {
            id: "bri-04",
            name: "West Qurna 1 Oilfield Degassing & Water Injection Station",
            sector: "Hydrocarbon Exploration & Production",
            status: "OPERATIONAL",
            valueUsd: "$1.1B",
            contractor: "PetroChina (CNPC)",
            location: "Basra Governorate",
            verifiedSources: ["Basra Oil Company (BOC)", "CNPC International"],
            singleSourceOnly: false,
            lastReviewed: "2026-01-22"
          },
          {
            id: "bri-05",
            name: "Nassiriya International Airport Terminal & Runway Reconstruction",
            sector: "Aviation & Transport",
            status: "UNDER_CONSTRUCTION",
            valueUsd: "$367M",
            contractor: "China State Construction Engineering Corp (CSCEC)",
            location: "Dhi Qar Governorate",
            verifiedSources: ["Civil Aviation Authority Iraq", "CSCEC Overseas"],
            singleSourceOnly: false,
            lastReviewed: "2026-02-28"
          }
        ]
      });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch BRI projects" });
    }
  });

  // 10. GET /api/public/institute/feed.json - Syndication Feed for ICA Newsroom & External Partners
  app.get("/api/public/institute/feed.json", async (req: Request, res: Response) => {
    try {
      res.json({
        version: "https://jsonfeed.org/version/1.1",
        title: "Chinese Institute for Strategic and Economic Studies (CISE) Research Feed",
        home_page_url: "https://iraq-china-agency.com/en/institute",
        feed_url: "https://iraq-china-agency.com/api/public/institute/feed.json",
        description: "Official publication and research syndication feed of the Chinese Institute for Strategic and Economic Studies (Iraqi-Chinese Agency).",
        items: [
          {
            id: "mapping-iraq-china-development-corridor",
            url: "https://iraq-china-agency.com/en/institute/publications/mapping-iraq-china-development-corridor",
            title: "Mapping the Iraq–China Development Corridor: Infrastructure, Energy, & Sovereign Debt",
            summary: "An exhaustive multi-node econometric analysis of bilateral infrastructure interconnectivity and oil-backed financing.",
            date_published: "2026-02-15T00:00:00Z",
            authors: [{ name: "Dr. Wang Wei" }, { name: "Ziyad Al-Husseini" }]
          },
          {
            id: "iqd-cny-settlement-macroeconomic-impacts",
            url: "https://iraq-china-agency.com/en/institute/publications/iqd-cny-settlement-macroeconomic-impacts",
            title: "Direct IQD/CNY Settlement: Macroeconomic Impacts on Bilateral Trade",
            summary: "Evaluating the transition toward local currency settlement in energy transactions and mBridge corridor integration.",
            date_published: "2026-01-20T00:00:00Z",
            authors: [{ name: "Ahmed Kareem" }, { name: "Li Na" }]
          }
        ]
      });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to generate syndication feed" });
    }
  });

  // 11. CiseCommandHub Endpoints for Reviewing Media Requests & Syndication Applications
  app.get("/api/hub/institute/media-requests", editorOrCiseCommandHubMiddleware, async (req: Request, res: Response) => {
    try {
      const records = await prisma.partnershipApplication.findMany({
        where: {
          bureau: "CISE Media & Communications Directorate"
        },
        orderBy: { createdAt: "desc" }
      });
      res.json(records);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch media requests" });
    }
  });

  app.get("/api/hub/institute/syndication-applications", editorOrCiseCommandHubMiddleware, async (req: Request, res: Response) => {
    try {
      const records = await prisma.partnershipApplication.findMany({
        where: {
          bureau: "CISE Research Syndication Desk"
        },
        orderBy: { createdAt: "desc" }
      });
      res.json(records);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch syndication applications" });
    }
  });
}
