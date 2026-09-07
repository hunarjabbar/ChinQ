/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createBrowserRouter, RouterProvider, Navigate, useParams, Outlet, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import { Home } from './pages/Home';
import { ArticlePage } from './pages/ArticlePage';
import { CategoryPage } from './pages/CategoryPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFound } from './pages/NotFound';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LiveEventPage } from './pages/LiveEventPage';
import { LivePortal } from './pages/LivePortal';
import SearchPage from './pages/SearchPage';

import { AdminArticles } from './pages/AdminArticles';
import { AdminArticleNew } from './pages/AdminArticleNew';
import { AdminAuditLogs } from './pages/AdminAuditLogs';
import { AdminUsers } from './pages/AdminUsers';
import { AdminMedia } from './pages/AdminMedia';
import { AdminSettings } from './pages/AdminSettings';

import { About } from './pages/About';
import { JoinUs } from './pages/JoinUs';
import { BooksPage } from './pages/BooksPage';
import { AdminBooks } from './pages/AdminBooks';
import { TourismPage } from './pages/TourismPage';
import { AdminTourism } from './pages/AdminTourism';
import { WomenPage } from './pages/WomenPage';
import { AdminWomen } from './pages/AdminWomen';
import { VisaFlightPage } from './pages/VisaFlightPage';
import { AdminVisaFlight } from './pages/AdminVisaFlight';
import PodcastsPage from './pages/PodcastsPage';
import AdminPodcasts from './pages/AdminPodcasts';
import AdminLiveEvents from './pages/AdminLiveEvents';
import AdminPartners from "./pages/AdminPartners";
import AdminSourcing from "./pages/AdminSourcing";
import { AdminMarketData } from './pages/AdminMarketData';
import { PaymentsPage } from './pages/PaymentsPage';
import { AdminPayments } from './pages/AdminPayments';
import { useSiteStore } from './store/useSiteStore';

const queryClient = new QueryClient();

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
        root.style.setProperty('--color-ink-900', inkColor || '#0f172a');
        root.style.setProperty('--color-paper-50', paperColor || '#ffffff');
      }
      if (brandColor) {
        const bc = brandColor.startsWith('#') ? brandColor : '#8B0000';
        root.style.setProperty('--color-brand-950', mixColor(bc, '#000000', 0.4));
        root.style.setProperty('--color-brand-900', mixColor(bc, '#000000', 0.2));
        root.style.setProperty('--color-brand-800', bc);
        root.style.setProperty('--color-brand-700', mixColor(bc, '#ffffff', 0.15));
        root.style.setProperty('--color-brand-600', mixColor(bc, '#ffffff', 0.3));
        root.style.setProperty('--color-brand-500', mixColor(bc, '#ffffff', 0.5));
        root.style.setProperty('--color-brand-400', mixColor(bc, '#ffffff', 0.7));
        root.style.setProperty('--color-brand-300', mixColor(bc, '#ffffff', 0.8));
        root.style.setProperty('--color-brand-200', mixColor(bc, '#ffffff', 0.88));
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

function LangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  
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

  if (!['en', 'ar', 'zh', 'ckb'].includes(lang || '')) {
    return <Navigate to="/en" replace />;
  }

  const safeLang = (lang as 'en' | 'ar' | 'zh' | 'ckb') || 'en';

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

  if (!['en', 'ar', 'zh', 'ckb'].includes(lang || '')) {
    return <Navigate to="/en/admin" replace />;
  }

  const safeLang = (lang as 'en' | 'ar' | 'zh' | 'ckb') || 'en';

  return (
    <ErrorBoundary key={location.key} lang={safeLang}>
      <Outlet />
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
      { path: "visa-flights", element: <VisaFlightPage /> },
      { path: "payments", element: <PaymentsPage /> },
      { path: "payments/:ref", element: <PaymentsPage /> },
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
      { path: "women", element: <AdminLayout><AdminWomen /></AdminLayout> },
      { path: "tourism", element: <AdminLayout><AdminTourism /></AdminLayout> },
      { path: "visa-flights", element: <AdminLayout><AdminVisaFlight /></AdminLayout> },
      { path: "podcasts", element: <AdminLayout><AdminPodcasts /></AdminLayout> },
      { path: "live-events", element: <AdminLiveEvents /> },
      { path: "books", element: <AdminBooks /> },
      { path: "market", element: <AdminLayout><AdminMarketData /></AdminLayout> },
      { path: "payments", element: <AdminLayout><AdminPayments /></AdminLayout> },
      { path: "partners", element: <AdminLayout><AdminPartners /></AdminLayout> },
      { path: "sourcing", element: <AdminLayout><AdminSourcing /></AdminLayout> },
                { path: "audit-logs", element: <AdminAuditLogs /> },
          { path: "users", element: <AdminUsers /> },
      { path: "media", element: <AdminMedia /> },
      { path: "settings", element: <AdminSettings /> }
    ]
  },
  { path: "*", element: <NotFound /> }
]);

export default function App() {
  return (
    <ErrorBoundary lang="en">
      <QueryClientProvider client={queryClient}>
        <ThemeApplier />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

