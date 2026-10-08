import React, { useState, useEffect } from 'react';
import { 
  Globe, Check, Plus, Edit2, Trash2, Settings,
  CheckCircle, RefreshCw, Languages, Search, Save, X, AlertCircle
} from 'lucide-react';
import { Locale } from '../../types';

export interface LanguageRecord {
  code: string;
  name: string;
  native: string;
  direction: 'ltr' | 'rtl';
  isDefault: boolean;
  status: 'active' | 'maintenance' | 'beta';
  completeness: number;
  activeUsersShare: string;
  lastSyncAt: string;
}

export interface CiseCommandHubLanguagesProps {
  lang: Locale;
}

const DEFAULT_LANGUAGES: LanguageRecord[] = [
  { 
    code: 'en', 
    name: 'English', 
    native: 'English', 
    direction: 'ltr', 
    isDefault: true, 
    status: 'active', 
    completeness: 100, 
    activeUsersShare: '38%',
    lastSyncAt: '2026-10-08 06:40 UTC'
  },
  { 
    code: 'ar', 
    name: 'Arabic', 
    native: 'العربية', 
    direction: 'rtl', 
    isDefault: false, 
    status: 'active', 
    completeness: 100, 
    activeUsersShare: '32%',
    lastSyncAt: '2026-10-08 06:42 UTC'
  },
  { 
    code: 'zh', 
    name: 'Mandarin Chinese', 
    native: '中文', 
    direction: 'ltr', 
    isDefault: false, 
    status: 'active', 
    completeness: 100, 
    activeUsersShare: '22%',
    lastSyncAt: '2026-10-08 06:44 UTC'
  },
  { 
    code: 'ckb', 
    name: 'Central Kurdish (Sorani)', 
    native: 'کوردی (سۆرانی)', 
    direction: 'rtl', 
    isDefault: false, 
    status: 'active', 
    completeness: 98, 
    activeUsersShare: '8%',
    lastSyncAt: '2026-10-08 06:45 UTC'
  },
];

