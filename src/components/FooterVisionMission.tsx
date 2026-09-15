import React, { useState } from 'react';
import { Locale } from '../types';
import { Target, Eye, QrCode, Smartphone, Download, Check, Copy } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { AppQrModal } from './AppQrModal';

export function FooterVisionMission({ lang }: { lang: Locale }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';

  const downloadUrl = typeof window !== 'undefined' ? `${window.location.origin}/${lang}` : `https://ica.iq/${lang}`;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(downloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-700 mt-12 mb-8 items-stretch">
        {/* Vision */}
        <div className="lg:col-span-4 flex flex-col gap-3 text-start rtl:text-right">
          <div className="flex items-center gap-2 text-brand-800 dark:text-brand-400 font-black uppercase tracking-widest text-sm">
            <Eye size={18} />
            <span>{isAr ? 'رؤيتنا' : isZh ? '我们的愿景' : isCkb ? 'دیدگامان' : 'Our Vision'}</span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
            {isAr 
              ? 'بناء جسر استراتيجي مستدام بين العراق والصين، يعزز التنمية الاقتصادية، ويقود الابتكار في مشاريع البنية التحتية، ويدعم الشراكات الثنائية طويلة الأمد في إطار مبادرة الحزام والطريق.' 
              : isZh 
              ? '在伊拉克与中国之间建立一座可持续的战略桥梁，促进经济发展，引领基础设施项目创新，并在“一带一路”倡议框架下支持长期的双边伙伴关系。'
              : isCkb
              ? 'دروستکردنی پردێکی ستراتیژی بەردەوام لە نێوان عێراق و چین، بۆ پێشخستنی گەشەی ئابووری و داهێنان لە پڕۆژەکانی ژێرخان و پشتیوانیکردنی هاوبەشی دوولایەنەی درێژخایەن.'
              : 'To build a sustainable strategic bridge between Iraq and China, fostering economic development, pioneering infrastructure innovation, and supporting long-term bilateral partnerships within the Belt and Road Initiative.'}
          </p>
        </div>

        {/* Mission */}
        <div className="lg:col-span-4 flex flex-col gap-3 text-start rtl:text-right border-t lg:border-t-0 lg:border-s border-neutral-200 dark:border-neutral-700 pt-6 lg:pt-0 lg:ps-6">
          <div className="flex items-center gap-2 text-brand-800 dark:text-brand-400 font-black uppercase tracking-widest text-sm">
            <Target size={18} />
            <span>{isAr ? 'رسالتنا' : isZh ? '我们的使命' : isCkb ? 'ئامانجمان' : 'Our Mission'}</span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
            {isAr
              ? 'تقديم تغطية إعلامية موثوقة، وتسهيل الاستثمارات المشتركة، وتوفير منصات رقمية آمنة للتبادل التجاري والأكاديمي والثقافي، لضمان نمو مزدهر لكلا البلدين.'
              : isZh
              ? '提供可靠的媒体报道，促进共同投资，并为商业、学术和文化交流提供安全的数字平台，以确保两国实现繁荣增长。'
              : isCkb
              ? 'پێشکەشکردنی ڕوماڵی میدیایی باوەڕپێکراو، ئاسانکاری بۆ وەبەرهێنانی هاوبەش، و دابینکردنی پلاتفۆرمی دیجیتاڵی ئارام بۆ ئاڵوگۆڕی بازرگانی، ئەکادیمی و کلتوری.'
              : 'Delivering reliable media coverage, facilitating joint investments, and providing secure digital platforms for commercial, academic, and cultural exchange to ensure prosperous growth for both nations.'}
          </p>
        </div>

        {/* ICA Mobile App PWA QR Download Card */}
        <div 
          id="footer-pwa-qr-box"
          onClick={() => setModalOpen(true)}
          className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center justify-between p-4 sm:p-5 bg-white dark:bg-neutral-900 rounded-xl border-2 border-brand-800/20 dark:border-brand-600/30 hover:border-brand-800 dark:hover:border-brand-500 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group relative overflow-hidden"
        >
          {/* Subtle top red glow */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-brand-800/10 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform" />

          <div className="flex items-center gap-4 w-full">
            {/* Real SVG QR code */}
            <div className="p-2 bg-white rounded-lg border border-neutral-200 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <QRCodeSVG
                value={downloadUrl}
                size={80}
                level="M"
                includeMargin={false}
              />
            </div>

            {/* Text & Guidance */}
            <div className="flex flex-col text-start rtl:text-right flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-brand-800 dark:text-brand-400 font-black uppercase tracking-wider text-[11px]">
                <Smartphone size={14} className="text-brand-800 animate-pulse" />
                <span>{isAr ? 'تطبيق الوكالة للأجهزة' : isZh ? 'ICA 移动端应用' : isCkb ? 'ئەپڵیکەیشنی ئاژانس' : 'ICA Mobile PWA'}</span>
              </div>
              <h5 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white mt-0.5 leading-snug">
                {isAr ? 'امسح لتحميل وتثبيت التطبيق' : isZh ? '扫码快速安装移动应用' : isCkb ? 'کۆدەکە سکان بکە بۆ دابەزاندن' : 'Scan to Install App'}
              </h5>
              <p className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 font-medium leading-tight mt-1 line-clamp-2">
                {isAr 
                  ? 'وصول فوري وخفيف دون متجر تطبيقات على هواتف أندرويد وآيفون.' 
                  : isZh 
                  ? '即时扫码安装渐进式Web应用，支持离线与即时双语推送。' 
                  : isCkb 
                  ? 'بەردەستە بۆ ئایفۆن و ئەندرۆید بەبێ پێویستی بە فرۆشگا.' 
                  : 'Instant fast install for iOS & Android without app store download.'}
              </p>
            </div>
          </div>

          {/* Quick Action Footer inside Card */}
          <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 w-full flex items-center justify-between gap-2 text-[10px] font-bold">
            <span className="text-brand-800 dark:text-brand-400 uppercase tracking-widest flex items-center gap-1">
              <QrCode size={12} />
              <span>{isAr ? 'انقر لتكبير الرمز' : isZh ? '点击放大二维码' : isCkb ? 'کرتە بکە بۆ گەورەکردن' : 'Click to Enlarge'}</span>
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="px-2 py-1 rounded bg-neutral-100 hover:bg-brand-50 hover:text-brand-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy direct link"
            >
              {copied ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
              <span>{copied ? (isAr ? 'تم النسخ' : isZh ? '已复制' : 'Copied') : (isAr ? 'نسخ الرابط' : isZh ? '复制链接' : 'Copy')}</span>
            </button>
          </div>
        </div>
      </div>

      <AppQrModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        lang={lang} 
      />
    </>
  );
}
