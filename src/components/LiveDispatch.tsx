import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Locale } from '../types';
import { useI18n } from '../hooks/useI18n';
import React, { useState } from 'react';
import { Radio, ChevronRight, X, Clock, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LiveDispatchProps {
  lang: Locale;
}

export function LiveDispatch({ lang }: LiveDispatchProps) {
  const { t } = useI18n(lang);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isRtl = lang === 'ar' || lang === 'ckb';

  const { data: events = [] } = useQuery<any[]>({
    queryKey: ['events', 'active-stream-status'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/events');
        if (!res.ok) return [];
        return await res.json();
      } catch {
        return [];
      }
    },
    refetchInterval: 15000,
    staleTime: 10000,
    retry: false,
  });

  const activeEvents = events.filter((e) => e && e.isActive);
  const hasActiveEvent = activeEvents.length > 0;
  const currentEvent = hasActiveEvent ? activeEvents[0] : events[0];

  const getEventTitle = (event: any) => {
    if (!event) return '';
    if (lang === 'ar') return event.titleAr || event.titleEn;
    if (lang === 'ckb') return event.titleCkb || event.titleEn;
    if (lang === 'zh') return event.titleZh || event.titleEn;
    return event.titleEn;
  };

  const getEventSummary = (event: any) => {
    if (!event) return '';
    if (lang === 'ar') return event.summaryAr || event.summaryEn;
    if (lang === 'ckb') return event.summaryCkb || event.summaryEn;
    if (lang === 'zh') return event.summaryZh || event.summaryEn;
    return event.summaryEn;
  };

  const getUpdateContent = (update: any) => {
    if (!update) return '';
    if (lang === 'ar') return update.contentAr || update.contentEn;
    if (lang === 'ckb') return update.contentCkb || update.contentEn;
    if (lang === 'zh') return update.contentZh || update.contentEn;
    return update.contentEn;
  };

  const latestUpdate = currentEvent?.updates && currentEvent.updates.length > 0
    ? currentEvent.updates[0]
    : null;

  const showPreview = isOpen || isHovered;

  return (
    <>
      <Link
        to={`/${lang}/live`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="h-full flex items-center px-3 sm:px-6 md:px-8 py-2 sm:py-3 bg-neutral-950 dark:bg-neutral-950 hover:bg-neutral-900 dark:hover:bg-neutral-900 text-white transition-colors duration-200 cursor-pointer gap-2 sm:gap-3.5 group border-e border-neutral-800 dark:border-neutral-800 relative overflow-visible select-none shrink-0 z-20"
        title={hasActiveEvent ? "Live Intelligence Broadcast Active" : "Sovereign Intelligence Live Broadcast"}
      >
        {/* Dynamic Radar Pulse Beacon */}
        <span className="relative flex h-3 w-3 sm:h-3.5 sm:w-3.5 items-center justify-center shrink-0">
          {hasActiveEvent ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-red-600 border border-white/80"></span>
            </>
          ) : (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-brand-600 group-hover:bg-brand-500 transition-colors border border-white/60"></span>
            </>
          )}
        </span>

        {/* Main Label with prominent typography and unified minimalistic styling */}
        <span className="whitespace-nowrap font-black text-sm sm:text-base md:text-lg tracking-widest uppercase text-white group-hover:text-neutral-200 inline-block font-sans transition-colors duration-200 leading-none">
          {t('liveDispatch')}
        </span>

        {/* Status Pill Indicator */}
        {hasActiveEvent ? (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-red-600 text-white border border-red-500">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            <span>ON AIR</span>
          </span>
        ) : (
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-neutral-800 text-neutral-300 border border-neutral-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>LIVE</span>
          </span>
        )}
      </Link>

      {/* Live Broadcast Script Preview Popover */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95, transition: { duration: 0.2 } }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ transformOrigin: isRtl ? 'top right' : 'top left' }}
            className={`absolute top-full ${isRtl ? 'right-0 sm:right-2' : 'left-0 sm:left-2'} mt-2 w-[340px] sm:w-[420px] max-w-[calc(100vw-1.5rem)] bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl z-[120] p-4 sm:p-5 text-neutral-900 dark:text-neutral-100`}
          >
            {/* Arrow pointer */}
            <div className={`absolute -top-2 ${isRtl ? 'right-8' : 'left-8'} w-4 h-4 bg-white/95 dark:bg-neutral-900/95 border-t border-l border-neutral-200 dark:border-neutral-800 transform rotate-45 z-10`} />

            <div className="relative z-20 flex flex-col gap-3 text-start">
              {/* Header bar */}
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-widest text-red-700 dark:text-red-400">
                    {lang === 'ar' ? 'البث المباشر • التردد السيادي' : lang === 'zh' ? '现场直播 • 主权频段' : lang === 'ckb' ? 'پەخشی ڕاستەوخۆ • شەپۆلی فەرمی' : 'LIVE BROADCAST • SOVEREIGN WIRE'}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsHovered(false);
                    setIsOpen(false);
                  }}
                  className="p-1 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  aria-label="Close live broadcast preview"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Event Title & Badges */}
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 rounded border border-red-200 dark:border-red-800">
                    {currentEvent?.category || 'BROADCAST'}
                  </span>
                  <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded">
                    {currentEvent?.region || 'BILATERAL'}
                  </span>
                  <span className="ms-auto text-[10px] font-bold text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                    <Radio size={12} className="text-red-600 animate-pulse" />
                    <span>24/7 WIRE</span>
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white leading-snug">
                  {getEventTitle(currentEvent) || (lang === 'ar' ? 'البث المباشر للوكالة' : lang === 'zh' ? '通讯社实时直播' : lang === 'ckb' ? 'پەخشی ڕاستەوخۆی ئاژانس' : 'Iraq-China Agency Live Broadcast')}
                </h4>
              </div>

              {/* Live Broadcast Script Box */}
              <div className="bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800/80 rounded-xl p-3 sm:p-3.5 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-neutral-500 dark:text-neutral-400 border-b border-neutral-200/60 dark:border-neutral-800 pb-1.5">
                  <span className="flex items-center gap-1.5 text-red-700 dark:text-red-400">
                    <ShieldCheck size={13} />
                    <span>{lang === 'ar' ? 'نص البرقية العاجلة' : lang === 'zh' ? '官方电报脚本' : lang === 'ckb' ? 'دەقی بروسکەی پەخش' : 'DISPATCH SCRIPT ENTRY'}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    <span>{latestUpdate ? new Date(latestUpdate.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'REAL-TIME'}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed font-medium">
                  {latestUpdate ? (
                    getUpdateContent(latestUpdate)
                  ) : (
                    getEventSummary(currentEvent) ||
                    (lang === 'ar' 
                      ? 'قناة التغطية الحية متصلة بالبث المباشر بين بكين وبغداد وأربيل. اضغط للمتابعة الفورية.'
                      : lang === 'zh'
                      ? '实时通讯走廊已建立，连通北京、巴格达与埃尔比勒。点击进入全屏直播席位。'
                      : lang === 'ckb'
                      ? 'کەناڵی ڕووماڵی ڕاستەوخۆ چالاکە لە نێوان بێجینگ، بەغدا و هەولێر. کلیک بکە بۆ بەدواداچوونی دەستبەجێ.'
                      : 'Live broadcast telemetry connected across Beijing, Baghdad, and Erbil corridors. Click below for continuous coverage.')
                  )}
                </p>

                {latestUpdate?.authorName && (
                  <div className="pt-1 flex items-center justify-between text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                    <span>{latestUpdate.authorName}</span>
                    <span className="text-emerald-600 dark:text-emerald-400">VERIFIED SIGNAL</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-1 flex items-center gap-2">
                <Link
                  to={`/${lang}/live`}
                  onClick={() => {
                    setIsHovered(false);
                    setIsOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-brand-800 hover:bg-brand-900 text-white rounded-lg text-xs font-black uppercase tracking-wider transition-all shadow-xs active:scale-98"
                >
                  <span>{lang === 'ar' ? 'دخول غرفة البث المباشر' : lang === 'zh' ? '进入现场直播大厅' : lang === 'ckb' ? 'چوونە ناو ژووری پەخش' : 'Open Live Broadcast Desk'}</span>
                  <ChevronRight size={14} className="rtl:rotate-180" />
                </Link>
                <Link
                  to={`/${lang}/live`}
                  onClick={() => {
                    setIsHovered(false);
                    setIsOpen(false);
                  }}
                  title="View All Streams"
                  className="p-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-lg text-xs transition-colors"
                >
                  <ExternalLink size={15} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
