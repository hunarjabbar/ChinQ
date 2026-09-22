import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale, Expert } from '../../types';
import { 
  Users, 
  Search, 
  Filter, 
  MessageSquare, 
  BookOpen, 
  Globe, 
  Linkedin, 
  Twitter, 
  Mail,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

import { motion, AnimatePresence } from 'motion/react';
import { MediaRequestForm } from '../../components/institute/MediaRequestForm';
import { cn } from '../../lib/utils';

export function ExpertsDirectory() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  const [searchTerm, setSearchTerm] = useState('');
  const [isMediaDrawerOpen, setIsMediaDrawerOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);

  const openBooking = (expert?: Expert) => {
    setSelectedExpert(expert || null);
    setIsMediaDrawerOpen(true);
  };

  // Mock experts data
  const experts: Expert[] = [
    {
      id: '1',
      slug: 'dr-wang-wei',
      nameEn: 'Dr. Wang Wei',
      nameAr: 'د. وانغ وي',
      nameZh: '王伟 博士',
      nameCkb: 'د. وانگ وێی',
      titleEn: 'Senior Research Fellow, Geopolitics',
      titleAr: 'زميل أول للبحوث، الجغرافيا السياسية',
      titleZh: '地缘政治高级研究员',
      titleCkb: 'توێژەری باڵا، جیۆپۆلەتیک',
      bioEn: 'Specialist in West Asian energy networks and currency internationalization.',
      bioAr: 'متخصص في شبكات الطاقة في غرب آسيا وتدويل العملات.',
      bioZh: '专门研究西亚能源网络和货币国际化。',
      bioCkb: 'شارەزا لە تۆڕەکانی وزەی ڕۆژئاوای ئاسیا و جیهانیکردنی دراو.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
      pillars: ['Energy & BRI', 'Geo-Economics'],
      languages: ['Chinese', 'English'],
      createdAt: '', updatedAt: '',
    },
    {
      id: '2',
      slug: 'ziyad-al-husseini',
      nameEn: 'Ziyad Al-Husseini',
      nameAr: 'زياد الحسيني',
      nameZh: '齐亚德·侯赛尼',
      nameCkb: 'زیاد ئەلحوسەینی',
      titleEn: 'Infrastructure Policy Advisor',
      titleAr: 'مستشار سياسات البنية التحتية',
      titleZh: '基础设施政策顾问',
      titleCkb: 'ڕاوێژکاری سیاسەتی ژێرخان',
      bioEn: 'Expert on multimodal logistics and cross-border trade corridors.',
      bioAr: 'خبير في الخدمات اللوجستية متعددة الوسائط وممرات التجارة عبر الحدود.',
      bioZh: '多式联运物流和跨境贸易走廊专家。',
      bioCkb: 'شارەزا لە لۆجستی و ڕێڕەوە بازرگانییە سنووربەزێنەکان.',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300',
      pillars: ['Energy & BRI', 'Bilateral Diplomacy'],
      languages: ['Arabic', 'English', 'Kurdish'],
      createdAt: '', updatedAt: '',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-[#0284C7]">
          <Users size={18} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Institutional Faculty</span>
        </div>
        <h1 className="text-3xl lg:text-5xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter">
          Fellows & Scholars
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium max-w-2xl leading-relaxed">
          The Chinese Institute for Strategic and Economic Studies maintains a directory 
          of non-partisan experts providing evidence-based analysis across all research pillars.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search experts by name, topic, or pillar..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-[#0284C7] transition-all"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 transition-all">
            <Filter size={16} />
            <span>Filter by Pillar</span>
          </button>
          <button 
            onClick={() => openBooking()}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#0F172A] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
          >
            <MessageSquare size={16} />
            <span>Media Booking</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experts.map((expert) => (
          <div 
            key={expert.id}
            className="bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all group flex flex-col"
          >
            <div className="aspect-square relative overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              <img 
                src={expert.imageUrl} 
                alt={expert.nameEn}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-tight">
                  {expert[`name${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof Expert] as string || expert.nameEn}
                </h3>
                <p className="text-[10px] font-bold text-[#D97706] uppercase tracking-[0.2em] mt-1">
                  {expert[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof Expert] as string || expert.titleEn}
                </p>
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-grow justify-between gap-6">
              <div className="space-y-4">
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                  {expert[`bio${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof Expert] as string || expert.bioEn}
                </p>
                <div className="flex flex-wrap gap-2">
                  {expert.pillars.map(pillar => (
                    <span key={pillar} className="px-2 py-1 bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded text-[9px] font-black uppercase tracking-widest text-neutral-500">
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="text-neutral-400 hover:text-[#0284C7] transition-colors"><Linkedin size={16} /></button>
                  <button className="text-neutral-400 hover:text-[#0284C7] transition-colors"><Twitter size={16} /></button>
                  <button className="text-neutral-400 hover:text-[#0284C7] transition-colors"><Mail size={16} /></button>
                </div>
                <button 
                  onClick={() => openBooking(expert)}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0F172A] dark:text-white hover:text-[#0284C7] transition-colors"
                >
                  <span>Book Consultation</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Media Booking CTA */}
      <section className="bg-[#F8FAFC] dark:bg-neutral-900 rounded-3xl p-8 lg:p-12 border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center gap-8 shadow-inner">
        <div className="w-16 h-16 bg-[#0F172A] rounded-2xl flex items-center justify-center text-[#D97706] shrink-0">
          <MessageSquare size={32} />
        </div>
        <div className="space-y-2 flex-grow text-center md:text-left rtl:md:text-right">
          <h3 className="text-xl font-black text-[#0F172A] dark:text-white uppercase tracking-tight">Institutional Media Booking</h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed max-w-2xl">
            Accredited news agencies can request interviews, expert commentary, or panel participation 
            from our resident and non-resident fellows. Please submit a formal booking request 
            with your outlet details and deadline.
          </p>
        </div>
        <button 
          onClick={() => openBooking()}
          className="w-full md:w-auto px-8 py-4 bg-[#0F172A] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl whitespace-nowrap"
        >
          Submit Booking Request
        </button>
      </section>

      {/* Media Request Drawer */}
      <AnimatePresence>
        {isMediaDrawerOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMediaDrawerOpen(false)}
              className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl bg-white dark:bg-neutral-900 shadow-2xl h-full overflow-y-auto"
            >
              <div className="p-8 lg:p-12 space-y-12">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter">Media & Advisory</h2>
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Chinese Institute for Strategic and Economic Studies</p>
                  </div>
                  <button 
                    onClick={() => setIsMediaDrawerOpen(false)}
                    className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl hover:scale-110 transition-all"
                  >
                    <Globe size={20} className="rotate-45" /> {/* Close icon */}
                  </button>
                </div>

                {selectedExpert && (
                  <div className="p-8 bg-[#F8FAFC] dark:bg-neutral-800/50 rounded-3xl border border-neutral-100 dark:border-neutral-700">
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={selectedExpert.imageUrl} 
                        alt={selectedExpert.nameEn}
                        className="w-12 h-12 rounded-xl object-cover grayscale"
                      />
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-[#0F172A] dark:text-white">
                          {selectedExpert[`name${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof Expert] as string || selectedExpert.nameEn}
                        </h4>
                        <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                          {selectedExpert[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof Expert] as string || selectedExpert.titleEn}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <MediaRequestForm 
                  expertName={selectedExpert ? selectedExpert.nameEn : undefined}
                  onSuccess={() => setIsMediaDrawerOpen(false)} 
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
