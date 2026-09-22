import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  VisaCategory,
  VisaService,
  VisaApplication,
  VisaApplicant,
  VisaDocument,
  VisaAppointment,
  VisaFee,
  VisaRequirement,
  VisaAnnouncement,
  VisaFaq,
  VisaCentreSettings,
  VisaAuditLogEntry,
  VisaApplicationStatus
} from '../types/visaCentre';
import {
  INITIAL_VISA_CATEGORIES,
  INITIAL_VISA_SERVICES,
  INITIAL_VISA_ANNOUNCEMENTS,
  INITIAL_VISA_FAQS,
  INITIAL_VISA_SETTINGS
} from '../data/visaCentreData';

interface VisaCentreState {
  visaCategories: VisaCategory[];
  services: VisaService[];
  applications: VisaApplication[];
  applicants: VisaApplicant[];
  documents: VisaDocument[];
  appointments: VisaAppointment[];
  fees: VisaFee[];
  requirements: VisaRequirement[];
  announcements: VisaAnnouncement[];
  faqs: VisaFaq[];
  settings: VisaCentreSettings;
  auditLogs: VisaAuditLogEntry[];

  // Visa Category Actions
  createVisaCategory: (item: Omit<VisaCategory, 'id' | 'lastVerifiedAt'>, actor?: { id: string; email: string }) => VisaCategory;
  updateVisaCategory: (id: string, updates: Partial<VisaCategory>, actor?: { id: string; email: string }) => void;
  deleteVisaCategory: (id: string, actor?: { id: string; email: string }) => void;
  softDeleteVisaCategory: (id: string, actor?: { id: string; email: string }) => void;
  restoreVisaCategory: (id: string, actor?: { id: string; email: string }) => void;
  permanentDeleteVisaCategory: (id: string, actor?: { id: string; email: string }) => void;

  // Service Actions
  createService: (item: Omit<VisaService, 'id'>, actor?: { id: string; email: string }) => VisaService;
  updateService: (id: string, updates: Partial<VisaService>, actor?: { id: string; email: string }) => void;
  deleteService: (id: string, actor?: { id: string; email: string }) => void;
  softDeleteService: (id: string, actor?: { id: string; email: string }) => void;
  restoreService: (id: string, actor?: { id: string; email: string }) => void;
  permanentDeleteService: (id: string, actor?: { id: string; email: string }) => void;

  // Application & Applicant Actions
  submitApplication: (params: {
    direction: 'iraq-to-china' | 'china-to-iraq';
    visaCategory: string;
    servicePackage: string;
    applicant: {
      givenName: string;
      surname: string;
      nationality: string;
      dateOfBirth: string;
      passportNumber: string;
      passportExpiry: string;
      email: string;
      phone: string;
      companyName?: string;
    };
    travelDetails: {
      travelPurpose: string;
      intendedTravelDate?: string;
    };
  }) => VisaApplication;

  submitServiceRequest: (params: {
    fullName: string;
    nationality: string;
    dateOfBirth: string;
    gender: string;
    passportNumber: string;
    passportExpiry: string;
    email: string;
    phone: string;
    address: string;
    direction: 'iraq-to-china' | 'china-to-iraq';
    visaCategory: string;
    servicesRequested: string[];
    travelPurpose: string;
    intendedTravelDate?: string;
    travelerCount: number;
    preferredLocale: 'en' | 'ar' | 'zh' | 'ckb';
  }) => { referenceId: string; applicationId: string; applicantId: string };

  updateApplicationStatus: (id: string, status: VisaApplicationStatus, note: string, actor?: { id: string; email: string }) => void;
  assignApplication: (id: string, assignedTo: string, actor?: { id: string; email: string }) => void;
  updateApplicationNotes: (id: string, internalNotes: string, publicNotes: string, actor?: { id: string; email: string }) => void;
  softDeleteApplication: (id: string, actor?: { id: string; email: string }) => void;
  restoreApplication: (id: string, actor?: { id: string; email: string }) => void;

