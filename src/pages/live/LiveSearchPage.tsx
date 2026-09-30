import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, ArrowLeft, X, Play, ArrowRight } from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function LiveSearchPage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const [query, setQuery] = useState('');
  const allMedia = portalStore.getMediaItems().filter(m => m.status === 'published');

  const results = query.trim()
    ? allMedia.filter(m => {
        const q = query.toLowerCase();
        const title = (m.title[currentLang] || m.title.en).toLowerCase();
        const desc = (m.description[currentLang] || m.description.en).toLowerCase();
        const dir = m.director.toLowerCase();
        const tags = m.tags.map(t => t.toLowerCase()).join(' ');
        return title.includes(q) || desc.includes(q) || dir.includes(q) || tags.includes(q);
      })
    : [];

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/${currentLang}/live`}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-6 hover:underline"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>Back to Media Hub</span>
        </Link>

        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#000000] mb-3">
            Search Media Hub
          </h1>
          <p className="text-sm text-[#4B5563]">
            Search across feature films, drama series, documentary reels, and exchange shorts.
          </p>
        </div>

        <div className="relative mb-10">
          <div className="absolute inset-y-0 inset-inline-start-4 flex items-center pointer-events-none text-neutral-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by title, director, category, or keywords..."
            className="w-full ps-12 pe-10 py-4 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] text-sm text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none shadow-xs"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute inset-y-0 inset-inline-end-4 flex items-center text-neutral-400 hover:text-[#000000]"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {query.trim() && (
          <div>
            <div className="text-xs font-mono font-bold text-[#4B5563] uppercase tracking-wider mb-6 pb-2 border-b border-[#E5E7EB]">
              Search Results ({results.length})
            </div>

            {results.length === 0 ? (
              <div className="p-12 text-center text-neutral-500 text-sm bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB]">
                No media items matched "{query}".
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map(item => (
                  <Link
                    key={item.id}
                    to={`/${currentLang}/live/${item.slug}`}
                    className="ica-card-interactive group flex flex-col justify-between rounded-2xl bg-white border border-[#E5E7EB] hover:border-[var(--color-brand-800)] overflow-hidden"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                      <img
                        src={item.posterUrl}
                        alt={item.title[currentLang] || item.title.en}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 inset-inline-start-2 bg-[var(--color-brand-800)] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">
                        {item.category.toUpperCase()}
                      </div>
                      <div className="absolute bottom-2 inset-inline-end-2 bg-black/80 text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                        {item.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif font-bold text-sm text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors line-clamp-1 mb-1">
                        {item.title[currentLang] || item.title.en}
                      </h4>
                      <p className="text-xs text-[#4B5563] line-clamp-2">
                        {item.description[currentLang] || item.description.en}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveSearchPage;
