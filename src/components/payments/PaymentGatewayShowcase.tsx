import { useState } from 'react';
import { Locale, PaymentExchangeRate } from '../../types';
import { Link } from 'react-router-dom';
import { 
  Coins, 
  ArrowRightLeft, 
  ShieldCheck, 
  Zap, 
  Building2, 
  User, 
  ArrowRight,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { ErrorBoundary } from '../ErrorBoundary';

interface Props {
  lang: Locale;
}

export function PaymentGatewayShowcase({ lang }: Props) {
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';
  const isRtl = isAr || isCkb;

  const [calcType, setCalcType] = useState<'RETAIL' | 'BUSINESS'>('RETAIL');
  const [quickAmount, setQuickAmount] = useState<string>('1000000');

  const { data: ratesData } = useQuery<{ success: boolean; data: PaymentExchangeRate }>({
    queryKey: ['paymentRates'],
    queryFn: async () => {
      const res = await fetch('/api/public/payments/rates');
      if (!res.ok) throw new Error('Failed to load rates');
      return res.json();
    },
    refetchInterval: 30000
  });

  const rates = ratesData?.data;
  const baseRate = rates?.baseRate ?? 188.50;
  const askRate = rates?.askRate ?? 189.20;
  const feePercent = calcType === 'BUSINESS' ? 0.35 : 0.75;

  const num = parseFloat(quickAmount) || 0;
  const gross = num > 0 ? num / askRate : 0;
  const fee = +(gross * (feePercent / 100)).toFixed(2);
  const netCny = +(gross - fee).toFixed(2);

  const labels = {
    eyebrow: isAr ? 'الخدمة المصرفية السيادية' : isZh ? '双边主权金融走廊' : 'Sovereign Bilateral FinTech Gateway',
    title: isAr ? 'منصة التحويل والتسويات المالية المباشرة (IQD ⇄ E-CNY)' : isZh ? '第纳尔与数字人民币实时清算与跨境支付走廊' : 'Real-Time IQD ⇄ e-CNY Currency Conversion & PSP Gateway',
    subtitle: isAr ? 'تسوية رقمية مباشرة بين البنك المركزي الصيني والبنك المركزي العراقي للمواطنين والشركات دون وسطاء' : isZh ? '连接中国人民银行数字货币（e-CNY）与伊拉克央行本币结算系统，支持大宗贸易与个人留学汇款' : 'Direct central bank clearing corridor for cross-border trade, Al Faw Port customs, and retail university tuition.',
    enterGateway: isAr ? 'الدخول لبوابة المدفوعات والـ QR' : isZh ? '进入数字人民币支付网关' : 'Launch Full PSP Gateway',
    trackOrder: isAr ? 'تتبع مسار حوالة سابقة' : isZh ? '查询订单状态' : 'Track Existing Order',
    retail: isAr ? 'أفراد (أقساط دراسية ومحافظ)' : isZh ? '个人（留学/差旅）' : 'Retail (Tuition/Travel)',
    business: isAr ? 'شركات وميناء الفاو (0.35%)' : isZh ? '企业与大宗贸易（0.35%）' : 'Enterprise & Port (0.35%)'
  };

  return (
    <ErrorBoundary inline lang={lang} title="Payment Gateway Showcase">
      <div className="w-full my-8 bg-white dark:bg-neutral-900 border-2 border-ink-900 dark:border-neutral-700 shadow-xl rounded-2xl overflow-hidden font-sans">
        
        {/* Banner Strip */}
        <div className="bg-ink-900 text-white px-6 py-3 border-b-2 border-brand-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="uppercase tracking-widest text-xs text-neutral-300">
              {labels.eyebrow}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="text-amber-400 font-black">
              1 e-CNY = {baseRate.toFixed(2)} IQD
            </span>
            <span className="hidden sm:inline text-neutral-400">
              mBridge CBDC: <strong className="text-emerald-400">ACTIVE</strong>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-start">
          
          {/* Left Column: Mission & Highlights */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-brand-900 dark:text-white">
                {labels.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
                {labels.subtitle}
              </p>
            </div>

            {/* Pillar badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700 flex items-start gap-2.5 text-xs">
                <div className="p-1.5 bg-brand-800 text-white rounded-lg shrink-0 mt-0.5">
                  <User size={14} />
                </div>
                <div>
                  <span className="font-bold text-brand-900 dark:text-white block">Ordinary Users</span>
                  <span className="text-[11px] text-neutral-500">Tuition fees & e-CNY travel wallet top-ups</span>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700 flex items-start gap-2.5 text-xs">
                <div className="p-1.5 bg-emerald-700 text-white rounded-lg shrink-0 mt-0.5">
                  <Building2 size={14} />
                </div>
                <div>
                  <span className="font-bold text-brand-900 dark:text-white block">Trade & Enterprises</span>
                  <span className="text-[11px] text-neutral-500">Al Faw Port customs & machinery escrow</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                to={`/${lang}/payments`}
                className="px-6 py-3 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <Coins size={15} />
                <span>{labels.enterGateway}</span>
                <ArrowRight size={14} />
              </Link>

              <Link
                to={`/${lang}/payments?tab=tracker`}
                className="px-5 py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-brand-900 dark:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <span>{labels.trackOrder}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Rapid Preview Box */}
          <div className="lg:col-span-5 bg-neutral-50 dark:bg-neutral-800/40 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 pb-2">
              <span className="text-xs font-bold uppercase text-neutral-500">
                Live Quick Converter
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setCalcType('RETAIL')}
                  className={`px-2 py-1 text-xs font-bold rounded cursor-pointer ${
                    calcType === 'RETAIL' ? 'bg-brand-800 text-white' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600'
                  }`}
                >
                  Retail
                </button>
                <button
                  type="button"
                  onClick={() => setCalcType('BUSINESS')}
                  className={`px-2 py-1 text-xs font-bold rounded cursor-pointer ${
                    calcType === 'BUSINESS' ? 'bg-emerald-700 text-white' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600'
                  }`}
                >
                  Corporate
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs uppercase text-neutral-400 mb-1">
                  You Send (IQD)
                </label>
                <input
                  type="number"
                  value={quickAmount}
                  onChange={(e) => setQuickAmount(e.target.value)}
                  className="w-full text-lg font-bold p-2.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg"
                />
              </div>

              <div className="p-3 bg-brand-50/50 dark:bg-brand-950/30 rounded-xl border border-brand-200 dark:border-brand-800">
                <span className="block text-xs uppercase text-brand-800 dark:text-brand-300">
                  Recipient Credited (Digital Yuan)
                </span>
                <span className="text-2xl font-black text-brand-800 dark:text-brand-400">
                  ¥ {netCny.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} e-CNY
                </span>
                <span className="block text-xs text-neutral-500 mt-1">
                  Fee: {feePercent}% (bypasses SWIFT dollar intermediary fee)
                </span>
              </div>
            </div>

            <Link
              to={`/${lang}/payments`}
              className="w-full py-2.5 bg-brand-800 hover:bg-brand-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider block text-center transition-colors cursor-pointer"
            >
              Lock This Rate & Generate QR
            </Link>
          </div>

        </div>

      </div>
    </ErrorBoundary>
  );
}
