import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Locale, PaymentExchangeRate, PaymentOrder } from '../types';
import { 
  Coins, ArrowRightLeft, ShieldCheck, Zap, Building2, User, 
  ArrowRight, ArrowLeft, TrendingUp, TrendingDown, CheckCircle2, 
  Factory, Search, Ship, Send, X, ExternalLink, Layers, Check,
  Sparkles, FileText, ChevronRight, Clock, Award, ShieldAlert,
  FileSpreadsheet, ArrowUpRight, CheckCheck, LucideIcon
} from 'lucide-react';
import { ErrorBoundary } from './ErrorBoundary';
import { cn } from '../lib/utils';
import { PaymentOrderModal } from './payments/PaymentOrderModal';
import { PaymentTracker } from './payments/PaymentTracker';
import { PaymentReceiptModal } from './payments/PaymentReceiptModal';
import { getSourcingPillars, SourcingPillarData } from '../data/sourcingPillarsData';

const iconMap: Record<string, LucideIcon> = {
  Factory,
  Search,
  ShieldCheck,
  Ship,
  FileText,
  CheckCircle2,
  Building2,
  Award,
  Zap,
};

interface Props {
  lang: Locale;
}

export function PaymentAndSourcingSection({ lang }: Props) {
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';
  const isRtl = isAr || isCkb;

  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Active View Tab: 'all' | 'settlement' | 'sourcing'
  const [activeTab, setActiveTab] = useState<'all' | 'settlement' | 'sourcing'>('all');

  // Interactive Modals State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<PaymentOrder | null>(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [trackerInitialRef, setTrackerInitialRef] = useState('');

  // Handle URL deep-linking via query parameter or hash
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const hash = location.hash;

    if (tabParam === 'settlement' || tabParam === 'currency-settlement' || hash === '#settlement' || hash === '#currency-settlement') {
      setActiveTab('settlement');
    } else if (tabParam === 'sourcing' || tabParam === 'sourcing-catalog' || hash === '#sourcing' || hash === '#sourcing-catalog') {
      setActiveTab('sourcing');
    } else if (tabParam === 'all') {
      setActiveTab('all');
    } else if (tabParam === 'tracker') {
      setActiveTab('settlement');
      setIsTrackerOpen(true);
    }

    const refParam = searchParams.get('ref');
    if (refParam) {
      setActiveTab('settlement');
      setTrackerInitialRef(refParam);
      setIsTrackerOpen(true);
    }

    if (hash === '#settlement-sourcing' || hash === '#settlement' || hash === '#currency-settlement') {
      const timer = setTimeout(() => {
        const el = document.getElementById('settlement-sourcing');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash, location.search, searchParams]);

  // --- Payment State ---
  const [calcType, setCalcType] = useState<'RETAIL' | 'BUSINESS'>('RETAIL');
  const [quickAmount, setQuickAmount] = useState<string>('1000000');

  // Live Exchange Rate Query
  const { data: ratesData } = useQuery<{ success?: boolean; data?: PaymentExchangeRate } & Partial<PaymentExchangeRate>>({
    queryKey: ['paymentRates'],
    queryFn: async () => {
      const res = await fetch('/api/public/payments/rates');
      if (!res.ok) throw new Error('Failed to load rates');
      return res.json();
    },
    refetchInterval: 30000
  });

  const rates = (ratesData?.data ?? (ratesData?.baseRate ? ratesData : null)) as PaymentExchangeRate | null;
  const baseRate = rates?.baseRate ?? 188.50;
  const askRate = rates?.askRate ?? 189.20;
  const feePercent = calcType === 'BUSINESS' ? 0.35 : 0.75;

  const num = parseFloat(quickAmount) || 0;
  const gross = num > 0 ? num / askRate : 0;
  const fee = +(gross * (feePercent / 100)).toFixed(2);
  const netCny = +(gross - fee).toFixed(2);

  // --- Sourcing State ---
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    inquiryType: 'PRODUCT_SOURCING',
    targetMarket: 'CHINA',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [ticketRef, setTicketRef] = useState('');
  const [selectedBenefit, setSelectedBenefit] = useState<SourcingPillarData | null>(null);

  // Fetch live sourcing pillars from API with fallback to static data
  const { data: dbPillars } = useQuery({
    queryKey: ['publicSourcingPillars'],
    queryFn: async () => {
      const res = await fetch('/api/public/sourcing/pillars');
      if (!res.ok) throw new Error('Failed to load sourcing pillars');
      return res.json();
    },
    staleTime: 60000,
  });

  const pillars: SourcingPillarData[] = useMemo(() => {
    if (Array.isArray(dbPillars) && dbPillars.length > 0) {
      return dbPillars.map((p: any) => {
        let metrics = [];
        try {
          metrics = typeof p.metricsJson === 'string' ? JSON.parse(p.metricsJson) : p.metricsJson || [];
        } catch {
          metrics = [];
        }

        let compSpec: string[] = [];
        try {
          const raw = isZh ? p.comprehensiveSpecificationZh : isAr ? p.comprehensiveSpecificationAr : isCkb ? p.comprehensiveSpecificationCkb : p.comprehensiveSpecificationEn;
          compSpec = typeof raw === 'string' ? JSON.parse(raw) : raw || [];
        } catch {
          compSpec = [];
        }

        let updates: string[] = [];
        try {
          const raw = isZh ? p.updates2026Zh : isAr ? p.updates2026Ar : isCkb ? p.updates2026Ckb : p.updates2026En;
          updates = typeof raw === 'string' ? JSON.parse(raw) : raw || [];
        } catch {
          updates = [];
        }

        let deliverables: string[] = [];
        try {
          const raw = isZh ? p.deliverablesZh : isAr ? p.deliverablesAr : isCkb ? p.deliverablesCkb : p.deliverablesEn;
          deliverables = typeof raw === 'string' ? JSON.parse(raw) : raw || [];
        } catch {
          deliverables = [];
        }

        let standards: string[] = [];
        try {
          standards = typeof p.standardsJson === 'string' ? JSON.parse(p.standardsJson) : p.standardsJson || [];
        } catch {
          standards = [];
        }

        return {
          id: p.slug as any,
          serviceCode: p.serviceCode as any,
          icon: iconMap[p.iconName] || iconMap[p.icon] || Factory,
          title: (isZh ? p.titleZh : isAr ? p.titleAr : isCkb ? p.titleCkb : p.titleEn) || p.titleEn,
          tag: (isZh ? p.tagZh : isAr ? p.tagAr : isCkb ? p.tagCkb : p.tagEn) || p.tagEn,
          updateBadge: (isZh ? p.updateBadgeZh : isAr ? p.updateBadgeAr : isCkb ? p.updateBadgeCkb : p.updateBadgeEn) || p.updateBadgeEn,
          desc: (isZh ? p.descZh : isAr ? p.descAr : isCkb ? p.descCkb : p.descEn) || p.descEn,
          leadSummary: (isZh ? p.leadSummaryZh : isAr ? p.leadSummaryAr : isCkb ? p.leadSummaryCkb : p.leadSummaryEn) || p.leadSummaryEn,
          wordCount: p.wordCount || 320,
          readTime: isZh ? (p.readTimeZh || `${(p.readTimeEn || '2 Min Read').replace(/Min Read/i, '分钟精读')}`) : isAr ? (p.readTimeAr || 'قراءة في دقيقتين') : isCkb ? (p.readTimeCkb || '٢ خولەک خوێندنەوە') : (p.readTimeEn || '2 Min Read'),
          metrics: Array.isArray(metrics) && metrics.length > 0 ? metrics : [
            { label: 'Dispatch', value: '48h', sub: 'Arrival' },
            { label: 'Coverage', value: 'National', sub: 'Hubs' },
            { label: 'Status', value: 'Active', sub: 'Verified' },
            { label: 'Integrity', value: '100%', sub: 'Zero Fraud' }
          ],
          comprehensiveSpecification: Array.isArray(compSpec) && compSpec.length > 0 ? compSpec : [],
          updates2026: Array.isArray(updates) && updates.length > 0 ? updates : [],
          deliverables: Array.isArray(deliverables) && deliverables.length > 0 ? deliverables : [],
          standards: Array.isArray(standards) && standards.length > 0 ? standards : [],
        };
      });
    }
    return getSourcingPillars(lang);
  }, [dbPillars, lang, isZh, isAr, isCkb]);

  const handleBookServiceFromModal = (serviceCode: string) => {
    setFormData(prev => ({ ...prev, inquiryType: serviceCode }));
    setSelectedBenefit(null);
    setTimeout(() => {
      const formEl = document.getElementById('sourcing-inquiry-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 120);
  };

  const handleSourcingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/public/sourcing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const data = await res.json();
        setTicketRef(data.ticketId);
        setSubmitSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Translations
  const t = {
    sectionEyebrow: isZh ? '中伊双边经贸与供应链综合服务大厅' : isAr ? 'بوابة التجارة الثنائية وسلاسل الإمداد المتكاملة' : isCkb ? 'دەروازەی بازرگانی و دابینکردنی دووقۆڵی عێراق و چین' : 'Bilateral Commercial Gateway & Enterprise Hub',
    sectionTitle: isZh ? '双边资金结算与供应链采购服务' : isAr ? 'خدمات التسوية المالية والتوريد المباشر' : isCkb ? 'خزمەتگوزاری یەکلاکردنەوەی دارایی و دابینکردن' : 'Bilateral Settlement & Sourcing Services',
    sectionSubtitle: isZh 
      ? '一站式连接中国人民银行数字人民币（e-CNY）与伊拉克央行官方清算通道，同步赋能伊拉克企业直接对接中国优质制造业原厂。' 
      : isAr 
      ? 'منظومة موحدة للتسوية اللحظية بين البنك المركزي العراقي وبنك الشعب الصيني (e-CNY)، مع تأمين التوريد المباشر والتدقيق الميداني للمصانع.'
      : isCkb 
      ? 'سیستەمێکی یەکگرتوو بۆ یەکلاکردنەوەی دارایی ڕاستەوخۆ بە یوان (e-CNY) و دابینکردنی بێ ناوەندگیری کەلوپەلی پیشەسازی لە کارگە چینییەکان.'
      : 'A sovereign corridor unifying instant IQD ⇄ e-CNY digital currency clearance with direct on-the-ground manufacturing audits and wholesale procurement.',
    tabs: {
      all: isZh ? '综合全貌 (结算 + 采购)' : isAr ? 'العرض الموحد (تسوية + توريد)' : isCkb ? 'هەردوو خزمەتگوزاری' : 'Combined Overview',
      settlement: isZh ? '双边资金清算 (IQD ⇄ e-CNY)' : isAr ? 'التسويات المالية (IQD ⇄ e-CNY)' : isCkb ? 'یەکلاکردنەوەی دراو' : 'Currency Settlement',
      sourcing: isZh ? '供应链与原厂采购' : isAr ? 'التوريد وفحص المصانع' : isCkb ? 'دابینکردن و پشکنین' : 'Sourcing & Verification'
    },
    payment: {
      eyebrow: isZh ? '主权双边清算网关' : isAr ? 'الخدمة المصرفية السيادية' : isCkb ? 'ڕێڕەوی فەرمی بانکی' : 'Sovereign Bilateral FinTech Gateway',
      title: isZh ? '第纳尔与数字人民币实时结算走廊' : isAr ? 'منصة التحويل والتسويات المالية المباشرة (IQD ⇄ e-CNY)' : isCkb ? 'مامەڵەی ڕاستەوخۆی دینار و یوانی دیجیتاڵی' : 'Direct IQD ⇄ e-CNY Settlement & PSP Gateway',
      subtitle: isZh ? '绕开第三方中转费用，实现分钟级到账与法币合规清算。' : isAr ? 'تسوية فورية تتجاوز رسوم الوسطاء وتوفر أماناً مصرفياً كاملاً.' : isCkb ? 'بەبێ پارەی زیادی ناوەندگیرەکان، بە خێرایی و بە یاسایی پارە بگوازنەوە.' : 'Bypass SWIFT intermediary markups with direct central bank atomic clearing.',
      baseRateText: isZh ? '基准即时汇率' : isAr ? 'السعر اللحظي المعتمد' : isCkb ? 'نرخی فەرمی سات' : 'Official Clearing Rate',
      retailTab: isZh ? '个人留学/差旅' : isAr ? 'أفراد (أقساط ومحافظ)' : isCkb ? 'تاکەکەسی' : 'Retail (Tuition/Travel)',
      businessTab: isZh ? '企业与大宗 (0.35%)' : isAr ? 'شركات وموانئ (0.35%)' : isCkb ? 'کۆمپانیا و بازرگانی' : 'Enterprise & Trade (0.35%)',
      sendLabel: isZh ? '您支付 (伊拉克第纳尔 IQD)' : isAr ? 'المبلغ بالدينار العراقي (IQD)' : isCkb ? 'بڕی نێردراو بە دینار (IQD)' : 'You Send (IQD)',
      receiveLabel: isZh ? '收款方到账 (数字人民币 e-CNY)' : isAr ? 'المبلغ المستلم باليوان الرقمي (e-CNY)' : isCkb ? 'بڕی وەرگیراو بە یوان (e-CNY)' : 'Recipient Credited (e-CNY)',
      feeNote: isZh ? `清算综合费率: ${feePercent}% (无隐藏美金中间行费用)` : isAr ? `عمولة التسوية: ${feePercent}% (بدون رسوم وساطة دولارية)` : isCkb ? `تێچووی گواستنەوە: ${feePercent}%` : `Corridor Fee: ${feePercent}% (No SWIFT intermediary deduction)`,
      launchGatewayBtn: isZh ? '进入数字人民币支付网关' : isAr ? 'فتح بوابة الدفع والـ QR' : isCkb ? 'کردنەوەی دەروازەی پارەدان' : 'Open Payment & QR Gateway',
      trackOrderBtn: isZh ? '查询结算订单进度' : isAr ? 'تتبع مسار الحوالة' : isCkb ? 'بەدواداچوونی داواکاری' : 'Track Existing Order',
      mbridgeStatus: isZh ? 'mBridge 实时多边清算系统正常' : isAr ? 'ممر mBridge و CIPS في حالة عمل كاملة' : isCkb ? 'سیستەمی mBridge کارایە' : 'mBridge CBDC Active & Compliant'
    },
    sourcing: {
      eyebrow: isZh ? '官方产业采办服务' : isAr ? 'خدمات التوريد الحكومية الرسمية' : isCkb ? 'خزمەتگوزاری فەرمی کڕین' : 'Official Sourcing Authority',
      title: isZh ? '中国原厂采购与实地验厂' : isAr ? 'التوريد والتحقق الميداني من المصانع' : isCkb ? 'دابینکردنی کاڵا و پشکنینی کارگەکان' : 'Industrial Procurement & Factory Auditing',
      subtitle: isZh ? '伊拉克企业直连中国顶尖制造业基地，官方团队驻场验资，杜绝贸易欺诈。' : isAr ? 'ربط مباشر بمصانع الصين مع تدقيق ميداني من قبل فرقنا لضمان الجودة ومكافحة الاحتيال.' : isCkb ? 'پەیوەندی ڕاستەوخۆ بە کارگە گەورەکانی چین و پشکنینی مەیدانی بۆ ڕێگری لە فێڵکردن.' : 'Direct access to verified manufacturers with on-site inspection teams in Beijing and Baghdad.',
      formTitle: isZh ? '提交采购或验厂需求' : isAr ? 'تقديم طلب توريد أو تدقيق' : isCkb ? 'ناردنی داواکاری دابینکردن' : 'Submit Sourcing / Audit Request',
      formDesc: isZh ? '我们的贸易合规与采办专员将在24小时内与您对接' : isAr ? 'سيقوم خبراؤنا التجاريون في بكين وبغداد بمراجعة طلبك خلال 24 ساعة' : isCkb ? 'تیمە پسپۆڕەکانمان لە بەغدا و پەکین بە زووترین کات پەیوەندیت پێوە دەکەن' : 'Reviewed directly by ICA trade specialists in Beijing and Baghdad.',
      fields: {
        name: isZh ? '联系人姓名' : isAr ? 'الاسم الكامل' : isCkb ? 'ناوی تەواو' : 'Full Name',
        email: isZh ? '电子邮箱' : isAr ? 'البريد الإلكتروني' : isCkb ? 'ئیمەیڵ' : 'Email Address',
        company: isZh ? '企业或机构名称' : isAr ? 'اسم الشركة / المؤسسة' : isCkb ? 'ناوی کۆمپانیا' : 'Company Name',
        service: isZh ? '所需核心服务' : isAr ? 'نوع الخدمة المطلوبة' : isCkb ? 'جۆری خزمەتگوزاری' : 'Service Required',
        budget: isZh ? '采购预估预算 (USD/CNY)' : isAr ? 'الميزانية التقديرية' : isCkb ? 'بودجەی خەمڵێنراو' : 'Estimated Budget',
        message: isZh ? '详细产品规格或考察要求' : isAr ? 'تفاصيل المتطلبات والمواصفات' : isCkb ? 'وردەکاری داواکارییەکە' : 'Detailed Requirements'
      },
      services: [
        { id: 'PRODUCT_SOURCING', label: isZh ? '大宗工业品与设备采购' : isAr ? 'توريد البضائع والآلات' : isCkb ? 'دابینکردنی کاڵا و ئامێر' : 'Product & Machinery Sourcing' },
        { id: 'FACTORY_AUDIT', label: isZh ? '中国原厂实地资质验厂' : isAr ? 'تدقيق وفحص المصانع الميداني' : isCkb ? 'پشکنینی مەیدانی کارگە' : 'On-Site Factory Auditing' },
        { id: 'QUALITY_CONTROL', label: isZh ? '出港前批次质量检测 (QC)' : isAr ? 'مراقبة الجودة والفحص قبل الشحن' : isCkb ? 'کۆنترۆڵی جۆرایەتی پێش بارکردن' : 'Pre-Shipment Quality Control' },
        { id: 'LOGISTICS', label: isZh ? '乌姆盖斯尔港保税与清关' : isAr ? 'الشحن والتخليص الجمركي في أم قصر' : isCkb ? 'گواستنەوە و گومرگی ئوم قەسر' : 'Freight Forwarding & Customs' }
      ],
      submitBtn: isZh ? '提交官方采购咨询' : isAr ? 'إرسال طلب التوريد' : isCkb ? 'ناردنی داواکاری' : 'Submit Sourcing Request',
      submittingBtn: isZh ? '正在加密传输...' : isAr ? 'جاري الإرسال...' : isCkb ? 'ناردن...' : 'Submitting...',
      successTitle: isZh ? '需求已成功提交至中伊贸易专席' : isAr ? 'تم استلام طلب التوريد بنجاح' : isCkb ? 'داواکارییەکەت بە سەرکەوتوویی تۆمارکرا' : 'Sourcing Request Logged',
      successDesc: isZh ? '官方工单已创建，专席贸易代表将以加密通道跟进。' : isAr ? 'تم إصدار تذكرة متابعة رسمية وسيتواصل معك منسق التوريد.' : isCkb ? 'ژمارەی بەدواداچوونت بۆ دەرچوو، نوێنەری فەرمی پەیوەندیت پێوە دەکات.' : 'Your inquiry has been assigned an official bilateral tracking ticket.',
      ticketLabel: isZh ? '工单编号' : isAr ? 'رقم التذكرة' : isCkb ? 'ژمارەی تیکێت' : 'Ticket ID',
      newInquiryBtn: isZh ? '← 提交新的采购需求' : isAr ? '← تقديم طلب جديد' : isCkb ? '← ناردنی داواکاری نوێ' : '← Submit another inquiry'
    },
    pillars: pillars
  };

  return (
    <ErrorBoundary inline lang={lang} title="Payment & Sourcing Services">
      <section 
        id="settlement-sourcing" 
        className="w-full bg-white dark:bg-neutral-900 border-2 border-ink-900 dark:border-neutral-700 shadow-sm p-6 sm:p-8 md:p-10 my-8 transition-colors duration-300"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Unified Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-brand-800/15 pb-6 mb-8 gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-brand-800 rounded-2xs" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-800 dark:text-brand-400">
                {t.sectionEyebrow}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-brand-900 dark:text-neutral-100 uppercase">
              {t.sectionTitle}
            </h2>
            <p className="text-sm sm:text-base font-serif text-neutral-600 dark:text-neutral-400 leading-relaxed pt-1">
              {t.sectionSubtitle}
            </p>
          </div>

          {/* Master View Switcher Tabs with Hover Transitions */}
          <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 self-start lg:self-end shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={cn(
                "px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer",
                activeTab === 'all'
                  ? "bg-brand-800 text-white shadow-xs"
                  : "text-neutral-600 dark:text-neutral-300 hover:text-brand-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60"
              )}
            >
              {t.tabs.all}
            </button>
            <button
              onClick={() => setActiveTab('settlement')}
              className={cn(
                "px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5",
                activeTab === 'settlement'
                  ? "bg-brand-800 text-white shadow-xs"
                  : "text-neutral-600 dark:text-neutral-300 hover:text-brand-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60"
              )}
            >
              <Coins size={14} />
              <span>{t.tabs.settlement}</span>
            </button>
            <button
              onClick={() => setActiveTab('sourcing')}
              className={cn(
                "px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5",
                activeTab === 'sourcing'
                  ? "bg-brand-800 text-white shadow-xs"
                  : "text-neutral-600 dark:text-neutral-300 hover:text-brand-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60"
              )}
            >
              <Factory size={14} />
              <span>{t.tabs.sourcing}</span>
            </button>
          </div>
        </div>

        {/* Master Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-w-0">
          
          {/* ========================================================= */}
          {/* LEFT HALF / PANEL: CURRENCY SETTLEMENT & PSP (IQD ⇄ e-CNY) */}
          {/* ========================================================= */}
          {(activeTab === 'all' || activeTab === 'settlement') && (
            <div className={cn(
              "space-y-6 transition-all min-w-0",
              activeTab === 'all' ? "lg:col-span-6" : "lg:col-span-12"
            )}>
              {/* Panel Container */}
              <div className="bg-white dark:bg-neutral-900 border-2 border-brand-800 p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow duration-300">
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-brand-800/20 pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-sm bg-brand-800 text-white flex items-center justify-center shrink-0">
                      <Coins size={18} />
                    </div>
                    <div>
                      <span className="text-3xs font-mono font-bold uppercase tracking-widest text-brand-800 dark:text-brand-400 block">
                        {t.payment.eyebrow}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-brand-900 dark:text-neutral-100">
                        {t.payment.title}
                      </h3>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex items-center gap-1 text-3xs font-mono font-bold px-2 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-600/30">
                    <ShieldCheck size={12} />
                    <span>mBridge Active</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-serif text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  {t.payment.subtitle}
                </p>

                {/* Live Real-Time Rate Strip */}
                <div className="bg-neutral-50 dark:bg-neutral-800/80 border border-brand-800/20 p-4 mb-6 hover:border-brand-800/40 transition-colors">
                  <div className="flex items-center justify-between text-xs font-mono border-b border-neutral-200 dark:border-neutral-700 pb-2 mb-3">
                    <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{t.payment.baseRateText}</span>
                    </div>
                    <span className="font-bold text-brand-800 dark:text-brand-400">
                      1 e-CNY = {baseRate.toFixed(2)} IQD
                    </span>
                  </div>

                  {/* Calculator Input Box */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                        {t.payment.sendLabel}
                      </label>
                      {/* Tier Switcher with Hover effect */}
                      <div className="flex gap-1 p-0.5 bg-neutral-200 dark:bg-neutral-700 rounded-2xs">
                        <button
                          type="button"
                          onClick={() => setCalcType('RETAIL')}
                          className={cn(
                            "px-2 py-1 text-3xs font-bold uppercase transition-all duration-200 cursor-pointer",
                            calcType === 'RETAIL'
                              ? "bg-brand-800 text-white shadow-2xs"
                              : "text-neutral-600 dark:text-neutral-300 hover:text-brand-900"
                          )}
                        >
                          {t.payment.retailTab}
                        </button>
                        <button
                          type="button"
                          onClick={() => setCalcType('BUSINESS')}
                          className={cn(
                            "px-2 py-1 text-3xs font-bold uppercase transition-all duration-200 cursor-pointer",
                            calcType === 'BUSINESS'
                              ? "bg-brand-800 text-white shadow-2xs"
                              : "text-neutral-600 dark:text-neutral-300 hover:text-brand-900"
                          )}
                        >
                          {t.payment.businessTab}
                        </button>
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        type="number"
                        value={quickAmount}
                        onChange={e => setQuickAmount(e.target.value)}
                        className="w-full text-xl font-mono font-bold px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800 transition-colors"
                      />
                      <span className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-neutral-400">
                        IQD
                      </span>
                    </div>

                    {/* Result Output Card */}
                    <div className="p-4 bg-brand-50/60 dark:bg-brand-950/40 border border-brand-800/20 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-3xs font-mono uppercase text-brand-800 dark:text-brand-300 font-bold">
                          {t.payment.receiveLabel}
                        </span>
                        <span className="text-3xs font-mono text-neutral-500">
                          Fee: {feePercent}%
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-mono font-black text-brand-900 dark:text-neutral-100 tracking-tight flex items-baseline gap-1.5">
                        <span>¥</span>
                        <span>{netCny.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">e-CNY</span>
                      </div>
                      <p className="text-3xs font-mono text-neutral-500 dark:text-neutral-400 pt-1 border-t border-brand-800/10 mt-1">
                        {t.payment.feeNote}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Action Buttons with Polished Hover Effects */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOrderModalOpen(true)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer group"
                  >
                    <Coins size={15} />
                    <span>{t.payment.launchGatewayBtn}</span>
                    {isRtl ? (
                      <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                    ) : (
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsTrackerOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-brand-900 dark:text-neutral-100 font-bold text-xs uppercase tracking-wider transition-all duration-200 border border-neutral-300 dark:border-neutral-700 hover:border-brand-800/40 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>{t.payment.trackOrderBtn}</span>
                  </button>
                </div>

                {/* Settlement Highlights Badges */}
                <div className="grid grid-cols-2 gap-3 pt-5 mt-5 border-t border-neutral-200 dark:border-neutral-800 text-xs">
                  <div className="flex items-start gap-2 p-2 bg-neutral-50/80 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60">
                    <User size={15} className="text-brand-800 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold text-neutral-800 dark:text-neutral-200 text-xs">Retail & Tuition</strong>
                      <span className="text-3xs text-neutral-500">Fast wallet top-ups</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-neutral-50/80 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60">
                    <Building2 size={15} className="text-brand-800 dark:text-brand-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold text-neutral-800 dark:text-neutral-200 text-xs">Port & Trade</strong>
                      <span className="text-3xs text-neutral-500">0.35% institutional fee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* RIGHT HALF / PANEL: SOURCING, AUDITS & VERIFICATION       */}
          {/* ========================================================= */}
          {(activeTab === 'all' || activeTab === 'sourcing') && (
            <div className={cn(
              "space-y-6 transition-all min-w-0",
              activeTab === 'all' ? "lg:col-span-6" : "lg:col-span-12"
            )}>
              {/* Sourcing Panel Container */}
              <div className="bg-white dark:bg-neutral-900 border-2 border-brand-800 p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow duration-300">
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-brand-800/20 pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-sm bg-brand-800 text-white flex items-center justify-center shrink-0">
                      <Factory size={18} />
                    </div>
                    <div>
                      <span className="text-3xs font-mono font-bold uppercase tracking-widest text-brand-800 dark:text-brand-400 block">
                        {t.sourcing.eyebrow}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-brand-900 dark:text-neutral-100">
                        {t.sourcing.title}
                      </h3>
                    </div>
                  </div>

                  <span className="text-3xs font-mono font-bold px-2 py-1 bg-brand-50 dark:bg-brand-950/40 text-brand-800 dark:text-brand-400 border border-brand-800/30">
                    Beijing • Baghdad
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-serif text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  {t.sourcing.subtitle}
                </p>

                {/* 4 Service Pillars Grid with Institutional Polish & Hover Motion */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                  {pillars.map((pillar) => (
                    <motion.div
                      key={pillar.id}
                      onClick={() => setSelectedBenefit(pillar)}
                      whileHover={{ y: -3, transition: { duration: 0.18, ease: 'easeOut' } }}
                      whileTap={{ scale: 0.99 }}
                      className="p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/90 dark:border-neutral-700/80 hover:border-brand-800 dark:hover:border-brand-600 hover:bg-white dark:hover:bg-neutral-800 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between rounded-xs relative overflow-hidden text-start"
                    >
                      {/* Top Accent Line on hover */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-brand-800 transition-colors" />

                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <div className="w-8 h-8 bg-brand-800 text-white flex items-center justify-center rounded-2xs transition-transform duration-200 group-hover:scale-105 shadow-2xs">
                            <pillar.icon size={16} />
                          </div>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-brand-50 dark:bg-brand-950/60 text-brand-800 dark:text-brand-300 border border-brand-800/25 rounded-2xs inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-600 dark:bg-brand-500 animate-pulse" />
                            {pillar.tag}
                          </span>
                        </div>

                        <h4 className="font-bold text-xs sm:text-sm text-brand-900 dark:text-neutral-100 uppercase tracking-tight group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors mb-1.5">
                          {pillar.title}
                        </h4>

                        <p className="text-3xs sm:text-2xs font-serif text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-3">
                          {pillar.desc}
                        </p>

                        {/* Quick Micro-Metrics Strip */}
                        {pillar.metrics && pillar.metrics.length >= 2 && (
                          <div className="grid grid-cols-2 gap-1.5 py-1.5 px-2 bg-white/70 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-700/60 rounded-2xs text-[10px] font-mono text-neutral-600 dark:text-neutral-300">
                            <div className="truncate">
                              <span className="text-neutral-400 dark:text-neutral-500 block text-[9px] uppercase">{pillar.metrics[0]?.label}</span>
                              <span className="font-bold text-brand-900 dark:text-neutral-200">{pillar.metrics[0]?.value}</span>
                            </div>
                            <div className="truncate">
                              <span className="text-neutral-400 dark:text-neutral-500 block text-[9px] uppercase">
                                {pillar.metrics[pillar.metrics.length > 2 ? 2 : 1]?.label}
                              </span>
                              <span className="font-bold text-brand-900 dark:text-neutral-200">
                                {pillar.metrics[pillar.metrics.length > 2 ? 2 : 1]?.value}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-neutral-200/70 dark:border-neutral-700/70 flex items-center justify-between text-3xs font-mono font-bold text-brand-800 dark:text-brand-400 group-hover:text-brand-900 dark:group-hover:text-brand-300">
                        <span className="flex items-center gap-1.5">
                          <FileText size={11} />
                          <span>{isZh ? '查看完整300字细则与2026更新' : isAr ? 'تفاصيل البروتوكول الشامل (300+ كلمة)' : isCkb ? 'وردەکاری تەواوی ڕێکارەکان' : '300+ Word Detailed SOP & Updates'}</span>
                        </span>
                        <ChevronRight size={12} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Interactive Real Sourcing Form */}
                <div id="sourcing-inquiry-form" className="bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 p-4 sm:p-5">
                  <div className="border-b border-neutral-200 dark:border-neutral-700 pb-3 mb-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-brand-900 dark:text-neutral-100">
                      {t.sourcing.formTitle}
                    </h4>
                    <p className="text-3xs text-neutral-500 dark:text-neutral-400">
                      {t.sourcing.formDesc}
                    </p>
                  </div>

                  <AnimatePresence mode="wait">
                    {!submitSuccess ? (
                      <form onSubmit={handleSourcingSubmit} className="space-y-3 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-3xs font-mono uppercase text-neutral-600 dark:text-neutral-400 mb-1">
                              {t.sourcing.fields.name} *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.fullName}
                              onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                              className="w-full p-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800"
                            />
                          </div>

                          <div>
                            <label className="block text-3xs font-mono uppercase text-neutral-600 dark:text-neutral-400 mb-1">
                              {t.sourcing.fields.email} *
                            </label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={e => setFormData({ ...formData, email: e.target.value })}
                              className="w-full p-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-3xs font-mono uppercase text-neutral-600 dark:text-neutral-400 mb-1">
                              {t.sourcing.fields.company}
                            </label>
                            <input
                              type="text"
                              value={formData.company}
                              onChange={e => setFormData({ ...formData, company: e.target.value })}
                              className="w-full p-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800"
                            />
                          </div>

                          <div>
                            <label className="block text-3xs font-mono uppercase text-neutral-600 dark:text-neutral-400 mb-1">
                              {t.sourcing.fields.service} *
                            </label>
                            <select
                              value={formData.inquiryType}
                              onChange={e => setFormData({ ...formData, inquiryType: e.target.value })}
                              className="w-full p-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800"
                            >
                              {t.sourcing.services.map(srv => (
                                <option key={srv.id} value={srv.id}>{srv.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-3xs font-mono uppercase text-neutral-600 dark:text-neutral-400 mb-1">
                            {t.sourcing.fields.message} *
                          </label>
                          <textarea
                            required
                            rows={2}
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Specify quantities, specifications, target delivery date..."
                            className="w-full p-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800 resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-2.5 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-xs hover:shadow-md cursor-pointer disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>{t.sourcing.submittingBtn}</span>
                            </>
                          ) : (
                            <>
                              <Send size={14} className={isRtl ? 'rotate-180' : ''} />
                              <span>{t.sourcing.submitBtn}</span>
                            </>
                          )}
                        </button>
                      </form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-6 space-y-3"
                      >
                        <CheckCircle2 className="w-12 h-12 text-brand-800 dark:text-brand-400 mx-auto" />
                        <h5 className="text-base font-black text-brand-900 dark:text-neutral-100">
                          {t.sourcing.successTitle}
                        </h5>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                          {t.sourcing.successDesc}
                        </p>

                        <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 p-3 inline-block font-mono text-xs">
                          <span className="text-3xs text-neutral-500 uppercase block font-bold mb-0.5">
                            {t.sourcing.ticketLabel}
                          </span>
                          <span className="text-sm font-black text-brand-800 dark:text-brand-400">
                            {ticketRef}
                          </span>
                        </div>

                        <div>
                          <button
                            type="button"
                            onClick={() => { setSubmitSuccess(false); setFormData({ ...formData, message: '' }); }}
                            className="text-xs font-bold text-brand-800 dark:text-brand-400 hover:underline cursor-pointer"
                          >
                            {t.sourcing.newInquiryBtn}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal for Service Pillar Comprehensive 300+ Word Details & 2026 Updates */}
        <AnimatePresence>
          {selectedBenefit && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto"
              onClick={() => setSelectedBenefit(null)}
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 15 }}
                onClick={e => e.stopPropagation()}
                className="bg-black text-white border border-neutral-800 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col my-auto rounded-xs"
                dir={isRtl ? 'rtl' : 'ltr'}
              >
                {/* Deep clean black Close Button with pure white X letter */}
                <button
                  onClick={() => setSelectedBenefit(null)}
                  aria-label="Close"
                  className="absolute top-3.5 right-3.5 rtl:right-auto rtl:left-3.5 z-30 p-2 bg-black hover:bg-neutral-900 border border-neutral-800 rounded-xs transition-colors cursor-pointer flex items-center justify-center group"
                >
                  <X size={18} className="text-white group-hover:scale-110 transition-transform" />
                </button>

                {/* Sticky Modal Top Bar with deep clean black tone */}
                <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-xs border-b border-neutral-800/90 px-5 sm:px-7 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 pr-10 rtl:pr-0 rtl:pl-10">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-2 py-0.5 bg-neutral-900 text-brand-400 border border-brand-800/40 rounded-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                      {selectedBenefit.updateBadge}
                    </span>
                    <span className="hidden sm:inline-flex text-[10px] font-mono text-neutral-400 border-l border-neutral-800 pl-2 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-2">
                      {selectedBenefit.wordCount}+ Words • {selectedBenefit.readTime}
                    </span>
                  </div>
                </div>

                {/* Modal Body Content */}
                <div className="p-5 sm:p-7 space-y-6">
                  {/* Hero Title & Identity */}
                  <div className="flex items-start gap-3.5 pb-4 border-b border-neutral-800">
                    <div className="w-12 h-12 bg-neutral-900 border border-neutral-700 text-white flex items-center justify-center rounded-2xs shrink-0 shadow-xs mt-1">
                      {selectedBenefit.icon && <selectedBenefit.icon size={24} />}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-3xs font-mono uppercase tracking-widest text-brand-400 font-bold">
                          {isZh ? '中伊官方双边产业核验准则' : isAr ? 'المعيار المؤسسي للوكالة العراقية الصينية' : isCkb ? 'ستانداردی فەرمی ئاژانسی عێراق و چین' : 'ICA Institutional Operational Standard'}
                        </span>
                        <span className="text-3xs font-mono px-1.5 py-0.2 bg-neutral-900 text-neutral-400 border border-neutral-800">
                          {selectedBenefit.serviceCode}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {selectedBenefit.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-serif text-neutral-300 leading-relaxed pt-1">
                        {selectedBenefit.leadSummary}
                      </p>
                    </div>
                  </div>

                  {/* 4 Quantitative Key Metrics Grid */}
                  <div>
                    <h5 className="text-3xs font-mono uppercase tracking-wider text-neutral-400 font-bold mb-2">
                      {isZh ? '核心服务指标与量化保障' : isAr ? 'مؤشرات الأداء والضمانات التشغيلية' : isCkb ? 'مەرج و نیشاندەرە سەرەکییەکان' : 'Key Operational & Performance Metrics'}
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {selectedBenefit.metrics.map((metric, idx) => (
                        <div key={idx} className="p-2.5 bg-neutral-900/80 border border-neutral-800 rounded-2xs">
                          <span className="text-[10px] font-mono text-neutral-400 uppercase block truncate">
                            {metric.label}
                          </span>
                          <span className="text-xs sm:text-sm font-black text-white block my-0.5 truncate">
                            {metric.value}
                          </span>
                          <span className="text-3xs text-neutral-400 block truncate">
                            {metric.sub}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Full 300+ Word Operational Brief */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-200 flex items-center gap-1.5">
                        <FileText size={14} className="text-brand-400" />
                        <span>{isZh ? '完整业务细则与实施规程 (SOP)' : isAr ? 'الدليل التشغيلي وبروتوكول الفحص المعتمد' : isCkb ? 'ڕێکاری فەرمی و وردەکاری تەواو' : 'Comprehensive Operational Specification & SOP'}</span>
                      </h4>
                      <span className="text-3xs font-mono text-brand-300 font-bold bg-neutral-900 px-2 py-0.5 border border-neutral-800">
                        {selectedBenefit.wordCount}+ {isZh ? '字官方详述' : isAr ? 'كلمة موثقة' : isCkb ? 'وشە' : 'Words'}
                      </span>
                    </div>

                    <div className="space-y-3 font-serif text-xs sm:text-sm leading-relaxed text-neutral-300">
                      {selectedBenefit.comprehensiveSpecification.map((para, pIdx) => (
                        <p key={pIdx} className="text-justify">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* 2026 Bilateral Service Updates & Standards Card */}
                  <div className="p-4 bg-neutral-900/90 border border-neutral-800 space-y-2.5 rounded-2xs">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-brand-400 shrink-0" />
                      <h5 className="font-bold text-xs uppercase tracking-wide text-white">
                        {isZh ? '2026中伊双边最新监管与服务升级' : isAr ? 'تحديثات البروتوكول والخدمات المشتركة لعام 2026' : isCkb ? 'نوێکارییەکانی سیستەم و ڕێکارەکان بۆ ٢٠٢٦' : '2026 Bilateral Regulatory & Service Upgrades'}
                      </h5>
                    </div>

                    <ul className="space-y-2 text-xs text-neutral-300">
                      {selectedBenefit.updates2026.map((update, uIdx) => (
                        <li key={uIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0 mt-1.5" />
                          <span className="font-sans text-3xs sm:text-xs leading-relaxed">{update}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Official Deliverables Checklist */}
                  <div className="space-y-2.5">
                    <h5 className="text-3xs font-mono uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-brand-400" />
                      <span>{isZh ? '客户交付凭据清单' : isAr ? 'المخرجات والمستندات الرسمية المسلمة للعميل' : isCkb ? 'بەڵگەنامە و دەستکەوتە فەرمییەکان' : 'Official Client Verification Deliverables'}</span>
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-3xs sm:text-xs">
                      {selectedBenefit.deliverables.map((deliv, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 p-2.5 bg-neutral-900/60 border border-neutral-800 rounded-2xs">
                          <Check size={14} className="text-brand-400 shrink-0 mt-0.5" />
                          <span className="font-sans text-neutral-200">{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Regulatory Badges */}
                  <div className="pt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-3xs font-mono text-neutral-400 mr-1">
                      {isZh ? '执行标准:' : isAr ? 'المعايير المعتمدة:' : isCkb ? 'ستانداردەکان:' : 'Standards:'}
                    </span>
                    {selectedBenefit.standards.map((std, sIdx) => (
                      <span key={sIdx} className="text-[10px] font-mono px-2 py-0.5 bg-neutral-900 text-neutral-300 border border-neutral-800 rounded-2xs">
                        {std}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sticky Action Footer with deep clean black tone */}
                <div className="sticky bottom-0 z-10 bg-black/95 backdrop-blur-xs border-t border-neutral-800 px-5 sm:px-7 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-3xs font-mono text-neutral-400 text-center sm:text-left rtl:sm:text-right">
                    <span>Beijing: beijing@iraq-china.agency</span>
                    <span className="mx-2">•</span>
                    <span>Baghdad: baghdad@iraq-china.agency</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedBenefit(null)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-black hover:bg-neutral-900 border border-neutral-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      {isZh ? '关闭' : isAr ? 'إغلاق' : isCkb ? 'داخستن' : 'Close'}
                    </button>

                    <button
                      onClick={() => handleBookServiceFromModal(selectedBenefit.serviceCode)}
                      className="flex-1 sm:flex-none px-5 py-2 bg-brand-800 hover:bg-brand-700 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer border border-brand-700"
                    >
                      <Send size={13} className={isRtl ? 'rotate-180' : ''} />
                      <span>
                        {isZh ? '立即申请本项服务' : isAr ? 'طلب هذه الخدمة الآن' : isCkb ? 'داواکردنی ئەم خزمەتگوزارییە' : 'Request This Service Now'}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Bilateral Order Creation Modal */}
        <PaymentOrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          initialData={{
            orderType: calcType,
            direction: 'IQD_TO_ECNY',
            sourceAmount: num > 0 ? num : 1000000,
            targetAmount: netCny > 0 ? netCny : 0,
            exchangeRate: askRate || 189.20,
            feeAmount: fee || 0,
            feePercent: feePercent || 0.75,
          }}
          lang={lang}
          onOrderCreated={(order) => {
            setIsOrderModalOpen(false);
            setSelectedReceiptOrder(order);
            setIsReceiptOpen(true);
          }}
        />

        {/* Bilateral Payment Receipt Modal */}
        <PaymentReceiptModal
          isOpen={isReceiptOpen}
          onClose={() => setIsReceiptOpen(false)}
          order={selectedReceiptOrder}
          lang={lang}
        />

        {/* Real-time Sovereign Payment Tracker Modal */}
        <AnimatePresence>
          {isTrackerOpen && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
              onClick={() => setIsTrackerOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                onClick={e => e.stopPropagation()}
                className="bg-white dark:bg-neutral-900 border-t-4 border-brand-800 p-6 sm:p-8 max-w-2xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto"
                dir={isRtl ? 'rtl' : 'ltr'}
              >
                <button
                  onClick={() => setIsTrackerOpen(false)}
                  className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100 p-1 cursor-pointer"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="w-10 h-10 bg-brand-800 text-white flex items-center justify-center rounded-sm shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-brand-900 dark:text-neutral-100 uppercase">
                      {t.payment.trackOrderBtn}
                    </h4>
                    <span className="text-3xs font-mono uppercase tracking-widest text-brand-800 dark:text-brand-400 font-bold">
                      mBridge & CIPS Sovereign Tracking System
                    </span>
                  </div>
                </div>

                <PaymentTracker
                  initialRef={trackerInitialRef}
                  lang={lang}
                  onOpenReceipt={(order) => {
                    setSelectedReceiptOrder(order);
                    setIsReceiptOpen(true);
                  }}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </ErrorBoundary>
  );
}
export default PaymentAndSourcingSection;
