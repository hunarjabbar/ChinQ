import React, { useState } from 'react';
import { Locale, translations } from '../locales';
import { 
  CreditCard, 
  ShieldCheck, 
  Download, 
  Search, 
  Coins, 
  Activity,
  CheckCircle2
} from 'lucide-react';

interface SettlementPageProps {
  currentLocale: Locale;
}

export const SettlementPage: React.FC<SettlementPageProps> = ({ currentLocale }) => {
  const t = translations[currentLocale];
  const [amount, setAmount] = useState<number>(10000000);
  const [fromCurrency, setFromCurrency] = useState<'IQD' | 'CNY' | 'USD'>('IQD');
  const [toCurrency, setToCurrency] = useState<'IQD' | 'CNY' | 'USD'>('CNY');
  const [orderQuery, setOrderQuery] = useState('');
  const [orderResult, setOrderResult] = useState<any | null>(null);
  const [downloadNotice, setDownloadNotice] = useState(false);

  // PBOC & CBI Baseline reference fixes (approximate realistic institutional rate)
  // 1 CNY ≈ 182.4 IQD; 1 USD ≈ 1310 IQD; 1 USD ≈ 7.18 CNY
  const getExchangeRate = (from: string, to: string): number => {
    if (from === to) return 1;
    if (from === 'IQD' && to === 'CNY') return 1 / 182.4;
    if (from === 'CNY' && to === 'IQD') return 182.4;
    if (from === 'USD' && to === 'IQD') return 1310;
    if (from === 'IQD' && to === 'USD') return 1 / 1310;
    if (from === 'USD' && to === 'CNY') return 7.18;
    if (from === 'CNY' && to === 'USD') return 1 / 7.18;
    return 1;
  };

  const rate = getExchangeRate(fromCurrency, toCurrency);
  const converted = amount * rate;

  const handleTrack = () => {
    if (!orderQuery) return;
    setOrderResult({
      orderId: orderQuery.toUpperCase(),
      beneficiary: 'China Petroleum Engineering Corp (CPECC)',
      payer: 'Basra Oil Company (BOC)',
      amount: '¥42,800,000.00 (CNY)',
      valueIqd: 'IQD 7,806,720,000',
      status: 'CLEARED & SETTLED',
      gateway: 'ICA Direct RTGS Bridge (CBI-PBOC)',
      timestamp: '2026-09-27 06:14:22 UTC',
      hash: '0x8f2a991c4b72ef3109a1288cba9281',
    });
  };

  const handleDownload = () => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 4000);
  };

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <section className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 space-y-4 shadow-xl transition-colors">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-800 dark:text-brand-300 border border-brand-200 dark:border-brand-800/40 text-xs font-black uppercase tracking-wider">
          <CreditCard className="w-3.5 h-3.5 text-brand-800 dark:text-brand-400" />
          <span>BILATERAL MONETARY INFRASTRUCTURE</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-ink-950 dark:text-white tracking-tight">
          {t.settlement.title}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 text-sm max-w-3xl leading-relaxed">
          {t.settlement.subtitle}
        </p>
      </section>

      {/* Gateway Operational Status Banner */}
      <section className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 text-xs transition-colors shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
          <div>
            <div className="text-ink-950 dark:text-white font-bold">{t.settlement.gatewayStatus}</div>
            <div className="text-neutral-500 dark:text-neutral-400 text-[11px]">{t.settlement.rateNotice}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {downloadNotice && (
            <div className="text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 size={14} />
              <span>Handbook Generated & Ready</span>
            </div>
          )}
          <button
            onClick={handleDownload}
            className="bg-brand-800 hover:bg-brand-900 text-white font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.settlement.complianceHandbook}</span>
          </button>
        </div>
      </section>

      {/* Main Grid: Converter and Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Converter Card */}
        <section className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl transition-colors">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-ink-950 dark:text-white flex items-center gap-2">
              <Coins className="w-4 h-4 text-brand-800 dark:text-brand-400" />
              {t.settlement.converterTitle}
            </h2>
            <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 px-2.5 py-0.5 rounded-full">
              PBOC / CBI Live
            </span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-neutral-700 dark:text-neutral-300 font-semibold">{t.settlement.amount}</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-ink-950 dark:text-white text-lg font-mono font-bold focus:outline-none focus:border-brand-800 shadow-inner"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="space-y-1">
                <label className="text-xs text-neutral-700 dark:text-neutral-300 font-semibold">{t.settlement.fromCurrency}</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value as any)}
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-2.5 text-xs text-ink-950 dark:text-white focus:outline-none focus:border-brand-800"
                >
                  <option value="IQD">IQD (Iraqi Dinar)</option>
                  <option value="CNY">CNY (Chinese Yuan / e-CNY)</option>
                  <option value="USD">USD (US Dollar)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-700 dark:text-neutral-300 font-semibold">{t.settlement.toCurrency}</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value as any)}
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-2.5 text-xs text-ink-950 dark:text-white focus:outline-none focus:border-brand-800"
                >
                  <option value="CNY">CNY (Chinese Yuan / e-CNY)</option>
                  <option value="IQD">IQD (Iraqi Dinar)</option>
                  <option value="USD">USD (US Dollar)</option>
                </select>
              </div>
            </div>

            {/* Calculated Output Display */}
            <div className="bg-neutral-50 dark:bg-neutral-850 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1">
              <div className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold">{t.settlement.convertedValue}</div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-brand-800 dark:text-brand-400">
                {converted.toLocaleString('en-US', { maximumFractionDigits: 2 })} {toCurrency}
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                1 {fromCurrency} = {rate.toFixed(6)} {toCurrency}
              </div>
            </div>

            <div className="text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-2 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Zero offshore currency intermediary deductions applied under the bilateral treaty.</span>
            </div>
          </div>
        </section>

        {/* Transaction Tracker Card */}
        <section className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xl transition-colors">
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-ink-950 dark:text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-brand-800 dark:text-brand-400" />
                {t.settlement.trackerTitle}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Input transaction reference hash or letter of credit ID for real-time clearance status.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  placeholder="e.g. IQD-CNY-2026-88192"
                  className="flex-1 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-2.5 text-xs text-ink-950 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-brand-800 font-mono"
                />
                <button
                  onClick={handleTrack}
                  className="bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs px-4 rounded-xl transition-colors shrink-0 shadow-xs cursor-pointer"
                >
                  Verify
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setOrderQuery('IQD-CNY-2026-90412');
                    setTimeout(() => handleTrack(), 50);
                  }}
                  className="text-[11px] text-neutral-500 dark:text-neutral-400 hover:text-brand-800 dark:hover:text-brand-300 underline font-mono cursor-pointer"
                >
                  Try demo hash: IQD-CNY-2026-90412
                </button>
              </div>
            </div>

            {orderResult && (
              <div className="bg-neutral-50 dark:bg-neutral-850 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-ink-950 dark:text-white">{orderResult.orderId}</span>
                  <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2.5 py-0.5 rounded-full text-[10px] border border-emerald-200 dark:border-emerald-800/40">
                    {orderResult.status}
                  </span>
                </div>

                <div className="space-y-1 border-t border-neutral-200 dark:border-neutral-800 pt-2 text-[11px]">
                  <div className="text-neutral-600 dark:text-neutral-400"><strong className="text-neutral-800 dark:text-neutral-200">Payer:</strong> {orderResult.payer}</div>
                  <div className="text-neutral-600 dark:text-neutral-400"><strong className="text-neutral-800 dark:text-neutral-200">Beneficiary:</strong> {orderResult.beneficiary}</div>
                  <div className="text-neutral-600 dark:text-neutral-400"><strong className="text-neutral-800 dark:text-neutral-200">Amount:</strong> <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">{orderResult.amount}</span></div>
                  <div className="text-neutral-600 dark:text-neutral-400"><strong className="text-neutral-800 dark:text-neutral-200">Channel:</strong> {orderResult.gateway}</div>
                </div>

                <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono truncate pt-1 border-t border-neutral-200 dark:border-neutral-800">
                  Audit Hash: {orderResult.hash}
                </div>
              </div>
            )}
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-850 p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>2026 Daily Average Gross Clearing Capacity: ¥4.8B CNY / IQD 875B.</span>
          </div>
        </section>
      </div>
    </div>
  );
};
