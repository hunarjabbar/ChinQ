import { prisma } from './db.js';

const mockArticles = [
  {
    slug: 'bafel-talabani-baghdad-meetings',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop',
    translations: [
      {
        lang: 'en',
        title: 'Bafel Talabani Concludes Strategic Meetings in Baghdad',
        excerpt: 'PUK President Bafel Jalal Talabani discusses political stability and economic cooperation with federal leaders.',
        content: 'Baghdad — PUK President Bafel Jalal Talabani has wrapped up a series of high-level meetings in Baghdad. The discussions focused on reinforcing political stability across Iraq and securing the constitutional rights of the Kurdistan Region within the federal framework. Talabani emphasized the importance of unified national dialogue to address ongoing economic challenges and infrastructure development.'
      },
      {
        lang: 'ar',
        title: 'بافل طالباني يختتم اجتماعات استراتيجية في بغداد',
        excerpt: 'رئيس الاتحاد الوطني الكردستاني بافل جلال طالباني يناقش الاستقرار السياسي والتعاون الاقتصادي مع القادة الاتحاديين.',
        content: 'بغداد — اختتم رئيس الاتحاد الوطني الكردستاني، بافل جلال طالباني، سلسلة من الاجتماعات رفيعة المستوى في بغداد. ركزت المناقشات على تعزيز الاستقرار السياسي في جميع أنحاء العراق وتأمين الحقوق الدستورية لإقليم كردستان ضمن الإطار الاتحادي. وشدد طالباني على أهمية الحوار الوطني الموحد لمواجهة التحديات الاقتصادية المستمرة.'
      },
      {
        lang: 'zh',
        title: '巴菲尔·塔拉巴尼结束在巴格达的战略会谈',
        excerpt: '库尔德斯坦爱国联盟主席巴菲尔·贾拉勒·塔拉巴尼与联邦领导人讨论政治稳定与经济合作。',
        content: '巴格达 — 库尔德斯坦爱国联盟（PUK）主席巴菲尔·贾拉勒·塔拉巴尼刚刚结束了在巴格达的一系列高层会晤。会谈重点是巩固伊拉克全国的政治稳定，并在联邦框架内保障库尔德斯坦地区的宪法权利。塔拉巴尼强调了统一全国对话对于应对持续的经济挑战和基础设施发展的重要性。'
      },
      {
        lang: 'ckb',
        title: 'بافڵ تاڵەبانی کۆبوونەوە ستراتیژییەکانی لە بەغدا کۆتایی پێهێنا',
        excerpt: 'سەرۆکی یەکێتیی نیشتمانیی کوردستان بافڵ جەلال تاڵەبانی گفتوگۆ لەسەر سەقامگیری سیاسی و هاوکاری ئابووری دەکات لەگەڵ سەرکردە فیدراڵییەکان.',
        content: 'بەغدا — سەرۆکی یەکێتیی نیشتمانیی کوردستان، بافڵ جەلال تاڵەبانی، کۆتایی بە زنجیرەیەک کۆبوونەوەی ئاست بەرز هێنا لە بەغدا. گفتوگۆکان تیشکیان خستە سەر بەهێزکردنی سەقامگیری سیاسی لە سەرتاسەری عێراق و دەستەبەرکردنی مافە دەستوورییەکانی هەرێمی کوردستان لە چوارچێوەی فیدراڵیدا.'
      }
    ]
  },
  {
    slug: 'qubad-talabani-digital-transformation',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
    translations: [
      {
        lang: 'en',
        title: 'Qubad Talabani Launches New E-Governance Initiative',
        excerpt: 'Deputy Prime Minister Qubad Talabani announces next phase of digital transformation for KRG services.',
        content: 'Erbil — Deputy Prime Minister Qubad Talabani has officially launched the next phase of the Kurdistan Regional Government\'s digital transformation initiative. The new framework aims to streamline public services, reduce bureaucratic delays, and increase transparency. Talabani highlighted that modernizing the administrative sector is crucial for attracting foreign investment and stimulating local economic growth.'
      },
      {
        lang: 'ar',
        title: 'قوباد طالباني يطلق مبادرة جديدة للحوكمة الإلكترونية',
        excerpt: 'نائب رئيس الوزراء قوباد طالباني يعلن عن المرحلة التالية من التحول الرقمي لخدمات حكومة إقليم كردستان.',
        content: 'أربيل — أطلق نائب رئيس الوزراء قوباد طالباني رسمياً المرحلة التالية من مبادرة التحول الرقمي لحكومة إقليم كردستان. يهدف الإطار الجديد إلى تبسيط الخدمات العامة وتقليل التأخير البيروقراطي وزيادة الشفافية. وأبرز طالباني أن تحديث القطاع الإداري أمر بالغ الأهمية لجذب الاستثمار الأجنبي.'
      },
      {
        lang: 'zh',
        title: '库巴德·塔拉巴尼启动新的电子政务倡议',
        excerpt: '副总理库巴德·塔拉巴尼宣布库尔德斯坦地区政府服务数字转型的下一阶段。',
        content: '埃尔比勒 — 副总理库巴德·塔拉巴尼正式启动了库尔德斯坦地区政府数字转型倡议的下一阶段。新框架旨在简化公共服务，减少官僚延误并提高透明度。塔拉巴尼强调，政府行政部门的现代化对于吸引外资和刺激当地经济增长至关重要。'
      },
      {
        lang: 'ckb',
        title: 'قوباد تاڵەبانی دەستپێشخەرییەکی نوێی بۆ حکومەتی ئەلیکترۆنی ڕاگەیاند',
        excerpt: 'جێگری سەرۆک وەزیران قوباد تاڵەبانی قۆناغی داهاتووی وەرچەرخانی دیجیتاڵی بۆ خزمەتگوزارییەکانی حکومەتی هەرێم ڕادەگەیەنێت.',
        content: 'هەولێر — جێگری سەرۆک وەزیران قوباد تاڵەبانی بە فەرمی قۆناغی داهاتووی دەستپێشخەری وەرچەرخانی دیجیتاڵی حکومەتی هەرێمی کوردستانی ڕاگەیاند. ئامانج لە چوارچێوە نوێیەکە ئاسانکاریکردنە بۆ خزمەتگوزارییە گشتییەکان، کەمکردنەوەی ڕۆتین و زیادکردنی شەفافیەت.'
      }
    ]
  },
  {
    slug: 'masoud-barzani-regional-security-talks',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop',
    translations: [
      {
        lang: 'en',
        title: 'Masoud Barzani Hosts Diplomatic Delegation on Regional Security',
        excerpt: 'KDP Leader Masoud Barzani meets with international envoys to discuss stability in the Middle East.',
        content: 'Pirmam — Leader Masoud Barzani received a high-level diplomatic delegation today to discuss the evolving security landscape in the Middle East. The talks centered on the necessity of combating terrorism and ensuring that the Kurdistan Region remains a haven of peace. Barzani reiterated his commitment to fostering strong bilateral relations with global partners to support regional development.'
      },
      {
        lang: 'ar',
        title: 'مسعود بارزاني يستضيف وفداً دبلوماسياً حول الأمن الإقليمي',
        excerpt: 'زعيم الحزب الديمقراطي الكردستاني مسعود بارزاني يلتقي بمبعوثين دوليين لمناقشة الاستقرار في الشرق الأوسط.',
        content: 'پیرمام — استقبل الزعيم مسعود بارزاني اليوم وفداً دبلوماسياً رفيع المستوى لمناقشة المشهد الأمني المتطور في الشرق الأوسط. وتركزت المحادثات على ضرورة مكافحة الإرهاب وضمان بقاء إقليم كردستان ملاذاً للسلام. وجدد بارزاني التزامه بتعزيز العلاقات الثنائية القوية.'
      },
      {
        lang: 'zh',
        title: '马苏德·巴尔扎尼主持关于地区安全的重大外交会谈',
        excerpt: '库尔德民主党领导人马苏德·巴尔扎尼会见国际使节，讨论中东地区的稳定问题。',
        content: '皮尔马姆 — 领导人马苏德·巴尔扎尼今日会见了一个高级外交代表团，讨论中东地区不断发展的安全局势。会谈的中心是打击恐怖主义的必要性，并确保库尔德斯坦地区继续成为和平的避风港。巴尔扎尼重申他致力于与全球伙伴培育强有力的双边关系。'
      },
      {
        lang: 'ckb',
        title: 'مەسعود بارزانی پێشوازی لە شاندێکی دیپلۆماسی دەکات بۆ گفتوگۆکردن لەسەر ئاسایشی ناوچەکە',
        excerpt: 'سەرۆک مەسعود بارزانی لەگەڵ نێردە نێودەوڵەتییەکان کۆدەبێتەوە بۆ تاوتوێکردنی سەقامگیری لە ڕۆژهەڵاتی ناوەڕاست.',
        content: 'پیرمام — سەرۆک مەسعود بارزانی ئەمڕۆ پێشوازی لە شاندێکی دیپلۆماسی ئاست بەرز کرد بۆ تاوتوێکردنی گۆڕانکارییەکانی دۆخی ئەمنی لە ڕۆژهەڵاتی ناوەڕاست. گفتوگۆکان تیشکیان خستە سەر پێویستی بەرەنگاربوونەوەی تیرۆر و دڵنیابوون لەوەی هەرێمی کوردستان وەک ئارامگایەک دەمێنێتەوە.'
      }
    ]
  },
  {
    slug: 'masrour-barzani-infrastructure-projects',
    imageUrl: 'https://images.unsplash.com/photo-1541888052140-59dc93539169?q=80&w=1200&auto=format&fit=crop',
    translations: [
      {
        lang: 'en',
        title: 'PM Masrour Barzani Lays Foundation for Strategic Highway',
        excerpt: 'Prime Minister Masrour Barzani inaugurates a key infrastructure project aimed at boosting trade.',
        content: 'Duhok — Kurdistan Region Prime Minister Masrour Barzani laid the foundation stone for a new strategic highway today. The project is designed to significantly improve connectivity and facilitate trade between major cities. During the ceremony, the Prime Minister emphasized the government\'s ongoing dedication to economic diversification and improving the daily lives of citizens through robust infrastructure.'
      },
      {
        lang: 'ar',
        title: 'رئيس الوزراء مسرور بارزاني يضع حجر الأساس لطريق سريع استراتيجي',
        excerpt: 'رئيس الوزراء مسرور بارزاني يفتتح مشروعاً رئيسياً للبنية التحتية يهدف إلى تعزيز التجارة.',
        content: 'دهوك — وضع رئيس وزراء إقليم كردستان، مسرور بارزاني، اليوم حجر الأساس لطريق سريع استراتيجي جديد. تم تصميم المشروع لتحسين الاتصال بشكل كبير وتسهيل التجارة بين المدن الرئيسية. وخلال الحفل، أكد رئيس الوزراء على تفاني الحكومة في التنويع الاقتصادي.'
      },
      {
        lang: 'zh',
        title: '总理马斯鲁尔·巴尔扎尼为战略公路奠基',
        excerpt: '总理马斯鲁尔·巴尔扎尼为一个旨在促进贸易的关键基础设施项目揭幕。',
        content: '杜胡克 — 库尔德斯坦地区总理马斯鲁尔·巴尔扎尼今日为一条新的战略高速公路奠基。该项目旨在大幅改善连通性，并促进主要城市之间的贸易。在仪式上，总理强调了政府致力于经济多元化，并通过强大的基础设施改善公民的日常生活。'
      },
      {
        lang: 'ckb',
        title: 'سەرۆک وەزیران مەسرور بارزانی بەردی بناغەی ڕێگایەکی خێرای ستراتیژی دانا',
        excerpt: 'سەرۆک وەزیران مەسرور بارزانی پرۆژەیەکی گرنگی ژێرخانی کردەوە کە ئامانج لێی بوژاندنەوەی بازرگانییە.',
        content: 'دهۆک — مەسرور بارزانی، سەرۆک وەزیرانی هەرێمی کوردستان، ئەمڕۆ بەردی بناغەی ڕێگایەکی خێرای ستراتیژی نوێی دانا. پرۆژەکە وا دیزاین کراوە کە پەیوەندییەکان باشتر بکات و ئاسانکاری بۆ بازرگانی نێوان شارە گەورەکان بکات. لە کاتی مەراسیمەکەدا، سەرۆک وەزیران جەختی لەسەر هەوڵەکانی حکومەت کردەوە.'
      }
    ]
  },
  {
    slug: 'xi-jinping-belt-and-road-expansion',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop',
    translations: [
      {
        lang: 'en',
        title: 'President Xi Jinping Outlines Next Phase of Belt and Road Initiative',
        excerpt: 'Chinese President Xi Jinping highlights new partnerships in the Middle East as part of the BRI.',
        content: 'Beijing — President Xi Jinping delivered a keynote address outlining the future trajectory of the Belt and Road Initiative (BRI). Emphasizing mutual benefit and sustainable development, Xi noted that the Middle East, particularly Iraq, plays a crucial role in the initiative\'s expansion. The strategic focus will shift towards green energy investments and high-tech cooperation.'
      },
      {
        lang: 'ar',
        title: 'الرئيس شي جين بينغ يحدد المرحلة التالية من مبادرة الحزام والطريق',
        excerpt: 'الرئيس الصيني شي جين بينغ يسلط الضوء على الشراكات الجديدة في الشرق الأوسط كجزء من مبادرة الحزام والطريق.',
        content: 'بكين — ألقى الرئيس شي جين بينغ خطاباً رئيسياً حدد فيه المسار المستقبلي لمبادرة الحزام والطريق (BRI). وأكد شي على المنفعة المتبادلة والتنمية المستدامة، مشيراً إلى أن الشرق الأوسط، وخاصة العراق، يلعب دوراً حاسماً في توسيع المبادرة. سيتحول التركيز الاستراتيجي نحو استثمارات الطاقة الخضراء والتعاون في مجال التكنولوجيا الفائقة.'
      },
      {
        lang: 'zh',
        title: '习近平主席概述“一带一路”倡议的下一阶段',
        excerpt: '中国国家主席习近平强调中东地区作为“一带一路”倡议一部分的新伙伴关系。',
        content: '北京 — 习近平主席发表主旨演讲，概述了“一带一路”倡议（BRI）的未来发展轨迹。习近平强调互利共赢和可持续发展，并指出中东地区，特别是伊拉克，在倡议的扩展中发挥着至关重要的作用。战略重点将转向绿色能源投资和高科技合作。'
      },
      {
        lang: 'ckb',
        title: 'سەرۆک شی جین پینگ قۆناغی داهاتووی دەستپێشخەری پشتوێن و ڕێگا دیاری دەکات',
        excerpt: 'سەرۆکی چین شی جین پینگ تیشک دەخاتە سەر هاوبەشییە نوێیەکان لە ڕۆژهەڵاتی ناوەڕاست وەکو بەشێک لە پڕۆژەکە.',
        content: 'بەکین — سەرۆک شی جین پینگ وتارێکی پێشکەش کرد کە تێیدا ئاڕاستەی داهاتووی دەستپێشخەری پشتوێن و ڕێگای دیاری کرد. شی جەختی لەسەر بەرژەوەندی هاوبەش و گەشەپێدانی بەردەوام کردەوە، و ئاماژەی بەوەدا کە ڕۆژهەڵاتی ناوەڕاست، بەتایبەتی عێراق، ڕۆڵێکی گرنگ دەگێڕێت لە فراوانکردنی دەستپێشخەرییەکەدا.'
      }
    ]
  },
  {
    slug: 'chinese-government-iraq-energy-pact',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    translations: [
      {
        lang: 'en',
        title: 'Chinese Government Signs Landmark Energy Pact with Iraq',
        excerpt: 'Bilateral agreement sets the stage for massive Chinese investment in Iraqi solar and oil infrastructure.',
        content: 'Baghdad — Representatives of the Chinese government have signed a comprehensive energy agreement with their Iraqi counterparts. The pact involves multi-billion dollar investments aimed at modernizing Iraq\'s oil extraction facilities while concurrently developing large-scale solar power plants. This dual approach aims to secure energy supplies while addressing climate concerns.'
      },
      {
        lang: 'ar',
        title: 'الحكومة الصينية توقع اتفاقية طاقة تاريخية مع العراق',
        excerpt: 'الاتفاق الثنائي يمهد الطريق لاستثمارات صينية ضخمة في البنية التحتية للطاقة الشمسية والنفطية العراقية.',
        content: 'بغداد — وقع ممثلو الحكومة الصينية اتفاقية طاقة شاملة مع نظرائهم العراقيين. تتضمن الاتفاقية استثمارات بمليارات الدولارات تهدف إلى تحديث مرافق استخراج النفط العراقية مع تطوير محطات طاقة شمسية واسعة النطاق في الوقت نفسه. يهدف هذا النهج المزدوج إلى تأمين إمدادات الطاقة مع معالجة المخاوف المناخية.'
      },
      {
        lang: 'zh',
        title: '中国政府与伊拉克签署具有里程碑意义的能源协议',
        excerpt: '双边协议为中国在伊拉克太阳能和石油基础设施领域的大规模投资奠定了基础。',
        content: '巴格达 — 中国政府代表与伊拉克同行签署了一项全面的能源协议。该协议涉及数十亿美元的投资，旨在现代化伊拉克的石油开采设施，同时开发大规模的太阳能发电厂。这种双重方法旨在确保能源供应，同时应对气候问题。'
      },
      {
        lang: 'ckb',
        title: 'حکومەتی چین ڕێککەوتنێکی مێژوویی وزە لەگەڵ عێراق واژۆ دەکات',
        excerpt: 'ڕێککەوتنە دوولایەنەکە زەمینە خۆش دەکات بۆ وەبەرهێنانێکی گەورەی چینی لە ژێرخانی نەوت و وزەی خۆری عێراق.',
        content: 'بەغدا — نوێنەرانی حکومەتی چین ڕێککەوتنێکی گشتگیری وزەیان لەگەڵ هاوتا عێراقییەکانیان واژۆ کرد. ڕێککەوتنەکە وەبەرهێنانی چەندین ملیار دۆلاری لەخۆدەگرێت کە ئامانج لێی مۆدێرنکردنی دامەزراوەکانی دەرهێنانی نەوتی عێراقە لەگەڵ پەرەپێدانی وێستگەی گەورەی وزەی خۆر لە هەمان کاتدا.'
      }
    ]
  },
  {
    slug: 'kurdistan-government-investment-forum',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop',
    translations: [
      {
        lang: 'en',
        title: 'Kurdistan Regional Government Hosts International Investment Forum',
        excerpt: 'Erbil welcomes global investors to explore opportunities in agriculture, tourism, and technology.',
        content: 'Erbil — The Kurdistan Regional Government (KRG) has successfully concluded a major international investment forum held in the capital. Over 500 delegates, including prominent Chinese business leaders, attended the event. The KRG presented new incentives for foreign direct investment, focusing specifically on non-oil sectors such as agriculture, eco-tourism, and technological innovation.'
      },
      {
        lang: 'ar',
        title: 'حكومة إقليم كردستان تستضيف منتدى الاستثمار الدولي',
        excerpt: 'أربيل ترحب بالمستثمرين العالميين لاستكشاف الفرص في الزراعة والسياحة والتكنولوجيا.',
        content: 'أربيل — اختتمت حكومة إقليم كردستان بنجاح منتدى استثمارياً دولياً كبيراً عُقد في العاصمة. حضر الحدث أكثر من 500 مندوب، بمن فيهم قادة أعمال صينيون بارزون. وقدمت حكومة إقليم كردستان حوافز جديدة للاستثمار الأجنبي المباشر، مع التركيز بشكل خاص على القطاعات غير النفطية مثل الزراعة والسياحة البيئية والابتكار التكنولوجي.'
      },
      {
        lang: 'zh',
        title: '库尔德斯坦地区政府举办国际投资论坛',
        excerpt: '埃尔比勒欢迎全球投资者探索农业、旅游和技术领域的机遇。',
        content: '埃尔比勒 — 库尔德斯坦地区政府 (KRG) 成功地在首都举办了一场大型国际投资论坛。超过 500 名代表，包括著名的中国商界领袖参加了此次活动。KRG 提出了吸引外商直接投资的新激励措施，特别关注非石油部门，如农业、生态旅游和技术创新。'
      },
      {
        lang: 'ckb',
        title: 'حکومەتی هەرێمی کوردستان میوانداری مەکۆیەکی نێودەوڵەتی وەبەرهێنان دەکات',
        excerpt: 'هەولێر پێشوازی لە وەبەرهێنەرانی جیهانی دەکات بۆ دۆزینەوەی دەرفەتەکان لە بوارەکانی کشتوکاڵ، گەشتوگوزار و تەکنەلۆژیا.',
        content: 'هەولێر — حکومەتی هەرێمی کوردستان بە سەرکەوتوویی مەکۆیەکی گەورەی وەبەرهێنانی نێودەوڵەتی لە پایتەخت کۆتایی پێهێنا. زیاتر لە ٥٠٠ نوێنەر، لەوانە سەرکردە دیارەکانی بازرگانی چین، ئامادەی بوون. حکومەتی هەرێم هاندانێکی نوێی بۆ وەبەرهێنانی ڕاستەوخۆی بیانی خستەڕوو.'
      }
    ]
  },
  {
    slug: 'ali-al-zaidi-trade-relations',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop',
    translations: [
      {
        lang: 'en',
        title: 'Ali al-Zaidi Promotes Stronger Sino-Iraqi Trade Ties',
        excerpt: 'Prominent Iraqi figure Ali al-Zaidi outlines a vision for enhanced economic cooperation with Beijing.',
        content: 'Baghdad — In a recent policy symposium, Ali al-Zaidi delivered a comprehensive address advocating for deeper economic integration between Iraq and China. Al-Zaidi argued that leveraging Chinese expertise in infrastructure development is essential for Iraq\'s post-conflict reconstruction. He proposed the establishment of joint economic zones in southern Iraq to facilitate technology transfer and boost local employment.'
      },
      {
        lang: 'ar',
        title: 'علي الزيدي يدعو لتعزيز العلاقات التجارية الصينية العراقية',
        excerpt: 'الشخصية العراقية البارزة علي الزيدي يحدد رؤية لتعزيز التعاون الاقتصادي مع بكين.',
        content: 'بغداد — في ندوة سياسية عقدت مؤخراً، ألقى علي الزيدي خطاباً شاملاً يدعو فيه إلى تكامل اقتصادي أعمق بين العراق والصين. وجادل الزيدي بأن الاستفادة من الخبرة الصينية في تطوير البنية التحتية أمر ضروري لإعادة إعمار العراق بعد الصراع. واقترح إنشاء مناطق اقتصادية مشتركة في جنوب العراق.'
      },
      {
        lang: 'zh',
        title: '阿里·扎伊迪推动更强有力的中伊贸易关系',
        excerpt: '伊拉克著名人物阿里·扎伊迪概述了加强与北京经济合作的愿景。',
        content: '巴格达 — 在最近的一次政策研讨会上，阿里·扎伊迪发表了全面讲话，主张深化伊拉克与中国之间的经济一体化。扎伊迪认为，利用中国在基础设施发展方面的专业知识对于伊拉克战后重建至关重要。他提议在伊拉克南部建立联合经济区，以促进技术转让并增加当地就业。'
      },
      {
        lang: 'ckb',
        title: 'عەلی زەیدی برەو بە پەیوەندییە بازرگانییەکانی نێوان چین و عێراق دەدات',
        excerpt: 'کەسایەتی دیاری عێراقی عەلی زەیدی دیدگایەک بۆ بەهێزکردنی هاوکاری ئابووری لەگەڵ پەکین دەخاتەڕوو.',
        content: 'بەغدا — لە کۆنفرانسێکی سیاسیدا کە لەم دواییانەدا بەڕێوەچوو، عەلی زەیدی وتارێکی گشتگیری پێشکەش کرد و داکۆکی لە یەکگرتنی قووڵتری ئابووری نێوان عێراق و چین کرد. زەیدی ئاماژەی بەوەدا کە سوودوەرگرتن لە شارەزایی چینییەکان لە پەرەپێدانی ژێرخاندا زۆر پێویستە بۆ ئاوەدانکردنەوەی عێراق.'
      }
    ]
  }
];

