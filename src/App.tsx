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
import { CiseCommandHubLayout } from './components/CiseCommandHubLayout';
import { NewsroomLayout } from './components/newsroom/NewsroomLayout';
import { LivePortalLayout } from './components/live/LivePortalLayout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useSiteStore } from './store/useSiteStore';
import { DevBuildInfoBadge } from './components/DevBuildInfoBadge';
import { PageSkeleton } from './components/PageSkeleton';
import { BottomNav } from './components/mobile/BottomNav';

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
    try {
      const mod = await factory();
      return mod.default ? mod : { default: mod };
    } catch (error: any) {
      console.warn('Initial chunk load error, attempting retry...', error);
      try {
        await new Promise((resolve) => setTimeout(resolve, 600));
        const mod = await factory();
        return mod.default ? mod : { default: mod };
      } catch (retryError: any) {
        console.warn('Second chunk attempt failed:', retryError);
        if (typeof window !== 'undefined') {
          const reloadKey = 'last_chunk_reload_timestamp';
          const lastReload = parseInt(window.sessionStorage.getItem(reloadKey) || '0', 10);
          const now = Date.now();
          // If we haven't reloaded within the last 10 seconds, force a reload to get latest manifest
          if (now - lastReload > 10000) {
            window.sessionStorage.setItem(reloadKey, now.toString());
            window.location.reload();
            return new Promise<{ default: T }>(() => {});
          }
        }
        // Graceful non-crashing component fallback
        return {
          default: (() => (
            <div className="min-h-[50vh] flex items-center justify-center p-6 text-center">
              <div className="max-w-md p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-red-200 dark:border-neutral-800 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Content Updated
                </h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mb-4 leading-relaxed">
                  This section has been updated with the latest sovereign dispatches. Please refresh to view.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          )) as unknown as T
        };
      }
    }
  });
}

const CiseCommandHubDashboard = lazyWithRetry(() => import('./pages/CiseCommandHubDashboard').then(m => ({ default: m.CiseCommandHubDashboard })));
const SearchPage = lazyWithRetry(() => import('./pages/SearchPage'));
const CiseCommandHubArticles = lazyWithRetry(() => import('./pages/CiseCommandHubArticles').then(m => ({ default: m.CiseCommandHubArticles })));
const CiseCommandHubArticleNew = lazyWithRetry(() => import('./pages/CiseCommandHubArticleNew').then(m => ({ default: m.CiseCommandHubArticleNew })));
const CiseCommandHubAuditLogs = lazyWithRetry(() => import('./pages/CiseCommandHubAuditLogs').then(m => ({ default: m.CiseCommandHubAuditLogs })));
const CiseCommandHubBrics = lazyWithRetry(() => import('./pages/CiseCommandHubBrics').then(m => ({ default: m.CiseCommandHubBrics })));
const CiseCommandHubChineseProducts = lazyWithRetry(() => import('./pages/CiseCommandHubChineseProducts').then(m => ({ default: m.CiseCommandHubChineseProducts })));
const CiseCommandHubBusiness = lazyWithRetry(() => import('./pages/CiseCommandHubBusiness'));
const CiseCommandHubVideos = lazyWithRetry(() => import('./pages/CiseCommandHubVideos'));
const CiseCommandHubUsers = lazyWithRetry(() => import('./pages/CiseCommandHubUsers').then(m => ({ default: m.CiseCommandHubUsers })));
const CiseCommandHubMedia = lazyWithRetry(() => import('./pages/CiseCommandHubMedia').then(m => ({ default: m.CiseCommandHubMedia })));
const CiseCommandHubSettings = lazyWithRetry(() => import('./pages/CiseCommandHubSettings').then(m => ({ default: m.CiseCommandHubSettings })));
const CiseCommandHubLanguages = lazyWithRetry(() => import('./components/hub/CiseCommandHubLanguages').then(m => ({ default: m.CiseCommandHubLanguages })));
const About = lazyWithRetry(() => import('./pages/About').then(m => ({ default: m.About })));
const JoinUs = lazyWithRetry(() => import('./pages/JoinUs').then(m => ({ default: m.JoinUs })));
const PodcastsPage = lazyWithRetry(() => import('./pages/PodcastsPage'));
const IcaPlusPage = lazyWithRetry(() => import('./pages/IcaPlusPage').then(m => ({ default: m.IcaPlusPage })));
const CiseCommandHubIcaPlus = lazyWithRetry(() => import('./pages/CiseCommandHubIcaPlus'));
const CiseCommandHubPodcasts = lazyWithRetry(() => import('./pages/CiseCommandHubPodcasts'));
const CiseCommandHubLiveEvents = lazyWithRetry(() => import('./pages/CiseCommandHubLiveEvents'));
const CiseCommandHubPartners = lazyWithRetry(() => import('./pages/CiseCommandHubPartners'));
const CiseCommandHubSourcing = lazyWithRetry(() => import('./pages/CiseCommandHubSourcing'));
const CiseCommandHubFinanceEconomics = lazyWithRetry(() => import('./pages/CiseCommandHubFinanceEconomics').then(m => ({ default: m.CiseCommandHubFinanceEconomics })));
const CiseCommandHubPayments = lazyWithRetry(() => import('./pages/CiseCommandHubPayments').then(m => ({ default: m.CiseCommandHubPayments })));
const CulturalExchangeLanding = lazyWithRetry(() => import('./pages/institute/cultural-exchange/CulturalExchangeLanding').then(m => ({ default: m.CulturalExchangeLanding })));
const CulturalExchangePrograms = lazyWithRetry(() => import('./pages/institute/cultural-exchange/CulturalExchangePrograms').then(m => ({ default: m.CulturalExchangePrograms })));
const CulturalExchangeProgramDetail = lazyWithRetry(() => import('./pages/institute/cultural-exchange/CulturalExchangeProgramDetail').then(m => ({ default: m.CulturalExchangeProgramDetail })));
const CulturalExchangePartners = lazyWithRetry(() => import('./pages/institute/cultural-exchange/CulturalExchangePartners').then(m => ({ default: m.CulturalExchangePartners })));
const CulturalExchangeApply = lazyWithRetry(() => import('./pages/institute/cultural-exchange/CulturalExchangeApply').then(m => ({ default: m.CulturalExchangeApply })));
const CulturalExchangeFAQ = lazyWithRetry(() => import('./pages/institute/cultural-exchange/CulturalExchangeFAQ').then(m => ({ default: m.CulturalExchangeFAQ })));
const CulturalExchangeContact = lazyWithRetry(() => import('./pages/institute/cultural-exchange/CulturalExchangeContact').then(m => ({ default: m.CulturalExchangeContact })));
const CiseCommandHubCulturalExchange = lazyWithRetry(() => import('./pages/CiseCommandHubCulturalExchange'));