  // PII Privacy Actions
  getMaskedPassport: (passportNumber: string) => string;
  getUnmaskedPassport: (applicationId: string, operatorId: string) => string | null;
  getApplicantById: (applicantId: string) => VisaApplicant | undefined;
  revealApplicantPii: (applicantId: string, actor?: { id: string; email: string }) => VisaApplicant | null;

  // Appointment Actions
  bookAppointment: (params: {
    applicationId?: string;
    applicantName: string;
    applicantPhone: string;
    applicantEmail?: string;
    location: 'chinese-consulate-erbil' | 'iraqi-embassy-beijing' | 'other';
    date: string;
    time: string;
    type: 'submission' | 'biometrics' | 'interview' | 'collection';
    notes?: string;
  }) => VisaAppointment;
  updateAppointment: (id: string, updates: Partial<VisaAppointment>, actor?: { id: string; email: string }) => void;
  cancelAppointment: (id: string, reason?: string, actor?: { id: string; email: string }) => void;

  // Document Actions
  addDocument: (doc: Omit<VisaDocument, 'id' | 'uploadedAt'>) => VisaDocument;
  updateDocumentStatus: (id: string, status: VisaDocument['status'], reviewNotes?: string, actor?: { id: string; email: string }) => void;

  // Announcement Actions
  createAnnouncement: (item: Omit<VisaAnnouncement, 'id' | 'createdAt' | 'updatedAt'>, actor?: { id: string; email: string }) => VisaAnnouncement;
  updateAnnouncement: (id: string, updates: Partial<VisaAnnouncement>, actor?: { id: string; email: string }) => void;
  deleteAnnouncement: (id: string, actor?: { id: string; email: string }) => void;

  // FAQ Actions
  createFaq: (item: Omit<VisaFaq, 'id'>, actor?: { id: string; email: string }) => VisaFaq;
  updateFaq: (id: string, updates: Partial<VisaFaq>, actor?: { id: string; email: string }) => void;
  deleteFaq: (id: string, actor?: { id: string; email: string }) => void;

  // Settings Actions
  updateSettings: (settings: Partial<VisaCentreSettings>, actor?: { id: string; email: string }) => void;

  // Public Tracker query
  trackApplication: (referenceId: string, lastNameOrEmail: string) => {
    found: boolean;
    error?: string;
    application?: {
      referenceId: string;
      direction: string;
      visaCategory: string;
      status: VisaApplicationStatus;
      publicNotes: string;
      statusHistory: Array<{ status: string; timestamp: string; note: string }>;
      createdAt: string;
      updatedAt: string;
      appointment?: {
        date: string;
        time: string;
        location: string;
        status: string;
        confirmationNumber: string;
      } | null;
    };
  };

  // Log Audit
  recordAuditLog: (entry: Omit<VisaAuditLogEntry, 'id' | 'timestamp'>) => void;
}

// Initial Sample Applications & Applicants for testing & immediate live preview
const INITIAL_APPLICANTS: VisaApplicant[] = [
  {
    id: 'app-user-1',
    fullName: 'Ahmed Tariq Al-Bayati',
    nationality: 'Iraqi',
    dateOfBirth: '1985-04-12',
    gender: 'Male',
    passportNumber: 'A12849503',
    passportExpiry: '2030-05-18',
    email: 'ahmed.bayati@cises-demo.iq',
    phone: '+964 750 445 1199',
    address: 'Erbil, Kurdistan Region, Iraq',
    employerOrInstitution: 'Al-Bayati Petrochemical Equipment Trading',
    preferredLocale: 'ar',
    consentToProcess: true,
    createdAt: '2026-09-10T11:00:00Z',
    updatedAt: '2026-09-10T11:00:00Z',
    deletedAt: null
  },
  {
    id: 'app-user-2',
    fullName: 'Zhang Wei',
    nationality: 'Chinese',
    dateOfBirth: '1989-11-23',
    gender: 'Male',
    passportNumber: 'E98412034',
    passportExpiry: '2031-08-14',
    email: 'zhang.wei@sinoroads-erbil.cn',
    phone: '+86 138 0011 2233',
    address: 'Chaoyang District, Beijing, China',
    employerOrInstitution: 'China Railway Construction Bureau 14',
    preferredLocale: 'zh',
    consentToProcess: true,
    createdAt: '2026-09-12T09:30:00Z',
    updatedAt: '2026-09-12T09:30:00Z',
    deletedAt: null
  }
];

