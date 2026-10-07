import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useI18n } from '../hooks/useI18n';
import { Locale } from '../types';
import { Send, CheckCircle, AlertCircle, Loader2, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface NewsletterSignupProps {
  lang: Locale;
}

export function NewsletterSignup({ lang }: NewsletterSignupProps) {
  const { t } = useI18n(lang);
  const [email, setEmail] = useState('');

  const translations = {
    en: {
      badge: 'Sovereign Dispatches & Intelligence Wire',
      title: 'Subscribe to Diplomatic & Trade Intelligence',
      description: 'Receive weekly macroeconomic reports, currency settlement updates (IQD/RMB), infrastructure pipeline briefings, and exclusive strategic analyses.',
      placeholder: 'Enter official or institutional email...',
      button: 'Subscribe Now',
      success: 'Subscription Verified. Welcome to the ICA Intelligence Wire.',
      successDesc: 'You will receive strategic diplomatic dispatches and market intelligence directly to your inbox.',
      error: 'Failed to subscribe. Please verify your connection and try again.',
      invalid: 'Please enter a valid official email address.',
      securityNotice: 'Encrypted via 256-bit TLS • Zero Spam Policy • Unsubscribe anytime',
      resetBtn: 'Subscribe another email'
    },
    ar: {
      badge: 'النشرة الدبلوماسية والموجز الاقتصادي السيادي',
      title: 'اشترك في النشرة الإخبارية والتحليلات الاستراتيجية',
      description: 'احصل أسبوعياً على مؤشرات تسوية العملات (الدينار/اليوان)، تقارير مشاريع البنية التحتية، والتحليلات الاقتصادية الحصرية مباشرة في بريدك.',
      placeholder: 'أدخل بريدك الإلكتروني المؤسسي أو الشخصي...',
      button: 'اشتراك فوري',
      success: 'تم تأكيد الاشتراك بنجاح في شبكة النشرات الاستراتيجية.',
      successDesc: 'ستصلك الرسائل الدبلوماسية والتحليلات الاقتصادية المعتمدة بصورة دورية.',
      error: 'تعذر إتمام الاشتراك، يرجى إعادة المحاولة.',
      invalid: 'يرجى إدخال بريد إلكتروني صحيح ومعتمد.',
      securityNotice: 'قناة مشفرة ببروتوكول TLS السيادي • التزام تام بالخصوصية وعدم إرسال إعلانات',
      resetBtn: 'تسجيل بريد إلكتروني آخر'
    },
    zh: {
      badge: '主权简报与双边战略经贸专报',
      title: '订阅伊中经贸与战略研究情报简讯',
      description: '每周定期获取伊中双边本币结算进展（IQD/RMB）、基建重点走廊情报、宏观经济指数及智库独家内参。',
      placeholder: '请输入官方或企业机构电子邮箱...',
      button: '立即订阅',
      success: '订阅成功！欢迎加入伊中通讯社战略情报网络。',
      successDesc: '权威双边经贸内参与外交快讯将定期发送至您的收件箱。',
      error: '订阅失败，请检查网络连接后重试。',
      invalid: '请输入格式正确的有效电子邮箱。',
      securityNotice: '256位主权加密传输 • 严格隐私保护与零垃圾邮件政策',
      resetBtn: '订阅其他邮箱'
    },
    ckb: {
      badge: 'نامەی دیپلۆماسی و هەواڵگری ئابووری',
      title: 'بەشداری بکە لە نامەی ستراتیژی و شیکاری ئابووری',
      description: 'هەفتانە نوێترین ڕاپۆرتی پاکتاوی دراوەکان (IQD/RMB)، پڕۆژەکانی ژێرخان و شیکاری تایبەت وەربگرە.',
      placeholder: 'ئیمەیڵی فەرمی بنووسە...',
      button: 'بەشداریکردن',
      success: 'بەشداریکردن بەسەرکەوتوویی تۆمارکرا.',
      successDesc: 'ڕاپۆرتە دیپلۆماسی و ئابوورییەکان ڕاستەوخۆ دەگەنە ئیمەیڵەکەت.',
      error: 'هەڵەیەک ڕوویدا، تکایە دووبارە هەوڵ بدەرەوە.',
      invalid: 'تکایە ئیمەیڵێکی دروست بنووسە.',
      securityNotice: 'پارێزراوە بە سیستەمی ئاسایشی ئەلیکترۆنی • ڕێزگرتن لە تایبەتمەندی',
      resetBtn: 'تۆمارکردنی ئیمەیڵێکی تر'
    }
  };

  const text = translations[lang] || translations.en;

  const subscribeMutation = useMutation({
    mutationFn: async (targetEmail: string) => {
      const path = 'newsletter_subscribers';
      try {
        const docRef = await addDoc(collection(db, path), {
          email: targetEmail.trim().toLowerCase(),
          lang,
          source: 'global_footer_wire',
          timestamp: serverTimestamp()
        });
        return { id: docRef.id };
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path);
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || email.length < 5) {
      alert(text.invalid);
      return;
    }
    subscribeMutation.mutate(email);
  };

  const handleReset = () => {
    setEmail('');
    subscribeMutation.reset();
  };

  if (subscribeMutation.isSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 sm:p-8 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-neutral-900 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-sm flex flex-col items-center justify-center text-center space-y-3 transition-all duration-300">
        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-black text-base sm:text-lg text-neutral-900 dark:text-neutral-100">
            {text.success}
          </h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
            {text.successDesc}
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="mt-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
        >
          {text.resetBtn}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-gradient-to-b from-white to-slate-50 dark:from-neutral-900 dark:to-neutral-900/80 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-neutral-800 shadow-xs relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center text-center space-y-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800/40 text-[11px] font-black uppercase tracking-wider text-brand-800 dark:text-rose-400">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>{text.badge}</span>
        </div>
        <h3 className="font-black text-lg sm:text-xl text-neutral-900 dark:text-white tracking-tight">
          {text.title}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
          {text.description}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="relative z-10 max-w-xl mx-auto">
        <div className="relative flex flex-col sm:flex-row items-center gap-2 sm:gap-0 bg-white dark:bg-neutral-800 p-1.5 rounded-xl border-2 border-slate-200 dark:border-neutral-700 focus-within:border-brand-800 dark:focus-within:border-brand-600 shadow-xs transition-all">
          <div className="flex items-center gap-2 pl-3 rtl:pl-0 rtl:pr-3 w-full sm:w-auto flex-1">
            <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={text.placeholder}
              disabled={subscribeMutation.isPending}
              className="w-full bg-transparent py-2.5 px-1 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-hidden disabled:opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            disabled={subscribeMutation.isPending}
            className="w-full sm:w-auto bg-brand-800 hover:bg-brand-700 active:bg-brand-900 text-white px-5 py-3 rounded-lg transition-all duration-200 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-60"
          >
            {subscribeMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>{text.button}</span>
                <Send className={`w-3.5 h-3.5 ${lang === 'ar' || lang === 'ckb' ? 'rotate-180' : ''}`} />
              </>
            )}
          </button>
        </div>

        {/* Security & Confidentiality Badge */}
        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{text.securityNotice}</span>
        </div>
      </form>

      {subscribeMutation.isError && (
        <div className="mt-4 max-w-xl mx-auto flex items-start gap-2 text-rose-700 dark:text-rose-400 text-xs bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 p-3 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>{subscribeMutation.error instanceof Error ? subscribeMutation.error.message : text.error}</p>
        </div>
      )}
    </div>
  );
}

