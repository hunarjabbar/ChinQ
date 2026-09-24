import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Check, CreditCard, Sparkles, Loader2, Shield, Crown, Zap, BarChart3, BellRing } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { apiFetch } from '../lib/api';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export function SubscriptionCard() {
  const { lang } = useParams<{ lang: string }>();
  const { user, setAuth, token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const t = {
    en: {
      loginPrompt: "Please login first to subscribe",
      error: "Error processing subscription",
      activeSub: "Active",
      subscription: "Subscription",
      renewsOn: "Renews on",
      premiumAccess: "Premium Access",
      subscribeFor: "Subscribe for Unlimited Information",
      price: "25,000",
      currency: "IQD",
      perMonth: "/mo",
      processing: "Processing",
      subscribed: "Subscribed",
      subscribeNow: "Subscribe Now",
      features: ["Full Market Data", "Ad-Free Experience", "Exclusive Reports"],
      settlementTitle: "Subscription Clearance Service",
      settlementDesc: "Secure connection to Central Bank routing...",
    },
    ar: {
      loginPrompt: "يرجى تسجيل الدخول أولاً للاشتراك",
      error: "خطأ في معالجة الاشتراك",
      activeSub: "نشط",
      subscription: "اشتراك",
      renewsOn: "يتجدد في",
      premiumAccess: "وصول مميز",
      subscribeFor: "اشترك للحصول على ذكاء غير محدود",
      price: "25,000",
      currency: "دينار",      perMonth: "/شهرياً",
      processing: "جاري المعالجة",
      subscribed: "تم الاشتراك",
      subscribeNow: "اشترك الآن",
      features: ["بيانات السوق الكاملة", "تجربة بدون إعلانات", "تقارير حصرية"],
      settlementTitle: "خدمة تسوية المدفوعات",
      settlementDesc: "اتصال آمن بمسار البنك المركزي...",
    },
    zh: {
      loginPrompt: "请先登录才能订阅",
      error: "处理订阅时出错",
      activeSub: "有效",
      subscription: "订阅",
      renewsOn: "续订于",
      premiumAccess: "高级访问",
      subscribeFor: "订阅以获得无限信息",
      price: "25,000",
      currency: "伊拉克第纳尔",
      perMonth: "/月",
      processing: "处理中",      subscribed: "已订阅",
      subscribeNow: "立即订阅",
      features: ["完整的市场数据", "无广告体验", "独家报告"],
      settlementTitle: "支付结算服务",
      settlementDesc: "安全连接至央行路由...",
    },
    ckb: {
      loginPrompt: "تکایە سەرەتا بچۆ ژوورەوە بۆ بەشداریکردن",
      error: "هەڵە لە جێبەجێکردنی بەشداریکردنەکە",
      activeSub: "چالاک",
      subscription: "بەشداریکردن",
      renewsOn: "نوێدەکرێتەوە لە",
      premiumAccess: "دەستگەیشتنی نایاب",
      subscribeFor: "بەشداری بکە بۆ زانیاری بێ سنوور",
      price: "25,000",
      currency: "دینار",      perMonth: "/مانگ",
      processing: "لە جێبەجێکردندایە",
      subscribed: "بەشداریکرا",
      subscribeNow: "ئێستا بەشداری بکە",
      features: ["داتای تەواوی بازاڕ", "ئەزموونی بێ ڕیکلام", "ڕاپۆرتی تایبەت"],
      settlementTitle: "خزمەتگوزاری یەکلاییکردنەوەی پارەدان",
      settlementDesc: "پەیوەندی پارێزراو بە ڕێڕەوی بانکی ناوەندی...",
    }
  };

  const l = t[(lang as keyof typeof t) || 'en'];

  // Handle the simulated subscription clearance modal
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showPaymentModal) {
      // Simulate 4 seconds of payment processing for UX (instead of 20 to avoid locking the user for too long, but we can make it visually feel like a settlement service)
      timer = setTimeout(() => {
        executeSubscription('PREMIUM');
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [showPaymentModal]);

  const ensureGuestUser = async () => {
    try {
      const email = `subscriber.${Math.floor(Math.random() * 8999 + 1000)}@iraq-china.agency`;
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password: 'Password123!',
          name: 'Iraqi Enterprise Subscriber'
        })
      });
      const data = await res.json();
      if (data.id) {
        const loginRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password: 'Password123!' })
        });
        const loginData = await loginRes.json();
        if (loginData.token) {
          setAuth(loginData.user, loginData.token);
          return loginData;
        }
      }
    } catch (e) {
      console.error("Auto guest subscriber creation error:", e);
    }
    return null;
  };

  const handleSubscribeClick = async () => {
    if (!user) {
      const guest = await ensureGuestUser();
      if (!guest && !useAuthStore.getState().user) {
        alert(l.loginPrompt);
        return;
      }
    }
    setShowPaymentModal(true);
  };

  const executeSubscription = async (plan: string) => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan })
      });
      const data = await res.json();
      if (data.success) {
        setAuth(data.user, token!);
        setSuccess(true);
        setTimeout(() => setShowPaymentModal(false), 1500);
      } else {
        alert(data.error || l.error);
        setShowPaymentModal(false);
      }
    } catch (e: any) {
      alert(l.error);
      setShowPaymentModal(false);
    } finally {
      setLoading(false);
    }
  };

  if (user?.subscriptionStatus === 'ACTIVE') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 bg-gradient-to-br from-brand-900 via-brand-800 to-ink-900 text-white text-center relative overflow-hidden group shadow-xl rounded-xl border border-brand-500/30"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="w-14 h-14 bg-brand-500/20 backdrop-blur-md rounded-full flex items-center justify-center mb-5 text-brand-300 border border-brand-400/30 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
            <Check className="w-7 h-7" />
          </div>
          <div className="text-2xl font-black tracking-wide mb-2 text-white">
            {l.activeSub} {user.subscriptionPlan}
          </div>
          <p className="text-xs text-brand-200/80 font-bold tracking-widest uppercase">
            {l.renewsOn} {user.subscriptionEndDate ? new Date(user.subscriptionEndDate).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <div className="p-6 sm:p-8 bg-white dark:bg-neutral-900 text-brand-900 dark:text-white text-center relative overflow-hidden group border border-neutral-200 dark:border-neutral-800 shadow-md hover:shadow-xl hover:border-brand-800/40 transition-all duration-300 rounded-xl">
        <div className="absolute inset-0 bg-brand-800/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-4 bg-brand-50 dark:bg-brand-950/80 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-900/50 shadow-sm">
            <Crown className="w-3.5 h-3.5 text-brand-800 dark:text-brand-400" />
            <div className="text-xs uppercase tracking-[0.25em] font-black text-brand-800 dark:text-brand-400">
              {l.premiumAccess}
            </div>
          </div>
          
          <div className="text-xl md:text-2xl font-black mb-5 leading-tight text-brand-900 dark:text-white transition-colors duration-500">
            {l.subscribeFor}
          </div>
          
          <div className="flex items-center gap-1.5 justify-center mb-6">
            <span className="text-3xl font-black text-brand-800 dark:text-brand-400">{l.price}</span>
            <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{l.currency}</span>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{l.perMonth}</span>
          </div>

          <div className="flex flex-col gap-3 w-full mb-8 text-start">
            {l.features.map((feature, i) => (
               <div key={i} className="text-xs font-bold text-brand-900/80 dark:text-neutral-300 flex items-center gap-3">
                 <div className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center shrink-0">
                   <Check className="w-3 h-3 text-brand-800 dark:text-brand-400" />
                 </div>
                 <span>{feature}</span>
               </div>
            ))}
          </div>
          
          <button 
            onClick={handleSubscribeClick}
            disabled={showPaymentModal || success}
            className="relative overflow-hidden block w-full bg-brand-800 text-white text-xs font-black uppercase tracking-widest py-4 px-6 hover:bg-brand-700 transition-all duration-300 shadow-[0_0_20px_rgba(180,140,60,0.4)] hover:shadow-[0_0_30px_rgba(180,140,60,0.6)] cursor-pointer text-center rounded-lg disabled:opacity-50 group/btn"
          >
            {/* Glaring Pulse Animation */}
            <div className="absolute inset-0 w-full h-full">
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[25deg] animate-[glare_3s_infinite]"></div>
            </div>

            <span className="relative z-10 flex items-center justify-center gap-2">
              <CreditCard className="w-4 h-4" /> {l.subscribeNow}
            </span>
          </button>
        </div>
      </div>

      {/* Subscription Clearance Modal */}
      <AnimatePresence>
        {showPaymentModal && createPortal(
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-2xl max-w-sm w-full border-2 border-brand-800 relative overflow-hidden my-auto"
            >
              {/* Animated Background Pulse */}
              <div className="absolute inset-0 bg-brand-800/5 animate-pulse"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                {success ? (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4"
                  >
                    <Check className="w-8 h-8" />
                  </motion.div>
                ) : (
                  <div className="relative mb-6">
                    <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-800 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-brand-800" />
                    </div>
                  </div>
                )}
                
                <h3 className="text-lg font-black text-ink-900 dark:text-white mb-2 uppercase tracking-wide">
                  {success ? l.subscribed : l.settlementTitle}
                </h3>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                  {success ? l.activeSub : l.settlementDesc}
                </p>

                {!success && (
                  <div className="mt-6 w-full bg-gray-100 dark:bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4, ease: "linear" }}
                      className="h-full bg-brand-800"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </>
  );
}
