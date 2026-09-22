import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { SUMMIT_AGENDA } from '../../data/summitData';
import { 
  Calendar, Clock, MapPin, Download, Filter, 
  Sparkles, BookOpen, User, CheckCircle2, ArrowRight
} from 'lucide-react';

export function SummitAgendaPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [selectedSessionModal, setSelectedSessionModal] = useState<any | null>(null);

  const tracks = [
    { id: 'all', label: { en: 'All Tracks', ar: 'كافة المسارات', zh: '全部平行论坛', ckb: 'هەموو بەشەکان' } },
    { id: 'Plenary', label: { en: 'Strategic Plenary', ar: 'الجلسة العامة', zh: '大会主旨峰会', ckb: 'کۆبوونەوەی گشتی' } },
    { id: 'Sector Forum', label: { en: 'Sector Forums', ar: 'المنتديات القطاعية', zh: '产业专题论坛', ckb: 'کۆڕبەندی کەرتەکان' } },
    { id: 'Workshop', label: { en: 'Masterclasses & ICA Services', ar: 'ورش العمل والخدمات', zh: '实战工坊与清算专题', ckb: 'وۆرکشۆپەکان' } },
    { id: 'B2B', label: { en: 'B2B & Signing Ceremony', ar: 'التوفيق وتوقيع الصفقات', zh: 'B2B对接与签约', ckb: 'ڕێککەوتننامەکان' } },
  ];

  const filteredSessions = SUMMIT_AGENDA.filter(s => {
    if (s.day !== activeDay) return false;
    if (selectedTrack !== 'all' && s.track !== selectedTrack) return false;
    return true;
  });

  const downloadIcs = (session: any) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ICA//Summit 2026//EN
BEGIN:VEVENT
SUMMARY:${session.title.en}
DESCRIPTION:${session.description.en} - Knowledge Partner: Chinese Institute for Strategic and Economic Studies
LOCATION:${session.location.en}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `summit-session-${session.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SummitLayout lang={lang} activeNav="agenda">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
        
        {/* Header Hero */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-800 dark:text-brand-400" />
            <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
              {lang === 'ar' ? 'الجدول الزمني الرسمي' : lang === 'zh' ? '官方全景议程' : lang === 'ckb' ? 'بەرنامەی فەرمی کارەکان' : 'Official Full Programme'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
            {lang === 'ar' ? 'برنامج قمة ومعرض السليمانية (٣ أيام)' : lang === 'zh' ? '伊拉克—中国经济峰会暨双边博览会三日全景日程' : lang === 'ckb' ? 'بەرنامەی ٣ ڕۆژەی لووتکە و پێشانگای ئابووری' : '3-Day Summit & Bilateral Expo Agenda'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            {lang === 'ar'
              ? 'تتوزع الجلسات على ٤ مسارات متوازية تشمل الجلسات الوزارية الدبلوماسية، والمنتديات القطاعية التخصصية، ومصادقات الصفقات التجارية، وورش العمل التنفيذية بإشراف المعهد الصيني للدراسات.'
              : lang === 'zh'
              ? '包含战略全会、11大产业平行分论坛、跨境清算与信保实务工坊、B2B闭门对接及重大项目集中签约仪式。'
              : lang === 'ckb'
              ? 'بەرنامەکە لە چوار تەوەر پێکهاتووە لە کۆبوونەوەی باڵای دیپلۆماسی و کۆڕبەندی تایبەت بە کەرتەکان و ڕێککەوتننامە بازرگانییەکان.'
              : 'Covering ministerial plenaries, sector roundtables, bilateral B2B deal rooms, and Institute-led policy masterclasses.'}
          </p>
        </div>

        {/* Day Selector & Track Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          {/* Day Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[1, 2, 3].map((d) => (
              <button
                key={d}
                onClick={() => setActiveDay(d as 1 | 2 | 3)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeDay === d
                    ? 'bg-brand-800 text-white shadow-sm'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                }`}
              >
                Day {d} — {d === 1 ? 'Opening & Macro Strategy (Nov 18)' : d === 2 ? 'Sector Forums & B2B Match (Nov 19)' : 'Signing & Industrial Visits (Nov 20)'}
              </button>
            ))}
          </div>

          {/* Track Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            {tracks.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTrack(t.id)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedTrack === t.id
                    ? 'bg-brand-100 dark:bg-brand-950 text-brand-900 dark:text-brand-300 border border-brand-300 dark:border-brand-800'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                }`}
              >
                {t.label[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-brand-600 transition-all shadow-xs space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-brand-100 dark:bg-brand-950 text-brand-900 dark:text-brand-300">
                    {session.track}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    <Clock size={13} className="text-brand-800 dark:text-brand-400" />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                    <MapPin size={13} className="text-neutral-400" />
                    <span>{session.location[lang]}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => downloadIcs(session)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 transition-colors cursor-pointer"
                    title="Add to Calendar (.ics)"
                  >
                    <Download size={13} />
                    <span>.ICS</span>
                  </button>
                  <button
                    onClick={() => setSelectedSessionModal(session)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-black bg-brand-800 text-white hover:bg-brand-900 transition-colors cursor-pointer"
                  >
                    <span>Details</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-neutral-100">
                  {session.title[lang]}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {session.description[lang]}
                </p>
              </div>

              {/* Research Link & Keynote */}
              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                {session.instituteResearchTitle ? (
                  <div className="flex items-center gap-2 text-brand-800 dark:text-brand-300 font-bold">
                    <BookOpen size={14} className="shrink-0" />
                    <span>Institute Paper:</span>
                    <Link to={`/${lang}/institute/publications`} className="underline hover:text-brand-900 dark:hover:text-white">
                      {session.instituteResearchTitle[lang]}
                    </Link>
                  </div>
                ) : (
                  <div className="text-[11px] text-neutral-400">Sovereign Plenary Track</div>
                )}

                <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                  Simultaneous Translation: AR / ZH / EN / CKB
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Session Details */}
        {selectedSessionModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-brand-100 dark:bg-brand-950 text-brand-900 dark:text-brand-300">
                  {selectedSessionModal.track} • Day {selectedSessionModal.day}
                </span>
                <button
                  onClick={() => setSelectedSessionModal(null)}
                  className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 font-black text-sm p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-neutral-900 dark:text-neutral-100">
                  {selectedSessionModal.title[lang]}
                </h3>
                <div className="flex items-center gap-4 text-xs font-bold text-neutral-500">
                  <span>{selectedSessionModal.time}</span>
                  <span>•</span>
                  <span>{selectedSessionModal.location[lang]}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {selectedSessionModal.description[lang]}
              </p>

              {selectedSessionModal.instituteResearchTitle && (
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs space-y-1">
                  <div className="font-bold text-brand-800 dark:text-brand-300">Supported Knowledge Paper:</div>
                  <div className="text-neutral-700 dark:text-neutral-300 font-semibold">{selectedSessionModal.instituteResearchTitle[lang]}</div>
                  <Link to={`/${lang}/institute/publications`} className="text-brand-700 dark:text-brand-400 underline font-bold block pt-1">
                    Download Policy Monograph from Institute Portal →
                  </Link>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => downloadIcs(selectedSessionModal)}
                  className="px-4 py-2 rounded-xl text-xs font-black bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-800 dark:text-neutral-200 transition-colors"
                >
                  Download .ICS
                </button>
                <button
                  onClick={() => setSelectedSessionModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-black bg-brand-800 text-white hover:bg-brand-900 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </SummitLayout>
  );
}
