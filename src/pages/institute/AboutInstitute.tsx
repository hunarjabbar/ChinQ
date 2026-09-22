import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { 
  Building2, 
  ShieldCheck, 
  Globe, 
  FileCheck, 
  Users, 
  Award,
  ChevronRight,
  ArrowRight,
  Gavel,
  Scale,
  Download,
  X
} from 'lucide-react';
import { generateInstitutionalPdf } from '../../utils/pdfGenerator';
import { MediaRequestForm } from '../../components/institute/MediaRequestForm';
import { toast } from 'sonner';
import { useI18n } from '../../hooks/useI18n';

export function AboutInstitute() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  const { t } = useI18n(lang);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const handleDownloadReport = (year: string) => {
    const success = generateInstitutionalPdf({
      title: `CISE ${year} Annual Institutional Governance & Audit Report`,
      category: 'Annual Governance Report',
      summary: `Official annual audit, research performance benchmarks, and transparency compliance report of the Chinese Institute for Strategic and Economic Studies for fiscal year ${year}.`,
      author: 'Board of Governors & Financial Audit Directorate',
      fileName: `CISE-${year}-Annual-Report.pdf`,
      content: [
        `1. Financial Transparency: In ${year}, CISE maintained 100% independent non-partisan funding with full compliance under Iraqi and international auditing standards.`,
        `2. Research Outputs: Published over 40 policy briefs, working papers, and quarterly macroeconomic outlooks tracking the Iraq–China bilateral trade corridor.`,
        `3. Institutional Partnerships: Established syndication agreements with international academic institutions, think tanks, and sovereign economic planning bodies.`
      ]
    });
    if (success) {
      toast.success(`Downloaded ${year} Institutional Report`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-20">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-[#0284C7]">
          <Building2 size={18} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t('about.charter.eyebrow')}</span>
        </div>
        <h1 className="text-3xl lg:text-5xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter">
          {t('about.charter.title')}
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium max-w-2xl leading-relaxed" style={{ unicodeBidi: 'plaintext', textAlign: 'start' }}>
          {t('about.charter.intro')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {/* Mission & Charter */}
          <section className="bg-white dark:bg-neutral-900 rounded-3xl p-8 lg:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter">{t('about.charter.sectionTitle')}</h3>
              <p className="text-base text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed" style={{ unicodeBidi: 'plaintext', textAlign: 'start' }}>
                {t('about.charter.body')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 charter-card__body">
                <div className="w-10 h-10 rounded-lg bg-[#0F172A] flex items-center justify-center text-[#D97706]">
                  <Scale size={20} />
                </div>
                <h4 className="text-sm font-black text-[#0F172A] dark:text-white uppercase">{t('about.charter.researchIndependence.title')}</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium" style={{ unicodeBidi: 'plaintext', textAlign: 'start' }}>
                  {t('about.charter.researchIndependence.body')}
                </p>
              </div>
              <div className="space-y-3 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 charter-card__body">
                <div className="w-10 h-10 rounded-lg bg-[#0284C7] flex items-center justify-center text-white">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="text-sm font-black text-[#0F172A] dark:text-white uppercase">{t('about.charter.dataProvenance.title')}</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium" style={{ unicodeBidi: 'plaintext', textAlign: 'start' }}>
                  {t('about.charter.dataProvenance.body')}
                </p>
              </div>
            </div>
          </section>

          {/* Advisory Board */}
          <section className="space-y-8">
            <h3 className="text-2xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter">Advisory Board</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: 'Dr. Li Xiang', role: 'Chairman, Board of Governors', org: 'Tsinghua University' },
                { name: 'Ahmed Al-Jaber', role: 'Strategic Advisor', org: 'Iraq Council of Ministers' },
                { name: 'Dr. Sarah Chen', role: 'Macroeconomic Fellow', org: 'Suli University' },
                { name: 'Zhao Wei', role: 'Diplomatic Liaison', org: 'BRI Policy Group' },
              ].map(member => (
                <div key={member.name} className="flex items-center gap-4 p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
                   <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center text-neutral-400 font-black text-xs">
                     {member.name.split(' ').map(n => n[0]).join('')}
                   </div>
                   <div>
                     <h4 className="text-xs font-black text-[#0F172A] dark:text-white uppercase">{member.name}</h4>
                     <p className="text-[10px] font-bold text-[#0284C7] uppercase tracking-widest mt-0.5">{member.role}</p>
                     <p className="text-[9px] font-medium text-neutral-400 mt-0.5">{member.org}</p>
                   </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-[#0F172A] text-white rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6">
             <div className="flex items-center gap-2 text-[#D97706]">
                <FileCheck size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Reports</span>
             </div>
             <h3 className="text-xl font-black uppercase tracking-tight">Annual Reports</h3>
             <p className="text-xs text-neutral-400 leading-relaxed font-medium">
               Transparency is a core tenet of our charter. Access our annual 
               institutional audit and research performance reports.
             </p>
             <div className="space-y-3">
                <button 
                  onClick={() => handleDownloadReport('2025')}
                  className="w-full flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs font-black uppercase tracking-widest text-left"
                >
                   <span>2025 Annual Report</span>
                   <Download size={14} className="shrink-0" />
                </button>
                <button 
                  onClick={() => handleDownloadReport('2024')}
                  className="w-full flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs font-black uppercase tracking-widest text-left"
                >
                   <span>2024 Audit Statement</span>
                   <Download size={14} className="shrink-0" />
                </button>
             </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
             <div className="flex items-center gap-2 text-[#0284C7]">
                <Globe size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Contact</span>
             </div>
             <h3 className="text-xl font-black text-[#0F172A] dark:text-white uppercase tracking-tight">Institute HQ</h3>
             <div className="space-y-4 text-xs font-medium text-neutral-600 dark:text-neutral-400">
                <div className="flex items-start gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#D97706] mt-1.5 shrink-0" />
                   <p>Salim Street, CISE Building, Sulaymaniyah, Kurdistan Region, Iraq</p>
                </div>
                <div className="flex items-start gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#D97706] mt-1.5 shrink-0" />
                   <p>institute@iraq-china-agency.com</p>
                </div>
                <div className="flex items-start gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#D97706] mt-1.5 shrink-0" />
                   <p>+964 (0) 770 123 4567</p>
                </div>
             </div>
             <button 
               onClick={() => setShowInquiryModal(true)}
               className="w-full py-3 mt-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-black uppercase tracking-widest text-[#0F172A] dark:text-white hover:border-[#0284C7] transition-all"
             >
                Send Direct Inquiry
             </button>
          </div>
        </aside>
      </div>

      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800 mb-6">
              <div>
                <h3 className="text-base font-black uppercase text-[#0F172A] dark:text-white">Direct Institute Inquiry</h3>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-0.5">Sovereign & Academic Protocol</p>
              </div>
              <button 
                onClick={() => setShowInquiryModal(false)}
                className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-white rounded-lg"
              >
                <X size={18} />
              </button>
            </div>
            <MediaRequestForm 
              publicationTitle="Charter & Governance Inquiry"
              onSuccess={() => setShowInquiryModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
