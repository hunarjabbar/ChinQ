import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, ArrowRight } from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function NewsroomArchivePage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const articles = portalStore.getNewsArticles().filter(a => a.status === 'published');

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
            Historical Records
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#000000]">
            Chronological Archive
          </h1>
          <p className="text-sm text-[#4B5563] mt-2">
            Complete indexed record of accredited dispatches and ministerial declarations.
          </p>
        </div>

        <div className="space-y-4">
          {articles.map(article => (
            <Link
              key={article.id}
              to={`/${currentLang}/newsroom/${article.slug}`}
              className="ica-card-interactive group flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[var(--color-brand-800)] gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#4B5563] font-mono">
                  <span className="text-[var(--color-brand-800)] font-bold">{article.publishDate}</span>
                  <span>•</span>
                  <span>{article.author.name}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors">
                  {article.title[currentLang] || article.title.en}
                </h3>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                <span className="px-2.5 py-1 rounded bg-[#F9FAFB] border border-[#E5E7EB] text-[11px] font-mono text-[#000000]">
                  {article.tags[0] || 'Dispatch'}
                </span>
                <span className="text-[var(--color-brand-800)] cta-arrow transition-transform">
                  <ArrowRight size={16} className="rtl:rotate-180" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsroomArchivePage;
