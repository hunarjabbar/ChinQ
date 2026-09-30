import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Radio, Clock, ShieldCheck } from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function LiveSchedulePage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const schedule = portalStore.getScheduleItems();

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/${currentLang}/live`}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-6 hover:underline"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>Back to Media Hub</span>
        </Link>

        <div className="mb-10 pb-6 border-b border-[#E5E7EB]">
          <span className="text-xs font-mono font-bold text-[var(--color-brand-800)] uppercase tracking-wider block mb-1">
            Official Broadcast Transmission Schedule
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#000000]">
            Bilateral Broadcast Schedule
          </h1>
          <p className="text-sm text-[#4B5563] mt-2">
            Synchronized transmission times across Baghdad (UTC+3) and Beijing (UTC+8).
          </p>
        </div>

        <div className="space-y-6">
          {schedule.map(item => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border transition-all ${
                item.isLive
                  ? 'bg-[#FEE2E2] border-[var(--color-brand-800)] shadow-md'
                  : 'bg-[#F9FAFB] border-[#E5E7EB]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="font-mono text-sm font-black text-[#000000]">
                    {item.timeSlot}
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-white text-[var(--color-brand-800)] text-[10px] font-mono font-bold uppercase border border-[#E5E7EB]">
                    {item.category[currentLang] || item.category.en}
                  </span>
                </div>

                {item.isLive ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-brand-800)] text-white text-[10px] font-mono font-bold uppercase tracking-widest animate-soft-vibrate">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    <span>ON AIR NOW</span>
                  </span>
                ) : (
                  <span className="text-xs font-mono text-[#4B5563]">Upcoming</span>
                )}
              </div>

              <h3 className="font-serif text-xl font-bold text-[#000000] mb-2">
                {item.title[currentLang] || item.title.en}
              </h3>

              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                {item.description[currentLang] || item.description.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LiveSchedulePage;
