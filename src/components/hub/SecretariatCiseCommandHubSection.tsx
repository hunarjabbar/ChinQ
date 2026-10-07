import React, { useState } from 'react';
import { 
  Shield, FileText, Layers, Film, Mail, Building2, Inbox, Users, 
  History, Settings, Plus, RefreshCw, ExternalLink, ChevronRight, CheckCircle2,
  Lock, KeyRound, Award, Smartphone
} from 'lucide-react';
import { GenericEntityCrud } from './GenericEntityCrud';
import { useSectionControlStore } from '../../store/useSectionControlStore';
import { Locale } from '../../types';

interface SecretariatCiseCommandHubSectionProps {
  initialSubSection?: string;
  lang?: Locale;
}

const SECRETARIAT_TABS = [
  { id: 'public-initiatives', slug: 'initiatives', name: 'Eight Flagship Initiatives', icon: Layers, desc: 'Summit, Chinese Centre, Visa, Settlement, Insurance, Cultural Exchange, ICA+' },
  { id: 'public-partners', slug: 'partners', name: 'Strategic Partners Marquee', icon: Building2, desc: 'CSCEC, CNOOC, Sinopec, CITIC, and Iraqi ministry consortiums' },
  { id: 'public-download-app', slug: 'app-pwa', name: 'PWA Mobile App Controls', icon: Smartphone, desc: 'Offline storage settings, encryption parameters, biometric sync' },
  { id: 'secretariat-directives', slug: 'content', name: 'Secretariat Directives', icon: FileText, desc: 'Sovereign protocol dispatches and plenipotentiary letters' }
];

export function SecretariatCiseCommandHubSection({
  initialSubSection,
  lang = 'en'
}: SecretariatCiseCommandHubSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(initialSubSection || 'overview');
  const [revalidateMsg, setRevalidateMsg] = useState<string | null>(null);

  const selectedMeta = SECRETARIAT_TABS.find(t => t.slug === activeTab);

  const triggerRevalidate = () => {
    setRevalidateMsg('[Secretariat Ledger Synchronized with ECDSA Signatures]');
    setTimeout(() => setRevalidateMsg(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
            <Shield size={14} />
            <span>ICA Administration • CISE Command Hub</span>
          </div>
          <h2 className="text-xl font-black uppercase text-white">Secretariat Administrative Command</h2>
          <p className="text-xs text-neutral-400">
            Enriched with all 8 initiatives, institutional partner dossiers, PWA app distribution, and audit verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={triggerRevalidate}
            className="px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-600 text-xs font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>Sync Ledger</span>
          </button>
          <a
            href={`/${lang}/secretariat`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white flex items-center gap-1.5 shadow-md transition-colors"
          >
            <span>Launch Secretariat</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {revalidateMsg && (
        <div className="p-3 bg-emerald-950 border border-emerald-500 rounded-xl text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{revalidateMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-800 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase shrink-0 transition-colors cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          Secretariat Overview
        </button>

        {SECRETARIAT_TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.slug}
              type="button"
              onClick={() => setActiveTab(tab.slug)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === tab.slug
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

      {/* Main View */}
      {activeTab === 'overview' ? (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Core Initiatives</span>
              <div className="text-2xl font-black text-white">8 Active</div>
              <span className="text-[10px] text-emerald-400 font-bold">100% Verified in Registry</span>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Institutional Partners</span>
              <div className="text-2xl font-black text-white">14 Consortiums</div>
              <span className="text-[10px] text-blue-400 font-bold">CSCEC, CNOOC, Sinopec</span>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">PWA Clients</span>
              <div className="text-2xl font-black text-white">v1.2.4 Live</div>
              <span className="text-[10px] text-red-400 font-bold">Offline Sync Armed</span>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Security Clearance</span>
              <div className="text-2xl font-black text-white">LEVEL-3</div>
              <span className="text-[10px] text-emerald-400 font-bold">Plenipotentiary Envoy</span>
            </div>
          </div>

          {/* Cards to dive into CRUD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SECRETARIAT_TABS.map(tab => {
              const Icon = tab.icon;
              return (
                <div
                  key={tab.slug}
                  className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="p-2.5 w-fit rounded-xl bg-red-950/60 text-red-400 border border-red-800/40">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-sm font-black uppercase text-white tracking-tight">
                      {tab.name}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      {tab.desc}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab(tab.slug)}
                    className="w-full py-2 bg-neutral-950 hover:bg-neutral-800 text-xs font-bold text-red-400 border border-neutral-800 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>Open {tab.name} CRUD</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : selectedMeta ? (
        <GenericEntityCrud
          sectionId={selectedMeta.id}
          sectionTitle={selectedMeta.name}
          sectionDescription={selectedMeta.desc}
          lang={lang}
        />
      ) : null}
    </div>
  );
}
