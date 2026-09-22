import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { ICA_SERVICES } from '../../data/summitData';
import { 
  Briefcase, ArrowRight, ShieldCheck, CheckCircle2, 
  PackageSearch, CreditCard, Shield, Plane, Scale, Building2
} from 'lucide-react';

export function SummitServicesPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  return (
    <SummitLayout lang={lang} activeNav="services">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12">
        
        {/* Header Hero */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-brand-800 dark:text-brand-400" />
            <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
              {lang === 'ar' ? 'المنظومة التنفيذية لخدمات الوكالة' : lang === 'zh' ? 'ICA中伊全链路商贸直采服务体系' : lang === 'ckb' ? 'سیستەمی خزمەتگوزارییەکانی ICA' : 'ICA Bilateral Trade Enablement Verticals'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
            {lang === 'ar' ? 'الخدمات الخمس المتكاملة للتجارة والاستثمار' : lang === 'zh' ? '护航每一笔中伊贸易与投资落地的五大直采服务' : lang === 'ckb' ? '٥ خزمەتگوزاری سەرەکی بۆ بازرگانی و وەبەرهێنان' : '5 Integrated Trade & Investment Service Verticals'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            {lang === 'ar'
              ? 'صُممت هذه الخدمات لتذليل كافة العوائق الإجرائية، اللوجستية، المالية، والقانونية أمام الشركات الصينية والمشترين العراقيين، مما يحول مذكرات التفاهم إلى عقود نافذة مضمونة السداد.'
              : 'End-to-end commercial architecture eliminating counterparty friction, clearing bottlenecks, and regulatory complexities between Chinese manufacturers and Iraqi buyers.'}
          </p>

          <div className="pt-2">
            <Link
              to={`/${lang}/summit/services/request`}
              className="px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-black text-xs uppercase tracking-wider transition-colors inline-block"
            >
              Submit Unified Service Request →
            </Link>
          </div>
        </div>

        {/* 5 Service Verticals Detailed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ICA_SERVICES.map((srv, idx) => (
            <div
              key={srv.id}
              className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-brand-600 transition-all shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-800 dark:text-brand-400 flex items-center justify-center font-black">
                    {idx + 1}
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    {srv.badge[lang]}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-neutral-900 dark:text-neutral-100">
                    {srv.title[lang]}
                  </h3>
                  <div className="text-xs font-bold text-brand-800 dark:text-brand-400 mt-1">
                    {srv.tagline[lang]}
                  </div>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {srv.description[lang]}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 uppercase">Key Deliverables:</div>
                  {srv.deliverables[lang].slice(0, 3).map((feat, fidx) => (
                    <div key={fidx} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <Link
                  to={`/${lang}/summit/services/${srv.slug}`}
                  className="text-xs font-bold text-brand-800 dark:text-brand-400 hover:underline flex items-center gap-1"
                >
                  <span>Detailed Specifications</span>
                  <ArrowRight size={13} className={isRtl ? 'rotate-180' : ''} />
                </Link>
                <Link
                  to={`/${lang}/summit/services/request?service=${srv.slug}`}
                  className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-800 dark:text-neutral-200 text-xs font-bold transition-colors"
                >
                  Request Service
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </SummitLayout>
  );
}
