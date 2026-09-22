import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { 
  Database, 
  TrendingUp, 
  Handshake, 
  Globe, 
  ArrowLeft,
  ChevronRight,
  BookOpen,
  PieChart,
  Users,
  Target,
  FileText,
  X
} from 'lucide-react';
import { MediaRequestForm } from '../../components/institute/MediaRequestForm';

const pillars = {
  'energy-bri': {
    id: 'energy-bri',
    title: 'Energy & Belt and Road',
    icon: Database,
    color: '#0284C7',
    description: 'Analyzing the multi-decadal energy cooperation between the PRC and Iraq, with a focus on the 2019 "Oil-for-Projects" agreement and the Grand Faw Port logistics integration.',
    questions: [
      'How does the 2019 "Oil-for-Projects" framework impact Iraq\'s sovereign debt sustainability?',
      'What is the projected capacity of Chinese-built refineries in Basra by 2030?',
      'How can Grand Faw Port leverage BRI logistics nodes to reduce transit times to Europe?'
    ],
    leadFellow: 'Dr. Wang Wei',
    leadFellowSlug: 'dr-wang-wei',
    metrics: [
      { label: 'Monthly Crude Export (CN)', value: '1.2M bpd' },
      { label: 'Active EPC Contracts', value: '42' },
      { label: 'Projected Investment', value: '$12.4B' }
    ],
    domainExperts: [
      { name: 'Dr. Wang Wei', role: 'Senior Research Fellow, Geopolitics', slug: 'dr-wang-wei' },
      { name: 'Ziyad Al-Husseini', role: 'Infrastructure Policy Advisor', slug: 'ziyad-al-husseini' }
    ]
  },
  'geo-economics': {
    id: 'geo-economics',
    title: 'Geo-Economics & Settlement',
    icon: TrendingUp,
    color: '#D97706',
    description: 'The definitive center for research on the internationalization of the Renminbi (CNY) within the Iraqi financial system and the macroeconomic impacts of direct IQD/CNY settlement.',
    questions: [
      'What are the liquidity requirements for a stable IQD/CNY direct clearing hub?',
      'How does e-CNY integration affect cross-border SME trade between Yiwu and Sulaymaniyah?',
      'What are the divergences between FM PRC and OEC trade volume reporting?'
    ],
    leadFellow: 'Ziyad Al-Husseini',
    leadFellowSlug: 'ziyad-al-husseini',
    metrics: [
      { label: 'CNY Settlement Volume', value: '¥14.2B' },
      { label: 'Trade Balance (YoY)', value: '+8.4%' },
      { label: 'Banking Partners', value: '12' }
    ],
    domainExperts: [
      { name: 'Ziyad Al-Husseini', role: 'Infrastructure & Monetary Policy Fellow', slug: 'ziyad-al-husseini' },
      { name: 'Dr. Wang Wei', role: 'Senior Fellow, Currency Networks', slug: 'dr-wang-wei' }
    ]
  },
  'diplomacy': {
    id: 'diplomacy',
    title: 'Bilateral Diplomacy',
    icon: Handshake,
    color: '#0F172A',
    description: 'Tracking high-level diplomatic engagements, sovereign summits, and the evolving legal frameworks governing Iraq-China relations across central and regional governments.',
    questions: [
      'What are the core legal protections for Chinese investors in the Kurdistan Region?',
      'How do bilateral summits correlate with major infrastructure contract announcements?',
      'What is the roadmap for the Sulaymaniyah–Yiwu sister city framework?'
    ],
    leadFellow: 'Dr. Li Qiang',
    leadFellowSlug: 'dr-li-qiang',
    metrics: [
      { label: 'Active Treaties', value: '18' },
      { label: 'Diplomatic Missions', value: '4' },
      { label: 'Cultural Centers', value: '2' }
    ],
    domainExperts: [
      { name: 'Dr. Li Qiang', role: 'Distinguished Fellow, Bilateral Diplomacy', slug: 'dr-li-qiang' },
      { name: 'Ziyad Al-Husseini', role: 'Diplomatic Affairs Advisor', slug: 'ziyad-al-husseini' }
    ]
  },
  'digital-silk-road': {
    id: 'digital-silk-road',
    title: 'Digital Silk Road & Tech',
    icon: Globe,
    color: '#047857',
    description: 'Focusing on the export of Chinese digital infrastructure, 5G deployment, smart city architecture, and cybersecurity standards within the West Asian corridor.',
    questions: [
      'What are the security standards for 5G deployment in Iraqi logistics hubs?',
      'How can e-government platforms improve transparency in Iraq-China trade nodes?',
      'What is the ethical framework for AI surveillance technology transfer?'
    ],
    leadFellow: 'Zhang Min',
    leadFellowSlug: 'zhang-min',
    metrics: [
      { label: '5G Hubs', value: '12' },
      { label: 'Smart City Projects', value: '3' },
      { label: 'Tech Transfers', value: '15' }
    ],
    domainExperts: [
      { name: 'Zhang Min', role: 'Fellow in Digital Economy & Telecom', slug: 'zhang-min' },
      { name: 'Dr. Li Qiang', role: 'Technology Policy Consultant', slug: 'dr-li-qiang' }
    ]
  }
};

