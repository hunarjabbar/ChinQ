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
