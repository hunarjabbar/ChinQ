import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { Category } from '../../types';
import { 
  Save, 
  FileText, 
  Globe, 
  Image as ImageIcon, 
  Check, 
  Eye, 
  Loader2,
  Lock,
  Unlock,
  Sparkles
} from 'lucide-react';

export function AdminArticleEditor() {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED');

  const [formData, setFormData] = useState({
    slug: '',
    categoryId: '',
    imageUrl: '',
    enTitle: '', enExcerpt: '', enContent: '',
    arTitle: '', arExcerpt: '', arContent: '',
    zhTitle: '', zhExcerpt: '', zhContent: '',
    ckbTitle: '', ckbExcerpt: '', ckbContent: '',
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await apiFetch('/api/categories');
      return res.json();
    }
  });

  const mutation = useMutation({
    mutationFn: async (newArticle: any) => {
      const res = await apiFetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticle)
      });
      if (!res.ok) throw new Error('Failed to create article');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article'] });
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      alert('Article saved successfully');
      setFormData({
        slug: '',
        categoryId: '',
        imageUrl: '',
        enTitle: '', enExcerpt: '', enContent: '',
        arTitle: '', arExcerpt: '', arContent: '',
        zhTitle: '', zhExcerpt: '', zhContent: '',
        ckbTitle: '', ckbExcerpt: '', ckbContent: '',
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      slug: formData.slug,
      categoryId: formData.categoryId,
      imageUrl: formData.imageUrl,
      status,
      translations: [
        { lang: 'en', title: formData.enTitle, excerpt: formData.enExcerpt, content: formData.enContent },
        { lang: 'ar', title: formData.arTitle, excerpt: formData.arExcerpt, content: formData.arContent },
        { lang: 'zh', title: formData.zhTitle, excerpt: formData.zhExcerpt, content: formData.zhContent },
        { lang: 'ckb', title: formData.ckbTitle, excerpt: formData.ckbExcerpt, content: formData.ckbContent },
      ].filter(t => t.title && t.content)
    };

    mutation.mutate(payload);
  };

  const isRtl = (lang: string) => lang === 'ar' || lang === 'ckb';

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-start">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Configuration */}
        <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <SettingsIcon className="text-brand-800" size={18} />
            <h3 className="text-sm font-black uppercase tracking-widest text-ink-900">Publication Parameters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1.5">Asset Slug (URL Identity)</label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 text-neutral-400" size={14} />
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. basra-digital-economy-expansion"
                  className="w-full border border-neutral-200 bg-neutral-50 py-2.5 pl-9 pr-4 text-sm font-mono focus:outline-none focus:bg-white focus:border-brand-800 transition-all rounded-lg" 
                  value={formData.slug} 
                  onChange={e => setFormData({...formData, slug: e.target.value})} 
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1.5">Intel Classification</label>
              <select 
                required 
                className="w-full border border-neutral-200 bg-neutral-50 py-2.5 px-4 text-sm font-bold focus:outline-none focus:bg-white focus:border-brand-800 transition-all rounded-lg" 
                value={formData.categoryId} 
                onChange={e => setFormData({...formData, categoryId: e.target.value})}
              >
                <option value="">Select Category</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.nameEn}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1.5">Hero Visualization (Unsplash/Static URL)</label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-3 text-neutral-400" size={14} />
                <input 
                  type="url" 
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full border border-neutral-200 bg-neutral-50 py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:bg-white focus:border-brand-800 transition-all rounded-lg" 
                  value={formData.imageUrl} 
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1.5">Publication Status</label>
              <div className="flex bg-neutral-100 p-1 rounded-lg">
                <button 
                  type="button"
                  onClick={() => setStatus('PUBLISHED')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-md transition-all cursor-pointer ${status === 'PUBLISHED' ? 'bg-brand-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
                >
                  <Unlock size={12} />
                  Published
                </button>
                <button 
                  type="button"
                  onClick={() => setStatus('DRAFT')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-md transition-all cursor-pointer ${status === 'DRAFT' ? 'bg-amber-600 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
                >
                  <Lock size={12} />
                  Draft
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Translation Tabs */}
        <div className="space-y-12">
          {[
            { id: 'en', label: 'English Intel', title: 'enTitle', excerpt: 'enExcerpt', content: 'enContent' },
            { id: 'ar', label: 'النسخة العربية', title: 'arTitle', excerpt: 'arExcerpt', content: 'arContent' },
            { id: 'zh', label: '中文稿件', title: 'zhTitle', excerpt: 'zhExcerpt', content: 'zhContent' },
            { id: 'ckb', label: 'دەقی کوردی', title: 'ckbTitle', excerpt: 'ckbExcerpt', content: 'ckbContent' },
          ].map((lang) => (
            <div key={lang.id} className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm" dir={isRtl(lang.id) ? 'rtl' : 'ltr'}>
              <div className="bg-neutral-50 border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="bg-brand-800 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">{lang.id}</span>
                  <h4 className="text-xs font-black uppercase tracking-widest text-ink-900">{lang.label}</h4>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
                    {formData[lang.content as keyof typeof formData].length} Chars
                   </span>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1.5">Sovereign Headline</label>
                  <input 
                    type="text" 
                    placeholder={isRtl(lang.id) ? 'أدخل العنوان هنا...' : 'Enter authoritative headline...'}
                    required={lang.id === 'en'}
                    className="w-full border border-neutral-200 bg-white py-3 px-4 text-lg font-serif font-black focus:outline-none focus:border-brand-800 transition-all rounded-lg" 
                    value={formData[lang.title as keyof typeof formData]} 
                    onChange={e => setFormData({...formData, [lang.title]: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1.5">Executive Summary (Excerpt)</label>
                  <textarea 
                    placeholder={isRtl(lang.id) ? 'ملخص تنفيذي قصير...' : 'Concise executive summary for global feeds...'}
                    required={lang.id === 'en'}
                    className="w-full border border-neutral-200 bg-white py-3 px-4 text-sm italic text-neutral-600 focus:outline-none focus:border-brand-800 transition-all rounded-lg h-24 resize-none leading-relaxed" 
                    value={formData[lang.excerpt as keyof typeof formData]} 
                    onChange={e => setFormData({...formData, [lang.excerpt]: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1.5">Full Intel Dispatch (Content)</label>
                  <textarea 
                    placeholder={isRtl(lang.id) ? 'نص المقال الكامل والمفصل...' : 'Full detailed dispatch including project metrics and analysis...'}
                    required={lang.id === 'en'}
                    className="w-full border border-neutral-200 bg-white py-4 px-6 text-sm text-neutral-800 focus:outline-none focus:border-brand-800 transition-all rounded-xl h-96 leading-loose" 
                    value={formData[lang.content as keyof typeof formData]} 
                    onChange={e => setFormData({...formData, [lang.content]: e.target.value})} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="sticky bottom-6 z-30">
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl shadow-2xl flex items-center justify-between">
            <div className="flex items-center gap-6 px-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Editor Status: Active</span>
              </div>
              <button 
                type="button"
                className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Eye size={14} />
                Preview Dispatch
              </button>
            </div>
            
            <button 
              type="submit" 
              disabled={mutation.isPending}
              className="bg-brand-800 hover:bg-brand-700 text-white font-black py-3 px-10 rounded-lg uppercase tracking-widest transition-all disabled:opacity-50 cursor-pointer shadow-lg flex items-center gap-2"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Broadcasting...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Authorize & Publish Dispatch
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function SettingsIcon({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}