const pillarAliases: Record<string, keyof typeof pillars> = {
  'energy': 'energy-bri',
  'energy-bri': 'energy-bri',
  'bri': 'energy-bri',
  'geo-economics': 'geo-economics',
  'economics': 'geo-economics',
  'settlement': 'geo-economics',
  'diplomacy': 'diplomacy',
  'bilateral': 'diplomacy',
  'digital-silk-road': 'digital-silk-road',
  'digital': 'digital-silk-road',
  'tech': 'digital-silk-road'
};

export default function ResearchPillarDetail() {
  const { lang = 'en', pillar: rawPillarId } = useParams<{ lang: Locale; pillar: string }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  
  const normalizedKey = rawPillarId ? (pillarAliases[rawPillarId.toLowerCase()] || 'energy-bri') : 'energy-bri';
  const pillar = pillars[normalizedKey] || pillars['energy-bri'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16" dir={isRtl ? 'rtl' : 'ltr'}>
      <Link to={`/${lang}/institute/research`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-[#0284C7] transition-colors">
        <ArrowLeft size={14} className="rtl:rotate-180" />
        <span>Research Pillars</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Header Section */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl" style={{ backgroundColor: pillar.color }}>
              <pillar.icon size={32} />
            </div>
            <h1 className="text-4xl lg:text-7xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter leading-none">
              {pillar.title}
            </h1>
            <p className="text-xl text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed max-w-3xl">
              {pillar.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillar.metrics.map(metric => (
              <div key={metric.label} className="p-8 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl shadow-sm">
                <span className="block text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2">{metric.label}</span>
                <span className="text-3xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter" style={{ color: pillar.color }}>{metric.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="p-8 bg-[#0F172A] text-white rounded-3xl shadow-2xl space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#D97706]">Pillar Leadership</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center font-black">
                {pillar.leadFellow.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <span className="block text-sm font-black uppercase tracking-tight">{pillar.leadFellow}</span>
                <span className="block text-[10px] font-bold text-[#0284C7] uppercase tracking-widest">Lead Research Fellow</span>
              </div>
            </div>
            <button 
              onClick={() => setShowInterviewModal(true)}
              className="w-full py-4 bg-white text-[#0F172A] rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#0284C7] hover:text-white transition-all shadow-md"
            >
              Request Interview
            </button>
          </div>

          <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Pillar Resources</h3>
            <div className="space-y-3">
              <Link to={`/${lang}/institute/publications?topic=${pillar.id}`} className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl group transition-all">
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-[#0284C7]" />
                  <span className="text-xs font-black uppercase tracking-widest">Publications</span>
                </div>
                <ChevronRight size={14} className="text-neutral-300 group-hover:text-[#0284C7] transition-all rtl:rotate-180" />
              </Link>
              <Link to={`/${lang}/institute/data-hub`} className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl group transition-all">
                <div className="flex items-center gap-3">
                  <PieChart size={18} className="text-[#0284C7]" />
                  <span className="text-xs font-black uppercase tracking-widest">Data Hub</span>
                </div>
                <ChevronRight size={14} className="text-neutral-300 group-hover:text-[#0284C7] transition-all rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-16 border-t border-neutral-100 dark:border-neutral-800">
        {/* Research Questions */}
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[#D97706]">
              <Target size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Primary Inquiry</span>
            </div>
            <h3 className="text-3xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter">Core Research Questions</h3>
          </div>
          <div className="space-y-4">
            {pillar.questions.map((q, i) => (
              <div key={i} className="p-8 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl flex items-start gap-6">
                <span className="text-4xl font-black text-neutral-100 dark:text-neutral-800 leading-none">{String(i+1).padStart(2, '0')}</span>
                <p className="text-sm font-bold text-neutral-600 dark:text-neutral-400 leading-relaxed italic">"{q}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Experts */}
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[#0284C7]">
              <Users size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Institutional Fellows</span>
            </div>
            <h3 className="text-3xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter">Domain Experts</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {pillar.domainExperts.map((expert) => (
              <Link key={expert.slug} to={`/${lang}/institute/experts/${expert.slug}`} className="p-6 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl flex items-center gap-6 hover:border-[#0284C7] transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-black group-hover:scale-110 transition-transform text-[#0F172A] dark:text-white text-xs">
                  {expert.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-black text-[#0F172A] dark:text-white uppercase">{expert.name}</h4>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{expert.role}</p>
                </div>
                <ChevronRight size={20} className="text-neutral-200 group-hover:text-[#0284C7] transition-all rtl:rotate-180" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Interview Modal */}
      {showInterviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800 mb-6">
              <div>
                <h3 className="text-base font-black uppercase text-[#0F172A] dark:text-white">Request Scholar Briefing</h3>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-0.5">{pillar.title} Domain</p>
              </div>
              <button 
                onClick={() => setShowInterviewModal(false)}
                className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-white rounded-lg"
              >
                <X size={18} />
              </button>
            </div>
            <MediaRequestForm 
              expertName={pillar.leadFellow}
              publicationTitle={`${pillar.title} Pillar Research`}
              onSuccess={() => setShowInterviewModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
