import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CulturalExchangeCategory, CulturalExchangeProgram, Locale } from '../types';
import {
  GraduationCap, Building2, Calendar, Clock, ArrowRight,
  ExternalLink, ChevronRight, X, BookOpen, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ErrorBoundary } from './ErrorBoundary';

interface CulturalExchangeSectionProps {
  lang?: Locale;
}

export function CulturalExchangeSection({ lang = 'en' }: CulturalExchangeSectionProps) {
  return (
    <ErrorBoundary>
      <CulturalExchangeContent lang={lang} />
    </ErrorBoundary>
  );
}

function CulturalExchangeContent({ lang = 'en' }: { lang: Locale }) {
  const isRtl = lang === 'ar' || lang === 'ckb';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProgram, setActiveModalProgram] = useState<CulturalExchangeProgram | null>(null);

  // Fetch categories
  const { data: categories = [] } = useQuery<CulturalExchangeCategory[]>({
    queryKey: ['cultural-categories-public'],
    queryFn: async () => {
      const res = await fetch('/api/cultural-exchange/categories');
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    }
  });

  // Fetch programs
  const { data: programs = [], isLoading: isProgramsLoading } = useQuery<CulturalExchangeProgram[]>({
    queryKey: ['cultural-programs-public', selectedCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      const res = await fetch(`/api/cultural-exchange/programs?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch programs');
      return res.json();
    }
  });

  // Localized helpers
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

  // Color-coding built strictly from brand-* (red scale) and paper-* (neutral scale)
  const getCategoryTheme = (slug?: string) => {
    switch (slug) {
      case 'educational-exchange':
        // Anchor 1: Deep prominent brand red
        return {
          badge: 'bg-brand-800 text-paper-50 border-brand-700 dark:bg-brand-900 dark:text-brand-100 dark:border-brand-800',
          dot: 'bg-paper-50',
          cardHover: 'hover:border-brand-600'
        };
      case 'higher-education-university':
        // Anchor 2: Soft refined brand tint
        return {
          badge: 'bg-brand-100 text-brand-900 border-brand-300 dark:bg-brand-950 dark:text-brand-200 dark:border-brand-800',
          dot: 'bg-brand-600',
          cardHover: 'hover:border-brand-500'
        };
      case 'arts-heritage':
        // Subsection 3: Ultra light brand blush
        return {
          badge: 'bg-brand-50 text-brand-800 border-brand-200 dark:bg-paper-900 dark:text-brand-300 dark:border-brand-900',
          dot: 'bg-brand-500',
          cardHover: 'hover:border-brand-400'
        };
      case 'youth-language':
        // Subsection 4: Paper neutral with brand contrast
        return {
          badge: 'bg-paper-200 text-paper-900 border-paper-300 dark:bg-paper-800 dark:text-paper-100 dark:border-paper-700',
          dot: 'bg-brand-700',
          cardHover: 'hover:border-brand-400'
        };
      case 'professional-vocational':
        // Subsection 5: Deep brand text on paper
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

  // Translations
  const t = {
    sectionBadge: lang === 'ar' ? 'الدبلوماسية الشعبية والتبادل الثقافي' : lang === 'zh' ? '民心相通与人文交流' : lang === 'ckb' ? 'دیپلۆماسی جەماوەری و ئاڵوگۆڕی کەلەپوور' : 'People-to-People & Cultural Exchange',
    title: lang === 'ar' ? 'التبادل الثقافي والشراكات الأكاديمية' : lang === 'zh' ? '中伊人文交流与学术合作网络' : lang === 'ckb' ? 'ئاڵوگۆڕی کولتووری و هاوبەشییە ئەکادیمییەکان' : 'Sino-Iraqi Cultural & Educational Exchange',
    subtitle: lang === 'ar'
      ? 'برامج المنح الجامعية، الشراكات المدرسية، معايشات البحث العلمي، ومبادرات الفنون والتراث الرابطة بين بغداد وبكين'
      : lang === 'zh'
      ? '聚焦高等教育大学战略同盟、中伊青少年研学、艺术驻留及职业工坊，构筑两河与华夏文明互鉴桥梁'
      : lang === 'ckb'
      ? 'بەرنامەکانی خوێندنی باڵا، برایەتی قوتابخانەکان، هونەر و فێربوونی زمانی نێوان عێراق و چین'
      : 'Bilateral university MOUs, student immersion fellowships, arts residencies, and civilizational dialogues connecting Iraq and China.',
    allPrograms: lang === 'ar' ? 'جميع المسارات' : lang === 'zh' ? '全部项目' : lang === 'ckb' ? 'هەموو بەرنامەکان' : 'All Programs',
    viewAll: lang === 'ar' ? 'استعراض الدليل الكامل' : lang === 'zh' ? '查看完整交流目录' : lang === 'ckb' ? 'بینینی هەموو ڕێبەرەکە' : 'Explore All Exchange Programs',
    deadline: lang === 'ar' ? 'آخر موعد للتقديم:' : lang === 'zh' ? '申请截止：' : lang === 'ckb' ? 'کۆتا وادەی پێشکەشکردن:' : 'Application Deadline:',
    learnMore: lang === 'ar' ? 'تفاصيل المنحة والبرنامج' : lang === 'zh' ? '查看培养简章' : lang === 'ckb' ? 'وردەکارییەکانی بەرنامە' : 'Program Dossier',
    applyNow: lang === 'ar' ? 'التقديم والمراسلة' : lang === 'zh' ? '立即申请/咨询' : lang === 'ckb' ? 'پێشکەشکردن' : 'Apply / Inquire',
    eligibility: lang === 'ar' ? 'الفئات المستهدفة والشروط:' : lang === 'zh' ? '申报对象与资格：' : lang === 'ckb' ? 'مەرجەکان:' : 'Target Audience & Eligibility:',
    emptyTitle: lang === 'ar' ? 'لا توجد برامج منشورة حالياً في هذا المسار' : lang === 'zh' ? '当前分类下暂无已发布交流项目' : lang === 'ckb' ? 'لە ئێستادا هیچ بەرنامەیەک لەم بەشەدا نییە' : 'No exchange programs published in this subsection yet',
    emptyDesc: lang === 'ar' ? 'يجري حالياً التنسيق مع الجامعات والمراكز الشريكة لإطلاق دورات التقديم القادمة.' : lang === 'zh' ? '伊中通讯社正联合中伊重点院校推进下一轮联合遴选申报，敬请期待。' : lang === 'ckb' ? 'بە زووانە خولی نوێی پێشکەشکردن دەکرێتەوە.' : 'Upcoming admissions and partnership cycles are currently being finalized with partner universities.',
    close: lang === 'ar' ? 'إغلاق' : lang === 'zh' ? '关闭' : lang === 'ckb' ? 'داخستن' : 'Close'
  };

  const displayedPrograms = useMemo(() => {
    return programs.slice(0, 6);
  }, [programs]);

  return (
    <section className="w-full bg-paper-50 dark:bg-paper-950 border-y border-paper-200 dark:border-paper-800 py-12 md:py-16 my-8 transition-colors duration-300 relative overflow-hidden">
      {/* Background radial atmosphere using brand tokens */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-brand-800/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-brand-900/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-paper-200 dark:border-paper-800">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 border border-brand-200 dark:border-brand-900 text-brand-800 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.sectionBadge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-paper-950 dark:text-paper-50 tracking-tight leading-tight">
              {t.title}
            </h2>

            <p className="text-sm sm:text-base text-paper-700 dark:text-paper-300 leading-relaxed font-sans">
              {t.subtitle}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to={`/${lang}/cultural-exchange`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-paper-300 dark:border-paper-700 hover:border-brand-800 dark:hover:border-brand-500 bg-paper-100 dark:bg-paper-900 text-paper-900 dark:text-paper-100 text-xs sm:text-sm font-semibold transition group shadow-2xs hover:shadow-xs"
            >
              <span>{t.viewAll}</span>
              {isRtl ? (
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition duration-200 text-brand-800 dark:text-brand-400" />
              ) : (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-200 text-brand-800 dark:text-brand-400" />
              )}
            </Link>
          </div>
        </div>

        {/* Category Tabs (Educational and Higher Ed anchors prominent) */}
        <div className="py-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition flex items-center gap-1.5 border ${
                selectedCategory === 'all'
                  ? 'bg-brand-800 text-paper-50 border-brand-800 shadow-xs'
                  : 'bg-paper-100 dark:bg-paper-900 text-paper-700 dark:text-paper-300 border-paper-200 dark:border-paper-800 hover:bg-paper-200 dark:hover:bg-paper-850'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t.allPrograms}</span>
            </button>

            {categories.map((cat) => {
              const isActive = selectedCategory === cat.slug || selectedCategory === cat.id;
              const isAnchor = cat.slug === 'educational-exchange' || cat.slug === 'higher-education-university';

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-brand-800 text-paper-50 border-brand-800 shadow-xs'
                      : 'bg-paper-100 dark:bg-paper-900 text-paper-700 dark:text-paper-300 border-paper-200 dark:border-paper-800 hover:bg-paper-200 dark:hover:bg-paper-850'
                  }`}
                >
                  {isAnchor && (
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-paper-50' : 'bg-brand-700'} animate-pulse shrink-0`} />
                  )}
                  <span>{getCategoryName(cat)}</span>
                  {typeof cat._count?.programs === 'number' && (
                    <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-brand-900 text-paper-50'
                        : 'bg-paper-200 dark:bg-paper-800 text-paper-600 dark:text-paper-400'
                    }`}>
                      {cat._count.programs}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Card Grid with Motion & Transitions */}
        <AnimatePresence mode="wait">
          {isProgramsLoading ? (
            <motion.div
              key="loading-skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-paper-100 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 rounded-2xl h-96 overflow-hidden animate-pulse flex flex-col">
                  <div className="h-48 bg-paper-200 dark:bg-paper-800 w-full" />
                  <div className="p-5 space-y-3 flex-1">
                    <div className="h-4 bg-paper-200 dark:bg-paper-800 rounded w-1/3" />
                    <div className="h-6 bg-paper-200 dark:bg-paper-800 rounded w-4/5" />
                    <div className="h-3 bg-paper-200 dark:bg-paper-800 rounded w-full" />
                    <div className="h-3 bg-paper-200 dark:bg-paper-800 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : displayedPrograms.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-paper-100 dark:bg-paper-900/60 border border-dashed border-paper-300 dark:border-paper-800 rounded-3xl p-12 text-center my-4"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-100 dark:bg-brand-950 text-brand-800 dark:text-brand-300 flex items-center justify-center mb-4">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-paper-950 dark:text-paper-50">
                {t.emptyTitle}
              </h3>
              <p className="text-sm text-paper-600 dark:text-paper-400 max-w-md mx-auto mt-2">
                {t.emptyDesc}
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-5 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-800 text-paper-50 hover:bg-brand-700 transition"
              >
                {t.allPrograms}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`grid-${selectedCategory}`}
              initial={{ opacity: 0, x: isRtl ? 15 : -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRtl ? -15 : 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayedPrograms.map((prog, idx) => {
                const theme = getCategoryTheme(prog.category?.slug);

                return (
                  <motion.div
                    key={prog.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    whileHover={{ y: -4 }}
                    className={`bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${theme.cardHover}`}
                  >
                    {/* Top Image & Visual Anchor */}
                    <div>
                      <div className="relative h-52 w-full bg-paper-200 dark:bg-paper-800 overflow-hidden">
                        <img
                          src={prog.coverImage}
                          alt={getProgramTitle(prog)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-paper-950/85 via-paper-950/25 to-transparent" />

                        {/* Category badge */}
                        <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md border shadow-xs flex items-center gap-1.5 ${theme.badge}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                            <span>{prog.category ? getCategoryName(prog.category) : 'Cultural'}</span>
                          </span>
                        </div>

                        {/* Partner Institution Banner */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-paper-50 text-xs font-medium drop-shadow-md">
                          <div className="w-6 h-6 rounded-md bg-paper-50/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-paper-50/30">
                            <Building2 className="w-3.5 h-3.5 text-brand-300" />
                          </div>
                          <span className="truncate font-bold uppercase tracking-wider">{prog.institutionName}</span>
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="p-5 space-y-3">
                        {/* Dates & Deadlines */}
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                          {prog.eventDate ? (
                            <span className="flex items-center gap-1 text-paper-600 dark:text-paper-400">
                              <Calendar className="w-3.5 h-3.5 text-paper-500" />
                              <span className="truncate">{prog.eventDate}</span>
                            </span>
                          ) : <span />}

                          {prog.applicationDeadline && (
                            <span className="flex items-center gap-1 text-brand-800 dark:text-brand-300 font-semibold bg-brand-100 dark:bg-brand-950 px-2 py-0.5 rounded-md border border-brand-200 dark:border-brand-900">
                              <Clock className="w-3 h-3" />
                              <span>{t.deadline} {prog.applicationDeadline}</span>
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="font-black text-paper-950 dark:text-paper-50 text-lg leading-snug group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors duration-200 line-clamp-2">
                          {getProgramTitle(prog)}
                        </h3>

                        {/* Teaser Description */}
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
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-800 hover:bg-brand-700 text-paper-50 transition shadow-2xs"
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
      </div>

      {/* QUICK PROGRAM DOSSIER MODAL */}
      <AnimatePresence>
        {activeModalProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-paper-950/70 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Cover header */}
              <div className="relative h-60 w-full shrink-0">
                <img
                  src={activeModalProgram.coverImage}
                  alt={getProgramTitle(activeModalProgram)}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-paper-950 via-paper-950/40 to-transparent" />

                <button
                  onClick={() => setActiveModalProgram(null)}
                  className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 rounded-full bg-paper-950/60 text-paper-50 hover:bg-paper-950/80 transition"
                  title={t.close}
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-5 right-5 space-y-2 text-paper-50">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-brand-800 text-paper-50">
                      {activeModalProgram.category ? getCategoryName(activeModalProgram.category) : 'Program'}
                    </span>
                    <span className="text-xs text-paper-300 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-brand-300" />
                      {activeModalProgram.institutionName}
                    </span>
                  </div>
                  <h3 className="font-black text-xl sm:text-2xl leading-tight">
                    {getProgramTitle(activeModalProgram)}
                  </h3>
                </div>
              </div>

              {/* Scrollable details */}
              <div className="p-6 overflow-y-auto space-y-5 text-paper-800 dark:text-paper-200 text-sm leading-relaxed">
                {/* Meta details bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-paper-100 dark:bg-paper-850 border border-paper-200 dark:border-paper-800 text-xs">
                  {activeModalProgram.eventDate && (
                    <div>
                      <span className="text-paper-500 block mb-0.5">Program Cycle:</span>
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
                      <span className="text-paper-500 block mb-0.5">{t.eligibility}</span>
                      <span className="text-paper-800 dark:text-paper-200 font-medium">{activeModalProgram.eligibility}</span>
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="space-y-4 whitespace-pre-line font-sans">
                  {getProgramDetails(activeModalProgram)}
                </div>

                {/* Action footer */}
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
    </section>
  );
}
