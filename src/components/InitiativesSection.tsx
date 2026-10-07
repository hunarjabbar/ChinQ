import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { Locale } from '../types';
import { useI18n } from '../hooks/useI18n';
import { Card } from './Card';
import { InitiativesCard, InitiativeItem } from './InitiativesCard';
import { portalStore } from '../data/portalData';

export function InitiativesSection({ lang }: { lang: Locale }) {
  const { t } = useI18n(lang);
  const isRtl = lang === 'ar' || lang === 'ckb';

  const initiatives: InitiativeItem[] = [
    {
      id: 'settlement',
      eyebrow: lang === 'ar' ? 'مسار المقاصة السيادي' : lang === 'zh' ? '主权清算通道' : lang === 'ckb' ? 'هێڵی پاکتاوی سەروەری' : 'Sovereign Clearing Rail',
      headline: t('home.initiatives.settlement.headline') || 'Sovereign Settlement Gateway',
      description: t('home.initiatives.settlement.description') || 'Direct IQD to RMB bilateral settlement rails bypassing third-party currency drag.',
      cta: t('home.initiatives.settlement.cta') || 'Access Settlement Gateway',
      path: `/${lang}/institute/settlement`,
      tags: [
        t('home.initiatives.settlement.fxSpread') || '0% USD FX Drag',
        t('home.initiatives.settlement.speed') || 'T+0 Settlement',
        t('home.initiatives.settlement.regulated') || 'Central Bank Aligned'
      ]
    },
    {
      id: 'insurance',
      eyebrow: lang === 'ar' ? 'تسهيل التأمين السيادي' : lang === 'zh' ? '主权保险促进' : lang === 'ckb' ? 'ئاسانکاری بیمەی سەروەری' : 'Sovereign Insurance Facilitation',
      headline: t('home.initiatives.insurance.headline') || 'Sinosure & Risk Mitigation Desk',
      description: t('home.initiatives.insurance.description') || 'Comprehensive sovereign credit insurance, cargo protection, and political risk coverage for bilateral trade.',
      cta: t('home.initiatives.insurance.cta') || 'Explore Insurance Desk',
      path: `/${lang}/institute/insurance-facilitation`,
      tags: [
        t('home.initiatives.insurance.tag.sinosure') || 'Sinosure Aligned',
        t('home.initiatives.insurance.tag.cargo') || 'Cargo Shipping',
        t('home.initiatives.insurance.tag.credit') || 'Buyer Credit'
      ]
    },
    {
      id: 'summit',
      eyebrow: lang === 'ar' ? 'الملتقى السنوي · السليمانية' : lang === 'zh' ? '年度双边峰会 · 苏莱曼尼亚' : lang === 'ckb' ? 'کۆبوونەوەی ساڵانە · سلێمانی' : 'Annual Convening · Sulaymaniyah',
      headline: t('summit.section.headline') || 'Iraq-China Bilateral Summit & Expo',
      description: t('summit.section.body') || 'Annual high-level convening in Sulaymaniyah featuring 11 key economic sector pavilions and B2B matchmaking.',
      cta: (t('summit.section.cta') || 'Enter Summit Hub').replace(' →', '').replace(' ←', ''),
      path: `/${lang}/institute/summit`,
      tags: (t('summit.section.chips') || '11 Sector Pavilions · B2B Matchmaking · VIP Delegation').split(' · ')
    },
    {
      id: 'consultancy',
      eyebrow: lang === 'ar' ? 'الاستشارات العابرة للحدود' : lang === 'zh' ? '跨境财税与战略法律咨询' : lang === 'ckb' ? 'ڕاوێژکاری سنووربەزێن' : 'Cross-Border Strategic Advisory',
      headline: t('initiatives.card.consultancy.headline') || 'Bilateral Trade & Legal Advisory',
      description: t('initiatives.card.consultancy.body') || 'Expert legal, fiscal, and regulatory navigation for enterprises operating across Iraq, China, and the Kurdistan Region.',
      cta: t('initiatives.card.consultancy.cta') || 'Consult Advisory Desk',
      path: `/${lang}/institute/consultancy`,
      tags: [
        t('initiatives.card.consultancy.tag.legal') || 'Bilateral Legal',
        t('initiatives.card.consultancy.tag.financial') || 'Fiscal Structuring',
        t('initiatives.card.consultancy.tag.investment') || 'Investment Advisory'
      ]
    },
    {
      id: 'visa-centre',
      eyebrow: lang === 'ar' ? 'مركز الاستشارات والفيزا' : lang === 'zh' ? '双边签证咨询与服务中心' : lang === 'ckb' ? 'ناوەندی ڕاوێژکاری ڤیزا' : 'Bilateral Visa Advisory & Facilitation',
      headline: t('visaCentre.section.headline') || 'Consular & Diplomatic Visa Services',
      description: t('visaCentre.section.body') || 'Streamlined diplomatic, business, and academic visa advisory with direct coordination between consular authorities.',
      cta: (t('visaCentre.section.cta') || 'Access Visa Centre').replace(' →', '').replace(' ←', ''),
      path: `/${lang}/institute/visa-centre`,
      tags: (t('visaCentre.section.chips') || 'Diplomatic Visas · Business Fast-Track · Consular Assistance').split(' · ')
    },
    {
      id: 'cultural-exchange',
      eyebrow: lang === 'ar' ? 'التبادل الشعبي والثقافي' : lang === 'zh' ? '民间与文化交流' : lang === 'ckb' ? 'ئاڵوگۆڕی گەلی و کولتووری' : 'People-to-People & Cultural Exchange',
      headline: t('initiatives.card.culturalExchange.headline') || 'Academic Consortia & Cultural Exchange',
      description: t('initiatives.card.culturalExchange.body') || 'University partnerships, HSK language certification, student fellowships, and civilizational dialogues.',
      cta: (t('initiatives.card.culturalExchange.cta') || 'Explore Cultural Exchange').replace(' →', '').replace(' ←', ''),
      path: `/${lang}/institute/services/cultural-exchange`,
      tags: [
        t('initiatives.card.culturalExchange.chips.universityMous') || 'University MoUs',
        t('initiatives.card.culturalExchange.chips.studentFellowships') || 'Student Fellowships',
        t('initiatives.card.culturalExchange.chips.artsResidencies') || 'Arts Residencies'
      ]
    }
  ];

  return (
    <section id="initiatives" className="relative py-16 sm:py-24 w-full bg-white dark:bg-neutral-950 overflow-hidden">
      {/* Soft Ambient Under-Glow backdrop */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-96 bg-red-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="text-xs font-black uppercase tracking-[0.3em] text-red-600 dark:text-red-400">
            {lang === 'ar' ? 'المعهد الصيني للدراسات الاستراتيجية والاقتصادية (CISE)' : lang === 'zh' ? '中国战略与经济研究所 (CISE)' : lang === 'ckb' ? 'پەیمانگای چینی (CISE)' : 'Chinese Institute for Strategic & Economic Studies (CISE)'}
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white bg-red-600 dark:bg-red-700 px-6 py-5 rounded-2xl shadow-md inline-block max-w-4xl uppercase tracking-tight">
            {lang === 'ar' ? 'الخدمات المؤسسية والمبادرات الثنائية' : lang === 'zh' ? '智库机构服务与双边战略举措' : lang === 'ckb' ? 'خزمەتگوزارییە دامەزراوەییەکان و دەستپێشخەرییە دوولایەنەکان' : 'Institutional Services & Bilateral Initiatives'}
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl mx-auto font-serif leading-relaxed italic">
            {lang === 'ar' ? 'مسارات المقاصة السيادية، والحد من المخاطر المؤسسية، والملتقيات الثنائية، والبنية التحتية الأكاديمية المتخصصة برعاية المعهد.' : lang === 'zh' ? '由中伊战略研究所（CISE）主导运营的主权清算通道、机构风险对冲、双边高规格峰会与专业语言学术基础设施。' : lang === 'ckb' ? 'هێڵی پاکتاوی سەروەری دراو، کەمکردنەوەی مەترسی، کۆبوونەوەی دوولایەنە و ژێرخانی ئەکادیمی تایبەتمەند لەژێر چاودێری پەیمانگا.' : 'Sovereign clearing rails, institutional risk mitigation, bilateral convening, and specialized academic infrastructure anchored by CISE.'}
          </p>
        </div>

        {/* 3-Column Grid of Institutional Services & Bilateral Initiatives */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.map((item, index) => (
            <InitiativesCard
              key={item.id}
              initiative={item}
              index={index}
              isRtl={isRtl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
