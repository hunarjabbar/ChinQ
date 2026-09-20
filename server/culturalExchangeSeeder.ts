import { prisma } from './db.js';

export const SEED_CULTURAL_CATEGORIES = [
  {
    slug: 'educational-exchange',
    nameEn: 'Educational Exchange Programs',
    nameAr: 'برامج التبادل التعليمي والمدرسي',
    nameZh: '教育与学术交流项目',
    nameCkb: 'بەرنامەکانی ئاڵوگۆڕی پەروەردەیی',
    order: 1
  },
  {
    slug: 'higher-education-university',
    nameEn: 'Higher Education & University Partnerships',
    nameAr: 'شراكات التعليم العالي والجامعات',
    nameZh: '高等教育与大学战略合作',
    nameCkb: 'هاوبەشییەکانی خوێندنی باڵا و زانکۆکان',
    order: 2
  },
  {
    slug: 'arts-heritage',
    nameEn: 'Arts & Heritage Exchange',
    nameAr: 'تبادل الفنون والتراث الثقافي',
    nameZh: '艺术与文化遗产传承交流',
    nameCkb: 'ئاڵوگۆڕی هونەر و کەلەپوور',
    order: 3
  },
  {
    slug: 'youth-language',
    nameEn: 'Youth & Language Programs',
    nameAr: 'برامج الشباب واللغات الصينية العربية',
    nameZh: '青年领袖与中阿双语互通计划',
    nameCkb: 'بەرنامەکانی گەنجان و فێربوونی زمان',
    order: 4
  },
  {
    slug: 'professional-vocational',
    nameEn: 'Professional & Vocational Exchange',
    nameAr: 'التبادل المهني والتدريب التقني التخصصي',
    nameZh: '专业技能与高端职教交流',
    nameCkb: 'ئاڵوگۆڕی پیشەیی و ڕاهێنانی تەکنیکی',
    order: 5
  }
];

