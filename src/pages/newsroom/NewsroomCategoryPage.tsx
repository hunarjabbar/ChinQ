import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb } from '../../components/Breadcrumb';
import { ArticleGrid } from '../../components/newsroom/ArticleGrid';
import { CategoryFilter } from '../../components/newsroom/CategoryFilter';
import { SearchBar } from '../../components/newsroom/SearchBar';
import { NewsroomNewsletterSignup } from '../../components/newsroom/NewsroomNewsletterSignup';
import { newsroomArticles, newsroomCategories } from '../../data/newsroomData';
import { Locale } from '../../types';
import { getNewsroomTranslation } from '../../locales/newsroomTranslations';

export function NewsroomCategoryPage() {
  const { lang: paramLang, category: categorySlug } = useParams<{
    lang?: string;
    category?: string;
  }>();

  const lang: Locale = (['en', 'ar', 'zh', 'ckb'].includes(paramLang || '')
    ? paramLang
    : paramLang === 'ck'
    ? 'ckb'
    : 'en') as Locale;

  const currentCategory = newsroomCategories.find((c) => c.slug === categorySlug);

  const homeLabel = getNewsroomTranslation(lang, 'newsroom.breadcrumb.home');
  const newsroomLabel = getNewsroomTranslation(lang, 'newsroom.breadcrumb.label');
  const categoriesLabel = getNewsroomTranslation(lang, 'newsroom.filter.categories');

  const categoryName = currentCategory
    ? currentCategory.name[lang] || currentCategory.name.en
    : categorySlug || 'Category';

  const categoryDesc = currentCategory
    ? currentCategory.description[lang] || currentCategory.description.en
    : '';

  const matchedArticles = useMemo(() => {
    return newsroomArticles.filter((a) => a.category.slug === categorySlug && a.status === 'published');
  }, [categorySlug]);

  return (
    <div className="min-h-screen bg-neutral-50/60 dark:bg-neutral-950 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row with Breadcrumbs & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <Breadcrumb
            items={[
              { label: homeLabel, href: `/${lang}` },
              { label: newsroomLabel, href: `/${lang}/newsroom` },
              { label: categoriesLabel },
              { label: categoryName },
            ]}
          />

          <div className="w-full md:w-auto">
            <SearchBar lang={lang} />
          </div>
        </div>

        {/* Category Header */}
        <header className="p-8 sm:p-10 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm mb-8 space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
            {categoriesLabel}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-50">
            {categoryName}
          </h1>
          {categoryDesc && (
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              {categoryDesc}
            </p>
          )}
        </header>

        {/* Category Filter Pills (Link Mode) */}
        <CategoryFilter
          categories={newsroomCategories}
          activeCategorySlug={categorySlug}
          lang={lang}
          isLinkMode={true}
        />

        {/* Article Grid */}
        <ArticleGrid
          articles={matchedArticles}
          lang={lang}
          heading={`${categoryName} (${matchedArticles.length})`}
          showViewAll={false}
          emptyMessage={`No dispatches found in the ${categoryName} category.`}
        />

        {/* Newsletter Signup */}
        <NewsroomNewsletterSignup lang={lang} />
      </div>
    </div>
  );
}

export default NewsroomCategoryPage;
