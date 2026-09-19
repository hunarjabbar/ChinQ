const fs = require('fs');

const figures = [
  { name: 'Mustafa Barzani', nameAr: 'مصطفى بارزاني', nameZh: '穆斯塔法·巴尔扎尼', nameCkb: 'مستەفا بارزانی', regionEn: 'Kurdish', regionAr: 'الكردي', regionZh: '库尔德', regionCkb: 'کورد', titleEn: 'Legendary Kurdish Nationalist Leader', titleAr: 'الزعيم القومي الكردي الأسطوري', titleZh: '传奇的库尔德民族主义领袖', titleCkb: 'سەرکردەی نەتەوەیی ئەفسانەیی کورد', keywords: ['Mahabad', 'KDP', 'Peshmerga', 'September Rebellion', 'Kurdistan', 'Exile', 'USSR', 'Autonomy', 'Legacy', 'Leadership'] },
  { name: 'Ibrahim Ahmad', nameAr: 'إبراهيم أحمد', nameZh: '易卜拉欣·艾哈迈德', nameCkb: 'ئیبراهیم ئەحمەد', regionEn: 'Kurdish', regionAr: 'الكردي', regionZh: '库尔德', regionCkb: 'کورد', titleEn: 'Pioneering Kurdish Novelist and Political Leader', titleAr: 'الروائي الكردي الرائد والزعيم السياسي', titleZh: '库尔德先锋小说家和政治领袖', titleCkb: 'ڕۆماننووس و سەرکردەی سیاسی پێشەنگی کورد', keywords: ['Writer', 'Novelist', 'KDP', 'PUK', 'Jani Gal', 'Intellectual', 'Kurdish Literature', 'Political Thought', 'Reform', 'Legacy'] },
  { name: 'Jalal Talabani', nameAr: 'جلال طالباني', nameZh: '贾拉勒·塔拉巴尼', nameCkb: 'جەلال تاڵەبانی', regionEn: 'Kurdish/Iraqi', regionAr: 'الكردي/العراقي', regionZh: '库尔德/伊拉克', regionCkb: 'کورد/عێراقی', titleEn: 'First Kurdish President of Iraq', titleAr: 'أول رئيس كردي للعراق', titleZh: '伊拉克首位库尔德总统', titleCkb: 'یەکەم سەرۆک کۆماری کوردی عێراق', keywords: ['PUK', 'President', 'Iraq', 'Baghdad', 'Diplomacy', 'Kurdistan', 'Post-2003', 'Statesman', 'Peacemaker', 'Legacy'] },
  { name: 'Mao Zedong', nameAr: 'ماو تسي تونغ', nameZh: '毛泽东', nameCkb: 'ماو تسی تۆنگ', regionEn: 'Chinese', regionAr: 'الصيني', regionZh: '中国', regionCkb: 'چینی', titleEn: 'Founding Father of the People\'s Republic of China', titleAr: 'الأب المؤسس لجمهورية الصين الشعبية', titleZh: '中华人民共和国缔造者', titleCkb: 'باوکی دامەزرێنەری کۆماری گەلی چین', keywords: ['PRC', 'Revolution', 'Long March', 'Chairman', 'Communist Party', 'Modernization', 'Peasantry', 'Philosophy', 'Legacy', 'China'] },
  { name: 'Zhou Enlai', nameAr: 'تشو إنلاي', nameZh: '周恩来', nameCkb: 'چۆ ئێنلای', regionEn: 'Chinese', regionAr: 'الصيني', regionZh: '中国', regionCkb: 'چینی', titleEn: 'First Premier of the People\'s Republic of China', titleAr: 'أول رئيس وزراء لجمهورية الصين الشعبية', titleZh: '中华人民共和国首任总理', titleCkb: 'یەکەم سەرۆک وەزیرانی کۆماری گەلی چین', keywords: ['Premier', 'Diplomacy', 'Geneva Conference', 'Foreign Policy', 'Pragmatism', 'Stability', 'Cultural Revolution', 'Moderator', 'Legacy', 'China'] },
  { name: 'Deng Xiaoping', nameAr: 'دينغ شياو بينغ', nameZh: '邓小平', nameCkb: 'دینگ شیاوپینگ', regionEn: 'Chinese', regionAr: 'الصيني', regionZh: '中国', regionCkb: 'چینی', titleEn: 'Architect of Modern China', titleAr: 'مهندس الصين الحديثة', titleZh: '现代中国总设计师', titleCkb: 'ئەندازیاری چینی مۆدێرن', keywords: ['Reform', 'Opening Up', 'Economy', 'Modernization', 'Pragmatism', 'Shenzhen', 'Market Economy', 'Growth', 'Legacy', 'China'] },
  { name: 'Sun Yat-sen', nameAr: 'صن يات صن', nameZh: '孙中山', nameCkb: 'سون یات سێن', regionEn: 'Chinese', regionAr: 'الصيني', regionZh: '中国', regionCkb: 'چینی', titleEn: 'Forerunner of the Democratic Revolution in China', titleAr: 'رائد الثورة الديمقراطية في الصين', titleZh: '中国民主革命的伟大先驱', titleCkb: 'پێشەنگی شۆڕشی دیموکراسی لە چین', keywords: ['Xinhai Revolution', 'Republic of China', 'Three Principles', 'Nationalism', 'Democracy', 'Livelihood', 'Physician', 'Legacy', 'Modern China', 'Pioneer'] },
  { name: 'Abd al-Karim Qasim', nameAr: 'عبد الكريم قاسم', nameZh: '阿卜杜勒·卡里姆·卡塞姆', nameCkb: 'عەبدولکەریم قاسم', regionEn: 'Iraqi', regionAr: 'العراقي', regionZh: '伊拉克', regionCkb: 'عێراقی', titleEn: 'Leader of the 14 July Revolution', titleAr: 'زعيم ثورة 14 تموز', titleZh: '7月14日革命领导人', titleCkb: 'سەرکردەی شۆڕشی ١٤ی تەمموز', keywords: ['1958 Revolution', 'Republic', 'Iraq', 'Brigadier', 'Reform', 'Housing', 'Oil', 'Independence', 'Legacy', 'Baghdad'] },
  { name: 'Nuri al-Said', nameAr: 'نوري السعيد', nameZh: '努里·赛义德', nameCkb: 'نوری سەعید', regionEn: 'Iraqi', regionAr: 'العراقي', regionZh: '伊拉克', regionCkb: 'عێراقی', titleEn: 'Prominent Iraqi Politician of the Hashemite Era', titleAr: 'سياسي عراقي بارز في العهد الهاشمي', titleZh: '哈希姆时期杰出伊拉克政治家', titleCkb: 'سیاسەتمەداری دیاری عێراق لە سەردەمی هاشمیدا', keywords: ['Prime Minister', 'Hashemite', 'Monarchy', 'Baghdad Pact', 'Pro-Western', 'Development Board', 'State Building', 'Legacy', 'Iraq', 'Diplomacy'] },
  { name: 'Nawshirwan Mustafa', nameAr: 'نوشيروان مصطفى', nameZh: '纳夫希尔万·穆斯塔法', nameCkb: 'نەوشیروان مستەفا', regionEn: 'Kurdish', regionAr: 'الكردي', regionZh: '库尔德', regionCkb: 'کورد', titleEn: 'Kurdish Intellectual and Reformist Leader', titleAr: 'المفكر والزعيم الإصلاحي الكردي', titleZh: '库尔德知识分子和改革派领袖', titleCkb: 'ڕووناکبیر و سەرکردەی چاکسازیخواز', keywords: ['Gorran', 'Change Movement', 'Intellectual', 'Writer', 'Historian', 'PUK', 'Reform', 'Anti-corruption', 'Legacy', 'Kurdistan'] },
  { name: 'Sheikh Mahmud Barzanji', nameAr: 'الشيخ محمود الحفيد', nameZh: '马哈茂德·巴尔赞吉谢赫', nameCkb: 'شێخ مەحمودی حەفید', regionEn: 'Kurdish', regionAr: 'الكردي', regionZh: '库尔德', regionCkb: 'کورد', titleEn: 'King of Kurdistan and Anti-Colonial Leader', titleAr: 'ملك كردستان والزعيم المناهض للاستعمار', titleZh: '库尔德斯坦国王和反殖民领袖', titleCkb: 'مەلیکی کوردستان و سەرکردەی دژە داگیرکاری', keywords: ['Sulaymaniyah', 'British Mandate', 'Kingdom of Kurdistan', 'Rebellion', 'Anti-colonialism', 'Exile', 'India', 'Qadiriyya', 'Legacy', 'Sovereignty'] }
];

