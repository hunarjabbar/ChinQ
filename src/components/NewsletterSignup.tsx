import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useI18n } from '../hooks/useI18n';
import { Locale } from '../types';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface NewsletterSignupProps {
  lang: Locale;
}

export function NewsletterSignup({ lang }: NewsletterSignupProps) {
  const { t } = useI18n(lang);
  const [email, setEmail] = useState('');

  const translations = {
    en: {
      title: 'Join Our Newsletter',
      description: 'Get the latest insights, exclusive analysis, and diplomatic dispatches directly in your inbox.',
      placeholder: 'Enter your email address',
      button: 'Subscribe',
      success: 'Thank you for subscribing!',
      error: 'Failed to subscribe. Please try again.',
      invalid: 'Please enter a valid email address.'
    },
    ar: {
      title: 'اشترك في نشرتنا الإخبارية',
      description: 'احصل على أحدث الرؤى والتحليلات الحصرية والرسائل الدبلوماسية مباشرة في بريدك الإلكتروني.',
      placeholder: 'أدخل عنوان بريدك الإلكتروني',
      button: 'اشتراك',
      success: 'شكرا لاشتراكك!',
      error: 'فشل الاشتراك. يرجى المحاولة مرة أخرى.',
      invalid: 'يرجى إدخال عنوان بريد إلكتروني صالح.'
    },
    zh: {
      title: '订阅我们的通讯',
      description: '直接在您的收件箱中获取最新见解、独家分析和外交快件。',
      placeholder: '输入您的电子邮件地址',
      button: '订阅',
      success: '感谢您的订阅！',
      error: '订阅失败。请重试。',
      invalid: '请输入有效的电子邮件地址。'
    },
    ckb: {
      title: 'بەشداری نامەنامەکەمان بکە',
      description: 'نوێترین تێڕوانین، شیکردنەوەی تایبەت، و نامە دیپلۆماسییەکان ڕاستەوخۆ لە ئیمەیڵەکەتدا بەدەست بهێنە.',
      placeholder: 'ئیمەیڵەکەت بنووسە',
      button: 'بەشداریکردن',
      success: 'سوپاس بۆ بەشداریکردنت!',
      error: 'بەشداریکردن سەرکەوتوو نەبوو. تکایە دووبارە هەوڵ بدەرەوە.',
      invalid: 'تکایە ئیمەیڵێکی دروست بنووسە.'
    }
  };

  const text = translations[lang] || translations.en;

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch('/api/public/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to subscribe');
      }
      return res.json();
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert(text.invalid);
      return;
    }
    subscribeMutation.mutate(email);
  };

  if (subscribeMutation.isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-paper-50 rounded-lg border border-brand-100 flex flex-col items-center justify-center text-center space-y-3">
        <CheckCircle className="w-10 h-10 text-green-600" />
        <h4 className="font-serif font-bold text-xl text-ink-900">{text.success}</h4>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <h3 className="font-serif font-bold text-xl text-ink-900 mb-2">{text.title}</h3>
        <p className="text-sm text-gray-600">{text.description}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={text.placeholder}
          disabled={subscribeMutation.isPending}
          className={`w-full bg-white border border-gray-300 rounded-md py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow ${
            lang === 'ar' || lang === 'ckb' ? 'pl-28' : 'pr-28'
          }`}
          required
        />
        <button
          type="submit"
          disabled={subscribeMutation.isPending}
          className={`absolute ${lang === 'ar' || lang === 'ckb' ? 'left-1' : 'right-1'} top-1 bottom-1 bg-brand-800 hover:bg-brand-700 text-white px-4 rounded transition-colors text-sm font-semibold flex items-center justify-center min-w-[100px] disabled:opacity-70`}
        >
          {subscribeMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              {text.button}
              <Send className={`w-4 h-4 ${lang === 'ar' || lang === 'ckb' ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </>
          )}
        </button>
      </form>
      {subscribeMutation.isError && (
        <div className="mt-3 flex items-start gap-2 text-brand-600 text-xs bg-brand-50 p-2 rounded">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>{subscribeMutation.error instanceof Error ? subscribeMutation.error.message : text.error}</p>
        </div>
      )}
    </div>
  );
}
