import React from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Locale, Publication } from '../../types';
import { 
  FileText, 
  Search, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useI18n } from '../../hooks/useI18n';

export function PublicationsArchive() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const isRtl = lang === 'ar' || lang === 'ckb';
  const { t, formatDate } = useI18n(lang);

  // Filters from URL
  const activeTopic = searchParams.get('topic') || 'all';
  const activeType = searchParams.get('type') || 'all';
  const activeRegion = searchParams.get('region') || 'all';
  const searchQuery = searchParams.get('q') || '';
  const sortBy = searchParams.get('sort') || 'date';

  const topics = [
    { id: 'all', label: t('all') },
    { id: 'energy', label: t('energyBri') },
    { id: 'geo-economics', label: t('macroEconomics') },
    { id: 'diplomacy', label: t('diplomacyGovernance') },
    { id: 'digital-silk-road', label: t('digitalSilkRoad') },
  ];

  const types = [
    { id: 'all', label: t('all') },
    { id: 'POLICY_BRIEF', label: t('policyBriefs') },
    { id: 'WORKING_PAPER', label: t('workingPapers') },
    { id: 'WHITE_PAPER', label: t('whitePaper') },
    { id: 'ANNUAL_REPORT', label: t('annualReports') },
    { id: 'DATA_NOTE', label: t('dataNotes') },
  ];

  const regions = [
    { id: 'all', label: t('all') },
    { id: 'CHINA', label: t('china') },
    { id: 'IRAQ', label: t('iraq') },
    { id: 'KURDISTAN', label: t('kurdistanRegion') },
    { id: 'BILATERAL', label: t('bilateral') },
  ];

  // Mock publications data
  const publications: Publication[] = [
    {
      id: '1',
      slug: 'mapping-iraq-china-development-corridor',
      type: 'WHITE_PAPER',
      titleEn: 'Mapping the Iraq–China Development Corridor: Infrastructure, Energy, & Sovereign Debt',
      titleAr: 'تخطيط ممر التنمية العراقي الصيني: البنية التحتية، الطاقة، والديون السيادية',
      titleZh: '伊拉克—中国发展走廊：基础设施、能源与主权债务分析',
      titleCkb: 'نەخشەی ڕێڕەوی گەشەپێدانی عێراق-چین',
      excerptEn: 'An exhaustive analysis of the convergence between Iraq\'s Development Road and the BRI.',
      excerptAr: 'تحليل شامل للتقارب بين طريق التنمية العراقي ومبادرة الحزام والطريق.',
      excerptZh: '对伊拉克“发展道路”倡议与“一带一路”对接的深度分析报告。',
      excerptCkb: 'شیکردنەوەیەکی هەمەلایەنە بۆ گونجاندنی ڕێگەی گەشەپێدان و پڕۆژەی پشتێنە و ڕێگە.',
      contentEn: '', contentAr: '', contentZh: '', contentCkb: '',
      imageUrl: 'https://images.unsplash.com/photo-1521295121812-af46571d9ec6?auto=format&fit=crop&q=80&w=800',
      authors: ['Dr. Wang Wei', 'Ziyad Al-Husseini'],
      topics: ['energy', 'infrastructure'],
      region: 'BILATERAL',
      dataCitationEligible: true,
      publishedAt: '2024-09-15',
      createdAt: '2024-09-15',
      updatedAt: '2024-09-15',
    },
    {
      id: '2',
      slug: 'iqd-cny-settlement-macroeconomic-impacts',
      type: 'POLICY_BRIEF',
      titleEn: 'Direct IQD/CNY Settlement: Macroeconomic Impacts on Bilateral Trade',
      titleAr: 'التسوية المباشرة بالدينار العراقي واليوان الصيني: الآثار الاقتصادية الكلية',
      titleZh: '第纳尔—人民币直接结算：对双边贸易的宏观经济影响',
      titleCkb: 'پاکتاوکردنی ڕاستەوخۆی دینار-یوان',
      excerptEn: 'Evaluating the shift toward local currency settlement in energy transactions.',
      excerptAr: 'تقييم التحول نحو تسوية المعاملات الطاقوية بالعملات المحلية.',
      excerptZh: '评估能源交易中转向本币结算机制的政策简报。',
      excerptCkb: 'هەڵسەنگاندنی گۆڕانکاری بەرەو پاکتاوکردن بە دراوە ناوخۆییەکان.',
      contentEn: '', contentAr: '', contentZh: '', contentCkb: '',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda5366a7a?auto=format&fit=crop&q=80&w=800',
      authors: ['Ahmed Kareem', 'Li Na'],
      topics: ['geo-economics'],
      region: 'BILATERAL',
      dataCitationEligible: true,
      publishedAt: '2024-08-20',
      createdAt: '2024-08-20',
      updatedAt: '2024-08-20',
    },
    // Add more mock publications for better UI testing
  ];

  const getRegionLabel = (region: string) => {
    switch (region.toUpperCase()) {
      case 'CHINA': return t('china');
      case 'IRAQ': return t('iraq');
      case 'KURDISTAN': return t('kurdistanRegion');
      case 'BILATERAL': return t('bilateral');
      default: return region;
    }
  };

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-[#D97706]">
          <FileText size={18} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Institutional Archive</span>
        </div>
        <h1 className="text-3xl lg:text-5xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter">
          Faceted Research Archive
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium max-w-2xl leading-relaxed">
          Access the Institute's complete body of research, from high-level White Papers to 
          granular Data Notes, filtered by topic, region, and verification status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-8 sticky top-24">
          <div className="space-y-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search research..." 
                value={searchQuery}
                onChange={(e) => updateFilter('q', e.target.value)}
                className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-[#0284C7] transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
            </div>

            <div className="space-y-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 pb-2">Topic</h3>
              <div className="flex flex-col gap-1">
                {topics.map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => updateFilter('topic', topic.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                      activeTopic === topic.id 
                        ? 'bg-[#0F172A] text-white' 
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <span>{topic.label}</span>
                    {activeTopic === topic.id && <ChevronRight size={12} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 pb-2">Publication Type</h3>
              <div className="flex flex-col gap-1">
                {types.map(type => (
                  <button
                    key={type.id}
                    onClick={() => updateFilter('type', type.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                      activeType === type.id 
                        ? 'bg-[#0284C7] text-white shadow-md' 
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <span>{type.label}</span>
                    {activeType === type.id && <ChevronRight size={12} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 pb-2">Region</h3>
              <div className="flex flex-col gap-1">
                {regions.map(region => (
                  <button
                    key={region.id}
                    onClick={() => updateFilter('region', region.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                      activeRegion === region.id 
                        ? 'bg-[#D97706] text-[#0F172A] shadow-md' 
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <span>{region.label}</span>
                    {activeRegion === region.id && <ChevronRight size={12} />}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setSearchParams({})}
              className="w-full py-3 border border-neutral-200 dark:border-neutral-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all"
            >
              Reset All Filters
            </button>
          </div>
        </aside>

        {/* Results Content */}
        <div className="lg:col-span-3 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
              Showing {publications.length} Publications
            </span>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
              <span className="text-neutral-400">Sort By:</span>
              <button 
                onClick={() => updateFilter('sort', 'date')}
                className={cn(
                  "transition-all underline-offset-4 decoration-[#0284C7]/30",
                  sortBy === 'date' ? "text-[#0284C7] underline" : "text-neutral-400 hover:text-neutral-600"
                )}
              >
                Date
              </button>
              <button 
                onClick={() => updateFilter('sort', 'relevance')}
                className={cn(
                  "transition-all underline-offset-4 decoration-[#0284C7]/30",
                  sortBy === 'relevance' ? "text-[#0284C7] underline" : "text-neutral-400 hover:text-neutral-600"
                )}
              >
                Relevance
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {publications.map((pub) => (
              <Link 
                key={pub.id}
                to={`/${lang}/institute/publications/${pub.slug}`}
                className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#F1F5F9] dark:bg-neutral-800 px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest text-neutral-500">
                      {pub.type.replace('_', ' ')}
                    </span>
                    {pub.dataCitationEligible && (
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <ShieldCheck size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Citable</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-black text-[#0F172A] dark:text-white uppercase leading-tight group-hover:text-[#0284C7] transition-colors">
                    {pub[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof Publication] as string || pub.titleEn}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium line-clamp-3 leading-relaxed">
                    {pub[`excerpt${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof Publication] as string || pub.excerptEn}
                  </p>
                </div>
                
                <div className="pt-6 mt-6 border-t border-neutral-50 dark:border-neutral-800">
                  <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest">
                    <div className="flex flex-col gap-1">
                      <span className="text-neutral-400">{t('published')}</span>
                      <span className="text-neutral-900 dark:text-neutral-100"><bdi>{formatDate(pub.publishedAt)}</bdi></span>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <span className="text-neutral-400">{t('region')}</span>
                      <span className="text-neutral-900 dark:text-neutral-100">{getRegionLabel(pub.region)}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#0284C7]">
                    <span>{t('accessPublication')}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="pt-12 text-center">
            <button className="px-8 py-4 border-2 border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-[#0F172A] dark:hover:text-white hover:border-[#0F172A] dark:hover:border-[#0284C7] transition-all cursor-pointer">
              {t('loadMore')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
