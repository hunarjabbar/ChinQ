import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Archive, Calendar, Filter } from 'lucide-react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { ArticleListItem } from '../../components/newsroom/ArticleListItem';
import { SearchBar } from '../../components/newsroom/SearchBar';
import { EmptyState } from '../../components/EmptyState';
import { newsroomArticles, newsroomCategories } from '../../data/newsroomData';
import { Locale } from '../../types';
import { getNewsroomTranslation } from '../../locales/newsroomTranslations';

export function NewsroomArchivePage() {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const lang: Locale = (['en', 'ar', 'zh', 'ckb'].includes(paramLang || '')
    ? paramLang
    : paramLang === 'ck'
    ? 'ckb'
    : 'en') as Locale;

  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const homeLabel = getNewsroomTranslation(lang, 'newsroom.breadcrumb.home');
  const newsroomLabel = getNewsroomTranslation(lang, 'newsroom.breadcrumb.label');
  const archiveHeading = getNewsroomTranslation(lang, 'newsroom.archive.heading');
  const allCategoriesLabel = getNewsroomTranslation(lang, 'newsroom.landing.categories.all');

  const years = useMemo(() => {
    const set = new Set<string>();
    newsroomArticles.forEach((a) => {
      const year = new Date(a.publishDate).getFullYear().toString();
      set.add(year);
    });
    return Array.from(set).sort().reverse();
  }, []);

  const filteredArticles = useMemo(() => {
    return newsroomArticles
      .filter((art) => {
        if (art.status !== 'published') return false;
        if (selectedYear !== 'all') {
          const year = new Date(art.publishDate).getFullYear().toString();
          if (year !== selectedYear) return false;
        }
        if (selectedCategory !== 'all') {
          if (art.category.slug !== selectedCategory) return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }, [selectedYear, selectedCategory]);

  return (
    <div className="min-h-screen bg-neutral-50/60 dark:bg-neutral-950 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <Breadcrumb
            items={[
              { label: homeLabel, href: `/${lang}` },
              { label: newsroomLabel, href: `/${lang}/newsroom` },
              { label: archiveHeading },
            ]}
          />

          <div className="w-full md:w-auto">
            <SearchBar lang={lang} />
          </div>
        </div>

        <header className="p-8 sm:p-10 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
            <Archive size={14} />
            <span>Official Records & Archives</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-50">
            {archiveHeading}
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-3xl leading-relaxed">
            Historical repository of all official releases, executive communiqués, and joint commission declarations published by the Iraqi-Chinese Agency.
          </p>

          {/* Archive Filter Controls */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-2 text-neutral-500">
              <Calendar size={14} />
              <span>Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 font-bold"
              >
                <option value="all">All Years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 text-neutral-500">
              <Filter size={14} />
              <span>Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 font-bold"
              >
                <option value="all">{allCategoriesLabel}</option>
                {newsroomCategories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name[lang] || c.name.en}
                  </option>
                ))}
              </select>
            </div>

            {(selectedYear !== 'all' || selectedCategory !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedYear('all');
                  setSelectedCategory('all');
                }}
                className="text-brand-800 dark:text-brand-400 hover:underline uppercase tracking-wider"
              >
                Reset Filters
              </button>
            )}
          </div>
        </header>

        {/* Filtered Articles Listing */}
        <div className="space-y-4">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <ArticleListItem key={article.id} article={article} lang={lang} />
            ))
          ) : (
            <EmptyState
              title="No archived articles found"
              description="No dispatches match the selected year and category combination."
              actionLabel="Show all articles"
              onAction={() => {
                setSelectedYear('all');
                setSelectedCategory('all');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsroomArchivePage;
