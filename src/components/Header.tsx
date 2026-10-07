import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Locale, translations } from '../locales';
import { NotificationBell } from './NotificationBell';
import { IcaLogo } from './IcaLogo';
import { HeaderGlobalSearchBar } from './search/HeaderGlobalSearchBar';
import { UnifiedSearchOverlay } from './UnifiedSearchOverlay';
import { UnifiedCommandPalette } from './UnifiedCommandPalette';
import { UnifiedMobileDrawer } from './UnifiedMobileDrawer';
import { useNavigationStore } from '../store/useNavigationStore';
import { 
  ShieldCheck, 
  TrendingUp, 
  Building2, 
  CreditCard, 
  CalendarDays, 
  Radio,
  Newspaper,
  Film,
  Sparkles,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Globe2,
  FileText,
  Briefcase,
  Search,
  Command,
  Menu,
  Smartphone
} from 'lucide-react';

interface HeaderProps {
  lang?: Locale;
  currentLocale?: Locale;
  setLocale?: (locale: Locale) => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, currentLocale, setLocale }) => {
  const activeLocale = lang || currentLocale || 'en';
  const location = useLocation();
  const navigate = useNavigate();
  const t = translations[activeLocale];
  const isCise = location.pathname.startsWith('/institute');
  const isAr = activeLocale === 'ar';
  const isZh = activeLocale === 'zh';
  const isCkb = activeLocale === 'ckb';
  const isRtl = isAr || isCkb;

  // Navigation Overlay States
  const [searchOpen, setSearchOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Read dynamically from Navigation Model
  const { getHeaderItems, syncWithServer } = useNavigationStore();
  const dynamicNavItems = getHeaderItems();

  useEffect(() => {
    syncWithServer();
  }, [syncWithServer]);

  // Global keybindings: Cmd/Ctrl + K opens command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLanguageChange = (newLoc: Locale) => {
    if (typeof setLocale === 'function') {
      try {
        setLocale(newLoc);
      } catch (e) {
        console.warn('setLocale callback error:', e);
      }
    }

    try {
      document.cookie = `ica_lang=${newLoc}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem('ica_lang', newLoc);
      document.documentElement.lang = newLoc;
      document.documentElement.dir = newLoc === 'ar' || newLoc === 'ckb' ? 'rtl' : 'ltr';
    } catch {}

    const currentPath = location.pathname;
    const localeRegex = /^\/(en|ar|zh|ckb)(\/.*)?$/;
    const match = currentPath.match(localeRegex);
    if (match) {
      const rest = match[2] || '';
      navigate(`/${newLoc}${rest}${location.search}${location.hash}`);
    } else {
      navigate(`/${newLoc}${currentPath}${location.search}${location.hash}`);
    }
  };

  const getIconForSlug = (slug: string) => {
    switch (slug) {
      case 'newsroom': return Newspaper;
      case 'live': return Radio;
      case 'media': return Film;
      case 'settlement': return CreditCard;
      case 'institute': return Building2;
      case 'summit': return CalendarDays;
      case 'hub': return Sparkles;
      default: return Globe2;
    }
  };

  const isLinkActive = (targetTo: string) => {
    const fullPath = targetTo.startsWith('/') ? targetTo : `/${activeLocale}/${targetTo}`;
    if (fullPath === `/${activeLocale}`) {
      return location.pathname === '/' || location.pathname === `/${activeLocale}` || location.pathname === `/${activeLocale}/`;
    }
    return location.pathname === fullPath || location.pathname.startsWith(`${fullPath}/`);
  };

  return (
    <>
      {/* Skip to Content for Screen Readers & Keyboard Traversal */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-white text-red-700 px-4 py-2 rounded-xl shadow-2xl font-black text-xs uppercase"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full bg-red-600 transition-colors shadow-lg" dir={isRtl ? 'rtl' : 'ltr'} role="banner">
        
        {/* TIER 1: Sovereign Top Diplomatic Band */}
        <div className="w-full bg-red-700/30 text-red-100 border-b border-red-500/30 text-[11px] py-1.5 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            
            {/* Diplomatic Corridor Label */}
            <div className="flex items-center gap-2 text-red-200">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0"></span>
              <span className="font-black tracking-wider uppercase text-[10px] sm:text-[11px]">
                {isAr
                  ? 'الممر الاستراتيجي الثنائي • بغداد – بكين • البوابة الرسمية السيادية'
                  : isZh
                  ? '中伊双边战略走廊 • 巴格达 – 北京 • 官方主权权威门户'
                  : isCkb
                  ? 'ڕێڕەوی ستراتیژی دووقۆڵی • بەغداد – پەکین • دەروازەی فەرمی'
                  : 'Bilateral Strategic Corridor • Baghdad – Beijing • Official Sovereign Portal'}
              </span>
            </div>

            {/* Quick 1-Click Direct Portal Access Badges on Desktop */}
            <div className="hidden lg:flex items-center gap-2 font-mono text-[10px]">
              <Link
                to={`/${activeLocale}/live`}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-red-600 font-black transition-colors shadow-sm"
                title="Direct Access to Live Portal"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
                <span>LIVE PORTAL</span>
              </Link>

              <Link
                to={`/${activeLocale}/newsroom`}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/50 hover:bg-red-500 text-white font-black transition-colors"
                title="Direct Access to Newsroom"
              >
                <Newspaper size={11} className="text-white" />
                <span>NEWSROOM</span>
              </Link>

              {/* Command Palette Trigger Badge */}
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-800/60 hover:bg-red-800 text-red-100 font-mono text-[9px] transition-colors border border-red-500/30 cursor-pointer"
                title="Open Command Palette (Cmd/Ctrl + K)"
              >
                <Command size={10} />
                <span>⌘K HUB</span>
              </button>
            </div>

            {/* Language Switcher Controls */}
            <div className="flex items-center gap-1 shrink-0 font-bold text-[10px]">
              {(['en', 'ar', 'zh', 'ckb'] as Locale[]).map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLanguageChange(loc)}
                  className={`px-2 py-0.5 rounded transition-all uppercase cursor-pointer font-black ${
                    activeLocale === loc
                      ? 'bg-white text-red-600 shadow-sm'
                      : 'text-red-100 hover:text-white hover:bg-white/10'
                  }`}
                  title={loc === 'ar' ? 'العربية' : loc === 'zh' ? '中文' : loc === 'ckb' ? 'کوردی' : 'English'}
                >
                  {loc === 'ar' ? 'عربي' : loc === 'zh' ? '中文' : loc === 'ckb' ? 'کوردی' : 'EN'}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* TIER 2: Main Brand Masthead Bar */}
        <div className="w-full bg-red-600 text-white transition-colors relative z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-between gap-4">
            
            {/* Brand Identity with Official Logo & Wordmark */}
            <Link to={`/${activeLocale}`} className="flex items-center gap-3.5 group shrink-0 select-none py-1">
              <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
                <IcaLogo size={46} variant="mark" theme="white" className="shrink-0 shadow-lg rounded-2xl" />
              </div>

              <div className="flex flex-col text-start leading-none">
                <span className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-red-100 transition-colors">
                  {isAr
                    ? 'الوكالة العراقية الصينية'
                    : isZh
                    ? '伊中通讯社'
                    : isCkb
                    ? 'ئاژانسی عێراقی-چینی'
                    : 'IRAQI-CHINESE AGENCY'}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] sm:text-[11px] font-black tracking-[0.22em] uppercase text-red-100/80">
                    {isAr
                      ? 'المقر السيادي العام للإعلام والتبادل الثنائي'
                      : isZh
                      ? '双边国家级综合传媒与战略智库'
                      : isCkb
                      ? 'دەروازەی فەرمی ڕاگەیاندن و ئاڵوگۆڕ'
                      : 'SOVEREIGN MEDIA & BILATERAL EMBASSY WIRE'}
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links (Reading dynamically from Navigation Model) */}
            <nav className="hidden xl:flex items-center gap-1 sm:gap-1.5 font-bold" aria-label="Primary Navigation">
              {dynamicNavItems.map((link) => {
                const targetTo = link.href.startsWith('/') ? `/${activeLocale}${link.href}` : link.href;
                const isActive = isLinkActive(link.href);
                const IconComponent = getIconForSlug(link.slug);
                const localizedLabel = link.label[activeLocale] || link.label.en || link.slug;

                return (
                  <Link
                    key={link.id}
                    to={targetTo}
                    className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 relative ${
                      isActive
                        ? 'bg-white text-red-600 shadow-md border border-white'
                        : 'text-red-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <IconComponent size={14} className={isActive ? 'text-red-600' : 'text-red-100'} />
                    <span>{localizedLabel}</span>
                    {link.isLive && (
                      <span className={`w-2 h-2 rounded-full animate-pulse ${isActive ? 'bg-red-600' : 'bg-white'}`}></span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Header Actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Quick Search Overlay Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl bg-red-700/60 hover:bg-red-700 text-white transition-colors cursor-pointer"
                title="Open Global Search"
                aria-label="Open search"
              >
                <Search size={16} />
              </button>

              {/* Notification Center */}
              <NotificationBell currentLocale={activeLocale} variant="header" />

              {/* Direct Portal Inquiry CTA */}
              <Link
                to={`/${activeLocale}/newsroom`}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white text-red-600 font-black text-xs transition-colors shadow-lg cursor-pointer hover:bg-red-50"
              >
                <span>{isAr ? 'غرفة الأخبار' : isZh ? '即时新闻' : isCkb ? 'هەواڵەکان' : 'News Desk'}</span>
                <ChevronRight size={14} className="cta-arrow rtl:rotate-180" />
              </Link>

              {/* Mobile Drawer Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(true)}
                className="xl:hidden p-2 rounded-xl bg-white text-red-600 hover:bg-red-100 transition-colors shadow-md cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu size={20} />
              </button>
            </div>

          </div>
        </div>

        {/* TIER 3: Clean Glass Lean Global Search Bar */}
        <div className="w-full bg-red-700/35 border-t border-red-500/25 px-4 sm:px-6 py-2 transition-all backdrop-blur-md relative z-20">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
            <div className="w-full sm:flex-1 sm:max-w-2xl">
              <HeaderGlobalSearchBar lang={activeLocale} />
            </div>

            {/* Quick Trending Tags on Tablet/Desktop */}
            <div className="hidden md:flex items-center gap-2 text-xs text-red-100 shrink-0 select-none">
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-200/80 font-black">
                {isAr ? 'شائع:' : isZh ? '热点:' : isCkb ? 'باو:' : 'HOT:'}
              </span>
              <Link
                to={`/${activeLocale}/settlement`}
                className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
              >
                {isAr ? 'تسوية الدينار/اليوان' : isZh ? '第纳尔/人民币清算' : isCkb ? 'یەکلاکردنەوەی دارایی' : 'IQD/e-CNY Rail'}
              </Link>
              <Link
                to={`/${activeLocale}/summit`}
                className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
              >
                {isAr ? 'قمة 2026' : isZh ? '2026峰会' : isCkb ? 'لووتکە ٢٠٢٦' : 'Summit 2026'}
              </Link>
              <Link
                to={`/${activeLocale}/newsroom?tag=DevelopmentRoad`}
                className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
              >
                {isAr ? 'طريق التنمية' : isZh ? '发展之路' : isCkb ? 'ڕێگای گەشەپێدان' : 'Development Road'}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Global Unified Overlays */}
      <UnifiedSearchOverlay 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
        lang={activeLocale} 
      />

      <UnifiedCommandPalette 
        isOpen={paletteOpen} 
        onClose={() => setPaletteOpen(false)} 
        lang={activeLocale} 
      />

      <UnifiedMobileDrawer 
        isOpen={mobileDrawerOpen} 
        onClose={() => setMobileDrawerOpen(false)} 
        lang={activeLocale} 
      />
    </>
  );
};

export default Header;

