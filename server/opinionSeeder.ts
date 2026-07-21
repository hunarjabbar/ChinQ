import { prisma } from "./db.js";

interface OpinionArticle {
  slug: string;
  authorEmail: string;
  authorName: string;
  imageUrl: string;
  translations: {
    lang: 'en' | 'ar' | 'zh' | 'ckb';
    title: string;
    excerpt: string;
    content: string;
  }[];
}

const OPINIONS_DATA: OpinionArticle[] = [
  // 1. Ambassador Cui Wei
  {
    slug: "cui-wei-golden-era-sino-iraqi-strategic-trust",
    authorEmail: "cui.wei@chinq.post",
    authorName: "Amb. Cui Wei",
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "The Golden Era of Sino-Iraqi Strategic Trust: Moving Beyond Transactional Ties",
        excerpt: "China's Ambassador to Iraq highlights how mutual respect for sovereignty and long-term development plans are building a permanent bilateral bridge.",
        content: "As we witness the rapid expansion of the Belt and Road Initiative within Iraq, it is vital to understand that the partnership between Baghdad and Beijing is not merely a collection of transactional infrastructure deals. It is built on a foundation of profound strategic trust and mutual respect for national sovereignty. China has consistently supported Iraq's efforts to safeguard its territorial integrity and reconstruct its economy on its own terms. By aligning our technological capabilities with the Iraqi government's Vision 2030, we are creating a permanent bridge of progress that spans across energy, education, and mutual cultural appreciation."
      },
      {
        lang: "ar",
        title: "العصر الذهبي للثقة الاستراتيجية العراقية الصينية: تجاوز العلاقات العابرة",
        excerpt: "سفير الصين لدى العراق يسلط الضوء على كيف أن الاحترام المتبادل للسيادة وخطط التنمية طويلة الأجل تبني جسراً ثنائياً دائماً.",
        content: "بينما نشهد التوسع السريع لمبادرة الحزام والطريق في العراق، من الأهمية بمكان أن نفهم أن الشراكة بين بغداد وبكين ليست مجرد مجموعة من الصفقات البنية التحتية المؤقتة. إنها مبنية على أساس من الثقة الاستراتيجية العميقة والاحترام المتبادل للسيادة الوطنية. لقد دعمت الصين باستمرار جهود العراق لحماية سلامة أراضيه وإعادة بناء اقتصاده بشروطه الخاصة. ومن خلال مواءمة قدراتنا التكنولوجية مع رؤية الحكومة العراقية 2030، فإننا نخلق جسراً دائماً للتقدم يمتد عبر مجالات الطاقة والتعليم والتقدير الثقافي المتبادل."
      },
      {
        lang: "zh",
        title: "中伊战略互信的黄金时代：超越交易型双边关系",
        excerpt: "中国驻伊拉克大使强调，相互尊重主权和长期发展规划正在建设一座永久的双边合作桥梁。",
        content: "当我们目睹“一带一路”倡议在伊拉克的快速扩展时，至关重要的是要认识到巴格达与北京之间的伙伴关系绝非简单的交易型基础设施交易之和。它是建立在深厚的战略互信以及对国家主权的相互尊重基础之上的。中国一贯支持伊拉克维护领土完整和按照自身意愿重建经济的努力。通过将我们的技术实力与伊拉克政府的“2030年愿景”相结合，我们正在打造一座横跨能源、教育和人文交流的永久进步桥梁。"
      },
      {
        lang: "ckb",
        title: "سەردەمی زێڕینی متمانەی ستراتیژی نێوان چین و عێراق: تێپەڕاندنی پەیوەندییە کاتییەکان",
        excerpt: "باڵیۆزی چین لە عێراق تیشک دەخاتە سەر چۆنێتی ڕێزگرتنی دوولایەنە بۆ سەروەری و پلانە درێژخایەنەکانی گەشەپێدان کە پردێکی هەمیشەیی دوولایەنە دروست دەکەن.",
        content: "لە کاتێکدا ئێمە شاهیدی گەشەکردنی خێرای دەستپێشخەری کەمەر و ڕێگا لە عێراق دەکەین، زۆر گرنگە تێبگەین کە هاوبەشی نێوان بەغدا و پەکین تەنها کۆمەڵێک گرێبەستی لۆجستی و ژێرخانی کاتی نییە. ئەم پەیوەندییە لەسەر بنەمای متمانەی ستراتیژی قووڵ و ڕێزگرتنی دوولایەنە بۆ سەروەری نیشتمانی دامەزراوە. چین هەمیشە پاڵپشتی لە هەوڵەکانی عێراق کردووە بۆ پاراستنی یەکپارچەیی خاکی خۆی و دووبارە بنیادنانەوەی ئابوورییەکەی لەسەر بنەمای ویستی خۆی. بە گونجاندنی تواناکانمان لەگەڵ دیدگای ٢٠٣٠ی حکومەتی عێراق، ئێمە پردێکی هەمیشەیی پێشکەوتن دروست دەکەین کە بەسەر وزە، پەروەردە و هاوئاهەنگی کولتووریدا تێپەڕ دەبێت."
      }
    ]
  },
  // 2. Dr. Ihsan Al-Shammari
  {
    slug: "al-shammari-balancing-giants-iraqi-sovereignty",
    authorEmail: "ihsan.shammari@chinq.post",
    authorName: "Dr. Ihsan Al-Shammari",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "Balancing Giants: Iraq's Sovereignty in the Age of Sino-American Competition",
        excerpt: "An analysis of how Iraq can strategically leverage Chinese development programs while maintaining its geopolitical balance.",
        content: "For Iraq, the rising economic footprint of China presents a unique set of opportunities and challenges. While Baghdad requires immense capital and engineering capacity to reconstruct its post-conflict infrastructure, it must navigate the delicate geopolitical fault lines of Sino-American competition. Iraq's sovereign interest lies not in choosing one side, but in acting as an independent arena of constructive cooperation. We must ensure that agreements signed under the Belt and Road framework are transparent, economically viable, and insulated from regional proxy dynamics. By maintaining a multi-vector foreign policy, Iraq can rebuild its cities with Chinese steel while continuing vital security partnerships with the West."
      },
      {
        lang: "ar",
        title: "توازن العمالقة: سيادة العراق في عصر التنافس الصيني الأمريكي",
        excerpt: "تحليل لكيفية استفادة العراق استراتيجياً من برامج التنمية الصينية مع الحفاظ على توازنه الجيوسياسي.",
        content: "بالنسبة للعراق، يمثل النفوذ الاقتصادي المتزايد للصين مجموعة فريدة من الفرص والتحديات. وبينما يتطلب العراق رؤوس أموال ضخمة وقدرات هندسية لإعادة بناء بنيته التحتية في مرحلة ما بعد الصراع، يتعين عليه الإبحار عبر الخطوط الجيوسياسية الدقيقة للتنافس الصيني الأمريكي. إن مصلحة العراق السيادية لا تكمن في اختيار طرف على حساب الآخر، بل في العمل كساحة مستقلة للتعاون البناء. يجب أن نضمن أن الاتفاقيات الموقعة في إطار الحزام والطريق تتميز بالشفافية والجدوى الاقتصادية والتحصين من الصراعات الإقليمية. من خلال الحفاظ على سياسة خارجية متعددة الأبعاد، يمكن للعراق إعادة بناء مدنه بالصلب الصيني مع استمرار شراكاته الأمنية الحيوية مع الغرب."
      },
      {
        lang: "zh",
        title: "大国平衡：中美竞争时代下的伊拉克主权抉择",
        excerpt: "分析伊拉克如何在保持地缘政治平衡的同时，从战略上利用中国的发展规划建设国家。",
        content: "对于伊拉克而言，中国日益增长的经济影响力带来了一系列独特的机遇与挑战。尽管巴格达需要庞大的资金和工程能力来重建冲突后的基础设施，但它必须在中美竞争的微妙地缘政治断层线上谨慎行事。伊拉克的国家主权利益不在此向彼靠拢，而在于充当建设性合作的独立舞台。我们必须确保在“一带一路”框架下签署的协议保持透明、经济可行，并免受地区代理人博弈的影响。通过保持多方位外交政策，伊拉克既能用中国的钢铁重建城市，又能继续维持与西方至关重要的安全伙伴关系。"
      },
      {
        lang: "ckb",
        title: "هاوسەنگی زلهێزەکان: سەروەری عێراق لە سەردەمی کێبڕکێی چین و ئەمریکادا",
        excerpt: "شیکردنەوەیەک لەسەر ئەوەی چۆن عێراق دەتوانێت بە ستراتیژی سوود لە بەرنامەکانی گەشەپێدانی چین وەربگرێت لە کاتێکدا هاوسەنگییە جیۆپۆلیتییەکەی دەپارێزێت.",
        content: "بۆ عێراق، زیادبوونی شوێنپێی ئابووری چین کۆمەڵێک دەرفەت و تەحەدای ناوازە دەخاتە ڕوو. لە کاتێکدا بەغدا پێویستی بە سەرمایەکی زۆر و توانای ئەندازیاری هەیە بۆ دووبارە بنیادنانەوەی ژێرخانی دوای شەڕ، پێویستە بە وریاییەوە لە هێڵە جیۆپۆلیتییە ناسکەکانی کێبڕکێی نێوان چین و ئەمریکا بڕوات. بەرژەوەندی باڵای عێراق لەوەدا نییە کە لایەنێک هەڵبژێرێت، بەڵکو لەوەدایە وەک مەیدانێکی سەربەخۆ بۆ هاوکاری بنیادنەرانە کار بکات. دەبێت دڵنیا بین لەوەی ئەو ڕێککەوتنانەی لەژێر چوارچێوەی کەمەر و ڕێگادا واژۆ دەکرێن شەفاف و لە ڕووی ئابوورییەوە بەسوود بن و لە کێشە هەرێمییەکان بەدوور بن. بە پاراستنی سیاسەتێکی دەرەوەی فرەجەمسەر، عێراق دەتوانێت شارەکانی بە ئاسنی چینی بنیاد بنێتەوە لە کاتێکدا پەیوەندییە گرنگەکانی ئاسایش لەگەڵ ڕۆژئاوادا دەپارێزێت."
      }
    ]
  },
  // 3. Dr. Wang Jin
  {
    slug: "wang-jin-unpacking-oil-for-construction-model",
    authorEmail: "wang.jin@chinq.post",
    authorName: "Dr. Wang Jin",
    imageUrl: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "Unpacking the Oil-for-Construction Model: Iraq’s Path to Sovereign Industrialization",
        excerpt: "How China’s innovative financing model is turning liquid energy directly into schools, power grids, and airports without high sovereign debt.",
        content: "The 'Oil-for-Construction' bilateral agreement represents a watershed moment in modern economic cooperation. Skeptics often mischaracterize this framework as a debt-trap, but a closer look reveals a highly pragmatic structure. By depositing crude oil revenues directly into a sovereign escrow account to fund certified Chinese construction projects inside Iraq, Baghdad avoids accumulating crushing foreign debt. Instead, liquid energy is immediately and tangibly converted into brick-and-mortar schools, modern solar grids, and active transport corridors like Nasiriyah Airport. This model ensures that oil price volatility does not freeze critical national reconstruction efforts, paving the way for long-term domestic industrialization."
      },
      {
        lang: "ar",
        title: "تفكيك نموذج النفط مقابل البناء: طريق العراق نحو التصنيع السيادي",
        excerpt: "كيف يحول نموذج التمويل الصيني المبتكر الطاقة السائلة مباشرة إلى مدارس وشبكات طاقة ومطارات دون ديون سيادية مرتفعة.",
        content: "تمثل الاتفاقية الثنائية 'النفط مقابل الإعمار' لحظة فارقة في التعاون الاقتصادي الحديث. غالباً ما يصف المشككون هذا الإطار بأنه فخ ديون، لكن النظرة الفاحصة تكشف عن هيكل عملي للغاية. ومن خلال إيداع عائدات النفط الخام مباشرة في حساب ضمان سيادي لتمويل مشاريع البناء الصينية المعتمدة داخل العراق، يتجنب العراق تراكم الديون الخارجية الساحقة. وبدلاً من ذلك، يتم تحويل الطاقة السائلة بشكل ملموس وفوري إلى مدارس، وشبكات طاقة شمسية حديثة، وممرات نقل نشطة مثل مطار الناصرية. يضمن هذا النموذج أن تقلبات أسعار النفط لا تؤدي إلى تجميد جهود إعادة الإعمار الوطنية الحيوية، مما يمهد الطريق للتصنيع المحلي طويل الأجل."
      },
      {
        lang: "zh",
        title: "解读“石油换重建”模式：伊拉克实现主权工业化的创新之路",
        excerpt: "中国的创新融资模式如何将液态能源直接转化为学校、电网和机场，且不增加伊拉克高额主权债务负担。",
        content: "中伊双边“石油换重建”协议代表了现代经济合作的一个分水岭。怀疑论者常将这一框架误读为“债务陷阱”，但深入分析会发现其架构具有高度的实用性。通过将原油销售收入直接存入主权代管账户，定向用于支付在伊拉克境内获批的中国承建项目，巴格达成功避免了积累沉重的外债。相反，液态能源被直接、切实地转化为实体的学校、现代化的太阳能电网以及像纳西里耶机场这样的活跃交通枢纽。这一模式确保了即使在油价波动时，国家关键重建工程也不会陷入停滞，从而为长期的本土工业化铺平了道路。"
      },
      {
        lang: "ckb",
        title: "لێکدانەوەی مۆدێلی نەوت بەرامبەر بنیادنان: ڕێگای عێراق بەرەو پیشەسازی نیشتمانی",
        excerpt: "چۆن مۆدێلی دابینکردنی دارایی داهێنەرانەی چین وزەی شل ڕاستەوخۆ دەگۆڕێت بۆ قوتابخانە، هێڵەکانی کارەبا، و فڕۆکەخانە بەبێ قەرزی گەورەی دەوڵەت.",
        content: "ڕێککەوتنی دوولایەنەی 'نەوت بەرامبەر بنیادنان' گۆڕانکارییەکی گەورەیە لە هاوکارییە ئابوورییە هاوچەرخەکاندا. گومانکاران زۆرجار ئەم چوارچێوەیە بە خراپی وەک 'تەڵەی قەرز' پێناسە دەکەن، بەڵام تێڕامانێکی قووڵتر پێکهاتەیەکی زۆر پراکتیکی ئاشکرا دەکات. بە دانانی داهاتی نەوتی خاو ڕاستەوخۆ لە ئەژمێرێکی تایبەتی دەوڵەتیدا بۆ دابینکردنی دارایی پڕۆژەکانی بیناسازی چینی لە ناوخۆی عێراقدا، بەغدا خۆی لە کۆبوونەوەی قەرزی دەرەکی گەورە بەدوور دەگرێت. لە جیاتی ئەوە، وزەی شل ڕاستەوخۆ دەگۆڕێت بۆ قوتابخانە، هێڵەکانی وزەی خۆر، و فڕۆکەخانەی نوێ وەک فڕۆکەخانەی ناسریە. ئەم مۆدێلە دڵنیایی دەدات کە گۆڕانکارییەکانی نرخی نەوت هەوڵەکانی بنیادنانەوە ناوەستێنن و ڕێگا بۆ گەشەپێدانی پیشەسازی ناوخۆیی خۆش دەکات."
      }
    ]
  },
  // 4. Dr. Bilal Wahab
  {
    slug: "bilal-wahab-erbil-pivot-kurdistans-energy-diversification",
    authorEmail: "bilal.wahab@chinq.post",
    authorName: "Dr. Bilal Wahab",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "Erbil’s Pivot: Diversifying Kurdistan’s Energy and Trade Strategy Toward Asian Markets",
        excerpt: "With traditional pipeline corridors facing blockades, the Kurdistan Region must strategically integrate its economy with eastern trade networks.",
        content: "The ongoing suspension of oil exports via the Ceyhan pipeline has exposed the structural vulnerability of the Kurdistan Region of Iraq's (KRI) single-commodity, Western-dependent export model. To secure its fiscal future, Erbil must look East. China represents not only the world's premier energy importer but also a massive source of capital for non-oil infrastructure diversification. Integrating Kurdish agricultural exports, heavy processing zones, and transport links with China's regional frameworks offers a viable escape hatch from current economic bottlenecks. Erbil should actively negotiate its inclusion in the federal Sino-Iraqi sovereign investment packages, ensuring that northern logistics hubs are linked to the global Silk Road networks."
      },
      {
        lang: "ar",
        title: "محور أربيل: تنويع استراتيجية الطاقة والتجارة في كردستان نحو الأسواق الآسيوية",
        excerpt: "مع مواجهة ممرات الأنابيب التقليدية للحصار، يتعين على إقليم كردستان دمج اقتصاده استراتيجياً مع شبكات التجارة الشرقية.",
        content: "لقد كشف التعليق المستمر لصادرات النفط عبر خط أنابيب جيهان عن الضعف الهيكلي لنموذج التصدير في إقليم كردستان القائم على سلعة واحدة والمعتمد على الغرب. ولتأمين مستقبله المالي، يجب على أربيل أن تتطلع نحو الشرق. لا تمثل الصين أكبر مستورد للطاقة في العالم فحسب، بل تمثل أيضاً مصدراً هائلاً لرؤوس الأموال لتنويع البنية التحتية غير النفطية. إن دمج الصادرات الزراعية الكردية، ومناطق المعالجة الثقيلة، وخطوط النقل مع الأطر الإقليمية للصين يوفر مخرجاً عملياً من الاختناقات الاقتصادية الحالية. يجب على أربيل التفاوض بنشاط لإدراجها في حزم الاستثمار السيادية العراقية الصينية الاتحادية، مما يضمن ربط المراكز اللوجستية الشمالية بشبكات طريق الحرير العالمية."
      },
      {
        lang: "zh",
        title: "埃尔比勒的转向：推动库尔德斯坦能源与贸易向亚洲市场多元化发展",
        excerpt: "在传统管道输送遭遇重重受阻背景下，库尔德斯坦地区必须在战略上将自身经济融入东方的贸易网络。",
        content: "由于通过杰伊汉管道的石油出口持续中断，伊拉克库尔德斯坦地区（KRI）单一商品、依赖西方的出口模式暴露出了其结构性脆弱。为了保障财政安全，埃尔比勒必须向东看。中国不仅是全球最重要的能源进口国，也是非石油基础设施多元化建设的庞大资金来源。将库尔德地区的农产品出口、重工业加工区以及交通线路与中国在区域内的发展框架相对接，为摆脱当前的经济瓶颈提供了一条切实可行的出路。埃尔比勒应积极争取纳入中伊联邦级主权投资包，以确保北部物流枢纽能够连接到全球“一带一路”网络中。"
      },
      {
        lang: "ckb",
        title: "وەرچەرخانی هەولێر: هەمەجۆرکردنی ستراتیژی وزە و بازرگانی کوردستان بەرەو بازاڕەکانی ئاسیا",
        excerpt: "لەگەڵ ڕووبەڕووبوونەوەی بەربەست بۆ هێڵە سەرەکییەکانی گواستنەوەی نەوت، پێویستە هەرێمی کوردستان بە ستراتیژی ئابووری خۆی لەگەڵ تۆڕە بازرگانییەکانی ڕۆژهەڵاتدا بگونجێنێت.",
        content: "ڕاگرتنی بەردەوامی هەناردەکردنی نەوت لە ڕێگەی بۆری جیهانەوە لاوازی پێکهاتەیی مۆدێلی هەناردەکردنی هەرێمی کوردستانی دەرخستووە کە پشت بە تەنها یەک کاڵا و وڵاتانی ڕۆژئاوا دەبەستێت. بۆ دابینکردنی داهاتی داهاتوو، پێویستە هەولێر سەیری ڕۆژهەڵات بکات. چین نەک تەنها گەورەترین هاوردەکاری وزەیە لە جیهاندا، بەڵکو سەرچاوەیەکی گەورەی سەرمایەیە بۆ هەمەجۆرکردنی ژێرخانی دەرەوەی نەوت. تێکەڵکردنی هەناردەی کشتوکاڵی کوردستان و ناوچە پیشەسازییەکان و گواستنەوە لەگەڵ چوارچێوە هەرێمییەکانی چین دەرفەتێکی باش دەڕەخسێنێت بۆ ڕزگاربوون لە بەربەستە ئابوورییەکانی ئێستا. پێویستە هەولێر بە شێوەیەکی چالاک گفتوگۆ بکات بۆ جێگیرکردنی خۆی لە چوارچێوەی وەبەرهێنانی دەوڵەتی عێراق و چین، بۆ ئەوەی دڵنیا بێت لەوەی ناوەندە لۆجستییەکانی باکوور بە تۆڕەکانی ڕێگای ئاوریشمەوە دەبەسترێنەوە."
      }
    ]
  },
  // 5. Prof. Lin Minwang
  {
    slug: "lin-minwang-synergy-of-seas-development-road",
    authorEmail: "lin.minwang@chinq.post",
    authorName: "Prof. Lin Minwang",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "Synergy of the Seas: Aligning Iraq's Development Road with China's Maritime Silk Road",
        excerpt: "An exploration of how Iraq's ambitious 'Development Road' rail corridor from Al-Faw Grand Port creates a major trade artery linked with Chinese transit routes.",
        content: "Iraq’s proposed $17 billion 'Development Road' project—a high-speed rail and highway corridor connecting the southern Al-Faw Grand Port to the Turkish border—is a masterpiece of spatial economics. It should not be viewed in isolation. When integrated with China's Maritime Silk Road, it represents the missing overland shortcut connecting the Persian Gulf directly to Europe. Chinese shipping lines can bypass the heavily congested Red Sea routes by discharging cargo at Al-Faw, loading it onto high-speed freight trains, and reaching European logistics hubs in less than 36 hours. The operational synergy between Al-Faw's deep-water berths and Chinese continental trade corridors will redefine Eurasian logistics for the next century."
      },
      {
        lang: "ar",
        title: "تكامل البحار: مواءمة طريق التنمية العراقي مع طريق الحرير البحري الصيني",
        excerpt: "استكشاف لكيفية قيام ممر السكك الحديدية الطموح 'طريق التنمية' من ميناء الفاو الكبير بإنشاء شريان تجاري رئيسي مرتبط بمسارات العبور الصينية.",
        content: "إن مشروع 'طريق التنمية' المقترح في العراق بقيمة 17 مليار دولار - وهو ممر لخطوط السكك الحديدية السريعة والطرق السريعة يربط ميناء الفاو الكبير الجنوبي بالحدود التركية - يعد تحفة فنية في مجال الاقتصاد المكاني. لا ينبغي النظر إليه بمعزل عن غيره. فعند دمجه مع طريق الحرير البحري الصيني، فإنه يمثل الاختصار البري المفقود الذي يربط الخليج العربي مباشرة بأوروبا. ويمكن لخطوط الشحن الصينية تجاوز مسارات البحر الأحمر المزدحمة من خلال تفريغ البضائع في الفاو، وتحميلها على قطارات الشحن السريعة، والوصول إلى المراكز اللوجستية الأوروبية في أقل من 36 ساعة. إن التآزر التشغيلي بين أرصفة الفاو العميقة وممرات التجارة القارية الصينية سيعيد تحديد اللوجستيات الأوراسية للقرن المقبل."
      },
      {
        lang: "zh",
        title: "海洋协同：将伊拉克“发展之路”与中国“海上丝绸之路”深度对接",
        excerpt: "探讨伊拉克雄心勃勃的“发展之路”铁路大通道（自法奥大港起）如何构建起与中国运输路线相连的重大贸易命脉。",
        content: "伊拉克计划投资170亿美元的“发展之路”项目——一条连接南部法奥大港至土耳其边境的高速铁路和公路大通道——是空间经济学上的一部杰作。我们不应孤立地看待它。当它与中国的“海上丝绸之路”相结合时，便构成了连接波斯湾与欧洲之间缺失的陆上捷径。中国航运公司可以通过在法奥大港卸货，将货物装上高速货运列车，从而避开异常拥堵的红海航线，并在36小时内抵达欧洲物流枢纽。法奥深水码头与中国大陆贸易通道之间的运营协同，将重新定义下个世纪的亚欧物流格局。"
      },
      {
        lang: "ckb",
        title: "هاوئاهەنگی دەریاکان: گونجاندنی ڕێگای گەشەپێدانی عێراق لەگەڵ ڕێگای دەریایی ئاوریشمی چین",
        excerpt: "توێژینەوەیەک لەسەر ئەوەی چۆن پڕۆژەی گەورەی 'ڕێگای گەشەپێدان'ی شەمەندەفەر لە بەندەری فاوەوە دەبێتە هۆی دروستبوونی هێڵێکی بازرگانی گەورە کە بەستراوەتەوە بە ڕێگاکانی گواستنەوەی چینەوە.",
        content: "پڕۆژەی پێشنیارکراوی 'ڕێگای گەشەپێدان'ی عێراق بە بەهای ١٧ ملیار دۆلار - کە ممرێکی شەمەندەفەری خێرا و ڕێگای سەرەکییە و بەندەری گەورەی فاو لە باشوور بە سنووری تورکیاوە دەبەستێتەوە - شاکارێکی گرنگی ئابوورییە. نابێت بە جیا سەیری بکرێت. کاتێک لەگەڵ ڕێگای دەریایی ئاوریشمی چین تێکەڵ دەکرێت، نوێنەرایەتی ئەو کورت بڕە دەکات کە کەنداوی عەرەبی ڕاستەوخۆ بە ئەوروپاوە دەبەستێتەوە. کۆمپانیا دەریاییە چینییەکان دەتوانن خۆیان لە ڕێگا قەرەباڵغەکانی دەریای سوور بەدوور بگرن بە داگرتنی بارەکانیان لە فاو و بارکردنیان لە شەمەندەفەرە خێراکاندا، کە کەمتر لە ٣٦ کاتژمێردا دەگەنە سەنتەرە لۆجستییەکانی ئەوروپا. ئەم هاوئاهەنگییە لۆجستییەی نێوان بەندەری فاو و ڕێگاکانی چین، پێناسەی بازرگانی لە نێوان ئاسیا و ئەوروپا بۆ سەدەی داهاتوو دەگۆڕێت."
      }
    ]
  },
  // 6. Dr. Mudher Mohammad Saleh
  {
    slug: "mudher-saleh-modernizing-iraq-financial-architecture-yuan",
    authorEmail: "mudher.saleh@chinq.post",
    authorName: "Dr. Mudher Mohammad Saleh",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "Modernizing Iraq's Financial Architecture through Bilateral Trade Corridors",
        excerpt: "The Prime Minister's Financial Advisor explains the economic logic of allowing private sector transactions to settle directly in Chinese Yuan.",
        content: "The Central Bank of Iraq's strategic decision to facilitate direct settlement of private-sector imports from China in Renminbi (RMB) is a major milestone in modernizing our monetary policy. For decades, Iraqi merchants faced extreme currency conversion costs, moving dinars to dollars, then to Yuan. By establishing direct clearing channels, we reduce the domestic demand for U.S. dollars, stabilize the local market exchange rate, and decrease transaction costs for consumers. This bilateral financial corridor does not represent a political alignment, but rather a mature, diversified approach to international trade liquidity that protects Iraq’s economy from external monetary shocks."
      },
      {
        lang: "ar",
        title: "تحديث البنية المالية للعراق من خلال ممرات التجارة الثنائية",
        excerpt: "المستشار المالي لرئيس الوزراء يشرح المنطق الاقتصادي للسماح بتسوية معاملات القطاع الخاص مباشرة باليوان الصيني.",
        content: "إن قرار البنك المركزي العراقي الاستراتيجي بتسهيل التسوية المباشرة لواردات القطاع الخاص من الصين بالرنمينبي (اليوان) يعد علامة فارقة في تحديث سياستنا النقدية. لعقود من الزمن، واجه التجار العراقيون تكاليف تحويل عملات باهظة، حيث قاموا بتحويل الدينار إلى دولار، ثم إلى يوان. ومن خلال إنشاء قنوات تسوية مباشرة، فإننا نحد من الطلب المحلي على الدولار الأمريكي، ونستقر سعر الصرف في السوق المحلية، ونخفض تكاليف المعاملات للمستهلكين. لا يمثل هذا الممر المالي الثنائي انحيازاً سياسياً، بل هو نهج ناضج ومتنوع لسيولة التجارة الدولية يحمي الاقتصاد العراقي من الصدمات النقدية الخارجية."
      },
      {
        lang: "zh",
        title: "通过双边贸易通道推动伊拉克金融体系现代化",
        excerpt: "伊拉克总理金融顾问阐述允许私营部门进口交易直接以人民币结算背后的经济逻辑。",
        content: "伊拉克中央银行决定允许并促进私营部门从中国进口的商品直接使用人民币结算，这是我们货币政策走向现代化的一个重要里程碑。数十年来，伊拉克进口商面临着高昂的二次结汇成本——先将第纳尔兑换成美元，再兑换成人民币。通过建立直接结算渠道，我们有效缓解了国内对美元的过度依赖，稳定了当地市场汇率，并降低了消费者的交易成本。这一双边金融通道绝非某种地缘政治站队，而是一种成熟、多元化的国际贸易清算方案，旨在保护伊拉克经济免受外部货币政策波动的冲击。"
      },
      {
        lang: "ckb",
        title: "نوێکردنەوەی پێکهاتەی دارایی عێراق لە ڕێگەی هێڵەکانی بازرگانی دوولایەنەوە",
        excerpt: "راوێژکاری دارایی سەرۆک وەزیرانی عێراق لایەنی ئابووری ڕێگەدان بە یەکلاکردنەوەی مامەڵەکانی کەرتی تایبەت ڕاستەوخۆ بە یوان-ی چینی ڕوون دەکاتەوە.",
        content: "بڕیاری ستراتیژی بانکی ناوەندی عێراق بۆ ئاسانکاری یەکلاکردنەوەی ڕاستەوخۆی هاوردەکردنی کەرتی تایبەت لە چینەوە بە بەکارهێنانی متمانەی یوان، هەنگاوێکی زۆر گرنگە لە نوێکردنەوەی سیاسەتی نەقدی ئێمەدا. بۆ چەندین دەیە، بازرگانانی عێراق ڕووبەڕووی تێچووی زۆری گۆڕینەوەی دراو دەبوونەوە، بە گۆڕینی دینار بۆ دۆلار و پاشان بۆ یوان. بە دامەزراندنی کەناڵەکانی ڕاستەوخۆی گۆڕینەوە، داواکاری ناوخۆیی بۆ دۆلاری ئەمریکی کەم دەکەینەوە، نرخی گۆڕینەوەی بازاڕی ناوخۆیی جێگیر دەکەین و تێچووی مامەڵەکان بۆ بەکاربەر کەم دەکەینەوە. ئەم ممرە داراییە تەنها گوزارشت لە هەڵوێستێکی سیاسی ناکات، بەڵکو ڕێگایەکی پێگەیشتوو و فرەجۆرە بۆ پاراستنی ئابووری عێراق لە شۆکە نێودەوڵەتییەکان."
      }
    ]
  },
  // 7. Zheng Qingyi
  {
    slug: "zheng-qingyi-financial-silk-road-currency-corridors",
    authorEmail: "zheng.qingyi@chinq.post",
    authorName: "Zheng Qingyi",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "The Financial Silk Road: Yuan Clearing and Bilateral Currency Corridors",
        excerpt: "An analysis of the expanding role of local currencies in Sino-Iraqi trade, reducing dependence on international reserve intermediaries.",
        content: "The expansion of currency clearing agreements between Beijing and Baghdad represents a quiet revolution in Middle Eastern finance. By establishing dedicated Yuan clearing desks and promoting the direct exchange of Renminbi and Iraqi Dinars, both nations are constructing financial armor against unilateral external actions. For China, this advances the internationalization of the Yuan in critical energy markets. For Iraq, it offers transaction stability and shields public infrastructure funds from foreign banking freezes. As de-dollarization trends accelerate globally, this bilateral currency corridor serves as a resilient blueprint for emerging market financial autonomy."
      },
      {
        lang: "ar",
        title: "طريق الحرير المالي: تسوية اليوان وممرات العملات الثنائية",
        excerpt: "تحليل للدور المتوسع للعملات المحلية في التجارة العراقية الصينية، مما يقلل من الاعتماد على وسطاء الاحتياطي الدولي.",
        content: "يمثل توسع اتفاقيات تسوية العملات بين بكين وبغداد ثورة هادئة في التمويل في الشرق الأوسط. ومن خلال إنشاء مكاتب تسوية مخصصة لليوان وتعزيز التبادل المباشر بين الرنمينبي والدينار العراقي، يقوم كلا البلدين ببناء درع مالي ضد الإجراءات الخارجية أحادية الجانب. بالنسبة للصين، يعزز هذا تدويل اليوان في أسواق الطاقة الحيوية. بالنسبة للعراق، يوفر استقراراً في المعاملات ويحمي أموال البنية التحتية العامة من تجميد المصارف الأجنبية. ومع تسارع اتجاهات إلغاء الدولرة عالمياً، يعمل ممر العملات الثنائي هذا كنموذج مرن للحكم الذاتي المالي للأسواق الناشئة."
      },
      {
        lang: "zh",
        title: "金融丝绸之路：人民币清算与双边本币通道的构建",
        excerpt: "分析中伊贸易中本币结算日益扩大的作用，以及如何减少对传统国际中间储备货币的依赖。",
        content: "北京与巴格达之间本币清算协定的扩大，代表了中东金融领域一场悄无声息的变革。通过设立专门的人民币清算窗口、推动人民币与伊拉克第纳尔的直接汇兑，两国正在构建起抵御单边外部干预的金融护甲。对中国而言，这推动了人民币在关键能源市场的国际化进程；对伊拉克而言，则提供了交易稳定性，并保护其公共基础设施资金免受境外银行冻结风险。随着全球“去美元化”趋势加速，这一双边本币通道为新兴市场实现金融自主提供了一个极具韧性的范本。"
      },
      {
        lang: "ckb",
        title: "ڕێگای ئاوریشمی دارایی: جێگیرکردنی یوان و هێڵەکانی دراوی دوولایەنە",
        excerpt: "شیکردنەوەیەک لەسەر ڕۆڵی فراوانبوونی بەکارهێنانی دراوە ناوخۆییەکان لە بازرگانی نێوان چین و عێراقدا، کە پشتبەستن بە دراوە جیهانییەکان کەم دەکاتەوە.",
        content: "فراوانبوونی ڕێککەوتنی گۆڕینەوەی دراو لە نێوان پەکین و بەغدادا نوێنەرایەتی شۆڕشێکی بێدەنگ دەکات لە دارایی ڕۆژهەڵاتی ناوەڕاستدا. بە دامەزراندنی نووسینگەکانی گۆڕینەوەی یوان و بەرزکردنەوەی ئاڵوگۆڕی ڕاستەوخۆی نێوان یوان و دیناری عێراقی، هەردوو نەتەوە چەکێکی دارایی بەهێز دروست دەکەن دژی هەنگاوە دەرەکییە یەکلایەنەکان. بۆ چین، ئەمە یارمەتیدەرە بۆ بەجیهانیکردنی یوان لە بازاڕە گرنگەکانی وزەدا. بۆ عێراق، جێگیری مامەڵەکان دەڕەخسێنێت و داهاتی ژێرخانی گشتی لە بلۆککردنی بانکە دەرەکییەکان دەپارێزێت. لە کاتێکدا ڕەوتی کەمکردنەوەی پشتبەستن بە دۆلار لە جیهاندا خێرا دەبێت، ئەم ممرە داراییە وەک نەخشەڕێگایەکی بەهێز بۆ سەربەخۆیی دارایی بازاڕە نوێیەکان کار دەکات."
      }
    ]
  },
  // 8. Yasser Al-Maliki
  {
    slug: "yasser-al-maliki-opec-tightrope-basra-crude-china",
    authorEmail: "yasser.maliki@chinq.post",
    authorName: "Yasser Al-Maliki",
    imageUrl: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "The OPEC Tightrope: Navigating Basra's Export Commitments and China's Rising Demand",
        excerpt: "An economic review of Iraq's strategic challenge in balancing strict OPEC+ quotas while fulfilling long-term supply agreements with Chinese state refineries.",
        content: "Iraq operates under a complex set of energy mandates. As the second-largest producer in OPEC, Baghdad faces immense pressure to adhere to collective production cuts designed to support global prices. Simultaneously, Iraq has committed to massive, multi-decade crude supply contracts with Chinese state refineries as part of the bilateral financing deals that keep our infrastructure projects funded. Managing this overlap requires delicate economic calculations. If Iraq falls short on deliveries, it risks disrupting critical funding escrow accounts. If it overproduces, it faces OPEC sanctions. The solution lies in aggressive technological upgrading—maximizing internal gas capture to replace oil-fired power plants, thereby freeing up valuable export capacity within compliant quotas."
      },
      {
        lang: "ar",
        title: "حبل أوبك المشدود: الموازنة بين التزامات البصرة التصديرية والطلب الصيني المتزايد",
        excerpt: "مراجعة اقتصادية للتحدي الاستراتيجي الذي يواجهه العراق في موازنة حصص أوبك+ الصارمة مع الوفاء باتفاقيات الإمداد طويلة الأجل مع المصافي الصينية.",
        content: "يعمل العراق بموجب مجموعة معقدة من التزامات الطاقة. وبصفته ثاني أكبر منتج في أوبك، تواجه بغداد ضغوطاً هائلة للالتزام بخفض الإنتاج الجماعي المصمم لدعم الأسعار العالمية. وفي الوقت نفسه، التزم العراق بعقود إمداد طويلة الأجل للنفط مع مصافي تكرير صينية حكومية كجزء من صفقات التمويل الثنائية التي تضمن استمرارية تمويل مشاريعنا البنية التحتية. وتطلب إدارة هذا التداخل حسابات اقتصادية دقيقة للغاية. إذا قصر العراق في تسليم الشحنات، فإنه يخاطر بتعطيل حسابات الضمان التمويلية الحيوية. وإذا أفرط في الإنتاج، فإنه يواجه عقوبات أوبك. تكمن التسوية في التحديث التكنولوجي الشامل - زيادة التقاط الغاز الداخلي ليحل محل محطات الطاقة التي تعمل بالنفط، وبالتالي تحرير سعة تصديرية قيمة ضمن الحصص المتفق عليها."
      },
      {
        lang: "zh",
        title: "欧佩克的平衡木：在巴斯拉出口承诺与中国日益增长的需求间寻求平衡",
        excerpt: "对伊拉克面临的战略挑战进行经济评估：如何在遵守欧佩克+（OPEC+）严格减产配额的同时，履行对中国国有炼厂的长期原油供应协议。",
        content: "伊拉克的能源政策运行在复杂的多重约束之下。作为欧佩克（OPEC）内部第二大生产国，巴格达面临着遵守旨在稳定全球油价的集体减产倡议的巨大压力。与此同时，作为确保国内基础设施项目获得稳定资金支持的双边融资协议的一部分，伊拉克已承诺向中国国有炼油厂长期、稳定地供应原油。处理这种多重承诺需要精细的经济运筹。如果伊拉克交货不足，将面临基础设施保障资金账户中断的风险；如果超额生产，则会面临欧佩克同盟的质疑。唯一的解决之道在于加速技术升级——最大化国内伴生气回收，以此替代原油直接燃烧发电，从而在不超配额的前提下，释放出更多宝贵的原油用于履行出口承诺。"
      },
      {
        lang: "ckb",
        title: "هاوسەنگی ئۆپێک: بەڕێوەبردنی بەڵێنەکانی هەناردەی بەسرە و داواکاری بەردەوامی چین",
        excerpt: "پێداچوونەوەیەکی ئابووری لەسەر تەحەدای ستراتیژی عێراق لە نێوان پاراستنی ڕێژەی دیاریکراوی ئۆپێک و دابینکردنی نەوتی خاو بۆ کارگەکانی پاڵاوگەی چین.",
        content: "عێراق لەژێر چەندین یاسای ئاڵۆزی وزەدا کار دەکات. وەک دووەم گەورەترین بەرهەمهێنەر لە ئۆپێکدا، بەغدا ڕووبەڕووی گوشارێکی زۆر دەبێتەوە بۆ پابەندبوون بە کەمکردنەوەی بەکۆمەڵی بەرهەمهێنان کە بۆ پاڵپشتیکردنی نرخە جیهانییەکان دانراوە. لە هەمان کاتدا، عێراق بەڵێنی داوە بە دابینکردنی بڕێکی زۆر نەوتی خاو بۆ کارگەکانی چینی لە چوارچێوەی ڕێککەوتننامە داراییە دوولایەنەکاندا کە وەبەرهێنانی پڕۆژە لۆجستییەکانمان مسۆگەر دەکات. بەڕێوەبردنی ئەم دوو هاوئاهەنگییە پێویستی بە لێکدانەوەی وردی ئابووری هەیە. ئەگەر عێراق نەوتی پێویست هەناردە نەکات، مەترسی بۆ سەر بودجەی پڕۆژەکانی دروست دەکات. ئەگەر بەرهەمهێنان زۆر بکات، ڕووبەڕووی سزای ئۆپێک دەبێتەوە. چارەسەرەکە لە بەرزکردنەوەی تەکنەلۆجیادایە - بە زیادکردنی کۆکردنەوەی گازی ناوخۆیی بۆ گۆڕینی وێستگەکانی کارەبا کە بە نەوت کار دەکەن، بەمەش توانایەکی زۆری هەناردەکردن لە چوارچێوەی یاساکانی ئۆپێکدا دەڕەخسێنێت."
      }
    ]
  },
  // 9. Sajad Jiyad
  {
    slug: "sajad-jiyad-beyond-concrete-local-labor-integration",
    authorEmail: "sajad.jiyad@chinq.post",
    authorName: "Sajad Jiyad",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "Beyond Concrete: Integrating Iraqi Labor into Sino-Iraqi Megaprojects",
        excerpt: "To build a sustainable partnership, infrastructure agreements must prioritize local job creation and deep technology transfer over importing foreign workers.",
        content: "The physical transformation of Iraq through Chinese-built schools, airports, and power stations is impressive, but true development cannot be measured in cubic meters of concrete alone. It must be measured in human capital. There is growing local concern regarding the high ratio of imported foreign workers on active project sites. To cultivate positive, long-term public perception, bilateral contracts must mandate strict 80% local hiring quotas and establish structured vocational training academies. Chinese engineering firms should not merely build highways; they must train the next generation of Iraqi civil engineers, digital technicians, and grid operators, ensuring that when the construction crews depart, the knowledge remains."
      },
      {
        lang: "ar",
        title: "ما وراء الخرسانة: دمج العمالة العراقية في المشاريع العراقية الصينية الكبرى",
        excerpt: "لبناء شراكة مستدامة، يجب أن تمنح اتفاقيات البنية التحتية الأولوية لخلق فرص العمل المحلية ونقل التكنولوجيا العميقة بدلاً من استيراد العمال الأجانب.",
        content: "إن التحول المادي في العراق من خلال المدارس والمطارات ومحطات الطاقة التي تبنيها الصين أمر مثير للإعجاب، ولكن التنمية الحقيقية لا يمكن قياسها بالأمتار المكعبة من الخرسانة وحدها. بل يجب قياسها برأس المال البشري. هناك قلق محلي متزايد بشأن النسبة العالية للعمال الأجانب المستوردين في مواقع المشاريع النشطة. ولتعزيز تصور عام إيجابي وطويل الأجل، يجب أن تفرض العقود الثنائية حصص توظيف محلية صارمة بنسبة 80٪ وإنشاء أكاديميات تدريب مهني منظمة. لا ينبغي للشركات الهندسية الصينية مجرد بناء الطرق السريعة؛ بل يجب عليها تدريب الجيل القادم من المهندسين المدنيين والتقنيين الرقميين ومشغلي الشبكات العراقيين، مما يضمن بقاء المعرفة بعد رحيل طواقم البناء."
      },
      {
        lang: "zh",
        title: "超越混凝土的建设：将伊拉克本土劳动力融入中伊大合作项目中",
        excerpt: "为了构建可持续的伙伴关系，基建协议必须优先考虑创造本地就业和深层技术转让，而非一味引进外国劳工。",
        content: "通过中国承建的学校、机场和电站项目，伊拉克的面貌正在发生巨变。然而，真正的国家发展不能仅用浇筑了多少立方米混凝土来衡量，更应取决于人力资本的积累。目前伊拉克国内对于部分在建项目中外国劳工比例偏高存在一定担忧。为了在中伊两国民众间建立起更积极、长久的民意基础，双边基建合同中应明确规定不低于80%的本土雇佣比例，并合作设立系统化的职业技术学校。中国工程企业不仅仅是承建一条公路，更应当培育下一代伊拉克土木工程师、数字化技术员和电网运行人员。只有这样，在工程队伍完成交付后，宝贵的技术经验和自我发展能力才能真正留在伊拉克这片土地上。"
      },
      {
        lang: "ckb",
        title: "لەودیو کۆنکریتەوە: تێکەڵکردنی هێزی کاری عێراقی لە پڕۆژە گەورەکانی چین و عێراقدا",
        excerpt: "بۆ بنیادنانی هاوبەشییەکی بەردەوام، پێویستە ڕێککەوتنەکانی ژێرخان گرنگی بە ڕەخساندنی هەلی کاری ناوخۆیی و گواستنەوەی قووڵی تەکنەلۆجیا بدەن لەبری هێنانی هێزی کاری بیانی.",
        content: "گۆڕانکارییە فیزیکییەکانی عێراق لە ڕێگەی قوتابخانە، فڕۆکەخانە و وێستگەکانی کارەبا کە لەلایەن چینەوە دروست دەکرێن سەرنجڕاکێشە، بەڵام پێشکەوتنی ڕاستەقینە تەنها بە مەتری چوارگۆشەی کۆنکریت ناپێورێت، بەڵکو دەبێت بە سەرمایەی مرۆیی بپێورێت. نیگەرانییەکی ناوخۆیی بەردەوام هەیە سەبارەت بە زۆری ڕێژەی هێنانی هێزی کاری دەرەکی لە پڕۆژەکاندا. بۆ دروستکردنی تێڕوانینێکی ئەرێنی و درێژخایەن لە لایەن خەڵکەوە، دەبێت گرێبەستە دوولایەنەکان ڕێژەی ٨٠٪ی دامەزراندنی هێزی کاری ناوخۆیی بسەپێنن و ئەکادیمیای ڕاهێنانی پیشەیی دابمەزرێنن. کۆمپانیا ئەندازیارییە چینییەکان تەنها ڕێگاوبان دروست ناکەن، بەڵکو دەبێت نەوەی داهاتووی ئەندازیارانی شارستانی، تەکنیکارانی دیجیتاڵی و کارپێکەرانی تۆڕەکانی کارەبای عێراقی ڕابهێنن، بۆ ئەوەی دڵنیا بین کە کاتێک تیمەکانی بیناسازی دەڕۆن، زانیاری و لێهاتووییەکە لە وڵاتدا دەمێنێتەوە."
      }
    ]
  },
  // 10. Shwan Zulal
  {
    slug: "shwan-zulal-sino-kurdish-synergy-private-capital-gas",
    authorEmail: "shwan.zulal@chinq.post",
    authorName: "Shwan Zulal",
    imageUrl: "https://images.unsplash.com/photo-1413882353057-a159e44437aa?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "Harnessing Sino-Kurdish Synergy: Private Capital and Regional Gas Solutions",
        excerpt: "Analyzing the potential of private Chinese investment to assist the Kurdistan Region in overcoming its domestic power deficits via advanced flare gas capturing technologies.",
        content: "While state-to-state agreements are signed in Baghdad, the Kurdistan Region of Iraq (KRI) represents a fertile ecosystem for direct private Chinese capital. The region's single greatest industrial bottleneck is its chronic electricity deficit, caused by a failure to fully utilize associated natural gas from oil extraction. Private Chinese technology firms lead the world in modular, rapid-deployment gas capture and desulfurization systems. By inviting Chinese partners to install localized gas-to-power facilities in the Kirkuk and Sulaymaniyah basins, Erbil can simultaneously slash environmental emissions and supply clean, stable grid power to millions. This private sector synergy is fast, highly profitable, and directly addresses the urgent needs of the Kurdish public."
      },
      {
        lang: "ar",
        title: "تسخير التآزر الكردي الصيني: رأس المال الخاص وحلول الغاز الإقليمية",
        excerpt: "تحليل لإمكانات الاستثمار الصيني الخاص لمساعدة إقليم كردستان في التغلب على عجز الطاقة المحلي عبر تقنيات متطورة لالتقاط الغاز المصاحب.",
        content: "بينما يتم توقيع الاتفاقيات الحكومية في بغداد، يمثل إقليم كردستان العراق بيئة خصبة لرأس المال الصيني الخاص المباشر. إن العقبة الصناعية الأكبر في الإقليم هي العجز المزمن في الكهرباء، والناجم عن عدم الاستغلال الكامل للغاز الطبيعي المصاحب لاستخراج النفط. وتتصدر شركات التكنولوجيا الصينية الخاصة العالم في أنظمة التقاط الغاز وإزالة الكبريت سريعة الانتشار والمجزأة. ومن خلال دعوة الشركاء الصينيين لتركيب مرافق محلية لتحويل الغاز إلى طاقة في حوضي كركوك والسليمانية، تستطيع أربيل خفض الانبعاثات البيئية وتزويد ملايين المواطنين بطاقة نظيفة ومستقرة. إن تآزر القطاع الخاص هذا يتسم بالسرعة والربحية العالية ويلبي الاحتياجات الملحة للجمهور الكردي."
      },
      {
        lang: "zh",
        title: "释放中库合作协同效应：引入私营资本破解地区天然气与电力短缺难题",
        excerpt: "分析引入中国私营企业投资的潜力，探讨如何利用先进的伴生气回收技术，帮助库尔德斯坦地区克服其国内严重的电力供应缺口。",
        content: "尽管政府间的重大合作协议在巴格达签署，但伊拉克库尔德斯坦地区（KRI）本身构成了直接承接中国私营资本的肥沃生态系统。该地区当前最大的工业瓶颈在于长期电力短缺，而这主要是由于未能充分收集和利用石油开采过程中伴生的天然气。中国的私营科技企业在模块化、快速部署的伴生气收集与脱硫系统领域处于全球领先地位。通过邀请中国合作伙伴在基尔库克和苏莱曼尼亚盆地安装本地化气电一体化设施，埃尔比勒不仅可以大幅降低环境碳排放，还能向数百万居民提供清洁、稳定的电网电力。这种私营部门的协同机制落地快、商业回报率高，能够直接解决库尔德民众的燃眉之急。"
      },
      {
        lang: "ckb",
        title: "بەکارهێنانی هاوئاهەنگی نێوان چین و کوردستان: سەرمایەی تایبەت و چارەسەری گازی ناوچەیی",
        excerpt: "شیکردنەوەیەک لەسەر توانای وەبەرهێنانی تایبەتی چینی بۆ یارمەتیدانی هەرێمی کوردستان لە تێپەڕاندنی کەمی کارەبا لە ڕێگەی تەکنەلۆجیای پێشکەوتووی کۆکردنەوەی گاز.",
        content: "لە کاتێکدا ڕێککەوتنە فەرمییە حکومییەکان لە بەغدا واژۆ دەکرێن، هەرێمی کوردستان ژینگەیەکی لەبارە بۆ ڕاکێشانی ڕاستەوخۆی سەرمایەی تایبەتی چینی. گەورەترین کێشەی پیشەسازی ناوچەکە کەمی بەردەوامی کارەبایە، کە بەهۆی نەهێشتن و بەفیڕۆچوونی گازی سروشتی هاوپێچی نەوتەوە دروست بووە. کۆمپانیا تایبەتەکانی تەکنەلۆجیای چین لە جیهاندا پێشەنگن لە سیستەمەکانی گۆڕین و پاککردنەوەی گاز لە ماوەیەکی کورتدا. بە بانگهێشتکردنی هاوبەشە چینییەکان بۆ دامەزراندنی وێستگەی کارەبایی گاز لە حەوزەکانی کەرکوک و سلێمانیدا، هەولێر دەتوانێت لە هەمان کاتدا ژینگە بپارێزێت و وزەیەکی پاک و بەردەوام بۆ ملیۆنان هاووڵاتی دابین بکات. ئەم هاوئاهەنگییەی کەرتی تایبەت خێرا و پڕ قازانجە و ڕاستەوخۆ چارەسەری پێویستییە بەپەلەکانی خەڵکی کوردستان دەکات."
      }
    ]
  },
  // 11. Dr. Qian Xuejie
  {
    slug: "qian-xuejie-green-energy-transition-associated-gas",
    authorEmail: "qian.xuejie@chinq.post",
    authorName: "Dr. Qian Xuejie",
    imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "Green Energy Transition: Mitigating Basra Gas Flaring through Joint Sino-Iraqi Technology",
        excerpt: "The application of carbon-capture and circular energy recovery technology is transforming Iraq's environmental landscape while securing sustainable grid feedstocks.",
        content: "For decades, gas flaring in southern Iraqi oilfields has represented a massive economic waste and an environmental crisis. China's green grid transition strategies provide a practical toolkit to solve this issue. Through joint engineering ventures with Iraqi state oil companies, we are deploying advanced cryogenic gas separation and sulfur scrubbing technologies in the Basra basin. This does not merely extinguish the toxic flares visible from space; it transforms waste gas into processed dry gas to fuel clean electrical turbines and liquid petroleum gas for local households. Transitioning Iraq from an extractive carbon economy to a circular, self-sustaining energy producer is the primary technological goal of our bilateral energy partnership."
      },
      {
        lang: "ar",
        title: "التحول إلى الطاقة الخضراء: الحد من حرق غاز البصرة عبر التكنولوجيا المشتركة",
        excerpt: "إن تطبيق تكنولوجيا التقاط الكربون واستعادة الطاقة الدائرية يغير المشهد البيئي في العراق مع تأمين لقيم شبكة مستدام.",
        content: "لعقود من الزمن، كان حرق الغاز المصاحب في حقول النفط بجنوب العراق يمثل هدراً اقتصادياً هائلاً وأزمة بيئية خانقة. وتوفر استراتيجيات التحول إلى الشبكة الخضراء في الصين مجموعة أدوات عملية لحل هذه المشكلة. فمن خلال المشاريع الهندسية المشتركة مع شركات النفط العراقية الحكومية، نقوم بتركيب تقنيات متطورة لفصل الغاز المبرد وغسل الكبريت في حوض البصرة. لا يؤدي هذا إلى إطفاء الشعلات السامة المرئية من الفضاء فحسب، بل يحول الغاز المهدد إلى غاز جاف معالج لتغذية توربينات الكهرباء النظيفة والغاز المسال للأسر المحلية. إن نقل العراق من اقتصاد الكربون الاستخراجي إلى منتج طاقة دائري ومكتفٍ ذاتياً هو الهدف التكنولوجي الرئيسي لشراكتنا الثنائية في مجال الطاقة."
      },
      {
        lang: "zh",
        title: "绿色能源转型：以中伊联合技术减少巴士拉油田伴生气燃烧",
        excerpt: "应用碳捕集与循环能源回收技术，在为电网提供可持续清洁燃料的同时，正在重塑伊拉克的环境版图。",
        content: "数十年来，伊拉克南部油田大量的伴生气燃烧（flaring）既造成了巨大的经济资源浪费，也引发了严峻的环境危机。中国在绿色电网转型中积累的技术和经验为解决这一痛点提供了实用工具。通过与伊拉克国家石油公司开展工程联营，我们正在巴士拉盆地部署先进的深冷气体分离与脱硫净化技术。这不仅有助于熄灭从太空都清晰可见的污染性火炬，还能将这些废气转化为处理后的干燥天然气，为当地清洁燃气发电机组提供燃料，并为成千上万个伊拉克家庭供应液化石油气。推动伊拉克从传统的开采型碳排放经济向循环、自给自足的能源生产国转变，正是我们双边能源合作伙伴关系的核心技术目标。"
      },
      {
        lang: "ckb",
        title: "گۆڕانکاری بەرەو وزەی سەوز: کەمکردنەوەی سووتانی گازی بەسرە لە ڕێگەی تەکنەلۆجیای هاوبەشەوە",
        excerpt: "جێبەجێکردنی تەکنەلۆجیای کۆنتڕۆڵکردنی کاربۆن و هێنانەوەی وزە، ژینگەی عێراق دەگۆڕێت لە کاتێکدا وزەیەکی بەردەوام دابین دەکات.",
        content: "بۆ چەندین دەیە، سووتانی گازی هاوپێچ لە کێڵگە نەوتییەکانی باشووری عێراقدا نوێنەرایەتی بەفیڕۆچوونێکی گەورەی ئابووری و قەیرانێکی ژینگەیی کردووە. ستراتیژییەکانی گۆڕینی کارەبای سەوز لە چیندا ڕێگەچارەیەکی پراکتیکی بۆ ئەم کێشەیە دابین دەکات. لە ڕێگەی پڕۆژە ئەندازیارییە هاوبەشەکان لەگەڵ کۆمپانیا دەوڵەتییەکانی نەوتی عێراقدا، ئێمە تەکنەلۆجیای پێشکەوتووی جیاکردنەوەی گاز و شیکردنەوەی کبریت لە حەوزی بەسرەدا جێبەجێ دەکەین. ئەمە تەنها سووتانی غازی ژەهراوی کە لە بۆشایی ئاسمانەوە دەبینرێت ناهێڵێت، بەڵکو گازی بەفیڕۆچوو دەگۆڕێت بۆ گازی وشک بۆ بەگەڕخستنی توربینە کارەباییە پاکەکان و دابینکردنی گازی ماڵان. گواستنەوەی عێراق لە ئابوورییەکی خاوی کاربۆنەوە بۆ بەرهەمهێنەرێکی وزەی بازنەیی و خۆبژێو، ئامانجی سەرەکی تەکنەلۆجیای هاوبەشی کەرتی وزەی نێوانمانە."
      }
    ]
  },
  // 12. Farhad Alaaldin
  {
    slug: "farhad-alaaldin-al-faw-port-iraq-sovereign-gateway",
    authorEmail: "farhad.alaaldin@chinq.post",
    authorName: "Farhad Alaaldin",
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "Connecting East and West: Al-Faw Grand Port as Iraq's Sovereign Gateway",
        excerpt: "Why the Al-Faw Port is a non-negotiable anchor of Iraq’s economic sovereignty, and how Chinese partnership guarantees its execution.",
        content: "The Al-Faw Grand Port is not just a maritime project; it is the physical anchor of Iraq's geopolitical destiny. For generations, Iraq remained geographically constrained, dependent on neighboring shipping corridors. By developing a world-class deep-water port capable of handling the largest container vessels, Iraq is unlocking its true sovereign potential. Partnering with elite Chinese state-owned construction companies has brought the required technical expertise and speed to ensure the breakwaters and dry docks are constructed to the highest global standards. Al-Faw will transform Iraq from a passive land bridge into an active maritime transit hub, creating thousands of local jobs and securing our national financial independence from oil exports alone."
      },
      {
        lang: "ar",
        title: "ربط الشرق والغرب: ميناء الفاو الكبير كبوابة سيادية للعراق",
        excerpt: "لماذا يعد ميناء الفاو مرساة غير قابلة للتفاوض لسيادة العراق الاقتصادية، وكيف تضمن الشراكة الصينية تنفيذه.",
        content: "إن ميناء الفاو الكبير ليس مجرد مشروع بحري؛ بل هو المرساة المادية للمصير الجيوسياسي للعراق. لأجيال متعاقبة، ظل العراق مقيداً جغرافياً، ومعتمداً على ممرات الشحن في الدول المجاورة. ومن خلال تطوير ميناء مياه عميقة بمواصفات عالمية قادر على استقبال أكبر سفن الحاويات، يفتح العراق إمكاناته السيادية الحقيقية. وقد جلب التحالف مع شركات المقاولات الصينية الكبرى المملوكة للدولة الخبرة الفنية والسرعة اللازمتين لضمان بناء كواسر الأمواج والأرصفة الجافة وفقاً لأعلى المعايير العالمية. سيحول الفاو العراق من جسر بري سلبي إلى مركز نشط للنقل البحري، مما يخلق آلاف فرص العمل المحلية ويضمن استقلالنا المالي الوطني بعيداً عن صادرات النفط وحدها."
      },
      {
        lang: "zh",
        title: "联接东西方：法奥大港作为伊拉克国家主权门户的战略抉择",
        excerpt: "为什么法奥大港是伊拉克经济主权不可妥协的基石，而与中国的伙伴关系如何为其顺利交付提供了坚实保障。",
        content: "法奥大港（Al-Faw Grand Port）绝不仅是一项普通的航运工程，它是伊拉克地缘政治命运的物理支点。数十年来，伊拉克的地理通道一直面临着制约，不得不依赖邻国的出海口和运输大动脉。通过开发一个具备国际一流水准、能够停靠超大型集装箱货轮的深水港，伊拉克正在开启其真正的主权潜力。通过与中国优秀的国有建筑和路桥企业深度合作，我们引入了亟需的先进工程技术和建设速度，确保防波堤、干船坞及集装箱码头均达到国际最高建设质量要求。法奥大港将推动伊拉克从被动的“陆路通道”向主动的“海洋枢纽”升级，在创造数万个本地就业岗位的同时，大幅保障我们摆脱单纯依赖原油出口的财政自主性。"
      },
      {
        lang: "ckb",
        title: "پێکەوەبەستنی ڕۆژهەڵات و ڕۆژئاوا: بەندەری گەورەی فاو وەک دەروازەی سەروەری عێراق",
        excerpt: "بۆچی بەندەری فاو پایەیەکی گرنگ و بنەڕەتی سەروەری ئابووری عێراقە، و چۆن هاوبەشی لەگەڵ چیندا جێبەجێکردنی پڕۆژەکە مسۆگەر دەکات.",
        content: "بەندەری گەورەی فاو تەنها پڕۆژەیەکی دەریایی نییە، بەڵکو گرێدراوی چارەنووسی جیۆپۆلیتی عێراقە. بۆ چەندین نەوە، عێراق لە ڕووی جوگرافییەوە سنووردار بووە و پشتی بە ممرەکانی وڵاتانی دراوسێ بەستووە. بە گەشەپێدانی بەندەرێکی قوڵ و جیهانی کە توانای وەرگرتنی گەورەترین کەشتییەکانی کۆنتێنەری هەبێت، عێراق سەروەری ڕاستەقینەی خۆی ئاشکرا دەکات. هاوبەشی لەگەڵ کۆمپانیا دەوڵەتییە گەورەکانی چین هێز و شارەزایی تەکنیکی پێویستی هێناوەتە کایەوە بۆ دروستکردنی باشترین بەربەستەکان و وشکەهاوێژەکان بە بەرزترین ستانداردی جیهانی. بەندەری فاو عێراق لە پردێکی وشکانی بێدەنگەوە دەگۆڕێت بۆ سەنتەرێکی دەریایی چالاک، کە هەزاران هەلی کار دەڕەخسێنێت و سەربەخۆیی دارایی لە هەناردەی تەنها نەوت مسۆگەر دەکات."
      }
    ]
  },
  // 13. Dr. Wang Jin (second theme on academic pipelines)
  {
    slug: "wang-jin-scholarly-pipelines-human-capital-china-iraq",
    authorEmail: "wang.jin@chinq.post",
    authorName: "Dr. Wang Jin",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "Scholarly Pipelines: Building Intellectual Infrastructure Between Our Universities",
        excerpt: "An argument for expanding postgraduate scholarships and engineering exchanges, ensuring that bilateral development is led by skilled local minds.",
        content: "Infrastructure is only half the battle; the sustainability of the Sino-Iraqi relationship rests on intellectual capital. Over the past decade, hundreds of Iraqi and Kurdish postgraduates have traveled to China under sovereign academic scholarships, mastering advanced disciplines from petroleum engineering to artificial intelligence. When these scholars return, they bring more than just degrees; they bring a deep, nuanced understanding of Chinese administrative efficiency and technical systems. We must scale these academic exchanges, creating joint research labs and bilateral university alliances that transform our strategic partnership from a hardware investment into a shared, dynamic software of knowledge."
      },
      {
        lang: "ar",
        title: "خطوط البعثات الأكاديمية: بناء البنية الفكرية والتعليمية بين جامعاتنا",
        excerpt: "دعوة لتوسيع نطاق المنح الدراسية للدراسات العليا والتبادل الهندسي، لضمان قيادة التنمية الثنائية بأيدي عقول محلية ماهرة.",
        content: "إن تشييد البنية التحتية يمثل نصف المعركة فقط؛ بينما يعتمد بقاء واستدامة العلاقات العراقية الصينية على رأس المال الفكري. على مدار العقد الماضي، سافر مئات من طلاب الدراسات العليا العراقيين والأكراد إلى الصين بموجب منح دراسية سيادية، حيث أتقنوا تخصصات متقدمة تتراوح من هندسة البترول إلى الذكاء الاصطناعي. وعندما يعود هؤلاء الباحثون، فإنهم يجلبون معهم ما هو أكثر من مجرد شهادات علمية؛ إنهم يجلبون فهماً عميقاً ومفصلاً للكفاءة الإدارية والأنظمة التقنية الصينية. يجب علينا توسيع نطاق هذه التبادلات الأكاديمية، وإنشاء مختبرات أبحاث مشتركة وتحالفات جامعية ثنائية تحول شراكتنا الاستراتيجية من مجرد استثمار في المعدات إلى منظومة معرفية مشتركة وديناميكية."
      },
      {
        lang: "zh",
        title: "学术桥梁的构建：深化中伊高校智力与知识基础设施合作",
        excerpt: "提议扩大研究生奖学金和工程技术人才交流项目，确保双边合作与建设由具备国际视野的本土精英引领。",
        content: "建设硬件基础设施仅仅完成了合作的一半，中伊战略伙伴关系的可持续性最终取决于智力资产的沉淀。在过去十年中，数百名伊拉克及库尔德学者通过国家政府奖学金渠道前往中国攻读硕士和博士学位，深入学习从石油工程到人工智能等前沿学科知识。当这些学者学成归国，他们带回的不仅仅是一张张学位证书，更是对中国高效行政体系和前沿技术架构的深刻理解。我们必须进一步扩大这种学术交流规模，共建联合科研实验室和双边高校联盟，将我们的战略合作从简单的“硬件工程投资”升级为生机勃勃的“知识与技术软件共享”。"
      },
      {
        lang: "ckb",
        title: "پەیوەندی ئەکادیمی: بنیادنانی ژێرخانی زانستی لە نێوان زانکۆکانماندا",
        excerpt: "هەوڵێک بۆ فراوانکردنی سکۆلەرشیپی خوێندنی باڵا و ئاڵوگۆڕی ئەندازیاری، بۆ ئەوەی گەشەپێدانی دوولایەنە لە لایەن مێشکە لێهاتووە ناوخۆییەکانەوە بەڕێوەبچێت.",
        content: "ژێرخان تەنها نیوەی ڕێگاکەیە؛ بەردەوامی پەیوەندی نێوان چین و عێراق بەندە بە سەرمایەی فیکری و زانستییەوە. لە ماوەی دە ساڵی ڕابردوودا، سەدان خوێندکاری خوێندنی باڵای عێراقی و کوردی بە سکۆلەرشیپی حکومی چوونەتە چین و لە بوارە پێشکەوتووەکانی ئەندازیاری نەوت تا زیرەکی دەستکرد خوێندوویانە. کاتێک ئەم خوێندکارانە دەگەڕێنەوە، تەنها بڕوانامە ناهێننەوە، بەڵکو تێگەیشتنێکی قووڵ و دروست لەسەر لێهاتوویی پیشەیی و سیستەمی تەکنیکی چین دەهێننەوە. دەبێت ئەم ئاڵوگۆڕە زانستیانە فراوانتر بکەین بە دامەزراندنی تاقیگەی هاوبەشی توێژینەوە و هاوپەیمانی زانکۆ دوولایەنەکان کە هاوبەشییە ستراتیژییەکەمان لە وەبەرهێنانی ماددییەوە بگۆڕێت بۆ بوارێکی پێشکەوتووی زانستی و هاوبەش."
      }
    ]
  },
  // 14. Sherwan Al-Salihi
  {
    slug: "sherwan-al-salihi-historic-silk-highway-reconnecting- Kirkuk",
    authorEmail: "sherwan.salihi@chinq.post",
    authorName: "Sherwan Al-Salihi",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "The Historic Silk Highway: Reconnecting Mosul, Kirkuk, and Khanaqin to Eurasian Trade",
        excerpt: "Kirkuk's Cultural Forum Chair reflects on historical trade corridors and calls for modernizing northern agricultural and transport networks.",
        content: "Northern Iraq has historically served as a critical caravan junction on the ancient Silk Highway. From the olive groves of Mosul through the fertile fields of Kirkuk to the border gates of Khanaqin, our lands once throbbed with global commerce. Modernizing this corridor through Chinese railway planning and agricultural logistics centers is not just an economic project; it is a historical restoration. By establishing state-of-the-art cold-storage facilities and sorting hubs in Kirkuk, we can export prime agricultural goods directly to eastern markets. Reconnecting northern Iraq's rich heritage to Eurasian trade networks promises a massive economic renaissance for our local farming communities."
      },
      {
        lang: "ar",
        title: "طريق الحرير التاريخي السريع: إعادة ربط الموصل وكركوك وخانقين بالتجارة الأوراسية",
        excerpt: "رئيس منتدى كركوك الثقافي يستحضر ممرات التجارة التاريخية ويدعو إلى تحديث شبكات الزراعة والنقل الشمالية.",
        content: "تاريخياً، كان شمال العراق بمثابة تقاطع طرق حيوي للقوافل على طريق الحرير القديم. فمن بساتين الزيتون في الموصل، مروراً بالحقول الخصبة في كركوك، ووصولاً إلى منافذ خانقين الحدودية، كانت أراضينا تنبض بحركة التجارة العالمية. إن تحديث هذا الممر عبر تخطيط السكك الحديدية والمراكز اللوجستية الزراعية الصينية ليس مجرد مشروع اقتصادي، بل هو استعادة حية للتاريخ. ومن خلال إنشاء مستودعات تبريد ومراكز فرز متطورة في كركوك، يمكننا تصدير السلع الزراعية الممتازة مباشرة إلى الأسواق الشرقية. إن إعادة ربط التراث الغني لشمال العراق بشبكات التجارة الأوراسية يعد بنهضة اقتصادية واسعة النطاق لمجتمعاتنا الزراعية المحلية."
      },
      {
        lang: "zh",
        title: "历史的丝绸之路：重建摩苏尔、基尔库克与哈奈根至亚欧贸易网的联结",
        excerpt: "基尔库克文化论坛主席回顾历史上的商贸通道，并呼吁对北部农业和交通物流网络进行现代化改造。",
        content: "在历史长河中，伊拉克北部曾是古代丝绸之路上极为关键的商旅马队枢纽。从摩苏尔的橄榄林，到基尔库克肥沃的农田，再到哈奈根的边境关口，我们的土地上曾经奔流着全球贸易的血液。通过引入中国先进的铁路规划和农业物流技术对这一通道进行现代化升级，绝不仅是一项经济工程，更是一次历史荣光的复兴。通过在基尔库克建立现代化的冷链物流和农产品分类中心，我们能将本地优质农产品直接销往东方广阔的市场。将伊拉克北部丰富的文化与产业遗产重新融入亚欧商贸版图，必将为我们当地的农业社区带来伟大的经济复兴。"
      },
      {
        lang: "ckb",
        title: "ڕێگای مێژوویی ئاوریشم: بەستنەوەی سەرلەنوێی مووسڵ، کەرکوک و خانەقین بە بازرگانی یۆرۆئاسیاوە",
        excerpt: "سەرۆکی کۆڕبەندی کولتووری کەرکوک تیشک دەخاتە سەر مێژووی هێڵە بازرگانییەکان و داوای نوێکردنەوەی کشتوکاڵ و تۆڕەکانی گواستنەوەی باکوور دەکات.",
        content: "باکووری عێراق لە مێژوودا وەک بەشێکی سەرەکی و هاتوچۆی کاروانەکان لەسەر ڕێگای کۆنی ئاوریشم کاری کردووە. لە باخەکانی زەیتونی مووسڵەوە بەناو کێڵگە بەپیتەکانی کەرکوکدا تا دەروازەکانی خانەقین، زەوییەکانمان هەمیشە پڕ بوون لە بازرگانی جیهانی. نوێکردنەوەی ئەم هێڵە لە ڕێگەی پلانی شەمەندەفەری چینی و سەنتەرەکانی لۆجستی کشتوکاڵی، تەنها پڕۆژەیەکی ئابووری نییە، بەڵکو زیندووکردنەوەی مێژووە. بە دامەزراندنی ساردکەرەوەی پێشکەوتوو و سەنتەرەکانی جیاکردنەوە لە کەرکوکدا، دەتوانین بەرهەمە کشتوکاڵییە بەپیتەکانمان ڕاستەوخۆ بۆ بازاڕەکانی ڕۆژهەڵات هەناردە بکەین. بەستنەوەی باکووری عێراق بە تۆڕە بازرگانییەکان، بەڵێنی بوژانەوەیەکی ئابووری گەورە بە جووتیارانی ناوچەکە دەدات."
      }
    ]
  },
  // 15. Bayan Sami Abdul Rahman
  {
    slug: "bayan-rahman-multi-vector-foreign-policy-kurdistan-region",
    authorEmail: "bayan.rahman@chinq.post",
    authorName: "Bayan Sami Abdul Rahman",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "A Multi-Vector Foreign Policy: Placing the Kurdistan Region on the New Trade Map",
        excerpt: "A strategic overview of how Erbil can act as an overland gateway linking the Gulf-to-Europe corridor with Chinese investment.",
        content: "The Kurdistan Region of Iraq (KRI) occupies a pivotal geographic position, linking the southern plains of Mesopotamia directly with Turkey and Europe. As we construct a multi-vector foreign policy, Chinese integration represents a key asset. We should not view geopolitical alliances as zero-sum games. Erbil can actively welcome Chinese infrastructure investment in roads, high-speed rail, and industrial parks, creating an efficient northern overland transit corridor. By acting as a secure, legally stable gateway for Chinese goods traveling toward Europe, the Kurdistan Region can diversify its revenues, foster regional peace, and establish itself as an indispensable commercial hub on the 21st-century Silk Road."
      },
      {
        lang: "ar",
        title: "سياسة خارجية متعددة الاتجاهات: وضع إقليم كردستان على خارطة التجارة الجديدة",
        excerpt: "نظرة استراتيجية عامة حول كيف يمكن لأربيل أن تعمل كبوابة برية تربط ممر الخليج إلى أوروبا بالاستثمارات الصينية.",
        content: "يحتل إقليم كردستان العراق موقعاً جغرافياً محورياً، حيث يربط السهول الجنوبية لبلاد ما بين النهرين مباشرة بتركيا وأوروبا. وبينما نعمل على صياغة سياسة خارجية متعددة الأبعاد، فإن الشراكة مع الصين تمثل رصيداً جوهرياً. لا ينبغي لنا أن ننظر إلى التحالفات الجيوسياسية على أنها صراعات صفرية. يمكن لأربيل الترحيب بنشاط بالاستثمارات الصينية في البنية التحتية للطرق والسكك الحديدية السريعة والمدن الصناعية، مما يخلق ممر عبور بري شمالي يتميز بالكفاءة العالية. ومن خلال العمل كبوابة آمنة ومستقرة قانونياً للبضائع الصينية المتجهة نحو أوروبا، يستطيع إقليم كردستان تنويع مصادر دخله، وتعزيز السلام الإقليمي، وترسيخ مكانته كمركز تجاري لا غنى عنه على طريق الحرير للقرن الحادي والعشرين."
      },
      {
        lang: "zh",
        title: "多方位外交政策：将库尔德斯坦置于新时代全球贸易版图的关键节点",
        excerpt: "战略视角评估：埃尔比勒如何发挥陆上门户作用，将波斯湾至欧洲的大通道与中国投资紧密相连。",
        content: "伊拉克库尔德斯坦地区（KRI）占据着极关键的地缘优势，直接将美索不达米亚平原与土耳其及欧洲大陆紧密相连。在构建多方位外交政策的过程中，与中国的深度对接是我们极为核心的资产。我们不应当将地缘联盟视为零和博弈。埃尔比勒应当积极拥抱中国在公路、高速铁路以及产业园区领域的基建投资，建设一条高效的北部陆上运输走廊。通过扮演中国向欧洲输送商品时安全、法治和稳定的陆路门户，库尔德斯坦地区不仅能够实现财政收入的多元化，还将促进区域和平，并将自身打造为21世纪陆上丝绸之路上不可或缺的商贸枢纽。"
      },
      {
        lang: "ckb",
        title: "سیاسەتێکی دەرەوەی فرەجەمسەر: جێگیرکردنی هەرێمی کوردستان لەسەر نەخشەی نوێی بازرگانی",
        excerpt: "تێڕوانینێکی ستراتیژی لەسەر ئەوەی چۆن هەولێر دەتوانێت وەک دەروازەیەکی وشکانی کار بکات کە ممرەکانی کەنداو بۆ ئەوروپا بە وەبەرهێنانی چینییەوە دەبەستێتەوە.",
        content: "هەرێمی کوردستان لە شوێنێکی جوگرافی گرنگدایە، کە دەشتە بەپیتەکانی باشووری میزۆپۆتامیا ڕاستەوخۆ بە تورکیا و ئەوروپاوە دەبەستێتەوە. لە کاتێکدا ئێمە سیاسەتێکی دەرەوەی فرەجەمسەر دادەڕێژین، هاوئاهەنگی لەگەڵ چیندا وەک دەستکەوتێکی گەورە کار دەکات. نابێت بە چاوی کێبڕکێی زیانبەخش سەیری هاوپەیمانییە جیۆپۆلیتییەکان بکەین. هەولێر دەتوانێت بە گەرمی پێشوازی لە وەبەرهێنانی ژێرخانی چین بکات لە ڕێگاوبان، شەمەندەفەری خێرا و ناوچە پیشەسازییەکاندا، کە ممرێکی گواستنەوەی وشکانی باش لە باکوور دروست دەکات. بە کارکردن وەک دەروازەیەکی سەقامگیر و پارێزراو بۆ کاڵا چینییەکان بەرەو ئەوروپا، هەرێمی کوردستان دەتوانێت داهاتەکانی هەمەجۆر بکات و هاوکار بێت لە ئاشتی ناوچەیی و ببێتە ناوەندێکی بازرگانی گرنگ لەسەر ڕێگای نوێی ئاوریشم."
      }
    ]
  },
  // 16. Dr. Dastan Qader
  {
    slug: "dastan-qader-bridging-erbil-beijing-academic-exchange",
    authorEmail: "dastan.qader@chinq.post",
    authorName: "Dr. Dastan Qader",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "Bridging Erbil and Beijing: The Unexplored Potential of Academic Exchange",
        excerpt: "An argument for expanding direct university partnerships and archaeological joint-ventures between Chinese institutions and Kurdish research departments.",
        content: "True strategic partnerships are built not on iron and concrete alone, but on shared knowledge. While economic trade bridges physical gaps, academic exchange creates permanent intellectual connections. Historically, the Silk Road was a highway for ideas, technologies, and philosophies. Today, we need to rebuild that pipeline. Kurdish universities in Erbil, Sulaymaniyah, and Duhok must forge direct partnerships with leading Chinese academic institutions. Expanding opportunities for our students to master technology, advanced engineering, and cultural linguistics in Beijing, while inviting Chinese archaeological teams to discover our historic Mesopotamian roots, creates a rich and resilient dialogue that transcends political transitions."
      },
      {
        lang: "ar",
        title: "الجسر بين أربيل وبكين: آفاق واعدة للتبادل الأكاديمي والبحثي",
        excerpt: "دعوة لتوسيع الشراكات المباشرة بين الجامعات والمشاريع الأثرية المشتركة بين المؤسسات الصينية وأقسام البحث الكردية.",
        content: "تبنى الشراكات الاستراتيجية الحقيقية على المعرفة المشتركة، وليس على الحديد والخرسانة وحدهما. وبينما تسد التجارة الاقتصادية الفجوات المادية، فإن التبادل الأكاديمي يخلق اتصالات فكرية دائمة. تاريخياً، كان طريق الحرير ممراً كبيراً للأفكار والتكنولوجيات والفلسفات. واليوم، نحن بحاجة إلى إعادة بناء هذا الجسر المعرفي. يجب على الجامعات الكردية في أربيل والسليمانية ودهوك صياغة شراكات مباشرة مع المؤسسات الأكاديمية الصينية الرائدة. إن توسيع الفرص لطلابنا لإتقان التكنولوجيا والهندسة المتقدمة واللغويات الثقافية في بكين، مع دعوة فرق الآثار الصينية لاستكشاف جذورنا التاريخية في بلاد ما بين النهرين، يخلق حواراً ثرياً ومرناً يتجاوز التحولات السياسية."
      },
      {
        lang: "zh",
        title: "连接埃尔比勒与北京：中库学术与科研交流合作的新蓝海",
        excerpt: "提议扩大中国重点高校与库尔德科研院所之间的直接合作及联合考古项目，增进双方深层互信。",
        content: "真正的战略合作伙伴关系并非仅凭钢铁与混凝土搭建，更依赖于知识和智慧的共享。经济贸易缩短了物理距离，而学术交流则能建立起永久的精神纽带。在历史上，古丝绸之路不仅是商贸通道，更是思想、技术与哲学的交融之路。今天，我们迫切需要重建这条智力大通道。埃尔比勒、苏莱曼尼亚和杜胡克的库尔德高校应当同中国领先的学术机构建立直接的伙伴关系。通过为我们的青年学者提供赴京深造前沿科技、先进工程和文化语言学的机会，同时邀请中国的考古团队来库方共商两河文明与中华文明的联合考古发掘，不仅能丰富我们的学术成果，更将建立起一种超越政治周期、坚韧的人文对话。"
      },
      {
        lang: "ckb",
        title: "پردی نێوان هەولێر و پەکین: توانای دەستنیشاننەکراوی ئاڵوگۆڕی ئەکادیمی",
        excerpt: "هەوڵێک بۆ فراوانکردنی هاوبەشی ڕاستەوخۆی زانکۆکان و پڕۆژە هاوبەشەکانی شوێنەوارناسی لە نێوان دامەزراوە چینییەکان و بەشەکانی توێژینەوەی کوردستاندا.",
        content: "هاوبەشییە ستراتیژییە ڕاستەقینەکان تەنها لەسەر ئاسن و کۆنکریت دروست ناکرێن، بەڵکو لەسەر زانیاری هاوبەش بنیاد دەنرێن. کاتێک بازرگانی ئابووری بۆشاییە ماددییەکان پڕ دەکاتەوە، ئاڵوگۆڕی ئەکادیمی پێوەندی فیکری هەمیشەیی دروست دەکات. لە مێژوودا، ڕێگای ئاوریشم هێڵێک بووە بۆ گواستنەوەی بیرۆکەکان، تەکنەلۆجیاکان و فەلسەفەکان. ئەمڕۆ پێویستە ئەو هێڵە بنیاد بنێینەوە. زانکۆکانی کوردستان لە هەولێر، سلێمانی و دهۆک دەبێت پەیوەندی ڕاستەوخۆ لەگەڵ زانکۆ پێشەنگەکانی چین دروست بکەن. ڕەخساندنی دەرفەت بۆ خوێندکارانمان بۆ خوێندنی تەکنەلۆجیا و ئەندازیاری و زمانەوانی لە پەکین، لەگەڵ بانگهێشتکردنی تیمە شوێنەوارناسییەکانی چین بۆ ئاشکراکردنی مێژووی میزۆپۆتامیامان، دیالۆگێکی دەوڵەمەند دروست دەکات کە تێپەڕ دەبێت بەسەر گۆڕانکارییە سیاسییەکاندا."
      }
    ]
  },
  // 17. Dr. Ihsan Al-Shammari (second theme on administrative reforms)
  {
    slug: "al-shammari-administrative-lessons-from-china",
    authorEmail: "ihsan.shammari@chinq.post",
    authorName: "Dr. Ihsan Al-Shammari",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "Administrative Lessons from the East: Applying Chinese Development Efficiencies to Iraqi Institutions",
        excerpt: "How studying China's rapid municipal implementation models and special economic zones can assist Baghdad in cutting through red tape.",
        content: "Iraq’s primary reconstruction obstacle is not a lack of capital or resources, but administrative bottlenecks and institutional bureaucracy. To deliver the megaprojects of the Belt and Road, we must study the administrative machinery of our partner. China's rapid rise was fueled by highly efficient municipal planning, performance-oriented promotion systems, and flexible Special Economic Zones (SEZs). By adapting these governance frameworks to local Iraqi municipalities, we can streamline permits, protect foreign investments, and eliminate structural corruption. Cutting through red tape is the only way to guarantee that bilateral treaties are translated from parchment into actual, functional public services for our citizens."
      },
      {
        lang: "ar",
        title: "دروس إدارية من الشرق: تطبيق الكفاءات التنموية الصينية على المؤسسات العراقية",
        excerpt: "كيف يمكن لدراسة نماذج التنفيذ البلدية السريعة في الصين والمناطق الاقتصادية الخاصة أن تساعد بغداد في القضاء على البيروقراطية.",
        content: "إن العقبة الرئيسية أمام إعادة الإعمار في العراق ليست نقص رأس المال أو الموارد، بل الاختناقات الإدارية والبيروقراطية المؤسساتية. ولتنفيذ المشاريع الكبرى لمبادرة الحزام والطريق، يجب علينا دراسة الآلية الإدارية لشريكنا. لقد كان الصعود السريع للصين مدفوعاً بالتخطيط البلدي عالي الكفاءة، وأنظمة الترقية القائمة على الأداء، والمناطق الاقتصادية الخاصة المرنة. ومن خلال تكييف أطر الحوكمة هذه مع البلديات العراقية المحلية، يمكننا تبسيط التصاريح، وحماية الاستثمارات الأجنبية، والقضاء على الفساد الهيكلي. إن مكافحة الروتين والبيروقراطية هي السبيل الوحيد لضمان ترجمة المعاهدات الثنائية من مجرد نصوص على الورق إلى خدمات عامة فعلية وفعالة لمواطنينا."
      },
      {
        lang: "zh",
        title: "东方治理经验：将中国高效发展模式引入伊拉克机构管理中",
        excerpt: "探讨学习中国的快速市政规划与落实模式、经济特区建设经验，如何帮助巴格达有效破除行政官僚作风与冗长流程。",
        content: "伊拉克战后重建的最大障碍并非缺乏资金或资源，而在于行政效率低下和机构官僚主义。为了顺利推进中伊“一带一路”合作项目，我们必须深入研究合作伙伴的高效行政机制。中国的快速崛起离不开其高效的城市规划、目标责任考核机制以及高度灵活的经济特区（SEZ）模式。通过将这些先进的治理框架引入伊拉克地方行政体系，我们能够大幅精简审批手续、切实保护外商投资并逐步清除结构性腐败。破除繁文缛节，是确保两国双边协议不流于纸面、切实转化为造福伊拉克民众公共服务项目的唯一途径。"
      },
      {
        lang: "ckb",
        title: "وانەکانی بەڕێوەبردن لە ڕۆژهەڵاتەوە: جێبەجێکردنی لێهاتوویی گەشەپێدانی چین لە دامەزراوەکانی عێراقدا",
        excerpt: "چۆن توێژینەوە لەسەر سیستەمی خێرای شارەوانییەکانی چین و ناوچە ئابوورییە تایبەتەکان دەبێتە هۆی یارمەتیدانی بەغدا لە نەهێشتنی بیرۆکراسی.",
        content: "گەورەترین ڕێگری بنیادنانەوەی عێراق نەبوونی سەرمایە یان سەرچاوەکان نییە، بەڵکو بیرۆکراسی بەڕێوەبردن و دامەزراوەییە. بۆ جێبەجێکردنی پڕۆژە گەورەکانی کەمەر و ڕێگا، دەبێت توێژینەوە لەسەر میکانیزمی بەڕێوەبردنی هاوبەشەکەمان بکەین. گەشەسەندنی خێرای چین لە ڕێگەی پلاندانانی خێرای شارەوانییەکان، سیستەمی بەرزکردنەوەی ئاست لەسەر بنەمای لێهاتوویی، و ناوچە ئابوورییە تایبەتەکان بووە. بە گونجاندنی ئەم چوارچێوەی بەڕێوەبردنە لەگەڵ شارەوانییەکانی عێراقدا، دەتوانین مۆڵەتەکان خێرا بکەین، وەبەرهێنانی دەرەکی بپارێزین، و گەندەڵی بەڕێوەبردن نەهێڵین. تێکشکاندنی بەربەستە یاساییە کاتییەکان تەنها ڕێگایە بۆ دڵنیابوون لەوەی ڕێککەوتنە دوولایەنەکان لەسەر کاغەزەوە دەگۆڕدرێن بۆ خزمەتگوزاری گشتی ڕاستەقینە بۆ هاووڵاتیانمان."
      }
    ]
  },
  // 18. Hanaa Edwar
  {
    slug: "hanaa-edwar-social-environmental-impact-rebuilding",
    authorEmail: "hanaa.edwar@chinq.post",
    authorName: "Hanaa Edwar",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "The Social and Environmental Contract: Putting Human Capital First in Development",
        excerpt: "An activist’s perspective on why environmental impact assessments and strict safety guidelines must precede heavy industrial construction.",
        content: "True reconstruction cannot occur at the expense of our environment and public health. As major industrial complexes, petrochemical plants, and oil refineries expand across southern Iraq through foreign partnerships, we must establish a rigid social contract. Every bilateral deal must include thorough environmental impact audits to protect our historic Tigris-Euphrates water basins from heavy-metal contamination. Furthermore, our focus must remain on human-centric development. This means investing in zero-emission green technologies, respecting local farming land, and ensuring that community voices are actively included in planning industrial zones, ensuring that economic development elevates, rather than compromises, the living standards of average Iraqis."
      },
      {
        lang: "ar",
        title: "العقد الاجتماعي والبيئي: وضع رأس المال البشري أولاً في مسيرة التنمية",
        excerpt: "وجهة نظر ناشطة حول سبب وجوب إعطاء الأولوية لتقييمات الأثر البيئي وإرشادات السلامة الصارمة قبل البدء في عمليات البناء الصناعي الثقيل.",
        content: "لا يمكن أن تتم إعادة الإعمار الحقيقية على حساب بيئتنا وصحتنا العامة. ومع توسع المجمعات الصناعية الكبرى ومصانع البتروكيماويات ومصافي النفط في جنوب العراق من خلال الشراكات الأجنبية، يجب علينا صياغة عقد اجتماعي صارم. يجب أن يتضمن كل اتفاق ثنائي تدقيقاً شاملاً للأثر البيئي لحماية أحواض مياه دجلة والفرات التاريخية من التلوث بالمعادن الثقيلة. علاوة على ذلك، يجب أن يظل تركيزنا منصباً على التنمية المتمحورة حول الإنسان. ويعني هذا الاستثمار في التكنولوجيات الخضراء الصديقة للبيئة، واحترام الأراضي الزراعية المحلية، وضمان إشراك أصوات المجتمع المحلي بفعالية في التخطيط للمناطق الصناعية، لضمان أن التنمية الاقتصادية ترتقي بمستويات معيشة العراقيين العاديين، بدلاً من الإضرار بها."
      },
      {
        lang: "zh",
        title: "社会与环境契约：在国家重建与发展中将“人文资本”置于首位",
        excerpt: "活动家视角：为什么环境影响评估与严格的安全环保准则必须先于重工业项目的落地建设。",
        content: "真正的重建绝不应该以牺牲我们的生态环境和公众健康为代价。随着中外合作背景下重型产业园、石化厂和炼油厂等项目在伊拉克南部的落地与扩张，我们必须确立一项严格的社会契约。每一份双边投资协议都必须强制包含详尽的环境影响评估（EIA），以保护我们历史悠久的底格里斯河-幼发拉底河水系免受重金属及工业废水污染。此外，我们的重心必须保持在“以人为本”的发展轨道上。这意味着应积极采用零排放的绿色科技、尊重当地农民土地权益并确保地方社区的诉求在工业区规划阶段即获得倾听。只有这样，经济建设才能真正造福而非削弱伊拉克普通百姓的生活品质。"
      },
      {
        lang: "ckb",
        title: "پەیمانی کۆمەڵایەتی و ژینگەیی: جێگیرکردنی مرۆڤ و ژینگە لە پێشەنگی گەشەپێداندا",
        excerpt: "تێڕوانینی چالاکوانێک لەسەر ئەوەی بۆچی پێویستە توێژینەوە لەسەر کاریگەرییە ژینگەییەکان و ڕێنماییەکانی سەلامەتی بکرێت پێش دروستکردنی کارگەی پیشەسازی قورس.",
        content: "بنیادنانەوەی ڕاستەقینە نابێت لەسەر حیسابی ژینگە و تەندروستی گشتی بێت. کاتێک کارگە گەورەکانی پیشەسازی، پترۆکیمیایی و پاڵاوگەکان لە باشووری عێراقدا لە ڕێگەی هاوبەشی دەرەکییەوە فراوانتر دەبن، دەبێت پەیمانێکی کۆمەڵایەتی بەهێز دابمەزرێنین. هەر ڕێککەوتنێکی دوولایەنە دەبێت پێداچوونەوەی وردی ژینگەیی لەگەڵ بێت بۆ پاراستنی حەوزە مێژووییەکانی دەریاچەی دیجلە و فورات لە پیسبوونی مێتالی و کیمیایی. جگە لەوەش، دەبێت سەرنجمان لەسەر پەرەپێدانی مرۆیی بێت. ئەمەش بە وەبەرهێنان لە تەکنەلۆجیاکانی وزەی سەوز بەبێ کاربۆن، ڕێزگرتن لە زەوییە کشتوکاڵییەکان، و دڵنیابوون لە بیستنی دەنگی خەڵکی ناوچەکە لە کاتی پلاندانانی پیشەسازیدا دەبێت، بۆ ئەوەی پەرەپێدانی ئابووری ئاستی ژیانی عێراقییەکان بەرز بکاتەوە لەبری ئەوەی زیانی پێ بگەیەنێت."
      }
    ]
  },
  // 19. Sarkawt Shamsulddin
  {
    slug: "sarkawt-shamsulddin-decentralized-belt-road-northern-provinces",
    authorEmail: "sarkawt.shamsulddin@chinq.post",
    authorName: "Sarkawt Shamsulddin",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "The Decentralized Belt & Road: Integrating Kurdistan's Northern Provinces",
        excerpt: "A call to transition bilateral investment frameworks from federal-centric models to highly localized, decentralized regional setups.",
        content: "For the Belt and Road Initiative to achieve its maximum developmental potential in Iraq, it must transcend federal centralization. Agreements signed in Baghdad should not end at the federal administrative boundaries; they must actively integrate the Kurdistan Region’s northern provinces of Sulaymaniyah, Erbil, and Duhok. By devolving industrial allocation and custom corridors directly to regional authorities, we can implement targeted local projects—such as localized high-speed rail links and sorting terminals—that capitalize on the unique agricultural and logistical capacities of the north. Decentralizing the trade pipelines ensures that economic development is balanced, robust, and directly reaches average families across the entire geographical extent of our nation."
      },
      {
        lang: "ar",
        title: "مبادرة الحزام والطريق اللامركزية: دمج المحافظات الشمالية لإقليم كردستان",
        excerpt: "دعوة لتحويل أطر الاستثمار الثنائية من النماذج المركزية الاتحادية إلى هياكل إقليمية لامركزية ومحلية للغاية.",
        content: "لكي تحقق مبادرة الحزام والطريق أقصى قدر من إمكاناتها التنموية في العراق، يجب أن تتجاوز المركزية الاتحادية. فالاتفاقيات الموقعة في بغداد لا ينبغي أن تنتهي عند الحدود الإدارية للاتحاد؛ بل يجب أن تدمج بفعالية محافظات إقليم كردستان الشمالية: السليمانية وأربيل ودهوك. ومن خلال نقل صلاحيات التخصيص الصناعي والممرات الجمركية مباشرة إلى السلطات الإقليمية، يمكننا تنفيذ مشاريع محلية مستهدفة - مثل وصلات السكك الحديدية السريعة المحلية ومحطات الفرز - التي تستفيد من القدرات الزراعية واللوجستية الفريدة للشمال. إن إضفاء اللامركزية على قنوات التجارة يضمن أن تكون التنمية الاقتصادية متوازنة وقوية وتصل مباشرة إلى الأسر العادية في جميع أنحاء بلادنا."
      },
      {
        lang: "zh",
        title: "去中心化的“一带一路”合作：深度整合库尔德斯坦北部省份的倡议",
        excerpt: "呼吁双边投资合作框架从单纯的“联邦中心”模式，向更本地化、去中心化的“地方合作”体系转型。",
        content: "为了让“一带一路”倡议在伊拉克发挥其最大的发展潜力，它必须突破联邦高度集中的体制。在巴格达签署的双边合作项目绝不应当止步于联邦行政边界，而应当积极主动地吸纳和融入库尔德斯坦的北部省份，包括苏莱曼尼亚、埃尔比勒和杜胡克。通过将部分产业项目规划、免税区建设及绿色通道管理权限下放到地方政府，我们能够因地制宜地落地一批针对性的本地工程——如北部局地的高速铁路联络线和冷链物流中转港，充分发挥北部特有的高附加值农业及独特的地缘物流优势。推动贸易大动脉建设的去中心化，将确保伊拉克的经济发展更加均衡、稳健，且让发展红利真正惠及这片土地上的每一个普通家庭。"
      },
      {
        lang: "ckb",
        title: "ڕێگای نامەرکەزی ئاوریشم: تێکەڵکردنی پارێزگاکانی باکووری کوردستان لە پڕۆژەکاندا",
        excerpt: "داواکارییەک بۆ گۆڕینی چوارچێوەکانی وەبەرهێنانی دوولایەنە لە مۆدێلە مەرکەزییەکانەوە بۆ سیستەمی لۆکاڵی و نامەرکەزی لە هەرێمەکاندا.",
        content: "بۆ ئەوەی دەستپێشخەری کەمەر و ڕێگا بگاتە بەرزترین توانای گەشەپێدان لە عێراقدا، پێویستە مەرکەزییەت تێپەڕێنێت. ئەو ڕێککەوتنانەی لە بەغدا واژۆ دەکرێن نابێت لە سنوورەکانی فیدراڵیدا بوەستن، بەڵکو دەبێت بە شێوەیەکی چالاک پارێزگاکانی باکووری کوردستان لە سلێمانی، هەولێر و دهۆک تێکەڵ بکەن. بە پێدانی دەسەڵاتی پڕۆژە پیشەسازییەکان و دەروازە گومرگییەکان بە شێوەیەکی ڕاستەوخۆ بە دەسەڵاتە ناوخۆییەکان، دەتوانین پڕۆژەی ناوخۆیی تایبەت جێبەجێ بکەین - وەک هێڵەکانی شەمەندەفەری ناوخۆیی و وێستگەکانی بارکردن - کە سوود لە توانای ناوازەی کشتوکاڵ و لۆجستی باکوور وەردەگرن. نامەرکەزیکردنی بازرگانی، دڵنیایی دەدات کە گەشەپێدانی ئابووری هاوسەنگ و بەهێز دەبێت و ڕاستەوخۆ دەگاتە خێزانە ئاساییەکان لە سەرانسەری عێراقدا."
      }
    ]
  },
  // 20. Ambassador Cui Wei (second theme on cultural deep bridges)
  {
    slug: "cui-wei-cultural-bridges-cradle-civilizations",
    authorEmail: "cui.wei@chinq.post",
    authorName: "Amb. Cui Wei",
    imageUrl: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=1200&auto=format&fit=crop",
    translations: [
      {
        lang: "en",
        title: "Cradles of Civilization: Reconnecting Mesopotamia and the Yellow River",
        excerpt: "China’s Envoy reflects on the deep historical roots connecting the two ancient civilizations, fostering modern diplomatic trust through mutual heritage appreciation.",
        content: "The bond between China and Iraq is not merely several decades old; it spans millennia. As the direct heirs of the cradles of human civilization—Mesopotamia and the Yellow River basin—our societies share a deep-seated respect for historical heritage, family, and educational excellence. When we build cultural bridges today, through Mandarin language institutes in Sulaymaniyah, joint archaeological digs in Babylon, and academic scholarships in Beijing, we are simply reconnecting ancient pathways of human curiosity. This profound cultural resonance is the ultimate guarantor of our strategic partnership, creating a resilient, human-to-human bond that will weather any modern geopolitical storm."
      },
      {
        lang: "ar",
        title: "مهد الحضارات: إعادة ربط بلاد ما بين النهرين بنهر النهر الأصفر",
        excerpt: "مبعوث الصين يستحضر الجذور التاريخية العميقة التي تربط بين الحضارتين القديمتين، لتعزيز الثقة الدبلوماسية الحديثة من خلال تقدير التراث المشترك.",
        content: "إن الروابط التي تجمع الصين بالعراق ليست وليدة العقود القليلة الماضية فحسب، بل تمتد لآلاف السنين. وبصفتنا الورثة المباشرين لأقدم مهاد الحضارة الإنسانية - بلاد ما بين النهرين وحوض النهر الأصفر - تشترك مجتمعاتنا في احترام عميق ومتأصل للتراث التاريخي والأسرة والتميز التعليمي. وعندما نشيد الجسور الثقافية اليوم، من خلال معاهد اللغة الماندرين في السليمانية، ومشاريع التنقيب عن الآثار المشتركة في بابل، والمنح الأكاديمية في بكين، فإننا نعيد ببساطة ربط مسارات قديمة من التواصل والفضول البشري. هذا الرنين الثقافي العميق هو الضامن الأسمى لشراكتنا الاستراتيجية، حيث يخلق رابطاً إنسانياً مرناً يصمد أمام أي عواصف جيوسياسية حديثة."
      },
      {
        lang: "zh",
        title: "文明的摇篮：连接两河流域与黄河文明的世纪人文纽带",
        excerpt: "中国大使回溯联结两大古老文明的深厚历史根基，强调通过相互理解与遗产保护建立坚实、持久的双边互信。",
        content: "中国与伊拉克之间的纽带绝非仅仅有几十年的历史，而是跨越了数千年之久。作为人类最古老文明摇篮——美索不达米亚两河流域文明与中华黄河文明的直接继承者，我们两国社会在尊重历史文化遗产、珍视家庭纽带以及崇尚教育卓越方面有着极其深沉的共鸣。当我们在今天架设文化沟通的桥梁，通过在苏莱曼尼亚设立普通话中心、在巴比伦遗址开展联合考古发掘以及在北京的高校中提供学术奖学金时，我们实际上是在重新唤醒古代人类相互探寻与交融的历史轨迹。这种深刻的文明共鸣，才是中伊战略伙伴关系最根本、最长久的保障，塑造了一种牢固的人文情感纽带，它将无惧于任何现代国际风云的变幻。"
      },
      {
        lang: "ckb",
        title: "لانکەی شارستانیەتەکان: بەستنەوەی سەرلەنوێی میزۆپۆتامیا و ڕووباری زەرد",
        excerpt: "نوێنەری چین تیشک دەخاتە سەر مێژووی قووڵی هاوبەشی نێوان هەردوو شارستانیەتە دێرینەکە، کە متمانەی دیپلۆماسی هاوچەرخ بەهێز دەکات لە ڕێگەی ڕێزگرتن لە مێژوو.",
        content: "پەیوەندی نێوان چین و عێراق تەنها چەند دەیەیەک نییە، بەڵکو مێژوویەکی هەزاران ساڵەی هەیە. وەک میراتگرانی ڕاستەقینەی لانکەی شارستانییەتی مرۆڤایەتی - میزۆپۆتامیا و حەوزی ڕووباری زەرد - کۆمەڵگاکانمان خاوەنی ڕێزگرتنێکی قووڵن بۆ کەلەپوور، خێزان، و لێهاتوویی زانستی. کاتێک ئەمڕۆ پردی کولتووری دروست دەکەین، لە ڕێگەی پەیمانگاکانی زمانی ماندارین لە سلێمانی، گەڕانە هاوبەشەکانی شوێنەوارناسی لە بابل، و سکۆلەرشیپی زانستی لە پەکین، ئێمە تەنها ڕێگا کۆنەکانی گەڕانی مرۆیی پێشوو نوێ دەکەینەوە. ئەم هاوئاهەنگییە کولتوورییە قووڵە گەرەنتی کۆتایی هاوبەشییە ستراتیژییەکەمانە، کە پەیوەندییەکی مرۆیی قووڵ و بەهێز دروست دەکات دژی هەر کێشەیەکی جیۆپۆلیتی هاوچەرخ."
      }
    ]
  }
];

