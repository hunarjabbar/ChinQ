import { Locale } from '../types';

export interface SectorPavilion {
  id: string;
  slug: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  iconName: string;
  color: string;
  iraqOpportunity: Record<Locale, string>;
  chineseExhibitorProfile: Record<Locale, string>;
  iraqiBuyerProfile: Record<Locale, string>;
  relevantServices: string[];
  researchPillarId: string;
  researchPillarTitle: Record<Locale, string>;
  featuredProjects: string[];
  boothCount: number;
}

export interface AgendaSession {
  id: string;
  day: 1 | 2 | 3;
  time: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  track: 'Summit' | 'Expo' | 'Services' | 'Academic';
  type: 'KEYNOTE' | 'PANEL' | 'ROUNDTABLE' | 'MATCHMAKING' | 'PITCH' | 'MOU_SIGNING';
  location: Record<Locale, string>;
  speakerIds: string[];
  instituteResearchSlug?: string;
  instituteResearchTitle?: Record<Locale, string>;
}

export interface SummitSpeaker {
  id: string;
  name: Record<Locale, string>;
  title: Record<Locale, string>;
  organization: Record<Locale, string>;
  bio: Record<Locale, string>;
  isInstituteFellow?: boolean;
  instituteExpertId?: string;
  roleType: 'GOVERNMENT' | 'ENTERPRISE' | 'FELLOW' | 'DIPLOMAT';
  avatarUrl?: string;
}

export interface IcaServiceVertical {
  id: string;
  slug: string;
  title: Record<Locale, string>;
  tagline: Record<Locale, string>;
  description: Record<Locale, string>;
  capabilities: Record<Locale, string[]>;
  deliverables: Record<Locale, string[]>;
  summitRole: Record<Locale, string>;
  icon: string;
  badge: Record<Locale, string>;
}

export const SUMMIT_CANONICAL = {
  name: {
    en: 'Iraq-China Economic Summit',
    ar: 'القمة الاقتصادية العراقية-الصينية',
    zh: '伊拉克-中国经济峰会',
    ckb: 'لووتکەی ئابووری عێراق-چین'
  },
  formalTitle: {
    en: 'Iraq-China Economic Summit & Bilateral Expo — Sulaymaniyah',
    ar: 'القمة الاقتصادية العراقية-الصينية والمعرض الثنائي — السليمانية',
    zh: '伊拉克-中国经济峰会暨双边博览会 — 苏莱曼尼亚',
    ckb: 'لووتکەی ئابووری عێراق-چین و پێشانگای دوولایەنە — سلێمانی'
  },
  subtitle: {
    en: 'Where Iraqi industry meets Chinese capital. A summit and bilateral expo facilitating every sector.',
    ar: 'حيث تلتقي الصناعة العراقية برأس المال الصيني. قمة ومعرض ثنائي يخدم كل القطاعات.',
    zh: '伊拉克产业与中国资本的对接平台。服务全行业的峰会与双边博览会。',
    ckb: 'ئەو شوێنەی کە پیشەسازی عێراقی و سەرمایەی چینی یەکتر دەبینن. لووتکە و پێشانگایەکی دوولایەنە بۆ هەموو کەرتەکان.'
  },
  dates: {
    en: 'November 18–20, 2026',
    ar: '١٨–٢٠ نوفمبر ٢٠٢٦',
    zh: '2026年11月18日–20日',
    ckb: '١٨–٢٠ی تشرینی دووەمی ٢٠٢٦'
  },
  venue: {
    name: {
      en: 'Sulaymaniyah International Expo Center & Grand Millennium Hall',
      ar: 'مركز السليمانية الدولي للمعارض وقاعة غراند ميلينيوم',
      zh: '苏莱曼尼亚国际博览中心暨千禧大酒店会议中心',
      ckb: 'ناوەندی نێودەوڵەتی پێشانگای سلێمانی و هۆڵی گراند میلینیۆم'
    },
    city: {
      en: 'Sulaymaniyah, Kurdistan Region, Iraq',
      ar: 'السليمانية، إقليم كوردستان، العراق',
      zh: '伊拉克库尔德斯坦地区苏莱曼尼亚',
      ckb: 'سلێمانی، هەرێمی کوردستان، عێراق'
    }
  }
};

