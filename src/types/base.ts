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
