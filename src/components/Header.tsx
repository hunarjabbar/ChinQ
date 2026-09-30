import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Locale, translations } from '../locales';
import { NotificationBell } from './NotificationBell';
import { IcaLogo } from './IcaLogo';
import { 
  Menu, 
  X, 
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
  Briefcase
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[activeLocale];
  const isCise = location.pathname.startsWith('/institute');
  const isAr = activeLocale === 'ar';
  const isZh = activeLocale === 'zh';
  const isCkb = activeLocale === 'ckb';
  const isRtl = isAr || isCkb;

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

  // Primary desktop navigation links
  const primaryNavLinks = [
    { to: `/${activeLocale}/newsroom`, label: isAr ? 'غرفة الأخبار' : isZh ? '新闻中心' : isCkb ? 'ژووری هەواڵ' : 'Newsroom', icon: Newspaper },
    { to: `/${activeLocale}/live`, label: isAr ? 'البث المباشر' : isZh ? '在线直播' : isCkb ? 'پەخشی زیندوو' : 'Live Portal', icon: Radio, isLive: true },
    { to: `/${activeLocale}/media`, label: isAr ? 'المركز الإعلامي' : isZh ? '融媒体' : isCkb ? 'میدیا' : 'Media Hub', icon: Film },
    { to: `/${activeLocale}/settlement`, label: t.nav.settlement, icon: CreditCard },
    { to: `/${activeLocale}/institute`, label: t.nav.institute, icon: Building2 },
    { to: `/${activeLocale}/summit`, label: t.nav.summit, icon: CalendarDays },
    { to: `/${activeLocale}/hub`, label: t.nav.hub, icon: Sparkles },
  ];

  const isLinkActive = (targetTo: string) => {
    if (targetTo === `/${activeLocale}`) {
      return location.pathname === '/' || location.pathname === `/${activeLocale}` || location.pathname === `/${activeLocale}/`;
    }
    return location.pathname === targetTo || location.pathname.startsWith(`${targetTo}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg transition-colors" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* TIER 1: Sovereign Top Diplomatic Band */}
      <div className="w-full bg-brand-950 text-white border-b border-brand-900/80 text-[11px] py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Diplomatic Corridor Label */}
          <div className="flex items-center gap-2 text-brand-200">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0"></span>
            <span className="font-bold tracking-wider uppercase text-[10px] sm:text-[11px]">
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
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/80 hover:bg-red-600 text-white font-bold transition-colors border border-red-400/30"
              title="Direct Access to Live Portal"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              <span>LIVE PORTAL</span>
            </Link>

            <Link
              to={`/${activeLocale}/newsroom`}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-brand-100 font-bold transition-colors"
              title="Direct Access to Newsroom"
            >
              <Newspaper size={11} className="text-amber-300" />
              <span>NEWSROOM</span>
            </Link>

            <Link
              to={`/${activeLocale}/media`}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-brand-100 font-bold transition-colors"
              title="Direct Access to Media Hub"
            >
              <Film size={11} className="text-amber-300" />
              <span>MEDIA</span>
            </Link>
          </div>

          {/* Language Switcher Controls */}
          <div className="flex items-center gap-1 shrink-0 font-bold text-[10px]">
            {(['en', 'ar', 'zh', 'ckb'] as Locale[]).map((loc) => (
              <button
                key={loc}
                onClick={() => handleLanguageChange(loc)}
                className={`px-2 py-0.5 rounded transition-all uppercase cursor-pointer ${
                  activeLocale === loc
                    ? 'bg-brand-800 text-amber-300 font-black shadow-xs border border-brand-700'
                    : 'text-brand-300/80 hover:text-white hover:bg-white/10'
                }`}
                title={loc === 'ar' ? 'العربية' : loc === 'zh' ? '中文' : loc === 'ckb' ? 'کوردی' : 'English'}
              >
                {loc === 'ar' ? 'عربي' : loc === 'zh' ? '中文' : loc === 'ckb' ? 'کوردی' : 'EN'}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* TIER 2: Main Brand Masthead Bar (Rich Sovereign Red) */}
      <div className="w-full bg-brand-800 text-white border-b border-brand-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-between gap-4">
          
          {/* Brand Identity with Official Logo & Wordmark */}
          <Link to={`/${activeLocale}`} className="flex items-center gap-3.5 group shrink-0 select-none py-1">
            {/* Real Official ICA Logo Emblem */}
            <div className="shrink-0 transition-transform duration-300 group-hover:scale-105 drop-shadow-md">
              <IcaLogo size={46} variant="mark" className="shrink-0" />
            </div>

            {/* Typography Masthead */}
            <div className="flex flex-col text-start leading-none">
              <span className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-amber-200 transition-colors drop-shadow-xs">
                {isAr
                  ? 'الوكالة العراقية الصينية'
                  : isZh
                  ? '伊中通讯社'
                  : isCkb
                  ? 'ئاژانسی عێراقی-چینی'
                  : 'IRAQI-CHINESE AGENCY'}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase text-brand-100">
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

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 sm:gap-1.5 font-bold">
            {primaryNavLinks.map((link) => {
              const isActive = isLinkActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 relative ${
                    isActive
                      ? 'bg-white/20 text-white shadow-inner border border-white/30 backdrop-blur-xs'
                      : 'text-brand-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <link.icon size={14} className={isActive ? 'text-amber-300' : 'text-brand-200'} />
                  <span>{link.label}</span>
                  {link.isLive && (
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Notification Center */}
            <NotificationBell currentLocale={activeLocale} variant="header" />

            {/* Direct Portal Inquiry CTA */}
            <Link
              to={`/${activeLocale}/newsroom`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-100 text-brand-800 font-black text-xs transition-colors shadow-md cursor-pointer"
            >
              <span>{isAr ? 'غرفة الأخبار' : isZh ? '即时新闻' : isCkb ? 'هەواڵەکان' : 'News Desk'}</span>
              <ChevronRight size={14} className="cta-arrow" />
            </Link>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* ENRICHED MOBILE / TABLET DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-brand-950 text-white border-t border-brand-800 px-4 py-6 space-y-6 shadow-2xl max-h-[85vh] overflow-y-auto backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200">
          
          {/* Drawer Top: Direct 1-Click Portals */}
          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5 border-b border-brand-900 pb-1.5">
              <Sparkles size={13} />
              <span>{isAr ? 'البوابات الرئيسية الفورية (نقرة واحدة)' : isZh ? '核心直达门户' : isCkb ? 'دەروازە سەرەکییەکان' : 'Core Direct Portals'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <Link
                to={`/${activeLocale}/live`}
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-gradient-to-r from-red-600 to-brand-800 text-white flex items-center justify-between border border-red-400/40 shadow-md"
              >
                <div className="flex items-center gap-2.5">
                  <Radio size={18} className="text-amber-300 animate-pulse" />
                  <div>
                    <div className="text-xs font-black">{isAr ? 'البوابة الحية' : isZh ? '在线直播门户' : 'Live Portal'}</div>
                    <div className="text-[10px] text-brand-200">24/7 Broadcast</div>
                  </div>
                </div>
                <span className="text-[9px] bg-white text-brand-900 font-black px-1.5 py-0.5 rounded uppercase">LIVE</span>
              </Link>

              <Link
                to={`/${activeLocale}/newsroom`}
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white flex items-center justify-between border border-white/20 shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Newspaper size={18} className="text-amber-300" />
                  <div>
                    <div className="text-xs font-black">{isAr ? 'غرفة الأخبار' : isZh ? '国际新闻中心' : 'ICA Newsroom'}</div>
                    <div className="text-[10px] text-brand-200">Official Wire</div>
                  </div>
                </div>
                <ChevronRight size={14} className="text-brand-300" />
              </Link>

              <Link
                to={`/${activeLocale}/media`}
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white flex items-center justify-between border border-white/20 shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Film size={18} className="text-amber-300" />
                  <div>
                    <div className="text-xs font-black">{isAr ? 'المركز الإعلامي' : isZh ? '融媒体制作中心' : 'Media Hub'}</div>
                    <div className="text-[10px] text-brand-200">Video & Audio</div>
                  </div>
                </div>
                <ChevronRight size={14} className="text-brand-300" />
              </Link>
            </div>
          </div>

          {/* Drawer Section 2: Strategic Bilateral Infrastructure */}
          <div className="space-y-2">
            <div className="text-[11px] font-black uppercase tracking-wider text-brand-300 border-b border-brand-900 pb-1.5">
              {isAr ? 'البنية التحتية والاتفاقيات الثنائية' : isZh ? '双边经贸与主权结算体系' : 'Strategic Bilateral Infrastructure'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              <Link
                to={`/${activeLocale}/settlement`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-neutral-200 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <CreditCard size={15} className="text-amber-400" />
                  <span>{isAr ? 'تسوية المدفوعات السيادية (IQD/RMB)' : isZh ? '本币直接清算中心' : 'Sovereign Payment Settlement'}</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">0.0% Fee</span>
              </Link>

              <Link
                to={`/${activeLocale}/settlement/card`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-neutral-200 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <CreditCard size={15} className="text-amber-400" />
                  <span>{isAr ? 'بطاقة كي وICA المشتركة' : isZh ? 'Qi & ICA 联名商务卡' : 'Qi & ICA Sovereign Card'}</span>
                </span>
                <span className="text-[10px] text-brand-300 font-mono">Dual-FX</span>
              </Link>

              <Link
                to={`/${activeLocale}/summit`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-neutral-200 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <CalendarDays size={15} className="text-amber-400" />
                  <span>{isAr ? 'قمة العراق والصين للاستثمار 2026' : isZh ? '2026中伊投资峰会' : 'Iraq-China Summit 2026'}</span>
                </span>
                <span className="text-[10px] text-amber-300 font-mono">Sulaymaniyah</span>
              </Link>

              <Link
                to={`/${activeLocale}/consultancy`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-neutral-200 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <Briefcase size={15} className="text-amber-400" />
                  <span>{isAr ? 'الاستشارات الاستراتيجية والقانونية' : isZh ? '战略财务与法律咨询' : 'Strategic & Legal Consultancy'}</span>
                </span>
                <ChevronRight size={13} className="text-neutral-500" />
              </Link>
            </div>
          </div>

          {/* Drawer Section 3: CISE Strategic Institute & Consular Services */}
          <div className="space-y-2">
            <div className="text-[11px] font-black uppercase tracking-wider text-brand-300 border-b border-brand-900 pb-1.5">
              {isAr ? 'معهد الدراسات والخدمات القنصلية (CISE)' : isZh ? '中伊战略研究所与领事服务' : 'CISE Institute & Bilateral Services'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              <Link
                to={`/${activeLocale}/institute`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-neutral-200 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <Building2 size={15} className="text-brand-300" />
                  <span>{isAr ? 'بوابة المعهد الصيني العراقي' : isZh ? '研究所总门户' : 'CISE Institute Portal'}</span>
                </span>
                <ChevronRight size={13} className="text-neutral-500" />
              </Link>

              <Link
                to={`/${activeLocale}/institute/visa-centre`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-neutral-200 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-brand-300" />
                  <span>{isAr ? 'مركز التأشيرات الثنائية' : isZh ? '双向签证服务中心' : 'Bilateral Visa Centre'}</span>
                </span>
                <ChevronRight size={13} className="text-neutral-500" />
              </Link>

              <Link
                to={`/${activeLocale}/institute/chinese-center`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-neutral-200 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <GraduationCap size={15} className="text-brand-300" />
                  <span>{isAr ? 'المركز الصيني وتعليم اللغة' : isZh ? '中华文化与语言研修中心' : 'Chinese Language & Testing'}</span>
                </span>
                <ChevronRight size={13} className="text-neutral-500" />
              </Link>

              <Link
                to={`/${activeLocale}/institute/data-hub`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-neutral-200 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <TrendingUp size={15} className="text-brand-300" />
                  <span>{isAr ? 'مركز البيانات الاقتصادية وتتبع الحزام والطريق' : isZh ? '一带一路与经贸数据中枢' : 'Data Hub & BRI Tracker'}</span>
                </span>
                <ChevronRight size={13} className="text-neutral-500" />
              </Link>
            </div>
          </div>

          {/* Drawer Section 4: Public & Command Hub */}
          <div className="space-y-2">
            <div className="text-[11px] font-black uppercase tracking-wider text-brand-300 border-b border-brand-900 pb-1.5">
              {isAr ? 'الإدارة والمنصات العامة' : isZh ? '指挥中心与公众平台' : 'Operations & Public Access'}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                to={`/${activeLocale}/hub`}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 font-bold text-center border border-white/10"
              >
                {isAr ? 'مركز القيادة الموحد' : isZh ? '指挥总枢' : 'Command Hub'}
              </Link>
              <Link
                to={`/${activeLocale}/portal`}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 font-bold text-center border border-white/10"
              >
                {isAr ? 'البوابة العامة' : isZh ? '公众门户' : 'Public Portal'}
              </Link>
            </div>
          </div>

        </div>
      )}

    </header>
  );
};
