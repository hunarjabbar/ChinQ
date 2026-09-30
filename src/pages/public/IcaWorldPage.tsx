import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Globe, ArrowRight, Eye, Calendar, Clock } from 'lucide-react';
import { Card } from '../../components/Card';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function IcaWorldPage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const stories = portalStore.getWorldStories();

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Header */}
        <div className="mb-10 pb-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-2">
            <Globe size={14} />
            <span>{t('nav.world')}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#000000]">
            {t('publicPortal.worldHeading')}
          </h1>
          <p className="text-sm text-[#4B5563] mt-2 max-w-2xl">
            {t('publicPortal.worldSubtitle')}
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map(story => (
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
    </div>
  );
}

export default IcaWorldPage;
