import React, { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { FileCheck, ShieldCheck, Lock, AlertCircle, CheckCircle2, ArrowRight, Printer } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreStore } from '../../../store/useVisaCentreStore';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';
import { VisaNavHeader } from '../../../components/institute/visa-centre/VisaNavHeader';
import { VisaDisclaimer } from '../../../components/institute/visa-centre/VisaDisclaimer';

export const VisaCentreApply: React.FC = () => {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const validLang = (lang as Locale) || 'en';
  const { vt } = useVisaCentreI18n(validLang);
  const [searchParams] = useSearchParams();

  const prefilledService = searchParams.get('service') || '';
  const prefilledCategory = searchParams.get('category') || 'M';

  const services = useVisaCentreStore((s) => s.services.filter((srv) => !srv.deletedAt));
  const visaCategories = useVisaCentreStore((s) => s.visaCategories.filter((c) => !c.deletedAt));
  const submitApplication = useVisaCentreStore((s) => s.submitApplication);

  // Form State
  const [direction, setDirection] = useState<'iraq-to-china' | 'china-to-iraq'>('iraq-to-china');
  const [visaCategory, setVisaCategory] = useState(prefilledCategory);
  const [servicePackage, setServicePackage] = useState(prefilledService || 'commercial-dossier-review');
  const [givenName, setGivenName] = useState('');
  const [surname, setSurname] = useState('');
  const [nationality, setNationality] = useState('Iraqi');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [passportExpiry, setPassportExpiry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelPurpose, setTravelPurpose] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [consentDisclaimer, setConsentDisclaimer] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [createdRecord, setCreatedRecord] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!givenName.trim() || !surname.trim() || !passportNumber.trim() || !email.trim() || !phone.trim() || !travelPurpose.trim()) {
      setErrorMessage(
        validLang === 'zh'
          ? '请完整填写申请人姓名、护照号、联系电话与访问目的。'
          : validLang === 'ar'
          ? 'يرجى إكمال جميع الحقول الأساسية: الاسم، رقم الجواز، الهاتف، والغرض من السفر.'
          : 'Please complete all required fields including name, passport number, phone, and travel purpose.'
      );
      return;
    }

    if (!consentDisclaimer) {
      setErrorMessage(
        validLang === 'zh'
          ? '请勾选确认同意本中心非发签证机构及独立咨询免责声明。'
          : validLang === 'ar'
          ? 'يرجى الإقرار والموافقة على إخلاء المسؤولية القنصلي واستقلالية المركز.'
          : 'Please acknowledge the Independence Disclaimer and Non-Issuing Authority notice.'
      );
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const app = submitApplication({
        direction,
        visaCategory,
        servicePackage,
        applicant: {
          givenName,
          surname,
          nationality,
          dateOfBirth,
          passportNumber,
          passportExpiry,
          email,
          phone,
          companyName: companyName.trim() || undefined
        },
        travelDetails: {
          travelPurpose,
          intendedTravelDate: travelDate || undefined
        }
      });

      setCreatedRecord(app);
      setIsSubmitting(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission failed');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <VisaDisclaimer lang={validLang} variant="banner" id="apply-top-disclaimer" />
      <VisaNavHeader lang={validLang} />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 space-y-8 w-full">
        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal/10 text-royal text-xs font-semibold">
            <FileCheck className="w-3.5 h-3.5" />
            <span>{vt('requestServiceBtn')}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Bilateral Visa Facilitation &amp; Pre-Audit Request
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Submit your dossier details for bilingual compliance review, official invitation verification, and biometric appointment coordination.
          </p>
        </div>

        {createdRecord ? (
          /* Receipt Card */
          <div className="p-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 space-y-6 animate-in fade-in-50">
            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-8 h-8 shrink-0" />
              <div>
                <h2 className="text-xl font-bold">Dossier Registered Successfully!</h2>
                <p className="text-xs text-foreground/80">Your application dossier has been queued for preliminary advisory review.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <span className="text-[11px] text-muted-foreground block uppercase font-semibold">
                    Permanent Consular Reference ID
                  </span>
                  <span className="font-mono text-xl font-bold text-royal">
                    {createdRecord.referenceId}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    Status: Received &amp; Queued
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Primary Applicant</span>
                  <span className="font-semibold text-foreground">{givenName} {surname}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Visa Direction</span>
                  <span className="font-semibold text-foreground">
                    {createdRecord.direction === 'iraq-to-china' ? 'Iraq → China' : 'China → Iraq'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Category</span>
                  <span className="font-semibold text-foreground font-mono">{createdRecord.visaCategory}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Registered Email</span>
                  <span className="font-semibold text-foreground">{email}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground">
                <span className="font-semibold text-foreground block mb-0.5">Encrypted PII Guarantee:</span>
                Passport details were encrypted upon submission and stored in compliance with the Institute Security Protocol.
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card hover:bg-muted text-xs font-semibold text-foreground"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Submission Receipt
              </button>

              <Link
                to={`/${validLang}/institute/visa-centre/track`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-royal hover:bg-royal/90 text-white text-xs font-semibold shadow-sm"
              >
                <span>Track Application in Real Time</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          /* Submission Form */
          <form onSubmit={handleSubmit} className="p-8 rounded-3xl border border-border bg-card space-y-6">
            {errorMessage && (
              <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-xs text-rose-600 dark:text-rose-400 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Travel Scope */}
            <div className="border-b border-border pb-5 space-y-4">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
                1. Visa Classification &amp; Service Package
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Travel Corridor *
                  </label>
                  <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                  >
                    <option value="iraq-to-china">{vt('dirIraqToChina')}</option>
                    <option value="china-to-iraq">{vt('dirChinaToIraq')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Visa Category Code *
                  </label>
                  <select
                    value={visaCategory}
                    onChange={(e) => setVisaCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                  >
                    {visaCategories
                      .filter((c) => c.direction === direction)
                      .map((c) => (
                        <option key={c.id} value={c.category}>
                          {c.category} — {c.officialName[validLang] || c.officialName.en}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Advisory Service *
                  </label>
                  <select
                    value={servicePackage}
                    onChange={(e) => setServicePackage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.slug}>
                        {s.title[validLang] || s.title.en} (${s.priceUSD} USD)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Applicant Personal & Passport Info */}
            <div className="border-b border-border pb-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
                  2. Applicant Profile &amp; Passport Details
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  <Lock className="w-3 h-3 text-emerald-500" />
                  Encrypted at Rest
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Given Name(s) *
                  </label>
                  <input
                    type="text"
                    value={givenName}
                    onChange={(e) => setGivenName(e.target.value)}
                    placeholder="e.g. Ahmed"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Surname / Family Name *
                  </label>
                  <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="e.g. Al-Bayati"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Nationality *
                  </label>
                  <input
                    type="text"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Passport Number *
                  </label>
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    placeholder="e.g. A12345678"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Passport Expiry Date *
                  </label>
                  <input
                    type="date"
                    value={passportExpiry}
                    onChange={(e) => setPassportExpiry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+964 750 000 0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Tigris Commercial Group"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                  />
                </div>
              </div>
            </div>

            {/* Travel Purpose & Itinerary */}
            <div className="border-b border-border pb-5 space-y-4">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
                3. Purpose of Travel &amp; Itinerary
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Detailed Travel Purpose *
                  </label>
                  <textarea
                    value={travelPurpose}
                    onChange={(e) => setTravelPurpose(e.target.value)}
                    rows={3}
                    placeholder="Describe specific business negotiations, factory inspections, Canton Fair attendance, university registration, or tourist visit..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Intended Departure Date
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                  />
                </div>
              </div>
            </div>

            {/* Mandatory Independence Consent */}
            <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 space-y-3">
              <div className="flex items-start gap-3">
                <input
                  id="consent-check"
                  type="checkbox"
                  checked={consentDisclaimer}
                  onChange={(e) => setConsentDisclaimer(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-royal focus:ring-royal focus:ring-offset-0"
                />
                <label htmlFor="consent-check" className="text-xs text-foreground/90 leading-relaxed font-medium cursor-pointer">
                  <strong>Mandatory Acknowledgment &amp; Consent:</strong> I understand and confirm that the Bilateral Visa Consultancy &amp; Facilitation Centre is an independent advisory body operated by the Chinese Institute for Strategic and Economic Studies. It is NOT a visa-issuing authority. Final visa decisions, validity, and entry approvals rest solely with the Government of the People&apos;s Republic of China or the Government of the Republic of Iraq.
                </label>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-xl bg-royal hover:bg-royal/90 text-white font-semibold text-xs md:text-sm shadow-sm transition-all"
              >
                {isSubmitting ? 'Registering Dossier...' : 'Submit Application Dossier'}
              </button>
            </div>
          </form>
        )}
      </main>

      <VisaDisclaimer lang={validLang} variant="card" id="apply-footer-disclaimer" />
    </div>
  );
};
