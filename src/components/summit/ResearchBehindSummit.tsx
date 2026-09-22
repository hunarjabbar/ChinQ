import React from 'react';
import { Link } from 'react-router-dom';
import { Locale } from '../../types';
import { BookOpen, FileText, ArrowRight, UserCheck, ShieldCheck, Download, Award, Sparkles } from 'lucide-react';

interface ResearchBehindSummitProps {
  lang: Locale;
}

export function ResearchBehindSummit({ lang }: ResearchBehindSummitProps) {
  const isRtl = lang === 'ar' || lang === 'ckb';

  const flagshipReports = [
    {
      title: {
        en: 'The Sulaymaniyah Corridor: Silk Road Trade Nodes & Industrial Park Integration (2026)',
        ar: 'ممر السليمانية: عقد تجارة طريق الحرير والتكامل الصناعي للمجمعات الاقتصادية (٢٠٢٦)',
        zh: '苏莱曼尼亚走廊：丝路贸易枢纽与特种工业园区深度整合战略报告（2026）',
        ckb: 'ڕێڕەوی سلێمانی: وێستگەکانی بازرگانی ڕێگای ئاوریشم و ناوچە پیشەسازییەکان (٢٠٢٦)'
      },
      tag: 'Summit Special Monograph',
      author: 'Prof. Dr. Chen Jingyuan & Dr. Ziyad Al-Husseini',
      pages: '84 Pages',
      downloads: '1,420+'
    },
    {
      title: {
        en: 'Monetary Architecture: Direct IQD/CNY Clearing & Trade Finance Mechanics',
        ar: 'الهندسة النقدية: آليات المقاصة المباشرة بالدينار واليوان والتمويل التجاري',
        zh: '双边货币新架构：中伊本币直接清算、信用证承兑与汇率风险对冲全案',
        ckb: 'سیستەمی دراو: پاکتاوی ڕاستەوخۆ بە دینار و یوان و تەمویلی بازرگانی'
      },
      tag: 'Policy Brief',
      author: 'Lin Yue & Monetary Systems Team',
      pages: '48 Pages',
      downloads: '2,150+'
    },
    {
      title: {
        en: 'Iraq 11 Sectors Opportunity Brief & Chinese Capital Matchmaking Guide',
        ar: 'دليل الفرص الاستثمارية في ١١ قطاعاً عراقياً ودليل جذب رأس المال الصيني',
        zh: '伊拉克11大重点产业投资机遇深度简报与对华商贸对接指引',
        ckb: 'ڕێبەری دەرفەتی وەبەرهێنان لە ١١ کەرتدا و ڕاکێشانی سەرمایەی چینی'
      },
      tag: 'Expo Official Guide',
      author: 'Institute Strategic Fellows Pool',
      pages: '112 Pages',
      downloads: '3,800+'
    }
  ];

  return (
    <section className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 border border-brand-800/50 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-800/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/60 border border-brand-700/60 text-[11px] font-black uppercase tracking-widest text-brand-300">
              <Award size={14} className="text-amber-300" />
              <span>{lang === 'ar' ? 'الأبحاث والإنتاج الفكري خلف القمة' : lang === 'zh' ? '智库背书 · 峰会学术与政策研究底座' : lang === 'ckb' ? 'توێژینەوە زانستییەکانی پشت لووتکە' : 'Knowledge Engine Behind the Summit'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {lang === 'ar' ? 'المعهد الصيني للدراسات الاستراتيجية والاقتصادية' : lang === 'zh' ? 'Chinese Institute for Strategic and Economic Studies' : lang === 'ckb' ? 'پەیمانگای چین بۆ توێژینەوەی ستراتیژی و ئابووری' : 'Chinese Institute for Strategic and Economic Studies'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              {lang === 'ar' 
                ? 'توجه أبحاث المعهد ونماذجه الاقتصادية المستقلة أجندة جلسات القمة وتوفر بيانات التدقيق المالي والتجاري للعارضين والمستثمرين.' 
                : lang === 'zh' 
                ? '研究院资深学者团队深度主导峰会议题设置，输出权威宏观经济模型与11大产业可行性尽调报告。' 
                : lang === 'ckb' 
                ? 'توێژینەوەکانی پەیمانگا کارنامەی لووتکە دیاری دەکەن و داتای بازرگانی بۆ بەشداربووان دابین دەکەن.' 
                : 'Powering the summit agenda with independent macroeconomic modeling, sector opportunity briefs, and policy memoranda.'}
            </p>
          </div>

          <Link
            to={`/${lang}/institute`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
          >
            <span>{lang === 'ar' ? 'دخول بوابة المعهد' : lang === 'zh' ? '访问研究院主站' : lang === 'ckb' ? 'چوونە ناو پەیمانگا' : 'Enter Institute Portal'}</span>
            <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
          </Link>
        </div>

        {/* Flagship Policy Publications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flagshipReports.map((report, idx) => (
            <div key={idx} className="bg-neutral-800/80 rounded-2xl p-6 border border-neutral-700/80 flex flex-col justify-between space-y-4 hover:border-brand-600/70 transition-all group">
              <div className="space-y-3">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-brand-950 text-brand-300 border border-brand-800/60 inline-block">
                  {report.tag}
                </span>
                <h3 className="text-sm font-black text-white group-hover:text-brand-300 transition-colors leading-snug">
                  {report.title[lang]}
                </h3>
                <div className="text-[11px] text-neutral-400 space-y-1">
                  <div><strong>Author:</strong> {report.author}</div>
                  <div><strong>Length:</strong> {report.pages}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-700/60 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-bold text-[11px]">{report.downloads} Downloads</span>
                <Link
                  to={`/${lang}/institute/publications`}
                  className="text-brand-300 hover:text-white font-bold flex items-center gap-1 group-hover:underline"
                >
                  <span>Read Paper</span>
                  <ArrowRight size={13} className={isRtl ? 'rotate-180' : ''} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Neutrality & Independence Guarantee */}
        <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-neutral-300">
              <strong>Institute Neutrality Guarantee:</strong> All summit sector data, valuation benchmarks, and policy communiqués are prepared independently under academic peer-review standards.
            </span>
          </div>
          <Link
            to={`/${lang}/institute/about`}
            className="text-neutral-400 hover:text-white font-bold underline whitespace-nowrap"
          >
            Independence Charter →
          </Link>
        </div>
      </div>
    </section>
  );
}
