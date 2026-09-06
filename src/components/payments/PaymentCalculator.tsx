import React, { useState, useEffect } from 'react';
import { Locale, PaymentExchangeRate, PaymentQuote } from '../../types';
import { 
  ArrowRightLeft, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Building2, 
  User, 
  Coins, 
  Zap, 
  CheckCircle2, 
  HelpCircle,
  TrendingDown
} from 'lucide-react';

interface Props {
  rates: PaymentExchangeRate | null;
  lang: Locale;
  onInitiatePayment: (params: {
    orderType: 'RETAIL' | 'BUSINESS';
    direction: 'IQD_TO_ECNY' | 'ECNY_TO_IQD';
    sourceAmount: number;
    targetAmount: number;
    exchangeRate: number;
    feeAmount: number;
    feePercent: number;
  }) => void;
}

export function PaymentCalculator({ rates, lang, onInitiatePayment }: Props) {
  const [orderType, setOrderType] = useState<'RETAIL' | 'BUSINESS'>('RETAIL');
  const [direction, setDirection] = useState<'IQD_TO_ECNY' | 'ECNY_TO_IQD'>('IQD_TO_ECNY');
  const [amountStr, setAmountStr] = useState<string>('1000000');
  const [quote, setQuote] = useState<PaymentQuote | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [lockCountdown, setLockCountdown] = useState<number>(900); // 15 mins

  const isRtl = lang === 'ar' || lang === 'ckb';
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';

  // Base rate values
  const baseRate = rates?.baseRate ?? 188.50;
  const bidRate = rates?.bidRate ?? 187.80;
  const askRate = rates?.askRate ?? 189.20;

  // Presets based on selected direction and persona
  const presets = direction === 'IQD_TO_ECNY' 
    ? (orderType === 'RETAIL' 
        ? [250000, 500000, 1000000, 3000000] 
        : [10000000, 50000000, 188500000, 500000000])
    : (orderType === 'RETAIL' 
        ? [1000, 2500, 5000, 15000] 
        : [50000, 200000, 500000, 1000000]);

  // Compute live quote
  useEffect(() => {
    const num = parseFloat(amountStr) || 0;
    if (num <= 0) {
      setQuote(null);
      return;
    }

    setIsCalculating(true);
    const effectiveRate = direction === 'IQD_TO_ECNY' ? askRate : bidRate;
    const feePercent = orderType === 'BUSINESS'
      ? (rates?.businessFeePercent ?? 0.35)
      : (rates?.retailFeePercent ?? 0.75);

    let gross = 0;
    let feeAmount = 0;
    let targetAmount = 0;

    if (direction === 'IQD_TO_ECNY') {
      gross = num / effectiveRate;
      feeAmount = +(gross * (feePercent / 100)).toFixed(2);
      targetAmount = +(gross - feeAmount).toFixed(2);
    } else {
      gross = num * effectiveRate;
      feeAmount = +(gross * (feePercent / 100)).toFixed(2);
      targetAmount = +(gross - feeAmount).toFixed(2);
    }

    const feeSaved = +(num * 0.038 - num * (feePercent / 100)).toFixed(2);

    setQuote({
      direction,
      orderType,
      sourceCurrency: direction === 'IQD_TO_ECNY' ? 'IQD' : 'E_CNY',
      targetCurrency: direction === 'IQD_TO_ECNY' ? 'E_CNY' : 'IQD',
      sourceAmount: num,
      effectiveRate,
      feePercent,
      feeAmount,
      targetAmount,
      quoteExpiresInSeconds: 900,
      quoteHash: 'LIVE-CLEARING-QUOTE',
      comparison: {
        legacyBankFeePercent: 3.8,
        legacyEstimatedDays: 4,
        cbdcEstimatedHours: orderType === 'BUSINESS' ? 1.5 : 0.25,
        feeSavedEstimated: feeSaved > 0 ? feeSaved : 0,
        mbridgeEnabled: true
      }
    });

    setIsCalculating(false);
  }, [amountStr, direction, orderType, rates, baseRate, bidRate, askRate]);

  // Countdown timer for rate lock
  useEffect(() => {
    const timer = setInterval(() => {
      setLockCountdown(prev => (prev > 1 ? prev - 1 : 900));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const labels = {
    title: isAr ? 'محول ومسعر المدفوعات الحقيقي (IQD ⇄ E-CNY)' : isZh ? '伊拉克第纳尔与数字人民币实时兑换与支付测算' : isCkb ? 'ئاڵوگۆڕ و حیسابکردنی ڕاستەقینەی دراو (IQD ⇄ E-CNY)' : 'Real IQD ⇄ e-CNY Currency Conversion & PSP Calculator',
    subtitle: isAr ? 'تسوية رقمية فورية للأفراد والشركات عبر ممر البنك المركزي الصيني وبنك العراق المركزي' : isZh ? '基于中国人民银行数字货币（e-CNY）与伊拉克中央银行清算系统的双边直联走廊' : isCkb ? 'چارەسەری دارایی خێرا بۆ تاک و کۆمپانیاکان لە ڕێگەی بانکی ناوەندی چین و عێراق' : 'Direct Central Bank Clearing Corridor for Individuals, Expats, and B2B Cross-Border Enterprises',
    retailTab: isAr ? 'الأفراد والمواطنون' : isZh ? '个人与普通用户' : isCkb ? 'تاک و هاووڵاتیان' : 'Ordinary Users (Retail)',
    retailDesc: isAr ? 'حوالات عائلية، أقساط دراسية في الصين، ومحافظ السفر' : isZh ? '学费、留学生汇款、商务差旅、家庭生活费' : isCkb ? 'کرێی خوێندن لە چین، سەفەر، و یارمەتی خێزانی' : 'Family remittances, university tuition in China, travel wallets',
    businessTab: isAr ? 'الشركات والتجارة الدولية' : isZh ? '企业与跨国贸易' : isCkb ? 'کۆمپانیاکان و بازرگانی' : 'Businesses & Enterprises',
    businessDesc: isAr ? 'تسويات ميناء الفاو الكبير، اعتمادات الاستيراد، ورسوم الجمارك' : isZh ? '法奥港通关、机械设备采购、大宗贸易外汇直结' : isCkb ? 'بەندەری فاو، هاوردەکردنی کەلوپەل و گومرگ' : 'Al Faw Port customs clearance, bulk sourcing, wholesale escrow',
    youPay: isAr ? 'المبلغ المطلوب سداده' : isZh ? '您支付金额' : isCkb ? 'بڕی پێدانی تۆ' : 'You Send / Pay',
    youReceive: isAr ? 'المبلغ المستلم الصافي' : isZh ? '对方到账金额' : isCkb ? 'بڕی گەیشتووی تەواو' : 'Recipient Receives (Net)',
    directionIqdToCny: isAr ? 'د.ع إلى يوان رقمي (IQD → e-CNY)' : isZh ? '第纳尔兑换数字人民币 (IQD → e-CNY)' : isCkb ? 'دینار بۆ یوانی دیجیتاڵی' : 'IQD to Digital Yuan (e-CNY)',
    directionCnyToIqd: isAr ? 'يوان رقمي إلى د.ع (e-CNY → IQD)' : isZh ? '数字人民币兑换第纳尔 (e-CNY → IQD)' : isCkb ? 'یوانی دیجیتاڵی بۆ دینار' : 'Digital Yuan (e-CNY) to IQD',
    serviceFee: isAr ? 'رسوم التسوية المباشرة' : isZh ? '双边央行清算服务费' : isCkb ? 'تێچووی خزمەتگوزاری' : 'Direct Clearing Service Fee',
    rateGuaranteed: isAr ? 'سعر صرف مضمون لمدة' : isZh ? '汇率锁定保证倒计时' : isCkb ? 'گرەنتی نرخی دراو بۆ ماوەی' : 'Guaranteed Locked Rate For',
    comparisonHeadline: isAr ? 'مقارنة مع التحويلات المصرفية التقليدية (SWIFT USD)' : isZh ? '对比传统SWIFT美元中转汇款' : isCkb ? 'بەراورد لەگەڵ حەواڵەی تەقلیدی SWIFT بە دۆلار' : 'Comparison vs. Legacy SWIFT USD Intermediary Transfer',
    speedLabel: isAr ? 'سرعة الوصول' : isZh ? '到账时间' : isCkb ? 'خێرایی گەیشتن' : 'Settlement Speed',
    speedFast: isAr ? 'دقائق معدودة عبر mBridge' : isZh ? '即时至1.5小时（mBridge走廊）' : isCkb ? 'چەند خولەکێک لە ڕێگەی mBridge' : '5 mins to 1.5 hours (Direct mBridge)',
    speedSlow: isAr ? '3 إلى 5 أيام عمل' : isZh ? '3至5个工作日' : isCkb ? '٣ بۆ ٥ ڕۆژی کاری' : '3 to 5 Banking Days',
    savingsLabel: isAr ? 'التوفير التقديري في العمولات' : isZh ? '预计节省交易成本' : isCkb ? 'بڕی پاشەکەوتکراو لە باج' : 'Estimated Cost Savings',
    actionBtn: isAr ? 'إنشاء أمر تسوية وإصدار رمز الدفع QR' : isZh ? '发起支付并生成数字人民币清算二维码' : isCkb ? 'دەستپێکردنی پارەدان و دەرکردنی QR' : 'Initiate Payment & Generate e-CNY QR Code'
  };

  const handleSwap = () => {
    setDirection(prev => prev === 'IQD_TO_ECNY' ? 'ECNY_TO_IQD' : 'IQD_TO_ECNY');
    if (direction === 'IQD_TO_ECNY') {
      setAmountStr(orderType === 'RETAIL' ? '5000' : '200000');
    } else {
      setAmountStr(orderType === 'RETAIL' ? '1000000' : '50000000');
    }
  };

  const handleInitiate = () => {
    if (!quote || quote.sourceAmount <= 0) return;
    onInitiatePayment({
      orderType,
      direction,
      sourceAmount: quote.sourceAmount,
      targetAmount: quote.targetAmount,
      exchangeRate: quote.effectiveRate,
      feeAmount: quote.feeAmount,
      feePercent: quote.feePercent
    });
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 border-2 border-ink-900 dark:border-neutral-700 shadow-xl rounded-2xl overflow-hidden font-sans">
      
      {/* Header Banner */}
      <div className="bg-ink-900 text-white p-6 sm:p-8 border-b-2 border-brand-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-800/80 border border-brand-500/40 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase text-amber-300">
              <Sparkles size={12} />
              <span>Sino-Iraqi Sovereign FinTech Gateway</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-white">
              {labels.title}
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {labels.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-black/40 border border-white/10 px-4 py-2.5 rounded-xl self-start md:self-auto">
            <Clock size={16} className="text-amber-400 animate-pulse" />
            <div className="text-start">
              <div className="text-[9px] font-mono uppercase text-neutral-400 tracking-wider">
                {labels.rateGuaranteed}
              </div>
              <div className="text-sm font-mono font-black text-amber-300">
                {formatTime(lockCountdown)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">

        {/* Persona Selector (Retail vs Corporate) */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Ordinary Users */}
            <button
              type="button"
              onClick={() => {
                setOrderType('RETAIL');
                if (direction === 'IQD_TO_ECNY') setAmountStr('1000000');
                else setAmountStr('5000');
              }}
              className={`p-4 rounded-xl border-2 text-start transition-all cursor-pointer flex items-start gap-3.5 ${
                orderType === 'RETAIL'
                  ? 'border-brand-800 bg-brand-50/50 dark:bg-brand-950/20 shadow-md'
                  : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
              }`}
            >
              <div className={`p-2.5 rounded-lg shrink-0 ${
                orderType === 'RETAIL' ? 'bg-brand-800 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
              }`}>
                <User size={20} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-ink-900 dark:text-white">
                    {labels.retailTab}
                  </span>
                  <span className="text-[10px] bg-brand-100 dark:bg-brand-900/50 text-brand-800 dark:text-brand-300 font-mono font-bold px-2 py-0.5 rounded">
                    0.75% Fee
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {labels.retailDesc}
                </p>
              </div>
            </button>

            {/* Businesses & Enterprises */}
            <button
              type="button"
              onClick={() => {
                setOrderType('BUSINESS');
                if (direction === 'IQD_TO_ECNY') setAmountStr('50000000');
                else setAmountStr('250000');
              }}
              className={`p-4 rounded-xl border-2 text-start transition-all cursor-pointer flex items-start gap-3.5 ${
                orderType === 'BUSINESS'
                  ? 'border-brand-800 bg-brand-50/50 dark:bg-brand-950/20 shadow-md'
                  : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
              }`}
            >
              <div className={`p-2.5 rounded-lg shrink-0 ${
                orderType === 'BUSINESS' ? 'bg-brand-800 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
              }`}>
                <Building2 size={20} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-ink-900 dark:text-white">
                    {labels.businessTab}
                  </span>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-mono font-bold px-2 py-0.5 rounded">
                    0.35% Wholesale
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {labels.businessDesc}
                </p>
              </div>
            </button>

          </div>
        </div>

        {/* Currency Direction & Swap Toggle */}
        <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/60 p-3 rounded-xl border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-2">
            <Coins size={18} className="text-brand-800 dark:text-brand-400" />
            <span className="text-xs font-black uppercase tracking-wider text-ink-900 dark:text-white">
              {direction === 'IQD_TO_ECNY' ? labels.directionIqdToCny : labels.directionCnyToIqd}
            </span>
          </div>

          <button
            type="button"
            onClick={handleSwap}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 border border-neutral-300 dark:border-neutral-600 rounded-lg text-xs font-bold text-ink-900 dark:text-white transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <ArrowRightLeft size={14} className="text-brand-800 dark:text-brand-400" />
            <span>Switch Direction</span>
          </button>
        </div>

        {/* Dual Input Panels */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Source Currency Input */}
          <div className="md:col-span-5 bg-neutral-50 dark:bg-neutral-800/50 p-5 rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 space-y-3 text-start">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-black uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {labels.youPay}
              </label>
              <span className="text-xs font-mono font-bold text-ink-900 dark:text-white px-2 py-0.5 bg-white dark:bg-neutral-700 rounded border border-neutral-200 dark:border-neutral-600">
                {direction === 'IQD_TO_ECNY' ? 'IQD (د.ع)' : 'e-CNY (¥)'}
              </span>
            </div>

            <div className="relative">
              <input
                type="number"
                min="1"
                step="any"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                className="w-full text-2xl sm:text-3xl font-mono font-black text-ink-900 dark:text-white bg-white dark:bg-neutral-900 px-4 py-3 border-2 border-neutral-300 dark:border-neutral-600 rounded-xl focus:border-brand-800 focus:outline-none"
                placeholder="0.00"
              />
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {presets.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmountStr(val.toString())}
                  className="text-[10px] font-mono font-bold px-2 py-1 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded hover:border-brand-800 hover:text-brand-800 transition-colors cursor-pointer"
                >
                  {val.toLocaleString()} {direction === 'IQD_TO_ECNY' ? 'IQD' : '¥'}
                </button>
              ))}
            </div>
          </div>

          {/* Central Exchange Rate Marker */}
          <div className="md:col-span-2 flex flex-col items-center justify-center text-center py-2">
            <div className="w-10 h-10 rounded-full bg-brand-800 text-white flex items-center justify-center shadow-md mb-1">
              <ArrowRightLeft size={16} />
            </div>
            <div className="text-[10px] font-mono font-bold text-neutral-500 dark:text-neutral-400">
              1 e-CNY = {(quote?.effectiveRate || baseRate).toFixed(2)} IQD
            </div>
          </div>

          {/* Target Currency Received */}
          <div className="md:col-span-5 bg-brand-50/40 dark:bg-brand-950/20 p-5 rounded-2xl border-2 border-brand-800/40 dark:border-brand-700/40 space-y-3 text-start">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-black uppercase tracking-wider text-brand-900 dark:text-brand-300">
                {labels.youReceive}
              </label>
              <span className="text-xs font-mono font-bold text-brand-900 dark:text-brand-200 px-2 py-0.5 bg-white dark:bg-neutral-800 rounded border border-brand-300 dark:border-brand-700">
                {direction === 'IQD_TO_ECNY' ? 'e-CNY (¥)' : 'IQD (د.ع)'}
              </span>
            </div>

            <div className="bg-white dark:bg-neutral-900 px-4 py-3 border-2 border-brand-800/30 rounded-xl">
              <div className="text-2xl sm:text-3xl font-mono font-black text-brand-800 dark:text-brand-400 truncate">
                {quote ? quote.targetAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
              </div>
            </div>

            <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 flex items-center justify-between pt-1">
              <span>{labels.serviceFee} ({quote?.feePercent ?? 0.75}%):</span>
              <span className="font-bold text-ink-900 dark:text-neutral-200">
                {quote?.feeAmount.toLocaleString()} {direction === 'IQD_TO_ECNY' ? 'e-CNY' : 'IQD'}
              </span>
            </div>
          </div>

        </div>

        {/* Value Proposition vs SWIFT Comparison */}
        {quote && (
          <div className="p-5 bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 rounded-xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-ink-900 dark:text-white">
              <TrendingDown size={16} className="text-emerald-600 dark:text-emerald-400" />
              <span>{labels.comparisonHeadline}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-start">
              
              <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  {labels.speedLabel}
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Zap size={13} /> {labels.speedFast}
                </span>
                <span className="text-[10px] text-neutral-400 block mt-1 line-through">
                  Legacy: {labels.speedSlow}
                </span>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  {labels.savingsLabel}
                </span>
                <span className="text-xs font-mono font-bold text-brand-800 dark:text-brand-400">
                  ≈ {quote.comparison.feeSavedEstimated.toLocaleString()} {quote.sourceCurrency}
                </span>
                <span className="text-[10px] text-neutral-400 block mt-1">
                  Bypasses USD intermediary conversions
                </span>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Compliance Status
                </span>
                <span className="text-xs font-bold text-ink-900 dark:text-white flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-emerald-500" /> Pre-Screened Corridor
                </span>
                <span className="text-[10px] text-neutral-400 block mt-1">
                  CBI & PBOC anti-sanctions guarantee
                </span>
              </div>

            </div>
          </div>
        )}

        {/* Primary Call to Action */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleInitiate}
            disabled={!quote || quote.sourceAmount <= 0}
            className="w-full py-4 px-6 bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <Coins size={18} />
            <span>{labels.actionBtn}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
