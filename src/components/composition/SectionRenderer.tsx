import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Radio, Activity, BarChart3, Globe, TrendingUp, 
  Layers, BookOpen, LineChart, Users, Film, Calendar, 
  Building2, Mail, Smartphone, ExternalLink, ChevronRight, 
  Play, Download, CheckCircle, Clock, ArrowUpRight, ShieldCheck,
  Eye, Edit3
} from 'lucide-react';
import { 
  PageSectionModel, 
  SectionItemModel, 
  CanonicalSectionType,
  safeJsonParse, 
  getLocalizedText 
} from '../../types/composition';
import { Locale } from '../../types';
import { StyleOverrides } from '../../types/controlModel';

interface SectionRendererProps {
  section: PageSectionModel;
  lang?: Locale | string;
  isPreview?: boolean;
  onEdit?: () => void;
  className?: string;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  lang = 'en',
  isPreview = false,
  onEdit,
  className = ''
}) => {
  // If hidden and not in preview mode, don't render
  if (section.visibility === 'hidden' && !isPreview) {
    return null;
  }

  // Parse config and style overrides
  const config = safeJsonParse<Record<string, any>>(section.config, {});
  const styleOverrides = safeJsonParse<StyleOverrides>(section.styleOverride, {});
  const items = section.items || [];

  // Compute inline styles from overrides
  const customStyle: React.CSSProperties = {
    backgroundColor: styleOverrides.backgroundColor || undefined,
    color: styleOverrides.textColor || undefined,
    borderColor: styleOverrides.borderColor || undefined,
    borderRadius: styleOverrides.borderRadius || undefined,
    padding: styleOverrides.padding || undefined,
    margin: styleOverrides.margin || undefined,
    boxShadow: styleOverrides.shadow || undefined
  };

  const isRtl = lang === 'ar' || lang === 'ckb';

  return (
    <div 
      className={`relative group transition-all duration-300 ${section.visibility === 'hidden' ? 'opacity-60 border-2 border-dashed border-amber-400' : ''} ${className}`}
      style={customStyle}
      data-section-id={section.id}
      data-section-type={section.type}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Admin Quick Indicator / Edit Badge in Preview */}
      {isPreview && (
        <div className="absolute top-3 end-3 z-30 flex items-center gap-2 bg-ink-950/85 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-white/20 shadow-lg pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="uppercase tracking-wider">{section.type}</span>
          {section.visibility === 'hidden' && (
            <span className="text-amber-400">(HIDDEN)</span>
          )}
          {onEdit && (
            <button
              onClick={onEdit}
              className="ms-1 hover:text-brand-400 transition-colors cursor-pointer flex items-center gap-1"
              title="Edit in CISE Command Hub"
            >
              <Edit3 size={11} />
            </button>
          )}
        </div>
      )}

      {/* Render the specific canonical type */}
      {renderCanonicalType(section.type as CanonicalSectionType, section, items, config, lang)}
    </div>
  );
};

function renderCanonicalType(
  type: CanonicalSectionType,
  section: PageSectionModel,
  items: SectionItemModel[],
  config: Record<string, any>,
  lang: string
) {
  switch (type) {
    case 'hero':
      return <RenderHero section={section} items={items} config={config} lang={lang} />;
    case 'live-broadcast':
      return <RenderLiveBroadcast section={section} items={items} config={config} lang={lang} />;
    case 'ticker':
      return <RenderTicker section={section} items={items} config={config} lang={lang} />;
    case 'stats-strip':
      return <RenderStatsStrip section={section} items={items} config={config} lang={lang} />;
    case 'world-stories':
      return <RenderWorldStories section={section} items={items} config={config} lang={lang} />;
    case 'trending':
      return <RenderTrending section={section} items={items} config={config} lang={lang} />;
    case 'strategic-initiatives':
      return <RenderStrategicInitiatives section={section} items={items} config={config} lang={lang} />;
    case 'featured-publications':
      return <RenderFeaturedPublications section={section} items={items} config={config} lang={lang} />;
    case 'data-snapshot':
      return <RenderDataSnapshot section={section} items={items} config={config} lang={lang} />;
    case 'expert-spotlight':
      return <RenderExpertSpotlight section={section} items={items} config={config} lang={lang} />;
    case 'media-preview':
      return <RenderMediaPreview section={section} items={items} config={config} lang={lang} />;
    case 'upcoming-events':
      return <RenderUpcomingEvents section={section} items={items} config={config} lang={lang} />;
    case 'partners-marquee':
      return <RenderPartnersMarquee section={section} items={items} config={config} lang={lang} />;
    case 'newsletter-signup':
      return <RenderNewsletterSignup section={section} items={items} config={config} lang={lang} />;
    case 'app-download-pwa':
      return <RenderAppDownloadPwa section={section} items={items} config={config} lang={lang} />;
    default:
      return <RenderFallbackSection section={section} items={items} lang={lang} />;
  }
}

