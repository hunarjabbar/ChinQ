import { useState, useRef, FormEvent, DragEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Locale } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, 
  Send, 
  CheckCircle, 
  Sparkles, 
  Upload, 
  FileText, 
  RotateCcw, 
  Download, 
  Printer, 
  Award,
  User,
  Mail,
  Briefcase,
  Globe,
  Compass
} from 'lucide-react';
import html2canvas from 'html2canvas-pro';

const translations = {
  en: {
    title: 'Join the Editorial Network & Strategic Consortium',
    subtitle: 'Accredited Fellowship Registration, Editorial Credential Dossier & Sovereign Intelligence Pipeline',
    applyButton: 'Submit Editorial Credentials',
    aboutSecTitle: 'Why Join the Sovereign Editorial Network?',
    aboutSecDesc: 'By affiliating with the Iraqi-Chinese Agency Media Group, fellows enter an institutional network connecting policymakers, economic analysts, and diplomatic correspondents. You gain direct operational access to sovereign intelligence streams, accredited reporting credentials, and our centralized administration publishing portal. We bridge East Asia and the Middle East through authoritative, trilingual journalism.',
    formTitle: 'Sovereign Editorial Credential & Fellowship Registration',
    formSubtitle: 'Please submit your accredited administrative credentials for sovereign vetting and command center database synchronization.',
    fullName: 'Full Legal Name',
    email: 'Professional Editorial Email',
    company: 'Affiliation, Media Bureau or Think-Tank',
    role: 'Accredited Track / Fellowship Focus',
    roles: [
      { id: 'editorial', label: 'Senior Editorial Fellow & Diplomatic Correspondent' },
      { id: 'translation', label: 'Trilingual Translation & Contextual Localization (AR / ZH / CKB / EN)' },
      { id: 'macroeconomic', label: 'Macroeconomic & Energy Research Analyst (BRI & Al Faw Port)' },
      { id: 'b2b', label: 'Maritime Logistics, Port Infrastructure & B2B Trade' },
      { id: 'research', label: 'Academic Policy Fellow & Think-Tank Scholar' }
    ],
    nationality: 'Nationality',
    passportOrIdNumber: 'Passport or National ID Number',
    asaishCode: 'Asaish Verification Code',
    iraqiInfoCard: 'Iraqi Information Card No. (بطاقة المعلومات)',
    addressHouseNo: 'House No.',
    addressStreetNo: 'Street No.',
    addressDistrictName: 'District Name',
    addressDistrictNumber: 'District Number',
    phoneNumber: 'Direct Phone / Mobile',
    dateOfBirth: 'Date of Birth',
    emergencyContact: 'Emergency Contact / Liaison Bureau',
    bio: 'Statement of Purpose / Diplomatic & Editorial Track Record',
    bioPlaceholder: 'Detail your background in bilateral Sino-Iraqi analysis, investigative journalism, or policy research...',
    fileLabel: 'Upload Curriculum Vitae / Enterprise Dossier (PDF)',
    fileDrag: 'Drag and drop your PDF dossier here, or click to browse',
    submit: 'Submit Registration & Credential Dossier',
    submitting: 'Initiating Sovereign Audit & Central DB Sync...',
    successTitle: 'Candidate Dossier Logged & Vetted',
    successDesc: 'Your professional credentials and official registry profile have been securely logged into the Iraqi-Chinese Agency Sovereign Information Ledger and synchronized with the administration portal.',
    appId: 'Registration Hash',
    bureauAssigned: 'Processing Bureau',
    printReceipt: 'Print Registry Receipt',
    downloadPdf: 'Download Official Badge & PNG',
    resetForm: 'Submit New Application',
    required: 'This field is required',
    invalidEmail: 'Please enter a valid professional email address',
    fileTypeErr: 'Only PDF documents are accepted for strategic vetting'
  },
  ar: {
    title: 'الانضمام إلى شبكة التحرير والائتلاف الاستراتيجي',
    subtitle: 'تسجيل الزمالة المعتمدة وملف الاعتماد الصحفي وتدفق المعلومات الاستخباراتية المستقلة',
    applyButton: 'تقديم ملف الاعتماد الصحفي',
    aboutSecTitle: 'لماذا تنضم إلى شبكة التحرير السيادية؟',
    aboutSecDesc: 'من خلال الانتساب إلى مجموعة الوكالة العراقية الصينية الإعلامية، ينضم الزملاء إلى شبكة مؤسسية رفيعة تربط صناع القرار والمحللين الاقتصاديين والمراسلين الدبلوماسيين. يتيح لك ذلك الوصول التشغيلي المباشر لتدفقات البيانات السيادية، والحصول على بطاقات الاعتماد الصحفي الموثقة، والنشر عبر مركز القيادة الإداري. نحن نربط شرق آسيا بالشرق الأوسط عبر صحافة ثلاثية اللغات رصينة وموثوقة.',
    formTitle: 'تسجيل الاعتماد الصحفي والزمالة التحريرية المستقلة',
    formSubtitle: 'يرجى تقديم بيانات الاعتماد الإدارية الكاملة للفحص السيادي والمزامنة مع قاعدة بيانات مركز القيادة.',
    fullName: 'الاسم القانوني الكامل',
    email: 'البريد الإلكتروني المهني والتحريري',
    company: 'المؤسسة أو المكتب الإعلامي أو مركز الفكر',
    role: 'المسار المعتمد / تركيز الزمالة',
    roles: [
      { id: 'editorial', label: 'الصحافة والزمالة التحريرية الدبلوماسية' },
      { id: 'translation', label: 'الترجمة والتعريب السياقي الثلاثي (عربي / صيني / كردي / إنجليزي)' },
      { id: 'macroeconomic', label: 'محلل شؤون الحزام والطريق واقتصاد الطاقة' },
      { id: 'b2b', label: 'لوجستيات الموانئ وتجارة B2B وميناء الفاو' },
      { id: 'research', label: 'زميل السياسات وباحث في معهد الدراسات الاستراتيجية' }
    ],
    nationality: 'الجنسية',
    passportOrIdNumber: 'رقم جواز السفر أو البطاقة الوطنية',
    asaishCode: 'رقم كود الأسايش للتحقق',
    iraqiInfoCard: 'رقم بطاقة المعلومات',
    addressHouseNo: 'رقم الدار',
    addressStreetNo: 'رقم الشارع',
    addressDistrictName: 'اسم الحي / المحلة',
    addressDistrictNumber: 'رقم المحلة',
    phoneNumber: 'رقم الهاتف المباشر',
    dateOfBirth: 'تاريخ الميلاد',
    emergencyContact: 'جهة الاتصال في الطوارئ / مكتب الارتباط',
    bio: 'بيان الغرض / السجل التحريري والدبلوماسي',
    bioPlaceholder: 'صف خلفيتك في التحليلات الصينية العراقية أو الصحافة الاستقصائية أو أبحاث السياسات...',
    fileLabel: 'تحميل السيرة الذاتية / ملف المؤسسة (PDF)',
    fileDrag: 'اسحب وأفلت ملف PDF هنا، أو انقر للتصفح',
    submit: 'إرسال ملف التسجيل واعتماد البيانات',
    submitting: 'بدء التدقيق السيادي والمزامنة مع قاعدة البيانات...',
    successTitle: 'تم تسجيل ملف المرشح وتدقيقه بنجاح',
    successDesc: 'تم تسجيل بيانات الاعتماد الخاصة بك وملف التسجيل بأمان في سجل معلومات الوكالة العراقية الصينية السيادي ومزامنته مع بوابة الإدارة.',
    appId: 'هاش التسجيل السيادي',
    bureauAssigned: 'المكتب المعالج',
    printReceipt: 'طباعة إيصال السجل',
    downloadPdf: 'تحميل الشارة الرسمية وصورة PNG',
    resetForm: 'تقديم طلب تسجيل جديد',
    required: 'هذا الحقل مطلوب',
    invalidEmail: 'يرجى إدخال بريد إلكتروني مهني صالح',
    fileTypeErr: 'يتم قبول مستندات PDF فقط للتدقيق الاستراتيجي'
  },
  zh: {
    title: '加入主权编辑网络与战略智库联合体',
    subtitle: '官方智库研究员认证、三语采编记者资质审核与主权情报管道准入登记',
    applyButton: '提交主权采编凭据',
    aboutSecTitle: '为何加入伊中通讯社主权编辑网络？',
    aboutSecDesc: '加入伊中通讯社传媒集团即意味着您进入了一个连通政策制定者、宏观经济分析师与外交特派员的制度化网络。您将获得直通主权情报流、数字化官方记者凭证以及中央管理指挥系统的直接接入权限。我们以权威、严谨的三语新闻采编架起东亚与中东之间的战略信息走廊。',
    formTitle: '主权采编资质审核与智库学者登记系统',
    formSubtitle: '请提交您的官方行政凭据，以供主权级背景审核及中央数据库实时同步。',
    fullName: '法定全名',
    email: '采编/机构官方邮箱',
    company: '所属机构、通讯社分社或智库院校',
    role: '申报认证方向 / 专项领域',
    roles: [
      { id: 'editorial', label: '新闻采编与外交事务高级特派员' },
      { id: 'translation', label: '三语翻译与法理语境本地化矩阵 (中/阿/库/英)' },
      { id: 'macroeconomic', label: '宏观经贸与能源研究分析师 (一带一路与法奥港)' },
      { id: 'b2b', label: '港口基建与跨境B2B商贸研究员' },
      { id: 'research', label: '学术智库与国际政策常驻学者' }
    ],
    nationality: '国籍',
    passportOrIdNumber: '护照号或国民身份证号',
    asaishCode: '安全局 (Asaish) 核验编号',
    iraqiInfoCard: '伊拉克信息卡号 (بطاقة المعلومات)',
    addressHouseNo: '门牌号 (House No.)',
    addressStreetNo: '街道号 (Street No.)',
    addressDistrictName: '行政区/社区名称 (District)',
    addressDistrictNumber: '行政区编号 (District No.)',
    phoneNumber: '直联电话/手机',
    dateOfBirth: '出生日期',
    emergencyContact: '紧急联络人 / 联络处',
    bio: '学术专长陈述 / 外交与采编从业资历',
    bioPlaceholder: '请阐述您在中伊双边经贸政策、深度调查采编或智库政策研判等方面的专业背景...',
    fileLabel: '上传个人履历 / 机构资质卷宗 (PDF格式)',
    fileDrag: '将 PDF 卷宗拖拽至此处，或点击选择文件',
    submit: '提交注册与官方凭证档案',
    submitting: '正在启动主权审计与中央调度库同步...',
    successTitle: '候选人档案已录入并完成资质校验',
    successDesc: '您的专业凭证已安全存入中伊传媒主权信息账本，并已实时同步至中央管理调度中心数据库。',
    appId: '主权登记凭证哈希',
    bureauAssigned: '受理分社机构',
    printReceipt: '打印登记凭证',
    downloadPdf: '下载官方采编徽章与图片凭证',
    resetForm: '提交新登记申请',
    required: '此项为必填项',
    invalidEmail: '请输入有效的专业机构电子邮箱',
    fileTypeErr: '仅支持 PDF 格式的文件进行战略资质审核'
  },
  ckb: {
    title: 'پەیوەندی بە تۆڕی سەرنووسەرایەتی و هاوپەیمانی ستراتیژییەوە بکە',
    subtitle: 'تۆمارکردنی ئەندامێتی فەرمی، پێڕستی ڕۆژنامەوانی و کەناڵی زانیاری سەربەخۆ',
    applyButton: 'پێشکەشکردنی بەڵگەنامەی ڕۆژنامەوانی',
    aboutSecTitle: 'بۆچی پەیوەندی دەکەیت بە تۆڕی سەرنووسەرایەتی سەربەخۆ؟',
    aboutSecDesc: 'بە پەیوەندیکردن بە گرووپی ئاژانسی عێراقی - چینی، ئەندامان دێنە ناو تۆڕێکی باڵای دامەزراوەیی کە بڕیاربەدەستان، شیکەرەوە ئابوورییەکان و پەیامنێرانی دیپلۆماسی دەبەستێتەوە بە یەکەوە. دەستڕاگەیشتنی ڕاستەوخۆت دەبێت بە زانیارییە سەربەخۆکان، باجی فەرمی ڕۆژنامەوانی، و سیستەمی بڵاوکردنەوەی بەڕێوەبردن. ئێمە ڕۆژهەڵاتی ئاسیا و ڕۆژهەڵاتی ناوەڕاست بەیەک دەبەستینەوە لە ڕێگەی ڕۆژنامەگەرییەکی سێزمانەی باوەڕپێکراو.',
    formTitle: 'تۆمارکردنی پێڕستی ڕۆژنامەوانی و ئەندامێتی دەستەی سەرنووسەران',
    formSubtitle: 'تکایە سەرجەم زانیارییە فەرمییەکان بنێرە بۆ وردبینی سەربەخۆ و هاوکاتکردنی بنکەدراوەی بەڕێوەبردن.',
    fullName: 'ناوی تەواوی یاسایی',
    email: 'ئیمەیڵی فەرمی و ڕۆژنامەوانی',
    company: 'دەزگا، نووسینگەی ڕاگەیاندن یان ناوەندی لێکۆڵینەوە',
    role: 'ڕێڕەوی پەسەندکراو / بواری ئەندامێتی',
    roles: [
      { id: 'editorial', label: 'ڕۆژنامەگەری و سەرنووسەری دیپلۆماسی' },
      { id: 'translation', label: 'وەرگێڕان و خۆماڵیکردنی سێزمانە (عەرەبی / چینی / کوردی / ئینگلیزی)' },
      { id: 'macroeconomic', label: 'شیکەرەوەی ئابووری وزە و ڕێگای پشتوێن و فاو' },
      { id: 'b2b', label: 'لۆجیستی بەندەر و ژێرخان و بازرگانی نێوان دەزگاکان' },
      { id: 'research', label: 'توێژەری ئەکادیمی و پەیمانگای سیاسەتی ستراتیژی' }
    ],
    nationality: 'نەتەوە / ڕەگەزنامە',
    passportOrIdNumber: 'ژمارەی پاسپۆرت یان ناسنامەی باری شارستانی',
    asaishCode: 'ژمارەی کۆدی ئاسایش بۆ پشتڕاستکردنەوە',
    iraqiInfoCard: 'ژمارەی کارتی زانیاری (بطاقة المعلومات)',
    addressHouseNo: 'ژمارەی خانوو',
    addressStreetNo: 'ژمارەی شەقام',
    addressDistrictName: 'ناوی گەڕەک / ناوچە',
    addressDistrictNumber: 'ژمارەی گەڕەک',
    phoneNumber: 'ژمارەی تەلەفۆنی ڕاستەوخۆ',
    dateOfBirth: 'بەرواری لەدایکبوون',
    emergencyContact: 'پەیوەندی فریاکەوتن / نووسینگەی پەیوەندی',
    bio: 'بەیاننامەی مەبەست / ئەزموونی ڕۆژنامەوانی و دیپلۆماسی',
    bioPlaceholder: 'پەسنی پاشخانی خۆت بکە لە پەیوەندییە دوولایەنەکانی چین و عێراق یان ڕۆژنامەگەری لێکۆڵینەوەیی...',
    fileLabel: 'بارکردنی سیڤی / دۆسیەی دامەزراوە (PDF)',
    fileDrag: 'پەڕگەی PDF لێرە دابنێ، یان کلیک بکە بۆ گەڕان',
    submit: 'ناردنی داواکاری و تۆماری بڕوانامە',
    submitting: 'دەستپێکردنی وردبینی و هاوکاتکردنی بنکەدراوەی ناوەندی...',
    successTitle: 'دۆسیەی داواکار تۆمارکرا و پشتڕاستکرایەوە',
    successDesc: 'زانیارییە فەرمییەکانت بە سەلامەتی لە تۆماری زانیاری ئاژانسی عێراقی - چینیدا تۆمارکرا و لەگەڵ سیستەمی بەڕێوەبردا ڕێکخرایەوە.',
    appId: 'هاشی فەرمی تۆمارکردن',
    bureauAssigned: 'نووسینگەی چارەسەرکردن',
    printReceipt: 'چاپکردنی پسوولەی تۆمارکردن',
    downloadPdf: 'داگرتنی باجی فەرمی و وێنەی PNG',
    resetForm: 'پێشکەشکردنی داواکاری نوێ',
    required: 'ئەم خانەیە پێویستە',
    invalidEmail: 'تکایە ئیمەیڵێکی فەرمی دروست بنووسە',
    fileTypeErr: 'تەنها بەڵگەنامەی PDF وەردەگیرێت بۆ پشکنین'
  }
};

