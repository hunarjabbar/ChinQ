import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CulturalExchangeProgram, Locale } from '../../../types';
import {
  GraduationCap, Building2, Calendar, Clock, ArrowLeft, ArrowRight,
  Share2, CheckCircle2, Award, FileText, Send, HelpCircle, ShieldCheck
} from 'lucide-react';

export function CulturalExchangeProgramDetail() {
  const { lang = 'en', slug } = useParams<{ lang: Locale; slug: string }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  const [copiedLink, setCopiedLink] = React.useState(false);

  const { data: program, isLoading, isError } = useQuery<CulturalExchangeProgram>({
    queryKey: ['cultural-program-detail', slug],
    queryFn: async () => {
      const res = await fetch(`/api/cultural-exchange/programs/${slug}`);
      if (!res.ok) throw new Error('Program not found');
      return res.json();
    }
  });

  const getProgramTitle = (p?: CulturalExchangeProgram) => {
    if (!p) return '';
    if (lang === 'ar' && p.titleAr) return p.titleAr;
    if (lang === 'zh' && p.titleZh) return p.titleZh;
    if (lang === 'ckb' && p.titleCkb) return p.titleCkb;
    return p.titleEn;
  };

  const getProgramDesc = (p?: CulturalExchangeProgram) => {
    if (!p) return '';
    if (lang === 'ar' && p.descriptionAr) return p.descriptionAr;
    if (lang === 'zh' && p.descriptionZh) return p.descriptionZh;
    if (lang === 'ckb' && p.descriptionCkb) return p.descriptionCkb;
    return p.descriptionEn;
  };

  const getProgramDetails = (p?: CulturalExchangeProgram) => {
    if (!p) return '';
    if (lang === 'ar' && p.detailsAr) return p.detailsAr;
    if (lang === 'zh' && p.detailsZh) return p.detailsZh;
    if (lang === 'ckb' && p.detailsCkb) return p.detailsCkb;
    return p.detailsEn || p.descriptionEn;
  };

  const t = {
    backToPrograms: lang === 'ar' ? 'العودة لدليل البرامج' : lang === 'zh' ? '返回全部交流项目' : lang === 'ckb' ? 'گەڕانەوە بۆ بەرنامەکان' : 'Back to Programs',
    applyForProgram: lang === 'ar' ? 'تقديم طلب الالتحاق' : lang === 'zh' ? '立即申请此项目' : lang === 'ckb' ? 'پێشکەشکردنی داواکاری' : 'Apply for this Program',
    share: lang === 'ar' ? 'مشاركة الرابط' : lang === 'zh' ? '分享项目' : lang === 'ckb' ? 'هاوبەشکردن' : 'Share Dossier',
    copied: lang === 'ar' ? 'تم النسخ!' : lang === 'zh' ? '已复制！' : lang === 'ckb' ? 'کۆپی کرا!' : 'Copied!',
    dossierHeading: lang === 'ar' ? 'الملف الأكاديمي والمحتوى التفصيلي' : lang === 'zh' ? '项目学术培养大纲与实施方案' : lang === 'ckb' ? 'وردەکارییە ئەکادیمییەکان' : 'Academic Curriculum & Dossier',
    eligibilityHeading: lang === 'ar' ? 'معايير القبول والفئات المستهدفة' : lang === 'zh' ? '申报资格与遴选要求' : lang === 'ckb' ? 'مەرجەکانی وەرگرتن' : 'Target Audience & Eligibility Criteria',
    timelineHeading: lang === 'ar' ? 'الجدول الزمني والمواعيد' : lang === 'zh' ? '时间节点与关键日期' : lang === 'ckb' ? 'خشتەی کات' : 'Timeline & Critical Deadlines',
    credentialsHeading: lang === 'ar' ? 'الشهادات والاعتماد' : lang === 'zh' ? '学分认证与结业证书' : lang === 'ckb' ? 'بڕوانامەی دانپێدانراو' : 'Accreditation & Joint Certification',
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
        <div className="h-8 bg-paper-200 dark:bg-paper-800 rounded w-1/3 animate-pulse" />
        <div className="h-64 bg-paper-200 dark:bg-paper-800 rounded-3xl animate-pulse" />
        <div className="h-32 bg-paper-200 dark:bg-paper-800 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (isError || !program) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <GraduationCap className="w-16 h-16 mx-auto text-paper-400" />
        <h1 className="text-2xl font-black text-paper-950 dark:text-paper-50">Program Dossier Not Found</h1>
        <p className="text-sm text-paper-600 dark:text-paper-400">The requested exchange program dossier may have been updated or moved.</p>
        <Link
          to={`/${lang}/institute/services/cultural-exchange/programs`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-800 text-white font-bold text-xs uppercase tracking-wider"
        >
          <span>{t.backToPrograms}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col font-sans pb-20">
      {/* Header Banner */}
      <div className="relative bg-[var(--color-ink-900)] text-white pt-10 pb-16 overflow-hidden border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6">
            <Link
              to={`/${lang}/institute/services/cultural-exchange/programs`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white transition"
            >
              {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{t.backToPrograms}</span>
            </Link>
          </div>

          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>{program.category?.nameEn || 'Bilateral Program'}</span>
              <span className="opacity-40">•</span>
              <span>CISE Certified</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              {getProgramTitle(program)}
            </h1>

            <p className="text-base text-neutral-300 leading-relaxed">
              {getProgramDesc(program)}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-neutral-200">
                <Building2 className="w-4 h-4 text-[var(--color-brand-800)]" />
                <span>{program.institutionName}</span>
              </div>
              {program.applicationDeadline && (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-xs font-semibold text-amber-300">
                  <Clock className="w-4 h-4" />
                  <span>Deadline: {program.applicationDeadline}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 rounded-3xl bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 shadow-xl space-y-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-paper-200 dark:bg-paper-800">
                <img
                  src={program.coverImage}
                  alt={getProgramTitle(program)}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h2 className="text-xl font-black text-paper-950 dark:text-white uppercase tracking-tight mb-3">
                  {t.dossierHeading}
                </h2>
                <div className="text-sm text-paper-700 dark:text-paper-300 leading-relaxed space-y-4 whitespace-pre-line">
                  {getProgramDetails(program)}
                </div>
              </div>

              {program.eligibility && (
                <div className="p-6 rounded-2xl bg-brand-50/50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900 space-y-2">
                  <h3 className="text-sm font-black text-brand-800 dark:text-brand-300 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.eligibilityHeading}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-paper-700 dark:text-paper-300 leading-relaxed">
                    {program.eligibility}
                  </p>
                </div>
              )}

              <div className="p-6 rounded-2xl bg-paper-100 dark:bg-paper-800 border border-paper-200 dark:border-paper-700 space-y-3">
                <h3 className="text-sm font-black text-paper-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-[var(--color-brand-800)]" />
                  <span>{t.credentialsHeading}</span>
                </h3>
                <p className="text-xs text-paper-600 dark:text-paper-300 leading-relaxed">
                  Participants successfully concluding this bilateral track receive dual-signed institutional transcripts and digital verification badges validated under the Chinese Institute for Strategic and Economic Studies (CISE) academic registry.
                </p>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 shadow-xl space-y-5 sticky top-24">
              <h3 className="text-sm font-black uppercase tracking-widest text-[var(--color-brand-800)]">
                Application Action Desk
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-paper-200 dark:border-paper-800">
                  <span className="text-paper-500">Institution:</span>
                  <span className="font-bold text-paper-900 dark:text-white text-right">{program.institutionName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-paper-200 dark:border-paper-800">
                  <span className="text-paper-500">Cycle Duration:</span>
                  <span className="font-bold text-paper-900 dark:text-white">{program.eventDate || 'Full Semester'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-paper-200 dark:border-paper-800">
                  <span className="text-paper-500">Deadline:</span>
                  <span className="font-bold text-brand-700 dark:text-brand-400">{program.applicationDeadline || 'Rolling Admissions'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-paper-200 dark:border-paper-800">
                  <span className="text-paper-500">Visa Protocol:</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400">Bilateral Fast-Track</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Link
                  to={`/${lang}/institute/services/cultural-exchange/apply?program=${program.id}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-black text-xs uppercase tracking-wider transition shadow-sm"
                >
                  <span>{t.applyForProgram}</span>
                  <Send className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-paper-300 dark:border-paper-700 hover:bg-paper-100 dark:hover:bg-paper-800 text-paper-800 dark:text-paper-200 text-xs font-bold transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? t.copied : t.share}</span>
                </button>
              </div>

              <div className="pt-4 border-t border-paper-200 dark:border-paper-800 text-[11px] text-paper-500 space-y-2">
                <div className="flex items-center gap-2 text-paper-700 dark:text-paper-300 font-bold">
                  <ShieldCheck className="w-4 h-4 text-[var(--color-brand-800)]" />
                  <span>Sovereign CISE Governance</span>
                </div>
                <p>
                  Questions about this bilateral program? Inquire with the academic desk at <span className="font-mono text-brand-800 dark:text-brand-300">exchange@cises.org.iq</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CulturalExchangeProgramDetail;
