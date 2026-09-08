import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { 
  Users, 
  Briefcase, 
  Trash2, 
  Check, 
  X, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Building2, 
  ChevronRight,
  HeartHandshake,
  GraduationCap,
  FileText,
  Search,
  Filter,
  Download,
  Printer,
  Award,
  Globe,
  Phone,
  QrCode
} from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { IcaLogo } from '../IcaLogo';

export function AdminPartnerships() {
  const queryClient = useQueryClient();
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'VOLUNTEER' | 'INTERN' | 'EDITORIAL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppForCertificate, setSelectedAppForCertificate] = useState<any | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const adminCertRef = useRef<HTMLDivElement>(null);

  const { data: applications = [], isLoading } = useQuery<any[]>({
    queryKey: ['admin-applications'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/applications');
      if (!res.ok) return [];
      return res.json();
    }
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const res = await apiFetch(`/api/admin/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update status');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-applications'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/admin/applications/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-applications'] });
    }
  });

  // Filter applications
  const filteredApps = applications.filter((app) => {
    const matchesRole = 
      roleFilter === 'ALL' ||
      (roleFilter === 'VOLUNTEER' && app.role?.toLowerCase() === 'volunteer') ||
      (roleFilter === 'INTERN' && app.role?.toLowerCase() === 'intern') ||
      (roleFilter === 'EDITORIAL' && app.role?.toLowerCase() !== 'volunteer' && app.role?.toLowerCase() !== 'intern');

    const matchesSearch = 
      !searchQuery.trim() ||
      app.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.hash?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.bureau?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRole && matchesSearch;
  });

  const volunteerCount = applications.filter(a => a.role?.toLowerCase() === 'volunteer').length;
  const internCount = applications.filter(a => a.role?.toLowerCase() === 'intern').length;
  const editorialCount = applications.filter(a => a.role?.toLowerCase() !== 'volunteer' && a.role?.toLowerCase() !== 'intern').length;

  const handleDownloadAdminPdf = async () => {
    if (!adminCertRef.current || !selectedAppForCertificate) return;
    setIsDownloadingPdf(true);
    try {
      const canvas = await html2canvas(adminCertRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 1024,
        onclone: (clonedDoc: Document) => {
          const target = clonedDoc.querySelector('[data-admin-cert="true"]') as HTMLElement;
          if (target) {
            target.style.backgroundColor = '#ffffff';
            target.style.color = '#111827';
          }
        }
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, Math.min(pdfHeight, 297));
      pdf.save(`ADMIN-${selectedAppForCertificate.hash || 'DOSSIER'}.pdf`);
    } catch (err) {
      console.error(err);
      if (window.confirm('Direct PDF generation faced an issue. Would you like to use the Print Dialog to save as PDF?')) {
        window.print();
      }
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center">
        <div className="w-10 h-10 border-4 border-brand-100 border-t-brand-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500 text-start">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold font-black text-brand-900 tracking-tight">Sovereign Vetting Registry</h2>
            <span className="bg-brand-800 text-white text-xs font-medium px-2 py-0.5 rounded font-black tracking-widest uppercase">
              Live Synchronized
            </span>
          </div>
          <p className="text-sm text-neutral-500 font-medium mt-1">
            Manage volunteer registrations, intern appointments, partnership dossiers, and bilateral bureau vetting.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="bg-brand-50 text-brand-800 px-4 py-2 rounded-lg border border-brand-100 flex items-center gap-2">
            <Users size={16} />
            <span className="text-xs font-black uppercase tracking-widest">{applications.length} Total Registered</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-3 rounded-xl border border-neutral-200 shadow-xs">
        {/* Role Tabs */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setRoleFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              roleFilter === 'ALL'
                ? 'bg-ink-900 text-white shadow-sm'
                : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            All Dossiers ({applications.length})
          </button>

          <button
            onClick={() => setRoleFilter('VOLUNTEER')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              roleFilter === 'VOLUNTEER'
                ? 'bg-brand-800 text-white shadow-sm'
                : 'bg-rose-50 text-brand-800 hover:bg-rose-100'
            }`}
          >
            <HeartHandshake size={14} />
            <span>Volunteers ({volunteerCount})</span>
          </button>

          <button
            onClick={() => setRoleFilter('INTERN')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              roleFilter === 'INTERN'
                ? 'bg-purple-900 text-white shadow-sm'
                : 'bg-purple-50 text-purple-900 hover:bg-purple-100'
            }`}
          >
            <GraduationCap size={14} />
            <span>Interns ({internCount})</span>
          </button>

          <button
            onClick={() => setRoleFilter('EDITORIAL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              roleFilter === 'EDITORIAL'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
            }`}
          >
            <FileText size={14} />
            <span>Fellows / Corporate ({editorialCount})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search size={14} className="absolute left-3 top-2.5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search candidate or Ref..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-brand-800"
          />
        </div>
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="py-24 text-center border-2 border-dashed border-neutral-200 rounded-2xl bg-neutral-50/30">
          <div className="inline-flex p-4 bg-white rounded-full shadow-sm mb-4">
            <Users className="text-neutral-300" size={32} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-neutral-400">No Matching Dossiers Found</h3>
          <p className="text-xs text-neutral-400 mt-1">Registrations for volunteers and interns will populate automatically.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredApps.map((app) => {
            const isVolunteer = app.role?.toLowerCase() === 'volunteer';
            const isIntern = app.role?.toLowerCase() === 'intern';

            return (
              <div key={app.id} className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col lg:flex-row">
                  {/* Left Column: Candidate Overview */}
                  <div className="lg:w-80 bg-neutral-50 border-r border-neutral-100 p-6 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-xl shadow-sm flex items-center justify-center font-black text-xl border ${
                          isVolunteer ? 'bg-rose-50 text-brand-800 border-rose-200' :
                          isIntern ? 'bg-purple-50 text-purple-800 border-purple-200' :
                          'bg-white text-brand-900 border-neutral-200'
                        }`}>
                          {isVolunteer ? <HeartHandshake size={22} /> : isIntern ? <GraduationCap size={22} /> : app.fullName?.[0]}
                        </div>

                        {/* Role Badge */}
                        <span className={`text-xs font-medium font-black uppercase px-2.5 py-1 rounded-md border ${
                          isVolunteer ? 'bg-rose-100 text-brand-800 border-rose-300' :
                          isIntern ? 'bg-purple-100 text-purple-900 border-purple-300' :
                          'bg-neutral-100 text-neutral-700 border-neutral-300'
                        }`}>
                          {isVolunteer ? 'VOLUNTEER' : isIntern ? 'INTERN' : (app.role || 'APPLICANT')}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-bold font-black text-brand-900 leading-tight">{app.fullName}</h4>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 mt-1">
                          <Building2 size={12} className="shrink-0 text-neutral-400" />
                          <span className="line-clamp-1">{app.company}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mt-6 pt-4 border-t border-neutral-200">
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-widest ${
                          app.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                          app.status === 'REJECTED' ? 'bg-brand-100 text-brand-800' :
                          'bg-amber-100 text-amber-800 animate-pulse'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            app.status === 'APPROVED' ? 'bg-green-600' :
                            app.status === 'REJECTED' ? 'bg-brand-800' :
                            'bg-amber-600'
                          }`}></div>
                          {app.status}
                        </span>

                        <button
                          onClick={() => setSelectedAppForCertificate(app)}
                          className="text-xs font-medium font-bold text-brand-800 hover:text-brand-900 bg-brand-50 hover:bg-brand-100 px-2 py-0.5 rounded border border-brand-200 flex items-center gap-1 transition-colors cursor-pointer"
                          title="View Official Certificate & PDF"
                        >
                          <Award size={11} />
                          <span>View PDF Dossier</span>
                        </button>
                      </div>

                      <p className="text-xs font-medium text-neutral-500 font-bold uppercase truncate">
                        Code: <span className="text-brand-800">{app.hash}</span>
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Detailed Vetting Attributes */}
                  <div className="flex-1 p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="space-y-0.5">
                          <label className="text-xs font-black text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                            <Mail size={11} /> Contact Channel
                          </label>
                          <p className="text-xs font-bold text-brand-900 font-medium underline decoration-neutral-200 underline-offset-2">
                            {app.email}
                          </p>
                          {app.phoneNumber && (
                            <p className="text-xs text-neutral-600 font-medium flex items-center gap-1 mt-0.5">
                              <Phone size={10} className="text-neutral-400" /> {app.phoneNumber}
                            </p>
                          )}
                        </div>

                        <div className="space-y-0.5">
                          <label className="text-xs font-black text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                            <Briefcase size={11} /> Assigned Bureau / Track
                          </label>
                          <p className="text-xs font-bold text-brand-900">
                            {app.bureau}
                          </p>
                        </div>

                        {(app.nationality || app.passportOrIdNumber) && (
                          <div className="space-y-0.5 text-xs text-neutral-600 font-medium">
                            <label className="text-xs font-black text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                              <Globe size={11} /> Identity & Clearance
                            </label>
                            <div>{app.nationality} • ID: {app.passportOrIdNumber}</div>
                            {app.asaishCode && (
                              <div className="text-xs text-brand-800 font-bold">Asaish Code: {app.asaishCode}</div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-black text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                          <ShieldCheck size={11} /> Statement of Motivation / Research Abstract
                        </label>
                        <p className="text-xs text-neutral-600 font-bold italic leading-relaxed line-clamp-4 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                          "{app.bio}"
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-widest font-medium">
                        <Clock size={11} />
                        Logged: {new Date(app.createdAt).toLocaleDateString()} at {new Date(app.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => statusMutation.mutate({ id: app.id, status: 'APPROVED' })}
                          className="bg-neutral-900 hover:bg-green-700 text-white font-black text-xs px-4 py-1.5 rounded-lg uppercase tracking-wider transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                        >
                          <Check size={12} />
                          Authorize Dossier
                        </button>
                        <button 
                          onClick={() => statusMutation.mutate({ id: app.id, status: 'REJECTED' })}
                          className="bg-white hover:bg-rose-50 border border-neutral-200 text-neutral-600 hover:text-brand-800 font-black text-xs px-4 py-1.5 rounded-lg uppercase tracking-wider transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                        >
                          <X size={12} />
                          Decline
                        </button>
                        <button 
                          onClick={() => { if(confirm('Permanently purge this dossier from sovereign ledger?')) deleteMutation.mutate(app.id) }}
                          className="p-1.5 text-neutral-300 hover:text-brand-800 transition-colors cursor-pointer"
                          title="Purge Record"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Admin Credential PDF Viewer & Export Modal */}
      {selectedAppForCertificate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border-2 border-brand-800 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-2">
                <IcaLogo size={32} variant="mark" />
                <h3 className="font-bold font-black text-lg text-brand-900">
                  Official Synchronized Credential Dossier
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadAdminPdf}
                  disabled={isDownloadingPdf}
                  className="px-3 py-1.5 bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Download size={14} />
                  <span>{isDownloadingPdf ? 'Generating...' : 'Download PDF'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer size={14} />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setSelectedAppForCertificate(null)}
                  className="p-1.5 text-neutral-400 hover:text-brand-900 rounded-lg cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Certificate Template in Strict White & Red Palette */}
            <div 
              ref={adminCertRef}
              data-admin-cert="true"
              className="rounded-xl p-8 space-y-6 shadow-sm"
              style={{ 
                backgroundColor: '#ffffff', 
                color: '#111827', 
                border: '4px solid #cc0000', 
                fontFamily: 'Georgia, serif' 
              }}
            >
              <div 
                className="pb-4 flex items-center justify-between"
                style={{ borderBottom: '2px solid #cc0000' }}
              >
                <div className="flex items-center gap-3">
                  <IcaLogo size={48} variant="mark" />
                  <div>
                    <div 
                      className="text-xs font-medium font-bold uppercase tracking-widest"
                      style={{ color: '#cc0000' }}
                    >
                      Republic of Iraq • People's Republic of China
                    </div>
                    <div 
                      className="text-lg font-bold font-black"
                      style={{ color: '#111827' }}
                    >
                      Iraqi-Chinese Agency • Central Administration Registry
                    </div>
                  </div>
                </div>

                <div className="text-end font-medium">
                  <div 
                    className="text-xs uppercase"
                    style={{ color: '#9ca3af' }}
                  >
                    Synchronized Ref
                  </div>
                  <div 
                    className="text-sm font-black"
                    style={{ color: '#cc0000' }}
                  >
                    {selectedAppForCertificate.hash}
                  </div>
                </div>
              </div>

              <div 
                className="p-3 rounded-lg text-center"
                style={{ backgroundColor: '#cc0000', color: '#ffffff' }}
              >
                <h4 
                  className="text-base font-bold font-black uppercase tracking-wider"
                  style={{ color: '#ffffff' }}
                >
                  {selectedAppForCertificate.role?.toLowerCase() === 'volunteer' 
                    ? 'OFFICIAL VOLUNTEER REGISTRATION CREDENTIAL'
                    : selectedAppForCertificate.role?.toLowerCase() === 'intern'
                    ? 'OFFICIAL INTERNSHIP & RESEARCH APPOINTMENT'
                    : 'OFFICIAL FELLOWSHIP DOSSIER'
                  }
                </h4>
                <div 
                  className="text-xs font-sans uppercase tracking-widest mt-0.5"
                  style={{ color: '#fecaca' }}
                >
                  Archived & Accredited by Sovereign Information Command
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 font-sans text-xs">
                <div 
                  className="p-2.5 rounded"
                  style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
                >
                  <span 
                    className="text-xs uppercase font-medium block font-bold"
                    style={{ color: '#9ca3af' }}
                  >
                    Candidate Name
                  </span>
                  <span 
                    className="font-black text-sm"
                    style={{ color: '#111827' }}
                  >
                    {selectedAppForCertificate.fullName}
                  </span>
                </div>
                <div 
                  className="p-2.5 rounded"
                  style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
                >
                  <span 
                    className="text-xs uppercase font-medium block font-bold"
                    style={{ color: '#9ca3af' }}
                  >
                    Category
                  </span>
                  <span 
                    className="font-bold text-xs uppercase"
                    style={{ color: '#cc0000' }}
                  >
                    {selectedAppForCertificate.role}
                  </span>
                </div>
                <div 
                  className="p-2.5 rounded"
                  style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
                >
                  <span 
                    className="text-xs uppercase font-medium block font-bold"
                    style={{ color: '#9ca3af' }}
                  >
                    Assigned Bureau
                  </span>
                  <span 
                    className="font-medium text-xs"
                    style={{ color: '#111827' }}
                  >
                    {selectedAppForCertificate.bureau}
                  </span>
                </div>
                <div 
                  className="p-2.5 rounded"
                  style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
                >
                  <span 
                    className="text-xs uppercase font-medium block font-bold"
                    style={{ color: '#9ca3af' }}
                  >
                    Affiliation / Track
                  </span>
                  <span 
                    className="font-medium text-xs"
                    style={{ color: '#111827' }}
                  >
                    {selectedAppForCertificate.company}
                  </span>
                </div>
                <div 
                  className="p-2.5 rounded"
                  style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
                >
                  <span 
                    className="text-xs uppercase font-medium block font-bold"
                    style={{ color: '#9ca3af' }}
                  >
                    Contact Channel
                  </span>
                  <span 
                    className="font-medium text-xs"
                    style={{ color: '#111827' }}
                  >
                    {selectedAppForCertificate.email}
                  </span>
                </div>
                <div 
                  className="p-2.5 rounded"
                  style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
                >
                  <span 
                    className="text-xs uppercase font-medium block font-bold"
                    style={{ color: '#9ca3af' }}
                  >
                    National ID / Passport
                  </span>
                  <span 
                    className="font-medium text-xs"
                    style={{ color: '#111827' }}
                  >
                    {selectedAppForCertificate.passportOrIdNumber || 'Recorded on File'}
                  </span>
                </div>
              </div>

              <div 
                className="p-3 rounded text-xs italic font-bold"
                style={{ 
                  backgroundColor: '#f9fafb', 
                  border: '1px solid #e5e7eb',
                  color: '#374151'
                }}
              >
                <span 
                  className="not-italic font-medium text-xs uppercase font-bold block mb-1"
                  style={{ color: '#9ca3af' }}
                >
                  Statement Logged in Registry:
                </span>
                "{selectedAppForCertificate.bio}"
              </div>

              <div 
                className="pt-4 flex justify-between items-center text-xs font-medium uppercase"
                style={{ borderTop: '1px solid #e5e7eb', color: '#9ca3af' }}
              >
                <div>ICA SOVEREIGN ARCHIVE • ID {selectedAppForCertificate.id}</div>
                <div>AUTHENTICATED VIA SOVEREIGN GATEWAY</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