export const SECTOR_PAVILIONS: SectorPavilion[] = [
  {
    id: '1',
    slug: 'energy-petrochemicals',
    name: {
      en: 'Energy & Petrochemicals',
      ar: 'الطاقة والبتروكيماويات',
      zh: '能源与石化产业',
      ckb: 'وزە و پێترۆکیمیایی'
    },
    description: {
      en: 'Upstream exploration, associated gas capture, refinery modernizations, and green hydrogen joint ventures.',
      ar: 'استكشافات المنبع، التقاط الغاز المصاحب، تحديث المصافي، ومشاريع الهيدروجين الأخضر المشتركة.',
      zh: '上游油气勘探、伴生气捕集与利用、炼厂现代化升级及中伊绿氢合资项目。',
      ckb: 'دۆزینەوەی نەوت، کۆکردنەوەی گازی هاوەڵ، مۆدێرنکردنی پاڵاوگەکان و پڕۆژەکانی هایدرۆجینی سەوز.'
    },
    iconName: 'Flame',
    color: 'emerald',
    iraqOpportunity: {
      en: '$14B in planned gas flare capture and refinery expansions across Basra, Maysan, Kirkuk, and Sulaymaniyah.',
      ar: '١٤ مليار دولار في مشاريع استثمار الغاز المصاحب وتوسعة المصافي في البصرة وميسان وكركوك والسليمانية.',
      zh: '巴士拉、米桑、基尔库克与苏莱曼尼亚总计140亿美元的伴生气与炼油扩建规划。',
      ckb: '١٤ ملیار دۆلار لە پڕۆژەکانی کۆکردنەوەی گاز و فراوانکردنی پاڵاوگەکان لە بەسرە و کەرکووک و سلێمانی.'
    },
    chineseExhibitorProfile: {
      en: 'State-owned EPC conglomerates, turbine manufacturers, solar PV innovators, and LNG storage tech leaders.',
      ar: 'شركات المقاولات الهندسية الكبرى (EPC)، مصنعي التوربينات، وتقنيات تخزين الغاز المسال وحلول الطاقة الشمسية.',
      zh: '大型央企EPC工程承包商、重型燃气轮机制造企业、光伏逆变系统与LNG低温储运龙头。',
      ckb: 'کۆمپانیا گەورەکانی ئەندازیاری و بەڵێندەرایەتی چینی، بەرهەمهێنەرانی تەرباین و تەکنەلۆژیای هەڵگرتنی گاز.'
    },
    iraqiBuyerProfile: {
      en: 'Ministry of Oil, KRG Natural Resources, regional refineries, and independent oilfield services operators.',
      ar: 'وزارة النفط، وزارة الثروات الطبيعية في إقليم كوردستان، المصافي المحلية، ومشغلو حقول النفط.',
      zh: '伊拉克石油部、库区自然资源部、区域炼化企业及独立油田服务运营商。',
      ckb: 'وەزارەتی نەوت، وەزارەتی سامانە سروشتییەکانی هەرێم، پاڵاوگە ناوخۆییەکان و بەکارخەرانی کێڵگە نەوتییەکان.'
    },
    relevantServices: ['sourcing', 'settlement', 'insurance', 'consultancy'],
    researchPillarId: 'energy-transition',
    researchPillarTitle: {
      en: 'Energy Transition & Infrastructure',
      ar: 'تحول الطاقة والبنية التحتية',
      zh: '能源转型与基础设施',
      ckb: 'گواستنەوەی وزە و ژێرخان'
    },
    featuredProjects: ['Rumaila Associated Gas Capture', 'Bazian Refinery Expansion Phase II', 'Grand Faw Clean Fuel Terminal'],
    boothCount: 28
  },
  {
    id: '2',
    slug: 'construction-infrastructure',
    name: {
      en: 'Construction & Infrastructure',
      ar: 'البناء والإنشاءات والژێرخان',
      zh: '工程建设与基础设施',
      ckb: 'بیناسازی و ژێرخان'
    },
    description: {
      en: 'Highways, railway interconnects, urban renewal, cement technologies, prefabricated housing, and bridges.',
      ar: 'الطرق السريعة، شبكات السكك الحديدية، التطوير الحضري، مجمعات الإسكان الجاهزة، والجسور الكبرى.',
      zh: '干线公路、跨省铁路互联、城市综合体更新、水泥新技术、装配式建筑及大型桥梁工程。',
      ckb: 'ڕێگا خێراکان، هێڵی ئاسن، نیشتەجێکردنی هاوچەرخ، تەکنەلۆژیای چیمەنتۆ و پردە ستراتیژییەکان.'
    },
    iconName: 'Building2',
    color: 'blue',
    iraqOpportunity: {
      en: '$17B Development Road corridor packages, residential mega-cities, and municipal water treatment plants.',
      ar: 'حزم طريق التنمية بقيمة ١٧ مليار دولار، المدن السكنية الجديدة، ومحطات معالجة المياه البلدية.',
      zh: '170亿美元“发展之路”走廊工程分包、百万套新城住宅群及市政水务处理项目。',
      ckb: 'پڕۆژەکانی ڕێگای گەشەپێدان بە بەهای ١٧ ملیار دۆلار، شارە نوێیەکان و چارەسەری ئاو.'
    },
    chineseExhibitorProfile: {
      en: 'Heavy civil engineering firms, specialized tunneling machinery makers, and smart transit developers.',
      ar: 'شركات الهندسة المدنية الكبرى، مصنعي حفارات الأنفاق والمعدات الثقيلة، وأنظمة النقل الذكية.',
      zh: '中国中铁、中国铁建等特大型工程集团，盾构机制造厂商及智能交通系统方案商。',
      ckb: 'کۆمپانیا مەزنەکانی ئەندازیاری شارستانی، ئامێرە قورسەکان و سیستەمی هاتوچۆی زیرەک.'
    },
    iraqiBuyerProfile: {
      en: 'Ministry of Construction & Housing, Provincial Investment Commissions (Baghdad, Basra, Sulaymaniyah, Erbil).',
      ar: 'وزارة الإعمار والإسكان والبلديات، هيئات الاستثمار في المحافظات (بغداد، البصرة، السليمانية، أربيل).',
      zh: '伊拉克建设与住房部、各省投资委员会（巴格达、巴士拉、苏莱曼尼亚、埃尔比勒）。',
      ckb: 'وەزارەتی ئاوەدانکردنەوە و نیشتەجێکردن، دەستەکانی وەبەرهێنان لە پارێزگاکان.'
    },
    relevantServices: ['sourcing', 'settlement', 'insurance', 'consultancy'],
    researchPillarId: 'trade-corridors',
    researchPillarTitle: {
      en: 'Trade Corridors & Development Road',
      ar: 'ممرات التجارة وطريق التنمية',
      zh: '贸易走廊与发展之路',
      ckb: 'ڕێڕەوە بازرگانییەکان و ڕێگای گەشەپێدان'
    },
    featuredProjects: ['Al-Faw to Fishkhabur High-Speed Rail', 'Sulaymaniyah Logistics Outer Ring', 'Baghdad 1000 Schools Project'],
    boothCount: 34
  },
  {
    id: '3',
    slug: 'agriculture-food-security',
    name: {
      en: 'Agriculture & Food Security',
      ar: 'الزراعة والأمن الغذائي',
      zh: '农业现代化与粮食安全',
      ckb: 'کشتوکاڵ و ئاسایشی خۆراک'
    },
    description: {
      en: 'Drip irrigation, cold-chain logistics, greenhouse agritech, grain silos, and processed food supply chains.',
      ar: 'الري بالتنقيط، سلاسل التبريد والتخزين، البيوت المحمية الذكية، صوامع الحبوب، وتجهيز المواد الغذائية.',
      zh: '节水滴灌成套技术、农产品冷链仓储、智能温室大棚、钢板粮食立筒仓与食品精深加工。',
      ckb: 'ئاودێری دڵۆپاندن، کۆگاکردنی ساردکەرەوە، خانووی شووشەیی زیرەک و سایلۆکانی گەنم.'
    },
    iconName: 'Sprout',
    color: 'lime',
    iraqOpportunity: {
      en: '$3.8B agricultural modernization funds to combat drought across Kurdistan valleys and Mesopotamia.',
      ar: '٣.٨ مليار دولار من برامج تحديث الزراعة ومكافحة الجفاف في سهول كوردستان وبلاد ما بين النهرين.',
      zh: '库尔德斯坦肥沃谷地与美索不达米亚平原38亿美元抗旱节水与农业现代化转型基金。',
      ckb: '٣.٨ ملیار دۆلار بۆ مۆدێرنکردنی کشتوکاڵ و بەرەنگاربوونەوەی وشکەساڵی لە دەشتەکانی کوردستان و عێراق.'
    },
    chineseExhibitorProfile: {
      en: 'Agritech precision manufacturers, hydroponics engineers, tractor manufacturers, and grain storage EPCs.',
      ar: 'مصنعو تقنيات الزراعة الدقيقة، مهندسو الزراعة المائية، معدات الجرارات، وصوامع الغلال الحديثة.',
      zh: '精准农业设备商、水肥一体化装备企业、一拖拖拉机及大型粮食储存工程商。',
      ckb: 'بەرهەمهێنەرانی تەکنەلۆژیای کشتوکاڵی، سیستەمی ئاودێری، تراکتۆر و سایلۆ.'
    },
    iraqiBuyerProfile: {
      en: 'Agricultural cooperatives, food processing conglomerates, Kurdish farming syndicates, Ministry of Agriculture.',
      ar: 'الجمعيات التعاونية الزراعية، شركات الصناعات الغذائية، اتحادات المزارعين في كوردستان، وزارة الزراعة.',
      zh: '农业合作社联盟、伊拉克食品工业巨头、库尔德农场主联合会及农业部采购团。',
      ckb: 'کۆمەڵە کشتوکاڵییەکان، کۆمپانیاکانی پیشەسازی خۆراک، یەکێتی جووتیاران و وەزارەتی کشتوکاڵ.'
    },
    relevantServices: ['sourcing', 'settlement', 'insurance'],
    researchPillarId: 'economic-diversification',
    researchPillarTitle: {
      en: 'Economic Diversification & Industry',
      ar: 'التنويع الاقتصادي والصناعة',
      zh: '经济多元化与非油工业',
      ckb: 'هەمەچەشنکردنی ئابووری و پیشەسازی'
    },
    featuredProjects: ['Shahrizor Modern Irrigation Network', 'Sulaymaniyah Agro-Cold Hub', 'Southern Iraq Desert Wheat Reclamation'],
    boothCount: 22
  },
  {
    id: '4',
    slug: 'technology-digital-silk-road',
    name: {
      en: 'Technology & Digital Silk Road',
      ar: 'التكنولوجيا وطريق الحرير الرقمي',
      zh: '数字丝绸之路与高新科技',
      ckb: 'تەکنەلۆژیا و ڕێگای ئاوریشمی دیجیتاڵی'
    },
    description: {
      en: '5G telecommunications, Tier-4 data centers, cloud infrastructure, AI enterprise solutions, and cybersecurity.',
      ar: 'شبكات الجيل الخامس 5G، مراكز البيانات المصنفة Tier-4، الحوسبة السحابية، حلول الذكاء الاصطناعي، والأمن السيبراني.',
      zh: '5G通信网络、Tier-4大型数据中心、企业级云服务、AI产业落地赋能与金融级网络安全。',
      ckb: 'تۆڕەکانی 5G، سەنتەری داتای پێشکەوتوو، هەورەژمێری، زیرەکی دەستکرد و ئاسایشی سایبەری.'
    },
    iconName: 'Cpu',
    color: 'violet',
    iraqOpportunity: {
      en: 'National fiber-optic backbone expansion and government digital services automation across Baghdad and KRI.',
      ar: 'توسيع الشبكة الوطنية للألياف الضوئية وأتمتة الخدمات الحكومية الرقمية في بغداد وإقليم كوردستان.',
      zh: '伊拉克国家级光纤骨干网升级改造，以及中央与库区政府电子政务一体化系统。',
      ckb: 'فراوانکردنی فایبەر ئۆپتیکی نیشتمانی و بەدیجیتاڵکردنی خزمەتگوزارییە حکومییەکان.'
    },
    chineseExhibitorProfile: {
      en: 'Leading telecommunications vendors, hyperscale cloud providers, and enterprise security platforms.',
      ar: 'كبرى شركات الاتصالات العالمية، مزودو الخدمات السحابية الفائقة، ومنصات حماية البيانات المؤسسية.',
      zh: '华为、中兴等全球通信巨头，主流公有云服务商与顶尖网络安全及安防厂商。',
      ckb: 'کۆمپانیا پێشەنگەکانی پەیوەندی وەک هواوی و زت، دابینکەرانی خزمەتگوزاری هەور و ئاسایش.'
    },
    iraqiBuyerProfile: {
      en: 'Telecom operators (Asiacell, Zain, Korek), Ministry of Communications, financial fintechs, and tech startups.',
      ar: 'شركات الاتصالات (آسیاسیل، زين، كورك)، وزارة الاتصالات، المصارف وشركات التكنولوجيا المالية.',
      zh: '伊拉克各大电信运营商（Asiacell、Zain、Korek）、通信部、各大银行与金融科技初创企业。',
      ckb: 'کۆمپانیاکانی پەیوەندی (ئاسیاسێڵ، زەین، کۆڕەک)، وەزارەتی گەیاندن، بانکەکان و فینتێک.'
    },
    relevantServices: ['sourcing', 'settlement', 'consultancy'],
    researchPillarId: 'digital-silk-road',
    researchPillarTitle: {
      en: 'Digital Silk Road & Technology',
      ar: 'طريق الحرير الرقمي والتقنية',
      zh: '数字丝绸之路与科技前沿',
      ckb: 'ڕێگای ئاوریشمی دیجیتاڵی و تەکنەلۆژیا'
    },
    featuredProjects: ['Kurdistan Fiber-to-the-Home Initiative', 'National Sovereign Data Center Baghdad', 'CBI Real-time RTGS Overhaul'],
    boothCount: 26
  },
  {
    id: '5',
    slug: 'manufacturing-industrial',
    name: {
      en: 'Manufacturing & Industrial Equipment',
      ar: 'التصنيع والمعدات الصناعية',
      zh: '智能制造与重型装备',
      ckb: 'پیشەسازی و ئامێرە پیشەسازییەکان'
    },
    description: {
      en: 'CNC tooling, plastics & packaging lines, metallurgical processing, ceramic factories, and industrial park robotics.',
      ar: 'ماكينات CNC، خطوط البلاستيك والتغليف، الصناعات المعدنية، مصانع السيراميك، وروبوتات المناطق الصناعية.',
      zh: '数控机床与金属切削、塑料注塑与包装生产线、冶金铸造装备、建筑陶瓷产线及工业机器人。',
      ckb: 'ئامێرەکانی CNC، هێڵەکانی پلاستیک و پاکێجینگ، پیشەسازی کانزا، کارگەکانی کاشی و سیرامیک.'
    },
    iconName: 'Cog',
    color: 'amber',
    iraqOpportunity: {
      en: 'Sulaymaniyah & Basra Special Economic Zones offering 10-year corporate tax holidays for joint factories.',
      ar: 'المناطق الاقتصادية الخاصة في السليمانية والبصرة مع إعفاء ضريبي لمدة ١٠ سنوات للمصانع المشتركة.',
      zh: '苏莱曼尼亚与巴士拉经济特区对合资工厂提供长达10年的企业所得税全免优惠政策。',
      ckb: 'ناوچە ئابوورییە تایبەتەکانی سلێمانی و بەسرە بە بەخشینی باج بۆ ماوەی ١٠ ساڵ بۆ کارگە هاوبەشەکان.'
    },
    chineseExhibitorProfile: {
      en: 'Industrial machinery exporters from Jiangsu, Zhejiang, and Guangdong; automated assembly specialists.',
      ar: 'مصدرو الآلات الصناعية من مقاطعات جيانغسو وتشيجيانغ وقوانغدونغ، وخبراء خطوط التجميع الآلي.',
      zh: '来自江苏、浙江、广东的工业母机与装备制造外贸强企，工业自动化解决方案商。',
      ckb: 'هەناردەکارانی ئامێری پیشەسازی لە پارێزگاکانی جیانگسو و جێجیانگ و گوانگدۆنگ.'
    },
    iraqiBuyerProfile: {
      en: 'Sulaymaniyah Chamber of Commerce & Industry, Iraqi Federation of Industries, private factory owners.',
      ar: 'غرفة تجارة وصناعة السليمانية، اتحاد الصناعات العراقي، وأصحاب المصانع والمجمعات الإنتاجية.',
      zh: '苏莱曼尼亚工商会、伊拉克工业联合会成员企业及各大私营制造工厂业主。',
      ckb: 'ژووری بازرگانی و پیشەسازی سلێمانی، یەکێتی پیشەسازییەکانی عێراق و خاوەن کارگەکان.'
    },
    relevantServices: ['sourcing', 'settlement', 'insurance', 'consultancy'],
    researchPillarId: 'economic-diversification',
    researchPillarTitle: {
      en: 'Economic Diversification & Industry',
      ar: 'التنويع الاقتصادي والصناعة',
      zh: '经济多元化与非油工业',
      ckb: 'هەمەچەشنکردنی ئابووری و پیشەسازی'
    },
    featuredProjects: ['Tanjaro Industrial Eco-Park', 'Al-Kut Steel Mill Modernization', 'Erbil Packaging Automation Hub'],
    boothCount: 30
  },
  {
    id: '6',
    slug: 'healthcare-pharma',
    name: {
      en: 'Healthcare & Pharmaceuticals',
      ar: 'الرعاية الصحية والمستحضرات الدوائية',
      zh: '医疗卫生与生物医药',
      ckb: 'تەندروستی و دەرمان'
    },
    description: {
      en: 'Medical imaging devices, laboratory diagnostic suites, surgical equipment, and localized API pharma manufacturing.',
      ar: 'أجهزة التصوير الطبي، مختبرات التشخيص المتقدمة، المعدات الجراحية، والتصنيع الدوائي المشترك.',
      zh: '高端医学影像诊断设备（CT/MRI）、全自动生化分析实验室、手术器械及本地化原料药与制剂生产。',
      ckb: 'ئامێرەکانی وێنەگرتنی پزیشکی، تاقیگەی پێشکەوتوو، کەرەستەی نەشتەرگەری و کارگەکانی دەرمان.'
    },
    iconName: 'HeartPulse',
    color: 'rose',
    iraqOpportunity: {
      en: 'Ministry of Health Kimadia procurement modernization and Kurdish private hospital group expansions.',
      ar: 'تحديث مناقصات كيماديا لوزارة الصحة وتوسعات المستشفيات الخاصة في إقليم كوردستان وبغداد.',
      zh: '伊拉克卫生部国营药品采购局（KIMADIA）采购透明化改革，以及库区民营医疗集团扩建。',
      ckb: 'مۆدێرنکردنی کڕینەکانی کیمادیا لە وەزارەتی تەندروستی و فراوانکردنی نەخۆشخانە تایبەتەکان.'
    },
    chineseExhibitorProfile: {
      en: 'Mindray, Sinopharm, United Imaging, and GMP-certified sterile consumable manufacturers.',
      ar: 'مايندراي، سينوفارم، يونايتد إيمجينغ، ومصنعو المستلزمات الطبية المعتمدة بمعايير GMP الدولية.',
      zh: '迈瑞医疗、国药集团、联影医疗等中国领军医疗器械与GMP级医药耗材企业。',
      ckb: 'کۆمپانیا پێشەنگەکانی وەک مایندرای، سینۆفارم، یونایتد ئیمەیجینگ و بەرهەمهێنەرانی کەرەستەی پزیشکی.'
    },
    iraqiBuyerProfile: {
      en: 'Ministry of Health delegates, Syndicate of Iraqi Pharmacists, private clinical networks (Faruk Medical City, etc.).',
      ar: 'ممثلو وزارة الصحة، نقابة صيادلة العراق، وشبكات المستشفيات الخاصة (مدينة فاروق الطبية وغيرها).',
      zh: '伊拉克卫生部官员、药剂师公会理事、大型私立医院及医疗集团采购总监。',
      ckb: 'نوێنەرانی وەزارەتی تەندروستی، سەندیکای دەرمانسازان و نەخۆشخانە تایبەتەکان.'
    },
    relevantServices: ['sourcing', 'settlement', 'insurance'],
    researchPillarId: 'economic-diversification',
    researchPillarTitle: {
      en: 'Economic Diversification & Industry',
      ar: 'التنويع الاقتصادي والصناعة',
      zh: '经济多元化与非油工业',
      ckb: 'هەمەچەشنکردنی ئابووری و پیشەسازی'
    },
    featuredProjects: ['Sulaymaniyah Specialized Oncology Center Equipment Upgrade', 'Baghdad Generic Pharma Joint Lab'],
    boothCount: 18
  },
  {
    id: '7',
    slug: 'education-human-capital',
    name: {
      en: 'Education & Human Capital',
      ar: 'التعليم وتنمية رأس المال البشري',
      zh: '高等教育与人力资源开发',
      ckb: 'پەروەردە و سەرمایەی مرۆیی'
    },
    description: {
      en: 'University twin degrees, technical vocational academies, Chinese language institutes, and STEM labs.',
      ar: 'الدرجات الجامعية المشتركة، معاهد التدريب المهني والتقني، مراكز تعليم اللغة الصينية، ومختبرات STEM.',
      zh: '中伊高校双学位联合培养、重工业与数字技能职业技术学院、鲁班工坊及汉语教学中心。',
      ckb: 'بڕوانامەی هاوبەشی زانکۆیی، پەیمانگاکانی ڕاهێنانی پیشەیی، فێرکردنی زمانی چینی و تاقیگەی زانستی.'
    },
    iconName: 'GraduationCap',
    color: 'teal',
    iraqOpportunity: {
      en: 'National scholarship quota expansions for Iraqi postgraduates in Chinese top tier universities (Tsinghua, PKU, BFSU).',
      ar: 'توسيع مقاعد المنح الدراسية للطلبة العراقيين في كبرى الجامعات الصينية (تسينغهوا، بكين، BFSU).',
      zh: '伊拉克赴华全额奖学金名额扩充（清华、北大、北外等对口联合培养项目）。',
      ckb: 'فراوانکردنی کورسییەکانی خوێندنی باڵا بۆ خوێندکارانی عێراق لە زانکۆ بەناوبانگەکانی چین.'
    },
    chineseExhibitorProfile: {
      en: 'Leading state universities, vocational training conglomerates, and educational hardware suppliers.',
      ar: 'الجامعات الحكومية الصينية الرائدة، اتحادات التدريب المهني، ومجهزو الأجهزة التعليمية الذكية.',
      zh: '中国“双一流”高校国际交流处、全国职业技术教育联合体及智慧教育硬件出口商。',
      ckb: 'زانکۆ باڵاکانی چین، کۆمەڵەکانی ڕاهێنانی پیشەیی و دابینکەرانی کەرەستەی فێرکاری.'
    },
    iraqiBuyerProfile: {
      en: 'Ministry of Higher Education, University of Sulaimani, University of Baghdad, private colleges.',
      ar: 'وزارة التعليم العالي، جامعة السليمانية، جامعة بغداد، والكليات والجامعات الأهلية.',
      zh: '伊拉克高等教育与科学研究部、苏莱曼尼亚大学、巴格达大学及各私立大学校长。',
      ckb: 'وەزارەتی خوێندنی باڵا، زانکۆی سلێمانی، زانکۆی بەغدا و کۆلێژە تایبەتەکان.'
    },
    relevantServices: ['visa-tourism', 'consultancy'],
    researchPillarId: 'sovereign-diplomacy',
    researchPillarTitle: {
      en: 'Sovereign Diplomacy & Strategic Frameworks',
      ar: 'الدبلوماسية السيادية والأطر الاستراتيجية',
      zh: '主权外交与战略框架',
      ckb: 'دیپلۆماسی سەروەری و چوارچێوە ستراتیژییەکان'
    },
    featuredProjects: ['University of Sulaimani China Studies Centre Extension', 'Luban Workshop Vocational Node'],
    boothCount: 16
  },
  {
    id: '8',
    slug: 'tourism-cultural-exchange',
    name: {
      en: 'Tourism & Cultural Exchange',
      ar: 'السياحة والتبادل الثقافي',
      zh: '双向文旅与文化遗产交流',
      ckb: 'گەشتیاری و ئاڵوگۆڕی کولتووری'
    },
    description: {
      en: 'Archaeological conservation, UNESCO heritage curation, Kurdistan eco-resorts, and bilateral business travel.',
      ar: 'حماية الآثار، صيانة مواقع التراث العالمي لليونسكو، منتجعات كوردستان البيئية، ورحلات الأعمال المتبادلة.',
      zh: '古美索不达米亚遗址联合考古与数字化保护、库区高山生态旅游度假区及商务签证直通快线。',
      ckb: 'پاراستنی شوێنەوار، شوێنەوارەکانی یونسکۆ، هاوینەهەوارەکانی کوردستان و گەشتی بازرگانی.'
    },
    iconName: 'Palmtree',
    color: 'orange',
    iraqOpportunity: {
      en: 'Direct flights expansion (Sulaymaniyah/Erbil/Baghdad to Guangzhou/Beijing) and visa simplification.',
      ar: 'توسيع الرحلات المباشرة (السليمانية/أربيل/بغداد إلى قوانغتشو/بكين) وتسهيل منح تأشيرات السفر.',
      zh: '加密伊拉克（苏莱曼尼亚/埃尔比勒/巴格达）直飞广州、北京客货航线与双向签证便利化。',
      ckb: 'فراوانکردنی گەشتە ڕاستەوخۆکانی فڕۆکەوانی و ئاسانکاری وەرگرتنی ڤیزا بۆ بازرگانان و گەشتیاران.'
    },
    chineseExhibitorProfile: {
      en: 'China Tourism Group, high-end hospitality brands, heritage VR curators, and aviation groups.',
      ar: 'مجموعة السياحة الصينية، كبرى سلاسل الفنادق والضيافة، مطورو الواقع الافتراضي للمتاحف، وشركات الطيران.',
      zh: '中国旅游集团、高端文旅酒店管理集团、文博数字VR沉浸式展演方案商及各大航空公司。',
      ckb: 'گرووپی گەشتیاری چین، براندە گەورەکانی هۆتێل، تەکنەلۆژیای VR بۆ مۆزەخانەکان و هێڵە ئاسمانییەکان.'
    },
    iraqiBuyerProfile: {
      en: 'Kurdistan Tourism Board, Iraqi State Board of Antiquities and Heritage, luxury tour agencies.',
      ar: 'هيئة السياحة في إقليم كوردستان، الهيئة العامة للآثار والتراث، ووكالات السياحة والسفر الكبرى.',
      zh: '库尔德斯坦旅游局、伊拉克国家文物与文化遗产总局、大型跨境旅行社负责人。',
      ckb: 'دەستەی گەشتوگوزاری هەرێم، دەستەی گشتی شوێنەوار و کەلەپوور، ئاژانسە گەشتیارییەکان.'
    },
    relevantServices: ['visa-tourism', 'settlement'],
    researchPillarId: 'sovereign-diplomacy',
    researchPillarTitle: {
      en: 'Sovereign Diplomacy & Strategic Frameworks',
      ar: 'الدبلوماسية السيادية والأطر الاستراتيجية',
      zh: '主权外交与战略框架',
      ckb: 'دیپلۆماسی سەروەری و چوارچێوە ستراتیژییەکان'
    },
    featuredProjects: ['Erbil Citadel Preservation Protocol', 'Mount Goyzha Eco-Lodge Chinese Pavilion'],
    boothCount: 18
  },
  {
    id: '9',
    slug: 'logistics-transport',
    name: {
      en: 'Logistics & Transport',
      ar: 'اللوجستيات والشحن والنقل',
      zh: '现代物流与跨境运输',
      ckb: 'لۆجستی و گواستنەوە'
    },
    description: {
      en: 'Cross-border customs bonded warehousing, dry ports, cold-chain trucking, and maritime-rail multimodal transit.',
      ar: 'المستودعات الجمركية الحرة، الموانئ الجافة، أساطيل الشاحنات المبردة، والنقل متعدد الوسائط بحراً وبراً.',
      zh: '保税物流中心、内陆无水港、冷链跨国运输车队及“海-铁-公”多式联运走廊运营。',
      ckb: 'کۆگای گومرگی ئازاد، بەندەری وشکانی، بارهەڵگری ساردکەرەوە و گواستنەوەی فرەچەشن.'
    },
    iconName: 'Truck',
    color: 'cyan',
    iraqOpportunity: {
      en: 'Bashmakh and Parwizkhan dry port intermodal yards linking Sulaymaniyah directly with Silk Road freight.',
      ar: 'مشاريع الموانئ الجافة في باشماخ وبرويزخان لربط السليمانية مباشرة بمسارات الشحن لطريق الحرير.',
      zh: '巴什马克与帕尔维兹汗口岸国际陆港升级，让苏莱曼尼亚成为中亚-中东枢纽节点。',
      ckb: 'بەندەرە وشکانییەکانی باشماخ و پەروێزخان بۆ بەستنەوەی سلێمانی بە ڕێگای ئاوریشم.'
    },
    chineseExhibitorProfile: {
      en: 'COSCO Shipping, Sinotrans, Yiwu Land Port Group, and automated warehousing intralogistics makers.',
      ar: 'كوسكو للملاحة (COSCO)، سينوترانس، مجموعة موانئ ييوو البرية، ومصنعو أتمتة المستودعات اللوجستية.',
      zh: '中远海运、中外运、义乌陆港集团及智能立体仓储AGV自动化装备企业。',
      ckb: 'کۆسکۆ، سینۆترانس، گرووپی بەندەری وشکانی ییوو و سیستەمی کۆگای زیرەک.'
    },
    iraqiBuyerProfile: {
      en: 'Customs Directorate of Kurdistan, General Company for Ports of Iraq, national freight forwarders.',
      ar: 'مديرية الجمارك في إقليم كوردستان، الشركة العامة لموانئ العراق، وكبرى شركات الشحن والتخليص.',
      zh: '库区海关总署、伊拉克国家港务总局、大型报关行与全国内陆物流车队企业。',
      ckb: 'بەڕێوەبەرایەتی گومرگی هەرێم، کۆمپانیای گشتی بەندەرەکانی عێراق و کۆمپانیاکانی گواستنەوە.'
    },
    relevantServices: ['sourcing', 'settlement', 'insurance'],
    researchPillarId: 'trade-corridors',
    researchPillarTitle: {
      en: 'Trade Corridors & Development Road',
      ar: 'ممرات التجارة وطريق التنمية',
      zh: '贸易走廊与发展之路',
      ckb: 'ڕێڕەوە بازرگانییەکان و ڕێگای گەشەپێدان'
    },
    featuredProjects: ['Sulaymaniyah-Yiwu Sister-City Freight Channel', 'Grand Faw Logistics Park Zone A'],
    boothCount: 24
  },
  {
    id: '10',
    slug: 'financial-services',
    name: {
      en: 'Financial Services & Bilateral Settlement',
      ar: 'الخدمات المالية والتسوية الثنائية',
      zh: '金融服务与跨境人民币清算',
      ckb: 'خزمەتگوزارییە داراییەکان و پاکتاوی دوولایەنە'
    },
    description: {
      en: 'Direct IQD/CNY clearing lines, documentary letters of credit, trade insurance, sovereign bonds, and fintech.',
      ar: 'خطوط المقاصة المباشرة بالدينار واليوان، الاعتمادات المستندية، التأمين الائتماني، السندات السيادية، والتقنيات المالية.',
      zh: '中伊本币直接清算通道、人民币信用证承兑、出口信保（中信保）、绿色主权债券及支付清算系统。',
      ckb: 'هێڵی پاکتاوی ڕاستەوخۆی دینار و یوان، بەڵگەنامەی ئیعتماد، بیمەی بازرگانی و تەکنەلۆژیای دارایی.'
    },
    iconName: 'Landmark',
    color: 'indigo',
    iraqOpportunity: {
      en: 'CBI-approved direct Yuan settlement channels for Iraqi merchants importing $14B+ annually from China.',
      ar: 'قنوات التسوية المباشرة باليوان المعتمدة من البنك المركزي لتغطية واردات بـ ١٤+ مليار دولار سنوياً من الصين.',
      zh: '伊拉克中央银行特许的人民币直接结算通道，全面服务每年超过140亿美元的对华进口。',
      ckb: 'کەناڵەکانی پاکتاوی ڕاستەوخۆ بە یوان بە ڕەزامەندی بانکی ناوەندی بۆ بازرگانانی عێراق.'
    },
    chineseExhibitorProfile: {
      en: 'Bank of China, ICBC, Sinosure, UnionPay International, and Cross-Border Interbank Payment System (CIPS).',
      ar: 'بنك الصين، بنك ICBC، مؤسسة سينوشور للتأمين الائتماني، يونيون باي الدولية، ونظام CIPS للمدفوعات.',
      zh: '中国银行、中国工商银行、中国出口信用保险公司、银联国际及跨境清算公司（CIPS）。',
      ckb: 'بانکی چین، ئای سی بی سی، سینۆشوور، یونیەن پەەی و سیستەمی CIPS.'
    },
    iraqiBuyerProfile: {
      en: 'Central Bank of Iraq, Trade Bank of Iraq (TBI), private commercial banks, exchange houses, corporate treasuries.',
      ar: 'البنك المركزي العراقي، المصرف العراقي للتجارة (TBI)، المصارف التجارية الخاصة، وشركات الصرافة.',
      zh: '伊拉克中央银行、伊拉克贸易银行（TBI）、主流民营商业银行及大型外贸企业财务总监。',
      ckb: 'بانکی ناوەندی عێراق، بانکی بازرگانی عێراق (TBI)، بانکە تایبەتەکان و کۆمپانیاکانی ئاڵوگۆڕی دراو.'
    },
    relevantServices: ['settlement', 'insurance', 'consultancy'],
    researchPillarId: 'monetary-settlement',
    researchPillarTitle: {
      en: 'Monetary Architecture & Settlement',
      ar: 'الهندسة النقدية والتسوية المالية',
      zh: '货币金融架构与清算结算',
      ckb: 'سیستەمی دراو و پاکتاوی دارایی'
    },
    featuredProjects: ['Sulaymaniyah e-CNY Merchant Settlement Node', 'CBI-PBOC Bilateral Currency Swap Track'],
    boothCount: 20
  },
  {
    id: '11',
    slug: 'consumer-goods-retail',
    name: {
      en: 'Consumer Goods & Retail',
      ar: 'السلع الاستهلاكية وتجارة التجزئة',
      zh: '消费品、轻工商品与新零售',
      ckb: 'کەلوپەلی بەکاربەری و بازرگانی تاک'
    },
    description: {
      en: 'Smart home appliances, electric vehicles, consumer electronics, textiles, hardware, and Yiwu distribution.',
      ar: 'الأجهزة المنزلية الذكية، المركبات الكهربائية، الإلكترونيات الاستهلاكية، المنسوجات، وتوزيع سلع ييوو.',
      zh: '智能家电、新能源汽车、消费类数码电子、高品质纺织服装、五金工具及义乌小商品直供基地。',
      ckb: 'ئامێرە زیرەکەکانی ماڵەوە، ئۆتۆمبێلی کارەبایی، ئەلیکترۆنیات، قوماش و کەلوپەلی ییوو.'
    },
    iconName: 'ShoppingBag',
    color: 'pink',
    iraqOpportunity: {
      en: '$8.5B retail consumer market with surging demand for smart electronics, home goods, and EV mobility.',
      ar: 'سوق تجزئة استهلاكي بقيمة ٨.٥ مليار دولار مع طلب متزايد على الإلكترونيات الذكية والمركبات الكهربائية.',
      zh: '伊拉克85亿美元体量的大众零售市场，对高性价比智能家电、电动汽车与数码产品需求迅猛爆发。',
      ckb: 'بازاڕێکی بەکاربەری ٨.٥ ملیار دۆلاری لەگەڵ خواستی زۆر لەسەر ئامێرە ئەلیکترۆنییەکان و ئۆتۆمبێلی کارەبایی.'
    },
    chineseExhibitorProfile: {
      en: 'Midea, Haier, BYD/Geely distributors, Xiaomi, Yiwu Wholesale Federations, and lighting manufacturers.',
      ar: 'ميديا، هاير، موزعي بي واي دي وجيلي، شاومي، اتحادات تجار ييوو، ومصنعو حلول الإضاءة الحديثة.',
      zh: '美的、海尔、比亚迪/吉利授权经销商、小米生态链企业、义乌跨国采购联盟及照明龙头。',
      ckb: 'میدیا، هایەر، بی وای دی و جیلی، شیاومی و یەکێتی بازرگانانی ییوو.'
    },
    iraqiBuyerProfile: {
      en: 'Major shopping mall operators, wholesale distributors across Baghdad/Sulaymaniyah/Erbil/Basra, e-commerce stores.',
      ar: 'مشغلو المولات والمراكز التجارية الكبرى، كبار تجار الجملة في المحافظات، ومنصات التجارة الإلكترونية.',
      zh: '伊拉克各大购物中心业主、巴格达/苏莱曼尼亚/埃尔比勒等省一级总批发商及电商平台采销。',
      ckb: 'مۆڵە بازرگانییەکان، بازرگانانی کۆ لە سەرانسەری عێراق و فرۆشگاکانی ئۆنلاین.'
    },
    relevantServices: ['sourcing', 'settlement', 'insurance'],
    researchPillarId: 'economic-diversification',
    researchPillarTitle: {
      en: 'Economic Diversification & Industry',
      ar: 'التنويع الاقتصادي والصناعة',
      zh: '经济多元化与非油工业',
      ckb: 'هەمەچەشنکردنی ئابووری و پیشەسازی'
    },
    featuredProjects: ['Yiwu-Sulaymaniyah Direct Wholesale Wholesale Mart', 'Kurdistan EV Charging Grid Pilot'],
    boothCount: 32
  }
];

