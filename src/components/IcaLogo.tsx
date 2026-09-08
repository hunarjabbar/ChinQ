import React from 'react';
import { Locale } from '../types';

export interface IcaLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
  variant?: 'emblem' | 'mark' | 'horizontal' | 'badge' | 'crest';
  className?: string;
  theme?: 'default' | 'gold' | 'monochrome' | 'white' | 'dark';
  lang?: Locale;
  showSubtitle?: boolean;
}

/**
 * Standardized Official Iraqi-Chinese Agency (ICA) Brand Logo & Emblem
 * Represents the bilateral sovereign corridor between Baghdad & Beijing.
 * Colors: Standardized Sovereign Red (Brand-800 #cc0000), Imperial Silk Road Gold (#F59E0B), Ink (#1A1A1A).
 */
export function IcaLogo({
  size = 'md',
  variant = 'emblem',
  className = '',
  theme = 'default',
  lang,
  showSubtitle = true
}: IcaLogoProps) {
  // Dimension mapping
  const getDimension = () => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'xs': return 24;
      case 'sm': return 32;
      case 'md': return 44;
      case 'lg': return 56;
      case 'xl': return 72;
      case '2xl': return 96;
      default: return 44;
    }
  };

  const dim = getDimension();

  // Vector Emblem Mark
  const EmblemSvg = ({ dimSize = dim }: { dimSize?: number }) => (
    <svg
      width={dimSize}
      height={dimSize}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-label="Iraqi-Chinese Agency Official Emblem"
    >
      <defs>
        {/* Brand Diplomatic Red Gradient */}
        <linearGradient id="icaRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E60000" />
          <stop offset="50%" stopColor="#cc0000" />
          <stop offset="100%" stopColor="#b30000" />
        </linearGradient>

        {/* Silk Road Imperial Gold Gradient */}
        <linearGradient id="icaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Outer Shadow & Glow Filter */}
        <filter id="icaShadow" x="-10%" y="-10%" width="125%" height="125%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#cc0000" floodOpacity="0.25" />
        </filter>

        <linearGradient id="icaInnerSheen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Main Rounded Shield Base */}
      <rect
        x="6"
        y="6"
        width="108"
        height="108"
        rx="26"
        fill="#cc0000"
        stroke="none"
        strokeWidth="0"
        style={{ borderStyle: 'none' }}
      />

      {/* Central Official Monogram: I C A */}
      <g id="ica-monogram">
        <text
          x="60"
          y="78"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="950"
          fontSize="64"
          letterSpacing="-1"
        >
          ICA
        </text>
      </g>

    </svg>
  );

  // Return standalone mark
  if (variant === 'mark' || variant === 'crest') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <EmblemSvg dimSize={dim} />
      </div>
    );
  }

  // Refined Masthead Badge variant (Default for Header and Official Banners)
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <EmblemSvg dimSize={dim} />
        <div className="flex flex-col items-start text-left rtl:items-start rtl:text-right">

          {showSubtitle && (
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-800 mt-0.5">
              {lang === 'ar' ? 'بغداد • بكين • أربيل' : lang === 'zh' ? '巴格达 • 北京 • 埃尔比勒' : lang === 'ckb' ? 'بەغداد • پەکین • هەولێر' : 'Baghdad • Beijing • Erbil'}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Horizontal Full Lockup (Emblem + Trilingual Title)
  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3.5 ${className}`}>
        <EmblemSvg dimSize={dim} />
        <div className="flex flex-col items-start text-left rtl:items-start rtl:text-right">
          <div className="font-black tracking-tight text-brand-900 text-base leading-none">
            {lang === 'ar'
              ? 'الوكالة العراقية الصينية'
              : lang === 'zh'
              ? '伊中通讯社'
              : lang === 'ckb'
              ? 'ئاژانسی عێراقی - چینی'
              : 'IRAQI-CHINESE AGENCY'}
          </div>
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-brand-800 mt-1">
            ICA MEDIA GROUP • EST. 2026
          </div>
        </div>
      </div>
    );
  }

  // Default Emblem with interactive styling
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <EmblemSvg dimSize={dim} />
      <div className="flex flex-col items-start text-left rtl:items-start rtl:text-right">
        <span className="text-xs font-black uppercase tracking-[0.25em] text-neutral-800">
          {lang === 'ar' ? 'الجريدة الرسمية' : lang === 'zh' ? '官方权威期刊' : lang === 'ckb' ? 'ڕۆژنامەی فەرمی' : 'Official Journal'}
        </span>
        <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-brand-800">
          {lang === 'ar' ? 'بغداد • بكين' : lang === 'zh' ? '巴格达 • 北京' : lang === 'ckb' ? 'بەغداد • پەکین' : 'Baghdad • Beijing'}
        </span>
      </div>
    </div>
  );
}
export default IcaLogo;