function translateEn(f) {
  const kw = f.keywords;
  return `The historical significance of ${f.name} as a ${f.titleEn} cannot be overstated. Born into a period of profound regional transformation, ${f.name} emerged as a defining figure for the ${f.regionEn} people. Their early life was characterized by a deep engagement with the socio-political realities of their time, which profoundly shaped their ideological framework and future leadership style. During their formative years, they witnessed significant political upheaval, which instilled in them a sense of duty and a vision for a transformed society. This vision was not merely theoretical; it was rooted in the lived experiences of their people and a pragmatic understanding of the geopolitical forces at play. As they rose to prominence, ${f.name} navigated complex alliances and formidable opposition, demonstrating a unique blend of strategic foresight and unyielding determination. Their ability to articulate a compelling narrative for the future galvanized widespread support and laid the groundwork for their enduring influence. The legacy of their early activism and intellectual contributions continues to be a subject of extensive historical analysis, highlighting their role in setting the trajectory for future political and social movements within their region and beyond. 
  
  Throughout their career, ${f.name} became synonymous with key historical concepts such as ${kw.slice(0, 3).join(', ')}. They played a pivotal role in organizing and leading major political and social initiatives that challenged the status quo. Their leadership was marked by a commitment to the principles of self-determination, social justice, and national modernization. By mobilizing diverse segments of society, they were able to build a robust coalition that could withstand intense internal and external pressures. Their strategic decisions during critical historical junctures—often involving high-stakes negotiations and bold political maneuvers—fundamentally altered the balance of power and redefined the political landscape. Furthermore, their ideological contributions provided a theoretical foundation for their followers, blending traditional values with modern political concepts to create a unique and resonant political philosophy. The impact of these initiatives was felt not only in the immediate structural changes they brought about but also in the long-term cultural and political awakening of their people. 
  
  One of the most defining aspects of ${f.name}'s legacy is their connection to ${kw.slice(3, 6).join(', ')}. This era of their leadership was fraught with significant challenges, including armed conflict, political exile, and intense ideological debates. Despite these obstacles, they maintained a steadfast commitment to their core objectives, often adapting their strategies to navigate the shifting geopolitical currents. Their resilience in the face of adversity became a hallmark of their leadership, inspiring a generation of followers to remain committed to their cause. During this period, ${f.name} also engaged in crucial diplomatic efforts, seeking international support and recognition for their movement. These efforts were instrumental in bringing their cause to the global stage and securing vital alliances. The complexities of their leadership during this time reflect the nuanced and often difficult decisions required to effect meaningful change in a volatile political environment. Their actions and decisions during these critical years remain a focal point for historians studying the dynamics of leadership and resistance in the modern era. 
  
  The later years of ${f.name}'s life were focused on ${kw.slice(6, 9).join(', ')}. Having achieved significant milestones, they turned their attention to the long-term sustainability of their political achievements and the institutionalization of their vision. This involved complex processes of state-building, economic reform, and the establishment of a durable political order. They recognized that true success required more than just immediate victories; it necessitated the creation of robust frameworks that could support continued progress and stability. Their efforts in this regard were marked by a pragmatic approach to governance, balancing ideological purity with the practical necessities of administration and economic development. Additionally, ${f.name} dedicated considerable time to mentoring the next generation of leaders, ensuring that their vision would endure beyond their own lifetime. The institutional and ideological legacy they established during these later years provided a foundation for future political discourse and continued to shape the trajectory of their nation long after their passing. 
  
  In conclusion, the enduring legacy of ${f.name} in relation to ${kw[9]} is a testament to their profound impact on the course of history. Their life and work represent a critical chapter in the broader narrative of the ${f.regionEn} experience, offering invaluable insights into the complexities of nation-building, political resistance, and visionary leadership. Today, ${f.name} is remembered not only for their specific political achievements but also for their enduring symbolic resonance. They remain a polarizing yet undeniably towering figure, whose ideas and actions continue to be debated, celebrated, and analyzed by scholars, politicians, and the public alike. The historical memory of ${f.name} serves as a powerful reminder of the enduring human capacity to shape the destiny of nations and the profound, lasting impact of individual agency on the grand sweep of history. As we reflect on their contributions, it is clear that their influence extends far beyond their own time, continuing to inspire and inform contemporary discussions on leadership, identity, and the pursuit of a better future.`;
}

