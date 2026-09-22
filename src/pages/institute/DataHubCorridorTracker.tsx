import React from 'react';
import { useParams } from 'react-router-dom';
import { Locale } from '../../types';
import { 
  MapPin, 
  Truck, 
  Ship, 
  ArrowRight, 
  ShieldCheck, 
  Info,
  Clock,
  Activity,
  Package,
  Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DataHubCorridorTracker() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(null);

  const nodes = [
    {
      id: 'yiwu',
      nameEn: 'Yiwu Hub',
      nameAr: 'مركز إيو',
      nameZh: '义乌枢纽',
      nameCkb: 'ناوەندی ئیوو',
      type: 'ORIGIN',
      status: 'OPERATIONAL',
      volume: '4.2M TEU/yr',
      partners: ['Sulaymaniyah Sister City'],
      description: 'The primary consolidation point for small commodities and SME exports to the West Asian corridor.'
    },
    {
      id: 'sulaymaniyah',
      nameEn: 'Sulaymaniyah Logistics',
      nameAr: 'السليمانية اللوجستية',
      nameZh: '苏莱曼尼亚物流',
      nameCkb: 'لۆجستیی سلێمانی',
      type: 'TRANSIT / HUB',
      status: 'OPERATIONAL',
      volume: '1.8M Tons/yr',
      partners: ['Yiwu Port Authority', 'Bashmakh Custom'],
      description: 'The definitive northern entry point for Chinese goods, serving as a regional distribution hub for Iraq and neighboring markets.'
    },
    {
      id: 'bashmakh',
      nameEn: 'Bashmakh Border',
      nameAr: 'منفذ باشماخ',
      nameZh: '巴什马克边境',
      nameCkb: 'مەرزی باشماخ',
      type: 'BORDER CROSSING',
      status: 'OPERATIONAL',
      volume: '850K Tons/yr',
      partners: ['Regional Custom Auth'],
      description: 'Strategic crossing node for land-based trade flows originating from Central Asian BRI routes.'
    },
    {
      id: 'basra',
      nameEn: 'Southern Ports (Faw)',
      nameAr: 'الموانئ الجنوبية (الفاو)',
      nameZh: '南部港口（法奥）',
      nameCkb: 'بەندەرەکانی باشوور',
      type: 'TERMINUS',
      status: 'UNDER_CONSTRUCTION',
      volume: 'Data Pending',
      partners: ['Tianbai Group', 'GCPI Iraq'],
      description: 'The maritime terminus for the development road, integrating the BRI maritime silk road with Iraq\'s primary railway spine.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="space-y-4 text-center lg:text-left rtl:lg:text-right">
        <div className="inline-flex items-center gap-2 text-[#047857]">
          <Activity size={18} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Logistics Intelligence</span>
        </div>
        <h1 className="text-3xl lg:text-5xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter">
          Corridor Active Tracker
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0">
          Real-time monitoring of the Yiwu → Sulaymaniyah → Basra logistics spine. 
          Tracking infrastructure readiness and trade node throughput.
        </p>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-neutral-100 dark:bg-neutral-800 -translate-y-1/2 hidden lg:block" />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
          {nodes.map((node, i) => (
            <div key={node.id} className="space-y-6">
              <div className="flex flex-col items-center lg:items-start space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center shadow-xl relative">
                  <MapPin size={24} />
                  {i < nodes.length - 1 && (
                    <ArrowRight size={16} className="absolute -right-6 top-1/2 -translate-y-1/2 text-neutral-300 hidden lg:block rtl:rotate-180 rtl:-left-6 rtl:right-auto" />
                  )}
                </div>
                <div className="text-center lg:text-left rtl:lg:text-right">
                  <span className="text-[9px] font-black text-[#047857] uppercase tracking-widest">{node.type}</span>
                  <h3 className="text-xl font-black text-[#0F172A] dark:text-white uppercase tracking-tight">
                    {node[`name${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof node] as string || node.nameEn}
                  </h3>
                </div>
              </div>

              <div 
                className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6 hover:shadow-xl hover:border-[#047857]/30 transition-all group cursor-pointer active:scale-[0.98]"
                onClick={() => setSelectedNodeId(node.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest">
                    {node.status}
                  </span>
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <Clock size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Live</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                  {node.description}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-50 dark:border-neutral-800">
                  <div className="space-y-1">
                    <span className="block text-[8px] font-black uppercase tracking-widest text-neutral-400">Throughput</span>
                    <span className="block text-xs font-black text-[#0F172A] dark:text-white">{node.volume}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[8px] font-black uppercase tracking-widest text-neutral-400">Provider</span>
                    <span className="block text-xs font-black text-[#0F172A] dark:text-white">Active</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[8px] font-black uppercase tracking-widest text-neutral-400">Strategic Partners</h4>
                  <div className="flex flex-wrap gap-2">
                    {node.partners.map(p => (
                      <span key={p} className="px-2 py-1 bg-neutral-50 dark:bg-neutral-800 rounded text-[8px] font-bold text-neutral-600 dark:text-neutral-400 border border-neutral-100 dark:border-neutral-700">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Node Detail Section - Contextual Panel */}
      <AnimatePresence>
        {selectedNodeId && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-8 bg-[#0F172A] text-white rounded-3xl space-y-8 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <MapPin size={120} />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12">
              <div className="space-y-6 flex-1">
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded">
                    Active Node Analysis
                  </div>
                  <button 
                    onClick={() => setSelectedNodeId(null)}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    Clear Selection
                  </button>
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter">
                  {nodes.find(n => n.id === selectedNodeId)?.[`name${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof nodes[0]] as string}
                </h2>
                <p className="text-sm text-neutral-400 font-medium leading-relaxed max-w-xl">
                  {nodes.find(n => n.id === selectedNodeId)?.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 flex-1">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#047857]">Operational Efficiency</span>
                  <div className="text-2xl font-black">94.2%</div>
                  <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[94%]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#047857]">Customs Speed</span>
                  <div className="text-2xl font-black">1.4 Days</div>
                  <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[80%]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#047857]">Carrier Density</span>
                  <div className="text-2xl font-black">High</div>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#047857]">Security Rating</span>
                  <div className="text-2xl font-black">Tier 1</div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#047857] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                Download Node Datasheet
              </button>
              <button className="px-6 py-3 bg-white/5 text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all">
                View Real-time Sensors
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logistics Detail Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-16 border-t border-neutral-100 dark:border-neutral-800">
        <div className="p-8 bg-[#F8FAFC] dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 flex items-start gap-6">
          <div className="p-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm text-[#0284C7]">
            <Truck size={24} />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-black text-[#0F172A] dark:text-white uppercase tracking-tight">Active Land Fleets</h4>
            <p className="text-xs text-neutral-500 font-medium leading-relaxed">
              1,200+ verified logistics vehicles active on the Yiwu–Sulaymaniyah land route monthly.
            </p>
          </div>
        </div>
        <div className="p-8 bg-[#F8FAFC] dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 flex items-start gap-6">
          <div className="p-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm text-[#0284C7]">
            <Package size={24} />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-black text-[#0F172A] dark:text-white uppercase tracking-tight">Commodity Mix</h4>
            <p className="text-xs text-neutral-500 font-medium leading-relaxed">
              72% of transit volume consists of electronics, automotive parts, and refined construction materials.
            </p>
          </div>
        </div>
        <div className="p-8 bg-[#F8FAFC] dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 flex items-start gap-6">
          <div className="p-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm text-[#0284C7]">
            <Building2 size={24} />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-black text-[#0F172A] dark:text-white uppercase tracking-tight">Infrastructure Delta</h4>
            <p className="text-xs text-neutral-500 font-medium leading-relaxed">
              New warehouse facilities in Sulaymaniyah increased regional cold-chain capacity by 40% in Q1 2026.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
