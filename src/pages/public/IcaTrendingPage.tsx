import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { TrendingUp, ArrowRight, Eye, Share2, Flame } from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function IcaTrendingPage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const items = portalStore.getTrendingItems();

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 pb-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-2">
            <TrendingUp size={14} />
            <span>{t('nav.trending')}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#000000]">
            {t('publicPortal.trendingHeading')}
          </h1>
          <p className="text-sm text-[#4B5563] mt-2 max-w-2xl">
            {t('publicPortal.trendingSubtitle')}
          </p>
        </div>

        <div className="space-y-4 max-w-4xl">
          {items.map(item => (
            <Link
              key={item.id}
              to={`/${currentLang}/newsroom/${item.slug}`}
              className="ica-card-interactive group flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[var(--color-brand-800)] gap-4"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#000000] text-white flex items-center justify-center font-mono font-black text-lg shrink-0 group-hover:bg-[var(--color-brand-800)] transition-colors">
                  #{item.rank}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-800)] bg-[#FEE2E2] px-2 py-0.5 rounded">
                      {item.category[currentLang] || item.category.en}
                    </span>
                    {item.trendDirection === 'hot' && (
                      <span className="text-[10px] font-bold text-red-600 flex items-center gap-1">
                        <Flame size={12} className="animate-bounce" />
                        <span>HOT</span>
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors">
                    {item.title[currentLang] || item.title.en}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-6 self-end sm:self-center text-xs font-mono text-[#4B5563]">
                <div className="flex items-center gap-1.5">
                  <Eye size={14} className="text-[var(--color-brand-800)]" />
                  <span>{item.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Share2 size={14} className="text-[#4B5563]" />
                  <span>{item.shares}</span>
                </div>
                <span className="text-[var(--color-brand-800)] font-black cta-arrow transition-transform">
                  <ArrowRight size={18} className="rtl:rotate-180" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IcaTrendingPage;
