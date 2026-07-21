import { Locale, Article } from '../types';
import { useI18n } from '../hooks/useI18n';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header({ lang }: { lang: Locale }) {
  const { t } = useI18n(lang);
  
  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ['articles'],
    queryFn: async () => {
      const res = await fetch('/api/articles');
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    }
  });

  const breakingNews = articles.slice(0, 5); // Grab latest 5 for the ticker

  const getTranslation = (article: Article) => {
    return article.translations.find(tr => tr.lang === lang) || 
           article.translations.find(tr => tr.lang === 'en') || 
           article.translations[0];
  };

  return (
    <div className="max-w-[1024px] mx-auto w-full relative z-40">
      {/* Main Masthead - NO overflow-hidden on main header container so controls are never clipped */}
      <header className="relative flex flex-col items-center pt-6 pb-4 border-b-4 border-[#111111] bg-white/75 backdrop-blur-xl shadow-inner z-50">
        {/* Pulsing red glaring circles underneath - overflow-hidden strictly isolated to background div */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Small top-left red accent */}
          <div className="absolute top-2 left-6 w-16 h-16 bg-red-600/35 rounded-full blur-xl animate-pulse" />
          {/* Compact top-right red circle */}
          <div className="absolute top-3 right-10 w-12 h-12 bg-[#990000]/40 rounded-full blur-lg animate-pulse [animation-duration:3s]" />
          {/* Small bottom-left circle */}
          <div className="absolute bottom-2 left-1/4 w-20 h-20 bg-red-700/30 rounded-full blur-xl animate-pulse [animation-duration:4s]" />
          {/* Subtle focal dot */}
          <div className="absolute top-1/2 left-1/12 -translate-y-1/2 w-8 h-8 bg-rose-500/50 rounded-full blur-md animate-pulse [animation-duration:2s]" />
          {/* Compact bottom-right accent */}
          <div className="absolute bottom-1 right-12 w-14 h-14 bg-[#800000]/35 rounded-full blur-lg animate-pulse [animation-duration:3.5s]" />
          {/* Tiny center-below glow */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-16 bg-red-500/25 rounded-full blur-xl animate-pulse [animation-duration:2.5s]" />
        </div>

        <div className="relative z-10 flex flex-col items-center w-full px-4 sm:px-6">
          <div className="text-[11px] font-black uppercase tracking-[0.3em] text-[#111111] text-center mb-2">
            The Bridge Between China and Iraq
          </div>

          <div className="relative inline-flex flex-col md:flex-row items-center justify-center my-2 gap-3 md:gap-0">
            <Link to={`/${lang}`}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight mb-1 text-red-600 hover:text-red-700 drop-shadow-[0_2px_10px_rgba(220,38,38,0.35)] transition-colors duration-200 leading-none text-center m-0">
                CHINQ
              </h1>
            </Link>
            
            {/* Language Switcher positioned to the RIGHT SIDE of the letter Q with space */}
            <div className="md:absolute md:left-full md:top-1/2 md:-translate-y-1/2 md:ml-6 flex items-center shrink-0">
              <LanguageSwitcher lang={lang} />
            </div>
          </div>

          <div className="w-full flex flex-wrap justify-between items-center px-2 text-[10px] uppercase font-black tracking-widest mt-2 text-[#111111] border-t border-[#111111]/15 pt-2 gap-2">
            <span>VOL. CLXII NO. 402</span>
            <span>{new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : lang === 'zh' ? 'zh-CN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>Price: 15 CNY / 2500 IQD</span>
          </div>
        </div>
      </header>

      {/* Navigation / Breaking News Ticker */}
      <nav className="h-12 border-b border-[#111111] flex items-center bg-[#FAFAFA] overflow-hidden relative">
        <div className="absolute left-0 rtl:left-auto rtl:right-0 top-0 bottom-0 z-10 flex items-center px-4 bg-[#990000]/85 backdrop-blur-md border-r rtl:border-r-0 rtl:border-l border-white/20 text-white text-xs font-black uppercase tracking-widest animate-liquid-glass-pulse">
          {lang === 'ar' ? 'عاجل' : lang === 'zh' ? '突发新闻' : lang === 'ckb' ? 'هەواڵی بەپەلە' : 'BREAKING'}
        </div>
        <div className="flex-1 overflow-hidden ml-32 rtl:ml-0 rtl:mr-32">
          <div className="flex whitespace-nowrap animate-marquee rtl:animate-marquee-rtl items-center h-full">
            {breakingNews.length > 0 ? breakingNews.map((article, i) => {
              const translation = getTranslation(article);
              return (
                <span key={article.id} className="inline-flex items-center mx-4 text-xs font-bold uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 bg-[#111111] rounded-full mx-3"></span>
                  <Link to={`/${lang}`} className="hover:text-[#990000] transition-colors cursor-pointer">
                    {translation?.title || 'NEWS UPDATE'}
                  </Link>
                </span>
              );
            }) : (
              <span className="inline-flex items-center mx-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                LOADING LATEST DISPATCHES...
              </span>
            )}
          </div>
        </div>
        <div className="absolute right-0 rtl:right-auto rtl:left-0 top-0 bottom-0 z-10 flex items-center px-4 bg-[#FAFAFA] border-l rtl:border-l-0 rtl:border-r border-[#111111]/20 gap-3">
           <Link to={`/${lang}/women`} className="text-[14px] font-mono font-black uppercase tracking-widest hover:text-[#990000] text-[#111111] transition-colors flex items-center gap-1">
             <span className="text-[#990000]">👩‍💼</span> {lang === 'ar' ? 'المرأة' : lang === 'zh' ? '女性' : lang === 'ckb' ? 'ئافرەتان' : 'WOMEN'}
           </Link>
           <Link to={`/${lang}/tourism`} className="text-[14px] font-mono font-black uppercase tracking-widest hover:text-[#990000] text-[#111111] transition-colors flex items-center gap-1">
             <span className="text-[#990000]">✈️</span> {lang === 'ar' ? 'السياحة' : lang === 'zh' ? '文旅' : lang === 'ckb' ? 'گەشتوگوزار' : 'TOURISM'}
           </Link>
           <Link to={`/${lang}/books`} className="text-[14px] font-mono font-black uppercase tracking-widest hover:text-[#990000] text-[#111111] transition-colors flex items-center gap-1">
             <span className="text-[#990000]">📚</span> {lang === 'ar' ? 'الكتب' : lang === 'zh' ? '图书' : lang === 'ckb' ? 'کتێبەکان' : 'BOOKS'}
           </Link>
           <Link to={`/${lang}/live`} className="text-xs font-bold uppercase tracking-widest hover:text-[#990000] text-[#990000] transition-colors flex items-center gap-1.5"><span className="w-2 h-2 bg-[#990000] rounded-full animate-pulse"></span> LIVE</Link>
           <Link to={`/${lang}/admin`} className="text-xs font-bold uppercase tracking-widest hover:text-[#990000] transition-colors">ADMIN</Link>
        </div>
      </nav>
    </div>
  );
}
