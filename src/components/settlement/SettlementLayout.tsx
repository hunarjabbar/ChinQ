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
      <header className="w-full bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-40 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Logo & Portal Identity */}
          <Link to={basePath} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-800 text-white flex items-center justify-center font-black text-sm shadow-md group-hover:bg-brand-700 transition-colors shrink-0">
              ICA
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-ink-950 dark:text-white tracking-tight flex items-center gap-2">
                <span>{t('settlement.title')}</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-brand-50 dark:bg-brand-950/50 text-brand-800 dark:text-brand-300 font-bold border border-brand-200 dark:border-brand-800/40">
                  Sovereign Parity
                </span>
              </div>
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">
                Iraqi-Chinese Agency • FinTech & Settlement Directorate
              </div>
            </div>
          </Link>

          {/* Language Switcher & Quick Action */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher */}
            <div className="flex items-center gap-1 text-xs font-bold border border-neutral-200 dark:border-neutral-700 rounded-lg p-1 bg-neutral-50 dark:bg-neutral-800">
              {(['en', 'ar', 'zh', 'ckb'] as Locale[]).map((l) => (
                <Link 
                  key={l}
                  to={switchLang(l)} 
                  className={`px-2 py-1 rounded transition-colors uppercase ${lang === l ? 'bg-brand-800 text-white shadow-xs' : 'text-neutral-600 dark:text-neutral-300 hover:text-ink-950 dark:hover:text-white'}`}
                >
                  {l === 'ar' ? 'عربي' : l === 'zh' ? '中文' : l === 'ckb' ? 'کوردی' : 'EN'}
                </Link>
              ))}
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
        <nav className="border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/80 overflow-x-auto scrollbar-none">
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
                      ? 'bg-white dark:bg-neutral-800 text-brand-800 dark:text-brand-400 shadow-xs font-black border border-neutral-200 dark:border-neutral-700' 
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-ink-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
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
      <footer className="w-full bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 mt-16 pt-12 pb-10 text-xs text-neutral-600 dark:text-neutral-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          
          {/* Top Columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Column 1: Identity */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand-800 text-white flex items-center justify-center font-black text-xs">
                  ICA
                </div>
                <span className="font-black text-ink-950 dark:text-white text-sm">
                  {t('settlement.title')}
                </span>
              </div>
              <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-[11px]">
                {t('settlement.hero.desc')}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
                <Lock size={12} className="text-brand-800 dark:text-brand-400" />
                <span>TLS 1.3 Host-to-Host Encrypted Rails</span>
              </div>
            </div>

            {/* Column 2: Core Solutions */}
            <div className="space-y-2">
              <h4 className="font-black text-ink-950 dark:text-white uppercase tracking-wider text-[11px] mb-3">
                Core Systems
              </h4>
              <ul className="space-y-1.5 text-neutral-500 dark:text-neutral-400 text-[11px]">
                <li><Link to={`/${lang}/settlement/calculator`} className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors">{t('settlement.nav.calculator')}</Link></li>
                <li><Link to={`/${lang}/settlement/tracker`} className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors">{t('settlement.nav.tracker')}</Link></li>
                <li><Link to={`/${lang}/settlement/gateway`} className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors">{t('settlement.nav.gateway')}</Link></li>
                <li><Link to={`/${lang}/settlement/card`} className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors">{t('settlement.nav.card')}</Link></li>
                <li><Link to={`/${lang}/settlement/how-it-works`} className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors">{t('settlement.nav.howItWorks')}</Link></li>
              </ul>
            </div>

            {/* Column 3: Compliance & Legal */}
            <div className="space-y-2">
              <h4 className="font-black text-ink-950 dark:text-white uppercase tracking-wider text-[11px] mb-3">
                Regulatory Framework
              </h4>
              <ul className="space-y-1.5 text-neutral-500 dark:text-neutral-400 text-[11px]">
                <li><Link to={`/${lang}/settlement/compliance`} className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors">{t('settlement.nav.compliance')}</Link></li>
                <li><Link to={`/${lang}/settlement/fees`} className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors">{t('settlement.nav.fees')}</Link></li>
                <li><Link to={`/${lang}/settlement/legal`} className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors">{t('settlement.nav.legal')}</Link></li>
                <li><Link to={`/${lang}/settlement/faq`} className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors">{t('settlement.nav.faq')}</Link></li>
                <li><Link to={`/${lang}/settlement/contact`} className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors">{t('settlement.nav.contact')}</Link></li>
              </ul>
            </div>

            {/* Column 4: Institutional Links */}
            <div className="space-y-2">
              <h4 className="font-black text-ink-950 dark:text-white uppercase tracking-wider text-[11px] mb-3">
                Authoritative Authorities
              </h4>
              <ul className="space-y-1.5 text-neutral-500 dark:text-neutral-400 text-[11px]">
                <li><a href="https://cbi.iq" target="_blank" rel="noopener noreferrer" className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors flex items-center gap-1"><span>Central Bank of Iraq</span><ExternalLink size={10} /></a></li>
                <li><a href="http://www.pbc.gov.cn" target="_blank" rel="noopener noreferrer" className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors flex items-center gap-1"><span>People's Bank of China</span><ExternalLink size={10} /></a></li>
                <li><a href="https://www.cips.com.cn" target="_blank" rel="noopener noreferrer" className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors flex items-center gap-1"><span>CIPS Cross-Border System</span><ExternalLink size={10} /></a></li>
                <li><a href="https://qi.iq" target="_blank" rel="noopener noreferrer" className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors flex items-center gap-1"><span>Qi Card (International Smart Card)</span><ExternalLink size={10} /></a></li>
                <li><Link to={`/${lang}`} className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors">Iraqi-Chinese Agency Main Portal</Link></li>
              </ul>
            </div>

          </div>

          {/* Compliance & Regulatory Disclaimer (Part 8.5) */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 space-y-2 text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <div className="font-black uppercase tracking-wider text-ink-950 dark:text-white flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-brand-800 dark:text-brand-400" />
              <span>{t('settlement.disclaimer.title')}</span>
            </div>
            <p>
              {t('settlement.disclaimer')}
            </p>
          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
            <div>
              © 2026 Iraqi-Chinese Agency (ICA). All rights reserved. Sovereign Bilateral Payment Settlement Desk.
            </div>
            <div className="flex items-center gap-4">
              <Link to={`/${lang}/settlement/legal`} className="hover:text-neutral-600 dark:hover:text-neutral-200">Terms of Use</Link>
              <Link to={`/${lang}/settlement/legal`} className="hover:text-neutral-600 dark:hover:text-neutral-200">AML/CFT Policy</Link>
              <Link to={`/${lang}/settlement/legal`} className="hover:text-neutral-600 dark:hover:text-neutral-200">Privacy Notice</Link>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
