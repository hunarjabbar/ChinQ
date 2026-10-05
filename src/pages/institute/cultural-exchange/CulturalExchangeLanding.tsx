import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CulturalExchangeCategory, CulturalExchangeProgram, Locale } from '../../../types';
import {
  GraduationCap, Building2, Calendar, Clock, Search,
  ExternalLink, ChevronRight, BookOpen, Layers, X,
  Share2, ArrowLeft, ArrowRight, CheckCircle2, Award, Users, Globe, Sparkles, Send, HelpCircle, PhoneCall
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CulturalExchangeLanding() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProgram, setActiveModalProgram] = useState<CulturalExchangeProgram | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Queries
  const { data: categories = [] } = useQuery<CulturalExchangeCategory[]>({
    queryKey: ['cultural-categories-page'],
    queryFn: async () => {
      const res = await fetch('/api/cultural-exchange/categories');
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    }
  });

  const { data: programs = [], isLoading } = useQuery<CulturalExchangeProgram[]>({
    queryKey: ['cultural-programs-page', selectedCategory, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      const res = await fetch(`/api/cultural-exchange/programs?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch programs');
      return res.json();
    }
  });

  // Localized texts
  const getProgramTitle = (p: CulturalExchangeProgram) => {
    if (lang === 'ar' && p.titleAr) return p.titleAr;
    if (lang === 'zh' && p.titleZh) return p.titleZh;
    if (lang === 'ckb' && p.titleCkb) return p.titleCkb;
    return p.titleEn;
  };

  const getProgramDesc = (p: CulturalExchangeProgram) => {
    if (lang === 'ar' && p.descriptionAr) return p.descriptionAr;
    if (lang === 'zh' && p.descriptionZh) return p.descriptionZh;
    if (lang === 'ckb' && p.descriptionCkb) return p.descriptionCkb;
    return p.descriptionEn;
  };

  const getProgramDetails = (p: CulturalExchangeProgram) => {
    if (lang === 'ar' && p.detailsAr) return p.detailsAr;
    if (lang === 'zh' && p.detailsZh) return p.detailsZh;
    if (lang === 'ckb' && p.detailsCkb) return p.detailsCkb;
    return p.detailsEn || p.descriptionEn;
  };

  const getCategoryName = (c: CulturalExchangeCategory) => {
    if (lang === 'ar' && c.nameAr) return c.nameAr;
    if (lang === 'zh' && c.nameZh) return c.nameZh;
    if (lang === 'ckb' && c.nameCkb) return c.nameCkb;
    return c.nameEn;
  };

  // Harmonized brand & paper palette tokens
  const getCategoryTheme = (slug?: string) => {
    switch (slug) {
      case 'educational-exchange':
        return {
          badge: 'bg-brand-800 text-paper-50 border-brand-700 dark:bg-brand-900 dark:text-brand-100 dark:border-brand-800',
          dot: 'bg-paper-50',
          cardHover: 'hover:border-brand-600'
        };
      case 'higher-education-university':
        return {
          badge: 'bg-brand-100 text-brand-900 border-brand-300 dark:bg-brand-950 dark:text-brand-200 dark:border-brand-800',
          dot: 'bg-brand-600',
          cardHover: 'hover:border-brand-500'
        };
      case 'arts-heritage':
        return {
          badge: 'bg-brand-50 text-brand-800 border-brand-200 dark:bg-paper-900 dark:text-brand-300 dark:border-brand-900',
          dot: 'bg-brand-500',
          cardHover: 'hover:border-brand-400'
        };
      case 'youth-language':
        return {
          badge: 'bg-paper-200 text-paper-900 border-paper-300 dark:bg-paper-800 dark:text-paper-100 dark:border-paper-700',
          dot: 'bg-brand-700',
          cardHover: 'hover:border-brand-400'
        };
      case 'professional-vocational':
        return {
          badge: 'bg-paper-100 text-brand-950 border-brand-200 dark:bg-brand-950 dark:text-paper-200 dark:border-brand-900',
          dot: 'bg-brand-600',
          cardHover: 'hover:border-brand-500'
        };
      default:
        return {
          badge: 'bg-paper-100 text-paper-800 border-paper-300 dark:bg-paper-800 dark:text-paper-200 dark:border-paper-700',
          dot: 'bg-brand-600',
          cardHover: 'hover:border-brand-400'
        };
    }
  };

  const t = {
    ciseBadge: lang === 'ar' ? 'المعهد الصيني للدراسات الاستراتيجية والاقتصادية · خدمة معتمدة' : lang === 'zh' ? '中国战略与经济研究所 (CISE) 直属服务' : lang === 'ckb' ? 'پەیمانگای چینی (CISE) · خزمەتگوزاری فەرمی' : 'Chinese Institute for Strategic & Economic Studies · CISE Service',
    badge: lang === 'ar' ? 'التبادل الشعبي والثقافي' : lang === 'zh' ? '民间与文化交流' : lang === 'ckb' ? 'ئاڵوگۆڕی گەلی و کولتووری' : 'People-to-People & Cultural Exchange',
    title: lang === 'ar' ? 'التبادل الثقافي والتعليمي الصيني-العراقي' : lang === 'zh' ? '中伊文化与教育交流' : lang === 'ckb' ? 'ئاڵوگۆڕی کولتووری و پەروەردەیی چینی-عێراقی' : 'Sino-Iraqi Cultural & Educational Exchange',
    subtitle: lang === 'ar'
      ? 'مذكرات تفاهم جامعية ثنائية، زمالات انغماس طلابي، إقامات فنية، وحوارات حضارية تربط العراق والصين.'
      : lang === 'zh'
      ? '双边大学谅解备忘录、学生沉浸式奖学金、艺术驻留以及连接伊拉克与中国的文明对话。'
      : lang === 'ckb'
      ? 'یاداشتە تێگەیشتنەکانی زانکۆیی دوولایەنە، زەمالەی نوقمبوونی قوتابیان، نیشتەجێبوونی هونەری، و گفتوگۆی شارستانی کە عێراق و چین بەیەکەوە دەبەستێت.'
      : 'Bilateral university MOUs, student immersion fellowships, arts residencies, and civilizational dialogues connecting Iraq and China.',
    searchPlaceholder: lang === 'ar' ? 'ابحث عن اسم البرنامج، الجامعة أو الشروط...' : lang === 'zh' ? '搜索合作高校、学科计划或申请条件...' : lang === 'ckb' ? 'گەڕان بەدوای زانکۆ یان بەرنامە...' : 'Search programs, universities, or keywords...',
    allCategories: lang === 'ar' ? 'جميع المسارات' : lang === 'zh' ? '全部项目分类' : lang === 'ckb' ? 'هەموو جۆرەکان' : 'All Categories',
    deadline: lang === 'ar' ? 'آخر موعد:' : lang === 'zh' ? '申请截止：' : lang === 'ckb' ? 'کۆتا وادە:' : 'Deadline:',
    learnMore: lang === 'ar' ? 'ملف البرنامج والمنهاج' : lang === 'zh' ? '查看项目简章' : lang === 'ckb' ? 'وردەکارییەکان' : 'Program Dossier',
    applyNow: lang === 'ar' ? 'التقديم والمراسلة' : lang === 'zh' ? '立即报名/联系' : lang === 'ckb' ? 'پێشکەشکردن' : 'Apply / Inquire',
    backToServices: lang === 'ar' ? 'العودة لخدمات المعهد' : lang === 'zh' ? '返回智库服务名录' : lang === 'ckb' ? 'گەڕانەوە بۆ خزمەتگوزارییەکان' : 'Back to CISE Services',
    totalPrograms: lang === 'ar' ? 'برنامج معتمد' : lang === 'zh' ? '个在册交流项目' : lang === 'ckb' ? 'بەرنامەی پەسەندکراو' : 'Active Programs',
    close: lang === 'ar' ? 'إغلاق' : lang === 'zh' ? '关闭' : lang === 'ckb' ? 'داخستن' : 'Close',
    share: lang === 'ar' ? 'نسخ رابط البرنامج' : lang === 'zh' ? '复制项目链接' : lang === 'ckb' ? 'کۆپیکردنی بەستەر' : 'Copy Link',
    copied: lang === 'ar' ? 'تم النسخ!' : lang === 'zh' ? '已复制！' : lang === 'ckb' ? 'کۆپی کرا!' : 'Copied!',
    navPrograms: lang === 'ar' ? 'دليل البرامج' : lang === 'zh' ? '全部项目' : lang === 'ckb' ? 'بەرنامەکان' : 'All Programs',
    navPartners: lang === 'ar' ? 'الجامعات الشريكة' : lang === 'zh' ? '合作院校' : lang === 'ckb' ? 'زانکۆ هاوبەشەکان' : 'Partner Universities',
    navApply: lang === 'ar' ? 'طلب التقديم' : lang === 'zh' ? '在线申请' : lang === 'ckb' ? 'داواکاری' : 'Apply / Inquire',
    navFaq: lang === 'ar' ? 'الأسئلة الشائعة' : lang === 'zh' ? '常见问题' : lang === 'ckb' ? 'پرسیارە باوەکان' : 'FAQ',
    navContact: lang === 'ar' ? 'مكتب الاتصال الأكاديمي' : lang === 'zh' ? '学术联络' : lang === 'ckb' ? 'پەیوەندی' : 'Academic Contact',
    featuredTitle: lang === 'ar' ? 'البرامج والمنح البارزة' : lang === 'zh' ? '重点交流合作项目' : lang === 'ckb' ? 'بەرنامە دیارەکان' : 'Featured Exchange Programs',
    exploreAll: lang === 'ar' ? 'استعراض كل البرامج →' : lang === 'zh' ? '查看全部交流项目 →' : lang === 'ckb' ? 'بینینی هەموو بەرنامەکان →' : 'Explore All Programs →'
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full flex flex-col font-sans">
      {/* SUBNAV STRIP */}
      <div className="bg-[#0B1120] border-b border-white/10 sticky top-[92px] sm:top-[104px] lg:top-[120px] z-30 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 h-11">
          <div className="flex items-center gap-1 sm:gap-2 text-xs font-bold whitespace-nowrap">
            <Link to={`/${lang}/institute/services/cultural-exchange`} className="px-3 py-1.5 rounded-lg bg-[var(--color-brand-800)]/20 text-[var(--color-brand-800)]">
              {lang === 'ar' ? 'نظرة عامة' : lang === 'zh' ? '概览' : lang === 'ckb' ? 'پوختە' : 'Overview'}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/programs`} className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5">
              {t.navPrograms}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/partners`} className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5">
              {t.navPartners}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/apply`} className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5">
              {t.navApply}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/faq`} className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5">
              {t.navFaq}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/contact`} className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5">
              {t.navContact}
            </Link>
          </div>
          <Link
            to={`/${lang}/institute/services`}
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-[var(--color-brand-800)] hover:underline"
          >
            <span>{t.backToServices}</span>
          </Link>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative bg-paper-50 dark:bg-paper-950 border-b border-paper-200 dark:border-paper-800 pt-10 pb-12 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-800/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-brand-900/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-4">
            <Link
              to={`/${lang}/institute/services`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-paper-600 dark:text-paper-400 hover:text-brand-800 dark:hover:text-brand-400 transition"
            >
              {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{t.backToServices}</span>
            </Link>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 border border-brand-200 dark:border-brand-900 text-brand-800 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>{t.badge}</span>
              <span className="opacity-40">•</span>
              <span className="text-[10px] text-[var(--color-brand-800)]">{t.ciseBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-paper-950 dark:text-paper-50 tracking-tight leading-tight">
              {t.title}
            </h1>

            <p className="text-base sm:text-lg text-paper-700 dark:text-paper-300 leading-relaxed font-sans">
              {t.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to={`/${lang}/institute/services/cultural-exchange/programs`}
                className="px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-paper-50 text-xs sm:text-sm font-black uppercase tracking-wider transition shadow-sm"
              >
                {t.exploreAll}
              </Link>
              <Link
                to={`/${lang}/institute/services/cultural-exchange/apply`}
                className="px-5 py-2.5 rounded-xl bg-paper-200 dark:bg-paper-800 hover:bg-paper-300 dark:hover:bg-paper-700 text-paper-900 dark:text-paper-100 text-xs sm:text-sm font-black uppercase tracking-wider transition"
              >
                {t.navApply}
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 pt-8 mt-6 border-t border-paper-200 dark:border-paper-800 min-w-0">
            <div className="p-4 rounded-xl bg-paper-100 dark:bg-paper-900 border border-paper-200 dark:border-paper-800">
              <span className="text-2xl font-bold font-serif text-brand-800 dark:text-brand-400">{programs.length || 4}+</span>
              <span className="block text-xs text-paper-600 dark:text-paper-400 mt-1">{t.totalPrograms}</span>
            </div>
            <div className="p-4 rounded-xl bg-paper-100 dark:bg-paper-900 border border-paper-200 dark:border-paper-800">
              <span className="text-2xl font-bold font-serif text-brand-700 dark:text-brand-300">{categories.length || 5}</span>
              <span className="block text-xs text-paper-600 dark:text-paper-400 mt-1">Focus Tracks / Subsections</span>
            </div>
            <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-paper-100 dark:bg-paper-900 border border-paper-200 dark:border-paper-800">
              <span className="text-2xl font-bold font-serif text-paper-950 dark:text-paper-50">100%</span>
              <span className="block text-xs text-paper-600 dark:text-paper-400 mt-1">Bilateral Direct Institutional Ties</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH & FILTER CONTROLS */}
      <section className="sticky top-[136px] sm:top-[148px] lg:top-[164px] z-20 bg-paper-50/95 dark:bg-paper-950/95 backdrop-blur-md border-b border-paper-200 dark:border-paper-800 py-4 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search bar */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-paper-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 text-sm rounded-xl border border-paper-300 dark:border-paper-700 bg-paper-100 dark:bg-paper-900 text-paper-950 dark:text-paper-50 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-paper-400 hover:text-paper-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Subsection Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                  selectedCategory === 'all'
                    ? 'bg-brand-800 text-paper-50 border-brand-800 shadow-xs'
                    : 'bg-paper-100 dark:bg-paper-900 text-paper-700 dark:text-paper-300 border-paper-200 dark:border-paper-800 hover:bg-paper-200 dark:hover:bg-paper-800'
                }`}
              >
                {t.allCategories}
              </button>

              {categories.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-brand-800 text-paper-50 border-brand-800 shadow-xs'
                        : 'bg-paper-100 dark:bg-paper-900 text-paper-700 dark:text-paper-300 border-paper-200 dark:border-paper-800 hover:bg-paper-200 dark:hover:bg-paper-800'
                    }`}
                  >
                    <span>{getCategoryName(cat)}</span>
                    {typeof cat._count?.programs === 'number' && (
                      <span className="text-[10px] opacity-75">
                        ({cat._count.programs})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN PROGRAM CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-paper-950 dark:text-paper-50 uppercase tracking-tight">
              {t.featuredTitle}
            </h2>
          </div>
          <Link
            to={`/${lang}/institute/services/cultural-exchange/programs`}
            className="text-xs font-black uppercase tracking-wider text-brand-800 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>{t.exploreAll}</span>
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 min-w-0">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 rounded-2xl bg-paper-200 dark:bg-paper-800 animate-pulse" />
              ))}
            </div>
          ) : programs.length === 0 ? (
            <div className="bg-paper-100 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 rounded-3xl p-16 text-center max-w-md mx-auto">
              <GraduationCap className="w-12 h-12 mx-auto text-paper-400 mb-3" />
              <h3 className="text-lg font-bold text-paper-950 dark:text-paper-50">
                No programs found
              </h3>
              <p className="text-sm text-paper-600 dark:text-paper-400 mt-1">
                Try adjusting your search criteria or subsection filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-800 text-paper-50 hover:bg-brand-700 transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <motion.div
              key={`grid-${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0, x: isRtl ? 15 : -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRtl ? -15 : 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-0"
            >
              {programs.map((prog, idx) => {
                const theme = getCategoryTheme(prog.category?.slug);

                return (
                  <motion.div
                    key={prog.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    whileHover={{ y: -4 }}
                    className={`bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${theme.cardHover}`}
                  >
                    <div>
                      {/* Image header */}
                      <div className="relative h-52 w-full bg-paper-200 dark:bg-paper-800 overflow-hidden">
                        <img
                          src={prog.coverImage}
                          alt={getProgramTitle(prog)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-paper-950/85 via-paper-950/20 to-transparent" />

                        {/* Category badge */}
                        <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md border shadow-xs flex items-center gap-1.5 ${theme.badge}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                            <span>{prog.category ? getCategoryName(prog.category) : 'General'}</span>
                          </span>
                        </div>

                        {/* Partner Institution Banner */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-paper-50 text-xs font-medium drop-shadow-md">
                          <div className="w-6 h-6 rounded-md bg-paper-50/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-paper-50/30">
                            <Building2 className="w-3.5 h-3.5 text-brand-300" />
                          </div>
                          <span className="truncate font-serif">{prog.institutionName}</span>
                        </div>
                      </div>

                      {/* Text */}
                      <div className="p-5 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                          {prog.eventDate && (
                            <span className="flex items-center gap-1 text-paper-600 dark:text-paper-400">
                              <Calendar className="w-3.5 h-3.5 text-paper-500" />
                              <span>{prog.eventDate}</span>
                            </span>
                          )}
                          {prog.applicationDeadline && (
                            <span className="flex items-center gap-1 text-brand-800 dark:text-brand-300 font-semibold bg-brand-100 dark:bg-brand-950 px-2 py-0.5 rounded-md border border-brand-200 dark:border-brand-900">
                              <Clock className="w-3 h-3" />
                              <span>{t.deadline} {prog.applicationDeadline}</span>
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-serif font-bold text-paper-950 dark:text-paper-50 leading-snug group-hover:text-brand-700 dark:group-hover:text-brand-400 transition">
                          {getProgramTitle(prog)}
                        </h3>

                        <p className="text-xs sm:text-sm text-paper-700 dark:text-paper-300 line-clamp-3 leading-relaxed">
                          {getProgramDesc(prog)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-5 pt-0 flex items-center gap-2">
                      <button
                        onClick={() => setActiveModalProgram(prog)}
                        className="flex-1 px-3 py-2 rounded-xl text-xs font-semibold bg-paper-100 dark:bg-paper-800 text-paper-900 dark:text-paper-100 hover:bg-paper-200 dark:hover:bg-paper-700 transition flex items-center justify-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-brand-800 dark:text-brand-400" />
                        <span>{t.learnMore}</span>
                      </button>

                      <Link
                        to={`/${lang}/institute/services/cultural-exchange/apply?program=${prog.id}`}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-800 hover:bg-brand-900 text-paper-50 transition flex items-center justify-center gap-1 shadow-xs"
                      >
                        <span>{t.applyNow}</span>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* QUICK LINKS BANNER */}
      <section className="bg-paper-100 dark:bg-paper-900 border-t border-paper-200 dark:border-paper-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to={`/${lang}/institute/services/cultural-exchange/partners`}
              className="p-6 rounded-2xl bg-paper-50 dark:bg-paper-950 border border-paper-200 dark:border-paper-800 hover:border-brand-600 transition group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <Building2 className="w-6 h-6 text-[var(--color-brand-800)]" />
                <h3 className="text-base font-black text-paper-950 dark:text-white uppercase">{t.navPartners}</h3>
                <p className="text-xs text-paper-600 dark:text-neutral-400">
                  {lang === 'ar' ? 'استكشف شبكة الجامعات والمراكز البحثية الشريكة في بغداد وبكين ونانجينغ.' : lang === 'zh' ? '查阅清华、北大、南京大学及巴格达大学等双边学术联盟。' : lang === 'ckb' ? 'تۆڕی زانکۆ هاوبەشەکان لە بەغدا، بەکین و نانجینگ.' : 'Explore partner university alliances including Tsinghua, Peking, Nanjing, and Baghdad University.'}
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-[var(--color-brand-800)] flex items-center gap-1">
                <span>{lang === 'ar' ? 'عرض الجامعات' : lang === 'zh' ? '查看名录' : lang === 'ckb' ? 'بینینی زانکۆکان' : 'View Universities'}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              </div>
            </Link>

            <Link
              to={`/${lang}/institute/services/cultural-exchange/faq`}
              className="p-6 rounded-2xl bg-paper-50 dark:bg-paper-950 border border-paper-200 dark:border-paper-800 hover:border-brand-600 transition group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <HelpCircle className="w-6 h-6 text-[var(--color-brand-800)]" />
                <h3 className="text-base font-black text-paper-950 dark:text-white uppercase">{t.navFaq}</h3>
                <p className="text-xs text-paper-600 dark:text-neutral-400">
                  {lang === 'ar' ? 'إجابات شاملة حول متطلبات اللغة HSK، المنح المالية، وتأشيرات التبادل.' : lang === 'zh' ? '有关语言要求、奖学金资助、签证与学分互认的全面解答。' : lang === 'ckb' ? 'وەڵامی پرسیارەکان لەسەر زمانی HSK، زەمالە و ڤیزا.' : 'Full guidance on language criteria, stipends, visas, and university credit recognition.'}
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-[var(--color-brand-800)] flex items-center gap-1">
                <span>{lang === 'ar' ? 'اقرأ الأسئلة' : lang === 'zh' ? '阅读问答' : lang === 'ckb' ? 'خوێندنەوەی پرسیارەکان' : 'Read FAQ'}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              </div>
            </Link>

            <Link
              to={`/${lang}/institute/services/cultural-exchange/contact`}
              className="p-6 rounded-2xl bg-paper-50 dark:bg-paper-950 border border-paper-200 dark:border-paper-800 hover:border-brand-600 transition group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <PhoneCall className="w-6 h-6 text-[var(--color-brand-800)]" />
                <h3 className="text-base font-black text-paper-950 dark:text-white uppercase">{t.navContact}</h3>
                <p className="text-xs text-paper-600 dark:text-neutral-400">
                  {lang === 'ar' ? 'تواصل مع مكاتب الاتصال الأكاديمي في بغداد وبكين والسليمانية.' : lang === 'zh' ? '联络巴格达、北京与苏莱曼尼亚学术事务联络处。' : lang === 'ckb' ? 'پەیوەندی بە نووسینگەکانی بەغدا، بەکین و سلێمانی.' : 'Connect directly with academic liaison desks in Baghdad, Beijing, and Sulaymaniyah.'}
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-[var(--color-brand-800)] flex items-center gap-1">
                <span>{lang === 'ar' ? 'تواصل معنا' : lang === 'zh' ? '联络我们' : lang === 'ckb' ? 'پەیوەندیکردن' : 'Contact Desks'}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {activeModalProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-paper-950/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 rounded-3xl shadow-2xl overflow-hidden my-8"
            >
              <div className="relative h-60 w-full bg-paper-200 dark:bg-paper-800">
                <img
                  src={activeModalProgram.coverImage}
                  alt={getProgramTitle(activeModalProgram)}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-paper-950 via-paper-950/40 to-transparent" />

                <button
                  onClick={() => setActiveModalProgram(null)}
                  className="absolute top-4 right-4 rtl:right-auto rtl:left-4 w-9 h-9 rounded-full bg-paper-950/60 backdrop-blur-md text-paper-50 flex items-center justify-center hover:bg-paper-950 transition border border-paper-50/20"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-4 right-4 text-paper-50">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-800 text-paper-50 border border-brand-700 inline-block mb-2">
                    {activeModalProgram.category ? getCategoryName(activeModalProgram.category) : 'General'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold drop-shadow-md">
                    {getProgramTitle(activeModalProgram)}
                  </h2>
                  <p className="text-xs sm:text-sm text-paper-300 mt-0.5 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-brand-400" />
                    <span>{activeModalProgram.institutionName}</span>
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-paper-100 dark:bg-paper-800 border border-paper-200 dark:border-paper-700 text-xs">
                  <div>
                    <span className="block text-paper-500 font-medium">Timeline / Duration:</span>
                    <span className="font-semibold text-paper-900 dark:text-paper-100">{activeModalProgram.eventDate || 'Flexible Cycle'}</span>
                  </div>
                  <div>
                    <span className="block text-paper-500 font-medium">Application Deadline:</span>
                    <span className="font-semibold text-brand-800 dark:text-brand-300">{activeModalProgram.applicationDeadline || 'Rolling Basis'}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-paper-500 mb-2">
                    Program Overview & Syllabus
                  </h4>
                  <p className="text-sm text-paper-800 dark:text-paper-200 leading-relaxed whitespace-pre-line">
                    {getProgramDetails(activeModalProgram)}
                  </p>
                </div>

                {activeModalProgram.eligibility && (
                  <div className="p-4 rounded-xl bg-brand-50/50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-800 dark:text-brand-300 mb-1.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Target Audience & Eligibility</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-paper-700 dark:text-paper-300 leading-relaxed">
                      {activeModalProgram.eligibility}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-5 border-t border-paper-200 dark:border-paper-800 flex items-center justify-between gap-3 bg-paper-100/50 dark:bg-paper-900/50">
                <button
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-paper-200 dark:bg-paper-800 hover:bg-paper-300 dark:hover:bg-paper-700 text-paper-900 dark:text-paper-100 transition flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? t.copied : t.share}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalProgram(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-paper-600 dark:text-paper-400 hover:bg-paper-200 dark:hover:bg-paper-800 transition"
                  >
                    {t.close}
                  </button>
                  <Link
                    to={`/${lang}/institute/services/cultural-exchange/apply?program=${activeModalProgram.id}`}
                    onClick={() => setActiveModalProgram(null)}
                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-brand-800 hover:bg-brand-900 text-paper-50 transition shadow-xs flex items-center gap-1"
                  >
                    <span>{t.applyNow}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CulturalExchangeLanding;
