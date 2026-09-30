import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { 
  Handshake, 
  ArrowRight, 
  Globe, 
  Building2, 
  FileCheck, 
  Database, 
  Users,
  ShieldCheck,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../components/Button';

export function Partnerships() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    organizationName: '',
    entityType: 'News Agency',
    partnershipScope: 'Syndication Feed',
    email: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const res = await fetch('/api/institute/partnerships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.organizationName,
          email: formData.email,
          company: formData.organizationName,
          role: formData.entityType,
          bio: `Scope: ${formData.partnershipScope} | Notes: ${formData.notes || 'None'}`,
          bureau: 'Global Diplomatic Intelligence Bureau',
          hash: `ICA-PARTNER-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
        })
      });
      if (!res.ok) {
        throw new Error('Failed to submit partnership application');
      }
      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const partners = [
    { name: 'China Central Television (CCTV)', type: 'Media Syndication' },
    { name: 'Peking University (PKU)', type: 'Academic Research' },
    { name: 'Iraq Ministry of Oil', type: 'Data Provenance' },
    { name: 'Fudan University', type: 'Economic Modelling' },
    { name: 'Grand Faw Port Authority', type: 'Logistics Data' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-20">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-[var(--accent-primary)]">
          <Handshake size={18} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Strategic Cooperation</span>
        </div>
        <h1 className="text-3xl lg:text-5xl font-black text-[var(--surface-dark)] uppercase tracking-tighter">
          Syndication & Co-Publishing
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] font-medium max-w-2xl leading-relaxed">
          The Institute partners with sovereign entities, academic institutions, 
          and global media outlets to ensure research integrity and data reach 
          across the China–Iraq–Kurdistan diplomatic axis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Partnership Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                title: 'Media Syndication', 
                desc: 'License our dispatches and policy briefs for reprint in international news verticals.',
                icon: Globe,
                color: 'var(--accent-primary)'
              },
              { 
                title: 'Co-Publishing', 
                desc: 'Collaborate with Institute fellows on joint white papers and working documents.',
                icon: Building2,
                color: 'var(--accent-primary)'
              },
              { 
                title: 'Data Licensing', 
                desc: 'Access raw bilateral trade datasets and infrastructure registry APIs.',
                icon: Database,
                color: 'var(--accent-primary)'
              },
              { 
                title: 'B2B Advisory', 
                desc: 'Bespoke strategic intelligence for enterprises navigating Iraq-China corridors.',
                icon: Users,
                color: 'var(--surface-dark)'
              },
            ].map(type => (
              <div key={type.title} className="bg-[var(--color-snowman)] rounded-2xl p-8 border border-[var(--color-border)] shadow-sm space-y-4 group transition-all hover:shadow-[var(--shadow-blood-glow)] hover:border-[var(--accent-primary)]">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110" style={{ backgroundColor: type.color }}>
                  <type.icon size={24} />
                </div>
                <h3 className="text-lg font-black text-[var(--surface-dark)] uppercase tracking-tight">{type.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)] font-medium leading-relaxed">
                  {type.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Institutional Partners List */}
          <div className="bg-[var(--color-snowman)] rounded-3xl p-8 border border-[var(--color-border)] shadow-sm space-y-8">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-6">
              <h3 className="text-xl font-black text-[var(--surface-dark)] uppercase tracking-tight">Current Institutional Partners</h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">Total 24 Partners</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {partners.map(p => (
                <div key={p.name} className="flex items-center gap-4 p-4 bg-[var(--color-snowman-alt)] rounded-xl border border-[var(--color-border)]">
                  <div className="w-10 h-10 bg-[var(--color-snowman)] rounded-lg flex items-center justify-center text-neutral-400 border border-[var(--color-border)]">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-[var(--surface-dark)] uppercase leading-tight">{p.name}</h4>
                    <p className="text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-0.5">{p.type}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-center p-4 bg-[var(--color-snowman-alt)] rounded-xl border border-dashed border-[var(--color-border-strong)]">
                <span className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest">More Partners</span>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <aside className="lg:col-span-1">
          <div className="bg-[var(--color-snowman)] rounded-3xl p-8 border border-[var(--color-border)] shadow-2xl sticky top-28 space-y-8">
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-black text-[var(--surface-dark)] uppercase tracking-tight leading-tight">Apply for Partnership</h3>
              <p className="text-xs text-[var(--color-text-muted)] font-medium leading-relaxed">
                Submit an institutional application for syndication or collaborative research.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-500">
                <div className="w-16 h-16 bg-[#ecfdf5] rounded-full flex items-center justify-center mx-auto text-[var(--color-success)] border border-[#a7f3d0]">
                  <CheckCircle2 size={32} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-black text-[var(--surface-dark)] uppercase">Application Received</h4>
                  <p className="text-[10px] text-[var(--color-text-muted)] font-medium leading-relaxed">
                    Our Institutional Relations coordinator will review your request and contact 
                    you within 48 business hours.
                  </p>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] underline underline-offset-4"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-[var(--accent-soft)] border border-[var(--accent-primary)]/20 rounded-xl text-[var(--accent-text)] text-xs font-medium">
                    {errorMessage}
                  </div>
                )}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">Organization Name</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    className="w-full bg-[var(--color-snowman-alt)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-[var(--accent-primary)] transition-all text-[var(--text-primary)]" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">Media/Entity Type</label>
                  <select 
                    value={formData.entityType}
                    onChange={(e) => setFormData({ ...formData, entityType: e.target.value })}
                    className="w-full bg-[var(--color-snowman-alt)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-[var(--accent-primary)] transition-all text-[var(--text-primary)] font-bold"
                  >
                    <option value="News Agency">News Agency & Syndicate</option>
                    <option value="Academic Institution">Academic Institution & University</option>
                    <option value="Governmental Body">Governmental Body & Ministry</option>
                    <option value="Corporate Advisory">Corporate & Financial Advisory</option>
                    <option value="Sovereign Investment Fund">Sovereign Investment Fund</option>
                    <option value="Think Tank & Policy Research">Think Tank & Policy Research Institute</option>
                    <option value="Industrial Federation">Industrial Federation & Chamber of Commerce</option>
                    <option value="Energy & Infrastructure Conglomerate">Energy & Infrastructure Conglomerate</option>
                    <option value="Digital Logistics & Port Authority">Digital Logistics & Port Authority</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">Partnership Scope</label>
                  <select 
                    value={formData.partnershipScope}
                    onChange={(e) => setFormData({ ...formData, partnershipScope: e.target.value })}
                    className="w-full bg-[var(--color-snowman-alt)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-[var(--accent-primary)] transition-all text-[var(--text-primary)] font-bold"
                  >
                    <option value="Syndication Feed">Syndication Feed & Reprints</option>
                    <option value="Co-Publishing">Co-Publishing & Joint White Papers</option>
                    <option value="Data Licensing">Data Licensing & API Access</option>
                    <option value="B2B Advisory">B2B Trade & Strategic Advisory</option>
                    <option value="Sovereign Currency Clearing & Settlement">Sovereign Currency Clearing & Settlement (IQD/e-CNY)</option>
                    <option value="Joint Artificial Intelligence Research Lab">Joint AI & Smart Infrastructure Research Lab</option>
                    <option value="Belt and Road Corridor Logistics Tracking">Belt and Road Corridor Logistics Tracking</option>
                    <option value="Bilateral Diplomatic Intelligence Briefs">Bilateral Diplomatic Intelligence Briefs</option>
                    <option value="Strategic Energy Transition Advisory">Strategic Energy & Photovoltaic Transition Advisory</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">Official Email</label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[var(--color-snowman-alt)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-[var(--accent-primary)] transition-all text-[var(--text-primary)]" 
                  />
                </div>
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    loading={isSubmitting}
                    className="w-full font-black uppercase tracking-widest"
                  >
                    Confirm Application
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-[9px] font-bold text-neutral-400 justify-center">
                  <ShieldCheck size={12} />
                  <span>Verified Institutional Process</span>
                </div>
              </form>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
