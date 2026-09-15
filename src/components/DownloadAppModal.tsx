/**
 * =========================================================================================
 * PWA INSTALL MODAL (DownloadAppModal)
 * =========================================================================================
 * 
 * NOTE ON EMBEDDED PREVIEW IFRAMES (e.g. AI Studio Preview Pane):
 * The install modal not appearing inside an embedded preview iframe is standard, expected
 * browser behavior, NOT a bug.
 * 
 * Chromium and WebKit deliberately restrict the 'beforeinstallprompt' event to top-level
 * browser tabs/windows as an anti-abuse and anti-clickjacking security boundary. Browsers
 * will never dispatch 'beforeinstallprompt' inside an iframe.
 * 
 * TESTING INSTRUCTIONS:
 * To test the PWA installation flow, open the deployed Cloud Run application URL directly
 * in its own browser tab (not through an embedded preview).
 * 
 * EVENT CAPTURE ARCHITECTURE:
 * Global early event capture is initialized at application bootstrap in `src/main.tsx` via
 * `src/lib/pwaInstall.ts`. This modal subscribes to that singleton store so events are never
 * missed, regardless of component mount timing.
 * =========================================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { Download, X, Share, PlusSquare, QrCode } from 'lucide-react';
import { getDeferredPrompt, onBeforeInstallPrompt, clearDeferredPrompt } from '../lib/pwaInstall';
import type { BeforeInstallPromptEvent } from '../types/pwa';
import { AppQrModal } from './AppQrModal';

export function DownloadAppModal({ lang = 'en' }: { lang?: string }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isIOS, setIsIOS] = useState(false);
  const [alreadyInstalled, setAlreadyInstalled] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  
  const timerRef = useRef<any>(null);

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = (navigator as any).standalone === true;
    
    if (isStandalone || isIOSStandalone) {
      setAlreadyInstalled(true);
      return;
    }

    // Check localStorage
    const dismissed = localStorage.getItem('ica_pwa_install_prompt_dismissed');
    if (dismissed) {
      setHasDismissed(true);
      return;
    }

    // Detect iOS
    const isIOSDevice = [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document);

    if (isIOSDevice) {
      setIsIOS(true);
      // Wait a few seconds before showing
      setTimeout(() => setIsVisible(true), 5000);
    }

    // Check if a prompt was already captured prior to this component mounting
    const existingPrompt = getDeferredPrompt();
    if (existingPrompt) {
      setDeferredPrompt(existingPrompt);
      setTimeout(() => setIsVisible(true), 5000);
    }

    // Subscribe to prompt events captured by the central pwaInstall module
    const unsubscribe = onBeforeInstallPrompt((prompt) => {
      if (prompt) {
        setDeferredPrompt(prompt);
        setTimeout(() => setIsVisible(true), 5000);
      } else {
        setDeferredPrompt(null);
      }
    });

    return () => {
      unsubscribe();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (isVisible && !isMinimized && !hasDismissed) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsMinimized(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isVisible, isMinimized, hasDismissed]);

  if (alreadyInstalled || hasDismissed || (!deferredPrompt && !isIOS)) {
    return null;
  }

  const handleDismiss = () => {
    setIsVisible(false);
    setHasDismissed(true);
    localStorage.setItem('ica_pwa_install_prompt_dismissed', 'true');
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setHasDismissed(true);
        localStorage.setItem('ica_pwa_install_prompt_dismissed', 'true');
        setIsVisible(false);
      }
      clearDeferredPrompt();
      setDeferredPrompt(null);
    } catch (err) {
      console.warn('Error during install prompt:', err);
    }
  };

  const translations = {
    en: {
      title: "Download ICA App",
      desc: "Install the Iraqi-Chinese Agency app for faster access, morning briefings, and a better reading experience.",
      install: "Install App",
      iosDesc: "Tap the Share icon, then 'Add to Home Screen' to install.",
      scanQr: "Scan QR Code Instead",
      later: "Later"
    },
    ar: {
      title: "تحميل تطبيق الوكالة",
      desc: "قم بتثبيت تطبيق الوكالة العراقية الصينية للوصول السريع والإحاطات الصباحية وتجربة قراءة أفضل.",
      install: "تثبيت التطبيق",
      iosDesc: "اضغط على أيقونة المشاركة، ثم 'إضافة إلى الشاشة الرئيسية' للتثبيت.",
      scanQr: "أو امسح رمز الـ QR للهاتف",
      later: "لاحقاً"
    },
    zh: {
      title: "下载 ICA 应用",
      desc: "安装伊拉克-中国通讯社应用，以获得更快的访问速度、早间简报和更好的阅读体验。",
      install: "安装应用",
      iosDesc: "点击分享图标，然后选择“添加到主屏幕”以安装。",
      scanQr: "在手机上扫码安装",
      later: "稍后"
    },
    ckb: {
      title: "دابەزاندنی ئەپڵیکەیشنی ئاژانس",
      desc: "ئەپڵیکەیشنی ئاژانسی عێراقی-چینی دابەزێنە بۆ خێراتر دەستگەیشتن و کورتەی بەیانیان و ئەزموونێکی باشتری خوێندنەوە.",
      install: "دابەزاندنی ئەپ",
      iosDesc: "کرتە لە ئایکۆنی هاوبەشکردن بکە، پاشان 'زیادکردن بۆ شاشەی سەرەکی' بۆ دابەزاندن.",
      scanQr: "سکانکردنی کۆدی QR بۆ مۆبایل",
      later: "دواتر"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  if (!isVisible) return null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-[100] animate-in fade-in slide-in-from-bottom-4">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-brand-800 text-white p-3 rounded-full shadow-xl hover:bg-brand-900 transition-colors flex items-center justify-center focus:outline-none"
          title={t.install}
        >
          <Download size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] w-[340px] bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-gray-200 dark:border-neutral-800 overflow-hidden animate-in fade-in slide-in-from-bottom-8">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-800 rounded-lg flex items-center justify-center">
             <span className="text-white font-black text-lg">ICA</span>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white">
            {t.title}
          </h3>
        </div>
        <button onClick={handleMinimize} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1">
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <p className="text-sm text-gray-600 dark:text-neutral-400">
          {isIOS ? t.iosDesc : t.desc}
        </p>

        {isIOS ? (
          <div className="flex items-center justify-center gap-4 py-2 text-brand-800 dark:text-brand-400">
            <Share size={24} />
            <span>+</span>
            <PlusSquare size={24} />
          </div>
        ) : (
          <button
            onClick={handleInstall}
            className="w-full bg-brand-800 hover:bg-brand-900 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Download size={18} />
            {t.install}
          </button>
        )}

        <button
          type="button"
          onClick={() => setShowQrModal(true)}
          className="w-full border border-gray-200 dark:border-neutral-700 hover:border-brand-300 dark:hover:border-brand-700 bg-gray-50 dark:bg-neutral-800/60 hover:bg-brand-50/40 dark:hover:bg-brand-950/30 text-gray-700 dark:text-neutral-200 font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-xs"
        >
          <QrCode size={15} className="text-brand-800 dark:text-brand-400" />
          {t.scanQr}
        </button>
      </div>

      {/* Footer / Timer */}
      <div className="bg-gray-50 dark:bg-neutral-900 px-4 py-3 flex items-center justify-between border-t border-gray-100 dark:border-neutral-800">
        <button 
          onClick={handleDismiss}
          className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:hover:text-neutral-300"
        >
          {t.later}
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-24 h-1.5 bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-800 transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 font-mono w-4">{timeLeft}s</span>
        </div>
      </div>

      <AppQrModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        lang={lang as any}
      />
    </div>
  );
}
