import { Locale } from '../types';

export function InvestIraq({ lang }: { lang: Locale }) {
  return (
    <section className="bg-[#111111] text-white py-16 px-6 mt-16 w-full relative overflow-hidden border-t-4 border-[#990000]">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        {/* Abstract pattern or simple shape */}
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="100" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-[1024px] mx-auto w-full relative z-10">
        <div className="text-[10px] font-mono text-[#990000] uppercase tracking-widest mb-4">
          {lang === 'ar' ? 'مبادرة الاستثمار الاستراتيجية' : lang === 'zh' ? '战略投资倡议' : lang === 'ckb' ? 'دەستپێشخەری وەبەرهێنانی ستراتیژی' : 'Strategic Investment Initiative'}
        </div>
        
        <h2 className="text-4xl md:text-5xl font-serif font-black mb-8 leading-tight">
          {lang === 'ar' ? 'استثمر في العراق' : lang === 'zh' ? '投资伊拉克' : lang === 'ckb' ? 'وەبەرهێنان لە عێراق' : 'Invest Iraq'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm leading-relaxed text-gray-300">
          <div className="space-y-6">
            <p className="text-lg text-white font-medium">
              {lang === 'ar' ? 'بوابة الشركات والمؤسسات الصينية لتأمين مشاريع استراتيجية في أسواق العراق الناشئة وفق قانون الاستثمار.' : lang === 'zh' ? '中国企业和基金会在伊拉克新兴市场开展战略性项目合作的专属通道，依托具有竞争力的投资法保护。' : lang === 'ckb' ? 'دەروازەی کۆمپانیا و دامەزراوە چینییەکان بۆ بەدەستهێنانی پرۆژەی ستراتیژی لە بازاڕە گەشەسەندووەکانی عێراق بەپێی یاسای وەبەرهێنان.' : 'The gateway for Chinese corporations and foundations to secure strategic projects in Iraq’s emerging markets, backed by robust investment laws.'}
            </p>
            <p>
              {lang === 'ar' ? 'يقدم العراق إعفاءات ضريبية تصل إلى ١٠ سنوات وتخصيصات أراضي بأسعار تنافسية ضمن مبادرة الحزام والطريق، مما يعزز أمان رأس المال ويسهل تحويل الأرباح للمستثمرين الدوليين.' : lang === 'zh' ? '在“一带一路”倡议框架下，伊拉克提供长达10年的免税优惠以及具竞争力的土地分配政策，确保资本安全并便利国际投资者的利润汇出。' : lang === 'ckb' ? 'عێراق لێخۆشبوونی باج تا ١٠ ساڵ و تەرخانکردنی زەوی بە نرخی کێبڕکێکارانە پێشکەش دەکات لە چوارچێوەی دەستپێشخەری پشتێن و ڕێگا، ئەمەش ئاسایشی سەرمایە بەهێز دەکات و گواستنەوەی قازانج بۆ وەبەرهێنەرانی نێودەوڵەتی ئاسان دەکات.' : 'Iraq offers tax exemptions of up to 10 years and competitive land allocations under the Belt and Road Initiative, ensuring capital security and facilitating profit repatriation for international investors.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#1A1A1A] p-6 border border-gray-800 rounded-sm">
              <div className="text-3xl font-bold text-[#990000] mb-2">10<span className="text-lg"> Yrs</span></div>
              <div className="font-bold text-white mb-1">
                {lang === 'ar' ? 'إعفاء ضريبي' : lang === 'zh' ? '免税期' : lang === 'ckb' ? 'لێخۆشبوونی باج' : 'Tax Exemption'}
              </div>
              <div className="text-[11px] text-gray-500">
                {lang === 'ar' ? 'بموجب قانون الاستثمار رقم ١٣' : lang === 'zh' ? '根据第13号投资法' : lang === 'ckb' ? 'بەپێی یاسای وەبەرهێنانی ژمارە ١٣' : 'Under Investment Law No. 13'}
              </div>
            </div>

            <div className="bg-[#1A1A1A] p-6 border border-gray-800 rounded-sm">
              <div className="text-3xl font-bold text-[#990000] mb-2">100<span className="text-lg">%</span></div>
              <div className="font-bold text-white mb-1">
                {lang === 'ar' ? 'تحويل الأرباح' : lang === 'zh' ? '利润汇出' : lang === 'ckb' ? 'گواستنەوەی قازانج' : 'Profit Repatriation'}
              </div>
              <div className="text-[11px] text-gray-500">
                {lang === 'ar' ? 'حرية كاملة لتحويل رأس المال' : lang === 'zh' ? '完全自由的资本和利润转移' : lang === 'ckb' ? 'ئازادی تەواو بۆ گواستنەوەی سەرمایە' : 'Full freedom to transfer capital'}
              </div>
            </div>

            <div className="bg-[#1A1A1A] p-6 border border-gray-800 rounded-sm">
              <div className="text-3xl font-bold text-[#990000] mb-2">B&R</div>
              <div className="font-bold text-white mb-1">
                {lang === 'ar' ? 'الحزام والطريق' : lang === 'zh' ? '一带一路' : lang === 'ckb' ? 'پشتێن و ڕێگا' : 'Belt & Road'}
              </div>
              <div className="text-[11px] text-gray-500">
                {lang === 'ar' ? 'شراكة استراتيجية وتجارية' : lang === 'zh' ? '战略与商业伙伴关系' : lang === 'ckb' ? 'هاوبەشی ستراتیژی و بازرگانی' : 'Strategic commercial partnership'}
              </div>
            </div>

            <div className="bg-[#1A1A1A] p-6 border border-gray-800 rounded-sm">
              <div className="text-3xl font-bold text-[#990000] mb-2">Land</div>
              <div className="font-bold text-white mb-1">
                {lang === 'ar' ? 'تخصيص الأراضي' : lang === 'zh' ? '土地分配' : lang === 'ckb' ? 'تەرخانکردنی زەوی' : 'Land Allocation'}
              </div>
              <div className="text-[11px] text-gray-500">
                {lang === 'ar' ? 'تسهيلات مجانية أو مدعومة' : lang === 'zh' ? '免费或提供大量补贴的设施' : lang === 'ckb' ? 'ئاسانکاری بێبەرامبەر یان پاڵپشتیکراو' : 'Free or subsidized facilities'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
