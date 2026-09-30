import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Award, MapPin } from 'lucide-react';
import { Card } from '../../components/Card';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function NewsroomAuthorPage() {
  const { lang = 'en', author } = useParams<{ lang: string; author: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const authors = portalStore.getNewsAuthors();
  const currentAuthor = authors.find(a => a.slug === author) || authors[0];
  const authorArticles = portalStore.getNewsArticles().filter(a => a.author.slug === currentAuthor.slug);

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/${currentLang}/newsroom`}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-6 hover:underline"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>Back to Newsroom</span>
        </Link>

        {/* Author Bio Header Card */}
        <div className="p-8 rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] mb-12 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={currentAuthor.avatar}
            alt={currentAuthor.name}
            className="w-24 h-24 rounded-2xl object-cover shrink-0 shadow-md"
          />
          <div className="space-y-2 text-center sm:text-start flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-mono font-bold text-[var(--color-brand-800)] uppercase">
                {currentAuthor.bureau[currentLang] || currentAuthor.bureau.en}
              </span>
              <span className="text-neutral-300">•</span>
              <span className="text-xs text-[#4B5563]">
                {currentAuthor.credentials}
              </span>
            </div>

            <h1 className="font-serif text-3xl font-black text-[#000000]">
              {currentAuthor.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed max-w-2xl">
              {currentAuthor.bio[currentLang] || currentAuthor.bio.en}
            </p>
          </div>
        </div>

        {/* Articles by Author */}
        <h2 className="font-serif text-2xl font-black text-[#000000] mb-8 pb-4 border-b border-[#E5E7EB]">
          Published Bylines ({authorArticles.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authorArticles.map(article => (
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
              ctaText="Read Article"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsroomAuthorPage;
