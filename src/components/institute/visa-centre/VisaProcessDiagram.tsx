import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Clock, Building, Users, FileCheck, ShieldAlert } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';

interface VisaProcessDiagramProps {
  lang: Locale;
  defaultDirection?: 'iraq-to-china' | 'china-to-iraq';
  id?: string;
}

export const VisaProcessDiagram: React.FC<VisaProcessDiagramProps> = ({
  lang,
  defaultDirection = 'iraq-to-china',
  id = 'visa-process-diagram'
}) => {
  const { vt } = useVisaCentreI18n(lang);
  const [direction, setDirection] = useState<'iraq-to-china' | 'china-to-iraq'>(defaultDirection);

  const iraqToChinaSteps = [
    {
      step: 1,
      title: lang === 'zh' ? '材料预审与合规咨询' : lang === 'ar' ? 'التدقيق والاستشارة الأولية للملف' : lang === 'ckb' ? 'پشکنینی سەرەتایی و ڕاوێژکاری' : 'Dossier Pre-Audit & Compliance Advisory',
      desc: lang === 'zh' ? '中心专家审核中方邀请函、商业执照与行程单据，确保符合总领馆规范。' : lang === 'ar' ? 'مراجعة خطاب الدعوة الصيني والسجل التجاري ومسار الرحلة وفق ضوابط القنصلية العامة.' : lang === 'ckb' ? 'پشکنینی نووسراوی بانگهێشتنامەی فەرمی کۆمپانیای چین بەپێی ستانداردەکان.' : 'Institute advisors review your Chinese invitation letter, corporate credentials, and itinerary against Consulate General in Erbil standards.',
      actor: lang === 'zh' ? '签证咨询中心' : lang === 'ar' ? 'فريق مركز الاستشارات' : lang === 'ckb' ? 'تیمی سەنتەر' : 'Visa Centre Advisors',
      time: '1-2 Days'
    },
    {
      step: 2,
      title: lang === 'zh' ? '官方在线申请表填写 (COVA)' : lang === 'ar' ? 'إعداد استمارة التأشيرة الإلكترونية (COVA)' : lang === 'ckb' ? 'پڕکردنەوەی فۆڕمی ئەلیکترۆنی (COVA)' : 'Official COVA Form Completion',
      desc: lang === 'zh' ? '协助在官方中国签证在线填表系统录入无误的信息并规范排版。' : lang === 'ar' ? 'المساعدة في تعبئة النظام الإلكتروني الرسمي للتأشيرات الصينية وتدقيق مطابقة البيانات والصور.' : lang === 'ckb' ? 'یارمەتیدان لە پڕکردنەوەی فۆڕمی فەرمی ڤیزای چین بە تەواوی زانیارییەکان.' : 'Systematic completion of the official Chinese Online Visa Application form with calibrated biometric photo verification.',
      actor: lang === 'zh' ? '申请人与中心协助' : lang === 'ar' ? 'المتقدم والمركز' : lang === 'ckb' ? 'داواکار بە هاوکاری ناوەند' : 'Applicant & Centre',
      time: '1 Day'
    },
    {
      step: 3,
      title: lang === 'zh' ? '领事面签与生物识别预约' : lang === 'ar' ? 'حجز موعد المقابلة والبصمة القنصلية' : lang === 'ckb' ? 'دیاریکردنی کاتی چاوپێکەوتن و پەنجەمۆر' : 'Biometric Appointment Scheduling',
      desc: lang === 'zh' ? '锁定中国驻埃尔比勒总领馆或驻巴格达使馆正式面签席位。' : lang === 'ar' ? 'تثبيت موعد الحضور في القنصلية العامة بأربيل أو السفارة ببغداد.' : lang === 'ckb' ? 'تۆمارکردنی کاتی فەرمی لە کۆنسوڵگەری چین لە هەولێر یان باڵیۆزخانە لە بەغدا.' : 'Booking confirmed time slots at the Consulate General in Erbil or Embassy in Baghdad.',
      actor: lang === 'zh' ? '中心协助预约' : lang === 'ar' ? 'المركز والمتقدم' : lang === 'ckb' ? 'ناوەند' : 'Centre Coordination',
      time: 'Real-time'
    },
    {
      step: 4,
      title: lang === 'zh' ? '现场递交与生物指纹采集' : lang === 'ar' ? 'حضور الموعد والتبصيم القنصلي' : lang === 'ckb' ? 'ئامادەبوون لە کۆنسوڵگەری بۆ پەنجەمۆر' : 'Consular In-Person Submission',
      desc: lang === 'zh' ? '申请人持原件亲自到场录入十指指纹并递交正式护照卷宗（符合免采条件者除外）。' : lang === 'ar' ? 'حضور المتقدم شخصياً لتسليم الجواز الأصلي وأخذ البصمات الحيوية (إلا إذا كان معفياً منها).' : lang === 'ckb' ? 'ئامادەبوونی کەسی بۆ پێشکەشکردنی پاسپۆرت و وەرگرتنی پەنجەمۆر.' : 'Applicant personally appears at the consular counter for fingerprint capture and passport deposit (unless exempt).',
      actor: lang === 'zh' ? '申请人本人' : lang === 'ar' ? 'المتقدم شخصياً' : lang === 'ckb' ? 'داواکار خۆی' : 'Applicant in Person',
      time: 'Consular slot'
    },
    {
      step: 5,
      title: lang === 'zh' ? '领事主权裁决与制证' : lang === 'ar' ? 'المعالجة وإصدار القرار السيادي' : lang === 'ckb' ? 'بڕیاری فەرمی کۆنسوڵگەری' : 'Sovereign Consular Adjudication',
      desc: lang === 'zh' ? '中华人民共和国外交领事官员独立核准裁定。中心不参与亦无法干涉裁决。' : lang === 'ar' ? 'دراسة الطلب وإصدار القرار من قبل الدبلوماسيين الصينيين المعتمدين حصراً.' : lang === 'ckb' ? 'لێکۆڵینەوە و بڕیاری کۆتایی لەلایەن کۆنسوڵگەری چین بە تەواوی سەروەری.' : 'Independent assessment by Chinese consular officers. The Centre has no authority over this decision.',
      actor: lang === 'zh' ? '中国驻外使领馆' : lang === 'ar' ? 'القنصلية الصينية الرسمية' : lang === 'ckb' ? 'کۆنسوڵگەری چین' : 'Chinese Diplomatic Mission',
      time: '4-7 Working Days'
    },
    {
      step: 6,
      title: lang === 'zh' ? '护照安全取回与行前说明' : lang === 'ar' ? 'استلام الجواز وإرشادات السفر' : lang === 'ckb' ? 'وەرگرتنەوەی پاسپۆرت و ڕێنمایی گەشت' : 'Passport Collection & Briefing',
      desc: lang === 'zh' ? '核对签证生效日期与停留天数，领取中心定制的中伊出行与海关合规须知。' : lang === 'ar' ? 'تدقيق ملصق التأشيرة وصلاحيتها، وتزويد المسافر بدليل الجمارك والإقامة الصينية.' : lang === 'ckb' ? 'پشکنینی ماوەی ڤیزاکە و وەرگرتنی ڕێنمایی گەیشتن و گومرگ.' : 'Verification of visa sticker parameters, receipt of arrival compliance guide and departure advisory.',
      actor: lang === 'zh' ? '申请人与中心' : lang === 'ar' ? 'المتقدم والمركز' : lang === 'ckb' ? 'داواکار و ناوەند' : 'Applicant & Centre',
      time: 'Same Day'
    }
  ];

  const chinaToIraqSteps = [
    {
      step: 1,
      title: lang === 'zh' ? '伊拉克邀请方资质审核与预备' : lang === 'ar' ? 'تدقيق وثائق الجهة العراقية الداعية' : lang === 'ckb' ? 'پشکنینی بەڵگەنامەی لایەنی عێراقی' : 'Iraqi Sponsor & Invitation Audit',
      desc: lang === 'zh' ? '审核伊拉克或库区合作企业的注册合规证书及商业邀请公函。' : lang === 'ar' ? 'مراجعة شهادة تسجيل الشركة العراقية، والسجل التجاري، وصيغة الدعوة.' : lang === 'ckb' ? 'پشکنینی تۆماری کۆمپانیای هاوبەشی عێراق و فۆڕمی بانگهێشتنامە.' : 'Verification of host company commercial registration in Baghdad or Erbil.',
      actor: lang === 'zh' ? '咨询中心顾问' : lang === 'ar' ? 'مستشارو المركز' : lang === 'ckb' ? 'ڕاوێژکارانی سەنتەر' : 'Centre Advisors',
      time: '1-2 Days'
    },
    {
      step: 2,
      title: lang === 'zh' ? '伊拉克内政部安全准入报备' : lang === 'ar' ? 'الموافقة الأمنية من وزارة الداخلية' : lang === 'ckb' ? 'ڕەزامەندی ئەمنی لە وەزارەتی ناوخۆ' : 'Ministry of Interior Clearance',
      desc: lang === 'zh' ? '协助向巴格达或埃尔比勒内政部入境管理部门协调准入安全批复。' : lang === 'ar' ? 'تنسيق تقديم طلب الموافقة الأمنية عبر الجهات المختصة في بغداد أو أربيل.' : lang === 'ckb' ? 'بەدواداچوونی ڕەزامەندی ئەمنی لە بەغدا یان هەولێر.' : 'Liaison with Iraqi Ministry of Interior security administration channels.',
      actor: lang === 'zh' ? '伊拉克内政部' : lang === 'ar' ? 'الداخلية العراقية' : lang === 'ckb' ? 'وەزارەتی ناوخۆی عێراق' : 'Iraqi Interior Ministry',
      time: '5-10 Days'
    },
    {
      step: 3,
      title: lang === 'zh' ? '电子准签批文或使馆实体面签' : lang === 'ar' ? 'إصدار التأشيرة الإلكترونية أو الورقية' : lang === 'ckb' ? 'دەرکردنی ڤیزای ئەلیکترۆنی یان باڵیۆزخانە' : 'Visa Clearance Issuance',
      desc: lang === 'zh' ? '由伊拉克驻华使馆（北京）签发签证或由内政部核发官方入境批文。' : lang === 'ar' ? 'صدور التأشيرة عبر السفارة ببكين أو كتاب الموافقة الصادر من الداخلية.' : lang === 'ckb' ? 'دەرکردنی ڤیزا لە باڵیۆزخانە لە پەکین یان ڕەزامەندی فەرمی ناوخۆ.' : 'Official sticker issued by Iraqi Embassy in Beijing or formal electronic arrival authorization letter.',
      actor: lang === 'zh' ? '伊拉克驻华外交使团' : lang === 'ar' ? 'البعثة العراقية ببكين' : lang === 'ckb' ? 'باڵیۆزخانەی عێراق لە پەکین' : 'Iraqi Foreign Mission',
      time: '3-5 Days'
    },
    {
      step: 4,
      title: lang === 'zh' ? '抵伊通关与落地换发保障' : lang === 'ar' ? 'بروتوكول الوصول في المطارات العراقية' : lang === 'ckb' ? 'پڕۆتۆکۆڵی گەیشتن لە فڕۆکەخانەکان' : 'Port of Entry Clearance & Briefing',
      desc: lang === 'zh' ? '持准签批文在埃尔比勒、巴格达或巴士拉国际机场顺利查验并换发入境印鉴。' : lang === 'ar' ? 'إجراءات ختم الدخول في مطارات أربيل أو بغداد أو البصرة الدولية.' : lang === 'ckb' ? 'ڕێکاری فەرمی لە فڕۆکەخانەکانی هەولێر، بەغدا یان بەسرە.' : 'Airport immigration verification at Erbil, Baghdad, or Basra International Airports.',
      actor: lang === 'zh' ? '机场边防口岸' : lang === 'ar' ? 'إدارة الجوازات بالمطار' : lang === 'ckb' ? 'پاسپۆرتی فڕۆکەخانە' : 'Border Control',
      time: 'On Arrival'
    }
  ];

  const steps = direction === 'iraq-to-china' ? iraqToChinaSteps : chinaToIraqSteps;

  return (
    <div id={id} className="space-y-6">
      {/* Direction Toggle */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setDirection('iraq-to-china')}
          className={`px-4 py-2 min-h-[44px] rounded-lg text-xs md:text-sm font-semibold transition-all ${
            direction === 'iraq-to-china'
              ? 'bg-royal text-white shadow-sm'
              : 'border border-border bg-card text-muted-foreground hover:text-foreground'
          }`}
        >
          {vt('dirIraqToChina')}
        </button>
        <button
          type="button"
          onClick={() => setDirection('china-to-iraq')}
          className={`px-4 py-2 min-h-[44px] rounded-lg text-xs md:text-sm font-semibold transition-all ${
            direction === 'china-to-iraq'
              ? 'bg-royal text-white shadow-sm'
              : 'border border-border bg-card text-muted-foreground hover:text-foreground'
          }`}
        >
          {vt('dirChinaToIraq')}
        </button>
      </div>

      {/* Process Flow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((st) => (
          <div
            key={st.step}
            className="p-5 rounded-xl border border-border bg-card/70 hover:bg-card transition-colors flex flex-col justify-between space-y-3 relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-royal/10 text-royal font-bold text-sm shrink-0">
                {st.step}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded">
                <Clock className="w-3 h-3 text-royal" />
                {st.time}
              </span>
            </div>

            <div className="space-y-1.5 flex-1">
              <h3 className="font-semibold text-foreground text-sm leading-snug">
                {st.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {st.desc}
              </p>
            </div>

            <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 text-royal" />
                {st.actor}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Sub-note */}
      <div className="p-4 rounded-lg bg-muted/40 border border-border text-xs text-muted-foreground flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
        <span>{vt('disclaimerShort')}</span>
      </div>
    </div>
  );
};
