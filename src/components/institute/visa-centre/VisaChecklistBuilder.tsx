import React, { useState } from 'react';
import { CheckSquare, Square, Printer, Download, Share2, FileCheck2, Info, AlertTriangle } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';

interface VisaChecklistBuilderProps {
  lang: Locale;
  id?: string;
}

export const VisaChecklistBuilder: React.FC<VisaChecklistBuilderProps> = ({
  lang,
  id = 'visa-checklist-builder'
}) => {
  const { vt } = useVisaCentreI18n(lang);
  const [direction, setDirection] = useState<'iraq-to-china' | 'china-to-iraq'>('iraq-to-china');
  const [category, setCategory] = useState<'business' | 'tourist' | 'student' | 'work'>('business');
  const [applicantType, setApplicantType] = useState<'corporate' | 'owner' | 'individual'>('corporate');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (itemId: string) => {
    setCheckedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const getRequirementsList = () => {
    const list: Array<{ id: string; title: string; desc: string; mandatory: boolean; format: string }> = [];

    // Universal items
    list.push({
      id: 'req-passport',
      title: lang === 'zh' ? '护照原件及资料页彩色复印件' : lang === 'ar' ? 'جواز السفر الأصلي ونسخة ملونة' : lang === 'ckb' ? 'پاسپۆرتی ئەسڵی و کۆپی ڕەنگاوڕەنگ' : 'Original Passport & High-Resolution Color Copy',
      desc: lang === 'zh' ? '有效期自拟离境日起不少于6个月，并至少留有2页空白签证页。' : lang === 'ar' ? 'صلاحية لا تقل عن 6 أشهر من تاريخ المغادرة المتوقع مع صفحتين فارغتين على الأقل.' : lang === 'ckb' ? 'لانیکەم 6 مانگ مابێت بۆ بەسەرچوونی و دوو لاپەڕەی بەتاڵی تێدابێت.' : 'Minimum 6 months validity remaining from intended departure date with at least 2 blank visa pages.',
      mandatory: true,
      format: 'Original + A4 Color Photocopy'
    });

    list.push({
      id: 'req-photos',
      title: lang === 'zh' ? '标准领事规格白底近照 (2张)' : lang === 'ar' ? 'صورتان شخصيتان حديثتان بخلفية بيضاء' : lang === 'ckb' ? 'دوو وێنەی کەسی بە باکگراوندی سپی' : 'Two Recent Standard Consular Photos (White Background)',
      desc: lang === 'zh' ? '尺寸33mm×48mm，光面无边框，拍摄于近6个月内，免冠不露齿。' : lang === 'ar' ? 'حجم 33×48 ملم، بدون حواف، مأخوذة خلال 6 أشهر مع وضوح ملامح الوجه والأذنين.' : lang === 'ckb' ? 'قەبارەی 33×48 ملم لە 6 مانگی ڕابردوودا گیرابێت و گوێ و ناوچەوان دیاربێت.' : 'Size 33mm × 48mm, glossy, taken within past 6 months, bareheaded with neutral facial expression.',
      mandatory: true,
      format: 'Printed Photos (33mm × 48mm)'
    });

    if (direction === 'iraq-to-china') {
      list.push({
        id: 'req-cova',
        title: lang === 'zh' ? '中国签证在线填表确认页及完整表格' : lang === 'ar' ? 'استمارة طلب التأشيرة الإلكترونية المطبوعة (COVA)' : lang === 'ckb' ? 'فۆڕمی پەسەندکراوی ئۆنلاین (COVA)' : 'Printed COVA Confirmation & Full Application Form',
        desc: lang === 'zh' ? '在官方系统填报无误后打印并由申请人亲笔签名。' : lang === 'ar' ? 'مطبوعة من الموقع الرسمي مع توقيع مقدم الطلب المباشر.' : lang === 'ckb' ? 'چاپکراو لە سیستەمی فەرمی و واژۆکراو لەلایەن داواکارەوە.' : 'Generated through the official Chinese Online Visa Application system and signed by applicant.',
        mandatory: true,
        format: 'A4 Printed Form with Barcode'
      });

      if (category === 'business') {
        list.push({
          id: 'req-invitation',
          title: lang === 'zh' ? '中方单位正式商业邀请函' : lang === 'ar' ? 'خطاب الدعوة التجارية الرسمي من الشركة الصينية' : lang === 'ckb' ? 'بانگهێشتنامەی فەرمی کۆمپانیای چین' : 'Official Chinese Commercial Invitation Letter',
          desc: lang === 'zh' ? '出具在公司公文信笺上，加盖红印公章与法人代表亲笔签名，注明统一社会信用代码。' : lang === 'ar' ? 'صادر على الورق الرسمي للشركة الصينية مع الختم الرسمي وتوقيع المفوض وبيانات السجل.' : lang === 'ckb' ? 'لەسەر کاغەزی فەرمی کۆمپانیا مۆرکراو و واژۆکراو بێت.' : 'Issued on company letterhead with official seal, legal representative signature, and unified social credit code.',
          mandatory: true,
          format: 'Scanned / Original Color PDF'
        });

        list.push({
          id: 'req-iraqi-biz',
          title: lang === 'zh' ? '伊拉克企业工商登记及商会会员证' : lang === 'ar' ? 'شهادة السجل التجاري وهوية غرفة التجارة العراقية' : lang === 'ckb' ? 'تۆماری بازرگانی و ناسنامەی ژووری بازرگانی' : 'Iraqi Commercial Registration & Chamber of Commerce ID',
          desc: lang === 'zh' ? '证明申请人与伊拉克本地商业实体的真实雇佣或法人所有关系。' : lang === 'ar' ? 'تثبت العلاقة القانونية للمتقدم مع الشركة أو الكيان التجاري في العراق أو إقليم كوردستان.' : lang === 'ckb' ? 'بۆ سەلماندنی چالاکی بازرگانی و پێگەی داواکار لە کۆمپانیا.' : 'Documenting valid corporate legal status and commercial standing of the Iraqi employer or owner.',
          mandatory: true,
          format: 'Certified Copy + Certified Translation'
        });

        list.push({
          id: 'req-bank-stmt',
          title: lang === 'zh' ? '近6个月公司或个人银行流水账单' : lang === 'ar' ? 'كشف حساب بنكي لآخر 6 أشهر' : lang === 'ckb' ? 'کەشف حیسابی بانکی بۆ 6 مانگی ڕابردوو' : 'Bank Statement for the Past 6 Months',
          desc: lang === 'zh' ? '盖有商业银行公章，证明有充足的经贸履约及差旅支付能力。' : lang === 'ar' ? 'مختوم من مصرف معتمد يثبت الملاءة المالية وتغطية نفقات السفر.' : lang === 'ckb' ? 'مۆری بانکی لەسەربێت و سەلمێنەری توانای دارایی بێت.' : 'Official bank seal showing active financial transactions and sufficient travel liquidity.',
          mandatory: true,
          format: 'Original Bank Stamp on Official Stationery'
        });
      }

      if (category === 'tourist') {
        list.push({
          id: 'req-flights-hotels',
          title: lang === 'zh' ? '往返机票与全程酒店订单' : lang === 'ar' ? 'تذاكر الطيران ذهاباً وإياباً وحجوزات الفنادق' : lang === 'ckb' ? 'بلیتی فڕۆکە و حجزکردنی هۆتێل' : 'Round-Trip Flight Itinerary & Hotel Bookings',
          desc: lang === 'zh' ? '机票与酒店预订需覆盖在华全程每一天。' : lang === 'ar' ? 'تغطي كامل فترة الإقامة المخططة في المدن الصينية.' : lang === 'ckb' ? 'تەواوی ماوەی مانەوە لە شارەکانی چین بگرێتەوە.' : 'Reservations matching the exact itinerary and duration of the proposed stay in China.',
          mandatory: true,
          format: 'Confirmed Itinerary Vouchers'
        });

        list.push({
          id: 'req-itinerary',
          title: lang === 'zh' ? '详细赴华每日旅行日程安排' : lang === 'ar' ? 'برنامج الرحلة اليومي التفصيلي في الصين' : lang === 'ckb' ? 'پلانی ڕۆژانەی گەشت لە چین' : 'Day-by-Day Travel Itinerary in China',
          desc: lang === 'zh' ? '列明所访城市、景点及计划交通方式。' : lang === 'ar' ? 'يوضح المدن والمعالم المراد زيارتها ووسائل التنقل.' : lang === 'ckb' ? 'شار و شوێنە گەشتیارییەکان و شێوازی گواستنەوە.' : 'Chronological plan indicating destinations, attractions, and inter-city transportation.',
          mandatory: true,
          format: 'Written / Printed Schedule'
        });
      }

      if (category === 'student') {
        list.push({
          id: 'req-admission',
          title: lang === 'zh' ? '中国大学录取通知书原件及复印件' : lang === 'ar' ? 'إشعار القبول الأصلي من الجامعة الصينية' : lang === 'ckb' ? 'نووسراوی وەرگرتنی فەرمی لە زانکۆی چین' : 'Original Admission Notice from Chinese University',
          desc: lang === 'zh' ? '盖有大学招生办公室公章的正式录取公函。' : lang === 'ar' ? 'مختوم رسمياً من مكتب قبول الطلبة الأجانب في الجامعة المضيفة.' : lang === 'ckb' ? 'مۆرکراو لەلایەن بەشی وەرگرتنی خوێندکارانی زانکۆ.' : 'Official admission document issued by accredited Chinese higher education institution.',
          mandatory: true,
          format: 'Original + 1 Copy'
        });

        list.push({
          id: 'req-jw',
          title: lang === 'zh' ? '外国留学人员来华签证申请表 (JW201 或 JW202)' : lang === 'ar' ? 'استمارة تأشيرة الدراسة المعتمدة (JW201 أو JW202)' : lang === 'ckb' ? 'فۆڕمی خوێندنی فەرمی باڵا (JW201 یان JW202)' : 'Visa Application for Study in China (Form JW201 or JW202)',
          desc: lang === 'zh' ? '由中国教育部及被授权单位审核出具的官方留学批件。' : lang === 'ar' ? 'الوثيقة الحكومية الصينية الرسمية المعتمدة للابتعاث أو الدراسة.' : lang === 'ckb' ? 'بەڵگەنامەی فەرمی پەسەندکراوی وەزارەتی پەروەردەی چین.' : 'Official government study endorsement form issued by Chinese authorities.',
          mandatory: true,
          format: 'Original Yellow / Green Form with Ministry Barcode'
        });
      }
    } else {
      // China to Iraq
      list.push({
        id: 'req-iq-approval',
        title: lang === 'zh' ? '伊拉克内政部安全入境批文或使馆公函' : lang === 'ar' ? 'الموافقة الأمنية الصادرة من وزارة الداخلية العراقية' : lang === 'ckb' ? 'ڕەزامەندی ئەمنی لە وەزارەتی ناوخۆی عێراق' : 'Iraqi Ministry of Interior Security Clearance Letter',
        desc: lang === 'zh' ? '由伊拉克或库区内政部出具的官方准签编号。' : lang === 'ar' ? 'رقم وتاريخ الموافقة الأمنية الصادرة رسمياً من الجهات المختصة.' : lang === 'ckb' ? 'ژمارە و بەرواری ڕەزامەندی فەرمی وەزارەتی ناوخۆ.' : 'Official security approval code and official ministerial decision document.',
        mandatory: true,
        format: 'Government Approval Barcode Document'
      });

      list.push({
        id: 'req-iq-invitation',
        title: lang === 'zh' ? '伊拉克合法机构或企业邀请函' : lang === 'ar' ? 'خطاب الدعوة من الشركة أو المؤسسة العراقية' : lang === 'ckb' ? 'بانگهێشتنامەی فەرمی لایەنی عێراقی' : 'Official Invitation from Iraqi Entity',
        desc: lang === 'zh' ? '注明邀请方资质、中方人员护照号及访问目的。' : lang === 'ar' ? 'يوضح بيانات الطرف الداعي، ورقم جواز المسافر، وتفاصيل الزيارة.' : lang === 'ckb' ? 'زانیاری وردی لایەنی بانگهێشتکار و پاسپۆرتی کەسەکە.' : 'Stating host legal credentials, traveler passport details, and travel agenda.',
        mandatory: true,
        format: 'Letterhead with Iraqi Chamber Stamp'
      });
    }

    return list;
  };

  const requirements = getRequirementsList();
  const checkedCount = requirements.filter((r) => checkedItems[r.id]).length;
  const totalCount = requirements.length;
  const progressPercent = Math.round((checkedCount / totalCount) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id={id} className="p-6 rounded-2xl border border-border bg-card space-y-6">
      {/* Controls Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-border pb-5">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-royal" />
            {vt('navRequirements')} — {vt('viewChecklistBtn')}
          </h2>
          <p className="text-xs text-muted-foreground">
            {lang === 'zh'
              ? '根据您的出行方向与申办身份实时生成领事合规核对清单。'
              : lang === 'ar'
              ? 'قائمة تدقيق ديناميكية مخصصة وفق وجهتك وفئة تأشيرتك وصفة المتقدم.'
              : lang === 'ckb'
              ? 'لیستێکی تایبەت بۆ بەڵگەنامە پێویستەکان بەپێی جۆری ڤیزاکەت.'
              : 'Generate an interactive, personalized consular checklist for your specific visa filing.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-semibold text-foreground transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            {vt('printDossierBtn')}
          </button>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Direction */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
            {lang === 'zh' ? '出行方向' : lang === 'ar' ? 'اتجاه السفر' : lang === 'ckb' ? 'ئاراستەی گەشت' : 'Travel Direction'}
          </label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as any)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
          >
            <option value="iraq-to-china">{vt('dirIraqToChina')}</option>
            <option value="china-to-iraq">{vt('dirChinaToIraq')}</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
            {lang === 'zh' ? '签证类型' : lang === 'ar' ? 'فئة التأشيرة' : lang === 'ckb' ? 'جۆری ڤیزا' : 'Visa Category'}
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
          >
            <option value="business">{lang === 'zh' ? '商务贸易 (M / Commercial)' : lang === 'ar' ? 'تجارة وأعمال (M / تجاري)' : lang === 'ckb' ? 'بازرگانی (M)' : 'Commercial & Business (M)'}</option>
            <option value="tourist">{lang === 'zh' ? '旅游休闲 (L / Tourist)' : lang === 'ar' ? 'سياحة وزيارة (L / سياحي)' : lang === 'ckb' ? 'گەشتیاری (L)' : 'Tourism & Sightseeing (L)'}</option>
            <option value="student">{lang === 'zh' ? '留学深造 (X1/X2 / Study)' : lang === 'ar' ? 'دراسة أكاديمية (X1/X2)' : lang === 'ckb' ? 'خوێندن (X1/X2)' : 'Academic Study (X1/X2)'}</option>
            <option value="work">{lang === 'zh' ? '工作雇佣 (Z / Work)' : lang === 'ar' ? 'عمل وتوظيف (Z / عمل)' : lang === 'ckb' ? 'کار (Z)' : 'Work & Employment (Z)'}</option>
          </select>
        </div>

        {/* Applicant Type */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
            {lang === 'zh' ? '申请人身份' : lang === 'ar' ? 'صفة مقدم الطلب' : lang === 'ckb' ? 'پێگەی داواکار' : 'Applicant Standing'}
          </label>
          <select
            value={applicantType}
            onChange={(e) => setApplicantType(e.target.value as any)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-royal"
          >
            <option value="corporate">{lang === 'zh' ? '企业在职员工/高管' : lang === 'ar' ? 'موظف أو مدير تنفيذي بشركة' : lang === 'ckb' ? 'کارمەند یان بەڕێوەبەری کۆمپانیا' : 'Corporate Employee / Executive'}</option>
            <option value="owner">{lang === 'zh' ? '企业法定代表人/投资人' : lang === 'ar' ? 'صاحب شركة / مستثمر' : lang === 'ckb' ? 'خاوەن کۆمپانیا / وەبەرهێنەر' : 'Business Owner / Investor'}</option>
            <option value="individual">{lang === 'zh' ? '个人自由行/独立人士' : lang === 'ar' ? 'مسافر مستقل / فردي' : lang === 'ckb' ? 'گەشتیاری سەربەخۆ' : 'Independent Individual'}</option>
          </select>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-3.5 rounded-xl bg-muted/40 border border-border flex items-center justify-between gap-4">
        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span>
              {lang === 'zh' ? '清单准备就绪进度' : lang === 'ar' ? 'نسبة اكتمال تجهيز الملف' : lang === 'ckb' ? 'ڕێژەی ئامادەبوونی بەڵگەنامەکان' : 'Dossier Preparation Progress'}
            </span>
            <span className="text-royal font-bold">
              {checkedCount} / {totalCount} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-2 overflow-hidden">
            <div
              className="bg-royal h-2 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-2.5">
        {requirements.map((item) => {
          const isDone = !!checkedItems[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                isDone
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : 'border-border bg-card/60 hover:bg-card'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 text-royal shrink-0 focus:outline-none"
                aria-label={`Toggle requirement ${item.title}`}
              >
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Square className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`text-xs md:text-sm font-semibold ${isDone ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {item.title}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {item.mandatory && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400">
                        {lang === 'zh' ? '必备材料' : lang === 'ar' ? 'إلزامي' : lang === 'ckb' ? 'پێویست' : 'Mandatory'}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground">
                      {item.format}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Advice */}
      <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-muted-foreground flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-foreground">
            {lang === 'zh' ? '预审与公证说明' : lang === 'ar' ? 'ملاحظة التدقيق والتوثيق' : lang === 'ckb' ? 'تێبینی لەسەر بەڵگەنامەکان' : 'Advisory Verification Notice'}
          </p>
          <p>
            {lang === 'zh'
              ? '使领馆可能根据个案情况要求提供补充材料。若对公函或商会认证存在疑问，欢迎预约本中心顾问协助前置审核。'
              : lang === 'ar'
              ? 'تحتفظ القنصلية بحق طلب أي وثائق إضافية حسب تقديرها. يمكنك الاستعانة بفريق المركز لتدقيق سلامة الأختام والصياغة قبل التقديم.'
              : lang === 'ckb'
              ? 'کۆنسوڵگەری مافی هەیە داوای بەڵگەنامەی زیاتر بکات. تیمی ناوەند دەتوانێت پێشوەختە پشکنین بۆ بەڵگەنامەکانت بکات.'
              : 'Consulates reserve the right to request additional materials upon assessment. Consult with our advisory staff for pre-audit verification before formal filing.'}
          </p>
        </div>
      </div>
    </div>
  );
};
