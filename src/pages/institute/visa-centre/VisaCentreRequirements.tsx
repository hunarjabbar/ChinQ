import React from 'react';
import { useParams } from 'react-router-dom';
import { FileCheck, Camera, Building2, CreditCard, ShieldCheck } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';
import { VisaNavHeader } from '../../../components/institute/visa-centre/VisaNavHeader';
import { VisaDisclaimer } from '../../../components/institute/visa-centre/VisaDisclaimer';
import { VisaChecklistBuilder } from '../../../components/institute/visa-centre/VisaChecklistBuilder';

export const VisaCentreRequirements: React.FC = () => {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const validLang = (lang as Locale) || 'en';
  const { vt } = useVisaCentreI18n(validLang);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <VisaDisclaimer lang={validLang} variant="banner" id="req-top-disclaimer" />
      <VisaNavHeader lang={validLang} />

      <main className="page-container flex-1 py-10 space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal/10 text-royal text-xs font-semibold">
            <FileCheck className="w-3.5 h-3.5" />
            <span>{vt('navRequirements')}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            {vt('navRequirements')} &amp; Dossier Standards
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Standardized technical specifications for biometric photos, commercial invitation letters, bank statements, and corporate registration documents.
          </p>
        </div>

        {/* Technical Standards Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-royal/10 text-royal flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-foreground">
              {validLang === 'zh' ? '领事证件照片标准 (33×48mm)' : validLang === 'ar' ? 'معايير الصور القنصلية (33×48 ملم)' : 'Consular Photo Specs'}
            </h2>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
              <li>Pure white background with no shadows or borders</li>
              <li>Size: 33mm (width) × 48mm (height)</li>
              <li>Face width: 15–22mm; Head length: 28–33mm</li>
              <li>Neutral facial expression, eyes open, bareheaded</li>
              <li>Taken within the preceding 6 months</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-royal/10 text-royal flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-foreground">
              {validLang === 'zh' ? '中方商业邀请函必备要素' : validLang === 'ar' ? 'شروط خطاب الدعوة الصيني' : 'Commercial Invitation Letter'}
            </h2>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
              <li>Official letterhead with address and telephone</li>
              <li>Inviting entity Unified Social Credit Code</li>
              <li>Full traveler name, passport number, and date of birth</li>
              <li>Clear business purpose, visit dates, and expense source</li>
              <li>Official red corporate seal and legal representative signature</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-royal/10 text-royal flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-foreground">
              {validLang === 'zh' ? '银行流水及财务资信凭据' : validLang === 'ar' ? 'كشف الحساب البنكي والضمان المالي' : 'Financial Statement Verification'}
            </h2>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
              <li>Original commercial bank stamp on official stationery</li>
              <li>Coverage of last 6 consecutive calendar months</li>
              <li>Minimum verifiable balance of $5,000 USD or equivalent</li>
              <li>Certified English or Arabic translation if required</li>
              <li>Corporate account statements for business owners</li>
            </ul>
          </div>
        </div>

        {/* Dynamic Checklist Builder Tool */}
        <VisaChecklistBuilder lang={validLang} id="page-checklist-builder" />
      </main>

      <div className="page-container pb-8">
        <VisaDisclaimer lang={validLang} variant="card" id="req-footer-disclaimer" />
      </div>
    </div>
  );
};
