import React, { useState, useMemo } from 'react';
import { 
  ArrowRightLeft, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  HelpCircle,
  Zap
} from 'lucide-react';
import { Locale } from '../../types';
import { getSettlementTranslation } from '../../locales/settlementTranslations';
import { generateCalculatorPdf } from '../../lib/settlement/pdf';

interface Props {
  lang: Locale;
  initialAmount?: number;
  initialSource?: 'IQD' | 'RMB';
}

export function CurrencyCalculator({ lang, initialAmount = 50000000, initialSource = 'IQD' }: Props) {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [rawInput, setRawInput] = useState<string>(initialAmount.toLocaleString());
  const [sourceCurrency, setSourceCurrency] = useState<'IQD' | 'RMB'>(initialSource);
  const targetCurrency = sourceCurrency === 'IQD' ? 'RMB' : 'IQD';

  const t = (key: string) => getSettlementTranslation(lang, key);
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';

  // Base Parity Rates
  // Direct: 1 RMB = 182.50 IQD (1 IQD = 0.00547945 RMB)
  // Traditional (3-leg via USD): 1 RMB = ~192.80 IQD (due to double spread ~5.64% + fees)
  const directRate = sourceCurrency === 'IQD' ? (1 / 182.50) : 182.50;
  const traditionalRate = sourceCurrency === 'IQD' ? (1 / 192.80) : 172.20;

  // Debounced input handler
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/,/g, '').trim();
    setRawInput(e.target.value);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed >= 0) {
      setAmount(parsed);
    } else if (val === '') {
      setAmount(0);
    }
  };

  const toggleDirection = () => {
    const nextSource = sourceCurrency === 'IQD' ? 'RMB' : 'IQD';
    setSourceCurrency(nextSource);
    const newDefault = nextSource === 'IQD' ? 50000000 : 250000;
    setAmount(newDefault);
    setRawInput(newDefault.toLocaleString());
  };

  // Calculations
  const calculation = useMemo(() => {
    const safeAmount = Math.max(0, amount);
    const directOutput = safeAmount * directRate;
    const traditionalOutput = safeAmount * traditionalRate;
    
    // Avoided fees breakdown
    const diff = Math.max(0, directOutput - traditionalOutput);
    const savingsPercent = directOutput > 0 ? (diff / directOutput) * 100 : 0;
    
    // Avoided fees itemization
    const avoidedSpread = diff * 0.65; // ~65% of savings from avoiding USD double-spread
    const avoidedWire = diff * 0.20;   // ~20% from avoiding SWIFT intermediary wire deductions
    const avoidedCorrespondent = diff * 0.15; // ~15% from avoiding correspondent holding/processing tolls

    return {
      directOutput,
      traditionalOutput,
      diff,
      savingsPercent,
      avoidedSpread,
      avoidedWire,
      avoidedCorrespondent
    };
  }, [amount, directRate, traditionalRate]);

  const handleDownloadPdf = () => {
    generateCalculatorPdf({
      amount,
      sourceCurrency,
      targetCurrency,
      directRate,
      directOutput: calculation.directOutput,
      traditionalOutput: calculation.traditionalOutput,
      savingsAmount: calculation.diff,
      savingsPercent: calculation.savingsPercent,
      avoidedSpread: calculation.avoidedSpread,
      avoidedWire: calculation.avoidedWire,
      avoidedCorrespondent: calculation.avoidedCorrespondent,
      date: new Date().toLocaleDateString()
    });
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl p-5 sm:p-8 space-y-8 transition-colors">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/50 text-brand-800 dark:text-brand-300 border border-brand-200 dark:border-brand-800/40 text-[11px] font-black uppercase tracking-wider mb-2">
            <Zap size={13} className="text-brand-800 dark:text-brand-400" />
            <span>{t('settlement.pillar.zeroFx')}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-ink-950 dark:text-white tracking-tight">
            {t('settlement.calc.title')}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-2xl leading-relaxed">
            {t('settlement.calc.subtitle')}
          </p>
        </div>

        <button
          onClick={handleDownloadPdf}
          className="pay-btn-secondary px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0 self-start md:self-auto"
        >
          <Download size={15} />
          <span>{t('settlement.calc.downloadPdf')}</span>
        </button>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-neutral-50/80 dark:bg-neutral-800/50 p-4 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700/80">
        
        {/* Amount Input */}
        <div className="md:col-span-5 space-y-1.5">
          <label className="block text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
            {t('settlement.calc.amount')}
          </label>
          <div className="relative">
            <input
              type="text"
              value={rawInput}
              onChange={handleAmountChange}
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 font-mono text-lg font-bold text-ink-950 dark:text-white focus:outline-none focus:border-brand-800 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-inner"
              placeholder="0"
              aria-label="Settlement input amount"
            />
            <span className="absolute inset-inline-end-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold text-xs uppercase font-mono">
              {sourceCurrency}
            </span>
          </div>
        </div>

        {/* Direction Switcher Button */}
        <div className="md:col-span-2 flex justify-center py-2 md:py-0">
          <button
            onClick={toggleDirection}
            className="w-11 h-11 rounded-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 shadow-sm hover:border-brand-800 hover:text-brand-800 dark:hover:border-brand-500 dark:hover:text-brand-400 text-neutral-600 dark:text-neutral-300 flex items-center justify-center transition-all cursor-pointer group"
            title="Toggle Clearing Direction"
          >
            <ArrowRightLeft size={16} className="group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>

        {/* Target Currency Indicator */}
        <div className="md:col-span-5 space-y-1.5">
          <label className="block text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
            {t('settlement.calc.target')}
          </label>
          <div className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800/90 text-neutral-800 dark:text-neutral-200 font-mono text-lg font-bold flex items-center justify-between">
            <span className="truncate text-sm sm:text-base">{targetCurrency === 'RMB' ? 'Chinese Yuan (RMB / e-CNY)' : 'Iraqi Dinar (IQD)'}</span>
            <span className="px-2.5 py-1 rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-xs uppercase shrink-0">
              {targetCurrency}
            </span>
          </div>
        </div>

      </div>

      {/* Two-Column Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Left Column: Traditional Route (Negative / Muted) */}
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-850/50 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                {t('settlement.calc.traditionalRoute')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[10px] font-bold">
                USD Intermediary
              </span>
            </div>

            <div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">{t('settlement.calc.traditionalOutput')}</div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-neutral-500 dark:text-neutral-400 mt-1 line-through decoration-red-500 decoration-2">
                {calculation.traditionalOutput.toLocaleString(undefined, { maximumFractionDigits: 2 })} {targetCurrency}
              </div>
            </div>

            <div className="space-y-2 border-t border-neutral-200 dark:border-neutral-800 pt-4 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-neutral-400" />
                <span>{t('settlement.calc.settlementTimeTrad')}</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle size={14} className="text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Double FX Spread (IQD ➔ USD ➔ RMB)</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle size={14} className="text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Intermediary SWIFT Wire Deductions (~$50-$120 USD)</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-neutral-400 dark:text-neutral-500 border-t border-neutral-200 dark:border-neutral-800 pt-3">
            Subject to correspondent bank holds, FX slippage, and USD sanction compliance delays.
          </div>
        </div>

        {/* Right Column: Direct Route (Prominent Brand Red Accent + Green Badge) */}
        <div className="p-6 rounded-2xl border-2 border-brand-800 dark:border-brand-700 bg-white dark:bg-neutral-900 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6">
          
          {/* Top highlight bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-brand-800"></div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-brand-800 dark:text-brand-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                <span>{t('settlement.calc.directRoute')}</span>
              </span>
              <span className="pay-badge-success flex items-center gap-1">
                <TrendingUp size={12} />
                <span>+{calculation.savingsPercent.toFixed(1)}% Advantage</span>
              </span>
            </div>

            <div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 font-bold">{t('settlement.calc.directOutput')}</div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-brand-800 dark:text-brand-400 mt-1">
                {calculation.directOutput.toLocaleString(undefined, { maximumFractionDigits: 2 })} {targetCurrency}
              </div>
            </div>

            {/* Savings Callout Banner */}
            <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/50">
              <div className="text-[11px] font-bold uppercase tracking-wider text-brand-900 dark:text-brand-300">
                {t('settlement.calc.totalSavings')}
              </div>
              <div className="text-xl sm:text-2xl font-black text-brand-800 dark:text-brand-400 font-mono mt-0.5">
                +{calculation.diff.toLocaleString(undefined, { maximumFractionDigits: 2 })} {targetCurrency}
              </div>
              <div className="text-[10px] text-neutral-600 dark:text-neutral-400 mt-1">
                Guaranteed net deliverable amount without third-party wire friction.
              </div>
            </div>

            <div className="space-y-2 border-t border-neutral-100 dark:border-neutral-800 pt-4 text-xs font-bold text-neutral-800 dark:text-neutral-200">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <Clock size={14} />
                <span>{t('settlement.calc.settlementTimeDirect')}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                <ShieldCheck size={14} className="text-brand-800 dark:text-brand-400" />
                <span>Direct CBI ⇄ PBoC Sovereign Benchmark Parity</span>
              </div>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="space-y-1.5 border-t border-neutral-100 dark:border-neutral-800 pt-3">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-neutral-500 dark:text-neutral-400">Parity Efficiency</span>
              <span className="text-emerald-700 dark:text-emerald-400">100% Direct Retention</span>
            </div>
            <div className="w-full h-3 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden flex">
              <div className="h-full bg-brand-800 rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
            </div>
          </div>

        </div>

      </div>

      {/* Itemized Avoided Fees Breakdown */}
      <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-850/60 border border-neutral-200 dark:border-neutral-800 space-y-4">
        <h4 className="text-xs font-black uppercase tracking-wider text-ink-950 dark:text-white">
          {t('settlement.calc.breakdownTitle')}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700/80">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">
              {t('settlement.calc.usdSpreadAvoided')}
            </span>
            <span className="text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 block">
              ~{calculation.avoidedSpread.toLocaleString(undefined, { maximumFractionDigits: 2 })} {targetCurrency}
            </span>
          </div>

          <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700/80">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">
              {t('settlement.calc.intermediaryWireSaved')}
            </span>
            <span className="text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 block">
              ~{calculation.avoidedWire.toLocaleString(undefined, { maximumFractionDigits: 2 })} {targetCurrency}
            </span>
          </div>

          <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700/80">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">
              {t('settlement.calc.correspondentSaved')}
            </span>
            <span className="text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 block">
              ~{calculation.avoidedCorrespondent.toLocaleString(undefined, { maximumFractionDigits: 2 })} {targetCurrency}
            </span>
          </div>
        </div>
      </div>

      {/* Callout Chips */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-100 dark:border-brand-900/40 text-xs">
        <div className="font-bold text-neutral-800 dark:text-neutral-200">
          {isAr 
            ? 'لا مسار للدولار • لا رسوم بنوك وسيطة • لا هدر بالصرف' 
            : isZh 
            ? '无美元中转环节 • 无中介行收费 • 无二次汇率点差' 
            : isCkb 
            ? 'بێ دۆلار • بێ تێچووی نێوانگر • بێ زیانی دراو' 
            : 'No USD leg. No intermediary bank tolls. No FX drag.'}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="pay-badge">{t('settlement.pillar.zeroFx')}</span>
          <span className="pay-badge">{t('settlement.pillar.zeroWire')}</span>
          <span className="pay-badge">{t('settlement.pillar.directChannel')}</span>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-[11px] text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800 pt-4 flex items-start gap-2">
        <HelpCircle size={14} className="shrink-0 mt-0.5 text-neutral-400" />
        <span>{t('settlement.calc.disclaimer')}</span>
      </div>

    </div>
  );
}
