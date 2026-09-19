import React, { useState, useEffect } from 'react';
import { apiFetch } from '../lib/api';
import { 
  Plus, Edit2, Trash2, X, Save, Building2, 
  DollarSign, MapPin, Tag, RefreshCw, CheckCircle2,
  ExternalLink, Sparkles, Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BusinessOpportunity {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  titleZh: string;
  titleCkb: string;
  summaryEn: string;
  summaryAr: string;
  summaryZh: string;
  summaryCkb: string;
  contentEn: string;
  contentAr: string;
  contentZh: string;
  contentCkb: string;
  category: string;
  sector: string;
  investmentValue: string;
  location: string;
  coverImage: string;
  featured: boolean;
  order: number;
  status: string;
  contactEmail?: string;
  createdAt: string;
  updatedAt: string;
}

const CATEGORIES = [
  { value: 'INVESTMENT', label: 'General Sovereign Investment' },
  { value: 'ENERGY', label: 'Energy & Hydrocarbons / Renewables' },
  { value: 'INFRASTRUCTURE', label: 'Civil Infrastructure & Logistics' },
  { value: 'AGRICULTURE', label: 'Agritech & Food Security' },
  { value: 'TECHNOLOGY', label: 'Telecom, Digital & 5G Backbone' },
  { value: 'INDUSTRIAL_ZONES', label: 'Industrial Zones & Metallurgy' },
  { value: 'LEGAL_ADVISORY', label: 'Legal, Customs & Treaty Desk' },
  { value: 'FINANCIAL_SERVICES', label: 'Currency Settlement & Financing' }
];

const STATUSES = ['OPEN', 'ACTIVE', 'UNDER_REVIEW'];

export default function AdminBusiness() {
  const [opportunities, setOpportunities] = useState<BusinessOpportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'ar' | 'zh' | 'ckb'>('en');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
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
    category: 'INVESTMENT',
    sector: '',
    investmentValue: '',
    location: '',
    coverImage: '',
    featured: false,
    order: 0,
    status: 'OPEN',
    contactEmail: 'business@iraqi-chineseagency.com'
  });

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    setIsLoading(true);
    try {
      const res = await apiFetch('/api/admin/business-opportunities');
      if (res.ok) {
        const data = await res.json();
        setOpportunities(data);
      }
    } catch (err) {
      console.error('Failed to fetch business opportunities', err);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
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
      category: 'INVESTMENT',
      sector: '',
      investmentValue: '',
      location: '',
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      featured: false,
      order: opportunities.length + 1,
      status: 'OPEN',
      contactEmail: 'business@iraqi-chineseagency.com'
    });
    setActiveLangTab('en');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (opp: BusinessOpportunity) => {
    setEditingId(opp.id);
    setFormData({
      titleEn: opp.titleEn,
      titleAr: opp.titleAr || '',
      titleZh: opp.titleZh || '',
      titleCkb: opp.titleCkb || '',
      summaryEn: opp.summaryEn || '',
      summaryAr: opp.summaryAr || '',
      summaryZh: opp.summaryZh || '',
      summaryCkb: opp.summaryCkb || '',
      contentEn: opp.contentEn || '',
      contentAr: opp.contentAr || '',
      contentZh: opp.contentZh || '',
      contentCkb: opp.contentCkb || '',
      category: opp.category || 'INVESTMENT',
      sector: opp.sector || '',
      investmentValue: opp.investmentValue || '',
      location: opp.location || '',
      coverImage: opp.coverImage || '',
      featured: opp.featured,
      order: opp.order || 0,
      status: opp.status || 'OPEN',
      contactEmail: opp.contactEmail || 'business@iraqi-chineseagency.com'
    });
    setActiveLangTab('en');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setErrorMsg('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleEn.trim()) {
      setErrorMsg('English title is required');
      setActiveLangTab('en');
      return;
    }

    setIsSaving(true);
    setErrorMsg('');
    try {
      const url = editingId 
        ? `/api/admin/business-opportunities/${editingId}`
        : '/api/admin/business-opportunities';
      const method = editingId ? 'PUT' : 'POST';

      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save opportunity');
      }

      setSuccessMsg(editingId ? 'Opportunity updated successfully!' : 'New opportunity published!');
      setTimeout(() => setSuccessMsg(''), 4000);
      closeModal();
      fetchOpportunities();
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await apiFetch(`/api/admin/business-opportunities/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setOpportunities(prev => prev.filter(item => item.id !== id));
        setSuccessMsg('Opportunity removed.');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error('Failed to delete opportunity', err);
    }
  };

  const handleReseed = async () => {
    if (!window.confirm('Restore initial 8 bilateral business opportunities?')) return;
    try {
      const res = await apiFetch('/api/admin/business-opportunities/seed', {
        method: 'POST'
      });
      if (res.ok) {
        fetchOpportunities();
        setSuccessMsg('Default business opportunities refreshed.');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error('Failed to reseed opportunities', err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-800/10 text-brand-800 rounded-xl">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                ICA Business & Sovereign Opportunities
              </h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Manage bilateral investment projects, industrial zones, and sovereign trade opportunities.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReseed}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
            title="Reseed standard bilateral entries"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-brand-800 hover:bg-brand-900 text-white text-sm font-bold rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Opportunity
          </button>
        </div>
      </div>

      {/* Alerts */}
      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl flex items-center gap-3 text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          {successMsg}
        </div>
      )}

      {/* Opportunities Table / Cards */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20 text-neutral-400">
          <RefreshCw className="w-8 h-8 animate-spin" />
        </div>
      ) : opportunities.length === 0 ? (
        <div className="text-center py-16 bg-neutral-50 dark:bg-neutral-900/50 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl p-8">
          <Building2 className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">No Business Opportunities Found</h3>
          <p className="text-sm text-neutral-500 max-w-md mx-auto mt-1 mb-6">
            There are currently no active sovereign business records in the database.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleReseed}
              className="px-4 py-2 bg-brand-800 text-white text-xs font-bold rounded-lg"
            >
              Seed 8 Bilateral Opportunities
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="group bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Card Cover & Header */}
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                  {opp.coverImage ? (
                    <img 
                      src={opp.coverImage} 
                      alt={opp.titleEn} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                      <ImageIcon className="w-10 h-10" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider bg-black/75 text-white backdrop-blur-md rounded-md">
                      {opp.category}
                    </span>
                    {opp.featured && (
                      <span className="px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider bg-brand-800 text-white rounded-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-md uppercase tracking-wider ${
                      opp.status === 'OPEN' 
                        ? 'bg-emerald-500/90 text-white'
                        : opp.status === 'ACTIVE'
                        ? 'bg-blue-500/90 text-white'
                        : 'bg-amber-500/90 text-white'
                    }`}>
                      {opp.status}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-brand-800 dark:text-brand-400 mb-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{opp.sector || 'Sovereign Corridor'}</span>
                  </div>

                  <h3 className="font-bold text-neutral-900 dark:text-white text-base leading-snug line-clamp-2 mb-2">
                    {opp.titleEn}
                  </h3>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed mb-4">
                    {opp.summaryEn || opp.summaryAr || opp.summaryZh || opp.contentEn}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-neutral-100 dark:border-neutral-700/60 text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center gap-1.5 truncate">
                      <DollarSign className="w-3.5 h-3.5 text-brand-700 flex-shrink-0" />
                      <span className="font-semibold text-neutral-900 dark:text-neutral-200 truncate">
                        {opp.investmentValue || 'Sovereign Scale'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
                      <span className="truncate">{opp.location || 'Iraq'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-5 py-3.5 bg-neutral-50/80 dark:bg-neutral-800/80 border-t border-neutral-100 dark:border-neutral-700 flex items-center justify-between text-xs">
                <span className="text-neutral-400 font-mono">Order: #{opp.order}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(opp)}
                    className="p-1.5 text-neutral-600 hover:text-brand-800 dark:text-neutral-300 dark:hover:text-brand-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-700 rounded-md transition-colors"
                    title="Edit opportunity"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(opp.id, opp.titleEn)}
                    className="p-1.5 text-neutral-600 hover:text-rose-600 dark:text-neutral-300 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-md transition-colors"
                    title="Delete opportunity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Modal with 4-Locale Support */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-800/10 text-brand-800 rounded-lg">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                      {editingId ? 'Edit Business Opportunity' : 'Create Business Opportunity'}
                    </h2>
                    <p className="text-xs text-neutral-500">Supports all 4 locales (en, ar, zh, ckb)</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-200/50 dark:hover:bg-neutral-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-6">
                {errorMsg && (
                  <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-xl text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                {/* Common Project Attributes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-neutral-50 dark:bg-neutral-800/30 rounded-xl border border-neutral-100 dark:border-neutral-800">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:border-brand-700"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Sector / Sub-domain
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Petrochemicals & Gas"
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:border-brand-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Investment Value / Scale
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. $1.4 Billion or Retainer"
                      value={formData.investmentValue}
                      onChange={(e) => setFormData({ ...formData, investmentValue: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:border-brand-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Location / Region
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Basra / Al-Faw"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:border-brand-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:border-brand-700"
                    >
                      {STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Order / Priority
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      className="w-full text-xs px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:border-brand-700"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Cover Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.coverImage}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:border-brand-700"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-hidden rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-800"></div>
                      <span className="ml-2 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                        Feature on Homepage
                      </span>
                    </label>
                  </div>
                </div>

                {/* 4-Locale Tabs */}
                <div>
                  <div className="flex border-b border-neutral-200 dark:border-neutral-700 mb-4 gap-1">
                    {[
                      { code: 'en', label: 'English (EN)' },
                      { code: 'ar', label: 'العربية (AR)' },
                      { code: 'zh', label: '中文 (ZH)' },
                      { code: 'ckb', label: 'کوردی (CKB)' },
                    ].map((tab) => (
                      <button
                        key={tab.code}
                        type="button"
                        onClick={() => setActiveLangTab(tab.code as any)}
                        className={`px-4 py-2 text-xs font-bold transition-all border-b-2 ${
                          activeLangTab === tab.code
                            ? 'border-brand-800 text-brand-800 dark:text-brand-400 bg-brand-800/5'
                            : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Contents */}
                  {activeLangTab === 'en' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                          Title (English) <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.titleEn}
                          onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                          className="w-full text-xs px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:border-brand-700 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                          Summary / Executive Briefing (English)
                        </label>
                        <textarea
                          rows={2}
                          value={formData.summaryEn}
                          onChange={(e) => setFormData({ ...formData, summaryEn: e.target.value })}
                          className="w-full text-xs px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:border-brand-700"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                          Full Prospectus & Sovereign Incentives (English)
                        </label>
                        <textarea
                          rows={4}
                          value={formData.contentEn}
                          onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
                          className="w-full text-xs px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:border-brand-700"
                        />
                      </div>
                    </div>
                  )}

                  {activeLangTab === 'ar' && (
                    <div className="space-y-4" dir="rtl">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                          العنوان (العربية)
                        </label>
                        <input
                          type="text"
                          value={formData.titleAr}
                          onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                          className="w-full text-xs px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:border-brand-700 font-medium text-right"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                          الملخص التنفيذي (العربية)
                        </label>
                        <textarea
                          rows={2}
                          value={formData.summaryAr}
                          onChange={(e) => setFormData({ ...formData, summaryAr: e.target.value })}
                          className="w-full text-xs px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:border-brand-700 text-right"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                          تفاصيل الكراسة الاستثمارية والضمانات السيادية (العربية)
                        </label>
                        <textarea
                          rows={4}
                          value={formData.contentAr}
                          onChange={(e) => setFormData({ ...formData, contentAr: e.target.value })}
                          className="w-full text-xs px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:border-brand-700 text-right"
                        />
                      </div>
                    </div>
                  )}

                  {activeLangTab === 'zh' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                          项目标题 (中文)
                        </label>
                        <input
                          type="text"
                          value={formData.titleZh}
                          onChange={(e) => setFormData({ ...formData, titleZh: e.target.value })}
                          className="w-full text-xs px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:border-brand-700 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                          项目摘要 / 执行概述 (中文)
                        </label>
                        <textarea
                          rows={2}
                          value={formData.summaryZh}
                          onChange={(e) => setFormData({ ...formData, summaryZh: e.target.value })}
                          className="w-full text-xs px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:border-brand-700"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                          主权招商细则与中资保障条款 (中文)
                        </label>
                        <textarea
                          rows={4}
                          value={formData.contentZh}
                          onChange={(e) => setFormData({ ...formData, contentZh: e.target.value })}
                          className="w-full text-xs px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:border-brand-700"
                        />
                      </div>
                    </div>
                  )}

                  {activeLangTab === 'ckb' && (
                    <div className="space-y-4" dir="rtl">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                          ناونیشان (کوردی)
                        </label>
                        <input
                          type="text"
                          value={formData.titleCkb}
                          onChange={(e) => setFormData({ ...formData, titleCkb: e.target.value })}
                          className="w-full text-xs px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:border-brand-700 font-medium text-right"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                          کورتەی جێبەجێکردن (کوردی)
                        </label>
                        <textarea
                          rows={2}
                          value={formData.summaryCkb}
                          onChange={(e) => setFormData({ ...formData, summaryCkb: e.target.value })}
                          className="w-full text-xs px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:border-brand-700 text-right"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                          وردەکارییەکانی پڕۆژە و گەرەنتییە سیادییەکان (کوردی)
                        </label>
                        <textarea
                          rows={4}
                          value={formData.contentCkb}
                          onChange={(e) => setFormData({ ...formData, contentCkb: e.target.value })}
                          className="w-full text-xs px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:border-brand-700 text-right"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 px-5 py-2 bg-brand-800 hover:bg-brand-900 text-white text-xs font-bold rounded-lg shadow-sm disabled:opacity-60 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Saving...' : 'Save Opportunity'}
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
