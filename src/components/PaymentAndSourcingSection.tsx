import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Locale, PaymentExchangeRate } from '../types';
import { 
  Coins, ArrowRightLeft, ShieldCheck, Zap, Building2, User, 
  ArrowRight, ArrowLeft, TrendingUp, TrendingDown, CheckCircle2, 
  Factory, Search, Ship, Send, X, ExternalLink, Layers, Check,
  Sparkles, FileText, ChevronRight
} from 'lucide-react';
import { ErrorBoundary } from './ErrorBoundary';
import { cn } from '../lib/utils';

interface Props {
  lang: Locale;
}

export function PaymentAndSourcingSection({ lang }: Props) {
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';
  const isRtl = isAr || isCkb;

  // Active View Tab: 'all' | 'settlement' | 'sourcing'
  const [activeTab, setActiveTab] = useState<'all' | 'settlement' | 'sourcing'>('all');

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
  const [selectedBenefit, setSelectedBenefit] = useState<any | null>(null);

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
    pillars: [
      {
        icon: Factory,
        id: 'audits',
        title: isZh ? '原厂合规审计' : isAr ? 'تدقيق المصانع' : isCkb ? 'پشکنینی کارگەکان' : 'Factory Audits',
        desc: isZh ? '中伊通讯社专业工程团队深入中国制造车间，实地审查合规、环保、产能与技术资质。' : isAr ? 'زيارات تفتيش ميدانية لمصانع الصين للتحقق من الموثوقية والطاقة الإنتاجية والامتثال القانوني.' : isCkb ? 'سەردانی مەیدانی بۆ کارگە چینییەکان بۆ دڵنیابوون لە توانای بەرهەمهێنان و متمانە.' : 'On-site technical evaluation of production lines, legal compliance, and export clearances across China.',
        detail: isZh 
          ? '依托中伊通讯社驻京与驻沪常设联络处，我们为伊拉克进口商提供独立第三方在厂实地勘验。由高级质检工程师进驻生产基地，核实企业营业执照、真实注册资本、生产线实效运转负荷、排污环评许可及出口信用评级，出具双语权威实地验厂报告，从根源排除贸易皮包公司与二道贩子。'
          : isAr
          ? 'تمثل الوكالة العراقية الصينية السلطة المعتمدة لإجراء التدقيق الميداني الشامل للمصانع في مختلف المقاطعات الصينية. تقوم فرقنا الهندسية المتخصصة بفحص خطوط الإنتاج والشهادات القانونية وتدقيق الملاءة المالية، وتزويد المستورد العراقي بتقارير رسمية تفصيلية تدحض تماماً مخاطر الوسطاء غير الموثوقين.'
          : 'ICA operates official bilateral auditing teams deployed directly into Chinese industrial zones. Our certified inspectors review factory legitimacy, production bottlenecks, ISO standards, and legal clearances to ensure complete commercial peace of mind.'
      },
      {
        icon: Search,
        id: 'sourcing',
        title: isZh ? '一手货源直采' : isAr ? 'توريد البضائع والآلات' : isCkb ? 'دابینکردنی بەرهەم' : 'Product Sourcing',
        desc: isZh ? '直接连通源头产业带与国家级产业集群，以一手出厂批发价采购重型工程设备、光伏与工业原料。' : isAr ? 'وصول مباشر إلى كبرى المجمعات الصناعية الصينية لشراء الآلات ومعدات الطاقة والمواد الخام بأسعار المصنع.' : isCkb ? 'دەستڕاگەیشتنی ڕاستەوخۆ بە کارگە سەرەکییەکان بۆ کڕینی ئامێری قورس و پێداویستییەکان بە نرخی کارگە.' : 'Direct access to premier Chinese manufacturing clusters for industrial machinery, solar systems, and raw materials at wholesale rates.',
        detail: isZh
          ? '杜绝传统跨国贸易中多层经销商层层加价。中伊通讯社采购专席直接调取中国机械工业联合会、光伏行业协会及各大商会骨干名录，根据伊拉克项目技术规范开展闭环竞价招标，确保每一美元采购支出均落实于优质出厂硬件，助力伊拉克战后重建与工业升级。'
          : isAr
          ? 'نلغي هوامش الربح المتراكمة للموزعين والوسطاء من خلال ربط المستوردين العراقيين بمصادر الإنتاج الأولية مباشرة في قطاعات الآلات الثقيلة، محطات الطاقة المتجددة، ومواد البناء، مع تفاوض مؤسسي يحقق أفضل الأسعار التعاقدية.'
          : 'Cut out third-party middle-men. ICA matches Iraqi commercial specifications directly with verified Tier-1 Chinese manufacturing powerhouses, negotiating competitive wholesale pricing tailored to project requirements.'
      },
      {
        icon: ShieldCheck,
        id: 'qc',
        title: isZh ? '出港质检 (QC)' : isAr ? 'مراقبة الجودة والفحص' : isCkb ? 'کۆنترۆڵی جۆرایەتی' : 'Quality Control',
        desc: isZh ? '装箱前多重盲测抽检与耐候性能测试，完全杜绝缺陷品与假冒伪劣工业品出海。' : isAr ? 'بروتوكولات فحص صارمة متعددة المراحل قبل شحن الحاويات للقضاء على أي عيوب تصنيعية.' : isCkb ? 'پشکنینی توند پێش بارکردن بۆ ڕێگریکردن لە هەر کەمکوڕییەک یان کاڵای خراپ.' : 'Rigorous multi-point pre-shipment inspections and container sealing tests before maritime departure.',
        detail: isZh
          ? '在集装箱离港前，质检人员依照伊拉克中央标准化与质量控制局（COSQC）标准以及国际ISO/ASTM规范，执行严格的拆包全数/抽检测试。包括耐高温风沙环境模拟测试、电子电气元器件耐压测试及机械抗疲劳度核验，并提供全程录像与带GPS时间戳的官方质检凭证。'
          : isAr
          ? 'تطبق وكالتنا فحوصات صارمة متوافقة مع متطلبات الجهاز المركزي للتقييس والسيطرة النوعية العراقي (COSQC). يتم اختبار العينات عشوائياً وتوثيق الفحص قبل إغلاق الحاويات، مما يضمن وصول بضائع مطابقة بنسبة 100% للمواصفات.'
          : 'Certified QA engineers conduct pre-containerization stress tests aligned with Iraqi Central Organization for Standardization and Quality Control (COSQC) standards.'
      },
      {
        icon: Ship,
        id: 'logistics',
        title: isZh ? '航运与通关' : isAr ? 'الشحن والتخليص الجمركي' : isCkb ? 'گواستنەوە و گومرگ' : 'Logistics & Clearance',
        desc: isZh ? '直通中国各大海港至伊拉克乌姆盖斯尔港与巴士拉港的全程航线，打通保税仓储与绿色清关。' : isAr ? 'إدارة لوجستية متكاملة من موانئ الصين إلى ميناء أم قصر والبصرة مع تخليص جمركي معجل.' : isCkb ? 'گواستنەوەی دەریایی لە بەندەرەکانی چینەوە بۆ بەندەری ئوم قەسر لە بەسرە بە پاککردنەوەی خێرای گومرگی.' : 'End-to-end maritime freight from Shanghai/Ningbo to Umm Qasr Port with expedited customs processing.',
        detail: isZh
          ? '中伊通讯社与中远海运（COSCO）、中外运及伊拉克交通部港口总局深度合作，打造中伊专属集装箱班轮快线。提供提货、装箱、海运追踪、乌姆盖斯尔港通关文件一站式审签及内陆保税车队护送，实现从中国车间到巴格达/埃尔比勒库房的全流程数字化追踪。'
          : isAr
          ? 'تنسيق لوجستي رفيع المستوى بالتعاون مع كبرى خطوط الشحن العالمية وسلطات الموانئ العراقية لتأمين ممرات شحن مخصصة تضمن تسريع إجراءات التفريغ والتخليص الجمركي في ميناء أم قصر دون غرامات تأخير.'
          : 'Direct maritime corridor management coordinating between Chinese export terminals and Umm Qasr port authorities, eliminating demurrage charges and bureaucratic delays.'
      }
    ]
  };

  return (
    <ErrorBoundary inline lang={lang} title="Payment & Sourcing Services">
      <section 
        id="settlement-sourcing" 
        className="w-full bg-white dark:bg-neutral-900 border-t-4 border-brand-800 p-4 sm:p-6 md:p-10 my-8 animate-fadeIn shadow-xs"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================= */}
          {/* LEFT HALF / PANEL: CURRENCY SETTLEMENT & PSP (IQD ⇄ e-CNY) */}
          {/* ========================================================= */}
          {(activeTab === 'all' || activeTab === 'settlement') && (
            <div className={cn(
              "space-y-6 transition-all",
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
                              ? "bg-emerald-700 text-white shadow-2xs"
                              : "text-neutral-600 dark:text-neutral-300 hover:text-emerald-900"
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
                  <Link
                    to={`/${lang}/payments`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer group"
                  >
                    <Coins size={15} />
                    <span>{t.payment.launchGatewayBtn}</span>
                    {isRtl ? (
                      <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                    ) : (
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    )}
                  </Link>

                  <Link
                    to={`/${lang}/payments?tab=tracker`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-brand-900 dark:text-neutral-100 font-bold text-xs uppercase tracking-wider transition-all duration-200 border border-neutral-300 dark:border-neutral-700 hover:border-brand-800/40 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>{t.payment.trackOrderBtn}</span>
                  </Link>
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
                    <Building2 size={15} className="text-emerald-700 shrink-0 mt-0.5" />
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
              "space-y-6 transition-all",
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

                {/* 4 Service Pillars Grid with Hover Effects */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {t.pillars.map(pillar => (
                    <div
                      key={pillar.id}
                      onClick={() => setSelectedBenefit(pillar)}
                      className="p-3.5 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 hover:border-brand-800 hover:bg-white dark:hover:bg-neutral-800 hover:shadow-xs transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-7 h-7 bg-brand-800 text-white flex items-center justify-center rounded-2xs mb-2 transition-transform duration-200 group-hover:scale-108">
                          <pillar.icon size={15} />
                        </div>
                        <h4 className="font-bold text-xs text-brand-900 dark:text-neutral-100 uppercase tracking-tight group-hover:text-brand-800 transition-colors mb-1">
                          {pillar.title}
                        </h4>
                        <p className="text-3xs font-serif text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                      <div className="mt-2 text-3xs font-mono font-bold text-brand-800 dark:text-brand-400 flex items-center gap-1 group-hover:underline">
                        <span>Details</span>
                        <ChevronRight size={10} className="rtl:rotate-180" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive Real Sourcing Form */}
                <div className="bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 p-4 sm:p-5">
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
                        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
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

        {/* Modal for Service Pillar Details */}
        <AnimatePresence>
          {selectedBenefit && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
              onClick={() => setSelectedBenefit(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={e => e.stopPropagation()}
                className="bg-white dark:bg-neutral-900 border-t-4 border-brand-800 p-6 sm:p-8 max-w-xl w-full relative shadow-2xl space-y-5"
                dir={isRtl ? 'rtl' : 'ltr'}
              >
                <button
                  onClick={() => setSelectedBenefit(null)}
                  className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100"
                >
                  <X size={20} />
                </button>

                <div className="flex items-center gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="w-12 h-12 bg-brand-800 text-white flex items-center justify-center rounded-sm shrink-0">
                    {selectedBenefit.icon && <selectedBenefit.icon size={24} />}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-brand-900 dark:text-neutral-100">
                      {selectedBenefit.title}
                    </h4>
                    <span className="text-3xs font-mono uppercase tracking-widest text-brand-800 dark:text-brand-400 font-bold">
                      ICA Institutional Inspection Standard
                    </span>
                  </div>
                </div>

                <div className="font-serif text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {selectedBenefit.detail || selectedBenefit.desc}
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
                  <button
                    onClick={() => setSelectedBenefit(null)}
                    className="px-5 py-2 bg-brand-800 hover:bg-brand-900 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </ErrorBoundary>
  );
}
export default PaymentAndSourcingSection;
