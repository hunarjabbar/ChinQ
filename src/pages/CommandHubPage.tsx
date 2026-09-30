import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useI18n } from '../hooks/useI18n';
import { Locale } from '../types';
import {
  LayoutDashboard, Building, BookOpen, Users, Database, ShieldCheck,
  Award, Globe, Plane, Coins, Briefcase, FileText, Inbox, UserCheck,
  BarChart3, Settings, LogOut, KeyRound, Lock, Search, Bell, Command,
  Plus, Edit, Trash2, RotateCcw, Eye, Download, CheckCircle, AlertTriangle,
  RefreshCw, Shield, Server, FileSpreadsheet, HardDrive, Cpu, Layers,
  ChevronRight, ArrowUpRight, Filter, ChevronDown, Check, X, QrCode, Radio, GraduationCap
} from 'lucide-react';
import { IcaAdministrationSection } from '../components/hub/IcaAdministrationSection';

interface AuditLogEntry {
  id: string;
  actorId: string;
  actorEmail: string;
  action: string;
  entityType: string;
  entityId: string;
  before: any;
  after: any;
  diff: Array<{ path: string; from: any; to: any }>;
  ip: string;
  userAgent: string;
  timestamp: string;
}

export function CommandHubPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const { user, logout, setAuth } = useAuthStore();
  const { t } = useI18n((lang as Locale) || 'en');

  // Command palette state
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState('');

  // Active user role or preview override
  const [currentRole, setCurrentRole] = useState<'viewer' | 'translator' | 'editor' | 'reviewer' | 'admin' | 'superadmin'>(
    (user?.role?.toLowerCase() as any) || 'superadmin'
  );

  // Active Hub Tab / Route path determination
  const path = location.pathname.replace(/^\/hub/, '').replace(/^\/([a-z]{2}|ckb)\/hub/, '') || '';
  
  // Selected locale
  const [activeLocale, setActiveLocale] = useState<'en' | 'ar' | 'zh' | 'ckb'>((lang as any) || 'en');

  // Local notifications dropdown
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // PII reveal permission audit modal state
  const [revealPiiModal, setRevealPiiModal] = useState<any | null>(null);
  const [revealedPiiMap, setRevealedPiiMap] = useState<Record<string, boolean>>({});

  // Audit logs state
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: 'audit_01',
      actorId: user?.id || 'usr_superadmin',
      actorEmail: user?.email || 'admin@iraqi-chineseagency.com',
      action: 'publish',
      entityType: 'Publication',
      entityId: 'pub_bri_2026',
      before: { status: 'draft' },
      after: { status: 'published' },
      diff: [{ path: 'status', from: 'draft', to: 'published' }],
      ip: '127.0.0.1',
      userAgent: 'Mozilla/5.0 Chrome/120.0',
      timestamp: new Date().toISOString()
    },
    {
      id: 'audit_02',
      actorId: 'usr_editor_02',
      actorEmail: 'editor@iraqi-chineseagency.com',
      action: 'create',
      entityType: 'VisaApplication',
      entityId: 'visa_app_9941',
      before: null,
      after: { applicant: 'Mohammed Al-Baghdadi', status: 'RECEIVED' },
      diff: [{ path: 'status', from: null, to: 'RECEIVED' }],
      ip: '192.168.1.45',
      userAgent: 'Mozilla/5.0 Safari/17.2',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    }
  ]);

  // Auth form states for /hub/login, /hub/forgot-password, /hub/reset-password
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');

  // Keybindings for Cmd/Ctrl + K command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter both email and password.');
      return;
    }
    setAuth(
      {
        id: 'usr_superadmin',
        email: loginEmail,
        name: loginEmail.split('@')[0] || 'Administrator',
        role: 'SUPERADMIN'
      },
      'mock_jwt_token_2026'
    );
    navigate('/hub');
  };

  const handleLogout = () => {
    logout();
    navigate('/hub/login');
  };

  const writeAudit = (action: string, entityType: string, entityId: string, before: any, after: any) => {
    const newEntry: AuditLogEntry = {
      id: `audit_${Date.now()}`,
      actorId: user?.id || 'usr_superadmin',
      actorEmail: user?.email || 'admin@iraqi-chineseagency.com',
      action,
      entityType,
      entityId,
      before,
      after,
      diff: [{ path: 'status', from: before?.status || null, to: after?.status || null }],
      ip: '127.0.0.1',
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  // Dedicated Login View
  if (path === '/login' || (!user && path !== '/forgot-password' && path !== '/reset-password')) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-800 text-white font-black text-xl shadow-lg mb-2">
              CISE
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">CISE Command Hub</h1>
            <p className="text-xs text-neutral-400">Chinese Institute for Strategic and Economic Studies Control Center</p>
          </div>

          {loginError && (
            <div className="bg-red-950/80 border border-red-800 text-red-200 text-xs p-3 rounded-xl flex items-center gap-2">
              <AlertTriangle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Official Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="admin@iraqi-chineseagency.com"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Passcode / Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-800"
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-neutral-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded border-neutral-700 bg-neutral-950 text-brand-800 focus:ring-brand-800"
                />
                <span>Remember session for 30 days</span>
              </label>
              <Link to="/hub/forgot-password" className="text-brand-400 hover:underline">Forgot password?</Link>
            </div>
            <button
              type="submit"
              className="w-full bg-brand-800 hover:bg-brand-700 text-white font-black text-sm uppercase py-3 rounded-xl shadow-lg transition-all"
            >
              Authenticate & Enter Hub
            </button>
          </form>

          <div className="relative border-t border-neutral-800 my-4 text-center">
            <span className="absolute -top-2.5 bg-neutral-900 px-3 text-[10px] text-neutral-500 font-bold uppercase">Or Single Sign-On</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setAuth({ id: 'google_user_01', email: 'director@iraqi-chineseagency.com', name: 'Director General', role: 'SUPERADMIN' }, 'google_oauth_token');
              navigate('/hub');
            }}
            className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-all border border-neutral-700"
          >
            <Globe size={16} />
            <span>Sign In with Sovereign Google OAuth</span>
          </button>
        </div>
      </div>
    );
  }

  // Password Reset View
  if (path === '/forgot-password' || path === '/reset-password') {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black uppercase text-white">Password Recovery</h1>
            <p className="text-xs text-neutral-400">Security token verification for CISE Command Hub access</p>
          </div>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter accredited email"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white"
            />
            <button
              onClick={() => alert('Recovery dispatch token sent to your email address.')}
              className="w-full bg-brand-800 text-white font-black text-xs uppercase py-3 rounded-xl"
            >
              Dispatch Recovery Token
            </button>
            <div className="text-center">
              <Link to="/hub/login" className="text-xs text-brand-400 hover:underline">Return to Login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Top Header Navigation */}
      <header className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-40 px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/hub" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-brand-800 flex items-center justify-center text-white font-black text-sm shadow-md group-hover:scale-105 transition-transform">
              CISE
            </div>
            <div>
              <span className="text-sm font-black text-white uppercase tracking-wider block">CISE Command Hub</span>
              <span className="text-[10px] text-neutral-400 font-medium block">Control Centre</span>
            </div>
          </Link>

          {/* Role Override Selector for UI Testing */}
          <div className="hidden md:flex items-center gap-1.5 bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800 text-xs">
            <Shield size={14} className="text-brand-400" />
            <span className="text-[10px] font-bold text-neutral-400 uppercase">Role:</span>
            <select
              value={currentRole}
              onChange={e => setCurrentRole(e.target.value as any)}
              className="bg-transparent text-white font-bold uppercase focus:outline-none cursor-pointer text-xs"
            >
              <option value="superadmin">Superadmin</option>
              <option value="admin">Admin</option>
              <option value="reviewer">Reviewer</option>
              <option value="editor">Editor</option>
              <option value="translator">Translator</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPaletteOpen(true)}
            className="flex items-center gap-2 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 px-3 py-1.5 rounded-xl text-xs text-neutral-400 transition-all"
          >
            <Search size={14} />
            <span className="hidden sm:inline">Search Hub...</span>
            <kbd className="bg-neutral-800 text-neutral-300 text-[10px] px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white relative"
            >
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-800 rounded-full animate-ping"></span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-4 z-50 space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span className="text-xs font-black uppercase text-white">Hub Notifications</span>
                  <span className="text-[10px] bg-brand-800 text-white px-2 py-0.5 rounded-full font-bold">3 Unread</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800">
                    <p className="font-bold text-white">New Visa Application Received</p>
                    <p className="text-neutral-400 text-[11px]">Commercial M-Visa request from Erbil branch.</p>
                  </div>
                  <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800">
                    <p className="font-bold text-white">Pending Translation Task</p>
                    <p className="text-neutral-400 text-[11px]">Research brief requires Sorani Kurdish review.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Locale Picker */}
          <select
            value={activeLocale}
            onChange={e => setActiveLocale(e.target.value as any)}
            className="bg-neutral-950 border border-neutral-800 text-white text-xs font-bold px-2.5 py-1.5 rounded-xl focus:outline-none"
          >
            <option value="en">EN</option>
            <option value="ar">AR</option>
            <option value="zh">ZH</option>
            <option value="ckb">CK</option>
          </select>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700"
            >
              <div className="w-7 h-7 rounded-lg bg-brand-800 text-white flex items-center justify-center font-bold text-xs">
                {user?.name?.[0] || 'A'}
              </div>
              <span className="text-xs font-bold text-white hidden sm:inline">{user?.name || 'Administrator'}</span>
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-2 z-50 space-y-1 text-xs">
                <Link to="/hub/account" className="flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-300 hover:bg-neutral-800 hover:text-white">
                  <UserCheck size={14} />
                  <span>Account & 2FA</span>
                </Link>
                <Link to="/hub/account/sessions" className="flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-300 hover:bg-neutral-800 hover:text-white">
                  <KeyRound size={14} />
                  <span>Active Sessions</span>
                </Link>
                <Link to="/en/institute" className="flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-300 hover:bg-neutral-800 hover:text-white border-t border-neutral-800">
                  <Globe size={14} />
                  <span>View Public Portal</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:bg-red-950/50 hover:text-red-300"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col justify-between shrink-0 p-4 space-y-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-3">Main</span>
              <Link
                to="/hub"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  path === '' || path === '/' ? 'bg-brand-800 text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <LayoutDashboard size={16} />
                <span>Dashboard Overview</span>
              </Link>
            </div>

            {/* ICA Administration (4 Portals CRUD) */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-brand-800)]">ICA Administration</span>
                <span className="text-[9px] bg-red-950/80 text-red-400 border border-red-800/40 px-1.5 py-0.5 rounded font-mono font-bold">PORTALS</span>
              </div>
              <Link
                to="/hub/ica/public"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  path.startsWith('/ica/public') ? 'bg-[var(--color-brand-800)] text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <Globe size={16} />
                <span>Public Portal</span>
              </Link>
              <Link
                to="/hub/ica/secretariat"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  path.startsWith('/ica/secretariat') ? 'bg-[var(--color-brand-800)] text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <Shield size={16} />
                <span>Secretariat Hub</span>
              </Link>
              <Link
                to="/hub/ica/newsroom"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  path.startsWith('/ica/newsroom') ? 'bg-[var(--color-brand-800)] text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <FileText size={16} />
                <span>Newsroom</span>
              </Link>
              <Link
                to="/hub/ica/live"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  path.startsWith('/ica/live') ? 'bg-[var(--color-brand-800)] text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <Radio size={16} />
                <span>Live & Media Hub</span>
              </Link>
            </div>

            {/* Institute Section */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-3">Institute</span>
              <Link
                to="/hub/institute"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  path.startsWith('/institute') && !path.includes('pillars') && !path.includes('publications') && !path.includes('experts') && !path.includes('data-hub') ? 'bg-brand-800 text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <Building size={16} />
                <span>Overview & Charter</span>
              </Link>
              <Link
                to="/hub/institute/pillars"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  path.includes('pillars') ? 'bg-brand-800 text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <Layers size={16} />
                <span>Research Pillars</span>
              </Link>
              <Link
                to="/hub/institute/publications"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  path.includes('publications') ? 'bg-brand-800 text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <BookOpen size={16} />
                <span>Publications</span>
              </Link>
              <Link
                to="/hub/institute/experts"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  path.includes('experts') ? 'bg-brand-800 text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <Users size={16} />
                <span>Experts Directory</span>
              </Link>
              <Link
                to="/hub/institute/data-hub"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  path.includes('data-hub') ? 'bg-brand-800 text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <Database size={16} />
                <span>Data & Corridor Hub</span>
              </Link>
              <Link
                to="/hub/institute/settings"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  path.includes('institute/settings') ? 'bg-brand-800 text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <Settings size={16} />
                <span>Institute Settings</span>
              </Link>
            </div>

            {/* Initiatives / Services Section */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-3">Services</span>
              <Link
                to="/hub/services"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  path === '/services' ? 'bg-brand-800 text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <Briefcase size={16} />
                <span>Services Overview</span>
              </Link>
              <Link to="/hub/services/summit" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:bg-neutral-800 hover:text-white">
                <Award size={16} />
                <span>Summit & Expo</span>
              </Link>
              <Link to="/hub/services/chinese-centre" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:bg-neutral-800 hover:text-white">
                <Globe size={16} />
                <span>Chinese Centre</span>
              </Link>
              <Link to="/hub/services/visa-centre" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:bg-neutral-800 hover:text-white">
                <Plane size={16} />
                <span>Visa Centre</span>
              </Link>
              <Link to="/hub/services/settlement" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:bg-neutral-800 hover:text-white">
                <Coins size={16} />
                <span>Payment Settlement</span>
              </Link>
              <Link to="/hub/services/insurance" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:bg-neutral-800 hover:text-white">
                <ShieldCheck size={16} />
                <span>Insurance</span>
              </Link>
              <Link to="/hub/services/consultancy" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:bg-neutral-800 hover:text-white">
                <Briefcase size={16} />
                <span>Consultancy</span>
              </Link>
              <Link to="/hub/services/cultural-exchange" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:bg-neutral-800 hover:text-white">
                <GraduationCap size={16} />
                <span>Cultural Exchange</span>
              </Link>
            </div>

            {/* Submissions Inbox */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-3">Submissions</span>
              <Link to="/hub/submissions" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:bg-neutral-800 hover:text-white">
                <Inbox size={16} />
                <span>Unified Inbox</span>
              </Link>
            </div>

            {/* Governance & Analytics */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-3">Governance</span>
              <Link to="/hub/users" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:bg-neutral-800 hover:text-white">
                <UserCheck size={16} />
                <span>Users</span>
              </Link>
              <Link to="/hub/users/roles" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:bg-neutral-800 hover:text-white">
                <KeyRound size={16} />
                <span>Roles</span>
              </Link>
              <Link to="/hub/audit" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:bg-neutral-800 hover:text-white">
                <Shield size={16} />
                <span>Audit Log</span>
              </Link>
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-3 pt-2 block">Analytics</span>
              <Link to="/hub/analytics" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:bg-neutral-800 hover:text-white">
                <BarChart3 size={16} />
                <span>Overview</span>
              </Link>
              <Link to="/hub/analytics/content" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:bg-neutral-800 hover:text-white">
                <FileText size={16} />
                <span>Content</span>
              </Link>
              <Link to="/hub/analytics/submissions" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:bg-neutral-800 hover:text-white">
                <Inbox size={16} />
                <span>Submissions</span>
              </Link>
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-3 pt-2 block">System</span>
              <Link to="/hub/system" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:bg-neutral-800 hover:text-white">
                <Server size={16} />
                <span>Build Info</span>
              </Link>
              <Link to="/hub/system/revalidation" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:bg-neutral-800 hover:text-white">
                <RefreshCw size={16} />
                <span>Revalidation</span>
              </Link>
              <Link to="/hub/system/backup" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:bg-neutral-800 hover:text-white">
                <HardDrive size={16} />
                <span>Backup</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Dynamic Content Display per Route */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6 bg-neutral-950">
          {/* ICA Administration Sub-sections */}
          {path.startsWith('/ica/public') && <IcaAdministrationSection subSection="public" lang={activeLocale} />}
          {path.startsWith('/ica/secretariat') && <IcaAdministrationSection subSection="secretariat" lang={activeLocale} />}
          {path.startsWith('/ica/newsroom') && <IcaAdministrationSection subSection="newsroom" lang={activeLocale} />}
          {path.startsWith('/ica/live') && <IcaAdministrationSection subSection="live" lang={activeLocale} />}

          {/* Dashboard View */}
          {(path === '' || path === '/') && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight text-white">Control Centre Dashboard</h2>
                  <p className="text-xs text-neutral-400">CISE Sovereign Intelligence & Administrative Surface</p>
                </div>
                <button
                  onClick={() => writeAudit('revalidate', 'SystemCache', 'global', null, { revalidatedAt: new Date() })}
                  className="bg-neutral-900 border border-neutral-800 hover:border-brand-800 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-2"
                >
                  <RefreshCw size={14} />
                  <span>Manual Revalidate</span>
                </button>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase">Total Submissions</span>
                  <div className="text-2xl font-black text-white">1,482</div>
                  <span className="text-[10px] text-emerald-400 font-bold">+18.4% this month</span>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase">Visa Applications</span>
                  <div className="text-2xl font-black text-white">349</div>
                  <span className="text-[10px] text-brand-400 font-bold">24 awaiting review</span>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase">Active Publications</span>
                  <div className="text-2xl font-black text-white">86</div>
                  <span className="text-[10px] text-neutral-400 font-bold">4 languages verified</span>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase">Audit Records</span>
                  <div className="text-2xl font-black text-white">{auditLogs.length}</div>
                  <span className="text-[10px] text-emerald-400 font-bold">100% Immutable</span>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase text-white">Recent System Audit Entries</h3>
                  <Link to="/hub/audit" className="text-xs text-brand-400 font-bold hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-neutral-300">
                    <thead className="bg-neutral-950 text-neutral-500 font-bold uppercase border-b border-neutral-800">
                      <tr>
                        <th className="p-3">Actor</th>
                        <th className="p-3">Action</th>
                        <th className="p-3">Entity Type</th>
                        <th className="p-3">IP Address</th>
                        <th className="p-3">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                      {auditLogs.map(log => (
                        <tr key={log.id} className="hover:bg-neutral-850">
                          <td className="p-3 font-medium text-white">{log.actorEmail}</td>
                          <td className="p-3 uppercase font-bold text-brand-400">{log.action}</td>
                          <td className="p-3">{log.entityType} ({log.entityId})</td>
                          <td className="p-3 font-mono text-[11px]">{log.ip}</td>
                          <td className="p-3 text-neutral-400">{new Date(log.timestamp).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Submissions Inbox View */}
          {path.startsWith('/submissions') && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black uppercase text-white">Unified Submissions Inbox</h2>
                  <p className="text-xs text-neutral-400">Incoming service inquiries, visa applications & summit dossiers</p>
                </div>
                <button
                  onClick={() => alert('Exported all filtered submission records to CSV format.')}
                  className="bg-brand-800 text-white font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-2"
                >
                  <FileSpreadsheet size={14} />
                  <span>Export CSV</span>
                </button>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead className="bg-neutral-950 text-neutral-500 font-bold uppercase border-b border-neutral-800">
                    <tr>
                      <th className="p-3">Ref ID</th>
                      <th className="p-3">Service</th>
                      <th className="p-3">Applicant Name</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">PII Access</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    <tr className="hover:bg-neutral-850">
                      <td className="p-3 font-mono text-neutral-400">SUB-2026-881</td>
                      <td className="p-3 font-bold text-white">Visa Centre</td>
                      <td className="p-3">
                        {revealedPiiMap['SUB-2026-881'] ? 'Tariq Aziz (Erbil, Iraq)' : 'T**** A*** (PII Masked)'}
                      </td>
                      <td className="p-3">
                        <span className="bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded-full font-bold">
                          UNDER REVIEW
                        </span>
                      </td>
                      <td className="p-3">
                        {currentRole === 'superadmin' || currentRole === 'admin' ? (
                          <button
                            onClick={() => {
                              setRevealedPiiMap(prev => ({ ...prev, 'SUB-2026-881': true }));
                              writeAudit('reveal_pii', 'VisaSubmission', 'SUB-2026-881', null, { revealed: true });
                            }}
                            className="text-brand-400 hover:underline font-bold"
                          >
                            Reveal PII
                          </button>
                        ) : (
                          <span className="text-neutral-500 italic">Restricted</span>
                        )}
                      </td>
                      <td className="p-3 flex items-center gap-2">
                        <button className="text-xs bg-neutral-800 px-2 py-1 rounded text-white hover:bg-neutral-700">Audit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users & Roles View */}
          {path.startsWith('/users') || path.startsWith('/roles') ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black uppercase text-white">User Accounts & RBAC Matrix</h2>
                  <p className="text-xs text-neutral-400">Role assignments, clearance levels & permissions</p>
                </div>
                {currentRole === 'superadmin' && (
                  <button
                    onClick={() => alert('User invitation modal opened.')}
                    className="bg-brand-800 text-white font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-2"
                  >
                    <Plus size={14} />
                    <span>Invite New User</span>
                  </button>
                )}
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-black uppercase text-white">Active System Accounts</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-neutral-300">
                    <thead className="bg-neutral-950 text-neutral-500 font-bold uppercase border-b border-neutral-800">
                      <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Assigned Role</th>
                        <th className="p-3">2FA Status</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                      <tr className="hover:bg-neutral-850">
                        <td className="p-3 font-bold text-white">System Administrator</td>
                        <td className="p-3">admin@iraqi-chineseagency.com</td>
                        <td className="p-3"><span className="bg-brand-950 text-brand-200 border border-brand-700 px-2 py-0.5 rounded-full font-black">SUPERADMIN</span></td>
                        <td className="p-3 text-emerald-400 font-bold">Enabled</td>
                        <td className="p-3"><button className="text-neutral-400 hover:text-white">Edit</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null}

          {/* System Section View */}
          {path.startsWith('/system') && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-white">System Health & Metadata</h2>
                <p className="text-xs text-neutral-400">Build hash, connectivity probes and database export</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase">Build ID</span>
                  <div className="text-sm font-mono text-white">ICA-SUMMIT-2026-v1.0</div>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase">Git Commit</span>
                  <div className="text-sm font-mono text-emerald-400">9f81bc3c9f81</div>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase">Datastore Probe</span>
                  <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle size={14} /> Firestore Connected
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-black uppercase text-white">System Data Backup</h3>
                <p className="text-xs text-neutral-400">Export complete CISE database and active audit logs into compressed JSON format.</p>
                <button
                  onClick={() => alert('Full system JSON backup generated and downloaded.')}
                  className="bg-brand-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-2"
                >
                  <Download size={14} />
                  <span>Download Full Data Backup (JSON)</span>
                </button>
              </div>
            </div>
          )}

          {/* Generic CRUD View for Institute & Services */}
          {(path.startsWith('/institute') || path.startsWith('/services')) && !path.startsWith('/system') && !path.startsWith('/submissions') && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black uppercase text-white">{path.replace(/^\//, '').replace(/\//g, ' > ')} CRUD Management</h2>
                  <p className="text-xs text-neutral-400">Manage, translate, and audit content records</p>
                </div>
                {(currentRole === 'superadmin' || currentRole === 'admin' || currentRole === 'editor') && (
                  <button
                    onClick={() => alert('Create Form opened.')}
                    className="bg-brand-800 text-white font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-2"
                  >
                    <Plus size={14} />
                    <span>Create Record</span>
                  </button>
                )}
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Filter records..."
                    className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <span className="text-xs text-neutral-400">Role permissions: <strong className="text-brand-400 uppercase">{currentRole}</strong></span>
                </div>
                <div className="p-8 text-center text-xs text-neutral-400 border border-dashed border-neutral-800 rounded-xl">
                  Records for <span className="text-white font-bold">{path}</span> ready. Use the controls above to modify or publish.
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Command Palette Overlay */}
      {paletteOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20 p-4">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden space-y-3 p-4">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Search size={16} className="text-neutral-400" />
              <input
                type="text"
                value={paletteQuery}
                onChange={e => setPaletteQuery(e.target.value)}
                placeholder="Jump to any route or search content..."
                className="w-full bg-transparent text-sm text-white focus:outline-none"
                autoFocus
              />
              <button onClick={() => setPaletteOpen(false)} className="text-neutral-500 hover:text-white">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => { navigate('/hub/submissions'); setPaletteOpen(false); }}
                className="w-full text-left p-2 rounded-xl hover:bg-neutral-800 text-neutral-200"
              >
                Go to Unified Submissions Inbox
              </button>
              <button
                onClick={() => { navigate('/hub/users'); setPaletteOpen(false); }}
                className="w-full text-left p-2 rounded-xl hover:bg-neutral-800 text-neutral-200"
              >
                Go to Users & Role Management
              </button>
              <button
                onClick={() => { navigate('/hub/audit'); setPaletteOpen(false); }}
                className="w-full text-left p-2 rounded-xl hover:bg-neutral-800 text-neutral-200"
              >
                View System Audit Logs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
