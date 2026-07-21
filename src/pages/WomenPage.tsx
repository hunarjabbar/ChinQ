import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { WomenProfile, Locale } from '../types';
import { 
  Users, Award, BookOpen, Search, Filter, Globe2, Sparkles, 
  ExternalLink, ChevronRight, X, Send, CheckCircle2, RefreshCw, FileText
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

  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionSent(true);
    setTimeout(() => {
      setSubmissionSent(false);
      setSubmissionFormOpen(false);
      setSubmission({ name: '', email: '', organization: '', title: '', category: 'POLICY_RIGHTS', abstract: '' });
    }, 2500);
  };

  return (
    <div className="w-full max-w-[1024px] mx-auto px-2 py-8 space-y-10">
      {/* Page Hero Header */}
      <div className="bg-white border-2 border-[#111111] p-6 sm:p-10 rounded-xs shadow-md space-y-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#990000]/5 pointer-events-none" />

        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-[#990000] text-white font-mono text-xs font-bold px-2.5 py-1 tracking-wider uppercase flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            {currentLang === 'ar' ? 'بوابة المرأة والسياسات' : currentLang === 'zh' ? '中伊库女性与政策专区' : currentLang === 'ckb' ? 'دەروازەی مافی ئافرەتان' : 'Women & Policy Sovereign Portal'}
          </span>
          <span className="text-gray-500 font-mono text-xs">
            Beijing • Baghdad • Erbil Joint Forum
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#111111] leading-tight">
          {currentLang === 'ar'
            ? 'منصة تمكين المرأة: الشخصيات المرموقة، التشريعات، والإنجازات'
            : currentLang === 'zh'
            ? '女性与政策门户：杰出人物、法治权益、科技成果与双边合作'
            : currentLang === 'ckb'
            ? 'بوابة ئافرەتان: کەسایەتییەکانی، ماف و یاسا، دەستکەوتە زانستییەکان'
            : 'Women, Policy & Heritage Portal: Pioneers, Legal Rights & Research'}
        </h1>

        <p className="text-gray-700 text-sm sm:text-base max-w-3xl leading-relaxed">
          {currentLang === 'ar'
            ? 'مساحة متخصصة مكرسة لدعم الشخصيات النسائية البارزة في الصين والعراق وإقليم كردستان، وتعزيز حقوق المرأة والترافع القانوني والسياسات العامة والأبحاث الأكاديمية.'
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
            className="bg-[#990000] hover:bg-[#7a0000] text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shadow-xs"
          >
            <Send className="w-4 h-4" />
            <span>
              {currentLang === 'ar' ? 'تقديم بحث أو ترشيح قيادية' : currentLang === 'zh' ? '提交政策论文或人物推荐' : currentLang === 'ckb' ? 'پێشکەشکردنی توێژینەوە' : 'Submit Monograph or Nomination'}
            </span>
          </button>

          <button
            onClick={() => refetch()}
            className="bg-white hover:bg-gray-100 text-[#111111] border border-[#111111] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Portal Data</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border-2 border-[#111111] p-4 sm:p-6 rounded-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={
                currentLang === 'ar'
                  ? 'ابحث باسم الشخصية، السياسة، أو اسم المؤسسة...'
                  : currentLang === 'zh'
                  ? '搜索姓名、政策框架、学术论文或机构名称...'
                  : currentLang === 'ckb'
                  ? 'گەڕان بۆ کەسایەتی، یاسا یان بڵاوکراوەکان...'
                  : 'Search by figure name, policy, publication, or organization...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#F4F4F0] border border-gray-300 text-xs font-mono text-[#111111] focus:outline-none focus:border-[#990000]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Stats Counter */}
          <div className="flex items-center gap-2 bg-[#F4F4F0] px-3 py-2 border border-gray-200 text-xs font-mono shrink-0">
            <span className="font-bold text-[#990000]">{profiles.length}</span>
            <span className="text-gray-600">
              {currentLang === 'ar' ? 'سجلات متاحة' : currentLang === 'zh' ? '条专题记录' : currentLang === 'ckb' ? 'تۆماری ئامادەکراو' : 'records available'}
            </span>
          </div>
        </div>

        {/* Region & Category Filter Chips */}
        <div className="space-y-3 pt-2 border-t border-gray-200">
          {/* Region selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-gray-500 uppercase w-20 flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5" /> Region:
            </span>
            {[
              { id: 'ALL', labelEn: 'All Regions', labelAr: 'جميع الأقاليم', labelZh: '全部地区', labelCkb: 'هەموو جۆرەکان' },
              { id: 'CHINA', labelEn: 'China 🇨🇳', labelAr: 'الصين 🇨🇳', labelZh: '中国 🇨🇳', labelCkb: 'چین 🇨🇳' },
              { id: 'IRAQ', labelEn: 'Iraq 🇮🇶', labelAr: 'العراق 🇮🇶', labelZh: '伊拉克 🇮🇶', labelCkb: 'عێراق 🇮🇶' },
              { id: 'KURDISTAN', labelEn: 'Kurdistan Region', labelAr: 'إقليم كردستان', labelZh: '库尔德斯坦', labelCkb: 'هەرێمی کوردستان' },
              { id: 'BILATERAL', labelEn: 'Bilateral Sino-Iraqi', labelAr: 'ثنائي صيني عراقي', labelZh: '中伊双边', labelCkb: 'دووقۆڵی' },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`px-3 py-1 text-xs font-mono transition-colors ${
                  selectedRegion === r.id
                    ? 'bg-[#111111] text-white font-bold'
                    : 'bg-[#F4F4F0] text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                {currentLang === 'ar' ? r.labelAr : currentLang === 'zh' ? r.labelZh : currentLang === 'ckb' ? r.labelCkb : r.labelEn}
              </button>
            ))}
          </div>

          {/* Category selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-gray-500 uppercase w-20 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Focus:
            </span>
            {[
              { id: 'ALL', labelEn: 'All Categories', labelAr: 'جميع المحاور', labelZh: '全部分类', labelCkb: 'هەموو' },
              { id: 'PROMINENT_FIGURE', labelEn: 'Prominent Figures', labelAr: 'شخصيات نسائية بارزة', labelZh: '杰出人物', labelCkb: 'کەسایەتییەکان' },
              { id: 'POLICY_RIGHTS', labelEn: 'Legal Rights & Policy', labelAr: 'الحقوق والسياسات', labelZh: '法治权益与政策', labelCkb: 'یاسا و ماف' },
              { id: 'ACHIEVEMENTS', labelEn: 'Trending Achievements', labelAr: 'إنجازات وقمم', labelZh: '盛会与创新成果', labelCkb: 'دەستکەوتەکان' },
              { id: 'PUBLICATIONS', labelEn: 'Research Publications', labelAr: 'أبحاث ودراسات', labelZh: '学术著作', labelCkb: 'توێژینەوەکان' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1 text-xs font-mono transition-colors ${
                  selectedCategory === c.id
                    ? 'bg-[#990000] text-white font-bold'
                    : 'bg-[#F4F4F0] text-gray-700 hover:bg-gray-200 border border-gray-300'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-72 bg-gray-200 animate-pulse border border-gray-300 rounded-xs" />
          ))}
        </div>
      ) : profiles.length === 0 ? (
        <div className="bg-white border-2 border-[#111111] p-12 text-center space-y-4">
          <p className="font-serif text-xl text-gray-800">
            {currentLang === 'ar' ? 'لم نتمكن من العثور على سجلات مطابقة' : currentLang === 'zh' ? '未找到符合条件的记录' : currentLang === 'ckb' ? 'هیچ زانیارییەک نەدۆزرایەوە' : 'No matching records found'}
          </p>
          <p className="text-gray-500 text-xs font-mono">
            Try adjusting your search criteria or reset filters to display all records.
          </p>
          <button
            onClick={() => { setSelectedRegion('ALL'); setSelectedCategory('ALL'); setSearchQuery(''); }}
            className="inline-block bg-[#111111] text-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#990000] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((p) => (
            <div
              key={p.id}
              onClick={() => setActiveProfile(p)}
              className="group bg-white border border-[#111111] hover:border-[#990000] hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              <div>
                {/* Image and Overlay Header */}
                <div className="relative h-52 w-full bg-gray-900 overflow-hidden">
                  <img
                    src={p.imageUrl}
                    alt={getName(p)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-[#111111] text-white text-[10px] font-mono px-2 py-0.5 font-bold uppercase border border-white/20">
                      {p.region}
                    </span>
                    <span className="bg-[#990000] text-white text-[10px] font-mono px-2 py-0.5 font-bold uppercase">
                      {p.category.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Name overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-red-300 transition-colors">
                      {getName(p)}
                    </h3>
                  </div>
                </div>

                {/* Info Text */}
                <div className="p-4 space-y-2">
                  <p className="text-xs font-mono font-bold text-[#990000]">
                    {getTitle(p)}
                  </p>
                  <p className="text-gray-600 text-xs line-clamp-3 leading-relaxed">
                    {getSummary(p)}
                  </p>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="p-4 pt-0 border-t border-gray-100 mt-3 flex items-center justify-between text-xs font-mono text-gray-500">
                <span className="truncate max-w-[180px]">🏛️ {p.organization}</span>
                <span className="text-[#990000] font-bold group-hover:underline flex items-center gap-1 shrink-0">
                  <span>View Details</span>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
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

              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <img
                  src={activeProfile.imageUrl}
                  alt={getName(activeProfile)}
                  className="w-full sm:w-40 h-40 object-cover border-2 border-[#111111] shrink-0"
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

                  <p className="text-xs font-mono font-bold text-[#990000]">
                    {getTitle(activeProfile)}
                  </p>

                  <p className="text-xs font-mono text-gray-500">
                    🏛️ {activeProfile.organization}
                  </p>
                </div>
              </div>

              {/* Biography / Full Text */}
              <div className="space-y-3 border-t border-b border-gray-200 py-4 text-sm text-gray-800 leading-relaxed">
                <h4 className="font-mono text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Full Background & Executive Summary:
                </h4>
                <p className="whitespace-pre-line">{getBio(activeProfile)}</p>
              </div>

              {/* External Publication Link */}
              {activeProfile.publicationUrl && (
                <div className="bg-[#F4F4F0] p-3 border border-gray-300 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <FileText className="w-4 h-4 text-[#990000]" />
                    <span className="font-bold">Official Document / Monograph Download</span>
                  </div>
                  <a
                    href={activeProfile.publicationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 bg-[#111111] text-white hover:bg-[#990000] px-3 py-1 font-mono text-xs font-bold transition-colors"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-white border-2 border-[#111111] max-w-lg w-full p-6 space-y-4 rounded-xs shadow-2xl relative"
            >
              <button
                onClick={() => setSubmissionFormOpen(false)}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-[#990000] hover:text-white p-1.5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-[#111111]">
                  Submit Monograph or Female Leadership Nomination
                </h3>
                <p className="text-xs text-gray-600 font-mono">
                  Submit research papers, policy briefs, or feature nominations for the China-Iraq-Kurdistan Women Secretariat.
                </p>
              </div>

              {submissionSent ? (
                <div className="bg-emerald-50 border border-emerald-500 p-4 text-emerald-800 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Submission received and logged with the Women Academic Board. Thank you!</span>
                </div>
              ) : (
                <form onSubmit={handleSubmission} className="space-y-3 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={submission.name}
                      onChange={e => setSubmission({ ...submission, name: e.target.value })}
                      className="bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono focus:outline-none focus:border-[#990000]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={submission.email}
                      onChange={e => setSubmission({ ...submission, email: e.target.value })}
                      className="bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono focus:outline-none focus:border-[#990000]"
                    />
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Organization / University *"
                    value={submission.organization}
                    onChange={e => setSubmission({ ...submission, organization: e.target.value })}
                    className="w-full bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono focus:outline-none focus:border-[#990000]"
                  />

                  <input
                    type="text"
                    required
                    placeholder="Paper Title / Nominee Name *"
                    value={submission.title}
                    onChange={e => setSubmission({ ...submission, title: e.target.value })}
                    className="w-full bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono focus:outline-none focus:border-[#990000]"
                  />

                  <select
                    value={submission.category}
                    onChange={e => setSubmission({ ...submission, category: e.target.value })}
                    className="w-full bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono focus:outline-none focus:border-[#990000]"
                  >
                    <option value="PROMINENT_FIGURE">Prominent Figure Nomination</option>
                    <option value="POLICY_RIGHTS">Legal Rights & Policy Paper</option>
                    <option value="ACHIEVEMENTS">Innovation / STEM Achievement</option>
                    <option value="PUBLICATIONS">Academic Research Publication</option>
                  </select>

                  <textarea
                    rows={3}
                    required
                    placeholder="Abstract / Summary & Key Highlights *"
                    value={submission.abstract}
                    onChange={e => setSubmission({ ...submission, abstract: e.target.value })}
                    className="w-full bg-[#F4F4F0] border border-gray-300 p-2 text-xs font-mono focus:outline-none focus:border-[#990000]"
                  />

                  <button
                    type="submit"
                    className="w-full bg-[#990000] hover:bg-[#7a0000] text-white py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Nomination to Board</span>
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
