import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { SUMMIT_SPONSOR_TIERS } from '../../data/summitData';
import { Award, CheckCircle2, ShieldCheck, ArrowRight, Download, DollarSign } from 'lucide-react';

export function SummitSponsorsPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  return (
    <SummitLayout lang={lang} activeNav="sponsors">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12">
        
        {/* Header Hero */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-800 dark:text-brand-400" />
            <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
              {lang === 'ar' ? 'الرعاية الاستراتيجية والفرص المؤسسية' : lang === 'zh' ? '峰会战略合作伙伴与赞助招募' : lang === 'ckb' ? 'سپۆنسەری ستراتیژی' : 'Strategic Corporate Sponsorship'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
            {lang === 'ar' ? 'باقات الرعاية الرسمية ومزايا الظهور التجاري' : lang === 'zh' ? '伊拉克—中国经济峰会赞助权益与全球品牌曝光' : lang === 'ckb' ? 'پلانی سپۆنسەری فەرمی' : 'Sponsorship Tiers & Brand Leadership'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            {lang === 'ar'
              ? 'موقع فريد لوضع علامتك التجارية في مقدمة التعاون الاقتصادي العراقي الصيني، والوصول المباشر للوزراء، ورؤساء المجموعات الصناعية، والندوات البحثية للمعهد.'
              : 'Elevate your brand alongside top-tier state-owned enterprises, private industrial leaders, and diplomatic envoys.'}
          </p>
        </div>

        {/* Sponsorship Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUMMIT_SPONSOR_TIERS.map((tier) => {
            const isTop = tier.id === 'platinum';
            return (
              <div
                key={tier.id}
                className={`p-6 sm:p-8 rounded-3xl border transition-all flex flex-col justify-between space-y-6 ${
                  isTop
                    ? 'bg-neutral-900 text-white border-brand-800 shadow-xl ring-2 ring-brand-700'
                    : 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-neutral-200 dark:border-neutral-800 shadow-xs'
                }`}
              >
                <div className="space-y-4">
                  <div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${
                      isTop ? 'bg-brand-800 text-brand-200' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                    }`}>
                      {tier.name[lang]}
                    </span>
                    <div className="text-xl sm:text-2xl font-black mt-3">{tier.fee}</div>
                    <div className={`text-xs ${isTop ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      Booth: <strong>{tier.boothSize}</strong> • Passes: <strong>{tier.vipPasses} VIP</strong>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                    {tier.benefits[lang].map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className={isTop ? 'text-neutral-300' : 'text-neutral-600 dark:text-neutral-400'}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/${lang}/summit/contact?subject=Sponsorship%20Inquiry%20${tier.name.en}`}
                  className={`w-full py-3 rounded-xl text-center text-xs font-black uppercase tracking-wider transition-colors block ${
                    isTop
                      ? 'bg-brand-800 hover:bg-brand-700 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  Inquire for Tier →
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </SummitLayout>
  );
}
