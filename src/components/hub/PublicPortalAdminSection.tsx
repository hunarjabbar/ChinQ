import React, { useState } from 'react';
import { 
  Globe, Layout, Sparkles, Layers, Sliders, Eye, EyeOff, RefreshCw, 
  ChevronRight, Radio, FileText, BarChart3, Users, Film, Calendar, 
  Building2, Mail, Smartphone, ExternalLink
} from 'lucide-react';
import { GenericEntityCrud } from './GenericEntityCrud';
import { useSectionControlStore } from '../../store/useSectionControlStore';
import { Locale } from '../../types';

interface PublicPortalAdminSectionProps {
  initialSubSection?: string;
  lang?: Locale;
}

const PUBLIC_SECTIONS_META = [
  { id: 'public-hero', slug: 'hero', name: 'Hero Section', icon: Layout, desc: 'Primary diplomatic title, hero imagery & dual CTAs' },
  { id: 'public-live-broadcast', slug: 'live-broadcast', name: 'Live Broadcast Band', icon: Radio, desc: 'ON-AIR live beacon and stream fast-link' },
  { id: 'public-intelligence-wire', slug: 'intelligence-wire', name: 'Intelligence Wire Ticker', icon: FileText, desc: 'High-speed scrolling sovereign dispatches' },
  { id: 'public-quick-stats', slug: 'quick-stats', name: 'Quick Stats Strip', icon: BarChart3, desc: '4 core macroeconomic and trade corridor metrics' },
  { id: 'public-world', slug: 'world', name: 'World Stories Section', icon: Globe, desc: '3 multilateral geopolitical and trade reports' },
  { id: 'public-initiatives', slug: 'initiatives', name: 'Strategic Initiatives (8 Pillars)', icon: Layers, desc: 'Eight flagship bilateral sovereign initiatives' },
  { id: 'public-partners', slug: 'partners', name: 'Strategic Partners Marquee', icon: Building2, desc: 'State construction & energy partner logos' },
  { id: 'public-download-app', slug: 'download-app', name: 'Download App PWA Card', icon: Smartphone, desc: 'Standalone offline PWA application installation card' }
];

export function PublicPortalAdminSection({
  initialSubSection,
  lang = 'en'
}: PublicPortalAdminSectionProps) {
  const { sections, toggleSectionVisibility } = useSectionControlStore();
  const [selectedSectionSlug, setSelectedSectionSlug] = useState<string>(initialSubSection || 'overview');
  const [revalidateNotice, setRevalidateNotice] = useState<string | null>(null);

  const activeMeta = PUBLIC_SECTIONS_META.find(s => s.slug === selectedSectionSlug);

  const triggerRevalidate = async (path: string) => {
    try {
      const res = await fetch('/api/hub/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, tag: 'public-portal' })
      });
      if (res.ok) {
        setRevalidateNotice(`[ISR Revalidation Success] Path ${path} purged and regenerated.`);
        setTimeout(() => setRevalidateNotice(null), 4000);
      }
    } catch {
      setRevalidateNotice(`[Revalidation queued for ${path}]`);
      setTimeout(() => setRevalidateNotice(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
            <Globe size={14} />
            <span>ICA Administration • Public Portal Controller</span>
          </div>
          <h2 className="text-xl font-black uppercase text-white">Public Portal Administration</h2>
          <p className="text-xs text-neutral-400">
            Control, reorder, restyle, and publish every homepage section and card across all 4 locales.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => triggerRevalidate('/')}
            className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-600 text-xs font-bold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>Revalidate Public Cache</span>
          </button>
          <a
            href={`/${lang}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white flex items-center gap-1.5 shadow-md transition-colors"
          >
            <span>Live Public Site</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {revalidateNotice && (
        <div className="p-3 bg-emerald-950 border border-emerald-500 rounded-xl text-emerald-300 text-xs font-mono flex items-center gap-2">
          <RefreshCw size={14} className="animate-spin text-emerald-400" />
          <span>{revalidateNotice}</span>
        </div>
      )}

      {/* Sub-section Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-800 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedSectionSlug('overview')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase shrink-0 transition-colors cursor-pointer ${
            selectedSectionSlug === 'overview'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          Overview Roster
        </button>

        {PUBLIC_SECTIONS_META.map(sec => {
          const Icon = sec.icon;
          const currentSec = sections[sec.id];
          const count = currentSec?.items?.length || 0;
          return (
            <button
              key={sec.slug}
              type="button"
              onClick={() => setSelectedSectionSlug(sec.slug)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer ${
                selectedSectionSlug === sec.slug
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Icon size={13} />
              <span>{sec.name}</span>
              <span className="text-[10px] bg-neutral-950/60 px-1.5 py-0.2 rounded font-mono">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* MAIN VIEW: OVERVIEW OR SPECIFIC SECTION CRUD */}
      {selectedSectionSlug === 'overview' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PUBLIC_SECTIONS_META.map(sec => {
              const Icon = sec.icon;
              const sectionData = sections[sec.id];
              const isVisible = sectionData?.customization?.visibility === 'visible';
              const itemsCount = sectionData?.items?.length || 0;

              return (
                <div
                  key={sec.id}
                  className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 p-5 rounded-2xl flex flex-col justify-between space-y-4 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-red-950/60 text-red-400 border border-red-800/40">
                        <Icon size={18} />
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleSectionVisibility(sec.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                          isVisible
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-neutral-950 text-neutral-500 border border-neutral-800'
                        }`}
                        title="Toggle Section Visibility"
                      >
                        {isVisible ? 'Visible' : 'Hidden'}
                      </button>
                    </div>

                    <h3 className="text-sm font-black uppercase text-white tracking-tight">
                      {sec.name}
                    </h3>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      {sec.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-neutral-300">
                      {itemsCount} Active Items
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedSectionSlug(sec.slug)}
                      className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Manage CRUD</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : activeMeta ? (
        <GenericEntityCrud
          sectionId={activeMeta.id}
          sectionTitle={activeMeta.name}
          sectionDescription={activeMeta.desc}
          lang={lang}
        />
      ) : null}
    </div>
  );
}
