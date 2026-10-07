import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Newspaper, Radio, Film, Building2, CreditCard, CalendarDays, ExternalLink, ArrowRight } from 'lucide-react';
import { Locale } from '../types';

interface SearchResult {
  id: string;
  pillar: 'newsroom' | 'live' | 'media' | 'institute' | 'services' | 'public';
  title: string;
  excerpt: string;
  url: string;
  tag?: string;
}

const SEARCH_DATABASE: SearchResult[] = [
  // Newsroom
  {
    id: 's_news_01',
    pillar: 'newsroom',
    title: 'Development Road Corridor: Al-Faw Grand Port Rail Interconnectivity',
    excerpt: 'Comprehensive bilateral engineering assessment on the southern rail corridor connecting Basra to Europe.',
    url: '/newsroom/development-road-rail-interconnectivity',
    tag: 'Infrastructure'
  },
  {
    id: 's_news_02',
    pillar: 'newsroom',
    title: 'Central Bank of Iraq Expands Direct IQD/RMB Settlement Protocol',
    excerpt: 'Official regulatory directive enabling direct commercial invoices clearing without third-party correspondent banks.',
    url: '/newsroom/cbi-direct-settlement-expansion',
    tag: 'Settlement'
  },
  // Live Portal
  {
    id: 's_live_01',
    pillar: 'live',
    title: 'Silk Road Echoes: Baghdad-Beijing Symphony Broadcast',
    excerpt: 'Official live transmission of the bilateral cultural orchestra performance from Chaoyang Grand Theatre.',
    url: '/live/now',
    tag: 'Live Now'
  },
  {
    id: 's_live_02',
    pillar: 'live',
    title: 'Mesopotamia Meets Chang’an Documentary Series',
    excerpt: 'Historical deep-dive tracing trade routes between Ancient Babylon and the Tang Dynasty.',
    url: '/live/documentary',
    tag: 'Documentary'
  },
  // Institute
  {
    id: 's_inst_01',
    pillar: 'institute',
    title: 'Chinese Institute for Strategic and Economic Studies (CISE)',
    excerpt: 'Sovereign research partner anchoring Belt & Road macroeconomic policy design.',
    url: '/institute',
    tag: 'Institute Core'
  },
  {
    id: 's_inst_02',
    pillar: 'institute',
    title: 'Research Pillars: Energy, Geo-Economics & Digital Silk Road',
    excerpt: 'Four academic divisions analyzing bilateral trade, energy pipelines, and technology transfer.',
    url: '/institute/research',
    tag: 'Research'
  },
  {
    id: 's_inst_03',
    pillar: 'institute',
    title: 'Bilateral Macroeconomic Data Hub & BRI Projects Monitor',
    excerpt: 'Real-time trade flow indexes, corridor metrics, and contract registries between Iraq and China.',
    url: '/institute/data-hub',
    tag: 'Data Hub'
  },
  // Services
  {
    id: 's_srv_01',
    pillar: 'services',
    title: 'Direct IQD / RMB Payment Settlement Facility',
    excerpt: 'Bilateral clearing protocol powered by PBOC mBridge and CBI digital settlement rails.',
    url: '/settlement',
    tag: 'Currency'
  },
  {
    id: 's_srv_02',
    pillar: 'services',
    title: 'Qi & ICA Co-Branded VIP Commercial Settlement Card',
    excerpt: 'Executive debit and trade card with zero foreign exchange spread for Iraqi entrepreneurs in China.',
    url: '/settlement/card',
    tag: 'Finance'
  },
  {
    id: 's_srv_03',
    pillar: 'services',
    title: 'Iraq-China Economic Summit & Bilateral Trade Expo 2026',
    excerpt: 'Premier convening platform in Sulaymaniyah uniting top-tier enterprise pavilions and state leaders.',
    url: '/summit',
    tag: 'Summit'
  },
  {
    id: 's_srv_04',
    pillar: 'services',
    title: 'Bilateral Visa Facilitation & Advisory Centre',
    excerpt: 'Accredited advisory, category guidelines, and application tracking for Iraq-China business travel.',
    url: '/visa-centre',
    tag: 'Consular'
  },
  {
    id: 's_srv_05',
    pillar: 'services',
    title: 'Chinese Language Tutoring Centre & HSK Testing Desk',
    excerpt: 'Certified tutoring covering HSK 1–6 curricula with verifiable proctored examinations in Sulaymaniyah.',
    url: '/chinese-center',
    tag: 'Education'
  }
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Locale;
}

