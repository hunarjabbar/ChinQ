import React from 'react';
import { Locale } from '../../../types';
import { ccTranslations } from './translations';
import { Quote, Star, CheckCircle } from 'lucide-react';

interface TestimonialsSectionProps {
  lang: Locale;
}

interface Testimonial {
  id: string;
  nameEn: string;
  nameAr: string;
  nameZh: string;
  nameCkb: string;
  roleEn: string;
  roleAr: string;
  roleZh: string;
  roleCkb: string;
  levelCompleted: string;
  quoteEn: string;
  quoteAr: string;
  quoteZh: string;
  quoteCkb: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'alan',
    nameEn: 'Alan Karwan',
    nameAr: 'آلان كاروان',
    nameZh: '阿兰·卡尔万',
    nameCkb: 'ئالان کاروان',
    roleEn: 'Infrastructure Project Manager',
    roleAr: 'مدير مشاريع البنية التحتية',
    roleZh: '基础设施工程项目经理',
    roleCkb: 'بەڕێوەبەری پڕۆژەی ژێرخان',
    levelCompleted: 'HSK 3',
    quoteEn: 'Achieving HSK 3 transformed my day-to-day communications with Chinese engineering consortia in Sulaymaniyah. The instructors bring authentic pedagogical rigor with direct local support.',
    quoteAr: 'غيّر اجتياز مستوى HSK 3 تواصلي اليومي بالكامل مع الشركات الهندسية الصينية في السليمانية. يمتلك المعلمون دقة أكاديمية استثنائية مع دعم محلي متواصل.',
    quoteZh: '通过HSK 3级考试彻底改善了我与苏莱曼尼亚中资工程联合体的日常沟通。中心的母语教师团队既严谨专业，又给予了切合本地环境的悉心辅导。',
    quoteCkb: 'تێپەڕاندنی ئاستی HSK 3 پەیوەندییە ڕۆژانەکانمی لەگەڵ کۆمپانیا ئەندازیارییە چینییەکان لە سلێمانی بەتەواوی گۆڕی. مامۆستاکان شێوازێکی زانستی بێوێنە و پشتیوانی بەردەوامیان پێشکەش کرد.'
  },
  {
    id: 'sarah',
    nameEn: 'Sarah Al-Bayati',
    nameAr: 'سارة البياتي',
    nameZh: '萨拉·巴亚蒂',
    nameCkb: 'سارە بەەیاتی',
    roleEn: 'Cross-Border Trade Specialist',
    roleAr: 'أخصائية التجارة عبر الحدود',
    roleZh: '跨境贸易与供应链专员',
    roleCkb: 'پسپۆڕی بازرگانی سنووربەزێن',
    levelCompleted: 'Business Chinese',
    quoteEn: 'The Business Chinese track provided practical commercial vocabulary and customs negotiation insight that gave our firm a decisive advantage during import contracts.',
    quoteAr: 'منحني مسار الصينية للأعمال مصطلحات تجارية عملية وفهمًا دقيقًا لبروتوكولات التفاوض، مما منح شركتنا ميزة حاسمة في إبرام عقود التوريد.',
    quoteZh: '商务中文专项课程为我们提供了极其地道的经贸词汇与海关谈判要领，为我们企业在签署大宗进口采购协议时赢得了显著的战略主动。',
    quoteCkb: 'کۆرسی زمانی بازرگانی چینی زاراوەی کرداری بازرگانی و تێگەیشتنی دانوستاندنی پێبەخشیم، ئەمەش گرەنتێکی سەرکەوتووانەی بە کۆمپانیاکەمان دا لە واژۆکردنی گرێبەستەکاندا.'
  },
  {
    id: 'zhino',
    nameEn: 'Zhino Omer',
    nameAr: 'ژينو عمر',
    nameZh: '日诺·奥马尔',
    nameCkb: 'ژینۆ عومەر',
    roleEn: 'International Relations Scholar',
    roleAr: 'باحثة في العلاقات الدولية',
    roleZh: '国际关系研究学者',
    roleCkb: 'توێژەری پەیوەندییە نێودەوڵەتییەکان',
    levelCompleted: 'HSK 4',
    quoteEn: 'I progressed from beginner to passing HSK 4 in less than a year. The structured listening labs and mock testing conditions prepared me flawlessly for the official examination.',
    quoteAr: 'تقدمتُ من مستوى الصفر حتى اجتياز HSK 4 في أقل من عام واحد. كانت مختبرات الاستماع المنظمة وظروف الاختبارات التجريبية كافية لتأهيلي باقتدار للاختبار الرسمي.',
    quoteZh: '我在不到一年的时间内从零基础跃升并通过了新HSK 4级考试。规范化语音实验室配合全真模拟考场环境，为我的官方考试提供了全方位保障。',
    quoteCkb: 'لە ماوەی کەمتر لە ساڵێکدا لە ئاستی سفرەوە گەیشتمە سەرکەوتن لە HSK 4. تاقیگەی دەنگی ڕێکخراو و تاقیکردنەوەی تاقیکاری بەتەواوی ئامادەیان کردم بۆ تاقیکردنەوە فەرمییەکە.'
  }
];

export function TestimonialsSection({ lang }: TestimonialsSectionProps) {
  const t = ccTranslations[lang] || ccTranslations.en;
  const isRtl = lang === 'ar' || lang === 'ckb';

  return (
    <section id="testimonials" className="py-20 bg-card dark:bg-neutral-950 border-b border-border" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-navy dark:text-white uppercase tracking-tight mb-4">
            {t.testimonialsHeading}
          </h2>
          <p className="text-navy/70 dark:text-neutral-300 text-base sm:text-lg">
            {t.testimonialsSubheading}
          </p>
        </div>

        {/* 3-Card Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => {
            const name = lang === 'ar' ? item.nameAr : lang === 'ckb' ? item.nameCkb : lang === 'zh' ? item.nameZh : item.nameEn;
            const role = lang === 'ar' ? item.roleAr : lang === 'ckb' ? item.roleCkb : lang === 'zh' ? item.roleZh : item.roleEn;
            const quote = lang === 'ar' ? item.quoteAr : lang === 'ckb' ? item.quoteCkb : lang === 'zh' ? item.quoteZh : item.quoteEn;

            return (
              <div
                key={item.id}
                className="bg-surface dark:bg-neutral-900 border border-border dark:border-neutral-800 rounded-xl p-6 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Quote size={28} className="text-royal/30 dark:text-royal/50" />
                    <div className="flex items-center gap-1 text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-current text-gold" />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-navy/85 dark:text-neutral-200 leading-relaxed italic mb-6">
                    “{quote}”
                  </p>
                </div>

                <div className="pt-4 border-t border-border/50 dark:border-neutral-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-navy dark:text-white">
                      {name}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {role}
                    </p>
                  </div>

                  <div className="text-end">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                      <CheckCircle size={12} />
                      <span>{item.levelCompleted}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
