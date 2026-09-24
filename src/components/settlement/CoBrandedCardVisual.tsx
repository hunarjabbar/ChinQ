import React, { useState } from 'react';
import { 
  Wifi, 
  CreditCard, 
  RotateCw, 
  Download, 
  ShieldCheck, 
  CheckCircle,
  FileText
} from 'lucide-react';
import { Locale } from '../../types';
import { CardRegistrationData } from '../../types/settlement';
import { generateCardDossierPdf } from '../../lib/settlement/pdf';

interface Props {
  lang: Locale;
  cardData?: Partial<CardRegistrationData>;
  interactive?: boolean;
}

export function CoBrandedCardVisual({ 
  lang, 
  cardData = {
    fullNameOnCard: 'HAIDAR A. JABBAR',
    cardScheme: 'VISA',
    cardTier: 'PLATINUM',
    primaryCurrency: 'DUAL'
  },
  interactive = true 
}: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';

  const cardholderName = (cardData.fullNameOnCard || 'CARDHOLDER NAME').toUpperCase().slice(0, 26);
  const scheme = cardData.cardScheme || 'VISA';
  const tier = cardData.cardTier || 'PLATINUM';
  const currency = cardData.primaryCurrency || 'DUAL';

  const handleExportSvg = () => {
    const svgElement = document.getElementById('co-branded-card-svg');
    if (!svgElement) return;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Qi-ICA-${scheme}-${tier}-Card.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPdf = () => {
    generateCardDossierPdf({
      fullNameOnCard: cardholderName,
      legalName: cardData.legalName || cardholderName,
      nationality: cardData.nationality || 'Iraqi',
      dateOfBirth: cardData.dateOfBirth || '1985-06-15',
      passportNumber: cardData.passportNumber || 'A19827364',
      passportExpiry: cardData.passportExpiry || '2031-10-12',
      nationalId: cardData.nationalId || '198512345678',
      email: cardData.email || 'holder@ica-enterprise.iq',
      phone: cardData.phone || '+964 770 123 4567',
      residentialAddress: cardData.residentialAddress || 'Mansour, Baghdad, Iraq',
      employmentStatus: cardData.employmentStatus || 'Director / Business Owner',
      incomeRange: cardData.incomeRange || '$100k - $250k USD Equiv.',
      cardScheme: scheme,
      cardTier: tier,
      primaryCurrency: currency,
      billingCurrency: cardData.billingCurrency || 'IQD',
      deliveryOption: cardData.deliveryOption || 'PHYSICAL_BAGHDAD',
      termsAccepted: true,
      cbiKycAccepted: true
    }, `QI-ICA-${Date.now().toString().slice(-6)}`);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      
      {/* 3D Flip Card Container */}
      <div 
        className="w-full aspect-[1.586/1] rounded-2xl relative shadow-2xl transition-transform duration-700 cursor-pointer select-none perspective-1000"
        onClick={() => interactive && setIsFlipped(!isFlipped)}
        title={interactive ? 'Click to flip card' : undefined}
      >
        
        {/* FRONT FACE */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-2xl p-6 text-white overflow-hidden shadow-xl border border-red-400/40 backface-hidden transition-all duration-700 ${
            isFlipped ? 'rotate-y-180 opacity-0 pointer-events-none' : 'rotate-y-0 opacity-100'
          }`}
          style={{
            background: 'linear-gradient(135deg, #A00D26 0%, #C8102E 40%, #7F0A1E 100%)'
          }}
        >
          {/* Subtle Guilloche / Geometric Background Pattern */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* Top Bar: ICA Logo Left, Qi Logo Right */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#C8102E] font-black text-xs shadow-sm">
                ICA
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-black tracking-widest uppercase">Iraqi-Chinese Agency</span>
                <span className="text-[8px] text-red-200 uppercase tracking-wider">Sovereign FinTech Rail</span>
              </div>
            </div>

            {/* Qi Card Emblem */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/30 border border-white/20 backdrop-blur-xs">
              <span className="font-black text-amber-300 text-xs tracking-tight">Qi Card</span>
              <span className="text-[8px] font-mono text-gray-200 uppercase">كي كارد</span>
            </div>
          </div>

          {/* Middle Row: EMV Chip & Contactless Wave */}
          <div className="flex items-center gap-4 mt-6 relative z-10">
            {/* EMV Chip */}
            <div className="w-12 h-9 rounded-md bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 border border-amber-600/60 shadow-inner flex items-center justify-center relative overflow-hidden">
              <div className="w-full h-[1px] bg-amber-800/40 absolute top-1/3"></div>
              <div className="w-full h-[1px] bg-amber-800/40 absolute top-2/3"></div>
              <div className="h-full w-[1px] bg-amber-800/40 absolute left-1/3"></div>
              <div className="h-full w-[1px] bg-amber-800/40 absolute left-2/3"></div>
              <div className="w-3 h-3 rounded-sm border border-amber-900/40"></div>
            </div>

            {/* Contactless Wave */}
            <Wifi size={20} className="rotate-90 text-white/80" />

            {/* Dual Currency Tag */}
            <div className="ms-auto px-2 py-0.5 rounded bg-white/10 text-[9px] font-mono font-bold tracking-wider uppercase border border-white/20">
              {currency === 'DUAL' ? 'IQD / RMB DUAL DIRECT' : `${currency} DIRECT`}
            </div>
          </div>

          {/* Card Number */}
          <div className="mt-5 relative z-10">
            <div className="font-mono text-lg sm:text-xl font-black tracking-[0.18em] text-white drop-shadow-md">
              5326 •••• •••• 8821
            </div>
          </div>

          {/* Bottom Row: Cardholder Name, Expiry, Scheme Badge */}
          <div className="mt-4 flex items-end justify-between relative z-10">
            <div>
              <div className="text-[7px] uppercase tracking-widest text-red-200">Cardholder</div>
              <div className="font-mono text-xs sm:text-sm font-bold tracking-wider text-white truncate max-w-[190px]">
                {cardholderName}
              </div>
            </div>

            <div>
              <div className="text-[7px] uppercase tracking-widest text-red-200">Expires</div>
              <div className="font-mono text-xs font-bold text-white">09/30</div>
            </div>

            {/* Visa / Mastercard Badge */}
            <div className="text-end">
              {scheme === 'VISA' ? (
                <div className="font-black italic text-lg sm:text-xl tracking-tighter text-white drop-shadow">
                  VISA
                </div>
              ) : (
                <div className="flex items-center -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-red-500 opacity-90"></div>
                  <div className="w-6 h-6 rounded-full bg-amber-400 opacity-90"></div>
                </div>
              )}
              <div className="text-[7px] font-black uppercase tracking-widest text-amber-300">
                {tier}
              </div>
            </div>
          </div>

        </div>

        {/* BACK FACE */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-2xl bg-neutral-900 text-white overflow-hidden shadow-xl border border-neutral-700 backface-hidden transition-all duration-700 flex flex-col justify-between py-5 ${
            isFlipped ? 'rotate-y-0 opacity-100' : 'rotate-y-180 opacity-0 pointer-events-none'
          }`}
        >
          {/* Magnetic Stripe */}
          <div className="w-full h-11 bg-black/90 mt-1"></div>

          {/* Signature Strip & CVV */}
          <div className="px-6 space-y-2">
            <div className="flex items-center">
              <div className="h-8 bg-white/90 text-gray-800 font-mono italic text-[11px] flex items-center px-4 flex-1">
                Authorized Bilateral Representative
              </div>
              <div className="h-8 bg-amber-100 text-gray-900 font-mono font-bold text-xs flex items-center px-3 border border-amber-300">
                892
              </div>
            </div>

            {/* Hologram & Microtext */}
            <div className="flex items-center justify-between text-[8px] text-gray-400 leading-tight">
              <div className="max-w-[260px]">
                Issued by International Smart Card (ISC) under CBI Electronic Payment Regulations. Endorsed by Iraqi-Chinese Agency. Direct clearing via PBOC & CBI networks.
              </div>
              <div className="w-10 h-7 rounded bg-gradient-to-tr from-cyan-400 via-pink-400 to-amber-300 opacity-80 border border-white/30"></div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="px-6 flex items-center justify-between text-[9px] text-gray-400 font-mono">
            <span>Customer Service: +964 780 000 8821</span>
            <span>cbi.iq • qi.iq • ica.iq</span>
          </div>

        </div>

      </div>

      {/* Interactive Controls & Export Actions */}
      {interactive && (
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="pay-btn-secondary px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <RotateCw size={13} />
            <span>{isFlipped ? 'View Front Side' : 'View Back Side'}</span>
          </button>

          <button
            onClick={handleExportPdf}
            className="pay-btn-primary px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download size={13} />
            <span>Download Dossier (PDF)</span>
          </button>
        </div>
      )}

      {/* Hidden SVG element for SVG export */}
      <svg id="co-branded-card-svg" className="hidden" width="400" height="252" viewBox="0 0 400 252" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="252" rx="16" fill="#C8102E" />
        <rect x="0" y="0" width="400" height="252" rx="16" fill="url(#grad)" />
        <text x="24" y="36" fill="#ffffff" fontSize="12" fontWeight="bold">IRAQI-CHINESE AGENCY</text>
        <text x="320" y="36" fill="#fde047" fontSize="12" fontWeight="bold">QI CARD</text>
        <text x="24" y="145" fill="#ffffff" fontSize="18" fontFamily="monospace" fontWeight="bold">5326 •••• •••• 8821</text>
        <text x="24" y="215" fill="#ffffff" fontSize="12" fontFamily="monospace">{cardholderName}</text>
        <text x="330" y="215" fill="#ffffff" fontSize="16" fontWeight="bold">{scheme}</text>
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A00D26" />
            <stop offset="100%" stopColor="#7F0A1E" />
          </linearGradient>
        </defs>
      </svg>

    </div>
  );
}
