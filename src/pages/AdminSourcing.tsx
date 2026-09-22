import { apiFetch } from "../lib/api";
import React, { useState, useEffect } from 'react';
import { 
  Mail, Search, CheckCircle, Clock, XCircle, MoreVertical, Eye, Calendar, 
  Building2, Ticket, Plus, Edit2, Trash2, ArrowUp, ArrowDown, RotateCcw, 
  Factory, Layers, ShieldCheck, Ship, Check, Sliders, RefreshCw, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SourcingPillarAdmin {
  id: string;
  slug: string;
  serviceCode: string;
  iconName: string;
  order: number;
  isActive: boolean;
  titleEn: string;
  titleAr: string;
  titleZh: string;
  titleCkb: string;
  tagEn: string;
  tagAr: string;
  tagZh: string;
  tagCkb: string;
  updateBadgeEn: string;
  updateBadgeAr: string;
  updateBadgeZh: string;
  updateBadgeCkb: string;
  descEn: string;
  descAr: string;
  descZh: string;
  descCkb: string;
  leadSummaryEn: string;
  leadSummaryAr: string;
  leadSummaryZh: string;
  leadSummaryCkb: string;
  wordCount: number;
  readTimeEn: string;
  readTimeAr: string;
  readTimeZh: string;
  readTimeCkb: string;
  metricsJson: string;
  comprehensiveSpecificationEn: string;
  comprehensiveSpecificationAr: string;
  comprehensiveSpecificationZh: string;
  comprehensiveSpecificationCkb: string;
  updates2026En: string;
  updates2026Ar: string;
  updates2026Zh: string;
  updates2026Ckb: string;
  deliverablesEn: string;
  deliverablesAr: string;
  deliverablesZh: string;
  deliverablesCkb: string;
  standardsJson: string;
}

const defaultPillarForm: Partial<SourcingPillarAdmin> = {
  slug: '',
  serviceCode: 'PRODUCT_SOURCING',
  iconName: 'Factory',
  order: 1,
  isActive: true,
  titleEn: '',
  titleAr: '',
  titleZh: '',
  titleCkb: '',
  tagEn: '',
  tagAr: '',
  tagZh: '',
  tagCkb: '',
  updateBadgeEn: '',
  updateBadgeAr: '',
  updateBadgeZh: '',
  updateBadgeCkb: '',
  descEn: '',
  descAr: '',
  descZh: '',
  descCkb: '',
  leadSummaryEn: '',
  leadSummaryAr: '',
  leadSummaryZh: '',
  leadSummaryCkb: '',
  wordCount: 320,
  readTimeEn: '2 Min Read',
  readTimeAr: 'قراءة في دقيقتين',
  readTimeZh: '2 分钟精读',
  readTimeCkb: '٢ خولەک خوێندنەوە',
  metricsJson: '[]',
  comprehensiveSpecificationEn: '[]',
  comprehensiveSpecificationAr: '[]',
  comprehensiveSpecificationZh: '[]',
  comprehensiveSpecificationCkb: '[]',
  updates2026En: '[]',
  updates2026Ar: '[]',
  updates2026Zh: '[]',
  updates2026Ckb: '[]',
  deliverablesEn: '[]',
  deliverablesAr: '[]',
  deliverablesZh: '[]',
  deliverablesCkb: '[]',
  standardsJson: '[]',
};

export default function AdminSourcing() {
  const [activeTab, setActiveTab] = useState<'INQUIRIES' | 'PILLARS'>('INQUIRIES');

  // Inquiries State
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('ALL');

  // Sourcing Pillars State
  const [pillars, setPillars] = useState<SourcingPillarAdmin[]>([]);
  const [isLoadingPillars, setIsLoadingPillars] = useState(false);
  const [pillarModalOpen, setPillarModalOpen] = useState(false);
  const [editingPillar, setEditingPillar] = useState<Partial<SourcingPillarAdmin> | null>(null);
  const [isSavingPillar, setIsSavingPillar] = useState(false);
  const [pillarActionMsg, setPillarActionMsg] = useState('');

  useEffect(() => {
    fetchInquiries();
    fetchPillars();
  }, []);

  const fetchInquiries = async () => {
    setIsLoadingInquiries(true);
    try {
      const res = await apiFetch('/api/admin/sourcing');
      if (res.ok) {
        setInquiries(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingInquiries(false);
    }
  };

  const fetchPillars = async () => {
    setIsLoadingPillars(true);
    try {
      const res = await apiFetch('/api/admin/sourcing/pillars');
      if (res.ok) {
        setPillars(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingPillars(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await apiFetch(`/api/admin/sourcing/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchInquiries();
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateAdminNotes = async (id: string, notes: string) => {
    try {
      const res = await apiFetch(`/api/admin/sourcing/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes: notes })
      });
      if (res.ok) {
        fetchInquiries();
        setSelectedInquiry({ ...selectedInquiry, adminNotes: notes });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const togglePillarActive = async (pillar: SourcingPillarAdmin) => {
    try {
      const res = await apiFetch(`/api/admin/sourcing/pillars/${pillar.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !pillar.isActive })
      });
      if (res.ok) {
        fetchPillars();
        showPillarNotice(`Status for "${pillar.titleEn}" updated`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const movePillar = async (index: number, direction: 'UP' | 'DOWN') => {
    const targetIndex = direction === 'UP' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= pillars.length) return;

    const newItems = [...pillars];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const reordered = newItems.map((p, idx) => ({ id: p.id, order: idx + 1 }));
    try {
      const res = await apiFetch('/api/admin/sourcing/pillars/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: reordered })
      });
      if (res.ok) {
        fetchPillars();
        showPillarNotice('Pillars reordered successfully');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeletePillar = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await apiFetch(`/api/admin/sourcing/pillars/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchPillars();
        showPillarNotice(`Deleted "${title}"`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetDefaults = async () => {
    if (!window.confirm('Reset all sourcing service pillars to official 2026 default 4 cards? Any custom modifications will be re-seeded.')) return;
    try {
      const res = await apiFetch('/api/admin/sourcing/pillars/reset-defaults', {
        method: 'POST'
      });
      if (res.ok) {
        fetchPillars();
        showPillarNotice('Reset to default 4 service pillars complete');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSavePillar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPillar || !editingPillar.titleEn) return;
    setIsSavingPillar(true);
    try {
      if (editingPillar.id) {
        const res = await apiFetch(`/api/admin/sourcing/pillars/${editingPillar.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingPillar)
        });
        if (res.ok) {
          setPillarModalOpen(false);
          setEditingPillar(null);
          fetchPillars();
          showPillarNotice('Service pillar updated successfully');
        }
      } else {
        const res = await apiFetch('/api/admin/sourcing/pillars', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingPillar)
        });
        if (res.ok) {
          setPillarModalOpen(false);
          setEditingPillar(null);
          fetchPillars();
          showPillarNotice('New service pillar created');
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingPillar(false);
    }
  };

  const showPillarNotice = (msg: string) => {
    setPillarActionMsg(msg);
    setTimeout(() => setPillarActionMsg(''), 4000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'REVIEWED': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'CONTACTED': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'CLOSED': return 'bg-neutral-100 text-neutral-800 border-neutral-300';
      default: return 'bg-neutral-100 text-neutral-800 border-neutral-300';
    }
  };

  const getTypeLabel = (type: string) => {
    return (type || '').replace(/_/g, ' ');
  };

  const filteredInquiries = inquiries.filter(inq => {
    const matchesStatus = inquiryStatusFilter === 'ALL' || inq.status === inquiryStatusFilter;
    const q = inquirySearch.toLowerCase();
    const matchesSearch = !q || 
      (inq.ticketId || '').toLowerCase().includes(q) ||
      (inq.fullName || '').toLowerCase().includes(q) ||
      (inq.company || '').toLowerCase().includes(q) ||
      (inq.email || '').toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 h-full flex flex-col text-start">
      {/* Page Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-800 uppercase tracking-widest mb-1">
            <Factory size={14} />
            <span>Sino-Iraqi Bilateral Sourcing Desk</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-brand-900 uppercase">
            Bilateral Sourcing & Verification Operations
          </h1>
          <p className="text-neutral-500 font-medium text-xs mt-0.5">
            Manage commercial inquiry tickets, client audit requests, and official service cards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'PILLARS' ? (
            <>
              <button
                onClick={handleResetDefaults}
                className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold uppercase tracking-wider border border-neutral-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Reset Defaults</span>
              </button>
              <button
                onClick={() => {
                  setEditingPillar({
                    ...defaultPillarForm,
                    order: pillars.length + 1
                  });
                  setPillarModalOpen(true);
                }}
                className="px-3 py-1.5 bg-brand-800 hover:bg-brand-900 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus size={14} />
                <span>Add Service Pillar</span>
              </button>
            </>
          ) : (
            <button
              onClick={fetchInquiries}
              className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold uppercase tracking-wider border border-neutral-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw size={13} />
              <span>Refresh Ledger</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 mb-4 pb-1">
        <button
          onClick={() => setActiveTab('INQUIRIES')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
            activeTab === 'INQUIRIES'
              ? 'border-brand-800 text-brand-800 bg-brand-50/50'
              : 'border-transparent text-neutral-600 hover:text-brand-800'
          }`}
        >
          <Ticket size={14} />
          <span>Inquiries Ledger ({inquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('PILLARS')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
            activeTab === 'PILLARS'
              ? 'border-brand-800 text-brand-800 bg-brand-50/50'
              : 'border-transparent text-neutral-600 hover:text-brand-800'
          }`}
        >
          <Layers size={14} />
          <span>Sourcing Service Pillars / Cards ({pillars.length})</span>
        </button>
      </div>

      {pillarActionMsg && (
        <div className="mb-4 p-2.5 bg-brand-50 border border-brand-800/30 text-brand-800 text-xs font-bold flex items-center gap-2">
          <Check size={14} />
          <span>{pillarActionMsg}</span>
        </div>
      )}

      {/* TAB 1: INQUIRIES LEDGER */}
      {activeTab === 'INQUIRIES' && (
        <div className="bg-white border border-neutral-200 flex-1 overflow-hidden shadow-xs flex flex-col">
          {/* Controls Bar */}
          <div className="p-3 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search ticket ID, client, company, email..."
                  value={inquirySearch}
                  onChange={e => setInquirySearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-brand-800"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-3xs font-mono uppercase text-neutral-500 font-bold">Status:</span>
              <select
                value={inquiryStatusFilter}
                onChange={e => setInquiryStatusFilter(e.target.value)}
                className="text-xs p-1.5 bg-white border border-neutral-300 focus:outline-none focus:border-brand-800 font-bold"
              >
                <option value="ALL">All ({inquiries.length})</option>
                <option value="PENDING">Pending</option>
                <option value="REVIEWED">Reviewed</option>
                <option value="CONTACTED">Contacted</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-start border-collapse">
              <thead className="sticky top-0 bg-neutral-100 z-10">
                <tr className="border-b border-neutral-200 text-3xs uppercase font-mono font-bold text-neutral-600 tracking-wider">
                  <th className="p-3 text-start">Ticket ID</th>
                  <th className="p-3 text-start">Client</th>
                  <th className="p-3 text-start">Company</th>
                  <th className="p-3 text-start">Inquiry Type</th>
                  <th className="p-3 text-start">Market</th>
                  <th className="p-3 text-start">Date</th>
                  <th className="p-3 text-start">Status</th>
                  <th className="p-3 text-end">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs font-medium text-neutral-700">
                {filteredInquiries.map(inquiry => (
                  <tr 
                    key={inquiry.id} 
                    className="border-b border-neutral-100 hover:bg-neutral-50/80 cursor-pointer transition-colors" 
                    onClick={() => setSelectedInquiry(inquiry)}
                  >
                    <td className="p-3 font-mono font-bold text-brand-800 text-start">{inquiry.ticketId}</td>
                    <td className="p-3 text-start">
                      <div className="font-bold text-neutral-900">{inquiry.fullName}</div>
                      <div className="text-3xs text-neutral-500">{inquiry.email}</div>
                    </td>
                    <td className="p-3 text-start">{inquiry.company || '—'}</td>
                    <td className="p-3 text-start">
                      <span className="bg-neutral-100 px-2 py-0.5 rounded-2xs text-3xs font-mono font-bold uppercase tracking-wider text-neutral-700">
                        {getTypeLabel(inquiry.inquiryType)}
                      </span>
                    </td>
                    <td className="p-3 text-start text-3xs font-mono">{inquiry.targetMarket || 'CHINA'}</td>
                    <td className="p-3 text-neutral-500 text-start text-3xs font-mono">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-start">
                      <span className={`px-2 py-0.5 text-3xs font-mono font-bold tracking-wider uppercase border ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="p-3 text-end">
                      <button className="text-neutral-400 hover:text-brand-800 p-1">
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredInquiries.length === 0 && !isLoadingInquiries && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-neutral-400 font-serif italic text-xs">
                      No sourcing inquiries found matching criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: SOURCING SERVICE PILLARS (CRUD) */}
      {activeTab === 'PILLARS' && (
        <div className="bg-white border border-neutral-200 flex-1 overflow-hidden shadow-xs flex flex-col">
          <div className="p-3 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-neutral-700">
              Live Sourcing Service Pillars & Cards ({pillars.length})
            </span>
            <span className="text-3xs font-mono text-neutral-500">
              Changes reflect immediately on the Bilateral Settlement & Sourcing portal.
            </span>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-start border-collapse">
              <thead className="sticky top-0 bg-neutral-100 z-10">
                <tr className="border-b border-neutral-200 text-3xs uppercase font-mono font-bold text-neutral-600 tracking-wider">
                  <th className="p-3 text-start">Order</th>
                  <th className="p-3 text-start">Icon & Slug</th>
                  <th className="p-3 text-start">Title (EN / AR / ZH / CKB)</th>
                  <th className="p-3 text-start">Tag / Badge</th>
                  <th className="p-3 text-start">Service Code</th>
                  <th className="p-3 text-start">Word Count</th>
                  <th className="p-3 text-start">Status</th>
                  <th className="p-3 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="text-xs font-medium text-neutral-700">
                {pillars.map((pillar, idx) => (
                  <tr key={pillar.id} className="border-b border-neutral-100 hover:bg-neutral-50/80 transition-colors">
                    <td className="p-3 text-start">
                      <div className="flex items-center gap-1">
                        <span className="font-mono font-bold text-xs">{pillar.order || idx + 1}</span>
                        <div className="flex flex-col">
                          <button
                            disabled={idx === 0}
                            onClick={() => movePillar(idx, 'UP')}
                            className="text-neutral-400 hover:text-brand-800 disabled:opacity-20 cursor-pointer p-0.5"
                          >
                            <ArrowUp size={11} />
                          </button>
                          <button
                            disabled={idx === pillars.length - 1}
                            onClick={() => movePillar(idx, 'DOWN')}
                            className="text-neutral-400 hover:text-brand-800 disabled:opacity-20 cursor-pointer p-0.5"
                          >
                            <ArrowDown size={11} />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-start">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-2xs bg-brand-800 text-white flex items-center justify-center text-3xs font-mono font-bold">
                          {pillar.iconName?.[0] || 'F'}
                        </span>
                        <div>
                          <div className="font-mono font-bold text-xs text-neutral-900">{pillar.iconName}</div>
                          <div className="text-3xs font-mono text-neutral-400">{pillar.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-start max-w-xs">
                      <div className="font-bold text-neutral-900 truncate">{pillar.titleEn}</div>
                      <div className="text-3xs text-neutral-500 truncate" dir="rtl">{pillar.titleAr || pillar.titleZh || '—'}</div>
                    </td>
                    <td className="p-3 text-start">
                      <div className="inline-block px-1.5 py-0.5 bg-brand-50 text-brand-800 border border-brand-800/20 text-3xs font-mono font-bold">
                        {pillar.tagEn || 'Standard'}
                      </div>
                      <div className="text-3xs text-neutral-400 mt-0.5 truncate max-w-[140px]">
                        {pillar.updateBadgeEn}
                      </div>
                    </td>
                    <td className="p-3 text-start">
                      <span className="font-mono text-3xs bg-neutral-100 px-1.5 py-0.5 rounded-2xs border border-neutral-200">
                        {pillar.serviceCode}
                      </span>
                    </td>
                    <td className="p-3 text-start font-mono text-3xs">
                      {pillar.wordCount || 320} words
                    </td>
                    <td className="p-3 text-start">
                      <button
                        onClick={() => togglePillarActive(pillar)}
                        className={`px-2 py-0.5 text-3xs font-mono font-bold uppercase cursor-pointer border ${
                          pillar.isActive
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-neutral-100 text-neutral-500 border-neutral-300'
                        }`}
                      >
                        {pillar.isActive ? 'Active' : 'Draft'}
                      </button>
                    </td>
                    <td className="p-3 text-end">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setEditingPillar(pillar);
                            setPillarModalOpen(true);
                          }}
                          className="p-1.5 text-neutral-500 hover:text-brand-800 hover:bg-neutral-100 rounded-2xs transition-colors cursor-pointer"
                          title="Edit Pillar"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeletePillar(pillar.id, pillar.titleEn)}
                          className="p-1.5 text-neutral-400 hover:text-red-700 hover:bg-neutral-100 rounded-2xs transition-colors cursor-pointer"
                          title="Delete Pillar"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pillars.length === 0 && !isLoadingPillars && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-neutral-400 font-serif italic text-xs">
                      No sourcing service pillars found. Click "Reset Defaults" or "Add Service Pillar".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inquiry Detail Drawer Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs" onClick={() => setSelectedInquiry(null)}>
            <motion.div 
              key={selectedInquiry.id}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col border-s border-neutral-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-neutral-50 p-6 border-b border-neutral-200 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-lg font-black text-brand-900 uppercase">Inquiry Details</h2>
                    <span className={`px-2 py-0.5 text-3xs font-mono font-bold tracking-widest uppercase border ${getStatusColor(selectedInquiry.status)}`}>
                      {selectedInquiry.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-neutral-500">
                    <span className="flex items-center gap-1 font-bold text-brand-800"><Ticket size={12}/> {selectedInquiry.ticketId}</span>
                    <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedInquiry(null)} className="text-neutral-400 hover:text-neutral-800 bg-white p-2 border border-neutral-200 shadow-xs cursor-pointer">
                  <XCircle size={18} />
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto space-y-6">
                <div className="grid grid-cols-2 gap-6 pb-4 border-b border-neutral-100">
                  <div>
                    <h3 className="text-3xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">Client Profile</h3>
                    <div className="font-bold text-sm text-neutral-900 mb-1">{selectedInquiry.fullName}</div>
                    <div className="text-xs flex items-center gap-2 text-neutral-600 mb-1"><Mail size={12}/> {selectedInquiry.email}</div>
                    <div className="text-xs flex items-center gap-2 text-neutral-600"><Building2 size={12}/> {selectedInquiry.company || 'Private Entity'}</div>
                  </div>
                  <div>
                    <h3 className="text-3xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">Service Request</h3>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between border-b border-neutral-100 pb-1">
                        <span className="text-neutral-500">Type</span>
                        <span className="font-bold text-brand-800">{getTypeLabel(selectedInquiry.inquiryType)}</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-100 pb-1">
                        <span className="text-neutral-500">Market</span>
                        <span className="font-bold">{selectedInquiry.targetMarket || 'CHINA'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-3xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">Client Inquiry Message</h3>
                  <div className="bg-neutral-50 p-4 border border-neutral-200 text-xs font-serif leading-relaxed text-neutral-800 whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </div>
                </div>

                <div>
                  <h3 className="text-3xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">Internal Clearing & Audit Notes</h3>
                  <textarea 
                    className="w-full text-xs p-3 border border-neutral-300 focus:border-brand-800 focus:outline-none min-h-[90px] resize-none"
                    placeholder="Add internal notes, correspondence logs, or verification outcome..."
                    defaultValue={selectedInquiry.adminNotes}
                    onBlur={(e) => updateAdminNotes(selectedInquiry.id, e.target.value)}
                  />
                  <p className="text-3xs font-mono text-neutral-400 mt-1">Saved automatically when clicking outside.</p>
                </div>

                <div>
                  <h3 className="text-3xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">Update Ticket Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {['PENDING', 'REVIEWED', 'CONTACTED', 'CLOSED'].map(st => (
                      <button 
                        key={st}
                        onClick={() => updateStatus(selectedInquiry.id, st)}
                        className={`text-3xs font-mono font-bold uppercase px-3 py-1.5 border cursor-pointer transition-colors ${
                          selectedInquiry.status === st 
                            ? 'bg-brand-800 border-brand-800 text-white' 
                            : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sourcing Pillar Edit / Create Modal */}
      <AnimatePresence>
        {pillarModalOpen && editingPillar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto" onClick={() => setPillarModalOpen(false)}>
            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white border-2 border-brand-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col rounded-xs"
            >
              <div className="bg-neutral-50 p-4 border-b border-neutral-200 flex items-center justify-between">
                <h3 className="text-base font-black text-brand-900 uppercase">
                  {editingPillar.id ? 'Edit Sourcing Service Pillar' : 'Create New Sourcing Pillar'}
                </h3>
                <button
                  onClick={() => setPillarModalOpen(false)}
                  className="p-1 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  <XCircle size={18} />
                </button>
              </div>

              <form onSubmit={handleSavePillar} className="p-5 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-3xs font-mono uppercase font-bold text-neutral-600 mb-1">Service Code *</label>
                    <select
                      value={editingPillar.serviceCode || 'PRODUCT_SOURCING'}
                      onChange={e => setEditingPillar({ ...editingPillar, serviceCode: e.target.value })}
                      className="w-full p-2 bg-white border border-neutral-300 font-mono text-xs focus:outline-none focus:border-brand-800"
                    >
                      <option value="FACTORY_AUDIT">FACTORY_AUDIT</option>
                      <option value="PRODUCT_SOURCING">PRODUCT_SOURCING</option>
                      <option value="PRE_SHIPMENT">PRE_SHIPMENT</option>
                      <option value="PORT_LOGISTICS">PORT_LOGISTICS</option>
                      <option value="CUSTOM_INSPECTION">CUSTOM_INSPECTION</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-3xs font-mono uppercase font-bold text-neutral-600 mb-1">Icon Name</label>
                    <select
                      value={editingPillar.iconName || 'Factory'}
                      onChange={e => setEditingPillar({ ...editingPillar, iconName: e.target.value })}
                      className="w-full p-2 bg-white border border-neutral-300 font-mono text-xs focus:outline-none focus:border-brand-800"
                    >
                      <option value="Factory">Factory</option>
                      <option value="Search">Search</option>
                      <option value="ShieldCheck">ShieldCheck</option>
                      <option value="Ship">Ship</option>
                      <option value="Building2">Building2</option>
                      <option value="Zap">Zap</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-3xs font-mono uppercase font-bold text-neutral-600 mb-1">Slug (URL Key)</label>
                    <input
                      type="text"
                      placeholder="e.g. factory-audits"
                      value={editingPillar.slug || ''}
                      onChange={e => setEditingPillar({ ...editingPillar, slug: e.target.value })}
                      className="w-full p-2 bg-white border border-neutral-300 font-mono text-xs focus:outline-none focus:border-brand-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-3xs font-mono uppercase font-bold text-neutral-600 mb-1">Title (English) *</label>
                    <input
                      type="text"
                      required
                      value={editingPillar.titleEn || ''}
                      onChange={e => setEditingPillar({ ...editingPillar, titleEn: e.target.value })}
                      className="w-full p-2 bg-white border border-neutral-300 font-bold focus:outline-none focus:border-brand-800"
                    />
                  </div>
                  <div>
                    <label className="block text-3xs font-mono uppercase font-bold text-neutral-600 mb-1">Title (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={editingPillar.titleAr || ''}
                      onChange={e => setEditingPillar({ ...editingPillar, titleAr: e.target.value })}
                      className="w-full p-2 bg-white border border-neutral-300 font-bold focus:outline-none focus:border-brand-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-3xs font-mono uppercase font-bold text-neutral-600 mb-1">Title (Chinese)</label>
                    <input
                      type="text"
                      value={editingPillar.titleZh || ''}
                      onChange={e => setEditingPillar({ ...editingPillar, titleZh: e.target.value })}
                      className="w-full p-2 bg-white border border-neutral-300 font-bold focus:outline-none focus:border-brand-800"
                    />
                  </div>
                  <div>
                    <label className="block text-3xs font-mono uppercase font-bold text-neutral-600 mb-1">Title (Kurdish)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={editingPillar.titleCkb || ''}
                      onChange={e => setEditingPillar({ ...editingPillar, titleCkb: e.target.value })}
                      className="w-full p-2 bg-white border border-neutral-300 font-bold focus:outline-none focus:border-brand-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-3xs font-mono uppercase font-bold text-neutral-600 mb-1">Tag (English)</label>
                    <input
                      type="text"
                      placeholder="e.g. 48h Field Dispatch"
                      value={editingPillar.tagEn || ''}
                      onChange={e => setEditingPillar({ ...editingPillar, tagEn: e.target.value })}
                      className="w-full p-2 bg-white border border-neutral-300 focus:outline-none focus:border-brand-800"
                    />
                  </div>
                  <div>
                    <label className="block text-3xs font-mono uppercase font-bold text-neutral-600 mb-1">Update Badge (EN)</label>
                    <input
                      type="text"
                      placeholder="e.g. 2026 Audit Protocol"
                      value={editingPillar.updateBadgeEn || ''}
                      onChange={e => setEditingPillar({ ...editingPillar, updateBadgeEn: e.target.value })}
                      className="w-full p-2 bg-white border border-neutral-300 focus:outline-none focus:border-brand-800"
                    />
                  </div>
                  <div>
                    <label className="block text-3xs font-mono uppercase font-bold text-neutral-600 mb-1">Word Count</label>
                    <input
                      type="number"
                      value={editingPillar.wordCount || 320}
                      onChange={e => setEditingPillar({ ...editingPillar, wordCount: parseInt(e.target.value) || 300 })}
                      className="w-full p-2 bg-white border border-neutral-300 font-mono focus:outline-none focus:border-brand-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-3xs font-mono uppercase font-bold text-neutral-600 mb-1">Short Description (English)</label>
                  <textarea
                    rows={2}
                    value={editingPillar.descEn || ''}
                    onChange={e => setEditingPillar({ ...editingPillar, descEn: e.target.value })}
                    className="w-full p-2 bg-white border border-neutral-300 focus:outline-none focus:border-brand-800 resize-none font-serif"
                  />
                </div>

                <div>
                  <label className="block text-3xs font-mono uppercase font-bold text-neutral-600 mb-1">Detailed Lead Summary (English)</label>
                  <textarea
                    rows={2}
                    value={editingPillar.leadSummaryEn || ''}
                    onChange={e => setEditingPillar({ ...editingPillar, leadSummaryEn: e.target.value })}
                    className="w-full p-2 bg-white border border-neutral-300 focus:outline-none focus:border-brand-800 resize-none font-serif"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingPillar.isActive ?? true}
                      onChange={e => setEditingPillar({ ...editingPillar, isActive: e.target.checked })}
                      className="accent-brand-800"
                    />
                    <span className="text-xs font-mono font-bold uppercase">Active & Displayed on Live Gateway</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPillarModalOpen(false)}
                      className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingPillar}
                      className="px-5 py-2 bg-brand-800 hover:bg-brand-900 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isSavingPillar ? 'Saving...' : 'Save Pillar'}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
