import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, LucideIcon } from 'lucide-react';
import {
  MinimalNewsroomIcon,
  MinimalLiveBroadcastImage,
  MinimalMediaFilmIcon,
} from './icons/PortalMinimalIcons';

export interface BroadcastPortalItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: LucideIcon;
  href: string;
  actionLabel: string;
  isLivePulse?: boolean;
  themeType: 'newsroom' | 'live' | 'media';
}

interface BroadcastPlatformCardProps {
  portal: BroadcastPortalItem;
  isRtl?: boolean;
}

export function BroadcastPlatformCard({ portal, isRtl = false }: BroadcastPlatformCardProps) {
  // Theme styling configurations matching minimal sovereign design specifications
  const getThemeConfig = () => {
    switch (portal.themeType) {
      case 'live':
        return {
          accentGradient: 'bg-red-600',
          accentGlow: 'shadow-[0_2px_10px_rgba(220,38,38,0.25)]',
          fadeGlow: 'bg-red-600/5',
          cardHoverBorder: 'group-hover:border-red-500',
          iconContainer:
            'bg-red-50/70 dark:bg-brand-950/25 text-red-600 dark:text-red-400 border-red-200/60 dark:border-brand-900/40 shadow-xs group-hover:scale-105 group-hover:bg-red-100/60 group-hover:border-red-300 dark:group-hover:border-brand-800',
          badgeClass:
            'bg-red-50 dark:bg-brand-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800/50',
          titleHover: 'group-hover:text-red-600 dark:group-hover:text-red-500',
          actionText: 'text-red-600 dark:text-red-500 group-hover:text-red-700 dark:group-hover:text-red-400',
          arrowBg:
            'bg-red-50 dark:bg-brand-950/40 text-red-600 dark:text-red-500 group-hover:bg-red-600 group-hover:text-white',
        };
      case 'media':
        return {
          accentGradient: 'bg-red-600',
          accentGlow: 'shadow-[0_2px_10px_rgba(220,38,38,0.25)]',
          fadeGlow: 'bg-red-600/5',
          cardHoverBorder: 'group-hover:border-red-500',
          iconContainer:
            'bg-red-50/70 dark:bg-brand-950/25 text-red-600 dark:text-red-400 border-red-200/60 dark:border-brand-900/40 shadow-xs group-hover:scale-105 group-hover:bg-red-100/60 group-hover:border-red-300 dark:group-hover:border-brand-800',
          badgeClass:
            'bg-red-50 dark:bg-brand-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800/50',
          titleHover: 'group-hover:text-red-600 dark:group-hover:text-red-500',
          actionText: 'text-red-600 dark:text-red-500 group-hover:text-red-700 dark:group-hover:text-red-400',
          arrowBg:
            'bg-red-50 dark:bg-brand-950/40 text-red-600 dark:text-red-500 group-hover:bg-red-600 group-hover:text-white',
        };
      case 'newsroom':
      default:
        return {
          accentGradient: 'bg-red-600',
          accentGlow: 'shadow-[0_2px_10px_rgba(220,38,38,0.25)]',
          fadeGlow: 'bg-red-600/5',
          cardHoverBorder: 'group-hover:border-red-500',
          iconContainer:
            'bg-red-50/70 dark:bg-brand-950/25 text-red-600 dark:text-red-400 border-red-200/60 dark:border-brand-900/40 shadow-xs group-hover:scale-105 group-hover:bg-red-100/60 group-hover:border-red-300 dark:group-hover:border-brand-800',
          badgeClass:
            'bg-red-50 dark:bg-brand-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800/50',
          titleHover: 'group-hover:text-red-600 dark:group-hover:text-red-500',
          actionText: 'text-red-600 dark:text-red-500 group-hover:text-red-700 dark:group-hover:text-red-400',
          arrowBg:
            'bg-red-50 dark:bg-brand-950/40 text-red-600 dark:text-red-500 group-hover:bg-red-600 group-hover:text-white',
        };
    }
  };

  const theme = getThemeConfig();

  return (
    <motion.div
      whileHover={{
        scale: 1.015,
        y: -3,
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="relative group h-full"
    >
      <Link
        to={portal.href}
        className={`relative overflow-visible rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/90 dark:border-neutral-800 p-6 sm:p-7 shadow-lg shadow-gray-200/40 dark:shadow-none flex flex-col justify-between min-h-[230px] h-full transition-all duration-300 ${theme.cardHoverBorder}`}
      >
        {/* Top Minimal Accent Bar */}
        <div
          className={`absolute -top-1 -inset-x-0.5 h-2 rounded-t-2xl ${theme.accentGradient} ${theme.accentGlow} transition-all duration-300 group-hover:h-2.5 z-20`}
          aria-hidden="true"
        />

        {/* Soft Ambient Radiance on hover */}
        <div
          className={`absolute top-0 inset-x-0 h-20 ${theme.fadeGlow} opacity-20 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none rounded-t-2xl z-0`}
          aria-hidden="true"
        />

        {/* Card Main Body */}
        <div className="relative z-10 space-y-4 pt-1">
          {/* Header Row: Minimal High-Quality Icon & Minimal Badge */}
          <div className="flex items-center justify-between">
            {/* Minimal Icon Container */}
            {portal.themeType === 'live' ? (
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-200 ${theme.iconContainer}`}
              >
                <MinimalLiveBroadcastImage
                  alt="Live Broadcast Transmission"
                  className="w-6 h-6"
                />
              </div>
            ) : portal.themeType === 'media' ? (
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-200 ${theme.iconContainer}`}
              >
                <MinimalMediaFilmIcon className="w-6 h-6" />
              </div>
            ) : (
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-200 ${theme.iconContainer}`}
              >
                <MinimalNewsroomIcon className="w-6 h-6" />
              </div>
            )}

            {/* Clean Minimal Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border font-mono ${theme.badgeClass}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>{portal.badge}</span>
            </span>
          </div>

          {/* Typography Hierarchy: Crisp Minimal Titles & Subtitles */}
          <div className="pt-1">
            <h3
              className={`text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white transition-colors duration-200 ${theme.titleHover}`}
            >
              {portal.title}
            </h3>
            <p className="text-xs sm:text-[13px] text-gray-500 dark:text-neutral-400 mt-2 leading-relaxed font-normal transition-colors duration-200 group-hover:text-gray-700 dark:group-hover:text-neutral-200">
              {portal.subtitle}
            </p>
          </div>
        </div>

        {/* Action Row with Minimal Arrow */}
        <div className="relative z-10 pt-4 mt-6 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between text-xs font-black transition-colors">
          <span className={`uppercase tracking-wider ${theme.actionText}`}>
            {portal.actionLabel}
          </span>
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-xs ${theme.arrowBg}`}
          >
            <ChevronRight
              size={14}
              className={`transition-transform duration-200 group-hover:translate-x-1 ${
                isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''
              }`}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default BroadcastPlatformCard;
