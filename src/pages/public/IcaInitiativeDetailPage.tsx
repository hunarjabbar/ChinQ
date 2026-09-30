import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function IcaInitiativeDetailPage() {
  const { lang = 'en', slug } = useParams<{ lang: string; slug: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const initiative = portalStore.getInitiatives().find(i => i.slug === slug);

  if (!initiative) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Initiative Not Found</h2>
        <Link to={`/${currentLang}/initiatives`} className="text-[var(--color-brand-800)] font-bold underline">
          Return to Initiatives
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/${currentLang}/initiatives`}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-6 hover:underline"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>Back to All Initiatives</span>
        </Link>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-black text-white mb-12 shadow-2xl border border-neutral-800">
          <div className="aspect-[21/9] w-full relative">
            <img
              src={initiative.imageUrl}
              alt={initiative.title[currentLang] || initiative.title.en}
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          </div>

          <div className="absolute bottom-0 inset-inline-0 p-6 sm:p-10">
            <div className="inline-block px-3 py-1 rounded bg-[var(--color-brand-800)] text-white text-[11px] font-mono font-black uppercase tracking-widest mb-3">
              SOVEREIGN STRATEGIC PILLAR
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-black text-white leading-tight">
              {initiative.title[currentLang] || initiative.title.en}
            </h1>
          </div>
        </div>

        {/* Body Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#000000] mb-4">
                Mandate & Strategic Scope
              </h2>
              <p className="text-base text-[#4B5563] leading-relaxed">
                {initiative.fullDesc[currentLang] || initiative.fullDesc.en}
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold text-[#000000] mb-3">
                Key Performance Indicators & Allocations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {initiative.kpis.map((kpi, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                    <div className="text-xl font-mono font-black text-[var(--color-brand-800)] mb-1">
                      {kpi.metric}
                    </div>
                    <div className="text-xs text-[#4B5563] font-medium">
                      {kpi.label[currentLang] || kpi.label.en}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FEE2E2] border border-[var(--color-brand-800)]/20 text-[#991B1B]">
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                <ShieldCheck size={18} />
                <span>Inter-Governmental Regulatory Oversight</span>
              </div>
              <p className="text-xs text-[#991B1B]/80 leading-relaxed">
                This initiative operates under official bilateral instruments ratified by the Iraqi General Secretariat and the Ministry of Commerce of the PRC. All contracts adhere to sovereign clearing standards.
              </p>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-4 text-xs">
              <h4 className="font-black text-sm uppercase tracking-wider text-[#000000] border-b border-[#E5E7EB] pb-3">
                Initiative Dossier
              </h4>
              <div>
                <span className="text-[#4B5563] block">Status:</span>
                <span className="font-mono font-bold text-[var(--color-brand-800)] uppercase">
                  {initiative.status}
                </span>
              </div>
              <div>
                <span className="text-[#4B5563] block">Primary Stakeholders:</span>
                <span className="font-medium text-[#000000] leading-snug block mt-1">
                  {initiative.targetAudience[currentLang] || initiative.targetAudience.en}
                </span>
              </div>
              <div className="pt-2">
                <Link
                  to={`/${currentLang}/contact`}
                  className="w-full block text-center py-3 rounded-xl bg-[var(--color-brand-800)] text-white font-bold uppercase tracking-wider hover:bg-[#A00D26] transition-colors"
                >
                  Contact Initiative Desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IcaInitiativeDetailPage;
