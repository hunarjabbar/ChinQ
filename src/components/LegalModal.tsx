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
                {isAr ? 'المركز القانوني وسياسة الخصوصية' : isZh ? '法律合规与隐私政策中心' : isCkb ? 'ناوەندی یاسایی و سیاسەتی تایبەتمەندی' : 'Legal & Compliance Hub'}
              </h3>
              <p className="text-xs font-mono text-brand-200 opacity-90">
                {isAr ? 'مجموعة الوكالة العراقية الصينية - الشروط والأحكام والخصوصية السيادية' : isZh ? '伊中通讯社传媒集团 • 主权合规与隐私保护条款' : isCkb ? 'گرووپی ئاژانسی عێراقی - چینی • مەرج و ڕێساکانی پاراستنی زانیاری' : 'Iraqi-Chinese Media Group • Sovereign Governance & Terms'}
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
