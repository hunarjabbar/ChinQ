import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { 
  Mail, 
  Trash2, 
  Download, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  Users,
  Search
} from 'lucide-react';

export function AdminSubscribers() {
  const { data: subscribers = [], isLoading } = useQuery<any[]>({
    queryKey: ['admin-subscribers'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/subscribers');
      if (!res.ok) return [];
      return res.json();
    }
  });

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center">
        <div className="w-8 h-8 border-2 border-brand-100 border-t-brand-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-start">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-200 pb-8">
        <div>
          <h2 className="text-2xl font-bold font-black text-brand-900 tracking-tight">Information Subscribers</h2>
          <p className="text-sm text-neutral-500 font-medium mt-1">Manage users subscribed to trilingual bilateral information feeds.</p>
        </div>
        <button className="bg-neutral-900 hover:bg-neutral-800 text-white font-black text-xs px-6 py-2.5 rounded-lg uppercase tracking-widest transition-all cursor-pointer shadow-lg flex items-center gap-2">
          <Download size={14} />
          Export Ledger (CSV)
        </button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-neutral-500">Contact Node</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-neutral-500">Subscription Protocol</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-neutral-500">Status</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-neutral-500">Authorized Date</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-neutral-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 font-black text-xs uppercase">
                        {sub.email[0]}
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-brand-900">{sub.email}</p>
                        <p className="text-xs font-medium text-neutral-400 uppercase">UID: {sub.id.substring(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-black uppercase tracking-widest text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded">
                      {sub.subscriptionPlan || 'STANDARD'}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${sub.subscriptionStatus === 'ACTIVE' ? 'bg-green-500' : 'bg-neutral-300'}`}></div>
                       <span className="text-xs font-black uppercase tracking-widest text-brand-900">{sub.subscriptionStatus}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-xs text-neutral-500 font-medium">
                    {new Date(sub.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-neutral-300 hover:text-brand-800 transition-colors p-1 cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {subscribers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center text-neutral-300 italic font-bold">
                    No information subscribers logged in the current cycle.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-brand-800 text-white p-8 rounded-2xl shadow-xl space-y-4">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Subscriber Sentiment</h4>
          <p className="text-3xl font-black font-bold">+12%</p>
          <p className="text-xs text-white/80 leading-relaxed font-medium">Growth in enterprise-tier subscribers focusing on energy corridor data.</p>
        </div>
        <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm space-y-4">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400">Total Intel Reach</h4>
          <p className="text-3xl font-black font-bold text-brand-900">{subscribers.length * 4} Nodes</p>
          <p className="text-xs text-neutral-500 leading-relaxed font-medium">Estimated bilateral node touchpoints across Iraqi and Chinese markets.</p>
        </div>
        <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm space-y-4">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400">Ledger Health</h4>
          <p className="text-3xl font-black font-bold text-green-600">Optimal</p>
          <p className="text-xs text-neutral-500 leading-relaxed font-medium">Sovereign database synchronization is maintaining 99.9% uptime.</p>
        </div>
      </div>
    </div>
  );
}
