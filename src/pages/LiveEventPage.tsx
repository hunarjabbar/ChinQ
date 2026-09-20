import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LiveTimeline } from '../components/LiveTimeline';
import { ComingSoonLivePortal } from '../components/ComingSoonLivePortal';
import { Video, Radio } from 'lucide-react';

export function LiveEventPage() {
  const { lang, slug } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const timestamp = new Date().getTime();
        const res = await fetch(`/api/events/${slug}?t=${timestamp}`, { cache: 'no-store' });
        if (!res.ok) {
          if (slug === 'iraq-china-summit-2026') {
            // Provide dedicated fallback for upcoming summit
            setEvent({
              slug: 'iraq-china-summit-2026',
              titleEn: 'Iraq-China Economic Summit 2026',
              titleAr: 'القمة الاقتصادية العراقية الصينية 2026',
              titleZh: '2026年伊拉克-中国经济峰会',
              titleCkb: 'لووتکەی ئابووری عێراق-چین ٢٠٢٦',
              isActive: false,
              isComingSoon: true
            });
            return;
          }
          if (res.status === 404) {
            navigate(`/${lang}/not-found`);
            return;
          }
          throw new Error('Failed to fetch event');
        }
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error(err);
        if (slug === 'iraq-china-summit-2026') {
          setEvent({
            slug: 'iraq-china-summit-2026',
            titleEn: 'Iraq-China Economic Summit 2026',
            titleAr: 'القمة الاقتصادية العراقية الصينية 2026',
            titleZh: '2026年伊拉克-中国经济峰会',
            titleCkb: 'لووتکەی ئابووری عێراق-چین ٢٠٢٦',
            isActive: false,
            isComingSoon: true
          });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [slug, lang, navigate]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <Radio size={24} className="text-red-600 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Connecting to Broadcast Portal...</span>
      </div>
    );
  }

  // If this is the Iraq-China Summit 2026 or an upcoming summit event, render the smooth Coming Soon portal component!
  if (slug === 'iraq-china-summit-2026' || event?.isComingSoon || !event?.videoUrl) {
    return (
      <div className="w-full bg-[#0a0a0a] min-h-[80vh] py-6 sm:py-10">
        <ComingSoonLivePortal 
          lang={lang || 'en'} 
          slug={slug} 
          title={event ? (lang === 'ar' ? event.titleAr : lang === 'zh' ? event.titleZh : lang === 'ckb' ? event.titleCkb : event.titleEn) : undefined} 
        />
      </div>
    );
  }

  if (!event) {
    return null; // Handled by navigate to 404
  }

  const getTitle = () => {
    if (lang === 'ar') return event.titleAr;
    if (lang === 'ckb') return event.titleCkb || event.titleEn;
    if (lang === 'zh') return event.titleZh;
    return event.titleEn;
  };

  const getSummary = () => {
    if (lang === 'ar') return event.summaryAr;
    if (lang === 'ckb') return event.summaryCkb || event.summaryEn;
    if (lang === 'zh') return event.summaryZh;
    return event.summaryEn;
  }

  return (
    <div className="w-full bg-[#0a0a0a] min-h-screen text-white font-sans">
      {/* Live Event Hero */}
      <div className="bg-brand-800 text-white p-6 sm:p-8 border-b border-white/10 w-full shadow-lg">
        <div className="w-full max-w-7xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xs mb-4 border border-white/10">
            {event.isActive && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>}
            {lang === 'ar' ? 'تغطية مباشرة' : lang === 'ckb' ? 'ڕووماڵی ڕاستەوخۆ' : lang === 'zh' ? '现场直播' : 'Live Coverage'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-4 tracking-tight uppercase">
            {getTitle()}
          </h1>
          <p className="text-sm sm:text-lg text-brand-100 max-w-4xl leading-relaxed font-medium">
            {getSummary()}
          </p>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="flex-1 space-y-8">
          
          {/* Main Video/Stream Area */}
          <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-white/5 shadow-2xl ring-1 ring-white/10">
            {event.videoUrl ? (
              <iframe 
                src={event.videoUrl} 
                title={getTitle()}
                className="w-full h-full border-0 absolute inset-0 z-10"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/40">
                <div className="flex flex-col items-center gap-6 text-neutral-600">
                  <div className="w-20 h-20 rounded-full bg-black/40 flex items-center justify-center border border-white/5">
                    <Radio size={40} className="text-neutral-500 opacity-30 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Signal Lost • Awaiting Feed</span>
                </div>
              </div>
            )}
            
            {event.isActive && event.videoUrl && (
              <div className="absolute top-6 left-6 z-20 pointer-events-none">
                <div className="bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded flex items-center gap-2 shadow-xl border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  LIVE ON AIR
                </div>
              </div>
            )}
          </div>

          <div className="bg-neutral-900/40 rounded-xl border border-white/5 p-1">
            <LiveTimeline slug={slug as string} lang={lang as 'en' | 'ar' | 'zh' | 'ckb'} darkTheme={true} />
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-neutral-900/60 backdrop-blur-md p-6 rounded-xl border border-white/5 shadow-sm">
            <h3 className="font-black uppercase tracking-widest text-[11px] text-brand-500 mb-6 border-b border-white/5 pb-3">
              Broadcast Intelligence
            </h3>
            <div className="space-y-5">
              <div>
                <span className="block text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-2">Primary Region</span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-black/40 border border-white/5 text-[11px] font-black text-neutral-200 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                  {event.region}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-2">Category</span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-black/40 border border-white/5 text-[11px] font-black text-neutral-200 uppercase tracking-wider">
                  {event.category}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-2">Transmission Status</span>
                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded border text-[11px] font-black uppercase tracking-wider ${
                  event.isActive ? 'bg-red-950/30 border-red-900/50 text-red-400' : 'bg-neutral-800/40 border-white/5 text-neutral-500'
                }`}>
                  {event.isActive && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>}
                  {event.isActive ? 'ACTIVE FEED' : 'ARCHIVED RECORD'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-brand-900/10 p-6 rounded-xl border border-brand-900/20">
            <h3 className="font-black uppercase tracking-widest text-[11px] text-brand-400 mb-4 border-b border-brand-900/20 pb-3">
              {lang === 'ar' ? 'سياق البث' : lang === 'ckb' ? 'پاشخانی پەخش' : lang === 'zh' ? '广播背景' : 'Broadcast Context'}
            </h3>
            <p className="text-[11px] text-neutral-400 leading-relaxed font-medium">
              {lang === 'ar' 
                ? 'هذه قصة قيد التطوير. تقوم فرق التحرير لدينا في بكين والسليمانية بتحديث هذه الصفحة في الوقت الفعلي. تعكس الطوابع الزمنية التوقيت المحلي العراقي (UTC+3).'
                : lang === 'ckb'
                ? 'ئەمە ڕووداوێکی بەردەوامە. تیمەکانی نووسینمان لە بێجینگ و سلێمانی ئەم لاپەڕەیە لە کاتی ڕاستەقینەدا نوێ دەکەنەوە. کاتەکان کاتی خۆجێیی عێراق نیشان دەدەن (UTC+3).'
                : lang === 'zh'
                ? '这是一个正在发展的故事。我们在北京和苏莱曼尼亚的编辑团队正在实时更新此页面。时间戳反映了伊拉克当地时间（UTC+3）。'
                : 'This is a developing story. Our editorial teams in Beijing and Sulaymaniyah are updating this page in real-time. Timestamps reflect local Iraqi Time (UTC+3).'}
            </p>
          </div>

          <button 
            onClick={() => navigate(`/${lang}/live`)}
            className="w-full py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border border-white/10 transition-all"
          >
            {lang === 'ar' ? 'العودة لشبكة البث' : lang === 'zh' ? '返回广播网络' : 'Back to Global Network'}
          </button>
        </div>
      </div>
    </div>
  );
}
