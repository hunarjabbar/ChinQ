import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Book, Locale } from '../types';
import { 
  BookOpen, Search, Filter, Star, Sparkles, Download, 
  ExternalLink, X, Building2, Globe2, Layers, Bookmark, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function BooksPage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = lang as Locale;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [onlyTrending, setOnlyTrending] = useState<boolean>(false);
  const [activeBook, setActiveBook] = useState<Book | null>(null);
  const [downloadedBooks, setDownloadedBooks] = useState<Record<string, boolean>>({});

  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: async () => {
      const res = await fetch('/api/books');
      if (!res.ok) throw new Error('Failed to fetch books');
      return res.json();
    }
  });

  const getBookTitle = (b: Book) => {
    if (currentLang === 'ar' && b.titleAr) return b.titleAr;
    if (currentLang === 'zh' && b.titleZh) return b.titleZh;
    if (currentLang === 'ckb' && b.titleCkb) return b.titleCkb;
    return b.titleEn;
  };

  const getBookAuthor = (b: Book) => {
    if (currentLang === 'ar' && b.authorAr) return b.authorAr;
    if (currentLang === 'zh' && b.authorZh) return b.authorZh;
    if (currentLang === 'ckb' && b.authorCkb) return b.authorCkb;
    return b.authorEn;
  };

  const getBookDesc = (b: Book) => {
    if (currentLang === 'ar' && b.descriptionAr) return b.descriptionAr;
    if (currentLang === 'zh' && b.descriptionZh) return b.descriptionZh;
    if (currentLang === 'ckb' && b.descriptionCkb) return b.descriptionCkb;
    return b.descriptionEn;
  };

  const filteredBooks = useMemo(() => {
    return books.filter(b => {
      const matchesSearch = 
        !searchQuery ||
        b.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.titleAr.includes(searchQuery) ||
        b.titleZh.includes(searchQuery) ||
        b.titleCkb.includes(searchQuery) ||
        b.authorEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.authorAr.includes(searchQuery) ||
        b.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion = selectedRegion === 'ALL' || b.region === selectedRegion;
      const matchesCategory = selectedCategory === 'ALL' || b.category === selectedCategory;
      const matchesTrending = !onlyTrending || b.isTrending;

      return matchesSearch && matchesRegion && matchesCategory && matchesTrending;
    });
  }, [books, searchQuery, selectedRegion, selectedCategory, onlyTrending]);

  const featuredBooks = useMemo(() => {
    return books.filter(b => b.isFeatured || b.isTrending).slice(0, 6);
  }, [books]);

  const regionsList = [
    { id: 'ALL', labelEn: 'All Regions', labelAr: 'جميع المناطق', labelZh: '所有地区', labelCkb: 'هەموو ناوچەکان' },
    { id: 'CHINA', labelEn: 'China Focus', labelAr: 'تركيز الصين', labelZh: '中国专题', labelCkb: 'تایبەت بە چین' },
    { id: 'IRAQ', labelEn: 'Iraq & Mesopotamia', labelAr: 'العراق وبلاد الرافدين', labelZh: '伊拉克与两河', labelCkb: 'عێراق و میسۆپۆتامییا' },
    { id: 'KURDISTAN', labelEn: 'Kurdistan Region', labelAr: 'إقليم كردستان', labelZh: '库尔德斯坦', labelCkb: 'هەرێمی کوردستان' },
    { id: 'SINO_ARAB', labelEn: 'Sino-Arab Ties', labelAr: 'العلاقات الصينية العربية', labelZh: '中阿与中伊关系', labelCkb: 'پەیوەندییەکانی چین و عەرەب' },
  ];

  const categoriesList = [
    { id: 'ALL', labelEn: 'All Subjects', labelAr: 'جميع الموضوعات', labelZh: '所有主题', labelCkb: 'هەموو بابەتەکان' },
    { id: 'GEOPOLITICS', labelEn: 'Geopolitics', labelAr: 'الجيوسياسية', labelZh: '地缘政治', labelCkb: 'جیۆپۆلەتیک' },
    { id: 'HISTORY', labelEn: 'History', labelAr: 'التاريخ', labelZh: '历史', labelCkb: 'مێژوو' },
    { id: 'ECONOMY', labelEn: 'Economy & Energy', labelAr: 'الاقتصاد والطاقة', labelZh: '经济与能源', labelCkb: 'ئابووری و وزە' },
    { id: 'CULTURE', labelEn: 'Culture & Arts', labelAr: 'الثقافة والفنون', labelZh: '文化与艺术', labelCkb: 'کەلتوور و هونەر' },
    { id: 'LITERATURE', labelEn: 'Literature', labelAr: 'الأدب والشعر', labelZh: '文学与诗歌', labelCkb: 'ئەدەب و شیعر' },
    { id: 'MEMOIR', labelEn: 'Memoir', labelAr: 'السير والمذكرات', labelZh: '回忆录', labelCkb: 'بیرەوەری' },
  ];

  const handleDownload = (bookId: string) => {
    setDownloadedBooks(prev => ({ ...prev, [bookId]: true }));
  };

  return (
    <div className="w-full max-w-[1024px] mx-auto px-4 py-8 space-y-10">
      
      {/* Sovereign Header Banner */}
      <div className="relative bg-[#111111] text-white p-8 md:p-12 rounded-sm border-b-4 border-[#990000] overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#990000]/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#990000] text-white text-[10px] font-mono font-black uppercase tracking-widest rounded-xs">
            <BookOpen className="w-3.5 h-3.5" />
            {currentLang === 'ar' ? 'المكتبة السيادية الأكاديمية' : currentLang === 'zh' ? '钦克主权学术书库' : currentLang === 'ckb' ? 'کتێبخانەی سەروەری شینک' : 'CHINQ SOVEREIGN LIBRARY'}
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight leading-tight">
            {currentLang === 'ar' ? 'مجموعات الكتب الحديثة حول الصين والعراق وكردستان' :
             currentLang === 'zh' ? '中国、伊拉克与库尔德斯坦精选学术著作库' :
             currentLang === 'ckb' ? 'کۆکراوەی کتێبە گرنگەکانی چین، عێراق و کوردستان' :
             'Trending Books on China, Iraq & Kurdistan'}
          </h1>

          <p className="text-gray-300 text-sm md:text-base font-sans leading-relaxed">
            {currentLang === 'ar' ? 'قاعدة بيانات متكاملة تضم 50 كتاباً ومؤلفاً مرجعياً في التاريخ، الاقتصاد، الجيوسياسية، والتراث الثقافي الثنائي.' :
             currentLang === 'zh' ? '收录50部涵盖地缘政治、双边能源、地毯艺术、古代丝绸之路与现代重构的重磅书目与权威图录。' :
             currentLang === 'ckb' ? 'بانکێکی دەوڵەمەند لە ٥٠ کتێبی سەرەکی لەسەر مێژوو، ئابووری، جیۆپۆلەتیک و کەلتووری ناوچەکە.' :
             'An authoritative collection of 50 foundational books covering energy diplomacy, Silk Road archaeology, geopolitical reconstruction, and cultural heritage.'}
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/15 text-xs font-mono">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">{currentLang === 'ar' ? 'إجمالي المجلدات' : 'TOTAL TITLES'}</span>
              <span className="text-xl font-bold text-white">50 Volumes</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">{currentLang === 'ar' ? 'المناطق المغطاة' : 'REGIONS'}</span>
              <span className="text-xl font-bold text-red-400">4 Bureaus</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">{currentLang === 'ar' ? 'الترجمات المتاحة' : 'LANGUAGES'}</span>
              <span className="text-xl font-bold text-white">EN / AR / ZH / CKB</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">{currentLang === 'ar' ? 'الوصول الرقمي' : 'DIGITAL ACCESS'}</span>
              <span className="text-xl font-bold text-emerald-400">100% Full Scale</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Dynamic Filters Bar */}
      <div className="bg-white border-2 border-[#111111] p-5 shadow-sm space-y-4 rounded-xs">
        
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 rtl:right-3.5 rtl:left-auto top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                currentLang === 'ar' ? 'ابحث عن عنوان، مؤلف، أو موضوع...' :
                currentLang === 'zh' ? '搜索书名、作者或关键词...' :
                currentLang === 'ckb' ? 'گەڕان بۆ کتێب، نووسەر یان بابەت...' :
                'Search 50 books by title, author, or keyword...'
              }
              className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-2.5 text-xs font-bold border border-gray-300 rounded-xs focus:outline-none focus:border-[#990000] focus:ring-1 focus:ring-[#990000] bg-neutral-50"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Trending Toggle Pill */}
          <button
            onClick={() => setOnlyTrending(!onlyTrending)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xs text-xs font-mono font-bold uppercase transition-all cursor-pointer shrink-0 border ${
              onlyTrending
                ? 'bg-[#990000] text-white border-[#990000]'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-neutral-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentLang === 'ar' ? 'الأكثر تداولاً فقط' : currentLang === 'zh' ? '仅显示热门' : currentLang === 'ckb' ? 'تەنها زۆرترین خوێنراوەکان' : 'Trending Only'}</span>
          </button>
        </div>

        {/* Region Tabs */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="text-[10px] font-mono uppercase font-black tracking-wider text-gray-500 flex items-center gap-1.5">
            <Globe2 className="w-3 h-3 text-[#990000]" />
            <span>{currentLang === 'ar' ? 'تصفية حسب المنطقة' : currentLang === 'zh' ? '按地域分类' : currentLang === 'ckb' ? 'پۆڵێنکردن بەپێی ناوچە' : 'Filter by Region'}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {regionsList.map((reg) => {
              const isActive = selectedRegion === reg.id;
              const label = currentLang === 'ar' ? reg.labelAr : currentLang === 'zh' ? reg.labelZh : currentLang === 'ckb' ? reg.labelCkb : reg.labelEn;
              return (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] text-white font-black shadow-xs'
                      : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Subject Category Chips */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="text-[10px] font-mono uppercase font-black tracking-wider text-gray-500 flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-[#990000]" />
            <span>{currentLang === 'ar' ? 'تصفية حسب التخصص' : currentLang === 'zh' ? '按学科主题' : currentLang === 'ckb' ? 'پۆڵێنکردن بەپێی بابەت' : 'Filter by Subject'}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categoriesList.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const label = currentLang === 'ar' ? cat.labelAr : currentLang === 'zh' ? cat.labelZh : currentLang === 'ckb' ? cat.labelCkb : cat.labelEn;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-xs transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#990000] text-white font-black'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-neutral-100'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Featured Spotlight Section (when no custom search is active) */}
      {!searchQuery && selectedRegion === 'ALL' && selectedCategory === 'ALL' && !onlyTrending && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[#111111] pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#990000]" />
              <h2 className="text-xl font-serif font-black uppercase tracking-tight">
                {currentLang === 'ar' ? 'المؤلفات البارزة والموصى بها' : currentLang === 'zh' ? '重点关注与特约推荐' : currentLang === 'ckb' ? 'کتێبە دیارەکانی پێشنیارکراو' : 'Featured Spotlight Titles'}
              </h2>
            </div>
            <span className="text-xs font-mono text-gray-500 font-bold uppercase">{featuredBooks.length} Volumes Spotlighted</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBooks.map((book) => (
              <div 
                key={book.id}
                onClick={() => setActiveBook(book)}
                className="group bg-white border border-[#111111]/20 hover:border-[#990000] p-4 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all cursor-pointer rounded-xs"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 border border-neutral-200 rounded-xs">
                    <img 
                      src={book.coverUrl} 
                      alt={getBookTitle(book)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-[#990000] text-white text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-xs">
                      {book.region.replace('_', ' ')}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-300" />
                      <span>{book.rating}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-black uppercase text-[#990000]">
                      {book.category} • {book.year}
                    </span>
                    <h3 className="text-base font-serif font-bold text-[#111111] group-hover:text-[#990000] line-clamp-2 leading-snug transition-colors">
                      {getBookTitle(book)}
                    </h3>
                    <p className="text-xs font-sans text-gray-600 font-medium mt-1">
                      {getBookAuthor(book)}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-xs font-mono text-gray-500">
                  <span>{book.pages} Pages</span>
                  <span className="text-[#990000] font-bold group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform flex items-center gap-1">
                    Read & Detail <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main 50 Books Catalog Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b-2 border-[#111111] pb-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#990000]" />
            <h2 className="text-xl font-serif font-black uppercase tracking-tight">
              {currentLang === 'ar' ? 'فهرس المكتبة الشاملة' : currentLang === 'zh' ? '全域图书总目录' : currentLang === 'ckb' ? 'فهرستی گشتی کتێبەکان' : 'Comprehensive Books Catalog'}
            </h2>
          </div>
          <div className="text-xs font-mono font-bold text-gray-600">
            Showing <span className="text-[#990000]">{filteredBooks.length}</span> of <span className="text-[#111111]">{books.length}</span> Books
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-72 bg-gray-200 rounded-xs" />
            ))}
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-xs space-y-3">
            <BookOpen className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="text-base font-serif font-bold text-gray-800">
              {currentLang === 'ar' ? 'لم يتم العثور على كتب مطابقة' : 'No books matched your filter criteria.'}
            </h3>
            <p className="text-xs text-gray-500">
              Try adjusting your search query, region, or subject filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('ALL');
                setSelectedCategory('ALL');
                setOnlyTrending(false);
              }}
              className="mt-2 px-4 py-1.5 bg-[#990000] text-white text-xs font-mono font-bold rounded-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => {
              const isDownloaded = downloadedBooks[book.id];
              return (
                <div
                  key={book.id}
                  onClick={() => setActiveBook(book)}
                  className="group bg-white border border-gray-200 hover:border-[#111111] hover:shadow-md transition-all duration-200 p-3.5 rounded-xs flex flex-col justify-between cursor-pointer"
                >
                  <div className="space-y-2.5">
                    {/* Cover Preview */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 rounded-xs border border-neutral-200">
                      <img 
                        src={book.coverUrl} 
                        alt={getBookTitle(book)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 bg-black/80 text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-xs">
                        {book.region.replace('_', ' ')}
                      </div>
                      {book.isTrending && (
                        <div className="absolute top-2 right-2 bg-[#990000] text-white text-[9px] font-mono font-black uppercase px-1.5 py-0.5 rounded-xs flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Trending</span>
                        </div>
                      )}
                    </div>

                    {/* Meta & Title */}
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 mb-1">
                        <span className="font-bold text-[#990000]">{book.category}</span>
                        <span>{book.year}</span>
                      </div>
                      <h3 className="text-sm font-serif font-bold text-[#111111] group-hover:text-[#990000] line-clamp-2 leading-snug transition-colors">
                        {getBookTitle(book)}
                      </h3>
                      <p className="text-xs font-sans text-gray-600 line-clamp-1 mt-0.5">
                        {getBookAuthor(book)}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-2.5 mt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-amber-600 font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {book.rating}
                    </span>
                    <span className="text-gray-500 font-bold group-hover:text-[#111111] transition-colors">
                      {book.pages}p
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Book Detail Modal */}
      <AnimatePresence>
        {activeBook && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border-2 border-[#111111] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-xs shadow-2xl space-y-6 relative"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveBook(null)}
                className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-gray-500 hover:text-black p-1 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Book Details Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Cover Image Column */}
                <div className="space-y-3">
                  <div className="aspect-[3/4] w-full overflow-hidden border-2 border-[#111111] rounded-xs shadow-md">
                    <img 
                      src={activeBook.coverUrl} 
                      alt={getBookTitle(activeBook)} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-neutral-100 p-3 rounded-xs text-[11px] font-mono space-y-1.5 text-gray-700">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Publisher:</span>
                      <span className="font-bold text-gray-900 line-clamp-1">{activeBook.publisher}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Year:</span>
                      <span className="font-bold text-gray-900">{activeBook.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Pages:</span>
                      <span className="font-bold text-gray-900">{activeBook.pages}</span>
                    </div>
                    {activeBook.isbn && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">ISBN:</span>
                        <span className="font-mono text-gray-900 font-bold">{activeBook.isbn}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Column */}
                <div className="sm:col-span-2 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 bg-[#990000] text-white text-[10px] font-mono font-black uppercase rounded-xs">
                        {activeBook.region.replace('_', ' ')}
                      </span>
                      <span className="px-2 py-0.5 bg-neutral-200 text-gray-800 text-[10px] font-mono font-bold uppercase rounded-xs">
                        {activeBook.category}
                      </span>
                      <span className="text-amber-600 text-xs font-bold flex items-center gap-1 ml-auto">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        {activeBook.rating}
                      </span>
                    </div>

                    <h2 className="text-2xl font-serif font-black text-[#111111] leading-tight">
                      {getBookTitle(activeBook)}
                    </h2>
                    
                    <p className="text-sm font-bold text-[#990000] mt-1">
                      {getBookAuthor(activeBook)}
                    </p>
                  </div>

                  <div className="border-t border-b border-gray-100 py-3">
                    <h4 className="text-xs font-mono font-black uppercase tracking-wider text-gray-500 mb-2">
                      Synopsis & Academic Overview
                    </h4>
                    <p className="text-xs sm:text-sm font-sans text-gray-700 leading-relaxed text-justify">
                      {getBookDesc(activeBook)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => handleDownload(activeBook.id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-bold uppercase rounded-xs transition-colors cursor-pointer ${
                        downloadedBooks[activeBook.id]
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#990000] hover:bg-red-800 text-white'
                      }`}
                    >
                      {downloadedBooks[activeBook.id] ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>PDF Monograph Ready</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Download Academic Monograph</span>
                        </>
                      )}
                    </button>

                    {activeBook.purchaseUrl && (
                      <a
                        href={activeBook.purchaseUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#111111] hover:bg-black text-white text-xs font-mono font-bold uppercase rounded-xs transition-colors"
                      >
                        <span>Official Store</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
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
