import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layers, ArrowRight, Zap, Coins, GraduationCap, FileCheck, Ship, Award, Cpu } from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function IcaInitiativesPage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const initiatives = portalStore.getInitiatives();

  const getInitiativeIcon = (name: string) => {
    switch (name) {
      case 'Zap': return <Zap size={22} className="text-[var(--color-brand-800)]" />;
      case 'Coins': return <Coins size={22} className="text-[var(--color-brand-800)]" />;
      case 'GraduationCap': return <GraduationCap size={22} className="text-[var(--color-brand-800)]" />;
      case 'Passport': return <FileCheck size={22} className="text-[var(--color-brand-800)]" />;
      case 'Ship': return <Ship size={22} className="text-[var(--color-brand-800)]" />;
      case 'Award': return <Award size={22} className="text-[var(--color-brand-800)]" />;
      case 'Cpu': return <Cpu size={22} className="text-[var(--color-brand-800)]" />;
      default: return <Layers size={22} className="text-[var(--color-brand-800)]" />;
    }
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 pb-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-2">
            <Layers size={14} />
            <span>{t('nav.initiatives')}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#000000]">
            {t('publicPortal.initiativesHeading')}
          </h1>
          <p className="text-sm text-[#4B5563] mt-2 max-w-2xl">
            {t('publicPortal.initiativesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.map(init => (
            <Link
              key={init.id}
              to={`/${currentLang}/initiatives/${init.slug}`}
              className="ica-card-interactive group flex flex-col justify-between p-7 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[var(--color-brand-800)] transition-all"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FEE2E2] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {getInitiativeIcon(init.iconName)}
                </div>

                <div className="text-[10px] font-mono font-bold text-[var(--color-brand-800)] uppercase tracking-widest mb-1.5">
                  STATUS: {init.status.toUpperCase()}
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-black text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors mb-3">
                  {init.title[currentLang] || init.title.en}
                </h2>

                <p className="text-xs text-[#4B5563] leading-relaxed mb-6">
                  {init.shortDesc[currentLang] || init.shortDesc.en}
                </p>
              </div>

              <div>
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E5E7EB] mb-5">
                  {init.kpis.map((kpi, kIdx) => (
                    <div key={kIdx} className="text-center">
                      <div className="text-xs font-mono font-black text-[#000000]">
                        {kpi.metric}
                      </div>
                      <div className="text-[10px] text-[#4B5563] truncate">
                        {kpi.label[currentLang] || kpi.label.en}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-black text-[#000000] uppercase tracking-wider">
                  <span>View Initiative Dossier</span>
                  <span className="text-[var(--color-brand-800)] cta-arrow transition-transform">
                    <ArrowRight size={16} className="rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IcaInitiativesPage;
