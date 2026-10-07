import { create } from 'zustand';
import { NavigationItem, NavigationMutationPayload, NavigationSection } from '../types/navigation';

export const INITIAL_NAVIGATION_ITEMS: NavigationItem[] = [
  // ================= HEADER ITEMS =================
  {
    id: 'nav_hdr_newsroom',
    section: 'header',
    label: { en: 'Newsroom', ar: 'غرفة الأخبار', zh: '新闻中心', ckb: 'ژووری هەواڵ' },
    slug: 'newsroom',
    href: '/newsroom',
    icon: 'Newspaper',
    displayOrder: 1,
    status: 'active',
    portal: 'newsroom',
    requiredScope: 'public',
  },
  {
    id: 'nav_hdr_live',
    section: 'header',
    label: { en: 'Live Portal', ar: 'البث المباشر', zh: '在线直播', ckb: 'پەخشی زیندوو' },
    slug: 'live',
    href: '/live',
    icon: 'Radio',
    displayOrder: 2,
    status: 'active',
    portal: 'live',
    requiredScope: 'public',
    isLive: true,
  },
  {
    id: 'nav_hdr_media',
    section: 'header',
    label: { en: 'Media Hub', ar: 'المركز الإعلامي', zh: '融媒体中心', ckb: 'ناوەندی میدیا' },
    slug: 'media',
    href: '/media',
    icon: 'Film',
    displayOrder: 3,
    status: 'active',
    portal: 'media-hub',
    requiredScope: 'public',
  },
  {
    id: 'nav_hdr_settlement',
    section: 'header',
    label: { en: 'Settlement', ar: 'تسوية المدفوعات', zh: '本币结算', ckb: 'پاکتاوی دراوەکان' },
    slug: 'settlement',
    href: '/settlement',
    icon: 'CreditCard',
    displayOrder: 4,
    status: 'active',
    portal: 'settlement',
    requiredScope: 'public',
  },
  {
    id: 'nav_hdr_institute',
    section: 'header',
    label: { en: 'Institute', ar: 'المعهد الاستراتيجي', zh: '战略研究所', ckb: 'پەیمانگای ستراتیژی' },
    slug: 'institute',
    href: '/institute',
    icon: 'Building2',
    displayOrder: 5,
    status: 'active',
    portal: 'cise',
    requiredScope: 'public',
  },
  {
    id: 'nav_hdr_summit',
    section: 'header',
    label: { en: 'Summit & Expo', ar: 'القمة والمعرض', zh: '经贸峰会', ckb: 'لووتکە و پێشانگا' },
    slug: 'summit',
    href: '/summit',
    icon: 'CalendarDays',
    displayOrder: 6,
    status: 'active',
    portal: 'summit',
    requiredScope: 'public',
  },
  {
    id: 'nav_hdr_hub',
    section: 'header',
    label: { en: 'Command Hub', ar: 'مركز القيادة', zh: '指挥中枢', ckb: 'ناوەندی کۆنتڕۆڵ' },
    slug: 'hub',
    href: '/hub',
    icon: 'Sparkles',
    displayOrder: 7,
    status: 'active',
    portal: 'cise',
    requiredScope: 'editor',
  },

  // ================= FOOTER - ABOUT =================
  {
    id: 'nav_ftr_about_ica',
    section: 'footer',
    column: 'about',
    label: { en: 'About ICA Agency', ar: 'حول الوكالة العراقية الصينية', zh: '关于伊中通讯社', ckb: 'دەربارەی ئاژانسی عێراقی-چینی' },
    slug: 'about',
    href: '/about',
    displayOrder: 1,
    status: 'active',
    portal: 'ica-public',
  },
  {
    id: 'nav_ftr_charter',
    section: 'footer',
    column: 'about',
    label: { en: 'Sovereign Charter', ar: 'الميثاق السيادي التأسيسي', zh: '主权宪章与宗旨', ckb: 'پەیڕەوی سەروەری دامەزراندن' },
    slug: 'charter',
    href: '/institute/about',
    displayOrder: 2,
    status: 'active',
    portal: 'cise',
  },
  {
    id: 'nav_ftr_partners',
    section: 'footer',
    column: 'about',
    label: { en: 'Strategic Partners', ar: 'الشركاء الاستراتيجيون', zh: '战略合作伙伴名录', ckb: 'هاوبەشە ستراتیژییەکان' },
    slug: 'partners',
    href: '/institute/partnerships',
    displayOrder: 3,
    status: 'active',
    portal: 'cise',
  },
  {
    id: 'nav_ftr_contact',
    section: 'footer',
    column: 'about',
    label: { en: 'Diplomatic Contact', ar: 'الاتصال الدبلوماسي والمقرات', zh: '外交联络与总处地址', ckb: 'پەیوەندی دیپلۆماسی و بارەگاکان' },
    slug: 'contact',
    href: '/contact',
    displayOrder: 4,
    status: 'active',
    portal: 'ica-public',
  },

  // ================= FOOTER - INITIATIVES =================
  {
    id: 'nav_ftr_init_settlement',
    section: 'footer',
    column: 'initiatives',
    label: { en: 'Payment Settlement (IQD/RMB)', ar: 'تسوية المدفوعات المباشرة (IQD/RMB)', zh: '本币直接结算清算中心', ckb: 'پاکتاوی دراوەکان (IQD/RMB)' },
    slug: 'settlement',
    href: '/settlement',
    displayOrder: 1,
    status: 'active',
    portal: 'settlement',
  },
  {
    id: 'nav_ftr_init_card',
    section: 'footer',
    column: 'initiatives',
    label: { en: 'Qi & ICA Co-Branded Card', ar: 'بطاقة كي وICA المشتركة للأعمال', zh: 'Qi & ICA 联名商务结算卡', ckb: 'کارتی هاوبەشی کی و ICA' },
    slug: 'card',
    href: '/settlement/card',
    displayOrder: 2,
    status: 'active',
    portal: 'settlement',
  },
  {
    id: 'nav_ftr_init_summit',
    section: 'footer',
    column: 'initiatives',
    label: { en: 'Economic Summit & Expo', ar: 'قمة ومعرض العراق والصين الاقتصادي', zh: '中伊经贸峰会与双边博览会', ckb: 'لووتکە و پێشانگای ئابووری' },
    slug: 'summit',
    href: '/summit',
    displayOrder: 3,
    status: 'active',
    portal: 'summit',
  },
  {
    id: 'nav_ftr_init_chinese_center',
    section: 'footer',
    column: 'initiatives',
    label: { en: 'Chinese Language Centre (HSK)', ar: 'المركز الصيني لتعليم اللغة (HSK)', zh: '伊拉克中文教育与HSK认证中心', ckb: 'ناوەندی زمانی چینی (HSK)' },
    slug: 'chinese-center',
    href: '/chinese-center',
    displayOrder: 4,
    status: 'active',
    portal: 'cise',
  },
  {
    id: 'nav_ftr_init_visa',
    section: 'footer',
    column: 'initiatives',
    label: { en: 'Bilateral Visa Facilitation Centre', ar: 'مركز تسهيل التأشيرات الثنائي', zh: '双边签证咨询与代办服务中心', ckb: 'ناوەندی وەرگرتنی ڤیزا' },
    slug: 'visa-centre',
    href: '/visa-centre',
    displayOrder: 5,
    status: 'active',
    portal: 'cise',
  },
  {
    id: 'nav_ftr_init_consultancy',
    section: 'footer',
    column: 'initiatives',
    label: { en: 'Strategic Legal & Financial Advisory', ar: 'الاستشارات المالية والقانونية السيادية', zh: '战略财务与法律合规咨询', ckb: 'ڕاوێژکاری دارایی و یاسایی' },
    slug: 'consultancy',
    href: '/consultancy',
    displayOrder: 6,
    status: 'active',
    portal: 'cise',
  },
  {
    id: 'nav_ftr_init_exchange',
    section: 'footer',
    column: 'initiatives',
    label: { en: 'Cultural & People-to-People Exchange', ar: 'التبادل الثقافي والشعبي الثنائي', zh: '中伊人文交流与学术使团项目', ckb: 'ئاڵوگۆڕی کەلتووری و زانستی' },
    slug: 'cultural-exchange',
    href: '/cultural-exchange',
    displayOrder: 7,
    status: 'active',
    portal: 'cise',
  },

  // ================= FOOTER - RESEARCH =================
  {
    id: 'nav_ftr_res_pillars',
    section: 'footer',
    column: 'research',
    label: { en: '4 Research Pillars', ar: 'المحاور البحثية الأربعة', zh: '四大核心研究支柱', ckb: 'چوار تەوەری توێژینەوە' },
    slug: 'research-pillars',
    href: '/institute/research',
    displayOrder: 1,
    status: 'active',
    portal: 'cise',
  },
  {
    id: 'nav_ftr_res_publications',
    section: 'footer',
    column: 'research',
    label: { en: 'Publications & Policy Briefs', ar: 'الأبحاث والتقارير الاستراتيجية', zh: '智库研究报告与政策专报', ckb: 'توێژینەوە و ڕاپۆرتەکان' },
    slug: 'publications',
    href: '/institute/publications',
    displayOrder: 2,
    status: 'active',
    portal: 'cise',
  },
  {
    id: 'nav_ftr_res_datahub',
    section: 'footer',
    column: 'research',
    label: { en: 'Bilateral Data Hub & Corridor Tracker', ar: 'مركز البيانات ومتابعة ممرات التنمية', zh: '双边经贸数据中心与走廊跟踪器', ckb: 'ناوەندی داتاکان و ڕێڕەوی گەشەپێدان' },
    slug: 'data-hub',
    href: '/institute/data-hub',
    displayOrder: 3,
    status: 'active',
    portal: 'cise',
  },
  {
    id: 'nav_ftr_res_experts',
    section: 'footer',
    column: 'research',
    label: { en: 'Distinguished Fellows & Experts', ar: 'دليل الخبراء والزملاء الباحثين', zh: '特聘学者与智库专家名录', ckb: 'شارەزایان و توێژەران' },
    slug: 'experts',
    href: '/institute/experts',
    displayOrder: 4,
    status: 'active',
    portal: 'cise',
  },

  // ================= FOOTER - MEDIA =================
  {
    id: 'nav_ftr_med_newsroom',
    section: 'footer',
    column: 'media',
    label: { en: 'ICA Newsroom & Press Wire', ar: 'غرفة الأخبار ووكالة الأنباء', zh: '新闻通讯社与权威电讯', ckb: 'ژووری هەواڵ و ئاژانس' },
    slug: 'newsroom',
    href: '/newsroom',
    displayOrder: 1,
    status: 'active',
    portal: 'newsroom',
  },
  {
    id: 'nav_ftr_med_live',
    section: 'footer',
    column: 'media',
    label: { en: 'Live Broadcast & Documentaries', ar: 'البث المباشر والوثائقيات', zh: '在线融媒直播与纪录片专区', ckb: 'پەخشی زیندوو و بەڵگەنامەیی' },
    slug: 'live',
    href: '/live',
    displayOrder: 2,
    status: 'active',
    portal: 'live',
  },
  {
    id: 'nav_ftr_med_icaplus',
    section: 'footer',
    column: 'media',
    label: { en: 'ICA+ Sovereign VIP Research', ar: 'منصة ICA+ للتحليلات الخاصة', zh: 'ICA+ 高端会员智库专享', ckb: 'ICA+ شیکارییە تایبەتەکان' },
    slug: 'ica-plus',
    href: '/media/ica-plus',
    displayOrder: 3,
    status: 'active',
    portal: 'ica-plus',
  },
  {
    id: 'nav_ftr_med_books',
    section: 'footer',
    column: 'media',
    label: { en: 'Sovereign Books & Academic Library', ar: 'المكتبة الأكاديمية والكتب السيادية', zh: '主权图书馆与经典学术著作', ckb: 'کتێبخانەی ئەکادیمی و سەروەری' },
    slug: 'books',
    href: '/books',
    displayOrder: 4,
    status: 'active',
    portal: 'ica-public',
  },

  // ================= FOOTER - LEGAL =================
  {
    id: 'nav_ftr_leg_privacy',
    section: 'footer',
    column: 'legal',
    label: { en: 'Privacy Rights Charter', ar: 'ميثاق الخصوصية وحماية البيانات', zh: '主权隐私权与数据保护宪章', ckb: 'پاراستنی مافی کەسی و داتاکان' },
    slug: 'privacy',
    href: '/privacy',
    displayOrder: 1,
    status: 'active',
    portal: 'ica-public',
  },
  {
    id: 'nav_ftr_leg_terms',
    section: 'footer',
    column: 'legal',
    label: { en: 'Terms of Strategic Engagement', ar: 'شروط الاستخدام والتعامل الاستراتيجي', zh: '双边战略合作服务条款', ckb: 'مەرجەکانی بەکارهێنان' },
    slug: 'terms',
    href: '/terms',
    displayOrder: 2,
    status: 'active',
    portal: 'ica-public',
  },
  {
    id: 'nav_ftr_leg_aml',
    section: 'footer',
    column: 'legal',
    label: { en: 'AML / KYC Compliance Framework', ar: 'سياسات الامتثال ومكافحة غسل الأموال', zh: '反洗钱与国际清算合规框架', ckb: 'پابەندبوون بە یاساکانی دارایی' },
    slug: 'compliance',
    href: '/settlement/compliance',
    displayOrder: 3,
    status: 'active',
    portal: 'settlement',
  },
  {
    id: 'nav_ftr_leg_registry',
    section: 'footer',
    column: 'legal',
    label: { en: 'Diplomatic Syndication Registration', ar: 'تسجيل واعتماد المؤسسات الإعلامية', zh: '官方外交与传媒互认登记核准', ckb: 'تۆمارکردنی فەرمی دیپلۆماسی' },
    slug: 'registry',
    href: '/institute/about',
    displayOrder: 4,
    status: 'active',
    portal: 'cise',
  },

  // ================= FOOTER - CONNECT =================
  {
    id: 'nav_ftr_con_newsletter',
    section: 'footer',
    column: 'connect',
    label: { en: 'Strategic Dispatches & Newsletter', ar: 'النشرة الاستراتيجية والبرقيات الدبلوماسية', zh: '战略简报与外交通讯快讯', ckb: 'نامەی ستراتیژی و دیپلۆماسی' },
    slug: 'newsletter',
    href: '#newsletter',
    displayOrder: 1,
    status: 'active',
    portal: 'ica-public',
  },
  {
    id: 'nav_ftr_con_pwa',
    section: 'footer',
    column: 'connect',
    label: { en: 'Install Sovereign PWA Mobile App', ar: 'تثبيت تطبيق الوكالة للهواتف (PWA)', zh: '安装移动端主权PWA官方应用', ckb: 'داگرتنی بەرنامەی فەرمی PWA' },
    slug: 'download-app',
    href: '#app-qr',
    displayOrder: 2,
    status: 'active',
    portal: 'ica-public',
  },
  {
    id: 'nav_ftr_con_telex',
    section: 'footer',
    column: 'connect',
    label: { en: 'Baghdad-Beijing Diplomatic Wire', ar: 'خط البرق الدبلوماسي بغداد - بكين', zh: '巴格达-北京专线外交通讯', ckb: 'هێڵی دیپلۆماسی بەغداد - پەکین' },
    slug: 'telex',
    href: 'tel:+96407735720984',
    displayOrder: 3,
    status: 'active',
    portal: 'ica-public',
  },

  // ================= COMMAND HUB SIDEBAR =================
  {
    id: 'nav_sb_dashboard',
    section: 'sidebar',
    label: { en: 'Dashboard Overview', ar: 'نظرة عامة على لوحة القيادة', zh: '中枢仪表盘总览', ckb: 'کورتەی ناوەندی کۆنتڕۆڵ' },
    slug: '',
    href: '/hub',
    icon: 'LayoutDashboard',
    displayOrder: 1,
    status: 'active',
    portal: 'cise',
    requiredScope: 'public',
  },
  {
    id: 'nav_sb_navigation',
    section: 'sidebar',
    label: { en: 'Navigation Architecture', ar: 'إدارة الروابط والملاحة', zh: '全局导航体系架构', ckb: 'بەڕێوەبردنی بەستەرەکان' },
    slug: 'navigation',
    href: '/hub/navigation',
    icon: 'Layers',
    displayOrder: 2,
    status: 'active',
    portal: 'cise',
    requiredScope: 'admin',
  },
  {
    id: 'nav_sb_institute',
    section: 'sidebar',
    label: { en: 'Institute & Studies', ar: 'المعهد والدراسات الاستراتيجية', zh: '研究院与学术成果', ckb: 'پەیمانگا و توێژینەوەکان' },
    slug: 'institute',
    href: '/hub/institute',
    icon: 'Building2',
    displayOrder: 3,
    status: 'active',
    portal: 'cise',
    requiredScope: 'editor',
  },
  {
    id: 'nav_sb_services',
    section: 'sidebar',
    label: { en: 'Bilateral Services', ar: 'الخدمات الثنائية والقمة', zh: '双边经贸专属服务', ckb: 'خزمەتگوزارییە دووقۆڵییەکان' },
    slug: 'services',
    href: '/hub/services',
    icon: 'Briefcase',
    displayOrder: 4,
    status: 'active',
    portal: 'cise',
    requiredScope: 'editor',
  },
  {
    id: 'nav_sb_submissions',
    section: 'sidebar',
    label: { en: 'Unified Inbox', ar: 'صندوق الطلبات الموحد', zh: '统一申请与审批收件箱', ckb: 'سندووقی داواکارییەکان' },
    slug: 'submissions',
    href: '/hub/submissions',
    icon: 'Inbox',
    displayOrder: 5,
    status: 'active',
    portal: 'cise',
    requiredScope: 'reviewer',
  },
  {
    id: 'nav_sb_ica_admin',
    section: 'sidebar',
    label: { en: 'ICA Portals Admin', ar: 'إدارة بوابات الوكالة الأربعة', zh: '通讯社四大门户管控', ckb: 'بەڕێوەبردنی دەروازەکان' },
    slug: 'ica-admin',
    href: '/hub/ica/public',
    icon: 'Globe',
    displayOrder: 6,
    status: 'active',
    portal: 'cise',
    requiredScope: 'editor',
  },
  {
    id: 'nav_sb_users',
    section: 'sidebar',
    label: { en: 'Users & Roles (RBAC)', ar: 'المستخدمون ومصفوفة الصلاحيات', zh: '用户管理与权限矩阵', ckb: 'بەکارهێنەران و ڕۆڵەکان' },
    slug: 'users',
    href: '/hub/users',
    icon: 'UserCheck',
    displayOrder: 7,
    status: 'active',
    portal: 'cise',
    requiredScope: 'superadmin',
  },
  {
    id: 'nav_sb_audit',
    section: 'sidebar',
    label: { en: 'Immutable Audit Log', ar: 'سجل التدقيق غير القابل للتعديل', zh: '不可篡改安全审计日志', ckb: 'تۆماری پشکنینی نەگۆڕ' },
    slug: 'audit',
    href: '/hub/audit',
    icon: 'Shield',
    displayOrder: 8,
    status: 'active',
    portal: 'cise',
    requiredScope: 'admin',
  },
  {
    id: 'nav_sb_analytics',
    section: 'sidebar',
    label: { en: 'Corridor Analytics', ar: 'تحليلات الممرات والزيارات', zh: '走廊宏观与流量分析', ckb: 'شیکاری ڕێڕەوەکان و داتاکان' },
    slug: 'analytics',
    href: '/hub/analytics',
    icon: 'BarChart3',
    displayOrder: 9,
    status: 'active',
    portal: 'cise',
    requiredScope: 'editor',
  },
  {
    id: 'nav_sb_system',
    section: 'sidebar',
    label: { en: 'System Health & Backup', ar: 'صحة النظام والنسخ الاحتياطي', zh: '系统健康与数据备份导出', ckb: 'تەندروستی سیستەم و پاشەکەوت' },
    slug: 'system',
    href: '/hub/system',
    icon: 'Server',
    displayOrder: 10,
    status: 'active',
    portal: 'cise',
    requiredScope: 'superadmin',
  },
];

