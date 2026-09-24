import React from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Download, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Locale } from '../../types';
import { SettlementLayout } from '../../components/settlement/SettlementLayout';
import { SettlementTracker } from '../../components/settlement/SettlementTracker';
import { getSettlementTranslation } from '../../locales/settlementTranslations';

export function SettlementConfirmationPage() {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const [searchParams] = useSearchParams();
  const lang = (paramLang === 'ck' ? 'ckb' : paramLang || 'en') as Locale;
  const t = (key: string) => getSettlementTranslation(lang, key);

  const referenceId = searchParams.get('ref') || 'SETTLE-2026-000123';

  return (
    <SettlementLayout lang={lang}>
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Banner */}
        <div className="pay-card p-6 sm:p-10 border-2 border-emerald-500 bg-emerald-50/20 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 size={36} />
          </div>

          <div className="space-y-1">
            <span className="pay-badge-success">Dossier Registered & Queued</span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
              Inquiry Filed Successfully
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
              Your trade settlement inquiry has been authenticated and queued on the bilateral clearing desk.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-gray-200 inline-block font-mono text-base sm:text-lg font-black text-[#C8102E] shadow-xs">
            {referenceId}
          </div>

          <div className="text-[11px] text-gray-500">
            A confirmation copy and official calculation dossier have been compiled. Present this reference to Trade Bank of Iraq or accredited clearing partners.
          </div>
        </div>

        {/* Embedded Tracker */}
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-3">
            <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <Clock size={18} className="text-[#C8102E]" />
              <span>Real-Time Settlement Milestone Status</span>
            </h2>
          </div>
          <SettlementTracker lang={lang} initialRef={referenceId} />
        </div>

      </div>
    </SettlementLayout>
  );
}
