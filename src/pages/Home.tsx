import DOMPurify from 'dompurify';
import { SubscriptionCard } from '../components/SubscriptionCard';
import { motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Article, Locale, Study, MarketData } from '../types';
import { useI18n } from '../hooks/useI18n';
import { useAuthStore } from '../store/useAuthStore';
import { BookOpen, Lock, ChevronRight, ChevronLeft, Sparkles, AlertCircle, Activity, Flame, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ar, zhCN, enUS } from 'date-fns/locale';
import { cn } from '../lib/utils';
import { InvestIraq } from '../components/InvestIraq';
import { ContactUs } from '../components/ContactUs';
import { MarketIndicesSection } from '../components/MarketIndicesSection';
import { TrendingBooksSection } from '../components/TrendingBooksSection';
import PartnersSection from "../components/PartnersSection";
import SourcingSection from "../components/SourcingSection";
import { RecommendedBooksSection } from '../components/RecommendedBooksSection';
import { TourismSection } from '../components/TourismSection';
import { WomenSection } from '../components/WomenSection';
import { VisaFlightSection } from '../components/VisaFlightSection';
import { PaymentGatewayShowcase } from '../components/payments/PaymentGatewayShowcase';
import { ArticleModal } from '../components/ArticleModal';
import { NewsletterSubscriptionModal } from '../components/NewsletterSubscriptionModal';
import { EditorialShowcaseSection } from '../components/EditorialShowcaseSection';
import { BricsSection } from '../components/BricsSection';
import { ErrorBoundary } from '../components/ErrorBoundary';

