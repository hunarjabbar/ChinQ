import { LocalizedString } from './portals';
import { StyleOverrides } from './controlModel';

export type CanonicalSectionType =
  | 'hero'
  | 'live-broadcast'
  | 'ticker'
  | 'stats-strip'
  | 'world-stories'
  | 'trending'
  | 'strategic-initiatives'
  | 'featured-publications'
  | 'data-snapshot'
  | 'expert-spotlight'
  | 'media-preview'
  | 'upcoming-events'
  | 'partners-marquee'
  | 'newsletter-signup'
  | 'app-download-pwa';

export interface SectionTypeDefinition {
  type: CanonicalSectionType;
  name: LocalizedString;
  description: LocalizedString;
  category: 'header-hero' | 'intelligence-news' | 'strategy-initiatives' | 'media-events' | 'institutional-conversion';
  icon: string; // Lucide icon name
  defaultConfig: Record<string, any>;
  defaultItemsCount: number;
}

export const CANONICAL_SECTION_REGISTRY: Record<CanonicalSectionType, SectionTypeDefinition> = {
  'hero': {
    type: 'hero',
    name: {
      en: 'Hero Section',
      ar: 'قسم الواجهة الرئيسية',
      zh: '首屏核心聚焦区',
      ckb: 'بەشی پێشەکی سەرەکی'
    },
    description: {
      en: 'Primary diplomatic brand anchor with dual high-impact call to action, strategic video backdrop, and sovereign dispatches.',
      ar: 'المرتكز الدبلوماسي والسيادي الرئيسي مع أزرار الإجراءات وشارات التغطية.',
      zh: '国家级双边经贸走廊官方形象展示区与首屏主权行动指引。',
      ckb: 'دەروازەی سەرەکی براندی دیپلۆماسی و دەستپێشخەرییە ستراتیژییەکان.'
    },
    category: 'header-hero',
    icon: 'Sparkles',
    defaultConfig: {
      alignment: 'center',
      showBadges: true,
      autoplayVideo: false,
      enableBackdropBlur: true
    },
    defaultItemsCount: 1
  },
  'live-broadcast': {
    type: 'live-broadcast',
    name: {
      en: 'Live Broadcast Band',
      ar: 'شريط البث المباشر والندوات',
      zh: '全天候双边直播带宽',
      ckb: 'شریتی پەخشی ڕاستەوخۆ'
    },
    description: {
      en: 'Real-time bilateral stream announcement, live conference indicator, and transmission schedule.',
      ar: 'تنبيه البث التلفزيوني الحي المباشر ومواعيد الندوات والقمم الثنائية.',
      zh: '24小时视讯直播通道状态、正在直播标识与即时推流接入。',
      ckb: 'ئاگادارکردنەوەی پەخشی ڕاستەوخۆ و بەرنامەی گواستنەوەی ڕووداوەکان.'
    },
    category: 'header-hero',
    icon: 'Radio',
    defaultConfig: {
      pulseAnimation: true,
      channel: 'main-transmission',
      showViewersCount: true
    },
    defaultItemsCount: 1
  },
  'ticker': {
    type: 'ticker',
    name: {
      en: 'Intelligence Wire Ticker',
      ar: 'شريط برقيات الاستخبارات الاقتصادية',
      zh: '双边经贸即时电讯快报',
      ckb: 'شریتی تێلیگرافی ئابووری'
    },
    description: {
      en: 'High-speed scrolling financial indices, official diplomatic dispatches, and Al Faw port movements.',
      ar: 'شريط سريع لمؤشرات أسعار الصرف، برقيات الموانئ، والبيانات الرسمية.',
      zh: '滚动显示人民币与第纳尔汇率、大宗商品指数与高层外事快讯。',
      ckb: 'جووڵەی خێرای داتای بازاڕ، نرخی دراو و هەواڵە بەپەلەکان.'
    },
    category: 'header-hero',
    icon: 'Activity',
    defaultConfig: {
      speedSec: 25,
      pauseOnHover: true,
      borderTop: true
    },
    defaultItemsCount: 4
  },
  'stats-strip': {
    type: 'stats-strip',
    name: {
      en: 'Quick Stats Strip',
      ar: 'شريط المؤشرات الكمية السريعة',
      zh: '关键双边核心数据指标',
      ckb: 'شریتی ئامارە خێراکان'
    },
    description: {
      en: '4-stat high-contrast metrics strip displaying bilateral trade volume, clearing metrics, and active initiatives.',
      ar: 'أرقام كمية بارزة تبرز حجم التبادل التجاري، عمليات المقاصة، والمشاريع الاستراتيجية.',
      zh: '四位一体战略指标条：双边贸易总额、直接清算规模与中伊重点项目数。',
      ckb: 'چوار ئاماری سەرەکی قەبارەی بازرگانی و پڕۆژە هاوبەشەکان.'
    },
    category: 'header-hero',
    icon: 'BarChart3',
    defaultConfig: {
      columns: 4,
      accentColor: '#CC0000',
      showGlow: true
    },
    defaultItemsCount: 4
  },
  'world-stories': {
    type: 'world-stories',
    name: {
      en: 'World Stories Section',
      ar: 'قسم التقارير والتحليلات الدولية',
      zh: '全球战略视野与深度专稿',
      ckb: 'ڕاپۆرتە جیهانی و ستراتیژییەکان'
    },
    description: {
      en: 'In-depth geopolitical journalism, multipolar alliance studies, and energy corridor briefs.',
      ar: 'تحقيقات صحفية جيوسياسية وتحليلات مسارات الطاقة والتجارة متعددة الأقطاب.',
      zh: '涵盖一带一路沿线、海合会走廊及全球经贸格局变迁的权威分析。',
      ckb: 'شیکردنەوەی جیۆپۆلەتیکی و ڕێڕەوەکانی وزە و بازرگانی جیهانی.'
    },
    category: 'intelligence-news',
    icon: 'Globe',
    defaultConfig: {
      gridCols: 3,
      showTags: true,
      cardVariant: 'editorial'
    },
    defaultItemsCount: 3
  },
  'trending': {
    type: 'trending',
    name: {
      en: 'Trending Section',
      ar: 'قسم الأكثر قراءة وتداولاً',
      zh: '高关注度热门议题排行榜',
      ckb: 'باوترین بابەتەکان'
    },
    description: {
      en: 'Ranked list of widely circulated policy papers, bilateral decrees, and market announcements.',
      ar: 'قائمة مرتبة للمقالات والتقارير الأكثر تداولاً بين الدبلوماسيين ورجال الأعمال.',
      zh: '政经观察家与跨国企业高管实时关注与转发的焦点新闻排行榜。',
      ckb: 'ڕیزبەندی ئەو بابەتانەی زۆرترین خوێنەریان هەبووە.'
    },
    category: 'intelligence-news',
    icon: 'TrendingUp',
    defaultConfig: {
      numbered: true,
      maxItems: 5,
      compact: false
    },
    defaultItemsCount: 5
  },
  'strategic-initiatives': {
    type: 'strategic-initiatives',
    name: {
      en: 'Strategic Initiatives Section',
      ar: 'قسم المبادرات الثنائية الثماني',
      zh: '八大主权旗舰战略举措',
      ckb: 'دەستپێشخەرییە ستراتیژییەکان'
    },
    description: {
      en: 'Showcases CISE 8 sovereign flagships: Bilateral Summit, Settlement Gateway, Visa Centre, Insurance, etc.',
      ar: 'عرض المبادرات الثمانية: القمة الثنائية، بوابة المقاصة، مركز التأشيرات، التأمين السيادي.',
      zh: '集中呈现伊中峰会、本币双向清算、签证服务中心、中信保专项等8大主权举措。',
      ckb: 'پێشکەشکردنی هەشت دەستپێشخەرییە سەرەکییەکەی پەیمانگای CISE.'
    },
    category: 'strategy-initiatives',
    icon: 'Layers',
    defaultConfig: {
      layout: 'grid-3x3',
      showBadges: true,
      highlightClearance: true
    },
    defaultItemsCount: 6
  },
  'featured-publications': {
    type: 'featured-publications',
    name: {
      en: 'Featured Publications',
      ar: 'الدراسات والبحوث الاستراتيجية المحكمة',
      zh: '智库权威学术著作与深度报告',
      ckb: 'توێژینەوە و بڵاوکراوە نایابەکان'
    },
    description: {
      en: 'Peer-reviewed CISE policy dossiers, Al Faw corridor blueprints, and bilateral currency manuals.',
      ar: 'أوراق السياسات المحكمة ومخططات طريق التنمية والأدلة الإرشادية للتسويات.',
      zh: '中伊战略研究所出品的同行评审智库报告、走廊技术规程与政策汇编。',
      ckb: 'بڵاوکراوە و توێژینەوەی ئەکادیمی باوەڕپێکراوی پەیمانگا.'
    },
    category: 'strategy-initiatives',
    icon: 'BookOpen',
    defaultConfig: {
      showDownloadCta: true,
      showIsbnBadge: true,
      layout: 'carousel-or-grid'
    },
    defaultItemsCount: 3
  },
  'data-snapshot': {
    type: 'data-snapshot',
    name: {
      en: 'Data Snapshot',
      ar: 'مرصد البيانات الاقتصادية والمشاريع',
      zh: '经贸大数据与重点工程全景看板',
      ckb: 'داتای ئابووری و چاودێری پڕۆژەکان'
    },
    description: {
      en: 'Real-time charts, IQD/RMB volume graphs, and Al Faw construction progress telemetry.',
      ar: 'رسوم بيانية ومؤشرات آنية لحجم التداولات ومعدلات إنجاز المشاريع الكبرى.',
      zh: '包含汇率折线图、双边月度清算量柱状图与重点基建推进时间轴。',
      ckb: 'هێڵکارییە داتاییەکان و چاودێری وردی پڕۆژە ژێرخانییەکان.'
    },
    category: 'strategy-initiatives',
    icon: 'LineChart',
    defaultConfig: {
      chartType: 'combined',
      liveSyncSec: 60,
      currencyPair: 'IQD/RMB'
    },
    defaultItemsCount: 2
  },
  'expert-spotlight': {
    type: 'expert-spotlight',
    name: {
      en: 'Expert Spotlight',
      ar: 'نخبة الخبراء والزملاء الأكاديميين',
      zh: '双边顶尖专家与学术导师智库',
      ckb: 'پسپۆڕان و توێژەرانی باڵا'
    },
    description: {
      en: 'Profiles of accredited economists, plenipotentiary advisors, and senior engineering fellows.',
      ar: 'سير ذاتية ونبذة عن الخبراء الاقتصاديين والمستشارين الدبلوماسيين المعتمدين.',
      zh: '展示获得双边主权资质认证的资深宏观经济学家、法学顾问与总工程师。',
      ckb: 'ناساندنی کەسایەتییە ئەکادیمی و پسپۆڕە نێودەوڵەتییەکان.'
    },
    category: 'strategy-initiatives',
    icon: 'Users',
    defaultConfig: {
      showClearanceBadge: true,
      showContactModal: true
    },
    defaultItemsCount: 3
  },
  'media-preview': {
    type: 'media-preview',
    name: {
      en: 'Media Preview',
      ar: 'معاينة الإنتاج المرئي والوثائقيات',
      zh: '融媒体视听与纪录片专区',
      ckb: 'میدیای بینراو و دۆکیۆمێنتاری'
    },
    description: {
      en: 'Curated 4K documentary reels, bilateral cultural trailers, and leadership interview video tiles.',
      ar: 'عروض فيديو وثائقية عالية الدقة ومقتطفات اللقاءات الحصرية مع صناع القرار.',
      zh: '精选中伊联合摄制4K纪录片先导片、高端访谈实录与双向文化专题展播。',
      ckb: 'کلیپە دۆکیۆمێنتارییەکان و چاوپێکەوتنە تایبەتەکان.'
    },
    category: 'media-events',
    icon: 'Film',
    defaultConfig: {
      showVideoModal: true,
      aspectRatio: '16:9'
    },
    defaultItemsCount: 3
  },
  'upcoming-events': {
    type: 'upcoming-events',
    name: {
      en: 'Upcoming Events',
      ar: 'الأجندة والفعاليات الثنائية القادمة',
      zh: '近期重要双边经贸活动与论坛',
      ckb: 'ڕووداو و کۆڕبەندە داهاتووەکان'
    },
    description: {
      en: 'Chronological calendar of bilateral summits, trade expositions, and ministerial delegatory meetings.',
      ar: 'تقويم زمني للقمم الثنائية، المعارض الصناعية، واجتماعات الوفود الوزارية.',
      zh: '按时间轴罗列的双边年度峰会、产业对接展、投资路演与高官互访日程。',
      ckb: 'خشتەی کۆنفرانس و دیدارە بارزگانییەکان بەپێی بەروار.'
    },
    category: 'media-events',
    icon: 'Calendar',
    defaultConfig: {
      allowIcsExport: true,
      showRsvpCta: true
    },
    defaultItemsCount: 3
  },
  'partners-marquee': {
    type: 'partners-marquee',
    name: {
      en: 'Strategic Partners Marquee',
      ar: 'شريط الشركاء الاستراتيجيين',
      zh: '战略合作伙伴主权机构方阵',
      ckb: 'هاوبەشە ستراتیژییە باوەڕپێکراوەکان'
    },
    description: {
      en: 'Smooth continuous scroll of state ministries, state-owned enterprises (CSCEC, CNOOC, Sinopec), and banks.',
      ar: 'عرض متحرك متواصل لشعارات الوزارات والهيئات والشركات الصينية والعراقية الكبرى.',
      zh: '无缝平滑滚动的伊中重点央企集团、部委机构与多边金融联合体标志矩阵。',
      ckb: 'شریتی جووڵاوی لۆگۆی کۆمپانیا و وەزارەتە پەیوەندیدارەکان.'
    },
    category: 'institutional-conversion',
    icon: 'Building2',
    defaultConfig: {
      grayscaleHover: true,
      marqueeSpeed: 30,
      direction: 'left'
    },
    defaultItemsCount: 8
  },
  'newsletter-signup': {
    type: 'newsletter-signup',
    name: {
      en: 'Newsletter Intelligence Signup',
      ar: 'الاشتراك بالنشرة البريدية الاستخبارية',
      zh: '主权经贸内参订阅专区',
      ckb: 'بەشداری لە نامەی هەواڵی ئابووری'
    },
    description: {
      en: 'Diplomatic telegraph intake collecting verified enterprise and ministry subscriptions for daily wires.',
      ar: 'نافذة اشتراك آمنة لحاملي الحقائب الدبلوماسية والتنفيذية لتلقي البرقيات اليومية.',
      zh: '面向跨国企业高管、使领馆及投资机构提供每日双边机要内参直发直通通道。',
      ckb: 'فۆرمی بەشداری فەرمی لە هەواڵنامەی ڕۆژانەی دیپلۆماسی.'
    },
    category: 'institutional-conversion',
    icon: 'Mail',
    defaultConfig: {
      showFrequencySelector: true,
      collectEntityName: true
    },
    defaultItemsCount: 1
  },
  'app-download-pwa': {
    type: 'app-download-pwa',
    name: {
      en: 'Download App PWA Promo Card',
      ar: 'بطاقة تثبيت تطبيق PWA والوصول المشفر',
      zh: '渐进式网页应用(PWA)离线端与移动安装',
      ckb: 'کارتی دابەزاندنی ئەپی مۆبایل PWA'
    },
    description: {
      en: 'Promotional module prompting zero-install cryptographic offline PWA deployment to iOS/Android.',
      ar: 'بطاقة ترويجية لتثبيت التطبيق على الهواتف مع دعم المزامنة المشفرة بدون إنترنت.',
      zh: '具备硬件级离线缓存、指纹解锁与主权离线加密通讯的PWA移动客户端直通卡。',
      ckb: 'کارتی ناساندنی ئەپی پێشکەوتووی PWA بە سیستەمی پارێزراو.'
    },
    category: 'institutional-conversion',
    icon: 'Smartphone',
    defaultConfig: {
      showQrCode: true,
      enableBiometricNotice: true
    },
    defaultItemsCount: 1
  }
};

