import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  ShieldCheck, 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  Building2,
  Lock
} from 'lucide-react';
import { Locale } from '../../types';
import { SettlementInquiryFormData, SettlementDirection, SettlementType } from '../../types/settlement';
import { SettlementLayout } from '../../components/settlement/SettlementLayout';
import { getSettlementTranslation } from '../../locales/settlementTranslations';
import { generateInquiryPdf } from '../../lib/settlement/pdf';

export function SettlementInquiryPage() {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const navigate = useNavigate();
  const lang = (paramLang === 'ck' ? 'ckb' : paramLang || 'en') as Locale;
  const t = (key: string) => getSettlementTranslation(lang, key);
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';

  const [formData, setFormData] = useState<SettlementInquiryFormData>({
    organizationName: '',
    organizationType: 'CORPORATION',
    countryOfRegistration: 'Iraq',
    commercialRegNumber: '',
    taxRegNumber: '',
    contactName: '',
    contactTitle: '',
    email: '',
    phone: '',
    locale: lang,
    direction: 'IQD_TO_RMB',
    settlementType: 'TRADE_GOODS',
    sourceAmount: 50000000,
    sourceCurrency: 'IQD',
    counterpartyName: '',
    counterpartyCountry: 'China',
    counterpartyBank: '',
    counterpartySwift: '',
    counterpartyAccount: '',
    purpose: '',
    hsCodes: '',
    invoiceReference: '',
    sanctionsAttested: false,
    antiMoneyLaunderingAttested: false,
    cbiComplianceAttested: false,
    beneficialOwnerAttested: false,
    facilitationRoleUnderstood: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'sourceAmount') {
      setFormData(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Basic Validation
    if (!formData.organizationName.trim()) {
      setErrorMsg('Please enter organization name.');
      return;
    }
    if (!formData.contactName.trim() || !formData.email.trim()) {
      setErrorMsg('Please provide contact officer name and business email.');
      return;
    }
    if (formData.purpose.trim().length < 20) {
      setErrorMsg('Please provide a descriptive trade purpose (minimum 20 characters).');
      return;
    }
    if (!formData.sanctionsAttested || !formData.antiMoneyLaunderingAttested || !formData.cbiComplianceAttested || !formData.beneficialOwnerAttested || !formData.facilitationRoleUnderstood) {
      setErrorMsg('Please acknowledge and sign all 5 regulatory compliance attestations.');
      return;
    }

    setIsSubmitting(true);
    const generatedRef = `SETTLE-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      await fetch('/api/settlement/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, referenceId: generatedRef })
      });
    } catch {
      // Sandbox fallback continues smoothly
    }

    // Generate immediate PDF
    try {
      generateInquiryPdf(formData, generatedRef);
    } catch (err) {
      console.warn('PDF auto-download encountered non-blocking warning', err);
    }

    // Navigate to confirmation page
    navigate(`/${lang}/settlement/inquiry/confirmation?ref=${generatedRef}`);
  };

  return (
    <SettlementLayout lang={lang}>
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="space-y-3 border-b border-gray-200 pb-6">
          <div className="pay-badge">
            Bilateral Trade Intake
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            {t('settlement.inquiry.title')}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl">
            {t('settlement.inquiry.subtitle')}
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-[#991B1B] flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: Remitter Entity Details */}
          <div className="pay-card p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <Building2 size={18} className="text-[#C8102E]" />
              <h2 className="text-sm font-black uppercase tracking-wider text-gray-900">
                1. Remitter (Payer) Enterprise Profile
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 mb-1">{t('settlement.inquiry.orgName')} *</label>
                <input
                  type="text"
                  name="organizationName"
                  required
                  placeholder="e.g. Al-Rafidain Heavy Machinery Trading LLC"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">{t('settlement.inquiry.orgType')}</label>
                <select
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E] bg-white"
                >
                  <option value="CORPORATION">Joint Stock / Limited Liability Corporation</option>
                  <option value="SME">Small or Medium Enterprise (SME)</option>
                  <option value="GOVERNMENT_TIED">State-Owned / Mixed Public Sector</option>
                  <option value="INDIVIDUAL_TRADER">Licensed Individual Merchant</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">{t('settlement.inquiry.country')}</label>
                <input
                  type="text"
                  name="countryOfRegistration"
                  value={formData.countryOfRegistration}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">{t('settlement.inquiry.crNo')} *</label>
                <input
                  type="text"
                  name="commercialRegNumber"
                  required
                  placeholder="e.g. 102948-BAG"
                  value={formData.commercialRegNumber}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">{t('settlement.inquiry.taxNo')} *</label>
                <input
                  type="text"
                  name="taxRegNumber"
                  required
                  placeholder="e.g. IQ-TIN-889021"
                  value={formData.taxRegNumber}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">{t('settlement.inquiry.contactName')} *</label>
                <input
                  type="text"
                  name="contactName"
                  required
                  placeholder="Authorized Officer Name"
                  value={formData.contactName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">{t('settlement.inquiry.contactTitle')}</label>
                <input
                  type="text"
                  name="contactTitle"
                  placeholder="e.g. Managing Director / CFO"
                  value={formData.contactTitle}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">{t('settlement.inquiry.email')} *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="officer@company.iq"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">{t('settlement.inquiry.phone')} *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+964 780 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Transaction Parameters & Beneficiary */}
          <div className="pay-card p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <FileText size={18} className="text-[#C8102E]" />
              <h2 className="text-sm font-black uppercase tracking-wider text-gray-900">
                2. Transaction Scope & Counterparty Beneficiary
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">{t('settlement.inquiry.direction')}</label>
                <select
                  name="direction"
                  value={formData.direction}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E] bg-white font-bold"
                >
                  <option value="IQD_TO_RMB">IQD ➔ RMB (Import from China)</option>
                  <option value="RMB_TO_IQD">RMB ➔ IQD (Export / Project Inflow)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">{t('settlement.inquiry.amount')} *</label>
                <input
                  type="number"
                  name="sourceAmount"
                  required
                  value={formData.sourceAmount}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E] font-mono font-bold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 mb-1">Chinese Beneficiary Entity Name *</label>
                <input
                  type="text"
                  name="counterpartyName"
                  required
                  placeholder="e.g. Shenzhen Huaxin Optoelectronics Technology Co., Ltd."
                  value={formData.counterpartyName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Beneficiary Bank *</label>
                <input
                  type="text"
                  name="counterpartyBank"
                  required
                  placeholder="e.g. Bank of China (Shenzhen Branch)"
                  value={formData.counterpartyBank}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">SWIFT / CIPS Code</label>
                <input
                  type="text"
                  name="counterpartySwift"
                  placeholder="e.g. BKCHCNBJ400"
                  value={formData.counterpartySwift}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 mb-1">Beneficiary Account Number / IBAN *</label>
                <input
                  type="text"
                  name="counterpartyAccount"
                  required
                  placeholder="e.g. 6217 0098 4410 8892"
                  value={formData.counterpartyAccount}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E] font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 mb-1">{t('settlement.inquiry.purpose')} * (Min. 20 chars)</label>
                <textarea
                  name="purpose"
                  rows={3}
                  required
                  placeholder="Describe goods, machinery specifications, container volume, origin port, and commercial agreement context..."
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Customs HS Codes (Optional)</label>
                <input
                  type="text"
                  name="hsCodes"
                  placeholder="e.g. 8471.30, 8504.40"
                  value={formData.hsCodes}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Commercial Invoice Reference (Optional)</label>
                <input
                  type="text"
                  name="invoiceReference"
                  placeholder="e.g. INV-2026-CHN-098"
                  value={formData.invoiceReference}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: Compliance & Attestations */}
          <div className="pay-card p-6 sm:p-8 space-y-4 border-s-4 border-s-[#C8102E]">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <ShieldCheck size={18} className="text-[#C8102E]" />
              <h2 className="text-sm font-black uppercase tracking-wider text-gray-900">
                3. Mandatory Regulatory & Sanctions Attestations
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  name="sanctionsAttested"
                  checked={formData.sanctionsAttested}
                  onChange={handleChange}
                  className="mt-0.5 text-[#C8102E] focus:ring-red-500"
                />
                <span className="text-gray-700 leading-snug">
                  I certify that all remitter and beneficiary entities are free from UN Security Council and Central Bank of Iraq sanctions.
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  name="antiMoneyLaunderingAttested"
                  checked={formData.antiMoneyLaunderingAttested}
                  onChange={handleChange}
                  className="mt-0.5 text-[#C8102E] focus:ring-red-500"
                />
                <span className="text-gray-700 leading-snug">
                  I attest compliance with Iraq AML/CFT Law No. 39 of 2015 and affirm funds are legitimate trade capital.
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  name="cbiComplianceAttested"
                  checked={formData.cbiComplianceAttested}
                  onChange={handleChange}
                  className="mt-0.5 text-[#C8102E] focus:ring-red-500"
                />
                <span className="text-gray-700 leading-snug">
                  I agree to submit all commercial invoices and customs declarations to the CBI foreign currency clearance platform.
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  name="beneficialOwnerAttested"
                  checked={formData.beneficialOwnerAttested}
                  onChange={handleChange}
                  className="mt-0.5 text-[#C8102E] focus:ring-red-500"
                />
                <span className="text-gray-700 leading-snug">
                  Ultimate Beneficial Ownership (UBO) identity is declared honestly and without nominee concealment.
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  name="facilitationRoleUnderstood"
                  checked={formData.facilitationRoleUnderstood}
                  onChange={handleChange}
                  className="mt-0.5 text-[#C8102E] focus:ring-red-500"
                />
                <span className="text-gray-700 leading-snug font-bold">
                  I understand that ICA operates exclusively as a bilateral trade facilitator, and actual banking settlement occurs through accredited CBI-licensed commercial banks.
                </span>
              </label>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
            <span className="text-xs text-gray-500">
              Upon submission, an official PDF dossier with cryptographic hash will download immediately.
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="pay-btn-primary px-8 py-3.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              <Send size={15} />
              <span>{isSubmitting ? 'Registering Dossier...' : t('settlement.inquiry.submit')}</span>
            </button>
          </div>

        </form>

      </div>
    </SettlementLayout>
  );
}
