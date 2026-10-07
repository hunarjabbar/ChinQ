import React, { useState } from 'react';
import { 
  Menu, Compass, Plus, Edit, Trash2, RotateCcw, ArrowUp, ArrowDown, 
  Search, Filter, Globe, Shield, CheckCircle, AlertCircle, Eye, ExternalLink,
  Save, X, Layout, Smartphone, ChevronRight
} from 'lucide-react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { useAuthStore } from '../../store/useAuthStore';
import { NavigationItem, NavigationSection, NavigationPortal } from '../../types/navigation';
import { Locale } from '../../types';

interface NavigationManagerSectionProps {
  lang?: Locale;
}

export function NavigationManagerSection({ lang = 'en' }: NavigationManagerSectionProps) {
  const { user } = useAuthStore();
  const { 
    items, 
    addItem, 
    updateItem, 
    softDeleteItem, 
    restoreItem, 
    deleteItem, 
    moveItem 
  } = useNavigationStore();

  const [activeTab, setActiveTab] = useState<'all' | NavigationSection>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPortal, setFilterPortal] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'draft' | 'archived'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);
  
  const [activeFormTab, setActiveFormTab] = useState<'content' | 'style'>('content');
  
  // Form State
  const [formData, setFormData] = useState({
    section: 'header' as NavigationSection,
    labelEn: '',
    labelAr: '',
    labelZh: '',
    labelCkb: '',
    slug: '',
    href: '',
    icon: 'Link',
    portal: 'all' as NavigationPortal,
    requiredScope: 'public',
    status: 'active' as 'active' | 'draft' | 'archived',
    isExternal: false,
    isLive: false,
    column: 'about' as any,
    bgColor: '',
    textColor: ''
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const userRole = (user?.role || 'SUPERADMIN').toUpperCase();
  const canEdit = ['SUPERADMIN', 'ADMIN', 'EDITOR'].includes(userRole);
  const isSuperAdmin = userRole === 'SUPERADMIN';

  // Filtered Items
  const filteredItems = items.filter(item => {
    if (activeTab !== 'all' && item.section !== activeTab) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (filterPortal !== 'all' && item.portal !== filterPortal) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchLabel = Object.values(item.label).some(l => l?.toLowerCase().includes(q));
      const matchSlug = item.slug.toLowerCase().includes(q);
      const matchHref = item.href.toLowerCase().includes(q);
      if (!matchLabel && !matchSlug && !matchHref) return false;
    }
    return true;
  }).sort((a, b) => a.displayOrder - b.displayOrder);

  const openCreateModal = () => {
    setEditingItem(null);
    setActiveFormTab('content');
    setFormData({
      section: activeTab === 'all' ? 'header' : activeTab,
      labelEn: '',
      labelAr: '',
      labelZh: '',
      labelCkb: '',
      slug: '',
      href: '',
      icon: 'Link',
      portal: 'all',
      requiredScope: 'public',
      status: 'active',
      isExternal: false,
      isLive: false,
      column: 'about',
      bgColor: '',
      textColor: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: NavigationItem) => {
    setEditingItem(item);
    setActiveFormTab('content');
    setFormData({
      section: item.section,
      labelEn: item.label.en || '',
      labelAr: item.label.ar || '',
      labelZh: item.label.zh || '',
      labelCkb: item.label.ckb || '',
      slug: item.slug,
      href: item.href,
      icon: item.icon || 'Link',
      portal: item.portal,
      requiredScope: item.requiredScope || 'public',
      status: item.status,
      isExternal: !!item.isExternal,
      isLive: !!item.isLive,
      column: item.column || 'about',
      bgColor: item.styleOverrides?.backgroundColor || '',
      textColor: item.styleOverrides?.textColor || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.slug || !formData.href || !formData.labelEn) {
      alert('Please fill out required fields: English Label, Slug, and Href');
      return;
    }

    const payload = {
      section: formData.section,
      slug: formData.slug.trim(),
      href: formData.href.trim(),
      icon: formData.icon,
      portal: formData.portal,
      requiredScope: formData.requiredScope,
      status: formData.status,
      isExternal: formData.isExternal,
      column: formData.section === 'footer' ? formData.column : undefined,
      label: {
        en: formData.labelEn,
        ar: formData.labelAr || formData.labelEn,
        zh: formData.labelZh || formData.labelEn,
        ckb: formData.labelCkb || formData.labelEn
      },
      styleOverrides: {
        backgroundColor: formData.bgColor || null,
        textColor: formData.textColor || null
      }
    };

    if (editingItem) {
      updateItem(editingItem.id, payload);
      showNotice(`Navigation item "${formData.labelEn}" updated successfully.`);
    } else {
      addItem(payload);
      showNotice(`New navigation item "${formData.labelEn}" added to ${formData.section}.`);
    }

    setIsModalOpen(false);
  };

  const handleSoftDelete = (id: string, label: string) => {
    if (confirm(`Archive navigation item "${label}"? It will no longer appear on public viewports.`)) {
      softDeleteItem(id);
      showNotice(`Item "${label}" marked as archived.`);
    }
  };

  const handleRestore = (id: string, label: string) => {
    restoreItem(id);
    showNotice(`Item "${label}" restored to active status.`);
  };

  const handlePermanentDelete = (id: string, label: string) => {
    if (!isSuperAdmin) {
      alert('Security Clearance Error: Only SUPERADMIN can permanently destroy navigation entries.');
      return;
    }
    if (confirm(`PERMANENT DESTRUCTION WARNING: Permanently delete "${label}" from database? This cannot be undone.`)) {
      deleteItem(id);
      showNotice(`Item "${label}" permanently destroyed.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
            <Compass size={14} />
            <span>Navigation Architecture • Global CRUD Controller</span>
          </div>
          <h2 className="text-xl font-black uppercase text-white">Global Unified Navigation Hub</h2>
          <p className="text-xs text-neutral-400">
            Centrally manage headers, footers, mobile drawers, and sidebars across all 4 languages (EN, AR, ZH, CKB).
          </p>
        </div>

        <div className="flex items-center gap-3">
          {canEdit ? (
            <button
              onClick={openCreateModal}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
            >
              <Plus size={14} />
              <span>Add Navigation Node</span>
            </button>
          ) : (
            <span className="text-xs px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono">
              Role: VIEWER (Read-Only)
            </span>
          )}
        </div>
      </div>

      {/* Notifications */}
      {notification && (
        <div className="p-3 bg-emerald-950 border border-emerald-500 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Section Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-neutral-800 pb-3">
        {(['all', 'header', 'footer', 'sidebar', 'mobile'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === tab
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            {tab === 'header' && <Layout size={13} />}
            {tab === 'footer' && <Compass size={13} />}
            {tab === 'mobile' && <Smartphone size={13} />}
            <span>{tab}</span>
            <span className="text-[10px] bg-neutral-950/60 px-1.5 py-0.2 rounded-md font-mono">
              {tab === 'all' ? items.length : items.filter(i => i.section === tab).length}
            </span>
          </button>
        ))}
      </div>

      {/* Filters & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search by label, slug, or href..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
          />
        </div>

        <select
          value={filterPortal}
          onChange={e => setFilterPortal(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
        >
          <option value="all">All Portals</option>
          <option value="ica-public">ICA Public</option>
          <option value="newsroom">Newsroom</option>
          <option value="live">Live Stream</option>
          <option value="settlement">Settlement Rail</option>
          <option value="cise">CISE Institute</option>
          <option value="summit">Summit 2026</option>
        </select>

        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as any)}
          className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active Only</option>
          <option value="draft">Draft Only</option>
          <option value="archived">Archived Only</option>
        </select>
      </div>

      {/* Navigation Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-neutral-950 text-neutral-400 font-bold uppercase tracking-wider border-b border-neutral-800">
              <tr>
                <th className="p-3 w-12 text-center">Ord</th>
                <th className="p-3">Section</th>
                <th className="p-3">Labels (EN / AR / ZH / CKB)</th>
                <th className="p-3">Route Href</th>
                <th className="p-3">Portal</th>
                <th className="p-3">Scope</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 font-mono text-[11px]">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-neutral-500 italic">
                    No navigation items found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-neutral-850/60 transition-colors">
                    <td className="p-3 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveItem(item.id, 'up')}
                          disabled={!canEdit}
                          className="hover:text-white text-neutral-500 disabled:opacity-30 cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp size={11} />
                        </button>
                        <span className="font-bold text-neutral-300">{item.displayOrder}</span>
                        <button
                          type="button"
                          onClick={() => moveItem(item.id, 'down')}
                          disabled={!canEdit}
                          className="hover:text-white text-neutral-500 disabled:opacity-30 cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown size={11} />
                        </button>
                      </div>
                    </td>

                    <td className="p-3 font-sans">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-neutral-800 text-neutral-300 border border-neutral-700">
                        {item.section}
                      </span>
                    </td>

                    <td className="p-3 font-sans">
                      <div className="space-y-0.5">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{item.label.en}</span>
                          {item.isLive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                          )}
                        </div>
                        <div className="text-[10px] text-neutral-400 flex items-center gap-2">
                          <span dir="rtl">{item.label.ar || '—'}</span>
                          <span>•</span>
                          <span>{item.label.zh || '—'}</span>
                          <span>•</span>
                          <span dir="rtl">{item.label.ckb || '—'}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3">
                      <div className="flex items-center gap-1 text-red-400 hover:underline">
                        <span>{item.href}</span>
                        {item.isExternal && <ExternalLink size={10} />}
                      </div>
                    </td>

                    <td className="p-3">
                      <span className="text-neutral-400">{item.portal}</span>
                    </td>

                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.requiredScope === 'superadmin' ? 'bg-red-950 text-red-400 border border-red-800' :
                        item.requiredScope === 'admin' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                        item.requiredScope === 'editor' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                        'bg-neutral-800 text-neutral-400'
                      }`}>
                        {item.requiredScope || 'public'}
                      </span>
                    </td>

                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        item.status === 'active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        item.status === 'draft' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                        'bg-neutral-800 text-neutral-500 border border-neutral-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>

                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {canEdit && (
                          <button
                            type="button"
                            onClick={() => openEditModal(item)}
                            className="p-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-200 hover:text-white transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit size={12} />
                          </button>
                        )}

                        {item.status === 'archived' ? (
                          canEdit && (
                            <button
                              type="button"
                              onClick={() => handleRestore(item.id, item.label.en)}
                              className="p-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 rounded-lg text-emerald-300 transition-colors cursor-pointer"
                              title="Restore to Active"
                            >
                              <RotateCcw size={12} />
                            </button>
                          )
                        ) : (
                          canEdit && (
                            <button
                              type="button"
                              onClick={() => handleSoftDelete(item.id, item.label.en)}
                              className="p-1.5 bg-neutral-800 hover:bg-amber-950 text-neutral-400 hover:text-amber-300 rounded-lg transition-colors cursor-pointer"
                              title="Soft Delete (Archive)"
                            >
                              <Trash2 size={12} />
                            </button>
                          )
                        )}

                        {isSuperAdmin && (
                          <button
                            type="button"
                            onClick={() => handlePermanentDelete(item.id, item.label.en)}
                            className="p-1.5 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 rounded-lg transition-colors cursor-pointer"
                            title="Superadmin Permanent Delete"
                          >
                            <Trash2 size={12} className="text-red-400" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl p-6 space-y-5 my-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-black uppercase text-white flex items-center gap-2">
                <Compass size={18} className="text-red-500" />
                <span>{editingItem ? 'Edit Navigation Node' : 'Create Navigation Node'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-500 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
              <button
                type="button"
                onClick={() => setActiveFormTab('content')}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase cursor-pointer ${
                  activeFormTab === 'content' ? 'bg-red-600 text-white' : 'text-neutral-500 hover:text-white hover:bg-neutral-800'
                }`}
              >
                Content
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('style')}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase cursor-pointer ${
                  activeFormTab === 'style' ? 'bg-red-600 text-white' : 'text-neutral-500 hover:text-white hover:bg-neutral-800'
                }`}
              >
                Style & Appearance
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {activeFormTab === 'content' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">Section</label>
                  <select
                    value={formData.section}
                    onChange={e => setFormData(prev => ({ ...prev, section: e.target.value as any }))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="header">Header Primary Nav</option>
                    <option value="footer">Footer Directory</option>
                    <option value="sidebar">Sidebar Menu</option>
                    <option value="mobile">Mobile Drawer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="draft">Draft (Hidden)</option>
                    <option value="archived">Archived (Soft Deleted)</option>
                  </select>
                </div>
              </div>

              {/* Multilingual Labels */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 block">
                  Quad-Lingual Display Labels
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-neutral-400 font-bold mb-1">English (EN)*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Digital Silk Road"
                      value={formData.labelEn}
                      onChange={e => setFormData(prev => ({ ...prev, labelEn: e.target.value }))}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-neutral-400 font-bold mb-1">Arabic (AR)</label>
                    <input
                      type="text"
                      dir="rtl"
                      placeholder="e.g. طريق الحرير الرقمي"
                      value={formData.labelAr}
                      onChange={e => setFormData(prev => ({ ...prev, labelAr: e.target.value }))}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-neutral-400 font-bold mb-1">Chinese (ZH)</label>
                    <input
                      type="text"
                      placeholder="e.g. 数字丝绸之路"
                      value={formData.labelZh}
                      onChange={e => setFormData(prev => ({ ...prev, labelZh: e.target.value }))}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-neutral-400 font-bold mb-1">Central Kurdish (CKB)</label>
                    <input
                      type="text"
                      dir="rtl"
                      placeholder="e.g. ڕێگای ئاوریشمی دیجیتاڵی"
                      value={formData.labelCkb}
                      onChange={e => setFormData(prev => ({ ...prev, labelCkb: e.target.value }))}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* Slug & Href */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">Unique Slug*</label>
                  <input
                    type="text"
                    required
                    placeholder="digital-silk-road"
                    value={formData.slug}
                    onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">Route Href*</label>
                  <input
                    type="text"
                    required
                    placeholder="/initiatives/digital-silk-road"
                    value={formData.href}
                    onChange={e => setFormData(prev => ({ ...prev, href: e.target.value }))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>
              </div>

              {/* Portal & Clearance Scope */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">Associated Portal</label>
                  <select
                    value={formData.portal}
                    onChange={e => setFormData(prev => ({ ...prev, portal: e.target.value as any }))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="all">Global (All Portals)</option>
                    <option value="ica-public">ICA Public Portal</option>
                    <option value="newsroom">Newsroom</option>
                    <option value="live">Live Portal</option>
                    <option value="media-hub">Media Hub</option>
                    <option value="secretariat">Secretariat</option>
                    <option value="cise">CISE Institute</option>
                    <option value="settlement">Payment Settlement</option>
                    <option value="summit">Summit 2026</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">Required Clearance Scope</label>
                  <select
                    value={formData.requiredScope}
                    onChange={e => setFormData(prev => ({ ...prev, requiredScope: e.target.value }))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="public">Public (Unrestricted)</option>
                    <option value="editor">Editor Clearance</option>
                    <option value="admin">Administrator Clearance</option>
                    <option value="superadmin">Superadmin Only</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    checked={formData.isExternal}
                    onChange={e => setFormData(prev => ({ ...prev, isExternal: e.target.checked }))}
                    className="rounded bg-neutral-950 border-neutral-700 text-red-600 focus:ring-0"
                  />
                  <span>External Link (Opens new window)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    checked={formData.isLive}
                    onChange={e => setFormData(prev => ({ ...prev, isLive: e.target.checked }))}
                    className="rounded bg-neutral-950 border-neutral-700 text-red-600 focus:ring-0"
                  />
                  <span>Pulse Indicator (Live Broadcast)</span>
                </label>
              </div>
            </div>
          )}

          {/* TAB 2: STYLE & APPEARANCE */}
          {activeFormTab === 'style' && (
            <div className="space-y-4">
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-xs text-neutral-400 font-sans">
                Customize the visual weight and branding of this navigation node. These styles will override default theme parameters.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                    Background Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.bgColor || '#18181b'}
                      onChange={e => setFormData(prev => ({ ...prev, bgColor: e.target.value }))}
                      className="w-10 h-10 rounded border border-neutral-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      placeholder="#18181b"
                      value={formData.bgColor}
                      onChange={e => setFormData(prev => ({ ...prev, bgColor: e.target.value }))}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                    Text / Icon Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.textColor || '#ffffff'}
                      onChange={e => setFormData(prev => ({ ...prev, textColor: e.target.value }))}
                      className="w-10 h-10 rounded border border-neutral-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      placeholder="#ffffff"
                      value={formData.textColor}
                      onChange={e => setFormData(prev => ({ ...prev, textColor: e.target.value }))}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                  Lucide Icon Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Shield, Globe, Award"
                  value={formData.icon}
                  onChange={e => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                />
                <p className="text-[10px] text-neutral-500 mt-1">
                  Enter any valid Lucide-React icon component name.
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <Save size={14} />
                  <span>{editingItem ? 'Save Changes' : 'Create Item'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
