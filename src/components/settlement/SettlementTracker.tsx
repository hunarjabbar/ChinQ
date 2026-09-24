import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Download, 
  RefreshCw, 
  ShieldCheck, 
  Landmark, 
  ArrowRight, 
  ChevronRight,
  Play,
  FileText,
  AlertCircle
} from 'lucide-react';
import { Locale } from '../../types';
import { SettlementRecord, TrackerStageId, TrackerStage } from '../../types/settlement';
import { getSettlementTranslation } from '../../locales/settlementTranslations';
import { generateStatusPdf } from '../../lib/settlement/pdf';

interface Props {
  lang: Locale;
  initialRef?: string;
  onRefresh?: () => void;
}

const DEFAULT_STAGES: TrackerStage[] = [
  {
    id: 1,
    name: {
      en: 'Inquiry Received',
      ar: 'تم استلام طلب التسوية',
      zh: '已接收结算申请',
      ckb: 'داواکاری وەرگیراوە'
    },
    description: {
      en: 'Trade contract & entity registration recorded on sovereign ledger.',
      ar: 'تم تسجيل العقد التجاري وهوية المؤسسة في السجل السيادي.',
      zh: '贸易合同及主体资质已录入双边主权备案系统。',
      ckb: 'گرێبەستی بازرگانی لە سیستەمی فەرمی تۆمارکرا.'
    },
    status: 'completed',
    timestamp: '2026-09-24 08:30:00'
  },
  {
    id: 2,
    name: {
      en: 'KYC & Compliance Review',
      ar: 'فحص الامتثال واعرف عميلك',
      zh: 'KYC与反洗钱双向合规审查',
      ckb: 'وردبینی پابەندبوون و KYC'
    },
    description: {
      en: 'Dual AML screening under Iraqi Law 39 and PBoC anti-money laundering regulations.',
      ar: 'فحص الحظر والعقوبات وقانون مكافحة غسل الأموال رقم ٣٩ لسنة ٢٠١٥.',
      zh: '对照伊拉克第39号反洗钱法与中国人民银行监管名单双向核验。',
      ckb: 'پشکنینی دژە سپیکردنەوە بەپێی یاسای ٣٩ی ٢٠١٥.'
    },
    status: 'completed',
    timestamp: '2026-09-24 09:15:00'
  },
  {
    id: 3,
    name: {
      en: 'Documentation Verification',
      ar: 'تدقيق الوثائق والفواتير',
      zh: '单证审核与报关批文比对',
      ckb: 'پشکنینی بەڵگەنامە بازرگانییەکان'
    },
    description: {
      en: 'Commercial invoice, Bill of Lading, and customs clearance declarations validated.',
      ar: 'تدقيق الفاتورة التجارية، بوليصة الشحن، وإقرار التخليص الجمركي.',
      zh: '商业发票、海运提单（B/L）与原产地证明比对完毕。',
      ckb: 'فاکتۆری بازرگانی و بەڵگەنامەی گومرگی پشتڕاستکرانەوە.'
    },
    status: 'completed',
    timestamp: '2026-09-24 10:45:00'
  },
  {
    id: 4,
    name: {
      en: 'Banking Instruction Prepared',
      ar: 'إعداد التعليمات المصرفية',
      zh: '开立双边本币清算指令',
      ckb: 'ئامادەکردنی فەرمانی بانکی'
    },
    description: {
      en: 'Cryptographic settlement ticket generated with locked exchange rate.',
      ar: 'توليد أمر التحويل المشفر وتثبيت سعر الصرف السيادي.',
      zh: '锁定双边参考汇率，生成ISO 20022标准清算指令报文。',
      ckb: 'تۆمارکردنی فەرمانی پارەدان بە نرخی بەستراو.'
    },
    status: 'in_progress',
    timestamp: '2026-09-24 11:20:00',
    estimatedHoursRemaining: 6
  },
  {
    id: 5,
    name: {
      en: 'Transmitted to Banking Partner',
      ar: 'الإرسال للمصرف الشريك',
      zh: '指令报文传输至清算行',
      ckb: 'نێردرا بۆ بانکی هاوبەش'
    },
    description: {
      en: 'Dispatched via host-to-host channel to CBI designated settlement bank.',
      ar: 'إرسال التعليمات عبر القناة المباشرة للمصرف العراقي المنفذ المعتمد.',
      zh: '通过专线直连通道划转至伊拉克央行指定承办清算行。',
      ckb: 'ناردنی فەرمان بۆ بانکی دەستنیشانکراوی جێبەجێکار.'
    },
    status: 'pending'
  },
  {
    id: 6,
    name: {
      en: 'Settlement in Progress',
      ar: 'التسوية قيد التنفيذ',
      zh: '银行间直接清算执行中',
      ckb: 'پاکتاوی بانکی لە کاردایە'
    },
    description: {
      en: 'Interbank ledger matching and direct IQD ⇄ RMB conversion without third currency.',
      ar: 'مطابقة القيود المصرفية وتنفيذ مقاصة الدينار واليوان دون وسيط.',
      zh: '伊拉克第纳尔借记与离岸/在岸人民币贷记对账执行。',
      ckb: 'ئاڵوگۆڕی ڕاستەوخۆی باڵانسەکان بەبێ دراوی سێیەم.'
    },
    status: 'pending'
  },
  {
    id: 7,
    name: {
      en: 'Settlement Executed',
      ar: 'تم تنفيذ التسوية بنجاح',
      zh: '本币清算资金划转交割',
      ckb: 'پاکتاو بە سەرکەوتوویی جێبەجێ کرا'
    },
    description: {
      en: 'Beneficiary account credited in China with full net parity value.',
      ar: 'تم قيد المبلغ في حساب المستفيد بالصين بكامل القيمة المستحقة.',
      zh: '受款企业中国境内账户全额到账并完成涉外收支申报。',
      ckb: 'پارەکە بە تەواوی چووە سەر هەژماری وەرگر لە چین.'
    },
    status: 'pending'
  },
  {
    id: 8,
    name: {
      en: 'Confirmed & Closed',
      ar: 'المعاملة مؤكدة ومغلقة',
      zh: '归档并颁发双边清算凭证',
      ckb: 'مامەڵە تەواو و ئەرشیف کرا'
    },
    description: {
      en: 'Cryptographic proof issued and filed with Central Bank oversight portal.',
      ar: 'إصدار شهادة التسوية المشفرة وإيداعها في بوابة الرقابة المصرفية.',
      zh: '生成主权级不可篡改电子结汇核销凭证，全流程闭环。',
      ckb: 'دەرکردنی بڕوانامەی ئەلیکترۆنی کۆتایی.'
    },
    status: 'pending'
  }
];

