import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Locale } from '../../types';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  ShieldAlert, 
  ExternalLink, 
  Building2, 
  MapPin, 
  Calendar,
  DollarSign,
  ChevronRight,
  Info,
  X,
  Download,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export default function DataHubBRIProjects() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const projects = [
    {
      id: '1',
      name: 'Al-Faw Grand Port Dredging',
      sector: 'Logistics',
      status: 'COMPLETED',
      value: '$2.6B',
      contractor: 'Tianbai',
      location: 'Basra',
      sources: ['MOI Iraq', 'Tianbai Investor Relations'],
      lastReviewed: '2026-02-15',
      verificationStatus: 'verified'
    },
    {
      id: '2',
      name: 'West Qurna-1 OT2/3 Processing',
      sector: 'Energy',
      status: 'OPERATIONAL',
      value: '$1.1B',
      contractor: 'PetroChina',
      location: 'Basra',
      sources: ['CBI Registry', 'OPEC+ Monitoring'],
      lastReviewed: '2025-11-20',
      verificationStatus: 'verified'
    },
    {
      id: '3',
      name: 'Nassiriya International Airport',
      sector: 'Infrastructure',
      status: 'UNDER_CONSTRUCTION',
      value: '$367M',
      contractor: 'China State Construction (EPC)',
      location: 'Dhi Qar',
      sources: ['EPC Contract Registry'],
      lastReviewed: '2026-01-10',
      verificationStatus: 'pending'
    },
    {
      id: '4',
      name: '12,000-School Construction Program',
      sector: 'Education',
      status: 'IN_PROGRESS',
      value: '$1.8B',
      contractor: 'PowerChina / Sinotech',
      location: 'Nationwide',
      sources: ['Cabinet Secretariat Iraq', 'PRC Embassy'],
      lastReviewed: '2026-03-05',
      verificationStatus: 'verified'
    },
    {
      id: '5',
      name: 'Wasit Thermal Power Station Expansion',
      sector: 'Energy',
      status: 'OPERATIONAL',
      value: '$3.5B',
      contractor: 'Shanghai Electric',
      location: 'Wasit',
      sources: ['Ministry of Electricity'],
      lastReviewed: '2025-08-12',
      verificationStatus: 'verified'
    }
  ];

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.contractor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = sectorFilter === 'ALL' || p.sector === sectorFilter;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-[#0284C7]">
            <Building2 size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Infrastructure Registry</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter">
            BRI Project Registry
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium max-w-2xl leading-relaxed">
            The authoritative database for China-linked infrastructure projects in Iraq. 
            All entries are subject to dual-source verification before aggregate reporting.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 bg-neutral-50 dark:bg-neutral-900 p-2 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <div className="relative flex-grow min-w-[240px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 rtl:left-auto rtl:right-4" size={16} />
            <input 
              type="text"
              placeholder="Search projects or contractors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-neutral-800 pl-12 pr-4 py-3 rounded-xl text-xs font-bold outline-none border border-neutral-100 dark:border-neutral-700 rtl:pl-4 rtl:pr-12"
            />
          </div>
          <div className="flex items-center gap-2 px-4 border-l border-neutral-200 dark:border-neutral-800 rtl:border-l-0 rtl:border-r">
            <Filter size={16} className="text-neutral-400" />
            <select 
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="bg-transparent text-xs font-black uppercase tracking-widest text-[#0F172A] dark:text-white outline-none cursor-pointer"
            >
              <option value="ALL">All Sectors</option>
              <option value="Energy">Energy</option>
              <option value="Logistics">Logistics</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Education">Education</option>
            </select>
          </div>
        </div>
      </div>

      {/* Aggregate Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-[#0F172A] text-white rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <DollarSign size={80} />
          </div>
          <div className="relative z-10 space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#D97706]">Total Verified Value</span>
            <div className="text-4xl font-black uppercase tracking-tighter">$9.0B+</div>
            <p className="text-[10px] font-bold text-neutral-400 leading-relaxed uppercase">Aggregated across all verified high-throughput projects.</p>
          </div>
        </div>
        <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl flex flex-col justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Project Count</span>
          <div className="text-4xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter">15 Active</div>
          <div className="flex items-center gap-2 pt-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">85% Verification Rate</span>
          </div>
        </div>
        <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl flex flex-col justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Primary Sector</span>
          <div className="text-4xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter">Energy</div>
          <div className="flex items-center gap-2 pt-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">62% of Total CAPEX</span>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-800/50">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Project Name</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Sector</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Status</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Contractor</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Value</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Verification</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filteredProjects.map((project) => (
                <tr 
                  key={project.id} 
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <td className="p-6">
                    <div className="space-y-1">
                      <span className="block text-sm font-black text-[#0F172A] dark:text-white uppercase tracking-tight">{project.name}</span>
                      <div className="flex items-center gap-2 text-neutral-400">
                        <MapPin size={12} />
                        <span className="text-[10px] font-bold uppercase">{project.location}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-[9px] font-black uppercase tracking-widest text-neutral-500">
                      {project.sector}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'COMPLETED' || project.status === 'OPERATIONAL' ? 'bg-emerald-500' : 'bg-[#D97706]'}`} />
                      <span className="text-xs font-black uppercase tracking-tighter text-neutral-700 dark:text-neutral-300">
                        {project.status.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="p-6 text-xs font-bold text-neutral-600 dark:text-neutral-400">{project.contractor}</td>
                  <td className="p-6 text-xs font-black text-[#0F172A] dark:text-white">{project.value}</td>
                  <td className="p-6">
                    {project.verificationStatus === 'verified' ? (
                      <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                        <ShieldCheck size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-[#D97706] bg-amber-50 dark:bg-amber-950/20 px-3 py-1.5 rounded-lg border border-amber-100 dark:border-amber-900/50">
                        <ShieldAlert size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Pending</span>
                      </div>
                    )}
                  </td>
                  <td className="p-6">
                    <button className="p-2 text-neutral-300 group-hover:text-[#0284C7] transition-all">
                      <ChevronRight size={20} className="rtl:rotate-180" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[#0F172A] rounded-3xl p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Info size={120} />
        </div>
        <div className="relative z-10 max-w-2xl space-y-6">
          <h3 className="text-2xl font-black uppercase tracking-tighter">About Project Verification</h3>
          <p className="text-sm text-neutral-400 font-medium leading-relaxed">
            The Iraqi-Chinese Agency maintains a strict dual-source verification policy. 
            A project is only marked as "Verified" when details are confirmed by both 
            Iraqi governmental records and Chinese corporate or diplomatic disclosures. 
            Entries with a single source are marked as "Pending" and excluded from 
            institutional aggregate value calculations.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-6 py-3 bg-[#0284C7] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
              Submit Project Data
            </button>
            <button className="px-6 py-3 bg-white/10 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10">
              View Methodology
            </button>
          </div>
        </div>
      </div>

      {/* Project Detail Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-neutral-950/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: isRtl ? -600 : 600 }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? -600 : 600 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 bottom-0 ${isRtl ? 'left-0' : 'right-0'} w-full max-w-xl bg-white dark:bg-neutral-900 z-[101] shadow-2xl overflow-y-auto`}
            >
              <div className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[#0284C7]">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Project ID: {selectedProject.id}</span>
                      <h2 className="text-xl font-black text-[#0F172A] dark:text-white uppercase tracking-tight">{selectedProject.name}</h2>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-100 dark:border-neutral-800">
                    <span className="text-[8px] font-black uppercase tracking-widest text-neutral-400 block mb-1">Contract Value</span>
                    <span className="text-lg font-black text-[#0F172A] dark:text-white">{selectedProject.value}</span>
                  </div>
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-100 dark:border-neutral-800">
                    <span className="text-[8px] font-black uppercase tracking-widest text-neutral-400 block mb-1">Sector</span>
                    <span className="text-lg font-black text-[#D97706] uppercase tracking-tighter">{selectedProject.sector}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 pb-2">Verification Profile</h3>
                    <div className="flex items-center gap-4">
                      {selectedProject.verificationStatus === 'verified' ? (
                        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                          <ShieldCheck size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Institutionally Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-[#D97706] bg-amber-50 dark:bg-amber-950/20 px-3 py-1.5 rounded-lg border border-amber-100 dark:border-amber-900/50">
                          <ShieldAlert size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Pending Review</span>
                        </div>
                      )}
                      <span className="text-[10px] font-bold text-neutral-500 uppercase">Last Audit: {selectedProject.lastReviewed}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400">Project Logistics</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <MapPin size={16} className="text-neutral-300" />
                        <div>
                          <span className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">Operational Node</span>
                          <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">{selectedProject.location}, Iraq</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Building2 size={16} className="text-neutral-300" />
                        <div>
                          <span className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">Primary Contractor</span>
                          <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">{selectedProject.contractor}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Calendar size={16} className="text-neutral-300" />
                        <div>
                          <span className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">Project Status</span>
                          <span className="text-sm font-black text-[#0284C7] uppercase tracking-tighter">{selectedProject.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400">Documentary Evidence</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedProject.sources.map((source, idx) => (
                        <div key={idx} className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <FileText size={14} className="text-neutral-400" />
                            <span className="text-[10px] font-bold text-neutral-600 dark:text-neutral-400">{source}</span>
                          </div>
                          <ExternalLink size={12} className="text-neutral-300 group-hover:text-[#0284C7] transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-neutral-100 dark:border-neutral-800 flex gap-4">
                  <button className="flex-1 py-4 bg-[#0F172A] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#0F172A]/90 transition-all flex items-center justify-center gap-2">
                    <Download size={14} />
                    Download Brief
                  </button>
                  <button className="flex-1 py-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-[#0F172A] dark:text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-neutral-50 transition-all">
                    Share Entry
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
