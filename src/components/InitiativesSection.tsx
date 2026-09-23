import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Locale } from '../types';
import { useI18n } from '../hooks/useI18n';

interface Initiative {
  id: string;
  eyebrow: string;
  headline: string;
  description: string;
  cta: string;
  path: string;
}

export function InitiativesSection({ lang }: { lang: Locale }) {
  const { t } = useI18n(lang);

  const initiatives: Initiative[] = [
    {
      id: 'summit',
      eyebrow: t('summit.section.eyebrow'),
      headline: t('summit.section.headline'),
      description: t('summit.section.body'),
      cta: t('home.initiatives.learnMore'),
      path: `/${lang}/summit`
    },
    {
      id: 'chinese-center',
      eyebrow: t('chineseCentre.section.eyebrow'),
      headline: t('chineseCentre.section.headline'),
      description: t('chineseCentre.section.body'),
      cta: t('home.initiatives.learnMore'),
      path: `/${lang}/institute/chinese-center`
    },
    {
      id: 'visa-centre',
      eyebrow: t('visaCentre.section.eyebrow'),
      headline: t('visaCentre.section.headline'),
      description: t('visaCentre.section.body'),
      cta: t('home.initiatives.learnMore'),
      path: `/${lang}/institute/visa-centre`
    }
  ];

  return (
    <section id="initiatives" className="py-20 w-full bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-navy uppercase tracking-tighter mb-4">{t('home.initiatives.heading')}</h2>
          <p className="text-navy/70 text-lg">{t('home.initiatives.subheading')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initiatives.map((item) => (
            <div
              key={item.id}
              className="initiative-card bg-card border border-border p-8 rounded-xl transition-all duration-300 flex flex-col"
            >
              <span className="text-gold-text text-xs uppercase tracking-widest font-bold mb-3">{item.eyebrow}</span>
              <h3 className="text-xl font-black text-navy mb-4 uppercase">{item.headline}</h3>
              <p className="text-navy/80 mb-6 flex-grow">{item.description}</p>
              <Link to={item.path} className="inline-flex items-center text-royal font-bold hover:gap-2 transition-all">
                {item.cta} <ArrowRight className="ms-2" size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
