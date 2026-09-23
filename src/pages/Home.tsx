import DOMPurify from 'dompurify';
import { SubscriptionCard } from '../components/SubscriptionCard';
import { motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Article, Locale, Study, MarketData } from '../types';
import { useI18n } from '../hooks/useI18n';
import { useAuthStore } from '../store/useAuthStore';
import { BookOpen, Lock, ChevronRight, ChevronLeft, Sparkles, AlertCircle, Activity, Flame, Clock, Radio } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ar, zhCN, enUS, ckb } from 'date-fns/locale';
import { cn } from '../lib/utils';
import { ADDITIONAL_TOPICS } from '../data/topics';
import IcaBusinessSection from '../components/IcaBusinessSection';
import { ContactUs } from '../components/ContactUs';
import { IcaFinanceEconomicsSection } from '../components/IcaFinanceEconomicsSection';
import { TrendingBooksSection } from '../components/TrendingBooksSection';
import PartnersSection from "../components/PartnersSection";
import { PaymentAndSourcingSection } from "../components/PaymentAndSourcingSection";
import { RecommendedBooksSection } from '../components/RecommendedBooksSection';
import { CulturalExchangeSection } from '../components/CulturalExchangeSection';
import { TourismSection } from '../components/TourismSection';
import { WomenSection } from '../components/WomenSection';
import { VisaFlightSection } from '../components/VisaFlightSection';
import { InitiativesSection } from '../components/InitiativesSection';


import { EditorialShowcaseSection } from '../components/EditorialShowcaseSection';
import { BricsSection } from '../components/BricsSection';
import { BeltRoadTrackingSection } from '../components/BeltRoadTrackingSection';
import { ChineseProductsShowcase } from '../components/ChineseProductsShowcase';
import { IcaPlusSection } from '../components/IcaPlusSection';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { InstitutePortalCTA } from '../components/InstitutePortalCTA';

