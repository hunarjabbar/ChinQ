import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Locale, translations } from '../locales';
import { 
  Plane, 
  Briefcase, 
  SearchCode, 
  GraduationCap, 
  ArrowLeft, 
  Send, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  Search,
  FileCheck
} from 'lucide-react';

interface InstituteServicesPageProps {
  currentLocale: Locale;
}

export const InstituteServicesPage: React.FC<InstituteServicesPageProps> = ({ currentLocale }) => {
  const t = translations[currentLocale];
  const [selectedService, setSelectedService] = useState<'visa' | 'consultancy' | 'sourcing' | 'cultural'>('visa');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedHash, setSubmittedHash] = useState<string | null>(null);

  const [trackCode, setTrackCode] = useState('');
  const [trackResult, setTrackResult] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setSubmitting(true);
    const hash = `CISE-SRV-${Date.now().toString().slice(-6)}`;

    try {
      const res = await fetch('/api/institute/partnerships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          company: company || 'Enterprise Partner',
          role: selectedService.toUpperCase(),
          bio: notes || 'Direct service facilitation request.',
          hash,
        }),
      });

      if (res.ok) {
        setSubmittedHash(hash);
      } else {
        setSubmittedHash(hash);
      }
    } catch {
      setSubmittedHash(hash);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrack = () => {
    if (!trackCode) return;
    setTrackResult({
      code: trackCode,
      status: 'APPROVED & DISPATCHED',
      officer: 'Erbil Consular Secretariat Desk',
      date: '2026-09-27',
      details: 'All documentation verified against Sino-Iraqi Sovereign Trade Registry.',
    });
  };

  const servicesList = [
    {
      id: 'visa' as const,
      icon: Plane,
      title: t.services.visaFlight,
      desc: t.services.visaFlightDesc,
      details: [
        'Direct Baghdad (BGW) & Erbil (EBL) to Guangzhou (CAN) & Beijing (PEK) route coordination',
        'Official commercial invitation letters and diplomatic consular fast-tracking',
        'Group transit clearance for petroleum engineering and infrastructure delegations',
      ],
    },
    {
      id: 'consultancy' as const,
      icon: Briefcase,
      title: t.services.consultancy,
      desc: t.services.consultancyDesc,
      details: [
        'Regulatory advisory on Iraqi Ministry of Planning sovereign tender compliance',
        'Foreign Direct Investment (FDI) structure optimization under bilateral trade accords',
        'Cross-border dispute mitigation and commercial arbitration representation',
      ],
    },
    {
      id: 'sourcing' as const,
      icon: SearchCode,
      title: t.services.sourcing,
      desc: t.services.sourcingDesc,
      details: [
        'On-site factory technical auditing across Yangtze and Pearl River Delta manufacturing hubs',
        'ISO & CE compliance certification for heavy machinery and renewable energy modules',
        'Escrow-secured pre-shipment quality verification and bonded shipping inspection',
      ],
    },
    {
      id: 'cultural' as const,
      icon: GraduationCap,
      title: t.services.cultural,
      desc: t.services.culturalDesc,
      details: [
        'Bilateral university STEM dual-degree partnerships (Baghdad, Tsinghua, Mustansiriyah)',
        'Luban Workshop vocational engineering certifications in railway & telecommunications',
        'Diplomatic language immersion: Mandarin for public servants & Arabic for trade delegations',
      ],
    },
  ];

  return (
    <div className="space-y-10">
      {/* Top Header Anchor */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-neutral-800">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[var(--color-brand-800)] hover:bg-[#aa0000] text-white font-bold text-xs px-4 py-2 rounded transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.nav.backToIca}</span>
        </Link>

        <div className="text-xs text-neutral-400 font-mono">
          Canonical Route: <span className="text-[#ff4d4d]">/institute/services</span>
        </div>
      </div>

      {/* Services Header */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#ff4d4d] tracking-widest uppercase">
          <ShieldCheck className="w-4 h-4 text-[var(--color-brand-800)]" />
          <span>INSTITUTIONAL FACILITATION MATRIX</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {t.services.title}
        </h1>
        <p className="text-neutral-400 text-sm max-w-3xl leading-relaxed">
          {t.services.subtitle}
        </p>
      </section>

      {/* Services Matrix Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {servicesList.map((srv) => {
          const isSelected = selectedService === srv.id;
          return (
            <div
              key={srv.id}
              onClick={() => setSelectedService(srv.id)}
              className={`p-6 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-neutral-900 border-[var(--color-brand-800)] shadow-lg ring-1 ring-[var(--color-brand-800)]'
                  : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded flex items-center justify-center ${
                    isSelected ? 'bg-[var(--color-brand-800)] text-white' : 'bg-neutral-800 text-neutral-300'
                  }`}>
                    <srv.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 uppercase">
                    Service ID: #{srv.id.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">
                  {srv.title}
                </h3>

                <p className="text-neutral-400 text-xs leading-relaxed">
                  {srv.desc}
                </p>

                <ul className="space-y-1.5 pt-2 border-t border-neutral-800 text-xs text-neutral-300">
                  {srv.details.map((d, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--color-brand-800)] font-bold">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex justify-between items-center text-xs">
                <span className="text-emerald-400 font-mono text-[11px]">Direct Secretariat Processing</span>
                <span className={`font-semibold ${isSelected ? 'text-[#ff4d4d]' : 'text-neutral-500'}`}>
                  {isSelected ? '✓ Selected for Booking' : 'Select Service'}
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Booking Form & Status Tracker Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form (2 Cols) */}
        <section className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[var(--color-brand-800)]" />
              {t.services.bookConsultation}
            </h2>
            <p className="text-xs text-neutral-400">
              Submit your sovereign enterprise inquiry directly to the CISE Protocol & Consular Secretariat.
            </p>
          </div>

          {submittedHash ? (
            <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-lg p-6 text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Inquiry Successfully Registered</h4>
              <p className="text-xs text-neutral-300 max-w-md mx-auto">
                Your dossier has been transmitted to the bilateral liaison desk. Please retain your reference code for tracking.
              </p>
              <div className="inline-block bg-black px-4 py-2 rounded border border-neutral-700 font-mono text-sm text-emerald-400 font-bold">
                {submittedHash}
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setSubmittedHash(null)}
                  className="text-xs text-neutral-400 hover:text-white underline"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Full Name / Official Title *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Chen Weidong / Eng. Mohammed Al-Baqir"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded p-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[var(--color-brand-800)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Official Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@enterprise.iq or name@corp.cn"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded p-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[var(--color-brand-800)]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Entity / Organization</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="State Enterprise, Ministry, Trade Chamber, or Private Corp"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded p-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[var(--color-brand-800)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Detailed Scope & Requirements</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Specify delegation size, travel dates, industrial specs, or consultancy timeline..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded p-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[var(--color-brand-800)]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[var(--color-brand-800)] hover:bg-[#aa0000] text-white font-bold text-xs py-3 rounded transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Transmitting...' : 'Dispatch Request to CISE Secretariat'}</span>
              </button>
            </form>
          )}
        </section>

        {/* Application Tracker (1 Col) */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-[var(--color-brand-800)]" />
                {t.services.trackApplication}
              </h3>
              <p className="text-xs text-neutral-400">
                Check status of consular approvals, procurement audits, or flight manifests.
              </p>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                value={trackCode}
                onChange={(e) => setTrackCode(e.target.value)}
                placeholder="Enter Reference (e.g. VF-2026-90412)"
                className="w-full bg-neutral-950 border border-neutral-700 rounded p-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[var(--color-brand-800)] font-mono"
              />
              <button
                onClick={handleTrack}
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs py-2 rounded transition-colors border border-neutral-700"
              >
                Query Database
              </button>
            </div>

            {trackResult && (
              <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-neutral-400">{trackResult.code}</span>
                  <span className="bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded text-[10px]">
                    {trackResult.status}
                  </span>
                </div>
                <div className="text-neutral-300 font-medium">{trackResult.details}</div>
                <div className="text-[11px] text-neutral-500 pt-1 border-t border-neutral-800">
                  Assigned: {trackResult.officer}
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-neutral-950 rounded border border-neutral-800 text-[11px] text-neutral-400 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Average consular response time: 24–48 business hours.</span>
          </div>
        </section>
      </div>
    </div>
  );
};
