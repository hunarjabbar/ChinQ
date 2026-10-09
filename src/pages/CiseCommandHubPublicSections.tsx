import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { 
  Layers, Plus, Search, Filter, RefreshCw, Eye, Edit3, Trash2, 
  Copy, RotateCcw, ArrowUp, ArrowDown, Check, X, Shield, Clock, 
  Sparkles, Monitor, Tablet, Smartphone, ChevronRight, AlertTriangle, 
  Globe2, Sliders, Calendar, Tag, CheckCircle2, History, Database,
  Palette, FileText, ArrowRight, ExternalLink
} from 'lucide-react';
import { Locale } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { useI18n } from '../hooks/useI18n';
import { apiFetch } from '../lib/api';
import { 
  PageSectionModel, 
  SectionItemModel, 
  SectionRevisionModel,
  CanonicalSectionType, 
  CANONICAL_SECTION_REGISTRY,
  safeJsonParse,
  getLocalizedText
} from '../types/composition';
import { SectionRenderer } from '../components/composition/SectionRenderer';
import { ErrorBoundary } from '../components/ErrorBoundary';

export default function CiseCommandHubPublicSections() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const { t } = useI18n(lang as Locale);
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const userRole = (user?.role || 'ADMIN').toUpperCase();
  const isViewer = userRole === 'VIEWER';
  const isAdmin = userRole === 'ADMIN' || userRole === 'SUPERADMIN';

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [activeTab, setActiveTab] = useState<'sections' | 'pages' | 'templates'>('sections');

  // Modals & Drawers
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<PageSectionModel | null>(null);
  const [formActiveTab, setFormActiveTab] = useState<'content' | 'items' | 'style' | 'visibility' | 'localization' | 'advanced'>('content');
  
  // Preview Modal
  const [previewSection, setPreviewSection] = useState<PageSectionModel | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewLang, setPreviewLang] = useState<string>(lang);

  // Revisions Modal
  const [historySectionId, setHistorySectionId] = useState<string | null>(null);

  // Form State for Section Create / Edit
  const [formData, setFormData] = useState({
    name: '',
    type: 'hero' as CanonicalSectionType,
    pageId: 'page_home_primary',
    visibility: 'visible' as 'visible' | 'hidden' | 'scheduled',
    status: 'published' as 'published' | 'draft' | 'archived',
    scheduleFrom: '',
    scheduleTo: '',
    styleOverride: {
      backgroundColor: '',
      textColor: '',
      borderColor: '',
      borderRadius: '16px',
      padding: '24px',
      margin: '0px',
      shadow: ''
    },
    config: {} as Record<string, any>,
    localeOverride: {
      en: '',
      ar: '',
      zh: '',
      ckb: ''
    }
  });

  // Items State in Edit Form
  const [formItems, setFormItems] = useState<Partial<SectionItemModel>[]>([]);
  const [editingItemIdx, setEditingItemIdx] = useState<number | null>(null);
  const [itemLangTab, setItemLangTab] = useState<'en' | 'ar' | 'zh' | 'ckb'>('en');

  // Action status feedback
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showFeedback = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // -------------------------------------------------------------
  // DATA FETCHING
  // -------------------------------------------------------------
  const { data: sections = [], isLoading, refetch } = useQuery<PageSectionModel[]>({
    queryKey: ['hub-composition-sections'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/composition/sections');
      if (!res.ok) throw new Error('Failed to load sections');
      return res.json();
    }
  });

  const { data: pages = [] } = useQuery<any[]>({
    queryKey: ['hub-composition-pages'],
    queryFn: async () => {
      const res = await apiFetch('/api/hub/composition/pages');
      if (!res.ok) return [];
      return res.json();
    }
  });

  const { data: revisions = [], isLoading: isLoadingRevisions } = useQuery<SectionRevisionModel[]>({
    queryKey: ['hub-composition-revisions', historySectionId],
    queryFn: async () => {
      if (!historySectionId) return [];
      const res = await apiFetch(`/api/hub/composition/revisions/${historySectionId}`);
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!historySectionId
  });

  // -------------------------------------------------------------
  // MUTATIONS
  // -------------------------------------------------------------
  const saveSectionMutation = useMutation({
    mutationFn: async (payload: any) => {
      const isUpdating = !!editingSection?.id;
      const url = isUpdating 
        ? `/api/hub/composition/sections/${editingSection.id}` 
        : '/api/hub/composition/sections';
      const method = isUpdating ? 'PUT' : 'POST';

      const res = await apiFetch(url, {
        method,
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save section');
      }
      return res.json();
    },
    onSuccess: async (savedSec) => {
      // Also save items if needed
      if (savedSec?.id && formItems.length > 0) {
        // Sync items
        for (let idx = 0; idx < formItems.length; idx++) {
          const it = formItems[idx];
          if (it.id && !it.id.startsWith('new_')) {
            await apiFetch(`/api/hub/composition/sections/${savedSec.id}/items/${it.id}`, {
              method: 'PUT',
              body: JSON.stringify({ ...it, displayOrder: idx + 1 })
            });
          } else {
            await apiFetch(`/api/hub/composition/sections/${savedSec.id}/items`, {
              method: 'POST',
              body: JSON.stringify({ ...it, displayOrder: idx + 1 })
            });
          }
        }
      }

      await queryClient.invalidateQueries({ queryKey: ['hub-composition-sections'] });
      setIsEditModalOpen(false);
      setEditingSection(null);
      showFeedback('Section and items updated successfully');
    },
    onError: (err: any) => {
      showFeedback(err.message, 'error');
    }
  });

  const duplicateMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/hub/composition/sections/${id}/duplicate`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to clone section');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hub-composition-sections'] });
      showFeedback('Section duplicated successfully');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id, permanent }: { id: string; permanent: boolean }) => {
      const res = await apiFetch(`/api/hub/composition/sections/${id}?permanent=${permanent}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete section');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hub-composition-sections'] });
      showFeedback('Section status updated');
    }
  });

  const rollbackMutation = useMutation({
    mutationFn: async (revId: string) => {
      const res = await apiFetch(`/api/hub/composition/revisions/${revId}/rollback`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to rollback revision');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hub-composition-sections'] });
      setHistorySectionId(null);
      showFeedback('Rollback executed successfully');
    }
  });

  const seedBaselineMutation = useMutation({
    mutationFn: async () => {
      const res = await apiFetch('/api/hub/composition/seed', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to seed baseline');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hub-composition-sections'] });
      showFeedback('Baseline 15 canonical sections synchronized!');
    }
  });

  const reorderMutation = useMutation({
    mutationFn: async (orderMap: { id: string; displayOrder: number }[]) => {
      const res = await apiFetch('/api/hub/composition/sections/reorder', {
        method: 'POST',
        body: JSON.stringify({ orderMap })
      });
      if (!res.ok) throw new Error('Failed to reorder sections');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hub-composition-sections'] });
    }
  });

  // Reorder Handler
  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (isViewer) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= filteredSections.length) return;

    const list = [...filteredSections];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    const orderMap = list.map((sec, idx) => ({ id: sec.id, displayOrder: idx + 1 }));
    reorderMutation.mutate(orderMap);
  };

  // Open Edit Modal
  const openEditModal = (sec?: PageSectionModel) => {
    if (isViewer) return;
    if (sec) {
      setEditingSection(sec);
      setFormData({
        name: sec.name,
        type: sec.type as CanonicalSectionType,
        pageId: sec.pageId || 'page_home_primary',
        visibility: (sec.visibility as any) || 'visible',
        status: (sec.status as any) || 'published',
        scheduleFrom: sec.scheduleFrom ? sec.scheduleFrom.split('T')[0] : '',
        scheduleTo: sec.scheduleTo ? sec.scheduleTo.split('T')[0] : '',
        styleOverride: safeJsonParse(sec.styleOverride, {
          backgroundColor: '',
          textColor: '',
          borderColor: '',
          borderRadius: '16px',
          padding: '24px',
          margin: '0px',
          shadow: ''
        }),
        config: safeJsonParse(sec.config, {}),
        localeOverride: safeJsonParse(sec.localeOverride, { en: '', ar: '', zh: '', ckb: '' })
      });
      setFormItems(sec.items ? [...sec.items] : []);
    } else {
      setEditingSection(null);
      setFormData({
        name: 'New Custom Section',
        type: 'hero',
        pageId: 'page_home_primary',
        visibility: 'visible',
        status: 'draft',
        scheduleFrom: '',
        scheduleTo: '',
        styleOverride: {
          backgroundColor: '',
          textColor: '',
          borderColor: '',
          borderRadius: '16px',
          padding: '24px',
          margin: '0px',
          shadow: ''
        },
        config: {},
        localeOverride: { en: '', ar: '', zh: '', ckb: '' }
      });
      setFormItems([
        {
          id: 'new_item_1',
          title: { en: 'Primary Headline', ar: 'العنوان الرئيسي', zh: '核心主标', ckb: 'سەردێڕی سەرەکی' } as any,
          subtitle: { en: 'Category Subtitle', ar: 'العنوان الفرعي', zh: '分类副标', ckb: 'ژێرنووس' } as any,
          body: { en: 'Official dispatches and bilateral brief.', ar: 'برقيات رسمية وموجز ثنائي.', zh: '官方快讯与双边简报。', ckb: 'زانیاری و بەڵگەنامەی فەرمی.' } as any,
          ctaLabel: { en: 'Read More', ar: 'قراءة المزيد', zh: '阅读全文', ckb: 'زیاتر بخوێنەوە' } as any,
          ctaHref: '/initiatives',
          displayOrder: 1,
          visibility: 'visible',
          status: 'published'
        }
      ]);
    }
    setFormActiveTab('content');
    setIsEditModalOpen(true);
  };

  // Filter sections
  const filteredSections = useMemo(() => {
    return sections.filter((sec) => {
      // Category filter
      if (categoryFilter !== 'all') {
        const reg = CANONICAL_SECTION_REGISTRY[sec.type as CanonicalSectionType];
        if (reg?.category !== categoryFilter) return false;
      }

      // Status filter
      if (statusFilter !== 'all' && sec.status !== statusFilter) {
        return false;
      }

      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = sec.name.toLowerCase().includes(q);
        const matchesType = sec.type.toLowerCase().includes(q);
        const matchesItems = sec.items?.some((it) => 
          JSON.stringify(it.title).toLowerCase().includes(q) ||
          JSON.stringify(it.body).toLowerCase().includes(q)
        );
        if (!matchesName && !matchesType && !matchesItems) return false;
      }

      return true;
    });
  }, [sections, categoryFilter, statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Breadcrumb Header */}
      <div className="bg-white dark:bg-ink-900 border-b border-neutral-200 dark:border-neutral-800 -mx-6 -mt-6 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-widest">
              <span>CISE Command Hub</span>
              <ChevronRight size={12} />
              <span className="text-brand-700 dark:text-brand-400">Public Website Sections</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white font-serif tracking-tight">
                {lang === 'ar' ? 'أقسام الموقع العام' : lang === 'zh' ? '公开网站版块管理' : lang === 'ckb' ? 'بەشەکانی ماڵپەڕی گشتی' : 'Public Website Sections'}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-800 dark:text-brand-300 text-xs font-black uppercase tracking-wider">
                <Shield size={12} />
                <span>LEVEL-2 RBAC</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl">
              Unified composition engine governing all 15 canonical sections, items, design tokens, and synchronized ISR cache purges for the Iraqi-Chinese Agency.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => seedBaselineMutation.mutate()}
              disabled={isViewer || seedBaselineMutation.isPending}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50"
              title="Ensure all 15 canonical homepage sections exist"
            >
              <Database size={14} className={seedBaselineMutation.isPending ? 'animate-spin' : ''} />
              <span>{lang === 'ar' ? 'مزامنة القواعد' : lang === 'zh' ? '同步基础库' : lang === 'ckb' ? 'هاوکاتکردنی داتا' : 'Sync Baseline'}</span>
            </button>
            <button
              onClick={() => openEditModal()}
              disabled={isViewer}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-800 hover:bg-brand-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <Plus size={15} />
              <span>{lang === 'ar' ? 'إضافة قسم جديد' : lang === 'zh' ? '新建版块' : lang === 'ckb' ? 'زیادکردنی بەش' : 'Create Section'}</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {statusMessage && (
          <div className={`mt-4 p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            <CheckCircle2 size={16} />
            <span>{statusMessage.text}</span>
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ar' ? 'البحث بالاسم أو النوع أو المحتوى...' : lang === 'zh' ? '按名称、类型或卡片内容搜索...' : lang === 'ckb' ? 'گەڕان بەپێی ناو یان جۆر...' : 'Search sections by name, type, or items...'}
              className="w-full ps-9 pe-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-700"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-bold text-neutral-800 dark:text-neutral-200 focus:outline-none"
          >
            <option value="all">{lang === 'ar' ? 'كافة التصنيفات (15 نوعاً)' : lang === 'zh' ? '全部分类 (15种)' : lang === 'ckb' ? 'هەموو جۆرەکان' : 'All Categories (15 Types)'}</option>
            <option value="header-hero">Header & Hero</option>
            <option value="intelligence-news">Intelligence & News</option>
            <option value="strategy-initiatives">Strategy & Initiatives</option>
            <option value="media-events">Media & Events</option>
            <option value="institutional-conversion">Institutional & Conversion</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-bold text-neutral-800 dark:text-neutral-200 focus:outline-none"
          >
            <option value="all">Status: All</option>
            <option value="published">Status: Published</option>
            <option value="draft">Status: Draft</option>
            <option value="archived">Status: Archived</option>
          </select>

          <button
            onClick={() => refetch()}
            className="p-2.5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 transition-colors"
            title="Refresh from SQLite"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Sections List */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-neutral-500">
              Active Canonical Sections
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              {filteredSections.length}
            </span>
          </div>
          <div className="text-[11px] text-neutral-400 font-mono">
            SQLite: PageSection | dev2.db
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-neutral-400 space-y-2">
            <RefreshCw className="animate-spin mx-auto text-brand-700" size={24} />
            <p className="text-xs font-bold">Querying composition engine datastore...</p>
          </div>
        ) : filteredSections.length === 0 ? (
          <div className="p-12 text-center text-neutral-400 space-y-4">
            <Layers size={36} className="mx-auto opacity-40" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300">No sections found</p>
              <p className="text-xs text-neutral-500">Sync with the baseline or create a new section to get started.</p>
            </div>
            <button
              onClick={() => seedBaselineMutation.mutate()}
              className="px-4 py-2 bg-brand-800 text-white font-bold text-xs rounded-xl"
            >
              Sync 15 Canonical Sections
            </button>
          </div>
        ) : (
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {filteredSections.map((sec, idx) => {
              const reg = CANONICAL_SECTION_REGISTRY[sec.type as CanonicalSectionType];
              const itemCount = sec.items?.length || 0;
              const isFirst = idx === 0;
              const isLast = idx === filteredSections.length - 1;

              return (
                <div 
                  key={sec.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Order Controls */}
                    <div className="flex flex-col items-center gap-0.5 shrink-0">
                      <button
                        onClick={() => handleMove(idx, 'up')}
                        disabled={isFirst || isViewer}
                        className="p-1 text-neutral-400 hover:text-neutral-800 dark:hover:text-white disabled:opacity-20 cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp size={13} />
                      </button>
                      <span className="text-[11px] font-mono font-black text-neutral-500">
                        {sec.displayOrder || idx + 1}
                      </span>
                      <button
                        onClick={() => handleMove(idx, 'down')}
                        disabled={isLast || isViewer}
                        className="p-1 text-neutral-400 hover:text-neutral-800 dark:hover:text-white disabled:opacity-20 cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown size={13} />
                      </button>
                    </div>

                    {/* Section Badge & Info */}
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-brand-800 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/80 px-2.5 py-0.5 rounded-md border border-brand-200 dark:border-brand-800">
                          {sec.type}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white truncate">
                          {sec.name}
                        </h3>
                        {sec.visibility === 'hidden' && (
                          <span className="text-[10px] bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 font-bold px-1.5 py-0.5 rounded">
                            HIDDEN
                          </span>
                        )}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sec.status === 'published' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200' : sec.status === 'draft' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-neutral-100 text-neutral-600'}`}>
                          {sec.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 truncate max-w-xl">
                        {reg?.description?.[lang as 'en'] || reg?.description?.en || 'Canonical composition section.'}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Meta */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <span className="text-xs text-neutral-400 font-medium me-2 hidden md:inline">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </span>

                    <button
                      onClick={() => {
                        setPreviewSection(sec);
                      }}
                      className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-brand-800 dark:hover:text-brand-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                      title="Live Synchronous Preview"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      onClick={() => setHistorySectionId(sec.id)}
                      className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-brand-800 dark:hover:text-brand-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                      title="Revision Ledger & Rollback"
                    >
                      <History size={16} />
                    </button>

                    <button
                      onClick={() => duplicateMutation.mutate(sec.id)}
                      disabled={isViewer}
                      className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-brand-800 dark:hover:text-brand-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer disabled:opacity-30"
                      title="Duplicate Section"
                    >
                      <Copy size={16} />
                    </button>

                    <button
                      onClick={() => openEditModal(sec)}
                      disabled={isViewer}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-30"
                      title="Configure Section"
                    >
                      <Edit3 size={13} />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete/archive section "${sec.name}"?`)) {
                          deleteMutation.mutate({ id: sec.id, permanent: false });
                        }
                      }}
                      disabled={isViewer}
                      className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer disabled:opacity-30"
                      title="Archive Section"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= EDIT MODAL (5-TAB ARCHITECTURE) ================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-ink-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-neutral-900 dark:text-white font-serif">
                  {editingSection ? `Configure: ${formData.name}` : 'Create New Public Website Section'}
                </h2>
                <p className="text-xs text-neutral-500">CISE Command Hub Composition Architecture</p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white p-1 rounded-md"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-1 px-6 border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto text-xs font-bold">
              {[
                { id: 'content', label: '1. Content', icon: FileText },
                { id: 'items', label: `2. Items (${formItems.length})`, icon: Layers },
                { id: 'style', label: '3. Style Overrides', icon: Palette },
                { id: 'visibility', label: '4. Visibility & Scheduling', icon: Calendar },
                { id: 'localization', label: '5. Localization', icon: Globe2 },
                { id: 'advanced', label: '6. Advanced JSON', icon: Sliders }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFormActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-3 px-3.5 border-b-2 font-bold cursor-pointer transition-colors ${
                    formActiveTab === tab.id
                      ? 'border-brand-800 text-brand-800 dark:text-brand-400'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <tab.icon size={14} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: CONTENT */}
              {formActiveTab === 'content' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-600 dark:text-neutral-300 mb-1.5">
                        Section Display Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-sm font-medium"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-600 dark:text-neutral-300 mb-1.5">
                        Canonical Section Type
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as CanonicalSectionType })}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-sm font-bold"
                      >
                        {Object.keys(CANONICAL_SECTION_REGISTRY).map((tKey) => {
                          const reg = CANONICAL_SECTION_REGISTRY[tKey as CanonicalSectionType];
                          return (
                            <option key={tKey} value={tKey}>
                              {tKey} — {reg.name.en}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-2">
                    <div className="text-xs font-black uppercase tracking-wider text-brand-700 dark:text-brand-400">
                      Canonical Type Definition
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300">
                      {CANONICAL_SECTION_REGISTRY[formData.type]?.description?.en}
                    </p>
                    <div className="text-[11px] font-mono text-neutral-500">
                      Category: {CANONICAL_SECTION_REGISTRY[formData.type]?.category} | Default Items: {CANONICAL_SECTION_REGISTRY[formData.type]?.defaultItemsCount}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-600 dark:text-neutral-300 mb-1.5">
                        Lifecycle Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-sm font-medium"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-600 dark:text-neutral-300 mb-1.5">
                        Visibility Policy
                      </label>
                      <select
                        value={formData.visibility}
                        onChange={(e) => setFormData({ ...formData, visibility: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-sm font-medium"
                      >
                        <option value="visible">Visible</option>
                        <option value="hidden">Hidden</option>
                        <option value="scheduled">Scheduled Timeframe</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ITEMS */}
              {formActiveTab === 'items' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                        Cards and Content Items
                      </h3>
                      <p className="text-xs text-neutral-500">Manage individual data cards rendered inside this section</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newItem: Partial<SectionItemModel> = {
                          id: `new_item_${Date.now()}`,
                          title: { en: 'New Item Headline', ar: 'عنوان جديد', zh: '新增项目', ckb: 'سەردێڕی نوێ' } as any,
                          subtitle: { en: '', ar: '', zh: '', ckb: '' } as any,
                          body: { en: '', ar: '', zh: '', ckb: '' } as any,
                          ctaLabel: { en: 'Explore', ar: 'استكشف', zh: '了解更多', ckb: 'زیاتر' } as any,
                          ctaHref: '',
                          displayOrder: formItems.length + 1,
                          visibility: 'visible',
                          status: 'published'
                        };
                        setFormItems([...formItems, newItem]);
                        setEditingItemIdx(formItems.length);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-800 text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-brand-700"
                    >
                      <Plus size={14} />
                      <span>Add Card Item</span>
                    </button>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3">
                    {formItems.map((item, idx) => {
                      const isEditing = editingItemIdx === idx;
                      const titleStr = getLocalizedText(item.title, 'en', 'Untitled Item');

                      return (
                        <div key={item.id || idx} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/40 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-[11px] font-bold flex items-center justify-center">
                                {idx + 1}
                              </span>
                              <span className="text-xs font-bold text-neutral-900 dark:text-white">
                                {titleStr}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setEditingItemIdx(isEditing ? null : idx)}
                                className="px-2.5 py-1 text-xs font-bold rounded bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                              >
                                {isEditing ? 'Close' : 'Edit'}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = formItems.filter((_, i) => i !== idx);
                                  setFormItems(updated);
                                  if (editingItemIdx === idx) setEditingItemIdx(null);
                                }}
                                className="p-1 text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          {/* Item Sub-Editor */}
                          {isEditing && (
                            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700 space-y-3">
                              {/* Quad-lingual selector */}
                              <div className="flex items-center gap-1 text-[11px] font-bold border-b border-neutral-200 dark:border-neutral-700 pb-2">
                                <span className="text-neutral-400 me-2">Language:</span>
                                {(['en', 'ar', 'zh', 'ckb'] as const).map((lKey) => (
                                  <button
                                    key={lKey}
                                    type="button"
                                    onClick={() => setItemLangTab(lKey)}
                                    className={`px-2 py-0.5 rounded uppercase ${itemLangTab === lKey ? 'bg-brand-800 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600'}`}
                                  >
                                    {lKey}
                                  </button>
                                ))}
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[11px] font-bold text-neutral-500 uppercase mb-1">
                                    Title ({itemLangTab.toUpperCase()})
                                  </label>
                                  <input
                                    type="text"
                                    value={safeJsonParse<any>(item.title, {})?.[itemLangTab] || ''}
                                    onChange={(e) => {
                                      const currentTitle = safeJsonParse<any>(item.title, { en: '', ar: '', zh: '', ckb: '' });
                                      const updated = [...formItems];
                                      updated[idx].title = { ...currentTitle, [itemLangTab]: e.target.value } as any;
                                      setFormItems(updated);
                                    }}
                                    className="w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] font-bold text-neutral-500 uppercase mb-1">
                                    Subtitle ({itemLangTab.toUpperCase()})
                                  </label>
                                  <input
                                    type="text"
                                    value={safeJsonParse<any>(item.subtitle, {})?.[itemLangTab] || ''}
                                    onChange={(e) => {
                                      const currentSub = safeJsonParse<any>(item.subtitle, { en: '', ar: '', zh: '', ckb: '' });
                                      const updated = [...formItems];
                                      updated[idx].subtitle = { ...currentSub, [itemLangTab]: e.target.value } as any;
                                      setFormItems(updated);
                                    }}
                                    className="w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-[11px] font-bold text-neutral-500 uppercase mb-1">
                                  Body Description ({itemLangTab.toUpperCase()})
                                </label>
                                <textarea
                                  rows={2}
                                  value={safeJsonParse<any>(item.body, {})?.[itemLangTab] || ''}
                                  onChange={(e) => {
                                    const currentBody = safeJsonParse<any>(item.body, { en: '', ar: '', zh: '', ckb: '' });
                                    const updated = [...formItems];
                                    updated[idx].body = { ...currentBody, [itemLangTab]: e.target.value } as any;
                                    setFormItems(updated);
                                  }}
                                  className="w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                                />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[11px] font-bold text-neutral-500 uppercase mb-1">CTA Href</label>
                                  <input
                                    type="text"
                                    value={item.ctaHref || ''}
                                    onChange={(e) => {
                                      const updated = [...formItems];
                                      updated[idx].ctaHref = e.target.value;
                                      setFormItems(updated);
                                    }}
                                    placeholder="/initiatives"
                                    className="w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] font-bold text-neutral-500 uppercase mb-1">Image URL</label>
                                  <input
                                    type="text"
                                    value={item.image || ''}
                                    onChange={(e) => {
                                      const updated = [...formItems];
                                      updated[idx].image = e.target.value;
                                      setFormItems(updated);
                                    }}
                                    placeholder="/images/hero-diplomatic.jpg"
                                    className="w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: STYLE OVERRIDES */}
              {formActiveTab === 'style' && (
                <div className="space-y-4">
                  <div className="text-xs text-neutral-500">
                    Apply visual design tokens and surface style overrides directly to this component.
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 uppercase mb-1">
                        Background Color
                      </label>
                      <input
                        type="text"
                        value={formData.styleOverride.backgroundColor || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          styleOverride: { ...formData.styleOverride, backgroundColor: e.target.value }
                        })}
                        placeholder="#7f1d1d or transparent"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 uppercase mb-1">
                        Text Color
                      </label>
                      <input
                        type="text"
                        value={formData.styleOverride.textColor || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          styleOverride: { ...formData.styleOverride, textColor: e.target.value }
                        })}
                        placeholder="#ffffff"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 uppercase mb-1">
                        Border Radius
                      </label>
                      <input
                        type="text"
                        value={formData.styleOverride.borderRadius || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          styleOverride: { ...formData.styleOverride, borderRadius: e.target.value }
                        })}
                        placeholder="16px"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 uppercase mb-1">
                        Padding
                      </label>
                      <input
                        type="text"
                        value={formData.styleOverride.padding || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          styleOverride: { ...formData.styleOverride, padding: e.target.value }
                        })}
                        placeholder="24px"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: VISIBILITY & SCHEDULING */}
              {formActiveTab === 'visibility' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-3">
                    <div className="text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300">
                      Automated Scheduling Gates
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Schedule From</label>
                        <input
                          type="date"
                          value={formData.scheduleFrom}
                          onChange={(e) => setFormData({ ...formData, scheduleFrom: e.target.value })}
                          className="w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Schedule To</label>
                        <input
                          type="date"
                          value={formData.scheduleTo}
                          onChange={(e) => setFormData({ ...formData, scheduleTo: e.target.value })}
                          className="w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: LOCALIZATION */}
              {formActiveTab === 'localization' && (
                <div className="space-y-4">
                  <div className="text-xs text-neutral-500">
                    Quad-lingual section title overrides (EN, AR, ZH, CKB).
                  </div>
                  {(['en', 'ar', 'zh', 'ckb'] as const).map((lKey) => (
                    <div key={lKey}>
                      <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 uppercase mb-1">
                        Title ({lKey.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={formData.localeOverride[lKey] || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          localeOverride: { ...formData.localeOverride, [lKey]: e.target.value }
                        })}
                        placeholder={`Section title in ${lKey}...`}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-sm"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 6: ADVANCED JSON */}
              {formActiveTab === 'advanced' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-600 dark:text-neutral-300 mb-1">
                      Raw JSON Configuration
                    </label>
                    <textarea
                      rows={6}
                      value={JSON.stringify(formData.config, null, 2)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value);
                          setFormData({ ...formData, config: parsed });
                        } catch {
                          // Allow typing
                        }
                      }}
                      className="w-full font-mono text-xs p-3 bg-neutral-900 text-emerald-400 rounded-xl"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-950">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => saveSectionMutation.mutate(formData)}
                disabled={saveSectionMutation.isPending}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {saveSectionMutation.isPending ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                <span>Save Changes & Sync ISR</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= LIVE SYNCHRONOUS PREVIEW DRAWER ================= */}
      {previewSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden">
            {/* Preview Toolbar */}
            <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 bg-neutral-50 dark:bg-neutral-900">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-brand-800 dark:text-brand-400">
                  Live Viewport Preview
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  [{previewSection.type}]
                </span>
              </div>

              {/* Viewport switchers */}
              <div className="flex items-center gap-1 bg-neutral-200 dark:bg-neutral-800 p-1 rounded-xl">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${previewDevice === 'desktop' ? 'bg-white dark:bg-neutral-700 shadow-xs' : 'text-neutral-500'}`}
                >
                  <Monitor size={14} />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setPreviewDevice('tablet')}
                  className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${previewDevice === 'tablet' ? 'bg-white dark:bg-neutral-700 shadow-xs' : 'text-neutral-500'}`}
                >
                  <Tablet size={14} />
                  <span>Tablet</span>
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${previewDevice === 'mobile' ? 'bg-white dark:bg-neutral-700 shadow-xs' : 'text-neutral-500'}`}
                >
                  <Smartphone size={14} />
                  <span>Mobile</span>
                </button>
              </div>

              {/* Lang switcher */}
              <div className="flex items-center gap-1 bg-neutral-200 dark:bg-neutral-800 p-1 rounded-xl">
                {(['en', 'ar', 'zh', 'ckb'] as const).map((lKey) => (
                  <button
                    key={lKey}
                    onClick={() => setPreviewLang(lKey)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase ${previewLang === lKey ? 'bg-brand-800 text-white shadow-xs' : 'text-neutral-500'}`}
                  >
                    {lKey}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPreviewSection(null)}
                className="text-neutral-400 hover:text-neutral-800 dark:hover:text-white p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Viewport Canvas */}
            <div className="flex-1 overflow-y-auto p-6 bg-neutral-100 dark:bg-neutral-900/50 flex justify-center items-start">
              <div 
                className={`bg-white dark:bg-neutral-950 rounded-2xl shadow-xl overflow-hidden border border-neutral-300 dark:border-neutral-800 transition-all duration-300 w-full ${
                  previewDevice === 'desktop' ? 'max-w-5xl' : previewDevice === 'tablet' ? 'max-w-2xl' : 'max-w-sm'
                }`}
              >
                <SectionRenderer
                  section={previewSection}
                  lang={previewLang}
                  isPreview={true}
                  onEdit={() => {
                    setPreviewSection(null);
                    openEditModal(previewSection);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= REVISION HISTORY MODAL ================= */}
      {historySectionId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-ink-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="text-brand-700" size={18} />
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  Section Revisions & Rollback Ledger
                </h3>
              </div>
              <button onClick={() => setHistorySectionId(null)} className="text-neutral-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 divide-y divide-neutral-200 dark:divide-neutral-800">
              {isLoadingRevisions ? (
                <div className="p-8 text-center text-neutral-400 text-xs font-bold">Loading revisions...</div>
              ) : revisions.length === 0 ? (
                <div className="p-8 text-center text-neutral-400 text-xs">No historical revisions found.</div>
              ) : (
                revisions.map((rev) => (
                  <div key={rev.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-800 dark:text-neutral-200">
                        <span className="uppercase px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px]">
                          {rev.action}
                        </span>
                        <span className="font-mono text-[11px] text-neutral-500">
                          {new Date(rev.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-400 font-mono">
                        Actor: {rev.actorId}
                      </div>
                    </div>
                    {isAdmin && (
                      <button
                        onClick={() => {
                          if (window.confirm('Rollback section to this historical snapshot?')) {
                            rollbackMutation.mutate(rev.id);
                          }
                        }}
                        disabled={rollbackMutation.isPending}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-brand-700 dark:text-brand-400 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                      >
                        <RotateCcw size={12} />
                        <span>Rollback</span>
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
