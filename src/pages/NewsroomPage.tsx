import { useParams, Link } from 'react-router-dom';
import { Locale } from '../types';
import { useI18n } from '../hooks/useI18n';
import { useQuery } from '@tanstack/react-query';
import { Newspaper, TrendingUp, ShieldCheck, ArrowRight, Calendar, Globe, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { InstitutePortalCTA } from '../components/InstitutePortalCTA';

export function NewsroomPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const { t } = useI18n(lang);
  const isRtl = lang === 'ar' || lang === 'ckb';
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: articles = [], isLoading } = useQuery<any[]>({
    queryKey: ['articles'],
    queryFn: async () => {
      const res = await fetch('/api/articles');
      if (!res.ok) throw new Error('Failed to fetch news');
      return res.json();
    }
  });

  const categories = [
    { id: 'all', label: lang === 'ar' ? 'جميع الأخبار والتقارير' : lang === 'zh' ? '全部新闻与报告' : lang === 'ckb' ? 'هەموو هەواڵ و ڕاپۆرتەکان' : 'All Dispatches' },
    { id: 'bilateral', label: lang === 'ar' ? 'المشاريع الثنائية' : lang === 'zh' ? '双边合作项目' : lang === 'ckb' ? 'پڕۆژە دوولایەنەکان' : 'Bilateral Projects' },
    { id: 'energy', label: lang === 'ar' ? 'الطاقة والبنية التحتية' : lang === 'zh' ? '能源与基础设施' : lang === 'ckb' ? 'وزە و ژێرخان' : 'Energy & Infrastructure' },
    { id: 'bri', label: lang === 'ar' ? 'الحزام والطريق (BRI)' : lang === 'zh' ? '一带一路倡议' : lang === 'ckb' ? 'پەیوەندییەکانی ڕێگەی ئاوریشم' : 'Belt & Road Initiative' },
    { id: 'finance', label: lang === 'ar' ? 'المالية والاقتصاد' : lang === 'zh' ? '金融与宏观经济' : lang === 'ckb' ? 'دارایی و ئابووری' : 'Finance & Economics' },
  ];

  const filteredArticles = articles.filter(art => {
    const translation = art.translations?.find((tr: any) => tr.lang === lang) || art.translations?.[0];
    const title = translation?.title || '';
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
        <Link to={`/${lang}`} className="hover:text-brand-800 transition-colors">{lang === 'ar' ? 'الرئيسية' : lang === 'zh' ? '首页' : lang === 'ckb' ? 'سەرەکی' : 'Home'}</Link>
        <span className="text-neutral-300">/</span>
        <span className="text-brand-800 dark:text-brand-400">{lang === 'ar' ? 'غرفة الأخبار والتحليلات' : lang === 'zh' ? '新闻与分析室' : lang === 'ckb' ? 'ژووری هەواڵ و شیکاری' : 'ICA Newsroom'}</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-ink-900 to-brand-900 dark:from-neutral-900 dark:to-neutral-800 text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-2xl relative overflow-hidden border border-brand-800/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-800/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/40 border border-brand-700/50 text-[11px] font-black uppercase tracking-widest text-white backdrop-blur-md">
            <Newspaper size={14} className="text-rose-300" />
            <span>{lang === 'ar' ? 'الوكالة الرسمية للإعلام الثنائي' : lang === 'zh' ? '官方双边资讯网' : lang === 'ckb' ? 'دەزگای فەرمی ڕاگەیاندنی دوولایەنە' : 'Official Sovereign Dispatches'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {lang === 'ar' ? 'غرفة الأخبار والتحليلات الاستراتيجية' : lang === 'zh' ? 'ICA 新闻中心与战略分析' : lang === 'ckb' ? 'ژووری هەواڵ و شیکاری ستراتیژی' : 'ICA Newsroom & Strategic Analysis'}
          </h1>
          <p className="text-sm sm:text-base text-neutral-200 font-medium leading-relaxed">
            {lang === 'ar' 
              ? 'التغطية الإخبارية الرسمية لأعمال اللجنة العراقية الصينية المشتركة، مشاريع البنية التحتية الاستراتيجية، واتفاقيات الحزام والطريق.' 
              : lang === 'zh' 
              ? '伊中联合委员会重点工作、重大基础设施项目及“一带一路” bilateral 合作官方权威报道与深度智库分析。' 
              : lang === 'ckb' 
              ? 'ڕووماڵی فەرمی کارەکانی لێژنەی هاوبەشی عێراقی چین و پڕۆژە ستراتیژییەکانی ژێرخان.' 
              : 'Authoritative reporting on Iraq-China joint commission milestones, strategic infrastructure projects, and Belt & Road diplomatic engagements.'}
          </p>
        </div>
      </div>

      {/* Controls & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-brand-800 text-white shadow-md'
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-brand-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder={lang === 'ar' ? 'بحث في التقارير الإخبارية...' : lang === 'zh' ? '搜索新闻与报告...' : lang === 'ckb' ? 'گەڕان لە هەواڵەکاندا...' : 'Search dispatches...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-xs font-medium focus:ring-2 focus:ring-brand-500 outline-none text-neutral-900 dark:text-neutral-100 shadow-xs"
          />
          <Search className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        </div>
      </div>

      {/* News Feed Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-brand-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <Newspaper size={48} className="mx-auto text-neutral-400 mb-3" />
          <h3 className="text-base font-black text-neutral-800 dark:text-neutral-200 uppercase">
            {lang === 'ar' ? 'لا توجد مقالات مطابقة' : lang === 'zh' ? '未找到相关文章' : lang === 'ckb' ? 'هیچ وتارێک نەدۆزرایەوە' : 'No matching dispatches found'}
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art, idx) => {
            const tr = art.translations?.find((t: any) => t.lang === lang) || art.translations?.[0] || {};
            return (
              <Link
                key={art.id || idx}
                to={`/${lang}/article/${art.slug}`}
                className="group bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-brand-800 dark:hover:border-brand-500 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {art.imageUrl && (
                  <div className="relative h-48 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src={art.imageUrl}
                      alt={tr.title || 'Dispatch'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-brand-800 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm">
                      {art.category ? (
                        lang === 'ar' ? art.category.nameAr :
                        lang === 'zh' ? art.category.nameZh :
                        art.category.nameEn || art.category.name
                      ) : 'Strategic Dispatch'}
                    </div>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                      <Calendar size={13} className="text-brand-800 dark:text-brand-400" />
                      <span>{new Date(art.createdAt || Date.now()).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-base font-black text-neutral-900 dark:text-neutral-100 group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                      {tr.title || 'Untitled Dispatch'}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                      {tr.summary || tr.content?.substring(0, 120) || ''}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-black uppercase text-brand-800 dark:text-brand-400">
                    <span>{lang === 'ar' ? 'اقرأ التقرير' : lang === 'zh' ? '阅读全文' : lang === 'ckb' ? 'خوێندنەوەی ڕاپۆرت' : 'Read Dispatch'}</span>
                    <ArrowRight size={14} className="rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Institute Portal Access Banner */}
      <div className="mt-20">
        <InstitutePortalCTA lang={lang} variant="card" />
      </div>
    </div>
  );
}
