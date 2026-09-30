import React from 'react';
import { Locale, translations } from '../locales';
import { Shield, Lock, MapPin, Mail, Phone } from 'lucide-react';

interface FooterProps {
  currentLocale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ currentLocale }) => {
  const t = translations[currentLocale];

  return (
    <footer className="bg-[#111111] text-neutral-400 border-t border-neutral-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Identity column */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-[var(--color-brand-800)] text-white font-black flex items-center justify-center text-sm">ICA</span>
              <span className="text-white font-bold text-sm tracking-tight">{t.appName}</span>
            </div>
            <p className="text-neutral-400 leading-relaxed text-xs">
              {t.tagline}
            </p>
            <div className="flex items-center gap-1.5 text-neutral-500 text-[11px]">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              <span>SSL/TLS Encrypted Diplomatic Channel</span>
            </div>
          </div>

          {/* Diplomatic Bureaus */}
          <div className="space-y-2">
            <h4 className="text-white font-bold tracking-wider uppercase text-[11px] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[var(--color-brand-800)]" />
              Regional Bureaus
            </h4>
            <ul className="space-y-1.5 text-neutral-400 text-xs">
              <li><strong className="text-neutral-200">Baghdad HQ:</strong> Al-Karrada Diplomatic Sector, Dist. 902</li>
              <li><strong className="text-neutral-200">Beijing Bureau:</strong> Chaoyang International Media Hub</li>
              <li><strong className="text-neutral-200">Erbil Secretariat:</strong> Gulan Tower, Trade Council Wing</li>
              <li><strong className="text-neutral-200">Basra Office:</strong> Grand Faw Logistics Liaison</li>
            </ul>
          </div>

          {/* Institutional Pillars */}
          <div className="space-y-2">
            <h4 className="text-white font-bold tracking-wider uppercase text-[11px] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[var(--color-brand-800)]" />
              Institutional Divisions
            </h4>
            <ul className="space-y-1.5 text-neutral-400 text-xs">
              <li>• ICA Media & Newsroom</li>
              <li>• Chinese Institute for Strategic and Economic Studies</li>
              <li>• Payment Settlement Facilitation (IQD / CNY / USD)</li>
              <li>• Iraq-China Economic Summit & Bilateral Expo</li>
              <li>• CISE Industrial Sourcing & Inspection Desk</li>
            </ul>
          </div>

          {/* Security & Verification */}
          <div className="space-y-2">
            <h4 className="text-white font-bold tracking-wider uppercase text-[11px] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[var(--color-brand-800)]" />
              Official Verification
            </h4>
            <p className="text-neutral-400 leading-relaxed text-[11px]">
              All dispatches, economic indices, and exchange rate parameters are authorized by accredited sovereign research analysts.
            </p>
            <div className="pt-2 text-neutral-300 font-mono text-[11px] space-y-1">
              <div>secretariat@iraq-china.agency</div>
              <div>press@cise-studies.org</div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} {t.common.allRightsReserved}
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-300 transition-colors">Privacy Framework</span>
            <span>·</span>
            <span className="hover:text-neutral-300 transition-colors">Compliance Codex</span>
            <span>·</span>
            <span className="hover:text-neutral-300 transition-colors">Sovereign Data Protection</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
