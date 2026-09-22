import React from 'react';
import { Link } from 'react-router-dom';
import { Locale } from '../../types';
import { Truck, MapPin, ArrowUpRight, Compass, CheckCircle2, Clock } from 'lucide-react';

interface CompactCorridorTrackerProps {
  lang: Locale;
}

export function CompactCorridorTracker({ lang }: CompactCorridorTrackerProps) {
  const isRtl = lang === 'ar' || lang === 'ckb';

  const corridors = [
    {
      name: { en: 'Yiwu–Sulaymaniyah Express Cargo Line', ar: 'خط الشحن السريع ييوو — السليمانية', zh: '义乌—苏莱曼尼亚快运直通线', ckb: 'هێڵی خێرای بارهەڵگری ییوو — سلێمانی' },
      type: 'Sister-City Dedicated Channel',
      transitTime: '14 Days (Multimodal Maritime/Rail)',
      status: 'OPERATIONAL',
      volume: '18,500 TEU / Year',
      keyHubs: 'Yiwu → Ningbo Port → Bandar Abbas / Grand Faw → Bashmakh Dry Port → Sulaymaniyah'
    },
    {
      name: { en: 'Basra Grand Faw — Sulaymaniyah Rail Spine', ar: 'محور سكك حديد ميناء الفاو الكبير — السليمانية', zh: '大公港—苏莱曼尼亚铁路主干支线', ckb: 'هێڵی ئاسنی بەندەری فاو — سلێمانی' },
      type: 'Development Road Package C',
      transitTime: '8 Hours (High Speed Freight)',
      status: 'UNDER CONSTRUCTION',
      volume: 'Capacity: 3.5M Tons/Year',
      keyHubs: 'Grand Faw Port → Nasiriyah → Baghdad Logistics Hub → Kirkuk → Tanjaro Dry Port'
    },
    {
      name: { en: 'Guangzhou–Erbil/Sulaymaniyah Air Cargo Corridor', ar: 'ممر الشحن الجوي قوانغتشو — أربيل/السليمانية', zh: '广州—埃尔比勒/苏莱曼尼亚航空货运走廊', ckb: 'ڕێڕەوی باری ئاسمانی گوانگژۆ — سلێمانی' },
      type: 'Express High-Value & Tech Freight',
      transitTime: '12 Hours direct flight',
      status: 'SCHEDULED 3x WEEKLY',
      volume: 'High-Value Electronics & Pharma',
      keyHubs: 'Guangzhou Baiyun Airport → Sulaymaniyah Cargo Terminal (ISU)'
    }
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-brand-800 dark:text-brand-400" />
            <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
              {lang === 'ar' ? 'مرصد الممرات اللوجستية' : lang === 'zh' ? '智库走廊监测系统嵌入' : lang === 'ckb' ? 'چاودێری ڕێڕەوەکانی گواستنەوە' : 'Institute Corridor Tracker'}
            </span>
          </div>
          <h3 className="text-lg font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight mt-1">
            {lang === 'ar' ? 'ممرات الشحن والتجارة عبر السليمانية وطريق الحرير' : lang === 'zh' ? '苏莱曼尼亚丝路物流大通道实时监测' : lang === 'ckb' ? 'ڕێڕەوە بازرگانییەکانی سلێمانی و ڕێگای ئاوریشم' : 'Sulaymaniyah Silk Road Trade & Transit Corridors'}
          </h3>
        </div>

        <Link
          to={`/${lang}/institute/data-hub/corridor-tracker`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black text-brand-800 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/50 hover:bg-brand-100 border border-brand-200 dark:border-brand-800 transition-colors"
        >
          <span>{lang === 'ar' ? 'عرض المرصد الكامل' : lang === 'zh' ? '查看走廊完整地图' : lang === 'ckb' ? 'نەخشەی تەواوی ڕێڕەوەکان' : 'Full Corridor Map'}</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="space-y-4">
        {corridors.map((c, i) => (
          <div key={i} className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/60 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-800 text-white flex items-center justify-center shrink-0">
                  <Truck size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-neutral-900 dark:text-neutral-100">{c.name[lang]}</h4>
                  <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400">{c.type}</span>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase ${
                c.status === 'OPERATIONAL' || c.status.startsWith('SCHEDULED')
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' 
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
              }`}>
                {c.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                <Clock size={14} className="text-brand-800 dark:text-brand-400 shrink-0" />
                <span><strong>Transit:</strong> {c.transitTime}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span><strong>Capacity:</strong> {c.volume}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-400 flex items-start gap-2">
              <MapPin size={13} className="text-brand-800 shrink-0 mt-0.5" />
              <span><strong>Routing:</strong> {c.keyHubs}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
