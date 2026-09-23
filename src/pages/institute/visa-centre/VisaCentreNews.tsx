import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Bell, Calendar, Tag, ArrowRight, ShieldAlert, Filter } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreStore } from '../../../store/useVisaCentreStore';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';
import { VisaNavHeader } from '../../../components/institute/visa-centre/VisaNavHeader';
import { VisaDisclaimer } from '../../../components/institute/visa-centre/VisaDisclaimer';

export const VisaCentreNews: React.FC = () => {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const validLang = (lang as Locale) || 'en';
  const { vt } = useVisaCentreI18n(validLang);

  const allAnnouncements = useVisaCentreStore((s) => s.announcements);
  const announcements = useMemo(() => allAnnouncements.filter((a) => !a.deletedAt), [allAnnouncements]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredAnnouncements = announcements.filter((a) => {
    if (selectedCategory === 'all') return true;
    return a.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <VisaDisclaimer lang={validLang} variant="banner" id="news-top-disclaimer" />
      <VisaNavHeader lang={validLang} />

      <main className="page-container flex-1 py-10 space-y-8">
        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal/10 text-royal text-xs font-semibold">
            <Bell className="w-3.5 h-3.5" />
            <span>{vt('navNews')}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Consular Policy Bulletins &amp; Regulatory Notices
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Direct notifications regarding bilateral visa policy revisions, consular holiday closures, fee adjustments, and biometric protocols.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 border-b border-border pb-4 overflow-x-auto">
          {['all', 'policy', 'notice', 'holiday', 'update'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                selectedCategory === cat
                  ? 'bg-royal text-white'
                  : 'border border-border bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat === 'all' ? vt('filterAll') : cat}
            </button>
          ))}
        </div>

        {/* Announcements List */}
        <div className="space-y-6">
          {filteredAnnouncements.map((item) => (
            <article
              key={item.id}
              className="p-6 md:p-8 rounded-2xl border border-border bg-card space-y-4 hover:border-royal/30 transition-all shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-royal/10 text-royal">
                    {item.category}
                  </span>
                  {item.pinned && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      Official Advisory
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(item.effectiveDate || item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <h2 className="text-lg md:text-xl font-bold text-foreground">
                {item.title[validLang] || item.title.en}
              </h2>

              <p className="text-xs md:text-sm text-foreground/80 leading-relaxed font-normal whitespace-pre-line">
                {item.body[validLang] || item.body.en}
              </p>
            </article>
          ))}
        </div>
      </main>

      <div className="page-container pb-8">
        <VisaDisclaimer lang={validLang} variant="card" id="news-footer-disclaimer" />
      </div>
    </div>
  );
};
