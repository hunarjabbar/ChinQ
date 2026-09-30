import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Video, Radio, ArrowRight, Play, Film, Tv, Clapperboard, Users } from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function IcaMediaPage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const mediaItems = portalStore.getMediaItems();
  const liveStream = portalStore.getLiveStream();

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E5E7EB] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-2">
              <Video size={14} />
              <span>{t('nav.media')}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#000000]">
              {t('publicPortal.mediaHeading')}
            </h1>
            <p className="text-sm text-[#4B5563] mt-2 max-w-2xl">
              {t('publicPortal.mediaSubtitle')}
            </p>
          </div>

          <Link
            to={`/${currentLang}/live`}
            className="px-6 py-3 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#A00D26] text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <span>{t('publicPortal.exploreMediaHub')}</span>
            <ArrowRight size={14} className="rtl:rotate-180" />
          </Link>
        </div>

        {/* Live Broadcast Banner Preview */}
        <div className="mb-14 p-8 rounded-3xl bg-[#000000] text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-neutral-800">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-800)] text-white text-[10px] font-mono font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-white animate-soft-vibrate"></span>
              <span>{t('livePortal.nowStreaming')}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-white">
              {liveStream.title[currentLang] || liveStream.title.en}
            </h2>
            <p className="text-xs text-neutral-400">
              {liveStream.description[currentLang] || liveStream.description.en}
            </p>
          </div>

          <Link
            to={`/${currentLang}/live/now`}
            className="px-6 py-3.5 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#A00D26] text-white font-black text-xs uppercase tracking-wider shadow-xl transition-all flex items-center gap-2 shrink-0"
          >
            <Radio size={16} className="animate-soft-vibrate" />
            <span>{t('publicPortal.watchLiveNow')}</span>
          </Link>
        </div>

        {/* Media Categories Jump Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <Link
            to={`/${currentLang}/live/movies`}
            className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[var(--color-brand-800)] transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[var(--color-brand-800)] flex items-center justify-center shrink-0">
              <Film size={20} />
            </div>
            <div>
              <div className="font-bold text-sm text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors">
                {t('livePortal.movies')}
              </div>
              <div className="text-[10px] text-[#4B5563]">Feature Films</div>
            </div>
          </Link>

          <Link
            to={`/${currentLang}/live/drama`}
            className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[var(--color-brand-800)] transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[var(--color-brand-800)] flex items-center justify-center shrink-0">
              <Tv size={20} />
            </div>
            <div>
              <div className="font-bold text-sm text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors">
                {t('livePortal.drama')}
              </div>
              <div className="text-[10px] text-[#4B5563]">Series & Sagas</div>
            </div>
          </Link>

          <Link
            to={`/${currentLang}/live/documentary`}
            className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[var(--color-brand-800)] transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[var(--color-brand-800)] flex items-center justify-center shrink-0">
              <Clapperboard size={20} />
            </div>
            <div>
              <div className="font-bold text-sm text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors">
                {t('livePortal.documentary')}
              </div>
              <div className="text-[10px] text-[#4B5563]">Corridor Feats</div>
            </div>
          </Link>

          <Link
            to={`/${currentLang}/live/exchange`}
            className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[var(--color-brand-800)] transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[var(--color-brand-800)] flex items-center justify-center shrink-0">
              <Users size={20} />
            </div>
            <div>
              <div className="font-bold text-sm text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors">
                {t('livePortal.exchange')}
              </div>
              <div className="text-[10px] text-[#4B5563]">Youth & Culture</div>
            </div>
          </Link>
        </div>

        {/* Full Media Library Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaItems.map(item => (
            <Link
              key={item.id}
              to={`/${currentLang}/live/${item.slug}`}
              className="ica-card-interactive group flex flex-col justify-between rounded-2xl bg-white border border-[#E5E7EB] hover:border-[var(--color-brand-800)] overflow-hidden"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
                <img
                  src={item.posterUrl}
                  alt={item.title[currentLang] || item.title.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 inset-inline-start-3 bg-[var(--color-brand-800)] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                  {item.category.toUpperCase()}
                </div>
                <div className="absolute bottom-3 inset-inline-end-3 bg-black/80 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  {item.duration}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors line-clamp-1 mb-2">
                    {item.title[currentLang] || item.title.en}
                  </h3>
                  <p className="text-xs text-[#4B5563] line-clamp-2">
                    {item.description[currentLang] || item.description.en}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#4B5563]">
                  <span>{item.director}</span>
                  <span className="text-[var(--color-brand-800)] font-black cta-arrow transition-transform flex items-center gap-1">
                    <span>Watch</span>
                    <ArrowRight size={14} className="rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IcaMediaPage;
