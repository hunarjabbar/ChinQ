import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { Locale } from '../types';
import { Megaphone, X, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function SystemAnnouncementBanner({ lang }: { lang: Locale }) {
  const [isVisible, setIsVisible] = useState(true);
  
  const { data: announcement, isLoading } = useQuery<any>({
    queryKey: ['announcement'],
    queryFn: async () => {
      const res = await apiFetch('/api/announcement');
      if (!res.ok) return null;
      return res.json();
    },
    staleTime: 60000, // 1 minute
  });

  if (isLoading || !announcement || !isVisible) return null;

  const content = lang === 'ar' ? announcement.contentAr : 
                 lang === 'zh' ? announcement.contentZh : 
                 lang === 'ckb' ? announcement.contentCkb : 
                 announcement.contentEn;

  const bgColor = announcement.type === 'URGENT' ? 'bg-red-600' : 
                  announcement.type === 'EVENT' ? 'bg-brand-600' : 
                  'bg-neutral-900';

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className={`w-full ${bgColor} text-white relative z-[100] border-b border-white/10`}
      >
        <div className="w-full max-w-(--container-width) mx-auto flex items-center h-10 px-4 sm:px-6">
          <div className="flex items-center gap-4 flex-1 overflow-hidden">
            <span className="flex-shrink-0 text-xs font-black uppercase tracking-[0.3em] bg-white/15 px-2 py-0.5 rounded-sm">
              {announcement.type} SIGNAL
            </span>
            <p className={`text-[11px] font-bold uppercase tracking-widest truncate flex-1 ${lang === 'ar' || lang === 'ckb' ? 'text-right' : 'text-left'}`} dir={lang === 'ar' || lang === 'ckb' ? 'rtl' : 'ltr'}>
              {content}
            </p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="ms-6 text-white/40 hover:text-white transition-colors cursor-pointer flex-shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
