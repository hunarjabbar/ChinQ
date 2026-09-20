import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CulturalExchangeCategory, CulturalExchangeProgram, Locale } from '../types';
import {
  GraduationCap, Building2, Calendar, Clock, Search,
  ExternalLink, ChevronRight, BookOpen, Layers, X,
  Share2, ArrowLeft, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CulturalExchangePage() {
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
    badge: lang === 'ar' ? 'البوابة الرسمية للتبادل الثقافي والأكاديمي' : lang === 'zh' ? '中伊人文与学术交流官方门户' : lang === 'ckb' ? 'دەروازەی فەرمی ئاڵوگۆڕی کەلەپوور و ئەکادیمی' : 'Official Cultural & Academic Exchange Portal',
    title: lang === 'ar' ? 'دليل برامج التبادل الثقافي والتعليمي بين العراق والصين' : lang === 'zh' ? '中伊人文与高等教育国际合作交流目录' : lang === 'ckb' ? 'ڕێبەری بەرنامەکانی ئاڵوگۆڕی کولتووری و زانستی عێراق و چین' : 'Sino-Iraqi Cultural & Educational Exchange Portal',
    subtitle: lang === 'ar'
      ? 'منصة شاملة لشراكات الجامعات، برامج المنح الدراسية والبحثية، معايشات الفنون والتراث، ومسارات تبادل الشباب بين المؤسسات العراقية والصينية.'
      : lang === 'zh'
      ? '汇聚中伊顶尖大学联合培养、学者驻留互访、青年语言研学与两河流域-华夏古文明保护合作计划。'
      : lang === 'ckb'
      ? 'پلاتفۆرمی فەرمی بۆ پەرەپێدانی پەیوەندییە زانستی و کولتوورییەکانی نێوان زانکۆکان و قوتابیان.'
      : 'Comprehensive registry of bilateral university partnerships, scholarships, research sabbaticals, and youth cultural immersions connecting Iraqi and Chinese institutions.',
    searchPlaceholder: lang === 'ar' ? 'ابحث عن اسم البرنامج، الجامعة أو الشروط...' : lang === 'zh' ? '搜索合作高校、学科计划或申请条件...' : lang === 'ckb' ? 'گەڕان بەدوای زانکۆ یان بەرنامە...' : 'Search programs, universities, or keywords...',
    allCategories: lang === 'ar' ? 'جميع المسارات' : lang === 'zh' ? '全部项目分类' : lang === 'ckb' ? 'هەموو جۆرەکان' : 'All Categories',
    deadline: lang === 'ar' ? 'آخر موعد:' : lang === 'zh' ? '申请截止：' : lang === 'ckb' ? 'کۆتا وادە:' : 'Deadline:',
    learnMore: lang === 'ar' ? 'ملف البرنامج والمنهاج' : lang === 'zh' ? '查看项目简章' : lang === 'ckb' ? 'وردەکارییەکان' : 'Program Dossier',
    applyNow: lang === 'ar' ? 'التقديم والمراسلة' : lang === 'zh' ? '立即报名/联系' : lang === 'ckb' ? 'پێشکەشکردن' : 'Apply / Inquire',
    backHome: lang === 'ar' ? 'العودة للرئيسية' : lang === 'zh' ? '返回首页' : lang === 'ckb' ? 'گەڕانەوە بۆ سەرەکی' : 'Back to Home',
    totalPrograms: lang === 'ar' ? 'برنامج معتمد' : lang === 'zh' ? '个在册交流项目' : lang === 'ckb' ? 'بەرنامەی پەسەندکراو' : 'Active Programs',
    close: lang === 'ar' ? 'إغلاق' : lang === 'zh' ? '关闭' : lang === 'ckb' ? 'داخستن' : 'Close',
    share: lang === 'ar' ? 'نسخ رابط البرنامج' : lang === 'zh' ? '复制项目链接' : lang === 'ckb' ? 'کۆپیکردنی بەستەر' : 'Copy Link',
    copied: lang === 'ar' ? 'تم النسخ!' : lang === 'zh' ? '已复制！' : lang === 'ckb' ? 'کۆپی کرا!' : 'Copied!'
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full flex flex-col font-sans">
      {/* HERO SECTION */}
      <section className="relative bg-paper-50 dark:bg-paper-950 border-b border-paper-200 dark:border-paper-800 pt-10 pb-12 overflow-hidden">
        {/* Atmosphere */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-800/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-brand-900/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Breadcrumb back link */}
          <div className="mb-6">
            <Link
              to={`/${lang}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-paper-600 dark:text-paper-400 hover:text-brand-800 dark:hover:text-brand-400 transition"
            >
              {isRtl ? <ChevronRight className="w-4 h-4 rotate-180" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{t.backHome}</span>
            </Link>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 border border-brand-200 dark:border-brand-900 text-brand-800 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>{t.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-paper-950 dark:text-paper-50 tracking-tight leading-tight">
              {t.title}
            </h1>

            <p className="text-base sm:text-lg text-paper-700 dark:text-paper-300 leading-relaxed font-sans">
              {t.subtitle}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 mt-6 border-t border-paper-200 dark:border-paper-800">
            <div className="p-4 rounded-xl bg-paper-100 dark:bg-paper-900 border border-paper-200 dark:border-paper-800">
              <span className="text-2xl font-bold font-serif text-brand-800 dark:text-brand-400">{programs.length}+</span>
              <span className="block text-xs text-paper-600 dark:text-paper-400 mt-1">{t.totalPrograms}</span>
            </div>
            <div className="p-4 rounded-xl bg-paper-100 dark:bg-paper-900 border border-paper-200 dark:border-paper-800">
              <span className="text-2xl font-bold font-serif text-brand-700 dark:text-brand-300">{categories.length}</span>
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
      <section className="sticky top-0 z-20 bg-paper-50/95 dark:bg-paper-950/95 backdrop-blur-md border-b border-paper-200 dark:border-paper-800 py-4 shadow-2xs">
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
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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

                        <h3 className="font-serif font-bold text-paper-950 dark:text-paper-50 text-lg leading-snug group-hover:text-brand-800 dark:group-hover:text-brand-400 transition line-clamp-2">
                          {getProgramTitle(prog)}
                        </h3>

                        <p className="text-xs sm:text-sm text-paper-700 dark:text-paper-300 leading-relaxed line-clamp-3">
                          {getProgramDesc(prog)}
                        </p>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-5 pt-3 border-t border-paper-200 dark:border-paper-800 flex items-center justify-between gap-3 bg-paper-100/50 dark:bg-paper-900/50">
                      <button
                        onClick={() => setActiveModalProgram(prog)}
                        className="text-xs font-semibold text-paper-700 dark:text-paper-300 hover:text-brand-800 dark:hover:text-brand-400 flex items-center gap-1 transition"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{t.learnMore}</span>
                      </button>

                      {prog.applicationUrl ? (
                        <a
                          href={prog.applicationUrl.startsWith('http') ? prog.applicationUrl : `/${lang}${prog.applicationUrl}`}
                          target={prog.applicationUrl.startsWith('http') ? '_blank' : '_self'}
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-800 hover:bg-brand-700 text-paper-50 transition shadow-2xs group/btn"
                        >
                          <span>{t.applyNow}</span>
                          <ExternalLink className="w-3 h-3 group-hover/btn:scale-110 transition-transform" />
                        </a>
                      ) : (
                        <button
                          onClick={() => setActiveModalProgram(prog)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-800 hover:bg-brand-700 text-paper-50 transition"
                        >
                          <span>{t.learnMore}</span>
                          <ChevronRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* DETAILED PROGRAM MODAL */}
      <AnimatePresence>
        {activeModalProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-paper-950/70 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="relative h-64 w-full shrink-0">
                <img
                  src={activeModalProgram.coverImage}
                  alt={getProgramTitle(activeModalProgram)}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-paper-950 via-paper-950/40 to-transparent" />

                <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-full bg-paper-950/60 text-paper-50 hover:bg-paper-950/80 transition flex items-center gap-1.5 text-xs font-medium"
                    title={t.share}
                  >
                    {copiedLink ? <CheckCircle2 className="w-4 h-4 text-brand-300" /> : <Share2 className="w-4 h-4" />}
                    <span>{copiedLink ? t.copied : ''}</span>
                  </button>
                  <button
                    onClick={() => setActiveModalProgram(null)}
                    className="p-2 rounded-full bg-paper-950/60 text-paper-50 hover:bg-paper-950/80 transition"
                    title={t.close}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="absolute bottom-4 left-5 right-5 space-y-2 text-paper-50">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-brand-800 text-paper-50">
                      {activeModalProgram.category ? getCategoryName(activeModalProgram.category) : 'Program'}
                    </span>
                    <span className="text-xs text-paper-300 font-serif flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-brand-300" />
                      {activeModalProgram.institutionName}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                    {getProgramTitle(activeModalProgram)}
                  </h3>
                </div>
              </div>

              <div className="p-6 overflow-y-auto space-y-5 text-paper-800 dark:text-paper-200 text-sm leading-relaxed">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-paper-100 dark:bg-paper-850 border border-paper-200 dark:border-paper-800 text-xs">
                  {activeModalProgram.eventDate && (
                    <div>
                      <span className="text-paper-500 block mb-0.5">Program Intake / Cycle:</span>
                      <span className="font-semibold text-paper-950 dark:text-paper-50">{activeModalProgram.eventDate}</span>
                    </div>
                  )}
                  {activeModalProgram.applicationDeadline && (
                    <div>
                      <span className="text-paper-500 block mb-0.5">Application Deadline:</span>
                      <span className="font-semibold text-brand-800 dark:text-brand-400">{activeModalProgram.applicationDeadline}</span>
                    </div>
                  )}
                  {activeModalProgram.eligibility && (
                    <div className="sm:col-span-2">
                      <span className="text-paper-500 block mb-0.5">Target Applicants & Prerequisites:</span>
                      <span className="text-paper-800 dark:text-paper-200 font-medium">{activeModalProgram.eligibility}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4 whitespace-pre-line font-sans leading-relaxed">
                  {getProgramDetails(activeModalProgram)}
                </div>

                <div className="pt-4 border-t border-paper-200 dark:border-paper-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveModalProgram(null)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-paper-600 dark:text-paper-400 hover:bg-paper-200 dark:hover:bg-paper-800 transition"
                  >
                    {t.close}
                  </button>

                  {activeModalProgram.applicationUrl && (
                    <a
                      href={activeModalProgram.applicationUrl.startsWith('http') ? activeModalProgram.applicationUrl : `/${lang}${activeModalProgram.applicationUrl}`}
                      target={activeModalProgram.applicationUrl.startsWith('http') ? '_blank' : '_self'}
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-brand-800 hover:bg-brand-700 text-paper-50 transition shadow-xs"
                    >
                      <span>{t.applyNow}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
