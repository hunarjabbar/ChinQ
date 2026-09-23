import React from 'react';
import { Link } from 'react-router-dom';
import { Locale } from '../../../types';
import { ccTranslations } from './translations';
import { ArrowRight, BookOpen, GraduationCap, ShieldCheck, ChevronRight } from 'lucide-react';

interface ChineseCenterHeroProps {
  lang: Locale;
}

export function ChineseCenterHero({ lang }: ChineseCenterHeroProps) {
  const t = ccTranslations[lang] || ccTranslations.en;
  const isRtl = lang === 'ar' || lang === 'ckb';

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-br from-navy via-[#0A1A2F] to-[#024978] text-white py-16 md:py-24 border-b border-border/20"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Decorative ambient elements */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-0 end-0 w-96 h-96 bg-royal/40 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 start-0 w-80 h-80 bg-brand-800/30 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center flex-wrap gap-2 text-xs font-semibold text-white/70">
            <li>
              <Link to={`/${lang}`} className="hover:text-white transition-colors">
                {t.breadcrumbIca}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={14} className={isRtl ? 'rotate-180 text-white/40' : 'text-white/40'} />
            </li>
            <li>
              <Link to={`/${lang}/institute`} className="hover:text-white transition-colors">
                {t.breadcrumbInstitute}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={14} className={isRtl ? 'rotate-180 text-white/40' : 'text-white/40'} />
            </li>
            <li className="text-white font-bold" aria-current="page">
              {t.breadcrumbChineseCentre}
            </li>
          </ol>
        </nav>

        {/* Hero Content */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-gold text-xs font-black uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
            <span>{t.heroEyebrow}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-tight">
            {t.heroHeadline}
          </h1>

          <p className="text-lg sm:text-xl text-white/85 font-medium leading-relaxed mb-10 max-w-3xl">
            {t.heroSubheadline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link
              to={`/${lang}/institute/chinese-center/enroll`}
              className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-brand-800 hover:bg-brand-700 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <span>{t.heroPrimaryCta}</span>
              <ArrowRight size={16} className="ms-2 rtl:rotate-180" />
            </Link>

            <Link
              to={`/${lang}/institute/chinese-center/courses`}
              className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-lg backdrop-blur-sm transition-all"
            >
              <span>{t.heroSecondaryCta}</span>
              <ArrowRight size={16} className="ms-2 rtl:rotate-180" />
            </Link>
          </div>

          {/* Value Props Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/15 text-xs text-white/80 font-semibold">
            <div className="flex items-center gap-2.5">
              <GraduationCap size={18} className="text-gold shrink-0" />
              <span>{t.heroPillStandard}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <BookOpen size={18} className="text-gold shrink-0" />
              <span>{t.heroPillTesting}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-gold shrink-0" />
              <span>{t.heroPillCert}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
