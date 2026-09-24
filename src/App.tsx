import { useAuthStore } from './store/useAuthStore';
import { Toaster } from 'sonner';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createBrowserRouter, RouterProvider, Navigate, useParams, Outlet, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, Suspense, lazy } from 'react';
import { Layout } from './components/Layout';
import { InstituteLayout } from './components/institute/InstituteLayout';
import { AdminLayout } from './components/AdminLayout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useSiteStore } from './store/useSiteStore';
import { DevBuildInfoBadge } from './components/DevBuildInfoBadge';
import { PageSkeleton } from './components/PageSkeleton';

import { Home } from './pages/Home';
import { ArticlePage } from './pages/ArticlePage';
import { CategoryPage } from './pages/CategoryPage';
import { NotFound } from './pages/NotFound';

const queryClient = new QueryClient();

// Resilient lazy loading that retries on temporary network drops or dynamic chunk rebuilds
function lazyWithRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T } | any>
) {
  return lazy(async () => {
    const chunkReloadLockKey = 'app_chunk_reload_lock';
    try {
      const mod = await factory();
      try {
        window.sessionStorage.removeItem(chunkReloadLockKey);
      } catch {}
      return mod.default ? mod : { default: mod };
    } catch (error: any) {
      console.warn('Chunk load error, attempting immediate retry...', error);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const mod = await factory();
        try {
          window.sessionStorage.removeItem(chunkReloadLockKey);
        } catch {}
        return mod.default ? mod : { default: mod };
      } catch (retryError: any) {
        console.error('Persistent chunk load failure:', retryError);
        // If a dynamic import fails due to server restart/new bundle hashes, refresh once to retrieve latest manifest
        if (typeof window !== 'undefined') {
          try {
            const hasReloaded = window.sessionStorage.getItem(chunkReloadLockKey);
            if (!hasReloaded) {
              window.sessionStorage.setItem(chunkReloadLockKey, 'true');
              window.location.reload();
              return new Promise<{ default: T }>(() => {});
            }
          } catch {}
        }
        throw retryError;
      }
    }
  });
}

