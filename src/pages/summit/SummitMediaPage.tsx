import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { Newspaper, Camera, Download, CheckCircle2, ArrowRight, Video } from 'lucide-react';

export function SummitMediaPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const [accredited, setAccredited] = useState(false);

  return (
    <SummitLayout lang={lang} activeNav="media">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12">
        
        {/* Header Hero */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-brand-800 dark:text-brand-400" />
            <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
              {lang === 'ar' ? 'المركز الإعلامي والاعتماد الصحفي' : lang === 'zh' ? '峰会国际媒体中心与记者认证' : lang === 'ckb' ? 'ناوەندی میدیا و مۆڵەتی ڕۆژنامەوانی' : 'International Media Center & Press Passes'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
            {lang === 'ar' ? 'المركز الصحفي وحزم الأخبار الرسمية' : lang === 'zh' ? '新闻通稿、智库学者专访预约与媒体证件申请' : lang === 'ckb' ? 'ناوەندی هەواڵ و چاوپێکەوتن' : 'Press Releases & Media Accreditation'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            {lang === 'ar'
              ? 'يوفر المركز الإعلامي للقمة في السليمانية استوديوهات بث مباشر، وخدمات الترجمة الفورية للمؤتمرات الصحفية، ومواعيد حصرية لمقابلة وزراء وباحثي المعهد الصيني.'
              : 'Dedicated media suites equipped with 1Gbps fiber uplinks, 4K broadcast studios, and direct access to ministerial press conferences.'}
          </p>
        </div>

        {/* Press Releases Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-neutral-900 dark:text-neutral-100">
            {lang === 'ar' ? 'البيانات الصحفية الرسمية' : lang === 'zh' ? '官方新闻公报' : lang === 'ckb' ? 'ڕاگەیەندراوە فەرمییەکان' : 'Official Press Communiqués'}
          </h2>

          <div className="space-y-3">
            {[
              {
                date: 'October 14, 2026',
                title: {
                  en: 'Chinese Institute for Strategic and Economic Studies Confirms 11 Sector Policy Papers for Sulaymaniyah Summit',
                  ar: 'المعهد الصيني للدراسات الاستراتيجية والاقتصادية يقر ١١ ورقة سياسات قطاعية لقمة السليمانية',
                  zh: '智库正式发布2026苏莱曼尼亚中伊峰会11大产业可行性宏观报告',
                  ckb: 'پەیمانگای چین ١١ توێژینەوەی ستراتیژی بۆ لووتکەی سلێمانی ئامادە دەکات'
                }
              },
              {
                date: 'September 28, 2026',
                title: {
                  en: 'Over 200 Chinese Manufacturing Giants Finalize Booth Space for Sulaymaniyah Bilateral Expo',
                  ar: 'أكثر من ٢٠٠ شركة صناعية صينية كبرى تؤكد حجز أجنحتها في معرض السليمانية الثنائي',
                  zh: '逾200家中国领军实体制造企业锁定苏莱曼尼亚双边博览会参展展位',
                  ckb: 'زیاتر لە ٢٠٠ کۆمپانیای گەورەی چینی شوێنی خۆیان لە پێشانگای سلێمانی گرت'
                }
              }
            ].map((p, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-neutral-400">{p.date}</span>
                  <h3 className="text-sm font-black text-neutral-900 dark:text-neutral-100">{p.title[lang]}</h3>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-xs font-bold transition-colors cursor-pointer">
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SummitLayout>
  );
}
