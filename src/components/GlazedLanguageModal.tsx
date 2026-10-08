import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Check, X, ArrowRight, ArrowLeft, Sparkles
} from 'lucide-react';
import { Locale } from '../types';
import { cn } from '../lib/utils';

export interface GlazedLanguageModalProps {
  lang: Locale;
  className?: string;
  triggerOnly?: boolean;
}

export interface LanguageOption {
  code: Locale;
  label: string;
  native: string;
  scriptMotif: string;
  region: string;
  description: string;
}

export const GLOBAL_LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: 'en',
    label: 'English',
    native: 'English',
    scriptMotif: 'A',
    region: 'International Intelligence & Diplomacy',
    description: 'Comprehensive geopolitical briefings, sovereign trade, and energy corridor intelligence.',
  },
  {
    code: 'ar',
    label: 'Arabic',
    native: 'العربية',
    scriptMotif: 'أ',
    region: 'العراق والشرق الأوسط',
    description: 'الأخبار الدبلوماسية، التبادل التجاري والمشاريع الاستراتيجية بين بغداد وبكين.',
  },
  {
    code: 'zh',
    label: 'Mandarin Chinese',
    native: '中文',
    scriptMotif: '中',
    region: '中国与一带一路走廊',
    description: '中伊经贸通报、双边投资政策与国际智库深度政策分析。',
  },
  {
    code: 'ckb',
    label: 'Central Kurdish',
    native: 'کوردی (سۆرانی)',
    scriptMotif: 'ک',
    region: 'هەرێمی کوردستان',
    description: 'هەواڵ و شیکاری ستراتیژی بۆ بازرگانی و پڕۆژە هاوبەشەکان لە هەرێمی کوردستان.',
  },
];

const CARD_I18N: Record<Locale, {
  badge: string;
  eyebrow: string;
  headline: string;
  desc: string;
  setDefault: string;
  skip: string;
  confirm: string;
  previewBadge: string;
  closeAria: string;
}> = {
  en: {
    badge: 'GLOBAL LANGUAGE PROGRAM',
    eyebrow: 'GLOBAL LANGUAGE',
    headline: 'Choose the language you read in.',
    desc: 'The ICA ecosystem renders in English, Arabic, Mandarin Chinese, and Central Kurdish. Click any language to preview immediately across the entire portal.',
    setDefault: 'Set as default for future visits',
    skip: 'Skip for now',
    confirm: 'Confirm Language & Continue',
    previewBadge: 'Active Preview',
    closeAria: 'Close modal'
  },
  ar: {
    badge: 'برنامج اللغات العالمي',
    eyebrow: 'اللغة العالمية',
    headline: 'اختر اللغة التي تفضل القراءة بها.',
    desc: 'تدعم منصة الوكالة العراقية الصينية اللغات العربية، والإنجليزية، والصينية، والكردية. انقر على أي لغة للمعاينة الفورية عبر كامل البوابة.',
    setDefault: 'تعيين كلغة افتراضية للزيارات القادمة',
    skip: 'تخطي الآن',
    confirm: 'تأكيد اللغة والمتابعة',
    previewBadge: 'معاينة نشطة',
    closeAria: 'إغلاق النافذة'
  },
  zh: {
    badge: '全球多语言接入计划',
    eyebrow: '全球语言',
    headline: '选择您阅读的语言',
    desc: '伊中官方多边门户完整支持中文、阿拉伯语、英语与库尔德语。点击任意语言即可对全站即时预览。',
    setDefault: '设为今后默认访问语言',
    skip: '暂时跳过',
    confirm: '确认语言并继续',
    previewBadge: '即时预览',
    closeAria: '关闭窗口'
  },
  ckb: {
    badge: 'بەرنامەی زمانی جیهانی',
    eyebrow: 'زمانی جیهانی',
    headline: 'ئەو زمانە هەڵبژێرە کە دەتەوێت بیخوێنیتەوە.',
    desc: 'پۆڕتاڵی فەرمی عێراق-چین پشتگیری لە زمانی کوردی، عەرەبی، ئینگلیزی و چینی دەکات. کلیک بکە بۆ پێشبینینی ڕاستەوخۆی تەواوی پۆڕتاڵەکە.',
    setDefault: 'وەک زمانی سەرەکی دیاریبکە بۆ سەردانەکانی داهاتوو',
    skip: 'تێپەڕاندن بۆ ئێستا',
    confirm: 'پەسەندکردنی زمان و بەردەوامبوون',
    previewBadge: 'پێشبینینی چالاک',
    closeAria: 'داخستنی پەنجەرە'
  }
};

