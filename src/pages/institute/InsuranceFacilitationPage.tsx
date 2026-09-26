import React, { useState } from 'react';
import { ShieldCheck, FileText, Download, Building2, Ship, AlertCircle, CheckCircle2, ChevronRight, Globe, HardHat, Landmark } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Locale } from '../../types';
import { useI18n } from '../../hooks/useI18n';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function InsuranceFacilitationPage() {
  const { lang: urlLang } = useParams<{ lang: string }>();
  const normalizedLang = (urlLang === 'ck' || urlLang === 'ku') ? 'ckb' : (urlLang || 'en');
  const lang = (['en', 'ar', 'zh', 'ckb'].includes(normalizedLang) ? normalizedLang : 'en') as Locale;
  const { t } = useI18n(lang);
  const isRtl = lang === 'ar' || lang === 'ckb';

  const [formState, setFormState] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    sector: 'Infrastructure',
    inquiryType: 'Sinosure Credit',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sections = [
    {
      id: 'sinosure',
      title: {
        en: 'Sinosure Coordination',
        ar: 'تنسيق سينوشور',
        zh: '中国信保（Sinosure）对接',
        ckb: 'هەماهەنگی سینۆشوور'
      },
      icon: Building2,
      content: {
        en: 'Direct integration with China Export & Credit Insurance Corporation (Sinosure) to unlock sovereign-backed credit terms. We facilitate credit rating applications, buyer limit enhancements, and deferred payment structures up to 360 days for Iraqi importers.',
        ar: 'تكامل مباشر مع المؤسسة الصينية لتأمين الصادرات والائتمان (سينوشور) لفتح تسهيلات اائتمانية مدعومة سيادياً. نحن نسهل طلبات التصنيف الائتماني، ورفع سقف حدود المشترين، وهيكلة السداد الآجل حتى ٣٦٠ يوماً للمستوردين العراقيين.',
        zh: '深度对接中国出口信用保险公司（中信保），解锁国家级信用保障。为伊拉克进口商提供资信评级申请、买方限额提升及长达360天的延期付款（OA/DA）结构优化服务。',
        ckb: 'هەماهەنگی ڕاستەوخۆ لەگەڵ دامەزراوەی بیمەی هەناردە و متمانەی چین (سینۆشوور) بۆ بەدەستهێنانی مەرجەکانی متمانەی سەروەری. ئێمە ئاسانکاری دەکەین بۆ داواکارییەکانی پلەبەندی متمانە و مۆڵەتی پارەدانی دواخراو بۆ بازرگانانی عێراق.'
      },
      features: {
        en: ['Buyer Credit Assessment', 'Institutional Reinsurance', 'Deferred Payment (OA/DA)', 'Sovereign Guarantee Backing', 'Political Risk Rating (PRR)', 'Credit Limit Optimization'],
        ar: ['تقييم ائتمان المشتري', 'إعادة التأمين المؤسسي', 'الدفع الآجل (OA/DA)', 'دعم الضمانات السيادية', 'تصنيف المخاطر السياسية (PRR)', 'تحسين حدود الائتمان'],
        zh: ['买家资信调查', '机构分保协议', '延期付款核额', '主权担保背书', '政治风险评级 (PRR)', '信用额度优化配置'],
        ckb: ['هەڵسەنگاندنی متمانەی کڕیار', 'بیمەی دووبارەی دامەزراوەیی', 'پارەدانی دواخراو', 'پشتگیری گەرەنتی سەروەري', 'پلەبەندی مەترسی سیاسی', 'باشترکردنی سنووری متمانە']
      }
    },
    {
      id: 'cargo',
      title: {
        en: 'Cargo & Shipping Insurance',
        ar: 'تأمين الشحن والبضائع',
        zh: '跨境货运与物流保险',
        ckb: 'بیمەی بار و کەشتیوانی'
      },
      icon: Ship,
      content: {
        en: 'All-risks marine, aviation, and multimodal cargo insurance underwritten by leading bilateral syndicates. Coverage includes door-to-door protection from Chinese industrial hubs to Iraqi distribution centers, including transshipment risks.',
        ar: 'تأمين شامل ضد جميع المخاطر للشحن البحري والجوي ومتعدد الوسائط تحت غطاء مجمعات تأمينية ثنائية رائدة. تشمل التغطية الحماية من الباب إلى الباب من المراكز الصناعية الصينية إلى مراكز التوزيع العراقية، بما في ذلك مخاطر إعادة الشحن.',
        zh: '由领先的中伊联合保险财团承保的海、空及多式联运一切险。保障范围涵盖从中国产业带到伊拉克分拨中心的全程“门到门”风险防护，包括中转及离岸风险。',
        ckb: 'بیمەی هەموو مەترسییەکانی گواستنەوەی دەریایی، ئاسمانی و وشکانی. داپۆشینەکە پاراستنی دەرگا-بۆ-دەرگا لە ناوەندە پیشەسازییەکانی چینەوە بۆ ناوەندەکانی دابەشکردن لە عێراق دەگرێتەوە.'
      },
      features: {
        en: ['All-Risks (A-Clause) Coverage', 'Door-to-Door Logistics Guard', 'War & Strike Clauses', 'Bilingual Policy Issuance', 'Multimodal Transshipment Cover', 'Claims Settlement in IQD/RMB'],
        ar: ['تغطية جميع المخاطر (A-Clause)', 'حماية لوجستية من الباب إلى الباب', 'بنود الحرب والإضرابات', 'إصدار بوليصة ثنائية اللغة', 'تغطية الشحن متعدد الوسائط', 'تسوية المطالبات بالدينار/اليوان'],
        zh: ['一切险（A条款）保障', '门到门物流全程护航', '罢工与战争险附加项', '中英双语保单同步', '多式联运中转险', '支持本币（IQD/RMB）理赔'],
        ckb: ['داپۆشینی هەموو مەترسيیەکان', 'پاراستنی لۆجستی دەرگا-بۆ-دەرگا', 'بڕگەکانی جەنگ و مانگرتن', 'دەرکردنی پۆڵیسەی دووزمانە', 'داپۆشینی گواستنەوەی چەند جۆرە', 'پارەدانی قەرەبوو بە دینار/یوانی']
      }
    },
    {
      id: 'project',
      title: {
        en: 'Project & Political Risk',
        ar: 'مخاطر المشاريع والمخاطر السياسية',
        zh: '工程与政治风险防范',
        ckb: 'مەترسی پڕۆژە و سیاسی'
      },
      icon: HardHat,
      content: {
        en: 'Strategic coverage for long-term infrastructure and EPC projects. Mitigation against sovereign default, transfer restrictions, expropriation, and geopolitical disruptions affecting bilateral development corridors.',
        ar: 'تغطية استراتيجية لمشاريع البنية التحتية طويلة الأمد ومشاريع EPC. التخفيف من مخاطر التخلف عن السداد السيادي، قيود التحويل، المصادرة، والاضطرابات الجيوسياسية التي تؤثر على ممرات التنمية الثنائية.',
        zh: '针对长期基础设施建设及EPC工程项目的战略性保险方案。规避主权违约、汇兑限制、征收风险以及影响双边发展走廊的地缘政治动荡。',
        ckb: 'داپۆشینی ستراتیژی بۆ پڕۆژە درێژخایەنەکانی ژێرخان. کەمکردنەوەی مەترسییەکانی سستی لە پارەدان، سنووردارکردنی گواستنەوەی پارە و تێکچوونە جیۆپۆلیتیکییەکان.'
      },
      features: {
        en: ['Sovereign Default Protection', 'Force Majeure Mitigation', 'Currency Transfer Guarantee', 'Contract Frustration Coverage'],
        ar: ['حماية من التخلف السيادي', 'تخفيف آثار القوة القاهرة', 'ضمان تحويل العملات', 'تغطية تعثر العقود'],
        zh: ['主权违约赔付', '不可抗力风险补偿', '货币汇兑转移保证', '合同中断与受阻险'],
        ckb: ['پاراستن لە سستی سەروەری', 'کەمکردنەوەی مەترسی هێزی باڵا', 'گەرەنتی گواستنەوەی دراو', 'داپۆشینی پەککەوتنی گرێبەست']
      }
    },
    {
      id: 'compliance',
      title: {
        en: 'Compliance Framework',
        ar: 'إطار الامتثال والتنظيم',
        zh: '双边监管与合规框架',
        ckb: 'چوارچێوەی پابەندبوون'
      },
      icon: Landmark,
      content: {
        en: 'Operating within the synchronized regulatory framework of the Central Bank of Iraq (CBI) and the People’s Bank of China (PBOC). We ensure every insurance dossier meets international AML/KYC and bilateral trade protocols.',
        ar: 'العمل ضمن إطار تنظيمي متزامن بين البنك المركزي العراقي (CBI) وبنك الشعب الصيني (PBOC). نحن نضمن أن كل ملف تأميني يستوفي معايير مكافحة غسل الأموال (AML/KYC) وبروتوكولات التجارة الثنائية.',
        zh: '在伊拉克中央银行（CBI）与中国人民银行（PBOC）同步监管框架下运行。确保每一份保险档案均符合国际反洗钱（AML/KYC）及双边贸易合规协议。',
        ckb: 'کارکردن لە چوارچێوەی ڕێکخراوی هاوکاتی بانکی ناوەندی عێراق و بانکی گەلی چین. ئێمە دڵنیا دەبینەوە کە هەموو دۆسیەیەکی بیمە مەرجەکانی نێودەوڵەتی تێدایە.'
      },
      features: {
        en: ['CBI/PBOC Alignment', 'AML/KYC Due Diligence', 'Bilateral Trade Protocols', 'Standardized Audit Trail'],
        ar: ['التوافق مع البنك المركزي العراقي والصيني', 'تدقيق مكافحة غسل الأموال', 'بروتوكولات التجارة الثنائية', 'سجل تدقيق قياسي'],
        zh: ['两央行监管对齐', '反洗钱与KYC尽调', '双边贸易协议适配', '标准化审计踪迹存证'],
        ckb: ['هاوئاهەنگی لەگەڵ بانکە ناوەندییەکان', 'پشکنینی دژە سپیکردنەوەی پارە', 'پڕۆتۆکۆڵە بازرگانییەکان', 'سجلی وردبینی ستاندارد']
      }
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const generatePDF = async () => {
    const element = document.getElementById('inquiry-report');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`ICA-Insurance-Inquiry-${Date.now()}.pdf`);
    } catch (error) {
      console.error('PDF Generation Error:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center overflow-hidden bg-navy">
        <img 
          src="/src/assets/images/hero_insurance_facilitation_1790279929359.jpg" 
          alt="Insurance Facilitation" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
        <div className="page-container relative z-10">
          <div className="max-w-3xl space-y-6">
            <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-md border border-amber-500/30">
              {lang === 'ar' ? 'المعهد الصيني للدراسات الاستراتيجية' : lang === 'zh' ? '中国战略与经济研究所' : lang === 'ckb' ? 'پەیمانگای چینی' : 'CISE Institutional Portal'}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              {lang === 'ar' ? 'تسهيل التأمين السيادي' : lang === 'zh' ? '中伊双向主权保险促进' : lang === 'ckb' ? 'ئاسانکاری بیمەی سەروەری' : 'Sovereign Insurance Facilitation'}
            </h1>
            <p className="text-xl text-neutral-300 font-medium leading-relaxed">
              {lang === 'ar' 
                ? 'الأطر التشغيلية لتأمين ائتمان الصادرات، مخاطر الشحن، وتغطية المشاريع الاستراتيجية بين العراق والصين.'
                : lang === 'zh'
                ? '服务于中伊战略合作的出口信保、跨境货运及大型工程政治风险对冲体系。'
                : lang === 'ckb'
                ? 'چوارچێوەی کارکردن بۆ بیمەی هەناردە، مەترسییەکانی بار و پڕۆژە ستراتیژییەکانی نێوان عێراق و چین.'
                : 'Operational frameworks for export credit, cargo risks, and strategic project coverage across the Iraq-China economic corridor.'}
            </p>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-20">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section) => (
              <motion.div 
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-neutral-100 rounded-xl flex items-center justify-center text-navy shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <section.icon size={28} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-navy uppercase tracking-tight">
                      {section.title[lang] || section.title.en}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed font-medium">
                      {section.content[lang] || section.content.en}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {(section.features[lang] || section.features.en || []).map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-neutral-500">
                          <CheckCircle2 size={14} className="text-amber-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Support Section */}
      <section className="py-10 bg-neutral-100">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden h-64 relative group">
              <img src="/src/assets/images/insurance_sinosure_credit_1790279940504.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Credit" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                <span className="text-white font-black uppercase text-xs tracking-widest">{lang === 'ar' ? 'تقييم الائتمان' : lang === 'zh' ? '资信评估' : 'Credit Assessment'}</span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden h-64 relative group">
              <img src="/src/assets/images/insurance_cargo_shipping_1790279950965.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Cargo" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                <span className="text-white font-black uppercase text-xs tracking-widest">{lang === 'ar' ? 'تأمين الشحن' : lang === 'zh' ? '货运保险' : 'Cargo Insurance'}</span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden h-64 relative group">
              <img src="/src/assets/images/insurance_risk_mitigation_1790279963205.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Risk" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                <span className="text-white font-black uppercase text-xs tracking-widest">{lang === 'ar' ? 'تخفيف المخاطر' : lang === 'zh' ? '风险对冲' : 'Risk Mitigation'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form & PDF Section */}
      <section className="py-20">
        <div className="page-container">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
              <div className="md:w-2/5 bg-navy p-10 text-white space-y-8">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">
                    {lang === 'ar' ? 'طلب تسهيل تأميني' : lang === 'zh' ? '保险促进申请' : 'Insurance Inquiry'}
                  </h2>
                  <p className="text-neutral-400 font-medium">
                    {lang === 'ar' 
                      ? 'قدم طلبك للحصول على استشارة تأمينية متخصصة أو تفعيل غطاء Sinosure لمشاريعك.' 
                      : lang === 'zh' 
                      ? '提交您的保险咨询申请，或为您的项目激活中信保主权信用额度。' 
                      : 'Submit your inquiry for specialized insurance advisory or Sinosure coverage activation.'}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <Globe size={20} className="text-amber-500" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Official Channel</div>
                      <div className="text-sm font-bold">Bilateral Insurance Desk</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <FileText size={20} className="text-amber-500" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Documentation</div>
                      <div className="text-sm font-bold">Certified PDF Report</div>
                    </div>
                  </div>
                </div>

                <div className="pt-10">
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <p className="text-[11px] font-bold text-amber-500 leading-relaxed italic">
                      {lang === 'ar' 
                        ? 'ملاحظة: هذا الطلب يتم مراجعته من قبل مكتب التأمين الثنائي التابع للوكالة العراقية الصينية بالتنسيق مع CISE.'
                        : lang === 'zh'
                        ? '注：此申请将由伊中机构双边保险处协同中伊研究所共同审核。'
                        : 'Note: This inquiry is processed by the Bilateral Insurance Desk of the ICA in coordination with CISE.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:w-3/5 p-10">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Company Name</label>
                        <input 
                          type="text" name="companyName" required
                          value={formState.companyName} onChange={handleInputChange}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-amber-500 outline-none transition-all" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Contact Person</label>
                        <input 
                          type="text" name="contactPerson" required
                          value={formState.contactPerson} onChange={handleInputChange}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-amber-500 outline-none transition-all" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Work Email</label>
                        <input 
                          type="email" name="email" required
                          value={formState.email} onChange={handleInputChange}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-amber-500 outline-none transition-all" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Phone Number</label>
                        <input 
                          type="tel" name="phone" required
                          value={formState.phone} onChange={handleInputChange}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-amber-500 outline-none transition-all" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Primary Sector</label>
                        <select 
                          name="sector"
                          value={formState.sector} onChange={handleInputChange}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-amber-500 outline-none transition-all"
                        >
                          <option>Energy & Petrochemicals</option>
                          <option>Infrastructure</option>
                          <option>Manufacturing</option>
                          <option>Agriculture</option>
                          <option>Technology</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Inquiry Type</label>
                        <select 
                          name="inquiryType"
                          value={formState.inquiryType} onChange={handleInputChange}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-amber-500 outline-none transition-all"
                        >
                          <option>Sinosure Credit Limit</option>
                          <option>Cargo/Shipping Policy</option>
                          <option>Project Risk Coverage</option>
                          <option>Political Risk Assessment</option>
                          <option>Compliance Advisory</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Specific Requirements / Message</label>
                      <textarea 
                        name="message" rows={4}
                        value={formState.message} onChange={handleInputChange}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-amber-500 outline-none transition-all"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" disabled={isSubmitting}
                      className="w-full bg-navy text-white h-14 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-amber-600 transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (lang === 'ar' ? 'إرسال الطلب' : lang === 'zh' ? '提交申请' : 'Submit Formal Inquiry')}
                    </button>
                  </form>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={40} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-navy uppercase tracking-tight">Inquiry Registered</h3>
                      <p className="text-neutral-500 font-medium max-w-xs mx-auto">
                        Your formal insurance facilitation inquiry has been logged. Our bilateral officer will contact you within 24-48 hours.
                      </p>
                    </div>
                    
                    {/* Hidden report for PDF generation */}
                    <div id="inquiry-report" className="hidden p-10 bg-white border border-neutral-200 w-[210mm] text-navy">
                      <div className="flex justify-between border-b-2 border-navy pb-6 mb-8">
                        <div>
                          <div className="text-xl font-black uppercase tracking-tighter">Iraqi-Chinese Agency</div>
                          <div className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Bilateral Insurance Desk</div>
                        </div>
                        <div className="text-right text-[10px] font-bold text-neutral-400 uppercase">
                          Ref: ICA-INS-{Date.now().toString().slice(-6)}<br />
                          Date: {new Date().toLocaleDateString()}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="bg-neutral-50 p-4 rounded-xl">
                          <h4 className="text-xs font-black uppercase tracking-widest text-amber-600 mb-2">Subject: Insurance Facilitation Request</h4>
                          <p className="text-sm font-bold">This document serves as an official receipt of inquiry for sovereign-backed insurance services within the Iraq-China economic corridor.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Company</div>
                            <div className="text-sm font-black">{formState.companyName}</div>
                          </div>
                          <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Representative</div>
                            <div className="text-sm font-black">{formState.contactPerson}</div>
                          </div>
                          <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Sector</div>
                            <div className="text-sm font-black">{formState.sector}</div>
                          </div>
                          <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Service Type</div>
                            <div className="text-sm font-black">{formState.inquiryType}</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Inquiry Details</div>
                          <p className="text-xs font-medium leading-relaxed bg-neutral-50 p-3 rounded-lg min-h-[80px]">{formState.message || 'No additional details provided.'}</p>
                        </div>
                      </div>
                      <div className="mt-20 pt-8 border-t border-neutral-100 flex justify-between items-center">
                        <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">
                          Certified by CISE Research Secretariat · Authorized by ICA Governance Board
                        </div>
                        <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center text-white text-[10px] font-black">
                          ICA
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={generatePDF}
                        className="bg-navy text-white px-8 h-12 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-amber-600 transition-all flex items-center gap-2"
                      >
                        <Download size={14} /> Download PDF Receipt
                      </button>
                      <button 
                        onClick={() => setSubmitted(false)}
                        className="bg-neutral-100 text-neutral-600 px-8 h-12 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-neutral-200 transition-all"
                      >
                        New Inquiry
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-t border-neutral-200">
        <div className="page-container">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all">
            <div className="text-xl font-black tracking-tighter uppercase text-navy">Sinosure</div>
            <div className="text-xl font-black tracking-tighter uppercase text-navy">CBI Regulation</div>
            <div className="text-xl font-black tracking-tighter uppercase text-navy">PBOC Framework</div>
            <div className="text-xl font-black tracking-tighter uppercase text-navy">Lloyd's Syndicates</div>
            <div className="text-xl font-black tracking-tighter uppercase text-navy">UnionPay Int</div>
          </div>
        </div>
      </section>
    </div>
  );
}
