import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { Locale } from '../../types';
import { SettlementLayout } from '../../components/settlement/SettlementLayout';
import { getSettlementTranslation } from '../../locales/settlementTranslations';

export function SettlementContactPage() {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const lang = (paramLang === 'ck' ? 'ckb' : paramLang || 'en') as Locale;
  const t = (key: string) => getSettlementTranslation(lang, key);

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', org: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SettlementLayout lang={lang}>
      <div className="max-w-4xl mx-auto space-y-12">
        
        <div className="space-y-3 border-b border-gray-200 pb-6">
          <div className="pay-badge">
            Bilateral Trade Liaison
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Contact the Settlement Desk
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Connect directly with bilateral clearing officers, compliance specialists, and trade finance consultants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details */}
          <div className="md:col-span-5 space-y-6">
            <div className="pay-card p-6 space-y-4 text-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2">
                Regional Desks
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#C8102E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900">Baghdad Central Directorate</strong>
                    <span className="text-gray-500">Iraqi-Chinese Agency HQ, Al-Jadriya, Baghdad, Iraq</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#C8102E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900">Beijing Bilateral Liaison</strong>
                    <span className="text-gray-500">Chaoyang Trade Center, Beijing, China</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-[#C8102E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900">Direct Telephone Desk</strong>
                    <span className="text-gray-500 font-mono">+964 780 000 8821 / +86 10 8899 7721</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-[#C8102E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900">Official Settlement Desk Email</strong>
                    <span className="text-gray-500 font-mono">settlement@iraq-china.agency</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-[11px] text-gray-500 space-y-1">
              <div className="font-bold text-gray-800 flex items-center gap-1.5">
                <Clock size={13} className="text-[#C8102E]" />
                <span>Operating Hours</span>
              </div>
              <p>Baghdad: 08:30 – 16:30 (UTC+3) Sunday – Thursday</p>
              <p>Beijing: 09:00 – 17:00 (UTC+8) Monday – Friday</p>
            </div>
          </div>

          {/* Inquiry Message Form */}
          <div className="md:col-span-7 pay-card p-6 sm:p-8 space-y-5">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2">
              Direct Officer Message
            </h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 size={32} className="text-emerald-600 mx-auto" />
                <h4 className="font-black text-gray-900 text-sm">Message Transmitted</h4>
                <p className="text-xs text-gray-600">A bilateral clearing officer will follow up with your enterprise within 4 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Enterprise / Corporation Name</label>
                  <input
                    type="text"
                    value={form.org}
                    onChange={(e) => setForm({ ...form, org: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Official Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Inquiry / Transaction Context *</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Briefly state intended trade scope, approximate volume in IQD or RMB, and specific questions..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="pay-btn-primary w-full py-3 rounded-xl font-black text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={14} />
                  <span>Transmit Inquiry to Settlement Desk</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </SettlementLayout>
  );
}
