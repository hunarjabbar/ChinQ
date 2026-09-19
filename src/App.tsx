import { useAuthStore } from './store/useAuthStore';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createBrowserRouter, RouterProvider, Navigate, useParams, Outlet, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, Suspense, lazy } from 'react';
import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useSiteStore } from './store/useSiteStore';

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
    } catch (error) {
      console.warn('Chunk load error, attempting immediate retry...', error);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const mod = await factory();
        return mod.default ? mod : { default: mod };
      } catch (retryError) {
        console.error('Persistent chunk load failure:', retryError);
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

function PaymentsRedirect() {
  const { lang = 'en', ref } = useParams<{ lang: string; ref?: string }>();
  const destination = ref 
    ? `/${lang}?tab=settlement&ref=${encodeURIComponent(ref)}#settlement-sourcing`
    : `/${lang}?tab=settlement#settlement-sourcing`;
  return <Navigate to={destination} replace />;
}


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



function SearchWrapper() {
  const { lang } = useParams<{ lang: string }>();
  return <SearchPage lang={(lang as any) || 'en'} />;
}


function useLanguageSetup(lang?: string) {
  useEffect(() => {
    try {
      document.documentElement.lang = lang || 'en';
      if (lang === 'ar' || lang === 'ckb') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    } catch {}
  }, [lang]);

  const isValidLang = ['en', 'ar', 'zh', 'ckb'].includes(lang || '');
  const safeLang = (isValidLang ? lang : 'en') as 'en' | 'ar' | 'zh' | 'ckb';
  
  return { isValidLang, safeLang };
}

function LangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { isValidLang, safeLang } = useLanguageSetup(lang);

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

function AdminLangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { isValidLang, safeLang } = useLanguageSetup(lang);

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

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/en" replace /> },
  { path: "/admin", element: <Navigate to="/en/admin" replace /> },
  { path: "/admin/*", element: <Navigate to="/en/admin" replace /> },
  { path: "/live/*", element: <Navigate to="/en" replace /> },
  {
    path: "/:lang",
    element: <LangWrapper />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "join", element: <JoinUs /> },
      { path: "women", element: <WomenPage /> },
      { path: "tourism", element: <TourismPage /> },
      { path: "books", element: <BooksPage /> },
      { path: "podcasts", element: <PodcastsPage /> },
      { path: "ica-plus", element: <IcaPlusPage /> },
      { path: "visa-flights", element: <VisaFlightPage /> },
      { path: "payments", element: <PaymentsRedirect /> },
      { path: "payments/:ref", element: <PaymentsRedirect /> },
      { path: "article/:slug", element: <ArticlePage /> },
      { path: "category/:slug", element: <CategoryPage /> },
      { path: "search", element: <SearchWrapper /> },
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
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="w-12 h-12 border-4 border-brand-800 border-t-transparent rounded-full animate-spin"></div></div>}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

