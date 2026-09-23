import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, Clock, ShieldCheck, CheckCircle2, AlertTriangle, FileText, Calendar } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreStore } from '../../../store/useVisaCentreStore';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';
import { VisaNavHeader } from '../../../components/institute/visa-centre/VisaNavHeader';
import { VisaDisclaimer } from '../../../components/institute/visa-centre/VisaDisclaimer';

export const VisaCentreCategoryDetail: React.FC = () => {
  const { lang = 'en', direction = 'china', category } = useParams<{ lang: Locale; direction: string; category: string }>();
  const validLang = (lang as Locale) || 'en';
  const { vt } = useVisaCentreI18n(validLang);

  const visaCategories = useVisaCentreStore((s) => s.visaCategories);
  const found = visaCategories.find((c) => c.category.toLowerCase() === category?.toLowerCase() && !c.deletedAt);

  if (!found) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <VisaNavHeader lang={validLang} />
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4 text-center">
          <h1 className="text-xl font-bold">Category Dossier Not Found</h1>
          <p className="text-xs text-muted-foreground">The specified visa category could not be located in the bilateral registry.</p>
          <Link to={`/${validLang}/institute/visa-centre/visa-types`} className="text-xs text-royal font-semibold hover:underline">
            ← Return to Visa Types Reference Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <VisaDisclaimer lang={validLang} variant="banner" id="cat-detail-top-disclaimer" />
      <VisaNavHeader lang={validLang} />

      <main className="page-container flex-1 py-10 space-y-8">
        {/* Back Link */}
        <Link
          to={`/${validLang}/institute/visa-centre/visa-types`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{vt('navVisaTypes')}</span>
        </Link>

        {/* Hero Card */}
        <div className="p-8 rounded-3xl border border-border bg-card space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-10 h-10 rounded-xl bg-royal/10 text-royal font-black text-xl flex items-center justify-center font-mono">
                  {found.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-muted text-foreground">
                  {found.direction === 'iraq-to-china' ? 'Iraq → China (PRC Consular Code)' : 'China → Iraq (Iraqi Consular Code)'}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">
                {found.officialName[validLang] || found.officialName.en}
              </h1>
            </div>

            <div className="p-4 rounded-2xl bg-muted/40 border border-border text-end shrink-0">
              <span className="text-[11px] text-muted-foreground block">Consular &amp; Service Fee Note</span>
              <div className="text-sm font-bold font-mono text-royal">
                {found.governmentFeeNote[validLang] || found.governmentFeeNote.en}
              </div>
              <span className="text-[11px] text-muted-foreground">Standard consular turnaround</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-foreground uppercase tracking-wider block">Official Scope &amp; Purpose:</span>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              {found.shortDescription[validLang] || found.shortDescription.en}
            </p>
          </div>

          {/* Key Parameters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border/50">
              <span className="text-muted-foreground block text-[10px]">Maximum Stay</span>
              <span className="font-bold text-foreground text-sm">{found.maxStayDays} Days</span>
            </div>
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border/50">
              <span className="text-muted-foreground block text-[10px]">Validity Options</span>
              <span className="font-bold text-foreground text-sm capitalize">{found.validityOptions.join(', ')}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border/50">
              <span className="text-muted-foreground block text-[10px]">Processing Timeline</span>
              <span className="font-bold text-foreground text-sm">{found.processingTimeStandard}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border/50">
              <span className="text-muted-foreground block text-[10px]">Express Service</span>
              <span className="font-bold text-foreground text-sm">Available (2-3 Days)</span>
            </div>
          </div>

          {/* Documentation Checklist */}
          {found.requirements?.[validLang] && found.requirements[validLang].length > 0 && (
            <div className="space-y-3 pt-4 border-t border-border">
              <span className="text-sm font-bold text-foreground block">
                Required Consular Documentation:
              </span>
              <div className="space-y-2">
                {found.requirements[validLang].map((req, i) => (
                  <div key={i} className="p-3 rounded-xl bg-muted/40 border border-border/60 flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Consular counter requirements are subject to sovereign verification upon interview.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                to={`/${validLang}/institute/visa-centre/appointments`}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted font-semibold text-center text-foreground"
              >
                {vt('bookAppointmentBtn')}
              </Link>
              <Link
                to={`/${validLang}/institute/visa-centre/apply?category=${found.category}`}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-royal hover:bg-royal/90 text-white font-semibold text-center shadow-sm"
              >
                {vt('requestServiceBtn')}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <div className="page-container pb-8">
        <VisaDisclaimer lang={validLang} variant="card" id="cat-detail-footer-disclaimer" />
      </div>
    </div>
  );
};
