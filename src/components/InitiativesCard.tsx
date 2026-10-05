import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

export interface InitiativeItem {
  id: string;
  eyebrow: string;
  headline: string;
  description: string;
  cta: string;
  path: string;
  tags?: string[];
  secondaryLinks?: { label: string; path: string }[];
}

interface InitiativesCardProps {
  initiative: InitiativeItem;
  index: number;
  isRtl?: boolean;
}

export function InitiativesCard({ initiative, index, isRtl = false }: InitiativesCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      whileHover={{ y: -8 }}
      className="relative group flex flex-col justify-between rounded-3xl"
    >
      {/* 2. Soft Red Blurry Under-Glow behind the glass card borders */}
      <div
        className="absolute -inset-1.5 -z-10 bg-red-500/20 group-hover:bg-red-500/40 blur-2xl rounded-3xl transition-all duration-500 pointer-events-none opacity-80 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* 1. Glassmorphism Base Card */}
      <div className="relative z-10 flex flex-col justify-between h-full p-7 sm:p-8 rounded-3xl bg-white/60 dark:bg-neutral-900/60 backdrop-blur-lg border border-white/50 dark:border-white/10 group-hover:border-red-200 dark:group-hover:border-red-500/40 shadow-lg shadow-neutral-900/5 transition-colors duration-300">
        <div className="space-y-4">
          {/* Eyebrow */}
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600 dark:text-red-400">
            {initiative.eyebrow}
          </div>

          {/* Headline */}
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950 dark:text-white uppercase leading-snug tracking-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            {initiative.headline}
          </h3>

          {/* Description */}
          <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-[15px] leading-relaxed font-serif italic line-clamp-3">
            {initiative.description}
          </p>

          {/* Tags */}
          {initiative.tags && initiative.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {initiative.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-red-50/70 dark:bg-neutral-800/80 text-brand-900 dark:text-neutral-300 border border-red-100/70 dark:border-neutral-700/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action & Secondary Links */}
        <div className="space-y-4 pt-6 mt-6 border-t border-neutral-200/60 dark:border-neutral-800">
          <Link
            to={initiative.path}
            className="inline-flex items-center text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 gap-2 group/cta"
          >
            <span>{initiative.cta}</span>
            <ArrowRight
              size={14}
              className={`transition-transform duration-300 group-hover:translate-x-1.5 ${
                isRtl ? 'rotate-180 group-hover:-translate-x-1.5' : ''
              }`}
            />
          </Link>

          {initiative.secondaryLinks && initiative.secondaryLinks.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pt-1">
              {initiative.secondaryLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  className="hover:text-red-600 dark:hover:text-red-400 transition-colors inline-flex items-center gap-1 underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-4"
                >
                  <span>{link.label}</span>
                  <ChevronRight size={10} className={isRtl ? 'rotate-180' : ''} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default InitiativesCard;
