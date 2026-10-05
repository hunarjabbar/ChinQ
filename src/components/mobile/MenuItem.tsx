import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, LucideIcon } from 'lucide-react';

export interface MenuItemTag {
  text: string;
  type?: 'fee' | 'location' | 'fx' | 'default';
}

export interface MenuItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  tag?: MenuItemTag | string;
  onClick?: () => void;
  isRtl?: boolean;
}

export function MenuItem({
  to,
  icon: Icon,
  label,
  tag,
  onClick,
  isRtl = false,
}: MenuItemProps) {
  const normalizedTag: MenuItemTag | undefined =
    typeof tag === 'string'
      ? {
          text: tag,
          type: tag.includes('%')
            ? 'fee'
            : tag.includes('FX')
            ? 'fx'
            : tag.includes('Sulaymaniyah') || tag.includes('Baghdad') || tag.includes('Erbil')
            ? 'location'
            : 'default',
        }
      : tag;

  const getTagClasses = (type?: string) => {
    switch (type) {
      case 'fee':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.25)]';
      case 'location':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.25)]';
      case 'fx':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/30 shadow-[0_0_8px_rgba(14,165,233,0.25)]';
      default:
        return 'bg-white/10 text-white/90 border-white/15';
    }
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <Link
        to={to}
        onClick={onClick}
        className="group relative flex items-center justify-between p-3 rounded-xl bg-black/25 hover:bg-black/40 active:bg-black/50 border border-white/5 hover:border-white/15 transition-all duration-200 min-h-[48px] overflow-hidden"
      >
        {/* Left Side: Icon Container + Animated Label */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Fixed-width Icon Container */}
          <div className="w-8 h-8 rounded-lg bg-white/10 group-hover:bg-white/15 border border-white/10 flex items-center justify-center shrink-0 transition-colors">
            <Icon size={16} className="text-amber-300 group-hover:scale-105 transition-transform" />
          </div>

          {/* Micro-interaction: Text slides slightly on hover / tap */}
          <motion.span
            className="text-xs sm:text-sm font-bold text-neutral-100 group-hover:text-white transition-colors truncate"
            variants={{
              hover: { x: isRtl ? 4 : -4 },
            }}
          >
            {label}
          </motion.span>
        </div>

        {/* Right Side: Glowing Tag or Fade-in Indicator */}
        <div className="flex items-center gap-2 shrink-0 ms-2">
          {normalizedTag ? (
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${getTagClasses(
                normalizedTag.type
              )}`}
            >
              {normalizedTag.text}
            </span>
          ) : null}

          {/* Fade-in Arrow Indicator */}
          <ChevronRight
            size={14}
            className={`text-neutral-400 opacity-60 group-hover:opacity-100 group-hover:text-white transition-all transform group-hover:translate-x-1 ${
              isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''
            }`}
          />
        </div>
      </Link>
    </motion.div>
  );
}

export default MenuItem;
