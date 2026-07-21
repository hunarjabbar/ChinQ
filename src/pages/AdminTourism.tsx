import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TourismSpot } from '../types';
import { 
  Compass, MapPin, Plus, Edit2, Trash2, Search, Filter, 
  Sparkles, Star, ShieldCheck, Plane, CheckCircle2, RefreshCw, X, AlertCircle
} from 'lucide-react';

export function AdminTourism() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('chinq_token');

  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSpot, setEditingSpot] = useState<TourismSpot | null>(null);

  const [formData, setFormData] = useState({
    titleEn: '', titleAr: '', titleZh: '', titleCkb: '',
    city: 'Erbil', region: 'KURDISTAN', category: 'UNESCO_HERITAGE',
    descriptionEn: '', descriptionAr: '', descriptionZh: '', descriptionCkb: '',
    imageUrl: '', bestTimeToVisit: 'Spring & Autumn',
    visaPolicy: '30-Day Visa on Arrival / E-Visa available',
    flightInfo: 'Direct and transfer flights connecting China, Baghdad, and Erbil',
    rating: 4.9, estimatedCost: '$800 - $1,500',
    isFeatured: true, isTrending: true
  });

  // Query spots
  const { data: spots = [], isLoading } = useQuery<TourismSpot[]>({
    queryKey: ['admin-tourism-spots'],
    queryFn: async () => {
      const res = await fetch('/api/tourism');
      if (!res.ok) throw new Error('Failed to fetch tourism spots');
      return res.json();
    }
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch('/api/tourism', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create tourism spot');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tourism-spots'] });
      queryClient.invalidateQueries({ queryKey: ['tourism-spots-home'] });
      queryClient.invalidateQueries({ queryKey: ['tourism-spots-all'] });
      closeForm();
    }
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<TourismSpot> }) => {
      const res = await fetch(`/api/tourism/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update tourism spot');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tourism-spots'] });
      queryClient.invalidateQueries({ queryKey: ['tourism-spots-home'] });
      queryClient.invalidateQueries({ queryKey: ['tourism-spots-all'] });
      closeForm();
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/tourism/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to delete spot');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tourism-spots'] });
      queryClient.invalidateQueries({ queryKey: ['tourism-spots-home'] });
      queryClient.invalidateQueries({ queryKey: ['tourism-spots-all'] });
    }
  });

  // Reseed mutation
  const reseedMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/tourism/seed', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to reseed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tourism-spots'] });
      queryClient.invalidateQueries({ queryKey: ['tourism-spots-home'] });
      queryClient.invalidateQueries({ queryKey: ['tourism-spots-all'] });
    }
  });

  const openFormForNew = () => {
    setEditingSpot(null);
    setFormData({
      titleEn: '', titleAr: '', titleZh: '', titleCkb: '',
      city: 'Erbil', region: 'KURDISTAN', category: 'UNESCO_HERITAGE',
      descriptionEn: '', descriptionAr: '', descriptionZh: '', descriptionCkb: '',
      imageUrl: 'https://images.unsplash.com/photo-1548625361-185341398c8c?auto=format&fit=crop&q=80&w=1000',
      bestTimeToVisit: 'Spring & Autumn',
      visaPolicy: '30-Day Visa on Arrival / E-Visa available',
      flightInfo: 'Direct and transfer flights connecting China, Baghdad, and Erbil',
      rating: 4.9, estimatedCost: '$800 - $1,500',
      isFeatured: true, isTrending: true
    });
    setIsFormOpen(true);
  };

  const openFormForEdit = (spot: TourismSpot) => {
    setEditingSpot(spot);
    setFormData({
      titleEn: spot.titleEn,
      titleAr: spot.titleAr || '',
      titleZh: spot.titleZh || '',
      titleCkb: spot.titleCkb || '',
      city: spot.city,
      region: spot.region,
      category: spot.category,
      descriptionEn: spot.descriptionEn,
      descriptionAr: spot.descriptionAr || '',
      descriptionZh: spot.descriptionZh || '',
      descriptionCkb: spot.descriptionCkb || '',
      imageUrl: spot.imageUrl,
      bestTimeToVisit: spot.bestTimeToVisit,
      visaPolicy: spot.visaPolicy,
      flightInfo: spot.flightInfo,
      rating: spot.rating,
      estimatedCost: spot.estimatedCost,
      isFeatured: spot.isFeatured,
      isTrending: spot.isTrending
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingSpot(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSpot) {
      updateMutation.mutate({ id: editingSpot.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredSpots = spots.filter(s => {
    const matchesSearch =
      !search ||
      s.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = selectedRegion === 'ALL' || s.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#990000] text-white text-[10px] font-mono font-bold uppercase rounded-xs mb-1">
            <Compass className="w-3 h-3" /> Bilateral Tourism Portal Admin
          </div>
          <h1 className="text-2xl font-serif font-black text-[#111111]">
            Manage Tourism Destinations & Heritage Sites
          </h1>
          <p className="text-xs text-gray-500 font-mono">
            Promote cultural heritage, UNESCO sites, visa policies & aviation routes across China, Iraq & Kurdistan Region.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => reseedMutation.mutate()}
            disabled={reseedMutation.isPending}
            className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-gray-800 text-xs font-mono font-bold uppercase rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-gray-300"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${reseedMutation.isPending ? 'animate-spin' : ''}`} />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={openFormForNew}
            className="px-4 py-2 bg-[#990000] hover:bg-red-800 text-white text-xs font-mono font-bold uppercase rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Destination</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-200 p-4 rounded-xs shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search destination title, city, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-xs text-xs font-mono focus:outline-none focus:border-[#990000]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {['ALL', 'CHINA', 'IRAQ', 'KURDISTAN'].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-xs transition-colors whitespace-nowrap cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-[#111111] text-white'
                    : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Destinations Table */}
      {isLoading ? (
        <div className="p-8 text-center text-xs font-mono text-gray-500 bg-white border border-gray-200 rounded-xs">
          Loading tourism destinations...
        </div>
      ) : filteredSpots.length === 0 ? (
        <div className="p-8 text-center text-xs font-mono text-gray-500 bg-white border border-dashed border-gray-300 rounded-xs">
          No tourism destinations found.
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xs shadow-xs overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-gray-200 text-[11px] font-mono font-black uppercase text-gray-600">
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Showcase Options</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-sans">
              {filteredSpots.map((spot) => (
                <tr key={spot.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={spot.imageUrl}
                        alt={spot.titleEn}
                        className="w-12 h-10 object-cover rounded-xs border border-gray-200 shrink-0"
                      />
                      <div>
                        <span className="font-serif font-bold text-gray-900 block leading-snug">
                          {spot.titleEn}
                        </span>
                        <span className="font-mono text-[10px] text-gray-500">
                          {spot.bestTimeToVisit}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs">
                    <span className="font-bold text-[#111111]">{spot.city}</span>
                    <span className="block text-[10px] text-[#990000]">{spot.region}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-gray-600 uppercase">
                    {spot.category.replace('_', ' ')}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs font-bold text-amber-700">
                    ⭐ {spot.rating}
                  </td>
                  <td className="py-3 px-4 font-mono text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateMutation.mutate({ id: spot.id, data: { isTrending: !spot.isTrending } })}
                        className={`px-2 py-1 font-bold rounded-xs cursor-pointer border ${
                          spot.isTrending
                            ? 'bg-[#990000] text-white border-[#990000]'
                            : 'bg-neutral-100 text-gray-500 border-gray-200'
                        }`}
                        title="Toggle Trending"
                      >
                        {spot.isTrending ? 'Trending ON' : 'Trending OFF'}
                      </button>

                      <button
                        onClick={() => updateMutation.mutate({ id: spot.id, data: { isFeatured: !spot.isFeatured } })}
                        className={`px-2 py-1 font-bold rounded-xs cursor-pointer border ${
                          spot.isFeatured
                            ? 'bg-amber-600 text-white border-amber-600'
                            : 'bg-neutral-100 text-gray-500 border-gray-200'
                        }`}
                        title="Toggle Featured"
                      >
                        {spot.isFeatured ? 'Featured ON' : 'Featured OFF'}
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openFormForEdit(spot)}
                        className="p-1.5 text-gray-600 hover:text-black hover:bg-neutral-200 rounded-xs cursor-pointer transition-colors"
                        title="Edit Destination"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete destination "${spot.titleEn}"?`)) {
                            deleteMutation.mutate(spot.id);
                          }
                        }}
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xs cursor-pointer transition-colors"
                        title="Delete Destination"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Destination Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white border-2 border-[#111111] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 rounded-xs shadow-2xl space-y-4 relative">
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-black p-1 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-serif font-black text-[#111111]">
              {editingSpot ? 'Edit Tourism Destination' : 'Add New Tourism Destination'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              {/* Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={formData.titleEn}
                    onChange={e => setFormData({ ...formData, titleEn: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xs focus:outline-none focus:border-[#990000]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Title (Arabic)</label>
                  <input
                    type="text"
                    value={formData.titleAr}
                    onChange={e => setFormData({ ...formData, titleAr: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xs focus:outline-none focus:border-[#990000]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Title (Chinese)</label>
                  <input
                    type="text"
                    value={formData.titleZh}
                    onChange={e => setFormData({ ...formData, titleZh: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xs focus:outline-none focus:border-[#990000]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Title (Kurdish Central)</label>
                  <input
                    type="text"
                    value={formData.titleCkb}
                    onChange={e => setFormData({ ...formData, titleCkb: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xs focus:outline-none focus:border-[#990000]"
                  />
                </div>
              </div>

              {/* Location & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xs focus:outline-none focus:border-[#990000]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Region *</label>
                  <select
                    value={formData.region}
                    onChange={e => setFormData({ ...formData, region: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xs focus:outline-none focus:border-[#990000]"
                  >
                    <option value="CHINA">CHINA</option>
                    <option value="IRAQ">IRAQ</option>
                    <option value="KURDISTAN">KURDISTAN</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xs focus:outline-none focus:border-[#990000]"
                  >
                    <option value="UNESCO_HERITAGE">UNESCO World Heritage</option>
                    <option value="ANCIENT_SILK_ROAD">Ancient Silk Road</option>
                    <option value="NATURE_ADVENTURE">Nature & Adventure</option>
                    <option value="GASTRONOMY">Gastronomy & Culture</option>
                    <option value="CULTURAL_EXCHANGE">Cultural Exchange</option>
                    <option value="MODERN_WONDER">Modern Wonder</option>
                  </select>
                </div>
              </div>

              {/* Image URL & Cost */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-gray-700 mb-1">Image URL *</label>
                  <input
                    type="text"
                    required
                    value={formData.imageUrl}
                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xs focus:outline-none focus:border-[#990000]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Estimated Cost</label>
                  <input
                    type="text"
                    value={formData.estimatedCost}
                    onChange={e => setFormData({ ...formData, estimatedCost: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xs focus:outline-none focus:border-[#990000]"
                  />
                </div>
              </div>

              {/* Visa & Flights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Visa Policy</label>
                  <input
                    type="text"
                    value={formData.visaPolicy}
                    onChange={e => setFormData({ ...formData, visaPolicy: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xs focus:outline-none focus:border-[#990000]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Flight Connections</label>
                  <input
                    type="text"
                    value={formData.flightInfo}
                    onChange={e => setFormData({ ...formData, flightInfo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xs focus:outline-none focus:border-[#990000]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">Description (English) *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.descriptionEn}
                  onChange={e => setFormData({ ...formData, descriptionEn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xs focus:outline-none focus:border-[#990000]"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={formData.isTrending}
                    onChange={e => setFormData({ ...formData, isTrending: e.target.checked })}
                    className="rounded-xs"
                  />
                  <span>Mark as Trending</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded-xs"
                  />
                  <span>Mark as Featured</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-gray-800 font-bold uppercase rounded-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="px-6 py-2 bg-[#990000] hover:bg-red-800 text-white font-bold uppercase rounded-xs transition-colors cursor-pointer shadow-xs"
                >
                  {createMutation.isPending || updateMutation.isPending ? 'Saving...' : editingSpot ? 'Update Destination' : 'Create Destination'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
