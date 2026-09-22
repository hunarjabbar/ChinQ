import React from 'react';
import { Link } from 'react-router-dom';
import { Locale } from '../../types';
import { Layers, ArrowUpRight, DollarSign, Building, CheckCircle2, ShieldAlert } from 'lucide-react';

interface CompactBriRegistryProps {
  lang: Locale;
}

export function CompactBriRegistry({ lang }: CompactBriRegistryProps) {
  const isRtl = lang === 'ar' || lang === 'ckb';

  const projects = [
    {
      title: { en: 'Grand Faw Port Container Terminal & Breakwater', ar: 'محطة حاويات ميناء الفاو الكبير وكاسر الأمواج', zh: '大公港一期集装箱码头与防波堤', ckb: 'بەندەری گەورەی فاو و بەربەستی شەپۆل' },
      sector: 'Infrastructure & Maritime',
      contractor: 'China Harbour Engineering / Daewoo',
      value: '$2.6B',
      stage: 'Phase 1 Commissioning'
    },
    {
      title: { en: 'Al-Khairat Heavy Crude Power Plant (1,400 MW)', ar: 'محطة كهرباء الخيرات للنفط الثقيل (١٤٠٠ ميغاواط)', zh: '海拉特重油火力发电站（1400兆瓦）', ckb: 'وێستگەی کارەبای خەیرات ١٤٠٠ مێگاوات' },
      sector: 'Energy & Power',
      contractor: 'PowerChina / Shanghai Electric',
      value: '$1.8B',
      stage: 'Operational Grid Linked'
    },
    {
      title: { en: 'Sulaymaniyah Tanjaro Eco-Industrial Park (Phase I)', ar: 'مجمع تانجرو الصناعي البيئي في السليمانية (المرحلة الأولى)', zh: '苏莱曼尼亚坦贾罗生态工业园（一期）', ckb: 'ناوچەی پیشەسازی تانجەرۆ لە سلێمانی' },
      sector: 'Manufacturing & Light Industry',
      contractor: 'Sulaymaniyah Governorate & Zhejiang Private Consortium',
      value: '$420M',
      stage: 'Shovel Ready'
    },
    {
      title: { en: 'Iraqi National 1,000 Model Schools Construction', ar: 'مشروع بناء ١٠٠٠ مدرسة نموذجية في عموم العراق', zh: '伊拉克千所示范学校国家建设项目', ckb: 'پڕۆژەی دروستکردنی ١٠٠٠ قوتابخانەی نموونەیی' },
      sector: 'Education & Civil Works',
      contractor: 'PowerChina / Sinohydro',
      value: '$1.4B',
      stage: '650+ Delivered'
    }
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-800 dark:text-brand-400" />
            <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
              {lang === 'ar' ? 'سجل مشاريع الحزام والطريق' : lang === 'zh' ? '智库重点项目库嵌入' : lang === 'ckb' ? 'تۆماری پڕۆژەکانی یەک پشتێنە و یەک ڕێگە' : 'Institute BRI Project Registry'}
            </span>
          </div>
          <h3 className="text-lg font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight mt-1">
            {lang === 'ar' ? 'المشاريع الاستراتيجية المشتركة قيد التنفيذ والترسية' : lang === 'zh' ? '在建与拟签约重大战略性中伊合作项目' : lang === 'ckb' ? 'پڕۆژە ستراتیژییە هاوبەشەکان' : 'Major Strategic Sino-Iraqi Sovereign & Private Projects'}
          </h3>
        </div>

        <Link
          to={`/${lang}/institute/data-hub/bri-projects`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black text-brand-800 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/50 hover:bg-brand-100 border border-brand-200 dark:border-brand-800 transition-colors"
        >
          <span>{lang === 'ar' ? 'استعراض كل المشاريع' : lang === 'zh' ? '查看全部项目数据库' : lang === 'ckb' ? 'هەموو پڕۆژەکان' : 'Full Registry'}</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((p, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/60 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-brand-100 dark:bg-brand-950 text-brand-900 dark:text-brand-300">
                {p.sector}
              </span>
              <span className="font-black text-sm text-emerald-700 dark:text-emerald-400">{p.value}</span>
            </div>
            <h4 className="text-xs font-black text-neutral-900 dark:text-neutral-100 leading-snug">
              {p.title[lang]}
            </h4>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 space-y-0.5 pt-1">
              <div><strong>EPC / Contractor:</strong> {p.contractor}</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-semibold"><strong>Status:</strong> {p.stage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
