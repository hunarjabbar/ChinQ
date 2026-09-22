import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { WomenProfile, Locale } from '../types';
import { 
  Users, Award, BookOpen, Search, Filter, Globe2, Sparkles, 
  ExternalLink, ChevronRight, X, Send, CheckCircle2, RefreshCw, FileText,
  ShieldCheck, ArrowLeft, Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function WomenPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const currentLang = lang as Locale;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeProfile, setActiveProfile] = useState<WomenProfile | null>(null);
  
  const [submissionFormOpen, setSubmissionFormOpen] = useState(false);
  const [submissionSent, setSubmissionSent] = useState(false);
  const [submission, setSubmission] = useState({
    name: '',
    email: '',
    organization: '',
    title: '',
    category: 'POLICY_RIGHTS',
    abstract: ''
  });

  // Fetch profiles from API
  const { data: profiles = [], isLoading, refetch } = useQuery<WomenProfile[]>({
    queryKey: ['women-profiles-page', selectedRegion, selectedCategory, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedRegion !== 'ALL') params.append('region', selectedRegion);
      if (selectedCategory !== 'ALL') params.append('category', selectedCategory);
      if (searchQuery.trim()) params.append('q', searchQuery.trim());

      const res = await fetch(`/api/women?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to load women leadership database');
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

  const handleSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/public/telexes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: submission.name,
          email: submission.email,
          company: submission.organization,
          bureau: submission.category,
          message: `Title: ${submission.title}\n\nAbstract: ${submission.abstract}`
        })
      });
      setSubmissionSent(true);
      setTimeout(() => {
        setSubmissionSent(false);
        setSubmissionFormOpen(false);
        setSubmission({ name: '', email: '', organization: '', title: '', category: 'POLICY_RIGHTS', abstract: '' });
      }, 2500);
    } catch (e) {
      console.error(e);
    }
  };

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
    <div className="w-full bg-paper-50 dark:bg-paper-900 border-x border-neutral-200 dark:border-neutral-800 shadow-xs p-4 sm:p-6 md:p-8 space-y-8 transition-colors duration-300">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
        <Link to={`/${currentLang}`} className="hover:text-brand-800 dark:hover:text-brand-400 flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
          <span>{currentLang === 'ar' ? 'الرئيسية' : currentLang === 'zh' ? '首页' : currentLang === 'ckb' ? 'سەرەکی' : 'Home'}</span>
        </Link>
        <span>/</span>
        <span className="text-ink-900 dark:text-paper-100 font-bold">
          {currentLang === 'ar' ? 'بوابة المرأة والسياسات' : currentLang === 'zh' ? '女性与政策门户' : currentLang === 'ckb' ? 'دەروازەی ئافرەتان' : 'Women & Policy Portal'}
        </span>
      </div>

      {/* Page Hero Header */}
      <div className="bg-paper-100 dark:bg-paper-800/80 border-2 border-brand-800 p-6 sm:p-8 rounded-xs shadow-xs space-y-4 relative overflow-hidden text-start">
        <div className="absolute end-0 top-0 bottom-0 w-1/3 bg-brand-800/5 pointer-events-none" />

        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-brand-800 text-paper-50 text-xs font-bold px-2.5 py-1 tracking-wider uppercase flex items-center gap-1.5 rounded-xs">
            <Users className="w-4 h-4" />
            {currentLang === 'ar' ? 'بوابة المرأة والسياسات' : currentLang === 'zh' ? '中伊库女性与政策专区' : currentLang === 'ckb' ? 'دەروازەی مافی ئافرەتان' : 'Women & Policy Sovereign Portal'}
          </span>
          <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium">
            Beijing • Baghdad • Erbil Joint Forum
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold text-ink-900 dark:text-paper-50 leading-tight">
          {currentLang === 'ar'
            ? 'منصة تمكين المرأة: الشخصيات المرموقة، التشريعات، والإنجازات'
            : currentLang === 'zh'
            ? '女性与政策门户：杰出人物、法治权益、科技成果与双边合作'
            : currentLang === 'ckb'
            ? 'بوابة ئافرەتان: کەسایەتییەکانی، ماف و یاسا، دەستکەوتە زانستییەکان'
            : 'Women, Policy & Heritage Portal: Pioneers, Legal Rights & Research'}
        </h1>

        <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          {currentLang === 'ar'
            ? 'مساحة متخصصة مكرسة لدعم الشخصيات النسائية البارزة في الصين والعراق وإقليم كردستان، وتعزيز حقوق المرأة والترافع القانوني والسياسات العامة والأبحاث الأكاديمية المشتركة.'
            : currentLang === 'zh'
            ? '汇聚中国、伊拉克与库尔德斯坦各界优秀女性代表，集中展示女性权益保障政策、科学技术创新峰会以及中伊双边人文与法律研究成果。'
            : currentLang === 'ckb'
            ? 'پێگەیەکی تایبەت بۆ بەهێزکردنی ئافرەتان لە چین، عێراق و هەرێمی کوردستان لە بوارەکانی یاسا، زانست و پڕۆژە سەرکەوتووەکان.'
            : 'Dedicated platform fostering Sino-Iraqi-Kurdish women leadership, advocating female legal rights & economic participation, and spotlighting academic monographs and tech summits.'}
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => setSubmissionFormOpen(true)}
            className="bg-brand-800 hover:bg-brand-900 text-paper-50 px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shadow-xs cursor-pointer rounded-xs"
          >
            <Send className="w-4 h-4" />
            <span>
              {currentLang === 'ar' ? 'تقديم بحث أو ترشيح قيادية' : currentLang === 'zh' ? '提交政策论文或人物推荐' : currentLang === 'ckb' ? 'پێشکەشکردنی توێژینەوە' : 'Submit Monograph or Nomination'}
            </span>
          </button>

          <button
            onClick={() => refetch()}
            className="bg-paper-50 dark:bg-paper-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-ink-900 dark:text-paper-100 border border-brand-800 dark:border-neutral-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer rounded-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh Database</span>
          </button>
        </div>
      </div>

      {/* Search & Quadrilingual Filter Control Bar */}
      <div className="space-y-3 bg-paper-100 dark:bg-paper-800/60 p-4 border border-neutral-200 dark:border-neutral-700/80 rounded-xs">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder={
              currentLang === 'ar'
                ? 'ابحث بالاسم، المنظمة، التشريع، أو المنشور...'
                : currentLang === 'zh'
                ? '搜索人物姓名、机构、法律条款或专著...'
                : currentLang === 'ckb'
                ? 'گەڕان بەپێی ناو، ڕێکخراو، یاسا یان توێژینەوە...'
                : 'Search by name, organization, legal framework, or monograph...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ps-9 pe-4 py-2.5 bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:outline-none focus:border-brand-800 transition-colors"
          />
        </div>

        {/* Filter Rows */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2 border-t border-neutral-200 dark:border-neutral-700">
          {/* Taxonomy 1: Region Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 px-1 flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5 text-ink-900 dark:text-paper-100" />
              {currentLang === 'ar' ? 'الإقليم:' : currentLang === 'zh' ? '地区:' : currentLang === 'ckb' ? 'هەرێم:' : 'Region:'}
            </span>
            {[
              { id: 'ALL', labelEn: 'All Regions', labelAr: 'الكل', labelZh: '全部地区', labelCkb: 'هەموو' },
              { id: 'CHINA', labelEn: 'China 🇨🇳', labelAr: 'الصين 🇨🇳', labelZh: '中国 🇨🇳', labelCkb: 'چین 🇨🇳' },
              { id: 'IRAQ', labelEn: 'Iraq 🇮🇶', labelAr: 'العراق 🇮🇶', labelZh: '伊拉克 🇮🇶', labelCkb: 'عێراق 🇮🇶' },
              { id: 'KURDISTAN', labelEn: 'Kurdistan', labelAr: 'كردستان', labelZh: '库尔德斯坦', labelCkb: 'کوردستان' },
              { id: 'BILATERAL', labelEn: 'Bilateral', labelAr: 'ثنائي', labelZh: '双边', labelCkb: 'دووقۆڵی' },
            ].map((r) => (
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
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-800 dark:text-brand-400 px-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {currentLang === 'ar' ? 'المحور:' : currentLang === 'zh' ? '分类:' : currentLang === 'ckb' ? 'تەوەر:' : 'Focus:'}
            </span>
            {[
              { id: 'ALL', labelEn: 'All Focus', labelAr: 'كل المحاور', labelZh: '全部分类', labelCkb: 'هەموو' },
              { id: 'PROMINENT_FIGURE', labelEn: 'Pioneers', labelAr: 'شخصيات بارزة', labelZh: '杰出先锋', labelCkb: 'پێشەنگ' },
              { id: 'POLICY_RIGHTS', labelEn: 'Rights & Policy', labelAr: 'الحقوق والسياسات', labelZh: '权益政策', labelCkb: 'یاسا و سیاسەت' },
              { id: 'ACHIEVEMENTS', labelEn: 'Achievements', labelAr: 'إنجازات وابتكارات', labelZh: '科技成果', labelCkb: 'دەستکەوت' },
              { id: 'PUBLICATIONS', labelEn: 'Publications', labelAr: 'دراسات وأبحاث', labelZh: '学术著作', labelCkb: 'توێژینەوە' },
            ].map((c) => (
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
      </div>

      {/* Main Content Grid */}
      {isLoading ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 min-w-0">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 bg-neutral-100 dark:bg-neutral-800 animate-pulse border border-neutral-200 dark:border-neutral-700 rounded-xs" />
          ))}
        </div>
      ) : profiles.length === 0 ? (
        <div className="bg-paper-100 dark:bg-paper-800 border-2 border-brand-800 p-12 text-center space-y-4 rounded-xs">
          <p className="text-xl text-ink-900 dark:text-paper-50 font-bold">
            {currentLang === 'ar' ? 'لم نتمكن من العثور على سجلات مطابقة' : currentLang === 'zh' ? '未找到符合条件的记录' : currentLang === 'ckb' ? 'هیچ زانیارییەک نەدۆزرایەوە' : 'No matching records found'}
          </p>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs">
            Try adjusting your search query or reset filters to display all leadership records.
          </p>
          <button
            onClick={() => { setSelectedRegion('ALL'); setSelectedCategory('ALL'); setSearchQuery(''); }}
            className="inline-block bg-brand-800 text-paper-50 px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-brand-900 transition-colors rounded-xs cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 min-w-0">
          <AnimatePresence mode="popLayout">
            {profiles.map((p) => {
              const regionInfo = getRegionBadge(p.region);
              const catInfo = getCategoryBadge(p.category);
              const currentRegionLabel = currentLang === 'ar' ? regionInfo.labelAr : currentLang === 'zh' ? regionInfo.labelZh : currentLang === 'ckb' ? regionInfo.labelCkb : regionInfo.label;
              const currentCatLabel = currentLang === 'ar' ? catInfo.labelAr : currentLang === 'zh' ? catInfo.labelZh : currentLang === 'ckb' ? catInfo.labelCkb : catInfo.labelEn;

              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setActiveProfile(p)}
                  className="group bg-paper-50 dark:bg-paper-900 border border-neutral-200 dark:border-neutral-800 hover:border-brand-800 dark:hover:border-brand-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer rounded-xs overflow-hidden text-start"
                >
                  <div>
                    {/* Image Container: Clean aspect ratio with differentiated taxonomy badges */}
                    <div className="relative h-48 sm:h-52 w-full bg-neutral-900 overflow-hidden">
                      <img
                        src={p.imageUrl}
                        alt={getName(p)}
                        onError={(e) => handleImageError(e, p.category)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Visually Differentiated Taxonomy Badges */}
                      <div className="absolute top-3 start-3 end-3 flex items-center justify-between gap-1.5 z-10 pointer-events-none">
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
                    <div className="p-4 sm:p-5 space-y-2.5">
                      <h3 className="text-base sm:text-lg font-bold text-ink-900 dark:text-paper-50 group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors leading-snug line-clamp-2">
                        {getName(p)}
                      </h3>

                      <p className="text-xs font-bold uppercase tracking-wide text-brand-800 dark:text-brand-400 line-clamp-1">
                        {getTitle(p)}
                      </p>

                      <p className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                        {getSummary(p)}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Bar */}
                  <div className="p-4 pt-2 border-t border-neutral-100 dark:border-neutral-800 mt-2 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="truncate max-w-[180px] font-medium text-xs">
                      {p.organization}
                    </span>
                    <span className="text-brand-800 dark:text-brand-400 font-bold group-hover:underline flex items-center gap-1 shrink-0 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                      <span>{currentLang === 'ar' ? 'عرض التفاصيل' : currentLang === 'zh' ? '查看详情' : currentLang === 'ckb' ? 'بینینی زانیاری' : 'View Details'}</span>
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
              className="bg-paper-50 dark:bg-paper-900 border-2 border-brand-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 rounded-xs shadow-2xl relative text-start"
            >
              <button
                onClick={() => setActiveProfile(null)}
                className="absolute top-4 end-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-brand-800 hover:text-paper-50 p-1.5 transition-colors rounded-xs cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <img
                  src={activeProfile.imageUrl}
                  alt={getName(activeProfile)}
                  onError={(e) => handleImageError(e, activeProfile.category)}
                  className="w-full sm:w-40 h-40 object-cover border-2 border-brand-800 shrink-0 rounded-xs shadow-xs"
                />
                <div className="space-y-2 flex-1 pe-6 sm:pe-0">
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

              {/* Biography / Full Text */}
              <div className="space-y-3 border-t border-b border-neutral-200 dark:border-neutral-800 py-4 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <h4 className="text-xs font-bold text-ink-900 dark:text-paper-100 uppercase tracking-wider">
                  {currentLang === 'ar' ? 'نبذة ومسيرة / الإطار السياساتي:' : currentLang === 'zh' ? '详细履历与成果背景:' : currentLang === 'ckb' ? 'پوختەی کار و چالاکی:' : 'Full Background & Executive Summary:'}
                </h4>
                <p className="whitespace-pre-line leading-relaxed">{getBio(activeProfile)}</p>
              </div>

              {/* External Publication Link */}
              {activeProfile.publicationUrl && (
                <div className="bg-paper-100 dark:bg-paper-800/80 p-3.5 border border-neutral-200 dark:border-neutral-700 rounded-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <BookOpen className="w-4 h-4 text-brand-800 dark:text-brand-400 shrink-0" />
                    <span className="font-bold text-ink-900 dark:text-paper-200 truncate">
                      {activeProfile.category === 'PUBLICATIONS' ? 'Official Document / Monograph Download' : 'Official Document & Legal Text'}
                    </span>
                  </div>
                  <a
                    href={activeProfile.publicationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-brand-800 text-paper-50 hover:bg-brand-900 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors rounded-xs shadow-xs shrink-0"
                  >
                    <span>Access Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Nomination & Monograph Submission Form */}
      <AnimatePresence>
        {submissionFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-paper-50 dark:bg-paper-900 border-2 border-brand-800 max-w-lg w-full p-6 space-y-4 rounded-xs shadow-2xl relative text-start"
            >
              <button
                onClick={() => setSubmissionFormOpen(false)}
                className="absolute top-4 end-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-brand-800 hover:text-paper-50 p-1.5 transition-colors rounded-xs cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 pe-6">
                <h3 className="text-lg sm:text-xl font-bold text-ink-900 dark:text-paper-50">
                  {currentLang === 'ar' ? 'تقديم بحث أو ترشيح قيادية' : currentLang === 'zh' ? '提交专著或女性领袖提名' : currentLang === 'ckb' ? 'پێشکەشکردنی توێژینەوە' : 'Submit Monograph or Female Leadership Nomination'}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {currentLang === 'ar' ? 'أرسل الأوراق البحثية، أو المذكرات السياساتية للأمانة المشتركة للمرأة.' : currentLang === 'zh' ? '提交政策研究报告或双边杰出女性代表提名材料。' : currentLang === 'ckb' ? 'توێژینەوە و پێشنیارەکانت بنێرە بۆ دەستەی سەرپەرشتیاری ئافرەتان.' : 'Submit research papers, policy briefs, or feature nominations for the China-Iraq-Kurdistan Women Secretariat.'}
                </p>
              </div>

              {submissionSent ? (
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500 p-4 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 rounded-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Submission received and logged with the Women Academic Board. Thank you!</span>
                </div>
              ) : (
                <form onSubmit={handleSubmission} className="space-y-3 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={submission.name}
                      onChange={(e) => setSubmission({ ...submission, name: e.target.value })}
                      className="bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:outline-none focus:border-brand-800"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Official Email *"
                      value={submission.email}
                      onChange={(e) => setSubmission({ ...submission, email: e.target.value })}
                      className="bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:outline-none focus:border-brand-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Institution / Organization *"
                      value={submission.organization}
                      onChange={(e) => setSubmission({ ...submission, organization: e.target.value })}
                      className="bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:outline-none focus:border-brand-800"
                    />
                    <select
                      value={submission.category}
                      onChange={(e) => setSubmission({ ...submission, category: e.target.value })}
                      className="bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:outline-none focus:border-brand-800"
                    >
                      <option value="PROMINENT_FIGURE">Pioneer Nomination</option>
                      <option value="POLICY_RIGHTS">Policy & Legal Rights</option>
                      <option value="ACHIEVEMENTS">Achievement & Innovation</option>
                      <option value="PUBLICATIONS">Research Publication</option>
                    </select>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Nominee Name or Monograph Title *"
                    value={submission.title}
                    onChange={(e) => setSubmission({ ...submission, title: e.target.value })}
                    className="w-full bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:outline-none focus:border-brand-800"
                  />

                  <textarea
                    rows={3}
                    required
                    placeholder="Abstract, Monograph Summary, or Executive Biography..."
                    value={submission.abstract}
                    onChange={(e) => setSubmission({ ...submission, abstract: e.target.value })}
                    className="w-full bg-paper-50 dark:bg-paper-900 border border-neutral-300 dark:border-neutral-700 p-2 text-xs text-ink-900 dark:text-paper-100 rounded-xs focus:outline-none focus:border-brand-800"
                  />

                  <button
                    type="submit"
                    className="w-full bg-brand-800 hover:bg-brand-900 text-paper-50 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit to Academic Board</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