interface NavigationState {
  items: NavigationItem[];
  isLoading: boolean;
  error: string | null;
  lastSyncedAt: string | null;
  
  // Queries
  getItemsBySection: (section: NavigationSection) => NavigationItem[];
  getHeaderItems: () => NavigationItem[];
  getFooterItems: (column?: 'about' | 'initiatives' | 'research' | 'media' | 'legal' | 'connect') => NavigationItem[];
  getSidebarItems: () => NavigationItem[];
  getMobileItems: () => NavigationItem[];
  
  // Actions
  addItem: (item: NavigationMutationPayload) => Promise<NavigationItem>;
  updateItem: (id: string, updates: Partial<NavigationMutationPayload>) => Promise<NavigationItem | null>;
  deleteItem: (id: string) => Promise<boolean>;
  softDeleteItem: (id: string) => Promise<boolean>;
  permanentDeleteItem: (id: string) => Promise<boolean>;
  restoreItem: (id: string) => Promise<boolean>;
  moveItem: (id: string, direction: 'up' | 'down') => Promise<void>;
  reorderItems: (section: NavigationSection, orderedIds: string[]) => Promise<void>;
  syncWithServer: () => Promise<void>;
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  items: INITIAL_NAVIGATION_ITEMS,
  isLoading: false,
  error: null,
  lastSyncedAt: null,

