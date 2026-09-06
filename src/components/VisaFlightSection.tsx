import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plane, ArrowRight } from 'lucide-react';
import { VisaFlightRecord } from '../types';

interface VisaFlightSectionProps {
  lang?: string;
}

const FALLBACK_VISA_FLIGHTS: VisaFlightRecord[] = [
  {
    id: 'fallback-visa-1',
    slug: 'china-iraq-kurdistan-evisa-express',
    titleEn: 'Sino-Iraqi & Kurdistan Diplomatic E-Visa & Visa on Arrival Protocol',
    titleAr: 'بروتوكول التأشيرة الإلكترونية والتأشيرة عند الوصول بين الصين والعراق وإقليم كردستان',
    titleZh: '中伊与库尔德斯坦电子签证与落地签双向绿色通道',
    titleCkb: 'پڕۆتۆکۆڵی ڤیزای ئەلیکترۆنی و ڤیزای کاتی گەیشتن لەنێوان چین، عێراق و هەرێمی کوردستان',
    serviceType: 'VISA_ASSISTANCE',
    originRegion: 'CHINA',
    destinationRegion: 'BILATERAL',
    summaryEn: 'Expedited consular visa support, multi-entry business visas, and instant E-Visa clearance for Chinese citizens and Iraqi delegates.',
    summaryAr: 'تسهيلات قنصلية سريعة، تأشيرات تجارية متعددة السفرات، وتخليص فوري للتأشيرة الإلكترونية للمواطنين والوفود التجارية.',
    summaryZh: '为中伊商务代表团提供快速领事签证协助、多年多次往返商务签及电子签便利。',
    summaryCkb: 'تسهیلاتی دەستبەجێی قونسوڵی و ڤیزای بازرگانی فرە-گەشت بۆ هاووڵاتیانی هەردوو وڵات.',
    detailsEn: '',
    detailsAr: '',
    detailsZh: '',
    detailsCkb: '',
    airlineOrAuthority: 'Ministry of Foreign Affairs & Consular Affairs',
    processingTime: '24 - 48 Hours E-Visa Clearance',
    feeOrCost: 'Consular E-Visa Fee: $75 USD',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000',
    officialLink: 'https://evisa.iq',
    isFeatured: true,
    isTrending: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'fallback-flight-2',
    slug: 'guangzhou-erbil-baghdad-direct-charters',
    titleEn: 'Guangzhou & Beijing to Baghdad & Erbil Direct Flight Routes',
    titleAr: 'الرحلات الجوية المباشرة بين غوانغتشو وبكين وبغداد وأربيل',
    titleZh: '广州/北京 至 巴格达/埃尔比勒 中伊直飞包机与航线网络',
    titleCkb: 'گەشتە ڕاستەوخۆکانی ئاسمانی لەنێوان گوانگژۆ، پەکین، بەغدا و هەولێر',
    serviceType: 'FLIGHT_ROUTE',
    originRegion: 'CHINA',
    destinationRegion: 'KURDISTAN',
    summaryEn: 'Direct passenger & cargo flights connecting Guangzhou Baiyun and Beijing Capital directly with Erbil and Baghdad.',
    summaryAr: 'رحلات ركاب وشحن مباشرة تربط مطار غوانغتشو بايون ومطار بكين بمطاري أربيل وبغداد الدوليين.',
    summaryZh: '定期客货运直飞航线，连接广州白云、北京首都与埃尔比勒及巴格达国际机场。',
    summaryCkb: 'گەشتە ڕاستەوخۆکانی نێوان گوانگژۆ و پەکین لەگەڵ فرۆکەخانەی نێودەوڵەتی هەولێر و بەغدا.',
    detailsEn: '',
    detailsAr: '',
    detailsZh: '',
    detailsCkb: '',
    airlineOrAuthority: 'Iraqi Airways & China Southern Airlines Joint Fleet',
    processingTime: '8.5 Hours Non-Stop Direct Flight',
    feeOrCost: 'Roundtrip Economy from $680 USD',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1000',
    officialLink: 'https://iraqiairways.iq',
    isFeatured: true,
    isTrending: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'fallback-concierge-3',
    slug: 'erbil-airport-diplomatic-visa-desk',
    titleEn: 'Erbil International Airport (EBL) Sino-Kurdish Diplomatic & Visa Concierge',
    titleAr: 'مكتب التسهيلات الدبلوماسية والتأشيرات بمطار أربيل الدولي',
    titleZh: '埃尔比勒国际机场 (EBL) 中库外交与商务签证专属服务台',
    titleCkb: 'کاونتەری تایبەتی دیپلۆماسی و ڤیزا لە فرۆکەخانەی نێودەوڵەتی هەولێر',
    serviceType: 'AIRPORT_CONCIERGE',
    originRegion: 'KURDISTAN',
    destinationRegion: 'CHINA',
    summaryEn: 'Located in the arrival terminal of Erbil International Airport, facilitating fast immigration and consular coordination.',
    summaryAr: 'يقع مكتب التسهيلات في صالة الوصول الرئيسية بمطار أربيل الدولي لتسهيل إجراءات الهجرة الفورية والتنسيق القنصلي.',
    summaryZh: '位于埃尔比勒国际机场到达大厅，为入境旅客提供即时边检快速通关与领事保护联动服务。',
    summaryCkb: 'کاونتەر لە هۆڵی گەیشتنی فرۆکەخانەی هەولێرە و خزمەتگوزاری ئاسانکاری پێشکەش دەکات.',
    detailsEn: '',
    detailsAr: '',
    detailsZh: '',
    detailsCkb: '',
    airlineOrAuthority: 'Erbil International Airport Aviation Authority',
    processingTime: '15 Minutes Terminal Fast-Track',
    feeOrCost: 'Complimentary for Pre-Registered Delegations',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1000',
    officialLink: 'https://erbilairport.com',
    isFeatured: true,
    isTrending: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const VisaFlightSection: React.FC<VisaFlightSectionProps> = ({ lang = 'en' }) => {
  const { data: items = FALLBACK_VISA_FLIGHTS, isLoading } = useQuery<VisaFlightRecord[]>({
    queryKey: ['featured-visa-flights-home'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/visa-flights?featured=true');
        if (!res.ok) {
          return FALLBACK_VISA_FLIGHTS;
        }
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.slice(0, 3);
        }
        return FALLBACK_VISA_FLIGHTS;
      } catch {
        // Fallback gracefully without logging console error that interrupts preview
        return FALLBACK_VISA_FLIGHTS;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
    placeholderData: FALLBACK_VISA_FLIGHTS
  });

  const getLocalizedTitle = (item: VisaFlightRecord) => {
    if (lang === 'ar') return item.titleAr || item.titleEn;
    if (lang === 'zh') return item.titleZh || item.titleEn;
    if (lang === 'ckb') return item.titleCkb || item.titleAr || item.titleEn;
    return item.titleEn;
  };

  const getLocalizedSummary = (item: VisaFlightRecord) => {
    if (lang === 'ar') return item.summaryAr || item.summaryEn;
    if (lang === 'zh') return item.summaryZh || item.summaryEn;
    if (lang === 'ckb') return item.summaryCkb || item.summaryAr || item.summaryEn;
    return item.summaryEn;
  };

  const t = {
    en: {
      badge: "SINO-IRAQI & KURDISTAN AVIATION & VISA HUB",
      title: "Direct Flight Routes & E-Visa Green Channels",
      subtitle: "Streamlined visa assistance, fast-track consular clearance, and direct air passenger and freight charters connecting China, Baghdad, and Erbil.",
      viewPortal: "Explore Full Visa & Flight Portal",
      processing: "Processing / Flight Time",
      tariff: "Tariff / Price"
    },
    ar: {
      badge: "مركز الطيران والتأشيرات بين الصين والعراق وكردستان",
      title: "الرحلات الجوية المباشرة والقنوات الخضراء للتأشيرة",
      subtitle: "تسهيلات التأشيرة الإلكترونية، التخليص القنصلي السريع، وخطوط الطيران المباشرة بين الصين وبغداد وأربيل.",
      viewPortal: "استكشاف بوابة الفيزا والطيران الكاملة",
      processing: "وقت المعالجة / الطيران",
      tariff: "الرسوم / السعر"
    },
    zh: {
      badge: "中伊与库尔德斯坦民航与领事通道",
      title: "直飞航线与电子签证绿色通道",
      subtitle: "提供便利电子签证协助、机场领事快速通关及广州/北京直飞巴格达与埃尔比勒定期航班与特快货运服务。",
      viewPortal: "进入完整签证与航班门户",
      processing: "办理 / 飞行时长",
      tariff: "领事资费 / 票价"
    },
    ckb: {
      badge: "سەنتەری فڕین و ڤیزای چین، عێراق و کوردستان",
      title: "گەشتە ئاسمانییە ڕاستەوخۆکان و کەناڵی سەوزی ڤیزا",
      subtitle: "ئاسانکاری ڤیزای ئەلیکترۆنی و گەشتی ڕاستەوخۆی ئاسمانی بۆ چین، بەغدا و هەولێر.",
      viewPortal: "پۆرتالی تەواوی ڤیزا و گەشتەکان",
      processing: "ماوەی ڕاپەڕاندن / فڕین",
      tariff: "کرێ / تێچوو"
    }
  }[lang as 'en' | 'ar' | 'zh' | 'ckb'] || {
    badge: "SINO-IRAQI & KURDISTAN AVIATION & VISA HUB",
    title: "Direct Flight Routes & E-Visa Green Channels",
    subtitle: "Streamlined visa assistance, fast-track consular clearance, and direct air passenger and freight charters connecting China, Baghdad, and Erbil.",
    viewPortal: "Explore Full Visa & Flight Portal",
    processing: "Processing / Flight Time",
    tariff: "Tariff / Price"
  };

  if (isLoading && items.length === 0) return null;

  return (
    <section className="w-full bg-gray-50 dark:bg-neutral-800/80 p-6 sm:p-8 border-l-4 border-brand-800 relative overflow-hidden rounded-xs shadow-sm">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-brand-100/30 dark:from-brand-900/20 via-transparent to-transparent"></div>

      <div className="w-full relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800/30 text-brand-800 dark:text-brand-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Plane className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-ink-900 dark:text-white tracking-tight">
              {t.title}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <Link
            to={`/${lang}/visa-flights`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-800 text-white hover:bg-brand-900 dark:bg-brand-700 dark:hover:bg-brand-600 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm hover:shadow-md shrink-0"
          >
            <span>{t.viewPortal}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-brand-800/50 dark:hover:border-brand-500/50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group"
            >
              <div className="relative h-44 overflow-hidden bg-brand-900">
                <img
                  src={item.imageUrl}
                  alt={getLocalizedTitle(item)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <span className="absolute bottom-3 left-3 bg-brand-900/90 text-white border border-white/20 text-xs font-mono font-bold px-2.5 py-1 rounded-md shadow-sm">
                  {item.originRegion} → {item.destinationRegion}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-mono font-bold text-brand-800 dark:text-brand-400 uppercase tracking-wider">
                    {item.serviceType.replace('_', ' ')}
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-ink-900 dark:text-white group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug">
                    {getLocalizedTitle(item)}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                    {getLocalizedSummary(item)}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-neutral-500 dark:text-neutral-400 block text-xs uppercase tracking-wider">{t.processing}</span>
                    <span className="font-bold text-ink-900 dark:text-white">{item.processingTime}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500 dark:text-neutral-400 block text-xs uppercase tracking-wider">{t.tariff}</span>
                    <span className="font-bold text-ink-900 dark:text-white">{item.feeOrCost}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
