import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, Newspaper, Film, ChevronRight, Sparkles } from 'lucide-react';
import { Locale } from '../types';

interface Props {
  lang: Locale;
  className?: string;
  variant?: 'cards' | 'ribbon';
}

export function DirectPortalAccess({ lang, className = '', variant = 'cards' }: Props) {
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';
  const isRtl = isAr || isCkb;

  const portals = [
    {
      id: 'newsroom',
      title: isAr ? 'غرفة الأخبار والتقارير' : isZh ? '国际新闻中心' : isCkb ? 'ژووری هەواڵ و ڕاپۆرت' : 'ICA Global Newsroom',
      subtitle: isAr ? 'سلك الأخبار الدبلوماسية والتغطية الشاملة' : isZh ? '主权电讯与深度双边战略报道' : isCkb ? 'تێلیگرافی دیپلۆماسی و ڕووماڵی گشتی' : 'Official Sovereign Wire & Bilateral Reporting',
      badge: isAr ? 'نشرات فورية' : isZh ? '实时电讯' : isCkb ? 'هەواڵی خێرا' : 'Live Wire',
      icon: Newspaper,
      href: `/${lang}/newsroom`,
      actionLabel: isAr ? 'دخول غرفة الأخبار' : isZh ? '进入新闻中心' : isCkb ? 'چوونە ژووری هەواڵ' : 'Access Newsroom',
      theme: {
        accentBorder: 'hover:border-brand-700',
        iconBg: 'bg-brand-50 text-brand-800 border-brand-100 group-hover:bg-brand-800 group-hover:text-white',
        badgeBg: 'bg-brand-50 text-brand-800 border-brand-200',
        titleHover: 'group-hover:text-brand-800',
        actionText: 'text-brand-800 group-hover:text-brand-900',
        arrowBg: 'bg-brand-50 text-brand-800 group-hover:bg-brand-800 group-hover:text-white',
        topBar: 'bg-brand-800'
      }
    },
    {
      id: 'live',
      title: isAr ? 'البوابة الحية والبث المباشر' : isZh ? '实时双边直播门户' : isCkb ? 'دەروازەی پەخشی ڕاستەوخۆ' : 'Live Portal & Broadcasting',
      subtitle: isAr ? 'تغطية تلفزيونية مباشرة، ندوات، وقمم ثنائية' : isZh ? '24小时高清双语视讯流与峰会实况' : isCkb ? 'پەخشی ڕاستەوخۆی ٢٤ کاتژمێری و کۆنفرانسەکان' : '24/7 Bilateral Transmission & Event Feeds',
      badge: isAr ? 'بث مباشر الآن' : isZh ? '正在直播' : isCkb ? 'ڕاستەوخۆ' : 'On Air Now',
      icon: Radio,
      href: `/${lang}/live`,
      actionLabel: isAr ? 'مشاهدة البث المباشر' : isZh ? '观看直播' : isCkb ? 'سەیری پەخش بکە' : 'Watch Live Broadcast',
      isLivePulse: true,
      theme: {
        accentBorder: 'hover:border-red-600',
        iconBg: 'bg-red-50 text-red-700 border-red-100 group-hover:bg-red-600 group-hover:text-white',
        badgeBg: 'bg-red-50 text-red-700 border-red-200',
        titleHover: 'group-hover:text-red-700',
        actionText: 'text-red-700 group-hover:text-red-800',
        arrowBg: 'bg-red-50 text-red-700 group-hover:bg-red-600 group-hover:text-white',
        topBar: 'bg-red-600'
      }
    },
    {
      id: 'media',
      title: isAr ? 'المركز الإعلامي والإنتاج' : isZh ? '融媒体制作中心' : isCkb ? 'ناوەندی میدیا و بەرهەمهێنان' : 'Media & Production Hub',
      subtitle: isAr ? 'أفلام وثائقية، بودكاست، وأرشيف الصور عالي الدقة' : isZh ? '深度纪录片、播客节目与高清图库' : isCkb ? 'دۆکیۆمێنتاری، پۆدکاست و ئەرشیفی وێنەیی' : 'Documentary Films, Podcasts & Press Assets',
      badge: isAr ? 'وسائط متعددة' : isZh ? '全媒体矩阵' : isCkb ? 'فرەمیدیا' : 'Multimedia',
      icon: Film,
      href: `/${lang}/media`,
      actionLabel: isAr ? 'استعراض الإنتاجات' : isZh ? '探索融媒体' : isCkb ? 'بگەڕێ لە میدیا' : 'Explore Media',
      theme: {
        accentBorder: 'hover:border-amber-600',
        iconBg: 'bg-amber-50 text-amber-800 border-amber-200 group-hover:bg-amber-600 group-hover:text-white',
        badgeBg: 'bg-amber-50 text-amber-900 border-amber-200',
        titleHover: 'group-hover:text-amber-800',
        actionText: 'text-amber-800 group-hover:text-amber-900',
        arrowBg: 'bg-amber-50 text-amber-800 group-hover:bg-amber-600 group-hover:text-white',
        topBar: 'bg-amber-600'
      }
    }
  ];

  if (variant === 'ribbon') {
    return (
      <div className={`w-full bg-slate-100 text-slate-800 border-b border-slate-200 py-2.5 px-4 ${className}`} dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-brand-800 font-bold uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-brand-800" />
            <span>{isAr ? 'البوابات الرسمية المباشرة:' : isZh ? '官方直达门户:' : isCkb ? 'دەروازە فەرمییەکان:' : 'Direct Portals:'}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {portals.map((p) => (
              <Link
                key={p.id}
                to={p.href}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-all text-xs font-bold text-slate-800 shadow-xs group"
              >
                <p.icon size={13} className="text-brand-800 group-hover:scale-110 transition-transform" />
                <span>{p.title}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono border border-slate-200">{p.badge}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={`w-full my-8 ${className}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-800 border border-brand-200 text-[11px] font-black uppercase tracking-wider mb-2">
              <Sparkles size={12} className="text-brand-800" />
              <span>{isAr ? 'الدخول المباشر للبوابات' : isZh ? '全线直达门户' : isCkb ? 'چوونەژوورەوەی ڕاستەوخۆ' : 'Direct Portal Gateways'}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isAr ? 'منصات الوكالة العراقية الصينية المتخصصة' : isZh ? '伊中通讯社三大核心传播平台' : isCkb ? 'سەکۆ تایبەتمەندەکانی ئاژانسی عێراقی-چینی' : 'Core Sovereign Broadcast & Information Platforms'}
            </h2>
          </div>
          <span className="text-xs text-slate-500 hidden sm:block">
            {isAr ? 'وصول فوري بنقرة واحدة لكافة المنصات' : isZh ? '一键直达，覆盖新闻、直播与融媒体' : isCkb ? 'دەستپێڕاگەیشتنی خێرا بە یەک کرتە' : 'One-click direct entry to news, live broadcast & production'}
          </span>
        </div>

        {/* 3 Prominent Light-Themed Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portals.map((portal) => (
            <Link
              key={portal.id}
              to={portal.href}
              className={`relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xs group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[220px] ${portal.theme.accentBorder}`}
            >
              {/* Top Sovereign Color Band */}
              <div className={`absolute top-0 inset-x-0 h-1.5 ${portal.theme.topBar}`}></div>

              <div className="relative z-10 space-y-4 pt-1">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all shadow-xs ${portal.theme.iconBg}`}>
                    <portal.icon size={22} className="shrink-0" />
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border font-mono ${portal.theme.badgeBg}`}>
                    {portal.isLivePulse && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                      </span>
                    )}
                    <span>{portal.badge}</span>
                  </span>
                </div>

                <div>
                  <h3 className={`text-lg sm:text-xl font-black tracking-tight text-slate-900 transition-colors ${portal.theme.titleHover}`}>
                    {portal.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
                    {portal.subtitle}
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-black transition-colors">
                <span className={portal.theme.actionText}>{portal.actionLabel}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${portal.theme.arrowBg}`}>
                  <ChevronRight size={15} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default DirectPortalAccess;
