import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Twitter, Linkedin } from 'lucide-react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { ArticleGrid } from '../../components/newsroom/ArticleGrid';
import { SearchBar } from '../../components/newsroom/SearchBar';
import { newsroomArticles, newsroomAuthors } from '../../data/newsroomData';
import { Locale } from '../../types';
import { getNewsroomTranslation } from '../../locales/newsroomTranslations';

export function NewsroomAuthorPage() {
  const { lang: paramLang, author: authorSlug } = useParams<{
    lang?: string;
    author?: string;
  }>();

  const lang: Locale = (['en', 'ar', 'zh', 'ckb'].includes(paramLang || '')
    ? paramLang
    : paramLang === 'ck'
    ? 'ckb'
    : 'en') as Locale;

  const currentAuthor = newsroomAuthors.find((a) => a.slug === authorSlug);

  const homeLabel = getNewsroomTranslation(lang, 'newsroom.breadcrumb.home');
  const newsroomLabel = getNewsroomTranslation(lang, 'newsroom.breadcrumb.label');

  const authorName = currentAuthor
    ? currentAuthor.name[lang] || currentAuthor.name.en
    : authorSlug || 'Author';

  const authorTitle = currentAuthor
    ? currentAuthor.title[lang] || currentAuthor.title.en
    : '';

  const authorBio = currentAuthor
    ? currentAuthor.bio[lang] || currentAuthor.bio.en
    : '';

  const authorArticles = useMemo(() => {
    return newsroomArticles.filter(
      (a) => a.author.slug === authorSlug && a.status === 'published'
    );
  }, [authorSlug]);

  return (
    <div className="min-h-screen bg-neutral-50/60 dark:bg-neutral-950 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <Breadcrumb
            items={[
              { label: homeLabel, href: `/${lang}` },
              { label: newsroomLabel, href: `/${lang}/newsroom` },
              { label: 'Authors' },
              { label: authorName },
            ]}
          />

          <div className="w-full md:w-auto">
            <SearchBar lang={lang} />
          </div>
        </div>

        {/* Author Bio Header Card */}
        {currentAuthor && (
          <header className="p-8 sm:p-10 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm mb-10 flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-start">
            <img
              src={currentAuthor.photo}
              alt={authorName}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-neutral-100 dark:border-neutral-800 shadow-md shrink-0"
            />

            <div className="space-y-3 flex-grow">
              <div className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
                Editorial Contributor
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-50">
                {authorName}
              </h1>
              <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                {authorTitle}
              </p>
              {authorBio && (
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
                  {authorBio}
                </p>
              )}

              {currentAuthor.publicLinks && (
                <div className="pt-2 flex items-center justify-center md:justify-start gap-3">
                  {currentAuthor.publicLinks.twitter && (
                    <a
                      href={currentAuthor.publicLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:text-sky-500 transition-colors"
                      aria-label="Twitter Profile"
                    >
                      <Twitter size={16} />
                    </a>
                  )}
                  {currentAuthor.publicLinks.linkedin && (
                    <a
                      href={currentAuthor.publicLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:text-blue-600 transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </header>
        )}

        {/* Dispatches by Author */}
        <ArticleGrid
          articles={authorArticles}
          lang={lang}
          heading={`Published Dispatches (${authorArticles.length})`}
          showViewAll={false}
          emptyMessage={`No dispatches currently listed for ${authorName}.`}
        />
      </div>
    </div>
  );
}

export default NewsroomAuthorPage;
