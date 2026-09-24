import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Locale } from '../../types';
import { SUMMIT_CANONICAL } from '../../data/summitData';
import { useI18n } from '../../hooks/useI18n';
import { 
  Building2, Calendar, MapPin, Sparkles, BookOpen, Layers, 
  Users, Handshake, ShieldCheck, FileText, ArrowRight, ExternalLink,
  PhoneCall, HelpCircle, Newspaper, Globe, Landmark
} from 'lucide-react';

interface SummitLayoutProps {
  children: React.ReactNode;
  lang: Locale;
  activeNav?: string;
}

export function SummitLayout({ children, lang, activeNav }: SummitLayoutProps) {
  const { t } = useI18n(lang);
  const isRtl = lang === 'ar' || lang === 'ckb';
  const location = useLocation();

  const navItems = [
    { label: { en: 'Overview', ar: 'نظرة عامة', zh: '峰会总览', ckb: 'پوختە' }, path: `/${lang}/summit` },
    { label: { en: 'Expo & 11 Pavilions', ar: 'المعرض و١١ جناحاً', zh: '双边博览会与11展区', ckb: 'پێشانگا و ١١ کەرت' }, path: `/${lang}/summit/expo` },
    { label: { en: 'Floor Plan & Booths', ar: 'المخطط وحجز الأجنحة', zh: '展位平面图与预订', ckb: 'نەخشەی هۆڵ و شوێنەکان' }, path: `/${lang}/summit/expo/floor-plan` },
    { label: { en: '3-Day Agenda', ar: 'برنامج الـ٣ أيام', zh: '三日全景日程', ckb: 'بەرنامەی ٣ ڕۆژە' }, path: `/${lang}/summit/agenda` },
    { label: { en: 'Speakers & Fellows', ar: 'المتحدثون والباحثون', zh: '演讲嘉宾与学者', ckb: 'وتاربێژان و توێژەران' }, path: `/${lang}/summit/speakers` },
    { label: { en: 'ICA 5 Services', ar: 'خدمات ICA الـ٥', zh: 'ICA五大直采服务', ckb: '٥ خزمەتگوزاری سەرەکی' }, path: `/${lang}/summit/services` },
    { label: { en: 'B2B Matchmaking', ar: 'التوفيق التجاري B2B', zh: 'B2B精准商贸配对', ckb: 'کۆبوونەوەی بازرگانی B2B' }, path: `/${lang}/summit/b2b-matchmaking` },
    { label: { en: 'Why Sulaymaniyah', ar: 'لماذا السليمانية', zh: '为何选择苏莱曼尼亚', ckb: 'بۆچی سلێمانی' }, path: `/${lang}/summit/about-sulaymaniyah` },
    { label: { en: 'Sponsorship', ar: 'الرعاية والاستثمار', zh: '赞助与权益', ckb: 'سپۆنسەری' }, path: `/${lang}/summit/sponsors` },
    { label: { en: 'VIP Access', ar: 'تسجيل الوفود الرسمية', zh: '贵宾与政要通道', ckb: 'تۆماری شاندی فەرمی' }, path: `/${lang}/summit/vip-registration` },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans transition-colors" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Knowledge Partner Sovereign Top Banner */}
      <aside aria-label="Knowledge Partner Bar" className="bg-ink-950 border-b border-brand-800/40 text-neutral-200 text-xs py-2 px-3 sm:px-8 min-w-0">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-wrap">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-neutral-400 shrink-0">
              {t('footerKnowledgePartner')}
            </span>
            <Link 
              to={`/${lang}/institute`}
              className="text-[10px] sm:text-[11px] font-black tracking-wide text-brand-300 hover:text-white underline decoration-brand-500/50 underline-offset-2 flex items-center gap-1 transition-colors truncate max-w-[190px] sm:max-w-none"
            >
              <span className="truncate">Chinese Institute for Strategic and Economic Studies</span>
              <ExternalLink size={11} className="shrink-0" />
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] font-semibold text-neutral-400 min-w-0 flex-wrap">
            <span className="shrink-0">{SUMMIT_CANONICAL.dates[lang]}</span>
            <span className="shrink-0 opacity-50">•</span>
            <span className="truncate max-w-[160px] sm:max-w-none">{SUMMIT_CANONICAL.venue.name[lang]}</span>
          </div>
        </div>
      </aside>

      {/* Main Summit Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-xs w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Summit Brand / Logo */}
            <Link to={`/${lang}/summit`} className="flex items-center gap-3 shrink-0 group">
              <div className="w-11 h-11 rounded-xl bg-brand-800 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Landmark className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
                  {lang === 'ar' ? 'السليمانية ٢٠٢٦' : lang === 'zh' ? '苏莱曼尼亚 2026' : lang === 'ckb' ? 'سلێمانی ٢٠٢٦' : 'Sulaymaniyah 2026'}
                </span>
                <span className="text-sm sm:text-base font-black tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
                  {SUMMIT_CANONICAL.name[lang]}
                </span>
              </div>
            </Link>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to={`/${lang}/summit/expo/register`}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-brand-800 hover:bg-brand-900 text-white shadow-sm transition-all hover:shadow-md cursor-pointer"
              >
                <span>{lang === 'ar' ? 'حجز جناح كعارض' : lang === 'zh' ? '申请参展展位' : lang === 'ckb' ? 'تۆماری وەک عارز' : 'Exhibitor Booth'}</span>
                <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
              </Link>
              <Link
                to={`/${lang}/summit/expo/visitor-register`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 transition-all cursor-pointer"
              >
                <span>{lang === 'ar' ? 'تسجيل الزوار والمشترين' : lang === 'zh' ? '买家/观众免费注册' : lang === 'ckb' ? 'تۆماری سەردانکەران' : 'Visitor Pass'}</span>
              </Link>
            </div>
          </div>

          {/* Scrolling Sub-navigation bar */}
          <div className="w-full overflow-x-auto no-scrollbar min-w-0">
            <nav className="flex items-center gap-1 py-2.5 border-t border-neutral-100 dark:border-neutral-800/80 text-xs font-bold whitespace-nowrap min-w-max">
              {navItems.map((item, idx) => {
                const isActive = location.pathname === item.path || (item.path !== `/${lang}/summit` && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={idx}
                    to={item.path}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-brand-800 text-white shadow-xs font-black' 
                        : 'text-neutral-600 dark:text-neutral-300 hover:text-brand-800 dark:hover:text-brand-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                    }`}
                  >
                    {item.label[lang]}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full">
        {children}
      </main>

      {/* Summit Comprehensive Footer with Institute Authority */}
      <footer className="mt-20 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-800 text-white flex items-center justify-center font-black">
                <Landmark size={18} />
              </div>
              <span className="font-black text-sm uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                {SUMMIT_CANONICAL.name[lang]}
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {SUMMIT_CANONICAL.subtitle[lang]}
            </p>
            <div className="text-[11px] text-neutral-400 space-y-1">
              <div>{SUMMIT_CANONICAL.dates[lang]}</div>
              <div>{SUMMIT_CANONICAL.venue.name[lang]}</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              {lang === 'ar' ? 'المعرض والقطاعات' : lang === 'zh' ? '博览会与产业展区' : lang === 'ckb' ? 'پێشانگا و کەرتەکان' : 'Expo & 11 Sectors'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to={`/${lang}/summit/expo`} className="hover:text-brand-800">{lang === 'ar' ? 'دليل الأجنحة الـ١١' : lang === 'zh' ? '11大产业展区总览' : lang === 'ckb' ? 'ڕێبەری ١١ کەرت' : '11 Sector Pavilions'}</Link></li>
              <li><Link to={`/${lang}/summit/expo/floor-plan`} className="hover:text-brand-800">{lang === 'ar' ? 'مخطط القاعة التفاعلي' : lang === 'zh' ? '交互式展馆平面图' : lang === 'ckb' ? 'نەخشەی هۆڵەکان' : 'Interactive Floor Plan'}</Link></li>
              <li><Link to={`/${lang}/summit/expo/register`} className="hover:text-brand-800">{lang === 'ar' ? 'تسجيل العارضين' : lang === 'zh' ? '展商参展报名' : lang === 'ckb' ? 'تۆماری عارزان' : 'Exhibitor Booking'}</Link></li>
              <li><Link to={`/${lang}/summit/b2b-matchmaking`} className="hover:text-brand-800">{lang === 'ar' ? 'حجز جلسات B2B' : lang === 'zh' ? 'B2B商贸精准对接' : lang === 'ckb' ? 'کۆبوونەوەی B2B' : 'B2B Matchmaking'}</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              {lang === 'ar' ? 'خدمات ICA التمكينية' : lang === 'zh' ? 'ICA五大直采服务' : lang === 'ckb' ? 'خزمەتگوزارییەکانی ICA' : 'ICA Service Verticals'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to={`/${lang}/summit/services/sourcing`} className="hover:text-brand-800">{lang === 'ar' ? 'تسهيل التوريد المباشر' : lang === 'zh' ? '源头跨境直采赋能' : lang === 'ckb' ? 'کڕینی ڕاستەوخۆ' : 'Sourcing Facilitation'}</Link></li>
              <li><Link to={`/${lang}/summit/services/settlement`} className="hover:text-brand-800">{lang === 'ar' ? 'التسوية بالدينار واليوان' : lang === 'zh' ? '本币结算与清算' : lang === 'ckb' ? 'پاکتاوی دینار و یوان' : 'Bilateral Clearing (IQD/CNY)'}</Link></li>
              <li><Link to={`/${lang}/summit/services/insurance`} className="hover:text-brand-800">{lang === 'ar' ? 'تأمين الصادرات والشحن' : lang === 'zh' ? '中信保与货运险' : lang === 'ckb' ? 'بیمەی هەناردە' : 'Insurance Facilitation (Sinosure)'}</Link></li>
              <li><Link to={`/${lang}/summit/services/visa-tourism`} className="hover:text-brand-800">{lang === 'ar' ? 'التأشيرات والوفود التجارية' : lang === 'zh' ? '商务签证与双向考察' : lang === 'ckb' ? 'ڤیزا و شاندەکان' : 'Visa & Delegation Travel'}</Link></li>
              <li><Link to={`/${lang}/summit/services/consultancy`} className="hover:text-brand-800">{lang === 'ar' ? 'الاستشارات الاستراتيجية والقانونية' : lang === 'zh' ? '战略咨询与跨国合规' : lang === 'ckb' ? 'ڕاوێژی یاسایی و دارایی' : 'Strategic Consultancy'}</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-800 dark:text-brand-400">
              {t('footerKnowledgePartner')}
            </h4>
            <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs space-y-2">
              <span className="font-bold text-neutral-900 dark:text-neutral-100 block">
                Chinese Institute for Strategic and Economic Studies
              </span>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                {lang === 'ar' ? 'الجهة الفكرية والبحثية الموجهة لأجندة القمة وتقارير الفرص القطاعية.' : lang === 'zh' ? '为峰会与博览会提供主权研究与宏观经济情报支撑。' : lang === 'ckb' ? 'دەسەڵاتی توێژینەوەی ستراتیژی و هەواڵگری ئابووری بۆ قەمت و پێشانگا.' : 'Sovereign research and macroeconomic intelligence powering the Summit & Expo.'}
              </p>
              <div className="pt-1 flex flex-wrap gap-2 text-[11px] font-bold">
                <Link to={`/${lang}/institute/data-hub/trade-explorer`} className="text-brand-700 dark:text-brand-300 hover:underline">{t('footerTradeExplorer')} →</Link>
                <Link to={`/${lang}/institute/data-hub/corridor-tracker`} className="text-brand-700 dark:text-brand-300 hover:underline">{t('footerCorridorTracker')} →</Link>
                <Link to={`/${lang}/institute/publications`} className="text-brand-700 dark:text-brand-300 hover:underline">{t('footerResearchPapers')} →</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © 2026 {SUMMIT_CANONICAL.formalTitle[lang]}. {t('footerAllRightsReserved')}
          </div>
          <div className="flex items-center gap-6">
            <Link to={`/${lang}/summit/faq`} className="hover:text-brand-800">{t('footerFaq')}</Link>
            <Link to={`/${lang}/summit/media`} className="hover:text-brand-800">{t('footerMediaCenter')}</Link>
            <Link to={`/${lang}/summit/contact`} className="hover:text-brand-800">{t('footerSecretariatContact')}</Link>
            <Link to={`/${lang}`} className="hover:text-brand-800">{t('footerIcaNewsroom')}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