const INITIAL_APPLICATIONS: VisaApplication[] = [
  {
    id: 'va-rec-1',
    referenceId: 'VC-2026-481920',
    applicantId: 'app-user-1',
    direction: 'iraq-to-china',
    visaCategory: 'M',
    servicesRequested: ['business-visa-advisory'],
    status: 'in-review',
    statusHistory: [
      {
        status: 'received',
        timestamp: '2026-09-10T11:05:00Z',
        note: 'Service request and dossier submitted online.'
      },
      {
        status: 'in-review',
        timestamp: '2026-09-11T09:00:00Z',
        note: 'Dossier undergoing compliance audit against Consulate General in Erbil guidelines.'
      }
    ],
    assignedTo: 'Lead Consular Specialist',
    documents: ['doc-1', 'doc-2'],
    internalNotes: 'Invitation letter from Ningbo Machinery Group verified. Waiting on chamber stamp validation.',
    publicNotes: 'Your commercial invitation letter has been reviewed and verified. Next step: finalizing the COVA online form.',
    fees: [
      { label: 'Consultation & Pre-Audit Fee', amount: 65, currency: 'USD', status: 'paid' }
    ],
    travelPurpose: 'Canton Fair 2026 attendance and Ningbo manufacturing machinery procurement',
    intendedTravelDate: '2026-10-15',
    travelerCount: 1,
    createdAt: '2026-09-10T11:05:00Z',
    updatedAt: '2026-09-11T09:00:00Z',
    deletedAt: null
  },
  {
    id: 'va-rec-2',
    referenceId: 'VC-2026-729410',
    applicantId: 'app-user-2',
    direction: 'china-to-iraq',
    visaCategory: 'Commercial',
    servicesRequested: ['business-visa-advisory', 'high-level-delegation-facilitation'],
    status: 'approved',
    statusHistory: [
      {
        status: 'received',
        timestamp: '2026-09-12T09:35:00Z',
        note: 'Application for Iraqi entry approval received.'
      },
      {
        status: 'submitted',
        timestamp: '2026-09-14T14:00:00Z',
        note: 'Submitted to Iraqi diplomatic mission and security clearance channel.'
      },
      {
        status: 'approved',
        timestamp: '2026-09-18T10:15:00Z',
        note: 'Iraqi MOI entry clearance barcode issued. Visa on arrival clearance authorized.'
      }
    ],
    assignedTo: 'Bilateral Relations Advisor',
    documents: [],
    internalNotes: 'Security clearance issued by Erbil Interior Department. Official arrival protocol confirmed.',
    publicNotes: 'Official entry approval letter has been issued. Please download your clearance letter and print 2 copies for airport boarding.',
    fees: [
      { label: 'Entry Clearance & Dossier Facilitation', amount: 85, currency: 'USD', status: 'paid' }
    ],
    travelPurpose: 'Erbil Highway Construction Technical Inspection & Project Oversight',
    intendedTravelDate: '2026-10-02',
    travelerCount: 3,
    createdAt: '2026-09-12T09:35:00Z',
    updatedAt: '2026-09-18T10:15:00Z',
    deletedAt: null
  }
];

