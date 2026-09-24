import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Scale, Landmark, FileCheck, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { Locale } from '../../types';
import { SettlementLayout } from '../../components/settlement/SettlementLayout';
import { ComplianceBadges } from '../../components/settlement/ComplianceBadges';
import { getSettlementTranslation } from '../../locales/settlementTranslations';

export function SettlementCompliancePage() {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const lang = (paramLang === 'ck' ? 'ckb' : paramLang || 'en') as Locale;
  const t = (key: string) => getSettlementTranslation(lang, key);
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';

  return (
    <SettlementLayout lang={lang}>
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4 border-b border-gray-200 pb-8">
          <div className="pay-badge">
            Regulatory & AML Standards
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            {isAr ? 'الأطر الرقابية والامتثال المالي' : isZh ? '双边合规与反洗钱监管体系' : isCkb ? 'پابەندبوونی دارایی و یاسایی' : 'Compliance & AML Framework'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            The Iraqi-Chinese Agency operates within a rigorous, multi-jurisdictional compliance framework governed by Central Bank of Iraq (CBI) directives, People's Bank of China (PBoC) cross-border regulations, and international anti-financial crime treaties.
          </p>
        </div>

        {/* 3 Jurisdictional Pillars */}
        <div className="space-y-8">
          
          {/* Pillar 1: Iraqi Sovereign Compliance */}
          <div className="pay-card p-6 sm:p-8 space-y-4 border-s-4 border-s-[#C8102E]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C8102E] flex items-center justify-center font-bold">
                <Landmark size={20} />
              </div>
              <div>
                <h2 className="text-lg font-black text-gray-900">
                  1. Iraqi Banking & Central Bank Regulations
                </h2>
                <div className="text-xs text-gray-500">Central Bank of Iraq (CBI) Oversight</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              All commercial settlements facilitated by ICA conform to Central Bank of Iraq directives governing foreign exchange transactions, the foreign currency electronic platform, and trade finance:
            </p>

            <ul className="space-y-2 text-xs text-gray-700 ps-4 list-disc">
              <li><strong>Direct Yuan Clearing Directives (2023/2024):</strong> Authorization of direct import financing from China denominated in Chinese Yuan (RMB) via approved commercial banking channels.</li>
              <li><strong>AML/CFT Law No. 39 of 2015:</strong> Mandatory identification of Ultimate Beneficial Owners (UBO), verification of commercial legitimacy, and sanctions screening.</li>
              <li><strong>Electronic Platform Reporting:</strong> All import orders are documented and reconciled with the Central Bank of Iraq's official foreign exchange clearance system.</li>
            </ul>
          </div>

          {/* Pillar 2: Chinese Regulatory Framework */}
          <div className="pay-card p-6 sm:p-8 space-y-4 border-s-4 border-s-red-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C8102E] flex items-center justify-center font-bold">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h2 className="text-lg font-black text-gray-900">
                  2. Chinese Cross-Border Monetary Regulations
                </h2>
                <div className="text-xs text-gray-500">People's Bank of China (PBoC) & CIPS Rails</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Transactions destined for Chinese enterprises adhere to the regulatory architecture of the People's Bank of China and the State Administration of Foreign Exchange (SAFE):
            </p>

            <ul className="space-y-2 text-xs text-gray-700 ps-4 list-disc">
              <li><strong>Cross-Border Interbank Payment System (CIPS):</strong> Direct clearance over CIPS infrastructure, ensuring immediate settlement in onshore and offshore Renminbi without dependency on Western clearing hubs.</li>
              <li><strong>Cross-Border RMB Settlement Regulations:</strong> Genuine trade contract verification in compliance with PBoC Order [2020] No. 330.</li>
              <li><strong>SAFE Foreign Trade Declarations:</strong> Harmonized verification with Chinese Customs and international commercial invoices.</li>
            </ul>
          </div>

          {/* Pillar 3: International Standards */}
          <div className="pay-card p-6 sm:p-8 space-y-4 border-s-4 border-s-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-800 flex items-center justify-center font-bold">
                <Scale size={20} />
              </div>
              <div>
                <h2 className="text-lg font-black text-gray-900">
                  3. International Anti-Financial Crime Standards
                </h2>
                <div className="text-xs text-gray-500">FATF, Wolfsberg Group, & ISO 20022</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              The desk maintains strict anti-financial crime screening at every stage:
            </p>

            <ul className="space-y-2 text-xs text-gray-700 ps-4 list-disc">
              <li><strong>FATF 40 Recommendations:</strong> Risk-based customer due diligence (CDD) and enhanced due diligence (EDD) for high-value transactions.</li>
              <li><strong>Sanctions Screening:</strong> Automated checking against UN Security Council, OFAC, and bilateral sanctions lists. Prohibited entities are rejected at step 1.</li>
              <li><strong>ISO 20022 Financial Messaging:</strong> Rich metadata payload standards preventing fraud, truncation, and misrouting.</li>
            </ul>
          </div>

        </div>

        {/* Regulatory Badges */}
        <ComplianceBadges lang={lang} />

        {/* Mandatory Regulatory Notice (Part 8.5) */}
        <div className="p-6 rounded-2xl bg-red-50/80 border border-red-200 space-y-3">
          <div className="flex items-center gap-2 text-sm font-black text-[#991B1B] uppercase tracking-wider">
            <AlertTriangle size={18} />
            <span>{t('settlement.disclaimer.title')}</span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">
            {t('settlement.disclaimer')}
          </p>
        </div>

      </div>
    </SettlementLayout>
  );
}