export function SettlementTracker({ lang, initialRef = 'SETTLE-2026-000123', onRefresh }: Props) {
  const [searchRef, setSearchRef] = useState(initialRef);
  const [activeRef, setActiveRef] = useState(initialRef);
  const [currentStage, setCurrentStage] = useState<TrackerStageId>(4);
  const [stages, setStages] = useState<TrackerStage[]>(DEFAULT_STAGES);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [record, setRecord] = useState<SettlementRecord | null>(null);

  const t = (key: string) => getSettlementTranslation(lang, key);
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';

  // Construct active record state
  useEffect(() => {
    setRecord({
      referenceId: activeRef,
      createdAt: '2026-09-24T08:30:00Z',
      updatedAt: '2026-09-24T11:20:00Z',
      direction: 'IQD_TO_RMB',
      settlementType: 'TRADE_GOODS',
      sourceAmount: 125000000,
      sourceCurrency: 'IQD',
      targetAmount: 684931.50,
      targetCurrency: 'RMB',
      exchangeRate: 182.50,
      avoidedFees: {
        usdSpreadAmount: 38626,
        intermediaryFee: 8500,
        correspondentFee: 6200,
        totalSaved: 53326,
        savingsPercent: 7.2
      },
      payer: {
        organizationName: 'Baghdad National Electronics Trading Co.',
        contactPerson: 'Mustafa Al-Hashimi',
        email: 'trade@baghdad-elec.iq',
        phone: '+964 780 123 4567',
        country: 'Iraq',
        taxRegNumber: 'IQ-TIN-889021'
      },
      beneficiary: {
        name: 'Shenzhen Huaxin Optoelectronics Ltd.',
        country: 'China',
        bankName: 'Bank of China (Shenzhen Futian Sub-Branch)',
        swiftBic: 'BKCHCNBJ400',
        accountNumber: '6217 •••• •••• 4490'
      },
      compliance: {
        kycStatus: 'verified',
        cbiApproved: true,
        pbocApproved: true,
        cipsTracked: true,
        sanctionsScreened: true
      },
      currentStage: currentStage,
      stages: stages,
      estimatedSettlementDate: '2026-09-25 16:00 UTC',
      executingBank: 'Trade Bank of Iraq (TBI) • Direct Yuan Clearing Unit',
      txHash: '0x9d4a82c16e78b90124cfa7b301d9e4a8c2019487'
    });
  }, [activeRef, currentStage, stages]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchRef.trim()) {
      setActiveRef(searchRef.trim().toUpperCase());
    }
  };

  const refreshStatus = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/settlement/tracker/${encodeURIComponent(activeRef)}`);
      if (res.ok) {
        const data = await res.json();
        setCurrentStage(data.currentStage);
        setStages(data.stages);
      }
    } catch {
      // Fallback: keep mock
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      refreshStatus();
    }, 30000);
    return () => clearInterval(timer);
  }, [activeRef]);

  // Demo advance stage capability
  const advanceDemoStage = () => {
    const nextStage = (currentStage >= 8 ? 1 : (currentStage + 1)) as TrackerStageId;
    setCurrentStage(nextStage);
    setStages(prev => prev.map(s => {
      if (s.id < nextStage) {
        return { ...s, status: 'completed' };
      } else if (s.id === nextStage) {
        return { ...s, status: 'in_progress', timestamp: new Date().toLocaleTimeString() };
      } else {
        return { ...s, status: 'pending' };
      }
    }));
  };

  const progressPercent = Math.round(((currentStage - 0.5) / 8) * 100);

  const handleDownloadPdf = () => {
    if (record) {
      generateStatusPdf(record);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-md p-5 sm:p-8 space-y-8">
      
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-[#C8102E] text-[11px] font-black uppercase tracking-wider mb-2">
            <ShieldCheck size={13} />
            <span>ISO 20022 & CIPS Clearing Verification</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            {t('settlement.tracker.title')}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
            {t('settlement.tracker.subtitle')}
          </p>
        </div>

        {/* Reference Search Input */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            value={searchRef}
            onChange={(e) => setSearchRef(e.target.value)}
            placeholder={t('settlement.tracker.inputPlaceholder')}
            className="px-4 py-2.5 rounded-xl border border-gray-300 font-mono text-xs uppercase font-bold focus:outline-none focus:border-[#C8102E] w-full md:w-64"
          />
          <button
            type="submit"
            className="pay-btn-primary px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap shadow-xs"
          >
            {t('settlement.tracker.trackBtn')}
          </button>
        </form>
      </div>

      {/* Active Stage Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-50 via-white to-red-50/40 border border-red-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C8102E] text-white flex items-center justify-center font-mono font-black text-lg shadow-md shrink-0">
            {currentStage}/8
          </div>
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-[#991B1B]">
              {t('settlement.tracker.stage')}
            </div>
            <div className="text-base sm:text-lg font-black text-gray-900">
              {stages[currentStage - 1]?.name[lang] || stages[currentStage - 1]?.name.en}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              {stages[currentStage - 1]?.description[lang] || stages[currentStage - 1]?.description.en}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={refreshStatus}
            disabled={isRefreshing}
            className="pay-btn-secondary px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            title="Refresh Milestone Status"
          >
            <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-[#C8102E]' : ''} />
            <span>{isAr ? 'تحديث' : isZh ? '刷新' : isCkb ? 'نوێکردنەوە' : 'Refresh'}</span>
          </button>

          <button
            onClick={advanceDemoStage}
            className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Advance Stage (Verification Demo)"
          >
            <Play size={13} className="text-[#C8102E]" />
            <span>Advance Stage</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            className="pay-btn-primary px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download size={13} />
            <span>PDF Dossier</span>
          </button>
        </div>
      </div>

      {/* Progress Bar (Overall percentage) */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-gray-500">Bilateral Clearance Velocity</span>
          <span className="text-[#C8102E] font-mono">{progressPercent}% Completed</span>
        </div>
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#C8102E] rounded-full transition-all duration-500" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Visual Stepper: Horizontal on desktop, Vertical on mobile */}
      <div className="pt-4">
        
        {/* Desktop Stepper (>768px) */}
        <div className="hidden lg:grid grid-cols-8 gap-2 relative">
          
          {/* Continuous Connecting Line */}
          <div className="absolute top-5 inset-x-6 h-0.5 bg-gray-200 -z-0"></div>
          
          {stages.map((st) => {
            const isCompleted = st.id < currentStage;
            const isActive = st.id === currentStage;
            const isPending = st.id > currentStage;

            return (
              <div 
                key={st.id} 
                className="flex flex-col items-center text-center relative z-10 space-y-2.5 group"
                aria-current={isActive ? 'step' : undefined}
              >
                {/* Node Circle */}
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : isActive 
                      ? 'bg-[#C8102E] text-white animate-stepper-pulse ring-4 ring-red-100' 
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={16} /> : <span>{st.id}</span>}
                </div>

                {/* Stage Title */}
                <div>
                  <div className={`text-[11px] font-black uppercase tracking-tight leading-snug line-clamp-2 ${
                    isActive ? 'text-[#C8102E]' : isCompleted ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {st.name[lang] || st.name.en}
                  </div>
                  {st.timestamp && (
                    <div className="text-[9px] text-gray-400 font-mono mt-0.5">
                      {st.timestamp.split(' ')[1]}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Stepper (Stacked / Vertical) */}
        <div className="lg:hidden space-y-4 relative border-s-2 border-gray-200 ms-4 ps-6">
          {stages.map((st) => {
            const isCompleted = st.id < currentStage;
            const isActive = st.id === currentStage;

            return (
              <div key={st.id} className="relative pb-2">
                {/* Marker on the line */}
                <div 
                  className={`absolute -start-[35px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                    isCompleted 
                      ? 'bg-emerald-600 text-white' 
                      : isActive 
                      ? 'bg-[#C8102E] text-white animate-stepper-pulse ring-4 ring-red-100' 
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={14} /> : <span>{st.id}</span>}
                </div>

                <div className="text-xs font-black uppercase text-gray-900">
                  {st.name[lang] || st.name.en}
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                  {st.description[lang] || st.description.en}
                </div>
                {st.timestamp && (
                  <div className="text-[10px] text-gray-400 font-mono mt-1">
                    Timestamp: {st.timestamp}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Settlement Summary Panel */}
      {record && (
        <div className="border border-gray-200 rounded-2xl p-5 sm:p-6 bg-gray-50/60 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-3">
            <div className="flex items-center gap-2">
              <Landmark size={18} className="text-[#C8102E]" />
              <span className="text-xs font-black uppercase tracking-wider text-gray-800">
                Official Transaction Summary
              </span>
            </div>
            <span className="font-mono font-bold text-xs text-[#C8102E]">
              {record.referenceId}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-white rounded-xl border border-gray-200">
              <span className="text-[10px] text-gray-400 uppercase block font-bold">Source Capital</span>
              <span className="font-mono font-bold text-gray-900 mt-0.5 block">
                {record.sourceAmount.toLocaleString()} {record.sourceCurrency}
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-gray-200">
              <span className="text-[10px] text-gray-400 uppercase block font-bold">Target Credited</span>
              <span className="font-mono font-bold text-emerald-700 mt-0.5 block">
                {record.targetAmount.toLocaleString()} {record.targetCurrency}
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-gray-200">
              <span className="text-[10px] text-gray-400 uppercase block font-bold">Payer Entity</span>
              <span className="font-bold text-gray-800 truncate block mt-0.5" title={record.payer.organizationName}>
                {record.payer.organizationName}
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-gray-200">
              <span className="text-[10px] text-gray-400 uppercase block font-bold">Beneficiary Bank</span>
              <span className="font-bold text-gray-800 truncate block mt-0.5" title={record.beneficiary.bankName}>
                {record.beneficiary.bankName}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-500 pt-2 border-t border-gray-200">
            <span>Executing Partner: <strong className="text-gray-700">{record.executingBank}</strong></span>
            <span>Est. Settlement Target: <strong className="text-gray-700">{record.estimatedSettlementDate}</strong></span>
          </div>
        </div>
      )}

    </div>
  );
}
