import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CreditCard, 
  ShieldCheck, 
  Globe2, 
  Landmark, 
  Sparkles,
  Zap
} from 'lucide-react';
import { Locale } from '../../types';
import { SettlementLayout } from '../../components/settlement/SettlementLayout';
import { CoBrandedCardVisual } from '../../components/settlement/CoBrandedCardVisual';
import { getSettlementTranslation } from '../../locales/settlementTranslations';

export function SettlementCardLandingPage() {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const lang = (paramLang === 'ck' ? 'ckb' : paramLang || 'en') as Locale;
  const t = (key: string) => getSettlementTranslation(lang, key);

  return (
    <SettlementLayout lang={lang}>
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Hero Showcase */}
        <section className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-colors">
          <div className="lg:col-span-6 space-y-5">
            <div className="pay-badge">
              Bilateral Commercial FinTech
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-950 dark:text-white tracking-tight leading-tight">
              {t('settlement.card.title')}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {t('settlement.card.tagline')} Co-branded by International Smart Card (Qi Card) and the Iraqi-Chinese Agency to enable seamless bilateral merchant payments across Baghdad, Shenzhen, Erbil, and Shanghai.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to={`/${lang}/settlement/card/register`}
                className="pay-btn-primary px-6 py-3 rounded-xl font-black text-xs sm:text-sm shadow-md"
              >
                {t('settlement.card.registerBtn')} →
              </Link>
              <Link
                to={`/${lang}/settlement/card/generate`}
                className="pay-btn-secondary px-5 py-3 rounded-xl font-bold text-xs sm:text-sm"
              >
                {t('settlement.card.generateBtn')}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <CoBrandedCardVisual lang={lang} />
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="space-y-6">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-ink-950 dark:text-white">
              {t('settlement.card.benefitsTitle')}
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Engineered exclusively for trade delegations, corporate executives, and commercial importers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="pay-card p-6 space-y-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-800 dark:text-brand-400 flex items-center justify-center font-bold">
                <Zap size={20} />
              </div>
              <h3 className="text-base font-black text-ink-950 dark:text-white">Dual-Currency IQD & RMB Sub-Wallets</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Seamlessly toggle between Iraqi Dinar and Chinese Yuan wallets. Point-of-sale spending in China debits the RMB balance directly at zero conversion spread.
              </p>
            </div>

            <div className="pay-card p-6 space-y-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-800 dark:text-brand-400 flex items-center justify-center font-bold">
                <Globe2 size={20} />
              </div>
              <h3 className="text-base font-black text-ink-950 dark:text-white">Omni-Channel Acceptance</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Accepted nationwide at 150,000+ Qi Card terminals across Iraq, and globally via UnionPay, Visa, and Mastercard merchant networks in China and worldwide.
              </p>
            </div>

            <div className="pay-card p-6 space-y-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-800 dark:text-brand-400 flex items-center justify-center font-bold">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-base font-black text-ink-950 dark:text-white">Consular & Trade VIP Priority</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Cardholders receive priority expedited consular review for Chinese commercial visas and preferential customs advisory services at Iraqi ports of entry.
              </p>
            </div>

            <div className="pay-card p-6 space-y-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-800 dark:text-brand-400 flex items-center justify-center font-bold">
                <Sparkles size={20} />
              </div>
              <h3 className="text-base font-black text-ink-950 dark:text-white">PBOC 3.0 & EMV Security Architecture</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Secured by certified biometric matching, cryptographic dynamic CVV, and full compliance with People's Bank of China smart IC card standards.
              </p>
            </div>
          </div>
        </section>

        {/* Card Licensing Disclosure */}
        <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 space-y-2 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
          <div className="font-bold text-ink-950 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-2">
            <Landmark size={15} className="text-brand-800 dark:text-brand-400" />
            <span>Card Issuance Authority & Regulatory Notice</span>
          </div>
          <p>
            The Qi & ICA co-branded Visa/Mastercard card is issued and administered exclusively by International Smart Card (ISC / Qi Card), an electronic payment service provider licensed and regulated by the Central Bank of Iraq (CBI). The Iraqi-Chinese Agency operates as commercial program sponsor and bilateral endorsement facilitator. All card accounts are held in trust at accredited Iraqi settlement banks.
          </p>
        </div>

      </div>
    </SettlementLayout>
  );
}
