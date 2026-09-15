import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { 
  Megaphone, 
  Save, 
  Loader2, 
  History, 
  CheckCircle2, 
  AlertTriangle,
  Globe,
  Radio
} from 'lucide-react';

export function AdminAnnouncements() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    contentEn: '',
    contentAr: '',
    contentZh: '',
    contentCkb: '',
    type: 'INFO',
    isActive: true
  });

  const { data: announcements = [], isLoading } = useQuery<any[]>({
    queryKey: ['admin-announcements'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/announcements');
      if (!res.ok) return [];
      return res.json();
    }
  });

    const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/admin/announcements/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete announcement');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
    }
  });

  const mutation = useMutation({
    mutationFn: async (newAnnouncement: any) => {
      const res = await apiFetch('/api/admin/announcement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnnouncement)
      });
      if (!res.ok) throw new Error('Failed to save announcement');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      queryClient.invalidateQueries({ queryKey: ['announcement'] });
      alert('Global Announcement Synchronized!');
      setFormData({
        contentEn: '',
        contentAr: '',
        contentZh: '',
        contentCkb: '',
        type: 'INFO',
        isActive: true
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-start">
      <div className="bg-brand-800 rounded-2xl p-8 border border-brand-700 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 end-0 p-8 opacity-10">
          <Megaphone size={120} />
        </div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="flex items-center gap-2">
            <Radio className="text-brand-300 animate-pulse" size={24} />
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-brand-300">Global Synchronized Broadcast</h2>
          </div>
          <h3 className="text-3xl font-bold font-black leading-tight">Authorize a trilingual system announcement.</h3>
          <p className="text-brand-100 text-sm font-medium opacity-80 leading-relaxed">
            This message will be instantly synchronized across all public portal headers in English, Arabic, Chinese, and Kurdish. Use for critical summits, market shifts, or sovereign updates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-neutral-500 uppercase tracking-widest">Broadcast Priority</label>
                <select 
                  className="w-full border border-neutral-200 bg-neutral-50 py-2.5 px-4 text-xs font-bold rounded-lg focus:outline-none focus:border-brand-800 transition-all"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                >
                  <option value="INFO">Information (Neutral)</option>
                  <option value="EVENT">Live Event (Blue)</option>
                  <option value="URGENT">Urgent Dispatch (Red)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-neutral-500 uppercase tracking-widest">Signal Activation</label>
                <div className="flex bg-neutral-100 p-1 rounded-lg">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, isActive: true})}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-black uppercase tracking-wider rounded-md transition-all cursor-pointer ${formData.isActive ? 'bg-brand-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
                  >
                    Active
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, isActive: false})}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-black uppercase tracking-wider rounded-md transition-all cursor-pointer ${!formData.isActive ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
                  >
                    Inactive
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { id: 'en', label: 'English Broadcast', key: 'contentEn' },
                { id: 'ar', label: 'البث العربي', key: 'contentAr' },
                { id: 'zh', label: '中文广播', key: 'contentZh' },
                { id: 'ckb', label: 'پەخشی کوردی', key: 'contentCkb' },
              ].map((lang) => (
                <div key={lang.id} className="space-y-1.5" dir={lang.id === 'ar' || lang.id === 'ckb' ? 'rtl' : 'ltr'}>
                  <label className="block text-xs font-black text-neutral-400 uppercase tracking-widest text-start">{lang.label}</label>
                  <input 
                    type="text"
                    required
                    placeholder={lang.id === 'en' ? 'Enter short broadcast message...' : '...'}
                    className="w-full border border-neutral-200 bg-white py-3 px-4 text-sm font-bold rounded-lg focus:outline-none focus:border-brand-800 transition-all text-start"
                    value={formData[lang.key as keyof typeof formData] as string}
                    onChange={e => setFormData({...formData, [lang.key]: e.target.value})}
                  />
                </div>
              ))}
            </div>

            <button 
              type="submit" 
              disabled={mutation.isPending}
              className="w-full bg-brand-800 hover:bg-brand-700 text-white font-black py-4 rounded-xl uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg"
            >
              {mutation.isPending ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              Authorize & Synchronize Broadcast
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-brand-900 flex items-center gap-2">
              <History size={16} className="text-brand-800" />
              Broadcast History
            </h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pe-2 custom-scrollbar">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 space-y-2 relative group">
                  <div className="flex justify-between items-center">
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                      ann.isActive ? 'bg-green-100 text-green-700' : 'bg-neutral-200 text-neutral-500'
                    }`}>
                      {ann.isActive ? 'Active' : 'Archived'}
                    </span>
                    <span className="text-[8px] font-medium text-neutral-400">{new Date(ann.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-[11px] font-bold text-brand-900 leading-tight">"{ann.contentEn}"</p>
                  <p className="text-xs text-neutral-500 italic" dir="rtl">"{ann.contentAr}"</p>
                </div>
              ))}
              {announcements.length === 0 && (
                <div className="py-12 text-center text-neutral-400 italic text-xs font-medium">
                  No broadcast history found.
                </div>
              )}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl space-y-3">
             <div className="flex items-center gap-2 text-amber-800">
                <AlertTriangle size={18} />
                <h4 className="text-xs font-black uppercase tracking-widest">Synchronization Protocol</h4>
             </div>
             <p className="text-xs text-amber-900 leading-relaxed font-medium">
                Authorizing a new broadcast will automatically archive all other active signals. Only one trilingual broadcast can be live across the sovereign lattice at any given time.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
