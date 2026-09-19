import { prisma } from "./db.js";

export const SEEDED_PARTNERS = [
  {
    id: "p-asiacell",
    name: "Asiacell",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Asiacell_logo.svg",
    websiteUrl: "https://www.asiacell.com",
    descriptionEn: "Asiacell is a leading provider of quality mobile telecommunications and data services in Iraq, pioneering 4G/5G digital infrastructure across all eighteen governorates.",
    descriptionAr: "آسيا سيل هي المزود الرائد لخدمات الاتصالات المتنقلة والبيانات الرقمية عالية الجودة في العراق، والرائدة في البنية التحتية لشبكات الجيلين الرابع والخامس.",
    descriptionZh: "Asiacell 是伊拉克领先的综合移动通信和高速数字数据服务提供商，在伊拉克全部十八省开创性铺设4G/5G关键骨干通信网络。",
    descriptionCkb: "ئاسیاسێڵ پێشەنگە لە دابینکردنی خزمەتگوزارییەکانی پەیوەندی مۆبایل و داتای دیجیتاڵی لە عێراق و تۆڕی مۆدێرنی نیشتمانی.",
    isActive: true,
    order: 1
  },
  {
    id: "p-petrochina",
    name: "PetroChina Iraq",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/PetroChina_logo.svg/1200px-PetroChina_logo.svg.png",
    websiteUrl: "http://www.petrochina.com.cn",
    descriptionEn: "Major energy infrastructure developer participating in Halfaya and Rumaila energy projects, pioneering associated gas capture and technological engineering transfer.",
    descriptionAr: "مطور رئيسي للبنية التحتية للطاقة يشارك في مشاريع حقل الحلفاية والرميلة الاستراتيجية، ورائد في استثمار الغاز المصاحب ونقل التكنولوجيا الهندسية.",
    descriptionZh: "深度参与伊拉克哈法亚与鲁迈拉等超大型国家级能源建设项目的旗舰央企，致力于油田伴生气深度回收与尖端工程技术转移。",
    descriptionCkb: "گەورە پەرەپێدەری ژێرخانی وزە لە پرۆژەکانی نەوتی حەلفایە و ڕومێلە، پێشەنگ لە بەکارهێنانەوەی گازی هاوپێچ و گواستنەوەی تەکنەلۆجیا.",
    isActive: true,
    order: 2
  },
  {
    id: "p-cosco",
    name: "COSCO Shipping",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/COSCO_Shipping_logo.svg/1280px-COSCO_Shipping_logo.svg.png",
    websiteUrl: "https://lines.coscoshipping.com",
    descriptionEn: "Global container shipping giant securing bilateral maritime logistics, direct container lanes, and cold-chain corridors between Chinese industrial ports and Umm Qasr.",
    descriptionAr: "عملاق الشحن البحري العالمي لتأمين الخدمات اللوجستية البحرية المباشرة، وخطوط الحاويات وسلاسل التبريد بين الموانئ الصناعية الصينية وميناء أم قصر.",
    descriptionZh: "全球航运集装箱物流巨擘，全面打通并稳定运营连接中国主要工业港口与伊拉克乌姆盖斯尔港的直航海运与冷链干线走廊。",
    descriptionCkb: "کۆمپانیای گەورەی جیهانی بۆ گواستنەوەی دەریایی بۆ مسۆگەرکردنی هێڵە دەریاییەکان و کاروانە بازرگانییەکان بۆ بەندەری ئوم قەسر.",
    isActive: true,
    order: 3
  },
  {
    id: "p-icbc",
    name: "Industrial and Commercial Bank of China (ICBC)",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Industrial_and_Commercial_Bank_of_China_logo.svg/1280px-Industrial_and_Commercial_Bank_of_China_logo.svg.png",
    websiteUrl: "http://www.icbc.com.cn",
    descriptionEn: "World's largest banking group providing cross-border bilateral trade settlement, sovereign liquidity channels, and digital currency clearing between China and Iraq.",
    descriptionAr: "أكبر مجموعة مصرفية في العالم تقدم خدمات تسوية التجارة الثنائية عبر الحدود، وقنوات السيولة السيادية، ومقاصة العملات الرقمية واليوان بين الصين والعراق.",
    descriptionZh: "全球一级资产规模最大的商业银行机构，为中伊双边经贸通道提供跨境主权本币结算、外汇流动性支持与多层次数字货币清算服务。",
    descriptionCkb: "گەورەترین گرووپی بانکی لە جیهاندا بۆ دابینکردنی خزمەتگوزارییەکانی یەکلاکردنەوەی بازرگانی دوولایەنە، کەناڵی دراو و پاکتاوی دارایی نێوان چین و عێراق.",
    isActive: true,
    order: 4
  },
  {
    id: "p-cscec",
    name: "China State Construction Engineering Corp (CSCEC)",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/China_State_Construction_Engineering_Corporation_logo.svg/1280px-China_State_Construction_Engineering_Corporation_logo.svg.png",
    websiteUrl: "http://www.cscec.com",
    descriptionEn: "Premier global infrastructure contractor delivering turnkey deepwater civil facilities, nationwide transportation corridors, and sovereign industrial parks across Iraq.",
    descriptionAr: "المقاول العالمي الرائد في تطوير مشاريع البنية التحتية الكبرى، والمجمعات الصناعية والمدنية وممرات النقل السريع الاستراتيجية في عموم العراق.",
    descriptionZh: "全球顶级综合建设投资集团，在伊拉克全境承担深水港区配套设施、国家级跨省交通走廊及现代化主权工业园区的总承包建设。",
    descriptionCkb: "گەورەترین کۆمپانیای ئەندازیاری و بیناسازی جیهانی بۆ جێبەجێکردنی پرۆژە گرنگەکانی ژێرخان، شارۆچکە پیشەسازییەکان و ڕێگاوبان لە عێراق.",
    isActive: true,
    order: 5
  }
];

export async function seedPartners() {
  try {
    const count = await prisma.partner.count();
    if (count >= 5) {
      return;
    }

    console.log("🤝 Seeding Strategic Partners (all 5 institutions)...");
    for (const partner of SEEDED_PARTNERS) {
      await prisma.partner.upsert({
        where: { id: partner.id },
        update: partner,
        create: partner,
      });
    }
    console.log("✅ Strategic Partners successfully seeded.");
  } catch (error) {
    console.error("⚠️ Error seeding partners:", error);
  }
}
