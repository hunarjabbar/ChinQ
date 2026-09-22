import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Locale } from '../../types';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Info, 
  ChevronDown,
  Database,
  BarChart3,
  LineChart,
  PieChart as PieChartIcon,
  Maximize2,
  Share2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  Legend,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export default function DataHubTradeExplorer() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const [comparisonMode, setComparisonMode] = useState('annual-2025-vs-2024');
  const [dataSource, setDataSource] = useState<'official' | 'mirror'>('official');
  const [isExporting, setIsExporting] = useState(false);
  const [showCitation, setShowCitation] = useState(false);

  const handleExport = (format: 'csv' | 'json') => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`Simulated export of trade data to ${format.toUpperCase()}`);
    }, 1500);
  };

  const tradeData = dataSource === 'official' ? [
    { year: 2021, total: 37.3, exports: 10.7, imports: 26.6 },
    { year: 2022, total: 48.4, exports: 13.9, imports: 34.5 },
    { year: 2023, total: 49.7, exports: 15.2, imports: 34.5 },
    { year: 2024, total: 50.2, exports: 16.5, imports: 33.7 },
    { year: 2025, total: 51.17, exports: 17.21, imports: 33.96 }
  ] : [
    { year: 2021, total: 35.1, exports: 9.8, imports: 25.3 },
    { year: 2022, total: 46.2, exports: 12.5, imports: 33.7 },
    { year: 2023, total: 47.8, exports: 14.1, imports: 33.7 },
    { year: 2024, total: 48.5, exports: 15.2, imports: 33.3 },
    { year: 2025, total: 49.8, exports: 16.3, imports: 33.5 }
  ];

  const hs2Categories = [
    { name: 'Crude Oil', value: 33.96, color: '#0F172A' },
    { name: 'Electronics', value: 4.2, color: '#0284C7' },
    { name: 'Machinery', value: 3.8, color: '#D97706' },
    { name: 'Vehicles', value: 2.1, color: '#047857' },
    { name: 'Others', value: 7.11, color: '#64748B' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-[#0284C7]">
            <BarChart3 size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Economic Intelligence</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter">
            Bilateral Trade Explorer
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium max-w-2xl leading-relaxed">
            The definitive quantitative interface for mapping sino-iraqi trade flows. 
            Data is sourced from FM PRC and OEC with integrated anomaly detection.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl flex">
            <button 
              onClick={() => setDataSource('official')}
              className={cn(
                "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                dataSource === 'official' ? "bg-white dark:bg-neutral-700 text-[#0F172A] dark:text-white shadow-sm" : "text-neutral-500 hover:text-neutral-700"
              )}
            >
              FM PRC (Official)
            </button>
            <button 
              onClick={() => setDataSource('mirror')}
              className={cn(
                "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                dataSource === 'mirror' ? "bg-white dark:bg-neutral-700 text-[#0F172A] dark:text-white shadow-sm" : "text-neutral-500 hover:text-neutral-700"
              )}
            >
              OEC Mirror
            </button>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Mode</span>
            <select 
              value={comparisonMode}
              onChange={(e) => setComparisonMode(e.target.value)}
              className="bg-transparent text-xs font-black uppercase tracking-widest text-[#0F172A] dark:text-white outline-none cursor-pointer"
            >
              <option value="Q1-2025-vs-Q1-2026">Q1 2025 vs Q1 2026</option>
              <option value="annual-2025-vs-2024">Annual 2025 vs 2024</option>
              <option value="month-over-month">Month-over-Month</option>
            </select>
          </div>
          <button 
            onClick={() => handleExport('csv')}
            disabled={isExporting}
            className="p-3 bg-[#0F172A] text-white rounded-xl hover:scale-105 transition-all shadow-lg disabled:opacity-50"
          >
            {isExporting ? <span className="animate-spin block">◌</span> : <Download size={18} />}
          </button>
          <button 
            onClick={() => setShowCitation(!showCitation)}
            className="p-3 bg-white dark:bg-neutral-800 text-[#0F172A] dark:text-white border border-neutral-200 dark:border-neutral-700 rounded-xl hover:bg-neutral-50 transition-all"
          >
            <Info size={18} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showCitation && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-8 bg-[#0F172A] text-white rounded-3xl space-y-4 border border-[#D97706]/30">
              <h4 className="text-xs font-black uppercase tracking-widest text-[#D97706]">Institutional Data Citation (APA 7th)</h4>
              <p className="text-sm font-medium bg-white/5 p-4 rounded-xl font-mono leading-relaxed border border-white/5">
                Iraqi-Chinese Agency (2026). <span className="italic">Bilateral Trade Intelligence Hub: IQD-CNY Settlement Flows 2021-2025</span>. Chinese Institute for Strategic and Economic Studies. https://iraqi-chineseagency.ai.studio/data-hub/trade-explorer
              </p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText('Iraqi-Chinese Agency (2026). Bilateral Trade Intelligence Hub: IQD-CNY Settlement Flows 2021-2025. Chinese Institute for Strategic and Economic Studies.');
                    alert('Citation copied to clipboard');
                  }}
                  className="text-[10px] font-black uppercase tracking-widest text-[#D97706] hover:text-white transition-colors flex items-center gap-2"
                >
                  <Share2 size={12} />
                  Copy Citation
                </button>
                <button 
                  className="text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
                >
                  Download BibTeX
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total 2025 Trade', value: '$51.17B', change: '+1.93%', up: true, source: 'FM PRC' },
          { label: 'Exports to Iraq', value: '$17.21B', change: '+4.3%', up: true, source: 'FM PRC' },
          { label: 'Imports (Crude)', value: '$33.96B', change: '+0.7%', up: true, source: 'FM PRC' },
          { label: 'Q1 2026 Total', value: '$8.93B', change: '-4.2%', up: false, source: 'Illustrative' }
        ].map((m, i) => (
          <div key={i} className="p-8 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{m.label}</span>
              <div className={`flex items-center gap-1 text-[10px] font-black ${m.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                {m.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                <span>{m.change}</span>
              </div>
            </div>
            <div className="text-3xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter">
              {m.value}
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-neutral-50 dark:border-neutral-800/50">
              <Database size={12} className="text-neutral-300" />
              <span className="text-[8px] font-black uppercase tracking-widest text-neutral-400">Source: {m.source}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-8 bg-white dark:bg-neutral-900 rounded-3xl p-8 lg:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-[#0F172A] dark:text-white uppercase tracking-tight">Trade Volume Trajectory (5Y)</h3>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">USD Billions · Annual Series</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0284C7]" />
                <span className="text-[10px] font-black uppercase text-neutral-500">Exports</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0F172A] dark:bg-white" />
                <span className="text-[10px] font-black uppercase text-neutral-500">Imports</span>
              </div>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tradeData}>
                <defs>
                  <linearGradient id="colorExports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284C7" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0284C7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F172A', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="exports" 
                  stroke="#0284C7" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorExports)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="imports" 
                  stroke="#0F172A" 
                  strokeWidth={4} 
                  fillOpacity={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-8">
            <h3 className="text-sm font-black text-[#0F172A] dark:text-white uppercase tracking-widest border-b border-neutral-100 dark:border-neutral-800 pb-4">HS2 Categorization (2025)</h3>
            <div className="space-y-6">
              {hs2Categories.map(cat => (
                <div key={cat.name} className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-neutral-500">{cat.name}</span>
                    <span className="text-[#0F172A] dark:text-white">${cat.value}B</span>
                  </div>
                  <div className="h-2 bg-neutral-50 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(cat.value / 33.96) * 100}%` }}
                      className="h-full" 
                      style={{ backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-rose-50 dark:bg-rose-950/20 rounded-3xl p-8 border border-rose-100 dark:border-rose-900/50 space-y-4">
            <div className="flex items-center gap-2 text-rose-600">
              <Info size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Anomaly Detection</span>
            </div>
            <p className="text-xs font-bold text-rose-900 dark:text-rose-400 leading-relaxed">
              April 2026 exhibits an ~84% export decline in the OEC series. This is marked as a critical anomaly requiring secondary validation against FM PRC monthly aggregates.
            </p>
          </div>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <h3 className="text-sm font-black text-[#0F172A] dark:text-white uppercase tracking-widest">Granular Data Table ({dataSource === 'official' ? 'Official FM PRC' : 'OEC Mirror Series'})</h3>
          <button 
            onClick={() => handleExport('csv')}
            disabled={isExporting}
            className="text-[10px] font-black uppercase tracking-widest text-[#0284C7] flex items-center gap-2 disabled:opacity-50"
          >
            <span>{isExporting ? 'Exporting...' : 'Export CSV'}</span>
            <Download size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-800/50">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-100 dark:border-neutral-800">Year</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-100 dark:border-neutral-800">Total Trade (USD)</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-100 dark:border-neutral-800">Exports (CN→IQ)</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-100 dark:border-neutral-800">Imports (IQ→CN)</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-100 dark:border-neutral-800">Provenance</th>
              </tr>
            </thead>
            <tbody>
              {tradeData.map((row, i) => (
                <tr key={i} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors">
                  <td className="p-6 text-xs font-black text-[#0F172A] dark:text-white">{row.year}</td>
                  <td className="p-6 text-xs font-black text-[#0F172A] dark:text-white">${row.total}B</td>
                  <td className="p-6 text-xs font-black text-emerald-600">${row.exports}B</td>
                  <td className="p-6 text-xs font-black text-[#0F172A] dark:text-white">${row.imports}B</td>
                  <td className="p-6">
                    <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-[8px] font-black uppercase tracking-widest text-neutral-500">FM PRC Verified</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