const essayTranslation = {
  en: {
    sections: [
      {
        heading: "1. The Historical and Strategic Imperative",
        paragraphs: [
          "The modern era is defined by profound interconnectedness, where the economic, political, and cultural destinies of nations are inexorably linked. Among the most pivotal of these emerging synergies is the strategic partnership between the People's Republic of China and the Republic of Iraq. Rooted in the historical depth of the ancient Silk Road, this alliance is actively revitalized through contemporary frameworks like the Belt and Road Initiative (BRI).",
          "By joining the Iraqi-Chinese Agency Media Group and enterprise network, fellows gain unprecedented access to a localized stream of intelligence that bridges the informational divide between East Asia and the Middle East. This synergy fosters an environment where infrastructural investments—from the Al Faw Grand Port to sprawling energy grids—are guided by precise, actionable insights. Real-time data flow is as critical as physical infrastructure in the 21st-century geopolitical landscape."
        ]
      },
      {
        heading: "2. Economic Corridors, Al Faw Port & B2B Synergies",
        paragraphs: [
          "The core of the Sino-Iraqi partnership is bilateral economic revitalization. For decades, Iraq has sought to rebuild its industrial base and modernize logistics, while China has looked to secure stable energy supply corridors and export technological innovations. This mutual complementarity creates fertile ground for joint ventures, direct foreign investments, and seamless cross-border resource transfers.",
          "Collaboration through the Iraqi-Chinese Agency Enterprise Network provides businesses with a distinct competitive advantage. By integrating directly into our database, companies leverage comprehensive market statistics, corporate listings, and regional trade tariffs. This reduces transaction friction, mitigates regulatory risks associated with cross-border investments, and accelerates joint licensing initiatives along the Development Road."
        ]
      },
      {
        heading: "3. Academic Alliances, Think Tanks & Editorial Standards",
        paragraphs: [
          "Beyond the realms of commerce, the true sustainability of any bilateral relationship rests on mutual understanding and cultural exchange. Technological and academic alliances, such as those forming between leading universities in Baghdad, Basra, and Beijing, lay the groundwork for joint research in artificial intelligence, agricultural sustainability, and renewable energy grids.",
          "We actively promote academic discourse by translating complex technological and policy papers into highly accessible trilingual formats. This ensures that the transfer of knowledge is fully bi-directional, empowering Middle Eastern institutions with cutting-edge Chinese technological paradigms, while providing Chinese researchers with deep, contextual insights into local operational realities."
        ]
      },
      {
        heading: "4. Trilingual Linguistic Sovereignty & Intelligence Pipelines",
        paragraphs: [
          "In an era of rapid information diffusion, the curation and translation of news must be precise, instantaneous, and culturally nuanced. The Iraqi-Chinese Agency employs proprietary translation matrices to not only translate but contextually trans-create reports across English, Arabic, Kurdish, and Mandarin Chinese.",
          "Our information ecosystem continuously learns from geopolitical shifts, policy updates, and market indexes. By joining our editorial network, you interact with a dynamic information system that anticipates economic trends and geopolitical events. This predictive capability is invaluable for corporate strategists, diplomats, and policy architects seeking to navigate the modern Silk Road."
        ]
      }
    ]
  },
  ar: {
    sections: [
      {
        heading: "١. الضرورة التاريخية والاستراتيجية وحركة طريق الحرير",
        paragraphs: [
          "يتميز العصر الحديث بالترابط العميق، حيث ترتبط المصائر الاقتصادية والسياسية والثقافية للأمم ارتباطاً وثيقاً. ومن بين أهم هذه التآزرات الناشئة الشراكة الاستراتيجية بين جمهورية الصين الشعبية وجمهورية العراق. هذه الشراكة، المتجذرة في العمق التاريخي لطريق الحرير القديم، تم تنشيطها من خلال المبادرات المعاصرة مثل مبادرة الحزام والطريق (BRI).",
          "من خلال الانضمام إلى مجموعة الوكالة العراقية الصينية وشبكتها التحريرية، يكتسب الزملاء وصولاً غير مسبوق إلى تدفق محلي للمعلومات السيادية التي تجسر الانقسام المعلوماتي بين شرق آسيا والشرق الأوسط. يعزز هذا التآزر بيئة تسترشد فيها استثمارات البنية التحتية - من ميناء الفاو الكبير إلى شبكات الطاقة المترامية الأطراف - برؤى دقيقة وقابلة للتنفيذ."
        ]
      },
      {
        heading: "٢. الممرات الاقتصادية وميناء الفاو وتكامل الأعمال B2B",
        paragraphs: [
          "إن جوهر الشراكة الصينية العراقية هو تنشيط الاقتصاد الثنائي. لعقود من الزمن، سعى العراق إلى إعادة بناء قاعدته الصناعية وتحديث الخدمات اللوجستية، بينما تطلعت الصين إلى تأمين ممرات مستقرة لإمدادات الطاقة وتصدير الابتكارات التكنولوجية. يخلق هذا التكامل المتبادل أرضاً خصبة للمشاريع المشتركة والاستثمارات الأجنبية المباشرة.",
          "يوفر التعاون من خلال شبكة مؤسسات الوكالة للشركات ميزة تنافسية متميزة. من خلال الدمج المباشر في قاعدة بياناتنا، تستفيد الشركات من إحصاءات السوق الشاملة، وقوائم الشركات، والتعريفات التجارية الإقليمية. وهذا يقلل من الاحتكاك في المعاملات، ويخفف من المخاطر التنظيمية، ويسرع مبادرات مسار طريق التنمية الاستراتيجي."
        ]
      },
      {
        heading: "٣. التحالفات الأكاديمية ومراكز الفكر والمعايير التحريرية",
        paragraphs: [
          "تتجاوز الاستدامة الحقيقية لأي علاقة ثنائية حدود التجارة لترتكز على الفهم المتبادل والتبادل الثقافي والأكاديمي. إن التحالفات العلمية بين الجامعات الرائدة في بغداد والبصرة وبكين تضع الأساس لبحوث مشتركة في الذكاء الاصطناعي والاستدامة الزراعية وشبكات الطاقة النظيفة.",
          "نحن نعزز الخطاب الأكاديمي الرصين من خلال ترجمة أوراق السياسات المعقدة إلى قوالب ثلاثية اللغات سهلة التناول. وهذا يضمن تدفقاً معرفياً ثنائياً يمكّن المؤسسات في الشرق الأوسط من مواكبة التكنولوجيا الصينية المتطورة، بينما يوفر للباحثين الصينيين رؤى معمقة للواقع الإقليمي."
        ]
      },
      {
        heading: "٤. السيادة اللغوية الثلاثية وتدفقات الاستخبارات المعلوماتية",
        paragraphs: [
          "في عصر التدفق الفوري للبيانات، يجب أن تكون صياغة الأخبار وترجمتها دقيقة ولحظية ومحيطة بالسياق الثقافي. تطبق الوكالة العراقية الصينية مصفوفات ترجمة متطورة لا تقتصر على النقل الحرفي بل تعيد بناء المحتوى سياقياً باللغات الصينية، العربية، الكردية، والإنجليزية.",
          "تتفاعل شبكتنا التحريرية مع منظومة بيانات متجددة ترصد التحولات الجيوسياسية ومؤشرات الأسواق. يوفر هذا النظام قدرات استشرافية لا تقدر بثمن لصناع القرار والمستثمرين والدبلوماسيين الذين يرسمون ملامح طريق الحرير الحديث."
        ]
      }
    ]
  },
  zh: {
    sections: [
      {
        heading: "一、 历史深度与新时代战略必然性",
        paragraphs: [
          "当今时代以深刻的全球互联为特征，各国的经贸、政治与文化命运紧密交织。在诸般新兴双边战略协同中，中华人民共和国与伊拉克共和国的战略协作最具历史枢纽意义。该伙伴关系深植于古代丝绸之路的历史积淀，并在“一带一路”倡议及现代发展走廊中全面复兴。",
          "加入伊中通讯社传媒集团及采编智库联合体，研究员将获得直通中东与东亚第一手经贸政经情报的独家权限。从南部法奥大港建设到横跨全境的油气电网，海量基建投资均需精确的采编洞察与数据指引。在21世纪的地缘格局中，主权级实时信息流的价值已丝毫不亚于物理工程基建。"
        ]
      },
      {
        heading: "二、 经济走廊、法奥大港超级工程与跨境商贸协同",
        paragraphs: [
          "中伊双边合作的核心在于实体经济与现代工业链的全面振兴。长期以来，伊拉克致力于重塑工业基石与物流通道，而中国则致力于保障稳定能源走廊并输出成熟工业与基建范式。这种高度互补性为跨国合资、直接投资与资源配置奠定了坚实土壤。",
          "通过伊中通讯社企业网络开展协作，入网机构享有显著的战略竞争优势。通过深度接入中央数据库，企业可直接调取权威市场指标、认证名录与通关关税数据，显著降低跨境交易损耗，化解合规壁垒，加速“发展之路”（Development Road）沿线项目落地。"
        ]
      },
      {
        heading: "三、 跨国高校学术同盟、联合智库与严谨采编准则",
        paragraphs: [
          "除了商贸与资本流通外，双边关系的持久根基在于思想互鉴与学术人文共鸣。巴格达大学、巴士拉大学与北京知名高校之间的学术联盟，为人工智能、农业技术与清洁能源联合研发构筑了智力底座。",
          "本机构通过将高深的技术白皮书与政策文献转译为权威的三语出版物，积极推动学术对话。这确保了知识与技术的双向奔流，既向中东输出前沿工业模式，又向中国学者与企业决策层提供对当地营商与社会语境的深度洞察。"
        ]
      },
      {
        heading: "四、 三语语言主权与主权级战略情报网络",
        paragraphs: [
          "在信息高度碎片化的今天，新闻简报与宏观研判必须兼具绝对准确性、时效性与文化法理保真度。伊中通讯社采用专有语言本地化矩阵，实现报道在普通话、阿拉伯语、索拉尼库尔德语及英语之间的语境重构与无损传译。",
          "我们的主权数据生态持续追踪地缘动态、关税调整与大宗能源指数。加入采编网络，您将置身于能够预判经贸走向与政策风向的动态智能枢纽，为跨国企业战略家、外交使节及政策制定者指引航向。"
        ]
      }
    ]
  },
  ckb: {
    sections: [
      {
        heading: "١. پێویستی مێژوویی و ستراتیژی و ڕێگای ئاوریشم",
        paragraphs: [
          "سەردەمی مۆدێرن بە پەیوەندی قووڵی نێوان نەتەوەکان دەناسرێتەوە کە تێیدا چارەنووسی ئابووری، سیاسی و کولتووری بەستراونەتەوە بەیەکەوە. لە نێوان گرنگترین ئەم هاوبەشییانەدا، پەیوەندی نێوان کۆماری گەلی چین و کۆماری عێراقە کە ڕەگی لە مێژووی ڕێگای ئاوریشمی کۆندایە و لە ڕێگەی دەستپێشخەری پشتوێن و ڕێگاوە زیندوو کراوەتەوە.",
          "بە پەیوەندیکردن بە ئاژانسی عێراقی - چینی و تۆڕی دەزگاکان، ئەندامان دەستڕاگەیشتنی بێوێنەیان دەبێت بە لێشاوی زانیاری سەربەخۆ کە بۆشایی نێوان ڕۆژهەڵاتی ئاسیا و ڕۆژهەڵاتی ناوەڕاست پڕ دەکاتەوە. ئەمەش یارمەتیدەرە لە بەڕێوەبردنی وەبەرهێنانە گەورەکانی وەک بەندەری فاو و تۆڕەکانی وزە لە ڕێگەی زانیاری ورد و کرداری."
        ]
      },
      {
        heading: "٢. دەروازە ئابوورییەکان، بەندەری فاو و هاوبەشی بازرگانی B2B",
        paragraphs: [
          "ناوەڕۆکی پەیوەندی عێراق و چین بریتییە لە بوژانەوەی ئابووری دوولایەنە. عێراق هەوڵی نوێکردنەوەی کەرتی پیشەسازی و لۆجیستی دەدات، لە کاتێکدا چین بەدوای دابینکردنی سەلامەتی مەرجەکانی وزە و هەناردەکردنی تەکنەلۆژیادایە. ئەم هاوتەریبییە زەمینەیەکی بەپیت بۆ پڕۆژە هاوبەشەکان دەڕەخسێنێت.",
          "هاوکاری لە ڕێگەی تۆڕی ئاژانسەوە سوودێکی کێبڕکێکاری گەورە بە کۆمپانیاکان دەبەخشێت. بە بەستنەوەی ڕاستەوخۆ بە بنکەدراوەکەمان، کۆمپانیاکان ئاماری پێشکەوتووی بازاڕ، پێڕستی کۆمپانیاکان و گومرگی هەرێمی بەدەستدەهێنن، کە مەترسییە یاساییەکان کەمدەکاتەوە بە درێژایی ڕێگای گەشەپێدان."
        ]
      },
      {
        heading: "٣. هاوپەیمانی ئەکادیمی، ناوەندەکانی بیرکردنەوە و پێوەرەکان",
        paragraphs: [
          "جگە لە بازرگانی، بەردەوامی هەر پەیوەندییەکی دوولایەنە لەسەر بنەمای تێگەیشتنی هاوبەش و ئاڵوگۆڕی فەرهەنگی و زانستی بەندە. هاوپەیمانی نێوان زانکۆ پێشەنگەکانی بەغداد، بەسرە و پەکین زەمینەی توێژینەوەی هاوبەش لە بواری ژیری دەستکرد و کشتوکاڵی بەردەوام دادەمەزرێنێت.",
          "ئێمە برەو بە گفتوگۆی ئەکادیمی دەدەین لە ڕێگەی وەرگێڕانی توێژینەوە ئاڵۆزەکان بۆ شێوازی سێزمانەی ڕوون. ئەمەش گواستنەوەی مەعریفە بە هەردوو ئاراستەکەدا مسۆگەر دەکات و دامەزراوەکانی ناوچەکە دەوڵەمەند دەکات بە نوێترین پێشکەوتنەکان."
        ]
      },
      {
        heading: "٤. سەربەخۆیی زمانەوانی سێزمانە و کەناڵەکانی زانیاری",
        paragraphs: [
          "لە سەردەمی خێرایی گواستنەوەی زانیاریدا، وەرگێڕان و بڵاوکردنەوەی هەواڵ دەبێت ورد، خێرا و هاوتەریب بێت لەگەڵ تایبەتمەندییە کولتوورییەکان. ئاژانسی عێراقی - چینی ماتریکسی پێشکەوتووی زمانەوانی بەکاردەهێنێت بۆ ئامادەکردنی ڕاپۆرتەکان بە زمانەکانی چینی، عەرەبی، کوردی و ئینگلیزی.",
          "تۆڕی زانیاریمان بەردەوام چاودێری گۆڕانکارییە سیاسی و ئابوورییەکان دەکات. بە بەشداریکردنت لەم تۆڕەدا، تۆ دەبەسترێیتەوە بە سیستەمێکی چالاک کە پێشبینی ڕەوتە ئابوورییەکان دەکات، کە ئەمەش گرنگییەکی بێوێنەی هەیە بۆ دیپلۆماتکاران و داڕێژەرانی سیاسەت بە درێژایی ڕێگای ئاوریشم."
        ]
      }
    ]
  }
};

