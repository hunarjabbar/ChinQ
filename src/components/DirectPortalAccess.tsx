import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, Newspaper, Film, Sparkles } from 'lucide-react';
import { Locale } from '../types';
import { BroadcastPlatformCard, BroadcastPortalItem } from './BroadcastPlatformCard';

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

  const portals: BroadcastPortalItem[] = [
    {
      id: 'newsroom',
      title: isAr ? 'غرفة الأخبار والتقارير' : isZh ? '国际新闻中心' : isCkb ? 'ژووری هەواڵ و ڕاپۆرت' : 'ICA Global Newsroom',
      subtitle: isAr ? 'سلك الأخبار الدبلوماسية والتغطية الشاملة' : isZh ? '主权电讯与深度双边战略报道' : isCkb ? 'تێلیگرافی دیپلۆماسی و ڕووماڵی گشتی' : 'Official Sovereign Wire & Bilateral Reporting',
      badge: isAr ? 'نشرات فورية' : isZh ? '实时电讯' : isCkb ? 'هەواڵی خێرا' : 'Live Wire',
      icon: Newspaper,
      href: `/${lang}/newsroom`,
      actionLabel: isAr ? 'دخول غرفة الأخبار' : isZh ? '进入新闻中心' : isCkb ? 'چوونە ژووری هەواڵ' : 'Access Newsroom',
      themeType: 'newsroom'
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
      themeType: 'live'
    },
    {
      id: 'media',
      title: isAr ? 'المركز الإعلامي والإنتاج' : isZh ? '融媒体制作中心' : isCkb ? 'ناوەندی میدیا و بەرهەمهێنان' : 'Media & Production Hub',
      subtitle: isAr ? 'أفلام وثائقية، بودكاست، وأرشيف الصور عالي الدقة' : isZh ? '深度纪录片、播客节目与高清图库' : isCkb ? 'دۆکیۆمێنتاری، پۆدکاست و ئەرشیفی وێنەیی' : 'Documentary Films, Podcasts & Press Assets',
      badge: isAr ? 'وسائط متعددة' : isZh ? '全媒体矩阵' : isCkb ? 'فرەمیدیا' : 'Multimedia',
      icon: Film,
      href: `/${lang}/media`,
      actionLabel: isAr ? 'استعراض الإنتاجات' : isZh ? '探索融媒体' : isCkb ? 'بگەڕێ لە میدیا' : 'Explore Media',
      themeType: 'media'
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
    <section className={`w-full my-8 bg-white dark:bg-white ${className}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-red-100 dark:border-brand-900/30 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 dark:bg-brand-950/60 dark:text-red-400 border border-red-200/80 dark:border-brand-900/60 text-[11px] font-black uppercase tracking-wider mb-2">
              <Sparkles size={12} className="text-red-600 dark:text-red-400" />
              <span>{isAr ? 'الدخول المباشر للبوابات' : isZh ? '全线直达门户' : isCkb ? 'چوونەژوورەوەی ڕاستەوخۆ' : 'Direct Portal Gateways'}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isAr ? 'منصات الوكالة العراقية الصينية المتخصصة' : isZh ? '伊中通讯社三大核心传播平台' : isCkb ? 'سەکۆ تایبەتمەندەکانی ئاژانسی عێراقی-چینی' : 'Core Sovereign Broadcast & Information Platforms'}
            </h2>
          </div>
          <span className="text-xs text-red-600/70 dark:text-red-400/70 hidden sm:block font-bold">
            {isAr ? 'وصول فوري بنقرة واحدة لكافة المنصات' : isZh ? '一键直达，覆盖新闻、直播与融媒体' : isCkb ? 'دەستپێڕاگەیشتنی خێرا بە یەک کرتە' : 'One-click direct entry to news, live broadcast & production'}
          </span>
        </div>

        {/* Upgraded 3 Broadcast & Information Platforms Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {portals.map((portal) => (
            <BroadcastPlatformCard
              key={portal.id}
              portal={portal}
              isRtl={isRtl}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default DirectPortalAccess;