export function UnifiedSearchOverlay({ isOpen, onClose, lang }: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // 200ms Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  // Trap focus and auto focus on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setSelectedIndex(0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Filtered results
  const results = debouncedQuery === ''
    ? SEARCH_DATABASE.slice(0, 6)
    : SEARCH_DATABASE.filter(item => 
        item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        item.tag?.toLowerCase().includes(debouncedQuery.toLowerCase())
      );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, results.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % Math.max(1, results.length));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        const target = results[selectedIndex].url.startsWith('/') 
          ? `/${lang}${results[selectedIndex].url}` 
          : results[selectedIndex].url;
        navigate(target);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, lang, navigate, onClose]);

  if (!isOpen) return null;

  const isRtl = lang === 'ar' || lang === 'ckb';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md transition-all animate-in fade-in duration-200"
      onClick={onClose}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div 
        className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Unified Global Search"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-neutral-800 bg-neutral-950/70">
          <Search className="w-5 h-5 text-brand-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={
              lang === 'ar' ? 'ابحث في كافة بوابات وأخبار ومصادر الوكالة والمعهد...' :
              lang === 'zh' ? '在伊中通讯社、智库全平台搜索新闻、直播与双边服务...' :
              lang === 'ckb' ? 'گەڕان لە تەواوی بەشەکانی ئاژانس و پەیمانگا...' :
              'Search across newsroom, live portal, institute, and bilateral services...'
            }
            className="w-full bg-transparent text-white placeholder-neutral-500 text-sm sm:text-base focus:outline-none"
          />
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close search overlay"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {results.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 space-y-2">
              <Search className="w-8 h-8 mx-auto opacity-30" />
              <p className="text-sm">
                {lang === 'ar' ? 'لم يتم العثور على نتائج مطابقة.' :
                 lang === 'zh' ? '未找到相关结果。' :
                 lang === 'ckb' ? 'هیچ ئەنجامێک نەدۆزرایەوە.' :
                 'No results matching your query.'}
              </p>
              <p className="text-xs text-neutral-600">
                {lang === 'ar' ? 'جرب البحث عن "تسوية", "فيزا", "المعهد", أو "القمة"' :
                 lang === 'zh' ? '可尝试搜索 "结算", "签证", "智库", 或 "峰会"' :
                 lang === 'ckb' ? 'هەوڵبدە بە گەڕان بۆ "ڤیزا", "پاکتاو", یان "پەیمانگا"' :
                 'Try searching for "settlement", "visa", "institute", or "summit"'}
              </p>
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const pillarIcon = 
                item.pillar === 'newsroom' ? Newspaper :
                item.pillar === 'live' ? Radio :
                item.pillar === 'media' ? Film :
                item.pillar === 'institute' ? Building2 :
                item.pillar === 'services' ? CreditCard : CalendarDays;

              const PillarIconComponent = pillarIcon;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    const target = item.url.startsWith('/') ? `/${lang}${item.url}` : item.url;
                    navigate(target);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3.5 rounded-2xl flex items-start justify-between gap-4 cursor-pointer transition-all border ${
                    isSelected 
                      ? 'bg-neutral-800 border-brand-800/80 shadow-md translate-x-1 rtl:-translate-x-1' 
                      : 'bg-neutral-950/40 border-neutral-850 hover:bg-neutral-850'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl shrink-0 ${
                      isSelected ? 'bg-brand-800 text-white' : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      <PillarIconComponent className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-white">{item.title}</span>
                        {item.tag && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-neutral-800 text-brand-400 border border-neutral-700">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-1">{item.excerpt}</p>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 text-neutral-500 shrink-0 mt-1 rtl:rotate-180 ${
                    isSelected ? 'text-brand-400' : ''
                  }`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950 text-[11px] text-neutral-500 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px]">↑↓</kbd> Navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px]">↵</kbd> Select</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px]">ESC</kbd> Close</span>
          </div>
          <span className="text-brand-400 font-bold uppercase tracking-wider text-[10px]">Unified Quad-Lingual Search Wire</span>
        </div>
      </div>
    </div>
  );
}
