import { useState, useRef, FormEvent, DragEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Locale } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  CheckCircle, 
  Upload, 
  X, 
  FileText, 
  Building, 
  User, 
  Mail, 
  Briefcase, 
  Printer, 
  RotateCcw,
  Sparkles,
  Award
} from 'lucide-react';

const translations = {
  en: {
    title: 'Join Us: Strategic Partnership & Network',
    subtitle: 'Apply to join the elite trilingual ChinQ Media Group & Enterprise Intelligence Network',
    applyButton: 'Apply for Partnership',
    aboutSecTitle: 'Why Collaborate With Us?',
    aboutSecDesc: 'By joining ChinQ, you are entering an elite network of policymakers, investors, and thought leaders. You gain access to real-time enterprise intelligence, cross-border B2B directories, and a localized stream of geopolitical data. We bridge the gap between East Asia and the Middle East, offering a transformative platform for the 21st century.',
    formTitle: 'Partnership & Editorial Application',
    formSubtitle: 'Please submit your credentials to initiate sovereign vetting and verification.',
    fullName: 'Full Name',
    email: 'Professional Email Address',
    company: 'Affiliation or Organization',
    role: 'Preferred Role / Track',
    roles: [
      { id: 'editorial', label: 'Journalism & Editorial Team' },
      { id: 'translation', label: 'Trilingual Translation & Localization (AR/ZH/CKB)' },
      { id: 'b2b', label: 'B2B Commerce & Strategic Investment' },
      { id: 'research', label: 'Academic Research & Policy Analysis' }
    ],
    bio: 'Statement of Purpose / Professional Background',
    bioPlaceholder: 'Describe your interest and experience in Sino-Iraqi strategic alignment...',
    fileLabel: 'Upload Curriculum Vitae / Enterprise Dossier (PDF)',
    fileDrag: 'Drag and drop your PDF here, or click to browse',
    submit: 'Submit Partnership Application',
    submitting: 'Initiating Sovereign Credentials Audit...',
    successTitle: 'Application Logged & Vetted',
    successDesc: 'Your partnership dossier has been securely logged into the ChinQ Sovereign Intelligence Ledger. Our editorial board and regional bureau officers will audit your credentials.',
    appId: 'Registration Hash',
    bureauAssigned: 'Processing Bureau',
    nextStepsTitle: 'Next Steps',
    nextSteps: [
      'The designated regional bureau will audit your professional credentials and affiliation within 48 business hours.',
      'A secure verification code will be dispatched to your provided professional email address.',
      'Upon clearance, you will be granted access to the private research studies, bilateral databases, and B2B directories.'
    ],
    printReceipt: 'Print Registry Receipt',
    resetForm: 'Submit New Application',
    required: 'This field is required',
    invalidEmail: 'Please enter a valid professional email address',
    fileTypeErr: 'Only PDF documents are accepted for strategic vetting'
  },
  ar: {
    title: 'انضم إلينا: الشراكة الاستراتيجية والشبكة',
    subtitle: 'تقدم بطلب للانضمام إلى نخبة شبكة تشينك الإعلامية الثلاثية واستخبارات المؤسسات',
    applyButton: 'التقدم بطلب للشراكة',
    aboutSecTitle: 'لماذا تتعاون معنا؟',
    aboutSecDesc: 'من خلال الانضمام إلى تشينك، فإنك تدخل في شبكة نخبوية من صناع السياسات والمستثمرين وقادة الفكر. ستحصل على إمكانية الوصول إلى استخبارات المؤسسات في الوقت الفعلي، وأدلة الأعمال التجارية العابرة للحدود، وموجز البيانات الجيوسياسية المحلية. نحن نسد الفجوة بين شرق آسيا والشرق الأوسط، ونقدم منصة تحويلية للقرن الحادي والعشرين.',
    formTitle: 'طلب الشراكة والتسجيل التحريري',
    formSubtitle: 'يرجى تقديم بيانات اعتمادك لبدء الفحص والتدقيق السيادي.',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني المهني',
    company: 'المؤسسة أو الجهة التابعة',
    role: 'الدور / المسار المفضل',
    roles: [
      { id: 'editorial', label: 'الصحافة والفريق التحريري' },
      { id: 'translation', label: 'الترجمة الثلاثية والتعريب (عربي/صيني/كردي)' },
      { id: 'b2b', label: 'تجارة B2B والاستثمار الاستراتيجي' },
      { id: 'research', label: 'البحث الأكاديمي وتحليل السياسات' }
    ],
    bio: 'بيان الغرض / الخلفية المهنية',
    bioPlaceholder: 'صف اهتمامك وخبرتك في المواءمة الاستراتيجية الصينية العراقية...',
    fileLabel: 'تحميل السيرة الذاتية / ملف المؤسسة (PDF)',
    fileDrag: 'اسحب وأفلت ملف PDF هنا، أو انقر للتصفح',
    submit: 'إرسال طلب الشراكة',
    submitting: 'بدء تدقيق بيانات الاعتماد السيادية...',
    successTitle: 'تم تسجيل الطلب وتدقيقه',
    successDesc: 'تم تسجيل ملف الشراكة الخاص بك بأمان في سجل استخبارات تشينك السيادي. سيقوم مجلس التحرير ومسؤولو المكاتب الإقليمية بمراجعة بيانات اعتمادك.',
    appId: 'هاش التسجيل',
    bureauAssigned: 'مكتب المعالجة',
    nextStepsTitle: 'الخطوات التالية',
    nextSteps: [
      'سيقوم المكتب الإقليمي المعين بمراجعة مؤهلاتك المهنية وجهتك التابعة في غضون 48 ساعة عمل.',
      'سيتم إرسال رمز تحقق آمن إلى بريدك الإلكتروني المهني المقدم.',
      'عند الموافقة، سيتم منحك حق الوصول إلى دراسات الأبحاث الخاصة، قواعد البيانات الثنائية، وأدلة B2B.'
    ],
    printReceipt: 'طباعة إيصال السجل',
    resetForm: 'تقديم طلب جديد',
    required: 'هذا الحقل مطلوب',
    invalidEmail: 'يرجى إدخال بريد إلكتروني مهني صالح',
    fileTypeErr: 'يتم قبول مستندات PDF فقط للتدقيق الاستراتيجي'
  },
  zh: {
    title: '加入我们：战略合作与网络',
    subtitle: '申请加入精英级 ChinQ 三语媒体集团与企业情报网络',
    applyButton: '申请战略合作',
    aboutSecTitle: '为什么选择与我们合作？',
    aboutSecDesc: '加入 ChinQ 即意味着您进入了一个由政策制定者、投资者和思想领袖组成的精英网络。您将获得对实时企业情报、跨境 B2B 目录以及本地化地缘政治数据流的访问权限。我们架起了东亚与中东之间的桥梁，为21世纪提供了一个具有变革意义的协作平台。',
    formTitle: '合作伙伴与编辑注册申请',
    formSubtitle: '请提交您的专业资质，以便启动主权级审核和背景核查。',
    fullName: '姓名',
    email: '专业电子邮箱',
    company: '所属机构/公司名称',
    role: '意向角色 / 专业方向',
    roles: [
      { id: 'editorial', label: '新闻与编辑团队' },
      { id: 'translation', label: '三语翻译与本地化 (阿/中/库)' },
      { id: 'b2b', label: 'B2B贸易与战略投资' },
      { id: 'research', label: '学术研究与政策分析' }
    ],
    bio: '合作目的陈述 / 专业背景简介',
    bioPlaceholder: '请描述您在中伊战略协作与共同利益方面的研究意向或从业经验...',
    fileLabel: '上传个人简历 / 企业白皮书 (PDF格式)',
    fileDrag: '将 PDF 文件拖拽至此处，或点击浏览文件',
    submit: '提交合作伙伴申请',
    submitting: '正在启动主权资质审核...',
    successTitle: '申请已成功录入并初审',
    successDesc: '您的战略合作档案已安全录入中伊传媒主权情报账本。我们的编辑委员会和区域分社官员将对您的资历进行深度审计。',
    appId: '登记哈希值',
    bureauAssigned: '受理分社机构',
    nextStepsTitle: '后续步骤',
    nextSteps: [
      '指定的区域分社机构将在 48 个工作小时内完成对您专业背景和所属机构的合规审查。',
      '安全验证码将发送至您提供的专业电子邮箱。',
      '审核通过后，您将获得对私密研究报告、双边商贸数据库及内部 B2B 目录的完全访问权限。'
    ],
    printReceipt: '打印登记凭证',
    resetForm: '提交新申请',
    required: '此字段为必填项',
    invalidEmail: '请输入有效的专业邮箱地址',
    fileTypeErr: '仅支持 PDF 格式的文件进行战略资质审核'
  },
  ckb: {
    title: 'پەیوەندیمان پێوە بکە: هاوبەشی ستراتیژی و تۆڕ',
    subtitle: 'داواکاری پێشکەش بکە بۆ بەشداریکردن لە گرووپی میدیایی و تۆڕی هەواڵگری تشینکی سێزمانە',
    applyButton: 'پێشکەشکردنی داواکاری بۆ هاوبەشی',
    aboutSecTitle: 'بۆچی هاوکاری ئێمە دەکەیت؟',
    aboutSecDesc: 'بە پەیوەندیکردن بە چینک، تۆ دێیتە ناو تۆڕێکی بژاردەی داڕێژەرانی سیاسەت، وەبەرهێنەران و سەرکردە فیکرییەکان. دەستڕاگەیشتنت دەبێت بە زانیاری بازرگانی کاتی ڕاستەقینە، پێڕستەکانی بازرگانی نێوان دەزگاکان، و تەزوویەکی لۆکاڵی داتای جیۆپۆلەتیکی. ئێمە بۆشایی نێوان ڕۆژهەڵاتی ئاسیا و ڕۆژهەڵاتی ناوەڕاست پڕ دەکەینەوە، و پلاتفۆرمێکی گۆڕانکاری بۆ سەدەی ٢١ پێشکەش دەکەین.',
    formTitle: 'داواکاری هاوبەشی و ناونووسینی سەرنووسەران',
    formSubtitle: 'تکایە بەڵگەنامەکانی لێهاتووییت بنێرە بۆ دەستپێکردنی پشکنین و وردبینی فەرمی.',
    fullName: 'ناوی تەواو',
    email: 'ئیمەیڵی پیشەیی',
    company: 'دەزگا یان ڕێکخراو',
    role: 'ڕێڕەو / ڕۆڵی ویستراو',
    roles: [
      { id: 'editorial', label: 'ڕۆژنامەگەری و تیمی سەرنووسەرایەتی' },
      { id: 'translation', label: 'وەرگێڕان و خۆماڵیکردنی سێزمانە (عەرەبی/صینی/کوردی)' },
      { id: 'b2b', label: 'بازرگانی B2B و وەبەرهێنانی ستراتیژی' },
      { id: 'research', label: 'توێژینەوەی ئەکادیمی و شیکردنەوەی سیاسی' }
    ],
    bio: 'بەیانی مەبەست / پاشخانی پیشەیی',
    bioPlaceholder: 'پەسنی ئارەزوو و ئەزموونی خۆت بکە لە هاوتەریببوونی ستراتیژی عێراق و چین...',
    fileLabel: 'بارکردنی سیڤی / دۆسیەی دەزگا (PDF)',
    fileDrag: 'پەڕگەی PDF لێرە دابنێ، یان کلیک بکە بۆ گەڕان',
    submit: 'ناردنی داواکاری هاوبەشی',
    submitting: 'دەستپێکردنی وردبینی بەڵگەنامە فەرمییەکان...',
    successTitle: 'داواکارییەکە تۆمارکرا و پشکنرا',
    successDesc: 'دۆسیەی هاوبەشیت بە سەلامەتی لە تۆماری هەواڵگری فەرمی چینکدا تۆمارکراوە. دەستەی سەرنووسەران و ئەندامانی نووسینگەی هەرێمی چاودێری لێهاتووییت دەکەن.',
    appId: 'هاشی تۆمارکردن',
    bureauAssigned: 'نووسینگەی چارەسەرکردن',
    nextStepsTitle: 'هەنگاوەکانی داهاتوو',
    nextSteps: [
      'نووسینگەی هەرێمی دیاریکراو لە ماوەی ٤٨ کاتژمێری کاری پشکنین بۆ لێهاتوویی پیشەیی و دەزگاکەت دەکات.',
      'کۆدێکی سەلامەتی دەنێردرێت بۆ ئیمەیڵە پیشەییەکەت.',
      'دوای پەسەندکردن، دەستڕاگەیشتنت پێدەدرێت بە توێژینەوە تایبەتەکان، بنکەدراوە هاوبەشەکان، و پێڕستەکانی B2B.'
    ],
    printReceipt: 'چاپکردنی پسوولەی تۆمارکردن',
    resetForm: 'پێشکەشکردنی داواکاری نوێ',
    required: 'ئەم خانەیە پێویستە',
    invalidEmail: 'تکایە ئیمەیڵێکی پیشەیی دروست بنووسە',
    fileTypeErr: 'تەنها بەڵگەنامەی PDF وەردەگیرێت بۆ پشکنین'
  }
};

