import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { Locale } from '../../../types';
import { ccTranslations } from './translations';
import { 
  ArrowLeft, 
  CheckCircle, 
  ShieldCheck, 
  Calendar, 
  Search, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  BookOpen, 
  Award,
  ArrowRight,
  UserCheck,
  Languages,
  Send
} from 'lucide-react';

interface SubviewProps {
  lang: Locale;
  view: 'enroll' | 'courses' | 'testing' | 'testing-register' | 'certificates' | 'instructors' | 'instructor-detail' | 'faq' | 'contact';
}

export function ChineseCenterModalViews({ lang, view }: SubviewProps) {
  const t = ccTranslations[lang] || ccTranslations.en;
  const isRtl = lang === 'ar' || lang === 'ckb';
  const [searchParams] = useSearchParams();
  const { id: instructorId } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  // Form states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [certInput, setCertInput] = useState('');
  const [certResult, setCertResult] = useState<{ verified: boolean; message: string } | null>(null);

  const selectedLevel = searchParams.get('level') || searchParams.get('track') || searchParams.get('session') || 'HSK 1';

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certInput.trim()) return;
    setCertResult({
      verified: true,
      message: lang === 'ar' ? `الشهادة رقم ${certInput.trim()} موثقة وصادرة عن معهد CISE بالسليمانية بمعدل اجتياز رسمي.` :
               lang === 'ckb' ? `بڕوانامەی ژمارە ${certInput.trim()} باوەڕپێکراوە و لەلایەن پەیمانگای CISE لە سلێمانی دەرکراوە.` :
               lang === 'zh' ? `证书编号 ${certInput.trim()} 验证真实有效，由苏莱曼尼亚CISE中国中心官方颁发。` :
               `Certificate ${certInput.trim()} is verified authentic and officially registered with CISE Chinese Centre, Sulaymaniyah.`
    });
  };

  return (
    <div className="py-12 bg-surface dark:bg-neutral-950 min-h-[60vh]" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb back to landing */}
        <div className="mb-8">
          <Link
            to={`/${lang}/institute/chinese-center`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-royal hover:text-brand-800 transition-colors"
          >
            <ArrowLeft size={16} className="rtl:rotate-180" />
            <span>{lang === 'ar' ? 'العودة إلى المركز الصيني' : lang === 'ckb' ? 'گەڕانەوە بۆ ناوەندی چینی' : lang === 'zh' ? '返回中国中心首页' : 'Back to Chinese Centre'}</span>
          </Link>
        </div>

        {/* View 1: ENROLL */}
        {view === 'enroll' && (
          <div className="bg-card dark:bg-neutral-900 border border-border dark:border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-lg">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400 block mb-2">
                {t.heroEyebrow}
              </span>
              <h1 className="text-3xl font-black text-navy dark:text-white uppercase tracking-tight mb-2">
                {t.enrollTitle}
              </h1>
              <p className="text-sm text-navy/70 dark:text-neutral-400">
                {t.enrollSubtitle}
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 space-y-3">
                <div className="flex items-center gap-2 font-bold text-base">
                  <CheckCircle size={20} />
                  <span>{lang === 'ar' ? 'تم استلام الطلب' : lang === 'ckb' ? 'داواکاری وەرگیرا' : lang === 'zh' ? '申请已成功提交' : 'Application Received'}</span>
                </div>
                <p className="text-sm leading-relaxed">{t.enrollSuccess}</p>
                <div className="pt-2">
                  <Link
                    to={`/${lang}/institute/chinese-center`}
                    className="inline-flex items-center text-xs font-bold text-royal hover:underline"
                  >
                    <span>{lang === 'ar' ? 'العودة للرئيسية' : lang === 'ckb' ? 'گەڕانەوە بۆ سەرەتا' : lang === 'zh' ? '返回首页' : 'Return to Home'}</span>
                    <ArrowRight size={14} className="ms-1 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnrollSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy dark:text-white mb-2">
                    {t.enrollNameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="Alan Qadir"
                    className="w-full px-4 py-3 rounded-lg border border-border dark:border-neutral-700 bg-surface dark:bg-neutral-800 text-sm text-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-royal"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy dark:text-white mb-2">
                      {t.enrollEmailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      defaultValue="student@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-border dark:border-neutral-700 bg-surface dark:bg-neutral-800 text-sm text-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-royal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy dark:text-white mb-2">
                      {t.enrollPhoneLabel}
                    </label>
                    <input
                      type="tel"
                      required
                      defaultValue="+964 770 123 4567"
                      className="w-full px-4 py-3 rounded-lg border border-border dark:border-neutral-700 bg-surface dark:bg-neutral-800 text-sm text-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-royal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy dark:text-white mb-2">
                    {t.enrollLevelLabel}
                  </label>
                  <select
                    defaultValue={selectedLevel}
                    className="w-full px-4 py-3 rounded-lg border border-border dark:border-neutral-700 bg-surface dark:bg-neutral-800 text-sm text-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-royal"
                  >
                    <option value="hsk-1">HSK 1 (Elementary / 500 Words)</option>
                    <option value="hsk-2">HSK 2 (Elementary / 772 Words)</option>
                    <option value="hsk-3">HSK 3 (Intermediate / 973 Words)</option>
                    <option value="hsk-4">HSK 4 (Intermediate / 1,000 Words)</option>
                    <option value="hsk-5">HSK 5 (Advanced / 1,071 Words)</option>
                    <option value="hsk-6">HSK 6 (Advanced / 1,140 Words)</option>
                    <option value="hsk-7-9">HSK 7–9 (Advanced / 5,636 Words)</option>
                    <option value="hskk">HSKK Spoken Fluency Track</option>
                    <option value="yct">YCT 1–4 Youth Chinese</option>
                    <option value="business">Executive Business Chinese</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-brand-800 hover:bg-brand-700 rounded-lg shadow transition-colors"
                >
                  <Send size={15} className="me-2" />
                  <span>{t.enrollSubmit}</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* View 2: COURSES */}
        {view === 'courses' && (
          <div className="space-y-8">
            <div className="bg-card dark:bg-neutral-900 border border-border dark:border-neutral-800 rounded-2xl p-8 shadow-sm">
              <h1 className="text-3xl font-black text-navy dark:text-white uppercase tracking-tight mb-2">
                {t.coursesTitle}
              </h1>
              <p className="text-navy/70 dark:text-neutral-400 text-sm">
                {t.coursesSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6', 'HSK 7–9', 'Business Chinese'].map((courseName, i) => (
                <div key={i} className="p-6 rounded-xl bg-card dark:bg-neutral-900 border border-border dark:border-neutral-800">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-navy dark:text-white">{courseName}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-royal/10 text-royal font-bold">Standard</span>
                  </div>
                  <p className="text-xs text-navy/70 dark:text-neutral-400 mb-4 leading-relaxed">
                    {lang === 'ar' ? 'منهج أكاديمي شامل يشمل القراءة، والاستماع، والكتابة التفاعلية بمختبرات الصوت.' :
                     lang === 'ckb' ? 'پرۆگرامی ئەکادیمی گشتگیر کە خوێندنەوە، گوێگرتن، و نووسینی دەنگ لەخۆدەگرێت.' :
                     lang === 'zh' ? '涵盖听说读写各维度语言综合运用能力培养及针对性真题解析。' :
                     'Comprehensive academic curriculum combining interactive listening labs, grammar syntax, and authentic testing practice.'}
                  </p>
                  <Link
                    to={`/${lang}/institute/chinese-center/enroll?level=${encodeURIComponent(courseName)}`}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand-800 dark:text-brand-400 hover:underline"
                  >
                    <span>{t.hskViewCourse} & {t.heroPrimaryCta}</span>
                    <ArrowRight size={14} className="ms-1 rtl:rotate-180" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View 3 & 4: TESTING & REGISTER */}
        {(view === 'testing' || view === 'testing-register') && (
          <div className="bg-card dark:bg-neutral-900 border border-border dark:border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-lg">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-black uppercase tracking-widest text-royal block mb-2">
                {t.testingOfficialBadge}
              </span>
              <h1 className="text-3xl font-black text-navy dark:text-white uppercase tracking-tight mb-2">
                {t.testingRegisterCta}
              </h1>
              <p className="text-sm text-navy/70 dark:text-neutral-400">
                {t.testingBody}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-xs">
              <div className="p-4 rounded-xl bg-surface dark:bg-neutral-800 border border-border dark:border-neutral-700">
                <Calendar size={18} className="text-royal mb-2" />
                <strong className="block text-navy dark:text-white mb-1">{t.testingNextDate}</strong>
                <span className="text-neutral-500">Registration deadline: Oct 20, 2026</span>
              </div>
              <div className="p-4 rounded-xl bg-surface dark:bg-neutral-800 border border-border dark:border-neutral-700">
                <ShieldCheck size={18} className="text-brand-800 mb-2" />
                <strong className="block text-navy dark:text-white mb-1">Standardized Invigilation</strong>
                <span className="text-neutral-500">Authorized center code: IQ-SU-004</span>
              </div>
              <div className="p-4 rounded-xl bg-surface dark:bg-neutral-800 border border-border dark:border-neutral-700">
                <Award size={18} className="text-gold mb-2" />
                <strong className="block text-navy dark:text-white mb-1">Score Verification</strong>
                <span className="text-neutral-500">Authenticated via Chinese MOE portal</span>
              </div>
            </div>

            <form onSubmit={handleEnrollSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy dark:text-white mb-2">
                    Candidate Legal Name (as on Passport)
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="Kawa Rasheed"
                    className="w-full px-4 py-3 rounded-lg border border-border dark:border-neutral-700 bg-surface dark:bg-neutral-800 text-sm text-navy dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy dark:text-white mb-2">
                    Passport / National ID Number
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="A12948301"
                    className="w-full px-4 py-3 rounded-lg border border-border dark:border-neutral-700 bg-surface dark:bg-neutral-800 text-sm text-navy dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy dark:text-white mb-2">
                  Test Type & Level
                </label>
                <select className="w-full px-4 py-3 rounded-lg border border-border dark:border-neutral-700 bg-surface dark:bg-neutral-800 text-sm text-navy dark:text-white">
                  <option>HSK 1 (Paper & Computer)</option>
                  <option>HSK 2 (Paper & Computer)</option>
                  <option>HSK 3 (Paper & Computer)</option>
                  <option>HSK 4 (Paper & Computer)</option>
                  <option>HSK 5 (Paper & Computer)</option>
                  <option>HSK 6 (Paper & Computer)</option>
                  <option>HSKK Speaking (Elementary / Intermediate / Advanced)</option>
                  <option>YCT Youth Chinese Test</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-brand-800 hover:bg-brand-700 rounded-lg shadow transition-colors"
              >
                <span>{t.testingRegisterCta}</span>
                <ArrowRight size={14} className="ms-2 rtl:rotate-180" />
              </button>
            </form>
          </div>
        )}

        {/* View 5: CERTIFICATES */}
        {view === 'certificates' && (
          <div className="bg-card dark:bg-neutral-900 border border-border dark:border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-lg">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-black uppercase tracking-widest text-gold block mb-2">
                {t.testingQrBadge}
              </span>
              <h1 className="text-3xl font-black text-navy dark:text-white uppercase tracking-tight mb-2">
                {t.verifyTitle}
              </h1>
              <p className="text-sm text-navy/70 dark:text-neutral-400">
                {t.verifySubtitle}
              </p>
            </div>

            <form onSubmit={handleVerify} className="max-w-xl space-y-4 mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-navy dark:text-white">
                {t.verifyInputLabel}
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  placeholder="CISE-HSK-2026-0841"
                  className="flex-1 px-4 py-3 rounded-lg border border-border dark:border-neutral-700 bg-surface dark:bg-neutral-800 text-sm text-navy dark:text-white"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-brand-800 hover:bg-brand-700 rounded-lg shrink-0"
                >
                  <Search size={14} className="me-2" />
                  <span>{t.verifyButton}</span>
                </button>
              </div>
            </form>

            {certResult && (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 flex items-start gap-3">
                <CheckCircle size={20} className="shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-bold mb-1">Authenticated CISE Credential</strong>
                  <p className="text-xs leading-relaxed">{certResult.message}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* View 6 & 7: INSTRUCTORS */}
        {(view === 'instructors' || view === 'instructor-detail') && (() => {
          const isZhang = instructorId?.toLowerCase().includes('zhang');
          const isLi = !isZhang && instructorId?.toLowerCase().includes('li') && !instructorId?.toLowerCase().includes('chen');
          const instructorName = isZhang ? 'Zhang Ming' : isLi ? 'Li Wei' : 'Prof. Chen Lin';
          const instructorRole = isZhang ? 'Lead Examiner & Oral Fluency Specialist' : isLi ? 'Youth Curriculum & Cultural Specialist' : 'Pedagogical Director & Senior Linguist';
          const initials = isZhang ? 'ZM' : isLi ? 'LW' : 'CL';

          return (
            <div className="bg-card dark:bg-neutral-900 border border-border dark:border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-border/60 dark:border-neutral-800 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-navy to-royal text-white flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
                  {initials}
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-royal block mb-1">
                    Senior Faculty Member · CISE Chinese Centre
                  </span>
                  <h1 className="text-3xl font-black text-navy dark:text-white uppercase tracking-tight">
                    {instructorName}
                  </h1>
                  <p className="text-sm text-navy/70 dark:text-neutral-400 font-medium">
                    {instructorRole}
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-sm text-navy/80 dark:text-neutral-300 leading-relaxed">
                <p>
                  {lang === 'ar' ? 'أستاذ معتمد ذو خبرة تزيد عن 12 عامًا في تدريس اللغة الصينية لغير الناطقين بها، وحاصل على ترخيص وزارة التعليم الصينية لتدريب وتأهيل مدربي HSK.' :
                   lang === 'ckb' ? 'مامۆستای بڕوانامەدار بە ئەزموونی زیاتر لە 12 ساڵ لە فێرکردنی زمانی چینی بۆ بیانییەکان، بە مۆڵەتی وەزارەتی پەروەردەی چین بۆ ڕاهێنانی مامۆستایانی HSK.' :
                   lang === 'zh' ? '拥有逾12年国际中文教育经验，持有教育部中外语言交流合作中心国际中文教师证书及国家级HSK高级考评员资质。' :
                   'Certified senior faculty member with over 12 years of specialized experience in international Chinese language education and curriculum design, accredited by the Center for Language Education and Cooperation.'}
                </p>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    to={`/${lang}/institute/chinese-center/enroll`}
                    className="inline-flex items-center px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-brand-800 hover:bg-brand-700 rounded-lg shadow"
                  >
                    <span>Book Course with this Instructor</span>
                    <ArrowRight size={14} className="ms-2 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })()}

        {/* View 8: FAQ */}
        {view === 'faq' && (
          <div className="bg-card dark:bg-neutral-900 border border-border dark:border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-lg">
            <h1 className="text-3xl font-black text-navy dark:text-white uppercase tracking-tight mb-2">
              {t.faqHeading}
            </h1>
            <p className="text-navy/70 dark:text-neutral-400 text-sm mb-8">
              {t.faqSubheading}
            </p>

            <div className="space-y-6">
              {[
                { q: t.faqQ1, a: t.faqA1 },
                { q: t.faqQ2, a: t.faqA2 },
                { q: t.faqQ3, a: t.faqA3 },
                { q: t.faqQ4, a: t.faqA4 },
                { q: t.faqQ5, a: t.faqA5 },
                { q: t.faqQ6, a: t.faqA6 }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl bg-surface dark:bg-neutral-800 border border-border dark:border-neutral-700">
                  <h3 className="text-base font-bold text-navy dark:text-white mb-2">{item.q}</h3>
                  <p className="text-xs text-navy/75 dark:text-neutral-300 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View 9: CONTACT */}
        {view === 'contact' && (
          <div className="bg-card dark:bg-neutral-900 border border-border dark:border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-lg">
            <h1 className="text-3xl font-black text-navy dark:text-white uppercase tracking-tight mb-2">
              {t.contactTitle}
            </h1>
            <p className="text-navy/70 dark:text-neutral-400 text-sm mb-8">
              {t.contactSubtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-xs">
              <div className="p-5 rounded-xl bg-surface dark:bg-neutral-800 border border-border dark:border-neutral-700">
                <MapPin size={20} className="text-brand-800 mb-2" />
                <strong className="block text-navy dark:text-white mb-1">Campus Location</strong>
                <span className="text-neutral-600 dark:text-neutral-400">{t.contactAddress}</span>
              </div>
              <div className="p-5 rounded-xl bg-surface dark:bg-neutral-800 border border-border dark:border-neutral-700">
                <Mail size={20} className="text-royal mb-2" />
                <strong className="block text-navy dark:text-white mb-1">Academic Inquiries</strong>
                <span className="text-neutral-600 dark:text-neutral-400">{t.contactEmail}</span>
              </div>
              <div className="p-5 rounded-xl bg-surface dark:bg-neutral-800 border border-border dark:border-neutral-700">
                <Phone size={20} className="text-gold mb-2" />
                <strong className="block text-navy dark:text-white mb-1">Admissions Hotline</strong>
                <span className="text-neutral-600 dark:text-neutral-400">{t.contactPhone}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
