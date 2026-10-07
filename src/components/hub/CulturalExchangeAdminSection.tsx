import React, { useState } from 'react';
import { 
  GraduationCap, BookOpen, Award, Users, Plus, RefreshCw, 
  ExternalLink, Calendar, CheckCircle
} from 'lucide-react';
import { GenericEntityCrud } from './GenericEntityCrud';
import { Locale } from '../../types';

interface CulturalExchangeAdminSectionProps {
  initialSubSection?: string;
  lang?: Locale;
}

export function CulturalExchangeAdminSection({
  initialSubSection,
  lang = 'en'
}: CulturalExchangeAdminSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(initialSubSection || 'programs');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
            <GraduationCap size={14} />
            <span>CISE Services • Cultural & Academic Exchange Administration</span>
          </div>
          <h2 className="text-xl font-black uppercase text-white">Cultural Exchange Full CRUD Controller</h2>
          <p className="text-xs text-neutral-400">
            Create, edit, reorder, restyle, and manage fellowship programs, scholarships, and academic rosters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`/${lang}/services/cultural-exchange`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white flex items-center gap-1.5 shadow-md transition-colors"
          >
            <span>Public Service Page</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-800 scrollbar-none">
        {[
          { id: 'programs', name: 'Fellowships & Scholarships', icon: GraduationCap },
          { id: 'youth', name: 'Youth Ambassadors Delegations', icon: Users },
          { id: 'partners', name: 'Partner Universities & Academies', icon: Award }
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

      {/* Program CRUD */}
      {activeTab === 'programs' && (
        <GenericEntityCrud
          sectionId="services-cultural-exchange"
          sectionTitle="Academic Exchange & Fellowship Roster"
          sectionDescription="Manage fully funded scholarships, eligibility criteria, application windows, and intake capacity."
          lang={lang}
        />
      )}

      {activeTab === 'youth' && (
        <GenericEntityCrud
          sectionId="public-world"
          sectionTitle="Youth Diplomatic Delegations"
          sectionDescription="Curate bilateral study visits, student exchange cohorts, and archaeological fieldwork projects."
          lang={lang}
        />
      )}

      {activeTab === 'partners' && (
        <GenericEntityCrud
          sectionId="public-partners"
          sectionTitle="Partner Universities & Research Labs"
          sectionDescription="Manage affiliations with Peking University, Tsinghua, University of Baghdad, Basra, and Salahaddin."
          lang={lang}
        />
      )}
    </div>
  );
}
