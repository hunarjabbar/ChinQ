import { Locale, Article } from '../types';
import { useI18n } from '../hooks/useI18n';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Coins, X, Clock, ChevronRight, Search, Shield, QrCode, Smartphone } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SocialHeaderBar } from './SocialLinks';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteStore } from '../store/useSiteStore';
import { IcaLogo } from './IcaLogo';
import { LiveDispatch } from './LiveDispatch';
import { AppQrModal } from './AppQrModal';

const LiveDateTime = React.memo(function LiveDateTime({ lang }: { lang: Locale }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 10000);
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
});

function PaymentSettlementButton({ lang }: { lang: Locale }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const isRtl = lang === 'ar' || lang === 'ckb';
  const location = useLocation();

  // Automatically close after exactly 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const showPopup = isOpen || isHovered;

  const settlementTarget = `/${lang}?tab=settlement#settlement-sourcing`;

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsHovered(false);
    // If already on homepage, scroll smoothly to the unified section
    if (location.pathname === `/${lang}` || location.pathname === `/${lang}/`) {
      const el = document.getElementById('settlement-sourcing');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        to={settlementTarget} 
        onClick={handleLinkClick}
        className="relative flex items-center gap-2.5 px-4 sm:px-6 md:px-8 py-3 bg-brand-800 hover:bg-brand-900 text-white rounded-xl text-sm sm:text-base md:text-lg font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 group hover:-translate-y-0.5 z-10"
      >
        <Coins size={18} className="text-white relative z-10 shrink-0" />
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
            className={`absolute top-full ${isRtl ? '-left-2 sm:left-0' : '-right-2 sm:right-0'} mt-2 w-[300px] max-w-[calc(100vw-1rem)] sm:w-[340px] bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-white/80 dark:border-neutral-700/60 rounded-2xl shadow-[0_12px_40px_rgba(204,0,0,0.15)] z-[100] p-4 text-brand-900 dark:text-neutral-100`}
          >
            {/* Arrow pointer */}
            <div className={`absolute -top-2 ${isRtl ? 'left-6' : 'right-6'} w-4 h-4 bg-white/95 dark:bg-neutral-900/95 border-t border-l border-white/80 dark:border-neutral-700/60 transform rotate-45 z-10`}></div>
            
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
                to={settlementTarget}
                onClick={handleLinkClick}
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


function PortalDropdown({ lang }: { lang: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n(lang);
  const isRtl = lang === 'ar' || lang === 'ckb';

  return (
    <div 
      className="relative flex items-center h-full"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 bg-ink-900 dark:bg-neutral-800 text-white text-xs font-black uppercase tracking-widest hover:bg-brand-800 transition-all rounded-sm shadow-sm"
      >
        <span>{t('portal')}</span>
        <ChevronRight size={14} className={`transition-transform duration-300 ${isOpen ? (isRtl ? '-rotate-90' : 'rotate-90') : (isRtl ? 'rotate-180' : '')}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95, transition: { duration: 0.2 } }}
            className={`absolute top-full ${isRtl ? 'left-0' : 'right-0'} mt-1 w-56 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-md overflow-hidden z-50`}
          >
            <div className="flex flex-col py-1">
              <Link 
                to={`/${lang}/admin`} 
                className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-5 h-5 flex items-center justify-center rounded bg-ink-900 dark:bg-neutral-700 text-white group-hover:bg-brand-800 transition-colors shrink-0">
                  <Shield size={12} />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-xs font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors">
                    {t('commandHub')}
                  </span>
                  <span className="text-[9px] text-neutral-500 uppercase tracking-wide">
                    {t('signIn')}
                  </span>
                </div>
                <ChevronRight size={14} className="text-neutral-400 group-hover:text-brand-800 rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


export function Header({ lang }: { lang: Locale }) {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const siteName = useSiteStore(state => state.siteName);
  const darkMode = useSiteStore(state => state.darkMode);
  const toggleDarkMode = useSiteStore(state => state.toggleDarkMode);
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
    <div className="w-full sticky top-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b-[3px] border-ink-900 dark:border-neutral-700 shadow-md transition-colors duration-300">
      {/* Main Masthead Wrapper */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <header 
          className="relative flex flex-col items-center pt-5 pb-3 md:pt-6 md:pb-4 z-50"
        >
          <div className="relative z-10 flex flex-col items-center w-full">
            {/* Eyebrow Label */}
            <div className={`text-xs font-bold uppercase text-neutral-600 dark:text-neutral-300 text-center mb-2 sm:mb-3 ${lang === 'ar' || lang === 'ckb' ? 'tracking-normal' : 'tracking-[0.25em] sm:tracking-[0.35em]'}`}>
              {lang === 'ar' 
                ? 'الممر المعلوماتي والمستقل • جمهورية العراق — جمهورية الصين الشعبية'
                : lang === 'zh' 
                ? '主权信息与经贸走廊 • 中国 — 伊拉克'
                : lang === 'ckb' 
                ? 'سەرچاوەی زانیاری سەربەخۆی عێراق- چین'
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

              {/* Centered Logo & Title Lockup with Controls Placed Underneath */}
              <div className="flex flex-col items-center group flex-1 shrink-0 px-2 gap-3">
                <Link to={`/${lang}`} className="relative w-full flex flex-row items-center justify-center gap-3 sm:gap-5 md:gap-8">
                  <div className="flex items-center justify-center shrink-0">
                    <IcaLogo size={110} variant="mark" lang={lang} className="w-14 h-14 sm:w-20 sm:h-20 lg:w-26 lg:h-26 drop-shadow-xl group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col items-start justify-center text-start">
                    {lang === 'ar' ? (
                      <span className="whitespace-nowrap text-brand-800 dark:text-brand-400 font-black tracking-normal text-3xl sm:text-5xl lg:text-6xl select-none leading-tight">الوكالة العراقية - الصينية</span>
                    ) : lang === 'ckb' ? (
                      <span className="whitespace-nowrap text-brand-800 dark:text-brand-400 font-black tracking-normal text-3xl sm:text-5xl lg:text-6xl select-none leading-tight">ئاژانسی عێراقی - چینی</span>
                    ) : lang === 'zh' ? (
                      <span className="whitespace-nowrap text-brand-800 dark:text-brand-400 font-black tracking-wider text-3xl sm:text-5xl lg:text-6xl select-none leading-tight">伊拉克-中国通讯社</span>
                    ) : (
                      <span className="whitespace-nowrap text-brand-800 dark:text-brand-400 font-black tracking-tight text-3xl sm:text-5xl lg:text-6xl select-none leading-tight">Iraqi-Chinese Agency</span>
                    )}
                  </div>
                  <div className="absolute -bottom-4 left-0 right-0 h-1 bg-brand-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center hidden md:block" />
                </Link>

                {/* Right Controls Placed Underneath the Header Title */}
                <div className="flex items-center gap-2 sm:gap-2.5 bg-neutral-100/90 dark:bg-neutral-800/90 p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-xs transition-colors mt-2">
                   {/* QR Code App Download Trigger */}
                   <button
                     id="header-qr-download-btn"
                     onClick={() => setIsQrModalOpen(true)}
                     title={lang === 'ar' ? "تحميل تطبيق الوكالة (QR)" : lang === 'zh' ? "扫码下载客户端应用" : lang === 'ckb' ? "دابەزاندنی ئەپ (QR)" : "Download ICA App (QR Code)"}
                     aria-label="Download ICA App"
                     className="px-2.5 py-1.5 rounded-md flex items-center gap-1.5 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900/60 text-brand-800 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60 transition-all duration-200 shadow-xs cursor-pointer active:scale-95 group"
                   >
                     <QrCode size={15} className="group-hover:rotate-12 transition-transform text-brand-700 dark:text-brand-400" />
                     <span className="hidden sm:inline text-[11px] font-black uppercase tracking-wider">
                       {lang === 'ar' ? 'تطبيق QR' : lang === 'zh' ? '应用二维码' : lang === 'ckb' ? 'ئەپ QR' : 'App QR'}
                     </span>
                   </button>
                   <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" />
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
                         <span className="hidden xl:inline text-[11px] font-black uppercase tracking-wider text-neutral-800">Dark</span>
                       </>
                     )}
                   </button>
                   <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" />
                   <LanguageSwitcher lang={lang} />
                </div>
              </div>
            </div>

            {/* Functional Row: Social Channels, Join Us, and Search */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between border-t border-b border-neutral-100 dark:border-neutral-800 py-2.5 px-4 md:px-0 gap-3 md:gap-0">
              <div className="flex-1 flex justify-start">
                 <div className="relative group w-full max-w-[200px] lg:max-w-[280px]">
                   <input type="text" placeholder={lang === 'ar' ? 'بحث...' : lang === 'zh' ? '搜索...' : lang === 'ckb' ? 'گەڕان...' : 'Search...'} className="w-full bg-neutral-100 dark:bg-neutral-800 border-none rounded-full px-4 py-2 text-xs focus:ring-2 focus:ring-brand-500/50 outline-none text-neutral-800 dark:text-neutral-200 shadow-inner" />
                   <Search className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                 </div>
              </div>
              <div className="flex-1 flex justify-center items-center gap-4">
                <SocialHeaderBar lang={lang} />
                <Link to={`/${lang}/join`} className="flex items-center text-[11px] font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 hover:text-brand-800 transition-colors bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-full shadow-2xs hover:shadow-md hover:-translate-y-0.5 duration-300">
                  {lang === 'ar' ? 'انضم إلينا' : lang === 'zh' ? '加入我们' : lang === 'ckb' ? 'بەشداربە لەگەڵمان' : 'Join Us'}
                </Link>
              </div>
              <div className="flex-1 flex justify-end"></div>
            </div>
          </div>
        </header>

        {/* Navigation / Breaking News Ticker */}
        <nav className="min-h-[48px] sm:min-h-[52px] border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-stretch bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md relative z-30">
          <div className="flex-shrink-0 z-10 flex items-stretch relative">
            <LiveDispatch lang={lang} />
          </div>
          <div className="flex-shrink-0 z-40 flex items-center px-4 bg-white dark:bg-neutral-900 border-l rtl:border-l-0 rtl:border-r border-neutral-100 dark:border-neutral-800 gap-3 sm:gap-4 ml-auto">
             <Link to={`/${lang}/about`} className="hidden lg:flex items-center text-xs font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 hover:text-brand-800 transition-colors">
               {lang === 'ar' ? 'حول الوكالة' : lang === 'zh' ? '关于我们' : lang === 'ckb' ? 'دەربارە' : 'About'}
             </Link>
             <Link to={`/${lang}/join`} className="hidden lg:flex items-center text-xs font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 hover:text-brand-800 transition-colors">
               {lang === 'ar' ? 'انضم للتحرير' : lang === 'zh' ? '加入编辑部' : lang === 'ckb' ? 'بەشداری بکە' : 'Join Editorial'}
             </Link>
             <PaymentSettlementButton lang={lang} />
             <PortalDropdown lang={lang} />
          </div>
        </nav>
      </div>

      {/* App PWA Download QR Code Modal */}
      <AppQrModal 
        isOpen={isQrModalOpen} 
        onClose={() => setIsQrModalOpen(false)} 
        lang={lang} 
      />
    </div>
  );
}
