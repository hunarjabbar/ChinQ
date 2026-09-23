import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Briefcase, Clock, CheckCircle2, ArrowLeft, FileCheck, Calendar, PhoneCall, ShieldCheck } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreStore } from '../../../store/useVisaCentreStore';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';
import { VisaNavHeader } from '../../../components/institute/visa-centre/VisaNavHeader';
import { VisaDisclaimer } from '../../../components/institute/visa-centre/VisaDisclaimer';

export const VisaCentreServiceDetail: React.FC = () => {
  const { lang = 'en', slug } = useParams<{ lang: Locale; slug: string }>();
  const validLang = (lang as Locale) || 'en';
  const { vt } = useVisaCentreI18n(validLang);
  const navigate = useNavigate();

  const services = useVisaCentreStore((s) => s.services);
  const service = services.find((s) => s.slug === slug && !s.deletedAt);

  if (!service) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <VisaNavHeader lang={validLang} />
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4 text-center">
          <h1 className="text-xl font-bold">Service Not Found</h1>
          <p className="text-xs text-muted-foreground">The requested visa facilitation service does not exist or has been archived.</p>
          <Link to={`/${validLang}/institute/visa-centre/services`} className="text-xs text-royal font-semibold hover:underline">
            ← Return to Services Catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <VisaDisclaimer lang={validLang} variant="banner" id="service-detail-top-disclaimer" />
      <VisaNavHeader lang={validLang} />

      <main className="page-container flex-1 py-10 space-y-8">
        {/* Back link */}
        <Link
          to={`/${validLang}/institute/visa-centre/services`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{vt('navServices')}</span>
        </Link>

        {/* Hero Card */}
        <div className="p-8 rounded-3xl border border-border bg-card space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-royal/10 text-royal">
                {service.category.replace('-', ' ').toUpperCase()}
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">
                {service.title[validLang] || service.title.en}
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground font-medium">
                Direction: {service.direction === 'iraq-to-china' ? vt('dirIraqToChina') : service.direction === 'china-to-iraq' ? vt('dirChinaToIraq') : vt('dirBoth')}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-muted/40 border border-border text-end shrink-0">
              <span className="text-[11px] text-muted-foreground block">Advisory &amp; Review Fee</span>
              <div className="text-2xl font-bold font-mono text-royal">
                ${service.priceUSD} <span className="text-xs font-normal text-muted-foreground">USD</span>
              </div>
              <div className="text-xs font-mono text-muted-foreground">
                {service.priceIQD.toLocaleString()} IQD
              </div>
            </div>
          </div>

          {/* Description & Target Audience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm">
            <div className="space-y-2">
              <span className="font-bold text-foreground block">Service Overview</span>
              <p className="text-muted-foreground leading-relaxed">
                {service.description[validLang] || service.description.en}
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-foreground block">Target Applicants &amp; Profiles</span>
              <p className="text-muted-foreground leading-relaxed">
                {service.whoItIsFor[validLang] || service.whoItIsFor.en}
              </p>
            </div>
          </div>

          {/* Deliverables */}
          {service.deliverables?.[validLang] && (
            <div className="space-y-3 pt-4 border-t border-border">
              <span className="font-bold text-foreground text-sm block">Key Deliverables &amp; Inclusions:</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.deliverables[validLang].map((del, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-muted/40 border border-border/60 flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-royal shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{del}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline & Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 text-royal" />
              <span>Standard Timeline: <strong>{service.timeline[validLang] || service.timeline.en}</strong></span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                to={`/${validLang}/institute/visa-centre/appointments`}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted font-semibold text-center text-foreground"
              >
                {vt('bookAppointmentBtn')}
              </Link>
              <Link
                to={`/${validLang}/institute/visa-centre/apply?service=${service.slug}`}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-royal hover:bg-royal/90 text-white font-semibold text-center shadow-sm"
              >
                {vt('requestServiceBtn')}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <div className="page-container pb-8">
        <VisaDisclaimer lang={validLang} variant="card" id="service-detail-footer-disclaimer" />
      </div>
    </div>
  );
};
