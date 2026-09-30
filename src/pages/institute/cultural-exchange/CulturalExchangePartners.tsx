import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../../types';
import {
  Building2, GraduationCap, Globe, BookOpen, ExternalLink,
  ArrowLeft, ArrowRight, Award, ShieldCheck, CheckCircle2
} from 'lucide-react';

export function CulturalExchangePartners() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const partners = [
    {
      id: 'tsinghua',
      nameEn: 'Tsinghua University',
      nameAr: 'جامعة تسينغهوا',
      nameZh: '清华大学',
      nameCkb: 'زانکۆی تسینگهوا',
      locationEn: 'Beijing, China',
      locationAr: 'بكين، الصين',
      locationZh: '中国北京',
      locationCkb: 'بەکین، چین',
      specialtyEn: 'AI, Sustainable Engineering & Joint Research Labs',
      specialtyAr: 'الذكاء الاصطناعي، الهندسة المستدامة والمختبرات البحثية المشتركة',
      specialtyZh: '人工智能、可持续工程与联合前沿实验室',
      specialtyCkb: 'زیرەکی دەستکرد، ئەندازیاری و تاقیگەی هاوبەش',
      mouScopeEn: 'Bilateral postgraduate research fellowships, dual master tracks, and technical innovation workshops.',
      mouScopeAr: 'زمالات أبحاث الدراسات العليا الثنائية، مسارات الماجستير المزدوج وورش الابتكار التقني.',
      mouScopeZh: '双边硕博联合培养奖学金、双硕士学位项目及前沿技术创新工坊。',
      mouScopeCkb: 'زەمالەی ماستەر و دکتۆرا، خولە تەکنیکییە پێشکەوتووەکان.',
      tierBadge: 'Tier 1 Global Partner'
    },
    {
      id: 'peking',
      nameEn: 'Peking University (PKU)',
      nameAr: 'جامعة بكين',
      nameZh: '北京大学',
      nameCkb: 'زانکۆی بەکین (PKU)',
      locationEn: 'Beijing, China',
      locationAr: 'بكين، الصين',
      locationZh: '中国北京',
      locationCkb: 'بەکین، چین',
      specialtyEn: 'Mesopotamian-Chinese Civilizational Dialogue & Archaeology',
      specialtyAr: 'حوار الحضارات الرافدينية-الصينية والآثار والتاريخ المقارن',
      specialtyZh: '两河-华夏古文明互鉴、考古学与比较历史学',
      specialtyCkb: 'دیالۆگی شارستانی میزۆپۆتامیا-چین و شوێنەوارناسی',
      mouScopeEn: 'Academic faculty sabbaticals, ancient cuneiform and Chinese script symposia, and joint heritage restoration archives.',
      mouScopeAr: 'إقامات التفرغ العلمي للأساتذة، مؤتمرات مقارنة النصوص المسمارية والصينية القديمة، وأرشيف ترميم التراث المشترك.',
      mouScopeZh: '教授学术休假互访、古楔形文字与汉字演变研讨会及联合遗产保护数字化档案。',
      mouScopeCkb: 'نیشتەجێبوونی مامۆستایان، سیمپۆزیۆمی دەقە کۆنەکان و پاراستنی کەلەپوور.',
      tierBadge: 'Humanities & Heritage Hub'
    },
    {
      id: 'nanjing',
      nameEn: 'Nanjing University',
      nameAr: 'جامعة نانجينغ',
      nameZh: '南京大学',
      nameCkb: 'زانکۆی نانجینگ',
      locationEn: 'Nanjing, Jiangsu, China',
      locationAr: 'نانجينغ، جيانغسو، الصين',
      locationZh: '中国江苏南京',
      locationCkb: 'نانجینگ، چین',
      specialtyEn: 'Sister Schools Network & Youth STEM Immersion',
      specialtyAr: 'شبكة المدارس الشقيقة والعلوم والتكنولوجيا والروبوتات للشباب',
      specialtyZh: '姊妹校友好网络、青少年科技与机器人研学',
      specialtyCkb: 'تۆڕی قوتابخانە برایەتییەکان و تەکنەلۆژیای ڕۆبۆت بۆ لاوان',
      mouScopeEn: 'High school exchange delegations, robotics competitions, and language teacher pedagogy accords.',
      mouScopeAr: 'وفود التبادل لطلبة المدارس الثانوية، مسابقات الروبوتات، وتطوير أساليب معلمي اللغات.',
      mouScopeZh: '中学生互访团组、双边青少年机器人挑战赛及国际中文教师教学法合作。',
      mouScopeCkb: 'شاندی خوێندنگا ئامادەییەکان، کێبڕکێی ڕۆبۆت و ڕاهێنانی مامۆستایان.',
      tierBadge: 'Youth STEM & Sister Schools'
    },
    {
      id: 'baghdad',
      nameEn: 'University of Baghdad',
      nameAr: 'جامعة بغداد',
      nameZh: '巴格达大学',
      nameCkb: 'زانکۆی بەغدا',
      locationEn: 'Baghdad, Iraq',
      locationAr: 'بغداد، العراق',
      locationZh: '伊拉克巴格达',
      locationCkb: 'بەغدا، عێراق',
      specialtyEn: 'Sino-Iraqi Economic Policy & Bilateral Languages',
      specialtyAr: 'السياسات الاقتصادية الصينية-العراقية واللغات والترجمة المتبادلة',
      specialtyZh: '中伊经贸政策研究、双向语言教学与翻译学',
      specialtyCkb: 'سیاسەتی ئابووری عێراق-چین و وەرگێڕان',
      mouScopeEn: 'Co-chairing the CISE academic syndicate, student credit recognition, and annual economic policy symposia.',
      mouScopeAr: 'الرئاسة المشتركة للمجمع الأكاديمي لمعهد CISE، معادلة الساعات الدراسية، ومنتديات السياسة الاقتصادية السنوية.',
      mouScopeZh: '共同主导 CISE 智库学术联盟、学分互认互转机制及年度双边经贸政策研讨会。',
      mouScopeCkb: 'هاوسەرۆکایەتی ئەکادیمی، دانپێدانانی نمرەی زانکۆیی و کۆڕبەندی ساڵانە.',
      tierBadge: 'National Institutional Anchor'
    },
    {
      id: 'mustansiriyah',
      nameEn: 'Mustansiriyah University',
      nameAr: 'الجامعة المستنصرية',
      nameZh: '穆斯坦西里亚大学',
      nameCkb: 'زانکۆی موستەنسرییە',
      locationEn: 'Baghdad, Iraq',
      locationAr: 'بغداد، العراق',
      locationZh: '伊拉克巴格达',
      locationCkb: 'بەغدا، عێراق',
      specialtyEn: 'Historical Silk Road Archives & Medicine',
      specialtyAr: 'أرشيف طريق الحرير التاريخي والطب والعلوم الطبية الحيوية',
      specialtyZh: '古丝绸之路历史档案、医学与生物医药研究',
      specialtyCkb: 'ئەرشیڤی مێژوویی ڕێگای ئاوریشم و پزیشکی',
      mouScopeEn: 'Preservation of historical cross-cultural manuscripts and traditional medicine academic comparative colloquiums.',
      mouScopeAr: 'حفظ المخطوطات التاريخية العابرة للثقافات والندوات المقارنة في العلوم الطبية والصيدلانية.',
      mouScopeZh: '跨文化历史文献数字化抢救保护、传统医学与现代制药跨学科交流。',
      mouScopeCkb: 'پاراستنی دەستنووسە مێژووییەکان و توێژینەوەی پزیشکی.',
      tierBadge: 'Heritage & Medical Sciences'
    },
    {
      id: 'sulaimani',
      nameEn: 'University of Sulaimani',
      nameAr: 'جامعة السليمانية',
      nameZh: '苏莱曼尼亚大学',
      nameCkb: 'زانکۆی سلێمانی',
      locationEn: 'Sulaymaniyah, Kurdistan Region, Iraq',
      locationAr: 'السليمانية، إقليم كردستان، العراق',
      locationZh: '伊拉克库区苏莱曼尼亚',
      locationCkb: 'سلێمانی، هەرێمی کوردستان',
      specialtyEn: 'Regional Logistics, Energy Corridors & Kurdish-Chinese Translation',
      specialtyAr: 'اللوجستيات الإقليمية، ممرات الطاقة، والترجمة الكردية-الصينية',
      specialtyZh: '区域物流走廊、能源供应链与库尔德语-汉语互译',
      specialtyCkb: 'لۆجستی هەرێمی، ڕێڕەوی وزە و وەرگێڕانی کوردی-چینی',
      mouScopeEn: 'Direct integration with the Chinese Centre tutoring curriculum and annual Sino-Iraqi Economic Summit academic track.',
      mouScopeAr: 'التكامل المباشر مع مناهج المركز الصيني لتعليم اللغة، والمسار الأكاديمي للقمة الاقتصادية السنوية.',
      mouScopeZh: '与智库直属中文教学中心深度贯通、承办年度经济峰会高校学术分论坛。',
      mouScopeCkb: 'پەیوەندی ڕاستەوخۆ لەگەڵ سەنتەری زمانی چینی و کارنامەی لووتکەی ساڵانە.',
      tierBadge: 'Regional Corridor Liaison'
    }
  ];

  const t = {
    title: lang === 'ar' ? 'شبكة الجامعات والمراكز الأكاديمية الشريكة' : lang === 'zh' ? '中伊双边顶尖合作院校与学术同盟' : lang === 'ckb' ? 'تۆڕی زانکۆ و ناوەندە ئەکادیمییە هاوبەشەکان' : 'Partner Universities & Academic Alliances',
    subtitle: lang === 'ar' ? 'مذكرات تفاهم رسمية وشراكات استراتيجية تجمع أرقى جامعات العراق والصين تحت إشراف معهد CISE.' : lang === 'zh' ? '在中伊智库 (CISE) 统一协调下，汇聚两国顶尖高校、联合实验室与国际学术联合体。' : lang === 'ckb' ? 'یاداشتنامەی فەرمی و هاوبەشی ستراتیژی نێوان زانکۆ سەرەکییەکانی عێراق و چین لەژێر چاودێری CISE.' : 'Official institutional accords and research consortia linking leading Iraqi and Chinese universities under CISE governance.',
    backToLanding: lang === 'ar' ? 'العودة للتبادل الثقافي' : lang === 'zh' ? '返回文化交流主页' : lang === 'ckb' ? 'گەڕانەوە بۆ ئاڵوگۆڕی کولتووری' : 'Back to Cultural Exchange',
    mouScope: lang === 'ar' ? 'نطاق مذكرة التفاهم والبرامج المشتركة:' : lang === 'zh' ? '谅解备忘录核心合作范畴：' : lang === 'ckb' ? 'بواری لێکتێگەیشتن و هاوکاری:' : 'MOU Scope & Bilateral Tracks:',
    inquireMOU: lang === 'ar' ? 'طلب تنسيق شراكة جامعية' : lang === 'zh' ? '申请对接校际合作' : lang === 'ckb' ? 'داواکاری هاوبەشی زانکۆیی' : 'Inquire for University MOU',
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
            <Link to={`/${lang}/institute/services/cultural-exchange/partners`} className="px-3 py-1.5 rounded-lg bg-[var(--color-brand-800)]/20 text-[var(--color-brand-800)]">
              {lang === 'ar' ? 'الجامعات الشريكة' : lang === 'zh' ? '合作院校' : lang === 'ckb' ? 'زانکۆ هاوبەشەکان' : 'Partner Universities'}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/apply`} className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5">
              {lang === 'ar' ? 'طلب التقديم' : lang === 'zh' ? '在线申请' : lang === 'ckb' ? 'داواکاری' : 'Apply / Inquire'}
            </Link>
            <Link to={`/${lang}/institute/services/cultural-exchange/faq`} className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5">
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
            <span>Academic Consortia & MOUs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-paper-950 dark:text-paper-50 uppercase tracking-tight">
            {t.title}
          </h1>
          <p className="text-sm sm:text-base text-paper-700 dark:text-paper-300 max-w-3xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => {
            const name = lang === 'ar' ? partner.nameAr : lang === 'zh' ? partner.nameZh : lang === 'ckb' ? partner.nameCkb : partner.nameEn;
            const location = lang === 'ar' ? partner.locationAr : lang === 'zh' ? partner.locationZh : lang === 'ckb' ? partner.locationCkb : partner.locationEn;
            const specialty = lang === 'ar' ? partner.specialtyAr : lang === 'zh' ? partner.specialtyZh : lang === 'ckb' ? partner.specialtyCkb : partner.specialtyEn;
            const mouScope = lang === 'ar' ? partner.mouScopeAr : lang === 'zh' ? partner.mouScopeZh : lang === 'ckb' ? partner.mouScopeCkb : partner.mouScopeEn;

            return (
              <div
                key={partner.id}
                className="p-6 rounded-3xl bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-800 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-[var(--color-brand-800)]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-brand-800)] bg-[var(--color-brand-800)]/10 px-2.5 py-1 rounded-md">
                      {partner.tierBadge}
                    </span>
                    <Building2 className="w-5 h-5 text-paper-400 group-hover:text-[var(--color-brand-800)] transition" />
                  </div>

                  <div>
                    <h3 className="text-lg font-serif font-bold text-paper-950 dark:text-white group-hover:text-brand-700 dark:group-hover:text-amber-400 transition">
                      {name}
                    </h3>
                    <p className="text-xs text-paper-500 mt-0.5 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" />
                      <span>{location}</span>
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-paper-100 dark:bg-paper-800 border border-paper-200 dark:border-paper-700 text-xs">
                    <span className="block font-bold text-paper-900 dark:text-paper-100 mb-1">
                      {specialty}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] uppercase font-bold text-paper-500 block">
                      {t.mouScope}
                    </span>
                    <p className="text-paper-700 dark:text-paper-300 leading-relaxed">
                      {mouScope}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-paper-200 dark:border-paper-800 flex items-center justify-between">
                  <Link
                    to={`/${lang}/institute/services/cultural-exchange/programs`}
                    className="text-xs font-bold text-brand-800 dark:text-brand-400 hover:underline"
                  >
                    View Programs →
                  </Link>

                  <Link
                    to={`/${lang}/institute/services/cultural-exchange/apply?partner=${partner.id}`}
                    className="px-3 py-1.5 rounded-lg bg-[var(--color-ink-900)] hover:bg-[#1E293B] text-white text-[11px] font-bold transition"
                  >
                    Apply Track
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Institutional MOU Inquiry Block */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[var(--color-ink-900)] to-[#1E293B] text-white border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-xl font-black uppercase tracking-tight text-amber-400">
              {lang === 'ar' ? 'هل تمثل جامعة أو معهداً أكاديمياً؟' : lang === 'zh' ? '高校或科研机构申请加入双边学术联盟' : lang === 'ckb' ? 'نوێنەرایەتی زانکۆ یان ناوەندی ئەکادیمی دەکەیت؟' : 'Represent a University or Research Institute?'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {lang === 'ar' ? 'يقدم معهد CISE التنسيق السيادي لتوقيع مذكرات التفاهم واعتماد الساعات المتبادلة وبرامج المنح الممولة.' : lang === 'zh' ? 'CISE 智库为中伊高校提供备忘录起草、学分认证与双边联合实验室共建的主权级统筹通道。' : lang === 'ckb' ? 'پەیمانگای CISE ئاسانکاری دەکات بۆ واژۆکردنی یاداشتنامەی هاوبەش و زەمالەی خوێندن.' : 'CISE provides sovereign coordination for bilateral academic MOUs, credit transfers, and funded research labs.'}
            </p>
          </div>
          <Link
            to={`/${lang}/institute/services/cultural-exchange/apply?type=mou`}
            className="px-6 py-3 rounded-xl bg-[var(--color-brand-800)] hover:bg-[var(--color-brand-900)] text-[var(--color-ink-900)] font-black text-xs uppercase tracking-wider transition whitespace-nowrap shadow-md"
          >
            {t.inquireMOU}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CulturalExchangePartners;
