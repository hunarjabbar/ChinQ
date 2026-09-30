import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Globe, FileText, Layers, Video } from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { PortalLocale } from '../../types/portals';

export function NewsroomSitemapPage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;

  const articles = portalStore.getNewsArticles().filter(a => a.status === 'published');
  const initiatives = portalStore.getInitiatives();
  const media = portalStore.getMediaItems().filter(m => m.status === 'published');

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/${currentLang}/newsroom`}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-6 hover:underline"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>Back to Newsroom</span>
        </Link>

        <div className="mb-10 pb-6 border-b border-[#E5E7EB]">
          <span className="text-xs font-mono font-bold text-[var(--color-brand-800)] uppercase tracking-wider block mb-1">
            Site Architecture
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#000000]">
            Newsroom & Ecosystem Sitemap
          </h1>
          <p className="text-sm text-[#4B5563] mt-2">
            Structured index of all authenticated canonical URLs across the 4 portals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section 1: Dispatches */}
          <div className="p-6 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-[#000000] border-b border-[#E5E7EB] pb-2">
              <FileText size={16} className="text-[var(--color-brand-800)]" />
              <span>Newsroom Dispatches ({articles.length})</span>
            </div>
            <ul className="space-y-2 text-xs">
              {articles.map(a => (
                <li key={a.id}>
                  <Link
                    to={`/${currentLang}/newsroom/${a.slug}`}
                    className="text-[#4B5563] hover:text-[var(--color-brand-800)] transition-colors block line-clamp-1"
                  >
                    /{currentLang}/newsroom/{a.slug}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: Initiatives */}
          <div className="p-6 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-[#000000] border-b border-[#E5E7EB] pb-2">
              <Layers size={16} className="text-[var(--color-brand-800)]" />
              <span>Initiatives ({initiatives.length})</span>
            </div>
            <ul className="space-y-2 text-xs">
              {initiatives.map(i => (
                <li key={i.id}>
                  <Link
                    to={`/${currentLang}/initiatives/${i.slug}`}
                    className="text-[#4B5563] hover:text-[var(--color-brand-800)] transition-colors block line-clamp-1"
                  >
                    /{currentLang}/initiatives/{i.slug}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Media Hub */}
          <div className="p-6 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-[#000000] border-b border-[#E5E7EB] pb-2">
              <Video size={16} className="text-[var(--color-brand-800)]" />
              <span>Media Hub ({media.length})</span>
            </div>
            <ul className="space-y-2 text-xs">
              {media.map(m => (
                <li key={m.id}>
                  <Link
                    to={`/${currentLang}/live/${m.slug}`}
                    className="text-[#4B5563] hover:text-[var(--color-brand-800)] transition-colors block line-clamp-1"
                  >
                    /{currentLang}/live/{m.slug}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsroomSitemapPage;
