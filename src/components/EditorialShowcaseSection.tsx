import { Link } from 'react-router-dom';
import { Locale } from '../types';
import { 
  Building2, 
  UserPlus, 
  Globe, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Radio, 
  BookOpen, 
  Award,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface EditorialShowcaseProps {
  lang: Locale;
}

export function EditorialShowcaseSection({ lang }: EditorialShowcaseProps) {
  const isRtl = lang === 'ar' || lang === 'ckb';

  const content = {
    en: {
      eyebrow: 'Sovereign Editorial Network & Bilateral Corridor',
      title: 'Bridging East Asia & The Middle East Through Diplomatic Journalism',
      desc: 'The Iraqi-Chinese Agency operates verified newsrooms across Beijing, Baghdad, Basra, and Erbil. We deliver trilingual economic intelligence, Al Faw Grand Port monitoring, and academic think-tank research without semantic loss.',
      exploreAboutBtn: 'Explore Institutional Mission & Bureaus',
      joinEditorialBtn: 'Apply for Editorial Fellowship & Press Credentials',
      bureausTitle: 'Regional Newsrooms & Desks',
      bureaus: [
        { name: 'Beijing HQ', role: 'Diplomatic Liaison & Macroeconomics', status: 'Operational' },
        { name: 'Baghdad Bureau', role: 'Legislative Policy & Central Desk', status: 'Operational' },
        { name: 'Basra Maritime Hub', role: 'Al Faw Port & Maritime Logistics', status: 'Active' },
        { name: 'Erbil Bureau', role: 'Northern Trade & Trilingual Matrix', status: 'Operational' }
      ],
      metrics: [
        { num: '4', label: 'Sovereign Newsrooms', sub: 'Beijing • Baghdad • Basra • Erbil' },
        { num: '4', label: 'Working Languages', sub: 'Mandarin • Arabic • Kurdish • English' },
        { num: '100%', label: 'Fact-Checked Integrity', sub: 'Primary Diplomatic & Enterprise Sources' }
      ]
    },
    ar: {
      eyebrow: 'شبكة التحرير السيادية والممر الإعلامي الثنائي',
      title: 'تجسير التواصل بين شرق آسيا والشرق الأوسط عبر الصحافة الدبلوماسية',
      desc: 'تدير الوكالة العراقية الصينية غرف أخبار موثقة في بكين وبغداد والبصرة وأربيل. نقدم استخبارات اقتصادية ثلاثية اللغات، ورصداً لميناء الفاو الكبير، وأبحاثاً فكرية محكمة دون أي فقد في الدقة الدلالية.',
      exploreAboutBtn: 'استكشف المهمة المؤسسية والمكاتب',
      joinEditorialBtn: 'التقدم للزمالة التحريرية والاعتماد الصحفي',
      bureausTitle: 'المكاتب وغرف الأخبار الإقليمية',
      bureaus: [
        { name: 'مكتب بكين الرئيسي', role: 'الارتباط الدبلوماسي والاقتصاد الكلي', status: 'تشغيلي' },
        { name: 'مكتب بغداد المركزي', role: 'السياسات التشريعية والديسك المركزي', status: 'تشغيلي' },
        { name: 'مركز البصرة البحري', role: 'ميناء الفاو واللوجستيات البحرية', status: 'نشط' },
        { name: 'مكتب أربيل الإقليمي', role: 'تجارة الشمال والمصفوفة الثلاثية', status: 'تشغيلي' }
      ],
      metrics: [
        { num: '٤', label: 'مكاتب سيادية', sub: 'بكين • بغداد • البصرة • أربيل' },
        { num: '٤', label: 'لغات عمل رسمية', sub: 'الماندرين • العربية • الكردية • الإنجليزية' },
        { num: '١٠٠٪', label: 'نزاهة التحقق والتدقيق', sub: 'مصادر أولية دبلوماسية ومؤسسية' }
      ]
    },
    zh: {
      eyebrow: '主权采编网络与双边信息走廊',
      title: '以权威外交新闻采编 架起东亚与中东之桥',
      desc: '伊中通讯社在北京、巴格达、巴士拉与埃尔比勒设有全功能主权新闻分社，提供权威三语宏观经济情报、法奥大港全时跟踪以及跨国智库高层学术成果。',
      exploreAboutBtn: '探索通讯社体制与分社网络',
      joinEditorialBtn: '申请加入编辑团队与资质登记',
      bureausTitle: '区域分社与专属观察室',
      bureaus: [
        { name: '北京总部办事处', role: '外交联络与宏观经贸研判', status: '运行中' },
        { name: '巴格达采编总社', role: '立法政策与中央调度新闻室', status: '运行中' },
        { name: '巴士拉海洋枢纽', role: '法奥港与海洋基建物流动态', status: '高活跃' },
        { name: '埃尔比勒分社', role: '北部经贸与三语转译矩阵', status: '运行中' }
      ],
      metrics: [
        { num: '4', label: '大主权分社', sub: '北京 • 巴格达 • 巴士拉 • 埃尔比勒' },
        { num: '4', label: '种官方工作语言', sub: '中文普通话 • 阿拉伯语 • 库尔德语 • 英语' },
        { num: '100%', label: '事实核验保真', sub: '严控一手外交与权威部委信源' }
      ]
    },
    ckb: {
      eyebrow: 'تۆڕی سەرنووسەرایەتی سەربەخۆ و ڕێڕەوی دوولایەنە',
      title: 'بەستنەوەی ڕۆژهەڵاتی ئاسیا و ڕۆژهەڵاتی ناوەڕاست لە ڕێگەی ڕۆژنامەگەری دیپلۆماسی',
      desc: 'ئاژانسی عێراقی - چینی نووسینگەی فەرمی لە پەکین، بەغداد، بەسرە و هەولێر بەڕێوەدەبات. ئێمە زانیاری ئابووری سێزمانە، چاودێری بەندەری فاو و توێژینەوەی ئەکادیمی بێ وەرگێڕانی هەڵە پێشکەش دەکەین.',
      exploreAboutBtn: 'ئاشنابوون بە ئەرک و نووسینگەکان',
      joinEditorialBtn: 'پێشکەشکردنی داواکاری ئەندامێتی و باجی ڕۆژنامەوانی',
      bureausTitle: 'نووسینگە و دیسکە هەرێمییەکان',
      bureaus: [
        { name: 'نووسینگەی پەکین', role: 'پەیوەندی دیپلۆماسی و ئابووری گەورە', status: 'کارایە' },
        { name: 'نووسینگەی بەغداد', role: 'سیاسەتی یاسادانان و دیسکی ناوەندی', status: 'کارایە' },
        { name: 'سەنتەری دەریایی بەسرە', role: 'بەندەری فاو و لۆجیستی دەریایی', status: 'چالاک' },
        { name: 'نووسینگەی هەولێر', role: 'بازرگانی باکوور و ماتریکسی سێزمانە', status: 'کارایە' }
      ],
      metrics: [
        { num: '٤', label: 'نووسینگەی سەربەخۆ', sub: 'پەکین • بەغداد • بەسرە • هەولێر' },
        { num: '٤', label: 'زمانی فەرمی کارپێکراو', sub: 'مەندارین • عەرەبی • کوردی • ئینگلیزی' },
        { num: '١٠٠٪', label: 'باوەڕپێکراوی زانیاری', sub: 'سەرچاوەی سەرەتایی دیپلۆماسی و بازرگانی' }
      ]
    }
  }[lang] || {
    eyebrow: 'Sovereign Editorial Network & Bilateral Corridor',
    title: 'Bridging East Asia & The Middle East Through Diplomatic Journalism',
    desc: 'The Iraqi-Chinese Agency operates verified newsrooms across Beijing, Baghdad, Basra, and Erbil. We deliver trilingual economic intelligence, Al Faw Grand Port monitoring, and academic think-tank research without semantic loss.',
    exploreAboutBtn: 'Explore Institutional Mission & Bureaus',
    joinEditorialBtn: 'Apply for Editorial Fellowship & Press Credentials',
    bureausTitle: 'Regional Newsrooms & Desks',
    bureaus: [
      { name: 'Beijing HQ', role: 'Diplomatic Liaison & Macroeconomics', status: 'Operational' },
      { name: 'Baghdad Bureau', role: 'Legislative Policy & Central Desk', status: 'Operational' },
      { name: 'Basra Maritime Hub', role: 'Al Faw Port & Maritime Logistics', status: 'Active' },
      { name: 'Erbil Bureau', role: 'Northern Trade & Trilingual Matrix', status: 'Operational' }
    ],
    metrics: [
      { num: '4', label: 'Sovereign Newsrooms', sub: 'Beijing • Baghdad • Basra • Erbil' },
      { num: '4', label: 'Working Languages', sub: 'Mandarin • Arabic • Kurdish • English' },
      { num: '100%', label: 'Fact-Checked Integrity', sub: 'Primary Diplomatic & Enterprise Sources' }
    ]
  };

  return (
    <section 
      aria-label="Editorial Showcase"
      className="w-full bg-white dark:bg-neutral-900 border-2 border-ink-900 dark:border-neutral-700 shadow-sm p-6 sm:p-8 md:p-10 transition-colors duration-300 text-start"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b-2 border-brand-800 pb-6 mb-8">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-brand-800 rounded-full animate-ping" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-800 dark:text-brand-400">
              {content.eyebrow}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-brand-900 dark:text-white leading-tight">
            {content.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed text-justify">
            {content.desc}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link 
            to={`/${lang}/about`}
            className="px-5 py-2.5 bg-paper-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:border-brand-800 dark:hover:border-brand-500 text-brand-900 dark:text-neutral-100 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Building2 className="w-3.5 h-3.5 text-brand-800 dark:text-brand-400" />
            <span>{content.exploreAboutBtn}</span>
            {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </Link>

          <Link 
            to={`/${lang}/join`}
            className="px-6 py-2.5 bg-brand-800 hover:bg-brand-700 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <UserPlus className="w-3.5 h-3.5 text-white" />
            <span>{content.joinEditorialBtn}</span>
            {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </Link>
        </div>
      </div>

      {/* Grid: Metrics on left, Bureaus on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Metrics Strip */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
          {content.metrics.map((m, idx) => (
            <div 
              key={idx} 
              className="p-4 bg-paper-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-center space-y-1"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-brand-800 dark:text-brand-400">
                  {m.num}
                </span>
                <span className="text-xs font-bold text-brand-900 dark:text-white uppercase tracking-wider">
                  {m.label}
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {m.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Bureaus Active Grid */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-brand-900 dark:text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-brand-800 dark:text-brand-400" />
              {content.bureausTitle}
            </h3>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 border border-emerald-200 dark:border-emerald-800">
              Live Network Telemetry
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {content.bureaus.map((b, i) => (
              <div 
                key={i} 
                className="p-3.5 bg-white dark:bg-neutral-800/90 border border-neutral-200 dark:border-neutral-700 hover:border-brand-800 dark:hover:border-brand-600 transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-brand-900 dark:text-white">
                    {b.name}
                  </h4>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded-2xs">
                    {b.status}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                  {b.role}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3 bg-brand-50/60 dark:bg-brand-950/30 border border-brand-800/20 text-[11px] text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-800 dark:text-brand-400 shrink-0" />
              {lang === 'ar' ? 'جميع المراسلات والتقارير متزامنة ومحمية بتشفير عالي الأمان.' : lang === 'zh' ? '所有公文电传与采编简报均受高等级主权加密保护并实时同步。' : lang === 'ckb' ? 'هەموو ڕاپۆرت و بروسکەکان بە تەواوی مشەفەرکراون و پارێزراون.' : 'All dispatches & intelligence reports are synchronized and cryptographically secured.'}
            </span>
            <Link 
              to={`/${lang}/about`} 
              className="text-xs font-bold text-brand-800 dark:text-brand-400 hover:underline uppercase tracking-wider shrink-0 ml-2 rtl:ml-0 rtl:mr-2"
            >
              {lang === 'ar' ? 'عرض السجل' : lang === 'zh' ? '查阅机构章程' : lang === 'ckb' ? 'بینینی وردەکاری' : 'View Protocol'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
