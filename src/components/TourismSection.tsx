import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { TourismSpot, Locale } from '../types';
import { useI18n } from '../hooks/useI18n';
import { 
  Compass, MapPin, Plane, Calendar, ShieldCheck, 
  ChevronRight, X, Send, CheckCircle2, Sparkles, Globe2, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TourismSectionProps {
  lang?: Locale;
}

export function TourismSection({ lang = 'en' }: TourismSectionProps) {
  const { t: translate } = useI18n(lang);
  const currentLang = lang as Locale;
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeSpot, setActiveSpot] = useState<TourismSpot | null>(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', travelDate: '', travelers: '2', notes: '' });

  // Query tourism spots
  const { data: spots = [], isLoading } = useQuery<TourismSpot[]>({
    queryKey: ['tourism-spots-home'],
    queryFn: async () => {
      const res = await fetch('/api/tourism');
      if (!res.ok) throw new Error('Failed to fetch tourism destinations');
      return res.json();
    }
  });

  const getSpotTitle = (s: TourismSpot) => {
    if (currentLang === 'ar' && s.titleAr) return s.titleAr;
    if (currentLang === 'zh' && s.titleZh) return s.titleZh;
    if (currentLang === 'ckb' && s.titleCkb) return s.titleCkb;
    return s.titleEn;
  };

  const getSpotDesc = (s: TourismSpot) => {
    if (currentLang === 'ar' && s.descriptionAr) return s.descriptionAr;
    if (currentLang === 'zh' && s.descriptionZh) return s.descriptionZh;
    if (currentLang === 'ckb' && s.descriptionCkb) return s.descriptionCkb;
    return s.descriptionEn;
  };

  const filteredSpots = spots.filter(s => {
    const matchReg = selectedRegion === 'ALL' || s.region === selectedRegion;
    const matchCat = selectedCategory === 'ALL' || s.category === selectedCategory;
    return matchReg && matchCat;
  }).slice(0, 6); // Take top 6 for homepage showcase

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setActiveSpot(null);
      setInquiryForm({ name: '', email: '', travelDate: '', travelers: '2', notes: '' });
    }, 2500);
  };

  return (
    <section className="w-full bg-white dark:bg-neutral-900 border-2 border-ink-900 dark:border-neutral-700 shadow-sm p-6 sm:p-8 md:p-10 my-6 transition-colors duration-300 relative overflow-hidden">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-brand-800 pb-6 mb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>
              {translate('culturalTourism')}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-900 dark:text-white tracking-tight">
            {translate('bilateralHeritageTravel')}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mt-2 max-w-2xl leading-relaxed">
            {translate('exploreHeritageDesc')}
          </p>
        </div>

        <Link
          to={`/${currentLang}/tourism`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-brand-800 text-white hover:bg-brand-900 px-5 py-2.5 rounded-lg transition-all shadow-sm shrink-0 uppercase tracking-wider"
        >
          <span>
            {translate('tourismPortal')}
          </span>
        </Link>
      </div>

      {/* Region Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-neutral-50 dark:bg-neutral-800/60 p-3 border border-gray-200 dark:border-neutral-700 rounded-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-gray-500 dark:text-neutral-400 uppercase mr-1 flex items-center gap-1">
            <Globe2 className="w-3.5 h-3.5 text-brand-800 dark:text-brand-400" /> {translate('region')}:
          </span>
          {[
            { id: 'ALL', label: translate('allRegions') },
            { id: 'CHINA', label: translate('china') + ' 🇨🇳' },
            { id: 'IRAQ', label: translate('iraq') + ' 🇮🇶' },
            { id: 'KURDISTAN', label: translate('kurdistan') + ' ☀️' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded-xs transition-colors cursor-pointer ${
                selectedRegion === r.id
                  ? 'bg-brand-800 text-white shadow-xs'
                  : 'bg-white dark:bg-neutral-700 text-gray-700 dark:text-neutral-200 border border-gray-300 dark:border-neutral-600 hover:border-black dark:hover:border-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Quick Travel Advisory Notice */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-xs border border-emerald-200 dark:border-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{translate('visaOnArrivalEnabled')}</span>
        </div>
      </div>

      {/* Showcase Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-72 bg-neutral-200 dark:bg-neutral-800 rounded-xs" />
          ))}
        </div>
      ) : filteredSpots.length === 0 ? (
        <div className="p-10 text-center bg-neutral-50 dark:bg-neutral-800 border border-dashed border-gray-300 dark:border-neutral-700 rounded-xs">
          <p className="text-xs text-gray-500 dark:text-neutral-400">{translate('noTourismFound')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredSpots.map((spot) => (
            <motion.div
              key={spot.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveSpot(spot)}
              className="group bg-gray-50/70 dark:bg-white/5 backdrop-blur-xl backdrop-saturate-150 border border-white/60 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:bg-white/90 dark:hover:bg-white/10 hover:border-brand-800/40 dark:hover:border-brand-400/40 transition-all duration-300 p-3.5 flex flex-col justify-between cursor-pointer relative rounded-2xl"
            >
              <div className="space-y-3">
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-white/20 dark:border-white/5 shadow-inner">
                  <img
                    src={spot.imageUrl}
                    alt={getSpotTitle(spot)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-brand-800 text-white text-xs font-bold uppercase px-2 py-0.5 rounded-xs flex items-center gap-1 shadow-xs">
                    <MapPin className="w-2.5 h-2.5 text-brand-300" />
                    <span>{spot.city}, {spot.region}</span>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <div className="text-xs font-bold text-brand-800 dark:text-brand-400 uppercase tracking-wider mb-1">
                    {spot.category.replace('_', ' ')}
                  </div>
                  <h3 className="text-base font-bold text-brand-900 dark:text-neutral-100 group-hover:text-brand-800 dark:group-hover:text-brand-400 line-clamp-1 leading-snug transition-colors">
                    {getSpotTitle(spot)}
                  </h3>
                  <p className="text-xs font-sans text-gray-600 dark:text-neutral-300 line-clamp-2 mt-1.5 leading-relaxed">
                    {getSpotDesc(spot)}
                  </p>
                </div>
              </div>

              {/* Bottom Metadata */}
              <div className="pt-3 mt-3 border-t border-gray-100 dark:border-neutral-700 space-y-1.5 text-[11px] font-mono">
                <div className="flex items-center justify-between text-gray-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-brand-800 dark:text-brand-400" /> {translate('bestSeason')}:
                  </span>
                  <span className="font-bold text-gray-800 dark:text-neutral-200 line-clamp-1">{spot.bestTimeToVisit}</span>
                </div>
                <div className="flex items-center justify-between text-gray-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Plane className="w-3 h-3 text-blue-600" /> {translate('flights')}:
                  </span>
                  <span className="font-bold text-emerald-700">{translate('directConnected')}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Custom Tour Inquiry & Destination Modal */}
      <AnimatePresence>
        {activeSpot && (
          <div 
            className="fixed inset-0 z-[100] bg-white dark:bg-neutral-900 flex flex-col items-center justify-start overflow-y-auto"
            onClick={() => setActiveSpot(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-6xl bg-white dark:bg-neutral-900 min-h-screen flex flex-col relative text-start transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header toolbar */}
              <div className="px-6 py-4 bg-brand-900 text-white border-b border-brand-800 flex justify-between items-center shrink-0 sticky top-0 z-20 shadow-md">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-200 flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  {translate('bilateralTourismPortal')}
                </div>
                <button 
                  onClick={() => setActiveSpot(null)}
                  className="text-white hover:text-brand-200 font-bold text-xs uppercase tracking-widest bg-brand-800 hover:bg-brand-950 px-4 py-2 rounded-lg transition-colors cursor-pointer border border-brand-700 shadow-sm"
                >
                  {translate('closePortal')}
                </button>
              </div>

              <div className="p-6 md:p-10 lg:p-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                {/* Spot Details */}
                <div className="space-y-6">
                  <div className="relative aspect-[16/10] w-full overflow-hidden border border-gray-200 dark:border-neutral-700 rounded-sm shadow-md">
                    <img
                      src={activeSpot.imageUrl}
                      alt={getSpotTitle(activeSpot)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-brand-800 text-white text-xs font-black uppercase px-2.5 py-0.5 rounded-xs">
                      {activeSpot.region}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-brand-900 dark:text-neutral-100 leading-tight">
                      {getSpotTitle(activeSpot)}
                    </h2>
                    <p className="text-xs font-bold text-brand-800 dark:text-brand-400 mt-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {activeSpot.city}, {activeSpot.region} • {activeSpot.category.replace('_', ' ')}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base font-sans text-gray-700 dark:text-neutral-300 leading-relaxed text-justify">
                    {getSpotDesc(activeSpot)}
                  </p>

                  <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 border border-gray-200 dark:border-neutral-700 rounded-sm space-y-3 text-xs font-mono">
                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-900 dark:text-neutral-100 block mb-0.5">Visa Policy:</span>
                        <span className="text-gray-600 dark:text-neutral-400 leading-snug">{activeSpot.visaPolicy}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Plane className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-900 dark:text-neutral-100 block mb-0.5">Flight Connections:</span>
                        <span className="text-gray-600 dark:text-neutral-400 leading-snug">{activeSpot.flightInfo}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour / Travel Inquiry Form */}
                <div className="bg-neutral-50 dark:bg-neutral-800/30 p-6 rounded-sm border border-gray-200 dark:border-neutral-700 flex flex-col justify-between h-fit">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-black uppercase text-brand-800 dark:text-brand-400 mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span>{translate('bilateralTourAdvisory') || 'Bilateral Tour & Visa Advisory'}</span>
                    </div>
                    <h3 className="text-xl font-bold text-brand-900 dark:text-neutral-100 mb-2">
                      {translate('planTripTo')} {activeSpot.city}
                    </h3>
                    <p className="text-xs font-sans text-gray-600 dark:text-neutral-400 mb-6 leading-relaxed">
                      {translate('tourismInquiryDesc')}
                    </p>

                    {inquirySent ? (
                      <div className="p-6 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xs text-center space-y-2">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                        <h4 className="font-bold text-sm">{translate('inquiryReceived')}</h4>
                        <p className="text-xs font-sans">
                          {translate('inquiryReceivedDesc')}
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleInquirySubmit} className="space-y-3 text-xs">
                        <div>
                          <label className="block font-bold text-gray-700 dark:text-neutral-300 mb-1">{translate('fullName')}</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Dr. Zhang Wei / Azad Ahmed"
                            value={inquiryForm.name}
                            onChange={e => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                            className="w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-xs focus:outline-none focus:border-brand-800 text-brand-900 dark:text-neutral-100"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-gray-700 dark:text-neutral-300 mb-1">{translate('emailPhone')}</label>
                          <input
                            type="email"
                            required
                            placeholder="name@agency.com"
                            value={inquiryForm.email}
                            onChange={e => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                            className="w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-xs focus:outline-none focus:border-brand-800 text-brand-900 dark:text-neutral-100"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block font-bold text-gray-700 dark:text-neutral-300 mb-1">{translate('expectedDate')}</label>
                            <input
                              type="date"
                              required
                              value={inquiryForm.travelDate}
                              onChange={e => setInquiryForm({ ...inquiryForm, travelDate: e.target.value })}
                              className="w-full px-2 py-2 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-xs focus:outline-none focus:border-brand-800 text-brand-900 dark:text-neutral-100 [color-scheme:light] dark:[color-scheme:dark]"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-gray-700 dark:text-neutral-300 mb-1">{translate('travelers')}</label>
                            <select
                              value={inquiryForm.travelers}
                              onChange={e => setInquiryForm({ ...inquiryForm, travelers: e.target.value })}
                              className="w-full px-2 py-2 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-xs focus:outline-none focus:border-brand-800 text-brand-900 dark:text-neutral-100"
                            >
                              <option value="1">1 Person</option>
                              <option value="2-5">2 - 5 Persons</option>
                              <option value="6-15">6 - 15 Group Delegation</option>
                              <option value="15+">15+ Large Delegation</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-gray-700 dark:text-neutral-300 mb-1">{translate('notesPreferences')}</label>
                          <textarea
                            rows={2}
                            placeholder="Specific requests (translator, visa assistance, hotel rating)..."
                            value={inquiryForm.notes}
                            onChange={e => setInquiryForm({ ...inquiryForm, notes: e.target.value })}
                            className="w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-xs focus:outline-none focus:border-brand-800 text-brand-900 dark:text-neutral-100"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full flex items-center justify-center gap-2 py-2.5 bg-brand-800 hover:bg-brand-900 text-white font-bold uppercase rounded-xs transition-colors cursor-pointer shadow-xs mt-2"
                        >
                          <Send className="w-4 h-4" />
                          <span>{translate('submitTravelRequest')}</span>
                        </button>
                      </form>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500 text-center">
                    Official Bilateral Tourism & Cultural Exchange Service
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
