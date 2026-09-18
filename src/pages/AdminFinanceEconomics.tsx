import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { FinanceInsight } from '../types';
import { 
  TrendingUp, Plus, Search, Edit3, Trash2, 
  CheckCircle2, X, Image as ImageIcon, Save, AlertCircle,
  Sparkles, ExternalLink, Calendar, User, Eye, ArrowUpDown, Star
} from 'lucide-react';

const CATEGORIES = [
  'Currency Markets',
  'Trade Balance',
  'Investment Analysis',
  'Policy & Regulation',
  'Infrastructure Finance',
  'Energy & Commodities'
];

export function AdminFinanceEconomics() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInsight, setEditingInsight] = useState<FinanceInsight | null>(null);
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'ar' | 'zh' | 'ckb'>('en');

  const [formData, setFormData] = useState({
    slug: '',
    category: 'Currency Markets',
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    author: 'ICA Economic Research Desk',
    featured: false,
    order: 0,
    publishedAt: new Date().toISOString().split('T')[0],
    titleEn: '',
    titleAr: '',
    titleZh: '',
    titleCkb: '',
    summaryEn: '',
    summaryAr: '',
    summaryZh: '',
    summaryCkb: '',
    bodyEn: '',
    bodyAr: '',
    bodyZh: '',
    bodyCkb: ''
  });

  const { data: insights = [], isLoading } = useQuery<FinanceInsight[]>({
    queryKey: ['admin-finance-insights'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/finance-insights');
      if (!res.ok) throw new Error('Failed to fetch finance insights');
      return res.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiFetch('/api/admin/finance-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to create insight');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-finance-insights'] });
      queryClient.invalidateQueries({ queryKey: ['finance-insights'] });
      closeModal();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await apiFetch(`/api/admin/finance-insights/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to update insight');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-finance-insights'] });
      queryClient.invalidateQueries({ queryKey: ['finance-insights'] });
      closeModal();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/admin/finance-insights/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete insight');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-finance-insights'] });
      queryClient.invalidateQueries({ queryKey: ['finance-insights'] });
    }
  });

  const openCreateModal = () => {
    setEditingInsight(null);
    setActiveLangTab('en');
    setFormData({
      slug: `insight-${Date.now()}`,
      category: 'Currency Markets',
      coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
      author: 'ICA Economic Research Desk',
      featured: false,
      order: insights.length + 1,
      publishedAt: new Date().toISOString().split('T')[0],
      titleEn: '',
      titleAr: '',
      titleZh: '',
      titleCkb: '',
      summaryEn: '',
      summaryAr: '',
      summaryZh: '',
      summaryCkb: '',
      bodyEn: '',
      bodyAr: '',
      bodyZh: '',
      bodyCkb: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (insight: FinanceInsight) => {
    setEditingInsight(insight);
    setActiveLangTab('en');
    setFormData({
      slug: insight.slug,
      category: insight.category,
      coverImage: insight.coverImage,
      author: insight.author,
      featured: insight.featured,
      order: insight.order,
      publishedAt: new Date(insight.publishedAt).toISOString().split('T')[0],
      titleEn: insight.titleEn,
      titleAr: insight.titleAr || '',
      titleZh: insight.titleZh || '',
      titleCkb: insight.titleCkb || '',
      summaryEn: insight.summaryEn,
      summaryAr: insight.summaryAr || '',
      summaryZh: insight.summaryZh || '',
      summaryCkb: insight.summaryCkb || '',
      bodyEn: insight.bodyEn || '',
      bodyAr: insight.bodyAr || '',
      bodyZh: insight.bodyZh || '',
      bodyCkb: insight.bodyCkb || ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingInsight(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleEn || !formData.summaryEn) {
      alert('Please provide at least English title and summary.');
      return;
    }

    if (editingInsight) {
      updateMutation.mutate({ id: editingInsight.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const generateSlugFromTitle = () => {
    if (formData.titleEn) {
      const generated = formData.titleEn
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug: generated }));
    }
  };

  const filteredInsights = insights.filter(item => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch = !search || 
      item.titleEn?.toLowerCase().includes(search.toLowerCase()) ||
      item.titleAr?.includes(search) ||
      item.titleZh?.includes(search) ||
      item.category?.toLowerCase().includes(search.toLowerCase()) ||
      item.author?.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-neutral-900 border border-brand-800/15 p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-brand-800 rounded-full" />
            <span className="text-xs font-mono uppercase tracking-widest text-brand-800 dark:text-brand-400">
              Macroeconomic & Financial Intelligence
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-900 dark:text-neutral-100 tracking-tight">
            ICA Finance & Economics Desk
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Manage macroeconomic research, trade balance reports, and bilateral monetary policy insights.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm tracking-wide transition-all shadow-xs shrink-0 cursor-pointer"
        >
          <Plus size={16} />
          <span>New Economic Insight</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-neutral-900 border border-brand-800/15 p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
          <input
            type="text"
            placeholder="Search economic analysis by title, category, or author..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'ALL'
                ? 'bg-brand-800 text-white'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
            }`}
          >
            All Categories ({insights.length})
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-800 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Insights Table/List */}
      <div className="bg-white dark:bg-neutral-900 border border-brand-800/15 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-neutral-500 font-mono text-sm">
            Loading financial insights...
          </div>
        ) : filteredInsights.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <AlertCircle className="mx-auto text-neutral-400" size={32} />
            <p className="text-neutral-600 dark:text-neutral-300 font-medium">
              No financial insights found matching your criteria.
            </p>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-1.5 text-sm text-brand-800 dark:text-brand-400 font-bold hover:underline"
            >
              <Plus size={14} /> Publish first insight
            </button>
          </div>
        ) : (
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {filteredInsights.map(insight => (
              <div
                key={insight.id}
                className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <img
                    src={insight.coverImage}
                    alt={insight.titleEn}
                    className="w-20 h-16 object-cover bg-neutral-100 dark:bg-neutral-800 shrink-0 border border-neutral-200 dark:border-neutral-700"
                  />
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 text-3xs font-mono font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/60 text-brand-800 dark:text-brand-300 border border-brand-800/20">
                        {insight.category}
                      </span>
                      {insight.featured && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-3xs font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-800/20">
                          <Star size={10} className="fill-amber-500 text-amber-500" /> Featured
                        </span>
                      )}
                      <span className="text-3xs font-mono text-neutral-400">
                        Order: #{insight.order}
                      </span>
                    </div>

                    <h3 className="font-bold text-neutral-900 dark:text-neutral-100 truncate text-base">
                      {insight.titleEn}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 font-serif">
                      {insight.summaryEn}
                    </p>

                    <div className="flex items-center gap-4 text-3xs text-neutral-400 font-mono pt-1">
                      <span>By {insight.author}</span>
                      <span>•</span>
                      <span>Published {new Date(insight.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => openEditModal(insight)}
                    className="p-2 text-neutral-600 hover:text-brand-800 dark:text-neutral-400 dark:hover:text-brand-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    title="Edit Insight"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${insight.titleEn}"?`)) {
                        deleteMutation.mutate(insight.id);
                      }
                    }}
                    className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    title="Delete Insight"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 border border-brand-800 shadow-2xl my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-brand-800/20 bg-brand-50/40 dark:bg-brand-950/20 shrink-0">
              <div>
                <span className="text-3xs font-mono uppercase tracking-widest text-brand-800 dark:text-brand-400 font-bold">
                  {editingInsight ? 'Edit Analysis' : 'New Publication'}
                </span>
                <h2 className="text-xl font-black text-brand-900 dark:text-neutral-100">
                  {editingInsight ? 'Edit Economic Insight' : 'Create Economic Insight'}
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Primary Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Author / Research Desk
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={e => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Publication Date
                  </label>
                  <input
                    type="date"
                    value={formData.publishedAt}
                    onChange={e => setFormData(prev => ({ ...prev, publishedAt: e.target.value }))}
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800"
                  />
                </div>
              </div>

              {/* Cover Image & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Cover Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={formData.coverImage}
                      onChange={e => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                      className="flex-1 px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800"
                    />
                    {formData.coverImage && (
                      <img
                        src={formData.coverImage}
                        alt="Preview"
                        className="w-10 h-10 object-cover border border-neutral-200 shrink-0"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Slug *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      required
                      className="flex-1 px-3 py-2 text-sm font-mono bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800"
                    />
                    <button
                      type="button"
                      onClick={generateSlugFromTitle}
                      className="px-2.5 py-1 text-xs font-mono bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 text-neutral-700 dark:text-neutral-200"
                      title="Generate slug from English Title"
                    >
                      Auto
                    </button>
                  </div>
                </div>
              </div>

              {/* Toggles: Featured & Order */}
              <div className="flex items-center gap-6 p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={e => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="rounded border-neutral-300 text-brand-800 focus:ring-brand-800"
                  />
                  <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                    Feature in Hero/Spotlight
                  </span>
                </label>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-mono uppercase text-neutral-600 dark:text-neutral-400">
                    Display Order:
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={e => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                    className="w-20 px-2 py-1 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
              </div>

              {/* Quadrilingual Tabs for Content */}
              <div className="border border-brand-800/20">
                <div className="flex border-b border-brand-800/20 bg-neutral-100 dark:bg-neutral-800/50">
                  <button
                    type="button"
                    onClick={() => setActiveLangTab('en')}
                    className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                      activeLangTab === 'en'
                        ? 'bg-white dark:bg-neutral-900 text-brand-900 dark:text-brand-300 border-b-2 border-brand-800'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    English (Required)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLangTab('ar')}
                    className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                      activeLangTab === 'ar'
                        ? 'bg-white dark:bg-neutral-900 text-brand-900 dark:text-brand-300 border-b-2 border-brand-800'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    العربية (Arabic)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLangTab('zh')}
                    className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                      activeLangTab === 'zh'
                        ? 'bg-white dark:bg-neutral-900 text-brand-900 dark:text-brand-300 border-b-2 border-brand-800'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    中文 (Chinese)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLangTab('ckb')}
                    className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                      activeLangTab === 'ckb'
                        ? 'bg-white dark:bg-neutral-900 text-brand-900 dark:text-brand-300 border-b-2 border-brand-800'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    کوردی (Kurdish)
                  </button>
                </div>

                <div className="p-5 space-y-4" dir={activeLangTab === 'ar' || activeLangTab === 'ckb' ? 'rtl' : 'ltr'}>
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                      {activeLangTab === 'en' ? 'Headline / Title (English) *' :
                       activeLangTab === 'ar' ? 'عنوان المقال / التحليل (العربية)' :
                       activeLangTab === 'zh' ? '分析报告标题 (中文)' : 'سەردێڕی شیکردنەوەکە (کوردی)'}
                    </label>
                    <input
                      type="text"
                      value={
                        activeLangTab === 'en' ? formData.titleEn :
                        activeLangTab === 'ar' ? formData.titleAr :
                        activeLangTab === 'zh' ? formData.titleZh : formData.titleCkb
                      }
                      onChange={e => {
                        const val = e.target.value;
                        if (activeLangTab === 'en') setFormData(p => ({ ...p, titleEn: val }));
                        else if (activeLangTab === 'ar') setFormData(p => ({ ...p, titleAr: val }));
                        else if (activeLangTab === 'zh') setFormData(p => ({ ...p, titleZh: val }));
                        else setFormData(p => ({ ...p, titleCkb: val }));
                      }}
                      className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800"
                    />
                  </div>

                  {/* Summary / Teaser */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                      {activeLangTab === 'en' ? 'Executive Summary / Teaser (English) *' :
                       activeLangTab === 'ar' ? 'الملخص التنفيذي (العربية)' :
                       activeLangTab === 'zh' ? '执行摘要与导语 (中文)' : 'پوختەی شیکردنەوەکە (کوردی)'}
                    </label>
                    <textarea
                      rows={2}
                      value={
                        activeLangTab === 'en' ? formData.summaryEn :
                        activeLangTab === 'ar' ? formData.summaryAr :
                        activeLangTab === 'zh' ? formData.summaryZh : formData.summaryCkb
                      }
                      onChange={e => {
                        const val = e.target.value;
                        if (activeLangTab === 'en') setFormData(p => ({ ...p, summaryEn: val }));
                        else if (activeLangTab === 'ar') setFormData(p => ({ ...p, summaryAr: val }));
                        else if (activeLangTab === 'zh') setFormData(p => ({ ...p, summaryZh: val }));
                        else setFormData(p => ({ ...p, summaryCkb: val }));
                      }}
                      className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800"
                    />
                  </div>

                  {/* Full Body */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                      {activeLangTab === 'en' ? 'Full Economic Analysis / Body (Markdown supported)' :
                       activeLangTab === 'ar' ? 'التحليل الاقتصادي الكامل (يدعم ماركداون)' :
                       activeLangTab === 'zh' ? '完整宏观与产业分析正文 (支持Markdown)' : 'دەقی تەواوی شیکردنەوەکە'}
                    </label>
                    <textarea
                      rows={8}
                      value={
                        activeLangTab === 'en' ? formData.bodyEn :
                        activeLangTab === 'ar' ? formData.bodyAr :
                        activeLangTab === 'zh' ? formData.bodyZh : formData.bodyCkb
                      }
                      onChange={e => {
                        const val = e.target.value;
                        if (activeLangTab === 'en') setFormData(p => ({ ...p, bodyEn: val }));
                        else if (activeLangTab === 'ar') setFormData(p => ({ ...p, bodyAr: val }));
                        else if (activeLangTab === 'zh') setFormData(p => ({ ...p, bodyZh: val }));
                        else setFormData(p => ({ ...p, bodyCkb: val }));
                      }}
                      placeholder="Enter detailed economic analysis, policy breakdowns, financial projections, and empirical data points..."
                      className="w-full px-3 py-2 text-sm font-mono bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm tracking-wide transition-all shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <Save size={16} />
                  <span>{editingInsight ? 'Save Changes' : 'Publish Insight'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default AdminFinanceEconomics;
