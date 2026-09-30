export type PortalLocale = 'en' | 'ar' | 'zh' | 'ckb' | 'ck';

export type PortalScope = 'public' | 'secretariat' | 'newsroom' | 'live';

export type UserRole = 'viewer' | 'translator' | 'editor' | 'reviewer' | 'admin' | 'superadmin';

export interface LocalizedString {
  en: string;
  ar: string;
  zh: string;
  ckb: string;
  ck?: string;
  [key: string]: string | undefined;
}

// -------------------------------------------------------------
// PORTAL 1: ICA PUBLIC PORTAL MODELS
// -------------------------------------------------------------
export interface PublicHeroStory {
  id: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  category: LocalizedString;
  imageUrl: string;
  href: string;
  readTime: string;
  publishDate: string;
  tag: string;
}

export interface PublicWorldStory {
  id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  category: LocalizedString;
  region: string;
  imageUrl: string;
  publishDate: string;
  readTime: string;
  views: number;
}

export interface PublicTrendingItem {
  id: string;
  rank: number;
  slug: string;
  title: LocalizedString;
  category: LocalizedString;
  views: number;
  shares: number;
  trendDirection: 'up' | 'stable' | 'hot';
  publishDate: string;
}

export interface PublicInitiative {
  id: string;
  slug: string;
  title: LocalizedString;
  shortDesc: LocalizedString;
  fullDesc: LocalizedString;
  pillar: string;
  iconName: string;
  imageUrl: string;
  kpis: Array<{ metric: string; label: LocalizedString }>;
  status: 'active' | 'expanding' | 'strategic';
  targetAudience: LocalizedString;
}

export interface PublicFeaturedItem {
  id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  author: LocalizedString;
  category: LocalizedString;
  imageUrl: string;
  publishDate: string;
  editorNote?: LocalizedString;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  locale: string;
  bureauInterest?: string;
  status: 'active' | 'unsubscribed';
}

// -------------------------------------------------------------
// PORTAL 2: SECRETARIAT COMMAND HUB MODELS
// -------------------------------------------------------------
export interface SecretariatContentItem {
  id: string;
  slug: string;
  title: LocalizedString;
  type: 'story' | 'dispatch' | 'initiative' | 'bulletin';
  portalTarget: 'public' | 'secretariat' | 'newsroom' | 'live';
  status: 'published' | 'draft' | 'archived';
  author: string;
  updatedAt: string;
  summary: LocalizedString;
  tags: string[];
}

export interface SecretariatFormSubmission {
  id: string;
  name: string;
  organization: string;
  email: string;
  subject: string;
  department: 'diplomatic' | 'consular' | 'investment' | 'press' | 'general';
  message: string;
  status: 'received' | 'in_review' | 'actioned' | 'resolved';
  submittedAt: string;
  assignedDesk: string;
}

// -------------------------------------------------------------
// PORTAL 3: ICA NEWSROOM MODELS
// -------------------------------------------------------------
export interface NewsroomCategory {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  articleCount: number;
}

export interface NewsroomAuthor {
  id: string;
  slug: string;
  name: string;
  title: LocalizedString;
  bureau: LocalizedString;
  avatar: string;
  bio: LocalizedString;
  credentials: string;
}

export interface NewsroomArticle {
  id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString;
  category: string;
  tags: string[];
  author: NewsroomAuthor;
  imageUrl: string;
  publishDate: string;
  readingTimeMinutes: number;
  isFeatured: boolean;
  isBreaking: boolean;
  isEditorPick: boolean;
  views: number;
  status: 'published' | 'draft' | 'archived';
  relatedSlugs: string[];
}

// -------------------------------------------------------------
// PORTAL 4: LIVE PORTAL (MEDIA HUB) MODELS
// -------------------------------------------------------------
export interface LiveStreamSession {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  streamUrl: string;
  viewerCount: number;
  status: 'live' | 'upcoming' | 'ended';
  streamHealth: 'excellent' | 'good' | 'fair';
  startedAt: string;
  resolution: string;
  latencyMs: number;
  audioTrack: string;
}

export interface MediaItem {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  posterUrl: string;
  duration: string;
  durationMinutes: number;
  category: 'movies' | 'drama' | 'documentary' | 'exchange';
  tags: string[];
  director: string;
  producer?: string;
  year: number;
  originLanguage: string;
  subtitles: string[];
  videoUrl: string;
  publishDate: string;
  rating: number;
  status: 'published' | 'draft';
  episodesCount?: number;
}

export interface BroadcastScheduleItem {
  id: string;
  title: LocalizedString;
  category: LocalizedString;
  timeSlot: string;
  isLive: boolean;
  date: string;
  description: LocalizedString;
}

export interface LiveChatMessage {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  locale: string;
  badge?: string;
}
