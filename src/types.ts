export type Locale = 'en' | 'ar' | 'zh' | 'ckb';

export interface Translation {
  id: string;
  articleId: string;
  lang: string;
  title: string;
  excerpt: string;
  content: string;
  seoTitle?: string | null;
  seoDesc?: string | null;
}

export interface Article {
  id: string;
  slug: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  imageUrl: string | null;
  authorId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  translations: Translation[];
  category?: Category;
  author?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface Category {
  id: string;
  slug: string;
  name: string; // fallback
  nameEn: string;
  nameAr: string;
  nameZh: string;
}

export interface MarketData {
  id: string;
  symbol: string;
  name: string;
  nameZh?: string;
  nameAr?: string;
  category?: 'INDEX' | 'CHINA_STOCK' | 'HK_STOCK' | 'COMMODITY' | 'FOREX' | string;
  price: number;
  change: number;
  changePercent: number;
  volume?: string;
  high?: number;
  low?: number;
  open?: number;
  currency?: string;
  marketCap?: string;
  peRatio?: number;
  updatedAt: string;
}

export interface Study {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  titleZh: string;
  titleCkb: string;
  excerptEn: string;
  excerptAr: string;
  excerptZh: string;
  excerptCkb: string;
  contentEn: string;
  contentAr: string;
  contentZh: string;
  contentCkb: string;
  imageUrl: string | null;
  isPrivate: boolean;
  authorId: string;
  author?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  titleZh: string;
  titleCkb: string;
  authorEn: string;
  authorAr: string;
  authorZh: string;
  authorCkb: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionZh: string;
  descriptionCkb: string;
  coverUrl: string;
  category: 'HISTORY' | 'GEOPOLITICS' | 'ECONOMY' | 'CULTURE' | 'MEMOIR' | 'LITERATURE' | string;
  region: 'CHINA' | 'IRAQ' | 'KURDISTAN' | 'SINO_ARAB' | string;
  rating: number;
  pages: number;
  year: number;
  publisher: string;
  isbn?: string | null;
  purchaseUrl?: string | null;
  isTrending: boolean;
  isFeatured: boolean;
  downloads?: number;
  createdAt: string;
  updatedAt: string;
}

export interface TourismSpot {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  titleZh: string;
  titleCkb: string;
  city: string;
  region: 'CHINA' | 'IRAQ' | 'KURDISTAN' | string;
  category: 'UNESCO_HERITAGE' | 'ANCIENT_SILK_ROAD' | 'NATURE_ADVENTURE' | 'GASTRONOMY' | 'CULTURAL_EXCHANGE' | 'MODERN_WONDER' | string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionZh: string;
  descriptionCkb: string;
  imageUrl: string;
  galleryUrls?: string;
  bestTimeToVisit: string;
  visaPolicy: string;
  flightInfo: string;
  rating: number;
  estimatedCost: string;
  isFeatured: boolean;
  isTrending: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WomenProfile {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  nameZh: string;
  nameCkb: string;
  titleEn: string;
  titleAr: string;
  titleZh: string;
  titleCkb: string;
  region: 'CHINA' | 'IRAQ' | 'KURDISTAN' | 'BILATERAL' | string;
  category: 'PROMINENT_FIGURE' | 'POLICY_RIGHTS' | 'ACHIEVEMENTS' | 'PUBLICATIONS' | string;
  summaryEn: string;
  summaryAr: string;
  summaryZh: string;
  summaryCkb: string;
  bioEn: string;
  bioAr: string;
  bioZh: string;
  bioCkb: string;
  imageUrl: string;
  organization: string;
  publicationUrl?: string | null;
  isFeatured: boolean;
  isTrending: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VisaFlightRecord {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  titleZh: string;
  titleCkb: string;
  serviceType: 'VISA_ASSISTANCE' | 'FLIGHT_ROUTE' | 'PASSPORT_DIPLOMATIC' | 'TRAVEL_PUBLICATION' | 'CONSULAR_GUIDE' | 'CARGO_LOGISTICS' | string;
  originRegion: 'CHINA' | 'IRAQ' | 'KURDISTAN' | 'BILATERAL' | string;
  destinationRegion: 'CHINA' | 'IRAQ' | 'KURDISTAN' | 'BILATERAL' | string;
  summaryEn: string;
  summaryAr: string;
  summaryZh: string;
  summaryCkb: string;
  detailsEn: string;
  detailsAr: string;
  detailsZh: string;
  detailsCkb: string;
  airlineOrAuthority: string;
  processingTime: string;
  feeOrCost: string;
  imageUrl: string;
  officialLink?: string | null;
  isFeatured: boolean;
  isTrending: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VisaFlightInquiry {
  id: string;
  ticketId: string;
  fullName: string;
  email: string;
  passportNumber: string;
  nationality?: string;
  origin: string;
  destination: string;
  travelDate?: string | null;
  serviceType: string;
  notes?: string | null;
  status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'CONTACTED' | 'ARCHIVED';
  priority: 'STANDARD' | 'EXPEDITED' | 'DIPLOMATIC';
  contactPhone?: string | null;
  assignedOfficer?: string | null;
  adminNotes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface VisaFlightStats {
  totalRecords: number;
  totalRoutes: number;
  totalVisas: number;
  totalDiplomatic: number;
  totalPublications: number;
  totalFeatured: number;
  totalTrending: number;
  totalInquiries: number;
  pendingInquiries: number;
  approvedInquiries: number;
}

export interface PaymentExchangeRate {
  id: string;
  pair: string;
  baseRate: number;
  bidRate: number;
  askRate: number;
  retailFeePercent: number;
  businessFeePercent: number;
  minimumRetailIqd: number;
  minimumBusinessIqd: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: string;
  ecnyReservePool: number;
  iqdReservePool: number;
  mbridgeStatus: string;
  cipsGatewayStatus: string;
  cbiClearingStatus: string;
  lastUpdatedBy?: string;
  updatedAt: string;
  trendHistory?: Array<{ time: string; rate: number; volume: number }>;
  inverseRate?: number;
  lastSyncTimestamp?: string;
}

export interface PaymentOrder {
  id: string;
  reference: string;
  orderType: 'RETAIL' | 'BUSINESS';
  direction: 'IQD_TO_ECNY' | 'ECNY_TO_IQD';
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: number;
  targetAmount: number;
  exchangeRate: number;
  feeAmount: number;
  feePercent: number;
  status: 'PENDING_SETTLEMENT' | 'PROCESSING' | 'COMPLETED' | 'COMPLIANCE_HOLD' | 'REJECTED';
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  senderIdNumber?: string;
  senderEntity?: string;
  senderCompany?: string;
  recipientName: string;
  recipientIdentifier: string;
  recipientEntity?: string;
  recipientBankOrBureau?: string;
  purpose: string;
  settlementMethod: string;
  commercialInvoiceRef?: string;
  billOfLading?: string;
  customsDeclarationNo?: string;
  contractValueUsd?: number;
  taxRegistrationNumber?: string;
  settlementTxHash?: string;
  verificationCode?: string;
  qrPayload?: string;
  complianceNotes?: string;
  adminNotes?: string;
  rejectionReason?: string;
  settledAt?: string | null;
  createdAt: string;
  updatedAt: string;
  timeline?: Array<{
    stage: string;
    title: string;
    timestamp: string | null;
    completed: boolean;
    details: string;
  }>;
}

export interface PaymentQuote {
  direction: string;
  orderType: string;
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: number;
  effectiveRate: number;
  feePercent: number;
  feeAmount: number;
  targetAmount: number;
  quoteExpiresInSeconds: number;
  quoteHash: string;
  comparison: {
    legacyBankFeePercent: number;
    legacyEstimatedDays: number;
    cbdcEstimatedHours: number;
    feeSavedEstimated: number;
    mbridgeEnabled: boolean;
  };
}






