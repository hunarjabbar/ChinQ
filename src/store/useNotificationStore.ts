import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LocalizedString {
  en: string;
  ar: string;
  zh: string;
  ckb: string;
}

export type NotificationCategory = 'visa' | 'service' | 'news' | 'system';
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface AppNotification {
  id: string;
  category: NotificationCategory;
  type: NotificationType;
  title: LocalizedString;
  message: LocalizedString;
  timestamp: string; // ISO string
  isRead: boolean;
  referenceId?: string;
  link?: string;
}

interface NotificationState {
  notifications: AppNotification[];
  activeToast: AppNotification | null;
  unreadCount: number;

  // Actions
  addNotification: (item: {
    category: NotificationCategory;
    type?: NotificationType;
    title: LocalizedString | string;
    message: LocalizedString | string;
    referenceId?: string;
    link?: string;
    showToast?: boolean;
  }) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAll: () => void;
  dismissToast: () => void;
  simulateNotification: (category?: NotificationCategory) => void;
}

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    category: 'visa',
    type: 'info',
    title: {
      en: 'Visa Status Updated (Ref: VC-2026-481920)',
      ar: 'تحديث حالة طلب التأشيرة (مرجع: VC-2026-481920)',
      zh: '签证状态更新 (单号: VC-2026-481920)',
      ckb: 'نوێکردنەوەی دۆخی ڤیزا (کۆد: VC-2026-481920)',
    },
    message: {
      en: 'Commercial invitation letter verified by the Consulate General in Erbil. Status moved to Compliance Review.',
      ar: 'تمت الموافقة على كتاب الدعوة التجاري من القنصلية العامة في أربيل. تم نقل الطلب إلى مرحلة التدقيق.',
      zh: '商业邀请函已通过驻埃尔比勒总领馆审核，申请状态已更新为合规复核中。',
      ckb: 'نامەی بانگهێشتی بازرگانی لەلایەن کونسوڵگەریی لە هەولێر پشکنرا. داواکارییەکە چووە قۆناغی پێداچوونەوە.',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    isRead: false,
    referenceId: 'VC-2026-481920',
    link: '/institute/visa-tracking',
  },
  {
    id: 'notif-2',
    category: 'service',
    type: 'success',
    title: {
      en: 'Service Request Assigned (Ref: SR-2026-90412)',
      ar: 'تم تعيين طلب الخدمة (مرجع: SR-2026-90412)',
      zh: '主权服务对接已受理 (单号: SR-2026-90412)',
      ckb: 'داواکاری خزمەتگوزاری وەرگیرا (کۆد: SR-2026-90412)',
    },
    message: {
      en: 'Industrial Sourcing & Quality Inspection dossier assigned to Senior Protocol Specialist in Beijing.',
      ar: 'تم تعيين ملف التوريد الصناعي وفحص الجودة لأخصائي البروتوكول التجاري في بكين.',
      zh: '您的工业品直采与品质验厂对接服务已分配给北京高级协议官员跟进。',
      ckb: 'داواکاری دابینکردنی پیشەسازی بۆ ئەفسەری بەرپرس لە پەکین ڕەوانەکرا.',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 1.5 hrs ago
    isRead: false,
    referenceId: 'SR-2026-90412',
    link: '/institute/services',
  },
  {
    id: 'notif-3',
    category: 'news',
    type: 'warning',
    title: {
      en: 'Breaking Intelligence Dispatch',
      ar: 'إحاطة إعلامية عاجلة',
      zh: '突发双边战略情报播报',
      ckb: 'هەواڵی بەپەلەی ئابووری',
    },
    message: {
      en: 'Direct IQD-CNY bilateral currency clearing corridor operational for major sovereign development road projects.',
      ar: 'تفعيل ممر المقاصة المباشرة بين الدينار العراقي واليوان الصيني لمشاريع البنية التحتية لممر التنمية.',
      zh: '中伊跨境直接本币结算通道正式进入全负荷双向测试阶段，优先保障发展之路基建。',
      ckb: 'دەستپێکردنی قۆناغی یەکەمی ئاڵوگۆڕی راستەوخۆی دراوی دینار و یوان بۆ پرۆژەکانی ژێرخان.',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hrs ago
    isRead: true,
    link: '/',
  },
  {
    id: 'notif-4',
    category: 'visa',
    type: 'success',
    title: {
      en: 'Entry Approval Barcode Issued (Ref: VC-2026-729410)',
      ar: 'تم صدور موافقة الدخول والبارکود (مرجع: VC-2026-729410)',
      zh: '入境安全批文与条码已签发 (单号: VC-2026-729410)',
      ckb: 'مۆڵەتی هاتنەناوەوە پەسەندکرا (کۆد: VC-2026-729410)',
    },
    message: {
      en: 'Iraqi MOI entry clearance barcode issued. Download your clearance pass before departure.',
      ar: 'تم إصدار موافقة وزارة الداخلية العراقية وبارکود الدخول. يمكنك تحميل كتاب الموافقة الآن.',
      zh: '伊拉克内政部入境安全许可与二维条码已生成，请在登机前在跟踪门户打印。',
      ckb: 'کارت و بارکۆدی هاتنەناوەوە دەرچوو. دەتوانی لە پۆرتالەکە دایبەزێنیت.',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 1440).toISOString(), // 1 day ago
    isRead: true,
    referenceId: 'VC-2026-729410',
    link: '/institute/visa-tracking',
  },
];

function toLocalizedString(val: LocalizedString | string): LocalizedString {
  if (typeof val === 'string') {
    return { en: val, ar: val, zh: val, ckb: val };
  }
  return val;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: INITIAL_NOTIFICATIONS,
      activeToast: null,
      unreadCount: INITIAL_NOTIFICATIONS.filter((n) => !n.isRead).length,

      addNotification: ({ category, type = 'info', title, message, referenceId, link, showToast = true }) => {
        const id = `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const newNotif: AppNotification = {
          id,
          category,
          type,
          title: toLocalizedString(title),
          message: toLocalizedString(message),
          timestamp: new Date().toISOString(),
          isRead: false,
          referenceId,
          link,
        };

        set((state) => {
          const updated = [newNotif, ...state.notifications];
          return {
            notifications: updated,
            unreadCount: updated.filter((n) => !n.isRead).length,
            activeToast: showToast ? newNotif : state.activeToast,
          };
        });
      },

      markAsRead: (id) => {
        set((state) => {
          const updated = state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          );
          return {
            notifications: updated,
            unreadCount: updated.filter((n) => !n.isRead).length,
          };
        });
      },

      markAllAsRead: () => {
        set((state) => {
          const updated = state.notifications.map((n) => ({ ...n, isRead: true }));
          return {
            notifications: updated,
            unreadCount: 0,
          };
        });
      },

      clearNotification: (id) => {
        set((state) => {
          const updated = state.notifications.filter((n) => n.id !== id);
          return {
            notifications: updated,
            unreadCount: updated.filter((n) => !n.isRead).length,
            activeToast: state.activeToast?.id === id ? null : state.activeToast,
          };
        });
      },

      clearAll: () => {
        set({
          notifications: [],
          unreadCount: 0,
          activeToast: null,
        });
      },

      dismissToast: () => {
        set({ activeToast: null });
      },

      simulateNotification: (category = 'visa') => {
        const randRef = `VC-2026-${Math.floor(100000 + Math.random() * 900000)}`;
        const presets: Record<NotificationCategory, {
          title: LocalizedString;
          message: LocalizedString;
          type: NotificationType;
          link: string;
        }> = {
          visa: {
            type: 'success',
            title: {
              en: `Visa Clearance Update (${randRef})`,
              ar: `تحديث الموافقة القنصلية (${randRef})`,
              zh: `领事签证审批状态变更 (${randRef})`,
              ckb: `نوێکردنەوەی مۆڵەتی ڤیزا (${randRef})`,
            },
            message: {
              en: 'Your passport application has passed secondary security screening and is ready for collection.',
              ar: 'اجتاوز ملف التأشيرة الفحص الأمني الثانوي وهو جاهز للاستلام والتصديق.',
              zh: '您的签证卷宗已通过二次安全审查，批文与签发结果已就绪。',
              ckb: 'دۆسیەی ڤیزاکەت پشکنینی ئاسایشی تێپەڕاند و ئامادەیە.',
            },
            link: '/institute/visa-tracking',
          },
          service: {
            type: 'info',
            title: {
              en: 'Enterprise Advisory Consultation Scheduled',
              ar: 'تم تحديد موعد الجلسة الاستشارية للشركات',
              zh: '跨国企业双边投资咨询对接已排期',
              ckb: 'کاتژمێری کۆبوونەوەی راوێژکاری دیاریکرا',
            },
            message: {
              en: 'CISE Institutional Trade Officer scheduled your bilateral video consultation for tomorrow at 10:00 AM.',
              ar: 'قام مسؤول التجارة بالمعهد بتحديد موعد الاجتماع الافتراضي لمناقشة العقود يوم غد الساعة 10:00 صباحاً.',
              zh: '研究所贸易合规官已为您排定明日上午10:00的双边项目线上研讨会。',
              ckb: 'بەرپرسی بازرگانی پەیمانگا کاتی کۆبوونەوەی ئۆنلاینی دیاریکرد.',
            },
            link: '/institute/services',
          },
          news: {
            type: 'warning',
            title: {
              en: 'New Bilateral Policy Analysis Published',
              ar: 'تم نشر دراسة استراتيجية جديدة',
              zh: '发布最新中伊双边合作政策研报',
              ckb: 'توێژینەوەیەکی نوێی ئابووری بڵاوکرایەوە',
            },
            message: {
              en: 'New CISE research paper on oil-for-reconstruction mechanisms published in the Newsroom.',
              ar: 'تم نشر ورقة بحثية جديدة حول آليات النفط مقابل الإعمار في غرفة تحليلات المعهد.',
              zh: '研究所最新发布的《石油换重建机制深度评估报告》已上架新闻中心。',
              ckb: 'توێژینەوەی نوێ لەسەر نەوت بەرامبەر ئاوەدانکردنەوە بڵاوکرایەوە.',
            },
            link: '/',
          },
          system: {
            type: 'info',
            title: {
              en: 'CISE Gateway Maintenance Notice',
              ar: 'تنويه صيانة منصة المعهد',
              zh: '双边数据中枢例行维护通知',
              ckb: 'ئاگاداریی چاکسازی لە سیستەم',
            },
            message: {
              en: 'Scheduled settlement gateway maintenance tonight from 02:00 to 03:00 GMT.',
              ar: 'صيانة مجدولة لبوابة التسوية المالية الليلة من الساعة 02:00 إلى 03:00 بتوقيت غرينتش.',
              zh: '跨境结算网关将于今晚 02:00 至 03:00 进行例行性能升级与安全加固。',
              ckb: 'چاکسازی لە سیستەمی ئاڵوگۆڕی دارایی ئەنجام دەدرێت.',
            },
            link: '/settlement',
          },
        };

        const preset = presets[category];
        get().addNotification({
          category,
          type: preset.type,
          title: preset.title,
          message: preset.message,
          referenceId: randRef,
          link: preset.link,
          showToast: true,
        });
      },
    }),
    {
      name: 'cises_notifications_store_v1',
    }
  )
);
