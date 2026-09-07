import { useState } from 'react';
import { Locale } from '../types';
import { useSiteStore } from '../store/useSiteStore';
import { Send, Loader2 } from 'lucide-react';

export function ContactUs({ lang }: { lang: Locale }) {
  const { contactEmail } = useSiteStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    bureau: 'general',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/public/telexes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          telexRef: `MSG-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`
        })
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      setStatus('success');
      setFormData({ name: '', email: '', company: '', bureau: 'general', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="w-full bg-white dark:bg-neutral-900 border-2 border-brand-800 p-4 sm:p-6 md:p-8 rounded-xs shadow-xs">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <div className="text-[10px] font-mono text-brand-800 dark:text-brand-400 uppercase tracking-widest mb-3">
              {lang === 'ar' ? 'غرفة الاتصالات' : lang === 'zh' ? '通信室' : lang === 'ckb' ? 'ژووری پەیوەندییەکان' : 'Communications Room'}
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-serif font-black mb-4 text-ink-900 dark:text-neutral-100">
              {lang === 'ar' ? 'اتصل بنا' : lang === 'zh' ? '联系我们' : lang === 'ckb' ? 'پەیوەندیمان پێوە بکە' : 'Contact Us'}
            </h2>
            
            <p className="text-sm text-gray-600 dark:text-neutral-300 mb-8 max-w-sm">
              {lang === 'ar' ? 'أرسل برقية (Telex) إلى مكاتبنا للاستفسارات الاستراتيجية أو مقترحات الاستثمار أو التواصل الصحفي.' : lang === 'zh' ? '向我们的分社发送电传，进行战略咨询、投资提案或新闻联络。' : lang === 'ckb' ? 'بروسکەیەک بۆ ئۆفیسەکانمان بنێرە بۆ پرسیاری ستراتیژی، پێشنیاری وەبەرهێنان یان پەیوەندی ڕۆژنامەوانی.' : 'Dispatch a telex to our bureaus for strategic inquiries, investment proposals, or press communications.'}
            </p>

            <div className="space-y-5 font-mono text-xs text-gray-600 dark:text-neutral-400">
              <div>
                <div className="font-bold text-ink-900 dark:text-neutral-100 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'المقر الرئيسي (بغداد)' : lang === 'zh' ? '巴格达总部' : lang === 'ckb' ? 'ئۆفیسی سەرەکی (بەغداد)' : 'Baghdad HQ'}
                </div>
                <div>TEL: +964 1 555 1234</div>
                <div>{contactEmail}</div>
              </div>
              <div>
                <div className="font-bold text-ink-900 dark:text-neutral-100 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'مكتب الصين (بكين)' : lang === 'zh' ? '北京分社' : lang === 'ckb' ? 'ئۆفیسی چین (پەکین)' : 'China Bureau (Beijing)'}
                </div>
                <div>TEL: +86 10 5555 1234</div>
                <div>beijing@iraqi-chineseagency.com</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-1">
                  {lang === 'ar' ? 'الاسم الكامل' : lang === 'zh' ? '全名' : lang === 'ckb' ? 'ناوی تەواو' : 'Full Name'}
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                  className="w-full border-b border-gray-300 dark:border-neutral-700 bg-transparent py-2 text-sm text-ink-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800 dark:focus:border-brand-400 transition-colors rounded-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-1">
                  {lang === 'ar' ? 'البريد الإلكتروني' : lang === 'zh' ? '电子邮件' : lang === 'ckb' ? 'ئیمەیڵ' : 'Email Address'}
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                  className="w-full border-b border-gray-300 dark:border-neutral-700 bg-transparent py-2 text-sm text-ink-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800 dark:focus:border-brand-400 transition-colors rounded-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-1">
                  {lang === 'ar' ? 'المؤسسة / الشركة' : lang === 'zh' ? '组织 / 公司' : lang === 'ckb' ? 'دامەزراوە / کۆمپانیا' : 'Organization / Company'}
                </label>
                <input
                  required
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
                  className="w-full border-b border-gray-300 dark:border-neutral-700 bg-transparent py-2 text-sm text-ink-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800 dark:focus:border-brand-400 transition-colors rounded-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-1">
                  {lang === 'ar' ? 'توجيه إلى مكتب' : lang === 'zh' ? '分社' : lang === 'ckb' ? 'ئاراستەکردن بۆ ئۆفیسی' : 'Route to Bureau'}
                </label>
                <select
                  value={formData.bureau}
                  onChange={(e) => setFormData(p => ({ ...p, bureau: e.target.value }))}
                  className="w-full border-b border-gray-300 dark:border-neutral-700 bg-transparent py-2 text-sm text-ink-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800 dark:focus:border-brand-400 transition-colors rounded-none appearance-none cursor-pointer dark:bg-neutral-900"
                >
                  <option value="general" className="dark:bg-neutral-800 dark:text-neutral-100">General Inquiry</option>
                  <option value="baghdad" className="dark:bg-neutral-800 dark:text-neutral-100">Baghdad HQ</option>
                  <option value="beijing" className="dark:bg-neutral-800 dark:text-neutral-100">Beijing Bureau</option>
                  <option value="investment" className="dark:bg-neutral-800 dark:text-neutral-100">Investment Desk</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-1 mt-3">
                {lang === 'ar' ? 'نص الرسالة' : lang === 'zh' ? '留言内容' : lang === 'ckb' ? 'دەقی نامە' : 'Message Text'}
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                className="w-full border-b border-gray-300 dark:border-neutral-700 bg-transparent py-2 text-sm text-ink-900 dark:text-neutral-100 focus:outline-none focus:border-brand-800 dark:focus:border-brand-400 transition-colors rounded-none resize-none"
              ></textarea>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400 uppercase">
                {status === 'success' && <span className="text-green-600 dark:text-green-400">✓ {lang === 'ar' ? 'تم الإرسال' : lang === 'zh' ? '已发送' : lang === 'ckb' ? 'نێردرا' : 'Dispatched'}</span>}
                {status === 'error' && <span className="text-brand-600 dark:text-brand-400">⚠ {lang === 'ar' ? 'حدث خطأ' : lang === 'zh' ? '发送失败' : lang === 'ckb' ? 'هەڵە ڕوویدا' : 'Failed'}</span>}
              </span>
              
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center gap-2 bg-brand-800 text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-brand-900 transition-colors disabled:opacity-50 cursor-pointer rounded-xs"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {lang === 'ar' ? 'إرسال برقية' : lang === 'zh' ? '发送电传' : lang === 'ckb' ? 'ناردنی بروسکە' : 'Send Telex'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
