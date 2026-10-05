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
import { BottomNav } from '../mobile/BottomNav';

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

  const isCise = location.pathname.includes('/institute/settlement');
  const basePath = isCise ? `/${lang}/institute/settlement` : `/${lang}/settlement`;

  const navLinks = [
    { to: `${basePath}`, label: t('settlement.nav.overview'), exact: true },
    { to: `${basePath}/calculator`, label: t('settlement.nav.calculator') },
    { to: `${basePath}/tracker`, label: t('settlement.nav.tracker') },
    { to: `${basePath}/gateway`, label: t('settlement.nav.gateway') },
    { to: `${basePath}/inquiry`, label: t('settlement.nav.inquiry') },
    { to: `${basePath}/card`, label: t('settlement.nav.card') },
    { to: `${basePath}/how-it-works`, label: t('settlement.nav.howItWorks') },
    { to: `${basePath}/compliance`, label: t('settlement.nav.compliance') },
    { to: `${basePath}/fees`, label: t('settlement.nav.fees') },
    { to: `${basePath}/about`, label: t('settlement.nav.about') },
    { to: `${basePath}/faq`, label: t('settlement.nav.faq') },
    { to: `${basePath}/contact`, label: t('settlement.nav.contact') },
    { to: `${basePath}/legal`, label: t('settlement.nav.legal') }
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
      <div className="w-full bg-neutral-950 text-white text-[11px] py-2 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-start">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-brand-400 shrink-0" />
            <span className="text-neutral-300">
              <strong className="text-white font-bold">Central Bank of Iraq (CBI) & PBoC Accredited:</strong> Direct IQD ⇄ RMB Bilateral Settlement & Clearing Facility
            </span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <Link to={`/${lang}/institute`} className="hover:text-white transition-colors flex items-center gap-1 font-bold">
              <span>{lang === 'ar' ? 'المعهد الصيني (CISE)' : lang === 'zh' ? '中伊战略研究所' : lang === 'ckb' ? 'پەیمانگای چینی' : 'CISE Institute'}</span>
              <span className="cta-arrow">→</span>
            </Link>
            <Link to={`/${lang}`} className="hover:text-white transition-colors flex items-center gap-1 font-bold">
              <span>{t('settlement.nav.home')}</span>
              <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="w-full bg-red-600 text-white sticky top-0 z-40 shadow-lg transition-colors border-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Logo & Portal Identity */}
          <Link to={basePath} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white text-red-600 flex items-center justify-center font-black text-sm shadow-md group-hover:scale-105 transition-transform shrink-0">
              ICA
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-white tracking-tight flex items-center gap-2">
                <span>{t('settlement.title')}</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-white/20 text-white font-bold border border-white/30">
                  Sovereign Parity
                </span>
              </div>
              <div className="text-[10px] text-red-100 font-medium">
                Iraqi-Chinese Agency • FinTech & Settlement Directorate
              </div>
            </div>
          </Link>

          {/* Language Switcher & Quick Action */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher */}
            <div className="flex items-center gap-1 text-xs font-bold border border-white/20 rounded-lg p-1 bg-white/10">
              {(['en', 'ar', 'zh', 'ckb'] as Locale[]).map((l) => (
                <Link 
                  key={l}
                  to={switchLang(l)} 
                  className={`px-2 py-1 rounded transition-colors uppercase ${lang === l ? 'bg-white text-red-600 shadow-sm' : 'text-red-100 hover:text-white hover:bg-white/10'}`}
                >
                  {l === 'ar' ? 'عربي' : l === 'zh' ? '中文' : l === 'ckb' ? 'کوردی' : 'EN'}
                </Link>
              ))}
            </div>

            {/* Inquiry CTA */}
            <Link
              to={`/${lang}/settlement/inquiry`}
              className="hidden sm:inline-flex px-3.5 py-2 rounded-xl text-xs font-bold shadow-md bg-white text-red-600 hover:bg-red-50 transition-colors whitespace-nowrap"
            >
              <span>{isAr ? 'تقديم طلب' : isZh ? '申请结算' : isCkb ? 'داواکاری' : 'Open Inquiry'}</span>
            </Link>

          </div>

        </div>

        {/* Secondary Navigation Ribbon */}
        <nav className="border-t border-white/10 bg-red-700/30 overflow-x-auto scrollbar-none">
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
                      ? 'bg-white text-red-600 shadow-md font-black border border-white' 
                      : 'text-red-100 hover:text-white hover:bg-white/10'
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
      <footer className="w-full bg-white border-t border-neutral-200 mt-16 pt-12 pb-10 text-xs text-neutral-600 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          
          {/* Top Columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Column 1: Identity */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-black text-xs">
                  ICA
                </div>
                <span className="font-black text-neutral-900 text-sm">
                  {t('settlement.title')}
                </span>
              </div>
              <p className="text-neutral-500 leading-relaxed text-[11px]">
                {t('settlement.hero.desc')}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono">
                <Lock size={12} className="text-red-600" />
                <span>TLS 1.3 Host-to-Host Encrypted Rails</span>
              </div>
            </div>

            {/* Column 2: Core Solutions */}
            <div className="space-y-2">
              <h4 className="font-black text-neutral-900 uppercase tracking-wider text-[11px] mb-3">
                Core Systems
              </h4>
              <ul className="space-y-1.5 text-neutral-500 text-[11px]">
                <li><Link to={`/${lang}/settlement/calculator`} className="hover:text-red-600 transition-colors">{t('settlement.nav.calculator')}</Link></li>
                <li><Link to={`/${lang}/settlement/tracker`} className="hover:text-red-600 transition-colors">{t('settlement.nav.tracker')}</Link></li>
                <li><Link to={`/${lang}/settlement/gateway`} className="hover:text-red-600 transition-colors">{t('settlement.nav.gateway')}</Link></li>
                <li><Link to={`/${lang}/settlement/card`} className="hover:text-red-600 transition-colors">{t('settlement.nav.card')}</Link></li>
                <li><Link to={`/${lang}/settlement/how-it-works`} className="hover:text-red-600 transition-colors">{t('settlement.nav.howItWorks')}</Link></li>
              </ul>
            </div>

            {/* Column 3: Compliance & Legal */}
            <div className="space-y-2">
              <h4 className="font-black text-neutral-900 uppercase tracking-wider text-[11px] mb-3">
                Regulatory Framework
              </h4>
              <ul className="space-y-1.5 text-neutral-500 text-[11px]">
                <li><Link to={`/${lang}/settlement/compliance`} className="hover:text-red-600 transition-colors">{t('settlement.nav.compliance')}</Link></li>
                <li><Link to={`/${lang}/settlement/fees`} className="hover:text-red-600 transition-colors">{t('settlement.nav.fees')}</Link></li>
                <li><Link to={`/${lang}/settlement/legal`} className="hover:text-red-600 transition-colors">{t('settlement.nav.legal')}</Link></li>
                <li><Link to={`/${lang}/settlement/faq`} className="hover:text-red-600 transition-colors">{t('settlement.nav.faq')}</Link></li>
                <li><Link to={`/${lang}/settlement/contact`} className="hover:text-red-600 transition-colors">{t('settlement.nav.contact')}</Link></li>
              </ul>
            </div>

            {/* Column 4: Institutional Links */}
            <div className="space-y-2">
              <h4 className="font-black text-neutral-900 uppercase tracking-wider text-[11px] mb-3">
                Authoritative Authorities
              </h4>
              <ul className="space-y-1.5 text-neutral-500 text-[11px]">
                <li><a href="https://cbi.iq" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors flex items-center gap-1"><span>Central Bank of Iraq</span><ExternalLink size={10} /></a></li>
                <li><a href="http://www.pbc.gov.cn" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors flex items-center gap-1"><span>People's Bank of China</span><ExternalLink size={10} /></a></li>
                <li><a href="https://www.cips.com.cn" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors flex items-center gap-1"><span>CIPS Cross-Border System</span><ExternalLink size={10} /></a></li>
                <li><a href="https://qi.iq" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors flex items-center gap-1"><span>Qi Card (International Smart Card)</span><ExternalLink size={10} /></a></li>
                <li><Link to={`/${lang}`} className="hover:text-red-600 transition-colors">Iraqi-Chinese Agency Main Portal</Link></li>
              </ul>
            </div>

          </div>

          {/* Compliance & Regulatory Disclaimer (Part 8.5) */}
          <div className="p-4 rounded-xl bg-red-50 border border-red-100 space-y-2 text-[11px] text-brand-900 leading-relaxed">
            <div className="font-black uppercase tracking-wider text-brand-900 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-red-600" />
              <span>{t('settlement.disclaimer.title')}</span>
            </div>
            <p>
              {t('settlement.disclaimer')}
            </p>
          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-neutral-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
            <div>
              © 2026 Iraqi-Chinese Agency (ICA). All rights reserved. Sovereign Bilateral Payment Settlement Desk.
            </div>
            <div className="flex items-center gap-4">
              <Link to={`/${lang}/settlement/legal`} className="hover:text-neutral-600">Terms of Use</Link>
              <Link to={`/${lang}/settlement/legal`} className="hover:text-neutral-600">AML/CFT Policy</Link>
              <Link to={`/${lang}/settlement/legal`} className="hover:text-neutral-600">Privacy Notice</Link>
            </div>
          </div>

        </div>
      </footer>

      {/* Modern Fixed Bottom Navigation Bar for Mobile and Tablet */}
      <BottomNav lang={lang} />
    </div>
  );
}
