import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { WomenProfile } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { 
  Users, Plus, Edit, Trash2, Search, Filter, RefreshCw, 
  CheckCircle2, X, Star, TrendingUp, ExternalLink, Globe2, Sparkles, AlertCircle
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

  // Form State
  const [formData, setFormData] = useState({
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
  });

  // Query profiles
  const { data: profiles = [], isLoading } = useQuery<WomenProfile[]>({
    queryKey: ['admin-women-profiles'],
    queryFn: async () => {
      const res = await fetch('/api/women');
      if (!res.ok) throw new Error('Failed to fetch women records');
      return res.json();
    }
  });

  // Save (Create/Update) Mutation
  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const url = editingProfile ? `/api/women/${editingProfile.id}` : '/api/women';
      const method = editingProfile ? 'PUT' : 'POST';

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
        throw new Error(err.error || 'Failed to save women record');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-women-profiles'] });
      queryClient.invalidateQueries({ queryKey: ['women-profiles-home'] });
      queryClient.invalidateQueries({ queryKey: ['women-profiles-page'] });
      setIsModalOpen(false);
      resetForm();
      setStatusMessage({ type: 'success', text: editingProfile ? 'Women record updated successfully!' : 'New women record created!' });
      setTimeout(() => setStatusMessage(null), 3500);
    },
    onError: (err: any) => {
      setStatusMessage({ type: 'error', text: err.message || 'Operation failed' });
    }
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/women/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
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
    }
  });

  // Reseed Mutation
  const reseedMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/women/seed', { method: 'POST' });
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
      const res = await fetch(`/api/women/${profile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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

  const resetForm = () => {
    setEditingProfile(null);
    setFormData({
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
    });
  };

  const handleEdit = (profile: WomenProfile) => {
    setEditingProfile(profile);
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
      isFeatured: profile.isFeatured,
      isTrending: profile.isTrending
    });
    setIsModalOpen(true);
  };

  const filteredProfiles = profiles.filter(p => {
    const matchReg = selectedRegion === 'ALL' || p.region === selectedRegion;
    const matchCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchQ = !q || p.nameEn.toLowerCase().includes(q) || p.titleEn.toLowerCase().includes(q) || p.organization.toLowerCase().includes(q);
    return matchReg && matchCat && matchQ;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border-2 border-[#111111] p-6 rounded-xs shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-[#990000] text-white font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              Sovereign Administration
            </span>
            <span className="text-gray-500 font-mono text-xs">Beijing • Baghdad • Erbil</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#111111]">
            Women Leadership & Policy Management
          </h1>
          <p className="text-gray-600 text-xs font-mono">
            Manage prominent female figures, legal rights declarations, tech achievements, and academic monographs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => reseedMutation.mutate()}
            disabled={reseedMutation.isPending}
            className="bg-white hover:bg-gray-100 text-[#111111] border border-[#111111] px-3 py-2 font-mono text-xs font-bold uppercase transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${reseedMutation.isPending ? 'animate-spin' : ''}`} />
            <span>Seed Default Data</span>
          </button>

          <button
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="bg-[#990000] hover:bg-[#7a0000] text-white px-4 py-2 font-mono text-xs font-bold uppercase transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Women Record</span>
          </button>
        </div>
      </div>

      {/* Status Notifications */}
      {statusMessage && (
        <div className={`p-4 border font-mono text-xs flex items-center gap-2 ${
          statusMessage.type === 'success' ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-red-50 border-red-500 text-red-800'
        }`}>
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border-2 border-[#111111] p-4 rounded-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, title, or organization..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#F4F4F0] border border-gray-300 text-xs font-mono text-[#111111] focus:outline-none focus:border-[#990000]"
            />
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-gray-500">
            <span>Total Records: <strong className="text-[#990000]">{profiles.length}</strong></span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono font-bold text-gray-500 mr-1">Region:</span>
            {['ALL', 'CHINA', 'IRAQ', 'KURDISTAN', 'BILATERAL'].map(r => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-2.5 py-0.5 text-xs font-mono transition-colors ${
                  selectedRegion === r ? 'bg-[#111111] text-white font-bold' : 'bg-[#F4F4F0] text-gray-700 hover:bg-gray-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono font-bold text-gray-500 mr-1">Category:</span>
            {['ALL', 'PROMINENT_FIGURE', 'POLICY_RIGHTS', 'ACHIEVEMENTS', 'PUBLICATIONS'].map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-2.5 py-0.5 text-xs font-mono transition-colors ${
                  selectedCategory === c ? 'bg-[#990000] text-white font-bold' : 'bg-[#F4F4F0] text-gray-700 hover:bg-gray-200'
                }`}
              >
                {c.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border-2 border-[#111111] rounded-xs overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#111111] text-white uppercase text-[10px] tracking-wider border-b border-[#111111]">
            <tr>
              <th className="p-3">Record / Name</th>
              <th className="p-3">Region</th>
              <th className="p-3">Category</th>
              <th className="p-3">Organization</th>
              <th className="p-3 text-center">Toggles</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  Loading records from database...
                </td>
              </tr>
            ) : filteredProfiles.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No women records match the current filter criteria.
                </td>
              </tr>
            ) : (
              filteredProfiles.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-medium text-[#111111]">
                    <div className="flex items-center gap-3">
                      <img src={p.imageUrl} alt={p.nameEn} className="w-10 h-10 object-cover border border-gray-300 rounded-xs shrink-0" />
                      <div>
                        <p className="font-bold font-serif text-sm text-[#111111]">{p.nameEn}</p>
                        <p className="text-[11px] text-[#990000] truncate max-w-xs">{p.titleEn}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="bg-[#111111] text-white text-[10px] px-2 py-0.5 font-bold">
                      {p.region}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="bg-[#990000] text-white text-[10px] px-2 py-0.5 font-bold">
                      {p.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600 truncate max-w-xs">
                    {p.organization}
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => toggleStatus(p, 'isFeatured')}
                      title="Toggle Featured"
                      className={`p-1 rounded-xs border ${p.isFeatured ? 'bg-amber-100 border-amber-400 text-amber-800' : 'bg-gray-100 text-gray-400 border-gray-300'}`}
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleStatus(p, 'isTrending')}
                      title="Toggle Trending"
                      className={`p-1 rounded-xs border ${p.isTrending ? 'bg-rose-100 border-rose-400 text-rose-800' : 'bg-gray-100 text-gray-400 border-gray-300'}`}
                    >
                      <TrendingUp className="w-3.5 h-3.5" />
                    </button>
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <button
                      onClick={() => handleEdit(p)}
                      className="p-1.5 bg-gray-100 hover:bg-[#111111] hover:text-white transition-colors border border-gray-300"
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
                      className="p-1.5 bg-red-50 hover:bg-[#990000] hover:text-white text-red-700 transition-colors border border-red-200"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-2 border-[#111111] max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 rounded-xs shadow-2xl relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-[#990000] hover:text-white p-1.5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-[#111111]">
                  {editingProfile ? 'Edit Women Record' : 'Create Women Record'}
                </h3>
                <p className="text-xs text-gray-500 font-mono">
                  Fill quadrilingual metadata for female pioneers, policy frameworks, tech summits, or publications.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveMutation.mutate(formData);
                }}
                className="space-y-4"
              >
                {/* Region & Category Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F4F4F0] p-3 border border-gray-300">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-gray-700 mb-1">Region *</label>
                    <select
                      value={formData.region}
                      onChange={e => setFormData({ ...formData, region: e.target.value })}
                      className="w-full bg-white border border-gray-300 p-2 text-xs font-mono focus:border-[#990000]"
                    >
                      <option value="CHINA">CHINA 🇨🇳</option>
                      <option value="IRAQ">IRAQ 🇮🇶</option>
                      <option value="KURDISTAN">KURDISTAN REGION</option>
                      <option value="BILATERAL">BILATERAL SINO-IRAQI</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-gray-700 mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-white border border-gray-300 p-2 text-xs font-mono focus:border-[#990000]"
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
                  <h4 className="font-mono text-xs font-bold text-[#990000] uppercase">1. Names (Quadrilingual)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Name (English) *"
                      value={formData.nameEn}
                      onChange={e => setFormData({ ...formData, nameEn: e.target.value })}
                      className="bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono"
                    />
                    <input
                      type="text"
                      placeholder="الاسم (العربية)"
                      value={formData.nameAr}
                      onChange={e => setFormData({ ...formData, nameAr: e.target.value })}
                      className="bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono text-right"
                    />
                    <input
                      type="text"
                      placeholder="姓名 (中文)"
                      value={formData.nameZh}
                      onChange={e => setFormData({ ...formData, nameZh: e.target.value })}
                      className="bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono"
                    />
                    <input
                      type="text"
                      placeholder="ناو (کوردی سۆرانی)"
                      value={formData.nameCkb}
                      onChange={e => setFormData({ ...formData, nameCkb: e.target.value })}
                      className="bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono text-right"
                    />
                  </div>
                </div>

                {/* Titles (Quadrilingual) */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-bold text-[#990000] uppercase">2. Title / Role (Quadrilingual)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Title (English) *"
                      value={formData.titleEn}
                      onChange={e => setFormData({ ...formData, titleEn: e.target.value })}
                      className="bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono"
                    />
                    <input
                      type="text"
                      placeholder="اللقب / المنصب (العربية)"
                      value={formData.titleAr}
                      onChange={e => setFormData({ ...formData, titleAr: e.target.value })}
                      className="bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono text-right"
                    />
                    <input
                      type="text"
                      placeholder="头衔/职务 (中文)"
                      value={formData.titleZh}
                      onChange={e => setFormData({ ...formData, titleZh: e.target.value })}
                      className="bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono"
                    />
                    <input
                      type="text"
                      placeholder="ناونیشان / پلە (کوردی)"
                      value={formData.titleCkb}
                      onChange={e => setFormData({ ...formData, titleCkb: e.target.value })}
                      className="bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono text-right"
                    />
                  </div>
                </div>

                {/* Summaries (English & Arabic mandatory or auto fallback) */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-bold text-[#990000] uppercase">3. Short Summaries</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <textarea
                      rows={2}
                      required
                      placeholder="Summary (English) *"
                      value={formData.summaryEn}
                      onChange={e => setFormData({ ...formData, summaryEn: e.target.value })}
                      className="bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono"
                    />
                    <textarea
                      rows={2}
                      placeholder="ملخص قصير (العربية)"
                      value={formData.summaryAr}
                      onChange={e => setFormData({ ...formData, summaryAr: e.target.value })}
                      className="bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono text-right"
                    />
                  </div>
                </div>

                {/* Biography / Policy Text */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-bold text-[#990000] uppercase">4. Detailed Bio / Legal Policy Text (English)</h4>
                  <textarea
                    rows={4}
                    placeholder="Full biography, research abstract, or legal policy text..."
                    value={formData.bioEn}
                    onChange={e => setFormData({ ...formData, bioEn: e.target.value })}
                    className="w-full bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono"
                  />
                </div>

                {/* Media & External Links */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase text-gray-700 mb-1">Image URL *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={formData.imageUrl}
                      onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase text-gray-700 mb-1">Organization</label>
                    <input
                      type="text"
                      placeholder="China-Iraq Women Network"
                      value={formData.organization}
                      onChange={e => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase text-gray-700 mb-1">Publication URL</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={formData.publicationUrl}
                      onChange={e => setFormData({ ...formData, publicationUrl: e.target.value })}
                      className="w-full bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold text-gray-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="accent-[#990000] w-4 h-4"
                    />
                    <span>Featured Spotlight</span>
                  </label>

                  <label className="flex items-center gap-2 font-mono text-xs font-bold text-gray-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isTrending}
                      onChange={e => setFormData({ ...formData, isTrending: e.target.checked })}
                      className="accent-[#990000] w-4 h-4"
                    />
                    <span>Trending Priority</span>
                  </label>
                </div>

                {/* Form Buttons */}
                <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-mono text-xs font-bold uppercase"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saveMutation.isPending}
                    className="px-6 py-2 bg-[#990000] hover:bg-[#7a0000] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs"
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
