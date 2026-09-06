import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Globe, Clock, Pause, Play, Check, X, Pin, PinOff, 
  ArrowRight, ShieldCheck, Zap
} from 'lucide-react';
import { Locale } from '../types';
import { cn } from '../lib/utils';

interface GlazedLanguageModalProps {
  lang: Locale;
  className?: string;
}

interface LanguageOption {
  code: Locale;
  label: string;
  native: string;
  dialectTitle: string;
  regionBadge: string;
  flagEmblem: string;
  description: string;
  keyNumber: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: 'ar',
    label: 'Arabic',
    native: 'العربية',
    dialectTitle: 'الطبعة العربية المعتمدة',
    regionBadge: 'العراق والشرق الأوسط',
    flagEmblem: '🇮🇶',
    description: 'الأخبار الدبلوماسية، التبادل التجاري والمشاريع الاستراتيجية',
    keyNumber: '1',
  },
  {
    code: 'zh',
    label: 'Chinese',
    native: '中文 (简体)',
    dialectTitle: '中文国际经贸版',
    regionBadge: '中国与一带一路走廊',
    flagEmblem: '🇨🇳',
    description: '中伊经贸通报、双边投资政策与国际智库深度分析',
    keyNumber: '2',
  },
  {
    code: 'ckb',
    label: 'Kurdish',
    native: 'کوردی (سۆرانی)',
    dialectTitle: 'وەشانی کوردی فەرمی',
    regionBadge: 'هەرێمی کوردستان و بەغدا',
    flagEmblem: '☀️',
    description: 'هەواڵ و شیکاری ستراتیژی بۆ بازرگانی و پڕۆژە هاوبەشەکان',
    keyNumber: '3',
  },
  {
    code: 'en',
    label: 'English',
    native: 'English',
    dialectTitle: 'Global Diplomatic Edition',
    regionBadge: 'International Intelligence',
    flagEmblem: '🌐',
    description: 'Comprehensive geopolitical briefings, sovereign trade, and energy',
    keyNumber: '4',
  },
];

