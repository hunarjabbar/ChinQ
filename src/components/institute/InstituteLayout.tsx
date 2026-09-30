import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Locale } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  BookOpen, 
  Database, 
  Users, 
  Handshake, 
  Calendar, 
  ShieldCheck, 
  FileText,
  Search,
  Globe,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Landmark
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useI18n } from '../../hooks/useI18n';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { CiseHubFooterLogin } from './CiseHubFooterLogin';
import { HubLoginFooter } from '../HubLoginFooter';

interface InstituteLayoutProps {
  children: React.ReactNode;
  lang: Locale;
}

const localizedBrandNames: Record<Locale, string> = {
  en: 'Chinese Institute for Strategic and Economic Studies',
  ar: 'المعهد الصيني للدراسات الاستراتيجية والاقتصادية',
  zh: '中国战略与经济研究所',
  ckb: 'پەیمانگای چینی بۆ لێکۆڵینەوەی ستراتیژی و ئابووری'
};

export function InstituteLayout({ children, lang }: InstituteLayoutProps) {
  const isRtl = lang === 'ar' || lang === 'ckb';
  const location = useLocation();
  const { t } = useI18n(lang);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { 
      id: '', 
      label: { en: 'Overview', ar: 'نظرة عامة', zh: '研究所首页', ckb: 'تێڕوانین' }, 
      shortLabel: { en: 'Overview', ar: 'نظرة عامة', zh: '首页', ckb: 'تێڕوانین' },
      icon: Building2 
    },
    { 
      id: 'about', 
      label: { en: 'About & Charter', ar: 'عن المعهد والميثاق', zh: '关于与章程', ckb: 'دەربارەی پەیمانگا' }, 
      shortLabel: { en: 'About', ar: 'عن المعهد', zh: '关于', ckb: 'دەربارە' },
      icon: ShieldCheck 
    },
    { 
      id: 'research', 
      label: { en: 'Research Pillars', ar: 'ركائز البحث', zh: '研究支柱', ckb: 'بنەماکانی توێژینەوە' }, 
      shortLabel: { en: 'Research', ar: 'الأبحاث', zh: '研究', ckb: 'توێژینەوە' },
      icon: BookOpen 
    },
    { 
      id: 'services', 
      label: { en: 'Services & Initiatives', ar: 'الخدمات والمبادرات', zh: '机构服务与倡议', ckb: 'خزمەتگوزاری و دەستپێشخەرییەکان' }, 
      shortLabel: { en: 'Services', ar: 'الخدمات', zh: '服务', ckb: 'خزمەتگوزاری' },
      icon: Landmark,
      hasDropdown: true
    },
    { 
      id: 'publications', 
      label: { en: 'Publications', ar: 'الأبحاث والمنشورات', zh: '研究文库', ckb: 'بڵاوکراوەکان' }, 
      shortLabel: { en: 'Publications', ar: 'المنشورات', zh: '文库', ckb: 'بڵاوکراوەکان' },
      icon: FileText 
    },
    { 
      id: 'data-hub', 
      label: { en: 'Data Hub', ar: 'مركز البيانات', zh: '数据中心', ckb: 'ناوەندی زانیاری' }, 
      shortLabel: { en: 'Data Hub', ar: 'البيانات', zh: '数据', ckb: 'داتا' },
      icon: Database 
    },
    { 
      id: 'experts', 
      label: { en: 'Experts', ar: 'الخبراء والزملاء', zh: '智库专家', ckb: 'شارەزایان' }, 
      shortLabel: { en: 'Experts', ar: 'الخبراء', zh: '专家', ckb: 'شارەزایان' },
      icon: Users 
    },
    { 
      id: 'partnerships', 
      label: { en: 'Partnerships', ar: 'الشراكات', zh: '战略伙伴', ckb: 'هاوبەشییەکان' }, 
      shortLabel: { en: 'Partnerships', ar: 'الشراكات', zh: '伙伴', ckb: 'هاوبەشی' },
      icon: Handshake 
    },
    { 
      id: 'events', 
      label: { en: 'Events', ar: 'الفعاليات', zh: '政策峰会', ckb: 'چالاکییەکان' }, 
      shortLabel: { en: 'Events', ar: 'الفعاليات', zh: '峰会', ckb: 'چالاکی' },
      icon: Calendar 
    },
  ];

  const serviceSubItems = [
    { 
      id: 'summit', 
      label: { en: 'Iraq-China Economic Summit & Expo', ar: 'القمة الاقتصادية والمعرض الثنائي', zh: '伊拉克-中国经济峰会暨博览会', ckb: 'لووتکەی ئابووری و پێشانگای دوولایەنە' }, 
      tag: { en: 'Sulaymaniyah', ar: 'السليمانية', zh: '苏莱曼尼亚', ckb: 'سلێمانی' },
      path: `/${lang}/institute/summit` 
    },
    { 
      id: 'settlement', 
      label: { en: 'Direct IQD ⇄ RMB Clearing Rail', ar: 'تسوية المدفوعات المباشرة (دينار/يوان)', zh: '第纳尔/人民币主权清算通道', ckb: 'پاکتاوی دراوەکان (دینار/یوان)' }, 
      tag: { en: '0% USD Drag', ar: 'بدون احتكاك بالدولار', zh: '零美元敞口', ckb: 'بێ دۆلار' },
      path: `/${lang}/institute/settlement` 
    },
    { 
      id: 'insurance-facilitation', 
      label: { en: 'Sovereign Insurance Facilitation', ar: 'تسهيل التأمين السيادي (سينوشور)', zh: '主权保险与中信保对接服务', ckb: 'ئاسانکاری بیمەی سەروەری' }, 
      tag: { en: 'Sinosure', ar: 'سينوشور', zh: '中信保', ckb: 'سینۆشوور' },
      path: `/${lang}/institute/insurance-facilitation` 
    },
    { 
      id: 'cultural-exchange', 
      label: { en: 'Cultural Exchange', ar: 'التبادل الثقافي', zh: '文化交流', ckb: 'ئاڵوگۆڕی کولتووری' }, 
      tag: { en: 'Academic MOUs', ar: 'مذكرات تفاهم', zh: '学术交流', ckb: 'لێکتێگەیشتنی زانکۆیی' },
      path: `/${lang}/institute/services/cultural-exchange` 
    },
    { 
      id: 'visa-centre', 
      label: { en: 'Bilateral Visa Advisory Centre', ar: 'مركز الاستشارات والفيزا الثنائية', zh: '双边签证咨询与代办服务中心', ckb: 'ناوەندی ڕاوێژکاری ڤیزا' }, 
      tag: { en: 'Bilateral', ar: 'ثنائي', zh: '双向代办', ckb: 'دوولایەنە' },
      path: `/${lang}/institute/visa-centre` 
    },
    { 
      id: 'chinese-center', 
      label: { en: 'Chinese Language Tutoring Centre', ar: 'مركز تعليم اللغة الصينية المعتمد', zh: '汉语言教学与 HSK 认证考点', ckb: 'ناوەندی فێرکاری زمانی چینی' }, 
      tag: { en: 'HSK 1–9', ar: 'HSK 1–9', zh: 'HSK考点', ckb: 'HSK 1–9' },
      path: `/${lang}/institute/chinese-center` 
    },
    { 
      id: 'consultancy', 
      label: { en: 'Strategic Financial & Legal Advisory', ar: 'الاستشارات المالية والقانونية', zh: '跨境财税与战略法律咨询', ckb: 'ڕاوێژکاری دارایی و یاسایی' }, 
      tag: { en: 'Advisory', ar: 'استشارات', zh: '财税法律', ckb: 'ڕاوێژکاری' },
      path: `/${lang}/institute/consultancy` 
    },
  ];

  const isHome = location.pathname === `/${lang}/institute` || location.pathname === `/${lang}/institute/`;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a]" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Institute Specialized Two-Row Header */}
      <header className="sticky top-0 z-50 shadow-xl site-header" id="cise-header">
        {/* ROW 1: Brand & Global Actions Band */}
        <div className="bg-[var(--color-ink-900)] text-white border-b border-white/10">
          <div className="site-header__inner">
            <div className="flex items-center justify-between h-14 sm:h-16 lg:h-[72px]">
              {/* Brand Wordmark */}
              <Link 
                to={`/${lang}/institute`} 
                aria-label={localizedBrandNames[lang] || localizedBrandNames.en}
                className="flex items-center gap-3 sm:gap-3.5 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-800)] rounded-xl min-h-[44px]"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 bg-white rounded-xl flex items-center justify-center text-neutral-950 font-black text-lg sm:text-xl shadow-lg shadow-white/10 group-hover:scale-105 group-hover:shadow-white/25 transition-all shrink-0">
                  CI
                </div>
                <div className="flex flex-col text-left rtl:text-right">
                  <div className="text-xs sm:text-base lg:text-lg font-black tracking-tight uppercase leading-tight text-white group-hover:text-white transition-colors whitespace-nowrap">
                    Chinese Institute
                  </div>
                  <div className="hidden sm:block text-[9px] sm:text-[10px] lg:text-[11px] font-bold text-white uppercase tracking-widest leading-none mt-0.5 whitespace-nowrap opacity-95">
                    For Strategic and Economic Studies
                  </div>
                </div>
              </Link>

              {/* Right Action Cluster */}
              <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                {/* Back to ICA button */}
                <Link 
                  to={`/${lang}`}
                  className="h-8 sm:h-10 px-2 sm:px-4 rounded-xl border border-white/20 hover:border-white/40 text-[10px] sm:text-xs font-black uppercase tracking-wider text-neutral-200 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[var(--color-brand-800)]"
                >
                  {isRtl ? <ArrowRight size={13} /> : <ArrowLeft size={13} />}
                  <span className="hidden sm:inline">{t('backToIca')}</span>
                  <span className="sm:hidden text-[10px]">ICA</span>
                </Link>

                {/* ICA Newsroom Button - Royal Blue */}
                <a 
                  href={`/${lang}/newsroom`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex h-9 sm:h-10 px-3 sm:px-4 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#0369A1] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all items-center gap-2 shadow-sm hover:shadow-md whitespace-nowrap focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>{t('footerIcaNewsroom')}</span>
                  <ArrowUpRight size={14} className="shrink-0" />
                </a>

                {/* Search Button */}
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search Institute publications and data"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-[var(--color-brand-800)]"
                >
                  <Search size={15} />
                </button>

                {/* Integrated Language Switcher */}
                <div className="hidden lg:block">
                  <LanguageSwitcher lang={lang} />
                </div>

                {/* Mobile Drawer Hamburger */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle navigation menu"
                  className="lg:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-all"
                >
                  {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: Primary Institute Navigation Band */}
        <div className="bg-[#0B1120] border-b border-white/10 shadow-inner w-full max-w-full overflow-x-auto lg:overflow-visible scrollbar-none">
          <div className="site-header__inner w-full overflow-x-auto lg:overflow-visible scrollbar-none">
            <nav className="flex items-center gap-1 sm:gap-2 h-11 lg:h-12 w-max min-w-full lg:min-w-0" aria-label="Institute Main Navigation">
              {navItems.map((item) => {
                const path = item.id ? `/${lang}/institute/${item.id}` : `/${lang}/institute`;
                const active = item.id === '' 
                  ? isHome 
                  : (item.id === 'services' 
                      ? location.pathname.startsWith(`/${lang}/institute/services`) ||
                        location.pathname.startsWith(`/${lang}/institute/summit`) ||
                        location.pathname.startsWith(`/${lang}/institute/settlement`) ||
                        location.pathname.startsWith(`/${lang}/institute/insurance-facilitation`) ||
                        location.pathname.startsWith(`/${lang}/institute/visa-centre`) ||
                        location.pathname.startsWith(`/${lang}/institute/chinese-center`) ||
                        location.pathname.startsWith(`/${lang}/institute/consultancy`) ||
                        location.pathname.startsWith(`/${lang}/institute/cultural-exchange`)
                      : location.pathname.startsWith(path));

                if (item.id === 'services') {
                  return (
                    <div key={item.id} className="relative group h-full flex items-center shrink-0">
                      <Link
                        to={path}
                        className={cn(
                          "relative h-full flex items-center gap-1.5 px-3 sm:px-4 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all focus-visible:outline-none focus-visible:text-white",
                          active 
                            ? "text-white font-black drop-shadow-sm" 
                            : "text-neutral-300 hover:text-white"
                        )}
                      >
                        <span className="text-white">
                          <span className="hidden 2xl:inline">{item.label[lang] || item.label.en}</span>
                          <span className="2xl:hidden">{item.shortLabel[lang] || item.shortLabel.en}</span>
                        </span>
                        <ChevronDown size={12} className="transition-transform group-hover:rotate-180 opacity-70 text-white" />

                        {active && (
                          <motion.div 
                            layoutId="activeTabUnderline"
                            className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white rounded-t-sm shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                          />
                        )}
                      </Link>

                      {/* Dropdown Menu for First-Class Services */}
                      <div className="absolute top-full left-0 rtl:left-auto rtl:right-0 bg-[var(--color-ink-900)] border border-white/10 shadow-2xl rounded-2xl w-80 py-3 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="px-4 pb-2 mb-2 border-b border-white/10 flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-brand-800)]">
                            {lang === 'ar' ? 'المبادرات والخدمات التشغيلية' : lang === 'zh' ? '智库六大直属服务' : lang === 'ckb' ? 'خزمەتگوزارییە سەرەکییەکان' : 'CISE Operational Initiatives'}
                          </span>
                        </div>
                        <div className="space-y-1 px-2">
                          {serviceSubItems.map((sub) => {
                            const isSubActive = location.pathname.startsWith(sub.path);
                            return (
                              <Link
                                key={sub.id}
                                to={sub.path}
                                className={cn(
                                  "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all",
                                  isSubActive 
                                    ? "bg-[var(--color-brand-800)]/15 text-[var(--color-brand-800)]" 
                                    : "text-neutral-300 hover:text-white hover:bg-white/5"
                                )}
                              >
                                <span className="truncate pr-2">{sub.label[lang] || sub.label.en}</span>
                                <span className="text-[9px] font-black uppercase tracking-wider text-neutral-500 shrink-0">
                                  {sub.tag[lang] || sub.tag.en}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="pt-2 mt-2 border-t border-white/10 px-2">
                          <Link
                            to={`/${lang}/institute/services`}
                            className="flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider text-[var(--color-brand-800)] hover:bg-[var(--color-brand-800)]/10 transition-colors"
                          >
                            <span>{lang === 'ar' ? 'دليل الخدمات الكامل' : lang === 'zh' ? '查看全部服务目录' : lang === 'ckb' ? 'هەموو خزمەتگوزارییەکان' : 'View Full Services Directory'}</span>
                            <ArrowRight size={13} className={isRtl ? 'rotate-180' : ''} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                return (
                  <Link
                    key={item.id}
                    to={path}
                    className={cn(
                      "relative h-full flex items-center px-3 sm:px-4 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all shrink-0 focus-visible:outline-none focus-visible:text-white",
                      active 
                        ? "text-white font-black drop-shadow-sm" 
                        : "text-neutral-300 hover:text-white"
                    )}
                  >
                    <span className={active ? "text-white" : "text-neutral-300 group-hover:text-white"}>
                      <span className="hidden 2xl:inline">{item.label[lang] || item.label.en}</span>
                      <span className="2xl:hidden">{item.shortLabel[lang] || item.shortLabel.en}</span>
                    </span>

                    {/* White Underline Tab Highlight */}
                    {active && (
                      <motion.div 
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white rounded-t-sm shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-[var(--color-ink-900)]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
            >
              <button 
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search overlay"
                className="absolute top-6 right-6 sm:top-8 sm:right-8 text-neutral-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={28} />
              </button>
              <div className="w-full max-w-3xl space-y-8">
                <div className="space-y-2 text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-brand-800)]">{t('searchCiseInstitutional')}</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter">{t('searchFindResearchData')}</h2>
                </div>
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" size={22} />
                  <input 
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholderInstitute')}
                    className="w-full bg-white/5 border-b-2 border-white/20 focus:border-[var(--color-brand-800)] py-5 pl-16 pr-6 text-xl sm:text-2xl font-black text-white outline-none transition-all placeholder:text-neutral-500"
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[t('policyBriefs'), t('businessStats'), t('projects'), t('experts')].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-300 hover:text-white transition-all text-center"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[var(--color-ink-900)] border-b border-white/10 px-4 py-6 space-y-4 shadow-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {navItems.map((item) => {
                  const path = item.id ? `/${lang}/institute/${item.id}` : `/${lang}/institute`;
                  const active = item.id === '' 
                    ? isHome 
                    : (item.id === 'services'
                        ? location.pathname.startsWith(`/${lang}/institute/services`) ||
                          location.pathname.startsWith(`/${lang}/institute/summit`) ||
                          location.pathname.startsWith(`/${lang}/institute/settlement`) ||
                          location.pathname.startsWith(`/${lang}/institute/insurance-facilitation`) ||
                          location.pathname.startsWith(`/${lang}/institute/visa-centre`) ||
                          location.pathname.startsWith(`/${lang}/institute/chinese-center`) ||
                          location.pathname.startsWith(`/${lang}/institute/consultancy`) ||
                          location.pathname.startsWith(`/${lang}/institute/cultural-exchange`)
                        : location.pathname.startsWith(path));
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.id}
                      to={path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all",
                        active 
                          ? "bg-[var(--color-brand-800)] text-[var(--color-ink-900)] font-black shadow-md" 
                          : "text-neutral-300 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <Icon size={16} />
                      <span>{item.label[lang] || item.label.en}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile First-Class Initiatives Quick Strip */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-brand-800)] block px-1">
                  {lang === 'ar' ? 'المبادرات والخدمات التشغيلية' : lang === 'zh' ? '智库直属运营倡议' : lang === 'ckb' ? 'دەستپێشخەرییە سەرەکییەکان' : 'Core Institutional Initiatives'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {serviceSubItems.map((sub) => (
                    <Link
                      key={sub.id}
                      to={sub.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold text-neutral-300 hover:text-white flex items-center justify-between"
                    >
                      <span className="truncate">{sub.label[lang] || sub.label.en}</span>
                      <span className="text-[9px] text-[var(--color-brand-800)] shrink-0 font-bold uppercase">{sub.tag[lang] || sub.tag.en}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Language</span>
                <LanguageSwitcher lang={lang} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="pb-20">
        {children}
      </main>

      {/* Institute Specialized Footer */}
      <footer className="bg-[var(--color-ink-900)] text-white py-14 border-t border-white/10 w-full">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-[var(--color-brand-800)] rounded-xl flex items-center justify-center text-[var(--color-ink-900)] font-black text-xl shadow-md">
                  CI
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black tracking-tight uppercase leading-tight">
                    {t('footerInstituteName')}
                  </h2>
                  <p className="text-[10px] font-bold text-[var(--color-brand-800)] uppercase tracking-[0.2em]">
                    {t('footerInstituteSubtitle')}
                  </p>
                </div>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-md font-medium">
                {t('footerTagline')}
              </p>
            </div>

            {/* Column 3: Institutional Services (All 7 First-Class Initiatives) */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[var(--color-brand-800)] mb-4">
                {lang === 'ar' ? 'الخدمات والمبادرات' : lang === 'zh' ? '智库服务与倡议' : lang === 'ckb' ? 'خزمەتگوزارییەکان' : 'Institutional Services'}
              </h3>
              <ul className="space-y-1 text-xs font-bold text-neutral-400">
                <li>
                  <Link to={`/${lang}/institute/summit`} className="hover:text-white transition-colors uppercase tracking-wider flex items-center min-h-[34px]">
                    {lang === 'ar' ? 'القمة والمعرض الثنائي' : lang === 'zh' ? '经济峰会暨博览会' : lang === 'ckb' ? 'لووتکەی ئابووری' : 'Bilateral Summit & Expo'}
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/institute/settlement`} className="hover:text-white transition-colors uppercase tracking-wider flex items-center min-h-[34px]">
                    {lang === 'ar' ? 'تسوية المدفوعات السيادية' : lang === 'zh' ? '第纳尔/人民币清算' : lang === 'ckb' ? 'پاکتاوی دراوەکان' : 'Payment Settlement Rail'}
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/institute/insurance-facilitation`} className="hover:text-white transition-colors uppercase tracking-wider flex items-center min-h-[34px]">
                    {lang === 'ar' ? 'تأمين الصادرات (سينوشور)' : lang === 'zh' ? '主权保险对接' : lang === 'ckb' ? 'بیمەی سەروەری' : 'Insurance Facilitation'}
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/institute/services/cultural-exchange`} className="hover:text-white transition-colors uppercase tracking-wider flex items-center min-h-[34px]">
                    {lang === 'ar' ? 'التبادل الثقافي والأكاديمي' : lang === 'zh' ? '文化与学术交流' : lang === 'ckb' ? 'ئاڵوگۆڕی کولتووری' : 'Cultural Exchange'}
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/institute/visa-centre`} className="hover:text-white transition-colors uppercase tracking-wider flex items-center min-h-[34px]">
                    {lang === 'ar' ? 'مركز استشارات التأشيرات' : lang === 'zh' ? '双边签证中心' : lang === 'ckb' ? 'ناوەندی ڤیزا' : 'Visa Advisory Centre'}
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/institute/chinese-center`} className="hover:text-white transition-colors uppercase tracking-wider flex items-center min-h-[34px]">
                    {lang === 'ar' ? 'مركز تعليم اللغة الصينية' : lang === 'zh' ? '汉语言教学中心' : lang === 'ckb' ? 'ناوەندی زمانی چینی' : 'Chinese Language Centre'}
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/institute/consultancy`} className="hover:text-white transition-colors uppercase tracking-wider flex items-center min-h-[34px]">
                    {lang === 'ar' ? 'الاستشارات المالية والقانونية' : lang === 'zh' ? '战略财税与法律咨询' : lang === 'ckb' ? 'ڕاوێژکاری دارایی و یاسایی' : 'Financial & Legal Advisory'}
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/institute/services`} className="text-[var(--color-brand-800)] hover:underline uppercase tracking-wider flex items-center min-h-[34px]">
                    {lang === 'ar' ? 'دليل الخدمات الكامل ←' : lang === 'zh' ? '全部服务名录 →' : lang === 'ckb' ? 'تەواوی خزمەتگوزارییەکان ←' : 'All Services Directory →'}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[var(--color-brand-800)] mb-4">{t('footerResearchPillarsHeading')}</h3>
              <ul className="space-y-1 text-xs font-bold text-neutral-400">
                <li>
                  <Link to={`/${lang}/institute/research/energy-bri`} className="hover:text-white transition-colors uppercase tracking-wider flex items-center min-h-[34px]">
                    {t('footerPillarEnergyBri')}
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/institute/research/geo-economics`} className="hover:text-white transition-colors uppercase tracking-wider flex items-center min-h-[34px]">
                    {t('footerPillarGeoEconomics')}
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/institute/research/diplomacy`} className="hover:text-white transition-colors uppercase tracking-wider flex items-center min-h-[34px]">
                    {t('footerPillarDiplomacy')}
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/institute/research/digital-silk-road`} className="hover:text-white transition-colors uppercase tracking-wider flex items-center min-h-[34px]">
                    {t('footerPillarDigitalSilkRoad')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[var(--color-brand-800)] mb-4">{t('footerResourcesDataHeading')}</h3>
              <ul className="space-y-1 text-xs font-bold text-neutral-400">
                <li>
                  <Link to={`/${lang}/institute/publications`} className="hover:text-white transition-colors uppercase tracking-wider flex items-center min-h-[34px]">
                    {t('footerResourceWhitePapers')}
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/institute/data-hub/trade`} className="hover:text-white transition-colors uppercase tracking-wider flex items-center min-h-[34px]">
                    {t('footerResourceTradeFlow')}
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/institute/experts`} className="hover:text-white transition-colors uppercase tracking-wider flex items-center min-h-[34px]">
                    {t('footerResourceFellows')}
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/institute/partnerships`} className="hover:text-white transition-colors uppercase tracking-wider flex items-center min-h-[34px]">
                    {t('footerResourceSyndication')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* CISE Command Hub Footer Login Widget */}
          <CiseHubFooterLogin lang={lang} className="my-8" />

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                to={`/${lang}`}
                className="text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-[var(--color-brand-800)] transition-colors flex items-center gap-1.5"
              >
                {isRtl ? <ArrowRight size={12} /> : <ArrowLeft size={12} />}
                <span>{t('backToIca')}</span>
              </Link>
              <div className="w-1 h-1 bg-neutral-700 rounded-full"></div>
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-[0.15em] text-neutral-400">
                <span>{t('footerBrandLine')}</span>
                <span className="hover:text-white transition-colors cursor-pointer">{t('footerLegalResearchIndependence')}</span>
                <span className="hover:text-white transition-colors cursor-pointer">{t('footerLegalCharter')}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <HubLoginFooter lang={lang} />
              <LanguageSwitcher lang={lang} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

