import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, User, Folder } from 'lucide-react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { AuthorByline } from '../../components/newsroom/AuthorByline';
import { ShareButtons } from '../../components/newsroom/ShareButtons';
import { RelatedArticles } from '../../components/newsroom/RelatedArticles';
import { newsroomArticles } from '../../data/newsroomData';
import { Locale } from '../../types';
import { getNewsroomTranslation } from '../../locales/newsroomTranslations';

export function NewsroomArticleDetailPage() {
  const { lang: paramLang, slug } = useParams<{ lang?: string; slug?: string }>();
  const navigate = useNavigate();

  const lang: Locale = (['en', 'ar', 'zh', 'ckb'].includes(paramLang || '')
    ? paramLang
    : paramLang === 'ck'
    ? 'ckb'
    : 'en') as Locale;

  const article = newsroomArticles.find((a) => a.slug === slug);

  const homeLabel = getNewsroomTranslation(lang, 'newsroom.breadcrumb.home');
  const newsroomLabel = getNewsroomTranslation(lang, 'newsroom.breadcrumb.label');
  const backLabel = getNewsroomTranslation(lang, 'newsroom.article.backToNewsroom');
  const readTimeLabel = getNewsroomTranslation(lang, 'newsroom.card.readTime');
  const publishedOnLabel = getNewsroomTranslation(lang, 'newsroom.card.publishedOn');
  const breakingLabel = getNewsroomTranslation(lang, 'newsroom.breaking.label');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <h2 className="text-2xl font-black text-neutral-900 dark:text-neutral-100 mb-4 font-serif">
          Dispatch Not Found
        </h2>
        <p className="text-neutral-500 mb-6 max-w-md text-sm">
          The requested newsroom article does not exist or has been archived.
        </p>
        <Button onClick={() => navigate(`/${lang}/newsroom`)} variant="primary">
          {backLabel}
        </Button>
      </div>
    );
  }

  const title = article.title[lang] || article.title.en;
  const subtitle = article.subtitle[lang] || article.subtitle.en;
  const categoryName = article.category.name[lang] || article.category.name.en;
  const authorName = article.author.name[lang] || article.author.name.en;
  const bodyText = article.body[lang] || article.body.en;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <article className="min-h-screen bg-neutral-50/60 dark:bg-neutral-950 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumbs */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <Breadcrumb
            items={[
              { label: homeLabel, href: `/${lang}` },
              { label: newsroomLabel, href: `/${lang}/newsroom` },
              { label: categoryName, href: `/${lang}/newsroom/category/${article.category.slug}` },
              { label: title.slice(0, 32) + '...' },
            ]}
          />

          <Link
            to={`/${lang}/newsroom`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-brand-800 transition-colors uppercase tracking-wider shrink-0"
          >
            <ArrowLeft size={14} className="rtl:rotate-180" />
            <span>{backLabel}</span>
          </Link>
        </div>

        {/* Article Header Metadata */}
        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <Link to={`/${lang}/newsroom/category/${article.category.slug}`}>
              <Badge variant="category" size="md">
                {categoryName}
              </Badge>
            </Link>
            {article.breaking && (
              <Badge variant="breaking" size="md">
                {breakingLabel}
              </Badge>
            )}
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl lg:text-[2.65rem] font-black text-neutral-900 dark:text-neutral-50 leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="font-sans text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
              {subtitle}
            </p>
          )}

          {/* Author Byline & Date Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
            <Link
              to={`/${lang}/newsroom/author/${article.author.slug}`}
              className="flex items-center gap-2.5 font-bold hover:text-brand-800 transition-colors"
            >
              <img
                src={article.author.photo}
                alt={authorName}
                className="w-8 h-8 rounded-full object-cover border border-neutral-300 dark:border-neutral-700"
              />
              <div className="flex flex-col">
                <span className="text-neutral-900 dark:text-neutral-100 font-bold">{authorName}</span>
                <span className="text-[10px] text-neutral-400 font-normal">
                  {article.author.title[lang] || article.author.title.en}
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-brand-800 dark:text-brand-400" />
                <span>
                  {publishedOnLabel} {new Date(article.publishDate).toLocaleDateString()}
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-brand-800 dark:text-brand-400" />
                <span>{article.readTimeMinutes} {readTimeLabel}</span>
              </span>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-md mb-8">
          <img
            src={article.heroImage.url}
            alt={article.heroImage.alt[lang] || article.heroImage.alt.en || title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 inset-inline-start-3 bg-neutral-900/80 backdrop-blur-xs text-white text-[11px] px-3 py-1 rounded-md">
            {article.heroImage.credit}
          </div>
        </div>

        {/* Social Share Buttons */}
        <ShareButtons title={title} url={currentUrl} lang={lang} />

        {/* Long-form Article Body */}
        <div className="prose prose-neutral dark:prose-invert max-w-none text-neutral-800 dark:text-neutral-200 font-sans text-base leading-relaxed space-y-6">
          {bodyText.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="whitespace-pre-line leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags Row */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-6 mt-8 border-t border-neutral-200 dark:border-neutral-800">
            <span className="text-xs font-bold uppercase text-neutral-400 me-2">Tags:</span>
            {article.tags.map((tag) => (
              <Link
                key={tag.id}
                to={`/${lang}/newsroom/tag/${tag.slug}`}
                className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-brand-50 hover:text-brand-800 dark:hover:bg-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                #{tag.name[lang] || tag.name.en}
              </Link>
            ))}
          </div>
        )}

        {/* Author Bio Box */}
        <div className="mt-10">
          <AuthorByline author={article.author} lang={lang} showBio={true} />
        </div>

        {/* Related Articles */}
        <RelatedArticles
          currentArticle={article}
          articles={newsroomArticles}
          lang={lang}
        />
      </div>
    </article>
  );
}

export default NewsroomArticleDetailPage;
