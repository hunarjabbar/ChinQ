import React, { useState } from 'react';
import { 
  Radio, Film, Tv, Clapperboard, Calendar, BarChart3, Plus, 
  ExternalLink, RefreshCw, Video
} from 'lucide-react';
import { GenericEntityCrud } from './GenericEntityCrud';
import { Locale } from '../../types';

interface LiveMediaAdminSectionProps {
  initialSubSection?: string;
  lang?: Locale;
}

export function LiveMediaAdminSection({
  initialSubSection,
  lang = 'en'
}: LiveMediaAdminSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(initialSubSection || 'streams');
  const [streamNotice, setStreamNotice] = useState<string | null>(null);

  const toggleStreamHealth = () => {
    setStreamNotice('[Broadcasting Uplink Calibrated: 4K 60fps Active]');
    setTimeout(() => setStreamNotice(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
            <Radio size={14} className="animate-pulse" />
            <span>ICA Administration • Live Portal & Media Hub</span>
          </div>
          <h2 className="text-xl font-black uppercase text-white">Live Broadcast & Media Hub Control</h2>
          <p className="text-xs text-neutral-400">
            Control live streaming channels, media catalog (documentaries, films, drama), and broadcast scheduling.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleStreamHealth}
            className="px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-600 text-xs font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>Calibrate Uplink</span>
          </button>
          <a
            href={`/${lang}/live`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white flex items-center gap-1.5 shadow-md transition-colors"
          >
            <span>Live Stream Portal</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {streamNotice && (
        <div className="p-3 bg-emerald-950 border border-emerald-500 rounded-xl text-emerald-300 text-xs font-mono">
          {streamNotice}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-800 scrollbar-none">
        {[
          { id: 'streams', name: 'Live Stream Beacon', icon: Radio },
          { id: 'documentaries', name: 'Documentary Series', icon: Video },
          { id: 'films', name: 'Feature Films & Drama', icon: Film },
          { id: 'exchange', name: 'Cultural Exchange Videos', icon: Clapperboard }
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

      {activeTab === 'streams' && (
        <GenericEntityCrud
          sectionId="public-live-broadcast"
          sectionTitle="Live Broadcast Stream Channels"
          sectionDescription="Manage 24/7 video feeds, diplomatic press room feeds, and live translation audio tracks."
          lang={lang}
        />
      )}

      {activeTab === 'documentaries' && (
        <GenericEntityCrud
          sectionId="public-world"
          sectionTitle="Documentary Film Archives"
          sectionDescription="Manage multi-part documentary series covering Silk Road history, Sumerian-Yellow River heritage, and engineering marvels."
          lang={lang}
        />
      )}

      {activeTab === 'films' && (
        <GenericEntityCrud
          sectionId="public-hero"
          sectionTitle="Cinema & Bilateral Drama Series"
          sectionDescription="Syndicated movies, joint cinematic productions, and trilingual subtitled cultural releases."
          lang={lang}
        />
      )}

      {activeTab === 'exchange' && (
        <GenericEntityCrud
          sectionId="services-cultural-exchange"
          sectionTitle="Cultural Exchange Masterclasses & Video Lectures"
          sectionDescription="Educational lectures, archaeological briefings, and Chinese-Arabic language tutorials."
          lang={lang}
        />
      )}
    </div>
  );
}
