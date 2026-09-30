import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Radio, ArrowLeft, ShieldCheck, Users, MessageSquare, Send } from 'lucide-react';
import { VideoPlayer } from '../../components/VideoPlayer';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function LiveNowPage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const liveStream = portalStore.getLiveStream();
  const chatMessages = portalStore.getChatMessages();
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    portalStore.addChatMessage('Observer', chatInput.trim(), currentLang);
    setChatInput('');
  };

  return (
    <div className="bg-[#000000] text-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/${currentLang}/live`}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-6 hover:underline"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>Back to Media Hub</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand-800)] animate-soft-vibrate"></span>
                <span className="font-mono font-bold tracking-widest text-[var(--color-brand-800)] uppercase">
                  {t('livePortal.nowStreaming')}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-neutral-400">
                <Users size={14} className="text-[var(--color-brand-800)]" />
                <span>{liveStream.viewerCount.toLocaleString()} Diplomatic Viewers</span>
              </div>
            </div>

            <VideoPlayer
              src={liveStream.streamUrl}
              title={liveStream.title[currentLang] || liveStream.title.en}
              autoPlay={true}
            />

            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-black text-white">
                {liveStream.title[currentLang] || liveStream.title.en}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {liveStream.description[currentLang] || liveStream.description.en}
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col h-[540px] rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl">
            <div className="p-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between text-xs font-bold text-white">
              <div className="flex items-center gap-2">
                <MessageSquare size={14} className="text-[var(--color-brand-800)]" />
                <span>{t('livePortal.chatTitle')}</span>
              </div>
              <span className="text-[10px] font-mono text-green-400 bg-green-950/60 px-2 py-0.5 rounded border border-green-800/40">
                ONLINE
              </span>
            </div>

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
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveNowPage;
