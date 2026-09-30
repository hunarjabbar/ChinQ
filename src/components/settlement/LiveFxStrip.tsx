import React, { useState, useEffect } from 'react';
import { RefreshCw, TrendingUp } from 'lucide-react';
import { Locale } from '../../types';
import { LiveFxData } from '../../types/settlement';

interface Props {
  lang: Locale;
}

const DEFAULT_RATES: LiveFxData = {
  iqdPerRmb: 182.50,
  rmbPerIqd: 0.005479,
  traditionalIqdPerRmb: 192.80, // ~5.64% USD hop drag
  traditionalRmbPerIqd: 0.005186,
  lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  directSpreadPercent: 0.0,
  thirdCurrencySpreadPercent: 5.64,
  cbiReferenceCode: 'CBI-FX-2026-RMB',
  pbocProtocolCode: 'PBOC-CFETS-PARITY'
};

export function LiveFxStrip({ lang }: Props) {
  const [rates, setRates] = useState<LiveFxData>(DEFAULT_RATES);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';

  const fetchRates = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/settlement/rates');
      if (res.ok) {
        const data = await res.json();
        setRates(data);
      }
    } catch {
      // Use fallback
      setRates(prev => ({
        ...prev,
        lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800 shadow-xs py-2 px-4 text-xs font-mono transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: Live indicator and parity fixing */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800/40">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{isAr ? 'تحديث فوري' : isZh ? '双边实时牌价' : isCkb ? 'نوێکردنەوەی کاتی' : 'Live Direct Parity'}</span>
          </div>

          <div className="flex items-center gap-2 text-ink-950 dark:text-white font-bold">
            <span>1 RMB = </span>
            <span className="text-brand-800 dark:text-brand-400 font-black text-sm">{rates.iqdPerRmb.toFixed(2)} IQD</span>
            <span className="text-neutral-400">|</span>
            <span>1,000,000 IQD = </span>
            <span className="text-brand-800 dark:text-brand-400 font-black text-sm">{(1000000 * rates.rmbPerIqd).toFixed(2)} RMB</span>
          </div>
        </div>

        {/* Center: Savings banner */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-50 dark:bg-brand-950/40 text-brand-900 dark:text-brand-300 text-[11px] font-bold border border-brand-200 dark:border-brand-800/40">
          <TrendingUp size={14} className="text-brand-800 dark:text-brand-400" />
          <span>
            {isAr 
              ? 'وفر مباشر +٥.٦٪ مقارنة بمسار التحويل الثلاثي عبر الدولار' 
              : isZh 
              ? '相较传统三方美元中转节约 ~5.6% 汇兑及通道成本' 
              : isCkb 
              ? 'پاشەکەوتی ڕاستەوخۆ +٥.٦٪ بەراورد بە دۆلار' 
              : 'Direct Clearing Advantage: ~5.6% saved vs 3-leg USD routing'}
          </span>
        </div>

        {/* Right: Controls & timestamp */}
        <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 text-[11px]">
          <span>{isAr ? 'آخر تحديث:' : isZh ? '更新时间:' : isCkb ? 'دوایین نوێکردنەوە:' : 'Updated:'} {rates.lastUpdated}</span>
          <button 
            onClick={fetchRates}
            disabled={isRefreshing}
            className="p-1 text-neutral-400 hover:text-brand-800 dark:hover:text-brand-400 transition-colors rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
            title="Refresh Parity Rates"
          >
            <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-brand-800' : ''} />
          </button>
        </div>

      </div>
    </div>
  );
}
