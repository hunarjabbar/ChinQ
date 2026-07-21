/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createBrowserRouter, RouterProvider, Navigate, useParams, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CategoryPage } from './pages/CategoryPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFound } from './pages/NotFound';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LiveEventPage } from './pages/LiveEventPage';
import { LivePortal } from './pages/LivePortal';

import { AdminArticles } from './pages/AdminArticles';
import { AdminArticleNew } from './pages/AdminArticleNew';
import { AdminUsers } from './pages/AdminUsers';
import { AdminMedia } from './pages/AdminMedia';
import { AdminSettings } from './pages/AdminSettings';

import { About } from './pages/About';
import { JoinUs } from './pages/JoinUs';

const queryClient = new QueryClient();

function LangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  
  useEffect(() => {
    document.documentElement.lang = lang || 'en';
    if (lang === 'ar' || lang === 'ckb') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [lang]);

  if (!['en', 'ar', 'zh', 'ckb'].includes(lang || '')) {
    return <Navigate to="/en" replace />;
  }

  return (
    <Layout lang={lang as 'en' | 'ar' | 'zh' | 'ckb'}>
      <ErrorBoundary lang={lang}>
        <Outlet />
      </ErrorBoundary>
    </Layout>
  );
}

function AdminLangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  
  useEffect(() => {
    document.documentElement.lang = lang || 'en';
    if (lang === 'ar' || lang === 'ckb') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [lang]);

  if (!['en', 'ar', 'zh', 'ckb'].includes(lang || '')) {
    return <Navigate to="/en/admin" replace />;
  }

  return (
    <ErrorBoundary lang={lang}>
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
      { path: "category/:slug", element: <CategoryPage /> },
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
      { path: "live-publish", element: <AdminDashboard /> },
      { path: "users", element: <AdminUsers /> },
      { path: "media", element: <AdminMedia /> },
      { path: "settings", element: <AdminSettings /> }
    ]
  },
  { path: "*", element: <NotFound /> }
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

