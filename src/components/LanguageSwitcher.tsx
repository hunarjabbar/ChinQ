import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Locale } from '../types';
import { Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface LanguageSwitcherProps {
  lang?: Locale;
}

export function LanguageSwitcher({ lang: propLang }: LanguageSwitcherProps) {
  const { lang: urlLang = 'en' } = useParams<{ lang: string }>();
  const lang = propLang || (urlLang as Locale);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const languages: { code: Locale; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ar', label: 'Arabic', native: 'العربية' },
    { code: 'zh', label: 'Chinese', native: '中文' },
    { code: 'ckb', label: 'Kurdish', native: 'کوردی' },
  ];

  const handleLanguageChange = (newLang: Locale) => {
    try {
      document.cookie = `ica_lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem('ica_lang', newLang);
      document.documentElement.lang = newLang;
      document.documentElement.dir = (newLang === 'ar' || newLang === 'ckb') ? 'rtl' : 'ltr';
    } catch {}

    const currentPath = location.pathname;
    const pathParts = currentPath.split('/');
    pathParts[1] = newLang; // Replace the language part
    const newPath = pathParts.join('/');
    
    // Preserve scroll position
    const scrollPos = window.scrollY;
    navigate(newPath + location.search + location.hash);
    
    setTimeout(() => {
      window.scrollTo(0, scrollPos);
    }, 0);
    
    setIsOpen(false);
  };

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Switch language"
        className="h-11 flex items-center gap-2 px-3 sm:px-3.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-neutral-300 hover:text-white transition-all group focus-visible:ring-2 focus-visible:ring-[#D97706]"
      >
        <Globe size={15} className="text-[#D97706] shrink-0" />
        <span className="text-[10px] font-black uppercase tracking-widest text-white">{currentLang.code}</span>
        <ChevronDown size={13} className={cn("text-neutral-400 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-2 w-48 bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-2 space-y-1">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => handleLanguageChange(l.code)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
                      lang === l.code ? "bg-[#0284C7] text-white" : "hover:bg-white/5 text-neutral-400 hover:text-white"
                    )}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] font-black uppercase tracking-widest">{l.label}</span>
                      <span className="text-[9px] font-bold opacity-60">{l.native}</span>
                    </div>
                    {lang === l.code && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FloatingLanguageSwitcher({ lang: propLang }: LanguageSwitcherProps) {
  const { lang: urlLang = 'en' } = useParams<{ lang: string }>();
  const lang = (propLang || urlLang) as Locale;
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const languages = [
    { code: 'en' as Locale, label: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'ar' as Locale, label: 'العربية', native: 'Arabic', flag: '🇮🇶' },
    { code: 'ckb' as Locale, label: 'کوردی', native: 'Kurdish', flag: '🇹🇯' },
    { code: 'zh' as Locale, label: '中文', native: 'Chinese', flag: '🇨🇳' },
  ];

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLangChange = (newLang: string) => {
    if (newLang === lang) {
      setIsOpen(false);
      return;
    }
    try {
      document.cookie = `ica_lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem('ica_lang', newLang);
      document.documentElement.lang = newLang;
      document.documentElement.dir = (newLang === 'ar' || newLang === 'ckb') ? 'rtl' : 'ltr';
    } catch {}

    const currentPath = location.pathname;
    const pathParts = currentPath.split('/');
    pathParts[1] = newLang;
    const targetPath = pathParts.join('/');
    
    navigate(targetPath + location.search + location.hash);
    setIsOpen(false);
  };

  const currentLangObj = languages.find(l => l.code === lang) || languages[0];

  return (
    <div className="relative inline-block text-start z-50" ref={dropdownRef}>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-800 to-rose-600 rounded-xl blur-xs opacity-40 group-hover:opacity-80 transition duration-300"></div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center gap-2 bg-white/95 dark:bg-neutral-900/95 hover:bg-white dark:hover:bg-neutral-900 border border-brand-800/40 dark:border-brand-500/40 px-3 py-2.5 transition-all cursor-pointer rounded-xl shadow-md text-brand-900 dark:text-neutral-100 min-h-[44px]"
        >
          <span className="text-sm">{currentLangObj.flag}</span>
          <Globe className="w-3.5 h-3.5 text-brand-800 dark:text-brand-400 shrink-0" />
          <span className="text-[10px] font-black tracking-wider uppercase">
            {currentLangObj.code}
          </span>
          <ChevronDown className={cn("w-3 h-3 text-neutral-400 transition-transform duration-300 shrink-0", isOpen && "rotate-180")} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute end-0 rtl:start-auto top-full mt-2 w-52 max-w-[calc(100vw-2rem)] bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700 shadow-2xl rounded-xl p-2 z-[120] flex flex-col gap-1 text-start"
          >
            {languages.map((item) => {
              const isActive = lang === item.code;
              return (
                <button
                  key={item.code}
                  onClick={() => handleLangChange(item.code)}
                  className={cn(
                    "w-full text-start px-3.5 py-2.5 text-xs font-bold transition-all flex items-center justify-between cursor-pointer rounded-lg group",
                    isActive
                      ? "bg-brand-800 text-white shadow-sm"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-brand-900 dark:hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">{item.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-black tracking-wide">{item.label}</span>
                      <span className="text-[9px] opacity-75">{item.native}</span>
                    </div>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
