export type Locale = 'en' | 'ar' | 'zh' | 'ckb';

export interface Translations {
  appName: string;
  tagline: string;
  nav: {
    newsroom: string;
    institute: string;
    services: string;
    settlement: string;
    summit: string;
    hub: string;
    backToIca: string;
  };
  newsroom: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    readMore: string;
    publishedOn: string;
    latestArticles: string;
    mediaAnalysis: string;
  };
  institute: {
    title: string;
    subtitle: string;
    pillarsTitle: string;
    tradePillar: string;
    tradeDesc: string;
    briPillar: string;
    briDesc: string;
    financePillar: string;
    financeDesc: string;
    energyPillar: string;
    energyDesc: string;
    servicesTitle: string;
    viewServices: string;
  };
  services: {
    title: string;
    subtitle: string;
    visaFlight: string;
    visaFlightDesc: string;
    consultancy: string;
    consultancyDesc: string;
    sourcing: string;
    sourcingDesc: string;
    cultural: string;
    culturalDesc: string;
    bookConsultation: string;
    trackApplication: string;
  };
  settlement: {
    title: string;
    subtitle: string;
    converterTitle: string;
    amount: string;
    fromCurrency: string;
    toCurrency: string;
    convertedValue: string;
    rateNotice: string;
    gatewayStatus: string;
    complianceHandbook: string;
    trackerTitle: string;
    trackOrder: string;
  };
  summit: {
    title: string;
    subtitle: string;
    dateVenue: string;
    venueLocation: string;
    sectorsTitle: string;
    registerDelegate: string;
    registerExhibitor: string;
    agendaTitle: string;
    speakersTitle: string;
  };
  hub: {
    title: string;
    subtitle: string;
    roleBadge: string;
    overview: string;
    articlesTab: string;
    usersTab: string;
    auditLogsTab: string;
    announcementsTab: string;
    createArticle: string;
    edit: string;
    delete: string;
    save: string;
    status: string;
  };
  common: {
    loading: string;
    error: string;
    retry: string;
    allRightsReserved: string;
    contactSupport: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    appName: 'Iraqi-Chinese Agency',
    tagline: 'media & newsroom Portal',
    nav: {
      newsroom: 'ICA Media & Newsroom',
      institute: 'Chinese Institute (CISE)',
      services: 'Institute Services',
      settlement: 'Payment Settlement',
      summit: 'Iraq-China Summit',
      hub: 'Command Hub',
      backToIca: '← BACK TO ICA',
    },
    newsroom: {
      title: 'ICA Media & Newsroom',
      subtitle: 'Authoritative analysis, energy trade diplomacy, and economic intelligence across Baghdad, Beijing, and Erbil.',
      searchPlaceholder: 'Search articles, policy briefs, trade reports...',
      allCategories: 'All Focus Areas',
      readMore: 'Read Full Analysis',
      publishedOn: 'Published',
      latestArticles: 'Latest Dispatches & Analyses',
      mediaAnalysis: 'Strategic Media Briefings',
    },
    institute: {
      title: 'Chinese Institute for Strategic and Economic Studies',
      subtitle: 'Independent geopolitical research, industrial integration analytics, and sovereign trade roadmaps.',
      pillarsTitle: 'Four Core Strategic Research Pillars',
      tradePillar: 'Bilateral Trade & Supply Chains',
      tradeDesc: 'Quantitative macro-modeling of oil-for-reconstruction flows, customs clearance, and industrial imports.',
      briPillar: 'Belt & Road / Development Road Corridor',
      briDesc: 'Multimodal freight corridors linking Grand Faw Port, Basra logistics zones, and Eurasian railways.',
      financePillar: 'Monetary Integration & Settlement',
      financeDesc: 'IQD-CNY currency corridors, bilateral central bank swaps, and sovereign liquidity mechanisms.',
      energyPillar: 'Energy Infrastructure & Transition',
      energyDesc: 'Associated petroleum gas capture, photovoltaic generation, and joint refinery technologies.',
      servicesTitle: 'Institute Dedicated Services',
      viewServices: 'Explore Institutional Services',
    },
    services: {
      title: 'CISE Institutional Services & Facilitation',
      subtitle: 'Comprehensive bilateral enterprise support, sovereign clearance, and advisory channels.',
      visaFlight: 'Consular Visa & Aviation Coordination',
      visaFlightDesc: 'Expedited diplomatic clearances, commercial transit, and Baghdad/Erbil/Guangzhou charters.',
      consultancy: 'Strategic Enterprise Consultancy',
      consultancyDesc: 'Regulatory guidance for state contracts, FDI compliance, and arbitration advisory.',
      sourcing: 'Industrial Sourcing & Quality Inspection',
      sourcingDesc: 'Verification of Chinese manufacturing partners, machinery supply, and pre-shipment auditing.',
      cultural: 'Cultural & Academic Exchange Programs',
      culturalDesc: 'University research partnerships, Mandarin language education, and technical fellowships.',
      bookConsultation: 'Initiate Official Inquiry',
      trackApplication: 'Track Service Request',
    },
    settlement: {
      title: 'Payment Settlement Facilitation',
      subtitle: 'Direct bilateral monetary clearance, cross-border banking integration, and FX optimization.',
      converterTitle: 'Real-Time IQD / CNY / USD Institutional Converter',
      amount: 'Transaction Amount',
      fromCurrency: 'Source Currency',
      toCurrency: 'Target Currency',
      convertedValue: 'Estimated Converted Settlement',
      rateNotice: 'Rates synchronized with PBOC & CBI official daily reference fixes.',
      gatewayStatus: 'Operational - Real-Time Gross Settlement Ready',
      complianceHandbook: 'Download Compliance & Settlement Handbook (PDF)',
      trackerTitle: 'Settlement Transaction Status Tracker',
      trackOrder: 'Query Reference Hash',
    },
    summit: {
      title: 'Iraq-China Economic Summit & Bilateral Expo 2026',
      subtitle: 'The premier bilateral gathering connecting sovereign ministers, state enterprises, and industrial champions.',
      dateVenue: 'October 14–17, 2026 | Sulaymaniyah International Expo Center',
      venueLocation: 'Sulaymaniyah, Kurdistan Region, Iraq',
      sectorsTitle: 'Featured Exhibition Pavilions',
      registerDelegate: 'Register as Official Delegate',
      registerExhibitor: 'Secure Exhibition Pavilion',
      agendaTitle: 'Summit Plenary Sessions & Roundtables',
      speakersTitle: 'Keynote Dignitaries & Economists',
    },
    hub: {
      title: 'CISE Command Hub & Editorial Operations',
      subtitle: 'Unified role-based access control, article dispatch curation, audit monitoring, and announcements.',
      roleBadge: 'Clearance',
      overview: 'System Overview',
      articlesTab: 'Articles & Studies',
      usersTab: 'Personnel & Analysts',
      auditLogsTab: 'Audit & Access Logs',
      announcementsTab: 'Broadcast Alerts',
      createArticle: 'Compose Analysis',
      edit: 'Modify',
      delete: 'Remove',
      save: 'Commit Changes',
      status: 'Current Status',
    },
    common: {
      loading: 'Loading intelligence dispatch...',
      error: 'Unable to synchronize intelligence feed. Please verify connectivity.',
      retry: 'Retry Sync',
      allRightsReserved: 'All rights reserved. Iraqi-Chinese Agency & Chinese Institute for Strategic and Economic Studies.',
      contactSupport: 'Security & Protocol Secretariat',
    },
  },
  ar: {
    appName: 'الوكالة العراقية الصينية',
    tagline: 'منصة إعلام وأخبار الوكالة والذكاء الاستراتيجي الثنائي',
    nav: {
      newsroom: 'إعلام وغرفة أخبار الوكالة',
      institute: 'المعهد الصيني للدراسات (CISE)',
      services: 'خدمات المعهد',
      settlement: 'تسهيل التسويات المالية',
      summit: 'القمة والمعرض الاقتصادي',
      hub: 'مركز القيادة والتحكم',
      backToIca: '← العودة للوكالة',
    },
    newsroom: {
      title: 'إعلام وغرفة أخبار الوكالة العراقية الصينية',
      subtitle: 'تحليلات موثوقة، ودبلوماسية تجارة الطاقة، واستخبارات اقتصادية عبر بغداد وبكين وأربيل.',
      searchPlaceholder: 'ابحث في التحليلات والتقارير والاتفاقيات...',
      allCategories: 'جميع المجالات',
      readMore: 'قراءة التحليل الكامل',
      publishedOn: 'تاريخ النشر',
      latestArticles: 'أحدث البرقيات والتحليلات',
      mediaAnalysis: 'إحاطات إعلامية استراتيجية',
    },
    institute: {
      title: 'المعهد الصيني للدراسات الاستراتيجية والاقتصادية',
      subtitle: 'أبحاث جيوسياسية مستقلة، تحليلات التكامل الصناعي، وخرائط التجارة السيادية.',
      pillarsTitle: 'الركائز الاستراتيجية الأربع للأبحاث',
      tradePillar: 'التجارة الثنائية وسلاسل الإمداد',
      tradeDesc: 'نمذجة اقتصادية كلية لآليات النفط مقابل الإعمار، والجمارك والواردات الصناعية.',
      briPillar: 'طريق الحرير / ممر طريق التنمية',
      briDesc: 'ممرات شحن متعددة الوسائط تربط ميناء الفاو الكبير بالمناطق اللوجستية والسكك الأوراسية.',
      financePillar: 'التكامل النقدي والتسويات المصرفية',
      financeDesc: 'ممرات العملة بين الدينار واليوان، ومبادلات البنوك المركزية، وآليات السيولة السيادية.',
      energyPillar: 'البنية التحتية للطاقة والتحول الأخضر',
      energyDesc: 'استثمار الغاز المصاحب، محطات الطاقة الشمسية، وتقنيات التكرير المشترك.',
      servicesTitle: 'الخدمات المؤسسية المتخصصة',
      viewServices: 'استكشاف خدمات المعهد',
    },
    services: {
      title: 'خدمات وتسهيلات المعهد الصيني (CISE)',
      subtitle: 'دعم شامل للمؤسسات والشركات، وتخليص سيادي، وقنوات استشارية متخصصة.',
      visaFlight: 'التنسيق القنصلي للتأشيرات والطيران',
      visaFlightDesc: 'تسهيلات دبلوماسية معجلة، وتراخيص تجارية، ورحلات مباشرة بين بغداد وأربيل وغوانزو.',
      consultancy: 'الاستشارات الاستراتيجية للشركات',
      consultancyDesc: 'إرشادات تنظيمية للعقود الحكومية، وضوابط الاستثمار الأجنبي والتحكيم التجاري.',
      sourcing: 'التوريد الصناعي وفحص الجودة',
      sourcingDesc: 'توثيق واعتماد المصانع الصينية الشريكة، وتوريد الآلات، والتدقيق قبل الشحن.',
      cultural: 'برامج التبادل الثقافي والأكاديمي',
      culturalDesc: 'شراكات بحثية جامعية، وتعليم اللغة الصينية، وزمالات تقنية متقدمة.',
      bookConsultation: 'تقديم طلب استفسار رسمي',
      trackApplication: 'تتبع حالة المعاملة',
    },
    settlement: {
      title: 'تسهيل التسويات والمدفوعات المالية',
      subtitle: 'مقاصة نقدية ثنائية مباشرة، وتكامل مصرفي عابر للحدود، وإدارة أسعار الصرف.',
      converterTitle: 'محول العملات المؤسسي المباشر (دينار / يوان / دولار)',
      amount: 'مبلغ المعاملة',
      fromCurrency: 'عملة التحويل الأساسية',
      toCurrency: 'عملة التسوية المستهدفة',
      convertedValue: 'قيمة التسوية التقديرية',
      rateNotice: 'الأسعار متزامنة يومياً مع البنك المركزي العراقي وبنك الشعب الصيني.',
      gatewayStatus: 'جاهزية تشغيلية كاملة - نظام التسوية الإجمالية الفورية مفعّل',
      complianceHandbook: 'تحميل دليل الامتثال والتسوية المالية (PDF)',
      trackerTitle: 'نظام تتبع حالة أوامر التسوية',
      trackOrder: 'استعلام بواسطة كود المعاملة',
    },
    summit: {
      title: 'القمة والمعرض الاقتصادي العراقي الصيني 2026',
      subtitle: 'الملتقى الثنائي الرفيع الذي يجمع الوزراء وصناع القرار والشركات السيادية ورجال الأعمال.',
      dateVenue: '14–17 تشرين الأول 2026 | مركز السليمانية الدولي للمعارض',
      venueLocation: 'السليمانية، إقليم كردستان، العراق',
      sectorsTitle: 'الأجنحة والقطاعات المشاركة',
      registerDelegate: 'التسجيل كوفد رسمي',
      registerExhibitor: 'حجز جناح في المعرض',
      agendaTitle: 'جدول الأعمال والجلسات الحوارية',
      speakersTitle: 'المتحدثون الرئيسيون والخبراء',
    },
    hub: {
      title: 'مركز قيادة المعهد والعمليات التحريرية',
      subtitle: 'إدارة متكاملة للصلاحيات، ونشر التحليلات، وسجلات التدقيق الأمني، والإعلانات.',
      roleBadge: 'مستوى التصريح',
      overview: 'نظرة عامة',
      articlesTab: 'المقالات والأبحاث',
      usersTab: 'المحللون والباحثون',
      auditLogsTab: 'سجلات التدقيق الأمني',
      announcementsTab: 'التعميمات والتنبيهات',
      createArticle: 'إنشاء تحليل جديد',
      edit: 'تعديل',
      delete: 'حذف',
      save: 'حفظ التغييرات',
      status: 'الحالة التشغيلية',
    },
    common: {
      loading: 'جاري تحميل البيانات الاستخباراتية...',
      error: 'تعذر الاتصال بمركز البيانات. يرجى التحقق من الشبكة.',
      retry: 'إعادة المحاولة',
      allRightsReserved: 'جميع الحقوق محفوظة. الوكالة العراقية الصينية والمعهد الصيني للدراسات الاستراتيجية والاقتصادية.',
      contactSupport: 'أمانة المراسم والبروتوكول الأمني',
    },
  },
  zh: {
    appName: '伊拉克-中国通讯社',
    tagline: 'ICA 媒体与新闻中心 · 双边战略情报与全媒体平台',
    nav: {
      newsroom: 'ICA 媒体与新闻中心',
      institute: '中国战略与经济研究所 (CISE)',
      services: '研究所专属服务',
      settlement: '跨境支付与双边结算',
      summit: '伊中经济峰会暨博览会',
      hub: '中央指挥中枢',
      backToIca: '← 返回通讯社首页',
    },
    newsroom: {
      title: '伊中通讯社 媒体与新闻中心',
      subtitle: '汇聚巴格达、北京与埃尔比勒的权威分析、能源贸易外交与宏观经济情报。',
      searchPlaceholder: '检索深度分析、政策备忘录、贸易协定...',
      allCategories: '所有专业领域',
      readMore: '阅读全文',
      publishedOn: '发布时间',
      latestArticles: '最新电讯与战略研判',
      mediaAnalysis: '战略媒体简报',
    },
    institute: {
      title: '中国战略与经济研究所 (CISE)',
      subtitle: '独立的地缘政治研判、产业协同集成与主权贸易走廊战略智库。',
      pillarsTitle: '四大核心战略研究支柱',
      tradePillar: '双边贸易与供应链安全',
      tradeDesc: '以石油换重建宏观机制测算、海关通关便利化与成套设备进口规划。',
      briPillar: '一带一路与“发展之路”大通道',
      briDesc: '依托大福港港口物流、巴士拉枢纽与欧亚铁路网的多式联运战略走廊。',
      financePillar: '货币金融与本币结算通道',
      financeDesc: '伊拉克第纳尔与人民币双边互换、央行流动性调节及主权结算工具。',
      energyPillar: '能源基础设施与低碳转型',
      energyDesc: '油气伴生气回收利用、大型光伏发电基建与现代炼化一体化协作。',
      servicesTitle: '研究所机构服务',
      viewServices: '查看服务矩阵',
    },
    services: {
      title: '研究所机构服务与双边对接',
      subtitle: '为政府机构、央国企与产业领军企业提供全流程落地保障与战略护航。',
      visaFlight: '领事签证与中伊直航协调',
      visaFlightDesc: '加急商务与公务签证协办，巴格达/埃尔比勒直飞广州等枢纽包机航线协调。',
      consultancy: '跨国企业投资与合规咨询',
      consultancyDesc: '主权合同审查、外商直接投资法律合规及双边仲裁风控指引。',
      sourcing: '产业供应链直采与品质验厂',
      sourcingDesc: '中国优质工业品与工程机械厂商资格认证、出厂检验与全程监装。',
      cultural: '人文交流与高等学术研修合作',
      culturalDesc: '名校联合科研、鲁班工坊高级职业技能培训与中伊青年学者研修班。',
      bookConsultation: '提交正式业务对接申请',
      trackApplication: '追踪办理进展',
    },
    settlement: {
      title: '跨境支付与双边结算便利化中心',
      subtitle: '直联货币清算通道、跨境银行互联互通与外汇头寸对冲优化。',
      converterTitle: '第纳尔 / 人民币 / 美元 机构级实时汇率核算',
      amount: '拟结算金额',
      fromCurrency: '原始汇出币种',
      toCurrency: '目标结算币种',
      convertedValue: '预计清算结算额',
      rateNotice: '汇率每日与伊拉克央行及中国人民银行基准牌价实时同步。',
      gatewayStatus: '系统运行中 - 全额实时清算通道已就绪',
      complianceHandbook: '下载《双边清算合规指引白皮书》(PDF)',
      trackerTitle: '结算批次凭证验证查询',
      trackOrder: '输入交易哈希或申请号',
    },
    summit: {
      title: '2026年伊拉克-中国经济峰会暨双边博览会',
      subtitle: '连接主权部长、国际战略资本与行业领军企业的最高规格双边盛会。',
      dateVenue: '2026年10月14日至17日 | 苏莱曼尼亚国际会展中心',
      venueLocation: '伊拉克·库尔德斯坦地区·苏莱曼尼亚',
      sectorsTitle: '重点产业主题展区',
      registerDelegate: '注册为正式代表',
      registerExhibitor: '预定博览会特装展位',
      agendaTitle: '全体大会与圆桌对话议程',
      speakersTitle: '主旨演讲贵宾与首席经济学家',
    },
    hub: {
      title: '研究所中央指挥中枢与采编管理',
      subtitle: '统筹权限控制、深度研报发布、全系统审计日志监测与突发播报。',
      roleBadge: '安全权限',
      overview: '运行概览',
      articlesTab: '文章与研报管理',
      usersTab: '分析员与研究人员',
      auditLogsTab: '安全审计与访问日志',
      announcementsTab: '全网广播公告',
      createArticle: '起草战略分析',
      edit: '编辑',
      delete: '删除',
      save: '保存提交',
      status: '节点状态',
    },
    common: {
      loading: '正在载入战略简报与数据流...',
      error: '数据接口同步出现异常，请检查网络连接。',
      retry: '重新同步',
      allRightsReserved: '版权所有。伊拉克-中国通讯社 与 中国战略与经济研究所。',
      contactSupport: '安全防务与礼宾秘书处',
    },
  },
  ckb: {
    appName: 'ئاژانسی عێراقی-چینی',
    tagline: 'میدیا و ژووری هەواڵی ICA · زانیاری ستراتیژی و دیپلۆماسی',
    nav: {
      newsroom: 'میدیا و ژووری هەواڵی ICA',
      institute: 'پەیمانگای چینی (CISE)',
      services: 'خزمەتگوزارییەکانی پەیمانگا',
      settlement: 'ئاسانکاری پارەدان و یەکلاییکردنەوە',
      summit: 'لووتکە و پێشانگای ئابووری عێراق-چین',
      hub: 'ناوەندی فەرماندەیی و کۆنترۆڵ',
      backToIca: '← گەڕانەوە بۆ ئاژانس',
    },
    newsroom: {
      title: 'میدیا و ژووری هەواڵی ئاژانسی عێراقی-چینی',
      subtitle: 'شیکاری جێی متمانە، دیپلۆماسی بازرگانی وزە، و زانیاری ئابووری لە بەغدا، پەکین و هەولێر.',
      searchPlaceholder: 'گەڕان لە شیکارییەکان، راپۆرتەکان، رێککەوتنەکان...',
      allCategories: 'هەموو بوارەکان',
      readMore: 'خوێندنەوەی تەواوی شیکاری',
      publishedOn: 'بەرواری بڵاوکردنەوە',
      latestArticles: 'نوێترین بەیاننامە و شیکارییەکان',
      mediaAnalysis: 'کورتەی میدیایی ستراتیژی',
    },
    institute: {
      title: 'پەیمانگای چینی بۆ لێکۆڵینەوەی ستراتیژی و ئابووری (CISE)',
      subtitle: 'توێژینەوەی جیۆپۆلەتیکی سەربەخۆ، شیکاری پێکەوەبەستنی پیشەسازی و نەخشەڕێگای بازرگانی دەوڵەتی.',
      pillarsTitle: 'چوار پایەی سەرەکی توێژینەوەی ستراتیژی',
      tradePillar: 'بازرگانی دوولایەنە و زنجیرەی دابینکردن',
      tradeDesc: 'مۆدێلسازی ئابووری گەورە بۆ رێککەوتنی نەوت بەرامبەر ئاوەدانکردنەوە و هاوردەی پیشەسازی.',
      briPillar: 'پشتێن و رێگا / رێڕەوی گەشەپێدان',
      briDesc: 'رێڕەوەکانی گواستنەوەی فرەجۆر کە بەندەری گەورەی فاو بە ناوچە لۆجستییەکان و هێڵی ئاسنی ئەوراسیا دەبەستێتەوە.',
      financePillar: 'یەکگرتنی دراو و یەکلاییکردنەوەی دارایی',
      financeDesc: 'رێڕەوی ئاڵوگۆڕی دینار و یوان، ئاڵوگۆڕی بانکە ناوەندییەکان و میکانیزمەکانی نەختینەی سەروەری.',
      energyPillar: 'ژێرخانی وزە و گواستنەوەی سەوز',
      energyDesc: 'کۆکردنەوەی گازی هاوەڵ، وێستگەکانی وزەی خۆر و تەکنەلۆژیای هاوبەشی پاڵاوتن.',
      servicesTitle: 'خزمەتگوزارییە دامەزراوەییەکان',
      viewServices: 'بینینی خزمەتگوزارییەکان',
    },
    services: {
      title: 'خزمەتگوزاری و ئاسانکارییەکانی پەیمانگای چینی',
      subtitle: 'پشتیوانی گشتگیر بۆ دامەزراوە و کۆمپانیاکان، ڕێکاری فەرمی، و راوێژکاری تایبەتمەند.',
      visaFlight: 'هەماهەنگی کونسوڵگەری بۆ ڤیزا و گەشتە ئاسمانییەکان',
      visaFlightDesc: 'ئاسانکاری خێرا بۆ ڤیزای بازرگانی و دیپلۆماسی، و گەشتی ڕاستەوخۆی بەغدا و هەولێر بۆ گوانگژۆ.',
      consultancy: 'راوێژکاری ستراتیژی کۆمپانیاکان',
      consultancyDesc: 'رێنمایی یاسایی بۆ گرێبەستە حکومییەکان، وەبەرهێنانی بیانی و ناوبژیوانی بازرگانی.',
      sourcing: 'دابینکردنی پیشەسازی و پشکنینی کوالیتی',
      sourcingDesc: 'پشتڕاستکردنەوەی کارگە چینییە هاوبەشەکان، دابینکردنی ئامێر، و پشکنین پێش بارکردن.',
      cultural: 'بەرنامەکانی ئاڵوگۆڕی کولتووری و ئەکادیمی',
      culturalDesc: 'هاوبەشی توێژینەوەی زانکۆکان، فێرکردنی زمانی چینی، و خولی پێشکەوتووی پیشەیی.',
      bookConsultation: 'پێشکەشکردنی داواکاری فەرمی',
      trackApplication: 'بەدواداچوونی داواکاری',
    },
    settlement: {
      title: 'ئاسانکاری یەکلاییکردنەوە و پارەدانی دارایی',
      subtitle: 'یەکلاییکردنەوەی ڕاستەوخۆی دراو، پێکەوەبەستنی بانکی نێودەوڵەتی، و بەڕێوەبردنی نرخی ئاڵوگۆڕ.',
      converterTitle: 'گۆڕەری دراوی ڕاستەوخۆ (دینار / یوان / دۆلار)',
      amount: 'بڕی مامەڵە',
      fromCurrency: 'دراوی بنەڕەتی',
      toCurrency: 'دراوی ئامانج',
      convertedValue: 'نرخی خەمڵێنراوی یەکلاییکردنەوە',
      rateNotice: 'نرخەکان رۆژانە راستەوخۆ لەگەڵ بانکی ناوەندی عێراق و بانکی گەلی چین نوێ دەکرێنەوە.',
      gatewayStatus: 'سیستەم کارایە - یەکلاییکردنەوەی خێرای ڕاستەوخۆ ئامادەیە',
      complianceHandbook: 'داگرتنی پەڕتووکی پابەندی و یەکلاییکردنەوەی دارایی (PDF)',
      trackerTitle: 'سیستەمی بەدواداچوونی مامەڵەی دارایی',
      trackOrder: 'گەڕان بەپێی کۆدی مامەڵە',
    },
    summit: {
      title: 'لووتکە و پێشانگای ئابووری عێراق-چین 2026',
      subtitle: 'گەورەترین کۆبوونەوەی دوولایەنە لەنێوان وەزیران، بڕیاربەدەستان، کۆمپانیا گەورەکان و وەبەرهێنەران.',
      dateVenue: '14–17ی تشرینی یەکەمی 2026 | پێشانگای نێودەوڵەتی سلێمانی',
      venueLocation: 'سلێمانی، هەرێمی کوردستان، عێراق',
      sectorsTitle: 'باڵیۆزخانە و کەرتە بەشداربووەکان',
      registerDelegate: 'خۆتۆمارکردن وەک شاندی فەرمی',
      registerExhibitor: 'گرتنی باڵیۆزخانە لە پێشانگاکە',
      agendaTitle: 'کارنامەی دانیشتنەکان و گفتوگۆکان',
      speakersTitle: 'قسەکەرانی سەرەکی و ئابووریناسان',
    },
    hub: {
      title: 'ناوەندی فەرماندەیی پەیمانگا و ئۆپەراسیۆنی نووسین',
      subtitle: 'بەڕێوەبردنی تەواوی دەسەڵاتەکان، بڵاوکردنەوەی شیکاری، چاودێری ئاسایش و راگەیەندراوەکان.',
      roleBadge: 'ئاستی متمانە',
      overview: 'کورتەی گشتی',
      articlesTab: 'وتار و توێژینەوەکان',
      usersTab: 'شیکارکەران و توێژەران',
      auditLogsTab: 'تۆماری ئاسایش و سەردانەکان',
      announcementsTab: 'ئاگادارییە گشتییەکان',
      createArticle: 'نووسینی شیکاری نوێ',
      edit: 'دەستکاری',
      delete: 'سڕینەوە',
      save: 'پاشەکەوتکردن',
      status: 'دۆخی کارکردن',
    },
    common: {
      loading: 'بارکردنی زانیارییەکان...',
      error: 'پەیوەندی لەگەڵ داتاسەنتەر سەرکەوتوو نەبوو. تکایە هێڵی ئینتەرنێت بپشکنە.',
      retry: 'دووبارە هەوڵدانەوە',
      allRightsReserved: 'هەموو مافەکان پارێزراون. ئاژانسی عێراقی-چینی و پەیمانگای چینی بۆ لێکۆڵینەوەی ستراتیژی و ئابووری.',
      contactSupport: 'ئەمینداریەتی پرۆتۆکۆڵ و پاراستن',
    },
  },
};
