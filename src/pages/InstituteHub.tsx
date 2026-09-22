import { useParams, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Locale } from '../types';
import { useI18n } from '../hooks/useI18n';
import { GraduationCap, BookOpen, Database, Users, Handshake, Calendar, Building, ArrowRight, ShieldCheck, FileText, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function InstituteHub() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const { t } = useI18n(lang);
  const location = useLocation();
  const navigate = useNavigate();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const subpaths = [
    { id: '', label: lang === 'ar' ? 'الرئيسية' : lang === 'zh' ? '研究所首页' : lang === 'ckb' ? 'سەرەکی پەیمانگا' : 'Overview', icon: Building },
    { id: 'about', label: lang === 'ar' ? 'عن المعاهد والميثاق' : lang === 'zh' ? '关于与章程' : lang === 'ckb' ? 'دەربارەی پەیمانگا' : 'About & Charter', icon: ShieldCheck },
    { id: 'research', label: lang === 'ar' ? 'ركائز البحث' : lang === 'zh' ? '研究支柱' : lang === 'ckb' ? 'بنەماکانی توێژینەوە' : 'Research Pillars', icon: BookOpen },
    { id: 'publications', label: lang === 'ar' ? 'الأرشيف والأبحاث' : lang === 'zh' ? '研究文库' : lang === 'ckb' ? 'بڵاوکراوەکان' : 'Publications Archive', icon: FileText },
    { id: 'data-hub', label: lang === 'ar' ? 'مرکز البيانات والممر' : lang === 'zh' ? '数据与走廊中心' : lang === 'ckb' ? 'ناوەندی زانیاری' : 'Data & Corridor Hub', icon: Database },
    { id: 'experts', label: lang === 'ar' ? 'الخبراء والزملاء' : lang === 'zh' ? '智库专家与学者' : lang === 'ckb' ? 'شارەزایان' : 'Experts & Fellows', icon: Users },
    { id: 'partnerships', label: lang === 'ar' ? 'الشراكات الاستراتيجية' : lang === 'zh' ? '战略合作伙伴关系' : lang === 'ckb' ? 'هاوبەشییەکان' : 'Partnerships', icon: Handshake },
    { id: 'events', label: lang === 'ar' ? 'الفعاليات والحوارات' : lang === 'zh' ? '圆桌会与政策对话' : lang === 'ckb' ? 'چالاکییەکان' : 'Events & Dialogues', icon: Calendar },
    { id: 'visa-centre', label: lang === 'ar' ? 'مركز الاستشارات والفيزا' : lang === 'zh' ? '双边签证咨询与服务中心' : lang === 'ckb' ? 'ناوەندی ڕاوێژکاری ڤیزا' : 'Visa Advisory Centre', icon: ShieldCheck },
  ];

  const currentSub = location.pathname.split('/').pop() || '';
  const isRoot = location.pathname === `/${lang}/institute` || location.pathname === `/${lang}/institute/`;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
        <Link to={`/${lang}`} className="hover:text-brand-800 transition-colors">{lang === 'ar' ? 'الرئيسية' : lang === 'zh' ? '首页' : lang === 'ckb' ? 'سەرەکی' : 'Home'}</Link>
        <span className="text-neutral-300">/</span>
        <span className="text-brand-800 dark:text-brand-400">{lang === 'ar' ? 'المعهد الصيني للدراسات الاستراتيجية والاقتصادية' : lang === 'zh' ? '中国战略与经济研究所' : lang === 'ckb' ? 'پەیمانگای چینی بۆ لێکۆڵینەوەی ستراتیژی و ئابووری' : 'Chinese Institute for Strategic & Economic Studies'}</span>
      </nav>

      {/* Institute Hero Banner */}
      <div className="bg-gradient-to-br from-brand-950 via-brand-900 to-ink-900 text-white rounded-3xl p-8 sm:p-12 mb-8 shadow-2xl relative overflow-hidden border border-brand-800/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-700/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/50 border border-brand-600/40 text-[11px] font-black uppercase tracking-widest text-rose-200 backdrop-blur-md">
            <GraduationCap size={15} />
            <span>{lang === 'ar' ? 'الذراع الفكري والأكاديمي للوكالة' : lang === 'zh' ? 'ICA 官方高级智库与学术分支' : lang === 'ckb' ? 'باڵی هزری و ئەکادیمی' : 'Sovereign Academic Think Tank'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {lang === 'ar' ? 'المعهد الصيني للدراسات الاستراتيجية والاقتصادية' : lang === 'zh' ? '中国战略与经济研究所（CISE）' : lang === 'ckb' ? 'پەیمانگای چینی بۆ لێکۆڵینەوەی ستراتیژی و ئابووری' : 'Chinese Institute for Strategic & Economic Studies (CISE)'}
          </h1>
          <p className="text-sm sm:text-base text-neutral-200 font-medium leading-relaxed">
            {lang === 'ar' 
              ? 'مرجعية الأبحاث الاقتصادية الاستراتيجية، تتبع مشاريع الحزام والطريق، سياسات التبادل التجاري بالعملات المحلية، وتقديم المشورة الحكومية بين بغداد وبكين.' 
              : lang === 'zh' 
              ? '专注于中伊共建“一带一路”倡议、双边本币结算、宏观经济走廊与战略政策研究的顶尖官方智库。' 
              : lang === 'ckb' 
              ? 'سەرچاوەی باڵای لێکۆڵینەوەی ئابووری و ستراتیژی و بەدواداچوونی پڕۆژەکانی ڕێگەی ئاوریشم.' 
              : 'The premier research authority anchoring Belt & Road policy design, bilateral currency settlement frameworks, and macroeconomic corridor intelligence.'}
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-neutral-200 dark:border-neutral-800">
        {subpaths.map(tab => {
          const pathSegment = tab.id ? `/${lang}/institute/${tab.id}` : `/${lang}/institute`;
          const active = tab.id === '' ? isRoot : location.pathname === pathSegment;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.id}
              to={pathSegment}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all shrink-0 ${
                active
                  ? 'bg-brand-800 text-white shadow-md'
                  : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:border-brand-800'
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Subroute Outlet or Institute Overview */}
      <div className="w-full">
        {isRoot ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/60 flex items-center justify-center text-brand-800 dark:text-brand-400">
                <BookOpen size={24} />
              </div>
              <h3 className="text-lg font-black text-neutral-900 dark:text-neutral-100 uppercase">
                {lang === 'ar' ? 'ركائز البحث الاستراتيجي' : lang === 'zh' ? '核心研究支柱' : lang === 'ckb' ? 'بنەماکانی توێژینەوە' : 'Core Research Pillars'}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {lang === 'ar' ? 'دراسات تحليلية متعمقة حول تكامل الموانئ، طرق النقل السريعة، وأطر التمويل الثنائي.' : 'In-depth analysis of port integration, transport corridors, and sovereign financing frameworks.'}
              </p>
              <Link to={`/${lang}/institute/research`} className="inline-flex items-center gap-2 text-xs font-black uppercase text-brand-800 dark:text-brand-400 hover:underline">
                <span>{lang === 'ar' ? 'استكشاف الركائز' : lang === 'zh' ? '查看支柱' : lang === 'ckb' ? 'بینینی بنەماکان' : 'Explore Pillars'}</span>
                <ArrowRight size={14} className="rtl:rotate-180" />
              </Link>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/60 flex items-center justify-center text-brand-800 dark:text-brand-400">
                <Database size={24} />
              </div>
              <h3 className="text-lg font-black text-neutral-900 dark:text-neutral-100 uppercase">
                {lang === 'ar' ? 'لوحات مؤشرات البيانات' : lang === 'zh' ? '项目与贸易数据看板' : lang === 'ckb' ? 'داشبۆردی زانیاری' : 'Trade & Corridor Data Hub'}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {lang === 'ar' ? 'مؤشرات حية لمعدلات التبادل التجاري بالدينار واليوان ومتابعة مشاريع البنية التحتية الكبرى.' : 'Live metrics for bilateral trade in IQD/e-CNY and milestone tracking of megaprojects.'}
              </p>
              <Link to={`/${lang}/institute/data-hub`} className="inline-flex items-center gap-2 text-xs font-black uppercase text-brand-800 dark:text-brand-400 hover:underline">
                <span>{lang === 'ar' ? 'فتح لوحة البيانات' : lang === 'zh' ? '访问数据中心' : lang === 'ckb' ? 'کردنەوەی داشبۆرد' : 'Open Data Hub'}</span>
                <ArrowRight size={14} className="rtl:rotate-180" />
              </Link>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/60 flex items-center justify-center text-brand-800 dark:text-brand-400">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-black text-neutral-900 dark:text-neutral-100 uppercase">
                {lang === 'ar' ? 'الخبراء والزملاء الباحثون' : lang === 'zh' ? '资深研究员与学者' : lang === 'ckb' ? 'شارەزایان و توێژەران' : 'Scholars & Fellows'}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {lang === 'ar' ? 'نخبة من الأكاديميين والمستشارين الاقتصاديين والدبلوماسيين في بغداد وبكين.' : 'Leading economists, policy advisors, and diplomatic scholars across Baghdad and Beijing.'}
              </p>
              <Link to={`/${lang}/institute/experts`} className="inline-flex items-center gap-2 text-xs font-black uppercase text-brand-800 dark:text-brand-400 hover:underline">
                <span>{lang === 'ar' ? 'قائمة الخبراء' : lang === 'zh' ? '查看专家列表' : lang === 'ckb' ? 'لیستی شارەزایان' : 'View Experts'}</span>
                <ArrowRight size={14} className="rtl:rotate-180" />
              </Link>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
