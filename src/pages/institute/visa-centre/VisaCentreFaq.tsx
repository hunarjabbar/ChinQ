import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ChevronUp, Search, ShieldCheck, ArrowRight } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreStore } from '../../../store/useVisaCentreStore';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';
import { VisaNavHeader } from '../../../components/institute/visa-centre/VisaNavHeader';
import { VisaDisclaimer } from '../../../components/institute/visa-centre/VisaDisclaimer';

export const VisaCentreFaq: React.FC = () => {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const validLang = (lang as Locale) || 'en';
  const { vt } = useVisaCentreI18n(validLang);

  const allFaqs = useVisaCentreStore((s) => s.faqs);
  const faqs = useMemo(() => allFaqs.filter((f) => !f.deletedAt), [allFaqs]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ [faqs[0]?.id]: true });

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = faqs.filter((f) => {
    const q = (f.question[validLang] || f.question.en).toLowerCase();
    const a = (f.answer[validLang] || f.answer.en).toLowerCase();
    return q.includes(searchTerm.toLowerCase()) || a.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <VisaDisclaimer lang={validLang} variant="banner" id="faq-top-disclaimer" />
      <VisaNavHeader lang={validLang} />

      <main className="page-container flex-1 py-10 space-y-8">
        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal/10 text-royal text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{vt('navFaq')}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Frequently Asked Questions &amp; Advisory Guidelines
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Essential answers on consular authority, official Chinese commercial invitation letters, biometrics, fee structures, and re-application protocols.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search FAQs by keywords (e.g. invitation, authority, biometric, refund)..."
            className="w-full ps-9 pe-4 py-2.5 rounded-xl border border-border bg-card text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
          />
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((f) => {
            const isOpen = !!openIds[f.id];
            return (
              <div
                key={f.id}
                className="rounded-2xl border border-border bg-card overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(f.id)}
                  className="w-full p-5 text-start flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-royal/10 text-royal text-xs font-bold flex items-center justify-center shrink-0">
                      Q
                    </span>
                    <span className="font-semibold text-foreground text-sm leading-snug">
                      {f.question[validLang] || f.question.en}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-muted-foreground leading-relaxed border-t border-border/50 ps-14">
                    {f.answer[validLang] || f.answer.en}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="p-6 rounded-2xl border border-royal/20 bg-royal/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-foreground">Have a specific consular case or question?</h2>
            <p className="text-xs text-muted-foreground">Reach our bilingual consultation desk directly for personal case pre-audit.</p>
          </div>
          <Link
            to={`/${validLang}/institute/visa-centre/contact`}
            className="px-4 py-2 rounded-xl bg-royal hover:bg-royal/90 text-white text-xs font-semibold shrink-0"
          >
            {vt('navContact')} →
          </Link>
        </div>
      </main>

      <div className="page-container pb-8">
        <VisaDisclaimer lang={validLang} variant="card" id="faq-footer-disclaimer" />
      </div>
    </div>
  );
};
