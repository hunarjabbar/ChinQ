import { 
  VisaCategory, 
  VisaService, 
  VisaRequirement, 
  VisaFee, 
  VisaAnnouncement, 
  VisaFaq,
  VisaCentreSettings
} from '../types/visaCentre';

export const INITIAL_VISA_CATEGORIES: VisaCategory[] = [
  // China Categories for Iraqi applicants
  {
    id: 'vc-cn-m',
    slug: 'china-m',
    direction: 'iraq-to-china',
    category: 'M',
    officialName: {
      en: 'M Visa — Commercial & Trade Activities',
      ar: 'تأشيرة M — الأنشطة التجارية والتجارية الدولية',
      zh: 'M字签证 — 商业贸易活动',
      ckb: 'ڤیزای M — چالاکییە بازرگانییەکان'
    },
    shortDescription: {
      en: 'Issued to Iraqi business executives, merchants, and trade delegates invited to China for commercial negotiations, exhibitions, and procurement.',
      ar: 'تصدر لرجال الأعمال والتجار العراقيين المدعوين للصين لإجراء مفاوضات تجارية والمشاركة بالمعارض وعمليات التوريد.',
      zh: '发给赴华进行商业、贸易活动的伊拉克商务人士及经贸代表团。',
      ckb: 'دەدرێت بە بازرگانان و شاندە بازرگانییەکانی عێراق بۆ دانوستان و بەشداریکردن لە پێشانگاکاندا.'
    },
    whoItIsFor: {
      en: 'Iraqi importers, factory equipment purchasers, Canton Fair visitors, and bilateral corporate partners.',
      ar: 'المستوردون العراقيون، ومشتري معدات المصانع، وزوار معرض كانتون الدولي، والشركاء التجاريون.',
      zh: '伊拉克采购商、广交会客商、工业设备采购人员及双边贸易企业代表。',
      ckb: 'هاوردەکارانی عێراق، کڕیارانی کەلوپەلی پیشەسازی، بەشداربووانی پێشانگای کانتۆن.'
    },
    validityOptions: ['3 months single entry', '6 months double entry', '12 months multiple entry (eligibility criteria apply)'],
    maxStayDays: 60,
    processingTimeStandard: '4 working days',
    processingTimeExpress: '2-3 working days',
    governmentFeeNote: {
      en: 'Official consulate consular fee payable at Chinese Visa Application Service Centre / Consulate General in Erbil or Embassy in Baghdad.',
      ar: 'رسوم قنصلية رسمية تُدفع في مركز تقديم التأشيرات أو القنصلية العامة الصينية بأربيل أو السفارة ببغداد.',
      zh: '官方领事规费需在驻埃尔比勒总领馆或驻巴格达使馆签证申请中心直接缴纳。',
      ckb: 'کرێی فەرمی کۆنسوڵگەری لە کاتی پێشکەشکردن لە کۆنسوڵگەری چین لە هەولێر یان بەغدا دەدرێت.'
    },
    centerServiceFee: {
      en: 'Documentation review & advisory: $65 USD (equivalent in IQD)',
      ar: 'مراجعة وتدقيق الوثائق والاستشارة: 65 دولار أمريكي (أو ما يعادلها بالدينار العراقي)',
      zh: '材料预审与合规辅导费：65美元（等值伊拉克第纳尔）',
      ckb: 'پشکنینی بەڵگەنامە و ڕاوێژکاری: 65 دۆلار (یان هاوتای بە دینار)'
    },
    requirements: ['Official Invitation Letter (TE or PU letter or approved corporate invitation)', 'Valid Iraqi Passport (min 6 months validity)', 'Chamber of Commerce registration proof', 'Bank statement (past 6 months)'],
    processSteps: {
      en: [
        'Dossier compliance review with Institute advisory team',
        'Official Chinese online visa application form completion (COVA)',
        'Biometric appointment scheduling at Consulate General in Erbil or Embassy in Baghdad',
        'In-person submission and biometric enrollment',
        'Passport collection and bilateral logistics confirmation'
      ],
      ar: [
        'مراجعة وتدقيق ملف الأوراق مع فريق الاستشارات بالمعهد',
        'ملء استمارة التأشيرة الصينية الإلكترونية الرسمية (COVA)',
        'تحديد موعد البصمات والمقابلة بالقنصلية العامة في أربيل أو السفارة في بغداد',
        'تسليم الجواز والبصمات الحيوية شخصياً',
        'استلام الجواز والتأشيرة وتأكيد ترتيبات السفر'
      ],
      zh: [
        '研究所顾问团队进行申请材料合规与完整性预审',
        '协助填写中国官方在线签证申请表（COVA系统）',
        '预约中国驻埃尔比勒总领馆或驻巴格达使馆生物识别面签席位',
        '申请人亲自前往递交护照及采集生物指纹',
        '领取签证护照并获取行前双边商贸出行指引'
      ],
      ckb: [
        'پشکنینی وردی بەڵگەنامەکان لەگەڵ تیمی پسپۆڕی پەیمانگا',
        'پڕکردنەوەی فۆڕمی ئەلیکترۆنی فەرمی باڵیۆزخانەی چین (COVA)',
        'دیاریکردنی کاتی چاوپێکەوتن و پەنجەمۆر لە کۆنسوڵگەری چین لە هەولێر',
        'ئامادەبوونی کەسی بۆ وەرگرتنی پەنجەمۆر و ڕادەستکردنی پاسپۆرت',
        'وەرگرتنەوەی پاسپۆرت و پەسەندکردنی گەشت'
      ]
    },
    authoritativeSourceUrl: 'http://erbil.china-consulate.gov.cn/',
    lastVerifiedAt: '2026-09-15T10:00:00Z',
    status: 'published'
  },
  {
    id: 'vc-cn-l',
    slug: 'china-l',
    direction: 'iraq-to-china',
    category: 'L',
    officialName: {
      en: 'L Visa — Tourism & Sightseeing',
      ar: 'تأشيرة L — السياحة وزيارة المعالم',
      zh: 'L字签证 — 旅游观光',
      ckb: 'ڤیزای L — گەشتیاری و سەردان'
    },
    shortDescription: {
      en: 'Issued to Iraqi citizens traveling to China for independent or group tourism and leisure travel.',
      ar: 'تصدر للمواطنين العراقيين الراغبين بالسياحة الفردية أو الجماعية في المدن والمعالم الصينية.',
      zh: '发给赴华旅游观光、探亲访友的伊拉克公民。',
      ckb: 'دەدرێت بە هاوڵاتیانی عێراق کە بە مەبەستی گەشتیاری و سەردان دەچنە چین.'
    },
    whoItIsFor: {
      en: 'Independent travelers, holiday families, cultural visitors, and accredited tour delegations.',
      ar: 'المسافرون المستقلون، والعائلات، والمهتمون بالثقافة الصينية، والوفود السياحية المنظمة.',
      zh: '个人旅游者、家庭度假群体、文化参访者及正规旅行团成员。',
      ckb: 'گەشتیارانی سەربەخۆ، خێزانەکان و گروپە گەشتیارییە مۆڵەتپێدراوەکان.'
    },
    validityOptions: ['3 months single entry', '3 months double entry'],
    maxStayDays: 30,
    processingTimeStandard: '4 working days',
    processingTimeExpress: '2-3 working days',
    governmentFeeNote: {
      en: 'Standard consular fee charged according to official bilateral reciprocity schedules.',
      ar: 'رسوم قنصلية وفق جداول المعاملة بالمثل الثنائية الرسمية.',
      zh: '依据双边对等官方规费标准收取。',
      ckb: 'کرێی کۆنسوڵگەری بەپێی ڕێنماییە فەرمییەکان دیاریدەکرێت.'
    },
    centerServiceFee: {
      en: 'Itinerary review, hotel/flight validation & dossier verification: $50 USD',
      ar: 'تدقيق خط السير، وتأكيدات الطيران والفندق، ومراجعة الملف: 50 دولار أمريكي',
      zh: '行程规划复核、机票酒店订单及申请卷宗审验费：50美元',
      ckb: 'پشکنینی هێڵی گەشت و هۆتێل و فڕۆکە و ئامادەکردنی دۆسیە: 50 دۆلار'
    },
    requirements: ['Round-trip flight ticket reservation', 'Hotel booking voucher for the duration of stay', 'Detailed travel itinerary in China', 'Proof of financial solvency (Bank statement)'],
    processSteps: {
      en: [
        'Verification of travel itinerary and accommodation confirmations',
        'COVA form completion and biometric photo verification',
        'Consulate appointment reservation',
        'Submission and biometric capture at consular desk',
        'Visa verification and dispatch'
      ],
      ar: [
        'التأكد من حجوزات الطيران والفنادق ومسار الرحلة',
        'تعبئة استمارة COVA وتدقيق مطابقة الصورة للمواصفات الصينية',
        'حجز موعد التقديم القنصلي',
        'حضور الموعد وتقديم الأوراق والبصمة الحيوية',
        'استلام التأشيرة والتحقق من صحتها'
      ],
      zh: [
        '核验赴华行程安排及全程酒店机票预订单',
        '完成COVA在线填表并校验符合领事标准的生物照片',
        '预约领馆现场递交材料席位',
        '前往总领馆采集指纹并完成受理',
        '取证核验并接收出行关怀指南'
      ],
      ckb: [
        'پشتڕاستکردنەوەی بلیت و هۆتێل و پلانەکانی گەشت',
        'پڕکردنەوەی فۆڕمی فەرمی COVA و وێنەی ستاندارد',
        'حجزکردنی کاتی چاوپێکەوتن لە کۆنسوڵگەری',
        'پێشکەشکردنی بەڵگەنامەکان و پەنجەمۆر لە کۆنسوڵگەری',
        'وەرگرتنەوەی ڤیزا و دڵنیابوونەوە لە ڕێنماییەکان'
      ]
    },
    authoritativeSourceUrl: 'http://erbil.china-consulate.gov.cn/',
    lastVerifiedAt: '2026-09-15T10:00:00Z',
    status: 'published'
  },
  {
    id: 'vc-cn-f',
    slug: 'china-f',
    direction: 'iraq-to-china',
    category: 'F',
    officialName: {
      en: 'F Visa — Academic, Cultural & Scientific Exchange',
      ar: 'تأشيرة F — التبادل الأكاديمي والثقافي والبحثي',
      zh: 'F字签证 — 交流、访问与考察',
      ckb: 'ڤیزای F — ئاڵوگۆڕی ئەکادیمی و زانستی و کولتووری'
    },
    shortDescription: {
      en: 'Issued to Iraqi scholars, researchers, non-commercial delegates, and cultural figures invited for non-commercial exchange.',
      ar: 'تصدر للأكاديميين والباحثين والمثقفين العراقيين والوفود غير التجارية المدعوة لبرامج التبادل.',
      zh: '发给赴华从事学术考察、文化教育交流及非商业性访问的学者和代表。',
      ckb: 'دەدرێت بە مامۆستایان، توێژەران و شاندە زانستییەکان بۆ سەردانی نا-بازرگانی.'
    },
    whoItIsFor: {
      en: 'University professors, think-tank fellows, scientific researchers, artistic and sports delegations.',
      ar: 'أساتذة الجامعات، وزملاء مراكز الدراسات، والباحثون العلميون، والوفود الثقافية والرياضية.',
      zh: '高校教授、智库研究员、科研人员以及文化体育交流团代表。',
      ckb: 'مامۆستایانی زانکۆ، توێژەرانی سەنتەرەکانی ستراتیژی، وەرزشوانان و هونەرمەندان.'
    },
    validityOptions: ['3 months single entry', '6 months double entry'],
    maxStayDays: 90,
    processingTimeStandard: '4 working days',
    processingTimeExpress: '2-3 working days',
    governmentFeeNote: {
      en: 'Official consular fee as set by diplomatic protocol.',
      ar: 'رسوم قنصلية رسمية وفق البروتوكول الدبلوماسي.',
      zh: '按领事外交协定标准核定规费。',
      ckb: 'کرێی فەرمی کۆنسوڵگەری بەپێی پڕۆتۆکۆڵ دیاریدەکرێت.'
    },
    centerServiceFee: {
      en: 'Exchange protocol & institutional documentation advisory: $55 USD',
      ar: 'استشارة بروتوكول التبادل وتوثيق الدعوات المؤسسية: 55 دولار أمريكي',
      zh: '双边交流协议对审及机构公函规范服务：55美元',
      ckb: 'ڕاوێژکاری و ڕێکخستنی نووسراوی فەرمی دامەزراوەکان: 55 دۆلار'
    },
    requirements: ['Official Invitation Letter from Chinese university, institute, or government agency', 'Institutional affiliation letter from Iraqi employer/university', 'Academic or research plan summary'],
    processSteps: {
      en: [
        'Host institution letter review',
        'Official form preparation',
        'Consular submission coordination',
        'Visa collection'
      ],
      ar: [
        'تدقيق خطاب المؤسسة الصينية المضيفة',
        'إعداد الاستمارة الرسمية وترتيب المستندات',
        'تنسيق موعد الحضور القنصلي',
        'استلام التأشيرة'
      ],
      zh: [
        '中方邀请单位公函核验',
        '整理中阿双语官方卷宗',
        '协调总领馆递交与指纹采集',
        '领证与行前双边学术通联'
      ],
      ckb: [
        'پشکنینی نووسراوی زانکۆ یان سەنتەری میواندار لە چین',
        'ئامادەکردنی تەواوی بەڵگەنامە و فۆڕمەکان',
        'ڕێکخستنی کاتی چاوپێکەوتن',
        'وەرگرتنەوەی ڤیزا'
      ]
    },
    authoritativeSourceUrl: 'http://erbil.china-consulate.gov.cn/',
    lastVerifiedAt: '2026-09-15T10:00:00Z',
    status: 'published'
  },
  {
    id: 'vc-cn-z',
    slug: 'china-z',
    direction: 'iraq-to-china',
    category: 'Z',
    officialName: {
      en: 'Z Visa — Commercial Employment & Technical Work',
      ar: 'تأشيرة Z — العمل والتوظيف الرسمي في الصين',
      zh: 'Z字签证 — 工作与外籍雇佣',
      ckb: 'ڤیزای Z — کارکردنی فەرمی و پسپۆڕی'
    },
    shortDescription: {
      en: 'Issued to Iraqi engineers, language instructors, corporate executives, and specialists employed by entities in China.',
      ar: 'تصدر للمهندسين، والأساتذة، والمدراء التنفيذيين، والمختصين العراقيين المتعاقدين مع مؤسسات وشركات صينية.',
      zh: '发给受雇在中国境内合法企业或机构任职工作的伊拉克专业技术与管理人员。',
      ckb: 'دەدرێت بە ئەندازیاران و مامۆستایان و شارەزایانی عێراق کە گرێبەستی کاریان لەگەڵ کۆمپانیاکانی چین هەیە.'
    },
    whoItIsFor: {
      en: 'Expatriate engineers, petroleum specialists, corporate staff, and foreign experts with approved Chinese Work Permits.',
      ar: 'المهندسون، وخبراء النفط والطاقة، والموظفون المعتمدون الحاصلون على تصريح عمل رسمي صيني.',
      zh: '获得中国外国专家局与人社部门《外国人工作许可通知》的驻华专家与技术员工。',
      ckb: 'ئەندازیارانی نەوت و وزە و خاوەن مۆڵەتی فەرمی کار لە چین.'
    },
    validityOptions: ['3 months single entry (converts to Residence Permit within 30 days of arrival)'],
    maxStayDays: 30,
    processingTimeStandard: '4 working days',
    processingTimeExpress: '2-3 working days',
    governmentFeeNote: {
      en: 'Consular visa fee plus subsequent Chinese Public Security Bureau residence permit fee upon arrival.',
      ar: 'رسوم التأشيرة القنصلية، بالإضافة لرسوم إقامة العمل لاحقاً لدى مكتب الأمن العام الصيني بالصين.',
      zh: '领馆签证费及入境后30天内向中国公安局出入境管理支队申请居留许可规费。',
      ckb: 'کرێی کۆنسوڵگەری، لەگەڵ کرێی ئیقامەی کار دوای گەیشتن بە چین.'
    },
    centerServiceFee: {
      en: 'Work permit verification & comprehensive consular filing: $90 USD',
      ar: 'تدقيق إشعار تصريح العمل والملف الطبي والجنائي المعتمد: 90 دولار أمريكي',
      zh: '外国人工作许可通知验真、无犯罪及体检公证指导：90美元',
      ckb: 'پشکنینی مۆڵەتی فەرمی کار و بەڵگەنامەی تەندروستی: 90 دۆلار'
    },
    requirements: ['Notification Letter of Foreigner’s Work Permit in China', 'Original legalized criminal background record', 'Medical examination certificate from accredited hospital', 'Employment contract signed by both parties'],
    processSteps: {
      en: [
        'Validation of official Work Permit Notification QR and barcode',
        'Medical and legal attestation compliance check',
        'Consular application submission',
        'Pre-departure orientation on 30-day Residence Permit conversion in China'
      ],
      ar: [
        'التحقق من صحة إشعار تصريح العمل ورمز الاستجابة السريعة QR',
        'تدقيق التقارير الطبية ومصادقة عدم المحكومية',
        'حجز الموعد وتقديم المعاملة بالقنصلية',
        'إرشادات إلزامية لتحويل التأشيرة إلى إقامة عمل خلال 30 يوماً من الوصول'
      ],
      zh: [
        '核验国家外国专家局工作许可二维码验真系统',
        '出具无犯罪记录及中国出入境体检报告双认证指导',
        '完成驻埃尔比勒总领馆Z签证递交',
        '提供抵华后30天内完成公安局居留许可转换的合规指引'
      ],
      ckb: [
        'پشتڕاستکردنەوەی فەرمی کۆدی مۆڵەتی کار لە چین',
        'پشکنینی بەڵگەنامەی پزیشکی و بێ تاوانی پەسەندکراو',
        'پێشکەشکردنی داواکاری لە کۆنسوڵگەری',
        'ڕێنمایی گۆڕینی ڤیزا بۆ ئیقامە لە ماوەی 30 ڕۆژ لە چین'
      ]
    },
    authoritativeSourceUrl: 'http://erbil.china-consulate.gov.cn/',
    lastVerifiedAt: '2026-09-15T10:00:00Z',
    status: 'published'
  },
  {
    id: 'vc-cn-x1',
    slug: 'china-x1',
    direction: 'iraq-to-china',
    category: 'X1',
    officialName: {
      en: 'X1 Visa — Long-Term Academic Study (>180 Days)',
      ar: 'تأشيرة X1 — الدراسة الأكاديمية طويلة الأمد (أكثر من 180 يوماً)',
      zh: 'X1字签证 — 长期学术留学（180天以上）',
      ckb: 'ڤیزای X1 — خوێندنی درێژخایەن (زیاتر لە 180 ڕۆژ)'
    },
    shortDescription: {
      en: 'Issued to Iraqi students admitted for undergraduate, masters, doctoral, or long-term language study in China.',
      ar: 'تصدر للطلبة العراقيين المقبولين في برامج البكالوريوس والماجستير والدكتوراه ودراسة اللغة طويلة الأمد.',
      zh: '发给赴华接受学历学位教育或180天以上长期研修的伊拉克留学生。',
      ckb: 'دەدرێت بە خوێندکارانی بەکالۆریۆس، ماستەر، دکتۆرا لە زانکۆکانی چین.'
    },
    whoItIsFor: {
      en: 'Chinese Government Scholarship (CSC) recipients, university scholarship students, and self-funded scholars.',
      ar: 'الحاصلون على المنح الحكومية الصينية (CSC)، ومنح الجامعات، والطلبة الدارسون على حسابهم الخاص.',
      zh: '中国政府奖学金（CSC）获得者、高校直录国际生及自费学位研修生。',
      ckb: 'وەرگرانی سکۆلەرشیپی حکومەتی چین (CSC) و خوێندکارانی زانکۆکان.'
    },
    validityOptions: ['3 months single entry (converts to Student Residence Permit within 30 days of arrival)'],
    maxStayDays: 30,
    processingTimeStandard: '4 working days',
    processingTimeExpress: '2-3 working days',
    governmentFeeNote: {
      en: 'Consular visa fee; scholarship holders may receive official diplomatic fee waivers where bilateral accords apply.',
      ar: 'رسوم قنصلية؛ قد يُعفى طلبة المنح الحكومية المشمولين بالاتفاقيات الثنائية الرسمية.',
      zh: '按规费缴纳；享受双边协定全额奖学金生凭公函可享相应领事减免。',
      ckb: 'کرێی کۆنسوڵگەری؛ خوێندکارانی سکۆلەرشیپ ڕەنگە بەپێی ڕێککەوتن داشکاندن وەربگرن.'
    },
    centerServiceFee: {
      en: 'JW201/JW202 documentation verification & student dossier handling: $50 USD',
      ar: 'تدقيق استمارة JW201/JW202 الرسمية وتجهيز ملف الطالب: 50 دولار أمريكي',
      zh: 'JW201/JW202表系统校验及留学生行前合规档案：50美元',
      ckb: 'پشکنینی فۆڕمی JW201/JW202 و دۆسیەی خوێندکار: 50 دۆلار'
    },
    requirements: ['Original Admission Notice from Chinese University', 'Original Form JW201 or JW202 issued by Chinese Ministry of Education', 'Foreigner Physical Examination Record', 'Legalized highest academic degree and transcripts'],
    processSteps: {
      en: [
        'Verification of JW201/JW202 electronic record with Chinese Education Ministry portal',
        'Consular application form compilation',
        'Biometric appointment booking',
        'Consulate submission & visa issuance'
      ],
      ar: [
        'التحقق من صحة استمارة JW201/JW202 لدى وزارة التعليم الصينية',
        'إعداد وتدقيق الاستمارة القنصلية والمستندات التعليمية',
        'حجز موعد التقديم القنصلي والبصمة',
        'تقديم الأوراق واستلام التأشيرة'
      ],
      zh: [
        '中国教育部留学生录取JW表在线系统验真',
        '协助录入学生档案及学籍匹配资料',
        '预约领馆面签及指纹采集通道',
        '出签并提供中国大学入学及居留许可转换须知'
      ],
      ckb: [
        'پشتڕاستکردنەوەی فۆڕمی فەرمی خوێندنی باڵای چین',
        'ئامادەکردنی فۆڕم و بەڵگەنامە ئەکادیمییەکان',
        'دیاریکردنی کاتی چاوپێکەوتن لە کۆنسوڵگەری',
        'وەرگرتنی ڤیزا و ڕێنمایی گەیشتن بە زانکۆ'
      ]
    },
    authoritativeSourceUrl: 'http://erbil.china-consulate.gov.cn/',
    lastVerifiedAt: '2026-09-15T10:00:00Z',
    status: 'published'
  },

  // Iraq Categories for Chinese applicants
  {
    id: 'vc-iq-biz',
    slug: 'iraq-commercial',
    direction: 'china-to-iraq',
    category: 'Commercial',
    officialName: {
      en: 'Iraqi Commercial & Investment Visa',
      ar: 'تأشيرة العمل والتجارة والاستثمار في العراق',
      zh: '伊拉克商务与投资签证',
      ckb: 'ڤیزای بازرگانی و وەبەرهێنان لە عێراق'
    },
    shortDescription: {
      en: 'Issued to Chinese corporate leaders, contractors, engineers, and investors traveling to Iraq or Kurdistan Region for business.',
      ar: 'تصدر لمدراء الشركات والمقاولين والمهندسين والمستثمرين الصينيين القادمين للعراق وإقليم كوردستان.',
      zh: '发给赴伊拉克本土或伊拉克库尔德斯坦地区进行商贸合作、工程承包与投资的中国企业人员。',
      ckb: 'دەدرێت بە خاوەنکاران، ئەندازیاران و وەبەرهێنەرانی چین کە دێنە عێراق و هەرێمی کوردستان.'
    },
    whoItIsFor: {
      en: 'State-owned and private Chinese enterprises, BRI engineering contractors, trade delegations, and equipment suppliers.',
      ar: 'الشركات الصينية الحكومية والخاصة، ومقاولو مبادرة الحزام والطريق، وموردو المعدات الصناعية.',
      zh: '中国央企国企驻伊代表、一带一路基础设施工程承包商、商贸代表及技术设备供应商。',
      ckb: 'کۆمپانیاکانی چین، بەڵێندەرانی پڕۆژەکانی ڕێگای ئاوریشم، بازرگانان.'
    },
    validityOptions: ['3 months single entry', '6 months multiple entry', '12 months multiple entry'],
    maxStayDays: 90,
    processingTimeStandard: '7-10 working days',
    processingTimeExpress: '3-5 working days',
    governmentFeeNote: {
      en: 'Official Iraqi Ministry of Foreign Affairs & Ministry of Interior visa fees.',
      ar: 'رسوم وزارة الخارجية ووزارة الداخلية العراقية الرسمية.',
      zh: '伊拉克外交部及内政部官方核准规费。',
      ckb: 'کرێی فەرمی وەزارەتی دەرەوە و وەزارەتی ناوخۆی عێراق.'
    },
    centerServiceFee: {
      en: 'Bilingual documentation facilitation, chamber endorsement & clearance tracking: $85 USD',
      ar: 'تسهيل التوثيق الثنائي، وتصديق الغرف التجارية، ومتابعة الموافقات الأمنية: 85 دولار أمريكي',
      zh: '中阿双语公函审核、商会背书对审及内政部批文进度跟踪费：85美元',
      ckb: 'پشتڕاستکردنەوەی بەڵگەنامە و بەدواداچوونی ڕەزامەندی ئەمنی: 85 دۆلار'
    },
    requirements: ['Official Iraqi Ministry of Interior security clearance / approval letter', 'Valid Chinese passport (min 6 months validity)', 'Invitation letter from registered Iraqi or KRG company', 'Company registration certificate and tax clearance of the Iraqi sponsor'],
    processSteps: {
      en: [
        'Submission of Iraqi sponsor credentials and invitation letter',
        'Ministry of Interior security clearance coordination in Baghdad/Erbil',
        'Embassy/Consulate issuance or electronic approval letter confirmation',
        'Airport visa on arrival / entry clearance protocol verification'
      ],
      ar: [
        'تدقيق أوراق الشركة العراقية الداعية والسجل التجاري',
        'متابعة صدور الموافقة الأمنية من وزارة الداخلية في بغداد أو أربيل',
        'إصدار التأشيرة عبر السفارة العراقية ببكين أو خطاب الموافقة الإلكتروني',
        'تأكيد بروتوكول الوصول والاستقبال في مطارات بغداد أو أربيل أو البصرة'
      ],
      zh: [
        '核验伊拉克邀请方公司注册资质及商业邀请函',
        '协助向巴格达或埃尔比勒内政部提报安全准入核准',
        '由伊拉克驻华使馆签发实体签证或核发官方电子准签批文',
        '提供抵伊国际机场入境通关及安全接待指引'
      ],
      ckb: [
        'پشکنینی بەڵگەنامەی کۆمپانیای بانگهێشتکار لە عێراق',
        'بەدواداچوونی ڕەزامەندی ئەمنی لە وەزارەتی ناوخۆ لە بەغدا یان هەولێر',
        'دەرکردنی ڤیزا لە باڵیۆزخانەی عێراق لە پەکین یان بە شێوازی ئەلیکترۆنی',
        'ڕێنمایی گەیشتن لە فڕۆکەخانەکانی هەولێر، بەغدا یان بەسرە'
      ]
    },
    authoritativeSourceUrl: 'https://mofa.gov.iq/',
    lastVerifiedAt: '2026-09-15T10:00:00Z',
    status: 'published'
  }
];

