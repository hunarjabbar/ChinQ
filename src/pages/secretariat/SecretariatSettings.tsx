import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Settings, Save, Shield, Check } from 'lucide-react';
import { PortalLocale } from '../../types/portals';

export function SecretariatSettings() {
  const { lang = 'en' } = useParams<{ lang: string }>();

  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    agencyName: 'Iraqi-Chinese Agency (ICA)',
    revalidationSeconds: 60,
    allowGuestChat: true,
    telemetryBroadcastEnabled: true,
    cipsClearingEndpoint: 'https://cips.settlement.iraq-china.agency/v1',
    sovereignEncryptionStandard: 'ECDSA-SHA256'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pb-4 border-b border-[#E5E7EB]">
        <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#000000]">
          Secretariat Governance Settings
        </h1>
        <p className="text-xs text-[#4B5563]">
          Manage global portal cache invalidation intervals, telemetry streaming endpoints, and encryption keys.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-8 rounded-2xl bg-white border border-[#E5E7EB] space-y-6 shadow-xs">
        <div>
          <label className="block text-xs font-bold text-[#000000] uppercase mb-2">
            Institutional Agency Identifier
          </label>
          <input
            type="text"
            value={settings.agencyName}
            onChange={e => setSettings({ ...settings, agencyName: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-[#000000] uppercase mb-2">
              ISR Page Revalidation Interval (Seconds)
            </label>
            <input
              type="number"
              value={settings.revalidationSeconds}
              onChange={e => setSettings({ ...settings, revalidationSeconds: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#000000] uppercase mb-2">
              Cryptographic Standard
            </label>
            <input
              type="text"
              readOnly
              value={settings.sovereignEncryptionStandard}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-neutral-100 text-xs text-[#4B5563] font-mono cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#000000] uppercase mb-2">
            Sovereign Clearance API Gateway
          </label>
          <input
            type="text"
            value={settings.cipsClearingEndpoint}
            onChange={e => setSettings({ ...settings, cipsClearingEndpoint: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] text-xs text-[#000000] font-mono focus:border-[var(--color-brand-800)] focus:outline-none"
          />
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-3 text-xs font-bold text-[#000000] cursor-pointer">
            <input
              type="checkbox"
              checked={settings.allowGuestChat}
              onChange={e => setSettings({ ...settings, allowGuestChat: e.target.checked })}
              className="accent-[var(--color-brand-800)]"
            />
            <span>Enable Interactive Live Chat in Media Broadcasts</span>
          </label>

          <label className="flex items-center gap-3 text-xs font-bold text-[#000000] cursor-pointer">
            <input
              type="checkbox"
              checked={settings.telemetryBroadcastEnabled}
              onChange={e => setSettings({ ...settings, telemetryBroadcastEnabled: e.target.checked })}
              className="accent-[var(--color-brand-800)]"
            />
            <span>24/7 Sovereign Telemetry Signal Feed Broadcast Enabled</span>
          </label>
        </div>

        <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
          {saved ? (
            <span className="text-green-600 font-bold text-xs flex items-center gap-1.5">
              <Check size={14} />
              <span>Settings Synchronized to Ledger</span>
            </span>
          ) : <span />}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#A00D26] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
          >
            <Save size={14} />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SecretariatSettings;
