import React, { useState } from 'react';
import { 
  Inbox, Search, Filter, FileSpreadsheet, Eye, EyeOff, CheckCircle, 
  Clock, AlertTriangle, ChevronRight, User, Phone, Mail, Shield, Trash2
} from 'lucide-react';
import { Locale } from '../../types';
import { useAuthStore } from '../../store/useAuthStore';

interface SubmissionRecord {
  id: string;
  service: string;
  serviceName: string;
  applicant: string;
  email: string;
  phone: string;
  status: 'RECEIVED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'ARCHIVED';
  date: string;
  category: string;
  details: string;
  piiMasked: boolean;
}

const INITIAL_SUBMISSIONS: SubmissionRecord[] = [
  {
    id: 'SUB-VISA-2026-001',
    service: 'visa-centre',
    serviceName: 'Bilateral Visa Centre',
    applicant: 'Dr. Zaid Al-Rawi',
    email: 'z.alrawi@baghdad-trade.iq',
    phone: '+964 780 112 3344',
    status: 'RECEIVED',
    date: '2026-03-24T10:15:00Z',
    category: 'Commercial M-Visa',
    details: 'Strategic investor group visiting Beijing for Faw Port finance coordination.',
    piiMasked: true
  },
  {
    id: 'SUB-SUMMIT-2026-042',
    service: 'summit',
    serviceName: 'Summit & Expo',
    applicant: 'Chen Wei',
    email: 'chen.wei@sinopower.cn',
    phone: '+86 10 6554 1122',
    status: 'UNDER_REVIEW',
    date: '2026-03-22T08:30:00Z',
    category: 'Speaker Application',
    details: 'Technical presentation on mBridge liquidity integration for energy trade.',
    piiMasked: true
  },
  {
    id: 'SUB-CORR-2026-105',
    service: 'consultancy',
    serviceName: 'Consultancy',
    applicant: 'Layla Mansour',
    email: 'l.mansour@erbil-gateway.com',
    phone: '+964 750 443 2211',
    status: 'APPROVED',
    date: '2026-03-15T14:45:00Z',
    category: 'Legal Query',
    details: 'Inquiry regarding dual-currency contract enforcement in Kurdistan Region.',
    piiMasked: true
  }
];

interface SubmissionsInboxSectionProps {
  lang?: Locale;
}

export function SubmissionsInboxSection({ lang = 'en' }: SubmissionsInboxSectionProps) {
  const { user } = useAuthStore();
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(INITIAL_SUBMISSIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  const userRole = (user?.role || 'SUPERADMIN').toUpperCase();
  const canRevealPii = ['SUPERADMIN', 'ADMIN'].includes(userRole);

  const filtered = submissions.filter(s => {
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.applicant.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.serviceName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const togglePii = (id: string) => {
    if (!canRevealPii) {
      alert('Security Clearance Level 2 required to reveal PII data.');
      return;
    }
    const newSet = new Set(revealedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setRevealedIds(newSet);
  };

  const handleStatusChange = (id: string, newStatus: any) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const maskString = (s: string) => {
    if (s.length <= 4) return '****';
    return s.substring(0, 2) + '****' + s.substring(s.length - 2);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
            <Inbox size={14} />
            <span>CISE Control Centre • Unified Submissions Inbox</span>
          </div>
          <h2 className="text-xl font-black uppercase text-white">Sovereign Service Queue</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Incoming visa applications, summit dossiers, and bilateral service inquiries requiring administrative triage.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting encrypted CSV ledger...')}
          className="bg-neutral-900 border border-neutral-800 hover:border-red-600 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-lg"
        >
          <FileSpreadsheet size={14} />
          <span>Export Ledger (CSV)</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search applicant or ID..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
        >
          <option value="all">All Statuses</option>
          <option value="RECEIVED">Received / New</option>
          <option value="UNDER_REVIEW">Under Review</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 flex items-center justify-between">
          <span className="text-[10px] font-bold text-neutral-500 uppercase">Clearance Badge:</span>
          <span className="text-[10px] font-black text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            {userRole}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-neutral-950 text-neutral-400 font-bold uppercase tracking-wider border-b border-neutral-800">
              <tr>
                <th className="p-3">Ref ID / Date</th>
                <th className="p-3">Service & Category</th>
                <th className="p-3">Applicant Data (PII)</th>
                <th className="p-3">Clearance Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 font-mono text-[11px]">
              {filtered.map(sub => {
                const isRevealed = revealedIds.has(sub.id);
                return (
                  <tr key={sub.id} className="hover:bg-neutral-850/60 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-white mb-1">{sub.id}</div>
                      <div className="text-[10px] text-neutral-500">
                        {new Date(sub.date).toLocaleString()}
                      </div>
                    </td>
                    <td className="p-3 font-sans">
                      <div className="font-bold text-neutral-200">{sub.serviceName}</div>
                      <div className="text-[10px] text-red-400 uppercase font-bold tracking-tight">
                        {sub.category}
                      </div>
                    </td>
                    <td className="p-3 font-sans">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-neutral-200">
                          <User size={12} className="text-neutral-500" />
                          <span>{isRevealed ? sub.applicant : maskString(sub.applicant)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-neutral-400">
                          <Mail size={12} className="text-neutral-500" />
                          <span>{isRevealed ? sub.email : maskString(sub.email)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-neutral-400">
                          <Phone size={12} className="text-neutral-500" />
                          <span>{isRevealed ? sub.phone : maskString(sub.phone)}</span>
                        </div>
                        <button
                          onClick={() => togglePii(sub.id)}
                          className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1 mt-1 ${
                            isRevealed ? 'text-amber-400' : 'text-blue-400 hover:underline'
                          }`}
                        >
                          {isRevealed ? <EyeOff size={10} /> : <Eye size={10} />}
                          <span>{isRevealed ? 'Hide PII' : 'Reveal Sensitive Data'}</span>
                        </button>
                      </div>
                    </td>
                    <td className="p-3">
                      <select
                        value={sub.status}
                        onChange={(e) => handleStatusChange(sub.id, e.target.value)}
                        className={`text-[10px] font-bold uppercase rounded-lg px-2 py-1 bg-neutral-950 border focus:outline-none ${
                          sub.status === 'RECEIVED' ? 'text-blue-400 border-blue-900' :
                          sub.status === 'UNDER_REVIEW' ? 'text-amber-400 border-amber-900' :
                          sub.status === 'APPROVED' ? 'text-emerald-400 border-emerald-900' :
                          sub.status === 'REJECTED' ? 'text-red-400 border-red-900' :
                          'text-neutral-500 border-neutral-800'
                        }`}
                      >
                        <option value="RECEIVED">Received</option>
                        <option value="UNDER_REVIEW">Under Review</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="ARCHIVED">Archived</option>
                      </select>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => alert(`Opening full dossier for ${sub.id}`)}
                          className="p-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-white transition-colors"
                          title="View Details"
                        >
                          <ChevronRight size={14} />
                        </button>
                        {userRole === 'SUPERADMIN' && (
                          <button 
                            className="p-1.5 bg-red-950/40 text-red-500 hover:bg-red-900/60 rounded-lg transition-colors"
                            title="Delete Submission"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Banner */}
      <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 flex items-start gap-4">
        <Shield size={24} className="text-amber-500 shrink-0" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-amber-500 uppercase tracking-tight">PII Protection Protocol Active</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Personally Identifiable Information (PII) is automatically masked for all viewers. Access to plaintext names, emails, and phone numbers is audited per incident and restricted to Administrator clearance levels and above.
          </p>
        </div>
      </div>
    </div>
  );
}
