import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Award, Building, BookOpen, Users, ArrowRight, ShieldAlert } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';
import { VisaNavHeader } from '../../../components/institute/visa-centre/VisaNavHeader';
import { VisaDisclaimer } from '../../../components/institute/visa-centre/VisaDisclaimer';

export const VisaCentreAbout: React.FC = () => {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const validLang = (lang as Locale) || 'en';
  const { vt } = useVisaCentreI18n(validLang);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <VisaDisclaimer lang={validLang} variant="banner" id="about-top-disclaimer" />
      <VisaNavHeader lang={validLang} />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* Title Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal/10 text-royal text-xs font-semibold">
            <Building className="w-3.5 h-3.5" />
            <span>{vt('navAbout')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            {vt('centreTitle')}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {vt('positioningStatement')}
          </p>
        </div>

        {/* Independence Disclaimer Highlight Card */}
        <div className="p-6 md:p-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 space-y-4">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-base">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>Institutional Legal Mandate &amp; Non-Issuing Authority Statement</span>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed font-medium">
            {vt('independenceDisclaimer')}
          </p>
          <div className="pt-2 text-xs text-muted-foreground border-t border-amber-500/20">
            {vt('nonIssuingAuthorityNotice')}
          </div>
        </div>

        {/* Mission & Purpose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-royal/10 text-royal flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-foreground">
              {validLang === 'zh' ? '设立宗旨与定位' : validLang === 'ar' ? 'الرسالة والأهداف' : validLang === 'ckb' ? 'ئامانج و پەیام' : 'Mandate & Core Objectives'}
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              {validLang === 'zh'
                ? '中心作为中国战略与经济研究所的下设咨询机构，旨在消除中伊跨境人员往来中的政策壁垒、语言障碍与材料格式差错，为两国企业家、工程师、专家和青年学子提供合规透明的文书预审。'
                : validLang === 'ar'
                ? 'تأسس المركز كذراع استشاري وبحثي للمعهد الصيني للدراسات الاستراتيجية والاقتصادية لإزالة الحواجز اللغوية والإجرائية وتسهيل حركة السفر الثنائية لرجال الأعمال والمهندسين والطلبة.'
                : validLang === 'ckb'
                ? 'ناوەند وەک بەشێکی پسپۆڕی پەیمانگای چینی کاردەکات بۆ نەهێشتنی ئاستەنگی یاسایی و زمان و ئاسانکاری بۆ بازرگانان و خوێندکاران.'
                : 'Established under the Chinese Institute for Strategic and Economic Studies to bridge language, regulatory, and procedural gaps for corporate, scientific, and student travel between Iraq and China.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-royal/10 text-royal flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-foreground">
              {validLang === 'zh' ? '领事标准与政策对齐' : validLang === 'ar' ? 'التوافق مع المعايير القنصلية' : validLang === 'ckb' ? 'گونجاندن لەگەڵ ڕێنماییە فەرمییەکان' : 'Consular Alignment & Quality Control'}
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              {validLang === 'zh'
                ? '全部服务流程与材料规范严格对照中国驻埃尔比勒总领馆、驻巴格达使馆及伊拉克外交部内政部的最新公开指引制定，定期更新规费标准，杜绝非正规代办与虚假承诺。'
                : validLang === 'ar'
                ? 'تتوافق كافة نماذجنا وإجراءاتنا بدقة مع معايير القنصلية العامة الصينية في أربيل والسفارة الصينية في بغداد والجهات العراقية الرسمية، مع التحديث الدوري لجداول الرسوم.'
                : validLang === 'ckb'
                ? 'هەموو کارەکانمان بە تەواوی هاوتای یاساکانی کۆنسوڵگەری چین لە هەولێر و باڵیۆزخانە لە بەغدا و لایەنە فەرمییەکانی عێراق ئەنجام دەدرێن.'
                : 'All processes adhere strictly to official policies published by the Chinese Consulate General in Erbil, Chinese Embassy in Baghdad, and Iraqi diplomatic missions.'}
            </p>
          </div>
        </div>

        {/* Operating Pillars */}
        <div className="p-8 rounded-2xl border border-border bg-card space-y-6">
          <h2 className="text-xl font-bold text-foreground">
            {validLang === 'zh' ? '四大服务支柱' : validLang === 'ar' ? 'الركائز الأربع لخدمات المركز' : validLang === 'ckb' ? 'چوار کۆڵەکەی سەرەکی خزمەتگوزاری' : 'Four Operational Pillars'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-muted/40 space-y-2">
              <span className="font-bold text-royal text-sm block">01. {validLang === 'zh' ? '政策合规预审' : 'Pre-Audit Compliance'}</span>
              <p className="text-muted-foreground leading-relaxed">
                {validLang === 'zh' ? '对商业邀请函、公司资质与往返行程进行全要素核查，确保一次通过。' : 'Rigorous audit of invitation letters, corporate licenses, and travel itineraries prior to filing.'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-muted/40 space-y-2">
              <span className="font-bold text-royal text-sm block">02. {validLang === 'zh' ? '多语种官方公函' : 'Multilingual Translation'}</span>
              <p className="text-muted-foreground leading-relaxed">
                {validLang === 'zh' ? '中文、阿拉伯语、英语、库尔德语四语对照公文及双认证材料排版。' : 'Certified document translation in Chinese, Arabic, English, and Kurdish adhering to consular formatting.'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-muted/40 space-y-2">
              <span className="font-bold text-royal text-sm block">03. {validLang === 'zh' ? '预约与生物采集' : 'Appointment Coordination'}</span>
              <p className="text-muted-foreground leading-relaxed">
                {validLang === 'zh' ? '协调总领馆面签及指纹采集通道，提供现场接待指引。' : 'Seamless biometric appointment scheduling at Erbil Consulate and Baghdad Embassy counters.'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-muted/40 space-y-2">
              <span className="font-bold text-royal text-sm block">04. {validLang === 'zh' ? '隐私与安全加密' : 'Privacy & Data Protection'}</span>
              <p className="text-muted-foreground leading-relaxed">
                {validLang === 'zh' ? '护照号码及身份数据全程加密存储，严格遵循领事涉密规范。' : 'Passport numbers and personal data are encrypted and masked under strict consular privacy standards.'}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to={`/${validLang}/institute/visa-centre/services`}
            className="px-6 py-3 rounded-xl bg-royal hover:bg-royal/90 text-white font-semibold text-xs md:text-sm inline-flex items-center gap-2"
          >
            <span>{vt('navServices')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <VisaDisclaimer lang={validLang} variant="card" id="about-footer-disclaimer" />
    </div>
  );
};
