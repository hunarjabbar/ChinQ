import { useState } from 'react';
import { Check, CreditCard, Sparkles, Loader2, Shield } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { apiFetch } from '../lib/api';
import { useParams } from 'react-router-dom';

export function SubscriptionCard() {
  const { lang } = useParams<{ lang: string }>();
  const { user, setAuth, token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const t = {
    en: {
      loginPrompt: "Please login first to subscribe",
      error: "Error processing subscription",
      activeSub: "Active",
      subscription: "Subscription",
      renewsOn: "Renews on",
      premiumAccess: "Premium Access",
      subscribeFor: "Subscribe for Unlimited Intelligence",
      price: "25,000",
      currency: "IQD",
      perMonth: "/mo",
      processing: "Processing",
      subscribed: "Subscribed",
      subscribeNow: "Subscribe Now",
      features: ["Full Market Data", "Ad-Free Experience", "Exclusive Reports"],
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
      currency: "دينار",
      perMonth: "/شهرياً",
      processing: "جاري المعالجة",
      subscribed: "تم الاشتراك",
      subscribeNow: "اشترك الآن",
      features: ["بيانات السوق الكاملة", "تجربة بدون إعلانات", "تقارير حصرية"],
    },
    zh: {
      loginPrompt: "请先登录才能订阅",
      error: "处理订阅时出错",
      activeSub: "有效",
      subscription: "订阅",
      renewsOn: "续订于",
      premiumAccess: "高级访问",
      subscribeFor: "订阅以获得无限情报",
      price: "25,000",
      currency: "伊拉克第纳尔",
      perMonth: "/月",
      processing: "处理中",
      subscribed: "已订阅",
      subscribeNow: "立即订阅",
      features: ["完整的市场数据", "无广告体验", "独家报告"],
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
      currency: "دینار",
      perMonth: "/مانگ",
      processing: "لە جێبەجێکردندایە",
      subscribed: "بەشداریکرا",
      subscribeNow: "ئێستا بەشداری بکە",
      features: ["داتای تەواوی بازاڕ", "ئەزموونی بێ ڕیکلام", "ڕاپۆرتی تایبەت"],
    }
  };

  const l = t[(lang as keyof typeof t) || 'en'];

  const handleSubscribe = async (plan: string) => {
    if (!user) {
      alert(l.loginPrompt);
      return;
    }
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
      } else {
        alert(data.error || l.error);
      }
    } catch (e) {
      alert(l.error);
    } finally {
      setLoading(false);
    }
  };

  if (user?.subscriptionStatus === 'ACTIVE') {
    return (
      <div className="p-8 bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#2a2a2a] text-white text-center relative overflow-hidden group border border-green-500/30 shadow-xl rounded-sm">
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-400">
            <Check className="w-6 h-6" />
          </div>
          <div className="text-xl font-serif font-bold italic mb-2">
            {l.activeSub} {user.subscriptionPlan} {l.subscription}
          </div>
          <p className="text-xs text-gray-400 font-mono">
            {l.renewsOn} {user.subscriptionEndDate ? new Date(user.subscriptionEndDate).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#2a2a2a] text-white text-center relative overflow-hidden group border border-[#111111]/20 shadow-xl rounded-sm">
      <div className="absolute inset-0 bg-gradient-to-t from-[#990000]/90 to-[#770000]/90 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <div className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 group-hover:text-white transition-colors duration-500">
            {l.premiumAccess}
          </div>
        </div>
        
        <div className="text-xl font-serif font-bold italic mb-4 leading-tight group-hover:text-white text-gray-100 transition-colors duration-500">
          {l.subscribeFor}
        </div>
        
        <div className="flex items-center gap-1 justify-center mb-6">
          <span className="text-2xl font-black text-white">{l.price}</span>
          <span className="text-sm font-bold text-gray-300">{l.currency}</span>
          <span className="text-xs text-gray-400 font-normal">{l.perMonth}</span>
        </div>

        <div className="flex gap-2 flex-wrap justify-center mb-6">
          {l.features.map((feature, i) => (
             <span key={i} className="text-[10px] bg-white/10 px-2 py-1 rounded-sm flex items-center gap-1">
               <Shield className="w-3 h-3 text-red-400" /> {feature}
             </span>
          ))}
        </div>
        
        <button 
          onClick={() => handleSubscribe('PREMIUM')}
          disabled={loading || success}
          className="relative overflow-hidden block w-full bg-white text-[#111111] text-xs font-black uppercase tracking-widest py-3.5 px-6 hover:bg-[#111111] hover:text-white transition-all duration-300 shadow-md group-hover:shadow-2xl cursor-pointer text-center border border-transparent hover:border-white/20 rounded-sm disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> {l.processing}</span>
          ) : success ? (
            <span className="flex items-center justify-center gap-2"><Check className="w-4 h-4" /> {l.subscribed}</span>
          ) : (
            <span className="relative z-10 flex items-center justify-center gap-2">
              <CreditCard className="w-4 h-4" /> {l.subscribeNow}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
