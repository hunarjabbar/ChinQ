import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { ICA_SERVICES } from '../../data/summitData';
import { 
  Briefcase, ArrowRight, ShieldCheck, CheckCircle2, 
  FileText, Building2, HelpCircle, ExternalLink, Sparkles
} from 'lucide-react';

export function SummitServiceDetailPage() {
  const { lang = 'en', slug } = useParams<{ lang: Locale; slug: string }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const service = ICA_SERVICES.find(s => s.slug === slug) || ICA_SERVICES[0];

  return (
    <SummitLayout lang={lang} activeNav="services">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold text-neutral-500">
          <Link to={`/${lang}/summit`} className="hover:text-brand-800">Summit</Link>
          <span>/</span>
          <Link to={`/${lang}/summit/services`} className="hover:text-brand-800">Services</Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-neutral-100">{service.title[lang]}</span>
        </div>

        {/* Service Header */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              {service.badge[lang]}
            </span>

            <Link
              to={`/${lang}/summit/services/request?service=${service.slug}`}
              className="px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-black text-xs uppercase tracking-wider transition-colors"
            >
              Request Service Engagement →
            </Link>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100">
              {service.title[lang]}
            </h1>
            <div className="text-sm font-bold text-brand-800 dark:text-brand-400 mt-2">
              {service.tagline[lang]}
            </div>
          </div>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-4xl leading-relaxed">
            {service.description[lang]}
          </p>
        </div>

        {/* Core Capabilities Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-neutral-900 dark:text-neutral-100">
            {lang === 'ar' ? 'القدرات والمزايا التنفيذية' : lang === 'zh' ? '核心服务能力与实施标准' : lang === 'ckb' ? 'توانا و تایبەتمەندییە سەرەکییەکان' : 'Core Operational Capabilities'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.capabilities[lang].map((cap, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 leading-snug">{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Guaranteed Deliverables */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-neutral-900 dark:text-neutral-100">
            {lang === 'ar' ? 'المخرجات والوثائق المسلمة للمستفيد' : lang === 'zh' ? '企业专属交付成果与合规凭据' : lang === 'ckb' ? 'بەڵگەنامە و ئەنجامە مسۆگەرکراوەکان' : 'Guaranteed Deliverables & Outputs'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.deliverables[lang].map((del, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-start gap-3">
                <FileText size={18} className="text-brand-800 dark:text-brand-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 leading-snug">{del}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Summit On-Site Role */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white border border-neutral-800 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-black uppercase tracking-widest text-brand-400">
              On-Site Summit Facilitation Desk
            </div>
            <h3 className="text-xl font-black">
              {service.summitRole[lang]}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Available throughout the 3-day Summit & Expo in Sulaymaniyah for live negotiations, contract seals, and regulatory clearances.
            </p>
          </div>

          <Link
            to={`/${lang}/summit/services/request?service=${service.slug}`}
            className="px-6 py-3 rounded-xl bg-brand-800 hover:bg-brand-700 text-white text-xs font-black uppercase tracking-wider transition-colors shrink-0"
          >
            Book On-Site Appointment →
          </Link>
        </div>

      </div>
    </SummitLayout>
  );
}