const AdminDashboard = lazyWithRetry(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const LiveEventPage = lazyWithRetry(() => import('./pages/LiveEventPage').then(m => ({ default: m.LiveEventPage })));
const LivePortal = lazyWithRetry(() => import('./pages/LivePortal').then(m => ({ default: m.LivePortal })));
const SearchPage = lazyWithRetry(() => import('./pages/SearchPage'));
const AdminArticles = lazyWithRetry(() => import('./pages/AdminArticles').then(m => ({ default: m.AdminArticles })));
const AdminArticleNew = lazyWithRetry(() => import('./pages/AdminArticleNew').then(m => ({ default: m.AdminArticleNew })));
const AdminAuditLogs = lazyWithRetry(() => import('./pages/AdminAuditLogs').then(m => ({ default: m.AdminAuditLogs })));
const AdminBrics = lazyWithRetry(() => import('./pages/AdminBrics').then(m => ({ default: m.AdminBrics })));
const AdminChineseProducts = lazyWithRetry(() => import('./pages/AdminChineseProducts').then(m => ({ default: m.AdminChineseProducts })));
const AdminBusiness = lazyWithRetry(() => import('./pages/AdminBusiness'));
const AdminUsers = lazyWithRetry(() => import('./pages/AdminUsers').then(m => ({ default: m.AdminUsers })));
const AdminMedia = lazyWithRetry(() => import('./pages/AdminMedia').then(m => ({ default: m.AdminMedia })));
const AdminSettings = lazyWithRetry(() => import('./pages/AdminSettings').then(m => ({ default: m.AdminSettings })));
const About = lazyWithRetry(() => import('./pages/About').then(m => ({ default: m.About })));
const JoinUs = lazyWithRetry(() => import('./pages/JoinUs').then(m => ({ default: m.JoinUs })));
const BooksPage = lazyWithRetry(() => import('./pages/BooksPage').then(m => ({ default: m.BooksPage })));
const AdminBooks = lazyWithRetry(() => import('./pages/AdminBooks').then(m => ({ default: m.AdminBooks })));
const TourismPage = lazyWithRetry(() => import('./pages/TourismPage').then(m => ({ default: m.TourismPage })));
const AdminTourism = lazyWithRetry(() => import('./pages/AdminTourism').then(m => ({ default: m.AdminTourism })));
const WomenPage = lazyWithRetry(() => import('./pages/WomenPage').then(m => ({ default: m.WomenPage })));
const AdminWomen = lazyWithRetry(() => import('./pages/AdminWomen').then(m => ({ default: m.AdminWomen })));
const VisaFlightPage = lazyWithRetry(() => import('./pages/VisaFlightPage').then(m => ({ default: m.VisaFlightPage })));
const AdminVisaFlight = lazyWithRetry(() => import('./pages/AdminVisaFlight').then(m => ({ default: m.AdminVisaFlight })));
const PodcastsPage = lazyWithRetry(() => import('./pages/PodcastsPage'));
const IcaPlusPage = lazyWithRetry(() => import('./pages/IcaPlusPage').then(m => ({ default: m.IcaPlusPage })));
const AdminIcaPlus = lazyWithRetry(() => import('./pages/AdminIcaPlus'));
const AdminPodcasts = lazyWithRetry(() => import('./pages/AdminPodcasts'));
const AdminLiveEvents = lazyWithRetry(() => import('./pages/AdminLiveEvents'));
const AdminPartners = lazyWithRetry(() => import('./pages/AdminPartners'));
const AdminSourcing = lazyWithRetry(() => import('./pages/AdminSourcing'));
const AdminFinanceEconomics = lazyWithRetry(() => import('./pages/AdminFinanceEconomics').then(m => ({ default: m.AdminFinanceEconomics })));
const AdminPayments = lazyWithRetry(() => import('./pages/AdminPayments').then(m => ({ default: m.AdminPayments })));
const CulturalExchangePage = lazyWithRetry(() => import('./pages/CulturalExchangePage'));
const AdminCulturalExchange = lazyWithRetry(() => import('./pages/AdminCulturalExchange'));
const NewsroomPage = lazyWithRetry(() => import('./pages/NewsroomPage').then(m => ({ default: m.NewsroomPage })));
const NewsroomLandingPage = lazyWithRetry(() => import('./pages/newsroom/NewsroomLandingPage').then(m => ({ default: m.NewsroomLandingPage })));
const NewsroomArticleDetailPage = lazyWithRetry(() => import('./pages/newsroom/NewsroomArticleDetailPage').then(m => ({ default: m.NewsroomArticleDetailPage })));
const NewsroomCategoryPage = lazyWithRetry(() => import('./pages/newsroom/NewsroomCategoryPage').then(m => ({ default: m.NewsroomCategoryPage })));
const NewsroomTagPage = lazyWithRetry(() => import('./pages/newsroom/NewsroomTagPage').then(m => ({ default: m.NewsroomTagPage })));
const NewsroomAuthorPage = lazyWithRetry(() => import('./pages/newsroom/NewsroomAuthorPage').then(m => ({ default: m.NewsroomAuthorPage })));
const NewsroomArchivePage = lazyWithRetry(() => import('./pages/newsroom/NewsroomArchivePage').then(m => ({ default: m.NewsroomArchivePage })));
const NewsroomSearchPage = lazyWithRetry(() => import('./pages/newsroom/NewsroomSearchPage').then(m => ({ default: m.NewsroomSearchPage })));
const NewsroomFeedViewer = lazyWithRetry(() => import('./pages/newsroom/NewsroomFeedViewer').then(m => ({ default: m.NewsroomFeedViewer })));
const InstituteHub = lazyWithRetry(() => import('./pages/InstituteHub').then(m => ({ default: m.InstituteHub })));
const SummitPage = lazyWithRetry(() => import('./pages/SummitPage').then(m => ({ default: m.SummitPage })));

// Summit Pages
const SummitLandingPage = lazyWithRetry(() => import('./pages/summit/SummitLandingPage').then(m => ({ default: m.SummitLandingPage })));
const SummitAboutSulaymaniyah = lazyWithRetry(() => import('./pages/summit/SummitAboutSulaymaniyah').then(m => ({ default: m.SummitAboutSulaymaniyah })));
const SummitAgendaPage = lazyWithRetry(() => import('./pages/summit/SummitAgendaPage').then(m => ({ default: m.SummitAgendaPage })));
const SummitSpeakersPage = lazyWithRetry(() => import('./pages/summit/SummitSpeakersPage').then(m => ({ default: m.SummitSpeakersPage })));
const SummitExpoPage = lazyWithRetry(() => import('./pages/summit/SummitExpoPage').then(m => ({ default: m.SummitExpoPage })));
const SummitSectorPavilionPage = lazyWithRetry(() => import('./pages/summit/SummitSectorPavilionPage').then(m => ({ default: m.SummitSectorPavilionPage })));
const SummitFloorPlanPage = lazyWithRetry(() => import('./pages/summit/SummitFloorPlanPage').then(m => ({ default: m.SummitFloorPlanPage })));
const SummitExhibitorRegisterPage = lazyWithRetry(() => import('./pages/summit/SummitExhibitorRegisterPage').then(m => ({ default: m.SummitExhibitorRegisterPage })));
const SummitVisitorRegisterPage = lazyWithRetry(() => import('./pages/summit/SummitVisitorRegisterPage').then(m => ({ default: m.SummitVisitorRegisterPage })));
const SummitVipRegisterPage = lazyWithRetry(() => import('./pages/summit/SummitVipRegisterPage').then(m => ({ default: m.SummitVipRegisterPage })));
const SummitServicesPage = lazyWithRetry(() => import('./pages/summit/SummitServicesPage').then(m => ({ default: m.SummitServicesPage })));
const SummitServiceDetailPage = lazyWithRetry(() => import('./pages/summit/SummitServiceDetailPage').then(m => ({ default: m.SummitServiceDetailPage })));
const SummitServiceRequestPage = lazyWithRetry(() => import('./pages/summit/SummitServiceRequestPage').then(m => ({ default: m.SummitServiceRequestPage })));
const SummitB2BMatchmakingPage = lazyWithRetry(() => import('./pages/summit/SummitB2BMatchmakingPage').then(m => ({ default: m.SummitB2BMatchmakingPage })));
const SummitSponsorsPage = lazyWithRetry(() => import('./pages/summit/SummitSponsorsPage').then(m => ({ default: m.SummitSponsorsPage })));
const SummitMediaPage = lazyWithRetry(() => import('./pages/summit/SummitMediaPage').then(m => ({ default: m.SummitMediaPage })));
const SummitFaqPage = lazyWithRetry(() => import('./pages/summit/SummitFaqPage').then(m => ({ default: m.SummitFaqPage })));
const SummitContactPage = lazyWithRetry(() => import('./pages/summit/SummitContactPage').then(m => ({ default: m.SummitContactPage })));

// Institute Specific Pages
const InstituteHome = lazyWithRetry(() => import('./pages/institute/InstituteHome').then(m => ({ default: m.InstituteHome })));
const DataHub = lazyWithRetry(() => import('./pages/institute/DataHub').then(m => ({ default: m.DataHub })));
const PublicationsArchive = lazyWithRetry(() => import('./pages/institute/PublicationsArchive').then(m => ({ default: m.PublicationsArchive })));
const PublicationDetail = lazyWithRetry(() => import('./pages/institute/PublicationDetail').then(m => ({ default: m.PublicationDetail })));
const ExpertsDirectory = lazyWithRetry(() => import('./pages/institute/ExpertsDirectory').then(m => ({ default: m.ExpertsDirectory })));
const ExpertProfile = lazyWithRetry(() => import('./pages/institute/ExpertProfile'));
const Partnerships = lazyWithRetry(() => import('./pages/institute/Partnerships').then(m => ({ default: m.Partnerships })));
const AboutInstitute = lazyWithRetry(() => import('./pages/institute/AboutInstitute').then(m => ({ default: m.AboutInstitute })));
const ResearchPillars = lazyWithRetry(() => import('./pages/institute/ResearchPillars').then(m => ({ default: m.ResearchPillars })));
const ResearchPillarDetail = lazyWithRetry(() => import('./pages/institute/ResearchPillarDetail'));
const EventsCalendar = lazyWithRetry(() => import('./pages/institute/EventsCalendar').then(m => ({ default: m.EventsCalendar })));

// Data Hub Sub-Pages
const DataHubTradeExplorer = lazyWithRetry(() => import('./pages/institute/DataHubTradeExplorer'));
const DataHubCorridorTracker = lazyWithRetry(() => import('./pages/institute/DataHubCorridorTracker'));
const DataHubBRIProjects = lazyWithRetry(() => import('./pages/institute/DataHubBRIProjects'));
const DataHubMethodology = lazyWithRetry(() => import('./pages/institute/DataHubMethodology'));

// Bilateral Visa Centre Pages
const VisaCentreLanding = lazyWithRetry(() => import('./pages/institute/visa-centre/VisaCentreLanding').then(m => ({ default: m.VisaCentreLanding })));
const VisaCentreAbout = lazyWithRetry(() => import('./pages/institute/visa-centre/VisaCentreAbout').then(m => ({ default: m.VisaCentreAbout })));
const VisaCentreServices = lazyWithRetry(() => import('./pages/institute/visa-centre/VisaCentreServices').then(m => ({ default: m.VisaCentreServices })));
const VisaCentreServiceDetail = lazyWithRetry(() => import('./pages/institute/visa-centre/VisaCentreServiceDetail').then(m => ({ default: m.VisaCentreServiceDetail })));
const VisaCentreTypes = lazyWithRetry(() => import('./pages/institute/visa-centre/VisaCentreTypes').then(m => ({ default: m.VisaCentreTypes })));
const VisaCentreCategoryDetail = lazyWithRetry(() => import('./pages/institute/visa-centre/VisaCentreCategoryDetail').then(m => ({ default: m.VisaCentreCategoryDetail })));
const VisaCentreRequirements = lazyWithRetry(() => import('./pages/institute/visa-centre/VisaCentreRequirements').then(m => ({ default: m.VisaCentreRequirements })));
const VisaCentreFees = lazyWithRetry(() => import('./pages/institute/visa-centre/VisaCentreFees').then(m => ({ default: m.VisaCentreFees })));
const VisaCentreProcess = lazyWithRetry(() => import('./pages/institute/visa-centre/VisaCentreProcess').then(m => ({ default: m.VisaCentreProcess })));
const VisaCentreAppointments = lazyWithRetry(() => import('./pages/institute/visa-centre/VisaCentreAppointments').then(m => ({ default: m.VisaCentreAppointments })));
const VisaCentreApply = lazyWithRetry(() => import('./pages/institute/visa-centre/VisaCentreApply').then(m => ({ default: m.VisaCentreApply })));
const VisaCentreTrack = lazyWithRetry(() => import('./pages/institute/visa-centre/VisaCentreTrack').then(m => ({ default: m.VisaCentreTrack })));
const VisaCentreNews = lazyWithRetry(() => import('./pages/institute/visa-centre/VisaCentreNews').then(m => ({ default: m.VisaCentreNews })));
const VisaCentreFaq = lazyWithRetry(() => import('./pages/institute/visa-centre/VisaCentreFaq').then(m => ({ default: m.VisaCentreFaq })));
const VisaCentreContact = lazyWithRetry(() => import('./pages/institute/visa-centre/VisaCentreContact').then(m => ({ default: m.VisaCentreContact })));
const VisaCentreDisclaimer = lazyWithRetry(() => import('./pages/institute/visa-centre/VisaCentreDisclaimer').then(m => ({ default: m.VisaCentreDisclaimer })));
const ChineseCentreLanding = lazyWithRetry(() => import('./pages/institute/ChineseCentreLanding').then(m => ({ default: m.ChineseCentreLanding })));
const AdminVisaCentre = lazyWithRetry(() => import('./pages/AdminVisaCentre').then(m => ({ default: m.AdminVisaCentre })));

// Sovereign Bilateral Payment Settlement Facilitation Portal Pages
const SettlementLandingPage = lazyWithRetry(() => import('./pages/settlement/SettlementLandingPage').then(m => ({ default: m.SettlementLandingPage })));
const SettlementAboutPage = lazyWithRetry(() => import('./pages/settlement/SettlementAboutPage').then(m => ({ default: m.SettlementAboutPage })));
const SettlementHowItWorksPage = lazyWithRetry(() => import('./pages/settlement/SettlementHowItWorksPage').then(m => ({ default: m.SettlementHowItWorksPage })));
const SettlementCompliancePage = lazyWithRetry(() => import('./pages/settlement/SettlementCompliancePage').then(m => ({ default: m.SettlementCompliancePage })));
const SettlementFeesPage = lazyWithRetry(() => import('./pages/settlement/SettlementFeesPage').then(m => ({ default: m.SettlementFeesPage })));
const SettlementCalculatorPage = lazyWithRetry(() => import('./pages/settlement/SettlementCalculatorPage').then(m => ({ default: m.SettlementCalculatorPage })));
const SettlementTrackerPublicPage = lazyWithRetry(() => import('./pages/settlement/SettlementTrackerPublicPage').then(m => ({ default: m.SettlementTrackerPublicPage })));
const SettlementTrackerDetailPage = lazyWithRetry(() => import('./pages/settlement/SettlementTrackerDetailPage').then(m => ({ default: m.SettlementTrackerDetailPage })));
const SettlementGatewayPage = lazyWithRetry(() => import('./pages/settlement/SettlementGatewayPage').then(m => ({ default: m.SettlementGatewayPage })));
const SettlementCheckoutPage = lazyWithRetry(() => import('./pages/settlement/SettlementCheckoutPage').then(m => ({ default: m.SettlementCheckoutPage })));
const SettlementInquiryPage = lazyWithRetry(() => import('./pages/settlement/SettlementInquiryPage').then(m => ({ default: m.SettlementInquiryPage })));
const SettlementConfirmationPage = lazyWithRetry(() => import('./pages/settlement/SettlementConfirmationPage').then(m => ({ default: m.SettlementConfirmationPage })));
const SettlementCardLandingPage = lazyWithRetry(() => import('./pages/settlement/SettlementCardLandingPage').then(m => ({ default: m.SettlementCardLandingPage })));
const SettlementCardRegisterPage = lazyWithRetry(() => import('./pages/settlement/SettlementCardRegisterPage').then(m => ({ default: m.SettlementCardRegisterPage })));
const SettlementCardGeneratePage = lazyWithRetry(() => import('./pages/settlement/SettlementCardGeneratePage').then(m => ({ default: m.SettlementCardGeneratePage })));
const SettlementFaqPage = lazyWithRetry(() => import('./pages/settlement/SettlementFaqPage').then(m => ({ default: m.SettlementFaqPage })));
const SettlementContactPage = lazyWithRetry(() => import('./pages/settlement/SettlementContactPage').then(m => ({ default: m.SettlementContactPage })));
const SettlementLegalPage = lazyWithRetry(() => import('./pages/settlement/SettlementLegalPage').then(m => ({ default: m.SettlementLegalPage })));

function mixColor(hex: string, targetHex: string, weight: number): string {
  try {
    const cleanHex = hex.replace('#', '');
    const cleanTarget = targetHex.replace('#', '');
    const r1 = parseInt(cleanHex.substring(0, 2), 16) || 0;
    const g1 = parseInt(cleanHex.substring(2, 4), 16) || 0;
    const b1 = parseInt(cleanHex.substring(4, 6), 16) || 0;
    
    const r2 = parseInt(cleanTarget.substring(0, 2), 16) || 0;
    const g2 = parseInt(cleanTarget.substring(2, 4), 16) || 0;
    const b2 = parseInt(cleanTarget.substring(4, 6), 16) || 0;
    
    const r = Math.round(r1 + (r2 - r1) * weight);
    const g = Math.round(g1 + (g2 - g1) * weight);
    const b = Math.round(b1 + (b2 - b1) * weight);
    
    return `rgb(${r}, ${g}, ${b})`;
  } catch (e) {
    return hex;
  }
}

function ThemeApplier() {
  const { brandColor, inkColor, paperColor, darkMode } = useSiteStore();
  
  useEffect(() => {
    try {
      const root = document.documentElement;
      if (darkMode) {
        root.classList.add('dark');
        document.body.classList.add('dark');
        root.style.setProperty('--color-ink-900', '#f4f4f5');
        root.style.setProperty('--color-paper-50', '#09090b');
      } else {
        root.classList.remove('dark');
        document.body.classList.remove('dark');
        const safeInk = (!inkColor || ['#ffffff', '#fff', '#fafafa', '#f4f4f5', '#f8fafc'].includes(inkColor.toLowerCase().trim()))
          ? '#0f172a'
          : inkColor;
        const safePaper = (!paperColor || ['#000000', '#000', '#09090b', '#0f172a'].includes(paperColor.toLowerCase().trim()))
          ? '#ffffff'
          : paperColor;
        root.style.setProperty('--color-ink-900', safeInk);
        root.style.setProperty('--color-paper-50', safePaper);
      }
      if (brandColor) {
        const bc = (brandColor && brandColor.startsWith('#') && brandColor !== '#8B0000' && brandColor !== '#990000' && brandColor !== '#C91C24' && brandColor !== '#800000' && brandColor !== '#a30000') 
          ? brandColor 
          : '#cc0000';
        root.style.setProperty('--color-brand-950', mixColor(bc, '#000000', 0.18));
        root.style.setProperty('--color-brand-900', bc); // Exact same red tone as trending background red (#cc0000)
        root.style.setProperty('--color-brand-800', bc); // Trending background red (#cc0000)
        root.style.setProperty('--color-brand-700', mixColor(bc, '#ffffff', 0.12));
        root.style.setProperty('--color-brand-600', mixColor(bc, '#ffffff', 0.25));
        root.style.setProperty('--color-brand-500', mixColor(bc, '#ffffff', 0.45));
        root.style.setProperty('--color-brand-400', mixColor(bc, '#ffffff', 0.65));
        root.style.setProperty('--color-brand-300', mixColor(bc, '#ffffff', 0.78));
        root.style.setProperty('--color-brand-200', mixColor(bc, '#ffffff', 0.86));
        root.style.setProperty('--color-brand-100', mixColor(bc, '#ffffff', 0.92));
        root.style.setProperty('--color-brand-50', mixColor(bc, '#ffffff', 0.96));
      }
    } catch (e) {
      console.warn("ThemeApplier style property error:", e);
    }
  }, [brandColor, inkColor, paperColor, darkMode]);
  
  return null;
}



export function resolveLocaleFromEnvironment(): 'en' | 'ar' | 'zh' | 'ckb' {
  if (typeof window === 'undefined') return 'en';
  try {
    // 1. Query parameter ?lang= or ?locale=
    const params = new URLSearchParams(window.location.search);
    const qLang = params.get('lang') || params.get('locale');
    if (qLang) {
      const clean = qLang.toLowerCase().trim();
      if (clean === 'ck' || clean === 'ckb' || clean === 'ku' || clean === 'kurdish') return 'ckb';
      if (['en', 'ar', 'zh'].includes(clean)) return clean as any;
    }

    // 2. Cookie `ica_lang`
    const cookieMatch = document.cookie.match(/(?:^|;\s*)ica_lang=([^;]+)/);
    if (cookieMatch && cookieMatch[1]) {
      const cLang = decodeURIComponent(cookieMatch[1]).toLowerCase().trim();
      if (cLang === 'ck' || cLang === 'ckb' || cLang === 'ku') return 'ckb';
      if (['en', 'ar', 'zh'].includes(cLang)) return cLang as any;
    }

    // 3. LocalStorage `ica_lang`
    const stored = localStorage.getItem('ica_lang');
    if (stored) {
      const sLang = stored.toLowerCase().trim();
      if (sLang === 'ck' || sLang === 'ckb' || sLang === 'ku') return 'ckb';
      if (['en', 'ar', 'zh'].includes(sLang)) return sLang as any;
    }

    // 4. Referrer detection
    if (document.referrer) {
      try {
        const refUrl = new URL(document.referrer);
        const refPath = refUrl.pathname;
        if (refPath.startsWith('/ckb') || refPath.startsWith('/ck')) return 'ckb';
        if (refPath.startsWith('/ar')) return 'ar';
        if (refPath.startsWith('/zh')) return 'zh';
        if (refPath.startsWith('/en')) return 'en';
      } catch {}
    }

    // 5. Browser navigator.language
    const browserLang = (navigator.language || '').toLowerCase();
    if (browserLang.startsWith('ar')) return 'ar';
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.startsWith('ckb') || browserLang.startsWith('ku')) return 'ckb';
  } catch {}

  return 'en';
}

function RootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  return <Navigate to={`/${loc}${location.search}${location.hash}`} replace />;
}

function InstituteRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const instituteSubPath = location.pathname.replace(/^\/institute/, '');
  return <Navigate to={`/${loc}/institute${instituteSubPath}${location.search}${location.hash}`} replace />;
}

function SummitRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const summitSubPath = location.pathname.replace(/^\/summit/, '');
  return <Navigate to={`/${loc}/summit${summitSubPath}${location.search}${location.hash}`} replace />;
}

function AdminRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const adminSubPath = location.pathname.replace(/^\/admin/, '');
  return <Navigate to={`/${loc}/admin${adminSubPath}${location.search}${location.hash}`} replace />;
}

function SettlementRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const settlementSubPath = location.pathname.replace(/^\/settlement(-sourcing)?/, '');
  return <Navigate to={`/${loc}/settlement${settlementSubPath}${location.search}${location.hash}`} replace />;
}

function NewsroomRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const isCategory = location.pathname.startsWith('/category');
  const subPath = location.pathname.replace(/^\/(newsroom|news-room|news|article|category)/, '');
  const targetPath = isCategory ? `/category${subPath}` : subPath;
  return <Navigate to={`/${loc}/newsroom${targetPath}${location.search}${location.hash}`} replace />;
}

