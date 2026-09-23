import React from 'react';
import { Link } from 'react-router-dom';
import { Locale } from '../../../types';
import { ccTranslations } from './translations';
import { ArrowRight, UserCheck, Languages, GraduationCap } from 'lucide-react';

interface InstructorsPreviewProps {
  lang: Locale;
}

interface Instructor {
  id: string;
  nameEn: string;
  nameAr: string;
  nameZh: string;
  nameCkb: string;
  titleEn: string;
  titleAr: string;
  titleZh: string;
  titleCkb: string;
  languagesEn: string;
  languagesAr: string;
  languagesZh: string;
  languagesCkb: string;
  levelsTaught: string;
  initials: string;
}

const INSTRUCTORS: Instructor[] = [
  {
    id: 'chen-lin',
    nameEn: 'Prof. Chen Lin',
    nameAr: 'أ.د. تشن لين',
    nameZh: '陈林 教授',
    nameCkb: 'پ.د. چێن لین',
    titleEn: 'Pedagogical Director & Senior Linguist',
    titleAr: 'المدير التربوي وكبير اللغويين',
    titleZh: '教学督导兼资深语言学专家',
    titleCkb: 'بەڕێوەبەری پەروەردەیی و زمانزانی باڵا',
    languagesEn: 'Chinese (Native), English, Arabic',
    languagesAr: 'الصينية (الأم)، الإنجليزية، العربية',
    languagesZh: '中文（母语）、英语、阿拉伯语',
    languagesCkb: 'چینی (ڕەسەن)، ئینگلیزی، عەرەبی',
    levelsTaught: 'HSK 4–6, Business Chinese',
    initials: 'CL'
  },
  {
    id: 'zhang-ming',
    nameEn: 'Zhang Ming',
    nameAr: 'تشانغ مينغ',
    nameZh: '张明 讲师',
    nameCkb: 'ژانگ مینگ',
    titleEn: 'Lead Examiner & Oral Fluency Specialist',
    titleAr: 'كبير الممتحنين ومتخصص الطلاقة الشفوية',
    titleZh: '主考官兼口语考评专家',
    titleCkb: 'سەرپەرشتیاری تاقیکردنەوە و پسپۆڕی قسەکردن',
    languagesEn: 'Chinese (Native), Kurdish, English',
    languagesAr: 'الصينية (الأم)، الكردية، الإنجليزية',
    languagesZh: '中文（母语）、库尔德语、英语',
    languagesCkb: 'چینی (ڕەسەن)، کوردی، ئینگلیزی',
    levelsTaught: 'HSK 1–3, HSKK Speaking',
    initials: 'ZM'
  },
  {
    id: 'li-wei',
    nameEn: 'Li Wei',
    nameAr: 'لي وي',
    nameZh: '李伟 导师',
    nameCkb: 'لی وێی',
    titleEn: 'Youth Curriculum & Cultural Specialist',
    titleAr: 'أخصائي مناهج الناشئين والتبادل الثقافي',
    titleZh: '少儿教育与跨文化交流主管',
    titleCkb: 'پسپۆڕی پرۆگرامی لاوان و ئاڵوگۆڕی کولتووری',
    languagesEn: 'Chinese (Native), English, Arabic',
    languagesAr: 'الصينية (الأم)، الإنجليزية، العربية',
    languagesZh: '中文（母语）、英语、阿拉伯语',
    languagesCkb: 'چینی (ڕەسەن)، ئینگلیزی، عەرەبی',
    levelsTaught: 'YCT 1–4, HSK 1–2',
    initials: 'LW'
  }
];

export function InstructorsPreview({ lang }: InstructorsPreviewProps) {
  const t = ccTranslations[lang] || ccTranslations.en;
  const isRtl = lang === 'ar' || lang === 'ckb';

  return (
    <section id="instructors" className="py-20 bg-card dark:bg-neutral-950 border-b border-border" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-navy dark:text-white uppercase tracking-tight mb-4">
            {t.instructorsHeading}
          </h2>
          <p className="text-navy/70 dark:text-neutral-300 text-base sm:text-lg">
            {t.instructorsSubheading}
          </p>
        </div>

        {/* 3-Instructor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INSTRUCTORS.map((ins) => {
            const name = lang === 'ar' ? ins.nameAr : lang === 'ckb' ? ins.nameCkb : lang === 'zh' ? ins.nameZh : ins.nameEn;
            const title = lang === 'ar' ? ins.titleAr : lang === 'ckb' ? ins.titleCkb : lang === 'zh' ? ins.titleZh : ins.titleEn;
            const langs = lang === 'ar' ? ins.languagesAr : lang === 'ckb' ? ins.languagesCkb : lang === 'zh' ? ins.languagesZh : ins.languagesEn;

            return (
              <div
                key={ins.id}
                className="bg-surface dark:bg-neutral-900 border border-border dark:border-neutral-800 rounded-xl p-6 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  {/* Avatar / Silhouette */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-navy to-royal text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
                      {ins.initials}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-navy dark:text-white">
                        {name}
                      </h3>
                      <p className="text-xs text-royal dark:text-sky-400 font-semibold">
                        {title}
                      </p>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="space-y-3 py-4 border-t border-border/60 dark:border-neutral-800 text-xs">
                    <div className="flex items-start gap-2">
                      <Languages size={15} className="text-neutral-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-neutral-500 dark:text-neutral-400 me-1">
                          {t.instructorsLanguagesLabel}:
                        </span>
                        <span className="text-navy dark:text-neutral-200">
                          {langs}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <GraduationCap size={15} className="text-neutral-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-neutral-500 dark:text-neutral-400 me-1">
                          {t.instructorsLevelsLabel}:
                        </span>
                        <span className="font-bold text-navy dark:text-neutral-200">
                          {ins.levelsTaught}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50 dark:border-neutral-800">
                  <Link
                    to={`/${lang}/institute/chinese-center/instructors/${ins.id}`}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-royal hover:text-brand-800 dark:hover:text-brand-400 transition-colors"
                  >
                    <span>{t.instructorsViewProfile}</span>
                    <ArrowRight size={14} className="ms-1.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
