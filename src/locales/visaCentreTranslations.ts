import { Locale } from '../types';

export interface VisaCentreDictionary {
  centreTitle: string;
  centreSubtitle: string;
  positioningStatement: string;
  independenceDisclaimer: string;
  disclaimerShort: string;
  nonIssuingAuthorityNotice: string;

  // Nav
  navHome: string;
  navAbout: string;
  navServices: string;
  navVisaTypes: string;
  navRequirements: string;
  navFees: string;
  navProcess: string;
  navAppointments: string;
  navApply: string;
  navTrack: string;
  navNews: string;
  navFaq: string;
  navContact: string;
  navDisclaimer: string;

  // Directions
  dirIraqToChina: string;
  dirChinaToIraq: string;
  dirBoth: string;

  // Actions & Buttons
  requestServiceBtn: string;
  bookAppointmentBtn: string;
  trackStatusBtn: string;
  viewChecklistBtn: string;
  downloadPdfBtn: string;
  printDossierBtn: string;
  submitApplicationBtn: string;
  searchPlaceholder: string;
  filterAll: string;

  // Sections
  heroTitle: string;
  heroBadge: string;
  servicesTitle: string;
  servicesSubtitle: string;
  typesTitle: string;
  typesSubtitle: string;
  processTitle: string;
  processSubtitle: string;
  trackerTitle: string;
  trackerSubtitle: string;
  announcementsTitle: string;
  faqsTitle: string;

  // Forms
  fullName: string;
  nationality: string;
  dob: string;
  gender: string;
  passportNumber: string;
  passportExpiry: string;
  email: string;
  phone: string;
  address: string;
  travelPurpose: string;
  travelerCount: string;
  intendedDate: string;
  consentCheckbox: string;
  referenceId: string;
  enterReferenceId: string;
  enterLastNameOrEmail: string;

  // Statuses
  statusReceived: string;
  statusInReview: string;
  statusAwaitingDocs: string;
  statusSubmitted: string;
  statusAptBooked: string;
  statusDecisionPending: string;
  statusApproved: string;
  statusRefused: string;
  statusClosed: string;

  // Command Hub
  hubTitle: string;
  hubOverview: string;
  hubVisaTypes: string;
  hubServices: string;
  hubApplications: string;
  hubApplicants: string;
  hubDocuments: string;
  hubAppointments: string;
  hubFees: string;
  hubRequirements: string;
  hubAnnouncements: string;
  hubFaqs: string;
  hubSettings: string;
  hubAuditLogs: string;
  revealPiiBtn: string;
  maskPiiNotice: string;
  softDeleteBtn: string;
  restoreBtn: string;
  permanentDeleteBtn: string;
}

