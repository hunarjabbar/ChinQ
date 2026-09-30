import React, { useState, useEffect } from 'react';
import { Locale, translations } from '../locales';
import { 
  ShieldAlert, 
  Users, 
  FileText, 
  Activity, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  CheckCircle, 
  AlertTriangle,
  Radio,
  Search,
  Key
} from 'lucide-react';

interface HubPageProps {
  currentLocale: Locale;
}

export const HubPage: React.FC<HubPageProps> = ({ currentLocale }) => {
  const t = translations[currentLocale];
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'users' | 'audit'>('overview');
  const [currentRole, setCurrentRole] = useState<'SUPER_ADMIN' | 'STRATEGIC_ANALYST' | 'AUTHOR'>('SUPER_ADMIN');
  
  // Article CRUD state
  const [articles, setArticles] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newCategory, setNewCategory] = useState('Monetary & Banking');
  const [isCreating, setIsCreating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Audit Logs state
  const [auditLogs, setAuditLogs] = useState<any[]>([
    { id: 'log-1', action: 'CLEARANCE_VERIFIED', user: 'Director General Chen', ip: '10.240.12.4', time: '10 mins ago', status: 'SUCCESS' },
    { id: 'log-2', action: 'DISPATCH_PUBLISHED', user: 'Analyst Al-Bayati', ip: '10.240.14.88', time: '25 mins ago', status: 'SUCCESS' },
    { id: 'log-3', action: 'SETTLEMENT_ORDER_VALIDATED', user: 'Central Clearing Gateway', ip: '192.168.1.10', time: '1 hour ago', status: 'SUCCESS' },
    { id: 'log-4', action: 'CREDENTIAL_RENEWAL', user: 'Secretary Qadir', ip: '10.240.16.2', time: '2 hours ago', status: 'SUCCESS' },
  ]);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setArticles(data);
      })
      .catch(() => {});
  }, []);

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newArt = {
      id: `art-${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      title: newTitle,
      excerpt: newExcerpt || 'Sovereign intelligence analysis.',
      category: { name: newCategory },
      createdAt: new Date().toISOString(),
      translations: [{ lang: currentLocale, title: newTitle, excerpt: newExcerpt }],
    };

    setArticles([newArt, ...articles]);
    setNewTitle('');
    setNewExcerpt('');
    setIsCreating(false);
    setStatusMessage('Analysis dispatch committed to CISE publication ledger.');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter((a) => a.id !== id));
    setStatusMessage('Analysis record removed.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Hub Top Bar with Role Simulator */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#ff4d4d] tracking-widest uppercase">
            <Radio className="w-4 h-4 text-[var(--color-brand-800)]" />
            <span>CENTRAL COMMAND & SURVEILLANCE DESK</span>
          </div>
          <h1 className="text-2xl font-black text-white">{t.hub.title}</h1>
          <p className="text-xs text-neutral-400 max-w-xl">{t.hub.subtitle}</p>
        </div>

        {/* RBAC Role Selector */}
        <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-3 space-y-1.5 shrink-0 text-xs">
          <div className="text-[11px] text-neutral-400 font-semibold flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-[var(--color-brand-800)]" />
            <span>Active Clearance Identity:</span>
          </div>
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value as any)}
            className="bg-neutral-900 border border-neutral-700 text-white rounded p-1.5 text-xs font-mono font-bold focus:outline-none focus:border-[var(--color-brand-800)]"
          >
            <option value="SUPER_ADMIN">Level 4: SUPER_ADMIN (Full Sovereignty)</option>
            <option value="STRATEGIC_ANALYST">Level 3: STRATEGIC_ANALYST (Policy Review)</option>
            <option value="AUTHOR">Level 2: AUTHOR (Editorial Drafting)</option>
          </select>
        </div>
      </section>

      {/* Status banner */}
      {statusMessage && (
        <div className="bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs p-3 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2 overflow-x-auto text-xs font-semibold">
        {(['overview', 'articles', 'users', 'audit'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === tab
                ? 'bg-[var(--color-brand-800)] text-white'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            {tab === 'overview' && t.hub.overview}
            {tab === 'articles' && t.hub.articlesTab}
            {tab === 'users' && t.hub.usersTab}
            {tab === 'audit' && t.hub.auditLogsTab}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg space-y-1">
              <div className="text-xs text-neutral-400">Total Published Dispatches</div>
              <div className="text-2xl font-mono font-bold text-white">{articles.length || 42}</div>
              <div className="text-[10px] text-emerald-400">Trilingual Synchronized</div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg space-y-1">
              <div className="text-xs text-neutral-400">Sovereign Analysts</div>
              <div className="text-2xl font-mono font-bold text-white">28</div>
              <div className="text-[10px] text-neutral-500">Baghdad · Beijing · Erbil</div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg space-y-1">
              <div className="text-xs text-neutral-400">Settlement Orders Cleared</div>
              <div className="text-2xl font-mono font-bold text-[#ff4d4d]">1,409</div>
              <div className="text-[10px] text-emerald-400">100% Success Ratio</div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg space-y-1">
              <div className="text-xs text-neutral-400">System Gateway Security</div>
              <div className="text-2xl font-mono font-bold text-emerald-400">ACTIVE</div>
              <div className="text-[10px] text-neutral-500">TLS 1.3 · HMAC SHA-256</div>
            </div>
          </div>
        </section>
      )}

      {/* Tab: Articles CRUD */}
      {activeTab === 'articles' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--color-brand-800)]" />
              {t.hub.articlesTab} Management
            </h3>

            <button
              onClick={() => setIsCreating(!isCreating)}
              className="bg-[var(--color-brand-800)] hover:bg-[#aa0000] text-white font-bold text-xs px-3.5 py-2 rounded transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{t.hub.createArticle}</span>
            </button>
          </div>

          {/* Creation Drawer */}
          {isCreating && (
            <form onSubmit={handleCreateArticle} className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-4">
              <h4 className="text-sm font-bold text-white">Compose New Intelligence Analysis</h4>
              
              <div className="space-y-1">
                <label className="text-xs text-neutral-300 font-semibold">Article Headline *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter strategic headline..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-xs text-white focus:outline-none focus:border-[var(--color-brand-800)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-300 font-semibold">Executive Summary *</label>
                <textarea
                  rows={3}
                  required
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="Enter core analytical briefing..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-xs text-white focus:outline-none focus:border-[var(--color-brand-800)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-300 font-semibold">Strategic Focus Area</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-xs text-white focus:outline-none focus:border-[var(--color-brand-800)]"
                >
                  <option value="Monetary & Banking">Monetary & Banking</option>
                  <option value="Development Road">Development Road</option>
                  <option value="Energy Transition">Energy Transition</option>
                  <option value="Bilateral Trade">Bilateral Trade</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[var(--color-brand-800)] hover:bg-[#aa0000] text-white font-bold rounded text-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Publish to Network</span>
                </button>
              </div>
            </form>
          )}

          {/* Articles list */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden text-xs">
            <div className="bg-neutral-950 px-4 py-3 border-b border-neutral-800 font-bold text-neutral-400 grid grid-cols-12 gap-2">
              <div className="col-span-6">Title / Briefing</div>
              <div className="col-span-3">Category</div>
              <div className="col-span-3 text-end">Actions</div>
            </div>

            <div className="divide-y divide-neutral-800">
              {articles.map((art) => {
                const tr = art.translations?.[0] || {};
                const title = tr.title || art.title || art.slug;
                const cat = art.category?.name || 'Analysis';

                return (
                  <div key={art.id || art.slug} className="px-4 py-3 grid grid-cols-12 gap-2 items-center hover:bg-neutral-800/40">
                    <div className="col-span-6 space-y-0.5">
                      <div className="font-semibold text-white truncate">{title}</div>
                      <div className="text-[11px] text-neutral-500 font-mono truncate">{art.slug}</div>
                    </div>

                    <div className="col-span-3">
                      <span className="bg-[var(--color-brand-800)]/15 text-[#ff4d4d] border border-[var(--color-brand-800)]/30 px-2 py-0.5 rounded text-[11px] font-semibold">
                        {cat}
                      </span>
                    </div>

                    <div className="col-span-3 flex items-center justify-end gap-2">
                      <button
                        onClick={() => alert(`Reviewing dossier: ${title}`)}
                        className="p-1 hover:text-white text-neutral-400"
                        title="Edit Article"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {currentRole === 'SUPER_ADMIN' && (
                        <button
                          onClick={() => handleDeleteArticle(art.id)}
                          className="p-1 hover:text-red-400 text-neutral-500"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tab: Users / Personnel */}
      {activeTab === 'users' && (
        <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-[var(--color-brand-800)]" />
              Accredited Personnel & Intelligence Officers
            </h3>
            <span className="text-xs text-neutral-400 font-mono">28 Authorized Keys</span>
          </div>

          <div className="divide-y divide-neutral-800 border border-neutral-800 rounded-lg overflow-hidden">
            {[
              { name: 'Dr. Chen Weidong', title: 'Director General of Energy Research', bureau: 'Beijing Bureau', role: 'SUPER_ADMIN' },
              { name: 'Eng. Mohammed Baqir Al-Hakim', title: 'Chief Infrastructure Analyst', bureau: 'Baghdad HQ', role: 'STRATEGIC_ANALYST' },
              { name: 'Prof. Lin Xiaomin', title: 'Lead Maritime Freight Coordinator', bureau: 'Basra Logistics Wing', role: 'STRATEGIC_ANALYST' },
              { name: 'Soran H. Qadir', title: 'Director of Northern Trade Corridors', bureau: 'Erbil Secretariat', role: 'AUTHOR' },
            ].map((u, idx) => (
              <div key={idx} className="p-3 bg-neutral-950 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">{u.name}</div>
                  <div className="text-neutral-400 text-[11px]">{u.title} · {u.bureau}</div>
                </div>
                <span className="bg-neutral-800 text-neutral-300 font-mono text-[10px] px-2 py-0.5 rounded border border-neutral-700">
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab: Audit Logs */}
      {activeTab === 'audit' && (
        <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-[var(--color-brand-800)]" />
              Immutable Security & Audit Ledger
            </h3>
            <span className="text-[11px] text-emerald-400 font-mono">Real-Time Verification</span>
          </div>

          <div className="space-y-2 font-mono text-[11px]">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-neutral-950 border border-neutral-800 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="text-white font-bold flex items-center gap-2">
                    <span className="text-emerald-400">[{log.status}]</span>
                    <span>{log.action}</span>
                  </div>
                  <div className="text-neutral-400 text-[10px]">Actor: {log.user} · Host: {log.ip}</div>
                </div>
                <span className="text-neutral-500 shrink-0">{log.time}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
