import { create } from 'zustand';
import { 
  AdminControlledSection, 
  AdminControlledCard, 
  CustomizationModel, 
  StyleOverrides, 
  VisibilityState,
  HistoryRevision 
} from '../types/controlModel';
import { Locale } from '../types';

export interface SectionControlState {
  sections: Record<string, AdminControlledSection>;
  activeFilter: 'all' | 'active' | 'draft' | 'archived';
  isLoading: boolean;
  
  // Section-level controls
  updateSectionCustomization: (sectionId: string, customization: Partial<CustomizationModel>) => void;
  toggleSectionVisibility: (sectionId: string) => void;
  
  // Card/Entity CRUD
  addCard: (sectionId: string, card: Omit<AdminControlledCard, 'id' | 'createdAt' | 'updatedAt' | 'history'>) => Promise<AdminControlledCard>;
  updateCard: (sectionId: string, cardId: string, updates: Partial<AdminControlledCard>) => Promise<AdminControlledCard | null>;
  duplicateCard: (sectionId: string, cardId: string) => Promise<AdminControlledCard | null>;
  softDeleteCard: (sectionId: string, cardId: string) => Promise<boolean>;
  restoreCard: (sectionId: string, cardId: string) => Promise<boolean>;
  permanentDeleteCard: (sectionId: string, cardId: string) => Promise<boolean>;
  reorderCard: (sectionId: string, cardId: string, direction: 'up' | 'down') => void;
  
  // Bulk Actions
  bulkUpdateStatus: (sectionId: string, cardIds: string[], status: 'active' | 'draft' | 'archived') => void;
  bulkUpdateVisibility: (sectionId: string, cardIds: string[], visibility: VisibilityState) => void;
  
  // Restyle & Style Overrides
  updateCardStyleOverrides: (sectionId: string, cardId: string, styles: StyleOverrides) => void;
  
  // Sync
  syncWithServer: () => Promise<void>;
}

// Initial seed data for all 15 public homepage sections, Secretariat, Newsroom, Live, and Cultural Exchange
const DEFAULT_STYLE_OVERRIDES: StyleOverrides = {
  backgroundColor: null,
  textColor: null,
  borderColor: null,
  borderRadius: '16px',
  padding: '16px',
  margin: '0px',
  shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
};

