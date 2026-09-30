import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Trash2, Download, Plus, Check } from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function SecretariatNewsletterCrud() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const [dataVersion, setDataVersion] = useState(0);
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    return portalStore.subscribe(() => setDataVersion(v => v + 1));
  }, []);

  const subscribers = portalStore.getSubscribers();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (portalStore.addSubscriber(newEmail, currentLang, 'Secretariat Direct')) {
      setNewEmail('');
    }
  };

  const handleExportCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['ID,Email,SubscribedAt,Locale,BureauInterest,Status']
        .concat(
          subscribers.map(
            s => `${s.id},${s.email},${s.subscribedAt},${s.locale},${s.bureauInterest},${s.status}`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ica_subscribers_ledger.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#000000]">
            Newsletter Subscribers Ledger
          </h1>
          <p className="text-xs text-[#4B5563]">
            Manage institutional email dispatches, diplomatic telex distribution lists, and verified subscribers.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="px-4 py-2.5 rounded-xl border border-[#E5E7EB] hover:border-[var(--color-brand-800)] bg-white text-xs font-bold text-[#000000] flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download size={14} className="text-[var(--color-brand-800)]" />
          <span>Export CSV Ledger</span>
        </button>
      </div>

      {/* Manual Add Form */}
      <form onSubmit={handleAdd} className="p-4 rounded-2xl bg-white border border-[#E5E7EB] flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={newEmail}
          onChange={e => setNewEmail(e.target.value)}
          placeholder="Register new diplomatic contact email..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#A00D26] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
        >
          Add Contact
        </button>
      </form>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-xs">
        <table className="w-full text-xs text-start">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[10px] font-mono uppercase text-[#4B5563]">
            <tr>
              <th className="p-4 text-start">Institutional Email</th>
              <th className="p-4 text-start">Registered Date</th>
              <th className="p-4 text-start">Bureau Interest</th>
              <th className="p-4 text-start">Status</th>
              <th className="p-4 text-end">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {subscribers.map(sub => (
              <tr key={sub.id} className="hover:bg-[#F9FAFB] transition-colors">
                <td className="p-4 font-mono font-bold text-[#000000]">
                  {sub.email}
                </td>
                <td className="p-4 text-[#4B5563] font-mono text-[11px]">
                  {new Date(sub.subscribedAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-[#4B5563]">
                  {sub.bureauInterest}
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-green-100 text-green-800">
                    {sub.status}
                  </span>
                </td>
                <td className="p-4 text-end">
                  <button
                    onClick={() => {
                      if (confirm(`Remove ${sub.email} from subscriber ledger?`)) {
                        portalStore.deleteSubscriber(sub.id);
                      }
                    }}
                    className="p-1.5 rounded-lg border border-red-200 text-[var(--color-brand-800)] hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SecretariatNewsletterCrud;
