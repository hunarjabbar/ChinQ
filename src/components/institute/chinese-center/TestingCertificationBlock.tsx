import React from 'react';
import { Link } from 'react-router-dom';
import { Locale } from '../../../types';
import { ccTranslations } from './translations';
import { ArrowRight, ShieldCheck, QrCode, Calendar, FileText, CheckCircle2, RotateCcw } from 'lucide-react';

interface TestingCertificationBlockProps {
  lang: Locale;
}

export function TestingCertificationBlock({ lang }: TestingCertificationBlockProps) {
  const t = ccTranslations[lang] || ccTranslations.en;
  const isRtl = lang === 'ar' || lang === 'ckb';

  return (
    <section id="testing-certification" className="py-20 bg-surface dark:bg-neutral-900 border-b border-border" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (8 cols): Description, Process, Retake */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-royal/10 text-royal text-xs font-black uppercase tracking-widest">
              <ShieldCheck size={16} />
              <span>{t.testingOfficialBadge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-navy dark:text-white uppercase tracking-tight">
              {t.testingHeading}
            </h2>

            <p className="text-navy/80 dark:text-neutral-300 text-base leading-relaxed">
              {t.testingBody}
            </p>

            {/* Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-lg bg-card dark:bg-neutral-800 border border-border dark:border-neutral-700">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-800 dark:text-brand-400 uppercase tracking-wider mb-1">
                  <Calendar size={14} />
                  <span>{t.testingNextDate}</span>
                </div>
                <p className="text-xs text-navy/70 dark:text-neutral-400">
                  {lang === 'ar' ? 'جلسات ورقية وإلكترونية فصليًا في مقر السليمانية.' :
                   lang === 'ckb' ? 'دانیشتنی ئەلیکترۆنی و سەر کاغەز لە کەمپی سلێمانی.' :
                   lang === 'zh' ? '每季度于苏莱曼尼亚校区举行官方统一机考与纸笔考试。' :
                   'Quarterly computer and paper testing sessions held at Sulaymaniyah campus.'}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-card dark:bg-neutral-800 border border-border dark:border-neutral-700">
                <div className="flex items-center gap-2 text-xs font-bold text-royal uppercase tracking-wider mb-1">
                  <RotateCcw size={14} />
                  <span>{t.testingRetakeTitle}</span>
                </div>
                <p className="text-xs text-navy/70 dark:text-neutral-400">
                  {t.testingRetakeDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Action Card with CTAs */}
          <div className="lg:col-span-4">
            <div className="bg-navy text-white rounded-2xl p-8 shadow-xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 text-gold flex items-center justify-center mb-6">
                  <QrCode size={28} />
                </div>

                <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">
                  {t.testingQrBadge}
                </span>

                <h3 className="text-xl font-bold uppercase tracking-tight mb-4">
                  {lang === 'ar' ? 'البوابة الرسمية للاختبار والتوثيق' :
                   lang === 'ckb' ? 'دەروازەی فەرمی تاقیکردنەوە و پشتڕاستکردنەوە' :
                   lang === 'zh' ? '官方考务与资质查验中心' :
                   'Official Examination & Verification'}
                </h3>

                <p className="text-xs text-white/70 leading-relaxed mb-8">
                  {lang === 'ar' ? 'سجّل في الاختبار القادم أو تحقق رقميًا من صحة الشهادات الصادرة عبر الرمز التعريفي الفريد.' :
                   lang === 'ckb' ? 'ناوت تۆمار بکە لە تاقیکردنەوەی داهاتوو یان بڕوانامەکان بە شێوەی دیجیتاڵی پشتڕاست بکەرەوە.' :
                   lang === 'zh' ? '在线办理当期考试报名、查验已颁发中英文证书防伪凭证及补办成绩报告。' :
                   'Register for the upcoming examination session or verify any CISE credential via digital identifier.'}
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  to={`/${lang}/institute/chinese-center/testing/register`}
                  className="w-full inline-flex items-center justify-center px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-brand-800 hover:bg-brand-700 rounded-lg transition-colors"
                >
                  <span>{t.testingRegisterCta}</span>
                  <ArrowRight size={14} className="ms-2 rtl:rotate-180" />
                </Link>

                <Link
                  to={`/${lang}/institute/chinese-center/certificates`}
                  className="w-full inline-flex items-center justify-center px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
                >
                  <span>{t.testingVerifyCta}</span>
                  <ArrowRight size={14} className="ms-2 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