export function Home() {
  const { lang } = useParams<{ lang: Locale }>();
  const { t } = useI18n(lang!);
  const navigate = useNavigate();
  
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
  const { data: marketData = [] } = useQuery<MarketData[]>({
    queryKey: ['marketData'],
    queryFn: async () => {
      const res = await fetch('/api/market');
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    }
  });
  const trendingScrollRef = useRef<HTMLDivElement>(null);

  const { user } = useAuthStore();
  const isSubscribed = user?.subscriptionStatus === 'ACTIVE';

  const { data: rawArticles = [], isLoading } = useQuery<Article[]>({
    queryKey: ['articles'],
    queryFn: async () => {
      const res = await fetch('/api/articles');
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    }
  });

  const articles = useMemo(() => {
    const seenIds = new Set<string>();
    const seenSlugs = new Set<string>();
    return rawArticles.filter(article => {
      if (!article?.id || seenIds.has(article.id)) return false;
      seenIds.add(article.id);

      const normalizedSlug = article.slug ? article.slug.replace(/-(malik-mahmud|duplicate)$/, '') : article.id;
      if (seenSlugs.has(normalizedSlug)) return false;
      seenSlugs.add(normalizedSlug);

      return true;
    });
  }, [rawArticles]);

  const { data: studies = [] } = useQuery<Study[]>({
    queryKey: ['studies'],
    queryFn: async () => {
      const res = await fetch('/api/studies');
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    }
  });

  const getStudyTitle = useCallback((study: Study) => {
    if (lang === 'ar') return study.titleAr;
    if (lang === 'zh') return study.titleZh;
    if (lang === 'ckb') return study.titleCkb || study.titleEn;
    return study.titleEn;
  }, [lang]);

  const getStudyExcerpt = useCallback((study: Study) => {
    if (lang === 'ar') return study.excerptAr;
    if (lang === 'zh') return study.excerptZh;
    if (lang === 'ckb') return study.excerptCkb || study.excerptEn;
    return study.excerptEn;
  }, [lang]);

  const getStudyContent = useCallback((study: Study) => {
    if (lang === 'ar') return study.contentAr;
    if (lang === 'zh') return study.contentZh;
    if (lang === 'ckb') return study.contentCkb || study.contentEn;
    return study.contentEn;
  }, [lang]);

  const getTranslation = useCallback((article: Article) => {
    return article.translations.find(tr => tr.lang === lang) || 
           article.translations.find(tr => tr.lang === 'en') || 
           article.translations[0];
  }, [lang]);

  const getCategoryName = useCallback((category: any) => {
    if (!category) return '';
    if (lang === 'ar') return category.nameAr || category.name;
    if (lang === 'zh') return category.nameZh || category.name;
    if (lang === 'ckb') {
      const topic = ADDITIONAL_TOPICS.find(t => t.slug === category.slug || t.nameEn === (category.nameEn || category.name) || t.name === category.name);
      if (topic && topic.nameCkb) return topic.nameCkb;
      const name = category.nameEn || category.name;
      if (name === 'Energy') return 'وزە';
      if (name === 'Economy') return 'ئابووری';
      if (name === 'Culture') return 'کالچەر';
      if (name === 'AI') return 'زیرەکی دەستکرد';
      if (name === 'Food & Beverage') return 'خۆراک و خواردنەوە';
      if (name === 'Expo') return 'پێشانگا';
      if (name === 'Business Statistics') return 'ئاماری بازرگانی';
      if (name === 'Politics') return 'سیاسەت';
      if (name === 'Technology') return 'تەکنەلۆجیا';
      if (name === 'Opinion') return 'ڕاو بۆچوون';
      if (name === 'News') return 'هەواڵ';
      if (name === 'Belt & Road') return 'پشتوێن و ڕێگا';
      if (name === 'Historical Figures') return 'کەسایەتییە مێژووییەکان';
      return name;
    }
    return category.nameEn || category.name;
  }, [lang]);

  const dateLocale = useMemo(() => lang === 'ar' ? ar : lang === 'ckb' ? ckb : lang === 'zh' ? zhCN : enUS, [lang]);

  const formatTimeAgo = useCallback((dateInput: string | Date | number) => {
    const d = new Date(dateInput);
    if (lang === 'ckb') {
      const now = Date.now();
      const diffMs = Math.max(0, now - d.getTime());
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHr = Math.floor(diffMin / 60);
      const diffDays = Math.floor(diffHr / 24);

      if (diffMin < 1) return 'ئێستا';
      if (diffMin === 1) return '١ خولەک پێش ئێستا';
      if (diffMin < 60) return `${diffMin} خولەک پێش ئێستا`;
      if (diffHr === 1) return '١ کاتژمێر پێش ئێستا';
      if (diffHr < 24) return `${diffHr} کاتژمێر پێش ئێستا`;
      if (diffDays === 1) return 'دوێنێ';
      if (diffDays < 30) return `${diffDays} ڕۆژ پێش ئێستا`;
      const diffMonths = Math.floor(diffDays / 30);
      if (diffMonths < 12) return `${diffMonths} مانگ پێش ئێستا`;
      return `${Math.floor(diffDays / 365)} ساڵ پێش ئێستا`;
    }
    return formatDistanceToNow(d, { addSuffix: true, locale: dateLocale });
  }, [lang, dateLocale]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8 w-full py-6">
        <div className="h-96 bg-neutral-200 rounded-lg w-full"></div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 w-full">
        <p className="text-gray-500 italic text-lg">No stories available at this time.</p>
      </div>
    );
  }

  const handleTrendingScroll = (direction: 'left' | 'right') => {
    if (trendingScrollRef.current) {
      const isRtl = lang === 'ar' || lang === 'ckb';
      const scrollAmount = trendingScrollRef.current.clientWidth * 0.75;
      const delta = direction === 'left' ? -scrollAmount : scrollAmount;
      trendingScrollRef.current.scrollBy({
        left: isRtl ? -delta : delta,
        behavior: 'smooth'
      });
    }
  };

  const leadStory = articles[0];
  const popularStories = articles.slice(0, 5); // Popular stories list

  return (
    <div className="flex flex-col w-full bg-white dark:bg-neutral-900 transition-colors">
      
      {/* IRAQ-CHINA INTELLIGENCE WIRE - VERTICAL TICKER */}
      <div className="w-full bg-white dark:bg-neutral-900 text-ink-900 dark:text-white border-b border-gray-200 dark:border-neutral-800 flex overflow-hidden h-12 relative items-center">
        <div className="flex-shrink-0 font-black text-brand-800 dark:text-brand-400 pe-6 border-e border-gray-200 dark:border-neutral-800 uppercase tracking-[0.2em] text-xs sm:text-sm z-10 bg-white dark:bg-neutral-900 h-full flex items-center px-4">
          <Activity size={14} className="me-2 animate-pulse text-brand-800 dark:text-brand-400" />
          {lang === 'ar' ? 'سلك المعلومات' : lang === 'zh' ? '信息简报' : lang === 'ckb' ? 'تێلیگرافی هەواڵ' : 'INTELLIGENCE WIRE'}
        </div>
        <div className="flex-grow h-full relative overflow-hidden ms-6">
          <div className="animate-marquee-vertical flex flex-col absolute top-0 left-0 w-full">
            {[...articles.slice(0, 8), ...articles.slice(0, 8)].map((article, i) => {
              const tr = getTranslation(article);
              return (
                 <div key={`${article.id}-${i}`} className="h-12 flex items-center shrink-0 cursor-pointer group" onClick={() => navigate(`/${lang}/article/${article.slug}`)}>
                   <span className="text-xs text-brand-800 dark:text-brand-400 me-4 shrink-0 uppercase font-bold">{new Date(article.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})}</span>
                   <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-ink-900 dark:text-neutral-100 group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors truncate">{tr?.title}</span>
                 </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Initiatives Section */}
      <InitiativesSection lang={lang as Locale} />

      {/* Section 1: Full-Scale Upper Trending Carousel with Covers & Navigation Arrows */}
      <section className="w-full p-4 sm:p-6 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 relative overflow-hidden">
      </section>

      {/* Lead Story & Popular Stories 2-Column Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 shadow-xs">
        {/* Column 2: Lead Story */}
        <section className="lg:col-span-7 p-4 sm:p-6 md:p-8 overflow-hidden">
        <div className="flex items-center gap-2 mb-4 sm:mb-6 uppercase text-brand-800 dark:text-brand-400 text-xs sm:text-sm font-black tracking-widest border-b border-gray-100 dark:border-neutral-800 pb-2">
            <span className="w-2.5 h-2.5 bg-brand-800 dark:bg-brand-400 rounded-sm"></span>
            {lang === 'ar' ? 'القصة الرئيسية' : lang === 'zh' ? '头条新闻' : lang === 'ckb' ? 'چیرۆکی سەرەکی' : 'Lead Story'}
        </div>
        {leadStory && (
          <div 
            onClick={() => navigate(`/${lang}/article/${leadStory.slug}`)}
            className="cursor-pointer group transition-all duration-300"
          >
            <div className="relative mb-6 overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-800 shadow-sm bg-gray-100 dark:bg-neutral-800">
              <div className="w-full h-[260px] sm:h-[300px] md:h-[400px] overflow-hidden">
                {leadStory.imageUrl ? (
                  <img 
                    src={leadStory.imageUrl} 
                    alt={getTranslation(leadStory)?.title || 'Lead story image'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    fetchPriority="high"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span className="italic">Image not available</span>
                  </div>
                )}
              </div>
              <div className="absolute top-4 start-4 bg-brand-800 text-white text-xs font-black uppercase px-3 py-1.5 rounded-sm shadow-sm">
                {lang === 'ar' ? 'تقرير خاص' : lang === 'ckb' ? 'ڕاپۆرتی تایبەت' : lang === 'zh' ? '特别报道' : 'Special Report'}
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] mb-5 px-1 tracking-tight text-brand-800 dark:text-neutral-100 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
              {getTranslation(leadStory)?.title}
            </h2>
            
            <div className="flex items-center space-x-4 rtl:space-x-reverse text-xs font-bold uppercase mb-6 px-1 text-gray-500 dark:text-neutral-400 border-y border-gray-100 dark:border-neutral-800 py-3">
              <span>By {(leadStory as any).author?.name || 'Staff Reporter'}</span>
              <span>•</span>
              <span className="text-brand-800 dark:text-brand-400">
                {formatTimeAgo(leadStory.createdAt)}
              </span>
            </div>

            <div className="space-y-4 px-1 text-base sm:text-lg leading-relaxed text-gray-700 dark:text-neutral-300">
              <p className="first-letter:text-6xl first-letter:font-black first-letter:float-start first-letter:pe-3 first-letter:text-brand-800 dark:first-letter:text-brand-400">
                {getTranslation(leadStory)?.excerpt || getTranslation(leadStory)?.content?.substring(0, 300)}
              </p>
              {getTranslation(leadStory)?.content && getTranslation(leadStory)!.content.length > 300 && (
                <p className="opacity-90">
                  {getTranslation(leadStory)!.content.substring(300, 700)}...
                </p>
              )}
              <div className="pt-6 mt-4 flex items-center justify-between text-xs font-bold text-brand-800 dark:text-brand-400 border-t border-gray-100 dark:border-neutral-800 group-hover:underline">
                <span>{lang === 'ar' ? '← اقرأ التقرير والتحليل الكامل' : lang === 'zh' ? '查看完整深度报道与数据图表 →' : lang === 'ckb' ? 'خوێندنەوەی ڕاپۆرتی تەواو' : 'Read Full Editorial & Analytical Dossier →'}</span>
                <span className="text-gray-400 dark:text-neutral-500 font-normal no-underline">7 min read</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Column 3: Most Popular & Widget */}
      <section className="lg:col-span-5 flex flex-col p-4 sm:p-6 md:p-8 space-y-8 bg-white dark:bg-neutral-900">
        <BricsSection lang={lang as Locale} />
        
        <div className="mt-10">
            <h3 className="text-base sm:text-lg uppercase font-black border-b border-gray-200 dark:border-neutral-800 pb-3 mb-6 text-brand-800 dark:text-neutral-100 tracking-wider">
              {t('popular')}
            </h3>
            <ol className="space-y-5 list-decimal list-inside text-base text-ink-900 dark:text-neutral-200">
              {popularStories.map((article) => (
                <li 
                  key={`pop-${article.id}`} 
                  onClick={() => navigate(`/${lang}/article/${article.slug}`)}
                  className="font-bold leading-snug cursor-pointer hover:text-brand-800 dark:hover:text-brand-400 transition-colors border-b border-gray-100 dark:border-neutral-800/50 pb-3 last:border-0 last:pb-0"
                >
                  <span className="inline-block align-top max-w-[92%] ms-2 hover:underline">
                    {getTranslation(article)?.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        
        {/* LIVE COVERAGE HIGHLIGHT */}
        <div className="bg-red-700 dark:bg-red-800 text-white border-2 border-red-600/90 p-8 sm:p-10 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 min-h-[460px] sm:min-h-[500px] flex flex-col justify-between relative overflow-hidden group">
          {/* Subtle background glow effect */}
          <div className="pointer-events-none absolute -top-24 -end-24 w-64 h-64 bg-red-500/20 rounded-full blur-2xl"></div>
          <div className="pointer-events-none absolute -bottom-24 -start-24 w-64 h-64 bg-red-900/40 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white text-red-700 rounded-full font-black uppercase text-xs tracking-widest shadow-sm mb-5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-700"></span>
              </span>
              <span>{lang === 'ar' ? 'تغطية مباشرة خاصة' : lang === 'ckb' ? 'رووماڵی ڕاستەوخۆی تایبەت' : lang === 'zh' ? '特别直播报道' : 'Special Live Coverage'}</span>
            </div>

            <h3 className="font-black text-2xl sm:text-3xl leading-snug text-white mb-4 tracking-tight">
              <Link to={`/${lang}/live`} className="hover:text-red-100 transition-colors">
                {lang === 'ar' ? 'القمة الاقتصادية العراقية الصينية 2026' : lang === 'ckb' ? 'لووتکەی ئابووری عێراق-چین ٢٠٢٦' : lang === 'zh' ? '2026年伊拉克-中国经济峰会' : 'Iraq-China Economic Summit 2026'}
              </Link>
            </h3>

            <p className="text-sm sm:text-base text-white/95 mb-6 leading-relaxed font-normal">
              {lang === 'ar' 
                ? 'تغطية وبث مباشر على مدار الساعة لاتفاقيات التجارة الاستراتيجية ومشاريع الطاقة وممر التنمية الإقليمي بين بغداد وبكين.' 
                : lang === 'ckb' 
                ? 'ڕووماڵ و پەخشی ڕاستەوخۆ بۆ ڕێککەوتننامە ستراتیژییە بازرگانییەکان، پڕۆژەکانی وزە و ڕێگەی گەشەپێدان.' 
                : lang === 'zh' 
                ? '全天候实时报道巴格达与北京之间的战略贸易协定、能源基建项目以及区域发展走廊规划。' 
                : '24/7 continuous broadcast and live updates on strategic trade treaties, clean energy infrastructure, and bilateral development corridors.'}
            </p>

            <div className="bg-red-800/85 border border-red-500/40 rounded-lg p-4 mb-6 text-xs text-white/95 space-y-1.5 backdrop-blur-xs shadow-inner">
              <div className="font-black uppercase tracking-wider text-red-200 flex items-center justify-between">
                <span>{lang === 'ar' ? 'موجز القمة المباشر' : lang === 'zh' ? '峰会实时简报' : lang === 'ckb' ? 'کورتەی لووتکە' : 'Summit Briefing'}</span>
                <span className="bg-red-950/70 border border-red-400/30 px-2 py-0.5 rounded text-[10px] text-white font-bold tracking-widest uppercase">
                  {lang === 'ar' ? 'قريباً' : lang === 'zh' ? '即将上线' : lang === 'ckb' ? 'بەم زووانە' : 'Coming Soon'}
                </span>
              </div>
              <div className="text-white/90 leading-normal font-medium">
                {lang === 'ar' 
                  ? 'مفاوضات استثمارية كبرى تشمل 14 قطاعاً حيوياً ومذكرات تفاهم صناعية مشتركة.' 
                  : lang === 'zh' 
                  ? '涵盖14个关键领域的重大投资协议与双边联合工业合作备忘录。' 
                  : lang === 'ckb' 
                  ? 'ڕێککەوتنی گەورەی وەبەرهێنان لە ١٤ کەرتی جیاوازدا.' 
                  : 'High-level multilateral pacts spanning 14 strategic economic and energy sectors.'}
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-2">
            <Link 
              to={`/${lang}/live/iraq-china-summit-2026`} 
              className="inline-flex items-center justify-between w-full px-6 py-4 bg-white hover:bg-neutral-100 text-red-700 rounded-lg text-sm font-black uppercase tracking-wider transition-all shadow-lg hover:shadow-xl group cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Radio size={16} className="text-red-700 animate-pulse" />
                <span>{lang === 'ar' ? 'متابعة التحديثات' : lang === 'ckb' ? 'سەیرکردنی نوێکارییەکان' : lang === 'zh' ? '关注更新' : 'Follow Updates'}</span>
              </span>
              <span className="group-hover:translate-x-1.5 transition-transform rtl:group-hover:-translate-x-1.5 text-base font-black">→</span>
            </Link>
          </div>
        </div>

        {/* ENTERPRISE CALL TO ACTION */}
        <SubscriptionCard />

        {/* INSTITUTE PORTAL ACCESS */}
        <div className="mt-8">
          <InstitutePortalCTA lang={lang!} variant="card" />
        </div>
      </section>
      </div>
      
      {/* Strategic Partnership Reinforcement (Full Width) */}
      <div className="w-full bg-white dark:bg-neutral-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-brand-800"></div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-brand-800 dark:text-neutral-100">
                {lang === 'ar' ? 'الشركاء الاستراتيجيون' : lang === 'zh' ? '战略合作伙伴' : lang === 'ckb' ? 'هاوبەشە ستراتیژییەکان' : 'Strategic Partnership Network'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-sm font-bold uppercase tracking-widest text-center md:text-start">
              {lang === 'ar' 
                ? 'تحالف مؤسسي يضم نخبة من الهيئات والشركات لتعزيز التعاون الثنائي.' 
                : lang === 'zh'
                ? '连接伊拉克与中国精英机构的双边主权联盟。'
                : lang === 'ckb'
                ? 'هاوپەیمانییەکی دامەزراوەیی کە دامەزراوە باڵاکانی عێراق و چین بەیەکەوە دەبەستێتەوە.'
                : 'Sovereign institutional alliance connecting elite Iraqi and Chinese entities.'}
            </p>
          </div>
        </div>
        <ErrorBoundary inline lang={lang} title="Strategic Partners - High Level">
          <PartnersSection lang={lang as Locale} />
        </ErrorBoundary>
      </div>

      {/* Premium Media Hub - Full Screen Adaptive Layout */}
      <div className="w-full bg-neutral-50 dark:bg-neutral-950 py-12 md:py-20 border-y border-neutral-200 dark:border-neutral-800">
        <div className="w-full max-w-full mx-auto px-4 sm:px-6 md:px-8">
          <IcaPlusSection />
        </div>
      </div>

      {/* --- Main Page Journey Starts Here --- */}

      {/* 1. News & Editorial Hub */}
      <div className="w-full my-6">
        <ErrorBoundary inline lang={lang} title="Sovereign Editorial & Fellowship Showcase">
          <EditorialShowcaseSection lang={lang as Locale} />
        </ErrorBoundary>
      </div>

      {/* 2. Deep Research & Intelligence Studies */}
      {studies.length > 0 && (
        <div className="w-full my-6">
          <ErrorBoundary inline lang={lang} title="Deep Research & Intelligence Studies">
            <section className="bg-white dark:bg-neutral-900 border-t-4 border-double border-brand-800 p-4 sm:p-6 md:p-8 space-y-6 shadow-xs rounded-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-200 dark:border-neutral-800 pb-4 gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-50 dark:bg-brand-950/40 rounded-lg text-brand-800 dark:text-brand-400">
                    <BookOpen size={20} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-brand-800 dark:text-white tracking-tight">
                    {t('studies')}
                  </h2>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-3 py-1 border border-neutral-200 dark:border-neutral-700 rounded-md">
                  {lang === 'ar' ? 'معلومات الوكالة العراقية الصينية' : lang === 'zh' ? '伊中通讯社智库信息' : lang === 'ckb' ? 'زانیاری ئاژانسی عێراقی - چینی' : 'Iraqi-Chinese Agency Information'}
                </span>
              </div>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 min-w-0">
                {studies.map((study) => {
                  const isLocked = study.isPrivate && !isSubscribed;
                  return (
                    <div 
                      key={study.id}
                      onClick={() => setSelectedStudy(study)}
                      className="group cursor-pointer flex flex-col justify-between bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 hover:border-brand-800/60 transition-all duration-300 hover:scale-[1.02] hover:brightness-105 rounded-xl overflow-hidden shadow-sm hover:shadow-lg"
                    >
                      <div className="space-y-4">
                        {study.imageUrl && (
                          <div className="relative w-full aspect-video overflow-hidden border-b border-neutral-200 dark:border-neutral-700">
                            <img 
                              src={study.imageUrl} 
                              alt={getStudyTitle(study)} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            {isLocked && (
                              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                                <div className="bg-black/80 text-amber-400 text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 font-bold uppercase tracking-wider shadow-sm border border-amber-500/30">
                                  <Lock size={12} className="animate-pulse" />
                                  <span>{lang === 'ar' ? 'مغلق' : lang === 'ckb' ? 'داخراو' : lang === 'zh' ? '加锁专享' : 'Premium Lock'}</span>
                                </div>
                              </div>
                            )}
                            <div className="absolute top-3 start-3 flex gap-1.5">
                              {study.isPrivate ? (
                                <span className="bg-amber-600 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                                  PREMIUM
                                </span>
                              ) : (
                                <span className="bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                                  OPEN ACCESS
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="p-5 space-y-3">
                          <div className="flex items-center gap-2 text-xs uppercase text-neutral-500 dark:text-neutral-400 font-bold tracking-wider">
                            <span>{study.author?.name || 'Research Desk'}</span>
                            <span>•</span>
                            <span>{new Date(study.createdAt).toLocaleDateString(dateLocale.code)}</span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold leading-snug group-hover:text-brand-700 dark:group-hover:text-brand-400 text-brand-800 dark:text-white transition-colors line-clamp-3">
                            {getStudyTitle(study)}
                          </h3>
                          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed">
                            {getStudyExcerpt(study)}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0">
                        <div className="w-full py-2.5 px-4 text-center text-xs font-bold uppercase tracking-wider bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:border-brand-800 text-neutral-800 dark:text-neutral-100 hover:text-white hover:bg-brand-800 dark:hover:bg-brand-700 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-2xs">
                          <span>{study.isPrivate ? t('premiumStudy') : 'Read Access'}</span>
                          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </ErrorBoundary>
        </div>
      )}

      {/* 3. Political News Newsboard */}
      {articles.filter(a => a.category?.slug === 'politics').length > 0 && (
        <div className="w-full my-6">
          <ErrorBoundary inline lang={lang} title="Political News & Geostrategy">
            <section className="bg-white dark:bg-neutral-900 border-t-4 border-brand-800 p-4 sm:p-6 md:p-8 shadow-xs rounded-lg">
              <div className="flex justify-between items-baseline border-b border-brand-800/15 pb-3 mb-6">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-brand-800 dark:text-neutral-100 uppercase flex items-center gap-2">
                  <span className="w-3.5 h-3.5 bg-brand-800"></span>
                  {lang === 'ar' ? 'الأخبار السياسية' : lang === 'zh' ? '政治新闻' : lang === 'ckb' ? 'هەواڵە سیاسییەکان' : 'Political News'}
                </h2>
                <Link 
                  to={`/${lang}/category/politics`} 
                  className="text-xs font-black uppercase tracking-widest text-brand-800 hover:underline"
                >
                  {lang === 'ar' ? 'عرض المزيد ←' : lang === 'zh' ? '查看更多 →' : lang === 'ckb' ? 'بینینی زیاتر ←' : 'View More →'}
                </Link>
              </div>
              
              <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 min-w-0">
                {articles.filter(a => a.category?.slug === 'politics').slice(0, 10).map((article) => {
                  const tr = getTranslation(article);
                  return (
                    <div 
                      key={article.id}
                      onClick={() => navigate(`/${lang}/article/${article.slug}`)}
                      className="cursor-pointer group flex flex-col h-full bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 transition-all duration-300 rounded overflow-hidden shadow-sm hover:shadow-md"
                    >
                      {article.imageUrl ? (
                        <div className="relative w-full aspect-[4/3] overflow-hidden border-b border-neutral-200 dark:border-neutral-700 shrink-0">
                          <img 
                            src={article.imageUrl} 
                            alt={tr?.title || 'Political News'} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            fetchPriority="low"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-[4/3] bg-brand-800/10 flex items-center justify-center shrink-0">
                          <span className="text-gray-400 italic text-xs">No Image</span>
                        </div>
                      )}
                      
                      <div className="p-3 flex flex-col flex-grow">
                        <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-2">
                          {new Date(article.createdAt).toLocaleDateString(dateLocale.code)}
                        </span>
                        <h3 className="font-bold text-sm leading-snug text-brand-800 dark:text-neutral-100 group-hover:text-brand-700 transition-colors line-clamp-3">
                          {tr?.title}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </ErrorBoundary>
        </div>
      )}

      {/* 4. Opinion & Analysis Board */}
      {articles.filter(a => a.category?.slug === 'opinion').length > 0 && (
        <div className="w-full my-6">
          <ErrorBoundary inline lang={lang} title="Sovereign Opinion & Analysis">
            <section className="bg-white dark:bg-neutral-900 border-t-4 border-b-2 border-brand-800 p-4 sm:p-6 md:p-8 animate-fadeIn shadow-xs rounded-lg">
              <div className="flex justify-between items-baseline border-b border-brand-800/15 pb-3 mb-6">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-brand-800 dark:text-neutral-100 uppercase flex items-center gap-2">
                  <span className="w-3.5 h-3.5 bg-brand-800 rounded-2xs"></span>
                  {lang === 'ar' ? 'آراء وتحليلات' : lang === 'zh' ? '观点与深度分析' : lang === 'ckb' ? 'ڕاو بۆچوون و شیکردنەوە' : 'Opinion & Analysis'}
                </h2>
                <Link 
                  to={`/${lang}/category/opinion`} 
                  className="text-xs font-black uppercase tracking-widest text-brand-800 hover:underline flex items-center gap-1 group"
                >
                  <span>{lang === 'ar' ? 'عرض جميع الآراء' : lang === 'zh' ? '查看所有观点' : lang === 'ckb' ? 'بینینی هەموو ڕاکان' : 'View All Opinions'}</span>
                  <span className="group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1">→</span>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x rtl:divide-x-reverse divide-ink-900/10 dark:divide-neutral-800">
                {articles.filter(a => a.category?.slug === 'opinion').slice(0, 4).map((article, idx) => {
                  const tr = getTranslation(article);
                  const authorName = (article as any).author?.name || 'Staff Writer';
                  const initial = authorName.replace(/^(Dr\.|Amb\.|Prof\.)\s+/i, '').charAt(0);
                  const avatarBg = ['bg-brand-50 dark:bg-brand-800/30', 'bg-amber-50 dark:bg-amber-900/30', 'bg-emerald-50 dark:bg-emerald-900/30', 'bg-stone-100 dark:bg-neutral-800'][idx % 4];
                  const textAccent = ['text-brand-800 dark:text-brand-400', 'text-amber-800 dark:text-amber-400', 'text-emerald-800 dark:text-emerald-400', 'text-brand-800 dark:text-neutral-200'][idx % 4];
                  
                  return (
                    <div 
                      key={article.id}
                      onClick={() => navigate(`/${lang}/article/${article.slug}`)}
                      className="cursor-pointer group flex flex-col justify-between p-3.5 rounded-xl border border-transparent hover:border-brand-800/20 hover:bg-brand-50/40 dark:hover:bg-neutral-800/50 transition-all duration-300 hover:scale-[1.02] hover:brightness-105 shadow-none hover:shadow-md"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-base font-black border border-brand-800/10 shrink-0 shadow-xs", avatarBg, textAccent)}>
                            {initial}
                          </div>
                          <div className="leading-tight">
                            <h4 className="text-xs font-black uppercase tracking-wider text-brand-800 dark:text-neutral-100 group-hover:text-brand-700 transition-colors">
                              {authorName}
                            </h4>
                            <span className="text-xs uppercase font-bold text-gray-500 dark:text-neutral-400 block tracking-wider">
                              {idx < 2 ? (lang === 'zh' ? '特约撰稿人' : 'Contributor') : (lang === 'zh' ? '智库学者' : 'Guest Analyst')}
                            </span>
                          </div>
                        </div>

                        <h3 className="font-bold text-base sm:text-lg leading-snug text-brand-800 dark:text-white group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors line-clamp-3 italic pt-2 border-t border-brand-800/10">
                          “{tr?.title}”
                        </h3>
                        
                        <div className="space-y-2">
                          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed">
                            {tr?.excerpt || tr?.content?.substring(0, 160)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                        <span>{new Date(article.createdAt).toLocaleDateString(dateLocale.code)}</span>
                        <span className="text-brand-800 dark:text-brand-400 group-hover:underline uppercase tracking-wider">Read Column →</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </ErrorBoundary>
        </div>
      )}

      {/* 5. Finance & Economics Cluster */}
      <div id="finance-economics" className="w-full my-6">
        <ErrorBoundary inline lang={lang} title="ICA Finance & Economics Journal">
          <IcaFinanceEconomicsSection lang={lang as Locale} />
        </ErrorBoundary>
      </div>

      <div id="business" className="w-full my-6">
        <ErrorBoundary inline lang={lang} title="ICA Sovereign Business & Investment Hub">
          <IcaBusinessSection lang={lang as Locale} />
        </ErrorBoundary>
      </div>

      <div id="settlement-sourcing" className="w-full my-6">
        <ErrorBoundary inline lang={lang} title="Bilateral Settlement & Sourcing Services">
          <PaymentAndSourcingSection lang={lang as Locale} />
        </ErrorBoundary>
      </div>

      <div id="products-showcase" className="w-full my-6">
        <ErrorBoundary inline lang={lang} title="Chinese Institutional Products Showcase">
          <ChineseProductsShowcase lang={lang as Locale} />
        </ErrorBoundary>
      </div>

      {/* Strategic Partners Placement (User Requested) */}
      <div className="w-full my-6">
        <ErrorBoundary inline lang={lang} title="Strategic Partners - Institutional Network">
          <PartnersSection lang={lang as Locale} />
        </ErrorBoundary>
      </div>

      {/* Belt & Road Tracking Section (Extracted to Full View) */}
      <div id="belt-road-tracking" className="w-full my-6">
        <ErrorBoundary inline lang={lang} title="Belt & Road Tracking Observatory">
          <BeltRoadTrackingSection lang={lang as Locale} />
        </ErrorBoundary>
      </div>

      {/* 6. Credibility Reinforcement (Placement #1) */}
      <div className="w-full my-6">
        <ErrorBoundary inline lang={lang} title="Strategic Partners & Institutional Affiliates">
          <PartnersSection lang={lang as Locale} />
        </ErrorBoundary>
      </div>

      {/* 7. Culture & Society Cluster */}
      <div id="cultural-exchange" className="w-full my-6">
        <ErrorBoundary inline lang={lang} title="Sino-Iraqi Cultural & Educational Exchange">
          <CulturalExchangeSection lang={lang as Locale} />
        </ErrorBoundary>
      </div>

      <div className="w-full my-6">
        <ErrorBoundary inline lang={lang} title="Women Leadership & Policy Forum">
          <WomenSection lang={lang as Locale} />
        </ErrorBoundary>
      </div>

      <div className="w-full my-6">
        <ErrorBoundary inline lang={lang} title="Trending Bilateral Publications">
          <TrendingBooksSection lang={lang as Locale} />
        </ErrorBoundary>
      </div>

      <div className="w-full my-6">
        <ErrorBoundary inline lang={lang} title="Recommended Academic Spotlight">
          <RecommendedBooksSection lang={lang as Locale} />
        </ErrorBoundary>
      </div>

      {/* 8. Travel & Mobility Cluster */}
      <div id="mobility" className="w-full my-6">
        <ErrorBoundary inline lang={lang} title="Sino-Iraqi Aviation & E-Visa Hub">
          <VisaFlightSection lang={lang} />
        </ErrorBoundary>
      </div>

      <div id="tourism" className="w-full my-6">
        <ErrorBoundary inline lang={lang} title="Bilateral Tourism & Heritage Showcase">
          <TourismSection lang={lang as Locale} />
        </ErrorBoundary>
      </div>

      {/* 9. Specialized Industry Tracks */}
      <div className="w-full my-6">
        <ErrorBoundary inline lang={lang} title="Specialized Bilateral Industry Tracks">
          <section className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border-0 relative shadow-sm rounded-2xl p-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/80 dark:from-neutral-800/20 dark:to-neutral-900/80 pointer-events-none" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {['ai', 'food-beverage', 'expo', 'business-statistics'].map((catSlug) => {
                const sectionArticles = articles.filter(a => a.category?.slug === catSlug).slice(0, 3);
                if (sectionArticles.length === 0) return null;
                
                let title = '';
                if (catSlug === 'ai') title = t('ai');
                if (catSlug === 'food-beverage') title = t('foodBeverage');
                if (catSlug === 'expo') title = t('expo');
                if (catSlug === 'business-statistics') title = t('businessStats');
                
                return (
                  <div key={catSlug} className="p-4 sm:p-5 flex flex-col space-y-4 rounded-xl bg-white/40 dark:bg-neutral-800/40 backdrop-blur-md border-0 relative group shadow-xs overflow-hidden">
                    <h3 className="text-sm sm:text-base uppercase font-black tracking-widest text-brand-800 dark:text-neutral-100 border-b-2 border-brand-800 pb-1 w-fit">
                      {title}
                    </h3>
                    {sectionArticles.map((article) => (
                      <div 
                        key={article.id}
                        onClick={() => navigate(`/${lang}/article/${article.slug}`)}
                        className="cursor-pointer group/item hover:bg-white/60 dark:hover:bg-white/[0.08] p-3 -mx-2 rounded-lg transition-all duration-300 hover:scale-[1.01]"
                      >
                        <h4 className="text-sm font-bold leading-tight group-hover/item:text-brand-700 text-ink-900 dark:text-neutral-100 transition-colors line-clamp-3">
                          {getTranslation(article)?.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1 uppercase font-bold opacity-70">
                          {new Date(article.createdAt).toLocaleDateString(dateLocale.code)}
                        </p>
                      </div>
                    ))}
                    <div className="absolute -bottom-4 left-4 right-4 h-6 bg-white/90 dark:bg-neutral-900/90 blur-xl pointer-events-none" />
                  </div>
                );
              })}
            </div>
          </section>
        </ErrorBoundary>
      </div>

      {/* 10. Credibility Closing (Placement #2) */}
      <div className="w-full my-6">
        <ErrorBoundary inline lang={lang} title="Strategic Partners">
          <PartnersSection lang={lang as Locale} />
        </ErrorBoundary>
      </div>

      {/* 11. Institutional Contact */}
      <div id="contact" className="w-full my-6">
        <ErrorBoundary inline lang={lang} title="Institutional Contact & Support">
          <ContactUs lang={lang as Locale} />
        </ErrorBoundary>
      </div>

      {/* 12. Deep Intel Study Detail Modal (Hidden until triggered) */}
      {selectedStudy && (
        <div 
          className="fixed inset-0 bg-brand-800/85 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6 md:p-8"
          onClick={() => setSelectedStudy(null)}
        >
          <div 
            className="bg-white border-x border-brand-800 max-w-3xl w-full h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative text-start transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header toolbar */}
            <div className="px-6 py-4 bg-white border-b border-brand-800/10 flex justify-between items-center shrink-0">
              <span className="text-xs font-black uppercase text-brand-800 tracking-widest flex items-center gap-1.5">
                <Sparkles size={12} className="text-amber-500 animate-pulse" />
                {selectedStudy.isPrivate ? t('premiumStudy') : 'Open Research Report'}
              </span>
              <button 
                onClick={() => setSelectedStudy(null)}
                className="text-brand-800 hover:text-brand-700 font-black text-xs uppercase tracking-widest border border-brand-800/20 px-3 py-1 hover:border-brand-800 transition-colors cursor-pointer"
              >
                {lang === 'ar' ? '✕ إغلاق' : lang === 'ckb' ? '✕ داخستن' : lang === 'zh' ? '✕ 关闭' : '✕ Close'}
              </button>
            </div>

            {/* Content wrapper */}
            <div className="flex-grow overflow-y-auto">
              <div className="p-6 md:p-12">
                <h1 className="text-3xl md:text-5xl font-black leading-tight text-center text-brand-800 tracking-tight mb-6">
                  {getStudyTitle(selectedStudy)}
                </h1>

                <div className="flex justify-center items-center gap-3 text-xs font-bold uppercase mb-12 opacity-60 text-brand-800 border-y border-double border-brand-800/20 py-2.5">
                  <span>By {selectedStudy.author?.name || 'Senior Fellow'}</span>
                  <span>•</span>
                  <span>
                    {new Date(selectedStudy.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : lang === 'zh' ? 'zh-CN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>

                {selectedStudy.imageUrl && (
                  <div className="w-full mb-12 overflow-hidden rounded-xs border border-brand-800/10 relative aspect-video shadow-sm">
                    <img 
                      src={selectedStudy.imageUrl} 
                      alt={getStudyTitle(selectedStudy)} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {/* DECISION: RENDER STUDY BODY OR THE PREMIUM CONVERSION PAYWALL */}
                {selectedStudy.isPrivate && !isSubscribed ? (
                  /* GORGEOUS PREMIUM PAYWALL WALL */
                  <div className="space-y-8 bg-white border border-amber-200 rounded-lg p-6 md:p-8 shadow-sm">
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-200">
                        <Lock size={22} className="animate-pulse" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                        {lang === 'ar' ? 'محتوى حصري للمشتركين المميزين' : lang === 'ckb' ? 'بەرنامەی تایبەت بۆ بەشداربووان' : lang === 'zh' ? '智库付费专享机密报告' : 'Exclusive Premium Research Entry'}
                      </h3>
                      <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                        {lang === 'ar' 
                          ? 'هذا التقرير الاستراتيجي المعمق متاح حصرياً لحاملي اشتراكات النخبة والمؤسسات لدى وكالة العراق والصين.' 
                          : lang === 'ckb' 
                          ? 'ئەم ڕاپۆرتە قووڵە ستراتیژییە تەنها بۆ بەشداربووانی نایاب و نێودەوڵەتی بەردەستە.' 
                          : lang === 'zh' 
                          ? '本深度战略分析报告仅供具有活跃订阅权限的 伊拉克-中国通讯社 高级及企业会员阅读。' 
                          : 'This strategic bilateral information dossier is restricted to active premium and enterprise portfolio holders of Iraqi-Chinese Agency.'}
                      </p>
                    </div>

                    <div className="border-t border-neutral-100 pt-6 space-y-4">
                      <h4 className="text-xs uppercase font-black text-brand-800 tracking-wider">
                        {lang === 'ar' ? 'الملخص التنفيذي المتاح' : lang === 'ckb' ? 'کورتەی سەرەکی بەردەست' : lang === 'zh' ? '公开摘要' : 'Abstract Overview'}
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-neutral-300 italic bg-white dark:bg-neutral-800 p-4 border-l-4 border-amber-500 leading-relaxed ">
                        {getStudyExcerpt(selectedStudy)}
                      </p>
                    </div>

                    {/* Subscription Pricing Widget Embedded Directly */}
                    <div className="space-y-4 border-t border-neutral-100 pt-6">
                      <div className="text-center">
                        <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                          {t('subscribeToRead')}
                        </span>
                      </div>
                      <SubscriptionCard />
                    </div>
                  </div>
                ) : (
                  /* FULL TEXT MARKDOWN RENDERER */
                  <div 
                    className="prose prose-neutral max-w-none text-lg leading-relaxed text-gray-800 space-y-6 whitespace-pre-wrap md:px-4"
                    dir={lang === 'ar' || lang === 'ckb' ? 'rtl' : 'ltr'}
                  >
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedStudy.isPrivate ? getStudyContent(selectedStudy).replace(/\n/g, '<br/>') : getStudyContent(selectedStudy).replace(/\n/g, '<br/>')) }} />
                  </div>
                )}

                {/* RELATED RESEARCH STUDIES SECTION */}
                <div className="mt-12 pt-8 border-t border-double border-brand-800/20 space-y-6">
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-brand-800" />
                    <h3 className="text-lg font-black text-brand-800">
                      {lang === 'ar' ? 'الدراسات والبحوث ذات الصلة' : lang === 'ckb' ? 'توێژینەوە پەیوەندیدارەکان' : lang === 'zh' ? '相关专题研究' : 'Related Research Studies'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {studies
                      .filter(s => s.id !== selectedStudy.id)
                      .slice(0, 2)
                      .map((related) => {
                        const isRelatedLocked = related.isPrivate && !isSubscribed;
                        return (
                          <div 
                            key={related.id}
                            onClick={() => setSelectedStudy(related)}
                            className="group cursor-pointer flex gap-3 p-3 bg-white border border-neutral-200 hover:border-brand-800 rounded hover:shadow-sm transition-all duration-300 text-start"
                          >
                            {related.imageUrl && (
                              <div className="w-20 h-20 shrink-0 overflow-hidden rounded relative">
                                <img 
                                  src={related.imageUrl} 
                                  alt={getStudyTitle(related)} 
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  referrerPolicy="no-referrer"
                                />
                                {isRelatedLocked && (
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-amber-400">
                                    <Lock size={10} />
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="space-y-1">
                              <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${related.isPrivate ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                {related.isPrivate ? 'PREMIUM' : 'OPEN'}
                              </span>
                              <h4 className="text-xs font-bold leading-tight line-clamp-2 text-brand-800 group-hover:text-brand-700 transition-colors mt-1">
                                {getStudyTitle(related)}
                              </h4>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;
