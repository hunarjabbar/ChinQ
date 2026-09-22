import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { HelpCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

export function SummitFaqPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: {
        en: 'What is the role of the Chinese Institute for Strategic and Economic Studies at the Summit?',
        ar: 'ما هو دور المعهد الصيني للدراسات الاستراتيجية والاقتصادية في القمة؟',
        zh: 'Chinese Institute for Strategic and Economic Studies在本次峰会中扮演何种角色？',
        ckb: 'ڕۆڵی پەیمانگای چین بۆ توێژینەوەی ستراتیژی و ئابووری لە لووتکەکەدا چییە؟'
      },
      a: {
        en: 'The Chinese Institute for Strategic and Economic Studies serves as the sole Official Strategic Knowledge Partner. It independently formulates the macro policy agenda, authoring 11 sector feasibility dossiers, providing credit benchmarks, and moderating strategic plenaries.',
        ar: 'يعمل المعهد كشريك معرفي واستراتيجي رسمي وحصري، حيث يضع الأجندة الفكرية، ويصدر ١١ دراسة جدوى قطاعية، ويقدم مؤشرات الجدارة الائتمانية للشركات.',
        zh: '智库作为官方独家战略智库与知识伙伴，全权主导宏观战略议题研拟，独家输出11大重点产业可行性尽调报告，并为参会企业提供独立信用评级与清算机制学术支撑。',
        ckb: 'پەیمانگا وەک هاوبەشی زانستی تایبەت کارنامەی لووتکە دادەڕێژێت و ١١ توێژینەوەی ئابووری پێشکەش دەکات.'
      }
    },
    {
      q: {
        en: 'How can exhibitors settle booth and transaction payments in local currency (IQD/CNY)?',
        ar: 'كيف يمكن للعارضين تسوية مدفوعات الأجنحة والصفقات بالعملات المحلية (الدينار/اليوان)؟',
        zh: '参展企业与采购商如何使用本币（伊拉克第纳尔IQD / 人民币CNY）进行展位结算与贸易货款清算？',
        ckb: 'چۆن دەتوانرێت پارەی بەشداریکردن و مامەڵە بازرگانییەکان بە دینار و یوان بدرێت؟'
      },
      a: {
        en: 'Through ICA’s direct clearing corridor established with partner commercial banks in Baghdad, Erbil, and Beijing, exhibitors and buyers can execute direct IQD-CNY clearing avoiding intermediary exchange volatility.',
        ar: 'من خلال ممر المقاصة المباشر الذي أنشأته ICA بالتعاون مع البنوك التجارية في بغداد وأربيل وبكين، يمكن تسوية المدفوعات مباشرة بالدينار واليوان.',
        zh: '依托ICA与巴格达、埃尔比勒及北京主要商业银行搭建的双边清算走廊，参展方可直接以人民币（CNY）或伊拉克第纳尔（IQD）开具信用证与对公汇兑，规避汇率二次折损。',
        ckb: 'لە ڕێگەی سیستەمی پاکتاوی ICA و بانکە پەیوەندیدارەکان دەتوانرێت ڕاستەوخۆ بە دینار و یوان پارەدان ئەنجام بدرێت.'
      }
    },
    {
      q: {
        en: 'Are visas provided for Chinese business travelers and international delegations?',
        ar: 'هل يتم توفير تأشيرات الدخول لرجال الأعمال الصينيين والوفود الدولية؟',
        zh: '中国商务代表团及国际买家如何办理赴伊商务签证？',
        ckb: 'ئایا ڤیزا بۆ بازرگانانی چینی و شاندە نێودەوڵەتییەکان دابین دەکرێت؟'
      },
      a: {
        en: 'Yes. Accredited exhibitors and VIP delegates receive official summit visa facilitation letters supported by the Kurdistan Regional Government Interior Ministry, granting fast-track visa issuance on arrival at Sulaymaniyah International Airport (ISU).',
        ar: 'نعم. يحصل العارضون والوفود المعتمدة على خطابات تسهيل تأشيرة رسمية تتيح الحصول على التأشيرة السريعة عند الوصول إلى مطار السليمانية الدولي.',
        zh: '是的。所有通过审核的注册参展商及贵宾将获得由库尔德自治区内政部及峰会组委会联合签发的高级别商务邀请函，支持在苏莱曼尼亚国际机场（ISU）享受绿色落地签礼遇。',
        ckb: 'بەڵێ. هەموو بەشداربووان لە ڕێگەی نامەی فەرمی لووتکە لە فڕۆکەخانەی نێودەوڵەتی سلێمانی دەتوانن ڤیزا وەربگرن.'
      }
    }
  ];

  return (
    <SummitLayout lang={lang} activeNav="faq">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        
        {/* Header Hero */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-800 dark:text-brand-400" />
            <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
              {lang === 'ar' ? 'الأسئلة الشائعة والإرشادات' : lang === 'zh' ? '峰会与博览会常见问题答疑' : lang === 'ckb' ? 'پرسیارە باوەکان' : 'Frequently Asked Questions'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
            {lang === 'ar' ? 'الأسئلة الشائعة حول القمة والمعرض والخدمات' : lang === 'zh' ? '参展、清算、信保与签证高频解答' : lang === 'ckb' ? 'پرسیارە باوەکان سەبارەت بە لووتکە' : 'Summit & Bilateral Expo FAQ'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            {lang === 'ar'
              ? 'كل ما تود معرفته حول إجراءات التسجيل، الشريك المعرفي، المقاصة المالية، وإجراءات السفر والضيافة.'
              : 'Key information regarding accreditation, knowledge partners, currency settlement, and logistics.'}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <h3 className="text-sm sm:text-base font-black text-neutral-900 dark:text-neutral-100">
                    {faq.q[lang]}
                  </h3>
                  {isOpen ? <ChevronUp size={18} className="text-brand-800 shrink-0" /> : <ChevronDown size={18} className="text-neutral-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800 pt-4">
                    {faq.a[lang]}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </SummitLayout>
  );
}
