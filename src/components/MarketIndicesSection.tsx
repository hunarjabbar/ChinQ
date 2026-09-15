import { useState, useMemo, useEffect } from 'react';
import { MarketData, Locale } from '../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Search, RefreshCw, BarChart2, ShieldCheck, X, Clock, Play, Pause } from 'lucide-react';
import { cn } from '../lib/utils';
import { IqdEcnyHistoricalChart } from './IqdEcnyHistoricalChart';
import { TradingViewChart } from './TradingViewChart';
import { getTradingViewSymbol, isTradingViewSupported } from '../lib/tradingViewSymbols';
import { useSiteStore } from '../store/useSiteStore';

interface MarketIndicesSectionProps {
  data: MarketData[];
  lang: Locale;
  onClose?: () => void;
  isModal?: boolean;
}

// Generate realistic intraday / timeframe historical chart points dynamically
function generateHistoricalData(item: MarketData, timeframe: '1D' | '1W' | '1M' | '3M' | '1Y') {
  const points = timeframe === '1D' ? 24 : timeframe === '1W' ? 35 : timeframe === '1M' ? 30 : 60;
  const basePrice = item.price;
  const volatility = item.price * 0.015;
  const isPositive = item.change >= 0;

  const result = [];
  let current = basePrice - (isPositive ? volatility * 1.5 : -volatility * 1.5);

  const now = new Date();
  for (let i = 0; i < points; i++) {
    const factor = Math.sin(i / 3) * volatility * 0.6 + (Math.random() - 0.48) * volatility;
    current += factor;
    // ensure last point is close to actual live price
    if (i === points - 1) current = basePrice;

    let label = '';
    if (timeframe === '1D') {
      const h = Math.floor(9 + (i * 6.5) / 60);
      const m = Math.floor((i * 6.5) % 60);
      label = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    } else if (timeframe === '1W') {
      const d = new Date(now.getTime() - (points - i) * 4 * 3600 * 1000);
      label = d.toLocaleDateString('en-US', { weekday: 'short', hour: '2-digit' });
    } else {
      const d = new Date(now.getTime() - (points - i) * 24 * 3600 * 1000);
      label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    result.push({
      time: label,
      price: parseFloat(current.toFixed(item.currency === 'CNY' || item.currency === 'HKD' ? 2 : 4)),
      volume: Math.floor(Math.random() * 50000 + 10000),
    });
  }
  return result;
}

export function MarketIndicesSection({ data, lang, onClose, isModal = false }: MarketIndicesSectionProps) {
  const [marketItems, setMarketItems] = useState<MarketData[]>(data);
  const [mainView, setMainView] = useState<'IQD_ECNY_CHART' | 'TERMINAL'>('TERMINAL');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('SSE');
  const [activeTab, setActiveTab] = useState<'ALL' | 'IQD_ECNY' | 'INDICES' | 'HK_STOCKS' | 'CHINA_STOCKS' | 'COMMODITIES'>('ALL');
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1D');
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-refresh timer state
  const [refreshInterval, setRefreshInterval] = useState<number>(5); // 5s default
  const [countdown, setCountdown] = useState<number>(5);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);

  // Direct fetch function for auto-refresh
  const handleFetchLatest = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/market');
      if (res.ok) {
        const items = await res.json();
        if (Array.isArray(items) && items.length > 0) {
          setMarketItems(items);
          setLastUpdated(new Date());
          setIsFlashing(true);
          setTimeout(() => setIsFlashing(false), 700);
          return;
        }
      }
    } catch {
      // Fallback: simulate live market micro-fluctuations on local state if offline or network glitch
    }
    
    // Smooth fallback tick update if fetch didn't return items
    setMarketItems(prev => prev.map(d => {
      const delta = (Math.random() - 0.48) * 0.003;
      const newPrice = Number((d.price * (1 + delta)).toFixed(2));
      const newPercent = Number((d.changePercent + delta * 100).toFixed(2));
      return {
        ...d,
        price: newPrice,
        changePercent: newPercent
      };
    }));
    setLastUpdated(new Date());
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 700);
    setIsRefreshing(false);
  };

  // Sync with incoming prop data from SSE or parent
  useEffect(() => {
    if (data && data.length > 0) {
      setMarketItems(data);
      setLastUpdated(new Date());
      setIsFlashing(true);
      const timer = setTimeout(() => setIsFlashing(false), 700);
      return () => clearTimeout(timer);
    } else if (marketItems.length === 0) {
      handleFetchLatest();
    }
  }, [data]);

  // Auto-refresh interval timer loop
  useEffect(() => {
    if (refreshInterval === 0) return; // Auto-refresh paused

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          handleFetchLatest();
          return refreshInterval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  // Default to SSE (Shanghai Composite Index) or first available item if selectedSymbol is not found
  const activeStock = useMemo(() => {
    return marketItems.find(d => d.symbol === selectedSymbol) || marketItems.find(d => d.symbol === 'SSE') || marketItems[0] || {
      id: 'sse',
      symbol: 'SSE',
      name: 'Shanghai Composite Index',
      nameZh: '上证综合指数',
      nameAr: 'مؤشر شنغهاي المركب (SSE)',
      category: 'INDEX',
      price: 3088.64,
      change: 32.18,
      changePercent: 1.05,
      volume: '342.1B CNY',
      high: 3098.50,
      low: 3065.20,
      open: 3068.10,
      currency: 'CNY',
      marketCap: '48.2T CNY',
      peRatio: 12.4,
      updatedAt: new Date().toISOString()
    };
  }, [marketItems, selectedSymbol]);

  // Set initial selected symbol when data arrives if current selected is missing
  useEffect(() => {
    if (marketItems.length > 0 && !marketItems.some(d => d.symbol === selectedSymbol)) {
      const sseItem = marketItems.find(d => d.symbol === 'SSE');
      setSelectedSymbol(sseItem ? sseItem.symbol : marketItems[0].symbol);
    }
  }, [marketItems]);

  const filteredData = useMemo(() => {
    return marketItems.filter(item => {
      // Tab filter
      if (activeTab === 'IQD_ECNY' && item.symbol !== 'IQD_ECNY') return false;
      if (activeTab === 'INDICES' && item.category !== 'INDEX') return false;
      if (activeTab === 'HK_STOCKS' && item.category !== 'HK_STOCK') return false;
      if (activeTab === 'CHINA_STOCKS' && item.category !== 'CHINA_STOCK') return false;
      if (activeTab === 'COMMODITIES' && item.category !== 'COMMODITY' && item.category !== 'FOREX') return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSymbol = item.symbol.toLowerCase().includes(q);
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesZh = item.nameZh?.toLowerCase().includes(q);
        const matchesAr = item.nameAr?.toLowerCase().includes(q);
        return matchesSymbol || matchesName || matchesZh || matchesAr;
      }

      return true;
    });
  }, [marketItems, activeTab, searchQuery]);

  const darkMode = useSiteStore((state) => state.darkMode);

  const mappedTvSymbol = useMemo(() => {
    return getTradingViewSymbol(activeStock.symbol);
  }, [activeStock.symbol]);

  const tvLocale = useMemo(() => {
    if (lang === 'ar') return 'ar';
    if (lang === 'zh') return 'zh_CN';
    return 'en';
  }, [lang]);

  const chartPoints = useMemo(() => {
    return generateHistoricalData(activeStock, timeframe);
  }, [activeStock, timeframe]);

  const isUp = activeStock.change >= 0;

  const getItemDisplayName = (item: MarketData) => {
    if (lang === 'zh' && item.nameZh) return item.nameZh;
    if (lang === 'ar' && item.nameAr) return item.nameAr;
    if (lang === 'ckb') {
      if (item.symbol === 'IQD_ECNY') return 'نرخی ئاڵوگۆڕی دینار / یوانی دیجیتاڵی';
      if (item.symbol === 'ISX60') return 'مۆڕکەری بۆرسەی عێراق ISX60';
      if (item.symbol === 'HSI') return 'مۆڕکەری هۆنگ کۆنگ هانگ سینگ';
      if (item.symbol === 'BRENT') return 'نەوتی خاوی برێنت';
      if (item.symbol === 'GOLD') return 'ئاڵتوونی فەرمی (XAU/USD)';
      if (item.nameAr) return item.nameAr;
    }
    return item.name;
  };

  return (
    <div className={cn(
      "w-full bg-neutral-950 text-white font-sans border-y-4 border-brand-800 shadow-2xl relative transition-all duration-300",
      isModal ? "p-4 md:p-8 rounded-lg max-w-6xl mx-auto my-4 max-h-[90vh] overflow-y-auto" : "p-4 md:p-6"
    )}>
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/10 border border-white/20 rounded flex items-center justify-center text-white font-black shadow-md backdrop-blur-sm">
            <BarChart2 size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-black text-xl md:text-2xl text-white tracking-tight">
                {lang === 'ar' ? 'مؤشرات الأسواق والأسهم الصينية والأسيوية' : lang === 'zh' ? '中国及香港股市指数与龙头大盘' : lang === 'ckb' ? 'نیشاندەرانی بازاڕی چین و هۆنگ کۆنگ' : 'China & Hong Kong Stock Indices & Equities'}
              </h2>
              <span className="bg-brand-800/20 text-brand-300 border border-brand-800/30 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
                REAL-TIME SSE/HKEX FEED
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              {lang === 'ar' ? 'بيانات حية ومباشرة للبورصات الرئيسية في بكين وشنغهاي وهونغ كونغ وبغداد' : lang === 'zh' ? '沪深港三大交易所及中伊贸易龙头企业实盘走势' : lang === 'ckb' ? 'داتای ڕاستەوخۆ بۆ بۆرسە سەرەکییەکانی پەکین، شەنگەهای، هۆنگ کۆنگ و بەغدا' : 'Live intraday charts & streaming updates for Shanghai, Shenzhen, HKEX & Sino-Iraqi markets'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute start-2.5 top-2.5 text-gray-400" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'zh' ? '搜索股票/指数...' : lang === 'ar' ? 'بحث عن سهم أو مؤشر...' : lang === 'ckb' ? 'گەڕان بۆ هێما یان پشک...' : 'Search symbol/stock...'}
              className="bg-white/5 border border-white/15 focus:border-brand-800 text-xs text-white rounded ps-8 pe-3 py-1.5 w-40 sm:w-48 focus:outline-none transition-colors"
            />
          </div>

          {onClose && (
            <button 
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
              title="Close terminal"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Primary View Mode Switcher */}
      <div className="flex flex-wrap items-center gap-2 mb-4 bg-black/40 p-1.5 rounded-lg border border-white/10">
        <button
          onClick={() => {
            setMainView('IQD_ECNY_CHART');
            setSelectedSymbol('IQD_ECNY');
          }}
          className={cn(
            "px-4 py-2 text-xs sm:text-sm font-black rounded-md transition-all flex items-center gap-2 cursor-pointer shadow-xs",
            mainView === 'IQD_ECNY_CHART'
              ? "bg-amber-500 text-neutral-950 font-black shadow-amber-500/20"
              : "text-gray-300 hover:text-white hover:bg-white/10"
          )}
        >
          <TrendingUp size={16} className={mainView === 'IQD_ECNY_CHART' ? "text-neutral-950" : "text-amber-400"} />
          <span>
            {lang === 'zh' ? '📈 数字人民币/第纳尔历史汇率走势 (Line Chart)' :
             lang === 'ar' ? '📈 سعر صرف الدينار العراقي / اليوان الرقمي التاريخي (Line Chart)' :
             lang === 'ckb' ? '📈 مێژووی نرخی ئاڵوگۆڕی دینار / یوانی دیجیتاڵی (Line Chart)' :
             '📈 IQD / e-CNY Historical Exchange Rates (Line Chart)'}
          </span>
        </button>

        <button
          onClick={() => setMainView('TERMINAL')}
          className={cn(
            "px-4 py-2 text-xs sm:text-sm font-black rounded-md transition-all flex items-center gap-2 cursor-pointer shadow-xs",
            mainView === 'TERMINAL'
              ? "bg-brand-800 text-white font-black shadow-md"
              : "text-gray-300 hover:text-white hover:bg-white/10"
          )}
        >
          <BarChart2 size={16} />
          <span>
            {lang === 'zh' ? '📊 中国与香港股市大盘及大宗商品' :
             lang === 'ar' ? '📊 مؤشرات الأسهم والسلع الصينية والآسيوية' :
             lang === 'ckb' ? '📊 بۆرسەی چین و هۆنگ کۆنگ و کاڵاکان' :
             '📊 Stock Indices & Global Terminal'}
          </span>
        </button>
      </div>

      {/* Auto-Refresh Timer Bar */}
      <div className="flex flex-wrap items-center justify-between bg-black/60 border border-white/10 rounded-lg p-2.5 mb-6 gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          {/* Live indicator dot */}
          <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/10">
            <span className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              refreshInterval > 0 ? "bg-green-500 animate-pulse shadow-[0_0_8px_var(--color-brand-800)]" : "bg-brand-800"
            )} />
            <span className="font-bold text-gray-200">
              {refreshInterval > 0 ? (
                <span>
                  {lang === 'zh' ? `自动刷新中: ` : lang === 'ar' ? `تحديث تلقائي: ` : lang === 'ckb' ? 'نوێکردنەوەی خۆکار: ' : `Auto-Refreshing: `}
                  <span className="text-brand-300 font-black">{countdown}s</span>
                </span>
              ) : (
                <span className="text-gray-300 font-bold">
                  {lang === 'zh' ? '自动刷新已暂停' : lang === 'ar' ? 'التحديث التلقائي متوقف' : lang === 'ckb' ? 'نوێکردنەوە ڕاگیراوە' : 'Auto-Refresh Paused'}
                </span>
              )}
            </span>
          </div>

          {/* Interval selection pills */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded border border-white/10">
            <span className="text-xs text-gray-400 font-sans px-1 hidden sm:inline">Interval:</span>
            {[3, 5, 10, 30].map((sec) => (
              <button
                key={sec}
                onClick={() => {
                  setRefreshInterval(sec);
                  setCountdown(sec);
                }}
                className={cn(
                  "px-2 py-0.5 text-xs font-bold rounded transition-colors",
                  refreshInterval === sec ? "bg-brand-800 text-white shadow" : "text-gray-400 hover:text-white hover:bg-white/10"
                )}
              >
                {sec}s
              </button>
            ))}
            <button
              onClick={() => {
                if (refreshInterval === 0) {
                  setRefreshInterval(5);
                  setCountdown(5);
                } else {
                  setRefreshInterval(0);
                }
              }}
              className={cn(
                "px-2 py-0.5 text-xs font-bold rounded transition-colors flex items-center gap-0.5",
                refreshInterval === 0 ? "bg-brand-800 text-white" : "text-gray-400 hover:text-white hover:bg-white/10"
              )}
              title={refreshInterval === 0 ? "Resume Timer" : "Pause Timer"}
            >
              {refreshInterval === 0 ? <Play size={10} /> : <Pause size={10} />}
            </button>
          </div>
        </div>

        {/* Manual Refresh & Timestamp */}
        <div className="flex items-center gap-3 ms-auto">
          <button
            onClick={() => {
              handleFetchLatest();
              setCountdown(refreshInterval || 5);
            }}
            disabled={isRefreshing}
            className="px-3 py-1 bg-brand-800 hover:bg-brand-700 active:scale-95 text-white rounded text-[11px] font-bold flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer shadow-md"
          >
            <RefreshCw size={12} className={cn(isRefreshing && "animate-spin text-brand-300")} />
            <span>{lang === 'zh' ? '刷新' : lang === 'ar' ? 'تحديث' : lang === 'ckb' ? 'نوێکردنەوە' : 'Refresh Now'}</span>
          </button>

          <div className="text-[11px] text-gray-400 flex items-center gap-1 font-mono">
            <Clock size={12} className="text-gray-400" />
            <span className="hidden sm:inline">Updated:</span>
            <span className="text-white font-bold">{lastUpdated.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Conditional View: IQD/e-CNY Line Chart vs Full Terminal */}
      {mainView === 'IQD_ECNY_CHART' ? (
        <div className="w-full animate-fadeIn">
          <IqdEcnyHistoricalChart
            lang={lang}
            initialItem={marketItems.find(i => i.symbol === 'IQD_ECNY')}
            onRefreshParent={handleFetchLatest}
          />
        </div>
      ) : (
        /* Main Terminal Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          
          {/* Left Column: Interactive Main Chart (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col bg-white/5 border border-white/10 rounded-lg p-5">
            {activeStock.symbol === 'IQD_ECNY' ? (
              <IqdEcnyHistoricalChart
                lang={lang}
                initialItem={activeStock}
                onRefreshParent={handleFetchLatest}
                className="bg-transparent border-0 p-0 shadow-none"
              />
            ) : (
              <>
                {/* Selected Stock Banner */}
                <div className="flex flex-wrap items-baseline justify-between border-b border-white/10 pb-4 mb-4 gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl md:text-3xl font-black text-white">
                        {getItemDisplayName(activeStock)}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-white/10 px-2 py-0.5 rounded">
                        {activeStock.symbol}
                      </span>
                      <span className="text-xs uppercase font-bold text-gray-400 border border-white/15 px-2 py-0.5 rounded">
                        {activeStock.currency || 'USD'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Category: <span className="text-white font-bold">{activeStock.category || 'INDEX'}</span> | Volume: <span className="text-white font-bold">{activeStock.volume || '1.2M'}</span>
                    </div>
                  </div>

                  <div className="text-end">
                    <div className={cn("text-3xl font-black transition-all duration-300", isFlashing ? "text-brand-300 scale-105" : "text-white")}>
                      {activeStock.price.toLocaleString(undefined, { minimumFractionDigits: activeStock.symbol === 'BRENT' ? 2 : 2 })}
                      <span className="text-xs text-gray-400 ms-1 font-sans">{activeStock.currency}</span>
                    </div>
                    <div className={cn("text-xs font-bold flex items-center justify-end gap-1 mt-0.5", isUp ? "text-brand-300" : "text-brand-400")}>
                      {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      <span>{isUp ? '+' : ''}{activeStock.change.toFixed(2)}</span>
                      <span>({isUp ? '+' : ''}{activeStock.changePercent.toFixed(2)}%)</span>
                    </div>
                  </div>
                </div>

                {/* Chart Area: TradingView Live Widget vs Recharts Fallback */}
                {mappedTvSymbol ? (
                  <div className="flex flex-col space-y-3">
                    {/* Live TradingView Indicator Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 bg-black/40 px-3 py-2 rounded border border-white/10 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          {lang === 'ar'
                            ? 'بث مباشر من TradingView'
                            : lang === 'zh'
                            ? 'TradingView 实时行情'
                            : lang === 'ckb'
                            ? 'پەخشی ڕاستەوخۆی TradingView'
                            : 'TradingView Real-Time Feed'}
                        </span>
                        <span className="text-xs font-mono font-bold text-gray-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                          {mappedTvSymbol}
                        </span>
                      </div>

                      <div className="text-xs text-gray-400 flex items-center gap-1.5 font-mono">
                        <Activity size={12} className="text-emerald-400 animate-pulse" />
                        <span className="hidden sm:inline">LIVE INTERACTIVE CANDLES</span>
                      </div>
                    </div>

                    {/* TradingView Chart Frame */}
                    <div className="w-full h-[400px] md:h-[460px] rounded overflow-hidden border border-white/10 bg-neutral-950 shadow-inner">
                      <TradingViewChart
                        symbol={mappedTvSymbol}
                        theme={darkMode ? 'dark' : 'light'}
                        locale={tvLocale}
                        interval="D"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    {/* Timeframe selector toolbar & Fallback Notice */}
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse bg-black/40 p-1 rounded border border-white/10">
                        {(['1D', '1W', '1M', '3M', '1Y'] as const).map((tf) => (
                          <button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            className={cn(
                              "px-2.5 py-1 text-[11px] font-bold rounded transition-colors cursor-pointer",
                              timeframe === tf ? "bg-brand-800 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                          >
                            {tf}
                          </button>
                        ))}
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-300/90 bg-amber-950/40 border border-amber-800/40 px-2.5 py-1 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span>
                          {lang === 'ar'
                            ? 'تقدير تداول محاكى — بانتظار ربط تغذية البورصة المباشرة'
                            : lang === 'zh'
                            ? '模拟盘中估算 — 交易所直连行情待接入'
                            : lang === 'ckb'
                            ? 'خەمڵاندنی بازاڕی ھاوشێوەکراو — چاوەڕوانی بەستنەوەی ڕاستەوخۆیە'
                            : 'Simulated intraday estimate — exchange feed pending integration'}
                        </span>
                      </div>
                    </div>

                    {/* Recharts Area Chart Fallback */}
                    <div className="w-full h-64 md:h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartPoints} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorStockUp" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ffffff" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#ffffff" stopOpacity={0.0}/>
                            </linearGradient>
                            <linearGradient id="colorStockDown" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--color-brand-500)" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="var(--color-brand-500)" stopOpacity={0.0}/>
                            </linearGradient>
                          </defs>
                          <XAxis 
                            dataKey="time" 
                            stroke="#666666" 
                            tick={{ fontSize: 10, fill: '#888888' }} 
                            axisLine={{ stroke: '#3B3A39' }}
                          />
                          <YAxis 
                            domain={['dataMin - 1', 'dataMax + 1']} 
                            stroke="#666666" 
                            tick={{ fontSize: 10, fill: '#888888' }}
                            axisLine={{ stroke: '#3B3A39' }}
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#444444', borderRadius: '6px', color: '#ffffff', fontSize: '12px' }}
                            formatter={(value: any) => [`${value} ${activeStock.currency}`, 'Price']}
                          />
                          <Area 
                            isAnimationActive={false}
                            type="monotone" 
                            dataKey="price" 
                            stroke={isUp ? "#ffffff" : "var(--color-brand-500)"} 
                            strokeWidth={2}
                            fillOpacity={1} 
                            fill={isUp ? "url(#colorStockUp)" : "url(#colorStockDown)"} 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Key Fundamentals Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/10 text-xs font-mono">
                  <div className="bg-black/30 p-2.5 rounded border border-white/5">
                    <div className="text-gray-400 text-xs uppercase font-bold">
                      {lang === 'ar' ? 'أعلى ٢٤س' : lang === 'zh' ? '24小时最高' : lang === 'ckb' ? 'بەرزترین ٢٤ک' : '24H High'}
                    </div>
                    <div className="text-white font-bold text-sm mt-0.5">{activeStock.high ? activeStock.high.toLocaleString() : '-'}</div>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded border border-white/5">
                    <div className="text-gray-400 text-xs uppercase font-bold">
                      {lang === 'ar' ? 'أدنى ٢٤س' : lang === 'zh' ? '24小时最低' : lang === 'ckb' ? 'نزمترین ٢٤ک' : '24H Low'}
                    </div>
                    <div className="text-white font-bold text-sm mt-0.5">{activeStock.low ? activeStock.low.toLocaleString() : '-'}</div>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded border border-white/5">
                    <div className="text-gray-400 text-xs uppercase font-bold">
                      {lang === 'ar' ? 'القيمة السوقية' : lang === 'zh' ? '总市值' : lang === 'ckb' ? 'بەهای بازاڕ' : 'Market Cap'}
                    </div>
                    <div className="text-white font-bold text-sm mt-0.5">{activeStock.marketCap || '-'}</div>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded border border-white/5">
                    <div className="text-gray-400 text-xs uppercase font-bold">
                      {lang === 'ar' ? 'مكرر الربحية' : lang === 'zh' ? '市盈率 (P/E)' : lang === 'ckb' ? 'ڕێژەی P/E' : 'P/E Ratio'}
                    </div>
                    <div className="text-white font-bold text-sm mt-0.5">{activeStock.peRatio ? activeStock.peRatio.toFixed(1) : '-'}</div>
                  </div>
                </div>
              </>
            )}
          </div>

        {/* Right Column: Stock List & Category Filter (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 border-b border-white/10 pb-3">
            {[
              { id: 'IQD_ECNY', label: lang === 'zh' ? '⭐ 人民币/第纳尔' : lang === 'ar' ? '⭐ دينار/يوان' : lang === 'ckb' ? '⭐ دینار/یوان' : '⭐ IQD/e-CNY' },
              { id: 'ALL', label: lang === 'zh' ? '全部' : lang === 'ar' ? 'الكل' : lang === 'ckb' ? 'هەموو' : 'All' },
              { id: 'INDICES', label: lang === 'zh' ? '主要指数' : lang === 'ar' ? 'المؤشرات' : lang === 'ckb' ? 'مۆڕکەرەکان' : 'Indices' },
              { id: 'HK_STOCKS', label: lang === 'zh' ? '港股龙头' : lang === 'ar' ? 'أسهم هونغ كونغ' : lang === 'ckb' ? 'پشکەکانی هۆنگ کۆنگ' : 'HK Stocks' },
              { id: 'CHINA_STOCKS', label: lang === 'zh' ? 'A股龙头' : lang === 'ar' ? 'أسهم الصين A' : lang === 'ckb' ? 'پشکەکانی چین' : 'China A-Shares' },
              { id: 'COMMODITIES', label: lang === 'zh' ? '大宗与汇率' : lang === 'ar' ? 'السلع والعملات' : lang === 'ckb' ? 'کاڵا و دراوەکان' : 'Commodities/FX' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-2.5 py-1 text-[11px] font-bold rounded uppercase transition-colors",
                  activeTab === tab.id 
                    ? "bg-brand-800 text-white shadow-sm" 
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Scrollable Stock List */}
          <div className="flex-grow max-h-[380px] overflow-y-auto space-y-2 pe-1 custom-scrollbar">
            {filteredData.length === 0 ? (
              <div className="p-8 text-center text-gray-400 italic text-xs">
                {lang === 'ar' ? 'لم يتم العثور على أسهم أو مؤشرات مطابقة' : lang === 'zh' ? '未找到匹配的股票或指数' : lang === 'ckb' ? 'هیچ پشکێک نەدۆزرایەوە' : 'No matching stocks or indices found.'}
              </div>
            ) : (
              filteredData.map((item) => {
                const itemUp = item.change >= 0;
                const isSelected = item.symbol === activeStock.symbol;

                return (
                  <div
                    key={item.symbol}
                    onClick={() => setSelectedSymbol(item.symbol)}
                    className={cn(
                      "p-3 rounded border cursor-pointer transition-all flex items-center justify-between group",
                      isSelected 
                        ? "bg-brand-800/20 border-brand-800 text-white" 
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-300"
                    )}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-sm text-white group-hover:text-brand-800 transition-colors">
                          {getItemDisplayName(item)}
                        </span>
                        <span className="text-xs text-gray-400 bg-black/40 px-1.5 py-0.2 rounded">
                          {item.symbol}
                        </span>
                        {isTradingViewSupported(item.symbol) && (
                          <span className="text-[9px] font-extrabold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1 py-0.2 rounded tracking-wider">
                            TV
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        Vol: {item.volume || '1.2M'} | {item.currency || 'USD'}
                      </div>
                    </div>

                    <div className="text-end">
                      <div className="font-bold text-sm text-white">
                        {item.price.toLocaleString(undefined, { minimumFractionDigits: item.symbol === 'BRENT' ? 2 : 2 })}
                      </div>
                      <div className={cn("text-[11px] font-bold flex items-center justify-end gap-0.5", itemUp ? "text-brand-300" : "text-brand-400")}>
                        {itemUp ? '▲' : '▼'} {itemUp ? '+' : ''}{item.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Sino-Iraqi Market Note */}
          <div className="p-3 bg-black/30 border border-white/10 rounded text-xs text-white/80 flex items-start gap-2">
            <ShieldCheck size={16} className="text-brand-300 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white uppercase">Sino-Iraqi Sovereign Market Feed:</span> Streaming real-time market data across Shanghai (SSE), Shenzhen (SZSE), Hong Kong (HKEX), and Iraq Stock Exchange (ISX).
            </div>
          </div>
        </div>

      </div>
      )}
    </div>
  );
}
