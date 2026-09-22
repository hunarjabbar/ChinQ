import React, { useState } from 'react';
import { useVisaCentreStore } from '../store/useVisaCentreStore';
import {
  ShieldAlert,
  FileCheck,
  Calendar,
  Users,
  Bell,
  HelpCircle,
  Eye,
  EyeOff,
  Trash2,
  RefreshCw,
  Plus,
  Edit3,
  Search,
  Lock,
  Unlock,
  Building2,
  CheckCircle2,
  XCircle,
  DollarSign
} from 'lucide-react';
import { VisaApplicationStatus, VisaCategory, VisaService } from '../types/visaCentre';

export function AdminVisaCentre() {
  const store = useVisaCentreStore();

  const [activeTab, setActiveTab] = useState<'applications' | 'categories' | 'services' | 'appointments' | 'bulletins' | 'faqs' | 'audit'>('applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSoftDeleted, setShowSoftDeleted] = useState(false);

  // Unmasked Passport PII state map
  const [unmaskedPiiMap, setUnmaskedPiiMap] = useState<Record<string, string>>({});
  const [operatorId, setOperatorId] = useState('ADMIN_OPERATOR_01');

  // Modal State for editing/creating categories
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<VisaCategory | null>(null);
  const [catForm, setCatForm] = useState({
    direction: 'iraq-to-china',
    category: 'M',
    officialNameEn: 'Commercial Trade Visa',
    officialNameAr: 'تأشيرة التجارة والأعمال',
    officialNameZh: '商业贸易签证 (M字)',
    officialNameCkb: 'ڤیزای بازرگانی',
    descriptionEn: 'Issued to those who intend to go to China for commercial and trade activities.',
    descriptionAr: 'تصدر للراغبين في السفر إلى الصين لممارسة الأنشطة التجارية والصفقات.',
    descriptionZh: '发给赴华进行商业贸易活动的人员。',
    descriptionCkb: 'بۆ ئەوانەی بە مەبەستی بازرگانی سەردانی چین دەکەن.',
    maxStayDays: 30,
    allowedEntries: 'single',
    officialFeeUSD: 30,
    processingTimeStandard: '4 Working Days',
    requirementsEn: '1. Passport valid for 6 months\n2. Official Chinese Invitation Letter\n3. Bank Statement',
    requirementsAr: '1. جواز سفر نافذ 6 أشهر\n2. خطاب دعوة تجاري رسمي\n3. كشف حساب بنكي',
    requirementsZh: '1. 6个月以上有效护照\n2. 官方中方商业邀请函\n3. 银行流水',
    requirementsCkb: '1. پاسپۆرت بە سەڵاحیەتی ٦ مانگ\n2. دەعوەتنامەی فەرمی بازرگانی'
  });

  // Modal State for Services
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<VisaService | null>(null);
  const [srvForm, setSrvForm] = useState({
    titleEn: 'Standard Commercial Dossier Review',
    titleAr: 'التدقيق المسبق للفيزا التجارية',
    titleZh: '标准商业签证材料预审',
    titleCkb: 'پێداچوونەوەی فایلی بازرگانی',
    descriptionEn: 'Pre-audit of invitations and barcode verification',
    descriptionAr: 'مراجعة الدعوات والتأكد من الأكواد',
    descriptionZh: '邀请函真实性及条形码预审',
    descriptionCkb: 'پێداچوونەوەی دەعوەتنامە و کۆدەکان',
    priceUSD: 50,
    turnaroundDays: '1-2 Days',
    featuresEn: 'Biometric scheduling, barcode audit',
    featuresAr: 'حجز المواعيد وتدقيق الأكواد',
    featuresZh: '指纹预约、条码预审',
    featuresCkb: 'دیاریکردنی مۆڵەت و کۆدەکان'
  });

  // Unmask passport handler with audit log
  const handleToggleUnmaskPii = (appId: string, encryptedVal: string) => {
    if (unmaskedPiiMap[appId]) {
      const next = { ...unmaskedPiiMap };
      delete next[appId];
      setUnmaskedPiiMap(next);
    } else {
      const unmasked = store.getUnmaskedPassport(appId, operatorId);
      if (unmasked) {
        setUnmaskedPiiMap((prev) => ({ ...prev, [appId]: unmasked }));
      }
    }
  };

  // Filtered Lists
  const filteredApps = store.applications.filter((a) => {
    if (!showSoftDeleted && a.deletedAt) return false;
    if (showSoftDeleted && !a.deletedAt) return false;
    const applicant = store.getApplicantById(a.applicantId);
    const search = searchTerm.toLowerCase();
    return (
      a.referenceId.toLowerCase().includes(search) ||
      (applicant?.fullName.toLowerCase().includes(search) ?? false) ||
      (applicant?.email.toLowerCase().includes(search) ?? false)
    );
  });

  const filteredCategories = store.visaCategories.filter((c) => {
    if (!showSoftDeleted && c.deletedAt) return false;
    if (showSoftDeleted && !c.deletedAt) return false;
    return (
      c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.officialName.en.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredServices = store.services.filter((s) => {
    if (!showSoftDeleted && s.deletedAt) return false;
    if (showSoftDeleted && !s.deletedAt) return false;
    return s.title.en.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6 text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl border border-border bg-card">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal/10 text-royal text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>CISE Command Hub</span>
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">
            Bilateral Visa Consultancy Management Portal
          </h1>
          <p className="text-xs text-muted-foreground">
            Full-CRUD administration for visa categories, services, application dossiers, appointments, and PII audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowSoftDeleted(!showSoftDeleted)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              showSoftDeleted
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                : 'bg-card border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {showSoftDeleted ? 'Viewing Trash (Soft Deleted)' : 'View Active Records'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'applications' ? 'bg-royal text-white' : 'bg-card text-muted-foreground border border-border'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Dossiers &amp; Requests ({store.applications.filter((a) => !a.deletedAt).length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'categories' ? 'bg-royal text-white' : 'bg-card text-muted-foreground border border-border'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Visa Categories ({store.visaCategories.filter((c) => !c.deletedAt).length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'services' ? 'bg-royal text-white' : 'bg-card text-muted-foreground border border-border'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Advisory Tariffs ({store.services.filter((s) => !s.deletedAt).length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('appointments')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'appointments' ? 'bg-royal text-white' : 'bg-card text-muted-foreground border border-border'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Appointments ({store.appointments.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'audit' ? 'bg-royal text-white' : 'bg-card text-muted-foreground border border-border'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>PII Access Logs ({store.auditLogs.length})</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter active table records..."
          className="w-full ps-9 pe-4 py-2 rounded-xl border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
        />
      </div>

      {/* TAB 1: APPLICATIONS */}
      {activeTab === 'applications' && (
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">
              Dossier Applications &amp; Service Requests
            </h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              <span>Operator ID for PII Unmask Logs: </span>
              <input
                type="text"
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                className="px-2 py-0.5 rounded bg-muted border border-border font-mono text-foreground"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground">
                <tr>
                  <th className="py-3 px-4 text-start">Ref ID</th>
                  <th className="py-3 px-4 text-start">Applicant Name</th>
                  <th className="py-3 px-4 text-start">Category &amp; Direction</th>
                  <th className="py-3 px-4 text-start">Passport PII (Encrypted)</th>
                  <th className="py-3 px-4 text-start">Status</th>
                  <th className="py-3 px-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredApps.map((app) => {
                  const isUnmasked = !!unmaskedPiiMap[app.id];
                  const applicant = store.getApplicantById(app.applicantId);
                  return (
                    <tr key={app.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-royal">{app.referenceId}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-foreground block">{applicant?.fullName || 'N/A'}</span>
                        <span className="text-[11px] text-muted-foreground">{applicant?.email || ''}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-foreground">{app.visaCategory}</span>
                        <span className="text-[11px] text-muted-foreground block capitalize">{app.direction.replace('-', ' ')}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono">
                        <div className="flex items-center gap-2">
                          <span>
                            {isUnmasked ? unmaskedPiiMap[app.id] : store.getMaskedPassport(applicant?.passportNumber || '')}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleToggleUnmaskPii(app.id, applicant?.passportNumber || '')}
                            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                            title="Unmask PII (Logged to Audit)"
                          >
                            {isUnmasked ? <EyeOff className="w-3.5 h-3.5 text-amber-500" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={app.status}
                          onChange={(e) => store.updateApplicationStatus(app.id, e.target.value as VisaApplicationStatus, 'Updated via Command Hub')}
                          className="px-2 py-1 rounded-lg border border-border bg-background text-[11px] font-semibold text-foreground focus:outline-none"
                        >
                          <option value="received">Received</option>
                          <option value="under-pre-audit">Under Pre-Audit</option>
                          <option value="documents-approved">Docs Approved</option>
                          <option value="consular-submitted">Consular Submitted</option>
                          <option value="ready-for-collection">Ready for Collection</option>
                          <option value="completed">Completed</option>
                          <option value="refused">Refused</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-end">
                        <div className="flex items-center justify-end gap-2">
                          {showSoftDeleted ? (
                            <button
                              type="button"
                              onClick={() => store.restoreApplication(app.id)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]"
                            >
                              Restore
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => store.softDeleteApplication(app.id)}
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10"
                              title="Soft Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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
      )}

      {/* TAB 2: CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">
              Visa Categories Registry
            </h2>
            <button
              type="button"
              onClick={() => {
                setEditingCategory(null);
                setIsCategoryModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-royal text-white font-semibold text-xs inline-flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Visa Category</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCategories.map((c) => (
              <div key={c.id} className="p-5 rounded-2xl border border-border bg-muted/20 space-y-3">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-royal/10 text-royal font-black flex items-center justify-center text-sm font-mono">
                      {c.category}
                    </span>
                    <div>
                      <span className="font-bold text-sm text-foreground block">{c.officialName.en}</span>
                      <span className="text-[11px] text-muted-foreground capitalize">{c.direction.replace('-', ' ')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {showSoftDeleted ? (
                      <button
                        type="button"
                        onClick={() => store.restoreVisaCategory(c.id)}
                        className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 text-[11px] font-semibold"
                      >
                        Restore
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => store.softDeleteVisaCategory(c.id)}
                        className="p-1 text-rose-500 hover:bg-rose-500/10 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2">{c.shortDescription.en}</p>

                <div className="flex items-center justify-between text-xs font-mono font-semibold pt-1">
                  <span>Category: {c.category}</span>
                  <span>Max Stay: {c.maxStayDays} Days</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SERVICES */}
      {activeTab === 'services' && (
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">
              Institute Advisory &amp; Facilitation Tariffs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredServices.map((s) => (
              <div key={s.id} className="p-5 rounded-2xl border border-border bg-muted/20 space-y-3">
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <span className="font-bold text-sm text-foreground">{s.title.en}</span>
                  {showSoftDeleted ? (
                    <button
                      type="button"
                      onClick={() => store.restoreService(s.id)}
                      className="text-[11px] text-emerald-600 font-semibold"
                    >
                      Restore
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => store.softDeleteService(s.id)}
                      className="text-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <div className="font-mono text-lg font-bold text-royal">${s.priceUSD} USD</div>
                <p className="text-xs text-muted-foreground line-clamp-2">{s.description.en}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: APPOINTMENTS */}
      {activeTab === 'appointments' && (
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4">
          <h2 className="text-base font-bold text-foreground">Scheduled Appointments Queue</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground">
                <tr>
                  <th className="py-3 px-4 text-start">Confirmation</th>
                  <th className="py-3 px-4 text-start">Applicant Name</th>
                  <th className="py-3 px-4 text-start">Type &amp; Date</th>
                  <th className="py-3 px-4 text-start">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {store.appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-muted/30">
                    <td className="py-3.5 px-4 font-mono font-bold text-royal">{apt.confirmationNumber}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-foreground block">{apt.applicantName || 'N/A'}</span>
                      <span className="text-[11px] text-muted-foreground">{apt.applicantPhone || ''}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-foreground block capitalize">{apt.type.replace('-', ' ')}</span>
                      <span className="text-[11px] text-muted-foreground">{apt.date} @ {apt.time}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600">
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">
              PII Access &amp; Compliance Audit Logs
            </h2>
            <span className="text-xs text-muted-foreground">Immutable operator access history</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground">
                <tr>
                  <th className="py-3 px-4 text-start">Timestamp</th>
                  <th className="py-3 px-4 text-start">Actor ID</th>
                  <th className="py-3 px-4 text-start">Action</th>
                  <th className="py-3 px-4 text-start">Entity</th>
                  <th className="py-3 px-4 text-start">Diff / Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {store.auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-muted/30">
                    <td className="py-3 px-4 font-mono text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="py-3 px-4 font-bold text-foreground">{log.actorId} ({log.actorEmail})</td>
                    <td className="py-3 px-4 font-mono text-royal font-semibold uppercase">{log.action}</td>
                    <td className="py-3 px-4 font-mono text-muted-foreground">{log.entityType}:{log.entityId}</td>
                    <td className="py-3 px-4 text-muted-foreground">{log.diff || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
