import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useAuthStore } from '../store/useAuthStore';
import { Locale } from '../types';
import { useI18n } from '../hooks/useI18n';
import { 
  Radio, 
  Sparkles, 
  Users, 
  Terminal, 
  BookOpen, 
  Mail, 
  LayoutDashboard,
  FileText,
  Megaphone
} from 'lucide-react';

// Modular Components
import { AdminOverview } from '../components/admin/AdminOverview';
import { AdminArticleEditor } from '../components/admin/AdminArticleEditor';
import { AdminAIImport } from '../components/admin/AdminAIImport';
import { AdminPartnerships } from '../components/admin/AdminPartnerships';
import { AdminTelex } from '../components/admin/AdminTelex';
import { AdminStudies } from '../components/admin/AdminStudies';
import { AdminSubscribers } from '../components/admin/AdminSubscribers';
import { AdminAnnouncements } from '../components/admin/AdminAnnouncements';
import { AdminAuditLogs } from '../components/admin/AdminAuditLogs';
import { AdminReviewQueue } from '../components/admin/AdminReviewQueue';
import { LivePublishForm } from '../components/LivePublishForm';
import { AdminUsersContent } from './AdminUsers';
import { Clock } from 'lucide-react';

type TabType = 'overview' | 'users' | 'article' | 'review' | 'live' | 'search' | 'applications' | 'telexes' | 'studies' | 'subscribers' | 'announcements' | 'audit';

export function AdminDashboard() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { t } = useI18n(lang as Locale);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Synchronize activeTab with URL tab parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam && ['overview', 'users', 'article', 'review', 'live', 'search', 'applications', 'telexes', 'studies', 'subscribers', 'announcements', 'audit'].includes(tabParam)) {
      setActiveTab(tabParam as TabType);
    }
  }, [location.search]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    navigate(`?tab=${tab}`, { replace: true });
  };

  const { data: categories = [] } = useQuery<any[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await apiFetch('/api/categories');
      return res.json();
    }
  });

  const { data: events = [] } = useQuery<any[]>({
    queryKey: ['live-events'],
    queryFn: async () => {
      const res = await apiFetch('/api/events');
      if (!res.ok) return [];
      return res.json();
    }
  });

  const { data: applications = [] } = useQuery<any[]>({
    queryKey: ['admin-applications'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/applications');
      if (!res.ok) return [];
      return res.json();
    }
  });

  const { data: telexes = [] } = useQuery<any[]>({
    queryKey: ['admin-telexes'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/telexes');
      if (!res.ok) return [];
      return res.json();
    }
  });

  const { data: adminUsers = [] } = useQuery<any[]>({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/users');
      if (!res.ok) return [];
      return res.json();
    }
  });

  const { data: adminArticles = [] } = useQuery<any[]>({
    queryKey: ['admin-articles'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/articles');
      if (!res.ok) return [];
      return res.json();
    }
  });

  const pendingDossiers = applications.filter((a: any) => a.status === 'PENDING').length;
  const unreadTelex = telexes.filter((t: any) => t.status === 'UNREAD').length;
  const pendingArticlesCount = adminArticles.filter((a: any) => a.status === 'PENDING').length;

  if (user && user.role !== 'ADMIN') {
    return (
      <>
        <div className="space-y-6 text-start max-w-5xl mx-auto py-6">
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl text-amber-900 text-sm">
            <span className="font-black uppercase tracking-widest block mb-1">Restricted Secretarial Clearance</span>
            As an editorial contributor (<span className="font-medium font-bold">{user.role}</span>), all administrative governance modules, user management, and executive sections have vanished. You are authorized exclusively for Article Registry and Draft Dispatch.
          </div>
          <AdminArticleEditor />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="space-y-10 text-start animate-in fade-in duration-700">
        {/* Sovereign Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b-2 border-brand-800 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-brand-800">
              <div className="p-2 bg-brand-50 rounded-lg">
                <LayoutDashboard size={20} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-800">{t('governancePlatform')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-brand-800 leading-tight tracking-tight">{t('enterpriseCommand')}</h1>
            <p className="text-sm sm:text-base text-neutral-500 font-medium max-w-xl">
              {t('enterpriseCommandSubtitle')}
            </p>
          </div>
          <div className="flex items-center gap-8 bg-white p-4 rounded-xl border border-neutral-100 shadow-sm">
            <div className="flex flex-col items-end rtl:items-start">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">{t('latticeSynchronized')}</span>
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-xs font-bold text-ink-900 uppercase tracking-wider">{t('statusNominal')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Navigation */}
        <div className="flex flex-wrap gap-2.5 p-1.5 bg-neutral-50 rounded-xl border border-neutral-100 shadow-inner">
          {[
            { id: 'overview', label: t('overview'), icon: LayoutDashboard },
            { id: 'users', label: t('userManagement'), icon: Users, badge: adminUsers.length },
            { id: 'article', label: t('draftDispatch'), icon: FileText },
            { id: 'review', label: t('reviewQueue'), icon: Clock, badge: pendingArticlesCount },
            { id: 'search', label: t('aiInformation'), icon: Sparkles },
            { id: 'live', label: t('liveSignals'), icon: Radio },
            { id: 'announcements', label: t('globalBroadcast'), icon: Megaphone },
            { id: 'applications', label: t('partnerships'), icon: Users, badge: pendingDossiers },
            { id: 'telexes', label: t('telexLedger'), icon: Terminal, badge: unreadTelex },
            { id: 'studies', label: t('sovereignStudies'), icon: BookOpen },
            { id: 'subscribers', label: t('subscriberList'), icon: Mail },
            { id: 'audit', label: t('auditLogs'), icon: Terminal },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as TabType)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all cursor-pointer relative ${
                activeTab === tab.id 
                  ? 'bg-brand-800 text-white shadow-md shadow-brand-800/20 z-10' 
                  : 'bg-white text-neutral-500 hover:text-brand-800 border border-neutral-200 hover:border-brand-300'
              }`}
            >
              <tab.icon size={12} className={activeTab === tab.id ? 'text-brand-500' : ''} />
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-2 end-0 bg-brand-700 text-white text-[8px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm font-medium">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content Matrix */}
        <div className="min-h-[600px]">
          <ErrorBoundary>
            {activeTab === 'overview' && <AdminOverview onSelectTab={(tab) => handleTabChange(tab as TabType)} />}
            {activeTab === 'users' && <AdminUsersContent />}
            {activeTab === 'article' && <AdminArticleEditor />}
            {activeTab === 'review' && <AdminReviewQueue />}
            {activeTab === 'search' && <AdminAIImport categories={categories} />}
            {activeTab === 'live' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                 <div className="bg-neutral-50 border border-neutral-200 p-8 rounded-2xl space-y-6">
                  <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
                    <Radio className="text-brand-800 animate-pulse" size={24} />
                    <h3 className="text-sm font-black uppercase tracking-widest text-brand-800">Active parent streams</h3>
                  </div>
                  {events.length > 0 ? (
                    <LivePublishForm events={events} />
                  ) : (
                    <div className="py-12 text-center text-neutral-400 italic text-sm font-medium bg-white rounded-xl border border-dashed border-neutral-200">
                      No active parent event streams detected.
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeTab === 'announcements' && <AdminAnnouncements />}
            {activeTab === 'applications' && <AdminPartnerships />}
            {activeTab === 'telexes' && <AdminTelex />}
            {activeTab === 'studies' && <AdminStudies />}
            {activeTab === 'subscribers' && <AdminSubscribers />}
            {activeTab === 'audit' && <AdminAuditLogs />}
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}
