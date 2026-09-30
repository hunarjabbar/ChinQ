import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  TrendingUp,
  Globe,
  Radio,
  FileText,
  Layers,
  Sparkles,
  Play,
  Mail,
  CheckCircle,
  Eye,
  Share2,
  Calendar,
  Clock,
  Zap,
  Coins,
  GraduationCap,
  FileCheck,
  Ship,
  Award,
  Cpu
} from 'lucide-react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function IcaPublicHome() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const [dataVersion, setDataVersion] = useState(0);
  const [emailInput, setEmailInput] = useState('');
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = portalStore.subscribe(() => {
      setDataVersion(v => v + 1);
    });
    return unsubscribe;
  }, []);

  const hero = portalStore.getHeroStory();
  const worldStories = portalStore.getWorldStories();
  const trendingItems = portalStore.getTrendingItems();
  const initiatives = portalStore.getInitiatives();
  const featured = portalStore.getFeaturedItems();
  const mediaItems = portalStore.getMediaItems().slice(0, 3);
  const liveStream = portalStore.getLiveStream();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (portalStore.addSubscriber(emailInput, currentLang, 'Public Portal')) {
      setSubscribedSuccess(true);
      setEmailInput('');
      setTimeout(() => setSubscribedSuccess(false), 6000);
    }
  };

  const getInitiativeIcon = (name: string) => {
    switch (name) {
      case 'Zap': return <Zap size={20} className="text-brand-800 dark:text-brand-400" />;
      case 'Coins': return <Coins size={20} className="text-brand-800 dark:text-brand-400" />;
      case 'GraduationCap': return <GraduationCap size={20} className="text-brand-800 dark:text-brand-400" />;
      case 'Passport': return <FileCheck size={20} className="text-brand-800 dark:text-brand-400" />;
      case 'Ship': return <Ship size={20} className="text-brand-800 dark:text-brand-400" />;
      case 'Award': return <Award size={20} className="text-brand-800 dark:text-brand-400" />;
      case 'Cpu': return <Cpu size={20} className="text-brand-800 dark:text-brand-400" />;
      default: return <Layers size={20} className="text-brand-800 dark:text-brand-400" />;
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 text-ink-950 dark:text-white min-h-screen transition-colors duration-300">
      {/* 1. HERO SECTION */}
      <section className="relative bg-neutral-950 text-white overflow-hidden py-16 sm:py-24 border-b border-neutral-800">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src={hero.imageUrl}
            alt={hero.title[currentLang] || hero.title.en}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-800 text-white text-[11px] font-mono font-bold uppercase tracking-widest shadow-md">
              <span className="w-2 h-2 rounded-full bg-white animate-soft-vibrate"></span>
              <span>{hero.tag}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              {hero.title[currentLang] || hero.title.en}
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl font-sans">
              {hero.excerpt[currentLang] || hero.excerpt.en}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to={`/${currentLang}${hero.href}`}
                className="px-6 py-3.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-black text-xs uppercase tracking-wider shadow-xl transition-all flex items-center gap-2 hover:-translate-y-0.5"
              >
                <span>{t('publicPortal.readArticle')}</span>
                <ArrowRight size={16} className="rtl:rotate-180" />
              </Link>

              <Link
                to={`/${currentLang}/initiatives/trade-corridor`}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center gap-2 hover:-translate-y-0.5"
              >
                <span>{t('publicPortal.exploreCorridor')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WORLD SECTION (Grid of 3 International Stories) */}
      <section className="py-16 sm:py-20 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-neutral-200 dark:border-neutral-800 gap-4">
            <div>
              <div className="flex items-center gap-2 text-brand-800 dark:text-brand-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <Globe size={16} />
                <span>{t('nav.world')}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-black text-ink-950 dark:text-white">
                {t('publicPortal.worldHeading')}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {t('publicPortal.worldSubtitle')}
              </p>
            </div>

            <Link
              to={`/${currentLang}/world`}
              className="text-xs font-black text-brand-800 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 uppercase tracking-wider flex items-center gap-1.5 transition-colors self-start md:self-auto"
            >
              <span>{t('publicPortal.viewAllWorld')}</span>
              <ArrowRight size={14} className="rtl:rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {worldStories.map(story => (
              <Card
                key={story.id}
                variant="portal"
                href={`/${currentLang}/newsroom/${story.slug}`}
                imageUrl={story.imageUrl}
                category={story.category[currentLang] || story.category.en}
                title={story.title[currentLang] || story.title.en}
                excerpt={story.excerpt[currentLang] || story.excerpt.en}
                publishDate={story.publishDate}
                readTime={story.readTime}
                badge={story.region}
                ctaText={t('publicPortal.readArticle')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRENDING SECTION (Ranked list of 5 trending items) */}
      <section className="py-16 sm:py-20 bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-brand-800 dark:text-brand-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <TrendingUp size={16} />
            <span>{t('nav.trending')}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-black text-ink-950 dark:text-white mb-2">
            {t('publicPortal.trendingHeading')}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-10">
            {t('publicPortal.trendingSubtitle')}
          </p>

          <div className="space-y-4">
            {trendingItems.map((item, idx) => (
              <Link
                key={item.id}
                to={`/${currentLang}/newsroom/${item.slug}`}
                className="ica-card-interactive group flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-neutral-800/80 border border-neutral-200/90 dark:border-neutral-700/80 hover:border-brand-700 dark:hover:border-brand-500 shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-neutral-700 text-white flex items-center justify-center font-mono font-black text-sm shrink-0 group-hover:bg-brand-800 transition-colors">
                    0{item.rank}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-800 dark:text-brand-400 block mb-1">
                      {item.category[currentLang] || item.category.en}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-ink-950 dark:text-white group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
                      {item.title[currentLang] || item.title.en}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <div className="hidden sm:flex items-center gap-1.5">
                    <Eye size={14} className="text-brand-800 dark:text-brand-400" />
                    <span>{item.views.toLocaleString()}</span>
                  </div>
                  <span className="text-brand-800 dark:text-brand-400 font-black cta-arrow transition-transform">
                    <ArrowRight size={18} className="rtl:rotate-180" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INITIATIVES SECTION (Seven Initiative Cards) */}
      <section className="py-16 sm:py-24 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-brand-800 dark:text-brand-400 font-mono text-xs font-bold uppercase tracking-widest mb-2">
              <Layers size={16} />
              <span>{t('nav.initiatives')}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-ink-950 dark:text-white">
              {t('publicPortal.initiativesHeading')}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2">
              {t('publicPortal.initiativesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map(init => (
              <Link
                key={init.id}
                to={`/${currentLang}/initiatives/${init.slug}`}
                className="ica-card-interactive group flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-neutral-800/80 border border-neutral-200/90 dark:border-neutral-700 hover:border-brand-700 dark:hover:border-brand-500 shadow-xs hover:shadow-xl transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/50 border border-brand-200/60 dark:border-brand-800/40 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    {getInitiativeIcon(init.iconName)}
                  </div>

                  <h3 className="font-serif text-xl font-black text-ink-950 dark:text-white group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors mb-2">
                    {init.title[currentLang] || init.title.en}
                  </h3>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 line-clamp-3">
                    {init.shortDesc[currentLang] || init.shortDesc.en}
                  </p>
                </div>

                <div>
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-neutral-100 dark:border-neutral-700/60 mb-4">
                    {init.kpis.map((kpi, kIdx) => (
                      <div key={kIdx} className="text-center">
                        <div className="text-xs font-mono font-black text-ink-950 dark:text-white">
                          {kpi.metric}
                        </div>
                        <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                          {kpi.label[currentLang] || kpi.label.en}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-black text-ink-950 dark:text-white uppercase tracking-wider">
                    <span>{t('publicPortal.readArticle')}</span>
                    <span className="text-brand-800 dark:text-brand-400 cta-arrow transition-transform">
                      <ArrowRight size={14} className="rtl:rotate-180" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED SECTION (Editor's Picks Grid) */}
      <section className="py-16 sm:py-20 bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-brand-800 dark:text-brand-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={16} />
            <span>{t('nav.featured')}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-black text-ink-950 dark:text-white mb-2">
            {t('publicPortal.featuredHeading')}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-10">
            {t('publicPortal.featuredSubtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featured.map(item => (
              <Card
                key={item.id}
                variant="portal"
                href={`/${currentLang}/newsroom/${item.slug}`}
                imageUrl={item.imageUrl}
                category={item.category[currentLang] || item.category.en}
                title={item.title[currentLang] || item.title.en}
                excerpt={item.excerpt[currentLang] || item.excerpt.en}
                publishDate={item.publishDate}
                author={{
                  name: item.author[currentLang] || item.author.en
                }}
                ctaText={t('publicPortal.readArticle')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. MEDIA PREVIEW (Live Stream & Enriched Media Hub) */}
      <section className="py-16 sm:py-24 bg-neutral-950 text-white border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-brand-400 font-mono text-xs font-bold uppercase tracking-widest mb-2">
                <Radio size={16} className="animate-soft-vibrate" />
                <span>{t('publicPortal.mediaHeading')}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-black text-white">
                {t('livePortal.title')}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
                {t('publicPortal.mediaSubtitle')}
              </p>
            </div>

            <Link
              to={`/${currentLang}/live`}
              className="px-6 py-3 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 self-start md:self-auto hover:-translate-y-0.5"
            >
              <span>{t('publicPortal.exploreMediaHub')}</span>
              <ArrowRight size={14} className="rtl:rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mediaItems.map(item => (
              <Link
                key={item.id}
                to={`/${currentLang}/live/${item.slug}`}
                className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-brand-700 transition-all flex flex-col"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                  <img
                    src={item.posterUrl}
                    alt={item.title[currentLang] || item.title.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-brand-800 text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                      <Play size={20} className="translate-x-0.5 fill-current" />
                    </div>
                  </div>
                  <div className="absolute top-3 inset-inline-start-3 bg-brand-800 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                    {item.category.toUpperCase()}
                  </div>
                  <div className="absolute bottom-3 inset-inline-end-3 bg-black/80 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                    {item.duration}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-brand-400 transition-colors line-clamp-1 mb-1">
                      {item.title[currentLang] || item.title.en}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2">
                      {item.description[currentLang] || item.description.en}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                    <span>{item.director}</span>
                    <span className="font-mono text-brand-400 font-bold">{item.year}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER SECTION */}
      <section className="py-16 sm:py-20 bg-white dark:bg-neutral-900 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/40 text-brand-800 dark:text-brand-400 mx-auto flex items-center justify-center mb-6 border border-brand-200/50 dark:border-brand-800/40">
            <Mail size={24} />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-black text-ink-950 dark:text-white mb-3">
            {t('publicPortal.newsletterHeading')}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-8">
            {t('publicPortal.newsletterSubtitle')}
          </p>

          {subscribedSuccess ? (
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 font-bold text-xs inline-flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
              <span>{t('publicPortal.subscribeSuccess')}</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                placeholder={t('publicPortal.emailPlaceholder')}
                className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:border-brand-800 text-xs text-ink-950 dark:text-white"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                {t('publicPortal.subscribeButton')}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default IcaPublicHome;
