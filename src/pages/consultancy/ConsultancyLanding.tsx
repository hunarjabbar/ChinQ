import React from 'react';
import { Locale } from '../../types';
import { useI18n } from '../../hooks/useI18n';
import { Link, useParams } from 'react-router-dom';
import { Shield, ArrowRight, CheckCircle2, Globe, Landmark, Scale, TrendingUp, FileText, Gavel, Building2, Zap, Award, BarChart3, Factory, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { Disclosure } from '../../components/consultancy/Disclosure';

export function ConsultancyLanding() {
  const { lang: urlLang } = useParams<{ lang: string }>();
  const normalizedLang = (urlLang === 'ck' || urlLang === 'ku') ? 'ckb' : (urlLang || 'en');
  const lang = (['en', 'ar', 'zh', 'ckb'].includes(normalizedLang) ? normalizedLang : 'en') as Locale;
  const { t } = useI18n(lang);
  const isRtl = lang === 'ar' || lang === 'ckb';

  const fadeIn = {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.3 }
  };

  const advantages = [
    {
      jurisdiction: "Iraq & Kurdistan",
      items: [
        { title: "Strategic Location", body: "Gateway to the Middle East with access to major shipping routes and the Development Road initiative.", icon: Zap },
        { title: "Emerging Markets", body: "High demand in energy, construction, and infrastructure with massive reconstruction needs.", icon: TrendingUp },
        { title: "Financial Incentives", body: "Up to 10 years of tax exemptions and 100% profit repatriation in KRI.", icon: Award },
        { title: "Bilateral Support", body: "Direct CBI-backed RMB/IQD settlement reducing dependency on third-party currencies.", icon: Scale }
      ]
    },
    {
      jurisdiction: "PR China",
      items: [
        { title: "Global Manufacturing", body: "Access to world-class supply chains, high-tech clusters, and industrial manufacturing capacity.", icon: Factory },
        { title: "Digital Ecosystem", body: "World-leading AI, Fintech, and e-commerce infrastructure for modern business operations.", icon: Cpu },
        { title: "Capital Markets", body: "Growing access to A-share markets and diversified investment vehicles via QFII.", icon: BarChart3 },
        { title: "Innovation Hub", body: "Leader in green energy, EV technology, and digital silk road implementation.", icon: Globe }
      ]
    }
  ];

  const badges = [
    { name: "Iraqi National Investment Commission (NIC)", sub: "Law No. 13 of 2006", href: "https://investiraq.gov.iq/" },
    { name: "Kurdistan Board of Investment (KBOI)", sub: "Law No. 4 of 2006", href: "https://investkurdistan.gov.krd/" },
    { name: "China Ministry of Commerce (MOFCOM)", sub: "Foreign Investment Law 2020", href: "http://english.mofcom.gov.cn/" },
    { name: "People's Bank of China", sub: "Cross-border RMB Framework", href: "http://www.pbc.gov.cn/english/130437/index.html" },
    { name: "Iraqi Securities Commission (ISC)", sub: "Capital Market Regulations", href: "http://www.isc.gov.iq/" },
    { name: "China Securities Regulatory Commission (CSRC)", sub: "QFII/RQFII Framework", href: "http://www.csrc.gov.cn/pub/csrc_en/" },
    { name: "FATF", sub: "AML/CFT Aligned", href: "https://www.fatf-gafi.org/" },
    { name: "ISO 37001", sub: "Anti-Bribery Management Systems", href: "https://www.iso.org/standard/65036.html" }
  ];

  const pillars = [
    {
      id: 'iraq-bound',
      title: lang === 'ar' ? 'الاستثمار في العراق' : lang === 'zh' ? '投资伊拉克' : lang === 'ckb' ? 'وەبەرهێنان لە عێراق' : 'Investing in Iraq',
      body: lang === 'ar' ? 'استشارات قانونية ومالية كاملة للمستثمرين الصينيين الداخلين إلى أسواق العراق وإقليم كردستان.' : lang === 'zh' ? '为进入伊拉克和库尔德地区市场的中国投资者提供全面的法律和财务咨询。' : lang === 'ckb' ? 'ڕاوێژکاری تەواوی یاسایی و دارایی بۆ وەبەرهێنەرانی چینی کە دەچنە ناو بازاڕەکانی عێراق و هەرێمی کوردستان.' : 'Full legal and financial advisory for Chinese investors entering the Iraqi and Kurdistan Region markets.',
      path: `/${lang}/consultancy/iraq-bound`,
      icon: Building2
    },
    {
      id: 'china-bound',
      title: lang === 'ar' ? 'الاستثمار في الصين' : lang === 'zh' ? '投资中国' : lang === 'ckb' ? 'وەبەرهێنان لە چین' : 'Investing in China',
      body: lang === 'ar' ? 'استشارات قانونية ومالية كاملة للمستثمرين العراقيين الداخلين إلى السوق الصينية.' : lang === 'zh' ? '为进入中国市场的伊拉克投资者提供全面的法律和财务咨询。' : lang === 'ckb' ? 'ڕاوێژکاری تەواوی یاسایی و دارایی بۆ وەبەرهێنەرانی عێراقی کە دەچنە ناو بازاڕی چین.' : 'Full legal and financial advisory for Iraqi investors entering the Chinese market.',
      path: `/${lang}/consultancy/china-bound`,
      icon: Globe
    },
    {
      id: 'bilateral',
      title: lang === 'ar' ? 'استشارات مالية ثنائية' : lang === 'zh' ? '双边财务咨询' : lang === 'ckb' ? 'ڕاوێژکاری دارایی دوولايەنە' : 'Bilateral Financial Consultancy',
      body: lang === 'ar' ? 'استشارات الاستثمار في سوق الأسهم والأوراق المالية والمحافظ الاستثمارية في كلا البلدين.' : lang === 'zh' ? '两国股票市场、证券和投资组合投资咨询。' : lang === 'ckb' ? 'ڕاوێژکاری وەبەرهێنان لە بازاڕی پشک، سەنەدات و پۆرتفۆلیۆی وەبەرهێنان لە هەردوو وڵاتدا.' : 'Stock market, securities, and portfolio investment advisory in both countries.',
      path: `/${lang}/consultancy/bilateral`,
      icon: TrendingUp
    }
  ];

  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-[brand-100] selection:text-[#991B1B]">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div {...fadeIn} className="max-w-3xl space-y-6">
            <span className="inline-block px-3 py-1 bg-[brand-800] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-sm">
              {lang === 'ar' ? 'استشارات مالية وقانونية استراتيجية' : lang === 'zh' ? '战略财务与法律咨询' : lang === 'ckb' ? 'ڕاوێژکاری دارایی و یاسایی ستراتیژی' : 'Strategic Financial & Legal Consultancy'}
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
              {lang === 'ar' ? 'استشارات مالية وقانونية عابرة للحدود بين العراق والصين.' : 
               lang === 'zh' ? '伊拉克与中国之间的跨境财务与法律咨询。' : 
               lang === 'ckb' ? 'ڕاوێژکاری دارایی و یاسایی سنووربەزێن بۆ عێراق و چین.' : 
               'Cross-border financial and legal advisory for Iraq and China.'}
            </h1>
            <p className="text-xl text-gray-400 font-medium leading-relaxed">
              {lang === 'ar' ? 'استراتيجية الدخول إلى السوق، هيكلة الاستثمار، التنقل التنظيمي، والوصول إلى سوق الأسهم في كلا الاتجاهين. متوافق مع الأطر القانونية العراقية وإقليم كردستان والصينية.' : 
               lang === 'zh' ? '市场准入策略、投资结构设计、监管导航以及双向股票市场准入。符合伊拉克、库尔德地区和中国法律框架。' : 
               lang === 'ckb' ? 'ستراتیژی چوونە ناو بازاڕ، ڕێکخستنی وەبەرهێنان، ڕێنمایی ڕێکخراوەیی، و دەستڕاگەیشتن بە بازاڕی پشک لە هەردوو ئاراستەدا. لەگەڵ چوارچێوە یاساییەکانی عێراق، هەرێمی کوردستان و چین دەگونجێت.' : 
               'Market entry strategy, investment structuring, regulatory navigation, and stock market access in both directions. Aligned with Iraqi, Kurdistan Region, and Chinese legal frameworks.'}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to={`/${lang}/consultancy/inquiry`} className="h-14 px-8 bg-[brand-800] hover:bg-[brand-800] text-white rounded-lg flex items-center justify-center font-black uppercase tracking-widest text-sm transition-all hover:-translate-y-1 shadow-lg shadow-[brand-800]/20">
                {lang === 'ar' ? 'ابدأ الاستشارة' : lang === 'zh' ? '开始咨询' : lang === 'ckb' ? 'دەستپێکردنی ڕاوێژکاری' : 'Start Advisory'}
              </Link>
              <Link to={`/${lang}/consultancy/about`} className="h-14 px-8 border border-white/20 hover:border-white text-white rounded-lg flex items-center justify-center font-black uppercase tracking-widest text-sm transition-all hover:bg-white/5">
                {lang === 'ar' ? 'اعرف المزيد' : lang === 'zh' ? '了解更多' : lang === 'ckb' ? 'زیاتر بزانە' : 'Learn More'}
              </Link>
            </div>
          </motion.div>
        </div>
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[brand-800]/5 skew-x-[-20deg] translate-x-1/4" />
      </section>

      {/* Compliance Badges */}
      <section className="py-12 border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {badges.map((badge, idx) => (
              <a 
                key={idx} 
                href={badge.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col p-3 border border-gray-200 rounded-lg hover:border-[brand-800] transition-colors bg-white shadow-sm"
              >
                <span className="text-[9px] font-black text-black uppercase leading-tight line-clamp-2 group-hover:text-[brand-800]">
                  {badge.name}
                </span>
                <span className="text-[8px] font-bold text-[#4B5563] uppercase tracking-tighter mt-1">
                  {badge.sub}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <motion.div 
                key={pillar.id}
                {...fadeIn}
                className="group p-8 border border-gray-200 rounded-2xl hover:border-[brand-800] hover:shadow-2xl hover:shadow-black/5 transition-all duration-300 flex flex-col h-full bg-white relative overflow-hidden"
              >
                <div className="w-14 h-14 bg-[brand-100] rounded-xl flex items-center justify-center text-[brand-800] mb-6 group-hover:scale-110 transition-transform">
                  <pillar.icon size={28} />
                </div>
                <h3 className="text-2xl font-black text-black uppercase tracking-tight mb-4">
                  {pillar.title}
                </h3>
                <p className="text-[#4B5563] font-medium leading-relaxed mb-8 flex-grow">
                  {pillar.body}
                </p>
                <Link 
                  to={pillar.path} 
                  className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-black group-hover:text-[brand-800] transition-colors"
                >
                  {lang === 'ar' ? 'استكشاف التفاصيل' : lang === 'zh' ? '探索细节' : lang === 'ckb' ? 'گەڕان بۆ وردەکارییەکان' : 'Explore Details'}
                  <ArrowRight size={16} className={cn("transition-transform group-hover:translate-x-1", isRtl && "rotate-180 group-hover:-translate-x-1")} />
                </Link>
                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-[brand-800]/5 rounded-bl-full translate-x-6 -translate-y-6 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantage Reveal Section */}
      <section className="py-24 bg-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
              Bilateral Investment Advantages
            </h2>
            <p className="text-[#4B5563] max-w-2xl mx-auto font-medium">
              Synchronized growth opportunities tailored for the Sino-Iraqi information and capital corridor.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
            {/* Center vertical divider (desktop) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2" />

            {advantages.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-12">
                <div className="flex items-center gap-4 mb-8">
                   <div className={cn("w-1 h-8", groupIdx === 0 ? "bg-black" : "bg-[brand-800]")} />
                   <h3 className="text-2xl font-black uppercase tracking-tight">{group.jurisdiction}</h3>
                </div>
                
                <div className="space-y-8">
                  {group.items.map((item, itemIdx) => (
                    <motion.div
                      key={itemIdx}
                      initial={{ opacity: 0, x: groupIdx === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: itemIdx * 0.1, duration: 0.4 }}
                      className="group flex items-start gap-6"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-[brand-800] group-hover:bg-[brand-800] group-hover:text-white transition-all duration-300 shrink-0">
                        <item.icon size={24} />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-black uppercase tracking-tight group-hover:text-[brand-800] transition-colors">{item.title}</h4>
                        <p className="text-sm font-medium text-[#4B5563] leading-relaxed">{item.body}</p>
                        <Disclosure label="View Legal/Procedural Detail" variant="inline">
                          <p className="text-xs">Procedural facilitation through CISE ensuring full compliance with the latest {group.jurisdiction} investment frameworks and cross-border capital protocols.</p>
                        </Disclosure>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-[#F9FAFB] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
              {lang === 'ar' ? 'مسار التسهيلات الاستشارية' : lang === 'zh' ? '咨询服务流程' : lang === 'ckb' ? 'ڕێڕەوی ئاسانکاری ڕاوێژکاری' : 'Facilitation Flow'}
            </h2>
            <p className="text-[#4B5563] max-w-2xl mx-auto font-medium">
              {lang === 'ar' ? 'عملية هيكلية تضمن الامتثال التنظيمي والوضوح المالي في كل مرحلة من مراحل دورة حياة الاستثمار.' : 
               lang === 'zh' ? '确保投资生命周期每个阶段监管合规和财务清晰的结构化流程。' : 
               lang === 'ckb' ? 'پرۆسەیەکی ڕێکخراو کە پابەندبوونی ڕێکخراوەیی و ڕوونی دارایی لە هەر قۆناغێکی خولی ژیانی وەبەرهێناندا مسۆگەر دەکات.' : 
               'A structured process ensuring regulatory compliance and financial clarity at every stage of the investment lifecycle.'}
            </p>
          </div>

          <div className="relative">
            {/* Desktop Connector Line */}
            <div className="hidden lg:block absolute top-[28px] left-8 right-8 h-0.5 bg-gray-200" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
              {[
                { title: { en: 'Inquiry', ar: 'الطلب', zh: '咨询提交', ckb: 'داواکاری' }, body: { en: 'Inquiry form submitted. Reference generated.', ar: 'تقديم نموذج الطلب. توليد رقم المرجع.', zh: '提交咨询表。生成参考号。', ckb: 'فۆرمی داواکاری پێشکەش کرا. ژمارەی ئاماژە دروست کرا.' } },
                { title: { en: 'Assessment', ar: 'التقييم', zh: '初步评估', ckb: 'هەڵسەنگاندن' }, body: { en: 'Goals, sector, and capital range reviewed.', ar: 'مراجعة الأهداف والقطاع ونطاق رأس المال.', zh: '审查目标、行业和资金范围。', ckb: 'ئامانجەکان، کەرت و مەودای سەرمایە پێداچوونەوەی بۆ کرا.' } },
                { title: { en: 'Mapping', ar: 'تخطيط القوانين', zh: '法规映射', ckb: 'نەخشاندن' }, body: { en: 'Regulatory frameworks mapped to the case.', ar: 'تخطيط الأطر التنظيمية للحالة.', zh: '将监管框架映射到具体案例。', ckb: 'چوارچێوە ڕێکخراوەییەکان بۆ کەیسەکە نەخشێنران.' } },
                { title: { en: 'Structuring', ar: 'الهيكلة', zh: '财务结构设计', ckb: 'ڕێکخستن' }, body: { en: 'Vehicle, capital flow, and tax design.', ar: 'تصميم هيكل الاستثمار وتدفق رأس المال والضرائب.', zh: '设计投资主体、资金流和税务结构。', ckb: 'ڕێکخستنی وەبەرهێنان، ڕۆیشتنی سەرمایە و دیزاینی باج.' } },
                { title: { en: 'Documentation', ar: 'الوثائق', zh: '文档准备', ckb: 'بەڵگەنامەکان' }, body: { en: 'Required documentation prepared and verified.', ar: 'إعداد والتحقق من الوثائق المطلوبة.', zh: '准备并核实所需文件。', ckb: 'بەڵگەنامە پێویستەکان ئامادەکران و پشتڕاستکرانەوە.' } },
                { title: { en: 'Advisory', ar: 'الجلسة الاستشارية', zh: '专家咨询', ckb: 'ڕاوێژکاری' }, body: { en: 'Structured session with ICA consultancy team.', ar: 'جلسة منظمة مع فريق استشارات الوكالة.', zh: '与伊中机构咨询团队进行结构化会谈。', ckb: 'دانیشتنی ڕێکخراو لەگەڵ تیمی ڕاوێژکاری ئاژانس.' } },
                { title: { en: 'Implementation', ar: 'التنفيذ', zh: '执行支持', ckb: 'جێبەجێکردن' }, body: { en: 'Coordination with banking and regulatory sides.', ar: 'التنسيق مع الجهات المصرفية والتنظيمية.', zh: '协调银行和监管方。', ckb: 'هەماهەنگی لەگەڵ لایەنە بانکی و ڕێکخراوەییەکان.' } },
                { title: { en: 'Ongoing', ar: 'الدعم المستمر', zh: '持续支持', ckb: 'بەردەوام' }, body: { en: 'Periodic review and re-advisory.', ar: 'مراجعة دورية وإعادة استشارة.', zh: '定期审查和再次咨询。', ckb: 'پێداچوونەوەی خولی و دووبارە ڕاوێژکاری.' } }
              ].map((step, idx) => (
                <motion.div 
                  key={idx} 
                  {...fadeIn}
                  transition={{ delay: idx * 0.1 }}
                  className="relative group"
                >
                  <div className="flex flex-col items-center lg:items-start text-center lg:text-left rtl:lg:text-right">
                    <div className="w-14 h-14 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-black font-black text-xl mb-6 relative z-10 group-hover:border-[brand-800] transition-colors">
                      {idx + 1}
                    </div>
                    <h4 className="text-lg font-black text-black uppercase tracking-tight mb-2">{step.title[lang] || step.title.en}</h4>
                    <p className="text-xs font-medium text-[#4B5563] leading-relaxed max-w-[200px]">{step.body[lang] || step.body.en}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legal Footer Mini */}
      <section className="py-12 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed max-w-4xl mx-auto">
            {lang === 'ar' ? 'الوكالة العراقية الصينية (ICA) ومركز الدراسات (CISE) ليسوا مكاتب محاماة أو مستشارين ماليين مرخصين. جميع المعلومات مقدمة لأغراض استشارية وتسهيلية فقط. يجب التحقق من جميع المطالبات القانونية من المصادر الرسمية.' : 
             lang === 'zh' ? '伊中机构 (ICA) 和中伊研究所 (CISE) 不是律师事务所或持牌财务顾问。所有信息仅供咨询和促进之用。所有法律声明均应从官方渠道核实。' : 
             lang === 'ckb' ? 'ئاژانسی عێراقی - چینی (ICA) و پەیمانگای (CISE) نووسینگەی یاسایی یان ڕاوێژکاری دارایی مۆڵەتپێدراو نین. هەموو زانیارییەکان تەنها بۆ مەبەستی ڕاوێژکاری و ئاسانکارییە. پێویستە هەموو بانگەشە یاساییەکان لە سەرچاوە فەرمییەکانەوە پشتڕاست بکرێنەوە.' : 
             'The Iraqi-Chinese Agency (ICA) and the Institute (CISE) are not law firms or licensed financial advisers. All information is provided for advisory and facilitation purposes only. All legal claims should be verified from official sources.'}
          </p>
          <div className="mt-8">
             <Link to={`/${lang}/consultancy/legal`} className="text-[brand-800] hover:underline text-[10px] font-black uppercase tracking-widest">
               {lang === 'ar' ? 'عرض الإخلاء القانوني الكامل' : lang === 'zh' ? '查看完整法律声明' : lang === 'ckb' ? 'بینینی تەواوی دەقی یاسایی' : 'View Full Legal Disclaimer'}
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
