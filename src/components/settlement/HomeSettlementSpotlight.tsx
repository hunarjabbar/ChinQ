import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  Calculator, 
  Clock, 
  CheckCircle2
} from 'lucide-react';
import { Locale } from '../../types';
import { getSettlementTranslation } from '../../locales/settlementTranslations';

interface Props {
  lang: Locale;
}

export function HomeSettlementSpotlight({ lang }: Props) {
  const t = (key: string) => getSettlementTranslation(lang, key);
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';
  const isRtl = isAr || isCkb;

  const [activeTab, setActiveTab] = useState<'calc' | 'tracker'>('calc');
  const [iqdAmount, setIqdAmount] = useState<number>(50000000);

  const rmbReceived = iqdAmount / 182.50;
  const directRetainedSavings = iqdAmount * 0.054; // ~5.4% saved vs traditional USD double spread

  return (
    <section className="w-full py-16 bg-white dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800 transition-colors" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Top Header & Sovereign Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-800 dark:text-brand-300 border border-brand-200 dark:border-brand-800/40 text-xs font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-brand-800 animate-pulse"></span>
              <span>{t('settlement.badge.sovereign')}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-ink-950 dark:text-white tracking-tight">
              {t('settlement.title')}
            </h2>

            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {t('settlement.hero.desc')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to={`/${lang}/settlement`}
              className="bg-brand-800 hover:bg-brand-900 text-white px-5 py-3 rounded-xl font-black text-xs sm:text-sm shadow-md flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>{isAr ? 'دخول بوابة التسوية' : isZh ? '进入结算门户' : isCkb ? 'چوونە نێو دەروازە' : 'Access Settlement Portal'}</span>
              <span className="cta-arrow">→</span>
            </Link>

            <Link
              to={`/${lang}/settlement/card`}
              className="bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-brand-800 dark:text-brand-400 border border-brand-200 dark:border-brand-800/60 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <CreditCard size={16} />
              <span>{t('settlement.hero.ctaCard')}</span>
            </Link>
          </div>
        </div>

        {/* 4 Pillars Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="pay-card p-4 rounded-2xl border border-brand-200/60 dark:border-neutral-800 bg-brand-50/40 dark:bg-neutral-800/40 hover:border-brand-400 transition-all">
            <div className="text-brand-800 dark:text-brand-400 font-black text-lg sm:text-xl font-mono">0.00%</div>
            <div className="text-xs font-bold text-neutral-800 dark:text-neutral-100 mt-1">Zero Third-Currency Drag</div>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400">No USD double conversion spreads</div>
          </div>

          <div className="pay-card p-4 rounded-2xl border border-brand-200/60 dark:border-neutral-800 bg-brand-50/40 dark:bg-neutral-800/40 hover:border-brand-400 transition-all">
            <div className="text-brand-800 dark:text-brand-400 font-black text-lg sm:text-xl font-mono">24 – 48 Hours</div>
            <div className="text-xs font-bold text-neutral-800 dark:text-neutral-100 mt-1">Direct Rapid Clearing</div>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Bypasses intermediary wire holds</div>
          </div>

          <div className="pay-card p-4 rounded-2xl border border-brand-200/60 dark:border-neutral-800 bg-brand-50/40 dark:bg-neutral-800/40 hover:border-brand-400 transition-all">
            <div className="text-brand-800 dark:text-brand-400 font-black text-lg sm:text-xl font-mono">CBI & PBoC</div>
            <div className="text-xs font-bold text-neutral-800 dark:text-neutral-100 mt-1">Sovereign Regulatory Rail</div>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400">CIPS & Trade Bank of Iraq channels</div>
          </div>

          <div className="pay-card p-4 rounded-2xl border border-brand-200/60 dark:border-neutral-800 bg-brand-50/40 dark:bg-neutral-800/40 hover:border-brand-400 transition-all">
            <div className="text-brand-800 dark:text-brand-400 font-black text-lg sm:text-xl font-mono">Qi & ICA Card</div>
            <div className="text-xs font-bold text-neutral-800 dark:text-neutral-100 mt-1">Dual-Currency FinTech</div>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400">IQD & RMB linked wallets</div>
          </div>
        </div>

        {/* Interactive Dual-Tool Showcase (Calculator & Tracker Preview) */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-brand-200 dark:border-neutral-700/80 p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('calc')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'calc'
                    ? 'bg-brand-800 text-white shadow-xs'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-ink-950 dark:hover:text-white border border-neutral-200 dark:border-neutral-700'
                }`}
              >
                <Calculator size={14} />
                <span>{isAr ? 'حاسبة تحويل العملة الفورية' : isZh ? '双边直接汇率测算器' : isCkb ? 'ژمێرەری ڕاستەوخۆ' : 'IQD ⇄ RMB Currency Calculator'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('tracker')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'tracker'
                    ? 'bg-brand-800 text-white shadow-xs'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-ink-950 dark:hover:text-white border border-neutral-200 dark:border-neutral-700'
                }`}
              >
                <Clock size={14} />
                <span>{isAr ? 'متتبع مراحل التسوية' : isZh ? '清算进度实时追踪器' : isCkb ? 'شوێنپێهەڵگری پاکتاو' : 'Settlement Lifecycle Tracker'}</span>
              </button>
            </div>

            <Link
              to={activeTab === 'calc' ? `/${lang}/settlement/calculator` : `/${lang}/settlement/tracker`}
              className="text-xs font-bold text-brand-800 dark:text-brand-400 hover:underline hidden sm:flex items-center gap-1"
            >
              <span>{isAr ? 'فتح النظام بالكامل' : isZh ? '进入完整系统' : isCkb ? 'کردنەوەی تەواو' : 'Open Full Tool'}</span>
              <span className="cta-arrow">→</span>
            </Link>
          </div>

          {/* TAB CONTENT 1: Mini Calculator */}
          {activeTab === 'calc' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">Enter Iraqi Dinar (IQD) Trade Volume:</label>
                  <div className="relative">
                    <input
                      type="number"
                      step={5000000}
                      value={iqdAmount}
                      onChange={(e) => setIqdAmount(Math.max(1000000, Number(e.target.value)))}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 font-mono font-black text-lg text-ink-950 dark:text-white focus:outline-none focus:border-brand-800 bg-white dark:bg-neutral-800 shadow-inner"
                    />
                    <span className="absolute end-4 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-neutral-400">IQD</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {[25000000, 50000000, 100000000, 250000000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setIqdAmount(preset)}
                      className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:text-brand-800 text-neutral-600 dark:text-neutral-300 transition-colors border border-neutral-200 dark:border-neutral-700 cursor-pointer"
                    >
                      {(preset / 1000000).toFixed(0)}M IQD
                    </button>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Direct Sovereign Parity Rate:</span>
                    <strong className="font-mono text-ink-950 dark:text-white">1 RMB = 182.50 IQD</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Third-Currency Intermediary Fee:</span>
                    <strong className="font-mono text-emerald-700 dark:text-emerald-400">0.00% (Zero)</strong>
                  </div>
                </div>
              </div>

              <div className="md:col-span-6 pay-card p-6 border border-brand-200 dark:border-neutral-700 bg-brand-50/30 dark:bg-neutral-800/60 rounded-2xl space-y-4 text-center">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Direct Cleared RMB Delivery
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-brand-800 dark:text-brand-400">
                  ¥{rmbReceived.toLocaleString(undefined, { maximumFractionDigits: 2 })} RMB
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>
                    Your Direct Savings: +{directRetainedSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })} IQD (~5.4% retained)
                  </span>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/${lang}/settlement/inquiry`}
                    className="bg-brand-800 hover:bg-brand-900 text-white w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Execute Transaction at this Rate</span>
                    <span className="cta-arrow">→</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT 2: Mini Tracker Preview */}
          {activeTab === 'tracker' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="font-mono">
                  <span className="text-neutral-500 dark:text-neutral-400">Live Demonstrative Reference: </span>
                  <strong className="text-brand-800 dark:text-brand-400 font-bold">SETTLE-2026-000123</strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">Stage 5 of 7: Banking Partner Dispatch</span>
                </div>
              </div>

              {/* Visual 7-step tracker mini bar */}
              <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-3 overflow-hidden">
                <div className="bg-brand-800 h-full rounded-full transition-all duration-700" style={{ width: '71%' }}></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-[10px] font-bold text-center">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">1. Intake ✓</div>
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">2. KYC ✓</div>
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">3. Customs ✓</div>
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">4. Rate Lock ✓</div>
                <div className="p-2 rounded-lg bg-brand-100 dark:bg-brand-950/60 text-brand-800 dark:text-brand-300 border border-brand-300 dark:border-brand-800 font-black">5. Dispatching ⟳</div>
                <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-400 border border-neutral-200 dark:border-neutral-700">6. CIPS Exec</div>
                <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-400 border border-neutral-200 dark:border-neutral-700">7. Archival</div>
              </div>

              <div className="flex justify-end pt-2">
                <Link
                  to={`/${lang}/settlement/tracker/SETTLE-2026-000123`}
                  className="bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-brand-800 dark:text-brand-400 border border-brand-200 dark:border-brand-800 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Clock size={13} />
                  <span>Inspect Complete Transaction Audit Trail</span>
                </Link>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
