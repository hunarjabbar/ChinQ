import { SubscriptionCard } from '../components/SubscriptionCard';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { useState, useCallback, useMemo } from 'react';
import { Article, Locale, Study } from '../types';
import { useI18n } from '../hooks/useI18n';
import { useAuthStore } from '../store/useAuthStore';
import { BookOpen, Lock, ChevronRight, Sparkles, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ar, zhCN, enUS } from 'date-fns/locale';
import { cn } from '../lib/utils';

export function Home() {
  const { lang } = useParams<{ lang: Locale }>();
  const { t } = useI18n(lang!);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
  
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
      return name;
    }
    return category.nameEn || category.name;
  }, [lang]);

  const dateLocale = useMemo(() => lang === 'ar' ? ar : lang === 'zh' ? zhCN : enUS, [lang]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8 w-full max-w-[1024px] mx-auto p-6">
        <div className="h-96 bg-neutral-200 rounded-lg w-full"></div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 max-w-[1024px] mx-auto w-full">
        <p className="text-gray-500 font-serif italic text-lg">No stories available at this time.</p>
      </div>
    );
  }

  const leadStory = articles[0];
  const secondaryStories = articles.slice(1, 4);
  const popularStories = articles.slice(0, 5); // Popular stories list

  return (
    <div className="flex flex-col w-full bg-[#FAFAFA]">
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x rtl:divide-x-reverse divide-[#111111]/10 w-full max-w-[1024px] mx-auto bg-[#FAFAFA] relative">
      
      {/* Column 1: Secondary Trending */}
      <section className="lg:col-span-3 p-6 flex flex-col space-y-6">
        <h3 className="text-[10px] uppercase font-black text-[#990000] border-b border-[#990000] pb-1 w-fit">
          {t('trending')}
        </h3>
        
        {secondaryStories.map((article) => {
          const tr = getTranslation(article);
          return (
            <div 
              key={article.id} 
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer hover:bg-black/[0.02] p-2 -mx-2 rounded transition-all duration-200"
            >
              <span className="text-[10px] text-gray-500 font-bold uppercase">
                {getCategoryName(article.category)}
              </span>
              <h4 className="font-serif text-lg leading-tight font-bold group-hover:text-[#990000] group-hover:underline mt-1 text-[#111111] transition-colors">
                {tr?.title}
              </h4>
              <p className="text-xs mt-2 text-gray-600 line-clamp-2">
                {tr?.excerpt}
              </p>
            </div>
          );
        })}
      </section>

      {/* Column 2: Lead Story */}
      <section className="lg:col-span-6 p-6 overflow-hidden">
        {leadStory && (
          <div 
            onClick={() => setSelectedArticle(leadStory)}
            className="cursor-pointer group"
          >
            <div className="relative mb-4 overflow-hidden rounded-sm border border-[#111111]/5">
              <div className="w-full h-[280px] bg-gray-200 overflow-hidden">
                {leadStory.imageUrl ? (
                  <img 
                    src={leadStory.imageUrl} 
                    alt={getTranslation(leadStory)?.title || 'Lead story image'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                    fetchPriority="high"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#111111]/5">
                    <span className="text-gray-400 font-serif italic">Image not available</span>
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 start-0 bg-[#990000] text-white text-[9px] font-bold uppercase px-2 py-1">
                {lang === 'ar' ? 'تقرير خاص' : lang === 'ckb' ? 'ڕاپۆرتی تایبەت' : lang === 'zh' ? '特别报道' : 'Special Report'}
              </div>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl font-black leading-[1.1] mb-4 text-center px-4 tracking-tight text-[#111111] group-hover:text-[#990000] group-hover:underline transition-colors">
              {getTranslation(leadStory)?.title}
            </h2>
            
            <div className="flex justify-center space-x-4 rtl:space-x-reverse text-[10px] font-bold uppercase mb-4 opacity-60 text-[#111111]">
              <span>By {(leadStory as any).author?.name || 'Staff Reporter'}</span>
              <span>•</span>
              <span>
                {formatDistanceToNow(new Date(leadStory.createdAt), { addSuffix: true, locale: dateLocale })}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-gray-800 first-letter:text-5xl first-letter:font-bold first-letter:font-serif first-letter:float-start first-letter:pe-2">
              {getTranslation(leadStory)?.excerpt || getTranslation(leadStory)?.content?.substring(0, 200)}...
            </p>
          </div>
        )}
      </section>

      {/* Column 3: Most Popular & Widget */}
      <section className="lg:col-span-3 flex flex-col">
        <div className="p-6 bg-gray-50 border-b border-[#111111]/10 flex-grow">
          <h3 className="text-[10px] uppercase font-black tracking-tighter mb-4 flex items-center text-[#111111]">
            <span className="w-2 h-2 bg-[#990000] rounded-full me-2"></span>
            {t('beltRoad')}
          </h3>
          <div className="space-y-4">
            <div className="border-s-2 border-[#111111] ps-3">
              <div className="text-[9px] font-bold opacity-50 text-[#111111]">Maysan Province</div>
              <div className="text-xs font-bold text-[#111111]">Solar Farm Stage 2</div>
              <div className="w-full bg-gray-200 h-1 mt-1 rounded-full overflow-hidden">
                <div className="bg-[#111111] h-1 w-[85%] transition-all duration-500"></div>
              </div>
            </div>
            <div className="border-s-2 border-gray-300 ps-3 opacity-60">
              <div className="text-[9px] font-bold text-[#111111]">Anbar Refinery</div>
              <div className="text-xs font-bold text-[#111111]">Technical Feasibility</div>
              <div className="w-full bg-gray-200 h-1 mt-1 rounded-full overflow-hidden">
                <div className="bg-[#111111] h-1 w-[32%] transition-all duration-500"></div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-[10px] uppercase font-black border-b border-[#111111] pb-1 mb-4 text-[#111111]">
              {t('popular')}
            </h3>
            <ol className="space-y-4 list-decimal list-inside text-sm text-[#111111]">
              {popularStories.map((article) => (
                <li 
                  key={`pop-${article.id}`} 
                  onClick={() => setSelectedArticle(article)}
                  className="font-serif font-bold leading-tight cursor-pointer hover:text-[#990000] transition-colors"
                >
                  <span className="inline-block align-top max-w-[90%] ms-1 hover:underline">
                    {getTranslation(article)?.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        
        {/* LIVE COVERAGE HIGHLIGHT */}
        <div className="bg-red-50 border border-red-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-3 text-[#990000] font-bold uppercase text-xs tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#990000] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#990000]"></span>
            </span>
            {lang === 'ar' ? 'تغطية مباشرة' : lang === 'ckb' ? 'رووماڵی ڕاستەوخۆ' : lang === 'zh' ? '现场直播' : 'Live Coverage'}
          </div>
          <h3 className="font-serif font-black text-xl mb-3">
            <Link to={`/${lang}/live/iraq-china-summit-2026`} className="hover:text-[#990000] transition-colors hover:underline">
              {lang === 'ar' ? 'القمة الاقتصادية العراقية الصينية 2026' : lang === 'ckb' ? 'لووتکەی ئابووری عێراق-چین ٢٠٢٦' : lang === 'zh' ? '2026年伊拉克-中国经济峰会' : 'Iraq-China Economic Summit 2026'}
            </Link>
          </h3>
          <p className="text-sm text-gray-600 mb-4">
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
            className="inline-block text-xs font-bold uppercase tracking-wider text-[#990000] hover:text-black transition-colors"
          >
            {lang === 'ar' ? 'متابعة التحديثات ←' : lang === 'ckb' ? 'سەیرکردنی نوێکارییەکان ←' : lang === 'zh' ? '关注更新 →' : 'Follow Updates →'}
          </Link>
        </div>

        {/* ENTERPRISE CALL TO ACTION */}
        <SubscriptionCard />
      </section>

      {/* OPINION & ANALYSIS BOARD */}
      {articles.filter(a => a.category?.slug === 'opinion').length > 0 && (
        <section className="w-full max-w-[1024px] mx-auto bg-white border-t-4 border-b-2 border-[#111111] p-6 md:p-8 mt-12 animate-fadeIn">
          <div className="flex justify-between items-baseline border-b border-[#111111]/15 pb-3 mb-6">
            <h2 className="font-serif text-2xl md:text-3xl font-black tracking-tight text-[#111111] uppercase flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-[#990000]"></span>
              {lang === 'ar' ? 'آراء وتحليلات' : lang === 'zh' ? '观点与深度分析' : lang === 'ckb' ? 'ڕاو بۆچوون و شیکردنەوە' : 'Opinion & Analysis'}
            </h2>
            <Link 
              to={`/${lang}/category/opinion`} 
              className="text-xs font-black uppercase tracking-widest text-[#990000] hover:underline"
            >
              {lang === 'ar' ? 'عرض جميع الآراء ←' : lang === 'zh' ? '查看所有观点 →' : lang === 'ckb' ? 'بینینی هەموو ڕاکان ←' : 'View All Opinions →'}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x rtl:divide-x-reverse divide-[#111111]/10">
            {articles.filter(a => a.category?.slug === 'opinion').slice(0, 4).map((article, idx) => {
              const tr = getTranslation(article);
              const authorName = (article as any).author?.name || 'Staff Writer';
              // Determine a classy initial for author avatar or just a clean icon
              const initial = authorName.replace(/^(Dr\.|Amb\.|Prof\.)\s+/i, '').charAt(0);
              // Choose a subtle warm signature color for opinion blocks
              const avatarBg = ['bg-rose-50', 'bg-amber-50', 'bg-emerald-50', 'bg-stone-100'][idx % 4];
              const textAccent = ['text-[#990000]', 'text-amber-800', 'text-emerald-800', 'text-[#111111]'][idx % 4];
              
              return (
                <div 
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="cursor-pointer group flex flex-col justify-between pt-4 md:pt-0 md:px-4 first:pl-0 last:pr-0 border-[#111111]/10"
                >
                  <div className="space-y-3">
                    {/* Author profile teaser */}
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-serif text-base font-black border border-[#111111]/10 shrink-0 shadow-xs", avatarBg, textAccent)}>
                        {initial}
                      </div>
                      <div className="leading-tight">
                        <h4 className="text-xs font-black uppercase tracking-wider text-[#111111] group-hover:text-[#990000] transition-colors">
                          {authorName}
                        </h4>
                        <span className="text-[9px] uppercase font-bold text-gray-500 block tracking-wider">
                          {idx < 2 ? (lang === 'zh' ? '特约撰稿人' : 'Contributor') : (lang === 'zh' ? '智库学者' : 'Guest Analyst')}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-base leading-snug text-[#111111] group-hover:text-[#990000] transition-colors line-clamp-3 italic pt-2 border-t border-[#111111]/5">
                      “{tr?.title}”
                    </h3>
                    
                    <p className="text-[11px] text-gray-600 line-clamp-3 leading-relaxed">
                      {tr?.excerpt}
                    </p>
                  </div>
                  
                  <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400 mt-4 block">
                    {new Date(article.createdAt).toLocaleDateString(dateLocale.code)}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* CHINQ SPECIAL STUDIES & DEEP RESEARCH */}
      {studies.length > 0 && (
        <section className="w-full max-w-[1024px] mx-auto bg-white border-t-4 border-double border-[#111111] p-6 md:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-[#111111]/10 pb-4">
            <div className="flex items-center gap-2.5">
              <BookOpen className="text-[#990000]" size={22} />
              <h2 className="font-serif text-2xl md:text-3xl font-black text-[#111111] tracking-tight">
                {t('studies')}
              </h2>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest bg-neutral-100 text-neutral-600 px-3 py-1 border border-neutral-200 font-bold rounded-sm">
              ChinQ Intelligence
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studies.map((study) => {
              const isLocked = study.isPrivate && !isSubscribed;
              return (
                <div 
                  key={study.id}
                  onClick={() => setSelectedStudy(study)}
                  className="group cursor-pointer flex flex-col justify-between bg-neutral-50/50 hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-400 transition-all duration-300 rounded overflow-hidden shadow-xs hover:shadow-md"
                >
                  <div className="space-y-4">
                    {/* Cover Section */}
                    {study.imageUrl && (
                      <div className="relative w-full aspect-video overflow-hidden border-b border-neutral-200">
                        <img 
                          src={study.imageUrl} 
                          alt={getStudyTitle(study)} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        {/* Lock overlay if locked */}
                        {isLocked && (
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                            <div className="bg-black/80 text-amber-400 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-bold uppercase tracking-wider shadow-lg border border-amber-500/30">
                              <Lock size={12} className="animate-pulse" />
                              <span>{lang === 'ar' ? 'مغلق' : lang === 'ckb' ? 'داخراو' : lang === 'zh' ? '加锁专享' : 'Premium Lock'}</span>
                            </div>
                          </div>
                        )}
                        {/* Badges */}
                        <div className="absolute top-2.5 start-2.5 flex gap-1.5">
                          {study.isPrivate ? (
                            <span className="bg-amber-500 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
                              PREMIUM
                            </span>
                          ) : (
                            <span className="bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
                              OPEN ACCESS
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="p-4 space-y-2">
                      <div className="flex items-center gap-2 text-[9px] font-mono uppercase text-gray-500 font-bold">
                        <span>{study.author?.name || 'Research Desk'}</span>
                        <span>•</span>
                        <span>{new Date(study.createdAt).toLocaleDateString(dateLocale.code)}</span>
                      </div>
                      <h3 className="font-serif text-base font-bold leading-snug group-hover:text-[#990000] text-[#111111] transition-colors line-clamp-3">
                        {getStudyTitle(study)}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                        {getStudyExcerpt(study)}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button className="w-full py-2 px-3 text-center text-xs font-bold uppercase bg-white border border-neutral-300 hover:border-[#990000] text-neutral-800 hover:text-white hover:bg-[#990000] rounded transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer">
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
      <section className="w-full max-w-[1024px] mx-auto bg-[#FAFAFA] border-t border-[#111111] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x rtl:divide-x-reverse divide-[#111111]/10">
        {['ai', 'food-beverage', 'expo', 'business-statistics'].map((catSlug) => {
          const sectionArticles = articles.filter(a => a.category?.slug === catSlug).slice(0, 3);
          if (sectionArticles.length === 0) return null;
          
          let title = '';
          if (catSlug === 'ai') title = t('ai');
          if (catSlug === 'food-beverage') title = t('foodBeverage');
          if (catSlug === 'expo') title = t('expo');
          if (catSlug === 'business-statistics') title = t('businessStats');
          
          return (
            <div key={catSlug} className="p-6 flex flex-col space-y-4">
              <h3 className="text-[10px] uppercase font-black tracking-widest text-[#111111] border-b-2 border-[#990000] pb-1 w-fit">
                {title}
              </h3>
              {sectionArticles.map((article, i) => (
                <div 
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="cursor-pointer group hover:bg-black/[0.02] p-2 -mx-2 rounded transition-all duration-200"
                >
                  <h4 className="font-serif text-sm font-bold leading-tight group-hover:text-[#990000] text-[#111111] transition-colors line-clamp-3">
                    {getTranslation(article)?.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold opacity-70">
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
        <div 
          className="fixed inset-0 bg-[#111111]/75 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6 md:p-8"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="bg-[#FAFAFA] border-x border-[#111111] max-w-3xl w-full h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative text-start transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header toolbar */}
            <div className="px-6 py-4 bg-white border-b border-[#111111]/10 flex justify-between items-center shrink-0">
              <span className="text-[10px] font-black uppercase text-[#990000] tracking-widest">
                {getCategoryName(selectedArticle.category)}
              </span>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="text-[#111111] hover:text-[#990000] font-black text-xs uppercase tracking-widest border border-[#111111]/20 px-3 py-1 hover:border-[#990000] transition-colors cursor-pointer"
              >
                {lang === 'ar' ? '✕ إغلاق' : lang === 'ckb' ? '✕ داخستن' : lang === 'zh' ? '✕ 关闭' : '✕ Close'}
              </button>
            </div>

            {/* Print style article layout */}
            <div className="p-6 md:p-12 flex-grow overflow-y-auto">
              <h1 className="text-3xl md:text-5xl font-serif font-black leading-tight text-center text-[#111111] tracking-tight mb-6">
                {getTranslation(selectedArticle)?.title}
              </h1>

              <div className="flex justify-center items-center gap-3 text-[10px] font-bold uppercase mb-8 opacity-60 text-[#111111] border-y border-double border-[#111111]/20 py-2.5">
                <span>By {(selectedArticle as any).author?.name || 'Staff Writer'}</span>
                <span>•</span>
                <span>
                  {new Date(selectedArticle.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : lang === 'zh' ? 'zh-CN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>

              {selectedArticle.imageUrl && (
                <div className="w-full mb-8 overflow-hidden rounded-xs border border-[#111111]/10">
                  <img 
                    src={selectedArticle.imageUrl} 
                    alt={getTranslation(selectedArticle)?.title || 'Article Image'} 
                    className="w-full object-cover max-h-[360px]"
                  />
                </div>
              )}

              {/* Editorial typography body */}
              <div 
                className="prose prose-neutral max-w-none font-serif text-lg leading-relaxed text-gray-800 space-y-6 whitespace-pre-wrap md:px-4"
                dir={lang === 'ar' || lang === 'ckb' ? 'rtl' : 'ltr'}
              >
                {getTranslation(selectedArticle)?.content ? (
                  <div dangerouslySetInnerHTML={{ __html: getTranslation(selectedArticle).content }} />
                ) : (
                  <p>{getTranslation(selectedArticle)?.excerpt}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DEEP INTEL STUDY DETAIL OVERLAY MODAL */}
      {selectedStudy && (
        <div 
          className="fixed inset-0 bg-[#111111]/85 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6 md:p-8"
          onClick={() => setSelectedStudy(null)}
        >
          <div 
            className="bg-[#FAFAFA] border-x border-[#111111] max-w-3xl w-full h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative text-start transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header toolbar */}
            <div className="px-6 py-4 bg-white border-b border-[#111111]/10 flex justify-between items-center shrink-0">
              <span className="text-[10px] font-black uppercase text-[#990000] tracking-widest flex items-center gap-1.5">
                <Sparkles size={12} className="text-amber-500 animate-pulse" />
                {selectedStudy.isPrivate ? t('premiumStudy') : 'Open Research Report'}
              </span>
              <button 
                onClick={() => setSelectedStudy(null)}
                className="text-[#111111] hover:text-[#990000] font-black text-xs uppercase tracking-widest border border-[#111111]/20 px-3 py-1 hover:border-[#990000] transition-colors cursor-pointer"
              >
                {lang === 'ar' ? '✕ إغلاق' : lang === 'ckb' ? '✕ داخستن' : lang === 'zh' ? '✕ 关闭' : '✕ Close'}
              </button>
            </div>

            {/* Content wrapper */}
            <div className="flex-grow overflow-y-auto">
              <div className="p-6 md:p-12">
                <h1 className="text-3xl md:text-5xl font-serif font-black leading-tight text-center text-[#111111] tracking-tight mb-6">
                  {getStudyTitle(selectedStudy)}
                </h1>

                <div className="flex justify-center items-center gap-3 text-[10px] font-bold uppercase mb-8 opacity-60 text-[#111111] border-y border-double border-[#111111]/20 py-2.5">
                  <span>By {selectedStudy.author?.name || 'Senior Fellow'}</span>
                  <span>•</span>
                  <span>
                    {new Date(selectedStudy.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : lang === 'zh' ? 'zh-CN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>

                {selectedStudy.imageUrl && (
                  <div className="w-full mb-8 overflow-hidden rounded-xs border border-[#111111]/10 relative aspect-video shadow-sm">
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
                      <h3 className="font-serif text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                        {lang === 'ar' ? 'محتوى حصري للمشتركين المميزين' : lang === 'ckb' ? 'بەرنامەی تایبەت بۆ بەشداربووان' : lang === 'zh' ? '智库付费专享机密报告' : 'Exclusive Premium Research Entry'}
                      </h3>
                      <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                        {lang === 'ar' 
                          ? 'هذا التقرير الاستراتيجي المعمق متاح حصرياً لحاملي اشتراكات النخبة والمؤسسات لدى ChinQ Post.' 
                          : lang === 'ckb' 
                          ? 'ئەم ڕاپۆرتە قووڵە ستراتیژییە تەنها بۆ بەشداربووانی نایاب و نێودەوڵەتی بەردەستە.' 
                          : lang === 'zh' 
                          ? '本深度战略分析报告仅供具有活跃订阅权限的 ChinQ Post 高级及企业会员阅读。' 
                          : 'This strategic bilateral intelligence dossier is restricted to active premium and enterprise portfolio holders.'}
                      </p>
                    </div>

                    <div className="border-t border-neutral-100 pt-6 space-y-4">
                      <h4 className="text-[10px] font-mono uppercase font-black text-[#990000] tracking-wider">
                        {lang === 'ar' ? 'الملخص التنفيذي المتاح' : lang === 'ckb' ? 'کورتەی سەرەکی بەردەست' : lang === 'zh' ? '公开摘要' : 'Abstract Overview'}
                      </h4>
                      <p className="text-sm text-gray-700 italic bg-neutral-50 p-4 border-l-4 border-amber-500 leading-relaxed font-serif">
                        {getStudyExcerpt(selectedStudy)}
                      </p>
                    </div>

                    {/* Subscription Pricing Widget Embedded Directly */}
                    <div className="space-y-4 border-t border-neutral-100 pt-6">
                      <div className="text-center">
                        <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                          {t('subscribeToRead')}
                        </span>
                      </div>
                      <SubscriptionCard />
                    </div>
                  </div>
                ) : (
                  /* FULL TEXT MARKDOWN RENDERER */
                  <div 
                    className="prose prose-neutral max-w-none font-serif text-lg leading-relaxed text-gray-800 space-y-6 whitespace-pre-wrap md:px-4"
                    dir={lang === 'ar' || lang === 'ckb' ? 'rtl' : 'ltr'}
                  >
                    <div dangerouslySetInnerHTML={{ __html: getStudyContent(selectedStudy).replace(/\n/g, '<br/>') }} />
                  </div>
                )}

                {/* RELATED RESEARCH STUDIES SECTION */}
                <div className="mt-12 pt-8 border-t border-double border-[#111111]/20 space-y-6">
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-[#990000]" />
                    <h3 className="font-serif text-lg font-black text-[#111111]">
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
                            className="group cursor-pointer flex gap-3 p-3 bg-white border border-neutral-200 hover:border-[#990000] rounded shadow-xs hover:shadow-sm transition-all duration-300 text-start"
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
                              <h4 className="font-serif text-xs font-bold leading-tight line-clamp-2 text-[#111111] group-hover:text-[#990000] transition-colors mt-1">
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

    </main>
   </div>
  );
}
