import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { 
  Landmark, ShieldCheck, CheckCircle2, 
  ArrowRight, FileText, Lock, Globe 
} from 'lucide-react';

export function SummitVipRegisterPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    officialName: '',
    diplomaticTitle: '',
    ministryOrEntity: '',
    country: 'Iraq',
    officialEmail: '',
    protocolPhone: '',
    requiresSecurityEscort: true,
    requiresBilingualAide: true,
    delegationCount: '1'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SummitLayout lang={lang} activeNav="vip">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        
        {/* Header Hero */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4 text-center">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-brand-100 dark:bg-brand-950 text-brand-900 dark:text-brand-300 inline-block">
            Diplomatic & Ministerial Protocol
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
            {lang === 'ar' ? 'تسجيل الوفود الرسمية والدبلوماسية (VIP)' : lang === 'zh' ? '政要、使节与部委代表团官方注册通道' : lang === 'ckb' ? 'تۆماری شاندی فەرمی و دیپلۆماسی' : 'VIP & Diplomatic Delegation Accreditation'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
            {lang === 'ar'
              ? 'مخصص للسادة الوزراء، السفراء، القناصل، ورؤساء الهيئات المستقلة وغرف التجارة الرسمية لترتيب المراسم والضيافة والتصاريح الأمنية.'
              : 'Direct liaison for ministers, ambassadors, governors, and sovereign institution leaders to coordinate protocol, bilateral salons, and executive escorts.'}
          </p>
        </div>

        {submitted ? (
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-brand-800/60 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-800 dark:text-brand-400 flex items-center justify-center mx-auto">
              <ShieldCheck size={36} />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-neutral-900 dark:text-neutral-100">
                Protocol Dossier Logged
              </h2>
              <p className="text-xs text-neutral-500">
                Accreditation Code: <strong className="text-brand-800">VIP-PROTO-{Math.floor(10000 + Math.random() * 90000)}</strong>. The Chief Protocol Officer in Sulaymaniyah has been notified for <strong>{formData.officialName}</strong>.
              </p>
            </div>

            <div className="pt-4">
              <Link
                to={`/${lang}/summit`}
                className="px-6 py-2.5 rounded-xl bg-brand-800 text-white text-xs font-bold hover:bg-brand-900 transition-colors"
              >
                Return to Summit Portal
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-10 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300">Dignitary Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.officialName}
                    onChange={(e) => setFormData({ ...formData, officialName: e.target.value })}
                    placeholder="H.E. [Full Name]"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300">Official Title / Diplomatic Rank</label>
                  <input
                    type="text"
                    required
                    value={formData.diplomaticTitle}
                    onChange={(e) => setFormData({ ...formData, diplomaticTitle: e.target.value })}
                    placeholder="e.g. Minister of Industry / Ambassador Extraordinary"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-neutral-700 dark:text-neutral-300">Ministry / Sovereign Institution / Embassy</label>
                <input
                  type="text"
                  required
                  value={formData.ministryOrEntity}
                  onChange={(e) => setFormData({ ...formData, ministryOrEntity: e.target.value })}
                  placeholder="e.g. Ministry of Industry and Minerals, Republic of Iraq"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300">Government / Institutional Email</label>
                  <input
                    type="email"
                    required
                    value={formData.officialEmail}
                    onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                    placeholder="protocol@ministry.gov.iq"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300">Protocol Officer Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.protocolPhone}
                    onChange={(e) => setFormData({ ...formData, protocolPhone: e.target.value })}
                    placeholder="+964 770 000 0000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                  />
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.requiresSecurityEscort}
                    onChange={(e) => setFormData({ ...formData, requiresSecurityEscort: e.target.checked })}
                    className="rounded text-brand-800 focus:ring-brand-800"
                  />
                  <span>Require Airport Motorcade & Sovereign Security Escort from ISU Airport.</span>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.requiresBilingualAide}
                    onChange={(e) => setFormData({ ...formData, requiresBilingualAide: e.target.checked })}
                    className="rounded text-brand-800 focus:ring-brand-800"
                  />
                  <span>Assign Dedicated Institute Diplomatic Liaison Aide (Arabic/Chinese/English/Kurdish).</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Submit VIP Protocol Credentials →
            </button>
          </form>
        )}

      </div>
    </SummitLayout>
  );
}
