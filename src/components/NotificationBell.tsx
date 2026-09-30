import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useNotificationStore,
  AppNotification,
  NotificationCategory,
} from '../store/useNotificationStore';
import { Locale } from '../locales';
import {
  Bell,
  Check,
  Trash2,
  Shield,
  FileText,
  Radio,
  Info,
  ExternalLink,
  Sparkles,
  X,
  Clock,
  CheckCheck,
} from 'lucide-react';

interface NotificationBellProps {
  currentLocale: Locale;
  variant?: 'default' | 'header';
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ currentLocale, variant = 'default' }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | NotificationCategory>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAll,
    simulateNotification,
  } = useNotificationStore();

  const isRtl = currentLocale === 'ar' || currentLocale === 'ckb';

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredNotifications = notifications.filter((n) => {
    if (activeCategory === 'all') return true;
    return n.category === activeCategory;
  });

  const getCategoryIcon = (category: NotificationCategory) => {
    switch (category) {
      case 'visa':
        return <Shield className="w-4 h-4 text-red-500" />;
      case 'service':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'news':
        return <Radio className="w-4 h-4 text-amber-500" />;
      default:
        return <Info className="w-4 h-4 text-emerald-500" />;
    }
  };

  const formatTimeAgo = (isoString: string) => {
    const now = new Date();
    const past = new Date(isoString);
    const diffMs = Math.max(0, now.getTime() - past.getTime());
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) {
      return currentLocale === 'ar'
        ? 'الآن'
        : currentLocale === 'zh'
        ? '刚刚'
        : currentLocale === 'ckb'
        ? 'ئێستا'
        : 'Just now';
    }
    if (diffMins < 60) {
      return currentLocale === 'ar'
        ? `منذ ${diffMins} د`
        : currentLocale === 'zh'
        ? `${diffMins}分钟前`
        : currentLocale === 'ckb'
        ? `پێش ${diffMins} خولەک`
        : `${diffMins}m ago`;
    }
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) {
      return currentLocale === 'ar'
        ? `منذ ${diffHours} س`
        : currentLocale === 'zh'
        ? `${diffHours}小时前`
        : currentLocale === 'ckb'
        ? `پێش ${diffHours} کاتژمێر`
        : `${diffHours}h ago`;
    }
    const diffDays = Math.floor(diffHours / 24);
    return currentLocale === 'ar'
      ? `منذ ${diffDays} يوم`
      : currentLocale === 'zh'
      ? `${diffDays}天前`
      : currentLocale === 'ckb'
      ? `پێش ${diffDays} ڕۆژ`
      : `${diffDays}d ago`;
  };

  const handleNotificationClick = (n: AppNotification) => {
    markAsRead(n.id);
    setIsOpen(false);
    if (n.link) {
      navigate(n.link);
    }
  };

  // Translations for notifications UI
  const labels = {
    title:
      currentLocale === 'ar'
        ? 'مركز الإشعارات والتنبيهات'
        : currentLocale === 'zh'
        ? '通知与双边状态中心'
        : currentLocale === 'ckb'
        ? 'ناوەندی ئاگادارییەکان'
        : 'Notifications & Status Center',
    markAllRead:
      currentLocale === 'ar'
        ? 'تحديد الكل ككمقروء'
        : currentLocale === 'zh'
        ? '全部标记为已读'
        : currentLocale === 'ckb'
        ? 'دیاریکردنی هەمووی بە خوێندراوە'
        : 'Mark all as read',
    clearAll:
      currentLocale === 'ar'
        ? 'مسح جميع الإشعارات'
        : currentLocale === 'zh'
        ? '清空所有通知'
        : currentLocale === 'ckb'
        ? 'سڕینەوەی هەموو ئاگادارییەکان'
        : 'Clear all',
    simulate:
      currentLocale === 'ar'
        ? 'إرسال تنبيه تجريبي'
        : currentLocale === 'zh'
        ? '模拟状态推送'
        : currentLocale === 'ckb'
        ? 'تەقیکردنەوەی ئاگاداری'
        : 'Simulate Alert',
    empty:
      currentLocale === 'ar'
        ? 'لا توجد إشعارات حالياً'
        : currentLocale === 'zh'
        ? '暂无任何状态更新'
        : currentLocale === 'ckb'
        ? 'هیچ ئاگادارییەک نییە'
        : 'No notifications available',
    all: currentLocale === 'ar' ? 'الكل' : currentLocale === 'zh' ? '全部' : currentLocale === 'ckb' ? 'هەموو' : 'All',
    visa: currentLocale === 'ar' ? 'التأشيرات' : currentLocale === 'zh' ? '领事签证' : currentLocale === 'ckb' ? 'ڤیزا' : 'Visa',
    services: currentLocale === 'ar' ? 'الخدمات' : currentLocale === 'zh' ? '机构服务' : currentLocale === 'ckb' ? 'خزمەتگوزاری' : 'Services',
    news: currentLocale === 'ar' ? 'الأخبار' : currentLocale === 'zh' ? '双边动态' : currentLocale === 'ckb' ? 'هەواڵ' : 'News',
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Bell Icon Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-xl transition-all focus:outline-none cursor-pointer ${
          variant === 'header'
            ? 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
            : 'bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-700 dark:text-neutral-200 hover:bg-slate-200 dark:hover:bg-neutral-700'
        }`}
        title={labels.title}
        aria-label={labels.title}
      >
        <Bell className={`w-4 h-4 ${variant === 'header' ? 'text-white' : 'text-slate-700 dark:text-neutral-200'}`} />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-[var(--color-brand-800)] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-md animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown Panel */}
      {isOpen && (
        <div
          className={`absolute ${
            isRtl ? 'left-0 sm:left-auto sm:right-0' : 'right-0'
          } mt-2 w-80 sm:w-96 bg-white border border-slate-200 text-slate-900 rounded-xl shadow-2xl z-[100] overflow-hidden backdrop-blur-lg animate-in fade-in zoom-in-95 duration-150`}
        >
          {/* Panel Header */}
          <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[var(--color-brand-800)]" />
              <h3 className="text-xs font-black tracking-wide text-slate-900 uppercase">
                {labels.title}
              </h3>
              {unreadCount > 0 && (
                <span className="bg-red-100 text-red-700 border border-red-200 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {unreadCount} {currentLocale === 'ar' ? 'جديد' : currentLocale === 'zh' ? '未读' : 'unread'}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-emerald-600 text-xs font-semibold flex items-center gap-1 transition-colors"
                  title={labels.markAllRead}
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action Simulation Bar */}
          <div className="bg-slate-100/70 border-b border-slate-200 px-3 py-1.5 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              {labels.simulate}:
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => simulateNotification('visa')}
                className="bg-white hover:bg-red-50 text-red-700 hover:text-red-800 border border-red-200 px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors shadow-2xs"
              >
                + Visa
              </button>
              <button
                onClick={() => simulateNotification('service')}
                className="bg-white hover:bg-blue-50 text-blue-700 hover:text-blue-800 border border-blue-200 px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors shadow-2xs"
              >
                + Service
              </button>
              <button
                onClick={() => simulateNotification('news')}
                className="bg-white hover:bg-amber-50 text-amber-700 hover:text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors shadow-2xs"
              >
                + News
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="bg-slate-50 border-b border-slate-200 p-1 flex items-center gap-1 overflow-x-auto text-xs">
            {[
              { id: 'all', label: labels.all },
              { id: 'visa', label: labels.visa },
              { id: 'service', label: labels.services },
              { id: 'news', label: labels.news },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`flex-1 min-w-max py-1 px-2.5 rounded text-[11px] font-bold transition-all text-center ${
                  activeCategory === tab.id
                    ? 'bg-[var(--color-brand-800)] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <Bell className="w-8 h-8 mx-auto opacity-30 stroke-1" />
                <p className="text-xs font-medium">{labels.empty}</p>
              </div>
            ) : (
              filteredNotifications.map((n) => {
                const loc = (currentLocale || 'en') as keyof typeof n.title;
                const title = n.title[loc] || n.title.en;
                const message = n.message[loc] || n.message.en;

                return (
                  <div
                    key={n.id}
                    onClick={() => handleNotificationClick(n)}
                    className={`p-3 transition-colors cursor-pointer flex items-start gap-3 group relative ${
                      !n.isRead
                        ? 'bg-red-50/40 hover:bg-red-50/70 border-s-4 border-[var(--color-brand-800)]'
                        : 'hover:bg-slate-50 opacity-90 hover:opacity-100'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 shrink-0 mt-0.5">
                      {getCategoryIcon(n.category)}
                    </div>

                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          {n.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 shrink-0">
                          <Clock className="w-2.5 h-2.5" />
                          {formatTimeAgo(n.timestamp)}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-red-700 transition-colors line-clamp-1">
                        {title}
                      </h4>

                      <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5 leading-relaxed">
                        {message}
                      </p>

                      {n.referenceId && (
                        <div className="mt-1 flex items-center gap-1">
                          <span className="bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[9px] px-1.5 py-0.2 rounded">
                            {n.referenceId}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Clear Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearNotification(n.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-600 hover:bg-slate-200 rounded transition-all"
                      title="Delete notification"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Panel Footer */}
          {notifications.length > 0 && (
            <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
              <button
                onClick={clearAll}
                className="text-slate-500 hover:text-red-700 font-semibold flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-slate-200"
              >
                <Trash2 className="w-3 h-3" />
                <span>{labels.clearAll}</span>
              </button>

              <span className="text-[10px] text-slate-500 font-mono">
                {notifications.length} {notifications.length === 1 ? 'alert' : 'alerts'}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
