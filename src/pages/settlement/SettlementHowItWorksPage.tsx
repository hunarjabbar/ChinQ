import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Landmark, 
  ArrowRightLeft, 
  FileCheck,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Locale } from '../../types';
import { SettlementLayout } from '../../components/settlement/SettlementLayout';
import { getSettlementTranslation } from '../../locales/settlementTranslations';

export function SettlementHowItWorksPage() {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const lang = (paramLang === 'ck' ? 'ckb' : paramLang || 'en') as Locale;
  const t = (key: string) => getSettlementTranslation(lang, key);
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';

  const steps = [
    {
      num: '01',
      title: isAr ? 'تقديم طلب المعاملة' : isZh ? '提交单证与结算申请' : isCkb ? 'پێشکەشکردنی داواکاری' : 'Inquiry Submission',
      desc: isAr 
        ? 'يقوم المستورد أو المصدر بتعبئة تفاصيل الصفقة التجارية ورفع المستندات الأولية عبر بوابة ICA.' 
        : isZh 
        ? '进出口企业在结算中心提交贸易标的、合同、形式发票及基础货品清册。' 
        : isCkb 
        ? 'هاوردەکار یان هەناردەکار زانیارییە سەرەتاییەکان لە دەروازەکە پێشکەش دەکات.' 
        : 'Enterprise submits commercial contract, pro-forma invoice, and corporate registration details through the secure ICA desk.',
      icon: FileText
    },
    {
      num: '02',
      title: isAr ? 'فحص اعرف عميلك والعقوبات' : isZh ? 'KYC资质审查与反洗钱核验' : isCkb ? 'وردبینی KYC و سزاکان' : 'KYC & Sanctions Screening',
      desc: isAr 
        ? 'تدقيق أطراف المعاملة والتأكد من مطابقتها لقانون مكافحة غسل الأموال رقم ٣٩ لسنة ٢٠١٥ وقوائم الحظر الدولية.' 
        : isZh 
        ? '依据伊拉克2015年第39号反洗钱法及中国人民银行规范，对交易主体实施严格双向合规审查。' 
        : isCkb 
        ? 'پشکنینی دژە سپیکردنەوە و دڵنیابوونەوە لە نەبوونی ناوی لایەنەکان لە لیستی سزادراوان.' 
        : 'Automated and officer-led sanctions screening against CBI, PBoC, and UN Security Council regimes.',
      icon: ShieldCheck
    },
    {
      num: '03',
      title: isAr ? 'تدقيق الوثائق الجمركية' : isZh ? '贸易单证与海关申报复核' : isCkb ? 'وردبینی بەڵگەنامە گومرگییەکان' : 'Documentation Verification',
      desc: isAr 
        ? 'فحص بوليصة الشحن، شهادة المنشأ الصينية، والفاتورة النهائية لضمان سلامة مسار التخليص.' 
        : isZh 
        ? '核验海运提单、海关原产地证及商检批文，确保贸易真实性与货权无争议。' 
        : isCkb 
        ? 'پشکنینی بەڵگەنامەی باری کەشتی و بڕوانامەی شوێنی دروستکردن.' 
        : 'Commercial invoices, Bills of Lading, and customs import declarations verified by ICA trade officers.',
      icon: FileCheck
    },
    {
      num: '04',
      title: isAr ? 'تثبيت السعر وإعداد التعليمات' : isZh ? '汇率锁定与ISO 20022指令开立' : isCkb ? 'بەستنی نرخ و فەرمانی بانکی' : 'Rate Lock & Instruction Preparation',
      desc: isAr 
        ? 'تثبيت سعر الصرف السيادي المباشر بين الدينار واليوان وتوليد تذكرة التحويل الرسمية.' 
        : isZh 
        ? '按当日中伊双边央行指导平价锁定汇率，生成防篡改的标准ISO 20022清算报文指令。' 
        : isCkb 
        ? 'بەستنی نرخی ڕاستەوخۆ و ئامادەکردنی فەرمانی فەرمی بانکی.' 
        : 'Direct sovereign parity rate locked and standard ISO 20022 payment instruction compiled.',
      icon: Lock
    },
    {
      num: '05',
      title: isAr ? 'التمرير للمصرف الشريك المنفذ' : isZh ? '专线报文划转至承办清算行' : isCkb ? 'ناردن بۆ بانکی هاوبەش' : 'Banking Partner Dispatch',
      desc: isAr 
        ? 'إرسال الملف المشفر إلى المصرف العراقي المعتمد للتنفيذ المباشر.' 
        : isZh 
        ? '通过专线直连通道（Host-to-Host）安全派发至伊拉克央行指定承办清算商业银行。' 
        : isCkb 
        ? 'ناردنی دۆسیە بۆ بانکی عێراقی پەسەندکراو بۆ جێبەجێکردن.' 
        : 'Encrypted instruction dispatched to designated CBI-licensed settlement bank (e.g. Trade Bank of Iraq).',
      icon: Landmark
    },
    {
      num: '06',
      title: isAr ? 'التنفيذ والمقاصة المباشرة' : isZh ? 'CIPS/mBridge跨境直接清算' : isCkb ? 'پاکتاوی ڕاستەوخۆ لە کاردایە' : 'Direct Interbank Execution',
      desc: isAr 
        ? 'قيد الدينار في العراق ومقاصة اليوان الصيني لحساب المستفيد في الصين دون وسيط دولاري.' 
        : isZh 
        ? '借记伊拉克第纳尔账户，通过CIPS或央行双边互换专户直接贷记中国境内收款人账户。' 
        : isCkb 
        ? 'پاکتاوی ڕاستەوخۆی پارەکە بۆ سەر هەژماری وەرگر لە چین بەبێ دەستێوەردانی دۆلار.' 
        : 'Settlement executed directly over bilateral clearing accounts or CIPS rail without third-currency hop.',
      icon: ArrowRightLeft
    },
    {
      num: '07',
      title: isAr ? 'التأكيد وإصدار السجل المشفر' : isZh ? '全流程闭环归档与核销凭证' : isCkb ? 'تەواوبوون و ئەرشیفکردنی فەرمی' : 'Confirmation & Dossier Archival',
      desc: isAr 
        ? 'إصدار إشعار التسوية النهائي وختم السجل إلكترونياً لإغلاق المعاملة وحفظها للأغراض الضريبية والجمركية.' 
        : isZh 
        ? '向进出口双方颁发不可篡改的双边清算结汇凭证，同步备案至官方监管档案库。' 
        : isCkb 
        ? 'دەرکردنی بڕوانامەی کۆتایی و ئەرشیفکردنی مامەڵە بۆ کاروباری باج و گومرگ.' 
        : 'Final settlement advice and cryptographic clearing dossier generated for customs and tax reporting.',
      icon: CheckCircle2
    }
  ];

  return (
    <SettlementLayout lang={lang}>
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4 border-b border-gray-200 pb-8">
          <div className="pay-badge">
            Operational Lifecycle
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            {isAr ? 'كيف تعمل منظومة التسوية المباشرة' : isZh ? '双边本币清算业务全流程' : isCkb ? 'چۆنیەتی کارکردنی پاکتاوی ڕاستەوخۆ' : 'How Bilateral Settlement Works'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            From initial contract submission to final beneficiary crediting in China, discover the 7-step cryptographic workflow ensuring 100% compliance, zero USD intermediary friction, and rapid 24-48 hour execution.
          </p>
        </div>

        {/* Steps Stepper Grid */}
        <div className="space-y-6">
          {steps.map((st, i) => (
            <div key={i} className="pay-card p-6 flex flex-col sm:flex-row items-start gap-5 border border-gray-200 hover:border-[#C8102E] bg-white group">
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-2xl font-black text-[#C8102E] w-12 text-center">
                  {st.num}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#C8102E] flex items-center justify-center group-hover:bg-[#C8102E] group-hover:text-white transition-colors">
                  <st.icon size={22} />
                </div>
              </div>

              <div className="space-y-1.5 flex-1">
                <h3 className="text-base sm:text-lg font-black text-gray-900 group-hover:text-[#C8102E] transition-colors">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-red-50 to-white border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-black text-gray-900 text-sm">Ready to execute a trade settlement?</h4>
            <p className="text-xs text-gray-500 mt-0.5">Submit trade details to receive an official reference dossier within minutes.</p>
          </div>
          <Link
            to={`/${lang}/settlement/inquiry`}
            className="pay-btn-primary px-5 py-2.5 rounded-xl font-black text-xs shadow-xs shrink-0"
          >
            Start Settlement Inquiry →
          </Link>
        </div>

      </div>
    </SettlementLayout>
  );
}
