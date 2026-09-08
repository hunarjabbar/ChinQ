import { useAuthStore } from '../store/useAuthStore';
import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Mic, Clock, MapPin } from 'lucide-react';

export default function AdminPodcasts() {
  const queryClient = useQueryClient();
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = useAuthStore.getState().token;
    setToken(t);
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    try {
      const res = await fetch('/api/podcasts');
      if (res.ok) {
        const data = await res.json();
        setPodcasts(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const method = formData.id ? 'PUT' : 'POST';
      const url = formData.id ? `/api/podcasts/${formData.id}` : '/api/podcasts';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setIsEditing(false);
        setFormData({});
        fetchPodcasts();
        queryClient.invalidateQueries({ queryKey: ['podcasts'] });
      } else {
        alert('Failed to save podcast');
      }
    } catch (e) {
      console.error(e);
      alert('Error saving podcast');
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !window.confirm('Are you sure you want to delete this podcast?')) return;
    try {
      const res = await fetch(`/api/podcasts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchPodcasts();
        queryClient.invalidateQueries({ queryKey: ['podcasts'] });
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-semibold text-neutral-900 flex items-center">
          <Mic className="h-6 w-6 mr-2" />
          Podcast Management
        </h2>
        <button
          onClick={() => {
            setFormData({});
            setIsEditing(true);
          }}
          className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Podcast
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-xl border border-neutral-200">
          <h3 className="text-lg font-medium mb-4">{formData.id ? 'Edit Podcast' : 'New Podcast'}</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title (EN)</label>
                <input required type="text" value={formData.titleEn || ''} onChange={e => setFormData({...formData, titleEn: e.target.value})} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Audio URL</label>
                <input required type="text" value={formData.audioUrl || ''} onChange={e => setFormData({...formData, audioUrl: e.target.value})} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cover Image URL</label>
                <input required type="text" value={formData.coverUrl || ''} onChange={e => setFormData({...formData, coverUrl: e.target.value})} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select required value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 border rounded">
                  <option value="">Select Category</option>
                  <option value="GEOPOLITICS">Geopolitics</option>
                  <option value="ECONOMY">Economy</option>
                  <option value="CULTURE">Culture</option>
                  <option value="ACHIEVEMENTS">Achievements</option>
                  <option value="FIGURE_PROMOTION">Figure Promotion</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Region</label>
                <select required value={formData.region || ''} onChange={e => setFormData({...formData, region: e.target.value})} className="w-full p-2 border rounded">
                  <option value="">Select Region</option>
                  <option value="CHINA">China</option>
                  <option value="IRAQ">Iraq</option>
                  <option value="KURDISTAN">Kurdistan</option>
                  <option value="BILATERAL">Bilateral</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Guest Name</label>
                <input type="text" value={formData.guestName || ''} onChange={e => setFormData({...formData, guestName: e.target.value})} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration (e.g. 45:30)</label>
                <input type="text" value={formData.duration || ''} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full p-2 border rounded" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description (EN)</label>
                <textarea required value={formData.descriptionEn || ''} onChange={e => setFormData({...formData, descriptionEn: e.target.value})} className="w-full p-2 border rounded" rows={3} />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">Save Podcast</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr>
                <th className="p-4 font-medium">Podcast</th>
                <th className="p-4 font-medium">Category / Region</th>
                <th className="p-4 font-medium">Guest</th>
                <th className="p-4 font-medium">Duration</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {podcasts.map(p => (
                <tr key={p.id} className="hover:bg-neutral-50">
                  <td className="p-4">
                    <div className="font-medium text-neutral-900">{p.titleEn}</div>
                    <div className="text-xs text-neutral-500 max-w-xs truncate">{p.descriptionEn}</div>
                  </td>
                  <td className="p-4">
                    <div className="inline-block px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded mb-1 mr-1">{p.category}</div>
                    <div className="inline-block px-2 py-1 bg-brand-50 text-brand-700 text-xs rounded">{p.region}</div>
                  </td>
                  <td className="p-4 text-neutral-600">{p.guestName || '-'}</td>
                  <td className="p-4 text-neutral-600">{p.duration}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => { setFormData(p); setIsEditing(true); }} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-1 text-brand-600 hover:bg-brand-50 rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {podcasts.length === 0 && (
                <tr><td colSpan={5} className="p-4 text-center text-neutral-500">No podcasts found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
