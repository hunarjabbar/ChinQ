import React, { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Globe,
  Radio,
  Menu,
  X,
  FileText,
  Shield,
  Layers,
  Sparkles,
  TrendingUp,
  Video,
  ChevronDown
} from 'lucide-react';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function PortalHeader() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Normalize lang
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;

  const t = (key: string) => getPortalTranslation(currentLang, key);

  const changeLanguage = (newLang: string) => {
    setLangDropdownOpen(false);
    const targetLang = newLang === 'ckb' ? 'ckb' : newLang;
    // Replace existing lang prefix in path or prepend
    const currentPath = location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/([a-z]{2}|ckb)/, '') || '/';
    navigate(`/${targetLang}${pathWithoutLang === '/' ? '' : pathWithoutLang}`);
  };

  const navLinks = [
    { label: t('nav.world'), href: `/${currentLang}/portal/world`, icon: Globe },
    { label: t('nav.trending'), href: `/${currentLang}/portal/trending`, icon: TrendingUp },
    { label: t('nav.initiatives'), href: `/${currentLang}/portal/initiatives`, icon: Layers },
    { label: t('nav.featured'), href: `/${currentLang}/portal/featured`, icon: Sparkles },
    { label: t('nav.live'), href: `/${currentLang}/live`, icon: Radio },
    { label: t('nav.newsroom'), href: `/${currentLang}/newsroom`, icon: FileText },
    { label: t('nav.secretariat'), href: `/${currentLang}/secretariat`, icon: Shield },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-[#E5E7EB] shadow-xs select-none">
      {/* Top Protocol Strip */}
      <div className="bg-[#000000] text-[#FFFFFF] text-[11px] font-mono py-1.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[var(--color-brand-800)] font-bold">
            <span className="w-2 h-2 rounded-full bg-[var(--color-brand-800)] animate-soft-vibrate inline-block"></span>
            <span>ICA DIPLOMATIC NETWORK</span>
          </span>
          <span className="hidden md:inline text-neutral-400">|</span>
          <span className="hidden md:inline text-neutral-300">Baghdad • Beijing • Erbil</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to={`/${currentLang}/live`}
            className="flex items-center gap-1.5 text-white hover:text-[var(--color-brand-800)] transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-800)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-brand-800)]"></span>
            </span>
            <span className="font-bold tracking-wider">{t('nav.live')}</span>
          </Link>

          <Link
            to="/hub"
            className="hidden sm:flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
          >
            <Shield size={12} className="text-[var(--color-brand-800)]" />
            <span>{t('nav.commandHub')}</span>
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to={`/${currentLang}`} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#000000] flex items-center justify-center p-1.5 text-[#FFFFFF] border border-[#E5E7EB] group-hover:border-[var(--color-brand-800)] transition-colors">
            <div className="w-full h-full bg-[var(--color-brand-800)] rounded-lg flex items-center justify-center font-black text-xs tracking-tighter text-white">
              ICA
            </div>
          </div>
          <div>
            <div className="font-serif font-black text-base sm:text-lg text-[#000000] tracking-tight group-hover:text-[var(--color-brand-800)] transition-colors leading-none">
              IRAQI-CHINESE AGENCY
            </div>
            <div className="text-[10px] font-sans font-bold tracking-widest text-[#4B5563] uppercase mt-1">
              SOVEREIGN MEDIA & STRATEGIC GATEWAY
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all relative ${
                  active
                    ? 'text-[var(--color-brand-800)] bg-[#FEE2E2]'
                    : 'text-[#000000] hover:text-[var(--color-brand-800)] hover:bg-[#F9FAFB]'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 inset-inline-0 h-0.5 bg-[var(--color-brand-800)] rounded-full mx-3"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Utility: Language Selector + Live CTA */}
        <div className="flex items-center gap-3">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5E7EB] hover:border-[var(--color-brand-800)] bg-[#F9FAFB] text-xs font-bold text-[#000000] cursor-pointer transition-colors"
            >
              <Globe size={14} className="text-[var(--color-brand-800)]" />
              <span className="uppercase">{currentLang === 'ckb' ? 'CK' : currentLang}</span>
              <ChevronDown size={12} className="text-[#4B5563]" />
            </button>

            {langDropdownOpen && (
              <div className="absolute top-full inset-inline-end-0 mt-2 w-36 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl shadow-xl p-1 z-50 text-xs">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                    currentLang === 'en' ? 'bg-[#FEE2E2] text-[#991B1B] font-bold' : 'hover:bg-[#F9FAFB] text-[#000000]'
                  }`}
                >
                  English (EN)
                </button>
                <button
                  onClick={() => changeLanguage('ar')}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                    currentLang === 'ar' ? 'bg-[#FEE2E2] text-[#991B1B] font-bold' : 'hover:bg-[#F9FAFB] text-[#000000]'
                  }`}
                >
                  العربية (AR)
                </button>
                <button
                  onClick={() => changeLanguage('zh')}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                    currentLang === 'zh' ? 'bg-[#FEE2E2] text-[#991B1B] font-bold' : 'hover:bg-[#F9FAFB] text-[#000000]'
                  }`}
                >
                  中文 (ZH)
                </button>
                <button
                  onClick={() => changeLanguage('ckb')}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                    currentLang === 'ckb' || currentLang === 'ck'
                      ? 'bg-[#FEE2E2] text-[#991B1B] font-bold'
                      : 'hover:bg-[#F9FAFB] text-[#000000]'
                  }`}
                >
                  کوردی (CK)
                </button>
              </div>
            )}
          </div>

          {/* Live Broadcast CTA Button */}
          <Link
            to={`/${currentLang}/live`}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#A00D26] active:bg-[#7F0A1E] text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all hover:-translate-y-0.5"
          >
            <Radio size={14} className="animate-soft-vibrate" />
            <span>{t('livePortal.liveBadge')}</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-[#E5E7EB] text-[#000000] hover:text-[var(--color-brand-800)] cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-b border-[#E5E7EB] px-4 pt-2 pb-6 space-y-2">
          {navLinks.map(link => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[#000000] hover:bg-[#FEE2E2] hover:text-[var(--color-brand-800)] transition-colors"
              >
                <Icon size={16} className="text-[var(--color-brand-800)]" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="pt-4 border-t border-[#E5E7EB] flex flex-col gap-2">
            <Link
              to={`/${currentLang}/live`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-[var(--color-brand-800)] text-white font-black text-xs uppercase tracking-wider"
            >
              {t('publicPortal.watchLiveNow')}
            </Link>
            <Link
              to="/hub"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl border border-[#000000] text-[#000000] font-black text-xs uppercase tracking-wider"
            >
              {t('nav.commandHub')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default PortalHeader;
