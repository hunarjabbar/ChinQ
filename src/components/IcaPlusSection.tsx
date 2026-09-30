import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { PlayCircle, ArrowRight, Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import { useI18n } from '../hooks/useI18n';
import { Locale } from '../types';
import { ErrorBoundary } from './ErrorBoundary';

function IcaPlusSectionContent() {
  const { lang: language = 'en' } = useParams<{lang: string}>();
  const lang = language as Locale;
  const { t } = useI18n(lang);

  // Fetch only featured items
  const { data: podcasts = [] } = useQuery({ queryKey: ['ica-plus-featured-podcasts'], queryFn: async () => (await apiFetch('/api/podcasts?featured=true')).json() });
  const { data: videos = [] } = useQuery({ queryKey: ['ica-plus-featured-videos'], queryFn: async () => (await apiFetch('/api/videos?featured=true')).json() });
  const { data: docs = [] } = useQuery({ queryKey: ['ica-plus-featured-docs'], queryFn: async () => (await apiFetch('/api/documentaries?featured=true')).json() });

  const allFeatured = [...podcasts.map(p => ({...p, type: 'podcast'})), ...videos.map(v => ({...v, type: 'video'})), ...docs.map(d => ({...d, type: 'documentary'}))]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3); // Take top 3 most recent featured items across all media

  if (allFeatured.length === 0) return null;

  const getLocalized = (item: any, field: string) => {
    if (lang === 'ar' && item[`${field}Ar`]) return item[`${field}Ar`];
    if (lang === 'zh' && item[`${field}Zh`]) return item[`${field}Zh`];
    if (lang === 'ckb' && item[`${field}Ckb`]) return item[`${field}Ckb`];
    return item[`${field}En`];
  };

  const isRtl = lang === 'ar' || lang === 'ckb';

  return (
    <div className="my-6 sm:my-8">
      <div className="bg-red-900 rounded-3xl overflow-hidden shadow-2xl relative border border-red-800">
        {/* Harmonized ambient glow without black gradient */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="relative p-8 sm:p-12 md:p-16 flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Header Column */}
          <div className="lg:w-[35%] flex flex-col justify-center text-white text-center lg:text-start">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="p-2 bg-amber-400/20 rounded-lg border border-amber-400/40">
                <Star className="w-5 h-5 text-amber-300 fill-amber-300 animate-pulse" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.4em] text-red-200">{t('icaPlusNetwork')}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tighter text-white">
              {t('premiumMediaHub')}
            </h2>
            <p className="text-red-100 text-base sm:text-lg leading-relaxed mb-10 opacity-90 max-w-xl mx-auto lg:mx-0 font-normal">
              {t('mediaHubDesc')}
            </p>
            <Link 
              to={`/${lang}/ica-plus`}
              className="inline-flex items-center justify-center gap-3 w-full sm:w-max px-8 py-4 bg-red-700 hover:bg-red-600 text-white border border-red-500/50 rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-xl group active:scale-95"
            >
              <span>{t('enterArchive')}</span>
              <ArrowRight size={20} className={`group-hover:translate-x-1.5 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1.5' : ''}`} />
            </Link>
          </div>

          {/* Cards Column */}
          <div className="lg:w-[65%] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
            {allFeatured.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative bg-red-950/80 border border-red-700/60 rounded-2xl overflow-hidden cursor-pointer hover:border-red-500 transition-all duration-300 flex flex-col h-full shadow-xl"
              >
                <div className="relative aspect-video xl:aspect-square overflow-hidden bg-red-950 shrink-0">
                  <img 
                    src={item.coverUrl} 
                    alt={getLocalized(item, 'title')}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-800/80 backdrop-blur-xs rounded-full flex items-center justify-center border border-red-500/50 group-hover:scale-110 group-hover:bg-red-700 transition-all duration-300 shadow-md">
                      <PlayCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] px-3 py-1.5 rounded font-black uppercase tracking-[0.2em] shadow-md border border-red-400/30">
                    {item.type}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 bg-red-950/60">
                  <h3 className="text-white font-black text-base leading-snug line-clamp-3 group-hover:text-red-200 transition-colors uppercase tracking-tight">
                    {getLocalized(item, 'title')}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-bold text-red-300 uppercase tracking-widest">
                    <span>{t('exploreFeed')}</span>
                    <ArrowRight size={12} className={isRtl ? 'rotate-180' : ''} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export function IcaPlusSection() {
  return (
    <ErrorBoundary>
      <IcaPlusSectionContent />
    </ErrorBoundary>
  );
}