export const SEED_CULTURAL_PROGRAMS = [
  // Category 1: Educational Exchange Programs
  {
    slug: 'sino-iraqi-k12-stem-immersion',
    titleEn: 'Sino-Iraqi STEM & Robotics Youth Immersion 2026',
    titleAr: 'برنامج المعايشة الشبابية الصينية العراقية للروبوتات والعلوم والتكنولوجيا',
    titleZh: '2026年中伊青少年STEM科学与人工智能机器人研学营',
    titleCkb: 'بەرنامەی گەنجانی عێراقی-چینی بۆ زانست و ڕۆبۆتیک ٢٠٢٦',
    descriptionEn: 'A high-impact 3-week cultural and robotics immersion connecting 40 outstanding Iraqi high school students with premier science laboratories in Shanghai and Beijing.',
    descriptionAr: 'برنامج معايشة ثقافية وعلمية مكثف لمدة ٣ أسابيع يربط ٤٠ طالباً متميزاً من المدارس الثانوية العراقية بمختبرات الابتكار والذكاء الاصطناعي الرائدة في شنغهاي وبكين.',
    descriptionZh: '为期3周的深度科技与文化研学营，选拔40名优秀伊拉克高中生前往上海和北京的顶尖人工智能与机器人实验室开展沉浸式研讨。',
    descriptionCkb: 'بەرنامەیەکی بەهێزی ٣ هەفتەیی بۆ ٤٠ قوتابی لێهاتووی ئامادەیی عێراق لە تاقیگەکانی ڕۆبۆتیک و هۆشی دەستکرد لە شەنگهای و پەکین.',
    detailsEn: `The Sino-Iraqi STEM & Robotics Immersion is an annual flagship exchange initiative co-organized by the Iraqi-Chinese Agency, the Chinese Association for Science and Technology (CAST), and top Iraqi STEM secondary academies.

### Program Core Objectives
- Hands-on workshops in machine learning, micro-electronics, and aerospace principles.
- Immersion in traditional and contemporary Chinese culture, including Mandarin language basics and historical exploration of the Grand Canal and Forbidden City.
- Direct mentorship under senior Chinese engineering fellows and academic faculty.
- Collaborative capstone prototype development presented at the Shanghai Global Youth Innovation Forum.

All travel, accommodation, training materials, and laboratory access are fully covered under the bilateral initiative grant.`,
    detailsAr: `تعد معايشة العلوم والروبوتات الصينية العراقية مبادرة سنوية رائدة تنظمها الوكالة العراقية الصينية بالتعاون مع الجمعية الصينية للعلوم والتكنولوجيا (CAST) ومدارس المتميزين والموهوبين في العراق.

### المحاور الرئيسية للبرنامج:
- ورش عمل تطبيقية في تعلم الآلة، الإلكترونيات الدقيقة، وهندسة الطيران.
- تجربة ثقافية أصيلة تشتمل على أساسيات اللغة الصينية وجولات ميدانية تراثية في بكين وشنغهاي.
- إشراف أكاديمي مباشر من كبار المهندسين والباحثين في الجامعات الصينية.
- تطوير نموذج هندسي مصغر يتم استعراضه في منتدى الابتكار الشبابي الدولي في شنغهاي.

تغطي المنحة بالكامل تكاليف السفر والإقامة ومستلزمات التدريب ومختبرات البحث.`,
    detailsZh: `中伊青少年STEM科学与人工智能机器人研学营是由伊中通讯社联合中国科学技术协会（CAST）及伊拉克重点科创中学联合主办的旗舰交流项目。

### 核心亮点
- 涵盖机器学习、微电子与航天技术的高端实操工作坊。
- 融入书法、汉语会话与故宫/大运河历史文化调研的沉浸体验。
- 由中国知名院校工程导师进行一对一创新辅导。
- 营员共同组队完成创新项目并在上海全球青少年科创论坛公开展演。`,
    detailsCkb: `ئەم بەرنامەیە گەشتێکی ٣ هەفتەیی زانستی و کەلەپوورییە کە لەلایەن ئاژانسی عێراقی-چینی و ڕێکخراوی زانستی چین بۆ قوتابیانی بەتوانای عێراق ڕێکدەخرێت. هەموو تێچووی گەشت و مانەوە دابینکراوە.`,
    categorySlug: 'educational-exchange',
    institutionName: 'Shanghai Jiao Tong University & CAST Innovation Center',
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    eventDate: 'July 15 - August 5, 2026',
    programStartDate: '2026-07-15',
    programEndDate: '2026-08-05',
    applicationDeadline: 'May 10, 2026',
    eligibility: 'Iraqi secondary students aged 15-18 with demonstrated academic excellence in mathematics, computing, or natural sciences.',
    contactUrl: '/en/contact?subject=stem-immersion',
    applicationUrl: 'https://cultural.iraqi-chineseagency.com/apply/stem-2026',
    featured: true,
    order: 1
  },
  {
    slug: 'silk-road-schools-twinning',
    titleEn: 'Baghdad-Nanjing Sister Schools Friendship Accord',
    titleAr: 'مبادرة التوأمة المدرسية وصداقة طريق الحرير بين بغداد ونانجينغ',
    titleZh: '巴格达与南京丝路姊妹学校友好共建工程',
    titleCkb: 'پڕۆژەی برایەتی قوتابخانەکانی بەغدا و نانجینگ',
    descriptionEn: 'Institutional twinning between historical secondary schools in Baghdad and Nanjing, establishing continuous student pen-pal exchanges, virtual co-classes, and faculty curriculum visits.',
    descriptionAr: 'توأمة مؤسسية بين المدارس الثانوية التاريخية في بغداد ونانجينغ، تؤسس لبرامج تواصل طلابي مستمرة، فصول دراسية تفاعلية عبر الإنترنت، وزيارات متبادلة للكوادر التدريسية.',
    descriptionZh: '巴格达与六朝古都南京重点高中间的机构结对项目，建立常态化跨文化同伴研学、云端联合授课与教学骨干互访机制。',
    descriptionCkb: 'پەیمانی برایەتی و هاوکاری نێوان قوتابخانە مێژووییەکانی بەغدا و نانجینگ بۆ ئاڵوگۆڕی زانستی و فەرهەنگی بەردەوام.',
    detailsEn: `This bilateral twinning accord links 10 premier Iraqi preparatory institutions with their counterparts in Jiangsu Province. 
Students engage in bi-weekly shared bilingual humanities sessions, history forums comparing Mesopotamian and Yangtze civilizations, and joint environmental science observations.`,
    detailsAr: `يربط اتفاق التوأمة ١٠ مؤسسات إعدادية رائدة في بغداد بنظيراتها في مقاطعة جيانغسو الصينية، متضمناً حصصاً تفاعلية دورية في اللغات والعلوم وجلسات مقارنة بين حضارتي وادي الرافدين ونهر اليانغتسي.`,
    detailsZh: `该结对工程深化两座文明古城青年一代的相互认知，涵盖水利与古代灌溉文明研讨、青年文学赏析及数字环保科学联合监测。`,
    detailsCkb: `ئەم پەیمانە دەرفەتی پەیوەندی بەردەوام لە نێوان مامۆستایان و قوتابیانی هەردوو وڵات دەڕەخسێنێت.`,
    categorySlug: 'educational-exchange',
    institutionName: 'Nanjing No. 1 Middle School & Baghdad Al-Markaziya High School',
    coverImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    eventDate: 'Continuous Academic Cycle 2026-2028',
    programStartDate: '2026-09-01',
    programEndDate: '2028-06-30',
    applicationDeadline: 'June 20, 2026',
    eligibility: 'Accredited public and private secondary schools in Baghdad, Basra, and Erbil.',
    contactUrl: '/en/contact?subject=sister-schools',
    applicationUrl: 'https://cultural.iraqi-chineseagency.com/apply/schools',
    featured: false,
    order: 2
  },

  // Category 2: Higher Education & University Partnerships
  {
    slug: 'baghdad-tsinghua-ai-engineering-fellowship',
    titleEn: 'Baghdad-Tsinghua Joint AI & Sustainable Engineering Fellowship',
    titleAr: 'زمالة بغداد - تسينغهوا المشتركة في الذكاء الاصطناعي والهندسة المستدامة',
    titleZh: '巴格达大学与清华大学人工智能与可持续工程联合学者计划',
    titleCkb: 'هاوبەشی زانکۆی بەغدا و تسینگوا بۆ هۆشی دەستکرد و ئەندازیاری',
    descriptionEn: 'A premier dual-institution scholarship granting full doctoral and post-doctoral research residencies at Tsinghua University for Iraqi engineering and computer science researchers.',
    descriptionAr: 'منحة أكاديمية عليا توفر إقامات بحثية كاملة لدرجتي الدكتوراه وما بعد الدكتوراه في جامعة تسينغهوا العريقة لباحثي الهندسة وعلوم الحاسوب في العراق.',
    descriptionZh: '清华大学与巴格达大学联合设立的高端博后及博士联合培养奖学金，聚焦清洁能源电网、大模型算法及智慧基础设施应用。',
    descriptionCkb: 'زەمالەی تایبەتی دکتۆرا و پۆست-دکتۆرا لە زانکۆی تسینگوا لە چین بۆ توێژەران و ئەندازیارانی عێراق بە تەواوی خەرجییەکانەوە.',
    detailsEn: `The Baghdad-Tsinghua Joint Fellowship is the centerpiece of the comprehensive higher education protocol signed between the Iraqi Ministry of Higher Education and Scientific Research and Tsinghua University.

### Key Fellowship Tracks
- **Smart Infrastructure & Hydrology**: Developing neural-network modeling for Tigris-Euphrates water security and smart distribution networks.
- **Next-Gen Energy Systems**: Photovoltaic efficiency in high-ambient temperature desert environments, grid energy storage, and industrial microgrids.
- **Large Multimodal AI**: Natural Language Processing models focused on Arabic-Chinese cross-lingual legal, macroeconomic, and industrial terminology.

### Grant Package
- 100% tuition waiver at Tsinghua University School of Computing & Department of Civil Engineering.
- Comprehensive monthly research stipend (¥12,000 / month).
- State-of-the-art supercomputing allocation and lab bench resources.
- Fully funded travel allowances and medical insurance.`,
    detailsAr: `تمثل زمالة بغداد - تسينغهوا ركيزة التعاون الأكاديمي المشترك بين وزارة التعليم العالي والبحث العلمي العراقية وجامعة تسينغهوا المصنفة في طليعة جامعات آسيا والعالم.

### المسارات البحثية الأساسية:
- **البنية التحتية الذكية والهيدرولوجيا**: تطوير نماذج الشبكات العصبية لحماية الأمن المائي لنهري دجلة والفرات وإدارة الموارد المائية.
- **منظومات الطاقة النظيفة**: دراسة كفاءة الألواح الشمسية في البيئات الصحراوية وتخزين الطاقة والشبكات الكهربائية المستقلة.
- **نماذج الذكاء الاصطناعي اللغوية**: تطوير خوارزميات معالجة اللغة الطبيعية المتخصصة في الترجمة المصطلحية الصينية العربية في المجالات الاقتصادية والقانونية.

### حزمة الدعم والامتيازات:
- إعفاء دراسي بنسبة ١٠٠٪ في جامعة تسينغهوا.
- مخصصات بحثية ومعيشية شهرية (١٢,٠٠٠ يوان شهرياً).
- استخدام حواسيب فائقة السرعة ومختبرات تخصصية متقدمة.
- تغطية كاملة لتذاكر السفر السنوية والتأمين الصحي الشامل.`,
    detailsZh: `该联合学者计划旨在构筑中伊高等教育合作标杆，聚焦两河流域水资源数字化调控、沙漠极端工况光伏材料研发及中阿大语言模型工业应用。

入选学者将获得全额学费减免、高规格科研津贴（每月1.2万元人民币）、清华国家重点实验室算力支持及双向国际差旅保障。`,
    detailsCkb: `ئەم زەمالە زانستییە تایبەتە بە خوێندنی دکتۆرا و توێژینەوەی باڵا لە زانکۆی بەناوبانگی تسینگوا لە بوارەکانی وزەی نوێبووەوە و هۆشی دەستکرد.`,
    categorySlug: 'higher-education-university',
    institutionName: 'Tsinghua University & University of Baghdad',
    coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    eventDate: 'Fall Semester Intake 2026',
    programStartDate: '2026-09-15',
    programEndDate: '2029-06-30',
    applicationDeadline: 'June 30, 2026',
    eligibility: 'Holders of Master’s or Doctorate in Computer Science, Electrical, Civil, or Materials Engineering with minimum GPA 3.5/4.0.',
    contactUrl: '/en/contact?subject=tsinghua-fellowship',
    applicationUrl: 'https://cultural.iraqi-chineseagency.com/apply/tsinghua-phd',
    featured: true,
    order: 3
  },
  {
    slug: 'mustansiriyah-peking-archaeological-mou',
    titleEn: 'Mustansiriyah-Peking University Civilizational Heritage Alliance',
    titleAr: 'تحالف التراث الحضاري بين الجامعة المستنصرية وجامعة بكين',
    titleZh: '北京大学与穆斯坦西里亚大学两河-华夏古文明互鉴研究联盟',
    titleCkb: 'پەیمانی کەلەپووری شارستانی لە نێوان زانکۆی موستەنسرییە و زانکۆی پەکین',
    descriptionEn: 'A historic institutional partnership between two of the world\'s oldest academic lineages, advancing digital archeology, cuneiform preservation, and Silk Road comparative historiography.',
    descriptionAr: 'شراكة مؤسسية تاريخية تجمع بين أعرق الصروح المعرفية في العالم، متخصصة في الآثار الرقمية، حفظ الألواح المسمارية، ودراسات مقارنة تاريخ طريق الحرير.',
    descriptionZh: '依托两座承载千年文脉的高等学府，开展美索不达米亚楔形文字数字拓印、丝绸之路文献互译与历史地理多学科联合科考。',
    descriptionCkb: 'هاوبەشییەکی مێژوویی نێوان زانکۆی موستەنسرییە لە بەغدا و زانکۆی پەکین بۆ پاراستنی شوێنەوارە دێرینەکان و مێژووی ڕێگای ئاوریشم.',
    detailsEn: `Connecting Mustansiriyah University (originally founded in 1227 CE) and Peking University (established 1898 CE as the Imperial University of Peking), this alliance brings cutting-edge 3D photogrammetry and AI-assisted multispectral imaging to Iraqi antiquities.
Faculty and graduate students undertake dual field seasons in Babylon, Nineveh, and Xi'an.`,
    detailsAr: `تجمع هذه الاتفاقية بين الجامعة المستنصرية التي تأسست في بغداد عام ١٢٢٧ ميلادية وجامعة بكين المرموقة، وتوظف أحدث تقنيات التصوير الطيفي والمسح الليزري ثلاثي الأبعاد لحفظ الآثار العراقية وترجمة المخطوطات القديمة.`,
    detailsZh: `该联盟涵盖巴比伦遗址、尼尼微古城与中国西安大明宫遗址的多源遥感监测与文物数字化保护，每年选派青年学者赴中伊两地进行联合田野考古调查。`,
    detailsCkb: `ئەم پڕۆژەیە گرنگی دەدات بە بەکارهێنانی تەکنەلۆژیای سێ ڕەهەندی بۆ پاراستنی شوێنەوارە دێرینەکانی بابل و نەینەوا و بەڵگەنامە مێژووییەکان.`,
    categorySlug: 'higher-education-university',
    institutionName: 'Peking University School of Archaeology & Mustansiriyah University',
    coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80',
    eventDate: 'Ongoing Academic MOU (2025-2030)',
    programStartDate: '2025-10-01',
    programEndDate: null,
    applicationDeadline: null,
    eligibility: 'Academic faculty and post-graduate researchers in Archaeology, History, and Cultural Heritage Preservation.',
    contactUrl: '/en/contact?subject=peking-heritage',
    applicationUrl: 'https://cultural.iraqi-chineseagency.com/apply/heritage-alliance',
    featured: true,
    order: 4
  },

  // Category 3: Arts & Heritage Exchange
  {
    slug: 'mesopotamia-yangtze-calligraphy-dialogue',
    titleEn: 'Two Rivers, Two Scripts: Arabic & Chinese Calligraphy Masterclass',
    titleAr: 'حوار النهرين: ملتقى وأساتذة الخط العربي والخط الصيني بالفرشاة',
    titleZh: '两河墨韵：阿拉伯书法与中国宣纸水墨大师对话巡展',
    titleCkb: 'دوو ڕووبار، دوو خەت: شاکاری خۆشنووسی عەرەبی و چینی',
    descriptionEn: 'An unprecedented artistic residency bringing together legendary Iraqi master calligraphers with contemporary Chinese ink masters for collaborative exhibitions in Baghdad, Beijing, and Hangzhou.',
    descriptionAr: 'إقامة فنية استثنائية تجمع كبار أساتذة الخط العربي في العراق مع رواد فن الحبر والفرشاة الصينيين، وتتوج بمعارض مشتركة في بغداد وبكين وهانغتشو.',
    descriptionZh: '汇聚伊拉克顶级阿拉伯传统书法名家与中国国家画院水墨艺术大师的驻留创作计划，在巴格达、北京与杭州三地举办大型巡展。',
    descriptionCkb: 'پێشانگە و خولی تایبەتی خۆشنووسی بۆ کۆکردنەوەی مامۆستایانی خۆشنووسی عێراق و هونەرمەندانی وێنەکێشانی چینی.',
    detailsEn: `Focusing on the metaphysical rhythm and sacred geometry of both Arabic scripts (Thuluth, Kufic, Diwani) and Chinese calligraphy styles (Kaishu, Xingshu, Caoshu).
The program produces a collaborative commemorative art portfolio published in Arabic, Chinese, and English, accompanied by open public masterclasses.`,
    detailsAr: `يستكشف الملتقى الأبعاد الجمالية والهندسية المشتركة بين حروف الخط العربي الكوفي والثلث والديواني، وفنون الخط الصيني بالحبر على ورق شوان، مقدماً ورشاً تفاعلية مفتوحة للجمهور والطلبة.`,
    detailsZh: `该艺术驻留探索两大东方古老书法体系关于气韵、结构与留白的深刻哲学呼应，联合创作卷轴作品将被中伊两国国家博物馆永久馆藏。`,
    detailsCkb: `ئەم خولە لێکۆڵینەوە لە هاوبەشییە فەلسەفی و جوانییەکانی خۆشنووسی عەرەبی و چینی دەکات.`,
    categorySlug: 'arts-heritage',
    institutionName: 'China National Academy of Painting & Iraqi Calligraphers Society',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    eventDate: 'November 10 - December 5, 2026',
    programStartDate: '2026-11-10',
    programEndDate: '2026-12-05',
    applicationDeadline: 'August 15, 2026',
    eligibility: 'Practicing visual artists, calligraphers, and art institute faculty members.',
    contactUrl: '/en/contact?subject=calligraphy-masterclass',
    applicationUrl: 'https://cultural.iraqi-chineseagency.com/apply/calligraphy',
    featured: false,
    order: 5
  },

  // Category 4: Youth & Language Programs
  {
    slug: 'chinese-bridge-iraq-speaking-competition',
    titleEn: 'Chinese Bridge Proficiency Competition & Scholarship Pipeline',
    titleAr: 'مسابقة "جسر اللغة الصينية" الوطنية ومنح التبادل اللغوي في الصين',
    titleZh: '伊拉克“汉语桥”中文秀与全额语合交流奖学金选拔赛',
    titleCkb: 'پێشبڕکێی نیشتمانی "پردی زمانی چینی" و بەخشینی زەمالە',
    descriptionEn: 'The definitive annual Chinese language showcase for Iraqi university students, awarding full one-year and four-year language immersion scholarships at leading Chinese normal universities.',
    descriptionAr: 'المسابقة الوطنية السنوية الكبرى لإتقان اللغة الصينية لطلبة الجامعات العراقية، والتي تمنح الفائزين منحاً دراسية كاملة لدراسة اللغة الصينية في كبرى جامعات بكين ووهان.',
    descriptionZh: '面向伊拉克高校学子的顶级汉语水平大赛，优胜者将获得教育部中外语言交流合作中心全额赴华进修及攻读学位奖学金。',
    descriptionCkb: 'پێشبڕکێی گەورەی زمانی چینی بۆ قوتابیانی زانکۆکانی عێراق کە خەڵاتەکەی زەمالەی تەواوی خوێندنی یەک ساڵەی زمانە لە پەکین.',
    detailsEn: `Co-hosted by the Center for Language Education and Cooperation (CLEC) and the Iraqi-Chinese Agency, this competition evaluates Chinese speech, cultural talent performance (musical instruments, martial arts, or song), and knowledge of contemporary Chinese society.`,
    detailsAr: `تقام المسابقة برعاية مركز تعليم اللغة والتعاون الدولي (CLEC)، وتتضمن اختبارات في الإلقاء، المعرفة العامة، وتقديم فقرات من الفنون الصينية التقليدية، وتفتح آفاق العمل كمترجمين معتمدين.`,
    detailsZh: `赛事涵盖主题演讲、中华才艺展示与国情知识问答三大环节，累计已向伊拉克各省输送超过120名优秀青年赴华深造。`,
    detailsCkb: `ئەم پێشبڕکێیە ڕێگە بۆ لاوانی عێراق دەکاتەوە لە بوارەکانی وەرگێڕان و بازرگانی نێودەوڵەتیدا کار بکەن.`,
    categorySlug: 'youth-language',
    institutionName: 'Beijing Language and Culture University (BLCU) & CLEC',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    eventDate: 'Annual Finals: October 2026',
    programStartDate: '2026-10-18',
    programEndDate: '2026-10-22',
    applicationDeadline: 'September 1, 2026',
    eligibility: 'Enrolled undergraduate or postgraduate students with HSK-3 certification or equivalent learning background.',
    contactUrl: '/en/contact?subject=chinese-bridge',
    applicationUrl: 'https://cultural.iraqi-chineseagency.com/apply/chinese-bridge',
    featured: false,
    order: 6
  },

  // Category 5: Professional & Vocational Exchange
  {
    slug: 'luban-workshop-modern-rail-telecom',
    titleEn: 'Luban Workshop: Advanced High-Speed Rail & 5G Telecommunications',
    titleAr: 'ورشة لوبان المتقدمة: تدريب تقنيات سكك الحديد الحديثة واتصالات الجيل الخامس',
    titleZh: '伊拉克鲁班工坊：高铁牵引供电与5G智能通信高端职教培训',
    titleCkb: 'وۆرکشۆپی لوبان: ڕاهێنانی تەکنیکی شەمەندەفەری خێرا و پەیوەندییەکانی 5G',
    descriptionEn: 'State-of-the-art vocational training hubs established under the famed Chinese "Luban Workshop" framework, certifying Iraqi technicians in smart railway signalling and industrial IoT.',
    descriptionAr: 'مراكز تدريب تقني وهندسي فائق التطور ضمن إطار "ورش لوبان" العالمية، تمنح شهادات مهنية دولية للفنيين العراقيين في إشارات القطارات الذكية وإنترنت الأشياء الصناعي.',
    descriptionZh: '中伊职业技术教育合作的里程碑项目，配备全真模拟高铁调度台与5G专网实训系统，直接对接中伊重大基础设施项目人才用工需求。',
    descriptionCkb: 'ناوەندێکی پێشکەوتووی ڕاهێنانی پیشەیی لە عێراق بە هەماهەنگی لەگەڵ پسپۆڕانی چین بۆ پێگەیاندنی تەکنیککاران لە بواری گواستنەوەی مۆدێرن.',
    detailsEn: `The Luban Workshop provides continuous 6-month modular certification courses for Iraqi civil and electrical technicians.
Participants train directly on enterprise-grade hardware provided by CRRC and Huawei, enabling direct career placement with flagship Belt and Road infrastructure projects in Iraq.`,
    detailsAr: `توفر ورشة لوبان دورات تدريبية متخصصة تمتد لـ ٦ أشهر، يتدرب خلالها المهندسون والفنيون العراقيون على أحدث المعدات الصناعية التي توفرها شركات عالمية رائدة، مما يؤهلهم للعمل المباشر في كبرى المشاريع الوطنية.`,
    detailsZh: `工坊采取“学历教育+职业培训”双轨制，每年为伊拉克铁路总局、电力部门及主流通信运营商定向输送数百名持证高技能人才。`,
    detailsCkb: `ئەم خولە ٦ مانگییە ئامانجی پەروەردەکردنی کادری تەکنیکی عێراقییە بۆ بەڕێوەبردنی پڕۆژە پیشەسازییە گەورەکان.`,
    categorySlug: 'professional-vocational',
    institutionName: 'Tianjin Railway Technical College & Iraqi Ministry of Transport',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    eventDate: 'Cohort 4 Enrollment (August 2026)',
    programStartDate: '2026-08-15',
    programEndDate: '2027-02-15',
    applicationDeadline: 'July 10, 2026',
    eligibility: 'Technical diploma or Bachelor in Electrical, Mechanical, Civil, or Telecommunications Engineering.',
    contactUrl: '/en/contact?subject=luban-workshop',
    applicationUrl: 'https://cultural.iraqi-chineseagency.com/apply/luban',
    featured: true,
    order: 7
  }
];

