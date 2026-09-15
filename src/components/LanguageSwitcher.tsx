import { useState, useRef, useEffect } from 'react';
import { Locale } from '../types';
import { cn } from '../lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { Globe, ChevronDown, Check, Sparkles } from 'lucide-react';
import { GlazedLanguageModal } from './GlazedLanguageModal';
import { useI18n } from '../hooks/useI18n';

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
  const location = useLocation();
  const { t } = useI18n(lang);

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
    const currentPath = location.pathname;
    const match = currentPath.match(/^\/(en|ar|zh|ckb)(\/.*)?$/);
    let targetPath = `/${newLang}`;
    if (match && match[2]) {
      targetPath = `/${newLang}${match[2]}`;
    }
    navigate(targetPath);
    setIsOpen(false);
  };

  const currentLangObj = languages.find(l => l.code === lang) || languages[0];

  return (
    <div className="relative inline-block text-start z-50" ref={dropdownRef}>
      {/* Single Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-neutral-50 dark:bg-neutral-800 hover:bg-white dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 hover:border-ink-900 dark:hover:border-neutral-500 px-3 py-1.5 transition-all cursor-pointer focus:outline-none group rounded-md"
        title="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-brand-900 dark:text-neutral-200 shrink-0 group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors" />
        <span className="text-xs font-black text-brand-900 dark:text-neutral-200 tracking-[0.1em] uppercase">
          {currentLangObj.label}
        </span>
        <ChevronDown className={cn("w-3 h-3 text-neutral-400 transition-transform duration-300 shrink-0", isOpen && "rotate-180")} />
        
        {/* Red Dot Trigger Inside the Button */}
        <GlazedLanguageModal lang={lang} className="ms-1" />
      </button>

      {/* Vertical Flow Menu */}
      {isOpen && (
        <div className="absolute end-0 rtl:start-auto top-full mt-2 w-48 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-xl rounded-md p-1.5 z-[100] flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200 text-start">
          <div className="px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-neutral-400 border-b border-neutral-100 dark:border-neutral-700/60 mb-1 flex items-center justify-between">
            <span>{t('regionalNode')}</span>
            <span className="text-[8px] text-brand-700 dark:text-brand-400">{t('dialects')}</span>
          </div>
          {languages.map((item) => {
            const isActive = lang === item.code;
            return (
              <button
                key={item.code}
                onClick={() => handleLangChange(item.code)}
                className={cn(
                  "w-full text-start px-3 py-2 text-[11px] font-bold transition-all flex items-center justify-between cursor-pointer rounded group",
                  isActive
                    ? "bg-ink-900 dark:bg-brand-700 text-white"
                    : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:text-brand-900 dark:hover:text-white"
                )}
              >
                <span>{item.label}</span>
                {isActive && <Check className="w-3 h-3 text-white shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}


