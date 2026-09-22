import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { CompactCorridorTracker } from '../../components/summit/CompactCorridorTracker';
import { 
  Building2, MapPin, Globe, CheckCircle2, ShieldCheck, 
  Plane, Truck, ArrowRight, Award, Compass, Landmark, Briefcase
} from 'lucide-react';

export function SummitAboutSulaymaniyah() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const advantages = [
    {
      title: {
        en: 'Strategic Geographic Node & Border Gateways',
        ar: 'عقدة جغرافية استراتيجية ومنافذ حدودية رئيسية',
        zh: '战略性地理枢纽与多重陆路口岸辐射网络',
        ckb: 'پێگەی ستراتیژی جوگرافی و دەروازە سنورییەکان'
      },
      desc: {
        en: 'Direct access to Bashmakh and Parwizkhan international border crossings, handling over $6.5B in annual freight transit between regional markets.',
        ar: 'اتصال مباشر بمنفذي باشماخ وبرويزخان الدوليين، مع معالجة ترانزيت بضائع يتجاوز ٦.٥ مليار دولار سنوياً.',
        zh: '无缝连接巴什马克和帕尔维兹汗国家级一类陆路口岸，年过境货物吞吐总值逾65亿美元。',
        ckb: 'پەیوەندی ڕاستەوخۆ بە دەروازە سنورییەکانی باشماخ و پەروێزخان بە بەهای زیاتر لە ٦.٥ ملیار دۆلار ترانزێت.'
      }
    },
    {
      title: {
        en: 'Sister-City Partnership with Yiwu, Zhejiang',
        ar: 'اتفاقية توأمة وشراكة اقتصادية مع مدينة ييوو بمقاطعة تشيجيانغ',
        zh: '与中国浙江省义乌市缔结国际友好商贸姐妹城市',
        ckb: 'ڕێککەوتنی دەستەخوشکی و هاوبەشی ئابووری لەگەڵ شاری ییوو'
      },
      desc: {
        en: 'Active bilateral trade channel enabling direct logistics consolidation, customs pre-clearance, and wholesale merchant exchange.',
        ar: 'قناة تجارية ثنائية نشطة تتيح التجميع اللوجستي المباشر، والتخليص الجمركي المسبق، والتبادل التجاري بالجملة.',
        zh: '建立中伊常态化直通物流集拼专线、海关预通关便利机制及中小企业常态化互访。',
        ckb: 'کەناڵێکی بازرگانی چالاک بۆ گواستنەوەی ڕاستەوخۆ و ئاسانکاری گومرگی.'
      }
    },
    {
      title: {
        en: 'Premier Industrial Parks & Logistics Hubs',
        ar: 'مجمعات صناعية ومناطق لوجستية وموانئ جافة حديثة',
        zh: '成熟的高端生态工业园、保税物流与内陆干港网络',
        ckb: 'ناوچە پیشەسازییەکان و بەندەرە وشکانییەکان'
      },
      desc: {
        en: 'Over 800 hectares of industrial-zoned territory in Tanjaro and Tasluja equipped with 24/7 dedicated heavy electrical grids and gas pipelines.',
        ar: 'أكثر من ٨٠٠ هكتار من الأراضي المخصصة للصناعة في تانجرو وطاسلوجة مع شبكات كهرباء وغاز مخصصة.',
        zh: '坦贾罗与塔斯鲁贾两大重点园区规划逾800公顷，享24小时双回路工业重电与直通天然气管网。',
        ckb: 'زیاتر لە ٨٠٠ هێکتار زەوی پیشەسازی لە تانجەرۆ و تاسڵوجە بە کارەبا و گازی پیشەسازی بەردەوام.'
      }
    },
    {
      title: {
        en: 'Foreign Investment Protection & 10-Year Tax Holidays',
        ar: 'حماية كاملة للاستثمار الأجنبي وإعفاء ضريبي وجمركي لـ١٠ سنوات',
        zh: '极具竞争力的外商投资保护法案与10年全面税收免除',
        ckb: 'پاراستنی وەبەرهێنانی بیانی و لێخۆشبوونی باج بۆ ١٠ ساڵ'
      },
      desc: {
        en: '100% foreign ownership permitted under KRG Investment Law No. 4, accompanied by full profit repatriation in foreign currencies and 10-year corporate tax exemption.',
        ar: 'ملكية أجنبية بنسبة ١٠٠٪ بموجب قانون الاستثمار رقم ٤، مع حرية تحويل الأرباح بالكامل بالعملات الأجنبية وإعفاء ضريبي لمدة ١٠ سنوات.',
        zh: '投资法第4号法令支持100%外资独资控股、资本及合法利润自由跨境汇兑出入境，享十年企业所得税全免。',
        ckb: '١٠٠٪ خاوەندارێتی بیانی بەپێی یاسای وەبەرهێنان و گواستنەوەی ئازادانەی قازانج و ١٠ ساڵ لێخۆشبوون لە باج.'
      }
    }
  ];

  return (
    <SummitLayout lang={lang} activeNav="sulaymaniyah">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12">
        
        {/* Header Hero */}
        <section className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-800 dark:bg-brand-400"></span>
            <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
              {lang === 'ar' ? 'الموقع الاستراتيجي والفرص' : lang === 'zh' ? '举办地战略价值深度解析' : lang === 'ckb' ? 'پێگەی ستراتیژی و دەرفەتەکان' : 'Host City Strategic Profile'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
            {lang === 'ar' ? 'لماذا السليمانية؟ بوابة طريق الحرير في العراق' : lang === 'zh' ? '为何选择苏莱曼尼亚？伊拉克的新丝路门户' : lang === 'ckb' ? 'بۆچی سلێمانی؟ دەروازەی ڕێگای ئاوریشم لە عێراق' : 'Why Sulaymaniyah? Iraq’s Silk Road Gateway'}
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-4xl leading-relaxed">
            {lang === 'ar' 
              ? 'تجمع محافظة السليمانية بين الاستقرار الأمني العالي، والبيئة التشريعية الجاذبة للاستثمار، والربط اللوجستي الدولي عبر ممر طريق الحرير، مما يجعلها المنصة الطبيعية لاستضافة قمة ومعرض التعاون الاقتصادي العراقي الصيني.'
              : lang === 'zh'
              ? '苏莱曼尼亚汇聚得天独厚的地缘经贸枢纽位置、卓越的安全营商环境、与中国义乌的紧密友好城市纽带，以及极具吸引力的外资全权控股与十年免税政策，是中资企业布局伊拉克乃至更广阔中东腹地的首选高地。'
              : lang === 'ckb'
              ? 'پارێزگای سلێمانی خاوەنی ئارامی و ژینگەیەکی لەباری وەبەرهێنانە و وەک دەروازەیەکی سەرەکی ڕێگای ئاوریشم شوێنی نموونەییە بۆ بەستنی ئەم لووتکە ئابوورییە.'
              : 'Sulaymaniyah combines exceptional regional stability, liberal foreign investment statutes, deep industrial zones, and premier international border gateways.'}
          </p>
        </section>

        {/* 4 Pillars of Advantage */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advantages.map((adv, idx) => (
            <div key={idx} className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-800 dark:text-brand-400 flex items-center justify-center font-black">
                {idx + 1}
              </div>
              <h3 className="text-base font-black text-neutral-900 dark:text-neutral-100">
                {adv.title[lang]}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {adv.desc[lang]}
              </p>
            </div>
          ))}
        </section>

        {/* Embedded Corridor Tracker */}
        <CompactCorridorTracker lang={lang} />

        {/* Sulaymaniyah International Fairground Details */}
        <section className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-10 border border-neutral-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-400">
                Official Venue
              </span>
              <h2 className="text-xl sm:text-2xl font-black mt-1">
                {lang === 'ar' ? 'أرض معرض السليمانية الدولي (Tasluja Expo Grounds)' : lang === 'zh' ? '苏莱曼尼亚国际会展中心（Tasluja）' : lang === 'ckb' ? 'پێشانگای نێودەوڵەتی سلێمانی' : 'Sulaymaniyah International Fairground (Tasluja)'}
              </h2>
            </div>
            <Link
              to={`/${lang}/summit/expo/floor-plan`}
              className="px-4 py-2 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-black text-xs uppercase tracking-wider transition-colors"
            >
              Interactive Floor Plan →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-neutral-300">
            <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60 space-y-1.5">
              <div className="text-neutral-400 font-bold uppercase text-[10px]">Exhibition Space</div>
              <div className="text-xl font-black text-white">25,000 m²</div>
              <div className="text-[11px] text-neutral-400">Indoor Halls A/B/C + Outdoor Heavy Machinery Arena</div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60 space-y-1.5">
              <div className="text-neutral-400 font-bold uppercase text-[10px]">Airport Proximity</div>
              <div className="text-xl font-black text-white">18 Minutes</div>
              <div className="text-[11px] text-neutral-400">Direct VIP Shuttle from Sulaymaniyah Int'l Airport (ISU)</div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60 space-y-1.5">
              <div className="text-neutral-400 font-bold uppercase text-[10px]">Hotel & Hospitality</div>
              <div className="text-xl font-black text-white">5-Star Capacity</div>
              <div className="text-[11px] text-neutral-400">Grand Millennium Hotel & Highcrest Summit Partner Wings</div>
            </div>
          </div>
        </section>

      </div>
    </SummitLayout>
  );
}
