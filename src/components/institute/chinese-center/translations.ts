import { Locale } from '../../../types';

export interface ChineseCenterStrings {
  // Breadcrumbs
  breadcrumbIca: string;
  breadcrumbInstitute: string;
  breadcrumbChineseCentre: string;

  // Hero
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroPillStandard: string;
  heroPillTesting: string;
  heroPillCert: string;

  // HSK Levels Grid
  hskHeading: string;
  hskSubheading: string;
  hskCumulativeWords: string;
  hskTargetHours: string;
  hskPrerequisite: string;
  hskPrereqNone: string;
  hskViewCourse: string;
  hskBandElementary: string;
  hskBandIntermediate: string;
  hskBandAdvanced: string;

  // Supplementary Tracks
  suppHeading: string;
  suppSubheading: string;
  suppLearnMore: string;
  suppHskkElemDesc: string;
  suppHskkInterDesc: string;
  suppHskkAdvDesc: string;
  suppYctDesc: string;
  suppBusinessDesc: string;

  // Testing & Certification
  testingHeading: string;
  testingBody: string;
  testingRegisterCta: string;
  testingVerifyCta: string;
  testingOfficialBadge: string;
  testingNextDate: string;
  testingQrBadge: string;
  testingRetakeTitle: string;
  testingRetakeDesc: string;

  // Instructors
  instructorsHeading: string;
  instructorsSubheading: string;
  instructorsViewProfile: string;
  instructorsLanguagesLabel: string;
  instructorsLevelsLabel: string;

  // Upcoming Sessions
  sessionsHeading: string;
  sessionsSubheading: string;
  sessionsStartDate: string;
  sessionsSchedule: string;
  sessionsLocation: string;
  sessionsSpotsRemaining: string;
  sessionsEnrollCta: string;
  sessionsCampusSulaymaniyah: string;
  sessionsHybrid: string;

  // Testimonials
  testimonialsHeading: string;
  testimonialsSubheading: string;
  testimonialsVerifiedStudent: string;

  // FAQ
  faqHeading: string;
  faqSubheading: string;
  faqViewAll: string;
  faqQ1: string;
  faqA1: string;
  faqQ2: string;
  faqA2: string;
  faqQ3: string;
  faqA3: string;
  faqQ4: string;
  faqA4: string;
  faqQ5: string;
  faqA5: string;
  faqQ6: string;
  faqA6: string;

  // Enrollment CTA Band
  ctaBandHeadline: string;
  ctaBandSubheadline: string;
  ctaBandPrimary: string;
  ctaBandSecondary: string;

  // Subpage views
  modalClose: string;
  enrollTitle: string;
  enrollSubtitle: string;
  enrollNameLabel: string;
  enrollEmailLabel: string;
  enrollPhoneLabel: string;
  enrollLevelLabel: string;
  enrollSubmit: string;
  enrollSuccess: string;
  coursesTitle: string;
  coursesSubtitle: string;
  verifyTitle: string;
  verifySubtitle: string;
  verifyInputLabel: string;
  verifyButton: string;
  contactTitle: string;
  contactSubtitle: string;
  contactAddress: string;
  contactEmail: string;
  contactPhone: string;
}

