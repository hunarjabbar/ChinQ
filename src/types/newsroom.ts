export interface LocalizedString {
  en: string;
  ar: string;
  zh: string;
  ckb: string;
}

export interface NewsroomCategory {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  displayOrder: number;
  status: 'active' | 'archived';
}

export interface NewsroomTag {
  id: string;
  slug: string;
  name: LocalizedString;
  status: 'active' | 'archived';
}

export interface NewsroomAuthor {
  id: string;
  slug: string;
  name: LocalizedString;
  title: LocalizedString;
  bio: LocalizedString;
  photo: string;
  email?: string;
  publicLinks?: {
    twitter?: string;
    linkedin?: string;
    weibo?: string;
  };
  status: 'active' | 'archived';
}

export interface NewsroomArticle {
  id: string;
  slug: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  excerpt: LocalizedString;
  body: LocalizedString;
  heroImage: {
    url: string;
    alt: LocalizedString;
    credit: string;
  };
  category: NewsroomCategory;
  tags: NewsroomTag[];
  author: NewsroomAuthor;
  publishDate: string;
  updatedDate: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  breaking: boolean;
  readTimeMinutes: number;
  languageOfOrigin: 'en' | 'ar' | 'zh' | 'ckb';
  translationStatus: {
    en: boolean;
    ar: boolean;
    zh: boolean;
    ckb: boolean;
  };
  seo: {
    title: LocalizedString;
    description: LocalizedString;
    ogImage?: string;
  };
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  fixture?: boolean;
}

export interface NewsroomFeedItem {
  id: string;
  articleRef: string;
  feedType: 'rss' | 'atom' | 'json';
  generatedAt: string;
  expiresAt: string;
}
