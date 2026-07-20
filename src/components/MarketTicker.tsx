import { useEffect, useState, useRef } from 'react';
import { MarketData, Locale } from '../types';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en' as Locale, label: 'English' },
  { code: 'ar' as Locale, label: 'العربية' },
  { code: 'ckb' as Locale, label: 'کوردی' },
  { code: 'zh' as Locale, label: '中文' },
];

export function MarketTicker({ lang }: { lang: Locale }) {
  const [data, setData] = useState<MarketData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const eventSource = new EventSource('/api/market/stream');

    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setData(parsed);
      } catch (e) {
        console.error("Error parsing market data", e);
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLangChange = (newLang: string) => {
    navigate(`/${newLang}`);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(l => l.code === lang) || languages[0];

  return (
    <div className="h-10 border-b border-[#111111]/20 flex items-center justify-between px-6 text-[11px] font-medium tracking-wider bg-white max-w-[1024px] mx-auto w-full relative">
      <div className="flex items-center space-x-6 rtl:space-x-reverse overflow-x-auto no-scrollbar whitespace-nowrap">
        <div className="flex items-center">
          <span className="text-[#990000] font-bold me-2 uppercase">Live</span>
          {data.map((item, index) => (
            <div key={item.id} className={cn("flex items-center", index > 0 && "border-s border-gray-200 ps-6 ms-6")}>
              <span className="opacity-60 uppercase">{item.name}</span>
              <span className="ms-2 font-bold">{item.price.toFixed(item.symbol === 'BRENT' ? 2 : 4)}</span>
              <span className={cn("ms-1", item.change >= 0 ? "text-green-600" : "text-red-600")}>
                {item.change >= 0 ? '▲' : '▼'} {item.changePercent.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Unified Language Switcher */}
      <div className="relative shrink-0 z-50" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1.5 rtl:space-x-reverse hover:text-[#990000] transition-colors focus:outline-none cursor-pointer border border-[#111111]/15 px-2.5 py-1 bg-[#FAFAFA] hover:bg-neutral-50 rounded-xs font-bold"
        >
          <Globe className="w-3 h-3 text-[#990000]" />
          <span>{currentLanguage.label}</span>
          <ChevronDown className={cn("w-3 h-3 opacity-60 transition-transform duration-200", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
          <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-1 w-28 bg-[#FAFAFA] border border-[#111111]/20 shadow-lg py-1 rounded-xs">
            {languages.map((item) => (
              <button
                key={item.code}
                onClick={() => handleLangChange(item.code)}
                className={cn(
                  "w-full text-start px-3 py-1.5 hover:bg-[#990000] hover:text-white transition-colors cursor-pointer text-[10px] font-bold block",
                  lang === item.code ? "text-[#990000] bg-neutral-100" : "text-[#111111]/80"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
