import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Radio, Play, Activity, ChevronRight, Video, TrendingUp, Filter } from 'lucide-react';
import { LiveTimeline } from '../components/LiveTimeline';
import { Locale } from '../types';
import { useState } from 'react';

export function LivePortal() {
  const { lang } = useParams<{ lang: Locale }>();
  const [activeRegion, setActiveRegion] = useState('ALL');

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events', activeRegion],
    queryFn: async () => {
      const regionParam = activeRegion !== 'ALL' ? `?region=${activeRegion}` : '';
      const res = await fetch(`/api/events${regionParam}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch events');
      return res.json();
    }
  });

  const getTitle = (event: any) => {
    if (lang === 'ar') return event.titleAr;
    if (lang === 'ckb') return event.titleCkb || event.titleEn;
    if (lang === 'zh') return event.titleZh;
    return event.titleEn;
  };

  const getSummary = (event: any) => {
    if (lang === 'ar') return event.summaryAr;
    if (lang === 'ckb') return event.summaryCkb || event.summaryEn;
    if (lang === 'zh') return event.summaryZh;
    return event.summaryEn;
  };

  const isRtl = lang === 'ar' || lang === 'ckb';
  
  const activeEvents = events.filter((e: any) => e.isActive);
  const mainEvent = activeEvents.length > 0 ? activeEvents[0] : events[0];

  return (
    <div className="w-full bg-[#0a0a0a] min-h-screen text-white font-sans text-start" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Live Header */}
      <div className="border-b border-gray-800 bg-black sticky top-0 z-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xs bg-brand-800">
              <Radio size={20} className="text-white animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-xl sm:text-2xl uppercase tracking-widest block leading-none">
                {lang === 'ar' ? 'بث مباشر الوكالة' : lang === 'ckb' ? 'پەخشی ڕاستەوخۆی ئاژانس' : lang === 'zh' ? '伊拉克-中国通讯社 直播' : 'IRAQ - CHINA AGENCY LIVE'}
              </span>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1 block">Global Broadcast Network</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:flex items-center bg-white/10 p-1 rounded-xs">
              <select
                value={activeRegion}
                onChange={(e) => setActiveRegion(e.target.value)}
                className="bg-transparent text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded cursor-pointer outline-none border border-transparent hover:border-white/20 focus:border-brand-800 focus:ring-1 focus:ring-brand-800 appearance-none pr-8 relative"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.7rem top 50%',
                  backgroundSize: '0.65rem auto',
                }}
              >
                <option value="ALL" className="bg-neutral-900">{lang === 'ar' ? 'الكل' : lang === 'ckb' ? 'هەموو' : lang === 'zh' ? '全部' : 'ALL REGIONS'}</option>
                <option value="CHINA" className="bg-neutral-900">CHINA</option>
                <option value="IRAQ" className="bg-neutral-900">IRAQ</option>
                <option value="KURDISTAN" className="bg-neutral-900">KURDISTAN</option>
                <option value="BILATERAL" className="bg-neutral-900">BILATERAL</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400 border-l border-gray-800 pl-4 sm:pl-6">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                <span className="hidden sm:inline">{lang === 'ar' ? 'البث نشط' : lang === 'ckb' ? 'پەخشی ڕاستەوخۆ' : lang === 'zh' ? '广播开启' : 'Broadcast On'}</span>
              </span>
              <Link to={`/${lang}`} className="hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-xs text-xs">
                {lang === 'ar' ? 'الرئيسية' : lang === 'ckb' ? 'سەرەتا' : lang === 'zh' ? '主页' : 'Home'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Breaking News Marquee */}
      <div className="bg-brand-800 text-white border-y border-brand-500/30 overflow-hidden relative z-40">
        <div className="w-full max-w-7xl mx-auto flex items-center h-12 px-4 sm:px-6">
          <div className="flex items-center gap-2 font-black uppercase tracking-widest text-[11px] shrink-0 border-e border-brand-500/30 pe-6 me-6 bg-brand-800 z-10 relative">
            <TrendingUp size={16} className="text-white" />
            {lang === 'ar' ? 'عاجل' : lang === 'ckb' ? 'بەپەلە' : lang === 'zh' ? '突发新闻' : 'BREAKING NEWS'}
          </div>
          <div className="flex-1 overflow-hidden relative">
            <div className="flex whitespace-nowrap animate-marquee items-center text-sm font-bold tracking-wide">
              {activeEvents.map((ev: any) => (
                <span key={ev.id} className="mx-6 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-white rounded-full opacity-50"></span>
                  <span className="text-brand-200">{ev.region}</span>
                  <span>{getTitle(ev)} - {getSummary(ev)}</span>
                </span>
              ))}
              {activeEvents.length === 0 && (
                <span className="mx-6 text-white/70">AWAITING LIVE BROADCAST DISPATCHES...</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Full-Scale Broadcast Layout */}
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Main Video/Stream Area (Takes up 3 columns on extra large screens) */}
          <div className="xl:col-span-3 space-y-6 flex flex-col">
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-gray-800 shadow-[0_0_40px_rgba(0,0,0,0.8)] ring-1 ring-white/5">
              
              {mainEvent?.videoUrl ? (
                <iframe 
                  src={mainEvent.videoUrl} 
                  title="Live Broadcast"
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1600&auto=format&fit=crop" alt="Live Stream Standby" className="w-full h-full object-cover opacity-30 grayscale" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  
                  <div className="absolute z-10 flex flex-col items-center">
                    <button className="w-24 h-24 bg-brand-800/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-brand-800 hover:scale-105 transition-all shadow-[0_0_30px_rgba(153,0,0,0.5)] cursor-not-allowed">
                      <Radio size={40} className="text-white animate-pulse" />
                    </button>
                    <span className="mt-6 text-xl font-bold uppercase tracking-widest text-gray-400">Standby / Signal Lost</span>
                  </div>
                </div>
              )}
              
              {/* OSD (On-Screen Display) overlays - disabled if real iframe is full width, but we can overlay pointer-events-none */}
              <div className="absolute top-6 start-6 z-20 pointer-events-none flex flex-col items-start gap-2">
                <div className="bg-brand-800 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded flex items-center gap-2 shadow-sm hover:shadow-md">
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                  LIVE BROADCAST
                </div>
                {mainEvent && (
                  <div className="bg-black/80 backdrop-blur text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded shadow-sm hover:shadow-md border border-white/10">
                    {mainEvent.category} • {mainEvent.region}
                  </div>
                )}
              </div>
              
              {!mainEvent?.videoUrl && (
                <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none">
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-4 drop-shadow-md leading-tight max-w-4xl">
                    {mainEvent ? getTitle(mainEvent) : 'Awaiting Broadcast Signal...'}
                  </h2>
                  <p className="text-gray-300 text-base md:text-lg max-w-3xl line-clamp-2 leading-relaxed">
                    {mainEvent ? getSummary(mainEvent) : 'Stay tuned for live visual broadcasts and breaking news updates.'}
                  </p>
                </div>
              )}
            </div>

            {/* Sub-streams / Channel selector */}
            <div className="bg-brand-800 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                  <Video size={20} className="text-brand-500" />
                  <h3 className="font-bold uppercase tracking-widest text-sm text-gray-200">
                    {lang === 'ar' ? 'قنوات البث المتاحة' : lang === 'ckb' ? 'کەناڵەکانی پەخشی بەردەست' : lang === 'zh' ? '可用广播频道' : 'Available Broadcast Channels'}
                  </h3>
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500 bg-black/50 px-3 py-1 rounded border border-gray-800">
                  {events.length} Feeds
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event: any) => (
                  <Link key={event.id} to={`/${lang}/live/${event.slug}`} className="flex gap-4 p-4 rounded-xl border border-gray-800 hover:border-gray-600 hover:bg-white/5 transition-all group bg-black/20">
                    <div className="relative w-28 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-900 border border-gray-800 shadow-inner">
                      {event.videoUrl ? (
                        <div className="absolute inset-0 bg-brand-800/20 flex items-center justify-center">
                           <Video size={20} className="text-blue-400 opacity-50" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play size={20} className="text-gray-600 group-hover:text-brand-500 transition-colors" />
                        </div>
                      )}
                      
                      {event.isActive && (
                        <div className="absolute top-2 start-2 flex items-center gap-1.5 bg-black/60 backdrop-blur rounded px-1.5 py-0.5">
                          <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse shadow-[0_0_8px_var(--color-brand-500)]"></div>
                          <span className="text-[8px] font-black uppercase tracking-wider text-white">LIVE</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors line-clamp-2 leading-tight mb-2">
                        {getTitle(event)}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-1.5 py-0.5 rounded bg-gray-800 text-gray-400 font-bold uppercase tracking-wider">{event.region}</span>
                        {event.videoUrl && <span className="text-xs px-1.5 py-0.5 rounded bg-brand-800/30 text-blue-400 border border-blue-800 font-bold uppercase tracking-wider">VIDEO</span>}
                      </div>
                    </div>
                  </Link>
                ))}
                {events.length === 0 && (
                  <div className="col-span-full py-8 text-center text-gray-500 font-bold text-xs uppercase tracking-widest">
                    No active channels in this region
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Live Timeline Feed Sidebar (1 column) */}
          <div className="xl:col-span-1 bg-brand-800 border border-gray-800 rounded-xl overflow-hidden flex flex-col h-[calc(100vh-10rem)] xl:sticky xl:top-[8rem] shadow-xl">
            <div className="p-5 border-b border-gray-800 bg-gradient-to-b from-[#1a1a1a] to-[#1A1A1A] flex items-center justify-between shrink-0 shadow-sm relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-brand-500/10 text-brand-500">
                  <Activity size={18} className="animate-pulse" />
                </div>
                <h3 className="font-bold uppercase tracking-widest text-sm text-white">
                  {lang === 'ar' ? 'تحديثات في الوقت الفعلي' : lang === 'ckb' ? 'نوێکارییەکانی کاتی ڕاستەقینە' : lang === 'zh' ? '实时更新' : 'Live Timeline'}
                </h3>
              </div>
              {mainEvent && (
                <Link to={`/${lang}/live/${mainEvent.slug}`} className="text-xs uppercase font-bold text-gray-400 hover:text-white transition-colors border border-gray-700 hover:border-gray-500 px-2 py-1 rounded bg-black/50">
                   Open <ChevronRight size={12} className="inline -mt-0.5" />
                </Link>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto bg-black/40 custom-scrollbar p-1">
              {mainEvent ? (
                <div className="dark-timeline h-full">
                  <LiveTimeline slug={mainEvent.slug} lang={lang || 'en'} darkTheme={true} />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-600 text-sm gap-3 p-8 text-center">
                  <Activity size={32} className="opacity-20" />
                  <p className="font-bold uppercase tracking-widest text-xs">Timeline Standby</p>
                  <p className="text-xs uppercase text-gray-700">Waiting for command desk updates</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
