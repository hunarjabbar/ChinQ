import React from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Layers,
  Video,
  Mail,
  Inbox,
  Users,
  ShieldCheck,
  Settings,
  Globe,
  Radio,
  ExternalLink,
  Shield
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function SecretariatHubLayout() {
  const location = useLocation();
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);
  const { user } = useAuthStore();

  const navItems = [
    { label: t('secretariat.dashboard'), href: `/${currentLang}/secretariat`, icon: LayoutDashboard, exact: true },
    { label: t('secretariat.content'), href: `/${currentLang}/secretariat/content`, icon: FileText },
    { label: t('secretariat.initiatives'), href: `/${currentLang}/secretariat/initiatives`, icon: Layers },
    { label: t('secretariat.media'), href: `/${currentLang}/secretariat/media`, icon: Video },
    { label: t('secretariat.newsletter'), href: `/${currentLang}/secretariat/newsletter`, icon: Mail },
    { label: t('secretariat.forms'), href: `/${currentLang}/secretariat/forms`, icon: Inbox },
    { label: t('secretariat.users'), href: `/${currentLang}/secretariat/users`, icon: Users },
    { label: t('secretariat.audit'), href: `/${currentLang}/secretariat/audit`, icon: ShieldCheck },
    { label: t('secretariat.settings'), href: `/${currentLang}/secretariat/settings`, icon: Settings },
  ];

  const isCurrent = (href: string, exact = false) => {
    if (exact) return location.pathname === href;
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Top Header */}
      <header className="bg-[#000000] text-white border-b border-neutral-800 px-4 sm:px-8 py-3.5 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <Link to={`/${currentLang}/secretariat`} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-800)] flex items-center justify-center font-black text-xs text-white">
              ICA
            </div>
            <div>
              <span className="font-serif font-bold text-sm tracking-tight block text-white">
                SECRETARIAT COMMAND HUB
              </span>
              <span className="text-[10px] font-mono text-neutral-400 block -mt-0.5">
                Plenipotentiary Administration Console
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link
            to="/hub"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
          >
            <Shield size={13} className="text-[var(--color-brand-800)]" />
            <span>CISE Command Hub</span>
          </Link>

          <Link
            to={`/${currentLang}`}
            className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
          >
            <span>{t('secretariat.openPublic')}</span>
            <ExternalLink size={13} />
          </Link>

          <div className="flex items-center gap-2 ps-3 border-s border-neutral-800">
            <div className="w-6 h-6 rounded-full bg-[var(--color-brand-800)] text-white flex items-center justify-center font-bold text-[10px]">
              {user?.name?.[0] || 'A'}
            </div>
            <span className="font-bold text-white hidden sm:inline">{user?.name || 'Administrator'}</span>
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Secretariat Sidebar */}
        <aside className="w-64 bg-[#FFFFFF] border-r border-[#E5E7EB] shrink-0 p-4 space-y-6 hidden md:flex md:flex-col justify-between overflow-y-auto">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#4B5563] px-3 mb-2 block">
              Governance & CRUD
            </span>
            {navItems.map(item => {
              const Icon = item.icon;
              const active = isCurrent(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-[var(--color-brand-800)] text-white shadow-sm'
                      : 'text-[#000000] hover:bg-[#F9FAFB] hover:text-[var(--color-brand-800)]'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2 text-xs">
            <div className="font-bold text-[#000000]">Security Scope</div>
            <div className="text-[11px] font-mono text-[var(--color-brand-800)] font-bold">ALL-SCOPES AUTHORIZED</div>
            <p className="text-[10px] text-[#4B5563]">
              Synchronized with CISE Command Hub RBAC ledger.
            </p>
          </div>
        </aside>

        {/* Content Outlet Area */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SecretariatHubLayout;
