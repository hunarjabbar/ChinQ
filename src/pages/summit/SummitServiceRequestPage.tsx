import React, { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { ICA_SERVICES } from '../../data/summitData';
import { 
  Briefcase, CheckCircle2, ShieldCheck, 
  ArrowRight, FileText, Send, Building 
} from 'lucide-react';

export function SummitServiceRequestPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  const [searchParams] = useSearchParams();

  const initialService = searchParams.get('service') || 'sourcing';

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    serviceSlug: initialService,
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    dealSize: '$500k - $2M',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SummitLayout lang={lang} activeNav="services">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        
        {/* Header Hero */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4 text-center">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-brand-100 dark:bg-brand-950 text-brand-900 dark:text-brand-300 inline-block">
            Service Desk Intake
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
            {lang === 'ar' ? 'طلب إحدى خدمات ICA التنفيذية' : lang === 'zh' ? 'ICA中伊商贸直采服务统一申请单' : lang === 'ckb' ? 'داواکاری خزمەتگوزارییەکانی ICA' : 'Unified ICA Service Desk Request'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
            {lang === 'ar'
              ? 'حدد الخدمة المطلوبة واشرح تفاصيل الصفقة أو الشحنة ليقوم فريق الخبراء لدينا في بغداد وبكين بالتواصل معك فوراً.'
              : 'Submit your procurement, currency settlement, insurance, or visa requirements for immediate dispatch.'}
          </p>
        </div>

        {submitted ? (
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-emerald-300 dark:border-emerald-800 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-neutral-900 dark:text-neutral-100">
                Service Request Dispatched!
              </h2>
              <p className="text-xs text-neutral-500">
                Ticket Reference: <strong className="text-brand-800">SRV-ICA-{Math.floor(10000 + Math.random() * 90000)}</strong>. An assigned trade officer will contact <strong>{formData.email}</strong> within 12 business hours.
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
              <div className="space-y-1">
                <label className="font-bold text-neutral-700 dark:text-neutral-300">Target ICA Service</label>
                <select
                  value={formData.serviceSlug}
                  onChange={(e) => setFormData({ ...formData, serviceSlug: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800 font-semibold"
                >
                  {ICA_SERVICES.map(s => (
                    <option key={s.id} value={s.slug}>{s.title[lang]} ({s.badge[lang]})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300">Company Name</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Al-Mashriq Logistics LLC"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300">Representative Name</label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Full Name"
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
                    placeholder="contact@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+964 770 000 0000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-neutral-700 dark:text-neutral-300">Estimated Transaction / Project Value</label>
                <select
                  value={formData.dealSize}
                  onChange={(e) => setFormData({ ...formData, dealSize: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                >
                  <option value="Under $100k">Under $100,000 USD</option>
                  <option value="$100k - $500k">$100,000 – $500,000 USD</option>
                  <option value="$500k - $2M">$500,000 – $2,000,000 USD</option>
                  <option value="$2M - $10M">$2,000,000 – $10,000,000 USD</option>
                  <option value="$10M+">$10,000,000+ USD (Sovereign / EPC Scale)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-neutral-700 dark:text-neutral-300">Scope Details & Requirements</label>
                <textarea
                  rows={4}
                  required
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Describe goods, manufacturer names, destination ports, or specific legal/clearing assistance needed..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Submit Service Request to Trade Desk →
            </button>
          </form>
        )}

      </div>
    </SummitLayout>
  );
}
