import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Locale, translations } from '../locales';
import { 
  Building2, 
  ArrowLeft, 
  ShieldCheck, 
  Layers, 
  Coins, 
  Cpu, 
  ArrowUpRight, 
  Download,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

interface InstitutePageProps {
  currentLocale: Locale;
}

export const InstitutePage: React.FC<InstitutePageProps> = ({ currentLocale }) => {
  const t = translations[currentLocale];
  const [studies, setStudies] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/studies')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setStudies(data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const pillars = [
    {
      id: 'trade',
      title: t.institute.tradePillar,
      desc: t.institute.tradeDesc,
      icon: Layers,
      stat: '$53.2B',
      statLabel: 'Annual Bilateral Volume',
      badge: 'Macroeconomics',
      details: [
        'Oil-for-reconstruction structural accounting',
        'Customs modernization & green customs corridors',
        'Industrial machine tool & heavy equipment import quotas',
      ],
    },
    {
      id: 'bri',
      title: t.institute.briPillar,
      desc: t.institute.briDesc,
      icon: Building2,
      stat: '1,200 km',
      statLabel: 'Transit Rail & Highway',
      badge: 'Connectivity',
      details: [
        'Grand Faw Port container terminal capacity tracking',
        'Basra-Baghdad-Mosul-Turkey multimodal freight links',
        'Logistics parks & bonded customs warehousing',
      ],
    },
    {
      id: 'finance',
      title: t.institute.financePillar,
      desc: t.institute.financeDesc,
      icon: Coins,
      stat: '¥35B',
      statLabel: 'Direct Swap Facility',
      badge: 'Sovereign FX',
      details: [
        'Direct IQD/CNY clearing without intermediary conversion',
        'Central bank bilateral liquidity instruments',
        'Commercial bank cross-border trade letters of credit',
      ],
    },
    {
      id: 'energy',
      title: t.institute.energyPillar,
      desc: t.institute.energyDesc,
      icon: Cpu,
      stat: '3,800 MW',
      statLabel: 'Clean Grid Pipeline',
      badge: 'Decarbonization',
      details: [
        'Zero-flaring associated gas capture in southern basins',
        'Photovoltaic solar parks across Central & Southern governorates',
        'Joint petrochemical refining & high-efficiency power generation',
      ],
    },
  ];

  return (
    <div className="space-y-10">
      {/* Top Breadcrumb & Navigation Anchor */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-neutral-800">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[var(--color-brand-800)] hover:bg-[#aa0000] text-white font-bold text-xs px-4 py-2 rounded transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.nav.backToIca}</span>
        </Link>

        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Sovereign Research Accreditation · CISE Secretariat</span>
        </div>
      </div>

      {/* CISE Institute Hero */}
      <section className="bg-gradient-to-r from-neutral-900 via-[#1a1414] to-neutral-950 border border-neutral-800 rounded-xl p-6 sm:p-10 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-[#ff4d4d] tracking-widest uppercase">
          <Building2 className="w-4 h-4 text-[var(--color-brand-800)]" />
          <span>CHINESE INSTITUTE FOR STRATEGIC AND ECONOMIC STUDIES</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          {t.institute.title}
        </h1>

        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-4xl">
          {t.institute.subtitle}
        </p>

        <div className="pt-3 flex flex-wrap gap-4">
          <Link
            to="/institute/services"
            className="bg-[var(--color-brand-800)] hover:bg-[#aa0000] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded transition-colors flex items-center gap-2 shadow-md"
          >
            <span>{t.institute.viewServices}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <a
            href="#pillars"
            className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs sm:text-sm px-5 py-3 rounded transition-colors border border-neutral-700"
          >
            Research Pillars
          </a>
        </div>
      </section>

      {/* Four Core Research Pillars */}
      <section id="pillars" className="space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-bold text-[var(--color-brand-800)] uppercase tracking-wider">STRATEGIC FOCUS</div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {t.institute.pillarsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p) => (
            <div
              key={p.id}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4 hover:border-neutral-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded bg-[var(--color-brand-800)]/15 border border-[var(--color-brand-800)]/30 flex items-center justify-center text-[#ff4d4d]">
                    <p.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-neutral-400 bg-neutral-800 px-2.5 py-1 rounded">
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">
                  {p.title}
                </h3>

                <p className="text-neutral-400 text-xs leading-relaxed">
                  {p.desc}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-neutral-800/80">
                  {p.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
                <div>
                  <div className="text-lg font-mono font-black text-white">{p.stat}</div>
                  <div className="text-[10px] text-neutral-500 uppercase">{p.statLabel}</div>
                </div>
                <Link
                  to="/institute/services"
                  className="text-white hover:text-[#ff4d4d] font-semibold flex items-center gap-1 text-xs transition-colors"
                >
                  Consult CISE Desk →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Institutional Studies & Policy Briefs */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-[var(--color-brand-800)] uppercase tracking-wider">ACADEMIC & SOVEREIGN REPOSITORIES</div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[var(--color-brand-800)]" />
              Recent Monograph Publications & Strategic Whitepapers
            </h3>
          </div>
          <Link
            to="/hub"
            className="text-xs text-neutral-400 hover:text-white font-mono flex items-center gap-1"
          >
            Access Research Archive →
          </Link>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 'st-1',
              title: 'Development Road Corridor: Engineering Synergies with Grand Faw Terminal Berth Logistics',
              author: 'Dr. Zhang Weimin & Eng. Farhad Al-Bayati',
              date: 'September 2026',
              classification: 'RESTRICTED / SOVEREIGN CIRCULATION',
              pages: '64 pages',
            },
            {
              id: 'st-2',
              title: 'Monetary Architecture of the New Silk Route: Bilateral IQD/CNY Foreign Exchange Settlement',
              author: 'Prof. Lin Minwang & Dr. Ali Al-Zaidi',
              date: 'August 2026',
              classification: 'PUBLIC POLICY BRIEF',
              pages: '48 pages',
            },
            {
              id: 'st-3',
              title: 'Zero-Emission Petroleum Industrialization: Basra Associated Gas Harvesting Protocols',
              author: 'Consortium for Sustainable Sino-Iraqi Energy',
              date: 'July 2026',
              classification: 'TECHNICAL EVALUATION',
              pages: '92 pages',
            },
          ].map((study) => (
            <div
              key={study.id}
              className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                    {study.classification}
                  </span>
                  <span className="text-neutral-500">{study.date}</span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-neutral-500">{study.pages}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{study.title}</h4>
                <div className="text-xs text-neutral-400">Authors: {study.author}</div>
              </div>

              <button
                onClick={() => alert('Official policy brief requested. Download dispatched to authorized session.')}
                className="shrink-0 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold px-4 py-2 rounded transition-colors flex items-center gap-1.5 border border-neutral-700"
              >
                <Download className="w-3.5 h-3.5 text-[var(--color-brand-800)]" />
                <span>Download Brief</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
