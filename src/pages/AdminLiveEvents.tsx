import { useAuthStore } from '../store/useAuthStore';
import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Radio, Video, MapPin, Tag } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';

export default function AdminLiveEvents() {
  const queryClient = useQueryClient();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = useAuthStore.getState().token;
    setToken(t);
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
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
      const url = formData.id ? `/api/events/${formData.id}` : '/api/events';
      
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
        fetchEvents();
        queryClient.invalidateQueries({ queryKey: ['events'] });
      } else {
        alert('Failed to save event');
      }
    } catch (e) {
      console.error(e);
      alert('Error saving event');
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !window.confirm('Are you sure you want to delete this live event?')) return;
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchEvents();
        queryClient.invalidateQueries({ queryKey: ['events'] });
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AdminLayout>
      <div className="w-full space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold font-semibold text-neutral-900 flex items-center">
              <Video className="h-6 w-6 mr-2 text-brand-800" />
              Live Streams & Broadcasts
            </h2>
            <p className="text-sm text-gray-500 mt-1">Manage video streams, breaking news banners, and live event definitions.</p>
          </div>
          <button
            onClick={() => {
              setFormData({ isActive: true });
              setIsEditing(true);
            }}
            className="bg-brand-800 text-white px-4 py-2 rounded-lg hover:bg-brand-800 flex items-center text-sm font-bold tracking-wider uppercase"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Broadcast
          </button>
        </div>

        {isEditing ? (
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm text-left">
            <h3 className="text-lg font-medium mb-4">{formData.id ? 'Edit Broadcast' : 'New Broadcast'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                    <input 
                      type="checkbox" 
                      checked={formData.isActive || false} 
                      onChange={e => setFormData({...formData, isActive: e.target.checked})}
                      className="w-4 h-4 text-brand-600 focus:ring-brand-500 rounded border-gray-300"
                    />
                    <span className="font-bold text-sm text-gray-700 uppercase tracking-wider">Stream is currently LIVE</span>
                  </label>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title (EN)</label>
                  <input required type="text" value={formData.titleEn || ''} onChange={e => setFormData({...formData, titleEn: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Video URL (Embed/HLS)</label>
                  <input type="text" value={formData.videoUrl || ''} onChange={e => setFormData({...formData, videoUrl: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none" placeholder="e.g., https://www.youtube.com/embed/... " />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                  <select required value={formData.category || 'NEWS'} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none">
                    <option value="NEWS">News</option>
                    <option value="BREAKING">Breaking News</option>
                    <option value="TRENDING">Trending</option>
                    <option value="BROADCAST">Broadcast</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Region</label>
                  <select required value={formData.region || 'BILATERAL'} onChange={e => setFormData({...formData, region: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none">
                    <option value="CHINA">China</option>
                    <option value="IRAQ">Iraq</option>
                    <option value="KURDISTAN">Kurdistan</option>
                    <option value="BILATERAL">Bilateral</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Summary (EN)</label>
                  <textarea value={formData.summaryEn || ''} onChange={e => setFormData({...formData, summaryEn: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none" rows={2} />
                </div>
              </div>
              
              {/* Optional translations could be added here similar to other forms */}
              
              <div className="flex justify-end space-x-2 pt-4 mt-6 border-t border-gray-200">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-neutral-600 font-bold uppercase tracking-wider text-xs hover:bg-neutral-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-brand-800 font-bold uppercase tracking-wider text-xs text-white rounded-lg hover:bg-brand-800 shadow-sm">Save Broadcast</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden text-left">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Broadcast Title</th>
                  <th className="px-6 py-4 font-bold">Details</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {events.map(ev => (
                  <tr key={ev.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {ev.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-brand-100 text-brand-700 border border-brand-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
                          LIVE
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-gray-100 text-gray-600 border border-gray-200">
                          Archived
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-neutral-900">{ev.titleEn}</div>
                      <div className="text-xs text-neutral-500 mt-0.5 truncate max-w-xs">{ev.summaryEn}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs font-bold uppercase tracking-wider text-gray-500">
                        <span className="flex items-center gap-1"><Tag size={12}/> {ev.category}</span>
                        <span className="flex items-center gap-1"><MapPin size={12}/> {ev.region}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => { setFormData(ev); setIsEditing(true); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(ev.id)} className="p-1.5 text-brand-600 hover:bg-brand-50 rounded">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {events.length === 0 && (
                  <tr><td colSpan={4} className="p-8 text-center text-neutral-500">No broadcasts found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
