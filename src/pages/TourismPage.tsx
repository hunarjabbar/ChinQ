import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TourismSpot, Locale } from '../types';
import { 
  Compass, MapPin, Plane, Star, Calendar, ShieldCheck, 
  Search, Globe2, Sparkles, Filter, Info, X, Send, CheckCircle2,
  BookOpen, Building2, Landmark, Utensils, Mountain
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function TourismPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const currentLang = lang as Locale;

  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSpot, setActiveSpot] = useState<TourismSpot | null>(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', travelDate: '', travelers: '2', notes: '' });

  // Query all tourism spots
  const { data: spots = [], isLoading } = useQuery<TourismSpot[]>({
    queryKey: ['tourism-spots-all', selectedRegion, selectedCategory, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedRegion !== 'ALL') params.set('region', selectedRegion);
      if (selectedCategory !== 'ALL') params.set('category', selectedCategory);
      if (searchQuery.trim()) params.set('q', searchQuery.trim());

      const res = await fetch(`/api/tourism?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch tourism spots');
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
    <div className="w-full bg-white dark:bg-neutral-900 border-x border-brand-800/10 dark:border-neutral-800 shadow-xs p-4 sm:p-6 md:p-8 space-y-8">
      {/* Page Hero Header */}
      <div className="bg-white dark:bg-neutral-800/90 border-2 border-brand-800 dark:border-neutral-700 p-6 sm:p-8 rounded-xs shadow-xs space-y-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-brand-800/5 pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-800 text-white text-xs font-mono font-black uppercase tracking-wider rounded-xs">
          <Compass className="w-4 h-4" />
          <span>
            {currentLang === 'ar' ? 'بوابة السياحة والتبادل الثقافي' :
             currentLang === 'zh' ? '中伊库双边文旅与双向遗产门户' :
             currentLang === 'ckb' ? 'نێوەندی گەشتوگوزاری هاوبەشی چین و عێراق و کوردستان' :
             'BILATERAL TOURISM & HERITAGE PORTAL'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-black text-ink-900 dark:text-neutral-100 tracking-tight leading-tight">
          {currentLang === 'ar' ? 'السياحة والتراث بين الصين والعراق وإقليم كوردستان' :
           currentLang === 'zh' ? '连接万里长城与美索不达米亚：中伊库文化旅游合作与精选路线' :
           currentLang === 'ckb' ? 'گەشتوگوزار و کەلەپوور لە نێوان چین و عێراق و هەرێمی کوردستان' :
           'Bridging The Great Wall & Mesopotamia: Tourism & Cultural Heritage'}
        </h1>

        <p className="text-sm sm:text-base font-sans text-gray-700 dark:text-neutral-300 max-w-3xl leading-relaxed">
          {currentLang === 'ar' ? 'استكشف المواقع الأثرية المسجلة لدى اليونسكو، وطرق الحرير التاريخية، والجمال الطبيعي الخلاب، ودليل التأشيرات والرحلات الجوية المباشرة بين بكين وتشنغدو وبغداد وأربيل.' :
           currentLang === 'zh' ? '汇聚联合国教科文组织世界遗产名录、古丝绸之路文化遗址、华夏与两河流域自然奇观，提供免签/落地签政务指引与直飞航班资讯。' :
           currentLang === 'ckb' ? 'شارەزابە لە شوێنەوارەکانی یونسکۆ، ڕێگاکانی ئاوریشمی کۆن، سروشتی چیایی و ڕێنمایی ڤیزا و گەشتە ئاسمانییەکان.' :
           'Discover UNESCO World Heritage sites, Silk Road historic routes, alpine gorges, and wetlands along with visa protocols and flight routes between China, Baghdad, and Kurdistan.'}
        </p>

        {/* Quick Travel Guides Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-neutral-700 text-xs font-mono">
          <div className="bg-neutral-50 dark:bg-neutral-900/60 p-3 border border-gray-200 dark:border-neutral-700 rounded-xs flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-brand-800 dark:text-brand-400 shrink-0" />
            <div>
              <span className="font-bold text-gray-900 dark:text-neutral-100 block">Visa Procedures</span>
              <span className="text-gray-600 dark:text-neutral-400 text-[11px]">Visa on Arrival & E-Visa enabled</span>
            </div>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-900/60 p-3 border border-gray-200 dark:border-neutral-700 rounded-xs flex items-center gap-3">
            <Plane className="w-6 h-6 text-blue-700 dark:text-blue-400 shrink-0" />
            <div>
              <span className="font-bold text-gray-900 dark:text-neutral-100 block">Aviation Routes</span>
              <span className="text-gray-600 dark:text-neutral-400 text-[11px]">Guangzhou / Chengdu to BGW & EBL</span>
            </div>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-900/60 p-3 border border-gray-200 dark:border-neutral-700 rounded-xs flex items-center gap-3">
            <Landmark className="w-6 h-6 text-amber-700 dark:text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-gray-900 dark:text-neutral-100 block">Heritage Sites</span>
              <span className="text-gray-600 dark:text-neutral-400 text-[11px]">UNESCO sites in Iraq, Kurdistan & China</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-neutral-800 border-2 border-brand-800 dark:border-neutral-700 p-4 sm:p-6 rounded-xs shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search city, site, or keyword..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-gray-300 rounded-xs text-xs font-mono focus:outline-none focus:border-brand-800"
              />
            </div>

            {/* Region Select */}
            <div className="w-full sm:w-auto min-w-[200px]">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2.5 text-xs font-mono font-bold uppercase rounded-xs bg-neutral-100 text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] cursor-pointer appearance-none relative"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111111%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.7rem top 50%',
                  backgroundSize: '0.65rem auto',
                }}
              >
                <option value="ALL">All Regions</option>
                <option value="CHINA">China 🇨🇳</option>
                <option value="IRAQ">Iraq 🇮🇶</option>
                <option value="KURDISTAN">Kurdistan ☀️</option>
              </select>
            </div>
          </div>

          {/* Category Select */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pt-2 border-t border-gray-100">
            <div className="w-full sm:w-auto min-w-[200px]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 text-xs font-mono font-bold uppercase rounded-xs bg-neutral-100 text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-800 cursor-pointer appearance-none relative"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111111%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.7rem top 50%',
                  backgroundSize: '0.65rem auto',
                }}
              >
                <option value="ALL">All Categories</option>
                <option value="UNESCO_HERITAGE">🏛️ UNESCO World Heritage</option>
                <option value="ANCIENT_SILK_ROAD">🐪 Silk Road Legacy</option>
                <option value="NATURE_ADVENTURE">🏔️ Nature & Gorges</option>
                <option value="GASTRONOMY">🥘 Gastronomy & Culture</option>
                <option value="CULTURAL_EXCHANGE">🎭 Cultural Capital</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tourism Destinations Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 bg-neutral-200 rounded-xs" />
            ))}
          </div>
        ) : spots.length === 0 ? (
          <div className="p-12 text-center bg-white border border-dashed border-gray-300 rounded-xs space-y-3">
            <Compass className="w-10 h-10 text-gray-400 mx-auto" />
            <p className="text-sm font-mono text-gray-600">No tourism destinations match your criteria.</p>
            <button
              onClick={() => { setSelectedRegion('ALL'); setSelectedCategory('ALL'); setSearchQuery(''); }}
              className="text-xs font-mono font-bold text-brand-800 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {spots.map((spot) => (
              <motion.div
                key={spot.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => setActiveSpot(spot)}
                className="group bg-white border border-gray-200 hover:border-brand-800 hover:shadow-xl transition-all p-4 rounded-xs flex flex-col justify-between cursor-pointer relative"
              >
                <div className="space-y-3">
                  {/* Spot Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 rounded-xs border border-gray-200">
                    <img
                      src={spot.imageUrl}
                      alt={getSpotTitle(spot)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 bg-brand-800 text-white text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-xs flex items-center gap-1 shadow-xs">
                      <MapPin className="w-2.5 h-2.5 text-brand-800" />
                      <span>{spot.city}, {spot.region}</span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-300" />
                      <span>{spot.rating}</span>
                    </div>
                  </div>

                  {/* Spot Info */}
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-brand-800 uppercase tracking-wider mb-1">
                      <span>{spot.category.replace('_', ' ')}</span>
                      <span className="text-gray-500">{spot.estimatedCost}</span>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-ink-900 group-hover:text-brand-800 line-clamp-2 leading-snug transition-colors">
                      {getSpotTitle(spot)}
                    </h3>
                    <p className="text-xs font-sans text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                      {getSpotDesc(spot)}
                    </p>
                  </div>
                </div>

                {/* Spot Footer */}
                <div className="pt-3 mt-4 border-t border-gray-100 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-800" /> Best Time:
                    </span>
                    <span className="font-bold text-gray-900 line-clamp-1">{spot.bestTimeToVisit}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Visa:
                    </span>
                    <span className="font-bold text-emerald-800 text-[11px] line-clamp-1">Available</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Travel Advisory & Cultural Etiquette Section */}
        <div className="bg-white border-2 border-brand-800 p-6 sm:p-8 rounded-xs shadow-sm space-y-6">
          <div className="border-b border-gray-200 pb-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-brand-800 text-white text-[10px] font-mono font-bold uppercase rounded-xs mb-2">
              <Globe2 className="w-3.5 h-3.5 text-brand-800" /> Bilateral Traveler Handbook
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-ink-900">
              Essential Travel & Cultural Exchange Guidelines
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans">
            <div className="space-y-2 bg-neutral-50 p-4 border border-gray-200 rounded-xs">
              <h4 className="font-mono font-bold text-sm text-brand-800 uppercase">1. Visa & Entry Formalities</h4>
              <p className="text-gray-700 leading-relaxed">
                Chinese citizens traveling to Iraq and the Kurdistan Region receive 30-day Visa on Arrival or E-Visa. Iraqi and Kurdish business delegations receive expedited visa processing through Chinese Embassies in Baghdad and Erbil.
              </p>
            </div>

            <div className="space-y-2 bg-neutral-50 p-4 border border-gray-200 rounded-xs">
              <h4 className="font-mono font-bold text-sm text-brand-800 uppercase">2. Flight Connections</h4>
              <p className="text-gray-700 leading-relaxed">
                Direct flights connect Guangzhou and Chengdu to Baghdad International (BGW) and Erbil International (EBL). Transit options through Dubai, Istanbul, and Doha are also widely available.
              </p>
            </div>

            <div className="space-y-2 bg-neutral-50 p-4 border border-gray-200 rounded-xs">
              <h4 className="font-mono font-bold text-sm text-brand-800 uppercase">3. Currency & Hospitality</h4>
              <p className="text-gray-700 leading-relaxed">
                Chinese Yuan (CNY), Iraqi Dinar (IQD), and USD are widely accepted across business hubs. Kurdish and Iraqi hospitality is world-famous, with traditional tea and meals offered to foreign guests.
              </p>
            </div>
          </div>
        </div>

      {/* Modal Inquiry */}
      <AnimatePresence>
        {activeSpot && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs text-gray-900">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border-2 border-brand-800 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-xs shadow-2xl space-y-6 relative"
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
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-2 border-brand-800 rounded-xs shadow-md">
                    <img
                      src={activeSpot.imageUrl}
                      alt={getSpotTitle(activeSpot)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-brand-800 text-white text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-xs">
                      {activeSpot.region}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-serif font-black text-ink-900 leading-tight">
                      {getSpotTitle(activeSpot)}
                    </h2>
                    <p className="text-xs font-mono font-bold text-brand-800 mt-1 flex items-center gap-1">
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
                    <div className="flex items-center gap-1.5 text-xs font-mono font-black uppercase text-brand-800 mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Bilateral Tour & Visa Advisory</span>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-ink-900 mb-1">
                      Plan Your Trip to {activeSpot.city}
                    </h3>
                    <p className="text-xs font-sans text-gray-600 mb-4">
                      Submit an inquiry to our Iraqi-Chinese Agency Tourism Desk for official delegation, business travel, or cultural exchange tour itineraries.
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
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xs focus:outline-none focus:border-brand-800"
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
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xs focus:outline-none focus:border-brand-800"
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
                              className="w-full px-2 py-2 bg-white border border-gray-300 rounded-xs focus:outline-none focus:border-brand-800"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-gray-700 mb-1">Travelers</label>
                            <select
                              value={inquiryForm.travelers}
                              onChange={e => setInquiryForm({ ...inquiryForm, travelers: e.target.value })}
                              className="w-full px-2 py-2 bg-white border border-gray-300 rounded-xs focus:outline-none focus:border-brand-800"
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
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xs focus:outline-none focus:border-brand-800"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full flex items-center justify-center gap-2 py-2.5 bg-brand-800 hover:bg-brand-800 text-white font-bold uppercase rounded-xs transition-colors cursor-pointer shadow-xs mt-2"
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
    </div>
  );
}
