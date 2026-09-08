import { useState, useEffect } from 'react';
import { Locale, PaymentOrder } from '../../types';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Copy, 
  Check, 
  QrCode, 
  Printer, 
  RefreshCw,
  ShieldCheck,
  Building2,
  User,
  ArrowRight
} from 'lucide-react';

interface Props {
  initialRef?: string;
  lang: Locale;
  onOpenReceipt: (order: PaymentOrder) => void;
}

export function PaymentTracker({ initialRef, lang, onOpenReceipt }: Props) {
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';
  const isRtl = isAr || isCkb;

  const [searchRef, setSearchRef] = useState(initialRef || '');
  const [order, setOrder] = useState<PaymentOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Auto fetch if initialRef is provided
  useEffect(() => {
    if (initialRef && initialRef.trim()) {
      handleLookup(initialRef.trim());
    }
  }, [initialRef]);

  const handleLookup = async (refToFind: string) => {
    if (!refToFind.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/public/payments/orders/${encodeURIComponent(refToFind.trim())}`);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Transaction reference not found');
      }
      setOrder(json.order);
    } catch (err: any) {
      setError(err.message || 'Failed to locate order');
      setOrder(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyHash = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const labels = {
    title: isAr ? 'تتبع مسار التحويلات والتسويات المباشرة' : isZh ? '双边支付与清算订单全链路实时追踪' : 'Bilateral Payment & Clearing Tracker',
    subtitle: isAr ? 'تحقق من حالة الحوالة عبر رمز المرجع أو كود التدقيق المالي' : isZh ? '输入支付参考号（Reference ID）查询实时清算状态与跨国结算凭证' : 'Enter your transaction reference to audit live clearing timeline and cryptographic proofs',
    inputPlaceholder: isAr ? 'مثال: PAY-CNY-2026-88019' : isZh ? '例如：PAY-CNY-2026-88019' : 'e.g. PAY-CNY-2026-88019',
    searchBtn: isAr ? 'تتبع المعاملة' : isZh ? '查询订单' : 'Track Order',
    notFound: isAr ? 'لم يتم العثور على معاملة بهذا المرجع' : isZh ? '未找到该参考编号对应的清算记录' : 'No transaction found matching this reference code.',
    statusCompleted: isAr ? 'تمت التسوية بنجاح' : isZh ? '已完成清算' : 'Settlement Completed',
    statusProcessing: isAr ? 'قيد التنفيذ والمطابقة' : isZh ? '正在清算中' : 'Processing & Matching',
    statusPending: isAr ? 'بانتظار تأكيد الإيداع' : isZh ? '等待资金入账' : 'Pending Deposit',
    statusHold: isAr ? 'تحت مراجعة الامتثال' : isZh ? '合规复核中' : 'Compliance Hold',
    statusRejected: isAr ? 'مرفوض' : isZh ? '已驳回' : 'Rejected',
    viewCertificate: isAr ? 'عرض وثيقة التسوية الرسمية وطباعتها' : isZh ? '查看官方双边结算凭证与证书' : 'View & Print Official Clearing Dossier',
    txHash: isAr ? 'هاش التحقق التشفيري (mBridge)' : isZh ? 'mBridge央行数字货币清算哈希' : 'Cryptographic Clearing Hash',
    qrTitle: isAr ? 'رمز الدفع الرقمي QR' : isZh ? '数字人民币二维码' : 'Digital Clearing QR Code'
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 size={13} />
            <span>{labels.statusCompleted}</span>
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <Clock size={13} className="animate-spin" />
            <span>{labels.statusProcessing}</span>
          </span>
        );
      case 'COMPLIANCE_HOLD':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
            <AlertTriangle size={13} />
            <span>{labels.statusHold}</span>
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
            <AlertTriangle size={13} />
            <span>{labels.statusRejected}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
            <Clock size={13} />
            <span>{labels.statusPending}</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 border-2 border-ink-900 dark:border-neutral-700 shadow-xl rounded-2xl overflow-hidden font-sans">
      
      {/* Header */}
      <div className="bg-neutral-100 dark:bg-neutral-800/80 p-6 border-b border-neutral-200 dark:border-neutral-700 text-start">
        <h3 className="text-lg sm:text-xl font-black text-brand-900 dark:text-white">
          {labels.title}
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          {labels.subtitle}
        </p>

        {/* Search Input Bar */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2 max-w-xl">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLookup(searchRef)}
              placeholder={labels.inputPlaceholder}
              className="w-full text-xs font-bold p-3 pl-9 bg-white dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-600 rounded-xl focus:border-brand-800 focus:outline-none uppercase"
            />
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          </div>

          <button
            type="button"
            onClick={() => handleLookup(searchRef)}
            disabled={isLoading || !searchRef.trim()}
            className="px-5 py-3 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <RefreshCw size={14} className="animate-spin" /> : <Search size={14} />}
            <span>{labels.searchBtn}</span>
          </button>
        </div>

        {error && (
          <div className="mt-3 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 rounded-lg text-xs text-rose-800 dark:text-rose-300 flex items-center gap-2">
            <AlertTriangle size={14} />
            <span>{labels.notFound} ({error})</span>
          </div>
        )}
      </div>

      {/* Order Result Card */}
      {order && (
        <div className="p-6 sm:p-8 space-y-6 text-start">
          
          {/* Top Order Metadata Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-brand-800 dark:text-brand-400">
                  {order.reference}
                </span>
                <span className="text-xs px-2 py-0.5 rounded font-bold bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                  {order.orderType === 'BUSINESS' ? 'B2B Enterprise' : 'Retail Consumer'}
                </span>
              </div>
              <div className="text-[11px] text-neutral-500 mt-1 font-mono">
                Initiated: {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {getStatusBadge(order.status)}
              <button
                type="button"
                onClick={() => handleLookup(order.reference)}
                title="Refresh Status"
                className="p-1.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-600 hover:text-brand-900 transition-colors cursor-pointer"
              >
                <RefreshCw size={14} className={isLoading ? 'animate-spin text-brand-800' : ''} />
              </button>
            </div>
          </div>

          {/* Amount Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl">
              <span className="text-xs uppercase text-neutral-500 block mb-1">
                Source Transferred
              </span>
              <span className="text-xl font-black text-brand-900 dark:text-white">
                {order.sourceAmount.toLocaleString()} {order.sourceCurrency}
              </span>
              <span className="text-xs text-neutral-400 block mt-1">
                via {order.settlementMethod}
              </span>
            </div>

            <div className="p-4 bg-brand-50/40 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-800 rounded-xl">
              <span className="text-xs uppercase text-brand-800 dark:text-brand-400 block mb-1">
                Target Beneficiary Receives
              </span>
              <span className="text-xl font-black text-brand-800 dark:text-brand-300">
                {order.targetAmount.toLocaleString()} {order.targetCurrency}
              </span>
              <span className="text-xs text-brand-600 dark:text-brand-400 block mt-1">
                Net after {order.feeAmount.toLocaleString()} fee ({order.feePercent}%)
              </span>
            </div>

            <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl">
              <span className="text-xs uppercase text-neutral-500 block mb-1">
                Locked Rate
              </span>
              <span className="text-lg font-bold text-brand-900 dark:text-white">
                1 e-CNY = {order.exchangeRate.toFixed(2)} IQD
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 block mt-1">
                PBOC-CBI Wholesale Spread
              </span>
            </div>
          </div>

          {/* Parties Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-1">
              <span className="font-bold text-neutral-500 block text-xs uppercase">
                Sender / Entity
              </span>
              <div className="font-bold text-brand-900 dark:text-white">
                {order.senderCompany ? `${order.senderCompany} (${order.senderName})` : order.senderName}
              </div>
              <div className="text-neutral-500">{order.senderEmail} {order.senderPhone ? `• ${order.senderPhone}` : ''}</div>
              {order.taxRegistrationNumber && (
                <div className="text-[11px] text-neutral-600 dark:text-neutral-400">
                  TIN: {order.taxRegistrationNumber}
                </div>
              )}
            </div>

            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-1">
              <span className="font-bold text-neutral-500 block text-xs uppercase">
                Recipient / Destination
              </span>
              <div className="font-bold text-brand-900 dark:text-white">
                {order.recipientName}
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                ID/Wallet: {order.recipientIdentifier}
              </div>
              <div className="text-neutral-500 text-[11px]">
                {order.recipientBankOrBureau}
              </div>
            </div>
          </div>

          {/* Multi-Stage Clearing Timeline */}
          <div className="p-5 bg-neutral-50 dark:bg-neutral-800/30 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-900 dark:text-white flex items-center gap-2">
              <ShieldCheck size={14} className="text-brand-800 dark:text-brand-400" />
              <span>Multi-Stage Sovereign Clearing Timeline</span>
            </h4>

            <div className="space-y-3">
              {(order.timeline || []).map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    step.completed 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400'
                  }`}>
                    {step.completed ? <Check size={12} /> : <span className="text-xs font-mono">{idx + 1}</span>}
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${step.completed ? 'text-brand-900 dark:text-white' : 'text-neutral-400'}`}>
                        {step.title}
                      </span>
                      {step.timestamp && (
                        <span className="text-xs text-neutral-400">
                          {new Date(step.timestamp).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {step.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cryptographic Hash & e-CNY QR Section */}
          <div className="p-4 bg-neutral-900 text-white rounded-xl space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase text-neutral-400">
                {labels.txHash}
              </span>
              <button
                type="button"
                onClick={() => handleCopyHash(order.settlementTxHash || '0x7f4a8b92819c90')}
                className="inline-flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 cursor-pointer"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy Hash'}</span>
              </button>
            </div>
            <div className="p-2.5 bg-black/60 rounded border border-white/10 text-[11px] text-amber-300 break-all">
              {order.settlementTxHash || 'PENDING_FINAL_ON_CHAIN_ANCHOR'}
            </div>
            <div className="text-xs text-neutral-400 flex items-center justify-between">
              <span>CBI Verification Code: <strong className="text-white">{order.verificationCode}</strong></span>
              <span>Settled At: {order.settledAt ? new Date(order.settledAt).toLocaleDateString() : 'In Clearing Flight'}</span>
            </div>
          </div>

          {/* Actions: View Certificate & Receipt */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenReceipt(order)}
              className="w-full sm:w-auto px-6 py-3 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <FileText size={15} />
              <span>{labels.viewCertificate}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