export const ccTranslations: Record<Locale, ChineseCenterStrings> = {
  en: {
    breadcrumbIca: 'ICA',
    breadcrumbInstitute: 'Institute',
    breadcrumbChineseCentre: 'Chinese Centre',

    heroEyebrow: 'Chinese Language Tutoring · Sulaymaniyah',
    heroHeadline: 'Chinese Centre',
    heroSubheadline: "Sulaymaniyah's first internationally aligned Chinese language centre. Standard HSK curriculum, native instructors, and verifiable certification.",
    heroPrimaryCta: 'Enroll Now',
    heroSecondaryCta: 'View Courses',
    heroPillStandard: 'HSK 3.0 Standard Curriculum',
    heroPillTesting: 'Authorized Testing Centre',
    heroPillCert: 'Verifiable Certification',

    hskHeading: 'HSK Levels',
    hskSubheading: 'Comprehensive curriculum aligned with the new HSK 3.0 international Chinese proficiency standards.',
    hskCumulativeWords: 'Cumulative Words',
    hskTargetHours: 'Target Hours',
    hskPrerequisite: 'Prerequisite',
    hskPrereqNone: 'None',
    hskViewCourse: 'View course',
    hskBandElementary: 'Elementary',
    hskBandIntermediate: 'Intermediate',
    hskBandAdvanced: 'Advanced',

    suppHeading: 'Supplementary Tracks',
    suppSubheading: 'Specialized language curricula targeting conversational fluency, youth education, and bilateral commerce.',
    suppLearnMore: 'Learn more',
    suppHskkElemDesc: 'Focuses on everyday spoken expressions and fundamental conversational syntax for basic interaction.',
    suppHskkInterDesc: 'Builds spontaneous conversational capability for social, business, and academic exchanges.',
    suppHskkAdvDesc: 'High-level oral proficiency for professional presentations, negotiations, and multilateral meetings.',
    suppYctDesc: 'Engaging interactive curriculum tailored for primary and secondary youth learners aged 6 to 15.',
    suppBusinessDesc: 'Practical vocabulary and diplomatic etiquette for cross-border trade, joint ventures, and contracts.',

    testingHeading: 'Testing & Certification',
    testingBody: 'The Chinese Centre operates as an official authorized test center for HSK, HSKK, and YCT certifications. Computer-based and paper-based test sessions are administered quarterly under standardized invigilation protocols. Official score reports are authenticated via the Ministry of Education China credentials verification portal, with full retake and score improvement provisions.',
    testingRegisterCta: 'Register for Test',
    testingVerifyCta: 'Verify a Certificate',
    testingOfficialBadge: 'Authorized Examination Centre',
    testingNextDate: 'Next Session: Nov 15, 2026',
    testingQrBadge: 'Anti-Counterfeit QR & ID',
    testingRetakeTitle: 'Retake & Resit Policy',
    testingRetakeDesc: 'Unrestricted retake windows with personalized diagnostic score breakdown after each exam sitting.',

    instructorsHeading: 'Our Instructors',
    instructorsSubheading: 'Certified native educators and bilingual language specialists with extensive pedagogy experience.',
    instructorsViewProfile: 'View profile',
    instructorsLanguagesLabel: 'Languages',
    instructorsLevelsLabel: 'Levels Taught',

    sessionsHeading: 'Upcoming Sessions',
    sessionsSubheading: 'Enroll in upcoming cohort schedules with weekday evening and weekend options.',
    sessionsStartDate: 'Start date',
    sessionsSchedule: 'Schedule',
    sessionsLocation: 'Location',
    sessionsSpotsRemaining: 'Spots remaining',
    sessionsEnrollCta: 'Enroll',
    sessionsCampusSulaymaniyah: 'Sulaymaniyah Campus',
    sessionsHybrid: 'In-Person / Hybrid',

    testimonialsHeading: 'What Our Students Say',
    testimonialsSubheading: 'Success stories from professionals, university scholars, and corporate delegates.',
    testimonialsVerifiedStudent: 'Verified CISE Graduate',

    faqHeading: 'Frequently Asked Questions',
    faqSubheading: 'Everything you need to know about enrollment, HSK proficiency bands, and official testing.',
    faqViewAll: 'View all FAQs',
    faqQ1: 'What is HSK?',
    faqA1: 'HSK (Hanyu Shuiping Kaoshi) is the standardized international Chinese proficiency exam organized by the Center for Language Education and Cooperation. It assesses Chinese communicative ability for non-native speakers across academic and professional contexts worldwide.',
    faqQ2: 'How long does it take to reach HSK 3?',
    faqA2: 'Most adult students with no prior knowledge reach HSK 3 within 6 to 9 months of regular study (approx. 240 structured hours). Our cohort system blends classroom instruction with audio lab practice to accelerate communicative confidence.',
    faqQ3: 'Do I need prior Chinese experience?',
    faqA3: 'No prior background is required. HSK 1 begins with foundational Pinyin phonetics, tones, basic character stroke orders, and high-frequency everyday greetings. We offer placement assessments for students with previous experience.',
    faqQ4: 'Are classes taught in Arabic, Kurdish, or English?',
    faqA4: 'Instructors utilize English, Arabic, and Kurdish for foundational explanations in beginner levels (HSK 1–2). As learners advance to HSK 3 and above, classes transition into immersive Chinese instruction supported by native specialists.',
    faqQ5: 'How do I register for the HSK test?',
    faqA5: 'Registration can be completed directly through our testing portal or in person at our Sulaymaniyah administrative desk. Applicants must submit a valid passport copy, a digital portrait, and examination fees 30 days prior to the official test date.',
    faqQ6: 'Can I get a certificate without taking the test?',
    faqA6: 'Course completion certificates can be granted upon fulfilling attendance and internal evaluation criteria. However, official HSK credentials recognized by Chinese universities and embassies require sitting for the authorized standardized examination.',

    ctaBandHeadline: 'Start your Chinese language journey today.',
    ctaBandSubheadline: "Enroll in Sulaymaniyah's first internationally aligned Chinese language centre.",
    ctaBandPrimary: 'Enroll Now',
    ctaBandSecondary: 'Contact Us',

    modalClose: 'Close',
    enrollTitle: 'Student Enrollment Application',
    enrollSubtitle: 'Secure your place in the upcoming cohort at the CISE Chinese Centre in Sulaymaniyah.',
    enrollNameLabel: 'Full Legal Name',
    enrollEmailLabel: 'Email Address',
    enrollPhoneLabel: 'Phone Number (WhatsApp)',
    enrollLevelLabel: 'Desired Track / Level',
    enrollSubmit: 'Submit Enrollment Application',
    enrollSuccess: 'Thank you! Your enrollment request has been submitted. Our admissions advisor will contact you within 24 hours.',
    coursesTitle: 'Chinese Centre Curriculum & Syllabus',
    coursesSubtitle: 'Standardized HSK 1–6, HSK 7–9, HSKK oral proficiency, and corporate business programs.',
    verifyTitle: 'Certificate Authenticity Verification',
    verifySubtitle: 'Instant cryptographic verification of credentials issued by CISE Chinese Centre.',
    verifyInputLabel: 'Enter Certificate Reference (e.g. CISE-HSK-2026-0841)',
    verifyButton: 'Verify Authenticity',
    contactTitle: 'Chinese Centre Advisory & Campus Desk',
    contactSubtitle: 'Visit our Sulaymaniyah campus or speak with an academic advisor regarding customized training.',
    contactAddress: 'Salim Street, CISE Tower, 4th Floor, Sulaymaniyah, Kurdistan Region, Iraq',
    contactEmail: 'chinese.centre@iraq-china-agency.org',
    contactPhone: '+964 770 123 4567'
  },

  ar: {
    breadcrumbIca: 'الوكالة العراقية الصينية',
    breadcrumbInstitute: 'المعهد',
    breadcrumbChineseCentre: 'المركز الصيني',

    heroEyebrow: 'تعليم اللغة الصينية · السليمانية',
    heroHeadline: 'المركز الصيني',
    heroSubheadline: 'أول مركز لتعليم اللغة الصينية في السليمانية يتوافق مع المعايير الدولية. منهج HSK القياسي، مدرّسون أصليون، وشهادات قابلة للتحقق.',
    heroPrimaryCta: 'سجّل الآن',
    heroSecondaryCta: 'عرض الدورات',
    heroPillStandard: 'منهج HSK 3.0 المعياري',
    heroPillTesting: 'مركز اختبارات معتمد',
    heroPillCert: 'شهادات معتمدة وقابلة للتحقق',

    hskHeading: 'مستويات HSK',
    hskSubheading: 'منهج دراسي شامل متوافق مع معايير HSK 3.0 الدولية الجديدة لقياس كفاءة اللغة الصينية.',
    hskCumulativeWords: 'الكلمات التراكمية',
    hskTargetHours: 'الساعات المستهدفة',
    hskPrerequisite: 'المتطلب السابق',
    hskPrereqNone: 'لا يوجد',
    hskViewCourse: 'عرض الدورة',
    hskBandElementary: 'مبتدئ',
    hskBandIntermediate: 'متوسط',
    hskBandAdvanced: 'متقدم',

    suppHeading: 'المسارات التكميلية',
    suppSubheading: 'مناهج لغوية متخصصة تستهدف طلاقة المحادثة، والناشئين، والتجارة الثنائية بين العراق والصين.',
    suppLearnMore: 'اعرف المزيد',
    suppHskkElemDesc: 'يركز على التعبيرات المنطوقة اليومية وتراكيب المحادثة الأساسية للتفاعل الحياتي اليومي.',
    suppHskkInterDesc: 'يبني قدرة المحادثة التلقائية للمناسبات الاجتماعية والأكاديمية والتجارية المشتركة.',
    suppHskkAdvDesc: 'كفاءة شفوية متقدمة للعروض التقديمية المهنية، والتفاوض الاقتصادي، والاجتماعات متعددة الأطراف.',
    suppYctDesc: 'منهج تفاعلي مشوّق مصمم لطلاب المدارس الابتدائية والثانوية من سن 6 إلى 15 عامًا.',
    suppBusinessDesc: 'مصطلحات عملية وآداب بروتوكولية للتجارة عبر الحدود، والمشاريع المشتركة، وصياغة العقود التجارية.',

    testingHeading: 'الاختبارات والشهادات',
    testingBody: 'يعمل المركز الصيني كمركز اختبار معتمد ورسمي لشهادات HSK و HSKK و YCT. تُعقد جلسات الاختبارات المحوسبة والورقية فصليًا وفق معايير مراقبة دولية صارمة. يتم التحقق من صحة تقارير الدرجات الرسمية عبر بوابة التحقق التابعة لوزارة التعليم الصينية، مع توفير خيارات إعادة الاختبار وتحسين الدرجات.',
    testingRegisterCta: 'سجّل للاختبار',
    testingVerifyCta: 'تحقق من شهادة',
    testingOfficialBadge: 'مركز اختبارات رسمي معتمد',
    testingNextDate: 'الجلسة القادمة: 15 تشرين الثاني 2026',
    testingQrBadge: 'رمز استعلام رسمي موثق',
    testingRetakeTitle: 'سياسة إعادة الاختبار',
    testingRetakeDesc: 'فترات إعادة غير مقيدة مع تحليل تشخيصي تفصيلي للدرجات بعد كل جلسة اختبار.',

    instructorsHeading: 'مدرّسونا',
    instructorsSubheading: 'معلمون أصليون معتمدون ومتخصصون ثنائيو اللغة يتمتعون بخبرة تعليمية واسعة.',
    instructorsViewProfile: 'عرض الملف الشخصي',
    instructorsLanguagesLabel: 'اللغات',
    instructorsLevelsLabel: 'المستويات التدريسية',

    sessionsHeading: 'الجلسات القادمة',
    sessionsSubheading: 'سجّل في مواعيد الدورات القادمة مع خيارات مسائية خلال أيام الأسبوع ونهاية الأسبوع.',
    sessionsStartDate: 'تاريخ البدء',
    sessionsSchedule: 'الجدول',
    sessionsLocation: 'الموقع',
    sessionsSpotsRemaining: 'المقاعد المتبقية',
    sessionsEnrollCta: 'سجّل',
    sessionsCampusSulaymaniyah: 'مقر السليمانية',
    sessionsHybrid: 'حضوري / مدمج',

    testimonialsHeading: 'ماذا يقول طلابنا',
    testimonialsSubheading: 'قصص نجاح من المهنيين والأكاديميين والوفود التجارية والدارسين المتميزين.',
    testimonialsVerifiedStudent: 'خريج معتمد من المركز',

    faqHeading: 'الأسئلة الشائعة',
    faqSubheading: 'كل ما تحتاج لمعرفته حول التسجيل، ومستويات كفاءة HSK، والاختبارات الرسمية.',
    faqViewAll: 'عرض جميع الأسئلة الشائعة',
    faqQ1: 'ما هو اختبار HSK؟',
    faqA1: 'اختبار HSK (اختبار الكفاءة في اللغة الصينية) هو الاختبار الدولي الموحد المعتمد عالميًا لتقييم الكفاءة اللغوية لغير الناطقين بها في المجالات الأكاديمية والمهنية بإشراف وزارة التعليم الصينية.',
    faqQ2: 'كم من الوقت يستغرق الوصول إلى مستوى HSK 3؟',
    faqA2: 'يصل معظم الطلاب البالغين المبتدئين إلى مستوى HSK 3 خلال 6 إلى 9 أشهر من الدراسة المنتظمة (نحو 240 ساعة تدريسية). يجمع نظامنا بين التدريس الصفي ومختبرات الاستماع لتسريع الطلاقة.',
    faqQ3: 'هل أحتاج إلى خبرة سابقة في اللغة الصينية؟',
    faqA3: 'لا يُشترط وجود أي معرفة سابقة. يبدأ مستوى HSK 1 بالصوتيات الأساسية ونظام بينيين، ونغمات الصوت، وقواعد كتابة المقاطع الصينية. نوفر اختبارات تحديد مستوى للطلاب ذوي الخبرة السابقة.',
    faqQ4: 'هل تُدرّس الحصص باللغة العربية أم الكردية أم الإنجليزية؟',
    faqA4: 'يستخدم المعلمون اللغات العربية والكردية والإنجليزية للشروحات التأسيسية في المستويات الأولى (HSK 1–2). ومع تقدم الطلاب إلى HSK 3 فما فوق، تتحول الدروس إلى تعليم تفاعلي صيني كامل.',
    faqQ5: 'كيف أسجل لاختبار HSK الرسمي؟',
    faqA5: 'يمكن إتمام التسجيل مباشرة عبر بوابة الاختبارات بموقعنا أو حضوريًا في مكتب الاستقبال بالسليمانية، مع تقديم نسخة جواز السفر والصورة الرقمية وسداد الرسوم قبل 30 يومًا من موعد الاختبار.',
    faqQ6: 'هل يمكنني الحصول على شهادة دون خوض الاختبار؟',
    faqA6: 'تمنح شهادات إتمام الدورات التدريبية بناءً على نسبة الحضور والتقييمات الصفية المستمرة. أما الشهادات الرسمية المعتمدة لدى الجامعات والسفارات الصينية فتتطلب اجتياز الاختبار المعياري الدولي.',

    ctaBandHeadline: 'ابدأ رحلتك في تعلم اللغة الصينية اليوم.',
    ctaBandSubheadline: 'سجّل في أول مركز لتعليم اللغة الصينية في السليمانية متوافق مع المعايير الدولية.',
    ctaBandPrimary: 'سجّل الآن',
    ctaBandSecondary: 'اتصل بنا',

    modalClose: 'إغلاق',
    enrollTitle: 'طلب تسجيل طالب جديد',
    enrollSubtitle: 'احجز مقعدك في الدورة القادمة لدى المركز الصيني بمعهد CISE في السليمانية.',
    enrollNameLabel: 'الاسم القانوني الكامل',
    enrollEmailLabel: 'البريد الإلكتروني',
    enrollPhoneLabel: 'رقم الهاتف (واتساب)',
    enrollLevelLabel: 'المسار أو المستوى المطلوب',
    enrollSubmit: 'إرسال طلب التسجيل',
    enrollSuccess: 'شكرًا لك! تم استلام طلب التسجيل بنجاح. سيتواصل معك المستشار الأكاديمي خلال 24 ساعة.',
    coursesTitle: 'دليل الدورات والمناهج التعليمية',
    coursesSubtitle: 'مناهج HSK 1–6 القياسية، و HSK 7–9 المتقدم، ومحادثة HSKK، وبرامج الصينية للأعمال.',
    verifyTitle: 'التحقق من صحة الشهادات',
    verifySubtitle: 'خدمة التحقق الرقمي الفوري للشهادات الصادرة عن المركز الصيني بمعهد CISE.',
    verifyInputLabel: 'أدخل الرقم المرجعي للشهادة (مثال: CISE-HSK-2026-0841)',
    verifyButton: 'تحقق من الموثوقية',
    contactTitle: 'مكتب الاستشارات والتواصل بالمركز الصيني',
    contactSubtitle: 'تفضل بزيارة مقرنا في السليمانية أو تواصل مع مستشارينا لتصميم برامج تدريبية خاصة.',
    contactAddress: 'شارع سالم، برج معهد CISE، الطابق الرابع، السليمانية، إقليم كردستان، العراق',
    contactEmail: 'chinese.centre@iraq-china-agency.org',
    contactPhone: '+964 770 123 4567'
  },

  zh: {
    breadcrumbIca: '伊中通讯社',
    breadcrumbInstitute: '研究院',
    breadcrumbChineseCentre: '中国中心',

    heroEyebrow: '中文教学 · 苏莱曼尼亚',
    heroHeadline: '中国中心',
    heroSubheadline: '苏莱曼尼亚首个与国际标准接轨的中文教学中心。标准HSK课程、母语教师、可验证证书。',
    heroPrimaryCta: '立即报名',
    heroSecondaryCta: '查看课程',
    heroPillStandard: '新HSK 3.0标准课程',
    heroPillTesting: '官方指定认证考点',
    heroPillCert: '防伪可验正规资质',

    hskHeading: 'HSK等级',
    hskSubheading: '对接新HSK 3.0国际中文教育标准的全面课程体系与水平进阶指南。',
    hskCumulativeWords: '累计词汇',
    hskTargetHours: '目标课时',
    hskPrerequisite: '先修课程',
    hskPrereqNone: '无',
    hskViewCourse: '查看课程',
    hskBandElementary: '初级',
    hskBandIntermediate: '中级',
    hskBandAdvanced: '高级',

    suppHeading: '补充课程',
    suppSubheading: '专为口语流利度、少儿学习者及双边商贸量身定制的专业拓展方向。',
    suppLearnMore: '了解更多',
    suppHskkElemDesc: '专注于日常生活口头表达技能与基础交际句式的熟练运用。',
    suppHskkInterDesc: '培养在社交聚会、商贸交往与学术语境下的自如对话能力。',
    suppHskkAdvDesc: '针对专业学术报告、经贸商务谈判及跨国多边会议的高阶演说水平。',
    suppYctDesc: '专为6至15岁中小学生量身设计的沉浸式趣味中文启蒙与进阶课程。',
    suppBusinessDesc: '涵盖跨境贸易谈判实务、合资企业管理及经贸法律合同的商务中文专业训练。',

    testingHeading: '考试与认证',
    testingBody: '中国中心经官方授权组织HSK、HSKK及YCT全系列中文等级考试。考点每季度提供机考与纸笔考试，严格执行国家标准化考务规范。所有成绩报告与等级证书均可通过中国教育部官方认证通道查验，并支持重考与成绩提升申请。',
    testingRegisterCta: '报名考试',
    testingVerifyCta: '验证证书',
    testingOfficialBadge: '官方授权考试中心',
    testingNextDate: '下期考期：2026年11月15日',
    testingQrBadge: '官方防伪查验与二维码',
    testingRetakeTitle: '重考与刷分机制',
    testingRetakeDesc: '不限次考期报考，每次考后提供专属诊断式分项成绩分析报告。',

    instructorsHeading: '我们的教师',
    instructorsSubheading: '持有国际中文教师资格证的母语名师与资深双语教学专家团队。',
    instructorsViewProfile: '查看简介',
    instructorsLanguagesLabel: '教学语言',
    instructorsLevelsLabel: '主讲等级',

    sessionsHeading: '即将开始的课程',
    sessionsSubheading: '选择适合您的班期，提供工作日晚间及周末沉浸式小班课程。',
    sessionsStartDate: '开始日期',
    sessionsSchedule: '时间安排',
    sessionsLocation: '地点',
    sessionsSpotsRemaining: '剩余名额',
    sessionsEnrollCta: '报名',
    sessionsCampusSulaymaniyah: '苏莱曼尼亚校区',
    sessionsHybrid: '线下授课 / 混合模式',

    testimonialsHeading: '学员反馈',
    testimonialsSubheading: '来自商界精英、大学学者及经贸团组学员的真实学习体验与成功见证。',
    testimonialsVerifiedStudent: '认证毕业学员',

    faqHeading: '常见问题',
    faqSubheading: '关于中文课程注册、HSK水平等级分界及官方考务安排的详尽指南。',
    faqViewAll: '查看全部常见问题',
    faqQ1: '什么是HSK？',
    faqA1: 'HSK（汉语水平考试）是由中国教育部中外语言交流合作中心主办的国际标准化中文能力测评体系，重点考查非第一语言考生在日常生活、学习及工作中运用中文进行交际的能力。',
    faqQ2: '达到HSK 3级需要多长时间？',
    faqA2: '零基础成人学员在保持每周正规课时的情况下，通常需要6至9个月（约240标准学时）达到HSK 3级水平。我们采用小班精讲与语音实验室强化结合的方式加速提升。',
    faqQ3: '零基础可以报名参加吗？',
    faqA3: '无需任何中文基础。HSK 1级从拼音发音、声调规则、基础笔顺及高频问候语系统讲起。已有一定基础的学员可参加入学测评以精准分班。',
    faqQ4: '课堂采用什么语言进行辅助教学？',
    faqA4: '初级阶段（HSK 1–2）教师结合英语、阿拉伯语或库尔德语进行重点语法解释。自HSK 3级开始逐步过渡为母语教师主导的全中文沉浸式课堂。',
    faqQ5: '如何报名参加官方HSK考试？',
    faqA5: '学员可直接在我们的中心官方报考系统提交申请，或前往苏莱曼尼亚校区前台办理。考生需在考试日前30天提交有效护照复印件、证件照电子版并完成缴费。',
    faqQ6: '不参加统一考试能否获得结业证书？',
    faqA6: '出勤达标并通过阶段内部考核的学员可获得中心颁发的课时结业证书。但若用于申请中国大学奖学金或企业资质认证，必须参加统一组织的正式考试并获得官方成绩报告。',

    ctaBandHeadline: '今天开始您的中文学习之旅。',
    ctaBandSubheadline: '报名参加苏莱曼尼亚首个与国际标准接轨的中文教学中心。',
    ctaBandPrimary: '立即报名',
    ctaBandSecondary: '联系我们',

    modalClose: '关闭',
    enrollTitle: '新学员报名申请',
    enrollSubtitle: '预订苏莱曼尼亚CISE中国中心最新开班学额。',
    enrollNameLabel: '法定全名',
    enrollEmailLabel: '电子邮箱',
    enrollPhoneLabel: '联系电话 (WhatsApp)',
    enrollLevelLabel: '意向课程 / 级别',
    enrollSubmit: '提交报名申请',
    enrollSuccess: '感谢您的申请！我们已收到您的报名意向，课程顾问将在24小时内与您联系。',
    coursesTitle: '中心全线课程与教学大纲',
    coursesSubtitle: '涵盖标准HSK 1–6级、高阶HSK 7–9级、HSKK口语能力及定制商务中文项目。',
    verifyTitle: '证书防伪真伪查验',
    verifySubtitle: '快速查验苏莱曼尼亚中国中心所颁发教学资质与考试证书真实性。',
    verifyInputLabel: '输入证书编号（例如：CISE-HSK-2026-0841）',
    verifyButton: '验证真伪',
    contactTitle: '中国中心教学咨询与校区联络',
    contactSubtitle: '欢迎亲临苏莱曼尼亚中心校区或预约定制企业语言培训方案。',
    contactAddress: '伊拉克库尔德自治区苏莱曼尼亚萨利姆街CISE大厦4层',
    contactEmail: 'chinese.centre@iraq-china-agency.org',
    contactPhone: '+964 770 123 4567'
  },

  ckb: {
    breadcrumbIca: 'ئاژانسی عێراقی-چینی',
    breadcrumbInstitute: 'پەیمانگا',
    breadcrumbChineseCentre: 'ناوەندی چینی',

    heroEyebrow: 'فێرکردنی زمانی چینی · سلێمانی',
    heroHeadline: 'ناوەندی چینی',
    heroSubheadline: 'یەکەم ناوەندی فێرکردنی زمانی چینی لە سلێمانی کە لەگەڵ پێوەرە نێودەوڵەتییەکان دەگونجێت. پرۆگرامی HSK ی ستاندارد، مامۆستای ڕەسەن، و بڕوانامەی پشتڕاستکراوە.',
    heroPrimaryCta: 'ئێستا تۆمار بکە',
    heroSecondaryCta: 'کۆرسەکان ببینە',
    heroPillStandard: 'پرۆگرامی ستانداردی HSK 3.0',
    heroPillTesting: 'سەنتەری تاقیکردنەوەی باوەڕپێکراو',
    heroPillCert: 'بڕوانامەی یاسایی و پشتڕاستکراو',

    hskHeading: 'ئاستەکانی HSK',
    hskSubheading: 'پرۆگرامێکی گشتگیر کە لەگەڵ پێوەرە نێودەوڵەتییە نوێیەکانی HSK 3.0 بۆ لێهاتوویی زمانی چینی دەگونجێت.',
    hskCumulativeWords: 'کۆی وشە',
    hskTargetHours: 'کاتژمێرە ئامانج',
    hskPrerequisite: 'پێشەکی',
    hskPrereqNone: 'هیچ',
    hskViewCourse: 'کۆرس ببینە',
    hskBandElementary: 'سەرەتایی',
    hskBandIntermediate: 'ناوەند',
    hskBandAdvanced: 'پێشکەوتوو',

    suppHeading: 'ڕێڕەوە پڕکەرەوەکان',
    suppSubheading: 'ڕێڕەوی زمانی تایبەتمەند بۆ لێهاتوویی قسەکردن، فێرخوازانی گەنج، و بازرگانی دوولایەنەی عێراق و چین.',
    suppLearnMore: 'زیاتر بزانە',
    suppHskkElemDesc: 'سەرنج دەخاتە سەر دەربڕینە ڕۆژانەکان و ڕێزمانی سەرەتایی قسەکردن بۆ پەیوەندی ڕۆژانە.',
    suppHskkInterDesc: 'توانای گفتوگۆی خۆبەخۆ بۆ ئاڵوگۆڕی کۆمەڵایەتی، بازرگانی و ئەکادیمی بنیاد دەنێت.',
    suppHskkAdvDesc: 'شارەزایی زارەکی ئاست بەرز بۆ پێشکەشکردنی پیشەیی، دانوستاندن و کۆبوونەوە فرەلایەنەکان.',
    suppYctDesc: 'پرۆگرامێکی سەرنجڕاکێش و کارلێککار کە بۆ قوتابیانی تەمەن 6 بۆ 15 ساڵ ئامادەکراوە.',
    suppBusinessDesc: 'زاراوەی کرداری و ئیتیکێتی دیپلۆماسی بۆ بازرگانی نێودەوڵەتی، پڕۆژە هاوبەشەکان و گرێبەستەکان.',

    testingHeading: 'تاقیکردنەوە و بڕوانامە',
    testingBody: 'ناوەندی چینی وەک سەنتەرێکی فەرمی باوەڕپێکراوی تاقیکردنەوە بۆ بڕوانامەکانی HSK و HSKK و YCT کاردەکات. دانیشتنەکانی تاقیکردنەوەی ئەلیکترۆنی و سەر کاغەز لەسەر بنەمای پێوەرە توندەکانی چاودێری نێودەوڵەتی بەڕێوەدەچن. بڕوانامە و ڕاپۆرتی نمرە فەرمییەکان لە ڕێگەی دەروازەی وەزارەتی پەروەردەی چین پشتڕاست دەکرێنەوە، لەگەڵ دەرفەتی دووبارەکردنەوەی تاقیکردنەوە.',
    testingRegisterCta: 'تۆمارکردن بۆ تاقیکردنەوە',
    testingVerifyCta: 'بڕوانامە پشتڕاست بکەرەوە',
    testingOfficialBadge: 'سەنتەری تاقیکردنەوەی فەرمی',
    testingNextDate: 'دانیشتنی داهاتوو: 15ی تشرینی دووەمی 2026',
    testingQrBadge: 'کۆدی QR و ناسنامەی فەرمی',
    testingRetakeTitle: 'یاسای دووبارەکردنەوەی تاقیکردنەوە',
    testingRetakeDesc: 'دەرفەتی بێسنووری دووبارەکردنەوە لەگەڵ ڕاپۆرتی شیکاری نمرەکان دوای هەر تاقیکردنەوەیەک.',

    instructorsHeading: 'مامۆستاکانمان',
    instructorsSubheading: 'مامۆستای ڕەسەنی بڕوانامەدار و پسپۆڕی زمانی دووزمانە بە ئەزموونی دەوڵەمەندی وانەوتنەوە.',
    instructorsViewProfile: 'پرۆفایل ببینە',
    instructorsLanguagesLabel: 'زمانەکان',
    instructorsLevelsLabel: 'ئاستەکان',

    sessionsHeading: 'دانیشتنەکانی داهاتوو',
    sessionsSubheading: 'ناوت تۆمار بکە لە خولی داهاتوودا بە بژاردەکانی ئێوارانی ڕۆژانی هەفتە و کۆتایی هەفتە.',
    sessionsStartDate: 'ڕێکەوتی دەستپێکردن',
    sessionsSchedule: 'خشتە',
    sessionsLocation: 'شوێن',
    sessionsSpotsRemaining: 'شوێنی ماوە',
    sessionsEnrollCta: 'تۆمارکردن',
    sessionsCampusSulaymaniyah: 'کەمپی سلێمانی',
    sessionsHybrid: 'ئامادەبوون / تێکەڵ',

    testimonialsHeading: 'قوتابیانمان چی دەڵێن',
    testimonialsSubheading: 'چیرۆکی سەرکەوتن لە پیشەگەران، زانایانی زانکۆ و شاندی کۆمپانیاکانەوە.',
    testimonialsVerifiedStudent: 'دەرچووی باوەڕپێکراوی ناوەند',

    faqHeading: 'پرسیارە باوەکان',
    faqSubheading: 'هەموو ئەو زانیارییانەی پێویستتن لەسەر ناونووسین، ئاستەکانی لێهاتوویی HSK و تاقیکردنەوە فەرمییەکان.',
    faqViewAll: 'بینینی هەموو پرسیارە باوەکان',
    faqQ1: 'تاقیکردنەوەی HSK چییە؟',
    faqA1: 'تاقیکردنەوەی HSK (تاقیکردنەوەی لێهاتوویی زمانی چینی) تاقیکردنەوەیەکی ستانداردی نێودەوڵەتییە بۆ هەڵسەنگاندنی توانای پەیوەندیکردنی زمانی چینی بۆ کەسانی بیانی لە بوارە ئەکادیمی و پیشەییەکان لەسەر ئاستی جیهان.',
    faqQ2: 'چەند کاتی دەوێت بۆ گەیشتن بە ئاستی HSK 3؟',
    faqA2: 'زۆربەی قوتابیانی پێگەیشتووی سەرەتایی لە ماوەی 6 بۆ 9 مانگی خوێندنی بەردەوامدا (نزیکەی 240 کاتژمێری فێرکاری) دەگەنە HSK 3. سیستەمەکەمان وانەی پۆل و تاقیگەی دەنگ تێکەڵ دەکات بۆ خێراکردنی متمانەی قسەکردن.',
    faqQ3: 'ئایا پێویستم بە ئەزموونی پێشووی زمانی چینی هەیە؟',
    faqA3: 'هیچ پێشینەیەک پێویست نییە. ئاستی HSK 1 لە فۆنێتیکی پینین، تۆنەکان، شێوازی نووسینی پیتە سەرەتاییەکان و سڵاوکردنی ڕۆژانەوە دەست پێدەکات. بۆ فێرخوازانی پێشوو تاقیکردنەوەی دیاریکردنی ئاست دابین دەکرێت.',
    faqQ4: 'ئایا وانەکان بە عەرەبی، کوردی، یان ئینگلیزی دەوترێنەوە؟',
    faqA4: 'مامۆستایان لە ئاستە سەرەتاییەکاندا (HSK 1–2) زمانی کوردی، عەرەبی و ئینگلیزی بۆ ڕوونکردنەوەی بنەڕەتی بەکاردەهێنن. کاتێک فێرخوازان دەگەنە HSK 3 و بەرەو سەرەوە، وانەکان دەبنە فێرکردنی تەواوی چینی لەلایەن مامۆستای ڕەسەنەوە.',
    faqQ5: 'چۆن ناوم بۆ تاقیکردنەوەی فەرمی HSK تۆمار بکەم؟',
    faqA5: 'تۆمارکردن دەتوانرێت ڕاستەوخۆ لە ڕێگەی دەروازەی تاقیکردنەوەکانمان یان بە شێوەی ئامادەبوون لە بەڕێوەبەرایەتی سلێمانی ئەنجام بدرێت، بە پێشکەشکردنی کۆپی پاسپۆرت و وێنەی دیجیتاڵی و پارەی تاقیکردنەوە 30 ڕۆژ پێش وادەکە.',
    faqQ6: 'ئایا دەتوانم بڕوانامە وەربگرم بێ ئەنجامدانی تاقیکردنەوە؟',
    faqA6: 'بڕوانامەی تەواوکردنی کۆرس بەپێی ئامادەبوون و هەڵسەنگاندنی ناوخۆیی دەبەخشرێت. بەڵام بڕوانامەی فەرمی HSK کە لەلایەن زانکۆ و باڵیۆزخانەکانی چینەوە دانپێدانراوە، پێویستی بە بەشداریکردنە لە تاقیکردنەوە ستانداردە فەرمییەکەدا.',

    ctaBandHeadline: 'ئەمڕۆ گەشتەکەت بۆ فێربوونی زمانی چینی دەست پێبکە.',
    ctaBandSubheadline: 'تۆمار بکە لە یەکەم ناوەندی فێرکردنی زمانی چینی لە سلێمانی کە لەگەڵ پێوەرە نێودەوڵەتییەکان دەگونجێت.',
    ctaBandPrimary: 'ئێستا تۆمار بکە',
    ctaBandSecondary: 'پەیوەندی بە ئێمەوە',

    modalClose: 'داخستن',
    enrollTitle: 'داواکاری تۆمارکردنی قوتابی نوێ',
    enrollSubtitle: 'شوێنی خۆت لە خولی داهاتووی ناوەندی چینی CISE لە سلێمانی دابین بکە.',
    enrollNameLabel: 'ناوی تەواوی یاسایی',
    enrollEmailLabel: 'ئیمەیڵ',
    enrollPhoneLabel: 'ژمارەی مۆبایل (واتسئەپ)',
    enrollLevelLabel: 'ئاست یان کۆرسی داواکراو',
    enrollSubmit: 'ناردنی داواکاری ناونووسین',
    enrollSuccess: 'سوپاس! داواکاری ناونووسینەکەت گەیشت. ڕاوێژکاری ئەکادیمیمان لە ماوەی 24 کاتژمێردا پەیوەندیت پێوە دەکات.',
    coursesTitle: 'پرۆگرامی خوێندن و پلانی وانەکانی ناوەندی چینی',
    coursesSubtitle: 'پرۆگرامی ستانداردی HSK 1–6 و HSK 7–9 و لێهاتوویی زارەکی HSKK و کۆرسەکانی زمانی بازرگانی.',
    verifyTitle: 'پشتڕاستکردنەوەی دروستی بڕوانامەکان',
    verifySubtitle: 'پشکنینی دیجیتاڵی دەستبەجێ بۆ ئەو بڕوانامانەی کە لەلایەن ناوەندی چینی CISE دەرکراون.',
    verifyInputLabel: 'ژمارەی بڕوانامە بنووسە (بۆ نموونە: CISE-HSK-2026-0841)',
    verifyButton: 'پشتڕاستکردنەوە',
    contactTitle: 'پەیوەندی و ڕاوێژکاری ناوەندی چینی لە سلێمانی',
    contactSubtitle: 'سەردانی کەمپەکەمان بکە لە سلێمانی یان قسە لەگەڵ ڕاوێژکاری ئەکادیمی بکە دەربارەی خولی تایبەت.',
    contactAddress: 'شەقامی سالم، تاوەری پەیمانگای CISE، نهۆمی 4، سلێمانی، هەرێمی کوردستان، عێراق',
    contactEmail: 'chinese.centre@iraq-china-agency.org',
    contactPhone: '+964 770 123 4567'
  }
};
