import { useState } from 'react';
import { Locale, PaymentExchangeRate } from '../../types';
import { Activity, ShieldCheck, Database, RefreshCw, TrendingUp, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface Props {
  rates: PaymentExchangeRate | null;
  lang: Locale;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function LiveRateTicker({ rates, lang, onRefresh, isRefreshing }: Props) {
  const [showChart, setShowChart] = useState(false);

  const isRtl = lang === 'ar' || lang === 'ckb';
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';

  const baseRate = rates?.baseRate ?? 188.50;
  const bidRate = rates?.bidRate ?? 187.80;
  const askRate = rates?.askRate ?? 189.20;
  const inverseRate = rates?.inverseRate ?? +(1 / baseRate).toFixed(6);

  const labels = {
    liveFeed: isAr ? 'الممر المصرفي المباشر PBOC • CBI' : isZh ? '中国央行数字货币与伊拉克央行清算走廊' : isCkb ? 'ڕێڕەوی ڕاستەوخۆی دراوی دیجیتاڵی PBOC • CBI' : 'PBOC • CBI Digital Currency Direct Clearing Corridor',
    rateLabel: isAr ? 'السعر الرسمي (1 يوان رقمي = )' : isZh ? '官方基准汇率（1 数字人民币 = ）' : isCkb ? 'نرخی فەرمی (١ یوانی دیجیتاڵی = )' : 'Official Clearing Rate (1 e-CNY = )',
    inverseLabel: isAr ? 'السعر العكسي (1000 د.ع = )' : isZh ? '反向汇率（1000 第纳尔 = ）' : isCkb ? 'نرخی پێچەوانە (١٠٠٠ د.ع = )' : 'Inverse (1,000 IQD = )',
    bidAsk: isAr ? 'سعر الشراء / البيع' : isZh ? '买入 / 卖出价' : isCkb ? 'نرخی کڕین / فرۆشتن' : 'Bid / Ask Spread',
    highLow: isAr ? 'أعلى / أدنى 24 ساعة' : isZh ? '24小时最高 / 最低' : isCkb ? 'بەرزترین / نزمترین لە ٢٤ کاتژمێر' : '24h High / Low',
    volume: isAr ? 'حجم التسوية اليومي' : isZh ? '日结算规模' : isCkb ? 'قەبارەی ڕۆژانەی مامەڵە' : '24h Clearing Volume',
    ecnyReserve: isAr ? 'احتياطي اليوان الرقمي' : isZh ? '数字人民币流动性池' : isCkb ? 'یه‌دەگی یوانی دیجیتاڵی' : 'e-CNY Liquidity Reserve',
    iqdReserve: isAr ? 'احتياطي الدينار العراقي' : isZh ? '伊拉克第纳尔清算池' : isCkb ? 'یه‌دەگی دیناری عێراقی' : 'IQD Settlement Reserve',
    toggleChart: isAr ? 'عرض مخطط التذبذب' : isZh ? '走势分析' : isCkb ? 'پیشاندانی چارت' : 'View Intraday Trend',
    synchronized: isAr ? 'متزامن مع البنك المركزي' : isZh ? '双边央行实时清算' : isCkb ? 'هاوکات لەگەڵ بانکی ناوەندی' : 'Central Banks Synchronized',
    mbridgeActive: isAr ? 'بروتوكول mBridge مفعل' : isZh ? 'mBridge多边央行走廊已激活' : isCkb ? 'پڕۆتۆکۆڵی mBridge چالاکە' : 'mBridge CBDC Protocol Active'
  };

  const trendData = rates?.trendHistory || [
    { time: '00:00', rate: 188.10 },
    { time: '04:00', rate: 188.25 },
    { time: '08:00', rate: 188.40 },
    { time: '12:00', rate: 188.75 },
    { time: '16:00', rate: 188.60 },
    { time: '20:00', rate: 188.50 }
  ];

  return (
    <div className="w-full bg-ink-900 text-white border-b-2 border-brand-800 font-sans shadow-md">
      {/* Top Status Streamer */}
      <div className="border-b border-white/10 px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs sm:text-xs font-bold tracking-widest uppercase text-neutral-300">
              {labels.liveFeed}
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-xs bg-emerald-950/80 border border-emerald-600/40 text-emerald-400 px-2 py-0.5 rounded font-mono">
              <CheckCircle2 size={11} /> {labels.mbridgeActive}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowChart(!showChart)}
              className="text-[11px] font-bold text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <TrendingUp size={13} className="text-brand-400" />
              <span>{labels.toggleChart}</span>
            </button>

            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                title="Refresh Rates Feed"
                className="p-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer disabled:opacity-50"
              >
                <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-brand-400' : ''} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 text-start">
          
          {/* Primary Exchange Rate */}
          <div className="col-span-2 sm:col-span-1 bg-white/5 border border-white/10 p-3.5 rounded-xl">
            <div className="text-xs uppercase tracking-wider text-neutral-400 mb-1">
              {labels.rateLabel}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">
                {baseRate.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-neutral-400">IQD</span>
              <span className="text-xs font-bold text-emerald-400">
                +{rates?.change24h ?? 0.42}%
              </span>
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              {labels.inverseLabel} <span className="text-white font-bold">{(1000 * inverseRate).toFixed(2)} e-CNY</span>
            </div>
          </div>

          {/* Bid / Ask */}
          <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
            <div className="text-xs uppercase tracking-wider text-neutral-400 mb-1">
              {labels.bidAsk}
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-xs text-neutral-500 uppercase block">Bid</span>
                <span className="text-sm font-black text-white">{bidRate.toFixed(2)}</span>
              </div>
              <div className="text-neutral-600 font-sans">/</div>
              <div>
                <span className="text-xs text-neutral-500 uppercase block">Ask</span>
                <span className="text-sm font-black text-white">{askRate.toFixed(2)}</span>
              </div>
            </div>
            <div className="text-xs text-neutral-400 mt-1.5 flex items-center gap-1">
              <ShieldCheck size={10} className="text-brand-400" />
              <span>Interbank Wholesale Tier</span>
            </div>
          </div>

          {/* 24h High / Low */}
          <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
            <div className="text-xs uppercase tracking-wider text-neutral-400 mb-1">
              {labels.highLow}
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-xs text-emerald-400 uppercase block">High</span>
                <span className="text-sm font-bold text-white">{(rates?.high24h ?? 189.85).toFixed(2)}</span>
              </div>
              <div className="text-neutral-600 font-sans">/</div>
              <div>
                <span className="text-xs text-rose-400 uppercase block">Low</span>
                <span className="text-sm font-bold text-white">{(rates?.low24h ?? 187.10).toFixed(2)}</span>
              </div>
            </div>
            <div className="text-xs text-neutral-400 mt-1.5 truncate">
              {labels.volume}: <span className="text-neutral-200">{rates?.volume24h ?? '¥ 54.2M'}</span>
            </div>
          </div>

          {/* e-CNY Reserve Pool */}
          <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl hidden lg:block">
            <div className="text-xs uppercase tracking-wider text-neutral-400 mb-1 flex items-center gap-1">
              <Database size={11} className="text-brand-400" />
              <span>{labels.ecnyReserve}</span>
            </div>
            <div className="text-sm font-bold text-white">
              ¥ {((rates?.ecnyReservePool ?? 150000000) / 1000000).toFixed(1)}M e-CNY
            </div>
            <div className="text-xs text-emerald-400 mt-1">
              PBOC Sovereign CBDC Allocation
            </div>
          </div>

          {/* IQD Liquidity Pool */}
          <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl hidden md:block">
            <div className="text-xs uppercase tracking-wider text-neutral-400 mb-1 flex items-center gap-1">
              <Activity size={11} className="text-amber-400" />
              <span>{labels.iqdReserve}</span>
            </div>
            <div className="text-sm font-bold text-white truncate">
              د.ع {((rates?.iqdReservePool ?? 28275000000) / 1000000000).toFixed(2)}B IQD
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              Central Bank of Iraq Direct Clearing
            </div>
          </div>

        </div>

        {/* Collapsible Intraday Trend Curve */}
        {showChart && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                24-Hour Intraday Clearing Curve (IQD per 1 e-CNY)
              </span>
              <span className="text-xs text-neutral-400">
                Live ticks polled every 15s • mBridge High-Frequency Feed
              </span>
            </div>
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#71717a" fontSize={10} tickLine={false} />
                  <YAxis domain={['auto', 'auto']} stroke="#71717a" fontSize={10} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '8px', fontSize: '11px', color: '#fff' }} 
                    formatter={(val: any) => [`${val} IQD`, 'Rate']}
                  />
                  <Area type="monotone" dataKey="rate" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#rateGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
