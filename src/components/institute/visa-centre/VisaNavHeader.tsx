import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FileCheck, Calendar, Search, Compass, ShieldCheck } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';

interface VisaNavHeaderProps {
  lang: Locale;
}

export const VisaNavHeader: React.FC<VisaNavHeaderProps> = ({ lang }) => {
  const { vt } = useVisaCentreI18n(lang);
  const location = useLocation();

  const navLinks = [
    { to: `/${lang}/institute/visa-centre`, label: vt('navHome'), end: true },
    { to: `/${lang}/institute/visa-centre/about`, label: vt('navAbout') },
    { to: `/${lang}/institute/visa-centre/services`, label: vt('navServices') },
    { to: `/${lang}/institute/visa-centre/visa-types`, label: vt('navVisaTypes') },
    { to: `/${lang}/institute/visa-centre/requirements`, label: vt('navRequirements') },
    { to: `/${lang}/institute/visa-centre/fees`, label: vt('navFees') },
    { to: `/${lang}/institute/visa-centre/process`, label: vt('navProcess') },
    { to: `/${lang}/institute/visa-centre/appointments`, label: vt('navAppointments') },
    { to: `/${lang}/institute/visa-centre/news`, label: vt('navNews') },
    { to: `/${lang}/institute/visa-centre/faq`, label: vt('navFaq') },
    { to: `/${lang}/institute/visa-centre/contact`, label: vt('navContact') }
  ];

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-md">
      {/* Top Banner / Breadcrumb & Positioning Row */}
      <div className="border-b border-border/50 py-2 bg-muted/30">
        <div className="page-container">
          <div className="breadcrumb justify-between">
            <div className="breadcrumb__item flex items-center gap-2 flex-wrap">
              <Link
                to={`/${lang}/institute`}
                className="text-muted-foreground hover:text-royal transition-colors text-xs font-medium truncate max-w-xs"
              >
                Chinese Institute for Strategic and Economic Studies
              </Link>
              <span className="text-muted-foreground/60 text-xs">/</span>
              <span className="inline-flex items-center gap-1.5 text-royal font-bold text-xs shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
                {vt('heroBadge')}
              </span>
              <span className="hidden md:inline text-muted-foreground/60 text-xs">|</span>
              <span className="text-muted-foreground font-medium text-xs truncate max-w-md hidden sm:inline">
                {vt('positioningStatement')}
              </span>
            </div>

            <div className="breadcrumb__item flex items-center gap-3 shrink-0">
              <Link
                to={`/${lang}/institute/visa-centre/track`}
                className="inline-flex items-center justify-center gap-1.5 text-royal font-bold hover:underline text-xs min-h-[44px] px-2"
              >
                <Search className="w-3.5 h-3.5" />
                {vt('navTrack')}
              </Link>
              <Link
                to={`/${lang}/hub/institute/visa-centre`}
                className="inline-flex items-center justify-center gap-1 text-muted-foreground hover:text-foreground font-bold text-xs min-h-[44px] px-2"
              >
                <Compass className="w-3.5 h-3.5" />
                {vt('hubTitle')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand & Actions Bar */}
      <div className="page-container py-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <Link
            to={`/${lang}/institute/visa-centre`}
            className="group flex flex-col gap-0.5"
          >
            <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground group-hover:text-royal transition-colors">
              {vt('centreTitle')}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              {vt('centreSubtitle')}
            </span>
          </Link>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
          <Link
            to={`/${lang}/institute/visa-centre/appointments`}
            className="inline-flex items-center min-h-[44px] px-4 py-2 rounded-lg border border-border bg-background hover:bg-muted text-xs font-semibold text-foreground transition-all focus-visible:outline-2 focus-visible:outline-royal active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4 text-royal ltr:mr-1.5 rtl:ml-1.5" />
            {vt('bookAppointmentBtn')}
          </Link>
          <Link
            to={`/${lang}/institute/visa-centre/apply`}
            className="inline-flex items-center min-h-[44px] px-4 py-2 rounded-lg bg-royal hover:bg-royal/90 text-white text-xs font-semibold transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-white active:scale-[0.98]"
          >
            <FileCheck className="w-4 h-4 ltr:mr-1.5 rtl:ml-1.5" />
            {vt('requestServiceBtn')}
          </Link>
        </div>
      </div>

      {/* Tab Navigation Row */}
      <div className="page-container">
        <nav aria-label="Visa Centre Navigation" className="tabs" role="tablist">
          {navLinks.map((link) => {
            const isSelected = link.end
              ? location.pathname === link.to
              : location.pathname.startsWith(link.to);
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className="tab"
                role="tab"
                aria-selected={isSelected}
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

