import { useState } from 'react';
import { Settings, Save, Database, Shield, Globe, Wifi } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';

export function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'ChinQ Network',
    contactEmail: 'desk@chinq.com',
    cachingEnabled: true,
    autoTranslate: true,
    geoLatencyRoute: 'baghdad-beijing',
    systemMaintenance: false
  });

  const [savedStatus, setSavedStatus] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-start max-w-4xl">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">System Settings</h1>
            <p className="text-sm text-gray-500">Configure core infrastructure, caching priorities, and global latency parameters.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* General Metadata Settings */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Settings size={18} className="text-[#990000]" />
              General Editorial Config
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Global Station Brand Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-[#990000] outline-none text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Editorial Desk Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-[#990000] outline-none text-sm font-mono"
                />
              </div>
            </div>
          </div>

          {/* Infrastructure & Regional Routing Settings */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Database size={18} className="text-[#990000]" />
              Infrastructure & Regional Replication
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">High-Speed Edge Routing Path</label>
                <select
                  value={settings.geoLatencyRoute}
                  onChange={(e) => setSettings({ ...settings, geoLatencyRoute: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-[#990000] bg-white outline-none text-sm"
                >
                  <option value="baghdad-beijing">Baghdad Hub ⇆ Beijing Core (Direct regional transit via Silk Road fiber)</option>
                  <option value="sulaymaniyah-beijing">Sulaymaniyah Hub ⇆ Beijing Core (Optimized for North Iraq and Kurdistan regional coverage)</option>
                  <option value="baghdad-sulaymaniyah">Baghdad Hub ⇆ Sulaymaniyah Hub (Local national caching ring)</option>
                </select>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Wifi size={12} className="text-[#990000]" />
                  Average latency on direct regional fiber is currently rated at 42ms.
                </p>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.cachingEnabled}
                    onChange={(e) => setSettings({ ...settings, cachingEnabled: e.target.checked })}
                    className="mt-1 accent-[#990000]"
                  />
                  <div>
                    <span className="block text-sm font-bold text-gray-900">Distributed CDN Edge Caching</span>
                    <span className="block text-xs text-gray-500">Accelerates asset delivery across Middle East and China.</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoTranslate}
                    onChange={(e) => setSettings({ ...settings, autoTranslate: e.target.checked })}
                    className="mt-1 accent-[#990000]"
                  />
                  <div>
                    <span className="block text-sm font-bold text-gray-900">Auto-Translation Assistance</span>
                    <span className="block text-xs text-gray-500">Enable automated translation triggers for headlines.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Security & Maintenance */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Shield size={18} className="text-[#990000]" />
              System State Controls
            </h3>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.systemMaintenance}
                onChange={(e) => setSettings({ ...settings, geoLatencyRoute: 'baghdad-beijing', systemMaintenance: e.target.checked })}
                className="mt-1 accent-[#990000]"
              />
              <div>
                <span className="block text-sm font-bold text-gray-900 text-red-600">Enterprise Read-Only Lockdown</span>
                <span className="block text-xs text-gray-500">Temporarily suspend publishing capabilities while system upgrades run in regional centers.</span>
              </div>
            </label>
          </div>

          {/* Saved notification message and Save Button */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#990000] text-white font-bold uppercase tracking-wider text-sm rounded shadow-sm hover:bg-[#7a0000] transition-colors"
            >
              <Save size={16} /> Save Settings
            </button>
            {savedStatus && (
              <span className="text-sm text-green-600 font-bold bg-green-50 px-3 py-1 rounded border border-green-200 animate-pulse">
                ✓ System configurations successfully applied across nodes
              </span>
            )}
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
