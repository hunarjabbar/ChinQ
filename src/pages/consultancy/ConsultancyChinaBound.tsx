import React from 'react';
import { Locale } from '../../types';
import { useI18n } from '../../hooks/useI18n';
import { Link, useParams } from 'react-router-dom';
import { Globe, Cpu, Factory, Battery, ShoppingBag, Landmark, ArrowRight, Info, Scale, ShieldCheck, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Disclosure } from '../../components/consultancy/Disclosure';

export function ConsultancyChinaBound() {
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

  const investorTypes = [
    {
      id: 'corporate',
      title: { en: 'Corporate Investors', ar: 'مستثمرو الشركات', zh: '企业投资者', ckb: 'وەبەرهێنەرانی کۆمپانیا' },
      body: { en: 'Iraqi companies seeking to establish subsidiaries or joint ventures in China.', ar: 'الشركات العراقية التي تسعى لتأسيس شركات تابعة أو مشاريع مشتركة في الصين.', zh: '寻求在中国设立子公司或合资企业的伊拉克公司。', ckb: 'کۆمپانیا عێراقییەکان کە دەیانەوێت کۆمپانیای لق یان پڕۆژەی هاوبەش لە چین دابمەزرێنن.' },
      details: { en: "Full support for WFOE (Wholly Foreign-Owned Enterprise) registration and joint venture negotiations in key industrial clusters like Yiwu, Guangzhou, and Shenzhen.", ar: "دعم كامل لتسجيل الشركات المملوكة للأجانب بالكامل (WFOE) ومفاوضات المشاريع المشتركة في التجمعات الصناعية الرئيسية.", zh: "为义乌、广州和深圳等主要产业集群的外商独资企业（WFOE）注册和合资谈判提供全方位支持。", ckb: "پشتگیری تەواو بۆ تۆمارکردنی کۆمپانیای خاوەندارییەتی بیانی (WFOE) و دانوستاندنی پڕۆژە هاوبەشەکان." }
    },
    {
      id: 'family',
      title: { en: 'Family Offices', ar: 'المكاتب العائلية', zh: '家族办公室', ckb: 'نووسینگەی خێزانی' },
      body: { en: 'Private wealth structures seeking diversified exposure to Chinese equities and real estate.', ar: 'هياكل الثروة الخاصة التي تسعى لتنويع الاستثمار في الأسهم العقارية والصينية.', zh: '寻求在中国股票和房地产领域进行多元化投资的私人财富机构。', ckb: 'پێکهاتەکانی سامانی تایبەت کە بەدوای وەبەرهێنانی جۆراوجۆردا دەگەڕێن لە پشک و خانوبەرەی چین.' },
      details: { en: "Advisory on cross-border wealth management and private placement opportunities within the GBA (Guangdong-Hong Kong-Macao Greater Bay Area).", ar: "استشارات حول إدارة الثروات العابرة للحدود وفرص الاكتتاب الخاص ضمن منطقة الخليج الكبرى.", zh: "为粤港澳大湾区内的跨境财富管理和私募机会提供咨询。", ckb: "ڕاوێژکاری لەسەر بەڕێوەبردنی سامانی سنووربەزێن و دەرفەتەکانی دانانی تایبەت." }
    }
  ];

  const sectors = [
    { id: 'tech', icon: Cpu, title: { en: 'Technology & AI', ar: 'التكنولوجيا والذكاء الاصطناعي', zh: '技术与人工智能', ckb: 'تەکنەلۆژیا و زیرەکی دەستکرد' }, body: { en: "China's AI sector has experienced explosive IPO growth.", ar: "شهد قطاع الذكاء الاصطناعي في الصين نمواً هائلاً في الاكتتابات العامة.", zh: "中国的人工智能行业经历了爆发性的IPO增长。", ckb: "کەرتی زیرەکی دەستکرد لە چین گەشەیەکی تەقینەوەیی لە پشکە گشتییەکاندا بەخۆیەوە بینیوە." } },
    { id: 'energy', icon: Battery, title: { en: 'Green Energy & EV', ar: 'الطاقة الخضراء والسيارات الكهربائية', zh: '绿色能源与电动汽车', ckb: 'وزەی سەوز و ئۆتۆمبێلی کارەبایی' }, body: { en: "New-energy vehicles, solar, and battery technology.", ar: "مركبات الطاقة الجديدة، الطاقة الشمسية، وتكنولوجيا البطاريات.", zh: "新能源汽车、太阳能和电池技术。", ckb: "ئۆتۆمبێلە نوێیەکانی وزە، وزەی خۆر، و تەکنەلۆژیای پاتری." } },
    { id: 'consumer', icon: ShoppingBag, title: { en: 'Consumer Goods', ar: 'السلع الاستهلاكية', zh: '消费品', ckb: 'کاڵا بەکاربەرەکان' }, body: { en: "China's vast consumer market and digital retail ecosystem.", ar: "سوق الاستهلاك الواسع في الصين ونظام التجارة الرقمي.", zh: "中国庞大的消费市场和数字零售生态系统。", ckb: "بازاڕی بەرفراوانی بەکاربەری چین و سیستەمی فرۆشتنی دیجیتاڵی." } }
  ];

  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-[brand-100] selection:text-[#991B1B]">
      {/* Page Header */}
      <header className="py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeIn} className="max-w-3xl space-y-4">
             <div className="flex items-center gap-2 text-[brand-800] font-black uppercase tracking-widest text-xs">
               <Globe size={16} />
               <span>{lang === 'ar' ? 'مسار الصين' : lang === 'zh' ? '中国方向' : lang === 'ckb' ? 'ئاراستەی چین' : 'China-Bound Route'}</span>
             </div>
             <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
               {lang === 'ar' ? 'الاستثمار في جمهورية الصين الشعبية' : lang === 'zh' ? '投资中华人民共和国' : lang === 'ckb' ? 'وەبەرهێنان لە کۆماری گەلی چین' : 'Investing in PR China'}
             </h1>
             <p className="text-lg text-[#4B5563] font-medium leading-relaxed">
               {lang === 'ar' ? 'دليل استراتيجي للمستثمرين العراقيين حول قانون الاستثمار الأجنبي الصيني، والوصول إلى الأسواق، وفرص النمو العالية.' : 
                lang === 'zh' ? '为伊拉克投资者提供的关于中国外商投资法、市场准入和高增长机会的战略指南。' : 
                lang === 'ckb' ? 'ڕێبەرێکی ستراتیژی بۆ وەبەرهێنەرانی عێراقی دەربارەی یاسای وەبەرهێنانی بیانی چین، دەستڕاگەیشتن بە بازاڕ و دەرفەتەکانی گەشەکردن.' : 
                'A strategic guide for Iraqi investors on Chinese Foreign Investment Law, market access, and high-growth opportunities.'}
             </p>
          </motion.div>
        </div>
      </header>

      {/* Law Frameworks Section */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <motion.div {...fadeIn} className="bg-white p-8 border border-gray-200 rounded-2xl">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white">
                   <Scale size={24} />
                 </div>
                 <h2 className="text-2xl font-black uppercase tracking-tight">Foreign Investment Law (2020)</h2>
               </div>
               <div className="space-y-4">
                 <p className="text-sm font-medium text-[#4B5563] leading-relaxed">
                   The FIL establishes a basic framework for China's new legal system for foreign investment, affirming pre-establishment national treatment plus a negative list.
                 </p>
                 <Disclosure label="View Legal System Details" variant="block">
                   <ul className="list-disc pl-5 space-y-2 text-xs font-medium">
                     <li>Replaces legacy "Three Laws on Foreign Investment" with a unified system.</li>
                     <li>Strengthens investment protection and intellectual property rights.</li>
                     <li>Ensures a level playing field for foreign and domestic enterprises.</li>
                     <li>Consistent, transparent, and predictable market environment.</li>
                   </ul>
                   <div className="pt-4 border-t border-gray-100 mt-4">
                     <a href="http://english.mofcom.gov.cn/article/policyrelease/announcement/202001/20200102931416.shtml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-[brand-800] hover:underline">
                       Official MOFCOM Source <ArrowRight size={12} />
                     </a>
                   </div>
                 </Disclosure>
               </div>
             </motion.div>

             <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="bg-white p-8 border border-gray-200 rounded-2xl">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-[brand-800] rounded-lg flex items-center justify-center text-white">
                   <ShieldCheck size={24} />
                 </div>
                 <h2 className="text-2xl font-black uppercase tracking-tight">Market Access Negative List</h2>
               </div>
               <div className="space-y-4">
                 <p className="text-sm font-medium text-[#4B5563] leading-relaxed">
                   China updated its nationwide market access negative list in 2025, further reducing the number of restricted and prohibited industries.
                 </p>
                 <Disclosure label="View Negative List Status" variant="block">
                   <p className="text-xs font-medium mb-3">As of April 2025, the number of restricted industries was reduced from 117 to 106 across 21 sections.</p>
                   <ul className="list-disc pl-5 space-y-2 text-xs font-medium">
                     <li>Applies equally to foreign and domestic investors.</li>
                     <li>Ensures fair and equal access to non-restricted sectors.</li>
                     <li>Encouraged category offers additional incentives and simplified approvals.</li>
                   </ul>
                   <div className="pt-4 border-t border-gray-100 mt-4">
                     <a href="http://english.mofcom.gov.cn/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-[brand-800] hover:underline">
                       Official NDRC/MOFCOM Source <ArrowRight size={12} />
                     </a>
                   </div>
                 </Disclosure>
               </div>
             </motion.div>
           </div>
        </div>
      </section>

      {/* Comparison Chart (Visual Simulation) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-16">Capital Market Access Liberalization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { label: 'Min. Asset Threshold', prev: '$100M', curr: '$50M', desc: 'Lowered in 2024' },
               { label: 'Strategic Lock-up', prev: '3 Years', curr: '12 Months', desc: 'Accelerated Repatriation' },
               { label: 'Private Placement', prev: 'Restricted', curr: 'Open', desc: 'No Ratio Requirement' },
               { label: 'Derivatives', prev: 'Limited', curr: 'A-Share Options', desc: 'Hedging Enabled' }
             ].map((stat, idx) => (
               <motion.div key={idx} {...fadeIn} transition={{ delay: idx * 0.1 }} className="p-6 border border-gray-200 rounded-xl relative">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">{stat.label}</div>
                  <div className="flex flex-col items-center">
                    <div className="text-sm font-bold text-gray-400 line-through mb-1">{stat.prev}</div>
                    <div className="text-3xl font-black text-[brand-800] mb-2">{stat.curr}</div>
                  </div>
                  <div className="text-[9px] font-bold text-black uppercase tracking-widest bg-gray-50 py-1 px-2 rounded inline-block">{stat.desc}</div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Bilateral Tax Treaty Status */}
      <section className="py-24 bg-black text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               <div className="lg:w-1/2 space-y-6">
                 <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">Bilateral Tax Treaty Negotiation</h2>
                 <p className="text-gray-400 font-medium">Iraq's Council of Ministers authorised the negotiation and signing of an income tax treaty with China on 22 August 2023.</p>
                 <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-[brand-800] rounded-lg flex items-center justify-center">
                       <Landmark size={20} />
                     </div>
                     <span className="font-black uppercase tracking-tight">Status: In Negotiation</span>
                   </div>
                   <p className="text-xs text-gray-500 font-medium">As part of the external relations strategy, the Minister of Finance is authorised to finalize draft agreements to avoid double taxation and prevent tax evasion.</p>
                   <Disclosure label="View Detailed Progress" variant="inline" className="!text-gray-300">
                     <p className="text-xs text-gray-400">Negotiations focus on dividend withholding rates, capital gains treatment for infrastructure projects, and data exchange protocols between respective tax authorities.</p>
                   </Disclosure>
                 </div>
               </div>
               <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-white/5 rounded-2xl border border-white/10 p-8 flex flex-col justify-center items-center text-center space-y-4">
                    <span className="text-4xl font-black text-[brand-800]">0%</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Target Withholding on Gov. Dividends</span>
                  </div>
                  <div className="aspect-square bg-white/5 rounded-2xl border border-white/10 p-8 flex flex-col justify-center items-center text-center space-y-4">
                    <span className="text-4xl font-black text-white">2023</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Cabinet Authorisation Date</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Sector Opportunities Grid */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">Iraqi Investor Opportunities</h2>
            <p className="text-[#4B5563] max-w-2xl mx-auto font-medium">Strategic sectors in China presenting significant ROI potential for Iraqi corporate and private capital.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sectors.map((sector) => (
              <motion.div key={sector.id} {...fadeIn} className="p-8 border border-gray-200 rounded-2xl hover:border-[brand-800] transition-all group">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[brand-800] group-hover:bg-[brand-800] group-hover:text-white transition-colors mb-6">
                  <sector.icon size={24} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-4">{sector.title[lang] || sector.title.en}</h3>
                <p className="text-sm font-medium text-[#4B5563] leading-relaxed mb-6">{sector.body[lang] || sector.body.en}</p>
                <Link to={`/${lang}/consultancy/inquiry?direction=china-bound&sector=${sector.id}`} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black hover:text-[brand-800] transition-colors">
                  {lang === 'ar' ? 'استكشاف الفرصة ←' : lang === 'zh' ? '探索机会 ←' : lang === 'ckb' ? 'گەڕان بۆ دەرفەتەکان ←' : 'Explore Opportunity →'}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Investor Types */}
      <section className="py-24 bg-[#F9FAFB] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
           <div className="mb-12">
             <h2 className="text-3xl font-black uppercase tracking-tighter text-center">Iraqi Client Profiles</h2>
           </div>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {investorTypes.map((type) => (
               <motion.div key={type.id} {...fadeIn} className="bg-white p-8 border border-gray-200 rounded-2xl flex flex-col h-full">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-[brand-800]" />
                    <h3 className="text-2xl font-black uppercase tracking-tight">{type.title[lang] || type.title.en}</h3>
                 </div>
                 <p className="text-sm font-medium text-[#4B5563] leading-relaxed mb-6 flex-grow">{type.body[lang] || type.body.en}</p>
                 <Disclosure label="Learn More About Service Scope" variant="card">
                    <p className="text-xs">{type.details[lang] || type.details.en}</p>
                 </Disclosure>
               </motion.div>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
}
