import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Article, Locale } from '../types';
import { ArticleDetail } from '../components/ArticleDetail';

export function ArticlePage() {
  const { lang, slug } = useParams<{ lang: Locale; slug: string }>();

  const { data: article, isLoading, error } = useQuery<Article>({
    queryKey: ['article', slug],
    queryFn: async () => {
      const res = await fetch(`/api/articles/${slug}`);
      if (!res.ok) throw new Error('Article not found');
      return res.json();
    },
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8 w-full p-6 sm:p-12 bg-white dark:bg-neutral-900 min-h-screen">
        <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4 mx-auto mb-8"></div>
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4 mx-auto mb-12"></div>
        <div className="h-96 bg-neutral-200 dark:bg-neutral-800 rounded w-full mb-12"></div>
        <div className="space-y-4">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return <Navigate to={`/${lang}`} replace />;
  }

  return (
    <div className="w-full bg-white dark:bg-neutral-900 shadow-xs border-x border-brand-800/10 dark:border-neutral-800 min-h-screen">
      <ArticleDetail article={article} lang={lang as Locale} />
    </div>
  );
}
