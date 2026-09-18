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
    <div className="w-full bg-white dark:bg-neutral-900 border-x border-brand-800/10 dark:border-neutral-800 shadow-xs min-h-[70vh]">
      {/* Live Event Hero */}
      <div className="bg-brand-800 text-white p-6 sm:p-8 border-b-4 border-brand-800 w-full">
        <div className="w-full">
          <span className="inline-flex items-center gap-2 bg-brand-800 text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-xs mb-3">
            {event.isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>}
            {lang === 'ar' ? 'تغطية مباشرة' : lang === 'ckb' ? 'ڕووماڵی ڕاستەوخۆ' : lang === 'zh' ? '现场直播' : 'Live Coverage'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-3">
            {getTitle()}
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            {getSummary()}
          </p>
        </div>
      </div>

      <div className="w-full p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          
          {/* Main Video/Stream Area */}
          <div className="relative aspect-video bg-black rounded-xs overflow-hidden border border-gray-200 dark:border-neutral-700 shadow-xs group">
            {event.videoUrl ? (
              <iframe 
                src={event.videoUrl} 
                title={getTitle()}
                className="w-full h-full border-0 absolute inset-0 z-10"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="flex flex-col items-center gap-4 text-gray-500">
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                    <Radio size={32} className="text-gray-400 opacity-50" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">No Live Video Signal Detected</span>
                </div>
              </div>
            )}
            
            {event.isActive && event.videoUrl && (
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <div className="bg-brand-800 text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded flex items-center gap-2 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  LIVE
                </div>
              </div>
            )}
          </div>

          <LiveTimeline slug={slug as string} lang={lang as 'en' | 'ar' | 'zh' | 'ckb'} />
        </div>
        
        {/* Optional Sidebar for Context */}
        <div className="hidden lg:block w-72 lg:w-80 border-s border-gray-200 dark:border-neutral-800 ps-6">
          <div className="bg-gray-50 dark:bg-neutral-800/80 p-5 rounded-xs border border-gray-200 dark:border-neutral-700 mb-6">
            <h3 className="font-bold uppercase tracking-wider text-xs text-brand-900 dark:text-neutral-100 mb-3 border-b border-gray-200 dark:border-neutral-700 pb-2">
              Broadcast Info
            </h3>
            <div className="space-y-3">
              <div>
                <span className="block text-xs text-gray-500 dark:text-neutral-400 font-bold uppercase tracking-widest mb-1">Region</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-white dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 text-xs font-bold text-gray-700 dark:text-neutral-200">
                  {event.region}
                </span>
              </div>
              <div>
                <span className="block text-xs text-gray-500 dark:text-neutral-400 font-bold uppercase tracking-widest mb-1">Category</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-white dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 text-xs font-bold text-gray-700 dark:text-neutral-200">
                  {event.category}
                </span>
              </div>
              <div>
                <span className="block text-xs text-gray-500 dark:text-neutral-400 font-bold uppercase tracking-widest mb-1">Status</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs border text-xs font-bold ${
                  event.isActive ? 'bg-brand-50 dark:bg-brand-900/30 border-brand-200 dark:border-brand-700 text-brand-700 dark:text-brand-300' : 'bg-gray-100 dark:bg-neutral-700 border-gray-200 dark:border-neutral-600 text-gray-700 dark:text-neutral-300'
                }`}>
                  {event.isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>}
                  {event.isActive ? 'LIVE' : 'ARCHIVED'}
                </span>
              </div>
            </div>
          </div>

          <h3 className="font-bold uppercase tracking-wider text-xs text-brand-900 dark:text-neutral-100 mb-3 border-b border-gray-200 dark:border-neutral-700 pb-2">
            {lang === 'ar' ? 'سياق' : lang === 'ckb' ? 'پاشخان' : lang === 'zh' ? '背景' : 'Context'}
          </h3>
          <p className="text-xs text-gray-600 dark:text-neutral-400 leading-relaxed bg-neutral-50 dark:bg-neutral-800/60 p-4 rounded-xs border border-neutral-200 dark:border-neutral-700">
            {lang === 'ar' 
              ? 'هذه قصة قيد التطوير. تقوم فرق التحرير لدينا في بكين والسليمانية بتحديث هذه الصفحة في الوقت الفعلي. تعكس الطوابع الزمنية التوقيت المحلي العراقي (UTC+3).'
              : lang === 'ckb'
              ? 'ئەمە ڕووداوێکی بەردەوامە. تیمەکانی نووسینمان لە بێجینگ و سلێمانی ئەم لاپەڕەیە لە کاتی ڕاستەقینەدا نوێ دەکەنەوە. کاتەکان کاتی خۆجێیی عێراق نیشان دەدەن (UTC+3).'
              : lang === 'zh'
              ? '这是一个正在发展的故事。我们在北京和苏莱曼尼亚的编辑团队正在实时更新此页面。时间戳反映了伊拉克当地时间（UTC+3）。'
              : 'This is a developing story. Our editorial teams in Beijing and Sulaymaniyah are updating this page in real-time. Timestamps reflect local Iraqi Time (UTC+3).'}
          </p>
        </div>
      </div>
    </div>
  );
}
