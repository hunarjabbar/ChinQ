import { apiFetch } from "../lib/api";
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { WomenProfile } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { 
  Users, Plus, Edit, Trash2, Search, Filter, RefreshCw, 
  CheckCircle2, X, Star, TrendingUp, ExternalLink, Globe2, Sparkles, AlertCircle,
  Image as ImageIcon, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AdminWomen() {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<WomenProfile | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formValidationErr, setFormValidationErr] = useState<string | null>(null);

  // Form State
  const initialFormData = {
    nameEn: '',
    nameAr: '',
    nameZh: '',
    nameCkb: '',
    titleEn: '',
    titleAr: '',
    titleZh: '',
    titleCkb: '',
    region: 'CHINA',
    category: 'PROMINENT_FIGURE',
    summaryEn: '',
    summaryAr: '',
    summaryZh: '',
    summaryCkb: '',
    bioEn: '',
    bioAr: '',
    bioZh: '',
    bioCkb: '',
    imageUrl: '',
    organization: 'Sino-Iraqi Women Empowerment Initiative',
    publicationUrl: '',
    isFeatured: true,
    isTrending: true
  };

  const [formData, setFormData] = useState(initialFormData);

  // Query profiles
  const { data: profiles = [], isLoading } = useQuery<WomenProfile[]>({
    queryKey: ['admin-women-profiles'],
    queryFn: async () => {
      const res = await apiFetch('/api/women');
      if (!res.ok) throw new Error('Failed to fetch women records');
      return res.json();
    }
  });

  const resetForm = () => {
    setEditingProfile(null);
    setFormData(initialFormData);
    setFormValidationErr(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEdit = (profile: WomenProfile) => {
    setEditingProfile(profile);
    setFormValidationErr(null);
    setFormData({
      nameEn: profile.nameEn || '',
      nameAr: profile.nameAr || '',
      nameZh: profile.nameZh || '',
      nameCkb: profile.nameCkb || '',
      titleEn: profile.titleEn || '',
      titleAr: profile.titleAr || '',
      titleZh: profile.titleZh || '',
      titleCkb: profile.titleCkb || '',
      region: profile.region || 'CHINA',
      category: profile.category || 'PROMINENT_FIGURE',
      summaryEn: profile.summaryEn || '',
      summaryAr: profile.summaryAr || '',
      summaryZh: profile.summaryZh || '',
      summaryCkb: profile.summaryCkb || '',
      bioEn: profile.bioEn || '',
      bioAr: profile.bioAr || '',
      bioZh: profile.bioZh || '',
      bioCkb: profile.bioCkb || '',
      imageUrl: profile.imageUrl || '',
      organization: profile.organization || 'Sino-Iraqi Women Empowerment Initiative',
      publicationUrl: profile.publicationUrl || '',
      isFeatured: profile.isFeatured ?? true,
      isTrending: profile.isTrending ?? true
    });
    setIsModalOpen(true);
  };

  // Save (Create/Update) Mutation
  const saveMutation = useMutation({
    mutationFn: async ({ id, data }: { id?: string | null; data: typeof formData }) => {
      const url = id ? `/api/women/${id}` : '/api/women';
      const method = id ? 'PUT' : 'POST';

      const res = await apiFetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save women record');
      }
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-women-profiles'] });
      queryClient.invalidateQueries({ queryKey: ['women-profiles-home'] });
      queryClient.invalidateQueries({ queryKey: ['women-profiles-page'] });
      closeModal();
      setStatusMessage({ 
        type: 'success', 
        text: variables.id ? 'Women record updated successfully!' : 'New women record created!' 
      });
      setTimeout(() => setStatusMessage(null), 3500);
    },
    onError: (err: any) => {
      setStatusMessage({ type: 'error', text: err.message || 'Operation failed' });
    }
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameEn.trim()) {
      setFormValidationErr('English Name is required');
      return;
    }
    if (!formData.titleEn.trim()) {
      setFormValidationErr('English Title/Role is required');
      return;
    }
    if (!formData.summaryEn.trim()) {
      setFormValidationErr('English Summary is required');
      return;
    }
    if (!formData.imageUrl.trim()) {
      setFormValidationErr('Image URL is required');
      return;
    }
    setFormValidationErr(null);
    saveMutation.mutate({ id: editingProfile?.id, data: formData });
  };

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/women/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete women record');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-women-profiles'] });
      queryClient.invalidateQueries({ queryKey: ['women-profiles-home'] });
      queryClient.invalidateQueries({ queryKey: ['women-profiles-page'] });
      setStatusMessage({ type: 'success', text: 'Record deleted successfully!' });
      setTimeout(() => setStatusMessage(null), 3500);
    },
    onError: (err: any) => {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to delete record' });
    }
  });

  // Reseed Mutation
  const reseedMutation = useMutation({
    mutationFn: async () => {
      const res = await apiFetch('/api/women/seed', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to reseed database');
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-women-profiles'] });
      queryClient.invalidateQueries({ queryKey: ['women-profiles-home'] });
      queryClient.invalidateQueries({ queryKey: ['women-profiles-page'] });
      setStatusMessage({ type: 'success', text: `Reseeded database! Total records: ${data.count}` });
      setTimeout(() => setStatusMessage(null), 3500);
    }
  });

  // Toggle Featured or Trending
  const toggleStatus = async (profile: WomenProfile, field: 'isFeatured' | 'isTrending') => {
    try {
      const res = await apiFetch(`/api/women/${profile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: !profile[field] })
      });
      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ['admin-women-profiles'] });
        queryClient.invalidateQueries({ queryKey: ['women-profiles-home'] });
        queryClient.invalidateQueries({ queryKey: ['women-profiles-page'] });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredProfiles = profiles.filter(p => {
    const matchReg = selectedRegion === 'ALL' || p.region === selectedRegion;
    const matchCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchQuery = !q || 
      p.nameEn.toLowerCase().includes(q) || 
      (p.nameAr && p.nameAr.toLowerCase().includes(q)) || 
      (p.nameZh && p.nameZh.toLowerCase().includes(q)) || 
      (p.nameCkb && p.nameCkb.toLowerCase().includes(q)) || 
      p.organization.toLowerCase().includes(q) ||
      p.titleEn.toLowerCase().includes(q);
    return matchReg && matchCat && matchQuery;
  });

  return (
    <div className="space-y-6 text-start p-4 sm:p-6 bg-paper-50 dark:bg-paper-900 border border-neutral-200 dark:border-neutral-800 rounded-xs">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-brand-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-brand-800 text-paper-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Admin Module</span>
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Beijing • Baghdad • Erbil Joint Forum</span>
          </div>
          <h2 className="text-2xl font-bold text-ink-900 dark:text-paper-50 tracking-tight">
            Women Leadership, Policy & Academic Forum Admin
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Manage prominent figures, legal rights frameworks, achievements, and academic monographs across China, Iraq, and Kurdistan.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              if (confirm('Reseed database with official default women records?')) {
                reseedMutation.mutate();
              }
            }}
            disabled={reseedMutation.isPending}
            className="bg-paper-100 dark:bg-paper-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-ink-900 dark:text-paper-100 border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs font-bold uppercase transition-colors flex items-center gap-1.5 rounded-xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${reseedMutation.isPending ? 'animate-spin' : ''}`} />
            <span>Seed Default Data</span>
          </button>

          <button
            onClick={openCreateModal}
            className="bg-brand-800 hover:bg-brand-900 text-paper-50 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs rounded-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Women Record</span>
          </button>
        </div>
      </div>

      {/* Status Notifications */}
      {statusMessage && (
        <div className={`p-3.5 rounded-xs text-xs font-medium flex items-center justify-between gap-2 shadow-xs ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500 text-emerald-800 dark:text-emerald-300' 
            : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-500 text-rose-800 dark:text-rose-300'
        }`}>
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
            <span>{statusMessage.text}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="hover:opacity-75 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="bg-paper-100 dark:bg-paper-800/60 p-4 border border-neutral-200 dark:border-neutral-700/80 rounded-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Filter by name, organization, or role..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full ps-9 pe-4 py-2 bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:outline-none focus:border-brand-800"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <span>Total Records: <strong className="text-brand-800 dark:text-brand-400">{profiles.length}</strong></span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2 border-t border-neutral-200 dark:border-neutral-700">
          {/* Taxonomy 1: Region Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 me-1">Region:</span>
            {['ALL', 'CHINA', 'IRAQ', 'KURDISTAN', 'BILATERAL'].map(r => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider transition-colors rounded-xs cursor-pointer ${
                  selectedRegion === r ? 'bg-ink-900 dark:bg-paper-50 text-paper-50 dark:text-ink-900' : 'bg-paper-50 dark:bg-paper-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Taxonomy 2: Focus / Category Filters */}
          <div className="flex flex-wrap items-center gap-1.5 border-t lg:border-t-0 lg:border-s border-neutral-200 dark:border-neutral-700 pt-2 lg:pt-0 lg:ps-3">
            <span className="text-[11px] font-bold text-brand-800 dark:text-brand-400 me-1">Focus:</span>
            {['ALL', 'PROMINENT_FIGURE', 'POLICY_RIGHTS', 'ACHIEVEMENTS', 'PUBLICATIONS'].map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider transition-colors rounded-xs cursor-pointer ${
                  selectedCategory === c ? 'bg-brand-800 text-paper-50' : 'bg-paper-50 dark:bg-paper-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700'
                }`}
              >
                {c.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-paper-50 dark:bg-paper-900 border-2 border-brand-800 rounded-xs overflow-x-auto shadow-xs">
        <table className="w-full text-start text-xs font-medium">
          <thead className="bg-brand-800 text-paper-50 uppercase text-[11px] tracking-wider border-b border-brand-800">
            <tr>
              <th className="p-3 text-start">Record / Name</th>
              <th className="p-3 text-start">Region</th>
              <th className="p-3 text-start">Category</th>
              <th className="p-3 text-start">Organization</th>
              <th className="p-3 text-center">Toggles</th>
              <th className="p-3 text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-neutral-500">
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-brand-800" />
                    <span>Loading women leadership records...</span>
                  </div>
                </td>
              </tr>
            ) : filteredProfiles.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-neutral-500">
                  No women records match the current filter criteria.
                </td>
              </tr>
            ) : (
              filteredProfiles.map((p) => (
                <tr key={p.id} className="hover:bg-paper-100 dark:hover:bg-paper-800/50 transition-colors">
                  <td className="p-3 font-medium text-ink-900 dark:text-paper-100">
                    <div className="flex items-center gap-3">
                      <img 
                        src={p.imageUrl} 
                        alt={p.nameEn} 
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200';
                        }}
                        className="w-10 h-10 object-cover border border-neutral-300 dark:border-neutral-700 rounded-xs shrink-0" 
                      />
                      <div>
                        <p className="font-bold text-sm text-ink-900 dark:text-paper-100">{p.nameEn}</p>
                        <p className="text-[11px] text-brand-800 dark:text-brand-400 truncate max-w-xs">{p.titleEn}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="bg-ink-900 dark:bg-paper-800 text-paper-50 text-[10px] px-2 py-0.5 font-bold uppercase rounded-xs border border-neutral-700/50">
                      {p.region}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="bg-brand-800 text-paper-50 text-[10px] px-2 py-0.5 font-bold uppercase rounded-xs">
                      {p.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400 truncate max-w-xs text-xs">
                    {p.organization}
                  </td>
                  <td className="p-3 text-center space-x-2 rtl:space-x-reverse">
                    <button
                      onClick={() => toggleStatus(p, 'isFeatured')}
                      title="Toggle Featured"
                      className={`p-1.5 rounded-xs border cursor-pointer transition-colors ${p.isFeatured ? 'bg-amber-100 border-amber-400 text-amber-800' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 border-neutral-300 dark:border-neutral-700'}`}
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleStatus(p, 'isTrending')}
                      title="Toggle Trending"
                      className={`p-1.5 rounded-xs border cursor-pointer transition-colors ${p.isTrending ? 'bg-brand-100 border-brand-400 text-brand-800' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 border-neutral-300 dark:border-neutral-700'}`}
                    >
                      <TrendingUp className="w-3.5 h-3.5" />
                    </button>
                  </td>
                  <td className="p-3 text-end space-x-1 rtl:space-x-reverse">
                    <button
                      onClick={() => handleEdit(p)}
                      className="p-1.5 bg-paper-100 dark:bg-paper-800 hover:bg-brand-800 hover:text-paper-50 transition-colors border border-neutral-300 dark:border-neutral-700 rounded-xs cursor-pointer"
                      title="Edit Record"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${p.nameEn}"?`)) {
                          deleteMutation.mutate(p.id);
                        }
                      }}
                      className="p-1.5 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-700 hover:text-paper-50 text-rose-700 transition-colors border border-rose-200 dark:border-rose-900 rounded-xs cursor-pointer"
                      title="Delete Record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form for Create / Edit */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
            <motion.div
              key={editingProfile?.id || 'new-record-modal'}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-paper-50 dark:bg-paper-900 border-2 border-brand-800 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 rounded-xs shadow-2xl relative text-start"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 end-4 bg-neutral-100 dark:bg-neutral-800 hover:bg-brand-800 hover:text-paper-50 p-1.5 transition-colors rounded-xs cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 pe-6">
                <h3 className="font-bold text-xl sm:text-2xl text-ink-900 dark:text-paper-50">
                  {editingProfile ? 'Edit Women Record' : 'Create Women Record'}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Fill quadrilingual metadata for female pioneers, policy frameworks, tech summits, or publications.
                </p>
              </div>

              {formValidationErr && (
                <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-500 text-rose-800 dark:text-rose-300 p-2.5 text-xs rounded-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{formValidationErr}</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Region & Category Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-paper-100 dark:bg-paper-800/70 p-3 border border-neutral-300 dark:border-neutral-700 rounded-xs">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">Region *</label>
                    <select
                      value={formData.region}
                      onChange={e => setFormData({ ...formData, region: e.target.value })}
                      className="w-full bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs font-medium text-ink-900 dark:text-paper-100 rounded-xs focus:border-brand-800"
                    >
                      <option value="CHINA">CHINA 🇨🇳</option>
                      <option value="IRAQ">IRAQ 🇮🇶</option>
                      <option value="KURDISTAN">KURDISTAN REGION</option>
                      <option value="BILATERAL">BILATERAL SINO-IRAQI</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs font-medium text-ink-900 dark:text-paper-100 rounded-xs focus:border-brand-800"
                    >
                      <option value="PROMINENT_FIGURE">PROMINENT FIGURE (Pioneer)</option>
                      <option value="POLICY_RIGHTS">POLICY & LEGAL RIGHTS</option>
                      <option value="ACHIEVEMENTS">TRENDING ACHIEVEMENTS</option>
                      <option value="PUBLICATIONS">RESEARCH PUBLICATION</option>
                    </select>
                  </div>
                </div>

                {/* Names (Quadrilingual) */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-brand-800 dark:text-brand-400 uppercase">1. Names (Quadrilingual)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Name (English) *"
                      value={formData.nameEn}
                      onChange={e => setFormData({ ...formData, nameEn: e.target.value })}
                      className="bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:border-brand-800"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      placeholder="الاسم (العربية)"
                      value={formData.nameAr}
                      onChange={e => setFormData({ ...formData, nameAr: e.target.value })}
                      className="bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:border-brand-800 text-start"
                    />
                    <input
                      type="text"
                      placeholder="姓名 (中文)"
                      value={formData.nameZh}
                      onChange={e => setFormData({ ...formData, nameZh: e.target.value })}
                      className="bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:border-brand-800"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      placeholder="ناو (کوردی سۆرانی)"
                      value={formData.nameCkb}
                      onChange={e => setFormData({ ...formData, nameCkb: e.target.value })}
                      className="bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:border-brand-800 text-start"
                    />
                  </div>
                </div>

                {/* Titles (Quadrilingual) */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-brand-800 dark:text-brand-400 uppercase">2. Title / Role (Quadrilingual)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Title (English) *"
                      value={formData.titleEn}
                      onChange={e => setFormData({ ...formData, titleEn: e.target.value })}
                      className="bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:border-brand-800"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      placeholder="اللقب / المنصب (العربية)"
                      value={formData.titleAr}
                      onChange={e => setFormData({ ...formData, titleAr: e.target.value })}
                      className="bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:border-brand-800 text-start"
                    />
                    <input
                      type="text"
                      placeholder="头衔/职务 (中文)"
                      value={formData.titleZh}
                      onChange={e => setFormData({ ...formData, titleZh: e.target.value })}
                      className="bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:border-brand-800"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      placeholder="ناونیشان / پلە (کوردی)"
                      value={formData.titleCkb}
                      onChange={e => setFormData({ ...formData, titleCkb: e.target.value })}
                      className="bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:border-brand-800 text-start"
                    />
                  </div>
                </div>

                {/* Summaries */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-brand-800 dark:text-brand-400 uppercase">3. Short Summaries</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <textarea
                      rows={2}
                      required
                      placeholder="Summary (English) *"
                      value={formData.summaryEn}
                      onChange={e => setFormData({ ...formData, summaryEn: e.target.value })}
                      className="bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:border-brand-800"
                    />
                    <textarea
                      rows={2}
                      dir="rtl"
                      placeholder="ملخص قصير (العربية)"
                      value={formData.summaryAr}
                      onChange={e => setFormData({ ...formData, summaryAr: e.target.value })}
                      className="bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:border-brand-800 text-start"
                    />
                  </div>
                </div>

                {/* Biography / Policy Text */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-brand-800 dark:text-brand-400 uppercase">4. Detailed Bio / Legal Policy Text (English)</h4>
                  <textarea
                    rows={3}
                    placeholder="Full biography, research abstract, or legal policy text..."
                    value={formData.bioEn}
                    onChange={e => setFormData({ ...formData, bioEn: e.target.value })}
                    className="w-full bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:border-brand-800"
                  />
                </div>

                {/* Media & External Links */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-brand-800 dark:text-brand-400 uppercase">5. Media & Credentials</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">Image URL *</label>
                      <input
                        type="url"
                        required
                        placeholder="https://images.unsplash.com/..."
                        value={formData.imageUrl}
                        onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="w-full bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:border-brand-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">Organization</label>
                      <input
                        type="text"
                        placeholder="China-Iraq Women Network"
                        value={formData.organization}
                        onChange={e => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:border-brand-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">Publication / Document URL</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={formData.publicationUrl}
                        onChange={e => setFormData({ ...formData, publicationUrl: e.target.value })}
                        className="w-full bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:border-brand-800"
                      />
                    </div>
                  </div>

                  {/* Image Live Preview */}
                  {formData.imageUrl && (
                    <div className="flex items-center gap-3 p-2 bg-paper-100 dark:bg-paper-800 rounded-xs border border-neutral-200 dark:border-neutral-700 text-xs">
                      <img 
                        src={formData.imageUrl} 
                        alt="Preview" 
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                        className="w-12 h-12 object-cover rounded-xs border border-neutral-300 dark:border-neutral-600" 
                      />
                      <div>
                        <span className="font-bold text-ink-900 dark:text-paper-100 flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Image Preview Active</span>
                        </span>
                        <span className="text-[11px] text-neutral-500 truncate max-w-sm block">{formData.imageUrl}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Checkboxes */}
                <div className="flex items-center gap-6 pt-1">
                  <label className="flex items-center gap-2 text-xs font-bold text-ink-900 dark:text-paper-100 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="accent-brand-800 w-4 h-4 rounded-xs"
                    />
                    <span>Featured Spotlight</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-ink-900 dark:text-paper-100 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isTrending}
                      onChange={e => setFormData({ ...formData, isTrending: e.target.checked })}
                      className="accent-brand-800 w-4 h-4 rounded-xs"
                    />
                    <span>Trending Priority</span>
                  </label>
                </div>

                {/* Form Buttons */}
                <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-paper-100 dark:bg-paper-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-bold uppercase rounded-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saveMutation.isPending}
                    className="px-6 py-2 bg-brand-800 hover:bg-brand-900 text-paper-50 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs rounded-xs transition-colors cursor-pointer"
                  >
                    {saveMutation.isPending && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                    <span>{editingProfile ? 'Save Changes' : 'Create Record'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
