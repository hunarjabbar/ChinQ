import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Info } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';

interface VisaDisclaimerProps {
  lang: Locale;
  variant?: 'banner' | 'card' | 'inline' | 'full';
  id?: string;
}

export const VisaDisclaimer: React.FC<VisaDisclaimerProps> = ({
  lang,
  variant = 'banner',
  id = 'visa-centre-disclaimer'
}) => {
  const { vt } = useVisaCentreI18n(lang);

  if (variant === 'inline') {
    return (
      <div
        id={id}
        className="flex items-start gap-2.5 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 text-xs text-muted-foreground leading-relaxed"
      >
        <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <span>{vt('disclaimerShort')} </span>
          <Link
            to={`/${lang}/institute/visa-centre/disclaimer`}
            className="text-royal font-medium hover:underline inline-flex items-center gap-1 min-h-[44px]"
          >
            {vt('navDisclaimer')} →
          </Link>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div
        id={id}
        className="disclaimer-bar border-amber-500/30 bg-amber-500/10 dark:bg-amber-950/20"
      >
        <div className="disclaimer-bar__text space-y-2">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{vt('navDisclaimer')} &amp; {vt('nonIssuingAuthorityNotice')}</span>
          </div>
          <p className="text-xs md:text-sm text-foreground/80 leading-relaxed">
            {vt('independenceDisclaimer')}
          </p>
        </div>
        <div className="disclaimer-bar__action max-w-full">
          <Link
            to={`/${lang}/institute/visa-centre/disclaimer`}
            className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 text-xs text-royal font-semibold hover:underline rounded-lg border border-royal/20 hover:bg-royal/5 transition-colors focus-visible:outline-2 focus-visible:outline-royal max-w-full text-center"
          >
            {vt('navDisclaimer')} →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <aside
      id={id}
      aria-label="Visa Centre Independence Disclaimer"
      className="w-full border-y border-amber-500/20 bg-amber-500/5 py-4 transition-colors"
    >
      <div className="page-container">
        <div className="disclaimer-bar border-amber-500/30 bg-amber-500/10 dark:bg-amber-950/20">
          <div className="flex items-start gap-3 disclaimer-bar__text">
            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-foreground/90 leading-snug">
                {vt('independenceDisclaimer')}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {vt('nonIssuingAuthorityNotice')}
              </p>
            </div>
          </div>
          <div className="disclaimer-bar__action">
            <Link
              to={`/${lang}/institute/visa-centre/disclaimer`}
              className="inline-flex items-center min-h-[44px] px-4 py-2 text-xs font-semibold text-royal hover:underline rounded-lg border border-royal/20 hover:bg-royal/5 transition-colors focus-visible:outline-2 focus-visible:outline-royal"
            >
              {vt('navDisclaimer')} →
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};
