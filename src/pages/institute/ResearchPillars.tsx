import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { 
  BookOpen, 
  Database, 
  TrendingUp, 
  Handshake, 
  Globe, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export function ResearchPillars() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();

  const pillars = [
    {
      id: 'energy-bri',
      title: lang === 'ar' ? 'الطاقة ومبادرة الحزام والطريق' : lang === 'zh' ? '能源与“一带一路”' : lang === 'ckb' ? 'وزە و ڕێگەی ئاوریشم' : 'Energy & Belt and Road',
      icon: Database,
      description: lang === 'ar' ? 'تحليل التعاون الاستراتيجي بين الصين والعراق في قطاع الطاقة، مع التركيز على اتفاقية "النفط مقابل المشاريع" وتطوير البنية التحتية لميناء الفاو الكبير.' : lang === 'zh' ? '分析中伊在能源领域的战略合作，重点关注“油换项目”协议及大福港基础设施建设。' : lang === 'ckb' ? 'شیکاری هاوکاری ستراتیژی نێوان چین و عێراق لە کەرتی وزەدا.' : 'Analyzing the multi-decadal energy cooperation between the PRC and Iraq, with a focus on the 2019 "Oil-for-Projects" agreement.',
      metricLabel: lang === 'ar' ? 'نمو المشاريع' : lang === 'zh' ? '项目增长' : lang === 'ckb' ? 'گەشەی پڕۆژەکان' : 'Project Growth',
      metricValue: '+14%',
      topics: ['Crude Export Security', 'EPC Infrastructure Contracts', 'Refinery Technology Transfer', 'Logistics Node Efficiency']
    },
    {
      id: 'geo-economics',
      title: lang === 'ar' ? 'الجيواقتصاد والتسوية المالية' : lang === 'zh' ? '地缘经济与金融结算' : lang === 'ckb' ? 'جیۆ-ئابووری و یەکلاییکردنەوەی دارایی' : 'Geo-Economics & Settlement',
      icon: TrendingUp,
      description: lang === 'ar' ? 'مركز الأبحاث المتخصص في تدويل الرنمينبي (CNY) داخل النظام المالي العراقي، والتأثيرات الكلية لتسوية التجارة المباشرة بالدينار واليوان.' : lang === 'zh' ? '专注于人民币国际化及伊拉克金融体系内直接本币结算的宏观影响研究中心。' : lang === 'ckb' ? 'ناوەندی توێژینەوەی تایبەت بۆ بەکارهێنانی یوان لە سیستمی دارایی عێراق.' : 'The definitive center for research on the internationalization of the Renminbi (CNY) within the Iraqi financial system.',
      metricLabel: lang === 'ar' ? 'التسوية المباشرة' : lang === 'zh' ? '直接结算' : lang === 'ckb' ? 'یەکلاییکردنەوەی راستەوخۆ' : 'Direct Settlement',
      metricValue: '22%',
      topics: ['Currency Internationalization', 'Bilateral Trade Balance', 'Banking Interconnectivity', 'Digital Currency (e-CNY)']
    },
    {
      id: 'diplomacy',
      title: lang === 'ar' ? 'الدبلوماسية الثنائية' : lang === 'zh' ? '双边外交' : lang === 'ckb' ? 'دبلوماسییەتی دوولایەنە' : 'Bilateral Diplomacy',
      icon: Handshake,
      description: lang === 'ar' ? 'تتبع اللقاءات الدبلوماسية رفيعة المستوى، والقمم السيادية، والأطر القانونية المتطورة التي تحكم العلاقات العراقية الصينية.' : lang === 'zh' ? '追踪高层外交接触、主权峰会及规范中伊关系的演进法律框架。' : lang === 'ckb' ? 'چاودێریکردنی پەیوەندییە دیپلۆماسییە ئاست بەرزەکان.' : 'Tracking high-level diplomatic engagements, sovereign summits, and the evolving legal frameworks governing Iraq-China relations.',
      metricLabel: lang === 'ar' ? 'اتفاقيات إطارية' : lang === 'zh' ? '框架协议' : lang === 'ckb' ? 'ڕێککەوتنەکان' : 'Framework Agmt.',
      metricValue: '8',
      topics: ['Sovereign Summitry', 'Legal Frameworks', 'Regional Security Architecture', 'Cultural & Academic Exchange']
    },
    {
      id: 'digital-silk-road',
      title: lang === 'ar' ? 'طريق الحرير الرقمي' : lang === 'zh' ? '数字丝绸之路' : lang === 'ckb' ? 'رێگەی ئاوریشمی دیجیتاڵی' : 'Digital Silk Road',
      icon: Globe,
      description: lang === 'ar' ? 'التركيز على تصدير البنية التحتية الرقمية الصينية، ونشر شبكات الجيل الخامس، وهندسة المدن الذكية.' : lang === 'zh' ? '聚焦中国数字基础设施出口、5G部署及智慧城市架构。' : lang === 'ckb' ? 'تەرکیز لەسەر هەناردەکردنی ژێرخانی دیجیتاڵی چینی.' : 'Focusing on the export of Chinese digital infrastructure, 5G deployment, smart city architecture, and cybersecurity standards.',
      metricLabel: lang === 'ar' ? 'تغطية الشبكة' : lang === 'zh' ? '网络覆盖' : lang === 'ckb' ? 'داپۆشینی تۆڕ' : 'Network Coverage',
      metricValue: '65%',
      topics: ['5G & Infrastructure', 'E-Government Platforms', 'Data Sovereignty', 'AI & Surveillance Ethics']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      <div className="section-header flex flex-wrap gap-4 items-end justify-between border-b border-neutral-200 pb-4">
        <div className="section-header__text min-w-0 flex-1">
          <div className="section-eyebrow">Institutional Domains</div>
          <h1 className="section-heading">Primary Research Pillars</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pillars.map((pillar) => (
          <div key={pillar.id} className="research-pillar-card">
            <div className="flex items-center justify-between">
              <div className="research-pillar-card__icon" style={{ backgroundColor: pillar.icon === Database ? '#0284C7' : pillar.icon === TrendingUp ? '#D97706' : pillar.icon === Handshake ? '#0F172A' : '#047857' }}>
                <pillar.icon size={24} />
              </div>
              <div className="research-pillar-card__metric">
                {pillar.metricLabel}
                <span className="research-pillar-card__metric-value">{pillar.metricValue}</span>
              </div>
            </div>

            <h3 className="research-pillar-card__title">{pillar.title}</h3>
            <p className="research-pillar-card__description">{pillar.description}</p>

            <div className="research-pillar-card__footer">
              <Link to={`/${lang}/institute/publications?topic=${pillar.id}`} className="research-pillar-card__cta">
                View Publications
                <span className="cta-arrow" aria-hidden="true">→</span>
              </Link>
              <Link to={`/${lang}/institute/experts`} className="btn-outline">
                Talk to Expert
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
