import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { GitBranch, Clock, ShieldCheck, CheckCircle2, UserCheck, AlertTriangle } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';
import { VisaNavHeader } from '../../../components/institute/visa-centre/VisaNavHeader';
import { VisaDisclaimer } from '../../../components/institute/visa-centre/VisaDisclaimer';
import { VisaProcessDiagram } from '../../../components/institute/visa-centre/VisaProcessDiagram';

export const VisaCentreProcess: React.FC = () => {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const validLang = (lang as Locale) || 'en';
  const { vt } = useVisaCentreI18n(validLang);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <VisaDisclaimer lang={validLang} variant="banner" id="process-top-disclaimer" />
      <VisaNavHeader lang={validLang} />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-10 space-y-12 w-full">
        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal/10 text-royal text-xs font-semibold">
            <GitBranch className="w-3.5 h-3.5" />
            <span>{vt('navProcess')}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            {vt('processTitle')}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {vt('processSubtitle')}
          </p>
        </div>

        {/* Process Diagram Component */}
        <section className="space-y-4">
          <VisaProcessDiagram lang={validLang} id="page-process-diagram" />
        </section>

        {/* Interview & Biometrics Protocol */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="flex items-center gap-2 text-foreground font-bold text-base">
              <UserCheck className="w-5 h-5 text-royal" />
              <span>Consular Biometrics Protocol (Erbil &amp; Baghdad)</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-2.5 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>All applicants aged 14 to 70 must appear in person for ten-finger biometric scans unless holding prior verified biometrics within 5 years.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Arrive 15 minutes prior to confirmed appointment time with original passport, printed appointment slip, and barcode confirmation.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Ensure fingertips are free from injuries, henna, or bandages to prevent biometric scanner rejection.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="flex items-center gap-2 text-foreground font-bold text-base">
              <Clock className="w-5 h-5 text-royal" />
              <span>Turnaround Benchmarks &amp; Expedited Processing</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-2.5 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-royal shrink-0 mt-0.5" />
                <span><strong>Regular Service:</strong> 4 working days from successful consular counter deposit.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-royal shrink-0 mt-0.5" />
                <span><strong>Express Service:</strong> 2 to 3 working days (subject to consular officer approval and express tariff).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-royal shrink-0 mt-0.5" />
                <span><strong>Rush Service:</strong> Same-day or 24-hour collection for documented humanitarian or state emergencies only.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="p-8 rounded-2xl border border-royal/20 bg-royal/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Ready to pre-audit your visa application?</h2>
            <p className="text-xs text-muted-foreground">Our bilingual advisors review your commercial invitations and COVA forms in advance.</p>
          </div>
          <Link
            to={`/${validLang}/institute/visa-centre/apply`}
            className="px-5 py-2.5 rounded-xl bg-royal hover:bg-royal/90 text-white text-xs font-semibold shrink-0"
          >
            {vt('requestServiceBtn')}
          </Link>
        </div>
      </main>

      <VisaDisclaimer lang={validLang} variant="card" id="process-footer-disclaimer" />
    </div>
  );
};