  getItemsBySection: (section: NavigationSection) => {
    return get().items
      .filter(item => item.section === section && item.status !== 'archived')
      .sort((a, b) => a.displayOrder - b.displayOrder);
  },

  getHeaderItems: () => {
    return get().getItemsBySection('header');
  },

  getFooterItems: (column) => {
    return get().items
      .filter(item => item.section === 'footer' && item.status !== 'archived' && (!column || item.column === column))
      .sort((a, b) => a.displayOrder - b.displayOrder);
  },

  getSidebarItems: () => {
    return get().getItemsBySection('sidebar');
  },

  getMobileItems: () => {
    const mobileSpecific = get().getItemsBySection('mobile');
    if (mobileSpecific.length > 0) return mobileSpecific;
    return get().getHeaderItems();
  },

  addItem: async (payload) => {
    const newItem: NavigationItem = {
      id: `nav_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      section: payload.section,
      parentId: payload.parentId || null,
      label: payload.label,
      slug: payload.slug,
      href: payload.href,
      icon: payload.icon || 'Link',
      displayOrder: payload.displayOrder ?? (get().items.filter(i => i.section === payload.section).length + 1),
      status: payload.status || 'active',
      portal: payload.portal || 'all',
      requiredScope: payload.requiredScope || 'public',
      column: payload.column,
      isExternal: payload.isExternal || false,
      badge: payload.badge,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    set(state => ({ items: [...state.items, newItem] }));

    try {
      await fetch('/api/hub/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
    } catch (e) {
      console.warn('Navigation server sync queued:', e);
    }

    return newItem;
  },

  updateItem: async (id, updates) => {
    let updatedItem: NavigationItem | null = null;
    set(state => {
      const newItems = state.items.map(item => {
        if (item.id === id) {
          updatedItem = {
            ...item,
            ...updates,
            updatedAt: new Date().toISOString()
          } as NavigationItem;
          return updatedItem;
        }
        return item;
      });
      return { items: newItems };
    });

    try {
      await fetch(`/api/hub/navigation/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch (e) {
      console.warn('Navigation update server sync queued:', e);
    }

    return updatedItem;
  },

  deleteItem: async (id) => {
    return get().softDeleteItem(id);
  },

  softDeleteItem: async (id) => {
    set(state => ({
      items: state.items.map(item => item.id === id ? { ...item, status: 'archived' } : item)
    }));

    try {
      await fetch(`/api/hub/navigation/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Navigation delete server sync queued:', e);
    }

    return true;
  },

  permanentDeleteItem: async (id) => {
    set(state => ({
      items: state.items.filter(item => item.id !== id)
    }));

    try {
      await fetch(`/api/hub/navigation/${id}?permanent=true`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Navigation permanent delete server sync queued:', e);
    }

    return true;
  },

  restoreItem: async (id) => {
    set(state => ({
      items: state.items.map(item => item.id === id ? { ...item, status: 'active' } : item)
    }));

    try {
      await fetch(`/api/hub/navigation/${id}/restore`, { method: 'POST' });
    } catch (e) {
      console.warn('Navigation restore server sync queued:', e);
    }

    return true;
  },

  moveItem: async (id, direction) => {
    const currentItems = [...get().items];
    const itemIndex = currentItems.findIndex(i => i.id === id);
    if (itemIndex === -1) return;

    const item = currentItems[itemIndex];
    const sectionItems = currentItems
      .filter(i => i.section === item.section)
      .sort((a, b) => a.displayOrder - b.displayOrder);

    const sectionIndex = sectionItems.findIndex(i => i.id === id);
    if (sectionIndex === -1) return;

    const targetSectionIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1;
    if (targetSectionIndex < 0 || targetSectionIndex >= sectionItems.length) return;

    // Swap displayOrder
    const targetItem = sectionItems[targetSectionIndex];
    const tempOrder = item.displayOrder;
    item.displayOrder = targetItem.displayOrder;
    targetItem.displayOrder = tempOrder;

    set({ items: [...currentItems] });

    try {
      await fetch(`/api/hub/navigation/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayOrder: item.displayOrder })
      });
      await fetch(`/api/hub/navigation/${targetItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayOrder: targetItem.displayOrder })
      });
    } catch (e) {
      console.warn('Navigation reorder sync error:', e);
    }
  },

  reorderItems: async (section, orderedIds) => {
    set(state => {
      const orderMap = new Map(orderedIds.map((id, index) => [id, index + 1]));
      return {
        items: state.items.map(item => {
          if (item.section === section && orderMap.has(item.id)) {
            return { ...item, displayOrder: orderMap.get(item.id)! };
          }
          return item;
        })
      };
    });

    try {
      await fetch('/api/hub/navigation/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, orderedIds })
      });
    } catch (e) {
      console.warn('Navigation reorder server sync queued:', e);
    }
  },

  syncWithServer: async () => {
    try {
      set({ isLoading: true });
      const res = await fetch('/api/hub/navigation');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          set({ items: data, lastSyncedAt: new Date().toISOString(), isLoading: false });
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to sync navigation with server:', e);
    }
    set({ isLoading: false });
  }
}));
