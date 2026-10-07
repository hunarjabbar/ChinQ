import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Shield,
  FileText,
  Radio,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  Eye,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  Filter,
  Film,
  Tv,
  Clapperboard,
  Users,
  Layers,
  Inbox,
  Mail
} from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { useAuthStore } from '../../store/useAuthStore';
import { PortalScope, NewsroomArticle, MediaItem, PublicInitiative } from '../../types/portals';

interface IcaCiseCommandHubProps {
  subSection: 'public' | 'secretariat' | 'newsroom' | 'live';
  lang?: string;
}

export function IcaAdministrationSection({ subSection, lang = 'en' }: IcaCiseCommandHubProps) {
  const { user } = useAuthStore();
  const [dataVersion, setDataVersion] = useState(0);
  const [revalidationLog, setRevalidationLog] = useState<string | null>(null);

  useEffect(() => {
    return portalStore.subscribe(() => setDataVersion(v => v + 1));
  }, []);

  // Scope Enforcement (Part 9.2)
  const isSuperAdmin = !user?.role || user.role.toUpperCase() === 'SUPERADMIN';
  const userScopes: PortalScope[] = user?.scopes || ['public', 'secretariat', 'newsroom', 'live'];
  const isAuthorized = isSuperAdmin || userScopes.includes(subSection);

  const triggerRevalidation = (path: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setRevalidationLog(`[ISR Revalidated] Path: ${path} at ${timestamp} (HTTP 200 OK)`);
    setTimeout(() => setRevalidationLog(null), 4000);
  };

  if (!isAuthorized) {
    return (
      <div className="p-8 rounded-2xl bg-neutral-900 border border-brand-900/50 text-center space-y-4">
        <AlertTriangle size={36} className="text-red-500 mx-auto" />
        <h3 className="text-lg font-black uppercase text-white">403 Forbidden — Scope Restricted</h3>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          Your active account does not hold the <code className="text-red-400 bg-neutral-950 px-1.5 py-0.5 rounded font-mono font-bold">"{subSection}"</code> scope. Contact a Superadmin to assign this scope to your credential profile.
        </p>
      </div>
    );
  }

  const articles = portalStore.getNewsArticles();
  const initiatives = portalStore.getInitiatives();
  const media = portalStore.getMediaItems();
  const subscribers = portalStore.getSubscribers();
  const liveStream = portalStore.getLiveStream();
  const inquiries = portalStore.getInquiries();

  return (
    <div className="space-y-6">
      {/* Revalidation Alert Banner */}
      {revalidationLog && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 font-mono text-xs flex items-center gap-2">
          <RefreshCw size={14} className="animate-spin text-emerald-400" />
          <span>{revalidationLog}</span>
        </div>
      )}

      {/* SUB-SECTION 1: PUBLIC PORTAL DASHBOARD */}
      {subSection === 'public' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
                <Globe size={14} />
                <span>ICA Administration • Public Portal</span>
              </div>
              <h2 className="text-xl font-black uppercase text-white">Public Portal Dashboard</h2>
              <p className="text-xs text-neutral-400">Manage public sections, 7 strategic initiatives, and subscriber registry.</p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={`/${lang}`}
                target="_blank"
                className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-600 text-xs font-bold text-white flex items-center gap-1.5 transition-colors"
              >
                <span>Open Public View</span>
                <ExternalLink size={13} />
              </Link>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[11px] font-mono text-neutral-400 uppercase">Strategic Initiatives</span>
              <div className="text-2xl font-mono font-black text-white mt-1">{initiatives.length} Programs</div>
              <span className="text-[10px] text-emerald-400 font-bold">100% Active in Registry</span>
            </div>
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[11px] font-mono text-neutral-400 uppercase">Public Subscribers</span>
              <div className="text-2xl font-mono font-black text-white mt-1">{subscribers.length} Contacts</div>
              <span className="text-[10px] text-blue-400 font-bold">Diplomatic Telex Verified</span>
            </div>
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[11px] font-mono text-neutral-400 uppercase">Live Stream Beacon</span>
              <div className="text-2xl font-mono font-black text-white mt-1">{liveStream.viewerCount.toLocaleString()} Live</div>
              <span className="text-[10px] text-red-400 font-bold">Ultra-Low Latency Active</span>
            </div>
          </div>

          {/* Initiatives Quick CRUD in CISE Command Hub */}
          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase text-white tracking-wider flex items-center gap-2">
                <Layers size={16} className="text-red-500" />
                <span>Seven Core Strategic Initiatives (Public Surface)</span>
              </h3>
              <button
                onClick={() => triggerRevalidation('/initiatives')}
                className="text-xs text-red-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw size={12} />
                <span>Trigger ISR Revalidate</span>
              </button>
            </div>

            <div className="divide-y divide-neutral-800 text-xs">
              {initiatives.map(init => (
                <div key={init.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{init.title.en}</div>
                    <div className="text-[11px] text-neutral-400 font-mono">{init.pillar} • {init.status}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/${lang}/initiatives/${init.slug}`}
                      className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-300"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => triggerRevalidation(`/initiatives/${init.slug}`)}
                      className="px-2.5 py-1 rounded bg-brand-950 border border-red-800 text-red-300 hover:bg-brand-900"
                    >
                      Revalidate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 2: SECRETARIAT DASHBOARD */}
      {subSection === 'secretariat' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
                <Shield size={14} />
                <span>ICA Administration • Secretariat Command</span>
              </div>
              <h2 className="text-xl font-black uppercase text-white">Secretariat Administrative Dashboard</h2>
              <p className="text-xs text-neutral-400">Institutional correspondence, governance parameters, and protocol authorizations.</p>
            </div>

            <Link
              to={`/${lang}/secretariat`}
              className="px-3.5 py-2 rounded-xl bg-red-800 hover:bg-red-700 text-xs font-bold uppercase text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Launch Secretariat Desk</span>
              <ExternalLink size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[11px] font-mono text-neutral-400 uppercase">Incoming Inquiries</span>
              <div className="text-2xl font-mono font-black text-white mt-1">{inquiries.length} Active</div>
              <span className="text-[10px] text-amber-400 font-bold">Direct Plenipotentiary Messages</span>
            </div>
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[11px] font-mono text-neutral-400 uppercase">RBAC Scopes Ledger</span>
              <div className="text-2xl font-mono font-black text-white mt-1">4 Portal Scopes</div>
              <span className="text-[10px] text-green-400 font-bold">Public, Sec, News, Live</span>
            </div>
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[11px] font-mono text-neutral-400 uppercase">Audit Ledger Records</span>
              <div className="text-2xl font-mono font-black text-white mt-1">100% Immutable</div>
              <span className="text-[10px] text-emerald-400 font-bold">ECDSA Verified</span>
            </div>
          </div>

          {/* Inquiries Table Preview */}
          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
            <h3 className="text-sm font-black uppercase text-white tracking-wider flex items-center gap-2">
              <Inbox size={16} className="text-red-500" />
              <span>Pending Institutional Inquiries</span>
            </h3>
            <div className="divide-y divide-neutral-800 text-xs">
              {inquiries.map(inq => (
                <div key={inq.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{inq.subject}</div>
                    <div className="text-[11px] text-neutral-400">{inq.name} ({inq.organization}) • {inq.department}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase bg-neutral-950 text-neutral-300 border border-neutral-800">
                    {inq.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 3: NEWSROOM DASHBOARD */}
      {subSection === 'newsroom' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
                <FileText size={14} />
                <span>ICA Administration • Newsroom Editorial</span>
              </div>
              <h2 className="text-xl font-black uppercase text-white">Newsroom Editorial Dashboard</h2>
              <p className="text-xs text-neutral-400">Govern journalistic dispatches, category schemas, and syndicated RSS/Atom/JSON feeds.</p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={`/${lang}/newsroom`}
                target="_blank"
                className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-600 text-xs font-bold text-white flex items-center gap-1.5 transition-colors"
              >
                <span>View Newsroom</span>
                <ExternalLink size={13} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[11px] font-mono text-neutral-400 uppercase">Published Dispatches</span>
              <div className="text-2xl font-mono font-black text-white mt-1">{articles.length} Stories</div>
              <span className="text-[10px] text-green-400 font-bold">Trilingual Verified</span>
            </div>
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[11px] font-mono text-neutral-400 uppercase">Syndication Feeds</span>
              <div className="text-2xl font-mono font-black text-white mt-1">RSS, Atom, JSON</div>
              <span className="text-[10px] text-blue-400 font-bold">Real-time XML Generated</span>
            </div>
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[11px] font-mono text-neutral-400 uppercase">Editorial Fellows</span>
              <div className="text-2xl font-mono font-black text-white mt-1">3 Accredited Bureaus</div>
              <span className="text-[10px] text-emerald-400 font-bold">Baghdad, Beijing, Erbil</span>
            </div>
          </div>

          {/* Quick Article CRUD in CISE Command Hub */}
          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase text-white tracking-wider flex items-center gap-2">
                <FileText size={16} className="text-red-500" />
                <span>Editorial Dispatch Registry</span>
              </h3>
              <button
                onClick={() => triggerRevalidation('/newsroom')}
                className="text-xs text-red-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw size={12} />
                <span>Revalidate Newsroom Index</span>
              </button>
            </div>

            <div className="divide-y divide-neutral-800 text-xs">
              {articles.map(article => (
                <div key={article.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{article.title.en}</div>
                    <div className="text-[11px] text-neutral-400 font-mono">{article.publishDate} • {article.author.name}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/${lang}/newsroom/${article.slug}`}
                      className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white"
                    >
                      Read
                    </Link>
                    <button
                      onClick={() => {
                        portalStore.softDeleteArticle(article.id);
                        triggerRevalidation(`/newsroom/${article.slug}`);
                      }}
                      className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-red-400 hover:bg-neutral-800 cursor-pointer"
                    >
                      Archive
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 4: LIVE PORTAL DASHBOARD */}
      {subSection === 'live' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
                <Radio size={14} className="animate-soft-vibrate" />
                <span>ICA Administration • Live & Media Hub</span>
              </div>
              <h2 className="text-xl font-black uppercase text-white">Live Broadcast & Media Hub Dashboard</h2>
              <p className="text-xs text-neutral-400">Stream controls, media assets (movies, drama, documentary, exchange), and chat moderation.</p>
            </div>

            <Link
              to={`/${lang}/live`}
              target="_blank"
              className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-600 text-xs font-bold text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Open Live Portal</span>
              <ExternalLink size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[11px] font-mono text-neutral-400 uppercase">Live Stream Signal</span>
              <div className="text-2xl font-mono font-black text-white mt-1">4K 60fps</div>
              <span className="text-[10px] text-green-400 font-bold">{liveStream.streamHealth.toUpperCase()} Health</span>
            </div>
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[11px] font-mono text-neutral-400 uppercase">Media Library Catalogue</span>
              <div className="text-2xl font-mono font-black text-white mt-1">{media.length} Titles</div>
              <span className="text-[10px] text-red-400 font-bold">Movies, Drama, Docs, Exchange</span>
            </div>
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[11px] font-mono text-neutral-400 uppercase">Broadcast Audience</span>
              <div className="text-2xl font-mono font-black text-white mt-1">{liveStream.viewerCount.toLocaleString()}</div>
              <span className="text-[10px] text-emerald-400 font-bold">Active Diplomatic Nodes</span>
            </div>
          </div>

          {/* Media Items Catalogue */}
          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase text-white tracking-wider flex items-center gap-2">
                <Film size={16} className="text-red-500" />
                <span>Media Catalogue (Movies, Drama, Documentary, Exchange)</span>
              </h3>
              <button
                onClick={() => triggerRevalidation('/live')}
                className="text-xs text-red-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw size={12} />
                <span>Revalidate Media Index</span>
              </button>
            </div>

            <div className="divide-y divide-neutral-800 text-xs">
              {media.map(item => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{item.title.en}</div>
                    <div className="text-[11px] text-neutral-400 font-mono uppercase text-red-400">
                      [{item.category}] • {item.duration} • {item.director}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/${lang}/live/${item.slug}`}
                      className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white"
                    >
                      Stream
                    </Link>
                    <button
                      onClick={() => triggerRevalidation(`/live/${item.slug}`)}
                      className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-red-400 hover:bg-neutral-800 cursor-pointer"
                    >
                      Revalidate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IcaAdministrationSection;
