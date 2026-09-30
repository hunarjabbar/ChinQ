import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { useI18n } from '../../hooks/useI18n';
import { 
  Building2, 
  ShieldCheck, 
  Landmark, 
  CreditCard, 
  Scale, 
  Compass, 
  GraduationCap, 
  FileCheck, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ExternalLink,
  Coins,
  Globe2,
  Calendar,
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function CiseServicesDirectory() {
  const { lang: urlLang } = useParams<{ lang: string }>();
  const normalizedLang = (urlLang === 'ck' || urlLang === 'ku') ? 'ckb' : (urlLang || 'en');
  const lang = (['en', 'ar', 'zh', 'ckb'].includes(normalizedLang) ? normalizedLang : 'en') as Locale;
  const { t } = useI18n(lang);
  const isRtl = lang === 'ar' || lang === 'ckb';

  const [activeCategory, setActiveCategory] = useState<'all' | 'clearing' | 'convening' | 'mobility'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const localizedContent = {
    en: {
      eyebrow: 'Chinese Institute for Strategic and Economic Studies (CISE)',
      title: 'Institutional Services & Bilateral Initiatives',
      subtitle: 'Sovereign clearing rails, institutional risk mitigation, bilateral convening, and specialized academic infrastructure anchored by CISE.',
      filterAll: 'All Initiatives (6)',
      filterClearing: 'Clearing & Risk Coverage (2)',
      filterConvening: 'Convening & Strategic Advisory (2)',
      filterMobility: 'Mobility & Language Instruction (2)',
      searchPlaceholder: 'Filter services by name, sector, or keyword...',
      governanceNote: 'Sovereign Integrity: Every operational service is managed under official bilateral frameworks and regulatory alignment with Iraqi and Chinese authorities.',
      statSovereignClearing: 'Sovereign Clearing Rail',
      statSovereignClearingSub: 'Direct IQD ⇄ RMB (0% USD Drag)',
      statRiskCoverage: 'Sinosure Aligned',
      statRiskCoverageSub: 'Comprehensive Bilateral Coverage',
      statAccredited: 'Accredited Faculty',
      statAccreditedSub: 'Standard HSK 1–9 Curriculum',
      statConvene: 'Annual Convening',
      statConveneSub: '11 Sector Pavilions in Sulaymaniyah'
    },
    ar: {
      eyebrow: 'المعهد الصيني للدراسات الاستراتيجية والاقتصادية (CISE)',
      title: 'الخدمات المؤسسية والمبادرات الثنائية',
      subtitle: 'مسارات المقاصة السيادية، والحد من المخاطر المؤسسية، والملتقيات الثنائية، والبنية التحتية الأكاديمية المتخصصة برعاية المعهد.',
      filterAll: 'جميع المبادرات (٦)',
      filterClearing: 'المقاصة وتغطية المخاطر (٢)',
      filterConvening: 'الملتقيات والاستشارات الاستراتيجية (٢)',
      filterMobility: 'التنقل وتعليم اللغة (٢)',
      searchPlaceholder: 'تصفية الخدمات بالاسم أو القطاع أو الكلمات المفتاحية...',
      governanceNote: 'النزاهة السيادية: تتم إدارة كل خدمة تشغيلية بموجب أطر ثنائية رسمية وتوافق تنظيمي مع السلطات العراقية والصينية.',
      statSovereignClearing: 'مسار مقاصة سيادي',
      statSovereignClearingSub: 'مباشر بالدينار واليوان (بدون احتكاك بالدولار)',
      statRiskCoverage: 'متوافق مع سينوشور',
      statRiskCoverageSub: 'تغطية مخاطر شاملة',
      statAccredited: 'كادر تدريسي معتمد',
      statAccreditedSub: 'منهاج HSK 1–9 القياسي',
      statConvene: 'ملتقى سنوي',
      statConveneSub: '١١ جناحاً قطاعياً في السليمانية'
    },
    zh: {
      eyebrow: '中国战略与经济研究所 (CISE)',
      title: '智库机构服务与双边战略举措',
      subtitle: '由中伊战略研究所（CISE）主导运营的主权清算通道、机构风险对冲、双边高规格峰会与专业语言学术基础设施。',
      filterAll: '全部服务倡议 (6)',
      filterClearing: '清算结算与风险兜底 (2)',
      filterConvening: '双边峰会与战略顾问 (2)',
      filterMobility: '人员流动与语言教学 (2)',
      searchPlaceholder: '输入名称、业务领域或关键词检索服务...',
      governanceNote: '主权权威保障：所有运营服务均在中伊两国官方监管框架及多边协议下合规开展。',
      statSovereignClearing: '主权本币结算通道',
      statSovereignClearingSub: '第纳尔/人民币直通（零美元敞口）',
      statRiskCoverage: '深度对接中国信保',
      statRiskCoverageSub: '买方信贷与主权政治险全覆盖',
      statAccredited: '认证汉语言师资',
      statAccreditedSub: '国际标准化 HSK 1-9 权威考点',
      statConvene: '苏莱曼尼亚年度峰会',
      statConveneSub: '11大国民经济支柱产业展区'
    },
    ckb: {
      eyebrow: 'پەیمانگای چینی بۆ لێکۆڵینەوەی ستراتیژی و ئابووری (CISE)',
      title: 'خزمەتگوزارییە دامەزراوەییەکان و دەستپێشخەرییە دوولایەنەکان',
      subtitle: 'هێڵی پاکتاوی سەروەری دراو، کەمکردنەوەی مەترسی، کۆبوونەوەی دوولایەنە و ژێرخانی ئەکادیمی تایبەتمەند لەژێر چاودێری پەیمانگا.',
      filterAll: 'تەواوی دەستپێشخەرییەکان (٦)',
      filterClearing: 'پاکتاو و داپۆشینی مەترسی (٢)',
      filterConvening: 'کۆبوونەوە و ڕاوێژکاری ستراتیژی (٢)',
      filterMobility: 'هاتوچۆ و فێرکاری زمان (٢)',
      searchPlaceholder: 'فلتەرکردنی خزمەتگوزاری بەپێی ناو، کەرت یان وشەی سەرەکی...',
      governanceNote: 'دەسەڵاتی سەروەری: هەموو خزمەتگوزارییەکان بەپێی ڕێکارە فەرمییەکانی نێوان دەسەڵاتدارانی عێراق و چین بەڕێوەدەبرێن.',
      statSovereignClearing: 'هێڵی پاکتاوی سەروەری',
      statSovereignClearingSub: 'ڕاستەوخۆ دینار ⇄ یوان (بەبێ دۆلار)',
      statRiskCoverage: 'هەماهەنگ لەگەڵ سینۆشوور',
      statRiskCoverageSub: 'داپۆشینی گشتگیری مەترسی بازرگانی',
      statAccredited: 'دەستەی مامۆستایانی باوەڕپێکراو',
      statAccreditedSub: 'پرۆگرامی ستانداردی HSK 1–9',
      statConvene: 'لووتکەی ساڵانە',
      statConveneSub: '١١ باڵیۆزخانەی کەرتی لە سلێمانی'
    }
  };

  const currentCopy = localizedContent[lang] || localizedContent.en;

  const services = [
    {
      id: 'settlement',
      category: 'clearing',
      badge: lang === 'ar' ? 'مسار المقاصة السيادي' : lang === 'zh' ? '主权清算通道' : lang === 'ckb' ? 'هێڵی پاکتاوی سەروەری' : 'Sovereign Clearing Rail',
      title: t('home.initiatives.settlement.headline'),
      description: t('home.initiatives.settlement.description'),
      route: `/${lang}/institute/settlement`,
      icon: Coins,
      accentColor: 'border-emerald-500/30 hover:border-emerald-500',
      tagColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40',
      actionLabel: t('home.initiatives.settlement.cta'),
      features: [
        t('home.initiatives.settlement.fxSpread'),
        t('home.initiatives.settlement.speed'),
        t('home.initiatives.settlement.regulated'),
        t('home.initiatives.settlement.card')
      ],
      deepLinks: [
        { label: t('home.initiatives.settlement.calculatorLabel'), path: `/${lang}/institute/settlement/calculator` },
        { label: t('home.initiatives.settlement.qiCardLabel'), path: `/${lang}/institute/settlement/card` },
        { label: lang === 'ar' ? 'تتبع الحوالات' : lang === 'zh' ? '结算追踪' : lang === 'ckb' ? 'بەدواداچوون' : 'Live Tracker', path: `/${lang}/institute/settlement/tracker` }
      ]
    },
    {
      id: 'insurance',
      category: 'clearing',
      badge: lang === 'ar' ? 'تسهيل التأمين السيادي' : lang === 'zh' ? '主权保险促进' : lang === 'ckb' ? 'ئاسانکاری بیمەی سەروەری' : 'Sovereign Insurance Facilitation',
      title: t('home.initiatives.insurance.headline'),
      description: t('home.initiatives.insurance.description'),
      route: `/${lang}/institute/insurance-facilitation`,
      icon: ShieldCheck,
      accentColor: 'border-blue-500/30 hover:border-blue-500',
      tagColor: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40',
      actionLabel: t('home.initiatives.insurance.cta'),
      features: [
        t('home.initiatives.insurance.tag.sinosure'),
        t('home.initiatives.insurance.tag.cargo'),
        t('home.initiatives.insurance.tag.credit'),
        t('home.initiatives.insurance.tag.political')
      ],
      deepLinks: [
        { label: lang === 'ar' ? 'تنسيق سينوشور' : lang === 'zh' ? '中信保对接' : lang === 'ckb' ? 'سینۆشوور' : 'Sinosure Coordination', path: `/${lang}/institute/insurance-facilitation#sinosure` },
        { label: lang === 'ar' ? 'تأمين الشحن' : lang === 'zh' ? '货运保险' : lang === 'ckb' ? 'بیمەی بار' : 'Cargo & Shipping', path: `/${lang}/institute/insurance-facilitation#cargo` },
        { label: lang === 'ar' ? 'طلب فحص ائتماني' : lang === 'zh' ? '提交评级申请' : lang === 'ckb' ? 'داواکاری' : 'Direct Inquiry', path: `/${lang}/institute/insurance-facilitation#inquiry` }
      ]
    },
    {
      id: 'summit',
      category: 'convening',
      badge: lang === 'ar' ? 'الملتقى السنوي · السليمانية' : lang === 'zh' ? '年度双边峰会 · 苏莱曼尼亚' : lang === 'ckb' ? 'کۆبوونەوەی ساڵانە · سلێمانی' : 'Annual Convening · Sulaymaniyah',
      title: t('summit.section.headline'),
      description: t('summit.section.body'),
      route: `/${lang}/institute/summit`,
      icon: Landmark,
      accentColor: 'border-amber-500/30 hover:border-amber-500',
      tagColor: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40',
      actionLabel: t('summit.section.cta').replace(' →', '').replace(' ←', ''),
      features: t('summit.section.chips').split(' · '),
      deepLinks: [
        { label: lang === 'ar' ? 'برنامج الـ٣ أيام' : lang === 'zh' ? '3日全景日程' : lang === 'ckb' ? 'بەرنامەی ٣ ڕۆژە' : '3-Day Agenda', path: `/${lang}/institute/summit/agenda` },
        { label: lang === 'ar' ? 'المعرض و١١ جناحاً' : lang === 'zh' ? '11大产业展区' : lang === 'ckb' ? '١١ باڵیۆزخانە' : '11 Expo Pavilions', path: `/${lang}/institute/summit/expo` },
        { label: lang === 'ar' ? 'تسجيل الوفود الرسمية' : lang === 'zh' ? '贵宾代表通道' : lang === 'ckb' ? 'تۆماری شاند' : 'VIP Registration', path: `/${lang}/institute/summit/register/vip` }
      ]
    },
    {
      id: 'consultancy',
      category: 'convening',
      badge: lang === 'ar' ? 'الاستشارات العابرة للحدود' : lang === 'zh' ? '跨境财税与战略法律咨询' : lang === 'ckb' ? 'ڕاوێژکاری سنووربەزێن' : 'Cross-Border Strategic Advisory',
      title: t('initiatives.card.consultancy.headline'),
      description: t('initiatives.card.consultancy.body'),
      route: `/${lang}/institute/consultancy`,
      icon: Scale,
      accentColor: 'border-purple-500/30 hover:border-purple-500',
      tagColor: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40',
      actionLabel: t('initiatives.card.consultancy.cta'),
      features: [
        t('initiatives.card.consultancy.tag.legal'),
        t('initiatives.card.consultancy.tag.financial'),
        t('initiatives.card.consultancy.tag.investment'),
        lang === 'ar' ? 'تراخيص KBOI و NIC' : lang === 'zh' ? '投资委资质核准' : lang === 'ckb' ? 'مۆڵەتی KBOI' : 'KBOI & NIC Alignment'
      ],
      deepLinks: [
        { label: lang === 'ar' ? 'الاستثمار في العراق' : lang === 'zh' ? '投资伊拉克' : lang === 'ckb' ? 'وەبەرهێنان لە عێراق' : 'Iraq-Bound Advisory', path: `/${lang}/institute/consultancy/iraq-bound` },
        { label: lang === 'ar' ? 'دخول السوق الصيني' : lang === 'zh' ? '进入中国市场' : lang === 'ckb' ? 'چوونە بازاڕی چین' : 'China-Bound Advisory', path: `/${lang}/institute/consultancy/china-bound` },
        { label: lang === 'ar' ? 'طلب استشارة مخصصة' : lang === 'zh' ? '提交企业咨询' : lang === 'ckb' ? 'داواکاری ڕاوێژکاری' : 'Submit Inquiry', path: `/${lang}/institute/consultancy/inquiry` }
      ]
    },
    {
      id: 'visa-centre',
      category: 'mobility',
      badge: lang === 'ar' ? 'مركز الاستشارات والفيزا' : lang === 'zh' ? '双边签证咨询与服务中心' : lang === 'ckb' ? 'ناوەندی ڕاوێژکاری ڤیزا' : 'Bilateral Visa Advisory & Facilitation',
      title: t('visaCentre.section.headline'),
      description: t('visaCentre.section.body'),
      route: `/${lang}/institute/visa-centre`,
      icon: FileCheck,
      accentColor: 'border-teal-500/30 hover:border-teal-500',
      tagColor: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40',
      actionLabel: t('visaCentre.section.cta').replace(' →', '').replace(' ←', ''),
      features: t('visaCentre.section.chips').split(' · '),
      deepLinks: [
        { label: lang === 'ar' ? 'أنواع التأشيرات' : lang === 'zh' ? '签证类型指南' : lang === 'ckb' ? 'جۆرەکانی ڤیزا' : 'Visa Types Matrix', path: `/${lang}/institute/visa-centre/visa-types` },
        { label: lang === 'ar' ? 'قائمة الوثائق المطلوبة' : lang === 'zh' ? '材料清单核验' : lang === 'ckb' ? 'بەڵگەنامەکان' : 'Document Checklist', path: `/${lang}/institute/visa-centre/requirements` },
        { label: lang === 'ar' ? 'تتبع الطلب' : lang === 'zh' ? '进度查询系统' : lang === 'ckb' ? 'بەدواداچوونی داواکاری' : 'Track Application', path: `/${lang}/institute/visa-centre/track` }
      ]
    },
    {
      id: 'chinese-center',
      category: 'mobility',
      badge: lang === 'ar' ? 'مركز تعليم اللغة الصينية · السليمانية' : lang === 'zh' ? '汉语言教学与认证中心 · 苏莱曼尼亚' : lang === 'ckb' ? 'ناوەندی فێرکاری زمانی چینی · سلێمانی' : 'Chinese Language Tutoring · Sulaymaniyah',
      title: t('chineseCentre.section.headline'),
      description: t('chineseCentre.section.body'),
      route: `/${lang}/institute/chinese-center`,
      icon: GraduationCap,
      accentColor: 'border-rose-500/30 hover:border-rose-500',
      tagColor: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40',
      actionLabel: t('chineseCentre.section.cta').replace(' →', '').replace(' ←', ''),
      features: t('chineseCentre.section.chips').split(' · '),
      deepLinks: [
        { label: lang === 'ar' ? 'دليل الدورات التدريبية' : lang === 'zh' ? '标准课程体系' : lang === 'ckb' ? 'خولەکان' : 'Course Catalogue', path: `/${lang}/institute/chinese-center/courses` },
        { label: lang === 'ar' ? 'التسجيل في اختبار HSK' : lang === 'zh' ? 'HSK考级报名' : lang === 'ckb' ? 'تاقیکردنەوەی HSK' : 'HSK Testing Registration', path: `/${lang}/institute/chinese-center/testing/register` },
        { label: lang === 'ar' ? 'التسجيل الأكاديمي' : lang === 'zh' ? '在线选课入学' : lang === 'ckb' ? 'تۆمارکردن' : 'Enrollment Desk', path: `/${lang}/institute/chinese-center/enroll` }
      ]
    },
    {
      id: 'cultural-exchange',
      category: 'mobility',
      badge: lang === 'ar' ? 'التبادل الشعبي والثقافي' : lang === 'zh' ? '民间与文化交流' : lang === 'ckb' ? 'ئاڵوگۆڕی گەلی و کولتووری' : 'People-to-People & Cultural Exchange',
      title: t('initiatives.card.culturalExchange.headline'),
      description: t('initiatives.card.culturalExchange.body'),
      route: `/${lang}/institute/services/cultural-exchange`,
      icon: GraduationCap,
      accentColor: 'border-red-500/30 hover:border-red-500',
      tagColor: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40',
      actionLabel: t('initiatives.card.culturalExchange.cta').replace(' →', '').replace(' ←', ''),
      features: [
        t('initiatives.card.culturalExchange.chips.universityMous'),
        t('initiatives.card.culturalExchange.chips.studentFellowships'),
        t('initiatives.card.culturalExchange.chips.artsResidencies'),
        t('initiatives.card.culturalExchange.chips.civilizationalDialogue')
      ],
      deepLinks: [
        { label: lang === 'ar' ? 'دليل البرامج' : lang === 'zh' ? '全部项目' : lang === 'ckb' ? 'بەرنامەکان' : 'All Programs', path: `/${lang}/institute/services/cultural-exchange/programs` },
        { label: lang === 'ar' ? 'الجامعات الشريكة' : lang === 'zh' ? '合作院校' : lang === 'ckb' ? 'زانکۆ هاوبەشەکان' : 'Partner Universities', path: `/${lang}/institute/services/cultural-exchange/partners` },
        { label: lang === 'ar' ? 'طلب التقديم' : lang === 'zh' ? '在线申请' : lang === 'ckb' ? 'داواکاری' : 'Apply / Inquire', path: `/${lang}/institute/services/cultural-exchange/apply` }
      ]
    }
  ];

  const filteredServices = services.filter((srv) => {
    const matchesCategory = activeCategory === 'all' || srv.category === activeCategory;
    const matchesSearch = !searchFilter || 
      srv.title.toLowerCase().includes(searchFilter.toLowerCase()) || 
      srv.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      srv.features.some(f => f.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12 min-w-0" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
        <Link to={`/${lang}`} className="hover:text-[var(--color-brand-800)] transition-colors">{lang === 'ar' ? 'الرئيسية' : lang === 'zh' ? '首页' : lang === 'ckb' ? 'سەرەکی' : 'Home'}</Link>
        <span className="opacity-40">/</span>
        <Link to={`/${lang}/institute`} className="hover:text-[var(--color-brand-800)] transition-colors">
          {lang === 'ar' ? 'المعهد الصيني (CISE)' : lang === 'zh' ? '中国战略与经济研究所' : lang === 'ckb' ? 'پەیمانگای چینی' : 'CISE Institute'}
        </Link>
        <span className="opacity-40">/</span>
        <span className="text-[var(--color-brand-800)] font-black">{currentCopy.title}</span>
      </nav>

      {/* Hero Taxonomy Banner */}
      <section className="bg-gradient-to-br from-[var(--color-ink-900)] via-[#1E293B] to-[#0A0F1D] text-white rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-2xl border border-white/10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-brand-800)]/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-[var(--color-brand-800)] backdrop-blur-md">
            <Landmark size={14} />
            <span>{currentCopy.eyebrow}</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight uppercase font-serif">
            {currentCopy.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            {currentCopy.subtitle}
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs text-neutral-400">
            <ShieldCheck size={16} className="text-[var(--color-brand-800)] shrink-0" />
            <span className="text-[11px] font-bold leading-normal">{currentCopy.governanceNote}</span>
          </div>
        </div>

        {/* Sovereign Metrics Grid */}
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-xs font-black uppercase tracking-wider text-[var(--color-brand-800)] block">{currentCopy.statSovereignClearing}</span>
            <span className="text-xs text-neutral-300 font-medium mt-0.5 block">{currentCopy.statSovereignClearingSub}</span>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-xs font-black uppercase tracking-wider text-[var(--color-brand-800)] block">{currentCopy.statRiskCoverage}</span>
            <span className="text-xs text-neutral-300 font-medium mt-0.5 block">{currentCopy.statRiskCoverageSub}</span>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-xs font-black uppercase tracking-wider text-[var(--color-brand-800)] block">{currentCopy.statAccredited}</span>
            <span className="text-xs text-neutral-300 font-medium mt-0.5 block">{currentCopy.statAccreditedSub}</span>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-xs font-black uppercase tracking-wider text-[var(--color-brand-800)] block">{currentCopy.statConvene}</span>
            <span className="text-xs text-neutral-300 font-medium mt-0.5 block">{currentCopy.statConveneSub}</span>
          </div>
        </div>
      </section>

      {/* Filter and Taxonomy Controls */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Segmented Filter Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                "px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all min-h-[40px]",
                activeCategory === 'all'
                  ? "bg-white dark:bg-neutral-800 text-[var(--color-brand-800)] shadow-sm font-black"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              )}
            >
              {currentCopy.filterAll}
            </button>
            <button
              onClick={() => setActiveCategory('clearing')}
              className={cn(
                "px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all min-h-[40px]",
                activeCategory === 'clearing'
                  ? "bg-white dark:bg-neutral-800 text-[var(--color-brand-800)] shadow-sm font-black"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              )}
            >
              {currentCopy.filterClearing}
            </button>
            <button
              onClick={() => setActiveCategory('convening')}
              className={cn(
                "px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all min-h-[40px]",
                activeCategory === 'convening'
                  ? "bg-white dark:bg-neutral-800 text-[var(--color-brand-800)] shadow-sm font-black"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              )}
            >
              {currentCopy.filterConvening}
            </button>
            <button
              onClick={() => setActiveCategory('mobility')}
              className={cn(
                "px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all min-h-[40px]",
                activeCategory === 'mobility'
                  ? "bg-white dark:bg-neutral-800 text-[var(--color-brand-800)] shadow-sm font-black"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              )}
            >
              {currentCopy.filterMobility}
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            <input 
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder={currentCopy.searchPlaceholder}
              className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl py-2.5 px-10 text-xs font-medium text-neutral-900 dark:text-white outline-none focus:border-[var(--color-brand-800)] transition-colors"
            />
          </div>
        </div>

        {/* Services Grid (All 6 First-Class Initiatives) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((srv) => {
            const Icon = srv.icon;
            return (
              <div 
                key={srv.id}
                className={cn(
                  "p-7 rounded-3xl bg-white dark:bg-neutral-900 border transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1",
                  srv.accentColor
                )}
              >
                <div className="space-y-4">
                  {/* Category Kicker */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-brand-800)] block">
                      {srv.badge}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[var(--color-ink-900)] dark:text-white">
                      <Icon size={18} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-[var(--color-ink-900)] dark:text-white uppercase leading-snug">
                    {srv.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                    {srv.description}
                  </p>

                  {/* Clean Unboxed Metadata Features (Zero-Pill Compliance) */}
                  <div className="pt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                    {srv.features.map((feature, idx) => (
                      <React.Fragment key={idx}>
                        <span>{feature}</span>
                        {idx < srv.features.length - 1 && <span className="text-neutral-300 dark:text-neutral-700" aria-hidden="true">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions & Sub-Navigation Links */}
                <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                  <Link 
                    to={srv.route}
                    className="w-full flex items-center justify-between px-4 py-3 bg-[var(--color-ink-900)] hover:bg-[#1E293B] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm group"
                  >
                    <span>{srv.actionLabel}</span>
                    <ArrowRight size={14} className={cn("transition-transform group-hover:translate-x-1", isRtl && "rotate-180 group-hover:-translate-x-1")} />
                  </Link>

                  {/* Deep Navigation Sub-Links */}
                  {srv.deepLinks && srv.deepLinks.length > 0 && (
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] font-bold text-neutral-500 pt-1">
                      {srv.deepLinks.map((link, idx) => (
                        <React.Fragment key={idx}>
                          <Link 
                            to={link.path}
                            className="hover:text-[var(--color-brand-800)] hover:underline whitespace-nowrap transition-colors"
                          >
                            {link.label}
                          </Link>
                          {idx < srv.deepLinks.length - 1 && <span className="opacity-30">•</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct Institutional Consultation Banner */}
      <section className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl text-center md:text-start">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-black uppercase tracking-widest text-[var(--color-brand-800)]">
            <Layers size={14} />
            <span>{lang === 'ar' ? 'التنسيق بين المؤسسات' : lang === 'zh' ? '机构对口协调与业务支持' : lang === 'ckb' ? 'هەماهەنگی دامەزراوەیی' : 'Inter-Institutional Alignment'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--color-ink-900)] dark:text-white uppercase">
            {lang === 'ar' ? 'هل تحتاج إلى استشارة حكومية أو مسار سيادي مخصص؟' : lang === 'zh' ? '需要定制化政府间合作咨询或主权通道对接？' : lang === 'ckb' ? 'پێویستیت بە ڕاوێژکاری حکومی یان هێڵی سەروەری تایبەت هەیە؟' : 'Need Custom Sovereign Alignment or Inter-Governmental Coordination?'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            {lang === 'ar' 
              ? 'يقدم باحثو ومستشارو معهد CISE المشورة المباشرة للوزارات والشركات السيادية وغرف التجارة لتسهيل العقود الاستراتيجية.'
              : lang === 'zh'
              ? '中伊战略研究所高级研究员与专家委员会直接为两国部委、主权基金及战略企业提供闭门政策咨询与执行保障。'
              : lang === 'ckb'
              ? 'شارەزایانی پەیمانگای CISE ڕاوێژی ڕاستەوخۆ دەدەن بە وەزارەتەکان و کۆمپانیاکانی هەردوو وڵات بۆ ڕێککەوتننامە ستراتیژییەکان.'
              : 'CISE Fellows and Senior Policy Directors provide direct advisory to ministries, sovereign entities, and state-owned enterprises across Baghdad, Erbil, and Beijing.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
          <Link 
            to={`/${lang}/institute/partnerships`}
            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-[var(--color-brand-800)] hover:bg-[var(--color-brand-900)] text-[var(--color-ink-900)] text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span>{lang === 'ar' ? 'شراكات المعهد' : lang === 'zh' ? '智库伙伴关系' : lang === 'ckb' ? 'هاوبەشییەکان' : 'Institute Partnerships'}</span>
            <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
          </Link>
          <Link 
            to={`/${lang}/institute/experts`}
            className="w-full sm:w-auto h-12 px-6 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 text-neutral-800 dark:text-neutral-200 text-xs font-black uppercase tracking-widest flex items-center justify-center transition-all hover:bg-neutral-200/50 dark:hover:bg-neutral-800"
          >
            <span>{lang === 'ar' ? 'فريق الخبراء' : lang === 'zh' ? '专家学者库' : lang === 'ckb' ? 'شارەزایان' : 'Meet CISE Fellows'}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
export default CiseServicesDirectory;
