import React, { useState, useMemo, useEffect } from 'react';
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
  const isRtl = isAr || isCkb;

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
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-md p-5 sm:p-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-[#C8102E] text-[11px] font-black uppercase tracking-wider mb-2">
            <Zap size={13} />
            <span>{t('settlement.pillar.zeroFx')}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            {t('settlement.calc.title')}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl leading-relaxed">
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
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-50/80 p-4 sm:p-6 rounded-xl border border-gray-200">
        
        {/* Amount Input */}
        <div className="md:col-span-5 space-y-1.5">
          <label className="block text-xs font-black uppercase tracking-wider text-gray-600">
            {t('settlement.calc.amount')}
          </label>
          <div className="relative">
            <input
              type="text"
              value={rawInput}
              onChange={handleAmountChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white font-mono text-lg font-bold text-gray-900 focus:outline-none focus:border-[#C8102E] focus:ring-2 focus:ring-red-100 transition-all"
              placeholder="0"
              aria-label="Settlement input amount"
            />
            <span className="absolute inset-inline-end-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-bold text-xs uppercase font-mono">
              {sourceCurrency}
            </span>
          </div>
        </div>

        {/* Direction Switcher Button */}
        <div className="md:col-span-2 flex justify-center py-2 md:py-0">
          <button
            onClick={toggleDirection}
            className="w-11 h-11 rounded-full bg-white border border-gray-300 shadow-sm hover:border-[#C8102E] hover:text-[#C8102E] text-gray-600 flex items-center justify-center transition-all cursor-pointer group"
            title="Toggle Clearing Direction"
          >
            <ArrowRightLeft size={16} className="group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>

        {/* Target Currency Indicator */}
        <div className="md:col-span-5 space-y-1.5">
          <label className="block text-xs font-black uppercase tracking-wider text-gray-600">
            {t('settlement.calc.target')}
          </label>
          <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-800 font-mono text-lg font-bold flex items-center justify-between">
            <span>{targetCurrency === 'RMB' ? 'Chinese Yuan (RMB / e-CNY)' : 'Iraqi Dinar (IQD)'}</span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-700 font-bold text-xs uppercase">
              {targetCurrency}
            </span>
          </div>
        </div>

      </div>

      {/* Two-Column Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Left Column: Traditional Route (Negative / Muted) */}
        <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {t('settlement.calc.traditionalRoute')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-700 text-[10px] font-bold">
                USD Intermediary
              </span>
            </div>

            <div>
              <div className="text-xs text-gray-500">{t('settlement.calc.traditionalOutput')}</div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-gray-600 mt-1 line-through decoration-red-400 decoration-2">
                {calculation.traditionalOutput.toLocaleString(undefined, { maximumFractionDigits: 2 })} {targetCurrency}
              </div>
            </div>

            <div className="space-y-2 border-t border-gray-200 pt-4 text-xs text-gray-600">
              <div className="flex items-center gap-2 text-gray-500">
                <Clock size={14} />
                <span>{t('settlement.calc.settlementTimeTrad')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <AlertCircle size={14} className="text-amber-600" />
                <span>Double FX Spread (IQD ➔ USD ➔ RMB)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <AlertCircle size={14} className="text-amber-600" />
                <span>Intermediary SWIFT Wire Deductions (~$50-$120 USD)</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-gray-400 border-t border-gray-200 pt-3">
            Subject to correspondent bank holds, FX slippage, and USD sanction compliance delays.
          </div>
        </div>

        {/* Right Column: Direct Route (Prominent Red Accent + Green Badge) */}
        <div className="p-6 rounded-2xl border-2 border-[#C8102E] bg-white shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6">
          
          {/* Top highlight bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-[#C8102E]"></div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#C8102E] uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>{t('settlement.calc.directRoute')}</span>
              </span>
              <span className="pay-badge-success flex items-center gap-1">
                <TrendingUp size={12} />
                <span>+{calculation.savingsPercent.toFixed(1)}% Advantage</span>
              </span>
            </div>

            <div>
              <div className="text-xs text-gray-500 font-bold">{t('settlement.calc.directOutput')}</div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-gray-900 mt-1">
                {calculation.directOutput.toLocaleString(undefined, { maximumFractionDigits: 2 })} {targetCurrency}
              </div>
            </div>

            {/* Savings Callout Banner */}
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 animate-pay-pulse">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#991B1B]">
                {t('settlement.calc.totalSavings')}
              </div>
              <div className="text-xl sm:text-2xl font-black text-[#C8102E] font-mono mt-0.5">
                +{calculation.diff.toLocaleString(undefined, { maximumFractionDigits: 2 })} {targetCurrency}
              </div>
              <div className="text-[10px] text-gray-600 mt-1">
                Guaranteed net deliverable amount without third-party wire friction.
              </div>
            </div>

            <div className="space-y-2 border-t border-gray-100 pt-4 text-xs font-bold text-gray-800">
              <div className="flex items-center gap-2 text-emerald-700">
                <Clock size={14} />
                <span>{t('settlement.calc.settlementTimeDirect')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <ShieldCheck size={14} className="text-[#C8102E]" />
                <span>Direct CBI ⇄ PBoC Sovereign Benchmark Parity</span>
              </div>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="space-y-1.5 border-t border-gray-100 pt-3">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-gray-500">Parity Efficiency</span>
              <span className="text-emerald-700">100% Direct Retention</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
              <div className="h-full bg-[#C8102E] transition-all duration-500" style={{ width: '100%' }}></div>
            </div>
          </div>

        </div>

      </div>

      {/* Itemized Avoided Fees Breakdown */}
      <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-4">
        <h4 className="text-xs font-black uppercase tracking-wider text-gray-800">
          {t('settlement.calc.breakdownTitle')}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-white rounded-lg border border-gray-200">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">
              {t('settlement.calc.usdSpreadAvoided')}
            </span>
            <span className="text-sm font-mono font-bold text-emerald-700 mt-0.5 block">
              ~{calculation.avoidedSpread.toLocaleString(undefined, { maximumFractionDigits: 2 })} {targetCurrency}
            </span>
          </div>

          <div className="p-3 bg-white rounded-lg border border-gray-200">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">
              {t('settlement.calc.intermediaryWireSaved')}
            </span>
            <span className="text-sm font-mono font-bold text-emerald-700 mt-0.5 block">
              ~{calculation.avoidedWire.toLocaleString(undefined, { maximumFractionDigits: 2 })} {targetCurrency}
            </span>
          </div>

          <div className="p-3 bg-white rounded-lg border border-gray-200">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">
              {t('settlement.calc.correspondentSaved')}
            </span>
            <span className="text-sm font-mono font-bold text-emerald-700 mt-0.5 block">
              ~{calculation.avoidedCorrespondent.toLocaleString(undefined, { maximumFractionDigits: 2 })} {targetCurrency}
            </span>
          </div>
        </div>
      </div>

      {/* Callout Chips */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-red-50/60 border border-red-100 text-xs">
        <div className="font-bold text-gray-800">
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
      <div className="text-[11px] text-gray-400 leading-relaxed border-t border-gray-100 pt-4 flex items-start gap-2">
        <HelpCircle size={14} className="shrink-0 mt-0.5 text-gray-400" />
        <span>{t('settlement.calc.disclaimer')}</span>
      </div>

    </div>
  );
}
