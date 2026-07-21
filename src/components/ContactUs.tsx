import { useState } from 'react';
import { Locale } from '../types';
import { Send, Loader2 } from 'lucide-react';

export function ContactUs({ lang }: { lang: Locale }) {
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
    <section className="bg-white py-16 px-6 border-t border-gray-200">
      <div className="max-w-[1024px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <div className="text-[10px] font-mono text-[#990000] uppercase tracking-widest mb-4">
              {lang === 'ar' ? 'غرفة الاتصالات' : lang === 'zh' ? '通信室' : lang === 'ckb' ? 'ژووری پەیوەندییەکان' : 'Communications Room'}
            </div>
            
            <h2 className="text-4xl font-serif font-black mb-6 text-[#111111]">
              {lang === 'ar' ? 'اتصل بنا' : lang === 'zh' ? '联系我们' : lang === 'ckb' ? 'پەیوەندیمان پێوە بکە' : 'Contact Us'}
            </h2>
            
            <p className="text-sm text-gray-600 mb-8 max-w-sm">
              {lang === 'ar' ? 'أرسل برقية (Telex) إلى مكاتبنا للاستفسارات الاستراتيجية أو مقترحات الاستثمار أو التواصل الصحفي.' : lang === 'zh' ? '向我们的分社发送电传，进行战略咨询、投资提案或新闻联络。' : lang === 'ckb' ? 'بروسکەیەک بۆ ئۆفیسەکانمان بنێرە بۆ پرسیاری ستراتیژی، پێشنیاری وەبەرهێنان یان پەیوەندی ڕۆژنامەوانی.' : 'Dispatch a telex to our bureaus for strategic inquiries, investment proposals, or press communications.'}
            </p>

            <div className="space-y-6 font-mono text-xs text-gray-600">
              <div>
                <div className="font-bold text-[#111111] uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'المقر الرئيسي (بغداد)' : lang === 'zh' ? '巴格达总部' : lang === 'ckb' ? 'ئۆفیسی سەرەکی (بەغداد)' : 'Baghdad HQ'}
                </div>
                <div>TEL: +964 1 555 1234</div>
                <div>hq@chinq.media</div>
              </div>
              <div>
                <div className="font-bold text-[#111111] uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'مكتب الصين (بكين)' : lang === 'zh' ? '北京分社' : lang === 'ckb' ? 'ئۆفیسی چین (پەکین)' : 'China Bureau (Beijing)'}
                </div>
                <div>TEL: +86 10 5555 1234</div>
                <div>beijing@chinq.media</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  {lang === 'ar' ? 'الاسم الكامل' : lang === 'zh' ? '全名' : lang === 'ckb' ? 'ناوی تەواو' : 'Full Name'}
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                  className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:outline-none focus:border-[#990000] transition-colors rounded-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  {lang === 'ar' ? 'البريد الإلكتروني' : lang === 'zh' ? '电子邮件' : lang === 'ckb' ? 'ئیمەیڵ' : 'Email Address'}
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                  className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:outline-none focus:border-[#990000] transition-colors rounded-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  {lang === 'ar' ? 'المؤسسة / الشركة' : lang === 'zh' ? '组织 / 公司' : lang === 'ckb' ? 'دامەزراوە / کۆمپانیا' : 'Organization / Company'}
                </label>
                <input
                  required
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
                  className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:outline-none focus:border-[#990000] transition-colors rounded-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  {lang === 'ar' ? 'توجيه إلى مكتب' : lang === 'zh' ? '分社' : lang === 'ckb' ? 'ئاراستەکردن بۆ ئۆفیسی' : 'Route to Bureau'}
                </label>
                <select
                  value={formData.bureau}
                  onChange={(e) => setFormData(p => ({ ...p, bureau: e.target.value }))}
                  className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:outline-none focus:border-[#990000] transition-colors rounded-none appearance-none cursor-pointer"
                >
                  <option value="general">General Inquiry</option>
                  <option value="baghdad">Baghdad HQ</option>
                  <option value="beijing">Beijing Bureau</option>
                  <option value="investment">Investment Desk</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 mt-4">
                {lang === 'ar' ? 'نص الرسالة' : lang === 'zh' ? '留言内容' : lang === 'ckb' ? 'دەقی نامە' : 'Message Text'}
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:outline-none focus:border-[#990000] transition-colors rounded-none resize-none"
              ></textarea>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400 uppercase">
                {status === 'success' && <span className="text-green-600">✓ {lang === 'ar' ? 'تم الإرسال' : lang === 'zh' ? '已发送' : lang === 'ckb' ? 'نێردرا' : 'Dispatched'}</span>}
                {status === 'error' && <span className="text-red-600">⚠ {lang === 'ar' ? 'حدث خطأ' : lang === 'zh' ? '发送失败' : lang === 'ckb' ? 'هەڵە ڕوویدا' : 'Failed'}</span>}
              </span>
              
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center gap-2 bg-[#111111] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#990000] transition-colors disabled:opacity-50 cursor-pointer"
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