function LegacyNewsRedirect() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const isCategory = location.pathname.includes('/category/');
  const subPath = location.pathname.replace(/^\/[^/]+\/(news-room|news|article|category)/, '');
  const cleanLang = (lang === 'ck' || lang === 'ku') ? 'ckb' : (lang || 'en');
  const targetPath = isCategory ? `/category${subPath}` : subPath;
  return <Navigate to={`/${cleanLang}/newsroom${targetPath}${location.search}${location.hash}`} replace />;
}

function KurdishAliasRedirect() {
  const location = useLocation();
  const targetPath = location.pathname.replace(/^\/ck(\/|$)/, '/ckb$1');
  return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
}

function SearchWrapper() {
  const { lang } = useParams<{ lang: string }>();
  return <SearchPage lang={(lang as any) || 'en'} />;
}

function useLanguageSetup(lang?: string) {
  const cleanLang = (lang || '').toLowerCase().trim();
  const isCkbAlias = cleanLang === 'ck' || cleanLang === 'ku';
  const normalizedLang = isCkbAlias ? 'ckb' : cleanLang;
  const isValidLang = ['en', 'ar', 'zh', 'ckb'].includes(normalizedLang);
  const safeLang = (isValidLang ? normalizedLang : 'en') as 'en' | 'ar' | 'zh' | 'ckb';

  useEffect(() => {
    try {
      document.documentElement.lang = safeLang;
      if (safeLang === 'ar' || safeLang === 'ckb') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
      document.cookie = `ica_lang=${safeLang}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem('ica_lang', safeLang);
    } catch {}
  }, [safeLang]);

  return { isValidLang, safeLang, isCkbAlias };
}

function LangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { isValidLang, safeLang, isCkbAlias } = useLanguageSetup(lang);

  if (isCkbAlias) {
    const targetPath = location.pathname.replace(/^\/ck(\/|$)/, '/ckb$1');
    return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
  }

  if (!isValidLang) {
    return <Navigate to="/en" replace />;
  }

  return (
    <ErrorBoundary key={location.key} lang={safeLang}>
      <Layout lang={safeLang}>
        <Outlet />
      </Layout>
    </ErrorBoundary>
  );
}

function ImmersiveLangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { isValidLang, safeLang, isCkbAlias } = useLanguageSetup(lang);

  if (isCkbAlias) {
    const targetPath = location.pathname.replace(/^\/ck(\/|$)/, '/ckb$1');
    return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
  }

  if (!isValidLang) {
    return <Navigate to="/en" replace />;
  }

  return (
    <ErrorBoundary key={location.key} lang={safeLang}>
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans transition-colors duration-300">
        <Outlet />
      </div>
    </ErrorBoundary>
  );
}

function AdminLangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { isValidLang, safeLang, isCkbAlias } = useLanguageSetup(lang);

  if (isCkbAlias) {
    const targetPath = location.pathname.replace(/^\/ck(\/|$)/, '/ckb$1');
    return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
  }

  if (!isValidLang) {
    return <Navigate to="/en/admin" replace />;
  }

  return (
    <ErrorBoundary key={location.key} lang={safeLang}>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </ErrorBoundary>
  );
}

function InstituteLangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { isValidLang, safeLang, isCkbAlias } = useLanguageSetup(lang);

  if (isCkbAlias) {
    const targetPath = location.pathname.replace(/^\/ck(\/|$)/, '/ckb$1');
    return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
  }

  if (!isValidLang) {
    return <Navigate to="/en/institute" replace />;
  }

  return (
    <ErrorBoundary key={location.key} lang={safeLang}>
      <InstituteLayout lang={safeLang}>
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </InstituteLayout>
    </ErrorBoundary>
  );
}

function SummitLangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { isValidLang, safeLang, isCkbAlias } = useLanguageSetup(lang);

  if (isCkbAlias) {
    const targetPath = location.pathname.replace(/^\/ck(\/|$)/, '/ckb$1');
    return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
  }

  if (!isValidLang) {
    return <Navigate to="/en/summit" replace />;
  }

  return (
    <ErrorBoundary key={location.key} lang={safeLang}>
      <Suspense fallback={<PageSkeleton />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
}

function SettlementLangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { isValidLang, safeLang, isCkbAlias } = useLanguageSetup(lang);

  if (isCkbAlias) {
    const targetPath = location.pathname.replace(/^\/ck(\/|$)/, '/ckb$1');
    return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
  }

  if (!isValidLang) {
    return <Navigate to="/en/settlement" replace />;
  }

  return (
    <ErrorBoundary key={location.key} lang={safeLang}>
      <Suspense fallback={<PageSkeleton />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
}

const router = createBrowserRouter([
  { path: "/", element: <RootRedirect /> },
  { path: "/institute", element: <InstituteRootRedirect /> },
  { path: "/institute/*", element: <InstituteRootRedirect /> },
  { path: "/summit", element: <SummitRootRedirect /> },
  { path: "/summit/*", element: <SummitRootRedirect /> },
  { path: "/admin", element: <AdminRootRedirect /> },
  { path: "/admin/*", element: <AdminRootRedirect /> },
  { path: "/ck", element: <KurdishAliasRedirect /> },
  { path: "/ck/*", element: <KurdishAliasRedirect /> },
  { path: "/live/*", element: <Navigate to="/en" replace /> },
  { path: "/newsroom", element: <NewsroomRootRedirect /> },
  { path: "/newsroom/*", element: <NewsroomRootRedirect /> },
  { path: "/news", element: <NewsroomRootRedirect /> },
  { path: "/news/*", element: <NewsroomRootRedirect /> },
  { path: "/news-room", element: <NewsroomRootRedirect /> },
  { path: "/news-room/*", element: <NewsroomRootRedirect /> },
  { path: "/article/*", element: <NewsroomRootRedirect /> },
  { path: "/category/*", element: <NewsroomRootRedirect /> },
  { path: "/settlement", element: <SettlementRootRedirect /> },
  { path: "/settlement/*", element: <SettlementRootRedirect /> },
  { path: "/settlement-sourcing", element: <SettlementRootRedirect /> },
  { path: "/settlement-sourcing/*", element: <SettlementRootRedirect /> },
  { path: "/cultural-exchange", element: <RootRedirect /> },
  {
    path: "/:lang/settlement",
    element: <SettlementLangWrapper />,
    children: [
      { index: true, element: <SettlementLandingPage /> },
      { path: "about", element: <SettlementAboutPage /> },
      { path: "how-it-works", element: <SettlementHowItWorksPage /> },
      { path: "compliance", element: <SettlementCompliancePage /> },
      { path: "fees", element: <SettlementFeesPage /> },
      { path: "calculator", element: <SettlementCalculatorPage /> },
      { path: "tracker", element: <SettlementTrackerPublicPage /> },
      { path: "tracker/:referenceId", element: <SettlementTrackerDetailPage /> },
      { path: "gateway", element: <SettlementGatewayPage /> },
      { path: "gateway/checkout", element: <SettlementCheckoutPage /> },
      { path: "inquiry", element: <SettlementInquiryPage /> },
      { path: "inquiry/confirmation", element: <SettlementConfirmationPage /> },
      { path: "card", element: <SettlementCardLandingPage /> },
      { path: "card/register", element: <SettlementCardRegisterPage /> },
      { path: "card/generate", element: <SettlementCardGeneratePage /> },
      { path: "faq", element: <SettlementFaqPage /> },
      { path: "contact", element: <SettlementContactPage /> },
      { path: "legal", element: <SettlementLegalPage /> },
    ]
  },
  {
    path: "/:lang/summit",
    element: <SummitLangWrapper />,
    children: [
      { index: true, element: <SummitLandingPage /> },
      { path: "about-sulaymaniyah", element: <SummitAboutSulaymaniyah /> },
      { path: "agenda", element: <SummitAgendaPage /> },
      { path: "speakers", element: <SummitSpeakersPage /> },
      { path: "expo", element: <SummitExpoPage /> },
      { path: "expo/sectors/:slug", element: <SummitSectorPavilionPage /> },
      { path: "floor-plan", element: <SummitFloorPlanPage /> },
      { path: "register/exhibitor", element: <SummitExhibitorRegisterPage /> },
      { path: "register/visitor", element: <SummitVisitorRegisterPage /> },
      { path: "register/vip", element: <SummitVipRegisterPage /> },
      { path: "services", element: <SummitServicesPage /> },
      { path: "services/request", element: <SummitServiceRequestPage /> },
      { path: "services/:slug", element: <SummitServiceDetailPage /> },
      { path: "b2b", element: <SummitB2BMatchmakingPage /> },
      { path: "sponsors", element: <SummitSponsorsPage /> },
      { path: "media", element: <SummitMediaPage /> },
      { path: "faq", element: <SummitFaqPage /> },
      { path: "contact", element: <SummitContactPage /> },
    ]
  },
  {
    path: "/:lang",
    element: <LangWrapper />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "newsroom", element: <NewsroomLandingPage /> },
      { path: "newsroom/:slug", element: <NewsroomArticleDetailPage /> },
      { path: "newsroom/category/:category", element: <NewsroomCategoryPage /> },
      { path: "newsroom/tag/:tag", element: <NewsroomTagPage /> },
      { path: "newsroom/author/:author", element: <NewsroomAuthorPage /> },
      { path: "newsroom/archive", element: <NewsroomArchivePage /> },
      { path: "newsroom/search", element: <NewsroomSearchPage /> },
      { path: "newsroom/feed/:feedType", element: <NewsroomFeedViewer /> },
      { path: "news", element: <LegacyNewsRedirect /> },
      { path: "news/*", element: <LegacyNewsRedirect /> },
      { path: "news-room", element: <LegacyNewsRedirect /> },
      { path: "news-room/*", element: <LegacyNewsRedirect /> },
      { path: "article/*", element: <LegacyNewsRedirect /> },
      { path: "category/*", element: <LegacyNewsRedirect /> },
      { path: "summit", element: <SummitPage /> },
      { path: "join", element: <JoinUs /> },
      { path: "women", element: <WomenPage /> },
      { path: "tourism", element: <TourismPage /> },
      { path: "cultural-exchange", element: <CulturalExchangePage /> },
      { path: "books", element: <BooksPage /> },
      { path: "podcasts", element: <PodcastsPage /> },
      { path: "ica-plus", element: <IcaPlusPage /> },
      { path: "visa-flights", element: <VisaFlightPage /> },
    ]
  },
  {
    path: "/:lang/institute",
    element: <InstituteLangWrapper />,
    children: [
      { index: true, element: <InstituteHome /> },
      { path: "about", element: <AboutInstitute /> },
      { path: "research", element: <ResearchPillars /> },
      { path: "research/:pillar", element: <ResearchPillarDetail /> },
      { path: "publications", element: <PublicationsArchive /> },
      { path: "publications/:slug", element: <PublicationDetail /> },
      { path: "data-hub", element: <DataHub /> },
      { path: "data-hub/trade", element: <DataHubTradeExplorer /> },
      { path: "data-hub/trade-explorer", element: <DataHubTradeExplorer /> },
      { path: "data-hub/corridor", element: <DataHubCorridorTracker /> },
      { path: "data-hub/corridor-tracker", element: <DataHubCorridorTracker /> },
      { path: "data-hub/projects", element: <DataHubBRIProjects /> },
      { path: "data-hub/bri-projects", element: <DataHubBRIProjects /> },
      { path: "data-hub/methodology", element: <DataHubMethodology /> },
      { path: "experts", element: <ExpertsDirectory /> },
      { path: "experts/:id", element: <ExpertProfile /> },
      { path: "partnerships", element: <Partnerships /> },
      { path: "events", element: <EventsCalendar /> },
      // Bilateral Visa Centre
      { path: "visa-centre", element: <VisaCentreLanding /> },
      // Chinese Centre
      { path: "chinese-center", element: <ChineseCentreLanding /> },
      { path: "chinese-center/enroll", element: <ChineseCentreLanding view="enroll" /> },
      { path: "chinese-center/courses", element: <ChineseCentreLanding view="courses" /> },
      { path: "chinese-center/testing", element: <ChineseCentreLanding view="testing" /> },
      { path: "chinese-center/testing/register", element: <ChineseCentreLanding view="testing-register" /> },
      { path: "chinese-center/certificates", element: <ChineseCentreLanding view="certificates" /> },
      { path: "chinese-center/instructors", element: <ChineseCentreLanding view="instructors" /> },
      { path: "chinese-center/instructors/:id", element: <ChineseCentreLanding view="instructor-detail" /> },
      { path: "chinese-center/faq", element: <ChineseCentreLanding view="faq" /> },
      { path: "chinese-center/contact", element: <ChineseCentreLanding view="contact" /> },
      { path: "chinese-center/*", element: <ChineseCentreLanding /> },
      { path: "visa-centre/about", element: <VisaCentreAbout /> },
      { path: "visa-centre/services", element: <VisaCentreServices /> },
      { path: "visa-centre/services/:slug", element: <VisaCentreServiceDetail /> },
      { path: "visa-centre/visa-types", element: <VisaCentreTypes /> },
      { path: "visa-centre/visa-types/:direction/:category", element: <VisaCentreCategoryDetail /> },
      { path: "visa-centre/requirements", element: <VisaCentreRequirements /> },
      { path: "visa-centre/fees", element: <VisaCentreFees /> },
      { path: "visa-centre/process", element: <VisaCentreProcess /> },
      { path: "visa-centre/appointments", element: <VisaCentreAppointments /> },
      { path: "visa-centre/apply", element: <VisaCentreApply /> },
      { path: "visa-centre/track", element: <VisaCentreTrack /> },
      { path: "visa-centre/news", element: <VisaCentreNews /> },
      { path: "visa-centre/faq", element: <VisaCentreFaq /> },
      { path: "visa-centre/contact", element: <VisaCentreContact /> },
      { path: "visa-centre/disclaimer", element: <VisaCentreDisclaimer /> },
    ]
  },
  {
    path: "/:lang",
    element: <ImmersiveLangWrapper />,
    children: [
      { path: "live", element: <LivePortal /> },
      { path: "live/:slug", element: <LiveEventPage /> }
    ]
  },
  {
    path: "/:lang/admin",
    element: <AdminLangWrapper />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "articles", element: <AdminArticles /> },
      { path: "articles/new", element: <AdminArticleNew /> },
      { path: "articles/:id", element: <AdminArticleNew /> },
      { path: "women", element: <AdminWomen /> },
      { path: "tourism", element: <AdminTourism /> },
      { path: "cultural-exchange", element: <AdminCulturalExchange /> },
      { path: "visa-flights", element: <AdminVisaFlight /> },
      { path: "podcasts", element: <AdminIcaPlus /> },
      { path: "icaplus", element: <AdminIcaPlus /> },
      { path: "live-events", element: <AdminLiveEvents /> },
      { path: "books", element: <AdminBooks /> },
      { path: "finance-economics", element: <AdminFinanceEconomics /> },
      { path: "market", element: <AdminFinanceEconomics /> },
      { path: "payments", element: <AdminPayments /> },
      { path: "partners", element: <AdminPartners /> },
      { path: "business", element: <AdminBusiness /> },
      { path: "sourcing", element: <AdminSourcing /> },
                { path: "audit-logs", element: <AdminAuditLogs /> },
          { path: "brics", element: <AdminBrics /> },
          { path: "chinese-products", element: <AdminChineseProducts /> },
          { path: "visa-centre", element: <AdminVisaCentre /> },
          { path: "users", element: <AdminUsers /> },
      { path: "media", element: <AdminMedia /> },
      { path: "settings", element: <AdminSettings /> }
    ]
  },
  { path: "*", element: <NotFound /> }
]);

export default function App() { 
  const initializeAuth = useAuthStore(state => state.initialize); 
  
  useEffect(() => { 
    initializeAuth(); 
  }, [initializeAuth]);
  
  return (
    <ErrorBoundary lang="en">
      <QueryClientProvider client={queryClient}>
        <ThemeApplier />
        {process.env.NODE_ENV === 'development' && <DevBuildInfoBadge />}
        <Toaster 
          position="top-right" 
          richColors 
          closeButton 
          theme="system"
          toastOptions={{
            style: {
              borderRadius: '12px',
              fontFamily: 'inherit',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
          }}
        />
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="w-12 h-12 border-4 border-brand-800 border-t-transparent rounded-full animate-spin"></div></div>}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

