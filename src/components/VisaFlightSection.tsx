import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Globe, ShieldCheck, ArrowRight, Clock, Ticket, ExternalLink, Sparkles } from 'lucide-react';
import { VisaFlightRecord } from '../types';

interface VisaFlightSectionProps {
  lang?: string;
}

export const VisaFlightSection: React.FC<VisaFlightSectionProps> = ({ lang = 'en' }) => {
  const [items, setItems] = useState<VisaFlightRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/visa-flights?featured=true')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setItems(data.slice(0, 3));
        }
      })
      .catch(err => console.error("Error loading featured visa & flight items:", err))
      .finally(() => setLoading(false));
  }, []);

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

  if (loading) return null;

  return (
    <section className="py-16 bg-slate-950 border-t border-b border-indigo-950/60 my-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-indigo-900/15 via-transparent to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Plane className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {t.title}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              {t.subtitle}
            </p>
          </div>

          <Link
            to={`/${lang}/visa-flights`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-indigo-600/25 shrink-0"
          >
            <span>{t.viewPortal}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all flex flex-col group"
            >
              <div className="relative h-44 overflow-hidden bg-slate-950">
                <img
                  src={item.imageUrl}
                  alt={getLocalizedTitle(item)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <span className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-700 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-md">
                  {item.originRegion} → {item.destinationRegion}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest">
                    {item.serviceType.replace('_', ' ')}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                    {getLocalizedTitle(item)}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {getLocalizedSummary(item)}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">{t.processing}</span>
                    <span className="font-bold text-slate-200">{item.processingTime}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block text-[10px]">{t.tariff}</span>
                    <span className="font-bold text-emerald-400">{item.feeOrCost}</span>
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
