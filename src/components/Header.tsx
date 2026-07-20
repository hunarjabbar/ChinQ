import { Locale, Article } from '../types';
import { useI18n } from '../hooks/useI18n';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

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
    <div className="max-w-[1024px] mx-auto w-full">
      {/* Main Masthead */}
      <header className="flex flex-col items-center pt-8 pb-4 border-b-4 border-[#111111]">
        <div className="text-[11px] font-bold uppercase tracking-[0.4em] mb-2">The Bridge Between China and Iraq</div>
        <Link to={`/${lang}`}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight mb-2 text-[#990000] hover:text-[#770000] transition-colors duration-200 leading-none text-center">
            CHINQ
          </h1>
        </Link>
        <div className="w-full flex justify-between px-6 text-[10px] uppercase font-bold tracking-widest mt-2">
          <span>VOL. CLXII NO. 402</span>
          <span>{new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : lang === 'zh' ? 'zh-CN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>Price: 15 CNY / 2500 IQD</span>
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
        <div className="absolute right-0 rtl:right-auto rtl:left-0 top-0 bottom-0 z-10 flex items-center px-4 bg-[#FAFAFA] border-l rtl:border-l-0 rtl:border-r border-[#111111]/20">
           <Link to={`/${lang}/live`} className="text-xs font-bold uppercase tracking-widest hover:text-[#990000] text-[#990000] transition-colors flex items-center gap-1.5 mr-4 rtl:mr-0 rtl:ml-4"><span className="w-2 h-2 bg-[#990000] rounded-full animate-pulse"></span> LIVE</Link>
           <Link to={`/${lang}/admin`} className="text-xs font-bold uppercase tracking-widest hover:text-[#990000] transition-colors ">ADMIN</Link>
        </div>
      </nav>
    </div>
  );
}
