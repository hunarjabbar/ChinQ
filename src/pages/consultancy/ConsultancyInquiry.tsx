import React, { useState, useRef } from 'react';
import { Locale } from '../../types';
import { useI18n } from '../../hooks/useI18n';
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { FileText, Send, CheckCircle2, Download, Copy, ArrowLeft, ShieldCheck, Globe, Building2, Landmark, Briefcase, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function ConsultancyInquiry() {
  const { lang: urlLang } = useParams<{ lang: string }>();
  const normalizedLang = (urlLang === 'ck' || urlLang === 'ku') ? 'ckb' : (urlLang || 'en');
  const lang = (['en', 'ar', 'zh', 'ckb'].includes(normalizedLang) ? normalizedLang : 'en') as Locale;
  const { t } = useI18n(lang);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedSector = searchParams.get('sector') || '';
  const preSelectedDirection = searchParams.get('direction') || 'iraq-bound';

  const [formState, setFormState] = useState({
    orgName: '',
    orgType: 'corporate',
    country: '',
    regNumber: '',
    taxNumber: '',
    contactName: '',
    contactTitle: '',
    contactEmail: '',
    contactPhone: '',
    direction: preSelectedDirection,
    sectors: preSelectedSector ? [preSelectedSector] : [],
    capitalRange: '$1M–$10M',
    timeline: '0–6 months',
    advisoryNeeds: '',
    experience: '',
    complianceConsent: false,
    dataConsent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const reportRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.complianceConsent || !formState.dataConsent) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const ref = `CONSULT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceId(ref);
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const generatePDF = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`ICA-Consultancy-${referenceId}.pdf`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (submitted) {
    return (
      <div className="bg-white min-h-screen py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8">
            <div className="w-24 h-24 bg-[brand-100] rounded-full flex items-center justify-center text-[brand-800] mx-auto">
              <CheckCircle2 size={48} />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-black uppercase tracking-tighter">Inquiry Registered</h1>
              <p className="text-[#4B5563] font-medium">Your formal request for strategic consultancy has been logged in our bilateral registry.</p>
            </div>

            <div className="p-8 bg-[#F9FAFB] border border-gray-200 rounded-2xl space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Reference Number</span>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-3xl font-black font-mono tracking-tight">{referenceId}</span>
                  <button onClick={() => copyToClipboard(referenceId)} className="p-2 hover:bg-gray-200 rounded-lg transition-colors"><Copy size={18} /></button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                 <button onClick={generatePDF} className="flex items-center justify-center gap-2 h-12 bg-black text-white rounded-lg font-black uppercase tracking-widest text-xs hover:bg-gray-800 transition-all">
                    <Download size={16} /> Download PDF
                 </button>
                 <Link to={`/${lang}/consultancy`} className="flex items-center justify-center h-12 border border-gray-200 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition-all">
                    Return to Portal
                 </Link>
              </div>
            </div>

            {/* Hidden report for PDF generation */}
            <div className="sr-only">
               <div ref={reportRef} className="p-16 bg-white w-[210mm] text-black space-y-12">
                  <div className="flex justify-between items-start border-b-2 border-black pb-8">
                     <div className="space-y-1">
                        <div className="text-2xl font-black uppercase tracking-tighter">Iraqi-Chinese Agency</div>
                        <div className="text-xs font-bold text-[brand-800] uppercase tracking-widest">Strategic Financial & Legal Consultancy Desk</div>
                     </div>
                     <div className="text-right">
                        <div className="text-[10px] font-black uppercase text-gray-400">Reference ID</div>
                        <div className="text-lg font-black font-mono">{referenceId}</div>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-6">
                        <div>
                           <div className="text-[10px] font-black uppercase text-gray-400 mb-1">Organization</div>
                           <div className="font-black uppercase">{formState.orgName}</div>
                        </div>
                        <div>
                           <div className="text-[10px] font-black uppercase text-gray-400 mb-1">Representative</div>
                           <div className="font-black">{formState.contactName} ({formState.contactTitle})</div>
                        </div>
                     </div>
                     <div className="space-y-6">
                        <div>
                           <div className="text-[10px] font-black uppercase text-gray-400 mb-1">Advisory Direction</div>
                           <div className="font-black uppercase">{formState.direction}</div>
                        </div>
                        <div>
                           <div className="text-[10px] font-black uppercase text-gray-400 mb-1">Submission Date</div>
                           <div className="font-black">{new Date().toLocaleDateString()}</div>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="text-[10px] font-black uppercase text-gray-400 border-b border-gray-100 pb-2">Consultancy Requirements</div>
                     <p className="text-sm font-medium leading-relaxed">{formState.advisoryNeeds}</p>
                  </div>
                  <div className="pt-12 border-t border-gray-100 flex justify-between items-center text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                     <span>Authenticated by ICA Registry • Iraq–China Bilateral Office</span>
                     <span className="text-black">© {new Date().getFullYear()} ICA</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <header className="py-12 border-b border-gray-100 bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
           <Link to={`/${lang}/consultancy`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[brand-800] mb-6 hover:underline">
             <ArrowLeft size={14} /> Back to Portal
           </Link>
           <h1 className="text-4xl font-black uppercase tracking-tighter">Inquiry Application</h1>
           <p className="text-sm text-[#4B5563] mt-2">Submit your details for a structured legal and financial advisory session.</p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Organization Details */}
          <div className="space-y-6">
             <div className="flex items-center gap-3 border-b border-black pb-2">
                <Building2 size={20} className="text-[brand-800]" />
                <h2 className="text-lg font-black uppercase tracking-tight">Organization Profile</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Organization Name *</label>
                   <input required type="text" value={formState.orgName} onChange={e => setFormState({...formState, orgName: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[brand-800]/20 outline-none" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Organization Type *</label>
                   <select value={formState.orgType} onChange={e => setFormState({...formState, orgType: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none">
                      <option value="corporate">Corporate Entity</option>
                      <option value="family">Family Office</option>
                      <option value="sovereign">Sovereign Fund</option>
                      <option value="individual">Individual Investor</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Country of Registration *</label>
                   <input required type="text" value={formState.country} onChange={e => setFormState({...formState, country: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Commercial Registration No. *</label>
                   <input required type="text" value={formState.regNumber} onChange={e => setFormState({...formState, regNumber: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none" />
                </div>
             </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
             <div className="flex items-center gap-3 border-b border-black pb-2">
                <Briefcase size={20} className="text-[brand-800]" />
                <h2 className="text-lg font-black uppercase tracking-tight">Contact Person</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name *</label>
                   <input required type="text" value={formState.contactName} onChange={e => setFormState({...formState, contactName: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Job Title *</label>
                   <input required type="text" value={formState.contactTitle} onChange={e => setFormState({...formState, contactTitle: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Work Email *</label>
                   <input required type="email" value={formState.contactEmail} onChange={e => setFormState({...formState, contactEmail: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone Number *</label>
                   <input required type="tel" value={formState.contactPhone} onChange={e => setFormState({...formState, contactPhone: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none" />
                </div>
             </div>
          </div>

          {/* Advisory Scope */}
          <div className="space-y-6">
             <div className="flex items-center gap-3 border-b border-black pb-2">
                <Landmark size={20} className="text-[brand-800]" />
                <h2 className="text-lg font-black uppercase tracking-tight">Advisory Scope</h2>
             </div>
             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Investment Direction *</label>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        { id: 'iraq-bound', label: 'Iraq-Bound' },
                        { id: 'china-bound', label: 'China-Bound' },
                        { id: 'bilateral', label: 'Bilateral' }
                      ].map(d => (
                         <button key={d.id} type="button" onClick={() => setFormState({...formState, direction: d.id})} className={cn("py-3 rounded-xl text-xs font-black uppercase tracking-widest border transition-all", formState.direction === d.id ? "bg-black text-white border-black" : "bg-white text-black border-gray-200 hover:border-[brand-800]")}>{d.label}</button>
                      ))}
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Specific Advisory Needs * (Min. 40 chars)</label>
                   <textarea required minLength={40} rows={5} value={formState.advisoryNeeds} onChange={e => setFormState({...formState, advisoryNeeds: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-[brand-800]/20" placeholder="Please describe your investment project, legal questions, and required facilitation services..."></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Capital Range *</label>
                      <select value={formState.capitalRange} onChange={e => setFormState({...formState, capitalRange: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none">
                         <option>&lt;$100K</option>
                         <option>$100K–$1M</option>
                         <option>$1M–$10M</option>
                         <option>$10M–$50M</option>
                         <option>$50M+</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Timeline *</label>
                      <select value={formState.timeline} onChange={e => setFormState({...formState, timeline: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold outline-none">
                         <option>Exploratory</option>
                         <option>0–6 months</option>
                         <option>6–12 months</option>
                         <option>12–24 months</option>
                      </select>
                   </div>
                </div>
             </div>
          </div>

          {/* Compliance & Submit */}
          <div className="space-y-6 pt-6 border-t border-gray-100">
             <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                   <input required type="checkbox" checked={formState.complianceConsent} onChange={e => setFormState({...formState, complianceConsent: e.target.checked})} className="mt-1 w-4 h-4 rounded border-gray-300 text-[brand-800] focus:ring-[brand-800]" />
                   <span className="text-xs font-medium text-[#4B5563] group-hover:text-black transition-colors">I declare that all provided information is accurate and that our organization adheres to international AML/CFT standards. *</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                   <input required type="checkbox" checked={formState.dataConsent} onChange={e => setFormState({...formState, dataConsent: e.target.checked})} className="mt-1 w-4 h-4 rounded border-gray-300 text-[brand-800] focus:ring-[brand-800]" />
                   <span className="text-xs font-medium text-[#4B5563] group-hover:text-black transition-colors">I consent to the processing of organizational data by ICA and CISE for advisory purposes. *</span>
                </label>
             </div>

             <button type="submit" disabled={isSubmitting} className="w-full h-14 bg-[brand-800] hover:bg-[brand-800] text-white rounded-xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-sm transition-all disabled:opacity-50">
                {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={18} /> Submit Formal Inquiry</>}
             </button>
             
             <div className="p-4 bg-gray-50 rounded-xl flex items-start gap-3">
                <Info size={16} className="text-gray-400 mt-0.5 shrink-0" />
                <p className="text-[10px] font-bold text-gray-500 uppercase leading-relaxed">Submitting this form does not establish an attorney-client relationship. All sessions are purely advisory and facilitation-based.</p>
             </div>
          </div>
        </form>
      </div>
    </div>
  );
}
