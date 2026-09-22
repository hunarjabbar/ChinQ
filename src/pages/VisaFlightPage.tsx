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

  // Eligibility Checker State
  const [origin, setOrigin] = useState('CHINA');
  const [destination, setDestination] = useState('KURDISTAN');

  // Concierge Form State
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactPhone: '',
    passportNumber: '',
    nationality: 'Iraqi',
    origin: 'China',
    destination: 'Erbil (Kurdistan Region)',
    travelDate: '',
    serviceType: 'VISA_ASSISTANCE',
    priority: 'STANDARD',
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
        if (Array.isArray(data)) {
          setRecords(data);
        }
      }
    } catch (e) {
      // Graceful error handling for transient network issues
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
    // Try to find a matching record from the fetched admin portal records
    const exactMatch = records.find(r => r.originRegion === origin && r.destinationRegion === destination);
    const partialMatch = records.find(r => r.originRegion === origin || r.destinationRegion === destination);
    const matchingRecord = exactMatch || partialMatch;

    if (matchingRecord) {
      return {
        visaType: getLocalizedTitle(matchingRecord),
        validity: matchingRecord.processingTime || "Standard Processing",
        flightRoute: getLocalizedSummary(matchingRecord),
        docs: getLocalizedDetails(matchingRecord)
          ? getLocalizedDetails(matchingRecord).split('\n').filter(s => s.trim().length > 0).slice(0, 4)
          : ["Valid Passport", "Visa or Clearance Document", "Flight Itinerary"],
        contact: matchingRecord.airlineOrAuthority || "Consular Desk"
      };
    }

    // Fallback if no records loaded yet or no matching found
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
    <div className="w-full min-h-screen bg-gray-50 dark:bg-neutral-900 text-brand-900 dark:text-neutral-100 font-sans pb-8 rounded-xs border border-gray-200 dark:border-neutral-800 shadow-xs overflow-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 pt-8 pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-500/10 dark:from-brand-500/5 via-transparent to-transparent opacity-60"></div>
        <div className="w-full px-4 sm:px-6 md:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800/30 text-brand-800 dark:text-brand-400 text-xs font-semibold tracking-wider uppercase">
              <Plane className="w-4 h-4 text-brand-600 dark:text-brand-500" />
              <span>{t.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-brand-900 dark:text-white tracking-tight leading-tight">
              {t.heroTitle}
            </h1>

            <p className="text-gray-600 dark:text-neutral-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              {t.heroDesc}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setFormOpen(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold shadow-sm transition-all text-sm"
              >
                <Ticket className="w-5 h-5" />
                <span>{t.requestConcierge}</span>
              </button>

              <a
                href="#eligibility-checker"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 border border-gray-200 dark:border-neutral-700 text-brand-900 dark:text-white font-semibold transition-all text-sm shadow-sm"
              >
                <ShieldCheck className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <span>{t.checkEligibility}</span>
              </a>
            </div>

            {/* Metric Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-4xl pt-8 border-t border-gray-200 dark:border-neutral-800 mt-6 min-w-0">
              <div className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-sm">
                <div className="text-2xl font-black text-brand-800 dark:text-brand-400">24-48 Hours</div>
                <div className="text-xs text-gray-500 dark:text-neutral-400 mt-1">E-Visa Expedited Clearance</div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-sm">
                <div className="text-2xl font-black text-brand-800 dark:text-brand-400">8.5 Hours</div>
                <div className="text-xs text-gray-500 dark:text-neutral-400 mt-1">Direct Flight CAN/PEK ↔ EBL/BGW</div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-sm">
                <div className="text-2xl font-black text-brand-800 dark:text-brand-400">3 Airports</div>
                <div className="text-xs text-gray-500 dark:text-neutral-400 mt-1">Erbil, Baghdad & Guangzhou</div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-sm">
                <div className="text-2xl font-black text-brand-800 dark:text-brand-400">VIP Concierge</div>
                <div className="text-xs text-gray-500 dark:text-neutral-400 mt-1">Consular Airport Counter</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Visa & Route Eligibility Checker */}
      <div id="eligibility-checker" className="w-full px-4 sm:px-6 md:px-8 py-8">
        <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-6 sm:p-8 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-900 dark:text-white">{t.checkEligibility}</h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400">Instant visa policy, clearance speed & flight connections between China, Iraq & Erbil</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 min-w-0">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-2">
                {t.selectOrigin}
              </label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-brand-900 dark:text-neutral-100 font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="CHINA">China Passport / Citizen (中国公民)</option>
                <option value="KURDISTAN">Erbil / Kurdistan Region Citizen (هەرێمی کوردستان)</option>
                <option value="IRAQ">Baghdad / Iraq Passport Holder (العراق)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-2">
                {t.selectDestination}
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-brand-900 dark:text-neutral-100 font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="KURDISTAN">Erbil International Airport (EBL) / Kurdistan</option>
                <option value="IRAQ">Baghdad International Airport (BGW) / Iraq</option>
                <option value="CHINA">Guangzhou (CAN) / Beijing (PEK) / Shanghai (PVG) - China</option>
              </select>
            </div>
          </div>

          {/* Results card */}
          <div className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-5 border border-gray-200 dark:border-neutral-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm min-w-0">
            <div>
              <div className="text-xs text-brand-600 dark:text-brand-400 font-semibold mb-1">Visa Category & Status</div>
              <div className="font-bold text-brand-900 dark:text-white text-base">{currentEligibility.visaType}</div>
              <div className="text-xs text-gray-500 dark:text-neutral-400 mt-1">{currentEligibility.validity}</div>
            </div>

            <div>
              <div className="text-xs text-brand-600 dark:text-brand-400 font-semibold mb-1">Flight Route Connection</div>
              <div className="font-medium text-gray-700 dark:text-neutral-200 text-xs leading-relaxed">{currentEligibility.flightRoute}</div>
            </div>

            <div>
              <div className="text-xs text-brand-600 dark:text-brand-400 font-semibold mb-1">Required Travel Documents</div>
              <ul className="text-xs text-gray-600 dark:text-neutral-300 space-y-1">
                {currentEligibility.docs.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-500 dark:text-brand-400 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs text-brand-600 dark:text-brand-400 font-semibold mb-1">Consular Emergency Hotline</div>
              <div className="text-xs text-gray-700 dark:text-neutral-300 mt-1 bg-white dark:bg-neutral-800 p-2 rounded border border-gray-200 dark:border-neutral-700">
                {currentEligibility.contact}
              </div>
              <button
                onClick={() => setFormOpen(true)}
                className="mt-3 w-full py-2 px-3 rounded-lg bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Apply with Assistance</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Services & Direct Flights Directory */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-6">
        {/* Search & Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch mb-12">
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-neutral-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-sm text-brand-900 dark:text-neutral-100 placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </form>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Region Select */}
            <div className="w-full sm:w-auto min-w-[180px]">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm font-bold text-brand-900 dark:text-neutral-100 uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none relative"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23F1F5F9%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem top 50%',
                  backgroundSize: '0.65rem auto',
                }}
              >
                <option value="ALL">{t.allRegions}</option>
                <option value="CHINA">{t.china}</option>
                <option value="IRAQ">{t.iraq}</option>
                <option value="KURDISTAN">{t.kurdistan}</option>
              </select>
            </div>

            {/* Category Select */}
            <div className="w-full sm:w-auto min-w-[240px]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm font-bold text-brand-900 dark:text-neutral-100 uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none relative"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23F1F5F9%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem top 50%',
                  backgroundSize: '0.65rem auto',
                }}
              >
                <option value="ALL">{t.allServices}</option>
                <option value="VISA_ASSISTANCE">{t.visaAssistance}</option>
                <option value="FLIGHT_ROUTE">{t.flightRoutes}</option>
                <option value="PASSPORT_DIPLOMATIC">{t.diplomaticPassport}</option>
                <option value="TRAVEL_PUBLICATION">{t.publications}</option>
                <option value="CONSULAR_GUIDE">{t.consularGuide}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-neutral-400">
            <RefreshCw className="w-8 h-8 animate-spin text-amber-500 mb-3" />
            <p>Loading Visa & Flight Promotions...</p>
          </div>
        ) : records.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 p-12 text-center max-w-md mx-auto">
            <Info className="w-12 h-12 text-gray-400 dark:text-neutral-500 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-neutral-300 font-medium">{t.noRecords}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-w-0">
            {records.map((item) => {
              const title = getLocalizedTitle(item);
              const summary = getLocalizedSummary(item);

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 hover:border-brand-500/50 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-50 dark:bg-neutral-900">
                    <img
                      src={item.imageUrl}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                    {item.isFeatured && (
                      <span className="absolute top-3 left-3 bg-amber-500/90 text-slate-950 font-bold text-xs px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                        FEATURED
                      </span>
                    )}

                    <span className="absolute bottom-3 left-3 bg-white dark:bg-neutral-900 backdrop-blur border border-gray-200 dark:border-neutral-700 text-brand-500 dark:text-brand-300 text-xs font-semibold px-2.5 py-1 rounded-md">
                      {item.originRegion} → {item.destinationRegion}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-brand-600 dark:text-brand-400 font-bold uppercase tracking-wider">
                        <span>{item.serviceType.replace('_', ' ')}</span>
                      </div>

                      <h3 className="text-lg font-bold text-brand-900 dark:text-white group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors leading-snug">
                        {title}
                      </h3>

                      <p className="text-xs text-gray-500 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                        {summary}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-neutral-800 text-xs">
                      <div className="flex items-center justify-between text-gray-600 dark:text-neutral-300">
                        <span className="text-gray-400 dark:text-neutral-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                          {t.processingTime}:
                        </span>
                        <span className="font-semibold text-gray-700 dark:text-neutral-200">{item.processingTime}</span>
                      </div>

                      <div className="flex items-center justify-between text-gray-600 dark:text-neutral-300">
                        <span className="text-gray-400 dark:text-neutral-500 flex items-center gap-1">
                          <Ticket className="w-3.5 h-3.5 text-emerald-400" />
                          {t.costFee}:
                        </span>
                        <span className="font-semibold text-emerald-400">{item.feeOrCost}</span>
                      </div>

                      <div className="flex items-center justify-between text-gray-600 dark:text-neutral-300">
                        <span className="text-gray-400 dark:text-neutral-500 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-amber-400" />
                          {t.authority}:
                        </span>
                        <span className="font-medium text-gray-600 dark:text-neutral-300 truncate max-w-[150px]">{item.airlineOrAuthority}</span>
                      </div>

                      <div className="pt-2 flex gap-2">
                        <button
                          onClick={() => setFormOpen(true)}
                          className="flex-1 py-2 px-3 rounded-lg bg-brand-600/80 dark:bg-brand-500/80 hover:bg-brand-600 dark:bg-brand-500 text-white font-bold text-xs transition-colors text-center"
                        >
                          {t.viewDetails}
                        </button>

                        {item.officialLink && (
                          <a
                            href={item.officialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-gray-50 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-600 dark:text-neutral-300 hover:text-brand-900 dark:hover:text-white transition-colors"
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



      {/* Concierge Inquiry Modal Form */}
      {formOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl max-w-lg w-full p-6 relative text-ink-900 dark:text-neutral-100 shadow-2xl">
            <button
              onClick={() => {
                setFormOpen(false);
                setFormSuccess(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-500 dark:text-neutral-400 hover:text-brand-800 dark:text-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-brand-800 dark:text-white mb-2">{t.requestConcierge}</h3>
            <p className="text-xs text-gray-500 dark:text-neutral-400 mb-6">Transmit your visa assistance or flight charter reservation request directly to our bilateral concierge secretariat.</p>

            {formSuccess ? (
              <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 p-6 rounded-xl text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-50">{t.successMsg}</h4>
                <div className="bg-white dark:bg-neutral-900 p-3 rounded-lg border border-emerald-100 dark:border-emerald-800/30 text-xs text-emerald-700 dark:text-emerald-400">
                  Tracking Ticket ID: {formSuccess.ticketId}
                </div>
                <p className="text-xs text-gray-600 dark:text-neutral-300 leading-relaxed">{formSuccess.message}</p>
                <button
                  onClick={() => {
                    setFormOpen(false);
                    setFormSuccess(null);
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700 text-ink-900 dark:text-white text-xs font-bold"
                >
                  {t.close}
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-500 dark:text-neutral-400 mb-1 font-semibold">{t.fullName} *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-ink-900 dark:text-neutral-100"
                  />
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 min-w-0">
                  <div>
                    <label className="block text-gray-500 dark:text-neutral-400 mb-1 font-semibold">{t.email} *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-ink-900 dark:text-neutral-100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 dark:text-neutral-400 mb-1 font-semibold">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+964 750 ... / +86 ..."
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-ink-900 dark:text-neutral-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 min-w-0">
                  <div>
                    <label className="block text-gray-500 dark:text-neutral-400 mb-1 font-semibold">{t.passportNum} *</label>
                    <input
                      type="text"
                      required
                      value={formData.passportNumber}
                      onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-ink-900 dark:text-neutral-100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 dark:text-neutral-400 mb-1 font-semibold">Nationality</label>
                    <input
                      type="text"
                      placeholder="e.g. Iraqi, Chinese, Foreign"
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-ink-900 dark:text-neutral-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 min-w-0">
                  <div>
                    <label className="block text-gray-500 dark:text-neutral-400 mb-1 font-semibold">Origin City/Country</label>
                    <input
                      type="text"
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-ink-900 dark:text-neutral-100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 dark:text-neutral-400 mb-1 font-semibold">Destination City</label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-ink-900 dark:text-neutral-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 min-w-0">
                  <div>
                    <label className="block text-gray-500 dark:text-neutral-400 mb-1 font-semibold">{t.travelDate}</label>
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-ink-900 dark:text-neutral-100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 dark:text-neutral-400 mb-1 font-semibold">Service Type</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-ink-900 dark:text-neutral-100"
                    >
                      <option value="VISA_ASSISTANCE">Visa & E-Visa Expedited</option>
                      <option value="FLIGHT_ROUTE">Direct Flight Booking Charter</option>
                      <option value="PASSPORT_DIPLOMATIC">Diplomatic & Chamber Green Channel</option>
                      <option value="CONSULAR_GUIDE">Airport Concierge Fast-Track</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-500 dark:text-neutral-400 mb-1 font-semibold">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-ink-900 dark:text-neutral-100"
                    >
                      <option value="STANDARD">Standard Consular</option>
                      <option value="EXPEDITED">Expedited Business</option>
                      <option value="DIPLOMATIC">VIP / Diplomatic Priority</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-500 dark:text-neutral-400 mb-1 font-semibold">{t.notes}</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-2.5 text-ink-900 dark:text-neutral-100"
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
