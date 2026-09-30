import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, ArrowLeft, ArrowRight, Tag, X } from 'lucide-react';
import { Card } from '../../components/Card';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function NewsroomSearchPage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const [query, setQuery] = useState('');
  const allArticles = portalStore.getNewsArticles().filter(a => a.status === 'published');

  const results = query.trim()
    ? allArticles.filter(a => {
        const q = query.toLowerCase();
        const title = (a.title[currentLang] || a.title.en).toLowerCase();
        const excerpt = (a.excerpt[currentLang] || a.excerpt.en).toLowerCase();
        const author = a.author.name.toLowerCase();
        const tags = a.tags.map(t => t.toLowerCase()).join(' ');
        return title.includes(q) || excerpt.includes(q) || author.includes(q) || tags.includes(q);
      })
    : [];

  const suggestedQueries = ['Grand Faw', 'e-CNY', 'Consular', 'Solar', 'Basra', 'Trade Accord'];

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/${currentLang}/newsroom`}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-6 hover:underline"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>Back to Newsroom</span>
        </Link>

        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#000000] mb-3">
            Search Dispatch Ledger
          </h1>
          <p className="text-sm text-[#4B5563]">
            Full-text real-time search across bilateral dispatches, accords, and archives.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 inset-inline-start-4 flex items-center pointer-events-none text-neutral-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('newsroom.searchPlaceholder')}
            className="w-full ps-12 pe-10 py-4 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] text-sm text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none shadow-xs"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute inset-y-0 inset-inline-end-4 flex items-center text-neutral-400 hover:text-[#000000]"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="flex flex-wrap items-center gap-2 mb-10 text-xs">
          <span className="text-[#4B5563] font-bold">Popular topics:</span>
          {suggestedQueries.map(sq => (
            <button
              key={sq}
              onClick={() => setQuery(sq)}
              className="px-3 py-1 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-[#000000] transition-colors cursor-pointer"
            >
              {sq}
            </button>
          ))}
        </div>

        {/* Search Results */}
        {query.trim() && (
          <div>
            <div className="text-xs font-mono font-bold text-[#4B5563] uppercase tracking-wider mb-6 pb-2 border-b border-[#E5E7EB]">
              Search Results ({results.length})
            </div>

            {results.length === 0 ? (
              <div className="p-12 text-center text-neutral-500 text-sm bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB]">
                No verified dispatches matched "{query}". Try a different keyword or topic tag.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map(article => (
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
                    author={{ name: article.author.name }}
                    ctaText="Read Article"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsroomSearchPage;
