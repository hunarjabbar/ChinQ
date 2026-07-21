import { prisma } from "./db.js";

export async function seedTourism() {
  try {
    const count = await prisma.tourismSpot.count();
    if (count > 0) {
      console.log(`[TourismSeeder] Found ${count} tourism spots in database.`);
      return;
    }

    console.log("[TourismSeeder] Seeding bilateral tourism spots for China, Iraq, and Kurdistan...");

    const spots = [
      {
        slug: "erbil-citadel-and-bazaar",
        titleEn: "Erbil Citadel & Ancient Qaysari Bazaar",
        titleAr: "قلعة أربيل والسوق القيصري القديم",
        titleZh: "埃尔比勒城堡与千年恺撒里大巴扎",
        titleCkb: "قەڵای هەولێر و بازاڕی قەیسەری کۆن",
        city: "Erbil",
        region: "KURDISTAN",
        category: "UNESCO_HERITAGE",
        descriptionEn: "Standing at the heart of Erbil for over 6,000 years, the UNESCO World Heritage Citadel is one of the oldest continuously inhabited settlements on Earth. Below lies the sprawling Qaysari Bazaar offering spices, Kurdish handicrafts, and traditional tea houses.",
        descriptionAr: "تقع قلعة أربيل المصنفة ضمن التراث العالمي لليونسكو في قلب المدينة لأكثر من 6000 عام، وتعد واحدة من أقدم المستوطنات المأهولة بالسكان باستمرار في العالم. ويضم أسفلها سوق القيصرية الشهير للحرف اليدوية والشاي الكردي التقليدي.",
        descriptionZh: "联合国教科文组织世界文化遗产——埃尔比勒城堡屹立于城市中心逾6000年，是人类历史上最古老的连续有人居住聚落之一。山脚下繁华的恺撒里大巴扎汇聚了地道库尔德香料、传统手工艺与清茶馆。",
        descriptionCkb: "قەڵای هەولێر کە لە لایەن یونسکۆوە وەک کەلەپووری جیهانی تۆمارکراوە، زیاتر لە ٦٠٠٠ ساڵە لە ناوەندی هەولێردا ڕاوەستاوە. لە خوارەوەشی بازاڕی قەیسەری کۆن کە پڕە لە سۆس و دەستکردی کوردی و چاخانەی نەریتی.",
        imageUrl: "https://images.unsplash.com/photo-1548625361-185341398c8c?auto=format&fit=crop&q=80&w=1000",
        bestTimeToVisit: "March - May & September - November",
        visaPolicy: "30-Day Visa on Arrival / E-Visa available for Chinese citizens and international visitors",
        flightInfo: "Direct flights connecting Guangzhou/Chengdu to Erbil (EBL) via major hubs",
        rating: 4.9,
        estimatedCost: "$600 - $1,200 / week",
        isFeatured: true,
        isTrending: true
      },
      {
        slug: "great-wall-and-forbidden-city",
        titleEn: "The Great Wall & Imperial Forbidden City",
        titleAr: "سور الصين العظيم والمدينة المحرمة الإمبراطورية",
        titleZh: "万里长城与北京故宫博物院",
        titleCkb: "شوورەی مەزنی چین و شارە قەدەغەکراوەکەی پەکین",
        city: "Beijing",
        region: "CHINA",
        category: "UNESCO_HERITAGE",
        descriptionEn: "China's iconic UNESCO World Wonder stretching over thousands of miles. Paired with the majestic Forbidden City in Beijing, visitors experience the pinnacle of Ming and Qing dynasty imperial architecture and historical majesty.",
        descriptionAr: "إحدى عجائب الدنيا السبع وتراث اليونسكو العالمي الذي يمتد على آلاف الأميال. إلى جانب المدينة المحرمة المهيبة في بيكين، يستمتع الزوار بقمة العمارة الإمبراطورية لسلالتي مينغ وتشينغ.",
        descriptionZh: "举世闻名的联合国教科文组织世界遗产，全长数万公里。结合北京故宫紫禁城，向全球游客完美展现明清两朝皇家建筑的恢弘气度与深厚文化底蕴。",
        descriptionCkb: "یەکێک لە سەرسوڕهێنەرەکانی جیهان کە یونسکۆ تۆماری کردووە و بە هەزاران میلم درێژ دەبێتەوە. لەگەڵ شارە قەدەغەکراوەکەی پەکین، گەشتیاران سەرسام دەکات بە تەلارسازی ئیمپراتۆری مینگ و چینگ.",
        imageUrl: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=1000",
        bestTimeToVisit: "September - November (Autumn)",
        visaPolicy: "15/30-Day Tourist Visa & Group Tour Expedited Visa Protocols",
        flightInfo: "Direct flights from Baghdad and Erbil to Beijing Capital (PEK) & Daxing (PKX)",
        rating: 5.0,
        estimatedCost: "$1,200 - $2,200 / week",
        isFeatured: true,
        isTrending: true
      },
      {
        slug: "babylon-and-ishtar-gate",
        titleEn: "Ancient Babylon & Ishtar Gate Archaeological Complex",
        titleAr: "بابل الأثرية ومجمع بوابة عشتار الإمبراطوري",
        titleZh: "巴比伦古城与伊什塔尔门考古遗址",
        titleCkb: "بابل کۆن و دەروازەی عەشتار",
        city: "Hillah / Babylon",
        region: "IRAQ",
        category: "UNESCO_HERITAGE",
        descriptionEn: "The cradle of law, mathematics, and urban civilization. Walk through the reconstructed Ishtar Gate, the Processional Way, and the ruins of Hammurabi's kingdom along the Euphrates River.",
        descriptionAr: "مهد القوانين والرياضيات والحضارة الحضرية. تجول عبر بوابة عشتار المعاد بناؤها، وشارع الموكب، وأطلال مملكة حمورابي على ضفاف نهر الفرات.",
        descriptionZh: "人类法律、数学与城市文明的摇篮。踏足重建的伊什塔尔城门、巡游大道以及幼发拉底河畔汉谟拉比王朝的古巴比伦遗迹。",
        descriptionCkb: "بێشکەی یاسا و بیرکاری و شارستانیەتی شارستانی. پیاسە بکە لە دەروازەی عەشتار و شەقامی ڕێوڕەسمەکان و وێنەی نیشتمانی حەمورابی لەسەر ڕووباری فورات.",
        imageUrl: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=1000",
        bestTimeToVisit: "November - March",
        visaPolicy: "Iraq Visa on Arrival available for 37 countries including China at BGW Airport",
        flightInfo: "Baghdad International Airport (BGW) with daily private transfers to Babylon",
        rating: 4.8,
        estimatedCost: "$700 - $1,400 / week",
        isFeatured: true,
        isTrending: true
      },
      {
        slug: "xian-terracotta-army-silk-road",
        titleEn: "Xi'an Terracotta Warriors & Ancient Silk Road Terminal",
        titleAr: "محاربو التيرابوتا في شيآن وبداية طريق الحرير القديم",
        titleZh: "西安秦始皇兵马俑与古丝绸之路起点",
        titleCkb: "سوپای تێراکۆتای شیئان و سەرەتای ڕێگای ئاوریشمی کۆن",
        city: "Xi'an",
        region: "CHINA",
        category: "ANCIENT_SILK_ROAD",
        descriptionEn: "The eastern terminus of the ancient Silk Road that connected China to Mesopotamia and the Middle East. Home to the world-famous 8,000-man Emperor Qin Terracotta Army and the vibrant Muslim Quarter.",
        descriptionAr: "المحطة الشرقية لطريق الحرير القديم الذي ربط الصين ببلاد الرافدين والشرق الأوسط. موطن لجيش التيرابوتا المكون من 8000 جندي وإمبراطور تشين والحي الإسلامي النابض بالحياة.",
        descriptionZh: "连接中国与美索不达米亚（两河流域）及中东古丝绸之路的东方起点。拥有震慑寰宇的秦始皇陵兵马俑，以及历史悠久、美食荟萃的回坊街区。",
        descriptionCkb: "کۆتایی ڕۆژهەڵاتی ڕێگای ئاوریشمی کۆن کە چینی بە میسۆپۆتامیا و ڕۆژهەڵاتی ناوەڕاستەوە دەبەستەوە. نیشتمانی سوپای ٨٠٠٠ سەربازیی قین و گەڕەکی موسڵمانانی پڕ لە ژیان.",
        imageUrl: "https://images.unsplash.com/photo-1590059392209-69c6b8782a0b?auto=format&fit=crop&q=80&w=1000",
        bestTimeToVisit: "April - June & September - October",
        visaPolicy: "144-Hour Transit Visa-Free or Standard Chinese Tourist Visa",
        flightInfo: "High-speed rail connections from Beijing/Shanghai or direct flights to XIY",
        rating: 4.9,
        estimatedCost: "$900 - $1,600 / week",
        isFeatured: true,
        isTrending: true
      },
      {
        slug: "rawanduz-canyon-and-gali-ali-bag",
        titleEn: "Rawanduz Canyon & Gali Ali Bag Waterfalls",
        titleAr: "وادي رواندوز وشلالات كلي علي بك العظيمة",
        titleZh: "罗万杜兹大峡谷与阿里贝格瀑布群",
        titleCkb: "گەلی عەلی بەگ و گەرووی ڕواندز",
        city: "Rawanduz",
        region: "KURDISTAN",
        category: "NATURE_ADVENTURE",
        descriptionEn: "A dramatic alpine spectacle featuring sheer limestone cliffs, roaring waterfalls, cable cars, and lush mountain resorts. One of Kurdistan's most breathtaking natural wonders, featured on Iraqi currency notes.",
        descriptionAr: "مشهد طبيعي جبلي ساحر يتميز بمنحدرات كلسية حادة وشلالات هادرة وتلفريك ومنتجعات جبلية خضراء. إحدى أروع العجائب الطبيعية في كوردستان والمطبوعة على العملة العراقية.",
        descriptionZh: "震撼无比的高山峡谷绝景，拥有陡峭的石灰岩悬崖、轰鸣的瀑布、高空索道与绿意盎然的山地度假胜地。是库尔德斯坦最壮丽的自然奇观，印于伊拉克货币之上。",
        descriptionCkb: "دیمەنێکی سروشتی چیایی زۆر جوان بە هەڵدێرە بەردینەکان، تاڤگەی بەهێز، تەپەک و سەیرانگەی چیایی. یەکێک لە سەرسوڕهێنەرترین دیمەنەکانی کوردستان کە لەسەر دراوی عێراقی نەقش کراوە.",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1000",
        bestTimeToVisit: "March - June (Blooming Season)",
        visaPolicy: "Standard Kurdistan Region Entry Stamp / E-Visa",
        flightInfo: "Scenic 2-hour road travel from Erbil Airport via Hamilton Road",
        rating: 4.9,
        estimatedCost: "$500 - $900 / week",
        isFeatured: true,
        isTrending: false
      },
      {
        slug: "mesopotamian-marshes-ahwar",
        titleEn: "The Mesopotamian Marshes (Ahwar Sanctuary)",
        titleAr: "الأهوار العرقية - جنيات المائية اليونسكو",
        titleZh: "美索不达米亚沼泽地湿地自然遗产",
        titleCkb: "زۆنگاوەکانی عێراق (ئەهوار)",
        city: "Chibayish / Basra",
        region: "IRAQ",
        category: "UNESCO_HERITAGE",
        descriptionEn: "The floating wetlands of southern Iraq, where Marsh Arabs live in traditional arched reed houses (Mudhif) and navigate waterways on Mashoof canoes alongside water buffaloes and migratory birds.",
        descriptionAr: "الأراضي الرطبة العائمة في جنوب العراق، حيث يعيش عرب الأهوار في بيوت القصب التقليدية (المضيف) ويزورون الممرات المائية بالمشوف جنبًا إلى جنب مع الجواميس والطيور المهاجرة.",
        descriptionZh: "伊拉克南部的流动湿地遗产。美索不达米亚沼泽阿拉伯人居住于传统的芦苇拱形房屋（Mudhif）中，划着Mashoof独木舟与水牛、候鸟相伴。",
        descriptionCkb: "زۆنگاوە شناوەکانی باشووری عێراق کە عەرەبی ئەهوار لە خانووی پەڕی (مەزیف) دەژین و بە بەلەمی مەشوف لە نێوان گامێش و باڵندە کۆچەرییەکان گەشت دەکەن.",
        imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=1000",
        bestTimeToVisit: "October - April",
        visaPolicy: "Iraq Visa on Arrival available for tourist and official delegations",
        flightInfo: "Direct flights to Basra Airport (BSR) or Najaf (NJF) with guided ecotours",
        rating: 4.8,
        estimatedCost: "$600 - $1,100 / week",
        isFeatured: true,
        isTrending: false
      },
      {
        slug: "chengdu-panda-base-and-gastronomy",
        titleEn: "Chengdu Giant Panda Sanctuary & Sichuan Gastronomy",
        titleAr: "محمية الدببة الباندا في تشنغدو ومأكولات سيتشوان",
        titleZh: "成都大熊猫繁育研究基地与川菜美食之都",
        titleCkb: "سەنتەری پاندای چیەنگدو و چێشتی سیچوان",
        city: "Chengdu",
        region: "CHINA",
        category: "GASTRONOMY",
        descriptionEn: "UNESCO City of Gastronomy and home to the world's largest breeding center for giant pandas. Visitors experience spicy hotpot, tea house culture, and close encounters with giant pandas and red pandas.",
        descriptionAr: "مدينة اليونسكو لتذوق الطعام وموطن لأكبر مركز لتربية الدببة الباندا العملاقة في العالم. يستمتع الزوار بوجبات الهوت بوت الحارة وثقافة المقاهي وتجربة مشاهدة الباندا.",
        descriptionZh: "联合国教科文组织评选的“美食之都”，拥有全球最大的大熊猫繁育研究基地。在这里，游客可近距离观赏可爱大熊猫，品味正宗四川麻辣火锅与悠闲茶馆文化。",
        descriptionCkb: "شاری خۆراکی یونسکۆ و نیشتمانی گەورەترین سەنتەری پەروەردەکردنی پاندای مەزن. گەشتیاران دەتوانن سەردانی پاندای مەزن بکەن و تام لە چێشتی سیچوان و چاخانەکان وەربگرن.",
        imageUrl: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef9?auto=format&fit=crop&q=80&w=1000",
        bestTimeToVisit: "March - June & September - November",
        visaPolicy: "Standard Chinese Visa / 144-Hour Transit Policy at TFU/CTU",
        flightInfo: "Direct international hubs with Chengdu Tianfu Airport (TFU)",
        rating: 4.9,
        estimatedCost: "$850 - $1,500 / week",
        isFeatured: true,
        isTrending: true
      },
      {
        slug: "sulaymaniyah-amadiya-fortress",
        titleEn: "Amadiya Mountain Fortress & Sulaymaniyah Cultural Capital",
        titleAr: "قلعة العمادية الجبلية وسليمانية العاصمة الثقافية",
        titleZh: "阿马迪亚悬崖城堡与苏莱曼尼亚文化之都",
        titleCkb: "قەڵای ئامێدی و سلێمانی پایتەختی ڕۆشنبیری",
        city: "Sulaymaniyah & Amadiya",
        region: "KURDISTAN",
        category: "CULTURAL_EXCHANGE",
        descriptionEn: "Perched dramatically on a flat mountain plateau 1,400 meters above sea level, Amadiya dates back to the Assyrian era. Nearby Sulaymaniyah offers UNESCO Creative City literature festivals and modern arts.",
        descriptionAr: "تقع قلعة العمادية بمهابة على هضبة جبلية مسطحة تعلو 1400 متر عن سطح البحر، وتعود للحضارة الآشورية. وتوفر مدينة السليمانية المجاورة المهرجانات الأدبية والفنية.",
        descriptionZh: "高耸于海拔1400米山顶平原之上的阿马迪亚古城，可追溯至古亚述时期。邻近的“文化之都”苏莱曼尼亚则汇聚了联合国教科文组织创意文学节与现代艺术展。",
        descriptionCkb: "قەڵای ئامێدی لەسەر ڕووبەرێکی تەختی چیایی ١٤٠٠ مەتر بەرز لە ئاستی دەریاوە وەستاوە کە مێژووەکەی دەگەڕێتەوە بۆ سەردەمی ئاشووری. سلێمانیش پایتەختی ڕۆشنبیری و ئەدەبە.",
        imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000",
        bestTimeToVisit: "April - October",
        visaPolicy: "Kurdistan Entry Permit / E-Visa System",
        flightInfo: "Sulaymaniyah International Airport (ISU) with daily flights to Erbil & Baghdad",
        rating: 4.9,
        estimatedCost: "$500 - $950 / week",
        isFeatured: true,
        isTrending: false
      }
    ];

    for (const item of spots) {
      await prisma.tourismSpot.create({
        data: item
      });
    }

    console.log(`[TourismSeeder] Successfully seeded ${spots.length} tourism spots.`);
  } catch (error) {
    console.error("[TourismSeeder] Failed to seed tourism spots:", error);
  }
}
