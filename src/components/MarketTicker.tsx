import { useEffect, useState } from 'react';
import { MarketData, Locale } from '../types';
import { cn } from '../lib/utils';
import { BarChart2, TrendingUp, ChevronDown, ChevronUp, Layers, Activity } from 'lucide-react';
import { MarketIndicesSection } from './MarketIndicesSection';

export function MarketTicker({ lang }: { lang: Locale }) {
  const [data, setData] = useState<MarketData[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'INDEX' | 'STOCKS' | 'COMMODITY'>('ALL');

  useEffect(() => {
    // Initial direct fetch
    fetch('/api/market')
      .then(res => res.json())
      .then(items => {
        if (Array.isArray(items) && items.length > 0) {
          setData(items);
        }
      })
      .catch(() => {});

    const eventSource = new EventSource('/api/market/stream');
    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        if (Array.isArray(parsed)) {
          setData(parsed);
        }
      } catch (e: any) {
        console.error("Error parsing market data SSE stream", e);
      }
    };
    return () => {
      eventSource.close();
    };
  }, []);

  const displayData = data.filter(item => {
    if (filterCategory === 'INDEX') return item.category === 'INDEX';
    if (filterCategory === 'STOCKS') return item.category === 'HK_STOCK' || item.category === 'CHINA_STOCK';
    if (filterCategory === 'COMMODITY') return item.category === 'COMMODITY' || item.category === 'FOREX';
    return true;
  });

  const getItemLabel = (item: MarketData) => {
    if (lang === 'zh' && item.nameZh) return item.nameZh;
    if (lang === 'ar' && item.nameAr) return item.nameAr;
    return item.name || item.symbol;
  };

  return (
    <div className="w-full bg-[#111111] text-white border-b border-[#990000]/40 max-w-[1024px] mx-auto relative z-10 transition-all duration-300">
      
      {/* Ticker Bar */}
      <div className="h-10 flex items-center justify-between px-4 text-[11px] font-mono tracking-wider overflow-hidden">
        
        {/* Left Live Indicator & Category Filter Toggles */}
        <div className="flex items-center gap-3 shrink-0 pe-3 border-e border-white/15">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 font-sans font-black text-gray-300 hover:text-white uppercase tracking-wider bg-white/10 px-2 py-1 rounded transition-colors cursor-pointer"
          >
            <Activity size={14} className="animate-pulse text-gray-400" />
            <span>{lang === 'ar' ? 'المؤشرات والأسهم' : lang === 'zh' ? '股市行情' : 'Indices & Stocks'}</span>
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {/* Quick Category Filters */}
          <div className="hidden sm:flex items-center space-x-1 rtl:space-x-reverse text-[10px]">
            <button
              onClick={() => setFilterCategory('ALL')}
              className={cn("px-1.5 py-0.5 rounded transition-colors", filterCategory === 'ALL' ? "bg-white/20 text-white font-bold" : "text-gray-400 hover:text-white")}
            >
              All
            </button>
            <button
              onClick={() => setFilterCategory('INDEX')}
              className={cn("px-1.5 py-0.5 rounded transition-colors", filterCategory === 'INDEX' ? "bg-white/20 text-white font-bold" : "text-gray-400 hover:text-white")}
            >
              Indices
            </button>
            <button
              onClick={() => setFilterCategory('STOCKS')}
              className={cn("px-1.5 py-0.5 rounded transition-colors", filterCategory === 'STOCKS' ? "bg-white/20 text-white font-bold" : "text-gray-400 hover:text-white")}
            >
              China/HK Stocks
            </button>
          </div>
        </div>

        {/* Scrolling / Sliding Live Ticker Items */}
        <div className="flex-grow overflow-x-auto no-scrollbar whitespace-nowrap px-3 flex items-center space-x-6 rtl:space-x-reverse">
          {displayData.map((item, index) => {
            const isUp = item.change >= 0;
            return (
              <div 
                key={item.id || item.symbol} 
                onClick={() => setIsExpanded(true)}
                className="flex items-center shrink-0 cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors group"
                title="Click to view interactive stock chart"
              >
                <span className="text-[9px] font-bold text-gray-400 group-hover:text-white me-1.5 uppercase">
                  {item.symbol}
                </span>
                <span className="text-gray-300 font-sans font-medium text-[11px] me-1.5 max-w-[120px] truncate">
                  {getItemLabel(item)}
                </span>
                <span className="font-bold font-mono text-white me-1.5">
                  {item.price.toLocaleString(undefined, { minimumFractionDigits: item.symbol === 'BRENT' ? 2 : 2 })}
                </span>
                <span className={cn("font-bold flex items-center gap-0.5 text-[10px]", isUp ? "text-emerald-400" : "text-rose-400")}>
                  {isUp ? '▲' : '▼'} {isUp ? '+' : ''}{item.changePercent.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Right CTA Button to open chart terminal */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="shrink-0 font-sans font-bold text-[10px] uppercase tracking-wider bg-[#990000] hover:bg-red-700 text-white px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors cursor-pointer ms-2"
        >
          <BarChart2 size={13} />
          <span className="hidden md:inline">{lang === 'zh' ? '股票图表' : lang === 'ar' ? 'رسوم بيانية' : 'Stock Charts'}</span>
        </button>
      </div>

      {/* Expandable Charts & Terminal Drawer */}
      {isExpanded && (
        <div className="p-2 sm:p-4 bg-black border-t border-white/10 animate-fadeIn">
          <MarketIndicesSection 
            data={data} 
            lang={lang} 
            onClose={() => setIsExpanded(false)} 
            isModal={false}
          />
        </div>
      )}
    </div>
  );
}
