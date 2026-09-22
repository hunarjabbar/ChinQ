import React, { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { 
  PhoneCall, Mail, MapPin, Building, 
  CheckCircle2, Send, ArrowRight, Globe 
} from 'lucide-react';

export function SummitContactPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  const [searchParams] = useSearchParams();

  const initialSubject = searchParams.get('subject') || 'General Summit Inquiry';

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: initialSubject,
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SummitLayout lang={lang} activeNav="contact">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12">
        
        {/* Header Hero */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-brand-800 dark:text-brand-400" />
            <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
              {lang === 'ar' ? 'الأمانة العامة للقمة والمعرض' : lang === 'zh' ? '峰会执委会与秘书处联系通道' : lang === 'ckb' ? 'پەیوەندی بە دەستەی بەڕێوەبەری لووتکە' : 'Summit Secretariat & Organizing Board'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
            {lang === 'ar' ? 'تواصل مع أمانة قمة ومعرض السليمانية' : lang === 'zh' ? '联系苏莱曼尼亚中伊经济峰会执行秘书处' : lang === 'ckb' ? 'پەیوەندی بە سکرتاریەتی لووتکە' : 'Contact Summit Secretariat'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            {lang === 'ar'
              ? 'فرق الأمانة العامة متواجدة في السليمانية وبغداد وبكين للرد على كافة الاستفسارات الدبلوماسية والتجارية.'
              : 'Our bilateral secretariat desks in Sulaymaniyah, Baghdad, and Beijing are on standby to coordinate inquiries.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Direct Secretariat Contacts */}
          <div className="space-y-6 md:col-span-1 text-xs">
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="font-black uppercase tracking-wider text-brand-800 dark:text-brand-400 flex items-center gap-2">
                <Building size={16} />
                <span>Sulaymaniyah Secretariat</span>
              </div>
              <div className="text-neutral-600 dark:text-neutral-300">
                Sulaymaniyah International Fairground Complex, Tasluja Road, Sulaymaniyah, KRI, Iraq
              </div>
              <div className="text-neutral-500 font-bold">Tel: +964 770 190 2026</div>
              <div className="text-neutral-500 font-bold">Email: sulaymaniyah@iraqchina-summit.org</div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="font-black uppercase tracking-wider text-brand-800 dark:text-brand-400 flex items-center gap-2">
                <Globe size={16} />
                <span>Beijing Liaison Mission</span>
              </div>
              <div className="text-neutral-600 dark:text-neutral-300">
                Tower B, China World Trade Center, Chaoyang District, Beijing, PRC
              </div>
              <div className="text-neutral-500 font-bold">Tel: +86 10 8590 2026</div>
              <div className="text-neutral-500 font-bold">Email: beijing@iraqchina-summit.org</div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-emerald-300 dark:border-emerald-800 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-lg font-black text-neutral-900 dark:text-neutral-100">Message Delivered</h3>
                <p className="text-xs text-neutral-500">
                  The Secretariat team will respond to <strong>{formData.email}</strong> within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-neutral-700 dark:text-neutral-300">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Li Wei / Ahmed Hassan"
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
                      placeholder="contact@enterprise.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300">Inquiry Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300">Detailed Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide inquiry details, pavilion questions, or delegation requests..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Send Message to Secretariat →
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </SummitLayout>
  );
}
