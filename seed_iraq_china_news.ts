import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting specialized Iraq-China figures news seeder...");

  // Retrieve an author to associate articles with
  const author = await prisma.user.findFirst({
    where: { role: 'AUTHOR' }
  }) || await prisma.user.findFirst({
    where: { role: 'ADMIN' }
  });

  if (!author) {
    console.error("❌ No user (AUTHOR or ADMIN) found in database. Please run migrations/seeders first!");
    return;
  }

  console.log(`👤 Using author for news: ${author.name} (${author.email})`);

  // Retrieve or create required categories
  const categoriesList = [
    { slug: 'politics', name: 'Politics', nameEn: 'Politics', nameAr: 'سياسة', nameZh: '政治' },
    { slug: 'economy', name: 'Economy', nameEn: 'Economy', nameAr: 'اقتصاد', nameZh: '经济' },
    { slug: 'energy', name: 'Energy', nameEn: 'Energy', nameAr: 'طاقة', nameZh: '能源' },
    { slug: 'belt-road', name: 'Belt & Road', nameEn: 'Belt & Road', nameAr: 'مبادرة الحزام والطريق', nameZh: '一带一路' },
    { slug: 'technology', name: 'Technology', nameEn: 'Technology', nameAr: 'تكنولوجيا', nameZh: '科技' },
    { slug: 'business-statistics', name: 'Business Statistics', nameEn: 'Business Statistics', nameAr: 'إحصاءات الأعمال', nameZh: '商业统计' }
  ];

  const categoriesMap: Record<string, string> = {};

  for (const cat of categoriesList) {
    let existing = await prisma.category.findUnique({
      where: { slug: cat.slug }
    });
    if (!existing) {
      console.log(`📁 Creating category: ${cat.slug}`);
      existing = await prisma.category.create({
        data: {
          slug: cat.slug,
          name: cat.name,
          nameEn: cat.nameEn,
          nameAr: cat.nameAr,
          nameZh: cat.nameZh
        }
      });
    }
    categoriesMap[cat.slug] = existing.id;
  }

  // Define 10 high-quality news articles with translations
  const newsArticles = [
    // 1. Faiq Zeydan
    {
      slug: "faiq-zeydan-judiciary-reform-iraq-2026",
      categorySlug: "politics",
      imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop",
      translations: [
        {
          lang: "en",
          title: "Judge Faiq Zeydan Highlights Constitutional Safeguards and Judicial Independence",
          excerpt: "Supreme Judicial Council Head Judge Faiq Zeydan met with top federal leaders in Baghdad, reiterating that judicial sovereignty is non-negotiable for national stability.",
          content: "Baghdad — Judge Faiq Zeydan, President of the Supreme Judicial Council of Iraq, presided over a key session in Baghdad focusing on legal and judicial cooperation. Judge Zeydan emphasized that the independence of the court system remains a vital guarantor of citizens' rights and constitutional limits. He outlined initiatives to streamline litigation processes, reinforce rule of law across all federal and regional territories, and safeguard judicial institutions from political interference to build long-term democratic trust."
        },
        {
          lang: "ar",
          title: "القاضي فائق زيدان يؤكد على الضمانات الدستورية واستقلال القضاء",
          excerpt: "رئيس مجلس القضاء الأعلى القاضي فائق زيدان يجتمع مع كبار القادة الاتحاديين في بغداد، مؤكداً أن سيادة القضاء خط أحمر للاستقرار الوطني.",
          content: "بغداد — ترأس القاضي فائق زيدان، رئيس مجلس القضاء الأعلى في العراق، جلسة مهمة في بغداد ركزت على التعاون القانوني والقضائي. وأكد القاضي زيدان أن استقلال النظام القضائي يظل ضماناً حيوياً لحقوق المواطنين والحدود الدستورية. واستعرض مبادرات لتبسيط إجراءات التقاضي، وتعزيز سيادة القانون في جميع الأراضي الاتحادية والإقليمية، وحماية المؤسسات القضائية من التدخلات السياسية لبناء ثقة ديمقراطية طويلة الأجل."
        },
        {
          lang: "zh",
          title: "最高司法委员会主席法伊格·扎伊丹大法官强调宪法保障与司法独立",
          excerpt: "伊拉克最高司法委员会主席法伊格·扎伊丹在巴格达会见联邦高级领导人，重申司法主权是国家稳定的基石，不容任何政治干预。",
          content: "巴格达 — 伊拉克最高司法委员会主席法伊格·扎伊丹法官在巴格达主持了一场关于法律与司法合作的重要会议。扎伊丹法官强调，司法系统的独立性是保障公民权利和宪法界限的关键。他概述了简化诉讼程序、在联邦和地区领土上加强法治建设以及保护司法机构免受政治干扰的举措，以巩固长期的民主信任。"
        },
        {
          lang: "ckb",
          title: "دادوەر فایەق زێدان جەخت لەسەر گەرەنتییە دەستوورییەکان و سەربەخۆیی دەسەڵاتی دادوەری دەکاتەوە",
          excerpt: "سەرۆکی ئەنجومەنی باڵای دادوەری دادوەر فایەق زێدان لەگەڵ سەرکردە باڵاکانی فیدراڵ لە بەغدا کۆبووەوە و ڕایگەیاند کە سەروەریی دادوەری بەردی بناغەی سەقامگیرییە.",
          content: "بەغدا — دادوەر فایەق زێدان، سەرۆکی ئەنجومەنی باڵای دادوەری عێراق، سەرپەرشتی کۆبوونەوەیەکی گرنگی لە بەغدا کرد کە تەوەرەکەی هاوکاریی یاسایی و دادوەری بوو. دادوەر زێدان جەختی لەوە کردەوە کە سەربەخۆیی سیستەمی دادوەری بە گەرەنتییەکی سەرەکی مافەکانی هاوڵاتیان و سنوورە دەستوورییەکان دەمێنێتەوە. ئەو باسی لە چەندین دەستپێشخەری کرد بۆ ئاسانکاری لە ڕێکارەکانی دادگاییکردن و پاراستنی دامەزراوە دادوەرییەکان لە دەستێوەردانی سیاسی."
        }
      ]
    },
    // 2. Masoud Barzani
    {
      slug: "masoud-barzani-kurdish-unity-delegations-2026",
      categorySlug: "politics",
      imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
      translations: [
        {
          lang: "en",
          title: "Masoud Barzani Calls for National Kurdish Dialogue to Secure Regional Interests",
          excerpt: "President Masoud Barzani convened an assembly in Salahaddin with diplomatic envoys, advocating a unified Kurdish strategic front in relations with Baghdad and regional powers.",
          content: "Salahaddin — Leader Masoud Barzani met with international delegates and political representatives to discuss regional stability and Kurdish constitutional rights. President Barzani stressed the historic necessity of intra-Kurdish solidarity and dialogue to address common economic and security challenges. He highlighted that Erbil's diplomatic and legal standing is strongest when Kurdish political factions maintain a coordinated, constructive policy regarding federal relations and regional security."
        },
        {
          lang: "ar",
          title: "مسعود بارزاني يدعو إلى حوار وطني كوردستاني لتأمين المصالح المشتركة",
          excerpt: "الرئيس مسعود بارزاني يعقد اجتماعاً في صلاح الدين مع مبعوثين دبلوماسيين، داعياً إلى جبهة كوردستانية استراتيجية موحدة في العلاقات مع بغداد.",
          content: "صلاح الدين — التقى الزعيم مسعود بارزاني بوفود دولية وممثلين سياسيين لمناقشة الاستقرار الإقليمي والحقوق الدستورية الكوردستانية. وشدد الرئيس بارزاني على الضرورة التاريخية للتضامن والحوار الكوردي الكوردي لمواجهة التحديات الاقتصادية والأمنية المشتركة. وأشار إلى أن الموقف الدبلوماسي والقانوني لأربيل يكون أقوى عندما تحافظ الفصائل السياسية الكوردية على سياسة منسقة وبناءة فيما يتعلق بالعلاقات الفيدرالية والأمن الإقليمي."
        },
        {
          lang: "zh",
          title: "马苏德·巴尔扎尼呼吁举行库尔德内部对话以维护地区利益",
          excerpt: "库尔德领袖马苏德·巴尔扎尼在萨拉赫丁召集外交使节会议，倡导在与巴格达联邦政府和地区大国交往中建立统一的战略阵线。",
          content: "萨拉赫丁 — 领袖马苏德·巴尔扎尼与国际代表和政治代表会晤，讨论地区稳定和库尔德人宪法权利。巴尔扎尼总统强调，面对共同的经济和安全挑战，库尔德内部的团结与对话具有历史必要性。他指出，只有当库尔德各政治派别在联邦关系和地区安全上保持协调、建设性的政策时，埃尔比勒的外交和法律地位才最为稳固。"
        },
        {
          lang: "ckb",
          title: "مەسعود بارزانی داوای دیالۆگی نیشتمانیی کوردی دەکات بۆ پاراستنی بەرژەوەندییەکان",
          excerpt: "سەرۆک مەسعود بارزانی لە سەڵاحەدین لەگەڵ نێردە دیپلۆماتییەکان کۆبووەوە و جەختی لەسەر پێویستیی بەرەیەکی یەکگرتووی کوردی کردەوە لە پەیوەندییەکان لەگەڵ بەغدا.",
          content: "سەڵاحەدین — سەرۆک مەسعود بارزانی لەگەڵ شاندە نێودەوڵەتییەکان و نوێنەرانی سیاسی کۆبووەوە بۆ تاوتوێکردنی سەقامگیریی ناوچەکە و مافە دەستوورییەکانی هەرێمی کوردستان. سەرۆک بارزانی جەختی لەسەر پێویستیی مێژوویی تەبایی و دیالۆگی نێوان لایەنە کوردییەکان کردەوە بۆ ڕووبەڕووبوونەوەی تەحەددییە ئابووری و ئەمنییە هاوبەشەکان."
        }
      ]
    },
    // 3. Masrour Barzani
    {
      slug: "masrour-barzani-digital-economy-investment-krg",
      categorySlug: "economy",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      translations: [
        {
          lang: "en",
          title: "PM Masrour Barzani Launches KRG Global Investment Initiative Targeting Key Sectors",
          excerpt: "Kurdistan Regional Government Prime Minister Masrour Barzani announced a modern regulatory framework to attract foreign direct investment, focusing on technology and tourism.",
          content: "Erbil — Prime Minister Masrour Barzani unveiled a landmark investment initiative during an economic forum in Erbil. The Prime Minister highlighted the KRG's ongoing efforts to diversify the economy away from raw energy exports by supporting digital startups, manufacturing centers, and international tourism. Barzani noted that streamlined administrative processes and a highly secure business climate make the Kurdistan Region a prime gateway for international capital in the Middle East."
        },
        {
          lang: "ar",
          title: "رئيس الوزراء مسرور بارزاني يطلق مبادرة الاستثمار العالمي للإقليم",
          excerpt: "أعلن رئيس حكومة إقليم كوردستان مسرور بارزاني عن إطار تنظيمي حديث لجذب الاستثمار الأجنبي المباشر، مع التركيز على التكنولوجيا والسياحة.",
          content: "أربيل — كشف رئيس الوزراء مسرور بارزاني عن مبادرة استثمارية تاريخية خلال منتدى اقتصادي في أربيل. وسلط رئيس الوزراء الضوء على الجهود المستمرة لحكومة الإقليم لتنويع الاقتصاد بعيداً عن صادرات الطاقة الخام من خلال دعم الشركات الرقمية الناشئة ومراكز التصنيع والسياحة الدولية. وأشار بارزاني إلى أن تبسيط الإجراءات الإدارية والمناخ الاستثماري الآمن يجعل الإقليم بوابة رئيسية لتدفق رؤوس الأموال العالمية."
        },
        {
          lang: "zh",
          title: "总理马斯鲁尔·巴尔扎尼启动库区全球投资倡议，重点拓展多元经济",
          excerpt: "库尔德自治区总理马斯鲁尔·巴尔扎尼宣布出台现代化监管框架以吸引外国直接投资，核心关注数字科技与高端旅游业。",
          content: "埃尔比勒 — 总理马斯鲁尔·巴尔扎尼在埃尔比勒举行的一个经济论坛上公布了一项里程碑式的投资倡议。总理强调，库尔德地方政府正在持续努力，通过支持数字化初创企业、制造业中心和国际旅游业，推动经济多元化，减少对初级能源出口的依赖。巴尔扎尼指出，精简的行政程序和高度安全的商业环境使库尔德地区成为国际资本进入中东的主要门户。"
        },
        {
          lang: "ckb",
          title: "سەرۆک وەزیران مەسرور بارزانی دەستپێشخەریی وەبەرهێنانی جیهانیی هەرێمی کوردستان ڕادەگەیەنێت",
          excerpt: "سەرۆکی حکومەتی هەرێمی کوردستان مەسرور بارزانی چوارچێوەیەکی ڕێکخستنی نوێی بۆ ڕاکێشانی وەبەرهێنانی بیانی ڕاگەیاند، بە تایبەتی لە کەرتی تەکنەلۆجیا و گەشتوگوزار.",
          content: "هەولێر — سەرۆک وەزیران مەسرور بارزانی لە میانی کۆڕبەندێکی ئابووریدا لە هەولێر دەستپێشخەرییەکی نوێی وەبەرهێنانی خستەڕوو. سەرۆک وەزیران ئاماژەی بە هەوڵەکانی حکومەتی هەرێم کرد بۆ هەمەجۆرکردنی سەرچاوەکانی داهات و دوورکەوتنەوە لە پشت بەستن بە هەناردەی نەوت بە تەنها، لە ڕێگەی پاڵپشتیکردنی پڕۆژە تەکنەلۆجییەکان و کەرتی پیشەسازی."
        }
      ]
    },
    // 4. Qubad Talabani
    {
      slug: "qubad-talabani-civil-service-digitalization-reform",
      categorySlug: "technology",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
      translations: [
        {
          lang: "en",
          title: "Deputy PM Qubad Talabani Directs Expansion of Biometric Registry and Smart Governance",
          excerpt: "Deputy Prime Minister Qubad Talabani spearheaded a digital integration seminar, mandating full transition to cloud-based registries to eliminate administrative bottlenecks.",
          content: "Sulaymaniyah — In his push for modern statecraft, Deputy Prime Minister Qubad Talabani directed all regional departments to accelerate the biometric registry integration. Talabani explained that complete digitalization of the civil service database is essential to ensure public sector transparency, eliminate redundancy, and offer rapid electronic services to citizens and businesses alike. The reform is part of a broader vision to establish a fully paperless public administration by 2027."
        },
        {
          lang: "ar",
          title: "نائب رئيس الوزراء قوباد طالباني يوجه بتوسيع السجل البيومتري والحوكمة الذكية",
          excerpt: "قاد نائب رئيس الوزراء قوباد طالباني ندوة للتكامل الرقمي، موجهاً بالانتقال الكامل إلى السجلات السحابية للقضاء على العقبات الإدارية.",
          content: "السليمانية — في إطار سعيه لتحديث العمل الحكومي، وجه نائب رئيس الوزراء قوباد طالباني جميع الدوائر الحكومية بتسريع وتيرة التكامل الرقمي والسجل البيومتري. وأوضح طالباني أن التحول الرقمي الكامل لقاعدة بيانات الخدمة المدنية أمر ضروري لضمان شفافية القطاع العام، وتسهيل الإجراءات، وتقديم خدمات إلكترونية سريعة للمواطنين والشركات."
        },
        {
          lang: "zh",
          title: "副总理库巴德·塔拉巴尼部署全面扩大生物识别与智能政务建设",
          excerpt: "库尔德自治区副总理库巴德·塔拉巴尼主持数字化整合研讨会，指示全面向云端政务数据库过渡以消除行政壁垒。",
          content: "苏莱曼尼亚 — 在推动现代化治理的进程中，副总理库巴德·塔拉巴尼指示所有部门加速生物识别登记的集成工作。塔拉巴尼解释说，公务员数据库的全面数字化对于确保公共部门的透明度、消除冗余、以及向公民和企业提供快速的电子服务至关重要。该改革也是到2027年建立完全无纸化公共行政机构宏伟愿景的一部分。"
        },
        {
          lang: "ckb",
          title: "جێگری سەرۆک وەزیران قوباد تاڵەبانی ڕێنمایی دەکات بۆ فراوانکردنی تۆماری بایۆمەتری و حوکمڕانیی زیرەک",
          excerpt: "جێگری سەرۆکی حکومەت قوباد تاڵەبانی سەرپەرشتی سیمینارێکی گرنگی کرد بۆ چاکسازیی ئیداری و دیجیتاڵکردنی سێکتەری گشتی.",
          content: "سلێمانی — لە چوارچێوەی هەوڵەکانیدا بۆ نوێکردنەوەی کارگێڕی، جێگری سەرۆک وەزیران قوباد تاڵەبانی ڕێنمایی سەرجەم فەرمانگەکانی کرد بۆ خێراکردنی پرۆسەی تۆماری بایۆمەتری. تاڵەبانی ڕوونکردەوە کە دیجیتاڵکردنی تەواوی داتا بنکەی ڕاژەی شارستانی گرنگە بۆ شەفافییەت و کەمکردنەوەی ڕۆتین لە فەرمانگەکاندا."
        }
      ]
    },
    // 5. Bafl Talabani
    {
      slug: "bafl-talabani-baghdad-relations-puk-strategy",
      categorySlug: "politics",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
      translations: [
        {
          lang: "en",
          title: "PUK President Bafl Talabani Advocates Balanced Federal Budget Allocation in Baghdad",
          excerpt: "Patriotic Union of Kurdistan (PUK) President Bafl Talabani engaged with national coalition leaders, emphasizing political cohesion and systematic public wage disbursements.",
          content: "Baghdad — Bafl Talabani, President of the Patriotic Union of Kurdistan (PUK), conducted high-level diplomatic talks in Baghdad. Talabani advocated for a balanced approach to the federal budget, stressing that public servant salaries in the Kurdistan Region must remain immune to political disputes. He urged all factions to prioritize strategic cooperation, joint security partnerships, and legal harmonizations between Erbil and Baghdad to preserve national unity and economic stability."
        },
        {
          lang: "ar",
          title: "رئيس الاتحاد الوطني الكوردستاني بافل طالباني يدعو لتوزيع متوازن للموازنة الاتحادية",
          excerpt: "رئيس الاتحاد الوطني الكوردستاني بافل طالباني يجتمع مع قادة التحالف الوطني في بغداد، مؤكداً على التماسك السياسي وضمان مستحقات الرواتب.",
          content: "بغداد — أجرى بافل طالباني، رئيس الاتحاد الوطني الكوردستاني، محادثات دبلوماسية رفيعة المستوى في بغداد. ودعا طالباني إلى نهج متوازن فيما يتعلق بالموازنة الاتحادية، مؤكداً أن رواتب الموظفين في إقليم كوردستان يجب أن تكون بمنأى عن الخلافات السياسية. وحث جميع الأطراف على إعطاء الأولوية للتعاون الاستراتيجي والشراكات الأمنية المشتركة بين أربيل وبغداد."
        },
        {
          lang: "zh",
          title: "库尔德爱国联盟主席巴菲尔·塔拉巴尼在巴格达倡导均衡的联邦预算分配",
          excerpt: "库区爱国联盟（PUK）主席巴菲尔·塔拉巴尼与伊拉克联邦联盟多位领导人会晤，强调政治凝聚力与系统化公职人员薪资发放的重要性。",
          content: "巴格达 — 库尔德爱国联盟（PUK）主席巴菲尔·塔拉巴尼在巴格达进行了高层外交会谈。塔拉巴尼主张采取均衡的方法对待联邦预算，强调库尔德地区公职人员的工资必须免受政治争议的影响。他敦促所有派别将埃尔比勒和巴格达之间的战略合作、联合安全伙伴关系和法律协调放在首位，以维护国家统一和经济稳定。"
        },
        {
          lang: "ckb",
          title: "سەرۆکی یەکێتی بافڵ تاڵەبانی لە بەغدا داوای دابەشکردنی دادپەروەرانەی بودجەی فیدراڵ دەکات",
          excerpt: "سەرۆکی یەکێتیی نیشتمانیی کوردستان بافڵ تاڵەبانی لەگەڵ سەرکردەکانی هاوپەیمانیی فیدراڵ کۆبووەوە و جەختی لەسەر دەستەبەرکردنی شایستە داراییەکانی هەرێم کردەوە.",
          content: "بەغدا — بافڵ تاڵەبانی، سەرۆکی یەکێتیی نیشتمانیی کوردستان، زنجیرەیەک کۆبوونەوەی گرنگی لە بەغدا ئەنجامدا. تاڵەبانی ڕایگەیاند کە پێویستە پرسی مووچەی فەرمانبەرانی هەرێمی کوردستان لە ململانێ سیاسییەکان بەدوور بخرێت و چوارچێوەیەکی یاسایی جێگیر بۆ بودجە دابین بکرێت."
        }
      ]
    },
    // 6. Peshmerga Forces
    {
      slug: "peshmerga-forces-unified-brigades-modernization-2026",
      categorySlug: "politics",
      imageUrl: "https://images.unsplash.com/photo-1590233465376-403c99f437fd?q=80&w=1200&auto=format&fit=crop",
      translations: [
        {
          lang: "en",
          title: "Ministry of Peshmerga Unveils New Standardized Brigades in Integration Drive",
          excerpt: "Under the institutional reform framework, the Ministry of Peshmerga Affairs has organized thousands of personnel into unified, modern combat brigades with coalition oversight.",
          content: "Erbil — The Ministry of Peshmerga Affairs officially announced the creation of three new unified brigades as part of a multi-year reform program. With technological and strategic advisory support from global coalition partners, the Peshmerga forces are centralizing command structures under the ministry. This integration aims to elevate military professionalism, enhance communication capabilities, and optimize joint defense systems against regional security threats."
        },
        {
          lang: "ar",
          title: "وزارة البيشمركة تكشف عن ألوية موحدة جديدة ضمن خطط إعادة التنظيم والدمج",
          excerpt: "في إطار الإصلاح المؤسسي، نظمت وزارة شؤون البيشمركة آلاف المنتسبين في ألوية قتالية موحدة وحديثة بإشراف من قوات التحالف.",
          content: "أربيل — أعلنت وزارة شؤون البيشمركة رسمياً عن تشكيل ثلاثة ألوية موحدة جديدة كجزء من برنامج الإصلاح لعدة سنوات. وبدعم استشاري وتكنولوجي من شركاء التحالف الدولي، تعمل قوات البيشمركة على توحيد وتطوير هياكل القيادة تحت مظلة الوزارة بهدف تعزيز المهنية العسكرية وتطوير قنوات الاتصال والأنظمة الدفاعية المشتركة."
        },
        {
          lang: "zh",
          title: "库区佩什梅格事务部推出新型建制化联合旅，加速军事整合步伐",
          excerpt: "在机构改革框架下，库区佩什梅格事务部在国际联军多国顾问指导下，将数千名军事人员整编入统一、现代化的战斗旅中。",
          content: "埃尔比勒 — 作为多年期军事改革计划的一部分，佩什梅格事务部正式宣布组建三个新的统一旅。在全球盟友合作伙伴的技术和战略顾问支持下，佩什梅格部队正在逐步将指挥结构集中到部级管理之下。这一整合旨在提升军事专业化水准、增强战术通信能力，并优化针对区域安全威胁的联合防御机制。"
        },
        {
          lang: "ckb",
          title: "وەزارەتی پێشمەرگە لیوا هاوبەشە یەکگرتووە نوێیەکان لە چوارچێوەی پرۆسەی ڕێکخستنەوەدا ڕادەگەیەنێت",
          excerpt: "لەژێر چوارچێوەی پرۆسەی چاکسازیی وەزارەتی پێشمەرگەدا، چەندین لیوای نوێ بە هاوکاریی ڕاوێژکارانی هاوپەیمانیی نێودەوڵەتی ڕێکخرانەوە.",
          content: "هەولێر — وەزارەتی کاروباری پێشمەرگە بە فەرمی پێکهێنانی سێ لیوای نوێی یەکگرتووی ڕاگەیاند. ئەم هەنگاوە بەشێکە لە بەرنامەی چاکسازیی بەردەوام بە مەبەستی یەکخستنەوەی سەرجەم هێزەکان لەژێر چەتری وەزارەت و بەرزکردنەوەی توانای سەربازی و بەرگری."
        }
      ]
    },
    // 7. Xi Jinping / China government policy
    {
      slug: "xi-jinping-china-iraq-strategic-cooperation-vision",
      categorySlug: "belt-road",
      imageUrl: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1200&auto=format&fit=crop",
      translations: [
        {
          lang: "en",
          title: "President Xi Jinping Envisions Expanded Sino-Iraqi Strategic Alignment under BRI",
          excerpt: "China's President Xi Jinping emphasized the depth of Sino-Iraqi ties, outlining Beijing's policy to promote high-quality infrastructure, energy transition, and educational exchange.",
          content: "Beijing — In a special policy outline, President Xi Jinping reaffirmed China's commitment to supporting Iraq's peaceful rebuilding and economic diversification. President Xi highlighted that China's development policy seeks to align the Belt and Road Initiative with Iraq's long-term economic roadmap. This strategic vision covers joint ports, sustainable energy projects, industrial parks, and educational capacity building, helping Iraq unlock its full geopolitical and economic potential."
        },
        {
          lang: "ar",
          title: "الرئيس شي جين بينغ يتطلع إلى توسيع التنسيق الاستراتيجي الصيني العراقي تحت مبادرة الحزام والطريق",
          excerpt: "أكد الرئيس الصيني شي جين بينغ على عمق العلاقات الثنائية، مستعرضاً سياسة بكين في دعم مشاريع البنية التحتية والتعليم والتحول الطاقي.",
          content: "بكين — في وثيقة توجيهية خاصة بالسياسة الخارجية، أكد الرئيس شي جين بينغ التزام الصين بدعم إعادة الإعمار السلمي والتنوع الاقتصادي في العراق. وأوضح الرئيس شي أن بكين تسعى لمواءمة مبادرة الحزام والطريق مع الرؤية الاقتصادية طويلة المدى للعراق، بما يشمل إدارة الموانئ المشتركة ومشاريع الطاقة المستدامة والمجمعات الصناعية والمنح التعليمية."
        },
        {
          lang: "zh",
          title: "国家主席习近平指引中伊在“一带一路”框架下高质量战略对接与合作",
          excerpt: "中国国家主席习近平强调中伊传统友好，阐明北京致力于通过“一带一路”倡议促进伊拉克高水平基础设施建设、清洁能源与人文交流的政策。",
          content: "北京 — 在一份专门的外交政策框架中，国家主席习近平重申了中国支持伊拉克和平重建和经济多元化建设的坚定承诺。习近平主席强调，中国的对外发展政策旨在推动“一带一路”倡议与伊拉克的长期经济路线图进行深度对接。这一战略蓝图涵盖了港口合作、可持续能源项目、产业园区以及教育人才培养等关键领域，旨在助力伊拉克释放其地缘及经济潜能。"
        },
        {
          lang: "ckb",
          title: "سەرۆک شی جینپینگ گەشەپێدانی پەیوەندییە ستراتیژییەکانی چین و عێراق دەخاتەڕوو",
          excerpt: "سەرۆکی چین شی جینپینگ جەختی لەسەر قووڵیی پەیوەندییەکانی نێوان بەغدا و پەکین کردەوە لە چوارچێوەی دەستپێشخەریی کەمەر و ڕێگادا.",
          content: "پەکین — لە ڕاگەیەندراوێکی فەرمیدا، سەرۆک شی جینپینگ دووپاتی کردەوە کە پەکین پاڵپشتی لە بونیادنانەوەی ئاشتیانە و هەمەجۆرکردنی ئابووری عێراق دەکات. ئەم دیدگا ستراتیژییە پڕۆژەکانی ژێرخان، وزەی پاک، و ئاڵوگۆڕی زانستی و خوێندن دەگرێتەوە."
        }
      ]
    },
    // 8. Chinese Prime Minister / Premier Li Qiang
    {
      slug: "premier-li-qiang-green-energy-china-iraq-partnership",
      categorySlug: "energy",
      imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop",
      translations: [
        {
          lang: "en",
          title: "Chinese Premier Li Qiang Stresses Pragmatic Industrial Partnerships and Low-Carbon Transition",
          excerpt: "Premier of the People's Republic of China, Li Qiang, outlined Beijing's support for modernizing industrial chains, developing clean energy infrastructure, and facilitating tech transfers.",
          content: "Beijing — Premier Li Qiang emphasized that China is eager to expand mutual industrial and trade pipelines with Iraq. Speaking during a state economic assembly, Premier Li noted that Chinese manufacturing and engineering companies are directed to maintain highest standards of quality, safety, and green-transition practices in Iraqi infrastructure projects. He highlighted mutual potential in petrochemical refinement, green solar installations, and advanced digital telecommunications."
        },
        {
          lang: "ar",
          title: "رئيس مجلس الدولة الصيني لي تشيانغ يشدد على الشراكات الصناعية والتحول منخفض الكربون",
          excerpt: "رئيس مجلس الدولة الصيني، لي تشيانغ، يستعرض دعم بكين لتحديث سلاسل الصناعة، وتطوير البنية التحتية للطاقة النظيفة، وتسهيل نقل التكنولوجيا.",
          content: "بكين — أكد رئيس مجلس الدولة لي تشيانغ استعداد الصين لتوسيع قنوات الصناعة والتجارة المتبادلة مع العراق. وخلال اجتماع حكومي، أشار لي تشيانغ إلى توجيه الشركات الصينية للحفاظ على أعلى معايير الجودة والاستدامة البيئية في مشاريع البنية التحتية العراقية، بما في ذلك التكرير البتروكيماوي وشبكات الاتصالات المتقدمة ومزارع الطاقة الشمسية."
        },
        {
          lang: "zh",
          title: "中国国务院总理李强强调拓展务实工业合作与低碳转型伙伴关系",
          excerpt: "中国国务院总理李强概述北京在推动中伊产业链升级、清洁能源基建以及促进核心技术转让方面的支持政策。",
          content: "北京 — 国务院总理李强强调，中方愿积极拓展与伊拉克的双边工业与贸易往来渠道。在一次国家经济协调会议上，李强总理指出，已指示中国制造与工程企业在参与伊拉克基础设施项目时，务必坚持质量、安全以及绿色转型的最高标准。他重点提到了双方在石油化工精炼、绿色光伏安装以及先进数字电信网络等领域的巨大合作潜力。"
        },
        {
          lang: "ckb",
          title: "سەرۆک وەزیرانی چین لی چیانگ جەخت لەسەر هاوبەشیی پیشەسازیی بەهێز دەکاتەوە",
          excerpt: "سەرۆکی ئەنجومەنی دەوڵەتی چین، لی چیانگ، پاڵپشتیی وڵاتەکەی بۆ مۆدێرنکردنی کەرتی پیشەسازی و گواستنەوەی تەکنەلۆجیا خستەڕوو.",
          content: "پەکین — سەرۆک وەزیران لی چیانگ جەختی لەوە کردەوە کە چین پەرۆشە بۆ فراوانکردنی ئاڵوگۆڕی بازرگانی و پیشەسازی لەگەڵ عێراقدا. لە کۆبوونەوەیەکی ئابووریدا، ئاماژەی بەوە کرد کە کۆمپانیا پیشەسازییەکانی چین ڕاسپێردراون بە جێبەجێکردنی پڕۆژەکان بە بەرزترین ئاستی ژینگەیی و پاراستنی وزە."
        }
      ]
    },
    // 9. China's Ministry of Foreign Affairs
    {
      slug: "china-foreign-ministry-sovereignty-regional-peace-diplomacy",
      categorySlug: "politics",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
      translations: [
        {
          lang: "en",
          title: "China's Ministry of Foreign Affairs Reaffirms Support for Iraq's Sovereignty and Reconstruction",
          excerpt: "The spokesperson for China's Ministry of Foreign Affairs reiterated Beijing's long-term diplomatic strategy of non-interference, sovereignty respect, and reconstruction aid.",
          content: "Beijing — China's Ministry of Foreign Affairs held a comprehensive press briefing addressing Middle Eastern diplomatic engagements. The spokesperson stated that China fully supports Iraq's efforts to defend its national sovereignty, manage security challenges, and reconstruct its social infrastructure. Beijing welcomed closer multi-lateral efforts to establish permanent regional peace, stating that economic development is the ultimate foundation of stability."
        },
        {
          lang: "ar",
          title: "وزارة الخارجية الصينية تؤكد مجدداً دعم سيادة العراق وإعادة الإعمار",
          excerpt: "أكد المتحدث باسم وزارة الخارجية الصينية على استراتيجية بكين الدبلوماسية طويلة الأمد في احترام السيادة، وتقديم المساعدة في إعادة البناء.",
          content: "بكين — عقدت وزارة الخارجية الصينية مؤتمراً صحفياً شاملاً تناول العلاقات الدبلوماسية في الشرق الأوسط. وصرح المتحدث أن الصين تدعم بالكامل جهود العراق لحماية سيادته الوطنية وإعادة بناء بنيته التحتية الاجتماعية، مرحباً بالجهود متعددة الأطراف لترسيخ السلام الإقليمي القائم على التنمية الاقتصادية."
        },
        {
          lang: "zh",
          title: "中国外交部重申对伊拉克主权完整及经济社会重建的坚定支持",
          excerpt: "中国外交部发言人重申北京在涉伊外交事务中的不干涉内政、尊重国家主权以及提供和平重建援助的长期外交战略立场。",
          content: "北京 — 中国外交部就中东地区外交关系及合作举行了例行记者会。发言人表示，中方坚定支持伊拉克维护国家主权、应对安全挑战以及推进社会基础设施重建的努力。北京方面对各方为建立中东地区持久和平而展开的紧密多边协作表示欢迎，并强调发展经济才是地区行稳致远的根本基石。"
        },
        {
          lang: "ckb",
          title: "وەزارەتی دەرەوەی چین پشتیوانیی خۆی بۆ سەروەریی عێراق و دووبارە بنیادنانەوە دووپات دەکاتەوە",
          excerpt: "وتەبێژی وەزارەتی دەرەوەی چین ئاماژەی بە ستراتیژی دوور مەودای وڵاتەکەی کرد بۆ پاراستنی سەروەریی خاکی عێراق و هاوکاریی بنیادنانەوە.",
          content: "پەکین — وەزارەتی دەرەوەی چین لە کۆنفرانسێکی ڕۆژنامەوانیدا ڕایگەیاند کە پەکین بە تەواوی پاڵپشتی لە هەوڵەکانی عێراق دەکات بۆ پاراستنی سەروەریی خۆی و ئاوەدانکردنەوەی ژێرخانی کۆمەڵایەتی و ئابووری وڵاتەکە."
        }
      ]
    },
    // 10. Bilateral trade volume & statistics
    {
      slug: "china-iraq-bilateral-trade-volume-records-2026",
      categorySlug: "business-statistics",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
      translations: [
        {
          lang: "en",
          title: "Sino-Iraqi Bilateral Annual Trade Surpasses Historic Milestones, Led by Non-Oil Growth",
          excerpt: "Latest statistical digests highlight an unprecedented expansion in mutual trade volume, as machinery, electronics, and construction logistics lead imports.",
          content: "Baghdad — Official statistics released by trade ministries reveal that bilateral trade volume between Iraq and China reached historic highs over the past fiscal year. While oil remains a vital export, there is a substantial, highly positive growth in non-oil trade, including industrial equipment, renewable PV hardware, transport vehicles, and agricultural logistics. Analysts note that China's massive market capacity and Iraq's reconstruction needs form an exceptionally stable trade symbiosis."
        },
        {
          lang: "ar",
          title: "التبادل التجاري السنوي بين الصين والعراق يتجاوز أرقاماً تاريخية مدفوعاً بنمو القطاعات غير النفطية",
          excerpt: "أظهرت أحدث التقارير الإحصائية توسعاً غير مسبوق في حجم التجارة المتبادلة، بقيادة الآلات والإلكترونيات ومستلزمات البناء.",
          content: "بغداد — كشفت الإحصاءات الرسمية الصادرة عن وزارات التجارة عن وصول حجم التبادل التجاري الثنائي بين العراق والصين إلى مستويات تاريخية جديدة. ورغم بقاء النفط صادراً رئيسياً، إلا أن هناك نمواً كبيراً وإيجابياً في التجارة غير النفطية بما يشمل المعدات الصناعية ومستلزمات الطاقة المتجددة ووسائل النقل، مما يعكس تكاملاً اقتصادياً متزايداً."
        },
        {
          lang: "zh",
          title: "最新贸易统计表明中伊双边年度贸易额创历史新高，非石油品类成长亮眼",
          excerpt: "最新商贸统计摘要显示两国间进出口额实现史无前例的扩张，其中机械设备、高新技术电子产品及建筑物流领跑贸易榜单。",
          content: "巴格达 — 根据两国商务部发布的最新官方统计，过去一个财政年度内，伊拉克与中国之间的双边贸易额达到了历史性高度。尽管原油仍是伊拉克对华出口的绝对支柱，但非石油品类的贸易额呈现出了非常显著、良性的增长。这其中包括先进工业母机、绿色光伏硬件、重型运输车辆以及农业冷链物流设施。分析人士指出，中国强大的市场消纳能力与伊拉克的庞大重建需求，正在形成一个极其稳定的贸易共生生态系统。"
        },
        {
          lang: "ckb",
          title: "ئاڵوگۆڕی بازرگانیی نێوان چین و عێراق ئاستە مێژووییەکانی بەزاند",
          excerpt: "نوێترین ئامارەکان دەریدەخەن کە ئاستی هاوردە و هەناردە گەشەکردنێکی بێوێنەی بەخۆیەوە بینیوە لە کەرتی ئامێرەکان، کاڵای کارەبایی و بیناسازی.",
          content: "بەغدا — ئامارە فەرمییەکان دەریدەخەن کە قەبارەی ئاڵوگۆڕی بازرگانیی نێوان عێراق و چین گەیشتووەتە بەرزترین ئاستی مێژوویی خۆی. لە کاتێکدا نەوت هەناردەی سەرەکییە، بەڵام گەشەیەکی بەرچاو لە بازرگانیی نا-نەوتیدا بەدی دەکرێت لە هەناردەکردنی ئامێری پیشەسازی و تەکنەلۆجیا."
        }
      ]
    }
  ];

  for (const art of newsArticles) {
    const catId = categoriesMap[art.categorySlug];
    if (!catId) {
      console.error(`❌ Category not found: ${art.categorySlug}`);
      continue;
    }

    // Check if article already exists
    const existing = await prisma.article.findUnique({
      where: { slug: art.slug }
    });

    if (existing) {
      console.log(`⚠️ Article with slug "${art.slug}" already exists. Updating translations...`);
      // Update translations
      for (const trans of art.translations) {
        await prisma.articleTranslation.upsert({
          where: {
            articleId_lang: {
              articleId: existing.id,
              lang: trans.lang
            }
          },
          update: {
            title: trans.title,
            excerpt: trans.excerpt,
            content: trans.content
          },
          create: {
            articleId: existing.id,
            lang: trans.lang,
            title: trans.title,
            excerpt: trans.excerpt,
            content: trans.content
          }
        });
      }
    } else {
      console.log(`📰 Seeding article: "${art.slug}"`);
      await prisma.article.create({
        data: {
          slug: art.slug,
          categoryId: catId,
          authorId: author.id,
          status: 'PUBLISHED',
          imageUrl: art.imageUrl,
          translations: {
            create: art.translations
          }
        }
      });
    }
  }

  console.log("✅ Specialized Iraq-China figures news seeder completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
