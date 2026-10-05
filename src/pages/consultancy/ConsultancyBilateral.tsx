import React, { useState } from 'react';
import { Locale } from '../../types';
import { useI18n } from '../../hooks/useI18n';
import { Link, useParams } from 'react-router-dom';
import { TrendingUp, PieChart, Activity, ShieldAlert, BarChart3, ArrowRightLeft, Landmark, Wallet, Globe, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Disclosure } from '../../components/consultancy/Disclosure';

export function ConsultancyBilateral() {
  const { lang: urlLang } = useParams<{ lang: string }>();
  const normalizedLang = (urlLang === 'ck' || urlLang === 'ku') ? 'ckb' : (urlLang || 'en');
  const lang = (['en', 'ar', 'zh', 'ckb'].includes(normalizedLang) ? normalizedLang : 'en') as Locale;
  const { t } = useI18n(lang);
  const isRtl = lang === 'ar' || lang === 'ckb';

  const [simTab, setSimTab] = useState<'cn-iq' | 'iq-cn'>('cn-iq');
  const [amount, setSimAmount] = useState(1000000); // Default $1M

  const fadeIn = {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.3 }
  };

  const services = [
    { title: 'Market Entry & Licensing', body: 'Advisory on the licensing requirements for foreign brokerage firms and investment advisers in both jurisdictions.' },
    { title: 'Portfolio Structuring', body: 'Advisory on construction, allocation, and risk management for cross-border equity and fixed-income.' },
    { title: 'Custody & Settlement', body: 'Coordination with licensed custodian banks and central security depositories (CSD) in Iraq and China.' },
    { title: 'Currency & FX Management', body: 'Advisory on IQD/RMB management, hedging strategies, and bilateral capital flow structuring.' }
  ];

  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-[brand-100] selection:text-[#991B1B]">
      {/* Page Header */}
      <header className="py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeIn} className="max-w-3xl space-y-4">
             <div className="flex items-center gap-2 text-[brand-800] font-black uppercase tracking-widest text-xs">
               <TrendingUp size={16} />
               <span>Bilateral Securities Route</span>
             </div>
             <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
               Bilateral Financial Consultancy
             </h1>
             <p className="text-lg text-[#4B5563] font-medium leading-relaxed">
               Advisory services for institutional and private investors accessing the Iraq Stock Exchange (ISX) and China's A-Share markets.
             </p>
          </motion.div>
        </div>
      </header>

      {/* ISX and China Access Blocks */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <motion.div {...fadeIn} className="bg-white p-8 border border-gray-200 rounded-2xl">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white">
                   <Activity size={24} />
                 </div>
                 <h2 className="text-2xl font-black uppercase tracking-tight leading-tight">Iraq Stock Exchange (ISX) Access</h2>
               </div>
               <div className="space-y-4">
                 <p className="text-sm font-medium text-[#4B5563] leading-relaxed">
                   The Iraqi Securities Commission has launched its 2026–2028 strategy to modernize the capital market and attract foreign institutional liquidity.
                 </p>
                 <Disclosure label="View Access Protocols" variant="block">
                   <ul className="list-disc pl-5 space-y-2 text-xs font-medium">
                     <li>Foreign brokerage firms can now operate through the Tabadul platform.</li>
                     <li>Foreign investors are accepted for direct trading on the ISX.</li>
                     <li>Ongoing launch of custodian activities by foreign-licensed banks.</li>
                     <li>Transitioning from associate to full membership in IOSCO.</li>
                   </ul>
                   <div className="pt-4 border-t border-gray-100 mt-4">
                     <a href="http://www.isc.gov.iq/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-[brand-800] hover:underline">
                       Official ISC Source <ArrowRight size={12} />
                     </a>
                   </div>
                 </Disclosure>
               </div>
             </motion.div>

             <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="bg-white p-8 border border-gray-200 rounded-2xl">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-[brand-800] rounded-lg flex items-center justify-center text-white">
                   <BarChart3 size={24} />
                 </div>
                 <h2 className="text-2xl font-black uppercase tracking-tight leading-tight">China A-Share Market Access</h2>
               </div>
               <div className="space-y-4">
                 <p className="text-sm font-medium text-[#4B5563] leading-relaxed">
                   Iraqi investors can access China's capital markets via QFII, RQFII, and Stock Connect programs under liberalized 2024 regulations.
                 </p>
                 <Disclosure label="View Access Protocols" variant="block">
                   <ul className="list-disc pl-5 space-y-2 text-xs font-medium">
                     <li>Lowered asset threshold for foreign institutional investors to $50M.</li>
                     <li>Strategic investment lock-up reduced to 12 months.</li>
                     <li>Expansion of available instruments to include ETFs and Options.</li>
                     <li>Elimination of shareholding ratio requirements for private placements.</li>
                   </ul>
                   <div className="pt-4 border-t border-gray-100 mt-4">
                     <a href="http://www.csrc.gov.cn/pub/csrc_en/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-[brand-800] hover:underline">
                       Official CSRC Source <ArrowRight size={12} />
                     </a>
                   </div>
                 </Disclosure>
               </div>
             </motion.div>
           </div>
        </div>
      </section>

      {/* Bilateral Flow Diagram (SVG Visual) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Bilateral Capital Flow Architecture</h2>
          </div>
          <div className="relative h-[400px] flex items-center justify-center">
             <div className="relative w-full max-w-4xl h-full border border-gray-100 rounded-3xl bg-gray-50/30 flex items-center justify-between px-12 lg:px-24">
                {/* Left: Iraq */}
                <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="relative z-10">
                   <div className="w-32 lg:w-40 p-6 bg-white border-2 border-black rounded-2xl text-center space-y-4 shadow-xl">
                      <Landmark className="mx-auto" size={32} />
                      <div className="font-black uppercase tracking-tighter text-sm">Iraq Markets</div>
                      <div className="text-[9px] font-bold text-gray-400 uppercase">ISX • Banking • CSD</div>
                   </div>
                </motion.div>

                {/* Center: ICA */}
                <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="relative z-10">
                   <div className="w-32 lg:w-40 p-6 bg-[brand-800] border-2 border-[brand-800] rounded-2xl text-center space-y-4 shadow-2xl text-white">
                      <ShieldAlert className="mx-auto" size={32} />
                      <div className="font-black uppercase tracking-tighter text-sm">ICA Layers</div>
                      <div className="text-[9px] font-bold text-red-200 uppercase">Advisory • Compliance</div>
                   </div>
                </motion.div>

                {/* Right: China */}
                <motion.div initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="relative z-10">
                   <div className="w-32 lg:w-40 p-6 bg-white border-2 border-black rounded-2xl text-center space-y-4 shadow-xl">
                      <Globe className="mx-auto" size={32} />
                      <div className="font-black uppercase tracking-tighter text-sm">China Markets</div>
                      <div className="text-[9px] font-bold text-gray-400 uppercase">SSE • SZSE • QFII</div>
                   </div>
                </motion.div>

                {/* Flow Arrows (Red) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ direction: 'ltr' }}>
                   <motion.path 
                     initial={{ pathLength: 0 }}
                     whileInView={{ pathLength: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.5, ease: "easeInOut" }}
                     d="M 240 200 L 380 200" fill="none" stroke="brand-800" strokeWidth="2" strokeDasharray="5,5" 
                   />
                   <motion.path 
                     initial={{ pathLength: 0 }}
                     whileInView={{ pathLength: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.5, ease: "easeInOut" }}
                     d="M 520 200 L 660 200" fill="none" stroke="brand-800" strokeWidth="2" strokeDasharray="5,5" 
                   />
                </svg>
             </div>
          </div>
        </div>
      </section>

      {/* Investment Scenario Simulator */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
           <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-black">
              <div className="md:w-1/2 p-10 space-y-8 bg-gray-50 border-r border-gray-100">
                 <div className="space-y-4">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Scenario Simulator</h3>
                    <div className="flex bg-gray-200 p-1 rounded-lg">
                       <button onClick={() => setSimTab('cn-iq')} className={cn("flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-md transition-all", simTab === 'cn-iq' ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black")}>CN → IQ</button>
                       <button onClick={() => setSimTab('iq-cn')} className={cn("flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-md transition-all", simTab === 'iq-cn' ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black")}>IQ → CN</button>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Investment Principal ($)</label>
                       <input 
                         type="range" min="100000" max="100000000" step="100000" 
                         value={amount} onChange={(e) => setSimAmount(Number(e.target.value))}
                         className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[brand-800]"
                       />
                       <div className="text-xl font-black text-black">${amount.toLocaleString()}</div>
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Target Sector</label>
                       <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-[brand-800] outline-none transition-all">
                          <option>Energy & Petrochemicals</option>
                          <option>Infrastructure & Roads</option>
                          <option>Tech & Digital Silk Road</option>
                          <option>Securities & Stock Market</option>
                       </select>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Investment Horizon</label>
                       <div className="grid grid-cols-3 gap-2">
                          {['3Y', '5Y', '10Y'].map(y => (
                             <button key={y} className="py-2 border border-gray-200 rounded-lg text-[10px] font-black uppercase hover:border-[brand-800] transition-colors">{y}</button>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="md:w-1/2 p-10 flex flex-col justify-center space-y-10">
                 <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Projected Net Position</span>
                    <motion.div key={amount} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-5xl font-black tracking-tighter">
                       ${(amount * (simTab === 'cn-iq' ? 1.42 : 1.28)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </motion.div>
                    <div className="text-[10px] font-bold text-[brand-800] uppercase">Including 10-Year Tax Incentive Overlay</div>
                 </div>

                 <div className="space-y-4">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                          <span>Principal</span>
                          <span>Gain Overlay</span>
                       </div>
                       <div className="h-6 w-full flex rounded-sm overflow-hidden border border-gray-100">
                          <motion.div animate={{ width: '60%' }} className="h-full bg-black" />
                          <motion.div animate={{ width: '40%' }} className="h-full bg-[brand-800]" />
                       </div>
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium leading-relaxed italic">Estimates are based on historical sector growth and bilateral tax treaty projections. Not a guarantee of return.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Advisory Services Grid */}
      <section className="py-24 bg-[#F9FAFB] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">Advisory Scope</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <motion.div key={idx} {...fadeIn} transition={{ delay: idx * 0.1 }} className="bg-white p-8 border border-gray-200 rounded-2xl hover:border-[brand-800] transition-all">
                <h3 className="text-xl font-black uppercase tracking-tight mb-4">{service.title}</h3>
                <p className="text-sm font-medium text-[#4B5563] leading-relaxed mb-6">{service.body}</p>
                <Disclosure label="Learn More About This Service" variant="inline">
                   <p className="text-xs">Detailed advisory covers local entity formation, bank account opening protocols, and ongoing regulatory reporting to the respective commissions.</p>
                </Disclosure>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bilateral Trade Volume Animated Chart (Simplified) */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-black uppercase tracking-tighter">Bilateral Trade Growth Context</h2>
               <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-2">Historical Basis for Investment Flow</p>
            </div>
            <div className="max-w-4xl mx-auto h-[300px] border-l-2 border-b-2 border-gray-200 relative flex items-end justify-between px-8">
               {[
                 { year: '2015', val: 20 },
                 { year: '2018', val: 35 },
                 { year: '2021', val: 45 },
                 { year: '2023', val: 51.17 }
               ].map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-4 w-1/4">
                     <motion.div 
                       initial={{ height: 0 }}
                       whileInView={{ height: `${d.val * 4}px` }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.8, delay: i * 0.2 }}
                       className="w-12 bg-[brand-800] rounded-t-lg relative group"
                     >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-black text-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">${d.val}B</div>
                     </motion.div>
                     <span className="text-[10px] font-black text-gray-400">{d.year}</span>
                  </div>
               ))}
               <div className="absolute -left-12 top-1/2 -rotate-90 text-[10px] font-black uppercase text-gray-400 tracking-widest">Trade Volume (USD)</div>
            </div>
         </div>
      </section>
    </div>
  );
}
