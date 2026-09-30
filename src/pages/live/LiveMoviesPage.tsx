import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Film, ArrowLeft, Play, ArrowRight, Star } from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function LiveMoviesPage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const movies = portalStore.getMediaItems('movies');

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/${currentLang}/live`}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-6 hover:underline"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>Back to Media Hub</span>
        </Link>

        <div className="mb-10 pb-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-1">
            <Film size={16} />
            <span>{t('livePortal.movies')}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#000000]">
            Bilateral Feature Films & Cinematic Masterpieces
          </h1>
          <p className="text-sm text-[#4B5563] mt-2 max-w-2xl">
            Acclaimed feature films dramatizing Iraqi-Chinese historical ties, Silk Road maritime commerce, and contemporary diplomatic partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies.map(movie => (
            <Link
              key={movie.id}
              to={`/${currentLang}/live/${movie.slug}`}
              className="ica-card-interactive group flex flex-col justify-between rounded-2xl bg-white border border-[#E5E7EB] hover:border-[var(--color-brand-800)] overflow-hidden"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                <img
                  src={movie.posterUrl}
                  alt={movie.title[currentLang] || movie.title.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-brand-800)] text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                    <Play size={20} className="translate-x-0.5 fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-3 inset-inline-end-3 bg-black/80 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  {movie.duration}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#4B5563]">{movie.year} • {movie.originLanguage}</span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600">
                      <Star size={11} className="fill-current" />
                      <span>{movie.rating}</span>
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors line-clamp-1 mb-2">
                    {movie.title[currentLang] || movie.title.en}
                  </h3>
                  <p className="text-xs text-[#4B5563] line-clamp-3">
                    {movie.description[currentLang] || movie.description.en}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#4B5563]">
                  <span>{movie.director}</span>
                  <span className="text-[var(--color-brand-800)] font-black cta-arrow transition-transform flex items-center gap-1">
                    <span>{t('livePortal.playMovie')}</span>
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

export default LiveMoviesPage;
