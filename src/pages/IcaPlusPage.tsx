import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Mic, Video as VideoIcon, Film, Clock, MapPin, PlayCircle, ExternalLink } from 'lucide-react';
import { apiFetch } from '../lib/api';
import { useParams } from 'react-router-dom';

type Tab = 'podcasts' | 'videos' | 'documentaries';

export function IcaPlusPage() {
  const { lang: language = 'en' } = useParams<{lang: string}>();
  const [activeTab, setActiveTab] = useState<Tab>('podcasts');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  useEffect(() => {
    fetchItems(activeTab);
    setActiveMedia(null);
  }, [activeTab]);

  const fetchItems = async (type: Tab) => {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/${type}`);
      if (res.ok) setItems(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const getLocalized = (item: any, field: 'title' | 'description' | 'synopsis') => {
    if (language === 'ar' && item[`${field}Ar`]) return item[`${field}Ar`];
    if (language === 'zh' && item[`${field}Zh`]) return item[`${field}Zh`];
    if (language === 'ckb' && item[`${field}Ckb`]) return item[`${field}Ckb`];
    return item[`${field}En`];
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 border-x border-brand-800/10 dark:border-neutral-800 shadow-xs p-4 sm:p-6 md:p-8">
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 bg-brand-800/10 dark:bg-brand-900/30 text-brand-800 dark:text-brand-300 px-3.5 py-1.5 rounded-full mb-4"
        >
          <span className="font-black text-xs uppercase tracking-[0.3em]">ICA+ EXCLUSIVE</span>
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-900 dark:text-neutral-100 mb-3 leading-tight">
          Premium Media Hub
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-neutral-400">
          In-depth podcasts, exclusive video reports, and full-length documentaries tracking Sino-Iraqi developments.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {[
          { id: 'podcasts', icon: Mic, label: 'Podcasts' },
          { id: 'videos', icon: VideoIcon, label: 'Videos' },
          { id: 'documentaries', icon: Film, label: 'Documentaries' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${
              activeTab === tab.id
                ? 'bg-brand-800 text-white shadow-md'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-brand-800 border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-neutral-800/80 rounded-xs overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow group flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <img 
                  src={item.coverUrl} 
                  alt={getLocalized(item, 'title')}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {item.isFeatured && (
                  <div className="absolute top-3 right-3 bg-brand-800 text-white text-[10px] px-2 py-1 rounded font-black uppercase tracking-widest shadow-sm">
                    Premium
                  </div>
                )}
                
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                  {item.category}
                </div>

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => setActiveMedia(activeMedia === item.id ? null : item.id)}
                    className="bg-brand-800 text-white p-3.5 rounded-full hover:bg-brand-700 transition-colors transform hover:scale-110 cursor-pointer shadow-lg"
                  >
                    <PlayCircle className="h-8 w-8" />
                  </button>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-black text-brand-900 dark:text-neutral-100 mb-2 line-clamp-2">
                  {getLocalized(item, 'title')}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-xs mb-4 line-clamp-3 leading-relaxed">
                  {getLocalized(item, 'description')}
                </p>
                
                {activeTab === 'documentaries' && getLocalized(item, 'synopsis') && (
                  <p className="text-neutral-500 dark:text-neutral-400 text-[11px] mb-4 line-clamp-2 italic">
                    "{getLocalized(item, 'synopsis')}"
                  </p>
                )}

                <div className="mt-auto flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 border-t border-neutral-100 dark:border-neutral-700/60 pt-3 font-medium uppercase tracking-wider">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="h-3.5 w-3.5 text-brand-800 dark:text-brand-400" />
                    <span>{item.duration || '00:00'}</span>
                  </div>
                  {item.director && (
                    <div className="flex items-center space-x-1.5">
                      <span>Dir: {item.director}</span>
                    </div>
                  )}
                  {item.guestName && (
                    <div className="flex items-center space-x-1.5">
                      <Mic className="h-3.5 w-3.5 text-brand-800 dark:text-brand-400" />
                      <span>{item.guestName}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {activeMedia === item.id && (
                <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700">
                  {activeTab === 'podcasts' ? (
                    <audio controls autoPlay src={item.audioUrl} className="w-full h-10">
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <a 
                        href={item.videoUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex justify-center items-center gap-2 bg-brand-800 hover:bg-brand-900 text-white py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Watch External <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
      
      {!loading && items.length === 0 && (
        <div className="text-center py-16 text-neutral-500 dark:text-neutral-400 text-sm font-bold uppercase tracking-widest">
          No content available in this category yet.
        </div>
      )}
    </div>
  );
}
