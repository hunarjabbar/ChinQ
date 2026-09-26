import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Calendar, Compass } from 'lucide-react';
import { Locale } from '../types';
import { useI18n } from '../hooks/useI18n';
import { Card } from './Card';

interface Initiative {
  id: string;
  eyebrow: string;
  headline: string;
  description: string;
  cta: string;
  path: string;
  tags?: string[];
  secondaryLinks?: { label: string; path: string }[];
}

export function InitiativesSection({ lang }: { lang: Locale }) {
  const { t } = useI18n(lang);
  const isRtl = lang === 'ar' || lang === 'ckb';

  const initiatives: Initiative[] = [
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
    <section id="initiatives" className="py-20 w-full bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97706]/10 border border-[#D97706]/20 text-[10px] font-black uppercase tracking-widest text-[#D97706]">
            <span>{lang === 'ar' ? 'المعهد الصيني للدراسات الاستراتيجية والاقتصادية (CISE)' : lang === 'zh' ? '中国战略与经济研究所 (CISE) 主管运营' : lang === 'ckb' ? 'پەیمانگای چینی (CISE)' : 'Chinese Institute for Strategic & Economic Studies (CISE)'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-navy uppercase tracking-tighter mb-2">{t('home.initiatives.heading')}</h2>
          <p className="text-navy/70 text-lg max-w-2xl mx-auto">{t('home.initiatives.subheading')}</p>
        </div>

        {/* Tier 1: Full-width Hero Banner for Summit */}
        <Card
          variant="hero"
          ref={heroRef}
          className={`summit-hero-card mb-10 transition-all duration-700 ease-out hover:-translate-y-1 ${
            hasScrolledIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            opacity: hasScrolledIn ? 1 : 0,
            transform: hasScrolledIn ? 'translateY(0px)' : 'translateY(16px)',
          }}
        >
          <div 
            className="summit-hero-card__texture" 
            aria-hidden="true" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`
            }} 
          />
          <div className="summit-hero-card__glow" aria-hidden="true" />
          <div className="summit-hero-card__content">
            <p className="summit-hero-card__eyebrow">
              <Sparkles size={13} className="text-amber-300 inline-block me-1.5" />
              {t('summit.section.eyebrow')}
            </p>
            <h2 className="summit-hero-card__headline">
              {t('summit.section.headline')}
            </h2>
            <p className="summit-hero-card__body">
              {t('summit.section.body')}
            </p>
            {summitChips && summitChips.length > 0 && (
              <ul className="summit-hero-card__chips">
                {summitChips.map((chip, idx) => (
                  <li key={idx}>{chip}</li>
                ))}
              </ul>
            )}
            <div className="summit-hero-card__actions">
              <Link to={`/${lang}/institute/summit`} className="summit-hero-card__cta summit-hero-card__cta--primary group">
                <span>{t('summit.section.cta').replace(' →', '').replace(' ←', '')}</span>
                <ArrowRight size={16} className={`transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </Link>
              <Link to={`/${lang}/institute/summit/agenda`} className="summit-hero-card__cta summit-hero-card__cta--secondary group">
                <span>{t('summit.section.secondary').replace(' →', '').replace(' ←', '')}</span>
                <Compass size={16} className={`transition-transform group-hover:rotate-45 ${isRtl ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>
        </Card>

        {/* Tier 2: Grid of 5 Remaining Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initiatives.map((item) => (
            <div
              key={item.id}
              className="initiative-card p-6 rounded-2xl bg-card border border-border transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest font-black mb-2 block text-gold-text">
                  {item.eyebrow}
                </span>
                <h3 className="text-lg font-black text-navy mb-3 uppercase leading-snug">
                  {item.headline}
                </h3>
                <p className="text-navy/80 text-xs mb-4 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {item.tags && item.tags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-surface border border-border rounded text-[9px] font-bold text-navy/60 uppercase tracking-tighter">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-2 border-t border-border">
                <Link to={item.path} className="inline-flex items-center text-xs font-black transition-all text-royal hover:gap-2">
                  {item.cta} <ArrowRight className={`ms-1.5 ${isRtl ? 'rotate-180' : ''}`} size={14} />
                </Link>

                {item.secondaryLinks && item.secondaryLinks.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold text-gray-500 pt-1">
                    {item.secondaryLinks.map((link, idx) => (
                      <React.Fragment key={idx}>
                        <Link to={link.path} className="hover:text-royal underline whitespace-nowrap">
                          {link.label}
                        </Link>
                        {idx < item.secondaryLinks!.length - 1 && <span className="opacity-30">•</span>}
                      </React.Fragment>
                    ))}
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
