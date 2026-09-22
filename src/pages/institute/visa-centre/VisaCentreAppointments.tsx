import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, CheckCircle2, User, Mail, Phone, Building, AlertCircle, ShieldCheck } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreStore } from '../../../store/useVisaCentreStore';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';
import { VisaNavHeader } from '../../../components/institute/visa-centre/VisaNavHeader';
import { VisaDisclaimer } from '../../../components/institute/visa-centre/VisaDisclaimer';

export const VisaCentreAppointments: React.FC = () => {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const validLang = (lang as Locale) || 'en';
  const { vt } = useVisaCentreI18n(validLang);

  const bookAppointment = useVisaCentreStore((s) => s.bookAppointment);

  const [appointmentType, setAppointmentType] = useState<'consular-biometrics' | 'institute-pre-audit' | 'virtual-advisory'>('institute-pre-audit');
  const [direction, setDirection] = useState<'iraq-to-china' | 'china-to-iraq'>('iraq-to-china');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('M (Business)');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !email.trim() || !phone.trim() || !preferredDate) {
      setErrorMessage(
        validLang === 'zh'
          ? '请填写完整的姓名、联系邮箱、电话及预约日期。'
          : validLang === 'ar'
          ? 'يرجى إكمال جميع الحقول الإلزامية: الاسم، البريد، الهاتف، والتاريخ.'
          : 'Please fill in all mandatory fields: name, email, phone, and date.'
      );
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = bookAppointment({
        applicantName,
        applicantPhone: phone,
        applicantEmail: email,
        location: direction === 'iraq-to-china' ? 'chinese-consulate-erbil' : 'iraqi-embassy-beijing',
        type: (appointmentType as any) || 'submission',
        date: preferredDate,
        time: preferredTime,
        notes: `Category: ${category} | ${notes}`
      });

      setBookingSuccess(res);
      setIsSubmitting(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Booking failed');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <VisaDisclaimer lang={validLang} variant="banner" id="apt-top-disclaimer" />
      <VisaNavHeader lang={validLang} />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 space-y-8 w-full">
        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal/10 text-royal text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>{vt('navAppointments')}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            {vt('bookAppointmentBtn')}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Schedule an in-person dossier pre-audit at our Erbil Institute offices, virtual advisory session, or consular submission slot.
          </p>
        </div>

        {bookingSuccess ? (
          /* Confirmation Card */
          <div className="p-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 space-y-6 animate-in fade-in-50">
            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-8 h-8 shrink-0" />
              <div>
                <h2 className="text-xl font-bold">Appointment Confirmed!</h2>
                <p className="text-xs text-foreground/80">Your appointment has been registered in the Institute advisory queue.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="text-xs text-muted-foreground">Confirmation Code:</span>
                <span className="font-mono text-lg font-bold text-royal">{bookingSuccess.confirmationNumber}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Appointment Type</span>
                  <span className="font-semibold text-foreground capitalize">{bookingSuccess.appointmentType.replace('-', ' ')}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Scheduled Date</span>
                  <span className="font-semibold text-foreground">{bookingSuccess.date}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Time Slot</span>
                  <span className="font-semibold text-foreground">{bookingSuccess.time}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Applicant</span>
                  <span className="font-semibold text-foreground">{bookingSuccess.applicantName}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-muted-foreground">
                A confirmation dispatch has been logged for {bookingSuccess.email}.
              </span>
              <button
                type="button"
                onClick={() => {
                  setBookingSuccess(null);
                  setApplicantName('');
                  setEmail('');
                  setPhone('');
                  setPreferredDate('');
                }}
                className="px-4 py-2 rounded-xl bg-royal text-white font-semibold"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleBook} className="p-8 rounded-3xl border border-border bg-card space-y-6">
            {errorMessage && (
              <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-xs text-rose-600 dark:text-rose-400 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Type & Direction */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Appointment Classification *
                </label>
                <select
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                >
                  <option value="institute-pre-audit">In-Person Dossier Pre-Audit (Erbil Institute HQ)</option>
                  <option value="virtual-advisory">Virtual Online Advisory (Video Consultation, 30 min)</option>
                  <option value="consular-biometrics">Consular Biometrics Coordination (Consulate Counter)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Travel Direction *
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
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Preferred Time Slot *
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                >
                  <option value="09:00 AM">09:00 AM – 10:00 AM</option>
                  <option value="10:00 AM">10:00 AM – 11:00 AM</option>
                  <option value="11:00 AM">11:00 AM – 12:00 PM</option>
                  <option value="01:00 PM">01:00 PM – 02:00 PM</option>
                  <option value="02:00 PM">02:00 PM – 03:00 PM</option>
                  <option value="03:00 PM">03:00 PM – 04:00 PM</option>
                </select>
              </div>
            </div>

            {/* Applicant Contacts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Full Name (as in Passport) *
                </label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Ahmed Al-Bayati"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="applicant@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+964 750 000 0000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Special Inquiries or Documents Prepared
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Mention whether you already have an official Chinese commercial invitation, university admission letter, or need assistance drafting..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
              />
            </div>

            {/* Disclaimer acknowledgment */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-royal shrink-0 mt-0.5" />
              <span>
                By booking this appointment, you acknowledge that the Bilateral Visa Consultancy &amp; Facilitation Centre operates as an independent advisory body. Decisions are made solely by sovereign consular missions.
              </span>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl bg-royal hover:bg-royal/90 text-white font-semibold text-xs md:text-sm shadow-sm transition-all"
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Appointment Reservation'}
              </button>
            </div>
          </form>
        )}
      </main>

      <VisaDisclaimer lang={validLang} variant="card" id="apt-footer-disclaimer" />
    </div>
  );
};
