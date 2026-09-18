import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radio, Bell, CheckCircle2, Clock, Calendar, Globe2, ShieldCheck, ArrowRight, Video, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ComingSoonLivePortalProps {
  lang: string;
  slug?: string;
  title?: string;
}

export function ComingSoonLivePortal({ lang, slug, title }: ComingSoonLivePortalProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 18,
    hours: 7,
    minutes: 42,
    seconds: 15
  });

  // Smooth live countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
  };

  const isRtl = lang === 'ar' || lang === 'ckb';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto my-8 px-4 sm:px-6 font-sans"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Primary Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#161616] via-[#121212] to-[#0a0a0a] text-white border border-neutral-800 shadow-2xl p-6 sm:p-10 md:p-12">
        {/* Subtle Background Radial Glow */}
        <div className="pointer-events-none absolute -top-32 -end-32 w-96 h-96 bg-red-600/15 rounded-full blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-32 -start-32 w-96 h-96 bg-brand-800/20 rounded-full blur-3xl"></div>

        {/* Coming Soon Top Pill Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-red-950/80 border border-red-600/50 text-red-200 text-xs font-black uppercase tracking-widest shadow-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span>
              {lang === 'ar' ? 'قريباً • البث المباشر للقمة' : lang === 'zh' ? '即将上线 • 峰会全景直播' : lang === 'ckb' ? 'بەم زووانە • پەخشی ڕاستەوخۆ' : 'Coming Soon • Live Summit Broadcast'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-neutral-400">
            <Calendar size={14} className="text-red-400" />
            <span>Beijing & Baghdad Summit 2026</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="mb-10 text-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
            {title || (
              lang === 'ar' 
                ? 'القمة الاقتصادية العراقية الصينية 2026' 
                : lang === 'zh' 
                ? '2026年伊拉克-中国经济峰会' 
                : lang === 'ckb' 
                ? 'لووتکەی ئابووری عێراق-چین ٢٠٢٦' 
                : 'Iraq-China Economic Summit 2026'
            )}
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed">
            {lang === 'ar'
              ? 'البوابة الرسمية للبث الحي والتحديثات الفورية للقمة الاستراتيجية. نعمل حالياً على تجهيز خطوط البث الفضائي وشبكة التحديثات المباشرة بين بكين وبغداد وأربيل.'
              : lang === 'zh'
              ? '伊拉克-中国战略峰会官方实时直播与数据通报门户。现场多路卫星信号与双边记者连线正在调试，即将向全球同步开启直播。'
              : lang === 'ckb'
              ? 'دەروازەی فەرمی پەخشی ڕاستەوخۆ و نوێکارییەکانی لووتکەی ستراتیژی نێوان عێراق و چین لە بێجینگ و بەغدا.'
              : 'The official live transmission and real-time dossier portal. Satellite links and live editorial desks in Beijing, Baghdad, and Erbil are being configured for simultaneous high-definition transmission.'}
          </p>
        </div>

        {/* Live Broadcast Standby Screen */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/90 border border-neutral-800 mb-10 flex flex-col items-center justify-center p-6 text-center shadow-inner group">
          <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
          <div className="relative z-10 flex flex-col items-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-500/40 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <Radio size={28} className="text-red-400 animate-pulse" />
            </div>
            <div className="text-sm sm:text-base font-black uppercase tracking-widest text-white mb-2">
              {lang === 'ar' ? 'إشارة البث في وضع الاستعداد' : lang === 'zh' ? '卫星信号待机中' : lang === 'ckb' ? 'سیگناڵی پەخش لە ئامادەباشیدایە' : 'Broadcast Signal in Standby'}
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              {lang === 'ar'
                ? 'ستبدأ التغطية المباشرة وجلسات البث المباشر فور انطلاق الجلسة الافتتاحية بحضور الوفود الرسمية.'
                : lang === 'zh'
                ? '正式大会与分论坛实况将在代表团开幕仪式开始时同步开启推送。'
                : lang === 'ckb'
                ? 'ڕووماڵی ڕاستەوخۆ دەست پێدەکات لەگەڵ دەستپێکردنی دانیشتنی فەرمی.'
                : 'Direct feeds will activate automatically as soon as the opening plenary convenes.'}
            </p>
          </div>
          
          <div className="absolute bottom-4 end-4 z-10 flex items-center gap-2 text-[11px] font-bold text-neutral-400 bg-black/60 px-3 py-1.5 rounded-md border border-neutral-800">
            <Video size={14} className="text-red-400" />
            <span>4K Ultra HD • Multi-lingual Audio Feeds</span>
          </div>
        </div>

        {/* Countdown Grid */}
        <div className="mb-10">
          <div className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
            <Clock size={14} className="text-red-400" />
            <span>{lang === 'ar' ? 'العد التنازلي لانطلاق التغطية' : lang === 'zh' ? '开幕倒计时' : lang === 'ckb' ? 'ژماردنی پێچەوانە' : 'Countdown to Broadcast Launch'}</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl text-center">
              <div className="text-3xl sm:text-4xl font-black text-white">{String(timeLeft.days).padStart(2, '0')}</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mt-1">
                {lang === 'ar' ? 'يوم' : lang === 'zh' ? '天' : lang === 'ckb' ? 'ڕۆژ' : 'Days'}
              </div>
            </div>
            <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl text-center">
              <div className="text-3xl sm:text-4xl font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mt-1">
                {lang === 'ar' ? 'ساعة' : lang === 'zh' ? '小时' : lang === 'ckb' ? 'کاتژمێر' : 'Hours'}
              </div>
            </div>
            <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl text-center">
              <div className="text-3xl sm:text-4xl font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mt-1">
                {lang === 'ar' ? 'دقيقة' : lang === 'zh' ? '分钟' : lang === 'ckb' ? 'خولەک' : 'Minutes'}
              </div>
            </div>
            <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl text-center">
              <div className="text-3xl sm:text-4xl font-black text-red-400">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mt-1">
                {lang === 'ar' ? 'ثانية' : lang === 'zh' ? '秒' : lang === 'ckb' ? 'چرکە' : 'Seconds'}
              </div>
            </div>
          </div>
        </div>

        {/* Subscribe / Follow Updates Trigger Form */}
        <div className="bg-gradient-to-r from-red-950/40 to-neutral-900/80 border border-red-900/40 rounded-xl p-6 sm:p-8 mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1 text-start">
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Bell size={18} className="text-red-400" />
                {lang === 'ar' ? 'اشترك لتصلك التحديثات فور الانطلاق' : lang === 'zh' ? '订阅开幕实时更新推送' : lang === 'ckb' ? 'ئاگادارکردنەوە وەربگرە لەکاتی دەستپێکردندا' : 'Follow Updates & Get Instant Alert'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300">
                {lang === 'ar'
                  ? 'سنرسل إليك تنبيهاً فورياً مع رابط البث وملفات الاتفاقيات الموقعة.'
                  : lang === 'zh'
                  ? '我们将在直播开启及重大经贸协议签署的第一时间向您推送通知。'
                  : lang === 'ckb'
                  ? 'ئاگاداری دەستبەجێت پێدەگات لەگەڵ دەستپێکردنی پەخشدا.'
                  : 'Be notified the exact moment transmission begins, with immediate briefing docs.'}
              </p>
            </div>

            <div className="w-full md:w-auto">
              <AnimatePresence mode="wait">
                {isSubscribed ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-black uppercase tracking-wider shadow-md"
                  >
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span>
                      {lang === 'ar' ? 'تم تفعيل التنبيه بنجاح!' : lang === 'zh' ? '已成功订阅通知！' : lang === 'ckb' ? 'ئاگادارکردنەوە کارا کرا!' : 'Subscribed Successfully!'}
                    </span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full md:w-80">
                    <input 
                      type="email"
                      required
                      placeholder={lang === 'ar' ? 'أدخل بريدك الإلكتروني...' : lang === 'zh' ? '输入您的电子邮箱...' : lang === 'ckb' ? 'ئیمەیڵەکەت بنووسە...' : 'Enter your email...'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-xs font-bold outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 flex-1"
                    />
                    <button 
                      type="submit"
                      className="px-5 py-2.5 bg-red-700 hover:bg-red-600 text-white text-xs font-black uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-md shrink-0"
                    >
                      {lang === 'ar' ? 'تفعيل' : lang === 'zh' ? '开启' : lang === 'ckb' ? 'تۆمارکردن' : 'Notify Me'}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Agenda & Key Pillars Preview */}
        <div className="border-t border-neutral-800/80 pt-8 text-start">
          <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-5 flex items-center gap-2">
            <Sparkles size={14} className="text-red-400" />
            <span>{lang === 'ar' ? 'أبرز محاور القمة المرتقبة' : lang === 'zh' ? '峰会核心议程' : lang === 'ckb' ? 'تەوەرە سەرەکییەکان' : 'Core Summit Pillars in Focus'}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl">
              <div className="text-red-400 text-xs font-black uppercase tracking-wider mb-1">01 • Infrastructure & Corridors</div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {lang === 'ar' ? 'ربط ميناء الفاو الكبير بطريق التنمية وممرات السكك الحديدية الدولية.' : 'Connecting Grand Faw Port with the Development Road and trans-regional freight lines.'}
              </p>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl">
              <div className="text-red-400 text-xs font-black uppercase tracking-wider mb-1">02 • Renewable Clean Energy</div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {lang === 'ar' ? 'عقود محطات الطاقة الشمسية المشتركة في ميسان والأنبار والبصرة.' : 'Bilateral solar mega-parks and high-voltage distribution networks in southern provinces.'}
              </p>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl">
              <div className="text-red-400 text-xs font-black uppercase tracking-wider mb-1">03 • Financial Clearing Channels</div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {lang === 'ar' ? 'تسهيلات المقاصة المباشرة باليوان والدينار العراقي لدعم التجارة الثنائية.' : 'Direct trade clearing protocols and banking facilitation between Iraqi and Chinese institutions.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-neutral-400">
          <Link to={`/${lang}`} className="hover:text-white transition-colors flex items-center gap-1.5">
            <span>←</span>
            <span>{lang === 'ar' ? 'العودة إلى الصفحة الرئيسية' : lang === 'zh' ? '返回主页' : lang === 'ckb' ? 'گەڕانەوە بۆ سەرەتا' : 'Back to Home'}</span>
          </Link>
          <Link to={`/${lang}/live`} className="hover:text-white transition-colors flex items-center gap-1.5">
            <span>{lang === 'ar' ? 'استعراض شبكة البث المباشر الكاملة' : lang === 'zh' ? '查看所有直播频道' : lang === 'ckb' ? 'بینینی تەواوی کەناڵەکانی پەخش' : 'Explore All Live Broadcasts'}</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
