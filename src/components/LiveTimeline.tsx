import { useEffect, useState } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

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

  // Fallback content mapping based on language
  const getContent = (update: LiveUpdate) => {
    if (lang === 'ar') return update.contentAr;
    if (lang === 'ckb') return update.contentCkb || update.contentEn;
    if (lang === 'zh') return update.contentZh;
    return update.contentEn;
  };

  useEffect(() => {
    const fetchUpdates = async () => {
      const timestamp = new Date().getTime();
      const res = await fetch(`/api/events/${slug}?t=${timestamp}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setUpdates(data.updates);
        setIsActive(data.isActive);
      }
    };

    fetchUpdates();
    // Poll every 10 seconds
    const interval = setInterval(fetchUpdates, 10000);
    return () => clearInterval(interval);
  }, [slug]);

  return (
    <div className="w-full max-w-3xl mx-auto text-start">
      {isActive && (
        <div className={`flex items-center gap-2 mb-8 p-3 border rounded font-bold uppercase text-sm tracking-wide ${darkTheme ? 'bg-[#990000]/20 text-[#ff4444] border-[#990000]/50' : 'bg-red-50 text-[#990000] border-red-200'}`}>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#990000] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#990000]"></span>
          </span>
          {lang === 'ar' ? 'تحديثات مباشرة' : lang === 'ckb' ? 'تایملاینی ڕاستەوخۆ' : lang === 'zh' ? '实时更新' : 'Live Updates Active'}
        </div>
      )}

      <div className={`relative border-s-2 ms-4 space-y-8 ${darkTheme ? 'border-gray-800' : 'border-gray-200'}`}>
        {updates.map((update) => (
          <div key={update.id} className="relative ps-6">
            {/* Timeline Dot */}
            <div className={`absolute -start-[9px] top-1 h-4 w-4 rounded-full border-2 ${update.isImportant ? 'bg-[#990000]' : 'bg-gray-400'} ${darkTheme ? 'border-[#111111]' : 'border-white'}`}></div>
            
            <div className={`p-5 rounded-lg border ${
              update.isImportant 
                ? (darkTheme ? 'border-[#990000] bg-[#990000]/10' : 'border-[#990000] bg-red-50') 
                : (darkTheme ? 'border-gray-800 bg-[#161616]' : 'border-gray-200 bg-white')
            }`}>
              <div className={`flex items-center gap-3 text-sm mb-3 border-b pb-2 ${darkTheme ? 'text-gray-400 border-gray-800' : 'text-gray-500 border-gray-100'}`}>
                <Clock size={14} />
                <time className="font-mono font-semibold">
                  {new Date(update.createdAt).toLocaleTimeString(lang === 'ar' ? 'ar-IQ' : lang === 'ckb' ? 'ku-IQ' : lang === 'zh' ? 'zh-CN' : 'en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Baghdad' })}
                </time>
                <span className={`w-1 h-1 rounded-full ${darkTheme ? 'bg-gray-700' : 'bg-gray-300'}`}></span>
                <span className={`uppercase text-xs font-bold tracking-wider ${darkTheme ? 'text-gray-200' : 'text-[#111111]'}`}>{update.authorName}</span>
                {update.isImportant && (
                  <span className={`ms-auto flex items-center gap-1 font-bold text-xs uppercase ${darkTheme ? 'text-[#ff4444]' : 'text-[#990000]'}`}>
                    <AlertCircle size={14} /> Key Event
                  </span>
                )}
              </div>
              
              <div className={`text-lg font-serif leading-relaxed whitespace-pre-wrap ${darkTheme ? 'text-gray-200' : 'text-gray-900'}`}>
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
