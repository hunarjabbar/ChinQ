import React from 'react';
import { useParams } from 'react-router-dom';
import { Locale } from '../../types';
import { SettlementLayout } from '../../components/settlement/SettlementLayout';
import { SettlementTracker } from '../../components/settlement/SettlementTracker';
import { ComplianceBadges } from '../../components/settlement/ComplianceBadges';
import { getSettlementTranslation } from '../../locales/settlementTranslations';

export function SettlementTrackerPublicPage() {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const lang = (paramLang === 'ck' ? 'ckb' : paramLang || 'en') as Locale;
  const t = (key: string) => getSettlementTranslation(lang, key);

  return (
    <SettlementLayout lang={lang}>
      <div className="max-w-4xl mx-auto space-y-10">
        
        <div className="space-y-3 border-b border-gray-200 pb-6">
          <div className="pay-badge">
            Cryptographic Milestone Tracking
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            {t('settlement.tracker.title')}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl">
            {t('settlement.tracker.subtitle')} Enter your official settlement reference number to view verified status, compliance approvals, and executing bank dispatches.
          </p>
        </div>

        <SettlementTracker lang={lang} />

        <div className="pt-4">
          <ComplianceBadges lang={lang} compact />
        </div>

      </div>
    </SettlementLayout>
  );
}
