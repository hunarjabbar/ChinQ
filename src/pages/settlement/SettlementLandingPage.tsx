import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Clock, 
  CreditCard, 
  FileText, 
  Calculator, 
  CheckCircle2, 
  Landmark,
  ArrowRightLeft,
  ChevronRight
} from 'lucide-react';
import { Locale } from '../../types';
import { SettlementLayout } from '../../components/settlement/SettlementLayout';
import { ComplianceBadges } from '../../components/settlement/ComplianceBadges';
import { CurrencyCalculator } from '../../components/settlement/CurrencyCalculator';
import { SettlementTracker } from '../../components/settlement/SettlementTracker';
import { CoBrandedCardVisual } from '../../components/settlement/CoBrandedCardVisual';
import { getSettlementTranslation } from '../../locales/settlementTranslations';

export function SettlementLandingPage() {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const lang = (paramLang === 'ck' ? 'ckb' : paramLang || 'en') as Locale;
  const t = (key: string) => getSettlementTranslation(lang, key);
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';

  return (
    <SettlementLayout lang={lang}>
      <div className="space-y-16">
        
        {/* HERO SECTION */}
        <section className="relative rounded-3xl overflow-hidden pay-hero-gradient text-white p-6 sm:p-12 lg:p-16 shadow-2xl">
          {/* Subtle Guilloche / Grid */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl space-y-6">
            
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>{t('settlement.badge.sovereign')}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              {t('settlement.title')}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-red-100 max-w-2xl font-medium leading-relaxed">
              {t('settlement.tagline')}
            </p>

            <p className="text-xs sm:text-sm text-red-200/90 max-w-3xl leading-relaxed">
              {t('settlement.hero.desc')}
            </p>

            {/* CTA Group */}
            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to={`/${lang}/settlement/inquiry`}
                className="px-5 py-3.5 rounded-xl bg-white text-[#C8102E] font-black text-xs sm:text-sm hover:bg-gray-100 transition-all shadow-lg flex items-center gap-2 group cursor-pointer"
              >
                <span>{t('settlement.hero.ctaInquiry')}</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Link>

              <Link
                to={`/${lang}/settlement/calculator`}
                className="px-5 py-3.5 rounded-xl bg-black/30 hover:bg-black/40 text-white font-bold text-xs sm:text-sm border border-white/30 backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator size={16} />
                <span>{t('settlement.hero.ctaCalculator')}</span>
              </Link>

              <Link
                to={`/${lang}/settlement/tracker`}
                className="px-5 py-3.5 rounded-xl bg-black/30 hover:bg-black/40 text-white font-bold text-xs sm:text-sm border border-white/30 backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Clock size={16} />
                <span>{t('settlement.hero.ctaTrack')}</span>
              </Link>

              <Link
                to={`/${lang}/settlement/card`}
                className="px-5 py-3.5 rounded-xl bg-amber-400 text-gray-900 hover:bg-amber-300 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <CreditCard size={16} />
                <span>{t('settlement.hero.ctaCard')}</span>
              </Link>
            </div>

            {/* 4 Pillars Strip */}
            <div className="pt-8 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-amber-300 shrink-0" />
                <span>{t('settlement.pillar.zeroFx')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-amber-300 shrink-0" />
                <span>{t('settlement.pillar.zeroWire')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-amber-300 shrink-0" />
                <span>{t('settlement.pillar.directChannel')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-amber-300 shrink-0" />
                <span>{t('settlement.pillar.speed')}</span>
              </div>
            </div>

          </div>
        </section>

        {/* COMPLIANCE BADGES SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-gray-900">
                {isAr ? 'الأطر الرقابية والسيادية المعتمدة' : isZh ? '双边主权合规清算架构' : isCkb ? 'چوارچێوەی یاسایی و چاودێری' : 'Sovereign Compliance & Clearing Framework'}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Full alignment with Central Bank of Iraq directives and People's Bank of China CIPS rails.
              </p>
            </div>
            <Link to={`/${lang}/settlement/compliance`} className="text-xs font-bold text-[#C8102E] hover:underline flex items-center gap-1">
              <span>View Full Framework</span>
              <span className="cta-arrow">→</span>
            </Link>
          </div>

          <ComplianceBadges lang={lang} />
        </section>

        {/* EMBEDDED CURRENCY CALCULATOR */}
        <section className="space-y-4">
          <CurrencyCalculator lang={lang} />
        </section>

        {/* CO-BRANDED CARD SHOWCASE BANNER */}
        <section className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="pay-badge">
              {isAr ? 'البطاقة السيادية المشتركة' : isZh ? 'Qi & ICA 联名商务主权卡' : isCkb ? 'کارتی هاوبەشی سەروەری' : 'Qi & ICA Sovereign FinTech'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {t('settlement.card.title')}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {t('settlement.card.tagline')}
            </p>

            <ul className="space-y-2.5 text-xs text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#C8102E] shrink-0 mt-0.5" />
                <span>{t('settlement.card.b1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#C8102E] shrink-0 mt-0.5" />
                <span>{t('settlement.card.b2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#C8102E] shrink-0 mt-0.5" />
                <span>{t('settlement.card.b3')}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#C8102E] shrink-0 mt-0.5" />
                <span>{t('settlement.card.b4')}</span>
              </li>
            </ul>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to={`/${lang}/settlement/card/register`}
                className="pay-btn-primary px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs"
              >
                {t('settlement.card.registerBtn')}
              </Link>
              <Link
                to={`/${lang}/settlement/card/generate`}
                className="pay-btn-secondary px-5 py-2.5 rounded-xl font-bold text-xs"
              >
                {t('settlement.card.generateBtn')}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <CoBrandedCardVisual lang={lang} />
          </div>
        </section>

        {/* EMBEDDED REAL-TIME SETTLEMENT TRACKER */}
        <section className="space-y-4">
          <SettlementTracker lang={lang} />
        </section>

        {/* COMPLIANT GATEWAY HIGHLIGHT */}
        <section className="bg-gradient-to-r from-red-50/70 via-white to-red-50/50 rounded-3xl border border-red-200 p-8 sm:p-12 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="pay-badge mx-auto">
              ISO 20022 Host-to-Host Gateway
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {t('settlement.gateway.title')}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {t('settlement.gateway.subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to={`/${lang}/settlement/gateway/checkout`}
              className="pay-btn-primary px-6 py-3 rounded-xl font-black text-xs sm:text-sm shadow-md"
            >
              {t('settlement.gateway.launchCheckout')}
            </Link>
            <Link
              to={`/${lang}/settlement/how-it-works`}
              className="pay-btn-secondary px-6 py-3 rounded-xl font-bold text-xs sm:text-sm"
            >
              Explore 7-Step Clearing Lifecycle
            </Link>
          </div>
        </section>

      </div>
    </SettlementLayout>
  );
}
