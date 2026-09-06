import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { VisaFlightRecord, VisaFlightInquiry, VisaFlightStats } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { 
  Plane, Plus, Edit, Trash2, Search, Filter, RefreshCw, 
  CheckCircle2, X, Star, TrendingUp, ExternalLink, Globe2, Sparkles, AlertCircle, 
  Clock, ShieldCheck, Ticket, Building2, Copy, Eye, FileText, ArrowRightLeft, 
  Users, Download, Check, Phone, Mail, User, Compass, ChevronRight, BarChart3,
  Calendar, Award, MessageSquare, AlertTriangle, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type AdminTab = 'SERVICES' | 'INQUIRIES' | 'ANALYTICS';
type ViewMode = 'TABLE' | 'GRID';

export function AdminVisaFlight() {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  // Active Main Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('SERVICES');
  const [viewMode, setViewMode] = useState<ViewMode>('TABLE');

  // Service Filters
  const [serviceSearch, setServiceSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedOrigin, setSelectedOrigin] = useState('ALL');
  const [selectedDestination, setSelectedDestination] = useState('ALL');

  // Inquiry Filters
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatus, setInquiryStatus] = useState('ALL');
  const [inquiryPriority, setInquiryPriority] = useState('ALL');
  const [inquiryServiceType, setInquiryServiceType] = useState('ALL');

  // Modals & Drawers
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<VisaFlightRecord | null>(null);
  const [previewService, setPreviewService] = useState<VisaFlightRecord | null>(null);
  const [activeLangTab, setActiveLangTab] = useState<'EN' | 'AR' | 'ZH' | 'CKB'>('EN');

  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedInquiryDetail, setSelectedInquiryDetail] = useState<VisaFlightInquiry | null>(null);
  const [editingInquiry, setEditingInquiry] = useState<VisaFlightInquiry | null>(null);

  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Form State for Service
  const [serviceFormData, setServiceFormData] = useState({
    titleEn: '',
    titleAr: '',
    titleZh: '',
    titleCkb: '',
    serviceType: 'VISA_ASSISTANCE',
    originRegion: 'CHINA',
    destinationRegion: 'KURDISTAN',
    summaryEn: '',
    summaryAr: '',
    summaryZh: '',
    summaryCkb: '',
    detailsEn: '',
    detailsAr: '',
    detailsZh: '',
    detailsCkb: '',
    airlineOrAuthority: 'Consular & Civil Aviation Authority',
    processingTime: '24 - 48 Hours',
    feeOrCost: 'Consular Standard Tariff',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000',
    officialLink: '',
    isFeatured: true,
    isTrending: true
  });

  // Form State for Inquiry (Manual Entry or Edit)
  const [inquiryFormData, setInquiryFormData] = useState({
    ticketId: '',
    fullName: '',
    email: '',
    passportNumber: '',
    nationality: 'Iraqi / Chinese',
    origin: 'China',
    destination: 'Kurdistan Region',
    travelDate: '',
    serviceType: 'VISA_ASSISTANCE',
    notes: '',
    status: 'PENDING' as VisaFlightInquiry['status'],
    priority: 'STANDARD' as VisaFlightInquiry['priority'],
    contactPhone: '',
    assignedOfficer: 'Consular Desk',
    adminNotes: ''
  });

  // ================= QUERIES =================
  const { data: stats, refetch: refetchStats } = useQuery<VisaFlightStats>({
    queryKey: ['admin-visa-flights-stats'],
    queryFn: async () => {
      const res = await fetch('/api/visa-flights/stats');
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    }
  });

  const { data: records = [], isLoading: isLoadingRecords, refetch: refetchRecords } = useQuery<VisaFlightRecord[]>({
    queryKey: ['admin-visa-flights'],
    queryFn: async () => {
      const res = await fetch('/api/visa-flights');
      if (!res.ok) throw new Error('Failed to fetch visa & flight records');
      return res.json();
    }
  });

  const { data: inquiries = [], isLoading: isLoadingInquiries, refetch: refetchInquiries } = useQuery<VisaFlightInquiry[]>({
    queryKey: ['admin-visa-flight-inquiries'],
    queryFn: async () => {
      const res = await fetch('/api/visa-flights/inquiries', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch concierge inquiries');
      return res.json();
    }
  });

  // ================= MUTATIONS =================
  // Save Service (Create / Update)
  const saveServiceMutation = useMutation({
    mutationFn: async (data: typeof serviceFormData) => {
      const url = editingService ? `/api/visa-flights/${editingService.id}` : '/api/visa-flights';
      const method = editingService ? 'PUT' : 'POST';

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
        throw new Error(err.error || 'Failed to save visa & flight record');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-visa-flights'] });
      queryClient.invalidateQueries({ queryKey: ['admin-visa-flights-stats'] });
      setIsServiceModalOpen(false);
      resetServiceForm();
      showStatus('success', editingService ? 'Service updated successfully!' : 'New Visa/Flight service cataloged!');
    },
    onError: (err: any) => {
      showStatus('error', err.message || 'Operation failed');
    }
  });

  // Delete Service
  const deleteServiceMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/visa-flights/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete record');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-visa-flights'] });
      queryClient.invalidateQueries({ queryKey: ['admin-visa-flights-stats'] });
      showStatus('success', 'Visa & Flight record removed successfully');
    },
    onError: (err: any) => {
      showStatus('error', err.message || 'Failed to delete');
    }
  });

  // Clone / Mirror Service
  const cloneServiceMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/visa-flights/clone/${id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to clone record');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-visa-flights'] });
      queryClient.invalidateQueries({ queryKey: ['admin-visa-flights-stats'] });
      showStatus('success', 'Route cloned & mirrored successfully! You can now adjust specifics.');
    },
    onError: (err: any) => {
      showStatus('error', err.message || 'Clone failed');
    }
  });

  // Reseed Database
  const reseedMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/visa-flights/seed', { 
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Reseed failed');
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-visa-flights'] });
      queryClient.invalidateQueries({ queryKey: ['admin-visa-flights-stats'] });
      showStatus('success', data.message || 'Reseeded database successfully!');
    }
  });

  // Reseed Inquiries
  const reseedInquiriesMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/visa-flights/inquiries/seed', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Reseed inquiries failed');
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-visa-flight-inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['admin-visa-flights-stats'] });
      showStatus('success', data.message || 'Inquiries registry synchronized!');
    }
  });

  // Update Inquiry Status / Details
  const updateInquiryMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<VisaFlightInquiry> }) => {
      const res = await fetch(`/api/visa-flights/inquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to update inquiry');
      return res.json();
    },
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['admin-visa-flight-inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['admin-visa-flights-stats'] });
      if (selectedInquiryDetail && selectedInquiryDetail.id === updated.id) {
        setSelectedInquiryDetail(updated);
      }
      setIsInquiryModalOpen(false);
      showStatus('success', 'Inquiry dossier updated successfully');
    },
    onError: (err: any) => {
      showStatus('error', err.message || 'Failed to update inquiry');
    }
  });

  // Delete Inquiry
  const deleteInquiryMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/visa-flights/inquiries/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete inquiry');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-visa-flight-inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['admin-visa-flights-stats'] });
      if (selectedInquiryDetail) setSelectedInquiryDetail(null);
      showStatus('success', 'Inquiry removed from registry');
    }
  });

  // Helper for status toast
  const showStatus = (type: 'success' | 'error' | 'info', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Reset Service Form
  const resetServiceForm = () => {
    setEditingService(null);
    setActiveLangTab('EN');
    setServiceFormData({
      titleEn: '',
      titleAr: '',
      titleZh: '',
      titleCkb: '',
      serviceType: 'VISA_ASSISTANCE',
      originRegion: 'CHINA',
      destinationRegion: 'KURDISTAN',
      summaryEn: '',
      summaryAr: '',
      summaryZh: '',
      summaryCkb: '',
      detailsEn: '',
      detailsAr: '',
      detailsZh: '',
      detailsCkb: '',
      airlineOrAuthority: 'Consular & Civil Aviation Authority',
      processingTime: '24 - 48 Hours',
      feeOrCost: 'Consular Standard Tariff',
      imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000',
      officialLink: '',
      isFeatured: true,
      isTrending: true
    });
  };

  const openCreateServiceModal = () => {
    resetServiceForm();
    setIsServiceModalOpen(true);
  };

  const openEditServiceModal = (item: VisaFlightRecord) => {
    setEditingService(item);
    setActiveLangTab('EN');
    setServiceFormData({
      titleEn: item.titleEn || '',
      titleAr: item.titleAr || '',
      titleZh: item.titleZh || '',
      titleCkb: item.titleCkb || '',
      serviceType: item.serviceType || 'VISA_ASSISTANCE',
      originRegion: item.originRegion || 'CHINA',
      destinationRegion: item.destinationRegion || 'KURDISTAN',
      summaryEn: item.summaryEn || '',
      summaryAr: item.summaryAr || '',
      summaryZh: item.summaryZh || '',
      summaryCkb: item.summaryCkb || '',
      detailsEn: item.detailsEn || '',
      detailsAr: item.detailsAr || '',
      detailsZh: item.detailsZh || '',
      detailsCkb: item.detailsCkb || '',
      airlineOrAuthority: item.airlineOrAuthority || '',
      processingTime: item.processingTime || '',
      feeOrCost: item.feeOrCost || '',
      imageUrl: item.imageUrl || '',
      officialLink: item.officialLink || '',
      isFeatured: item.isFeatured ?? true,
      isTrending: item.isTrending ?? true
    });
    setIsServiceModalOpen(true);
  };

  const openEditInquiryModal = (inq: VisaFlightInquiry) => {
    setEditingInquiry(inq);
    setInquiryFormData({
      ticketId: inq.ticketId,
      fullName: inq.fullName,
      email: inq.email,
      passportNumber: inq.passportNumber,
      nationality: inq.nationality || 'Iraqi / Chinese',
      origin: inq.origin,
      destination: inq.destination,
      travelDate: inq.travelDate || '',
      serviceType: inq.serviceType,
      notes: inq.notes || '',
      status: inq.status,
      priority: inq.priority,
      contactPhone: inq.contactPhone || '',
      assignedOfficer: inq.assignedOfficer || 'Consular Desk',
      adminNotes: inq.adminNotes || ''
    });
    setIsInquiryModalOpen(true);
  };

  // Filtered Services
  const filteredRecords = records.filter(r => {
    const query = serviceSearch.toLowerCase();
    const matchesSearch = 
      r.titleEn.toLowerCase().includes(query) ||
      (r.titleAr && r.titleAr.includes(query)) ||
      (r.titleZh && r.titleZh.includes(query)) ||
      (r.titleCkb && r.titleCkb.includes(query)) ||
      r.airlineOrAuthority.toLowerCase().includes(query) ||
      (r.summaryEn && r.summaryEn.toLowerCase().includes(query));

    const matchesCategory = selectedCategory === 'ALL' || r.serviceType === selectedCategory;
    const matchesOrigin = selectedOrigin === 'ALL' || r.originRegion === selectedOrigin;
    const matchesDestination = selectedDestination === 'ALL' || r.destinationRegion === selectedDestination;

    return matchesSearch && matchesCategory && matchesOrigin && matchesDestination;
  });

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter(inq => {
    const query = inquirySearch.toLowerCase();
    const matchesSearch = 
      inq.ticketId.toLowerCase().includes(query) ||
      inq.fullName.toLowerCase().includes(query) ||
      inq.email.toLowerCase().includes(query) ||
      inq.passportNumber.toLowerCase().includes(query) ||
      inq.origin.toLowerCase().includes(query) ||
      inq.destination.toLowerCase().includes(query) ||
      (inq.notes && inq.notes.toLowerCase().includes(query)) ||
      (inq.adminNotes && inq.adminNotes.toLowerCase().includes(query));

    const matchesStatus = inquiryStatus === 'ALL' || inq.status === inquiryStatus;
    const matchesPriority = inquiryPriority === 'ALL' || inq.priority === inquiryPriority;
    const matchesService = inquiryServiceType === 'ALL' || inq.serviceType === inquiryServiceType;

    return matchesSearch && matchesStatus && matchesPriority && matchesService;
  });

  // Export CSV
  const exportServicesCSV = () => {
    const headers = ['ID', 'Title (EN)', 'Category', 'Origin', 'Destination', 'Authority/Airline', 'Processing Time', 'Fee/Cost', 'Featured', 'Trending'];
    const rows = filteredRecords.map(r => [
      r.id,
      `"${r.titleEn.replace(/"/g, '""')}"`,
      r.serviceType,
      r.originRegion,
      r.destinationRegion,
      `"${r.airlineOrAuthority.replace(/"/g, '""')}"`,
      `"${r.processingTime.replace(/"/g, '""')}"`,
      `"${r.feeOrCost.replace(/"/g, '""')}"`,
      r.isFeatured ? 'YES' : 'NO',
      r.isTrending ? 'YES' : 'NO'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `visa_flight_directory_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showStatus('info', 'Exported services directory to CSV');
  };

  const exportInquiriesCSV = () => {
    const headers = ['Ticket ID', 'Full Name', 'Email', 'Passport Number', 'Nationality', 'Origin', 'Destination', 'Service Type', 'Travel Date', 'Status', 'Priority', 'Assigned Officer'];
    const rows = filteredInquiries.map(inq => [
      inq.ticketId,
      `"${inq.fullName.replace(/"/g, '""')}"`,
      inq.email,
      inq.passportNumber,
      `"${(inq.nationality || '').replace(/"/g, '""')}"`,
      `"${inq.origin.replace(/"/g, '""')}"`,
      `"${inq.destination.replace(/"/g, '""')}"`,
      inq.serviceType,
      inq.travelDate || '',
      inq.status,
      inq.priority,
      `"${(inq.assignedOfficer || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `consular_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showStatus('info', 'Exported consular inquiries to CSV');
  };

  return (
    <div className="w-full space-y-8 text-ink-900">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-gray-200 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-bold tracking-widest text-amber-400 uppercase mb-2">
              <span className="inline-flex items-center justify-center p-1 rounded-md bg-amber-400/10 text-amber-400 border border-amber-400/20">
                <Plane className="w-3.5 h-3.5" />
              </span>
              <span>Enterprise Diplomatic & Aviation Command</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] text-emerald-400 font-mono">LIVE SYNCHRONIZED</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Visa & Flight Administration
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm max-w-3xl mt-1.5 leading-relaxed">
              Standardize, refine, and orchestrate bilateral air passenger routes, cargo corridors, diplomatic fast-tracks, and consular visa inquiries bridging China, Federal Iraq, and the Kurdistan Region.
            </p>
          </div>

          {/* Quick Global Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                refetchStats();
                refetchRecords();
                refetchInquiries();
                showStatus('info', 'Refreshed all synchronized state from database');
              }}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold border border-gray-200 transition-all flex items-center gap-2 shadow-sm"
              title="Refresh Data"
            >
              <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
              <span className="hidden sm:inline">Sync Live</span>
            </button>

            <button
              onClick={() => reseedMutation.mutate()}
              disabled={reseedMutation.isPending}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold border border-gray-200 transition-all flex items-center gap-2 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${reseedMutation.isPending ? 'animate-spin' : ''}`} />
              <span>Reseed Directory</span>
            </button>

            <button
              onClick={() => reseedInquiriesMutation.mutate()}
              disabled={reseedInquiriesMutation.isPending}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold border border-gray-200 transition-all flex items-center gap-2 shadow-sm"
            >
              <Ticket className="w-3.5 h-3.5 text-brand-600" />
              <span>Seed Sample Dossiers</span>
            </button>

            <button
              onClick={openCreateServiceModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 scale-100 hover:scale-[1.02] active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Catalog New Service</span>
            </button>
          </div>
        </div>

        {/* Global Key Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-gray-200">
          <div className="bg-gray-50/60 backdrop-blur rounded-xl p-3 border border-gray-200">
            <div className="text-[11px] font-semibold text-gray-500 flex items-center justify-between">
              <span>Total Services</span>
              <Plane className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl font-black text-gray-900 mt-1">{stats?.totalRecords ?? records.length}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">{stats?.totalFeatured ?? 0} Featured & Promoted</div>
          </div>

          <div className="bg-gray-50/60 backdrop-blur rounded-xl p-3 border border-gray-200">
            <div className="text-[11px] font-semibold text-gray-500 flex items-center justify-between">
              <span>Flight Corridors</span>
              <Compass className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="text-xl font-black text-sky-300 mt-1">{stats?.totalRoutes ?? 0}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Aviation & Cargo lines</div>
          </div>

          <div className="bg-gray-50/60 backdrop-blur rounded-xl p-3 border border-gray-200">
            <div className="text-[11px] font-semibold text-gray-500 flex items-center justify-between">
              <span>Visa Facilitations</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl font-black text-emerald-300 mt-1">{stats?.totalVisas ?? 0}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">E-Visas & On Arrival</div>
          </div>

          <div className="bg-gray-50/60 backdrop-blur rounded-xl p-3 border border-gray-200">
            <div className="text-[11px] font-semibold text-gray-500 flex items-center justify-between">
              <span>Diplomatic Channels</span>
              <Award className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-xl font-black text-purple-300 mt-1">{stats?.totalDiplomatic ?? 0}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Chambers & Consulates</div>
          </div>

          <div className="bg-gray-50/60 backdrop-blur rounded-xl p-3 border border-gray-200">
            <div className="text-[11px] font-semibold text-gray-500 flex items-center justify-between">
              <span>Concierge Dossiers</span>
              <Ticket className="w-3.5 h-3.5 text-brand-600" />
            </div>
            <div className="text-xl font-black text-brand-500 mt-1">{stats?.totalInquiries ?? inquiries.length}</div>
            <div className="text-[10px] text-amber-400 font-semibold mt-0.5">{stats?.pendingInquiries ?? 0} Pending Attention</div>
          </div>

          <div className="bg-gray-50/60 backdrop-blur rounded-xl p-3 border border-gray-200">
            <div className="text-[11px] font-semibold text-gray-500 flex items-center justify-between">
              <span>Approved Tickets</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl font-black text-emerald-400 mt-1">{stats?.approvedInquiries ?? 0}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Dispatched clearances</div>
          </div>
        </div>
      </div>

      {/* Real-time Status Alert Toast */}
      {statusMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-sm font-semibold shadow-lg ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200' 
              : statusMessage.type === 'error'
              ? 'bg-brand-950/90 border-brand-500/50 text-brand-200'
              : 'bg-indigo-950/90 border-indigo-500/50 text-indigo-200'
          }`}
        >
          <div className="flex items-center gap-3">
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : statusMessage.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-brand-400 shrink-0" />
            ) : (
              <Sparkles className="w-5 h-5 text-brand-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-gray-500 hover:text-gray-900">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Main Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-gray-200">
          <button
            onClick={() => setActiveTab('SERVICES')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'SERVICES'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Plane className="w-4 h-4" />
            <span>Flight & Visa Services Directory ({records.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('INQUIRIES')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 relative ${
              activeTab === 'INQUIRIES'
                ? 'bg-brand-600 text-white shadow-md font-black'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>Concierge Inquiries & Dossiers</span>
            {stats?.pendingInquiries && stats.pendingInquiries > 0 ? (
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950">
                {stats.pendingInquiries}
              </span>
            ) : (
              <span className="text-[10px] text-gray-500">({inquiries.length})</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('ANALYTICS')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'ANALYTICS'
                ? 'bg-emerald-600 text-white shadow-md font-black'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Aviation Analytics</span>
          </button>
        </div>

        {/* View mode toggle or export */}
        <div className="flex items-center gap-2">
          {activeTab === 'SERVICES' && (
            <>
              <button
                onClick={exportServicesCSV}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-gray-100 border border-gray-200 text-xs text-gray-600 font-semibold flex items-center gap-1.5 transition-all"
                title="Export Services CSV"
              >
                <Download className="w-3.5 h-3.5 text-gray-500" />
                <span>Export CSV</span>
              </button>

              <div className="flex bg-white border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('TABLE')}
                  className={`px-2.5 py-1 rounded text-xs font-bold ${viewMode === 'TABLE' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode('GRID')}
                  className={`px-2.5 py-1 rounded text-xs font-bold ${viewMode === 'GRID' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Cards
                </button>
              </div>
            </>
          )}

          {activeTab === 'INQUIRIES' && (
            <button
              onClick={exportInquiriesCSV}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-gray-100 border border-gray-200 text-xs text-gray-600 font-semibold flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export Inquiries CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: SERVICES & FLIGHT DIRECTORY                       */}
      {/* ======================================================== */}
      {activeTab === 'SERVICES' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-gray-200">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search routes, authority, titles..."
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="ALL">All Service Categories</option>
                <option value="VISA_ASSISTANCE">Visa & E-Visa Facilitation</option>
                <option value="FLIGHT_ROUTE">Passenger Flight Corridors</option>
                <option value="CARGO_LOGISTICS">Cargo & Freight Logistics</option>
                <option value="PASSPORT_DIPLOMATIC">Diplomatic & Chamber Green Channel</option>
                <option value="CONSULAR_GUIDE">Airport Concierge & Consular Desk</option>
                <option value="TRAVEL_PUBLICATION">Logistics & Compliance Publications</option>
              </select>
            </div>

            <div>
              <select
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="ALL">All Origins</option>
                <option value="CHINA">Origin: China</option>
                <option value="IRAQ">Origin: Federal Iraq</option>
                <option value="KURDISTAN">Origin: Kurdistan Region</option>
                <option value="BILATERAL">Origin: Bilateral / Joint</option>
              </select>
            </div>

            <div>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="ALL">All Destinations</option>
                <option value="KURDISTAN">Destination: Kurdistan Region</option>
                <option value="IRAQ">Destination: Federal Iraq</option>
                <option value="CHINA">Destination: China</option>
                <option value="BILATERAL">Destination: Bilateral / Joint</option>
              </select>
            </div>
          </div>

          {/* Results Summary & Reset */}
          <div className="flex items-center justify-between text-xs text-gray-500 px-1">
            <span>Showing <strong className="text-gray-900">{filteredRecords.length}</strong> of {records.length} cataloged services</span>
            {(serviceSearch || selectedCategory !== 'ALL' || selectedOrigin !== 'ALL' || selectedDestination !== 'ALL') && (
              <button 
                onClick={() => {
                  setServiceSearch('');
                  setSelectedCategory('ALL');
                  setSelectedOrigin('ALL');
                  setSelectedDestination('ALL');
                }}
                className="text-amber-400 hover:text-amber-300 font-semibold"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Table View */}
          {viewMode === 'TABLE' ? (
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xl">
              {isLoadingRecords ? (
                <div className="p-16 text-center text-gray-500 flex flex-col items-center gap-3">
                  <RefreshCw className="w-8 h-8 animate-spin text-amber-500" />
                  <span className="text-sm font-semibold">Synchronizing Visa & Flight Directory...</span>
                </div>
              ) : filteredRecords.length === 0 ? (
                <div className="p-16 text-center text-gray-500 space-y-3">
                  <Plane className="w-10 h-10 mx-auto text-slate-600" />
                  <div className="text-base font-bold text-gray-600">No Services Found</div>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">No records match the current filter criteria. Adjust your filters or add a new service.</p>
                  <button onClick={openCreateServiceModal} className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs">
                    Create New Service
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-600">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-mono tracking-wider text-[11px] border-b border-gray-200">
                      <tr>
                        <th className="p-4">Service & Multilingual Titles</th>
                        <th className="p-4">Corridor (Origin → Dest)</th>
                        <th className="p-4">Authority / Operator</th>
                        <th className="p-4">SLA & Tariff</th>
                        <th className="p-4 text-center">Status Badges</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredRecords.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                          {/* Title & Image */}
                          <td className="p-4 max-w-sm">
                            <div className="flex items-start gap-3">
                              <img 
                                src={item.imageUrl} 
                                alt="" 
                                className="w-12 h-12 rounded-xl object-cover bg-gray-50 border border-gray-200 shrink-0 mt-0.5" 
                              />
                              <div className="space-y-1">
                                <div className="font-bold text-gray-900 text-sm leading-snug line-clamp-2">{item.titleEn}</div>
                                <div className="text-[11px] text-amber-400/90 font-semibold tracking-wide flex items-center gap-1.5">
                                  <span className="px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 text-[10px]">
                                    {item.serviceType.replace('_', ' ')}
                                  </span>
                                  {item.titleZh && <span className="text-gray-500 text-[10px] line-clamp-1">{item.titleZh}</span>}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Corridor */}
                          <td className="p-4 whitespace-nowrap">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200 text-xs font-mono font-bold text-gray-700">
                              <span>{item.originRegion}</span>
                              <ArrowRight className="w-3 h-3 text-amber-400" />
                              <span>{item.destinationRegion}</span>
                            </div>
                          </td>

                          {/* Authority */}
                          <td className="p-4 text-gray-600">
                            <div className="font-semibold text-gray-700">{item.airlineOrAuthority}</div>
                            {item.officialLink && (
                              <a 
                                href={item.officialLink} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-[10px] text-brand-600 hover:text-brand-500 flex items-center gap-1 mt-0.5"
                              >
                                <span>Official Link</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </td>

                          {/* Time & Fee */}
                          <td className="p-4 whitespace-nowrap">
                            <div className="text-brand-500 font-semibold flex items-center gap-1">
                              <Clock className="w-3 h-3 text-brand-600" />
                              <span>{item.processingTime}</span>
                            </div>
                            <div className="text-emerald-400 font-mono text-[11px] mt-0.5">{item.feeOrCost}</div>
                          </td>

                          {/* Status Badges */}
                          <td className="p-4 text-center">
                            <div className="flex flex-col items-center gap-1">
                              {item.isFeatured && (
                                <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-bold">
                                  <Star className="w-2.5 h-2.5 fill-current" />
                                  <span>Featured</span>
                                </span>
                              )}
                              {item.isTrending && (
                                <span className="inline-flex items-center gap-1 bg-indigo-500/20 text-brand-500 border border-indigo-500/30 px-2 py-0.5 rounded text-[10px] font-bold">
                                  <TrendingUp className="w-2.5 h-2.5" />
                                  <span>Trending</span>
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="p-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Preview */}
                              <button
                                onClick={() => setPreviewService(item)}
                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                                title="Preview Service Card"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              {/* Clone Route */}
                              <button
                                onClick={() => {
                                  if (confirm(`Clone & mirror route "${item.titleEn}"?`)) {
                                    cloneServiceMutation.mutate(item.id);
                                  }
                                }}
                                disabled={cloneServiceMutation.isPending}
                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-100 text-sky-400 hover:text-sky-300 transition-colors"
                                title="Clone / Mirror Route"
                              >
                                <Copy className="w-4 h-4" />
                              </button>

                              {/* Edit */}
                              <button
                                onClick={() => openEditServiceModal(item)}
                                className="p-2 rounded-lg bg-gray-100 hover:bg-amber-950/80 text-amber-400 hover:text-amber-300 border border-transparent hover:border-amber-500/30 transition-colors"
                                title="Edit Service"
                              >
                                <Edit className="w-4 h-4" />
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to permanently delete "${item.titleEn}"?`)) {
                                    deleteServiceMutation.mutate(item.id);
                                  }
                                }}
                                className="p-2 rounded-lg bg-gray-100 hover:bg-brand-950/80 text-brand-400 hover:text-brand-300 border border-transparent hover:border-brand-500/30 transition-colors"
                                title="Delete Service"
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
              )}
            </div>
          ) : (
            /* Grid Card View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecords.map((item) => (
                <div 
                  key={item.id} 
                  className="group bg-white border border-gray-200 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-amber-500/5 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden bg-gray-50">
                      <img 
                        src={item.imageUrl} 
                        alt="" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-gray-50/80 backdrop-blur text-amber-400 border border-amber-400/30">
                          {item.serviceType.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 flex gap-1">
                        {item.isFeatured && (
                          <span className="p-1.5 rounded-md bg-amber-500 text-slate-950 shadow">
                            <Star className="w-3.5 h-3.5 fill-current" />
                          </span>
                        )}
                        {item.isTrending && (
                          <span className="p-1.5 rounded-md bg-brand-600 text-white shadow">
                            <TrendingUp className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono font-bold text-gray-700">
                        <span className="px-2 py-0.5 rounded bg-gray-50/80 backdrop-blur border border-gray-200">
                          {item.originRegion} → {item.destinationRegion}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 backdrop-blur border border-emerald-500/30 text-[11px]">
                          {item.feeOrCost}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-amber-400 transition-colors line-clamp-2">
                        {item.titleEn}
                      </h3>
                      {item.titleAr && (
                        <p className="text-xs text-gray-500 line-clamp-1 text-right font-arabic" dir="rtl">
                          {item.titleAr}
                        </p>
                      )}
                      <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                        {item.summaryEn}
                      </p>

                      <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                        <span className="font-semibold text-gray-600">{item.airlineOrAuthority}</span>
                        <span className="text-brand-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.processingTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-end gap-2">
                    <button
                      onClick={() => setPreviewService(item)}
                      className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-100 text-gray-700 text-xs font-bold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => openEditServiceModal(item)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-slate-950 text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${item.titleEn}"?`)) {
                          deleteServiceMutation.mutate(item.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-gray-100 hover:bg-brand-950 text-brand-400 hover:text-brand-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: CONCIERGE INQUIRIES & DIPLOMATIC DOSSIERS        */}
      {/* ======================================================== */}
      {activeTab === 'INQUIRIES' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-gray-200">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search ticket ID, traveler name, email, passport..."
                value={inquirySearch}
                onChange={(e) => setInquirySearch(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <select
                value={inquiryStatus}
                onChange={(e) => setInquiryStatus(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="ALL">All Dossier Statuses</option>
                <option value="PENDING">PENDING (Action Required)</option>
                <option value="UNDER_REVIEW">UNDER REVIEW (Consular Check)</option>
                <option value="APPROVED">APPROVED (Clearance Granted)</option>
                <option value="CONTACTED">CONTACTED (Applicant Notified)</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>

            <div>
              <select
                value={inquiryPriority}
                onChange={(e) => setInquiryPriority(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="ALL">All Priorities</option>
                <option value="DIPLOMATIC">DIPLOMATIC (VIP Fast-Track)</option>
                <option value="EXPEDITED">EXPEDITED (Commercial Priority)</option>
                <option value="STANDARD">STANDARD (Regular Queue)</option>
              </select>
            </div>

            <div>
              <select
                value={inquiryServiceType}
                onChange={(e) => setInquiryServiceType(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="ALL">All Requested Services</option>
                <option value="VISA_ASSISTANCE">Visa & E-Visa Assistance</option>
                <option value="FLIGHT_ROUTE">Flight Routes & Seat Charter</option>
                <option value="PASSPORT_DIPLOMATIC">Diplomatic & Chamber Channel</option>
                <option value="CONSULAR_GUIDE">Consular Desk & Airport Concierge</option>
                <option value="CARGO_LOGISTICS">Cargo & Freight Declaration</option>
                <option value="TRAVEL_PUBLICATION">Logistics Documentation</option>
              </select>
            </div>
          </div>

          {/* Inquiries Table */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xl">
            {isLoadingInquiries ? (
              <div className="p-16 text-center text-gray-500 flex flex-col items-center gap-3">
                <RefreshCw className="w-8 h-8 animate-spin text-indigo-500" />
                <span className="text-sm font-semibold">Synchronizing Concierge Dossiers...</span>
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="p-16 text-center text-gray-500 space-y-3">
                <Ticket className="w-10 h-10 mx-auto text-slate-600" />
                <div className="text-base font-bold text-gray-600">No Concierge Inquiries Matching Filters</div>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">Either no applications have been filed matching your query or database needs seeding.</p>
                <button 
                  onClick={() => reseedInquiriesMutation.mutate()} 
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs"
                >
                  Seed Sample Inquiries
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="bg-gray-50 text-gray-500 uppercase font-mono tracking-wider text-[11px] border-b border-gray-200">
                    <tr>
                      <th className="p-4">Ticket & Priority</th>
                      <th className="p-4">Applicant & Passport</th>
                      <th className="p-4">Route & Service</th>
                      <th className="p-4">Travel Date</th>
                      <th className="p-4 text-center">Status Transition</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-gray-50 transition-colors">
                        {/* Ticket & Priority */}
                        <td className="p-4 whitespace-nowrap">
                          <div className="font-mono font-black text-gray-900 text-sm">{inq.ticketId}</div>
                          <div className="mt-1">
                            {inq.priority === 'DIPLOMATIC' ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                👑 DIPLOMATIC
                              </span>
                            ) : inq.priority === 'EXPEDITED' ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                ⚡ EXPEDITED
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-500 border border-gray-200">
                                STANDARD
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Applicant */}
                        <td className="p-4">
                          <div className="font-bold text-gray-900 text-sm">{inq.fullName}</div>
                          <div className="text-gray-500 text-[11px] flex items-center gap-1.5 mt-0.5">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span>{inq.email}</span>
                          </div>
                          <div className="text-gray-500 text-[11px] font-mono mt-0.5">
                            Passport: <strong className="text-gray-700">{inq.passportNumber}</strong> ({inq.nationality || 'Iraqi/Chinese'})
                          </div>
                        </td>

                        {/* Route & Service */}
                        <td className="p-4">
                          <div className="font-semibold text-amber-400 text-[11px]">
                            {inq.serviceType.replace('_', ' ')}
                          </div>
                          <div className="text-gray-700 font-mono text-[11px] mt-0.5 flex items-center gap-1">
                            <span>{inq.origin}</span>
                            <ArrowRight className="w-3 h-3 text-gray-400" />
                            <span>{inq.destination}</span>
                          </div>
                          {inq.notes && (
                            <p className="text-gray-500 text-[10px] line-clamp-1 italic mt-1 max-w-xs">
                              "{inq.notes}"
                            </p>
                          )}
                        </td>

                        {/* Travel Date */}
                        <td className="p-4 whitespace-nowrap">
                          <div className="text-gray-600 font-mono flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            <span>{inq.travelDate || 'Flexible / Unspecified'}</span>
                          </div>
                          <div className="text-[10px] text-gray-400 mt-0.5">
                            Desk: {inq.assignedOfficer || 'General Desk'}
                          </div>
                        </td>

                        {/* Status Transition dropdown */}
                        <td className="p-4 text-center whitespace-nowrap">
                          <select
                            value={inq.status}
                            onChange={(e) => {
                              updateInquiryMutation.mutate({
                                id: inq.id,
                                data: { status: e.target.value as VisaFlightInquiry['status'] }
                              });
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-black border uppercase tracking-wider focus:outline-none ${
                              inq.status === 'APPROVED'
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                                : inq.status === 'UNDER_REVIEW'
                                ? 'bg-amber-950 text-amber-300 border-amber-500/50'
                                : inq.status === 'CONTACTED'
                                ? 'bg-sky-950 text-sky-300 border-sky-500/50'
                                : inq.status === 'PENDING'
                                ? 'bg-brand-950 text-brand-300 border-brand-500/50 animate-pulse'
                                : 'bg-gray-100 text-gray-500 border-gray-200'
                            }`}
                          >
                            <option value="PENDING">🔴 PENDING</option>
                            <option value="UNDER_REVIEW">🟡 UNDER REVIEW</option>
                            <option value="APPROVED">🟢 APPROVED</option>
                            <option value="CONTACTED">🔵 CONTACTED</option>
                            <option value="ARCHIVED">⚪ ARCHIVED</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedInquiryDetail(inq)}
                              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-100 text-brand-600 hover:text-gray-900 transition-colors"
                              title="Inspect Full Dossier"
                            >
                              <FileText className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => openEditInquiryModal(inq)}
                              className="p-2 rounded-lg bg-gray-100 hover:bg-amber-950 text-amber-400 hover:text-amber-300 transition-colors"
                              title="Edit Dossier & Notes"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Remove inquiry ticket ${inq.ticketId} from registry?`)) {
                                  deleteInquiryMutation.mutate(inq.id);
                                }
                              }}
                              className="p-2 rounded-lg bg-gray-100 hover:bg-brand-950 text-brand-400 hover:text-brand-300 transition-colors"
                              title="Delete Inquiry"
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
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: BILATERAL AVIATION & CONSULAR ANALYTICS           */}
      {/* ======================================================== */}
      {activeTab === 'ANALYTICS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Direct Aviation Readiness */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3 text-sky-400 font-bold text-sm">
                <Plane className="w-5 h-5" />
                <span>Bilateral Aviation Grid</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Summary of operational direct charter corridors, passenger schedules, and cargo freight connecting Beijing (PEK), Shanghai (PVG), Guangzhou (CAN), Baghdad (BGW), and Erbil (EBL).
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-600">Baghdad ↔ Guangzhou (CAN)</span>
                  <span className="text-emerald-400 font-mono font-bold">2x Weekly Direct</span>
                </div>
                <div className="flex justify-between items-center text-xs bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-600">Erbil ↔ Beijing / Shanghai</span>
                  <span className="text-sky-400 font-mono font-bold">Consular Fast-Track</span>
                </div>
                <div className="flex justify-between items-center text-xs bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-600">Air China Cargo (PVG ↔ BGW)</span>
                  <span className="text-purple-400 font-mono font-bold">Heavy Freight 777-F</span>
                </div>
              </div>
            </div>

            {/* Consular E-Visa Policy Matrix */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3 text-emerald-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>Consular Policy Matrix</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Active protocols governing passport holders and business delegations traveling under Sino-Iraqi diplomatic agreements.
              </p>
              <div className="space-y-2 pt-2 text-xs">
                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200 space-y-1">
                  <div className="font-bold text-gray-700">Chinese Passport Holders to KRG:</div>
                  <div className="text-gray-500 text-[11px]">30-Day Visa on Arrival / Electronic Visa at Erbil (EBL) & Sulaymaniyah (ISU).</div>
                </div>
                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200 space-y-1">
                  <div className="font-bold text-gray-700">Iraqi Citizens to China:</div>
                  <div className="text-gray-500 text-[11px]">Commercial M-Visa expedited via Chamber Green Channels with biometrics fee waivers.</div>
                </div>
              </div>
            </div>

            {/* Secretariat SLA & Protocol */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3 text-amber-400 font-bold text-sm">
                <Clock className="w-5 h-5" />
                <span>Concierge Protocol SLA</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Operational metrics for consular inquiries received via the portal concierge.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-center">
                  <div className="text-[10px] text-gray-500 font-bold uppercase">Average Response</div>
                  <div className="text-lg font-black text-amber-400 mt-1">&lt; 4 Hours</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-center">
                  <div className="text-[10px] text-gray-500 font-bold uppercase">Clearance Rate</div>
                  <div className="text-lg font-black text-emerald-400 mt-1">98.4%</div>
                </div>
              </div>
              <div className="text-[11px] text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-200 flex items-center justify-between">
                <span>Direct Aviation Liaison Desk:</span>
                <span className="font-mono text-brand-600">+964 790 191 2315</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: SERVICE CREATE / EDIT WITH MULTILINGUAL TABS      */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isServiceModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-gray-200 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative text-ink-900 shadow-2xl space-y-6"
            >
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
                  <Plane className="w-4 h-4" />
                  <span>Consular & Aviation Directory Orchestrator</span>
                </div>
                <h2 className="text-2xl font-black text-gray-900">
                  {editingService ? 'Edit Visa & Flight Service' : 'Catalog New Flight Route / Visa Service'}
                </h2>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                saveServiceMutation.mutate(serviceFormData);
              }} className="space-y-6 text-xs">
                
                {/* Category & Regions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div>
                    <label className="block text-gray-500 mb-1.5 font-bold">Service Classification *</label>
                    <select
                      value={serviceFormData.serviceType}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, serviceType: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-gray-900 font-semibold focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="VISA_ASSISTANCE">Visa & E-Visa Assistance</option>
                      <option value="FLIGHT_ROUTE">Passenger Flight Route</option>
                      <option value="CARGO_LOGISTICS">Cargo & Freight Logistics</option>
                      <option value="PASSPORT_DIPLOMATIC">Diplomatic & Chamber Green Channel</option>
                      <option value="CONSULAR_GUIDE">Airport Concierge & Consular Desk</option>
                      <option value="TRAVEL_PUBLICATION">Logistics & Compliance Publication</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-500 mb-1.5 font-bold">Origin Region *</label>
                    <select
                      value={serviceFormData.originRegion}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, originRegion: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-gray-900 font-semibold focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="CHINA">China</option>
                      <option value="IRAQ">Federal Iraq</option>
                      <option value="KURDISTAN">Kurdistan Region</option>
                      <option value="BILATERAL">Bilateral / Joint</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-500 mb-1.5 font-bold">Destination Region *</label>
                    <select
                      value={serviceFormData.destinationRegion}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, destinationRegion: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-gray-900 font-semibold focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="KURDISTAN">Kurdistan Region</option>
                      <option value="IRAQ">Federal Iraq</option>
                      <option value="CHINA">China</option>
                      <option value="BILATERAL">Bilateral / Joint</option>
                    </select>
                  </div>
                </div>

                {/* Multilingual Tabs Switcher */}
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <div className="flex items-center gap-2">
                      <Globe2 className="w-4 h-4 text-amber-400" />
                      <span className="font-bold text-gray-900 text-sm">Multilingual Content Fields</span>
                    </div>

                    <div className="flex gap-1 bg-white p-1 rounded-lg border border-gray-200">
                      {(['EN', 'AR', 'ZH', 'CKB'] as const).map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setActiveLangTab(lang)}
                          className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                            activeLangTab === lang
                              ? 'bg-amber-500 text-slate-950 font-black'
                              : 'text-gray-500 hover:text-gray-900'
                          }`}
                        >
                          {lang === 'EN' ? 'English (Primary)' : lang === 'AR' ? 'العربية' : lang === 'ZH' ? '中文' : 'کوردی'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* English Tab */}
                  {activeLangTab === 'EN' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-gray-500 mb-1 font-bold">Title (English) *</label>
                        <input
                          type="text"
                          required
                          value={serviceFormData.titleEn}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, titleEn: e.target.value })}
                          placeholder="e.g., Direct Flight Corridor: Baghdad (BGW) <-> Guangzhou (CAN)"
                          className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-gray-900 font-medium focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 mb-1 font-bold">Summary (English) *</label>
                        <textarea
                          rows={2}
                          required
                          value={serviceFormData.summaryEn}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, summaryEn: e.target.value })}
                          placeholder="Brief 1-2 sentence executive overview..."
                          className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-gray-900 font-medium focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 mb-1 font-bold">Full Policy & Operational Guidelines (English)</label>
                        <textarea
                          rows={3}
                          value={serviceFormData.detailsEn}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, detailsEn: e.target.value })}
                          placeholder="Detailed visa requirements, baggage rules, flight days, terminal info..."
                          className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-gray-900 font-medium focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Arabic Tab */}
                  {activeLangTab === 'AR' && (
                    <div className="space-y-3" dir="rtl">
                      <div>
                        <label className="block text-gray-500 mb-1 font-bold text-right">العنوان (العربية)</label>
                        <input
                          type="text"
                          value={serviceFormData.titleAr}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, titleAr: e.target.value })}
                          placeholder="مسار الطيران المباشر: بغداد <-> قوانغتشو"
                          className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-gray-900 font-arabic focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 mb-1 font-bold text-right">الملخص (العربية)</label>
                        <textarea
                          rows={2}
                          value={serviceFormData.summaryAr}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, summaryAr: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-gray-900 font-arabic focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 mb-1 font-bold text-right">التفاصيل والتعليمات الرسمية (العربية)</label>
                        <textarea
                          rows={3}
                          value={serviceFormData.detailsAr}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, detailsAr: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-gray-900 font-arabic focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Chinese Tab */}
                  {activeLangTab === 'ZH' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-gray-500 mb-1 font-bold">服务与航线标题（中文）</label>
                        <input
                          type="text"
                          value={serviceFormData.titleZh}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, titleZh: e.target.value })}
                          placeholder="例如：巴格达直飞广州客运定期航线与商务快速通关"
                          className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 mb-1 font-bold">核心概述（中文）</label>
                        <textarea
                          rows={2}
                          value={serviceFormData.summaryZh}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, summaryZh: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 mb-1 font-bold">详细规章与签证办理说明（中文）</label>
                        <textarea
                          rows={3}
                          value={serviceFormData.detailsZh}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, detailsZh: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Kurdish Tab */}
                  {activeLangTab === 'CKB' && (
                    <div className="space-y-3" dir="rtl">
                      <div>
                        <label className="block text-gray-500 mb-1 font-bold text-right">ناونیشان (کوردی سۆرانی)</label>
                        <input
                          type="text"
                          value={serviceFormData.titleCkb}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, titleCkb: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-gray-900 font-arabic focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 mb-1 font-bold text-right">پوختە (کوردی سۆرانی)</label>
                        <textarea
                          rows={2}
                          value={serviceFormData.summaryCkb}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, summaryCkb: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-gray-900 font-arabic focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 mb-1 font-bold text-right">ڕێنمایی و وردەکاری (کوردی سۆرانی)</label>
                        <textarea
                          rows={3}
                          value={serviceFormData.detailsCkb}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, detailsCkb: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-gray-900 font-arabic focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Operations & SLA */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-500 mb-1 font-bold">Authority / Airline Operator</label>
                    <input
                      type="text"
                      value={serviceFormData.airlineOrAuthority}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, airlineOrAuthority: e.target.value })}
                      placeholder="e.g., Iraqi Airways / Civil Aviation Authority"
                      className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2.5 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 mb-1 font-bold">Processing Time / SLA</label>
                    <input
                      type="text"
                      value={serviceFormData.processingTime}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, processingTime: e.target.value })}
                      placeholder="e.g., 24 - 48 Hours"
                      className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2.5 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 mb-1 font-bold">Cost / Consular Tariff</label>
                    <input
                      type="text"
                      value={serviceFormData.feeOrCost}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, feeOrCost: e.target.value })}
                      placeholder="e.g., $75 Consular Fee / Bilateral Exempt"
                      className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2.5 text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-500 mb-1 font-bold">Image URL *</label>
                    <input
                      type="url"
                      required
                      value={serviceFormData.imageUrl}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, imageUrl: e.target.value })}
                      className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2.5 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 mb-1 font-bold">Official Booking / MFA Portal Link</label>
                    <input
                      type="url"
                      value={serviceFormData.officialLink}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, officialLink: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2.5 text-gray-900"
                    />
                  </div>
                </div>

                {/* Flags */}
                <div className="flex gap-6 items-center pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer text-gray-600 font-bold">
                    <input
                      type="checkbox"
                      checked={serviceFormData.isFeatured}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, isFeatured: e.target.checked })}
                      className="w-4 h-4 rounded bg-gray-100 border-gray-200 text-amber-500 focus:ring-brand-500"
                    />
                    <span>Highlight as Featured Service</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer text-gray-600 font-bold">
                    <input
                      type="checkbox"
                      checked={serviceFormData.isTrending}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, isTrending: e.target.checked })}
                      className="w-4 h-4 rounded bg-gray-100 border-gray-200 text-indigo-500 focus:ring-brand-500"
                    />
                    <span>Mark as Trending Corridors</span>
                  </label>
                </div>

                {/* Buttons */}
                <div className="pt-4 flex gap-3 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsServiceModalOpen(false)}
                    className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-100 text-gray-600 font-bold transition-all"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saveServiceMutation.isPending}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>{saveServiceMutation.isPending ? 'Saving to Database...' : (editingService ? 'Update Service Record' : 'Save & Publish Service')}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* MODAL: INQUIRY DOSSIER INSPECTOR & EDIT                 */}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedInquiryDetail && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-gray-200 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative text-ink-900 shadow-2xl space-y-6"
            >
              <button
                onClick={() => setSelectedInquiryDetail(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-gray-100 text-gray-500 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600">
                  <Ticket className="w-4 h-4" />
                  <span>OFFICIAL CONSULAR DOSSIER</span>
                  <span>•</span>
                  <span>{selectedInquiryDetail.ticketId}</span>
                </div>
                <h2 className="text-2xl font-black text-gray-900 mt-1">
                  {selectedInquiryDetail.fullName}
                </h2>
                <div className="text-xs text-gray-500 mt-0.5">
                  Applied: {new Date(selectedInquiryDetail.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="space-y-4 bg-gray-50 p-5 rounded-xl border border-gray-200 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-400 font-bold uppercase text-[10px]">Email Address</div>
                    <div className="font-semibold text-gray-700 mt-0.5">{selectedInquiryDetail.email}</div>
                  </div>

                  <div>
                    <div className="text-gray-400 font-bold uppercase text-[10px]">Phone Contact</div>
                    <div className="font-semibold text-gray-700 mt-0.5">{selectedInquiryDetail.contactPhone || 'Not provided'}</div>
                  </div>

                  <div>
                    <div className="text-gray-400 font-bold uppercase text-[10px]">Passport Number</div>
                    <div className="font-mono font-bold text-gray-700 mt-0.5">{selectedInquiryDetail.passportNumber}</div>
                  </div>

                  <div>
                    <div className="text-gray-400 font-bold uppercase text-[10px]">Nationality</div>
                    <div className="font-semibold text-gray-700 mt-0.5">{selectedInquiryDetail.nationality || 'Iraqi / Chinese'}</div>
                  </div>

                  <div>
                    <div className="text-gray-400 font-bold uppercase text-[10px]">Route Requested</div>
                    <div className="font-semibold text-amber-400 mt-0.5">
                      {selectedInquiryDetail.origin} → {selectedInquiryDetail.destination}
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-400 font-bold uppercase text-[10px]">Intended Travel Date</div>
                    <div className="font-semibold text-gray-700 mt-0.5">{selectedInquiryDetail.travelDate || 'Flexible'}</div>
                  </div>
                </div>

                <div>
                  <div className="text-gray-400 font-bold uppercase text-[10px]">Service Classification</div>
                  <div className="font-bold text-brand-600 mt-0.5">{selectedInquiryDetail.serviceType}</div>
                </div>

                {selectedInquiryDetail.notes && (
                  <div>
                    <div className="text-gray-400 font-bold uppercase text-[10px]">Applicant Travel Notes</div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200 text-gray-600 mt-1 leading-relaxed">
                      {selectedInquiryDetail.notes}
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-gray-400 font-bold uppercase text-[10px]">Assigned Officer / Desk</div>
                  <div className="font-semibold text-gray-700 mt-0.5">{selectedInquiryDetail.assignedOfficer || 'Consular Desk'}</div>
                </div>

                {selectedInquiryDetail.adminNotes && (
                  <div>
                    <div className="text-gray-400 font-bold uppercase text-[10px]">Internal Admin & Secretariat Notes</div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200 text-amber-300 mt-1 font-mono text-[11px]">
                      {selectedInquiryDetail.adminNotes}
                    </div>
                  </div>
                )}
              </div>

              {/* Status Update Quick Bar */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => {
                    openEditInquiryModal(selectedInquiryDetail);
                    setSelectedInquiryDetail(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-100 text-gray-700 text-xs font-bold flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Dossier & Notes</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      updateInquiryMutation.mutate({
                        id: selectedInquiryDetail.id,
                        data: { status: 'APPROVED' }
                      });
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 shadow"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve & Grant Clearance</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* MODAL: EDIT INQUIRY DOSSIER FORM                        */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isInquiryModalOpen && editingInquiry && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-gray-200 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative text-ink-900 shadow-2xl space-y-6"
            >
              <button
                onClick={() => setIsInquiryModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-gray-100 text-gray-500 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <h2 className="text-xl font-black text-gray-900">
                  Edit Consular Dossier: {editingInquiry.ticketId}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">Update traveler status, assigned desk officer, or internal notes.</p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                updateInquiryMutation.mutate({
                  id: editingInquiry.id,
                  data: inquiryFormData
                });
              }} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-500 mb-1 font-bold">Status *</label>
                    <select
                      value={inquiryFormData.status}
                      onChange={(e) => setInquiryFormData({ ...inquiryFormData, status: e.target.value as any })}
                      className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2.5 text-gray-900 font-bold"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="UNDER_REVIEW">UNDER REVIEW</option>
                      <option value="APPROVED">APPROVED</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="ARCHIVED">ARCHIVED</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-500 mb-1 font-bold">Priority *</label>
                    <select
                      value={inquiryFormData.priority}
                      onChange={(e) => setInquiryFormData({ ...inquiryFormData, priority: e.target.value as any })}
                      className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2.5 text-gray-900 font-bold"
                    >
                      <option value="STANDARD">STANDARD</option>
                      <option value="EXPEDITED">EXPEDITED</option>
                      <option value="DIPLOMATIC">DIPLOMATIC (VIP)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-500 mb-1 font-bold">Assigned Desk Officer</label>
                    <input
                      type="text"
                      value={inquiryFormData.assignedOfficer}
                      onChange={(e) => setInquiryFormData({ ...inquiryFormData, assignedOfficer: e.target.value })}
                      placeholder="e.g. Erbil Consular Secretariat Desk"
                      className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2.5 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 mb-1 font-bold">Applicant Phone Contact</label>
                    <input
                      type="text"
                      value={inquiryFormData.contactPhone}
                      onChange={(e) => setInquiryFormData({ ...inquiryFormData, contactPhone: e.target.value })}
                      className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2.5 text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-500 mb-1 font-bold">Internal Consular Secretariat Notes</label>
                  <textarea
                    rows={3}
                    value={inquiryFormData.adminNotes}
                    onChange={(e) => setInquiryFormData({ ...inquiryFormData, adminNotes: e.target.value })}
                    placeholder="Internal verification notes, visa grant numbers, flight confirmation references..."
                    className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2.5 text-gray-900 font-mono"
                  />
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsInquiryModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-100 text-gray-600 font-bold"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={updateInquiryMutation.isPending}
                    className="flex-1 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold"
                  >
                    {updateInquiryMutation.isPending ? 'Updating...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* MODAL: LIVE PREVIEW DRAWER                               */}
      {/* ======================================================== */}
      <AnimatePresence>
        {previewService && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-gray-200 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative text-ink-900 shadow-2xl space-y-6"
            >
              <button
                onClick={() => setPreviewService(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-gray-100 text-gray-500 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase">
                <Eye className="w-4 h-4" />
                <span>Portal Live Visitor Card Preview</span>
              </div>

              <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-2xl">
                <div className="relative h-48 bg-white">
                  <img src={previewService.imageUrl} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-gray-50/80 text-amber-400 border border-amber-400/30">
                      {previewService.serviceType.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono font-bold text-gray-700">
                    <span className="px-2 py-0.5 rounded bg-gray-50/80 border border-gray-200">
                      {previewService.originRegion} → {previewService.destinationRegion}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                      {previewService.feeOrCost}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-black text-gray-900">{previewService.titleEn}</h3>
                  {previewService.titleAr && (
                    <p className="text-xs text-gray-500 font-arabic text-right" dir="rtl">{previewService.titleAr}</p>
                  )}
                  <p className="text-xs text-gray-600 leading-relaxed">{previewService.summaryEn}</p>
                  
                  {previewService.detailsEn && (
                    <div className="bg-white p-3.5 rounded-xl border border-gray-200 text-xs text-gray-600 leading-relaxed">
                      <div className="font-bold text-amber-400 mb-1 uppercase text-[10px]">Operational Policy:</div>
                      {previewService.detailsEn}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                    <span className="font-semibold text-gray-600">{previewService.airlineOrAuthority}</span>
                    <span className="text-brand-600 font-semibold">{previewService.processingTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setPreviewService(null)}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
