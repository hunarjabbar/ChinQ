import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { VisaFlightRecord } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { 
  Plane, Plus, Edit, Trash2, Search, Filter, RefreshCw, 
  CheckCircle2, X, Star, TrendingUp, ExternalLink, Globe2, Sparkles, AlertCircle, Clock, ShieldCheck, Ticket, Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AdminVisaFlight() {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<VisaFlightRecord | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    titleZh: '',
    titleCkb: '',
    serviceType: 'VISA_ASSISTANCE',
    originRegion: 'CHINA',
    destinationRegion: 'KURDISTAN',
    summaryEn: '',
    summaryAr: '',
    summaryZh: '',
    summaryCkb: '',
    detailsEn: '',
    detailsAr: '',
    detailsZh: '',
    detailsCkb: '',
    airlineOrAuthority: 'Consular & Civil Aviation Authority',
    processingTime: '24 - 48 Hours',
    feeOrCost: 'Consular Standard Fee',
    imageUrl: '',
    officialLink: '',
    isFeatured: true,
    isTrending: true
  });

  // Query records
  const { data: records = [], isLoading } = useQuery<VisaFlightRecord[]>({
    queryKey: ['admin-visa-flights'],
    queryFn: async () => {
      const res = await fetch('/api/visa-flights');
      if (!res.ok) throw new Error('Failed to fetch visa & flight records');
      return res.json();
    }
  });

  // Save (Create/Update) Mutation
  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const url = editingItem ? `/api/visa-flights/${editingItem.id}` : '/api/visa-flights';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save visa & flight record');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-visa-flights'] });
      setIsModalOpen(false);
      resetForm();
      setStatusMessage({ type: 'success', text: editingItem ? 'Visa & Flight record updated successfully!' : 'New Visa & Flight record created!' });
      setTimeout(() => setStatusMessage(null), 3500);
    },
    onError: (err: any) => {
      setStatusMessage({ type: 'error', text: err.message || 'Operation failed' });
    }
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/visa-flights/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete record');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-visa-flights'] });
      setStatusMessage({ type: 'success', text: 'Visa & Flight record deleted successfully' });
      setTimeout(() => setStatusMessage(null), 3500);
    },
    onError: (err: any) => {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to delete' });
    }
  });

  // Reseed Mutation
  const reseedMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/visa-flights/seed', { method: 'POST' });
      if (!res.ok) throw new Error('Reseed failed');
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-visa-flights'] });
      setStatusMessage({ type: 'success', text: data.message || 'Reseeded database successfully!' });
      setTimeout(() => setStatusMessage(null), 3500);
    }
  });

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      titleEn: '',
      titleAr: '',
      titleZh: '',
      titleCkb: '',
      serviceType: 'VISA_ASSISTANCE',
      originRegion: 'CHINA',
      destinationRegion: 'KURDISTAN',
      summaryEn: '',
      summaryAr: '',
      summaryZh: '',
      summaryCkb: '',
      detailsEn: '',
      detailsAr: '',
      detailsZh: '',
      detailsCkb: '',
      airlineOrAuthority: 'Consular & Civil Aviation Authority',
      processingTime: '24 - 48 Hours',
      feeOrCost: 'Consular Standard Fee',
      imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000',
      officialLink: '',
      isFeatured: true,
      isTrending: true
    });
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (item: VisaFlightRecord) => {
    setEditingItem(item);
    setFormData({
      titleEn: item.titleEn || '',
      titleAr: item.titleAr || '',
      titleZh: item.titleZh || '',
      titleCkb: item.titleCkb || '',
      serviceType: item.serviceType || 'VISA_ASSISTANCE',
      originRegion: item.originRegion || 'CHINA',
      destinationRegion: item.destinationRegion || 'KURDISTAN',
      summaryEn: item.summaryEn || '',
      summaryAr: item.summaryAr || '',
      summaryZh: item.summaryZh || '',
      summaryCkb: item.summaryCkb || '',
      detailsEn: item.detailsEn || '',
      detailsAr: item.detailsAr || '',
      detailsZh: item.detailsZh || '',
      detailsCkb: item.detailsCkb || '',
      airlineOrAuthority: item.airlineOrAuthority || '',
      processingTime: item.processingTime || '',
      feeOrCost: item.feeOrCost || '',
      imageUrl: item.imageUrl || '',
      officialLink: item.officialLink || '',
      isFeatured: item.isFeatured ?? true,
      isTrending: item.isTrending ?? true
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  // Filter records
  const filteredRecords = records.filter(r => {
    const matchesSearch = 
      r.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.titleAr.includes(searchQuery) ||
      r.titleZh.includes(searchQuery) ||
      r.titleCkb.includes(searchQuery) ||
      r.airlineOrAuthority.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesService = selectedService === 'ALL' || r.serviceType === selectedService;
    const matchesRegion = selectedRegion === 'ALL' || r.originRegion === selectedRegion || r.destinationRegion === selectedRegion;

    return matchesSearch && matchesService && matchesRegion;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">
            <Plane className="w-4 h-4" />
            <span>Administration Control Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Visa & Flight Management</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Manage flight charters, consular visa promotions, and diplomatic green channels between China, Iraq & Kurdistan Region.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => reseedMutation.mutate()}
            disabled={reseedMutation.isPending}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${reseedMutation.isPending ? 'animate-spin' : ''}`} />
            <span>Reseed Database</span>
          </button>

          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Visa / Flight Service</span>
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {statusMessage && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 text-sm font-semibold ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300' 
            : 'bg-red-950/80 border-red-500/50 text-red-300'
        }`}>
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by title, airline or authority..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="ALL">All Service Categories</option>
          <option value="VISA_ASSISTANCE">Visa & E-Visa Assistance</option>
          <option value="FLIGHT_ROUTE">Flight Routes & Aviation</option>
          <option value="PASSPORT_DIPLOMATIC">Diplomatic & Chamber Green Channel</option>
          <option value="TRAVEL_PUBLICATION">Logistics & Publications</option>
          <option value="CONSULAR_GUIDE">Airport Concierge & Consular</option>
        </select>

        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="ALL">All Regions</option>
          <option value="CHINA">China</option>
          <option value="IRAQ">Iraq</option>
          <option value="KURDISTAN">Kurdistan Region</option>
          <option value="BILATERAL">Bilateral / Joint</option>
        </select>
      </div>

      {/* Records Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-amber-500" />
            <span>Loading records...</span>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            No Visa or Flight records matching criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Service & Title</th>
                  <th className="p-4">Origin → Destination</th>
                  <th className="p-4">Authority / Airline</th>
                  <th className="p-4">Time & Cost</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredRecords.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={item.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-950 border border-slate-800" />
                        <div>
                          <div className="font-bold text-white text-sm line-clamp-1">{item.titleEn}</div>
                          <div className="text-[10px] text-amber-400 font-semibold">{item.serviceType}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-slate-200">
                      {item.originRegion} → {item.destinationRegion}
                    </td>

                    <td className="p-4 text-slate-300">
                      {item.airlineOrAuthority}
                    </td>

                    <td className="p-4">
                      <div className="text-indigo-300 font-semibold">{item.processingTime}</div>
                      <div className="text-emerald-400 text-[10px]">{item.feeOrCost}</div>
                    </td>

                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {item.isFeatured && <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded text-[10px] font-bold">Featured</span>}
                        {item.isTrending && <span className="bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded text-[10px] font-bold">Trending</span>}
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white transition-colors"
                          title="Edit Record"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${item.titleEn}"?`)) {
                              deleteMutation.mutate(item.id);
                            }
                          }}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-red-950 text-red-400 hover:text-red-300 transition-colors"
                          title="Delete Record"
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
      </div>

      {/* Modal for Creating / Editing */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative text-slate-100 shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-black text-white mb-6">
              {editingItem ? 'Edit Visa & Flight Service' : 'Add New Visa / Flight Promotion'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Category & Regions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Service Category</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  >
                    <option value="VISA_ASSISTANCE">Visa & E-Visa Assistance</option>
                    <option value="FLIGHT_ROUTE">Flight Routes & Aviation</option>
                    <option value="PASSPORT_DIPLOMATIC">Diplomatic & Chamber Green Channel</option>
                    <option value="TRAVEL_PUBLICATION">Logistics & Publications</option>
                    <option value="CONSULAR_GUIDE">Airport Concierge & Consular</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Origin Region</label>
                  <select
                    value={formData.originRegion}
                    onChange={(e) => setFormData({ ...formData, originRegion: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  >
                    <option value="CHINA">China</option>
                    <option value="IRAQ">Iraq</option>
                    <option value="KURDISTAN">Kurdistan Region</option>
                    <option value="BILATERAL">Bilateral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Destination Region</label>
                  <select
                    value={formData.destinationRegion}
                    onChange={(e) => setFormData({ ...formData, destinationRegion: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  >
                    <option value="KURDISTAN">Kurdistan Region</option>
                    <option value="IRAQ">Iraq</option>
                    <option value="CHINA">China</option>
                    <option value="BILATERAL">Bilateral</option>
                  </select>
                </div>
              </div>

              {/* Titles in 4 languages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Title (Arabic)</label>
                  <input
                    type="text"
                    value={formData.titleAr}
                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white text-right"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Title (Chinese)</label>
                  <input
                    type="text"
                    value={formData.titleZh}
                    onChange={(e) => setFormData({ ...formData, titleZh: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Title (Kurdish Sorani)</label>
                  <input
                    type="text"
                    value={formData.titleCkb}
                    onChange={(e) => setFormData({ ...formData, titleCkb: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white text-right"
                  />
                </div>
              </div>

              {/* Authority, Time, Tariff, Image */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Authority / Airline</label>
                  <input
                    type="text"
                    value={formData.airlineOrAuthority}
                    onChange={(e) => setFormData({ ...formData, airlineOrAuthority: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Processing / Flight Time</label>
                  <input
                    type="text"
                    value={formData.processingTime}
                    onChange={(e) => setFormData({ ...formData, processingTime: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Fee or Cost Tariff</label>
                  <input
                    type="text"
                    value={formData.feeOrCost}
                    onChange={(e) => setFormData({ ...formData, feeOrCost: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Image URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Official Portal / Booking Link</label>
                  <input
                    type="url"
                    value={formData.officialLink}
                    onChange={(e) => setFormData({ ...formData, officialLink: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              {/* Summaries in 4 languages */}
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Summary (English) *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.summaryEn}
                  onChange={(e) => setFormData({ ...formData, summaryEn: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Details / Operational Guidance (English)</label>
                <textarea
                  rows={3}
                  value={formData.detailsEn}
                  onChange={(e) => setFormData({ ...formData, detailsEn: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              {/* Flags */}
              <div className="flex gap-6 items-center pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-amber-500"
                  />
                  <span>Featured Promotion</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.isTrending}
                    onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                    className="rounded bg-slate-800 border-slate-700 text-indigo-500 focus:ring-indigo-500"
                  />
                  <span>Trending Route</span>
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{saveMutation.isPending ? 'Saving...' : (editingItem ? 'Update Service' : 'Create Service')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