export const INITIAL_VISA_SERVICES: VisaService[] = [
  {
    id: 'vs-biz-advisory',
    slug: 'business-visa-advisory',
    title: {
      en: 'Strategic Business Visa Advisory & Dossier Preparation',
      ar: 'الاستشارة الاستراتيجية لملفات التأشيرات التجارية لرجال الأعمال',
      zh: '中伊经贸商务签证综合顾问与卷宗预审',
      ckb: 'ڕاوێژکاری و ئامادەکردنی دۆسیەی فەرمی ڤیزای بازرگانی'
    },
    category: 'consultation',
    direction: 'both',
    description: {
      en: 'Comprehensive guidance on invitation letter formatting, government compliance, Chamber of Commerce validations, and dossier compilation for bilateral executives traveling between Iraq and China.',
      ar: 'إرشادات شاملة لصياغة خطابات الدعوة الرسمية، وتوافق الملف مع المعايير الحكومية، وتصديق الغرف التجارية، وإعداد الملف للمدراء التنفيذيين بين العراق والصين.',
      zh: '针对中伊双边企业高管、采购团组提供官方邀请函合规审查、商会认证及领事面签问答全流程专业辅导。',
      ckb: 'ڕاوێژکاری و هاوکاری تەواو بۆ ئامادەکردنی نووسراوی فەرمی و سەردانی بازرگانی نێوان عێراق و چین.'
    },
    whoItIsFor: {
      en: 'Corporate directors, industrial procurement teams, factory inspectors, and trade summit attendees.',
      ar: 'مدراء الشركات، وفرق المشتريات الصناعية، ومفتشو المصانع، والمشاركون في القمم والمنتديات الاقتصادية.',
      zh: '企业高管、跨境采购团队、工业验厂专家及经贸峰会参展代表。',
      ckb: 'بەڕێوەبەرانی کۆمپانیاکان، تیمەکانی کڕینی کەلوپەل و بەشداربووانی کۆڕبەندە ئابوورییەکان.'
    },
    deliverables: {
      en: [
        'Complete dossier audit against Chinese Consulate / Iraqi MOFA requirements',
        'Official invitation letter review and bilingual drafting assistance',
        'Consular submission timeline and appointment optimization plan',
        'Pre-submission mock interview guidance (if applicable)'
      ],
      ar: [
        'تدقيق شامل لملف الأوراق وفق متطلبات القنصلية الصينية ووزارة الخارجية العراقية',
        'صياغة ومراجعة خطاب الدعوة الرسمي باللغتين العربية والصينية',
        'جدول زمني دقيق للمواعيد وتسريع المعاملة',
        'إرشادات المقابلة القنصلية والأسئلة الشائعة'
      ],
      zh: [
        '对照中伊两国外交与领事规范的申请卷宗全要素核验',
        '中阿双语官方邀请公函合规修改与范本支持',
        '领事预约席位锁定及最佳出行时间轴规划',
        '面签问答重点预备辅导与注意要点清单'
      ],
      ckb: [
        'پشکنینی گشتی دۆسیەکە بەپێی ستانداردەکانی باڵیۆزخانە و کۆنسوڵگەری',
        'داڕشتنی نووسراوی بانگهێشتی فەرمی بە شێوەیەکی یاسایی',
        'ڕێکخستنی کاتەکانی چاوپێکەوتن بە خێرایی',
        'ڕێنمایی بۆ چاوپێکەوتنی کۆنسوڵگەری'
      ]
    },
    timeline: {
      en: '1-2 working days for file review & dossier finalization',
      ar: '1-2 أيام عمل لمراجعة الأوراق وإنهاء الملف بالكامل',
      zh: '1-2个工作日内完成卷宗审核与交付',
      ckb: '1 بۆ 2 ڕۆژی کارکردن بۆ تەواوکردنی دۆسیەکە'
    },
    priceIQD: 85000,
    priceUSD: 65,
    requirements: ['Passport copy', 'Proposed business purpose', 'Draft invitation letter if available'],
    faqs: ['faq-invitation-requirements', 'faq-processing-speeds'],
    ctaType: 'request-service',
    displayOrder: 1,
    status: 'published'
  },
  {
    id: 'vs-doc-attestation',
    slug: 'document-authentication-attestation',
    title: {
      en: 'Consular Document Authentication & Legalization Advisory',
      ar: 'استشارات تصديق ومصادقة الوثائق الرسمية والقنصلية',
      zh: '涉外民商事文书领事认证与双认证合规协助',
      ckb: 'ڕاوێژکاری بۆ پەسەندکردنی بەڵگەنامە فەرمییەکان لە کۆنسوڵگەری'
    },
    category: 'document-authentication',
    direction: 'both',
    description: {
      en: 'Step-by-step guidance for legalizing commercial contracts, powers of attorney, certificates of origin, academic degrees, and medical records through the Iraqi Ministry of Foreign Affairs and Chinese diplomatic missions.',
      ar: 'دليل وإشراف خطوة بخطوة لمصادقة العقود التجارية، والوكالات العامة والخاصة، وشهادات المنشأ، والشهادات الجامعية، والتقارير الطبية عبر الخارجية العراقية والبعثات الصينية.',
      zh: '为商业合同、法人授权委托书、原产地证明、学历学位证书及体检无犯罪公证书提供外交部及使领馆双认证合规路径咨询。',
      ckb: 'ڕێنمایی تەواو بۆ پەسەندکردنی گرێبەستی بازرگانی، بریکارینامە، بڕوانامەی زانکۆ لە وەزارەتی دەرەوە و کۆنسوڵگەری.'
    },
    whoItIsFor: {
      en: 'Joint-venture companies, foreign employees, students certifying credentials, and exporters.',
      ar: 'الشركات المشتركة، والموظفون الأجانب، والطلبة المصدقون لشهاداتهم، والمصدرون والتجار.',
      zh: '合资企业、跨境派遣员工、留学归国人员及进出口贸易商。',
      ckb: 'کۆمپانیا هاوبەشەکان، خوێندکاران و بازرگانان.'
    },
    deliverables: {
      en: [
        'Document sequence checklist (Notary → Justice Ministry → Foreign Ministry → Consulate)',
        'Formatting verification against specific consular requirements',
        'Apostille and bilateral legalization discrepancy analysis'
      ],
      ar: [
        'تسلسل خطوات التصديق (الكاتب العدل ← العدل ← الخارجية ← القنصلية)',
        'تدقيق التنسيق والأختام وفق المعايير القنصلية الصينية والعراقية',
        'مراجعة شروط معاهدة أپوستيل والتحقق من القبول القانوني'
      ],
      zh: [
        '认证全流程节点清单（公证处→司法部→外交部领事司→使领馆）',
        '中阿双语排版印鉴规格核对',
        '海牙附加证明书与传统双认证适配性分析'
      ],
      ckb: [
        'خشتەی هەنگاوەکان (دادنووس ← داد ← دەرەوە ← کۆنسوڵگەری)',
        'پشکنینی مۆر و واژۆکان بەپێی یاساکانی چین و عێراق',
        'ڕاوێژکاری بۆ قبوڵکردنی یاسایی لە هەردوو وڵات'
      ]
    },
    timeline: {
      en: 'Immediate advisory; administrative processing per government schedule',
      ar: 'استشارة فورية؛ والإجراءات الإدارية بحسب جدول الدوائر الرسمية',
      zh: '即时提供审查报告；办理周期依据官方机构办公时限',
      ckb: 'ڕاوێژکاری خێرا؛ بەپێی کاتی دەوامی فەرمانگەکان'
    },
    priceIQD: 70000,
    priceUSD: 50,
    requirements: ['Original document scan', 'Target jurisdiction requirement statement'],
    faqs: ['faq-attestation-validity'],
    ctaType: 'request-service',
    displayOrder: 2,
    status: 'published'
  },
  {
    id: 'vs-delegation-facilitation',
    slug: 'high-level-delegation-facilitation',
    title: {
      en: 'High-Level Bilateral Delegation Visa Facilitation',
      ar: 'تسهيل تأشيرات الوفود الاقتصادية والحكومية رفيعة المستوى',
      zh: '双边经贸与政府高级代表团组签证专项服务',
      ckb: 'ئاسانکاری ڤیزا بۆ شاندە باڵا بازرگانی و حکومییەکان'
    },
    category: 'delegation-facilitation',
    direction: 'both',
    description: {
      en: 'End-to-end documentation coordination for multi-member industrial, chamber of commerce, municipal, and academic delegations visiting China or Iraq.',
      ar: 'تنسيق متكامل للوثائق والملفات للوفود الصناعية، وغرف التجارة، والبلديات، والوفود الأكاديمية متعددة الأعضاء الزائرة للصين أو العراق.',
      zh: '为多人的省市经贸团组、商会商务代表团、行业协会考察团提供团组统一录入、材料批量对审及礼宾渠道协调。',
      ckb: 'ڕێکخستنی دۆسیە بۆ شاندی ژوورە بازرگانییەکان، سەندیکاکان و شاندە زانستییە گەورەکان.'
    },
    whoItIsFor: {
      en: 'Trade chambers, industrial unions, summit speaker delegations, and municipal authorities.',
      ar: 'غرف التجارة، واتحادات الصناعيين، والوفود المشاركة بالمؤتمرات، والجهات البلدية والرسمية.',
      zh: '各地商会、工业家协会、大型论坛参会团组及高校交流团。',
      ckb: 'ژوورە بازرگانییەکان، دەستەی وەبەرهێنان و شاندەکانی کۆنفرانسە نێودەوڵەتییەکان.'
    },
    deliverables: {
      en: [
        'Dedicated account manager for group roster coordination',
        'Consolidated group document tracking matrix',
        'Group biometric slot coordination with diplomatic mission',
        'Official bilateral travel advisory dossiers'
      ],
      ar: [
        'منسق مخصص لمتابعة كشف أسماء وملفات أعضاء الوفد',
        'جدول تتبع موحد لحالة جميع وثائق الوفد',
        'تنسيق مواعيد البصمة الجماعية لدى البعثة الدبلوماسية',
        'ملف إرشادات السفر والإقامة المعتمد للوفد'
      ],
      zh: [
        '专属大客户项目经理对接团组成员名册',
        '团队签证进度统一可视化跟踪矩阵',
        '协助沟通领馆团组指纹采集绿色通道时段',
        '全团出行行前安全与经贸礼仪指引包'
      ],
      ckb: [
        'بەڕێوەبەری تایبەت بۆ بەدواداچوونی هەموو ئەندامانی شاندەکە',
        'خشتەی چاودێری وەرگرتنی ڤیزا بۆ هەموو ئەندامان',
        'ڕێکخستنی کاتی پەنجەمۆری بە کۆمەڵ لە کۆنسوڵگەری',
        'پوختەی ڕێنمایی گەشت بۆ شاندەکە'
      ]
    },
    timeline: {
      en: '3-5 working days for entire group dossier preparation',
      ar: '3-5 أيام عمل لتجهيز ملفات الوفد بالكامل',
      zh: '3-5个工作日完成全团材料合规归档',
      ckb: '3 بۆ 5 ڕۆژی کارکردن بۆ ئامادەکردنی تەواوی شاندەکە'
    },
    priceIQD: 325000,
    priceUSD: 250,
    requirements: ['Official Delegation Roster', 'Host Institution Letter', 'Participant Passports'],
    faqs: ['faq-delegation-lead-time'],
    ctaType: 'contact',
    displayOrder: 3,
    status: 'published'
  }
];

