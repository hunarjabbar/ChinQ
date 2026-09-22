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
            className="text-royal font-medium hover:underline inline-flex items-center gap-1"
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
        className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/10 space-y-3"
      >
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{vt('navDisclaimer')} &amp; {vt('nonIssuingAuthorityNotice')}</span>
        </div>
        <p className="text-xs md:text-sm text-foreground/80 leading-relaxed">
          {vt('independenceDisclaimer')}
        </p>
        <div className="pt-1">
          <Link
            to={`/${lang}/institute/visa-centre/disclaimer`}
            className="text-xs text-royal font-semibold hover:underline inline-flex items-center gap-1"
          >
            {vt('navDisclaimer')} ({vt('centreTitle')}) →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <aside
      id={id}
      aria-label="Visa Centre Independence Disclaimer"
      className="w-full border-y border-amber-500/20 bg-amber-500/5 py-3 px-4 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="text-xs md:text-sm font-medium text-foreground/90 leading-snug">
              {vt('independenceDisclaimer')}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {vt('nonIssuingAuthorityNotice')}
            </p>
          </div>
        </div>
        <Link
          to={`/${lang}/institute/visa-centre/disclaimer`}
          className="shrink-0 text-xs font-semibold text-royal hover:underline px-3 py-1.5 rounded-md border border-royal/20 hover:bg-royal/5 transition-colors"
        >
          {vt('navDisclaimer')} →
        </Link>
      </div>
    </aside>
  );
};
