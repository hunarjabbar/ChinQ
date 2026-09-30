import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../../types';
import {
  Building2, Mail, Phone, MapPin, Send, CheckCircle2,
  ArrowLeft, ArrowRight, ShieldCheck, Globe, Clock
} from 'lucide-react';

export function CulturalExchangeContact() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Exchange Inquiry',
    bureau: 'baghdad',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const offices = [
    {
      cityEn: 'Baghdad Academic Liaison',
      cityAr: 'مكتب الاتصال الأكاديمي ببغداد',
      cityZh: '巴格达学术联络处',
      cityCkb: 'نووسینگەی ئەکادیمی بەغدا',
      addressEn: 'Al-Jadriya Diplomatic Quarter, Academic Syndicate Wing, Baghdad, Iraq',
      addressAr: 'حي الجادرية الدبلوماسي، جناح المجمع الأكاديمي، بغداد، العراق',
      addressZh: '伊拉克巴格达贾德里亚外交区学术联盟大楼',
      addressCkb: 'گەڕەکی جادریەی دیپلۆماسی، باڵیۆزخانەی ئەکادیمی، بەغدا',
      email: 'baghdad.exchange@cises.org.iq',
      phone: '+964 1 719 4820',
      hours: 'Sun – Thu: 09:00 – 16:30 (AST)'
    },
    {
      cityEn: 'Beijing Bilateral Secretariat',
      cityAr: 'الأمانة العامة الثنائية ببكين',
      cityZh: '北京双边秘书处',
      cityCkb: 'سکرتاریەتی دوولایەنەی بەکین',
      addressEn: 'Haidian University District, International Exchange Centre, Beijing, PR China',
      addressAr: 'منطقة هايديان الجامعية، مركز التبادل الدولي، بكين، جمهورية الصين الشعبية',
      addressZh: '中国北京市海淀区大学园区国际交流中心',
      addressCkb: 'ناوچەی زانکۆیی هایدیان، سەنتەری ئاڵوگۆڕی نێودەوڵەتی، بەکین',
      email: 'beijing.exchange@cises.org.iq',
      phone: '+86 10 6278 1900',
      hours: 'Mon – Fri: 09:00 – 17:30 (CST)'
    },
    {
      cityEn: 'Sulaymaniyah Institute Centre',
      cityAr: 'مركز المعهد بالسليمانية',
      cityZh: '苏莱曼尼亚智库中心',
      cityCkb: 'سەنتەری پەیمانگا لە سلێمانی',
      addressEn: 'Malik Mahmood Ring Road, Chinese Language & Academic Hub, Sulaymaniyah, Kurdistan Region',
      addressAr: 'شارع الملك محمود الدائري، مجمع اللغة الصينية والبحث العلمي، السليمانية',
      addressZh: '伊拉克库区苏莱曼尼亚马利克·马哈茂德环路中文与学术研创基地',
      addressCkb: 'شەقامی بازنەیی مەلیک مەحموود، سەنتەری زمانی چینی و ئەکادیمی، سلێمانی',
      email: 'sulaymaniyah.exchange@cises.org.iq',
      phone: '+964 770 148 2000',
      hours: 'Sat – Thu: 09:00 – 18:00 (AST)'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const t = {
    title: lang === 'ar' ? 'مكاتب التنسيق والاتصال الأكاديمي' : lang === 'zh' ? '中伊学术与人文交流联络处' : lang === 'ckb' ? 'نووسینگەی هەماهەنگی و پەیوەندی ئەکادیمی' : 'Academic Liaison & Consular Desks',
    subtitle: lang === 'ar' ? 'تواصل مع مكاتبنا في بغداد وبكين والسليمانية لتنسيق الشراكات الجامعية والمنح الدراسية.' : lang === 'zh' ? '欢迎联络巴格达、北京与苏莱曼尼亚联络处，洽询高校备忘录签署、公派留学及研学交流。' : lang === 'ckb' ? 'پەیوەندی بە نووسینگەکانی بەغدا، بەکین و سلێمانی بکە بۆ هاوبەشی زانکۆیی و زەمالە.' : 'Direct institutional coordination channels linking Iraqi universities with Chinese academic leaders.',
    backToLanding: lang === 'ar' ? 'العودة للتبادل الثقافي' : lang === 'zh' ? '返回文化交流主页' : lang === 'ckb' ? 'گەڕانەوە بۆ ئاڵوگۆڕی کولتووری' : 'Back to Cultural Exchange',
    formHeading: lang === 'ar' ? 'إرسال استفسار أكاديمي مباشر' : lang === 'zh' ? '在线发送学术咨询信函' : lang === 'ckb' ? 'ناردنی نامەی ڕاستەوخۆ' : 'Direct Academic Inquiry',
    name: lang === 'ar' ? 'الاسم واللقب' : lang === 'zh' ? '姓名' : lang === 'ckb' ? 'ناو' : 'Full Name',
    email: lang === 'ar' ? 'البريد الإلكتروني' : lang === 'zh' ? '电子邮箱' : lang === 'ckb' ? 'ئیمەیڵ' : 'Email Address',
    bureau: lang === 'ar' ? 'المكتب المستهدف' : lang === 'zh' ? '受理联络处' : lang === 'ckb' ? 'نووسینگەی مەبەست' : 'Target Bureau Desk',
    message: lang === 'ar' ? 'تفاصيل الرسالة أو الاستفسار' : lang === 'zh' ? '咨询内容 / 合作提案' : lang === 'ckb' ? 'دەقی نامە' : 'Message / Inquiry Details',
    sendBtn: lang === 'ar' ? 'إرسال الرسالة للأمانة الأكاديمية' : lang === 'zh' ? '发送咨询信函' : lang === 'ckb' ? 'ناردنی نامە' : 'Send Message to Secretariat',
    successMsg: lang === 'ar' ? 'تم استلام رسالتكم، سيتم الرد عبر البريد خلال ٢٤ ساعة عمل.' : lang === 'zh' ? '您的信函已送达学术秘书处，我们将在24个工作小时内予以正式答复。' : lang === 'ckb' ? 'نامەکەت گەیشت، لە ماوەی ٢٤ کاتژمێردا وەڵامت دەدرێتەوە.' : 'Your message has been delivered to the academic secretariat. We will respond within 24 business hours.',
  };

  return (
    <div className="w-full flex flex-col font-sans pb-20">
      {/* SUBNAV STRIP */}
      <div className="bg-[#0B1120] border-b border-white/10 sticky top-[92px] sm:top-[104px] lg:top-[120px] z-30 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 h-11">
          <div className="flex items-center gap-1 sm:gap-2 text-xs font-bold whitespace-nowrap">
            <Link to={`/${lang}/institute/services/cultural-exchange`} className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5">
              {lang === 'ar' ? 'نظرة عامة' : lang === 'zh' ? '概览' : lang === 'ckb' ? 'پوختە' : 'Overview'}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/programs`} className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5">
              {lang === 'ar' ? 'دليل البرامج' : lang === 'zh' ? '全部项目' : lang === 'ckb' ? 'بەرنامەکان' : 'All Programs'}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/partners`} className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5">
              {lang === 'ar' ? 'الجامعات الشريكة' : lang === 'zh' ? '合作院校' : lang === 'ckb' ? 'زانکۆ هاوبەشەکان' : 'Partner Universities'}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/apply`} className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5">
              {lang === 'ar' ? 'طلب التقديم' : lang === 'zh' ? '在线申请' : lang === 'ckb' ? 'داواکاری' : 'Apply / Inquire'}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/faq`} className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5">
              {lang === 'ar' ? 'الأسئلة الشائعة' : lang === 'zh' ? '常见问题' : lang === 'ckb' ? 'پرسیارە باوەکان' : 'FAQ'}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/contact`} className="px-3 py-1.5 rounded-lg bg-[var(--color-brand-800)]/20 text-[var(--color-brand-800)]">
              {lang === 'ar' ? 'مكتب الاتصال' : lang === 'zh' ? '学术联络' : lang === 'ckb' ? 'پەیوەندی' : 'Academic Contact'}
            </Link>
          </div>
          <Link
            to={`/${lang}/institute/services/cultural-exchange`}
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-[var(--color-brand-800)] hover:underline"
          >
            <span>{t.backToLanding}</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="mb-6">
          <Link
            to={`/${lang}/institute/services/cultural-exchange`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-paper-600 dark:text-paper-400 hover:text-brand-800 dark:hover:text-brand-400 transition"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t.backToLanding}</span>
          </Link>
        </div>

        <div className="space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 border border-brand-200 dark:border-brand-900 text-brand-800 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>CISE Global Desks</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-paper-950 dark:text-paper-50 uppercase tracking-tight">
            {t.title}
          </h1>
          <p className="text-sm sm:text-base text-paper-700 dark:text-paper-300 max-w-2xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {offices.map((office, idx) => {
            const cityName = lang === 'ar' ? office.cityAr : lang === 'zh' ? office.cityZh : lang === 'ckb' ? office.cityCkb : office.cityEn;
            const address = lang === 'ar' ? office.addressAr : lang === 'zh' ? office.addressZh : lang === 'ckb' ? office.addressCkb : office.addressEn;

            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 shadow-xs hover:shadow-lg transition space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-paper-950 dark:text-white uppercase">{cityName}</h3>
                  <Building2 className="w-5 h-5 text-[var(--color-brand-800)]" />
                </div>

                <div className="space-y-2 text-xs text-paper-600 dark:text-paper-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-paper-400 shrink-0 mt-0.5" />
                    <span>{address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-paper-400 shrink-0" />
                    <span className="font-mono text-brand-800 dark:text-amber-400">{office.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-paper-400 shrink-0" />
                    <span>{office.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-paper-500">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{office.hours}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 shadow-xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-paper-950 dark:text-white uppercase tracking-tight">
              {t.formHeading}
            </h2>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <p className="text-sm font-bold text-paper-900 dark:text-paper-100">{t.successMsg}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-paper-900 dark:text-paper-100 block">{t.name}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-paper-300 dark:border-paper-700 bg-paper-100 dark:bg-paper-800 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-paper-900 dark:text-paper-100 block">{t.email}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-paper-300 dark:border-paper-700 bg-paper-100 dark:bg-paper-800 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-paper-900 dark:text-paper-100 block">{t.bureau}</label>
                <select
                  value={formData.bureau}
                  onChange={(e) => setFormData({ ...formData, bureau: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-paper-300 dark:border-paper-700 bg-paper-100 dark:bg-paper-800 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="baghdad">Baghdad Academic Liaison Bureau</option>
                  <option value="beijing">Beijing Bilateral Secretariat</option>
                  <option value="sulaymaniyah">Sulaymaniyah Institute Centre</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-paper-900 dark:text-paper-100 block">{t.message}</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-paper-300 dark:border-paper-700 bg-paper-100 dark:bg-paper-800 text-sm outline-none focus:ring-2 focus:ring-brand-500 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
              >
                <span>{t.sendBtn}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default CulturalExchangeContact;
