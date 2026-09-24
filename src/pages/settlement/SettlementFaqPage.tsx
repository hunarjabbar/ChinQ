import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Locale } from '../../types';
import { SettlementLayout } from '../../components/settlement/SettlementLayout';
import { getSettlementTranslation } from '../../locales/settlementTranslations';

export function SettlementFaqPage() {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const lang = (paramLang === 'ck' ? 'ckb' : paramLang || 'en') as Locale;
  const t = (key: string) => getSettlementTranslation(lang, key);
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: isAr ? 'ما هي آلية المقاصة المباشرة بين الدينار العراقي واليوان الصيني؟' : isZh ? '伊拉克第纳尔与人民币双边直接清算的运作机制是什么？' : isCkb ? 'میکانیزمی پاکتاوی ڕاستەوخۆ چییە؟' : 'What is the direct IQD ⇄ RMB clearing mechanism?',
      a: isAr 
        ? 'تتيح الآلية للمستوردين العراقيين دفع قيمة البضائع بالدينار العراقي لدى المصارف المعتمدة، ليتم قيد المبلغ مباشرة للمصنعين الصينيين باليوان دون الحاجة لشراء الدولار أو المرور عبر بنوك المراسلة الأمريكية.'
        : isZh 
        ? '该机制使伊拉克进口企业能够直接以第纳尔在本国清算银行支付货款，中国出口企业则通过CIPS及央行双边互换专户直接入账人民币，免除了采购美元及境外中间行流转环节。'
        : isCkb 
        ? 'ئەم میکانیزمە ڕێگە دەدات بە پارەدانی ڕاستەوخۆ بە دینار لە عێراق و وەرگرتنی یوان لە چین بەبێ پێویستی بە دۆلار.'
        : 'The bilateral mechanism allows Iraqi buyers to fund trade orders in Iraqi Dinars at accredited Iraqi commercial banks, which credit Chinese suppliers directly in RMB via CIPS and sovereign clearing protocols, completely avoiding the USD intermediary leg.'
    },
    {
      q: isAr ? 'كم تبلغ نسبة الوفر المالي مقارنة بالتحويل التقليدي عبر الدولار؟' : isZh ? '相较传统三方美元中转，企业能节省多少成本？' : isCkb ? 'ڕێژەی پاشەکەوتکردن چەندە؟' : 'How much does an enterprise save compared to traditional USD routing?',
      a: isAr 
        ? 'يوفر المسار المباشر ما بين ٤٪ إلى ٧٪ من إجمالي قيمة الصفقة عبر إلغاء هوامش الصرف المزدوجة وتجنب رسوم التحويل البرقي للبنوك الوسيطة.'
        : isZh 
        ? '通过消除二次货币汇兑点差及避免美元中间行电汇通道费，企业单笔贸易通常可节省货值总额的4%至7%。'
        : isCkb 
        ? 'لە ڕێگەی نەهێشتنی تێچووە ناپێویستەکان، لە نێوان ٤٪ بۆ ٧٪ ی کۆی گرێبەست پاشەکەوت دەکرێت.'
        : 'Direct clearing routinely yields 4% to 7% in net savings by removing double foreign exchange spreads (IQD ➔ USD ➔ RMB) and correspondent bank deduction fees.'
    },
    {
      q: isAr ? 'ما هي المدة الزمنية المطلوبة لتنفيذ التحويل ووصول الأموال؟' : isZh ? '资金从汇出到中国境内账户到账需要多长时间？' : isCkb ? 'کاتی جێبەجێکردنی پارەدانەکە چەندە؟' : 'How long does direct bilateral settlement take?',
      a: isAr 
        ? 'تستغرق دورة المقاصة المباشرة ما بين ٢٤ إلى ٤٨ ساعة عمل فور اكتمال تدقيق الوثائق، مقارنة بـ ٣ إلى ٨ أيام عمل في المسار التقليدي.'
        : isZh 
        ? '单证及合规审核通过后，直接清算资金通常在24至48小时内到账，大幅优于传统中转模式的3至8个工作日。'
        : isCkb 
        ? 'پاش وردبینی بەڵگەنامەکان، پارەکە لە ماوەی ٢٤ بۆ ٤٨ کاتژمێردا دەگاتە دەست لایەنی بەرامبەر.'
        : 'Following documentary compliance verification, execution completes within 24 to 48 hours, compared to 3 to 8 business days for traditional correspondent channels.'
    },
    {
      q: isAr ? 'هل يتوافق النظام مع متطلبات الامتثال ومكافحة غسل الأموال؟' : isZh ? '该清算体系是否完全符合伊拉克央行反洗钱及国际制裁要求？' : isCkb ? 'ئایا سیستەمەکە پابەندە بە یاسای دژە سپیکردنەوە؟' : 'Is this system compliant with Central Bank of Iraq AML and sanctions regulations?',
      a: isAr 
        ? 'نعم بالكامل. يخضع النظام لأحكام قانون مكافحة غسل الأموال العراقي رقم ٣٩ لسنة ٢٠١٥ وضوابط منصة البنك المركزي العراقي وقوائم العقوبات الدولية للأمم المتحدة.'
        : isZh 
        ? '完全合规。所有结算均严格遵守伊拉克2015年第39号反洗钱法、伊拉克央行外汇电子申报规范及联合国安理会制裁决议。'
        : isCkb 
        ? 'بەڵێ، تەواوی پرۆسەکە بە پێی یاسای ژمارە ٣٩ی ساڵی ٢٠١٥ و ڕێنماییەکانی بانکی ناوەندی ئەنجام دەدرێت.'
        : 'Yes, 100%. All flows undergo strict screening under Iraqi Anti-Money Laundering Law No. 39 of 2015, CBI electronic foreign exchange declarations, and UN Security Council sanctions lists.'
    },
    {
      q: isAr ? 'ما هو الدور المؤسسي لبطاقة كي وICA المشتركة؟' : isZh ? 'Qi & ICA 联名商务主权卡的使用场景是什么？' : isCkb ? 'سوودی کارتی هاوبەشی Qi و ICA چییە؟' : 'What is the utility of the co-branded Qi & ICA Card?',
      a: isAr 
        ? 'تمنح البطاقة رجال الأعمال والمفوضين حساباً ثنائياً بالدينار واليوان مع قبول شامل في العراق وأجهزة نقاط البيع في الصين، مع تسهيلات جمركية وتأشيرات تجارية سريعة.'
        : isZh 
        ? '该卡为中伊商贸往来高管提供直接关联第纳尔与人民币账户的专属支付介质，在伊拉克全境Qi终端及中国银联/Visa商户均可消费，并享有商务签证加速通道。'
        : isCkb 
        ? 'ئەم کارتە ڕێگە بە بەکارهێنانی دوو هەژماری دینار و یوان دەدات لە هەردوو وڵاتدا لەگەڵ ئاسانکاری گەشت و گومرگ.'
        : 'The co-branded card gives corporate executives and trade delegates a dual-currency wallet usable across Iraq on Qi Card POS networks and in China on UnionPay, Visa, and Mastercard merchant rails with zero FX penalty.'
    }
  ];

  return (
    <SettlementLayout lang={lang}>
      <div className="max-w-3xl mx-auto space-y-10">
        
        <div className="space-y-3 border-b border-gray-200 pb-6">
          <div className="pay-badge">
            Knowledge Desk
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Essential answers on direct IQD ⇄ RMB bilateral clearing, compliance frameworks, fee schedules, and the Qi & ICA card program.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div 
                key={i} 
                className="pay-card overflow-hidden border border-gray-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full p-5 text-start font-black text-sm text-gray-900 flex items-center justify-between gap-4 cursor-pointer hover:text-[#C8102E] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} className="text-[#C8102E] shrink-0" /> : <ChevronDown size={18} className="text-gray-400 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </SettlementLayout>
  );
}
