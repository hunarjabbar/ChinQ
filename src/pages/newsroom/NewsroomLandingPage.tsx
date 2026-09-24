import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Rss, Radio } from 'lucide-react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { BreakingNewsStrip } from '../../components/newsroom/BreakingNewsStrip';
import { NewsroomHero } from '../../components/newsroom/NewsroomHero';
import { CategoryFilter } from '../../components/newsroom/CategoryFilter';
import { ArticleGrid } from '../../components/newsroom/ArticleGrid';
import { SearchBar } from '../../components/newsroom/SearchBar';
import { NewsroomNewsletterSignup } from '../../components/newsroom/NewsroomNewsletterSignup';
import { newsroomArticles, newsroomCategories } from '../../data/newsroomData';
import { Locale } from '../../types';
import { getNewsroomTranslation } from '../../locales/newsroomTranslations';

export function NewsroomLandingPage() {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const lang: Locale = (['en', 'ar', 'zh', 'ckb'].includes(paramLang || '')
    ? paramLang
    : paramLang === 'ck'
    ? 'ckb'
    : 'en') as Locale;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const navLabel = getNewsroomTranslation(lang, 'newsroom.nav.label');
  const homeLabel = getNewsroomTranslation(lang, 'newsroom.breadcrumb.home');
  const breakingLabel = getNewsroomTranslation(lang, 'newsroom.breaking.label');
  const readLabel = getNewsroomTranslation(lang, 'newsroom.landing.hero.readArticle');
  const rssLabel = getNewsroomTranslation(lang, 'newsroom.feed.rss');
  const atomLabel = getNewsroomTranslation(lang, 'newsroom.feed.atom');
  const jsonLabel = getNewsroomTranslation(lang, 'newsroom.feed.json');

  // Lead / Hero article is the highest priority featured article
  const leadArticle = useMemo(() => {
    return (
      newsroomArticles.find((a) => a.featured && a.status === 'published') ||
      newsroomArticles[0]
    );
  }, []);

  // Filtered latest articles for grid (excluding the hero article)
  const nonHeroArticles = useMemo(() => {
    return newsroomArticles.filter((a) => a.id !== leadArticle?.id && a.status === 'published');
  }, [leadArticle]);

  const displayedArticles = useMemo(() => {
    if (selectedCategory === 'all') {
      return nonHeroArticles.slice(0, 6);
    }
    return nonHeroArticles.filter((a) => a.category.slug === selectedCategory);
  }, [selectedCategory, nonHeroArticles]);

  return (
    <div className="min-h-screen bg-neutral-50/60 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-6 sm:py-10">
      {/* Breaking News Ticker Strip */}
      <BreakingNewsStrip
        articles={newsroomArticles}
        lang={lang}
        label={breakingLabel}
        readLabel={`${readLabel} →`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row with Breadcrumbs & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <Breadcrumb
            items={[
              { label: homeLabel, href: `/${lang}` },
              { label: navLabel },
            ]}
          />

          <div className="w-full md:w-auto">
            <SearchBar lang={lang} />
          </div>
        </div>

        {/* Hero Article Section */}
        {leadArticle && <NewsroomHero article={leadArticle} lang={lang} />}

        {/* Category Navigation Pills */}
        <CategoryFilter
          categories={newsroomCategories}
          activeCategorySlug={selectedCategory}
          lang={lang}
          onSelectCategory={(slug) => setSelectedCategory(slug)}
        />

        {/* Latest Articles Grid */}
        <ArticleGrid
          articles={displayedArticles}
          lang={lang}
          showViewAll={true}
        />

        {/* Newsletter Subscription Box */}
        <NewsroomNewsletterSignup lang={lang} />

        {/* Syndication & Feed Direct Access Strip */}
        <div className="pt-8 pb-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <Radio size={14} className="text-brand-800 dark:text-brand-400" />
            <span className="uppercase tracking-wider">Syndication Protocols:</span>
          </div>

          <div className="flex items-center flex-wrap gap-4">
            <a
              href={`/newsroom/feed/rss.xml`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-brand-800 dark:hover:text-brand-400 transition-colors"
            >
              <Rss size={13} className="text-amber-600" />
              <span>{rssLabel}</span>
            </a>
            <span>•</span>
            <a
              href={`/newsroom/feed/atom.xml`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors"
            >
              {atomLabel}
            </a>
            <span>•</span>
            <a
              href={`/newsroom/feed/feed.json`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors"
            >
              {jsonLabel}
            </a>
            <span>•</span>
            <Link
              to={`/${lang}/newsroom/archive`}
              className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors"
            >
              {getNewsroomTranslation(lang, 'newsroom.footer.archive')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsroomLandingPage;
