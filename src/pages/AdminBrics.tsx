
import { AdminLayout } from '../components/AdminLayout';
import { useAuthStore } from '../store/useAuthStore';
import { apiFetch } from '../lib/api';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BricsTopic } from '../types';
import { 
  Globe2, Plus, Search, Edit3, Trash2, 
  CheckCircle2, X, Image as ImageIcon, Save, AlertCircle 
} from 'lucide-react';

export function AdminBrics() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<BricsTopic | null>(null);

  const [formData, setFormData] = useState({
    slug: '',
    titleEn: '',
    titleAr: '',
    titleZh: '',
    titleCkb: '',
    summaryEn: '',
    summaryAr: '',
    summaryZh: '',
    summaryCkb: '',
    contentEn: '',
    contentAr: '',
    contentZh: '',
    contentCkb: '',
    imageUrl: '',
    category: 'GEOPOLITICS',
    isFeatured: true,
    order: 0
  });

  const { data: topics = [], isLoading } = useQuery<BricsTopic[]>({
    queryKey: ['admin-brics-topics'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/brics-topics');
      if (!res.ok) throw new Error('Failed to fetch topics');
      return res.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiFetch('/api/admin/brics-topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to create topic');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-brics-topics'] });
      queryClient.invalidateQueries({ queryKey: ['brics-topics'] });
      setIsModalOpen(false);
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await apiFetch(`/api/admin/brics-topics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to update topic');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-brics-topics'] });
      queryClient.invalidateQueries({ queryKey: ['brics-topics'] });
      setIsModalOpen(false);
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/admin/brics-topics/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete topic');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-brics-topics'] });
      queryClient.invalidateQueries({ queryKey: ['brics-topics'] });
    }
  });

  const resetForm = () => {
    setEditingTopic(null);
    setFormData({
      slug: '',
      titleEn: '',
      titleAr: '',
      titleZh: '',
      titleCkb: '',
      summaryEn: '',
      summaryAr: '',
      summaryZh: '',
      summaryCkb: '',
      contentEn: '',
      contentAr: '',
      contentZh: '',
      contentCkb: '',
      imageUrl: '',
      category: 'GEOPOLITICS',
      isFeatured: true,
      order: 0
    });
  };

  const handleEdit = (topic: BricsTopic) => {
    setEditingTopic(topic);
    setFormData({
      slug: topic.slug || '',
      titleEn: topic.titleEn || '',
      titleAr: topic.titleAr || '',
      titleZh: topic.titleZh || '',
      titleCkb: topic.titleCkb || '',
      summaryEn: topic.summaryEn || '',
      summaryAr: topic.summaryAr || '',
      summaryZh: topic.summaryZh || '',
      summaryCkb: topic.summaryCkb || '',
      contentEn: topic.contentEn || '',
      contentAr: topic.contentAr || '',
      contentZh: topic.contentZh || '',
      contentCkb: topic.contentCkb || '',
      imageUrl: topic.imageUrl || '',
      category: topic.category || 'GEOPOLITICS',
      isFeatured: topic.isFeatured ?? true,
      order: topic.order || 0
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTopic) {
      updateMutation.mutate({ id: editingTopic.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredTopics = topics.filter(t => 
    t.titleEn.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6 text-start">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-serif font-black text-ink-900 uppercase tracking-widest flex items-center gap-3">
              <Globe2 className="w-6 h-6 text-brand-800" />
              BRICS+ Observatory Management
            </h1>
            <p className="text-xs text-gray-500 font-mono mt-2 uppercase tracking-wider">
              Control the narrative and geopolitical analysis for BRICS+ Iraq integration.
            </p>
          </div>
          <button
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="inline-flex items-center gap-2 bg-brand-800 text-white px-5 py-2.5 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-brand-900 transition-all shadow-md active:scale-95"
          >
            <Plus size={16} /> New BRICS Topic
          </button>
        </div>

        <div className="bg-white border-2 border-brand-800 rounded-xs shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-paper-50 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search topics by title or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xs text-sm focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 font-mono"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead className="bg-neutral-50 text-xs uppercase tracking-wider text-neutral-500 font-mono">
                <tr>
                  <th className="px-6 py-4 font-bold border-b border-neutral-200">Topic</th>
                  <th className="px-6 py-4 font-bold border-b border-neutral-200">Category</th>
                  <th className="px-6 py-4 font-bold border-b border-neutral-200">Status</th>
                  <th className="px-6 py-4 font-bold border-b border-neutral-200">Order</th>
                  <th className="px-6 py-4 font-bold border-b border-neutral-200 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-mono text-xs italic">
                      Synchronizing with global BRICS ledger...
                    </td>
                  </tr>
                ) : filteredTopics.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-mono text-xs">
                      No topics found in observatory.
                    </td>
                  </tr>
                ) : (
                  filteredTopics.map((topic) => (
                    <tr key={topic.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={topic.imageUrl || ''} 
                            alt="" 
                            className="w-10 h-10 object-cover rounded border border-gray-100" 
                          />
                          <div>
                            <div className="font-bold text-ink-900 leading-tight">{topic.titleEn}</div>
                            <div className="text-[10px] text-gray-400 font-mono mt-0.5">{topic.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-brand-50 text-brand-800 border border-brand-200 text-[10px] font-black uppercase tracking-widest rounded-sm font-mono">
                          {topic.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {topic.isFeatured ? (
                          <span className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                            <CheckCircle2 size={12} /> Featured
                          </span>
                        ) : (
                          <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Draft</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-gray-500">
                        {topic.order}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(topic)}
                            className="p-2 text-gray-400 hover:text-brand-800 hover:bg-white rounded border border-transparent hover:border-gray-200 transition-all"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button 
                            onClick={() => { if(window.confirm('Delete topic?')) deleteMutation.mutate(topic.id); }}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-white rounded border border-transparent hover:border-gray-200 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm">
          <div className="bg-white border-2 border-brand-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xs shadow-2xl animate-in fade-in zoom-in duration-200 text-start">
            <div className="sticky top-0 bg-paper-50 p-6 border-b border-gray-100 flex justify-between items-center z-10">
              <div>
                <h2 className="text-xl font-serif font-black text-ink-900 uppercase tracking-widest flex items-center gap-3">
                  {editingTopic ? 'Edit BRICS Topic' : 'New BRICS Topic'}
                </h2>
                <p className="text-[10px] text-gray-500 font-mono mt-1 uppercase tracking-widest">Observe. Analyze. Publish.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Slug (Unique ID)</label>
                  <input
                    required
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    placeholder="e.g. iraq-brics-integration"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xs text-sm focus:outline-none focus:border-brand-800 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xs text-sm focus:outline-none focus:border-brand-800 font-mono bg-white"
                  >
                    <option value="GEOPOLITICS">Geopolitics</option>
                    <option value="ECONOMY">Economy</option>
                    <option value="FINANCE">Finance</option>
                    <option value="INFRASTRUCTURE">Infrastructure</option>
                    <option value="ENERGY">Energy</option>
                  </select>
                </div>
              </div>

              {/* Titles */}
              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-800 border-b border-brand-800/20 pb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-800" /> Trilingual Titles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">English Title</label>
                    <input
                      required
                      type="text"
                      value={formData.titleEn}
                      onChange={(e) => setFormData({...formData, titleEn: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xs text-sm focus:outline-none focus:border-brand-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 text-right w-full block">العنوان بالعربية</label>
                    <input
                      required
                      dir="rtl"
                      type="text"
                      value={formData.titleAr}
                      onChange={(e) => setFormData({...formData, titleAr: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xs text-sm focus:outline-none focus:border-brand-800 font-serif"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">中文标题</label>
                    <input
                      required
                      type="text"
                      value={formData.titleZh}
                      onChange={(e) => setFormData({...formData, titleZh: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xs text-sm focus:outline-none focus:border-brand-800 font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 text-right w-full block">ناونیشان بە کوردی</label>
                    <input
                      required
                      dir="rtl"
                      type="text"
                      value={formData.titleCkb}
                      onChange={(e) => setFormData({...formData, titleCkb: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xs text-sm focus:outline-none focus:border-brand-800 font-serif"
                    />
                  </div>
                </div>
              </div>

              {/* Summary Fields (Trilingual) - Simplified for briefness in this UI */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Brief Summaries & Detailed Content</label>
                <div className="grid grid-cols-1 gap-6">
                   <textarea 
                     placeholder="English Summary"
                     value={formData.summaryEn}
                     onChange={(e) => setFormData({...formData, summaryEn: e.target.value})}
                     className="w-full px-4 py-3 border border-gray-200 rounded-xs text-sm min-h-[80px]"
                   />
                   <textarea 
                     placeholder="English Full Content"
                     value={formData.contentEn}
                     onChange={(e) => setFormData({...formData, contentEn: e.target.value})}
                     className="w-full px-4 py-3 border border-gray-200 rounded-xs text-sm min-h-[150px]"
                   />
                   <div className="grid grid-cols-2 gap-4">
                      <textarea 
                        dir="rtl"
                        placeholder="الملخص بالعربية"
                        value={formData.summaryAr}
                        onChange={(e) => setFormData({...formData, summaryAr: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xs text-sm min-h-[80px] font-serif"
                      />
                      <textarea 
                        dir="rtl"
                        placeholder="ناونیشان بە کوردی"
                        value={formData.summaryCkb}
                        onChange={(e) => setFormData({...formData, summaryCkb: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xs text-sm min-h-[80px] font-serif"
                      />
                   </div>
                   <textarea 
                     placeholder="中文摘要"
                     value={formData.summaryZh}
                     onChange={(e) => setFormData({...formData, summaryZh: e.target.value})}
                     className="w-full px-4 py-3 border border-gray-200 rounded-xs text-sm min-h-[80px]"
                   />
                </div>
              </div>

              {/* Visuals & Order */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Cover Image URL</label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xs text-sm focus:outline-none focus:border-brand-800 font-mono"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xs text-sm focus:outline-none focus:border-brand-800 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 p-4 bg-paper-50 border border-gray-100 rounded-sm">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                    className="w-5 h-5 rounded border-gray-300 text-brand-800 focus:ring-brand-800"
                  />
                  <span className="text-xs font-black uppercase tracking-widest text-ink-900">Featured in Observatory</span>
                </label>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-gray-200 text-gray-500 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="inline-flex items-center gap-2 bg-brand-800 text-white px-8 py-2.5 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-brand-900 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                  {createMutation.isPending || updateMutation.isPending ? 'Synchronizing...' : (
                    <>
                      <Save size={16} /> {editingTopic ? 'Update Records' : 'Publish Topic'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
