import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, ExternalLink, Clock, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreStore } from '../../../store/useVisaCentreStore';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';
import { VisaNavHeader } from '../../../components/institute/visa-centre/VisaNavHeader';
import { VisaDisclaimer } from '../../../components/institute/visa-centre/VisaDisclaimer';

export const VisaCentreTypes: React.FC = () => {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const validLang = (lang as Locale) || 'en';
  const { vt } = useVisaCentreI18n(validLang);

  const allVisaCategories = useVisaCentreStore((s) => s.visaCategories);
  const visaCategories = useMemo(() => allVisaCategories.filter((c) => !c.deletedAt), [allVisaCategories]);
  const [selectedDirection, setSelectedDirection] = useState<'all' | 'iraq-to-china' | 'china-to-iraq'>('all');

  const filteredCategories = visaCategories.filter((cat) => {
    if (selectedDirection === 'all') return true;
    return cat.direction === selectedDirection;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <VisaDisclaimer lang={validLang} variant="banner" id="types-top-disclaimer" />
      <VisaNavHeader lang={validLang} />

      <main className="page-container flex-1 py-10 space-y-8">
        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal/10 text-royal text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{vt('navVisaTypes')}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            {vt('typesTitle')}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {vt('typesSubtitle')}
          </p>
        </div>

        {/* Direction Switcher */}
        <div className="flex items-center gap-2 border-b border-border pb-4">
          <button
            type="button"
            onClick={() => setSelectedDirection('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              selectedDirection === 'all'
                ? 'bg-royal text-white shadow-sm'
                : 'border border-border bg-card text-muted-foreground hover:text-foreground'
            }`}
          >
            {vt('filterAll')} ({visaCategories.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedDirection('iraq-to-china')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              selectedDirection === 'iraq-to-china'
                ? 'bg-royal text-white shadow-sm'
                : 'border border-border bg-card text-muted-foreground hover:text-foreground'
            }`}
          >
            {vt('dirIraqToChina')} ({visaCategories.filter((c) => c.direction === 'iraq-to-china').length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedDirection('china-to-iraq')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              selectedDirection === 'china-to-iraq'
                ? 'bg-royal text-white shadow-sm'
                : 'border border-border bg-card text-muted-foreground hover:text-foreground'
            }`}
          >
            {vt('dirChinaToIraq')} ({visaCategories.filter((c) => c.direction === 'china-to-iraq').length})
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 rounded-2xl border border-border bg-card flex flex-col justify-between space-y-4 hover:border-royal/40 transition-all shadow-sm group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-royal/10 text-royal font-black text-lg flex items-center justify-center font-mono">
                    {cat.category}
                  </span>
                  <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">
                    {cat.direction === 'iraq-to-china' ? 'Iraq → China' : 'China → Iraq'}
                  </span>
                </div>

                <div>
                  <h2 className="font-bold text-foreground text-base leading-snug group-hover:text-royal transition-colors">
                    {cat.officialName[validLang] || cat.officialName.en}
                  </h2>
                  <span className="text-[11px] text-muted-foreground">
                    Code: {cat.category}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {cat.shortDescription[validLang] || cat.shortDescription.en}
                </p>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50 text-[11px]">
                  <div>
                    <span className="text-muted-foreground block">Stay Limit:</span>
                    <span className="font-semibold text-foreground">{cat.maxStayDays} Days</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Validity:</span>
                    <span className="font-semibold text-foreground capitalize">{cat.validityOptions.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Processing:</span>
                    <span className="font-semibold text-foreground">{cat.processingTimeStandard}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Express Service:</span>
                    <span className="font-semibold text-royal font-mono">{cat.processingTimeExpress}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                <Link
                  to={`/${validLang}/institute/visa-centre/visa-types/${cat.direction === 'iraq-to-china' ? 'china' : 'iraq'}/${cat.category.toLowerCase()}`}
                  className="font-semibold text-royal hover:underline inline-flex items-center gap-1"
                >
                  <span>Category Dossier Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to={`/${validLang}/institute/visa-centre/apply?category=${cat.category}`}
                  className="px-3 py-1.5 rounded-lg bg-royal hover:bg-royal/90 text-white font-semibold"
                >
                  Apply
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Consular External Reference Notice */}
        <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-3">
          <div className="flex items-center gap-2 text-foreground font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-royal" />
            <span>Authoritative Consular Sources &amp; Public Portals</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All categories detailed above are standardized to public diplomatic directives of the Consulate General of the People&apos;s Republic of China in Erbil and the Iraqi Ministry of Interior. For direct diplomatic inquiries, visit:
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
            <a
              href="http://erbil.china-consulate.gov.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted font-medium text-royal"
            >
              <span>PRC Consulate General Erbil</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://cova.mfa.gov.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted font-medium text-royal"
            >
              <span>China Online Visa Application (COVA)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://moi.gov.iq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted font-medium text-royal"
            >
              <span>Iraqi Ministry of Interior</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </main>

      <div className="page-container pb-8">
        <VisaDisclaimer lang={validLang} variant="card" id="types-footer-disclaimer" />
      </div>
    </div>
  );
};
