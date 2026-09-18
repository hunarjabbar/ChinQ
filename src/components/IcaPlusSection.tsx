import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { PlayCircle, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import { useParams } from 'react-router-dom';
import { ErrorBoundary } from './ErrorBoundary';

function IcaPlusSectionContent() {
  const { lang: language = 'en' } = useParams<{lang: string}>();

  // Fetch only featured items
  const { data: podcasts = [] } = useQuery({ queryKey: ['ica-plus-featured-podcasts'], queryFn: async () => (await apiFetch('/api/podcasts?featured=true')).json() });
  const { data: videos = [] } = useQuery({ queryKey: ['ica-plus-featured-videos'], queryFn: async () => (await apiFetch('/api/videos?featured=true')).json() });
  const { data: docs = [] } = useQuery({ queryKey: ['ica-plus-featured-docs'], queryFn: async () => (await apiFetch('/api/documentaries?featured=true')).json() });

  const allFeatured = [...podcasts.map(p => ({...p, type: 'podcast'})), ...videos.map(v => ({...v, type: 'video'})), ...docs.map(d => ({...d, type: 'documentary'}))]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3); // Take top 3 most recent featured items across all media

  if (allFeatured.length === 0) return null;

  const getLocalized = (item: any, field: string) => {
    if (language === 'ar' && item[`${field}Ar`]) return item[`${field}Ar`];
    if (language === 'zh' && item[`${field}Zh`]) return item[`${field}Zh`];
    if (language === 'ckb' && item[`${field}Ckb`]) return item[`${field}Ckb`];
    return item[`${field}En`];
  };

  const isRtl = language === 'ar' || language === 'ckb';

  return (
    <div className="my-12">
      <div className="bg-brand-900 rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Abstract background elements to give it a premium feel */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-stretch">
          
          {/* Header Column */}
          <div className="md:w-1/3 flex flex-col justify-center text-white">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-300">ICA+ Exclusive</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-4 leading-tight">
              Premium Media Hub
            </h2>
            <p className="text-brand-100 text-sm leading-relaxed mb-8 opacity-90 max-w-sm">
              Dive deep into the Sino-Iraqi relationship with our premium documentaries, exclusive video reports, and flagship podcast network.
            </p>
            <Link 
              to={`/${language}/ica-plus`}
              className="inline-flex items-center gap-2 w-max px-6 py-3 bg-white text-brand-900 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-neutral-100 transition-colors shadow-lg group"
            >
              Enter ICA+ Hub
              <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </Link>
          </div>

          {/* Cards Column */}
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {allFeatured.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-black/40 backdrop-blur-sm border border-brand-800/50 rounded-xl overflow-hidden cursor-pointer hover:border-brand-500 transition-colors flex flex-col h-full"
              >
                <div className="relative aspect-square sm:aspect-auto sm:h-48 overflow-hidden bg-neutral-900 shrink-0">
                  <img 
                    src={item.coverUrl} 
                    alt={getLocalized(item, 'title')}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="w-12 h-12 text-white/80 group-hover:text-white group-hover:scale-110 transition-all shadow-xl rounded-full bg-black/20 backdrop-blur-xs" />
                  </div>
                  <div className="absolute top-3 left-3 bg-brand-800 text-white text-[9px] px-2 py-1 rounded-sm font-bold uppercase tracking-widest shadow-lg">
                    {item.type}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-white font-bold text-sm leading-snug line-clamp-3 group-hover:text-brand-300 transition-colors">
                    {getLocalized(item, 'title')}
                  </h3>
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
