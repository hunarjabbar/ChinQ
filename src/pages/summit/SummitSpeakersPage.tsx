import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { SUMMIT_SPEAKERS } from '../../data/summitData';
import { Users, Filter, Award, BookOpen, Building, ShieldCheck, ArrowRight } from 'lucide-react';

export function SummitSpeakersPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  
  const [selectedRole, setSelectedRole] = useState<'ALL' | 'GOVERNMENT' | 'ENTERPRISE' | 'FELLOW' | 'DIPLOMAT'>('ALL');

  const filteredSpeakers = SUMMIT_SPEAKERS.filter(s => {
    if (selectedRole === 'ALL') return true;
    if (selectedRole === 'GOVERNMENT') return s.roleType === 'GOVERNMENT';
    if (selectedRole === 'ENTERPRISE') return s.roleType === 'ENTERPRISE';
    if (selectedRole === 'FELLOW') return s.roleType === 'FELLOW' || s.isInstituteFellow;
    if (selectedRole === 'DIPLOMAT') return s.roleType === 'DIPLOMAT';
    return true;
  });

  return (
    <SummitLayout lang={lang} activeNav="speakers">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
        
        {/* Header Hero */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-800 dark:text-brand-400" />
            <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
              {lang === 'ar' ? 'هيئة المتحدثين والباحثين' : lang === 'zh' ? '演讲嘉宾与智库学者名录' : lang === 'ckb' ? 'وتاربێژان و پسپۆڕان' : 'Eminent Speakers & Institute Faculty'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
            {lang === 'ar' ? 'المتحدثون والخبراء وقادة الأعمال' : lang === 'zh' ? '中伊政经领袖与特聘战略学者全景名册' : lang === 'ckb' ? 'وتاربێژان و پسپۆڕانی ئابووری' : 'Distinguished Faculty & Keynote Speakers'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            {lang === 'ar'
              ? 'تجمع القمة نخبة من صانعي القرار الحكومي، ورؤساء كبرى المجموعات الصناعية الصينية والعراقية، إضافة إلى كبار باحثي المعهد الصيني للدراسات الاستراتيجية والاقتصادية.'
              : lang === 'zh'
              ? '由两国部委首长、领军中央企业与龙头民企总裁，以及智库资深宏观战略学者共同组成的高规格专家团。'
              : lang === 'ckb'
              ? 'نوێنەرانی باڵای حکومی و بەڕێوەبەرانی کۆمپانیا گەورەکان و توێژەرانی پەیمانگا.'
              : 'Bringing together ministerial delegations, enterprise chairpersons, sovereign fund managers, and Institute senior fellows.'}
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: 'ALL', label: { en: 'All Speakers', ar: 'كافة المتحدثين', zh: '全部专家嘉宾', ckb: 'هەموو وتاربێژان' } },
            { id: 'GOVERNMENT', label: { en: 'Government & Sovereign', ar: 'القيادات الحكومية', zh: '政府部委代表', ckb: 'حکومی و باڵا' } },
            { id: 'ENTERPRISE', label: { en: 'Enterprise & Industry', ar: 'قادة الشركات والصناعة', zh: '领军企业与商会代表', ckb: 'کۆمپانیا و بازرگانان' } },
            { id: 'FELLOW', label: { en: 'Institute Fellows & Think Tank', ar: 'باحثو المعهد الصيني', zh: '智库常驻与特聘学者', ckb: 'توێژەرانی پەیمانگا' } },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedRole(f.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                selectedRole === f.id
                  ? 'bg-brand-800 text-white shadow-sm'
                  : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100'
              }`}
            >
              {f.label[lang]}
            </button>
          ))}
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpeakers.map((spk) => (
            <div
              key={spk.id}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-brand-600 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-800 to-neutral-900 text-white flex items-center justify-center font-black text-lg shadow-md">
                    {spk.name[lang].slice(0, 2)}
                  </div>
                  {spk.isInstituteFellow && (
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-brand-50 dark:bg-brand-950 text-brand-800 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                      Institute Fellow
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-black text-neutral-900 dark:text-neutral-100">
                    {spk.name[lang]}
                  </h3>
                  <div className="text-xs font-bold text-brand-800 dark:text-brand-400 mt-0.5">
                    {spk.title[lang]}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {spk.organization[lang]}
                  </div>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {spk.bio[lang]}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
                <span className="font-bold text-[11px] px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 uppercase">{spk.roleType}</span>
                {spk.isInstituteFellow && (
                  <Link
                    to={`/${lang}/institute/publications`}
                    className="text-brand-800 dark:text-brand-300 font-bold hover:underline"
                  >
                    View Research Papers →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </SummitLayout>
  );
}
