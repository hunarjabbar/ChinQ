import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Clock, Globe, Mic, MapPin, Search } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Locale } from '../types';

export default function PodcastsPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const language = lang as Locale;
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('ALL');
  const [activeAudio, setActiveAudio] = useState<string | null>(null);

  useEffect(() => {
    fetchPodcasts();
  }, [filterRegion]);

  const fetchPodcasts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/podcasts?region=${filterRegion}`);
      if (res.ok) {
        const data = await res.json();
        setPodcasts(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredPodcasts = podcasts.filter(p => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.titleEn.toLowerCase().includes(q) ||
      (p.titleAr && p.titleAr.includes(q)) ||
      (p.titleZh && p.titleZh.includes(q)) ||
      (p.titleCkb && p.titleCkb.includes(q)) ||
      p.descriptionEn.toLowerCase().includes(q)
    );
  });

  const t = {
    title: {
      en: 'Iraqi-Chinese Agency Podcasts',
      ar: 'بودكاست الوكالة العراقية الصينية',
      zh: '伊中通讯社官方播客',
      ckb: 'پۆدکاستەکانی ئاژانسی عێراقی - چینی'
    },
    subtitle: {
      en: 'Listen to the latest discussions on geopolitics, economy, and culture between China, Iraq, and the Kurdistan Region.',
      ar: 'استمع إلى أحدث النقاشات حول الجغرافيا السياسية والاقتصاد والثقافة بين الصين والعراق وإقليم كردستان.',
      zh: '收听关于中国、伊拉克和库尔德斯坦地区之间地缘政治、经济和文化的最新讨论。',
      ckb: 'گوێ لە نوێترین گفتوگۆکان بگرە دەربارەی جیۆپۆلەتیک، ئابووری، و کولتوور لە نێوان چین، عێراق، و هەرێمی کوردستان.'
    },
    search: {
      en: 'Search episodes, guests...',
      ar: 'البحث عن الحلقات، الضيوف...',
      zh: '搜索节目、嘉宾...',
      ckb: 'گەڕان بۆ ئەڵقەکان، میوانەکان...'
    },
    allRegions: { en: 'All Regions', ar: 'جميع المناطق', zh: '所有地区', ckb: 'هەموو ناوچەکان' },
    bilateral: { en: 'Bilateral', ar: 'ثنائي', zh: '双边', ckb: 'دووقۆڵی' },
    china: { en: 'China', ar: 'الصين', zh: '中国', ckb: 'چین' },
    iraq: { en: 'Iraq', ar: 'العراق', zh: '伊拉克', ckb: 'عێراق' },
    kurdistan: { en: 'Kurdistan', ar: 'كردستان', zh: 'کوردستان', ckb: 'کوردستان' },
  };

  const getLocalized = (item: any, field: string) => {
    const key = `${field}${language.charAt(0).toUpperCase() + language.slice(1)}`;
    return item[key] || item[`${field}En`];
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 border-x border-brand-800/10 dark:border-neutral-800 shadow-xs p-4 sm:p-6 md:p-8">
      <div>
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-brand-800/10 dark:bg-brand-900/30 text-brand-800 dark:text-brand-300 px-3.5 py-1.5 rounded-full mb-4"
          >
            <Mic className="h-4 w-4" />
            <span className="font-bold text-xs uppercase tracking-wider">Official Podcast Network</span>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-900 dark:text-neutral-100 mb-3 leading-tight">
            {t.title[language]}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-neutral-400">
            {t.subtitle[language]}
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder={t.search[language]}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-brand-900 dark:text-neutral-100 rounded-xs focus:ring-1 focus:ring-brand-800 focus:border-brand-800 text-xs outline-none transition-all"
            />
          </div>
          
          <div className="w-full md:w-auto">
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="w-full md:w-56 px-4 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 text-xs font-bold uppercase tracking-widest rounded-xs focus:outline-none focus:ring-1 focus:ring-brand-800 cursor-pointer appearance-none relative"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111111%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem top 50%',
                backgroundSize: '0.65rem auto',
              }}
            >
              <option value="ALL">{t.allRegions[language]}</option>
              <option value="BILATERAL">{t.bilateral[language]}</option>
              <option value="CHINA">{t.china[language]}</option>
              <option value="IRAQ">{t.iraq[language]}</option>
              <option value="KURDISTAN">{t.kurdistan[language]}</option>
            </select>
          </div>
        </div>

        {/* Podcasts Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-brand-800 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPodcasts.map((podcast, idx) => (
              <motion.div
                key={podcast.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-neutral-800/80 rounded-xs overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow group flex flex-col"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={podcast.coverUrl} 
                    alt={getLocalized(podcast, 'title')} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setActiveAudio(activeAudio === podcast.id ? null : podcast.id)}
                      className="bg-brand-800 text-white p-3.5 rounded-full hover:bg-brand-700 transition-colors transform hover:scale-110 cursor-pointer"
                    >
                      <PlayCircle className="h-7 w-7" />
                    </button>
                  </div>
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-xs px-2.5 py-0.5 rounded-xs font-bold uppercase">
                    {podcast.category}
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-black text-brand-900 dark:text-neutral-100 mb-2 line-clamp-2">
                    {getLocalized(podcast, 'title')}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-xs mb-4 line-clamp-3 leading-relaxed">
                    {getLocalized(podcast, 'description')}
                  </p>
                  
                  <div className="mt-auto space-y-4">
                    {podcast.guestName && (
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="h-8 w-8 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center shrink-0">
                          <Mic className="h-4 w-4 text-neutral-500 dark:text-neutral-300" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{podcast.guestName}</p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">{podcast.guestRole}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 border-t border-neutral-100 dark:border-neutral-700/60 pt-3">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{podcast.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{podcast.region}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Embedded Audio Player if active */}
                {activeAudio === podcast.id && (
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700">
                    <audio 
                      controls 
                      autoPlay 
                      src={podcast.audioUrl} 
                      className="w-full h-10"
                    >
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
        
        {!loading && filteredPodcasts.length === 0 && (
          <div className="text-center py-16 text-neutral-500 dark:text-neutral-400 italic text-sm">
            No podcasts found matching your criteria.
          </div>
        )}
        
      </div>
    </div>
  );
}