const essayTranslation = {
  en: {
    sections: [
      {
        heading: "1. The Historical and Strategic Imperative",
        paragraphs: [
          "The modern era is defined by profound interconnectedness, where the economic, political, and cultural destinies of nations are inexorably linked. Among the most pivotal of these emerging synergies is the strategic partnership between the People's Republic of China and the Republic of Iraq. This partnership, rooted in the historical depth of the ancient Silk Road, has been revitalized through contemporary initiatives such as the Belt and Road Initiative (BRI).",
          "By joining the ChinQ Media Group and enterprise network, partners gain unprecedented access to a localized stream of intelligence that bridges the informational divide between East Asia and the Middle East. This synergy fosters an environment where infrastructural investments—from the Al Faw Grand Port to sprawling energy grids—are guided by precise, actionable insights. Real-time data flow is as critical as physical infrastructure in the 21st-century geopolitical landscape."
        ]
      },
      {
        heading: "2. Unprecedented Economic Benefits and B2B Synergies",
        paragraphs: [
          "The core of the Sino-Iraqi partnership is bilateral economic revitalization. For decades, Iraq has sought to rebuild its industrial base and modernize logistics, while China has looked to secure stable energy supply corridors and export technological innovations. This mutual complementarity creates a fertile ground for joint ventures, direct foreign investments, and seamless cross-border resource transfers.",
          "Collaboration through the ChinQ Enterprise Network provides businesses with a distinct competitive advantage. By integrating directly into our database, companies leverage comprehensive market statistics, corporate listings, and regional trade tariffs. This reduces transaction friction, mitigates regulatory risks associated with cross-border investments, and accelerates joint licensing initiatives."
        ]
      },
      {
        heading: "3. Fostering Academic Alliances and Cultural Exchange",
        paragraphs: [
          "Beyond the realms of commerce, the true sustainability of any bilateral relationship rests on mutual understanding and cultural exchange. Technological and academic alliances, such as those forming between leading universities in Baghdad, Basra, and Beijing, lay the groundwork for joint research in artificial intelligence, agricultural sustainability, and renewable energy grids.",
          "We actively promote academic discourse by translating complex technological and policy papers into highly accessible trilingual formats. This ensures that the transfer of knowledge is fully bi-directional, empowering Middle Eastern institutions with cutting-edge Chinese technological paradigms, while providing Chinese researchers with deep, contextual insights into local operational realities."
        ]
      },
      {
        heading: "4. The Role of AI in Revolutionizing Trilingual Media",
        paragraphs: [
          "In an era of rapid information diffusion, the curation and translation of news must be precise, instantaneous, and culturally nuanced. ChinQ employs advanced sovereign translation algorithms to not only translate but contextually trans-create reports across English, Arabic, Kurdish, and Chinese.",
          "Our AI-driven ecosystem continuously learns from geopolitical shifts, policy updates, and market indexes. By joining us, you interact with a dynamic intelligence system that anticipates economic trends and geopolitical events. This predictive capability is invaluable for corporate strategists, diplomats, and policy architects seeking to navigate the modern Silk Road."
        ]
      }
    ]
  },
  ar: {
    sections: [
      {
        heading: "١. الضرورة التاريخية والاستراتيجية",
        paragraphs: [
          "يتميز العصر الحديث بالترابط العميق، حيث ترتبط المصائر الاقتصادية والسياسية والثقافية للأمم ارتباطاً وثيقاً. ومن بين أهم هذه التآزرات الناشئة الشراكة الاستراتيجية بين جمهورية الصين الشعبية وجمهورية العراق. هذه الشراكة، المتجذرة في العمق التاريخي لطريق الحرير القديم، تم تنشيطها من خلال المبادرات المعاصرة مثل مبادرة الحزام والطريق (BRI).",
          "من خلال الانضمام إلى مجموعة تشينك الإعلامية وشبكة المؤسسات التابعة لها، يكتسب الشركاء وصولاً غير مسبوق إلى تدفق محلي للمعلومات الاستخباراتية التي تجسر الانقسام المعلوماتي بين شرق آسيا والشرق الأوسط. يعزز هذا التآزر بيئة تسترشد فيها استثمارات البنية التحتية - من ميناء الفاو الكبير إلى شبكات الطاقة المترامية الأطراف - برؤى دقيقة وقابلة للتنفيذ. إن تدفق البيانات في الوقت الفعلي لا يقل أهمية عن البنية التحتية المادية في المشهد الجيوسياسي للقرن الحادي والعشرين."
        ]
      },
      {
        heading: "٢. فوائد اقتصادية غير مسبوقة وتآزر B2B",
        paragraphs: [
          "إن جوهر الشراكة الصينية العراقية هو تنشيط الاقتصاد الثنائي. لعقود من الزمن، سعى العراق إلى إعادة بناء قاعدته الصناعية وتحديث الخدمات اللوجستية، بينما تطلع الصين إلى تأمين ممرات مستقرة لإمدادات الطاقة وتصدير الابتكارات التكنولوجية. يخلق هذا التكامل المتبادل أرضاً خصبة للمشاريع المشتركة، والاستثمارات الأجنبية المباشرة، ونقل الموارد بسلاسة عبر الحدود.",
          "يوفر التعاون من خلال شبكة مؤسسات تشينك للشركات ميزة تنافسية متميزة. من خلال الدمج المباشر في قاعدة بياناتنا، تستفيد الشركات من إحصاءات السوق الشاملة، وقوائم الشركات، والتعريفات التجارية الإقليمية. وهذا يقلل من الاحتكاك في المعاملات، ويخفف من المخاطر التنظيمية المرتبطة بالاستثمارات العابرة للحدود، ويسرع مبادرات الترخيص المشتركة."
        ]
      },
      {
        heading: "٣. تعزيز التحالفات الأكاديمية والتبادل الثقافي",
        paragraphs: [
          "خارج حدود التجارة، فإن الاستدامة الحقيقية لأي علاقة ثنائية تعتمد على التفاهم المتبادل والتبادل الثقافي. تضع التحالفات التكنولوجية والأكاديمية، مثل تلك التي تتشكل بين الجامعات الرائدة في بغداد والبصرة وبكين، الأساس للبحث المشترك في مجالات الذكاء الاصطناعي، والاستدامة الزراعية، وشبكات الطاقة المتجددة.",
          "نحن نشجع بنشاط الخطاب الأكاديمي من خلال ترجمة الأوراق التكنولوجية والسياسية المعقدة إلى تنسيقات ثلاثية اللغات سهلة الوصول. يضمن ذلك أن يكون نقل المعرفة ثنائي الاتجاه بالكامل، مما يمكن المؤسسات في الشرق الأوسط من فهم النماذج التكنولوجية الصينية المتطورة، بينما يوفر للباحثين الصينيين رؤى عميقة وسياقية حول واقع العمليات المحلية."
        ]
      },
      {
        heading: "٤. دور الذكاء الاصطناعي في إحداث ثورة في الإعلام ثلاثي اللغات",
        paragraphs: [
          "في عصر يتسم بالانتشار السريع للمعلومات، يجب أن تكون صياغة وترجمة الأخبار دقيقة وفورية ومراعية للفروق الثقافية. تستخدم تشينك خوارزميات ترجمة سيادية متقدمة ليس فقط لترجمة التقارير، بل لإعادة صياغتها سياقياً عبر اللغات الإنجليزية والعربية والكردية والصينية.",
          "يتعلم نظامنا البيئي المدعوم بالذكاء الاصطناعي باستمرار من التحولات الجيوسياسية والتحديثات السياساتية ومؤشرات السوق. من خلال الانضمام إلينا، فإنك تتفاعل مع نظام استخباراتي ديناميكي يتوقع الاتجاهات الاقتصادية والأحداث الجيوسياسية. هذه القدرة التنبؤية لا تقدر بثمن لمخططي الشركات والدبلوماسيين ومهندسي السياسات الذين يسعون للملاحة في طريق الحرير الحديث."
        ]
      }
    ]
  },
  zh: {
    sections: [
      {
        heading: "1. 历史与战略的必然选择",
        paragraphs: [
          "现代社会的特征是深度的互联互通，各国的经济、政治和文化命运已紧密交织在一起。在这些新兴的协同效应中，最关键的是中华人民共和国与伊拉克共和国之间的战略伙伴关系。这一伙伴关系植根于古代丝绸之路的历史底蕴，并通过“一带一路”倡议（BRI）等当代合作机制注入了全新活力。",
          "通过加入中伊传媒集团（ChinQ）及企业合作网络，合作伙伴可获得针对中东与东亚信息鸿沟的本地化深度情报。这种协同效应促进了一个优良的投资环境，使从法奥大港到庞大能源电网的基础设施建设能够得到精确、可操作的情报指导。在21世纪的地缘政治格局中，实时数据流与实体基础设施同样至关重要。"
        ]
      },
      {
        heading: "2. 前所未有的经济红利与 B2B 协同效应",
        paragraphs: [
          "中伊合作的核心在于双边经济的全面复兴。数十年来，伊拉克一直致力于重建其工业基础并实现物流现代化，而中国则寻求保障稳定的能源供应链并输出技术创新。这种高度互补性为合资企业、外商直接投资以及无缝跨境资源流动创造了极其肥沃的土壤。",
          "通过 ChinQ 企业网络进行协作可赋予企业独特的竞争优势。直接融入我们的商贸数据库后，企业能够轻松调取市场统计数据、企业名录以及区域贸易关税信息。这极大地降低了交易摩擦成本，规避了跨境投资的合规风险，并加速了双边联合准入及许可的申请流程。"
        ]
      },
      {
        heading: "3. 促进学术联盟与多元文化交流",
        paragraphs: [
          "除了商贸合作，任何双边关系的持久生命力都有赖于彼此间深度的理解与文化交融。巴格达、巴士拉与北京的顶尖高校之间正在建立紧密的技术与学术联盟，这为人工智能、农业可持续发展以及可再生能源电网等领域的联合科研奠定了坚实基石。",
          "我们通过将前沿的科技与政策文献翻译为高效的三语版本，积极推动国际学术交流。这确保了知识产权与学术成果的双向流动，不仅使中东学术机构能够借鉴中国先进的技术范式，也为中国科研人员提供了关于伊拉克本土运营环境的深刻洞察。"
        ]
      },
      {
        heading: "4. 人工智能在重塑三语媒体中的战略角色",
        paragraphs: [
          "在信息高速传播的时代，新闻的策划与翻译必须做到精确无误、实时响应且具备敏锐的文化适应性。ChinQ 采用先进的主权级翻译算法，不仅能进行字面翻译，还能针对英文、中文、阿拉伯语和库尔德语进行语境重塑与本地化转译。",
          "我们的人工智能生态系统从全球地缘政治演变、最新政策发布和市场行情指数中持续自我学习与进化。加入我们，您将实时对接一个能够预判经济走向与地缘政治演变的动态智能系统。这种前瞻性的预测能力对于谋求拓展现代丝绸之路业务的企业战略家、外交官及政策决策者具有极高的实用价值。"
        ]
      }
    ]
  },
  ckb: {
    sections: [
      {
        heading: "١. پێویستی مێژوویی و ستراتیژی",
        paragraphs: [
          "سەردەمی مۆدێرن بە پەیوەندی قووڵ پێناسە دەکرێت، کە تێیدا چارەنووسی ئابووری، سیاسی و کولتووری نەتەوەکان بە توندی بە یەکەوە بەستراونەتەوە. لە نێوان گرنگترین هاوکارییە دەرکەوتووەکاندا، هاوبەشی ستراتیژی نێوان کۆماری گەلی چین و کۆماری عێراقە. ئەم هاوبەشییە کە ڕەگی لە قووڵایی مێژوویی ڕێگای ئاوریشمی کۆن داکوتاوە، لە ڕێگەی دەستپێشخەرییە هاوچەرخەکانی وەک دەستپێشخەری پشتوێن و ڕێگا (BRI) زیندوو کراوەتەوە.",
          "بە پەیوەندیکردن بە گرووپی میدیایی چینک و تۆڕی دەزگاکان، هاوبەشەکان دەستڕاگەیشتنی بێپێشینە بەدەستدەهێنن بە تەزوویەکی ناوخۆیی زانیاری کە بۆشایی زانیاری نێوان ڕۆژهەڵاتی ئاسیا و ڕۆژهەڵاتی ناوەڕاست پڕ دەکاتەوە. ئەم هاوکارییە ژینگەیەک دروست دەکات کە تێیدا وەبەرهێنانەکانی ژێرخان - لە بەندەری گەورەی فاوەوە تا تۆڕە گەورەکانی وزە - بەپێی زانیاری ورد و کرداری ئاڕاستە دەکرێن. تەزووی داتای کاتی ڕاستەقینە لەسەر نەخشەی جیۆپۆلەتیکی سەدەی ٢١ هاوشانی ژێرخانی فیزیکی گرنگە."
        ]
      },
      {
        heading: "٢. سوودە ئابوورییە بێپێشینەکان و هاوکارییەکانی B2B",
        paragraphs: [
          "ناوەڕۆکی هاوبەشی چین و عێراق بریتییە لە بوژانەوەی ئابووری دوولایەنە. بۆ چەندین دەیە عێراق هەوڵی داوە بنکە پیشەسازییەکەی سەرلەنوێ بنیات بنێتەوە و لۆجیستی مۆدێرن بکاتەوە، لە کاتێکدا چین هەوڵی داوە ڕێڕەوی جێگیری دابینکردنی وزە بپارێزێت و داهێنانە تەکنەلۆجییەکان هەناردە بکات. ئەم تەواوکارییە هاوبەشە زەوییەکی بەپیت بۆ پڕۆژە هاوبەشەکان، وەبەرهێنانی ڕاستەوخۆی دەرەکی، و گواستنەوەی بێ کێشەی سەرچاوەکان لەسەر سنوورەکان دروست دەکات.",
          "هاوکاری لە ڕێگەی تۆڕی دەزگاکانی چینکەوە ململانێیەکی جیاواز دەبەخشێتە کۆمپانیاکان. بە تێکەڵبوونی ڕاستەوخۆ لە بنکەدراوەکەمان، کۆمپانیاکان سوود لە ئامارە گشتگیرەکانی بازاڕ، پێڕستەکانی کۆمپانیاکان و گومرگی بازرگانی هەرێمی وەردەگرن. ئەمەش کێشەکانی مامەڵەکردن کەمدەکاتەوە، مەترسییە ڕێکخراوەییەکانی پەیوەندیدار بە وەبەرهێنانە سنووربەزێنەکان کەم دەکاتەوە و کارەکانی مۆڵەتدانی هاوبەش خێراتر دەکات."
        ]
      },
      {
        heading: "٣. گەشەپێدانی هاوپەیمانییە ئەکادیمییەکان و ئاڵوگۆڕی کولتووری",
        paragraphs: [
          "لە دەرەوەی بازرگانی، بەردەوامی ڕاستەقینەی هەر پەیوەندییەکی دوولایەنە پشت بە لێکتێگەیشتنی هاوبەش و ئاڵوگۆڕی کولتووری دەبەستێت. هاوپەیمانییە تەکنەلۆجی و ئەکادیمییەکان، وەک ئەوانەی لە نێوان زانکۆ پێشەنگەکانی بەغداد، بەسرە و پەکین پێکدێن، بنەمای توێژینەوەی هاوبەش لە ژیری دەستکرد، بەردەوامی کشتوکاڵ و تۆڕەکانی وزەی نوێبووەوە دادەنێن.",
          "ئێمە بە شێوەیەکی چالاک گوتاری ئەکادیمی بەرەوپێش دەبەین بە وەرگێڕانی توێژینەوە ئاڵۆزەکانی تەکنەلۆجیا و سیاسەت بۆ شێوازی سێزمانەی زۆر ئاسان. ئەمەش دڵنیایی دەدات لەوەی گواستنەوەی زانیاری بە تەواوی دوولایەنە بێت، بە جۆرێک دەزگاکانی ڕۆژهەڵاتی ناوەڕاست بە مۆدێلە نوێیەکانی تەکنەلۆجیای چینی بەهێز دەکات، هاوکات زانیاری قووڵ و ژینگەیی لەسەر واقیعی کارکردنی ناوخۆیی دەبەخشێتە توێژەرانی چینی."
        ]
      },
      {
        heading: "٤. ڕۆڵی ژیری دەستکرد لە شۆڕشی میدیایی سێزمانەدا",
        paragraphs: [
          "لە سەردەمی بڵاوبوونەوەی خێرای زانیاریدا، داڕشتن و وەرگێڕانی هەواڵەکان دەبێت ورد، کاتی و هەستیاری کولتووری بێت. چینک خوارزمياتی پێشکەوتووی وەرگێڕانی فەرمی بەکاردەهێنێت نەک تەنها بۆ وەرگێڕان بەڵکو بۆ داڕشتنەوەی سياقی ڕاپۆرتەکان لە نێوان زمانەکانی ئینگلیزی، عەرەبی، کوردی و چینی.",
          "سیستەمە پێشکەوتووەکەمان بەهۆی ژیری دەستکردەوە بەردەوام فێری گۆڕانکارییە جیۆپۆلەتیکییەکان، زانیارییە نوێیەکانی سیاسەت و پیشاندەرانی بازاڕ دەبێت. بە پەیوەندیکردن بە ئێمەوە، تۆ لەگەڵ سیستەمێکی هەواڵگری چالاکدا کار دەکەیت کە پێشبینی ڕەوتە ئابوورییەکان و ڕووداوە جیۆپۆلەتیکییەکان دەکات. ئەم توانای پێشبینیکردنە زۆر بەنرخە بۆ داڕێژەرانی ستراتیژی کۆمپانیاکان، دیپلۆماتکاران و ئەندازیارانی سیاسەت بۆ کارکردن لەسەر ڕێگای ئاوریشمی نوێ."
        ]
      }
    ]
  }
};

