import React from 'react';
import { Link } from 'react-router-dom';
import { Locale } from '../../../types';
import { ccTranslations } from './translations';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';

interface EnrollmentCtaBandProps {
  lang: Locale;
}

export function EnrollmentCtaBand({ lang }: EnrollmentCtaBandProps) {
  const t = ccTranslations[lang] || ccTranslations.en;
  const isRtl = lang === 'ar' || lang === 'ckb';

  return (
    <section 
      className="py-16 md:py-20 bg-navy text-white relative overflow-hidden" 
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-royal rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-start">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 text-gold text-xs font-black uppercase tracking-widest mb-4">
              <Sparkles size={14} />
              <span>{lang === 'ar' ? 'التسجيل مفتوح' : lang === 'ckb' ? 'تۆمارکردن کراوەیە' : lang === 'zh' ? '现正招生' : 'Admissions Open'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-4">
              {t.ctaBandHeadline}
            </h2>

            <p className="text-base sm:text-lg text-white/80 font-medium">
              {t.ctaBandSubheadline}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 shrink-0">
            <Link
              to={`/${lang}/institute/chinese-center/enroll`}
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wider text-white bg-brand-800 hover:bg-brand-700 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <span>{t.ctaBandPrimary}</span>
              <ArrowRight size={16} className="ms-2 rtl:rotate-180" />
            </Link>

            <Link
              to={`/${lang}/institute/chinese-center/contact`}
              className="inline-flex items-center justify-center px-7 py-4 text-sm font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg backdrop-blur-sm transition-all"
            >
              <PhoneCall size={16} className="me-2" />
              <span>{t.ctaBandSecondary}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
