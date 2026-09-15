// server/data/figures/types.ts
export interface HistoricalFigureData {
  slug: string;
  imageUrl: string;
  lifespan: string;
  categorySlug: 'historical-figures';
  region: 'kurdish' | 'chinese' | 'iraqi';
  translations: {
    lang: 'en' | 'ar' | 'zh' | 'ckb';
    title: string;
    excerpt: string;
    content: string;
  }[];
}