// Portal 1: ICA Public Portal Pages
const IcaPublicHome = lazyWithRetry(() => import('./pages/public/IcaPublicHome').then(m => ({ default: m.IcaPublicHome })));
const IcaWorldPage = lazyWithRetry(() => import('./pages/public/IcaWorldPage').then(m => ({ default: m.IcaWorldPage })));
const IcaTrendingPage = lazyWithRetry(() => import('./pages/public/IcaTrendingPage').then(m => ({ default: m.IcaTrendingPage })));
const IcaInitiativesPage = lazyWithRetry(() => import('./pages/public/IcaInitiativesPage').then(m => ({ default: m.IcaInitiativesPage })));
const IcaInitiativeDetailPage = lazyWithRetry(() => import('./pages/public/IcaInitiativeDetailPage').then(m => ({ default: m.IcaInitiativeDetailPage })));
const IcaFeaturedPage = lazyWithRetry(() => import('./pages/public/IcaFeaturedPage').then(m => ({ default: m.IcaFeaturedPage })));
const IcaMediaPage = lazyWithRetry(() => import('./pages/public/IcaMediaPage').then(m => ({ default: m.IcaMediaPage })));
const IcaAboutPage = lazyWithRetry(() => import('./pages/public/IcaAboutPage').then(m => ({ default: m.IcaAboutPage })));
const IcaContactPage = lazyWithRetry(() => import('./pages/public/IcaContactPage').then(m => ({ default: m.IcaContactPage })));

// Portal 2: CISE Command Hub Pages
const SecretariatHubLayout = lazyWithRetry(() => import('./pages/secretariat/SecretariatHubLayout').then(m => ({ default: m.SecretariatHubLayout })));
const SecretariatDashboard = lazyWithRetry(() => import('./pages/secretariat/SecretariatDashboard').then(m => ({ default: m.SecretariatDashboard })));
const SecretariatContentCrud = lazyWithRetry(() => import('./pages/secretariat/SecretariatContentCrud').then(m => ({ default: m.SecretariatContentCrud })));
const SecretariatInitiativesCrud = lazyWithRetry(() => import('./pages/secretariat/SecretariatInitiativesCrud').then(m => ({ default: m.SecretariatInitiativesCrud })));
const SecretariatMediaCrud = lazyWithRetry(() => import('./pages/secretariat/SecretariatMediaCrud').then(m => ({ default: m.SecretariatMediaCrud })));
const SecretariatNewsletterCrud = lazyWithRetry(() => import('./pages/secretariat/SecretariatNewsletterCrud').then(m => ({ default: m.SecretariatNewsletterCrud })));
const SecretariatFormsCrud = lazyWithRetry(() => import('./pages/secretariat/SecretariatFormsCrud').then(m => ({ default: m.SecretariatFormsCrud })));
const SecretariatUsersCrud = lazyWithRetry(() => import('./pages/secretariat/SecretariatUsersCrud').then(m => ({ default: m.SecretariatUsersCrud })));
const SecretariatAuditCrud = lazyWithRetry(() => import('./pages/secretariat/SecretariatAuditCrud').then(m => ({ default: m.SecretariatAuditCrud })));
const SecretariatSettings = lazyWithRetry(() => import('./pages/secretariat/SecretariatSettings').then(m => ({ default: m.SecretariatSettings })));

// Portal 3: ICA Newsroom Pages
const NewsroomLandingPage = lazyWithRetry(() => import('./pages/newsroom/NewsroomLandingPage').then(m => ({ default: m.NewsroomLandingPage })));
const NewsroomArticleDetailPage = lazyWithRetry(() => import('./pages/newsroom/NewsroomArticleDetailPage').then(m => ({ default: m.NewsroomArticleDetailPage })));
const NewsroomCategoryPage = lazyWithRetry(() => import('./pages/newsroom/NewsroomCategoryPage').then(m => ({ default: m.NewsroomCategoryPage })));
const NewsroomTagPage = lazyWithRetry(() => import('./pages/newsroom/NewsroomTagPage').then(m => ({ default: m.NewsroomTagPage })));
const NewsroomAuthorPage = lazyWithRetry(() => import('./pages/newsroom/NewsroomAuthorPage').then(m => ({ default: m.NewsroomAuthorPage })));
const NewsroomArchivePage = lazyWithRetry(() => import('./pages/newsroom/NewsroomArchivePage').then(m => ({ default: m.NewsroomArchivePage })));
const NewsroomSearchPage = lazyWithRetry(() => import('./pages/newsroom/NewsroomSearchPage').then(m => ({ default: m.NewsroomSearchPage })));
const NewsroomFeedPage = lazyWithRetry(() => import('./pages/newsroom/NewsroomFeedPage').then(m => ({ default: m.NewsroomFeedPage })));
const NewsroomSitemapPage = lazyWithRetry(() => import('./pages/newsroom/NewsroomSitemapPage').then(m => ({ default: m.NewsroomSitemapPage })));

