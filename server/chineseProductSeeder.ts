import { prisma } from './db.js';

export const ALL_CHINESE_PRODUCTS = [
  // ==========================================
  // SECTOR 1: AUTOMOTIVE & EVS (5 Products)
  // ==========================================
  {
    titleEn: 'BYD Song Plus EV & PHEV Crossover',
    titleAr: 'بي واي دي سونغ بلس الكهربائية والهجينة',
    titleZh: '比亚迪宋PLUS新能源智能SUV',
    titleCkb: 'بی وای دی سۆنگ پلەس کارەبایی و هایبرید',
    descriptionEn: 'The leading smart electric crossover in Iraq\'s expanding clean energy automotive market, featuring ultra-safe Blade Battery technology and 605km extended range.',
    descriptionAr: 'الكروس أوفر الكهربائي الذكي الأكثر طلباً في سوق السيارات العراقي، مدعوم بتقنية بطارية Blade الفائقة الأمان ومدى قيادة يصل إلى 605 كم.',
    descriptionZh: '伊拉克新能源汽车市场畅销榜首的智能紧凑型SUV，搭载高安全刀片电池与DiPilot智能驾驶辅助，综合工况续航达605公里。',
    descriptionCkb: 'پڕفرۆشترین ئۆتۆمبێلی کارەبایی زیرەک لە بازاڕی عێراق، بە پاتری Blade ی پێشکەوتوو و توانای بڕینی 605 کم بە یەک بارگاویکردن.',
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80',
    category: 'AUTOMOTIVE',
    link: '/en/contact?inquiry=byd-song-plus',
    isFeatured: true,
    order: 1
  },
  {
    titleEn: 'Changan UNI-K AWD Intelligent Luxury SUV',
    titleAr: 'شانجان يوني-كي الذكية رباعية الدفع الفاخرة',
    titleZh: '长安 UNI-K 智电全轮驱动未来感豪华旗舰SUV',
    titleCkb: 'ئۆتۆمبێلی شانگان یونی کەی چوار دەفەر',
    descriptionEn: 'Futuristic design language paired with luxury cabin appointments, Sony surround acoustics, and intelligent all-wheel-drive, dominating modern urban transport in Iraqi metropolitan hubs.',
    descriptionAr: 'سيارة كروس أوفر مستقبلية بتصميم جريء ومقصورة مجهزة بأحدث تقنيات الرفاهية والأمان، تحظى بشعبية متزايدة في شوارع المدن العراقية.',
    descriptionZh: '融合未来科幻机甲设计语言与奢华舒适座舱的智能旗舰SUV，在伊拉克各大主要都市道路与家庭市场深受欢迎。',
    descriptionCkb: 'ئۆتۆمبێلی مۆدێرنی خێزانی بە دیزاینێکی داهێنەرانە و پڕ لە تایبەتمەندی ئاسوودەیی کە خواستی زۆری لەسەرە لە شارەکانی عێراق.',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    category: 'AUTOMOTIVE',
    link: '/en/contact?inquiry=changan-uni-k',
    isFeatured: true,
    order: 2
  },
  {
    titleEn: 'Zeekr 001 Luxury Shooting Brake EV',
    titleAr: 'زيكر 001 شوتينغ بريك الكهربائية الفاخرة',
    titleZh: '极氪 ZEEKR 001 全能豪华猎装智能轿跑',
    titleCkb: 'ئۆتۆمبێلی کارەبایی لوکس زیکر 001',
    descriptionEn: 'Ultra-fast 800V high-voltage architecture delivering 10% to 80% charge in 15 minutes, dual motors with 0-100 km/h in 3.8s, tailored for high-speed intercity routes.',
    descriptionAr: 'هندسة شحن فائقة السرعة بجهد 800 فولت تمنح شحناً من 10% إلى 80% في 15 دقيقة فقط، مع محركين بقوة تسارع من 0 إلى 100 كم/س خلال 3.8 ثانية.',
    descriptionZh: '全栈800V高压超充架构，双电机四驱零百加速仅需3.8秒，兼具跑车操控与SUV空间的跨界纯电猎装标杆。',
    descriptionCkb: 'سیستەمی بارگاویکردنی خێرای 800 ڤۆڵت کە لە 15 خولەکدا 80% بارگاوی دەبێتەوە، بە خێرایی لە 0 بۆ 100 کم/ک لە 3.8 چرکەدا.',
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    category: 'AUTOMOTIVE',
    link: '/en/contact?inquiry=zeekr-001',
    isFeatured: true,
    order: 3
  },
  {
    titleEn: 'Geely Monjaro High-Performance Flagship SUV',
    titleAr: 'جيلي مونجارو الدفع الرباعي الرياضي الفخم',
    titleZh: '吉利星越L (Monjaro) 旗舰级智能全地形SUV',
    titleCkb: 'جیلی مۆنجارۆ ئۆتۆمبێلی چوار دەفەری پێشکەوتوو',
    descriptionEn: 'Powered by a 2.0L turbocharged engine and BorgWarner 6th-gen 4WD, equipped with IMAX triple 12.3-inch smart screens and AR-HUD heads-up display.',
    descriptionAr: 'مزودة بمحرك توربيني 2.0 لتر ونظام دفع رباعي ذكي من بورغ وارنر، مع ثلاث شاشات رقمية بانورامية وتقنية العرض على الزجاج الأمامي AR-HUD.',
    descriptionZh: 'CMA高阶架构打造，搭载Drive-E系列2.0TD高功率发动机与博格华纳第六代四驱，座舱IMAX三联屏与AR-HUD提供全方位数字沉浸体验。',
    descriptionCkb: 'بە مۆتۆری 2.0 تێربۆ و سیستەمی چوار دەفەری زیرەک، لەگەڵ سێ شاشەی پانۆراما و تەکنەلۆژیای زیرەکی پێشکەوتوو.',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    category: 'AUTOMOTIVE',
    link: '/en/contact?inquiry=geely-monjaro',
    isFeatured: true,
    order: 4
  },
  {
    titleEn: 'Chery Tiggo 8 Pro Max 7-Seater Luxury Crossover',
    titleAr: 'شيري تيجو 8 برو ماكس العائلية بسبعة مقاعد',
    titleZh: '奇瑞瑞虎8 PRO MAX 豪华7座智能全场景SUV',
    titleCkb: 'شێری تیگۆ 8 پرۆ ماکس حەوت سەرنشین',
    descriptionEn: 'Spacious 7-seater executive layout with 2.0 TGDI high-output engine, ADAS level 2.5 autonomous safety, and tropical dual-zone rear AC for Iraqi families.',
    descriptionAr: 'مقصورة عائلية رحبة تتسع لـ 7 ركاب، بمحرك 2.0 TGDI قوي وأنظمة أمان متطورة المستوى 2.5 مع تكييف استوائي خلفي مستقل.',
    descriptionZh: '奇瑞鲲鹏动力2.0TGDI全场景智能四驱7座SUV，配备L2.5级智能驾驶辅助与双温区后排强力独立空调，为家庭与商务出行保驾护航。',
    descriptionCkb: 'ئۆتۆمبێلی خێزانی 7 نەفەری بە مۆتۆری بەهێز و سیستەمی ئۆتۆماتیکی زیرەکی سەلامەتی و فێنککەرەوەی تایبەت بە کەشوهەوای ناوچەکە.',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    category: 'AUTOMOTIVE',
    link: '/en/contact?inquiry=chery-tiggo-8',
    isFeatured: true,
    order: 5
  },

  // ==========================================
  // SECTOR 2: SOLAR & RENEWABLE (5 Products)
  // ==========================================
  {
    titleEn: 'LONGi Hi-MO X6 High-Efficiency Solar PV Modules',
    titleAr: 'ألواح لونجي هاي-إم أو الشمسية الكهروضوئية فائقة الكفاءة',
    titleZh: '隆基绿能 Hi-MO X6 高效耐高温光伏组件',
    titleCkb: 'تەختەی وزەی خۆری لۆنجی بە کوالێتی بەرز',
    descriptionEn: 'High-efficiency HPBC cell technology engineered for extreme high-temperature desert climates in southern and central Iraq, boasting 23.3% peak module efficiency.',
    descriptionAr: 'ألواح كهروضوئية عالية الكفاءة مصممة خصيصاً لمقاومة درجات الحرارة المرتفعة والمناخ الصحراوي في العراق، بكفاءة تشغيلية رائدة تصل إلى 23.3%.',
    descriptionZh: '专为中东及伊拉克高温沙漠严苛环境研发的高效HPBC光伏组件，转换效率达23.3%，保障严寒酷暑下的全天候发电稳定性。',
    descriptionCkb: 'تەختەی وزەی خۆری بەرزترین کوالێتی کە تایبەت دروستکراوە بۆ کەشوهەوای گەرم و بیابانی عێراق بە توانای کارکردنی 23.3%.',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    category: 'SOLAR_ENERGY',
    link: '/en/contact?inquiry=longi-solar-iraq',
    isFeatured: true,
    order: 6
  },
  {
    titleEn: 'JinkoSolar Tiger Neo N-Type TOPCon 620W Panels',
    titleAr: 'ألواح جينكو سولار تايغر نيو إن-تايب 620 واط',
    titleZh: '晶科能源 Tiger Neo N型TOPCon 620W 高效双面双玻组件',
    titleCkb: 'تەختەی وزەی خۆری جینکۆ سۆلار 620 واط',
    descriptionEn: 'SMBB half-cut cell technology offering ultra-low annual degradation (-0.40%/year) and up to 85% bifaciality for ground-mounted solar farms across Basra and Najaf.',
    descriptionAr: 'تقنية خلايا N-Type TOPCon المتطورة بنسبة تدهور سنوي ضئيلة (-0.40%) ووجهين لتوليد الطاقة بكفاءة 85% لمزارع الطاقة الشمسية الكبرى.',
    descriptionZh: '采用行业领先的N型TOPCon电池技术，双面率高达85%，具备优异的抗PID耐沙尘性能，年衰减率低至0.40%。',
    descriptionCkb: 'تەکنەلۆژیای پێشکەوتووی N-Type بە توانای 620 واط کە لە هەردوو ڕووەوە تیشکی خۆر وەردەگرێت و تەمەنێکی درێژی هەیە.',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80',
    category: 'SOLAR_ENERGY',
    link: '/en/contact?inquiry=jinko-tiger-neo',
    isFeatured: true,
    order: 7
  },
  {
    titleEn: 'Huawei FusionSolar Commercial Smart PV & Storage',
    titleAr: 'محولات هواوي فيوجن سولار الذكية مع بطاريات التخزين',
    titleZh: '华为数字能源 FusionSolar 智能光储一体化解决方案',
    titleCkb: 'سیستەمی وزەی خۆری هۆواوی و باتری پاشەکەوتکردن',
    descriptionEn: 'SUN2000 smart string inverters paired with LUNA2000 smart energy storage, featuring AI-assisted AFCI arc-fault protection and zero grid disturbance.',
    descriptionAr: 'محولات سلسلة SUN2000 الذكية مع أنظمة تخزين الطاقة LUNA2000 المدعومة بالذكاء الاصطناعي لحماية المنشآت الصناعية والمصانع العراقية من انقطاع التيار.',
    descriptionZh: '业界首创AI智能电弧防护（AFCI）与组串式智能光储融合架构，0ms极速离网切换，彻底解决工商业用户电力不稳痛点。',
    descriptionCkb: 'سیستەمی زیرەکی هۆواوی بە پاراستنی تەواو لە کێشەکانی کارەبا و پاتری تایبەت بۆ بەردەوامبوونی کارەبا لە کارگە و کۆمپانیاکان.',
    imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
    category: 'SOLAR_ENERGY',
    link: '/en/contact?inquiry=huawei-fusionsolar',
    isFeatured: true,
    order: 8
  },
  {
    titleEn: 'Trina Solar Vertex DEG21C Bifacial Dual-Glass 670W',
    titleAr: 'ألواح ترينا سولار فيرتكس ثنائية الزجاج 670 واط',
    titleZh: '天合光能 至尊 Vertex 670W 超高功率双玻组件',
    titleCkb: 'تەختەی تڕینا سۆلار ڤێرتێکس 670 واط',
    descriptionEn: 'Engineered on 210mm silicon wafers delivering 670W+ maximum output, encased in 2.0mm dual heat-strengthened glass with high sandstorm and ammonia resistance.',
    descriptionAr: 'مصممة برقاقات سيليكون 210 مم لإنتاج طاقة قصوى تتجاوز 670 واط، مغلفة بزجاج مزدوج مقوى لمقاومة العواصف الرملية والأتربة في العراق.',
    descriptionZh: '基于210mm大尺寸硅片与无损切割微距技术，双玻双面发电，全面抵抗中东沙尘暴、高温及氨气化学腐蚀。',
    descriptionCkb: 'تەختەی بەهێز بە توانای 670 واط کە بە دوو چینی شووشەی تایبەت داپۆشراوە بۆ بەرگەگرتنی تۆز و گەرمای بەرز.',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    category: 'SOLAR_ENERGY',
    link: '/en/contact?inquiry=trina-vertex',
    isFeatured: true,
    order: 9
  },
  {
    titleEn: 'Sungrow SG350HX Utility-Scale String Inverter & Liquid ESS',
    titleAr: 'محولات سونغرو الكبرى بقدرة 352 كيلوواط مع نظام التبريد السائل',
    titleZh: '阳光电源 SG350HX 地面电站组串逆变器与液冷储能系统',
    titleCkb: 'ئینڤێرتەری پیشەسازی سونگرۆو و سیستەمی ساردکردنەوەی شل',
    descriptionEn: 'Heavy-duty 352kW utility inverter with IP66 ingress rating and C5 anti-corrosion, integrated with intelligent liquid-cooling energy storage containers.',
    descriptionAr: 'محول عملاق لمحطات الطاقة بقدرة 352 كيلوواط مع حماية IP66 ومقاومة التآكل C5، متكامل مع حاويات تخزين الطاقة المبردة بالسوائل.',
    descriptionZh: '单机功率达352kW，具备IP66与C5级高防腐防护，智能分区风冷与液冷储能深度协同，适应50℃以上极端中东沙漠环境。',
    descriptionCkb: 'ئینڤێرتەری پیشەسازی بۆ وێستگەکانی کارەبا بە توانای 352 کیلۆواط بە سیستەمی ساردکردنەوەی پێشکەوتوو بۆ کەشی گەرم.',
    imageUrl: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=1200&q=80',
    category: 'SOLAR_ENERGY',
    link: '/en/contact?inquiry=sungrow-sg350hx',
    isFeatured: true,
    order: 10
  },

  // ==========================================
  // SECTOR 3: HEAVY MACHINERY (5 Products)
  // ==========================================
  {
    titleEn: 'XCMG XE215D Heavy Hydraulic Excavator',
    titleAr: 'حفار هيدروليكي ثقيل من إكس سي إم جي (XCMG)',
    titleZh: '徐工集团 XE215D 旗舰级智能液压挖掘机',
    titleCkb: 'حەفارەی هایدرۆلیکی قورسی XCMG',
    descriptionEn: 'Premium heavy excavation machinery deployed across Iraq\'s national infrastructure reconstruction, highway corridors, and Belt and Road projects.',
    descriptionAr: 'حفارات هيدروليكية ذكية متينة تعتمد عليها كبرى مشاريع إعادة إعمار البنية التحتية والموانئ والطرق السريعة في مختلف المحافظات العراقية.',
    descriptionZh: '广泛应用于伊拉克全国基础设施重建、公路网络以及“一带一路”重点工业标杆工地的旗舰级中重型智能液压挖掘机。',
    descriptionCkb: 'حەفارەی هایدرۆلیکی پێشکەوتوو کە لە پڕۆژەکانی ئاوەدانکردنەوەی ژێرخان و پڕۆژەکانی ڕێگای ئاوریشم لە عێراق بەکاردەهێنرێت.',
    imageUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    category: 'HEAVY_MACHINERY',
    link: '/en/contact?inquiry=xcmg-heavy-machinery',
    isFeatured: true,
    order: 11
  },
  {
    titleEn: 'SANY SY365H Heavy-Duty Mining & Construction Excavator',
    titleAr: 'حفارة ساني SY365H للتعدين والأشغال الشاقة',
    titleZh: '三一重工 SY365H 重载矿山型液压挖掘机',
    titleCkb: 'حەفارەی سانی SY365H بۆ کارە قورسەکانی کونکردن و بیناسازی',
    descriptionEn: '36-ton reinforced high-tensile steel excavator equipped with a custom Cummins QSL9 engine and automated load-sensing hydraulic distribution for harsh Iraqi earthworks.',
    descriptionAr: 'حفارة وزن 36 طناً من الفولاذ المقاوم للإجهاد، مجهزة بمحرك كامنز QSL9 ونظام هيدروليكي ذكي للأعمال الجبلية والترابية الشاقة.',
    descriptionZh: '36吨级重载矿山利器，搭载定制化康明斯发动机与高压电控正流量液压系统，油耗更低、挖掘力更强，专克坚硬岩石与大负荷施工。',
    descriptionCkb: 'حەفارەی 36 تۆنی زۆر بەهێز بە مۆتۆری کەمینز و سیستەمی هایدرۆلیکی پێشکەوتوو بۆ پرۆژە سەختەکان.',
    imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
    category: 'HEAVY_MACHINERY',
    link: '/en/contact?inquiry=sany-sy365h',
    isFeatured: true,
    order: 12
  },
  {
    titleEn: 'Zoomlion ZTC800V 80-Ton Intelligent Truck Crane',
    titleAr: 'رافعة هيدروليكية متنقلة زومليون ZTC800V حمولة 80 طناً',
    titleZh: '中联重科 ZTC800V 80吨汽车起重机',
    titleCkb: 'کرێنی گەڕۆکی زووملیۆن 80 تۆن',
    descriptionEn: 'Equipped with a 5-section 49-meter U-shaped main boom, CAN-bus intelligent control, and heavy dual-engine chassis for bridge construction and oil refineries.',
    descriptionAr: 'مزودة بذراع رئيسي خماسي الأقسام بطول 49 متراً بشكل حرف U، مع تحكم رقمي ذكي وقدرة رفع فائقة لبناء الجسور ومنشآت النفط والغاز.',
    descriptionZh: '五节49米U型主臂，行业领先的综合起重性能，配备全新智能总线控制与多模式回转缓冲，在桥梁吊装与炼油化工建设中表现卓越。',
    descriptionCkb: 'کرێنی 80 تۆنی پێشکەوتوو بە باڵی 49 مەتری بەهێز بۆ پڕۆژەکانی پرد و کۆمپانیاکانی نەوت و گاز.',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    category: 'HEAVY_MACHINERY',
    link: '/en/contact?inquiry=zoomlion-ztc800v',
    isFeatured: true,
    order: 13
  },
  {
    titleEn: 'LiuGong 856H MAX Heavy Industrial Wheel Loader',
    titleAr: 'لودر ليوغونغ 856H MAX الثقيل للمحاجر ومواد البناء',
    titleZh: '柳工 856H MAX 旗舰级重型轮式装载机',
    titleCkb: 'شۆفڵی پیشەسازی لیوگۆنگ 856H MAX',
    descriptionEn: 'Cummins QSL9.3 high-torque engine with ZF automatic powershift transmission and 5.5-ton rated payload, built to withstand Iraqi aggregate loading cycles.',
    descriptionAr: 'محرك كامنز QSL9.3 عالي العزم مع ناقل حركة أوتوماتيكي ZF وحمولة تشغيلية 5.5 طن لتحميل الحصى والرمل والأسمنت دون توقف.',
    descriptionZh: '搭载康明斯QSL9.3大扭矩发动机与德国采埃孚自动变速箱，额定载重5.5吨，重载结构件与防尘密封座舱专为砂石采掘工况定制。',
    descriptionCkb: 'شۆفڵی پیشەسازی بە توانای بارکردنی 5.5 تۆن بە مۆتۆری کەمینز بۆ کارکردن لە ناوچەکانی بەرد و بیناسازی.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    category: 'HEAVY_MACHINERY',
    link: '/en/contact?inquiry=liugong-856h',
    isFeatured: true,
    order: 14
  },
  {
    titleEn: 'Shantui DH17-C3 Full Hydrostatic Crawler Bulldozer',
    titleAr: 'بلدوزر شانتوي DH17-C3 الهيدروستاتيكي لمشاريع الطرق والصحراء',
    titleZh: '山推股份 DH17-C3 全液压静液压传动履带推土机',
    titleCkb: 'بۆڵدۆزەری شانتوی DH17-C3 هایدرۆستاتیکی',
    descriptionEn: 'Dual-circuit electronically controlled hydrostatic drive, Weichai Tier 3 electronic injection engine, and heavy semi-U blade engineered for desert road grading.',
    descriptionAr: 'نظام دفع هيدروستاتيكي متطور بدائرتين مع محرك ويتشاي بحقن إلكتروني ونصلة نصف مقوسة لتمهيد الطرق الصحراوية في العراق.',
    descriptionZh: '双回路电控静液压驱动系统，搭载潍柴电喷高扭矩引擎与重型半U推土铲，无极变速，在沙漠铺路与土石方压实中极具效率。',
    descriptionCkb: 'بۆڵدۆزەری پێشکەوتوو بە سیستەمی هایدرۆستاتیک و هێزی زۆر بۆ ڕێکخستنی ڕێگا و خاکی بیابانی.',
    imageUrl: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80',
    category: 'HEAVY_MACHINERY',
    link: '/en/contact?inquiry=shantui-dh17',
    isFeatured: true,
    order: 15
  },

  // ==========================================
  // SECTOR 4: HOME APPLIANCES (5 Products)
  // ==========================================
  {
    titleEn: 'Gree Tropical T3 Inverter Air Conditioners',
    titleAr: 'مكيفات غري الاستوائية الموفرة للطاقة بضاغط T3',
    titleZh: '格力 T3 超重载热带变频节能空调',
    titleCkb: 'سپلێتی گری گەرمایی بەهێز بۆ هاوینی عێراق',
    descriptionEn: 'Heavy-duty T3 compressor air conditioning units engineered to sustain continuous powerful cooling in Iraqi summer temperatures exceeding 55°C with minimal energy draw.',
    descriptionAr: 'أنظمة تكييف استوائية متطورة بضاغط T3 فائق التحمل، مصممة لتحقيق تبريد فائق مستمر حتى في ذروة صيف العراق عند درجات حرارة تتجاوز 55 مئوية.',
    descriptionZh: '配备超强T3热带压缩机的全直流变频冷暖空调，专为55℃极端酷热中东盛夏工况量身打造，高效节能制冷。',
    descriptionCkb: 'سپلێت و سیستەمی فێنککەرەوەی پێشکەوتوو بە کۆمپرێسەری بەهێزی T3 کە لە پلەی گەرمای زیاتر لە 55 پلە بە کەمترین کارەبا کار دەکات.',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    category: 'HOME_APPLIANCES',
    link: '/en/contact?inquiry=gree-tropical-ac',
    isFeatured: true,
    order: 16
  },
  {
    titleEn: 'Midea Breezeless T3 Extreme Climate Split AC',
    titleAr: 'مكيف ميديا بريزلس الاستوائي بتقنية الهواء غير المباشر',
    titleZh: '美的 Breezeless 无风感热带极端气候智能空调',
    titleCkb: 'سپلێتی میدیا بریزلێس بۆ کەشوهەوای گەرم',
    descriptionEn: 'Features 7,928 micro-holes dispersion avoiding direct blast, dual Inverter Quattro compressor operating reliably at up to 60°C ambient temperatures.',
    descriptionAr: 'تكنولوجيا تشتيت الهواء عبر 7928 ثقباً دقيقاً لتبريد مريح بدون تيار هواء مباشر، مع ضاغط Inverter Quattro يعمل حتى 60 درجة مئوية.',
    descriptionZh: '独创双导风板内外7928个微孔导风技术，实现柔和无风感舒适降温，搭载Quattro极光压缩机无惧60℃极限酷热。',
    descriptionCkb: 'تەکنەلۆژیای بێبای فێنککردنەوە بە زیاتر لە 7 هەزار کونیلەی بچووک کە بە نەرمی ژوورەکە سارد دەکاتەوە لە گەرمای بەرزدا.',
    imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=1200&q=80',
    category: 'HOME_APPLIANCES',
    link: '/en/contact?inquiry=midea-breezeless',
    isFeatured: true,
    order: 17
  },
  {
    titleEn: 'Haier Smart Multi-Door Twin-Inverter Refrigerator',
    titleAr: 'ثلاجة و فريزر هاير الذكية متعددة الأبواب بتبريد مزدوج',
    titleZh: '海尔 全空间保鲜双变频多门智能冰箱',
    titleCkb: 'سەلاجەی فرەدەرگای هایەر بە تەکنەلۆژیای پاشەکەوتکردن',
    descriptionEn: '520L executive capacity with Fresher Shield technology, ABT antibacterial ion sterilization, and 100-hour cooling retention during power outages.',
    descriptionAr: 'سعة 520 لتراً بتقنية الحفاظ على نضارة الأغذية وتعقيم أيوني بنسبة 99.9%، مع احتفاظ بالبرودة لمدة 100 ساعة أثناء انقطاع الكهرباء.',
    descriptionZh: '520升大容量多门旗舰，搭载全空间保鲜科技与ABT动态离子除菌，即使断电亦可保温锁鲜长达100小时，契合伊拉克家庭刚需。',
    descriptionCkb: 'سەلاجەی 520 لیتری هایەر کە بەبێ کارەباش تا 100 کاتژمێر خواردن سارد و پارێزراو دەهێڵێتەوە.',
    imageUrl: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1200&q=80',
    category: 'HOME_APPLIANCES',
    link: '/en/contact?inquiry=haier-refrigerator',
    isFeatured: true,
    order: 18
  },
  {
    titleEn: 'Roborock S8 Pro Ultra Smart Robotic Vacuum & Mop',
    titleAr: 'مكنسة روبوروك S8 برو ألترا الذكية لمسح وتنظيف المنازل',
    titleZh: '石头科技 S8 Pro Ultra 全能六合一扫拖机器人',
    titleCkb: 'گسک و سڕەری زیرەکی ڕۆبۆرۆک S8 پرۆ',
    descriptionEn: 'RockDock Ultra all-in-one hands-free base with automatic mop washing, drying, and dust emptying, featuring 6000Pa hyper-suction and 3D reactive obstacle avoidance.',
    descriptionAr: 'قاعدة شحن متكاملة تقوم بغسل الممسحة وتجفيفها وتفريغ الغبار آلياً، بقوة شفط 6000 باسكال وملاحة ليزرية ثلاثية الأبعاد.',
    descriptionZh: '十项全能基站，自动洗拖布、自动烘干与自动集尘，具备6000Pa强劲飓风吸力与Reactive 3D结构光避障，轻松应对沙尘侵袭。',
    descriptionCkb: 'ڕۆبۆتی زیرەک بۆ پاککردنەوە و سڕین کە خۆی خاوێن دەبێتەوە و تۆز و خۆڵ بە هێزی 6000 باسكاڵ هەڵدەمژێت.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    category: 'HOME_APPLIANCES',
    link: '/en/contact?inquiry=roborock-s8-ultra',
    isFeatured: true,
    order: 19
  },
  {
    titleEn: 'TCL FreshAIR Series Smart Pro Wall-Mounted AC',
    titleAr: 'مكيف تي سي إل فريش إير بتبادل الهواء النقي الخارجي',
    titleZh: 'TCL 新风空调小蓝翼Pro系列',
    titleCkb: 'سپلێتی تی سی ئێڵ بە سیستەمی هەوای پاکژ',
    descriptionEn: 'Introduces 60m³/h of fresh filtered outside air without opening windows, equipped with quadruple HEPA dust filtration and smart TVOC air quality sensing.',
    descriptionAr: 'يدخل 60 متراً مكعباً في الساعة من الهواء الخارجي المنقى عبر فلاتر HEPA رباعية، مع مستشعر ذكي لجودة الهواء دون الحاجة لفتح النوافذ.',
    descriptionZh: '具备60m³/h大新风量引入与四重HEPA深度滤网，内置空气质量TVOC智能显示环，让封闭室内随时呼吸如森林般纯净清新空气。',
    descriptionCkb: 'سیستەمی تێکەڵکردنی هەوای پاک لە دەرەوە بە فلتەری تایبەتی چوارینە بۆ نەهێشتنی تۆز و بۆنی ناخۆش.',
    imageUrl: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=1200&q=80',
    category: 'HOME_APPLIANCES',
    link: '/en/contact?inquiry=tcl-freshair',
    isFeatured: true,
    order: 20
  },

  // ==========================================
  // SECTOR 5: CONSUMER ELECTRONICS & AIOT (5 Products)
  // ==========================================
  {
    titleEn: 'Xiaomi 14 Ultra & Smart AIoT Ecosystem',
    titleAr: 'شاومي 14 ألترا مع منظومة إنترنت الأشياء والذكاء الاصطناعي',
    titleZh: '小米14 Ultra 徕卡全焦段旗舰与澎湃智联生态',
    titleCkb: 'شاۆمی 14 ئۆڵترا و سیستەمی ماڵی زیرەک',
    descriptionEn: 'Flagship Leica quad-camera mobile imaging technology and smart home ecosystem trending rapidly among tech-savvy Iraqi professionals and youth across Baghdad and Erbil.',
    descriptionAr: 'الهاتف الرائد المزود بعدسات Leica الاحترافية ومنظومة المنزل الذكي المتكاملة الأكثر رواجاً ومبيعاً في أسواق الإلكترونيات في بغداد وأربيل.',
    descriptionZh: '搭载徕卡光学全焦段四摄系统的小米影像旗舰手机及澎湃OS智能物联网生态，在中东及伊拉克各大都市科技消费者群体中持续引领热潮。',
    descriptionCkb: 'مۆبایلی زیرەکی پێشکەوتوو بە کامێرای پیشەگەری لایکا و سیستەمی ماڵی زیرەک، یەکێک لە پڕفرۆشترینەکان لە بازاڕەکانی بەغدا و هەولێر.',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    category: 'CONSUMER_ELECTRONICS',
    link: '/en/contact?inquiry=xiaomi-iraq',
    isFeatured: true,
    order: 21
  },
  {
    titleEn: 'DJI Agras T50 Smart Agricultural & Surveying Drone',
    titleAr: 'طائرة درون دي جيه آي أغراس T50 الذكية للزراعة ومسح الأراضي',
    titleZh: '大疆农业 DJI T50 旗舰级智能农业航测无人机',
    titleCkb: 'فڕۆکەی بێفڕۆکەوانی کشتوکاڵی دی جەی ئای T50',
    descriptionEn: 'Heavy 50kg spraying payload with dual atomizing centrifugal sprinklers, active phased-array radar, and binocular vision for Iraqi date palm groves and agricultural plains.',
    descriptionAr: 'طائرة بدون طيار بحمولة رش 50 كغ ومراوح طرد مركزية مزدوجة مع رادار نشط لتغطية بساتين النخيل والمزارع الشاسعة في العراق بدقة عالية.',
    descriptionZh: '共轴双旋翼动力系统，载重50公斤喷洒与75升播撒，搭载有源相控阵雷达与双目视觉系统，广泛赋能伊拉克椰枣林与现代灌溉农业。',
    descriptionCkb: 'درۆنی پێشکەوتووی کشتوکاڵی بە توانای هەڵگرتنی 50 کیلۆگرام بۆ دەرمانڕێژی و چاودێری کێڵگە و باخەکان بە ڕاداری زیرەک.',
    imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=80',
    category: 'CONSUMER_ELECTRONICS',
    link: '/en/contact?inquiry=dji-agras-t50',
    isFeatured: true,
    order: 22
  },
  {
    titleEn: 'Huawei MatePad Pro & PaperMatte Smart Office Suite',
    titleAr: 'تابلت هواوي ميت باد برو مع شاشة بيبرمات المقاومة للانعكاس',
    titleZh: '华为 MatePad Pro 13.2寸柔性OLED云晰柔光屏平板',
    titleCkb: 'تابلێتی هۆواوی مەیپاد پرۆ بە شاشەی دژە ڕەنگدانەوە',
    descriptionEn: '13.2-inch flexible OLED with nano-level anti-glare etching, NearLink M-Pencil with 10,000+ pressure levels, and PC-level WPS office productivity.',
    descriptionAr: 'شاشة OLED مرنة مقاس 13.2 بوصة بتقنية مضادة للوهج الساطع، مع قلم NearLink فائق الحساسية وبرامج مكتبية بمستوى أجهزة الكمبيوتر.',
    descriptionZh: '超轻薄大尺寸柔性OLED平板，搭载微纳米蚀刻防眩光柔光屏与星闪（NearLink）超万级压感手写笔，提供PC级原生桌面办公体验。',
    descriptionCkb: 'تابلێتی 13.2 ئینچی هۆواوی بە شاشەی تایبەت دژی تیشکی ڕۆژ و قەڵەمی پێشکەوتوو بۆ دیزاین و کاری فەرمی.',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80',
    category: 'CONSUMER_ELECTRONICS',
    link: '/en/contact?inquiry=huawei-matepad-pro',
    isFeatured: true,
    order: 23
  },
  {
    titleEn: 'Anker SOLIX F3800 Ultra-Capacity Portable Power Station',
    titleAr: 'محطة الطاقة المتنقلة أنكر سوليكس F3800 عالية السعة',
    titleZh: '安克创新 ANKER SOLIX F3800 超大容量移动储能电源',
    titleCkb: 'وێستگەی کارەبای گەڕۆکی ئانکەر سولیکس F3800',
    descriptionEn: '3.84kWh LiFePO4 battery expandable up to 26.9kWh, with 6000W AC output (120V/240V split-phase) capable of direct EV charging and whole-home backup.',
    descriptionAr: 'بطارية فوسفات حديد الليثيوم بسعة 3.84 كيلوواط/ساعة قابلة للتوسعة حتى 26.9 كيلوواط/ساعة، مع مخرج 6000 واط لشحن السيارات وتشغيل المنازل.',
    descriptionZh: '标配3.84度磷酸铁锂高安全电芯，支持至高扩展至26.9度，具备6000W交流双压输出，可直接为电动汽车补能及家庭全屋断电应急。',
    descriptionCkb: 'پاتری زەبەلاحی گەڕۆک بە توانای 3.84 کیلۆوات و دەستپێکردنی 6000 واط بۆ کارپێکردنی تەواوی ماڵ و بارگاویکردنی ئۆتۆمبێلی کارەبایی.',
    imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=1200&q=80',
    category: 'CONSUMER_ELECTRONICS',
    link: '/en/contact?inquiry=anker-solix-f3800',
    isFeatured: true,
    order: 24
  },
  {
    titleEn: 'Insta360 X4 8K 360-Degree AI Action & Surveying Camera',
    titleAr: 'كاميرا إنستا 360 إكس 4 الكروية بدقة 8K مع معالجة بالذكاء الاصطناعي',
    titleZh: '影石 Insta360 X4 8K全景运动与现场智能测绘相机',
    titleCkb: 'کامێرای 360 پلەی ئینستا360 X4 بە کوالێتی 8K',
    descriptionEn: 'Records ultra-high resolution 8K 30fps immersive 360 video powered by a 5nm AI chip, with FlowState stabilization and invisible selfie stick for construction and media.',
    descriptionAr: 'تصوير فيديو بانورامي بدقة 8K فائقة بمعدل 30 إطاراً في الثانية ومعالج ذكاء اصطناعي 5 نانومتر، مثالية لمواقع البناء والإنشاءات والتوثيق الإعلامي.',
    descriptionZh: '原生8K 30fps超高清全景视频，搭载5nm制程AI降噪芯片与FlowState防抖，在工程测绘、虚拟看展与极限探险中实现隐形自拍杆沉浸体验。',
    descriptionCkb: 'کامێرای وێنەگرتنی 360 پلە بە کوالێتی 8K و تەکنەلۆژیای ژیری دەستکرد بۆ تۆمارکردنی شوێنەوار و پرۆژەکانی بیناسازی.',
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80',
    category: 'CONSUMER_ELECTRONICS',
    link: '/en/contact?inquiry=insta360-x4',
    isFeatured: true,
    order: 25
  }
];

export async function seedChineseProducts() {
  try {
    const existingCount = await prisma.chineseProduct.count();
    console.log(`🛍️ Checking Chinese Products... (Current count: ${existingCount})`);

    // If already has all 25 products, we can return or verify
    if (existingCount >= 25) {
      console.log('✅ Chinese Products already well-seeded with 5 products per sector.');
      return;
    }

    console.log('🌱 Seeding 5 authentic products per sector into Chinese Products Showcase...');
    
    // Upsert or clear and seed
    await prisma.chineseProduct.deleteMany();
    
    for (const item of ALL_CHINESE_PRODUCTS) {
      await prisma.chineseProduct.create({ data: item });
    }

    const finalCount = await prisma.chineseProduct.count();
    console.log(`✅ Successfully seeded ${finalCount} Chinese products (5 in each of the 5 sectors).`);
  } catch (err: any) {
    console.error('Error seeding Chinese products:', err);
  }
}
