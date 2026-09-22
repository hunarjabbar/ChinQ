import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { 
  Database, 
  TrendingUp, 
  Map, 
  ShieldCheck, 
  ArrowRight,
  ChevronRight,
  PieChart,
  Activity,
  Building2,
  FileText,
  Globe,
  Info
} from 'lucide-react';

export function DataHub() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const modules = [
    {
      id: 'trade',
      titleEn: 'Trade Explorer',
      titleAr: 'مستكشف التجارة',
      titleZh: '贸易探索器',
      titleCkb: 'گەڕانچی بازرگانی',
      descriptionEn: 'The definitive interface for bilateral trade flow mapping, including HS2 categorization and YoY trends.',
      icon: TrendingUp,
      color: '#0284C7',
      path: `/${lang}/institute/data-hub/trade`,
      stats: { label: '2025 Volume', value: '$51.17B' }
    },
    {
      id: 'corridor',
      titleEn: 'Corridor Tracker',
      titleAr: 'متتبع الممرات',
      titleZh: '走廊追踪器',
      titleCkb: 'ڕێڕەوی بەدواداچوون',
      descriptionEn: 'Real-time monitoring of the Yiwu → Sulaymaniyah → Basra logistics spine and infrastructure nodes.',
      icon: Map,
      color: '#047857',
      path: `/${lang}/institute/data-hub/corridor`,
      stats: { label: 'Active Nodes', value: '4 Strategic' }
    },
    {
      id: 'projects',
      titleEn: 'BRI Projects',
      titleAr: 'مشاريع الحزام والطريق',
      titleZh: '一带一路项目',
      titleCkb: 'پڕۆژەکانی پشتێنە و ڕێگە',
      descriptionEn: 'The authoritative registry of China-linked infrastructure and energy projects with verification status.',
      icon: Building2,
      color: '#D97706',
      path: `/${lang}/institute/data-hub/projects`,
      stats: { label: 'Verified Value', value: '$9.0B+' }
    },
    {
      id: 'methodology',
      titleEn: 'Methodology',
      titleAr: 'المنهجية',
      titleZh: '数据方法论',
      titleCkb: 'میتۆدۆلۆژی',
      descriptionEn: 'Documentation of data provenance, divergence handling, and peer-review validation pipelines.',
      icon: FileText,
      color: '#64748B',
      path: `/${lang}/institute/data-hub/methodology`,
      stats: { label: 'Sources', value: 'FM PRC / OEC' }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-[#0284C7]">
          <Database size={18} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Institutional Data Hub</span>
        </div>
        <h1 className="text-4xl lg:text-7xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter leading-none">
          Strategic Intelligence Interface
        </h1>
        <p className="text-xl text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
          The definitive analytical gateway for the Iraqi-Chinese economic corridor. 
          Select a dashboard below to explore granular datasets, logistics trackers, and project registries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {modules.map((module) => (
          <Link 
            key={module.id} 
            to={module.path}
            className="group relative bg-white dark:bg-neutral-900 rounded-[2.5rem] p-10 lg:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-2xl hover:border-[#0284C7] transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all">
              <module.icon size={160} />
            </div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: module.color }}>
                  <module.icon size={32} />
                </div>
                <div className="text-right rtl:text-left">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">{module.stats.label}</span>
                  <span className="block text-2xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter" style={{ color: module.color }}>
                    {module.stats.value}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter group-hover:text-[#0284C7] transition-colors">
                  {module[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof module] as string || module.titleEn}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                  {module.descriptionEn}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0284C7]">Launch Dashboard</span>
                <ChevronRight size={20} className="text-neutral-300 group-hover:text-[#0284C7] group-hover:translate-x-2 transition-all rtl:rotate-180 rtl:group-hover:-translate-x-2" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Global Data Status Strip */}
      <div className="bg-[#0F172A] rounded-[2.5rem] p-12 text-white relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#0284C720,transparent)]" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 max-w-xl">
            <div className="flex items-center gap-2 text-[#D97706]">
              <ShieldCheck size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Verification Status</span>
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tighter leading-tight">Institutional Data Integrity</h3>
            <p className="text-sm text-neutral-400 font-medium leading-relaxed">
              All datasets provided through the ICA Data Hub are subject to the 
              <span className="text-white"> Dual-Source Sovereignty Protocol</span>. 
              We ensure 98.4% correlation between FM PRC aggregates and OEC complexity indices 
              before releasing public visualizations.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl text-center">
              <span className="block text-4xl font-black mb-2 tracking-tighter">98.4%</span>
              <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-[#0284C7]">Correlation Index</span>
            </div>
            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl text-center">
              <span className="block text-4xl font-black mb-2 tracking-tighter">Q1 2026</span>
              <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-[#D97706]">Latest Batch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
