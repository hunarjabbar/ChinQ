import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Building2, 
  Globe2, 
  CreditCard, 
  Calculator, 
  Compass, 
  FileText, 
  PhoneCall, 
  HelpCircle,
  ExternalLink,
  Lock
} from 'lucide-react';
import { Locale } from '../../types';
import { IcaLogo } from '../IcaLogo';
import { LiveFxStrip } from './LiveFxStrip';
import { getSettlementTranslation } from '../../locales/settlementTranslations';

interface Props {
  lang: Locale;
  children: React.ReactNode;
}

export function SettlementLayout({ lang, children }: Props) {
  const location = useLocation();
  const t = (key: string) => getSettlementTranslation(lang, key);
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';
  const isRtl = isAr || isCkb;

  const navLinks = [
    { to: `/${lang}/settlement`, label: t('settlement.nav.overview'), exact: true },
    { to: `/${lang}/settlement/calculator`, label: t('settlement.nav.calculator') },
    { to: `/${lang}/settlement/tracker`, label: t('settlement.nav.tracker') },
    { to: `/${lang}/settlement/gateway`, label: t('settlement.nav.gateway') },
    { to: `/${lang}/settlement/inquiry`, label: t('settlement.nav.inquiry') },
    { to: `/${lang}/settlement/card`, label: t('settlement.nav.card') },
    { to: `/${lang}/settlement/how-it-works`, label: t('settlement.nav.howItWorks') },
    { to: `/${lang}/settlement/compliance`, label: t('settlement.nav.compliance') },
    { to: `/${lang}/settlement/fees`, label: t('settlement.nav.fees') },
    { to: `/${lang}/settlement/about`, label: t('settlement.nav.about') },
    { to: `/${lang}/settlement/faq`, label: t('settlement.nav.faq') },
    { to: `/${lang}/settlement/contact`, label: t('settlement.nav.contact') },
    { to: `/${lang}/settlement/legal`, label: t('settlement.nav.legal') }
  ];

  const switchLang = (newLang: Locale) => {
    const currentPath = location.pathname;
    // Replace leading /:lang/ with newLang
    const regex = /^\/(en|ar|zh|ckb|ck)\b/;
    if (regex.test(currentPath)) {
      return currentPath.replace(regex, `/${newLang}`);
    }
    return `/${newLang}${currentPath}`;
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="pay-portal flex flex-col min-h-screen">
      
      {/* Top Sovereign Regulatory Notice Bar */}
      <div className="w-full bg-[#111827] text-white text-[11px] py-2 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-start">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#C8102E] shrink-0" />
            <span className="text-gray-300">
              <strong className="text-white font-bold">Central Bank of Iraq (CBI) & PBoC Accredited:</strong> Direct IQD ⇄ RMB Bilateral Settlement & Clearing Facility
            </span>
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <Link to={`/${lang}`} className="hover:text-white transition-colors flex items-center gap-1 font-bold">
              <span>{t('settlement.nav.home')}</span>
              <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Logo & Portal Identity */}
          <Link to={`/${lang}/settlement`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#C8102E] text-white flex items-center justify-center font-black text-sm shadow-md group-hover:bg-[#A00D26] transition-colors shrink-0">
              ICA
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-gray-900 tracking-tight flex items-center gap-2">
                <span>{t('settlement.title')}</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-red-100 text-[#991B1B] font-bold">
                  Sovereign Parity
                </span>
              </div>
              <div className="text-[10px] text-gray-500 font-medium">
                Iraqi-Chinese Agency • FinTech & Settlement Directorate
              </div>
            </div>
          </Link>

          {/* Language Switcher & Quick Action */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher */}
            <div className="flex items-center gap-1 text-xs font-bold border border-gray-200 rounded-lg p-1 bg-gray-50">
              <Link 
                to={switchLang('en')} 
                className={`px-2 py-1 rounded transition-colors ${lang === 'en' ? 'bg-[#C8102E] text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                EN
              </Link>
              <Link 
                to={switchLang('ar')} 
                className={`px-2 py-1 rounded transition-colors ${lang === 'ar' ? 'bg-[#C8102E] text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                عربي
              </Link>
              <Link 
                to={switchLang('zh')} 
                className={`px-2 py-1 rounded transition-colors ${lang === 'zh' ? 'bg-[#C8102E] text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                中文
              </Link>
              <Link 
                to={switchLang('ckb')} 
                className={`px-2 py-1 rounded transition-colors ${lang === 'ckb' ? 'bg-[#C8102E] text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                کوردی
              </Link>
            </div>

            {/* Inquiry CTA */}
            <Link
              to={`/${lang}/settlement/inquiry`}
              className="hidden sm:inline-flex pay-btn-primary px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs whitespace-nowrap"
            >
              <span>{isAr ? 'تقديم طلب' : isZh ? '申请结算' : isCkb ? 'داواکاری' : 'Open Inquiry'}</span>
            </Link>

          </div>

        </div>

        {/* Secondary Navigation Ribbon */}
        <nav className="border-t border-gray-100 bg-gray-50/70 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 sm:gap-2 py-1.5 whitespace-nowrap text-xs font-bold">
            {navLinks.map((item, idx) => {
              const isActive = item.exact 
                ? location.pathname === item.to || location.pathname === `${item.to}/`
                : location.pathname.startsWith(item.to);

              return (
                <Link
                  key={idx}
                  to={item.to}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-white text-[#C8102E] shadow-xs font-black border border-gray-200' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

      </header>

      {/* Live Foreign Exchange Ticker Ribbon */}
      <LiveFxStrip lang={lang} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        {children}
      </main>

      {/* Portal Footer */}
      <footer className="w-full bg-white border-t border-gray-200 mt-16 pt-12 pb-10 text-xs text-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          
          {/* Top Columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Column 1: Identity */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#C8102E] text-white flex items-center justify-center font-black text-xs">
                  ICA
                </div>
                <span className="font-black text-gray-900 text-sm">
                  {t('settlement.title')}
                </span>
              </div>
              <p className="text-gray-500 leading-relaxed text-[11px]">
                {t('settlement.hero.desc')}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                <Lock size={12} className="text-[#C8102E]" />
                <span>TLS 1.3 Host-to-Host Encrypted Rails</span>
              </div>
            </div>

            {/* Column 2: Core Solutions */}
            <div className="space-y-2">
              <h4 className="font-black text-gray-900 uppercase tracking-wider text-[11px] mb-3">
                Core Systems
              </h4>
              <ul className="space-y-1.5 text-gray-500 text-[11px]">
                <li><Link to={`/${lang}/settlement/calculator`} className="hover:text-[#C8102E] transition-colors">{t('settlement.nav.calculator')}</Link></li>
                <li><Link to={`/${lang}/settlement/tracker`} className="hover:text-[#C8102E] transition-colors">{t('settlement.nav.tracker')}</Link></li>
                <li><Link to={`/${lang}/settlement/gateway`} className="hover:text-[#C8102E] transition-colors">{t('settlement.nav.gateway')}</Link></li>
                <li><Link to={`/${lang}/settlement/card`} className="hover:text-[#C8102E] transition-colors">{t('settlement.nav.card')}</Link></li>
                <li><Link to={`/${lang}/settlement/how-it-works`} className="hover:text-[#C8102E] transition-colors">{t('settlement.nav.howItWorks')}</Link></li>
              </ul>
            </div>

            {/* Column 3: Compliance & Legal */}
            <div className="space-y-2">
              <h4 className="font-black text-gray-900 uppercase tracking-wider text-[11px] mb-3">
                Regulatory Framework
              </h4>
              <ul className="space-y-1.5 text-gray-500 text-[11px]">
                <li><Link to={`/${lang}/settlement/compliance`} className="hover:text-[#C8102E] transition-colors">{t('settlement.nav.compliance')}</Link></li>
                <li><Link to={`/${lang}/settlement/fees`} className="hover:text-[#C8102E] transition-colors">{t('settlement.nav.fees')}</Link></li>
                <li><Link to={`/${lang}/settlement/legal`} className="hover:text-[#C8102E] transition-colors">{t('settlement.nav.legal')}</Link></li>
                <li><Link to={`/${lang}/settlement/faq`} className="hover:text-[#C8102E] transition-colors">{t('settlement.nav.faq')}</Link></li>
                <li><Link to={`/${lang}/settlement/contact`} className="hover:text-[#C8102E] transition-colors">{t('settlement.nav.contact')}</Link></li>
              </ul>
            </div>

            {/* Column 4: Institutional Links */}
            <div className="space-y-2">
              <h4 className="font-black text-gray-900 uppercase tracking-wider text-[11px] mb-3">
                Authoritative Authorities
              </h4>
              <ul className="space-y-1.5 text-gray-500 text-[11px]">
                <li><a href="https://cbi.iq" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8102E] transition-colors flex items-center gap-1"><span>Central Bank of Iraq</span><ExternalLink size={10} /></a></li>
                <li><a href="http://www.pbc.gov.cn" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8102E] transition-colors flex items-center gap-1"><span>People's Bank of China</span><ExternalLink size={10} /></a></li>
                <li><a href="https://www.cips.com.cn" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8102E] transition-colors flex items-center gap-1"><span>CIPS Cross-Border System</span><ExternalLink size={10} /></a></li>
                <li><a href="https://qi.iq" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8102E] transition-colors flex items-center gap-1"><span>Qi Card (International Smart Card)</span><ExternalLink size={10} /></a></li>
                <li><Link to={`/${lang}`} className="hover:text-[#C8102E] transition-colors">Iraqi-Chinese Agency Main Portal</Link></li>
              </ul>
            </div>

          </div>

          {/* Compliance & Regulatory Disclaimer (Part 8.5) */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2 text-[11px] text-gray-500 leading-relaxed">
            <div className="font-black uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#C8102E]" />
              <span>{t('settlement.disclaimer.title')}</span>
            </div>
            <p>
              {t('settlement.disclaimer')}
            </p>
          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
            <div>
              © 2026 Iraqi-Chinese Agency (ICA). All rights reserved. Sovereign Bilateral Payment Settlement Desk.
            </div>
            <div className="flex items-center gap-4">
              <Link to={`/${lang}/settlement/legal`} className="hover:text-gray-600">Terms of Use</Link>
              <Link to={`/${lang}/settlement/legal`} className="hover:text-gray-600">AML/CFT Policy</Link>
              <Link to={`/${lang}/settlement/legal`} className="hover:text-gray-600">Privacy Notice</Link>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
