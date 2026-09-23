import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Locale } from '../../../types';
import { ccTranslations } from './translations';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';

interface FaqPreviewProps {
  lang: Locale;
}

export function FaqPreview({ lang }: FaqPreviewProps) {
  const t = ccTranslations[lang] || ccTranslations.en;
  const isRtl = lang === 'ar' || lang === 'ckb';

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  const faqItems = [
    { q: t.faqQ1, a: t.faqA1 },
    { q: t.faqQ2, a: t.faqA2 },
    { q: t.faqQ3, a: t.faqA3 },
    { q: t.faqQ4, a: t.faqA4 },
    { q: t.faqQ5, a: t.faqA5 },
    { q: t.faqQ6, a: t.faqA6 }
  ];

  return (
    <section id="faq-preview" className="py-20 bg-surface dark:bg-neutral-900 border-b border-border" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-royal dark:text-sky-400 mb-3">
            <HelpCircle size={16} />
            <span>CISE Student Advisory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy dark:text-white uppercase tracking-tight mb-4">
            {t.faqHeading}
          </h2>
          <p className="text-navy/70 dark:text-neutral-300 text-base sm:text-lg">
            {t.faqSubheading}
          </p>
        </div>

        {/* Collapsible FAQ List */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            const faqId = `faq-item-${idx}`;

            return (
              <div
                key={idx}
                className="bg-card dark:bg-neutral-800 border border-border dark:border-neutral-700 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  id={`btn-${faqId}`}
                  aria-expanded={isOpen}
                  aria-controls={faqId}
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-start text-base font-bold text-navy dark:text-white hover:text-royal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royal"
                >
                  <span className="pe-4">{item.q}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-royal' : ''}`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={faqId}
                    role="region"
                    aria-labelledby={`btn-${faqId}`}
                    className="px-6 pb-6 text-sm text-navy/80 dark:text-neutral-300 leading-relaxed border-t border-border/50 dark:border-neutral-700/50 pt-4"
                  >
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View All FAQs Link */}
        <div className="text-center mt-10">
          <Link
            to={`/${lang}/institute/chinese-center/faq`}
            className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-royal hover:text-brand-800 dark:hover:text-brand-400 transition-colors"
          >
            <span>{t.faqViewAll}</span>
            <ArrowRight size={14} className="ms-1.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
