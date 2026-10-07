import React from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Tags,
  Users,
  Rss,
  BarChart3,
  Settings,
  Grid,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';
import { BottomNav } from '../mobile/BottomNav';

export function NewsroomLayout() {
  const location = useLocation();
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);
  const { user } = useAuthStore();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navItems = [
    { label: 'Dashboard', href: `/${currentLang}/newsroom/admin`, icon: LayoutDashboard, exact: true },
    { label: 'Articles', href: `/${currentLang}/newsroom/hub-admin/articles`, icon: FileText },
    { label: 'Categories', href: `/${currentLang}/newsroom/hub-admin/categories`, icon: Grid },
    { label: 'Tags', href: `/${currentLang}/newsroom/hub-admin/tags`, icon: Tags },
    { label: 'Authors', href: `/${currentLang}/newsroom/hub-admin/authors`, icon: Users },
    { label: 'Feeds', href: `/${currentLang}/newsroom/hub-admin/feeds`, icon: Rss },
    { label: 'Analytics', href: `/${currentLang}/newsroom/hub-admin/analytics`, icon: BarChart3 },
    { label: 'Settings', href: `/${currentLang}/newsroom/hub-admin/settings`, icon: Settings },
  ];

  const isCurrent = (href: string, exact = false) => {
    if (exact) return location.pathname === href;
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col pb-16 md:pb-0">
      {/* Header */}
      <header className="bg-red-600 text-white px-4 h-14 sm:h-16 flex items-center justify-between sticky top-0 z-50 shadow-lg border-none">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to={`/${currentLang}/newsroom`} className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white text-red-600 rounded flex items-center justify-center font-black text-xs shadow-md">NW</div>
            <span className="font-black text-xs tracking-tight hidden sm:block uppercase">ICA Newsroom Desk</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to={`/${currentLang}/newsroom`} className="text-[10px] font-black uppercase text-white/70 hover:text-white flex items-center gap-1">
            <span>Public View</span>
            <ExternalLink size={12} />
          </Link>
          <div className="w-8 h-8 rounded-full bg-white/20 border border-white/20 flex items-center justify-center text-[10px] font-bold">
            {user?.name?.[0] || 'A'}
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-neutral-200 transform transition-transform duration-300 md:relative md:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <nav className="p-4 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 px-3 mb-2 block">News Management</span>
            {navItems.map(item => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all
                  ${isCurrent(item.href, item.exact) 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-black'}
                `}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-[#F9FAFB]">
          <Outlet />
        </main>
      </div>
      <BottomNav lang={currentLang as any} />
    </div>
  );
}