// ================= 1. HERO =================
function RenderHero({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  const item = items[0] || {};
  const headline = getLocalizedText(item.title, lang, 'Sino-Iraqi Sovereign Partnership & Strategic Gateway');
  const eyebrow = getLocalizedText(item.subtitle, lang, 'OFFICIAL BILATERAL DIPLOMATIC & ECONOMIC GATEWAY');
  const body = getLocalizedText(item.body, lang, 'Direct sovereign intelligence, economic integration rails, and strategic partnership.');
  const ctaLabel = getLocalizedText(item.ctaLabel, lang, 'Explore Initiatives');
  const ctaHref = item.ctaHref || `/${lang}/initiatives`;
  const bgImage = item.image || '/images/hero-diplomatic.jpg';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ink-950 via-ink-900 to-black text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-800/40">
      <div className="absolute inset-0 z-0 opacity-25">
        <div 
          className="absolute inset-0 bg-cover bg-center filter brightness-50"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-radial from-brand-950/60 via-transparent to-black/90"></div>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-900/80 border border-brand-700/60 text-brand-200 text-xs font-bold tracking-widest uppercase">
          <Sparkles size={13} className="text-amber-400" />
          <span>{eyebrow}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight font-serif">
          {headline}
        </h1>
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
          {body}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to={ctaHref}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-800 hover:bg-brand-700 active:scale-95 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-brand-900/30"
          >
            <span>{ctaLabel}</span>
            <ChevronRight size={16} />
          </Link>
          <Link
            to={`/${lang}/settlement`}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl text-sm transition-all border border-white/20 backdrop-blur-sm"
          >
            <span>{lang === 'ar' ? 'بوابة التسوية' : lang === 'zh' ? '结算网关' : lang === 'ckb' ? 'دەروازەی پاکتاو' : 'Settlement Gateway'}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ================= 2. LIVE BROADCAST =================
function RenderLiveBroadcast({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  const item = items[0] || {};
  const title = getLocalizedText(item.title, lang, 'ON AIR: Baghdad-Beijing Diplomatic Chamber Forum 2026');
  const subtitle = getLocalizedText(item.subtitle, lang, 'Simultaneous 4K Quad-Lingual Transmission');
  const ctaLabel = getLocalizedText(item.ctaLabel, lang, 'Join Broadcast Stream');
  const ctaHref = item.ctaHref || `/${lang}/live`;

  return (
    <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-ink-950 text-white py-3.5 px-4 sm:px-8 border-y border-brand-700/50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-start">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-red-600 text-white text-[11px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest shadow-sm">
            <Radio size={14} className="animate-pulse" />
            <span>LIVE</span>
          </div>
          <div>
            <span className="text-sm font-bold text-white tracking-wide">{title}</span>
            <span className="hidden sm:inline-block ms-2 text-xs text-brand-200">| {subtitle}</span>
          </div>
        </div>
        <Link
          to={ctaHref}
          className="inline-flex items-center gap-2 text-xs font-bold text-white bg-black/40 hover:bg-black/60 px-4 py-2 rounded-lg border border-white/20 transition-all shrink-0"
        >
          <Play size={13} className="text-red-400 fill-current" />
          <span>{ctaLabel}</span>
        </Link>
      </div>
    </div>
  );
}

// ================= 3. TICKER =================
function RenderTicker({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  return (
    <div className="bg-neutral-900 text-neutral-200 py-2.5 px-4 border-b border-neutral-800 text-xs font-sans">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-brand-400 font-black uppercase tracking-wider shrink-0 bg-brand-950/60 px-2 py-1 rounded">
          <Activity size={13} />
          <span>WIRE</span>
        </div>
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-8 whitespace-nowrap">
          {items.map((item, idx) => {
            const headline = getLocalizedText(item.title, lang, `Telegraph dispatch #${idx + 1}`);
            return (
              <Link 
                key={item.id || idx}
                to={item.ctaHref || `/${lang}/newsroom`}
                className="hover:text-white transition-colors flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                <span>{headline}</span>
                <ArrowUpRight size={11} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ================= 4. STATS STRIP =================
function RenderStatsStrip({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  return (
    <section className="bg-white dark:bg-neutral-950 py-10 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {items.map((it, idx) => {
          const val = getLocalizedText(it.title, lang, '0');
          const lbl = getLocalizedText(it.subtitle, lang, 'Metric');
          return (
            <div key={it.id || idx} className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800/80">
              <div className="text-2xl sm:text-4xl font-black text-brand-800 dark:text-brand-500 tracking-tight font-serif mb-1">
                {val}
              </div>
              <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                {lbl}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ================= 5. WORLD STORIES =================
function RenderWorldStories({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <Globe className="text-brand-700" size={24} />
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white font-serif">
              {getLocalizedText(section.name, lang, 'World Stories & Strategic Analysis')}
            </h2>
          </div>
          <Link to={`/${lang}/newsroom`} className="text-xs font-bold text-brand-800 dark:text-brand-400 hover:underline flex items-center gap-1">
            <span>{lang === 'ar' ? 'عرض الكل' : lang === 'zh' ? '查看全部' : lang === 'ckb' ? 'هەمووی ببینە' : 'View All'}</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, idx) => {
            const title = getLocalizedText(it.title, lang, 'Diplomatic Dossier');
            const body = getLocalizedText(it.body, lang, '');
            return (
              <div key={it.id || idx} className="bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div className="space-y-3">
                  <div className="text-[11px] font-black text-brand-700 uppercase tracking-widest">
                    BILATERAL INTELLIGENCE
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white leading-snug">
                    {title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                    {body}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <Link to={it.ctaHref || `/${lang}/newsroom`} className="text-xs font-bold text-brand-800 hover:text-brand-700 flex items-center gap-1">
                    <span>{lang === 'ar' ? 'قراءة التحليل' : lang === 'zh' ? '深度研读' : lang === 'ckb' ? 'خوێندنەوەی شیکاری' : 'Read Dossier'}</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= 6. TRENDING =================
function RenderTrending({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="text-brand-800" size={22} />
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white font-serif">
            {getLocalizedText(section.name, lang, 'Trending Bilateral Decrees & Policy Papers')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, idx) => {
            const title = getLocalizedText(it.title, lang, 'Trending Highlight');
            return (
              <Link
                key={it.id || idx}
                to={it.ctaHref || `/${lang}/newsroom`}
                className="flex items-start gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-brand-700 bg-neutral-50/50 dark:bg-neutral-900/40 transition-colors group"
              >
                <span className="text-2xl font-black text-neutral-300 dark:text-neutral-700 group-hover:text-brand-700 transition-colors shrink-0 font-serif">
                  0{idx + 1}
                </span>
                <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-brand-800 transition-colors leading-snug">
                  {title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= 7. STRATEGIC INITIATIVES =================
function RenderStrategicInitiatives({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-400">
            <Layers size={14} />
            <span>CISE SOVEREIGN FLAGSHIPS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
            {getLocalizedText(section.name, lang, 'Eight Sovereign Bilateral Initiatives')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, idx) => {
            const title = getLocalizedText(it.title, lang, 'Strategic Initiative');
            const subtitle = getLocalizedText(it.subtitle, lang, '');
            return (
              <Link
                key={it.id || idx}
                to={it.ctaHref || `/${lang}/initiatives`}
                className="p-6 rounded-2xl bg-black/40 border border-neutral-800 hover:border-brand-700 hover:bg-neutral-800/50 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-900/60 border border-brand-700/60 flex items-center justify-center text-brand-300 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {subtitle}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-bold text-brand-400">
                  <span>{lang === 'ar' ? 'استكشف المبادرة' : lang === 'zh' ? '查看举措' : lang === 'ckb' ? 'دەستپێشخەری ببینە' : 'Access Initiative'}</span>
                  <ChevronRight size={15} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= 8. FEATURED PUBLICATIONS =================
function RenderFeaturedPublications({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <BookOpen className="text-brand-800" size={24} />
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white font-serif">
              {getLocalizedText(section.name, lang, 'Peer-Reviewed Strategic Publications')}
            </h2>
          </div>
          <Link to={`/${lang}/institute/publications`} className="text-xs font-bold text-brand-800 hover:underline flex items-center gap-1">
            <span>{lang === 'ar' ? 'أرشيف الدراسات' : lang === 'zh' ? '学术报告库' : lang === 'ckb' ? 'ئەرشیفی توێژینەوە' : 'Publications Archive'}</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, idx) => {
            const title = getLocalizedText(it.title, lang, 'Research Study');
            const body = getLocalizedText(it.body, lang, '');
            return (
              <div key={it.id || idx} className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="inline-block text-[10px] font-black uppercase tracking-wider text-brand-700 bg-brand-50 dark:bg-brand-950/60 px-2 py-0.5 rounded">
                    PEER-REVIEWED
                  </span>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                    {body}
                  </p>
                </div>
                <Link to={it.ctaHref || `/${lang}/institute/publications`} className="text-xs font-bold text-brand-800 hover:underline flex items-center gap-1">
                  <Download size={13} />
                  <span>{lang === 'ar' ? 'تحميل الوثيقة' : lang === 'zh' ? '下载全文' : lang === 'ckb' ? 'دابەزاندنی فایل' : 'Download Dossier'}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= 9. DATA SNAPSHOT =================
function RenderDataSnapshot({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <LineChart className="text-brand-400" size={22} />
          <h2 className="text-xl sm:text-2xl font-black text-white font-serif">
            {getLocalizedText(section.name, lang, 'Real-Time Economic & Corridor Data Telemetry')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((it, idx) => {
            const title = getLocalizedText(it.title, lang, '');
            const subtitle = getLocalizedText(it.subtitle, lang, '');
            return (
              <div key={it.id || idx} className="p-6 rounded-2xl bg-black/50 border border-neutral-800 space-y-2">
                <div className="text-2xl sm:text-3xl font-black text-brand-400 font-serif">
                  {title}
                </div>
                <div className="text-xs text-neutral-400 font-medium">
                  {subtitle}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= 10. EXPERT SPOTLIGHT =================
function RenderExpertSpotlight({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <Users className="text-brand-800" size={24} />
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white font-serif">
            {getLocalizedText(section.name, lang, 'Bilateral Senior Fellows & Accredited Experts')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, idx) => {
            const name = getLocalizedText(it.title, lang, 'Fellow Name');
            const title = getLocalizedText(it.subtitle, lang, 'Senior Fellow');
            const bio = getLocalizedText(it.body, lang, '');
            return (
              <div key={it.id || idx} className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="w-12 h-12 rounded-full bg-brand-900 text-white font-black flex items-center justify-center text-base">
                  {name.charAt(0)}
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  {name}
                </h3>
                <div className="text-xs text-brand-700 dark:text-brand-400 font-semibold">
                  {title}
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                  {bio}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= 11. MEDIA PREVIEW =================
function RenderMediaPreview({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-neutral-950 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <Film className="text-brand-400" size={24} />
            <h2 className="text-2xl font-black text-white font-serif">
              {getLocalizedText(section.name, lang, '4K Documentary Reels & Leadership Dialogues')}
            </h2>
          </div>
          <Link to={`/${lang}/media`} className="text-xs font-bold text-brand-400 hover:underline flex items-center gap-1">
            <span>{lang === 'ar' ? 'المركز الإعلامي' : lang === 'zh' ? '融媒体中心' : lang === 'ckb' ? 'ناوەندی میدیا' : 'Media Center'}</span>
            <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, idx) => {
            const title = getLocalizedText(it.title, lang, 'Documentary Video');
            const sub = getLocalizedText(it.subtitle, lang, '');
            return (
              <Link key={it.id || idx} to={it.ctaHref || `/${lang}/media`} className="group space-y-3">
                <div className="aspect-video rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center relative overflow-hidden group-hover:border-brand-700 transition-colors">
                  <Play size={36} className="text-white/80 group-hover:text-brand-400 group-hover:scale-110 transition-transform" />
                  <span className="absolute bottom-2 end-2 text-[10px] bg-black/80 px-2 py-0.5 rounded text-neutral-300 font-mono">
                    4K HDR
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors leading-snug">
                  {title}
                </h3>
                <div className="text-xs text-neutral-400">{sub}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= 12. UPCOMING EVENTS =================
function RenderUpcomingEvents({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <Calendar className="text-brand-800" size={24} />
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white font-serif">
              {getLocalizedText(section.name, lang, 'Upcoming Bilateral Summits & Forums')}
            </h2>
          </div>
          <Link to={`/${lang}/summit`} className="text-xs font-bold text-brand-800 hover:underline flex items-center gap-1">
            <span>{lang === 'ar' ? 'جدول الفعاليات' : lang === 'zh' ? '峰会议程' : lang === 'ckb' ? 'بەرنامەی لووتکە' : 'Summit Agenda'}</span>
            <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, idx) => {
            const title = getLocalizedText(it.title, lang, 'Bilateral Forum');
            const venue = getLocalizedText(it.subtitle, lang, 'Sulaymaniyah / Beijing');
            const desc = getLocalizedText(it.body, lang, '');
            return (
              <div key={it.id || idx} className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-700">
                  <Clock size={13} />
                  <span>2026 CALENDAR</span>
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white leading-snug">
                  {title}
                </h3>
                <div className="text-xs text-neutral-500 font-medium">{venue}</div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                  {desc}
                </p>
                <div className="pt-3">
                  <Link to={it.ctaHref || `/${lang}/summit`} className="text-xs font-bold text-brand-800 hover:underline">
                    {lang === 'ar' ? 'التسجيل والحضور' : lang === 'zh' ? '参会报名' : lang === 'ckb' ? 'تۆمارکردن' : 'Register Attendee'} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= 13. PARTNERS MARQUEE =================
function RenderPartnersMarquee({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto space-y-6 text-center">
        <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500">
          <Building2 size={14} />
          <span>{getLocalizedText(section.name, lang, 'Accredited Sovereign Partners & Ministries')}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {items.map((it, idx) => {
            const name = getLocalizedText(it.title, lang, `Partner ${idx + 1}`);
            return (
              <div key={it.id || idx} className="px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-300 shadow-xs">
                {name}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= 14. NEWSLETTER SIGNUP =================
function RenderNewsletterSignup({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  const item = items[0] || {};
  const title = getLocalizedText(item.title, lang, 'Subscribe to Diplomatic Telegraph Dispatches');
  const body = getLocalizedText(item.body, lang, 'Direct daily intelligence wires for licensed delegates and corporate executives.');
  const cta = getLocalizedText(item.ctaLabel, lang, 'Subscribe Now');

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brand-950 to-ink-950 text-white border-b border-brand-800">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <Mail size={32} className="mx-auto text-brand-400" />
        <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
          {title}
        </h2>
        <p className="text-sm text-neutral-300 max-w-xl mx-auto">
          {body}
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder={lang === 'ar' ? 'أدخل البريد المؤسسي...' : lang === 'zh' ? '输入企业工作邮箱...' : lang === 'ckb' ? 'ئیمەیڵ بنووسە...' : 'Enter enterprise email...'}
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-neutral-400 text-sm focus:outline-none focus:border-brand-400"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-brand-800 hover:bg-brand-700 font-bold text-white rounded-xl text-sm transition-all shrink-0 cursor-pointer shadow-md"
          >
            {cta}
          </button>
        </form>
      </div>
    </section>
  );
}

// ================= 15. APP DOWNLOAD PWA =================
function RenderAppDownloadPwa({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  const item = items[0] || {};
  const title = getLocalizedText(item.title, lang, 'Deploy Sovereign Encrypted PWA to Mobile');
  const body = getLocalizedText(item.body, lang, 'Instant installation with biometric authentication and offline telegraph caching.');
  const cta = getLocalizedText(item.ctaLabel, lang, 'Install Secure PWA');

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-4xl mx-auto rounded-3xl bg-neutral-900 text-white p-8 sm:p-12 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-lg">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-400 uppercase tracking-widest">
            <Smartphone size={15} />
            <span>PROGRESSIVE WEB APPLICATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {body}
          </p>
        </div>
        <button
          onClick={() => {
            if (window.confirm('Launch PWA Installation flow?')) {
              console.log('Triggered PWA install');
            }
          }}
          className="px-6 py-4 bg-brand-800 hover:bg-brand-700 active:scale-95 text-white font-bold rounded-2xl text-sm transition-all shadow-xl shadow-brand-900/40 shrink-0 cursor-pointer flex items-center gap-2"
        >
          <Smartphone size={18} />
          <span>{cta}</span>
        </button>
      </div>
    </section>
  );
}

// ================= FALLBACK =================
function RenderFallbackSection({ section, items, lang }: { section: PageSectionModel; items: SectionItemModel[]; lang: string }) {
  return (
    <section className="py-10 px-4 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-300 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest">
          Generic Section Type: {section.type}
        </div>
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-serif">
          {getLocalizedText(section.name, lang, section.name)}
        </h3>
        <div className="text-xs text-neutral-600 dark:text-neutral-400">
          Items count: {items.length}
        </div>
      </div>
    </section>
  );
}