// Portal 4: Live Portal & Enriched Media Hub Pages
const LiveLandingPage = lazyWithRetry(() => import('./pages/live/LiveLandingPage').then(m => ({ default: m.LiveLandingPage })));
const LiveNowPage = lazyWithRetry(() => import('./pages/live/LiveNowPage').then(m => ({ default: m.LiveNowPage })));
const LiveSchedulePage = lazyWithRetry(() => import('./pages/live/LiveSchedulePage').then(m => ({ default: m.LiveSchedulePage })));
const LiveMoviesPage = lazyWithRetry(() => import('./pages/live/LiveMoviesPage').then(m => ({ default: m.LiveMoviesPage })));
const LiveDramaPage = lazyWithRetry(() => import('./pages/live/LiveDramaPage').then(m => ({ default: m.LiveDramaPage })));
const LiveDocumentaryPage = lazyWithRetry(() => import('./pages/live/LiveDocumentaryPage').then(m => ({ default: m.LiveDocumentaryPage })));
const LiveExchangePage = lazyWithRetry(() => import('./pages/live/LiveExchangePage').then(m => ({ default: m.LiveExchangePage })));
const LiveArchivePage = lazyWithRetry(() => import('./pages/live/LiveArchivePage').then(m => ({ default: m.LiveArchivePage })));
const LiveSearchPage = lazyWithRetry(() => import('./pages/live/LiveSearchPage').then(m => ({ default: m.LiveSearchPage })));
const LiveRssFeedPage = lazyWithRetry(() => import('./pages/live/LiveRssFeedPage').then(m => ({ default: m.LiveRssFeedPage })));
const LiveDetailVideoPage = lazyWithRetry(() => import('./pages/live/LiveDetailVideoPage').then(m => ({ default: m.LiveDetailVideoPage })));

const InstituteHub = lazyWithRetry(() => import('./pages/InstituteHub').then(m => ({ default: m.InstituteHub })));
const CommandHubPage = lazyWithRetry(() => import('./pages/CommandHubPage').then(m => ({ default: m.CommandHubPage })));
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
const InsuranceFacilitationPage = lazyWithRetry(() => import('./pages/institute/InsuranceFacilitationPage').then(m => ({ default: m.InsuranceFacilitationPage })));
const CiseServicesDirectory = lazyWithRetry(() => import('./pages/institute/CiseServicesDirectory').then(m => ({ default: m.CiseServicesDirectory })));
const CiseCommandHubVisaCentre = lazyWithRetry(() => import('./pages/CiseCommandHubVisaCentre').then(m => ({ default: m.CiseCommandHubVisaCentre })));

// Strategic Financial & Legal Consultancy
const ConsultancyLanding = lazyWithRetry(() => import('./pages/consultancy/ConsultancyLanding').then(m => ({ default: m.ConsultancyLanding })));
const ConsultancyIraqBound = lazyWithRetry(() => import('./pages/consultancy/ConsultancyIraqBound').then(m => ({ default: m.ConsultancyIraqBound })));
const ConsultancyChinaBound = lazyWithRetry(() => import('./pages/consultancy/ConsultancyChinaBound').then(m => ({ default: m.ConsultancyChinaBound })));
const ConsultancyBilateral = lazyWithRetry(() => import('./pages/consultancy/ConsultancyBilateral').then(m => ({ default: m.ConsultancyBilateral })));
const ConsultancyInquiry = lazyWithRetry(() => import('./pages/consultancy/ConsultancyInquiry').then(m => ({ default: m.ConsultancyInquiry })));
const ConsultancyAbout = lazyWithRetry(() => import('./pages/consultancy/ConsultancyMisc').then(m => ({ default: m.ConsultancyAbout })));
const ConsultancyFAQ = lazyWithRetry(() => import('./pages/consultancy/ConsultancyMisc').then(m => ({ default: m.ConsultancyFAQ })));
const ConsultancyContact = lazyWithRetry(() => import('./pages/consultancy/ConsultancyMisc').then(m => ({ default: m.ConsultancyContact })));
const ConsultancyLegal = lazyWithRetry(() => import('./pages/consultancy/ConsultancyMisc').then(m => ({ default: m.ConsultancyLegal })));

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
  const { brandColor, inkColor, paperColor } = useSiteStore();
  
  useEffect(() => {
    try {
      const root = document.documentElement;
      root.classList.remove('dark');
      document.body?.classList.remove('dark');

      const safeInk = (!inkColor || ['#ffffff', '#fff', '#fafafa', '#f4f4f5', '#f8fafc'].includes(inkColor.toLowerCase().trim()))
        ? 'var(--color-ink-900)'
        : inkColor;
      const safePaper = (!paperColor || ['#000000', '#000', '#09090b', 'var(--color-ink-900)'].includes(paperColor.toLowerCase().trim()))
        ? '#ffffff'
        : paperColor;
      root.style.setProperty('--color-ink-900', safeInk);
      root.style.setProperty('--color-paper-50', safePaper);

      if (brandColor) {
        const bc = (brandColor && brandColor.startsWith('#') && brandColor !== '#8B0000' && brandColor !== '#990000' && brandColor !== '#C91C24' && brandColor !== '#800000' && brandColor !== '#a30000') 
          ? brandColor 
          : 'var(--color-brand-800)';
        root.style.setProperty('--color-brand-950', bc);
        root.style.setProperty('--color-brand-900', bc);
        root.style.setProperty('--color-brand-800', bc);
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
  }, [brandColor, inkColor, paperColor]);
  
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
  const searchParams = new URLSearchParams(location.search);
  // Welcoming entrance signal when visitors enter the global link
  searchParams.set('welcome', '1');
  const searchStr = `?${searchParams.toString()}`;
  return <Navigate to={`/${loc}${searchStr}${location.hash}`} replace />;
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

function CiseCommandHubRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const adminSubPath = location.pathname.replace(/^\/hub-admin/, '');
  return <Navigate to={`/${loc}/hub/management${adminSubPath}${location.search}${location.hash}`} replace />;
}

function SettlementRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const settlementSubPath = location.pathname.replace(/^\/settlement(-sourcing)?/, '');
  return <Navigate to={`/${loc}/settlement${settlementSubPath}${location.search}${location.hash}`} replace />;
}

function ConsultancyRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const consultancySubPath = location.pathname.replace(/^\/consultancy/, '');
  return <Navigate to={`/${loc}/institute/consultancy${consultancySubPath}${location.search}${location.hash}`} replace />;
}

function NewsroomRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const isCategory = location.pathname.startsWith('/category');
  const subPath = location.pathname.replace(/^\/(newsroom|news-room|news|article|category)/, '');
  const targetPath = isCategory ? `/category${subPath}` : subPath;
  return <Navigate to={`/${loc}/newsroom${targetPath}${location.search}${location.hash}`} replace />;
}

function LegacyInsuranceRedirect() {
  const { lang } = useParams<{ lang: string }>();
  return <Navigate to={`/${lang || 'en'}/institute/insurance-facilitation`} replace />;
}

function CulturalExchangeRootRedirect() {
  const location = useLocation();
  const loc = (typeof window !== 'undefined' ? localStorage.getItem('ica_lang') : null) || 'en';
  const subPath = location.pathname.replace(/^\/cultural-exchange/, '');
  return <Navigate to={`/${loc}/institute/services/cultural-exchange${subPath}${location.search}${location.hash}`} replace />;
}

function LegacyCulturalExchangeRedirect() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const cleanLang = (lang === 'ck' || lang === 'ku') ? 'ckb' : (lang || 'en');
  const subPath = location.pathname.replace(/^\/[^/]+\/cultural-exchange/, '');
  return <Navigate to={`/${cleanLang}/institute/services/cultural-exchange${subPath}${location.search}${location.hash}`} replace />;
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

function GenericRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const subPath = location.pathname;
  return <Navigate to={`/${loc}${subPath}${location.search}${location.hash}`} replace />;
}

function IcaPlusRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const subPath = location.pathname.replace(/^\/ica-plus/, '/media/ica-plus');
  return <Navigate to={`/${loc}${subPath}${location.search}${location.hash}`} replace />;
}

function InstituteServiceSummitRedirect() {
  const { lang } = useParams<{ lang: string }>();
  return <Navigate to={`/${lang || 'en'}/summit`} replace />;
}

function InstituteServiceSettlementRedirect() {
  const { lang } = useParams<{ lang: string }>();
  return <Navigate to={`/${lang || 'en'}/settlement`} replace />;
}

function KurdishAliasRedirect() {
  const location = useLocation();
  const targetPath = location.pathname.replace(/^\/ck(\/|$)/, '/ckb$1');
  return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
}

function SecretariatRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const subPath = location.pathname.replace(/^\/secretariat/, '');
  return <Navigate to={`/${loc}/secretariat${subPath}${location.search}${location.hash}`} replace />;
}

function LiveRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const subPath = location.pathname.replace(/^\/live/, '');
  return <Navigate to={`/${loc}/live${subPath}${location.search}${location.hash}`} replace />;
}

function PublicPortalRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const subPath = location.pathname.replace(/^\/(portal|public)/, '');
  const searchParams = new URLSearchParams(location.search);
  searchParams.set('welcome', '1');
  const searchStr = `?${searchParams.toString()}`;
  return <Navigate to={`/${loc}/portal${subPath}${searchStr}${location.hash}`} replace />;
}

function SettingsRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const subPath = location.pathname.replace(/^\/settings/, '');
  return <Navigate to={`/${loc}/hub/management/settings${subPath}${location.search}${location.hash}`} replace />;
}

function ProfileRootRedirect() {
  const loc = resolveLocaleFromEnvironment();
  const location = useLocation();
  const subPath = location.pathname.replace(/^\/profile/, '');
  return <Navigate to={`/${loc}/hub/management${subPath}${location.search}${location.hash}`} replace />;
}

function CiseCommandHubLanguagesWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const safeLang = (lang === 'ar' || lang === 'zh' || lang === 'ckb' ? lang : 'en') as any;
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CiseCommandHubLanguages lang={safeLang} />
    </Suspense>
  );
}

function SecretariatLangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { isValidLang, safeLang, isCkbAlias } = useLanguageSetup(lang);

  if (isCkbAlias) {
    const targetPath = location.pathname.replace(/^\/ck(\/|$)/, '/ckb$1');
    return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
  }

  if (!isValidLang) {
    return <Navigate to="/en/secretariat" replace />;
  }

  return (
    <ErrorBoundary lang={safeLang}>
      <Suspense fallback={<PageSkeleton />}>
        <div className="pb-16 sm:pb-20 xl:pb-0">
          <Outlet />
        </div>
      </Suspense>
      <BottomNav lang={safeLang} />
    </ErrorBoundary>
  );
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
    <ErrorBoundary lang={safeLang}>
      <Layout lang={safeLang}>
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
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
    <ErrorBoundary lang={safeLang}>
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans transition-colors duration-300 pb-16 sm:pb-20 xl:pb-0">
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </div>
      <BottomNav lang={safeLang} />
    </ErrorBoundary>
  );
}

function CiseCommandHubLangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { isValidLang, safeLang, isCkbAlias } = useLanguageSetup(lang);

  if (isCkbAlias) {
    const targetPath = location.pathname.replace(/^\/ck(\/|$)/, '/ckb$1');
    return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
  }

  if (!isValidLang) {
    return <Navigate to="/../hub/management" replace />;
  }

  return (
    <ErrorBoundary lang={safeLang}>
      <CiseCommandHubLayout>
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </CiseCommandHubLayout>
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
    <ErrorBoundary lang={safeLang}>
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
    <ErrorBoundary lang={safeLang}>
      <Suspense fallback={<PageSkeleton />}>
        <div className="pb-16 sm:pb-20 xl:pb-0">
          <Outlet />
        </div>
      </Suspense>
      <BottomNav lang={safeLang} />
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
    <ErrorBoundary lang={safeLang}>
      <Suspense fallback={<PageSkeleton />}>
        <div className="pb-16 sm:pb-20 xl:pb-0">
          <Outlet />
        </div>
      </Suspense>
      <BottomNav lang={safeLang} />
    </ErrorBoundary>
  );
}

const router = createBrowserRouter([
  { path: "/", element: <RootRedirect /> },
  {
    path: "/:lang/hub/management",
    element: <CiseCommandHubLangWrapper />,
    children: [
      { index: true, element: <CiseCommandHubDashboard /> },
      { path: "articles", element: <CiseCommandHubArticles /> },
      { path: "articles/new", element: <CiseCommandHubArticleNew /> },
      { path: "articles/:id", element: <CiseCommandHubArticleNew /> },
      { path: "cultural-exchange", element: <CiseCommandHubCulturalExchange /> },
      { path: "podcasts", element: <CiseCommandHubIcaPlus /> },
      { path: "icaplus", element: <CiseCommandHubIcaPlus /> },
      { path: "live-events", element: <CiseCommandHubLiveEvents /> },
      { path: "finance-economics", element: <CiseCommandHubFinanceEconomics /> },
      { path: "market", element: <CiseCommandHubFinanceEconomics /> },
      { path: "payments", element: <CiseCommandHubPayments /> },
      { path: "partners", element: <CiseCommandHubPartners /> },
      { path: "business", element: <CiseCommandHubBusiness /> },
      { path: "sourcing", element: <CiseCommandHubSourcing /> },
      { path: "audit-logs", element: <CiseCommandHubAuditLogs /> },
      { path: "brics", element: <CiseCommandHubBrics /> },
      { path: "chinese-products", element: <CiseCommandHubChineseProducts /> },
      { path: "visa-centre", element: <CiseCommandHubVisaCentre /> },
      { path: "users", element: <CiseCommandHubUsers /> },
      { path: "media", element: <CiseCommandHubMedia /> },
      { path: "languages", element: <CiseCommandHubLanguagesWrapper /> },
      { path: "settings", element: <CiseCommandHubSettings /> }
    ]
  },
  { path: "/hub", element: <CommandHubPage /> },
  { path: "/hub/*", element: <CommandHubPage /> },
  { path: "/:lang/hub", element: <CommandHubPage /> },
  { path: "/:lang/hub/*", element: <CommandHubPage /> },
  { path: "/institute", element: <InstituteRootRedirect /> },
  { path: "/institute/*", element: <InstituteRootRedirect /> },
  { path: "/summit", element: <SummitRootRedirect /> },
  { path: "/summit/*", element: <SummitRootRedirect /> },
  { path: "/hub/management", element: <CiseCommandHubRootRedirect /> },
  { path: "/hub/management/*", element: <CiseCommandHubRootRedirect /> },
  { path: "/secretariat", element: <SecretariatRootRedirect /> },
  { path: "/secretariat/*", element: <SecretariatRootRedirect /> },
  { path: "/portal", element: <PublicPortalRootRedirect /> },
  { path: "/portal/*", element: <PublicPortalRootRedirect /> },
  { path: "/public", element: <PublicPortalRootRedirect /> },
  { path: "/public/*", element: <PublicPortalRootRedirect /> },
  { path: "/live", element: <LiveRootRedirect /> },
  { path: "/live/*", element: <LiveRootRedirect /> },
  { path: "/ck", element: <KurdishAliasRedirect /> },
  { path: "/ck/*", element: <KurdishAliasRedirect /> },
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
  { path: "/consultancy", element: <ConsultancyRootRedirect /> },
  { path: "/consultancy/*", element: <ConsultancyRootRedirect /> },
  { path: "/cultural-exchange", element: <CulturalExchangeRootRedirect /> },
  { path: "/cultural-exchange/*", element: <CulturalExchangeRootRedirect /> },
  { path: "/world", element: <GenericRootRedirect /> },
  { path: "/world/*", element: <GenericRootRedirect /> },
  { path: "/trending", element: <GenericRootRedirect /> },
  { path: "/trending/*", element: <GenericRootRedirect /> },
  { path: "/initiatives", element: <GenericRootRedirect /> },
  { path: "/initiatives/*", element: <GenericRootRedirect /> },
  { path: "/featured", element: <GenericRootRedirect /> },
  { path: "/featured/*", element: <GenericRootRedirect /> },
  { path: "/media", element: <GenericRootRedirect /> },
  { path: "/media/*", element: <GenericRootRedirect /> },
  { path: "/about", element: <GenericRootRedirect /> },
  { path: "/about/*", element: <GenericRootRedirect /> },
  { path: "/contact", element: <GenericRootRedirect /> },
  { path: "/contact/*", element: <GenericRootRedirect /> },
  { path: "/books", element: <GenericRootRedirect /> },
  { path: "/books/*", element: <GenericRootRedirect /> },
  { path: "/tourism", element: <GenericRootRedirect /> },
  { path: "/tourism/*", element: <GenericRootRedirect /> },
  { path: "/women", element: <GenericRootRedirect /> },
  { path: "/women/*", element: <GenericRootRedirect /> },
  { path: "/podcasts", element: <GenericRootRedirect /> },
  { path: "/podcasts/*", element: <GenericRootRedirect /> },
  { path: "/ica-plus", element: <IcaPlusRootRedirect /> },
  { path: "/ica-plus/*", element: <IcaPlusRootRedirect /> },
  { path: "/visa-flights", element: <GenericRootRedirect /> },
  { path: "/visa-flights/*", element: <GenericRootRedirect /> },
  { path: "/settings", element: <SettingsRootRedirect /> },
  { path: "/settings/*", element: <SettingsRootRedirect /> },
  { path: "/profile", element: <ProfileRootRedirect /> },
  { path: "/profile/*", element: <ProfileRootRedirect /> },
  {
    path: "/:lang/institute/settlement",
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
    path: "/:lang/institute/summit",
    element: <SummitLangWrapper />,
    children: [
      { index: true, element: <SummitLandingPage /> },
      { path: "about-sulaymaniyah", element: <SummitAboutSulaymaniyah /> },
      { path: "agenda", element: <SummitAgendaPage /> },
      { path: "speakers", element: <SummitSpeakersPage /> },
      { path: "expo", element: <SummitExpoPage /> },
      { path: "expo/sectors/:slug", element: <SummitSectorPavilionPage /> },
      { path: "floor-plan", element: <SummitFloorPlanPage /> },
      { path: "expo/floor-plan", element: <Navigate to="../floor-plan" replace /> },
      { path: "services/insurance", element: <LegacyInsuranceRedirect /> },
      { path: "register/exhibitor", element: <SummitExhibitorRegisterPage /> },
      { path: "expo/register", element: <Navigate to="../register/exhibitor" replace /> },
      { path: "register/visitor", element: <SummitVisitorRegisterPage /> },
      { path: "expo/visitor-register", element: <Navigate to="../register/visitor" replace /> },
      { path: "register/vip", element: <SummitVipRegisterPage /> },
      { path: "services", element: <SummitServicesPage /> },
      { path: "services/request", element: <SummitServiceRequestPage /> },
      { path: "services/:slug", element: <SummitServiceDetailPage /> },
      { path: "b2b", element: <SummitB2BMatchmakingPage /> },
      { path: "b2b-matchmaking", element: <Navigate to="../b2b" replace /> },
      { path: "sponsors", element: <SummitSponsorsPage /> },
      { path: "media", element: <SummitMediaPage /> },
      { path: "faq", element: <SummitFaqPage /> },
      { path: "contact", element: <SummitContactPage /> },
    ]
  },
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
      { path: "expo/floor-plan", element: <Navigate to="../floor-plan" replace /> },
      { path: "services/insurance", element: <LegacyInsuranceRedirect /> },
      { path: "register/exhibitor", element: <SummitExhibitorRegisterPage /> },
      { path: "expo/register", element: <Navigate to="../register/exhibitor" replace /> },
      { path: "register/visitor", element: <SummitVisitorRegisterPage /> },
      { path: "expo/visitor-register", element: <Navigate to="../register/visitor" replace /> },
      { path: "register/vip", element: <SummitVipRegisterPage /> },
      { path: "services", element: <SummitServicesPage /> },
      { path: "services/request", element: <SummitServiceRequestPage /> },
      { path: "services/:slug", element: <SummitServiceDetailPage /> },
      { path: "b2b", element: <SummitB2BMatchmakingPage /> },
      { path: "b2b-matchmaking", element: <Navigate to="../b2b" replace /> },
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
      { path: "newsroom/archive", element: <NewsroomArchivePage /> },
      { path: "newsroom/search", element: <NewsroomSearchPage /> },
      { path: "newsroom/sitemap", element: <NewsroomSitemapPage /> },
      { path: "newsroom/feed", element: <NewsroomFeedPage /> },
      { path: "newsroom/feed/:feedType", element: <NewsroomFeedPage /> },
      { path: "newsroom/category/:category", element: <NewsroomCategoryPage /> },
      { path: "newsroom/tag/:tag", element: <NewsroomTagPage /> },
      { path: "newsroom/author/:author", element: <NewsroomAuthorPage /> },
      { path: "newsroom/:slug", element: <NewsroomArticleDetailPage /> },

      // ICA Public Portal
      { path: "portal", element: <IcaPublicHome /> },
      { path: "portal/world", element: <IcaWorldPage /> },
      { path: "portal/trending", element: <IcaTrendingPage /> },
      { path: "portal/initiatives", element: <IcaInitiativesPage /> },
      { path: "portal/initiatives/:id", element: <IcaInitiativeDetailPage /> },
      { path: "portal/featured", element: <IcaFeaturedPage /> },
      { path: "portal/media", element: <IcaMediaPage /> },
      { path: "portal/about", element: <IcaAboutPage /> },
      { path: "portal/contact", element: <IcaContactPage /> },
      { path: "public", element: <IcaPublicHome /> },
      { path: "public/world", element: <IcaWorldPage /> },
      { path: "public/trending", element: <IcaTrendingPage /> },
      { path: "public/initiatives", element: <IcaInitiativesPage /> },
      { path: "public/initiatives/:id", element: <IcaInitiativeDetailPage /> },
      { path: "public/featured", element: <IcaFeaturedPage /> },
      { path: "public/media", element: <IcaMediaPage /> },
      { path: "public/about", element: <IcaAboutPage /> },
      { path: "public/contact", element: <IcaContactPage /> },
      { path: "world", element: <IcaWorldPage /> },
      { path: "trending", element: <IcaTrendingPage /> },
      { path: "initiatives", element: <IcaInitiativesPage /> },
      { path: "initiatives/:id", element: <IcaInitiativeDetailPage /> },
      { path: "featured", element: <IcaFeaturedPage /> },
      { path: "media", element: <IcaMediaPage /> },
      { path: "contact", element: <IcaContactPage /> },
      { path: "news", element: <LegacyNewsRedirect /> },
      { path: "news/*", element: <LegacyNewsRedirect /> },
      { path: "news-room", element: <LegacyNewsRedirect /> },
      { path: "news-room/*", element: <LegacyNewsRedirect /> },
      { path: "article/*", element: <LegacyNewsRedirect /> },
      { path: "category/*", element: <LegacyNewsRedirect /> },
      { path: "join", element: <JoinUs /> },
      { path: "cultural-exchange", element: <LegacyCulturalExchangeRedirect /> },
      { path: "cultural-exchange/*", element: <LegacyCulturalExchangeRedirect /> },
      { path: "podcasts", element: <PodcastsPage /> },
      { path: "ica-plus", element: <Navigate to="../media/ica-plus" replace /> },
      { path: "media/ica-plus", element: <IcaPlusPage /> },
      { path: "consultancy", element: <ConsultancyLanding /> },
      { path: "consultancy/about", element: <ConsultancyAbout /> },
      { path: "consultancy/iraq-bound", element: <ConsultancyIraqBound /> },
      { path: "consultancy/china-bound", element: <ConsultancyChinaBound /> },
      { path: "consultancy/bilateral", element: <ConsultancyBilateral /> },
      { path: "consultancy/inquiry", element: <ConsultancyInquiry /> },
      { path: "consultancy/faq", element: <ConsultancyFAQ /> },
      { path: "consultancy/contact", element: <ConsultancyContact /> },
      { path: "consultancy/legal", element: <ConsultancyLegal /> },
    ]
  },
  {
    path: "/:lang/institute",
    element: <InstituteLangWrapper />,
    children: [
      { index: true, element: <InstituteHome /> },
      { path: "services", element: <CiseServicesDirectory /> },
      { path: "initiatives", element: <CiseServicesDirectory /> },
      { path: "about", element: <AboutInstitute /> },
      { path: "research", element: <ResearchPillars /> },
      { path: "research/:pillar", element: <ResearchPillarDetail /> },
      { path: "insurance-facilitation", element: <InsuranceFacilitationPage /> },
      { path: "services/insurance", element: <InsuranceFacilitationPage /> },
      { path: "insurance", element: <InsuranceFacilitationPage /> },
      { path: "services/summit", element: <InstituteServiceSummitRedirect /> },
      { path: "services/summit/*", element: <InstituteServiceSummitRedirect /> },
      { path: "services/settlement", element: <InstituteServiceSettlementRedirect /> },
      { path: "services/settlement/*", element: <InstituteServiceSettlementRedirect /> },
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
      { path: "visa-center", element: <VisaCentreLanding /> },
      { path: "services/visa-centre", element: <VisaCentreLanding /> },
      // Chinese Centre
      { path: "chinese-center", element: <ChineseCentreLanding /> },
      { path: "chinese-centre", element: <ChineseCentreLanding /> },
      { path: "services/chinese-center", element: <ChineseCentreLanding /> },
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
      { path: "chinese-centre/*", element: <ChineseCentreLanding /> },
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
      { path: "visa-center/*", element: <VisaCentreLanding /> },
      // Strategic Financial & Legal Consultancy
      { path: "consultancy", element: <ConsultancyLanding /> },
      { path: "services/consultancy", element: <ConsultancyLanding /> },
      { path: "consultancy/about", element: <ConsultancyAbout /> },
      { path: "consultancy/iraq-bound", element: <ConsultancyIraqBound /> },
      { path: "consultancy/china-bound", element: <ConsultancyChinaBound /> },
      { path: "consultancy/bilateral", element: <ConsultancyBilateral /> },
      { path: "consultancy/inquiry", element: <ConsultancyInquiry /> },
      { path: "consultancy/faq", element: <ConsultancyFAQ /> },
      { path: "consultancy/contact", element: <ConsultancyContact /> },
      { path: "consultancy/legal", element: <ConsultancyLegal /> },
      // People-to-People & Cultural Exchange (CISE First-Class Service)
      { path: "cultural-exchange", element: <CulturalExchangeLanding /> },
      { path: "cultural-exchange/programs", element: <CulturalExchangePrograms /> },
      { path: "cultural-exchange/programs/:slug", element: <CulturalExchangeProgramDetail /> },
      { path: "cultural-exchange/partners", element: <CulturalExchangePartners /> },
      { path: "cultural-exchange/apply", element: <CulturalExchangeApply /> },
      { path: "cultural-exchange/faq", element: <CulturalExchangeFAQ /> },
      { path: "cultural-exchange/contact", element: <CulturalExchangeContact /> },
      { path: "cultural-exchange/*", element: <CulturalExchangeLanding /> },
      { path: "services/cultural-exchange", element: <CulturalExchangeLanding /> },
      { path: "services/cultural-exchange/programs", element: <CulturalExchangePrograms /> },
      { path: "services/cultural-exchange/programs/:slug", element: <CulturalExchangeProgramDetail /> },
      { path: "services/cultural-exchange/partners", element: <CulturalExchangePartners /> },
      { path: "services/cultural-exchange/apply", element: <CulturalExchangeApply /> },
      { path: "services/cultural-exchange/faq", element: <CulturalExchangeFAQ /> },
      { path: "services/cultural-exchange/contact", element: <CulturalExchangeContact /> },
      { path: "services/cultural-exchange/*", element: <CulturalExchangeLanding /> },
      { path: "settings", element: <Navigate to="../hub/management/settings" replace /> },
      { path: "profile", element: <Navigate to="../hub/management" replace /> },
    ]
  },
  {
    path: "/:lang",
    element: <ImmersiveLangWrapper />,
    children: [
      { path: "live", element: <LiveLandingPage /> },
      { path: "live/now", element: <LiveNowPage /> },
      { path: "live/schedule", element: <LiveSchedulePage /> },
      { path: "live/movies", element: <LiveMoviesPage /> },
      { path: "live/drama", element: <LiveDramaPage /> },
      { path: "live/documentary", element: <LiveDocumentaryPage /> },
      { path: "live/exchange", element: <LiveExchangePage /> },
      { path: "live/archive", element: <LiveArchivePage /> },
      { path: "live/search", element: <LiveSearchPage /> },
      { path: "live/feed", element: <LiveRssFeedPage /> },
      { path: "live/watch/:id", element: <LiveDetailVideoPage /> },
      { path: "live/:slug", element: <LiveDetailVideoPage /> }
    ]
  },
  {
    path: "/:lang/secretariat",
    element: <SecretariatLangWrapper />,
    children: [
      {
        element: <SecretariatHubLayout />,
        children: [
          { index: true, element: <SecretariatDashboard /> },
          { path: "content", element: <SecretariatContentCrud /> },
          { path: "initiatives", element: <SecretariatInitiativesCrud /> },
          { path: "media", element: <SecretariatMediaCrud /> },
          { path: "newsletter", element: <SecretariatNewsletterCrud /> },
          { path: "forms", element: <SecretariatFormsCrud /> },
          { path: "users", element: <SecretariatUsersCrud /> },
          { path: "audit", element: <SecretariatAuditCrud /> },
          { path: "settings", element: <SecretariatSettings /> }
        ]
      }
    ]
  },
  {
    path: "/:lang/newsroom/hub",
    element: <CiseCommandHubLangWrapper />,
    children: [
      {
        element: <NewsroomLayout />,
        children: [
          { index: true, element: <CiseCommandHubDashboard /> },
          { path: "articles", element: <CiseCommandHubArticles /> },
          { path: "categories", element: <CiseCommandHubArticles /> }, // Placeholder
          { path: "tags", element: <CiseCommandHubArticles /> }, // Placeholder
          { path: "authors", element: <CiseCommandHubUsers /> }, // Placeholder
          { path: "feeds", element: <CiseCommandHubArticles /> }, // Placeholder
          { path: "analytics", element: <CiseCommandHubDashboard /> }, // Placeholder
          { path: "settings", element: <CiseCommandHubSettings /> }
        ]
      }
    ]
  },
  {
    path: "/:lang/live/hub",
    element: <CiseCommandHubLangWrapper />,
    children: [
      {
        element: <LivePortalLayout />,
        children: [
          { index: true, element: <CiseCommandHubDashboard /> },
          { path: "streams", element: <CiseCommandHubLiveEvents /> },
          { path: "movies", element: <CiseCommandHubVideos /> },
          { path: "drama", element: <CiseCommandHubVideos /> },
          { path: "documentary", element: <CiseCommandHubVideos /> },
          { path: "exchange", element: <CiseCommandHubVideos /> },
          { path: "schedule", element: <CiseCommandHubLiveEvents /> },
          { path: "analytics", element: <CiseCommandHubDashboard /> },
          { path: "settings", element: <CiseCommandHubSettings /> }
        ]
      }
    ]
  },
  {
    path: "/:lang/hub/management",
    element: <CiseCommandHubLangWrapper />,
    children: [
      { index: true, element: <CiseCommandHubDashboard /> },
      { path: "articles", element: <CiseCommandHubArticles /> },
      { path: "articles/new", element: <CiseCommandHubArticleNew /> },
      { path: "articles/:id", element: <CiseCommandHubArticleNew /> },
      { path: "women", element: <CiseCommandHubMedia /> },
      { path: "tourism", element: <CiseCommandHubBrics /> },
      { path: "cultural-exchange", element: <CiseCommandHubCulturalExchange /> },
      { path: "visa-flights", element: <CiseCommandHubPartners /> },
      { path: "podcasts", element: <CiseCommandHubIcaPlus /> },
      { path: "icaplus", element: <CiseCommandHubIcaPlus /> },
      { path: "live-events", element: <CiseCommandHubLiveEvents /> },
      { path: "books", element: <CiseCommandHubBrics /> },
      { path: "finance-economics", element: <CiseCommandHubFinanceEconomics /> },
      { path: "market", element: <CiseCommandHubFinanceEconomics /> },
      { path: "payments", element: <CiseCommandHubPayments /> },
      { path: "partners", element: <CiseCommandHubPartners /> },
      { path: "business", element: <CiseCommandHubBusiness /> },
      { path: "sourcing", element: <CiseCommandHubSourcing /> },
                { path: "audit-logs", element: <CiseCommandHubAuditLogs /> },
          { path: "brics", element: <CiseCommandHubBrics /> },
          { path: "chinese-products", element: <CiseCommandHubChineseProducts /> },
          { path: "visa-centre", element: <CiseCommandHubVisaCentre /> },
          { path: "users", element: <CiseCommandHubUsers /> },
      { path: "media", element: <CiseCommandHubMedia /> },
      { path: "languages", element: <CiseCommandHubLanguagesWrapper /> },
      { path: "settings", element: <CiseCommandHubSettings /> }
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

