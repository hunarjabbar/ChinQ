import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Calendar, Clock, Star, Share2 } from 'lucide-react';
import { VideoPlayer } from '../../components/VideoPlayer';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function LiveDetailVideoPage() {
  const { lang = 'en', slug } = useParams<{ lang: string; slug: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const mediaItems = portalStore.getMediaItems();
  const item = mediaItems.find(m => m.slug === slug) || mediaItems[0];
  const relatedMedia = mediaItems.filter(m => m.id !== item.id).slice(0, 3);

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/${currentLang}/live`}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-6 hover:underline"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>Back to Media Library</span>
        </Link>

        {/* Video Player Display */}
        <div className="mb-8">
          <VideoPlayer
            src={item.videoUrl}
            poster={item.posterUrl}
            title={item.title[currentLang] || item.title.en}
            subtitles={item.subtitles}
          />
        </div>

        {/* Video Metadata Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded bg-[var(--color-brand-800)] text-white text-[10px] font-mono font-black uppercase tracking-widest">
                {item.category.toUpperCase()}
              </span>
              <span className="flex items-center gap-1 text-xs font-mono font-bold text-amber-600">
                <Star size={13} className="fill-current" />
                <span>{item.rating} / 5.0</span>
              </span>
              <span className="text-neutral-300">•</span>
              <span className="text-xs font-mono text-[#4B5563]">{item.duration}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-black text-[#000000]">
              {item.title[currentLang] || item.title.en}
            </h1>

            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              {item.description[currentLang] || item.description.en}
            </p>

            <div className="pt-4 flex flex-wrap gap-2">
              {item.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-mono text-[#000000]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Specs Card */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-3 text-xs">
            <h4 className="font-black text-sm uppercase tracking-wider text-[#000000] border-b border-[#E5E7EB] pb-3">
              Production Information
            </h4>
            <div className="flex justify-between py-1 border-b border-[#E5E7EB]">
              <span className="text-[#4B5563]">{t('livePortal.director')}</span>
              <span className="font-bold text-[#000000]">{item.director}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#E5E7EB]">
              <span className="text-[#4B5563]">{t('livePortal.year')}</span>
              <span className="font-mono font-bold text-[#000000]">{item.year}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#E5E7EB]">
              <span className="text-[#4B5563]">{t('livePortal.originLanguage')}</span>
              <span className="font-medium text-[#000000]">{item.originLanguage}</span>
            </div>
            <div className="py-1">
              <span className="text-[#4B5563] block mb-1">{t('livePortal.subtitles')}</span>
              <div className="flex flex-wrap gap-1">
                {item.subtitles.map(sub => (
                  <span key={sub} className="px-2 py-0.5 rounded bg-white border border-[#E5E7EB] text-[10px] font-mono">
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Titles */}
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-black text-[#000000] mb-6 pb-3 border-b border-[#E5E7EB]">
            Recommended Bilateral Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedMedia.map(rel => (
              <Link
                key={rel.id}
                to={`/${currentLang}/live/${rel.slug}`}
                className="ica-card-interactive group flex flex-col justify-between rounded-2xl bg-white border border-[#E5E7EB] hover:border-[var(--color-brand-800)] overflow-hidden"
              >
                <div className="aspect-video w-full overflow-hidden bg-neutral-900 relative">
                  <img
                    src={rel.posterUrl}
                    alt={rel.title[currentLang] || rel.title.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 inset-inline-start-2 bg-[var(--color-brand-800)] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">
                    {rel.category.toUpperCase()}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-serif font-bold text-sm text-[#000000] group-hover:text-[var(--color-brand-800)] line-clamp-1 mb-1">
                    {rel.title[currentLang] || rel.title.en}
                  </h4>
                  <div className="text-[11px] text-[#4B5563] font-mono">{rel.duration}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveDetailVideoPage;
