import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CulturalExchangeCategory, CulturalExchangeProgram, Locale } from '../../../types';
import {
  GraduationCap, Building2, Calendar, Clock, Search,
  ExternalLink, ArrowLeft, ArrowRight, BookOpen, X, Share2, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function CulturalExchangePrograms() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProgram, setActiveModalProgram] = useState<CulturalExchangeProgram | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const { data: categories = [] } = useQuery<CulturalExchangeCategory[]>({
    queryKey: ['cultural-categories-programs-page'],
    queryFn: async () => {
      const res = await fetch('/api/cultural-exchange/categories');
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    }
  });

  const { data: programs = [], isLoading } = useQuery<CulturalExchangeProgram[]>({
    queryKey: ['cultural-programs-full-page', selectedCategory, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      const res = await fetch(`/api/cultural-exchange/programs?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch programs');
      return res.json();
    }
  });

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

  const t = {
    title: lang === 'ar' ? 'دليل برامج التبادل الثقافي والأكاديمي الكامل' : lang === 'zh' ? '中伊人文交流与奖学金项目全景目录' : lang === 'ckb' ? 'تەواوی بەرنامەکانی ئاڵوگۆڕی کولتووری و ئەکادیمی' : 'All Cultural & Educational Exchange Programs',
    subtitle: lang === 'ar' ? 'استعرض كافة المنح الجامعية، زمالات الدراسات العليا، برامج انغماس الشباب، والاتفاقيات المدرسية المشتركة.' : lang === 'zh' ? '全景检索双边高校联合培养、学术驻留交流、青年研学以及两河流域古文明对话重点项目。' : lang === 'ckb' ? 'گەڕان بەدوای هەموو زەمالەی زانکۆیی، ڕاهێنانی لاوان و هاوبەشییە فەرمییەکان.' : 'Comprehensive registry of all university MOUs, student immersion fellowships, arts residencies, and civilizational dialogues.',
    backToLanding: lang === 'ar' ? 'العودة للتبادل الثقافي' : lang === 'zh' ? '返回文化交流主页' : lang === 'ckb' ? 'گەڕانەوە بۆ ئاڵوگۆڕی کولتووری' : 'Back to Cultural Exchange',
    allCategories: lang === 'ar' ? 'جميع المسارات' : lang === 'zh' ? '全部项目分类' : lang === 'ckb' ? 'هەموو جۆرەکان' : 'All Categories',
    searchPlaceholder: lang === 'ar' ? 'ابحث عن اسم البرنامج، الجامعة أو الشروط...' : lang === 'zh' ? '搜索合作高校、学科计划或申请条件...' : lang === 'ckb' ? 'گەڕان بەدوای زانکۆ یان بەرنامە...' : 'Search programs, universities, or keywords...',
    deadline: lang === 'ar' ? 'آخر موعد:' : lang === 'zh' ? '申请截止：' : lang === 'ckb' ? 'کۆتا وادە:' : 'Deadline:',
    learnMore: lang === 'ar' ? 'ملف البرنامج والمنهاج' : lang === 'zh' ? '查看项目简章' : lang === 'ckb' ? 'وردەکارییەکان' : 'Program Dossier',
    applyNow: lang === 'ar' ? 'التقديم والمراسلة' : lang === 'zh' ? '立即报名/联系' : lang === 'ckb' ? 'پێشکەشکردن' : 'Apply / Inquire',
    close: lang === 'ar' ? 'إغلاق' : lang === 'zh' ? '关闭' : lang === 'ckb' ? 'داخستن' : 'Close',
    share: lang === 'ar' ? 'نسخ رابط البرنامج' : lang === 'zh' ? '复制项目链接' : lang === 'ckb' ? 'کۆپیکردنی بەستەر' : 'Copy Link',
    copied: lang === 'ar' ? 'تم النسخ!' : lang === 'zh' ? '已复制！' : lang === 'ckb' ? 'کۆپی کرا!' : 'Copied!',
    navPartners: lang === 'ar' ? 'الجامعات الشريكة' : lang === 'zh' ? '合作院校' : lang === 'ckb' ? 'زانکۆ هاوبەشەکان' : 'Partner Universities',
    navApply: lang === 'ar' ? 'طلب التقديم' : lang === 'zh' ? '在线申请' : lang === 'ckb' ? 'داواکاری' : 'Apply / Inquire',
    navFaq: lang === 'ar' ? 'الأسئلة الشائعة' : lang === 'zh' ? '常见问题' : lang === 'ckb' ? 'پرسیارە باوەکان' : 'FAQ',
    navContact: lang === 'ar' ? 'مكتب الاتصال' : lang === 'zh' ? '学术联络' : lang === 'ckb' ? 'پەیوەندی' : 'Academic Contact',
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
            <Link to={`/${lang}/institute/services/cultural-exchange`} className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5">
              {lang === 'ar' ? 'نظرة عامة' : lang === 'zh' ? '概览' : lang === 'ckb' ? 'پوختە' : 'Overview'}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/programs`} className="px-3 py-1.5 rounded-lg bg-[var(--color-brand-800)]/20 text-[var(--color-brand-800)]">
              {lang === 'ar' ? 'دليل البرامج' : lang === 'zh' ? '全部项目' : lang === 'ckb' ? 'بەرنامەکان' : 'All Programs'}
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
            to={`/${lang}/institute/services/cultural-exchange`}
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-[var(--color-brand-800)] hover:underline"
          >
            <span>{t.backToLanding}</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="mb-6">
          <Link
            to={`/${lang}/institute/services/cultural-exchange`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-paper-600 dark:text-paper-400 hover:text-brand-800 dark:hover:text-brand-400 transition"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t.backToLanding}</span>
          </Link>
        </div>

        <div className="space-y-3 mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-paper-950 dark:text-paper-50 uppercase tracking-tight">
            {t.title}
          </h1>
          <p className="text-sm sm:text-base text-paper-700 dark:text-paper-300 max-w-3xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between mb-8 pb-6 border-b border-paper-200 dark:border-paper-800">
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
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                  selectedCategory === cat.slug
                    ? 'bg-brand-800 text-paper-50 border-brand-800 shadow-xs'
                    : 'bg-paper-100 dark:bg-paper-900 text-paper-700 dark:text-paper-300 border-paper-200 dark:border-paper-800 hover:bg-paper-200 dark:hover:bg-paper-800'
                }`}
              >
                {getCategoryName(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-0">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 rounded-2xl bg-paper-200 dark:bg-paper-800 animate-pulse" />
              ))}
            </div>
          ) : programs.length === 0 ? (
            <div className="bg-paper-100 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 rounded-3xl p-16 text-center max-w-md mx-auto">
              <GraduationCap className="w-12 h-12 mx-auto text-paper-400 mb-3" />
              <h3 className="text-lg font-bold text-paper-950 dark:text-paper-50">No programs found</h3>
              <p className="text-sm text-paper-600 dark:text-paper-400 mt-1">Try adjusting your filter or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-0">
              {programs.map((prog) => (
                <div
                  key={prog.id}
                  className="bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-brand-600"
                >
                  <div>
                    <div className="relative h-52 w-full bg-paper-200 dark:bg-paper-800 overflow-hidden">
                      <img
                        src={prog.coverImage}
                        alt={getProgramTitle(prog)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-paper-950/85 via-paper-950/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-paper-50 text-xs font-medium">
                        <Building2 className="w-3.5 h-3.5 text-[var(--color-brand-800)]" />
                        <span className="truncate">{prog.institutionName}</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs text-paper-600 dark:text-paper-400">
                        <span>{prog.eventDate || '2026 Academic Year'}</span>
                        {prog.applicationDeadline && (
                          <span className="font-semibold text-brand-800 dark:text-brand-300 bg-brand-100 dark:bg-brand-950 px-2 py-0.5 rounded">
                            {t.deadline} {prog.applicationDeadline}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-serif font-bold text-paper-950 dark:text-paper-50 leading-snug">
                        {getProgramTitle(prog)}
                      </h3>

                      <p className="text-xs sm:text-sm text-paper-700 dark:text-paper-300 line-clamp-3 leading-relaxed">
                        {getProgramDesc(prog)}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalProgram(prog)}
                      className="flex-1 px-3 py-2 rounded-xl text-xs font-semibold bg-paper-100 dark:bg-paper-800 text-paper-900 dark:text-paper-100 hover:bg-paper-200 dark:hover:bg-paper-700 transition flex items-center justify-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-brand-800 dark:text-brand-400" />
                      <span>{t.learnMore}</span>
                    </button>

                    <Link
                      to={`/${lang}/institute/services/cultural-exchange/programs/${prog.slug || prog.id}`}
                      className="px-3 py-2 rounded-xl text-xs font-semibold border border-paper-300 dark:border-paper-700 hover:border-brand-600 transition"
                    >
                      <span>Dossier →</span>
                    </Link>

                    <Link
                      to={`/${lang}/institute/services/cultural-exchange/apply?program=${prog.id}`}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-800 hover:bg-brand-900 text-paper-50 transition shadow-xs"
                    >
                      <span>{t.applyNow}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal Dossier */}
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

export default CulturalExchangePrograms;