interface FormDataState {
  fullName: string;
  email: string;
  company: string;
  role: string;
  nationality: string;
  passportOrIdNumber: string;
  asaishCode: string;
  iraqiInfoCard: string;
  addressHouseNo: string;
  addressStreetNo: string;
  addressDistrictName: string;
  addressDistrictNumber: string;
  phoneNumber: string;
  dateOfBirth: string;
  emergencyContact: string;
  bio: string;
}

export function JoinUs() {
  const { lang } = useParams<{ lang: Locale }>();
  const currentLang = ['en', 'ar', 'zh', 'ckb'].includes(lang || '') ? (lang as Locale) : 'en';
  const t = translations[currentLang];
  const e = essayTranslation[currentLang];
  const isRtl = currentLang === 'ar' || currentLang === 'ckb';

  const [formData, setFormData] = useState<FormDataState>({
    fullName: '',
    email: '',
    company: '',
    role: 'editorial',
    nationality: '',
    passportOrIdNumber: '',
    asaishCode: '',
    iraqiInfoCard: '',
    addressHouseNo: '',
    addressStreetNo: '',
    addressDistrictName: '',
    addressDistrictNumber: '',
    phoneNumber: '',
    dateOfBirth: '',
    emergencyContact: '',
    bio: ''
  });

  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState<{ hash: string; bureau: string; timestamp: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const badgeCardRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const n = { ...prev };
        delete n[name];
        return n;
      });
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (uploadedFile: File) => {
    if (uploadedFile.type !== 'application/pdf') {
      setErrors(prev => ({ ...prev, file: t.fileTypeErr }));
      setFile(null);
      return;
    }
    setFile(uploadedFile);
    if (errors.file) {
      setErrors(prev => {
        const n = { ...prev };
        delete n.file;
        return n;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = t.required;
    
    if (!formData.email.trim()) {
      newErrors.email = t.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    if (!formData.company.trim()) newErrors.company = t.required;
    if (!formData.asaishCode.trim()) newErrors.asaishCode = t.required;
    if (!formData.bio.trim()) newErrors.bio = t.required;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      scrollToForm();
      return;
    }

    setIsSubmitting(true);

    let assignedBureau = 'Baghdad HQ Newsroom & Diplomatic Secretariat';
    if (currentLang === 'ar') {
      if (formData.role === 'editorial') assignedBureau = 'غرفة أخبار مكتب بغداد المركزي والأمانة العامة';
      else if (formData.role === 'translation') assignedBureau = 'مكتب بكين للترجمة والارتباط الدبلوماسي';
      else if (formData.role === 'macroeconomic') assignedBureau = 'مركز أبحاث الحزام والطريق واقتصاد الطاقة';
      else if (formData.role === 'b2b') assignedBureau = 'سجل جمارك ولوجستيات البصرة - ميناء الفاو';
      else if (formData.role === 'research') assignedBureau = 'المجلس الأكاديمي والسياساتي المشترك';
      else assignedBureau = 'غرفة أخبار مكتب بغداد المركزي والأمانة العامة';
    } else if (currentLang === 'zh') {
      if (formData.role === 'editorial') assignedBureau = '北京中央总社外交采编与总秘书处';
      else if (formData.role === 'translation') assignedBureau = '三语语言主权与法理语境本地化编译局';
      else if (formData.role === 'macroeconomic') assignedBureau = '中伊能源与一带一路宏观智库办公室';
      else if (formData.role === 'b2b') assignedBureau = '巴士拉港务海关与法奥大港物流中心';
      else if (formData.role === 'research') assignedBureau = '学术委员会与跨国政策学者专家办公室';
      else assignedBureau = '北京中央总社外交采编与总秘书处';
    } else if (currentLang === 'ckb') {
      if (formData.role === 'editorial') assignedBureau = 'ژووری هەواڵی ئۆفیسی بەغدادی سەرەکی و سکرتاریەت';
      else if (formData.role === 'translation') assignedBureau = 'نووسینگەی هەولێر بۆ وەرگێڕان و خۆماڵیکردن';
      else if (formData.role === 'macroeconomic') assignedBureau = 'ناوەندی لێکۆڵینەوەی ئابووری وزە و ڕێگای پشتوێن';
      else if (formData.role === 'b2b') assignedBureau = 'تۆماری گومرگ و لۆجیستی بەسرە - بەندەری فاو';
      else if (formData.role === 'research') assignedBureau = 'ئەنجومەنی توێژینەوەی ئەکادیمی و سیاسەت';
      else assignedBureau = 'ژووری هەواڵی ئۆفیسی بەغدادی سەرەکی و سکرتاریەت';
    } else {
      if (formData.role === 'editorial') assignedBureau = 'Baghdad HQ Newsroom & Diplomatic Secretariat';
      else if (formData.role === 'translation') assignedBureau = 'Beijing Bureau Linguistic & Translation Directorate';
      else if (formData.role === 'macroeconomic') assignedBureau = 'Macroeconomic & Energy Intelligence Desk';
      else if (formData.role === 'b2b') assignedBureau = 'Basra Hub Customs & Al Faw Port Desk';
      else if (formData.role === 'research') assignedBureau = 'Academic Policy Council & Fellowships';
      else assignedBureau = 'Baghdad HQ Newsroom & Diplomatic Secretariat';
    }

    const randomHash = 'CQ-' + Math.floor(Math.random() * 90000 + 10000) + '-' + Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase();

    try {
      let fileUrl = '';
      if (file) {
        fileUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      }

      const res = await fetch('/api/public/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          company: formData.company,
          role: formData.role,
          bio: formData.bio,
          hash: randomHash,
          bureau: assignedBureau,
          fileUrl,
          nationality: formData.nationality,
          passportOrIdNumber: formData.passportOrIdNumber,
          asaishCode: formData.asaishCode,
          iraqiInfoCard: formData.iraqiInfoCard,
          addressHouseNo: formData.addressHouseNo,
          addressStreetNo: formData.addressStreetNo,
          addressDistrictName: formData.addressDistrictName,
          addressDistrictNumber: formData.addressDistrictNumber,
          phoneNumber: formData.phoneNumber,
          dateOfBirth: formData.dateOfBirth,
          emergencyContact: formData.emergencyContact
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Ledger write operation failed.');
      }

      setReceiptData({
        hash: randomHash,
        bureau: assignedBureau,
        timestamp: new Date().toUTCString()
      });

      setSubmitSuccess(true);
    } catch (err: any) {
      console.error(err);
      setErrors(prev => ({ ...prev, file: err.message || 'System error submitting credentials' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!badgeCardRef.current) return;
    try {
      const canvas = await html2canvas(badgeCardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 800
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `ICA-Credential-Badge-${receiptData?.hash || 'Candidate'}.png`;
      link.click();
    } catch (err) {
      console.error('Failed to export badge PNG', err);
      alert('Could not export badge PNG.');
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      company: '',
      role: 'editorial',
      nationality: '',
      passportOrIdNumber: '',
      asaishCode: '',
      iraqiInfoCard: '',
      addressHouseNo: '',
      addressStreetNo: '',
      addressDistrictName: '',
      addressDistrictNumber: '',
      phoneNumber: '',
      dateOfBirth: '',
      emergencyContact: '',
      bio: ''
    });
    setFile(null);
    setSubmitSuccess(false);
    setReceiptData(null);
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 shadow-xs border-x border-brand-800/10 dark:border-neutral-800 p-4 sm:p-6 md:p-8 text-start" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Editorial Header Card */}
      <div className="border-b-4 border-brand-800 pb-4 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-brand-900 dark:text-white uppercase">
            {t.title}
          </h2>
          <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-bold mt-2 uppercase tracking-widest">
            {t.subtitle}
          </p>
        </div>
        <button 
          onClick={scrollToForm}
          className="bg-brand-800 hover:bg-brand-700 text-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm self-start md:self-auto flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Award className="w-4 h-4" />
          {t.applyButton}
        </button>
      </div>

      {/* Grid: Essay on Left, Pitch/Action Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Hand: Strategic Essay */}
        <div className="lg:col-span-7 space-y-8 prose prose-neutral dark:prose-invert max-w-none text-base md:text-lg leading-relaxed text-neutral-800 dark:text-neutral-200">
          
          {/* Why Collaborate Box */}
          <div className="bg-brand-800 text-white p-6 md:p-8 border-l-4 border-brand-900 shadow-sm rounded-xs">
            <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-white" />
              {t.aboutSecTitle}
            </h3>
            <p className="text-xs md:text-sm leading-relaxed opacity-95 text-justify">
              {t.aboutSecDesc}
            </p>
          </div>

          {/* Structured Essay Sections */}
          {e.sections.map((section, idx) => (
            <div key={idx} className="border-b border-neutral-200 dark:border-neutral-800 pb-6 last:border-0">
              <h3 className="text-xl md:text-2xl font-black text-brand-900 dark:text-white mb-4">
                {section.heading}
              </h3>
              <div className="space-y-4">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-justify leading-relaxed text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Hand: Interactive Application Form Column */}
        <div ref={formRef} className="lg:col-span-5 bg-white dark:bg-neutral-800/90 border-2 border-brand-800 p-5 md:p-6 shadow-sm relative rounded-xs">
          
          <AnimatePresence mode="wait">
            {!submitSuccess ? (
              <motion.div
                key="form-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-b-2 border-double border-brand-800 pb-3 mb-5">
                  <h3 className="text-lg font-black uppercase text-brand-900 dark:text-white flex items-center gap-1.5">
                    {t.formTitle}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider mt-1 leading-normal">
                    {t.formSubtitle}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Legal Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-brand-800 dark:text-brand-400" />
                      {t.fullName} <span className="text-brand-800">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Dr. Ahmed Al-Darraji"
                      className={`w-full text-xs border ${errors.fullName ? 'border-brand-800 bg-brand-50/20' : 'border-neutral-300 dark:border-neutral-700 bg-paper-50 dark:bg-neutral-900 text-brand-900 dark:text-white focus:border-brand-800'} p-2.5 focus:outline-none transition-colors`}
                    />
                    {errors.fullName && <p className="text-xs font-bold text-brand-800 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Professional Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-brand-800 dark:text-brand-400" />
                      {t.email} <span className="text-brand-800">*</span>
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="candidate@diplomacy-iq.com"
                      className={`w-full text-xs border ${errors.email ? 'border-brand-800 bg-brand-50/20' : 'border-neutral-300 dark:border-neutral-700 bg-paper-50 dark:bg-neutral-900 text-brand-900 dark:text-white focus:border-brand-800'} p-2.5 focus:outline-none transition-colors`}
                    />
                    {errors.email && <p className="text-xs font-bold text-brand-800 mt-1">{errors.email}</p>}
                  </div>

                  {/* Company / Affiliation */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-brand-800 dark:text-brand-400" />
                      {t.company} <span className="text-brand-800">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Baghdad Diplomatic Bureau"
                      className={`w-full text-xs border ${errors.company ? 'border-brand-800 bg-brand-50/20' : 'border-neutral-300 dark:border-neutral-700 bg-paper-50 dark:bg-neutral-900 text-brand-900 dark:text-white focus:border-brand-800'} p-2.5 focus:outline-none transition-colors`}
                    />
                    {errors.company && <p className="text-xs font-bold text-brand-800 mt-1">{errors.company}</p>}
                  </div>

                  {/* Track / Role Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1 flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-brand-800 dark:text-brand-400" />
                      {t.role}
                    </label>
                    <select 
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full text-xs border border-neutral-300 dark:border-neutral-700 bg-paper-50 dark:bg-neutral-900 text-brand-900 dark:text-white p-2.5 focus:outline-none focus:border-brand-800 appearance-none"
                    >
                      {t.roles.map(r => (
                        <option key={r.id} value={r.id}>{r.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Nationality & Passport / ID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">{t.nationality}</label>
                      <input 
                        type="text" 
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        className="w-full text-xs border border-neutral-300 dark:border-neutral-700 bg-paper-50 dark:bg-neutral-900 text-brand-900 dark:text-white p-2.5 focus:outline-none focus:border-brand-800"
                        placeholder="Iraqi / Chinese"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">{t.passportOrIdNumber}</label>
                      <input 
                        type="text" 
                        name="passportOrIdNumber"
                        value={formData.passportOrIdNumber}
                        onChange={handleInputChange}
                        className="w-full text-xs border border-neutral-300 dark:border-neutral-700 bg-paper-50 dark:bg-neutral-900 text-brand-900 dark:text-white p-2.5 focus:outline-none focus:border-brand-800 uppercase"
                        placeholder="IQ-2026-XXXX"
                      />
                    </div>
                  </div>

                  {/* Asaish Code & Iraqi Info Card */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-800 dark:text-brand-400 mb-1">
                        {t.asaishCode} <span className="text-brand-800">*</span>
                      </label>
                      <input 
                        type="text" 
                        name="asaishCode"
                        value={formData.asaishCode}
                        onChange={handleInputChange}
                        className={`w-full text-xs border ${errors.asaishCode ? 'border-brand-800 bg-brand-50/20' : 'border-neutral-300 dark:border-neutral-700 bg-paper-50 dark:bg-neutral-900 text-brand-900 dark:text-white focus:border-brand-800'} p-2.5 focus:outline-none uppercase font-bold`}
                        placeholder="AS-2026-XXXX"
                      />
                      {errors.asaishCode && <p className="text-xs font-bold text-brand-800 mt-1">{errors.asaishCode}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">{t.iraqiInfoCard}</label>
                      <input 
                        type="text" 
                        name="iraqiInfoCard"
                        value={formData.iraqiInfoCard}
                        onChange={handleInputChange}
                        className="w-full text-xs border border-neutral-300 dark:border-neutral-700 bg-paper-50 dark:bg-neutral-900 text-brand-900 dark:text-white p-2.5 focus:outline-none focus:border-brand-800 font-mono"
                        placeholder="Card No / Tamween"
                      />
                    </div>
                  </div>

                  {/* Structured Address Block */}
                  <div className="bg-paper-50 dark:bg-neutral-900/90 p-3.5 border border-neutral-200 dark:border-neutral-700 space-y-2.5">
                    <span className="block text-xs font-black uppercase tracking-wider text-brand-900 dark:text-white">
                      Administrative Address Dossier
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-neutral-500 dark:text-neutral-400 uppercase font-bold mb-1">{t.addressHouseNo}</label>
                        <input 
                          type="text" 
                          name="addressHouseNo"
                          value={formData.addressHouseNo}
                          onChange={handleInputChange}
                          className="w-full text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-brand-900 dark:text-white p-2 focus:outline-none focus:border-brand-800"
                          placeholder="House 14"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-neutral-500 dark:text-neutral-400 uppercase font-bold mb-1">{t.addressStreetNo}</label>
                        <input 
                          type="text" 
                          name="addressStreetNo"
                          value={formData.addressStreetNo}
                          onChange={handleInputChange}
                          className="w-full text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-brand-900 dark:text-white p-2 focus:outline-none focus:border-brand-800"
                          placeholder="Street 62"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-neutral-500 dark:text-neutral-400 uppercase font-bold mb-1">{t.addressDistrictName}</label>
                        <input 
                          type="text" 
                          name="addressDistrictName"
                          value={formData.addressDistrictName}
                          onChange={handleInputChange}
                          className="w-full text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-brand-900 dark:text-white p-2 focus:outline-none focus:border-brand-800"
                          placeholder="Al-Karrada"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-neutral-500 dark:text-neutral-400 uppercase font-bold mb-1">{t.addressDistrictNumber}</label>
                        <input 
                          type="text" 
                          name="addressDistrictNumber"
                          value={formData.addressDistrictNumber}
                          onChange={handleInputChange}
                          className="w-full text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-brand-900 dark:text-white p-2 focus:outline-none focus:border-brand-800"
                          placeholder="District 902"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone & Date of Birth */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">{t.phoneNumber}</label>
                      <input 
                        type="text" 
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full text-xs border border-neutral-300 dark:border-neutral-700 bg-paper-50 dark:bg-neutral-900 text-brand-900 dark:text-white p-2.5 focus:outline-none focus:border-brand-800 font-mono"
                        placeholder="+964 780 000 0000"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">{t.dateOfBirth}</label>
                      <input 
                        type="date" 
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full text-xs border border-neutral-300 dark:border-neutral-700 bg-paper-50 dark:bg-neutral-900 text-brand-900 dark:text-white p-2.5 focus:outline-none focus:border-brand-800 font-mono"
                      />
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">{t.emergencyContact}</label>
                    <input 
                      type="text" 
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full text-xs border border-neutral-300 dark:border-neutral-700 bg-paper-50 dark:bg-neutral-900 text-brand-900 dark:text-white p-2.5 focus:outline-none focus:border-brand-800"
                      placeholder="Baghdad Security Bureau HQ"
                    />
                  </div>

                  {/* Statement of purpose */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                      {t.bio} <span className="text-brand-800">*</span>
                    </label>
                    <textarea 
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder={t.bioPlaceholder}
                      className={`w-full text-xs border ${errors.bio ? 'border-brand-800 bg-brand-50/20' : 'border-neutral-300 dark:border-neutral-700 bg-paper-50 dark:bg-neutral-900 text-brand-900 dark:text-white focus:border-brand-800'} p-2.5 focus:outline-none transition-colors resize-none`}
                    />
                    {errors.bio && <p className="text-xs font-bold text-brand-800 mt-1">{errors.bio}</p>}
                  </div>

                  {/* File Upload Zone */}
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                      {t.fileLabel}
                    </span>
                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed p-4 text-center cursor-pointer transition-all ${
                        dragActive ? 'border-brand-800 bg-brand-50/20 dark:bg-brand-950/30' : 'border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 hover:border-brand-800'
                      }`}
                    >
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      
                      {!file ? (
                        <div className="space-y-1.5 py-1">
                          <Upload className="w-5 h-5 mx-auto text-neutral-400 dark:text-neutral-500" />
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider">
                            {t.fileDrag}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-2 text-start">
                          <div className="flex items-center gap-1.5 overflow-hidden">
                            <FileText className="w-5 h-5 text-brand-800 dark:text-brand-400 shrink-0" />
                            <span className="text-xs font-bold truncate text-brand-900 dark:text-white">
                              {file.name}
                            </span>
                          </div>
                          <span className="text-[8px] uppercase bg-brand-800 text-white px-2 py-0.5 font-bold">
                            PDF Ready
                          </span>
                        </div>
                      )}
                    </div>
                    {errors.file && <p className="text-xs font-bold text-brand-800 mt-1">{errors.file}</p>}
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-brand-800 hover:bg-brand-700 text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>{t.submitting}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{t.submit}</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              /* Success & Downloadable Official Credential Badge View */
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <div className="text-center py-2">
                  <CheckCircle className="w-12 h-12 text-brand-800 dark:text-brand-400 mx-auto mb-2.5 animate-bounce" />
                  <h3 className="text-lg font-black text-brand-800 dark:text-brand-400 uppercase">
                    {t.successTitle}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider mt-1">
                    Iraqi-Chinese Agency Sovereign Registry Ledger & DB Synchronized
                  </p>
                </div>

                {/* Sovereign Credential Badge Card */}
                <div ref={badgeCardRef} className="bg-white dark:bg-neutral-900 border-2 border-brand-800 p-5 shadow-sm space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-brand-800/10 rounded-full -mr-14 -mt-14 pointer-events-none" />
                  
                  <div className="flex justify-between items-start border-b-2 border-brand-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-brand-800 text-white flex items-center justify-center font-black text-lg">
                        ICA
                      </div>
                      <div>
                        <h4 className="font-black text-sm uppercase text-brand-900 dark:text-white">Iraqi-Chinese Agency</h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest font-bold">
                          Accredited Press & Fellowship Credential
                        </p>
                      </div>
                    </div>
                    <div className="bg-brand-50 dark:bg-brand-950/60 border border-brand-800/30 px-2 py-1 text-right">
                      <span className="text-[8px] block text-neutral-400 uppercase">Audit Status</span>
                      <span className="text-xs font-bold text-brand-800 dark:text-brand-400">VERIFIED / RECORDED</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 text-[11px] font-mono">
                    <div>
                      <span className="text-xs text-neutral-400 block uppercase font-bold tracking-wider">{t.fullName}</span>
                      <span className="font-bold text-brand-900 dark:text-white">{formData.fullName}</span>
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400 block uppercase font-bold tracking-wider">{t.email}</span>
                      <span className="font-bold text-brand-900 dark:text-white truncate block">{formData.email}</span>
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400 block uppercase font-bold tracking-wider">{t.asaishCode}</span>
                      <span className="font-bold text-brand-800 dark:text-brand-400 uppercase">{formData.asaishCode}</span>
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400 block uppercase font-bold tracking-wider">{t.iraqiInfoCard}</span>
                      <span className="font-bold text-brand-900 dark:text-white">{formData.iraqiInfoCard || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400 block uppercase font-bold tracking-wider">{t.company}</span>
                      <span className="font-bold text-brand-900 dark:text-white">{formData.company}</span>
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400 block uppercase font-bold tracking-wider">{t.role}</span>
                      <span className="font-bold text-brand-800 dark:text-brand-400 capitalize">{formData.role}</span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-neutral-200 dark:border-neutral-700">
                      <span className="text-xs text-neutral-400 block uppercase font-bold tracking-wider">Administrative Address</span>
                      <span className="font-bold text-neutral-700 dark:text-neutral-300 text-xs">
                        House {formData.addressHouseNo || '—'}, Street {formData.addressStreetNo || '—'}, {formData.addressDistrictName || '—'} (Dist. {formData.addressDistrictNumber || '—'})
                      </span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                      <div>
                        <span className="text-[8px] text-neutral-400 block uppercase">{t.appId}</span>
                        <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 font-mono">{receiptData?.hash}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] text-neutral-400 block uppercase">{t.bureauAssigned}</span>
                        <span className="text-xs font-bold text-brand-800 dark:text-brand-400">{receiptData?.bureau}</span>
                      </div>
                    </div>
                  </div>

                  {/* Security barcode pattern */}
                  <div className="pt-2 border-t border-dashed border-neutral-300 dark:border-neutral-700 flex items-center justify-between">
                    <span className="text-[8px] tracking-widest text-neutral-400 uppercase">
                      SEC-ICA-REG-2026-SHA256
                    </span>
                    <span className="text-[8px] font-bold text-neutral-500">
                      {receiptData?.timestamp}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleDownloadPdf}
                    className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    {t.downloadPdf}
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.print()}
                      className="flex-1 py-2 bg-brand-800 hover:bg-brand-700 text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      {t.printReceipt}
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-bold uppercase tracking-widest hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      {t.resetForm}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
