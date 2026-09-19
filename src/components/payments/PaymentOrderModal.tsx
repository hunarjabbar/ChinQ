import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Locale, PaymentOrder } from '../../types';
import { 
  X, 
  ShieldCheck, 
  Building2, 
  User, 
  Coins, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Lock,
  QrCode
} from 'lucide-react';

interface InitialData {
  orderType: 'RETAIL' | 'BUSINESS';
  direction: 'IQD_TO_ECNY' | 'ECNY_TO_IQD';
  sourceAmount: number;
  targetAmount: number;
  exchangeRate: number;
  feeAmount: number;
  feePercent: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData: InitialData | null;
  lang: Locale;
  onOrderCreated: (order: PaymentOrder) => void;
}

export function PaymentOrderModal({ isOpen, onClose, initialData, lang, onOrderCreated }: Props) {
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';
  const isRtl = isAr || isCkb;

  const [orderType, setOrderType] = useState<'RETAIL' | 'BUSINESS'>(initialData?.orderType || 'RETAIL');
  const [direction, setDirection] = useState<'IQD_TO_ECNY' | 'ECNY_TO_IQD'>(initialData?.direction || 'IQD_TO_ECNY');
  const [sourceAmount, setSourceAmount] = useState<number>(initialData?.sourceAmount || 1000000);

  React.useEffect(() => {
    if (isOpen) {
      const type = initialData?.orderType || 'RETAIL';
      const dir = initialData?.direction || 'IQD_TO_ECNY';
      const amt = initialData?.sourceAmount || 1000000;
      
      setOrderType(type);
      setDirection(dir);
      setSourceAmount(amt);

      setSenderName('');
      setSenderEmail('');
      setSenderPhone('');
      setSenderIdNumber('');
      setSenderCompany('');
      setRecipientName('');
      setRecipientIdentifier('');
      setRecipientBankOrBureau('PBOC Official e-CNY Digital Wallet App');
      setPurpose(type === 'BUSINESS' ? 'Commercial Trade Goods & Invoices' : 'University Tuition & Educational Remittance');
      setSettlementMethod(type === 'BUSINESS' ? 'mBridge CBDC Direct' : 'Zain Cash');
      setCommercialInvoiceRef('');
      setBillOfLading('');
      setCustomsDeclarationNo('');
      setContractValueUsd('');
      setTaxRegistrationNumber('');
      setErrorMessage(null);
      setIsSubmitting(false);
    }
  }, [isOpen, initialData]);
  
  // Ordinary User fields
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderIdNumber, setSenderIdNumber] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientIdentifier, setRecipientIdentifier] = useState('');
  const [recipientBankOrBureau, setRecipientBankOrBureau] = useState('PBOC Official e-CNY Digital Wallet App');
  const [settlementMethod, setSettlementMethod] = useState('Zain Cash');
  const [purpose, setPurpose] = useState('University Tuition & Educational Remittance');

  // Business fields
  const [senderCompany, setSenderCompany] = useState('');
  const [taxRegistrationNumber, setTaxRegistrationNumber] = useState('');
  const [commercialInvoiceRef, setCommercialInvoiceRef] = useState('');
  const [billOfLading, setBillOfLading] = useState('');
  const [customsDeclarationNo, setCustomsDeclarationNo] = useState('');
  const [contractValueUsd, setContractValueUsd] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side validation: positive numeric amount
    const numAmount = typeof sourceAmount === 'number' ? sourceAmount : parseFloat(String(sourceAmount));
    if (!numAmount || isNaN(numAmount) || numAmount <= 0) {
      setErrorMessage(
        isAr 
          ? 'يرجى تحديد مبلغ تسوية صحيح وأكبر من الصفر' 
          : isZh 
          ? '请输入大于零的有效清算结算金额' 
          : isCkb 
          ? 'تکایە بڕە پارەیەکی دروست و زیاتر لە صفر دیاری بکە' 
          : 'Please specify a valid transfer amount greater than zero.'
      );
      return;
    }

    // Client-side validation: required sender & recipient identification
    if (!senderName.trim() || !senderEmail.trim() || !recipientName.trim() || !recipientIdentifier.trim()) {
      setErrorMessage(
        isAr 
          ? 'يرجى استكمال الحقول الإلزامية لبيانات المرسل والمستلم' 
          : isZh 
          ? '请填写所有必填的汇款人和收款人信息' 
          : isCkb 
          ? 'تکایە هەموو خانە پێویستەکانی نێرەر و وەرگر پڕبکەرەوە' 
          : 'Please fill in all required sender and recipient fields.'
      );
      return;
    }

    // Client-side validation: valid email format
    if (!senderEmail.includes('@') || !senderEmail.includes('.')) {
      setErrorMessage(
        isAr 
          ? 'يرجى إدخال بريد إلكتروني صالح لاستلام كود التحقق وإشعار التسوية' 
          : isZh 
          ? '请输入有效的电子邮箱地址以接收清算凭据和验证码' 
          : isCkb 
          ? 'تکایە ئیمەیڵێکی دروست بنووسە بۆ وەرگرتنی کۆدی پشتڕاستکردنەوە' 
          : 'Please enter a valid email address to receive your audit certificate and verification code.'
      );
      return;
    }

    // Client-side validation: registered company name for business accounts
    if (orderType === 'BUSINESS' && !senderCompany.trim()) {
      setErrorMessage(
        isAr 
          ? 'يرجى إدخال اسم الشركة العراقية المسجلة' 
          : isZh 
          ? '请输入注册的企业名称' 
          : isCkb 
          ? 'تکایە ناوی کۆمپانیای تۆمارکراو بنووسە' 
          : 'Please enter registered company name.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        orderType,
        direction,
        sourceCurrency: direction === 'IQD_TO_ECNY' ? 'IQD' : 'E_CNY',
        targetCurrency: direction === 'IQD_TO_ECNY' ? 'E_CNY' : 'IQD',
        sourceAmount: numAmount,
        senderName: senderName.trim(),
        senderEmail: senderEmail.trim(),
        senderPhone: senderPhone.trim(),
        senderIdNumber: senderIdNumber.trim(),
        senderCompany: orderType === 'BUSINESS' ? senderCompany.trim() : undefined,
        recipientName: recipientName.trim(),
        recipientIdentifier: recipientIdentifier.trim(),
        recipientBankOrBureau,
        purpose,
        settlementMethod,
        commercialInvoiceRef: orderType === 'BUSINESS' ? commercialInvoiceRef.trim() : undefined,
        billOfLading: orderType === 'BUSINESS' ? billOfLading.trim() : undefined,
        customsDeclarationNo: orderType === 'BUSINESS' ? customsDeclarationNo.trim() : undefined,
        contractValueUsd: orderType === 'BUSINESS' && contractValueUsd ? parseFloat(contractValueUsd) : undefined,
        taxRegistrationNumber: orderType === 'BUSINESS' ? taxRegistrationNumber.trim() : undefined
      };

      const res = await fetch('/api/public/payments/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit payment order');
      }

      // Backend returns the created order object flat: res.status(201).json(order)
      const createdOrder: PaymentOrder = json.order || json;
      onOrderCreated(createdOrder);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during submission');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 font-sans">
      <div 
        dir={isRtl ? 'rtl' : 'ltr'} 
        className="relative bg-white dark:bg-neutral-900 border-2 border-ink-900 dark:border-neutral-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[95vh] flex flex-col"
      >
        
        {/* Modal Header */}
        <div className="bg-ink-900 text-white p-5 sm:p-6 flex items-center justify-between border-b-2 border-brand-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-800 rounded-xl text-amber-300">
              <Coins size={22} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {isAr ? 'طلب تسوية ومدفوعات (IQD ⇄ E-CNY)' : isZh ? '发起双边清算与支付申请' : 'Initiate Bilateral Payment Order'}
              </h3>
              <p className="text-xs text-neutral-400">
                {isAr ? 'الممر المباشر المعتمد • إصدار فوري لرمز التحقق والـ QR' : 'Sino-Iraqi Sovereign Direct Corridor • Instant Hash & QR Settlement'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {errorMessage && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 rounded-xl text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Account Profile Toggle */}
          <div className="grid grid-cols-2 gap-3 p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setOrderType('RETAIL');
                if (settlementMethod === 'mBridge CBDC Direct') setSettlementMethod('Zain Cash');
                if (purpose === 'Commercial Trade Goods & Invoices') setPurpose('University Tuition & Educational Remittance');
              }}
              className={`py-2 px-3 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                orderType === 'RETAIL'
                  ? 'bg-white dark:bg-neutral-900 text-brand-800 dark:text-brand-400 shadow-xs'
                  : 'text-neutral-500 hover:text-brand-900'
              }`}
            >
              <User size={14} />
              <span>{isAr ? 'حساب أفراد / مستخدم عادي' : 'Ordinary User (Retail)'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setOrderType('BUSINESS');
                if (settlementMethod === 'Zain Cash') setSettlementMethod('mBridge CBDC Direct');
                if (purpose === 'University Tuition & Educational Remittance') setPurpose('Commercial Trade Goods & Invoices');
              }}
              className={`py-2 px-3 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                orderType === 'BUSINESS'
                  ? 'bg-white dark:bg-neutral-900 text-brand-800 dark:text-brand-400 shadow-xs'
                  : 'text-neutral-500 hover:text-brand-900'
              }`}
            >
              <Building2 size={14} />
              <span>{isAr ? 'حساب شركات وميناء الفاو' : 'Corporate & Cross-Border Trade'}</span>
            </button>
          </div>

          {/* Transfer Amount & Corridor Configuration */}
          <div className="p-4 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl space-y-3 font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <label className="text-[11px] uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-bold block mb-1">
                  {direction === 'IQD_TO_ECNY' ? (isAr ? 'مبلغ التحويل بالدينار العراقي (IQD) *' : 'Transfer Amount (IQD) *') : (isAr ? 'مبلغ التحويل باليوان الرقمي *' : 'Transfer Amount (e-CNY) *')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={sourceAmount || ''}
                    onChange={(e) => setSourceAmount(parseFloat(e.target.value) || 0)}
                    className="w-full text-base font-black text-brand-900 dark:text-white p-2.5 bg-white dark:bg-neutral-900 border border-amber-300 dark:border-amber-700 rounded-lg focus:outline-none focus:border-brand-800 font-mono"
                    placeholder="1000000"
                  />
                  <span className="absolute right-3 top-2.5 rtl:right-auto rtl:left-3 text-xs font-black text-neutral-400">
                    {direction === 'IQD_TO_ECNY' ? 'IQD' : 'e-CNY'}
                  </span>
                </div>
              </div>

              <div className="text-left rtl:text-right sm:text-right rtl:sm:text-left pt-1">
                <span className="text-[10px] uppercase text-neutral-500 dark:text-neutral-400 block">
                  Corridor Protocol
                </span>
                <span className="text-xs font-bold text-brand-800 dark:text-brand-400">
                  {orderType === 'BUSINESS' ? 'mBridge Wholesale CBDC' : 'Direct Clearing Desk'}
                </span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">
                  PBOC & CBI Direct Nodes
                </span>
              </div>
            </div>
          </div>

          {/* Section 1: Sender Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700 pb-1.5 flex items-center gap-2">
              <User size={14} className="text-brand-800 dark:text-brand-400" />
              <span>{isAr ? 'بيانات الطرف المرسل (العراق / الصين)' : 'Payer / Remitter Details'}</span>
            </h4>

            {orderType === 'BUSINESS' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                    {isAr ? 'اسم الشركة العراقية / المستورد *' : 'Registered Entity / Company Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={senderCompany}
                    onChange={(e) => setSenderCompany(e.target.value)}
                    placeholder="e.g. Al-Faw Heavy Equipment Logistics Co."
                    className="w-full text-xs p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:border-brand-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                    {isAr ? 'الرقم الضريبي العراقي (TIN)' : 'Tax ID Number (TIN)'}
                  </label>
                  <input
                    type="text"
                    value={taxRegistrationNumber}
                    onChange={(e) => setTaxRegistrationNumber(e.target.value)}
                    placeholder="e.g. IQ-TAX-994821-B"
                    className="w-full text-xs p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:border-brand-800 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                  {isAr ? 'الاسم الكامل للمرسل / المفوض *' : 'Full Name (or Authorized Officer) *'}
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Ahmed Hasan / Liu Wei"
                  className="w-full text-xs p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:border-brand-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                  {isAr ? 'البريد الإلكتروني للإشعار *' : 'Email for Hash & Audit Slip *'}
                </label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:border-brand-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                  {isAr ? 'رقم الهاتف / واتساب' : 'Phone Number (WhatsApp)'}
                </label>
                <input
                  type="text"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  placeholder="+964 770 000 0000 / +86 138..."
                  className="w-full text-xs p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:border-brand-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                  {isAr ? 'رقم الهوية الوطنية / جواز السفر' : 'National ID / Passport No.'}
                </label>
                <input
                  type="text"
                  value={senderIdNumber}
                  onChange={(e) => setSenderIdNumber(e.target.value)}
                  placeholder="e.g. A29841029 / G5401928"
                  className="w-full text-xs p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:border-brand-800 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Recipient Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700 pb-1.5 flex items-center gap-2">
              <QrCode size={14} className="text-brand-800 dark:text-brand-400" />
              <span>{isAr ? 'بيانات الطرف المستلم (المستفيد بالصين أو العراق)' : 'Beneficiary / Recipient in China or Iraq'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                  {isAr ? 'اسم المستفيد (بالإنكليزية أو الصينية) *' : 'Beneficiary Name (English or Pinyin) *'}
                </label>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Tsinghua University / Shanghai SinoPort Ltd"
                  className="w-full text-xs p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:border-brand-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                  {isAr ? 'معرف المحفظة الرقمية / الحساب المصرفي *' : 'e-CNY Wallet ID / Account Number *'}
                </label>
                <input
                  type="text"
                  required
                  value={recipientIdentifier}
                  onChange={(e) => setRecipientIdentifier(e.target.value)}
                  placeholder="e.g. 002-88192-ECNY / IBAN / Alipay e-CNY"
                  className="w-full text-xs p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:border-brand-800 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                  {isAr ? 'المصرف المستلم / المشغل' : 'Receiving Institution / Gateway'}
                </label>
                <select
                  value={recipientBankOrBureau}
                  onChange={(e) => setRecipientBankOrBureau(e.target.value)}
                  className="w-full text-xs p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:border-brand-800 focus:outline-none"
                >
                  <option value="PBOC Official e-CNY Digital Wallet App">PBOC Official e-CNY Digital Wallet App</option>
                  <option value="PBOC mBridge Clearing Node">PBOC mBridge Wholesale Clearing Node</option>
                  <option value="Bank of China (BOC)">Bank of China (BOC) - e-CNY Interbank Node</option>
                  <option value="Industrial and Commercial Bank of China (ICBC)">ICBC - Cross-Border Settlement</option>
                  <option value="China Construction Bank (CCB)">China Construction Bank (CCB)</option>
                  <option value="Agricultural Bank of China (ABC)">Agricultural Bank of China (ABC)</option>
                  <option value="Bank of Communications">Bank of Communications</option>
                  <option value="Zain Cash Iraq">Zain Cash Iraq (For e-CNY to IQD)</option>
                  <option value="Qi Card Iraq">Qi Card Iraq (For e-CNY to IQD)</option>
                  <option value="First Iraqi Bank (FIB)">First Iraqi Bank (FIB)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                  {isAr ? 'طريقة السداد والتمويل المحلية *' : isZh ? '本地资金付款与结算通道 *' : isCkb ? 'شێوازی پارەدانی ناوخۆیی *' : 'Local Payment & Funding Rail *'}
                </label>
                <select
                  value={settlementMethod}
                  onChange={(e) => setSettlementMethod(e.target.value)}
                  className="w-full text-xs p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:border-brand-800 focus:outline-none font-medium"
                >
                  <option value="Zain Cash">Zain Cash (Iraq Direct API)</option>
                  <option value="Qi Card">Qi Card (National Switch)</option>
                  <option value="First Iraqi Bank (FIB)">First Iraqi Bank (FIB QR/Wire)</option>
                  <option value="Bureau Cash Deposit">Authorized Exchange Bureau Cash Deposit</option>
                  <option value="CBI Direct RTGS">Central Bank of Iraq RTGS Wire</option>
                  <option value="mBridge CBDC Direct">mBridge CBDC Protocol (Corporate Wholesale)</option>
                </select>
                <span className="text-[10px] text-neutral-400 block mt-1">
                  {isAr ? 'القناة المحلية لتمويل الرصيد بالعراق قبل المقاصة الثنائية' : 'Source funding rail in Iraq, converted & cleared via sovereign bilateral corridors'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                {isAr ? 'الغرض من التحويل' : 'Payment Purpose'}
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full text-xs p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:border-brand-800 focus:outline-none"
              >
                <option value="University Tuition & Educational Remittance">University Tuition & Educational Remittance</option>
                <option value="Family Support & Personal Remittance">Family Support & Personal Remittance</option>
                <option value="Travel, Medical, & Tourism Top-up">Travel, Medical, & Tourism Top-up</option>
                <option value="Commercial Trade Goods & Invoices">Commercial Trade Goods & Invoices</option>
                <option value="Industrial Machinery & Construction Equipment">Industrial Machinery & Construction Equipment</option>
                <option value="Al Faw Port Project Procurement">Al Faw Port Project Procurement</option>
                <option value="Freight & Logistics Clearing">Freight & Logistics Clearing</option>
              </select>
            </div>
          </div>

          {/* Section 3: Commercial Documentation (for Corporate) */}
          {orderType === 'BUSINESS' && (
            <div className="space-y-3 bg-neutral-50 dark:bg-neutral-800/40 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <h4 className="text-xs font-black uppercase tracking-wider text-brand-900 dark:text-white flex items-center gap-2">
                <FileText size={14} className="text-emerald-600 dark:text-emerald-400" />
                <span>{isAr ? 'الوثائق التجارية والاستيرادية (لتسريع التخليص الجمركي وميناء الفاو)' : 'Commercial Documentation (For Port & Customs Acceleration)'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 mb-1">
                    {isAr ? 'مرجع الفاتورة التجارية' : 'Invoice Reference'}
                  </label>
                  <input
                    type="text"
                    value={commercialInvoiceRef}
                    onChange={(e) => setCommercialInvoiceRef(e.target.value)}
                    placeholder="INV-2026-SHA-892"
                    className="w-full text-xs p-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 mb-1">
                    {isAr ? 'بوليصة الشحن (B/L)' : 'Bill of Lading (B/L)'}
                  </label>
                  <input
                    type="text"
                    value={billOfLading}
                    onChange={(e) => setBillOfLading(e.target.value)}
                    placeholder="COSCO-BSR-99214"
                    className="w-full text-xs p-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 mb-1">
                    {isAr ? 'رمز التخليص الجمركي' : 'Customs Code (Basra/Safwan)'}
                  </label>
                  <input
                    type="text"
                    value={customsDeclarationNo}
                    onChange={(e) => setCustomsDeclarationNo(e.target.value)}
                    placeholder="CUST-IQ-01994"
                    className="w-full text-xs p-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 mb-1">
                    {isAr ? 'قيمة العقد التجارية ($ USD)' : 'Contract Value (USD)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={contractValueUsd}
                    onChange={(e) => setContractValueUsd(e.target.value)}
                    placeholder="e.g. 250000"
                    className="w-full text-xs p-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Compliance & Anti-Sanctions Guarantee */}
          <div className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-xl flex items-start gap-3 text-xs text-emerald-900 dark:text-emerald-300">
            <ShieldCheck size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">
                {isAr ? 'ضمان التسوية المباشرة دون وسيط أجنبي' : 'Sovereign Bilateral Clearing Guarantee'}
              </span>
              <p className="text-[11px] text-emerald-800/80 dark:text-emerald-400/80 leading-relaxed">
                {isAr 
                  ? 'يتم قيد العملية مباشرة بين البنك المركزي الصيني والبنك المركزي العراقي، متجاوزة تجميد الحسابات والمراسلات الخارجية، مع توفير هاش تسوية قابل للتدقيق.'
                  : 'Orders are processed through bilateral CBDC nodes under PBOC and CBI oversight, completely immune to foreign intermediary correspondent freezes.'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-600 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Lock size={14} />
                  <span>{isAr ? 'تأكيد وإصدار كود التسوية' : 'Submit & Generate Verification Code'}</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>,
    document.body
  );
}
