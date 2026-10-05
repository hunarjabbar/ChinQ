import React from 'react';
import { Locale } from '../../types';
import { useI18n } from '../../hooks/useI18n';
import { Link, useParams } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Disclosure } from '../../components/consultancy/Disclosure';

export function ConsultancyIraqBound() {
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

  const sectors = [
    {
      id: 'energy',
      icon: Icons.HardHat,
      title: { en: 'Energy & Petrochemicals', ar: 'الطاقة والبتروكيماويات', zh: '能源与石化', ckb: 'وزە و پێترۆکیمیاوی' },
      body: { 
        en: "Iraq holds some of the world's largest oil and natural gas reserves but does not produce enough electricity to meet demand.",
        ar: "يمتلك العراق بعضاً من أكبر احتياطيات النفط والغاز الطبيعي في العالم ولكنه لا ينتج ما يكفي من الكهرباء لتلبية الطلب.",
        zh: "伊拉克拥有世界上一些最大的石油和天然气储量，但其电力产量不足以满足需求。",
        ckb: "عێراق هەندێک لە گەورەترین یەدەگی نەوت و غازی سروشتی جیهانی هەیە بەڵام کارەبای پێویست بەرهەم ناهێنێت بۆ پڕکردنەوەی پێداویستییەکان."
      },
      details: {
        en: "Numerous commercial opportunities exist to strengthen Iraq's electricity sector, improve the distribution grid, and supply natural gas to power plants. Specific focus on modular refineries and renewable energy integration.",
        ar: "توجد العديد من الفرص التجارية لتعزيز قطاع الكهرباء في العراق، وتحسين شبكة التوزيع، وتوريد الغاز الطبيعي لمحطات الطاقة. تركيز خاص على المصافي النمطية وتكامل الطاقة المتجددة.",
        zh: "加强伊拉克电力部门、改善配电网和向发电厂供应天然气的商业机会非常多。重点关注模块化炼油厂和可再生能源整合。",
        ckb: "دەرفەتی بازرگانی زۆر هەن بۆ بەهێزکردنی کەرتی کارەبای عێراق، باشترکردنی تۆڕی دابەشکردن، و دابینکردنی غازی سروشتی بۆ وێستگەکانی کارەبا. جەختی تایبەت لەسەر پاڵاوگە مۆدیولارەکان و تێکەڵکردنی وزەی نوێبووەوە."
      }
    },
    {
      id: 'infrastructure',
      icon: Icons.Building2,
      title: { en: 'Construction & Infrastructure', ar: 'البناء والبنية التحتية', zh: '建筑与基础设施', ckb: 'بیناسازی و ژێرخان' },
      body: { 
        en: "Roads, bridges, ports, housing, and smart cities under Iraq's Development Road initiative.",
        ar: "الطرق والجسور والموانئ والإسكان والمدن الذكية ضمن مبادرة طريق التنمية العراقية.",
        zh: "伊拉克“发展之路”倡议下的道路、桥梁、港口、住房和智能城市。",
        ckb: "ڕێگاوبان، پرد، بەندەر، نیشتەجێبوون، و شارە زیرەکەکان لە چوارچێوەی دەستپێشخەری ڕێگای گەشەپێدانی عێراق."
      },
      details: {
        en: "Focus on Al-Faw Grand Port connections and the strategic railway corridor linking Basra to the northern borders.",
        ar: "التركيز على اتصالات ميناء الفاو الكبير وممر السكك الحديدية الاستراتيجي الذي يربط البصرة بالحدود الشمالية.",
        zh: "重点关注法奥大港的连接以及连接巴士拉至北部边界的战略铁路走廊。",
        ckb: "جەختکردنەوە لەسەر پەیوەندییەکانی بەندەری گەورەی فاو و ڕێڕەوی هێڵی ئاسنی ستراتیژی کە بەسرە بە سنوورەکانی باکوورەوە دەبەستێتەوە."
      }
    },
    {
      id: 'agriculture',
      icon: Icons.Sprout,
      title: { en: 'Agriculture & Food Security', ar: 'الزراعة والأمن الغذائي', zh: '农业与粮食安全', ckb: 'کشتوکاڵ و ئاسایشی خۆراک' },
      body: { en: 'Irrigation, seeds, machinery, and food processing.', ar: 'الري والبذور والآلات وتصنيع الأغذية.', zh: '灌溉、种子、机械和食品加工。', ckb: 'ئاودێری، تۆو، ئامێرەکان، و پرۆسێسکردنی خۆراک.' },
      details: {
        en: "Implementation of modern water management systems and bilateral pilot farms for high-yield grain production.",
        ar: "تنفيذ أنظمة إدارة المياه الحديثة والمزارع التجريبية الثنائية لإنتاج الحبوب عالي الغلة.",
        zh: "实施现代化水管理系统和高产粮食生产双边示范农场。",
        ckb: "جێبەجێکردنی سیستەمی مۆدێرنی بەڕێوەبردنی ئاو و کێڵگە ئەزموونییە دوولایەنەکان بۆ بەرهەمهێنانی دانەوێڵەی پڕ بەرهەم."
      }
    },
    {
      id: 'technology',
      icon: Icons.Cpu,
      title: { en: 'Technology & Digital Silk Road', ar: 'التكنولوجيا وطريق الحرير الرقمي', zh: '技术与数字丝绸之路', ckb: 'تەکنەلۆژیا و ڕێگای ئاوریشمی دیجیتاڵی' },
      body: { en: 'AI, telecoms, fintech, e-commerce, and data centers.', ar: 'الذكاء الاصطناعي والاتصالات والتكنولوجيا المالية والتجارة الإلكترونية ومراكز البيانات.', zh: '人工智能、电信、金融科技、电子商务和数据中心。', ckb: 'زیرەکی دەستکرد، پەیوەندییەکان، فینتەک، بازرگانی ئەلیکترۆنی، و ناوەندەکانی داتا.' },
      details: {
        en: "Strategic deployment of 5G infrastructure and localized cloud storage solutions aligned with Iraq's digital sovereignty laws.",
        ar: "النشر الاستراتيجي للبنية التحتية لجيل الخامس وحلول التخزين السحابي المحلية المتوافقة مع قوانين السيادة الرقمية العراقية.",
        zh: "符合伊拉克数字主权法的5G基础设施战略部署和本地化云存储解决方案。",
        ckb: "بڵاوکردنەوەی ستراتیژی ژێرخانی 5G و چارەسەرە لۆکاڵییەکانی کۆگای هەور کە لەگەڵ یاساکانی سەروەری دیجیتاڵی عێراق دەگونجێت."
      }
    }
  ];

  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-[brand-100] selection:text-[#991B1B]">
      {/* Page Header */}
      <header className="py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeIn} className="max-w-3xl space-y-4">
             <div className="flex items-center gap-2 text-[brand-800] font-black uppercase tracking-widest text-xs">
               <Icons.Building2 size={16} />
               <span>{lang === 'ar' ? 'مسار العراق' : lang === 'zh' ? '伊拉克方向' : lang === 'ckb' ? 'ئاراستەی عێراق' : 'Iraq-Bound Route'}</span>
             </div>
             <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
               {lang === 'ar' ? 'الاستثمار في العراق وإقليم كردستان' : lang === 'zh' ? '投资伊拉克与库尔德地区' : lang === 'ckb' ? 'وەبەرهێنان لە عێراق و هەرێمی کوردستان' : 'Investing in Iraq & Kurdistan'}
             </h1>
             <p className="text-lg text-[#4B5563] font-medium leading-relaxed">
               {lang === 'ar' ? 'دليل شامل للمستثمرين الصينيين حول الأطر القانونية والحوافز المالية والفرص القطاعية في جمهورية العراق.' : 
                lang === 'zh' ? '为中国投资者提供的关于伊拉克共和国法律框架、财务激励和行业机会的综合指南。' : 
                lang === 'ckb' ? 'ڕێبەرێکی گشتگیر بۆ وەبەرهێنەرانی چینی دەربارەی چوارچێوە یاساییەکان، هاندەرە داراییەکان و دەرفەتە کەرتەییەکان لە کۆماری عێراق.' : 
                'A comprehensive guide for Chinese investors on legal frameworks, financial incentives, and sectoral opportunities in the Republic of Iraq.'}
             </p>
          </motion.div>
        </div>
      </header>

      {/* Law Frameworks Section */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             {/* Federal Iraq */}
             <motion.div {...fadeIn} className="space-y-6">
                <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white">
                      <Icons.Landmark size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-tight leading-tight">Federal Iraq</h2>
                      <p className="text-xs font-bold text-[brand-800] uppercase tracking-widest">National Investment Law (13/2006)</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-[#4B5563] leading-relaxed">
                      Federal Iraq administers foreign direct investment under a framework that offers significant tax and customs exemptions for projects with valid investment permits.
                    </p>
                    <Disclosure label="View Legal Framework Details" variant="block">
                      <ul className="list-disc pl-5 space-y-2 text-xs font-medium">
                        <li>Projects with investment permits enjoy fee exemptions for three years on imported assets.</li>
                        <li>Ten years of tax exemptions starting from the date of commercial operations.</li>
                        <li>Foreign investors may remit profits and proceeds out of Iraq in accordance with CBI regulations.</li>
                        <li>Foreigners may buy or sell shares on the Iraq Stock Exchange (ISX).</li>
                        <li>Note: LLCs in Federal Iraq are generally required to hold at least 51% Iraqi shareholding capital.</li>
                      </ul>
                      <div className="pt-4 border-t border-gray-100 mt-4">
                        <a href="https://investiraq.gov.iq/investment-law/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-[brand-800] hover:underline">
                          Official NIC Source <Icons.ArrowRight size={12} />
                        </a>
                      </div>
                    </Disclosure>
                  </div>
                </div>
             </motion.div>

             {/* Kurdistan Region */}
             <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="space-y-6">
                <div className="p-8 bg-white border border-[brand-800]/20 rounded-2xl shadow-sm relative overflow-hidden">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[brand-800] rounded-lg flex items-center justify-center text-white">
                      <Icons.Landmark size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-tight leading-tight">Kurdistan Region</h2>
                      <p className="text-xs font-bold text-[brand-800] uppercase tracking-widest">Investment Law (4/2006)</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-[#4B5563] leading-relaxed">
                      The Kurdistan Region operates under a distinct investment law offering 100% foreign ownership and extended customs exemptions.
                    </p>
                    <Disclosure label="View Legal Framework Details" variant="block">
                      <ul className="list-disc pl-5 space-y-2 text-xs font-medium">
                        <li>Foreign investors may own 100% of the capital of any project established in the Region.</li>
                        <li>10-year exemption from all non-custom taxes and duties from the date of production.</li>
                        <li>5-year exemption on imported raw materials from customs duties.</li>
                        <li>Guaranteed capital repatriation and profit transfer in foreign currency.</li>
                        <li>Long-term land leases of up to 50 years at promotional rates.</li>
                        <li>Investor residency permits valid for 3–5 years for the investor and family.</li>
                      </ul>
                      <div className="pt-4 border-t border-gray-100 mt-4">
                        <a href="https://investkurdistan.gov.krd/laws-regulations/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-[brand-800] hover:underline">
                          Official KBOI Source <Icons.ArrowRight size={12} />
                        </a>
                      </div>
                    </Disclosure>
                  </div>
                  {/* Subtle KRI flag-like red accent */}
                  <div className="absolute top-0 right-0 w-1 h-full bg-[brand-800]" />
                </div>
             </motion.div>
           </div>
        </div>
      </section>

      {/* Comparison Chart (Visual Simulation) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-center">Bilateral Investment Comparison</h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-12">
             {[
               { label: 'Foreign Ownership Allowed', fed: 51, kri: 100, unit: '%' },
               { label: 'Tax Exemption Period', fed: 10, kri: 10, unit: ' Years' },
               { label: 'Customs Exemption (Machinery)', fed: 3, kri: 5, unit: ' Years' },
               { label: 'Land Lease Duration', fed: 50, kri: 50, unit: ' Years' }
             ].map((item, idx) => (
               <div key={idx} className="space-y-4">
                 <div className="flex justify-between items-end">
                   <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                   <div className="flex gap-4 text-[10px] font-bold">
                     <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-black" /> Federal Iraq</span>
                     <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[brand-800]" /> Kurdistan Region</span>
                   </div>
                 </div>
                 <div className="h-12 w-full bg-gray-50 rounded-lg p-2 space-y-1">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.fed}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-3.5 bg-black rounded-sm flex items-center px-2"
                    >
                      <span className="text-[8px] font-black text-white">{item.fed}{item.unit}</span>
                    </motion.div>
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.kri}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                      className="h-3.5 bg-[brand-800] rounded-sm flex items-center px-2"
                    >
                      <span className="text-[8px] font-black text-white">{item.kri}{item.unit}</span>
                    </motion.div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Sector Opportunities Grid */}
      <section className="py-24 bg-[#F9FAFB] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">Sector Opportunities</h2>
            <p className="text-[#4B5563] max-w-2xl mx-auto font-medium">Strategic industries identified by the ICA and CISE for prioritized bilateral facilitation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sectors.map((sector) => (
              <motion.div key={sector.id} {...fadeIn} className="bg-white p-8 border border-gray-200 rounded-2xl hover:border-[brand-800] transition-all group">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[brand-800] group-hover:bg-[brand-800] group-hover:text-white transition-colors shrink-0">
                    <sector.icon size={24} />
                  </div>
                  <div className="space-y-4 flex-grow">
                    <h3 className="text-xl font-black uppercase tracking-tight">{sector.title[lang] || sector.title.en}</h3>
                    <p className="text-sm font-medium text-[#4B5563] leading-relaxed">{sector.body[lang] || sector.body.en}</p>
                    <Disclosure label={lang === 'ar' ? 'اعرف المزيد عن القطاع' : lang === 'zh' ? '了解更多行业细节' : lang === 'ckb' ? 'زیاتر بزانە' : "Learn More Details"} variant="inline">
                      <p className="text-xs">{sector.details[lang] || sector.details.en}</p>
                    </Disclosure>
                    <div className="pt-4">
                      <Link 
                        to={`/${lang}/consultancy/inquiry?sector=${sector.id}`} 
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black hover:text-[brand-800] transition-colors"
                      >
                        {lang === 'ar' ? 'طلب استشارة ←' : lang === 'zh' ? '申请咨询 ←' : lang === 'ckb' ? 'داواکردنی ڕاوێژکاری ←' : 'Request Advisory →'}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefit Meters */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {[
               { label: 'Tax Exemption', value: 100, desc: '10 Years (Federal & KRI)' },
               { label: 'Foreign Ownership', value: 100, desc: '100% (Kurdistan Region)' },
               { label: 'Capital Repatriation', value: 100, desc: 'Full Rights Guaranteed' },
               { label: 'Residency Permit', value: 80, desc: '3–5 Years Renewable' }
             ].map((meter, idx) => (
               <div key={idx} className="space-y-4">
                 <div className="flex justify-between items-center">
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{meter.label}</span>
                   <span className="text-[10px] font-black text-[brand-800]">{meter.value}%</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: `${meter.value}%` }}
                     viewport={{ once: true }}
                     transition={{ duration: 1, ease: "circOut" }}
                     className="h-full bg-[brand-800]"
                   />
                 </div>
                 <p className="text-[10px] font-bold text-gray-500 uppercase">{meter.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
}
