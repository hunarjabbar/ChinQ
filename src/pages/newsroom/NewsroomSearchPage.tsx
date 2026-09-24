import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { ArticleListItem } from '../../components/newsroom/ArticleListItem';
import { SearchBar } from '../../components/newsroom/SearchBar';
import { EmptyState } from '../../components/EmptyState';
import { newsroomArticles } from '../../data/newsroomData';
import { Locale } from '../../types';
import { getNewsroomTranslation } from '../../locales/newsroomTranslations';

export function NewsroomSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const paramLang = searchParams.get('lang');

  const lang: Locale = (['en', 'ar', 'zh', 'ckb'].includes(paramLang || '')
    ? paramLang
    : 'en') as Locale;

  const homeLabel = getNewsroomTranslation(lang, 'newsroom.breadcrumb.home');
  const newsroomLabel = getNewsroomTranslation(lang, 'newsroom.breadcrumb.label');
  const resultsForLabel = getNewsroomTranslation(lang, 'newsroom.search.resultsFor');
  const noResultsLabel = getNewsroomTranslation(lang, 'newsroom.search.noResults');

  const matchedArticles = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    return newsroomArticles.filter((art) => {
      const title = (art.title[lang] || art.title.en).toLowerCase();
      const excerpt = (art.excerpt[lang] || art.excerpt.en).toLowerCase();
      const body = (art.body[lang] || art.body.en).toLowerCase();
      const category = (art.category.name[lang] || art.category.name.en).toLowerCase();
      const author = (art.author.name[lang] || art.author.name.en).toLowerCase();

      return (
        title.includes(q) ||
        excerpt.includes(q) ||
        body.includes(q) ||
        category.includes(q) ||
        author.includes(q)
      );
    });
  }, [query, lang]);

  return (
    <div className="min-h-screen bg-neutral-50/60 dark:bg-neutral-950 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <Breadcrumb
            items={[
              { label: homeLabel, href: `/${lang}` },
              { label: newsroomLabel, href: `/${lang}/newsroom` },
              { label: 'Search Results' },
            ]}
          />

          <div className="w-full md:w-auto">
            <SearchBar
              lang={lang}
              initialQuery={query}
              onSearchSubmit={(newQ) => setSearchParams({ q: newQ, lang })}
            />
          </div>
        </div>

        <header className="p-8 sm:p-10 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm mb-8 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
            <Search size={13} />
            <span>Search Archive</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-50">
            {query.trim() ? (
              <>
                {resultsForLabel} <span className="text-brand-800">&quot;{query}&quot;</span>
              </>
            ) : (
              'Search Dispatches'
            )}
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Found {matchedArticles.length} matching official reports and media briefs.
          </p>
        </header>

        {/* Results List */}
        {matchedArticles.length > 0 ? (
          <div className="space-y-4">
            {matchedArticles.map((article) => (
              <ArticleListItem key={article.id} article={article} lang={lang} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Search size={36} />}
            title={query ? `No results found for "${query}"` : 'Enter a search term'}
            description={
              query
                ? noResultsLabel
                : 'Use keywords, topics, or names of officials to search the newsroom archive.'
            }
            actionLabel="View all articles"
            actionHref={`/${lang}/newsroom/archive`}
          />
        )}
      </div>
    </div>
  );
}

export default NewsroomSearchPage;
