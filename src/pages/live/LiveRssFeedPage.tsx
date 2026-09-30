import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Rss } from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { PortalLocale } from '../../types/portals';

export function LiveRssFeedPage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;

  const [copied, setCopied] = useState(false);
  const media = portalStore.getMediaItems().filter(m => m.status === 'published');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Iraqi-Chinese Agency (ICA) - Live & Media Hub Feed</title>
  <link>https://iraq-china.agency/${currentLang}/live</link>
  <description>Bilateral streaming, documentary features, drama series, and cultural exchange productions.</description>
  <language>${currentLang}</language>
  <pubDate>${new Date().toUTCString()}</pubDate>
  ${media
    .map(
      m => `
  <item>
    <title><![CDATA[${m.title[currentLang] || m.title.en}]]></title>
    <link>https://iraq-china.agency/${currentLang}/live/${m.slug}</link>
    <description><![CDATA[${m.description[currentLang] || m.description.en}]]></description>
    <category>${m.category}</category>
    <pubDate>${new Date(m.publishDate).toUTCString()}</pubDate>
    <guid isPermaLink="true">https://iraq-china.agency/${currentLang}/live/${m.slug}</guid>
    <author>${m.director}</author>
  </item>`
    )
    .join('')}
</channel>
</rss>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rssXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/${currentLang}/live`}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-6 hover:underline"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>Back to Media Hub</span>
        </Link>

        <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#E5E7EB]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-1">
              <Rss size={14} />
              <span>Media Podcast & Video RSS Feed</span>
            </div>
            <h1 className="font-serif text-3xl font-black text-[#000000]">
              Media Hub Syndication Feed
            </h1>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-white border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-xs font-bold text-[#000000] flex items-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy RSS XML'}</span>
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-[#000000] text-neutral-200 border border-neutral-800 font-mono text-xs overflow-x-auto shadow-xl">
          <pre>{rssXml}</pre>
        </div>
      </div>
    </div>
  );
}

export default LiveRssFeedPage;
