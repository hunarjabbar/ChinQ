import { prisma } from "./db.js";

export async function seedVisaFlights() {
  try {
    const count = await prisma.visaFlight.count();
    if (count > 0) {
      console.log(`[VisaFlightSeeder] Found ${count} Visa & Flight records in database.`);
      return;
    }

    console.log("[VisaFlightSeeder] Seeding Visa & Flight services for China, Iraq, and Kurdistan Region...");

    const items = [
      {
        slug: "china-iraq-kurdistan-evisa-express",
        titleEn: "Sino-Iraqi & Kurdistan Diplomatic E-Visa & Visa on Arrival Protocol",
        titleAr: "بروتوكول التأشيرة الإلكترونية والتأشيرة عند الوصول بين الصين والعراق وإقليم كردستان",
        titleZh: "中伊与库尔德斯坦电子签证与落地签双向绿色通道",
        titleCkb: "پڕۆتۆکۆڵی ڤیزای ئەلیکترۆنی و ڤیزای کاتی گەیشتن لەنێوان چین، عێراق و هەرێمی کوردستان",
        serviceType: "VISA_ASSISTANCE",
        originRegion: "CHINA",
        destinationRegion: "BILATERAL",
        summaryEn: "Expedited consular visa support, multi-entry business visas, and instant E-Visa clearance for Chinese citizens traveling to Baghdad and Erbil, as well as Iraqi business delegates visiting Guangzhou, Beijing, and Shanghai.",
        summaryAr: "تسهيلات قنصلية سريعة، تأشيرات تجارية متعددة السفرات، وتخليص فوري للتأشيرة الإلكترونية للمواطنين الصينيين القادمين إلى بغداد وأربيل، والوفود العراقية الزائرة للصين.",
        summaryZh: "为赴巴格达、埃尔比勒等地的中国公民及赴广州、北京、上海考察的中伊商务代表团提供快速领事签证协助、多年多次往返商务签及电子签便利。",
        summaryCkb: "تسهیلاتی دەستبەجێی قونسوڵی و ڤیزای بازرگانی فرە-گەشت بۆ هاووڵاتیانی چین بۆ بەغدا و هەولێر، وە شاندی بازرگانی عێراق بۆ چین.",
        detailsEn: "Under the bilateral economic partnership agreement, travelers holding diplomatic, official, or business passports enjoy priority consular processing within 24-48 hours. E-Visas are available online, with Visa-on-Arrival accessible at Baghdad International Airport (BGW) and Erbil International Airport (EBL) for pre-approved commercial delegations.",
        detailsAr: "بموجب اتفاقية الشراكة الاقتصادية الثنائية، يتمتع المسافرون بحفز قنصلي ذي أولوية خلال 24-48 ساعة. تتوفر التأشيرة الإلكترونية عبر الإنترنت مع خيار التأشيرة عند الوصول في مطاري بغداد وأربيل الدوليين للوفود التجارية المعتمدة.",
        detailsZh: "根据中伊经济合作协议，持有外交、公务与商务护照者享有24-48小时领事特快审核。电子签证在线申请开通，且经预先报备的法团及投资代表团可在巴格达国际机场（BGW）及埃尔比勒国际机场（EBL）办理落地签证。",
        detailsCkb: "بەپێی ڕێککەوتنی ئابووری دووقۆڵی، گەشتیاران و خاوەن پاسپۆڕتی بازرگانی لەماوەی ٢٤-٤٨ کاتژمێردا ڤیزا وەردەگرن، لەگەڵ ڤیزای سەر خاڵی بەیەکگەیشتن لە فرۆکەخانەکانی بەغدا و هەولێر.",
        airlineOrAuthority: "Ministry of Foreign Affairs & Consular Affairs Secretariat",
        processingTime: "24 - 48 Hours E-Visa Clearance",
        feeOrCost: "Consular E-Visa Fee: $75 USD",
        imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000",
        officialLink: "https://evisa.iq",
        isFeatured: true,
        isTrending: true
      },
      {
        slug: "guangzhou-erbil-baghdad-direct-charters",
        titleEn: "Guangzhou & Beijing to Baghdad & Erbil Direct Flight Routes",
        titleAr: "الرحلات الجوية المباشرة بين غوانغتشو وبكين وبغداد وأربيل",
        titleZh: "广州/北京 至 巴格达/埃尔比勒 中伊直飞包机与航线网络",
        titleCkb: "گەشتە ڕاستەوخۆکانی ئاسمانی لەنێوان گوانگژۆ، پەکین، بەغدا و هەولێر",
        serviceType: "FLIGHT_ROUTE",
        originRegion: "CHINA",
        destinationRegion: "KURDISTAN",
        summaryEn: "Direct passenger & cargo flights connecting Guangzhou Baiyun (CAN) and Beijing Capital (PEK) directly with Erbil International Airport (EBL) and Baghdad (BGW) operated by Iraqi Airways & China Southern.",
        summaryAr: "رحلات ركاب وشحن مباشرة تربط مطار غوانغتشو بايون ومطار بكين العاصمة بمطاري أربيل وبغداد الدوليين عبر الخطوط الجوية العراقية والصينية.",
        summaryZh: "由伊拉克航空与中国南方航空联合运营的定期客货运直飞航线，连接广州白云（CAN）、北京首都（PEK）与埃尔比勒国际机场（EBL）、巴格达（BGW）。",
        summaryCkb: "گەشتە ڕاستەوخۆکانی نێوان گوانگژۆ و پەکین لەگەڵ فرۆکەخانەی نێودەوڵەتی هەولێر و بەغدا لەلایەن هێڵی ئاسمانی عێراقی و باشووری چین.",
        detailsEn: "Weekly direct flights provide seamless transit for business leaders, tourists, and diplomatic missions. Flight duration averages 8.5 hours with generous baggage allowance (2x23kg in Economy, 2x32kg in Business), equipped with full bi-lingual onboard support and cargo freight dispatching.",
        detailsAr: "توفر الرحلات المباشرة الأسبوعية تنقلاً سلسًا لرجال الأعمال والسياح والبعثات الدبلوماسية. يبلغ متوسط مدة الرحلة 8.5 ساعة مع وزن أمتعة سخي (قطعتان 23 كغم في السياحية، وقطعتان 32 كغم في رجال الأعمال).",
        detailsZh: "每周定期直飞航班为两国客商、文旅团体与外交使团提供无缝直达体验。单程飞行约8.5小时，提供高标准行李额度（经济舱2x23公斤，商务舱2x32公斤），并支持中/阿/库三语机舱服务与客舱速递货运。",
        detailsCkb: "گەشتە ڕاستەوخۆ هەفتەیییەکان بە ماوەی ٨.٥ کاتژمێر گەشتیاران دەگەیەنن بە خزمەتگوزاری سەر فرۆکە بە سێ زمان.",
        airlineOrAuthority: "Iraqi Airways & China Southern Airlines Joint Fleet",
        processingTime: "8.5 Hours Non-Stop Direct Flight",
        feeOrCost: "Roundtrip Economy from $680 USD",
        imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1000",
        officialLink: "https://iraqiairways.iq",
        isFeatured: true,
        isTrending: true
      },
      {
        slug: "erbil-international-airport-fasttrack-desk",
        titleEn: "Erbil International Airport (EBL) Sino-Kurdish Diplomatic & Visa Concierge",
        titleAr: "مكتب التسهيلات القنصلية والفيزا الخاصة بالصين في مطار أربيل الدولي",
        titleZh: "埃尔比勒国际机场（EBL）中库商务与领事礼遇快捷服务中心",
        titleCkb: "نووسینگەی خێراکردنی ڤیزا و قونسوڵی لە فرۆکەخانەی نێودەوڵەتی هەولێر",
        serviceType: "CONSULAR_GUIDE",
        originRegion: "KURDISTAN",
        destinationRegion: "CHINA",
        summaryEn: "Dedicated VIP immigration counter, language assistance, and fast-track clearance for Chinese investors, engineering delegations, and academic scholars arriving in Kurdistan Region.",
        summaryAr: "منفذ هجرة مخصص للشخصيات المرموقة، مساعدة لغوية، وتخليص سريع للمستثمرين الصينيين والوفود الهندسية والأكاديمية القادمة لإقليم كردستان.",
        summaryZh: "设于埃尔比勒国际机场航站楼的专有绿色通道，为抵库的中国投资人、工程建设团队与学者提供中文引导、快速入境边检及落地签核验服务。",
        summaryCkb: "کاونتەری تایبەتی لە فرۆکەخانەی هەولێر بۆ پێشوازیکردن و ئاسانکاری پاسپۆڕت و ئاخاوتن بە زمانی چینی بۆ وەبەرهێنەران.",
        detailsEn: "Located in the main arrival terminal of Erbil International Airport, the Sino-Kurdish Concierge Desk facilitates instant immigration processing, SIM card provisioning, airport transfer arrangement, and direct coordination with the Chinese Consulate General in Erbil.",
        detailsAr: "يقع مكتب التسهيلات في صالة الوصول الرئيسية بمطار أربيل الدولي، ويسهل المعاملات الفورية للهجرة، توفير شرائح الاتصال، ترتيب التنقلات، والتنسيق المباشر مع القنصلية الصينية العامة في أربيل.",
        detailsZh: "位于埃尔比勒国际机场到达大厅，为入境旅客提供即时边检快速通关、当地SIM卡发放、专车接送预订以及与中国驻埃尔比勒总领事馆的领事保护联动服务。",
        detailsCkb: "کاونتەرەکە لە هۆڵی گەیشتنی فرۆکەخانەی هەولێرە و خزمەتگوزاری ئاسانکاری پەیوەندی و پەڕینەوە پێشکەش دەکات.",
        airlineOrAuthority: "Erbil International Airport Aviation Authority",
        processingTime: "15 Minutes Terminal Fast-Track",
        feeOrCost: "Complimentary for Pre-Registered Delegations",
        imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1000",
        officialLink: "https://erbilairport.com",
        isFeatured: true,
        isTrending: true
      },
      {
        slug: "sino-iraqi-travel-logistics-publication-2026",
        titleEn: "Sino-Iraqi & Kurdistan Civil Aviation & Travel Logistics Handbook 2026",
        titleAr: "دليل اللوجستيات والطيران والتعليمات القنصلية بين الصين والعراق وكردستان 2026",
        titleZh: "《2026年中伊与库尔德斯坦民航物流及领事出行法条白皮书》",
        titleCkb: "کتێبی ڕێنمایی لۆجیستی گەشتوگوزار و فڕۆکەوانی عێراق، چین و کوردستان 2026",
        serviceType: "TRAVEL_PUBLICATION",
        originRegion: "BILATERAL",
        destinationRegion: "BILATERAL",
        summaryEn: "Official academic monograph & practical travel manual detailing customs regulations, duty-free exemptions, visa policies, flight routing options, and bilateral consular hotlines.",
        summaryAr: "دراسة أكاديمية رسمية ودليل عملي يفصل لوائح الجمارك، الإعفاءات الضريبية، سياسات التأشيرة، خيارات الطيران، وأرقام الطوارئ القنصلية.",
        summaryZh: "由中伊双边智库及民航联合撰写的权威指南，全方位解答海关检验检疫、免税申报、签证类型对照、航班接驳与领事保护急救热线。",
        summaryCkb: "بڵاوکراوەیەکی ئەکادیمی و یاسایی کە ڕێنماییەکانی گومرک و ڤیزا و هێڵە گەرمەکانی قونسوڵی ڕووندەکاتەوە.",
        detailsEn: "Published jointly by the Sino-Iraqi Bilateral Bureau and Civil Aviation Authorities. Contains downloadable PDF compliance checklists, transit maps through Dubai/Doha/Istanbul, and step-by-step visa sponsorship verification guides for commercial chambers.",
        detailsAr: "صادر بالاشتراك بين المكتب الثنائي الصيني العراقي وسلطات الطيران المدني. يحتوي على قوائم مراجعة قابلة للتنزيل، خرائط الترانزيت عبر دبي والدوحة وإسطنبول، ودليل التحقق من التأشيرات التجاريه.",
        detailsZh: "由中伊双边局与民航主管机关联合发布。包含海关申报清单PDF、经由迪拜/多哈/伊斯坦布尔的中续联运路线图，以及商会招商邀请函的核验流程。",
        detailsCkb: "لەلایەن مەکتەبی دووقۆڵی عێراقی-چینی بڵاوکراوەتەوە و نەخشەی پەڕینەوە و خزمەتگوزاری پی دی ئێف لەخۆدەگرێت.",
        airlineOrAuthority: "Sino-Iraqi Academic & Aviation Publishing Board",
        processingTime: "Instant Digital Download (PDF)",
        feeOrCost: "Free Open Access Academic Publication",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000",
        officialLink: "https://chinq.org/publications/aviation-guide-2026.pdf",
        isFeatured: true,
        isTrending: true
      },
      {
        slug: "business-green-channel-iraqi-investors-china",
        titleEn: "Iraqi & Kurdish Business Delegation Multi-Entry China Visa Green Channel",
        titleAr: "القناة الخضراء لتأشيرات الصين متعددة السفرات لرجال الأعمال العراقيين والكرد",
        titleZh: "伊拉克与库尔德斯坦商务考察团赴华M/F多重入境签证绿色通道",
        titleCkb: "کەناڵی سەوز بۆ وەرگرتنی ڤیزای فرە-گەشتی چین بۆ بازرگانانی عێراق و کوردستان",
        serviceType: "PASSPORT_DIPLOMATIC",
        originRegion: "IRAQ",
        destinationRegion: "CHINA",
        summaryEn: "Dedicated M (Commercial) and F (Non-Commercial Visit) multi-year visa assistance for accredited Iraqi chamber members and Kurdish trade missions visiting Canton Fair, Yiwu, and Shanghai Trade Summits.",
        summaryAr: "تسهيلات التأشيرة التجارية متعددة السنوات لأعضاء الغرف التجارية العراقية والبعثات التجارية الكردية الزائرة لمعرض كانتون، وإيوو، وقمم التجارة في شانغهاي.",
        summaryZh: "为经伊拉克商会及库尔德斯坦工商会认证的持证企业代表提供1至3年多次往返（M/F类）赴华商务签证加速审核，免去繁琐重复材料提交。",
        summaryCkb: "تسهیلاتی تایبەت بۆ وەرگرتنی ڤیزای ١ بۆ ٣ ساڵی فرە-گەشتی چین بۆ ئەندامانی ژووری بازرگانی عێراق و کوردستان.",
        detailsEn: "In partnership with the Chinese Embassy in Baghdad and Chinese Consulate General in Erbil, qualified business representatives enjoy streamlined document verification, biometrics appointment priority, and expedited 3-day passport return for trade exhibitions.",
        detailsAr: "بالشراكة مع السفارة الصينية في بغداد والقنصلية العامة الصينية في أربيل، يتمتع ممثلو الشركات المؤهلون بالتحقق المبسط من المستندات، وأولوية حجز البصمات، وإعادة الجواز في غضون 3 أيام.",
        detailsZh: "与中国驻伊拉克大使馆及中国驻埃尔比勒总领事馆合作，经认可的企业高管享有指纹采集优先预约、免交重复流水及3个工作日特快发签服务。",
        detailsCkb: "بە هەماهەنگی لەگەڵ باڵیۆزخانەی چین لە بەغدا و قونسوڵگەری چین لە هەولێر، بەڵگەنامەکان لە ۳ ڕۆژدا پەسەند دەکرێن.",
        airlineOrAuthority: "Chinese Embassy Baghdad & Consulate General Erbil",
        processingTime: "3 Business Days Priority Processing",
        feeOrCost: "Standard Embassy Consular Tariff",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
        officialLink: "http://erbil.china-consulate.gov.cn",
        isFeatured: true,
        isTrending: true
      },
      {
        slug: "air-china-cargo-express-baghdad-shanghai",
        titleEn: "Air China Cargo & Express Flight Logistics: Baghdad <-> Shanghai",
        titleAr: "الشحن الجوي واللوجستيات السريعة لطيران الصين: بغداد <-> شانغهاي",
        titleZh: "中国国际航空（Air China）上海 <-> 巴格达 货运与急件航线",
        titleCkb: "شەقامی ئاسمانی و لۆجیستی بارکردنی کاڵاکان لەنێوان بەغدا و شانغهای",
        serviceType: "FLIGHT_ROUTE",
        originRegion: "CHINA",
        destinationRegion: "IRAQ",
        summaryEn: "Heavy freight, high-tech equipment dispatch, and express medical/industrial cargo transit bridging Shanghai Pudong (PVG) and Baghdad International Airport (BGW).",
        summaryAr: "شحن البضائع الثقيلة، المعدات التقنية العالية، الشحنات الطبية والصناعية السريعة بين شانغهاي بودونغ ومطار بغداد الدولي.",
        summaryZh: "连接上海浦东（PVG）与巴格达（BGW）的大型货运与高科技设备急件专线，支持冷链医药、精密电子设备与基础设施物资空运。",
        summaryCkb: "ناردنی کەلوپەلی قورس و بەرهەمە تەکنەلۆجییەکان لەنێوان شانغهای و بەغدا.",
        detailsEn: "Operates 3 times weekly utilizing Boeing 777-F freighters. Includes customs bonded warehousing at both ends, express clearance protocols for petroleum and telecommunication engineers, and live temperature tracking for pharmaceutical shipments.",
        detailsAr: "تعمل 3 مرات أسبوعياً باستخدام طائرات بويينغ 777 للشحن. تتضمن مستودعات جمركية معتمدة في كلا الطرفين، بروتوكولات تخليص سريع لمهندسي النفط والاتصالات.",
        detailsZh: "每周3班波音777全货机。提供两端保税仓储、石油与通信工程物资快速通关，以及医药冷链温控实时监控。",
        detailsCkb: "هەفتانە ٣ گەشت ئەنجام دەدرێت بۆ گواستنەوەی کەلوپەل و کاڵاکان بە فڕۆکەی بۆینگ ٧٧٧.",
        airlineOrAuthority: "Air China Cargo Division & Iraqi Civil Aviation Authority",
        processingTime: "24 Hours Freight Transit Time",
        feeOrCost: "Custom Freight Quote per Kg",
        imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1000",
        officialLink: "https://airchina.com",
        isFeatured: true,
        isTrending: true
      }
    ];

    for (const item of items) {
      await prisma.visaFlight.create({ data: item });
    }

    console.log(`[VisaFlightSeeder] Successfully seeded ${items.length} Visa & Flight items.`);
  } catch (error) {
    console.error("[VisaFlightSeeder] Error seeding Visa & Flight data:", error);
  }
}
