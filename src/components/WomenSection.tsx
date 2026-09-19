import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { WomenProfile, Locale } from '../types';
import { 
  Users, Award, BookOpen, ShieldCheck, HeartHandshake,
  ChevronRight, X, Send, CheckCircle2, Sparkles, Globe2, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WomenSectionProps {
  lang?: Locale;
}

export function WomenSection({ lang = 'en' }: WomenSectionProps) {
  const currentLang = lang as Locale;
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeProfile, setActiveProfile] = useState<WomenProfile | null>(null);
  const [joinSent, setJoinSent] = useState(false);
  const [joinForm, setJoinForm] = useState({ name: '', email: '', organization: '', message: '' });

  // Query women features from REST API
  const { data: profiles = [], isLoading } = useQuery<WomenProfile[]>({
    queryKey: ['women-profiles-home'],
    queryFn: async () => {
      const res = await fetch('/api/women');
      if (!res.ok) throw new Error('Failed to fetch women leadership data');
      return res.json();
    }
  });

  const getName = (p: WomenProfile) => {
    if (currentLang === 'ar' && p.nameAr) return p.nameAr;
    if (currentLang === 'zh' && p.nameZh) return p.nameZh;
    if (currentLang === 'ckb' && p.nameCkb) return p.nameCkb;
    return p.nameEn;
  };

  const getTitle = (p: WomenProfile) => {
    if (currentLang === 'ar' && p.titleAr) return p.titleAr;
    if (currentLang === 'zh' && p.titleZh) return p.titleZh;
    if (currentLang === 'ckb' && p.titleCkb) return p.titleCkb;
    return p.titleEn;
  };

  const getSummary = (p: WomenProfile) => {
    if (currentLang === 'ar' && p.summaryAr) return p.summaryAr;
    if (currentLang === 'zh' && p.summaryZh) return p.summaryZh;
    if (currentLang === 'ckb' && p.summaryCkb) return p.summaryCkb;
    return p.summaryEn;
  };

  const getBio = (p: WomenProfile) => {
    if (currentLang === 'ar' && p.bioAr) return p.bioAr;
    if (currentLang === 'zh' && p.bioZh) return p.bioZh;
    if (currentLang === 'ckb' && p.bioCkb) return p.bioCkb;
    return p.bioEn || p.summaryEn;
  };

  const filteredProfiles = profiles.filter(p => {
    const matchReg = selectedRegion === 'ALL' || p.region === selectedRegion;
    const matchCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    return matchReg && matchCat;
  }).slice(0, 6);

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinSent(true);
    setTimeout(() => {
      setJoinSent(false);
      setActiveProfile(null);
      setJoinForm({ name: '', email: '', organization: '', message: '' });
    }, 2500);
  };

  return (
    <section className="w-full bg-white dark:bg-neutral-900 border-2 border-ink-900 dark:border-neutral-700 shadow-sm p-6 sm:p-8 md:p-10 my-6 transition-colors duration-300 space-y-6 relative overflow-hidden">
      {/* Visual Header Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-brand-800 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-brand-800 text-white text-xs font-bold px-2.5 py-1 tracking-wider uppercase flex items-center gap-1 rounded-sm">
              <Users className="w-3.5 h-3.5" />
              {currentLang === 'ar' ? 'منصة المرأة والتمكين' : currentLang === 'zh' ? '双边女性领导力与政策专区' : currentLang === 'ckb' ? 'دەروازەی مافی ئافرەتان' : 'Women Leadership & Policy Forum'}
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 text-xs">Beijing • Baghdad • Erbil</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-900 dark:text-white tracking-tight">
            {currentLang === 'ar' 
              ? 'مساحة المرأة: الشخصيات المرموقة، السياسات، والإنجازات' 
              : currentLang === 'zh' 
              ? '女性专题：杰出人物、法治权益、创新成果与学术著作' 
              : currentLang === 'ckb' 
              ? 'بەشی تایبەت بە ئافرەتان: کەسایەتییەکان، یاسا و دەستکەوتەکان' 
              : 'Women Forum: Prominent Figures, Rights, Policy & Achievements'}
          </h2>

          <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            {currentLang === 'ar'
              ? 'مساحة مستقلة مخصصة لإبراز القامات النسائية في الصين والعراق وإقليم كردستان، وتعزيز الأطر القانونية لحقوق المرأة، ونشر الأبحاث الأكاديمية والسياسات الثنائية.'
              : currentLang === 'zh'
              ? '专为中伊及库尔德斯坦女性设立的高规格展示与交流平台，涵盖杰出女性代表、法治权益保障政策、科技创新成果与中伊交流学术著作。'
              : currentLang === 'ckb'
              ? 'تایبەت بە بەهێزکردنی ئافرەتان لە چین، عێراق و هەرێمی کوردستان لە بواری یاسا، سیاسەت، زانست و بڵاوکراوە ئەکادیمییەکان.'
              : 'Empowering prominent female pioneers, championing women legal rights & policy, showcasing trending achievements, and publishing bilateral academic papers connecting China, Iraq, and Kurdistan.'}
          </p>
        </div>

        <Link
          to={`/${currentLang}/women`}
          className="self-start md:self-auto inline-flex items-center gap-2 bg-brand-800 text-white hover:bg-brand-900 px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-sm shrink-0 rounded-lg"
        >
          <span>{currentLang === 'ar' ? 'استكشف البوابة كاملة' : currentLang === 'zh' ? '进入完整女性门户' : currentLang === 'ckb' ? 'سەردانی تەواوی بەشەکە بکە' : 'Explore Women Portal'}</span>
          <ChevronRight className="w-4 h-4 rtl:rotate-180" />
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-100/90 dark:bg-neutral-800/90 p-3.5 border border-brand-800/20 dark:border-neutral-700 rounded-lg shadow-xs">
        {/* Region Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white dark:bg-neutral-900 rounded-md border border-neutral-200 dark:border-neutral-700/80 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 px-2 flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-brand-800 dark:text-brand-400" />
            {currentLang === 'ar' ? 'الإقليم:' : currentLang === 'zh' ? '地区:' : currentLang === 'ckb' ? 'هەرێم:' : 'Region:'}
          </span>
          {[
            { id: 'ALL', labelEn: 'All Regions', labelAr: 'الكل', labelZh: '全部地区', labelCkb: 'هەموو' },
            { id: 'CHINA', labelEn: 'China 🇨🇳', labelAr: 'الصين 🇨🇳', labelZh: '中国 🇨🇳', labelCkb: 'چین 🇨🇳' },
            { id: 'IRAQ', labelEn: 'Iraq 🇮🇶', labelAr: 'العراق 🇮🇶', labelZh: '伊拉克 🇮🇶', labelCkb: 'عێراق 🇮🇶' },
            { id: 'KURDISTAN', labelEn: 'Kurdistan Region', labelAr: 'إقليم كردستان', labelZh: '库尔德斯坦', labelCkb: 'هەرێمی کوردستان' },
            { id: 'BILATERAL', labelEn: 'Bilateral Sino-Iraqi', labelAr: 'ثنائي صيني عراقي', labelZh: '中伊双边合作', labelCkb: 'دووقۆڵی چین و عێراق' },
          ].map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-sm cursor-pointer ${
                selectedRegion === r.id
                  ? 'bg-brand-800 text-white shadow-xs ring-1 ring-brand-800'
                  : 'bg-transparent text-neutral-600 dark:text-neutral-300 hover:text-brand-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {currentLang === 'ar' ? r.labelAr : currentLang === 'zh' ? r.labelZh : currentLang === 'ckb' ? r.labelCkb : r.labelEn}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white dark:bg-neutral-900 rounded-md border border-neutral-200 dark:border-neutral-700/80 shadow-xs">
          {[
            { id: 'ALL', labelEn: 'All Focus', labelAr: 'كل المحاور', labelZh: '全部分类', labelCkb: 'هەموو جۆرەکان' },
            { id: 'PROMINENT_FIGURE', labelEn: 'Pioneers', labelAr: 'شخصيات بارزة', labelZh: '杰出人物', labelCkb: 'کەسایەتی دیار' },
            { id: 'POLICY_RIGHTS', labelEn: 'Rights & Policy', labelAr: 'الحقوق والسياسات', labelZh: '权益与政策', labelCkb: 'یاسا و سیاسەت' },
            { id: 'ACHIEVEMENTS', labelEn: 'Achievements', labelAr: 'إنجازات وابتكارات', labelZh: '成果与盛会', labelCkb: 'دەستکەوتەکان' },
            { id: 'PUBLICATIONS', labelEn: 'Publications', labelAr: 'دراسات وأبحاث', labelZh: '学术著作', labelCkb: 'بڵاوکراوەکان' },
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-sm cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-brand-800 text-white shadow-xs ring-1 ring-brand-800'
                  : 'bg-transparent text-neutral-600 dark:text-neutral-300 hover:text-brand-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {currentLang === 'ar' ? c.labelAr : currentLang === 'zh' ? c.labelZh : currentLang === 'ckb' ? c.labelCkb : c.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 bg-gray-100 dark:bg-neutral-800 animate-pulse border border-gray-200 dark:border-neutral-700 rounded-lg" />
          ))}
        </div>
      ) : filteredProfiles.length === 0 ? (
        <div className="text-center py-20 bg-[#F4F4F0] dark:bg-neutral-800 border border-dashed border-gray-400 dark:border-neutral-600 p-6 space-y-2 rounded-lg">
          <p className="text-gray-600 dark:text-neutral-300 text-lg">
            {currentLang === 'ar' ? 'لا توجد سجلات مطابقة حالياً' : currentLang === 'zh' ? '暂无匹配的女性专题记录' : currentLang === 'ckb' ? 'هیچ تۆمارێک نەدۆزرایەوە' : 'No matching records found'}
          </p>
          <button
            onClick={() => { setSelectedRegion('ALL'); setSelectedCategory('ALL'); }}
            className="text-brand-800 dark:text-brand-400 text-xs underline font-bold"
          >
            {currentLang === 'ar' ? 'إعادة ضبط التصفية' : currentLang === 'zh' ? '重置筛选条件' : currentLang === 'ckb' ? 'پاكکردنەوەی فلتەر' : 'Reset Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveProfile(item)}
              className="group bg-white dark:bg-neutral-800/95 border border-neutral-200 dark:border-neutral-700 hover:border-brand-800 dark:hover:border-brand-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden rounded-lg"
            >
              <div>
                {/* Image & Badges Container */}
                <div className="relative h-52 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={item.imageUrl}
                    alt={getName(item)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 start-3 flex flex-wrap gap-1.5 z-10">
                    <span className="bg-black/75 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-sm border border-white/20">
                      {item.region}
                    </span>
                    <span className="bg-brand-800 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-sm border border-brand-700/50">
                      {item.category.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Name overlay */}
                  <div className="absolute bottom-3 start-3 end-3 text-white">
                    <h3 className="text-lg sm:text-xl font-bold leading-snug group-hover:text-brand-300 transition-colors drop-shadow-sm">
                      {getName(item)}
                    </h3>
                  </div>
                </div>

                {/* Content info */}
                <div className="p-4 space-y-2.5">
                  <p className="text-xs sm:text-sm font-bold tracking-wide text-brand-800 dark:text-brand-400 uppercase line-clamp-1">
                    {getTitle(item)}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {getSummary(item)}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 pt-2 border-t border-neutral-100 dark:border-neutral-700/80 mt-1 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <span className="truncate max-w-[180px] font-medium">{item.organization}</span>
                <span className="text-brand-800 dark:text-brand-400 font-bold group-hover:underline flex items-center gap-1 shrink-0">
                  {currentLang === 'ar' ? 'عرض السيرة/التفاصيل' : currentLang === 'zh' ? '查看详情' : currentLang === 'ckb' ? 'بینینی زانیاری' : 'View Details'}
                  <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Profile Viewer */}
      <AnimatePresence>
        {activeProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-neutral-900 border-2 border-brand-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 rounded-lg shadow-2xl relative text-start"
            >
              <button
                onClick={() => setActiveProfile(null)}
                className="absolute top-4 end-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-brand-800 hover:text-white p-2 rounded-md transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <img
                  src={activeProfile.imageUrl}
                  alt={getName(activeProfile)}
                  className="w-full sm:w-36 h-36 object-cover border-2 border-brand-800 rounded-md shrink-0 shadow-sm"
                />
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="bg-black/75 dark:bg-neutral-800 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm border border-white/20 shadow-xs">
                      {activeProfile.region}
                    </span>
                    <span className="bg-brand-800 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-xs border border-brand-700/50">
                      {activeProfile.category.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-brand-900 dark:text-white tracking-tight">
                    {getName(activeProfile)}
                  </h3>

                  <p className="text-sm font-bold text-brand-800 dark:text-brand-400 uppercase tracking-wide">
                    {getTitle(activeProfile)}
                  </p>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    🏛️ {activeProfile.organization}
                  </p>
                </div>
              </div>

              {/* Biography / Full Detail */}
              <div className="space-y-3 border-t border-b border-neutral-200 dark:border-neutral-700/80 py-4 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                  {currentLang === 'ar' ? 'نبذة ومسيرة / الإطار السياساتي:' : currentLang === 'zh' ? '详细履历与成果背景:' : currentLang === 'ckb' ? 'پوختەی کار و چالاکی:' : 'Biography & Policy Background:'}
                </h4>
                <p className="whitespace-pre-line text-sm leading-relaxed">{getBio(activeProfile)}</p>
              </div>

              {/* External link or document button */}
              {activeProfile.publicationUrl && (
                <div className="bg-neutral-50 dark:bg-neutral-800/60 p-3.5 border border-neutral-200 dark:border-neutral-700 rounded-md flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <BookOpen className="w-4 h-4 text-brand-800 dark:text-brand-400" />
                    <span className="font-bold text-neutral-800 dark:text-neutral-200">Official Document / Publication Link</span>
                  </div>
                  <a
                    href={activeProfile.publicationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 bg-brand-800 hover:bg-brand-900 text-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs"
                  >
                    <span>Open Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Form to submit inquiry / join delegation */}
              <div className="space-y-3 pt-2">
                <h4 className="text-base font-bold text-brand-900 dark:text-white flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-brand-800 dark:text-brand-400" />
                  {currentLang === 'ar' ? 'انضم إلى شبكة قيادات المرأة الصينية العراقية' : currentLang === 'zh' ? '申请加入中伊女性领导力与政策合作网络' : currentLang === 'ckb' ? 'پەیوەندی بکە بە تۆڕی ئافرەتانی سەرکردە' : 'Join Sino-Iraqi Women Leadership Network'}
                </h4>

                {joinSent ? (
                  <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500 p-4 text-emerald-800 dark:text-emerald-300 text-xs rounded-md flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Your application and profile inquiry has been transmitted to the Women Leadership Secretariat in Baghdad & Beijing.</span>
                  </div>
                ) : (
                  <form onSubmit={handleJoinSubmit} className="space-y-3 bg-neutral-50 dark:bg-neutral-800/60 p-4 border border-neutral-200 dark:border-neutral-700 rounded-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={joinForm.name}
                        onChange={e => setJoinForm({ ...joinForm, name: e.target.value })}
                        className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-neutral-900 dark:text-neutral-100 rounded-sm focus:outline-none focus:border-brand-800"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Official Email"
                        value={joinForm.email}
                        onChange={e => setJoinForm({ ...joinForm, email: e.target.value })}
                        className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-neutral-900 dark:text-neutral-100 rounded-sm focus:outline-none focus:border-brand-800"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Organization / University / Ministry"
                      value={joinForm.organization}
                      onChange={e => setJoinForm({ ...joinForm, organization: e.target.value })}
                      className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-neutral-900 dark:text-neutral-100 rounded-sm focus:outline-none focus:border-brand-800"
                    />
                    <textarea
                      rows={2}
                      placeholder="Proposal or Collaboration Note..."
                      value={joinForm.message}
                      onChange={e => setJoinForm({ ...joinForm, message: e.target.value })}
                      className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-neutral-900 dark:text-neutral-100 rounded-sm focus:outline-none focus:border-brand-800"
                    />
                    <button
                      type="submit"
                      className="w-full bg-brand-800 hover:bg-brand-900 text-white py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Application to Secretariat</span>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
