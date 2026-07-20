import { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Locale } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Mail, 
  Send, 
  CheckCircle, 
  Calendar, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  Globe,
  Lock
} from 'lucide-react';

const translations = {
  en: {
    title: 'About ChinQ Media Group',
    subtitle: 'The Sovereign Gateway bridging East Asia and the Middle East',
    intro: "ChinQ Media Group represents a strategic and cultural bridge between the People's Republic of China and the Republic of Iraq. Built upon the profound historical connections of the ancient Silk Road, this project serves as a modern digital conduit for economic, political, and cultural exchange.",
    importanceTitle: 'Strategic Importance',
    importanceDesc: 'The significance of ChinQ lies in its ability to synthesize trilingual reporting—English, Arabic, Kurdish (Sorani), and Mandarin Chinese—into a cohesive editorial voice. As bilateral trade and infrastructure investments (such as the Belt and Road Initiative and the Al Faw Grand Port) continue to expand, there is a critical need for an authoritative, real-time platform that provides accurate market data, geopolitical analysis, and enterprise-level logistics intelligence.',
    futureTitle: 'Future Potential',
    futureDesc: 'Looking forward, ChinQ has the potential to evolve beyond a media portal into a comprehensive enterprise hub. From a diplomatic perspective, it can facilitate tighter academic and cultural alliances, fostering mutual understanding. Economically, its real-time market integrations and B2B directories can streamline cross-border investments, joint ventures, and supply chain logistics.',
    
    // Milestones
    milestoneTitle: 'Strategic Milestones',
    milestones: [
      { year: '2021', title: 'Diplomatic Foundation', desc: 'Bilateral protocols signed between educational councils in Beijing and Baghdad for real-time intellectual exchange.' },
      { year: '2023', title: 'Basra Logistics Accord', desc: 'Basra Hub activated to provide real-time custom tariffs and shipping statistics for Gulf of Faw container fleets.' },
      { year: '2025', title: 'Trilingual AI Translation Engine', desc: 'Launch of ChinQ\'s sovereign translation matrix contextually localizing reports into Kurdish, Arabic, and Chinese.' },
      { year: '2026', title: 'Enterprise Intelligence Platform', desc: 'Fully integrating live market tickers, premium security indices, and custom corporate directories.' }
    ],

    // Council
    councilTitle: 'Executive Council & Bureau Directors',
    council: [
      { name: 'Dr. Zhang Wei', role: 'Executive Chairman (Beijing)', bio: 'Former Senior Trade Advisor at the PRC Ministry of Commerce; specialist in Belt & Road investment structures.' },
      { name: 'Dr. Haider Al-Khafaji', role: 'Director of Policy & Research (Baghdad)', bio: 'Distinguished Fellow of Sovereign Middle Eastern geopolitics; former advisor to the Iraqi Ministry of Transport.' },
      { name: 'Sherwan Barzani', role: 'Chief of Translation & Bureau Chief (Basra/Erbil)', bio: 'Trilingual academic and linguist specialized in localized trade terminologies and cross-border commercial laws.' }
    ],

    // Contact Form
    contactTitle: 'Direct Sovereign Bureau Communications',
    contactSubtitle: 'Dispatch encrypted telex inquiry to specific regional offices.',
    formName: 'Inquirer Name',
    formEmail: 'Official Email',
    formCompany: 'Affiliation / Institution',
    formBureau: 'Destination Bureau',
    formMessage: 'Telex Communication Body',
    bureauList: [
      { id: 'baghdad', label: 'Baghdad HQ Newsroom & General Secretariat' },
      { id: 'beijing', label: 'Beijing Bureau & Diplomatic Liaison' },
      { id: 'basra', label: 'Basra Hub & Maritime Logistics Directorate' }
    ],
    submit: 'Transmit Telex Communication',
    submitting: 'Securing Connection & Encrypting...',
    required: 'Field is required',
    successTitle: 'Telex Dispatch Confirmed',
    successDesc: 'Your diplomatic inquiry has been encrypted and securely routed to the designated regional bureau. A secure response packet will be dispatched to your provided terminal.',
    telexNo: 'Telex Transmission Ref',
    routingBureau: 'Routed Office',
    timestamp: 'Time Logged (UTC)',
    reset: 'Transmit New Telex'
  },
  ar: {
    title: 'حول مجموعة تشينك الإعلامية',
    subtitle: 'البوابة السيادية التي تجسر الفجوة بين شرق آسيا والشرق الأوسط',
    intro: "تمثل مجموعة تشينك الإعلامية جسراً استراتيجياً وثقافياً بين جمهورية الصين الشعبية وجمهورية العراق. بُني هذا المشروع على الروابط التاريخية العميقة لطريق الحرير القديم، ليكون قناة رقمية حديثة للتبادل الاقتصادي والسياسي والثقافي.",
    importanceTitle: 'الأهمية الاستراتيجية',
    importanceDesc: 'تكمن أهمية تشينك في قدرتها على دمج التقارير بأربع لغات — الإنجليزية، العربية، الكردية (السورانية)، والصينية الماندرين — في صوت تحريري متماسك. مع استمرار توسع التجارة الثنائية واستثمارات البنية التحتية (مثل مبادرة الحزام والطريق وميناء الفاو الكبير)، هناك حاجة ماسة إلى منصة موثوقة في الوقت الفعلي توفر بيانات دقيقة للسوق، وتحليلات جيوسياسية، ومعلومات استخباراتية لوجستية على مستوى المؤسسات.',
    futureTitle: 'الآفاق المستقبلية',
    futureDesc: 'بالنظر إلى المستقبل، تمتلك تشينك القدرة على التطور من مجرد بوابة إعلامية إلى مركز مؤسسي شامل. من منظور دبلوماسي، يمكنها تسهيل تحالفات أكاديمية وثقافية أوثق، مما يعزز التفاهم المتبادل. من الناحية الاقتصادية، يمكن لعمليات تكامل السوق في الوقت الفعلي ودلائل الأعمال (B2B) تبسيط الاستثمارات عبر الحدود والمشاريع المشتركة ولوجستيات سلسلة التوريد.',
    
    milestoneTitle: 'المحطات الاستراتيجية',
    milestones: [
      { year: '٢٠٢١', title: 'التأسيس الدبلوماسي', desc: 'توقيع البروتوكولات الثنائية بين المجالس الأكاديمية في بكين وبغداد للتبادل المعرفي الفوري.' },
      { year: '٢٠٢٣', title: 'اتفاقية البصرة اللوجستية', desc: 'تفعيل مركز البصرة لتقديم التعريفات الجمركية وإحصاءات الشحن الفورية لأساطيل الحاويات في ميناء الفاو.' },
      { year: '٢٠٢٥', title: 'محرك الترجمة الآلي الثلاثي', desc: 'إطلاق مصفوفة الترجمة السيادية الخاصة بتشينك لتعريب التقارير وسياقها في الكردية والعربية والصينية.' },
      { year: '٢٠٢٦', title: 'منصة استخبارات المؤسسات', desc: 'دمج مؤشرات السوق المباشرة، ومؤشرات الأمان الممتازة، وأدلة الشركات المخصصة بالكامل.' }
    ],

    councilTitle: 'المجلس التنفيذي ومدراء المكاتب',
    council: [
      { name: 'د. تشانغ وي', role: 'رئيس المجلس التنفيذي (بكين)', bio: 'مستشار تجاري سابق في وزارة التجارة بجمهورية الصين الشعبية؛ خبير في هياكل استثمار الحزام والطريق.' },
      { name: 'د. حيدر الخفاجي', role: 'مدير السياسات والأبحاث (بغداد)', bio: 'باحث متميز في الجغرافيا السياسية للشرق الأوسط وسيادته؛ مستشار سابق لوزارة النقل العراقية.' },
      { name: 'شيروان بارزاني', role: 'رئيس قسم الترجمة ومدير مكتب البصرة وأربيل', bio: 'أكاديمي ولغوي يتقن اللغات الثلاث؛ متخصص في المصطلحات التجارية المحلية وقوانين التجارة عبر الحدود.' }
    ],

    contactTitle: 'الاتصالات المباشرة مع المكاتب السيادية',
    contactSubtitle: 'أرسل برقية تليكس مشفرة مباشرة إلى المكاتب الإقليمية المحددة.',
    formName: 'اسم المرسل',
    formEmail: 'البريد الإلكتروني الرسمي',
    formCompany: 'المؤسسة / الشركة التابعة',
    formBureau: 'المكتب المقصود',
    formMessage: 'نص رسالة التليكس',
    bureauList: [
      { id: 'baghdad', label: 'مكتب بغداد الرئيسي والأمانة العامة' },
      { id: 'beijing', label: 'مكتب بكين والارتباط الدبلوماسي' },
      { id: 'basra', label: 'مركز البصرة ومديرية اللوجستيات البحرية' }
    ],
    submit: 'إرسال برقية التليكس المشفرة',
    submitting: 'تأمين الاتصال وتشفير البيانات...',
    required: 'هذا الحقل مطلوب',
    successTitle: 'تم تأكيد إرسال التليكس',
    successDesc: 'تم تشفير استفسارك الدبلوماسي وتوجيهه بأمان إلى المكتب الإقليمي المعين. سيتم إرسال حزمة الرد الآمنة إلى بريدك الإلكتروني المقدم.',
    telexNo: 'رقم مرجع الإرسال',
    routingBureau: 'المكتب المستلم',
    timestamp: 'وقت التسجيل (UTC)',
    reset: 'إرسال برقية جديدة'
  },
  zh: {
    title: '关于中伊传媒集团 (ChinQ)',
    subtitle: '连接东亚与中东的主权级战略桥梁',
    intro: "中伊传媒集团（ChinQ）是连接中华人民共和国与伊拉克共和国的战略与文化桥梁。建立在古代丝绸之路深厚的历史渊源之上，该项目成为了现代数字化的经济、政治和文化交流管道。",
    importanceTitle: '战略重要性',
    importanceDesc: '中伊传媒的意义在于其能够将英语、阿拉伯语、库尔德语（索拉尼语）和普通话的报道整合为一个连贯的编辑声音。随着双边贸易和基础设施投资（如“一带一路”倡议和法奥大港项目）的不断扩大，迫切需要一个权威的实时平台，提供准确的市场数据、地缘政治分析和企业级物流情报。',
    futureTitle: '未来发展潜力',
    futureDesc: '展望未来，中伊传媒有潜力超越单一的媒体门户，发展成为一个综合性的企业枢纽。从外交角度来看，它可以促进更紧密的学术和文化联盟，增进相互理解。在经济上，其实时市场数据集成和B2B目录可以简化跨境投资、合资企业和供应链物流。',
    
    milestoneTitle: '战略发展历程',
    milestones: [
      { year: '2021', title: '外交与学术基石', desc: '北京与巴格达学术理事会签署双边合作协议，开启学术与信息实时互通。' },
      { year: '2023', title: '巴士拉物流协定', desc: '巴士拉分社枢纽正式上线，为法奥大港及海运行业提供实时关税和货运统计。' },
      { year: '2025', title: '三语人工智能翻译机能', desc: 'ChinQ 主权语言转译算法上线，实现英文、中文、阿拉伯语及库尔德语的语境重塑。' },
      { year: '2026', title: '企业高级情报平台', desc: '实现实时市场指数、企业名录、高保真政策分析的全面数字化集成。' }
    ],

    councilTitle: '执行委员会与理事会成员',
    council: [
      { name: '张伟 博士', role: '执行理事会主席 (北京分社)', bio: '前中国商务部高级贸易顾问，“一带一路”中东区域投资结构与法律架构专家。' },
      { name: '海德尔·哈法吉 博士', role: '政策与研究部主管 (巴格达总部)', bio: '中东主权政治杰出学者，曾任伊拉克交通部高级外交事务顾问。' },
      { name: '谢尔万·巴尔扎尼', role: '互译机能与巴士拉分社主管', bio: '资深三语学者，精通跨境商业法规、区域贸易协定与本土化学术翻译。' }
    ],

    contactTitle: '直连分社主权级电传通信',
    contactSubtitle: '向特定区域办事处发送经过安全加密的公文电传。',
    formName: '咨询人姓名',
    formEmail: '官方联络邮箱',
    formCompany: '所属机构/公司名称',
    formBureau: '受理目标分社',
    formMessage: '电传通讯公文正文',
    bureauList: [
      { id: 'baghdad', label: '巴格达总部新闻室与总秘书处' },
      { id: 'beijing', label: '北京分社与外交事务联络处' },
      { id: 'basra', label: '巴士拉枢纽与海洋航运监管处' }
    ],
    submit: '发送加密公文电传',
    submitting: '正在构建安全隧道并加密文书...',
    required: '此项为必填项',
    successTitle: '电传公文发送确认',
    successDesc: '您的外交及商贸咨询已安全加密并路由至指定的分社机构。安全回复函件将发送至您留下的专业电子邮箱。',
    telexNo: '电传传送回执哈希',
    routingBureau: '受理路由机构',
    timestamp: '登记时间 (UTC)',
    reset: '发送新电传'
  },
  ckb: {
    title: 'دەربارەی گرووپی میدیایی چینک (ChinQ)',
    subtitle: 'دەروازەی سەروەری بۆ بەستنەوەی ڕۆژهەڵاتی ئاسیا و ڕۆژهەڵاتی ناوەڕاست',
    intro: "گرووپی میدیایی چینک (ChinQ) پردێکی ستراتیژی و کولتوورییە لە نێوان کۆماری گەلی چین و کۆماري عێراق. ئەم پڕۆژەیە لەسەر بنەمای پەیوەندییە مێژووییە قووڵەکانی ڕێگای ئاوریشمی کۆن دامەزراوە و وەک کەناڵێکی دیجیتاڵی مۆدێرن بۆ ئاڵوگۆڕی ئابووری، سیاسی و کولتووری خزمەت دەکات.",
    importanceTitle: 'گرنگی ستراتیژی',
    importanceDesc: 'گرنگی چینک لە توانایدا بۆ یەکخستنی ڕاپۆرتەکان بە چوار زمان - ئینگلیزی، عەرەبي، کوردی (سۆرانی)، و چینی مەندارین - بۆ دەنگێکی یەکگرتووی سەرنووسەرایەتی دەردەکەوێت. لەگەڵ بەردەوامی فراوانبوونی بازرگانی دووقۆڵی و وەبەرهێنانەکانی ژێرخان (وەک دەستپێشخەری پشتوێن و ڕێگا و پڕۆژەی بەندەری گەورەی فاو)، پێویستییەکی زۆر هەیە بە پلاتفۆرمێکی باوەڕپێکراوی کاتی ڕاستەقینە.',
    futureTitle: 'تواناکانی داهاتوو',
    futureDesc: 'لە داهاتوودا، چینک توانای ئەوەی هەیە لە تەنها پلاتفۆرمێکی میدیاییەوە ببێتە سەنتەرێکی دامەزراوەیی گشتگیر. لە ڕووی دیپلۆماسییەوە، دەتوانێت ئاسانکاری بۆ هاوپەيمانییە ئەکادیمی و کولتوورییەکان بکات و لێکتێگەیشتنی هاوبەش زیاتر بکات. لە ڕووی ئابوورییەوە، یەکخستنی داتاکانی بازاڕ و پێڕستی بازرگانییەکان دەتوانێت ئاسانکاری بۆ وەبەرهێنانە سنووربەزێنەکان بکات.',
    
    milestoneTitle: 'قۆناغە ستراتیژییەکان',
    milestones: [
      { year: '٢٠٢١', title: 'بناغەی دیپلۆماسی', desc: 'پڕۆتۆکۆڵە دوولایەنەکان لە نێوان ئەنجومەنە ئەکادیمییەکانی پەکین و بەغداد واژۆ کران بۆ ئاڵوگۆڕی مەعریفی کاتی ڕاستەقینە.' },
      { year: '٢٠٢٣', title: 'ڕێککەوتنی لۆجیستی بەسرە', desc: 'سەنتەری بەسرە چالاککرا بۆ دابینکردنی گومرگی بازرگانی کاتی ڕاستەقینە و ئامارەکانی گواستنەوەی دەریایی لە بەندەری فاو.' },
      { year: '٢٠٢٥', title: 'محرکی وەرگێڕانی سێزمانە', desc: 'دەستپێکردنی ماتریکسی وەرگێڕانی سەروەری چینک بۆ خۆماڵیکردنی ڕاپۆرتەکان لە نێوان کوردی، عەرەبی و چینی.' },
      { year: '٢٠٢٦', title: 'پلاتفۆرمی زانیاری دەزگاکان', desc: 'یەکخستنی تەواوی پیشاندەرانی کاتی ڕاستەقینەی بازاڕ، نیشاندەرەکانی ئاسایش، و پێڕستەکانی کۆمپانیاکان.' }
    ],

    councilTitle: 'ئەنجومەنی جێبەجێکردن و بەڕێوبەرانی نووسینگەکان',
    council: [
      { name: 'د. تشانگ وی', role: 'سەرۆکی ئەنجومەنی جێبەجێکردن (پەکین)', bio: 'ڕاوێژکاری پێشووی باڵای بازرگانی لە وەزارەتی بازرگانی چین؛ پسپۆڕ لە بنیاتنانی وەبەرهێنانی پشتوێن و ڕێگا.' },
      { name: 'د. حەیدەر ئەلخەفاجی', role: 'بەڕێوبەری سیاسەت و توێژینەوە (بەغداد)', bio: 'توێژەری دیار لە بواری جیۆپۆلەتیکی ڕۆژهەڵاتی ناوەڕاست و سەروەری؛ ڕاوێژکاری پێشووی وەزارەتی گواستنەوەی عێراق.' },
      { name: 'شێروان بارزانی', role: 'سەرۆکی بەشی وەرگێڕان و بەڕێوبەری نووسینگەی بەسرە و هەولێر', bio: 'ئەکادیمی و زمانزانی سێزمانە؛ پسپۆڕ لە زاراوە بازرگانییە لۆکاڵییەکان و یاساکانی بازرگانی سنووربەزێن.' }
    ],

    contactTitle: 'پەیوەندی ڕاستەوخۆ لەگەڵ نووسینگە فەرمییەکان',
    contactSubtitle: 'بروسکەیەکی تەلێکسی پارێزراو بنێرە بۆ ئۆفیسە هەرێمییەکان.',
    formName: 'ناوی داواکار',
    formEmail: 'ئیمەیڵی فەرمی',
    formCompany: 'دەزگا یان کۆمپانیا',
    formBureau: 'نووسینگەی مەبەست',
    formMessage: 'دەقی بروسکەی تەلێکس',
    bureauList: [
      { id: 'baghdad', label: 'ژووری هەواڵ و سکرتاریەتی گشتی بەغداد' },
      { id: 'beijing', label: 'نووسینگەی پەکین و پەیوەنديیە دیپلۆماسییەکان' },
      { id: 'basra', label: 'سەنتەری بەسرە و بەڕێوبەرایەتی لۆجیستی دەریایی' }
    ],
    submit: 'ناردنی بروسکەی تەلێکس',
    submitting: 'پاراستنی پەیوەندی و مشەفەرکردن...',
    required: 'ئەم خانەیە پێویستە',
    successTitle: 'ناردنی تەلێکس پشتڕاستکرایەوە',
    successDesc: 'داواکارییە دیپلۆماسییەکەت مشەفەرکرا و بە سەلامەتی ڕەوانەی نووسینگەی دیاریکراو کرا. وەڵامی فەرمی دەنێردرێت بۆ ئیمەیڵە فەرمییەکەت.',
    telexNo: 'ژمارەی تەلێکسی نێردراو',
    routingBureau: 'نووسینگەی چارەسەرکردن',
    timestamp: 'کاتی تۆمارکردن (UTC)',
    reset: 'ناردنی بروسکەیەکی نوێ'
  }
};

