import { Card } from '../Card';
import { Locale } from '../../types';
import { NewsroomArticle } from '../../types/newsroom';
import { getNewsroomTranslation } from '../../locales/newsroomTranslations';

export interface RelatedArticlesProps {
  currentArticle: NewsroomArticle;
  articles: NewsroomArticle[];
  lang: Locale;
}

export function RelatedArticles({ currentArticle, articles, lang }: RelatedArticlesProps) {
  const relatedHeading = getNewsroomTranslation(lang, 'newsroom.article.related');
  const readTimeLabel = getNewsroomTranslation(lang, 'newsroom.card.readTime');

  // Filter out the current article and prefer same category
  const filtered = articles
    .filter((a) => a.id !== currentArticle.id)
    .sort((a, b) => {
      const aSameCat = a.category.id === currentArticle.category.id ? 1 : 0;
      const bSameCat = b.category.id === currentArticle.category.id ? 1 : 0;
      return bSameCat - aSameCat;
    })
    .slice(0, 3);

  if (filtered.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-6">
      <h3 className="font-serif text-2xl font-black text-neutral-900 dark:text-neutral-50">
        {relatedHeading}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((art) => {
          const title = art.title[lang] || art.title.en;
          const excerpt = art.excerpt[lang] || art.excerpt.en;
          const categoryName = art.category.name[lang] || art.category.name.en;
          const authorName = art.author.name[lang] || art.author.name.en;

          return (
            <Card
              key={art.id}
              variant="article"
              imageUrl={art.heroImage.url}
              category={categoryName}
              categorySlug={art.category.slug}
              title={title}
              excerpt={excerpt}
              author={{
                name: authorName,
                avatar: art.author.photo,
              }}
              publishDate={new Date(art.publishDate).toLocaleDateString()}
              readTime={`${art.readTimeMinutes} ${readTimeLabel}`}
              href={`/${lang}/newsroom/${art.slug}`}
              breaking={art.breaking}
            />
          );
        })}
      </div>
    </section>
  );
}

export default RelatedArticles;