export async function seedOpinions() {
  console.log("🌱 [Opinion Seeder] Seeding 20 high-quality opinions...");

  // 1. Get or create category 'opinion'
  let catOpinion = await prisma.category.findUnique({
    where: { slug: 'opinion' }
  });

  if (!catOpinion) {
    catOpinion = await prisma.category.create({
      data: {
        slug: 'opinion',
        name: 'Opinion',
        nameEn: 'Opinion',
        nameAr: 'آراء',
        nameZh: '观点'
      }
    });
  }

  // 2. Iterate through opinions, upserting authors first and then upserting articles
  for (const op of OPINIONS_DATA) {
    // Upsert Author
    let author = await prisma.user.findUnique({
      where: { email: op.authorEmail }
    });

    if (!author) {
      author = await prisma.user.create({
        data: {
          email: op.authorEmail,
          name: op.authorName,
          role: "AUTHOR",
          password: "" // No password needed for seeded authors
        }
      });
    }

    // Check if article with this slug exists
    const existingArticle = await prisma.article.findUnique({
      where: { slug: op.slug }
    });

    if (existingArticle) {
      console.log(`[Opinion Seeder] Article "${op.slug}" already exists. Skipping.`);
      continue;
    }

    // Create Article
    await prisma.article.create({
      data: {
        slug: op.slug,
        status: "PUBLISHED",
        imageUrl: op.imageUrl,
        categoryId: catOpinion.id,
        authorId: author.id,
        translations: {
          create: op.translations
        }
      }
    });

    console.log(`[Opinion Seeder] Created opinion article: "${op.slug}"`);
  }

  console.log("✅ [Opinion Seeder] 20 opinions seeded successfully!");
}
