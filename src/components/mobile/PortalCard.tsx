import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, LucideIcon } from 'lucide-react';

export interface PortalCardProps {
  to: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  badge?: string;
  isLive?: boolean;
  onClick?: () => void;
  isRtl?: boolean;
}

export function PortalCard({
  to,
  icon: Icon,
  title,
  subtitle,
  badge,
  isLive = false,
  onClick,
  isRtl = false,
}: PortalCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="w-full"
    >
      <Link
        to={to}
        onClick={onClick}
        className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 min-h-[56px] overflow-hidden ${
          isLive
            ? 'bg-red-600 hover:bg-red-500 border-red-400 shadow-lg shadow-red-600/20'
            : 'bg-white/10 hover:bg-white/20 active:bg-white/25 border-white/20 shadow-sm backdrop-blur-md'
        }`}
      >
        {/* Subtle Ambient Hover Glow */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          aria-hidden="true"
        />

        <div className="flex items-center gap-3 relative z-10 min-w-0">
          {/* Icon with 3D glow */}
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
              isLive
                ? 'bg-white/20 text-white border-white/30 shadow-inner p-1'
                : 'bg-white/10 text-amber-300 border-white/15'
            }`}
          >
            {isLive ? (
              <img
                src="/icons/minimal-broadcast-live.svg"
                alt="Broadcast Tower"
                className="w-full h-full object-contain drop-shadow-xs"
                referrerPolicy="no-referrer"
              />
            ) : (
              <Icon size={18} className="drop-shadow-xs" />
            )}
          </div>

          <div className="min-w-0 text-start">
            <div className="text-xs sm:text-sm font-extrabold text-white tracking-tight truncate leading-tight group-hover:text-amber-200 transition-colors">
              {title}
            </div>
            <div className="text-[10px] sm:text-[11px] font-medium text-brand-100/90 truncate leading-snug">
              {subtitle}
            </div>
          </div>
        </div>

        {/* Right Status Badge / Indicator */}
        <div className="flex items-center gap-1.5 shrink-0 relative z-10 ms-2">
          {isLive ? (
            <motion.span
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(34, 197, 94, 0.6)',
                  '0 0 0 6px rgba(34, 197, 94, 0)',
                  '0 0 0 0 rgba(34, 197, 94, 0)',
                ],
              }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500 text-white border border-emerald-400 shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>LIVE</span>
            </motion.span>
          ) : badge ? (
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/15 text-white/90 border border-white/20 font-mono">
              {badge}
            </span>
          ) : (
            <ChevronRight
              size={15}
              className={`text-brand-200 group-hover:text-white group-hover:translate-x-1 transition-transform ${
                isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''
              }`}
            />
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default PortalCard;
