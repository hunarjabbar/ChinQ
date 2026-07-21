import { prisma } from "./db.js";

export async function seedWomenFeatures() {
  try {
    const count = await prisma.womenFeature.count();
    if (count > 0) {
      console.log(`[WomenSeeder] Found ${count} women features in database.`);
      return;
    }

    console.log("[WomenSeeder] Seeding women figures, policies, achievements, and publications for China, Iraq, and Kurdistan...");

    const features = [
      {
        slug: "tu-youyou-nobel-laureate",
        nameEn: "Tu Youyou (屠呦呦)",
        nameAr: "تو يويو",
        nameZh: "屠呦呦",
        nameCkb: "تۆ یویو",
        titleEn: "Nobel Laureate in Medicine & Pioneer Pharmaceutical Chemist",
        titleAr: "حائزة على جائزة نوبل في الطب وكيميائية صيدلانية رائدة",
        titleZh: "诺贝尔生理学或医学奖得主、中国中医科学院终身研究员",
        titleCkb: "وەربگری خەڵاتی نۆبڵ لە پزیشکی و زانای کیمیای دەرمانسازی",
        region: "CHINA",
        category: "PROMINENT_FIGURE",
        summaryEn: "Discovered Artemisinin, saving millions of lives globally from malaria. First Chinese Nobel laureate in medicine and a global symbol of scientific perseverance.",
        summaryAr: "اكتشفت المادة المضادة للملاريا (الأرتيميسينين)، مما أنقذ ملايين الأرواح عالمياً. أول امرأة صينية تفوز بجائزة نوبل في الطب وتعتبر رمزا للابتكار العلمي.",
        summaryZh: "发现青蒿素挽救全球数百万疟疾患者生命。中国首位诺贝尔医学奖得主，全球女性科技自立自强的光辉典范。",
        summaryCkb: "دۆزەرەوەی دەرمانی ئارتیمیسینین کە ملیۆنان کەسی لە نەخۆشی مەلاریا ڕزگار کرد. یەکەم ئافرەتی چینی وەربگری خەڵاتی نۆبڵ لە پزیشکیدا.",
        bioEn: "Tu Youyou's groundbreaking research in traditional Chinese medicine combined with modern pharmacology extracted artemisinin, revolutionizing global health treatment. Her work stands as an inspiring beacon for female scientists across China, the Middle East, and worldwide.",
        bioAr: "أدى البحث الابتكاري لـ تو يويو في الجمع بين الطب الصيني التقليدي وعلم الصيدلة الحديث إلى استخلاص الأرتيميسينين، مما أحدث ثورة في العلاج الصحي العالمي ووضع معياراً ملهماً للباحثات في جميع أنحاء العالم.",
        bioZh: "屠呦呦将中国传统中医药宝库与现代药学相结合，攻坚克难提取青蒿素，引发全球抗疟新药革命。她的科研足迹激励着中国、中东乃至全球无数女性科研工作者。",
        bioCkb: "توێژینەوە بێوێنەکانی تو یویو لە تێکەڵکردنی پزیشکی نەریتی چینی و دەرمانسازی نوێدا شۆڕشێکی لە چارەسەری تەندروستی جیهانیدا دروست کرد.",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000",
        organization: "China Academy of Chinese Medical Sciences",
        publicationUrl: "https://nobelprize.org",
        isFeatured: true,
        isTrending: true
      },
      {
        slug: "zaha-hadid-architectural-icon",
        nameEn: "Dame Zaha Hadid",
        nameAr: "زها حديد",
        nameZh: "扎哈·哈迪德",
        nameCkb: "زەها حەدید",
        titleEn: "Legendary Iraqi Architect & Pritzker Prize Winner",
        titleAr: "معمارية عراقية عالمية وحائزة على جائزة بريتزكر",
        titleZh: "伊拉克裔世界传奇建筑大师、普利兹克奖得主",
        titleCkb: "تەلارسازی ئەفسانەیی عێراقی و وەربگری خەڵاتی پریتزکەر",
        region: "IRAQ",
        category: "PROMINENT_FIGURE",
        summaryEn: "Revolutionized world architecture with neo-futuristic fluid designs. Born in Baghdad, she broke ceiling boundaries in male-dominated global architecture.",
        summaryAr: "حدثت ثورة في العمارة العالمية بتصاميمها المستقبلية الانسيابية. ولدت في بغداد، وكسرت الحواجز الزجاجية في مجالي العمارة والتصميم الدولي.",
        summaryZh: "以解构主义与流动曲线重塑全球现代建筑形态。出生于巴格达，打破传统行业壁垒，成为全球建筑界的传奇女性峰脊。",
        summaryCkb: "شۆڕشێکی لە تەلارسازی جیهانیدا دروستکرد بە نەخشەسازیە داهاتوویی و شلەکانی. لە بەغدا لەدایکبووە و سنوورەکانی بەرزکردەوە.",
        bioEn: "Dame Zaha Hadid designed world landmarks including the Guangzhou Opera House in China, the Heydar Aliyev Center, and Beijing Daxing International Airport. Her legacy connects Iraqi heritage, Chinese construction marvels, and global artistic leadership.",
        bioAr: "صممت زها حديد معالم عالمية بارزة بما في ذلك دار أوبرا جوانجتشو في الصين، ومطار بيكين داكسينغ الدولي. يربط إرثها بين التراث العراقي والمعجزات المعمارية الصينية والقيادة الفنية العالمية.",
        bioZh: "扎哈·哈迪德设计了广州大剧院、北京大兴国际机场等众多中国与全球标志性建筑。她的作品将伊拉克古老底蕴、中国现代工程力量与全球女性艺术创造力完美结合。",
        bioCkb: "زەها حەدید نەخشەی چەندین تەلاری گەورەی جیهانی کێشا لەوانە ئۆپێرای گوانگژۆ لە چین و فڕۆکەخانەی داكسینگ لە پەکین.",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1000",
        organization: "Zaha Hadid Architects / Iraqi Cultural Heritage Network",
        publicationUrl: "https://zaha-hadid.com",
        isFeatured: true,
        isTrending: true
      },
      {
        slug: "hero-ibrahim-ahmad-kurdistan-culture",
        nameEn: "Hero Ibrahim Ahmad",
        nameAr: "هيرو إبراهيم أحمد",
        nameZh: "希罗·易卜拉欣·阿赫迈德",
        nameCkb: "هێرۆ ئیبراهیم ئەحمەد",
        titleEn: "Cultural Pioneer, Women Rights Advocate & Media Founder",
        titleAr: "رائدة ثقافية ومدافعة عن حقوق المرأة ومؤسسة وسائل إعلامية",
        titleZh: "库尔德斯坦文化先驱、女性权益倡导者与媒体创始人",
        titleCkb: "پێشەنگی کەلتوری، پارێزەری مافی ئافرەتان و دامەزرێنەری میدیا",
        region: "KURDISTAN",
        category: "PROMINENT_FIGURE",
        summaryEn: "Prominent Kurdistan figurehead who spearheaded civil society organizations, child protection funds, and independent cultural broadcasting in Erbil and Sulaymaniyah.",
        summaryAr: "شخصية بارزة في كردستان قادت منظمات المجتمع المدني، وصناديق حماية الأطفال، والإعلام الثقافي المستقل في أربيل والسليمانية.",
        summaryZh: "库尔德斯坦知名代表人物，在埃尔比勒与苏莱曼尼亚长期倡导妇女与儿童权益，推动民营文化与公共传播事业发展。",
        summaryCkb: "کەسایەتییەکی دیاری کوردستان کە سەرکردایەتی ڕێکخراوەکانی کۆمەڵگەی مەدەنی و پاراستنی منداڵانی کردووە.",
        bioEn: "Hero Ibrahim Ahmad established early women's empowerment initiatives, civil heritage archives, and human rights publication networks in Kurdistan Region, bridging dialogue with international women delegations.",
        bioAr: "أسست مبادرات تمكين المرأة المبكرة، وأرشيفات التراث المدني، وشبكات نشر حقوق الإنسان في إقليم كردستان، مما مد جسور الحوار مع الوفود النسائية الدولية.",
        bioZh: "在库尔德斯坦地区创立早期妇女赋权项目、民间文化遗产档案以及人权出版网络，有效推动了与国际女性代表团的深化对话。",
        bioCkb: "پێشەنگایەتی کرد لە دامەزراندنی پڕۆژەکانی بەهێزکردنی ئافرەتان و بڵاوکراوەکانی مافی مرۆڤ لە هەرێمی کوردستان.",
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000",
        organization: "Kurdistan Civil Heritage Foundation",
        publicationUrl: null,
        isFeatured: true,
        isTrending: true
      },
      {
        slug: "sino-iraq-kurdistan-women-policy-declaration-2026",
        nameEn: "Sino-Iraqi-Kurdish Women Legal Rights & Economic Policy Declaration 2026",
        nameAr: "إعلان السياسات والحقوق القانونية للتمكين الاقتصادي للمرأة 2026",
        nameZh: "2026中国-伊拉克-库尔德斯坦女性法律权益与经济赋权共同政策宣言",
        nameCkb: "ڕاگەیەندراوی سیاسی و یاسایی بەهێزکردنی ئابووری ئافرەتان ٢٠٢٦",
        titleEn: "Bilateral Legislative & Economic Framework for Gender Parity",
        titleAr: "الإطار التشريعي والاقتصادي الثنائي للتكافؤ والتمكين",
        titleZh: "双边性别平等与女性参与数字经济联合立法框架",
        titleCkb: "چوارچێوەی یاسایی و ئابووری دووقۆڵی بۆ یەکسانی و ڕەخساندنی دەرفەت",
        region: "BILATERAL",
        category: "POLICY_RIGHTS",
        summaryEn: "A comprehensive policy agreement setting goals for female representation in executive boards, STEM education exchanges, and trade dispute legal protections across Beijing, Baghdad, and Erbil.",
        summaryAr: "اتفاقية سياسات شاملة تحدد أهداف التمثيل النسائي في المجالس التنفيذية، وتبادل التعليم التجريبي في العلوم والهندسة، والحماية القانونية للتجارة بين بيكين وبغداد وأربيل.",
        summaryZh: "一项跨越北京、巴格达与埃尔比勒的综合性政策协议，明确了女性在企业董事会比例、STEM教育留学生名额以及跨境贸易权益法律保障等领域的具体目标。",
        summaryCkb: "ڕێککەوتننامەیەکی سیاسی گشتگیر کە ئامانجەکان بۆ نوێنەرایەتی ئافرەتان لە دەستەی بەڕێوەبردن و پەروەردەی زانستیدا دیاری دەکات.",
        bioEn: "This policy framework focuses on three operational pillars: 1) Equal access to green investment capital for female entrepreneurs; 2) Bilateral legal aid network for female cross-border traders; 3) Academic exchange quotas for young women researchers in technology and diplomacy.",
        bioAr: "يركز هذا الإطار السياساتي على ثلاثة ركائز أساسية: 1) تكافؤ الفرص للحصول على رؤوس الأموال الخضراء لسيدات الأعمال؛ 2) شبكة المساعدة القانونية الثنائية للتجارة؛ 3) حصص التبادل الأكاديمي للباحثات الشابات في التكنولوجيا والدبلوماسية.",
        bioZh: "该政策框架紧扣三大实施支柱：1）保障女性创业者平等获得绿色创新资金；2）构建跨国女性商贸法律援助联合网络；3）设立科技与外交领域青年女学者定向交流名额。",
        bioCkb: "ئەم چوارچێوە سیاسییە سەرنج دەخاتە سەر ٣ کۆڵەکەی سەرەکی: دەستپێگەیشتنی یەکسان بۆ سەرمایەی وەبەرهێنان، هاوکاری یاسایی دووقۆڵی و ئاڵوگۆڕی ئەکادیمی.",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
        organization: "Trilateral Women Rights Commission (Beijing-Baghdad-Erbil)",
        publicationUrl: "https://chinq.media/policy/women-declaration-2026.pdf",
        isFeatured: true,
        isTrending: true
      },
      {
        slug: "women-in-stem-and-tech-summit-2026",
        nameEn: "Eurasian Women in Tech & Silk Road Innovation Summit",
        nameAr: "قمة المرأة في التكنولوجيا والابتكار لطريق الحرير 2026",
        nameZh: "欧亚女性科技创新与丝路数智峰会 2026",
        nameCkb: "لووتکەی ئافرەتان لە تەکنەلۆجیا و دااهێنانی ڕێگای ئاوریشم ٢٠٢٦",
        titleEn: "Celebrating 150 Female Tech Founders & AI Pioneers from China and Iraq",
        titleAr: "الاحتفاء بـ 150 مؤسسة تكنولوجية ورائدة في الذكاء الاصطناعي من الصين والعراق",
        titleZh: "表彰来自中国、伊拉克与库尔德斯坦的150位科技创始人与人工智能先锋",
        titleCkb: "ڕێزلێنان لە ١٥٠ ئافرەتی دامەزرێنەری تەکنەلۆجیا و زیرەکی دەستکرد",
        region: "BILATERAL",
        category: "ACHIEVEMENTS",
        summaryEn: "Annual high-level convention showcasing female-led startups, AI medical tools, clean energy patents, and digital fintech platforms built by women engineers in China, Baghdad, and Kurdistan.",
        summaryAr: "مؤتمر سنوي رفيع المستوى يستعرض الشركات الناشئة التي تقودها النساء، وأدوات الذكاء الاصطناعي الطبي، وبراءات أختراع الطاقة النظيفة، والتقنيات المالية.",
        summaryZh: "年度高规格盛会，集中展示由中国、巴格达与库尔德斯坦女性工程师领衔的初创企业、AI医疗工具、清洁能源专利与数字金融科技平台。",
        summaryCkb: "کۆنگرەیەکی ساڵانەی ئاست بەرز کە کۆمپانیا دەستپێکەرەکانی ژنان و ئامرازەکانی زیرەکی دەستکردی پزیشکی نیشان دەدات.",
        bioEn: "The 2026 Summit awarded $2.5 Million in seed funding to female founders building cross-border agricultural drone management, Kurdish localized LLMs, and telemedicine networks serving rural communities.",
        bioAr: "منحت قمة 2026 تمويلاً قدره 2.5 مليون دولار للمؤسسات اللاتي يبنين إدارة الطائرات الزراعية بدون طيار، والنماذج اللغوية الكردية، وشبكات التطبيب عن بعد.",
        bioZh: "2026年度峰会现场向女性创业者颁发250万美元种子基金，重点扶持跨国农业无人机系统、本地化库尔德语大语言模型以及便民远程医疗网络。",
        bioCkb: "لووتکەی ٢٠٢٦ بڕی ۲.٥ ملیۆن دۆلاری وەک یارمەتی بەخشی بە دامەزرێنەرانی ئافرەت کە لە بواری فرۆکەی بێفرۆکەوان و زیرەکی دەستکرددا کاردەکەن.",
        imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1000",
        organization: "Sino-Arab Female Tech Leaders Forum",
        publicationUrl: "https://chinq.media/summit/women-tech-2026",
        isFeatured: true,
        isTrending: true
      },
      {
        slug: "monograph-women-role-in-silk-road-diplomacy",
        nameEn: "Monograph: Women's Role in Eurasian Silk Road Heritage & Modern Diplomacy",
        nameAr: "دراسة بحثية: دور المرأة في التراث والدبلوماسية لطريق الحرير الأوراسي",
        nameZh: "学术专著《女性在欧亚丝绸之路遗产与现代外交中的角色》",
        nameCkb: "توێژینەوەی ئەکادیمی: ڕۆڵی ئافرەتان لە کەلەپوور و دیپلۆماسی ڕێگای ئاوریشم",
        titleEn: "Academic Publication by Peking University & Baghdad University Scholars",
        titleAr: "إصدار أكاديمي مشترك بين باحثي جامعة بيكين وجامعة بغداد وجامعة صلاح الدين",
        titleZh: "北京大学、巴格达大学与萨拉赫丁大学专家学者联合出版权威研究",
        titleCkb: "بڵاوکراوەی ئەکادیمی هاوبەشی زانکۆی پەکین و زانکۆی بەغدا و زانکۆی سەلاحەدین",
        region: "BILATERAL",
        category: "PUBLICATIONS",
        summaryEn: "A 480-page peer-reviewed academic volume examining female agency in ancient trade networks, modern consular diplomacy, and cultural preservation along the Tigris and Yangtze rivers.",
        summaryAr: "مجلد أكاديمي محكّم من 480 صفحة يبحث في دور المرأة في شبكات التجارة القديمة والدبلوماسية القنصلية الحديثة والحفاظ على التراث عبر نهري دجلة واليانغتسي.",
        summaryZh: "一部480页的同行评审权威学术著作，深入探讨女性在古代贸易网络、现代领事外交以及底格里斯河与长江流域文化遗产保护中的历史贡献与当下作用。",
        summaryCkb: "توێژینەوەیەکی ئەکادیمی ٤٨٠ لاپەڕەیی کە تاوتوێی ڕۆڵی ئافرەتان لە ڕێگاکانی بازرگانی کۆن و دیپلۆماسی نوێدا دەکات.",
        bioEn: "Co-authored by Dr. Wang Xiuying and Dr. Amal Al-Mansoor, this monograph highlights historical manuscript records of female merchants in Mesopotamia and Song Dynasty China, establishing a scholarly blueprint for future cultural agreements.",
        bioAr: "تأليف مشترك بين الدكتورة وانغ شيوينغ والدكتورة أمل المنصور، يسلط هذا البحث الضوء على السجلات المخطوطة للمعتمدات والتجارات في بلاد الرافدين والصين.",
        bioZh: "由王秀英教授与阿迈勒·曼苏尔博士联合撰写，披露了大量两河流域与宋代中国女性商贾的历史文献，为新时代中伊中库文化合作确立了学术基石。",
        bioCkb: "لە نووسینی هاوبەشی د. وانگ شیوینگ و د. ئەمەل مەنسورە کە تیشک دەخاتە سەر بەڵگەنامە کۆنەکانی بازرگانانی ئافرەت لە میسۆپۆتامیا و چین.",
        imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=1000",
        organization: "ChinQ Academic Press & Center for Silk Road Women Studies",
        publicationUrl: "https://chinq.media/books/silkroad-women-diplomacy.pdf",
        isFeatured: true,
        isTrending: true
      }
    ];

    for (const item of features) {
      await prisma.womenFeature.create({
        data: item
      });
    }

    console.log(`[WomenSeeder] Successfully seeded ${features.length} women features.`);
  } catch (error) {
    console.error("[WomenSeeder] Error seeding women features:", error);
  }
}
