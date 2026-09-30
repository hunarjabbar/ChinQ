import React from 'react';
import { useParams } from 'react-router-dom';
import { Sparkles, Calendar, Clock } from 'lucide-react';
import { Card } from '../../components/Card';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function IcaFeaturedPage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const featured = portalStore.getFeaturedItems();

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 pb-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-2">
            <Sparkles size={14} />
            <span>{t('nav.featured')}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#000000]">
            {t('publicPortal.featuredHeading')}
          </h1>
          <p className="text-sm text-[#4B5563] mt-2 max-w-2xl">
            {t('publicPortal.featuredSubtitle')}
          </p>
        </div>

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
    </div>
  );
}

export default IcaFeaturedPage;
