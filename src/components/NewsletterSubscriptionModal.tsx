import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useMutation } from '@tanstack/react-query';
import { useI18n } from '../hooks/useI18n';
import { Locale } from '../types';
import { X, Mail, CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NewsletterSubscriptionModalProps {
  lang: Locale;
  triggerDelaySeconds?: number;
  isOpen?: boolean;
  onClose?: () => void;
}

export function NewsletterSubscriptionModal({
  lang,
  triggerDelaySeconds = 5,
  isOpen: externalIsOpen,
  onClose: externalOnClose
}: NewsletterSubscriptionModalProps) {
  const { t } = useI18n(lang);
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleClose = () => {
    if (externalOnClose) {
      externalOnClose();
    } else {
      setInternalIsOpen(false);
    }
    // Remember dismissal in session storage
    sessionStorage.setItem('newsletter_modal_dismissed', 'true');
  };

  useEffect(() => {
    if (externalIsOpen !== undefined) return;

    // Check if dismissed previously in this session
    const dismissed = sessionStorage.getItem('newsletter_modal_dismissed');
    if (dismissed) return;

    const timer = setTimeout(() => {
      setInternalIsOpen(true);
    }, triggerDelaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [triggerDelaySeconds, externalIsOpen]);

  const translations = {
    en: {
      title: 'Daily Diplomatic & Enterprise Briefing',
      subtitle: 'Subscribe to receive exclusive bilateral insights, trade indices, and policy updates directly in your inbox.',
      placeholder: 'Enter your professional email',
      button: 'Subscribe Now',
      success: 'Subscription Confirmed!',
      successDesc: 'You have been successfully added to the daily executive newsletter distribution list.',
      error: 'Subscription failed. Please verify your email address.',
      invalid: 'Please enter a valid email address.',
      close: 'Continue Reading'
    },
    ar: {
      title: 'التقرير الدبلوماسي والاقتصادي اليومي',
      subtitle: 'اشترك لتلقي رؤى ثنائية حصرية، مؤشرات تجارية، وتحديثات سياسية مباشرة في بريدك الإلكتروني.',
      placeholder: 'أدخل بريدك الإلكتروني المهني',
      button: 'اشترك الآن',
      success: 'تم تأكيد الاشتراك!',
      successDesc: 'تمت إضافتك بنجاح إلى قائمة توزيع النشرة الإخبارية التنفيذية اليومية.',
      error: 'فشل الاشتراك. يرجى التحقق من عنوان بريدك الإلكتروني.',
      invalid: 'يرجى إدخال عنوان بريد إلكتروني صالح.',
      close: 'متابعة القراءة'
    },
    zh: {
      title: '每日外交与企业简报',
      subtitle: '订阅即可直接在您的收件箱中获取独家双边见解、贸易指数和政策更新。',
      placeholder: '输入您的专业电子邮箱',
      button: '立即订阅',
      success: '订阅成功！',
      successDesc: '您已成功加入每日高管通讯分发列表。',
      error: '订阅失败。请验证您的电子邮箱地址。',
      invalid: '请输入有效的电子邮箱地址。',
      close: '继续阅读'
    },
    ckb: {
      title: 'پوختەی ڕۆژانەی دیپلۆماسی و ئابووری',
      subtitle: 'بەشداری بکە بۆ بەدەستهێنانی تێڕوانینی دوولایەنەی تایبەت، پێدەرەکانی بازرگانی، و نوێکارییە سیاسییەکان ڕاستەوخۆ لە ئیمەیڵەکەتدا.',
      placeholder: 'ئیمەیڵە پیشەییەکەت بنووسە',
      button: 'بەشداریکردن ئێستا',
      success: 'بەشداریکردن پشتڕاستکرایەوە!',
      successDesc: 'بە سەرکەوتوویی بۆ لیستی بڵاوکردنەوەی نامەنامەی جێبەجێکاری ڕۆژانە زیادکرایت.',
      error: 'بەشداریکردن سەرکەوتوو نەبوو. تکایە ئیمەیڵەکەت بپشکنە.',
      invalid: 'تکایە ئیمەیڵێکی دروست بنووسە.',
      close: 'بەردەوامبوون لە خوێندنەوە'
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
    },
    onSuccess: () => {
      setSubscribed(true);
      sessionStorage.setItem('newsletter_modal_dismissed', 'true');
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

  return (
    <AnimatePresence>
      {isOpen && createPortal(
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 font-sans">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg bg-white dark:bg-neutral-900 border-t-4 border-brand-800 shadow-2xl rounded-2xl overflow-hidden p-6 md:p-8 my-auto"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 dark:text-neutral-500 hover:text-gray-700 dark:hover:text-neutral-200 transition-colors p-1"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-neutral-800 flex items-center justify-center text-brand-800 dark:text-brand-400">
                <Mail size={22} />
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-brand-800 dark:text-brand-400">
                  {lang === 'ar' ? 'خدمة الإحاطة الإخبارية' : lang === 'zh' ? '简报服务' : lang === 'ckb' ? 'خزمەتگوزاری نامەنامە' : 'Executive Dispatch'}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-brand-800 dark:text-neutral-100 tracking-tight">
                  {text.title}
                </h3>
              </div>
            </div>

            {subscribed ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/50 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                  <CheckCircle size={36} />
                </div>
                <h4 className="text-xl font-bold text-ink-900 dark:text-neutral-100">{text.success}</h4>
                <p className="text-sm text-gray-600 dark:text-neutral-300 max-w-sm mx-auto">{text.successDesc}</p>
                <button
                  onClick={handleClose}
                  className="mt-4 px-6 py-2.5 bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors"
                >
                  {text.close}
                </button>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-600 dark:text-neutral-300 mb-6 leading-relaxed">
                  {text.subtitle}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={text.placeholder}
                      disabled={subscribeMutation.isPending}
                      required
                      className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-md py-3 px-4 text-sm text-ink-900 dark:text-neutral-100 placeholder:text-gray-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white dark:focus:bg-neutral-800 transition-all"
                    />
                  </div>

                  {subscribeMutation.isError && (
                    <div className="flex items-start gap-2 text-brand-700 dark:text-brand-300 text-xs bg-brand-50 dark:bg-brand-950/40 p-3 rounded border border-brand-200 dark:border-brand-800">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <p>{subscribeMutation.error instanceof Error ? subscribeMutation.error.message : text.error}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400 hover:text-gray-800 dark:hover:text-neutral-200 transition-colors"
                    >
                      {lang === 'ar' ? 'لاحقاً' : lang === 'zh' ? '稍后' : lang === 'ckb' ? 'دواتر' : 'Maybe Later'}
                    </button>
                    <button
                      type="submit"
                      disabled={subscribeMutation.isPending}
                      className="px-6 py-2.5 bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-widest rounded transition-colors flex items-center gap-2 disabled:opacity-70"
                    >
                      {subscribeMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>{text.button}</span>
                          <Send size={14} className={lang === 'ar' || lang === 'ckb' ? 'rotate-180' : ''} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>,
        document.body
      )}
    </AnimatePresence>
  );
}
