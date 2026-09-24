import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Locale } from '../types';
import { useI18n } from '../hooks/useI18n';

interface Initiative {
  id: string;
  eyebrow: string;
  headline: string;
  description: string;
  cta: string;
  path: string;
  isSpecial?: boolean;
}

export function InitiativesSection({ lang }: { lang: Locale }) {
  const { t } = useI18n(lang);

  const initiatives: Initiative[] = [
    {
      id: 'settlement',
      eyebrow: lang === 'ar' ? 'المقاصة المالية السيادية' : lang === 'zh' ? '主权本币直接清算' : lang === 'ckb' ? 'پاکتاوی سەروەری دراوەکان' : 'Sovereign Clearing Rail',
      headline: lang === 'ar' ? 'تسوية المدفوعات المباشرة (IQD ⇄ RMB)' : lang === 'zh' ? '第纳尔/人民币直接结算促进中心' : lang === 'ckb' ? 'پاکتاوی ڕاستەوخۆی دینار و یوان' : 'Direct IQD ⇄ RMB Payment Settlement',
      description: lang === 'ar' 
        ? 'قناة مقاصة مباشرة بنسبة عمولة صفرية للطرف الثالث، بالتعاون مع البنك المركزي العراقي وبنك الشعب الصيني وبطاقة كي كارد.'
        : lang === 'zh'
        ? '中伊双向本币直接清算主权通道，零第三方货币汇差，央行互换及Qi & ICA联名商务卡支持。'
        : lang === 'ckb'
        ? 'کەناڵی ڕاستەوخۆی پاکتاوی دارایی بەبێ تێچووی سێیەم، بە هاوکاری لەگەڵ بانکی ناوەندی و کی کارت.'
        : 'Direct bilateral clearing eliminating third-currency USD friction with 0% FX drag, CBI-accredited execution, and Qi & ICA card integration.',
      cta: lang === 'ar' ? 'دخول بوابة التسوية' : lang === 'zh' ? '进入结算门户' : lang === 'ckb' ? 'دەروازەی پاکتاو' : 'Access Settlement Portal',
      path: `/${lang}/settlement`,
      isSpecial: true
    },
    {
      id: 'summit',
      eyebrow: t('summit.section.eyebrow'),
      headline: t('summit.section.headline'),
      description: t('summit.section.body'),
      cta: t('home.initiatives.learnMore'),
      path: `/${lang}/summit`
    },
    {
      id: 'chinese-center',
      eyebrow: t('chineseCentre.section.eyebrow'),
      headline: t('chineseCentre.section.headline'),
      description: t('chineseCentre.section.body'),
      cta: t('home.initiatives.learnMore'),
      path: `/${lang}/institute/chinese-center`
    },
    {
      id: 'visa-centre',
      eyebrow: t('visaCentre.section.eyebrow'),
      headline: t('visaCentre.section.headline'),
      description: t('visaCentre.section.body'),
      cta: t('home.initiatives.learnMore'),
      path: `/${lang}/institute/visa-centre`
    }
  ];

  return (
    <section id="initiatives" className="py-20 w-full bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-navy uppercase tracking-tighter mb-4">{t('home.initiatives.heading')}</h2>
          <p className="text-navy/70 text-lg">{t('home.initiatives.subheading')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initiatives.map((item) => (
            <div
              key={item.id}
              className={`initiative-card p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between shadow-xs ${
                item.isSpecial
                  ? 'border-2 border-[#C8102E] bg-gradient-to-b from-red-50/50 via-white to-white shadow-md'
                  : 'bg-card border border-border'
              }`}
            >
              <div>
                <span className={`text-[10px] uppercase tracking-widest font-black mb-2 block ${
                  item.isSpecial ? 'text-[#C8102E]' : 'text-gold-text'
                }`}>
                  {item.eyebrow}
                </span>
                <h3 className="text-lg font-black text-navy mb-3 uppercase leading-snug">
                  {item.headline}
                </h3>
                <p className="text-navy/80 text-xs mb-4 leading-relaxed">
                  {item.description}
                </p>

                {item.isSpecial && (
                  <div className="mb-4 grid grid-cols-2 gap-2 text-[10px] font-mono font-bold text-gray-700 bg-white/80 p-2 rounded-lg border border-red-100">
                    <span className="text-emerald-700">✓ 0% FX Spread</span>
                    <span className="text-[#C8102E]">✓ 24-48h Speed</span>
                    <span className="text-gray-800">✓ CBI Regulated</span>
                    <span className="text-amber-800">✓ Qi & ICA Card</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100">
                <Link to={item.path} className={`inline-flex items-center text-xs font-black transition-all ${
                  item.isSpecial ? 'text-[#C8102E] hover:text-[#A00D26]' : 'text-royal hover:gap-2'
                }`}>
                  {item.cta} <ArrowRight className="ms-1.5" size={14} />
                </Link>

                {item.isSpecial && (
                  <div className="flex items-center gap-3 text-[11px] font-bold text-gray-500 pt-1">
                    <Link to={`/${lang}/settlement/card`} className="hover:text-[#C8102E] underline">
                      Qi Card
                    </Link>
                    <span>•</span>
                    <Link to={`/${lang}/settlement/calculator`} className="hover:text-[#C8102E] underline">
                      Calculator
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
