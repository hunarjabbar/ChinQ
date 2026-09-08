import { apiFetch } from '../lib/api';
import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Plus, Search, Shield, User, Mail, Trash2, Edit, Activity, Award, Key, RefreshCw, QrCode, Phone, Calendar, Globe, AlertCircle, CheckCircle2, Download } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import html2canvas from 'html2canvas-pro';

export function AdminUsersContent() {
  const { lang } = useParams<{ lang: string }>();
  const queryClient = useQueryClient();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [clearanceFilter, setClearanceFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credentialCardUser, setCredentialCardUser] = useState<any>(null);
  const [editingUser, setEditingUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'AUTHOR',
    department: 'Editorial & Information',
    title: 'Strategic Analyst',
    clearanceLevel: 'LEVEL-2',
    badgeStatus: 'ACTIVE',
    digitalId: '',
    memberCode: '',
    nationality: 'Iraqi / Chinese',
    passportOrIdNumber: '',
    asaishCode: '',
    iraqiInfoCard: '',
    addressHouseNo: '',
    addressStreetNo: '',
    addressDistrictName: '',
    addressDistrictNumber: '',
    phoneNumber: '',
    dateOfBirth: '',
    emergencyContact: '',
    credentialExpiryDate: '',
    subscriptionStatus: 'INACTIVE',
    subscriptionPlan: 'PREMIUM'
  });

  const generateUniqueIdentifiers = () => {
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setFormData(prev => ({
      ...prev,
      digitalId: `ICA-DID-2026-${randomSuffix}`,
      memberCode: `ICA-M-${randomCode}`
    }));
  };

  const badgeRef = useRef<HTMLDivElement>(null);

  const generateCanvasFallback = (user: any) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 900;
      canvas.height = 540;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Card Background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 900, 540);

      // Card Outline
      ctx.strokeStyle = '#D1D5DB';
      ctx.lineWidth = 3;
      ctx.strokeRect(6, 6, 888, 528);

      // Top Red Header Banner
      ctx.fillStyle = '#cc0000';
      ctx.fillRect(6, 6, 888, 90);

      // Header Text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 22px serif';
      ctx.fillText('IRAQI-CHINESE AGENCY (ICA) • SECRETARIAT', 30, 42);
      ctx.font = 'bold 12px monospace';
      ctx.fillText('OFFICIAL DIPLOMATIC & SOVEREIGN PRESS CREDENTIAL', 30, 68);

      // Clearance Pill in Header
      ctx.fillStyle = '#FAF0E6';
      ctx.fillRect(720, 26, 150, 40);
      ctx.fillStyle = '#cc0000';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(user.clearanceLevel || 'LEVEL-2', 745, 52);

      // Avatar Initial Box
      ctx.fillStyle = '#b30000';
      ctx.fillRect(35, 120, 110, 125);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 64px sans-serif';
      ctx.fillText(user.name ? user.name.charAt(0).toUpperCase() : 'I', 70, 205);

      // Name & Title
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 26px serif';
      ctx.fillText(user.name || 'Member', 170, 155);
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(user.title || 'Strategic Analyst', 170, 185);
      ctx.fillStyle = '#6B7280';
      ctx.font = '14px sans-serif';
      ctx.fillText(user.department || 'Editorial & Intelligence Directorate', 170, 212);

      // Detail Records Box
      ctx.fillStyle = '#F9FAFB';
      ctx.fillRect(35, 265, 830, 195);
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(35, 265, 830, 195);

      const drawField = (label: string, value: string, x: number, y: number) => {
        ctx.fillStyle = '#9CA3AF';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(label.toUpperCase(), x, y);
        ctx.fillStyle = '#111827';
        ctx.font = 'bold 14px monospace';
        ctx.fillText(value || '—', x, y + 18);
      };

      drawField('Member Code', user.memberCode || 'ICA-M-1001', 55, 295);
      drawField('Unique Digital ID', user.digitalId || 'ICA-DID-2026-HQ01', 320, 295);
      drawField('Status', user.badgeStatus || 'ACTIVE', 630, 295);

      drawField('Passport / ID', user.passportOrIdNumber || 'Verified', 55, 345);
      drawField('Asaish Security Code', user.asaishCode || 'ICA-SEC-APPROVED', 320, 345);
      drawField('Clearance', user.clearanceLevel || 'LEVEL-2', 630, 345);

      const expiryStr = user.credentialExpiryDate ? new Date(user.credentialExpiryDate).toLocaleDateString() : 'Active Sovereign';
      drawField('Nationality', user.nationality || 'Iraqi / Chinese', 55, 395);
      drawField('Validity Expiry', expiryStr, 320, 395);
      drawField('Renewals Count', String(user.renewalCount || 0), 630, 395);

      // Bottom Footer Bar
      ctx.fillStyle = '#cc0000';
      ctx.fillRect(6, 480, 888, 54);
      ctx.fillStyle = '#FAF0E6';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('VERIFIED BILATERAL PROTOCOL • BAGHDAD - BEIJING INTER-MINISTERIAL NETWORK', 30, 512);

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `ICA-Badge-${user.memberCode || user.digitalId || 'Credential'}.png`;
      link.click();
    } catch (e) {
      console.error('Direct canvas render error', e);
    }
  };

  const handleDownloadBadge = async () => {
    if (!credentialCardUser) return;
    try {
      if (badgeRef.current) {
        const canvas = await html2canvas(badgeRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
          windowWidth: 800
        });
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `ICA-Badge-${credentialCardUser?.memberCode || 'Card'}.png`;
        link.click();
        return;
      }
    } catch (err) {
      console.warn('html2canvas encountered error (e.g. CSS color function), falling back to pure 2D Canvas engine:', err);
    }
    // High-fidelity fallback that never fails on unsupported CSS color functions
    generateCanvasFallback(credentialCardUser);
  };

  const { data: users = [], isLoading } = useQuery<any[]>({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (newUser: any) => {
      const res = await apiFetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      if (!res.ok) throw new Error('Failed to provision credentials');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setIsModalOpen(false);
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedUser: any) => {
      const res = await apiFetch(`/api/admin/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });
      if (!res.ok) throw new Error('Failed to update credentials');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setIsModalOpen(false);
      resetForm();
    }
  });

  const renewMutation = useMutation({
    mutationFn: async (userId: string) => {
      const res = await apiFetch(`/api/admin/users/${userId}/renew`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Failed to renew credentials');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (userId: string) => {
      const res = await apiFetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to revoke credentials');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    }
  });

  const resetForm = () => {
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    setFormData({ 
      name: '', 
      email: '', 
      password: '', 
      role: 'AUTHOR', 
      department: 'Editorial & Information',
      title: 'Strategic Analyst',
      clearanceLevel: 'LEVEL-2',
      badgeStatus: 'ACTIVE',
      digitalId: '',
      memberCode: '',
      nationality: 'Iraqi / Chinese',
      passportOrIdNumber: '',
      asaishCode: '',
      iraqiInfoCard: '',
      addressHouseNo: '',
      addressStreetNo: '',
      addressDistrictName: '',
      addressDistrictNumber: '',
      phoneNumber: '',
      dateOfBirth: '',
      emergencyContact: '',
      credentialExpiryDate: oneYearLater.toISOString().split('T')[0],
      subscriptionStatus: 'INACTIVE', 
      subscriptionPlan: 'PREMIUM' 
    });
    setEditingUser(null);
  };

  const openCreateModal = () => {
    resetForm();
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    setFormData(prev => ({
      ...prev,
      digitalId: `ICA-DID-2026-${randomSuffix}`,
      memberCode: `ICA-M-${randomCode}`,
      credentialExpiryDate: oneYearLater.toISOString().split('T')[0]
    }));
    setIsModalOpen(true);
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    const expiryStr = user.credentialExpiryDate ? new Date(user.credentialExpiryDate).toISOString().split('T')[0] : '';
    setFormData({
      name: user.name || '',
      email: user.email || '',
      password: '',
      role: user.role || 'AUTHOR',
      department: user.department || 'Editorial & Information',
      title: user.title || 'Strategic Analyst',
      clearanceLevel: user.clearanceLevel || 'LEVEL-2',
      badgeStatus: user.badgeStatus || 'ACTIVE',
      digitalId: user.digitalId || `ICA-DID-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      memberCode: user.memberCode || `ICA-M-${Math.floor(1000 + Math.random() * 9000)}`,
      nationality: user.nationality || 'Iraqi / Chinese',
      passportOrIdNumber: user.passportOrIdNumber || '',
      asaishCode: user.asaishCode || '',
      iraqiInfoCard: user.iraqiInfoCard || '',
      addressHouseNo: user.addressHouseNo || '',
      addressStreetNo: user.addressStreetNo || '',
      addressDistrictName: user.addressDistrictName || '',
      addressDistrictNumber: user.addressDistrictNumber || '',
      phoneNumber: user.phoneNumber || '',
      dateOfBirth: user.dateOfBirth || '',
      emergencyContact: user.emergencyContact || '',
      credentialExpiryDate: expiryStr,
      subscriptionStatus: user.subscriptionStatus || 'INACTIVE',
      subscriptionPlan: user.subscriptionPlan || 'PREMIUM'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateMutation.mutate({ id: editingUser.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredUsers = users.filter((u: any) => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.digitalId && u.digitalId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.memberCode && u.memberCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.passportOrIdNumber && u.passportOrIdNumber.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesClearance = clearanceFilter === 'ALL' || u.clearanceLevel === clearanceFilter;

    return matchesSearch && matchesRole && matchesClearance;
  });

  return (
    <div className="space-y-6 text-start w-full pb-12">
      {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold font-black tracking-tight text-brand-800 uppercase">Institutional Credentials & Member Database</h1>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Complete Sovereign Member Database • Credential Issuance, Personal Records & Annual Renewal Lifecycle.</p>
          </div>
          <button 
            onClick={openCreateModal}
            className="bg-brand-800 hover:bg-brand-700 text-white px-5 py-2.5 rounded-sm font-bold text-xs uppercase tracking-widest transition-colors shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Provision New Credential
          </button>
        </div>

        {/* Filters and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, digital ID, passport/ID, or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm"
              />
            </div>
          </div>
          
          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm text-xs font-bold uppercase tracking-wider"
            >
              <option value="ALL">All Roles</option>
              <option value="AUTHOR">Author</option>
              <option value="EDITOR">Editor</option>
              <option value="ADMIN">Admin</option>
              <option value="VOLUNTEER">Volunteer</option>
              <option value="INTERN">Intern</option>
            </select>
          </div>

          <div>
            <select
              value={clearanceFilter}
              onChange={(e) => setClearanceFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm text-xs font-bold uppercase tracking-wider"
            >
              <option value="ALL">All Clearances</option>
              <option value="LEVEL-1">Level 1 - Restricted</option>
              <option value="LEVEL-2">Level 2 - Confidential</option>
              <option value="LEVEL-3">Level 3 - Secret</option>
              <option value="LEVEL-4">Level 4 - Sovereign</option>
            </select>
          </div>
        </div>

        {/* Stats summary bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 p-4 rounded-sm flex items-center gap-4 shadow-xs">
            <div className="p-2 bg-brand-50 text-brand-800 rounded-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Registered Members</div>
              <div className="text-lg font-black text-brand-800">{users.length} Database Records</div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-sm flex items-center gap-4 shadow-xs">
            <div className="p-2 bg-green-50 text-green-700 rounded-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Active Credentials</div>
              <div className="text-lg font-black text-green-800">{users.filter((u:any) => u.badgeStatus === 'ACTIVE').length} Valid</div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-sm flex items-center gap-4 shadow-xs">
            <div className="p-2 bg-yellow-50 text-yellow-700 rounded-sm">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Level 4 Sovereign Clearance</div>
              <div className="text-lg font-black text-brand-800">{users.filter((u:any) => u.clearanceLevel === 'LEVEL-4' || u.role === 'ADMIN').length} Personnel</div>
            </div>
          </div>
        </div>

        {/* Member Database Grid */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-paper-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-widest border-b border-brand-800">Member Identity & ID</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-widest border-b border-brand-800">Personal & Passport Info</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-widest border-b border-brand-800">Department & Title</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-widest border-b border-brand-800">Clearance & Status</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-widest border-b border-brand-800">Renewal Status</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-black text-gray-500 uppercase tracking-widest border-b border-brand-800">Actions & Renewal</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-gray-500 text-xs font-bold uppercase tracking-widest">
                      <div className="flex justify-center mb-2"><Activity className="w-5 h-5 animate-pulse text-brand-800" /></div>
                      Querying Sovereign Member Database...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-gray-500 text-xs font-bold uppercase tracking-widest">
                      No registered members found matching criteria
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user: any) => {
                    const expiryDate = user.credentialExpiryDate ? new Date(user.credentialExpiryDate) : null;
                    const isExpired = expiryDate && expiryDate < new Date();
                    return (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-sm bg-brand-800 flex items-center justify-center text-white font-black text-sm uppercase shadow-xs flex-shrink-0">
                              {user.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                {user.name}
                                <button 
                                  onClick={() => setCredentialCardUser(user)}
                                  title="View Secure Digital ID Card"
                                  className="text-brand-800 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 p-1 rounded-sm transition-colors"
                                >
                                  <QrCode className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <div className="text-xs text-gray-500 font-medium flex items-center gap-2 mt-0.5">
                                <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-bold text-gray-700">{user.memberCode || 'ICA-M-0000'}</span>
                                <span className="text-brand-800 font-bold">{user.digitalId || 'ICA-DID-2026-XXXX'}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-gray-400" /> {user.nationality || 'Iraqi / Chinese'}
                          </div>
                          <div className="text-[11px] text-gray-600 font-medium mt-0.5">
                            ID: <span className="font-bold text-ink-900">{user.passportOrIdNumber || 'Not Specified'}</span>
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-gray-400" /> {user.phoneNumber || 'No phone'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-xs font-bold text-gray-900">{user.department || 'Editorial & Information'}</div>
                          <div className="text-[11px] text-gray-500 font-medium">{user.title || 'Strategic Analyst'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <span className={`px-2.5 py-0.5 inline-flex text-xs leading-4 font-black uppercase tracking-widest rounded-sm ${
                              user.role === 'VOLUNTEER' ? 'bg-rose-100 text-brand-800 border border-rose-300' :
                              user.role === 'INTERN' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                              user.clearanceLevel === 'LEVEL-4' ? 'bg-brand-800 text-white' : 
                              user.clearanceLevel === 'LEVEL-3' ? 'bg-blue-800 text-white' : 
                              user.clearanceLevel === 'LEVEL-2' ? 'bg-blue-100 text-blue-900' : 
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {user.role === 'VOLUNTEER' ? 'VOLUNTEER' : user.role === 'INTERN' ? 'INTERN' : (user.clearanceLevel || user.role)}
                            </span>
                            <div>
                              <span className={`px-2 py-0.5 inline-flex text-[8px] font-bold uppercase tracking-wider rounded-sm ${
                                user.badgeStatus === 'ACTIVE' && !isExpired ? 'bg-green-100 text-green-800' : 
                                isExpired ? 'bg-red-100 text-red-800 font-black' : 
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {isExpired ? 'EXPIRED' : (user.badgeStatus || 'ACTIVE')}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-xs font-medium font-bold text-gray-900 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-brand-800" />
                            {expiryDate ? expiryDate.toLocaleDateString() : 'No Expiry'}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                            <span>Renewals: <strong className="text-brand-800">{user.renewalCount || 0}</strong></span>
                            {user.lastRenewedAt && (
                              <span>({new Date(user.lastRenewedAt).toLocaleDateString()})</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => renewMutation.mutate(user.id)}
                              disabled={renewMutation.isPending}
                              className="bg-brand-50 hover:bg-brand-100 text-brand-800 px-2.5 py-1 rounded-sm text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-colors border border-brand-200"
                              title="Renew Credential for 1 Year"
                            >
                              <RefreshCw className="w-3 h-3 animate-spin-hover" />
                              Renew
                            </button>
                            <button 
                              onClick={() => openEditModal(user)}
                              className="text-gray-400 hover:text-blue-600 p-1 transition-colors"
                              title="Edit Full Member Profile"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => {
                                if (window.confirm(`Revoke credentials and delete member ${user.name}?`)) {
                                  deleteMutation.mutate(user.id);
                                }
                              }}
                              className="text-gray-400 hover:text-brand-600 p-1 transition-colors"
                              title="Revoke & Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Digital ID Credential Card Modal */}
        {credentialCardUser && (
          <div className="fixed inset-0 bg-brand-800/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-md shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border-2 border-brand-800 text-start flex flex-col">
              <div className="bg-brand-800 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-brand-300" />
                  <span className="font-bold font-black uppercase tracking-widest text-sm">Official Institutional Digital Credential ID Card</span>
                </div>
                <button onClick={() => setCredentialCardUser(null)} className="text-white hover:text-gray-300 text-lg font-bold">&times;</button>
              </div>
              <div className="p-8 space-y-6 bg-paper-50 flex-1 overflow-y-auto">
                <div ref={badgeRef} className="bg-white p-6 rounded-sm shadow-sm border border-gray-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-800/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
                  
                  <div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-4">
                    <div>
                      <div className="text-xs font-black uppercase tracking-[0.2em] text-brand-800">Iraqi-Chinese Agency (ICA)</div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sovereign Press Credentials</div>
                    </div>
                    <div className="bg-brand-800 text-white text-xs font-black uppercase px-2.5 py-1 rounded-sm">
                      {credentialCardUser.clearanceLevel || 'LEVEL-2'}
                    </div>
                  </div>

                  <div className="flex items-center gap-5 my-4">
                    <div className="h-16 w-16 bg-brand-800 text-white flex items-center justify-center font-black text-2xl uppercase rounded-sm shadow-sm">
                      {credentialCardUser.name.charAt(0)}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold font-black text-brand-800">{credentialCardUser.name}</h4>
                      <p className="text-xs font-bold text-gray-700">{credentialCardUser.title || 'Strategic Analyst'}</p>
                      <p className="text-[11px] text-gray-500 font-medium">{credentialCardUser.department || 'Editorial & Information'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-sm border border-gray-200 text-xs font-medium">
                    <div>
                      <span className="text-xs text-gray-400 block uppercase font-bold tracking-wider">Member Code</span>
                      <span className="font-black text-brand-800">{credentialCardUser.memberCode || 'ICA-M-1001'}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block uppercase font-bold tracking-wider">Unique Digital ID</span>
                      <span className="font-black text-brand-800">{credentialCardUser.digitalId || 'ICA-DID-2026-XXXX'}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block uppercase font-bold tracking-wider">Passport / National ID</span>
                      <span className="font-bold text-gray-800">{credentialCardUser.passportOrIdNumber || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block uppercase font-bold tracking-wider">Asaish Code</span>
                      <span className="font-bold text-brand-800">{credentialCardUser.asaishCode || 'Not Assigned'}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block uppercase font-bold tracking-wider">Iraqi Info Card (بطاقة المعلومات)</span>
                      <span className="font-bold text-gray-800">{credentialCardUser.iraqiInfoCard || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block uppercase font-bold tracking-wider">Credential Expiry</span>
                      <span className="font-bold text-gray-800">{credentialCardUser.credentialExpiryDate ? new Date(credentialCardUser.credentialExpiryDate).toLocaleDateString() : 'Active'}</span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-gray-200">
                      <span className="text-xs text-gray-400 block uppercase font-bold tracking-wider">Full Address</span>
                      <span className="font-bold text-gray-800 text-[11px]">
                        House {credentialCardUser.addressHouseNo || '—'}, Street {credentialCardUser.addressStreetNo || '—'}, {credentialCardUser.addressDistrictName || '—'} (Dist. {credentialCardUser.addressDistrictNumber || '—'})
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500 border-t border-gray-200 pt-3">
                    <div>Nationality: <strong className="text-gray-800">{credentialCardUser.nationality || 'Iraqi / Chinese'}</strong></div>
                    <div>Renewals: <strong className="text-brand-800">{credentialCardUser.renewalCount || 0}</strong></div>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-3">
                  <button
                    onClick={handleDownloadBadge}
                    className="px-4 py-2 bg-green-800 text-white rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-green-700 transition-colors flex items-center gap-2 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Badge (PNG)
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        window.print();
                      }}
                      className="px-4 py-2 bg-brand-800 text-white rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-brand-700 transition-colors"
                    >
                      Print
                    </button>
                    <button
                      onClick={() => setCredentialCardUser(null)}
                      className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create / Edit Full Member Registration Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-brand-800/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-sm shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-start flex flex-col">
              <div className="px-6 py-4 border-b border-gray-200 bg-paper-50 flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-widest text-brand-800 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-brand-800" />
                  {editingUser ? 'Modify Member Profile & Institutional Credentials' : 'Provision Member Credentials & Full Registration'}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                >
                  &times;
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
                {/* Section 1: Personal Information */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-brand-800 border-b border-brand-200 pb-1 mb-3">
                    1. Personal Information & Identity Requirements
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Full Legal Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm"
                          placeholder="Dr. Tariq Al-Hashimi"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Corporate Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm"
                          placeholder="tariq@iraqi-chineseagency.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Nationality</label>
                      <input
                        type="text"
                        value={formData.nationality}
                        onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm"
                        placeholder="Iraqi / Chinese"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Passport / National ID Number</label>
                      <input
                        type="text"
                        value={formData.passportOrIdNumber}
                        onChange={(e) => setFormData({...formData, passportOrIdNumber: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm font-medium"
                        placeholder="IQ-9821849 or CN-49281"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Asaish Code Number</label>
                      <input
                        type="text"
                        value={formData.asaishCode}
                        onChange={(e) => setFormData({...formData, asaishCode: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm font-medium uppercase"
                        placeholder="AS-2026-XXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Iraqi Information Card Number (بطاقة المعلومات)</label>
                      <input
                        type="text"
                        value={formData.iraqiInfoCard}
                        onChange={(e) => setFormData({...formData, iraqiInfoCard: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm font-medium"
                        placeholder="Info Card No / Tamween"
                      />
                    </div>

                    <div className="sm:col-span-2 bg-paper-50 p-4 rounded-sm border border-gray-200 space-y-3">
                      <label className="block text-xs font-black text-gray-800 uppercase tracking-widest">Full Address Information</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">House No.</label>
                          <input
                            type="text"
                            value={formData.addressHouseNo}
                            onChange={(e) => setFormData({...formData, addressHouseNo: e.target.value})}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-sm text-xs bg-white"
                            placeholder="House 14"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Street No.</label>
                          <input
                            type="text"
                            value={formData.addressStreetNo}
                            onChange={(e) => setFormData({...formData, addressStreetNo: e.target.value})}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-sm text-xs bg-white"
                            placeholder="Street 62"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">District Name</label>
                          <input
                            type="text"
                            value={formData.addressDistrictName}
                            onChange={(e) => setFormData({...formData, addressDistrictName: e.target.value})}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-sm text-xs bg-white"
                            placeholder="Al-Karrada"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">District Number</label>
                          <input
                            type="text"
                            value={formData.addressDistrictNumber}
                            onChange={(e) => setFormData({...formData, addressDistrictNumber: e.target.value})}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-sm text-xs bg-white"
                            placeholder="District 902"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm font-medium"
                        placeholder="+964 780 123 4567"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Emergency Contact Information</label>
                      <input
                        type="text"
                        value={formData.emergencyContact}
                        onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm"
                        placeholder="Name, Relationship & Phone Number"
                      />
                    </div>
                  </div>
                </div>

                {!editingUser && (
                  <div>
                    <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Initial Secure Passkey *</label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                )}

                {/* Section 2: Institutional Identifiers & Renewal */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-brand-800 border-b border-brand-200 pb-1 mb-3">
                    2. Institutional Identifiers & Renewal Lifecycle
                  </h4>
                  <div className="bg-paper-50 p-4 rounded-sm border border-gray-200 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-gray-700 uppercase tracking-widest">Unique Digital ID & Member Code</span>
                      <button
                        type="button"
                        onClick={generateUniqueIdentifiers}
                        className="text-xs font-bold text-brand-800 hover:text-brand-700 flex items-center gap-1 uppercase tracking-wider bg-white px-2.5 py-1 border border-brand-200 rounded-sm shadow-xs"
                      >
                        <RefreshCw className="w-3 h-3" /> Regenerate IDs
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Digital ID (Unique)</label>
                        <input
                          type="text"
                          required
                          value={formData.digitalId}
                          onChange={(e) => setFormData({...formData, digitalId: e.target.value})}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-sm font-medium text-xs bg-white uppercase font-bold text-brand-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Member Code</label>
                        <input
                          type="text"
                          required
                          value={formData.memberCode}
                          onChange={(e) => setFormData({...formData, memberCode: e.target.value})}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-sm font-medium text-xs bg-white uppercase font-bold text-brand-800"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Credential Expiry / Renewal Date</label>
                      <input
                        type="date"
                        required
                        value={formData.credentialExpiryDate}
                        onChange={(e) => setFormData({...formData, credentialExpiryDate: e.target.value})}
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-sm text-xs bg-white font-medium font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Department & Clearance */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-brand-800 border-b border-brand-200 pb-1 mb-3">
                    3. Department & Clearance Levels
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Department / Bureau</label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Official Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Institutional Role</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm bg-white uppercase font-bold"
                      >
                        <option value="AUTHOR">Author / Fellow</option>
                        <option value="EDITOR">Editor</option>
                        <option value="ADMIN">Admin</option>
                        <option value="VOLUNTEER">Volunteering Corps</option>
                        <option value="INTERN">Research & Diplomatic Intern</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Security Clearance Level</label>
                      <select
                        value={formData.clearanceLevel}
                        onChange={(e) => setFormData({...formData, clearanceLevel: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm bg-white uppercase font-bold"
                      >
                        <option value="LEVEL-1">Level 1 - Restricted</option>
                        <option value="LEVEL-2">Level 2 - Confidential</option>
                        <option value="LEVEL-3">Level 3 - Secret / Editorial</option>
                        <option value="LEVEL-4">Level 4 - Sovereign / Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1">Badge Status</label>
                      <select
                        value={formData.badgeStatus}
                        onChange={(e) => setFormData({...formData, badgeStatus: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-brand-800 focus:border-brand-800 text-sm bg-white uppercase font-bold"
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="SUSPENDED">Suspended</option>
                        <option value="REVOKED">Revoked</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="px-4 py-2 bg-brand-800 text-white rounded-sm hover:bg-brand-700 transition-colors text-xs font-bold uppercase tracking-widest disabled:opacity-50"
                  >
                    {editingUser ? 'Update Member Profile' : 'Provision Credential & Register'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  );
}

export function AdminUsers() {
  return (
    <AdminLayout>
      <AdminUsersContent />
    </AdminLayout>
  );
}
