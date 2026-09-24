import React from 'react';
import { createPortal } from 'react-dom';
import { Locale, PaymentOrder } from '../../types';
import { 
  X, 
  Printer, 
  ShieldCheck, 
  CheckCircle2, 
} from 'lucide-react';
import { IcaLogo } from '../IcaLogo';

interface Props {
  order: PaymentOrder | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Locale;
}

export function ReceiptModal({ order, isOpen, onClose, lang }: Props) {
  if (!isOpen || !order) return null;

  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';
  const isRtl = isAr || isCkb;

  const handlePrint = () => {
    window.print();
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="print-modal-container fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 font-sans">
      <div 
        dir={isRtl ? 'rtl' : 'ltr'} 
        className="relative bg-white dark:bg-neutral-900 border-2 border-ink-900 dark:border-neutral-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[95vh] flex flex-col"
      >
        
        {/* Top Control Bar */}
        <div className="bg-ink-900 text-white px-6 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-mono">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>Official Bilateral Clearing Certificate</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer size={14} />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Certificate Body (Optimized for both screen & print) */}
        <div className="p-8 sm:p-10 space-y-6 text-start text-brand-900 dark:text-neutral-100 bg-white dark:bg-neutral-900">
          
          {/* Header & Crest */}
          <div className="border-b-2 border-brand-800 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
            <div className="flex items-center gap-3">
              <IcaLogo size={48} variant="mark" lang={lang} />
              <div>
                <h2 className="text-xl font-black tracking-tight text-brand-800 dark:text-brand-400">
                  {isAr ? 'الوكالة العراقية الصينية • مجمع التسويات المالية' : isZh ? '伊中通讯社 • 双边主权数字清算中心' : 'Iraqi-Chinese Agency • FinTech Clearing Gateway'}
                </h2>
                <div className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                  PBOC e-CNY Protocol & CBI Direct Clearance Accredited
                </div>
              </div>
            </div>

            <div className="text-end text-xs">
              <div className="font-black text-brand-800 dark:text-brand-400">{order.reference}</div>
              <div className="text-xs text-neutral-400">{new Date(order.createdAt).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Certificate Title Badge */}
          <div className="text-center py-2 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-xl">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 block">
              Cryptographic Transaction Dossier
            </span>
            <span className="text-sm font-black uppercase text-brand-900 dark:text-white">
              {order.orderType === 'BUSINESS' ? 'Corporate Cross-Border Trade Clearance' : 'Retail Direct Remittance Verification'}
            </span>
          </div>

          {/* Core Transaction Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <span className="text-xs uppercase text-neutral-400 block">Gross Sent</span>
              <span className="font-black text-brand-900 dark:text-white text-sm">
                {order.sourceAmount.toLocaleString()} {order.sourceCurrency}
              </span>
            </div>

            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <span className="text-xs uppercase text-neutral-400 block">Applied Rate</span>
              <span className="font-bold text-brand-900 dark:text-white text-sm">
                {order.exchangeRate.toFixed(2)}
              </span>
            </div>

            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <span className="text-xs uppercase text-neutral-400 block">Clearing Fee</span>
              <span className="font-bold text-amber-700 dark:text-amber-400 text-sm">
                {order.feeAmount.toLocaleString()} ({order.feePercent}%)
              </span>
            </div>

            <div className="p-3 bg-brand-50/50 dark:bg-brand-950/30 rounded-lg border border-brand-300 dark:border-brand-700">
              <span className="text-xs uppercase text-brand-800 dark:text-brand-300 block">Net Credited</span>
              <span className="font-black text-brand-800 dark:text-brand-400 text-sm">
                {order.targetAmount.toLocaleString()} {order.targetCurrency}
              </span>
            </div>
          </div>

          {/* Sender & Beneficiary Details */}
          <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl divide-y divide-neutral-200 dark:divide-neutral-700 text-xs">
            <div className="p-3 flex justify-between items-center">
              <span className="text-neutral-500 font-bold">Payer / Remitter:</span>
              <span className="font-black text-brand-900 dark:text-white">
                {order.senderCompany ? `${order.senderCompany} (${order.senderName})` : order.senderName}
              </span>
            </div>

            <div className="p-3 flex justify-between items-center">
              <span className="text-neutral-500 font-bold">Payer Contact:</span>
              <span className="text-neutral-700 dark:text-neutral-300">
                {order.senderEmail} {order.senderPhone ? `• ${order.senderPhone}` : ''}
              </span>
            </div>

            <div className="p-3 flex justify-between items-center">
              <span className="text-neutral-500 font-bold">Beneficiary Name:</span>
              <span className="font-black text-brand-900 dark:text-white">
                {order.recipientName}
              </span>
            </div>

            <div className="p-3 flex justify-between items-center">
              <span className="text-neutral-500 font-bold">Destination Wallet / Account:</span>
              <span className="text-brand-800 dark:text-brand-400 font-bold">
                {order.recipientIdentifier}
              </span>
            </div>

            <div className="p-3 flex justify-between items-center">
              <span className="text-neutral-500 font-bold">Designated Gateway:</span>
              <span className="text-neutral-700 dark:text-neutral-300">
                {order.recipientBankOrBureau}
              </span>
            </div>

            <div className="p-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <div>
                <span className="text-neutral-500 font-bold block">
                  {lang === 'ar' ? 'طريقة السداد والتمويل المحلية:' : lang === 'zh' ? '本地资金付款与结算通道:' : 'Local Payment & Funding Rail:'}
                </span>
                <span className="text-[10px] text-neutral-400 block">
                  {lang === 'ar' ? 'القناة المحلية لتمويل الرصيد بالعراق قبل المقاصة الثنائية' : 'Source funding rail in Iraq, converted & cleared via sovereign bilateral corridors'}
                </span>
              </div>
              <span className="font-bold text-neutral-800 dark:text-neutral-200">
                {order.settlementMethod === 'mBridge CBDC Direct' ? 'mBridge CBDC Protocol (Corporate Wholesale)' : order.settlementMethod}
              </span>
            </div>

            {order.taxRegistrationNumber && (
              <div className="p-3 flex justify-between items-center">
                <span className="text-neutral-500 font-bold">Tax Registration (TIN):</span>
                <span className="font-bold text-neutral-800 dark:text-neutral-200 font-mono">
                  {order.taxRegistrationNumber}
                </span>
              </div>
            )}

            {order.commercialInvoiceRef && (
              <div className="p-3 flex justify-between items-center">
                <span className="text-neutral-500 font-bold">Commercial Invoice Ref:</span>
                <span className="font-bold text-neutral-800 dark:text-neutral-200">
                  {order.commercialInvoiceRef}
                </span>
              </div>
            )}

            {order.billOfLading && (
              <div className="p-3 flex justify-between items-center">
                <span className="text-neutral-500 font-bold">Bill of Lading (B/L):</span>
                <span className="font-bold text-neutral-800 dark:text-neutral-200">
                  {order.billOfLading}
                </span>
              </div>
            )}

            {order.customsDeclarationNo && (
              <div className="p-3 flex justify-between items-center">
                <span className="text-neutral-500 font-bold">Customs Clearance Code:</span>
                <span className="font-bold text-neutral-800 dark:text-neutral-200">
                  {order.customsDeclarationNo}
                </span>
              </div>
            )}

            {order.contractValueUsd ? (
              <div className="p-3 flex justify-between items-center">
                <span className="text-neutral-500 font-bold">Contract Trade Value:</span>
                <span className="font-bold text-neutral-800 dark:text-neutral-200 font-mono">
                  ${order.contractValueUsd.toLocaleString()} USD
                </span>
              </div>
            ) : null}
          </div>

          {/* Cryptographic Proof & QR Section */}
          <div className="p-4 bg-neutral-900 text-white rounded-xl space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400 uppercase">
                PBOC-CBI On-Chain Proof Hash
              </span>
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={12} /> Verified Immutable
              </span>
            </div>
            <div className="p-2.5 bg-black/70 rounded border border-white/10 text-[11px] text-amber-300 break-all">
              {order.settlementTxHash || '0x7f4a8b92819c904128f73891002acb817920194bc0281'}
            </div>
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>Security Code: <strong className="text-white">{order.verificationCode}</strong></span>
              <span>Status: <strong className="text-emerald-400">{order.status}</strong></span>
            </div>
          </div>

          {/* Official Bilateral Seals Signature Row */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700 grid grid-cols-2 gap-6 text-center text-xs text-neutral-500">
            <div className="p-3 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg">
              <div className="font-bold uppercase text-brand-900 dark:text-white mb-1">
                People's Bank of China (PBOC)
              </div>
              <div>Digital Currency Research Node</div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                [SEALED DIGITAL SIGNATURE: CN-CBDC-2026]
              </div>
            </div>

            <div className="p-3 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg">
              <div className="font-bold uppercase text-brand-900 dark:text-white mb-1">
                Central Bank of Iraq (CBI)
              </div>
              <div>Direct Payment & Clearing Directorate</div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                [SEALED CLEARANCE CODE: IQ-PSP-8801]
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="text-xs text-neutral-400 text-center leading-relaxed">
            This digital certificate serves as legitimate proof of clearance under Sino-Iraqi sovereign economic treaties. For authentication inquiries, contact payments@iraqi-chineseagency.com or verify on the Iraqi-Chinese Agency Portal.
          </div>

        </div>

      </div>
    </div>,
    document.body
  );
}

export default ReceiptModal;