export const INITIAL_VISA_ANNOUNCEMENTS: VisaAnnouncement[] = [
  {
    id: 'va-erbil-fingerprints',
    title: {
      en: 'Consulate General in Erbil: Biometric Exemption Guidelines for Frequent Travelers',
      ar: 'القنصلية العامة في أربيل: ضوابط الإعفاء من البصمة للمسافرين المتكررين',
      zh: '驻埃尔比勒总领馆：关于符合条件申请人免采指纹最新政策通告',
      ckb: 'کۆنسوڵگەری چین لە هەولێر: ڕێنمایی نوێی بەخشین لە پەنجەمۆر بۆ گەشتیارانی بەردەوام'
    },
    body: {
      en: 'Applicants who have already enrolled fingerprints within the past 5 years on the same passport for a Chinese visa may be eligible for biometric exemption. The Centre verifies eligibility prior to appointment scheduling.',
      ar: 'المتقدمون الذين قاموا بتسجيل بصماتهم الحيوية خلال السنوات الخمس الماضية على نفس الجواز للحصول على تأشيرة صينية قد يكونون مؤهلين للإعفاء من البصمة. يقوم المركز بالتحقق من الأهلية مسبقاً.',
      zh: '在过去5年内持同一有效护照在中国驻外使领馆或签证中心留存过指纹的申请人，可按规定免采指纹。本中心协助前置核验资格。',
      ckb: 'ئەو داواکارانەی کە لە ماوەی 5 ساڵی ڕابردوودا پەنجەمۆریان لەسەر هەمان پاسپۆرت گرتووە ڕەنگە لە پەنجەمۆر ببەخشرێن.'
    },
    category: 'policy-update',
    effectiveDate: '2026-09-01',
    sourceUrl: 'http://erbil.china-consulate.gov.cn/',
    status: 'published',
    pinned: true,
    createdAt: '2026-09-01T08:00:00Z',
    updatedAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'va-canton-fair-autumn',
    title: {
      en: 'Canton Fair 2026 Autumn Session: Early Visa Processing Window Open',
      ar: 'معرض كانتون الدولي خريف 2026: فتح نافذة التقديم المبكر للتأشيرات التجارية',
      zh: '2026年秋季广交会客商赴华签证前期咨询与材料筹备通道开启',
      ckb: 'پێشانگای کانتۆن 2026: دەستپێکردنی ئامادەکاری ڤیزای بازرگانی بۆ بەشداربووان'
    },
    body: {
      en: 'Due to peak autumn trade travel demand, Iraqi business applicants are advised to submit M-visa dossiers at least 4 weeks before intended departure dates to ensure timely consular review.',
      ar: 'نظراً لذروة السفر التجاري في الخريف، يُنصح رجال الأعمال العراقيون ببدء تجهيز ملفات تأشيرة M قبل 4 أسابيع على الأقل من موعد السفر المخطط لتجنب أي تأخير.',
      zh: '秋季广交会与双边经贸往来高峰临近，建议伊拉克采购商至少提前4周开展M字签证材料准备与预约锁定。',
      ckb: 'بەهۆی زۆری داواکاری لە وەرزی پێشانگادا، داوا دەکرێت بازرگانان لانیکەم 4 هەفتە پێشتر دەست بە ئامادەکردنی بەڵگەنامەکان بکەن.'
    },
    category: 'general',
    effectiveDate: '2026-09-10',
    sourceUrl: 'https://www.cantonfair.org.cn/',
    status: 'published',
    pinned: false,
    createdAt: '2026-09-10T09:30:00Z',
    updatedAt: '2026-09-10T09:30:00Z'
  }
];

