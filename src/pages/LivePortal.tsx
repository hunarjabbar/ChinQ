import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Radio, Play, Activity, ChevronRight, Video, TrendingUp, Filter } from 'lucide-react';
import { LiveTimeline } from '../components/LiveTimeline';
import { Locale } from '../types';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { useI18n } from '../hooks/useI18n';

export function LivePortal() {
  const { lang } = useParams<{ lang: Locale }>();
  const { t } = useI18n(lang || 'en');
  const [activeRegion, setActiveRegion] = useState('ALL');
  const seenEventIds = useRef<Set<string>>(new Set());
  const isFirstLoad = useRef(true);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events', activeRegion],
    queryFn: async () => {
      const regionParam = activeRegion !== 'ALL' ? `?region=${activeRegion}` : '';
      const res = await fetch(`/api/events${regionParam}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch events');
      return res.json();
    },
    refetchInterval: 10000, // Faster interval for real-time updates
  });

  const lastUpdateIds = useRef<Record<string, string>>({});

  // Notify on new active events OR new updates within events
  useEffect(() => {
    if (events.length > 0) {
      const activeEvents = events.filter((e: any) => e.isActive);
      
      if (isFirstLoad.current) {
        activeEvents.forEach((e: any) => {
          seenEventIds.current.add(e.id);
          if (e.updates && e.updates.length > 0) {
            lastUpdateIds.current[e.id] = e.updates[0].id;
          }
        });
        isFirstLoad.current = false;
      } else {
        // 1. Check for brand new events
        const freshEvents = activeEvents.filter((e: any) => !seenEventIds.current.has(e.id));
        
        freshEvents.forEach((event: any) => {
          const title = lang === 'ar' ? 'بث حي جديد' : lang === 'zh' ? '新直播信号' : lang === 'ckb' ? 'پەخشێکی نوێ' : 'New Live Signal';
          const eventTitle = getTitle(event);
          
          toast.success(title, {
            description: eventTitle,
            icon: <Video className="w-5 h-5 text-red-500 animate-pulse" />,
            duration: 8000,
          });
          
          seenEventIds.current.add(event.id);
          if (event.updates && event.updates.length > 0) {
            lastUpdateIds.current[event.id] = event.updates[0].id;
          }
        });

        // 2. Check for new updates in existing active events
        activeEvents.forEach((event: any) => {
          if (event.updates && event.updates.length > 0) {
            const latestUpdate = event.updates[0];
            const lastKnownUpdateId = lastUpdateIds.current[event.id];

            if (lastKnownUpdateId && latestUpdate.id !== lastKnownUpdateId) {
              // New update found
              const toastTitle = lang === 'ar' ? 'تحديث مباشر جديد' : lang === 'zh' ? '实时更新' : lang === 'ckb' ? 'نوێکاری ڕاستەوخۆ' : 'New Live Update';
              const updateContent = lang === 'ar' ? latestUpdate.contentAr : lang === 'zh' ? latestUpdate.contentZh : lang === 'ckb' ? latestUpdate.contentCkb || latestUpdate.contentEn : latestUpdate.contentEn;

              toast.info(toastTitle, {
                description: `${getTitle(event)}: ${updateContent?.substring(0, 80)}...`,
                icon: <Activity className="w-5 h-5 text-emerald-500" />,
                duration: 6000,
              });
            }
            lastUpdateIds.current[event.id] = latestUpdate.id;
          }
        });
      }
    }
  }, [events, lang]);

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
      <div className="border-b border-white/5 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
              <Radio size={24} className="text-red-500 animate-pulse" />
            </div>
            <div>
              <span className="font-black text-xl sm:text-2xl uppercase tracking-[0.15em] block leading-none text-white">
                {t('liveDispatch')}
              </span>
              <span className="text-[10px] text-neutral-500 font-black uppercase tracking-[0.25em] mt-2 block">{t('globalBroadcastNetwork')}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center bg-white/5 p-1 rounded-lg border border-white/5">
              <select
                value={activeRegion}
                onChange={(e) => setActiveRegion(e.target.value)}
                className="bg-transparent text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded cursor-pointer outline-none hover:bg-white/5 transition-all appearance-none pr-10 relative"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem top 50%',
                  backgroundSize: '0.6rem auto',
                }}
              >
                <option value="ALL" className="bg-neutral-900">{lang === 'ar' ? 'الكل' : lang === 'ckb' ? 'هەموو' : lang === 'zh' ? '全部' : 'ALL REGIONS'}</option>
                <option value="CHINA" className="bg-neutral-900">CHINA</option>
                <option value="IRAQ" className="bg-neutral-900">IRAQ</option>
                <option value="KURDISTAN" className="bg-neutral-900">KURDISTAN</option>
                <option value="BILATERAL" className="bg-neutral-900">BILATERAL</option>
              </select>
            </div>
            
            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 border-s border-white/10 ps-6">
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                <span className="hidden sm:inline">{lang === 'ar' ? 'البث نشط' : lang === 'ckb' ? 'پەخشی ڕاستەوخۆ' : lang === 'zh' ? '广播开启' : 'Signal Active'}</span>
              </span>
              <Link to={`/${lang}`} className="hover:text-white transition-all bg-white/5 hover:bg-white/10 border border-white/5 px-4 py-2 rounded-md text-[10px]">
                {lang === 'ar' ? 'الرئيسية' : lang === 'ckb' ? 'سەرەتا' : lang === 'zh' ? '主页' : 'Return Home'}
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
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          {/* Main Video/Stream Area */}
          <div className="xl:col-span-3 space-y-8 flex flex-col">
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-white/5 shadow-2xl ring-1 ring-white/10">
              
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
                  <img src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1600&auto=format&fit=crop" alt="Live Stream Standby" className="w-full h-full object-cover opacity-20 grayscale" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  
                  <div className="absolute z-10 flex flex-col items-center">
                    <button className="w-24 h-24 bg-brand-800/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10 hover:bg-brand-800/40 hover:scale-105 transition-all shadow-[0_0_30px_rgba(204,0,0,0.3)] cursor-not-allowed">
                      <Radio size={40} className="text-red-500 animate-pulse" />
                    </button>
                    <span className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-neutral-500">Standby • Frequency Locked</span>
                  </div>
                </div>
              )}
              
              {/* OSD Overlays */}
              <div className="absolute top-8 start-8 z-20 pointer-events-none flex flex-col items-start gap-3">
                <div className="bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-md flex items-center gap-2.5 shadow-xl border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  LIVE ON AIR
                </div>
                {mainEvent && (
                  <div className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-md shadow-lg border border-white/10">
                    {mainEvent.category} • {mainEvent.region}
                  </div>
                )}
              </div>
              
              {!mainEvent?.videoUrl && (
                <div className="absolute bottom-0 inset-x-0 p-10 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none">
                  <h2 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none uppercase">
                    {mainEvent ? getTitle(mainEvent) : 'Awaiting Transmission...'}
                  </h2>
                  <p className="text-neutral-400 text-base md:text-xl max-w-4xl line-clamp-2 leading-relaxed font-medium">
                    {mainEvent ? getSummary(mainEvent) : 'Stay tuned for multi-regional live visual broadcasts and verified intelligence updates.'}
                  </p>
                </div>
              )}
            </div>

            {/* Sub-streams / Channel selector */}
            <div className="bg-neutral-900/20 backdrop-blur-sm border border-white/5 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-black/40 flex items-center justify-center border border-white/5">
                    <Video size={20} className="text-brand-500" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-[0.15em] text-sm text-white">
                      {lang === 'ar' ? 'قنوات البث المتاحة' : lang === 'ckb' ? 'کەناڵەکانی پەخشی بەردەست' : lang === 'zh' ? '可用广播频道' : 'Available Broadcast Channels'}
                    </h3>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">Satellite Feeds & Multi-Regional Streams</p>
                  </div>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 bg-black/40 px-4 py-2 rounded-md border border-white/5">
                  {events.length} ACTIVE FEEDS
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event: any) => (
                  <Link key={event.id} to={`/${lang}/live/${event.slug}`} className="flex gap-5 p-5 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all group bg-black/40">
                    <div className="relative w-32 h-20 shrink-0 rounded-lg overflow-hidden bg-black border border-white/5 shadow-inner">
                      {event.videoUrl ? (
                        <div className="absolute inset-0 bg-brand-800/10 flex items-center justify-center">
                           <Video size={24} className="text-red-500 opacity-40 group-hover:opacity-80 transition-opacity" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/40">
                          <Play size={24} className="text-neutral-700 group-hover:text-brand-500 transition-colors" />
                        </div>
                      )}
                      
                      {event.isActive && (
                        <div className="absolute top-2.5 start-2.5 flex items-center gap-2 bg-black/60 backdrop-blur-md rounded px-2 py-1 border border-white/10">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                          <span className="text-[8px] font-black uppercase tracking-[0.15em] text-white">LIVE</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center overflow-hidden">
                      <h4 className="text-[13px] font-black text-neutral-300 group-hover:text-white transition-colors line-clamp-2 leading-tight mb-3 uppercase tracking-tight">
                        {getTitle(event)}
                      </h4>
                      <div className="flex items-center gap-2.5">
                        <span className="text-[9px] px-2 py-1 rounded bg-black/60 text-neutral-500 font-black uppercase tracking-widest border border-white/5">{event.region}</span>
                        {event.videoUrl && <span className="text-[9px] px-2 py-1 rounded bg-red-950/30 text-red-400 border border-red-900/30 font-black uppercase tracking-widest">VIDEO</span>}
                      </div>
                    </div>
                  </Link>
                ))}
                {events.length === 0 && (
                  <div className="col-span-full py-16 text-center text-neutral-600 font-black text-[10px] uppercase tracking-[0.2em] bg-black/20 rounded-xl border border-dashed border-white/5">
                    Signal Lost • No Active Channels In This Region
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Live Timeline Feed Sidebar */}
          <div className="xl:col-span-1 bg-neutral-900/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden flex flex-col h-[calc(100vh-10rem)] xl:sticky xl:top-[8rem] shadow-2xl ring-1 ring-white/5">
            <div className="p-6 border-b border-white/5 bg-black/40 flex items-center justify-between shrink-0 shadow-sm relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-red-600/10 text-red-500 border border-red-600/10">
                  <Activity size={18} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-[0.15em] text-xs text-white">
                    {lang === 'ar' ? 'تحديثات مباشرة' : lang === 'ckb' ? 'نوێکارییەکان' : lang === 'zh' ? '实时更新' : 'Live Timeline'}
                  </h3>
                  <p className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest mt-0.5">Direct Intel Stream</p>
                </div>
              </div>
              {mainEvent && (
                <Link to={`/${lang}/live/${mainEvent.slug}`} className="text-[9px] uppercase font-black text-neutral-400 hover:text-white transition-all border border-white/10 hover:border-white/20 px-3 py-1.5 rounded bg-black/60">
                   EXPAND <ChevronRight size={12} className="inline -mt-0.5 ms-1" />
                </Link>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto bg-black/20 custom-scrollbar p-2">
              {mainEvent ? (
                <div className="h-full">
                  <LiveTimeline slug={mainEvent.slug} lang={lang || 'en'} darkTheme={true} />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-neutral-700 text-center p-10">
                  <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center border border-white/5 mb-6">
                    <Activity size={32} className="opacity-20" />
                  </div>
                  <p className="font-black uppercase tracking-[0.2em] text-[10px] mb-2">Timeline Locked</p>
                  <p className="text-[9px] uppercase tracking-widest text-neutral-800">Awaiting Primary Frequency Activation</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
