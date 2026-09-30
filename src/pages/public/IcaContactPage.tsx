import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function IcaContactPage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    subject: '',
    department: 'diplomatic' as any,
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    portalStore.addInquiry({
      name: formData.name,
      organization: formData.organization,
      email: formData.email,
      subject: formData.subject,
      department: formData.department,
      message: formData.message,
      assignedDesk: 'Secretariat Intake Desk'
    });
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-brand-800)] block mb-2">
            Institutional Communications
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#000000]">
            Contact the General Secretariat
          </h1>
          <p className="text-sm text-[#4B5563] mt-2 max-w-xl mx-auto">
            Direct coordination for sovereign delegations, press accreditations, corporate tenders, and consular clearance inquiries.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-[#FEE2E2] border border-[var(--color-brand-800)]/20 text-center space-y-3">
            <CheckCircle2 size={36} className="text-[var(--color-brand-800)] mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#991B1B]">
              Inquiry Dispatched to General Secretariat
            </h3>
            <p className="text-xs text-[#991B1B]/80 max-w-md mx-auto">
              Your transmission has been logged into the sovereign ledger. A dedicated secretariat desk officer in Baghdad or Beijing will acknowledge receipt within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#000000] uppercase mb-2">
                  Plenipotentiary / Delegate Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
                  placeholder="e.g. Dr. Haidar Al-Mansour"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#000000] uppercase mb-2">
                  Institutional Organization *
                </label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={e => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
                  placeholder="e.g. Ministry of Transport / Enterprise"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#000000] uppercase mb-2">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
                  placeholder="official@institution.gov"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#000000] uppercase mb-2">
                  Secretariat Department *
                </label>
                <select
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
                >
                  <option value="diplomatic">Diplomatic Protocol & Accords</option>
                  <option value="consular">Consular & Visa Fast-Track</option>
                  <option value="investment">Corridor Investment & Tenders</option>
                  <option value="press">Newsroom Press Accreditation</option>
                  <option value="general">General Secretariat Inquiries</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#000000] uppercase mb-2">
                Subject Matter *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
                placeholder="Brief summary of diplomatic or business inquiry"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#000000] uppercase mb-2">
                Official Message & Context *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
                placeholder="Include accreditation references, flight or delegation dates, and official requirements..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#A00D26] active:bg-[#7F0A1E] text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send size={14} />
              <span>Transmit to Secretariat Desk</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default IcaContactPage;