export const INITIAL_VISA_FAQS: VisaFaq[] = [
  {
    id: 'faq-authority-status',
    question: {
      en: 'Does the Visa Consultancy Centre issue visas directly?',
      ar: 'هل يقوم مركز استشارات التأشيرات بإصدار التأشيرة مباشرة؟',
      zh: '本签证咨询中心是否直接签发签证？',
      ckb: 'ئایا ئەم سەنتەرە خۆی راستەوخۆ ڤیزا دەردەکات؟'
    },
    answer: {
      en: 'No. The Bilateral Visa Consultancy & Facilitation Centre is an independent advisory and documentation service operated by the Chinese Institute for Strategic and Economic Studies. It is not a visa-issuing authority. All visa issuance decisions belong solely to the sovereign governments of China and Iraq.',
      ar: 'كلا. المركز هو جهة استشارية وتوثيقية مستقلة تابعة للمعهد الصيني للدراسات الاستراتيجية والاقتصادية، وليس سلطة لإصدار التأشيرات. قرار منح التأشيرة هو حق سيادي حصري لجمهورية الصين الشعبية وجمهورية العراق.',
      zh: '否。双边签证咨询与代办中心是由中国战略与经济研究所设立的独立政策研究与咨询机构，非官方签证发证机关。所有签证签发裁决均由中伊两国主权政府及外交使领馆全权作出。',
      ckb: 'نەخێر. ئەم ناوەندە سەربەخۆیە و دەسەڵاتی دەرکردنی ڤیزای نییە، تەنها ڕاوێژکاری و ئامادەکردنی بەڵگەنامە پێشکەش دەکات. بڕیاری ڤیزا تەنها لە دەسەڵاتی فەرمی باڵیۆزخانە و کۆنسوڵگەریدایە.'
    },
    direction: 'both',
    category: 'eligibility',
    displayOrder: 1,
    status: 'published'
  },
  {
    id: 'faq-invitation-requirements',
    question: {
      en: 'What constitutes an official invitation letter for a Chinese M (Business) visa?',
      ar: 'ما هي متطلبات خطاب الدعوة الرسمي المعتمد لتأشيرة الأعمال الصينية (M)؟',
      zh: '申请中国M字商务签证所需的官方邀请函有哪些具体格式与要素要求？',
      ckb: 'مەرجەکانی نووسراوی بانگهێشتنامەی فەرمی بۆ ڤیزای بازرگانی M چییە؟'
    },
    answer: {
      en: 'An official invitation letter must be issued by a registered Chinese company or government trade entity on formal letterhead with stamp and signature. It must state the applicant’s full name, passport number, detailed business purpose, travel dates, financial guarantee, and full company license credentials.',
      ar: 'يجب أن يصدر خطاب الدعوة عن شركة صينية مسجلة أو جهة تجارية حكومية، على الورق الرسمي للشركة مع الختم الرسمي وتوقيع المفوض. ويجب أن يوضح الاسم الكامل، ورقم الجواز، والغرض التجاري الدقيق، وتواريخ الزيارة، والتعهد المالي، وبيانات السجل التجاري.',
      zh: '邀请函需由中国境内合法注册的企业或经贸机构出具，使用正式公文信笺并加盖公章与法人签字。函件需明确载明申请人姓名、护照号、详细商务目的、抵离日期、费用承担方式及邀请单位统一社会信用代码。',
      ckb: 'پێویستە بانگهێشتنامەکە لەلایەن کۆمپانیای تۆمارکراوی چین یان لایەنی فەرمی دەربچێت، مۆر و واژۆی هەبێت و زانیاری وردی کەسی، پاسپۆرت، مەبەستی بازرگانی و ماوەی مانەوەی تێدابێت.'
    },
    direction: 'iraq-to-china',
    category: 'documents',
    displayOrder: 2,
    status: 'published'
  },
  {
    id: 'faq-timeline-expedited',
    question: {
      en: 'What is the standard processing time at the Chinese Consulate in Erbil?',
      ar: 'ما هي المدة المعتادة لإصدار التأشيرة في القنصلية العامة الصينية بأربيل؟',
      zh: '中国驻埃尔比勒总领馆通常的签证受理周期为多长？',
      ckb: 'ماوەی ئاسایی بۆ وەرگرتنی ڤیزا لە کۆنسوڵگەری چین لە هەولێر چەندە؟'
    },
    answer: {
      en: 'Standard processing takes 4 working days from the day of consular submission and biometric enrollment. Express processing (2-3 working days) may be requested subject to consular approval and additional official express fees.',
      ar: 'تستغرق المعاملة العادية 4 أيام عمل من تاريخ تسليم الأوراق والتبصيم في القنصلية. ويمكن طلب المعاملة المستعجلة (2-3 أيام عمل) بموافقة القنصلية وسداد الرسوم الإضافية الرسمية.',
      zh: '正常审理为现场递交材料及录入指纹后4个工作日。符合条件并获领事批准的加急申请为2-3个工作日，需缴纳官方加急规费。',
      ckb: 'ماوەی ئاسایی 4 ڕۆژی کارکردنە لە کاتی وەرگرتنی پەنجەمۆر لە کۆنسوڵگەری. مامەڵەی خێرا (2 بۆ 3 ڕۆژ) لەژێر ڕەزامەندی کۆنسوڵگەری دایە.'
    },
    direction: 'iraq-to-china',
    category: 'timeline',
    displayOrder: 3,
    status: 'published'
  }
];

export const INITIAL_VISA_SETTINGS: VisaCentreSettings = {
  erbilConsulateAddress: 'Gulan St, Erbil, Kurdistan Region, Iraq',
  beijingEmbassyAddress: 'Sanlitun Diplomatic Compound, Chaoyang District, Beijing, China',
  workingHoursEn: 'Sunday – Thursday: 09:00 – 17:00 (Consular submissions: 09:30 – 13:00)',
  workingHoursAr: 'الأحد – الخميس: 09:00 – 17:00 (تسليم المعاملات القنصلية: 09:30 – 13:00)',
  workingHoursZh: '周日至周四：09:00 – 17:00（领事业务受理时间：09:30 – 13:00）',
  workingHoursCkb: 'یەکشەممە – پێنجشەممە: 09:00 – 17:00 (کاتی مامەڵەی کۆنسوڵگەری: 09:30 – 13:00)',
  contactEmail: 'visa-centre@cises-iq.org',
  contactPhone: '+964 750 000 8822',
  hotlineEmergency: '+964 770 000 8833',
  defaultConsultationFeeIQD: 85000,
  defaultConsultationFeeUSD: 65,
  notificationEmailEnabled: true,
  notificationSmsEnabled: true
};
