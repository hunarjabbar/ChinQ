import { Locale, Article } from '../types';
import { useI18n } from '../hooks/useI18n';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Search, Sun, Moon, Coins, X, Clock, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SocialHeaderBar } from './SocialLinks';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteStore } from '../store/useSiteStore';
import { IcaLogo } from './IcaLogo';

function LiveDateTime({ lang }: { lang: Locale }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const localeCode = lang === 'ar' ? 'ar-IQ' : lang === 'zh' ? 'zh-CN' : lang === 'ckb' ? 'ckb-IQ' : 'en-US';
  const formattedDate = time.toLocaleDateString(localeCode, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  const formattedTime = time.toLocaleTimeString(localeCode, { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="flex flex-col gap-0.5">
      <div className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400 whitespace-nowrap flex items-center gap-1.5">
        <Clock className="w-3 h-3 text-brand-800 dark:text-brand-400 animate-pulse" />
        <span>{formattedTime}</span>
      </div>
      <div className="text-[11px] font-bold text-neutral-600 dark:text-neutral-300 uppercase tracking-widest border-t border-neutral-200 dark:border-neutral-800 pt-1 whitespace-nowrap">
        {formattedDate}
      </div>
    </div>
  );
}

function PaymentSettlementButton({ lang }: { lang: Locale }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const isRtl = lang === 'ar' || lang === 'ckb';

  // Automatically close after exactly 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const showPopup = isOpen || isHovered;

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        to={`/${lang}/payments`} 
        onClick={() => { setIsOpen(false); setIsHovered(false); }}
        className="relative flex items-center gap-1.5 px-3 py-1 bg-brand-800 text-white rounded text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-brand-900 transition-all shadow-[0_0_15px_rgba(185,28,28,0.5)] group z-10"
      >
        <span className="absolute inset-0 rounded ring-2 ring-brand-400 animate-pulse opacity-80"></span>
        <span className="absolute -inset-1 rounded bg-brand-500/30 animate-ping blur-[1px] opacity-70"></span>
        <Coins size={14} className="text-white relative z-10" />
        <span className="relative z-10">{lang === 'ar' ? 'تسوية المدفوعات' : lang === 'zh' ? '支付结算' : lang === 'ckb' ? 'خزمەتگوزاری پارەدان' : 'Payment Settlement'}</span>
      </Link>
      
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ 
              opacity: 0, 
              y: -28, 
              scale: 0.75, 
              transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } 
            }}
            style={{ transformOrigin: isRtl ? 'top left' : 'top right' }}
            className={`absolute top-full ${isRtl ? 'left-0' : 'right-0'} mt-2 w-[290px] sm:w-[340px] bg-white dark:bg-neutral-900 border-2 border-brand-800 dark:border-brand-600 rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] z-[100] p-4 text-brand-900 dark:text-neutral-100`}
          >
            {/* Arrow pointer */}
            <div className={`absolute -top-2 ${isRtl ? 'left-6' : 'right-6'} w-4 h-4 bg-white dark:bg-neutral-900 border-t-2 border-l-2 border-brand-800 dark:border-brand-600 transform rotate-45 z-10`}></div>
            
            <div className="relative z-20 flex flex-col gap-2.5 text-left rtl:text-right">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-brand-800 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 px-2.5 py-0.5 rounded-full tracking-widest border border-brand-200 dark:border-brand-800">
                  {lang === 'ar' ? 'بوابة تسوية رسمية' : lang === 'zh' ? '官方结算网关' : lang === 'ckb' ? 'دەروازەی فەرمی پارەدان' : 'Official Gateway'}
                </span>
                <button 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    setIsOpen(false); 
                    setIsHovered(false);
                  }} 
                  className="text-neutral-400 hover:text-brand-900 dark:hover:text-white p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  title="Close popup"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>
              
              <div>
                <h4 className="text-sm font-black text-brand-900 dark:text-neutral-100 uppercase tracking-tight">
                  {lang === 'ar' ? 'منظومة تسوية المدفوعات الثنائية' : lang === 'zh' ? '中伊双边跨境支付结算' : lang === 'ckb' ? 'سیستەمی پارەدانی دوولایەنە' : 'Bilateral Payment Settlement'}
                </h4>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium mt-1">
                  {lang === 'ar' 
                    ? 'تسوية مباشرة وسريعة للمبادلات التجارية بالدينار العراقي (IQD) واليوان الصيني الرقمي (e-CNY) عبر قنوات آمنة ومعتمدة.' 
                    : lang === 'zh' 
                    ? '通过主权安全信道即时处理伊拉克第纳尔（IQD）与数字人民币（e-CNY）跨境清算与贸易结算。' 
                    : lang === 'ckb' 
                    ? 'پاکتاوکردنی ڕاستەوخۆی مامەڵە بازرگانییەکان بە دیناری عێراقی و یوانی چینی لە ڕێگەی کەناڵی پارێزراوەوە.' 
                    : 'Instant sovereign clearing for cross-border contracts in Iraqi Dinar (IQD) and Digital Yuan (e-CNY).'}
                </p>
              </div>

              {/* Action Button */}
              <Link
                to={`/${lang}/payments`}
                onClick={() => { setIsOpen(false); setIsHovered(false); }}
                className="mt-1 w-full flex items-center justify-center gap-2 py-2 px-3 bg-brand-800 hover:bg-brand-900 text-white rounded-md text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-98"
              >
                <span>{lang === 'ar' ? 'دخول بوابة المدفوعات' : lang === 'zh' ? '进入结算网关' : lang === 'ckb' ? 'چوونە ناو دەروازەی پارەدان' : 'Open Settlement Gateway'}</span>
                <ChevronRight size={14} className="rtl:rotate-180" />
              </Link>

              {/* Clean 8-second visual indicator countdown */}
              <div className="mt-1 h-0.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 8, ease: 'linear' }}
                  className="h-full bg-brand-700 dark:bg-brand-500"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header({ lang }: { lang: Locale }) {
  const siteName = useSiteStore(state => state.siteName);
  const darkMode = useSiteStore(state => state.darkMode);
  const toggleDarkMode = useSiteStore(state => state.toggleDarkMode);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
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
    <div className="w-full relative z-50 bg-white dark:bg-neutral-900 border-b-[3px] border-ink-900 dark:border-neutral-700 shadow-xs transition-colors duration-300">
      {/* Main Masthead Wrapper */}
      <div className="w-full max-w-(--container-width) mx-auto px-4 sm:px-6">
        <motion.header 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
          className="relative flex flex-col items-center pt-5 pb-3 md:pt-6 md:pb-4 z-50"
        >
          <div className="relative z-10 flex flex-col items-center w-full">
            {/* Eyebrow Label */}
            <div className="text-xs sm:text-xs font-black uppercase tracking-[0.25em] sm:tracking-[0.35em] text-neutral-600 dark:text-neutral-300 text-center mb-2 sm:mb-3">
              {lang === 'ar' 
                ? 'الممر المعلوماتي والمستقل • جمهورية العراق — جمهورية الصين الشعبية'
                : lang === 'zh' 
                ? '主权信息与经贸走廊 • 中国 — 伊拉克'
                : lang === 'ckb' 
                ? 'ڕێڕەوی زانیاری و سەربەخۆ • عێراق — چین'
                : 'The Sovereign Information Corridor • China — Iraq'}
            </div>

            <div className="w-full flex flex-row items-center justify-between gap-4 md:gap-8 mb-6">
              {/* Left Info Column */}
              <div className="hidden lg:flex flex-col items-start gap-1.5 w-1/4 text-left rtl:items-start rtl:text-right shrink-0">
                <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400 whitespace-nowrap">
                  {lang === 'ar' ? 'المجلد CLXII العدد 402' : lang === 'zh' ? '第 CLXII 卷 第 402 期' : lang === 'ckb' ? 'بەرگی CLXII ژمارە ٤٠٢' : 'Vol. CLXII No. 402'}
                </span>
                <LiveDateTime lang={lang} />
              </div>

              {/* Centered Logo & Title Lockup */}
              <div className="flex flex-col items-center group flex-1 shrink-0 px-2">
                <Link to={`/${lang}`} className="relative block w-full flex flex-row items-center justify-center gap-3 sm:gap-5 md:gap-8">
                  <div className="flex items-center justify-center shrink-0">
                    <IcaLogo size={110} variant="mark" lang={lang} className="w-14 h-14 sm:w-20 sm:h-20 lg:w-26 lg:h-26 drop-shadow-xl group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col items-start justify-center text-start">
                    {lang === 'ar' ? (
                      <>
                        <span className="whitespace-nowrap text-brand-800 dark:text-brand-400 font-sans font-black tracking-tight text-2xl sm:text-4xl lg:text-5xl">الوكالة العراقية الصينية</span>
                        <span className="text-sm sm:text-xl lg:text-2xl uppercase text-brand-800 dark:text-brand-400 tracking-[0.35em] mt-1 font-sans font-black whitespace-nowrap">AGENCY</span>
                      </>
                    ) : lang === 'ckb' ? (
                      <>
                        <span className="whitespace-nowrap text-brand-800 dark:text-brand-400 font-sans font-black tracking-tight text-2xl sm:text-4xl lg:text-5xl">ئاژانسی عێراقی - چینی</span>
                        <span className="text-sm sm:text-xl lg:text-2xl uppercase text-brand-800 dark:text-brand-400 tracking-[0.35em] mt-1 font-sans font-black whitespace-nowrap">AGENCY</span>
                      </>
                    ) : lang === 'zh' ? (
                      <>
                        <span className="whitespace-nowrap text-brand-800 dark:text-brand-400 font-black tracking-wider text-2xl sm:text-4xl lg:text-5xl">伊中通讯社</span>
                        <span className="text-sm sm:text-xl lg:text-2xl uppercase text-brand-800 dark:text-brand-400 tracking-[0.35em] mt-1 font-sans font-black whitespace-nowrap">AGENCY</span>
                      </>
                    ) : (
                      <>
                        <span className="whitespace-nowrap text-brand-800 dark:text-brand-400 font-black tracking-tight text-2xl sm:text-4xl lg:text-5xl">IRAQI-CHINESE</span>
                        <span className="text-sm sm:text-xl lg:text-2xl uppercase text-brand-800 dark:text-brand-400 tracking-[0.35em] mt-1 font-sans font-black whitespace-nowrap">AGENCY</span>
                      </>
                    )}
                  </div>
                  <div className="absolute -bottom-4 left-0 right-0 h-1 bg-brand-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center hidden md:block" />
                </Link>
              </div>

              {/* Right Controls Column */}
              <div className="flex flex-col items-end gap-2 w-auto lg:w-1/4 shrink-0">
                 <div className="flex items-center gap-2 sm:gap-3 bg-neutral-100/90 dark:bg-neutral-800/90 p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-xs transition-colors">
                    <button
                      id="dark-mode-toggle-btn"
                      onClick={toggleDarkMode}
                      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                      aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                      className="px-2.5 py-1.5 rounded-md flex items-center gap-1.5 bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-600 border border-neutral-200/80 dark:border-neutral-600 transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
                    >
                      {darkMode ? (
                        <>
                          <Sun size={15} className="text-amber-400 fill-amber-400" />
                          <span className="hidden xl:inline text-[11px] font-black uppercase tracking-wider text-neutral-200">Light</span>
                        </>
                      ) : (
                        <>
                          <Moon size={15} className="text-slate-800 fill-slate-800" />
                          <span className="hidden xl:inline text-[11px] font-black uppercase tracking-wider text-neutral-700">Dark</span>
                        </>
                      )}
                    </button>
                    <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" />
                    <LanguageSwitcher lang={lang} />
                 </div>
              </div>
            </div>

            {/* Functional Row: Search & Social */}
            <div className="w-full flex flex-row items-center justify-between border-t border-b border-neutral-100 dark:border-neutral-800 py-3 gap-6">
              <div className="w-full max-w-sm relative shrink-0 flex flex-col gap-2">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    navigate(`/${lang}/search?q=${encodeURIComponent(searchQuery)}`);
                  }
                }}>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={lang === 'zh' ? "搜索企业和基建项目..." : "Search enterprise directory..."}
                      className="w-full pl-9 pr-4 py-2 text-xs font-bold border-none bg-neutral-50 dark:bg-neutral-800 text-brand-900 dark:text-neutral-100 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:ring-1 focus:ring-brand-800/20 rounded-sm transition-all placeholder:text-neutral-400"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                  </div>
                </form>
                
                {/* Category Tags */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                  {['Energy', 'Economy', 'Diplomacy', 'Infrastructure'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => navigate(`/${lang}/search?category=${encodeURIComponent(tag.toLowerCase())}`)}
                      className="text-xs font-bold uppercase tracking-wider px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-brand-50 hover:text-brand-800 dark:hover:bg-brand-900/30 dark:hover:text-brand-400 transition-colors rounded whitespace-nowrap cursor-pointer"
                    >
                      {lang === 'ar' && tag === 'Energy' ? 'الطاقة' 
                        : lang === 'ar' && tag === 'Economy' ? 'الاقتصاد'
                        : lang === 'ar' && tag === 'Diplomacy' ? 'الدبلوماسية'
                        : lang === 'ar' && tag === 'Infrastructure' ? 'البنية التحتية'
                        : lang === 'zh' && tag === 'Energy' ? '能源'
                        : lang === 'zh' && tag === 'Economy' ? '经济'
                        : lang === 'zh' && tag === 'Diplomacy' ? '外交'
                        : lang === 'zh' && tag === 'Infrastructure' ? '基建'
                        : lang === 'ckb' && tag === 'Energy' ? 'وزە'
                        : lang === 'ckb' && tag === 'Economy' ? 'ئابووری'
                        : lang === 'ckb' && tag === 'Diplomacy' ? 'دیپلۆماسی'
                        : lang === 'ckb' && tag === 'Infrastructure' ? 'ژێرخان'
                        : tag}
                    </button>
                  ))}
                </div>
              </div>

              <SocialHeaderBar lang={lang} />
            </div>
          </div>
        </motion.header>

        {/* Navigation / Breaking News Ticker */}
        <nav className="h-11 border-t border-neutral-200 dark:border-neutral-800 flex items-center bg-white dark:bg-neutral-900 relative z-30">
          <div className="absolute left-0 rtl:left-auto rtl:right-0 top-0 bottom-0 z-10 flex items-center px-6 bg-ink-900 dark:bg-neutral-800 text-white text-xs font-black uppercase tracking-[0.2em]">
            {lang === 'ar' ? 'عاجل' : lang === 'zh' ? '突发新闻' : lang === 'ckb' ? 'هەواڵی بەپەلە' : 'DISPATCH'}
          </div>
          <div className="flex-1 overflow-hidden ml-32 rtl:ml-0 rtl:mr-32">
            <div className="flex whitespace-nowrap animate-marquee rtl:animate-marquee-rtl items-center h-full">
              {breakingNews.length > 0 ? breakingNews.map((article, i) => {
                const translation = getTranslation(article);
                return (
                  <span key={article.id} className="inline-flex items-center mx-6 text-xs sm:text-sm font-black uppercase tracking-wider text-neutral-800 dark:text-neutral-100">
                    <span className="w-1.5 h-1.5 bg-brand-800 rounded-full mx-4"></span>
                    <Link to={`/${lang}`} className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors cursor-pointer">
                      {translation?.title || 'NEWS UPDATE'}
                    </Link>
                  </span>
                );
              }) : (
                <span className="inline-flex items-center mx-6 text-xs font-bold uppercase tracking-widest text-neutral-500">
                  LOADING LATEST INTELLIGENCE DISPATCHES...
                </span>
              )}
            </div>
          </div>
          <div className="absolute right-0 rtl:right-auto rtl:left-0 top-0 bottom-0 z-40 flex items-center px-4 bg-white dark:bg-neutral-900 border-l rtl:border-l-0 rtl:border-r border-neutral-100 dark:border-neutral-800 gap-3 sm:gap-4">
             <Link to={`/${lang}/about`} className="hidden lg:flex items-center text-xs font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 hover:text-brand-800 transition-colors">
               {lang === 'ar' ? 'حول الوكالة' : lang === 'zh' ? '关于我们' : lang === 'ckb' ? 'دەربارە' : 'About'}
             </Link>
             <Link to={`/${lang}/join`} className="hidden lg:flex items-center text-xs font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 hover:text-brand-800 transition-colors">
               {lang === 'ar' ? 'انضم للتحرير' : lang === 'zh' ? '加入编辑部' : lang === 'ckb' ? 'بەشداری بکە' : 'Join Editorial'}
             </Link>
             <PaymentSettlementButton lang={lang} />
             <Link to={`/${lang}/live`} className="flex items-center gap-2 group">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600"></span>
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400 group-hover:text-brand-900 transition-colors">{t('live')}</span>
             </Link>
             <Link to={`/${lang}/admin`} className="bg-ink-900 dark:bg-neutral-800 text-white px-4 py-1.5 text-xs font-black uppercase tracking-widest hover:bg-brand-800 transition-all">
               {t('signIn')}
             </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
