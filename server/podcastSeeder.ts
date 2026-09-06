import { prisma } from "./db.js";

const PODCAST_DATA = [
  {
    slug: "geopolitics-silk-road-iraq",
    titleEn: "The New Silk Road: Iraq's Strategic Role",
    titleAr: "طريق الحرير الجديد: الدور الاستراتيجي للعراق",
    titleZh: "新丝绸之路：伊拉克的战略作用",
    titleCkb: "ڕێگای ئاوریشمی نوێ: ڕۆڵی ستراتیژی عێراق",
    descriptionEn: "An in-depth discussion on how Iraq is positioning itself within the broader Belt and Road Initiative framework.",
    descriptionAr: "نقاش معمق حول كيفية تموضع العراق ضمن إطار مبادرة الحزام والطريق الأوسع.",
    descriptionZh: "深入探讨伊拉克如何在更广泛的一带一路倡议框架内定位自己。",
    descriptionCkb: "گفتوگۆیەکی قووڵ لەسەر چۆنیەتی پێگەی عێراق لە چوارچێوەی دەستپێشخەری پشتێنە و ڕێگا.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    coverUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=1000",
    host: "Iraq-China Daily Geopolitics Desk",
    guestName: "Dr. Ali Al-Shammari",
    guestRole: "Senior Researcher, Middle East Institute",
    category: "GEOPOLITICS",
    region: "BILATERAL",
    duration: "45:30",
    isFeatured: true,
    isTrending: true,
  },
  {
    slug: "kurdistan-china-economic-ties",
    titleEn: "Kurdistan Region & China: Growing Economic Ties",
    titleAr: "إقليم كردستان والصين: تنامي العلاقات الاقتصادية",
    titleZh: "库尔德斯坦地区与中国：不断增长的经济联系",
    titleCkb: "هەرێمی کوردستان و چین: گەشەسەندنی پەیوەندییە ئابوورییەکان",
    descriptionEn: "Exploring the recent surge in Chinese investments in the Kurdistan Region's infrastructure and energy sectors.",
    descriptionAr: "استكشاف الزيادة الأخيرة في الاستثمارات الصينية في قطاعات البنية التحتية والطاقة في إقليم كردستان.",
    descriptionZh: "探讨近期中国在库尔德斯坦地区基础设施和能源领域投资的激增。",
    descriptionCkb: "لێکۆڵینەوە لە بەرزبوونەوەی ئەم دواییەی وەبەرهێنانەکانی چین لە ژێرخان و کەرتی وزەی هەرێمی کوردستان.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    coverUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000",
    host: "Iraq-China Daily Economy Desk",
    guestName: "Minister of Trade, KRG",
    guestRole: "Government Official",
    category: "ECONOMY",
    region: "KURDISTAN",
    duration: "32:15",
    isFeatured: true,
    isTrending: false,
  },
  {
    slug: "cultural-exchange-students",
    titleEn: "Bridging Cultures: Iraqi Students in China",
    titleAr: "جسر الثقافات: الطلاب العراقيون في الصين",
    titleZh: "跨越文化：在中国的伊拉克留学生",
    titleCkb: "پردی کولتوورەکان: خوێندکارانی عێراقی لە چین",
    descriptionEn: "A heartfelt conversation with Iraqi and Kurdish students studying in major Chinese universities about their experiences and achievements.",
    descriptionAr: "محادثة نابعة من القلب مع طلاب عراقيين وكرد يدرسون في جامعات صينية كبرى حول تجاربهم وإنجازاتهم.",
    descriptionZh: "与在中国主要大学就读的伊拉克和库尔德斯坦学生就他们的经历和成就进行真诚的对话。",
    descriptionCkb: "گفتوگۆیەکی دڵسۆزانە لەگەڵ خوێندکارانی عێراقی و کورد کە لە زانکۆ گەورەکانی چین دەخوێنن دەربارەی ئەزموون و دەستکەوتەکانیان.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    coverUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000",
    host: "Iraq-China Daily Culture Desk",
    guestName: "Zhiwan Ahmed",
    guestRole: "PhD Candidate, Tsinghua University",
    category: "CULTURE",
    region: "BILATERAL",
    duration: "28:45",
    isFeatured: false,
    isTrending: true,
  }
];

export async function seedPodcasts() {
  try {
    const count = await prisma.podcast.count();
    if (count > 0) {
      console.log("🎙️ [Podcast Seeder] Podcasts already exist. Skipping.");
      return;
    }
    console.log("🎙️ [Podcast Seeder] Seeding initial podcasts...");

    for (const data of PODCAST_DATA) {
      await prisma.podcast.create({ data });
    }

    console.log("✅ [Podcast Seeder] Podcasts seeded successfully.");
  } catch (error) {
    console.error("❌ [Podcast Seeder] Error seeding podcasts:", error);
  }
}
