import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from './ErrorBoundary';
import { LayoutDashboard, ClipboardList, FileText, BookOpen, Radio, Image as ImageIcon, Users, Settings, Briefcase, Ship, LogOut, Bell, KeySquare, Mail, Lock, User as UserIcon, Compass, Mic, Video, Activity, Plane, Coins, Check, Menu, X, Globe2 } from 'lucide-react';
import { Locale } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { useI18n } from '../hooks/useI18n';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { IcaLogo } from './IcaLogo';
import { LanguageSwitcher } from './LanguageSwitcher';

export function AdminLayout({ children, userRole }: { children: React.ReactNode, userRole?: string }) {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token, setAuth, logout } = useAuthStore();
  const { t } = useI18n(lang as Locale);
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [showNotifications, setShowNotifications] = useState(false);

  // Fetch pending applications & unread telexes for integrated notification center
  const { data: applications = [] } = useQuery<any[]>({
    queryKey: ['admin-applications'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/applications');
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!user
  });

  const { data: telexes = [] } = useQuery<any[]>({
    queryKey: ['admin-telexes'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/telexes');
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!user
  });

  const pendingApps = applications.filter((app: any) => app.status === 'PENDING');
  const unreadTelexes = telexes.filter((tlx: any) => tlx.status === 'UNREAD');

  const notifications = [
    ...pendingApps.map((app: any) => ({
      id: `app-${app.id}`,
      type: 'application',
      title: 'New Partnership Dossier',
      description: `${app.fullName} of ${app.company} submitted a partnership dossier.`,
      time: app.createdAt,
      bureau: app.bureau,
      tab: 'applications'
    })),
    ...unreadTelexes.map((tlx: any) => ({
      id: `telex-${tlx.id}`,
      type: 'telex',
      title: 'Incoming Encrypted Telex',
      description: `New unread telex dispatch received from ${tlx.name} (${tlx.company}).`,
      time: tlx.createdAt,
      bureau: tlx.bureau,
      tab: 'telexes'
    }))
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  const navItems = [
    { name: t('articlesRegistry'), href: `/${lang}/admin/articles`, icon: FileText, adminOnly: false },
    { name: t('dashboard'), href: `/${lang}/admin`, icon: LayoutDashboard, adminOnly: true },
    { name: t('bricsObservatory'), href: `/${lang}/admin/brics`, icon: Globe2, adminOnly: true },
    { name: t('womenLeadership'), href: `/${lang}/admin/women`, icon: UserIcon, adminOnly: true },
    { name: t('tourismPortal'), href: `/${lang}/admin/tourism`, icon: Compass, adminOnly: true },
    { name: t('booksLibrary'), href: `/${lang}/admin/books`, icon: BookOpen, adminOnly: true },
    { name: t('podcastsStudio'), href: `/${lang}/admin/podcasts`, icon: Mic, adminOnly: true },
    { name: t('visaFlights'), href: `/${lang}/admin/visa-flights`, icon: Plane, adminOnly: true },
    { name: t('marketData'), href: `/${lang}/admin/market`, icon: Activity, adminOnly: true },
    { name: t('paymentsSettlement'), href: `/${lang}/admin/payments`, icon: Coins, adminOnly: true },
    { name: t('liveCommand'), href: `/${lang}/admin?tab=live`, icon: Radio, adminOnly: true },
    { name: t('sourcingDesk'), href: `/${lang}/admin/sourcing`, icon: Ship, adminOnly: true },
    { name: t('partners'), href: `/${lang}/admin/partners`, icon: Briefcase, adminOnly: true },
    { name: t('liveStreams'), href: `/${lang}/admin/live-events`, icon: Video, adminOnly: true },
    { name: t('mediaLibrary'), href: `/${lang}/admin/media`, icon: ImageIcon, adminOnly: true },
    { name: t('userManagement'), href: `/${lang}/admin/users`, icon: Users, adminOnly: true },
    { name: t('auditLogs'), href: `/${lang}/admin/audit-logs`, icon: ClipboardList, adminOnly: true },
    { name: t('systemSettings'), href: `/${lang}/admin/settings`, icon: Settings, adminOnly: true },
  ].filter(item => !item.adminOnly || user?.role === 'ADMIN');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin ? { email, password } : { email, password, name, role: 'EDITOR' };
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Authentication failed');
      
      if (isLogin) {
        setAuth(data.user, data.token);
      } else {
        setIsLogin(true);
        setError('Registration successful. Please log in.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate(`/${lang}/admin`);
  };

  if (!user) {
    const isAr = lang === 'ar';
    const isZh = lang === 'zh';
    const isCkb = lang === 'ckb';

    const loginTitle = isAr 
      ? (isLogin ? 'تسجيل الدخول للمؤسسة - الوكالة العراقية الصينية' : 'إنشاء حساب جديد للمؤسسة')
      : isZh
      ? (isLogin ? '伊中通讯社企业登录门户' : '企业账户注册')
      : isCkb
      ? (isLogin ? 'چوونەژوورەوەی دامەزراوەیی - ئاژانسی عێراقی - چینی' : 'تۆمارکردنی هەژماری دامەزراوەیی')
      : (isLogin ? 'IRAQI-CHINESE AGENCY ENTERPRISE SIGN IN' : 'ENTERPRISE REGISTRATION');

    const restrictedText = isAr ? 'وصول مقيد ومؤمن' : isZh ? '安全受限访问' : isCkb ? 'دەستپێڕاگەیشتنی سنووردار و پارێزراو' : 'RESTRICTED ACCESS';
    const emailLabel = isAr ? 'البريد الإلكتروني للشركة' : isZh ? '企业邮箱' : isCkb ? 'ئیمەیڵی کۆمپانیا' : 'Corporate Email';
    const passwordLabel = isAr ? 'كلمة المرور' : isZh ? '密码' : isCkb ? 'تێپەڕوشە' : 'Password';
    const fullNameLabel = isAr ? 'الاسم الكامل' : isZh ? '姓名' : isCkb ? 'ناوی تەواو' : 'Full Name';
    const submitText = loading 
      ? (isAr ? 'جاري المعالجة...' : isZh ? '正在处理...' : isCkb ? 'لە پرۆسەدایە...' : 'PROCESSING...')
      : isLogin
      ? (isAr ? 'تسجيل الدخول' : isZh ? '登录认证' : isCkb ? 'چوونەژوورەوە' : 'SIGN IN')
      : (isAr ? 'طلب وصول' : isZh ? '申请访问权限' : isCkb ? 'داواکردنی دەستپێڕاگەیشتن' : 'REQUEST ACCESS');
    
    const togglePrompt = isLogin
      ? (isAr ? 'إنشاء حساب إداري جديد' : isZh ? '创建管理账户' : isCkb ? 'دروستکردنی هەژماری بەڕێوەبەرایەتی' : 'Create administrative account')
      : (isAr ? 'العودة إلى بوابة تسجيل الدخول' : isZh ? '返回登录门户' : isCkb ? 'گەڕانەوە بۆ دەروازەی چوونەژوورەوە' : 'Return to sign in portal');
    
    const backToPublic = isAr ? '← العودة للموقع العام' : isZh ? '← 返回公开网站' : isCkb ? '← گەڕانەوە بۆ ماڵپەڕی گشتی' : '← Back to Public Site';

    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center font-sans px-4 py-8">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl border border-gray-200">
          <div className="flex justify-center mb-6">
            <IcaLogo size={64} variant="mark" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-black text-center mb-2 text-brand-900 leading-tight">
            {loginTitle}
          </h2>
          <p className="text-[11px] text-center text-gray-500 mb-8 uppercase tracking-widest font-bold">
            {restrictedText}
          </p>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 font-medium">{fullNameLabel}</label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none transition-colors" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-2.5 sm:py-3 bg-neutral-50/50 hover:bg-white focus:bg-white border border-neutral-300 focus:border-brand-800 rounded-lg text-sm font-sans text-neutral-900 placeholder:text-neutral-400 shadow-xs focus:ring-2 focus:ring-brand-800/20 focus:outline-none transition-all duration-200"
                    placeholder="Jane Doe"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 font-medium">{emailLabel}</label>
              <div className="relative">
                <Mail className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none transition-colors" />
                <input
                  id="admin-login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-2.5 sm:py-3 bg-neutral-50/50 hover:bg-white focus:bg-white border border-neutral-300 focus:border-brand-800 rounded-lg text-sm font-medium text-neutral-900 placeholder:text-neutral-400 shadow-xs focus:ring-2 focus:ring-brand-800/20 focus:outline-none transition-all duration-200"
                  placeholder="editor@iraqi-chineseagency.com"
                  autoComplete="email"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 font-medium">{passwordLabel}</label>
              <div className="relative">
                <Lock className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none transition-colors" />
                <input
                  id="admin-login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-2.5 sm:py-3 bg-neutral-50/50 hover:bg-white focus:bg-white border border-neutral-300 focus:border-brand-800 rounded-lg text-sm font-medium text-neutral-900 placeholder:text-neutral-400 shadow-xs focus:ring-2 focus:ring-brand-800/20 focus:outline-none transition-all duration-200"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <div className={`text-xs p-3 rounded-lg font-bold text-center ${error.includes('successful') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-brand-50 text-brand-700 border border-brand-200'}`}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-800 hover:bg-brand-700 active:scale-[0.99] text-white font-medium font-bold py-3 rounded-lg transition-all text-xs uppercase tracking-widest mt-6 disabled:opacity-70 flex justify-center items-center gap-2 cursor-pointer shadow-md hover:shadow-lg hover:shadow-brand-900/20"
            >
              {loading && <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
              <span>{submitText}</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-xs text-gray-500 hover:text-brand-800 font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              {togglePrompt}
            </button>
          </div>
          <div className="mt-8 text-center pt-6 border-t border-gray-100">
             <Link to={`/${lang}`} className="text-[11px] font-bold uppercase tracking-wider text-gray-400 hover:text-brand-900 transition-colors">{backToPublic}</Link>
          </div>
        </div>
      </div>
    );
  }

  
  const isAuthorized = !userRole || user.role === userRole || user.role === 'ADMIN' || (userRole === 'ADMIN' && user.role === 'EDITOR');
  if (user && !isAuthorized) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center font-sans">
        <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-brand-600" />
          </div>
          <h2 className="text-xl font-black text-brand-900 mb-2 uppercase tracking-wide">Access Denied</h2>
          <p className="text-sm text-gray-500 mb-6">You do not have the required permissions to view this section.</p>
          <button onClick={() => navigate(`/${lang}/admin`)} className="px-6 py-2 bg-brand-800 text-white text-xs font-bold uppercase tracking-widest rounded-md hover:bg-brand-800 transition-colors">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex font-sans text-brand-900 text-start">
      {/* Enterprise Sidebar */}
      <aside className="w-72 bg-ink-900 text-white flex-col border-e border-neutral-800 hidden md:flex h-screen sticky top-0 shrink-0">
        <div className="h-20 flex items-center gap-4 px-6 border-b border-white/5 shrink-0">
          <div className="bg-white p-1.5 rounded-lg">
            <IcaLogo size={32} variant="mark" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold font-black tracking-tight leading-none text-white">
              {t('secretariat')}
            </span>
            <span className="text-xs font-medium font-bold tracking-[0.3em] text-brand-500 uppercase mt-1">
              {t('commandHub')}
            </span>
          </div>
        </div>
        
        <nav className="flex-1 py-8 px-5 space-y-1.5 overflow-y-auto">
          <div className="text-xs font-black uppercase tracking-[0.4em] text-neutral-600 mb-5 px-3">{t('systemNavigation')}</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const targetPath = item.href;
            const isDashboard = item.href === `/${lang}/admin`;
            const isActive = location.pathname === targetPath || (!isDashboard && location.pathname.startsWith(targetPath));

            return (
              <Link
                key={item.name}
                to={targetPath}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all relative group ${
                  isActive 
                    ? 'bg-brand-800 text-white shadow-lg shadow-brand-900/20' 
                    : 'text-neutral-500 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 transition-colors shrink-0 ${isActive ? 'text-white' : 'text-neutral-600 group-hover:text-neutral-300'}`} />
                <span className="tracking-wide truncate">{item.name}</span>
                {isActive && (
                  <div className="absolute end-3 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5 shrink-0 bg-black/20">
          <div className="flex items-center gap-4 mb-5 px-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center font-black text-sm uppercase text-white shadow-inner shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden space-y-0.5">
              <div className="text-sm font-black text-white truncate">{user.name}</div>
              <div className="text-xs text-neutral-500 font-black uppercase tracking-[0.2em]">{user.role}</div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2.5 text-xs font-bold text-neutral-500 hover:text-brand-400 transition-all w-full px-2 cursor-pointer group"
          >
            <LogOut className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:rotate-180 shrink-0" />
            <span className="uppercase tracking-widest">{t('terminateSession')}</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex font-sans">
          <div 
            className="fixed inset-0 bg-ink-900/80 backdrop-blur-xs transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] bg-ink-900 text-white flex flex-col h-full z-10 shadow-2xl">
            <div className="h-20 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white p-1 rounded-md">
                  <IcaLogo className="w-7 h-7" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold font-black tracking-tight leading-none text-white">
                    {t('secretariat')}
                  </span>
                  <span className="text-xs font-medium font-bold tracking-[0.25em] text-brand-500 uppercase mt-1">
                    {t('commandHub')}
                  </span>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-400 hover:text-white p-1.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Navigation"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              <div className="px-3 pb-2 text-xs font-medium font-bold uppercase tracking-[0.25em] text-neutral-500">
                {t('navigationDirectory')}
              </div>
              {navItems.map((item) => {
                const isActive = location.pathname === item.href || (item.href.includes('?') && location.pathname + location.search === item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-brand-800 text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon size={16} className={isActive ? 'text-brand-300 shrink-0' : 'text-neutral-400 shrink-0'} />
                    <span className="tracking-wide truncate">{item.name}</span>
                    {item.name === t('userManagement') && (
                      <span className="ms-auto text-xs bg-brand-700/80 text-white font-medium px-1.5 py-0.5 rounded font-black">
                        CORE
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="p-4 border-t border-white/10 shrink-0 bg-ink-950/60 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white truncate">{user.name}</div>
                  <div className="text-xs text-neutral-400 font-medium uppercase tracking-widest">{user.role}</div>
                </div>
              </div>
              <button 
                onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                className="flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-brand-400 transition-all w-full px-2 py-1.5 rounded hover:bg-white/5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 rtl:rotate-180 shrink-0" />
                <span className="uppercase tracking-widest text-xs">{t('terminateSession')}</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden bg-paper-50">
        <header className="h-20 bg-white border-b border-neutral-100 shrink-0 shadow-sm z-10 flex justify-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between h-full">
            <div className="flex items-center gap-3 sm:gap-4">
              <button 
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-brand-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                aria-label="Open Secretariat Navigation"
                title="ICA Secretariat Navigation"
              >
                <Menu size={22} />
              </button>
              <div className="w-1 h-6 bg-brand-800 rounded-full hidden sm:block"></div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <IcaLogo size={24} variant="mark" className="hidden sm:block opacity-80" />
                <h1 className="text-xs font-black text-brand-900 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                  {t('authorizedEnvironment')}
                </h1>
                <span className="text-xs font-medium font-bold text-brand-700 uppercase bg-brand-50 px-1.5 py-0.5 rounded sm:inline hidden">{t('secretariat')}</span>
              </div>
            </div>
          <div className="flex items-center gap-3 sm:gap-4 relative">
            <LanguageSwitcher lang={lang as Locale} />

            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-neutral-400 hover:text-brand-900 transition-all relative p-2.5 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-100 flex items-center justify-center cursor-pointer"
                aria-label="Toggle notifications"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-2 end-2 w-2.5 h-2.5 bg-brand-600 rounded-full border-2 border-white"></span>
                )}
              </button>

              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40 cursor-default" onClick={() => setShowNotifications(false)} />
                  <div className="absolute end-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-xl py-2 z-50 text-start font-sans divide-y divide-gray-100">
                    <div className="px-4 py-2 flex justify-between items-center bg-gray-50/50">
                      <span className="text-[11px] font-black uppercase tracking-wider text-gray-700 font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-brand-800 rounded-full animate-pulse shrink-0"></span>
                        {t('notificationsAlerts')}
                      </span>
                      {notifications.length > 0 && (
                        <span className="text-xs bg-brand-800/10 text-brand-800 font-medium font-bold px-2 py-0.5 rounded-full">
                          {notifications.length} {t('pendingAlerts')}
                        </span>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 bg-white">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-xs text-gray-500 font-medium italic">
                          {t('allSystemsNominal')}
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id}
                            onClick={() => {
                              setShowNotifications(false);
                              navigate(`/${lang}/admin?tab=${notif.tab}`);
                            }}
                            className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer text-start block"
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-xs font-bold text-gray-900 font-sans flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${notif.type === 'application' ? 'bg-brand-800' : 'bg-green-600'}`}></span>
                                {notif.title}
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-600 mb-1.5 leading-relaxed font-sans">
                              {notif.description}
                            </p>
                            <div className="flex justify-between items-center text-xs text-gray-400 font-medium uppercase tracking-wider font-bold">
                              <span>{notif.bureau.split(' ')[0]} Node</span>
                              <span>{new Date(notif.time).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="px-4 py-2 text-center bg-gray-50/30">
                      <button 
                        onClick={() => {
                          setShowNotifications(false);
                          navigate(`/${lang}/admin?tab=applications`);
                        }}
                        className="text-xs font-bold text-brand-800 hover:underline uppercase tracking-wider font-medium cursor-pointer"
                      >
                        {t('auditEnterpriseRegistry')}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <Link to={`/${lang}`} className="text-xs font-bold uppercase tracking-wider text-gray-500 border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors shrink-0">
              {t('viewLiveSite')}
            </Link>
          </div>
          </div>
        </header>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 flex-1 overflow-y-auto">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}
