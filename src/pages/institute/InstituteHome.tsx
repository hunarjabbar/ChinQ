import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { 
  FileText, 
  ShieldCheck, 
  TrendingUp, 
  Database, 
  Users, 
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
  Handshake,
  Globe,
  Download,
  BookOpen,
  Landmark,
  Coins,
  Scale,
  FileCheck,
  GraduationCap,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { generateInstitutionalPdf } from '../../utils/pdfGenerator';
import { cn } from '../../lib/utils';

interface HeroCoverProps {
  src: string;
  alt: string;
  badgeText: string;
}

function HeroCover({ src, alt, badgeText }: HeroCoverProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full h-[280px] lg:h-full min-h-[280px] lg:min-h-[420px] overflow-hidden rounded-t-3xl lg:rounded-t-none lg:rounded-s-3xl bg-gradient-to-br from-[var(--color-ink-900)] via-[#1E293B] to-[#1E3A5F]">
      {/* Background Watermark Fallback */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-15" aria-hidden="true">
        <div className="text-center">
          <div className="text-8xl sm:text-9xl font-black text-[var(--color-brand-800)] tracking-tighter">CI</div>
          <div className="text-[10px] font-bold text-white uppercase tracking-[0.3em] mt-2">CISE Official Publication</div>
        </div>
      </div>

      {/* Hero Image with onError Fallback */}
      {!imageError && (
        <img 
          src={src} 
          alt={alt}
          onError={() => setImageError(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          referrerPolicy="no-referrer"
        />
      )}

      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink-900)]/80 via-transparent to-[var(--color-ink-900)]/30 pointer-events-none" />

      {/* Floating Badge */}
      <div className="absolute top-5 left-5 rtl:left-auto rtl:right-5 z-10">
        <Link 
          to="publications?type=white-paper" 
          className="inline-block bg-[var(--color-brand-800)] hover:bg-[var(--color-brand-900)] text-[var(--color-ink-900)] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg transition-transform hover:scale-105"
        >
          {badgeText}
        </Link>
      </div>
    </div>
  );
}

const i18nInstituteHome: Record<Locale, {
  eyebrow: string;
  sovereignIntegrity: string;
  leadReportBadge: string;
  leadReportTitle: string;
  leadReportSubtitle: string;
  tier3Report: string;
  ciseFellowsPanel: string;
  publishedSep2026: string;
  dataProvenance: string;
  readBrief: string;
  downloadPdf: string;
  researchPillars: string;
  primaryStrategicDomains: string;
  exploreAllPillars: string;
  viewPillar: string;
  latestPublications: string;
  archiveOfRecord: string;
  accessFullArchive: string;
  readPublication: string;
  verifiedData: string;
  collaborationEyebrow: string;
  collaborationTitle: string;
  collaborationDescription: string;
  partnerCta: string;
  bookFellowCta: string;
  stats: {
    projects: string;
    fellows: string;
    dataPoints: string;
    languages: string;
  };
  pillars: Array<{
    id: string;
    title: string;
    description: string;
    metricLabel: string;
    metricValue: string;
    iconBg: string;
  }>;
  publications: Array<{
    id: string;
    type: string;
    title: string;
    authors: string;
    date: string;
    img: string;
  }>;
}> = {
  en: {
    eyebrow: 'CHINESE INSTITUTE FOR STRATEGIC AND ECONOMIC STUDIES',
    sovereignIntegrity: 'Sovereign Research Integrity',
    leadReportBadge: 'Latest White Paper',
    leadReportTitle: 'Mapping the Iraq–China Development Corridor: Infrastructure, Energy, & Sovereign Debt',
    leadReportSubtitle: 'A comprehensive multi-node econometric analysis of bilateral infrastructure interconnectivity, oil-backed sovereign financing mechanisms, and northern vs. southern transport route optimization across 18 Iraqi provinces.',
    tier3Report: 'Tier 3 Report',
    ciseFellowsPanel: 'CISE Fellows Panel',
    publishedSep2026: 'Published Sep 2026',
    dataProvenance: 'Data Provenance',
    readBrief: 'Read Brief',
    downloadPdf: 'Download PDF',
    researchPillars: 'Research Pillars',
    primaryStrategicDomains: 'Primary Strategic Domains',
    exploreAllPillars: 'Explore all research pillars',
    viewPillar: 'View pillar',
    latestPublications: 'Latest Publications',
    archiveOfRecord: 'Archive of Record',
    accessFullArchive: 'Access full archive',
    readPublication: 'Read Publication',
    verifiedData: 'Verified Data',
    collaborationEyebrow: 'Institutional Collaboration',
    collaborationTitle: 'Syndication, Co-Publishing, & Advisory',
    collaborationDescription: 'We provide official syndication feeds for global news agencies, co-publishing opportunities for academic partners, and bespoke B2B advisory for infrastructure stakeholders.',
    partnerCta: 'Partner with the Institute',
    bookFellowCta: 'Book a Media Fellow',
    stats: {
      projects: 'Active BRI Projects',
      fellows: 'Research Fellows',
      dataPoints: 'Annual Data Points',
      languages: 'Official Languages'
    },
    pillars: [
      {
        id: 'energy',
        title: 'Energy & Belt and Road',
        description: 'Sovereign crude allocations, refinery modernization, and long-term oil-for-infrastructure frameworks.',
        metricLabel: 'Crude Imports',
        metricValue: '520k bpd',
        iconBg: 'var(--color-ink-900)'
      },
      {
        id: 'geo-economics',
        title: 'Geo-Economics & Settlement',
        description: 'Cross-border RMB clearing, direct IQD-CNY currency swaps, and financial risk mitigation.',
        metricLabel: 'Trade Balance',
        metricValue: '$52.4B',
        iconBg: 'var(--color-ink-900)'
      },
      {
        id: 'diplomacy',
        title: 'Bilateral Diplomacy',
        description: 'High-level ministerial summits, municipal sister-city pacts, and bilateral treaties.',
        metricLabel: 'Engagements',
        metricValue: '12 Scheduled',
        iconBg: 'var(--color-ink-900)'
      },
      {
        id: 'digital-silk-road',
        title: 'Digital Silk Road & Tech',
        description: '5G telecommunications nodes, sovereign data centers, AI governance, and smart transit corridors.',
        metricLabel: 'Tech Transfer',
        metricValue: '74% Active',
        iconBg: 'var(--color-ink-900)'
      }
    ],
    publications: [
      {
        id: 'mapping-iraq-china-development-corridor',
        type: 'White Paper',
        title: 'The Re-emergence of Direct IQD/CNY Settlement: Macroeconomic Impacts',
        authors: 'Dr. Wang Wei, Ahmed Kareem',
        date: 'Sep 2026',
        img: 'https://images.unsplash.com/photo-1544022613-e87ef75a784a?auto=format&fit=crop&q=80&w=600&h=750'
      },
      {
        id: 'iqd-cny-settlement-macroeconomic-impacts',
        type: 'Policy Brief',
        title: 'Bilateral Trade Resilience: Analyzing the 2025 Energy-for-Infrastructure Apex',
        authors: 'Li Na, Ziyad Al-Husseini',
        date: 'Aug 2026',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=750'
      },
      {
        id: 'grand-faw-port-bri-logistics',
        type: 'Data Note',
        title: 'Grand Faw Port: Technical Readiness & Maritime BRI Integration Nodes',
        authors: 'CISE Logistics Group',
        date: 'Jul 2026',
        img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=600&h=750'
      }
    ]
  },
  ar: {
    eyebrow: 'المعهد الصيني للدراسات الاستراتيجية والاقتصادية',
    sovereignIntegrity: 'نزاهة البحوث السيادية',
    leadReportBadge: 'أحدث ورقة بيضاء',
    leadReportTitle: 'تخطيط ممر التنمية العراقي الصيني: البنية التحتية، الطاقة، والديون السيادية',
    leadReportSubtitle: 'تحليل اقتصاد قياسي شامل متعدد العقد للترابط الهيكلي للبنية التحتية، وآليات التمويل السيادي المدعومة بالنفط، وتحسين مسارات النقل الشمالية والجنوبية عبر ١٨ محافظة عراقية.',
    tier3Report: 'تقرير المستوى الثالث',
    ciseFellowsPanel: 'لجنة زملاء CISE',
    publishedSep2026: 'نُشر في سبتمبر ٢٠٢٦',
    dataProvenance: 'مصدر البيانات',
    readBrief: 'قراءة الموجز',
    downloadPdf: 'تحميل ملف PDF',
    researchPillars: 'ركائز البحوث',
    primaryStrategicDomains: 'المجالات الاستراتيجية الرئيسية',
    exploreAllPillars: 'استكشاف جميع ركائز البحوث',
    viewPillar: 'عرض الركيزة',
    latestPublications: 'أحدث المنشورات',
    archiveOfRecord: 'الأرشيف المعتمد',
    accessFullArchive: 'الوصول إلى كامل الأرشيف',
    readPublication: 'قراءة المنشور',
    verifiedData: 'بيانات موثقة',
    collaborationEyebrow: 'التعاون المؤسسي',
    collaborationTitle: 'النشر المشترك، التوزيع، والاستشارات',
    collaborationDescription: 'نوفر موجزات نشر رسمية لوكالات الأنباء الدولية، وفرص نشر مشترك للمؤسسات الأكاديمية، واستشارات استراتيجية لشركاء البنية التحتية.',
    partnerCta: 'الشراكة مع المعهد',
    bookFellowCta: 'حجز مقابلة مع خبير',
    stats: {
      projects: 'مشاريع حزام وطريق نشطة',
      fellows: 'زملاء باحثون',
      dataPoints: 'نقطة بيانات سنوية',
      languages: 'لغات رسمية'
    },
    pillars: [
      {
        id: 'energy',
        title: 'الطاقة ومبادرة الحزام والطريق',
        description: 'تخصيصات النفط السيادية، وتحديث مصافي التكرير، وأطر اتفاقيات "النفط مقابل الإعمار" طويلة الأمد.',
        metricLabel: 'واردات النفط',
        metricValue: '٥٢٠ ألف برميل/يوم',
        iconBg: 'var(--color-ink-900)'
      },
      {
        id: 'geo-economics',
        title: 'الاقتصاد الجغرافي والتسويات المالية',
        description: 'المقاصة المالية بالرنمينبي عبر الحدود، واتفاقيات مبادلة الدينار واليوان، وإدارة المخاطر النقدية.',
        metricLabel: 'الميزان التجاري',
        metricValue: '٥٢.٤ مليار $',
        iconBg: 'var(--color-ink-900)'
      },
      {
        id: 'diplomacy',
        title: 'الدبلوماسية الثنائية',
        description: 'القمم الوزارية رفيعة المستوى، واتفاقيات التوأمة بين المدن، والمعاهدات الاستراتيجية الملزمة.',
        metricLabel: 'الارتباطات',
        metricValue: '١٢ فعالية مجدولة',
        iconBg: 'var(--color-ink-900)'
      },
      {
        id: 'digital-silk-road',
        title: 'طريق الحرير الرقمي والتكنولوجيا',
        description: 'عقد اتصالات الجيل الخامس، ومراكز البيانات السيادية، وأطر حوكمة الذكاء الاصطناعي للممرات الذكية.',
        metricLabel: 'نقل التكنولوجيا',
        metricValue: '٧٤٪ نشط',
        iconBg: 'var(--color-ink-900)'
      }
    ],
    publications: [
      {
        id: 'mapping-iraq-china-development-corridor',
        type: 'ورقة بيضاء',
        title: 'إعادة إحياء التسوية المباشرة بالدينار واليوان: التأثيرات على الاقتصاد الكلي',
        authors: 'د. وانغ وي، أحمد كريم',
        date: 'سبتمبر ٢٠٢٦',
        img: 'https://images.unsplash.com/photo-1544022613-e87ef75a784a?auto=format&fit=crop&q=80&w=600&h=750'
      },
      {
        id: 'iqd-cny-settlement-macroeconomic-impacts',
        type: 'موجز سياسات',
        title: 'مرونة التجارة الثنائية: تحليل ذروة النفط مقابل البنية التحتية لعام ٢٠٢٥',
        authors: 'لي نا، زياد الحسيني',
        date: 'أغسطس ٢٠٢٦',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=750'
      },
      {
        id: 'grand-faw-port-bri-logistics',
        type: 'ملاحظة بيانات',
        title: 'ميناء الفاو الكبير: الجاهزية الفنية وعقد الاندماج في الحزام والطريق البحري',
        authors: 'فريق لوجستيات CISE',
        date: 'يوليو ٢٠٢٦',
        img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=600&h=750'
      }
    ]
  },
  zh: {
    eyebrow: '中国战略与经济研究所',
    sovereignIntegrity: '主权研究公信力',
    leadReportBadge: '最新白皮书',
    leadReportTitle: '绘制中伊发展走廊蓝图：基础设施、能源与主权债务',
    leadReportSubtitle: '覆盖伊拉克18个省份的双边基础设施互联互通、石油主权融资机制以及南北运输走廊优化的全景计量经济学分析。',
    tier3Report: '三级战略报告',
    ciseFellowsPanel: 'CISE 专家委员会',
    publishedSep2026: '2026年9月发布',
    dataProvenance: '数据溯源',
    readBrief: '阅读简报',
    downloadPdf: '下载 PDF 报告',
    researchPillars: '核心研究支柱',
    primaryStrategicDomains: '关键战略领域',
    exploreAllPillars: '浏览全部研究支柱',
    viewPillar: '查看支柱',
    latestPublications: '最新学术成果',
    archiveOfRecord: '官方档案',
    accessFullArchive: '查看完整成果库',
    readPublication: '阅读文献',
    verifiedData: '权威核验数据',
    collaborationEyebrow: '机构合作',
    collaborationTitle: '智库联络、成果共建与战略咨询',
    collaborationDescription: '我们为国际新闻机构提供官方内容发布通道，为学术机构提供联合出版平台，并为重大基建相关方提供定制化B2B咨询。',
    partnerCta: '与研究所开展合作',
    bookFellowCta: '预约特聘专家',
    stats: {
      projects: '重点在建一带一路项目',
      fellows: '资深驻所研究员',
      dataPoints: '年度监测数据点',
      languages: '官方发布语言'
    },
    pillars: [
      {
        id: 'energy',
        title: '能源与一带一路',
        description: '主权原油配额调度、炼化一体化升级与“石油换项目”长期框架落地研究。',
        metricLabel: '原油进口量',
        metricValue: '52万桶/日',
        iconBg: 'var(--color-ink-900)'
      },
      {
        id: 'geo-economics',
        title: '地缘经济与金融结算',
        description: '人民币跨境清算机制、伊拉克第纳尔与人民币本币互换及系统性金融风险防控。',
        metricLabel: '双边贸易额',
        metricValue: '524亿美元',
        iconBg: 'var(--color-ink-900)'
      },
      {
        id: 'diplomacy',
        title: '双边外交与治理',
        description: '部长级高层对话、友好省市缔约及规范中伊全面战略伙伴关系的演进法律架构。',
        metricLabel: '外事安排',
        metricValue: '已定12场',
        iconBg: 'var(--color-ink-900)'
      },
      {
        id: 'digital-silk-road',
        title: '数字丝绸之路与科技',
        description: '5G通信核心节点、主权数据中心、人工智能治理框架与智慧运输走廊系统。',
        metricLabel: '技术转化',
        metricValue: '74% 实施度',
        iconBg: 'var(--color-ink-900)'
      }
    ],
    publications: [
      {
        id: 'mapping-iraq-china-development-corridor',
        type: '白皮书',
        title: '第纳尔与人民币直接结算的重塑：宏观经济影响分析',
        authors: '王伟 博士, 艾哈迈德·卡里姆',
        date: '2026年9月',
        img: 'https://images.unsplash.com/photo-1544022613-e87ef75a784a?auto=format&fit=crop&q=80&w=600&h=750'
      },
      {
        id: 'iqd-cny-settlement-macroeconomic-impacts',
        type: '政策简报',
        title: '双边贸易韧性：解析2025年“能源换基建”峰值格局',
        authors: '李娜, 齐亚德·侯赛尼',
        date: '2026年8月',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=750'
      },
      {
        id: 'grand-faw-port-bri-logistics',
        type: '数据观察',
        title: '大福港：工程就绪度与21世纪海上丝绸之路节点整合',
        authors: 'CISE 物流课题组',
        date: '2026年7月',
        img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=600&h=750'
      }
    ]
  },
  ckb: {
    eyebrow: 'پەیمانگای چینی بۆ لێکۆڵینەوەی ستراتیژی و ئابووری',
    sovereignIntegrity: 'دەستپاکی توێژینەوەی باڵا',
    leadReportBadge: 'نوێترین ڕاپۆرتی ستراتیژی',
    leadReportTitle: 'نەخشەسازی مەمەری گەشەپێدانی عێراق-چین: ژێرخان، وزە و قەرزی سەروەری',
    leadReportSubtitle: 'شیکارییەکی هەمەلایەنەی ئابووری پێوانەیی بۆ پێکەوەبەستنی ژێرخان لە نێوان عێراق و چین، میکانیزمەکانی دارایی بە پاڵپشتی نەوت، و چاککردنی ڕێڕەوەکانی گواستنەوەی باکوور و باشوور لە ١٨ پارێزگای عێراق.',
    tier3Report: 'ڕاپۆرتی پلە ٣',
    ciseFellowsPanel: 'لیژنەی توێژەرانی CISE',
    publishedSep2026: 'بڵاوکراوەتەوە: ئەیلوولی ٢٠٢٦',
    dataProvenance: 'سەرچاوەی داتا',
    readBrief: 'خوێندنەوەی پوختە',
    downloadPdf: 'داگرتنی PDF',
    researchPillars: 'تەوەرەکانی توێژینەوە',
    primaryStrategicDomains: 'کایە سەرەکییە ستراتیژییەکان',
    exploreAllPillars: 'گەڕان لە هەموو تەوەرەکانی توێژینەوەدا',
    viewPillar: 'بینینی تەوەر',
    latestPublications: 'نوێترین بڵاوکراوەکان',
    archiveOfRecord: 'ئەرشیفی بەڵگەنامەکان',
    accessFullArchive: 'دەستگەیشتن بە تەواوی ئەرشیف',
    readPublication: 'خوێندنەوەی بڵاوکراوە',
    verifiedData: 'داتای پەسەندکراو',
    collaborationEyebrow: 'هاوکاری دەزگایی',
    collaborationTitle: 'بڵاوکردنەوەی هاوبەش، میدیایی و ڕاوێژکاری',
    collaborationDescription: 'فیدەکانی بڵاوکردنەوەی فەرمی بۆ ئاژانسە هەواڵییەکان، دەرفەتی بڵاوکردنەوەی هاوبەش بۆ هاوبەشە ئەکادیمییەکان و ڕاوێژکاری باڵا دابین دەکەین.',
    partnerCta: 'هاوبەشی لەگەڵ پەیمانگا',
    bookFellowCta: 'داواکردنی ڕاوێژکاری شارەزا',
    stats: {
      projects: 'پڕۆژەی چالاکی پشتێنە و ڕێگە',
      fellows: 'توێژەری باڵا',
      dataPoints: 'داتای تۆمارکراوی ساڵانە',
      languages: 'زمانی فەرمی'
    },
    pillars: [
      {
        id: 'energy',
        title: 'وزە و پشتێنە و ڕێگە',
        description: 'تەرخانکردنی نەوتی خاوی سەروەری، نوێکردنەوەی پاڵاوگەکان، و ڕێککەوتنی "نەوت بەرامبەر پڕۆژەکان".',
        metricLabel: 'هاوردەی نەوت',
        metricValue: '٥٢٠ هەزار بەرمیل/ڕۆژ',
        iconBg: 'var(--color-ink-900)'
      },
      {
        id: 'geo-economics',
        title: 'جیۆ-ئابووری و مامەڵە داراییەکان',
        description: 'پاکتاوکردنی دراوی ڕێنمینبی لە سنوورەکان، ئاڵوگۆڕی ڕاستەوخۆی دینار و یوان، و کەمکردنەوەی مەترسییە داراییەکان.',
        metricLabel: 'تەرازوی بازرگانی',
        metricValue: '٥٢.٤ ملیار $',
        iconBg: 'var(--color-ink-900)'
      },
      {
        id: 'diplomacy',
        title: 'دیپلۆماسی دووقۆڵی',
        description: 'لووتکە وەزارییە باڵاکان، پەیماننامەکانی دەستەخوشکی شارەکان و ڕێککەوتننامە دووقۆڵییەکان.',
        metricLabel: 'دیدار و کۆبوونەوەکان',
        metricValue: '١٢ دیداری دیاریکراو',
        iconBg: 'var(--color-ink-900)'
      },
      {
        id: 'digital-silk-road',
        title: 'ڕێگای ئاوریشمی دیجیتاڵی و تەکنەلۆجیا',
        description: 'گرێکانی پەیوەندی 5G، سەنتەرەکانی داتای سەروەری، حوکمڕانی زیرەکی دەستکرد و ڕێڕەوە هۆشمەندەکان.',
        metricLabel: 'گواستنەوەی تەکنەلۆجیا',
        metricValue: '٧٤٪ چالاک',
        iconBg: 'var(--color-ink-900)'
      }
    ],
    publications: [
      {
        id: 'mapping-iraq-china-development-corridor',
        type: 'ڕاپۆرتی ستراتیژی',
        title: 'سەرهەڵدانەوەی یەکلاییکردنەوەی راستەوخۆی دینار و یوان: کاریگەرییە ئابوورییە گەورەکان',
        authors: 'د. وانگ وەی، ئەحمەد کەریم',
        date: 'ئەیلوولی ٢٠٢٦',
        img: 'https://images.unsplash.com/photo-1544022613-e87ef75a784a?auto=format&fit=crop&q=80&w=600&h=750'
      },
      {
        id: 'iqd-cny-settlement-macroeconomic-impacts',
        type: 'پوختەی سیاسەت',
        title: 'خۆڕاگری بازرگانی دووقۆڵی: شیکاری لووتکەی وزە بەرامبەر ژێرخان بۆ ساڵی ٢٠٢٥',
        authors: 'لی نا، زیاد حوسەینی',
        date: 'ئابی ٢٠٢٦',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=750'
      },
      {
        id: 'grand-faw-port-bri-logistics',
        type: 'تێبینی داتا',
        title: 'بەندەری گەورەی فاو: ئامادەیی تەکنیکی و گرێکانی بەستنەوە بە ڕێگای ئاوریشمی دەریایی',
        authors: 'گرووپی لۆجستی CISE',
        date: 'تەممووزی ٢٠٢٦',
        img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=600&h=750'
      }
    ]
  }
};

export function InstituteHome() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  const cleanLang = ((lang as string) === 'ck' ? 'ckb' : lang) as Locale;
  const tLocal = i18nInstituteHome[cleanLang] || i18nInstituteHome.en;

  // Mock data for live indicators
  const oilData = [
    { month: 'Jan', value: 400 },
    { month: 'Feb', value: 450 },
    { month: 'Mar', value: 420 },
    { month: 'Apr', value: 480 },
    { month: 'May', value: 520 },
    { month: 'Jun', value: 500 },
  ];

  const tradeData = [
    { year: '2021', value: 30 },
    { year: '2022', value: 38 },
    { year: '2023', value: 45 },
    { year: '2024', value: 52 },
  ];

  const handleDownloadReportPdf = () => {
    generateInstitutionalPdf({
      title: tLocal.leadReportTitle,
      subtitle: tLocal.leadReportSubtitle,
      category: `${tLocal.leadReportBadge} / ${tLocal.tier3Report}`,
      author: `Dr. Wang Wei & ${tLocal.ciseFellowsPanel}`,
      date: tLocal.publishedSep2026,
      summary: tLocal.leadReportSubtitle,
      content: [
        '1. Executive Summary & Strategic Rationale for Iraq-China Infrastructure Integration',
        '2. Macroeconomic Analysis of Crude Oil Allocations and Infrastructure Financing Models',
        '3. Grand Faw Port Logistics Alignment with Maritime Silk Road Freight Corridors',
        '4. Digital Silk Road and Submarine Fiber Optic Telecommunications Architecture',
        '5. Sovereign Risk Mitigation, Bilateral Settlement Guarantees, and Long-Term Fiscal Outlook'
      ],
      provenance: 'Data Provenance: Ministry of Foreign Affairs PRC, The World Bank Group, Ministry of Oil Republic of Iraq, Central Bank of Iraq.',
      fileName: 'CISE-Mapping-Iraq-China-Development-Corridor-2026.pdf'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-16 lg:space-y-20 min-w-0">
      {/* Hero Component: Latest White Paper */}
      <section className="relative scroll-mt-32 min-w-0" id="hero-featured-paper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 shadow-2xl border border-neutral-200 dark:border-neutral-800 min-w-0">
          {/* Hero Cover Column */}
          <div className="lg:col-span-5 relative min-w-0">
            <HeroCover 
              src="https://images.unsplash.com/photo-1521295121812-af46571d9ec6?auto=format&fit=crop&q=80&w=1200"
              alt="Iraq-China Development Corridor Strategy Cover"
              badgeText={tLocal.leadReportBadge}
            />
          </div>
          
          {/* Hero Content Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 min-w-0">
            <div className="space-y-4 min-w-0">
              <div className="flex items-center gap-2 text-[var(--color-brand-800)] dark:text-[#38BDF8]">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{tLocal.sovereignIntegrity}</span>
              </div>

              <Link 
                to={`/${lang}/institute/publications/mapping-iraq-china-development-corridor`}
                className="block group"
              >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--color-ink-900)] dark:text-white leading-tight font-serif group-hover:text-[var(--color-brand-800)] dark:group-hover:text-[#38BDF8] transition-colors">
                  {tLocal.leadReportTitle}
                </h1>
              </Link>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
                {tLocal.leadReportSubtitle}
              </p>

              {/* Strategic Metadata Tags */}
              <div className="flex flex-wrap gap-2.5 pt-2 text-xs font-semibold">
                <span className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300">
                  <FileText size={13} className="text-[var(--color-brand-800)]" />
                  <span>{tLocal.tier3Report}</span>
                </span>
                
                <span className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300">
                  <Users size={13} className="text-[var(--color-brand-800)]" />
                  <span>{tLocal.ciseFellowsPanel}</span>
                </span>

                <Link 
                  to={`/${lang}/institute/publications?date=2026-09`}
                  className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
                >
                  <Calendar size={13} className="text-[var(--color-brand-800)]" />
                  <span>{tLocal.publishedSep2026}</span>
                </Link>
              </div>
            </div>

            {/* Footer Row: Data Provenance Strip + CTA Actions */}
            <div className="pt-5 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 flex-wrap min-w-0">
              <div className="data-provenance-strip">
                <span className="data-provenance-strip__label">{tLocal.dataProvenance}:</span>
                <a 
                  href="https://www.fmprc.gov.cn/eng/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[var(--color-brand-800)] dark:hover:text-[#38BDF8] flex items-center gap-1 transition-colors"
                >
                  <span>FM PRC</span>
                  <ExternalLink size={10} />
                </a>
                <span className="opacity-50">·</span>
                <a 
                  href="https://www.worldbank.org/en/country/iraq" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[var(--color-brand-800)] dark:hover:text-[#38BDF8] flex items-center gap-1 transition-colors"
                >
                  <span>World Bank</span>
                  <ExternalLink size={10} />
                </a>
                <span className="opacity-50">·</span>
                <a 
                  href="https://oil.gov.iq" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[var(--color-brand-800)] dark:hover:text-[#38BDF8] flex items-center gap-1 transition-colors"
                >
                  <span>Iraq MOO</span>
                  <ExternalLink size={10} />
                </a>
              </div>

              <div className="hero-cta-row">
                <Link 
                  to={`/${lang}/institute/publications/mapping-iraq-china-development-corridor`} 
                  className="btn-primary"
                >
                  <BookOpen size={14} />
                  <span>{tLocal.readBrief}</span>
                  <span className="cta-arrow" aria-hidden="true">→</span>
                </Link>
                
                <button 
                  onClick={handleDownloadReportPdf}
                  className="btn-outline"
                >
                  <Download size={14} />
                  <span>{tLocal.downloadPdf}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First-Class Institutional Services & Bilateral Initiatives Section */}
      <section className="space-y-8 scroll-mt-32 min-w-0" id="institutional-services">
        <div className="section-header border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <div className="section-header__text space-y-1.5">
            <h2 className="section-heading uppercase tracking-tight">
              {lang === 'ar' ? 'الخدمات المؤسسية والمبادرات الثنائية' : lang === 'zh' ? '智库机构服务与战略倡议' : lang === 'ckb' ? 'خزمەتگوزارییە دامەزراوەییەکان' : 'Institutional Services & Initiatives'}
            </h2>
            <p className="section-eyebrow">
              {lang === 'ar' ? 'المسارات السيادية والمرافق التشغيلية الـ٧ برعاية المعهد' : lang === 'zh' ? '由 CISE 主管运营的七大主权通道与双边服务实体' : lang === 'ckb' ? '٧ ناوەند و هێڵی سەروەری لەژێر چاودێری پەیمانگا' : 'Sovereign Clearing, Risk Mitigation, Cultural Exchange & Bilateral Facilitation Rails'}
            </p>
          </div>
          <div className="section-header__action">
            <Link 
              to={`/${lang}/institute/services`} 
              className="research-pillar-card__cta"
            >
              <span>{lang === 'ar' ? 'دليل الخدمات الكامل' : lang === 'zh' ? '查看全部服务名录' : lang === 'ckb' ? 'تەواوی خزمەتگوزارییەکان' : 'Explore All Services'}</span>
              <span className="cta-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* 6 First-Class Initiatives Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-0">
          {/* Service 1: Summit */}
          <div className="p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-amber-500/30 hover:border-amber-500 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-brand-800)]">
                  {lang === 'ar' ? 'الملتقى السنوي · السليمانية' : lang === 'zh' ? '年度双边峰会 · 苏莱曼尼亚' : lang === 'ckb' ? 'لووتکەی ساڵانە' : 'Annual Convening · Sulaymaniyah'}
                </span>
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Landmark size={18} />
                </div>
              </div>
              <h3 className="text-lg font-black text-[var(--color-ink-900)] dark:text-white uppercase leading-snug">
                {lang === 'ar' ? 'القمة الاقتصادية والمعرض الثنائي' : lang === 'zh' ? '伊拉克-中国经济峰会暨博览会' : lang === 'ckb' ? 'لووتکەی ئابووری و پێشانگای دوولایەنە' : 'Iraq-China Economic Summit & Bilateral Expo'}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {lang === 'ar' 
                  ? 'منصة سيادية ثنائية المسار تضم قمة رفيعة المستوى ومعرضاً شاملاً لـ١١ قطاعاً استراتيجياً من الاقتصادين العراقي والصيني.'
                  : lang === 'zh'
                  ? '国家级双轨盛会：高规格部长级政策闭门峰会与涵盖国民经济11大重点产业的全景式双边博览会。'
                  : lang === 'ckb'
                  ? 'لووتکەیەکی ئاستبەرز و پێشانگایەکی دوولایەنەی هاوبەش بۆ ١١ کەرتی ئابووری نێوان عێراق و چین.'
                  : 'A dual-format convening—a high-level sovereign policy summit alongside an 11-sector bilateral expo linking Iraqi & Chinese enterprises.'}
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                <span>Policy Track</span>
                <span aria-hidden="true">·</span>
                <span>B2B Finance</span>
                <span aria-hidden="true">·</span>
                <span>Tech Transfer</span>
                <span aria-hidden="true">·</span>
                <span>11 Pavilions</span>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800">
              <Link 
                to={`/${lang}/institute/summit`} 
                className="w-full flex items-center justify-between px-4 py-3 bg-[var(--color-ink-900)] hover:bg-[#1E293B] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all group"
              >
                <span>{lang === 'ar' ? 'دخول بوابة القمة' : lang === 'zh' ? '进入峰会专区' : lang === 'ckb' ? 'چوونە ناو لووتکە' : 'Enter the Summit'}</span>
                <ArrowRight size={14} className={cn("transition-transform group-hover:translate-x-1", isRtl && "rotate-180 group-hover:-translate-x-1")} />
              </Link>
            </div>
          </div>

          {/* Service 2: Settlement */}
          <div className="p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-emerald-500/30 hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  {lang === 'ar' ? 'مسار المقاصة السيادي' : lang === 'zh' ? '主权清算通道' : lang === 'ckb' ? 'هێڵی پاکتاوی سەروەری' : 'Sovereign Clearing Rail'}
                </span>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Coins size={18} />
                </div>
              </div>
              <h3 className="text-lg font-black text-[var(--color-ink-900)] dark:text-white uppercase leading-snug">
                {lang === 'ar' ? 'تسوية المدفوعات المباشرة (IQD ⇄ RMB)' : lang === 'zh' ? '第纳尔/人民币直接清算结算中心' : lang === 'ckb' ? 'پاکتاوی دراوەکان (IQD ⇄ RMB)' : 'Direct IQD ⇄ RMB Payment Settlement'}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {lang === 'ar'
                  ? 'مقاصة ثنائية مباشرة تقضي على وسيط الدولار، مع هامش صرف ٠٪، وتنفيذ معتمد من البنك المركزي العراقي وتكامل بطاقات Qi.'
                  : lang === 'zh'
                  ? '双边本币直接清算结算体系，规避第三国货币敞口，零汇率滑点，经伊拉克央行官方特许监管。'
                  : lang === 'ckb'
                  ? 'پاکتاوی ڕاستەوخۆی دوولایەنە کە پێویستی بە دۆلار ناهێڵێت، بە سپڕێدی ٠٪ و ڕێکخراو لەلایەن بانکی ناوەندی.'
                  : 'Direct bilateral clearing eliminating third-currency USD friction with 0% FX drag, CBI-accredited execution, and Qi card integration.'}
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                <span>0% FX Spread</span>
                <span aria-hidden="true">·</span>
                <span>24-48h Settlement</span>
                <span aria-hidden="true">·</span>
                <span>CBI Regulated</span>
                <span aria-hidden="true">·</span>
                <span>Qi Card</span>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800">
              <Link 
                to={`/${lang}/institute/settlement`} 
                className="w-full flex items-center justify-between px-4 py-3 bg-[var(--color-ink-900)] hover:bg-[#1E293B] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all group"
              >
                <span>{lang === 'ar' ? 'بوابة التسوية السيادية' : lang === 'zh' ? '进入结算中心' : lang === 'ckb' ? 'ناوەندی پاکتاو' : 'Access Settlement Portal'}</span>
                <ArrowRight size={14} className={cn("transition-transform group-hover:translate-x-1", isRtl && "rotate-180 group-hover:-translate-x-1")} />
              </Link>
            </div>
          </div>

          {/* Service 3: Insurance Facilitation */}
          <div className="p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-blue-500/30 hover:border-blue-500 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  {lang === 'ar' ? 'تسهيل التأمين السيادي' : lang === 'zh' ? '主权保险促进' : lang === 'ckb' ? 'بیمەی سەروەری' : 'Sovereign Insurance Facilitation'}
                </span>
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <ShieldCheck size={18} />
                </div>
              </div>
              <h3 className="text-lg font-black text-[var(--color-ink-900)] dark:text-white uppercase leading-snug">
                {lang === 'ar' ? 'تغطية ائتمان الصادرات ومخاطر المشاريع' : lang === 'zh' ? '出口信用与工程风险综合承保' : lang === 'ckb' ? 'بیمەی متمانەی هەناردە و مەترسی پڕۆژە' : 'Export Credit & Project Risk Coverage'}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {lang === 'ar'
                  ? 'تنسيق مباشر مع مؤسسة سينوشور وشركات إعادة التأمين لتوفير تغطية شاملة للشحن، والائتمان التجاري، ومخاطر السيادة.'
                  : lang === 'zh'
                  ? '直连中国出口信用保险公司（中信保），为双边贸易与基建工程提供跨境货运险、买方信贷险及主权政治风险兜底。'
                  : lang === 'ckb'
                  ? 'هەماهەنگی لەگەڵ سینۆشوور بۆ دابینکردنی بیمەی گشتگیری بار، متمانە، و کەمکردنەوەی مەترسی سیاسی.'
                  : 'Coordinating with Sinosure and international underwriters to provide cargo transit, deferred credit, and political risk mitigation.'}
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                <span>Sinosure Credit</span>
                <span aria-hidden="true">·</span>
                <span>Cargo Insurance</span>
                <span aria-hidden="true">·</span>
                <span>360d Terms</span>
                <span aria-hidden="true">·</span>
                <span>PRR Rating</span>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800">
              <Link 
                to={`/${lang}/institute/insurance-facilitation`} 
                className="w-full flex items-center justify-between px-4 py-3 bg-[var(--color-ink-900)] hover:bg-[#1E293B] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all group"
              >
                <span>{lang === 'ar' ? 'بوابة التأمين المؤسسي' : lang === 'zh' ? '进入保险促进专区' : lang === 'ckb' ? 'بیمەی سەروەری' : 'Access Insurance Portal'}</span>
                <ArrowRight size={14} className={cn("transition-transform group-hover:translate-x-1", isRtl && "rotate-180 group-hover:-translate-x-1")} />
              </Link>
            </div>
          </div>

          {/* Service 4: Visa Advisory Centre */}
          <div className="p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-teal-500/30 hover:border-teal-500 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400">
                  {lang === 'ar' ? 'مركز الاستشارات والفيزا' : lang === 'zh' ? '双边签证服务' : lang === 'ckb' ? 'ناوەندی ڤیزا' : 'Bilateral Visa Consultancy'}
                </span>
                <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <FileCheck size={18} />
                </div>
              </div>
              <h3 className="text-lg font-black text-[var(--color-ink-900)] dark:text-white uppercase leading-snug">
                {lang === 'ar' ? 'مركز التأشيرات الثنائية والاستشارات' : lang === 'zh' ? '中伊双边签证咨询与服务中心' : lang === 'ckb' ? 'ناوەندی ڕاوێژکاری ڤیزای دوولایەنە' : 'Bilateral Visa Advisory Centre'}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {lang === 'ar'
                  ? 'خدمة استشارية وتيسيرية معتمدة تقدم إرشادات موثقة ومتوافقة لمعاملات التأشيرات بين العراق والصين في كلا الاتجاهين.'
                  : lang === 'zh'
                  ? '独立权威咨询机构，为中国公民赴伊及伊拉克各界赴华提供标准化的商务、工签、留学及团队签证合规全流程指引。'
                  : lang === 'ckb'
                  ? 'خزمەتگوزارییەکی سەربەخۆی باوەڕپێکراو بۆ ڕاوێژکاری تەواوی ڤیزای بازرگانی و گەشتیاری نێوان عێراق و چین.'
                  : 'Independent advisory providing compliant, documented guidance and document verification for Iraq–China visa applicants.'}
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                <span>Business Visa</span>
                <span aria-hidden="true">·</span>
                <span>Work Permit</span>
                <span aria-hidden="true">·</span>
                <span>Document Check</span>
                <span aria-hidden="true">·</span>
                <span>Delegations</span>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800">
              <Link 
                to={`/${lang}/institute/visa-centre`} 
                className="w-full flex items-center justify-between px-4 py-3 bg-[var(--color-ink-900)] hover:bg-[#1E293B] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all group"
              >
                <span>{lang === 'ar' ? 'دخول مركز التأشيرات' : lang === 'zh' ? '进入签证中心' : lang === 'ckb' ? 'ناوەندی ڤیزا' : 'Enter Visa Centre'}</span>
                <ArrowRight size={14} className={cn("transition-transform group-hover:translate-x-1", isRtl && "rotate-180 group-hover:-translate-x-1")} />
              </Link>
            </div>
          </div>

          {/* Service 5: Chinese Language Centre */}
          <div className="p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-rose-500/30 hover:border-rose-500 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">
                  {lang === 'ar' ? 'تعليم اللغة الصينية · السليمانية' : lang === 'zh' ? '语言教学与考点' : lang === 'ckb' ? 'فێرکاری زمانی چینی' : 'Chinese Language Tutoring · Sulaymaniyah'}
                </span>
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <GraduationCap size={18} />
                </div>
              </div>
              <h3 className="text-lg font-black text-[var(--color-ink-900)] dark:text-white uppercase leading-snug">
                {lang === 'ar' ? 'المركز الصيني لتعليم اللغة والشهادات' : lang === 'zh' ? '中国中心汉语言教学与认证' : lang === 'ckb' ? 'ناوەندی زمانی چینی و بڕوانامەکان' : 'Chinese Centre (Language & Training)'}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {lang === 'ar'
                  ? 'أول مركز لتعليم اللغة الصينية متوافق دولياً في السليمانية، يقدم مناهج HSK القياسية واختبارات معتمدة وكادر تدريسي أصيل.'
                  : lang === 'zh'
                  ? '苏莱曼尼亚首个对接国际标准的专业中文教学机构，提供标准 HSK 1–9 级考级培训、商务汉语及中外语言交流合作认证。'
                  : lang === 'ckb'
                  ? 'یەکەمین ناوەندی ستانداردی زمانی چینی لە سلێمانی بە پرۆگرامی HSK و مامۆستایانی خاوەن بڕوانامەی باوەڕپێکراو.'
                  : 'The first internationally aligned Chinese language training centre in Sulaymaniyah, delivering standard HSK 1–9 curricula.'}
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                <span>HSK 1–6</span>
                <span aria-hidden="true">·</span>
                <span>HSK 7–9</span>
                <span aria-hidden="true">·</span>
                <span>HSKK Oral</span>
                <span aria-hidden="true">·</span>
                <span>Business Chinese</span>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800">
              <Link 
                to={`/${lang}/institute/chinese-center`} 
                className="w-full flex items-center justify-between px-4 py-3 bg-[var(--color-ink-900)] hover:bg-[#1E293B] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all group"
              >
                <span>{lang === 'ar' ? 'استكشاف المركز الصيني' : lang === 'zh' ? '进入语言教学中心' : lang === 'ckb' ? 'ناوەندی زمانی چینی' : 'Explore Chinese Centre'}</span>
                <ArrowRight size={14} className={cn("transition-transform group-hover:translate-x-1", isRtl && "rotate-180 group-hover:-translate-x-1")} />
              </Link>
            </div>
          </div>

          {/* Service 6: Strategic Consultancy */}
          <div className="p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-purple-500/30 hover:border-purple-500 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">
                  {lang === 'ar' ? 'الاستشارات العابرة للحدود' : lang === 'zh' ? '跨境投资战略顾问' : lang === 'ckb' ? 'ڕاوێژکاری سنووربەزێن' : 'Cross-Border Advisory'}
                </span>
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Scale size={18} />
                </div>
              </div>
              <h3 className="text-lg font-black text-[var(--color-ink-900)] dark:text-white uppercase leading-snug">
                {lang === 'ar' ? 'الاستشارات المالية والقانونية الاستراتيجية' : lang === 'zh' ? '战略财税与跨境法律合规咨询' : lang === 'ckb' ? 'ڕاوێژکاری دارایی و یاسایی ستراتیژی' : 'Strategic Financial & Legal Consultancy'}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {lang === 'ar'
                  ? 'استشارات متخصصة للشركات الصينية الداخلة للعراق، ولرجال الأعمال العراقيين المتوسعين في الصين، والتوافق مع قوانين الاستثمار.'
                  : lang === 'zh'
                  ? '为中国企业入伊投资落地及伊拉克资本赴华展业提供法务架构设计、税收筹划、投资委准入审批及合规尽职调查。'
                  : lang === 'ckb'
                  ? 'ڕاوێژکاری پسپۆڕانە بۆ کۆمپانیا چینییەکان لە عێراق و وەبەرهێنەرانی عێراقی لە چین، بەپێی یاساکانی وەبەرهێنان.'
                  : 'Bilateral advisory for inbound and outbound enterprises, FDI structuring, joint venture compliance, and sovereign regulatory alignment.'}
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                <span>FDI Advisory</span>
                <span aria-hidden="true">·</span>
                <span>Tax Structuring</span>
                <span aria-hidden="true">·</span>
                <span>KBOI & NIC</span>
                <span aria-hidden="true">·</span>
                <span>MOFCOM Aligned</span>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800">
              <Link 
                to={`/${lang}/institute/consultancy`} 
                className="w-full flex items-center justify-between px-4 py-3 bg-[var(--color-ink-900)] hover:bg-[#1E293B] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all group"
              >
                <span>{lang === 'ar' ? 'طلب استشارة استراتيجية' : lang === 'zh' ? '进入咨询服务专区' : lang === 'ckb' ? 'داواکاری ڕاوێژکاری' : 'Request Consultation'}</span>
                <ArrowRight size={14} className={cn("transition-transform group-hover:translate-x-1", isRtl && "rotate-180 group-hover:-translate-x-1")} />
              </Link>
            </div>
          </div>

          {/* Service 7: Cultural & Educational Exchange */}
          <div className="p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-indigo-500/30 hover:border-indigo-500 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                  {lang === 'ar' ? 'التبادل الثقافي والأكاديمي' : lang === 'zh' ? '中伊人文与高校交流' : lang === 'ckb' ? 'ئاڵوگۆڕی کەلتووری و ئەکادیمی' : 'People-to-People Exchange'}
                </span>
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Globe size={18} />
                </div>
              </div>
              <h3 className="text-lg font-black text-[var(--color-ink-900)] dark:text-white uppercase leading-snug">
                {lang === 'ar' ? 'التبادل الثقافي والتعليمي العراقي الصيني' : lang === 'zh' ? '中伊人文教育交流与大学联盟' : lang === 'ckb' ? 'ئاڵوگۆڕی کەلتووری و پەروەردەیی عێراق و چین' : 'Sino-Iraqi Cultural & Educational Exchange'}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {lang === 'ar'
                  ? 'مذكرات تفاهم جامعية ثنائية، زمالات معايشة طلابية، إقامات فنية، وحوارات حضارية تربط العراق والصين.'
                  : lang === 'zh'
                  ? '涵盖两国高校双边合作备忘录、青年学者沉浸式研学、艺术家联合驻留与文明互鉴高端对话。'
                  : lang === 'ckb'
                  ? 'ڕێککەوتننامەی زانکۆیی، زەمالەی خوێندکاران، ئیقامەی هونەری و دیالۆگی شارستانی لە نێوان عێراق و چین.'
                  : 'Bilateral university MOUs, student immersion fellowships, arts residencies, and civilizational dialogues connecting Iraq and China.'}
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                <span>University MOUs</span>
                <span aria-hidden="true">·</span>
                <span>STEM Immersion</span>
                <span aria-hidden="true">·</span>
                <span>Arts Residencies</span>
                <span aria-hidden="true">·</span>
                <span>Civilizational Dialogue</span>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800">
              <Link 
                to={`/${lang}/institute/services/cultural-exchange`} 
                className="w-full flex items-center justify-between px-4 py-3 bg-[var(--color-ink-900)] hover:bg-[#1E293B] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all group"
              >
                <span>{lang === 'ar' ? 'استكشاف برامج التبادل' : lang === 'zh' ? '进入人文交流专区' : lang === 'ckb' ? 'گەڕان لە پرۆگرامەکان' : 'Explore Exchange Programs'}</span>
                <ArrowRight size={14} className={cn("transition-transform group-hover:translate-x-1", isRtl && "rotate-180 group-hover:-translate-x-1")} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Research Pillar Cards Section */}
      <section className="space-y-8 scroll-mt-32 min-w-0" id="research-pillars">
        <div className="section-header border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <div className="section-header__text space-y-1.5">
            <h2 className="section-heading uppercase tracking-tight">
              {tLocal.researchPillars}
            </h2>
            <p className="section-eyebrow">
              {tLocal.primaryStrategicDomains}
            </p>
          </div>
          <div className="section-header__action">
            <Link 
              to={`/${lang}/institute/research`} 
              className="research-pillar-card__cta"
            >
              <span>{tLocal.exploreAllPillars}</span>
              <span className="cta-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Natural Grid Layout with auto-fit responsive columns */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 min-w-0">
          {/* Pillar 1: Energy & BRI */}
          <Link 
            to={`/${lang}/institute/research/energy`}
            className="research-pillar-card group"
          >
            <div className="flex items-center justify-between">
              <div className="research-pillar-card__icon">
                <Database size={24} />
              </div>
              <div className="research-pillar-card__metric">
                <span>{tLocal.pillars[0].metricLabel}</span>
                <span className="research-pillar-card__metric-value">{tLocal.pillars[0].metricValue}</span>
              </div>
            </div>

            <h3 className="research-pillar-card__title group-hover:text-[var(--color-brand-800)] dark:group-hover:text-[#38BDF8] transition-colors">
              {tLocal.pillars[0].title}
            </h3>
            <p className="research-pillar-card__description">
              {tLocal.pillars[0].description}
            </p>

            <div className="research-pillar-card__sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={oilData}>
                  <defs>
                    <linearGradient id="colorOil" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-brand-800)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-brand-800)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="var(--color-brand-800)" strokeWidth={2} fillOpacity={1} fill="url(#colorOil)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="research-pillar-card__footer">
              <span className="research-pillar-card__cta group-hover:text-[var(--color-brand-800)] dark:group-hover:text-[#38BDF8]">
                <span>{tLocal.viewPillar}</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </span>
            </div>
          </Link>

          {/* Pillar 2: Geo-Economics */}
          <Link 
            to={`/${lang}/institute/research/geo-economics`}
            className="research-pillar-card group"
          >
            <div className="flex items-center justify-between">
              <div className="research-pillar-card__icon" style={{ color: 'var(--color-brand-800)' }}>
                <TrendingUp size={24} />
              </div>
              <div className="research-pillar-card__metric">
                <span>{tLocal.pillars[1].metricLabel}</span>
                <span className="research-pillar-card__metric-value">{tLocal.pillars[1].metricValue}</span>
              </div>
            </div>

            <h3 className="research-pillar-card__title group-hover:text-[var(--color-brand-800)] transition-colors">
              {tLocal.pillars[1].title}
            </h3>
            <p className="research-pillar-card__description">
              {tLocal.pillars[1].description}
            </p>

            <div className="research-pillar-card__sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tradeData}>
                  <Bar dataKey="value" fill="var(--color-brand-800)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="research-pillar-card__footer">
              <span className="research-pillar-card__cta group-hover:text-[var(--color-brand-800)]">
                <span>{tLocal.viewPillar}</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </span>
            </div>
          </Link>

          {/* Pillar 3: Diplomacy */}
          <Link 
            to={`/${lang}/institute/research/diplomacy`}
            className="research-pillar-card group"
          >
            <div className="flex items-center justify-between">
              <div className="research-pillar-card__icon" style={{ color: '#38BDF8' }}>
                <Handshake size={24} />
              </div>
              <div className="research-pillar-card__metric">
                <span>{tLocal.pillars[2].metricLabel}</span>
                <span className="research-pillar-card__metric-value">{tLocal.pillars[2].metricValue}</span>
              </div>
            </div>

            <h3 className="research-pillar-card__title group-hover:text-[var(--color-brand-800)] dark:group-hover:text-[#38BDF8] transition-colors">
              {tLocal.pillars[2].title}
            </h3>
            <p className="research-pillar-card__description">
              {tLocal.pillars[2].description}
            </p>

            <div className="research-pillar-card__sparkline flex flex-col justify-center space-y-2">
              <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300 truncate">Next Summit: Nov 2026</span>
              </div>
              <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--color-brand-800)] shrink-0" />
                <span className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300 truncate">Baghdad-Beijing Dialogue</span>
              </div>
            </div>

            <div className="research-pillar-card__footer">
              <span className="research-pillar-card__cta group-hover:text-[var(--color-brand-800)] dark:group-hover:text-[#38BDF8]">
                <span>{tLocal.viewPillar}</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </span>
            </div>
          </Link>

          {/* Pillar 4: Digital Silk Road */}
          <Link 
            to={`/${lang}/institute/research/digital-silk-road`}
            className="research-pillar-card group"
          >
            <div className="flex items-center justify-between">
              <div className="research-pillar-card__icon" style={{ color: '#10B981' }}>
                <Globe size={24} />
              </div>
              <div className="research-pillar-card__metric">
                <span>{tLocal.pillars[3].metricLabel}</span>
                <span className="research-pillar-card__metric-value">{tLocal.pillars[3].metricValue}</span>
              </div>
            </div>

            <h3 className="research-pillar-card__title group-hover:text-emerald-500 transition-colors">
              {tLocal.pillars[3].title}
            </h3>
            <p className="research-pillar-card__description">
              {tLocal.pillars[3].description}
            </p>

            <div className="research-pillar-card__sparkline flex items-center justify-center">
              <div className="relative w-14 h-14">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="8" className="dark:stroke-neutral-800" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#059669" strokeWidth="8" strokeDasharray="190 264" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">74%</span>
                </div>
              </div>
            </div>

            <div className="research-pillar-card__footer">
              <span className="research-pillar-card__cta group-hover:text-emerald-500">
                <span>{tLocal.viewPillar}</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Latest Publications Grid Preview */}
      <section className="space-y-8 scroll-mt-32 min-w-0" id="latest-publications">
        <div className="section-header border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <div className="section-header__text space-y-1.5">
            <h2 className="section-heading uppercase tracking-tight">
              {tLocal.latestPublications}
            </h2>
            <p className="section-eyebrow">
              {tLocal.archiveOfRecord}
            </p>
          </div>
          <div className="section-header__action">
            <Link 
              to={`/${lang}/institute/publications`} 
              className="research-pillar-card__cta"
            >
              <span>{tLocal.accessFullArchive}</span>
              <span className="cta-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 sm:gap-8 min-w-0">
          {tLocal.publications.map((pub, i) => (
            <Link key={i} to={`/${lang}/institute/publications/${pub.id}`} className="group cursor-pointer flex flex-col justify-between min-w-0">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-ink-900)] to-[#1E293B] mb-4 shadow-md group-hover:shadow-xl transition-all border border-neutral-200 dark:border-neutral-800">
                <img 
                  src={pub.img} 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  alt={pub.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink-900)] via-[var(--color-ink-900)]/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
                
                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-10">
                  <div className="bg-[var(--color-brand-800)] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-lg">
                    {pub.type}
                  </div>
                </div>
                
                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <div className="flex items-center gap-1.5 text-[var(--color-brand-800)] mb-1.5">
                    <ShieldCheck size={12} />
                    <span className="text-[9px] font-black uppercase tracking-widest">{tLocal.verifiedData}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white uppercase leading-tight line-clamp-3 group-hover:text-amber-300 transition-colors">
                    {pub.title}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 px-1">
                <span>{pub.authors}</span>
                <span>{pub.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Partnership & Media Callout */}
      <section className="bg-[var(--color-ink-900)] rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-2xl border border-white/10 min-w-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-brand-800)]/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center min-w-0">
          <div className="lg:col-span-7 space-y-5 min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-[var(--color-brand-800)]">
              <Handshake size={14} />
              <span>{tLocal.collaborationEyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight uppercase font-serif">
              {tLocal.collaborationTitle}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-xl">
              {tLocal.collaborationDescription}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link 
                to={`/${lang}/institute/partnerships`} 
                className="btn-primary justify-center !bg-white hover:!bg-neutral-100 !text-neutral-950 !border-white shadow-lg shadow-white/10 hover:shadow-white/20 transition-all font-black group"
              >
                <span className="text-neutral-950 font-black">{tLocal.partnerCta}</span>
                <span className="cta-arrow text-neutral-950 font-black group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" aria-hidden="true">→</span>
              </Link>
              <Link 
                to={`/${lang}/institute/experts`} 
                className="btn-outline justify-center !bg-white/5 hover:!bg-white/10 !text-white !border-white/20"
              >
                <span>{tLocal.bookFellowCta}</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4 min-w-0">
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-1.5 min-w-0">
              <span className="text-2xl sm:text-3xl font-black text-white">40+</span>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{tLocal.stats.projects}</p>
            </div>
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-1.5 min-w-0">
              <span className="text-2xl sm:text-3xl font-black text-white">12</span>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{tLocal.stats.fellows}</p>
            </div>
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-1.5 min-w-0">
              <span className="text-2xl sm:text-3xl font-black text-white">1.2M</span>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{tLocal.stats.dataPoints}</p>
            </div>
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-1.5 min-w-0">
              <span className="text-2xl sm:text-3xl font-black text-white">4</span>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{tLocal.stats.languages}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