// ================= PRISMA ADAPTER INTERFACES =================

export interface PageModel {
  id: string;
  slug: string;
  path: string;
  title: LocalizedString;
  description?: LocalizedString;
  pillar: string;
  sections?: PageSectionModel[];
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface PageSectionModel {
  id: string;
  pageId: string;
  page?: PageModel;
  type: CanonicalSectionType | string;
  name: string;
  displayOrder: number;
  visibility: 'visible' | 'hidden' | 'scheduled';
  scheduleFrom?: string | null;
  scheduleTo?: string | null;
  styleOverride?: StyleOverrides;
  localeOverride?: Partial<LocalizedString>;
  config?: Record<string, any>;
  items?: SectionItemModel[];
  revisions?: SectionRevisionModel[];
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface SectionItemModel {
  id: string;
  sectionId: string;
  title: LocalizedString;
  subtitle?: LocalizedString;
  body?: LocalizedString;
  image?: string;
  imageAlt?: LocalizedString;
  ctaLabel?: LocalizedString;
  ctaHref?: string;
  icon?: string;
  metadata?: Record<string, any>;
  displayOrder: number;
  visibility: 'visible' | 'hidden';
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface SectionTemplateModel {
  id: string;
  slug: string;
  type: CanonicalSectionType | string;
  name: LocalizedString;
  description: LocalizedString;
  defaultConfig: Record<string, any>;
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface SectionRevisionModel {
  id: string;
  sectionId: string;
  snapshot: any;
  actorId: string;
  action: 'create' | 'update' | 'reorder' | 'visibility' | 'rollback' | 'delete';
  timestamp: string;
}

export function safeJsonParse<T>(val: any, fallback: T): T {
  if (!val) return fallback;
  if (typeof val === 'object') return val as T;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

export function getLocalizedText(
  field: string | LocalizedString | undefined | null,
  lang: string = 'en',
  fallback: string = ''
): string {
  if (!field) return fallback;
  if (typeof field === 'string') {
    if (field.trim().startsWith('{') && field.trim().endsWith('}')) {
      try {
        const obj = JSON.parse(field);
        return obj[lang] || obj['en'] || obj['ar'] || obj['zh'] || obj['ckb'] || fallback;
      } catch {
        return field;
      }
    }
    return field;
  }
  const typedField = field as Record<string, string>;
  return typedField[lang] || typedField['en'] || typedField['ar'] || typedField['zh'] || typedField['ckb'] || fallback;
}
