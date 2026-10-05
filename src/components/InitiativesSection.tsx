import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { Locale } from '../types';
import { useI18n } from '../hooks/useI18n';
import { Card } from './Card';
import { InitiativesCard, InitiativeItem } from './InitiativesCard';

export function InitiativesSection({ lang }: { lang: Locale }) {
  const { t } = useI18n(lang);
  const isRtl = lang === 'ar' || lang === 'ckb';

  const initiatives: InitiativeItem[] = [
    {
      id: 'settlement',
      eyebrow: t('home.initiatives.settlement.eyebrow'),
      headline: t('home.initiatives.settlement.headline'),
      description: t('home.initiatives.settlement.description'),
      cta: t('home.initiatives.settlement.cta'),
      path: `/${lang}/institute/settlement`,
      tags: [
        t('home.initiatives.settlement.fxSpread'),
        t('home.initiatives.settlement.speed'),
        t('home.initiatives.settlement.regulated'),
        t('home.initiatives.settlement.card')
      ],
      secondaryLinks: [
        { label: t('home.initiatives.settlement.qiCardLabel'), path: `/${lang}/institute/settlement/card` },
        { label: t('home.initiatives.settlement.calculatorLabel'), path: `/${lang}/institute/settlement/calculator` }
      ]
    },
    {
      id: 'insurance',
      eyebrow: t('home.initiatives.insurance.eyebrow'),
      headline: t('home.initiatives.insurance.headline'),
      description: t('home.initiatives.insurance.description'),
      cta: t('home.initiatives.insurance.cta'),
      path: `/${lang}/institute/insurance-facilitation`,
      tags: [
        t('home.initiatives.insurance.tag.sinosure'),
        t('home.initiatives.insurance.tag.cargo'),
        t('home.initiatives.insurance.tag.credit'),
        t('home.initiatives.insurance.tag.political')
      ]
    },
    {
      id: 'chinese-center',
      eyebrow: t('chineseCentre.section.eyebrow'),
      headline: t('chineseCentre.section.headline'),
      description: t('chineseCentre.section.body'),
      cta: t('home.initiatives.learnMore'),
      path: `/${lang}/institute/chinese-center`,
      tags: t('chineseCentre.section.chips').split(' · ')
    },
    {
      id: 'visa-centre',
      eyebrow: t('visaCentre.section.eyebrow'),
      headline: t('visaCentre.section.headline'),
      description: t('visaCentre.section.body'),
      cta: t('home.initiatives.learnMore'),
      path: `/${lang}/institute/visa-centre`,
      tags: t('visaCentre.section.chips').split(' · ')
    },
    {
      id: 'consultancy',
      eyebrow: t('initiatives.card.consultancy.eyebrow'),
      headline: t('initiatives.card.consultancy.headline'),
      description: t('initiatives.card.consultancy.body'),
      cta: t('initiatives.card.consultancy.cta'),
      path: `/${lang}/institute/consultancy`,
      tags: [
        t('initiatives.card.consultancy.tag.legal'),
        t('initiatives.card.consultancy.tag.financial'),
        t('initiatives.card.consultancy.tag.investment')
      ],
      secondaryLinks: [
        { label: lang === 'ar' ? 'الاستثمار بالعراق' : lang === 'zh' ? '投资伊拉克' : lang === 'ckb' ? 'وەبەرهێنان لە عێراق' : 'Iraq-Bound', path: `/${lang}/institute/consultancy/iraq-bound` },
        { label: lang === 'ar' ? 'دخول السوق الصيني' : lang === 'zh' ? '进入中国' : lang === 'ckb' ? 'بازاڕی چین' : 'China-Bound', path: `/${lang}/institute/consultancy/china-bound` }
      ]
    },
    {
      id: 'cultural-exchange',
      eyebrow: t('initiatives.card.culturalExchange.eyebrow'),
      headline: t('initiatives.card.culturalExchange.headline'),
      description: t('initiatives.card.culturalExchange.body'),
      cta: t('initiatives.card.culturalExchange.cta'),
      path: `/${lang}/institute/services/cultural-exchange`,
      tags: [
        t('initiatives.card.culturalExchange.chips.universityMous'),
        t('initiatives.card.culturalExchange.chips.studentFellowships'),
        t('initiatives.card.culturalExchange.chips.artsResidencies'),
        t('initiatives.card.culturalExchange.chips.civilizationalDialogue')
      ],
      secondaryLinks: [
        { label: lang === 'ar' ? 'دليل البرامج' : lang === 'zh' ? '全部项目' : lang === 'ckb' ? 'بەرنامەکان' : 'All Programs', path: `/${lang}/institute/services/cultural-exchange/programs` },
        { label: lang === 'ar' ? 'الجامعات الشريكة' : lang === 'zh' ? '合作高校' : lang === 'ckb' ? 'زانکۆ هاوبەشەکان' : 'Partners', path: `/${lang}/institute/services/cultural-exchange/partners` }
      ]
    }
  ];

  const summitChips = t('summit.section.chips').split(' · ');

  const [hasScrolledIn, setHasScrolledIn] = React.useState(false);
  const heroRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = heroRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasScrolledIn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="initiatives" className="relative py-16 sm:py-24 w-full bg-white dark:bg-neutral-950 overflow-hidden">
      {/* Soft Ambient Under-Glow backdrop */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-96 bg-red-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 dark:text-red-400">
            {lang === 'ar' ? 'المعهد الصيني للدراسات الاستراتيجية والاقتصادية (CISE)' : lang === 'zh' ? '中国战略与经济研究所 (CISE) 主管运营' : lang === 'ckb' ? 'پەیمانگای چینی (CISE)' : 'Chinese Institute for Strategic & Economic Studies (CISE)'}
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-ink-950 dark:text-white uppercase tracking-tighter">{t('home.initiatives.heading')}</h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl mx-auto font-serif leading-relaxed italic">{t('home.initiatives.subheading')}</p>
        </div>

        {/* Tier 1: Full-width Hero Banner for Summit */}
        <Card
          variant="hero"
          ref={heroRef}
          className="relative overflow-hidden p-8 sm:p-12 md:p-14 rounded-3xl bg-brand-800 border border-brand-700 text-white mb-16 transition-all duration-300 shadow-xl"
        >
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white text-[10px] font-black uppercase tracking-[0.25em] mb-5">
              <Sparkles size={12} className="text-amber-300 animate-pulse" />
              <span>{t('summit.section.eyebrow')}</span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-5 leading-[1.05]">
              {t('summit.section.headline')}
            </h3>

            <p className="text-white/95 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-3xl font-normal">
              {t('summit.section.body')}
            </p>

            {summitChips && summitChips.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {summitChips.map((chip: string, idx: number) => (
                  <span key={idx} className="bg-white/10 text-white border border-white/20 text-xs font-bold px-3.5 py-1 rounded-full">
                    {chip}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <Link 
                to={`/${lang}/summit`} 
                className="bg-white hover:bg-neutral-100 text-brand-800 px-7 py-3.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all shadow-md flex items-center gap-2.5 group cursor-pointer"
              >
                <span>{t('summit.section.cta').replace(' →', '').replace(' ←', '')}</span>
                <ArrowRight size={14} className={`transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </Link>
              
              <Link 
                to={`/${lang}/summit/agenda`} 
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3.5 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>{t('summit.section.secondary').replace(' →', '').replace(' ←', '')}</span>
                <Compass size={14} className={`transition-transform group-hover:rotate-45 ${isRtl ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>
        </Card>

        {/* Tier 2: 2x2 Grid of Upgraded Glassmorphism Initiatives Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
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
