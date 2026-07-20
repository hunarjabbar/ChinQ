import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Radio, Play, Activity, ChevronRight, Video, TrendingUp } from 'lucide-react';
import { LiveTimeline } from '../components/LiveTimeline';
import { Locale } from '../types';

export function LivePortal() {
  const { lang } = useParams<{ lang: Locale }>();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await fetch(`/api/events?t=${new Date().getTime()}`, { cache: 'no-store' });
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
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-[#990000]">
              <Radio size={18} className="text-white animate-pulse" />
            </div>
            <span className="font-serif font-bold text-xl uppercase tracking-widest">
              {lang === 'ar' ? 'شينك مباشر' : lang === 'ckb' ? 'شینک ڕاستەوخۆ' : lang === 'zh' ? 'CHINQ 直播' : 'CHINQ LIVE'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {lang === 'ar' ? 'البث نشط' : lang === 'ckb' ? 'پەخشی ڕاستەوخۆ' : lang === 'zh' ? '广播开启' : 'Broadcast On'}
            </span>
            <Link to={`/${lang}`} className="hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded">
              {lang === 'ar' ? 'العودة للرئيسية' : lang === 'ckb' ? 'گەڕانەوە بۆ سەرەتا' : lang === 'zh' ? '返回主页' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </div>

      {/* Breaking News Marquee */}
      <div className="bg-[#990000] text-white border-y border-[#ff4444]/30 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center h-10 px-4">
          <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px] shrink-0 border-e border-[#ff4444]/30 pe-4 me-4">
            <TrendingUp size={14} />
            {lang === 'ar' ? 'عاجل' : lang === 'ckb' ? 'بەپەلە' : lang === 'zh' ? '突发新闻' : 'Breaking'}
          </div>
          <div className="flex-1 overflow-hidden relative">
            <div className="animate-marquee whitespace-nowrap text-sm font-medium">
              {mainEvent && getTitle(mainEvent)} - {mainEvent && getSummary(mainEvent)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Video/Stream Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-gray-800 group shadow-2xl">
              {/* Simulated Video Player */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop" alt="Live Stream" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                
                <button className="absolute z-10 w-20 h-20 bg-[#990000]/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-[#990000] hover:scale-105 transition-all shadow-xl group-hover:shadow-[#990000]/50">
                  <Play size={32} className="text-white ms-2" />
                </button>
              </div>
              
              <div className="absolute top-4 start-4 bg-[#990000] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                LIVE
              </div>
              
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black to-transparent">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 shadow-sm">
                  {mainEvent ? getTitle(mainEvent) : 'Awaiting Broadcast...'}
                </h2>
                <p className="text-gray-300 text-sm max-w-2xl line-clamp-2">
                  {mainEvent ? getSummary(mainEvent) : ''}
                </p>
              </div>
            </div>

            {/* Other Active Streams */}
            <div className="bg-[#111111] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-800 pb-4">
                <Video size={18} className="text-[#ff4444]" />
                <h3 className="font-bold uppercase tracking-widest text-sm text-gray-200">
                  {lang === 'ar' ? 'أحداث البث الأخرى' : lang === 'ckb' ? 'ڕووداوە ڕاستەوخۆکانی تر' : lang === 'zh' ? '其他直播事件' : 'Other Live Events'}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {events.map((event: any) => (
                  <Link key={event.id} to={`/${lang}/live/${event.slug}`} className="flex gap-4 p-3 rounded-lg border border-gray-800 hover:border-gray-600 hover:bg-white/5 transition-all group">
                    <div className="relative w-24 h-16 shrink-0 rounded overflow-hidden bg-gray-900 border border-gray-800">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play size={16} className="text-gray-500 group-hover:text-[#ff4444] transition-colors" />
                      </div>
                      {event.isActive && (
                        <div className="absolute top-1 start-1 w-2 h-2 bg-[#ff4444] rounded-full animate-pulse shadow-[0_0_8px_rgba(255,68,68,0.8)]"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors line-clamp-2 leading-tight mb-1">
                        {getTitle(event)}
                      </h4>
                      <p className="text-[10px] text-gray-500 uppercase flex items-center gap-1 font-bold tracking-wider">
                        {event.isActive ? <span className="text-[#ff4444]">● LIVE</span> : 'ARCHIVED'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Live Timeline Feed */}
          <div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden flex flex-col h-[calc(100vh-8rem)] sticky top-[5.5rem]">
            <div className="p-4 border-b border-gray-800 bg-[#161616] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-[#ff4444]" />
                <h3 className="font-bold uppercase tracking-widest text-sm">
                  {lang === 'ar' ? 'تحديثات في الوقت الفعلي' : lang === 'ckb' ? 'نوێکارییەکانی کاتی ڕاستەقینە' : lang === 'zh' ? '实时更新' : 'Live Feed'}
                </h3>
              </div>
              {mainEvent && (
                <Link to={`/${lang}/live/${mainEvent.slug}`} className="text-[10px] uppercase font-bold text-gray-400 hover:text-white transition-colors border border-gray-700 px-2 py-1 rounded">
                  {lang === 'ar' ? 'تفاصيل' : lang === 'ckb' ? 'وردەکارییەکان' : lang === 'zh' ? '细节' : 'Details'} <ChevronRight size={12} className="inline -mt-0.5" />
                </Link>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {mainEvent ? (
                <div className="dark-timeline">
                  <LiveTimeline slug={mainEvent.slug} lang={lang} darkTheme={true} />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm gap-2">
                  <Activity size={24} className="opacity-50" />
                  No feeds available.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
