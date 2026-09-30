import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Award, Globe, Building2, MapPin, CheckCircle2 } from 'lucide-react';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function IcaAboutPage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEE2E2] text-[#991B1B] text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Shield size={14} className="text-[var(--color-brand-800)]" />
            <span>Official Bilateral Mandate</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#000000] mb-4">
            The Iraqi-Chinese Agency (ICA)
          </h1>
          <p className="text-base text-[#4B5563] leading-relaxed">
            Established under sovereign bilateral accords, the Iraqi-Chinese Agency operates as the permanent institutional nexus bridging Beijing, Baghdad, and Erbil across strategic corridors, diplomatic telemetry, digital settlements, and sovereign media.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
            <Building2 size={28} className="text-[var(--color-brand-800)] mb-4" />
            <h3 className="font-serif text-lg font-bold text-[#000000] mb-2">
              Sovereign Administration
            </h3>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Operating joint plenipotentiary desks coordinating ministerial ratifications, infrastructure tenders, and bilateral trade compliance.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
            <Globe size={28} className="text-[var(--color-brand-800)] mb-4" />
            <h3 className="font-serif text-lg font-bold text-[#000000] mb-2">
              Trilingual Journalism
            </h3>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Publishing verified dispatches, investigative macroeconomic briefs, and state declarations in English, Arabic, Chinese, and Kurdish.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
            <Award size={28} className="text-[var(--color-brand-800)] mb-4" />
            <h3 className="font-serif text-lg font-bold text-[#000000] mb-2">
              Financial Clearance
            </h3>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Supervising the direct IQD & e-CNY settlement gateway to empower commercial imports, construction contracts, and banking liquidity.
            </p>
          </div>
        </div>

        {/* Permanent Secretariat Bureaus */}
        <div className="p-8 rounded-3xl bg-[#000000] text-white">
          <h2 className="font-serif text-2xl font-black text-white mb-6 border-b border-neutral-800 pb-4">
            Bilateral Secretariat Bureaus
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-300">
            <div>
              <div className="flex items-center gap-2 text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-1">
                <MapPin size={14} />
                <span>Baghdad Central HQ</span>
              </div>
              <p className="text-neutral-400">
                Al-Mansour Diplomatic Quarter, Sector 602, Building 14.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-1">
                <MapPin size={14} />
                <span>Beijing Liaison Mission</span>
              </div>
              <p className="text-neutral-400">
                Chaoyang District, Liangmaqiao Diplomatic Compound, Tower B.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-1">
                <MapPin size={14} />
                <span>Erbil Northern Desk</span>
              </div>
              <p className="text-neutral-400">
                Gulan Tower, 18th Floor, Trade Council & Consular Wing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IcaAboutPage;
