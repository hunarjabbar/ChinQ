import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FileText,
  Search,
  Filter,
  ArrowRight,
  Calendar,
  Clock,
  Rss,
  Share2,
  Mail,
  CheckCircle2,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { Card } from '../../components/Card';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function NewsroomLandingPage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const [dataVersion, setDataVersion] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    return portalStore.subscribe(() => setDataVersion(v => v + 1));
  }, []);

  const articles = portalStore.getNewsArticles().filter(a => a.status === 'published');
  const categories = portalStore.getNewsCategories();
  const leadArticle = articles.find(a => a.isFeatured) || articles[0];

  const filteredArticles = articles.filter(a => {
    const matchesCat = selectedCategory === 'all' || a.category === selectedCategory;
    const matchesQuery = !searchQuery.trim() ||
      (a.title[currentLang] || a.title.en).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.excerpt[currentLang] || a.excerpt.en).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (portalStore.addSubscriber(newsletterEmail, currentLang, 'Newsroom')) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 text-ink-950 dark:text-white min-h-screen transition-colors duration-300">
      {/* Breaking News Banner Strip */}
      {leadArticle?.isBreaking && (
        <div className="bg-neutral-950 text-white border-b border-neutral-800 py-2.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs gap-4">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="px-2.5 py-0.5 rounded bg-brand-800 text-white font-mono font-black text-[10px] uppercase tracking-wider shrink-0 animate-soft-vibrate">
                {t('newsroom.breaking')}
              </span>
              <Link
                to={`/${currentLang}/newsroom/${leadArticle.slug}`}
                className="hover:text-brand-400 transition-colors truncate font-medium text-neutral-200"
              >
                {leadArticle.title[currentLang] || leadArticle.title.en}
              </Link>
            </div>
            <Link
              to={`/${currentLang}/newsroom/${leadArticle.slug}`}
              className="text-brand-400 font-bold shrink-0 hover:underline flex items-center gap-1"
            >
              <span>Read</span>
              <ArrowRight size={12} className="rtl:rotate-180" />
            </Link>
          </div>
        </div>
      )}

      {/* Newsroom Top Hero Bar */}
      <div className="bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-brand-800 dark:text-brand-400 font-bold uppercase tracking-wider mb-2">
                <FileText size={16} />
                <span>{t('newsroom.title')}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-black text-ink-950 dark:text-white">
                {t('newsroom.title')}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-xl">
                {t('newsroom.subtitle')}
              </p>
            </div>

            {/* Feeds & Search Link */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={`/${currentLang}/newsroom/search`}
                className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-brand-800 dark:hover:border-brand-500 text-xs font-bold text-ink-950 dark:text-white flex items-center gap-2 shadow-xs transition-colors"
              >
                <Search size={14} className="text-brand-800 dark:text-brand-400" />
                <span>Search Archive</span>
              </Link>

              <Link
                to={`/${currentLang}/newsroom/archive`}
                className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-brand-800 dark:hover:border-brand-500 text-xs font-bold text-ink-950 dark:text-white shadow-xs transition-colors"
              >
                <span>{t('newsroom.archive')}</span>
              </Link>

              <div className="flex items-center gap-1 bg-white dark:bg-neutral-800 p-1 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs">
                <Link
                  to={`/${currentLang}/newsroom/feed/rss`}
                  className="px-2.5 py-1 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-950/50 hover:text-brand-800 dark:hover:text-brand-400 text-neutral-600 dark:text-neutral-300 font-mono text-[11px] font-bold transition-colors"
                >
                  RSS
                </Link>
                <Link
                  to={`/${currentLang}/newsroom/feed/atom`}
                  className="px-2.5 py-1 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-950/50 hover:text-brand-800 dark:hover:text-brand-400 text-neutral-600 dark:text-neutral-300 font-mono text-[11px] font-bold transition-colors"
                >
                  Atom
                </Link>
                <Link
                  to={`/${currentLang}/newsroom/feed/json`}
                  className="px-2.5 py-1 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-950/50 hover:text-brand-800 dark:hover:text-brand-400 text-neutral-600 dark:text-neutral-300 font-mono text-[11px] font-bold transition-colors"
                >
                  JSON
                </Link>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-neutral-200 dark:border-neutral-800 pt-6">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-sm'
                  : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-brand-800 dark:hover:border-brand-500'
              }`}
            >
              {t('newsroom.allCategories')}
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-brand-800 text-white shadow-sm'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-brand-800 dark:hover:border-brand-500'
                }`}
              >
                {cat.name[currentLang] || cat.name.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Lead Featured Article */}
        {leadArticle && selectedCategory === 'all' && (
          <div className="mb-14">
            <Link
              to={`/${currentLang}/newsroom/${leadArticle.slug}`}
              className="ica-card-interactive group grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-brand-800 dark:hover:border-brand-500 overflow-hidden shadow-xs hover:shadow-xl transition-all"
            >
              <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative">
                <img
                  src={leadArticle.imageUrl}
                  alt={leadArticle.title[currentLang] || leadArticle.title.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 inset-inline-start-4 bg-brand-800 text-white text-xs font-mono font-black uppercase px-3 py-1 rounded shadow-md">
                  FEATURED DISPATCH
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-brand-800 dark:text-brand-400" />
                      <span>{leadArticle.publishDate}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-brand-800 dark:text-brand-400" />
                      <span>{leadArticle.readingTimeMinutes} {t('newsroom.readTime')}</span>
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-ink-950 dark:text-white group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors leading-tight">
                    {leadArticle.title[currentLang] || leadArticle.title.en}
                  </h2>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-3">
                    {leadArticle.excerpt[currentLang] || leadArticle.excerpt.en}
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={leadArticle.author.avatar}
                      alt={leadArticle.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-ink-950 dark:text-white">{leadArticle.author.name}</div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                        {leadArticle.author.title[currentLang] || leadArticle.author.title.en}
                      </div>
                    </div>
                  </div>

                  <span className="text-brand-800 dark:text-brand-400 font-black text-xs uppercase flex items-center gap-1 cta-arrow transition-transform">
                    <span>Read Dispatch</span>
                    <ArrowRight size={16} className="rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map(article => (
            <Card
              key={article.id}
              variant="portal"
              href={`/${currentLang}/newsroom/${article.slug}`}
              imageUrl={article.imageUrl}
              category={article.tags[0] || 'Dispatch'}
              title={article.title[currentLang] || article.title.en}
              excerpt={article.excerpt[currentLang] || article.excerpt.en}
              publishDate={article.publishDate}
              readTime={`${article.readingTimeMinutes} ${t('newsroom.readTime')}`}
              author={{
                name: article.author.name,
                avatar: article.author.avatar,
                title: article.author.title[currentLang] || article.author.title.en
              }}
              ctaText="Read Article"
            />
          ))}
        </div>

        {/* Newsletter In-Feed Strip */}
        <div className="mt-16 p-8 rounded-3xl bg-neutral-950 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-neutral-800 shadow-xl">
          <div className="space-y-2 max-w-lg">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              {t('publicPortal.newsletterHeading')}
            </h3>
            <p className="text-xs text-neutral-400">
              {t('publicPortal.newsletterSubtitle')}
            </p>
          </div>

          {subscribed ? (
            <div className="p-3 rounded-xl bg-green-900/60 border border-green-500 text-green-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>{t('publicPortal.subscribeSuccess')}</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder={t('publicPortal.emailPlaceholder')}
                className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs focus:border-brand-800 focus:outline-none w-64"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsroomLandingPage;
