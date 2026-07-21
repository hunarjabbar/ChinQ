import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { TourismSpot, Locale } from '../types';
import { 
  Compass, MapPin, Plane, Star, Calendar, ShieldCheck, 
  ChevronRight, X, Send, CheckCircle2, Sparkles, Globe2, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TourismSectionProps {
  lang?: Locale;
}

export function TourismSection({ lang = 'en' }: TourismSectionProps) {
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
    <section className="w-full max-w-[1024px] mx-auto bg-white border-2 border-[#111111] p-6 md:p-8 my-10 shadow-md rounded-xs relative">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#111111] pb-4 mb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#990000] text-white text-[11px] font-mono font-black uppercase tracking-wider rounded-xs mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>
              {currentLang === 'ar' ? 'جسر السياحة والثقافة الثنائي' :
               currentLang === 'zh' ? '中伊库文旅与遗产深度融合' :
               currentLang === 'ckb' ? 'گەشتوگوزار و کەلەپووری هاوبەش' :
               'CHINA - IRAQ - KURDISTAN TOURISM HUB'}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-black text-[#111111] tracking-tight">
            {currentLang === 'ar' ? 'استكشف وجهات التراث والجمال بين الصين والعراق وكردستان' :
             currentLang === 'zh' ? '探索中国、伊拉克与库尔德斯坦的千年文明与绝美风光' :
             currentLang === 'ckb' ? 'گەشت بکە بۆ شوێنەوار و دیمەنە سەرنجڕاکێشەکانی چین و عێراق و کوردستان' :
             'Bilateral Heritage & Silk Road Travel Destinations'}
          </h2>
          <p className="text-xs font-sans text-gray-600 mt-1 max-w-2xl">
            {currentLang === 'ar' ? 'دليل شامل للرحلات والتأشيرات والوجهات الأثرية المدرجة على قائمة اليونسكو والطيران المباشر بين بكين وبغداد وأربيل.' :
             currentLang === 'zh' ? '涵盖双边免签/落地签指引、直飞航线信息、世界遗产遗址与特色民俗定制游。' :
             currentLang === 'ckb' ? 'ڕێنمایی گشتگیر بۆ گەشت و ڤیزا و شوێنەوارەکانی یونسکۆ و هێڵە ئاسمانییەکانی نێوان چین و بەغدا و هەولێر.' :
             'Comprehensive travel itineraries, visa policies, UNESCO sites, and direct airline routing connecting China, Baghdad, and Kurdistan.'}
          </p>
        </div>

        <Link
          to={`/${currentLang}/tourism`}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#990000] hover:text-black transition-colors shrink-0 uppercase tracking-wider bg-red-50 hover:bg-red-100 px-3 py-2 rounded-xs border border-red-200"
        >
          <span>
            {currentLang === 'ar' ? 'بوابة السياحة الكاملة ←' :
             currentLang === 'zh' ? '进入完整文旅门户 →' :
             currentLang === 'ckb' ? 'چوونە ناو ناوەندی گەشتوگوزار →' :
             'Explore Tourism Portal →'}
          </span>
        </Link>
      </div>

      {/* Region Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-neutral-50 p-3 border border-gray-200 rounded-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-bold text-gray-500 uppercase mr-1 flex items-center gap-1">
            <Globe2 className="w-3.5 h-3.5 text-[#990000]" /> Region:
          </span>
          {[
            { id: 'ALL', labelEn: 'All Regions', labelAr: 'جميع المناطق', labelZh: '全部区域', labelCkb: 'جميع ناوچەکان' },
            { id: 'CHINA', labelEn: 'China 🇨🇳', labelAr: 'الصين 🇨🇳', labelZh: '中国 🇨🇳', labelCkb: 'چین 🇨🇳' },
            { id: 'IRAQ', labelEn: 'Iraq 🇮🇶', labelAr: 'العراق 🇮🇶', labelZh: '伊拉克 🇮🇶', labelCkb: 'عێراق 🇮🇶' },
            { id: 'KURDISTAN', labelEn: 'Kurdistan ☀️', labelAr: 'كردستان ☀️', labelZh: '库尔德斯坦 ☀️', labelCkb: 'کوردستان ☀️' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-xs transition-colors cursor-pointer ${
                selectedRegion === r.id
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-black'
              }`}
            >
              {currentLang === 'ar' ? r.labelAr : currentLang === 'zh' ? r.labelZh : currentLang === 'ckb' ? r.labelCkb : r.labelEn}
            </button>
          ))}
        </div>

        {/* Quick Travel Advisory Notice */}
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xs border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Visa on Arrival & E-Visa Enabled</span>
        </div>
      </div>

      {/* Showcase Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-72 bg-neutral-200 rounded-xs" />
          ))}
        </div>
      ) : filteredSpots.length === 0 ? (
        <div className="p-10 text-center bg-neutral-50 border border-dashed border-gray-300 rounded-xs">
          <p className="text-xs font-mono text-gray-500">No tourism destinations found for selected filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredSpots.map((spot) => (
            <motion.div
              key={spot.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveSpot(spot)}
              className="group bg-white border border-gray-200 hover:border-[#990000] hover:shadow-lg transition-all p-3.5 rounded-xs flex flex-col justify-between cursor-pointer relative"
            >
              <div className="space-y-3">
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 rounded-xs border border-gray-200">
                  <img
                    src={spot.imageUrl}
                    alt={getSpotTitle(spot)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-[#111111] text-white text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-xs flex items-center gap-1 shadow-xs">
                    <MapPin className="w-2.5 h-2.5 text-[#990000]" />
                    <span>{spot.city}, {spot.region}</span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-300" />
                    <span>{spot.rating}</span>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#990000] uppercase tracking-wider mb-1">
                    {spot.category.replace('_', ' ')}
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#111111] group-hover:text-[#990000] line-clamp-1 leading-snug transition-colors">
                    {getSpotTitle(spot)}
                  </h3>
                  <p className="text-xs font-sans text-gray-600 line-clamp-2 mt-1.5 leading-relaxed">
                    {getSpotDesc(spot)}
                  </p>
                </div>
              </div>

              {/* Bottom Metadata */}
              <div className="pt-3 mt-3 border-t border-gray-100 space-y-1.5 text-[11px] font-mono">
                <div className="flex items-center justify-between text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#990000]" /> Best Season:
                  </span>
                  <span className="font-bold text-gray-800 line-clamp-1">{spot.bestTimeToVisit}</span>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <span className="flex items-center gap-1">
                    <Plane className="w-3 h-3 text-blue-600" /> Flights:
                  </span>
                  <span className="font-bold text-emerald-700">Direct / Connected</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Custom Tour Inquiry & Destination Modal */}
      <AnimatePresence>
        {activeSpot && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs text-gray-900">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border-2 border-[#111111] max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-xs shadow-2xl space-y-6 relative"
            >
              <button
                onClick={() => setActiveSpot(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black p-1 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Spot Details */}
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-2 border-[#111111] rounded-xs shadow-md">
                    <img
                      src={activeSpot.imageUrl}
                      alt={getSpotTitle(activeSpot)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-[#990000] text-white text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-xs">
                      {activeSpot.region}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-serif font-black text-[#111111] leading-tight">
                      {getSpotTitle(activeSpot)}
                    </h2>
                    <p className="text-xs font-mono font-bold text-[#990000] mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {activeSpot.city}, {activeSpot.region} • {activeSpot.category.replace('_', ' ')}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm font-sans text-gray-700 leading-relaxed text-justify">
                    {getSpotDesc(activeSpot)}
                  </p>

                  <div className="bg-neutral-50 p-3.5 border border-gray-200 rounded-xs space-y-2 text-xs font-mono">
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-900 block">Visa Policy:</span>
                        <span className="text-gray-600">{activeSpot.visaPolicy}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Plane className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-900 block">Flight Connections:</span>
                        <span className="text-gray-600">{activeSpot.flightInfo}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour / Travel Inquiry Form */}
                <div className="bg-neutral-100 p-5 rounded-xs border border-gray-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-black uppercase text-[#990000] mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Bilateral Tour & Visa Advisory</span>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[#111111] mb-1">
                      Plan Your Trip to {activeSpot.city}
                    </h3>
                    <p className="text-xs font-sans text-gray-600 mb-4">
                      Submit an inquiry to our ChinQ Tourism Desk for official delegation, business travel, or cultural exchange tour itineraries.
                    </p>

                    {inquirySent ? (
                      <div className="p-6 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xs text-center space-y-2">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                        <h4 className="font-mono font-bold text-sm">Inquiry Received!</h4>
                        <p className="text-xs font-sans">
                          Our bilateral travel officer will contact you shortly with custom itinerary details and visa procedures.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleInquirySubmit} className="space-y-3 font-mono text-xs">
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Dr. Zhang Wei / Azad Ahmed"
                            value={inquiryForm.name}
                            onChange={e => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xs focus:outline-none focus:border-[#990000]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-gray-700 mb-1">Email / Phone</label>
                          <input
                            type="email"
                            required
                            placeholder="name@agency.com"
                            value={inquiryForm.email}
                            onChange={e => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xs focus:outline-none focus:border-[#990000]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block font-bold text-gray-700 mb-1">Expected Date</label>
                            <input
                              type="date"
                              required
                              value={inquiryForm.travelDate}
                              onChange={e => setInquiryForm({ ...inquiryForm, travelDate: e.target.value })}
                              className="w-full px-2 py-2 bg-white border border-gray-300 rounded-xs focus:outline-none focus:border-[#990000]"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-gray-700 mb-1">Travelers</label>
                            <select
                              value={inquiryForm.travelers}
                              onChange={e => setInquiryForm({ ...inquiryForm, travelers: e.target.value })}
                              className="w-full px-2 py-2 bg-white border border-gray-300 rounded-xs focus:outline-none focus:border-[#990000]"
                            >
                              <option value="1">1 Person</option>
                              <option value="2-5">2 - 5 Persons</option>
                              <option value="6-15">6 - 15 Group Delegation</option>
                              <option value="15+">15+ Large Delegation</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-gray-700 mb-1">Notes / Preferences</label>
                          <textarea
                            rows={2}
                            placeholder="Specific requests (translator, visa assistance, hotel rating)..."
                            value={inquiryForm.notes}
                            onChange={e => setInquiryForm({ ...inquiryForm, notes: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xs focus:outline-none focus:border-[#990000]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#990000] hover:bg-red-800 text-white font-bold uppercase rounded-xs transition-colors cursor-pointer shadow-xs mt-2"
                        >
                          <Send className="w-4 h-4" />
                          <span>Submit Travel Request</span>
                        </button>
                      </form>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 text-[10px] font-mono text-gray-500 text-center">
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