export const ICA_SERVICES: IcaServiceVertical[] = [
  {
    id: 'sourcing',
    slug: 'sourcing',
    title: {
      en: 'Sourcing Facilitation',
      ar: 'تسهيل التوريد والتوريد المباشر',
      zh: '对华跨境直采与供应链赋能',
      ckb: 'ئاسانکاری کڕین و دابینکردنی ڕاستەوخۆ'
    },
    tagline: {
      en: 'End-to-end verified manufacturer procurement from Yiwu, Guangzhou, Shenzhen, and Shanghai.',
      ar: 'توريد مباشر ومعتمد من المصانع الصينية في ييوو وقوانغتشو وشنتشن وشنغهاي.',
      zh: '连接义乌、广州、深圳与上海源头产业带，提供全流程验厂、控价与验货直采保障。',
      ckb: 'کڕینی ڕاستەوخۆ و پشتڕاستکراو لە کارگەکانی ییوو، گوانگدۆنگ، شێنجێن و شەنگەهای.'
    },
    description: {
      en: 'ICA operates dedicated sourcing desks in Yiwu, Guangzhou, and Sulaymaniyah, providing factory background audits, price benchmarking, pre-shipment quality control, and bonded container consolidation.',
      ar: 'تدير وكالة ICA مكاتب توريد متخصصة في ييوو وقوانغتشو والسليمانية لتقديم خدمات التدقيق الميداني للمصانع، تفاوض الأسعار، فحص الجودة قبل الشحن، وتجميع الحاويات الجمركية.',
      zh: '伊中机构在义乌、广州和苏莱曼尼亚设立直采服务专班，提供生产资质实地穿透审计、价格公允性对标、出厂前三方品控（QC）及保税拼箱直通服务。',
      ckb: 'دەزگای ICA ئۆفیسی تایبەتی لە ییوو، گوانگژۆ و سلێمانی هەیە بۆ پشکنینی کارگەکان، بەراوردی نرخ، کۆنتڕۆڵی کوالێتی و گواستنەوەی کۆنتێنەر.'
    },
    capabilities: {
      en: [
        'Supplier credential verification & factory floor audits',
        'Direct Chinese price discovery & contract negotiation',
        'Pre-shipment batch inspection (ISO/CE compliance)',
        'Sulaymaniyah & Erbil customs bonded dispatch'
      ],
      ar: [
        'التحقق من بيانات الموردين والتدقيق الميداني للمصانع',
        'كشف الأسعار الحقيقية والتفاوض على العقود باللغة الصينية',
        'فحص الشحنات قبل الإبحار وضمان مطابقة معايير ISO و CE',
        'التخليص الجمركي المباشر في السليمانية وأربيل'
      ],
      zh: [
        '源头厂商资质穿透审核与工厂实地尽调',
        '母语级商务谈判、去中介化价格发现与双语法务合同',
        '装运前批次三方抽检（ISO/CE等合规性认证）',
        '苏莱曼尼亚及埃尔比勒保税报关与一站式通关'
      ],
      ckb: [
        'پشتڕاستکردنەوەی بەڵگەنامەی دابینکەران و پشکنینی کارگەکان',
        'دۆزینەوەی نرخی ڕاستەقینە و وتووێژی گرێبەستەکان بە چینی',
        'پشکنینی پێش بارکردن بەپێی ستانداردەکانی ISO و CE',
        'ڕاپەڕاندنی گومرگی ڕاستەوخۆ لە سلێمانی و هەولێر'
      ]
    },
    deliverables: {
      en: ['Factory Audit Dossier', 'Price Benchmarking Report', 'Pre-Shipment Quality Certificate', 'Bilingual Sourcing Agreement'],
      ar: ['ملف تدقيق المصنع المعتمد', 'تقرير مقارنة الأسعار الصينية', 'شهادة فحص الجودة قبل الشحن', 'عقد التوريد الثنائي الموثق'],
      zh: ['《验厂深度尽调档案》', '《对华采购价格基准分析报告》', '《装船前质量合规检验报告》', '《中伊双语采购标准化协议》'],
      ckb: ['دۆسیەی پشکنینی کارگە', 'ڕاپۆرتی بەراوردی نرخ', 'بڕوانامەی کوالێتی پێش بارکردن', 'گرێبەستی دوولایەنەی کڕین']
    },
    summitRole: {
      en: 'Hosts the B2B Matchmaking Lounge & Live Factory Sourcing Desk connecting 200+ Iraqi importers with verified exhibitors.',
      ar: 'استضافة صالة التوفيق التجاري (B2B) ومكتب التوريد الحي لربط أكثر من ٢٠٠ مستورد عراقي بالمصانع المشاركة.',
      zh: '在峰会现场设立B2B商务对接中心与“直采会客室”，为200余位伊拉克核心买家提供点对点配对。',
      ckb: 'بەڕێوەبردنی هۆڵی کۆبوونەوەی B2B و نووسینگەی کڕینی ڕاستەوخۆ بۆ بەستنەوەی زیاتر لە ٢٠٠ بازرگانی عێراقی بە کارگەکان.'
    },
    icon: 'PackageSearch',
    badge: {
      en: '24-48h Factory Verification',
      ar: 'تدقيق المصانع خلال ٢٤-٤٨ ساعة',
      zh: '24-48小时厂商极速穿透核验',
      ckb: 'پشکنینی کارگە لە ماوەی ٢٤-٤٨ کاتژمێردا'
    }
  },
  {
    id: 'settlement',
    slug: 'settlement',
    title: {
      en: 'Bilateral Direct Clearing Facilitation',
      ar: 'تسهيل التسوية المالية والمصرفية',
      zh: '双边本币直接结算与清算通道',
      ckb: 'ئاسانکاری پاکتاوی دارایی و بانکی'
    },
    tagline: {
      en: 'Direct IQD / RMB payment clearing without third-currency FX drag or intermediary blockades.',
      ar: 'مقاصة دفع مباشرة بالدينار العراقي واليوان الصيني دون رسوم تحويل العملات الوسيطة أو قيود الوسطاء.',
      zh: '基于伊拉克央行与中国央行机制的伊拉克第纳尔（IQD）与人民币（RMB/e-CNY）直接清算。',
      ckb: 'پاکتاوی ڕاستەوخۆی پارە بە دینار و یوان بەبێ تێچووی دراوی سێیەم و بەربەستەکان.'
    },
    description: {
      en: 'ICA works alongside the Central Bank of Iraq, Trade Bank of Iraq, and Chinese clearing banks to facilitate secure telegraphic transfers (T/T), documentary Letters of Credit (L/C), and digital Yuan (e-CNY) trade settlement.',
      ar: 'تعمل وكالة ICA بالتنسيق مع البنك المركزي العراقي والمصرف العراقي للتجارة والبنوك الصينية لتسهيل الحوالات المصرفية المباشرة (T/T)، الاعتمادات المستندية (L/C)، والتسويات باليوان الرقمي.',
      zh: '伊中机构深度协同伊拉克央行、伊拉克贸易银行（TBI）及中国跨境清算行，合规执行人民币电汇（T/T）、信用证（L/C）承兑及数字人民币（e-CNY）大额跨境结算。',
      ckb: 'دەزگای ICA هاوکاری بانکی ناوەندی عێراق، TBI و بانکە چینییەکان دەکات بۆ ئاسانکاری حەواڵەی T/T، ئیعتماداتی L/C و یوان.'
    },
    capabilities: {
      en: [
        'Direct IQD/CNY currency routing with transparent spot rates',
        'Documentary Letter of Credit (L/C) structuring & validation',
        'Sanctions & AML compliance pre-screening protocols',
        'Real-time transaction tracking and settlement ledger'
      ],
      ar: [
        'توجيه مدفوعات الدينار/اليوان بأسعار صرف فورية وشفافة',
        'هيكلة وتدقيق الاعتمادات المستندية الصادرة والمستلمة',
        'الفحص المسبق لمتطلبات مكافحة غسل الأموال والامتثال الدولي',
        'تتبع الحوالات في الوقت الفعلي وسجل المقاصة المعتمد'
      ],
      zh: [
        '第纳尔/人民币直接路由，实时透明牌价无中间行汇兑损耗',
        '跨境人民币跟单信用证（L/C）结构化设计与快速承兑',
        '国际反洗钱（AML）与跨境合规前置智能预筛',
        '清算全链路实时追踪及不可篡改数字化对账单'
      ],
      ckb: [
        'ئاڵوگۆڕی ڕاستەوخۆی دینار/یوان بە نرخی ڕوون',
        'داڕشتن و پشکنینی ئیعتماداتی مستەندی L/C',
        'پشکنینی پابەندبوون بە ڕێساکانی شۆردنەوەی پارە AML',
        'بەدواداچوونی ڕاستەوخۆی حەواڵە و تۆماری پاکتاو'
      ]
    },
    deliverables: {
      en: ['Settlement Routing Protocol', 'Letter of Credit Compliance Pack', 'FX Risk Mitigation Memo', 'Real-time Clearing Certificate'],
      ar: ['بروتوكول مسار التسوية المعتمد', 'حزمة مطابقة الاعتمادات المستندية', 'مذكرة التحوط من مخاطر الصرف', 'شهادة المقاصة المصرفية الفورية'],
      zh: ['《跨境人民币清算路由协议》', '《跟单信用证合规指引包》', '《汇率波动对冲备忘录》', '《实时跨境结算完税凭证》'],
      ckb: ['پرۆتۆکۆڵی ڕێڕەوی پاکتاو', 'پاکێجی پابەندبوونی L/C', 'ڕاپۆرتی پاراستن لە گۆڕانی دراو', 'بڕوانامەی پاکتاوی دارایی']
    },
    summitRole: {
      en: 'Operates the On-site Sovereign Settlement Helpdesk and facilitates bilateral trade finance agreements during Day 2 & Day 3.',
      ar: 'تشغيل مكتب الدعم الميداني للتسويات السيادية وتسهيل توقيع اتفاقيات التمويل التجاري خلال اليومين الثاني والثالث.',
      zh: '在峰会现场设立“主权结算与财资服务台”，并在第二及第三日主导大型经贸采购银企结算签约。',
      ckb: 'بەڕێوەبردنی نووسینگەی ڕاوێژی دارایی و واژۆکردنی گرێبەستە داراییەکان لە ڕۆژانی دووەم و سێیەم.'
    },
    icon: 'Landmark',
    badge: {
      en: 'Zero Third-Currency Drag',
      ar: 'صفر رسوم عملات وسيطة',
      zh: '零第三国货币中转损耗',
      ckb: 'سفر تێچووی دراوی سێیەم'
    }
  },
  {
    id: 'insurance',
    slug: 'insurance',
    title: {
      en: 'Insurance Facilitation',
      ar: 'تسهيل التأمين الائتماني والبحري',
      zh: '跨境信用与货运双向保险赋能',
      ckb: 'ئاسانکاری بیمەی بازرگانی و کەشتیوانی'
    },
    tagline: {
      en: 'Comprehensive Sinosure export credit coverage, maritime cargo protection, and political risk mitigation.',
      ar: 'تغطية تأمين ائتمان الصادرات من سينوشور، حماية الشحن البحري، وتأمين المخاطر السياسية.',
      zh: '对接中国出口信用保险公司（SINOSURE）信保额度、全海运航程货运险及工程政治风险保障。',
      ckb: 'بیمەی هەناردەکردنی سینۆشوور، پاراستنی باری کەشتیوانی و بیمەی مەترسییەکان.'
    },
    description: {
      en: 'ICA bridges Iraqi buyers and Chinese contractors with institutional insurers including Sinosure and international syndicates to unlock deferred payment credit terms (up to 360 days) and comprehensive cargo protection.',
      ar: 'تربط وكالة ICA المستوردين العراقيين والمقاولين الصينيين بالمؤسسات التأمينية الكبرى مثل سينوشور لفتح خطوط ائتمان سداد آجل (حتى ٣٦٠ يوماً) مع تأمين كامل للبضائع.',
      zh: '伊中机构为伊拉克买家与中国工程商搭建全方位信用支持桥梁，对接中国信保与国际再保险财团，协助伊方获得最长360天的延期付款（OA/DA）信用额度与全天候货运保险。',
      ckb: 'دەزگای ICA بازرگانانی عێراق و کۆمپانیا چینییەکان دەبەستێتەوە بە سینۆشوور بۆ بەدەستهێنانی مۆڵەتی پارەدانی دواخراو (تا ٣٦٠ ڕۆژ).'
    },
    capabilities: {
      en: [
        'Sinosure credit rating application and buyer limit enhancement',
        'Maritime, aviation, and multimodal cargo all-risks underwriting',
        'Machinery performance bond and advance payment guarantee backing',
        'Claim settlement advisory and expedited dispute resolution'
      ],
      ar: [
        'طلب التصنيف الائتماني لدى سينوشور ورفع سقف التسهيلات الائتمانية',
        'تأمين شامل ضد جميع المخاطر للشحن البحري والجوي والبري',
        'ضمانات حسن التنفيذ وخطابات الضمان للمعدات الثقيلة',
        'إدارة مطالبات التعويض وحل النزاعات التأمينية بسرعة'
      ],
      zh: [
        '中信保（SINOSURE）买家信用评级快速申报与限额提升',
        '海运、空运及跨境多式联运“一切险（All Risks）”出单',
        '大型重型设备履约保函与预付款保函承保增信',
        '跨境出险快速理赔协助与涉外保单争议法律支持'
      ],
      ckb: [
        'داواکاری پلەبەندی متمانەی سینۆشوور و بەرزکردنەوەی ئاستی متمانە',
        'بیمەی هەموو مەترسییەکان بۆ گواستنەوەی دەریایی، ئاسمانی و وشکانی',
        'پشتگیری گەرەنتی جێبەجێکردنی ئامێرە پیشەسازییەکان',
        'ڕاپەڕاندنی قەرەبووکردنەوە و چارەسەری ناکۆکییەکان'
      ]
    },
    deliverables: {
      en: ['Sinosure Credit Assessment Certificate', 'All-Risks Marine Cargo Policy', 'Deferred Payment Term Structure', 'Bilingual Insurance Dossier'],
      ar: ['شهادة تقييم سينوشور الائتمانية', 'بوليصة تأمين بحري ضد جميع المخاطر', 'هيكلية السداد الآجل المعتمدة', 'ملف التأمين الثنائي الموثق'],
      zh: ['《中国信保买方资信评估函》', '《海运/联运全险标准保单》', '《延期付款信保额度核准书》', '《中伊双语保单风控存证档案》'],
      ckb: ['بڕوانامەی هەڵسەنگاندنی متمانەی سینۆشوور', 'پۆڵیسەی بیمەی دەریایی هەموو مەترسییەکان', 'بەڵگەنامەی مەرجەکانی پارەدانی دواخراو', 'دۆسیەی دووزمانەی بیمە']
    },
    summitRole: {
      en: 'Offers pre-screened credit evaluations and signs institutional reinsurance protocols at the Financial Services Pavilion.',
      ar: 'تقديم تقييمات ائتمانية فورية وتوقيع بروتوكولات التأمين وإعادة التأمين في جناح الخدمات المالية.',
      zh: '在金融服务展区开设“信保与跨境风控专区”，为参会企业现场出具买家资信预审报告。',
      ckb: 'پێشکەشکردنی هەڵسەنگاندنی خێرای متمانە و واژۆکردنی ڕێککەوتنەکانی بیمە لە پێشانگادا.'
    },
    icon: 'ShieldCheck',
    badge: {
      en: 'Up to 360-day Credit Terms',
      ar: 'تسهيلات سداد حتى ٣٦٠ يوماً',
      zh: '支持最长360天远期信用结算',
      ckb: 'مۆڵەتی پارەدان تا ٣٦٠ ڕۆژ'
    }
  },
  {
    id: 'visa-tourism',
    slug: 'visa-tourism',
    title: {
      en: 'Bilateral Tourism & Visa Facilitation',
      ar: 'تسهيل التأشيرات والسياحة الثنائية',
      zh: '中伊商务签证直通与双向文旅',
      ckb: 'ئاسانکاری ڤیزا و گەشتیاری دوولایەنە'
    },
    tagline: {
      en: 'Express VIP business visas for China and Iraq, curated delegation travel, and trade delegation itineraries.',
      ar: 'تأشيرات تجارية سريعة للصين والعراق، تنظيم وفود الأعمال، وجداول الزيارات الميدانية المتخصصة.',
      zh: '中国驻伊领馆商务签证（M/F字）直通绿通，以及中国企业赴伊拉克与库区深度考察接待。',
      ckb: 'ڤیزای بازرگانی خێرا بۆ چین و عێراق، ڕێکخستنی شاندە بازرگانییەکان و سەردانی مەیدانی.'
    },
    description: {
      en: 'ICA maintains direct administrative workflows with the Chinese Consulate General in Erbil and the Iraqi Ministry of Foreign Affairs, providing official invitation letters, COVA visa form assistance, biometric appointment booking, and flight charters.',
      ar: 'تحتفظ وكالة ICA بقنوات عمل إدارية مباشرة مع القنصلية الصينية العامة في أربيل ووزارة الخارجية العراقية لتوفير خطابات الدعوة الرسمية، استمارات COVA، حجز المواعيد البيومترية، والرحلات المباشرة.',
      zh: '伊中机构深度对接中国驻埃尔比勒总领事馆、中国驻伊使馆及伊拉克外交部，为中伊企业家提供官方PU邀请函、COVA在线填表预审、生物指纹免排队预约及直航包机保障。',
      ckb: 'دەزگای ICA پەیوەندی بەردەوامی لەگەڵ کونسوڵخانەی گشتی چین لە هەولێر و وەزارەتی دەرەوەی عێراق هەیە بۆ دابینکردنی بانگهێشتنامەی فەرمی و ڤیزا.'
    },
    capabilities: {
      en: [
        'Official Chinese commercial invitation (PU letter) issuance',
        'COVA form completion, photo standard compliance & biometric fast-tracking',
        'Iraqi eVisa & Kurdistan Region investor visa facilitation',
        'Custom corporate delegation itineraries & bilingual translation escorts'
      ],
      ar: [
        'إصدار خطابات الدعوة التجارية الصينية الرسمية (PU Letter)',
        'تعبئة استمارة COVA وتدقيق الصور وحجز المواعيد البيومترية السريعة',
        'إصدار التأشيرة الإلكترونية العراقية وتأشيرات المستثمرين في كوردستان',
        'تنظيم جداول زيارات الوفود ومرافقة المترجمين المحترفين'
      ],
      zh: [
        '官方外事经贸邀请函（PU Letter）极速合规申办',
        'COVA系统规范填报、照片规格智能校验与使领馆指纹VIP通道',
        '伊拉克联邦电子签证（eVisa）及库区高端商务投资签证代办',
        '中伊双向商务考察定制路线、高端接待与同声传译全程陪同'
      ],
      ckb: [
        'دەرکردنی بانگهێشتنامەی بازرگانی فەرمی چین (PU Letter)',
        'پڕکردنەوەی فۆڕمی COVA و وەرگرتنی نۆرەی خێرای پەنجەمۆر',
        'دەرکردنی ڤیزای ئەلیکترۆنی عێراق و ڤیزای وەبەرهێنەر لە هەرێم',
        'ڕێکخستنی بەرنامەی سەردانی شاندەکان و وەرگێڕی هاوەڵ'
      ]
    },
    deliverables: {
      en: ['Official PU Invitation Letter', 'Consular Approved Visa Dossier', 'Fast-track Biometric Pass', 'VIP Delegation Itinerary'],
      ar: ['خطاب الدعوة الرسمي (PU)', 'الملف القنصلي المعتمد للتأشيرة', 'بطاقة الموعد البيومتري السريع', 'جدول زيارة الوفد التجاري المخصص'],
      zh: ['《官方外事商贸邀请函（PU）》', '《领事合规签证申请全套案卷》', '《使领馆生物识别绿色通道凭条》', '《专属高规格政企考察行程单》'],
      ckb: ['بانگهێشتنامەی فەرمی PU', 'دۆسیەی پەسەندکراوی کونسوڵخانە', 'کارتی نۆرەی خێرای پەنجەمۆر', 'بەرنامەی فەرمی سەردانی شاند']
    },
    summitRole: {
      en: 'Coordinates VIP diplomatic protocol, summit delegate airport fast-track at Sulaymaniyah International Airport, and consular facilitation booths.',
      ar: 'تنسيق البروتوكول الدبلوماسي لكبار الشخصيات، المسار السريع في مطار السليمانية الدولي، ومكتب التسهيلات القنصلية.',
      zh: '负责峰会中伊政要贵宾的礼宾接待，开辟苏莱曼尼亚国际机场落地通关VIP绿通，现场设立领事服务处。',
      ckb: 'ڕێکخستنی پرۆتۆکۆڵی دیپلۆماسی، ڕێڕەوی خێرای فڕۆکەخانەی نێودەوڵەتی سلێمانی و خزمەتگوزارییە کونسوڵییەکان.'
    },
    icon: 'Plane',
    badge: {
      en: 'Erbil Consular Fast-Track',
      ar: 'المسار القنصلي السريع في أربيل',
      zh: '驻埃尔比勒总领馆绿通协办',
      ckb: 'ڕێڕەوی خێرای کونسوڵخانەی هەولێر'
    }
  },
  {
    id: 'consultancy',
    slug: 'consultancy',
    title: {
      en: 'Strategic Financial & Legal Consultancy',
      ar: 'الاستشارات المالية والاستراتيجية والقانونية',
      zh: '战略咨询、跨国法务与财税合规',
      ckb: 'ڕاوێژکاری ستراتیژی، دارایی و یاسایی'
    },
    tagline: {
      en: 'Macroeconomic modeling, joint venture structuring, bilateral legal compliance, and market-entry advisory.',
      ar: 'النمذجة الاقتصادية الكلية، هيكلة المشاريع المشتركة، الامتثال القانوني الثنائي، واستراتيجيات دخول السوق.',
      zh: '基于智库学术研究的宏观经济建模、中伊合资架构设计、主权法律合规与市场准入咨询。',
      ckb: 'مۆدێلی ئابووری، داڕشتنی پڕۆژەی هاوبەش، پابەندبوونی یاسایی و ڕاوێژی چوونە ناو بازاڕ.'
    },
    description: {
      en: 'Powered directly by the research fellows of the Chinese Institute for Strategic and Economic Studies, ICA provides sovereign and corporate clients with bankable feasibility studies, KRG/Federal regulatory clearance, transfer pricing guidance, and arbitration advisory.',
      ar: 'بدعم مباشر من باحثي المعهد الصيني للدراسات الاستراتيجية والاقتصادية، تقدم وكالة ICA دراسات جدوى بنكية، تراخيص هيئات الاستثمار في بغداد وأربيل، والامتثال الضريبي والتحكيم التجاري.',
      zh: '由中国战略与经济研究院资深研究员亲自担纲，为中伊主权机构与跨国巨头提供可研报告评估、伊拉克中央与库区投资法合规穿透、双边转让定价筹划及国际仲裁支持。',
      ckb: 'بە پاڵپشتی توێژەرانی پەیمانگای چین بۆ توێژینەوەی ستراتیژی و ئابووری، دەزگای ICA توێژینەوەی پڕۆژەکان و ڕاوێژی یاسایی پێشکەش دەکات.'
    },
    capabilities: {
      en: [
        'Bankable feasibility study preparation & Chinese SOE compliance',
        'Cross-border corporate structuring (Sulaymaniyah & Erbil registrations)',
        'Bilingual legal contract drafting (Chinese / English / Arabic / Kurdish)',
        'Tariff classification, tax treaty optimization & transfer pricing'
      ],
      ar: [
        'إعداد دراسات الجدوى المصرفية المعتمدة للشركات الصينية الكبرى',
        'تأسيس وتسجيل الشركات المشتركة في السليمانية وأربيل وبغداد',
        'صياغة العقود القانونية باللغات الصينية والإنجليزية والعربية والكردية',
        'التصنيف الجمركي، اتفاقيات تجنب الازدواج الضريبي، والتسعير التحويلي'
      ],
      zh: [
        '符合中国国资委及银行信贷标准的国际化《商业可行性研究报告》',
        '跨境中伊合资公司（JV）架构搭建与伊拉克本地公司合规注册',
        '四语（中/英/阿/库）严密商事合同起草与法律风控审查',
        '双边关税减免税目归类筹划、中伊避免双重征税协定合规落地'
      ],
      ckb: [
        'ئامادەکردنی توێژینەوەی ئابووری پەسەندکراو بۆ بانکەکان',
        'دامەزراندنی کۆمپانیای هاوبەش لە سلێمانی، هەولێر و بەغدا',
        'داڕشتنی گرێبەستە یاساییەکان بە چوار زمان',
        'ڕێکخستنی باج و گومرگ بەپێی ڕێککەوتننامە نێودەوڵەتییەکان'
      ]
    },
    deliverables: {
      en: ['Bankable Feasibility Study', 'Bilateral Tax Optimization Memo', 'Multi-Jurisdiction Legal Opinion', 'Market Entry Master Strategy'],
      ar: ['دراسة جدوى مصرفية قابلة للتمويل', 'مذكرة تحسين المعاملة الضريبية', 'رأي قانوني متعدد الاختصاصات', 'الخطة الاستراتيجية لدخول السوق العراقية'],
      zh: ['《银行级项目投资可行性研究全案》', '《中伊跨国财税最优化架构备忘录》', '《跨境商事法务合规法律意见书》', '《伊拉克市场准入全景战略蓝图》'],
      ckb: ['توێژینەوەی دارایی شیاوی وەرگرتنی قەرز', 'ڕاپۆرتی ڕێکخستنی باج', 'بۆچوونی یاسایی نێودەوڵەتی', 'ستراتیژی چوونە ناو بازاڕ']
    },
    summitRole: {
      en: 'Publishes the official pre-summit Iraq Sector Opportunity Briefs and moderates closed-door sovereign roundtables.',
      ar: 'نشر تقارير الفرص القطاعية الرسمية قبل القمة وإدارة طاولات الحوار المغلقة لصناع القرار.',
      zh: '在峰会前独家发布《伊拉克11大行业投资机遇深度简报》，并在峰会期间主持闭门主权圆桌研讨。',
      ckb: 'بڵاوکردنەوەی ڕاپۆرتی دەرفەتەکانی وەبەرهێنان لە ١١ کەرتدا و بەڕێوەبردنی کۆبوونەوەی داخراوی بەرپرسان.'
    },
    icon: 'Scale',
    badge: {
      en: 'Institute Research Backed',
      ar: 'مدعوم بأبحاث المعهد الصيني',
      zh: '战略与经济研究院智库背书',
      ckb: 'پاڵپشت بە توێژینەوەکانی پەیمانگا'
    }
  }
];

