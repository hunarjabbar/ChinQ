import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Smartphone, Download, Copy, Check, QrCode, X, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Locale } from '../types';

interface AppQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Locale;
}

export function AppQrModal({ isOpen, onClose, lang }: AppQrModalProps) {
  const [copied, setCopied] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Points directly to the current origin / root with language
      setDownloadUrl(`${window.location.origin}/${lang}`);
    }
  }, [lang]);

  const handleCopyLink = async () => {
    if (!downloadUrl) return;
    try {
      await navigator.clipboard.writeText(downloadUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const isRtl = lang === 'ar' || lang === 'ckb';

  const t = {
    en: {
      badge: "Mobile PWA & Instant Access",
      title: "Scan to Install ICA App",
      desc: "Point your smartphone's camera at this QR code to instantly open and install the Iraqi-Chinese Agency PWA on iOS or Android.",
      instructionIos: "iOS: Tap Share → 'Add to Home Screen'",
      instructionAndroid: "Android: Tap 'Install' or Chrome menu → 'Add to Home Screen'",
      copyLink: "Copy App Link",
      copied: "Link Copied!",
      openBrowser: "Open Direct",
      close: "Close"
    },
    ar: {
      badge: "تطبيق الويب التقدمي (PWA) للأجهزة الذكية",
      title: "امسح الرمز لتثبيت تطبيق الوكالة",
      desc: "وجّه كاميرا هاتفك الذكي نحو رمز الاستجابة السريعة (QR) لفتح وتثبيت تطبيق الوكالة العراقية الصينية فوراً على هواتف أبل وأندرويد.",
      instructionIos: "آيفون: اضغط مشاركة ← 'إضافة إلى الشاشة الرئيسية'",
      instructionAndroid: "أندرويد: اضغط 'تثبيت' أو قائمة المتصفح ← 'إضافة إلى الشاشة الرئيسية'",
      copyLink: "نسخ رابط التطبيق",
      copied: "تم نسخ الرابط!",
      openBrowser: "فتح مباشر",
      close: "إغلاق"
    },
    zh: {
      badge: "移动端 PWA 应用与即时安装",
      title: "扫码安装伊中通讯社应用",
      desc: "使用智能手机相机扫描此二维码，即可在 iOS 或 Android 设备上即时打开并安装伊拉克-中国通讯社官方 PWA 移动应用。",
      instructionIos: "苹果 iOS: 点击分享图标 → 选择“添加到主屏幕”",
      instructionAndroid: "安卓 Android: 点击“安装”或浏览器菜单 → 选择“安装应用”",
      copyLink: "复制应用链接",
      copied: "链接已复制！",
      openBrowser: "直接访问",
      close: "关闭"
    },
    ckb: {
      badge: "ئەپڵیکەیشنی مۆبایل (PWA)",
      title: "کۆدەکە سکان بکە بۆ دابەزاندنی ئەپ",
      desc: "کامێرای مۆبایلەکەت ئاراستەی ئەم کۆدە بکە بۆ کردنەوە و دابەزاندنی ڕاستەوخۆی ئەپڵیکەیشنی ئاژانسی عێراقی-چینی لەسەر ئەندرۆید و ئایفۆن.",
      instructionIos: "ئایفۆن: کرتە لە هاوبەشکردن بکە ← 'زیادکردن بۆ شاشەی سەرەکی'",
      instructionAndroid: "ئەندرۆید: کرتە لە 'دابەزاندن' بکە یان مێنیوی وێبگەڕ ← 'زیادکردن بۆ شاشەی سەرەکی'",
      copyLink: "کۆپیکردنی بەستەری ئەپ",
      copied: "بەستەر کۆپیکرا!",
      openBrowser: "کردنەوەی ڕاستەوخۆ",
      close: "داخستن"
    }
  }[lang] || {
    badge: "Mobile PWA & Instant Access",
    title: "Scan to Install ICA App",
    desc: "Point your smartphone's camera at this QR code to instantly open and install the Iraqi-Chinese Agency PWA on iOS or Android.",
    instructionIos: "iOS: Tap Share → 'Add to Home Screen'",
    instructionAndroid: "Android: Tap 'Install' or Chrome menu → 'Add to Home Screen'",
    copyLink: "Copy App Link",
    copied: "Link Copied!",
    openBrowser: "Open Direct",
    close: "Close"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
            className={`relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 z-10 overflow-hidden text-neutral-900 dark:text-neutral-100 ${
              isRtl ? 'text-right' : 'text-left'
            }`}
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-900 via-brand-700 to-brand-500" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-5 ${isRtl ? 'left-5' : 'right-5'} p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors`}
              aria-label={t.close}
            >
              <X size={20} />
            </button>

            {/* Header Badge & Title */}
            <div className="flex flex-col items-center text-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-brand-50 dark:bg-brand-950/60 text-brand-800 dark:text-brand-300 border border-brand-200 dark:border-brand-800/80">
                <Sparkles size={13} className="text-brand-700 dark:text-brand-400" />
                <span>{t.badge}</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                {t.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
                {t.desc}
              </p>
            </div>

            {/* QR Code Container with Glassy Frame */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative p-4 sm:p-5 bg-white rounded-2xl shadow-lg border-2 border-brand-800/20 dark:border-brand-600/40 ring-4 ring-brand-500/10 flex flex-col items-center justify-center">
                {downloadUrl ? (
                  <QRCodeSVG
                    value={downloadUrl}
                    size={210}
                    level="H"
                    includeMargin={true}
                    imageSettings={{
                      src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23cc0000'/><text x='50' y='65' font-size='45' font-family='sans-serif' font-weight='900' fill='white' text-anchor='middle'>ICA</text></svg>",
                      x: undefined,
                      y: undefined,
                      height: 46,
                      width: 46,
                      excavate: true,
                    }}
                  />
                ) : (
                  <div className="w-[210px] h-[210px] flex items-center justify-center text-neutral-400">
                    <QrCode size={64} className="animate-pulse" />
                  </div>
                )}

                {/* Subtitle tag */}
                <div className="mt-2 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-brand-800 dark:text-brand-700">
                  <ShieldCheck size={14} className="text-brand-800" />
                  <span>Official PWA • Iraqi-Chinese Agency</span>
                </div>
              </div>
            </div>

            {/* Platform Instructions Box */}
            <div className="bg-neutral-50 dark:bg-neutral-800/60 rounded-xl p-3.5 border border-neutral-200 dark:border-neutral-700/80 mb-6 space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
              <div className="flex items-center gap-2 font-bold text-neutral-800 dark:text-neutral-200">
                <Smartphone size={15} className="text-brand-800 dark:text-brand-400 shrink-0" />
                <span>{t.instructionIos}</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-neutral-800 dark:text-neutral-200">
                <Download size={15} className="text-brand-800 dark:text-brand-400 shrink-0" />
                <span>{t.instructionAndroid}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleCopyLink}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 active:scale-98 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                {copied ? <Check size={16} className="text-emerald-300" /> : <Copy size={16} />}
                <span>{copied ? t.copied : t.copyLink}</span>
              </button>

              <a
                href={downloadUrl || `/${lang}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <ExternalLink size={15} />
                <span>{t.openBrowser}</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
