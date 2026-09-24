import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Locale } from '../../types';
import { NewsroomArticle } from '../../types/newsroom';
import { getNewsroomTranslation } from '../../locales/newsroomTranslations';

export interface ArticleListItemProps {
  article: NewsroomArticle;
  lang: Locale;
}

export function ArticleListItem({ article, lang }: ArticleListItemProps) {
  const title = article.title[lang] || article.title.en;
  const excerpt = article.excerpt[lang] || article.excerpt.en;
  const categoryName = article.category.name[lang] || article.category.name.en;
  const authorName = article.author.name[lang] || article.author.name.en;
  const readTimeLabel = getNewsroomTranslation(lang, 'newsroom.card.readTime');
  const byLabel = getNewsroomTranslation(lang, 'newsroom.card.by');

  return (
    <article className="group p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-brand-800 dark:hover:border-brand-500 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col md:flex-row gap-6 items-start">
      <Link
        to={`/${lang}/newsroom/${article.slug}`}
        className="w-full md:w-64 aspect-video shrink-0 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 block"
      >
        <img
          src={article.heroImage.url}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </Link>

      <div className="flex flex-col justify-between flex-grow space-y-3 w-full">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-xs font-bold text-neutral-500 dark:text-neutral-400">
            <span className="text-[11px] font-black uppercase tracking-wider text-brand-800 dark:text-brand-400">
              {categoryName}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-brand-800 dark:text-brand-400" />
              <span>{new Date(article.publishDate).toLocaleDateString()}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-brand-800 dark:text-brand-400" />
              <span>{article.readTimeMinutes} {readTimeLabel}</span>
            </span>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors leading-snug">
            <Link to={`/${lang}/newsroom/${article.slug}`}>
              {title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold">
            {byLabel} <span className="text-neutral-800 dark:text-neutral-200 font-bold">{authorName}</span>
          </span>

          <Link
            to={`/${lang}/newsroom/${article.slug}`}
            className="inline-flex items-center gap-1 font-bold text-brand-800 dark:text-brand-400 uppercase text-xs hover:underline"
          >
            <span>Read dispatch</span>
            <ArrowRight size={13} className="rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ArticleListItem;