function translateAr(f) {
  const kw = f.keywords; // keeping keywords in EN or generic mapping is fine for the mock
  return `ولد ${f.nameAr} في حقبة زمنية اتسمت بتحولات إقليمية ودولية عميقة، حيث برز كشخصية محورية ومؤسسة في تاريخ الشعب ${f.regionAr}. لقد تميزت نشأته ومرحلة شبابه المبكر بالانخراط العميق في تفاصيل الواقع الاجتماعي والسياسي المعقد الذي أحاط بوطنه، وهو ما ساهم بشكل جذري في صقل إطاره الفكري وتوجهاته الأيديولوجية التي حددت مسار قيادته في المستقبل. وخلال تلك السنوات التكوينية الحاسمة، كان شاهداً على اضطرابات سياسية كبرى وتقلبات في موازين القوى، مما زرع في وجدانه إحساساً استثنائياً بالمسؤولية والواجب تجاه أمته، وبلور لديه رؤية طموحة لمجتمع متجدد ومتحرر. ولم تكن هذه الرؤية مجرد تنظير مجرد، بل كانت متجذرة بعمق في المعاناة والتجارب الحياتية اليومية لشعبه، ومبنية على فهم واقعي وبراغماتي للقوى الجيوسياسية المتصارعة. ومع بدء صعود نجمه في سماء السياسة والقيادة، أثبت ${f.nameAr} قدرة فائقة على المناورة والتعامل مع شبكات معقدة من التحالفات، ومواجهة خصوم أقوياء، مبدياً مزيجاً فريداً من البصيرة الاستراتيجية الثاقبة والعزيمة الفولاذية التي لا تلين. إن براعته في صياغة خطاب سياسي ملهم يحمل وعداً بمستقبل أفضل، مكنته من حشد تأييد شعبي واسع النطاق، ووضع الأسس المتينة لتأثيره التاريخي المستدام. واليوم، لا يزال إرث نضاله المبكر ومساهماته الفكرية والعملية يمثل مادة خصبة للدراسات والتحليلات التاريخية المعمقة، التي تؤكد على دوره الرائد في رسم مسارات الحركات السياسية والاجتماعية التي تلت عصره، سواء داخل الإقليم أو في العالم بأسره.
  
طوال مسيرته الحافلة، ارتبط اسم ${f.nameAr} ارتباطاً وثيقاً بمفاهيم وأحداث تاريخية مفصلية مثل ${kw.slice(0, 3).join('، ')}. لقد لعب دوراً طليعياً وحاسماً في تأسيس وقيادة مبادرات سياسية واجتماعية كبرى تجرأت على تحدي الوضع القائم ومواجهة قوى الهيمنة. وقد تميزت قيادته بالالتزام الراسخ والمبدئي بقيم تقرير المصير، والعدالة الاجتماعية، والتحديث الوطني الشامل. ومن خلال قدرته الاستثنائية على تعبئة شرائح متنوعة من المجتمع، نجح في بناء تحالفات وطنية صلبة قادرة على الصمود في وجه أعتى الضغوط والتحديات، سواء كانت داخلية أو خارجية. إن القرارات الاستراتيجية المصيرية التي اتخذها في المنعطفات التاريخية الحرجة – والتي تضمنت غالباً مفاوضات شاقة وعالية المخاطر وتحركات سياسية جريئة – أدت إلى إحداث تغييرات جوهرية في موازين القوى وإعادة رسم الخريطة السياسية للمنطقة. وعلاوة على ذلك، فإن إسهاماته الفكرية والتنظيرية شكلت قاعدة أيديولوجية متينة لأنصاره وحلفائه، حيث نجح في دمج القيم والتقاليد الأصيلة مع المفاهيم السياسية الحديثة لإنتاج فلسفة سياسية فريدة وذات صدى واسع. ولم تقتصر آثار هذه المبادرات والتحركات على التغييرات الهيكلية المباشرة التي أحدثتها في بنية الدولة والمجتمع، بل امتدت لتشمل نهضة ثقافية وسياسية طويلة الأمد، أيقظت وعي الأمة ووجهت مسارها نحو التحرر والبناء.

من أبرز المحطات التي شكلت إرث ${f.nameAr} التاريخي هو ارتباطه الوثيق بمراحل ${kw.slice(3, 6).join('، ')}. لقد كانت هذه الحقبة من قيادته محفوفة بتحديات جمة واختبارات قاسية، شملت الصراعات المسلحة، وفترات النفي السياسي والتشرد، ونقاشات أيديولوجية داخلية محتدمة. وعلى الرغم من قسوة هذه العقبات، ظل محافظاً على التزام لا يتزعزع بأهدافه الاستراتيجية الكبرى، وغالباً ما كان يكيّف تكتيكاته وأساليبه بمرونة عالية للتعامل مع المتغيرات الجيوسياسية العاصفة والرياح السياسية المتقلبة. إن صلابته وقدرته على الصمود في وجه المحن والشدائد أصبحت سمة مميزة لقيادته، ومصدر إلهام دائم لجيل كامل من الأتباع والمؤيدين الذين ظلوا مخلصين لقضيته. وخلال هذه الفترة العصيبة، انخرط ${f.nameAr} أيضاً في جهود دبلوماسية مكثفة وحاسمة، سعياً لتدويل قضيته وكسب الدعم والاعتراف الدوليين بحركته. وقد كانت هذه التحركات الدبلوماسية محورية في نقل صراع شعبه إلى المسرح العالمي، وتأمين تحالفات استراتيجية حيوية خففت من وطأة العزلة. إن تعقيدات مشهد القيادة خلال هذه السنوات تعكس حجم ودقة القرارات الصعبة التي كان يجب اتخاذها لإحداث تغيير حقيقي في بيئة سياسية شديدة التقلب والعداء. ولا تزال أفعاله وقراراته في تلك السنوات المفصلية تشكل نقطة تركيز رئيسية للمؤرخين والباحثين الذين يدرسون ديناميكيات القيادة، والمقاومة، وصناعة القرار في العصر الحديث.

في السنوات اللاحقة من حياته، تركزت جهود ${f.nameAr} ومساعيه على قضايا ${kw.slice(6, 9).join('، ')}. فبعد أن حقق إنجازات مرحلية كبرى واجتاز مراحل التحرر والمقاومة، وجه أنظاره نحو ضمان الاستدامة طويلة الأمد لمكتسباته السياسية، ومأسسة رؤيته لتتحول إلى واقع ملموس في بنية الدولة. وقد تطلب ذلك الانخراط في عمليات معقدة وشائكة لبناء مؤسسات الدولة، وإجراء إصلاحات اقتصادية جذرية، وإرساء نظام سياسي مستقر وقابل للبقاء. لقد أدرك بوعي القائد التاريخي أن النجاح الحقيقي لا يقتصر على الانتصارات العسكرية أو السياسية الآنية، بل يتطلب بناء هياكل مؤسسية وقانونية متينة قادرة على رعاية التقدم المستمر وحفظ الاستقرار. وقد اتسمت جهوده في هذا المضمار بنهج براغماتي وعقلاني في الحكم والإدارة، محاولاً الموازنة بدقة بين النقاء الأيديولوجي لثورته وبين الضرورات العملية لإدارة شؤون الدولة وتحقيق التنمية الاقتصادية الشاملة. وبالإضافة إلى ذلك، كرس ${f.nameAr} وقتاً وجهداً كبيرين لإعداد وتوجيه الجيل القادم من القادة والمسؤولين، لضمان استمرار رؤيته ونهجه بعد رحيله. إن الإرث المؤسسي والفكري الذي أرسى دعائمه خلال هذه السنوات الأخيرة شكل أساساً صلباً للخطاب السياسي المستقبلي، واستمر في توجيه مسار تطور أمته وتحديد خياراتها الاستراتيجية لفترة طويلة بعد وفاته.

في الختام، إن الإرث الخالد الذي تركه ${f.nameAr}، ولا سيما فيما يتعلق بـ ${kw[9]}، يمثل دليلاً قاطعاً وشاهداً حياً على تأثيره العميق الذي لا يُمحى في مجرى التاريخ. إن قصة حياته وكفاحه تمثل فصلاً حاسماً وملحمياً في السردية الكبرى لتجربة الشعب ${f.regionAr}، وتقدم دروساً ورؤى لا تقدر بثمن حول تعقيدات بناء الأوطان، وحركات المقاومة السياسية، والقيادة التاريخية ذات الرؤية المستقبلية. واليوم، لا يُذكر ${f.nameAr} فقط لإنجازاته السياسية أو العسكرية المحددة، بل بوصفه رمزاً تاريخياً يتمتع بصدى ثقافي ووطني دائم. ورغم أنه قد يظل شخصية تثير الجدل والنقاشات المستمرة، إلا أنه يبقى قامة تاريخية شامخة لا يمكن إنكارها، تستمر أفكاره وأفعاله في إثارة الاهتمام والتحليل والإشادة من قبل الأكاديميين والساسة وعامة الناس على حد سواء. إن الذاكرة التاريخية لـ ${f.nameAr} تظل بمثابة تذكير قوي ودائم بقدرة الإنسان على تحدي الصعاب وصياغة مصير الأمم، وبالتأثير العميق والمستدام الذي يمكن أن يحدثه الفرد في تشكيل مسار التاريخ البشري العريض. وعندما نتأمل في حجم مساهماته وتضحياته، يتضح جلياً أن نفوذه وتأثيره يتجاوزان بكثير حدود زمانه ومكانه، ليواصلا إلهام وإثراء النقاشات المعاصرة حول قضايا القيادة، والهوية، والكفاح المستمر من أجل مستقبل أفضل وأكثر عدلاً.`;
}