export function GlazedLanguageModal({ lang, className }: GlazedLanguageModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2000); // 2 seconds in milliseconds
  const [isPaused, setIsPaused] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const TOTAL_DURATION = 8000;

  // Auto-discovery: open for 8 seconds on first user visit in session
  useEffect(() => {
    try {
      const hasSeenPrompt = sessionStorage.getItem('ica_glaze_lang_prompt_seen_8s');
      if (!hasSeenPrompt) {
        sessionStorage.setItem('ica_glaze_lang_prompt_seen_8s', 'true');
        const initialTimer = setTimeout(() => {
          setIsOpen(true);
          setTimeLeft(TOTAL_DURATION);
          setIsPaused(false);
        }, 1200);
        return () => clearTimeout(initialTimer);
      }
    } catch {}
  }, []);

  // 2-Second Countdown Interval (ticking every 50ms)
  useEffect(() => {
    if (!isOpen || isPaused || isPinned) return;

    const interval = 50;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= interval) {
          clearInterval(timer);
          setIsOpen(false);
          return 0;
        }
        return prev - interval;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, isPaused, isPinned]);

  // Handle Keyboard Shortcuts (1, 2, 3, 4 to switch, Esc to close)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === '1') {
        handleSelectLanguage('ar');
      } else if (e.key === '2') {
        handleSelectLanguage('zh');
      } else if (e.key === '3') {
        handleSelectLanguage('ckb');
      } else if (e.key === '4') {
        handleSelectLanguage('en');
      } else if (e.key === ' ' || e.key === 'p') {
        // Space or P to pause/unpause
        setIsPaused((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, location.pathname]);

  // Click outside to dismiss
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current && 
        !modalRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleOpen = () => {
    setTimeLeft(TOTAL_DURATION);
    setIsPaused(false);
    setIsPinned(false);
    setIsOpen(true);
  };

  const handleSelectLanguage = (newLang: Locale) => {
    if (newLang === lang) {
      setIsOpen(false);
      return;
    }

    const currentPath = location.pathname;
    // Replace current language prefix in path while keeping subroute
    const match = currentPath.match(/^\/(en|ar|zh|ckb)(\/.*)?$/);
    let targetPath = `/${newLang}`;
    if (match && match[2]) {
      targetPath = `/${newLang}${match[2]}`;
    }

    navigate(targetPath);
    setIsOpen(false);
  };

  // Progress percentage (0% to 100%)
  const progressPercent = Math.max(0, Math.min(100, (timeLeft / TOTAL_DURATION) * 100));
  const secondsRemaining = (timeLeft / 1000).toFixed(1);

  const t = {
    en: {
      buttonTitle: "Instant 2s Language Selector",
      buttonLabel: "2s Glaze",
      modalBadge: "BILATERAL SOVEREIGN PORTAL",
      modalTitle: "Select Working Language",
      modalSubtitle: "Instant dialect switching across all agency bureaus and services.",
      autoDismiss: `Auto-closing in ${secondsRemaining}s`,
      pausedText: "Timer Paused • Choose language",
      pinnedText: "Pinned Open",
      hoverTip: "Hover to pause • Press 1-4 for instant switch",
      activeBadge: "Active Language",
      pinTitle: "Keep open",
      unpinTitle: "Resume 2s countdown",
    },
    ar: {
      buttonTitle: "محدد اللغات الزجاجي السريع (2 ثانية)",
      buttonLabel: "تبديل سريع (2ث)",
      modalBadge: "البوابة السيادية الثنائية الموحدة",
      modalTitle: "اختر لغة المنصة",
      modalSubtitle: "تحويل لغوي فوري لجميع أقسام الوكالة وتغطياتها الرسمية.",
      autoDismiss: `إغلاق تلقائي خلال ${secondsRemaining}ث`,
      pausedText: "المؤقت متوقف • اختر لغتك الآن",
      pinnedText: "مثبت مفتوحاً",
      hoverTip: "مرر المؤشر للإيقاف • اضغط 1-4 للتحويل الفوري",
      activeBadge: "اللغة النشطة",
      pinTitle: "تثبيت النافذة",
      unpinTitle: "استئناف العد التنازلي",
    },
    zh: {
      buttonTitle: "2秒极速语言切换玻璃弹窗",
      buttonLabel: "2秒快切",
      modalBadge: "中伊主权双边官方网络",
      modalTitle: "选择浏览语言",
      modalSubtitle: "全平台一键即时切换至对应语种智库与经贸系统。",
      autoDismiss: `${secondsRemaining}秒后自动关闭`,
      pausedText: "计时已暂停 • 请选择语言",
      pinnedText: "已固定窗口",
      hoverTip: "鼠标悬停暂停计时 • 支持快捷键 1-4",
      activeBadge: "当前语言",
      pinTitle: "固定窗口",
      unpinTitle: "恢复2秒倒计时",
    },
    ckb: {
      buttonTitle: "گۆڕینی خێرای زمان (٢ چرکە)",
      buttonLabel: "گۆڕینی خێرا (٢چ)",
      modalBadge: "پۆرتالی فەرمی و سەروەری دووقۆڵی",
      modalTitle: "زمانی دڵخوازت دیاریبکە",
      modalSubtitle: "گۆڕینی خێرای زمان بۆ سەرجەم بەشەکان و هەواڵەکان.",
      autoDismiss: `داخستنی خۆکار دوای ${secondsRemaining}چ`,
      pausedText: "وەستێنراوە • زمانێک هەڵبژێرە",
      pinnedText: "جێگیرکراو",
      hoverTip: "مشک لەسەری ڕابگرە بۆ وەستان • دوگمەی 1-4 داگرە",
      activeBadge: "زمانی چالاک",
      pinTitle: "جێگیرکردن",
      unpinTitle: "دەستپێکردنەوەی ٢ چرکە",
    },
  }[lang] || {
    buttonTitle: "Instant 2s Language Selector",
    buttonLabel: "2s Glaze",
    modalBadge: "BILATERAL SOVEREIGN PORTAL",
    modalTitle: "Select Working Language",
    modalSubtitle: "Instant dialect switching across all agency bureaus and services.",
    autoDismiss: `Auto-closing in ${secondsRemaining}s`,
    pausedText: "Timer Paused • Choose language",
    pinnedText: "Pinned Open",
    hoverTip: "Hover to pause • Press 1-4 for instant switch",
    activeBadge: "Active Language",
    pinTitle: "Keep open",
    unpinTitle: "Resume 2s countdown",
  };

  return (
    <div className={cn("relative inline-block", className)}>
      {/* Glazed Trigger Dot */}
      <div
        ref={triggerRef as any}
        id="glazed-language-modal-trigger"
        onClick={(e) => { e.stopPropagation(); handleOpen(); }}
        title={t.buttonTitle}
        aria-label={t.buttonTitle}
        className={cn(
          "relative flex items-center justify-center cursor-pointer transition-all duration-300",
          "h-2 w-2"
        )}
      >
        <span className="relative flex h-full w-full">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600 dark:bg-brand-500"></span>
        </span>
      </div>

      {/* Clean Glazing Modal */}
      <AnimatePresence>
        {isOpen && createPortal(
          <>
            {/* Subtle frosted glass ambient backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[140] bg-black/25 dark:bg-black/55 backdrop-blur-[3px]"
            />

            {/* Minimal Red Glazing Modal Container */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => {
                if (!isPinned) setIsPaused(false);
              }}
              className={cn(
                "fixed z-[150]",
                "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "w-[240px]",
                "rounded-xl overflow-hidden",
                "bg-red-700/95 dark:bg-red-900/95",
                "backdrop-blur-xl border border-red-500/50",
                "shadow-2xl"
              )}
            >
              {/* 8-Second Visual Countdown Progress Bar */}
              <div className="relative w-full h-1 bg-red-900/50 overflow-hidden z-10">
                <motion.div
                  className={cn(
                    "h-full transition-all duration-75",
                    isPaused || isPinned ? "bg-amber-400" : "bg-white"
                  )}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Minimal Header (just for pinning/closing) */}
              <div className="relative z-10 px-3 pt-2 pb-1.5 flex items-center justify-between border-b border-red-500/20">
                <span className="text-[9px] font-black uppercase text-white/80 tracking-widest">
                  {isPaused ? t.pausedText : t.autoDismiss}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPinned(!isPinned);
                      if (!isPinned) setIsPaused(true);
                    }}
                    className={cn(
                      "p-1 rounded-md text-xs transition-all cursor-pointer",
                      isPinned ? "bg-amber-500 text-white" : "text-white/60 hover:bg-white/20 hover:text-white"
                    )}
                  >
                    {isPinned ? <PinOff className="w-3 h-3" /> : <Pin className="w-3 h-3" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-md text-white/60 hover:bg-white/20 hover:text-white transition-all cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Language Selection Grid (Simple names only) */}
              <div className="relative z-10 p-2.5 grid grid-cols-2 gap-1.5">
                {LANGUAGE_OPTIONS.map((item) => {
                  const isActive = lang === item.code;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => handleSelectLanguage(item.code)}
                      className={cn(
                        "relative text-center p-2 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5",
                        isActive
                          ? "bg-white text-red-800 shadow-sm font-black"
                          : "bg-red-800/50 hover:bg-red-600 text-white border border-red-500/30 hover:border-red-400 font-bold"
                      )}
                    >
                      {isActive && <Check className="w-3 h-3 shrink-0" />}
                      <span className="text-[11px] uppercase tracking-wide">
                        {item.native}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

          </>,
          document.body
        )}
      </AnimatePresence>
    </div>
  );
}
