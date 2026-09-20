import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { CulturalExchangeCategory, CulturalExchangeProgram, Locale } from '../types';
import { useParams } from 'react-router-dom';
import {
  GraduationCap, Plus, Search, Edit2, Trash2, Star,
  Calendar, Building2, Layers, RefreshCw, X, CheckCircle2, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminCulturalExchange() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<'programs' | 'categories'>('programs');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Program Modal State
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [editingProgramId, setEditingProgramId] = useState<string | null>(null);
  const [activeLocaleTab, setActiveLocaleTab] = useState<'en' | 'ar' | 'zh' | 'ckb'>('en');

  const [programForm, setProgramForm] = useState({
    titleEn: '',
    titleAr: '',
    titleZh: '',
    titleCkb: '',
    descriptionEn: '',
    descriptionAr: '',
    descriptionZh: '',
    descriptionCkb: '',
    detailsEn: '',
    detailsAr: '',
    detailsZh: '',
    detailsCkb: '',
    categoryId: '',
    institutionName: '',
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    eventDate: '',
    programStartDate: '',
    programEndDate: '',
    applicationDeadline: '',
    eligibility: '',
    contactUrl: '',
    applicationUrl: '',
    slug: '',
    featured: false,
    order: 0
  });

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    nameEn: '',
    nameAr: '',
    nameZh: '',
    nameCkb: '',
    slug: '',
    order: 0
  });

  // Feedback Notification
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Queries
  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery<CulturalExchangeCategory[]>({
    queryKey: ['admin-cultural-categories'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/cultural-exchange/categories');
      if (!res.ok) throw new Error('Failed to load categories');
      return res.json();
    }
  });

  const { data: programs = [], isLoading: isProgramsLoading } = useQuery<CulturalExchangeProgram[]>({
    queryKey: ['admin-cultural-programs', selectedCategoryFilter, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategoryFilter !== 'all') params.append('category', selectedCategoryFilter);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      const res = await apiFetch(`/api/admin/cultural-exchange/programs?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to load programs');
      return res.json();
    }
  });

  // Mutations for Programs
  const saveProgramMutation = useMutation({
    mutationFn: async (data: any) => {
      const url = editingProgramId
        ? `/api/admin/cultural-exchange/programs/${editingProgramId}`
        : '/api/admin/cultural-exchange/programs';
      const method = editingProgramId ? 'PUT' : 'POST';

      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save program');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-cultural-programs'] });
      queryClient.invalidateQueries({ queryKey: ['cultural-programs'] });
      queryClient.invalidateQueries({ queryKey: ['admin-cultural-categories'] });
      showNotification('success', editingProgramId ? 'Program updated successfully' : 'New program created successfully');
      closeProgramModal();
    },
    onError: (err: any) => {
      showNotification('error', err.message);
    }
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: async ({ id, featured }: { id: string; featured: boolean }) => {
      const res = await apiFetch(`/api/admin/cultural-exchange/programs/${id}/featured`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured })
      });
      if (!res.ok) throw new Error('Failed to toggle featured status');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-cultural-programs'] });
      queryClient.invalidateQueries({ queryKey: ['cultural-programs'] });
      showNotification('success', 'Featured status updated');
    },
    onError: (err: any) => showNotification('error', err.message)
  });

  const deleteProgramMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/admin/cultural-exchange/programs/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete program');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-cultural-programs'] });
      queryClient.invalidateQueries({ queryKey: ['cultural-programs'] });
      queryClient.invalidateQueries({ queryKey: ['admin-cultural-categories'] });
      showNotification('success', 'Program deleted successfully');
    },
    onError: (err: any) => showNotification('error', err.message)
  });

  // Mutations for Categories
  const saveCategoryMutation = useMutation({
    mutationFn: async (data: any) => {
      const url = editingCategoryId
        ? `/api/admin/cultural-exchange/categories/${editingCategoryId}`
        : '/api/admin/cultural-exchange/categories';
      const method = editingCategoryId ? 'PUT' : 'POST';

      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save category');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-cultural-categories'] });
      queryClient.invalidateQueries({ queryKey: ['cultural-categories'] });
      showNotification('success', editingCategoryId ? 'Category updated' : 'Category created');
      closeCategoryModal();
    },
    onError: (err: any) => showNotification('error', err.message)
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/admin/cultural-exchange/categories/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to delete category');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-cultural-categories'] });
      queryClient.invalidateQueries({ queryKey: ['cultural-categories'] });
      queryClient.invalidateQueries({ queryKey: ['admin-cultural-programs'] });
      showNotification('success', 'Category deleted');
    },
    onError: (err: any) => showNotification('error', err.message)
  });

  // Modal helpers
  const openNewProgramModal = () => {
    setEditingProgramId(null);
    setProgramForm({
      titleEn: '',
      titleAr: '',
      titleZh: '',
      titleCkb: '',
      descriptionEn: '',
      descriptionAr: '',
      descriptionZh: '',
      descriptionCkb: '',
      detailsEn: '',
      detailsAr: '',
      detailsZh: '',
      detailsCkb: '',
      categoryId: categories[0]?.id || '',
      institutionName: '',
      coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      eventDate: '',
      programStartDate: '',
      programEndDate: '',
      applicationDeadline: '',
      eligibility: '',
      contactUrl: '',
      applicationUrl: '',
      slug: '',
      featured: false,
      order: (programs.length + 1) * 10
    });
    setActiveLocaleTab('en');
    setIsProgramModalOpen(true);
  };

  const openEditProgramModal = (prog: CulturalExchangeProgram) => {
    setEditingProgramId(prog.id);
    setProgramForm({
      titleEn: prog.titleEn || '',
      titleAr: prog.titleAr || '',
      titleZh: prog.titleZh || '',
      titleCkb: prog.titleCkb || '',
      descriptionEn: prog.descriptionEn || '',
      descriptionAr: prog.descriptionAr || '',
      descriptionZh: prog.descriptionZh || '',
      descriptionCkb: prog.descriptionCkb || '',
      detailsEn: prog.detailsEn || '',
      detailsAr: prog.detailsAr || '',
      detailsZh: prog.detailsZh || '',
      detailsCkb: prog.detailsCkb || '',
      categoryId: prog.categoryId,
      institutionName: prog.institutionName || '',
      coverImage: prog.coverImage || '',
      eventDate: prog.eventDate || '',
      programStartDate: prog.programStartDate || '',
      programEndDate: prog.programEndDate || '',
      applicationDeadline: prog.applicationDeadline || '',
      eligibility: prog.eligibility || '',
      contactUrl: prog.contactUrl || '',
      applicationUrl: prog.applicationUrl || '',
      slug: prog.slug || '',
      featured: prog.featured,
      order: prog.order
    });
    setActiveLocaleTab('en');
    setIsProgramModalOpen(true);
  };

  const closeProgramModal = () => {
    setIsProgramModalOpen(false);
    setEditingProgramId(null);
  };

  const openNewCategoryModal = () => {
    setEditingCategoryId(null);
    setCategoryForm({
      nameEn: '',
      nameAr: '',
      nameZh: '',
      nameCkb: '',
      slug: '',
      order: (categories.length + 1) * 10
    });
    setIsCategoryModalOpen(true);
  };

  const openEditCategoryModal = (cat: CulturalExchangeCategory) => {
    setEditingCategoryId(cat.id);
    setCategoryForm({
      nameEn: cat.nameEn || '',
      nameAr: cat.nameAr || '',
      nameZh: cat.nameZh || '',
      nameCkb: cat.nameCkb || '',
      slug: cat.slug || '',
      order: cat.order || 0
    });
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setEditingCategoryId(null);
  };

  const handleProgramSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!programForm.titleEn.trim()) {
      showNotification('error', 'English title is required');
      return;
    }
    if (!programForm.categoryId) {
      showNotification('error', 'Please select a valid category');
      return;
    }
    saveProgramMutation.mutate(programForm);
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.nameEn.trim()) {
      showNotification('error', 'English category name is required');
      return;
    }
    saveCategoryMutation.mutate(categoryForm);
  };

  return (
    <div className="space-y-6 pb-16 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 p-6 rounded-2xl shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-800 dark:text-brand-300 flex items-center justify-center font-bold">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-serif text-paper-950 dark:text-paper-50 flex items-center gap-2">
              Sino-Iraqi Cultural & Educational Exchange
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-800 dark:text-brand-300 font-semibold border border-brand-200 dark:border-brand-900">
                Full CRUD Desk
              </span>
            </h1>
            <p className="text-sm text-paper-600 dark:text-paper-400 mt-0.5">
              Manage university partnerships, scholarships, school exchanges, arts residencies, and custom subsection categories.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === 'programs' ? (
            <button
              onClick={openNewProgramModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-paper-50 font-medium text-sm transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create Exchange Program</span>
            </button>
          ) : (
            <button
              onClick={openNewCategoryModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-paper-950 hover:bg-black dark:bg-paper-100 dark:hover:bg-paper-50 text-paper-50 dark:text-paper-950 font-medium text-sm transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Subcategory</span>
            </button>
          )}
        </div>
      </div>

      {/* Notification Toast */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="p-4 rounded-xl text-sm flex items-center gap-3 border bg-paper-100 dark:bg-paper-850 border-paper-300 dark:border-paper-700 text-paper-900 dark:text-paper-100 shadow-xs"
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-brand-700 dark:text-brand-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-brand-800 dark:text-brand-400" />
          )}
          <span className="font-medium">{feedback.message}</span>
        </motion.div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-paper-200 dark:border-paper-800">
        <button
          onClick={() => setActiveTab('programs')}
          className={`pb-3 px-4 text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'programs'
              ? 'border-brand-800 text-brand-800 dark:text-brand-400'
              : 'border-transparent text-paper-500 hover:text-paper-800 dark:hover:text-paper-300'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Exchange Programs ({programs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-3 px-4 text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'categories'
              ? 'border-brand-800 text-brand-800 dark:text-brand-400'
              : 'border-transparent text-paper-500 hover:text-paper-800 dark:hover:text-paper-300'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Subsections & Categories ({categories.length})</span>
        </button>
      </div>

      {/* TAB 1: PROGRAMS MANAGEMENT */}
      {activeTab === 'programs' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-paper-50 dark:bg-paper-900 p-4 rounded-xl border border-paper-200 dark:border-paper-800">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-paper-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search programs or universities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border border-paper-200 dark:border-paper-700 bg-paper-100 dark:bg-paper-800 focus:outline-none focus:ring-2 focus:ring-brand-500 text-paper-950 dark:text-paper-50"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              <span className="text-xs text-paper-500 whitespace-nowrap">Filter Subsection:</span>
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="text-sm px-3 py-1.5 rounded-lg border border-paper-200 dark:border-paper-700 bg-paper-100 dark:bg-paper-800 focus:outline-none focus:ring-2 focus:ring-brand-500 text-paper-950 dark:text-paper-50"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Programs Table / Cards */}
          {isProgramsLoading ? (
            <div className="p-12 text-center text-paper-500 flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-brand-800 dark:text-brand-400" />
              <span>Loading exchange programs catalog...</span>
            </div>
          ) : programs.length === 0 ? (
            <div className="bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 p-12 rounded-2xl text-center">
              <GraduationCap className="w-12 h-12 mx-auto text-paper-400 mb-3" />
              <h3 className="text-base font-semibold text-paper-950 dark:text-paper-50">No exchange programs found</h3>
              <p className="text-sm text-paper-500 max-w-sm mx-auto mt-1">
                There are no programs matching your search criteria. Create one using the button above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {programs.map((prog) => {
                const isEducational = prog.category?.slug === 'educational-exchange';
                const isHigherEd = prog.category?.slug === 'higher-education-university';

                return (
                  <div
                    key={prog.id}
                    className="bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image header with category pill */}
                      <div className="relative h-44 w-full bg-paper-100 dark:bg-paper-800 overflow-hidden">
                        <img
                          src={prog.coverImage}
                          alt={prog.titleEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-paper-950/80 via-transparent to-transparent" />

                        {/* Category tag */}
                        <div className="absolute top-3 left-3">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md border ${
                            isHigherEd
                              ? 'bg-brand-100 text-brand-900 border-brand-300 dark:bg-brand-950 dark:text-brand-200'
                              : isEducational
                              ? 'bg-brand-800 text-paper-50 border-brand-700 dark:bg-brand-900 dark:text-brand-100'
                              : 'bg-paper-100 text-paper-900 border-paper-300 dark:bg-paper-850 dark:text-paper-100'
                          }`}>
                            {prog.category?.nameEn || 'General Exchange'}
                          </span>
                        </div>

                        {/* Featured star toggle */}
                        <button
                          onClick={() => toggleFeaturedMutation.mutate({ id: prog.id, featured: !prog.featured })}
                          className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition ${
                            prog.featured
                              ? 'bg-brand-800 text-paper-50 shadow-xs'
                              : 'bg-paper-950/60 text-paper-50/70 hover:text-paper-50'
                          }`}
                          title={prog.featured ? 'Featured on Homepage' : 'Mark as Featured'}
                        >
                          <Star className={`w-4 h-4 ${prog.featured ? 'fill-current' : ''}`} />
                        </button>

                        {/* Institution banner */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-paper-50 text-xs font-medium truncate drop-shadow-xs font-serif">
                          <Building2 className="w-3.5 h-3.5 shrink-0 text-brand-300" />
                          <span className="truncate">{prog.institutionName}</span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-xs text-paper-500">
                          <span className="font-mono">Order: #{prog.order}</span>
                          {prog.applicationDeadline && (
                            <span className="text-brand-800 dark:text-brand-400 font-medium">
                              Deadline: {prog.applicationDeadline}
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold font-serif text-paper-950 dark:text-paper-50 text-base leading-snug line-clamp-2">
                          {prog.titleEn}
                        </h3>

                        {prog.titleAr && (
                          <p className="text-xs font-medium text-paper-600 dark:text-paper-400 line-clamp-1" dir="rtl">
                            {prog.titleAr}
                          </p>
                        )}

                        <p className="text-xs text-paper-600 dark:text-paper-400 line-clamp-2 mt-1">
                          {prog.descriptionEn}
                        </p>
                      </div>
                    </div>

                    {/* Actions footer */}
                    <div className="p-4 pt-2 border-t border-paper-100 dark:border-paper-800 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-xs text-paper-500">
                        {prog.eventDate && (
                          <span className="flex items-center gap-1 truncate max-w-[140px]">
                            <Calendar className="w-3.5 h-3.5 text-paper-400" />
                            <span className="truncate">{prog.eventDate}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEditProgramModal(prog)}
                          className="p-1.5 rounded-lg text-paper-600 dark:text-paper-300 hover:bg-paper-200 dark:hover:bg-paper-800 transition"
                          title="Edit Program"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${prog.titleEn}"?`)) {
                              deleteProgramMutation.mutate(prog.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-brand-800 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                          title="Delete Program"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CATEGORIES & SUBSECTIONS MANAGEMENT */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          <div className="bg-paper-100 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 p-4 rounded-xl flex items-start gap-3 text-xs text-paper-900 dark:text-paper-200">
            <GraduationCap className="w-5 h-5 text-brand-800 dark:text-brand-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Full Subsection Taxonomy Control</p>
              <p className="mt-0.5 text-paper-700 dark:text-paper-300">
                Educational Exchange Programs and Higher Education & University Partnerships are prioritized by default. You can add new focus tracks, rename titles across 4 languages, or adjust sort order at any time.
              </p>
            </div>
          </div>

          <div className="bg-paper-50 dark:bg-paper-900 rounded-2xl border border-paper-200 dark:border-paper-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-paper-100 dark:bg-paper-800 text-paper-600 dark:text-paper-300 text-xs font-semibold uppercase tracking-wider border-b border-paper-200 dark:border-paper-800">
                  <tr>
                    <th className="py-3 px-4">Order</th>
                    <th className="py-3 px-4">Subsection Name (EN)</th>
                    <th className="py-3 px-4">Arabic (AR)</th>
                    <th className="py-3 px-4">Chinese (ZH)</th>
                    <th className="py-3 px-4">Kurdish (CKB)</th>
                    <th className="py-3 px-4">Slug</th>
                    <th className="py-3 px-4 text-center">Active Programs</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-paper-200 dark:divide-paper-800">
                  {categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-paper-100 dark:hover:bg-paper-800/40 transition">
                      <td className="py-3 px-4 font-mono font-semibold text-xs text-paper-600 dark:text-paper-400">
                        #{cat.order}
                      </td>
                      <td className="py-3 px-4 font-medium text-paper-950 dark:text-paper-50">
                        {cat.nameEn}
                        {(cat.slug === 'educational-exchange' || cat.slug === 'higher-education-university') && (
                          <span className="ml-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-800 dark:text-brand-300 border border-brand-200 dark:border-brand-900">
                            Priority Anchor
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-paper-700 dark:text-paper-300 text-xs" dir="rtl">
                        {cat.nameAr || '—'}
                      </td>
                      <td className="py-3 px-4 text-paper-700 dark:text-paper-300 text-xs">
                        {cat.nameZh || '—'}
                      </td>
                      <td className="py-3 px-4 text-paper-700 dark:text-paper-300 text-xs" dir="rtl">
                        {cat.nameCkb || '—'}
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-paper-500">
                        {cat.slug}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-paper-200 dark:bg-paper-800 text-paper-800 dark:text-paper-200">
                          {cat._count?.programs ?? 0}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEditCategoryModal(cat)}
                            className="p-1.5 rounded-lg text-paper-600 hover:bg-paper-200 dark:hover:bg-paper-800 transition"
                            title="Edit Category"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete category "${cat.nameEn}"? Associated programs will be unlinked or removed.`)) {
                                deleteCategoryMutation.mutate(cat.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-brand-800 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                            title="Delete Category"
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
          </div>
        </div>
      )}

      {/* PROGRAM CREATE / EDIT MODAL */}
      <AnimatePresence>
        {isProgramModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-paper-950/70 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-paper-200 dark:border-paper-800 bg-paper-100 dark:bg-paper-850">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-800 dark:text-brand-300 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold font-serif text-paper-950 dark:text-paper-50">
                      {editingProgramId ? 'Edit Exchange Program' : 'Create New Exchange Program'}
                    </h2>
                    <p className="text-xs text-paper-500">Specify institutional partnership details & multilingual curriculum</p>
                  </div>
                </div>
                <button
                  onClick={closeProgramModal}
                  className="p-1.5 rounded-lg text-paper-400 hover:text-paper-700 dark:hover:text-paper-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleProgramSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
                {/* Basic Institutional Credentials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">
                      Subsection Category *
                    </label>
                    <select
                      value={programForm.categoryId}
                      onChange={(e) => setProgramForm({ ...programForm, categoryId: e.target.value })}
                      required
                      className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nameEn} ({cat.slug})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">
                      Partner Institution(s) *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tsinghua University & University of Baghdad"
                      value={programForm.institutionName}
                      onChange={(e) => setProgramForm({ ...programForm, institutionName: e.target.value })}
                      required
                      className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                    />
                  </div>
                </div>

                {/* Cover Image & Sort Order */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">
                      Cover Image URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={programForm.coverImage}
                        onChange={(e) => setProgramForm({ ...programForm, coverImage: e.target.value })}
                        className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                      />
                      {programForm.coverImage && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-paper-200 dark:border-paper-700 shrink-0">
                          <img src={programForm.coverImage} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">
                      Sort Order / Priority
                    </label>
                    <input
                      type="number"
                      value={programForm.order}
                      onChange={(e) => setProgramForm({ ...programForm, order: parseInt(e.target.value, 10) || 0 })}
                      className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                    />
                  </div>
                </div>

                {/* Multilingual Tabs */}
                <div className="border border-paper-200 dark:border-paper-800 rounded-xl p-4 bg-paper-100/50 dark:bg-paper-850/50 space-y-4">
                  <div className="flex items-center justify-between border-b border-paper-200 dark:border-paper-700 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-paper-600 dark:text-paper-400">
                      Multilingual Content Deck
                    </span>
                    <div className="flex gap-1">
                      {(['en', 'ar', 'zh', 'ckb'] as const).map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setActiveLocaleTab(loc)}
                          className={`text-xs px-2.5 py-1 rounded-md font-semibold uppercase transition ${
                            activeLocaleTab === loc
                              ? 'bg-brand-800 text-paper-50 shadow-xs'
                              : 'bg-paper-50 dark:bg-paper-800 text-paper-600 dark:text-paper-300 hover:bg-paper-200'
                          }`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {activeLocaleTab === 'en' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">Title (English) *</label>
                        <input
                          type="text"
                          value={programForm.titleEn}
                          onChange={(e) => setProgramForm({ ...programForm, titleEn: e.target.value })}
                          required
                          className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">Teaser Excerpt (English)</label>
                        <textarea
                          rows={2}
                          value={programForm.descriptionEn}
                          onChange={(e) => setProgramForm({ ...programForm, descriptionEn: e.target.value })}
                          className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">Full Curriculum / Details (Markdown)</label>
                        <textarea
                          rows={4}
                          value={programForm.detailsEn}
                          onChange={(e) => setProgramForm({ ...programForm, detailsEn: e.target.value })}
                          className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none font-mono text-xs text-paper-950 dark:text-paper-50"
                        />
                      </div>
                    </div>
                  )}

                  {activeLocaleTab === 'ar' && (
                    <div className="space-y-3" dir="rtl">
                      <div>
                        <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">العنوان (العربية)</label>
                        <input
                          type="text"
                          value={programForm.titleAr}
                          onChange={(e) => setProgramForm({ ...programForm, titleAr: e.target.value })}
                          className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">الملخص الترويجي</label>
                        <textarea
                          rows={2}
                          value={programForm.descriptionAr}
                          onChange={(e) => setProgramForm({ ...programForm, descriptionAr: e.target.value })}
                          className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">تفاصيل البرنامج والشروط</label>
                        <textarea
                          rows={4}
                          value={programForm.detailsAr}
                          onChange={(e) => setProgramForm({ ...programForm, detailsAr: e.target.value })}
                          className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                        />
                      </div>
                    </div>
                  )}

                  {activeLocaleTab === 'zh' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">项目中文标题</label>
                        <input
                          type="text"
                          value={programForm.titleZh}
                          onChange={(e) => setProgramForm({ ...programForm, titleZh: e.target.value })}
                          className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">项目简述</label>
                        <textarea
                          rows={2}
                          value={programForm.descriptionZh}
                          onChange={(e) => setProgramForm({ ...programForm, descriptionZh: e.target.value })}
                          className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">培养方案与资助细则</label>
                        <textarea
                          rows={4}
                          value={programForm.detailsZh}
                          onChange={(e) => setProgramForm({ ...programForm, detailsZh: e.target.value })}
                          className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                        />
                      </div>
                    </div>
                  )}

                  {activeLocaleTab === 'ckb' && (
                    <div className="space-y-3" dir="rtl">
                      <div>
                        <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">ناونیشان (کوردی سۆرانی)</label>
                        <input
                          type="text"
                          value={programForm.titleCkb}
                          onChange={(e) => setProgramForm({ ...programForm, titleCkb: e.target.value })}
                          className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">کورتە</label>
                        <textarea
                          rows={2}
                          value={programForm.descriptionCkb}
                          onChange={(e) => setProgramForm({ ...programForm, descriptionCkb: e.target.value })}
                          className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">وردەکارییەکان</label>
                        <textarea
                          rows={4}
                          value={programForm.detailsCkb}
                          onChange={(e) => setProgramForm({ ...programForm, detailsCkb: e.target.value })}
                          className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Deadlines, Eligibility, and External URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">
                      Event Display Date / Cycle
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Fall Intake 2026 or July 15 - Aug 5, 2026"
                      value={programForm.eventDate}
                      onChange={(e) => setProgramForm({ ...programForm, eventDate: e.target.value })}
                      className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">
                      Application Deadline (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. June 30, 2026 (leave empty for ongoing)"
                      value={programForm.applicationDeadline}
                      onChange={(e) => setProgramForm({ ...programForm, applicationDeadline: e.target.value })}
                      className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">
                      Eligibility Overview
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Master's in STEM / High school 15-18"
                      value={programForm.eligibility}
                      onChange={(e) => setProgramForm({ ...programForm, eligibility: e.target.value })}
                      className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">
                      Application URL / Portal Link
                    </label>
                    <input
                      type="text"
                      placeholder="https://... or /en/contact?inquiry=..."
                      value={programForm.applicationUrl}
                      onChange={(e) => setProgramForm({ ...programForm, applicationUrl: e.target.value })}
                      className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                    />
                  </div>
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="featuredCheckbox"
                    checked={programForm.featured}
                    onChange={(e) => setProgramForm({ ...programForm, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-800 focus:ring-brand-500 border-paper-300"
                  />
                  <label htmlFor="featuredCheckbox" className="text-sm font-medium text-paper-800 dark:text-paper-200 select-none">
                    Feature prominently on Homepage Cultural Teaser
                  </label>
                </div>

                {/* Submit buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-paper-200 dark:border-paper-800">
                  <button
                    type="button"
                    onClick={closeProgramModal}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-paper-600 dark:text-paper-400 hover:bg-paper-100 dark:hover:bg-paper-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saveProgramMutation.isPending}
                    className="px-5 py-2 rounded-xl text-sm font-semibold bg-brand-800 hover:bg-brand-700 text-paper-50 transition shadow-xs disabled:opacity-50"
                  >
                    {saveProgramMutation.isPending ? 'Saving...' : editingProgramId ? 'Update Program' : 'Publish Program'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CATEGORY CREATE / EDIT MODAL */}
      <AnimatePresence>
        {isCategoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-paper-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-paper-200 dark:border-paper-800 bg-paper-100 dark:bg-paper-850">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-950 text-brand-800 dark:text-brand-300 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h2 className="font-bold font-serif text-paper-950 dark:text-paper-50">
                    {editingCategoryId ? 'Edit Subsection Category' : 'Add Subsection Category'}
                  </h2>
                </div>
                <button
                  onClick={closeCategoryModal}
                  className="p-1.5 rounded-lg text-paper-400 hover:text-paper-700 dark:hover:text-paper-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCategorySubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">
                    English Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={categoryForm.nameEn}
                    onChange={(e) => setCategoryForm({ ...categoryForm, nameEn: e.target.value })}
                    placeholder="e.g. Higher Education & University Partnerships"
                    className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">
                    Arabic Name (AR)
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={categoryForm.nameAr}
                    onChange={(e) => setCategoryForm({ ...categoryForm, nameAr: e.target.value })}
                    className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">
                    Chinese Name (ZH)
                  </label>
                  <input
                    type="text"
                    value={categoryForm.nameZh}
                    onChange={(e) => setCategoryForm({ ...categoryForm, nameZh: e.target.value })}
                    className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">
                    Kurdish Name (CKB)
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={categoryForm.nameCkb}
                    onChange={(e) => setCategoryForm({ ...categoryForm, nameCkb: e.target.value })}
                    className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. higher-education"
                      value={categoryForm.slug}
                      onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                      className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none font-mono text-paper-950 dark:text-paper-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-paper-700 dark:text-paper-300 mb-1">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      value={categoryForm.order}
                      onChange={(e) => setCategoryForm({ ...categoryForm, order: parseInt(e.target.value, 10) || 0 })}
                      className="w-full text-sm px-3 py-2 rounded-xl border border-paper-200 dark:border-paper-700 bg-paper-50 dark:bg-paper-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-paper-950 dark:text-paper-50"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-paper-200 dark:border-paper-800">
                  <button
                    type="button"
                    onClick={closeCategoryModal}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-paper-600 dark:text-paper-400 hover:bg-paper-100 dark:hover:bg-paper-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saveCategoryMutation.isPending}
                    className="px-5 py-2 rounded-xl text-sm font-semibold bg-brand-800 hover:bg-brand-700 text-paper-50 transition shadow-xs disabled:opacity-50"
                  >
                    {saveCategoryMutation.isPending ? 'Saving...' : editingCategoryId ? 'Update Category' : 'Create Category'}
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