function translateZh(f) {
  const kw = f.keywords;
  return `${f.nameZh} 出生在一个地区发生深刻变革的时代，并逐渐成为${f.regionZh}人民的决定性人物。他们早年的生活特点是对当时社会政治现实的深刻参与，这极大地塑造了他们的意识形态框架和未来的领导风格。在他们的成长期，他们目睹了重大的政治动荡，这向他们灌输了责任感和对改造社会的愿景。这种愿景不仅仅是理论上的；它植根于他们人民的生活经验和对起作用的地缘政治力量的务实理解。随着他们声名鹊起，${f.nameZh} 在复杂的联盟和强大的反对派中穿梭，展示了战略远见和不屈不挠决心的独特结合。他们为未来阐明令人信服的叙事的能力激发了广泛的支持，并为他们持久的影响力奠定了基础。他们早期激进主义和思想贡献的遗产继续成为广泛历史分析的主题，突出了他们在设定其地区内外未来政治和社会运动轨迹中的作用。

在他们的整个职业生涯中，${f.nameZh} 成为关键历史概念的代名词，例如 ${kw.slice(0, 3).join(', ')}。他们在组织和领导挑战现状的重大政治和社会倡议方面发挥了关键作用。他们的领导特点是致力于自决、社会正义和国家现代化的原则。通过动员社会的各个阶层，他们能够建立一个能够承受巨大内外压力的强大联盟。他们在关键历史关头的战略决策——通常涉及高风险的谈判和大胆的政治策略——从根本上改变了力量平衡并重新定义了政治格局。此外，他们的思想贡献为他们的追随者提供了理论基础，将传统价值观与现代政治概念相融合，创造了一种独特且引起共鸣的政治哲学。这些倡议的影响不仅体现在它们带来的直接结构变化上，还体现在他们人民长期的文化和政治觉醒上。

${f.nameZh} 遗产中最具决定性的方面之一是他们与 ${kw.slice(3, 6).join(', ')} 的联系。他们领导的这个时代充满了重大挑战，包括武装冲突、政治流亡和激烈的意识形态辩论。尽管存在这些障碍，他们仍然坚定地致力于其核心目标，经常调整其战略以应对不断变化的地缘政治潮流。他们在逆境中的韧性成为他们领导的标志，激励了一代追随者继续致力于他们的事业。在此期间，${f.nameZh} 还参与了关键的外交努力，为他们的运动寻求国际支持和认可。这些努力有助于将他们的事业推向全球舞台并确保重要的联盟。这一时期他们领导的复杂性反映了在动荡的政治环境中实现有意义的变革所需的细微且通常是困难的决定。他们在这些关键年份的行动和决定仍然是历史学家研究现代领导和抵抗动力的焦点。

${f.nameZh} 晚年的生活集中在 ${kw.slice(6, 9).join(', ')} 上。在取得重大里程碑之后，他们将注意力转向其政治成就的长期可持续性和其愿景的制度化。这涉及国家建设、经济改革和建立持久政治秩序的复杂过程。他们认识到，真正的成功需要的不仅仅是眼前的胜利；它需要建立能够支持持续进步和稳定的强大框架。他们在这方面的努力标志着一种务实的治理方法，在意识形态的纯洁性与行政和经济发展的实际必要性之间取得平衡。此外，${f.nameZh} 花费大量时间指导下一代领导人，确保他们的愿景在他们有生之年之后继续存在。他们在这些晚年建立的制度和思想遗产为未来的政治话语奠定了基础，并在他们去世后很长一段时间内继续塑造其国家的发展轨迹。

总之，${f.nameZh} 在 ${kw[9]} 方面的持久遗产证明了他们对历史进程的深远影响。他们的生活和工作代表了${f.regionZh}经验更广泛叙事中的关键一章，为了解国家建设、政治抵抗和富有远见的领导的复杂性提供了宝贵的见解。今天，人们记住${f.nameZh}，不仅是因为他们具体的政治成就，还因为他们持久的象征意义。他们仍然是一个两极分化但不可否认的杰出人物，他们的思想和行动继续受到学者、政治家和公众的辩论、庆祝和分析。${f.nameZh} 的历史记忆有力地提醒人们，人类塑造国家命运的持久能力，以及个人能动性对历史宏大进程的深刻、持久的影响。当我们反思他们的贡献时，很明显，他们的影响远远超出了他们自己的时代，继续启发和告知当代关于领导力、身份和追求更美好未来的讨论。`;
}

