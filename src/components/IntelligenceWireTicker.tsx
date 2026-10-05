import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Activity, Flame, ChevronRight, Pause, Play } from 'lucide-react';
import { Locale, Article } from '../types';

interface Props {
  lang: Locale;
  className?: string;
}

const FALLBACK_ITEMS = [
  {
    id: 'f1',
    slug: 'iraq-china-bilateral-accord-2026',
    time: '08:45',
    title: {
      en: 'Baghdad-Beijing Bilateral Strategic Infrastructure Accord Formally Executed',
      ar: 'التوقيع الرسمي على اتفاقية التعاون الاستراتيجي للبنية التحتية بين بغداد وبكين',
      zh: '巴格达与北京正式签署双边战略基础设施建设总协议',
      ckb: 'واژۆکردنی فەرمی ڕێککەوتنامەی ستراتیژی ژێرخانی بەغداد و بەکین'
    }
  },
  {
    id: 'f2',
    slug: 'iqd-rmb-direct-clearing-rail',
    time: '07:15',
    title: {
      en: 'Central Bank Direct IQD ⇄ RMB Bilateral Settlement Rail Processes First Billion',
      ar: 'البنك المركزي يعلن معالجة أول مليار عبر مسار المقاصة المباشرة دينار / يوان',
      zh: '中伊央行直接本币清算专线首期交易额突破十亿级大关',
      ckb: 'بانکی ناوەندی جێبەجێکردنی یەکەم ملیار لە ڕێگەی پاکتاوی ڕاستەوخۆ ڕادەگەیەنێت'
    }
  },
  {
    id: 'f3',
    slug: 'cise-strategic-institute-outlook-2026',
    time: '06:30',
    title: {
      en: 'CISE Strategic Institute Issues Joint Economic Corridor Growth Projections',
      ar: 'المعهد الصيني العراقي يصدر توقعات النمو للممر الاقتصادي المشترك لعام 2026',
      zh: '中伊战略研究所正式发布2026年度双边经济走廊发展预测白皮书',
      ckb: 'پەیمانگای چینی عێراقی پێشبینی گەشەی ئابووری ڕێڕەوی هاوبەش بڵاودەکاتەوە'
    }
  },
  {
    id: 'f4',
    slug: 'iraq-china-summit-sulaymaniyah-announced',
    time: '05:00',
    title: {
      en: 'Iraq-China Investment & Trade Summit 2026 Delegations Confirmed for Sulaymaniyah',
      ar: 'تأكيد وفود قمة العراق والصين للاستثمار والتجارة 2026 في السليمانية',
      zh: '2026年中伊投资与贸易峰会苏莱曼尼亚参会官方代表团名单确认',
      ckb: 'پشتڕاستکردنەوەی شاندەکانی لوتکەی وەبەرهێنانی عێراق-چین ٢٠٢٦ لە سلێمانی'
    }
  }
];

export function IntelligenceWireTicker({ lang, className = '' }: Props) {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';
  const isRtl = isAr || isCkb;

  // Dynamic articles fetch
  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ['articles'],
    queryFn: async () => {
      const res = await fetch('/api/articles');
      if (!res.ok) throw new Error('Failed to load articles');
      return res.json();
    },
    staleTime: 60000,
  });

  const tickerItems = React.useMemo(() => {
    if (articles && articles.length > 0) {
      return articles.slice(0, 10).map((art) => {
        const tr = Array.isArray(art.translations)
          ? art.translations.find((t) => t.lang === lang) || art.translations[0]
          : undefined;
        const trTitle = tr?.title || art.slug.replace(/-/g, ' ');
        const timeStr = art.createdAt
          ? new Date(art.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
          : 'LIVE';
        return {
          id: art.id,
          slug: art.slug,
          time: timeStr,
          titleText: trTitle
        };
      });
    }

    // Fallback items
    return FALLBACK_ITEMS.map((item) => ({
      id: item.id,
      slug: item.slug,
      time: item.time,
      titleText: (item.title as any)[lang] || item.title.en
    }));
  }, [articles, lang]);

  return (
    <div 
      className={`w-full bg-red-700 text-white border-b border-red-500/30 flex overflow-hidden h-11 relative items-center select-none shadow-sm ${className}`}
      dir={isRtl ? 'rtl' : 'ltr'}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="region"
      aria-label="Intelligence Wire Live Feed"
    >
      {/* Fixed Left Ticker Label Pill - INTEGRATED RED */}
      <div className="flex-shrink-0 font-black text-white px-3 sm:px-5 border-e border-red-500/30 uppercase tracking-[0.18em] text-[10px] sm:text-[11px] z-20 bg-red-800 h-full flex items-center gap-2">
        <Activity size={14} className="text-white animate-pulse shrink-0" />
        <span className="whitespace-nowrap font-black">
          {isAr ? 'سلك المعلومات السيادي' : isZh ? '双边主权快讯' : isCkb ? 'تێلیگرافی زانیاری' : 'Intelligence Wire'}
        </span>
        <span className="hidden sm:inline-flex w-2 h-2 rounded-full bg-white animate-ping"></span>
      </div>

      {/* Scrolling Stream */}
      <div className="flex-grow h-full relative overflow-hidden flex items-center">
        <div 
          className={`flex items-center gap-8 whitespace-nowrap will-change-transform ${
            isPaused ? '' : 'animate-marquee hover:pause-animation'
          }`}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
            display: 'flex',
            width: 'max-content'
          }}
        >
          {/* Double list for continuous infinite loop */}
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <button
              key={`${item.id}-${idx}`}
              type="button"
              onClick={() => navigate(`/${lang}/newsroom/${item.slug}`)}
              className="flex items-center gap-2 text-xs font-bold cursor-pointer group hover:text-white transition-colors py-1 focus:outline-none focus:ring-1 focus:ring-red-300 px-2 rounded"
              title={`Read: ${item.titleText}`}
            >
              <span className="text-[10px] font-mono text-red-100 bg-red-800/50 px-1.5 py-0.5 rounded font-black">
                {item.time}
              </span>
              <span className="text-[11px] font-black text-white group-hover:text-red-100 transition-colors uppercase">
                {item.titleText}
              </span>
              <span className="text-red-400 text-xs">/</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Pause / Play Indicator - INTEGRATED RED */}
      <button
        type="button"
        onClick={() => setIsPaused(!isPaused)}
        className="hidden md:flex items-center gap-1.5 px-3 h-full border-s border-red-500/30 text-[10px] font-mono text-red-200 hover:text-white bg-red-800/20 z-20 shrink-0 transition-colors cursor-pointer"
        title={isPaused ? 'Resume scrolling' : 'Pause ticker'}
        aria-label={isPaused ? 'Resume ticker scrolling' : 'Pause ticker scrolling'}
      >
        {isPaused ? (
          <>
            <Play size={10} className="text-white" />
            <span className="font-black">PAUSED</span>
          </>
        ) : (
          <>
            <Pause size={10} className="text-red-300" />
            <span className="font-black">LIVE</span>
          </>
        )}
      </button>
    </div>
  );
}
export default IntelligenceWireTicker;
