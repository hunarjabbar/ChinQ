import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CreditCard, ShieldCheck, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';
import { Locale } from '../../types';
import { CardRegistrationData } from '../../types/settlement';
import { SettlementLayout } from '../../components/settlement/SettlementLayout';
import { getSettlementTranslation } from '../../locales/settlementTranslations';

export function SettlementCardRegisterPage() {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const navigate = useNavigate();
  const lang = (paramLang === 'ck' ? 'ckb' : paramLang || 'en') as Locale;
  const t = (key: string) => getSettlementTranslation(lang, key);

  const [formData, setFormData] = useState<CardRegistrationData>({
    fullNameOnCard: '',
    legalName: '',
    nationality: 'Iraqi',
    dateOfBirth: '',
    passportNumber: '',
    passportExpiry: '',
    nationalId: '',
    email: '',
    phone: '',
    residentialAddress: '',
    employmentStatus: 'CORPORATE_EXECUTIVE',
    incomeRange: '100K_250K',
    cardScheme: 'VISA',
    cardTier: 'PLATINUM',
    primaryCurrency: 'DUAL',
    billingCurrency: 'IQD',
    deliveryOption: 'PHYSICAL_BAGHDAD',
    termsAccepted: false,
    cbiKycAccepted: false
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'fullNameOnCard') {
      setFormData(prev => ({ ...prev, [name]: value.toUpperCase().slice(0, 26) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.fullNameOnCard.trim()) {
      setErrorMsg('Please specify cardholder embossed name (Latin characters, max 26).');
      return;
    }
    if (!formData.legalName.trim() || !formData.passportNumber.trim()) {
      setErrorMsg('Please complete all identification fields.');
      return;
    }
    if (!formData.termsAccepted || !formData.cbiKycAccepted) {
      setErrorMsg('Please agree to terms and CBI KYC authorization.');
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch('/api/settlement/card/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch {
      // Sandbox fallback continues
    }

    // Store in localStorage for generator pre-fill
    localStorage.setItem('ica_card_registration', JSON.stringify(formData));

    navigate(`/${lang}/settlement/card/generate`);
  };

  return (
    <SettlementLayout lang={lang}>
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="space-y-3 border-b border-gray-200 pb-6">
          <div className="pay-badge">
            KYC Intake
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Apply for Co-Branded Qi & ICA Card
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Issued by International Smart Card (Qi Card) under Central Bank of Iraq authorization.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-[#991B1B] flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Card Configuration */}
          <div className="pay-card p-6 sm:p-8 space-y-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2">
              1. Card Personalization & Preferences
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 mb-1">
                  Name on Card (Latin uppercase, max 26 characters) *
                </label>
                <input
                  type="text"
                  name="fullNameOnCard"
                  maxLength={26}
                  required
                  placeholder="e.g. ALI H. MOHAMMED"
                  value={formData.fullNameOnCard}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-mono uppercase font-bold focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Card Scheme</label>
                <select
                  name="cardScheme"
                  value={formData.cardScheme}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E] bg-white font-bold"
                >
                  <option value="VISA">Visa</option>
                  <option value="MASTERCARD">Mastercard</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Card Tier</label>
                <select
                  name="cardTier"
                  value={formData.cardTier}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E] bg-white font-bold"
                >
                  <option value="PLATINUM">Platinum (Executive Privilege)</option>
                  <option value="GOLD">Gold (Standard Merchant)</option>
                  <option value="WORLD">World / Infinite (Institutional)</option>
                  <option value="CLASSIC">Classic</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Primary Wallet</label>
                <select
                  name="primaryCurrency"
                  value={formData.primaryCurrency}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E] bg-white font-bold"
                >
                  <option value="DUAL">IQD & RMB Dual Direct Linked</option>
                  <option value="IQD">IQD Primary</option>
                  <option value="RMB">RMB Primary</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Delivery / Issuance Point</label>
                <select
                  name="deliveryOption"
                  value={formData.deliveryOption}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E] bg-white"
                >
                  <option value="PHYSICAL_BAGHDAD">Baghdad Qi Center (Mansour)</option>
                  <option value="PHYSICAL_ERBIL">Erbil Qi VIP Branch (Empire World)</option>
                  <option value="PHYSICAL_SULAIMANIYAH">Sulaimaniyah VIP Desk</option>
                  <option value="DIGITAL">Digital Card (Instant Virtual NFC)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Cardholder KYC Details */}
          <div className="pay-card p-6 sm:p-8 space-y-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2">
              2. Applicant Legal Identification
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  name="legalName"
                  required
                  placeholder="Official legal name"
                  value={formData.legalName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Nationality *</label>
                <input
                  type="text"
                  name="nationality"
                  required
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Passport Number *</label>
                <input
                  type="text"
                  name="passportNumber"
                  required
                  placeholder="e.g. A18273645"
                  value={formData.passportNumber}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E] font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Passport Expiry Date *</label>
                <input
                  type="date"
                  name="passportExpiry"
                  required
                  value={formData.passportExpiry}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Official Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@enterprise.iq"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+964 770 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Compliance & KYC Sign-off */}
          <div className="pay-card p-6 sm:p-8 space-y-3 border-s-4 border-s-[#C8102E] text-xs">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mt-0.5 text-[#C8102E] focus:ring-red-500"
              />
              <span className="text-gray-700">
                I agree to the Qi Card terms of service, schedule of tariffs, and electronic account agreement.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="cbiKycAccepted"
                checked={formData.cbiKycAccepted}
                onChange={handleChange}
                className="mt-0.5 text-[#C8102E] focus:ring-red-500"
              />
              <span className="text-gray-700">
                I authorize Qi Card and accredited banking partners to verify my identity records under CBI Anti-Money Laundering regulations.
              </span>
            </label>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="pay-btn-primary px-8 py-3 rounded-xl font-black text-xs sm:text-sm shadow-md"
            >
              {isSubmitting ? 'Registering...' : 'Proceed to Interactive Card Studio →'}
            </button>
          </div>

        </form>

      </div>
    </SettlementLayout>
  );
}