export const SUMMIT_AGENDA: AgendaSession[] = [
  // DAY 1
  {
    id: 'd1-s1',
    day: 1,
    time: '09:00 - 10:30',
    title: {
      en: 'Inaugural Plenary: Sovereign Alignment & Bilateral Strategic Blueprint 2026–2030',
      ar: 'الجلسة الافتتاحية العامة: التوافق السيادي والمخطط الاستراتيجي الثنائي ٢٠٢٦–٢٠٣٠',
      zh: '开幕全体大会：中伊主权战略对接与2026–2030双边经贸蓝图',
      ckb: 'کۆبوونەوەی گشتی دەستپێک: تەبایی سەروەری و نەخشەڕێگای ستراتیژی ٢٠٢٦–٢٠٣٠'
    },
    description: {
      en: 'Opening keynotes by Iraqi Cabinet representatives, KRG Prime Ministry, Chinese Ambassador to Iraq, and the President of the Chinese Institute.',
      ar: 'كلمات افتتاحية لممثلي مجلس الوزراء العراقي، رئاسة حكومة إقليم كوردستان، السفير الصيني في العراق، ورئيس المعهد الصيني للدراسات الاستراتيجية.',
      zh: '伊拉克内阁代表、库区政府总理府高官、中国驻伊拉克大使及中国战略与经济研究院院长发表开幕主旨演讲。',
      ckb: 'وتاری دەستپێکی نوێنەرانی ئەنجومەنی وەزیرانی عێراق، حکومەتی هەرێم، باڵیۆزی چین و سەرۆکی پەیمانگای چین.'
    },
    track: 'Summit',
    type: 'KEYNOTE',
    location: {
      en: 'Grand Millennium Plenary Hall',
      ar: 'قاعة الاحتفالات الكبرى — غراند ميلينيوم',
      zh: '千禧大酒店主会场（Plenary Hall）',
      ckb: 'هۆڵی سەرەکی گراند میلینیۆم'
    },
    speakerIds: ['spk-1', 'spk-2', 'spk-3', 'spk-4'],
    instituteResearchSlug: 'iraq-china-strategic-framework-2026',
    instituteResearchTitle: {
      en: 'Sovereign Alignment in Multipolar West Asia (Institute Annual Report)',
      ar: 'التوافق السيادي في غرب آسيا متعدد الأقطاب (تقرير المعهد السنوي)',
      zh: '多极化格局下的中伊主权协同（研究院年度旗舰报告）',
      ckb: 'تەبایی سەروەری لە ڕۆژئاوای ئاسیا (ڕاپۆرتی ساڵانەی پەیمانگا)'
    }
  },
  {
    id: 'd1-s2',
    day: 1,
    time: '11:00 - 12:30',
    title: {
      en: 'Bilateral Expo Ribbon Cutting & Grand Pavilion Tour',
      ar: 'افتتاح المعرض الثنائي وجولة الأجنحة القطاعية الـ١١ الكبرى',
      zh: '双边博览会剪彩仪式与11大行业展区联合巡馆',
      ckb: 'کردنەوەی پێشانگای دوولایەنە و بەسەرکردنەوەی ١١ کەرتی سەرەکی'
    },
    description: {
      en: 'Official ribbon cutting for the 11 Sector Pavilions across 15,000 sqm of exhibition space featuring 240+ Chinese and Iraqi enterprises.',
      ar: 'قص شريط الافتتاح الرسمي للأجنحة الـ١١ على مساحة ١٥ ألف متر مربع بمشاركة أكثر من ٢٤٠ شركة صينية وعراقية.',
      zh: '为占地15,000平方米、汇聚240余家中伊领军企业的11大产业展区隆重举行开幕剪彩。',
      ckb: 'بڕینی شریتی فەرمی بۆ ١١ کەرتی پیشانگاکە لەسەر ڕووبەری ١٥ هەزار مەتری چوارگۆشە بە بەشداری ٢٤٠ کۆمپانیا.'
    },
    track: 'Expo',
    type: 'PITCH',
    location: {
      en: 'Sulaymaniyah International Expo Arena',
      ar: 'صالة معارض السليمانية الدولية',
      zh: '苏莱曼尼亚国际博览中心主馆',
      ckb: 'ناوەندی نێودەوڵەتی پێشانگای سلێمانی'
    },
    speakerIds: ['spk-1', 'spk-5', 'spk-6']
  },
  {
    id: 'd1-s3',
    day: 1,
    time: '14:00 - 16:00',
    title: {
      en: 'High-Level Roundtable: The Development Road & Maritime-Land Intermodal Corridors',
      ar: 'طاولة مستديرة رفيعة المستوى: طريق التنمية وممرات النقل البحري والبري',
      zh: '部长级圆桌论坛：“发展之路”大走廊与海铁多式联运大通道',
      ckb: 'کۆبوونەوەی باڵا: پڕۆژەی ڕێگای گەشەپێدان و ڕێڕەوەکانی گواستنەوە'
    },
    description: {
      en: 'Review of the $17B infrastructure integration between Grand Faw Port and Turkish/European rail networks via Sulaymaniyah corridors.',
      ar: 'بحث التكامل الهندسي والمالي لمشروع طريق التنمية لربط ميناء الفاو الكبير بالشبكات الأوروبية عبر ممرات السليمانية.',
      zh: '深入探讨170亿美元“发展之路”大走廊、大公港出海口与贯穿苏莱曼尼亚的枢纽连接规划。',
      ckb: 'تاوتوێکردنی پڕۆژەی ١٧ ملیار دۆلاری ڕێگای گەشەپێدان لە بەندەری فاو تا سنوورەکان.'
    },
    track: 'Summit',
    type: 'PANEL',
    location: {
      en: 'Grand Millennium Hall A',
      ar: 'قاعة غراند ميلينيوم (أ)',
      zh: '千禧大酒店第一会议厅',
      ckb: 'هۆڵی گراند میلینیۆم A'
    },
    speakerIds: ['spk-2', 'spk-7', 'spk-8'],
    instituteResearchSlug: 'development-road-corridor-tracker-2026',
    instituteResearchTitle: {
      en: 'Corridor Tracker: Iraq Transit Nodes & Regional Hubs (Data Hub)',
      ar: 'مرصد الممرات: عقد الترانزيت العراقية والمراكز الإقليمية (مركز البيانات)',
      zh: '发展之路走廊监测：伊拉克过境节点与区域枢纽（数据中心）',
      ckb: 'چاودێری ڕێڕەوی گەشەپێدان: وێستگەکانی ترانزێت لە عێراق'
    }
  },
  // DAY 2
  {
    id: 'd2-s1',
    day: 2,
    time: '09:30 - 11:30',
    title: {
      en: 'Monetary Forum: Direct IQD/CNY Settlement, CIPS Integration & e-CNY Pilots',
      ar: 'المنتدى النقدي: المقاصة المباشرة بالدينار واليوان، تكامل CIPS، وتطبيقات اليوان الرقمي',
      zh: '货币金融高峰论坛：第纳尔/人民币直接清算、CIPS互联与数字人民币试点',
      ckb: 'فۆڕمی دراو: پاکتاوی ڕاستەوخۆ بە دینار و یوان، بەستنەوە بە CIPS و یوان'
    },
    description: {
      en: 'Joint session between Central Bank of Iraq governors, PBOC international department heads, Bank of China executives, and Iraqi commercial bank leaders.',
      ar: 'جلسة مشتركة تجمع قيادات البنك المركزي العراقي، بنك الشعب الصيني، بنك الصين، ورؤساء المصارف التجارية العراقية.',
      zh: '伊拉克央行行长团队、中国人民银行国际司、中国银行总行专家与伊拉克主要商业银行董事长联合闭门研讨。',
      ckb: 'دانیشتنی هاوبەشی بانکی ناوەندی عێراق، بانکی گەلی چین، بانکی چین و بانکە بازرگانییەکان.'
    },
    track: 'Summit',
    type: 'PANEL',
    location: {
      en: 'Financial Forum Arena',
      ar: 'قاعة المنتدى المالي',
      zh: '金融论坛主报告厅',
      ckb: 'هۆڵی فۆڕمی دارایی'
    },
    speakerIds: ['spk-3', 'spk-9', 'spk-10'],
    instituteResearchSlug: 'de-dollarization-cbi-pboc-mechanisms',
    instituteResearchTitle: {
      en: 'Monetary Architecture: IQD/CNY Settlement Mechanics (Institute Brief)',
      ar: 'الهندسة النقدية: آليات تسوية الدينار واليوان (تقرير المعهد)',
      zh: '货币新架构：中伊本币清算运行机制解析（研究院简报）',
      ckb: 'سیستەمی دراو: میکانیزمی پاکتاوی دینار و یوان'
    }
  },
  {
    id: 'd2-s2',
    day: 2,
    time: '12:00 - 17:00',
    title: {
      en: 'Pre-Matched B2B Matchmaking Sessions (11 Sector Pavilions)',
      ar: 'جلسات التوفيق التجاري الثنائي المسبقة عبر الأجنحة القطاعية الـ١١',
      zh: '11大产业展区点对点B2B精准商贸配对洽谈会',
      ckb: 'دانیشتنەکانی ڕێکخستنی بازرگانی B2B لە سەرانسەری ١١ کەرتدا'
    },
    description: {
      en: 'Facilitated 1-on-1 deal rooms backed by ICA Sourcing Desks and Institute sector opportunity analysts.',
      ar: 'جلسات عمل ثنائية مغلقة بإشراف مكاتب توريد ICA ومحللي الفرص الاستثمارية في المعهد.',
      zh: '在ICA直采工作组与研究院行业分析师支持下，开展全天候一对一封闭式精准商机洽谈。',
      ckb: 'دانیشتنی تایبەتی بازرگانان بە سەرپەرشتی دەزگای ICA و پسپۆڕانی پەیمانگا.'
    },
    track: 'Services',
    type: 'MATCHMAKING',
    location: {
      en: 'B2B Matchmaking Lounge & Sector Deal Rooms',
      ar: 'صالة التوفيق التجاري وغرف الصفقات القطاعية',
      zh: 'B2B商务配对中心及各行业专属签约洽谈室',
      ckb: 'هۆڵی B2B و ژوورەکانی گرێبەستی کەرتی'
    },
    speakerIds: ['spk-5', 'spk-6']
  },
  // DAY 3
  {
    id: 'd3-s1',
    day: 3,
    time: '10:00 - 12:00',
    title: {
      en: 'Academic & Technology Forum: University Bilateral Programs & AI Infrastructure',
      ar: 'المنتدى الأكاديمي والتكنولوجي: البرامج الجامعية المشتركة وبنية الذكاء الاصطناعي',
      zh: '学术与前沿科技论坛：中伊大学联合办学与AI基础设施建设',
      ckb: 'فۆڕمی ئەکادیمی و تەکنەلۆژیا: بەرنامە هاوبەشەکانی زانکۆ و ژێرخانی AI'
    },
    description: {
      en: 'Panel featuring University of Sulaimani China Studies Centre, Tsinghua University Institute for International Relations, and tech leaders.',
      ar: 'حلقة نقاشية تجمع مركز الدراسات الصينية بجامعة السليمانية ومعهد العلاقات الدولية بجامعة تسينغهوا ورواد التكنولوجيا.',
      zh: '由苏莱曼尼亚大学中国研究中心、清华大学国际关系研究院及高科技企业联合呈现。',
      ckb: 'کۆبوونەوەی زانستی بە بەشداری سەنتەری لێکۆڵینەوەی چین لە زانکۆی سلێمانی و زانکۆی تسینگهوا.'
    },
    track: 'Academic',
    type: 'ROUNDTABLE',
    location: {
      en: 'University of Sulaimani Academic Hall',
      ar: 'القاعة الأكاديمية — جامعة السليمانية',
      zh: '苏莱曼尼亚大学学术交流中心',
      ckb: 'هۆڵی ئەکادیمی زانکۆی سلێمانی'
    },
    speakerIds: ['spk-4', 'spk-11', 'spk-12'],
    instituteResearchSlug: 'academic-exchange-stem-vocational-initiatives',
    instituteResearchTitle: {
      en: 'Knowledge Alliances: Bilateral Higher Education & Vocational Transfer',
      ar: 'تحالفات المعرفة: التعليم العالي والتدريب المهني المشترك',
      zh: '知识联盟：中伊高等教育与职业技能协同转移（研究专刊）',
      ckb: 'هاوپەیمانی زانست: خوێندنی باڵا و ڕاهێنانی پیشەیی'
    }
  },
  {
    id: 'd3-s2',
    day: 3,
    time: '14:30 - 17:00',
    title: {
      en: 'Solemn MOU Signing Ceremony & Summit Sulaymaniyah Declaration',
      ar: 'مراسم التوقيع الرسمي للاتفاقيات ومذكرات التفاهم وإعلان السليمانية الختامي',
      zh: '重大战略合作协议集中签署仪式暨峰会《苏莱曼尼亚宣言》发布',
      ckb: 'مەراسیمی فەرمی واژۆکردنی گرێبەستەکان و ڕاگەیاندنی بەیاننامەی کۆتایی سلێمانی'
    },
    description: {
      en: 'Bilateral contract execution totaling an estimated $3.2B across energy, manufacturing, infrastructure, and retail distribution, followed by the Institute Communiqué.',
      ar: 'توقيع عقود وشراكات استثمارية بقيمة تقديرية تصل إلى ٣.٢ مليار دولار في الطاقة والصناعة والبنية التحتية، تليها التوصيات الختامية للمعهد.',
      zh: '集中见证能源、智能制造、基础设施及跨境商贸等领域预计超32亿美元重大合作签约，发布研究院《峰会政策建议公报》。',
      ckb: 'واژۆکردنی گرێبەستە بازرگانییەکان بە بەهای ٣.٢ ملیار دۆلار لە کەرتەکانی وزە و پیشەسازی و ڕاگەیاندنی بەیاننامەی کۆتایی.'
    },
    track: 'Summit',
    type: 'MOU_SIGNING',
    location: {
      en: 'Grand Millennium Plenary Hall',
      ar: 'قاعة الاحتفالات الكبرى — غراند ميلينيوم',
      zh: '千禧大酒店主会场（Plenary Hall）',
      ckb: 'هۆڵی سەرەکی گراند میلینیۆم'
    },
    speakerIds: ['spk-1', 'spk-2', 'spk-3', 'spk-4', 'spk-5']
  }
];

