import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldAlert, ShieldCheck, Scale, Lock, FileWarning, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';
import { VisaNavHeader } from '../../../components/institute/visa-centre/VisaNavHeader';
import { VisaDisclaimer } from '../../../components/institute/visa-centre/VisaDisclaimer';

export const VisaCentreDisclaimer: React.FC = () => {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const validLang = (lang as Locale) || 'en';
  const { vt } = useVisaCentreI18n(validLang);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <VisaDisclaimer lang={validLang} variant="banner" id="disclaimer-top-disclaimer" />
      <VisaNavHeader lang={validLang} />

      <main className="page-container flex-1 py-10 space-y-10">
        {/* Back Link */}
        <Link
          to={`/${validLang}/institute/visa-centre`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{vt('navHome')}</span>
        </Link>

        {/* Title */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{vt('navDisclaimer')}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Institutional Independence, Legal Status &amp; Non-Issuing Authority Statement
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Statutory disclosure governing the operation, scope, and limitations of the Bilateral Visa Consultancy &amp; Facilitation Centre.
          </p>
        </div>

        {/* Primary Statement Box */}
        <div className="p-8 rounded-3xl border border-amber-500/30 bg-amber-500/10 space-y-4">
          <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400 font-bold text-base">
            <Scale className="w-5 h-5 shrink-0" />
            <span>Full Statutory Statement</span>
          </div>
          <p className="text-sm md:text-base text-foreground font-semibold leading-relaxed">
            {vt('independenceDisclaimer')}
          </p>
          <p className="text-xs text-muted-foreground pt-2 border-t border-amber-500/20">
            {vt('nonIssuingAuthorityNotice')}
          </p>
        </div>

        {/* What the Centre DOES vs DOES NOT DO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DOES DO */}
          <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>What We Provide (Authorized Scope)</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-2.5 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Pre-audit verification of invitation letters, corporate licenses, and travel itineraries against official consular standards.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Assistance completing official government online systems (COVA / MOI Electronic Portals) without data entry errors.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Certified bilingual translations between Chinese, Arabic, Kurdish, and English.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Coordination of official biometric and submission appointments at diplomatic mission counters.</span>
              </li>
            </ul>
          </div>

          {/* DOES NOT DO */}
          <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
              <XCircle className="w-5 h-5" />
              <span>What We DO NOT Do (Strict Prohibitions)</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-2.5 leading-relaxed">
              <li className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>We do NOT issue visas, entry permits, or sovereign endorsements under any circumstances.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>We NEVER guarantee visa approval or bypass official diplomatic assessment.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>We do NOT falsify or provide fictitious invitation letters or commercial sponsorships.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>We have no influence over sovereign consular officers, processing speed, or visa validity decisions.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Data Privacy & PII Handling */}
        <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
          <div className="flex items-center gap-2 text-foreground font-bold text-sm">
            <Lock className="w-4 h-4 text-royal" />
            <span>Encrypted Personally Identifiable Information (PII) Protection Protocol</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            In accordance with Institute Security Directives, all sensitive applicant data—including passport numbers, dates of birth, and identity records—is encrypted using cryptographic algorithms at rest. Staff access to unmasked identity data is strictly restricted to authorized compliance officers and audited in real time with timestamped logging.
          </p>
        </div>
      </main>

      <div className="page-container pb-8">
        <VisaDisclaimer lang={validLang} variant="card" id="disclaimer-footer-disclaimer" />
      </div>
    </div>
  );
};
