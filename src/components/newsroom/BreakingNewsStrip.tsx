import { Link } from 'react-router-dom';
import { Newspaper } from 'lucide-react';
import { Button } from '../Button';
import { Locale } from '../../types';
import { NewsroomArticle } from '../../types/newsroom';

export interface BreakingNewsStripProps {
  articles: NewsroomArticle[];
  lang: Locale;
  label?: string;
  readLabel?: string;
}

export function BreakingNewsStrip({
  articles,
  lang,
  label = 'Breaking',
  readLabel = 'Read →',
}: BreakingNewsStripProps) {
  const breakingArticles = articles.filter((a) => a.breaking && a.status === 'published');

  if (breakingArticles.length === 0) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full bg-red-50 dark:bg-red-950/30 border-y border-red-200 dark:border-red-900/50 py-2.5 px-4 mb-6 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth w-full">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-red-600 text-white text-[11px] font-black uppercase tracking-wider shrink-0 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="flex items-center gap-1">
              <Newspaper size={12} />
              <span>{label}</span>
            </span>
          </div>

          <div className="flex items-center gap-6 divide-x divide-red-200 dark:divide-red-800/40 rtl:divide-x-reverse whitespace-nowrap overflow-x-auto text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {breakingArticles.map((art) => (
              <div key={art.id} className="flex items-center gap-3 ps-3 first:ps-0 shrink-0">
                <Link
                  to={`/${lang}/newsroom/${art.slug}`}
                  className="hover:text-red-700 dark:hover:text-red-400 transition-colors line-clamp-1 max-w-lg sm:max-w-2xl font-bold"
                >
                  {art.title[lang] || art.title.en}
                </Link>
                <Button
                  as="a"
                  href={`/${lang}/newsroom/${art.slug}`}
                  variant="ghost"
                  size="sm"
                  className="text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 font-bold px-2 py-0.5"
                >
                  {readLabel}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreakingNewsStrip;