const INITIAL_SECTIONS: Record<string, AdminControlledSection> = {
  // 1. Hero Section
  'public-hero': {
    id: 'public-hero',
    portal: 'public',
    slug: 'hero',
    name: { en: 'Hero Section', ar: 'قسم البانر الرئيسي', zh: '主视觉首页大图', ckb: 'بەشی سەرەکی هێرۆ' },
    description: { en: 'Primary sovereign diplomatic headline, hero imagery, and dual action CTAs.', ar: 'العنوان الدبلوماسي والرسائل الإستراتيجية.', zh: '主权外交主标、核心视觉与双向行动按钮。', ckb: 'سەردێڕی سەرەکی دیپلۆماسی و دوگمەکانی کردار.' },
    customization: {
      displayOrder: 1,
      visibility: 'visible',
      styleOverrides: { ...DEFAULT_STYLE_OVERRIDES, backgroundColor: '#7f1d1d' },
      variant: 'hero-banner'
    },
    status: 'active',
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'hero-card-1',
        sectionId: 'public-hero',
        eyebrow: { en: 'OFFICIAL BILATERAL DIPLOMATIC EMBASSY WIRE', ar: 'البرقية الدبلوماسية الرسمية الثنائية', zh: '官方双边外交通讯社专线', ckb: 'بروسکەی فەرمی دیپلۆماسی دوولایەنە' },
        headline: { en: 'Sino-Iraqi Sovereign Partnership & Strategic Gateway', ar: 'الشراكة السيادية العراقية الصينية والبوابة الاستراتيجية', zh: '中伊战略伙伴关系与主权经贸发展中枢', ckb: 'هاوبەشی سەروەری عێراقی-چینی و دەروازەی ستراتیژی' },
        body: { en: 'Direct sovereign intelligence, economic integration rails, and cultural exchange bridges between the Republic of Iraq and the People\'s Republic of China.', ar: 'المعلومات الاستخباراتية السيادية المباشرة، وقنوات التكامل الاقتصادي، وجسور التبادل الثقافي.', zh: '连接伊拉克共和国与中华人民共和国的主权战略情报、本币清算通道与人文交流纽带。', ckb: 'زانیارییە ستراتیژییەکان، کەناڵەکانی دارایی و پەیوەندییە کەلتوورییەکان.' },
        ctaLabel: { en: 'Explore Initiatives', ar: 'استكشف المبادرات', zh: '探索重点项目', ckb: 'منداڵدانی دەستپێشخەرییەکان' },
        ctaHref: '/initiatives',
        imageUrl: '/images/hero-diplomatic.jpg',
        customization: { displayOrder: 1, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES }, variant: 'hero' },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  },

  // 2. Live Broadcast Band
  'public-live-broadcast': {
    id: 'public-live-broadcast',
    portal: 'public',
    slug: 'live-broadcast',
    name: { en: 'Live Broadcast Band', ar: 'شريط البث الحي المباشر', zh: '实时双语直播条', ckb: 'هێڵی پەخشی ڕاستەوخۆ' },
    customization: { displayOrder: 2, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES }, variant: 'live-band' },
    status: 'active',
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'live-band-1',
        sectionId: 'public-live-broadcast',
        headline: { en: 'ON AIR: Baghdad-Beijing Diplomatic Chamber Forum 2026', ar: 'بث حي: منتدى الغرفة الدبلوماسية بغداد-بكين 2026', zh: '正在直播：2026巴格达-北京双边外交与投资论坛', ckb: 'پەخشی ڕاستەوخۆ: کۆڕبەندی بەغدا-پەکین ٢٠٢٦' },
        body: { en: 'Simultaneous 4K low-latency broadcast in Arabic, Mandarin, English, and Kurdish.', ar: 'بث متزامن فائق الدقة بـ 4 لغات.', zh: '阿拉伯语、中文、英语、库尔德语四语同传直播。', ckb: 'پەخشی هاوکاتی چوار زمانە.' },
        ctaLabel: { en: 'Join Broadcast Stream', ar: 'انضم للبث المباشر', zh: '进入直播大厅', ckb: 'بچۆ ژووری پەخش' },
        ctaHref: '/live',
        customization: { displayOrder: 1, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  },

  // 3. Intelligence Wire Ticker
  'public-intelligence-wire': {
    id: 'public-intelligence-wire',
    portal: 'public',
    slug: 'intelligence-wire',
    name: { en: 'Intelligence Wire Ticker', ar: 'شريط برقيات الأخبار العاجلة', zh: '即时战略情报滚轮', ckb: 'هێڵی هەواڵە بەپەلەکان' },
    customization: { displayOrder: 3, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES }, variant: 'ticker' },
    status: 'active',
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'wire-item-1',
        sectionId: 'public-intelligence-wire',
        headline: { en: 'Grand Faw Port Rail Link: Civil engineering phase signed in Beijing', ar: 'ميناء الفاو الكبير: توقيع عقود الهندسة المدنية في بكين', zh: '大阿福港铁路联运线：土建工程协议在京正式签署', ckb: 'هێڵی شەمەندەفەری بەندەری فاو: واژۆکردنی گرێبەست لە پەکین' },
        body: { en: 'Development Road bilateral coordination committee approves Stage 2 funding tranche.', ar: 'لجنة التنسيق الثنائية توافق على حزمة التمويل الثانية.', zh: '发展之路双边协调委员会正式批准二期出资计划。', ckb: 'پەسەندکردنی قۆناغی دووەمی دارایی ڕێگای گەشەپێدان.' },
        ctaHref: '/newsroom/grand-faw-phase-2',
        customization: { displayOrder: 1, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'wire-item-2',
        sectionId: 'public-intelligence-wire',
        headline: { en: 'mBridge Liquidity Pool: Central Bank of Iraq settles first digital Yuan trade', ar: 'منصة mBridge: البنك المركزي العراقي يسوي أول صفقة تجارية باليوان الرقمي', zh: 'mBridge流动性池：伊拉克央行完成首单数字人民币大宗跨境结算', ckb: 'بانکی ناوەندی عێراق یەکەم مامەڵەی بە یوانی دیجیتاڵی ئەنجامدا' },
        body: { en: 'Total batch volume surpasses 850 million RMB equivalent without SWIFT intermediary.', ar: 'حجم الصفقة تجاوز 850 مليون يوان صيني بدون وسيط سويفت.', zh: '结算规模折合逾8.5亿元人民币，完全脱离传统SWIFT中介通道。', ckb: 'قەبارەی مامەڵەکە ٨٥٠ ملیۆن یوانی چینی تێپەڕاند.' },
        ctaHref: '/settlement',
        customization: { displayOrder: 2, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  },

  // 4. Quick Stats Strip
  'public-quick-stats': {
    id: 'public-quick-stats',
    portal: 'public',
    slug: 'quick-stats',
    name: { en: 'Quick Stats Strip', ar: 'شريط المؤشرات الرقمية السريعة', zh: '双边核心经贸指标', ckb: 'ئامارە خێراکان' },
    customization: { displayOrder: 4, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES }, variant: 'metrics-strip' },
    status: 'active',
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'stat-1',
        sectionId: 'public-quick-stats',
        headline: { en: '$53.2B', ar: '53.2 مليار دولار', zh: '532亿美元', ckb: '٥٣.٢ ملیار دۆلار' },
        body: { en: 'Annual Bilateral Trade Volume (2025-2026)', ar: 'حجم التبادل التجاري السنوي الثنائي', zh: '2025-2026年双边年贸易总额', ckb: 'قەبارەی ئاڵوگۆڕی بازرگانی ساڵانە' },
        customization: { displayOrder: 1, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'stat-2',
        sectionId: 'public-quick-stats',
        headline: { en: '1,480+', ar: '1,480+ مشروع', zh: '1480+项', ckb: '١٤٨٠+ پڕۆژە' },
        body: { en: 'Active Joint Infrastructure Dossiers', ar: 'ملفات مشاريع البنية التحتية المشتركة', zh: '中伊共建一带一路落地基建项目', ckb: 'پڕۆژە هاوبەشەکانی ژێرخان' },
        customization: { displayOrder: 2, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'stat-3',
        sectionId: 'public-quick-stats',
        headline: { en: '100% Zero-Tariff', ar: '100% تصفير جمركي', zh: '100%零关税通道', ckb: '١٠٠٪ بێ باجی گومرگی' },
        body: { en: 'Diplomatic Commercial Cargo Corridor', ar: 'ممر الشحن التجاري الدبلوماسي', zh: '特定战略物资外交级绿色通关通道', ckb: 'ڕێڕەوی بارهەڵگری دیپلۆماسی' },
        customization: { displayOrder: 3, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'stat-4',
        sectionId: 'public-quick-stats',
        headline: { en: '4 Languages', ar: '4 لغات رسمية', zh: '4种官方工作语言', ckb: '٤ زمانی فەرمی' },
        body: { en: 'Unified Sovereign Publishing Platform', ar: 'منصة النشر السيادية الموحدة', zh: '统一四语主权战略信息发布矩阵', ckb: 'پلاتفۆرمی یەکگرتووی بڵاوکردنەوە' },
        customization: { displayOrder: 4, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  },

  // 5. World Stories Section
  'public-world': {
    id: 'public-world',
    portal: 'public',
    slug: 'world',
    name: { en: 'World Stories Section', ar: 'قسم الشؤون الدولية والعالمية', zh: '全球战略视野', ckb: 'هەواڵە جیهانییەکان' },
    customization: { displayOrder: 5, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
    status: 'active',
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'world-1',
        sectionId: 'public-world',
        eyebrow: { en: 'GLOBAL MULTIPOLARITY', ar: 'التعددية القطبية الدولية', zh: '全球多极格局', ckb: 'فرەجەمسەری جیهانی' },
        headline: { en: 'Baghdad Host of 2026 West Asia-Eurasia Multilateral Summit', ar: 'بغداد تستضيف قمة غرب آسيا وأوراسيا متعددة الأطراف 2026', zh: '巴格达主办2026西亚-欧亚多边战略发展高峰论坛', ckb: 'بەغدا میوانداری لووتکەی ئۆراسیا دەکات' },
        body: { en: 'Ministers from China, Iraq, and regional partners confirm new economic coordination charters.', ar: 'وزراء من الصين والعراق والشركاء الإقليميين يوقعون مواثيق تنسيق اقتصادي جديدة.', zh: '来自中、伊两国及区域多国外长联合签署新经贸协同框架宪章。', ckb: 'واژۆکردنی پەیماننامەی نوێی ئابووری لە بەغدا.' },
        ctaLabel: { en: 'Read Full Communiqué', ar: 'قراءة البيان الكامل', zh: '阅读联合公报', ckb: 'خوێندنەوەی بەیاننامە' },
        ctaHref: '/newsroom/summit-communique-2026',
        imageUrl: '/images/world-summit.jpg',
        customization: { displayOrder: 1, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  },

  // 6. Strategic Initiatives Section (8 Cards)
  'public-initiatives': {
    id: 'public-initiatives',
    portal: 'public',
    slug: 'initiatives',
    name: { en: 'Strategic Initiatives (8 Pillars)', ar: 'المبادرات الاستراتيجية الثمانية', zh: '八大核心双边战略支柱', ckb: 'هەشت دەستپێشخەرییە ستراتیژییەکە' },
    customization: { displayOrder: 6, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
    status: 'active',
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'init-summit',
        sectionId: 'public-initiatives',
        headline: { en: 'Economic Summit & Bilateral Expo 2026', ar: 'القمة الاقتصادية والمعرض التجاري الثنائي 2026', zh: '2026伊中双边经贸峰会暨投资博览会', ckb: 'لووتکەی ئابووری و پێشانگای ٢٠٢٦' },
        body: { en: 'High-level business-to-business matchmaking pavilion, trade conventions, and investment exhibitions.', ar: 'أكبر ملتقى استثماري ومعرض ثنائي لرجال الأعمال والشركات الحكومية والخاصة.', zh: '高层政商撮合峰会、主权投资展厅及高端产业对洽平台。', ckb: 'کۆڕبەندی بازرگانی و پێشانگای وەبەرهێنان.' },
        ctaHref: '/summit',
        customization: { displayOrder: 1, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'init-settlement',
        sectionId: 'public-initiatives',
        headline: { en: 'Payment Settlement Facilitation (IQD/CNY)', ar: 'تسوية المدفوعات المباشرة (دينار / يوان)', zh: '本币直接清算结算中枢通道 (IQD/RMB)', ckb: 'پاکتاوی دراوەکان (دینار / یوان)' },
        body: { en: 'Dedicated mBridge digital corridor with zero SWIFT sanctions exposure and rapid ledger settlement.', ar: 'مسار مصرفي مستقل لتسوية الحسابات التجارية بين الدينار العراقي واليوان الصيني.', zh: '脱离SWIFT限制，实现中伊双边贸易以第纳尔与数字人民币实时结清。', ckb: 'سیستەمی ڕاستەوخۆی پاکتاوی دارایی دوولایەنە.' },
        ctaHref: '/settlement',
        customization: { displayOrder: 2, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'init-visas',
        sectionId: 'public-initiatives',
        headline: { en: 'Bilateral Visa & Fast-Track Centre', ar: 'مركز التأشيرات الثنائي السريع', zh: '双边经贸公务签证快速服务中心', ckb: 'ناوەندی خێرای ڤیزای دوولایەنە' },
        body: { en: 'Official M-Visa commercial endorsements, biometric appointments, and embassy attestations.', ar: 'إصدار سمات الدخول التجارية الرسمية وتوثيق العقود وتسهيل حركة المستثمرين.', zh: '官方M字商务签证保函签发、生物识别预约与使馆公证加急服务。', ckb: 'خزمەتگوزاری فەرمی پێدانی ڤیزای بازرگانی.' },
        ctaHref: '/institute/services/visa-centre',
        customization: { displayOrder: 3, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'init-cultural',
        sectionId: 'public-initiatives',
        headline: { en: 'Cultural & Academic Exchange Institute', ar: 'معهد التبادل الثقافي والأكاديمي', zh: '人文与高等学术交流研修院', ckb: 'پەیمانگای ئاڵوگۆڕی کەلتووری و ئەکادیمی' },
        body: { en: 'Dual degree fellowships, Confucius curricula, language certifications, and cultural delegation summits.', ar: 'منح دراسية عليا، مراكز تعليم اللغة الصينية والعربية، ووفود ثقافية متبادلة.', zh: '双学位联合奖学金、中文汉语教学、联合考古项目与文化代表团互访。', ckb: 'سکۆلەرشیپی خوێندن و فێرکاری زمان.' },
        ctaHref: '/services/cultural-exchange',
        customization: { displayOrder: 4, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  },

  // 7. Strategic Partners Marquee
  'public-partners': {
    id: 'public-partners',
    portal: 'public',
    slug: 'partners',
    name: { en: 'Strategic Partners Marquee', ar: 'شريط الشركاء الاستراتيجيين', zh: '战略伙伴与机构合作名录', ckb: 'هاوبەشە ستراتیژییەکان' },
    customization: { displayOrder: 7, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
    status: 'active',
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'partner-cscec',
        sectionId: 'public-partners',
        headline: { en: 'China State Construction Engineering Corp (CSCEC)', ar: 'الشركة الصينية العامة للهندسة المعمارية (CSCEC)', zh: '中国建筑集团有限公司 (CSCEC)', ckb: 'کۆمپانیای CSCEC ی چینی' },
        body: { en: 'Tier-1 infrastructure prime contractor for Nasiriyah International Airport and hospital grids.', ar: 'المقاول الرئيسي لمطار الناصرية ومشاريع المشافي والموانئ.', zh: '纳西里耶国际机场、大型现代化综合医院及核心公建总承包商。', ckb: 'کۆمپانیای سەرەکی پڕۆژە ستراتیژییەکان.' },
        imageUrl: '/images/partners/cscec.svg',
        ctaHref: 'https://www.cscec.com',
        customization: { displayOrder: 1, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'partner-cnooc',
        sectionId: 'public-partners',
        headline: { en: 'China National Offshore Oil Corp (CNOOC)', ar: 'الشركة الوطنية الصينية للنفط البحري (CNOOC)', zh: '中国海洋石油集团有限公司 (CNOOC)', ckb: 'کۆمپانیای CNOOC ی نەوتی' },
        body: { en: 'Missan Block 7 integrated petrochemical and exploration consortium.', ar: 'تطوير حقول ميسان والاستكشافات البتروكيماوية المستدامة.', zh: '米桑第7区块上游油气勘探开发与绿色炼化联合体。', ckb: 'پڕۆژەکانی نەوت و گاز لە مەیسان.' },
        imageUrl: '/images/partners/cnooc.svg',
        ctaHref: 'https://www.cnooc.com.cn',
        customization: { displayOrder: 2, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  },

  // 8. Download App Promo Card (PWA)
  'public-download-app': {
    id: 'public-download-app',
    portal: 'public',
    slug: 'download-app',
    name: { en: 'Download App PWA Card', ar: 'بطاقة تحميل تطبيق الوكالة (PWA)', zh: '官方独立客户端 (PWA) 下载卡片', ckb: 'داگرتنی ئەپی فەرمی' },
    customization: { displayOrder: 8, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES }, variant: 'pwa-promo' },
    status: 'active',
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'pwa-card-1',
        sectionId: 'public-download-app',
        eyebrow: { en: 'MOBILE SOVEREIGN CLIENT', ar: 'العميل السيادي للأجهزة الذكية', zh: '主权独立移动工作终端', ckb: 'ئەپی مۆبایلی سەروەری' },
        headline: { en: 'Install the Official ICA Agency App (iOS, Android, macOS, Windows)', ar: 'قم بتثبيت تطبيق الوكالة العراقية الصينية المعتمد', zh: '安装伊中通讯社官方渐进式应用 (PWA)', ckb: 'ئەپی فەرمی ئاژانسی عێراقی-چینی دابمەزرێنە' },
        body: { en: 'Enjoy 100% offline intelligence storage, instant diplomatic alerts, and push dispatch notifications with encrypted biometrics.', ar: 'تخزين مشفر للمعلومات الاستخباراتية وتنبيهات فورية بدون انترنت.', zh: '支持全量离线加密阅读、紧急外交电报推送及快速签证进度查验。', ckb: 'خوێندنەوەی بێ ئینتەرنێت و ئاگادارییە بەپەلەکان.' },
        ctaLabel: { en: 'Install ICA Application', ar: 'تثبيت التطبيق الآن', zh: '立即一键安装', ckb: 'دامەزراندنی ئەپ' },
        ctaHref: '/download',
        customization: { displayOrder: 1, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES, backgroundColor: '#18181b' } },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  },

  // 9. Services - Cultural Exchange CRUD Entity
  'services-cultural-exchange': {
    id: 'services-cultural-exchange',
    portal: 'services',
    slug: 'cultural-exchange',
    name: { en: 'Cultural & Academic Exchange Services', ar: 'خدمات التبادل الثقافي والأكاديمي', zh: '文化学术交流中心管理', ckb: 'خزمەتگوزارییەکانی ئاڵوگۆڕی کەلتووری' },
    description: { en: 'Complete program roster, scholarships, university partnerships, and fellowship rosters.', ar: 'البرامج الأكاديمية والمنح والشراكات الجامعية.', zh: '全额公派奖学金、重点高校合作网及国际青年交流名册。', ckb: 'سکۆلەرشیپ و هاوبەشی زانکۆکان.' },
    customization: { displayOrder: 1, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
    status: 'active',
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'prog-silk-road-scholars',
        sectionId: 'services-cultural-exchange',
        eyebrow: { en: 'FULL SCHOLARSHIP 2026', ar: 'منحة دراسية كاملة 2026', zh: '2026全额公费奖学金', ckb: 'سکۆلەرشیپی تەواو ٢٠٢٦' },
        headline: { en: 'Silk Road Bilateral Academic Fellowship Program', ar: 'برنامج زمالة طريق الحرير الأكاديمية الثنائية', zh: '“丝路之桥”中伊双向高层次学术学者研修计划', ckb: 'بەرنامەی سکۆلەرشیپی ڕێگای ئاوریشم' },
        body: { en: 'Funding 150 graduate scholars in petroleum engineering, AI automation, renewable grids, and ancient civilizations archaeology.', ar: 'تمويل 150 باحثاً في هندسة النفط والذكاء الاصطناعي والطاقة المتجددة والآثار القديمة.', zh: '资助150名伊拉克与中国优秀硕士博士生前往顶尖学府攻读石油、人工智能、绿色能源与考古专业。', ckb: 'دابینکردنی بودجە بۆ ١٥٠ خوێندکاری ماستەر و دکتۆرا.' },
        chips: [
          { en: '100% Fully Funded', ar: 'ممولة بالكامل 100%', zh: '100%全奖', ckb: '١٠٠٪ بەخۆڕایی' },
          { en: 'Tsinghua & Baghdad Univ', ar: 'جامعة تسينغهوا وبغداد', zh: '清华大学与巴格达大学', ckb: 'زانکۆی تسینگهوا و بەغدا' }
        ],
        ctaLabel: { en: 'Review & Manage Applications', ar: 'مراجعة وإدارة الطلبات', zh: '审核与管理报录申请', ckb: 'بەڕێوەبردنی داواکارییەکان' },
        ctaHref: '/services/cultural-exchange/apply',
        customization: { displayOrder: 1, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'prog-youth-diplomacy',
        sectionId: 'services-cultural-exchange',
        eyebrow: { en: 'OFFICIAL DELEGATION', ar: 'وفد دبلوماسي رسمي', zh: '青年外交使团', ckb: 'شاندی فەرمی لاوان' },
        headline: { en: 'Eurasian Young Ambassadors Diplomatic Exchange 2026', ar: 'برنامج السفراء الشباب للتبادل الدبلوماسي الأوراسي 2026', zh: '2026年“欧亚新使者”中伊青年领袖互访研学营', ckb: 'ئاڵوگۆڕی دیپلۆماسی گەنجانی ئۆراسیا ٢٠٢٦' },
        body: { en: 'Bi-annual mutual cultural tour between Beijing, Shanghai, Baghdad, Erbil, and Basra.', ar: 'جولة ثقافية ودبلوماسية متبادلة تشمل بكين، شنغهاي، بغداد، أربيل، والبصرة.', zh: '年度双边文化深度探访，覆盖北京、上海、巴格达、埃尔比勒与巴士拉五大名城。', ckb: 'سەردانی کەلتووری بۆ پەکین، شەنگەهای، بەغدا و هەولێر.' },
        ctaLabel: { en: 'Edit Itinerary Schedule', ar: 'تعديل جدول الوفد', zh: '修改日程排期', ckb: 'دەستکاریکردنی بەرنامە' },
        ctaHref: '/services/cultural-exchange/programs',
        customization: { displayOrder: 2, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  },

  // 10. Secretariat Specific Directives
  'secretariat-directives': {
    id: 'secretariat-directives',
    portal: 'secretariat',
    slug: 'directives',
    name: { en: 'Secretariat Directives & Protocol', ar: 'توجيهات الأمانة العامة والبروتوكول', zh: '秘书处政令与外交规约', ckb: 'ڕێنماییەکانی سکرتارییەت' },
    description: { en: 'Internal sovereign protocol dispatches, plenipotentiary letters, and high-level directives.', ar: 'البرقيات الدبلوماسية والرسائل الرسمية.', zh: '内部主权协议电报、全权公函与高层政令。', ckb: 'نامە فەرمییەکان و ڕێنماییە باڵاکان.' },
    customization: { displayOrder: 1, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
    status: 'active',
    updatedAt: new Date().toISOString(),
    items: []
  },

  // 11. Services - Bilateral Visa Centre
  'services-visa-centre': {
    id: 'services-visa-centre',
    portal: 'services',
    slug: 'visa-centre',
    name: { en: 'Visa Centre Management', ar: 'إدارة مركز التأشيرات', zh: '双边签证服务中心管理', ckb: 'بەڕێوەبردنی ناوەندی ڤیزا' },
    description: { en: 'Manage visa types, fast-track eligibility, and appointment slots.', ar: 'إدارة أنواع التأشيرات ومعايير الأهلية.', zh: '管理签证类型、快速通道资格与预约席位。', ckb: 'بەڕێوەبردنی جۆرەکانی ڤیزا.' },
    customization: { displayOrder: 2, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
    status: 'active',
    updatedAt: new Date().toISOString(),
    items: []
  },

  // 12. Services - Chinese Centre
  'services-chinese-centre': {
    id: 'services-chinese-centre',
    portal: 'services',
    slug: 'chinese-centre',
    name: { en: 'Chinese Business Centre Hub', ar: 'مركز الأعمال الصيني', zh: '中国商务服务中心', ckb: 'ناوەندی بازرگانی چینی' },
    description: { en: 'Corporate concierge, matchmaking, and company registration for Chinese entities.', ar: 'خدمات الشركات والوساطة التجارية وتسجيل الشركات.', zh: '为中资企业提供全方位礼宾、撮合及注册登记服务。', ckb: 'خزمەتگوزاری کۆمپانیاکان.' },
    customization: { displayOrder: 3, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
    status: 'active',
    updatedAt: new Date().toISOString(),
    items: []
  },

  // 13. Services - Payment Settlement
  'services-settlement': {
    id: 'services-settlement',
    portal: 'services',
    slug: 'settlement',
    name: { en: 'Payment Settlement Rails', ar: 'تسوية المدفوعات الثنائية', zh: '本币结算清算体系', ckb: 'پاکتاوی دراوەکان' },
    description: { en: 'Manage IQD/CNY settlement routes, liquidity provider lists, and clearing status.', ar: 'إدارة مسارات التسوية ومزودي السيولة.', zh: '管理第纳尔/人民币结算路径、流动性提供商名单及清算状态。', ckb: 'بەڕێوەبردنی ڕێڕەوەکانی پاکتاوی دارایی.' },
    customization: { displayOrder: 4, visibility: 'visible', styleOverrides: { ...DEFAULT_STYLE_OVERRIDES } },
    status: 'active',
    updatedAt: new Date().toISOString(),
    items: []
  }
};

export const useSectionControlStore = create<SectionControlState>((set, get) => ({
  sections: INITIAL_SECTIONS,
  activeFilter: 'all',
  isLoading: false,

  updateSectionCustomization: (sectionId, customization) => {
    set(state => {
      const section = state.sections[sectionId];
      if (!section) return state;
      return {
        sections: {
          ...state.sections,
          [sectionId]: {
            ...section,
            customization: {
              ...section.customization,
              ...customization,
              styleOverrides: {
                ...section.customization.styleOverrides,
                ...(customization.styleOverrides || {})
              }
            },
            updatedAt: new Date().toISOString()
          }
        }
      };
    });

    // Background push to server
    fetch(`/api/hub/sections/${sectionId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customization)
    }).catch(e => console.warn('Section customization sync queued:', e));
  },

  toggleSectionVisibility: (sectionId) => {
    const section = get().sections[sectionId];
    if (!section) return;
    const newVis: VisibilityState = section.customization.visibility === 'visible' ? 'hidden' : 'visible';
    get().updateSectionCustomization(sectionId, { visibility: newVis });
  },

  addCard: async (sectionId, cardData) => {
    const id = `card_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const newCard: AdminControlledCard = {
      ...cardData,
      id,
      sectionId,
      status: cardData.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [
        {
          id: `rev_${Date.now()}`,
          timestamp: new Date().toISOString(),
          actor: 'admin@ica.iq',
          role: 'ADMIN',
          action: 'create',
          diffSummary: 'Created record initial state',
          snapshot: { ...cardData }
        }
      ]
    };

    set(state => {
      const section = state.sections[sectionId];
      if (!section) return state;
      return {
        sections: {
          ...state.sections,
          [sectionId]: {
            ...section,
            items: [...section.items, newCard],
            updatedAt: new Date().toISOString()
          }
        }
      };
    });

    fetch(`/api/hub/sections/${sectionId}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCard)
    }).catch(e => console.warn('Add card server sync queued:', e));

    return newCard;
  },

  updateCard: async (sectionId, cardId, updates) => {
    let updated: AdminControlledCard | null = null;

    set(state => {
      const section = state.sections[sectionId];
      if (!section) return state;

      const newItems = section.items.map(card => {
        if (card.id === cardId) {
          const newRevision: HistoryRevision = {
            id: `rev_${Date.now()}`,
            timestamp: new Date().toISOString(),
            actor: 'admin@ica.iq',
            role: 'ADMIN',
            action: 'update',
            diffSummary: `Updated fields: ${Object.keys(updates).join(', ')}`,
            snapshot: { ...card, ...updates }
          };

          updated = {
            ...card,
            ...updates,
            customization: {
              ...card.customization,
              ...(updates.customization || {}),
              styleOverrides: {
                ...card.customization.styleOverrides,
                ...(updates.customization?.styleOverrides || {})
              }
            },
            history: [newRevision, ...(card.history || [])],
            updatedAt: new Date().toISOString()
          };
          return updated;
        }
        return card;
      });

      return {
        sections: {
          ...state.sections,
          [sectionId]: {
            ...section,
            items: newItems,
            updatedAt: new Date().toISOString()
          }
        }
      };
    });

    fetch(`/api/hub/sections/${sectionId}/items/${cardId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    }).catch(e => console.warn('Update card server sync queued:', e));

    return updated;
  },

  duplicateCard: async (sectionId, cardId) => {
    const section = get().sections[sectionId];
    if (!section) return null;
    const existing = section.items.find(i => i.id === cardId);
    if (!existing) return null;

    const dupData = {
      ...existing,
      headline: {
        en: `${existing.headline.en} (Copy)`,
        ar: `${existing.headline.ar} (نسخة)`,
        zh: `${existing.headline.zh} (副本)`,
        ckb: `${existing.headline.ckb} (کۆپی)`
      },
      status: 'draft' as const,
      customization: {
        ...existing.customization,
        displayOrder: section.items.length + 1
      }
    };

    return get().addCard(sectionId, dupData);
  },

  softDeleteCard: async (sectionId, cardId) => {
    const res = await get().updateCard(sectionId, cardId, { status: 'archived' });
    return !!res;
  },

  restoreCard: async (sectionId, cardId) => {
    const res = await get().updateCard(sectionId, cardId, { status: 'active' });
    return !!res;
  },

  permanentDeleteCard: async (sectionId, cardId) => {
    set(state => {
      const section = state.sections[sectionId];
      if (!section) return state;
      return {
        sections: {
          ...state.sections,
          [sectionId]: {
            ...section,
            items: section.items.filter(i => i.id !== cardId),
            updatedAt: new Date().toISOString()
          }
        }
      };
    });

    fetch(`/api/hub/sections/${sectionId}/items/${cardId}?permanent=true`, {
      method: 'DELETE'
    }).catch(e => console.warn('Permanent delete server sync queued:', e));

    return true;
  },

  reorderCard: (sectionId, cardId, direction) => {
    const section = get().sections[sectionId];
    if (!section) return;

    const items = [...section.items].sort((a, b) => a.customization.displayOrder - b.customization.displayOrder);
    const index = items.findIndex(i => i.id === cardId);
    if (index === -1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const currentOrder = items[index].customization.displayOrder;
    const targetOrder = items[targetIndex].customization.displayOrder;

    items[index].customization.displayOrder = targetOrder;
    items[targetIndex].customization.displayOrder = currentOrder;

    set(state => ({
      sections: {
        ...state.sections,
        [sectionId]: {
          ...section,
          items: [...items],
          updatedAt: new Date().toISOString()
        }
      }
    }));
  },

  bulkUpdateStatus: (sectionId, cardIds, status) => {
    set(state => {
      const section = state.sections[sectionId];
      if (!section) return state;
      const idSet = new Set(cardIds);
      return {
        sections: {
          ...state.sections,
          [sectionId]: {
            ...section,
            items: section.items.map(item => idSet.has(item.id) ? { ...item, status, updatedAt: new Date().toISOString() } : item),
            updatedAt: new Date().toISOString()
          }
        }
      };
    });
  },

  bulkUpdateVisibility: (sectionId, cardIds, visibility) => {
    set(state => {
      const section = state.sections[sectionId];
      if (!section) return state;
      const idSet = new Set(cardIds);
      return {
        sections: {
          ...state.sections,
          [sectionId]: {
            ...section,
            items: section.items.map(item => idSet.has(item.id) ? {
              ...item,
              customization: { ...item.customization, visibility },
              updatedAt: new Date().toISOString()
            } : item),
            updatedAt: new Date().toISOString()
          }
        }
      };
    });
  },

  updateCardStyleOverrides: (sectionId, cardId, styles) => {
    const section = get().sections[sectionId];
    if (!section) return;
    const card = section.items.find(i => i.id === cardId);
    if (!card) return;

    get().updateCard(sectionId, cardId, {
      customization: {
        ...card.customization,
        styleOverrides: {
          ...card.customization.styleOverrides,
          ...styles
        }
      }
    });
  },

  syncWithServer: async () => {
    try {
      set({ isLoading: true });
      const res = await fetch('/api/hub/sections');
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object' && Object.keys(data).length > 0) {
          set({ sections: data, isLoading: false });
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to sync sections from server:', e);
    }
    set({ isLoading: false });
  }
}));
