import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { 
  User, 
  Mail, 
  Globe, 
  Linkedin, 
  Twitter, 
  BookOpen, 
  MessageSquare, 
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  Award,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ExpertProfile() {
  const { lang = 'en', id } = useParams<{ lang: Locale; id: string }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  // Mock expert data
  const expert = {
    id: 'dr-wang-wei',
    name: 'Dr. Wang Wei',
    title: 'Senior Research Fellow',
    department: 'Geo-Economics & Settlement',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
    bio: 'Dr. Wang Wei is a leading authority on currency internationalization and Sino-Iraqi energy cooperation. With over 15 years of experience in regional trade policy, he previously served as a consultant for the People\'s Bank of China and the Iraqi Ministry of Oil. His research focuses on direct IQD/CNY clearing mechanisms and infrastructure financing under the BRI.',
    languages: ['Chinese (Native)', 'English (Fluent)', 'Arabic (Professional)'],
    topics: ['Currency Settlement', 'Energy Infrastructure', 'BRI Policy'],
    achievements: [
      'Lead Author: 2025 Annual Strategic Outlook on Iraq–China Relations',
      'Architect of the 2024 Sino-Iraqi Banking Interconnectivity Framework',
      'Fellow of the Global Institute for Energy Security'
    ],
    publications: [
      { id: 'p1', title: 'The Renminbi in Baghdad: A New Era of Financial Settlement', type: 'POLICY_BRIEF', date: '2025-02-12', slug: 'rmb-in-baghdad' },
      { id: 'p2', title: 'Infrastructure Node Efficiency in the Grand Faw Port Project', type: 'WHITE_PAPER', date: '2024-11-05', slug: 'faw-port-efficiency' },
      { id: 'p3', title: 'Macroeconomic Impacts of the 2019 Oil-for-Projects Agreement', type: 'WORKING_PAPER', date: '2024-06-18', slug: 'oil-for-projects-impact' }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16" dir={isRtl ? 'rtl' : 'ltr'}>
      <Link to={`/${lang}/institute/experts`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-[#0284C7] transition-colors">
        <ArrowLeft size={14} className="rtl:rotate-180" />
        <span>Fellows Directory</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Profile Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#0284C7] to-[#D97706] rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <img 
                src={expert.image} 
                alt={expert.name}
                className="relative w-full aspect-square rounded-2xl object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4">
                <div className="bg-white dark:bg-neutral-900 p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xl">
                  <ShieldCheck className="text-emerald-500" size={24} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <a href="#" className="p-3 bg-[#F8FAFC] dark:bg-neutral-900 rounded-xl text-neutral-400 hover:text-[#0284C7] transition-all border border-neutral-100 dark:border-neutral-800"><Linkedin size={18} /></a>
                <a href="#" className="p-3 bg-[#F8FAFC] dark:bg-neutral-900 rounded-xl text-neutral-400 hover:text-[#0284C7] transition-all border border-neutral-100 dark:border-neutral-800"><Twitter size={18} /></a>
                <a href="#" className="p-3 bg-[#F8FAFC] dark:bg-neutral-900 rounded-xl text-neutral-400 hover:text-[#0284C7] transition-all border border-neutral-100 dark:border-neutral-800"><Globe size={18} /></a>
              </div>
              <button className="w-full py-4 bg-[#0F172A] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl flex items-center justify-center gap-3">
                <MessageSquare size={16} />
                <span>Request Briefing</span>
              </button>
            </div>
          </div>

          <div className="p-8 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#D97706]">Expertise Domains</h4>
            <div className="flex flex-wrap gap-2">
              {expert.topics.map(topic => (
                <span key={topic} className="px-3 py-1.5 bg-white dark:bg-neutral-800 rounded-lg text-[10px] font-bold text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 uppercase tracking-tight">
                  {topic}
                </span>
              ))}
            </div>
            
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-4">Working Languages</h4>
              <div className="space-y-2">
                {expert.languages.map(lang => (
                  <div key={lang} className="flex items-center gap-2 text-xs font-bold text-neutral-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{lang}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-8 space-y-16">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[#0284C7]">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Verified Senior Fellow</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter">
                {expert.name}
              </h1>
              <p className="text-xl font-bold text-[#D97706] uppercase tracking-tight">{expert.title}</p>
            </div>
            
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 font-medium">
                {expert.bio}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter flex items-center gap-3">
              <Award className="text-[#D97706]" />
              <span>Key Accomplishments</span>
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {expert.achievements.map((achievement, idx) => (
                <div key={idx} className="p-6 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-[#D97706] font-black text-sm shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300 leading-snug">
                    {achievement}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <h3 className="text-2xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter flex items-center gap-3">
                <FileText className="text-[#0284C7]" />
                <span>Recent Publications</span>
              </h3>
              <Link to={`/${lang}/institute/publications?author=${expert.id}`} className="text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-[#0284C7] transition-colors">
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {expert.publications.map((pub) => (
                <Link 
                  key={pub.id}
                  to={`/${lang}/institute/publications/${pub.slug}`}
                  className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl hover:border-[#0284C7] hover:shadow-xl transition-all group"
                >
                  <div className="flex items-center justify-between gap-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="bg-[#F1F5F9] dark:bg-neutral-800 text-[#64748B] px-2.5 py-1 rounded text-[8px] font-black uppercase tracking-widest">
                          {pub.type.replace('_', ' ')}
                        </span>
                        <span className="text-[9px] font-bold text-neutral-400">{new Date(pub.date).toLocaleDateString()}</span>
                      </div>
                      <h4 className="text-lg font-black text-[#0F172A] dark:text-white uppercase group-hover:text-[#0284C7] transition-colors">
                        {pub.title}
                      </h4>
                    </div>
                    <ChevronRight size={24} className="text-neutral-200 dark:text-neutral-700 group-hover:text-[#0284C7] transition-all rtl:rotate-180" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
