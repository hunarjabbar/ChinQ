import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Command, 
  Search, 
  X, 
  Layers, 
  Globe, 
  FileText, 
  Building2, 
  CreditCard, 
  CalendarDays, 
  Shield, 
  RefreshCw, 
  Plus, 
  UserCheck, 
  Languages, 
  Radio, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Locale } from '../types';

interface PaletteCommand {
  id: string;
  category: 'navigation' | 'actions' | 'localization' | 'admin';
  title: string;
  subtitle?: string;
  icon: any;
  action: () => void;
  shortcut?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Locale;
}

export function UnifiedCommandPalette({ isOpen, onClose, lang }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const switchLocale = (targetLoc: Locale) => {
    const currentPath = location.pathname;
    const localeRegex = /^\/(en|ar|zh|ckb)(\/.*)?$/;
    const match = currentPath.match(localeRegex);
    if (match) {
      const rest = match[2] || '';
      navigate(`/${targetLoc}${rest}${location.search}${location.hash}`);
    } else {
      navigate(`/${targetLoc}${currentPath}${location.search}${location.hash}`);
    }
    onClose();
  };

  const commands: PaletteCommand[] = [
    // Navigation items
    {
      id: 'cmd_nav_home',
      category: 'navigation',
      title: 'Go to Sovereign Public Home',
      subtitle: `/${lang}`,
      icon: Globe,
      action: () => { navigate(`/${lang}`); onClose(); }
    },
    {
      id: 'cmd_nav_newsroom',
      category: 'navigation',
      title: 'Go to ICA Newsroom',
      subtitle: `/${lang}/newsroom`,
      icon: FileText,
      action: () => { navigate(`/${lang}/newsroom`); onClose(); }
    },
    {
      id: 'cmd_nav_live',
      category: 'navigation',
      title: 'Go to Live Streaming Portal',
      subtitle: `/${lang}/live`,
      icon: Radio,
      action: () => { navigate(`/${lang}/live`); onClose(); }
    },
    {
      id: 'cmd_nav_institute',
      category: 'navigation',
      title: 'Go to CISE Strategic Institute',
      subtitle: `/${lang}/institute`,
      icon: Building2,
      action: () => { navigate(`/${lang}/institute`); onClose(); }
    },
    {
      id: 'cmd_nav_settlement',
      category: 'navigation',
      title: 'Go to Payment Settlement Facility',
      subtitle: `/${lang}/settlement`,
      icon: CreditCard,
      action: () => { navigate(`/${lang}/settlement`); onClose(); }
    },
    {
      id: 'cmd_nav_summit',
      category: 'navigation',
      title: 'Go to Iraq-China Economic Summit & Expo',
      subtitle: `/${lang}/summit`,
      icon: CalendarDays,
      action: () => { navigate(`/${lang}/summit`); onClose(); }
    },
    {
      id: 'cmd_nav_hub',
      category: 'navigation',
      title: 'Go to CISE Command Hub (Control Centre)',
      subtitle: '/hub',
      icon: Command,
      action: () => { navigate('/hub'); onClose(); }
    },
    {
      id: 'cmd_nav_hub_nav',
      category: 'navigation',
      title: 'Open Navigation Architecture CRUD',
      subtitle: '/hub/navigation',
      icon: Layers,
      action: () => { navigate('/hub/navigation'); onClose(); }
    },

    // Administrative Actions
    {
      id: 'cmd_act_revalidate',
      category: 'actions',
      title: 'Trigger Global Cache Revalidation',
      subtitle: 'POST /api/hub/revalidate',
      icon: RefreshCw,
      action: () => {
        fetch('/api/hub/revalidate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: 'all', tag: 'global-revalidation' })
        });
        alert('Cache revalidation dispatched across all edge nodes.');
        onClose();
      }
    },
    {
      id: 'cmd_act_submissions',
      category: 'actions',
      title: 'Open Unified Submissions Inbox',
      subtitle: 'Review incoming visa, summit, and settlement forms',
      icon: UserCheck,
      action: () => { navigate('/hub/submissions'); onClose(); }
    },
    {
      id: 'cmd_act_audit',
      category: 'actions',
      title: 'View Immutable Audit Log',
      subtitle: 'Inspect immutable records and actor histories',
      icon: Shield,
      action: () => { navigate('/hub/audit'); onClose(); }
    },

    // Localization switches
    {
      id: 'cmd_loc_ar',
      category: 'localization',
      title: 'Switch Interface to Arabic (العربية)',
      subtitle: 'اللغة الرسمية - جمهورية العراق',
      icon: Languages,
      action: () => switchLocale('ar')
    },
    {
      id: 'cmd_loc_zh',
      category: 'localization',
      title: 'Switch Interface to Chinese (中文)',
      subtitle: '中华人民共和国官方语言',
      icon: Languages,
      action: () => switchLocale('zh')
    },
    {
      id: 'cmd_loc_ckb',
      category: 'localization',
      title: 'Switch Interface to Kurdish Sorani (کوردی)',
      subtitle: 'زمانی فەرمی - هەرێمی کوردستان',
      icon: Languages,
      action: () => switchLocale('ckb')
    },
    {
      id: 'cmd_loc_en',
      category: 'localization',
      title: 'Switch Interface to English (EN)',
      subtitle: 'International Diplomatic Standard',
      icon: Languages,
      action: () => switchLocale('en')
    }
  ];

  const filteredCommands = query.trim() === ''
    ? commands
    : commands.filter(c => 
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase())
      );

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  const isRtl = lang === 'ar' || lang === 'ckb';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md transition-all animate-in fade-in duration-200"
      onClick={onClose}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div 
        className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-neutral-800 bg-neutral-950/70">
          <Command className="w-5 h-5 text-brand-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or jump to route (e.g. 'news', 'settlement', 'ar')..."
            className="w-full bg-transparent text-white placeholder-neutral-500 text-sm sm:text-base focus:outline-none"
          />
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Command list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
          {filteredCommands.length === 0 ? (
            <div className="py-10 text-center text-neutral-500 text-xs">
              No command found. Try 'hub', 'revalidate', or 'newsroom'.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              const IconComponent = cmd.icon;

              return (
                <div
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-2xl flex items-center justify-between gap-4 cursor-pointer transition-all border ${
                    isSelected 
                      ? 'bg-neutral-800 border-brand-800 shadow-md translate-x-1 rtl:-translate-x-1' 
                      : 'bg-neutral-950/40 border-neutral-850 hover:bg-neutral-850'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-xl shrink-0 ${
                      isSelected ? 'bg-brand-800 text-white' : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-white truncate">{cmd.title}</div>
                      {cmd.subtitle && (
                        <div className="text-[11px] text-neutral-400 truncate">{cmd.subtitle}</div>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800 shrink-0">
                    {cmd.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950 text-[11px] text-neutral-500 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px]">↑↓</kbd> Choose</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px]">↵</kbd> Execute</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px]">ESC</kbd> Dismiss</span>
          </div>
          <span className="text-brand-400 font-bold uppercase tracking-wider text-[10px]">Executive Command Line Interface</span>
        </div>
      </div>
    </div>
  );
}
