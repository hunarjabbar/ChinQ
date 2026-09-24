import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Landmark, Zap, Code, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Locale } from '../../types';
import { SettlementLayout } from '../../components/settlement/SettlementLayout';
import { ComplianceBadges } from '../../components/settlement/ComplianceBadges';
import { getSettlementTranslation } from '../../locales/settlementTranslations';

export function SettlementGatewayPage() {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const lang = (paramLang === 'ck' ? 'ckb' : paramLang || 'en') as Locale;
  const t = (key: string) => getSettlementTranslation(lang, key);
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';

  return (
    <SettlementLayout lang={lang}>
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4 border-b border-gray-200 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="pay-badge">
              Host-to-Host Rail
            </span>
            <span className="pay-badge-success flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Enterprise Sandbox Active</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            {t('settlement.gateway.title')}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
            {t('settlement.gateway.subtitle')}
          </p>

          <div className="pt-2">
            <Link
              to={`/${lang}/settlement/gateway/checkout`}
              className="pay-btn-primary px-6 py-3 rounded-xl font-black text-xs sm:text-sm shadow-md inline-flex items-center gap-2"
            >
              <span>{t('settlement.gateway.launchCheckout')}</span>
              <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="pay-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C8102E] flex items-center justify-center font-bold">
              <Lock size={20} />
            </div>
            <h3 className="text-base font-black text-gray-900">15-Min Rate Lock</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Guaranteed sovereign exchange rate binding for 15 minutes while commercial declarations and authorizations are finalized.
            </p>
          </div>

          <div className="pay-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C8102E] flex items-center justify-center font-bold">
              <Landmark size={20} />
            </div>
            <h3 className="text-base font-black text-gray-900">Direct Partner Bank Dispatch</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Automated compilation of formal payment instructions delivered directly to CBI-licensed clearing banks.
            </p>
          </div>

          <div className="pay-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C8102E] flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-base font-black text-gray-900">Embedded Sanctions Audit</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Integrated real-time screening against designated foreign assets control lists and Iraqi financial intelligence databases.
            </p>
          </div>
        </div>

        {/* TODO Production Licensing Architecture Block */}
        <div className="p-6 rounded-2xl bg-gray-900 text-gray-200 border border-gray-800 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between text-amber-400">
            <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[11px]">
              <Code size={16} />
              <span>Production Banking Integration Architecture & Licensing</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-bold">
              SANDBOX SIMULATION
            </span>
          </div>

          <div className="space-y-2 text-gray-300 text-[11px] leading-relaxed">
            <p>
              <strong>Status:</strong> Gateway sandbox is fully functional for operational testing, instruction generation, cryptographic ticket validation, and KYC record archival.
            </p>
            <p>
              <strong>Production Prerequisites:</strong> Prior to live fiat clearing:
            </p>
            <ul className="space-y-1 ps-4 list-disc text-gray-400">
              <li>Deploy CBI Regulation No. 3 of 2014 Electronic Payment Service Provider (PSP) institutional gateway.</li>
              <li>Provision dedicated host-to-host mTLS 1.3 tunnel to Trade Bank of Iraq (TBI) and CIPS clearing node.</li>
              <li>Map ISO 20022 MX messages (pacs.008 customer credit transfer / pacs.009 financial institution transfer).</li>
            </ul>
          </div>
        </div>

        <ComplianceBadges lang={lang} />

      </div>
    </SettlementLayout>
  );
}