function translateCkb(f) {
  const kw = f.keywords;
  return `${f.nameCkb} لە سەردەمێکی گۆڕانکارییە قووڵە ناوچەییەکاندا لەدایکبوو، و وەک کەسایەتییەکی دیار و یەکلاکەرەوە بۆ گەلی ${f.regionCkb} دەرکەوت. ژیانی سەرەتایی بە تێکەڵبوونێکی قووڵ لەگەڵ ڕاستییە کۆمەڵایەتی و سیاسییەکانی سەردەمەکەی خۆیدا دیاریکرابوو، کە ئەمەش بە شێوەیەکی بنەڕەتی چوارچێوەی ئایدیۆلۆژی و شێوازی سەرکردایەتی داهاتووی داڕشت. لە ساڵانی سەرەتای پێگەیشتنیدا، شایەتحاڵی گۆڕانکارییە سیاسییە گەورەکان بوو، کە هەستی بەرپرسیارێتی و تێڕوانینێکی بۆ کۆمەڵگایەکی گۆڕاو تێدا دروستکرد. ئەم تێڕوانینە تەنها تیۆری نەبوو؛ بەڵکو ڕەگ و ڕیشەی لە ئەزموونە ژیارییەکانی گەلەکەی و تێگەیشتنێکی پراگماتیکی بۆ هێزە جیۆپۆلەتیکییەکاندا هەبوو. لەگەڵ گەیشتنی بە لوتکەی دەسەڵات، ${f.nameCkb} بە ناو هاوپەیمانییە ئاڵۆزەکان و دژایەتییە سەختەکاندا تێپەڕی، و تێکەڵەیەکی بێوێنەی لە دووربینی ستراتیژی و ئیرادەی نەگۆڕ نیشاندا. توانای ئەو بۆ داڕشتنی گێڕانەوەیەکی قەناعەتپێکەر بۆ داهاتوو، پشتیوانییەکی بەرفراوانی کۆکردەوە و زەمینەی بۆ کاریگەرییە هەمیشەییەکەی خۆشکرد. میراتی چالاکییە سەرەتاییەکانی و بەشدارییە هزرییەکانی تا ئێستاش بابەتێکی شیکاری مێژوویی بەرفراوانە، کە ڕۆڵی ئەو لە دیاریکردنی ئاراستەی بزووتنەوە سیاسی و کۆمەڵایەتییەکانی داهاتوو لە ناوچەکەیدا و دەرەوەی دەردەخات.

بە درێژایی ژیانی پیشەیی خۆی، ${f.nameCkb} بوو بە هاوواتای چەمکە مێژووییە سەرەکییەکانی وەکو ${kw.slice(0, 3).join(', ')}. ئەو ڕۆڵێکی میحوەریی گێڕا لە ڕێکخستن و سەرکردایەتیکردنی دەستپێشخەرییە گەورە سیاسی و کۆمەڵایەتییەکان کە بەرەنگاری دۆخی باو بوونەوە. سەرکردایەتییەکەی بە پابەندبوون بە بنەماکانی مافی چارەی خۆنووسین، دادپەروەری کۆمەڵایەتی و مۆدێرنیزاسیۆنی نەتەوەیی جیادەکرایەوە. بە کۆکردنەوەی چین و توێژە جیاوازەکانی کۆمەڵگا، توانی هاوپەیمانییەکی بەهێز بنیات بنێت کە بەرگەی فشارە توندەکانی ناوخۆ و دەرەوە بگرێت. بڕیارە ستراتیژییەکانی لە قۆناغە هەستیارە مێژووییەکاندا - کە زۆرجار دانوستانی قورس و هەنگاوی سیاسی بوێرانەی لەخۆدەگرت - بە شێوەیەکی بنەڕەتی هاوسەنگی هێزی گۆڕی و نەخشەی سیاسی دابڕشتەوە. جگە لەوەش، بەشدارییە ئایدیۆلۆژییەکانی بناغەیەکی تیۆری بۆ شوێنکەوتووانی دابینکرد، بە تێکەڵکردنی بەها نەریتییەکان لەگەڵ چەمکە سیاسییە مۆدێرنەکان بۆ دروستکردنی فەلسەفەیەکی سیاسی ناوازە و دەنگدەرەوە. کاریگەری ئەم دەستپێشخەریانە نەک تەنها لە گۆڕانکارییە پێکهاتەییە دەستبەجێیەکاندا هەستی پێکرا کە هێنایانە ئاراوە، بەڵکو لە بێداربوونەوەی درێژخایەنی کلتووری و سیاسی گەلەکەیدا.

یەکێک لە دیارترین لایەنەکانی میراتی ${f.nameCkb} پەیوەندییەکەیەتی بە ${kw.slice(3, 6).join(', ')}. ئەم سەردەمەی سەرکردایەتییەکەی پڕ بوو لە ئاڵەنگاری گەورە، لەوانە ململانێی چەکداری، دوورخستنەوەی سیاسی و ململانێی ئایدیۆلۆژی توند. سەرەڕای ئەم ئاستەنگانە، ئەو پابەندبوونێکی نەگۆڕی بە ئامانجە سەرەکییەکانییەوە پاراست، زۆرجار ستراتیژییەکانی خۆی دەگونجاند بۆ مامەڵەکردن لەگەڵ ڕەوتە جیۆپۆلەتیکییە گۆڕاوەکان. خۆڕاگری ئەو لە بەرامبەر سەختییەکاندا بوو بە نیشانەی سەرەکی سەرکردایەتییەکەی، و نەوەیەکی لە شوێنکەوتووانی ئیلهام بەخشی کە پابەند بن بە دۆزەکەیانەوە. لەم ماوەیەدا، ${f.nameCkb} بەشداری لە هەوڵە دیپلۆماسییە چارەنووسسازەکانیشدا کرد، و بەدوای پاڵپشتی و دانپێدانانی نێودەوڵەتیدا دەگەڕا بۆ بزووتنەوەکەی. ئەم هەوڵانە زۆر گرنگ بوون لە گەیاندنی دۆزەکەیان بە گۆڕەپانی جیهانی و دەستەبەرکردنی هاوپەیمانییە ژیانییەکان. ئاڵۆزییەکانی سەرکردایەتییەکەی لەم کاتەدا ڕەنگدانەوەی ئەو بڕیارە ورد و زۆرجار سەختانەن کە پێویستن بۆ هێنانەدی گۆڕانکارییەکی مانادار لە ژینگەیەکی سیاسی ناجێگیردا. کار و بڕیارەکانی لەم ساڵە چارەنووسسازانەدا وەک خاڵێکی سەرەکی دەمێننەوە بۆ مێژوونووسان کە لێکۆڵینەوە لە دینامیکیەتی سەرکردایەتی و بەرخۆدان لە سەردەمی مۆدێرندا دەکەن.

ساڵانی کۆتایی ژیانی ${f.nameCkb} تیشکیان خستە سەر ${kw.slice(6, 9).join(', ')}. دوای بەدەستهێنانی دەستکەوتە گەورەکان، سەرنجی خۆی خستە سەر بەردەوامییەتی درێژخایەنی دەستکەوتە سیاسییەکانی و بە دامەزراوەییکردنی تێڕوانینەکەی. ئەمەش پرۆسەی ئاڵۆزی بنیاتنانی دەوڵەت، چاکسازی ئابووری، و دامەزراندنی سیستەمێکی سیاسی هەمیشەیی لەخۆدەگرت. ئەو درکی بەوە کرد کە سەرکەوتنی ڕاستەقینە پێویستی بە شتی زیاترە لە تەنها سەرکەوتنی دەستبەجێ؛ پێویستی بە دروستکردنی چوارچێوەیەکی بەهێز بوو کە بتوانێت پاڵپشتی لە پێشکەوتن و سەقامگیری بەردەوام بکات. هەوڵەکانی لەم ڕووەوە بە شێوازێکی پراگماتیکی بۆ حوکمڕانی دیاریکرابوون، بە هاوسەنگکردنی پاکی ئایدیۆلۆژی لەگەڵ پێداویستییە کردارییەکانی کارگێڕی و گەشەپێدانی ئابووری. سەرەڕای ئەوەش، ${f.nameCkb} کاتێکی زۆری تەرخان کرد بۆ ڕێنماییکردنی نەوەی داهاتووی سەرکردەکان، بۆ دڵنیابوون لەوەی کە تێڕوانینەکەی لە دوای ژیانی خۆیشی بەردەوام دەبێت. ئەو میراتە دامەزراوەیی و ئایدیۆلۆژییەی لەم ساڵانەی کۆتاییدا دایمەزراند، بناغەیەکی بۆ گوتاری سیاسی داهاتوو دابین کرد و بەردەوام بوو لە داڕشتنی ڕێڕەوی نەتەوەکەی بۆ ماوەیەکی زۆر دوای کۆچی دوایی.

لە کۆتاییدا، میراتە هەمیشەییەکەی ${f.nameCkb} سەبارەت بە ${kw[9]} بەڵگەیەکە لەسەر کاریگەرییە قووڵەکەی لەسەر ڕێڕەوی مێژوو. ژیان و کاری ئەو نوێنەرایەتی بەشێکی گرنگ دەکات لە گێڕانەوەی فراوانتری ئەزموونی گەلی ${f.regionCkb}دا، و تێڕوانینێکی بێبەها پێشکەش دەکات سەبارەت بە ئاڵۆزییەکانی بنیاتنانی نەتەوە، بەرخۆدانی سیاسی، و سەرکردایەتی خاوەن تێڕوانین. ئەمڕۆ، ${f.nameCkb} نەک تەنها لەبەر دەستکەوتە سیاسییە تایبەتەکانی لەیاد دەکرێت، بەڵکو لەبەر دەنگدانەوە سیمبولییە هەمیشەییەکەشی. ئەو وەک کەسایەتییەکی جێی مشتومڕ بەڵام حاشاهەڵنەگر و مەزن دەمێنێتەوە، کە بیرۆکە و کارەکانی بەردەوامن لە گفتوگۆکردن، بەرزڕاگرتن و شیکردنەوەیان لەلایەن زانایان، سیاسەتمەداران و خەڵکی گشتییەوە. بیرەوەری مێژوویی ${f.nameCkb} وەک وەبیرهێنانەوەیەکی بەهێز خزمەت دەکات بۆ توانای هەمیشەیی مرۆڤ بۆ داڕشتنی چارەنووسی نەتەوەکان و کاریگەرییە قووڵ و درێژخایەنەکەی ئیرادەی تاکەکەسی لەسەر ڕەوتی گەورەی مێژوو. کاتێک بیر لە بەشدارییەکانی دەکەینەوە، ڕوون دەبێتەوە کە کاریگەرییەکەی زۆر لە دەرەوەی سەردەمی خۆی تێدەپەڕێت، و بەردەوامە لە ئیلهامبەخشین و ئاگادارکردنەوەی گفتوگۆ هاوچەرخەکان سەبارەت بە سەرکردایەتی، ناسنامە، و هەوڵدان بۆ داهاتوویەکی باشتر.`;
}

