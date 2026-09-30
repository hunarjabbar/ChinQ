import React, { useState } from 'react';
import { Locale, translations } from '../locales';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Building, 
  Award, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';

interface SummitPageProps {
  currentLocale: Locale;
}

export const SummitPage: React.FC<SummitPageProps> = ({ currentLocale }) => {
  const t = translations[currentLocale];
  const [activeTab, setActiveTab] = useState<'overview' | 'pavilions' | 'agenda' | 'register'>('overview');
  const [registered, setRegistered] = useState(false);
  const [delegateName, setDelegateName] = useState('');
  const [delegateEmail, setDelegateEmail] = useState('');
  const [delegationType, setDelegationType] = useState('OFFICIAL_DELEGATE');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!delegateName || !delegateEmail) return;
    setRegistered(true);
  };

  const pavilions = [
    {
      title: 'Infrastructure & Port Logistics Pavilion',
      orgs: 'China State Construction, PowerChina, Iraq Ministry of Transport',
      focus: 'Grand Faw container berths, high-speed rail transit, and heavy civil works.',
    },
    {
      title: 'Energy Transition & Gas Recovery Pavilion',
      orgs: 'Sinopec, PetroChina, Basra Oil Company, Missan Oil',
      focus: 'Zero-flaring capture systems, solar farm EPC, and advanced petrochemical cracking.',
    },
    {
      title: 'Monetary & Bilateral Finance Pavilion',
      orgs: 'People’s Bank of China, Central Bank of Iraq, Trade Bank of Iraq (TBI)',
      focus: 'Direct IQD-CNY bilateral clearing, credit facilities, and sovereign insurance.',
    },
    {
      title: 'Advanced Industrial & EV Pavilion',
      orgs: 'BYD, SANY Group, XCMG, Kurdistan Board of Investment',
      focus: 'Electric transport assembly, mining logistics, and autonomous port cranes.',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Summit Hero Banner */}
      <section className="bg-gradient-to-r from-neutral-900 via-[#1c1212] to-black border-2 border-[var(--color-brand-800)]/60 rounded-xl p-6 sm:p-10 space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="bg-[var(--color-brand-800)] text-white font-bold px-2.5 py-1 rounded uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            October 14–17, 2026
          </span>
          <span className="text-neutral-300 font-semibold flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[var(--color-brand-800)]" />
            Sulaymaniyah International Expo Center, Kurdistan Region, Iraq
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          {t.summit.title}
        </h1>

        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-4xl">
          {t.summit.subtitle}
        </p>

        <div className="pt-2 flex flex-wrap gap-4">
          <button
            onClick={() => setActiveTab('register')}
            className="bg-[var(--color-brand-800)] hover:bg-[#aa0000] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded transition-colors flex items-center gap-2 shadow-md"
          >
            <span>{t.summit.registerDelegate}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('pavilions')}
            className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded transition-colors border border-neutral-700"
          >
            Explore 50+ Pavilions
          </button>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2 overflow-x-auto text-xs font-semibold">
        {(['overview', 'pavilions', 'agenda', 'register'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === tab
                ? 'bg-[var(--color-brand-800)] text-white'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            {tab === 'overview' && 'Plenary Overview'}
            {tab === 'pavilions' && 'Featured Pavilions'}
            {tab === 'agenda' && 'Summit Agenda'}
            {tab === 'register' && 'Delegate Registration'}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-lg space-y-2">
              <div className="text-2xl font-mono font-black text-white">2,500+</div>
              <div className="text-xs text-neutral-400">Accredited Sovereign & Corporate Delegates</div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-lg space-y-2">
              <div className="text-2xl font-mono font-black text-[#ff4d4d]">$18.5B</div>
              <div className="text-xs text-neutral-400">Target Value of Bilateral MoU Ratifications</div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-lg space-y-2">
              <div className="text-2xl font-mono font-black text-emerald-400">40,000 m²</div>
              <div className="text-xs text-neutral-400">Indoor & Outdoor Industrial Exhibition Space</div>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white">Sulaymaniyah Bilateral Host City Announcement</h3>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              Under the joint auspices of the Iraqi Federal Government in Baghdad and the Kurdistan Regional Government in Erbil, the Sulaymaniyah International Expo Center will host high-level delegations from Chinese central state-owned enterprises, private industrial conglomerates, sovereign wealth funds, and regional chambers of commerce.
            </p>
          </div>
        </section>
      )}

      {/* Tab 2: Pavilions */}
      {activeTab === 'pavilions' && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pavilions.map((pav, idx) => (
            <div key={idx} className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl space-y-3">
              <div className="text-[11px] font-mono text-[#ff4d4d] uppercase font-bold">Pavilion Area #{idx + 1}</div>
              <h4 className="text-base font-bold text-white">{pav.title}</h4>
              <div className="text-xs text-neutral-400"><strong className="text-neutral-300">Key Exhibitors:</strong> {pav.orgs}</div>
              <p className="text-xs text-neutral-300 leading-relaxed">{pav.focus}</p>
            </div>
          ))}
        </section>
      )}

      {/* Tab 3: Agenda */}
      {activeTab === 'agenda' && (
        <section className="space-y-4">
          {[
            { day: 'Day 1 · Oct 14', title: 'Grand Plenary Opening & Sovereign Infrastructure Keynotes', desc: 'Ministerial addresses from Baghdad, Beijing, and Erbil on the Development Road and maritime transit.' },
            { day: 'Day 2 · Oct 15', title: 'Monetary Integration & IQD-CNY Banking Roundtables', desc: 'Executive sessions with central bankers, commercial treasuries, and sovereign bond issuers.' },
            { day: 'Day 3 · Oct 16', title: 'Energy Transition, Gas Capture & Clean Power EPC', desc: 'Industrial symposium on zero-emission petroleum engineering and mega-scale solar utility parks.' },
            { day: 'Day 4 · Oct 17', title: 'Bilateral Deal Ratification & B2B Matchmaking Forum', desc: 'Formal treaty and commercial contract signing ceremonies with international media broadcast.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-neutral-900 border border-neutral-800 p-5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#ff4d4d]">{item.day}</span>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-neutral-400">{item.desc}</p>
              </div>
              <span className="text-xs text-emerald-400 shrink-0 font-mono font-semibold">Live Broadcast</span>
            </div>
          ))}
        </section>
      )}

      {/* Tab 4: Register */}
      {activeTab === 'register' && (
        <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">Delegate & Pavilion Registration</h3>
            <p className="text-xs text-neutral-400">
              Submit credential details for diplomatic, commercial, or press badge clearance.
            </p>
          </div>

          {registered ? (
            <div className="bg-emerald-950/40 border border-emerald-800 rounded-lg p-6 text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Registration Application Logged</h4>
              <p className="text-xs text-neutral-300">
                Official accreditation pass dispatched to {delegateEmail}. Present your registration QR code at the Sulaymaniyah Expo VIP gate.
              </p>
              <button
                onClick={() => setRegistered(false)}
                className="text-xs text-neutral-400 hover:text-white underline pt-2"
              >
                Register Another Attendee
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-neutral-300 font-semibold">Full Name *</label>
                <input
                  type="text"
                  required
                  value={delegateName}
                  onChange={(e) => setDelegateName(e.target.value)}
                  placeholder="Delegation Leader / Executive Name"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded p-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[var(--color-brand-800)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-300 font-semibold">Official Business Email *</label>
                <input
                  type="email"
                  required
                  value={delegateEmail}
                  onChange={(e) => setDelegateEmail(e.target.value)}
                  placeholder="delegate@ministry.gov.iq or corporate@enterprise.cn"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded p-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[var(--color-brand-800)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-300 font-semibold">Accreditation Category</label>
                <select
                  value={delegationType}
                  onChange={(e) => setDelegationType(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded p-2.5 text-xs text-white focus:outline-none focus:border-[var(--color-brand-800)]"
                >
                  <option value="OFFICIAL_DELEGATE">Official Government Delegate</option>
                  <option value="EXHIBITOR">Commercial Pavilion Exhibitor</option>
                  <option value="PRESS">International Accredited Press</option>
                  <option value="OBSERVER">Academic & Economic Observer</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--color-brand-800)] hover:bg-[#aa0000] text-white font-bold text-xs py-3 rounded transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Submit Badge Application</span>
              </button>
            </form>
          )}
        </section>
      )}
    </div>
  );
};
