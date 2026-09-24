import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Tag } from 'lucide-react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { ArticleGrid } from '../../components/newsroom/ArticleGrid';
import { SearchBar } from '../../components/newsroom/SearchBar';
import { newsroomArticles, newsroomTags } from '../../data/newsroomData';
import { Locale } from '../../types';
import { getNewsroomTranslation } from '../../locales/newsroomTranslations';

export function NewsroomTagPage() {
  const { lang: paramLang, tag: tagSlug } = useParams<{
    lang?: string;
    tag?: string;
  }>();

  const lang: Locale = (['en', 'ar', 'zh', 'ckb'].includes(paramLang || '')
    ? paramLang
    : paramLang === 'ck'
    ? 'ckb'
    : 'en') as Locale;

  const currentTag = newsroomTags.find((t) => t.slug === tagSlug);

  const homeLabel = getNewsroomTranslation(lang, 'newsroom.breadcrumb.home');
  const newsroomLabel = getNewsroomTranslation(lang, 'newsroom.breadcrumb.label');

  const tagName = currentTag
    ? currentTag.name[lang] || currentTag.name.en
    : tagSlug || 'Tag';

  const matchedArticles = useMemo(() => {
    return newsroomArticles.filter(
      (a) => a.tags.some((t) => t.slug === tagSlug) && a.status === 'published'
    );
  }, [tagSlug]);

  return (
    <div className="min-h-screen bg-neutral-50/60 dark:bg-neutral-950 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <Breadcrumb
            items={[
              { label: homeLabel, href: `/${lang}` },
              { label: newsroomLabel, href: `/${lang}/newsroom` },
              { label: `Tag: #${tagName}` },
            ]}
          />

          <div className="w-full md:w-auto">
            <SearchBar lang={lang} />
          </div>
        </div>

        <header className="p-8 sm:p-10 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm mb-8 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
            <Tag size={13} />
            <span>Topic Tag</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-50">
            #{tagName}
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Dispatches and official releases tagged under #{tagName}.
          </p>
        </header>

        <ArticleGrid
          articles={matchedArticles}
          lang={lang}
          heading={`Tagged Dispatches (${matchedArticles.length})`}
          showViewAll={false}
          emptyMessage={`No dispatches found tagged under #${tagName}.`}
        />
      </div>
    </div>
  );
}

export default NewsroomTagPage;
