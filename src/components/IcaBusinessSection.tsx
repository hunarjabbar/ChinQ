import React, { useState, useEffect } from 'react';
import { Locale } from '../types';
import { 
  Building2, ShieldCheck, FileText, Download, ExternalLink, 
  MapPin, DollarSign, Tag, ArrowRight, ArrowLeft, CheckCircle2, 
  Sparkles, Globe2, Briefcase, Mail, Phone, Clock, AlertCircle, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BusinessOpportunity {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  titleZh: string;
  titleCkb: string;
  summaryEn: string;
  summaryAr: string;
  summaryZh: string;
  summaryCkb: string;
  contentEn: string;
  contentAr: string;
  contentZh: string;
  contentCkb: string;
  category: string;
  sector: string;
  investmentValue: string;
  location: string;
  coverImage: string;
  featured: boolean;
  order: number;
  status: string;
  contactEmail?: string;
}

const FALLBACK_OPPORTUNITIES: BusinessOpportunity[] = [
  {
    id: 'bo-1',
    slug: 'basra-petrochem-hub',
    titleEn: 'Basra Sovereign Petrochemical Complex & Gas Valorization',
    titleAr: 'مجمع البصرة السيادي للبتروكيماويات وتثمين الغاز المصاحب',
    titleZh: '巴士拉主权级石化联合体与油田伴生气深度利用项目',
    titleCkb: 'کۆمەڵگەی پێترۆکیمیایی سیادی بەسرە و بەکارهێنانی گازی هاوپێچ',
    summaryEn: 'A tier-one downstream refining and polymer production facility designed to capture flaring gas across southern fields, providing 10-year fiscal immunity under Investment Law No. 13.',
    summaryAr: 'منشأة تحويلية وتكريرية لإنتاج البوليمرات مصممة لاستثمار الغاز المحروق في حقول الجنوب، مع إعفاء ضريبي لمدة ١٠ سنوات بموجب قانون الاستثمار رقم ١٣.',
    summaryZh: '伊拉克南部特大型下游精细化工与聚合物生产基地，深度回收油田放空气，享受第13号投资法全额10年免税。',
    summaryCkb: 'پرۆژەیەکی گەورەی پاڵاوتن و بەرهەمهێنانی پۆلیمەر بۆ سوودوەرگرتن لە گازی کێڵگەکانی باشوور، بە بەخشینی باج بۆ ١٠ ساڵ بەپێی یاسای وەبەرهێنان.',
    contentEn: 'The Iraqi Ministry of Oil, in bilateral coordination with Chinese petrochemical consortiums, invites EPC partners for Phase II equity participation. Sovereign guarantees include free allocation of 450 hectares in Khor Al-Zubair, zero customs tariff on imported plant machinery, and full constitutional freedom to repatriate capital in RMB or USD.',
    contentAr: 'تدعو وزارة النفط العراقية بالتنسيق مع التحالفات الصينية الشركاء للمشاركة في المرحلة الثانية. تتضمن الضمانات تخصيص ٤٥٠ هكتاراً في خور الزبير مع إعفاء جمركي كامل وحرية دستورية لتحويل الأرباح.',
    contentZh: '伊拉克石油部在中伊合作框架下诚邀国际工程财团参与第二阶段股权合作。提供450公顷工业用地、工程设备零关税及受宪法保护的投资收益自由汇出保障。',
    contentCkb: 'وەزارەتی نەوتی عێراق داوا لە وەبەرهێنەران دەکات بۆ بەشداریکردن لە قۆناغی دووەم بە تەرخانکردنی ٤٥٠ هێکتار زەوی و لێخۆشبوونی گومرگی.',
    category: 'ENERGY',
    sector: 'Petrochemicals & Gas Capture',
    investmentValue: '$3.2 Billion',
    location: 'Khor Al-Zubair, Basra',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    order: 1,
    status: 'OPEN',
    contactEmail: 'petrochem@iraqi-chineseagency.com'
  },
  {
    id: 'bo-2',
    slug: 'sino-iraq-solar-microgrid',
    titleEn: 'Muthanna & Najaf 1.4GW Desert Photovoltaic Microgrid Corridor',
    titleAr: 'ممر حقول الطاقة الشمسية الكهروضوئية في بادية المثنى والنجف بقوة 1.4 غيغاواط',
    titleZh: '穆萨纳与纳杰夫沙漠1.4吉瓦大型光伏微电网走廊',
    titleCkb: 'کۆریدۆری وێستگەی سۆلاری دەشتی موسەننا و نەجەف بە توانای ١.٤ گێگاوات',
    summaryEn: 'Utility-scale desert solar installations linked directly with provincial transmission nodes, offering guaranteed 25-year sovereign power purchase agreements (PPA).',
    summaryAr: 'محطات طاقة شمسية كبرى في بادية الجنوب مرتبطة مباشرة بشبكة النقل الوطنية، مع اتفاقيات شراء طاقة سيادية مضمونة لمدة ٢٥ عاماً (PPA).',
    summaryZh: '伊拉克南部沙漠大型光伏集群，接入国家主干电网，享有电力部25年期主权级照付不议购电协议（PPA）。',
    summaryCkb: 'وێستگەی بەرهەمهێنانی کارەبای سۆلار لە دەشتاییەکانی باشوور، بەستراوەتەوە بە تۆڕی نیشتمانی بە گرێبەستی ٢٥ ساڵە.',
    contentEn: 'Equipped with dual-axis trackers and 300MWh battery energy storage systems (BESS). Consortium members benefit from fast-track customs clearance at Safwan, exemption from corporate income tax for 10 years, and designated sub-station interconnection rights.',
    contentAr: 'مزودة بأنظمة التتبع ومستودعات تخزين طاقة بسعة ٣٠٠ ميغاواط/ساعة. يستفيد الشركاء من التخليص الجمركي الفوري في سفوان، والإعفاء الضريبي لمدة ١٠ سنوات، وربط مجاني بمحطات التحويل.',
    contentZh: '配备跟踪支架及300兆瓦时储能系统。中企享受口岸绿色通关协议、企业所得税前十年全免及免收电网接入费等多项特权。',
    contentCkb: 'بە بەکارهێنانی سیستەمی کۆکردنەوەی وزە بە قەبارەی ٣٠٠ مێگاوات/کاتژمێر، لەگەڵ لێخۆشبوونی باج بۆ ماوەی دە ساڵ.',
    category: 'ENERGY',
    sector: 'Renewable Energy & Storage',
    investmentValue: '$1.4 Billion',
    location: 'Muthanna & Najaf Deserts',
    coverImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    order: 2,
    status: 'OPEN',
    contactEmail: 'renewables@iraqi-chineseagency.com'
  },
  {
    id: 'bo-3',
    slug: 'faw-port-logistics-freezone',
    titleEn: 'Al-Faw Grand Port International Bonded Logistics & Free Zone Park',
    titleAr: 'المنطقة اللوجستية الحرة والميناء الجاف الدولي في ميناء الفاو الكبير',
    titleZh: '大港法奥港国际综合保税物流园区与自由贸易特区',
    titleCkb: 'ناوچەی ئازادی لۆجستی و بەندەری وشکانی لە بەندەری فاو-ی گەورە',
    summaryEn: 'Development of automated dry-dock warehouses, multi-modal rail interchange terminals, and deepwater container yards connecting the Maritime Silk Road to the Dry Canal.',
    summaryAr: 'تطوير مستودعات الحوض الجاف المؤتمتة، ومحطات التبادل السككي متعددة الوسائط، وساحات الحاويات العميقة لربط طريق الحرير البحري بالقناة الجافة.',
    summaryZh: '依托法奥深水港，建设集自动化保税仓储、铁水联运枢纽及深水集装箱堆场于一体的陆海新通道战略枢纽。',
    summaryCkb: 'پەرەپێدانی کۆگاکانی حەوزی وشک و وێستگەکانی هێڵی ئاسن بۆ بەستنەوەی ڕێگای ئاوریشمی دەریایی بە کەناڵی وشکانی.',
    contentEn: 'The General Company for Ports of Iraq offers multi-year concessions for logistics operators to build bonded stations, cold storage chains, and container inspection gantries with zero-tariff status on raw re-exports.',
    contentAr: 'تطرح الشركة العامة لموانئ العراق عقود امتياز طويلة الأجل للمشغلين اللوجستيين لتشييد محطات الشحن الجمركي وسلاسل التبريد مع إعفاء جمركي للمواد المعاد تصديرها.',
    contentZh: '伊拉克港务局面向国际物流运营商推出特许经营合约，涵盖保税货运站、医药冷链枢纽，特区享有转口贸易完全免税及深水集装箱泊位。',
    contentCkb: 'کۆمپانیای گشتی بەندەرەکان گرێبەستی درێژخایەن پێشکەش دەکات بۆ ناوچەی گومرگی و کۆگای ساردکەرەوە بە بەخشینی باج لە باجی شارەوانی بۆ ١٥ ساڵ.',
    category: 'INFRASTRUCTURE',
    sector: 'Maritime Logistics & Free Zones',
    investmentValue: '$850 Million',
    location: 'Al-Faw Peninsula, Basra',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    order: 3,
    status: 'OPEN',
    contactEmail: 'fawlogistics@iraqi-chineseagency.com'
  },
  {
    id: 'bo-4',
    slug: 'rmb-iqd-trade-financing-facility',
    titleEn: 'Bilateral RMB / IQD Sovereign Currency Settlement & Letter of Credit Facility',
    titleAr: 'تسهيلات المقاصة المباشرة باليوان والدينار وخطابات الاعتماد المستندية الثنائية',
    titleZh: '中伊本币直接结算专项通道与跨境信用证融资便利化机制',
    titleCkb: 'ئاسانکاری پاکتاوی دراوی یوان / دینار و نامەی متمانەی بانکی (LC)',
    summaryEn: 'Direct bilateral clearing infrastructure bypassing third-party clearing currencies for heavy industrial machinery, energy EPC contracts, and raw agricultural imports.',
    summaryAr: 'بنية تحتية للمقاصة الثنائية المباشرة لتجاوز العملات الوسيطة في تمويل المعدات الصناعية الثقيلة وعقود الطاقة والتوريدات الاستراتيجية.',
    summaryZh: '依托央行双边清算架构，免除第三方货币兑换磨损，为大型工程总包与大宗进出口提供极速信用证开立服务。',
    summaryCkb: 'ژێرخانی پاکتاوی ڕاستەوخۆ بەبێ دراوە ناوبەندەکان بۆ کڕینی ئامێرە قورسە پیشەسازییەکان و گرێبەستەکانی وزە بە یوان و دینار.',
    contentEn: 'Administered under Central Bank of Iraq directives, this financing desk supports RMB-denominated Letters of Credit, supply-chain factoring, and sovereign escrow with settlement execution guaranteed under 24 hours.',
    contentAr: 'تدار تحت إشراف البنك المركزي العراقي، وتقدم خطابات اعتماد باليوان، وتمويل سلاسل الإمداد، وحسابات الضمان السيادية مع تنفيذ خلال أقل من ٢٤ ساعة.',
    contentZh: '在两家监管框架下提供人民币信用证开立、供应链应收账款保理及主权托管账户，支持24小时内极速双向资金清算交割。',
    contentCkb: 'لەژێر چاودێری بانکی ناوەندی، دەرکردنی نامەی متمانە بە یوان و پاراستنی سەرمایە دابین دەکات بە جێبەجێکردن لە کەمتر لە ٢٤ کاتژمێردا.',
    category: 'FINANCIAL_SERVICES',
    sector: 'Cross-Border Settlement & Trade Finance',
    investmentValue: 'Multi-Tier Sovereign Facility',
    location: 'Central Bank of Iraq / PBOC Corridors',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    order: 4,
    status: 'ACTIVE',
    contactEmail: 'finance@iraqi-chineseagency.com'
  }
];

export default function IcaBusinessSection({ lang }: { lang: Locale }) {
  const [opportunities, setOpportunities] = useState<BusinessOpportunity[]>(FALLBACK_OPPORTUNITIES);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedOpportunity, setSelectedOpportunity] = useState<BusinessOpportunity | null>(null);
  const [inquiryStatus, setInquiryStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS'>('IDLE');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryCompany, setInquiryCompany] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');

  const isRtl = lang === 'ar' || lang === 'ckb';

  useEffect(() => {
    fetch('/api/business-opportunities')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Failed to load opportunities');
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setOpportunities(data);
        }
      })
      .catch((err) => {
        console.warn('Using fallback business opportunities:', err.message);
      });
  }, []);

  const t = {
    badge: {
      en: 'ICA Sovereign Business & Investment Hub',
      ar: 'مركز آي سي إيه للأعمال والاستثمار السيادي',
      zh: 'ICA 中伊主权商业与战略招商总枢纽',
      ckb: 'مەڵبەندی بازرگانی و وەبەرهێنانی سیادی ICA'
    }[lang],
    title: {
      en: 'Bilateral Projects, Trade Corridors & Sovereign Guarantees',
      ar: 'المشاريع الثنائية، الممرات التجارية والضمانات السيادية',
      zh: '双边重点合作项目、跨境经贸走廊与主权投资保障',
      ckb: 'پڕۆژە دوولایەنەکان، کۆریدۆرە بازرگانییەکان و گەرەنتییە سیادییەکان'
    }[lang],
    desc: {
      en: 'Direct gateway for Chinese state consortiums, regional conglomerates, and accredited private investors accessing Iraq\'s sovereign investment licenses, legal immunities, and major infrastructure tenders.',
      ar: 'البوابة المباشرة للشركات والتحالفات الصينية والمستثمرين المعتمدين للوصول إلى إجازات الاستثمار السيادية، والإعفاءات القانونية، ومناقصات البنية التحتية الكبرى في العراق.',
      zh: '面向大型中企财团、区域龙头与合格战略投资者的主权直通门户，权威发布伊拉克国家级投资许可、特许税收豁免及大型基础设施总包契机。',
      ckb: 'دەروازەی ڕاستەوخۆ بۆ کۆمپانیا چینییەکان و وەبەرهێنەران بۆ بەدەستهێنانی مۆڵەتی وەبەرهێنانی سیادی، لێخۆشبوونی یاسایی و تەندەرە گەورەکانی عێراق.'
    }[lang],
    guaranteesTitle: {
      en: 'Constitutional & Sovereign Investor Guarantees',
      ar: 'الضمانات الاستثمارية الدستورية والسيادية',
      zh: '伊拉克宪法与主权法案法定投资保障',
      ckb: 'گەرەنتییە دەستووری و سیادییەکانی وەبەرهێنان'
    }[lang],
    viewProspectus: {
      en: 'View Sovereign Dossier',
      ar: 'استعراض الكراسة السيادية',
      zh: '查阅主权招商专案',
      ckb: 'بینینی پەڕاوی سیادی'
    }[lang],
    expressInterest: {
      en: 'Express Project Interest',
      ar: 'إبداء الاهتمام بالمشروع',
      zh: '提交投资与对接意向',
      ckb: 'دەربڕینی ئارەزووی پڕۆژە'
    }[lang],
    categories: {
      ALL: { en: 'All Sectors', ar: 'كافة القطاعات', zh: '全部重点领域', ckb: 'هەموو کەرتەکان' },
      ENERGY: { en: 'Energy & Renewables', ar: 'الطاقة والمتجددة', zh: '能源与绿电储能', ckb: 'وزە و وزەی نوێبووەوە' },
      INFRASTRUCTURE: { en: 'Infrastructure & Ports', ar: 'البنية التحتية والموانئ', zh: '重大基建与港航', ckb: 'ژێرخان و بەندەرەکان' },
      AGRICULTURE: { en: 'Agritech & Food', ar: 'التكنولوجيا الزراعية', zh: '智慧农业与节水', ckb: 'تەکنەلۆجیای کشتوکاڵ' },
      TECHNOLOGY: { en: 'Telecom & Digital', ar: 'الاتصالات والرقمنة', zh: '通信骨干与数字枢纽', ckb: 'پەیوەندی و دیجیتاڵ' },
      INDUSTRIAL_ZONES: { en: 'Industrial Parks', ar: 'المدن الصناعية', zh: '特区与矿产冶金', ckb: 'شارۆچکە پیشەسازییەکان' },
      LEGAL_ADVISORY: { en: 'Legal & Customs Desk', ar: 'المكتب القانوني والجمركي', zh: '法律顾问与涉外法务', ckb: 'ڕاوێژکاری یاسایی و گومرگ' },
      FINANCIAL_SERVICES: { en: 'Currency & Trade Clearing', ar: 'المقاصة والتمويل التجاري', zh: '双边本币清算与贸易融资', ckb: 'پاکتاوی دراو و دارایی' }
    },
    guarantees: [
      {
        title: {
          en: '10 Years Fiscal Immunity',
          ar: 'إعفاء ضريبي شامل لـ ١٠ سنوات',
          zh: '前十年企业所得税全免',
          ckb: 'لێخۆشبوونی باج بۆ ١٠ ساڵ'
        }[lang],
        desc: {
          en: 'Full exemption from corporate, income, and real estate taxes under Federal Investment Law No. 13.',
          ar: 'إعفاء تام من ضريبة الدخل والشركات والعقارات بموجب قانون الاستثمار الاتحادي رقم ١٣ لسنة ٢٠٠٦.',
          zh: '依照伊拉克联邦第13号投资法，全面豁免企业所得税、预扣税及关联不动产税赋。',
          ckb: 'لێخۆشبوونی تەواو لە باجی کۆمپانیا و داهات بەپێی یاسای وەبەرهێنانی فیدراڵی ژمارە ١٣.'
        }[lang]
      },
      {
        title: {
          en: '100% Capital & Yield Repatriation',
          ar: 'حرية تحويل الأرباح ورأس المال ١٠٠٪',
          zh: '投资收益与资本100%自由汇出',
          ckb: 'گواستنەوەی ١٠٠٪ی قازانج و سەرمایە'
        }[lang],
        desc: {
          en: 'Full constitutional freedom to transfer dividends and invested capital abroad in RMB, USD, or EUR without restriction.',
          ar: 'حرية دستورية كاملة لتحويل الأرباح ورأس المال المستثمر إلى الخارج باليوان أو الدولار دون قيود.',
          zh: '宪法级法定保障：外资企业可依法将清算资本与经营利润以人民币或外币合规全额汇出。',
          ckb: 'ئازادی تەواوی دەستووری بۆ گواستنەوەی قازانج و سەرمایەی وەبەرهێنراو بۆ دەرەوە بەبێ بەربەست.'
        }[lang]
      },
      {
        title: {
          en: 'Belt & Road Priority Corridor',
          ar: 'أولوية ممر الحزام والطريق الاستراتيجي',
          zh: '一带一路旗舰走廊高阶优先权',
          ckb: 'پێشینەی کۆریدۆری یەک پشتێنە و یەک ڕێگا'
        }[lang],
        desc: {
          en: 'Designated strategic status integrating projects directly with sovereign port, rail, and energy grids.',
          ar: 'صفة استراتيجية تربط المشاريع مباشرة بشبكات الموانئ والسكك الحديدية ومنظومة الطاقة الوطنية.',
          zh: '纳入中伊政府间重点合作备忘录，享有港口泊位、国家电网接入与国家主干铁路联运优先权。',
          ckb: 'بەستنەوەی ڕاستەوخۆی پڕۆژەکان بە تۆڕی بەندەرەکان، هێڵی ئاسن و وزەی نیشتمانی.'
        }[lang]
      },
      {
        title: {
          en: 'Sovereign Industrial Land Allocation',
          ar: 'تخصيص الأراضي الصناعية السيادية',
          zh: '国家工业用地长期主权划拨保护',
          ckb: 'تەرخانکردنی زەوی پیشەسازی سیادی'
        }[lang],
        desc: {
          en: 'Long-term renewable leaseholds up to 50 years at nominal sovereign rental rates with utilities connected.',
          ar: 'عقود إيجار طويلة الأجل قابلة للتجديد حتى ٥٠ عاماً ببدلات رمزية مع إيصال كامل الخدمات الأساسية.',
          zh: '提供最长达50年期可展期的国有工业特区熟地租赁权，象征性低地租，三通一平直接交付。',
          ckb: 'گرێبەستی درێژخایەنی نوێکراوە تا ٥٠ ساڵ بە نرخی ڕەمزی لەگەڵ هەموو خزمەتگوزارییەکان.'
        }[lang]
      }
    ],
    lawsTitle: {
      en: 'Official Bilateral Investment Treaties & Legal Codes',
      ar: 'المعاهدات والقوانين الاستثمارية الرسمية المعتمدة',
      zh: '伊拉克官方外资法律文本与双边协定准则',
      ckb: 'یاسا و پەیماننامە فەرمییەکانی وەبەرهێنان'
    }[lang],
    laws: [
      {
        name: {
          en: 'Federal Iraq Investment Law No. 13 (2006, as amended)',
          ar: 'قانون الاستثمار العراقي الاتحادي رقم ١٣ لسنة ٢٠٠٦ (المعدل)',
          zh: '伊拉克联邦第13号投资法（2006年制定及历次修正案）',
          ckb: 'یاسای وەبەرهێنانی فیدراڵی عێراق ژمارە ١٣ی ساڵی ٢٠٠٦'
        }[lang],
        code: 'NIC-FED-LAW-13',
        status: { en: 'Active & Verified', ar: 'سارٍ ومعتمد رسمياً', zh: '现行法定最高法源', ckb: 'کارپێکراو و باوەڕپێکراو' }[lang],
        link: 'https://investpromo.gov.iq'
      },
      {
        name: {
          en: 'Kurdistan Regional Government Investment Law No. 4 (2006)',
          ar: 'قانون الاستثمار في إقليم كوردستان رقم ٤ لسنة ٢٠٠٦',
          zh: '伊拉克库尔德斯坦自治区第4号投资法（2006年）',
          ckb: 'یاسای وەبەرهێنانی هەرێمی کوردستان ژمارە ٤ی ساڵی ٢٠٠٦'
        }[lang],
        code: 'BOI-KRG-LAW-04',
        status: { en: 'Active & Verified', ar: 'سارٍ ومعتمد رسمياً', zh: '现行自治区法定法源', ckb: 'کارپێکراو و باوەڕپێکراو' }[lang],
        link: 'https://boi.gov.krd'
      }
    ]
  };

  const getLocalized = (opp: BusinessOpportunity, field: 'title' | 'summary' | 'content') => {
    if (lang === 'ar') {
      if (field === 'title') return opp.titleAr || opp.titleEn;
      if (field === 'summary') return opp.summaryAr || opp.summaryEn;
      if (field === 'content') return opp.contentAr || opp.contentEn;
    }
    if (lang === 'zh') {
      if (field === 'title') return opp.titleZh || opp.titleEn;
      if (field === 'summary') return opp.summaryZh || opp.summaryEn;
      if (field === 'content') return opp.contentZh || opp.contentEn;
    }
    if (lang === 'ckb') {
      if (field === 'title') return opp.titleCkb || opp.titleEn;
      if (field === 'summary') return opp.summaryCkb || opp.summaryEn;
      if (field === 'content') return opp.contentCkb || opp.contentEn;
    }
    return opp[`${field}En`] || opp[`${field}Ar`] || opp[`${field}Zh`] || '';
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    if (selectedCategory === 'ALL') return true;
    return opp.category === selectedCategory;
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryStatus('SENDING');
    setTimeout(() => {
      setInquiryStatus('SUCCESS');
      setTimeout(() => {
        setInquiryStatus('IDLE');
        setSelectedOpportunity(null);
        setInquiryName('');
        setInquiryEmail('');
        setInquiryCompany('');
        setInquiryMessage('');
      }, 2500);
    }, 1200);
  };

  return (
    <section 
      id="ica-business-hub" 
      className="w-full bg-white dark:bg-neutral-900 border-2 border-ink-900 dark:border-neutral-700 shadow-sm p-6 sm:p-8 md:p-10 my-6 transition-colors duration-300"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/10 text-brand-800 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-800/20">
            <Building2 className="w-3.5 h-3.5" />
            {t.badge}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-600 dark:text-brand-500 tracking-tight leading-tight mb-4">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
            {t.desc}
          </p>
        </div>

        {/* 4 Sovereign Investor Guarantees Grid */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-6">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t.guaranteesTitle}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {t.guarantees.map((g, idx) => {
              const minimalSigns = ['✦', '◆', '⬦', '❖'];
              return (
              <div 
                key={idx}
                className="bg-white dark:bg-neutral-800/90 border border-neutral-200/80 dark:border-neutral-700/80 rounded-xl p-5 shadow-xs hover:border-brand-600/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-brand-800/10 text-brand-700 dark:text-brand-400 font-bold text-sm flex items-center justify-center mb-3">
                    {minimalSigns[idx % minimalSigns.length]}
                  </div>
                  <h4 className="text-sm font-black text-brand-700 dark:text-brand-400 mb-2 leading-snug">
                    {g.title}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {g.desc}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-neutral-100 dark:border-neutral-700/60 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Verified Legal Immunity</span>
                </div>
              </div>
            );
            })}
          </div>
        </div>

        {/* Official Investment Laws Download Bar */}
        <div className="relative mb-16">
          <div className="relative z-10 p-6 sm:p-8 md:p-10 bg-gradient-to-r from-brand-800 via-brand-700 to-brand-900 text-white rounded-2xl shadow-2xl border border-brand-600/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="p-3.5 bg-white/10 backdrop-blur-md text-white rounded-xl shrink-0 mt-0.5 border border-white/20 shadow-inner">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-black text-white mb-2 tracking-tight">
                  {t.lawsTitle}
                </h4>
                <p className="text-xs sm:text-sm text-brand-100 max-w-xl leading-relaxed font-sans">
                  Direct authorized codification of Federal Law No. 13 and KRG Law No. 4, governing corporate immunity, zero tariff imports, and sovereign capital repatriation.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {t.laws.map((law, idx) => (
                <a
                  key={idx}
                  href={law.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4.5 py-3 bg-white/10 hover:bg-white/20 border border-white/25 rounded-xl text-xs sm:text-sm font-bold text-white transition-all group backdrop-blur-sm shadow-sm"
                >
                  <Download className="w-4 h-4 text-brand-200 group-hover:scale-110 transition-transform" />
                  <span className="truncate max-w-[200px] sm:max-w-xs">{law.name}</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-black/30 text-brand-200 rounded-md">
                    PDF / Official
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Smooth Smoke-like Red Blurry Effect Underneath */}
          <div className="absolute -bottom-6 left-8 right-8 h-10 bg-brand-600/60 blur-2xl rounded-full pointer-events-none z-0 opacity-75" />
          <div className="absolute -bottom-10 left-16 right-16 h-12 bg-brand-500/40 blur-3xl rounded-full pointer-events-none z-0 opacity-50" />
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {Object.entries(t.categories).map(([catKey, labelObj]) => {
              const isActive = selectedCategory === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-brand-800 text-white shadow-sm'
                      : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  <span>{(labelObj as any)[lang] || (labelObj as any).en}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="group bg-white dark:bg-neutral-800 border border-neutral-200/90 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo with Overlay Badges */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                  <img
                    src={opp.coverImage}
                    alt={opp.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 start-3 flex gap-2">
                    <span className="px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider bg-brand-800 text-white rounded-md shadow-xs">
                      {opp.category}
                    </span>
                    {opp.featured && (
                      <span className="px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider bg-amber-500 text-black rounded-md flex items-center gap-1 shadow-xs">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-1.5 font-bold drop-shadow-md truncate">
                      <Tag className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                      <span className="truncate">{opp.sector}</span>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-sm uppercase tracking-wider ${
                      opp.status === 'OPEN' 
                        ? 'bg-emerald-600/90' 
                        : opp.status === 'ACTIVE' 
                        ? 'bg-blue-600/90' 
                        : 'bg-amber-600/90'
                    }`}>
                      {opp.status}
                    </span>
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white leading-snug mb-2.5 group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                    {getLocalized(opp, 'title')}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed mb-5 font-sans">
                    {getLocalized(opp, 'summary')}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-4 border-t border-neutral-100 dark:border-neutral-700/70 text-neutral-600 dark:text-neutral-300">
                    <div className="flex items-center gap-1.5 truncate">
                      <DollarSign className="w-4 h-4 text-brand-700 dark:text-brand-400 shrink-0" />
                      <span className="font-bold text-neutral-900 dark:text-white truncate">
                        {opp.investmentValue}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                      <span className="truncate">{opp.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    setSelectedOpportunity(opp);
                    setInquiryStatus('IDLE');
                  }}
                  className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-brand-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>{t.viewProspectus}</span>
                  {isRtl ? (
                    <ArrowLeft className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Fast Action Links */}
        <div className="mt-12 py-10 px-8 sm:px-10 rounded-2xl bg-gradient-to-r from-brand-800 via-brand-700 to-brand-900 text-white border border-brand-600/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-start">
            <div className="p-3.5 bg-white/10 backdrop-blur-md text-white rounded-xl border border-white/20 shadow-inner">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-white mb-1 tracking-tight">
                {lang === 'ar' ? 'هل تبحث عن خدمات التوريد والتسوية الثنائية؟' : lang === 'zh' ? '需要双边大宗集采与本币跨境清算服务？' : lang === 'ckb' ? 'پێویستت بە خزمەتگوزاری دابینکردن و پاکتاوی داراییە؟' : 'Looking for Cross-Border Procurement & Currency Settlement?'}
              </h4>
              <p className="text-xs sm:text-sm text-brand-100 font-sans">
                {lang === 'ar' ? 'قم بزيارة مكتب التسوية والمقاصة الثنائية أدناه.' : lang === 'zh' ? '请下滚访问下方直通清算与采购服务台。' : lang === 'ckb' ? 'دەتوانیت سەردانی دەفتەری خزمەتگوزاری دارایی بکەیت لە خوارەوە.' : 'Direct access to the settlement and sourcing desk below.'}
              </p>
            </div>
          </div>
          <a
            href="#settlement-sourcing"
            className="px-6 py-3.5 bg-white hover:bg-brand-50 text-brand-900 text-xs sm:text-sm font-black rounded-xl transition-all shadow-md hover:shadow-lg shrink-0 tracking-wider uppercase"
          >
            {lang === 'ar' ? 'الانتقال إلى مكتب التسوية ←' : lang === 'zh' ? '前往双边结算与集采台 →' : lang === 'ckb' ? 'بڕۆ بۆ دەفتەری دارایی ←' : 'Go to Settlement & Sourcing →'}
          </a>
        </div>
      </div>

      {/* Prospectus & Expression of Interest Modal */}
      <AnimatePresence>
        {selectedOpportunity && (
          <div 
            className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedOpportunity(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {/* Modal Top Hero */}
              <div className="relative h-48 sm:h-60 w-full overflow-hidden shrink-0">
                <img
                  src={selectedOpportunity.coverImage}
                  alt={selectedOpportunity.titleEn}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                <button
                  onClick={() => setSelectedOpportunity(null)}
                  className="absolute top-4 end-4 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 start-6 end-6 text-white">
                  <div className="flex gap-2 mb-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-brand-800 text-white rounded-md">
                      {selectedOpportunity.category}
                    </span>
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white rounded-md">
                      {selectedOpportunity.status}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-black leading-tight text-white drop-shadow-md">
                    {getLocalized(selectedOpportunity, 'title')}
                  </h2>
                </div>
              </div>

              {/* Modal Scrollable Content */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
                {/* Metric Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-neutral-200/70 dark:border-neutral-700/70 text-xs">
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase font-semibold">
                      Investment Scale
                    </span>
                    <span className="font-bold text-neutral-900 dark:text-white text-sm">
                      {selectedOpportunity.investmentValue}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase font-semibold">
                      Target Location
                    </span>
                    <span className="font-bold text-neutral-900 dark:text-white text-sm">
                      {selectedOpportunity.location}
                    </span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-neutral-400 block text-[10px] uppercase font-semibold">
                      Sector Focus
                    </span>
                    <span className="font-bold text-brand-800 dark:text-brand-400 text-sm truncate block">
                      {selectedOpportunity.sector}
                    </span>
                  </div>
                </div>

                {/* Detailed Narrative */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Executive Prospectus & Sovereign Terms
                  </h4>
                  <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-200 leading-relaxed font-sans text-justify">
                    {getLocalized(selectedOpportunity, 'content')}
                  </p>
                </div>

                {/* Expression of Interest Form */}
                <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-brand-800" />
                    {t.expressInterest}
                  </h4>
                  <p className="text-xs text-neutral-500 mb-4">
                    Submit your enterprise credentials to the bilateral investment liaison desk in Baghdad and Beijing.
                  </p>

                  {inquiryStatus === 'SUCCESS' ? (
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <span>Expression of interest received. An ICA investment counselor will contact your office within 24 hours.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name / Delegate"
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          className="text-xs px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-hidden focus:border-brand-800"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Official Enterprise Email"
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          className="text-xs px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-hidden focus:border-brand-800"
                        />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Company / State Corporation / Consortium Name"
                        value={inquiryCompany}
                        onChange={(e) => setInquiryCompany(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-hidden focus:border-brand-800"
                      />
                      <textarea
                        rows={2}
                        placeholder="Brief proposal, capital scale or specific inquiry regarding this opportunity..."
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-hidden focus:border-brand-800"
                      />
                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setSelectedOpportunity(null)}
                          className="px-4 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl"
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          disabled={inquiryStatus === 'SENDING'}
                          className="px-5 py-2 bg-brand-800 hover:bg-brand-900 text-white text-xs font-bold rounded-xl transition-all shadow-xs disabled:opacity-50"
                        >
                          {inquiryStatus === 'SENDING' ? 'Transmitting...' : 'Submit Dispatch'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
