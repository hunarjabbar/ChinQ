import React from 'react';
import { Link } from 'react-router-dom';
import { Locale } from '../../../types';
import { ccTranslations } from './translations';
import { ArrowRight, BookMarked, Clock, CheckCircle2, Award } from 'lucide-react';

interface HskLevelsGridProps {
  lang: Locale;
}

interface HskLevelData {
  id: string;
  level: string;
  slug: string;
  bandKey: 'hskBandElementary' | 'hskBandIntermediate' | 'hskBandAdvanced';
  words: string;
  hours: string;
  prereq: string; // 'none' or 'HSK 1', etc.
}

const HSK_LEVELS: HskLevelData[] = [
  {
    id: 'hsk-1',
    level: 'HSK 1',
    slug: 'hsk-1',
    bandKey: 'hskBandElementary',
    words: '500',
    hours: '60–80',
    prereq: 'none'
  },
  {
    id: 'hsk-2',
    level: 'HSK 2',
    slug: 'hsk-2',
    bandKey: 'hskBandElementary',
    words: '772',
    hours: '60–80',
    prereq: 'HSK 1'
  },
  {
    id: 'hsk-3',
    level: 'HSK 3',
    slug: 'hsk-3',
    bandKey: 'hskBandIntermediate',
    words: '973',
    hours: '80–100',
    prereq: 'HSK 2'
  },
  {
    id: 'hsk-4',
    level: 'HSK 4',
    slug: 'hsk-4',
    bandKey: 'hskBandIntermediate',
    words: '1,000',
    hours: '100–120',
    prereq: 'HSK 3'
  },
  {
    id: 'hsk-5',
    level: 'HSK 5',
    slug: 'hsk-5',
    bandKey: 'hskBandAdvanced',
    words: '1,071',
    hours: '120–140',
    prereq: 'HSK 4'
  },
  {
    id: 'hsk-6',
    level: 'HSK 6',
    slug: 'hsk-6',
    bandKey: 'hskBandAdvanced',
    words: '1,140',
    hours: '140–160',
    prereq: 'HSK 5'
  },
  {
    id: 'hsk-7-9',
    level: 'HSK 7–9',
    slug: 'hsk-7-9',
    bandKey: 'hskBandAdvanced',
    words: '5,636',
    hours: '200+',
    prereq: 'HSK 6'
  }
];

export function HskLevelsGrid({ lang }: HskLevelsGridProps) {
  const t = ccTranslations[lang] || ccTranslations.en;
  const isRtl = lang === 'ar' || lang === 'ckb';

  return (
    <section id="hsk-levels" className="py-20 bg-surface dark:bg-neutral-900 border-b border-border" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400 mb-3">
            <Award size={16} />
            <span>HSK 3.0 Curriculum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy dark:text-white uppercase tracking-tight mb-4">
            {t.hskHeading}
          </h2>
          <p className="text-navy/70 dark:text-neutral-300 text-base sm:text-lg">
            {t.hskSubheading}
          </p>
        </div>

        {/* 7-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {HSK_LEVELS.map((item) => {
            const bandLabel = t[item.bandKey];
            const prereqLabel = item.prereq === 'none' ? t.hskPrereqNone : item.prereq;

            return (
              <div
                key={item.id}
                className="bg-card dark:bg-neutral-800 border border-border dark:border-neutral-700 rounded-xl p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-200"
              >
                <div>
                  {/* Top Row: Level & Band */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-navy dark:text-white tracking-tight">
                      {item.level}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 dark:bg-neutral-700 text-slate-700 dark:text-neutral-200">
                      {bandLabel}
                    </span>
                  </div>

                  {/* Metrics Table */}
                  <div className="space-y-3 py-4 border-y border-border/60 dark:border-neutral-700/60 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500 dark:text-neutral-400 font-medium flex items-center gap-1.5">
                        <BookMarked size={14} className="text-royal shrink-0" />
                        {t.hskCumulativeWords}
                      </span>
                      <span className="font-bold text-navy dark:text-white tabular-nums">
                        {item.words}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500 dark:text-neutral-400 font-medium flex items-center gap-1.5">
                        <Clock size={14} className="text-gold shrink-0" />
                        {t.hskTargetHours}
                      </span>
                      <span className="font-bold text-navy dark:text-white tabular-nums">
                        {item.hours}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500 dark:text-neutral-400 font-medium flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-sage shrink-0" />
                        {t.hskPrerequisite}
                      </span>
                      <span className="font-bold text-navy dark:text-white">
                        {prereqLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-2">
                  <Link
                    to={`/${lang}/institute/chinese-center/courses?level=${item.slug}`}
                    className="inline-flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-royal dark:text-sky-400 hover:text-brand-800 dark:hover:text-brand-300 transition-colors"
                  >
                    <span>{t.hskViewCourse}</span>
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