export const SUMMIT_SPEAKERS: SummitSpeaker[] = [
  {
    id: 'spk-1',
    name: {
      en: 'H.E. Dr. Fuad Hussein',
      ar: 'معالي الدكتور فؤاد حسين',
      zh: '福阿德·侯赛因 阁下',
      ckb: 'د. فوئاد حوسێن'
    },
    title: {
      en: 'Deputy Prime Minister & Minister of Foreign Affairs',
      ar: 'نائب رئيس مجلس الوزراء ووزير الخارجية العراقي',
      zh: '伊拉克副总理兼外交部长',
      ckb: 'جێگری سەرۆک وەزیران و وەزیری دەرەوە'
    },
    organization: {
      en: 'Government of Iraq',
      ar: 'حكومة جمهورية العراق',
      zh: '伊拉克共和国政府',
      ckb: 'حکومەتی کۆماری عێراق'
    },
    bio: {
      en: 'Leading bilateral diplomatic dialogues and sovereign cooperation agreements across Asia and the Middle East.',
      ar: 'يقود الحوارات الدبلوماسية الثنائية واتفاقيات التعاون السيادي عبر آسيا والشرق الأوسط.',
      zh: '主管伊拉克全方位主权外交与亚洲重要经贸双边条约。',
      ckb: 'سەرپەرشتی وتووێژە دیپلۆماسییەکان و پەیوەندییە ستراتیژییەکان دەکات.'
    },
    roleType: 'GOVERNMENT'
  },
  {
    id: 'spk-2',
    name: {
      en: 'H.E. Haval Abubakir',
      ar: 'سعادة الدكتور هفال أبو بكر',
      zh: '哈瓦尔·阿布巴克尔 博士',
      ckb: 'د. هەڤاڵ ئەبوبەکر'
    },
    title: {
      en: 'Governor of Sulaymaniyah',
      ar: 'محافظ السليمانية',
      zh: '苏莱曼尼亚省省长',
      ckb: 'پارێزگاری سلێمانی'
    },
    organization: {
      en: 'Sulaymaniyah Governorate',
      ar: 'محافظة السليمانية',
      zh: '苏莱曼尼亚省政府',
      ckb: 'پارێزگای سلێمانی'
    },
    bio: {
      en: 'Architect of the Sulaymaniyah-Yiwu sister-city agreement and champion of regional industrial special economic zones.',
      ar: 'مهندس اتفاقية التوأمة بين السليمانية وييوو وداعم المناطق الصناعية والاقتصادية الخاصة.',
      zh: '苏莱曼尼亚-义乌友好城市协议缔造者，库区特种工业经济区核心推动者。',
      ckb: 'ئەندازیاری ڕێککەوتنی دەستەخوشکی نێوان سلێمانی و ییوو و پاڵپشتی ناوچە ئابوورییەکان.'
    },
    roleType: 'GOVERNMENT'
  },
  {
    id: 'spk-3',
    name: {
      en: 'H.E. Cui Wei',
      ar: 'سعادة السفير تسوي وي',
      zh: '崔巍 阁下',
      ckb: 'بڕێز تسۆی وەی'
    },
    title: {
      en: 'Ambassador of the People’s Republic of China to Iraq',
      ar: 'سفير جمهورية الصين الشعبية لدى العراق',
      zh: '中华人民共和国驻伊拉克特命全权大使',
      ckb: 'باڵیۆزی کۆماری میللی چین لە عێراق'
    },
    organization: {
      en: 'Embassy of the People’s Republic of China',
      ar: 'سفارة جمهورية الصين الشعبية',
      zh: '中国驻伊拉克大使馆',
      ckb: 'باڵیۆزخانەی کۆماری میللی چین'
    },
    bio: {
      en: 'Overseeing China-Iraq Comprehensive Strategic Partnership implementation across BRI projects.',
      ar: 'الإشراف على تنفيذ الشراكة الاستراتيجية الشاملة بين الصين والعراق ومشاريع الحزام والطريق.',
      zh: '全面统筹中伊战略伙伴关系落地与“一带一路”重点项目推进。',
      ckb: 'سەرپەرشتی هاوبەشی ستراتیژی عێراق و چین و پڕۆژەکانی یەک پشتێنە و یەک ڕێگە دەکات.'
    },
    roleType: 'DIPLOMAT'
  },
  {
    id: 'spk-4',
    name: {
      en: 'Prof. Dr. Chen Jingyuan',
      ar: 'أ.د. تشن جينغيوان',
      zh: '陈景元 教授/研究员',
      ckb: 'پرۆفیسۆر د. چێن جینگیوان'
    },
    title: {
      en: 'President & Senior Research Fellow',
      ar: 'رئيس المعهد وكبير الباحثين',
      zh: '中国战略与经济研究院院长、首席资深研究员',
      ckb: 'سەرۆکی پەیمانگا و توێژەری باڵا'
    },
    organization: {
      en: 'Chinese Institute for Strategic and Economic Studies',
      ar: 'المعهد الصيني للدراسات الاستراتيجية والاقتصادية',
      zh: '中国战略与经济研究院',
      ckb: 'پەیمانگای چین بۆ توێژینەوەی ستراتیژی و ئابووری'
    },
    bio: {
      en: 'Leading authority on Sino-Arab monetary architecture, RMB internationalization, and West Asian energy geopolitics.',
      ar: 'خبير بارز في الهندسة النقدية الصينية العربية، تدويل اليوان، وجيوسياسة الطاقة في غرب آسيا.',
      zh: '中阿货币清算体系、人民币国际化及西亚能源地缘政治顶尖智库学者。',
      ckb: 'پسپۆڕی باڵا لە بواری دراو و پەیوەندییە ئابوورییەکانی چین و ڕۆژهەڵاتی ناوەڕاست.'
    },
    isInstituteFellow: true,
    instituteExpertId: 'chen-jingyuan',
    roleType: 'FELLOW'
  },
  {
    id: 'spk-5',
    name: {
      en: 'Sirwan Mohammed',
      ar: 'سيروان محمد',
      zh: '西尔万·穆罕默德 先生',
      ckb: 'سیروان محەممەد'
    },
    title: {
      en: 'President of Sulaymaniyah Chamber of Commerce & Industry',
      ar: 'رئيس غرفة تجارة وصناعة السليمانية',
      zh: '苏莱曼尼亚工商会主席',
      ckb: 'سەرۆکی ژووری بازرگانی و پیشەسازی سلێمانی'
    },
    organization: {
      en: 'Sulaymaniyah Chamber of Commerce & Industry',
      ar: 'غرفة تجارة وصناعة السليمانية',
      zh: '苏莱曼尼亚工商会',
      ckb: 'ژووری بازرگانی و پیشەسازی سلێمانی'
    },
    bio: {
      en: 'Representing over 35,000 Kurdish and Iraqi enterprises, championing bilateral trade and logistics hubs.',
      ar: 'يمثل أكثر من ٣٥ ألف شركة ومؤسسة في إقليم كوردستان والعراق، ويدعم ممرات التجارة الثنائية.',
      zh: '代表库区及伊拉克35,000余家工商企业，致力于打造中东领先的物流枢纽。',
      ckb: 'نوێنەرایەتی زیاتر لە ٣٥ هەزار کۆمپانیا لە هەرێم و عێراق دەکات بۆ گەشەی بازرگانی.'
    },
    roleType: 'ENTERPRISE'
  },
  {
    id: 'spk-6',
    name: {
      en: 'Wang Jianlong',
      ar: 'وانغ جيان لونغ',
      zh: '王建龙 先生',
      ckb: 'وانگ جیانلۆنگ'
    },
    title: {
      en: 'Director General of Middle East Operations',
      ar: 'المدير العام لعمليات الشرق الأوسط',
      zh: '中国土木工程集团（CCECC）中东区域总经理',
      ckb: 'بەڕێوەبەری گشتی ئۆپەراسیۆنەکانی ڕۆژهەڵاتی ناوەڕاست'
    },
    organization: {
      en: 'China Civil Engineering Construction Corporation (CCECC)',
      ar: 'الشركة الصينية للهندسة والإنشاءات المدنية (CCECC)',
      zh: '中国土木工程集团有限公司',
      ckb: 'کۆمپانیای ئەندازیاری شارستانی چین (CCECC)'
    },
    bio: {
      en: 'Managing over $4B in transit infrastructure, rail links, and dry port engineering across the Middle East.',
      ar: 'يدير مشاريع بنية تحتية وسكك حديدية وموانئ جافة بقيمة تتجاوز ٤ مليارات دولار في المنطقة.',
      zh: '主管中东地区总投资超40亿美元的高铁、干线公路及陆港枢纽工程项目群。',
      ckb: 'بەڕێوەبەری پڕۆژەکانی هێڵی ئاسن و ژێرخان بە بەهای زیاتر لە ٤ ملیار دۆلار.'
    },
    roleType: 'ENTERPRISE'
  },
  {
    id: 'spk-7',
    name: {
      en: 'Dr. Ziyad Al-Husseini',
      ar: 'د. زياد الحسيني',
      zh: '齐亚德·侯赛尼 博士',
      ckb: 'د. زیاد ئەلحوسێنی'
    },
    title: {
      en: 'Senior Fellow in Trade Corridors & Maritime Logistics',
      ar: 'زميل أول في ممرات التجارة واللوجستيات البحرية',
      zh: '贸易走廊与海运物流资深研究员',
      ckb: 'توێژەری باڵا لە بواری ڕێڕەوە بازرگانییەکان'
    },
    organization: {
      en: 'Chinese Institute for Strategic and Economic Studies',
      ar: 'المعهد الصيني للدراسات الاستراتيجية والاقتصادية',
      zh: '中国战略与经济研究院',
      ckb: 'پەیمانگای چین بۆ توێژینەوەی ستراتیژی و ئابووری'
    },
    bio: {
      en: 'Author of the comprehensive Development Road Transit Simulation and Grand Faw connectivity models.',
      ar: 'مؤلف نموذج محاكاة ترانزيت طريق التنمية وتحليلات الربط الاستراتيجي لميناء الفاو الكبير.',
      zh: '《发展之路走廊多式联运数学仿真模型》与大公港吞吐量战略预测报告主笔。',
      ckb: 'نووسەری توێژینەوەی پڕۆژەی ڕێگای گەشەپێدان و بەندەری فاو.'
    },
    isInstituteFellow: true,
    instituteExpertId: 'ziyad-alhusseini',
    roleType: 'FELLOW'
  },
  {
    id: 'spk-8',
    name: {
      en: 'Lin Yue',
      ar: 'لين يوي',
      zh: '林悦 女士',
      ckb: 'لین یوێ'
    },
    title: {
      en: 'Head of Macroeconomic Modeling & BRI Project Registry',
      ar: 'رئيسة نمذجة الاقتصاد الكلي وسجل مشاريع الحزام والطريق',
      zh: '宏观经济计量中心主管、“一带一路”重点项目数据库首席专家',
      ckb: 'بەرپرسی مۆدێلی ئابووری و پرۆژەکانی یەک پشتێنە و یەک ڕێگە'
    },
    organization: {
      en: 'Chinese Institute for Strategic and Economic Studies',
      ar: 'المعهد الصيني للدراسات الاستراتيجية والاقتصادية',
      zh: '中国战略与经济研究院',
      ckb: 'پەیمانگای چین بۆ توێژینەوەی ستراتیژی و ئابووری'
    },
    bio: {
      en: 'Supervises the Institute Data Hub Trade Explorer and Corridor Tracker datasets.',
      ar: 'تشرف على مستودعات بيانات مستكشف التجارة ومرصد الممرات في مركز بيانات المعهد.',
      zh: '主管研究院中伊双边贸易数据透视器及“一带一路”重点投资项目库。',
      ckb: 'سەرپەرشتی داتای بازرگانی و پڕۆژە هاوبەشەکانی نێوان عێراق و چین دەکات.'
    },
    isInstituteFellow: true,
    instituteExpertId: 'lin-yue',
    roleType: 'FELLOW'
  }
];

