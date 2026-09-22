import React, { useState } from 'react';
import { Locale } from '../types';
import { Target, Eye, QrCode, Smartphone, Download, Check, Copy } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { AppQrModal } from './AppQrModal';
import { useI18n } from '../hooks/useI18n';

export function FooterVisionMission({ lang }: { lang: Locale }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { t } = useI18n(lang);

  const downloadUrl = typeof window !== 'undefined' ? `${window.location.origin}/${lang}` : `https://ica.iq/${lang}`;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(downloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <>
      <div 
        id="footer-vision-mission-root"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-700 mt-12 mb-8 items-stretch w-full max-w-7xl mx-auto box-border"
      >
        {/* Vision */}
        <div className="lg:col-span-4 flex flex-col gap-3 text-start rtl:text-right">
          <div className="flex items-center gap-2 text-brand-800 dark:text-brand-400 font-bold uppercase tracking-wider text-sm">
            <Eye size={18} />
            <span>{t('footerPillarEnergyBri')}</span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
            {t('footerVisionText')}
          </p>
        </div>

        {/* Mission */}
        <div className="lg:col-span-4 flex flex-col gap-3 text-start rtl:text-right border-t lg:border-t-0 lg:border-s border-neutral-200 dark:border-neutral-700 pt-6 lg:pt-0 lg:ps-6">
          <div className="flex items-center gap-2 text-brand-800 dark:text-brand-400 font-bold uppercase tracking-wider text-sm">
            <Target size={18} />
            <span>{t('footerResourcesDataHeading')}</span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
            {t('footerMissionText')}
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
                <span>{t('footerIcaMobileApp')}</span>
              </div>
              <h5 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white mt-0.5 leading-snug">
                {t('footerScanToInstall')}
              </h5>
              <p className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 font-medium leading-tight mt-1 line-clamp-2">
                {t('footerInstantFastInstall')}
              </p>
            </div>
          </div>

          {/* Quick Action Footer inside Card */}
          <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 w-full flex items-center justify-between gap-2 text-[10px] font-bold">
            <span className="text-brand-800 dark:text-brand-400 uppercase tracking-widest flex items-center gap-1">
              <QrCode size={12} />
              <span>{t('footerEnlarge')}</span>
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="px-2 py-1 rounded bg-neutral-100 hover:bg-brand-50 hover:text-brand-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy direct link"
            >
              {copied ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
              <span>{copied ? t('footerCopied') : t('footerCopy')}</span>
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