export const VISA_CENTRE_I18N: Record<Locale, VisaCentreDictionary> = {
  en: {
    centreTitle: 'Bilateral Visa Consultancy & Facilitation Centre',
    centreSubtitle: 'Strategic Advisory & Documentation Facilitation for Bilateral Mobility',
    positioningStatement: 'Documented, compliant, and up-to-date guidance for Iraq–China visa applications. Serving business travelers, students, delegations, and families.',
    independenceDisclaimer: "The Bilateral Visa Consultancy & Facilitation Centre is an independent advisory service operated by the Chinese Institute for Strategic and Economic Studies. It is not a visa-issuing authority. All visa decisions are made solely by the Government of the People's Republic of China or the Government of the Republic of Iraq, as applicable. Our role is limited to advisory, documentation, and appointment facilitation.",
    disclaimerShort: 'Independent advisory service — Not a visa-issuing authority. All visa decisions are made solely by official sovereign authorities.',
    nonIssuingAuthorityNotice: 'Official Notice: Neither this Centre nor the Institute issues visas. We provide regulatory advisory, documentation review, and facilitation support.',

    navHome: 'Home',
    navAbout: 'About the Centre',
    navServices: 'Services Catalogue',
    navVisaTypes: 'Visa Types Reference',
    navRequirements: 'Checklist Builder',
    navFees: 'Fee Schedules',
    navProcess: 'Process Diagram',
    navAppointments: 'Appointments',
    navApply: 'Service Request',
    navTrack: 'Application Tracker',
    navNews: 'Policy Updates',
    navFaq: 'FAQs',
    navContact: 'Contact Us',
    navDisclaimer: 'Disclaimer',

    dirIraqToChina: 'Iraq → China (Chinese Visas)',
    dirChinaToIraq: 'China → Iraq (Iraqi Visas)',
    dirBoth: 'Bilateral (Both Directions)',

    requestServiceBtn: 'Request Facilitation Service',
    bookAppointmentBtn: 'Book Consular Appointment',
    trackStatusBtn: 'Track Your Application',
    viewChecklistBtn: 'Build Custom Checklist',
    downloadPdfBtn: 'Export as Official PDF',
    printDossierBtn: 'Print Dossier Checklist',
    submitApplicationBtn: 'Submit Application Dossier',
    searchPlaceholder: 'Search visa types, services, requirements...',
    filterAll: 'All Categories',

    heroTitle: 'Professional Visa Consultancy & Bilateral Travel Facilitation',
    heroBadge: 'Chinese Institute for Strategic and Economic Studies',
    servicesTitle: 'Facilitation & Advisory Services',
    servicesSubtitle: 'Structured, high-standard services for individual and corporate travelers',
    typesTitle: 'Comprehensive Visa Categories Reference',
    typesSubtitle: 'Authoritative visa classifications for China and Iraq',
    processTitle: 'Step-by-Step Facilitation Process',
    processSubtitle: 'From preliminary dossier audit to passport return',
    trackerTitle: 'Secure Application Tracking',
    trackerSubtitle: 'Check your dossier review status with your reference ID',
    announcementsTitle: 'Consular News & Policy Updates',
    faqsTitle: 'Frequently Asked Questions',

    fullName: 'Full Legal Name (as in Passport)',
    nationality: 'Nationality',
    dob: 'Date of Birth',
    gender: 'Gender',
    passportNumber: 'Passport Number',
    passportExpiry: 'Passport Expiration Date',
    email: 'Email Address',
    phone: 'Phone Number (with country code)',
    address: 'Current Residential / Business Address',
    travelPurpose: 'Detailed Purpose of Travel',
    travelerCount: 'Number of Travelers',
    intendedDate: 'Intended Date of Travel',
    consentCheckbox: 'I acknowledge the Centre is an independent advisory service and give consent to data processing under strict privacy protocols.',
    referenceId: 'Application Reference ID',
    enterReferenceId: 'e.g. VC-2026-481920',
    enterLastNameOrEmail: 'Enter your registered email address or legal last name',

    statusReceived: 'Application Received',
    statusInReview: 'Dossier Under Review',
    statusAwaitingDocs: 'Awaiting Supporting Documents',
    statusSubmitted: 'Submitted to Consulate / Diplomatic Channel',
    statusAptBooked: 'Biometric Appointment Confirmed',
    statusDecisionPending: 'Consular Decision Pending',
    statusApproved: 'Entry Authorized / Visa Ready',
    statusRefused: 'Consular Refusal',
    statusClosed: 'Case Closed',

    hubTitle: 'Visa Centre Command Hub',
    hubOverview: 'Operational Overview & Key Metrics',
    hubVisaTypes: 'Visa Categories',
    hubServices: 'Services Catalogue',
    hubApplications: 'Applications Dossiers',
    hubApplicants: 'Applicants (PII Protected)',
    hubDocuments: 'Document Review',
    hubAppointments: 'Appointments Queue',
    hubFees: 'Fee Versioning',
    hubRequirements: 'Checklist Matrix',
    hubAnnouncements: 'Announcements',
    hubFaqs: 'FAQ Repository',
    hubSettings: 'Centre Configuration',
    hubAuditLogs: 'Immutable Audit Log',
    revealPiiBtn: 'Reveal Masked PII (Audit Logged)',
    maskPiiNotice: 'Sensitive fields masked in accordance with Privacy & Consular Records Protocol.',
    softDeleteBtn: 'Soft Delete',
    restoreBtn: 'Restore Record',
    permanentDeleteBtn: 'Permanently Delete'
  },
  ar: {
    centreTitle: 'مركز الاستشارات وتسهيل التأشيرات الثنائية',
    centreSubtitle: 'الاستشارات الاستراتيجية وتسهيل توثيق التأشيرات لحركة السفر بين العراق والصين',
    positioningStatement: 'إرشادات موثقة ومتوافقة ومحدثة لمعاملات التأشيرات بين العراق والصين. نخدم رجال الأعمال والطلبة والوفود والعائلات.',
    independenceDisclaimer: 'مركز الاستشارات وتسهيل التأشيرات الثنائية هو خدمة استشارية وتوثيقية مستقلة يديرها المعهد الصيني للدراسات الاستراتيجية والاقتصادية. المركز ليس سلطة لإصدار التأشيرات، حيث تصدر كافة قرارات التأشيرات حصرياً من قبل حكومة جمهورية الصين الشعبية أو حكومة جمهورية العراق. يقتصر دورنا على تقديم المشورة، وتجهيز الوثائق، وتسهيل حجز المواعيد.',
    disclaimerShort: 'خدمة استشارية وتوثيقية مستقلة — المركز ليس جهة إصدار تأشيرات. قرارات التأشيرة سيادية حصراً.',
    nonIssuingAuthorityNotice: 'إشعار رسمي: المركز والمعهد لا يصدران التأشيرات. نحن نقدم الاستشارات النظامية والتدقيق وتسهيل الإجراءات.',

    navHome: 'الرئيسية',
    navAbout: 'عن المركز',
    navServices: 'دليل الخدمات',
    navVisaTypes: 'أنواع التأشيرات',
    navRequirements: 'منشئ قوائم المتطلبات',
    navFees: 'جداول الرسوم',
    navProcess: 'مخطط الإجراءات',
    navAppointments: 'المواعيد القنصلية',
    navApply: 'طلب خدمة',
    navTrack: 'تتبع المعاملة',
    navNews: 'تحديثات السياسات',
    navFaq: 'الأسئلة الشائعة',
    navContact: 'اتصل بنا',
    navDisclaimer: 'إخلاء المسؤولية',

    dirIraqToChina: 'العراق ← الصين (التأشيرات الصينية)',
    dirChinaToIraq: 'الصين ← العراق (التأشيرات العراقية)',
    dirBoth: 'ثنائي (كلا الاتجاهين)',

    requestServiceBtn: 'طلب خدمة استشارية وتسهيل',
    bookAppointmentBtn: 'حجز موعد قنصلي',
    trackStatusBtn: 'تتبع حالة المعاملة',
    viewChecklistBtn: 'إنشاء قائمة المتطلبات',
    downloadPdfBtn: 'تصدير كملف PDF رسمي',
    printDossierBtn: 'طباعة قائمة المستندات',
    submitApplicationBtn: 'إرسال طلب المعاملة',
    searchPlaceholder: 'ابحث في أنواع التأشيرات والخدمات والشروط...',
    filterAll: 'كافة التصنيفات',

    heroTitle: 'استشارات متخصصة وتسهيل معاملات السفر الثنائي بين العراق والصين',
    heroBadge: 'المعهد الصيني للدراسات الاستراتيجية والاقتصادية',
    servicesTitle: 'خدمات التسهيل والاستشارة',
    servicesSubtitle: 'خدمات موثوقة ذات معايير دولية للمسافرين الأفراد والشركات والوفود',
    typesTitle: 'الدليل المرجعي لتصنيفات التأشيرات',
    typesSubtitle: 'المعلومات المعتمدة للتأشيرات الصينية والعراقية',
    processTitle: 'خطوات الإجراءات الميسرة',
    processSubtitle: 'من التدقيق المبدئي للأوراق حتى استلام الجواز والتأشيرة',
    trackerTitle: 'التتبع الآمن للمعاملة',
    trackerSubtitle: 'تحقق من حالة ملفك برقم المرجع القنصلي',
    announcementsTitle: 'الأخبار القنصلية وتحديثات القوانين',
    faqsTitle: 'الأسئلة الشائعة',

    fullName: 'الاسم الكامل كما هو مدون في جواز السفر',
    nationality: 'الجنسية',
    dob: 'تاريخ الميلاد',
    gender: 'الجنس',
    passportNumber: 'رقم جواز السفر',
    passportExpiry: 'تاريخ انتهاء صلاحية الجواز',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف (مع الرمز الدولي)',
    address: 'عنوان الإقامة / مقر العمل الحالي',
    travelPurpose: 'الغرض التفصيلي من السفر',
    travelerCount: 'عدد المسافرين',
    intendedDate: 'تاريخ السفر المتوقع',
    consentCheckbox: 'أقر بأن المركز جهة استشارية وتوثيقية مستقلة وأوافق على معالجة البيانات وفق سياسة الخصوصية الصارمة.',
    referenceId: 'الرقم المرجعي للمعاملة',
    enterReferenceId: 'مثال: VC-2026-481920',
    enterLastNameOrEmail: 'أدخل البريد الإلكتروني المسجل أو اللقب/اسم العائلة',

    statusReceived: 'تم استلام الطلب',
    statusInReview: 'الملف قيد المراجعة والتدقيق',
    statusAwaitingDocs: 'بانتظار استكمال وثائق إضافية',
    statusSubmitted: 'تم التقديم للقنصلية / القناة الدبلوماسية',
    statusAptBooked: 'تم تأكيد موعد البصمة الحيوية',
    statusDecisionPending: 'بانتظار القرار القنصلي الرسمي',
    statusApproved: 'تمت الموافقة / التأشيرة جاهزة',
    statusRefused: 'رفض قنصلي',
    statusClosed: 'معاملة مكتملة ومغلقة',

    hubTitle: 'مركز التحكم الإداري لمركز التأشيرات',
    hubOverview: 'نظرة عامة ومؤشرات الأداء',
    hubVisaTypes: 'تصنيفات التأشيرات',
    hubServices: 'دليل الخدمات',
    hubApplications: 'ملفات المعاملات',
    hubApplicants: 'سجل المتقدمين (حماية البيانات)',
    hubDocuments: 'تدقيق المستندات',
    hubAppointments: 'جدول المواعيد',
    hubFees: 'إصدارات الرسوم',
    hubRequirements: 'مصفوفة المتطلبات',
    hubAnnouncements: 'الإعلانات الرسمية',
    hubFaqs: 'بنك الأسئلة الشائعة',
    hubSettings: 'إعدادات المركز',
    hubAuditLogs: 'سجل التدقيق والرقابة غير القابل للتعديل',
    revealPiiBtn: 'إظهار البيانات الحساسة (مسجل رقابياً)',
    maskPiiNotice: 'البيانات الشخصية الحساسة مشفرة ومحجوبة وفق بروتوكول حماية السجلات القنصلية.',
    softDeleteBtn: 'حذف مؤقت',
    restoreBtn: 'استرجاع السجل',
    permanentDeleteBtn: 'حذف نهائي'
  },
  zh: {
    centreTitle: '双边签证咨询与代办中心',
    centreSubtitle: '中伊人员往来与跨境流动战略咨询与文书协助机构',
    positioningStatement: '为中伊两国公民及机构提供官方规范、合规透明且最新的签证政策指引，竭诚服务企业高管、留学生、公务代表团及跨境家庭。',
    independenceDisclaimer: '双边签证咨询与代办中心是由中国战略与经济研究所运营的独立咨询与文档协助机构。本中心并非签证签发官方机构。所有签证审批裁决均由中华人民共和国政府或伊拉克共和国政府全权做出。本中心服务严格限于政策咨询、申请材料预审与协助预约。',
    disclaimerShort: '独立政策咨询与材料代办机构 — 非官方签证签发机关，所有裁决权属两国主权政府。',
    nonIssuingAuthorityNotice: '官方严正声明：本中心与研究所均无权签发签证，仅提供政策法规合规辅导、材料格式预审与预约代办服务。',

    navHome: '首页',
    navAbout: '中心简介',
    navServices: '服务目录',
    navVisaTypes: '签证类型库',
    navRequirements: '材料清单生成器',
    navFees: '规费标准',
    navProcess: '办理流程图',
    navAppointments: '领事预约',
    navApply: '提交服务申请',
    navTrack: '进度查询',
    navNews: '领事动态',
    navFaq: '常见问题',
    navContact: '联络方式',
    navDisclaimer: '独立声明',

    dirIraqToChina: '伊拉克 → 中国（赴华签证）',
    dirChinaToIraq: '中国 → 伊拉克（赴伊签证）',
    dirBoth: '双边往来（双向通道）',

    requestServiceBtn: '申办专业顾问与代办服务',
    bookAppointmentBtn: '预约使领馆席位',
    trackStatusBtn: '查询办理进度',
    viewChecklistBtn: '生成个性化材料清单',
    downloadPdfBtn: '导出官方PDF指南',
    printDossierBtn: '打印申办卷宗清单',
    submitApplicationBtn: '提交签证服务申请卷宗',
    searchPlaceholder: '检索签证类别、服务项、申办材料...',
    filterAll: '全部类别',

    heroTitle: '专业签证咨询与中伊双向出行合规协助平台',
    heroBadge: '中国战略与经济研究所 (CISES)',
    servicesTitle: '签证代办与综合咨询服务',
    servicesSubtitle: '遵循国际领事标准的专业个人与企业团队一站式解决方案',
    typesTitle: '中伊双边签证全门类知识库',
    typesSubtitle: '中华人民共和国与伊拉克共和国法定出入境签证类别官方解读',
    processTitle: '全流程规范化代办步骤',
    processSubtitle: '从前置卷宗合规预审到护照安全取回',
    trackerTitle: '安全加密签证进度追踪系统',
    trackerSubtitle: '使用您的专属受理流水号查询审核节点',
    announcementsTitle: '官方领事公告与政策速递',
    faqsTitle: '常见问题解答与政策释疑',

    fullName: '申请人法定姓名（同护照）',
    nationality: '国籍',
    dob: '出生日期',
    gender: '性别',
    passportNumber: '护照号码',
    passportExpiry: '护照有效期截止日',
    email: '电子邮箱',
    phone: '联系电话（含国际区号）',
    address: '当前常住地址 / 企业办公地址',
    travelPurpose: '详细赴华/赴伊出行事由',
    travelerCount: '同行人数',
    intendedDate: '拟定出行日期',
    consentCheckbox: '本人充分知晓本中心为独立咨询机构并自愿同意在严格隐私协议下处理本卷宗数据。',
    referenceId: '服务受理编号 (Reference ID)',
    enterReferenceId: '例如：VC-2026-481920',
    enterLastNameOrEmail: '输入登记的电子邮箱或姓氏拼音/官方英文名',

    statusReceived: '申请已受理',
    statusInReview: '卷宗合规预审中',
    statusAwaitingDocs: '等待补充相关证明材料',
    statusSubmitted: '已报送驻外使领馆/内政外交通道',
    statusAptBooked: '指纹生物采集与面签预约已确认',
    statusDecisionPending: '领事审批核准中',
    statusApproved: '签证已批准/已可领取',
    statusRefused: '领事拒签',
    statusClosed: '案卷结案归档',

    hubTitle: '签证中心管理总枢纽',
    hubOverview: '运营概览与核心效能指标',
    hubVisaTypes: '签证类型库维护',
    hubServices: '咨询服务项目管理',
    hubApplications: '申请案卷管理',
    hubApplicants: '申请人名册（个人隐私保护）',
    hubDocuments: '文档审核台',
    hubAppointments: '预约排期看板',
    hubFees: '规费版本管理',
    hubRequirements: '材料清单规则库',
    hubAnnouncements: '领事政策公告管理',
    hubFaqs: 'FAQ知识库管理',
    hubSettings: '中心全局配置',
    hubAuditLogs: '不可篡改审计日志',
    revealPiiBtn: '查看敏感数据（已记录审计日志）',
    maskPiiNotice: '依据个人数据保护与领事档案规范，敏感身份标识默认加密掩码。',
    softDeleteBtn: '移入回收站（软删除）',
    restoreBtn: '恢复记录',
    permanentDeleteBtn: '永久删除'
  },
  ckb: {
    centreTitle: 'ناوەندی ڕاوێژکاری و ئاسانکاریی ڤیزای دوولایەنە',
    centreSubtitle: 'ڕاوێژکاری ستراتیژی و ئاسانکاری بەڵگەنامە بۆ هاتوچۆی نێوان عێراق و چین',
    positioningStatement: 'ڕێنمایی بەڵگەدار، یاسایی و نوێکراوە بۆ داواکارییەکانی ڤیزای عێراق و چین. خزمەتگوزاری بۆ بازرگانان، خوێندکاران، شاندەکان و خێزانەکان.',
    independenceDisclaimer: 'ناوەندی ڕاوێژکاری و ئاسانکاریی ڤیزای دوولایەنە خزمەتگوزارییەکی ڕاوێژکاریی سەربەخۆیە لەلایەن پەیمانگای چینی بۆ لێکۆڵینەوەی ستراتیژی و ئابووری. ئەم ناوەندە دەسەڵاتی دەرکردنی ڤیزا نییە. تەواوی بڕیارەکانی ڤیزا تەنها لەلایەن حکومەتی کۆماری گەلی چین یان حکومەتی کۆماری عێراقەوە دەدرێن. ڕۆڵی ئێمە تەنها بریتییە لە ڕاوێژکاری، ئامادەکردنی بەڵگەنامە و ئاسانکاری بۆ کاتی چاوپێکەوتن.',
    disclaimerShort: 'خزمەتگوزاری ڕاوێژکاری سەربەخۆ — ئەم ناوەندە دەسەڵاتی دەرکردنی ڤیزای نییە و بڕیار لای لایەنە فەرمییەکانە.',
    nonIssuingAuthorityNotice: 'ئاگاداری فەرمی: ناوەند و پەیمانگا ڤیزا دەرناکەن. تەنها ڕاوێژکاری یاسایی و پشکنینی بەڵگەنامە و ئاسانکاری پێشکەش دەکەن.',

    navHome: 'سەرەتا',
    navAbout: 'دەربارەی ناوەند',
    navServices: 'خزمەتگوزارییەکان',
    navVisaTypes: 'جۆرەکانی ڤیزا',
    navRequirements: 'دروستکەری لیستی بەڵگەنامە',
    navFees: 'خشتەی کرێیەکان',
    navProcess: 'هەنگاوەکانی مامەڵە',
    navAppointments: 'چاوپێکەوتنەکان',
    navApply: 'داواکردنی خزمەتگوزاری',
    navTrack: 'بەدواداچوونی مامەڵە',
    navNews: 'هەواڵ و ڕێنمایی نوێ',
    navFaq: 'پرسیارە باوەکان',
    navContact: 'پەیوەندی',
    navDisclaimer: 'ڕوونکردنەوەی یاسایی',

    dirIraqToChina: 'عێراق ← چین (ڤیزای چین)',
    dirChinaToIraq: 'چین ← عێراق (ڤیزای عێراق)',
    dirBoth: 'دوولایەنە (هەردوو ئاراستە)',

    requestServiceBtn: 'داواکردنی خزمەتگوزاری و ئاسانکاری',
    bookAppointmentBtn: 'دیاریکردنی کاتی کۆنسوڵگەری',
    trackStatusBtn: 'بەدواداچوونی دۆخی مامەڵە',
    viewChecklistBtn: 'دروستکردنی لیستی بەڵگەنامەکان',
    downloadPdfBtn: 'داگرتن وەک PDF فەرمی',
    printDossierBtn: 'چاپکردنی لیستی دۆسیە',
    submitApplicationBtn: 'ناردنی دۆسیەی داواکاری',
    searchPlaceholder: 'گەڕان لە جۆرەکانی ڤیزا و خزمەتگوزارییەکان...',
    filterAll: 'هەموو بەشەکان',

    heroTitle: 'ڕاوێژکاری پسپۆڕانە و ئاسانکاری گەشت لەنێوان عێراق و چین',
    heroBadge: 'پەیمانگای چینی بۆ لێکۆڵینەوەی ستراتیژی و ئابووری',
    servicesTitle: 'خزمەتگوزارییەکانی ئاسانکاری و ڕاوێژکاری',
    servicesSubtitle: 'خزمەتگوزاری بەپێی ستانداردە نێودەوڵەتییەکان بۆ تاک و کۆمپانیاکان',
    typesTitle: 'ڕێبەری گشتگیری جۆرەکانی ڤیزا',
    typesSubtitle: 'زانیاری فەرمی لەسەر پۆلێنکردنی ڤیزای چین و عێراق',
    processTitle: 'قۆناغەکانی ئەنجامدانی مامەڵە',
    processSubtitle: 'لە سەرەتای پشکنینی بەڵگەنامەکانەوە تا وەرگرتنەوەی پاسپۆرت',
    trackerTitle: 'بەدواداچوونی پارێزراوی مامەڵە',
    trackerSubtitle: 'بە ژمارەی تایبەتی مامەڵەکەت دۆخەکەی بپشکنە',
    announcementsTitle: 'ئاگاداری و بڕیارە نوێیەکانی کۆنسوڵگەری',
    faqsTitle: 'پرسیار و وەڵامە باوەکان',

    fullName: 'ناوی تەواو (وەک لە پاسپۆرتدا هاتووە)',
    nationality: 'ڕەگەزنامە',
    dob: 'بەرواری لەدایکبوون',
    gender: 'ڕەگەز',
    passportNumber: 'ژمارەی پاسپۆرت',
    passportExpiry: 'بەرواری بەسەرچوونی پاسپۆرت',
    email: 'ئیمەیڵ',
    phone: 'ژمارەی مۆبایل (لەگەڵ کۆدی وڵات)',
    address: 'ناونیشانی نیشتەجێبوون یان شوێنی کار',
    travelPurpose: 'مەبەستی وردی گەشت',
    travelerCount: 'ژمارەی گەشتیاران',
    intendedDate: 'بەرواری چاوەڕوانکراوی گەشت',
    consentCheckbox: 'ئاگادارم کە ئەم ناوەندە سەربەخۆیە و ڕازیم بە بەکارهێنانی زانیارییەکان بەپێی یاسای پاراستنی نهێنی.',
    referenceId: 'ژمارەی تایبەتی مامەڵە (Reference ID)',
    enterReferenceId: 'نموونە: VC-2026-481920',
    enterLastNameOrEmail: 'ئیمەیڵی تۆمارکراو یان پاشناو/ناوی خێزان بنووسە',

    statusReceived: 'داواکاری وەرگیراوە',
    statusInReview: 'پشکنینی بەڵگەنامەکان دەکرێت',
    statusAwaitingDocs: 'چاوەڕوانی بەڵگەنامەی زیاترە',
    statusSubmitted: 'ڕادەستی کۆنسوڵگەری / باڵیۆزخانە کراوە',
    statusAptBooked: 'کاتی پەنجەمۆر دیاریکراوە',
    statusDecisionPending: 'چاوەڕوانی بڕیاری کۆنسوڵگەرییە',
    statusApproved: 'ڕەزامەندی درا / ڤیزا ئامادەیە',
    statusRefused: 'ڕەتکردنەوەی کۆنسوڵگەری',
    statusClosed: 'مامەڵە تەواو و داخراوە',

    hubTitle: 'ژووری کۆنتڕۆڵی ناوەندی ڤیزا',
    hubOverview: 'پوختەی کارەکان و پێوەرە سەرەکییەکان',
    hubVisaTypes: 'بەڕێوەبردنی جۆرەکانی ڤیزا',
    hubServices: 'لیستی خزمەتگوزارییەکان',
    hubApplications: 'دۆسیەی داواکارییەکان',
    hubApplicants: 'تۆماری داواکاران (پاراستنی زانیاری کەسی)',
    hubDocuments: 'پشکنینی بەڵگەنامەکان',
    hubAppointments: 'خشتەی چاوپێکەوتنەکان',
    hubFees: 'وەشانەکانی کرێ',
    hubRequirements: 'مەرج و بەڵگەنامەکان',
    hubAnnouncements: 'ئاگادارییە فەرمییەکان',
    hubFaqs: 'پرسیارە باوەکان',
    hubSettings: 'ڕێکخستنە گشتییەکان',
    hubAuditLogs: 'تۆماری چاودێری دەستکارینەکراو',
    revealPiiBtn: 'پیشاندانی زانیارییە شاراوەکان (تۆمار دەکرێت)',
    maskPiiNotice: 'زانیارییە هەستیارەکان بەپێی یاسای پاراستنی نهێنی شاردراونەتەوە.',
    softDeleteBtn: 'سڕینەوەی کاتی',
    restoreBtn: 'گەڕاندنەوەی تۆمار',
    permanentDeleteBtn: 'سڕینەوەی یەکجاری'
  }
};

export function useVisaCentreI18n(lang: Locale = 'en') {
  const dictionary = VISA_CENTRE_I18N[lang] || VISA_CENTRE_I18N.en;
  return {
    vt: (key: keyof VisaCentreDictionary) => dictionary[key] || VISA_CENTRE_I18N.en[key] || '',
    dict: dictionary
  };
}
