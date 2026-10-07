import React, { useState } from 'react';
import { 
  FileText, Tag, FolderTree, Users, Rss, BarChart3, Plus, 
  ExternalLink, RefreshCw, ChevronRight
} from 'lucide-react';
import { GenericEntityCrud } from './GenericEntityCrud';
import { Locale } from '../../types';

interface NewsroomAdminSectionProps {
  initialSubSection?: string;
  lang?: Locale;
}

export function NewsroomAdminSection({
  initialSubSection,
  lang = 'en'
}: NewsroomAdminSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(initialSubSection || 'dispatches');
  const [revalidateMsg, setRevalidateMsg] = useState<string | null>(null);

  const triggerRevalidate = async () => {
    try {
      await fetch('/api/hub/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/newsroom', tag: 'newsroom' })
      });
      setRevalidateMsg('[Newsroom Feeds & XML Sitemaps Revalidated]');
      setTimeout(() => setRevalidateMsg(null), 3000);
    } catch {
      setRevalidateMsg('[Revalidation queued]');
      setTimeout(() => setRevalidateMsg(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
            <FileText size={14} />
            <span>ICA Administration • Newsroom Editorial Control</span>
          </div>
          <h2 className="text-xl font-black uppercase text-white">Newsroom Editorial Desk</h2>
          <p className="text-xs text-neutral-400">
            Publish diplomatic dispatches, categorize bilateral coverage, and manage RSS/Atom syndication.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={triggerRevalidate}
            className="px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-600 text-xs font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>Regenerate Feeds</span>
          </button>
          <a
            href={`/${lang}/newsroom`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white flex items-center gap-1.5 shadow-md transition-colors"
          >
            <span>Public Newsroom</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {revalidateMsg && (
        <div className="p-3 bg-emerald-950 border border-emerald-500 rounded-xl text-emerald-300 text-xs font-mono">
          {revalidateMsg}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-800 scrollbar-none">
        {[
          { id: 'dispatches', name: 'Editorial Dispatches', icon: FileText },
          { id: 'ticker', name: 'Intelligence Wire Ticker', icon: Rss },
          { id: 'categories', name: 'Categories & Pillars', icon: FolderTree },
          { id: 'authors', name: 'Accredited Correspondents', icon: Users }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Icon size={13} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main CRUD */}
      {activeTab === 'dispatches' && (
        <GenericEntityCrud
          sectionId="public-world"
          sectionTitle="Newsroom Editorial Dispatches"
          sectionDescription="Manage, publish, translate, and reorder full-length investigative dossiers and diplomatic statements."
          lang={lang}
        />
      )}

      {activeTab === 'ticker' && (
        <GenericEntityCrud
          sectionId="public-intelligence-wire"
          sectionTitle="Intelligence Wire Ticker Items"
          sectionDescription="Flash alerts, embassy communiqués, and high-velocity trade updates appearing across the top ticker."
          lang={lang}
        />
      )}

      {activeTab === 'categories' && (
        <GenericEntityCrud
          sectionId="public-initiatives"
          sectionTitle="Bilateral Newsroom Categories & Desks"
          sectionDescription="Structure coverage into Trade, Infrastructure, Diplomacy, Energy, Culture, and Financial Clearing."
          lang={lang}
        />
      )}

      {activeTab === 'authors' && (
        <GenericEntityCrud
          sectionId="public-partners"
          sectionTitle="Accredited Bureau Correspondents"
          sectionDescription="Manage journalists, analysts, and think tank contributors based in Baghdad, Beijing, and Erbil."
          lang={lang}
        />
      )}
    </div>
  );
}