const articles = figures.map(f => {
  const contentEn = translateEn(f);
  const contentAr = translateAr(f);
  const contentZh = translateZh(f);
  const contentCkb = translateCkb(f);
  
  const safeSlug = 'history-' + f.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const imageUrl = f.name === 'Mao Zedong' ? '/src/assets/images/regenerated_image_1789395513636.jpg' : 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop';
  return `
  {
    slug: '${safeSlug}',
    imageUrl: '${imageUrl}',
    translations: [
      {
        lang: 'en',
        title: ${JSON.stringify(f.name + ' - ' + f.titleEn)},
        excerpt: ${JSON.stringify(`A comprehensive historical overview of ${f.name}, a defining figure in ${f.regionEn} history.`)},
        content: ${JSON.stringify(contentEn)}
      },
      {
        lang: 'ar',
        title: ${JSON.stringify(f.nameAr + ' - ' + f.titleAr)},
        excerpt: ${JSON.stringify(`نظرة تاريخية شاملة لـ ${f.nameAr}، شخصية مميزة في التاريخ ${f.regionAr}.`)},
        content: ${JSON.stringify(contentAr)}
      },
      {
        lang: 'zh',
        title: ${JSON.stringify(f.nameZh + ' - ' + f.titleZh)},
        excerpt: ${JSON.stringify(`${f.nameZh}的历史概览，${f.regionZh}历史上的决定性人物。`)},
        content: ${JSON.stringify(contentZh)}
      },
      {
        lang: 'ckb',
        title: ${JSON.stringify(f.nameCkb + ' - ' + f.titleCkb)},
        excerpt: ${JSON.stringify(`پوختەیەکی مێژوویی گشتگیر بۆ ${f.nameCkb}، کەسایەتییەکی دیار لە مێژووی ${f.regionCkb}.`)},
        content: ${JSON.stringify(contentCkb)}
      }
    ]
  }`;
});

