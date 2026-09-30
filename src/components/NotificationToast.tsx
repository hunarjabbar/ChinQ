import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotificationStore } from '../store/useNotificationStore';
import { Locale } from '../locales';
import { Shield, FileText, Radio, Info, CheckCircle2, AlertTriangle, AlertCircle, X, ExternalLink } from 'lucide-react';

interface NotificationToastProps {
  currentLocale: Locale;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ currentLocale }) => {
  const navigate = useNavigate();
  const { activeToast, dismissToast, markAsRead } = useNotificationStore();

  useEffect(() => {
    if (!activeToast) return;
    const timer = setTimeout(() => {
      dismissToast();
    }, 6000);
    return () => clearTimeout(timer);
  }, [activeToast, dismissToast]);

  if (!activeToast) return null;

  const loc = (currentLocale || 'en') as keyof typeof activeToast.title;

  const getCategoryIcon = () => {
    switch (activeToast.category) {
      case 'visa':
        return <Shield className="w-5 h-5 text-red-500 shrink-0" />;
      case 'service':
        return <FileText className="w-5 h-5 text-blue-500 shrink-0" />;
      case 'news':
        return <Radio className="w-5 h-5 text-amber-500 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-emerald-500 shrink-0" />;
    }
  };

  const getTypeIcon = () => {
    switch (activeToast.type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  const titleText = activeToast.title[loc] || activeToast.title.en;
  const messageText = activeToast.message[loc] || activeToast.message.en;

  const handleToastClick = () => {
    markAsRead(activeToast.id);
    dismissToast();
    if (activeToast.link) {
      navigate(activeToast.link);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999] max-w-md w-full px-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#1a1a1a] border-2 border-[var(--color-brand-800)] text-white rounded-xl shadow-2xl p-4 flex items-start gap-3 relative overflow-hidden backdrop-blur-md">
        {/* Top Accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-brand-800)] via-red-500 to-amber-500 animate-pulse" />

        <div className="p-2 bg-neutral-800/80 rounded-lg border border-neutral-700/60 mt-0.5">
          {getCategoryIcon()}
        </div>

        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-bold text-neutral-400 flex items-center gap-1">
              {getTypeIcon()}
              {activeToast.category.toUpperCase()}
            </span>
            {activeToast.referenceId && (
              <span className="bg-neutral-800 text-neutral-300 font-mono text-[10px] px-1.5 py-0.5 rounded border border-neutral-700">
                {activeToast.referenceId}
              </span>
            )}
          </div>

          <h4 className="text-sm font-bold text-white leading-tight mb-1 truncate">
            {titleText}
          </h4>

          <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
            {messageText}
          </p>

          {activeToast.link && (
            <button
              onClick={handleToastClick}
              className="mt-2 text-xs text-[#ff4d4d] hover:text-white font-semibold flex items-center gap-1 transition-colors"
            >
              <span>
                {currentLocale === 'ar'
                  ? 'عرض التفاصيل'
                  : currentLocale === 'zh'
                  ? '查看详情'
                  : currentLocale === 'ckb'
                  ? 'بینینی وردەکاری'
                  : 'View Details'}
              </span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>

        <button
          onClick={dismissToast}
          className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors shrink-0"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
