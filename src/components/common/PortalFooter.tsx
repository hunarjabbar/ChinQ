import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Shield, Rss, Globe, Mail, Phone, MapPin, Radio, Layers } from 'lucide-react';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';

export function PortalFooter() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  return (
    <footer className="bg-[#000000] text-[#FFFFFF] border-t border-neutral-800">
      {/* Top Banner Accent */}
      <div className="h-1 bg-[var(--color-brand-800)] w-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Col 1: Brand & Charter */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-800)] text-white flex items-center justify-center font-black text-sm">
                ICA
              </div>
              <div>
                <span className="font-serif font-black text-lg text-white block leading-tight">
                  IRAQI-CHINESE AGENCY
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-brand-800)] font-bold">
                  Sovereign Bilateral Directorate
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              The premier sovereign diplomatic, editorial, and commercial settlement agency facilitating bilateral trade corridors, macroeconomic accords, academic fellowships, and trilingual journalism between Baghdad, Beijing, and Erbil.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-800)] animate-soft-vibrate"></span>
                <span>Signal: Encrypted Telemetry</span>
              </span>
            </div>
          </div>

          {/* Col 2: The Four Rebuilt Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white border-b border-neutral-800 pb-2">
              Ecosystem Portals
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link to={`/${currentLang}`} className="hover:text-[var(--color-brand-800)] transition-colors">
                  {t('nav.public')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/secretariat`} className="hover:text-[var(--color-brand-800)] transition-colors">
                  {t('nav.secretariat')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/newsroom`} className="hover:text-[var(--color-brand-800)] transition-colors">
                  {t('nav.newsroom')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/live`} className="hover:text-[var(--color-brand-800)] transition-colors">
                  {t('nav.live')}
                </Link>
              </li>
              <li>
                <Link to="/hub" className="hover:text-[var(--color-brand-800)] transition-colors flex items-center gap-1">
                  <Shield size={12} className="text-[var(--color-brand-800)]" />
                  <span>{t('nav.commandHub')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Strategic Corridors */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white border-b border-neutral-800 pb-2">
              Core Initiatives
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link to={`/${currentLang}/initiatives/energy-infrastructure`} className="hover:text-[var(--color-brand-800)] transition-colors">
                  {t('initiatives.energy')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/initiatives/sovereign-settlement`} className="hover:text-[var(--color-brand-800)] transition-colors">
                  {t('initiatives.settlement')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/initiatives/trade-corridor`} className="hover:text-[var(--color-brand-800)] transition-colors">
                  {t('initiatives.corridor')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/initiatives/visa-consular`} className="hover:text-[var(--color-brand-800)] transition-colors">
                  {t('initiatives.visa')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/initiatives/tech-ai-innovation`} className="hover:text-[var(--color-brand-800)] transition-colors">
                  {t('initiatives.tech')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Secretariat Desks & Protocol */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white border-b border-neutral-800 pb-2">
              Secretariat Desks
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-[var(--color-brand-800)] shrink-0 mt-0.5" />
                <span>Baghdad: Diplomatic Quarter, Al-Mansour</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-[var(--color-brand-800)] shrink-0 mt-0.5" />
                <span>Beijing: Chaoyang Diplomatic Mission Compound</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-[var(--color-brand-800)] shrink-0 mt-0.5" />
                <span>Erbil: Gulan Financial & Trade Tower</span>
              </li>
              <li className="flex items-center gap-2 pt-2 text-[var(--color-brand-800)] font-mono">
                <Mail size={13} />
                <span>secretariat@iraqi-chineseagency.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feeds and Bottom Legal */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-4">
            <span>© 2026 Iraqi-Chinese Agency (ICA). Sovereign Bilateral Network.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to={`/${currentLang}/newsroom/feed/rss`} className="hover:text-[var(--color-brand-800)] flex items-center gap-1 transition-colors">
              <Rss size={13} className="text-[var(--color-brand-800)]" />
              <span>RSS 2.0</span>
            </Link>
            <Link to={`/${currentLang}/newsroom/feed/atom`} className="hover:text-[var(--color-brand-800)] flex items-center gap-1 transition-colors">
              <Rss size={13} className="text-[var(--color-brand-800)]" />
              <span>Atom</span>
            </Link>
            <Link to={`/${currentLang}/newsroom/sitemap`} className="hover:text-[var(--color-brand-800)] flex items-center gap-1 transition-colors">
              <Globe size={13} className="text-[var(--color-brand-800)]" />
              <span>Sitemap</span>
            </Link>
            <Link to={`/${currentLang}/about`} className="hover:text-white transition-colors">
              {t('nav.about')}
            </Link>
            <Link to={`/${currentLang}/contact`} className="hover:text-white transition-colors">
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PortalFooter;
