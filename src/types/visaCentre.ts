import { Locale } from '../types';

export type VisaDirection = 'iraq-to-china' | 'china-to-iraq' | 'both';

export type VisaCategoryStatus = 'published' | 'archived';

export interface LocalizedString {
  en: string;
  ar: string;
  zh: string;
  ckb: string;
}

export interface LocalizedStringArray {
  en: string[];
  ar: string[];
  zh: string[];
  ckb: string[];
}

export interface VisaCategory {
  id: string;
  slug: string;
  direction: 'iraq-to-china' | 'china-to-iraq';
  category: string; // e.g. "M", "F", "L", "Z"
  officialName: LocalizedString;
  shortDescription: LocalizedString;
  whoItIsFor: LocalizedString;
  validityOptions: string[];
  maxStayDays: number;
  processingTimeStandard: string;
  processingTimeExpress: string;
  governmentFeeNote: LocalizedString;
  centerServiceFee: LocalizedString;
  requirements: string[];
  processSteps: LocalizedStringArray;
  authoritativeSourceUrl: string;
  lastVerifiedAt: string;
  status: VisaCategoryStatus;
  deletedAt?: string | null;
}

export type VisaServiceCategory = 
  | 'consultation'
  | 'documentation'
  | 'appointment-booking'
  | 'expedited'
  | 'delegation-facilitation'
  | 'document-translation'
  | 'document-authentication'
  | 'invitation-letter'
  | 'corporate-account';

export type VisaCtaType = 'request-service' | 'book-appointment' | 'contact';

export interface VisaService {
  id: string;
  slug: string;
  title: LocalizedString;
  category: VisaServiceCategory;
  direction: VisaDirection;
  description: LocalizedString;
  whoItIsFor: LocalizedString;
  deliverables: LocalizedStringArray;
  timeline: LocalizedString;
  priceIQD: number;
  priceUSD: number;
  requirements: string[];
  faqs: string[];
  ctaType: VisaCtaType;
  displayOrder: number;
  status: 'published' | 'archived';
  deletedAt?: string | null;
}

export type VisaApplicationStatus = 
  | 'received'
  | 'in-review'
  | 'awaiting-documents'
  | 'submitted'
  | 'appointment-booked'
  | 'decision-pending'
  | 'approved'
  | 'refused'
  | 'closed'
  | 'cancelled';

export interface StatusHistoryItem {
  status: VisaApplicationStatus;
  timestamp: string;
  note: string;
  actorId?: string;
}

export interface ApplicationFee {
  label: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'waived';
}

export interface VisaApplication {
  id: string;
  referenceId: string; // VC-YYYY-NNNNNN
  applicantId: string;
  direction: 'iraq-to-china' | 'china-to-iraq';
  visaCategory: string;
  servicesRequested: string[];
  status: VisaApplicationStatus;
  statusHistory: StatusHistoryItem[];
  assignedTo?: string;
  documents: string[];
  appointmentId?: string;
  internalNotes: string;
  publicNotes: string;
  fees: ApplicationFee[];
  travelPurpose: string;
  intendedTravelDate?: string;
  travelerCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface VisaApplicant {
  id: string;
  fullName: string;
  preferredName?: string;
  nationality: string;
  dateOfBirth: string; // masked in UI unless revealed
  gender: string;
  passportNumber: string; // encrypted/masked
  passportExpiry: string;
  email: string;
  phone: string;
  address: string;
  employerOrInstitution?: string;
  preferredLocale: Locale;
  consentToProcess: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export type VisaDocumentType = 
  | 'passport-scan'
  | 'photo'
  | 'invitation-letter'
  | 'bank-statement'
  | 'employment-letter'
  | 'hotel-booking'
  | 'flight-booking'
  | 'itinerary'
  | 'insurance'
  | 'business-license'
  | 'tax-registration'
  | 'travel-history'
  | 'previous-visa'
  | 'other';

export type VisaDocumentStatus = 'requested' | 'uploaded' | 'under-review' | 'approved' | 'rejected' | 'expired';

export interface VisaDocument {
  id: string;
  applicationId: string;
  documentType: VisaDocumentType;
  fileName?: string;
  fileSize?: number;
  fileUrl?: string;
  status: VisaDocumentStatus;
  reviewNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  expiryDate?: string;
  uploadedAt: string;
  deletedAt?: string | null;
}

export type VisaAppointmentLocation = 'chinese-consulate-erbil' | 'iraqi-embassy-beijing' | 'other';
export type VisaAppointmentType = 'submission' | 'biometrics' | 'interview' | 'collection';
export type VisaAppointmentStatus = 'scheduled' | 'confirmed' | 'attended' | 'no-show' | 'cancelled' | 'rescheduled';

export interface VisaAppointment {
  id: string;
  applicationId: string;
  location: VisaAppointmentLocation;
  date: string;
  time: string;
  type: VisaAppointmentType;
  status: VisaAppointmentStatus;
  confirmationNumber: string;
  reminderSent: boolean;
  notes: string;
  applicantName?: string;
  applicantPhone?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface VisaFee {
  id: string;
  direction: 'iraq-to-china' | 'china-to-iraq';
  visaCategory: string;
  nationalityApplicable: string[];
  entries: 'single' | 'double' | 'multiple';
  validityOption: string;
  governmentFee: {
    amount: number;
    currency: string;
    sourceUrl: string;
    effectiveFrom: string;
    effectiveTo?: string;
  };
  centerServiceFee: {
    amount: number;
    currency: string;
  };
  expediteFee?: {
    amount: number;
    currency: string;
  };
  status: 'active' | 'superseded' | 'archived';
  lastVerifiedAt: string;
  deletedAt?: string | null;
}

export interface VisaRequirement {
  id: string;
  applicableTo: {
    direction: string;
    visaCategory: string;
    applicantType: string;
  };
  documentType: VisaDocumentType;
  description: LocalizedString;
  mandatory: boolean;
  format: string;
  notes: LocalizedString;
  lastVerifiedAt: string;
  deletedAt?: string | null;
}

export type VisaAnnouncementCategory = 'fee-change' | 'policy-update' | 'holiday-closure' | 'processing-delay' | 'general';

export interface VisaAnnouncement {
  id: string;
  title: LocalizedString;
  body: LocalizedString;
  category: VisaAnnouncementCategory;
  effectiveDate: string;
  sourceUrl?: string;
  status: 'draft' | 'published' | 'archived';
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export type VisaFaqCategory = 'eligibility' | 'documents' | 'fees' | 'timeline' | 'appointment' | 'refusal' | 'general';

export interface VisaFaq {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
  direction: VisaDirection;
  category: VisaFaqCategory;
  displayOrder: number;
  status: 'published' | 'draft';
  deletedAt?: string | null;
}

export interface VisaCentreSettings {
  erbilConsulateAddress: string;
  beijingEmbassyAddress: string;
  workingHoursEn: string;
  workingHoursAr: string;
  workingHoursZh: string;
  workingHoursCkb: string;
  contactEmail: string;
  contactPhone: string;
  hotlineEmergency: string;
  defaultConsultationFeeIQD: number;
  defaultConsultationFeeUSD: number;
  notificationEmailEnabled: boolean;
  notificationSmsEnabled: boolean;
}

export interface VisaAuditLogEntry {
  id: string;
  actorId: string;
  actorEmail: string;
  action: string;
  entityType: string;
  entityId: string;
  diff?: string;
  timestamp: string;
}
