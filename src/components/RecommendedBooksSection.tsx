import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Book, Locale } from '../types';
import { 
  Award, Star, BookOpen, Download, ChevronRight, 
  X, CheckCircle2, Bookmark, Flame 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RecommendedBooksSectionProps {
  lang?: Locale;
}

export function RecommendedBooksSection({ lang = 'en' }: RecommendedBooksSectionProps) {
  const currentLang = lang as Locale;
  const [activeBook, setActiveBook] = useState<Book | null>(null);
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({});

  // Query books filtered by featured=true (Recommended)
  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ['recommended-books-home'],
    queryFn: async () => {
      const res = await fetch('/api/books?featured=true');
      if (!res.ok) throw new Error('Failed to fetch recommended books');
      return res.json();
    }
  });

  // Take top recommended books
  const recommendedBooks = books.slice(0, 3);

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

  const handleDownload = (id: string) => {
    setDownloaded(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section className="w-full max-w-[1024px] mx-auto bg-[#111111] text-white p-6 md:p-8 my-10 shadow-xl rounded-xs relative overflow-hidden border-b-4 border-[#990000]">
      {/* Background Accent */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#990000]/10 blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/20 pb-4 mb-6 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#990000] text-white text-[10px] font-mono font-black uppercase tracking-wider rounded-xs mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>
              {currentLang === 'ar' ? 'توصيات مركز الأبحاث' :
               currentLang === 'zh' ? '智库推荐书目' :
               currentLang === 'ckb' ? 'پێشنیارەکانی ناوەندی توێژینەوە' :
               'RECOMMENDED BOOKS'}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-black tracking-tight text-white">
            {currentLang === 'ar' ? 'الكتب الموصى بها دراسياً وعلمياً' :
             currentLang === 'zh' ? 'ChinQ 智库核心推荐主权与地缘著作' :
             currentLang === 'ckb' ? 'کتێبە پێشنیارکراوە زانستییەکان' :
             'Recommended Academic Publications'}
          </h2>
        </div>

        <Link
          to={`/${currentLang}/books`}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-red-400 hover:text-white transition-colors shrink-0 uppercase tracking-wider"
        >
          <span>
            {currentLang === 'ar' ? 'فهرس الكتب الكامل ←' :
             currentLang === 'zh' ? '查看完整书目 →' :
             currentLang === 'ckb' ? 'فهرستی تەواوی کتێبەکان →' :
             'Full Books Directory →'}
          </span>
        </Link>
      </div>

      {/* Recommended Showcase Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 bg-neutral-800 rounded-xs" />
          ))}
        </div>
      ) : recommendedBooks.length === 0 ? (
        <div className="p-8 text-center bg-neutral-900 border border-neutral-800 rounded-xs">
          <p className="text-xs font-mono text-gray-400">No recommended books configured yet in administration portal.</p>
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => setActiveBook(book)}
              className="group bg-neutral-900/90 border border-neutral-800 hover:border-[#990000] p-4 rounded-xs flex flex-col justify-between transition-all cursor-pointer shadow-md hover:shadow-xl"
            >
              <div className="space-y-3">
                {/* Image + Rating */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950 rounded-xs border border-neutral-800">
                  <img
                    src={book.coverUrl}
                    alt={getBookTitle(book)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-[#990000] text-white text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-xs">
                    Recommended
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/90 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs flex items-center gap-1 border border-amber-300/20">
                    <Star className="w-3 h-3 fill-amber-300" />
                    <span>{book.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider mb-1">
                    {book.category} • {book.year}
                  </div>
                  <h3 className="text-base font-serif font-bold text-white group-hover:text-red-400 line-clamp-2 leading-snug transition-colors">
                    {getBookTitle(book)}
                  </h3>
                  <p className="text-xs font-sans text-gray-400 line-clamp-1 mt-1">
                    {getBookAuthor(book)}
                  </p>
                  <p className="text-[11px] font-sans text-gray-300 line-clamp-2 mt-2 leading-relaxed">
                    {getBookDesc(book)}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 mt-3 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>{book.pages} Pages</span>
                <span className="text-red-400 font-bold group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform flex items-center gap-1">
                  <span>Read Monograph</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Book Detail Modal */}
      <AnimatePresence>
        {activeBook && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs text-gray-900">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border-2 border-[#111111] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-xs shadow-2xl space-y-6 relative"
            >
              <button
                onClick={() => setActiveBook(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black p-1 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
                  </div>
                </div>

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
                      Recommendation & Synopsis
                    </h4>
                    <p className="text-xs sm:text-sm font-sans text-gray-700 leading-relaxed text-justify">
                      {getBookDesc(activeBook)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => handleDownload(activeBook.id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-bold uppercase rounded-xs transition-colors cursor-pointer ${
                        downloaded[activeBook.id]
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#990000] hover:bg-red-800 text-white'
                      }`}
                    >
                      {downloaded[activeBook.id] ? (
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
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
