import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Lock, 
  Unlock, 
  Search,
  FileText,
  Calendar,
  Globe,
  Save,
  Loader2
} from 'lucide-react';

export function AdminStudies() {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  
  const [formData, setFormData] = useState({
    slug: '',
    titleEn: '', titleAr: '', titleZh: '', titleCkb: '',
    excerptEn: '', excerptAr: '', excerptZh: '', excerptCkb: '',
    contentEn: '', contentAr: '', contentZh: '', contentCkb: '',
    imageUrl: '',
    isPrivate: false
  });

  const { data: studies = [], isLoading } = useQuery<any[]>({
    queryKey: ['admin-studies'],
    queryFn: async () => {
      const res = await apiFetch('/api/studies');
      if (!res.ok) return [];
      return res.json();
    }
  });

  const mutation = useMutation({
    mutationFn: async (newStudy: any) => {
      const res = await apiFetch('/api/admin/studies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudy)
      });
      if (!res.ok) throw new Error('Failed to save study');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-studies'] });
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      alert('Sovereign Research Study successfully updated/created!');
      setIsCreating(false);
      setFormData({
        slug: '',
        titleEn: '', titleAr: '', titleZh: '', titleCkb: '',
        excerptEn: '', excerptAr: '', excerptZh: '', excerptCkb: '',
        contentEn: '', contentAr: '', contentZh: '', contentCkb: '',
        imageUrl: '',
        isPrivate: false
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/admin/studies/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-studies'] });
      queryClient.invalidateQueries({ queryKey: ['studies'] });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500 text-start">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-200 pb-8">
        <div>
          <h2 className="text-2xl font-bold font-black text-brand-900 tracking-tight">Sovereign Research Ledger</h2>
          <p className="text-sm text-neutral-500 font-medium mt-1">Manage trilingual academic dossiers, economic whitepapers, and strategic briefs.</p>
        </div>
        <button 
          onClick={() => setIsCreating(!isCreating)}
          className="bg-brand-800 hover:bg-brand-700 text-white font-black text-xs px-6 py-2.5 rounded-lg uppercase tracking-widest transition-all cursor-pointer shadow-lg flex items-center gap-2"
        >
          {isCreating ? <FileText size={14} /> : <Plus size={14} />}
          {isCreating ? 'View Registry' : 'New Research Study'}
        </button>
      </div>

      {isCreating ? (
        <form onSubmit={handleSubmit} className="space-y-8 bg-neutral-50 p-8 rounded-2xl border border-neutral-200 shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-neutral-500 uppercase tracking-widest">Asset Identity (Slug)</label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 text-neutral-400" size={14} />
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. 2026-iraq-china-trade-analysis"
                  className="w-full border border-neutral-200 bg-white py-2.5 pl-9 pr-4 text-xs font-bold rounded-lg focus:outline-none focus:border-brand-800 transition-all" 
                  value={formData.slug} 
                  onChange={e => setFormData({...formData, slug: e.target.value})} 
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-neutral-500 uppercase tracking-widest">Visibility Protocol</label>
              <div className="flex bg-neutral-200 p-1 rounded-lg">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, isPrivate: false})}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-black uppercase tracking-wider rounded-md transition-all cursor-pointer ${!formData.isPrivate ? 'bg-white text-brand-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
                >
                  <Unlock size={12} />
                  Public
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, isPrivate: true})}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-black uppercase tracking-wider rounded-md transition-all cursor-pointer ${formData.isPrivate ? 'bg-brand-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
                >
                  <Lock size={12} />
                  Tier 1 Private
                </button>
              </div>
            </div>
          </div>

          <div>
             <label className="block text-xs font-black text-neutral-500 uppercase tracking-widest mb-1.5">Cover Visualization URL</label>
             <input 
                type="url" 
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full border border-neutral-200 bg-white py-2.5 px-4 text-xs font-bold rounded-lg focus:outline-none focus:border-brand-800 transition-all" 
                value={formData.imageUrl} 
                onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
              />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* English & Arabic side by side */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-4">
                 <h4 className="text-xs font-black uppercase tracking-widest text-brand-800 border-b border-neutral-100 pb-2">English Manuscript</h4>
                 <input type="text" placeholder="Sovereign Title" required className="w-full border-b border-neutral-100 py-2 text-sm font-black focus:outline-none focus:border-brand-800" value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} />
                 <textarea placeholder="Executive Summary..." className="w-full border border-neutral-100 p-3 text-xs h-24 resize-none italic focus:outline-none focus:border-brand-800" value={formData.excerptEn} onChange={e => setFormData({...formData, excerptEn: e.target.value})} />
                 <textarea placeholder="Full Information Content..." className="w-full border border-neutral-100 p-3 text-xs h-64 focus:outline-none focus:border-brand-800" value={formData.contentEn} onChange={e => setFormData({...formData, contentEn: e.target.value})} />
              </div>
              <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-4" dir="rtl">
                 <h4 className="text-xs font-black uppercase tracking-widest text-brand-800 border-b border-neutral-100 pb-2 text-start">المخطوطة العربية</h4>
                 <input type="text" placeholder="العنوان الرسمي" required className="w-full border-b border-neutral-100 py-2 text-sm font-black focus:outline-none focus:border-brand-800 text-start" value={formData.titleAr} onChange={e => setFormData({...formData, titleAr: e.target.value})} />
                 <textarea placeholder="ملخص تنفيذي..." className="w-full border border-neutral-100 p-3 text-xs h-24 resize-none italic focus:outline-none focus:border-brand-800 text-start" value={formData.excerptAr} onChange={e => setFormData({...formData, excerptAr: e.target.value})} />
                 <textarea placeholder="المحتوى المعلوماتي الكامل..." className="w-full border border-neutral-100 p-3 text-xs h-64 focus:outline-none focus:border-brand-800 text-start" value={formData.contentAr} onChange={e => setFormData({...formData, contentAr: e.target.value})} />
              </div>
            </div>

            {/* Chinese & Kurdish side by side */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-4">
                 <h4 className="text-xs font-black uppercase tracking-widest text-brand-800 border-b border-neutral-100 pb-2">中文稿件</h4>
                 <input type="text" placeholder="正式标题" required className="w-full border-b border-neutral-100 py-2 text-sm font-black focus:outline-none focus:border-brand-800" value={formData.titleZh} onChange={e => setFormData({...formData, titleZh: e.target.value})} />
                 <textarea placeholder="执行摘要..." className="w-full border border-neutral-100 p-3 text-xs h-24 resize-none italic focus:outline-none focus:border-brand-800" value={formData.excerptZh} onChange={e => setFormData({...formData, excerptZh: e.target.value})} />
                 <textarea placeholder="完整的智能内容..." className="w-full border border-neutral-100 p-3 text-xs h-64 focus:outline-none focus:border-brand-800" value={formData.contentZh} onChange={e => setFormData({...formData, contentZh: e.target.value})} />
              </div>
              <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-4" dir="rtl">
                 <h4 className="text-xs font-black uppercase tracking-widest text-brand-800 border-b border-neutral-100 pb-2 text-start">دەستنووسی کوردی</h4>
                 <input type="text" placeholder="ناونیشانی فەرمی" required className="w-full border-b border-neutral-100 py-2 text-sm font-black focus:outline-none focus:border-brand-800 text-start" value={formData.titleCkb} onChange={e => setFormData({...formData, titleCkb: e.target.value})} />
                 <textarea placeholder="کورتەی جێبەجێکردن..." className="w-full border border-neutral-100 p-3 text-xs h-24 resize-none italic focus:outline-none focus:border-brand-800 text-start" value={formData.excerptCkb} onChange={e => setFormData({...formData, excerptCkb: e.target.value})} />
                 <textarea placeholder="تەواوی ناوەڕۆکەکە..." className="w-full border border-neutral-100 p-3 text-xs h-64 focus:outline-none focus:border-brand-800 text-start" value={formData.contentCkb} onChange={e => setFormData({...formData, contentCkb: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
             <button 
              type="button" 
              onClick={() => setIsCreating(false)}
              className="px-8 py-3 text-xs font-black uppercase tracking-widest text-neutral-500 hover:text-brand-900 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={mutation.isPending}
              className="bg-brand-800 hover:bg-brand-700 text-white font-black text-xs px-12 py-3 rounded-xl uppercase tracking-widest transition-all cursor-pointer shadow-xl flex items-center gap-2"
            >
              {mutation.isPending ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
              Authorize & Log Study
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies.map((study) => (
            <div key={study.id} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
              <div className="h-48 bg-neutral-100 relative">
                 <img 
                  src={study.imageUrl} 
                  alt={study.titleEn} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  referrerPolicy="no-referrer"
                />
                 <div className="absolute top-4 right-4">
                    {study.isPrivate ? (
                      <div className="bg-brand-800 text-white p-2 rounded-lg shadow-lg">
                        <Lock size={14} />
                      </div>
                    ) : (
                      <div className="bg-green-600 text-white p-2 rounded-lg shadow-lg">
                        <Unlock size={14} />
                      </div>
                    )}
                 </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-neutral-400 uppercase tracking-widest">
                    <Calendar size={12} />
                    {new Date(study.createdAt).toLocaleDateString()}
                  </div>
                  <h4 className="text-lg font-bold font-black text-brand-900 leading-tight line-clamp-2">{study.titleEn}</h4>
                  <p className="text-xs text-neutral-500 italic line-clamp-2 leading-relaxed">"{study.excerptEn}"</p>
                </div>
                <div className="pt-6 mt-6 border-t border-neutral-100 flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <Globe size={12} className="text-neutral-300" />
                    <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">4 Languages</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-neutral-300 hover:text-brand-900 transition-colors cursor-pointer">
                      <FileText size={16} />
                    </button>
                    <button 
                      onClick={() => { if(confirm('Purge study?')) deleteMutation.mutate(study.id) }}
                      className="p-2 text-neutral-300 hover:text-brand-800 transition-colors cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {studies.length === 0 && !isLoading && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-neutral-100 rounded-2xl">
               <BookOpen className="text-neutral-100 mx-auto mb-4" size={48} />
               <p className="text-xs font-black uppercase tracking-widest text-neutral-300">Registry Void</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
