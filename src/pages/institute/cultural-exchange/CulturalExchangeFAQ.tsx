import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../../types';
import {
  HelpCircle, ChevronDown, ArrowLeft, ArrowRight,
  GraduationCap, Building2, CheckCircle2, ShieldCheck, Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CulturalExchangeFAQ() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qEn: 'Do exchange participants need to speak fluent Mandarin Chinese before applying?',
      qAr: 'هل يُشترط إتقان اللغة الصينية بطلاقة قبل التقديم لبرامج التبادل؟',
      qZh: '申请中伊人文与高校交流项目必须具备流利的中文能力吗？',
      qCkb: 'ئایا پێویستە بە زمانی چینی فسیح بزانیت پێش پێشکەشکردنی داواکاری؟',
      aEn: 'No. The majority of postgraduate fellowships and technical immersion tracks (such as Tsinghua AI and Robotics) are conducted entirely in English. In parallel, participants are provided foundational Mandarin tutoring via the CISE Chinese Centre.',
      aAr: 'لا يُشترط ذلك؛ حيث تُدرّس معظم زمالات الدراسات العليا والمسارات التقنية باللغة الإنجليزية بالكامل، مع توفير دورات لغة صينية تأسيسية عبر المركز الصيني المعتمد التابع للمعهد.',
      aZh: '并非必须。大多数硕博联合培养及前沿科技研学项目（如清华AI与机器人工坊）均采用全英文教学。同时，入选人员可依托 CISE 智库直属中文教学中心接受基础汉语与跨文化培训。',
      aCkb: 'نەخێر مەرج نییە. زۆربەی زەمالەکانی ماستەر و دکتۆرا و تەکنەلۆژیا بە زمانی ئینگلیزی دەخوێندرێن لەگەڵ دابینکردنی فێرکاری زمانی چینی.',
    },
    {
      qEn: 'Are travel stipends, tuition, and university accommodation covered under bilateral MOUs?',
      qAr: 'هل تغطي مذكرات التفاهم الثنائية تكاليف السفر والأقساط الجامعية والسكن؟',
      qZh: '双边备忘录框架下的交流项目是否涵盖国际旅费、学费与校内住宿？',
      qCkb: 'ئایا تێچووی گەشت، خوێندنی زانکۆ و شوێنی مانەوە دابین دەکرێت؟',
      aEn: 'Yes. Accredited Sino-Iraqi fellowships under CISE institutional accords include full tuition waiver, dedicated on-campus international scholar housing, and monthly living stipends funded through bilateral university endowments.',
      aAr: 'نعم؛ تتضمن المنح المعتمدة إعفاءً كاملاً من الرسوم الدراسية، توفير السكن الجامعي للباحثين والطلبة الدوليين، بالإضافة إلى مخصصات معيشية شهرية ممولة من الأوقاف الأكاديمية المشتركة.',
      aZh: '是的。纳入 CISE 智库学术同盟的重点项目均享受全额学费减免、国际学者/留学生公寓免费住宿，并按月发放由双边高校联合专项基金资助的生活津贴。',
      aCkb: 'بەڵێ. زەمالە باوەڕپێکراوەکان بەخشینی تەواو لە پارەی خوێندن، شوێنی مانەوەی زانکۆ و مووچەی مانگانەی ژیان لەخۆدەگرن.',
    },
    {
      qEn: 'How does the visa process work for admitted exchange scholars and students?',
      qAr: 'كيف تتم إجراءات الحصول على تأشيرة السفر للباحثين والطلبة المقبولين؟',
      qZh: '入选中伊交流项目的学者与留学生如何办理双边签证？',
      qCkb: 'ڕێکاری وەرگرتنی ڤیزا بۆ قوتابیان و پسپۆڕانی وەرگیراو چۆنە؟',
      aEn: 'Admitted candidates receive immediate bilateral fast-track processing coordinated directly through the CISE Bilateral Visa Advisory Centre, with dedicated consular support in Baghdad, Erbil, and Beijing.',
      aAr: 'يحصل المقبولون على معالجة قنصلية سريعة ومباشرة بتنسيق مباشر مع مركز استشارات التأشيرات الثنائية التابع للمعهد (CISE)، مع دعم قنصلي مخصص في بغداد وأربيل وبكين.',
      aZh: '录用人员将通过 CISE 双边签证服务中心开辟的专属学术绿色通道进行代办与加急核验，并在北京、巴格达和埃尔比勒享有领事协调保障。',
      aCkb: 'کەسانی وەرگیراو لە ڕێگەی سەنتەری ڤیزای CISE بە شێوەیەکی خێرا و فەرمی ڕێکارەکانی ڤیزایان لە بەغدا، هەولێر و بەکین بۆ تەواو دەکرێت.',
    },
    {
      qEn: 'Can Iraqi university students transfer academic credits earned in China back to their home degree?',
      qAr: 'هل يمكن لطلبة الجامعات العراقية احتساب ومعادلة الساعات المكتسبة في الصين ضمن شهاداتهم؟',
      qZh: '伊拉克高校学生在中国所修读的学分能否顺利转回母校并获认证？',
      qCkb: 'ئایا قوتابیانی زانکۆی عێراقی دەتوانن نمرە و کاتژمێرەکانی خوێندنی چین لە زانکۆی خۆیان هاوکات بکەن؟',
      aEn: 'Yes. All programs listed on the CISE exchange portal operate under formal mutual credit recognition frameworks endorsed by the Iraqi Ministry of Higher Education & Scientific Research and Chinese partner university senates.',
      aAr: 'نعم؛ جميع البرامج المدرجة في منصة المعهد تعمل وفق أطر معادلة واعتراف متبادل بالساعات معتمدة من وزارة التعليم العالي والبحث العلمي ومجالس الجامعات الشريكة.',
      aZh: '可以。本门户发布的全部交流计划均建立在伊拉克高等教育与科学研究部以及中国合作高校学术委员会共同批准的学分互认互换框架之上。',
      aCkb: 'بەڵێ. هەموو بەرنامەکان دانپێدانانی فەرمییان لەلایەن وەزارەتی خوێندنی باڵا و زانکۆ هاوبەشەکانەوە هەیە.',
    },
    {
      qEn: 'How can an Iraqi or Chinese university sign a new institutional partnership accord?',
      qAr: 'كيف يمكن لجامعة عراقية أو صينية توقيع اتفاقية شراكة أكاديمية جديدة؟',
      qZh: '中伊两国大学如何申请签署新的校际合作协议或谅解备忘录？',
      qCkb: 'زانکۆکانی عێراق و چین چۆن دەتوانن ڕێککەوتننامەی نوێی هاوبەشی واژۆ بکەن؟',
      aEn: 'University rectors and international relations deans can submit a formal partnership request via our Academic Desk or email exchange@cises.org.iq. CISE drafts the bilateral MOU protocol and arranges ministerial liaison.',
      aAr: 'يمكن لرؤساء الجامعات وعمداء العلاقات الدولية تقديم طلب شراكة رسمي عبر مكتب التنسيق الأكاديمي أو مراسلتنا عبر exchange@cises.org.iq حيث يتولى المعهد صياغة البروتوكول والتنسيق الوزاري.',
      aZh: '大学校长或国际合作处负责人可通过本站学术申请通道提交合作意向，或直接发送公函至 exchange@cises.org.iq。CISE 智库将协助拟定双边备忘录文本并推进两国主管部门备案。',
      aCkb: 'سەرۆکی زانکۆ یان بەڕێوەبەرایەتی پەیوەندییەکان دەتوانن داواکاری فەرمی بنێرن بۆ exchange@cises.org.iq بۆ دەستپێکردنی ڕێکارەکان.',
    }
  ];

  const t = {
    title: lang === 'ar' ? 'الأسئلة الشائعة حول التبادل الثقافي والأكاديمي' : lang === 'zh' ? '中伊文化与教育交流常见问题解答' : lang === 'ckb' ? 'پرسیارە باوەکان دەربارەی ئاڵوگۆڕی کولتووری' : 'Frequently Asked Questions',
    subtitle: lang === 'ar' ? 'دليل إرشادي شامل يوضح شروط القبول، تمويل المنح، التأشيرات، ومعادلة الشهادات الأكاديمية.' : lang === 'zh' ? '权威解答关于中伊高校联合培养、奖学金资助标准、签证流程及学分互认机制。' : lang === 'ckb' ? 'ڕێبەری گشتگیر لەسەر مەرجەکانی وەرگرتن، بودجەی زەمالە، ڤیزا و دانپێدانانی زانکۆیی.' : 'Comprehensive guidance on admissions eligibility, stipends, consular fast-tracks, and university credit recognition.',
    backToLanding: lang === 'ar' ? 'العودة للتبادل الثقافي' : lang === 'zh' ? '返回文化交流主页' : lang === 'ckb' ? 'گەڕانەوە بۆ ئاڵوگۆڕی کولتووری' : 'Back to Cultural Exchange',
    stillHaveQuestions: lang === 'ar' ? 'هل لديك استفسار إضافي لم تجده هنا؟' : lang === 'zh' ? '仍有疑问或需要个案咨询？' : lang === 'ckb' ? 'پرسیاری زیاترت هەیە؟' : 'Still have questions?',
    contactDesk: lang === 'ar' ? 'تواصل مع مكتب التبادل الأكاديمي' : lang === 'zh' ? '联系学术交流处' : lang === 'ckb' ? 'پەیوەندی بە بەشی ئەکادیمی' : 'Contact Academic Desk',
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
            <Link to={`/${lang}/institute/services/cultural-exchange/faq`} className="px-3 py-1.5 rounded-lg bg-[var(--color-brand-800)]/20 text-[var(--color-brand-800)]">
              {lang === 'ar' ? 'الأسئلة الشائعة' : lang === 'zh' ? '常见问题' : lang === 'ckb' ? 'پرسیارە باوەکان' : 'FAQ'}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/contact`} className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5">
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

        <div className="space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 border border-brand-200 dark:border-brand-900 text-brand-800 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>CISE Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-paper-950 dark:text-paper-50 uppercase tracking-tight">
            {t.title}
          </h1>
          <p className="text-sm sm:text-base text-paper-700 dark:text-paper-300 max-w-2xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const question = lang === 'ar' ? faq.qAr : lang === 'zh' ? faq.qZh : lang === 'ckb' ? faq.qCkb : faq.qEn;
            const answer = lang === 'ar' ? faq.aAr : lang === 'zh' ? faq.aZh : lang === 'ckb' ? faq.aCkb : faq.aEn;
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-paper-200 dark:border-paper-800 bg-paper-50 dark:bg-paper-900 overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left rtl:text-right flex items-center justify-between gap-4 font-bold text-paper-950 dark:text-white hover:text-brand-800 dark:hover:text-amber-400 transition"
                >
                  <span className="text-sm sm:text-base">{question}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 text-[var(--color-brand-800)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-6 text-xs sm:text-sm text-paper-700 dark:text-paper-300 leading-relaxed border-t border-paper-200/60 dark:border-paper-800/60 pt-4"
                    >
                      {answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 p-8 rounded-3xl bg-paper-100 dark:bg-paper-800/60 border border-paper-200 dark:border-paper-700 text-center space-y-4">
          <Mail className="w-8 h-8 mx-auto text-[var(--color-brand-800)]" />
          <h3 className="text-lg font-black text-paper-950 dark:text-white uppercase">
            {t.stillHaveQuestions}
          </h3>
          <p className="text-xs sm:text-sm text-paper-600 dark:text-paper-300 max-w-md mx-auto">
            Our academic advisory coordinators are stationed in Baghdad, Sulaymaniyah, and Beijing to assist with credentials and institutional matching.
          </p>
          <Link
            to={`/${lang}/institute/services/cultural-exchange/contact`}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs uppercase tracking-wider transition"
          >
            <span>{t.contactDesk}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CulturalExchangeFAQ;
