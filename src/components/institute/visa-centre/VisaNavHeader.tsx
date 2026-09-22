import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FileCheck, Calendar, Search, HelpCircle, Compass, ShieldCheck } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';

interface VisaNavHeaderProps {
  lang: Locale;
}

export const VisaNavHeader: React.FC<VisaNavHeaderProps> = ({ lang }) => {
  const { vt } = useVisaCentreI18n(lang);

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
    <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-40">
      {/* Top Banner / Positioning */}
      <div className="border-b border-border/50 py-2.5 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-royal/10 text-royal font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              {vt('heroBadge')}
            </span>
            <span className="hidden sm:inline text-muted-foreground">|</span>
            <span className="text-muted-foreground font-medium truncate max-w-xl">
              {vt('positioningStatement')}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
            <Link
              to={`/${lang}/institute/visa-centre/track`}
              className="inline-flex items-center gap-1.5 text-royal font-semibold hover:underline"
            >
              <Search className="w-3.5 h-3.5" />
              {vt('navTrack')}
            </Link>
            <Link
              to={`/${lang}/hub/institute/visa-centre`}
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground font-medium"
            >
              <Compass className="w-3 h-3" />
              {vt('hubTitle')}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <Link
            to={`/${lang}/institute/visa-centre`}
            className="group flex flex-col gap-0.5"
          >
            <span className="text-lg md:text-xl font-bold tracking-tight text-foreground group-hover:text-royal transition-colors">
              {vt('centreTitle')}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              {vt('centreSubtitle')}
            </span>
          </Link>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5 self-start lg:self-auto">
          <Link
            to={`/${lang}/institute/visa-centre/appointments`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-semibold text-foreground transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-royal" />
            {vt('bookAppointmentBtn')}
          </Link>
          <Link
            to={`/${lang}/institute/visa-centre/apply`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-royal hover:bg-royal/90 text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <FileCheck className="w-3.5 h-3.5" />
            {vt('requestServiceBtn')}
          </Link>
        </div>
      </div>

      {/* Navigation Sub-bar */}
      <nav aria-label="Visa Centre Navigation" className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-none flex items-center gap-1 pb-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-royal/10 text-royal font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};
