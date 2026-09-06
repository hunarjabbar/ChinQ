import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { 
  Users, 
  FileText, 
  Terminal, 
  BookOpen, 
  TrendingUp, 
  Activity,
  Globe,
  Radio,
  Mail,
  ArrowUpRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export function AdminOverview({ onSelectTab }: { onSelectTab?: (tab: string) => void }) {
  const navigate = useNavigate();
  const { lang = 'en' } = useParams<{ lang: string }>();

  const { data: articles = [] } = useQuery<any[]>({
    queryKey: ['admin-articles'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/articles');
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

  const { data: subscribers = [] } = useQuery<any[]>({
    queryKey: ['admin-subscribers'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/subscribers');
      if (!res.ok) return [];
      return res.json();
    }
  });

  const { data: users = [] } = useQuery<any[]>({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/users');
      if (!res.ok) return [];
      return res.json();
    }
  });

  const stats = [
    { name: 'Editorial Assets', value: articles.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', tab: 'article' },
    { name: 'User Management', value: users.length, icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50', tab: 'users' },
    { name: 'Sovereign Dossiers', value: applications.length, icon: Users, color: 'text-brand-800', bg: 'bg-brand-50', tab: 'applications' },
    { name: 'Telex Information', value: telexes.length, icon: Terminal, color: 'text-green-600', bg: 'bg-green-50', tab: 'telexes' },
    { name: 'Sovereign Subscribers', value: subscribers.length, icon: Mail, color: 'text-amber-600', bg: 'bg-amber-50', tab: 'subscribers' },
  ];

  const pendingDossiers = applications.filter(a => a.status === 'PENDING').length;
  const unreadTelex = telexes.filter(t => t.status === 'UNREAD').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-start">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div 
            key={stat.name} 
            onClick={() => {
              if (onSelectTab && stat.tab) onSelectTab(stat.tab);
              else if (stat.tab === 'users') navigate(`/${lang}/admin/users`);
            }}
            className="bg-white border border-neutral-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-brand-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-mono font-bold text-neutral-400 flex items-center gap-1">
                View <ArrowUpRight size={10} />
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-black text-ink-900 tracking-tight">{stat.value}</div>
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{stat.name}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alerts & Critical Queue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50/50 flex justify-between items-center">
              <h3 className="text-sm font-black uppercase tracking-widest text-ink-900 flex items-center gap-2">
                <Activity size={16} className="text-brand-800" />
                Critical Command Queue
              </h3>
              <div className="flex gap-2">
                {pendingDossiers > 0 && (
                  <span className="bg-brand-800 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                    {pendingDossiers} Pending Dossiers
                  </span>
                )}
                {unreadTelex > 0 && (
                  <span className="bg-green-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                    {unreadTelex} Unread Telex
                  </span>
                )}
              </div>
            </div>
            <div className="divide-y divide-neutral-100">
              {pendingDossiers === 0 && unreadTelex === 0 ? (
                <div className="px-6 py-12 text-center text-neutral-500 italic text-sm font-mono">
                  All enterprise queues are currently clear.
                </div>
              ) : (
                <>
                  {applications.filter(a => a.status === 'PENDING').slice(0, 3).map(app => (
                    <div key={app.id} className="px-6 py-4 hover:bg-neutral-50 transition-colors flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-ink-900">{app.fullName}</p>
                        <p className="text-[11px] text-neutral-500 uppercase tracking-wide font-mono">{app.company} • {app.bureau} Node</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold text-neutral-400 font-mono">{new Date(app.createdAt).toLocaleDateString()}</span>
                        <div className="w-2 h-2 bg-brand-800 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                  {telexes.filter(t => t.status === 'UNREAD').slice(0, 3).map(tlx => (
                    <div key={tlx.id} className="px-6 py-4 hover:bg-neutral-50 transition-colors flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-ink-900">Telex Ref: {tlx.telexRef}</p>
                        <p className="text-[11px] text-neutral-500 uppercase tracking-wide font-mono">From: {tlx.name} ({tlx.company})</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold text-neutral-400 font-mono">{new Date(tlx.createdAt).toLocaleDateString()}</span>
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Radio size={160} />
              </div>
              <div className="relative z-10 space-y-6">
                <h3 className="text-xl font-serif font-black leading-tight">Authorize Global Broadcast</h3>
                <p className="text-neutral-400 text-[10px] leading-relaxed max-w-md font-medium uppercase tracking-wider">
                  Instantly synchronize a trilingual signal across all public headers. Used for high-priority bilateral dispatches.
                </p>
                <div className="pt-4 flex flex-wrap gap-3">
                  <button className="bg-brand-800 hover:bg-brand-700 text-white font-black text-[9px] px-5 py-2.5 rounded-lg uppercase tracking-widest transition-all cursor-pointer shadow-lg flex items-center gap-2">
                    <Radio size={12} className="animate-pulse" />
                    Initialize Signal
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 border-b border-neutral-100 pb-4">Command & Operations Hub</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                 {[
                   { label: 'User Hub', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50', tab: 'users' },
                   { label: 'Dispatch', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50', tab: 'article' },
                   { label: 'AI Import', icon: Sparkles, color: 'text-brand-800', bg: 'bg-brand-50', tab: 'search' },
                   { label: 'Telex', icon: Terminal, color: 'text-green-600', bg: 'bg-green-50', tab: 'telexes' },
                   { label: 'Partners', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50', tab: 'applications' },
                   { label: 'Studies', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50', tab: 'studies' },
                 ].map((item) => (
                   <button 
                     key={item.label} 
                     onClick={() => {
                       if (onSelectTab) onSelectTab(item.tab);
                       else if (item.tab === 'users') navigate(`/${lang}/admin/users`);
                     }}
                     className="flex flex-col items-center justify-center p-3 rounded-xl border border-neutral-100 hover:border-brand-800 hover:shadow-md transition-all group cursor-pointer bg-neutral-50/50 hover:bg-white"
                   >
                      <div className={`w-9 h-9 ${item.bg} ${item.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                        <item.icon size={16} />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-neutral-700">{item.label}</span>
                   </button>
                 ))}
              </div>
            </div>
          </div>
        </div>

        {/* Global Signals Section */}
        <div className="space-y-6">
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm p-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-ink-900 mb-6 flex items-center gap-2">
              <Globe size={16} className="text-brand-800" />
              Information Nodes
            </h3>
            <div className="space-y-6">
              {[
                { city: 'Baghdad', status: 'Active', latency: '42ms', color: 'bg-green-500' },
                { city: 'Beijing', status: 'Active', latency: '128ms', color: 'bg-green-500' },
                { city: 'Basra', status: 'Active', latency: '38ms', color: 'bg-green-500' },
                { city: 'Shanghai', status: 'Dormant', latency: '--', color: 'bg-neutral-300' },
              ].map(node => (
                <div key={node.city} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${node.color}`}></div>
                    <span className="text-xs font-bold text-ink-900 uppercase tracking-tight">{node.city}</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 font-bold">{node.latency}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-neutral-100">
               <button className="w-full bg-neutral-50 hover:bg-neutral-100 text-neutral-700 font-bold text-[10px] py-2.5 rounded uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer border border-neutral-200">
                <Activity size={12} />
                Network Diagnostics
              </button>
            </div>
          </div>

          <div className="bg-brand-800 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Globe size={120} />
            </div>
            <div className="relative z-10 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-white/80">Sovereign Intel Brief</h4>
              <p className="text-lg font-serif font-black leading-tight italic">
                "Bilateral trade clearing mechanism finalized for Basra-Beijing energy corridor."
              </p>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded">Confidential</span>
                <span className="text-[10px] font-bold uppercase tracking-widest border border-white/30 px-2 py-0.5 rounded">Tier 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
