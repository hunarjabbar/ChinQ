import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { SECTOR_PAVILIONS } from '../../data/summitData';
import { Layers, MapPin, Building, ArrowRight, ShieldCheck, Download, BookOpen, ExternalLink, CheckCircle2 } from 'lucide-react';

export function SummitSectorPavilionPage() {
  const { lang = 'en', slug } = useParams<{ lang: Locale; slug: string }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const sector = SECTOR_PAVILIONS.find(p => p.slug === slug) || SECTOR_PAVILIONS[0];

  return (
    <SummitLayout lang={lang} activeNav="expo">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold text-neutral-500">
          <Link to={`/${lang}/summit`} className="hover:text-brand-800">Summit</Link>
          <span>/</span>
          <Link to={`/${lang}/summit/expo`} className="hover:text-brand-800">Expo</Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-neutral-100">{sector.name[lang]}</span>
        </div>

        {/* Sector Header */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-brand-100 dark:bg-brand-950 text-brand-900 dark:text-brand-300">
                Sector Pavilion
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                {sector.boothCount} Allocated Booths
              </span>
            </div>

            <Link
              to={`/${lang}/summit/register/exhibitor?sector=${sector.slug}`}
              className="px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-black text-xs uppercase tracking-wider transition-colors"
            >
              Book Booth in this Sector →
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100">
            {sector.name[lang]}
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-4xl leading-relaxed">
            {sector.description[lang]}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 text-xs space-y-1">
              <div className="font-bold text-neutral-900 dark:text-neutral-100 uppercase">Target Iraqi Buyers & Procurement:</div>
              <div className="text-neutral-600 dark:text-neutral-400">{sector.iraqiBuyerProfile[lang]}</div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 text-xs space-y-1">
              <div className="font-bold text-neutral-900 dark:text-neutral-100 uppercase">Chinese Manufacturer Profile:</div>
              <div className="text-neutral-600 dark:text-neutral-400">{sector.chineseExhibitorProfile[lang]}</div>
            </div>
          </div>
        </div>

        {/* Knowledge Partner Research Grounding */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white border border-brand-800/60 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-300">
            <BookOpen size={16} className="text-amber-300" />
            <span>Institute Knowledge Base & Feasibility Report</span>
          </div>
          <h3 className="text-lg font-black">
            {sector.researchPillarTitle[lang]}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
            {lang === 'ar' 
              ? 'أعد المعهد الصيني للدراسات الاستراتيجية والاقتصادية تحليلاً معمقاً لسلسلة التوريد، واللوائح الجمركية، وفروق التسعير والتأمين لهذا القطاع، مما يضمن تدقيقاً مسبقاً لجميع الشركات العارضة.' 
              : 'The Chinese Institute for Strategic and Economic Studies has published independent market size data, valuation multiples, and import tariffs for this sector.'}
          </p>
          <div className="pt-2">
            <Link
              to={`/${lang}/institute/publications`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-800 hover:bg-brand-700 text-white text-xs font-bold transition-colors"
            >
              <span>Download Sector Feasibility Monograph</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Market Opportunity Breakdown */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-10 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <h2 className="text-xl font-black text-neutral-900 dark:text-neutral-100">
            {lang === 'ar' ? 'الفرص الاستثمارية والسوقية في العراق' : lang === 'zh' ? '伊拉克产业重组与市场准入机会' : lang === 'ckb' ? 'دەرفەتی بازاڕ و وەبەرهێنان لە عێراق' : 'Iraq Market & Industrial Opportunity'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {sector.iraqOpportunity[lang]}
          </p>
        </div>

        {/* Floor Plan Link */}
        <div className="p-6 rounded-2xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-black text-brand-900 dark:text-brand-300">
              {lang === 'ar' ? 'عرض مواقع أجنحة هذا القطاع في القاعة' : lang === 'zh' ? '在展馆平面图中查看本展区展位' : lang === 'ckb' ? 'نەخشەی ئەم کەرتە لە هۆڵەکەدا' : 'View Sector Location on Floor Plan'}
            </h4>
            <p className="text-xs text-brand-700 dark:text-brand-400 mt-0.5">
              Standard & Premium Island Booths Available
            </p>
          </div>
          <Link
            to={`/${lang}/summit/floor-plan`}
            className="px-4 py-2 rounded-xl bg-brand-800 text-white text-xs font-black uppercase tracking-wider hover:bg-brand-900 transition-colors"
          >
            Open Interactive Map →
          </Link>
        </div>

      </div>
    </SummitLayout>
  );
}