// Universal helper to trigger opening the welcoming language modal from anywhere in the app
export function openGlobalLanguageModal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ica:open-global-language-card'));
  }
}

export function GlazedLanguageModal({ lang, className, triggerOnly = false }: GlazedLanguageModalProps) {
  // Instant synchronous initialization to eradicate late preview lag
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const isWelcomeFlag = searchParams.get('welcome') === '1' || searchParams.has('welcome');
      const hasChosen = localStorage.getItem('ica_global_language_selected');
      const hasDismissed = sessionStorage.getItem('ica_global_language_dismissed');

      if (isWelcomeFlag) return true;
      if (!hasChosen && !hasDismissed) return true;
      return false;
    } catch {
      return false;
    }
  });

  const [selectedLocale, setSelectedLocale] = useState<Locale>(lang);
  const [setAsDefault, setSetAsDefault] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Synchronize internal selection with active route prop
  useEffect(() => {
    setSelectedLocale(lang);
  }, [lang]);

  // Welcoming entrance experience: reactive URL query check for on-demand deep-links
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const isWelcomeFlag = searchParams.get('welcome') === '1' || searchParams.has('welcome');
      const hasChosen = localStorage.getItem('ica_global_language_selected');
      const hasDismissed = sessionStorage.getItem('ica_global_language_dismissed');

      if (isWelcomeFlag || (!hasChosen && !hasDismissed)) {
        setIsOpen(true);
      }
    } catch {
      setIsOpen(true);
    }
  }, [location.search]);

  // Listen to global open requests from Header diplomatic band, Command Hub, or bottom nav
  useEffect(() => {
    const handleGlobalOpen = () => {
      setSelectedLocale(lang);
      setIsOpen(true);
    };
    window.addEventListener('ica:open-global-language-card', handleGlobalOpen);
    return () => window.removeEventListener('ica:open-global-language-card', handleGlobalOpen);
  }, [lang]);

  // Handle Keyboard Shortcuts (Escape to close)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleDismiss = () => {
    try {
      sessionStorage.setItem('ica_global_language_dismissed', 'true');
    } catch {}

    // Clean welcome query flag from URL upon dismissal
    if (location.search.includes('welcome')) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.delete('welcome');
      const searchStr = searchParams.toString() ? `?${searchParams.toString()}` : '';
      navigate(`${location.pathname}${searchStr}${location.hash}`, { replace: true });
    }

    setIsOpen(false);
  };

  // Instant direct routing & preview when a language option or motif is clicked
  const handleSelectAndPreview = (targetLoc: Locale) => {
    setSelectedLocale(targetLoc);

    // Apply document attributes instantly so text direction (RTL/LTR) updates without reload
    try {
      document.documentElement.lang = targetLoc;
      document.documentElement.dir = (targetLoc === 'ar' || targetLoc === 'ckb') ? 'rtl' : 'ltr';
      localStorage.setItem('ica_lang', targetLoc);
      document.cookie = `ica_lang=${targetLoc}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {}

    // Route directly and preview the application behind the card
    const currentPath = location.pathname;
    const localeRegex = /^\/(en|ar|zh|ckb)(\/.*)?$/;
    const match = currentPath.match(localeRegex);
    let targetPath = `/${targetLoc}`;
    if (match) {
      const rest = match[2] || '';
      targetPath = `/${targetLoc}${rest}`;
    } else {
      const trimmed = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
      targetPath = `/${targetLoc}${trimmed === '/' ? '' : trimmed}`;
    }

    // Keep welcome parameter active while modal is open so card remains mounted during preview
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('welcome', '1');
    const searchStr = `?${searchParams.toString()}`;

    navigate(`${targetPath}${searchStr}${location.hash}`, { replace: true });
  };

  // Final confirmation: commits settings, removes welcome parameter, and closes card
  const handleConfirmLanguage = (targetLoc?: Locale) => {
    const locToApply = targetLoc || selectedLocale;

    try {
      if (setAsDefault) {
        localStorage.setItem('ica_lang', locToApply);
        localStorage.setItem('ica_global_language_selected', 'true');
        document.cookie = `ica_lang=${locToApply}; path=/; max-age=31536000; SameSite=Lax`;
      }
      sessionStorage.setItem('ica_global_language_dismissed', 'true');
      document.documentElement.lang = locToApply;
      document.documentElement.dir = (locToApply === 'ar' || locToApply === 'ckb') ? 'rtl' : 'ltr';
    } catch {}

    const currentPath = location.pathname;
    const localeRegex = /^\/(en|ar|zh|ckb)(\/.*)?$/;
    const match = currentPath.match(localeRegex);
    let targetPath = `/${locToApply}`;
    if (match) {
      const rest = match[2] || '';
      targetPath = `/${locToApply}${rest}`;
    } else {
      const trimmed = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
      targetPath = `/${locToApply}${trimmed === '/' ? '' : trimmed}`;
    }

    // Remove welcome param on final confirmation
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('welcome');
    const searchStr = searchParams.toString() ? `?${searchParams.toString()}` : '';

    navigate(`${targetPath}${searchStr}${location.hash}`, { replace: true });
    setIsOpen(false);
  };

  const tCard = CARD_I18N[selectedLocale] || CARD_I18N.en;
  const isSelectedRtl = selectedLocale === 'ar' || selectedLocale === 'ckb';

  return (
    <>
      {/* Optional Trigger Button for header or embedded placement */}
      {!triggerOnly && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setSelectedLocale(lang); setIsOpen(true); }}
          title="Choose Global Language"
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full",
            "bg-red-600 hover:bg-red-700 text-white font-black text-[11px] uppercase tracking-wider",
            "shadow-sm transition-all cursor-pointer border border-red-500/40",
            className
          )}
        >
          <Globe size={13} className="text-white" />
          <span>{lang.toUpperCase()}</span>
        </button>
      )}

      {/* Global Language Selection Card Modal */}
      <AnimatePresence>
        {isOpen && createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Frosted Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={handleDismiss}
              className="fixed inset-0 bg-neutral-950/70 backdrop-blur-md z-10"
            />

            {/* Global Language Selection Card: Clean White Card with Bounded Red Shapes */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              onClick={(e) => e.stopPropagation()}
              dir={isSelectedRtl ? 'rtl' : 'ltr'}
              className={cn(
                "relative z-20 w-full max-w-[540px]",
                "rounded-3xl bg-white text-neutral-900",
                "shadow-2xl border border-neutral-100",
                "overflow-hidden flex flex-col my-auto pointer-events-auto"
              )}
            >
              {/* Hero Visual Area: Bounded Clean Red Shape with White Font */}
              <div className="relative bg-gradient-to-br from-red-600 via-red-600 to-red-700 text-white p-6 pb-7 m-3.5 rounded-2xl shadow-md overflow-hidden">
                {/* Decorative subtle texture */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:16px_16px]" />

                {/* Top Row: Promotional Badge + Close Button */}
                <div className="flex items-center justify-between relative z-10 mb-4">
                  {/* Promotional Badge: White font inside clean bounded shape */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-white/20 text-white border border-white/30 backdrop-blur-xs tracking-wider uppercase">
                    <Sparkles size={12} className="text-white" />
                    <span>{tCard.badge}</span>
                  </div>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={handleDismiss}
                    aria-label={tCard.closeAria}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors border border-white/30 cursor-pointer shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Hero Visual Area: 4 National/Script Motifs Side-by-Side (Fully Interactive) */}
                <div className="flex items-center justify-center gap-3 py-2 relative z-10">
                  {GLOBAL_LANGUAGE_OPTIONS.map((item) => {
                    const isSelected = selectedLocale === item.code;
                    return (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => handleSelectAndPreview(item.code)}
                        className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all cursor-pointer shadow-sm select-none",
                          isSelected
                            ? "bg-white text-red-600 shadow-xl ring-4 ring-white/50 scale-105"
                            : "bg-red-700/70 hover:bg-red-700 text-white border border-white/25 hover:border-white/40"
                        )}
                        title={`Click to preview ${item.label} (${item.native})`}
                      >
                        {item.scriptMotif}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card Body Content */}
              <div className="p-6 pt-3 space-y-5 bg-white text-center">
                {/* Eyebrow Label: White font inside bounded clean red shape */}
                <div className="space-y-2">
                  <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black tracking-widest uppercase shadow-xs">
                    {tCard.eyebrow}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                    {tCard.headline}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                    {tCard.desc}
                  </p>
                </div>

                {/* Four Interactive Language Option Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-start">
                  {GLOBAL_LANGUAGE_OPTIONS.map((item) => {
                    const isSelected = selectedLocale === item.code;
                    return (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => handleSelectAndPreview(item.code)}
                        className={cn(
                          "relative rounded-2xl p-3.5 transition-all cursor-pointer flex flex-col justify-between border-2 select-none text-start w-full",
                          isSelected
                            ? "border-red-600 bg-red-600 text-white shadow-md ring-2 ring-red-600/30"
                            : "border-neutral-200 bg-neutral-50 hover:bg-white hover:border-red-300 text-neutral-900"
                        )}
                      >
                        <div className="flex items-center justify-between mb-2 w-full gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {/* Script Motif badge */}
                            <span 
                              className={cn(
                                "w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center shadow-xs shrink-0",
                                isSelected
                                  ? "bg-white text-red-600"
                                  : "bg-red-600 text-white"
                              )}
                            >
                              {item.scriptMotif}
                            </span>
                            <span className={cn("text-sm font-black tracking-tight truncate", isSelected ? "text-white" : "text-neutral-900")}>
                              {item.native}
                            </span>
                          </div>
                          
                          {/* Live preview / Selection indicator */}
                          {isSelected ? (
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-[9px] bg-white text-red-600 px-1.5 py-0.5 rounded-md font-black uppercase tracking-wider">
                                {tCard.previewBadge}
                              </span>
                              <div className="w-5 h-5 rounded-full bg-white text-red-600 flex items-center justify-center shadow-xs shrink-0">
                                <Check size={12} strokeWidth={3} />
                              </div>
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-neutral-300 shrink-0" />
                          )}
                        </div>

                        <div className={cn("text-[11px] font-medium line-clamp-1", isSelected ? "text-red-100" : "text-neutral-500")}>
                          {item.label} • {item.region}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Default Visit Toggle & Skip Link */}
                <div className="flex items-center justify-between text-xs pt-1 px-1">
                  <label className="flex items-center gap-2 text-neutral-700 cursor-pointer font-semibold">
                    <input
                      type="checkbox"
                      checked={setAsDefault}
                      onChange={e => setSetAsDefault(e.target.checked)}
                      className="w-4 h-4 rounded border-neutral-300 text-red-600 focus:ring-red-600 cursor-pointer accent-red-600"
                    />
                    <span>{tCard.setDefault}</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="text-neutral-500 hover:text-neutral-900 underline font-semibold cursor-pointer"
                  >
                    {tCard.skip}
                  </button>
                </div>

                {/* Primary CTA Button: Bounded Clean Red Shape with White Font */}
                <button
                  type="button"
                  onClick={() => handleConfirmLanguage()}
                  className={cn(
                    "w-full bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white",
                    "py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider",
                    "shadow-lg hover:shadow-red-600/25 transition-all cursor-pointer",
                    "flex items-center justify-center gap-2"
                  )}
                >
                  <span>{tCard.confirm}</span>
                  {isSelectedRtl ? (
                    <ArrowLeft size={16} className="text-white" />
                  ) : (
                    <ArrowRight size={16} className="text-white" />
                  )}
                </button>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
      </AnimatePresence>
    </>
  );
}
