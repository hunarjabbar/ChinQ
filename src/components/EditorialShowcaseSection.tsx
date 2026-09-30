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
        { num: '4', label: 'Sovereign Working Languages', sub: 'Mandarin • Arabic • Kurdish • English' },
        { num: '100%', label: 'Verified Institutional Integrity', sub: 'Primary Diplomatic & Enterprise Intelligence Sources' }
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
        { num: '٤', label: 'مكاتب إقليمية سيادية', sub: 'بكين • بغداد • البصرة • أربيل' },
        { num: '٤', label: 'لغات عمل مؤسسية', sub: 'الصينية • العربية • الكردية • الإنجليزية' },
        { num: '١٠٠٪', label: 'نزاهة التحقق المهني', sub: 'اعتماد كلي على المصادر الدبلوماسية والمؤسسية الموثقة' }
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
        { num: '4', label: '主权采编中心', sub: '北京总部 • 巴格达总社 • 巴士拉枢纽 • 埃尔比勒分社' },
        { num: '4', label: '官方工作语言', sub: '中文(普通话) • 阿拉伯语 • 库尔德语 • 英语' },
        { num: '100%', label: '全流程事实核验', sub: '源自外交部、商贸部及权威机构的一手信源' }
      ]
    },
    ckb: {
      eyebrow: 'تۆڕی سەرنووسەرایەتی سەربەخۆ و ڕێڕەوی دوولایەنە',
      title: 'بەستنەوەی ڕۆژهەڵاتی ئاسیا و ڕۆژهەڵاتی ناوەڕاست لە ڕێگەی ڕۆژنامەگەری دیپلۆماسي',
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
        { num: '٤', label: 'نووسینگەی هەرێمی سەربەخۆ', sub: 'پەکین • بەغداد • بەسرە • هەولێر' },
        { num: '٤', label: 'زمانە فەرمییەکانی کار', sub: 'چینی • عەرەبی • کوردی • ئینگلیزی' },
        { num: '١٠٠٪', label: 'نزاهەتی زانیاری و وردبینی', sub: 'پشتبەستن بە سەرچاوە فەرمییە دیپلۆماسی و بازرگانییەکان' }
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
      { num: '4', label: 'Sovereign Working Languages', sub: 'Mandarin • Arabic • Kurdish • English' },
      { num: '100%', label: 'Verified Institutional Integrity', sub: 'Primary Diplomatic & Enterprise Intelligence Sources' }
    ]
  };

  return (
    <section 
      aria-label="Editorial Showcase"
      className="w-full bg-white dark:bg-neutral-900 border-t-2 border-ink-950 dark:border-neutral-700 pt-16 pb-12 transition-colors duration-300 text-start"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-brand-800 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-800 dark:text-brand-400">
              {content.eyebrow}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-ink-950 dark:text-white leading-[1.05]">
            {content.title}
          </h2>
          <p className="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-serif italic max-w-2xl">
            {content.desc}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 shrink-0">
          <Link 
            to={`/${lang}/about`}
            className="text-[10px] font-black uppercase tracking-widest text-ink-950 dark:text-white border-b-2 border-ink-950 dark:border-white/20 hover:border-brand-800 transition-all pb-1 flex items-center gap-2 group cursor-pointer"
          >
            <span>{content.exploreAboutBtn}</span>
            {isRtl ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </Link>

          <Link 
            to={`/${lang}/join`}
            className="bg-brand-800 hover:bg-brand-700 text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all shadow-xl flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>{content.joinEditorialBtn}</span>
          </Link>
        </div>
      </div>

      {/* Grid: Metrics on left, Bureaus on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Metrics Strip */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-10">
          {content.metrics.map((m, idx) => (
            <div 
              key={idx} 
              className="space-y-3"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-black text-ink-950 dark:text-white tracking-tighter tabular-nums">
                  {m.num}
                </span>
                <span className="text-[10px] font-black text-brand-800 dark:text-brand-400 uppercase tracking-[0.2em]">
                  {m.label}
                </span>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 font-serif italic">
                {m.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Bureaus Active Grid */}
        <div className="lg:col-span-7 space-y-10">
          <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-ink-950 dark:text-white flex items-center gap-3">
              <Radio className="w-4 h-4 text-brand-800" />
              {content.bureausTitle}
            </h3>
            <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Live Telemetry
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
            {content.bureaus.map((b, i) => (
              <div 
                key={i} 
                className="space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm text-ink-950 dark:text-white uppercase tracking-tight group-hover:text-brand-800 transition-colors">
                    {b.name}
                  </h4>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                    {b.status}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-serif italic">
                  {b.role}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-10 mt-10 border-t border-neutral-100 dark:border-neutral-800">
            <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-800 opacity-50" />
                {lang === 'ar' ? 'جميع المراسلات متزامنة ومحمية بتشفير عالي.' : 'All dispatches are synchronized and cryptographically secured.'}
              </span>
              <Link 
                to={`/${lang}/about`} 
                className="hover:text-brand-800 underline decoration-neutral-200 underline-offset-4 transition-colors"
              >
                {lang === 'ar' ? 'عرض السجل' : 'View Protocol'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
