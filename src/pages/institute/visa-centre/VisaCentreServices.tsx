import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Briefcase, Clock, CheckCircle2, ArrowRight, Filter, Search } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreStore } from '../../../store/useVisaCentreStore';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';
import { VisaNavHeader } from '../../../components/institute/visa-centre/VisaNavHeader';
import { VisaDisclaimer } from '../../../components/institute/visa-centre/VisaDisclaimer';

export const VisaCentreServices: React.FC = () => {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const validLang = (lang as Locale) || 'en';
  const { vt } = useVisaCentreI18n(validLang);

  const allServices = useVisaCentreStore((s) => s.services);
  const services = useMemo(() => allServices.filter((srv) => !srv.deletedAt), [allServices]);

  const [directionFilter, setDirectionFilter] = useState<'all' | 'iraq-to-china' | 'china-to-iraq' | 'both'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = services.filter((srv) => {
    const matchesDirection = directionFilter === 'all' || srv.direction === directionFilter || srv.direction === 'both';
    const matchesSearch =
      srv.title[validLang]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      srv.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      srv.description[validLang]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      srv.description.en.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDirection && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <VisaDisclaimer lang={validLang} variant="banner" id="services-top-disclaimer" />
      <VisaNavHeader lang={validLang} />

      <main className="page-container flex-1 py-10 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal/10 text-royal text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{vt('navServices')}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            {vt('servicesTitle')}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {vt('servicesSubtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="p-4 rounded-2xl border border-border bg-card flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={vt('searchPlaceholder')}
              className="w-full ps-9 pe-4 py-2 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
            />
          </div>

          {/* Direction Filter */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <button
              type="button"
              onClick={() => setDirectionFilter('all')}
              className={`px-4 py-2 min-h-[44px] rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                directionFilter === 'all'
                  ? 'bg-royal text-white shadow-sm'
                  : 'border border-border bg-background text-muted-foreground hover:text-foreground'
              }`}
            >
              {vt('filterAll')}
            </button>
            <button
              type="button"
              onClick={() => setDirectionFilter('iraq-to-china')}
              className={`px-4 py-2 min-h-[44px] rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                directionFilter === 'iraq-to-china'
                  ? 'bg-royal text-white shadow-sm'
                  : 'border border-border bg-background text-muted-foreground hover:text-foreground'
              }`}
            >
              {vt('dirIraqToChina')}
            </button>
            <button
              type="button"
              onClick={() => setDirectionFilter('china-to-iraq')}
              className={`px-4 py-2 min-h-[44px] rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                directionFilter === 'china-to-iraq'
                  ? 'bg-royal text-white shadow-sm'
                  : 'border border-border bg-background text-muted-foreground hover:text-foreground'
              }`}
            >
              {vt('dirChinaToIraq')}
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="p-6 rounded-2xl border border-border bg-card flex flex-col justify-between space-y-4 hover:border-royal/30 transition-all shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-royal/10 text-royal">
                    {srv.category.replace('-', ' ').toUpperCase()}
                  </span>
                  <div className="text-end">
                    <span className="text-base font-bold text-foreground font-mono">
                      ${srv.priceUSD} <span className="text-[10px] text-muted-foreground font-normal">USD</span>
                    </span>
                    <span className="text-[11px] text-muted-foreground block font-mono">
                      ({srv.priceIQD.toLocaleString()} IQD)
                    </span>
                  </div>
                </div>

                <h2 className="font-bold text-foreground text-base leading-snug">
                  {srv.title[validLang] || srv.title.en}
                </h2>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {srv.description[validLang] || srv.description.en}
                </p>

                {/* Key Deliverables */}
                {srv.deliverables?.[validLang] && srv.deliverables[validLang].length > 0 && (
                  <div className="pt-2 space-y-1.5">
                    <span className="text-[11px] font-semibold text-foreground uppercase tracking-wider block">
                      Deliverables:
                    </span>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {srv.deliverables[validLang].slice(0, 3).map((d, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-royal shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between gap-3 text-xs">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 text-royal" />
                  {srv.timeline[validLang] || srv.timeline.en}
                </span>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/${validLang}/institute/visa-centre/services/${srv.slug}`}
                    className="font-semibold text-royal hover:underline min-h-[44px] inline-flex items-center px-1"
                  >
                    Details →
                  </Link>
                  <Link
                    to={`/${validLang}/institute/visa-centre/apply?service=${srv.slug}`}
                    className="px-4 py-2 min-h-[44px] rounded-lg bg-royal hover:bg-royal/90 text-white font-semibold shadow-sm inline-flex items-center transition-all active:scale-[0.98]"
                  >
                    Request
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="page-container pb-8">
        <VisaDisclaimer lang={validLang} variant="card" id="services-footer-disclaimer" />
      </div>
    </div>
  );
};
