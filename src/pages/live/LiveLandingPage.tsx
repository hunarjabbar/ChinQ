import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Radio,
  Play,
  Film,
  Tv,
  Clapperboard,
  Users,
  Calendar,
  Clock,
  Search,
  Rss,
  ArrowRight,
  ShieldCheck,
  Send,
  MessageSquare
} from 'lucide-react';
import { VideoPlayer } from '../../components/VideoPlayer';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale, MediaItem } from '../../types/portals';

export function LiveLandingPage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const [dataVersion, setDataVersion] = useState(0);
  const [activeCategory, setActiveCategory] = useState<'all' | 'movies' | 'drama' | 'documentary' | 'exchange'>('all');
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    return portalStore.subscribe(() => setDataVersion(v => v + 1));
  }, []);

  const liveStream = portalStore.getLiveStream();
  const schedule = portalStore.getScheduleItems();
  const mediaItems = portalStore.getMediaItems().filter(m => m.status === 'published');
  const chatMessages = portalStore.getChatMessages();

  const filteredMedia = activeCategory === 'all'
    ? mediaItems
    : mediaItems.filter(m => m.category === activeCategory);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    portalStore.addChatMessage('GuestDiplomat', chatInput.trim(), currentLang);
    setChatInput('');
  };

  return (
    <div className="bg-[#FFFFFF] text-[#000000] min-h-screen">
      {/* 1. TOP HERO BROADCAST SECTION */}
      <section className="bg-[#000000] text-white py-12 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Live Video Player Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-800)] text-white text-[11px] font-mono font-black uppercase tracking-widest animate-pulse-ring">
                    <span className="w-2 h-2 rounded-full bg-white animate-soft-vibrate"></span>
                    <span>{t('livePortal.liveBadge')}</span>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">
                    {liveStream.viewerCount.toLocaleString()} {t('livePortal.viewersCount')}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-green-400">
                  <ShieldCheck size={14} />
                  <span>{t('livePortal.streamHealth')}: {liveStream.streamHealth.toUpperCase()}</span>
                </div>
              </div>

              {/* Main Player Component */}
              <VideoPlayer
                src={liveStream.streamUrl}
                title={liveStream.title[currentLang] || liveStream.title.en}
                subtitles={['English', 'Arabic', 'Chinese', 'Kurdish']}
              />

              <div className="pt-2">
                <h1 className="font-serif text-xl sm:text-2xl font-black text-white">
                  {liveStream.title[currentLang] || liveStream.title.en}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  {liveStream.description[currentLang] || liveStream.description.en}
                </p>
              </div>
            </div>

            {/* Live Chat & Schedule Sidebar Column */}
            <div className="lg:col-span-4 flex flex-col h-[520px] rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-xl">
              <div className="p-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <MessageSquare size={14} className="text-[var(--color-brand-800)]" />
                  <span>{t('livePortal.chatTitle')}</span>
                </div>
                <span className="text-[10px] font-mono text-green-400 font-bold bg-green-950/60 px-2 py-0.5 rounded border border-green-800/40">
                  SECURE
                </span>
              </div>

              {/* Messages Container */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                {chatMessages.map(msg => (
                  <div key={msg.id} className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/60">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[var(--color-brand-800)]">{msg.user}</span>
                      <span className="text-[10px] font-mono text-neutral-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-neutral-300 leading-snug">{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendChat} className="p-3 bg-neutral-950 border-t border-neutral-800 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder={t('livePortal.chatPlaceholder')}
                  className="flex-1 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs focus:border-[var(--color-brand-800)] focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#A00D26] text-white transition-colors cursor-pointer"
                  title="Send message"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BROADCAST SCHEDULE STRIP */}
      <section className="bg-[#F9FAFB] border-b border-[#E5E7EB] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#000000]">
              <Calendar size={14} className="text-[var(--color-brand-800)]" />
              <span>{t('livePortal.schedule')}</span>
            </div>
            <Link
              to={`/${currentLang}/live/schedule`}
              className="text-xs font-bold text-[var(--color-brand-800)] hover:underline"
            >
              Full Schedule →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {schedule.map(item => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border text-xs ${
                  item.isLive
                    ? 'bg-[#FEE2E2] border-[var(--color-brand-800)]'
                    : 'bg-white border-[#E5E7EB]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 font-mono">
                  <span className="font-bold text-[#000000]">{item.timeSlot}</span>
                  {item.isLive && (
                    <span className="px-2 py-0.5 rounded bg-[var(--color-brand-800)] text-white text-[10px] font-bold uppercase">
                      ON AIR
                    </span>
                  )}
                </div>
                <div className="font-serif font-bold text-sm text-[#000000] line-clamp-1">
                  {item.title[currentLang] || item.title.en}
                </div>
                <div className="text-[11px] text-[#4B5563] mt-1 line-clamp-1">
                  {item.description[currentLang] || item.description.en}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ENRICHED MEDIA HUB ON-DEMAND LIBRARY */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E5E7EB] gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-[var(--color-brand-800)] uppercase tracking-wider block mb-1">
                On-Demand Sovereign Streaming
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-black text-[#000000]">
                {t('livePortal.archive')}
              </h2>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-[#000000] text-white'
                    : 'bg-[#F9FAFB] border border-[#E5E7EB] text-[#4B5563] hover:border-[var(--color-brand-800)]'
                }`}
              >
                All Media
              </button>
              <button
                onClick={() => setActiveCategory('movies')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === 'movies'
                    ? 'bg-[var(--color-brand-800)] text-white'
                    : 'bg-[#F9FAFB] border border-[#E5E7EB] text-[#4B5563] hover:border-[var(--color-brand-800)]'
                }`}
              >
                <Film size={14} />
                <span>{t('livePortal.movies')}</span>
              </button>
              <button
                onClick={() => setActiveCategory('drama')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === 'drama'
                    ? 'bg-[var(--color-brand-800)] text-white'
                    : 'bg-[#F9FAFB] border border-[#E5E7EB] text-[#4B5563] hover:border-[var(--color-brand-800)]'
                }`}
              >
                <Tv size={14} />
                <span>{t('livePortal.drama')}</span>
              </button>
              <button
                onClick={() => setActiveCategory('documentary')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === 'documentary'
                    ? 'bg-[var(--color-brand-800)] text-white'
                    : 'bg-[#F9FAFB] border border-[#E5E7EB] text-[#4B5563] hover:border-[var(--color-brand-800)]'
                }`}
              >
                <Clapperboard size={14} />
                <span>{t('livePortal.documentary')}</span>
              </button>
              <button
                onClick={() => setActiveCategory('exchange')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === 'exchange'
                    ? 'bg-[var(--color-brand-800)] text-white'
                    : 'bg-[#F9FAFB] border border-[#E5E7EB] text-[#4B5563] hover:border-[var(--color-brand-800)]'
                }`}
              >
                <Users size={14} />
                <span>{t('livePortal.exchange')}</span>
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMedia.map(item => (
              <Link
                key={item.id}
                to={`/${currentLang}/live/${item.slug}`}
                className="ica-card-interactive group flex flex-col justify-between rounded-2xl bg-white border border-[#E5E7EB] hover:border-[var(--color-brand-800)] overflow-hidden"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                  <img
                    src={item.posterUrl}
                    alt={item.title[currentLang] || item.title.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-brand-800)] text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                      <Play size={20} className="translate-x-0.5 fill-current" />
                    </div>
                  </div>
                  <div className="absolute top-3 inset-inline-start-3 bg-[var(--color-brand-800)] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                    {item.category.toUpperCase()}
                  </div>
                  <div className="absolute bottom-3 inset-inline-end-3 bg-black/80 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                    {item.duration}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors line-clamp-1 mb-2">
                      {item.title[currentLang] || item.title.en}
                    </h3>
                    <p className="text-xs text-[#4B5563] line-clamp-2">
                      {item.description[currentLang] || item.description.en}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#4B5563]">
                    <span>{item.director}</span>
                    <span className="text-[var(--color-brand-800)] font-black cta-arrow transition-transform flex items-center gap-1">
                      <span>Stream</span>
                      <ArrowRight size={14} className="rtl:rotate-180" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LiveLandingPage;
