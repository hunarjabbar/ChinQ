import { useEffect, useState, useRef } from 'react';
import { Clock, AlertCircle, Radio } from 'lucide-react';
import { toast } from 'sonner';

interface LiveUpdate {
  id: string;
  contentEn: string;
  contentAr: string;
  contentZh: string;
  contentCkb: string;
  isImportant: boolean;
  authorName: string;
  createdAt: string;
}

export function LiveTimeline({ slug, lang, darkTheme = false }: { slug: string; darkTheme?: boolean; lang: 'en' | 'ar' | 'zh' | 'ckb' }) {
  const [updates, setUpdates] = useState<LiveUpdate[]>([]);
  const [isActive, setIsActive] = useState(true);
  const seenUpdateIds = useRef<Set<string>>(new Set());
  const isFirstLoad = useRef(true);

  // Fallback content mapping based on language
  const getContent = (update: LiveUpdate) => {
    if (lang === 'ar') return update.contentAr;
    if (lang === 'ckb') return update.contentCkb || update.contentEn;
    if (lang === 'zh') return update.contentZh;
    return update.contentEn;
  };

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const timestamp = new Date().getTime();
        const res = await fetch(`/api/events/${slug}?t=${timestamp}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          const newUpdates: LiveUpdate[] = data.updates || [];
          
          setUpdates(newUpdates);
          setIsActive(data.isActive);

          // Notification Logic
          if (newUpdates.length > 0) {
            if (isFirstLoad.current) {
              // On first load, just track existing IDs
              newUpdates.forEach(u => seenUpdateIds.current.add(u.id));
              isFirstLoad.current = false;
            } else {
              // On subsequent polls, alert for new IDs
              // We check from the start of the array (most recent)
              const freshUpdates = newUpdates.filter(u => !seenUpdateIds.current.has(u.id));
              
              if (freshUpdates.length > 0) {
                freshUpdates.forEach((update) => {
                  const content = getContent(update);
                  const title = lang === 'ar' ? 'تحديث جديد' : lang === 'zh' ? '新动态' : lang === 'ckb' ? 'نوێکاری نوێ' : 'New Stream Update';
                  
                  if (update.isImportant) {
                    toast.error(title, {
                      description: content,
                      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
                      duration: 8000,
                    });
                  } else {
                    toast.info(title, {
                      description: content,
                      icon: <Radio className="w-5 h-5 text-brand-500 animate-pulse" />,
                      duration: 5000,
                    });
                  }
                  
                  seenUpdateIds.current.add(update.id);
                });
              }
            }
          }
        }
      } catch (error) {
        console.error("LiveTimeline fetch error:", error);
      }
    };

    fetchUpdates();
    // Poll every 10 seconds
    const interval = setInterval(fetchUpdates, 10000);
    return () => clearInterval(interval);
  }, [slug, lang]); // Re-run if language changes to ensure correct toast content

  return (
    <div className="w-full max-w-3xl mx-auto text-start">
      {isActive && (
        <div className={`flex items-center gap-2 mb-12 p-3 border rounded font-bold uppercase text-sm tracking-wide ${darkTheme ? 'bg-brand-800/20 text-brand-500 border-brand-800/50' : 'bg-brand-50 text-brand-800 border-brand-200'}`}>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-800 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-800"></span>
          </span>
          {lang === 'ar' ? 'تحديثات مباشرة' : lang === 'ckb' ? 'تایملاینی ڕاستەوخۆ' : lang === 'zh' ? '实时更新' : 'Live Updates Active'}
        </div>
      )}

      <div className={`relative border-s-2 ms-4 space-y-8 ${darkTheme ? 'border-gray-800' : 'border-gray-200'}`}>
        {updates.map((update) => (
          <div key={update.id} className="relative ps-6">
            {/* Timeline Dot */}
            <div className={`absolute -start-[9px] top-1 h-4 w-4 rounded-full border-2 ${update.isImportant ? 'bg-brand-800' : 'bg-gray-400'} ${darkTheme ? 'border-brand-800' : 'border-white'}`}></div>
            
            <div className={`p-5 rounded-lg border ${
              update.isImportant 
                ? (darkTheme ? 'border-brand-800 bg-brand-800/10' : 'border-brand-800 bg-brand-50') 
                : (darkTheme ? 'border-gray-800 bg-[#161616]' : 'border-gray-200 bg-white')
            }`}>
              <div className={`flex items-center gap-3 text-sm mb-3 border-b pb-2 ${darkTheme ? 'text-gray-400 border-gray-800' : 'text-gray-500 border-gray-100'}`}>
                <Clock size={14} />
                <time className="font-semibold">
                  {new Date(update.createdAt).toLocaleTimeString(lang === 'ar' ? 'ar-IQ' : lang === 'ckb' ? 'ku-IQ' : lang === 'zh' ? 'zh-CN' : 'en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Baghdad' })}
                </time>
                <span className={`w-1 h-1 rounded-full ${darkTheme ? 'bg-gray-700' : 'bg-gray-300'}`}></span>
                <span className={`uppercase text-xs font-bold tracking-wider ${darkTheme ? 'text-gray-200' : 'text-brand-900'}`}>{update.authorName}</span>
                {update.isImportant && (
                  <span className={`ms-auto flex items-center gap-1 font-bold text-xs uppercase ${darkTheme ? 'text-brand-500' : 'text-brand-800'}`}>
                    <AlertCircle size={14} /> Key Event
                  </span>
                )}
              </div>
              
              <div className={`text-lg leading-relaxed whitespace-pre-wrap ${darkTheme ? 'text-gray-200' : 'text-gray-900'}`}>
                {getContent(update)}
              </div>
            </div>
          </div>
        ))}
        
        {updates.length === 0 && (
          <div className="ps-6 text-gray-500 italic">
            Waiting for updates...
          </div>
        )}
      </div>
    </div>
  );
}
