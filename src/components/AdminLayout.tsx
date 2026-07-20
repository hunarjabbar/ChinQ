import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Radio, Image as ImageIcon, Users, Settings, LogOut, Bell, KeySquare, Mail, Lock, User as UserIcon } from 'lucide-react';
import { Locale } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';

export function AdminLayout({ children, userRole }: { children: React.ReactNode, userRole?: string }) {
  const { lang } = useParams<{ lang: Locale }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token, setAuth, logout } = useAuthStore();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
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
    { name: 'Dashboard', href: `/admin`, icon: LayoutDashboard },
    { name: 'Articles', href: `/admin/articles`, icon: FileText },
    { name: 'Live Command', href: `/admin/live-publish`, icon: Radio },
    { name: 'Media Library', href: `/admin/media`, icon: ImageIcon },
    { name: 'User Management', href: `/admin/users`, icon: Users, role: 'ADMIN' },
    { name: 'System Settings', href: `/admin/settings`, icon: Settings },
  ];

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
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center font-sans">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-200">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-[#111111] rounded-xl flex items-center justify-center shadow-lg">
              <KeySquare className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-serif font-black text-center mb-2 text-[#111111]">
            {isLogin ? 'CHINQ ENTERPRISE LOGIN' : 'ENTERPRISE REGISTRATION'}
          </h2>
          <p className="text-xs text-center text-gray-500 mb-8 uppercase tracking-widest font-bold">
            RESTRICTED ACCESS
          </p>

          {isLogin && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-[10px] font-bold text-blue-800 uppercase tracking-widest mb-2">Test Credentials</p>
              <div className="text-xs text-blue-900 font-mono space-y-1">
                <div>Admin: admin@chinq.media / admin123</div>
                <div>Editor: editor@chinq.media / editor123</div>
              </div>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-[#990000] focus:border-[#990000] text-sm"
                    placeholder="Jane Doe"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Corporate Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-[#990000] focus:border-[#990000] text-sm"
                  placeholder="name@chinq.media"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-[#990000] focus:border-[#990000] text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className={`text-xs p-3 rounded-md font-bold text-center ${error.includes('successful') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#111111] hover:bg-[#990000] text-white font-bold py-2.5 rounded-md transition-colors text-xs uppercase tracking-widest mt-6 disabled:opacity-70 flex justify-center items-center"
            >
              {loading ? <span className="animate-pulse">PROCESSING...</span> : (isLogin ? 'AUTHENTICATE' : 'REQUEST ACCESS')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-xs text-gray-500 hover:text-[#990000] font-bold uppercase tracking-wider transition-colors"
            >
              {isLogin ? 'Create administrative account' : 'Return to login portal'}
            </button>
          </div>
          <div className="mt-8 text-center pt-6 border-t border-gray-100">
             <Link to={`/${lang}`} className="text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-[#111111]">← Back to Public Site</Link>
          </div>
        </div>
      </div>
    );
  }

  
  if (user && userRole && user.role !== userRole) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center font-sans">
        <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-black text-[#111111] mb-2 uppercase tracking-wide">Access Denied</h2>
          <p className="text-sm text-gray-500 mb-6">You do not have the required permissions to view this section.</p>
          <button onClick={() => navigate(`/${lang}/admin`)} className="px-6 py-2 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest rounded-md hover:bg-[#990000] transition-colors">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex font-sans text-[#111111] text-start">
      {/* Enterprise Sidebar */}
      <aside className="w-64 bg-[#111111] text-white flex-col border-e border-gray-800 hidden md:flex h-screen sticky top-0 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-800 shrink-0">
          <span className="text-xl font-serif font-black tracking-tighter uppercase">
            ChinQ <span className="text-[#990000]">Admin</span>
          </span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3 px-2">Main Menu</div>
          {navItems.map((item) => {
            if (item.role && item.role !== user.role) return null;
            
            const Icon = item.icon;
            const targetPath = `/${lang}${item.href}`;
            const isActive = location.pathname === targetPath || (item.href !== '/admin' && location.pathname.startsWith(targetPath));

            return (
              <Link
                key={item.name}
                to={targetPath}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#990000] text-white shadow-md' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800 shrink-0">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs uppercase text-white">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-bold text-white truncate">{user.name}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">{user.role}</div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors w-full px-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-lg font-serif font-black text-[#111111] uppercase tracking-wide">
            Enterprise Dashboard
          </h1>
          <div className="flex items-center gap-4 relative">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-gray-400 hover:text-[#111111] transition-colors relative p-1.5 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                aria-label="Toggle notifications"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white animate-pulse"></span>
                )}
              </button>

              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40 cursor-default" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-xl py-2 z-50 text-start font-sans divide-y divide-gray-100">
                    <div className="px-4 py-2 flex justify-between items-center bg-gray-50/50">
                      <span className="text-[11px] font-black uppercase tracking-wider text-gray-700 font-mono flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#990000] rounded-full animate-pulse"></span>
                        Telex & Registry Alerts
                      </span>
                      {notifications.length > 0 && (
                        <span className="text-[9px] bg-[#990000]/10 text-[#990000] font-mono font-bold px-2 py-0.5 rounded-full">
                          {notifications.length} Pending
                        </span>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 bg-white">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-xs text-gray-500 font-mono italic">
                          All systems operational. No pending alerts.
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
                                <span className={`w-1.5 h-1.5 rounded-full ${notif.type === 'application' ? 'bg-[#990000]' : 'bg-green-600'}`}></span>
                                {notif.title}
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-600 mb-1.5 leading-relaxed font-sans">
                              {notif.description}
                            </p>
                            <div className="flex justify-between items-center text-[9px] text-gray-400 font-mono uppercase tracking-wider font-bold">
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
                        className="text-[10px] font-bold text-[#990000] hover:underline uppercase tracking-wider font-mono cursor-pointer"
                      >
                        Audit Enterprise Registry
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

             <Link to={`/${lang}`} className="text-[10px] font-bold uppercase tracking-wider text-gray-500 border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors">
              View Live Site
            </Link>
          </div>
        </header>
        <div className="p-8 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