export function CiseCommandHubLanguages({ lang }: CiseCommandHubLanguagesProps) {
  const [languages, setLanguages] = useState<LanguageRecord[]>(() => {
    try {
      const saved = localStorage.getItem('cise_command_hub_languages');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_LANGUAGES;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [editingLang, setEditingLang] = useState<LanguageRecord | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<LanguageRecord | null>(null);
  const [newLangCode, setNewLangCode] = useState('');
  const [newLangName, setNewLangName] = useState('');
  const [newLangNative, setNewLangNative] = useState('');
  const [newLangDir, setNewLangDir] = useState<'ltr' | 'rtl'>('ltr');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Sync to local storage whenever languages change
  useEffect(() => {
    try {
      localStorage.setItem('cise_command_hub_languages', JSON.stringify(languages));
    } catch {}
  }, [languages]);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4500);
  };

  const handleSetDefault = (code: string) => {
    setLanguages(prev => prev.map(l => ({
      ...l,
      isDefault: l.code === code
    })));
    showNotification(`Default global language successfully assigned to (${code.toUpperCase()}) across the CISE Command Hub.`);
  };

  const handleToggleStatus = (code: string) => {
    setLanguages(prev => prev.map(l => {
      if (l.code === code) {
        const nextStatus: LanguageRecord['status'] = l.status === 'active' ? 'maintenance' : 'active';
        return { ...l, status: nextStatus };
      }
      return l;
    }));
    showNotification(`Language status toggled for locale (${code.toUpperCase()}).`);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.isDefault) {
      showNotification('Cannot delete the primary default global language.', 'error');
      setDeleteTarget(null);
      return;
    }
    setLanguages(prev => prev.filter(l => l.code !== deleteTarget.code));
    showNotification(`Locale (${deleteTarget.code.toUpperCase()}) successfully removed from CISE Command Hub registries.`);
    setDeleteTarget(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLang) return;
    setLanguages(prev => prev.map(l => l.code === editingLang.code ? { ...editingLang, lastSyncAt: 'Just now' } : l));
    setEditingLang(null);
    showNotification(`Locale (${editingLang.code.toUpperCase()}) configuration updated successfully in CISE Command Hub.`);
  };

  const handleAddLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = newLangCode.toLowerCase().trim();
    if (!cleanCode || !newLangName || !newLangNative) return;

    if (languages.some(l => l.code === cleanCode)) {
      showNotification(`Locale code "${cleanCode}" already exists in CISE Command Hub.`, 'error');
      return;
    }

    const newRecord: LanguageRecord = {
      code: cleanCode,
      name: newLangName.trim(),
      native: newLangNative.trim(),
      direction: newLangDir,
      isDefault: false,
      status: 'active',
      completeness: 85,
      activeUsersShare: '1%',
      lastSyncAt: 'Just now'
    };

    setLanguages(prev => [...prev, newRecord]);
    setIsAddModalOpen(false);
    setNewLangCode('');
    setNewLangName('');
    setNewLangNative('');
    showNotification(`New locale (${cleanCode.toUpperCase()}) successfully registered in CISE Command Hub.`);
  };

  const handleSyncAll = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setLanguages(prev => prev.map(l => ({ ...l, lastSyncAt: 'Just now', completeness: l.completeness < 100 ? Math.min(100, l.completeness + 5) : 100 })));
      setIsSyncing(false);
      showNotification('Global translation bundles and dictionary registries synchronized across CISE Command Hub.');
    }, 1200);
  };

  const filteredLanguages = languages.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.native.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Top Banner: Bounded Clean Red Shape with White Font */}
      <div className="bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:16px_16px]" />

        <div className="space-y-2 relative z-10 max-w-2xl">
          {/* Eyebrow: Bounded Clean Shape with White Font */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-white/20 text-white border border-white/30 backdrop-blur-xs">
            <Globe size={13} className="text-white" />
            <span>CISE Command Hub · Sovereign Multilingual Architecture</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
            Languages & Localization Management
          </h2>
          <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
            Manage global operational languages, bidirectional layout policies (LTR/RTL), sovereign translation bundles, and first-visit prompt defaults across the CISE Command Hub.
          </p>
        </div>

        <div className="flex items-center gap-2.5 relative z-10 shrink-0">
          <button
            type="button"
            onClick={handleSyncAll}
            disabled={isSyncing}
            className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center gap-2 border border-white/30 transition-all cursor-pointer disabled:opacity-50"
            title="Re-synchronize dictionary catalogs"
          >
            <RefreshCw size={14} className={isSyncing ? "animate-spin" : ""} />
            <span>{isSyncing ? "Syncing..." : "Sync Catalogs"}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-red-600 font-black text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <Plus size={16} strokeWidth={3} />
            <span>Add New Locale</span>
          </button>
        </div>
      </div>

      {/* Reactive In-App Notification Toast */}
      {notification && (
        <div 
          className={`p-4 rounded-xl text-xs font-bold flex items-center gap-3 transition-all shadow-md ${
            notification.type === 'error'
              ? 'bg-rose-950/80 border border-rose-800 text-rose-200'
              : 'bg-emerald-950/80 border border-emerald-800 text-emerald-200'
          }`}
        >
          {notification.type === 'error' ? (
            <AlertCircle size={18} className="shrink-0 text-rose-400" />
          ) : (
            <CheckCircle size={18} className="shrink-0 text-emerald-400" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Control Surface & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search language name, ISO code, or native script..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-600"
          />
        </div>

        <div className="flex items-center gap-3 text-xs text-neutral-400 font-bold">
          <span>{filteredLanguages.length} of {languages.length} Locales Active</span>
        </div>
      </div>

      {/* Locales Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLanguages.map((item) => (
          <div 
            key={item.code} 
            className={`bg-neutral-900 border rounded-2xl p-5 space-y-4 transition-all ${
              item.isDefault 
                ? 'border-red-600 ring-2 ring-red-600/30 shadow-lg' 
                : 'border-neutral-800 hover:border-neutral-700'
            }`}
          >
            {/* Top Card Bar */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  {/* Bounded Clean Red Shape with White Font for ISO Code */}
                  <span className="text-xs font-black uppercase px-2.5 py-1 rounded-lg bg-red-600 text-white shadow-xs">
                    {item.code.toUpperCase()}
                  </span>
                  <h3 className="text-base font-black text-white">{item.name}</h3>
                  <span className="text-sm font-bold text-neutral-400">({item.native})</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-neutral-400 pt-1">
                  <span>Direction: <strong className="text-white uppercase">{item.direction}</strong></span>
                  <span>•</span>
                  <span>Traffic Share: <strong className="text-white">{item.activeUsersShare}</strong></span>
                  <span>•</span>
                  <span>Sync: <strong className="text-neutral-300">{item.lastSyncAt}</strong></span>
                </div>
              </div>

              {item.isDefault ? (
                <div className="bg-red-600 text-white font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1 shrink-0">
                  <Check size={11} strokeWidth={3} />
                  <span>Default Global</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSetDefault(item.code)}
                  className="text-[11px] font-bold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 px-3 py-1 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Set as Default
                </button>
              )}
            </div>

            {/* Translation Sync Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[10px] font-bold uppercase text-neutral-400">
                <span>Dictionary Completeness</span>
                <span className="font-mono text-white">{item.completeness}%</span>
              </div>
              <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden border border-neutral-800">
                <div 
                  className="bg-red-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.completeness}%` }}
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-neutral-800 text-xs">
              <div className="flex items-center gap-2">
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${item.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span className="text-neutral-300 font-bold uppercase text-[10px] tracking-wide">{item.status}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(item.code)}
                  className="text-neutral-300 hover:text-white px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-colors cursor-pointer text-[11px] font-bold"
                >
                  Toggle Status
                </button>

                <button
                  type="button"
                  onClick={() => setEditingLang(item)}
                  className="text-neutral-300 hover:text-white p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-colors cursor-pointer"
                  title="Edit Locale Properties"
                >
                  <Edit2 size={14} />
                </button>

                {!item.isDefault && (
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(item)}
                    className="text-rose-400 hover:text-rose-300 p-1.5 rounded-lg bg-neutral-800 hover:bg-rose-950/50 border border-neutral-700 hover:border-rose-800 transition-colors cursor-pointer"
                    title="Remove Locale"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Locale Modal */}
      {editingLang && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveEdit} className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-7 max-w-md w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white font-black text-xs px-2.5 py-0.5 rounded-md">
                  {editingLang.code.toUpperCase()}
                </span>
                <h3 className="text-sm font-black uppercase text-white">Edit Locale Configuration</h3>
              </div>
              <button type="button" onClick={() => setEditingLang(null)} className="text-neutral-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-neutral-400 font-bold uppercase mb-1">Language English Name</label>
                <input
                  type="text"
                  value={editingLang.name}
                  onChange={e => setEditingLang({ ...editingLang, name: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-bold focus:border-red-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-bold uppercase mb-1">Native Script Label</label>
                <input
                  type="text"
                  value={editingLang.native}
                  onChange={e => setEditingLang({ ...editingLang, native: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-bold focus:border-red-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-bold uppercase mb-1">Text Direction Policy</label>
                <select
                  value={editingLang.direction}
                  onChange={e => setEditingLang({ ...editingLang, direction: e.target.value as any })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-bold focus:border-red-600 focus:outline-none"
                >
                  <option value="ltr">LTR (Left-to-Right)</option>
                  <option value="rtl">RTL (Right-to-Left)</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 font-bold uppercase mb-1">Completeness (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editingLang.completeness}
                  onChange={e => setEditingLang({ ...editingLang, completeness: Number(e.target.value) })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-bold focus:border-red-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setEditingLang(null)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Save size={14} />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add New Locale Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddLanguage} className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-7 max-w-md w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                  +
                </div>
                <h3 className="text-sm font-black uppercase text-white">Add New Locale to CISE Command Hub</h3>
              </div>
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-neutral-400 font-bold uppercase mb-1">Locale ISO Code (e.g. fr, de, fa, ru)</label>
                <input
                  type="text"
                  maxLength={5}
                  value={newLangCode}
                  onChange={e => setNewLangCode(e.target.value)}
                  placeholder="fa"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-bold uppercase focus:border-red-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-bold uppercase mb-1">Language English Name</label>
                <input
                  type="text"
                  value={newLangName}
                  onChange={e => setNewLangName(e.target.value)}
                  placeholder="Persian (Farsi)"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-bold focus:border-red-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-bold uppercase mb-1">Native Script Label</label>
                <input
                  type="text"
                  value={newLangNative}
                  onChange={e => setNewLangNative(e.target.value)}
                  placeholder="فارسی"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-bold focus:border-red-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-bold uppercase mb-1">Text Direction Policy</label>
                <select
                  value={newLangDir}
                  onChange={e => setNewLangDir(e.target.value as any)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-bold focus:border-red-600 focus:outline-none"
                >
                  <option value="ltr">LTR (Left-to-Right)</option>
                  <option value="rtl">RTL (Right-to-Left)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Plus size={14} strokeWidth={3} />
                <span>Create Locale</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal (Replaces browser confirm) */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-7 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertCircle size={24} />
              <h3 className="text-base font-black text-white uppercase">Confirm Locale Deletion</h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Are you sure you want to remove locale <strong className="text-white">({deleteTarget.code.toUpperCase()} — {deleteTarget.name})</strong> from the CISE Command Hub? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2.5 pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase rounded-xl shadow-md cursor-pointer"
              >
                Delete Locale
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
