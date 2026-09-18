import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Locale, PaymentExchangeRate, PaymentOrder } from '../types';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { LiveRateTicker } from '../components/payments/LiveRateTicker';
import { PaymentCalculator } from '../components/payments/PaymentCalculator';
import { PaymentOrderModal } from '../components/payments/PaymentOrderModal';
import { PaymentTracker } from '../components/payments/PaymentTracker';
import { PaymentReceiptModal } from '../components/payments/PaymentReceiptModal';
import { 
  Coins, 
  ShieldCheck, 
  Building2, 
  User, 
  FileText, 
  Zap, 
  CheckCircle2, 
  HelpCircle,
  Clock,
  ArrowRightLeft,
  ChevronDown,
  Layers,
  Lock,
  ExternalLink
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export function PaymentsPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const [searchParams] = useSearchParams();
  const initialRef = searchParams.get('ref') || '';

  const [activeTab, setActiveTab] = useState<'CALCULATOR' | 'TRACKER' | 'ENTERPRISE' | 'FAQ'>('CALCULATOR');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderInitialData, setOrderInitialData] = useState<any>(null);
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<PaymentOrder | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [recentOrder, setRecentOrder] = useState<PaymentOrder | null>(null);

  // If a ref is in query, switch to tracker
  useEffect(() => {
    if (initialRef) {
      setActiveTab('TRACKER');
    }
  }, [initialRef]);

  // Fetch live exchange rates from public API
  const { 
    data: ratesData, 
    refetch: refetchRates, 
    isFetching: isFetchingRates 
  } = useQuery<{ success?: boolean; data?: PaymentExchangeRate } & Partial<PaymentExchangeRate>>({
    queryKey: ['paymentRates'],
    queryFn: async () => {
      const res = await fetch('/api/public/payments/rates');
      if (!res.ok) throw new Error('Failed to load payment exchange rates');
      return res.json();
    },
    refetchInterval: 30000 // Polled every 30s
  });

  const rates = (ratesData?.data ?? (ratesData?.baseRate ? ratesData : null)) as PaymentExchangeRate | null;

  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';
  const isRtl = isAr || isCkb;

  const labels = {
    pageTitle: isAr ? 'بوابة التحويل والتسويات المالية (IQD ⇄ E-CNY)' : isZh ? '伊拉克第纳尔与数字人民币实时兑换与支付清算走廊' : 'IQD & e-CNY Currency Conversion & Payment Service Provider',
    pageSubtitle: isAr 
      ? 'خدمة مالية مباشرة معتمدة بين البنك المركزي الصيني والبنك المركزي العراقي للأفراد والشركات'
      : isZh
      ? '面向个人与企业的双边本币直接清算走廊 • 规避第三方中转与汇率摩擦'
      : 'Bilateral sovereign clearing service for ordinary citizens and commercial enterprises under PBOC and CBI direct protocols',
    tabCalc: isAr ? 'حاسبة التحويل الفوري' : isZh ? '实时兑换测算' : 'Conversion Calculator',
    tabTrack: isAr ? 'تتبع مسار الحوالة' : isZh ? '订单进度追踪' : 'Track Transaction',
    tabEnterprise: isAr ? 'خدمات الشركات وميناء الفاو' : isZh ? '企业与大宗贸易走廊' : 'Enterprise & mBridge',
    tabFaq: isAr ? 'الأسئلة الشائعة والامتثال' : isZh ? '合规问答与指南' : 'Compliance & FAQ',
    retailHero: isAr ? 'للأفراد والمواطنين' : isZh ? '个人与留学汇款' : 'For Ordinary Citizens',
    retailDesc: isAr ? 'أقساط دراسية في الصين، تحويلات عائلية، وشحن محافظ السفر باليوان الرقمي' : isZh ? '直联中国大学学费账户与央行数字钱包，秒级到账，手续费透明' : 'Pay Chinese university tuition, remit family support, and fund e-CNY travel wallets.',
    corpHero: isAr ? 'للشركات والتجارة' : isZh ? '企业大宗采购' : 'For Corporate & Trade',
    corpDesc: isAr ? 'تسويات ميناء الفاو الكبير، شحنات المعدات، وتخليص الجمارك بنسبة عمولة 0.35%' : isZh ? '支持法奥港基建、工程机械采购外汇直结，mBridge多边清算系统安全防冻结' : 'Wholesale clearing for Al Faw Port imports, heavy machinery, and customs clearance via mBridge.',
  };

  const handleInitiatePayment = (calcParams: any) => {
    setOrderInitialData(calcParams);
    setIsOrderModalOpen(true);
  };

  const handleOrderCreated = (newOrder: PaymentOrder) => {
    setRecentOrder(newOrder);
    setSelectedReceiptOrder(newOrder);
    setIsReceiptOpen(true);
    setActiveTab('TRACKER');
  };

  const handleOpenReceipt = (orderToView: PaymentOrder) => {
    setSelectedReceiptOrder(orderToView);
    setIsReceiptOpen(true);
  };

  return (
    <ErrorBoundary lang={lang}>
      <div className="w-full pb-16 font-sans">
          
          {/* Live Rate Ticker & Liquidity Reserve Bar */}
          <LiveRateTicker 
            rates={rates} 
            lang={lang} 
            onRefresh={() => refetchRates()} 
            isRefreshing={isFetchingRates} 
          />

          {/* Page Hero Header */}
          <div className="w-full bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 py-10 px-4 sm:px-6 text-center">
            <div className="max-w-4xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-full text-xs font-bold text-brand-800 dark:text-brand-300 uppercase tracking-wider">
                <Coins size={14} />
                <span>Sovereign FinTech Service Provider</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-brand-800 dark:text-white">
                {labels.pageTitle}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                {labels.pageSubtitle}
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
              <button
                onClick={() => setActiveTab('CALCULATOR')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'CALCULATOR'
                    ? 'bg-brand-800 text-white shadow-md'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
                }`}
              >
                <ArrowRightLeft size={14} />
                <span>{labels.tabCalc}</span>
              </button>

              <button
                onClick={() => setActiveTab('TRACKER')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'TRACKER'
                    ? 'bg-brand-800 text-white shadow-md'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
                }`}
              >
                <Clock size={14} />
                <span>{labels.tabTrack}</span>
              </button>

              <button
                onClick={() => setActiveTab('ENTERPRISE')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'ENTERPRISE'
                    ? 'bg-brand-800 text-white shadow-md'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
                }`}
              >
                <Building2 size={14} />
                <span>{labels.tabEnterprise}</span>
              </button>

              <button
                onClick={() => setActiveTab('FAQ')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'FAQ'
                    ? 'bg-brand-800 text-white shadow-md'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
                }`}
              >
                <HelpCircle size={14} />
                <span>{labels.tabFaq}</span>
              </button>
            </div>
          </div>

          {/* Main Body Container */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
            
            {/* View 1: Converter & Calculator */}
            {activeTab === 'CALCULATOR' && (
              <div className="space-y-8">
                <ErrorBoundary inline lang={lang} title="Conversion Calculator">
                  <PaymentCalculator 
                    rates={rates} 
                    lang={lang} 
                    onInitiatePayment={handleInitiatePayment} 
                  />
                </ErrorBoundary>

                {/* Feature Cards Grid (Retail & Enterprise Distinction) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Retail Card */}
                  <div className="p-6 bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-4 text-start shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 flex items-center justify-center text-brand-800 dark:text-brand-400">
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-ink-900 dark:text-white">
                        {labels.retailHero}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                        {labels.retailDesc}
                      </p>
                    </div>

                    <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300 font-medium">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        <span>Instant PBOC e-CNY App top-up via Zain Cash or Qi Card</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        <span>Direct tuition settlement for Beijing, Shanghai & Wuhan universities</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        <span>Fixed 0.75% transparent fee with zero hidden currency spread</span>
                      </li>
                    </ul>

                    <button
                      type="button"
                      onClick={() => handleInitiatePayment({ orderType: 'RETAIL', direction: 'IQD_TO_ECNY', sourceAmount: 1000000 })}
                      className="w-full py-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-brand-800 hover:text-white text-ink-900 dark:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Start Retail Payment
                    </button>
                  </div>

                  {/* Corporate Card */}
                  <div className="p-6 bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-4 text-start shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-ink-900 dark:text-white">
                        {labels.corpHero}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                        {labels.corpDesc}
                      </p>
                    </div>

                    <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300 font-medium">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        <span>mBridge multi-CBDC protocol for multi-million dollar consignments</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        <span>Customs clearance integration with Basra, Umm Qasr & Safwan border</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        <span>Wholesale tier 0.35% fee with sovereign cryptographic dossier</span>
                      </li>
                    </ul>

                    <button
                      type="button"
                      onClick={() => handleInitiatePayment({ orderType: 'BUSINESS', direction: 'IQD_TO_ECNY', sourceAmount: 50000000 })}
                      className="w-full py-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-emerald-800 hover:text-white text-ink-900 dark:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Start Enterprise Settlement
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* View 2: Transaction Tracker */}
            {activeTab === 'TRACKER' && (
              <ErrorBoundary inline lang={lang} title="Transaction Tracking">
                <PaymentTracker 
                  initialRef={recentOrder?.reference || initialRef} 
                  lang={lang} 
                  onOpenReceipt={handleOpenReceipt} 
                />
              </ErrorBoundary>
            )}

            {/* View 3: Enterprise & mBridge Protocol Details */}
            {activeTab === 'ENTERPRISE' && (
              <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 space-y-6 text-start">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-brand-800 text-white rounded-xl">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-brand-800 dark:text-white">
                      The Sovereign Sino-Iraqi Cross-Border Clearing Infrastructure
                    </h3>
                    <p className="text-xs text-neutral-500">
                      High-throughput, direct mBridge & CIPS connectivity for strategic trade corridors
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-2">
                    <span className="text-xs font-bold uppercase text-brand-800 dark:text-brand-400">
                      01 • Sovereign Reserve Lock
                    </span>
                    <h4 className="text-sm font-bold text-ink-900 dark:text-white">Central Escrow Pools</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Transactions draw upon active liquidity pools (¥150M e-CNY and د.ع 28.2B IQD) held under reciprocal guarantees, preventing market illiquidity.
                    </p>
                  </div>

                  <div className="p-5 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-2">
                    <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
                      02 • Zero Intermediary Risk
                    </span>
                    <h4 className="text-sm font-bold text-ink-900 dark:text-white">Anti-Sanctions Shield</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Settlements do not touch foreign correspondent clearing houses (CHIPS/SWIFT), eliminating delays, third-party compliance holds, and dollar conversion gouging.
                    </p>
                  </div>

                  <div className="p-5 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-2">
                    <span className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400">
                      03 • Customs Synchronization
                    </span>
                    <h4 className="text-sm font-bold text-ink-900 dark:text-white">Basra & Port Clearance</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Each corporate transaction generates an official verification code recognized by Iraqi customs authorities at Umm Qasr, Grand Faw Port, and Safwan.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-black text-brand-800 dark:text-brand-300">
                      Need a Dedicated Corporate Trade Escrow Account?
                    </h4>
                    <p className="text-xs text-brand-800/80 dark:text-brand-400/80 mt-1">
                      Our institutional trade desk assists major Iraqi contractors and Chinese EPC consortia with bespoke high-volume lines.
                    </p>
                  </div>
                  <button
                    onClick={() => handleInitiatePayment({ orderType: 'BUSINESS', direction: 'IQD_TO_ECNY', sourceAmount: 200000000 })}
                    className="px-6 py-3 bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shrink-0"
                  >
                    Open Institutional Ticket
                  </button>
                </div>
              </div>
            )}

            {/* View 4: Compliance & FAQ */}
            {activeTab === 'FAQ' && (
              <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 space-y-6 text-start">
                <h3 className="text-xl font-black text-brand-800 dark:text-white">
                  Regulatory Compliance & Common Inquiries
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-1">
                    <h4 className="font-bold text-ink-900 dark:text-white">
                      1. How does the e-CNY (Digital Yuan) transfer reach the recipient in China?
                    </h4>
                    <p className="text-neutral-500 leading-relaxed">
                      The transfer can be credited directly to the recipient's official PBOC Digital Wallet App ID, Chinese university tuition clearing account, or linked UnionPay/WeChat/Alipay account within minutes.
                    </p>
                  </div>

                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-1">
                    <h4 className="font-bold text-ink-900 dark:text-white">
                      2. How can I pay the Iraqi Dinar amount locally in Iraq?
                    </h4>
                    <p className="text-neutral-500 leading-relaxed">
                      You can pay seamlessly via Zain Cash, Qi Card, First Iraqi Bank (FIB), or at any authorized Iraqi-Chinese Agency partner exchange bureau across Baghdad, Erbil, Basra, and Najaf.
                    </p>
                  </div>

                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-1">
                    <h4 className="font-bold text-ink-900 dark:text-white">
                      3. Is this service legal under Iraqi and Chinese banking regulations?
                    </h4>
                    <p className="text-neutral-500 leading-relaxed">
                      Yes. The gateway operates strictly in compliance with bilateral currency agreements, Central Bank of Iraq (CBI) foreign exchange directives, and People's Bank of China (PBOC) digital currency pilot protocols.
                    </p>
                  </div>

                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-1">
                    <h4 className="font-bold text-ink-900 dark:text-white">
                      4. What documentation is required for large corporate shipments?
                    </h4>
                    <p className="text-neutral-500 leading-relaxed">
                      For corporate transactions exceeding IQD 50,000,000, attaching a commercial invoice, bill of lading (B/L), or Iraqi customs declaration accelerates automatic clearance through the mBridge corridor.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Payment Order Modal */}
          <PaymentOrderModal
            isOpen={isOrderModalOpen}
            onClose={() => setIsOrderModalOpen(false)}
            initialData={orderInitialData}
            lang={lang}
            onOrderCreated={handleOrderCreated}
          />

          {/* Official Settlement Certificate & Receipt Modal */}
          <PaymentReceiptModal
            isOpen={isReceiptOpen}
            onClose={() => setIsReceiptOpen(false)}
            order={selectedReceiptOrder}
            lang={lang}
          />

        </div>
      </ErrorBoundary>
  );
}
