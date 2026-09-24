import { ArrowRight, Newspaper } from 'lucide-react';
import { Card } from '../Card';
import { Button } from '../Button';
import { EmptyState } from '../EmptyState';
import { Locale } from '../../types';
import { NewsroomArticle } from '../../types/newsroom';
import { getNewsroomTranslation } from '../../locales/newsroomTranslations';

export interface ArticleGridProps {
  articles: NewsroomArticle[];
  lang: Locale;
  heading?: string;
  showViewAll?: boolean;
  emptyMessage?: string;
}

export function ArticleGrid({
  articles,
  lang,
  heading,
  showViewAll = true,
  emptyMessage,
}: ArticleGridProps) {
  const latestArticlesHeading = heading || getNewsroomTranslation(lang, 'newsroom.landing.latest.heading');
  const viewAllLabel = getNewsroomTranslation(lang, 'newsroom.landing.latest.viewAll');
  const emptyText = emptyMessage || getNewsroomTranslation(lang, 'newsroom.landing.latest.empty');
  const readTimeLabel = getNewsroomTranslation(lang, 'newsroom.card.readTime');

  if (articles.length === 0) {
    return (
      <EmptyState
        icon={<Newspaper size={36} />}
        title={latestArticlesHeading}
        description={emptyText}
        actionLabel={viewAllLabel}
        actionHref={`/${lang}/newsroom/archive`}
      />
    );
  }

  return (
    <section className="space-y-8 my-10">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-50 tracking-tight">
          {latestArticlesHeading}
        </h2>

        {showViewAll && (
          <Button
            as="a"
            href={`/${lang}/newsroom/archive`}
            variant="ghost"
            size="sm"
            icon={<ArrowRight size={14} className="rtl:rotate-180" />}
          >
            {viewAllLabel}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {articles.map((article) => {
          const title = article.title[lang] || article.title.en;
          const excerpt = article.excerpt[lang] || article.excerpt.en;
          const categoryName = article.category.name[lang] || article.category.name.en;
          const authorName = article.author.name[lang] || article.author.name.en;

          return (
            <Card
              key={article.id}
              variant="article"
              imageUrl={article.heroImage.url}
              category={categoryName}
              categorySlug={article.category.slug}
              title={title}
              excerpt={excerpt}
              author={{
                name: authorName,
                avatar: article.author.photo,
                title: article.author.title[lang] || article.author.title.en,
              }}
              publishDate={new Date(article.publishDate).toLocaleDateString()}
              readTime={`${article.readTimeMinutes} ${readTimeLabel}`}
              href={`/${lang}/newsroom/${article.slug}`}
              breaking={article.breaking}
              featured={article.featured}
            />
          );
        })}
      </div>
    </section>
  );
}

export default ArticleGrid;