export const SUMMIT_SPONSOR_TIERS = [
  {
    id: 'platinum',
    name: {
      en: 'Platinum Strategic Partner',
      ar: 'الشريك الاستراتيجي البلاتيني',
      zh: '白金战略合作伙伴',
      ckb: 'هاوبەشی ستراتیژی پلاتینیۆم'
    },
    fee: '$120,000 / ¥850,000',
    boothSize: '72 sqm Custom Island Pavilion',
    vipPasses: 12,
    keynoteSlot: true,
    mouSigningStage: true,
    benefits: {
      en: [
        'Exclusive naming rights on Plenary Opening Hall & Keynote Stage',
        '72 sqm custom prime pavilion location at Main Arena entrance',
        'Keynote speech in Official Opening Session & MOU Signing Ceremony',
        '12 VIP All-Access passes with private bilateral meeting lounge',
        'Full page feature in Institute Summit Policy Monograph'
      ],
      ar: [
        'حقوق التسمية الحصرية لقاعة الافتتاح العامة والمنصة الرئيسية',
        'جناح مخصص بمساحة ٧٢ متراً مربعاً عند المدخل الرئيسي للملتقى',
        'إلقاء كلمة رئيسية في الجلسة الافتتاحية ومراسم توقيع الاتفاقيات',
        '١٢ بطاقة VIP شاملة مع جناح خاص للاجتماعات الثنائية المغلقة',
        'صفحة ملونة كاملة في تقرير المعهد السنوي الخاص بالقمة'
      ],
      zh: [
        '峰会开幕主会场及主旨演讲舞台独家冠名权',
        '主展厅黄金核心位置72平方米特装岛型旗舰展位',
        '在官方开幕全体大会发表主旨演讲及重点MOU签约台专属席位',
        '12张全通型贵宾（VIP）参会证及专属双边闭门商务洽谈室',
        '中国战略与经济研究院《峰会政策白皮书》整版战略合作呈现'
      ],
      ckb: [
        'مافی ناونانی تایبەت لە هۆڵی سەرەکی و سەکۆی وتار',
        'پاڤلیۆنی تایبەتی ٧٢ مەتری لە بەردەم دەروازەی سەرەکی',
        'وتاری سەرەکی لە مەراسیمی دەستپێک و واژۆکردنی گرێبەست',
        '١٢ کارتی VIP و ژووری تایبەتی کۆبوونەوەی داخراو',
        'ڕیکلامی تەواو لە بڵاوکراوەی ساڵانەی پەیمانگادا'
      ]
    }
  },
  {
    id: 'gold',
    name: {
      en: 'Gold Sector Sponsor',
      ar: 'الراعي الذهبي للقطاع',
      zh: '黄金行业赞助商',
      ckb: 'سپۆنسەری زێڕینی کەرت'
    },
    fee: '$60,000 / ¥420,000',
    boothSize: '36 sqm Corporate Pavilion',
    vipPasses: 6,
    keynoteSlot: false,
    mouSigningStage: true,
    benefits: {
      en: [
        'Title sponsor of one of the 11 Sector Pavilions',
        '36 sqm prominent custom exhibition booth',
        'Panel moderator or panelist slot in Sector Deep-Dive session',
        '6 VIP delegate passes with B2B lounge priority',
        'Logo branding across all summit physical & digital badges'
      ],
      ar: [
        'الرعاية الحصرية لأحد الأجنحة القطاعية الـ١١ الكبرى',
        'جناح عرض متميز بمساحة ٣٦ متراً مربعاً',
        'مقعد متحدث رئيسي في جلسة النقاش المتخصصة للقطاع',
        '٦ بطاقات VIP مع أولوية استخدام صالة التوفيق التجاري B2B',
        'وضع الشعار الرسمي على بطاقات الحضور والمنصات الرقمية'
      ],
      zh: [
        '11大产业专属展区之一的独家联合冠名权',
        '36平方米特装行业领先展位',
        '专属行业平行论坛圆桌嘉宾或专题发言席位',
        '6张贵宾（VIP）参会证及B2B会客区优先预约权',
        '全场电子徽章、实体证件及会刊核心位置品牌展示'
      ],
      ckb: [
        'سپۆنسەری سەرەکی یەکێک لە ١١ کەرتە پیشاندراوەکە',
        'پاڤلیۆنی پێشکەوتووی ٣٦ مەتری چوارگۆشە',
        'بەشداری وەک وتاربێژ لە کۆبوونەوەی تایبەتی کەرتەکەدا',
        '٦ کارتی VIP و دەستڕاگەیشتن بە هۆڵی B2B',
        'دانانی لۆگۆ لەسەر کارتی بەشداربووان و پێگەی فەرمی'
      ]
    }
  },
  {
    id: 'silver',
    name: {
      en: 'Silver Track Sponsor',
      ar: 'الراعي الفضي للمسار',
      zh: '白银专题赞助商',
      ckb: 'سپۆنسەری زیوی تەوەر'
    },
    fee: '$30,000 / ¥210,000',
    boothSize: '18 sqm Premium Booth',
    vipPasses: 4,
    keynoteSlot: false,
    mouSigningStage: false,
    benefits: {
      en: [
        '18 sqm Premium furnished booth in designated sector',
        'Branding on B2B Matchmaking Portal & Mobile Guide',
        '4 Delegate passes with full expo and gala access',
        'Inclusion in official summit catalog distributed to all buyers'
      ],
      ar: [
        'جناح فاخر مجهز بمساحة ١٨ متراً مربعاً في القطاع المحدد',
        'إبراز العلامة التجارية على بوابة التوفيق التجاري والدليل الرقمي',
        '٤ بطاقات حضور للمؤتمر والمعرض وحفل العشاء الرسمي',
        'إدراج الشركة في دليل القمة الرسمي الموزع على كبار المستوردين'
      ],
      zh: [
        '指定产业展区18平方米精装标准展位',
        'B2B商务配对线上平台及官方移动端会务系统品牌呈现',
        '4张标准全通参会证及欢迎晚宴入场席位',
        '官方中伊双语《峰会采购商名录与企业黄页》重点收录'
      ],
      ckb: [
        'پاڤلیۆنی ئامادەکراوی ١٨ مەتری لە کەرتی دیاریکراودا',
        'دانانی براند لەسەر پۆرتاڵی B2B و ڕێبەری دیجیتاڵی',
        '٤ کارتی بەشداریکردن و شایستەی بەشداری لە ئاهەنگی فەرمی',
        'تۆمارکردنی ناوی کۆمپانیا لە ڕێبەری فەرمی لووتکە'
      ]
    }
  },
  {
    id: 'bronze',
    name: {
      en: 'Bronze Expo Exhibitor',
      ar: 'العارض البرونزي في المعرض',
      zh: '青铜标准参展商',
      ckb: 'بەشداربووی برۆنزی پێشانگا'
    },
    fee: '$12,000 / ¥84,000',
    boothSize: '9 sqm Standard Shell Scheme',
    vipPasses: 2,
    keynoteSlot: false,
    mouSigningStage: false,
    benefits: {
      en: [
        '9 sqm Standard shell scheme booth (fascia, table, spotlights)',
        '2 Exhibitor passes with B2B lounge access',
        'Listing on online directory and sector catalog',
        'On-site translation assistance voucher'
      ],
      ar: [
        'مساحة عرض قياسية ٩ أمتار مربعة مجهزة بالكامل (لوحة الاسم، إضاءة، أثاث)',
        'بطاقتان للعارضين مع إمكانية دخول صالة التوفيق التجاري',
        'إدراج بيانات الشركة في الدليل الرقمي للقطاع',
        'قسيمة دعم الترجمة الفورية أثناء المعرض'
      ],
      zh: [
        '9平方米标准展位（含国际标准展板、楣板、洽谈桌椅及射灯）',
        '2张参展商专属证件及B2B洽谈区通用权限',
        '峰会官网中伊企业名录及展商系统检索展示',
        '现场多语种商务翻译协助服务券'
      ],
      ckb: [
        'شوێنی ستانداردی ٩ مەتری (میز، ڕووناکی، تابلۆی ناو)',
        '٢ کارتی بەشداریکردن و دەستڕاگەیشتن بە هۆڵی B2B',
        'تۆمارکردن لە پێڕستی ئۆنلاین و ڕێبەری کەرت',
        'خزمەتگوزاری وەرگێڕانی بازرگانی'
      ]
    }
  }
];

