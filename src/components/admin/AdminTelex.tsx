import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { 
  Terminal, 
  Globe, 
  Trash2, 
  Check, 
  Archive,
  RefreshCcw,
  Shield,
  Activity,
  Cpu
} from 'lucide-react';

export function AdminTelex() {
  const queryClient = useQueryClient();

  const { data: telexes = [], isLoading } = useQuery<any[]>({
    queryKey: ['admin-telexes'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/telexes');
      if (!res.ok) return [];
      return res.json();
    }
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const res = await apiFetch(`/api/admin/telexes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update status');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-telexes'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/admin/telexes/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-telexes'] });
    }
  });

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center">
        <RefreshCcw className="text-brand-800 animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-start">
      <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 end-0 p-8 opacity-5">
          <Terminal size={120} className="text-[#00FF00]" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="text-[#00FF00] animate-pulse" size={24} />
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#00FF00]">Encrypted Telex Ledger</h2>
          </div>
          <h3 className="text-2xl font-bold font-black text-white leading-tight">Authorize trilingual information dispatches.</h3>
          <p className="text-neutral-500 text-sm font-medium max-w-2xl">
            Sovereign communication channel for bilateral trade inquiries, energy corridor information, and cultural exchange briefs. All dispatches are trilingual-ready.
          </p>
        </div>
      </div>

      {telexes.length === 0 ? (
        <div className="py-24 text-center border border-neutral-900 bg-neutral-950 rounded-xl font-medium text-xs uppercase tracking-[0.2em] text-neutral-600">
           -- NO ACTIVE DISPATCHES IN LEDGER --
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {telexes.map((tlx) => (
            <div key={tlx.id} className="bg-neutral-950 border border-neutral-900 rounded-xl overflow-hidden shadow-xl font-medium flex flex-col md:flex-row group">
              <div className="md:w-64 bg-neutral-900/50 p-6 border-e border-neutral-900 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#00FF00] text-xs font-black uppercase tracking-widest border-b border-[#00FF00]/10 pb-2">
                    <Activity size={12} className="animate-pulse" />
                    SIGNAL ACTIVE
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#00FF00] text-[11px] font-black">REF: {tlx.telexRef}</p>
                    <p className="text-neutral-500 text-xs uppercase tracking-wider">{tlx.bureau} Node</p>
                  </div>
                </div>
                <div className="pt-8">
                  <div className={`inline-flex px-2 py-0.5 border text-xs font-black uppercase tracking-[0.2em] ${
                    tlx.status === 'UNREAD' ? 'bg-brand-950 text-brand-500 border-brand-800' :
                    tlx.status === 'ARCHIVED' ? 'bg-neutral-800 text-neutral-500 border-neutral-700' :
                    'bg-[#00FF00]/10 text-[#00FF00] border-[#00FF00]/50'
                  }`}>
                    {tlx.status}
                  </div>
                </div>
              </div>

              <div className="flex-1 p-6 space-y-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-black text-neutral-500 uppercase tracking-widest">Sovereign Origin</p>
                    <p className="text-sm font-bold text-white">{tlx.name} <span className="text-neutral-500 font-normal">({tlx.company})</span></p>
                    <p className="text-xs text-brand-500 uppercase">{tlx.email}</p>
                  </div>
                  <div className="text-start md:text-end">
                     <p className="text-xs font-black text-neutral-500 uppercase tracking-widest">Transmit Time</p>
                     <p className="text-xs text-neutral-300 font-bold">{new Date(tlx.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute top-2 end-2 flex items-center gap-2 opacity-30">
                    <Shield size={12} className="text-[#00FF00]" />
                    <span className="text-[8px] text-[#00FF00] uppercase tracking-widest">Encrypted Tier 1</span>
                  </div>
                  <p className="bg-black/60 border border-neutral-800 p-5 rounded-lg text-[#00FF00] text-[11px] leading-relaxed whitespace-pre-wrap italic">
                    "{tlx.message}"
                  </p>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <Cpu size={12} className="text-neutral-600" />
                    <span className="text-xs font-black text-neutral-600 uppercase tracking-widest">Processed via Global Ledger</span>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => statusMutation.mutate({ id: tlx.id, status: 'REPLIED' })}
                      className="bg-[#00FF00]/10 hover:bg-[#00FF00]/20 text-[#00FF00] border border-[#00FF00]/30 text-xs font-black px-4 py-1.5 rounded uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Check size={12} />
                      Acknowledge
                    </button>
                    <button 
                      onClick={() => statusMutation.mutate({ id: tlx.id, status: 'ARCHIVED' })}
                      className="text-neutral-500 hover:text-white border border-neutral-800 hover:border-neutral-700 text-xs font-black px-4 py-1.5 rounded uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Archive size={12} />
                      Archive
                    </button>
                    <button 
                      onClick={() => { if(confirm('Erase dispatch from ledger?')) deleteMutation.mutate(tlx.id) }}
                      className="text-neutral-700 hover:text-brand-800 transition-colors p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
