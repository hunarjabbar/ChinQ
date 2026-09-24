import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  FileCheck, 
  Calendar, 
  Compass, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Plane, 
  ExternalLink,
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreStore } from '../../../store/useVisaCentreStore';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';
import { VisaNavHeader } from '../../../components/institute/visa-centre/VisaNavHeader';
import { VisaDisclaimer } from '../../../components/institute/visa-centre/VisaDisclaimer';
import { VisaProcessDiagram } from '../../../components/institute/visa-centre/VisaProcessDiagram';
import { VisaChecklistBuilder } from '../../../components/institute/visa-centre/VisaChecklistBuilder';
import { VisaApplicationTracker } from '../../../components/institute/visa-centre/VisaApplicationTracker';

export const VisaCentreLanding: React.FC = () => {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const validLang = (lang as Locale) || 'en';
  const { vt } = useVisaCentreI18n(validLang);

  const allVisaCategories = useVisaCentreStore((s) => s.visaCategories);
  const allServices = useVisaCentreStore((s) => s.services);
  const allAnnouncements = useVisaCentreStore((s) => s.announcements);
  const allFaqs = useVisaCentreStore((s) => s.faqs);

  const visaCategories = React.useMemo(() => allVisaCategories.filter((c) => !c.deletedAt), [allVisaCategories]);
  const services = React.useMemo(() => allServices.filter((srv) => !srv.deletedAt), [allServices]);
  const announcements = React.useMemo(() => allAnnouncements.filter((a) => !a.deletedAt), [allAnnouncements]);
  const faqs = React.useMemo(() => allFaqs.filter((f) => !f.deletedAt).slice(0, 4), [allFaqs]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Mandatory Independence Disclaimer */}
      <VisaDisclaimer lang={validLang} variant="banner" id="landing-top-disclaimer" />

      {/* Nav Header */}
      <VisaNavHeader lang={validLang} />

      <main className="flex-1 space-y-12 py-8">
        {/* Hero Section */}
        <section className="page-container relative z-10 scroll-mt-32">
          <div className="hero-card space-y-8 relative overflow-hidden shadow-sm bg-card border border-border">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal/10 text-royal text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>{vt('heroBadge')}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                {vt('heroTitle')}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {vt('positioningStatement')}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={`/${validLang}/institute/visa-centre/apply`}
                className="min-h-[44px] px-6 py-3 rounded-xl bg-royal hover:bg-royal/90 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-white active:scale-[0.98]"
              >
                <FileCheck className="w-4 h-4" />
                {vt('requestServiceBtn')}
              </Link>
              <Link
                to={`/${validLang}/institute/visa-centre/appointments`}
                className="min-h-[44px] px-5 py-3 rounded-xl border border-border bg-card hover:bg-muted font-semibold text-sm text-foreground inline-flex items-center justify-center gap-2 transition-all focus-visible:outline-2 focus-visible:outline-royal active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 text-royal" />
                {vt('bookAppointmentBtn')}
              </Link>
              <Link
                to={`/${validLang}/institute/visa-centre/track`}
                className="min-h-[44px] px-5 py-3 rounded-xl border border-royal/20 bg-royal/5 hover:bg-royal/10 text-royal font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all focus-visible:outline-2 focus-visible:outline-royal active:scale-[0.98]"
              >
                {vt('trackStatusBtn')} →
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border/50 text-xs">
              <div>
                <span className="text-muted-foreground block text-[11px]">Consular Standard</span>
                <span className="font-bold text-foreground text-sm">PRC Consulate Erbil</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px]">Target Mobility</span>
                <span className="font-bold text-foreground text-sm">Iraq ⇄ China Corridors</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px]">Advisory SLA</span>
                <span className="font-bold text-foreground text-sm">24–48 Hours Review</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px]">Security &amp; Privacy</span>
                <span className="font-bold text-foreground text-sm">Encrypted PII Guard</span>
              </div>
            </div>
          </div>
        </section>

        {/* Announcements Bar */}
        {announcements.length > 0 && (
          <section className="page-container relative z-20 scroll-mt-32">
            <div className="policy-strip text-xs shadow-sm isolate">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-2 py-0.5 rounded bg-royal text-white font-bold text-[10px] uppercase">
                  {announcements[0].category.toUpperCase()}
                </span>
                <span className="font-semibold text-foreground">
                  {announcements[0].title[validLang] || announcements[0].title.en}
                </span>
              </div>
              <Link
                to={`/${validLang}/institute/visa-centre/news`}
                className="text-royal font-semibold hover:underline inline-flex items-center min-h-[44px] px-2 py-1 gap-1 shrink-0 focus-visible:outline-2 focus-visible:outline-royal"
              >
                {vt('navNews')} →
              </Link>
            </div>
          </section>
        )}

        {/* Featured Visa Types Reference Library */}
        <section className="page-container space-y-6 relative z-10 scroll-mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {vt('typesTitle')}
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                {vt('typesSubtitle')}
              </p>
            </div>
            <Link
              to={`/${validLang}/institute/visa-centre/visa-types`}
              className="text-xs font-semibold text-royal hover:underline inline-flex items-center min-h-[44px] px-2 py-1 gap-1 focus-visible:outline-2 focus-visible:outline-royal"
            >
              {vt('navVisaTypes')} ({visaCategories.length} categories) →
            </Link>
          </div>

          <div className="category-grid">
            {visaCategories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                to={`/${validLang}/institute/visa-centre/visa-types/${cat.direction === 'iraq-to-china' ? 'china' : 'iraq'}/${cat.category.toLowerCase()}`}
                className="category-card group hover:border-royal/40 transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-royal"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-lg bg-royal/10 text-royal font-black text-base flex items-center justify-center font-mono">
                      {cat.category}
                    </span>
                    <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {cat.direction === 'iraq-to-china' ? 'Iraq → China' : 'China → Iraq'}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground text-sm group-hover:text-royal transition-colors">
                    {cat.officialName[validLang] || cat.officialName.en}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {cat.shortDescription[validLang] || cat.shortDescription.en}
                  </p>
                </div>

                <div className="category-card__cta border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-royal" />
                    {cat.processingTimeStandard}
                  </span>
                  <span className="font-semibold text-royal group-hover:translate-x-0.5 transition-transform">
                    {vt('navAbout')} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Services Catalogue Preview */}
        <section className="page-container space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {vt('servicesTitle')}
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                {vt('servicesSubtitle')}
              </p>
            </div>
            <Link
              to={`/${validLang}/institute/visa-centre/services`}
              className="text-xs font-semibold text-royal hover:underline inline-flex items-center min-h-[44px] px-2 py-1 gap-1 focus-visible:outline-2 focus-visible:outline-royal"
            >
              {vt('navServices')} →
            </Link>
          </div>

          <div className="category-grid">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="category-card justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-royal/10 text-royal">
                      {srv.category.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className="font-bold text-foreground text-sm font-mono">
                      ${srv.priceUSD} <span className="text-[10px] text-muted-foreground font-normal">USD</span>
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground text-base leading-snug">
                    {srv.title[validLang] || srv.title.en}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {srv.description[validLang] || srv.description.en}
                  </p>
                </div>

                <div className="category-card__cta border-t border-border flex items-center justify-between">
                  <Link
                    to={`/${validLang}/institute/visa-centre/services/${srv.slug}`}
                    className="text-xs font-semibold text-royal hover:underline inline-flex items-center min-h-[44px] px-2 py-1 focus-visible:outline-2 focus-visible:outline-royal"
                  >
                    View Service Details →
                  </Link>
                  <Link
                    to={`/${validLang}/institute/visa-centre/apply?service=${srv.slug}`}
                    className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-lg bg-royal hover:bg-royal/90 text-white text-xs font-semibold focus-visible:outline-2 focus-visible:outline-white active:scale-[0.98]"
                  >
                    Request
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Diagram Section */}
        <section className="page-container space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {vt('processTitle')}
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              {vt('processSubtitle')}
            </p>
          </div>
          <VisaProcessDiagram lang={validLang} />
        </section>

        {/* Interactive Checklist Builder */}
        <section className="page-container space-y-6">
          <VisaChecklistBuilder lang={validLang} />
        </section>

        {/* Live Application Tracker */}
        <section className="page-container space-y-6">
          <VisaApplicationTracker lang={validLang} />
        </section>

        {/* FAQ Section */}
        <section className="page-container space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {vt('faqsTitle')}
              </h2>
              <p className="text-xs text-muted-foreground">
                Essential questions regarding authority, invitation letters, and timelines
              </p>
            </div>
            <Link
              to={`/${validLang}/institute/visa-centre/faq`}
              className="text-xs font-semibold text-royal hover:underline inline-flex items-center min-h-[44px] px-2 py-1 focus-visible:outline-2 focus-visible:outline-royal"
            >
              {vt('navFaq')} →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((f) => (
              <div
                key={f.id}
                className="p-5 rounded-xl border border-border bg-card space-y-2"
              >
                <div className="flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-royal shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-foreground text-sm leading-snug">
                    {f.question[validLang] || f.question.en}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed ps-6.5">
                  {f.answer[validLang] || f.answer.en}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Disclaimer */}
      <div className="page-container pb-8">
        <VisaDisclaimer lang={validLang} variant="card" id="landing-footer-disclaimer" />
      </div>
    </div>
  );
};
