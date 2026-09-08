
import React from 'react';
import { motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import { Globe2, TrendingUp, Landmark, ShieldCheck } from 'lucide-react';
import { Locale } from '../types';

interface BricsTopic {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  titleZh: string;
  titleCkb: string;
  summaryEn: string;
  summaryAr: string;
  summaryZh: string;
  summaryCkb: string;
  category: string;
  imageUrl: string;
}

export function BricsSection({ lang }: { lang: Locale }) {
  const { data: topics = [], isLoading } = useQuery<BricsTopic[]>({
    queryKey: ['brics-topics'],
    queryFn: async () => {
      const res = await fetch('/api/brics-topics');
      if (!res.ok) throw new Error('Failed to fetch BRICS topics');
      return res.json();
    }
  });

  const getTitle = (topic: BricsTopic) => {
    if (lang === 'ar') return topic.titleAr;
    if (lang === 'zh') return topic.titleZh;
    if (lang === 'ckb') return topic.titleCkb || topic.titleEn;
    return topic.titleEn;
  };

  const getSummary = (topic: BricsTopic) => {
    if (lang === 'ar') return topic.summaryAr;
    if (lang === 'zh') return topic.summaryZh;
    if (lang === 'ckb') return topic.summaryCkb || topic.summaryEn;
    return topic.summaryEn;
  };

  if (isLoading || topics.length === 0) return null;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-brand-800/30 rounded-lg shadow-sm overflow-hidden mb-8 transition-all hover:border-brand-800/60">
      <div className="bg-brand-800 text-white p-4 flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
          <Globe2 className="w-4 h-4 animate-spin-slow" />
          {lang === 'ar' ? 'مرصد بريكس+' : lang === 'zh' ? '金砖国家+ 观察站' : lang === 'ckb' ? 'چاودێری برێکس+' : 'BRICS+ Observatory'}
        </h3>
        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full border border-white/30 backdrop-blur-sm">
          {lang === 'ar' ? 'بث مباشر' : lang === 'zh' ? '实时' : 'LIVE'}
        </span>
      </div>

      <div className="p-5 space-y-6">
        {topics.map((topic) => (
          <motion.div 
            key={topic.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="group cursor-pointer border-b border-gray-100 dark:border-neutral-800 pb-5 last:border-0 last:pb-0"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 shrink-0 rounded overflow-hidden border border-gray-100 dark:border-neutral-800">
                <img 
                  src={topic.imageUrl} 
                  alt={getTitle(topic)} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-brand-800 dark:text-brand-400 uppercase tracking-widest bg-brand-50 dark:bg-brand-950 px-1.5 py-0.5 rounded border border-brand-100 dark:border-brand-900">
                    {topic.category}
                  </span>
                </div>
                <h4 className="font-black text-sm text-brand-900 dark:text-neutral-100 group-hover:text-brand-800 transition-colors leading-tight">
                  {getTitle(topic)}
                </h4>
                <p className="text-xs text-gray-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                  {getSummary(topic)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-neutral-800/50 p-4 border-t border-gray-100 dark:border-neutral-800">
        <div className="flex items-center gap-3 text-xs font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          {lang === 'ar' ? 'تكامل mBridge النشط' : lang === 'zh' ? 'mBridge 激活集成' : 'mBridge Active Integration'}
        </div>
      </div>
    </div>
  );
}
