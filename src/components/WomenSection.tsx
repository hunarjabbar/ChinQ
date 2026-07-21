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
    <section className="bg-white border-2 border-[#111111] p-6 sm:p-8 rounded-xs shadow-md space-y-6 my-10 relative overflow-hidden">
      {/* Visual Header Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#111111] pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#990000] text-white font-mono text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {currentLang === 'ar' ? 'منصة المرأة والتمكين' : currentLang === 'zh' ? '双边女性领导力与政策专区' : currentLang === 'ckb' ? 'دەروازەی مافی ئافرەتان' : 'Women Leadership & Policy Forum'}
            </span>
            <span className="text-gray-500 font-mono text-[11px]">Beijing • Baghdad • Erbil</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111] tracking-tight">
            {currentLang === 'ar' 
              ? 'مساحة المرأة: الشخصيات المرموقة، السياسات، والإنجازات' 
              : currentLang === 'zh' 
              ? '女性专题：杰出人物、法治权益、创新成果与学术著作' 
              : currentLang === 'ckb' 
              ? 'بەشی تایبەت بە ئافرەتان: کەسایەتییەکان، یاسا و دەستکەوتەکان' 
              : 'Women Forum: Prominent Figures, Rights, Policy & Achievements'}
          </h2>

          <p className="text-gray-600 text-sm max-w-3xl leading-relaxed">
            {currentLang === 'ar'
              ? 'مساحة سيادية مخصصة لإبراز القامات النسائية في الصين والعراق وإقليم كردستان، وتعزيز الأطر القانونية لحقوق المرأة، ونشر الأبحاث الأكاديمية والسياسات الثنائية.'
              : currentLang === 'zh'
              ? '专为中伊及库尔德斯坦女性设立的高规格展示与交流平台，涵盖杰出女性代表、法治权益保障政策、科技创新成果与中伊交流学术著作。'
              : currentLang === 'ckb'
              ? 'تایبەت بە بەهێزکردنی ئافرەتان لە چین، عێراق و هەرێمی کوردستان لە بواری یاسا، سیاسەت، زانست و بڵاوکراوە ئەکادیمییەکان.'
              : 'Empowering prominent female pioneers, championing women legal rights & policy, showcasing trending achievements, and publishing bilateral academic papers connecting China, Iraq, and Kurdistan.'}
          </p>
        </div>

        <Link
          to={`/${currentLang}/women`}
          className="self-start md:self-auto inline-flex items-center gap-2 bg-[#990000] text-white hover:bg-[#7a0000] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs shrink-0"
        >
          <span>{currentLang === 'ar' ? 'استكشف البوابة كاملة' : currentLang === 'zh' ? '进入完整女性门户' : currentLang === 'ckb' ? 'سەردانی تەواوی بەشەکە بکە' : 'Explore Women Portal'}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#F4F4F0] p-3 border border-[#111111]/20 rounded-xs">
        {/* Region Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono font-bold uppercase text-gray-500 mr-1 flex items-center gap-1">
            <Globe2 className="w-3.5 h-3.5" />
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
              className={`px-2.5 py-1 text-xs font-mono transition-colors ${
                selectedRegion === r.id
                  ? 'bg-[#111111] text-white font-bold'
                  : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
              }`}
            >
              {currentLang === 'ar' ? r.labelAr : currentLang === 'zh' ? r.labelZh : currentLang === 'ckb' ? r.labelCkb : r.labelEn}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
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
              className={`px-2.5 py-1 text-xs font-mono transition-colors ${
                selectedCategory === c.id
                  ? 'bg-[#990000] text-white font-bold'
                  : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
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
            <div key={i} className="h-64 bg-gray-100 animate-pulse border border-gray-300 rounded-xs" />
          ))}
        </div>
      ) : filteredProfiles.length === 0 ? (
        <div className="text-center py-12 bg-[#F4F4F0] border border-dashed border-gray-400 p-6 space-y-2">
          <p className="text-gray-600 font-serif text-lg">
            {currentLang === 'ar' ? 'لا توجد سجلات مطابقة حالياً' : currentLang === 'zh' ? '暂无匹配的女性专题记录' : currentLang === 'ckb' ? 'هیچ تۆمارێک نەدۆزرایەوە' : 'No matching records found'}
          </p>
          <button
            onClick={() => { setSelectedRegion('ALL'); setSelectedCategory('ALL'); }}
            className="text-[#990000] font-mono text-xs underline font-bold"
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
              className="group bg-white border border-[#111111] hover:border-[#990000] hover:shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer relative overflow-hidden"
            >
              <div>
                {/* Image & Badges Container */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                  <img
                    src={item.imageUrl}
                    alt={getName(item)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    <span className="bg-[#111111] text-white text-[10px] font-mono px-2 py-0.5 font-bold uppercase tracking-wider border border-white/20">
                      {item.region}
                    </span>
                    <span className="bg-[#990000] text-white text-[10px] font-mono px-2 py-0.5 font-bold uppercase tracking-wider">
                      {item.category.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Name overlay */}
                  <div className="absolute bottom-2 left-3 right-3 text-white">
                    <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-red-300 transition-colors">
                      {getName(item)}
                    </h3>
                  </div>
                </div>

                {/* Content info */}
                <div className="p-4 space-y-3">
                  <p className="text-xs font-mono font-bold text-[#990000] line-clamp-1">
                    {getTitle(item)}
                  </p>
                  <p className="text-gray-600 text-xs line-clamp-3 leading-relaxed">
                    {getSummary(item)}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 pt-0 border-t border-gray-100 mt-2 flex items-center justify-between text-xs font-mono text-gray-500">
                <span className="truncate max-w-[180px]">{item.organization}</span>
                <span className="text-[#990000] font-bold group-hover:underline flex items-center gap-1 shrink-0">
                  {currentLang === 'ar' ? 'عرض السيرة/التفاصيل' : currentLang === 'zh' ? '查看详情' : currentLang === 'ckb' ? 'بینینی زانیاری' : 'View Details'}
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Profile Viewer */}
      <AnimatePresence>
        {activeProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-2 border-[#111111] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 rounded-xs shadow-2xl relative"
            >
              <button
                onClick={() => setActiveProfile(null)}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-[#990000] hover:text-white p-1.5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <img
                  src={activeProfile.imageUrl}
                  alt={getName(activeProfile)}
                  className="w-full sm:w-36 h-36 object-cover border-2 border-[#111111] shrink-0"
                />
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="bg-[#111111] text-white text-[10px] font-mono font-bold px-2 py-0.5">
                      {activeProfile.region}
                    </span>
                    <span className="bg-[#990000] text-white text-[10px] font-mono font-bold px-2 py-0.5">
                      {activeProfile.category.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-[#111111]">
                    {getName(activeProfile)}
                  </h3>

                  <p className="text-sm font-mono font-bold text-[#990000]">
                    {getTitle(activeProfile)}
                  </p>

                  <p className="text-xs font-mono text-gray-500">
                    🏛️ {activeProfile.organization}
                  </p>
                </div>
              </div>

              {/* Biography / Full Detail */}
              <div className="space-y-3 border-t border-b border-gray-200 py-4 text-sm text-gray-700 leading-relaxed">
                <h4 className="font-mono text-xs font-bold text-gray-900 uppercase tracking-wider">
                  {currentLang === 'ar' ? 'نبذة ومسيرة / الإطار السياساتي:' : currentLang === 'zh' ? '详细履历与成果背景:' : currentLang === 'ckb' ? 'پوختەی کار و چالاکی:' : 'Biography & Policy Background:'}
                </h4>
                <p className="whitespace-pre-line">{getBio(activeProfile)}</p>
              </div>

              {/* External link or document button */}
              {activeProfile.publicationUrl && (
                <div className="bg-[#F4F4F0] p-3 border border-gray-300 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <BookOpen className="w-4 h-4 text-[#990000]" />
                    <span className="font-bold">Official Document / Publication Link</span>
                  </div>
                  <a
                    href={activeProfile.publicationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 bg-[#111111] text-white hover:bg-[#990000] px-3 py-1 font-mono text-xs font-bold transition-colors"
                  >
                    <span>Open Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Form to submit inquiry / join delegation */}
              <div className="space-y-3 pt-2">
                <h4 className="font-serif text-base font-bold text-[#111111] flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-[#990000]" />
                  {currentLang === 'ar' ? 'انضم إلى شبكة قيادات المرأة الصينية العراقية' : currentLang === 'zh' ? '申请加入中伊女性领导力与政策合作网络' : currentLang === 'ckb' ? 'پەیوەندی بکە بە تۆڕی ئافرەتانی سەرکردە' : 'Join Sino-Iraqi Women Leadership Network'}
                </h4>

                {joinSent ? (
                  <div className="bg-emerald-50 border border-emerald-500 p-4 text-emerald-800 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Your application and profile inquiry has been transmitted to the Women Leadership Secretariat in Baghdad & Beijing.</span>
                  </div>
                ) : (
                  <form onSubmit={handleJoinSubmit} className="space-y-3 bg-[#F4F4F0] p-4 border border-gray-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={joinForm.name}
                        onChange={e => setJoinForm({ ...joinForm, name: e.target.value })}
                        className="bg-white border border-gray-300 p-2 text-xs font-mono focus:outline-none focus:border-[#990000]"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Official Email"
                        value={joinForm.email}
                        onChange={e => setJoinForm({ ...joinForm, email: e.target.value })}
                        className="bg-white border border-gray-300 p-2 text-xs font-mono focus:outline-none focus:border-[#990000]"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Organization / University / Ministry"
                      value={joinForm.organization}
                      onChange={e => setJoinForm({ ...joinForm, organization: e.target.value })}
                      className="w-full bg-white border border-gray-300 p-2 text-xs font-mono focus:outline-none focus:border-[#990000]"
                    />
                    <textarea
                      rows={2}
                      placeholder="Proposal or Collaboration Note..."
                      value={joinForm.message}
                      onChange={e => setJoinForm({ ...joinForm, message: e.target.value })}
                      className="w-full bg-white border border-gray-300 p-2 text-xs font-mono focus:outline-none focus:border-[#990000]"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#990000] hover:bg-[#7a0000] text-white py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
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
