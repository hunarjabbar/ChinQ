import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Locale } from '../../types';
import { TrendingUp, ArrowUpRight, BarChart3, Database, Globe, RefreshCw } from 'lucide-react';

interface CompactTradeExplorerProps {
  lang: Locale;
}

export function CompactTradeExplorer({ lang }: CompactTradeExplorerProps) {
  const isRtl = lang === 'ar' || lang === 'ckb';
  const [selectedFlow, setSelectedFlow] = useState<'both' | 'iraq_export' | 'china_export'>('both');

  const tradeData = [
    { year: '2021', iraqToChina: 28.4, chinaToIraq: 10.8, total: 39.2 },
    { year: '2022', iraqToChina: 39.1, chinaToIraq: 13.9, total: 53.0 },
    { year: '2023', iraqToChina: 34.2, chinaToIraq: 14.5, total: 48.7 },
    { year: '2024', iraqToChina: 37.8, chinaToIraq: 15.6, total: 53.4 },
    { year: '2025 (Est)', iraqToChina: 41.2, chinaToIraq: 17.1, total: 58.3 },
    { year: '2026 (Proj)', iraqToChina: 45.0, chinaToIraq: 19.5, total: 64.5 }
  ];

  const topImports = [
    { name: { en: 'Industrial Machinery & Mechanical Parts', ar: 'الآلات الصناعية وقطع الغيار', zh: '工业机械设备及零部件', ckb: 'ئامێرە پیشەسازییەکان' }, val: '$4.8B', share: '31%' },
    { name: { en: 'Electronics & Telecommunications', ar: 'الإلكترونيات ومعدات الاتصالات', zh: '电子信息与通信设备', ckb: 'ئەلیکترۆنیات و پەیوەندییەکان' }, val: '$3.2B', share: '21%' },
    { name: { en: 'Vehicles & Automotive Components', ar: 'المركبات وقطع غيار السيارات', zh: '汽车整车及零配件', ckb: 'ئۆتۆمبێل و پارچەی یەدەگ' }, val: '$2.4B', share: '15%' },
    { name: { en: 'Iron, Steel & Construction Materials', ar: 'الحديد والصلب ومواد البناء', zh: '钢铁冶金与建筑建材', ckb: 'ئاسن و کەرەستەی بیناسازی' }, val: '$2.1B', share: '14%' },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-brand-800 dark:text-brand-400" />
            <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
              {lang === 'ar' ? 'مستودع بيانات المعهد الصيني' : lang === 'zh' ? '智库数据中心嵌入' : lang === 'ckb' ? 'سەنتەری داتای پەیمانگا' : 'Institute Data Hub Embed'}
            </span>
          </div>
          <h3 className="text-lg font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight mt-1">
            {lang === 'ar' ? 'مستكشف التبادل التجاري الثنائي (العراق - الصين)' : lang === 'zh' ? '中伊双边贸易全景透视器（2021–2026）' : lang === 'ckb' ? 'داتای بازرگانی دوولایەنەی عێراق و چین' : 'Bilateral Trade Explorer (Iraq–China)'}
          </h3>
        </div>

        <Link
          to={`/${lang}/institute/data-hub/trade-explorer`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black text-brand-800 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/50 hover:bg-brand-100 border border-brand-200 dark:border-brand-800 transition-colors"
        >
          <span>{lang === 'ar' ? 'فتح في مركز البيانات' : lang === 'zh' ? '进入完整数据中心' : lang === 'ckb' ? 'کردنەوە لە ناوەندی داتا' : 'Full Explorer'}</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Trade Highlights Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-700/60">
          <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase">
            {lang === 'ar' ? 'إجمالي التجارة (٢٠٢٥)' : lang === 'zh' ? '2025预估双边贸易额' : lang === 'ckb' ? 'کۆی بازرگانی ٢٠٢٥' : '2025 Total Bilateral'}
          </div>
          <div className="text-2xl font-black text-neutral-900 dark:text-neutral-50 mt-1">$58.3B</div>
          <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">+9.2% YoY Growth</div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-700/60">
          <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase">
            {lang === 'ar' ? 'الواردات من الصين' : lang === 'zh' ? '伊拉克自华进口额' : lang === 'ckb' ? 'هاوردەکردن لە چین' : 'Chinese Exports to Iraq'}
          </div>
          <div className="text-2xl font-black text-neutral-900 dark:text-neutral-50 mt-1">$17.1B</div>
          <div className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 mt-0.5">Manufactured & Tech</div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-700/60">
          <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase">
            {lang === 'ar' ? 'صادرات النفط للصين' : lang === 'zh' ? '伊拉克对华原油出口' : lang === 'ckb' ? 'هەناردەی نەوت بۆ چین' : 'Iraqi Crude Exports'}
          </div>
          <div className="text-2xl font-black text-neutral-900 dark:text-neutral-50 mt-1">$41.2B</div>
          <div className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 mt-0.5">Top 3 China Supplier</div>
        </div>

        <div className="p-4 rounded-xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-200/60 dark:border-brand-800/60">
          <div className="text-[11px] font-bold text-brand-900 dark:text-brand-300 uppercase">
            {lang === 'ar' ? 'هدف قمة السليمانية' : lang === 'zh' ? '2026峰会签约目标' : lang === 'ckb' ? 'ئامانجی لووتکە' : 'Summit Deal Target'}
          </div>
          <div className="text-2xl font-black text-brand-800 dark:text-brand-400 mt-1">$3.5B+</div>
          <div className="text-[10px] font-semibold text-brand-700 dark:text-brand-300 mt-0.5">Across 11 Sectors</div>
        </div>
      </div>

      {/* Bar Chart Visualizer */}
      <div className="space-y-3 pt-2">
        <div className="text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
          {lang === 'ar' ? 'تطور التبادل التجاري السنوي (مليار دولار)' : lang === 'zh' ? '双边贸易历年增长轨迹（十亿美元）' : lang === 'ckb' ? 'گەشەی ساڵانەی بازرگانی (ملیار دۆلار)' : 'Annual Bilateral Flow Progression ($ Billions)'}
        </div>
        <div className="space-y-2">
          {tradeData.map((d, i) => (
            <div key={i} className="flex items-center gap-3 text-xs">
              <span className="w-20 font-bold text-neutral-600 dark:text-neutral-400 shrink-0">{d.year}</span>
              <div className="flex-1 h-6 bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden flex">
                <div 
                  style={{ width: `${(d.chinaToIraq / 70) * 100}%` }} 
                  className="bg-brand-700 hover:bg-brand-600 transition-all flex items-center justify-end px-1.5 text-[10px] font-black text-white"
                  title={`Chinese Exports: $${d.chinaToIraq}B`}
                >
                  ${d.chinaToIraq}B
                </div>
                <div 
                  style={{ width: `${(d.iraqToChina / 70) * 100}%` }} 
                  className="bg-emerald-700 hover:bg-emerald-600 transition-all flex items-center justify-end px-1.5 text-[10px] font-black text-white"
                  title={`Iraqi Exports: $${d.iraqToChina}B`}
                >
                  ${d.iraqToChina}B
                </div>
              </div>
              <span className="w-16 text-right font-black text-neutral-900 dark:text-neutral-100 shrink-0">${d.total}B</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6 pt-2 text-[11px] text-neutral-500">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-brand-700"></span>
            <span>{lang === 'ar' ? 'صادرات الصين للعراق (سلع وتقنية)' : lang === 'zh' ? '中国对伊出口（制成品与高科技）' : lang === 'ckb' ? 'هەناردەی چین بۆ عێراق' : 'Chinese Exports to Iraq (Goods & Tech)'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-700"></span>
            <span>{lang === 'ar' ? 'صادرات العراق للصين (طاقة وبتروكيماويات)' : lang === 'zh' ? '伊拉克对华出口（原油与石化）' : lang === 'ckb' ? 'هەناردەی عێراق بۆ چین' : 'Iraqi Exports to China (Energy & Petrochemicals)'}</span>
          </div>
        </div>
      </div>

      {/* Top Chinese Export Sectors Matching Expo */}
      <div className="border-t border-neutral-100 dark:border-neutral-800 pt-4">
        <div className="text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-3">
          {lang === 'ar' ? 'أبرز القطاعات المستهدفة في المعرض الثنائي' : lang === 'zh' ? '博览会核心采购类别与市场份额' : lang === 'ckb' ? 'کەرتە سەرەکییەکان لە پێشانگا' : 'Top Bilateral Import Categories Represented in Expo'}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {topImports.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 text-xs">
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">{item.name[lang]}</span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-black text-neutral-900 dark:text-neutral-100">{item.val}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">{item.share}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
