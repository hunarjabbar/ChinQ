import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Article, Locale } from '../types';
import { useI18n } from '../hooks/useI18n';
import { formatDistanceToNow } from 'date-fns';
import { ar, zhCN, enUS } from 'date-fns/locale';
import { useState } from 'react';
import { ADDITIONAL_TOPICS } from '../data/topics';

export function CategoryPage() {
  const { lang, slug } = useParams<{ lang: Locale; slug: string }>();
  const { t } = useI18n(lang!);

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ['articles', slug],
    queryFn: async () => {
      const res = await fetch(`/api/articles?category=${slug}`);
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    }
  });

  const getTranslation = (article: Article) => {
    return article.translations.find(tr => tr.lang === lang) || 
           article.translations.find(tr => tr.lang === 'en') || 
           article.translations[0];
  };

  const getCategoryName = (category: any) => {
    if (!category) return '';
    if (lang === 'ar') return category.nameAr || category.name;
    if (lang === 'zh') return category.nameZh || category.name;
    if (lang === 'ckb') {
      const name = category.nameEn || category.name;
      if (name === 'Energy') return 'وزە';
      if (name === 'Economy') return 'ئابووری';
      if (name === 'Culture') return 'کالچەر';
      if (name === 'AI') return 'زیرەکی دەستکرد';
      if (name === 'Food & Beverage') return 'خۆراک و خواردنەوە';
      if (name === 'Expo') return 'پێشانگا';
      if (name === 'Business Statistics') return 'ئاماری بازرگانی';
      if (name === 'Opinion') return 'بۆچوون';
      if (name === 'Politics') return 'سیاسەت';
      if (name === 'Technology') return 'تەکنەلۆژیا';
      if (name === 'Belt & Road') return 'پشتوێن و ڕێگا';
      return name;
    }
    return category.nameEn || category.name;
  };

  const dateLocale = lang === 'ar' ? ar : lang === 'zh' ? zhCN : enUS;

  if (isLoading) {
    return <div className="animate-pulse space-y-8 max-w-[1024px] mx-auto w-full py-12">
      <div className="h-64 bg-neutral-200 rounded"></div>
    </div>;
  }

  // Define translations for dynamic titles if needed. But we can just use the dictionary if it exists, or display the category name from the first article.
  let categoryName = '';
  if (articles.length > 0) {
    categoryName = getCategoryName(articles[0].category);
  } else {
    const matchingTopic = ADDITIONAL_TOPICS.find(t => t.slug === slug);
    if (matchingTopic) {
      categoryName = lang === 'ar' ? matchingTopic.nameAr : lang === 'zh' ? matchingTopic.nameZh : lang === 'ckb' ? matchingTopic.nameCkb : matchingTopic.nameEn;
    } else {
      categoryName = slug?.toUpperCase() || '';
    }
  }

  return (
    <main className="flex-grow w-full max-w-[1024px] mx-auto bg-white shadow-sm border-x border-[#111111]/10 px-8 py-10 md:px-12 md:py-16">
      <div className="border-b-4 border-[#990000] pb-6 mb-12">
        <h2 className="text-5xl font-serif font-black tracking-tighter text-[#111111] uppercase">
          {categoryName}
        </h2>
      </div>

      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <p className="text-gray-500 font-serif italic text-lg">No stories available in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            const tr = getTranslation(article);
            return (
              <div key={article.id} className="group cursor-pointer"
                onClick={() => setSelectedArticle(article)}>
                {article.imageUrl ? (
                  <div className="w-full aspect-video bg-gray-200 overflow-hidden mb-4">
                    <img 
                      src={article.imageUrl} 
                      alt={tr?.title || 'Article image'}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-video flex items-center justify-center bg-[#111111]/5 mb-4">
                    <span className="text-gray-400 font-serif italic text-sm">No image</span>
                  </div>
                )}
                <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">
                  {getCategoryName(article.category)}
                </span>
                <h4 className="font-serif text-2xl leading-tight font-black group-hover:text-[#990000] mt-2 text-[#111111] mb-3 transition-colors">
                  {tr?.title}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-3 mb-3">
                  {tr?.excerpt}
                </p>
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-[10px] text-neutral-500 font-bold uppercase">
                  <span>{(article as any).author?.name || 'Staff Writer'}</span>
                  <span>•</span>
                  <span>{formatDistanceToNow(new Date(article.createdAt), { addSuffix: true, locale: dateLocale })}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* GORGEOUS IMMERSIVE NEWSPAPER DETAIL OVERLAY MODAL */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 bg-[#111111]/75 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6 md:p-8"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="bg-[#FAFAFA] border-x border-[#111111] max-w-3xl w-full h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative text-start transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header toolbar */}
            <div className="px-6 py-4 bg-white border-b border-[#111111]/10 flex justify-between items-center shrink-0">
              <span className="text-[10px] font-black uppercase text-[#990000] tracking-widest">
                {getCategoryName(selectedArticle.category)}
              </span>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="text-[#111111] hover:text-[#990000] font-black text-xs uppercase tracking-widest border border-[#111111]/20 px-3 py-1 hover:border-[#990000] transition-colors cursor-pointer"
              >
                {lang === 'ar' ? '✕ إغلاق' : lang === 'ckb' ? '✕ داخستن' : lang === 'zh' ? '✕ 关闭' : '✕ Close'}
              </button>
            </div>

            {/* Print style article layout */}
            <div className="p-6 md:p-12 flex-grow overflow-y-auto">
              <h1 className="text-3xl md:text-5xl font-serif font-black leading-tight text-center text-[#111111] tracking-tight mb-6">
                {getTranslation(selectedArticle)?.title}
              </h1>
              
              <div className="flex justify-center items-center gap-3 text-[10px] font-bold uppercase mb-8 opacity-60 text-[#111111] border-y border-double border-[#111111]/20 py-2.5">
                <span>By {(selectedArticle as any).author?.name || 'Staff Writer'}</span>
                <span>•</span>
                <span>
                  {new Date(selectedArticle.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : lang === 'zh' ? 'zh-CN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>

              {selectedArticle.imageUrl && (
                <div className="w-full mb-8 overflow-hidden rounded-xs border border-[#111111]/10">
                  <img 
                    src={selectedArticle.imageUrl} 
                    alt={getTranslation(selectedArticle)?.title || 'Article Image'} 
                    className="w-full object-cover max-h-[360px]"
                  />
                </div>
              )}

              {/* Editorial typography body */}
              <div 
                className="prose prose-neutral max-w-none font-serif text-lg leading-relaxed text-gray-800 space-y-6 whitespace-pre-wrap md:px-4"
                dir={lang === 'ar' || lang === 'ckb' ? 'rtl' : 'ltr'}
              >
                {getTranslation(selectedArticle)?.content ? (
                  <div dangerouslySetInnerHTML={{ __html: getTranslation(selectedArticle).content }} />
                ) : (
                  <p>{getTranslation(selectedArticle)?.excerpt}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>

  );
}