export async function seedCulturalExchange() {
  try {
    console.log('🏛️ Checking and seeding Cultural Exchange data...');

    // 1. Seed or update categories
    const categoryMap: Record<string, string> = {};

    for (const cat of SEED_CULTURAL_CATEGORIES) {
      const existing = await prisma.culturalExchangeCategory.findUnique({
        where: { slug: cat.slug }
      });

      if (!existing) {
        const created = await prisma.culturalExchangeCategory.create({
          data: {
            slug: cat.slug,
            nameEn: cat.nameEn,
            nameAr: cat.nameAr,
            nameZh: cat.nameZh,
            nameCkb: cat.nameCkb,
            order: cat.order
          }
        });
        categoryMap[cat.slug] = created.id;
        console.log(`  + Created cultural category: ${cat.nameEn}`);
      } else {
        categoryMap[cat.slug] = existing.id;
      }
    }

    // 2. Seed programs
    for (const prog of SEED_CULTURAL_PROGRAMS) {
      const catId = categoryMap[prog.categorySlug];
      if (!catId) continue;

      const existingProg = await prisma.culturalExchangeProgram.findUnique({
        where: { slug: prog.slug }
      });

      if (!existingProg) {
        await prisma.culturalExchangeProgram.create({
          data: {
            slug: prog.slug,
            titleEn: prog.titleEn,
            titleAr: prog.titleAr,
            titleZh: prog.titleZh,
            titleCkb: prog.titleCkb,
            descriptionEn: prog.descriptionEn,
            descriptionAr: prog.descriptionAr,
            descriptionZh: prog.descriptionZh,
            descriptionCkb: prog.descriptionCkb,
            detailsEn: prog.detailsEn,
            detailsAr: prog.detailsAr,
            detailsZh: prog.detailsZh,
            detailsCkb: prog.detailsCkb,
            categoryId: catId,
            institutionName: prog.institutionName,
            coverImage: prog.coverImage,
            eventDate: prog.eventDate,
            programStartDate: prog.programStartDate,
            programEndDate: prog.programEndDate,
            applicationDeadline: prog.applicationDeadline,
            eligibility: prog.eligibility,
            contactUrl: prog.contactUrl,
            applicationUrl: prog.applicationUrl,
            featured: prog.featured,
            order: prog.order
          }
        });
        console.log(`  + Created cultural program: ${prog.titleEn}`);
      }
    }

    console.log('✅ Cultural Exchange seeding verified.');
  } catch (error) {
    console.error('⚠️ Error seeding cultural exchange data:', error);
  }
}
