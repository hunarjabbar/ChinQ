import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { CompactTradeExplorer } from '../../components/summit/CompactTradeExplorer';
import { ResearchBehindSummit } from '../../components/summit/ResearchBehindSummit';
import { 
  SUMMIT_CANONICAL, SECTOR_PAVILIONS, ICA_SERVICES, 
  SUMMIT_AGENDA, SUMMIT_SPEAKERS 
} from '../../data/summitData';
import { 
  Building2, Calendar, MapPin, Users, Award, ArrowRight, 
  CheckCircle2, ShieldCheck, Sparkles, Globe, Download, 
  Landmark, ArrowUpRight, Flame, Layers, PackageSearch, Plane, Scale, HelpCircle
} from 'lucide-react';

export function SummitLandingPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  const [selectedDay, setSelectedDay] = useState<1 | 2 | 3>(1);

  return (
    <SummitLayout lang={lang} activeNav="overview">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-16">
        
        {/* Summit Hero Section with Canonical Bilingual Branding */}
        <section className="bg-gradient-to-br from-ink-950 via-brand-950 to-brand-900 text-white rounded-3xl p-6 sm:p-8 lg:p-14 shadow-2xl relative overflow-hidden border border-brand-700/60">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-800/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-ink-900/60 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/70 border border-brand-500/50 text-[11px] font-black uppercase tracking-widest text-white backdrop-blur-md">
                <Award size={15} className="text-amber-300" />
                <span>{lang === 'ar' ? 'الحدث الدبلوماسي الاقتصادي الأبرز' : lang === 'zh' ? '年度旗舰外交与经贸盛会' : lang === 'ckb' ? 'بەرچاوترین رووداوی دیپلۆماسی و ئابووری' : 'Flagship Bilateral Summit & Expo'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/60 border border-neutral-700 text-[11px] font-bold text-neutral-300">
                <span>11 Sectors</span>
                <span>•</span>
                <span>240+ Exhibitors</span>
                <span>•</span>
                <span>$3.5B+ Target Deals</span>
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-brand-300">
                {lang === 'ar' ? 'السليمانية — بوابة طريق الحرير في العراق' : lang === 'zh' ? '伊拉克苏莱曼尼亚 · 丝路枢纽' : lang === 'ckb' ? 'سلێمانی — دەروازەی ڕێگای ئاوریشم' : 'Sulaymaniyah — Iraq’s Silk Road Gateway'}
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                {SUMMIT_CANONICAL.formalTitle[lang]}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-neutral-200 font-medium leading-relaxed max-w-3xl">
              {SUMMIT_CANONICAL.subtitle[lang]}
            </p>

            {/* Date and Venue Badges */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-2 text-xs sm:text-sm font-bold text-neutral-200">
              <div className="flex items-center gap-2.5 bg-neutral-900/40 px-3.5 py-2 rounded-xl border border-neutral-700/50">
                <Calendar className="w-4 h-4 text-brand-400 shrink-0" />
                <span>{SUMMIT_CANONICAL.dates[lang]}</span>
              </div>
              <div className="flex items-center gap-2.5 bg-neutral-900/40 px-3.5 py-2 rounded-xl border border-neutral-700/50">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                <span>{SUMMIT_CANONICAL.venue.name[lang]}</span>
              </div>
            </div>

            {/* Primary Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              <Link
                to={`/${lang}/summit/expo/register`}
                className="px-6 py-3.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl active:scale-98 flex items-center gap-2"
              >
                <span>{lang === 'ar' ? 'حجز جناح في المعرض الثنائي' : lang === 'zh' ? '预订双边博览会展位' : lang === 'ckb' ? 'حیجزی شوێن لە پێشانگا' : 'Book an Expo Booth'}</span>
                <ArrowRight size={15} className={isRtl ? 'rotate-180' : ''} />
              </Link>
              <Link
                to={`/${lang}/summit/expo/visitor-register`}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black text-xs uppercase tracking-wider backdrop-blur-md transition-all active:scale-98"
              >
                {lang === 'ar' ? 'تسجيل الزوار والمشترين مجاناً' : lang === 'zh' ? '免费获取买家参会证' : lang === 'ckb' ? 'تۆماری بێبەرامبەری سەردانکەران' : 'Get Free Visitor Pass'}
              </Link>
              <Link
                to={`/${lang}/summit/b2b-matchmaking`}
                className="px-5 py-3.5 rounded-xl bg-emerald-900/70 hover:bg-emerald-800 text-emerald-200 border border-emerald-600/50 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
              >
                <Sparkles size={14} className="text-emerald-300" />
                <span>{lang === 'ar' ? 'حجز لقاءات B2B' : lang === 'zh' ? '预约1对1商贸配对' : lang === 'ckb' ? 'کۆبوونەوەی B2B' : 'B2B Matchmaking'}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 11 Sector Pavilions Showcase */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
                {lang === 'ar' ? 'المعرض التجاري والصناعي الشامل' : lang === 'zh' ? '双边博览会11大核心展区' : lang === 'ckb' ? '١١ کەرتی سەرەکی لە پێشانگا' : 'Bilateral Expo Pavilions'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-50 uppercase tracking-tight mt-1">
                {lang === 'ar' ? '١١ جناحاً قطاعياً تغطي كامل مفاصل الاقتصاد' : lang === 'zh' ? '覆盖中伊经贸全产业链的11大产业展区' : lang === 'ckb' ? '١١ کەرتی سەرەکی بۆ هەموو بوارەکانی ئابووری' : '11 Sector Pavilions Facilitating Every Industry'}
              </h2>
            </div>
            <Link
              to={`/${lang}/summit/expo`}
              className="text-xs font-black text-brand-800 dark:text-brand-300 hover:underline flex items-center gap-1"
            >
              <span>{lang === 'ar' ? 'استعراض كل الأجنحة والمشاركين' : lang === 'zh' ? '查看全部展区与展商' : lang === 'ckb' ? 'هەموو کەرتەکان و عارزان' : 'Explore All Pavilions'}</span>
              <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SECTOR_PAVILIONS.map((sector) => (
              <Link
                key={sector.id}
                to={`/${lang}/summit/expo/sectors/${sector.slug}`}
                className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-brand-600 dark:hover:border-brand-500 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between space-y-4 min-w-0"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-800 dark:text-brand-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Layers size={20} />
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {sector.boothCount} Booths
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-neutral-900 dark:text-neutral-100 group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors leading-snug">
                    {sector.name[lang]}
                  </h3>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {sector.description[lang]}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-bold text-brand-800 dark:text-brand-400">
                    {sector.researchPillarTitle[lang]}
                  </span>
                  <ArrowRight size={14} className={`text-neutral-400 group-hover:text-brand-800 group-hover:translate-x-1 transition-all ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Embedded Institute Trade Explorer Widget */}
        <CompactTradeExplorer lang={lang} />

        {/* ICA 5 Service Verticals Integration */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
                {lang === 'ar' ? 'التمكين التنفيذي والتجاري' : lang === 'zh' ? '落地支撑 · ICA五大核心赋能' : lang === 'ckb' ? 'پشتگیری جێبەجێکردن لە ICA' : 'Operational Trade Facilitation'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-50 uppercase tracking-tight mt-1">
                {lang === 'ar' ? '٥ خدمات متكاملة تضمن إبرام وتنفيذ الصفقات' : lang === 'zh' ? '贯穿采购、清算、信保、签证与合规的全流程服务' : lang === 'ckb' ? '٥ خزمەتگوزاری بۆ سەرکەوتنی مامەڵە بازرگانییەکان' : '5 First-Class ICA Service Verticals'}
              </h2>
            </div>
            <Link
              to={`/${lang}/summit/services`}
              className="text-xs font-black text-brand-800 dark:text-brand-300 hover:underline flex items-center gap-1"
            >
              <span>{lang === 'ar' ? 'عرض تفاصيل الخدمات والمكاتب' : lang === 'zh' ? '了解全部服务流程' : lang === 'ckb' ? 'وردەکاری خزمەتگوزارییەکان' : 'All Service Verticals'}</span>
              <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ICA_SERVICES.map((srv) => (
              <Link
                key={srv.id}
                to={`/${lang}/summit/services/${srv.slug}`}
                className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-brand-600 transition-all shadow-xs hover:shadow-md flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-800 dark:text-brand-400 flex items-center justify-center">
                    <PackageSearch size={20} />
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 inline-block">
                    {srv.badge[lang]}
                  </span>
                  <h3 className="text-sm font-black text-neutral-900 dark:text-neutral-100 group-hover:text-brand-800 transition-colors">
                    {srv.title[lang]}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                    {srv.tagline[lang]}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs font-bold text-brand-800 dark:text-brand-400 flex items-center gap-1">
                  <span>Learn More</span>
                  <ArrowRight size={13} className={isRtl ? 'rotate-180' : ''} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Research Behind the Summit (Institute Deep Integration) */}
        <ResearchBehindSummit lang={lang} />

        {/* 3-Day Agenda Interactive Preview */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
                {lang === 'ar' ? 'الجدول الزمني للفعاليات' : lang === 'zh' ? '峰会全景日程' : lang === 'ckb' ? 'بەرنامەی فەرمی' : 'Event Schedule'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-50 uppercase tracking-tight mt-1">
                {lang === 'ar' ? 'برنامج القمة والمعرض على مدار ٣ أيام' : lang === 'zh' ? '为期三天的峰会、论坛与博览会日程' : lang === 'ckb' ? 'بەرنامەی ٣ ڕۆژەی لووتکە و پێشانگا' : '3-Day Summit & Expo Programme'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3].map((dayNum) => (
                <button
                  key={dayNum}
                  onClick={() => setSelectedDay(dayNum as 1 | 2 | 3)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    selectedDay === dayNum
                      ? 'bg-brand-800 text-white shadow-md'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                  }`}
                >
                  Day {dayNum} ({dayNum === 1 ? 'Nov 18' : dayNum === 2 ? 'Nov 19' : 'Nov 20'})
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {SUMMIT_AGENDA.filter(s => s.day === selectedDay).map((session) => (
              <div
                key={session.id}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-brand-100 dark:bg-brand-950 text-brand-900 dark:text-brand-300">
                      {session.track}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                      {session.time}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {session.location[lang]}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-neutral-900 dark:text-neutral-100">
                    {session.title[lang]}
                  </h3>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {session.description[lang]}
                  </p>

                  {session.instituteResearchTitle && (
                    <div className="pt-1 flex items-center gap-1.5 text-[11px] font-bold text-brand-700 dark:text-brand-300">
                      <span>Research Base:</span>
                      <Link to={`/${lang}/institute/publications`} className="underline hover:text-brand-900 dark:hover:text-white">
                        {session.instituteResearchTitle[lang]}
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  to={`/${lang}/summit/agenda`}
                  className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border border-neutral-300 dark:border-neutral-700 hover:border-brand-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shrink-0 text-center"
                >
                  Full Agenda & .ICS →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Distinguished Speakers & Fellows */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
                {lang === 'ar' ? 'القيادات والشخصيات البارزة' : lang === 'zh' ? '政要、领袖与学者' : lang === 'ckb' ? 'بەرپرسان و پسپۆڕان' : 'Eminent Faculty & Speakers'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-50 uppercase tracking-tight mt-1">
                {lang === 'ar' ? 'نخبة المتحدثين والوزراء وباحثي المعهد' : lang === 'zh' ? '中伊政商领袖与研究院资深学者阵容' : lang === 'ckb' ? 'وتاربێژان، وەزیران و توێژەرانی پەیمانگا' : 'Distinguished Speakers & Institute Fellows'}
              </h2>
            </div>
            <Link
              to={`/${lang}/summit/speakers`}
              className="text-xs font-black text-brand-800 dark:text-brand-300 hover:underline flex items-center gap-1"
            >
              <span>{lang === 'ar' ? 'عرض دليل المتحدثين الكامل' : lang === 'zh' ? '查看全部演讲嘉宾' : lang === 'ckb' ? 'هەموو وتاربێژان' : 'View All Speakers'}</span>
              <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SUMMIT_SPEAKERS.slice(0, 4).map((spk) => (
              <div
                key={spk.id}
                className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-brand-800 text-white flex items-center justify-center font-black text-base shadow-sm">
                  {spk.name[lang].slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-black text-neutral-900 dark:text-neutral-100">{spk.name[lang]}</h3>
                  <div className="text-[11px] font-bold text-brand-800 dark:text-brand-400 mt-0.5">{spk.title[lang]}</div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">{spk.organization[lang]}</div>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed pt-1">
                  {spk.bio[lang]}
                </p>
                {spk.isInstituteFellow && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-brand-50 dark:bg-brand-950 text-brand-800 dark:text-brand-300 border border-brand-200 dark:border-brand-800 inline-block">
                    Institute Research Fellow
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </SummitLayout>
  );
}
