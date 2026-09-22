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
  ChevronDown
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useI18n } from '../../hooks/useI18n';
import { LanguageSwitcher } from '../LanguageSwitcher';

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

  const isHome = location.pathname === `/${lang}/institute` || location.pathname === `/${lang}/institute/`;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a]" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Institute Specialized Two-Row Header */}
      <header className="sticky top-0 z-50 shadow-xl" id="cise-header">
        {/* ROW 1: Brand & Global Actions Band */}
        <div className="bg-[#0F172A] text-white border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-14 sm:h-16 lg:h-[72px]">
              {/* Brand Wordmark */}
              <Link 
                to={`/${lang}/institute`} 
                aria-label={localizedBrandNames[lang] || localizedBrandNames.en}
                className="flex items-center gap-3 sm:gap-3.5 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] rounded-xl"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#D97706] rounded-xl flex items-center justify-center text-[#0F172A] font-black text-lg sm:text-xl shadow-lg group-hover:scale-105 transition-transform shrink-0">
                  CI
                </div>
                <div className="flex flex-col text-left rtl:text-right">
                  <div className="text-xs sm:text-base lg:text-lg font-black tracking-tight uppercase leading-tight text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">
                    Chinese Institute
                  </div>
                  <div className="hidden sm:block text-[9px] sm:text-[10px] lg:text-[11px] font-bold text-[#D97706] uppercase tracking-widest leading-none mt-0.5 whitespace-nowrap">
                    For Strategic and Economic Studies
                  </div>
                </div>
              </Link>

              {/* Right Action Cluster */}
              <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                {/* Back to ICA button */}
                <Link 
                  to={`/${lang}`}
                  className="h-8 sm:h-10 px-2 sm:px-4 rounded-xl border border-white/20 hover:border-white/40 text-[10px] sm:text-xs font-black uppercase tracking-wider text-neutral-200 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#0284C7]"
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
                  className="hidden md:flex h-9 sm:h-10 px-3 sm:px-4 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all items-center gap-2 shadow-sm hover:shadow-md whitespace-nowrap focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>{t('footerIcaNewsroom')}</span>
                  <ArrowUpRight size={14} className="shrink-0" />
                </a>

                {/* Search Button */}
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search Institute publications and data"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-[#D97706]"
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
        <div className="bg-[#0B1120] border-b border-white/10 shadow-inner w-full max-w-full overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full overflow-x-auto scrollbar-none">
            <nav className="flex items-center gap-1 sm:gap-2 h-11 lg:h-12 w-max min-w-full lg:min-w-0" aria-label="Institute Main Navigation">
              {navItems.map((item) => {
                const path = item.id ? `/${lang}/institute/${item.id}` : `/${lang}/institute`;
                const active = item.id === '' ? isHome : location.pathname.startsWith(path);
                
                return (
                  <Link
                    key={item.id}
                    to={path}
                    className={cn(
                      "relative h-full flex items-center px-3 sm:px-4 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all shrink-0 focus-visible:outline-none focus-visible:text-white",
                      active 
                        ? "text-[#D97706] font-black" 
                        : "text-neutral-400 hover:text-white"
                    )}
                  >
                    <span>
                      <span className="hidden xl:inline">{item.label[lang] || item.label.en}</span>
                      <span className="xl:hidden">{item.shortLabel[lang] || item.shortLabel.en}</span>
                    </span>

                    {/* Gold Underline Tab Highlight */}
                    {active && (
                      <motion.div 
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D97706] rounded-t-sm shadow-[0_0_8px_rgba(217,119,6,0.6)]"
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
              className="fixed inset-0 z-[100] bg-[#0F172A]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
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
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#D97706]">{t('searchCiseInstitutional')}</span>
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
                    className="w-full bg-white/5 border-b-2 border-white/20 focus:border-[#D97706] py-5 pl-16 pr-6 text-xl sm:text-2xl font-black text-white outline-none transition-all placeholder:text-neutral-500"
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
              className="lg:hidden bg-[#0F172A] border-b border-white/10 px-4 py-6 space-y-4 shadow-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {navItems.map((item) => {
                  const path = item.id ? `/${lang}/institute/${item.id}` : `/${lang}/institute`;
                  const active = item.id === '' ? isHome : location.pathname.startsWith(path);
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.id}
                      to={path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all",
                        active 
                          ? "bg-[#D97706] text-[#0F172A] font-black shadow-md" 
                          : "text-neutral-300 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <Icon size={16} />
                      <span>{item.label[lang] || item.label.en}</span>
                    </Link>
                  );
                })}
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
      <footer className="bg-[#0F172A] text-white py-14 border-t border-white/10 w-full max-w-7xl mx-auto box-border px-4 sm:px-6">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-1 md:col-span-2 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-[#D97706] rounded-xl flex items-center justify-center text-[#0F172A] font-black text-xl shadow-md">
                  CI
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black tracking-tight uppercase leading-tight">
                    {t('footerInstituteName')}
                  </h2>
                  <p className="text-[10px] font-bold text-[#D97706] uppercase tracking-[0.2em]">
                    {t('footerInstituteSubtitle')}
                  </p>
                </div>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-md font-medium">
                {t('footerTagline')}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[#D97706] mb-5">{t('footerResearchPillarsHeading')}</h3>
              <ul className="space-y-3 text-xs font-bold text-neutral-400">
                <li>
                  <Link to={`/${lang}/institute/research/energy-bri`} className="hover:text-white transition-colors uppercase tracking-wider block">
                    {t('footerPillarEnergyBri')}
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/institute/research/geo-economics`} className="hover:text-white transition-colors uppercase tracking-wider block">
                    {t('footerPillarGeoEconomics')}
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/institute/research/diplomacy`} className="hover:text-white transition-colors uppercase tracking-wider block">
                    {t('footerPillarDiplomacy')}
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/institute/research/digital-silk-road`} className="hover:text-white transition-colors uppercase tracking-wider block">
                    {t('footerPillarDigitalSilkRoad')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[#D97706] mb-5">{t('footerResourcesDataHeading')}</h3>
              <ul className="space-y-3 text-xs font-bold text-neutral-400">
                <li>
                  <Link to={`/${lang}/institute/publications`} className="hover:text-white transition-colors uppercase tracking-wider block">
                    {t('footerResourceWhitePapers')}
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/institute/data-hub/trade`} className="hover:text-white transition-colors uppercase tracking-wider block">
                    {t('footerResourceTradeFlow')}
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/institute/experts`} className="hover:text-white transition-colors uppercase tracking-wider block">
                    {t('footerResourceFellows')}
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/institute/partnerships`} className="hover:text-white transition-colors uppercase tracking-wider block">
                    {t('footerResourceSyndication')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                to={`/${lang}`}
                className="text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-[#D97706] transition-colors flex items-center gap-1.5"
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
              <LanguageSwitcher lang={lang} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

