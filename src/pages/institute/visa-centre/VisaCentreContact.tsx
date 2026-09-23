import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, ShieldCheck, CheckCircle2, Building2 } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreStore } from '../../../store/useVisaCentreStore';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';
import { VisaNavHeader } from '../../../components/institute/visa-centre/VisaNavHeader';
import { VisaDisclaimer } from '../../../components/institute/visa-centre/VisaDisclaimer';

export const VisaCentreContact: React.FC = () => {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const validLang = (lang as Locale) || 'en';
  const { vt } = useVisaCentreI18n(validLang);

  const settings = useVisaCentreStore((s) => s.settings);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Dossier Pre-Audit Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <VisaDisclaimer lang={validLang} variant="banner" id="contact-top-disclaimer" />
      <VisaNavHeader lang={validLang} />

      <main className="page-container flex-1 py-10 space-y-12">
        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal/10 text-royal text-xs font-semibold">
            <Phone className="w-3.5 h-3.5" />
            <span>{vt('navContact')}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Contact Visa Facilitation Desk &amp; Consular Directory
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Direct communication channels for the Institute&apos;s bilingual visa advisory staff and official directories for Chinese and Iraqi diplomatic missions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Contact Cards & Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Consultation Desk Card */}
            <div className="p-6 md:p-8 rounded-3xl border border-border bg-card space-y-6">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Building2 className="w-5 h-5 text-royal" />
                <span>Institute Bilateral Visa Advisory Desk (Erbil)</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-muted/40 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-royal font-semibold">
                    <MapPin className="w-4 h-4" />
                    <span>Physical Location</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Chinese Institute for Strategic and Economic Studies, Gulan Tower, 5th Floor, Erbil, Kurdistan Region, Iraq
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-royal font-semibold">
                    <Clock className="w-4 h-4" />
                    <span>Advisory Hours</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Sunday – Thursday: 08:30 – 16:30<br />
                    Friday – Saturday: Closed (Consular Emergency on call)
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-royal font-semibold">
                    <Phone className="w-4 h-4" />
                    <span>Direct Desk Line</span>
                  </div>
                  <p className="text-muted-foreground font-mono">
                    {settings.contactPhone}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-royal font-semibold">
                    <Mail className="w-4 h-4" />
                    <span>Direct Inquiries</span>
                  </div>
                  <p className="text-muted-foreground font-mono">
                    {settings.contactEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Inquiry Form */}
            <div className="p-6 md:p-8 rounded-3xl border border-border bg-card space-y-6">
              <h2 className="text-lg font-bold text-foreground">
                Submit an Advisory Inquiry
              </h2>

              {submitted ? (
                <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Inquiry Logged Successfully</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Thank you. A member of our bilingual consular advisory staff will review your message and reply via email or phone within 1 business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="text-xs text-royal font-semibold hover:underline"
                  >
                    Submit another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        required
                        className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                        required
                        className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+964 750 000 0000"
                        className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">Subject</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                      >
                        <option value="Dossier Pre-Audit Inquiry">Dossier Pre-Audit Inquiry</option>
                        <option value="Commercial Invitation Verification">Commercial Invitation Verification</option>
                        <option value="Biometric Slot Scheduling">Biometric Slot Scheduling</option>
                        <option value="Corporate Delegation Facilitation">Corporate Delegation Facilitation</option>
                        <option value="Visa Refusal Consultation">Visa Refusal Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Your Message *</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Detail your inquiry, intended dates, and whether you possess a registered Chinese commercial invitation letter..."
                      required
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3 min-h-[44px] rounded-xl bg-royal hover:bg-royal/90 text-white font-semibold text-xs inline-flex items-center gap-2 shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-royal active:scale-[0.98]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Col: Diplomatic Missions Directory */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl border border-border bg-card space-y-4">
              <h2 className="text-base font-bold text-foreground">
                Diplomatic Missions Directory
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Official diplomatic representations authorized for sovereign visa adjudication and passport stamping:
              </p>

              <div className="space-y-4 pt-2 text-xs">
                {/* Erbil Consulate */}
                <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-1">
                  <span className="font-bold text-foreground block">
                    Consulate General of the People&apos;s Republic of China in Erbil
                  </span>
                  <p className="text-muted-foreground">
                    Address: Dream City, Erbil, Kurdistan Region, Iraq
                  </p>
                  <p className="text-muted-foreground font-mono">
                    Consular Tel: +964 751 185 7364
                  </p>
                  <a
                    href="http://erbil.china-consulate.gov.cn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-royal hover:underline block pt-1"
                  >
                    Official Portal →
                  </a>
                </div>

                {/* Baghdad Embassy */}
                <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-1">
                  <span className="font-bold text-foreground block">
                    Embassy of the People&apos;s Republic of China in Baghdad
                  </span>
                  <p className="text-muted-foreground">
                    Address: Al-Mansour, Baghdad, Iraq
                  </p>
                  <a
                    href="http://iq.china-embassy.gov.cn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-royal hover:underline block pt-1"
                  >
                    Official Portal →
                  </a>
                </div>

                {/* Iraqi Embassy Beijing */}
                <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-1">
                  <span className="font-bold text-foreground block">
                    Embassy of the Republic of Iraq in Beijing
                  </span>
                  <p className="text-muted-foreground">
                    Address: 25 Xiu Shui Bei Jie, Jianguomenwai, Chaoyang District, Beijing, China
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="page-container pb-8">
        <VisaDisclaimer lang={validLang} variant="card" id="contact-footer-disclaimer" />
      </div>
    </div>
  );
};
