import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Share2,
  Bookmark,
  ArrowLeft,
  ArrowRight,
  Check,
  Tag,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function NewsroomArticleDetailPage() {
  const { lang = 'en', slug } = useParams<{ lang: string; slug: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const articles = portalStore.getNewsArticles();
  const article = articles.find(a => a.slug === slug) || articles[0];
  const relatedArticles = articles.filter(a => a.id !== article.id).slice(0, 2);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      {/* Reading Progress Top Bar */}
      <div
        className="fixed top-0 inset-inline-0 h-1 bg-[var(--color-brand-800)] z-50 transition-all duration-75"
        style={{ width: `${Math.min(Math.max(scrollProgress * 100, 0), 100)}%` }}
      ></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Link */}
        <Link
          to={`/${currentLang}/newsroom`}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-6 hover:underline"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>Back to Newsroom</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#FEE2E2] text-[#991B1B] text-[10px] font-mono font-black uppercase tracking-wider">
              {article.tags[0] || 'SOVEREIGN DISPATCH'}
            </span>
            {article.isBreaking && (
              <span className="px-2.5 py-0.5 rounded bg-[var(--color-brand-800)] text-white text-[10px] font-mono font-bold uppercase tracking-wider animate-soft-vibrate">
                BREAKING
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#000000] leading-tight">
            {article.title[currentLang] || article.title.en}
          </h1>

          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed font-sans">
            {article.excerpt[currentLang] || article.excerpt.en}
          </p>

          <div className="pt-4 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-xs">
                <div className="font-bold text-[#000000]">{article.author.name}</div>
                <div className="text-[11px] text-[#4B5563]">
                  {article.author.bureau[currentLang] || article.author.bureau.en} • {article.author.title[currentLang] || article.author.title.en}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#4B5563] font-mono">
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-[var(--color-brand-800)]" />
                <span>{article.publishDate}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={13} className="text-[var(--color-brand-800)]" />
                <span>{article.readingTimeMinutes} min read</span>
              </span>

              <button
                onClick={handleShare}
                className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-[#000000] flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Share link"
              >
                {copied ? <Check size={13} className="text-green-600" /> : <Share2 size={13} />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Lead Hero Image */}
        <div className="rounded-3xl overflow-hidden aspect-[16/9] mb-12 bg-neutral-100 shadow-md">
          <img
            src={article.imageUrl}
            alt={article.title[currentLang] || article.title.en}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Layout: Sticky TOC + Article Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Body */}
          <main className="lg:col-span-8 prose prose-neutral max-w-none text-[#000000]">
            <div
              className="space-y-6 text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: article.content[currentLang] || article.content.en
              }}
            />

            {/* Tags Strip */}
            <div className="mt-12 pt-6 border-t border-[#E5E7EB] flex flex-wrap items-center gap-2">
              <Tag size={14} className="text-[var(--color-brand-800)]" />
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-mono text-[#000000]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Credential Bio Box */}
            <div className="mt-8 p-6 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-start gap-4">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-14 h-14 rounded-2xl object-cover shrink-0"
              />
              <div className="space-y-1 text-xs">
                <div className="font-bold text-[#000000] text-sm">{article.author.name}</div>
                <div className="text-[var(--color-brand-800)] font-medium font-mono text-[11px]">{article.author.credentials}</div>
                <p className="text-[#4B5563] leading-relaxed pt-1">
                  {article.author.bio[currentLang] || article.author.bio.en}
                </p>
              </div>
            </div>
          </main>

          {/* Sticky Sidebar: Table of Contents & Related */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-24 p-6 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-4 text-xs">
              <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider text-[#000000] border-b border-[#E5E7EB] pb-3">
                <BookOpen size={16} className="text-[var(--color-brand-800)]" />
                <span>{t('newsroom.tableOfContents')}</span>
              </div>
              <ul className="space-y-2.5 text-[#4B5563]">
                <li>
                  <a href="#summary" className="hover:text-[var(--color-brand-800)] transition-colors block">
                    1. Executive Summary & Overview
                  </a>
                </li>
                <li>
                  <a href="#corridors" className="hover:text-[var(--color-brand-800)] transition-colors block">
                    2. Infrastructure & Freight Protocols
                  </a>
                </li>
                <li>
                  <a href="#clearance" className="hover:text-[var(--color-brand-800)] transition-colors block">
                    3. Direct Sovereign Financial Clearance
                  </a>
                </li>
              </ul>

              <div className="pt-4 border-t border-[#E5E7EB]">
                <div className="text-[11px] font-bold text-[#000000] uppercase tracking-wider mb-3">
                  {t('newsroom.relatedArticles')}
                </div>
                <div className="space-y-3">
                  {relatedArticles.map(rel => (
                    <Link
                      key={rel.id}
                      to={`/${currentLang}/newsroom/${rel.slug}`}
                      className="block group"
                    >
                      <h4 className="font-serif font-bold text-xs text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors line-clamp-2">
                        {rel.title[currentLang] || rel.title.en}
                      </h4>
                      <span className="text-[10px] text-[#4B5563] font-mono mt-0.5 block">
                        {rel.publishDate}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default NewsroomArticleDetailPage;