export function Home() {
  const { lang } = useParams<{ lang: Locale }>();
  const { t } = useI18n(lang!);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
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

  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ['articles'],
    queryFn: async () => {
      const res = await fetch('/api/articles');
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    }
  });

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
      if (name === 'Belt & Road') return 'ڕێگای ئاوریشم';
      return name;
    }
    return category.nameEn || category.name;
  }, [lang]);

  const dateLocale = useMemo(() => lang === 'ar' || lang === 'ckb' ? ar : lang === 'zh' ? zhCN : enUS, [lang]);

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
    <div className="flex flex-col w-full bg-paper-50 dark:bg-neutral-900 transition-colors">
      
      {/* IRAQ-CHINA INTELLIGENCE WIRE - VERTICAL TICKER */}
      <div className="w-full bg-white dark:bg-neutral-900 text-ink-900 dark:text-white border-b border-gray-200 dark:border-neutral-800 flex overflow-hidden h-12 relative items-center shadow-xs">
        <div className="flex-shrink-0 font-black text-brand-800 dark:text-brand-400 pe-6 border-e border-gray-200 dark:border-neutral-800 uppercase tracking-[0.2em] text-xs sm:text-sm z-10 bg-white dark:bg-neutral-900 h-full flex items-center px-4">
          <Activity size={14} className="me-2 animate-pulse text-brand-800 dark:text-brand-400" />
          {lang === 'ar' ? 'سلك المعلومات' : lang === 'zh' ? '信息简报' : lang === 'ckb' ? 'تێلیگرافی هەواڵ' : 'INTELLIGENCE WIRE'}
        </div>
        <div className="flex-grow h-full relative overflow-hidden ms-6">
          <div className="animate-marquee-vertical flex flex-col absolute top-0 left-0 w-full">
            {[...articles.slice(0, 8), ...articles.slice(0, 8)].map((article, i) => {
              const tr = getTranslation(article);
              return (
                 <div key={`${article.id}-${i}`} className="h-12 flex items-center shrink-0 cursor-pointer group" onClick={() => setSelectedArticle(article)}>
                   <span className="text-xs text-brand-800 dark:text-brand-400 me-4 shrink-0 uppercase font-bold">{new Date(article.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})}</span>
                   <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-brand-800 dark:text-neutral-100 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors truncate">{tr?.title}</span>
                 </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Section 1: Full-Scale Upper Trending Carousel with Covers & Navigation Arrows */}
      <section className="w-full p-4 sm:p-6 bg-brand-800 text-white border-y-4 border-brand-800 relative overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 bg-white/10 text-white rounded-md shadow-xs border border-white/20 backdrop-blur-sm">
              <Flame size={18} className="animate-pulse text-white" />
            </span>
            <h3 className="text-lg sm:text-xl font-black uppercase tracking-widest text-white ">
              {t('trending')}
            </h3>
            <span className="hidden sm:inline-block text-xs text-white ms-2 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20 font-bold backdrop-blur-sm">
              • {articles.length} {lang === 'ar' ? 'موضوعات شائعة' : lang === 'zh' ? '热门主题' : lang === 'ckb' ? 'بابەتە گەرمەکان' : 'Featured Topics'}
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleTrendingScroll('left')}
              className="p-1.5 sm:p-2 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 shadow-sm cursor-pointer active:scale-95 backdrop-blur-sm"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={18} className="rtl:rotate-180" />
            </button>
            <button
              onClick={() => handleTrendingScroll('right')}
              className="p-1.5 sm:p-2 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 shadow-sm cursor-pointer active:scale-95 backdrop-blur-sm"
              aria-label="Scroll Right"
            >
              <ChevronRight size={18} className="rtl:rotate-180" />
            </button>
          </div>
        </div>

        {/* Scrollable Topic Covers Track */}
        <div 
          ref={trendingScrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-3 px-1.5 -mx-1.5"
        >
          {articles.map((article) => {
            const tr = getTranslation(article);
            return (
              <div 
                key={`trending-cover-${article.id}`} 
                onClick={() => setSelectedArticle(article)}
                className="group shrink-0 w-[250px] sm:w-[290px] bg-black/25 hover:bg-black/35 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.025] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.35)] shadow-[0_8px_24px_rgba(0,0,0,0.25)] cursor-pointer flex flex-col justify-between"
              >
                {/* Topic Cover Image */}
                <div className="relative w-full h-[155px] sm:h-[165px] bg-black/30 overflow-hidden border-b border-white/15">
                  {article.imageUrl ? (
                    <img 
                      src={article.imageUrl} 
                      alt={tr?.title || 'Topic Cover'}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-xs text-white font-bold">
                      <span className="italic text-xs text-white/90">
                        {lang === 'ar' ? 'موضوع الوكالة' : lang === 'zh' ? '伊拉克-中国通讯社专题' : lang === 'ckb' ? 'بابەتی ئاژانس' : 'Iraqi-Chinese Agency Topic'}
                      </span>
                    </div>
                  )}
                  {/* Category Badge - Clean Glass Pill */}
                  <div className="absolute top-2.5 start-2.5 bg-black/50 backdrop-blur-md text-white text-xs font-black uppercase px-2.5 py-1 rounded-sm shadow-xs tracking-wider border border-white/25">
                    {getCategoryName(article.category)}
                  </div>
                </div>

                {/* Topic Info */}
                <div className="p-4 flex flex-col justify-between flex-grow space-y-3 bg-white/5 backdrop-blur-xs">
                  <h4 className="text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-white/95 transition-colors line-clamp-2 leading-snug antialiased relative z-10">
                    {tr?.title}
                  </h4>
                  <p className="text-xs text-white/85 group-hover:text-white font-normal leading-relaxed line-clamp-2 antialiased tracking-normal relative z-10 transition-colors">
                    {tr?.excerpt}
                  </p>
                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs font-bold text-white/85 pt-3 border-t border-white/15 relative z-10">
                    <span className="flex items-center gap-1.5 tracking-wide antialiased text-white/90">
                      <Clock size={13} className="text-white shrink-0 stroke-[2.5]" />
                      {formatDistanceToNow(new Date(article.createdAt), { addSuffix: true, locale: dateLocale })}
                    </span>
                    <span className="text-white font-black group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 text-sm">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
            onClick={() => setSelectedArticle(leadStory)}
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
                {formatDistanceToNow(new Date(leadStory.createdAt), { addSuffix: true, locale: dateLocale })}
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
      <section className="lg:col-span-5 flex flex-col p-4 sm:p-6 md:p-8 space-y-8 bg-neutral-50 dark:bg-neutral-900/50">
        <BricsSection lang={lang as Locale} />
        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg shadow-sm p-6 flex-grow">
          <h3 className="text-base sm:text-lg uppercase font-black tracking-widest mb-6 flex items-center text-brand-800 dark:text-neutral-100 border-b-2 border-brand-800 pb-3">
            <span className="w-2.5 h-2.5 bg-brand-800 rounded-sm me-3 animate-pulse"></span>
            {t('beltRoad')}
          </h3>
          <div className="space-y-5">
            <div className="border-s-4 border-brand-800 ps-4 bg-gray-50 dark:bg-neutral-800/80 p-3.5 rounded-e-md shadow-xs">
              <div className="text-xs font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest mb-1">Maysan Province</div>
              <div className="text-sm font-bold text-ink-900 dark:text-neutral-100">Solar Farm Stage 2</div>
              <div className="w-full bg-gray-200 dark:bg-neutral-700 h-2 mt-3 rounded-full overflow-hidden">
                <div className="bg-brand-800 h-2 w-[85%] transition-all duration-500 rounded-full"></div>
              </div>
            </div>
            <div className="border-s-4 border-gray-300 dark:border-neutral-600 ps-4 bg-white dark:bg-neutral-800/40 border border-y-gray-100 border-r-gray-100 dark:border-y-neutral-800 dark:border-r-neutral-800 p-3.5 rounded-e-md">
              <div className="text-xs font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest mb-1">Anbar Refinery</div>
              <div className="text-sm font-bold text-ink-900 dark:text-neutral-100">Technical Feasibility</div>
              <div className="w-full bg-gray-200 dark:bg-neutral-700 h-2 mt-3 rounded-full overflow-hidden">
                <div className="bg-gray-400 dark:bg-neutral-500 h-2 w-[32%] transition-all duration-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-base sm:text-lg uppercase font-black border-b border-gray-200 dark:border-neutral-800 pb-3 mb-6 text-brand-800 dark:text-neutral-100 tracking-wider">
              {t('popular')}
            </h3>
            <ol className="space-y-5 list-decimal list-inside text-base text-ink-900 dark:text-neutral-200">
              {popularStories.map((article) => (
                <li 
                  key={`pop-${article.id}`} 
                  onClick={() => setSelectedArticle(article)}
                  className="font-bold leading-snug cursor-pointer hover:text-brand-800 dark:hover:text-brand-400 transition-colors border-b border-gray-100 dark:border-neutral-800/50 pb-3 last:border-0 last:pb-0"
                >
                  <span className="inline-block align-top max-w-[92%] ms-2 hover:underline">
                    {getTranslation(article)?.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        
        {/* LIVE COVERAGE HIGHLIGHT */}
        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-6 rounded-lg shadow-sm hover:border-brand-800/40 transition-all duration-300">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 dark:bg-brand-950/80 text-brand-800 dark:text-brand-400 border border-brand-200 dark:border-brand-800/50 rounded-sm font-black uppercase text-xs tracking-widest mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-800 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-800"></span>
            </span>
            {lang === 'ar' ? 'تغطية مباشرة' : lang === 'ckb' ? 'رووماڵی ڕاستەوخۆ' : lang === 'zh' ? '现场直播' : 'Live Coverage'}
          </div>
          <h3 className="font-black text-xl mb-2.5 leading-snug text-brand-800 dark:text-white">
            <Link to={`/${lang}/live/iraq-china-summit-2026`} className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors">
              {lang === 'ar' ? 'القمة الاقتصادية العراقية الصينية 2026' : lang === 'ckb' ? 'لووتکەی ئابووری عێراق-چین ٢٠٢٦' : lang === 'zh' ? '2026年伊拉克-中国经济峰会' : 'Iraq-China Economic Summit 2026'}
            </Link>
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mb-5 leading-relaxed font-normal">
            {lang === 'ar' 
              ? 'تحديثات في الوقت الفعلي من قمة الشراكة الاستراتيجية في بكين.' 
              : lang === 'ckb' 
              ? 'تایبەتمەندی و نوێکاری ڕاستەوخۆ لە لوتکەی پەکین بۆ هاوبەشی ستراتیژی.' 
              : lang === 'zh' 
              ? '北京战略合作伙伴关系峰会实时更新。' 
              : 'Real-time updates from the strategic partnership summit in Beijing.'}
          </p>
          <Link 
            to={`/${lang}/live/iraq-china-summit-2026`} 
            className="inline-flex items-center justify-between w-full px-4 py-3 bg-brand-800 hover:bg-brand-700 text-white rounded-md text-xs font-black uppercase tracking-wider transition-all shadow-sm group"
          >
            <span>{lang === 'ar' ? 'متابعة التحديثات' : lang === 'ckb' ? 'سەیرکردنی نوێکارییەکان' : lang === 'zh' ? '关注更新' : 'Follow Updates'}</span>
            <span className="group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 text-sm">→</span>
          </Link>
        </div>

        {/* ENTERPRISE CALL TO ACTION */}
        <SubscriptionCard />
      </section>
      </div>

      <ErrorBoundary inline lang={lang} title="Strategic Partners">
        <PartnersSection lang={lang as Locale} />
      </ErrorBoundary>

      {/* CHINA & HONG KONG STOCK CHARTS & INDICES TERMINAL SECTION */}
      <div id="market" className="w-full my-6">
        <MarketIndicesSection data={marketData} lang={lang!} />
      </div>

      {/* OPINION & ANALYSIS BOARD */}
      {articles.filter(a => a.category?.slug === 'opinion').length > 0 && (
        <section className="w-full bg-white dark:bg-neutral-900 border-t-4 border-b-2 border-brand-800 p-4 sm:p-6 md:p-8 my-6 animate-fadeIn shadow-xs">
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
                  onClick={() => setSelectedArticle(article)}
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
                      {tr?.content && tr.content.length > 160 && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed opacity-85">
                          {tr.content.substring(160, 320)}...
                        </p>
                      )}
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
      )}

      {/* IRAQ-CHINA DAILY SPECIAL STUDIES & DEEP RESEARCH (SECTION 5) */}
      {studies.length > 0 && (
        <section className="w-full bg-white dark:bg-neutral-900 border-t-4 border-double border-brand-800 p-4 sm:p-6 md:p-8 space-y-6 shadow-xs my-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studies.map((study) => {
              const isLocked = study.isPrivate && !isSubscribed;
              return (
                <div 
                  key={study.id}
                  onClick={() => setSelectedStudy(study)}
                  className="group cursor-pointer flex flex-col justify-between bg-neutral-50/50 dark:bg-neutral-800/50 hover:bg-white dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-brand-800/60 transition-all duration-300 hover:scale-[1.02] hover:brightness-105 rounded-xl overflow-hidden shadow-sm hover:shadow-lg"
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
                    <button className="w-full py-2.5 px-4 text-center text-xs font-bold uppercase tracking-wider bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:border-brand-800 text-neutral-800 dark:text-neutral-100 hover:text-white hover:bg-brand-800 dark:hover:bg-brand-700 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-2xs">
                      <span>{study.isPrivate ? t('premiumStudy') : 'Read Access'}</span>
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ADDITIONAL SECTIONS */}
      <section className="w-full bg-paper-50 dark:bg-neutral-900 border-t border-brand-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x rtl:divide-x-reverse divide-ink-900/10 dark:divide-neutral-800 my-6 shadow-xs">
        {['ai', 'food-beverage', 'expo', 'business-statistics'].map((catSlug) => {
          const sectionArticles = articles.filter(a => a.category?.slug === catSlug).slice(0, 3);
          if (sectionArticles.length === 0) return null;
          
          let title = '';
          if (catSlug === 'ai') title = t('ai');
          if (catSlug === 'food-beverage') title = t('foodBeverage');
          if (catSlug === 'expo') title = t('expo');
          if (catSlug === 'business-statistics') title = t('businessStats');
          
          return (
            <div key={catSlug} className="p-4 sm:p-6 flex flex-col space-y-4">
              <h3 className="text-sm sm:text-base uppercase font-black tracking-widest text-brand-800 dark:text-neutral-100 border-b-2 border-brand-800 pb-1 w-fit">
                {title}
              </h3>
              {sectionArticles.map((article, i) => (
                <div 
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="cursor-pointer group hover:bg-black/[0.03] dark:hover:bg-white/[0.05] p-2.5 -mx-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:brightness-105"
                >
                  <h4 className="text-sm font-bold leading-tight group-hover:text-brand-700 text-black dark:text-black transition-colors line-clamp-3">
                    {getTranslation(article)?.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1 uppercase font-bold opacity-70">
                    {new Date(article.createdAt).toLocaleDateString(dateLocale.code)}
                  </p>
                </div>
              ))}
            </div>
          );
        })}
      </section>

      {/* GORGEOUS IMMERSIVE NEWSPAPER DETAIL OVERLAY MODAL */}
      {selectedArticle && (
        <ArticleModal 
          article={selectedArticle} 
          lang={lang!} 
          onClose={() => setSelectedArticle(null)} 
        />
      )}

      {/* DEEP INTEL STUDY DETAIL OVERLAY MODAL */}
      {selectedStudy && (
        <div 
          className="fixed inset-0 bg-brand-800/85 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6 md:p-8"
          onClick={() => setSelectedStudy(null)}
        >
          <div 
            className="bg-paper-50 border-x border-brand-800 max-w-3xl w-full h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative text-start transition-all duration-300"
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
                      <p className="text-sm text-gray-700 italic bg-neutral-50 p-4 border-l-4 border-amber-500 leading-relaxed ">
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
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getStudyContent(selectedStudy).replace(/\n/g, '<br/>')) }} />
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

      {/* POLITICAL NEWS SECTION */}
      {articles.filter(a => a.category?.slug === 'politics').length > 0 && (
        <section className="w-full bg-white dark:bg-neutral-900 border-t-4 border-brand-800 p-4 sm:p-6 md:p-8 my-6 shadow-xs">
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
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {articles.filter(a => a.category?.slug === 'politics').slice(0, 10).map((article) => {
              const tr = getTranslation(article);
              return (
                <div 
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="cursor-pointer group flex flex-col h-full bg-neutral-50/50 dark:bg-neutral-800/50 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 transition-all duration-300 rounded overflow-hidden shadow-sm hover:shadow-md"
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
      )}

      {/* Trending Books Section (Space for 4 trending books on web) */}
      <div className="w-full my-6">
        <TrendingBooksSection lang={lang as Locale} />
      </div>

      {/* Recommended Books Spotlight Section */}
      <div className="w-full my-6">
        <RecommendedBooksSection lang={lang as Locale} />
      </div>

      {/* Bilateral Tourism Showcase Section */}
      <div className="w-full my-6">
        <TourismSection lang={lang as Locale} />
      </div>

      {/* Women Leadership, Rights & Policy Forum */}
      <div className="w-full my-6">
        <WomenSection lang={lang as Locale} />
      </div>

      {/* Invest Iraq Section */}
      <div id="projects" className="w-full my-6">
        <InvestIraq lang={lang as Locale} />
      </div>

      {/* Real-Time IQD & E-CNY Bilateral Payment Gateway & Currency Conversion Service */}
      <div className="w-full my-6">
        <PaymentGatewayShowcase lang={lang as Locale} />
      </div>

      <div id="directory" className="h-0 invisible" />

      <div className="w-full my-6">
        <ErrorBoundary inline lang={lang} title="Sino-Iraqi Aviation & E-Visa Hub">
          <VisaFlightSection lang={lang} />
        </ErrorBoundary>
      </div>

      {/* Contact Us Section */}
      {/* Partners Section */}
      {/* Sourcing Section */}
      <SourcingSection lang={lang as Locale} />

      {/* Sovereign Editorial & Fellowship Showcase */}
      <div className="w-full my-6">
        <EditorialShowcaseSection lang={lang as Locale} />
      </div>

      <ErrorBoundary inline lang={lang} title="Strategic Partners">
        <PartnersSection lang={lang as Locale} />
      </ErrorBoundary>

      <div id="contact" className="w-full my-6">
        <ContactUs lang={lang as Locale} />
      </div>

      <NewsletterSubscriptionModal lang={lang as Locale} />

    </div>
  );
}