export const SUMMIT_FAQS = [
  {
    q: {
      en: 'What is the Iraq-China Economic Summit & Bilateral Expo?',
      ar: 'ما هي القمة الاقتصادية العراقية-الصينية والمعرض الثنائي في السليمانية؟',
      zh: '什么是“伊拉克-中国经济峰会暨双边博览会”？',
      ckb: 'لووتکەی ئابووری عێراق-چین و پێشانگای دوولایەنە لە سلێمانی چییە؟'
    },
    a: {
      en: 'It is the premier sovereign and commercial bilateral platform bringing together Iraqi ministries, Kurdish regional authorities, and Chinese state & private enterprises across 11 key industry sectors, backed by the knowledge partnership of the Chinese Institute for Strategic and Economic Studies.',
      ar: 'هي المنصة الثنائية السيادية والتجارية الأبرز التي تجمع الوزارات العراقية، سلطات إقليم كوردستان، والمؤسسات الصينية الحكومية والخاصة عبر ١١ قطاعاً صناعياً استراتيجياً، بشراكة معرفية مع المعهد الصيني للدراسات الاستراتيجية والاقتصادية.',
      zh: '该峰会是中伊两国最高级别的双边经贸与投资综合对接平台，全面覆盖11大重点产业，由中国战略与经济研究院深度提供智库与智力支持，协同两国中央部委及省区政府共同主办。',
      ckb: 'بەرچاوترین پلاتفۆرمی دوولایەنەی نێوان عێراق و چینە کە وەزارەتەکانی عێراق، حکومەتی هەرێم و کۆمپانیا چینییەکان لە ١١ کەرتی جیاوازدا کۆدەکاتەوە.'
    }
  },
  {
    q: {
      en: 'Why is Sulaymaniyah selected as the host city?',
      ar: 'لماذا تم اختيار مدينة السليمانية لاستضافة القمة والمعرض؟',
      zh: '为什么选择在苏莱曼尼亚举办峰会与博览会？',
      ckb: 'بۆچی شاری سلێمانی بۆ بەڕێوەچوونی لووتکەکە هەڵبژێردراوە؟'
    },
    a: {
      en: 'Sulaymaniyah is Iraq’s strategic gateway on the Silk Road, holding the milestone Sister-City Agreement with Yiwu (China), hosting modern international logistics dry ports, high security stability, and strong industrial integration.',
      ar: 'تعتبر السليمانية بوابة العراق الاستراتيجية على طريق الحرير، وترتبط باتفاقية توأمة تاريخية مع مدينة ييوو الصينية، وتمتلك موانئ جافة حديثة، استقراراً أمنياً نموذجياً، وقاعدة صناعية متقدمة.',
      zh: '苏莱曼尼亚是伊拉克连接丝绸之路经济带的重要枢纽，与中国著名商贸之都义乌缔结了友好省市协议，拥有完善的保税陆港、安全稳定的营商环境及成熟的工业集群。',
      ckb: 'سلێمانی دەروازەی ستراتیژی عێراقە لەسەر ڕێگای ئاوریشم، ڕێککەوتنی دەستەخوشکی لەگەڵ شاری ییوو هەیە و خاوەنی سەقامگیری و ژێرخانی بازرگانی بەهێزە.'
    }
  },
  {
    q: {
      en: 'How does the Chinese Institute support summit participants?',
      ar: 'كيف يدعم المعهد الصيني للدراسات الاستراتيجية المشاركين في القمة؟',
      zh: '中国战略与经济研究院如何为参会企业提供赋能？',
      ckb: 'پەیمانگای چین چۆن یارمەتی بەشداربووانی لووتکە دەدات؟'
    },
    a: {
      en: 'The Institute acts as Knowledge Partner, publishing pre-summit Sector Opportunity Briefs, curating bankable project registries, moderating policy sessions, and providing on-site economic data via its embedded Data Hub widgets.',
      ar: 'يعمل المعهد كشريك معرفي رسمي، حيث ينشر تقارير الفرص القطاعية، يدقق مشاريع الاستثمار، يدير الجلسات السيادية، ويوفر تحليلات البيانات الحية عبر مركز البيانات الرقمي.',
      zh: '研究院作为峰会官方知识合作伙伴，在会前发布11大产业深度投资简报，在会中主导宏观论坛与项目数据透视，并为参会企业提供项目可行性尽调与双边法务咨询。',
      ckb: 'پەیمانگا وەک هاوبەشی زانستی کار دەکات لە ڕێگەی بڵاوکردنەوەی توێژینەوەی کەرتەکان، بەڕێوەبردنی دانیشتنەکان و دابینکردنی داتای بازرگانی.'
    }
  },
  {
    q: {
      en: 'Can Iraqi enterprises settle deals in Iraqi Dinars (IQD) and Chinese Yuan (RMB)?',
      ar: 'هل يمكن للشركات العراقية إتمام الصفقات بالدينار العراقي واليوان الصيني؟',
      zh: '伊拉克企业是否可以在现场以第纳尔（IQD）或人民币（RMB）直接结算？',
      ckb: 'ئایا کۆمپانیا عێراقییەکان دەتوانن مامەڵەکان بە دینار و یوان یەکلا بکەنەوە؟'
    },
    a: {
      en: 'Yes. ICA operates the Bilateral Direct Clearing Desk on-site in partnership with the Central Bank of Iraq and Chinese clearing banks, enabling direct IQD/e-CNY execution without dollar conversion drag.',
      ar: 'نعم، تدير وكالة ICA مكتب التسويات المالية المباشر في مقر القمة بالشراكة مع البنك المركزي والمصارف المعتمدة لتنفيذ الحوالات بالدينار واليوان دون الحاجة للدولار.',
      zh: '完全可以。ICA在峰会现场设立“双边本币结算专区”，联合伊拉克中央银行与中国清算行，支持直接开立人民币信用证及第纳尔/数字人民币直接结算，规避第三方汇兑损耗。',
      ckb: 'بەڵێ، دەزگای ICA ئۆفیسی تایبەتی پاکتاوی دارایی لە شوێنی لووتکە داناوە بۆ ئاڵوگۆڕی ڕاستەوخۆی دینار و یوان بەبێ پێویستی بە دۆلار.'
    }
  }
];

export const SPONSORSHIP_TIERS = SUMMIT_SPONSOR_TIERS;

