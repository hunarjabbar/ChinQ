import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DollarSign, ShieldAlert, Clock, ArrowRight, HelpCircle, FileCheck } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreStore } from '../../../store/useVisaCentreStore';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';
import { VisaNavHeader } from '../../../components/institute/visa-centre/VisaNavHeader';
import { VisaDisclaimer } from '../../../components/institute/visa-centre/VisaDisclaimer';

export const VisaCentreFees: React.FC = () => {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const validLang = (lang as Locale) || 'en';
  const { vt } = useVisaCentreI18n(validLang);

  const settings = useVisaCentreStore((s) => s.settings);
  const exchangeRate = 1310;

  const consularFeesChina = [
    { entry: 'Single Entry (1 Entry)', validity: '3 Months', stay: '30-90 Days', standardUSD: 30, expressUSD: 55, urgentUSD: 70 },
    { entry: 'Double Entry (2 Entries)', validity: '3-6 Months', stay: '30-90 Days', standardUSD: 45, expressUSD: 70, urgentUSD: 85 },
    { entry: 'Multiple Entries (6 Months)', validity: '6 Months', stay: '30-90 Days', standardUSD: 60, expressUSD: 85, urgentUSD: 100 },
    { entry: 'Multiple Entries (12 Months)', validity: '12 Months', stay: '30-90 Days', standardUSD: 90, expressUSD: 115, urgentUSD: 130 }
  ];

  const consularFeesIraq = [
    { type: 'Commercial Entry Visa', validity: '3 Months', stay: '30 Days', standardUSD: 40, expressUSD: 70 },
    { type: 'Multiple Entry Business Visa', validity: '6-12 Months', stay: '30 Days / Entry', standardUSD: 100, expressUSD: 150 },
    { type: 'Tourist Visa (On Arrival / Approval)', validity: '30 Days', stay: '30 Days', standardUSD: 75, expressUSD: 75 }
  ];

  const allServices = useVisaCentreStore((s) => s.services);
  const services = useMemo(() => allServices.filter((srv) => !srv.deletedAt), [allServices]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <VisaDisclaimer lang={validLang} variant="banner" id="fees-top-disclaimer" />
      <VisaNavHeader lang={validLang} />

      <main className="page-container flex-1 py-10 space-y-10">
        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal/10 text-royal text-xs font-semibold">
            <DollarSign className="w-3.5 h-3.5" />
            <span>{vt('navFees')}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            {vt('navFees')} &amp; Consular Tariffs
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Transparent schedule of official consular fees charged by diplomatic missions alongside Institute advisory and translation facilitation fees.
          </p>
        </div>

        {/* Currency Basis Notice */}
        <div className="p-4 rounded-xl border border-border bg-card/60 flex items-center justify-between gap-4 text-xs">
          <span className="text-muted-foreground">
            Current Reference Exchange Rate: <strong>1 USD = {exchangeRate.toLocaleString()} IQD</strong> (Central Bank reference).
          </span>
          <span className="text-xs font-semibold text-royal">
            No Hidden Markups
          </span>
        </div>

        {/* Section 1: Official Consular Fees (China) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">
              Official Consular Tariffs: Visas for China (PRC Diplomatic Missions)
            </h2>
            <span className="text-xs text-muted-foreground">Payable at consular counter / designated bank</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-xs text-start">
              <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground">
                <tr>
                  <th className="py-3 px-4 text-start">Entry Type</th>
                  <th className="py-3 px-4 text-start">Validity</th>
                  <th className="py-3 px-4 text-start">Stay Duration</th>
                  <th className="py-3 px-4 text-end">Standard (4 Days)</th>
                  <th className="py-3 px-4 text-end">Express (2-3 Days)</th>
                  <th className="py-3 px-4 text-end">Rush / Urgent (24h)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {consularFeesChina.map((f, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-foreground">{f.entry}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{f.validity}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{f.stay}</td>
                    <td className="py-3.5 px-4 text-end font-mono font-bold text-foreground">${f.standardUSD} USD</td>
                    <td className="py-3.5 px-4 text-end font-mono font-bold text-royal">${f.expressUSD} USD</td>
                    <td className="py-3.5 px-4 text-end font-mono font-bold text-foreground">${f.urgentUSD} USD</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Official Consular Fees (Iraq) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">
              Official Consular Tariffs: Visas for Iraq (MOI &amp; Iraqi Missions)
            </h2>
            <span className="text-xs text-muted-foreground">Subject to Ministry of Interior ministerial decrees</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-xs text-start">
              <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground">
                <tr>
                  <th className="py-3 px-4 text-start">Visa Classification</th>
                  <th className="py-3 px-4 text-start">Validity</th>
                  <th className="py-3 px-4 text-start">Permitted Stay</th>
                  <th className="py-3 px-4 text-end">Standard Fee (USD)</th>
                  <th className="py-3 px-4 text-end">Approx. IQD Equivalent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {consularFeesIraq.map((f, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-foreground">{f.type}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{f.validity}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{f.stay}</td>
                    <td className="py-3.5 px-4 text-end font-mono font-bold text-foreground">${f.standardUSD} USD</td>
                    <td className="py-3.5 px-4 text-end font-mono text-muted-foreground">{(f.standardUSD * exchangeRate).toLocaleString()} IQD</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Institute Advisory & Facilitation Fees */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">
              Institute Centre Advisory &amp; Facilitation Fees (Optional Independent Services)
            </h2>
            <Link to={`/${validLang}/institute/visa-centre/services`} className="text-xs text-royal font-semibold hover:underline">
              {vt('navServices')} →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((srv) => (
              <div key={srv.id} className="p-5 rounded-2xl border border-border bg-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground">{srv.title[validLang] || srv.title.en}</span>
                </div>
                <div className="flex items-baseline gap-1 text-royal font-mono font-bold text-lg">
                  ${srv.priceUSD} <span className="text-xs font-normal text-muted-foreground">USD / {(srv.priceIQD).toLocaleString()} IQD</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {srv.description[validLang] || srv.description.en}
                </p>
                <div className="pt-2 text-xs">
                  <Link
                    to={`/${validLang}/institute/visa-centre/apply?service=${srv.slug}`}
                    className="text-royal font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Request this service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Non-Refundable Fee Notice Card */}
        <div className="p-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 space-y-3">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Important Consular Fee Disclosures</span>
          </div>
          <p className="text-xs md:text-sm text-foreground/90 leading-relaxed">
            Consular application fees are collected on behalf of sovereign diplomatic missions and are strictly non-refundable regardless of the consular decision, visa refusal, or withdrawal of application. Institute advisory fees reflect professional document pre-audit and translation and do not guarantee visa issuance.
          </p>
        </div>
      </main>

      <div className="page-container pb-8">
        <VisaDisclaimer lang={validLang} variant="card" id="fees-footer-disclaimer" />
      </div>
    </div>
  );
};
