import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LiveTimeline } from '../components/LiveTimeline';

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
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug, lang, navigate]);

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>;
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

  return (
    <main className="bg-white min-h-screen w-full">
      {/* Live Event Hero */}
      <div className="bg-[#111111] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-8 border-[#990000] w-full">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-[#990000] text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-sm mb-4">
            {lang === 'ar' ? 'تغطية مباشرة' : lang === 'ckb' ? 'ڕووماڵی ڕاستەوخۆ' : lang === 'zh' ? '现场直播' : 'Live Coverage'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black leading-tight">
            {getTitle()}
          </h1>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <LiveTimeline slug={slug as string} lang={lang as 'en' | 'ar' | 'zh' | 'ckb'} />
        </div>
        
        {/* Optional Sidebar for Context */}
        <div className="hidden lg:block w-72 border-s border-gray-200 ps-8">
          <h3 className="font-bold uppercase tracking-wider text-sm mb-4 border-b border-gray-200 pb-2">
            {lang === 'ar' ? 'سياق' : lang === 'ckb' ? 'پاشخان' : lang === 'zh' ? '背景' : 'Context'}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
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
    </main>
  );
}
