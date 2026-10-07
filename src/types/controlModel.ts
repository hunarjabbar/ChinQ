import { LocalizedString } from './portals';

export type VisibilityState = 'visible' | 'hidden' | 'scheduled';

export interface StyleOverrides {
  backgroundColor?: string | null;
  textColor?: string | null;
  borderColor?: string | null;
  borderRadius?: string | null;
  padding?: string | null;
  margin?: string | null;
  shadow?: string | null;
}

export interface CustomizationModel {
  displayOrder: number;
  visibility: VisibilityState;
  scheduleFrom?: string | null;
  scheduleTo?: string | null;
  styleOverrides: StyleOverrides;
  variant?: string | null;
  customCss?: string | null;
  localeOverrides?: {
    en?: Record<string, unknown> | null;
    ar?: Record<string, unknown> | null;
    zh?: Record<string, unknown> | null;
    ckb?: Record<string, unknown> | null;
  };
}

export interface HistoryRevision {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: 'create' | 'update' | 'restyle' | 'visibility' | 'soft_delete' | 'restore';
  diffSummary: string;
  snapshot: Record<string, unknown>;
}

export interface CiseCommandHubControlledCard {
  id: string;
  sectionId: string;
  eyebrow?: LocalizedString;
  headline: LocalizedString;
  body: LocalizedString;
  chips?: LocalizedString[];
  ctaLabel?: LocalizedString;
  ctaHref?: string;
  imageUrl?: string;
  altText?: LocalizedString;
  customization: CustomizationModel;
  history?: HistoryRevision[];
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface CiseCommandHubControlledSection {
  id: string;
  portal: 'public' | 'secretariat' | 'newsroom' | 'live' | 'services';
  slug: string;
  name: LocalizedString;
  description?: LocalizedString;
  customization: CustomizationModel;
  items: CiseCommandHubControlledCard[];
  status: 'active' | 'draft' | 'archived';
  updatedAt: string;
}