interface FormState {
  fullName: string;
  email: string;
  company: string;
  role: string;
  bio: string;
}

export function JoinUs() {
  const { lang } = useParams<{ lang: Locale }>();
  const currentLang = ['en', 'ar', 'zh', 'ckb'].includes(lang || '') ? (lang as Locale) : 'en';
  const t = translations[currentLang];
  const e = essayTranslation[currentLang];

  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    company: '',
    role: 'editorial',
    bio: ''
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  
  // Submit states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<FormState> & { file?: string }>({});
  const [receiptData, setReceiptData] = useState<{
    hash: string;
    bureau: string;
    timestamp: string;
  } | null>(null);

  const isRtl = currentLang === 'ar' || currentLang === 'ckb';

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Drag and Drop handlers
  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (selectedFile: File): boolean => {
    if (selectedFile.type !== 'application/pdf') {
      setErrors(prev => ({ ...prev, file: t.fileTypeErr }));
      return false;
    }
    setFile(selectedFile);
    setErrors(prev => ({ ...prev, file: undefined }));
    return true;
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> & { file?: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = t.required;
    
    if (!formData.email.trim()) {
      newErrors.email = t.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    if (!formData.company.trim()) newErrors.company = t.required;
    if (!formData.bio.trim()) newErrors.bio = t.required;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Determine bureau based on preferred role
    let assignedBureau = 'Baghdad HQ Newsroom';
    if (formData.role === 'translation') assignedBureau = 'Beijing Trans-Localization Bureau';
    if (formData.role === 'b2b') assignedBureau = 'Basra Logistics & Customs Registry';
    if (formData.role === 'research') assignedBureau = 'Baghdad Sovereign Studies Council';

    // Localization of Bureau Names
    if (currentLang === 'ar') {
      if (formData.role === 'translation') assignedBureau = 'مكتب بكين للترجمة والتعريب المتبادل';
      else if (formData.role === 'b2b') assignedBureau = 'منظم الجمارك والخدمات اللوجستية في البصرة';
      else if (formData.role === 'research') assignedBureau = 'مجلس بغداد للدراسات السيادية والأبحاث';
      else assignedBureau = 'غرفة أخبار مكتب بغداد الرئيسي';
    } else if (currentLang === 'zh') {
      if (formData.role === 'translation') assignedBureau = '北京互译与本地化处';
      else if (formData.role === 'b2b') assignedBureau = '巴士拉物流与关税登记署';
      else if (formData.role === 'research') assignedBureau = '巴格达主权研究理事会';
      else assignedBureau = '巴格达总部新闻编辑室';
    } else if (currentLang === 'ckb') {
      if (formData.role === 'translation') assignedBureau = 'نووسینگەی وەرگێڕان و خۆماڵیکردنی پەکین';
      else if (formData.role === 'b2b') assignedBureau = 'تۆماری گومرگ و لۆجیستی بەسرە';
      else if (formData.role === 'research') assignedBureau = 'ئەنجومەنی توێژینەوەی سەروەری بەغداد';
      else assignedBureau = 'ژووری هەواڵی ئۆفیسی بەغدادی سەرەکی';
    }

    const randomHash = 'CQ-' + Math.floor(Math.random() * 90000 + 10000) + '-' + Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase();

    try {
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
          bureau: assignedBureau
        })
      });

      if (!res.ok) {
        throw new Error('Ledger write operation failed.');
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

  const triggerPrint = () => {
    window.print();
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      company: '',
      role: 'editorial',
      bio: ''
    });
    setFile(null);
    setSubmitSuccess(false);
    setReceiptData(null);
  };

  return (
    <main className="flex-grow w-full max-w-[1024px] mx-auto bg-[#FAFAFA] p-4 md:p-12 text-start" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Editorial Header Card */}
      <div className="border-b-4 border-[#111111] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-[#111111] uppercase">
            {t.title}
          </h2>
          <p className="font-mono text-xs md:text-sm text-gray-500 font-bold mt-2 uppercase tracking-widest">
            {t.subtitle}
          </p>
        </div>
        <button 
          onClick={scrollToForm}
          className="bg-[#990000] hover:bg-[#111111] text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm self-start md:self-auto flex items-center gap-2 shrink-0"
        >
          <Award className="w-4 h-4" />
          {t.applyButton}
        </button>
      </div>

      {/* Grid: Essay on Left, Pitch/Action Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Hand: Strategic Essay */}
        <div className="lg:col-span-8 space-y-8 prose prose-neutral max-w-none font-serif text-base md:text-lg leading-relaxed text-gray-800">
          
          {/* Why Collaborate Box */}
          <div className="bg-[#111111] text-white p-6 md:p-8 border-l-4 border-[#990000] shadow-sm">
            <h3 className="text-xl font-bold font-mono uppercase tracking-widest text-[#990000] mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#990000]" />
              {t.aboutSecTitle}
            </h3>
            <p className="text-xs md:text-sm leading-relaxed opacity-90 text-justify">
              {t.aboutSecDesc}
            </p>
          </div>

          {/* Structured Essay Sections */}
          {e.sections.map((section, idx) => (
            <div key={idx} className="border-b border-gray-200 pb-6 last:border-0">
              <h3 className="text-xl md:text-2xl font-serif font-black text-[#990000] mb-4">
                {section.heading}
              </h3>
              <div className="space-y-4">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-justify leading-relaxed text-gray-700 text-sm md:text-base">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Hand: Fully Functional Interactive Form Column */}
        <div ref={formRef} className="lg:col-span-4 bg-white border-2 border-[#111111] p-5 md:p-6 shadow-sm relative">
          
          <AnimatePresence mode="wait">
            {!submitSuccess ? (
              // Application Form Component
              <motion.div
                key="form-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-b-2 border-double border-[#111111] pb-3 mb-5">
                  <h3 className="text-lg font-serif font-black uppercase text-gray-900 flex items-center gap-1.5">
                    {t.formTitle}
                  </h3>
                  <p className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider mt-1 leading-normal">
                    {t.formSubtitle}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#990000]" />
                      {t.fullName} <span className="text-[#990000]">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full text-xs font-mono border ${errors.fullName ? 'border-[#990000] bg-red-50/20' : 'border-gray-300 bg-[#FAFAFA] focus:border-[#111111]'} p-2.5 focus:outline-none transition-colors`}
                    />
                    {errors.fullName && <p className="text-[10px] font-mono font-bold text-[#990000] mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Professional Email */}
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-[#990000]" />
                      {t.email} <span className="text-[#990000]">*</span>
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full text-xs font-mono border ${errors.email ? 'border-[#990000] bg-red-50/20' : 'border-gray-300 bg-[#FAFAFA] focus:border-[#111111]'} p-2.5 focus:outline-none transition-colors`}
                    />
                    {errors.email && <p className="text-[10px] font-mono font-bold text-[#990000] mt-1">{errors.email}</p>}
                  </div>

                  {/* Company / Affiliation */}
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-[#990000]" />
                      {t.company} <span className="text-[#990000]">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full text-xs font-mono border ${errors.company ? 'border-[#990000] bg-red-50/20' : 'border-gray-300 bg-[#FAFAFA] focus:border-[#111111]'} p-2.5 focus:outline-none transition-colors`}
                    />
                    {errors.company && <p className="text-[10px] font-mono font-bold text-[#990000] mt-1">{errors.company}</p>}
                  </div>

                  {/* Track / Preferred Role */}
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-[#990000]" />
                      {t.role}
                    </label>
                    <select 
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full text-xs font-mono border border-gray-300 bg-[#FAFAFA] p-2.5 focus:outline-none focus:border-[#111111] appearance-none"
                    >
                      {t.roles.map(r => (
                        <option key={r.id} value={r.id}>{r.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Statement of purpose */}
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-1">
                      {t.bio} <span className="text-[#990000]">*</span>
                    </label>
                    <textarea 
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder={t.bioPlaceholder}
                      className={`w-full text-xs font-mono border ${errors.bio ? 'border-[#990000] bg-red-50/20' : 'border-gray-300 bg-[#FAFAFA] focus:border-[#111111]'} p-2.5 focus:outline-none transition-colors resize-none`}
                    />
                    {errors.bio && <p className="text-[10px] font-mono font-bold text-[#990000] mt-1">{errors.bio}</p>}
                  </div>

                  {/* File Upload Zone */}
                  <div>
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-1">
                      {t.fileLabel}
                    </span>
                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-none p-4 text-center cursor-pointer transition-all ${
                        dragActive ? 'border-[#990000] bg-red-50/10' : 'border-gray-300 bg-gray-50 hover:border-[#111111]'
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
                          <Upload className="w-5 h-5 mx-auto text-gray-400" />
                          <p className="text-[9px] font-mono text-gray-500 font-bold uppercase tracking-wider">
                            {t.fileDrag}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between bg-white border border-gray-200 p-2 text-start">
                          <div className="flex items-center gap-1.5 overflow-hidden">
                            <FileText className="w-5 h-5 text-[#990000] shrink-0" />
                            <span className="text-[9px] font-mono font-bold truncate text-gray-800">
                              {file.name}
                            </span>
                          </div>
                          <button 
                            type="button"
                            onClick={(e) => { e.stopPropagation(); removeFile(); }}
                            className="text-gray-400 hover:text-[#990000] p-1 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                    {errors.file && <p className="text-[10px] font-mono font-bold text-[#990000] mt-1">{errors.file}</p>}
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#111111] hover:bg-[#990000] text-white p-3 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span className="animate-pulse">{t.submitting}</span>
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
              // Official Registry Receipt / Success State
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <div className="text-center py-2">
                  <CheckCircle className="w-12 h-12 text-[#990000] mx-auto mb-2.5 animate-bounce" />
                  <h3 className="text-lg font-serif font-black text-[#990000] uppercase">
                    {t.successTitle}
                  </h3>
                  <p className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider mt-1">
                    ChinQ Sovereign Registry Ledger
                  </p>
                </div>

                <div className="bg-gray-50 border-y-2 border-double border-[#111111] p-4 text-xs font-mono space-y-2">
                  <div className="flex justify-between gap-2 border-b border-gray-200 pb-1.5">
                    <span className="text-gray-400 uppercase text-[9px]">{t.fullName}</span>
                    <span className="font-bold text-gray-900">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between gap-2 border-b border-gray-200 pb-1.5">
                    <span className="text-gray-400 uppercase text-[9px]">{t.company}</span>
                    <span className="font-bold text-gray-900">{formData.company}</span>
                  </div>
                  <div className="flex justify-between gap-2 border-b border-gray-200 pb-1.5">
                    <span className="text-gray-400 uppercase text-[9px]">{t.appId}</span>
                    <span className="font-bold text-[#990000] select-all">{receiptData?.hash}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-b border-gray-200 pb-1.5">
                    <span className="text-gray-400 uppercase text-[9px]">{t.bureauAssigned}</span>
                    <span className="font-bold text-gray-900">{receiptData?.bureau}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400 uppercase text-[9px]">Timestamp (UTC)</span>
                    <span className="font-bold text-gray-900 text-[10px]">{receiptData?.timestamp}</span>
                  </div>
                </div>

                <p className="text-[11px] text-gray-600 leading-relaxed text-justify">
                  {t.successDesc}
                </p>

                {/* Next Steps List */}
                <div className="space-y-2 border-t border-gray-100 pt-3">
                  <h4 className="text-[10px] font-mono font-black uppercase text-[#990000] tracking-wider">
                    {t.nextStepsTitle}
                  </h4>
                  <ol className="text-[10px] text-gray-500 leading-relaxed space-y-1.5 list-decimal pl-4 pr-1">
                    {t.nextSteps.map((step, sIdx) => (
                      <li key={sIdx}>{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Print and Return Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <button 
                    onClick={triggerPrint}
                    className="w-full border-2 border-[#111111] hover:bg-[#111111] hover:text-white text-gray-900 p-2 text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    {t.printReceipt}
                  </button>
                  <button 
                    onClick={resetForm}
                    className="w-full text-center text-gray-400 hover:text-gray-900 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {t.resetForm}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </main>
  );
}
