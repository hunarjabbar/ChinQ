import React from 'react';
import { Locale } from '../types';
import { Target, Eye } from 'lucide-react';

export function FooterVisionMission({ lang }: { lang: Locale }) {
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-700 mt-12 mb-8">
      {/* Vision */}
      <div className="flex flex-col gap-3 text-start rtl:text-right">
        <div className="flex items-center gap-2 text-brand-800 dark:text-brand-400 font-black uppercase tracking-widest text-sm">
          <Eye size={18} />
          <span>{isAr ? 'رؤيتنا' : isZh ? '我们的愿景' : isCkb ? 'دیدگامان' : 'Our Vision'}</span>
        </div>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
          {isAr 
            ? 'بناء جسر استراتيجي مستدام بين العراق والصين، يعزز التنمية الاقتصادية، ويقود الابتكار في مشاريع البنية التحتية، ويدعم الشراكات الثنائية طويلة الأمد في إطار مبادرة الحزام والطريق.' 
            : isZh 
            ? '在伊拉克与中国之间建立一座可持续的战略桥梁，促进经济发展，引领基础设施项目创新，并在“一带一路”倡议框架下支持长期的双边伙伴关系。'
            : isCkb
            ? 'دروستکردنی پردێکی ستراتیژی بەردەوام لە نێوان عێراق و چین، بۆ پێشخستنی گەشەی ئابووری و داهێنان لە پڕۆژەکانی ژێرخان و پشتیوانیکردنی هاوبەشی دوولایەنەی درێژخایەن.'
            : 'To build a sustainable strategic bridge between Iraq and China, fostering economic development, pioneering infrastructure innovation, and supporting long-term bilateral partnerships within the Belt and Road Initiative.'}
        </p>
      </div>

      {/* Mission */}
      <div className="flex flex-col gap-3 text-start rtl:text-right">
        <div className="flex items-center gap-2 text-brand-800 dark:text-brand-400 font-black uppercase tracking-widest text-sm">
          <Target size={18} />
          <span>{isAr ? 'رسالتنا' : isZh ? '我们的使命' : isCkb ? 'ئامانجمان' : 'Our Mission'}</span>
        </div>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
          {isAr
            ? 'تقديم تغطية إعلامية موثوقة، وتسهيل الاستثمارات المشتركة، وتوفير منصات رقمية آمنة للتبادل التجاري والأكاديمي والثقافي، لضمان نمو مزدهر لكلا البلدين.'
            : isZh
            ? '提供可靠的媒体报道，促进共同投资，并为商业、学术和文化交流提供安全的数字平台，以确保两国实现繁荣增长。'
            : isCkb
            ? 'پێشکەشکردنی ڕوماڵی میدیایی باوەڕپێکراو، ئاسانکاری بۆ وەبەرهێنانی هاوبەش، و دابینکردنی پلاتفۆرمی دیجیتاڵی ئارام بۆ ئاڵوگۆڕی بازرگانی، ئەکادیمی و کلتوری.'
            : 'Delivering reliable media coverage, facilitating joint investments, and providing secure digital platforms for commercial, academic, and cultural exchange to ensure prosperous growth for both nations.'}
        </p>
      </div>
    </div>
  );
}
