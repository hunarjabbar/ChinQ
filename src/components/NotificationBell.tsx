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
  CheckCheck,
  Trash2,
  Shield,
  FileText,
  Radio,
  Info,
  X,
  Clock,
  Activity,
  CheckCircle2,
  Server,
  CreditCard,
  Building2,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface NotificationBellProps {
  currentLocale: Locale;
  variant?: 'default' | 'header';
}

type ActiveTab = 'notifications' | 'status';

interface SystemStatusItem {
  id: string;
  name: Record<Locale, string>;
  category: string;
  status: 'operational' | 'active' | 'scheduled';
  statusText: Record<Locale, string>;
  detail: Record<Locale, string>;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  metric: string;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({
  currentLocale,
  variant = 'default',
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('notifications');
  const [activeCategory, setActiveCategory] = useState<'all' | NotificationCategory>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAll,
  } = useNotificationStore();

  const isAr = currentLocale === 'ar';
  const isZh = currentLocale === 'zh';
  const isCkb = currentLocale === 'ckb';
  const isRtl = isAr || isCkb;

  // Coordination: Listen for external close events (e.g. when search opens)
  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    window.addEventListener('close-header-notifications', handleClose);
    return () => window.removeEventListener('close-header-notifications', handleClose);
  }, []);

  // When opening, notify other header dropdowns (like search) to close
  const toggleOpen = () => {
    if (!isOpen) {
      window.dispatchEvent(new CustomEvent('close-header-search'));
    }
    setIsOpen(!isOpen);
  };

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filteredNotifications = notifications.filter((n) => {
    if (activeCategory === 'all') return true;
    return n.category === activeCategory;
  });

  const getCategoryIcon = (category: NotificationCategory) => {
    switch (category) {
      case 'visa':
        return <Shield className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />;
      case 'service':
        return <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
      case 'news':
        return <Radio className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />;
      default:
        return <Info className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  const formatTimeAgo = (isoString: string) => {
    const now = new Date();
    const past = new Date(isoString);
    const diffMs = Math.max(0, now.getTime() - past.getTime());
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) {
      return isAr ? 'الآن' : isZh ? '刚刚' : isCkb ? 'ئێستا' : 'Just now';
    }
    if (diffMins < 60) {
      return isAr ? `منذ ${diffMins} د` : isZh ? `${diffMins}分钟前` : isCkb ? `پێش ${diffMins} خولەک` : `${diffMins}m ago`;
    }
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) {
      return isAr ? `منذ ${diffHours} س` : isZh ? `${diffHours}小时前` : isCkb ? `پێش ${diffHours} کاتژمێر` : `${diffHours}h ago`;
    }
    const diffDays = Math.floor(diffHours / 24);
    return isAr ? `منذ ${diffDays} يوم` : isZh ? `${diffDays}天前` : isCkb ? `پێش ${diffDays} ڕۆژ` : `${diffDays}d ago`;
  };

  const handleNotificationClick = (n: AppNotification) => {
    markAsRead(n.id);
    setIsOpen(false);
    if (n.link) {
      navigate(n.link);
    }
  };

  // Real Bilateral Operational Systems Status Data
  const systemsStatus: SystemStatusItem[] = [
    {
      id: 'currency-rail',
      name: {
        en: 'Direct IQD / e-CNY Settlement Clearance',
        ar: 'مقاصة التسوية المباشرة للدينار واليوان الرقمي',
        zh: '中伊数字第纳尔/数字人民币直接结算清算轨道',
        ckb: 'سیستەمی یەکلاکردنەوەی دینار و یوان',
      },
      category: 'Financial Rail',
      status: 'operational',
      statusText: {
        en: '100% Operational',
        ar: 'يعمل بكامل الكفاءة',
        zh: '全线正常运行',
        ckb: 'بە تەواوی کارایە',
      },
      detail: {
        en: 'CBI & PBOC bilateral cross-border liquidity channel online · 24/7 clearing active',
        ar: 'قناة السيولة الثنائية المشتركة بين البنكين المركزيين تعمل على مدار الساعة',
        zh: '中伊两国央行双边流动性通道畅通，全天候跨境清算进行中',
        ckb: 'کەناڵی نەختینەیی نێوان هەردوو بانکی ناوەندی بەردەوامە',
      },
      icon: CreditCard,
      metric: '99.99% Uptime',
    },
    {
      id: 'diplomatic-wire',
      name: {
        en: 'Official Sovereign Diplomatic Wire',
        ar: 'سلك الأخبار الدبلوماسية السيادي الرسمي',
        zh: '官方双边主权外交新闻电讯传输网',
        ckb: 'تێلیگرافی فەرمی دیپلۆماسی',
      },
      category: 'Media Wire',
      status: 'operational',
      statusText: {
        en: 'Active 24/7',
        ar: 'بث مباشر متواصل',
        zh: '全天候发稿',
        ckb: '٢٤ کاتژمێر چالاکە',
      },
      detail: {
        en: 'Correspondent nodes verified in Baghdad, Beijing & Erbil · Latency 42ms',
        ar: 'مكاتب المراسلة في بغداد وبكين وأربيل متصلة وموثقة مباشرة',
        zh: '巴格达、北京、埃尔比勒三地采编节点连通，延迟 42ms',
        ckb: 'نووسینگەکانی بەغدا، پەکین و هەولێر بەستراونەتەوە',
      },
      icon: Radio,
      metric: '0.04s latency',
    },
    {
      id: 'consular-processing',
      name: {
        en: 'Commercial Visa & Consular Portal',
        ar: 'بوابة التأشيرات التجارية والخدمات القنصلية',
        zh: '商业领事签证与综合官方服务通道',
        ckb: 'دەروازەی ڤیزای بازرگانی و کونسوڵگەری',
      },
      category: 'Consular',
      status: 'operational',
      statusText: {
        en: 'Normal Processing',
        ar: 'معالجة منتظمة',
        zh: '审核签发正常',
        ckb: 'ڕێکاری ئاسایی',
      },
      detail: {
        en: 'Diplomatic and business delegations priority lanes operating normally',
        ar: 'المسار السريع للوفود الدبلوماسية والتجارية يعمل بالوتيرة المقررة',
        zh: '政务与经贸代表团优先审批通道顺畅运作中',
        ckb: 'هێڵی خێرای شاندە بازرگانی و دیپلۆماسییەکان کارایە',
      },
      icon: Shield,
      metric: 'Active',
    },
    {
      id: 'summit-registry',
      name: {
        en: 'Sulaymaniyah Partnership Summit 2026',
        ar: 'منظومة تسجيل قمة السليمانية 2026',
        zh: '2026 苏莱曼尼亚双边峰会注册服务系统',
        ckb: 'تۆمارکردنی لووتکەی سلێمانی ٢٠٢٦',
      },
      category: 'Summit',
      status: 'operational',
      statusText: {
        en: 'Registration Open',
        ar: 'التسجيل متاح',
        zh: '开放代表登记',
        ckb: 'تۆمارکردن کراوەیە',
      },
      detail: {
        en: 'Sector pavilions allocation and enterprise matchmaking portal active',
        ar: 'توزيع الأجنحة القطاعية والتوفيق بين الشركات يعمل بكفاءة',
        zh: '展区展位分配及政企项目撮合系统已就绪',
        ckb: 'دابەشکردنی باڤیلیۆنەکان و کۆبوونەوەکان کارایە',
      },
      icon: Calendar,
      metric: 'Stage 1 Open',
    },
    {
      id: 'infrastructure-telemetry',
      name: {
        en: 'Belt & Road / Dry Canal Telemetry',
        ar: 'مؤشرات مسار الحزام والطريق والقناة الجافة',
        zh: '一带一路与“发展之路”干线基础设施监测',
        ckb: 'چاودێری ژێرخانی ڕێگای ئاوریشم',
      },
      category: 'Megaprojects',
      status: 'operational',
      statusText: {
        en: 'Monitoring Live',
        ar: 'رصد حي ومباشر',
        zh: '数据实时回传',
        ckb: 'چاودێری ڕاستەوخۆ',
      },
      detail: {
        en: 'Al Faw Grand Port terminal and railway corridor construction telemetry normal',
        ar: 'أجهزة قياس الأعمال الإنشائية في ميناء الفاو وطريق التنمية متصلة',
        zh: '法奥港深水码头与干线铁路施工数据传输正常',
        ckb: 'داتای بنیاتنانی بەندەری فاو بە ڕاستەوخۆ دەگات',
      },
      icon: Building2,
      metric: '100% Sensors',
    },
  ];

  return (
    <div className="relative inline-block text-start" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <button
        onClick={toggleOpen}
        className={`relative p-2 rounded-xl transition-all focus:outline-none cursor-pointer flex items-center justify-center ${
          variant === 'header'
            ? 'bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white shadow-xs'
            : 'bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-700 dark:text-neutral-200 hover:bg-slate-200 dark:hover:bg-neutral-700'
        }`}
        title={
          isAr
            ? 'مركز الإشعارات وحالة الأنظمة السيادية'
            : isZh
            ? '通知与双边系统状态中心'
            : isCkb
            ? 'ناوەندی ئاگاداری و دۆخی سیستەم'
            : 'Notification & Status Center'
        }
        aria-label="Notification & Status Center"
      >
        <Bell className={`w-4 h-4 ${variant === 'header' ? 'text-white' : 'text-slate-700 dark:text-neutral-200'}`} />

        {/* Unread Count Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-red-600 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse border border-red-600/20">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* REFINED GLASS NOTIFICATION & STATUS CENTER PANEL */}
      {isOpen && (
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          className={`absolute ${
            isRtl ? 'left-0 sm:left-auto sm:right-0' : 'right-0 sm:right-auto sm:left-auto right-0'
          } mt-2.5 w-[calc(100vw-2rem)] sm:w-[420px] max-w-[420px] bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-neutral-700/80 text-slate-900 dark:text-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-150`}
        >
          {/* Panel Header */}
          <div className="p-3.5 bg-slate-50/90 dark:bg-neutral-850/90 border-b border-slate-100 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-red-100/80 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                <Activity size={15} />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-black tracking-wide text-slate-900 dark:text-white uppercase truncate">
                  {isAr
                    ? 'مركز الإشعارات وحالة الأنظمة'
                    : isZh
                    ? '通知与双边系统状态中心'
                    : isCkb
                    ? 'ناوەندی ئاگاداری و دۆخی سیستەم'
                    : 'Notification & Status Center'}
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span>
                    {isAr
                      ? 'كافة المنصات تعمل بكفاءة'
                      : isZh
                      ? '全部双边系统运行正常'
                      : isCkb
                      ? 'هەموو سیستەمەکان چالاکن'
                      : 'All Bilateral Systems Operational'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0 ms-2">
              {unreadCount > 0 && activeTab === 'notifications' && (
                <button
                  onClick={markAllAsRead}
                  className="p-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-neutral-750 text-slate-500 dark:text-neutral-400 hover:text-emerald-600 transition-colors"
                  title={isAr ? 'تحديد الكل كمقروء' : isZh ? '全部标记已读' : 'Mark all as read'}
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-neutral-750 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Segmented Top Tabs: Notifications vs Systems Status */}
          <div className="p-1.5 bg-slate-100/80 dark:bg-neutral-800/60 border-b border-slate-100 dark:border-neutral-800 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('notifications')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'notifications'
                  ? 'bg-white dark:bg-neutral-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <Bell size={13} className={activeTab === 'notifications' ? 'text-red-600' : ''} />
              <span>
                {isAr ? 'التنبيهات الدبلوماسية' : isZh ? '外交通知' : isCkb ? 'ئاگادارییەکان' : 'Dispatches & Alerts'}
              </span>
              {unreadCount > 0 && (
                <span className="ms-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-black bg-red-600 text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('status')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'status'
                  ? 'bg-white dark:bg-neutral-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <Server size={13} className={activeTab === 'status' ? 'text-emerald-600' : ''} />
              <span>
                {isAr ? 'الحالة التشغيلية' : isZh ? '系统运行状态' : isCkb ? 'دۆخی سیستەم' : 'Systems Health'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ms-1 shrink-0" />
            </button>
          </div>

          {/* TAB 1: NOTIFICATIONS CONTENT */}
          {activeTab === 'notifications' && (
            <div>
              {/* Category Filter Chips */}
              <div className="px-3 py-2 border-b border-slate-100 dark:border-neutral-800/80 flex items-center gap-1 overflow-x-auto text-xs">
                {[
                  { id: 'all', label: isAr ? 'الكل' : isZh ? '全部' : isCkb ? 'هەموو' : 'All' },
                  { id: 'visa', label: isAr ? 'التأشيرات' : isZh ? '领事签证' : isCkb ? 'ڤیزا' : 'Visa' },
                  { id: 'service', label: isAr ? 'الخدمات' : isZh ? '机构服务' : isCkb ? 'خزمەتگوزاری' : 'Services' },
                  { id: 'news', label: isAr ? 'الأخبار' : isZh ? '双边电讯' : isCkb ? 'هەواڵ' : 'News' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id as any)}
                    className={`py-0.5 px-2.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
                      activeCategory === tab.id
                        ? 'bg-red-600 text-white shadow-2xs'
                        : 'text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Notification Items List */}
              <div className="max-h-[320px] overflow-y-auto divide-y divide-slate-100 dark:divide-neutral-800/60">
                {filteredNotifications.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 dark:text-neutral-500 space-y-2">
                    <Bell className="w-7 h-7 mx-auto opacity-30 stroke-1" />
                    <p className="text-xs font-medium">
                      {isAr ? 'لا توجد إشعارات جديدة حالياً' : isZh ? '暂无任何最新通知' : 'No notifications available'}
                    </p>
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
                        className={`p-3 transition-all cursor-pointer flex items-start gap-2.5 group relative ${
                          !n.isRead
                            ? 'bg-red-50/40 dark:bg-red-950/20 hover:bg-red-50/70 dark:hover:bg-red-950/30 border-s-3 border-red-600'
                            : 'hover:bg-slate-50/70 dark:hover:bg-neutral-800/40 opacity-90 hover:opacity-100'
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 shrink-0 mt-0.5">
                          {getCategoryIcon(n.category)}
                        </div>

                        <div className="flex-1 min-w-0 pr-1 text-start">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-neutral-400">
                              {n.category}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 shrink-0">
                              <Clock className="w-2.5 h-2.5" />
                              {formatTimeAgo(n.timestamp)}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors line-clamp-1">
                            {title}
                          </h4>

                          <p className="text-[11px] text-slate-500 dark:text-neutral-400 line-clamp-2 mt-0.5 leading-relaxed">
                            {message}
                          </p>

                          {n.referenceId && (
                            <div className="mt-1 flex items-center gap-1">
                              <span className="bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-600 dark:text-neutral-300 font-mono text-[9px] px-1.5 py-0.2 rounded">
                                {n.referenceId}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Individual Delete Action */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            clearNotification(n.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-600 rounded transition-all cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Panel Footer */}
              {notifications.length > 0 && (
                <div className="p-2.5 bg-slate-50/80 dark:bg-neutral-850/80 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                  <button
                    onClick={clearAll}
                    className="text-slate-500 hover:text-red-600 font-bold flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-slate-200/60 dark:hover:bg-neutral-750 text-[11px] cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>{isAr ? 'مسح الكل' : isZh ? '清空' : 'Clear all'}</span>
                  </button>

                  <span className="text-[10px] text-slate-400 font-mono">
                    {notifications.length} {notifications.length === 1 ? 'alert' : 'alerts'}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SOVEREIGN SYSTEMS HEALTH STATUS */}
          {activeTab === 'status' && (
            <div className="p-2.5 space-y-2 max-h-[350px] overflow-y-auto">
              {systemsStatus.map((sys) => {
                const Icon = sys.icon;
                return (
                  <div
                    key={sys.id}
                    className="p-2.5 rounded-xl border border-slate-100 dark:border-neutral-800 bg-slate-50/60 dark:bg-neutral-850/60 hover:bg-slate-100/60 dark:hover:bg-neutral-800/60 transition-all text-start"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-md bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 flex items-center justify-center text-slate-700 dark:text-neutral-200 shrink-0">
                          <Icon size={13} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {sys.name[currentLocale] || sys.name.en}
                        </h4>
                      </div>

                      <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold font-mono shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{sys.statusText[currentLocale] || sys.statusText.en}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-neutral-400 leading-relaxed ps-8">
                      {sys.detail[currentLocale] || sys.detail.en}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-200/60 dark:border-neutral-800/80 text-[10px] font-mono text-slate-400 ps-8">
                      <span>{sys.category}</span>
                      <span className="font-bold text-slate-600 dark:text-neutral-300">{sys.metric}</span>
                    </div>
                  </div>
                );
              })}

              <div className="pt-2 text-center text-[10px] font-mono text-slate-400 flex items-center justify-center gap-1.5">
                <CheckCircle2 size={12} className="text-emerald-500" />
                <span>
                  {isAr
                    ? 'جميع الخوادم والمقاصات متصلة بالشبكة الثنائية'
                    : isZh
                    ? '双边主权服务群组均已连接并通过全密级安全认证'
                    : 'All bilateral nodes verified & operational'}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
