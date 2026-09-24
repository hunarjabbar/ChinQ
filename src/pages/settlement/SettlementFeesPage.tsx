import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, TrendingUp, Calculator, ShieldCheck } from 'lucide-react';
import { Locale } from '../../types';
import { SettlementLayout } from '../../components/settlement/SettlementLayout';
import { getSettlementTranslation } from '../../locales/settlementTranslations';

export function SettlementFeesPage() {
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
          <div className="pay-badge">
            Transparent Tariff
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            {isAr ? 'جدول الرسوم والتعرفة المصرفية' : isZh ? '双边直接结算费率公示' : isCkb ? 'خشتەی تێچووە داراییەکان' : 'Settlement Fee Schedules'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Transparent, all-inclusive clearing tariffs. Experience absolute predictability with zero hidden foreign exchange spreads, zero intermediary bank cable deductions, and zero holding penalties.
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* IQD -> RMB Schedule */}
          <div className="pay-card p-6 sm:p-8 space-y-6 border-t-4 border-t-[#C8102E]">
            <div>
              <span className="pay-badge">Import Flow</span>
              <h2 className="text-xl font-black text-gray-900 mt-2">
                IQD ➔ RMB Direct Clearing
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                For Iraqi enterprises purchasing goods, machinery, and services from China.
              </p>
            </div>

            <div className="space-y-3 text-xs border-y border-gray-100 py-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Third-Currency FX Spread:</span>
                <span className="font-mono font-bold text-emerald-700">0.00% (Zero)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">USD Intermediary Wire Toll:</span>
                <span className="font-mono font-bold text-emerald-700">$0.00 (Avoided)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Direct Partner Bank Tariff:</span>
                <span className="font-mono font-bold text-gray-900">0.35% (All-Inclusive)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Settlement Execution Window:</span>
                <span className="font-mono font-bold text-[#C8102E]">24 – 48 Hours</span>
              </div>
            </div>

            <Link
              to={`/${lang}/settlement/calculator`}
              className="pay-btn-primary w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
            >
              <Calculator size={14} />
              <span>Calculate IQD ➔ RMB Savings</span>
            </Link>
          </div>

          {/* RMB -> IQD Schedule */}
          <div className="pay-card p-6 sm:p-8 space-y-6 border-t-4 border-t-[#7F0A1E]">
            <div>
              <span className="pay-badge">Export & Investment</span>
              <h2 className="text-xl font-black text-gray-900 mt-2">
                RMB ➔ IQD Direct Clearing
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                For Chinese corporations funding infrastructure projects or buying Iraqi exports.
              </p>
            </div>

            <div className="space-y-3 text-xs border-y border-gray-100 py-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Third-Currency FX Spread:</span>
                <span className="font-mono font-bold text-emerald-700">0.00% (Zero)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Offshore SWIFT Wire Toll:</span>
                <span className="font-mono font-bold text-emerald-700">$0.00 (Avoided)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Direct Partner Bank Tariff:</span>
                <span className="font-mono font-bold text-gray-900">0.30% (All-Inclusive)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Settlement Execution Window:</span>
                <span className="font-mono font-bold text-[#C8102E]">24 – 48 Hours</span>
              </div>
            </div>

            <Link
              to={`/${lang}/settlement/calculator`}
              className="pay-btn-secondary w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
            >
              <Calculator size={14} />
              <span>Calculate RMB ➔ IQD Savings</span>
            </Link>
          </div>

        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="p-5 bg-gray-50 border-b border-gray-200">
            <h3 className="text-base font-black text-gray-900">
              Comparative Fee Breakdown (On a $100,000 USD Equiv. Settlement)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-gray-100 text-gray-700 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 text-start">Fee Component</th>
                  <th className="p-3.5 text-start">Traditional USD Route</th>
                  <th className="p-3.5 text-start text-[#C8102E]">Direct Bilateral Rail (ICA)</th>
                  <th className="p-3.5 text-start text-emerald-700">Your Net Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                <tr>
                  <td className="p-3.5 font-bold text-gray-900">Double FX Conversion Spread</td>
                  <td className="p-3.5 text-gray-600">3.5% – 5.5% (~$4,500)</td>
                  <td className="p-3.5 font-bold text-[#C8102E]">0.00% ($0)</td>
                  <td className="p-3.5 font-bold text-emerald-700">+$4,500 Saved</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-gray-900">Intermediary Correspondent Bank Wire Tolls</td>
                  <td className="p-3.5 text-gray-600">$75 – $150 per leg</td>
                  <td className="p-3.5 font-bold text-[#C8102E]">$0 (Direct Channel)</td>
                  <td className="p-3.5 font-bold text-emerald-700">+$150 Saved</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-gray-900">Beneficiary Lifting / Inward Clearance Tolls</td>
                  <td className="p-3.5 text-gray-600">0.5% – 1.0% (~$750)</td>
                  <td className="p-3.5 font-bold text-[#C8102E]">0.35% (~$350 flat)</td>
                  <td className="p-3.5 font-bold text-emerald-700">+$400 Saved</td>
                </tr>
                <tr className="bg-red-50/60 font-black">
                  <td className="p-3.5 text-gray-900">TOTAL ESTIMATED TRANSACTION COST</td>
                  <td className="p-3.5 text-red-700">~$5,400 (5.4%)</td>
                  <td className="p-3.5 text-[#C8102E]">~$350 (0.35%)</td>
                  <td className="p-3.5 text-emerald-700 text-sm">+$5,050 Net Advantage</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </SettlementLayout>
  );
}
