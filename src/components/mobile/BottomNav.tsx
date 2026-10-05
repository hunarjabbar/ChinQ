import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Radio,
  Briefcase,
  Calendar,
  Menu,
  X,
  CreditCard,
  ShieldCheck,
  GraduationCap,
  Command,
  Globe2,
  ChevronRight,
  ChevronLeft,
  Languages,
  Newspaper,
  Film
} from 'lucide-react';
import { Locale } from '../../types';

export interface BottomNavProps {
  lang?: Locale;
}

type TabId = 'home' | 'broadcast' | 'services' | 'summit' | 'more';
type SheetCategory = 'services' | 'broadcast' | 'more';

export function BottomNav({ lang }: BottomNavProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Detect active locale from prop or URL pathname
  const pathParts = location.pathname.split('/').filter(Boolean);
  const detectedLocale = (pathParts[0] === 'ar' || pathParts[0] === 'zh' || pathParts[0] === 'ckb' || pathParts[0] === 'en')
    ? (pathParts[0] as Locale)
    : 'en';
  const activeLocale = lang || detectedLocale;

  const isAr = activeLocale === 'ar';
  const isZh = activeLocale === 'zh';
  const isCkb = activeLocale === 'ckb';
  const isRtl = isAr || isCkb;

  // Active tab state
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [activeSheet, setActiveSheet] = useState<SheetCategory | null>(null);

  // Sync active tab with current route
  useEffect(() => {
    const pathname = location.pathname;
    if (
      pathname.includes('/live') ||
      pathname.includes('/newsroom') ||
      pathname.includes('/media')
    ) {
      setActiveTab('broadcast');
    } else if (
      pathname.includes('/settlement') ||
      pathname.includes('/visa') ||
      pathname.includes('/chinese-center') ||
      pathname.includes('/chineseCentre') ||
      pathname.includes('/data-hub') ||
      pathname.includes('/institute')
    ) {
      setActiveTab('services');
    } else if (pathname.includes('/summit')) {
      setActiveTab('summit');
    } else if (
      pathname.includes('/consultancy') ||
      pathname.includes('/hub') ||
      pathname.includes('/portal') ||
      pathname.includes('/admin') ||
      pathname.includes('/settings') ||
      pathname.includes('/profile')
    ) {
      setActiveTab('more');
    } else {
      setActiveTab('home');
    }
  }, [location.pathname]);

  // Lock body scroll when bottom sheet is open
  useEffect(() => {
    if (activeSheet) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeSheet]);

  // Close sheet on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveSheet(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle tab click
  const handleTabClick = (tabId: TabId) => {
    if (tabId === 'home') {
      setActiveTab('home');
      setActiveSheet(null);
      navigate(`/${activeLocale}`);
    } else if (tabId === 'summit') {
      setActiveTab('summit');
      setActiveSheet(null);
      navigate(`/${activeLocale}/summit`);
    } else if (tabId === 'broadcast') {
      setActiveTab('broadcast');
      setActiveSheet(activeSheet === 'broadcast' ? null : 'broadcast');
    } else if (tabId === 'services') {
      setActiveTab('services');
      setActiveSheet(activeSheet === 'services' ? null : 'services');
    } else if (tabId === 'more') {
      setActiveTab('more');
      setActiveSheet(activeSheet === 'more' ? null : 'more');
    }
  };

  const handleLinkClick = () => {
    setActiveSheet(null);
  };

  const handleLanguageChange = (newLocale: Locale) => {
    setActiveSheet(null);
    try {
      document.cookie = `ica_lang=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem('ica_lang', newLocale);
      document.documentElement.lang = newLocale;
      document.documentElement.dir = newLocale === 'ar' || newLocale === 'ckb' ? 'rtl' : 'ltr';
    } catch {}

    const currentPath = location.pathname;
    const localeRegex = /^\/(en|ar|zh|ckb)(\/.*)?$/;
    const match = currentPath.match(localeRegex);
    if (match) {
      const rest = match[2] || '';
      navigate(`/${newLocale}${rest}${location.search}${location.hash}`);
    } else {
      navigate(`/${newLocale}${currentPath}${location.search}${location.hash}`);
    }
  };

  // Tab definitions
  const tabs = [
    {
      id: 'home' as TabId,
      label: isAr ? 'الرئيسية' : isZh ? '首页' : isCkb ? 'سەرەکی' : 'Home',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'broadcast' as TabId,
      label: isAr ? 'البث' : isZh ? '直播' : isCkb ? 'پەخش' : 'Broadcast',
      icon: Radio,
      badge: 'LIVE',
    },
    {
      id: 'services' as TabId,
      label: isAr ? 'الخدمات' : isZh ? '服务' : isCkb ? 'خزمەت' : 'Services',
      icon: Briefcase,
      badge: null,
    },
    {
      id: 'summit' as TabId,
      label: isAr ? 'القمة' : isZh ? '峰会' : isCkb ? 'لووتکە' : 'Summit',
      icon: Calendar,
      badge: '2026',
    },
    {
      id: 'more' as TabId,
      label: isAr ? 'المزيد' : isZh ? '更多' : isCkb ? 'زیاتر' : 'More',
      icon: Menu,
      badge: null,
    },
  ];

  return (
    <>
      {/* ======================================================== */}
      {/* TASK 4: SLIDE-UP BOTTOM SHEET (SUB-MENUS) - RED SHELL BODY */}
      {/* ======================================================== */}
      <AnimatePresence mode="wait">
        {activeSheet && (
          <div
            className="fixed inset-0 z-[60] xl:hidden overflow-hidden flex flex-col justify-end"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveSheet(null)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm cursor-pointer"
              aria-hidden="true"
            />

            {/* Slide-Up Drawer Container */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 200,
              }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 400) {
                  setActiveSheet(null);
                }
              }}
              className="relative w-full max-h-[85vh] flex flex-col bg-white text-slate-900 rounded-t-[32px] shadow-[0_-12px_40px_rgba(0,0,0,0.2)] pb-[calc(1rem+env(safe-area-inset-bottom))] z-10 overflow-hidden"
              role="dialog"
              aria-modal="true"
            >
              {/* Sheet Header - SOLID RED SHELL */}
              <div className="w-full bg-red-600 text-white px-5 py-5 flex flex-col items-center shrink-0">
                {/* Drag Handle Indicator */}
                <div className="w-12 h-1 rounded-full bg-white/30 mb-5" />
                
                <div className="w-full flex items-center justify-between px-2">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <div className="w-1.5 h-3 bg-white rounded-full" />
                    {activeSheet === 'broadcast' && (isAr ? 'مركز البث السيادي' : 'Sovereign Broadcast Center')}
                    {activeSheet === 'services' && (isAr ? 'الخدمات الثنائية الاستراتيجية' : 'Strategic Bilateral Services')}
                    {activeSheet === 'more' && (isAr ? 'بوابة العمليات المتكاملة' : 'Integrated Operations Portal')}
                  </h3>

                  {/* Close Button */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveSheet(null)}
                    className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>

              {/* Scrollable Sub-Menu Content - WHITE BODY */}
              <div className="flex-1 overflow-y-auto px-5 py-8 space-y-6">
                {/* 1. SERVICES SUB-MENU */}
                {activeSheet === 'services' && (
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { to: '/settlement', icon: CreditCard, label: isAr ? 'تسوية المدفوعات' : 'Payment Settlement', tag: 'IQD/RMB' },
                      { to: '/settlement/card', icon: CreditCard, label: isAr ? 'بطاقة Qi و ICA' : 'Qi & ICA Card', tag: 'Dual-FX' },
                      { to: '/institute/visa-centre', icon: ShieldCheck, label: isAr ? 'مركز التأشيرات' : 'Visa Centre' },
                      { to: '/institute/chinese-center', icon: GraduationCap, label: isAr ? 'اللغة والاختبارات' : 'Language & Testing' },
                    ].map((link, idx) => (
                      <Link
                        key={idx}
                        to={`/${activeLocale}${link.to}`}
                        onClick={handleLinkClick}
                        className="flex items-center justify-between p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-200 transition-all shadow-sm active:scale-[0.98] group"
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                            <link.icon size={22} />
                          </div>
                          <div>
                            <div className="text-sm font-black text-slate-800">{link.label}</div>
                            {link.tag && <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{link.tag}</div>}
                          </div>
                        </div>
                        {isRtl ? <ChevronLeft size={18} className="text-gray-300" /> : <ChevronRight size={18} className="text-gray-300" />}
                      </Link>
                    ))}
                  </div>
                )}

                {/* 2. BROADCAST SUB-MENU */}
                {activeSheet === 'broadcast' && (
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { to: '/newsroom', icon: Newspaper, label: isAr ? 'غرفة أخبار ICA' : 'ICA Newsroom' },
                      { to: '/live', icon: Radio, label: isAr ? 'البوابة الحية' : 'Live Portal', tag: '24/7' },
                      { to: '/media', icon: Film, label: isAr ? 'المركز الإعلامي' : 'Media Hub' },
                    ].map((link, idx) => (
                      <Link
                        key={idx}
                        to={`/${activeLocale}${link.to}`}
                        onClick={handleLinkClick}
                        className="flex items-center justify-between p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-200 transition-all shadow-sm active:scale-[0.98] group"
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                            <link.icon size={22} />
                          </div>
                          <div>
                            <div className="text-sm font-black text-slate-800">{link.label}</div>
                            {link.tag && <div className="text-[10px] text-red-600 font-black uppercase tracking-wider mt-0.5">{link.tag}</div>}
                          </div>
                        </div>
                        {isRtl ? <ChevronLeft size={18} className="text-gray-300" /> : <ChevronRight size={18} className="text-gray-300" />}
                      </Link>
                    ))}
                  </div>
                )}

                {/* 3. MORE SUB-MENU */}
                {activeSheet === 'more' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { to: '/consultancy', icon: Briefcase, label: isAr ? 'الاستشارات الاستراتيجية والقانونية' : 'Strategic & Legal Consultancy' },
                        { to: '/settings', icon: Command, label: isAr ? 'الإعدادات' : 'Settings' },
                        { to: '/profile', icon: GraduationCap, label: isAr ? 'الملف الشخصي' : 'Profile' },
                      ].map((link, idx) => (
                        <Link
                          key={idx}
                          to={`/${activeLocale}${link.to}`}
                          onClick={handleLinkClick}
                          className="flex items-center justify-between p-5 rounded-2xl bg-gray-50 border border-gray-100 transition-all active:scale-[0.98] group"
                        >
                          <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                              <link.icon size={22} />
                            </div>
                            <span className="text-sm font-black text-slate-800">{link.label}</span>
                          </div>
                          {isRtl ? <ChevronLeft size={18} className="text-gray-300" /> : <ChevronRight size={18} className="text-gray-300" />}
                        </Link>
                      ))}
                    </div>

                    {/* Language Switcher */}
                    <div className="p-6 rounded-[32px] bg-red-50 border border-red-100 space-y-5">
                      <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-red-600">
                        <Languages size={16} />
                        <span>{isAr ? 'اختر لغة البوابة' : 'Select Portal Language'}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { l: 'en', n: 'English' },
                          { l: 'ar', n: 'العربية' },
                          { l: 'zh', n: '简体中文' },
                          { l: 'ckb', n: 'کوردی' }
                        ].map(({ l, n }) => (
                          <button
                            key={l}
                            onClick={() => handleLanguageChange(l as Locale)}
                            className={`py-4 px-4 rounded-2xl text-xs font-black transition-all flex flex-col items-center gap-1 shadow-sm ${
                              activeLocale === l
                                ? 'bg-red-600 text-white shadow-red-200'
                                : 'bg-white text-red-600 hover:bg-white/80'
                            }`}
                          >
                            <span className="opacity-60 text-[9px] uppercase tracking-tighter">{l.toUpperCase()}</span>
                            <span>{n}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* TASK 1 & 2 & 3: FIXED BOTTOM NAVIGATION BAR - RED SHELL */}
      {/* ======================================================== */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 inset-x-0 z-50 xl:hidden bg-red-600 border-t border-red-500/30 shadow-[0_-12px_40px_rgba(220,38,38,0.4)] pb-[env(safe-area-inset-bottom)] select-none overflow-visible"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="h-16 sm:h-20 max-w-lg mx-auto flex items-center justify-around relative overflow-visible">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <div key={tab.id} className="relative flex-1 flex flex-col items-center overflow-visible">
                {/* TASK 3.1 & 1.2: OUTBOUND FLOATING ACTIVE BUTTON (The FAB Effect) */}
                {isActive && (
                  <motion.div
                    layoutId="outboundActiveFAB"
                    onClick={() => handleTabClick(tab.id)}
                    className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.35)] flex items-center justify-center z-50 cursor-pointer transition-all duration-300"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 28,
                    }}
                  >
                    <Icon size={26} className="text-red-600" strokeWidth={3} />
                    
                    {/* Live Beacon inside FAB if active */}
                    {tab.badge === 'LIVE' && (
                      <span className="absolute top-2.5 right-2.5 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600" />
                      </span>
                    )}
                  </motion.div>
                )}

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleTabClick(tab.id)}
                  className="relative flex flex-col items-center justify-center w-full min-h-[48px] cursor-pointer focus:outline-none group z-10 pt-1"
                  aria-label={tab.label}
                  aria-selected={isActive}
                  role="tab"
                >
                  {/* Inactive Icon Container (hidden when floating) */}
                  <div className="h-6 flex items-center justify-center mb-1 transition-opacity duration-200">
                    {!isActive ? (
                      <Icon
                        size={22}
                        className="text-white/70 group-hover:text-white transition-colors duration-300"
                        strokeWidth={2.5}
                      />
                    ) : (
                      // Spacer for the FAB space
                      <div className="h-6" />
                    )}
                  </div>

                  {/* Text Label - Sits under the floating button for active state */}
                  <span
                    className={`text-[10px] sm:text-xs tracking-tight transition-all duration-300 relative z-10 ${
                      isActive
                        ? 'text-white font-black mt-8 sm:mt-9 scale-105'
                        : 'text-white/70 font-bold group-hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </span>

                  {/* Live Beacon for inactive state */}
                  {!isActive && tab.badge === 'LIVE' && (
                    <span className="absolute top-1.5 right-1/2 translate-x-4 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                  )}
                </motion.button>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default BottomNav;
