import React from 'react';
import { useParams } from 'react-router-dom';
import { Locale } from '../../types';
import { 
  FileText, 
  ShieldCheck, 
  Search, 
  Database, 
  AlertCircle, 
  Clock, 
  BookOpen,
  CheckCircle2,
  GitBranch,
  Quote
} from 'lucide-react';

export default function DataHubMethodology() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-[#D97706]">
          <ShieldCheck size={18} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Institutional Standards</span>
        </div>
        <h1 className="text-4xl lg:text-7xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter leading-none">
          Data Hub Methodology
        </h1>
        <p className="text-xl text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
          The Iraqi-Chinese Agency (ICA) Data Hub is the definitive analytical interface for bilateral economic mapping. 
          Our methodology ensures data integrity across diverging reporting standards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 min-w-0">
        {/* Core Principles */}
        <div className="lg:col-span-8 space-y-16">
          <section className="space-y-8">
            <h2 className="text-2xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter flex items-center gap-3">
              <Database className="text-[#0284C7]" />
              <span>Primary Data Sources</span>
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 min-w-0">
              {[
                { name: 'FM PRC (China)', description: 'General Administration of Customs of the People\'s Republic of China. Official bilateral trade aggregates.', cadence: 'Monthly' },
                { name: 'OEC (International)', description: 'Observatory of Economic Complexity. Granular HS-code level visualization and complexity indices.', cadence: 'Annual' },
                { name: 'MOI Iraq (National)', description: 'Iraqi Ministry of Industry and Minerals. Infrastructure node and manufacturing site data.', cadence: 'Quarterly' },
                { name: 'CEIC Data', description: 'Global economic database for sovereign debt and fiscal indicators monitoring.', cadence: 'Monthly' }
              ].map(source => (
                <div key={source.name} className="p-8 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-[#0F172A] dark:text-white uppercase tracking-tight">{source.name}</h4>
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-1 rounded">Official</span>
                  </div>
                  <p className="text-xs text-neutral-500 font-medium leading-relaxed">{source.description}</p>
                  <div className="flex items-center gap-2 pt-2 text-[9px] font-black uppercase tracking-widest text-neutral-400">
                    <Clock size={12} />
                    <span>Update Cadence: {source.cadence}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter flex items-center gap-3">
              <AlertCircle className="text-[#D97706]" />
              <span>Divergence Handling</span>
            </h2>
            <div className="p-10 bg-rose-50 dark:bg-rose-950/20 rounded-3xl border border-rose-100 dark:border-rose-900/50 space-y-6">
              <p className="text-sm font-bold text-rose-900 dark:text-rose-300 leading-relaxed">
                A common challenge in Sino-Iraqi data mapping is the divergence between "Mirror Statistics" 
                (e.g., China's reported exports to Iraq vs Iraq's reported imports from China).
              </p>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 min-w-0">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-600">Known Divergences</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-xs font-medium text-rose-800 dark:text-rose-400">
                      <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
                      <span>Reporting Lag: Typical 45-60 day reporting window difference.</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs font-medium text-rose-800 dark:text-rose-400">
                      <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
                      <span>CIF vs FOB: Divergences due to cost, insurance, and freight valuations.</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-600">ICA Policy</h4>
                  <p className="text-xs font-medium text-rose-800 dark:text-rose-400 italic">
                    "ICA provides a toggle for 'Variant A (Exporter Source)' and 'Variant B (Importer Source)' 
                    where discrepancies exceed 15% of total volume."
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter flex items-center gap-3">
              <Quote className="text-[#0284C7]" />
              <span>Citation Guidance</span>
            </h2>
            <div className="space-y-6">
              <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                When using ICA Data Hub visualizations or raw datasets in external publications, 
                media outlets and academic institutions must adhere to the following citation format:
              </p>
              <div className="p-8 bg-[#0F172A] text-white rounded-3xl font-mono text-xs leading-relaxed select-all">
                "Iraqi-Chinese Agency (ICA) Data Hub. [Visualization Title]. Retrieved from 
                iraqi-chineseagency.ai.studio/data-hub. Accessed [Date]."
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-6 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#0284C7]">Validation Pipeline</h3>
            <div className="space-y-8 relative">
              <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-neutral-100 dark:bg-neutral-800 rtl:left-auto rtl:right-2.5" />
              {[
                { step: 'Extraction', desc: 'Automated retrieval from primary sovereign APIs.' },
                { step: 'Normalization', desc: 'Conversion to unified currency (USD) and weight metrics.' },
                { step: 'Anomaly Check', desc: 'Z-score detection for YoY/MoM spikes > 3σ.' },
                { step: 'Publication', desc: 'Final render in Hub after expert peer review.' }
              ].map((item, i) => (
                <div key={i} className="relative z-10 flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-white dark:bg-neutral-900 border-2 border-[#0284C7] flex-shrink-0" />
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0F172A] dark:text-white">{item.step}</h4>
                    <p className="text-[10px] text-neutral-400 font-bold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-neutral-900 text-white rounded-3xl space-y-6 shadow-2xl">
            <div className="flex items-center gap-3 text-[#D97706]">
              <GitBranch size={20} />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Open Data Initiative</h3>
            </div>
            <p className="text-xs text-neutral-400 font-medium leading-relaxed">
              Researchers requiring full API access to raw CSV datasets can apply 
              for an institutional key through the partnerships portal.
            </p>
            <button className="w-full py-4 bg-white text-[#0F172A] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0284C7] hover:text-white transition-all">
              Apply for API Key
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
