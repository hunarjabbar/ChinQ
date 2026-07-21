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
  serviceType: 'VISA_ASSISTANCE' | 'FLIGHT_ROUTE' | 'PASSPORT_DIPLOMATIC' | 'TRAVEL_PUBLICATION' | 'CONSULAR_GUIDE' | string;
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