export const useVisaCentreStore = create<VisaCentreState>()(
  persist(
    (set, get) => ({
      visaCategories: INITIAL_VISA_CATEGORIES,
      services: INITIAL_VISA_SERVICES,
      applications: INITIAL_APPLICATIONS,
      applicants: INITIAL_APPLICANTS,
      documents: [],
      appointments: [],
      fees: [],
      requirements: [],
      announcements: INITIAL_VISA_ANNOUNCEMENTS,
      faqs: INITIAL_VISA_FAQS,
      settings: INITIAL_VISA_SETTINGS,
      auditLogs: [],

      // Visa Category CRUD
      createVisaCategory: (item, actor) => {
        const newCategory: VisaCategory = {
          ...item,
          id: `vc-${Date.now()}`,
          lastVerifiedAt: new Date().toISOString(),
          deletedAt: null
        };
        set((state) => ({
          visaCategories: [newCategory, ...state.visaCategories]
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'CREATE',
          entityType: 'VisaCategory',
          entityId: newCategory.id,
          diff: JSON.stringify({ category: newCategory.category, name: newCategory.officialName.en })
        });
        return newCategory;
      },

      updateVisaCategory: (id, updates, actor) => {
        set((state) => ({
          visaCategories: state.visaCategories.map((cat) =>
            cat.id === id ? { ...cat, ...updates, lastVerifiedAt: new Date().toISOString() } : cat
          )
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'UPDATE',
          entityType: 'VisaCategory',
          entityId: id,
          diff: JSON.stringify(updates)
        });
      },

      deleteVisaCategory: (id, actor) => {
        set((state) => ({
          visaCategories: state.visaCategories.map((cat) =>
            cat.id === id ? { ...cat, deletedAt: new Date().toISOString() } : cat
          )
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'SOFT_DELETE',
          entityType: 'VisaCategory',
          entityId: id
        });
      },

      softDeleteVisaCategory: (id, actor) => {
        get().deleteVisaCategory(id, actor);
      },

      restoreVisaCategory: (id, actor) => {
        set((state) => ({
          visaCategories: state.visaCategories.map((cat) =>
            cat.id === id ? { ...cat, deletedAt: null } : cat
          )
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'RESTORE',
          entityType: 'VisaCategory',
          entityId: id
        });
      },

      permanentDeleteVisaCategory: (id, actor) => {
        set((state) => ({
          visaCategories: state.visaCategories.filter((cat) => cat.id !== id)
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'PERMANENT_DELETE',
          entityType: 'VisaCategory',
          entityId: id
        });
      },

      // Services CRUD
      createService: (item, actor) => {
        const newService: VisaService = {
          ...item,
          id: `vs-${Date.now()}`,
          deletedAt: null
        };
        set((state) => ({
          services: [...state.services, newService]
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'CREATE',
          entityType: 'VisaService',
          entityId: newService.id,
          diff: JSON.stringify({ slug: newService.slug, title: newService.title.en })
        });
        return newService;
      },

      updateService: (id, updates, actor) => {
        set((state) => ({
          services: state.services.map((s) => (s.id === id ? { ...s, ...updates } : s))
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'UPDATE',
          entityType: 'VisaService',
          entityId: id,
          diff: JSON.stringify(updates)
        });
      },

      deleteService: (id, actor) => {
        set((state) => ({
          services: state.services.map((s) => (s.id === id ? { ...s, deletedAt: new Date().toISOString() } : s))
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'SOFT_DELETE',
          entityType: 'VisaService',
          entityId: id
        });
      },

      softDeleteService: (id, actor) => {
        get().deleteService(id, actor);
      },

      restoreService: (id, actor) => {
        set((state) => ({
          services: state.services.map((s) => (s.id === id ? { ...s, deletedAt: null } : s))
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'RESTORE',
          entityType: 'VisaService',
          entityId: id
        });
      },

      permanentDeleteService: (id, actor) => {
        set((state) => ({
          services: state.services.filter((s) => s.id !== id)
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'PERMANENT_DELETE',
          entityType: 'VisaService',
          entityId: id
        });
      },

      // Submit Service Request
      submitServiceRequest: (params) => {
        const applicantId = `app-${Date.now()}`;
        const applicationId = `va-${Date.now()}`;
        const randNum = Math.floor(100000 + Math.random() * 900000);
        const referenceId = `VC-2026-${randNum}`;

        const newApplicant: VisaApplicant = {
          id: applicantId,
          fullName: params.fullName,
          nationality: params.nationality,
          dateOfBirth: params.dateOfBirth,
          gender: params.gender,
          passportNumber: params.passportNumber,
          passportExpiry: params.passportExpiry,
          email: params.email,
          phone: params.phone,
          address: params.address,
          preferredLocale: params.preferredLocale,
          consentToProcess: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null
        };

        const newApplication: VisaApplication = {
          id: applicationId,
          referenceId,
          applicantId,
          direction: params.direction,
          visaCategory: params.visaCategory,
          servicesRequested: params.servicesRequested,
          status: 'received',
          statusHistory: [
            {
              status: 'received',
              timestamp: new Date().toISOString(),
              note: 'Application received and registered into bilateral tracking queue.'
            }
          ],
          documents: [],
          internalNotes: 'New public submission. Pending compliance officer intake.',
          publicNotes: 'Application registered. Our consular advisors will contact you shortly.',
          fees: [
            { label: 'Initial Advisory Fee', amount: 65, currency: 'USD', status: 'pending' }
          ],
          travelPurpose: params.travelPurpose,
          intendedTravelDate: params.intendedTravelDate,
          travelerCount: params.travelerCount,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null
        };

        set((state) => ({
          applicants: [newApplicant, ...state.applicants],
          applications: [newApplication, ...state.applications]
        }));

        get().recordAuditLog({
          actorId: 'public-applicant',
          actorEmail: params.email,
          action: 'SUBMIT_SERVICE_REQUEST',
          entityType: 'VisaApplication',
          entityId: applicationId,
          diff: JSON.stringify({ referenceId, visaCategory: params.visaCategory, direction: params.direction })
        });

        return { referenceId, applicationId, applicantId };
      },

      submitApplication: (params) => {
        const res = get().submitServiceRequest({
          fullName: `${params.applicant.givenName} ${params.applicant.surname}`.trim(),
          nationality: params.applicant.nationality,
          dateOfBirth: params.applicant.dateOfBirth,
          gender: 'Not Specified',
          passportNumber: params.applicant.passportNumber,
          passportExpiry: params.applicant.passportExpiry,
          email: params.applicant.email,
          phone: params.applicant.phone,
          address: 'Erbil / Iraq',
          direction: params.direction,
          visaCategory: params.visaCategory,
          servicesRequested: [params.servicePackage],
          travelPurpose: params.travelDetails.travelPurpose,
          intendedTravelDate: params.travelDetails.intendedTravelDate,
          travelerCount: 1,
          preferredLocale: 'en'
        });

        const createdApp = get().applications.find((a) => a.id === res.applicationId);
        return createdApp!;
      },

      getMaskedPassport: (passportNumber: string) => {
        if (!passportNumber || passportNumber.length < 4) return '***';
        const clean = passportNumber.trim();
        return clean.substring(0, 2) + '****' + clean.substring(clean.length - 2);
      },

      getUnmaskedPassport: (applicationId: string, operatorId: string) => {
        const app = get().applications.find((a) => a.id === applicationId);
        if (!app) return null;
        const applicant = get().applicants.find((ap) => ap.id === app.applicantId);
        if (!applicant) return null;

        get().recordAuditLog({
          actorId: operatorId || 'ADMIN_OPERATOR',
          actorEmail: 'admin@cises-iq.org',
          action: 'UNMASK_PII_PASSPORT',
          entityType: 'VisaApplicant',
          entityId: applicant.id,
          diff: `Unmasked passport for application ${app.referenceId}`
        });

        return applicant.passportNumber;
      },

      getApplicantById: (applicantId: string) => {
        return get().applicants.find((ap) => ap.id === applicantId);
      },

      updateApplicationStatus: (id, status, note, actor) => {
        set((state) => ({
          applications: state.applications.map((app) => {
            if (app.id !== id) return app;
            const updatedHistory = [
              ...app.statusHistory,
              {
                status,
                timestamp: new Date().toISOString(),
                note,
                actorId: actor?.id || 'admin'
              }
            ];
            return {
              ...app,
              status,
              statusHistory: updatedHistory,
              publicNotes: note,
              updatedAt: new Date().toISOString()
            };
          })
        }));

        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'UPDATE_STATUS',
          entityType: 'VisaApplication',
          entityId: id,
          diff: JSON.stringify({ status, note })
        });
      },

      assignApplication: (id, assignedTo, actor) => {
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, assignedTo, updatedAt: new Date().toISOString() } : app
          )
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'ASSIGN_STAFF',
          entityType: 'VisaApplication',
          entityId: id,
          diff: JSON.stringify({ assignedTo })
        });
      },

      updateApplicationNotes: (id, internalNotes, publicNotes, actor) => {
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, internalNotes, publicNotes, updatedAt: new Date().toISOString() } : app
          )
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'UPDATE_NOTES',
          entityType: 'VisaApplication',
          entityId: id
        });
      },

      softDeleteApplication: (id, actor) => {
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, deletedAt: new Date().toISOString() } : app
          )
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'SOFT_DELETE',
          entityType: 'VisaApplication',
          entityId: id
        });
      },

      restoreApplication: (id, actor) => {
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, deletedAt: null } : app
          )
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'RESTORE',
          entityType: 'VisaApplication',
          entityId: id
        });
      },

      revealApplicantPii: (applicantId, actor) => {
        const applicant = get().applicants.find((a) => a.id === applicantId);
        if (!applicant) return null;
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'REVEAL_PII',
          entityType: 'VisaApplicant',
          entityId: applicantId,
          diff: 'Revealed passport and personal identifiers under audit supervision'
        });
        return applicant;
      },

      // Appointment Booking
      bookAppointment: (params) => {
        const appointmentId = `apt-${Date.now()}`;
        const confirmationNumber = `CN-APT-${Math.floor(100000 + Math.random() * 900000)}`;

        const newAppointment: VisaAppointment = {
          id: appointmentId,
          applicationId: params.applicationId || 'direct-booking',
          location: params.location,
          date: params.date,
          time: params.time,
          type: params.type,
          status: 'confirmed',
          confirmationNumber,
          reminderSent: true,
          notes: params.notes || 'Booked via Centre portal',
          applicantName: params.applicantName,
          applicantPhone: params.applicantPhone,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null
        };

        set((state) => ({
          appointments: [newAppointment, ...state.appointments]
        }));

        get().recordAuditLog({
          actorId: 'applicant',
          actorEmail: params.applicantEmail || 'applicant@user.org',
          action: 'BOOK_APPOINTMENT',
          entityType: 'VisaAppointment',
          entityId: appointmentId,
          diff: JSON.stringify({ date: params.date, time: params.time, location: params.location, confirmationNumber })
        });

        return newAppointment;
      },

      updateAppointment: (id, updates, actor) => {
        set((state) => ({
          appointments: state.appointments.map((a) => (a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a))
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'UPDATE_APPOINTMENT',
          entityType: 'VisaAppointment',
          entityId: id,
          diff: JSON.stringify(updates)
        });
      },

      cancelAppointment: (id, reason, actor) => {
        set((state) => ({
          appointments: state.appointments.map((a) =>
            a.id === id ? { ...a, status: 'cancelled', notes: `${a.notes} [Cancelled: ${reason || 'N/A'}]`, updatedAt: new Date().toISOString() } : a
          )
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'CANCEL_APPOINTMENT',
          entityType: 'VisaAppointment',
          entityId: id,
          diff: reason || 'Cancelled'
        });
      },

      addDocument: (doc) => {
        const newDoc: VisaDocument = {
          ...doc,
          id: `doc-${Date.now()}`,
          uploadedAt: new Date().toISOString(),
          deletedAt: null
        };
        set((state) => ({
          documents: [newDoc, ...state.documents]
        }));
        return newDoc;
      },

      updateDocumentStatus: (id, status, reviewNotes, actor) => {
        set((state) => ({
          documents: state.documents.map((d) =>
            d.id === id
              ? {
                  ...d,
                  status,
                  reviewNotes: reviewNotes || d.reviewNotes,
                  reviewedBy: actor?.id || 'consular-staff',
                  reviewedAt: new Date().toISOString()
                }
              : d
          )
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'DOCUMENT_STATUS_UPDATE',
          entityType: 'VisaDocument',
          entityId: id,
          diff: JSON.stringify({ status, reviewNotes })
        });
      },

      createAnnouncement: (item, actor) => {
        const newAnnouncement: VisaAnnouncement = {
          ...item,
          id: `va-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null
        };
        set((state) => ({
          announcements: [newAnnouncement, ...state.announcements]
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'CREATE_ANNOUNCEMENT',
          entityType: 'VisaAnnouncement',
          entityId: newAnnouncement.id
        });
        return newAnnouncement;
      },

      updateAnnouncement: (id, updates, actor) => {
        set((state) => ({
          announcements: state.announcements.map((a) => (a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a))
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'UPDATE_ANNOUNCEMENT',
          entityType: 'VisaAnnouncement',
          entityId: id,
          diff: JSON.stringify(updates)
        });
      },

      deleteAnnouncement: (id, actor) => {
        set((state) => ({
          announcements: state.announcements.map((a) => (a.id === id ? { ...a, deletedAt: new Date().toISOString() } : a))
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'SOFT_DELETE_ANNOUNCEMENT',
          entityType: 'VisaAnnouncement',
          entityId: id
        });
      },

      createFaq: (item, actor) => {
        const newFaq: VisaFaq = {
          ...item,
          id: `faq-${Date.now()}`,
          deletedAt: null
        };
        set((state) => ({
          faqs: [...state.faqs, newFaq]
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'CREATE_FAQ',
          entityType: 'VisaFaq',
          entityId: newFaq.id
        });
        return newFaq;
      },

      updateFaq: (id, updates, actor) => {
        set((state) => ({
          faqs: state.faqs.map((f) => (f.id === id ? { ...f, ...updates } : f))
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'UPDATE_FAQ',
          entityType: 'VisaFaq',
          entityId: id,
          diff: JSON.stringify(updates)
        });
      },

      deleteFaq: (id, actor) => {
        set((state) => ({
          faqs: state.faqs.map((f) => (f.id === id ? { ...f, deletedAt: new Date().toISOString() } : f))
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'SOFT_DELETE_FAQ',
          entityType: 'VisaFaq',
          entityId: id
        });
      },

      updateSettings: (settingsUpdates, actor) => {
        set((state) => ({
          settings: { ...state.settings, ...settingsUpdates }
        }));
        get().recordAuditLog({
          actorId: actor?.id || 'sys-admin',
          actorEmail: actor?.email || 'admin@cises-iq.org',
          action: 'UPDATE_SETTINGS',
          entityType: 'VisaCentreSettings',
          entityId: 'global'
        });
      },

      trackApplication: (referenceId, lastNameOrEmail) => {
        const trimmedRef = referenceId.trim().toUpperCase();
        const trimmedKey = lastNameOrEmail.trim().toLowerCase();

        const application = get().applications.find(
          (a) => a.referenceId.toUpperCase() === trimmedRef && !a.deletedAt
        );

        if (!application) {
          return { found: false, error: 'No application found with this Reference ID.' };
        }

        const applicant = get().applicants.find((ap) => ap.id === application.applicantId);
        if (!applicant) {
          return { found: false, error: 'Applicant record not accessible.' };
        }

        const emailMatch = applicant.email.toLowerCase() === trimmedKey;
        const nameParts = applicant.fullName.toLowerCase().split(' ');
        const lastName = nameParts[nameParts.length - 1];
        const nameMatch = applicant.fullName.toLowerCase().includes(trimmedKey) || lastName === trimmedKey;

        if (!emailMatch && !nameMatch) {
          return {
            found: false,
            error: 'Authentication failed. Please verify that the last name or email matches the registered application.'
          };
        }

        const apt = get().appointments.find((a) => a.applicationId === application.id && a.status !== 'cancelled');

        return {
          found: true,
          application: {
            referenceId: application.referenceId,
            direction: application.direction,
            visaCategory: application.visaCategory,
            status: application.status,
            publicNotes: application.publicNotes,
            statusHistory: application.statusHistory.map((h) => ({
              status: h.status,
              timestamp: h.timestamp,
              note: h.note
            })),
            createdAt: application.createdAt,
            updatedAt: application.updatedAt,
            appointment: apt
              ? {
                  date: apt.date,
                  time: apt.time,
                  location: apt.location,
                  status: apt.status,
                  confirmationNumber: apt.confirmationNumber
                }
              : null
          }
        };
      },

      recordAuditLog: (entry) => {
        const newLog: VisaAuditLogEntry = {
          ...entry,
          id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          timestamp: new Date().toISOString()
        };
        set((state) => ({
          auditLogs: [newLog, ...state.auditLogs.slice(0, 499)]
        }));
      }
    }),
    {
      name: 'cises_visa_centre_store_v1'
    }
  )
);
