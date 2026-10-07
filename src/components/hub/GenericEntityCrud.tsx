import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, RotateCcw, Copy, ArrowUp, ArrowDown, Eye, EyeOff,
  Search, SlidersHorizontal, Palette, Globe, Clock, History, AlertTriangle,
  CheckCircle, Save, X, ExternalLink, Calendar, Sparkles, Shield
} from 'lucide-react';
import { CiseCommandHubControlledCard, VisibilityState, StyleOverrides } from '../../types/controlModel';
import { useSectionControlStore } from '../../store/useSectionControlStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Locale } from '../../types';

interface GenericEntityCrudProps {
  sectionId: string;
  sectionTitle: string;
  sectionDescription?: string;
  lang?: Locale;
}

export function GenericEntityCrud({
  sectionId,
  sectionTitle,
  sectionDescription,
  lang = 'en'
}: GenericEntityCrudProps) {
  const { user } = useAuthStore();
  const { 
    sections, 
    addCard, 
    updateCard, 
    duplicateCard, 
    softDeleteCard, 
    restoreCard, 
    permanentDeleteCard, 
    reorderCard,
    bulkUpdateStatus,
    bulkUpdateVisibility,
    toggleSectionVisibility
  } = useSectionControlStore();

  const section = sections[sectionId];
  const items = section?.items || [];

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'draft' | 'archived'>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CiseCommandHubControlledCard | null>(null);
  const [activeFormTab, setActiveFormTab] = useState<'content' | 'style' | 'visibility' | 'localization' | 'history' | 'danger'>('content');

  // Form State
  const [formHeadlineEn, setFormHeadlineEn] = useState('');
  const [formHeadlineAr, setFormHeadlineAr] = useState('');
  const [formHeadlineZh, setFormHeadlineZh] = useState('');
  const [formHeadlineCkb, setFormHeadlineCkb] = useState('');

  const [formBodyEn, setFormBodyEn] = useState('');
  const [formBodyAr, setFormBodyAr] = useState('');
  const [formBodyZh, setFormBodyZh] = useState('');
  const [formBodyCkb, setFormBodyCkb] = useState('');

  const [formEyebrowEn, setFormEyebrowEn] = useState('');
  const [formEyebrowAr, setFormEyebrowAr] = useState('');
  const [formEyebrowZh, setFormEyebrowZh] = useState('');
  const [formEyebrowCkb, setFormEyebrowCkb] = useState('');

  const [formCtaLabelEn, setFormCtaLabelEn] = useState('');
  const [formCtaHref, setFormCtaHref] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formAltTextEn, setFormAltTextEn] = useState('');
  const [formChipsEn, setFormChipsEn] = useState('');

  // Style Overrides State
  const [styleBgColor, setStyleBgColor] = useState('');
  const [styleTextColor, setStyleTextColor] = useState('');
  const [styleBorderColor, setStyleBorderColor] = useState('');
  const [styleBorderRadius, setStyleBorderRadius] = useState('16px');
  const [stylePadding, setStylePadding] = useState('16px');
  const [styleShadow, setStyleShadow] = useState('0 4px 6px -1px rgb(0 0 0 / 0.1)');

  // Visibility State
  const [visibilityState, setVisibilityState] = useState<VisibilityState>('visible');
  const [scheduleFrom, setScheduleFrom] = useState('');
  const [scheduleTo, setScheduleTo] = useState('');

  // Status & Notification
  const [formStatus, setFormStatus] = useState<'active' | 'draft' | 'archived'>('active');
  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 4000);
  };

  const userRole = (user?.role || 'SUPERADMIN').toUpperCase();
  const canEdit = ['SUPERADMIN', 'ADMIN', 'EDITOR'].includes(userRole);
  const isSuperAdmin = userRole === 'SUPERADMIN';

  // Filter Items
  const filteredItems = items.filter(item => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchHeadline = Object.values(item.headline).some(v => v?.toLowerCase().includes(q));
      const matchBody = Object.values(item.body).some(v => v?.toLowerCase().includes(q));
      if (!matchHeadline && !matchBody) return false;
    }
    return true;
  }).sort((a, b) => a.customization.displayOrder - b.customization.displayOrder);

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingCard(null);
    setFormHeadlineEn('');
    setFormHeadlineAr('');
    setFormHeadlineZh('');
    setFormHeadlineCkb('');
    setFormBodyEn('');
    setFormBodyAr('');
    setFormBodyZh('');
    setFormBodyCkb('');
    setFormEyebrowEn('');
    setFormEyebrowAr('');
    setFormEyebrowZh('');
    setFormEyebrowCkb('');
    setFormCtaLabelEn('');
    setFormCtaHref('');
    setFormImageUrl('');
    setFormAltTextEn('');
    setFormChipsEn('');

    setStyleBgColor('');
    setStyleTextColor('');
    setStyleBorderColor('');
    setStyleBorderRadius('16px');
    setStylePadding('16px');
    setStyleShadow('0 4px 6px -1px rgb(0 0 0 / 0.1)');

    setVisibilityState('visible');
    setScheduleFrom('');
    setScheduleTo('');
    setFormStatus('active');
    setActiveFormTab('content');
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (card: CiseCommandHubControlledCard) => {
    setEditingCard(card);
    setFormHeadlineEn(card.headline.en || '');
    setFormHeadlineAr(card.headline.ar || '');
    setFormHeadlineZh(card.headline.zh || '');
    setFormHeadlineCkb(card.headline.ckb || '');

    setFormBodyEn(card.body.en || '');
    setFormBodyAr(card.body.ar || '');
    setFormBodyZh(card.body.zh || '');
    setFormBodyCkb(card.body.ckb || '');

    setFormEyebrowEn(card.eyebrow?.en || '');
    setFormEyebrowAr(card.eyebrow?.ar || '');
    setFormEyebrowZh(card.eyebrow?.zh || '');
    setFormEyebrowCkb(card.eyebrow?.ckb || '');

    setFormCtaLabelEn(card.ctaLabel?.en || '');
    setFormCtaHref(card.ctaHref || '');
    setFormImageUrl(card.imageUrl || '');
    setFormAltTextEn(card.altText?.en || '');
    setFormChipsEn(card.chips?.map(c => c.en).join(', ') || '');

    const styles = card.customization.styleOverrides;
    setStyleBgColor(styles.backgroundColor || '');
    setStyleTextColor(styles.textColor || '');
    setStyleBorderColor(styles.borderColor || '');
    setStyleBorderRadius(styles.borderRadius || '16px');
    setStylePadding(styles.padding || '16px');
    setStyleShadow(styles.shadow || '0 4px 6px -1px rgb(0 0 0 / 0.1)');

    setVisibilityState(card.customization.visibility);
    setScheduleFrom(card.customization.scheduleFrom || '');
    setScheduleTo(card.customization.scheduleTo || '');
    setFormStatus(card.status);
    setActiveFormTab('content');
    setIsModalOpen(true);
  };

  // Form Submit Handler
  const handleSaveCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formHeadlineEn.trim()) {
      alert('English Headline is required.');
      return;
    }

    const payload = {
      sectionId,
      eyebrow: formEyebrowEn ? {
        en: formEyebrowEn,
        ar: formEyebrowAr || formEyebrowEn,
        zh: formEyebrowZh || formEyebrowEn,
        ckb: formEyebrowCkb || formEyebrowEn
      } : undefined,
      headline: {
        en: formHeadlineEn,
        ar: formHeadlineAr || formHeadlineEn,
        zh: formHeadlineZh || formHeadlineEn,
        ckb: formHeadlineCkb || formHeadlineEn
      },
      body: {
        en: formBodyEn,
        ar: formBodyAr || formBodyEn,
        zh: formBodyZh || formBodyEn,
        ckb: formBodyCkb || formBodyEn
      },
      ctaLabel: formCtaLabelEn ? {
        en: formCtaLabelEn,
        ar: formCtaLabelEn,
        zh: formCtaLabelEn,
        ckb: formCtaLabelEn
      } : undefined,
      ctaHref: formCtaHref,
      imageUrl: formImageUrl,
      altText: formAltTextEn ? {
        en: formAltTextEn,
        ar: formAltTextEn,
        zh: formAltTextEn,
        ckb: formAltTextEn
      } : undefined,
      chips: formChipsEn ? formChipsEn.split(',').map(s => ({
        en: s.trim(),
        ar: s.trim(),
        zh: s.trim(),
        ckb: s.trim()
      })) : undefined,
      status: formStatus,
      customization: {
        displayOrder: editingCard ? editingCard.customization.displayOrder : items.length + 1,
        visibility: visibilityState,
        scheduleFrom: scheduleFrom || null,
        scheduleTo: scheduleTo || null,
        styleOverrides: {
          backgroundColor: styleBgColor || null,
          textColor: styleTextColor || null,
          borderColor: styleBorderColor || null,
          borderRadius: styleBorderRadius || '16px',
          padding: stylePadding || '16px',
          shadow: styleShadow || '0 4px 6px -1px rgb(0 0 0 / 0.1)'
        }
      }
    };

    if (editingCard) {
      await updateCard(sectionId, editingCard.id, payload);
      showNotice(`Record "${formHeadlineEn}" successfully updated.`);
    } else {
      await addCard(sectionId, payload);
      showNotice(`New record "${formHeadlineEn}" created.`);
    }

    setIsModalOpen(false);
  };

  // Machine Translation helper
  const handleMachineTranslate = () => {
    if (!formHeadlineEn) return;
    setFormHeadlineAr(`[مترجم آلياً] ${formHeadlineEn}`);
    setFormHeadlineZh(`[自动翻译] ${formHeadlineEn}`);
    setFormHeadlineCkb(`[وەرگێڕدراوی خۆکار] ${formHeadlineEn}`);

    if (formBodyEn) {
      setFormBodyAr(`[مترجم آلياً] ${formBodyEn}`);
      setFormBodyZh(`[自动翻译] ${formBodyEn}`);
      setFormBodyCkb(`[وەرگێڕدراوی خۆکار] ${formBodyEn}`);
    }
    showNotice('Machine translation drafts populated for Arabic, Chinese, and Kurdish.');
  };

  const handleDuplicate = async (cardId: string) => {
    const dup = await duplicateCard(sectionId, cardId);
    if (dup) showNotice('Record duplicated as Draft.');
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredItems.map(i => i.id));
    }
  };

  const handleToggleSelectOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with Role Badge & Create Record Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
            <Shield size={14} />
            <span>CISE Command Hub • Administrative Surface</span>
          </div>
          <h2 className="text-xl font-black uppercase text-white">{sectionTitle}</h2>
          {sectionDescription && (
            <p className="text-xs text-neutral-400 mt-0.5">{sectionDescription}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {section && (
            <button
              type="button"
              onClick={() => toggleSectionVisibility(sectionId)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
                section.customization.visibility === 'visible'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-neutral-900 text-neutral-500 border border-neutral-800'
              }`}
            >
              {section.customization.visibility === 'visible' ? <Eye size={13} /> : <EyeOff size={13} />}
              <span>Section: {section.customization.visibility}</span>
            </button>
          )}

          {canEdit ? (
            <button
              type="button"
              onClick={handleOpenCreate}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
            >
              <Plus size={14} />
              <span>Create Record</span>
            </button>
          ) : (
            <span className="text-xs px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono">
              Role: VIEWER (Read-Only)
            </span>
          )}
        </div>
      </div>

      {/* Notifications Banner */}
      {notice && (
        <div className="p-3 bg-emerald-950 border border-emerald-500 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* 2. Filter Bar with Search, Sort, and Bulk Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-900 border border-neutral-800 p-3 rounded-2xl">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search records by headline or body..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
          >
            <option value="all">All Records ({items.length})</option>
            <option value="active">Active Only</option>
            <option value="draft">Drafts Only</option>
            <option value="archived">Archived (Trash)</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedIds.length > 0 && canEdit && (
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono text-neutral-400 font-bold">
              {selectedIds.length} Selected
            </span>
            <button
              type="button"
              onClick={() => {
                bulkUpdateStatus(sectionId, selectedIds, 'active');
                setSelectedIds([]);
                showNotice('Selected records marked Active.');
              }}
              className="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-lg text-xs font-bold cursor-pointer hover:bg-emerald-900"
            >
              Publish
            </button>
            <button
              type="button"
              onClick={() => {
                bulkUpdateStatus(sectionId, selectedIds, 'archived');
                setSelectedIds([]);
                showNotice('Selected records moved to Archive.');
              }}
              className="px-2.5 py-1 bg-neutral-800 text-neutral-300 rounded-lg text-xs font-bold cursor-pointer hover:bg-neutral-700"
            >
              Archive
            </button>
          </div>
        )}
      </div>

      {/* 3. List View with Actions & Reordering */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-neutral-950 text-neutral-400 font-bold uppercase tracking-wider border-b border-neutral-800">
              <tr>
                <th className="p-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredItems.length && filteredItems.length > 0}
                    onChange={handleToggleSelectAll}
                    className="rounded bg-neutral-900 border-neutral-700 text-red-600 focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="p-3 w-14 text-center">Order</th>
                <th className="p-3">Record Details</th>
                <th className="p-3">Visibility</th>
                <th className="p-3">Status</th>
                <th className="p-3">Updated</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 font-mono text-[11px]">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-neutral-500 italic">
                    No records found in {sectionTitle}. Use "Create Record" to publish initial content.
                  </td>
                </tr>
              ) : (
                filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-neutral-850/60 transition-colors">
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleToggleSelectOne(item.id)}
                        className="rounded bg-neutral-900 border-neutral-700 text-red-600 focus:ring-0 cursor-pointer"
                      />
                    </td>

                    <td className="p-3 text-center">
                      <div className="flex flex-col items-center gap-0.5">
                        <button
                          type="button"
                          onClick={() => reorderCard(sectionId, item.id, 'up')}
                          disabled={!canEdit}
                          className="hover:text-white text-neutral-500 disabled:opacity-30 cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp size={11} />
                        </button>
                        <span className="font-bold text-neutral-300">{item.customization.displayOrder}</span>
                        <button
                          type="button"
                          onClick={() => reorderCard(sectionId, item.id, 'down')}
                          disabled={!canEdit}
                          className="hover:text-white text-neutral-500 disabled:opacity-30 cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown size={11} />
                        </button>
                      </div>
                    </td>

                    <td className="p-3 font-sans">
                      <div className="space-y-1">
                        {item.eyebrow?.en && (
                          <div className="text-[10px] font-black uppercase text-red-400 tracking-wider">
                            {item.eyebrow.en}
                          </div>
                        )}
                        <div className="font-bold text-white text-xs">
                          {item.headline.en}
                        </div>
                        <div className="text-[11px] text-neutral-400 line-clamp-1">
                          {item.body.en}
                        </div>
                        <div className="text-[10px] text-neutral-500 flex items-center gap-2 pt-0.5 font-mono">
                          <span dir="rtl">{item.headline.ar || '—'}</span>
                          <span>•</span>
                          <span>{item.headline.zh || '—'}</span>
                          <span>•</span>
                          <span dir="rtl">{item.headline.ckb || '—'}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.customization.visibility === 'visible' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        item.customization.visibility === 'scheduled' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                        'bg-neutral-800 text-neutral-500'
                      }`}>
                        {item.customization.visibility}
                      </span>
                    </td>

                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        item.status === 'active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        item.status === 'draft' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                        'bg-neutral-800 text-neutral-500 border border-neutral-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>

                    <td className="p-3 text-neutral-400 text-[10px]">
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </td>

                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {canEdit && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(item)}
                              className="p-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-200 hover:text-white transition-colors cursor-pointer"
                              title="Edit Record"
                            >
                              <Edit size={12} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDuplicate(item.id)}
                              className="p-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-200 hover:text-white transition-colors cursor-pointer"
                              title="Duplicate as Draft"
                            >
                              <Copy size={12} />
                            </button>
                          </>
                        )}

                        {item.status === 'archived' ? (
                          canEdit && (
                            <button
                              type="button"
                              onClick={async () => {
                                await restoreCard(sectionId, item.id);
                                showNotice('Record restored.');
                              }}
                              className="p-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 rounded-lg text-emerald-300 transition-colors cursor-pointer"
                              title="Restore from Archive"
                            >
                              <RotateCcw size={12} />
                            </button>
                          )
                        ) : (
                          canEdit && (
                            <button
                              type="button"
                              onClick={async () => {
                                await softDeleteCard(sectionId, item.id);
                                showNotice('Record archived.');
                              }}
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
                            onClick={async () => {
                              if (confirm('PERMANENT DELETION: Destroy this record completely from the database?')) {
                                await permanentDeleteCard(sectionId, item.id);
                                showNotice('Record permanently destroyed.');
                              }
                            }}
                            className="p-1.5 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 rounded-lg transition-colors cursor-pointer"
                            title="Permanent Destroy"
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

      {/* 4. Seven-Part Form Modal with 5 Tabs + Preview + Danger Zone */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-4xl p-6 space-y-5 my-8 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-black uppercase text-white flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-red-500" />
                <span>{editingCard ? `Edit Record • ${sectionTitle}` : `Create New Record • ${sectionTitle}`}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-500 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-neutral-800 pb-2">
              <button
                type="button"
                onClick={() => setActiveFormTab('content')}
                className={`px-3 py-1 rounded-xl text-xs font-bold uppercase cursor-pointer ${
                  activeFormTab === 'content' ? 'bg-red-600 text-white' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                Content
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('style')}
                className={`px-3 py-1 rounded-xl text-xs font-bold uppercase cursor-pointer flex items-center gap-1.5 ${
                  activeFormTab === 'style' ? 'bg-red-600 text-white' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <Palette size={12} />
                <span>Style Overrides</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('visibility')}
                className={`px-3 py-1 rounded-xl text-xs font-bold uppercase cursor-pointer flex items-center gap-1.5 ${
                  activeFormTab === 'visibility' ? 'bg-red-600 text-white' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <Clock size={12} />
                <span>Visibility & Schedule</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('localization')}
                className={`px-3 py-1 rounded-xl text-xs font-bold uppercase cursor-pointer flex items-center gap-1.5 ${
                  activeFormTab === 'localization' ? 'bg-red-600 text-white' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <Globe size={12} />
                <span>Localization (4 Languages)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('history')}
                className={`px-3 py-1 rounded-xl text-xs font-bold uppercase cursor-pointer flex items-center gap-1.5 ${
                  activeFormTab === 'history' ? 'bg-red-600 text-white' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <History size={12} />
                <span>Revisions</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('danger')}
                className={`px-3 py-1 rounded-xl text-xs font-bold uppercase cursor-pointer flex items-center gap-1.5 ${
                  activeFormTab === 'danger' ? 'bg-red-950 text-red-400 border border-red-800' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <AlertTriangle size={12} />
                <span>Danger Zone</span>
              </button>
            </div>

            <form onSubmit={handleSaveCard} className="space-y-4">
              {/* TAB 1: CONTENT */}
              {activeFormTab === 'content' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                        Eyebrow / Category Tag (EN)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. BILATERAL PIPELINE"
                        value={formEyebrowEn}
                        onChange={e => setFormEyebrowEn(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                        Publishing Status
                      </label>
                      <select
                        value={formStatus}
                        onChange={e => setFormStatus(e.target.value as any)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                      >
                        <option value="active">Active (Published)</option>
                        <option value="draft">Draft (Private)</option>
                        <option value="archived">Archived (Trash)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                      Headline / Title (EN)*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Grand Faw Port Infrastructure Rail Link"
                      value={formHeadlineEn}
                      onChange={e => setFormHeadlineEn(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                      Body / Dossier Abstract (EN)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Comprehensive synopsis, background analysis, and protocol context..."
                      value={formBodyEn}
                      onChange={e => setFormBodyEn(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                        Call to Action Label (EN)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Review Dossier"
                        value={formCtaLabelEn}
                        onChange={e => setFormCtaLabelEn(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                        CTA Destination Href
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. /initiatives/grand-faw"
                        value={formCtaHref}
                        onChange={e => setFormCtaHref(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                        Image / Hero Media Asset URL
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. /images/initiatives/port-rail.jpg"
                        value={formImageUrl}
                        onChange={e => setFormImageUrl(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                        Accessibility Alt Text (EN)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Architectural rendering of Grand Faw Port"
                        value={formAltTextEn}
                        onChange={e => setFormAltTextEn(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                      Chips / Keyword Tags (EN, comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Infrastructure, Strategic, Bilateral"
                      value={formChipsEn}
                      onChange={e => setFormChipsEn(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: STYLE OVERRIDES */}
              {activeFormTab === 'style' && (
                <div className="space-y-4">
                  <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 text-xs text-neutral-400">
                    Fine-tune card appearance dynamically without code deployment. These styles override default tailwind tokens.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                        Background Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={styleBgColor || '#18181b'}
                          onChange={e => setStyleBgColor(e.target.value)}
                          className="w-8 h-8 rounded border border-neutral-700 bg-transparent cursor-pointer"
                        />
                        <input
                          type="text"
                          placeholder="#18181b"
                          value={styleBgColor}
                          onChange={e => setStyleBgColor(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                        Text Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={styleTextColor || '#ffffff'}
                          onChange={e => setStyleTextColor(e.target.value)}
                          className="w-8 h-8 rounded border border-neutral-700 bg-transparent cursor-pointer"
                        />
                        <input
                          type="text"
                          placeholder="#ffffff"
                          value={styleTextColor}
                          onChange={e => setStyleTextColor(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                        Border Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={styleBorderColor || '#27272a'}
                          onChange={e => setStyleBorderColor(e.target.value)}
                          className="w-8 h-8 rounded border border-neutral-700 bg-transparent cursor-pointer"
                        />
                        <input
                          type="text"
                          placeholder="#27272a"
                          value={styleBorderColor}
                          onChange={e => setStyleBorderColor(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                        Border Radius
                      </label>
                      <input
                        type="text"
                        placeholder="16px"
                        value={styleBorderRadius}
                        onChange={e => setStyleBorderRadius(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                        Internal Padding
                      </label>
                      <input
                        type="text"
                        placeholder="16px"
                        value={stylePadding}
                        onChange={e => setStylePadding(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                        Box Shadow
                      </label>
                      <select
                        value={styleShadow}
                        onChange={e => setStyleShadow(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        <option value="none">None</option>
                        <option value="0 4px 6px -1px rgb(0 0 0 / 0.1)">Subtle Diplomatic</option>
                        <option value="0 10px 15px -3px rgb(0 0 0 / 0.3)">Elevated Command</option>
                        <option value="0 20px 25px -5px rgb(0 0 0 / 0.5)">Deep Sovereign Glow</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: VISIBILITY & SCHEDULE */}
              {activeFormTab === 'visibility' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                      Publication Visibility
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(['visible', 'hidden', 'scheduled'] as const).map(vis => (
                        <button
                          key={vis}
                          type="button"
                          onClick={() => setVisibilityState(vis)}
                          className={`p-3 rounded-xl border text-xs font-bold uppercase transition-all cursor-pointer ${
                            visibilityState === vis
                              ? 'bg-red-600 text-white border-red-500 shadow-md'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {vis}
                        </button>
                      ))}
                    </div>
                  </div>

                  {visibilityState === 'scheduled' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                          Schedule From (ISO / Date)
                        </label>
                        <input
                          type="datetime-local"
                          value={scheduleFrom}
                          onChange={e => setScheduleFrom(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                          Schedule Until (Expiration)
                        </label>
                        <input
                          type="datetime-local"
                          value={scheduleTo}
                          onChange={e => setScheduleTo(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: LOCALIZATION (4 LANGUAGES) */}
              {activeFormTab === 'localization' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                    <span className="text-xs font-bold text-neutral-300">
                      Quad-Lingual Diplomatic Translations (AR, ZH, CKB)
                    </span>
                    <button
                      type="button"
                      onClick={handleMachineTranslate}
                      className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-red-400 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles size={12} />
                      <span>Draft Machine Translation</span>
                    </button>
                  </div>

                  {/* Arabic */}
                  <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 space-y-2">
                    <span className="text-[10px] font-black uppercase text-emerald-400">Arabic (العربية)</span>
                    <input
                      type="text"
                      dir="rtl"
                      placeholder="العنوان باللغة العربية"
                      value={formHeadlineAr}
                      onChange={e => setFormHeadlineAr(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                    <textarea
                      rows={2}
                      dir="rtl"
                      placeholder="الملخص أو النص العربي..."
                      value={formBodyAr}
                      onChange={e => setFormBodyAr(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  {/* Chinese */}
                  <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 space-y-2">
                    <span className="text-[10px] font-black uppercase text-red-400">Mandarin Chinese (简体中文)</span>
                    <input
                      type="text"
                      placeholder="中文官方标题"
                      value={formHeadlineZh}
                      onChange={e => setFormHeadlineZh(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                    <textarea
                      rows={2}
                      placeholder="中文正文摘要..."
                      value={formBodyZh}
                      onChange={e => setFormBodyZh(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  {/* Central Kurdish */}
                  <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 space-y-2">
                    <span className="text-[10px] font-black uppercase text-amber-400">Central Kurdish / Sorani (کوردی)</span>
                    <input
                      type="text"
                      dir="rtl"
                      placeholder="سەردێڕی فەرمی بە زمانی کوردی"
                      value={formHeadlineCkb}
                      onChange={e => setFormHeadlineCkb(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                    <textarea
                      rows={2}
                      dir="rtl"
                      placeholder="پوختەی هەواڵ یان ڕاپۆرت بە کوردی..."
                      value={formBodyCkb}
                      onChange={e => setFormBodyCkb(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: HISTORY */}
              {activeFormTab === 'history' && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-neutral-400 uppercase">
                    Audit Log & Revision History
                  </span>
                  {!editingCard?.history || editingCard.history.length === 0 ? (
                    <div className="p-6 text-center text-xs text-neutral-500 bg-neutral-950 rounded-xl border border-neutral-800">
                      No prior revisions recorded for this entry.
                    </div>
                  ) : (
                    <div className="divide-y divide-neutral-800 border border-neutral-800 rounded-xl bg-neutral-950">
                      {editingCard.history.map(rev => (
                        <div key={rev.id} className="p-3 text-xs flex items-center justify-between">
                          <div>
                            <div className="font-bold text-white uppercase text-[11px]">
                              {rev.action} • {rev.actor} ({rev.role})
                            </div>
                            <div className="text-[10px] text-neutral-400">{rev.diffSummary}</div>
                          </div>
                          <span className="text-[10px] text-neutral-500 font-mono">
                            {new Date(rev.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: DANGER ZONE */}
              {activeFormTab === 'danger' && (
                <div className="p-4 bg-red-950/40 border border-red-800 rounded-xl space-y-4 text-xs">
                  <h4 className="font-black uppercase text-red-400 flex items-center gap-2">
                    <AlertTriangle size={16} />
                    <span>Administrative Danger Zone</span>
                  </h4>
                  <p className="text-neutral-400 text-[11px]">
                    Actions executed here immediately change records across the public ecosystem.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {editingCard && editingCard.status !== 'archived' && (
                      <button
                        type="button"
                        onClick={async () => {
                          await softDeleteCard(sectionId, editingCard.id);
                          showNotice('Record archived.');
                          setIsModalOpen(false);
                        }}
                        className="px-4 py-2 bg-amber-950 border border-amber-800 text-amber-300 font-bold rounded-xl cursor-pointer hover:bg-amber-900"
                      >
                        Move to Archive (Soft Delete)
                      </button>
                    )}

                    {editingCard && editingCard.status === 'archived' && (
                      <button
                        type="button"
                        onClick={async () => {
                          await restoreCard(sectionId, editingCard.id);
                          showNotice('Record restored to active status.');
                          setIsModalOpen(false);
                        }}
                        className="px-4 py-2 bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold rounded-xl cursor-pointer hover:bg-emerald-900"
                      >
                        Restore Record
                      </button>
                    )}

                    {isSuperAdmin && editingCard && (
                      <button
                        type="button"
                        onClick={async () => {
                          if (confirm('PERMANENT DESTRUCTION WARNING: Permanently delete this record? This cannot be undone.')) {
                            await permanentDeleteCard(sectionId, editingCard.id);
                            showNotice('Record destroyed permanently.');
                            setIsModalOpen(false);
                          }
                        }}
                        className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white font-bold rounded-xl cursor-pointer"
                      >
                        Permanently Destroy Record
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* 5. LIVE PREVIEW PANEL (SYNCHRONOUS) */}
              <div className="mt-4 pt-4 border-t border-neutral-800 space-y-2">
                <span className="text-[10px] font-black uppercase text-neutral-500 tracking-wider">
                  Live Viewport Preview
                </span>
                <div
                  className="rounded-xl border transition-all p-4"
                  style={{
                    backgroundColor: styleBgColor || '#18181b',
                    color: styleTextColor || '#ffffff',
                    borderColor: styleBorderColor || '#27272a',
                    borderRadius: styleBorderRadius || '16px',
                    padding: stylePadding || '16px',
                    boxShadow: styleShadow || 'none'
                  }}
                >
                  {formEyebrowEn && (
                    <div className="text-[10px] font-black uppercase tracking-wider text-red-400 mb-1">
                      {formEyebrowEn}
                    </div>
                  )}
                  <h4 className="text-sm font-black tracking-tight mb-1">
                    {formHeadlineEn || 'Headline Preview'}
                  </h4>
                  <p className="text-xs opacity-80 leading-relaxed mb-3">
                    {formBodyEn || 'Body content preview will appear here in real-time as you type in the editor tabs above.'}
                  </p>
                  {formCtaLabelEn && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 underline">
                      <span>{formCtaLabelEn}</span>
                      <ExternalLink size={12} />
                    </span>
                  )}
                </div>
              </div>

              {/* Modal Action Buttons */}
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
                  <span>{editingCard ? 'Save Changes' : 'Create Record'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
