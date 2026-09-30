import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Tag } from 'lucide-react';
import { Card } from '../../components/Card';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function NewsroomCategoryPage() {
  const { lang = 'en', category } = useParams<{ lang: string; category: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const categories = portalStore.getNewsCategories();
  const currentCat = categories.find(c => c.slug === category);
  const articles = portalStore.getNewsArticles().filter(a => a.category === category && a.status === 'published');

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/${currentLang}/newsroom`}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-6 hover:underline"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>Back to All Categories</span>
        </Link>

        <div className="mb-10 pb-6 border-b border-[#E5E7EB]">
          <span className="text-xs font-mono font-bold text-[var(--color-brand-800)] uppercase tracking-wider block mb-1">
            Category Dossier
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#000000]">
            {currentCat?.name[currentLang] || currentCat?.name.en || category}
          </h1>
          {currentCat && (
            <p className="text-sm text-[#4B5563] mt-2 max-w-2xl">
              {currentCat.description[currentLang] || currentCat.description.en}
            </p>
          )}
        </div>

        {articles.length === 0 ? (
          <div className="p-12 text-center text-neutral-500 text-sm">
            No published dispatches under this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <Card
                key={article.id}
                variant="portal"
                href={`/${currentLang}/newsroom/${article.slug}`}
                imageUrl={article.imageUrl}
                category={article.tags[0] || 'Dispatch'}
                title={article.title[currentLang] || article.title.en}
                excerpt={article.excerpt[currentLang] || article.excerpt.en}
                publishDate={article.publishDate}
                readTime={`${article.readingTimeMinutes} min`}
                author={{
                  name: article.author.name,
                  avatar: article.author.avatar
                }}
                ctaText="Read Article"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsroomCategoryPage;
