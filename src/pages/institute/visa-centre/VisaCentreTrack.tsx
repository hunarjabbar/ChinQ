import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Search, ShieldCheck, HelpCircle } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';
import { VisaNavHeader } from '../../../components/institute/visa-centre/VisaNavHeader';
import { VisaDisclaimer } from '../../../components/institute/visa-centre/VisaDisclaimer';
import { VisaApplicationTracker } from '../../../components/institute/visa-centre/VisaApplicationTracker';

export const VisaCentreTrack: React.FC = () => {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const validLang = (lang as Locale) || 'en';
  const { vt } = useVisaCentreI18n(validLang);
  const [searchParams] = useSearchParams();
  const refQuery = searchParams.get('ref') || '';

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <VisaDisclaimer lang={validLang} variant="banner" id="track-top-disclaimer" />
      <VisaNavHeader lang={validLang} />

      <main className="page-container flex-1 py-10 space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal/10 text-royal text-xs font-semibold">
            <Search className="w-3.5 h-3.5" />
            <span>{vt('navTrack')}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            {vt('trackerTitle')}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {vt('trackerSubtitle')}
          </p>
        </div>

        {/* Tracker Core */}
        <VisaApplicationTracker lang={validLang} initialReferenceId={refQuery} id="main-application-tracker" />

        {/* Assistance Notes */}
        <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-3">
          <div className="flex items-center gap-2 text-foreground font-bold text-sm">
            <HelpCircle className="w-4 h-4 text-royal" />
            <span>Where do I find my Reference ID?</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your Reference ID is a unique alphanumeric identifier assigned upon submission (formatted as <code>VC-YYYY-NNNNNN</code>, e.g., <code>VC-2026-481920</code>). It is printed on your submission receipt and stated in the subject line of your initial confirmation dispatch.
          </p>
        </div>
      </main>

      <div className="page-container pb-8">
        <VisaDisclaimer lang={validLang} variant="card" id="track-footer-disclaimer" />
      </div>
    </div>
  );
};
