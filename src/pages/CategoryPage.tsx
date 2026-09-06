import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Article, Locale } from '../types';
import { useI18n } from '../hooks/useI18n';
import { formatDistanceToNow } from 'date-fns';
import { ar, zhCN, enUS } from 'date-fns/locale';
import { useState, useCallback, useMemo } from 'react';
import { ADDITIONAL_TOPICS } from '../data/topics';
import { ArticleModal } from '../components/ArticleModal';

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

  const getTranslation = useCallback((article: Article) => {
    return article.translations.find(tr => tr.lang === lang) || 
           article.translations.find(tr => tr.lang === 'en') || 
           article.translations[0];
  }, [lang]);

  const getCategoryName = useCallback((category: any) => {
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
  }, [lang]);

  const dateLocale = useMemo(() => lang === 'ar' ? ar : lang === 'zh' ? zhCN : enUS, [lang]);

  if (isLoading) {
    return <div className="animate-pulse space-y-8 w-full max-w-(--container-width) mx-auto px-4 sm:px-6 py-20">
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
    <div className="w-full bg-white dark:bg-neutral-900 shadow-xs border-x border-brand-800/10 dark:border-neutral-800 p-4 sm:p-6 md:p-8">
      <div className="border-b-4 border-brand-800 pb-4 mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tighter text-ink-900 dark:text-neutral-100 uppercase">
          {categoryName}
        </h2>
      </div>

      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-gray-500 dark:text-neutral-400 font-serif italic text-lg">No stories available in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article) => {
            const tr = getTranslation(article);
            return (
              <div key={article.id} className="group cursor-pointer"
                onClick={() => setSelectedArticle(article)}>
                {article.imageUrl ? (
                  <div className="w-full aspect-video bg-gray-200 dark:bg-neutral-800 overflow-hidden mb-4 rounded-xs">
                    <img 
                      src={article.imageUrl} 
                      alt={tr?.title || 'Article image'}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-video flex items-center justify-center bg-brand-800/5 dark:bg-neutral-800 mb-4 rounded-xs">
                    <span className="text-gray-400 dark:text-neutral-500 font-serif italic text-sm">No image</span>
                  </div>
                )}
                <span className="text-[10px] text-gray-500 dark:text-neutral-400 font-bold uppercase block mb-1">
                  {getCategoryName(article.category)}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl leading-tight font-black group-hover:text-brand-800 dark:group-hover:text-brand-400 mt-2 text-ink-900 dark:text-neutral-100 mb-3 transition-colors">
                  {tr?.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-neutral-300 line-clamp-3 mb-3 leading-relaxed">
                  {tr?.excerpt}
                </p>
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-[10px] text-neutral-500 dark:text-neutral-400 font-bold uppercase">
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
        <ArticleModal 
          article={selectedArticle} 
          lang={lang!} 
          onClose={() => setSelectedArticle(null)} 
        />
      )}
    </div>

  );
}
