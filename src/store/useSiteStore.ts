import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SocialLinksConfig {
  whatsapp: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  weibo: string;
  wechat: string;
  youtube: string;
  x: string;
}

export interface SiteConfig {
  siteName: string;
  contactEmail: string;
  cachingEnabled: boolean;
  autoTranslate: boolean;
  geoLatencyRoute: string;
  systemMaintenance: boolean;
  brandColor: string;
  inkColor: string;
  paperColor: string;
  darkMode: boolean;
  socialLinks: SocialLinksConfig;
}

interface SiteStore extends SiteConfig {
  updateSettings: (settings: Partial<SiteConfig>) => void;
  toggleDarkMode: () => void;
}

const DEFAULT_SOCIAL_LINKS: SocialLinksConfig = {
  whatsapp: 'https://chat.whatsapp.com/IraqiChineseAgencyOfficial',
  facebook: 'https://facebook.com/IraqiChineseAgency',
  instagram: 'https://instagram.com/iraqi-chineseagency',
  linkedin: 'https://linkedin.com/company/iraqi-chinese-agency',
  weibo: 'https://weibo.com/iraqi-chineseagency',
  wechat: 'IraqiChineseAgency_Official',
  youtube: 'https://youtube.com/@IraqiChineseAgency',
  x: 'https://x.com/IraqiChineseAgency',
};

const DEFAULT_STATE: SiteConfig = {
  siteName: 'Iraqi-Chinese Agency',
  contactEmail: 'desk@iraqi-chineseagency.com',
  cachingEnabled: true,
  autoTranslate: true,
  geoLatencyRoute: 'baghdad-beijing',
  systemMaintenance: false,
  brandColor: '#cc0000',
  inkColor: '#0f172a',
  paperColor: '#ffffff',
  darkMode: false,
  socialLinks: DEFAULT_SOCIAL_LINKS,
};

export const useSiteStore = create<SiteStore>()(
  persist(
    (set) => ({
      ...DEFAULT_STATE,
      updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'site-config-storage',
      merge: (persistedState: any, currentState: SiteStore) => ({
        ...currentState,
        ...(persistedState || {}),
        socialLinks: {
          ...DEFAULT_SOCIAL_LINKS,
          ...(persistedState?.socialLinks || {}),
        },
      }),
    }
  )
);
