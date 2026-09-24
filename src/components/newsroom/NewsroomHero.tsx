import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Locale } from '../../types';
import { NewsroomArticle } from '../../types/newsroom';
import { getNewsroomTranslation } from '../../locales/newsroomTranslations';

export interface NewsroomHeroProps {
  article: NewsroomArticle;
  lang: Locale;
}

export function NewsroomHero({ article, lang }: NewsroomHeroProps) {
  const title = article.title[lang] || article.title.en;
  const excerpt = article.excerpt[lang] || article.excerpt.en;
  const categoryName = article.category.name[lang] || article.category.name.en;
  const authorName = article.author.name[lang] || article.author.name.en;
  const readArticleLabel = getNewsroomTranslation(lang, 'newsroom.landing.hero.readArticle');
  const readTimeLabel = getNewsroomTranslation(lang, 'newsroom.card.readTime');
  const breakingLabel = getNewsroomTranslation(lang, 'newsroom.breaking.label');
  const byLabel = getNewsroomTranslation(lang, 'newsroom.card.by');

  const articleUrl = `/${lang}/newsroom/${article.slug}`;

  return (
    <article className="w-full bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden mb-12 group">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: 60% width on desktop */}
        <div className="lg:col-span-7 relative aspect-video lg:aspect-auto min-h-[260px] sm:min-h-[380px] lg:min-h-[460px] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Link to={articleUrl} className="block w-full h-full">
            <img
              src={article.heroImage.url}
              alt={article.heroImage.alt[lang] || article.heroImage.alt.en || title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="eager"
              referrerPolicy="no-referrer"
            />
          </Link>

          <div className="absolute top-4 inset-inline-start-4 flex flex-wrap items-center gap-2 pointer-events-none">
            <Badge variant="category" size="md">
              {categoryName}
            </Badge>
            {article.breaking && (
              <Badge variant="breaking" size="md">
                {breakingLabel}
              </Badge>
            )}
          </div>

          <div className="absolute bottom-3 inset-inline-start-3 bg-neutral-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2.5 py-1 rounded-md opacity-90 pointer-events-none">
            {article.heroImage.credit}
          </div>
        </div>

        {/* Right Column: 40% width on desktop */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-brand-800 dark:text-rose-400">
                {categoryName}
              </span>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <span className="text-neutral-500 dark:text-neutral-400 text-xs font-semibold">
                {article.featured ? 'Featured Lead' : 'Lead Dispatch'}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.5rem] font-black text-neutral-900 dark:text-neutral-50 leading-tight group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors">
              <Link to={articleUrl} className="hover:underline">
                {title}
              </Link>
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans line-clamp-3">
              {excerpt}
            </p>
          </div>

          <div className="space-y-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            {/* Author Byline */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Link
                to={`/${lang}/newsroom/author/${article.author.slug}`}
                className="flex items-center gap-3 group/author"
              >
                <img
                  src={article.author.photo}
                  alt={authorName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-neutral-800 shadow-xs"
                />
                <div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    {byLabel} <span className="font-bold text-neutral-900 dark:text-neutral-100 group-hover/author:text-brand-800 transition-colors">{authorName}</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1">
                    {article.author.title[lang] || article.author.title.en}
                  </div>
                </div>
              </Link>

              <div className="flex items-center gap-3 text-xs font-bold text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1">
                  <Calendar size={13} className="text-brand-800 dark:text-brand-400" />
                  <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={13} className="text-brand-800 dark:text-brand-400" />
                  <span>{article.readTimeMinutes} {readTimeLabel}</span>
                </span>
              </div>
            </div>

            {/* Read Article Button */}
            <div>
              <Button
                as="a"
                href={articleUrl}
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
                icon={<ArrowRight size={16} />}
              >
                {readArticleLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default NewsroomHero;