interface ContactState {
  name: string;
  email: string;
  company: string;
  bureau: string;
  message: string;
}

export function About() {
  const { lang } = useParams<{ lang: Locale }>();
  const currentLang = ['en', 'ar', 'zh', 'ckb'].includes(lang || '') ? (lang as Locale) : 'en';
  const t = translations[currentLang];
  const m = t.milestones;
  const c = t.council;

  const [formData, setFormData] = useState<ContactState>({
    name: '',
    email: '',
    company: '',
    bureau: 'baghdad',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [telexRef, setTelexRef] = useState('');
  const [errors, setErrors] = useState<Partial<ContactState>>({});

  const isRtl = currentLang === 'ar' || currentLang === 'ckb';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactState> = {};
    if (!formData.name.trim()) newErrors.name = t.required;
    
    if (!formData.email.trim()) {
      newErrors.email = t.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.required;
    }

    if (!formData.company.trim()) newErrors.company = t.required;
    if (!formData.message.trim()) newErrors.message = t.required;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSending(true);

    const generatedRef = 'TLX-' + Math.floor(Math.random() * 90000 + 10000) + '-' + Array.from({length: 4}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase();

    try {
      const res = await fetch('/api/public/telexes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          bureau: formData.bureau,
          message: formData.message,
          telexRef: generatedRef
        })
      });

      if (!res.ok) {
        throw new Error('Telex transmission failed.');
      }

      setTelexRef(generatedRef);
      setSendSuccess(true);
    } catch (err: any) {
      console.error(err);
      setErrors(prev => ({ ...prev, message: err.message || 'System transmission error' }));
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      bureau: 'baghdad',
      message: ''
    });
    setSendSuccess(false);
    setTelexRef('');
  };

  return (
    <main className="flex-grow w-full max-w-[1024px] mx-auto bg-[#FAFAFA] p-4 md:p-12 text-start" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Title */}
      <div className="border-b-4 border-[#111111] pb-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-[#111111] uppercase">
          {t.title}
        </h2>
        <p className="font-mono text-xs md:text-sm text-gray-500 font-bold mt-2 uppercase tracking-widest">
          {t.subtitle}
        </p>
      </div>

      {/* Intro Essay block */}
      <div className="prose prose-neutral max-w-none font-serif text-lg leading-relaxed text-gray-800 space-y-6">
        <p className="font-bold text-xl leading-relaxed text-justify">{t.intro}</p>
        
        {/* Two Columns Grid for Project Importance & Future */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 border-y border-gray-200 py-8">
          <div className="space-y-3">
            <h3 className="text-xl font-serif font-black text-[#990000] uppercase flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              {t.importanceTitle}
            </h3>
            <p className="text-sm md:text-base text-gray-700 text-justify leading-relaxed">
              {t.importanceDesc}
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-serif font-black text-[#990000] uppercase flex items-center gap-2">
              <Globe className="w-5 h-5" />
              {t.futureTitle}
            </h3>
            <p className="text-sm md:text-base text-gray-700 text-justify leading-relaxed">
              {t.futureDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Milestones and Advisory Council */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
        
        {/* Left Section: Interactive Timelines */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-xl md:text-2xl font-serif font-black uppercase text-gray-900 border-b-2 border-[#111111] pb-2 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#990000]" />
            {t.milestoneTitle}
          </h3>
          
          <div className="relative border-l-2 border-gray-200 pl-6 ml-3 space-y-8">
            {m.map((milestone, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {/* Node Bullet */}
                <div className="absolute -left-[33px] top-1 bg-white border-2 border-[#990000] group-hover:bg-[#990000] w-3.5 h-3.5 transition-colors duration-200" />
                
                <span className="font-mono text-xs font-black text-[#990000] uppercase tracking-wider block">
                  {milestone.year}
                </span>
                <h4 className="text-base md:text-lg font-serif font-bold text-gray-900 mt-0.5">
                  {milestone.title}
                </h4>
                <p className="text-xs md:text-sm text-gray-600 mt-1 text-justify leading-relaxed">
                  {milestone.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Section: Council List */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-xl md:text-2xl font-serif font-black uppercase text-gray-900 border-b-2 border-[#111111] pb-2 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#990000]" />
            {t.councilTitle}
          </h3>

          <div className="space-y-4">
            {c.map((member, index) => (
              <div key={index} className="bg-white border border-gray-200 p-4 shadow-sm hover:border-[#111111] transition-all duration-200">
                <h4 className="font-serif font-bold text-base text-gray-900 flex items-center gap-1.5">
                  {member.name}
                </h4>
                <span className="font-mono text-[10px] font-bold text-[#990000] uppercase tracking-wider block mt-0.5">
                  {member.role}
                </span>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed text-justify">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Diplomatic Bureau Telex inquiry Form */}
      <div className="mt-16 bg-white border-2 border-[#111111] p-6 md:p-8 relative">
        <div className="border-b-2 border-double border-[#111111] pb-3 mb-6">
          <h3 className="text-xl md:text-2xl font-serif font-black uppercase text-gray-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#990000]" />
            {t.contactTitle}
          </h3>
          <p className="text-xs font-mono text-gray-500 font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" />
            {t.contactSubtitle}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!sendSuccess ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit} 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-1">
                    {t.formName} <span className="text-[#990000]">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full text-xs font-mono border border-gray-300 bg-[#FAFAFA] focus:border-[#111111] p-2.5 focus:outline-none focus:bg-white"
                  />
                  {errors.name && <p className="text-[10px] font-mono font-bold text-[#990000] mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-1">
                    {t.formEmail} <span className="text-[#990000]">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full text-xs font-mono border border-gray-300 bg-[#FAFAFA] focus:border-[#111111] p-2.5 focus:outline-none focus:bg-white"
                  />
                  {errors.email && <p className="text-[10px] font-mono font-bold text-[#990000] mt-1">{errors.email}</p>}
                </div>

                {/* Company / Affiliation */}
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-1">
                    {t.formCompany} <span className="text-[#990000]">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full text-xs font-mono border border-gray-300 bg-[#FAFAFA] focus:border-[#111111] p-2.5 focus:outline-none focus:bg-white"
                  />
                  {errors.company && <p className="text-[10px] font-mono font-bold text-[#990000] mt-1">{errors.company}</p>}
                </div>

                {/* Bureau Destination */}
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-1">
                    {t.formBureau}
                  </label>
                  <select 
                    name="bureau"
                    value={formData.bureau}
                    onChange={handleInputChange}
                    className="w-full text-xs font-mono border border-gray-300 bg-[#FAFAFA] p-2.5 focus:outline-none focus:border-[#111111] appearance-none"
                  >
                    {t.bureauList.map(b => (
                      <option key={b.id} value={b.id}>{b.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col justify-between space-y-4">
                {/* Message Body */}
                <div className="flex-grow flex flex-col">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-1">
                    {t.formMessage} <span className="text-[#990000]">*</span>
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full flex-grow text-xs font-mono border border-gray-300 bg-[#FAFAFA] focus:border-[#111111] p-2.5 focus:outline-none focus:bg-white resize-none"
                  />
                  {errors.message && <p className="text-[10px] font-mono font-bold text-[#990000] mt-1">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button 
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-[#111111] hover:bg-[#990000] text-white p-3 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>{t.submitting}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{t.submit}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-4 space-y-4"
            >
              <CheckCircle className="w-12 h-12 text-[#990000] mx-auto animate-bounce" />
              <div>
                <h4 className="text-lg font-serif font-black text-[#990000] uppercase">
                  {t.successTitle}
                </h4>
                <p className="text-xs font-mono text-gray-500 font-bold uppercase tracking-wider mt-1">
                  {t.successDesc}
                </p>
              </div>

              {/* Telex receipt */}
              <div className="max-w-md mx-auto bg-gray-50 border-2 border-dotted border-gray-300 p-4 text-xs font-mono space-y-2 text-start">
                <div className="flex justify-between border-b border-gray-200 pb-1.5">
                  <span className="text-gray-400 uppercase text-[9px]">{t.telexNo}</span>
                  <span className="font-bold text-[#990000]">{telexRef}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1.5">
                  <span className="text-gray-400 uppercase text-[9px]">{t.routingBureau}</span>
                  <span className="font-bold text-gray-800">
                    {t.bureauList.find(b => b.id === formData.bureau)?.label || formData.bureau}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 uppercase text-[9px]">{t.timestamp}</span>
                  <span className="font-bold text-gray-800">{new Date().toUTCString()}</span>
                </div>
              </div>

              <button 
                onClick={handleReset}
                className="bg-[#111111] hover:bg-[#990000] text-white px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-widest transition-colors duration-300"
              >
                {t.reset}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </main>
  );
}
