import React from 'react';
import { Link } from 'react-router-dom';
import { Locale } from '../../../types';
import { ccTranslations } from './translations';
import { ArrowRight, Mic, Sparkles, Briefcase, MessageSquare, Compass } from 'lucide-react';

interface SupplementaryTracksProps {
  lang: Locale;
}

interface TrackData {
  id: string;
  slug: string;
  name: string; // Latin script
  icon: React.ElementType;
  descKey: 'suppHskkElemDesc' | 'suppHskkInterDesc' | 'suppHskkAdvDesc' | 'suppYctDesc' | 'suppBusinessDesc';
}

const TRACKS: TrackData[] = [
  {
    id: 'hskk-elem',
    slug: 'hskk-elementary',
    name: 'HSKK Elementary',
    icon: Mic,
    descKey: 'suppHskkElemDesc'
  },
  {
    id: 'hskk-inter',
    slug: 'hskk-intermediate',
    name: 'HSKK Intermediate',
    icon: MessageSquare,
    descKey: 'suppHskkInterDesc'
  },
  {
    id: 'hskk-adv',
    slug: 'hskk-advanced',
    name: 'HSKK Advanced',
    icon: Sparkles,
    descKey: 'suppHskkAdvDesc'
  },
  {
    id: 'yct',
    slug: 'yct-1-4',
    name: 'YCT 1–4',
    icon: Compass,
    descKey: 'suppYctDesc'
  },
  {
    id: 'business',
    slug: 'business-chinese',
    name: 'Business Chinese',
    icon: Briefcase,
    descKey: 'suppBusinessDesc'
  }
];

export function SupplementaryTracks({ lang }: SupplementaryTracksProps) {
  const t = ccTranslations[lang] || ccTranslations.en;
  const isRtl = lang === 'ar' || lang === 'ckb';

  return (
    <section id="supplementary-tracks" className="py-20 bg-card dark:bg-neutral-950 border-b border-border" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-navy dark:text-white uppercase tracking-tight mb-4">
            {t.suppHeading}
          </h2>
          <p className="text-navy/70 dark:text-neutral-300 text-base sm:text-lg">
            {t.suppSubheading}
          </p>
        </div>

        {/* 5-Card Row / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {TRACKS.map((item) => {
            const Icon = item.icon;
            const description = t[item.descKey];

            return (
              <div
                key={item.id}
                className="bg-surface dark:bg-neutral-900 border border-border dark:border-neutral-800 rounded-xl p-6 flex flex-col justify-between hover:border-royal/50 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-royal/10 dark:bg-royal/20 text-royal flex items-center justify-center mb-5">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-lg font-bold text-navy dark:text-white mb-2 leading-snug">
                    {item.name}
                  </h3>

                  <p className="text-xs text-navy/75 dark:text-neutral-400 leading-relaxed mb-6">
                    {description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/50 dark:border-neutral-800">
                  <Link
                    to={`/${lang}/institute/chinese-center/courses?track=${item.slug}`}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-royal hover:text-brand-800 dark:hover:text-brand-400 transition-colors"
                  >
                    <span>{t.suppLearnMore}</span>
                    <ArrowRight size={14} className="ms-1.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
