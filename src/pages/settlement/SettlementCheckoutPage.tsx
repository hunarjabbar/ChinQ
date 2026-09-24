import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowLeft, 
  Lock, 
  Clock, 
  ShieldCheck, 
  Landmark, 
  FileText, 
  Download, 
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { Locale } from '../../types';
import { SettlementLayout } from '../../components/settlement/SettlementLayout';
import { getSettlementTranslation } from '../../locales/settlementTranslations';
import { createRateLock, isRateLockValid, RateLock, processGatewayCheckout } from '../../lib/settlement/gateway';
import { jsPDF } from 'jspdf';

export function SettlementCheckoutPage() {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const lang = (paramLang === 'ck' ? 'ckb' : paramLang || 'en') as Locale;
  const t = (key: string) => getSettlementTranslation(lang, key);
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';

  const [step, setStep] = useState<number>(1);
  const [settlementType, setSettlementType] = useState<string>('TRADE_GOODS');
  const [payerName, setPayerName] = useState('Mesopotamia Industrial Imports LLC');
  const [payerEmail, setPayerEmail] = useState('procurement@mesopotamia-ind.iq');
  const [payerPhone, setPayerPhone] = useState('+964 790 123 4567');
  const [payerTaxId, setPayerTaxId] = useState('IQ-TIN-981240');
  
  const [beneficiaryName, setBeneficiaryName] = useState('Guangdong Heavy Machinery Export Corp.');
  const [beneficiaryCountry, setBeneficiaryCountry] = useState('China');
  const [beneficiaryBank, setBeneficiaryBank] = useState('Industrial and Commercial Bank of China (ICBC)');
  const [beneficiaryAccount, setBeneficiaryAccount] = useState('6222 •••• •••• 9912');
  const [beneficiarySwift, setBeneficiarySwift] = useState('ICBCCNBS');

  const [amount, setAmount] = useState<number>(85000000);
  const [currency, setCurrency] = useState<'IQD' | 'RMB'>('IQD');
  
  const [rateLock, setRateLock] = useState<RateLock | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(900); // 15 mins

  const [sanctionsDeclared, setSanctionsDeclared] = useState<boolean>(true);
  const [amlDeclared, setAmlDeclared] = useState<boolean>(true);
  const [uboDeclared, setUboDeclared] = useState<boolean>(true);

  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutResult, setCheckoutResult] = useState<{
    referenceId: string;
    instructionCode: string;
    status: string;
  } | null>(null);

  // Initialize or renew rate lock when entering Step 3
  useEffect(() => {
    if (step === 3 && !rateLock) {
      const lock = createRateLock('IQD', 'RMB');
      setRateLock(lock);
      setSecondsRemaining(900);
    }
  }, [step]);

  // Countdown timer for 15-minute rate lock
  useEffect(() => {
    if (!rateLock) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((rateLock.expiresAt - Date.now()) / 1000));
      setSecondsRemaining(remaining);
      if (remaining === 0) {
        // Auto renew lock
        setRateLock(createRateLock('IQD', 'RMB'));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [rateLock]);

  const targetAmount = currency === 'IQD' 
    ? (amount / 182.50)
    : (amount * 182.50);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExecuteCheckout = async () => {
    setIsProcessing(true);
    try {
      const res = await processGatewayCheckout({
        settlementType,
        payerName,
        payerEmail,
        payerPhone,
        payerTaxId,
        beneficiaryName,
        beneficiaryBank,
        beneficiaryAccount,
        beneficiarySwift,
        amount,
        sourceCurrency: currency,
        sanctionsDeclarationAccepted: sanctionsDeclared,
        amlDeclarationAccepted: amlDeclared,
        lockId: rateLock?.id
      });
      setCheckoutResult(res);
      setStep(6);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadInstructionPdf = () => {
    if (!checkoutResult) return;
    const doc = new jsPDF();
    doc.setFillColor(200, 16, 46);
    doc.rect(0, 0, 210, 22, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('OFFICIAL BILATERAL PAYMENT CLEARING INSTRUCTION', 14, 14);

    doc.setTextColor(17, 24, 39);
    doc.setFontSize(14);
    doc.text(`Instruction Ticket: ${checkoutResult.instructionCode}`, 14, 35);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Reference: ${checkoutResult.referenceId} | Standard: ISO 20022 MX (pacs.008)`, 14, 42);

    doc.setFillColor(249, 250, 251);
    doc.rect(14, 50, 182, 45, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Clearing Details:', 20, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(`Source Amount: ${amount.toLocaleString()} ${currency}`, 20, 68);
    doc.text(`Delivered Beneficiary Amount: ${targetAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${currency === 'IQD' ? 'RMB' : 'IQD'}`, 20, 76);
    doc.text(`Remitter: ${payerName} (TIN: ${payerTaxId})`, 20, 84);
    doc.text(`Beneficiary: ${beneficiaryName} (${beneficiaryBank} • SWIFT: ${beneficiarySwift})`, 20, 92);

    doc.text('Dispatched to Central Bank of Iraq designated settlement clearing hub.', 14, 115);
    doc.save(`${checkoutResult.instructionCode}.pdf`);
  };

  return (
    <SettlementLayout lang={lang}>
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <div className="pay-badge">
              Step {step} of 6
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
              Compliant Gateway Checkout
            </h1>
          </div>

          <div className="text-xs font-mono text-gray-500">
            Sandbox Simulator Active
          </div>
        </div>

        {/* Stepper Progress */}
        <div className="grid grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div 
              key={s} 
              className={`h-2 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-[#C8102E]' : 'bg-gray-200'
              }`}
            ></div>
          ))}
        </div>

        {/* STEP 1: Settlement Type */}
        {step === 1 && (
          <div className="pay-card p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-black text-gray-900">
              {t('settlement.gateway.step1')}
            </h2>

            <div className="space-y-3">
              {[
                { id: 'TRADE_GOODS', title: 'Commercial Goods & Machinery Import', desc: 'Direct clearing for containerized cargo, industrial equipment, electronics, and materials.' },
                { id: 'SERVICES', title: 'Technical, Consulting & Engineering Services', desc: 'Contractual service disbursements and technical consultation fees.' },
                { id: 'INFRASTRUCTURE', title: 'Sovereign & EPC Infrastructure Projects', desc: 'Large-scale bilateral joint venture milestone drawdowns.' },
                { id: 'INTERCOMPANY', title: 'Intercompany Intra-Group Settlement', desc: 'Cross-border liquidity balancing between Iraqi and Chinese corporate entities.' },
                { id: 'CARD_TOPUP', title: 'Qi & ICA Sovereign Card Account Top-Up', desc: 'Dual-currency prepaid settlement pool funding.' }
              ].map((opt) => (
                <label 
                  key={opt.id}
                  className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    settlementType === opt.id 
                      ? 'border-[#C8102E] bg-red-50/40 ring-2 ring-red-100' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="settlementType"
                    checked={settlementType === opt.id}
                    onChange={() => setSettlementType(opt.id)}
                    className="mt-1 text-[#C8102E] focus:ring-red-500"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">{opt.title}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="pay-btn-primary px-6 py-2.5 rounded-xl font-bold text-xs"
              >
                Continue to Remitter Details →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Remitter & Beneficiary Entities */}
        {step === 2 && (
          <div className="pay-card p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-black text-gray-900">
              {t('settlement.gateway.step2')}
            </h2>

            {/* Payer */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-500">Iraqi Remitter (Payer)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Entity Name</label>
                  <input
                    type="text"
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Tax ID / Commercial Reg</label>
                  <input
                    type="text"
                    value={payerTaxId}
                    onChange={(e) => setPayerTaxId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Official Business Email</label>
                  <input
                    type="email"
                    value={payerEmail}
                    onChange={(e) => setPayerEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={payerPhone}
                    onChange={(e) => setPayerPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                  />
                </div>
              </div>
            </div>

            {/* Beneficiary */}
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-500">Chinese Beneficiary Entity</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Beneficiary Legal Name</label>
                  <input
                    type="text"
                    value={beneficiaryName}
                    onChange={(e) => setBeneficiaryName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={beneficiaryCountry}
                    onChange={(e) => setBeneficiaryCountry(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Receiving Bank</label>
                  <input
                    type="text"
                    value={beneficiaryBank}
                    onChange={(e) => setBeneficiaryBank(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Account Number / IBAN</label>
                  <input
                    type="text"
                    value={beneficiaryAccount}
                    onChange={(e) => setBeneficiaryAccount(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-200">
              <button
                onClick={() => setStep(1)}
                className="pay-btn-secondary px-5 py-2.5 rounded-xl font-bold text-xs"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="pay-btn-primary px-6 py-2.5 rounded-xl font-bold text-xs"
              >
                Continue to Rate Lock →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Amount & 15-Minute Rate Lock */}
        {step === 3 && (
          <div className="pay-card p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-black text-gray-900">
                {t('settlement.gateway.step3')}
              </h2>

              {/* 15-Min Timer Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-50 text-[#C8102E] border border-red-200 font-mono text-xs font-bold">
                <Clock size={14} className="animate-spin" />
                <span>Rate Locked: {formatTimer(secondsRemaining)} remaining</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Payment Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 font-mono font-bold text-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 font-mono font-bold text-base bg-white"
                >
                  <option value="IQD">Iraqi Dinar (IQD)</option>
                  <option value="RMB">Chinese Yuan (RMB)</option>
                </select>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 font-bold block">Guaranteed Net Delivery:</span>
                <span className="text-xl sm:text-2xl font-mono font-black text-[#C8102E]">
                  {targetAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {currency === 'IQD' ? 'RMB' : 'IQD'}
                </span>
              </div>
              <div className="text-end text-[11px] text-gray-500">
                <span>Locked Rate: 1 RMB = 182.50 IQD</span>
                <span className="block text-emerald-700 font-bold">+5.6% vs 3-leg SWIFT</span>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="pay-btn-secondary px-5 py-2.5 rounded-xl font-bold text-xs"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="pay-btn-primary px-6 py-2.5 rounded-xl font-bold text-xs"
              >
                Continue to Compliance →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Compliance Declarations */}
        {step === 4 && (
          <div className="pay-card p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-black text-gray-900">
              {t('settlement.gateway.step4')}
            </h2>

            <div className="space-y-4 text-xs">
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sanctionsDeclared}
                  onChange={(e) => setSanctionsDeclared(e.target.checked)}
                  className="mt-0.5 text-[#C8102E] focus:ring-red-500"
                />
                <span className="text-gray-700">
                  I attest that neither the remitter, the beneficiary, nor any associated freight carriers are listed on Central Bank of Iraq or UN Security Council sanctions lists.
                </span>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={amlDeclared}
                  onChange={(e) => setAmlDeclared(e.target.checked)}
                  className="mt-0.5 text-[#C8102E] focus:ring-red-500"
                />
                <span className="text-gray-700">
                  I declare that funds originate from legitimate commercial trade pursuant to Iraqi AML Law No. 39 of 2015.
                </span>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={uboDeclared}
                  onChange={(e) => setUboDeclared(e.target.checked)}
                  className="mt-0.5 text-[#C8102E] focus:ring-red-500"
                />
                <span className="text-gray-700">
                  Ultimate Beneficial Ownership (UBO) documentation is verified and available for Central Bank audit inspection.
                </span>
              </label>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(3)}
                className="pay-btn-secondary px-5 py-2.5 rounded-xl font-bold text-xs"
              >
                ← Back
              </button>
              <button
                disabled={!sanctionsDeclared || !amlDeclared || !uboDeclared}
                onClick={() => setStep(5)}
                className="pay-btn-primary px-6 py-2.5 rounded-xl font-bold text-xs disabled:opacity-50"
              >
                Review & Confirm →
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Review & Cryptographic Audit */}
        {step === 5 && (
          <div className="pay-card p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-black text-gray-900">
              {t('settlement.gateway.step5')}
            </h2>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3 text-xs">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Scope:</span>
                <span className="font-bold text-gray-800">{settlementType}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Payer Entity:</span>
                <span className="font-bold text-gray-800">{payerName}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Beneficiary:</span>
                <span className="font-bold text-gray-800">{beneficiaryName} ({beneficiaryBank})</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Input Capital:</span>
                <span className="font-bold font-mono text-gray-900">{amount.toLocaleString()} {currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Guaranteed Credited:</span>
                <span className="font-black font-mono text-[#C8102E] text-sm">
                  {targetAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {currency === 'IQD' ? 'RMB' : 'IQD'}
                </span>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(4)}
                className="pay-btn-secondary px-5 py-2.5 rounded-xl font-bold text-xs"
              >
                ← Back
              </button>
              <button
                onClick={handleExecuteCheckout}
                disabled={isProcessing}
                className="pay-btn-primary px-8 py-3 rounded-xl font-black text-xs shadow-md"
              >
                {isProcessing ? 'Generating Sovereign Instruction...' : 'Generate Official Instruction Ticket'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Confirmation & Instruction Ticket */}
        {step === 6 && checkoutResult && (
          <div className="pay-card p-6 sm:p-10 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-gray-900">
                Instruction Generated Successfully
              </h2>
              <p className="text-xs text-gray-500">
                Your settlement order has been registered on the bilateral clearing desk.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 max-w-md mx-auto text-xs space-y-2 text-start font-mono">
              <div className="flex justify-between">
                <span className="text-gray-500">Reference No:</span>
                <span className="font-bold text-[#C8102E]">{checkoutResult.referenceId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Instruction Code:</span>
                <span className="font-bold text-gray-800">{checkoutResult.instructionCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className="font-bold text-emerald-700">PENDING_BANK_EXECUTION</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={handleDownloadInstructionPdf}
                className="pay-btn-primary px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-xs"
              >
                <Download size={15} />
                <span>Download Instruction Dossier (PDF)</span>
              </button>

              <Link
                to={`/${lang}/settlement/tracker/${checkoutResult.referenceId}`}
                className="pay-btn-secondary px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2"
              >
                <Clock size={15} />
                <span>Track on Live Status Tracker</span>
              </Link>
            </div>
          </div>
        )}

      </div>
    </SettlementLayout>
  );
}
