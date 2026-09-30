import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FileText,
  Layers,
  Video,
  Mail,
  Inbox,
  Users,
  ShieldCheck,
  TrendingUp,
  Plus,
  ExternalLink,
  ArrowRight,
  Radio,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function SecretariatDashboard() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    return portalStore.subscribe(() => setDataVersion(v => v + 1));
  }, []);

  const articles = portalStore.getNewsArticles();
  const initiatives = portalStore.getInitiatives();
  const media = portalStore.getMediaItems();
  const subscribers = portalStore.getSubscribers();
  const inquiries = portalStore.getInquiries();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
        <div>
          <span className="text-xs font-mono font-bold text-[var(--color-brand-800)] uppercase tracking-wider block mb-1">
            General Secretariat Plenary
          </span>
          <h1 className="font-serif text-3xl font-black text-[#000000]">
            {t('secretariat.title')}
          </h1>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
            {t('secretariat.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/${currentLang}`}
            className="px-4 py-2.5 rounded-xl border border-[#E5E7EB] hover:border-[var(--color-brand-800)] bg-white text-xs font-bold text-[#000000] flex items-center gap-2 shadow-xs transition-colors"
          >
            <span>{t('secretariat.openPublic')}</span>
            <ExternalLink size={14} />
          </Link>

          <Link
            to={`/${currentLang}/secretariat/content`}
            className="px-4 py-2.5 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#A00D26] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
          >
            <Plus size={14} />
            <span>{t('secretariat.createItem')}</span>
          </Link>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#4B5563] uppercase">Published Articles</span>
            <FileText size={18} className="text-[var(--color-brand-800)]" />
          </div>
          <div className="text-3xl font-mono font-black text-[#000000]">{articles.length}</div>
          <div className="text-[11px] text-green-600 font-bold mt-1">Active in Newsroom</div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#4B5563] uppercase">Media Hub Items</span>
            <Video size={18} className="text-[var(--color-brand-800)]" />
          </div>
          <div className="text-3xl font-mono font-black text-[#000000]">{media.length}</div>
          <div className="text-[11px] text-green-600 font-bold mt-1">Movies, Drama & Docs</div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#4B5563] uppercase">Subscribers</span>
            <Mail size={18} className="text-[var(--color-brand-800)]" />
          </div>
          <div className="text-3xl font-mono font-black text-[#000000]">{subscribers.length}</div>
          <div className="text-[11px] text-blue-600 font-bold mt-1">Diplomatic & Trade Leads</div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#4B5563] uppercase">Open Inquiries</span>
            <Inbox size={18} className="text-[var(--color-brand-800)]" />
          </div>
          <div className="text-3xl font-mono font-black text-[#000000]">{inquiries.length}</div>
          <div className="text-[11px] text-amber-600 font-bold mt-1">Pending Intake Review</div>
        </div>
      </div>

      {/* 4 Portals Operations Central Card Grid */}
      <div>
        <h3 className="font-serif text-xl font-bold text-[#000000] mb-4">
          Direct Portal Operations Desks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Public Portal Desk */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-bold text-base text-[#000000] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-800)]"></span>
                <span>Public Portal Operations</span>
              </div>
              <Link to={`/${currentLang}`} className="text-xs text-[var(--color-brand-800)] font-bold hover:underline flex items-center gap-1">
                <span>View Live</span>
                <ExternalLink size={12} />
              </Link>
            </div>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Manages the 7 core strategic initiatives, hero headline dispatches, and curated trending stories across the external surface.
            </p>
            <div className="flex gap-2 pt-2">
              <Link
                to={`/${currentLang}/secretariat/initiatives`}
                className="px-3 py-1.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-xs font-bold text-[#000000]"
              >
                Manage Initiatives
              </Link>
              <Link
                to={`/${currentLang}/secretariat/content`}
                className="px-3 py-1.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-xs font-bold text-[#000000]"
              >
                Edit Hero & World
              </Link>
            </div>
          </div>

          {/* Newsroom Operations Desk */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-bold text-base text-[#000000] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-800)]"></span>
                <span>Newsroom Bureau Dispatch</span>
              </div>
              <Link to={`/${currentLang}/newsroom`} className="text-xs text-[var(--color-brand-800)] font-bold hover:underline flex items-center gap-1">
                <span>View Newsroom</span>
                <ExternalLink size={12} />
              </Link>
            </div>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Manages accredited journalistic articles, bilateral author credentials, syndicate RSS/Atom feeds, and breaking news banners.
            </p>
            <div className="flex gap-2 pt-2">
              <Link
                to={`/${currentLang}/secretariat/content`}
                className="px-3 py-1.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-xs font-bold text-[#000000]"
              >
                Publish New Dispatch
              </Link>
              <Link
                to={`/${currentLang}/newsroom/archive`}
                className="px-3 py-1.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-xs font-bold text-[#000000]"
              >
                View Dispatches
              </Link>
            </div>
          </div>

          {/* Live Portal Desk */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-bold text-base text-[#000000] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-800)]"></span>
                <span>Live Streaming & Media Hub</span>
              </div>
              <Link to={`/${currentLang}/live`} className="text-xs text-[var(--color-brand-800)] font-bold hover:underline flex items-center gap-1">
                <span>View Live Media</span>
                <ExternalLink size={12} />
              </Link>
            </div>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Curates full feature movies, serialized drama, technical documentaries, and cultural exchange video libraries.
            </p>
            <div className="flex gap-2 pt-2">
              <Link
                to={`/${currentLang}/secretariat/media`}
                className="px-3 py-1.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-xs font-bold text-[#000000]"
              >
                Media CRUD
              </Link>
              <Link
                to={`/${currentLang}/live/schedule`}
                className="px-3 py-1.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-xs font-bold text-[#000000]"
              >
                Broadcast Schedule
              </Link>
            </div>
          </div>

          {/* Secretariat Intake Desk */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-bold text-base text-[#000000] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-800)]"></span>
                <span>Institutional Protocol & Inquiries</span>
              </div>
              <Link to={`/${currentLang}/secretariat/forms`} className="text-xs text-[var(--color-brand-800)] font-bold hover:underline flex items-center gap-1">
                <span>View Inquiries</span>
                <ArrowRight size={12} />
              </Link>
            </div>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Processes ministerial inquiries, delegation fast-track requests, press credential verification, and bilateral commerce inquiries.
            </p>
            <div className="flex gap-2 pt-2">
              <Link
                to={`/${currentLang}/secretariat/forms`}
                className="px-3 py-1.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-xs font-bold text-[#000000]"
              >
                Review Submissions
              </Link>
              <Link
                to={`/${currentLang}/secretariat/newsletter`}
                className="px-3 py-1.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-xs font-bold text-[#000000]"
              >
                Subscribers ({subscribers.length})
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecretariatDashboard;
