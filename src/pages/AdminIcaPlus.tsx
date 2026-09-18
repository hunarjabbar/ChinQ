import { apiFetch } from "../lib/api";
import { useAuthStore } from '../store/useAuthStore';
import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Mic, Video as VideoIcon, Film, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';

type ContentType = 'podcasts' | 'videos' | 'documentaries';

export default function AdminIcaPlus() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<ContentType>('podcasts');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  
  const [formData, setFormData] = useState<any>({
    titleEn: '', titleAr: '', titleZh: '', titleCkb: '',
    descriptionEn: '', descriptionAr: '', descriptionZh: '', descriptionCkb: '',
    audioUrl: '', videoUrl: '', coverUrl: '',
    category: '', region: '', guestName: '', director: '', duration: '',
    synopsisEn: '', synopsisAr: '', synopsisZh: '', synopsisCkb: '',
    isFeatured: false, isTrending: false
  });
  
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = useAuthStore.getState().token;
    setToken(t);
    fetchItems(activeTab);
  }, [activeTab]);

  const fetchItems = async (type: ContentType) => {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/${type}`);
      if (res.ok) setItems(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await apiFetch(`/api/${activeTab}/${id}`, { method: 'DELETE' });
      fetchItems(activeTab);
      queryClient.invalidateQueries({ queryKey: [activeTab] });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingItem ? `/api/${activeTab}/${editingItem.id}` : `/api/${activeTab}`;
      const method = editingItem ? 'PUT' : 'POST';
      await apiFetch(url, {
        method,
        body: JSON.stringify(formData)
      });
      setIsEditing(false);
      setEditingItem(null);
      fetchItems(activeTab);
      queryClient.invalidateQueries({ queryKey: [activeTab] });
    } catch (e) {
      console.error(e);
      alert('Error saving item');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-neutral-900">ICA+ Media Management</h1>
        <button onClick={() => { setEditingItem(null); setFormData({}); setIsEditing(true); }} className="bg-brand-800 text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus size={18} /> New {activeTab.slice(0, -1)}
        </button>
      </div>

      <div className="flex space-x-4 border-b border-neutral-200">
        {(['podcasts', 'videos', 'documentaries'] as ContentType[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-2 capitalize ${activeTab === tab ? 'border-b-2 border-brand-800 text-brand-800 font-bold' : 'text-neutral-500'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="bg-white rounded-lg shadow border border-neutral-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500 border-b">
              <tr>
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Featured</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b last:border-0 hover:bg-neutral-50">
                  <td className="p-4 font-medium">{item.titleEn}</td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4">{item.isFeatured ? <CheckCircle size={16} className="text-emerald-500" /> : <XCircle size={16} className="text-neutral-400" />}</td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => handleEdit(item)} className="p-1 text-neutral-400 hover:text-brand-800"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-1 text-neutral-400 hover:text-red-600"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-neutral-500">No items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl my-8">
            <h2 className="text-xl font-bold mb-4">{editingItem ? 'Edit' : 'New'} {activeTab.slice(0, -1)}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium">
                  Title (EN)
                  <input required type="text" value={formData.titleEn || ''} onChange={e => setFormData({...formData, titleEn: e.target.value})} className="mt-1 w-full p-2 border rounded" />
                </label>
                <label className="block text-sm font-medium">
                  Title (AR)
                  <input type="text" value={formData.titleAr || ''} onChange={e => setFormData({...formData, titleAr: e.target.value})} className="mt-1 w-full p-2 border rounded" />
                </label>
                <label className="block text-sm font-medium">
                  Title (ZH)
                  <input type="text" value={formData.titleZh || ''} onChange={e => setFormData({...formData, titleZh: e.target.value})} className="mt-1 w-full p-2 border rounded" />
                </label>
                <label className="block text-sm font-medium">
                  Title (CKB)
                  <input type="text" value={formData.titleCkb || ''} onChange={e => setFormData({...formData, titleCkb: e.target.value})} className="mt-1 w-full p-2 border rounded" />
                </label>
              </div>

              {activeTab === 'podcasts' ? (
                <label className="block text-sm font-medium">
                  Audio URL
                  <input type="text" value={formData.audioUrl || ''} onChange={e => setFormData({...formData, audioUrl: e.target.value})} className="mt-1 w-full p-2 border rounded" />
                </label>
              ) : (
                <label className="block text-sm font-medium">
                  Video URL
                  <input type="text" value={formData.videoUrl || ''} onChange={e => setFormData({...formData, videoUrl: e.target.value})} className="mt-1 w-full p-2 border rounded" />
                </label>
              )}
              
              <label className="block text-sm font-medium">
                Cover Image URL
                <input type="text" value={formData.coverUrl || ''} onChange={e => setFormData({...formData, coverUrl: e.target.value})} className="mt-1 w-full p-2 border rounded" />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium">
                  Category
                  <input type="text" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} className="mt-1 w-full p-2 border rounded" />
                </label>
                <label className="block text-sm font-medium">
                  Region
                  <input type="text" value={formData.region || ''} onChange={e => setFormData({...formData, region: e.target.value})} className="mt-1 w-full p-2 border rounded" />
                </label>
                <label className="block text-sm font-medium">
                  Duration (e.g. 15:00)
                  <input type="text" value={formData.duration || ''} onChange={e => setFormData({...formData, duration: e.target.value})} className="mt-1 w-full p-2 border rounded" />
                </label>
                
                {activeTab === 'documentaries' && (
                  <label className="block text-sm font-medium">
                    Director
                    <input type="text" value={formData.director || ''} onChange={e => setFormData({...formData, director: e.target.value})} className="mt-1 w-full p-2 border rounded" />
                  </label>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t">
                <p className="font-bold">Descriptions</p>
                <textarea placeholder="Desc EN" value={formData.descriptionEn || ''} onChange={e => setFormData({...formData, descriptionEn: e.target.value})} className="w-full p-2 border rounded" />
                <textarea placeholder="Desc AR" value={formData.descriptionAr || ''} onChange={e => setFormData({...formData, descriptionAr: e.target.value})} className="w-full p-2 border rounded" />
                <textarea placeholder="Desc ZH" value={formData.descriptionZh || ''} onChange={e => setFormData({...formData, descriptionZh: e.target.value})} className="w-full p-2 border rounded" />
                <textarea placeholder="Desc CKB" value={formData.descriptionCkb || ''} onChange={e => setFormData({...formData, descriptionCkb: e.target.value})} className="w-full p-2 border rounded" />
              </div>

              {activeTab === 'documentaries' && (
                <div className="space-y-4 pt-4 border-t">
                  <p className="font-bold">Synopsis</p>
                  <textarea placeholder="Synopsis EN" value={formData.synopsisEn || ''} onChange={e => setFormData({...formData, synopsisEn: e.target.value})} className="w-full p-2 border rounded" />
                  <textarea placeholder="Synopsis AR" value={formData.synopsisAr || ''} onChange={e => setFormData({...formData, synopsisAr: e.target.value})} className="w-full p-2 border rounded" />
                  <textarea placeholder="Synopsis ZH" value={formData.synopsisZh || ''} onChange={e => setFormData({...formData, synopsisZh: e.target.value})} className="w-full p-2 border rounded" />
                  <textarea placeholder="Synopsis CKB" value={formData.synopsisCkb || ''} onChange={e => setFormData({...formData, synopsisCkb: e.target.value})} className="w-full p-2 border rounded" />
                </div>
              )}

              <div className="flex gap-4 border-t pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isFeatured || false} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} />
                  Featured (ICA+ Exclusive)
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isTrending || false} onChange={e => setFormData({...formData, isTrending: e.target.checked})} />
                  Trending
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border rounded hover:bg-neutral-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-800 text-white rounded hover:bg-brand-900">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