export async function seedPoliticalNews() {
  console.log("🌱 [Political News Seeder] Starting to seed mocked political news...");

  let author = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!author) {
    author = await prisma.user.create({
      data: { email: 'admin_pol@chinq.com', name: 'Political Editor', role: 'ADMIN' }
    });
  }

  let category = await prisma.category.findUnique({ where: { slug: 'politics' } });
  if (!category) {
    category = await prisma.category.create({
      data: {
        slug: 'politics',
        name: 'Politics',
        nameEn: 'Politics',
        nameAr: 'سياسة',
        nameZh: '政治'
      }
    });
  }

  for (const art of mockArticles) {
    const existing = await prisma.article.findUnique({ where: { slug: art.slug } });
    if (existing) {
      console.log(`[Skip] Article "${art.slug}" already exists.`);
      continue;
    }

    await prisma.article.create({
      data: {
        slug: art.slug,
        categoryId: category.id,
        authorId: author.id,
        imageUrl: art.imageUrl,
        status: 'PUBLISHED',
        translations: {
          create: art.translations
        }
      }
    });
    console.log(`[Created] Article: ${art.slug}`);
  }

  console.log("✅ Finished seeding mocked political news.");
}

seedPoliticalNews()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

const moreArticles = [
  {
    slug: 'kurdistan-china-cultural-exchange',
    imageUrl: 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?q=80&w=1200&auto=format&fit=crop',
    translations: [
      {
        lang: 'en',
        title: 'Kurdistan and China Announce Major Cultural Exchange Program',
        excerpt: 'New initiative aims to strengthen people-to-people ties between Erbil and Beijing.',
        content: 'Erbil — A landmark cultural exchange program has been announced between the Kurdistan Regional Government and the Chinese Ministry of Culture. The initiative will sponsor students, artists, and academics to travel between the two regions, fostering mutual understanding and collaboration in the arts and sciences.'
      },
      {
        lang: 'ar',
        title: 'كردستان والصين تعلنان عن برنامج تبادل ثقافي رئيسي',
        excerpt: 'مبادرة جديدة تهدف إلى تعزيز الروابط بين الشعوب بين أربيل وبكين.',
        content: 'أربيل — تم الإعلان عن برنامج تبادل ثقافي تاريخي بين حكومة إقليم كردستان ووزارة الثقافة الصينية. سترعى المبادرة الطلاب والفنانين والأكاديميين للسفر بين المنطقتين.'
      },
      {
        lang: 'zh',
        title: '库尔德斯坦与中国宣布重大文化交流项目',
        excerpt: '新倡议旨在加强埃尔比勒和北京之间的人文联系。',
        content: '埃尔比勒 — 库尔德斯坦地区政府和中国文化部宣布了一项具有里程碑意义的文化交流项目。该倡议将资助学生、艺术家和学者在两地之间旅行，以增进相互了解和合作。'
      },
      {
        lang: 'ckb',
        title: 'کوردستان و چین بەرنامەیەکی گەورەی ئاڵوگۆڕی کلتوری ڕادەگەیەنن',
        excerpt: 'دەستپێشخەرییەکی نوێ بە ئامانجی بەهێزکردنی پەیوەندییەکانی نێوان هەولێر و پەکین.',
        content: 'هەولێر — بەرنامەیەکی مێژوویی ئاڵوگۆڕی کلتوری لە نێوان حکومەتی هەرێمی کوردستان و وەزارەتی ڕۆشنبیری چین ڕاگەیەندرا. بەرنامەکە سپۆنسەری خوێندکاران و هونەرمەندان و ئەکادیمییەکان دەکات بۆ گەشتکردن لە نێوان هەردوو ناوچەکەدا.'
      }
    ]
  },
  {
    slug: 'iraqi-delegation-visits-beijing',
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1200&auto=format&fit=crop',
    translations: [
      {
        lang: 'en',
        title: 'High-Level Iraqi Delegation Concludes Successful Visit to Beijing',
        excerpt: 'Discussions focused on trade tariffs, infrastructure, and energy cooperation.',
        content: 'Beijing — A senior Iraqi delegation has concluded a multi-day official visit to Beijing, marking a significant step in Sino-Iraqi relations. The meetings resulted in several memorandums of understanding covering trade tariffs, smart city development, and long-term energy contracts.'
      },
      {
        lang: 'ar',
        title: 'وفد عراقي رفيع المستوى يختتم زيارة ناجحة لبكين',
        excerpt: 'ركزت المناقشات على التعريفات التجارية والبنية التحتية والتعاون في مجال الطاقة.',
        content: 'بكين — اختتم وفد عراقي رفيع المستوى زيارة رسمية استغرقت عدة أيام لبكين، مما يمثل خطوة مهمة في العلاقات الصينية العراقية. وأسفرت الاجتماعات عن عدة مذكرات تفاهم تغطي التعريفات التجارية وتطوير المدن الذكية.'
      },
      {
        lang: 'zh',
        title: '伊拉克高级代表团圆满结束对北京的访问',
        excerpt: '讨论重点是贸易关税、基础设施和能源合作。',
        content: '北京 — 一个伊拉克高级代表团结束了对北京为期多日的正式访问，这标志着中伊关系迈出了重要一步。会议达成多项谅解备忘录，涵盖贸易关税、智能城市发展和长期能源合同。'
      },
      {
        lang: 'ckb',
        title: 'شاندێکی باڵای عێراقی سەردانێکی سەرکەوتووی بۆ پەکین کۆتایی پێهێنا',
        excerpt: 'گفتوگۆکان تیشکیان خستە سەر باجی بازرگانی، ژێرخان و هاوکاری وزە.',
        content: 'بەکین — شاندێکی باڵای عێراقی کۆتایی بە سەردانێکی فەرمی چەند ڕۆژە هێنا بۆ پەکین، کە هەنگاوێکی گرنگە لە پەیوەندییەکانی نێوان چین و عێراقدا. کۆبوونەوەکان بوونە هۆی چەندین لێکتێگەیشتن.'
      }
    ]
  }
];

async function seedMore() {
  let category = await prisma.category.findUnique({ where: { slug: 'politics' } });
  let author = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  
  if (!category || !author) return;

  for (const art of moreArticles) {
    const existing = await prisma.article.findUnique({ where: { slug: art.slug } });
    if (existing) continue;

    await prisma.article.create({
      data: {
        slug: art.slug,
        categoryId: category.id,
        authorId: author.id,
        imageUrl: art.imageUrl,
        status: 'PUBLISHED',
        translations: {
          create: art.translations
        }
      }
    });
    console.log(`[Created] Article: ${art.slug}`);
  }
}

seedMore().then(() => console.log("Done seeding extra"));
