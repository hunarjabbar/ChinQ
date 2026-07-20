/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate, useParams, Outlet } from 'react-router-dom';
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
  const { lang } = useParams();
  
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
  const { lang } = useParams();
  
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

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/en" replace />} />
          <Route path="/admin" element={<Navigate to="/en/admin" replace />} />
          <Route path="/admin/*" element={<Navigate to="/en/admin" replace />} />
          <Route path="/live/*" element={<Navigate to="/en" replace />} />
          <Route path="/:lang">
            <Route element={<LangWrapper />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="join" element={<JoinUs />} />
              <Route path="category/:slug" element={<CategoryPage />} />
              <Route path="live" element={<LivePortal />} />
              <Route path="live/:slug" element={<LiveEventPage />} />
            </Route>
            <Route element={<AdminLangWrapper />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/articles" element={<AdminArticles />} />
              <Route path="admin/articles/new" element={<AdminArticleNew />} />
              <Route path="admin/live-publish" element={<AdminDashboard />} />
              <Route path="admin/users" element={<AdminUsers />} />
              <Route path="admin/media" element={<AdminMedia />} />
              <Route path="admin/settings" element={<AdminSettings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

