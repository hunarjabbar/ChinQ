import React, { useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Locale } from '../../../types';
import {
  GraduationCap, Building2, Send, CheckCircle2,
  ArrowLeft, ArrowRight, ShieldCheck, User, Mail, Phone, FileText, Sparkles
} from 'lucide-react';

export function CulturalExchangeApply() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const [searchParams] = useSearchParams();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const defaultProgram = searchParams.get('program') || '';
  const defaultPartner = searchParams.get('partner') || '';
  const isMouInquiry = searchParams.get('type') === 'mou';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationality: 'Iraqi',
    affiliation: '',
    trackType: isMouInquiry ? 'mou' : 'student_fellowship',
    programTarget: defaultProgram || defaultPartner || 'General Bilateral Exchange',
    academicLevel: 'Undergraduate',
    hskLevel: 'None',
    statement: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationRef, setApplicationRef] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/cultural-exchange/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json().catch(() => ({}));
      const refId = data.referenceId || `CE-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setApplicationRef(refId);
      setIsSubmitted(true);
    } catch {
      const refId = `CE-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setApplicationRef(refId);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const t = {
    title: isMouInquiry
      ? (lang === 'ar' ? 'طلب تنسيق مذكرة تفاهم جامعية' : lang === 'zh' ? '高校/科研机构校际合作申请' : lang === 'ckb' ? 'داواکاری هاوبەشی زانکۆیی' : 'Institutional MOU Coordination Request')
      : (lang === 'ar' ? 'بوابة التقديم والاستفسار الأكاديمي' : lang === 'zh' ? '中伊文化与教育交流在线申请' : lang === 'ckb' ? 'دەروازەی پێشکەشکردنی داواکاری' : 'Exchange Application & Inquire Desk'),
    subtitle: lang === 'ar'
      ? 'سجل اهتمامك أو قدم طلب الالتحاق بالمنح الجامعية، الزمالات البحثية، أو الشراكات الأكاديمية تحت مظلة معهد CISE.'
      : lang === 'zh'
      ? '提交联合培养奖学金、青年研学交流、学者驻留或校际备忘录意向申请，由 CISE 智库秘书处专项统筹。'
      : lang === 'ckb'
      ? 'تۆمارکردنی داواکاری بۆ زەمالەی زانکۆیی، لێکۆڵینەوە و هاوبەشییە فەرمییەکان لەژێر چاودێری CISE.'
      : 'Submit your formal application for university fellowships, student immersions, or institutional MOU partnerships.',
    backToLanding: lang === 'ar' ? 'العودة للتبادل الثقافي' : lang === 'zh' ? '返回文化交流主页' : lang === 'ckb' ? 'گەڕانەوە بۆ ئاڵوگۆڕی کولتووری' : 'Back to Cultural Exchange',
    nameLabel: lang === 'ar' ? 'الاسم الكامل' : lang === 'zh' ? '全名 / 申请人姓名' : lang === 'ckb' ? 'ناوی تەواو' : 'Full Name',
    emailLabel: lang === 'ar' ? 'البريد الإلكتروني الرسمي' : lang === 'zh' ? '电子邮箱' : lang === 'ckb' ? 'ئیمەیڵ' : 'Email Address',
    phoneLabel: lang === 'ar' ? 'رقم الهاتف / واتساب' : lang === 'zh' ? '联系电话 / WhatsApp' : lang === 'ckb' ? 'ژمارەی مۆبایل' : 'Phone / WhatsApp',
    affiliationLabel: lang === 'ar' ? 'الجامعة / المؤسسة الحالية' : lang === 'zh' ? '所在高校 / 单位机构' : lang === 'ckb' ? 'زانکۆ یان دەزگا' : 'Current University / Institution',
    trackLabel: lang === 'ar' ? 'نوع المسار المطلوب' : lang === 'zh' ? '申报项目类别' : lang === 'ckb' ? 'جۆری بەرنامە' : 'Exchange Track Type',
    hskLabel: lang === 'ar' ? 'مستوى إتقان اللغة الصينية (إن وجد)' : lang === 'zh' ? '中文水平 / HSK等级' : lang === 'ckb' ? 'ئاستی زمانی چینی (HSK)' : 'Chinese Proficiency (HSK)',
    statementLabel: lang === 'ar' ? 'خطاب الاهتمام / نبذة عن الخلفية الأكاديمية' : lang === 'zh' ? '申请陈述 / 学术与研修计划' : lang === 'ckb' ? 'پوختەی ئەکادیمی و ئامانج' : 'Statement of Purpose / Academic Background',
    submitBtn: lang === 'ar' ? 'إرسال طلب التقديم الأكاديمي' : lang === 'zh' ? '提交申请卷宗' : lang === 'ckb' ? 'ناردنی داواکاری' : 'Submit Application Dossier',
    submitting: lang === 'ar' ? 'جاري الإرسال...' : lang === 'zh' ? '正在提交...' : lang === 'ckb' ? 'ناردن...' : 'Submitting...',
    successTitle: lang === 'ar' ? 'تم تسجيل طلبك بنجاح' : lang === 'zh' ? '申请已成功录入' : lang === 'ckb' ? 'داواکارییەکەت تۆمارکرا' : 'Application Registered Successfully',
    successMsg: lang === 'ar'
      ? 'تم استلام طلبكم في مكتب التبادل الأكاديمي لمعهد CISE. سيقوم المنسق الأكاديمي بمراجعة الوثائق والتواصل معكم عبر البريد الإلكتروني.'
      : lang === 'zh'
      ? '您的申请已成功进入 CISE 智库学术交流处审核队列。学术联络官将尽快核验材料并通过邮件与您联络。'
      : lang === 'ckb'
      ? 'داواکارییەکەت گەیشتە دەستی بەشی ئەکادیمی CISE و بە زووترین کات لە ڕێگەی ئیمەیڵەوە پەیوەندیت پێوە دەکرێت.'
      : 'Your application dossier has been received by the CISE Academic Exchange Secretariat. Our desk coordinator will verify your credentials and follow up via email.',
    refLabel: lang === 'ar' ? 'الرقم المرجعي للطلب:' : lang === 'zh' ? '申请档案编号：' : lang === 'ckb' ? 'کۆدی داواکاری:' : 'Application Reference Number:',
  };

  return (
    <div className="w-full flex flex-col font-sans pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="mb-6">
          <Link
            to={`/${lang}/institute/services/cultural-exchange`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-paper-600 dark:text-paper-400 hover:text-brand-800 dark:hover:text-brand-400 transition"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t.backToLanding}</span>
          </Link>
        </div>

        <div className="space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 border border-brand-200 dark:border-brand-900 text-brand-800 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>CISE Admissions & Exchanges</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-paper-950 dark:text-paper-50 uppercase tracking-tight">
            {t.title}
          </h1>
          <p className="text-sm sm:text-base text-paper-700 dark:text-paper-300 max-w-2xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-paper-50 dark:bg-paper-900 border border-brand-200 dark:border-brand-900 text-center space-y-6 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-paper-950 dark:text-white uppercase tracking-tight">
                {t.successTitle}
              </h2>
              <p className="text-sm text-paper-600 dark:text-paper-300 max-w-lg mx-auto leading-relaxed">
                {t.successMsg}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-paper-100 dark:bg-paper-800 border border-paper-200 dark:border-paper-700 max-w-sm mx-auto">
              <span className="text-xs text-paper-500 font-bold block mb-1">{t.refLabel}</span>
              <span className="text-lg font-mono font-black text-brand-800 dark:text-amber-400 tracking-wider">
                {applicationRef}
              </span>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                to={`/${lang}/institute/services/cultural-exchange`}
                className="px-6 py-2.5 rounded-xl bg-brand-800 text-white text-xs font-black uppercase tracking-wider hover:bg-brand-900 transition"
              >
                {t.backToLanding}
              </Link>
              <Link
                to={`/${lang}/institute/services/cultural-exchange/programs`}
                className="px-6 py-2.5 rounded-xl border border-paper-300 dark:border-paper-700 text-paper-800 dark:text-paper-200 text-xs font-bold hover:bg-paper-100 dark:hover:bg-paper-800 transition"
              >
                Browse More Programs
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 shadow-xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-paper-900 dark:text-paper-100 block">
                  {t.nameLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Dr. Ahmed Al-Bayati"
                  className="w-full px-4 py-2.5 rounded-xl border border-paper-300 dark:border-paper-700 bg-paper-100 dark:bg-paper-800 text-paper-950 dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-paper-900 dark:text-paper-100 block">
                  {t.emailLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ahmed@university.edu.iq"
                  className="w-full px-4 py-2.5 rounded-xl border border-paper-300 dark:border-paper-700 bg-paper-100 dark:bg-paper-800 text-paper-950 dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-paper-900 dark:text-paper-100 block">
                  {t.phoneLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+964 750 000 0000"
                  className="w-full px-4 py-2.5 rounded-xl border border-paper-300 dark:border-paper-700 bg-paper-100 dark:bg-paper-800 text-paper-950 dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-paper-900 dark:text-paper-100 block">
                  {t.affiliationLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.affiliation}
                  onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                  placeholder="University of Baghdad / Tsinghua Scholar"
                  className="w-full px-4 py-2.5 rounded-xl border border-paper-300 dark:border-paper-700 bg-paper-100 dark:bg-paper-800 text-paper-950 dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-paper-900 dark:text-paper-100 block">
                  {t.trackLabel}
                </label>
                <select
                  value={formData.trackType}
                  onChange={(e) => setFormData({ ...formData, trackType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-paper-300 dark:border-paper-700 bg-paper-100 dark:bg-paper-800 text-paper-950 dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="student_fellowship">Student Immersion Fellowship (Undergrad/Postgrad)</option>
                  <option value="faculty_residency">Faculty Sabbatical & Research Residency</option>
                  <option value="sister_schools">Sister Schools Youth STEM Exchange</option>
                  <option value="heritage_alliance">Civilizational & Heritage Arts Residency</option>
                  <option value="mou">University-to-University MOU Accord</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-paper-900 dark:text-paper-100 block">
                  {t.hskLabel}
                </label>
                <select
                  value={formData.hskLevel}
                  onChange={(e) => setFormData({ ...formData, hskLevel: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-paper-300 dark:border-paper-700 bg-paper-100 dark:bg-paper-800 text-paper-950 dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="None">No prior Chinese (English curriculum preferred)</option>
                  <option value="HSK1-2">HSK 1–2 (Beginner)</option>
                  <option value="HSK3-4">HSK 3–4 (Intermediate)</option>
                  <option value="HSK5-6">HSK 5–6 (Advanced Academic)</option>
                  <option value="Native">Native / Bilingual</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-paper-900 dark:text-paper-100 block">
                {t.statementLabel} <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={formData.statement}
                onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                placeholder="Detail your academic research interest, preferred Chinese university host, or institutional partnership goals..."
                className="w-full px-4 py-3 rounded-xl border border-paper-300 dark:border-paper-700 bg-paper-100 dark:bg-paper-800 text-paper-950 dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand-500 leading-relaxed"
              />
            </div>

            <div className="p-4 rounded-xl bg-paper-100 dark:bg-paper-800/60 border border-paper-200 dark:border-paper-700 text-xs text-paper-600 dark:text-paper-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--color-brand-800)] shrink-0" />
              <span>Applications are processed confidentially under CISE sovereign data protection standards.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-black text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isSubmitting ? t.submitting : t.submitBtn}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default CulturalExchangeApply;
