import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Plane, Globe, FileText, CheckCircle, Search, Filter, Compass, 
  ExternalLink, Calendar, ShieldCheck, PhoneCall, ArrowRight, Clock,
  Building2, Users, Send, Sparkles, MapPin, Ticket, Award, RefreshCw, X, Info
} from 'lucide-react';
import { VisaFlightRecord } from '../types';

interface VisaFlightPageProps {
  lang?: string;
}

export const VisaFlightPage: React.FC<VisaFlightPageProps> = ({ lang: propLang }) => {
  const { lang: urlLang } = useParams<{ lang?: string }>();
  const lang = propLang || urlLang || 'en';

  const [records, setRecords] = useState<VisaFlightRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState<VisaFlightRecord | null>(null);

  // Eligibility Checker State
  const [origin, setOrigin] = useState('CHINA');
  const [destination, setDestination] = useState('KURDISTAN');

  // Concierge Form State
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    passportNumber: '',
    origin: 'China',
    destination: 'Erbil (Kurdistan Region)',
    travelDate: '',
    serviceType: 'VISA_ASSISTANCE',
    notes: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState<{ ticketId: string; message: string } | null>(null);

  useEffect(() => {
    fetchRecords();
  }, [selectedCategory, selectedRegion]);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      let url = `/api/visa-flights?`;
      if (selectedCategory !== 'ALL') url += `serviceType=${selectedCategory}&`;
      if (selectedRegion !== 'ALL') url += `originRegion=${selectedRegion}&`;
      if (searchQuery) url += `q=${encodeURIComponent(searchQuery)}&`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setRecords(data);
      }
    } catch (e) {
      console.error("Failed to fetch visa & flight records", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecords();
  };

  const getLocalizedTitle = (item: VisaFlightRecord) => {
    if (lang === 'ar') return item.titleAr || item.titleEn;
    if (lang === 'zh') return item.titleZh || item.titleEn;
    if (lang === 'ckb') return item.titleCkb || item.titleAr || item.titleEn;
    return item.titleEn;
  };

  const getLocalizedSummary = (item: VisaFlightRecord) => {
    if (lang === 'ar') return item.summaryAr || item.summaryEn;
    if (lang === 'zh') return item.summaryZh || item.summaryEn;
    if (lang === 'ckb') return item.summaryCkb || item.summaryAr || item.summaryEn;
    return item.summaryEn;
  };

  const getLocalizedDetails = (item: VisaFlightRecord) => {
    if (lang === 'ar') return item.detailsAr || item.detailsEn;
    if (lang === 'zh') return item.detailsZh || item.detailsEn;
    if (lang === 'ckb') return item.detailsCkb || item.detailsAr || item.detailsEn;
    return item.detailsEn;
  };

  const t = {
    en: {
      badge: "SINO-IRAQI & KURDISTAN DIPLOMATIC PORTAL",
      heroTitle: "Visa Promotions, Flight Charters & Travel Logistics",
      heroDesc: "Connecting China, Iraq, and the Kurdistan Region through expedited visa green channels, direct passenger and cargo routes, consular assistance, and aviation publications.",
      checkEligibility: "Interactive Visa Eligibility & Route Checker",
      selectOrigin: "Passport / Origin Region",
      selectDestination: "Destination City / Region",
      checkResult: "View Visa & Route Clearance Rules",
      allServices: "All Services & Promotions",
      visaAssistance: "Visa & E-Visa Services",
      flightRoutes: "Flight Routes & Aviation",
      diplomaticPassport: "Diplomatic & Business Channels",
      publications: "Logistics & Publications",
      consularGuide: "Airport Concierge & Consular",
      allRegions: "All Regions",
      china: "China",
      iraq: "Iraq",
      kurdistan: "Kurdistan Region",
      bilateral: "Bilateral / Joint",
      searchPlaceholder: "Search flight routes, visa policies, airlines, airports...",
      requestConcierge: "Apply for Visa / Flight Assistance",
      processingTime: "Processing / Flight Time",
      costFee: "Fee / Tariff",
      authority: "Authority / Airline",
      viewDetails: "View Full Policy & Routes",
      officialPortal: "Official Link / Booking",
      noRecords: "No visa or flight records found matching your filters.",
      modalTitle: "Policy & Route Logistics Specification",
      close: "Close",
      submitRequest: "Submit Consular Inquiry",
      fullName: "Full Name",
      email: "Email Address",
      passportNum: "Passport Number",
      travelDate: "Intended Travel Date",
      notes: "Additional Travel Notes or Delegation Requests",
      sending: "Transmitting...",
      successMsg: "Inquiry Successfully Transmitted!"
    },
    ar: {
      badge: "البوابة الدبلوماسية للصين والعراق وكردستان",
      heroTitle: "تأشيرات، رحلات جوية، ودليل اللوجستيات",
      heroDesc: "ربط الصين والعراق وإقليم كردستان عبر القنوات الخضراء للتأشيرات المباشرة، خطوط الطيران، والتسهيلات القنصلية.",
      checkEligibility: "حاسبة متطلبات التأشيرة ومسارات الطيران",
      selectOrigin: "جواز السفر / بلد المنشأ",
      selectDestination: "الوجهة المقصودة",
      checkResult: "عرض قواعد التأشيرة والمحيط الأمني",
      allServices: "جميع الخدمات والعروض",
      visaAssistance: "تسهيلات التأشيرة الإلكترونية",
      flightRoutes: "مسارات وخطوط الطيران",
      diplomaticPassport: "القنوات الدبلوماسية والتجارية",
      publications: "الدلائل والمطبوعات الملاحية",
      consularGuide: "المكاتب القنصلية والمطارات",
      allRegions: "جميع المناطق",
      china: "الصين",
      iraq: "العراق",
      kurdistan: "إقليم كردستان",
      bilateral: "مشترك / ثنائي",
      searchPlaceholder: "ابحث عن خطوط الطيران، التأشيرات، المطارات...",
      requestConcierge: "تقديم طلب مساعدة في التأشيرة والطيران",
      processingTime: "وقت المعالجة / الطيران",
      costFee: "الرسوم / التعرفة",
      authority: "السلطة / الخطوط الجوية",
      viewDetails: "تفاصيل السياسة والمسار",
      officialPortal: "البوابة الرسمية / الحجز",
      noRecords: "لم يتم العثور على نتائج مطابقة للبحث.",
      modalTitle: "تفاصيل اللوجستيات والقواعد الرسمية",
      close: "إغلاق",
      submitRequest: "إرسال الاستفسار القنصلي",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      passportNum: "رقم جواز السفر",
      travelDate: "تاريخ السفر المتوقع",
      notes: "ملاحظات إضافية أو طلبات الوفد",
      sending: "جاري الإرسال...",
      successMsg: "تم إرسال الاستفسار بنجاح!"
    },
    zh: {
      badge: "中国-伊拉克-库尔德斯坦领事与航线联运服务",
      heroTitle: "签证便利、直飞航线与航空物流指南",
      heroDesc: "构建连接中国、伊拉克及库尔德斯坦地区的快速签证绿色通道、定期客货运航班、领事急救支援及民航出版物体系。",
      checkEligibility: "签证政策与航线联运智能查询器",
      selectOrigin: "护照签发地 / 出发地",
      selectDestination: "目的城市 / 地区",
      checkResult: "查询签证入境与航班政策",
      allServices: "全部服务与推广",
      visaAssistance: "签证与电子签支持",
      flightRoutes: "航线网络与包机",
      diplomaticPassport: "外交与商务绿道",
      publications: "民航物流与白皮书",
      consularGuide: "机场领事与礼遇中心",
      allRegions: "所有区域",
      china: "中国",
      iraq: "伊拉克",
      kurdistan: "库尔德斯坦地区",
      bilateral: "双边 / 联合",
      searchPlaceholder: "搜索航线、签证政策、航空公司、机场...",
      requestConcierge: "申请签证/机票协助服务",
      processingTime: "办理时间 / 飞行时长",
      costFee: "资费 / 领事规费",
      authority: "主管机关 / 执飞航司",
      viewDetails: "查看完整政策与航线",
      officialPortal: "官方入口 / 机票预订",
      noRecords: "未找到符合条件的签证或航班记录。",
      modalTitle: "政策与航班物流规范",
      close: "关闭",
      submitRequest: "提交领事协助申请",
      fullName: "姓名",
      email: "电子邮箱",
      passportNum: "护照号码",
      travelDate: "计划出行日期",
      notes: "行程备注或代表团特殊需求",
      sending: "正在提交...",
      successMsg: "领事协助申请已成功提交！"
    },
    ckb: {
      badge: "پۆرتالی دبلۆماسی چین، عێراق و هەرێمی کوردستان",
      heroTitle: "ئاسانکاری ڤیزا، گەشتە ئاسمانییەکان و لۆجیستیک",
      heroDesc: "بەستنەوەی چین، عێراق و هەرێمی کوردستان لەڕێگەی کەناڵی سەوزی ڤیزا، گەشتی ڕاستەوخۆی ئاسمانی و ڕێنیشاندەری قونسوڵی.",
      checkEligibility: "پشکنەری یاسای ڤیزا و هێڵە ئاسمانییەکان",
      selectOrigin: "شوێنی پاسپۆڕت / دەستپێک",
      selectDestination: "شوێنی مەبەست",
      checkResult: "بینی یاسای ڤیزا و گەشتەکان",
      allServices: "سەرجەم خزمەتگوزارییەکان",
      visaAssistance: "خزمەتگوزاری ڤیزا و ڤیزای ئەلیکترۆنی",
      flightRoutes: "گەشتە ئاسمانییەکان",
      diplomaticPassport: "کەناڵی دبلۆماسی و بازرگانی",
      publications: "بڵاوکراوە لۆجیستییەکان",
      consularGuide: "خزمەتگوزاری فرۆکەخانەکان",
      allRegions: "سەرجەم ناوچەکان",
      china: "چین",
      iraq: "عێراق",
      kurdistan: "هەرێمی کوردستان",
      bilateral: "دووقۆڵی / هاوبەش",
      searchPlaceholder: "گەڕان بۆ هێڵە ئاسمانییەکان، ڤیزا، فرۆکەخانەکان...",
      requestConcierge: "داواکاری ئاسانکاری ڤیزا و فڕین",
      processingTime: "ماوەی ڕاپەڕاندن / فڕین",
      costFee: "تێچوو / کرێی قونسوڵی",
      authority: "دەسەڵات / هێڵی ئاسمانی",
      viewDetails: "بینینی تەواوی ڕێنماییەکان",
      officialPortal: "ماڵپەڕی فەرمی / بڕین",
      noRecords: "هیچ تۆمارێک نەدۆزرایەوە.",
      modalTitle: "ڕێنمایی و وردەکاری لۆجیستی",
      close: "داخستن",
      submitRequest: "ناردنی داواکاری قونسوڵی",
      fullName: "ناوی تەواو",
      email: "ئیمەیڵ",
      passportNum: "ژمارەی پاسپۆڕت",
      travelDate: "بەرواری چاوەڕوانکراوی گەشت",
      notes: "تێبینی زیاتر",
      sending: "ناردن...",
      successMsg: "داواکارییەکەت بەسەرکەوتوویی نێردرا!"
    }
  }[lang as 'en' | 'ar' | 'zh' | 'ckb'] || {
    badge: "SINO-IRAQI & KURDISTAN DIPLOMATIC PORTAL",
    heroTitle: "Visa Promotions, Flight Charters & Travel Logistics",
    heroDesc: "Connecting China, Iraq, and the Kurdistan Region through expedited visa green channels, direct passenger and cargo routes, consular assistance, and aviation publications.",
    checkEligibility: "Interactive Visa Eligibility & Route Checker",
    selectOrigin: "Passport / Origin Region",
    selectDestination: "Destination City / Region",
    checkResult: "View Visa & Route Clearance Rules",
    allServices: "All Services & Promotions",
    visaAssistance: "Visa & E-Visa Services",
    flightRoutes: "Flight Routes & Aviation",
    diplomaticPassport: "Diplomatic & Business Channels",
    publications: "Logistics & Publications",
    consularGuide: "Airport Concierge & Consular",
    allRegions: "All Regions",
    china: "China",
    iraq: "Iraq",
    kurdistan: "Kurdistan Region",
    bilateral: "Bilateral / Joint",
    searchPlaceholder: "Search flight routes, visa policies, airlines, airports...",
    requestConcierge: "Apply for Visa / Flight Assistance",
    processingTime: "Processing / Flight Time",
    costFee: "Fee / Tariff",
    authority: "Authority / Airline",
    viewDetails: "View Full Policy & Routes",
    officialPortal: "Official Link / Booking",
    noRecords: "No visa or flight records found matching your filters.",
    modalTitle: "Policy & Route Logistics Specification",
    close: "Close",
    submitRequest: "Submit Consular Inquiry",
    fullName: "Full Name",
    email: "Email Address",
    passportNum: "Passport Number",
    travelDate: "Intended Travel Date",
    notes: "Additional Travel Notes or Delegation Requests",
    sending: "Transmitting...",
    successMsg: "Inquiry Successfully Transmitted!"
  };

  const getEligibilityInfo = () => {
    if (origin === 'CHINA' && destination === 'KURDISTAN') {
      return {
        visaType: "Visa on Arrival / E-Visa Available",
        validity: "30-Day Tourist / Business Multi-Entry",
        flightRoute: "Guangzhou (CAN) & Beijing (PEK) -> Erbil (EBL) Direct Charters & Express Connecting Flights",
        docs: ["Valid Passport (>6 months)", "Pre-approved E-Visa / Chamber Letter", "Return Flight Ticket", "Hotel Booking / Host Sponsor"],
        contact: "Chinese Consulate General in Erbil: +964 751 100 0011"
      };
    }
    if (origin === 'CHINA' && destination === 'IRAQ') {
      return {
        visaType: "E-Visa & Visa on Arrival at BGW",
        validity: "30-Day Single / Multi-Entry Business Visa",
        flightRoute: "Guangzhou / Beijing -> Baghdad International Airport (BGW) via Iraqi Airways & Air China Cargo",
        docs: ["Valid Passport", "Iraq E-Visa Approval", "Bilateral Business Invitation", "Health Insurance"],
        contact: "Embassy of the People's Republic of China in Baghdad: +964 790 191 2315"
      };
    }
    if ((origin === 'IRAQ' || origin === 'KURDISTAN') && destination === 'CHINA') {
      return {
        visaType: "M (Business) / L (Tourist) / F (Non-Commercial Visit)",
        validity: "3-Month to 3-Year Multi-Entry Green Channel",
        flightRoute: "Erbil (EBL) / Baghdad (BGW) -> Guangzhou (CAN), Shanghai (PVG), Beijing (PEK)",
        docs: ["Passport (>6 months)", "China Embassy / Consulate Verification", "Business Chamber Invitation", "Biometrics Appointment"],
        contact: "Chinese Embassy Baghdad & Consulate General Erbil Visa Center"
      };
    }
    return {
      visaType: "Diplomatic Green Channel & Bilateral Visa Exemption Protocol",
      validity: "90-Day Priority Official Status",
      flightRoute: "Bilateral Air Passenger & Cargo Express Routes",
      docs: ["Official/Diplomatic Passport", "MFA Diplomatic Note / Chamber Accreditation"],
      contact: "Consular Affairs Division & Bilateral Bureau"
    };
  };

  const currentEligibility = getEligibilityInfo();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const res = await fetch('/api/visa-flights/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const data = await res.json();
        setFormSuccess({ ticketId: data.ticketId, message: data.message });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 border-b border-indigo-900/40 pt-12 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wider uppercase">
              <Plane className="w-4 h-4 text-indigo-400" />
              <span>{t.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {t.heroTitle}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
              {t.heroDesc}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setFormOpen(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold shadow-lg shadow-amber-500/20 transition-all text-sm"
              >
                <Ticket className="w-5 h-5 text-slate-950" />
                <span>{t.requestConcierge}</span>
              </button>

              <a
                href="#eligibility-checker"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold transition-all text-sm"
              >
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                <span>{t.checkEligibility}</span>
              </a>
            </div>

            {/* Metric Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl pt-8 border-t border-slate-800/80 mt-6">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-2xl font-black text-amber-400">24-48 Hours</div>
                <div className="text-xs text-slate-400 mt-1">E-Visa Expedited Clearance</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-2xl font-black text-indigo-400">8.5 Hours</div>
                <div className="text-xs text-slate-400 mt-1">Direct Flight CAN/PEK ↔ EBL/BGW</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-2xl font-black text-emerald-400">3 Airports</div>
                <div className="text-xs text-slate-400 mt-1">Erbil, Baghdad & Guangzhou</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-2xl font-black text-sky-400">VIP Concierge</div>
                <div className="text-xs text-slate-400 mt-1">Consular Airport Counter</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Visa & Route Eligibility Checker */}
      <div id="eligibility-checker" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-900/90 border border-indigo-900/50 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">{t.checkEligibility}</h2>
              <p className="text-xs sm:text-sm text-slate-400">Instant visa policy, clearance speed & flight connections between China, Iraq & Erbil</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                {t.selectOrigin}
              </label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="CHINA">China Passport / Citizen (中国公民)</option>
                <option value="KURDISTAN">Erbil / Kurdistan Region Citizen (هەرێمی کوردستان)</option>
                <option value="IRAQ">Baghdad / Iraq Passport Holder (العراق)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                {t.selectDestination}
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="KURDISTAN">Erbil International Airport (EBL) / Kurdistan</option>
                <option value="IRAQ">Baghdad International Airport (BGW) / Iraq</option>
                <option value="CHINA">Guangzhou (CAN) / Beijing (PEK) / Shanghai (PVG) - China</option>
              </select>
            </div>
          </div>

          {/* Results card */}
          <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-xs text-indigo-400 font-semibold mb-1">Visa Category & Status</div>
              <div className="font-bold text-white text-base">{currentEligibility.visaType}</div>
              <div className="text-xs text-slate-400 mt-1">{currentEligibility.validity}</div>
            </div>

            <div>
              <div className="text-xs text-amber-400 font-semibold mb-1">Flight Route Connection</div>
              <div className="font-medium text-slate-200 text-xs leading-relaxed">{currentEligibility.flightRoute}</div>
            </div>

            <div>
              <div className="text-xs text-emerald-400 font-semibold mb-1">Required Travel Documents</div>
              <ul className="text-xs text-slate-300 space-y-1">
                {currentEligibility.docs.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs text-sky-400 font-semibold mb-1">Consular Emergency Hotline</div>
              <div className="text-xs text-slate-300 font-mono mt-1 bg-slate-900 p-2 rounded border border-slate-800">
                {currentEligibility.contact}
              </div>
              <button
                onClick={() => setFormOpen(true)}
                className="mt-3 w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Apply with Assistance</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Services & Direct Flights Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search & Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch mb-8">
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </form>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
              <button
                onClick={() => setSelectedRegion('ALL')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${selectedRegion === 'ALL' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {t.allRegions}
              </button>
              <button
                onClick={() => setSelectedRegion('CHINA')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${selectedRegion === 'CHINA' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {t.china}
              </button>
              <button
                onClick={() => setSelectedRegion('IRAQ')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${selectedRegion === 'IRAQ' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {t.iraq}
              </button>
              <button
                onClick={() => setSelectedRegion('KURDISTAN')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${selectedRegion === 'KURDISTAN' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {t.kurdistan}
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {[
            { id: 'ALL', label: t.allServices, icon: Compass },
            { id: 'VISA_ASSISTANCE', label: t.visaAssistance, icon: ShieldCheck },
            { id: 'FLIGHT_ROUTE', label: t.flightRoutes, icon: Plane },
            { id: 'PASSPORT_DIPLOMATIC', label: t.diplomaticPassport, icon: Globe },
            { id: 'TRAVEL_PUBLICATION', label: t.publications, icon: FileText },
            { id: 'CONSULAR_GUIDE', label: t.consularGuide, icon: MapPin }
          ].map((cat) => {
            const Icon = cat.icon;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all border ${
                  active
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <RefreshCw className="w-8 h-8 animate-spin text-amber-500 mb-3" />
            <p>Loading Visa & Flight Promotions...</p>
          </div>
        ) : records.length === 0 ? (
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-12 text-center max-w-md mx-auto">
            <Info className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-300 font-medium">{t.noRecords}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {records.map((item) => {
              const title = getLocalizedTitle(item);
              const summary = getLocalizedSummary(item);

              return (
                <div
                  key={item.id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src={item.imageUrl}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                    {item.isFeatured && (
                      <span className="absolute top-3 left-3 bg-amber-500/90 text-slate-950 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                        FEATURED
                      </span>
                    )}

                    <span className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur border border-slate-700 text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-md">
                      {item.originRegion} → {item.destinationRegion}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider">
                        <span>{item.serviceType.replace('_', ' ')}</span>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                        {title}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {summary}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-indigo-400" />
                          {t.processingTime}:
                        </span>
                        <span className="font-semibold text-slate-200">{item.processingTime}</span>
                      </div>

                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-500 flex items-center gap-1">
                          <Ticket className="w-3.5 h-3.5 text-emerald-400" />
                          {t.costFee}:
                        </span>
                        <span className="font-semibold text-emerald-400">{item.feeOrCost}</span>
                      </div>

                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-500 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-amber-400" />
                          {t.authority}:
                        </span>
                        <span className="font-medium text-slate-300 truncate max-w-[150px]">{item.airlineOrAuthority}</span>
                      </div>

                      <div className="pt-2 flex gap-2">
                        <button
                          onClick={() => setActiveModal(item)}
                          className="flex-1 py-2 px-3 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold text-xs transition-colors text-center"
                        >
                          {t.viewDetails}
                        </button>

                        {item.officialLink && (
                          <a
                            href={item.officialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                            title={t.officialPortal}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal for viewing detailed record */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative text-slate-100 shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
              <Plane className="w-4 h-4" />
              <span>{activeModal.serviceType} | {activeModal.originRegion} → {activeModal.destinationRegion}</span>
            </div>

            <h2 className="text-2xl font-black text-white mb-4">
              {getLocalizedTitle(activeModal)}
            </h2>

            <img
              src={activeModal.imageUrl}
              alt="Preview"
              className="w-full h-56 object-cover rounded-xl mb-4 border border-slate-800"
            />

            <div className="grid grid-cols-2 gap-3 mb-4 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block">Authority / Airline:</span>
                <span className="font-bold text-slate-200">{activeModal.airlineOrAuthority}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Processing / Speed:</span>
                <span className="font-bold text-indigo-400">{activeModal.processingTime}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Fee / Cost Tariff:</span>
                <span className="font-bold text-emerald-400">{activeModal.feeOrCost}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Updated Status:</span>
                <span className="font-bold text-amber-400">Active Consular Green Channel</span>
              </div>
            </div>

            <div className="space-y-4 mb-6 text-sm text-slate-300 leading-relaxed">
              <div>
                <h4 className="font-bold text-white text-base mb-1">Executive Summary</h4>
                <p>{getLocalizedSummary(activeModal)}</p>
              </div>

              <div>
                <h4 className="font-bold text-white text-base mb-1">Detailed Operational Rules & Guidance</h4>
                <p className="whitespace-pre-line">{getLocalizedDetails(activeModal)}</p>
              </div>
            </div>

            <div className="flex gap-3">
              {activeModal.officialLink && (
                <a
                  href={activeModal.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-center text-sm flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t.officialPortal}</span>
                </a>
              )}
              <button
                onClick={() => {
                  setActiveModal(null);
                  setFormOpen(true);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-center text-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{t.requestConcierge}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Concierge Inquiry Modal Form */}
      {formOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 relative text-slate-100 shadow-2xl">
            <button
              onClick={() => {
                setFormOpen(false);
                setFormSuccess(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-2">{t.requestConcierge}</h3>
            <p className="text-xs text-slate-400 mb-6">Transmit your visa assistance or flight charter reservation request directly to our bilateral concierge secretariat.</p>

            {formSuccess ? (
              <div className="bg-emerald-950/60 border border-emerald-500/50 p-6 rounded-xl text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">{t.successMsg}</h4>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs font-mono text-emerald-400">
                  Tracking Ticket ID: {formSuccess.ticketId}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{formSuccess.message}</p>
                <button
                  onClick={() => {
                    setFormOpen(false);
                    setFormSuccess(null);
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                >
                  {t.close}
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">{t.fullName} *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">{t.email} *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">{t.passportNum} *</label>
                    <input
                      type="text"
                      required
                      value={formData.passportNumber}
                      onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Origin City/Country</label>
                    <input
                      type="text"
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Destination City</label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">{t.travelDate}</label>
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Service Type</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                    >
                      <option value="VISA_ASSISTANCE">Visa & E-Visa Expedited</option>
                      <option value="FLIGHT_ROUTE">Direct Flight Booking Charter</option>
                      <option value="PASSPORT_DIPLOMATIC">Diplomatic & Chamber Green Channel</option>
                      <option value="CONSULAR_GUIDE">Airport Concierge Fast-Track</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">{t.notes}</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                    placeholder="Provide details about delegation size, purpose of travel, or specialized logistics needed..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{formSubmitting ? t.sending : t.submitRequest}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
