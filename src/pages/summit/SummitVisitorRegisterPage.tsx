import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { 
  Users, CheckCircle2, QrCode, Download, 
  ArrowRight, ShieldCheck, Mail, Building, MapPin 
} from 'lucide-react';

export function SummitVisitorRegisterPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    organization: '',
    email: '',
    phone: '',
    visitorType: 'Trade Buyer / Importer',
    interestedSectors: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SummitLayout lang={lang} activeNav="visitor">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        
        {/* Header Hero */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4 text-center">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 inline-block">
            Complimentary Trade Pass
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
            {lang === 'ar' ? 'تسجيل الزوار والمشترين والتجار' : lang === 'zh' ? '专业观众与采购商免费注册通道' : lang === 'ckb' ? 'تۆماری سەردانکەران و کڕیاران' : 'Professional Visitor & Buyer Pass'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
            {lang === 'ar'
              ? 'احصل على شارتك الإلكترونية المجانية لحضور المعرض وجلسات المنتدى العام، مع إمكانية الوصول إلى مكاتب المطابقة التجارية.'
              : 'Register your digital credentials for 3-day access to all 11 Sector Pavilions, opening plenaries, and open networking zones.'}
          </p>
        </div>

        {submitted ? (
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-brand-800/60 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-neutral-900 dark:text-neutral-100">
                Visitor Badge Confirmed!
              </h2>
              <p className="text-xs text-neutral-500">
                A confirmation copy with your digital pass has been sent to <strong>{formData.email}</strong>.
              </p>
            </div>

            {/* Digital Badge Mockup */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 max-w-sm mx-auto text-left space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 pb-3">
                <div className="text-[10px] font-black uppercase tracking-wider text-brand-800 dark:text-brand-400">
                  SUMMIT 2026 DELEGATE
                </div>
                <div className="text-[10px] font-bold text-neutral-400">SULAYMANIYAH</div>
              </div>

              <div>
                <h3 className="text-base font-black text-neutral-900 dark:text-neutral-100">{formData.fullName}</h3>
                <div className="text-xs text-neutral-600 dark:text-neutral-300 font-bold">{formData.title}</div>
                <div className="text-xs text-neutral-500">{formData.organization}</div>
              </div>

              <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
                <QrCode size={96} className="text-neutral-900 dark:text-neutral-100" />
              </div>

              <div className="text-[10px] text-center text-neutral-400">
                Valid Nov 18–20, 2026 • Fairground Halls A/B/C
              </div>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                to={`/${lang}/summit/b2b-matchmaking`}
                className="px-6 py-2.5 rounded-xl bg-brand-800 text-white text-xs font-bold hover:bg-brand-900 transition-colors"
              >
                Schedule B2B Meetings Now →
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-10 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-neutral-700 dark:text-neutral-300">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Tariq Al-Bayati"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-neutral-700 dark:text-neutral-300">Job Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Procurement Director"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-neutral-700 dark:text-neutral-300">Company / Organization</label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="e.g. Al-Mesopotamia General Trading Co."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-neutral-700 dark:text-neutral-300">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="procurement@company.iq"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-neutral-700 dark:text-neutral-300">Mobile Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+964 770 000 0000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-neutral-700 dark:text-neutral-300">Delegate Category</label>
                <select
                  value={formData.visitorType}
                  onChange={(e) => setFormData({ ...formData, visitorType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                >
                  <option value="Trade Buyer / Importer">Trade Buyer / Importer</option>
                  <option value="Engineering Contractor">Engineering Contractor (EPC)</option>
                  <option value="Investor / Financier">Investor / Private Equity</option>
                  <option value="Government Official">Government & Municipal Official</option>
                  <option value="Academic / Researcher">Academic / Think Tank Fellow</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Generate Instant QR Visitor Pass →
            </button>
          </form>
        )}

      </div>
    </SummitLayout>
  );
}
