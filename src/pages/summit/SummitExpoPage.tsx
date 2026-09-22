import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { SECTOR_PAVILIONS } from '../../data/summitData';
import { Layers, MapPin, ArrowRight, ShieldCheck, CheckCircle2, Building, Sparkles } from 'lucide-react';

export function SummitExpoPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPavilions = SECTOR_PAVILIONS.filter(p => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      p.name[lang].toLowerCase().includes(term) ||
      p.description[lang].toLowerCase().includes(term)
    );
  });

  return (
    <SummitLayout lang={lang} activeNav="expo">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        
        {/* Header Hero */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-800 dark:text-brand-400" />
            <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
              {lang === 'ar' ? 'المعرض التجاري والصناعي الثنائي' : lang === 'zh' ? '中伊经贸双边博览会' : lang === 'ckb' ? 'پێشانگای بازرگانی و پیشەسازی دوولایەنە' : 'Bilateral Trade & Industrial Expo'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
            {lang === 'ar' ? 'دليل الأجنحة الـ١١ والمعرض الشامل' : lang === 'zh' ? '11大重点产业展区与展馆分布全景' : lang === 'ckb' ? 'ڕێبەری ١١ کەرت و پێشانگای سەرەکی' : '11 Sector Pavilions Directory & Expo Guide'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            {lang === 'ar'
              ? 'يضم المعرض ٢٤٠+ عارضاً موزعين على ١١ جناحاً تخصصياً بمساحة ٢٥,٠٠٠ متر مربع، مع دعم مباشر للمشترين والمستثمرين من خلال ورش المطابقة ومكاتب التخليص المالي واللوجستي.'
              : lang === 'zh'
              ? '总展出面积25,000平方米，汇聚240+家行业龙头参展商，配备专业翻译、中信保即时承保与人民币跨境清算一站式服务台。'
              : lang === 'ckb'
              ? 'زیاتر لە ٢٤٠ کۆمپانیا لە ١١ کەرتی سەرەکی بەشدارن لەسەر ڕووبەری ٢٥ هەزار مەتر دووجا.'
              : '25,000 m² of dedicated trade space hosting 240+ verified Chinese & Iraqi manufacturers across 11 key strategic industries.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to={`/${lang}/summit/floor-plan`}
              className="px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-black text-xs uppercase tracking-wider transition-colors"
            >
              {lang === 'ar' ? 'المخطط التفاعلي للأجنحة' : lang === 'zh' ? '交互式展馆平面图' : lang === 'ckb' ? 'نەخشەی هۆڵەکان' : 'Interactive Floor Plan'}
            </Link>
            <Link
              to={`/${lang}/summit/register/exhibitor`}
              className="px-5 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-800 dark:text-neutral-200 font-black text-xs uppercase tracking-wider transition-colors"
            >
              {lang === 'ar' ? 'حجز جناح كعارض' : lang === 'zh' ? '参展展位预订' : lang === 'ckb' ? 'تۆمارکردن وەک بەشداربوو' : 'Book Booth'}
            </Link>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center justify-between gap-4 bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={lang === 'ar' ? 'ابحث عن جناح أو قطاع...' : lang === 'zh' ? '搜索展区名称或行业...' : lang === 'ckb' ? 'گەڕان بەدوای کەرتدا...' : 'Search pavilions or industries...'}
            className="w-full max-w-md px-4 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs focus:outline-hidden focus:ring-2 focus:ring-brand-800 text-neutral-900 dark:text-neutral-100"
          />
          <span className="text-xs font-bold text-neutral-500 shrink-0">
            {filteredPavilions.length} Pavilions Available
          </span>
        </div>

        {/* Pavilions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPavilions.map((p, idx) => (
            <Link
              key={p.id}
              to={`/${lang}/summit/expo/sectors/${p.slug}`}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-brand-600 transition-all shadow-xs hover:shadow-md group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-brand-100 dark:bg-brand-950 text-brand-900 dark:text-brand-300">
                    Sector {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-neutral-500">
                    {p.boothCount} Booths
                  </span>
                </div>

                <h3 className="text-base font-black text-neutral-900 dark:text-neutral-100 group-hover:text-brand-800 transition-colors">
                  {p.name[lang]}
                </h3>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                  {p.description[lang]}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <div className="text-[11px] font-bold text-brand-800 dark:text-brand-400 line-clamp-1">
                  Buyers: {p.iraqiBuyerProfile[lang]}
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-400 font-bold">
                  <span>Explore Sector & Research</span>
                  <ArrowRight size={14} className={`text-neutral-400 group-hover:text-brand-800 group-hover:translate-x-1 transition-all ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </SummitLayout>
  );
}
