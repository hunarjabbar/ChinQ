import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SocialLinksConfig {
  whatsapp: string;
  facebook: string;
  facebookAr: string;
  facebookZh: string;
  facebookCkb: string;
  telegram: string;
  telegramAr: string;
  telegramZh: string;
  telegramCkb: string;
  instagram: string;
  linkedin: string;
  weibo: string;
  wechat: string;
  youtube: string;
  youtubeAr: string;
  youtubeZh: string;
  youtubeCkb: string;
  x: string;
  xAr: string;
  xZh: string;
  xCkb: string;
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

export function sanitizeSocialUrl(url: string, fallback: string): string {
  if (!url || typeof url !== 'string') return fallback;
  const trimmed = url.trim();
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('vbscript:') ||
    lower.includes('<') ||
    lower.includes('>') ||
    lower.includes('"') ||
    lower.includes("'")
  ) {
    return fallback;
  }
  return trimmed;
}

const DEFAULT_SOCIAL_LINKS: SocialLinksConfig = {
  whatsapp: 'https://chat.whatsapp.com/IraqiChineseAgencyOfficial',
  facebook: 'https://facebook.com/IraqiChineseAgency.EN',
  facebookAr: 'https://facebook.com/IraqiChineseAgency.AR',
  facebookZh: 'https://facebook.com/IraqiChineseAgency.ZH',
  facebookCkb: 'https://facebook.com/IraqiChineseAgency.CKB',
  telegram: 'https://t.me/IraqiChineseAgency.EN',
  telegramAr: 'https://t.me/IraqiChineseAgency.AR',
  telegramZh: 'https://t.me/IraqiChineseAgency.ZH',
  telegramCkb: 'https://t.me/IraqiChineseAgency.CKB',
  instagram: 'https://instagram.com/iraqi-chineseagency',
  linkedin: 'https://linkedin.com/company/iraqi-chinese-agency',
  weibo: 'https://weibo.com/iraqi-chineseagency',
  wechat: 'IraqiChineseAgency_Official',
  youtube: 'https://youtube.com/@IraqiChineseAgency.EN',
  youtubeAr: 'https://youtube.com/@IraqiChineseAgency.AR',
  youtubeZh: 'https://youtube.com/@IraqiChineseAgency.ZH',
  youtubeCkb: 'https://youtube.com/@IraqiChineseAgency.CKB',
  x: 'https://x.com/IraqiChineseAgency.EN',
  xAr: 'https://x.com/IraqiChineseAgency.AR',
  xZh: 'https://x.com/IraqiChineseAgency.ZH',
  xCkb: 'https://x.com/IraqiChineseAgency.CKB',
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
      updateSettings: (newSettings) => set((state) => {
        let sanitizedSocialLinks = state.socialLinks;
        if (newSettings.socialLinks) {
          sanitizedSocialLinks = { ...state.socialLinks };
          for (const [k, v] of Object.entries(newSettings.socialLinks)) {
            const fallback = (DEFAULT_SOCIAL_LINKS as any)[k] || '#';
            (sanitizedSocialLinks as any)[k] = sanitizeSocialUrl(v as string, fallback);
          }
        }
        return {
          ...state,
          ...newSettings,
          socialLinks: sanitizedSocialLinks,
        };
      }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'site-config-storage',
      merge: (persistedState: any, currentState: SiteStore) => {
        const persistedSocialLinks = persistedState?.socialLinks || {};
        const sanitizedPersistedSocial: any = {};
        for (const [k, v] of Object.entries(DEFAULT_SOCIAL_LINKS)) {
          const val = persistedSocialLinks[k];
          sanitizedPersistedSocial[k] = sanitizeSocialUrl(val as string, (DEFAULT_SOCIAL_LINKS as any)[k]);
        }

        const merged = {
          ...currentState,
          ...(persistedState || {}),
          socialLinks: {
            ...DEFAULT_SOCIAL_LINKS,
            ...sanitizedPersistedSocial,
          },
        };
        // Vanish legacy crimson and dark maroon tones from storage in favor of trending background red #cc0000
        if (
          !merged.brandColor ||
          merged.brandColor === '#8B0000' ||
          merged.brandColor === '#990000' ||
          merged.brandColor === '#800000' ||
          merged.brandColor === '#C91C24' ||
          merged.brandColor === '#a30000'
        ) {
          merged.brandColor = '#cc0000';
        }
        // Safeguard inkColor and paperColor to prevent white-on-white text invisibility
        if (!merged.inkColor || ['#ffffff', '#fff', '#fafafa', '#f4f4f5', '#f8fafc'].includes(merged.inkColor.toLowerCase().trim())) {
          merged.inkColor = '#0f172a';
        }
        if (!merged.paperColor) {
          merged.paperColor = '#ffffff';
        }
        return merged;
      },
    }
  )
);
