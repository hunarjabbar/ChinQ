import { useParams } from 'react-router-dom';
import { Rss, Download, ExternalLink, ArrowLeft } from 'lucide-react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Button } from '../../components/Button';
import { newsroomArticles } from '../../data/newsroomData';
import { Locale } from '../../types';
import { getNewsroomTranslation } from '../../locales/newsroomTranslations';

export function NewsroomFeedViewer() {
  const { lang: paramLang, feedType } = useParams<{ lang?: string; feedType?: string }>();
  const lang: Locale = (['en', 'ar', 'zh', 'ckb'].includes(paramLang || '')
    ? paramLang
    : 'en') as Locale;

  const resolvedFeed = feedType || 'rss.xml';
  const feedUrl = `/newsroom/feed/${resolvedFeed}`;

  const homeLabel = getNewsroomTranslation(lang, 'newsroom.breadcrumb.home');
  const newsroomLabel = getNewsroomTranslation(lang, 'newsroom.breadcrumb.label');

  return (
    <div className="min-h-screen bg-neutral-50/60 dark:bg-neutral-950 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: homeLabel, href: `/${lang}` },
              { label: newsroomLabel, href: `/${lang}/newsroom` },
              { label: `Syndication: ${resolvedFeed}` },
            ]}
          />
        </div>

        <div className="p-8 sm:p-12 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-md space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 flex items-center justify-center">
            <Rss size={24} />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-3xl font-black text-neutral-900 dark:text-neutral-50">
              Newsroom Syndication Feed: {resolvedFeed}
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
              Real-time machine-readable syndication feed adhering to standard specifications (RSS 2.0, Atom 1.0, and JSON Feed 1.1) for automated ingestion, press terminals, and reader applications.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 font-mono text-xs text-neutral-800 dark:text-neutral-200 break-all select-all flex items-center justify-between gap-3">
            <span>{typeof window !== 'undefined' ? `${window.location.origin}${feedUrl}` : feedUrl}</span>
            <a
              href={feedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-brand-800 hover:text-brand-900"
            >
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <Button as="a" href={feedUrl} target="_blank" rel="noopener noreferrer" variant="primary" icon={<Download size={14} />}>
              Open Raw Feed Endpoint
            </Button>
            <Button as="a" href={`/${lang}/newsroom`} variant="outline" icon={<ArrowLeft size={14} className="rtl:rotate-180" />}>
              Back to Newsroom
            </Button>
          </div>

          <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800">
            <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-3">
              Included Dispatches ({newsroomArticles.length}):
            </h3>
            <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
              {newsroomArticles.map((art) => (
                <li key={art.id} className="flex items-center justify-between py-1 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
                  <span className="font-medium line-clamp-1">{art.title[lang] || art.title.en}</span>
                  <span className="text-neutral-400 shrink-0 font-mono text-[10px] ps-4">{art.publishDate}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsroomFeedViewer;
