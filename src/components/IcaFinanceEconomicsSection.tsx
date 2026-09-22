import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Locale, FinanceInsight, PaymentExchangeRate } from '../types';
import { 
  TrendingUp, TrendingDown, ArrowRight, ArrowLeft, ArrowRightLeft, 
  Landmark, ShieldCheck, Sparkles, ExternalLink, Calendar, User, 
  Layers, X, ChevronRight, CheckCircle2, FileText, Activity,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ErrorBoundary } from './ErrorBoundary';

interface Props {
  lang: Locale;
}

export function IcaFinanceEconomicsSection({ lang }: Props) {
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';
  const isRtl = isAr || isCkb;

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedInsight, setSelectedInsight] = useState<FinanceInsight | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // 1. Fetch published finance insights
  const { data: insights = [], isLoading: isLoadingInsights } = useQuery<FinanceInsight[]>({
    queryKey: ['finance-insights'],
    queryFn: async () => {
      const res = await fetch('/api/finance-insights');
      if (!res.ok) throw new Error('Failed to load insights');
      return res.json();
    }
  });

  // 2. Fetch live real-time IQD/e-CNY exchange rates from the real payment gateway backend
  const { data: ratesPayload } = useQuery<{ success?: boolean; data?: PaymentExchangeRate } & Partial<PaymentExchangeRate>>({
    queryKey: ['paymentRates'],
    queryFn: async () => {
      const res = await fetch('/api/public/payments/rates');
      if (!res.ok) throw new Error('Failed to load exchange rates');
      return res.json();
    },
    refetchInterval: 30000 // Real-time pulse
  });

  const rateData = (ratesPayload?.data ?? (ratesPayload?.baseRate ? ratesPayload : null)) as PaymentExchangeRate | null;

  // Localized texts
  const t = {
    badge: isZh ? '伊中财经与宏观经济研究' : isAr ? 'أبحاث المالية والاقتصاد الكلي' : isCkb ? 'توێژینەوەی دارایی و ئابووری' : 'Macroeconomic & Financial Intelligence',
    title: isZh ? '伊中财经与宏观经济' : isAr ? 'المالية والاقتصاد' : isCkb ? 'دارایی و ئابووری' : 'ICA Finance & Economics',
    subtitle: isZh 
      ? '追踪中伊主权清算走廊、大宗商品双边结算、基础设施投融资与宏观经贸动态' 
      : isAr 
      ? 'تحليلات الممر المالي المباشر، تسوية المشتقات النفطية والتجارة الثنائية، واستثمارات البنية التحتية' 
      : isCkb 
      ? 'شیکردنەوەی ڕێڕەوی دارایی ڕاستەوخۆ، یەکلاکردنەوەی بازرگانی، و وەبەرهێنانی ژێرخان'
      : 'Authoritative analysis of the bilateral clearing corridor, energy settlement dynamics, infrastructure capital syndication, and sovereign monetary policy.',
    liveRateBadge: isZh ? '中伊央行官方清算即时牌价' : isAr ? 'سعر التسوية اللحظي المعتمد' : isCkb ? 'نرخی فەرمی یەکلاکردنەوەی دراو' : 'Bilateral Clearing Rate',
    baseRateLabel: isZh ? '1 数字人民币 (e-CNY)' : isAr ? '١ يوان رقمي (e-CNY)' : isCkb ? '١ یوان (e-CNY)' : '1 e-CNY',
    directPair: 'e-CNY / IQD',
    change24h: isZh ? '24小时波动' : isAr ? 'التغير خلال 24 ساعة' : isCkb ? 'گۆڕانکاری 24 کاتژمێر' : '24h Change',
    mbridgeBadge: isZh ? 'mBridge & CIPS 实时通道就绪' : isAr ? 'ممر mBridge و CIPS متزامن' : isCkb ? 'سیستەمی mBridge ئۆنلاینە' : 'mBridge & CIPS Synchronized',
    settleCta: isZh ? '前往结算与采购服务大厅' : isAr ? 'الانتقال إلى خدمات التسوية والتوريد' : isCkb ? 'بۆ خزمەتگوزاری یەکلاکردنەوە و دابینکردن' : 'Open Settlement & Sourcing Hub',
    calcCta: isZh ? '启动双边资金结算' : isAr ? 'بدء طلب تسوية مالية' : isCkb ? 'دەستپێکردنی یەکلاکردنەوەی دارایی' : 'Initiate Currency Settlement',
    readMore: isZh ? '阅读完整深度研判' : isAr ? 'قراءة التحليل الكامل' : isCkb ? 'خوێندنەوەی تەواوی شیکردنەوەکە' : 'Read Full Analysis',
    exploreMore: isZh ? '探索更多深度研判' : isAr ? 'استكشاف المزيد من التقارير' : isCkb ? 'دۆزینەوەی شیکردنەوەی زیاتر' : 'Explore More Insights',
    showLess: isZh ? '收起研判报告' : isAr ? 'عرض أقل' : isCkb ? 'پیشاندانی کەمتر' : 'Show Less',
    closeModal: isZh ? '关闭' : isAr ? 'إغلاق' : isCkb ? 'داخستن' : 'Close',
    categories: {
      ALL: isZh ? '全部领域' : isAr ? 'جميع القطاعات' : isCkb ? 'هەموو بوارەکان' : 'All Fields',
      'Currency Markets': isZh ? '货币清算' : isAr ? 'أسواق العملات' : isCkb ? 'بازاڕی دراو' : 'Currency Markets',
      'Trade Balance': isZh ? '贸易平衡' : isAr ? 'الميزان التجاري' : isCkb ? 'تەرازووی بازرگانی' : 'Trade Balance',
      'Investment Analysis': isZh ? '投资研判' : isAr ? 'تحليل الاستثمار' : isCkb ? 'شیکردنەوەی وەبەرهێنان' : 'Investment Analysis',
      'Policy & Regulation': isZh ? '政策监管' : isAr ? 'السياسات والتشريعات' : isCkb ? 'یاسا و ڕێساکان' : 'Policy & Regulation',
      'Infrastructure Finance': isZh ? '基础设施金融' : isAr ? 'تمويل البنية التحتية' : isCkb ? 'دارایی ژێرخان' : 'Infrastructure Finance',
      'Energy & Commodities': isZh ? '能源与大宗' : isAr ? 'الطاقة والسلع' : isCkb ? 'وزە و کاڵاکان' : 'Energy & Commodities'
    }
  };

  const getTitle = (item: FinanceInsight) => {
    if (isAr && item.titleAr) return item.titleAr;
    if (isZh && item.titleZh) return item.titleZh;
    if (isCkb && item.titleCkb) return item.titleCkb;
    return item.titleEn;
  };

  const getSummary = (item: FinanceInsight) => {
    if (isAr && item.summaryAr) return item.summaryAr;
    if (isZh && item.summaryZh) return item.summaryZh;
    if (isCkb && item.summaryCkb) return item.summaryCkb;
    return item.summaryEn;
  };

  const getBody = (item: FinanceInsight) => {
    if (isAr && item.bodyAr) return item.bodyAr;
    if (isZh && item.bodyZh) return item.bodyZh;
    if (isCkb && item.bodyCkb) return item.bodyCkb;
    return item.bodyEn || item.summaryEn;
  };

  const categories = ['ALL', 'Investment Analysis', 'Currency Markets', 'Trade Balance', 'Infrastructure Finance', 'Policy & Regulation'];

  const filteredInsights = insights.filter(item => {
    if (activeCategory === 'ALL') return true;
    return item.category === activeCategory;
  });

  const displayedInsights = isExpanded ? filteredInsights : filteredInsights.slice(0, 3);

  return (
    <ErrorBoundary inline lang={lang} title="ICA Finance & Economics">
      <section 
        id="finance-economics" 
        className="w-full bg-white dark:bg-neutral-900 border-2 border-ink-900 dark:border-neutral-700 shadow-sm p-4 sm:p-8 md:p-10 my-6 transition-colors duration-300 overflow-hidden"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-800/15 pb-4 mb-6 gap-4">
          <div className="space-y-1 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-brand-800 rounded-2xs" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-800 dark:text-brand-400">
                {t.badge}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-brand-900 dark:text-neutral-100 uppercase">
              {t.title}
            </h2>
            <p className="text-sm font-serif text-neutral-600 dark:text-neutral-400 leading-relaxed pt-1">
              {t.subtitle}
            </p>
          </div>

          {/* Real-Time Live Settlement Rate Card Tie-In */}
          <div className="w-full md:w-auto md:min-w-[340px] bg-red-700 dark:bg-red-800 text-white rounded-xl p-4 sm:p-6 shadow-md border border-red-600/80 transition-all hover:shadow-lg shrink-0 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 border-b border-red-600/60 pb-3 mb-3.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  {t.liveRateBadge}
                </span>
              </div>
              <span className="text-xs font-bold text-white/90 bg-red-800/80 border border-red-500/40 px-2 py-0.5 rounded">
                {rateData?.cbiClearingStatus === 'SYNCHRONIZED' ? 'CBI • PBOC' : 'LIVE'}
              </span>
            </div>

            {/* Rate & 24h Change */}
            <div className="flex items-baseline justify-between gap-4 mb-3.5">
              <div>
                <div className="text-xs font-medium text-white/80 mb-1">
                  {t.baseRateLabel}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-baseline gap-1.5">
                  <span>{rateData?.baseRate ? rateData.baseRate.toFixed(2) : '188.50'}</span>
                  <span className="text-xs sm:text-sm font-bold text-white/80">IQD</span>
                </div>
              </div>

              <div className="text-end">
                <div className="text-xs font-medium text-white/80 mb-1">
                  {t.change24h}
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-white bg-red-800/80 border border-red-500/40 px-2.5 py-1 rounded">
                  {(rateData?.change24h ?? 0.45) >= 0 ? <TrendingUp size={13} className="text-white" /> : <TrendingDown size={13} className="text-white" />}
                  <span>{(rateData?.change24h ?? 0.45) >= 0 ? '+' : ''}{rateData?.change24h ?? 0.45}%</span>
                </div>
              </div>
            </div>

            {/* Quick Link to Settlement */}
            <div className="pt-3 border-t border-red-600/60 flex items-center justify-between gap-3 text-xs">
              <span className="text-white/80 font-medium truncate">
                {t.mbridgeBadge}
              </span>
              <Link
                to={`/${lang}/settlement?tab=currency-settlement`}
                className="inline-flex items-center gap-1.5 font-black uppercase tracking-wider text-white hover:text-white/90 underline-offset-4 hover:underline transition-all group shrink-0"
              >
                <span>{t.calcCta}</span>
                {isRtl ? (
                  <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setIsExpanded(false);
              }}
              className={cn(
                "px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 rounded-lg shadow-xs cursor-pointer",
                activeCategory === cat
                  ? "bg-brand-800 text-white border-2 border-brand-900 shadow-md scale-105"
                  : "bg-red-600/90 hover:bg-brand-800 text-white border border-red-700/60 hover:shadow-sm"
              )}
            >
              {(t.categories as any)[cat] || cat}
            </button>
          ))}
        </div>

        {/* Content Body */}
        {isLoadingInsights ? (
          <div className="p-12 text-center text-neutral-400 font-mono text-sm animate-pulse">
            Loading macroeconomic research...
          </div>
        ) : filteredInsights.length === 0 ? (
          <div className="p-10 text-center bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 shadow-xs flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center border border-red-200/50 dark:border-red-900/50">
              <FileText size={22} />
            </div>
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 font-sans font-medium max-w-md">
              {isZh 
                ? '该领域暂无最新研判报告，我们的宏观分析团队正在编撰中。' 
                : isAr 
                ? 'لا توجد أبحاث منشورة حالياً لهذا القطاع. يقوم فريق التحليل بإعداد تقارير جديدة.' 
                : isCkb 
                ? 'هیچ شیکردنەوەیەکی نوێ لەم بەشەدا نییە. تیمەکەمان سەرقاڵی ئامادەکردنی ڕاپۆرتی نوێن.' 
                : 'No financial insights currently published for this sector. Check back shortly.'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Grid of Insights - Bounded to 3 cards by default with smooth hover scale animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedInsights.map(insight => (
                <div
                  key={insight.id}
                  onClick={() => setSelectedInsight(insight)}
                  className="bg-neutral-50/70 dark:bg-neutral-800/40 border border-neutral-200/90 dark:border-neutral-700/80 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 ease-out hover:scale-[1.025] hover:-translate-y-1.5 hover:shadow-xl hover:border-brand-800/60 dark:hover:border-brand-500/60 hover:bg-white dark:hover:bg-neutral-800 group cursor-pointer will-change-transform"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-16/10 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800 mb-3 border border-neutral-200/60 dark:border-neutral-700/60">
                      <img
                        src={insight.coverImage}
                        alt={getTitle(insight)}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106"
                      />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                        <span className="px-2.5 py-1 text-3xs font-mono font-bold uppercase tracking-wider bg-brand-800 text-white rounded-xs shadow-xs">
                          {(t.categories as any)[insight.category] || insight.category}
                        </span>
                        {insight.featured && (
                          <span className="px-2 py-1 text-3xs font-mono font-bold uppercase tracking-wider bg-amber-500 text-white rounded-xs shadow-xs flex items-center gap-1">
                            <Sparkles size={10} /> Lead Analysis
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-3xs font-mono text-neutral-500 dark:text-neutral-400">
                      <span className="truncate max-w-[65%]">{insight.author}</span>
                      <span>
                        {new Date(insight.publishedAt).toLocaleDateString(
                          isZh ? 'zh-CN' : isAr ? 'ar-IQ' : 'en-US',
                          { month: 'short', day: 'numeric', year: 'numeric' }
                        )}
                      </span>
                    </div>

                    <h4
                      className="font-bold text-base sm:text-lg text-brand-900 dark:text-neutral-100 leading-snug group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors line-clamp-2"
                    >
                      {getTitle(insight)}
                    </h4>

                    <p className="text-xs sm:text-sm font-serif text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                      {getSummary(insight)}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-neutral-200/80 dark:border-neutral-700/80 flex items-center justify-between">
                    <span className="text-3xs font-mono text-neutral-400 dark:text-neutral-500">
                      Sino-Iraqi Macro Desk
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInsight(insight);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-800 dark:text-brand-400 group-hover:text-brand-900 dark:group-hover:text-brand-300 hover:underline cursor-pointer"
                    >
                      <span>{t.readMore}</span>
                      {isRtl ? (
                        <ArrowLeft size={13} className="transition-transform duration-200 group-hover:-translate-x-1" />
                      ) : (
                        <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Button to Explore More / Show Less */}
            {filteredInsights.length > 3 && (
              <div className="flex flex-col items-center justify-center pt-3 pb-1">
                <button
                  onClick={() => setIsExpanded(prev => !prev)}
                  className="inline-flex items-center gap-2.5 px-6 py-3 bg-white dark:bg-neutral-800 border-2 border-brand-800/25 dark:border-brand-600/30 hover:border-brand-800 dark:hover:border-brand-500 text-brand-900 dark:text-neutral-100 hover:bg-brand-50/60 dark:hover:bg-brand-950/40 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-800 dark:bg-brand-400 group-hover:scale-125 transition-transform" />
                  <span>{isExpanded ? t.showLess : t.exploreMore}</span>
                  {!isExpanded && (
                    <span className="text-3xs font-mono font-bold px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-800 dark:text-brand-300">
                      +{filteredInsights.length - 3}
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronUp size={16} className="text-brand-800 dark:text-brand-400 transition-transform duration-200 group-hover:-translate-y-0.5" />
                  ) : (
                    <ChevronDown size={16} className="text-brand-800 dark:text-brand-400 transition-transform duration-200 group-hover:translate-y-0.5" />
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Section Footer: Clear CTA pointing to Part 3 Settlement & Sourcing */}
        <div className="mt-8 pt-5 border-t border-brand-800/15 flex flex-col sm:flex-row items-center justify-between gap-4 bg-brand-50/40 dark:bg-brand-950/20 p-4 border border-brand-800/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-800 text-white flex items-center justify-center shrink-0">
              <ArrowRightLeft size={16} />
            </div>
            <div>
              <h5 className="font-bold text-sm text-brand-900 dark:text-neutral-100">
                {isZh ? '需执行双边资金清算或开展大宗货品采购？' : isAr ? 'هل ترغب في تنفيذ تسوية تجارية أو تقديم طلب توريد بضائع؟' : isCkb ? 'پێویستت بە یەکلاکردنەوەی دارایی یان کڕینی کەلوپەلە لە چین؟' : 'Need to execute bilateral trade settlement or initiate procurement?'}
              </h5>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                {isZh ? '访问中伊通讯社一站式“结算清算与供应链采购服务大厅”，享受即时汇率与原厂审核。' : isAr ? 'توجه إلى بوابة التسوية المالية والتوريد للحصول على أسعار صرف لحظية وتدقيق المصانع المباشر.' : isCkb ? 'سەردانی بەشی یەکلاکردنەوە و دابینکردن بکە بۆ خزمەتگوزاری دارایی و بازرگانی فەرمی.' : 'Access the unified Bilateral Settlement & Sourcing Hub for instant rate calculations and verified procurement.'}
              </p>
            </div>
          </div>

          <Link
            to={`/${lang}/settlement`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-800 hover:bg-brand-900 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <span>{t.settleCta}</span>
            {isRtl ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
          </Link>
        </div>

        {/* In-Page Reader Modal for Full Economic Analysis */}
        {selectedInsight && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
            <div className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 border border-brand-800 shadow-2xl my-8 max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-3xs font-mono font-bold uppercase tracking-wider bg-brand-800 text-white">
                    {(t.categories as any)[selectedInsight.category] || selectedInsight.category}
                  </span>
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    ICA Research Monograph
                  </span>
                </div>
                <button
                  onClick={() => setSelectedInsight(null)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                <div className="aspect-16/9 overflow-hidden border border-neutral-200 dark:border-neutral-700">
                  <img
                    src={selectedInsight.coverImage}
                    alt={getTitle(selectedInsight)}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-brand-900 dark:text-neutral-100 leading-tight">
                    {getTitle(selectedInsight)}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400 pb-3 border-b border-neutral-200 dark:border-neutral-800">
                    <span className="flex items-center gap-1.5">
                      <User size={13} className="text-brand-800" />
                      <span>{selectedInsight.author}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      <span>{new Date(selectedInsight.publishedAt).toLocaleDateString()}</span>
                    </span>
                  </div>
                </div>

                {/* Executive Teaser */}
                <div className="p-4 bg-brand-50/50 dark:bg-brand-950/20 border-l-4 border-brand-800 font-serif text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
                  {getSummary(selectedInsight)}
                </div>

                {/* Full Article Body */}
                <div className="font-serif text-base leading-relaxed text-neutral-800 dark:text-neutral-200 space-y-4 whitespace-pre-line">
                  {getBody(selectedInsight)}
                </div>

                {/* Direct Action inside reader */}
                <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs font-mono text-neutral-500">
                    Bilateral Reference: <span className="font-bold text-neutral-700 dark:text-neutral-300">{selectedInsight.slug}</span>
                  </div>
                  <Link
                    to={`/${lang}/settlement?tab=currency-settlement`}
                    onClick={() => setSelectedInsight(null)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    <span>{t.calcCta}</span>
                    {isRtl ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </ErrorBoundary>
  );
}
export default IcaFinanceEconomicsSection;
