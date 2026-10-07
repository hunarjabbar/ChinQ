import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  X, 
  ChevronRight, 
  ChevronDown, 
  Download, 
  Globe2, 
  Sparkles, 
  Newspaper, 
  Radio, 
  Film, 
  Building2, 
  CreditCard, 
  CalendarDays, 
  ShieldCheck, 
  ExternalLink,
  Smartphone
} from 'lucide-react';
import { Locale } from '../types';
import { useNavigationStore } from '../store/useNavigationStore';
import { IcaLogo } from './IcaLogo';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Locale;
  onOpenDownloadApp?: () => void;
}

export function UnifiedMobileDrawer({ isOpen, onClose, lang, onOpenDownloadApp }: Props) {
  const navigate = useNavigate();
  const drawerRef = useRef<HTMLDivElement>(null);
  const { getHeaderItems, getFooterItems } = useNavigationStore();
  const [expandedSection, setExpandedSection] = useState<string | null>('portals');

  const headerItems = getHeaderItems();
  const initiativeItems = getFooterItems('initiatives');
  const researchItems = getFooterItems('research');

  const isRtl = lang === 'ar' || lang === 'ckb';

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleSection = (sec: string) => {
    setExpandedSection(prev => prev === sec ? null : sec);
  };

  const getLabel = (item: any) => {
    if (!item?.label) return '';
    return item.label[lang] || item.label.en || item.slug || '';
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div 
        ref={drawerRef}
        className="w-full max-w-sm sm:max-w-md h-full bg-neutral-900 border-l border-neutral-800 text-white flex flex-col shadow-2xl transition-transform transform duration-300 overflow-hidden"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Unified Mobile Navigation"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-800 bg-neutral-950">
          <Link to={`/${lang}`} onClick={onClose} className="flex items-center gap-2.5">
            <IcaLogo size={36} variant="mark" theme="white" className="rounded-xl shadow-md" />
            <div>
              <span className="text-sm font-black uppercase text-white tracking-wider block">ICA Agency</span>
              <span className="text-[10px] text-neutral-400 font-mono block">Sovereign Embassy Wire</span>
            </div>
          </Link>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close mobile navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Main Top-Level Portals */}
          <div className="space-y-1">
            <div 
              onClick={() => toggleSection('portals')}
              className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950/60 text-xs font-black uppercase tracking-wider text-neutral-300 cursor-pointer"
            >
              <span>{lang === 'ar' ? 'البوابات والمنصات الرئيسية' : lang === 'zh' ? '主权与融媒核心门户' : lang === 'ckb' ? 'دەروازە و پلاتفۆرمەکان' : 'Primary Portals'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === 'portals' ? 'rotate-180' : ''}`} />
            </div>
            {expandedSection === 'portals' && (
              <div className="pl-2 rtl:pl-0 rtl:pr-2 space-y-1 pt-1">
                {headerItems.map(item => {
                  const targetHref = item.href.startsWith('/') ? `/${lang}${item.href}` : item.href;
                  return (
                    <Link
                      key={item.id}
                      to={targetHref}
                      onClick={onClose}
                      className="flex items-center justify-between p-2.5 rounded-xl text-xs font-bold text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-800"></span>
                        <span>{getLabel(item)}</span>
                      </div>
                      {item.isLive && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-red-600 text-white font-mono animate-pulse font-black">LIVE</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Strategic Initiatives */}
          <div className="space-y-1">
            <div 
              onClick={() => toggleSection('initiatives')}
              className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950/60 text-xs font-black uppercase tracking-wider text-neutral-300 cursor-pointer"
            >
              <span>{lang === 'ar' ? 'المبادرات والخدمات الثنائية' : lang === 'zh' ? '双边重点倡议与专属服务' : lang === 'ckb' ? 'دەستپێشخەری و خزمەتگوزارییەکان' : 'Bilateral Initiatives'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === 'initiatives' ? 'rotate-180' : ''}`} />
            </div>
            {expandedSection === 'initiatives' && (
              <div className="pl-2 rtl:pl-0 rtl:pr-2 space-y-1 pt-1">
                {initiativeItems.map(item => {
                  const targetHref = item.href.startsWith('/') ? `/${lang}${item.href}` : item.href;
                  return (
                    <Link
                      key={item.id}
                      to={targetHref}
                      onClick={onClose}
                      className="flex items-center justify-between p-2.5 rounded-xl text-xs font-bold text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1 h-1 rounded-full bg-neutral-500"></span>
                        <span className="truncate">{getLabel(item)}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-600 rtl:rotate-180" />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Academic & Strategic Research */}
          <div className="space-y-1">
            <div 
              onClick={() => toggleSection('research')}
              className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950/60 text-xs font-black uppercase tracking-wider text-neutral-300 cursor-pointer"
            >
              <span>{lang === 'ar' ? 'أبحاث المعهد ومراكز البيانات' : lang === 'zh' ? '智库研究与经贸数据中心' : lang === 'ckb' ? 'توێژینەوەی پەیمانگا و داتاکان' : 'Research & Data'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === 'research' ? 'rotate-180' : ''}`} />
            </div>
            {expandedSection === 'research' && (
              <div className="pl-2 rtl:pl-0 rtl:pr-2 space-y-1 pt-1">
                {researchItems.map(item => {
                  const targetHref = item.href.startsWith('/') ? `/${lang}${item.href}` : item.href;
                  return (
                    <Link
                      key={item.id}
                      to={targetHref}
                      onClick={onClose}
                      className="flex items-center justify-between p-2.5 rounded-xl text-xs font-bold text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1 h-1 rounded-full bg-neutral-500"></span>
                        <span className="truncate">{getLabel(item)}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-600 rtl:rotate-180" />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Direct Link to Centralized Command Hub */}
          <div className="pt-2">
            <Link
              to="/hub"
              onClick={onClose}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-brand-900 to-brand-800 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all border border-brand-700"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-brand-300" />
                <span>{lang === 'ar' ? 'مركز القيادة الموحد (Hub)' : lang === 'zh' ? '综合指挥管控中枢 (Hub)' : lang === 'ckb' ? 'ناوەندی کۆنتڕۆڵی باڵا (Hub)' : 'Command Hub (Control Centre)'}</span>
              </div>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950 space-y-2">
          <button
            onClick={() => {
              onClose();
              if (onOpenDownloadApp) onOpenDownloadApp();
            }}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white text-neutral-900 font-black text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-md"
          >
            <Smartphone className="w-4 h-4" />
            <span>{lang === 'ar' ? 'تثبيت تطبيق الوكالة (PWA)' : lang === 'zh' ? '安装移动端官方应用 (PWA)' : lang === 'ckb' ? 'داگرتنی بەرنامە (PWA)' : 'Download Sovereign App'}</span>
          </button>
          <div className="text-center text-[10px] text-neutral-500 font-mono">
            &copy; {new Date().getFullYear()} Iraqi-Chinese Agency. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
