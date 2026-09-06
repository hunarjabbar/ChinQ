import { useState } from 'react';
import { Locale } from '../types';
import { Download, FileText, CheckCircle2 } from 'lucide-react';

export function InvestIraq({ lang }: { lang: Locale }) {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState<string | null>(null);

  const handleDownload = (docId: 'iraq' | 'krg') => {
    setDownloading(docId);
    
    setTimeout(() => {
      setDownloading(null);
      setDownloaded(docId);
      
      const links = {
        iraq: 'https://investpromo.gov.iq/wp-content/uploads/2013/05/Investment-Law-No.-13-For-2006.pdf',
        krg: 'https://moi.gov.krd/wp-content/uploads/2019/12/Investment-Law.pdf'
      };

      window.open(links[docId], '_blank', 'noopener,noreferrer');
      
      // Reset the success state after a brief delay
      setTimeout(() => setDownloaded(null), 3000);
    }, 800);
  };

  return (
    <section className="bg-brand-800 text-white p-4 sm:p-6 md:p-8 w-full relative overflow-hidden rounded-xs shadow-xs border-t-4 border-brand-900 space-y-8">
      {/* Sophisticated background depth */}
      <div className="absolute inset-0 bg-linear-to-br from-brand-900/40 via-transparent to-black/20" />
      
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none rotate-12">
        <svg width="400" height="400" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="100" fill="currentColor" />
        </svg>
      </div>

      <div className="w-full relative z-10 space-y-6">
        {/* Pulsing Big White Banner for Invest in Iraq & Kurdistan Region */}
        <div className="text-center py-4 px-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl animate-pulse">
          <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.3em] uppercase text-brand-200 block mb-1">
            {lang === 'ar' ? 'بوابة الفرص الاستثمارية السيادية' : lang === 'zh' ? '主权投资机遇专区' : lang === 'ckb' ? 'دەروازەی هەلی وەبەرهێنانی سەرەکی' : 'Sovereign Investment Gateway'}
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight">
            INVEST IN IRAQ & KURDISTAN REGION
          </h1>
        </div>

        <div className="text-[11px] font-mono text-white/40 uppercase tracking-[0.4em] mb-2 flex items-center gap-3">
          <span className="w-8 h-px bg-white/20" />
          {lang === 'ar' ? 'مبادرة الاستثمار الاستراتيجية' : lang === 'zh' ? '战略投资倡议' : lang === 'ckb' ? 'دەستپێشخەری وەبەرهێنانی ستراتیژی' : 'Strategic Investment Initiative'}
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black mb-8 leading-tight tracking-tighter drop-shadow-md">
          {lang === 'ar' ? 'مشاريع البنية التحتية والاستثمار الثنائية' : lang === 'zh' ? '中伊双边战略项目与基础设施通道' : lang === 'ckb' ? 'پڕۆژە ستراتیژی و ژێرخانی ئابوورییە دووقۆڵییەکان' : 'Bilateral Strategic Projects & Infrastructure Hub'}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 text-sm leading-relaxed">
          <div className="space-y-6">
            <p className="text-xl sm:text-2xl text-white font-medium leading-tight border-l-4 border-white/30 pl-6 py-2 italic rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-6">
              {lang === 'ar' ? 'بوابة الشركات والمؤسسات الصينية لتأمين مشاريع استراتيجية في أسواق العراق الناشئة وفق قانون الاستثمار.' : lang === 'zh' ? '中国企业和基金会在伊拉克新兴市场开展战略性项目合作的专属通道，依托具有竞争力的投资法保护。' : lang === 'ckb' ? 'دەروازەی کۆمپانیا و دامەزراوە چینییەکان بۆ بەدەستهێنانی پرۆژەی ستراتیژی لە بازاڕە گەشەسەندووەکانی عێراق بەپێی یاسای وەبەرهێنان.' : 'A sovereign gateway for Chinese global corporations to secure tier-one strategic assets in Iraq’s emerging industrial and energy markets.'}
            </p>
            <p className="text-white/80 text-base leading-relaxed">
              {lang === 'ar' ? 'يقدم العراق إعفاءات ضريبية تصل إلى ١٠ سنوات وتخصيصات أراضي بأسعار تنافسية ضمن مبادرة الحزام والطريق، مما يعزز أمان رأس المال ويسهل تحويل الأرباح للمستثمرين الدوليين.' : lang === 'zh' ? '在“一带一路”倡议框架下，伊拉克提供长达10年的免税优惠以及具竞争力的土地分配政策，确保资本安全并便利国际投资者的利润汇出。' : lang === 'ckb' ? 'عێراق لێخۆشبوونی باج تا ١٠ ساڵ و تەرخانکردنی زەوی بە نرخی کێبڕکێکارانە پێشکەش دەکات لە چوارچێوەی دەستپێشخەری پشتێن و ڕێگا، ئەمەش ئاسایشی سەرمايە بەهێز دەکات و گواستنەوەی قازانج بۆ وەبەرهێنەرانی نێودەوڵەتی ئاسان دەکات.' : 'Under the strategic Belt and Road framework, Iraq provides a 10-year fiscal immunity window and priority land sovereign allocations, guaranteeing full capital protection and seamless repatriation of global yields.'}
            </p>

            {/* Investment Law Download Component */}
            <div className="mt-6 p-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-brand-200 shrink-0" />
                <div>
                  <h3 className="font-serif font-bold text-base text-white">
                    {lang === 'ar' ? 'قوانين الاستثمار الرسمية (جمهورية العراق وإقليم كوردستان)' : lang === 'zh' ? '伊拉克联邦与库尔德斯坦地区官方投资法案' : lang === 'ckb' ? 'یاساکانی وەبەرهێنانی فەرمی (عێراق و هەرێمی كوردستان)' : 'Official Investment Laws (Federal Iraq & KRG)'}
                  </h3>
                  <p className="text-xs text-white/70 font-mono">
                    {lang === 'ar' ? 'تنزيل الوثائق والمستندات القانونية الرسمية بصيغة نصية معتمدة' : lang === 'zh' ? '下载官方标准投资法案与双边财税豁免细则' : lang === 'ckb' ? 'داگرتنی بەڵگەنامە فەرمییەکانی یاسای وەبەرهێنان' : 'Download authenticated legislative texts & tax exemption schedules'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleDownload('iraq')}
                  disabled={downloading === 'iraq'}
                  className="w-full py-2.5 px-4 bg-white text-brand-900 hover:bg-brand-50 font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-75"
                >
                  {downloading === 'iraq' ? (
                    <span className="animate-spin w-4 h-4 border-2 border-brand-900 border-t-transparent rounded-full" />
                  ) : downloaded === 'iraq' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Download className="w-4 h-4 text-brand-800" />
                  )}
                  <span>{lang === 'ar' ? 'قانون استثمار العراق الفيدرالي' : lang === 'zh' ? '伊拉克联邦投资法' : lang === 'ckb' ? 'یاسای وەبەرهێنانی عێراقی فیدراڵ' : 'Federal Iraq Law No.13'}</span>
                </button>

                <button
                  onClick={() => handleDownload('krg')}
                  disabled={downloading === 'krg'}
                  className="w-full py-2.5 px-4 bg-brand-900 text-white hover:bg-brand-950 border border-white/20 font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-75"
                >
                  {downloading === 'krg' ? (
                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : downloaded === 'krg' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Download className="w-4 h-4 text-brand-200" />
                  )}
                  <span>{lang === 'ar' ? 'قانون استثمار إقليم كوردستان' : lang === 'zh' ? '库尔德斯坦地区投资法' : lang === 'ckb' ? 'یاسای وەبەرهێنانی هەرێمی كوردستان' : 'KRG Law No.4'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 sm:p-8 border border-white/10 rounded-xs hover:bg-white/15 transition-all duration-500 group shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
              <div className="text-4xl sm:text-5xl font-bold text-white mb-3 group-hover:scale-105 transition-transform origin-left duration-500 flex items-baseline">10<span className="text-xl opacity-40 ml-2 font-mono italic">Years</span></div>
              <div className="font-black text-white mb-2 uppercase tracking-[0.2em] text-[11px] border-b border-white/20 pb-2">
                {lang === 'ar' ? 'إعفاء ضريبي' : lang === 'zh' ? '免税期' : lang === 'ckb' ? 'لێخۆشبوونی باج' : 'Fiscal Immunity'}
              </div>
              <div className="text-[11px] text-white/50 font-mono leading-relaxed">
                {lang === 'ar' ? 'بموجب قانون الاستثمار رقم ١٣' : lang === 'zh' ? '根据第13号投资法' : lang === 'ckb' ? 'بەپێی یاسای وەبەرهێنانی ژمارە ١٣' : 'Guaranteed under Investment Law No. 13'}
              </div>
            </div>

            <div className="bg-white/5 p-6 sm:p-8 border border-white/10 rounded-xs hover:bg-white/15 transition-all duration-500 group shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
              <div className="text-4xl sm:text-5xl font-bold text-white mb-3 group-hover:scale-105 transition-transform origin-left duration-500 flex items-baseline">100<span className="text-xl opacity-40 ml-2 font-mono italic">%</span></div>
              <div className="font-black text-white mb-2 uppercase tracking-[0.2em] text-[11px] border-b border-white/20 pb-2">
                {lang === 'ar' ? 'تحويل الأرباح' : lang === 'zh' ? '利润汇出' : lang === 'ckb' ? 'گواستنەوەی قازانج' : 'Yield Repatriation'}
              </div>
              <div className="text-[11px] text-white/50 font-mono leading-relaxed">
                {lang === 'ar' ? 'حرية كاملة لتحويل رأس المال' : lang === 'zh' ? '完全自由的资本和利润转移' : lang === 'ckb' ? 'ئازادی تەواو بۆ گواستنەوەی سەرمایە' : 'Full constitutional freedom of capital transfer'}
              </div>
            </div>

            <div className="bg-white/5 p-6 sm:p-8 border border-white/10 rounded-xs hover:bg-white/15 transition-all duration-500 group shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
              <div className="text-4xl sm:text-5xl font-bold text-white mb-3 group-hover:scale-105 transition-transform origin-left duration-500 flex items-baseline">B&R</div>
              <div className="font-black text-white mb-2 uppercase tracking-[0.2em] text-[11px] border-b border-white/20 pb-2">
                {lang === 'ar' ? 'الحزام والطريق' : lang === 'zh' ? '一带一路' : lang === 'ckb' ? 'پشتێن و ڕێگا' : 'Strategic Corridor'}
              </div>
              <div className="text-[11px] text-white/50 font-mono leading-relaxed">
                {lang === 'ar' ? 'شراكة استراتيجية وتجارية' : lang === 'zh' ? '战略与商业伙伴关系' : lang === 'ckb' ? 'هاوبەشی ستراتیژی و بازرگانی' : 'Tier-one global infrastructure partnership'}
              </div>
            </div>

            <div className="bg-white/5 p-6 sm:p-8 border border-white/10 rounded-xs hover:bg-white/15 transition-all duration-500 group shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
              <div className="text-4xl sm:text-5xl font-bold text-white mb-3 group-hover:scale-105 transition-transform origin-left duration-500 flex items-baseline">LAND</div>
              <div className="font-black text-white mb-2 uppercase tracking-[0.2em] text-[11px] border-b border-white/20 pb-2">
                {lang === 'ar' ? 'تخصيص الأراضي' : lang === 'zh' ? '土地分配' : lang === 'ckb' ? 'تەرخانکردنی زەوی' : 'Sovereign Land'}
              </div>
              <div className="text-[11px] text-white/50 font-mono leading-relaxed">
                {lang === 'ar' ? 'تسهيلات مجانية أو مدعومة' : lang === 'zh' ? '免费或提供大量补贴的设施' : lang === 'ckb' ? 'ئاسانکاری بێبەرامبەر یان پاڵپشتیکراو' : 'Priority industrial zone allocations'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
