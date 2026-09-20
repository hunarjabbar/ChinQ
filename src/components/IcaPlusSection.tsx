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
    <div className="my-8 sm:my-12">
      <div className="bg-brand-900 rounded-3xl overflow-hidden shadow-2xl relative border border-white/5">
        {/* Abstract background elements to give it a premium feel */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-800/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/60 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative p-8 sm:p-12 md:p-16 flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Header Column */}
          <div className="lg:w-[35%] flex flex-col justify-center text-white text-center lg:text-start">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="p-2 bg-amber-400/10 rounded-lg border border-amber-400/20">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.4em] text-brand-300">{t('icaPlusNetwork')}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tighter">
              {t('premiumMediaHub')}
            </h2>
            <p className="text-brand-100 text-base sm:text-lg leading-relaxed mb-10 opacity-80 max-w-xl mx-auto lg:mx-0">
              {t('mediaHubDesc')}
            </p>
            <Link 
              to={`/${lang}/ica-plus`}
              className="inline-flex items-center justify-center gap-3 w-full sm:w-max px-8 py-4 bg-white text-brand-900 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-neutral-100 transition-all shadow-2xl group active:scale-95"
            >
              {t('enterArchive')}
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
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-brand-500/50 transition-all duration-500 flex flex-col h-full shadow-2xl"
              >
                <div className="relative aspect-video xl:aspect-square overflow-hidden bg-neutral-900 shrink-0">
                  <img 
                    src={item.coverUrl} 
                    alt={getLocalized(item, 'title')}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-brand-800/40 transition-all duration-500">
                      <PlayCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] px-3 py-1.5 rounded font-black uppercase tracking-[0.2em] shadow-xl border border-white/10">
                    {item.type}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-transparent to-black/20">
                  <h3 className="text-white font-black text-base leading-snug line-clamp-3 group-hover:text-brand-300 transition-colors uppercase tracking-tight">
                    {getLocalized(item, 'title')}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-bold text-brand-400 uppercase tracking-widest">
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
