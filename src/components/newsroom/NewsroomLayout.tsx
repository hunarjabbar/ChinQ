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

export function NewsroomLayout() {
  const location = useLocation();
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);
  const { user } = useAuthStore();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navItems = [
    { label: 'Dashboard', href: `/${currentLang}/newsroom/admin`, icon: LayoutDashboard, exact: true },
    { label: 'Articles', href: `/${currentLang}/newsroom/admin/articles`, icon: FileText },
    { label: 'Categories', href: `/${currentLang}/newsroom/admin/categories`, icon: Grid },
    { label: 'Tags', href: `/${currentLang}/newsroom/admin/tags`, icon: Tags },
    { label: 'Authors', href: `/${currentLang}/newsroom/admin/authors`, icon: Users },
    { label: 'Feeds', href: `/${currentLang}/newsroom/admin/feeds`, icon: Rss },
    { label: 'Analytics', href: `/${currentLang}/newsroom/admin/analytics`, icon: BarChart3 },
    { label: 'Settings', href: `/${currentLang}/newsroom/admin/settings`, icon: Settings },
  ];

  const isCurrent = (href: string, exact = false) => {
    if (exact) return location.pathname === href;
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
      {/* Header */}
      <header className="bg-black text-white px-4 h-14 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to={`/${currentLang}/newsroom`} className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[var(--color-brand-800)] rounded flex items-center justify-center font-black text-xs">NW</div>
            <span className="font-bold text-sm tracking-tight hidden sm:block uppercase">ICA Newsroom Desk</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to={`/${currentLang}/newsroom`} className="text-xs text-neutral-400 hover:text-white flex items-center gap-1">
            <span>Public View</span>
            <ExternalLink size={12} />
          </Link>
          <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px] font-bold">
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
                    ? 'bg-[var(--color-brand-800)] text-white shadow-lg shadow-red-900/10' 
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
    </div>
  );
}
