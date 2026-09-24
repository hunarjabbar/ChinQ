import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Locale } from '../../types';
import { SettlementLayout } from '../../components/settlement/SettlementLayout';
import { SettlementTracker } from '../../components/settlement/SettlementTracker';
import { getSettlementTranslation } from '../../locales/settlementTranslations';

export function SettlementTrackerDetailPage() {
  const { lang: paramLang, referenceId } = useParams<{ lang?: string; referenceId?: string }>();
  const lang = (paramLang === 'ck' ? 'ckb' : paramLang || 'en') as Locale;
  const t = (key: string) => getSettlementTranslation(lang, key);

  const activeRef = referenceId || 'SETTLE-2026-000123';

  return (
    <SettlementLayout lang={lang}>
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="flex items-center gap-2">
          <Link
            to={`/${lang}/settlement/tracker`}
            className="text-xs font-bold text-gray-500 hover:text-[#C8102E] flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={14} className="rtl:rotate-180" />
            <span>Back to Public Tracker</span>
          </Link>
        </div>

        <div className="space-y-2 border-b border-gray-200 pb-5">
          <div className="pay-badge">
            Reference Dossier
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight font-mono">
            {activeRef}
          </h1>
          <p className="text-xs text-gray-500">
            Real-time interbank settlement status authenticated under Central Bank of Iraq bilateral protocols.
          </p>
        </div>

        <SettlementTracker lang={lang} initialRef={activeRef} />

      </div>
    </SettlementLayout>
  );
}
