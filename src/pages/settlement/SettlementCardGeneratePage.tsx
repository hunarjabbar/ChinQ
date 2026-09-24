import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CreditCard, 
  RotateCw, 
  Download, 
  CheckCircle2, 
  Code, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Locale } from '../../types';
import { CardRegistrationData } from '../../types/settlement';
import { SettlementLayout } from '../../components/settlement/SettlementLayout';
import { CoBrandedCardVisual } from '../../components/settlement/CoBrandedCardVisual';
import { getSettlementTranslation } from '../../locales/settlementTranslations';

export function SettlementCardGeneratePage() {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const lang = (paramLang === 'ck' ? 'ckb' : paramLang || 'en') as Locale;
  const t = (key: string) => getSettlementTranslation(lang, key);

  const [cardData, setCardData] = useState<Partial<CardRegistrationData>>({
    fullNameOnCard: 'HAIDAR A. JABBAR',
    cardScheme: 'VISA',
    cardTier: 'PLATINUM',
    primaryCurrency: 'DUAL'
  });

  const [submittedForIssuance, setSubmittedForIssuance] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ica_card_registration');
      if (saved) {
        const parsed = JSON.parse(saved);
        setCardData(prev => ({
          ...prev,
          fullNameOnCard: parsed.fullNameOnCard || prev.fullNameOnCard,
          cardScheme: parsed.cardScheme || prev.cardScheme,
          cardTier: parsed.cardTier || prev.cardTier,
          primaryCurrency: parsed.primaryCurrency || prev.primaryCurrency
        }));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, fullNameOnCard: e.target.value.toUpperCase().slice(0, 26) }));
  };

  const handleSchemeChange = (scheme: 'VISA' | 'MASTERCARD') => {
    setCardData(prev => ({ ...prev, cardScheme: scheme }));
  };

  const handleTierChange = (tier: 'CLASSIC' | 'GOLD' | 'PLATINUM' | 'WORLD') => {
    setCardData(prev => ({ ...prev, cardTier: tier }));
  };

  const handleCurrencyChange = (curr: 'DUAL' | 'IQD' | 'RMB') => {
    setCardData(prev => ({ ...prev, primaryCurrency: curr }));
  };

  const handleIssuanceSubmit = () => {
    setSubmittedForIssuance(true);
  };

  return (
    <SettlementLayout lang={lang}>
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-3 border-b border-gray-200 pb-6">
          <div className="pay-badge">
            Interactive FinTech Studio
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Co-Branded Card Generation & Preview
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Customize embossing, toggle between Visa and Mastercard schemes, inspect front and back security elements, and export official card dossiers.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Card Preview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 flex flex-col items-center">
              <CoBrandedCardVisual 
                lang={lang} 
                cardData={cardData} 
                interactive={true} 
              />
            </div>

            {submittedForIssuance && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                <span>
                  <strong>Application Queued for Issuance:</strong> Your personalized card dossier has been transmitted to International Smart Card (Qi Card) Baghdad Operations Center.
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-5 pay-card p-6 space-y-5 text-xs">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2">
              Studio Controls
            </h3>

            {/* Embossed Name */}
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Embossed Name (Max 26 chars)
              </label>
              <input
                type="text"
                maxLength={26}
                value={cardData.fullNameOnCard || ''}
                onChange={handleNameChange}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono font-bold uppercase focus:outline-none focus:border-[#C8102E]"
              />
            </div>

            {/* Scheme Toggle */}
            <div>
              <label className="block font-bold text-gray-700 mb-1.5">Payment Scheme</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleSchemeChange('VISA')}
                  className={`py-2 px-3 rounded-lg font-bold border transition-all cursor-pointer ${
                    cardData.cardScheme === 'VISA' 
                      ? 'border-[#C8102E] bg-red-50 text-[#C8102E]' 
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Visa
                </button>
                <button
                  type="button"
                  onClick={() => handleSchemeChange('MASTERCARD')}
                  className={`py-2 px-3 rounded-lg font-bold border transition-all cursor-pointer ${
                    cardData.cardScheme === 'MASTERCARD' 
                      ? 'border-[#C8102E] bg-red-50 text-[#C8102E]' 
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Mastercard
                </button>
              </div>
            </div>

            {/* Card Tier */}
            <div>
              <label className="block font-bold text-gray-700 mb-1.5">Card Tier</label>
              <div className="grid grid-cols-2 gap-2">
                {(['PLATINUM', 'GOLD', 'WORLD', 'CLASSIC'] as const).map((tr) => (
                  <button
                    key={tr}
                    type="button"
                    onClick={() => handleTierChange(tr)}
                    className={`py-1.5 px-2 rounded-lg font-bold text-[11px] border transition-all cursor-pointer ${
                      cardData.cardTier === tr 
                        ? 'border-[#C8102E] bg-red-50 text-[#C8102E]' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tr}
                  </button>
                ))}
              </div>
            </div>

            {/* Currency Sub-Wallet */}
            <div>
              <label className="block font-bold text-gray-700 mb-1.5">Linked Currency</label>
              <select
                value={cardData.primaryCurrency}
                onChange={(e) => handleCurrencyChange(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold bg-white text-xs"
              >
                <option value="DUAL">IQD / RMB Dual Direct Linked</option>
                <option value="IQD">IQD Primary Account</option>
                <option value="RMB">RMB Primary Account</option>
              </select>
            </div>

            {/* Issuance Action */}
            <div className="pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={handleIssuanceSubmit}
                disabled={submittedForIssuance}
                className="pay-btn-primary w-full py-3 rounded-xl font-black text-xs shadow-md disabled:opacity-50"
              >
                {submittedForIssuance ? 'Application Transmitted' : 'Submit for Production Issuance'}
              </button>
            </div>
          </div>

        </div>

        {/* TODO Production Licensing Architecture Notice */}
        <div className="p-6 rounded-2xl bg-gray-900 text-gray-200 border border-gray-800 space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
            <Code size={16} />
            <span>Qi Card & CBI Card Issuance Integration Architecture</span>
          </div>
          <p className="text-gray-300 leading-relaxed text-[11px]">
            <strong>Production Issuance Pipeline:</strong> Physical card embossing and smart chip provisioning require active host integration with International Smart Card (ISC) EMV personalization centers in Baghdad and Erbil under Central Bank of Iraq card issuance mandates. Digital card tokenization hooks directly into Apple Pay and Google Wallet via Qi Card's certified BIN ranges (Visa BIN 4000xx / Mastercard BIN 5326xx).
          </p>
        </div>

      </div>
    </SettlementLayout>
  );
}
