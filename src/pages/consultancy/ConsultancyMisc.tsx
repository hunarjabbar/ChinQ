import React from 'react';
import { Locale } from '../../types';
import { useI18n } from '../../hooks/useI18n';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Scale, HelpCircle, FileText, CheckCircle2, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { Disclosure } from '../../components/consultancy/Disclosure';

const PageWrapper = ({ title, subtitle, children, lang }: { title: string, subtitle: string, children: React.ReactNode, lang: string }) => (
  <div className="bg-white min-h-screen">
    <header className="py-12 border-b border-gray-100 bg-[#F9FAFB]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link to={`/${lang}/consultancy`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[brand-800] mb-6 hover:underline">
          <ArrowLeft size={14} /> Back to Portal
        </Link>
        <h1 className="text-4xl font-black uppercase tracking-tighter">{title}</h1>
        <p className="text-sm text-[#4B5563] mt-2">{subtitle}</p>
      </div>
    </header>
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {children}
    </div>
  </div>
);

export function ConsultancyAbout() {
  const { lang } = useParams<{ lang: string }>();
  return (
    <PageWrapper lang={lang!} title="About the Desk" subtitle="The ICA role in bilateral financial and legal facilitation.">
      <div className="space-y-8">
        <p className="text-lg font-medium leading-relaxed">The Strategic Financial & Legal Consultancy Desk serves as the primary advisory layer for high-impact investments between Iraq and China.</p>
        <div className="grid grid-cols-1 gap-6">
          <div className="p-6 border border-gray-200 rounded-2xl">
            <h3 className="text-xl font-black uppercase mb-4">Mandate</h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">Our mandate is to reduce regulatory friction and provide sovereign-backed clarity for cross-border capital flows, ensuring all investments are compliant with both Iraqi and Chinese domestic laws.</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-2xl">
            <h3 className="text-xl font-black uppercase mb-4">The ICA Layer</h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">As a bilateral agency, we coordinate directly with the National Investment Commission (NIC), the Kurdistan Board of Investment (KBOI), and the Chinese Ministry of Commerce (MOFCOM) to streamline license acquisition and tax structuring.</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export function ConsultancyFAQ() {
  const { lang } = useParams<{ lang: string }>();
  const faqs = [
    { q: "Is ICA a law firm?", a: "No. The ICA provides strategic advisory and regulatory facilitation. We work alongside licensed legal counsel in both jurisdictions but do not provide direct legal representation." },
    { q: "What are the fees for advisory?", a: "Standard initial assessments are provided as part of our bilateral mission. Deep-dive structuring and implementation support are subject to a fee schedule based on capital range." },
    { q: "How long does the assessment take?", a: "Initial assessments are typically completed within 7–10 business days following the submission of a formal inquiry." }
  ];
  return (
    <PageWrapper lang={lang!} title="Frequently Asked Questions" subtitle="Common regulatory and procedural inquiries.">
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <Disclosure key={i} label={f.q} variant="card">
            <p className="text-sm">{f.a}</p>
          </Disclosure>
        ))}
      </div>
    </PageWrapper>
  );
}

export function ConsultancyContact() {
  const { lang } = useParams<{ lang: string }>();
  return (
    <PageWrapper lang={lang!} title="Contact the Desk" subtitle="Direct communication channels for institutional clients.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[brand-100] rounded-lg flex items-center justify-center text-[brand-800] shrink-0"><Mail size={20} /></div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email</div>
              <div className="font-bold">consultancy@iraq-china.agency</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[brand-100] rounded-lg flex items-center justify-center text-[brand-800] shrink-0"><Phone size={20} /></div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone</div>
              <div className="font-bold">+964 773 572 0984</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[brand-100] rounded-lg flex items-center justify-center text-[brand-800] shrink-0"><MapPin size={20} /></div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Main Office</div>
              <div className="font-bold text-sm">Bilateral Trade Hub, Karada, Baghdad</div>
            </div>
          </div>
        </div>
        <div className="p-8 bg-black text-white rounded-2xl space-y-4">
           <h3 className="text-lg font-black uppercase tracking-tight">Institutional Inquiries</h3>
           <p className="text-xs text-gray-400 leading-relaxed">For government-to-government (G2G) or major sovereign fund inquiries, please request a secure transmission channel via email first.</p>
        </div>
      </div>
    </PageWrapper>
  );
}

export function ConsultancyLegal() {
  const { lang } = useParams<{ lang: string }>();
  return (
    <PageWrapper lang={lang!} title="Legal & Disclaimers" subtitle="Scope of service and regulatory limitations.">
      <div className="space-y-8">
        <div className="p-6 bg-[brand-100] border border-[brand-800]/20 rounded-2xl flex items-start gap-4 text-[#991B1B]">
           <Scale size={24} className="shrink-0" />
           <p className="text-sm font-bold leading-relaxed">The Strategic Financial & Legal Consultancy section is an educational and advisory portal. ICA and CISE do not provide licensed financial advice or legal representation.</p>
        </div>
        <div className="space-y-6 text-sm text-[#4B5563] leading-relaxed">
           <p>1. **No Attorney-Client Relationship**: Submission of an inquiry does not constitute a legal contract or representational agreement.</p>
           <p>2. **Data Accuracy**: While we strive to provide the latest regulatory updates, investors must verify all data with the National Investment Commission (NIC) or the China Securities Regulatory Commission (CSRC).</p>
           <p>3. **Anti-Money Laundering**: All consultancy sessions are subject to strict KYC/AML screening in accordance with FATF standards.</p>
        </div>
      </div>
    </PageWrapper>
  );
}
