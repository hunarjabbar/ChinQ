import { LocalizedString } from './portals';
import { StyleOverrides } from './controlModel';

export type NavigationSection = 'header' | 'footer' | 'sidebar' | 'mobile' | 'breadcrumb';

export type NavigationPortal = 
  | 'ica-public' 
  | 'newsroom' 
  | 'live' 
  | 'ica-plus' 
  | 'media-hub' 
  | 'secretariat' 
  | 'cise' 
  | 'settlement' 
  | 'summit' 
  | 'all';

export interface NavigationItem {
  id: string;
  section: NavigationSection;
  parentId?: string | null;
  label: LocalizedString;
  slug: string;
  href: string;
  icon?: string;
  displayOrder: number;
  status: 'active' | 'draft' | 'archived';
  portal: NavigationPortal;
  requiredScope?: string; // 'public' | 'editor' | 'admin' | 'superadmin'
  column?: 'about' | 'initiatives' | 'research' | 'media' | 'legal' | 'connect'; // for footer
  children?: NavigationItem[];
  isExternal?: boolean;
  isLive?: boolean;
  badge?: LocalizedString;
  styleOverrides?: StyleOverrides;
  createdAt?: string;
  updatedAt?: string;
}

export interface NavigationMutationPayload {
  section: NavigationSection;
  parentId?: string | null;
  label: LocalizedString;
  slug: string;
  href: string;
  icon?: string;
  displayOrder?: number;
  status?: 'active' | 'draft' | 'archived';
  portal?: NavigationPortal;
  requiredScope?: string;
  column?: 'about' | 'initiatives' | 'research' | 'media' | 'legal' | 'connect';
  isExternal?: boolean;
  isLive?: boolean;
  badge?: LocalizedString;
  styleOverrides?: StyleOverrides;
}
