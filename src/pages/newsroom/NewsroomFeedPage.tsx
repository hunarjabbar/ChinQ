import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Rss, Download } from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { PortalLocale } from '../../types/portals';

export function NewsroomFeedPage() {
  const { lang = 'en', feedType = 'rss' } = useParams<{ lang: string; feedType: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;

  const [copied, setCopied] = useState(false);
  const articles = portalStore.getNewsArticles().filter(a => a.status === 'published');

  const generateFeedContent = () => {
    if (feedType === 'json') {
      return JSON.stringify(
        {
          version: 'https://jsonfeed.org/version/1.1',
          title: 'Iraqi-Chinese Agency (ICA) Official Newsroom Feed',
          home_page_url: `https://iraq-china.agency/${currentLang}/newsroom`,
          feed_url: `https://iraq-china.agency/${currentLang}/newsroom/feed/json`,
          items: articles.map(a => ({
            id: a.id,
            url: `https://iraq-china.agency/${currentLang}/newsroom/${a.slug}`,
            title: a.title[currentLang] || a.title.en,
            content_text: a.excerpt[currentLang] || a.excerpt.en,
            date_published: new Date(a.publishDate).toISOString(),
            author: { name: a.author.name }
          }))
        },
        null,
        2
      );
    }

    if (feedType === 'atom') {
      return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Iraqi-Chinese Agency (ICA) Atom Feed</title>
  <link href="https://iraq-china.agency/${currentLang}/newsroom"/>
  <updated>${new Date().toISOString()}</updated>
  <id>https://iraq-china.agency/${currentLang}/newsroom</id>
  ${articles
    .map(
      a => `
  <entry>
    <title>${a.title[currentLang] || a.title.en}</title>
    <link href="https://iraq-china.agency/${currentLang}/newsroom/${a.slug}"/>
    <id>urn:uuid:${a.id}</id>
    <updated>${new Date(a.publishDate).toISOString()}</updated>
    <summary>${a.excerpt[currentLang] || a.excerpt.en}</summary>
    <author><name>${a.author.name}</name></author>
  </entry>`
    )
    .join('')}
</feed>`;
    }

    // Default RSS 2.0
    return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Iraqi-Chinese Agency (ICA) - Sovereign Newsroom</title>
  <link>https://iraq-china.agency/${currentLang}/newsroom</link>
  <description>Official dispatches, bilateral economic accords, and diplomatic telemetries.</description>
  <language>${currentLang}</language>
  <pubDate>${new Date().toUTCString()}</pubDate>
  ${articles
    .map(
      a => `
  <item>
    <title><![CDATA[${a.title[currentLang] || a.title.en}]]></title>
    <link>https://iraq-china.agency/${currentLang}/newsroom/${a.slug}</link>
    <description><![CDATA[${a.excerpt[currentLang] || a.excerpt.en}]]></description>
    <pubDate>${new Date(a.publishDate).toUTCString()}</pubDate>
    <guid isPermaLink="true">https://iraq-china.agency/${currentLang}/newsroom/${a.slug}</guid>
    <author>${a.author.name}</author>
  </item>`
    )
    .join('')}
</channel>
</rss>`;
  };

  const feedContent = generateFeedContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(feedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/${currentLang}/newsroom`}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-6 hover:underline"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>Back to Newsroom</span>
        </Link>

        <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#E5E7EB]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-1">
              <Rss size={14} />
              <span>Syndication Feed ({feedType.toUpperCase()})</span>
            </div>
            <h1 className="font-serif text-3xl font-black text-[#000000]">
              Official Newsroom Feed
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-white border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-xs font-bold text-[#000000] flex items-center gap-2 transition-colors cursor-pointer"
            >
              {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy Feed XML'}</span>
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#000000] text-neutral-200 border border-neutral-800 font-mono text-xs overflow-x-auto shadow-xl">
          <pre>{feedContent}</pre>
        </div>
      </div>
    </div>
  );
}

export default NewsroomFeedPage;
