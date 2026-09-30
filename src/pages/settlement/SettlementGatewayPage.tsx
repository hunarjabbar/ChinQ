import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Landmark, Zap, Code, AlertCircle, ArrowRight, CheckCircle2, QrCode, Copy, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
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

  const defaultPayload = 'ICA-MBRIDGE-GATEWAY-2026-SANDBOX-VERIFY://secure?node=CBI_CIPS_HUB&auth=active';
  const [customPayloadInput, setCustomPayloadInput] = useState('');
  const [qrPayload, setQrPayload] = useState(defaultPayload);
  const [copied, setCopied] = useState(false);

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(qrPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

        {/* Mobile Payment QR Verification Feature */}
        <div className="pay-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-brand-800 font-bold text-xs uppercase tracking-wider mb-1">
                <QrCode size={16} />
                <span>Mobile Verification Node</span>
              </div>
              <h2 className="text-xl font-black text-gray-900">Instant Mobile Payment QR Verification</h2>
              <p className="text-xs text-gray-600">Scan with any CBI or PBOC digital clearing app to verify sandbox terminal handshake.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">
                Live Scanner Ready
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border border-gray-200 shadow-inner">
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                <QRCodeSVG
                  value={qrPayload}
                  size={180}
                  level="H"
                  includeMargin={true}
                  bgColor="#ffffff"
                  fgColor="#0f172a"
                />
              </div>
              <span className="mt-3 text-[11px] font-mono text-gray-500">SESSION ID: ICA-VERIFY-2026-QRS</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Custom Verification Payload / Ref
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customPayloadInput}
                    onChange={(e) => setCustomPayloadInput(e.target.value)}
                    placeholder="Enter reference or wallet ID"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <button
                    onClick={() => setQrPayload(customPayloadInput || defaultPayload)}
                    className="pay-btn-primary px-4 py-2 rounded-xl text-xs font-bold shrink-0 cursor-pointer"
                  >
                    Update QR
                  </button>
                </div>
              </div>

              <div className="p-4 bg-brand-50/50 rounded-xl border border-brand-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-900">Encoded Verification String:</span>
                  <button
                    onClick={handleCopyPayload}
                    className="flex items-center gap-1 text-xs text-brand-700 hover:text-brand-900 font-semibold cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copied ? 'Copied' : 'Copy Payload'}</span>
                  </button>
                </div>
                <div className="p-2 bg-white rounded border border-brand-200 font-mono text-[10px] text-gray-600 break-all">
                  {qrPayload}
                </div>
              </div>

              <div className="text-[11px] text-gray-500 leading-relaxed">
                * Compatible with mBridge Digital Clearing Hub, CIPS Interbank Gateway, and CBI e-CNY QR verification standards.
              </div>
            </div>
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="pay-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[brand-800] flex items-center justify-center font-bold">
              <Lock size={20} />
            </div>
            <h3 className="text-base font-black text-gray-900">15-Min Rate Lock</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Guaranteed sovereign exchange rate binding for 15 minutes while commercial declarations and authorizations are finalized.
            </p>
          </div>

          <div className="pay-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[brand-800] flex items-center justify-center font-bold">
              <Landmark size={20} />
            </div>
            <h3 className="text-base font-black text-gray-900">Direct Partner Bank Dispatch</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Automated compilation of formal payment instructions delivered directly to CBI-licensed clearing banks.
            </p>
          </div>

          <div className="pay-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[brand-800] flex items-center justify-center font-bold">
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
