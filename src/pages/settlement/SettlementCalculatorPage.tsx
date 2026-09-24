import React from 'react';
import { useParams } from 'react-router-dom';
import { Locale } from '../../types';
import { SettlementLayout } from '../../components/settlement/SettlementLayout';
import { CurrencyCalculator } from '../../components/settlement/CurrencyCalculator';
import { ComplianceBadges } from '../../components/settlement/ComplianceBadges';
import { getSettlementTranslation } from '../../locales/settlementTranslations';

export function SettlementCalculatorPage() {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const lang = (paramLang === 'ck' ? 'ckb' : paramLang || 'en') as Locale;
  const t = (key: string) => getSettlementTranslation(lang, key);

  return (
    <SettlementLayout lang={lang}>
      <div className="max-w-4xl mx-auto space-y-10">
        
        <div className="space-y-3 border-b border-gray-200 pb-6">
          <div className="pay-badge">
            Real-Time Parity Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            {t('settlement.calc.title')}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl">
            {t('settlement.calc.subtitle')} Compare bilateral direct clearing retention with standard three-currency SWIFT routing.
          </p>
        </div>

        <CurrencyCalculator lang={lang} />

        <div className="pt-4">
          <ComplianceBadges lang={lang} compact />
        </div>

      </div>
    </SettlementLayout>
  );
}
