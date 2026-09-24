import React from 'react';
import { useParams } from 'react-router-dom';
import { ShieldCheck, Scale, FileText, AlertTriangle } from 'lucide-react';
import { Locale } from '../../types';
import { SettlementLayout } from '../../components/settlement/SettlementLayout';
import { getSettlementTranslation } from '../../locales/settlementTranslations';

export function SettlementLegalPage() {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const lang = (paramLang === 'ck' ? 'ckb' : paramLang || 'en') as Locale;
  const t = (key: string) => getSettlementTranslation(lang, key);

  return (
    <SettlementLayout lang={lang}>
      <div className="max-w-4xl mx-auto space-y-12">
        
        <div className="space-y-3 border-b border-gray-200 pb-6">
          <div className="pay-badge">
            Statutory Legal Basis
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Terms of Use, AML Policy & Legal Disclosures
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Statutory governance, anti-money laundering compliance, and legal terms governing the Iraqi-Chinese Agency Payment Settlement Facilitation Desk.
          </p>
        </div>

        {/* Section 1: Sovereign Facilitation Disclaimer */}
        <div className="p-6 rounded-2xl bg-red-50/70 border border-red-200 space-y-3">
          <div className="flex items-center gap-2 text-sm font-black text-[#991B1B] uppercase tracking-wider">
            <AlertTriangle size={18} />
            <span>{t('settlement.disclaimer.title')}</span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">
            {t('settlement.disclaimer')}
          </p>
        </div>

        {/* Section 2: Terms of Use */}
        <div className="pay-card p-6 sm:p-8 space-y-4 text-xs text-gray-600 leading-relaxed">
          <h2 className="text-base font-black text-gray-900 flex items-center gap-2">
            <FileText size={16} className="text-[#C8102E]" />
            <span>1. Terms of Facilitation Service</span>
          </h2>
          <p>
            1.1. The Iraqi-Chinese Agency (ICA) provides administrative, informational, and technical facilitation services designed to streamline legitimate bilateral commercial settlements between the Republic of Iraq and the People's Republic of China.
          </p>
          <p>
            1.2. Access to direct clearing rates, calculation engines, and dossier generation tools does not constitute a commitment to lend or a guarantee of commercial acceptance by accredited partner banks. Execution remains subject to full documentary scrutiny and approval by the Central Bank of Iraq foreign currency platform.
          </p>
          <p>
            1.3. Users warrant that all financial, commercial, and entity information submitted through this portal is accurate, lawful, and substantiated by genuine trade contracts, commercial invoices, and customs documentation.
          </p>
        </div>

        {/* Section 3: AML/CFT Statutory Policy */}
        <div className="pay-card p-6 sm:p-8 space-y-4 text-xs text-gray-600 leading-relaxed">
          <h2 className="text-base font-black text-gray-900 flex items-center gap-2">
            <Scale size={16} className="text-[#C8102E]" />
            <span>2. Anti-Money Laundering & Sanctions Policy</span>
          </h2>
          <p>
            2.1. In strict compliance with the Iraqi Anti-Money Laundering and Counter-Terrorism Financing Law No. 39 of 2015, all bilateral settlement inquiries undergo comprehensive customer due diligence (CDD).
          </p>
          <p>
            2.2. The desk automatically screens all remitters, beneficiaries, beneficial owners, and associated logistical intermediaries against UN Security Council sanctions lists and Central Bank of Iraq enforcement circulars. Transactions involving sanctioned persons or prohibited dual-use items will be rejected immediately and reported to relevant regulatory authorities.
          </p>
          <p>
            2.3. The desk maintains a zero-tolerance policy regarding anonymous transactions, shell corporation fronting, or false invoicing schemes.
          </p>
        </div>

        {/* Section 4: Privacy & Data Protection */}
        <div className="pay-card p-6 sm:p-8 space-y-4 text-xs text-gray-600 leading-relaxed">
          <h2 className="text-base font-black text-gray-900 flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#C8102E]" />
            <span>3. Data Protection & Confidentiality</span>
          </h2>
          <p>
            Commercial contracts, bank account details, and passport credentials uploaded through the settlement desk are encrypted in transit via TLS 1.3 and stored with AES-256 host encryption. Records are disclosed exclusively to accredited clearing banks and official regulatory authorities as mandated by sovereign audit directives.
          </p>
        </div>

      </div>
    </SettlementLayout>
  );
}
