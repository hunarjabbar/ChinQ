import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { SECTOR_PAVILIONS } from '../../data/summitData';
import { 
  Handshake, Sparkles, CheckCircle2, Clock, 
  MapPin, Calendar, Users, ArrowRight, ShieldCheck, Filter 
} from 'lucide-react';

export function SummitB2BMatchmakingPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const [selectedDay, setSelectedDay] = useState<1 | 2 | 3>(2);
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const dealRooms = [
    {
      id: 'B2B-101',
      day: 2,
      time: '10:00 - 11:30 AM',
      sector: 'industrial-machinery',
      title: {
        en: 'Heavy CNC & Automation Manufacturers Roundtable',
        ar: 'طاولة مستديرة لمصنعي آلات CNC الثقيلة والأتمتة',
        zh: '高端数控机床与自动化重型装备对洽会',
        ckb: 'کۆبوونەوەی تایبەت بە ئامێرە قورسەکان'
      },
      room: 'Deal Lounge Alpha (Hall A)',
      delegations: 'Zhejiang Machinery Guild & Iraqi Contractors Union',
      slotsLeft: 4
    },
    {
      id: 'B2B-102',
      day: 2,
      time: '02:00 - 03:30 PM',
      sector: 'automotive-ev',
      title: {
        en: 'Electric Vehicle & Fleet Distribution Deal Room',
        ar: 'غرفة صفقات المركبات الكهربائية وتوزيع الأساطيل',
        zh: '新能源乘用车与商用重卡伊拉克区域总代对接专场',
        ckb: 'کۆبوونەوەی نوێنەرایەتی ئۆتۆمبێلی کارەبایی'
      },
      room: 'Executive Suite 2 (Hall A)',
      delegations: 'BYD/Geely Fleet Partners & KRG Transport Ministry',
      slotsLeft: 2
    },
    {
      id: 'B2B-103',
      day: 2,
      time: '04:00 - 05:30 PM',
      sector: 'medical-pharma',
      title: {
        en: 'Sino-Iraqi Pharmaceutical Joint Venture Session',
        ar: 'جلسة المشاريع المشتركة للصناعات الدوائية والمستلزمات الطبية',
        zh: '中伊生物医药与高端医疗器械本地化合资闭门会',
        ckb: 'کۆبوونەوەی هاوبەشی دەرمانسازی'
      },
      room: 'Deal Lounge Beta (Hall B)',
      delegations: 'Sinopharm / KRG Health Board & Private Hospitals',
      slotsLeft: 5
    },
    {
      id: 'B2B-104',
      day: 3,
      time: '11:00 AM - 12:30 PM',
      sector: 'energy-petrochemicals',
      title: {
        en: 'Solar EPC & Substation Consortium Matchmaking',
        ar: 'مطابقة تحالفات محطات الطاقة الشمسية ومحطات التحويل',
        zh: '光伏电站EPC总包与输变电成套设备银企对接会',
        ckb: 'کۆبوونەوەی وزەی خۆر و وێستگەکان'
      },
      room: 'Grand Ballroom C (VIP Wing)',
      delegations: 'PowerChina / State Bank of Iraq / Private Developers',
      slotsLeft: 1
    }
  ];

  const filteredRooms = dealRooms.filter(r => {
    if (r.day !== selectedDay) return false;
    if (selectedSector !== 'all' && r.sector !== selectedSector) return false;
    return true;
  });

  return (
    <SummitLayout lang={lang} activeNav="b2b">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        
        {/* Header Hero */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Handshake className="w-5 h-5 text-brand-800 dark:text-brand-400" />
            <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
              {lang === 'ar' ? 'منصة التوفيق التجاري والاستثماري' : lang === 'zh' ? '1对1精准商贸与投资配对系统' : lang === 'ckb' ? 'سیستەمی کۆبوونەوەی دووقۆڵی بازرگانی' : 'B2B & G2B Matchmaking Platform'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
            {lang === 'ar' ? 'جلسات التوفيق التجاري الموجهة (B2B Deal Rooms)' : lang === 'zh' ? '闭门洽谈室预约与精准商务对洽日程' : lang === 'ckb' ? 'کۆبوونەوەی تایبەت و ڕێککەوتننامەی بازرگانی' : 'Targeted B2B Matchmaking & Private Deal Rooms'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            {lang === 'ar'
              ? 'احجز مقعدك في غرف الصفقات المغلقة للتفاوض المباشر مع المصانع الصينية المعتمدة، مع توفير مترجمين فوريين، ومستشاري ائتمان من Sinosure، وممثلي المقاصة المالية بالدينار واليوان.'
              : 'Reserve your private conference suite to negotiate directly with verified Chinese OEM directors, complete with on-demand bilingual trade interpreters and Sinosure credit officers.'}
          </p>
        </div>

        {/* Confirmation Toast */}
        {bookingSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span><strong>Session Locked!</strong> You have been added to session <strong>{bookingSuccess}</strong>. Confirmation dispatched to your accredited pass.</span>
            </div>
            <button onClick={() => setBookingSuccess(null)} className="font-bold underline cursor-pointer">Dismiss</button>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[1, 2, 3].map(d => (
              <button
                key={d}
                onClick={() => setSelectedDay(d as 1 | 2 | 3)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  selectedDay === d
                    ? 'bg-brand-800 text-white shadow-sm'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                }`}
              >
                Day {d} Deal Rooms
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Filter size={14} className="text-neutral-500" />
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold"
            >
              <option value="all">All Sectors</option>
              {SECTOR_PAVILIONS.map(s => (
                <option key={s.id} value={s.slug}>{s.name[lang]}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Deal Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs hover:border-brand-600 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-brand-100 dark:bg-brand-950 text-brand-900 dark:text-brand-300">
                    Day {room.day} • {room.time}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    {room.slotsLeft} Private Slots Remaining
                  </span>
                </div>

                <h3 className="text-base font-black text-neutral-900 dark:text-neutral-100">
                  {room.title[lang]}
                </h3>

                <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-brand-800 dark:text-brand-400 shrink-0" />
                    <span><strong>Location:</strong> {room.room}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-brand-800 dark:text-brand-400 shrink-0" />
                    <span><strong>Delegation:</strong> {room.delegations}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400 font-bold">Includes Interpreter</span>
                <button
                  onClick={() => setBookingSuccess(room.id)}
                  className="px-4 py-2 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Book Deal Slot →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </SummitLayout>
  );
}