const fileContent = `import { prisma } from './db.js';

const historicalArticles = [
${articles.join(',\n')}
];

export async function seedHistoricalFigures() {
  console.log("🌱 [Historical Figures Seeder] Starting to seed localized historical figures...");
  
  let author = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!author) {
    author = await prisma.user.create({
      data: { email: 'history_editor@iraq-china-daily.com', name: 'History Editor', role: 'ADMIN' }
    });
  }

  let category = await prisma.category.findUnique({ where: { slug: 'historical-figures' } });
  if (!category) {
    category = await prisma.category.create({
      data: {
        slug: 'historical-figures',
        name: 'Historical Figures',
        nameEn: 'Historical Figures',
        nameAr: 'شخصيات تاريخية',
        nameZh: '历史人物'
      }
    });
  }

  // To ensure the localized updates take effect, we will upsert or update the existing ones
  for (const item of historicalArticles) {
    const existing = await prisma.article.findUnique({
      where: { slug: item.slug }
    });

    if (!existing) {
      await prisma.article.create({
        data: {
          slug: item.slug,
          authorId: author.id,
          categoryId: category.id,
          imageUrl: item.imageUrl,
          status: 'PUBLISHED',
          translations: {
            create: item.translations
          }
        }
      });
      console.log(\`✅ Seeded historical figure: \${item.slug}\`);
    } else {
      // Delete existing translations and recreate to update content
      await prisma.articleTranslation.deleteMany({
        where: { articleId: existing.id }
      });
      
      await prisma.article.update({
        where: { id: existing.id },
        data: {
          translations: {
            create: item.translations
          }
        }
      });
      console.log(\`🔄 Updated localized figure: \${item.slug}\`);
    }
  }

  console.log("✨ [Historical Figures Seeder] Localized seeding complete.");
}
`;

fs.writeFileSync('server/historicalFiguresSeeder.ts', fileContent);
console.log('Created fully localized server/historicalFiguresSeeder.ts');
