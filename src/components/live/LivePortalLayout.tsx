import React from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import {
  LayoutDashboard,
  Radio,
  Film,
  Tv,
  Clapperboard,
  Video,
  Calendar,
  BarChart3,
  Settings,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function LivePortalLayout() {
  const location = useLocation();
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);
  const { user } = useAuthStore();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navItems = [
    { label: 'Dashboard', href: `/${currentLang}/live/admin`, icon: LayoutDashboard, exact: true },
    { label: 'Live Streams', href: `/${currentLang}/live/admin/streams`, icon: Radio },
    { label: 'Movies', href: `/${currentLang}/live/admin/movies`, icon: Film },
    { label: 'Drama', href: `/${currentLang}/live/admin/drama`, icon: Tv },
    { label: 'Documentary', href: `/${currentLang}/live/admin/documentary`, icon: Clapperboard },
    { label: 'Exchange Videos', href: `/${currentLang}/live/admin/exchange`, icon: Video },
    { label: 'Schedule', href: `/${currentLang}/live/admin/schedule`, icon: Calendar },
    { label: 'Analytics', href: `/${currentLang}/live/admin/analytics`, icon: BarChart3 },
    { label: 'Settings', href: `/${currentLang}/live/admin/settings`, icon: Settings },
  ];

  const isCurrent = (href: string, exact = false) => {
    if (exact) return location.pathname === href;
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="bg-neutral-900 border-b border-neutral-800 px-4 h-14 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to={`/${currentLang}/live`} className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[var(--color-brand-800)] rounded flex items-center justify-center font-black text-xs">LV</div>
            <span className="font-bold text-sm tracking-tight hidden sm:block uppercase">Live Portal Broadcast Desk</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to={`/${currentLang}/live`} className="text-xs text-neutral-400 hover:text-white flex items-center gap-1">
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
          fixed inset-y-0 left-0 z-40 w-64 bg-neutral-950 border-r border-neutral-900 transform transition-transform duration-300 md:relative md:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <nav className="p-4 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 px-3 mb-2 block">Media Control</span>
            {navItems.map(item => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all
                  ${isCurrent(item.href, item.exact) 
                    ? 'bg-[var(--color-brand-800)] text-white shadow-lg shadow-red-900/10' 
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'}
                `}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-[#050505]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
