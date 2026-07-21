import { useState, useRef, useEffect } from 'react';
import { Locale } from '../types';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { Globe, ChevronDown, Check } from 'lucide-react';

const languages = [
  { code: 'en' as Locale, label: 'English', native: 'English' },
  { code: 'ar' as Locale, label: 'العربية', native: 'Arabic' },
  { code: 'ckb' as Locale, label: 'کوردی', native: 'Kurdish' },
  { code: 'zh' as Locale, label: '中文', native: 'Chinese' },
];

export function LanguageSwitcher({ lang }: { lang: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  const currentLangObj = languages.find(l => l.code === lang) || languages[0];

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      {/* Single Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white hover:bg-neutral-50 border border-[#111111]/30 px-3 py-1.5 rounded-sm shadow-xs transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#990000]/40 group"
        title="Select Language"
      >
        <Globe className="w-4 h-4 text-[#990000] shrink-0 group-hover:scale-110 transition-transform" />
        <span className="text-[12px] font-black text-[#111111] tracking-tight">
          {currentLangObj.label}
        </span>
        <ChevronDown className={cn("w-3.5 h-3.5 text-[#111111]/60 transition-transform duration-200 shrink-0", isOpen && "rotate-180 text-[#990000]")} />
      </button>

      {/* Vertical Flow Menu */}
      {isOpen && (
        <div className="absolute left-0 rtl:right-0 rtl:left-auto top-full mt-1.5 w-36 bg-white border-2 border-[#111111] shadow-2xl rounded-xs p-1 z-[100] flex flex-col gap-0.5 divide-y divide-neutral-100 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-2 py-1 text-[9px] font-mono font-bold uppercase tracking-wider text-[#990000] border-b border-neutral-100">
            Languages
          </div>
          {languages.map((item) => {
            const isActive = lang === item.code;
            return (
              <button
                key={item.code}
                onClick={() => handleLangChange(item.code)}
                className={cn(
                  "w-full text-left rtl:text-right px-2.5 py-1.5 text-[12px] font-bold rounded-xs transition-colors flex items-center justify-between cursor-pointer group",
                  isActive
                    ? "bg-[#990000] text-white font-black"
                    : "text-[#111111] hover:bg-[#990000]/10 hover:text-[#990000]"
                )}
              >
                <div className="flex flex-col">
                  <span>{item.label}</span>
                </div>
                {isActive && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

