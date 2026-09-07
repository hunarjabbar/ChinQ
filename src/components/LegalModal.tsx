import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck, FileText, Scale, Lock, Globe, Building2 } from 'lucide-react';
import { Locale } from '../types';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
  lang: Locale;
}

export function LegalModal({ isOpen, onClose, initialTab = 'privacy', lang }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  if (!isOpen) return null;

  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';

  return createPortal(
    <div className="fixed inset-0 z-[120] flex flex-col items-center justify-start bg-white dark:bg-neutral-900 overflow-y-auto">
      <div 
        className="relative w-full max-w-6xl bg-white dark:bg-neutral-900 overflow-hidden flex flex-col min-h-screen"
        dir={isAr || isCkb ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-brand-900 text-white border-b border-brand-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-800 rounded-lg">
              <Scale className="w-6 h-6 text-brand-200" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold">
                {isAr ? 'المركز القانوني وسياسة الخصوصية السيادية' : isZh ? '法律合规与主权隐私政策中心' : isCkb ? 'ناوەندی یاسایی و سیاسەتی تایبەتمەندی' : 'Legal & Sovereign Compliance Hub'}
              </h3>
              <p className="text-xs font-mono text-brand-200 opacity-90">
                {isAr ? 'مجموعة الوكالة العراقية الصينية - الشروط والأحكام والخصوصية وحماية البيانات' : isZh ? '伊中通讯社传媒集团 • 主权合规与隐私保护条款' : isCkb ? 'گرووپی ئاژانسي عێراقی - چینی • مەرج و ڕێساکانی پاراستنی زانیاری' : 'Iraqi-Chinese Media Group • Sovereign Data Governance & Terms'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-brand-800 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-6 pt-3 gap-3">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 pb-3 px-4 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'privacy'
                ? 'border-brand-800 text-brand-800 dark:text-brand-400 bg-white dark:bg-neutral-900 rounded-t-lg shadow-2xs'
                : 'border-transparent text-neutral-500 hover:text-ink-900 dark:hover:text-neutral-200'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>{isAr ? 'سياسة الخصوصية وحماية البيانات' : isZh ? '隐私政策与数据保护' : isCkb ? 'سیاسەتی تایبەتمەندی و پاراستنی داتا' : 'Privacy & Data Protection'}</span>
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 pb-3 px-4 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'terms'
                ? 'border-brand-800 text-brand-800 dark:text-brand-400 bg-white dark:bg-neutral-900 rounded-t-lg shadow-2xs'
                : 'border-transparent text-neutral-500 hover:text-ink-900 dark:hover:text-neutral-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{isAr ? 'شروط الاستخدام والخدمة' : isZh ? '服务条款与使用协议' : isCkb ? 'مەرجەکانی بەکارهێنانی خزمەتگوزاری' : 'Terms of Use & Service'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
          {activeTab === 'privacy' ? (
            <div className="space-y-6">
              <div className="border-l-4 border-brand-800 pl-4 rtl:border-r-4 rtl:pr-4 py-1 bg-brand-50/50 dark:bg-brand-950/20 rounded-r-lg">
                <h4 className="font-bold text-ink-900 dark:text-white text-base">
                  {isAr ? 'إشعار الخصوصية السيادي والتزام حماية بيانات المستخدمين' : isZh ? '主权隐私声明与用户数据保护承诺' : isCkb ? 'ئاگاداری تایبەتمەندی و بەدیهێنانی پاراستنی زانیاری' : 'Sovereign Privacy Notice & Commitment'}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-1">
                  {isAr ? 'آخر تحديث: سبتمبر ٢٠٢٦ • معتمد من مكاتب بغداد وبكين' : isZh ? '最新更新：2026年9月 • 巴格达与北京联合法律顾问处审核' : isCkb ? 'نوێترین نوێکردنەوە: ئەیلوولی ٢٠٢٦ • پەسەندکراوی ئۆفیسی بەغداد و پەکین' : 'Effective Date: September 2026 • Verified by Baghdad & Beijing Legal Counsels'}
                </p>
              </div>

              <div className="space-y-4">
                <h5 className="font-serif font-bold text-ink-900 dark:text-white text-base flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-800" />
                  <span>1. {isAr ? 'نطاق جمع البيانات والمعلومات الشخصية' : isZh ? '1. 数据收集范围与个人信息' : isCkb ? '1. چوارچێوەی کۆکردنەوەی زانیاری و داتای کەسی' : '1. Scope of Data Collection & Personal Information'}</span>
                </h5>
                <p>
                  {isAr 
                    ? 'تقوم مجموعة الوكالة العراقية الصينية بجمع الحد الأدنى من المعلومات اللازمة لتقديم خدمات الإخبار المالي، والاشتراكات في النشرات البريدية، ودراسات البنية التحتية، وتراخيص الأعمال الثنائية. يشمل ذلك: البريد الإلكتروني، اسم المستخدم، تفضيلات اللغة، وسجلات التصفح القياسية عبر بروتوكول الإنترنت (IP).'
                    : isZh
                    ? '伊中通讯社传媒集团仅收集为您提供财经新闻订阅、双边基建项目通讯及企业名录查询所必需的最小限度个人信息。这包括：电子邮件地址、用户名、语言偏好设置以及标准服务器访问日志。'
                    : isCkb
                    ? 'گرووپی ئاژانسی عێراقی - چینی کەمترین زانیاری پێویست کۆدەکاتەوە بۆ پێشکەشکردنی هەواڵە داراییەکان، بەشداری لە نامەکان، و بەدواداچوونی پڕۆژەکان. ئەمەش بریتییە لە: پۆستی ئەلیکترۆنی، ناوی بەکارهێنەر، و زمان.'
                    : 'The Iraqi-Chinese Media Group collects minimal necessary data required to deliver sovereign financial briefings, newsletter subscriptions, infrastructure pipeline trackers, and bilateral business directory features. This includes: electronic mail addresses, usernames, language preferences, and standard server connection logs.'}
                </p>
              </div>

              <div className="space-y-4">
                <h5 className="font-serif font-bold text-ink-900 dark:text-white text-base flex items-center gap-2">
                  <Globe className="w-5 h-5 text-brand-800" />
                  <span>2. {isAr ? 'أمن البيانات ونقلها عبر الحدود (بغداد - بكين)' : isZh ? '2. 数据安全与跨境传输（巴格达 - 北京）' : isCkb ? '2. ئەمنی داتا و گواستنەوەی نێوان سنوورەکان (بەغداد - پەکین)' : '2. Data Security & Cross-Border Transmission (Baghdad-Beijing)'}</span>
                </h5>
                <p>
                  {isAr
                    ? 'باعتبارنا مؤسسة إعلامية واستشارية تربط الأسواق بين جمهورية العراق وجمهورية الصين الشعبية، تخضع جميع قواعد بياناتنا لأعلى معايير التشفير الصناعي (AES-256 و TLS 1.3). لا يتم بيع أو تأجير أو مشاركة بيانات المستخدمين مع أي طرف ثالث تجاري. تتم معالجة البيانات وفقاً للتشريعات المعمول بها في مراكز البيانات الآمنة في بغداد وأربيل وبكين.'
                    : isZh
                    ? '作为连接伊拉克共和国与中华人民共和国的媒体与智库机构，我们的所有数据库均采用最高工业级加密标准（AES-256与TLS 1.3）。我们绝不出售、出租或向任何第三方商业实体转让用户信息。数据处理严格遵循巴格达、埃尔比勒与北京安全数据中心之合规标准。'
                    : isCkb
                    ? 'وەک دەزگایەکی ڕاگەیاندن و ڕوێژکاری کە بازاڕەکانی عێراق و چین دەبەستێتەوە بەیەکەوە، هەموو داتابەیسەکانمان لەژێر بەهێزترین پێوەرەکانی پاراستندان (AES-256 و TLS 1.3). زانیارییەکانگیز فرۆشراو یان بەکرێ دراون بە لایەنی سێیەم.'
                    : 'As a media and advisory syndicate bridging markets between Iraq and China, all database repositories are protected with industrial-grade encryption (AES-256 & TLS 1.3). User records are never sold, leased, or monetized with commercial third parties. Data processing strictly adheres to secure regional data hosting standards across Baghdad, Erbil, and Beijing nodes.'}
                </p>
              </div>

              <div className="space-y-4">
                <h5 className="font-serif font-bold text-ink-900 dark:text-white text-base flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-brand-800" />
                  <span>3. {isAr ? 'ملفات تعريف الارتباط (Cookies) وتفضيلات الجلسة' : isZh ? '3. Cookie技术与会话偏好管理' : isCkb ? '3. فایلەکانی کووکی (Cookies) و پەسەندکراوەکانی دانیشتن' : '3. Cookies & Session Preference Management'}</span>
                </h5>
                <p>
                  {isAr
                    ? 'نستخدم ملفات تعريف الارتباط الأساسية فقط للحفاظ على تفضيلات اللغة المختار (العربية، الصينية، الكوردية، أو الإنجليزية)، وحالة وضع المظهر (الداكن والفاتح)، وحالة المصادقة الآمنة للمشتركين. يمكنك تعطيل ملفات تعريف الارتباط عبر إعدادات متصفحك، مع العلم أن بعض الوظائف التفاعلية قد تتأثر.'
                    : isZh
                    ? '我们仅使用必要的Cookie来维持您的语言偏好（中、英、阿、库尔德语）、夜间模式状态以及订阅者安全会话验证。您可以通过浏览器设置禁用Cookie，但这可能会影响某些交互式网闸功能。'
                    : isCkb
                    ? 'تەنها کووکییە سەرەکییەکان بەکاردەهێنین بۆ پاراستنی هەڵبژاردەی زمان (عەرەبی، چینی، کوردی، ئینگلیزی)، دۆخی ڕووناکی و تاریکی، و چوونەژوورەوەی ئەندامان.'
                    : 'We utilize essential session cookies strictly to preserve your selected language preference (Arabic, Chinese, Kurdish, English), dark/light display mode state, and subscriber authentication token. You may disable cookies in your browser settings, though portal interactivity may be restricted.'}
                </p>
              </div>
              <div className="space-y-4">
                <h5 className="font-serif font-bold text-ink-900 dark:text-white text-base flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-800" />
                  <span>4. {isAr ? 'حقوق بيانات المستخدم (الوصول، التصحيح، الحذف)' : isZh ? '4. 用户数据权利（访问、更正、删除）' : isCkb ? '4. مافی داتای بەکارهێنەر (دەستگەیشتن، ڕاستکردنەوە، سڕینەوە)' : '4. User Data Rights (Access, Rectification, Erasure)'}</span>
                </h5>
                <p>
                  {isAr 
                    ? 'يحتفظ المستخدمون بالحق السيادي في الوصول إلى معرفاتهم الشخصية أو تصحيحها أو طلب مسحها داخل قاعدة بيانات المجموعة. يمكن توجيه طلبات نقل البيانات أو تقييد المعالجة إلى مسؤول حماية البيانات الإقليمي عبر المكتب القانوني الرسمي.'
                    : isZh
                    ? '用户对其在财团数据库中的个人识别信息拥有访问、更正及请求删除的主权权利。数据迁移或限制处理的请求可通过官方法律事务处提交至区域数据保护专员。'
                    : isCkb
                    ? 'بەکارهێنەران مافی تەواویان هەیە بۆ دەستگەیشتن، ڕاستکردنەوە، یان داواکردنی سڕینەوەی زانیارییە کەسییەکانیان لە داتابەیسەکانی گرووپەکەدا.'
                    : 'Users maintain the sovereign right to access, rectify, or request the erasure of their personal identifiers within the syndicate’s database. Requests for data portability or restricted processing can be directed to the regional Data Protection Officer via the official legal desk.'}
                </p>
                <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2 mt-2">
                  <h6 className="font-bold text-xs uppercase tracking-widest text-brand-800 dark:text-brand-400">
                    {isAr ? 'بروتوكول طلب البيانات والتحقق السيادي' : isZh ? '数据请求协议与主权验证' : 'Data Request Protocol & Sovereign Verification'}
                  </h6>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>{isAr ? 'التحقق من الهوية السيادية مطلوب قبل أي إفصاح عن البيانات الحساسة.' : isZh ? '在任何敏感数据披露前需进行严格的主权身份验证。' : 'Sovereign identity verification is mandated prior to any sensitive data disclosure.'}</li>
                    <li>{isAr ? 'تتم معالجة الطلبات الرسمية في غضون ١٠ إلى ١٥ يوم عمل.' : isZh ? '官方请求将在 10 至 15 个工作日内完成审核。' : 'Official requests are processed within 10 to 15 standard business days.'}</li>
                    <li>{isAr ? 'يتم أرشفة جميع سجلات التدقيق لطلبات البيانات بشكل آمن لمدة سنتين كاملتين.' : isZh ? '所有数据请求的审计日志将安全保留两个完整日历年。' : 'All audit logs for data requests are securely retained for two full calendar years.'}</li>
                    <li>{isAr ? 'للاستفسارات القانونية، تواصل مع: desk@iraqi-chineseagency.com' : isZh ? '法律咨询请联系：desk@iraqi-chineseagency.com' : 'For formal legal inquiries: desk@iraqi-chineseagency.com'}</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="font-serif font-bold text-ink-900 dark:text-white text-base flex items-center gap-2">
                  <Lock className="w-5 h-5 text-brand-800" />
                  <span>5. {isAr ? 'الحماية ضد التهديدات الإلكترونية وسرقة البيانات' : isZh ? '5. 网络威胁防护与数据泄露防御' : '5. Protection Against Cyber Threats & Data Breach'}</span>
                </h5>
                <p>
                  {isAr
                    ? 'تستخدم المجموعة جدران حماية من الجيل التالي وأنظمة كشف التسلل النشطة لحماية البنية التحتية للمعلومات الثنائية. في حالة حدوث خرق أمني غير محتمل، سيتم إخطار المستخدمين المتأثرين في غضون ٤٨ ساعة.'
                    : isZh
                    ? '集团采用下一代防火墙和主动入侵检测系统来保护双边信息基础设施。在极少数发生数据泄露的情况下，受影响用户将在 48 小时内获得通知。'
                    : 'The syndicate employs next-generation firewalls and active intrusion detection systems to safeguard the bilateral information infrastructure. In the unlikely event of a security breach, affected users will be notified within 48 hours.'}
                </p>
              </div>

              <div className="space-y-4">
                <h5 className="font-serif font-bold text-ink-900 dark:text-white text-base flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-800" />
                  <span>6. {isAr ? 'سياسات حفظ البيانات والأرشفة' : isZh ? '6. 数据保留与存档政策' : isCkb ? '6. سیاسەتەکانی پاراستنی داتا و ئەرشیفکردن' : '6. Data Retention & Archive Policies'}</span>
                </h5>
                <p>
                  {isAr
                    ? 'يتم الاحتفاظ بالبيانات الشخصية المرتبطة باشتراكات النشرة الإخبارية وقوائم دليل الأعمال طوال مدة الارتباط الثنائي النشط. يتم تخزين سجلات الأرشيف للتدقيق الإداري بشكل آمن لمدة ٧ سنوات وفقاً لمعايير حفظ السجلات التجارية الدولية.'
                    : isZh
                    ? '与新闻订阅及企业名录相关的个人数据将在双边业务存续期间保留。用于行政审计的归档日志将根据国际商业记录保存标准安全存储7年。'
                    : isCkb
                    ? 'زانیارییە کەسییەکان بۆ ماوەی چالاکبوونی پەیوەندییەکان دەپارێزرێن. تۆمارە ئەکادیمییەکان بۆ ماوەی ٧ ساڵ دەپارێزرێن بەپێی پێوەرە نێودەوڵەتییەکان.'
                    : 'Personal data associated with newsletter subscriptions and business directory listings is retained for the duration of the active bilateral engagement. Archival logs for administrative auditing are stored securely for 7 years in accordance with international commercial record-keeping standards.'}
                </p>
              </div>
              <div className="space-y-4">
                <h5 className="font-serif font-bold text-ink-900 dark:text-white text-base flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-brand-800" />
                  <span>7. {isAr ? 'الامتثال للوائح حماية البيانات الإقليمية والدولية' : isZh ? '7. 区域与国际数据保护条例合规性' : '7. Compliance with Regional & International Data Regulations'}</span>
                </h5>
                <p>
                  {isAr
                    ? 'تلتزم مجموعة الوكالة العراقية الصينية بأطر حماية البيانات الوطنية في العراق والصين، بالإضافة إلى التوافق مع المعايير الدولية لحماية البيانات الصحفية. نضمن أن معالجة البيانات تتم بشفافية كاملة ولأغراض مهنية محددة فقط.'
                    : isZh
                    ? '伊中通讯社传媒集团严格遵守伊拉克与中国国家级数据保护框架，并与国际新闻数据保护标准保持一致。我们确保所有数据处理过程完全透明，且仅用于明确的专业传播目的。'
                    : 'The Iraqi-Chinese Media Group strictly adheres to national data protection frameworks in Iraq and China, while maintaining alignment with international journalistic data protection standards. We ensure all data processing is conducted with full transparency and exclusively for defined professional dissemination purposes.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border-l-4 border-brand-800 pl-4 rtl:border-r-4 rtl:pr-4 py-1 bg-brand-50/50 dark:bg-brand-950/20 rounded-r-lg">
                <h4 className="font-bold text-ink-900 dark:text-white text-base">
                  {isAr ? 'شروط وقواعد استخدام الخدمات الإخبارية والمنصات السيادية' : isZh ? '新闻服务与主权平台使用条款协议' : isCkb ? 'مەرج و ڕێساکانی بەکارهێنانی خزمەتگوزاری هەواڵی و سەکۆکان' : 'Terms of Service & Sovereign Platform Agreement'}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-1">
                  {isAr ? 'تسري الشروط على جميع الزوار، الباحثين، والمؤسسات المسجلة' : isZh ? '本协议适用于所有访问者、学者、注册会员及企业法人代表' : isCkb ? 'ئەم مەرجانە بۆ هەموو سەردانیکەران، توێژەران و کۆمپانیاکان جێبەجێ دەبن' : 'Applies to all portal visitors, researchers, corporate subscribers, and syndication partners.'}
                </p>
              </div>

              <div className="space-y-4">
                <h5 className="font-serif font-bold text-ink-900 dark:text-white text-base flex items-center gap-2">
                  <Scale className="w-5 h-5 text-brand-800" />
                  <span>1. {isAr ? 'حقوق الملكية الفكرية ونشر الدراسات الثنائية' : isZh ? '1. 知识产权与双边研究刊载权' : isCkb ? '1. مافی فیکری و بڵاوکردنەوەی توێژینەوە دوولایەنەکان' : '1. Intellectual Property & Bilateral Research Publication Rights'}</span>
                </h5>
                <p>
                  {isAr
                    ? 'جميع المواد، النصوص، التحليلات الإستراتيجية، الرسوم البيانية، والشعارات المنشورة على منصة مجموعة الوكالة العراقية الصينية هي ملكية فكرية حصرية محمية بالقانون. يحظر الاقتباس التجاري أو إعادة نشر التحليلات الطويلة دون إشارة صريحة للمصدر مع رابط تفاعلي.'
                    : isZh
                    ? '伊中通讯社传媒集团平台发布之所有文章、文字、战略分析报告、图表与标识均受版权法保护。严禁未经授权的商业引用、全文转载或伪造转载源。媒体和学术机构在注明出处并附带原文超链接的前提下可进行摘要引用。'
                    : isCkb
                    ? 'هەموو وتار، دەق، شیکردنەوەی ستراتیژی، گرافیک و لۆگۆکانی سەر ئەم سەکۆیە موڵکی تایبەتی پارێزراون. بڵاوکردنەوەی بازرگانی یان وەرگرتنی درێژخایەن بەبێ ئاماژەکردن بە سەرچاوە قەدەغەیە.'
                    : 'All articles, texts, strategic analyses, data visualizations, and mastheads published across the Iraqi-Chinese Media Group portal are proprietary intellectual property. Commercial syndication, full-text mirroring, or scraping without explicit licensing is strictly prohibited. Academic and press citations are permitted provided clear attribution and backlink are included.'}
                </p>
              </div>

              <div className="space-y-4">
                <h5 className="font-serif font-bold text-ink-900 dark:text-white text-base flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-800" />
                  <span>2. {isAr ? 'إخلاء المسؤولية عن الاستثمار والأسواق المالية' : isZh ? '2. 金融市场与投资风险免责声明' : isCkb ? '2. بێبەشبوون لە بەرپرسیارێتی دارایی و بازاڕەکان' : '2. Financial Market & Investment Disclaimer'}</span>
                </h5>
                <p>
                  {isAr
                    ? 'المؤشرات والأسعار وتحليلات البنية التحتية والمقالات الاقتصادية المنشورة هي لأغراض المعلومات العامة والبحوث السيادية فقط، ولا تُعتبر بأي حال من الأحوال نصيحة استثمارية أو توصية لشراء أو بيع الأصول المالية أو النفطية أو عقود المقاولات. تخضع القرارات الاستثمارية لتقييم المستشارين القانونيين والماليين المعتمدين.'
                    : isZh
                    ? '本站所载之市场指数、价格行情、基建管道进度跟踪及经济述评仅供宏观研究与参考，不构成任何形式的投资建议、证券经纪邀约或商业担保。一切商业与基建投资决策应由投资者自行咨询独立特许财税与法律 expert。'
                    : isCkb
                    ? 'پیشاندەرانی بازاڕ و ڕاپۆرتە ئابوورییەکان تەنها بۆ مەبەستی زانیاری گشتی و توێژینەوەن، و بە هیچ شێوەیەک ئامۆژگاری دارایی یان وەبەرهێنان نین.'
                    : 'Market tickers, macroeconomic indicators, infrastructure progress logs, and economic briefings are published strictly for informational, diplomatic, and research purposes. They do not constitute formal financial advisement, securities brokerage, or sovereign commercial warranty.'}
                </p>
              </div>

              <div className="space-y-4">
                <h5 className="font-serif font-bold text-ink-900 dark:text-white text-base flex items-center gap-2">
                  <Globe className="w-5 h-5 text-brand-800" />
                  <span>3. {isAr ? 'القانون الحاكم والاختصاص القضائي (بغداد وبكين)' : isZh ? '3. 适用法律与司法管辖权（巴格达与北京）' : isCkb ? '3. یاسای حوکمڕانی و دەسەڵاتی دادوەری (بەغداد و پەکین)' : '3. Governing Law & Jurisdictional Venue (Baghdad & Beijing)'}</span>
                </h5>
                <p>
                  {isAr
                    ? 'تخضع هذه الشروط والأحكام وتُفسر وفقاً للتشريعات والقوانين المعمول بها في جمهورية العراق وجمهورية الصين الشعبية. في حال حدوث أي نزاع يتعلق بالملكية الفكرية أو عقود الشراكة، يتم الاحتكام إلى الهيئات القانونية والمحاكم المختصة في بغداد وبكين حسب الاختصاص الموضوعي.'
                    : isZh
                    ? '本使用条款之解释与执行适用伊拉克共和国及中华人民共和国之相关法律。如因本平台使用、知识产权或双边合作项目产生任何争议，双方同意提交至巴格达及北京具有管辖权之主管仲裁机构与法院解决。'
                    : isCkb
                    ? 'ئەم مەرجانە بەپێی یاساکانی عێراق و چین جێبەجێ دەبن. لە کاتی هەر مشتومڕێکدا، دادگا و دەزگا دادوەرییە پەیوەندیدارەکانی بەغداد و پەکین دەسەڵاتی یەکلاکەرەوەیان دەبێت.'
                    : 'This agreement is governed by and construed in accordance with the sovereign legal frameworks of the Republic of Iraq and the People’s Republic of China. Any disputes arising from portal operations, IP enforcement, or bilateral syndication shall be settled under the jurisdiction of competent tribunals in Baghdad and Beijing.'}
                </p>
              </div>
              <div className="space-y-4">
                <h5 className="font-serif font-bold text-ink-900 dark:text-white text-base flex items-center gap-2">
                  <Lock className="w-5 h-5 text-brand-800" />
                  <span>4. {isAr ? 'قيود الاستخدام والسلوك المهني' : isZh ? '4. 使用限制与专业行为准则' : isCkb ? '4. مەرجەکانی بەکارهێنان و ڕەفتاری پیشەیی' : '4. Usage Restrictions & Professional Conduct'}</span>
                </h5>
                <p>
                  {isAr
                    ? 'يوافق المستخدمون على استخدام المنصة لأغراض البحوث المهنية والأكاديمية والتجارية فقط. تشمل الإجراءات المحظورة جمع البيانات الآلي (Scraping)، أو محاولات حجب الخدمة، أو نشر الشائعات الثنائية غير المؤكدة. يؤدي انتهاك هذه المعايير إلى إلغاء فوري لاعتمادات الوصول للمؤسسة.'
                    : isZh
                    ? '用户同意仅将门户用于专业、学术及商业研究目的。严禁行为包括自动化数据抓取（Scraping）、拒绝服务攻击（DoS）或传播未经证实的双边谣言。违反此类规范将导致立即撤销企业访问凭证。'
                    : isCkb
                    ? 'بەکارهێنەران ڕازی دەبن کە سەکۆکە تەنها بۆ مەبەستی پیشەیی و ئەکادیمی بەکاربهێنن. کۆکردنەوەی زانیاری بە شێوەی ئۆتۆماتیکی و بڵاوکردنەوەی دەنگۆی ناڕاست قەدەغەیە.'
                    : 'Users agree to utilize the portal for professional, academic, and commercial research only. Prohibited actions include automated data harvesting (scraping), denial-of-service attempts, or the propagation of unverified bilateral rumors. Violation of these norms results in immediate revocation of enterprise access credentials.'}
                </p>
              </div>

              <div className="space-y-4">
                <h5 className="font-serif font-bold text-ink-900 dark:text-white text-base flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-brand-800" />
                  <span>5. {isAr ? 'بند استمرارية الخدمة والسيادة' : isZh ? '5. 服务持续性与主权条款' : isCkb ? '5. بەردەوامی خزمەتگوزاری و مەرجی سەروەری' : '5. Service Continuity & Sovereignty Clause'}</span>
                </h5>
                <p>
                  {isAr
                    ? 'تحتفظ مجموعة الوكالة العراقية الصينية بالحق في تعديل أو تعليق أو تقييد وظائف المنصة للامتثال للوائح الاتصالات الإقليمية المتطورة أو التوجيهات الأمنية السيادية في بغداد أو بكين. يتم تقديم مستويات الخدمة على أساس "حسب التوفر" دون ضمان وقت تشغيل محدد.'
                    : isZh
                    ? '伊中通讯社传媒集团保留修改、暂停或限制门户功能以符合巴格达或北京不断变化的区域电信法规或主权安全指令的权利。服务按“现有”基础提供，不保证持续运行时间。'
                    : isCkb
                    ? 'ئاژانسی عێراقی - چینی مافی گۆڕانکاری و ڕاگرتنی خزمەتگوزارییەکانی هەیە بەپێی یاساکانی پەيوەندی لە بەغداد و پەکین.'
                    : 'The Iraqi-Chinese Media Group reserves the right to modify, suspend, or restrict portal functionality to comply with evolving regional telecommunications regulations or sovereign security directives in Baghdad or Beijing. Service levels are provided on an "as-available" basis without guaranteed uptime.'}
                </p>
              </div>

              <div className="space-y-4">
                <h5 className="font-serif font-bold text-ink-900 dark:text-white text-base flex items-center gap-2">
                  <Globe className="w-5 h-5 text-brand-800" />
                  <span>6. {isAr ? 'سياسة روابط الطرف الثالث والاعتماد' : isZh ? '6. 第三方链接与认证政策' : '6. Third-Party Links & Accreditation Policy'}</span>
                </h5>
                <p>
                  {isAr
                    ? 'قد تحتوي المنصة على روابط لمواقع خارجية. لا تتحمل المجموعة مسؤولية المحتوى أو دقة المعلومات على تلك المواقع. يجب أن يتم توثيق أي ادعاء بالاعتماد من قبل المجموعة عبر القنوات الرسمية فقط.'
                    : isZh
                    ? '本平台可能包含指向第三方网站的链接。集团不对该等网站的内容或信息的准确性负责。任何声称获得集团认证的主张必须仅通过官方渠道进行核实。'
                    : 'The portal may contain links to external websites. The syndicate assumes no responsibility for the content or accuracy of information on such sites. Any claims of accreditation by the syndicate must be verified exclusively through official channels.'}
                </p>
              </div>

              <div className="space-y-4">
                <h5 className="font-serif font-bold text-ink-900 dark:text-white text-base flex items-center gap-2">
                  <Lock className="w-5 h-5 text-brand-800" />
                  <span>7. {isAr ? 'إنهاء الوصول وإلغاء الاشتراك والجزاءات القانونية' : isZh ? '7. 终止访问、注销订阅与法律制裁' : '7. Termination of Access, Unsubscription & Legal Sanctions'}</span>
                </h5>
                <p>
                  {isAr
                    ? 'نحتفظ بالحق في إنهاء وصول المستخدمين الذين ينخرطون في سلوكيات تنتهك معايير النزاهة الإعلامية أو يحاولون التلاعب بالبيانات الاقتصادية المنشورة. قد تتبع الانتهاكات الخطيرة إجراءات قانونية رسمية أمام المحاكم المختصة.'
                    : isZh
                    ? '我们保留终止从事违反媒体诚信准则或试图操纵发布的经济数据的用户访问权限的权利。严重违规行为可能会在相关法院面临正式的法律诉讼。'
                    : 'We reserve the right to terminate access for users who engage in conduct that violates media integrity standards or attempts to manipulate published economic data. Serious violations may be followed by formal legal proceedings before competent courts.'}
                </p>
              </div>
              <div className="bg-brand-50 dark:bg-brand-950/20 p-5 rounded-xl border border-brand-100 dark:border-brand-900/30 mt-6">
                <h6 className="text-sm font-bold text-brand-900 dark:text-brand-300 mb-2">
                  {isAr ? 'إعلان الامتثال الرسمي' : isZh ? '正式合规声明' : 'Official Compliance Declaration'}
                </h6>
                <p className="text-xs leading-relaxed opacity-80 italic">
                  {isAr 
                    ? 'يُقر المستخدم من خلال الاستمرار في استخدام هذه المنصة بأنه قد قرأ وفهم جميع الشروط والأحكام والسياسات المذكورة أعلاه، ويوافق على الالتزام بها كإطار تعاقدي ملزم بينه وبين مجموعة الوكالة العراقية الصينية.'
                    : isZh
                    ? '通过继续使用本平台，用户确认已阅读并理解上述所有条款、条件和政策，并同意将其作为其与伊中通讯社传媒集团之间具有约束力的合同框架。'
                    : 'By continuing to use this platform, the user acknowledges that they have read and understood all the terms, conditions, and policies stated above, and agrees to be bound by them as a binding contractual framework between them and the Iraqi-Chinese Media Group.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-100 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
          <div className="text-xs font-mono text-neutral-500">
            {isAr ? 'جميع الحقوق محفوظة لمجموعة الوكالة العراقية الصينية' : isZh ? '伊中通讯社传媒集团版权所有' : isCkb ? 'هەموو مافەکان پارێزراون' : 'Iraqi-Chinese Media Group • Official Governance Desk'}
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-brand-800 hover:bg-brand-900 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm"
          >
            {isAr ? 'إغلاق النافذة' : isZh ? '关闭窗口' : isCkb ? 'داخستن' : 'Close Hub'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
