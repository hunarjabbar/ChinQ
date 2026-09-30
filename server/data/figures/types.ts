export interface HistoricalFigureTranslation {
  lang: string;
  title: string;
  excerpt: string;
  content: string;
}

export interface HistoricalFigure {
  slug: string;
  imageUrl: string;
  lifespan: string;
  categorySlug: string;
  region: string;
  translations: HistoricalFigureTranslation[];
}
