import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { WomenProfile, Locale } from '../types';
import { 
  Users, Award, BookOpen, ShieldCheck, HeartHandshake,
  ChevronRight, X, Send, CheckCircle2, Sparkles, Globe2, ExternalLink,
  ArrowRight, FileText, Building2
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

  // Clean headline title to prevent any legacy prefix duplication or overlap
  const cleanTitleText = (text: string) => {
    if (!text) return '';
    return text
      .replace(/^Monograph:\s*/i, '')
      .replace(/^دراسة بحثية:\s*/, '')
      .replace(/^学术专著《?/, '')
      .replace(/》?$/, '')
      .replace(/^توێژینەوەی ئەکادیمی:\s*/, '')
      .trim();
  };

  const getName = (p: WomenProfile) => {
    let name = p.nameEn;
    if (currentLang === 'ar' && p.nameAr) name = p.nameAr;
    else if (currentLang === 'zh' && p.nameZh) name = p.nameZh;
    else if (currentLang === 'ckb' && p.nameCkb) name = p.nameCkb;
    return cleanTitleText(name);
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
  });

  // Teaser constraint: show max 4 featured/top cards to maintain compact homepage footprint
  const teaserProfiles = filteredProfiles.slice(0, 4);

  const getRegionBadge = (region: string) => {
    switch (region) {
      case 'CHINA':
        return { label: 'China 🇨🇳', labelAr: 'الصين 🇨🇳', labelZh: '中国 🇨🇳', labelCkb: 'چین 🇨🇳' };
      case 'IRAQ':
        return { label: 'Iraq 🇮🇶', labelAr: 'العراق 🇮🇶', labelZh: '伊拉克 🇮🇶', labelCkb: 'عێراق 🇮🇶' };
      case 'KURDISTAN':
        return { label: 'Kurdistan Region', labelAr: 'إقليم كردستان', labelZh: '库尔德斯坦', labelCkb: 'کوردستان' };
      case 'BILATERAL':
      default:
        return { label: 'Bilateral', labelAr: 'ثنائي صيني عراقي', labelZh: '中伊双边', labelCkb: 'دووقۆڵی' };
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'PROMINENT_FIGURE':
        return { 
          icon: <Users className="w-3 h-3" />,
          labelEn: 'Pioneer', labelAr: 'شخصية رائدة', labelZh: '杰出先锋', labelCkb: 'پێشەنگ' 
        };
      case 'POLICY_RIGHTS':
        return { 
          icon: <ShieldCheck className="w-3 h-3" />,
          labelEn: 'Rights & Policy', labelAr: 'حقوق وسياسات', labelZh: '权益与政策', labelCkb: 'یاسا و سیاسەت' 
        };
      case 'ACHIEVEMENTS':
        return { 
          icon: <Sparkles className="w-3 h-3" />,
          labelEn: 'Achievement', labelAr: 'إنجاز وابتكار', labelZh: '创新成果', labelCkb: 'دەستکەوت' 
        };
      case 'PUBLICATIONS':
      default:
        return { 
          icon: <BookOpen className="w-3 h-3" />,
          labelEn: 'Publication', labelAr: 'بحث أكاديمي', labelZh: '权威著作', labelCkb: 'توێژینەوە' 
        };
    }
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinSent(true);
    setTimeout(() => {
      setJoinSent(false);
      setActiveProfile(null);
      setJoinForm({ name: '', email: '', organization: '', message: '' });
    }, 2500);
  };

  // Safe image fallback helper
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, category: string) => {
    const target = e.currentTarget;
    if (category === 'PROMINENT_FIGURE') {
      target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200';
    } else if (category === 'PUBLICATIONS') {
      target.src = 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1200';
    } else {
      target.src = 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1200';
    }
  };

  return (
    <section className="w-full bg-paper-50 dark:bg-paper-900 border border-neutral-200 dark:border-neutral-800 shadow-xs p-4 sm:p-6 md:p-8 rounded-xs space-y-6 relative transition-colors duration-300">
      {/* Visual Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-brand-800 pb-5">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-brand-800 text-paper-50 text-xs font-bold uppercase tracking-wider rounded-xs">
              <Users className="w-3.5 h-3.5" />
              {currentLang === 'ar' ? 'منصة المرأة والتمكين' : currentLang === 'zh' ? '中伊女性领导力专区' : currentLang === 'ckb' ? 'دەروازەی مافی ئافرەتان' : 'WOMEN LEADERSHIP FORUM'}
            </span>
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Beijing • Baghdad • Erbil Joint Secretariat
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 dark:text-paper-50 tracking-tight">
            {currentLang === 'ar' 
              ? 'مساحة المرأة: الشخصيات المرموقة، السياسات، والإنجازات' 
              : currentLang === 'zh' 
              ? '女性专题：杰出人物、法治权益、创新成果与学术著作' 
              : currentLang === 'ckb' 
              ? 'بەشی تایبەت بە ئافرەتان: کەسایەتییەکان، یاسا و دەستکەوتەکان' 
              : 'Women Forum: Prominent Figures, Rights, Policy & Achievements'}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {currentLang === 'ar'
              ? 'مساحة مستقلة مخصصة لإبراز القامات النسائية في الصين والعراق وإقليم كردستان، وتعزيز الأطر القانونية لحقوق المرأة، ونشر الأبحاث الأكاديمية والسياسات الثنائية.'
              : currentLang === 'zh'
              ? '专为中伊及库尔德斯坦女性设立的交流展示平台，涵盖杰出女性代表、法治权益保障政策、科技创新成果与中伊交流学术著作。'
              : currentLang === 'ckb'
              ? 'تایبەت بە بەهێزکردنی ئافرەتان لە چین، عێراق و هەرێمی کوردستان لە بواری یاسا، سیاسەت، زانست و بڵاوکراوە ئەکادیمییەکان.'
              : 'Empowering prominent female pioneers, championing women legal rights & policy, showcasing trending achievements, and publishing bilateral academic papers connecting China, Iraq, and Kurdistan.'}
          </p>
        </div>

        {/* Portal Direct Link */}
        <Link
          to={`/${currentLang}/women`}
          className="self-start md:self-auto inline-flex items-center gap-2 bg-brand-800 hover:bg-brand-900 text-paper-50 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all shadow-xs shrink-0 rounded-xs group"
        >
          <span>
            {currentLang === 'ar' ? 'استكشف البوابة كاملة' : currentLang === 'zh' ? '进入完整女性门户' : currentLang === 'ckb' ? 'سەردانی تەواوی بەشەکە بکە' : 'Explore Full Women Portal'}
          </span>
          <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Dual Taxonomy Filter Bar: Clear Region vs. Focus Separation */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-paper-100 dark:bg-paper-800/60 p-3 border border-neutral-200 dark:border-neutral-700/80 rounded-xs">
        {/* Taxonomy 1: Region Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 px-1.5 flex items-center gap-1">
            <Globe2 className="w-3.5 h-3.5 text-ink-900 dark:text-paper-100" />
            {currentLang === 'ar' ? 'الإقليم:' : currentLang === 'zh' ? '地区:' : currentLang === 'ckb' ? 'هەرێم:' : 'Region:'}
          </span>
          {[
            { id: 'ALL', labelEn: 'All Regions', labelAr: 'الكل', labelZh: '全部地区', labelCkb: 'هەموو' },
            { id: 'CHINA', labelEn: 'China 🇨🇳', labelAr: 'الصين 🇨🇳', labelZh: '中国 🇨🇳', labelCkb: 'چین 🇨🇳' },
            { id: 'IRAQ', labelEn: 'Iraq 🇮🇶', labelAr: 'العراق 🇮🇶', labelZh: '伊拉克 🇮🇶', labelCkb: 'عێراق 🇮🇶' },
            { id: 'KURDISTAN', labelEn: 'Kurdistan', labelAr: 'كردستان', labelZh: '库尔德斯坦', labelCkb: 'کوردستان' },
            { id: 'BILATERAL', labelEn: 'Bilateral', labelAr: 'ثنائي', labelZh: '双边', labelCkb: 'دووقۆڵی' },
          ].map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-xs cursor-pointer ${
                selectedRegion === r.id
                  ? 'bg-ink-900 dark:bg-paper-50 text-paper-50 dark:text-ink-900 shadow-xs'
                  : 'bg-paper-50 dark:bg-paper-800 text-neutral-600 dark:text-neutral-300 hover:text-ink-900 dark:hover:text-paper-50 border border-neutral-200 dark:border-neutral-700'
              }`}
            >
              {currentLang === 'ar' ? r.labelAr : currentLang === 'zh' ? r.labelZh : currentLang === 'ckb' ? r.labelCkb : r.labelEn}
            </button>
          ))}
        </div>

        {/* Taxonomy 2: Focus / Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 border-t lg:border-t-0 lg:border-s border-neutral-200 dark:border-neutral-700 pt-2 lg:pt-0 lg:ps-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-800 dark:text-brand-400 px-1.5 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {currentLang === 'ar' ? 'المحور:' : currentLang === 'zh' ? '分类:' : currentLang === 'ckb' ? 'تەوەر:' : 'Focus:'}
          </span>
          {[
            { id: 'ALL', labelEn: 'All Focus', labelAr: 'كل المحاور', labelZh: '全部分类', labelCkb: 'هەموو' },
            { id: 'PROMINENT_FIGURE', labelEn: 'Pioneers', labelAr: 'شخصيات بارزة', labelZh: '杰出先锋', labelCkb: 'پێشەنگ' },
            { id: 'POLICY_RIGHTS', labelEn: 'Rights & Policy', labelAr: 'الحقوق والسياسات', labelZh: '权益政策', labelCkb: 'یاسا و سیاسەت' },
            { id: 'ACHIEVEMENTS', labelEn: 'Achievements', labelAr: 'إنجازات وابتكارات', labelZh: '科技成果', labelCkb: 'دەستکەوت' },
            { id: 'PUBLICATIONS', labelEn: 'Publications', labelAr: 'دراسات وأبحاث', labelZh: '学术著作', labelCkb: 'توێژینەوە' },
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-xs cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-brand-800 text-paper-50 shadow-xs'
                  : 'bg-paper-50 dark:bg-paper-800 text-neutral-600 dark:text-neutral-300 hover:text-brand-800 dark:hover:text-paper-50 border border-neutral-200 dark:border-neutral-700'
              }`}
            >
              {currentLang === 'ar' ? c.labelAr : currentLang === 'zh' ? c.labelZh : currentLang === 'ckb' ? c.labelCkb : c.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Tight 4-Card Showcase */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-80 bg-neutral-100 dark:bg-neutral-800 animate-pulse border border-neutral-200 dark:border-neutral-700 rounded-xs" />
          ))}
        </div>
      ) : teaserProfiles.length === 0 ? (
        <div className="text-center py-12 bg-paper-100 dark:bg-paper-800 border border-dashed border-neutral-300 dark:border-neutral-700 p-6 space-y-2 rounded-xs">
          <p className="text-neutral-600 dark:text-neutral-300 text-sm font-medium">
            {currentLang === 'ar' ? 'لا توجد سجلات مطابقة حالياً' : currentLang === 'zh' ? '暂无匹配的记录' : currentLang === 'ckb' ? 'هیچ تۆمارێک نەدۆزرایەوە' : 'No matching records found'}
          </p>
          <button
            onClick={() => { setSelectedRegion('ALL'); setSelectedCategory('ALL'); }}
            className="text-brand-800 dark:text-brand-400 text-xs font-bold uppercase tracking-wider underline cursor-pointer"
          >
            {currentLang === 'ar' ? 'إعادة ضبط التصفية' : currentLang === 'zh' ? '重置筛选条件' : currentLang === 'ckb' ? 'پاكکردنەوەی فلتەر' : 'Reset Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {teaserProfiles.map((item) => {
              const regionInfo = getRegionBadge(item.region);
              const catInfo = getCategoryBadge(item.category);
              const currentRegionLabel = currentLang === 'ar' ? regionInfo.labelAr : currentLang === 'zh' ? regionInfo.labelZh : currentLang === 'ckb' ? regionInfo.labelCkb : regionInfo.label;
              const currentCatLabel = currentLang === 'ar' ? catInfo.labelAr : currentLang === 'zh' ? catInfo.labelZh : currentLang === 'ckb' ? catInfo.labelCkb : catInfo.labelEn;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setActiveProfile(item)}
                  className="group bg-paper-50 dark:bg-paper-900 border border-neutral-200 dark:border-neutral-800 hover:border-brand-800 dark:hover:border-brand-500 hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer rounded-xs overflow-hidden text-start"
                >
                  <div>
                    {/* Image Container: Clean aspect ratio with differentiated taxonomy badges */}
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-neutral-900">
                      <img
                        src={item.imageUrl}
                        alt={getName(item)}
                        onError={(e) => handleImageError(e, item.category)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Visually Differentiated Taxonomy Badges */}
                      <div className="absolute top-2.5 start-2.5 end-2.5 flex items-center justify-between gap-1.5 z-10 pointer-events-none">
                        {/* Taxonomy 1: Region Badge (Dark Ink / Neutral) */}
                        <span className="bg-ink-900/90 backdrop-blur-xs text-paper-50 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs border border-neutral-700/60 flex items-center gap-1 shrink-0">
                          {currentRegionLabel}
                        </span>

                        {/* Taxonomy 2: Focus Badge (Brand Red Accent) */}
                        <span className="bg-brand-800 text-paper-50 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs border border-brand-700 flex items-center gap-1 shrink-0">
                          {catInfo.icon}
                          <span>{currentCatLabel}</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content: Title & Text Cleanly Separated from Image (NO Overlapping Bugs) */}
                    <div className="p-3.5 sm:p-4 space-y-2">
                      <h3 className="text-sm sm:text-base font-bold text-ink-900 dark:text-paper-50 group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors leading-snug line-clamp-2">
                        {getName(item)}
                      </h3>

                      <p className="text-[11px] font-bold tracking-wide text-brand-800 dark:text-brand-400 uppercase line-clamp-1">
                        {getTitle(item)}
                      </p>

                      <p className="text-neutral-600 dark:text-neutral-300 text-xs line-clamp-3 leading-relaxed">
                        {getSummary(item)}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Metadata & Action CTA */}
                  <div className="p-3.5 sm:p-4 pt-2 border-t border-neutral-100 dark:border-neutral-800 mt-1 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="truncate max-w-[140px] text-[11px] font-medium">
                      {item.organization}
                    </span>
                    <span className="text-brand-800 dark:text-brand-400 text-xs font-bold flex items-center gap-1 shrink-0 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                      <span>{currentLang === 'ar' ? 'التفاصيل' : currentLang === 'zh' ? '查看详情' : currentLang === 'ckb' ? 'زانیاری' : 'Details'}</span>
                      <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Modal Profile Viewer */}
      <AnimatePresence>
        {activeProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-paper-50 dark:bg-paper-900 border-2 border-brand-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-7 space-y-5 rounded-xs shadow-2xl relative text-start"
            >
              <button
                onClick={() => setActiveProfile(null)}
                className="absolute top-4 end-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-brand-800 hover:text-paper-50 p-1.5 rounded-xs transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
                <img
                  src={activeProfile.imageUrl}
                  alt={getName(activeProfile)}
                  onError={(e) => handleImageError(e, activeProfile.category)}
                  className="w-full sm:w-36 h-36 object-cover border-2 border-brand-800 rounded-xs shrink-0 shadow-xs"
                />
                <div className="space-y-1.5 flex-1 pe-6 sm:pe-0">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="bg-ink-900 dark:bg-paper-800 text-paper-50 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs border border-neutral-700/60 shadow-xs">
                      {activeProfile.region}
                    </span>
                    <span className="bg-brand-800 text-paper-50 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs border border-brand-700">
                      {activeProfile.category.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-ink-900 dark:text-paper-50 tracking-tight leading-snug">
                    {getName(activeProfile)}
                  </h3>

                  <p className="text-xs sm:text-sm font-bold text-brand-800 dark:text-brand-400 uppercase tracking-wide">
                    {getTitle(activeProfile)}
                  </p>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{activeProfile.organization}</span>
                  </p>
                </div>
              </div>

              {/* Biography / Full Detail */}
              <div className="space-y-2.5 border-t border-b border-neutral-200 dark:border-neutral-800 py-4 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <h4 className="text-xs font-bold text-ink-900 dark:text-paper-100 uppercase tracking-wider">
                  {currentLang === 'ar' ? 'نبذة ومسيرة / الإطار السياساتي:' : currentLang === 'zh' ? '详细履历与成果背景:' : currentLang === 'ckb' ? 'پوختەی کار و چالاکی:' : 'Biography & Policy Background:'}
                </h4>
                <p className="whitespace-pre-line leading-relaxed">{getBio(activeProfile)}</p>
              </div>

              {/* External link or document button */}
              {activeProfile.publicationUrl && (
                <div className="bg-paper-100 dark:bg-paper-800/80 p-3 border border-neutral-200 dark:border-neutral-700 rounded-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <BookOpen className="w-4 h-4 text-brand-800 dark:text-brand-400 shrink-0" />
                    <span className="font-bold text-ink-900 dark:text-paper-200 truncate">
                      {activeProfile.category === 'PUBLICATIONS' ? 'Access Complete Research Monograph' : 'Official Initiative Document Link'}
                    </span>
                  </div>
                  <a
                    href={activeProfile.publicationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-brand-800 hover:bg-brand-900 text-paper-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-xs shrink-0"
                  >
                    <span>Open</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Form to submit inquiry / join delegation */}
              <div className="space-y-3 pt-1">
                <h4 className="text-sm font-bold text-ink-900 dark:text-paper-50 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-brand-800 dark:text-brand-400" />
                  {currentLang === 'ar' ? 'انضم إلى شبكة قيادات المرأة الصينية العراقية' : currentLang === 'zh' ? '申请加入中伊女性领导力与政策合作网络' : currentLang === 'ckb' ? 'پەیوەندی بکە بە تۆڕی ئافرەتانی سەرکردە' : 'Join Sino-Iraqi Women Leadership Network'}
                </h4>

                {joinSent ? (
                  <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500 p-3 text-emerald-800 dark:text-emerald-300 text-xs rounded-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Your application and profile inquiry has been transmitted to the Women Leadership Secretariat in Baghdad & Beijing.</span>
                  </div>
                ) : (
                  <form onSubmit={handleJoinSubmit} className="space-y-2.5 bg-paper-100 dark:bg-paper-800/60 p-3.5 border border-neutral-200 dark:border-neutral-700/80 rounded-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={joinForm.name}
                        onChange={e => setJoinForm({ ...joinForm, name: e.target.value })}
                        className="bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:outline-none focus:border-brand-800"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Official Email"
                        value={joinForm.email}
                        onChange={e => setJoinForm({ ...joinForm, email: e.target.value })}
                        className="bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:outline-none focus:border-brand-800"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Organization / University / Ministry"
                      value={joinForm.organization}
                      onChange={e => setJoinForm({ ...joinForm, organization: e.target.value })}
                      className="w-full bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:outline-none focus:border-brand-800"
                    />
                    <textarea
                      rows={2}
                      placeholder="Proposal or Collaboration Note..."
                      value={joinForm.message}
                      onChange={e => setJoinForm({ ...joinForm, message: e.target.value })}
                      className="w-full bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:outline-none focus:border-brand-800"
                    />
                    <button
                      type="submit"
                      className="w-full bg-brand-800 hover:bg-brand-900 text-paper-50 py-2 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
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
