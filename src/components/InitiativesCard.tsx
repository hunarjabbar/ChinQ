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
      className="relative group flex flex-col justify-between rounded-3xl h-full"
    >
      {/* 2. Soft Red Blurry Under-Glow behind the glass card borders */}
      <div
        className="absolute -inset-1.5 -z-10 bg-red-500/20 group-hover:bg-red-500/40 blur-2xl rounded-3xl transition-all duration-500 pointer-events-none opacity-80 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* 1. Glassmorphism Base Card */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8 rounded-3xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-white/60 dark:border-white/10 group-hover:border-red-300 dark:group-hover:border-red-500/50 shadow-xl shadow-neutral-950/5 transition-all duration-300">
        <div className="space-y-4">
          {/* Eyebrow */}
          <div className="text-xs font-black uppercase tracking-[0.25em] text-red-600 dark:text-red-400">
            {initiative.eyebrow}
          </div>

          {/* Headline */}
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950 dark:text-white uppercase leading-snug tracking-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            {initiative.headline}
          </h3>

          {/* Description */}
          <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed font-serif italic mb-4">
            {initiative.description}
          </p>

          {initiative.tags && initiative.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold text-neutral-500 dark:text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
              {initiative.tags.map((tag, tIdx) => (
                <React.Fragment key={tIdx}>
                  <span>{tag}</span>
                  {tIdx < initiative.tags!.length - 1 && <span className="text-neutral-300 dark:text-neutral-700" aria-hidden="true">·</span>}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-8 mt-8 border-t border-neutral-200/60 dark:border-neutral-800">
          <Link
            to={initiative.path}
            className="w-full inline-flex items-center justify-between px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-black uppercase tracking-wider shadow-lg shadow-red-600/20 hover:shadow-red-600/40 transition-all duration-300 group/cta"
          >
            <span>{initiative.cta}</span>
            <ArrowRight
              size={18}
              className={`transition-transform duration-300 group-hover:translate-x-1.5 ${
                isRtl ? 'rotate-180 group-hover:-translate-x-1.5' : ''
              }`}
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default InitiativesCard;
