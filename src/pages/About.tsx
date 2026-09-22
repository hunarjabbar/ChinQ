import { useState, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Send, 
  CheckCircle, 
  Calendar, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  ArrowLeft,
  Globe, 
  Lock, 
  Radio, 
  Activity, 
  Award, 
  BookOpen, 
  UserPlus,
  Compass,
  FileCheck,
  TrendingUp,
  Cpu,
  Anchor
} from 'lucide-react';

interface CouncilMember {
  name: string;
  role: string;
  bio: string;
}

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

interface BureauLive {
  city: string;
  region: string;
  status: string;
  latency: string;
  focus: string;
}

interface BureauOption {
  id: string;
  label: string;
}

interface Pillar {
  title: string;
  desc: string;
}

interface Highlight {
  label: string;
  detail: string;
}

interface AboutContent {
  title: string;
  subtitle: string;
  intro: string;
  importanceTitle: string;
  importanceDesc: string;
  futureTitle: string;
  futureDesc: string;
  corridorTitle: string;
  corridorDesc: string;
  sovereigntyTitle: string;
  sovereigntyDesc: string;
  manifestoTitle: string;
  manifestoDesc: string;
  telemetryTitle: string;
  telemetrySubtitle: string;
  bureausLive: BureauLive[];
  pillarsTitle: string;
  pillarsSubtitle: string;
  pillars: Pillar[];
  milestoneTitle: string;
  milestones: Milestone[];
  councilTitle: string;
  council: CouncilMember[];
  joinEditorialTitle: string;
  joinEditorialSubtitle: string;
  joinEditorialDesc: string;
  joinEditorialBtn: string;
  joinEditorialHighlights: Highlight[];
  contactTitle: string;
  contactSubtitle: string;
  formName: string;
  formEmail: string;
  formCompany: string;
  formBureau: string;
  formMessage: string;
  bureauList: BureauOption[];
  submit: string;
  submitting: string;
  required: string;
  successTitle: string;
  successDesc: string;
  telexNo: string;
  routingBureau: string;
  timestamp: string;
  reset: string;
}

const translations: Record<Locale, AboutContent> = {
  en: {
    title: 'About Iraqi-Chinese Agency Media Group',
    subtitle: 'The Sovereign Gateway Bridging East Asia and the Middle East',
    intro: "Iraqi-Chinese Agency Media Group represents a strategic, sovereign, and cultural bridge between the People's Republic of China and the Republic of Iraq. Now evolved into a multi-modal intelligence ecosystem, the agency integrates real-time broadcast telemetry (Live Broadcast), premium media archives (ICA+), and the Sovereign Settlement Gateway to facilitate diplomatic journalism, macroeconomic analysis, and cross-border enterprise intelligence.",
    importanceTitle: 'Strategic Importance & Economic Corridors',
    importanceDesc: 'The significance of the Iraqi-Chinese Agency lies in its ability to synthesize trilingual reporting—English, Arabic, Kurdish (Sorani), and Mandarin Chinese—into a cohesive editorial voice. As bilateral trade and infrastructure investments (such as the Belt and Road Initiative, the Al Faw Grand Port, and the Sovereign Settlement System) continue to expand, there is a critical need for an authoritative, real-time platform that provides accurate market data, geopolitical analysis, and enterprise-level logistics information.',
    futureTitle: 'Future Potential, Vision & Sovereign Corridors',
    futureDesc: 'Looking forward, the Iraqi-Chinese Agency is evolving beyond a news publisher into a comprehensive sovereign information and diplomatic intelligence syndicate. From an institutional perspective, it facilitates tighter academic partnerships, think-tank symposia, and ministerial dialogues. Economically, our real-time market data pipelines, verified enterprise directories, and energy indices streamline cross-border investments, joint ventures, and supply chain logistics along the modern Silk Road.',
    corridorTitle: 'Sino-Iraqi Economic Corridors & The Al Faw Grand Port',
    corridorDesc: 'The resurgence of the ancient Silk Road is anchored in modern mega-infrastructure projects. The Al Faw Grand Port in southern Iraq, coupled with the Development Road project connecting the Persian Gulf to Europe via Anatolia, represents a transformative axis for global commerce. The Iraqi-Chinese Agency provides deep investigative coverage of energy contracts, container throughput metrics, customs modernization, and joint ventures between Chinese enterprises and Iraqi ministries.',
    sovereigntyTitle: 'Trilingual Linguistic Sovereignty & Editorial Integrity',
    sovereigntyDesc: 'Accuracy in cross-cultural journalism requires more than literal translation; it demands profound contextual localization. The Iraqi-Chinese Agency operates proprietary translation and localization matrices across Mandarin Chinese, Arabic, Sorani Kurdish, and English. Our resident editors, policy analysts, and scholars ensure that every policy brief, market ticker, and diplomatic dispatch retains absolute fidelity to its original legal and cultural nuances.',
    telemetryTitle: 'Live Bureau Telemetry & Network Status',
    telemetrySubtitle: 'Real-time encrypted connection metrics across Iraqi-Chinese Agency sovereign newsrooms.',
    bureausLive: [
      { city: 'Beijing HQ', region: 'PRC', status: 'Secure / Synchronized', latency: '14ms', focus: 'Diplomatic Affairs & Macroeconomics' },
      { city: 'Baghdad Bureau', region: 'Iraq', status: 'Secure / Synchronized', latency: '28ms', focus: 'Legislative Policy & Energy' },
      { city: 'Basra Maritime Hub', region: 'Iraq', status: 'Active / Al Faw Port', latency: '22ms', focus: 'Container Logistics & Customs' },
      { city: 'Erbil Bureau', region: 'Kurdistan Region', status: 'Active / Synchronized', latency: '31ms', focus: 'Regional Commerce & Academia' }
    ],
    pillarsTitle: 'Six Institutional Pillars of the Sovereign Agency',
    pillarsSubtitle: 'Strategic architecture underwriting our trilingual intelligence and journalistic mandate.',
    pillars: [
      { 
        title: 'Diplomatic & Macroeconomic Intelligence', 
        desc: 'Uncompromising fact-checked reporting on bilateral pacts, ministerial directives, and China-Arab cooperation forums.' 
      },
      { 
        title: 'Al Faw Grand Port & Development Road Telemetry', 
        desc: 'Dedicated monitoring of container throughput, maritime berths, and railway infrastructure connecting Iraq to Europe.' 
      },
      { 
        title: 'Bilateral Settlement & Sovereign Payments', 
        desc: 'A integrated trilingual payment gateway facilitating IQD and e-CNY transactions for enterprise trade and personal mobility.' 
      },
      { 
        title: 'Trilingual Contextual Localization Matrix', 
        desc: 'Proprietary linguistic engines reconciling legal terminology across Mandarin, Arabic, Sorani Kurdish, and English without semantic loss.' 
      },
      { 
        title: 'Sino-Arab Think Tank & Academic Discourse', 
        desc: 'Peer-reviewed policy papers, university fellowships, and symposia bridging premier researchers in Baghdad, Basra, and Beijing.' 
      },
      { 
        title: 'Verified Enterprise Directory & Energy Analytics', 
        desc: 'Real-time oil refinery benchmarks, customs clearance statistics, and enterprise registries vetting cross-border joint ventures.' 
      }
    ],
    manifestoTitle: 'Sovereign Journalistic Manifesto',
    manifestoDesc: 'The Iraqi-Chinese Agency operates under an uncompromising ethical framework committed to absolute factual integrity, trilingual linguistic precision, and deep geopolitical nuance. We reject sensationalism in favor of authoritative primary research, verified official telemetry, and multi-perspective regional analysis.',
    milestoneTitle: 'Strategic Milestones',
    milestones: [
      { year: '2021', title: 'Diplomatic Foundation', desc: 'Bilateral protocols signed between educational and media councils in Beijing and Baghdad for real-time intellectual exchange.' },
      { year: '2023', title: 'Basra Logistics Accord', desc: 'Basra Hub activated to provide real-time custom tariffs and shipping statistics for Gulf of Faw container fleets.' },
      { year: '2025', title: 'Trilingual AI Translation Engine', desc: 'Launch of the sovereign translation matrix contextually localizing reports into Kurdish, Arabic, Chinese, and English.' },
      { year: '2026', title: 'Live Broadcast & Settlement Gateway', desc: 'Launch of the immersive Live Broadcast Portal and Sovereign Settlement Gateway for IQD and e-CNY transactions.' }
    ],
    councilTitle: 'Executive Council & Regional Bureau Directors',
    council: [
      { 
        name: 'Hunar Jabbar', 
        role: 'CEO & Chief Editor', 
        bio: 'Strategic leader and chief editor of the Iraqi-Chinese Agency, directing bilateral media excellence, geopolitical research, and sovereign enterprise analytics across Baghdad, Beijing, and Basra.' 
      },
      { 
        name: 'Dr. Li Weimin', 
        role: 'Director, Beijing Liaison Bureau & Academic Council', 
        bio: 'Distinguished scholar in Sino-Arab diplomatic relations and macroeconomics, coordinating ministerial interviews, academic symposiums, and East Asian editorial operations.' 
      },
      { 
        name: 'Capt. Tariq Al-Mansoor', 
        role: 'Director, Basra Maritime Hub & Al Faw Port Desk', 
        bio: 'Maritime logistics specialist and infrastructure researcher overseeing real-time tracking of container throughput, Gulf shipping tariffs, and Development Road freight integration.' 
      },
      { 
        name: 'Dr. Rezan Barzani', 
        role: 'Director, Erbil Bureau & Trilingual Matrix', 
        bio: 'Senior linguist and regional policy analyst presiding over contextual Sorani Kurdish, Arabic, and Mandarin localization protocols and Northern Iraq trade reporting.' 
      }
    ],
    joinEditorialTitle: 'Join the Editorial Network & Diplomatic Fellowship',
    joinEditorialSubtitle: 'Call for Senior Correspondents, Macroeconomists, Translators & Trilingual Policy Fellows',
    joinEditorialDesc: 'The Iraqi-Chinese Agency is actively enlisting verified investigative journalists, bilateral trade analysts, and academic fellows to reinforce our sovereign editorial bureaus in Beijing, Baghdad, Basra, and Erbil. Selected fellows receive direct bureau affiliation, accredited digital press credentials, and direct syndication access within our centralized administration command center.',
    joinEditorialBtn: 'Submit Editorial Credential Dossier',
    joinEditorialHighlights: [
      { label: '4 Sovereign Bureaus', detail: 'Beijing • Baghdad • Basra • Erbil' },
      { label: '4 Working Languages', detail: 'Mandarin • Arabic • Kurdish • English' },
      { label: 'Peer-Reviewed Standards', detail: 'Primary Source Diplomatic Verification' },
      { label: 'Direct Syndication', detail: 'Synchronized with Command Portal' }
    ],
    contactTitle: 'Direct Sovereign Bureau Communications',
    contactSubtitle: 'Dispatch encrypted telex inquiry directly to specific regional newsrooms.',
    formName: 'Inquirer Name',
    formEmail: 'Official Email',
    formCompany: 'Affiliation / Institution',
    formBureau: 'Destination Bureau',
    formMessage: 'Telex Communication Body',
    bureauList: [
      { id: 'baghdad', label: 'Baghdad HQ Newsroom & General Secretariat' },
      { id: 'beijing', label: 'Beijing Bureau & Diplomatic Liaison' },
      { id: 'basra', label: 'Basra Hub & Maritime Logistics Directorate' },
      { id: 'erbil', label: 'Erbil Bureau & Northern Regional Desk' }
    ],
    submit: 'Transmit Telex Communication',
    submitting: 'Securing Connection & Encrypting...',
    required: 'Field is required',
    successTitle: 'Telex Dispatch Confirmed',
    successDesc: 'Your diplomatic inquiry has been encrypted and securely routed to the designated regional bureau. A secure response packet will be dispatched to your provided terminal.',
    telexNo: 'Telex Transmission Ref',
    routingBureau: 'Routed Office',
    timestamp: 'Time Logged (UTC)',
    reset: 'Transmit New Telex'
  },
  ar: {
    title: 'حول مجموعة الوكالة العراقية الصينية (ICA)',
    subtitle: 'البوابة السيادية المستقلة التي تجسر الفجوة بين شرق آسيا والشرق الأوسط',
    intro: "تمثل مجموعة الوكالة العراقية الصينية (ICA) جسراً استراتيجياً، سيادياً وثقافياً بين جمهورية الصين الشعبية وجمهورية العراق. تطورت الوكالة اليوم إلى منظومة استخباراتية متعددة الوسائط، تدمج قياسات البث الحي، وأرشيفات الوسائط المميزة (ICA+)، وبوابة التسوية السيادية لتسهيل الصحافة الدبلوماسية، والتحليل الاقتصادي الكلي، واستخبارات الأعمال العابرة للحدود.",
    importanceTitle: 'الأهمية الاستراتيجية والممرات الاقتصادية',
    importanceDesc: 'تكمن أهمية الوكالة العراقية الصينية في قدرتها على دمج التقارير بأربع لغات — الإنجليزية، العربية، الكردية (السورانية)، والصينية الماندرين — في صوت تحريري متماسك. مع استمرار توسع التجارة الثنائية واستثمارات البنية التحتية (مثل مبادرة الحزام والطريق، وميناء الفاو الكبير، ومنظومة التسوية السيادية)، هناك حاجة ماسة إلى منصة موثوقة في الوقت الفعلي توفر بيانات دقيقة للسوق، وتحليلات جيوسياسية، ومعلومات لوجستية مؤسسية.',
    futureTitle: 'الآفاق المستقبلية والرؤية والممرات السيادية',
    futureDesc: 'بالنظر إلى المستقبل، تتطور الوكالة لتتجاوز كونها منصة صحفية إلى مجمع استخباراتي ومعلوماتي سيادي شامل. من منظور مؤسسي، تسهل الوكالة التحالفات الأكاديمية الأوثق، وندوات مراكز الفكر، والحوارات الوزارية. واقتصادياً، تعمل خطوط بيانات السوق الفورية وأدلة المؤسسات الموثقة ومؤشرات الطاقة على تبسيط الاستثمارات والمشاريع المشتركة عبر طريق الحرير الحديث.',
    corridorTitle: 'الممرات الاقتصادية الصينية العراقية وميناء الفاو الكبير',
    corridorDesc: 'إن إحياء طريق الحرير القديم يرتكز على مشاريع البنية التحتية الكبرى الحديثة. يمثل ميناء الفاو الكبير في جنوب العراق، إلى جانب مشروع طريق التنمية الذي يربط الخليج العربي بأوروبا عبر الأناضول، محوراً تحولياً للتجارة العالمية. توفر الوكالة تغطية استقصائية عميقة لعقود الطاقة، ومقاييس تدفق الحاويات، وتحديث الجمارك، والمشاريع المشتركة بين الشركات الصينية والوزارات العراقية.',
    sovereigntyTitle: 'السيادة اللغوية الثلاثية والنزاهة التحريرية',
    sovereigntyDesc: 'تتطلب الدقة في الصحافة عبر الثقافات أكثر من مجرد الترجمة الحرفية؛ فهي تتطلب توطناً سياقياً عميقاً. تشغل الوكالة مصفوفات ترجمة وتوطين خاصة عبر اللغات الصينية الماندرين، العربية، الكردية السورانية، والإنجليزية. يضمن محرونا وباحثونا المقيمون أن تحافظ كل موجزة سياسية وبرقية دبلوماسية على دقة مطلقة تجاه الفروق القانونية والثقافية الأصلية.',
    telemetryTitle: 'قياسات المكاتب الحية وحالة الشبكة',
    telemetrySubtitle: 'مقاييس اتصال مشفرة في الوقت الفعلي عبر غرف أخبار الوكالة العراقية الصينية السيادية.',
    bureausLive: [
      { city: 'مكتب بكين الرئيسي', region: 'جمهورية الصين الشعبية', status: 'آمن / متزامن', latency: '14ms', focus: 'الشؤون الدبلوماسية والاقتصاد الكلي' },
      { city: 'مكتب بغداد', region: 'العراق', status: 'آمن / متزامن', latency: '28ms', focus: 'السياسات التشريعية والطاقة' },
      { city: 'مركز البصرة البحري', region: 'العراق', status: 'نشط / ميناء الفاو', latency: '22ms', focus: 'لوجستيات الحاويات والجمارك' },
      { city: 'مكتب أربيل', region: 'إقليم كردستان', status: 'نشط / متزامن', latency: '31ms', focus: 'التجارة الإقليمية والأكاديميا' }
    ],
    pillarsTitle: 'الركائز المؤسسية الست للوكالة السيادية',
    pillarsSubtitle: 'الهندسة الاستراتيجية الضامنة للمعلوماتية ثلاثية اللغات والتكليف الصحفي المعتمد.',
    pillars: [
      { 
        title: 'الاستخبارات الدبلوماسية والاقتصادية الكلية', 
        desc: 'تقارير مدققة وحاسمة حول الاتفاقيات الثنائية والتوجيهات الوزارية ومنتديات التعاون الصيني العربي.' 
      },
      { 
        title: 'رصد ميناء الفاو الكبير ومشروع طريق التنمية', 
        desc: 'متابعة حية مستمرة لتدفق الحاويات وأرصفة الموانئ والبنى التحتية لشبكات السكك الحديدية الرابطة بين العراق وأوروبا.' 
      },
      { 
        title: 'التسوية الثنائية والمدفوعات السيادية', 
        desc: 'بوابة دفع ثلاثية اللغة متكاملة تسهل معاملات الدينار واليوان الرقمي للتجارة المؤسسية والتنقل الشخصي.' 
      },
      { 
        title: 'مصفوفة التعريب والترجمة السياقية الثلاثية', 
        desc: 'محركات لغوية خاصة توائم المصطلحات القانونية بين الماندرين والعربية والكردية السورانية والإنجليزية دون أي فقد دلالي.' 
      },
      { 
        title: 'مركز الفكر والخطاب الأكاديمي الصيني العربي', 
        desc: 'أوراق سياسات محكمة وزمالات جامعية وندوات استراتيجية تجمع كبار الباحثين في بغداد والبصرة وبكين.' 
      },
      { 
        title: 'دليل المؤسسات الموثق وتحليلات الطاقة', 
        desc: 'مؤشرات حية لتكرير النفط، وإحصاءات التخليص الجمركي، وسجلات تجارية تدقق المشاريع الاستثمارية المشتركة.' 
      }
    ],
    manifestoTitle: 'البيان الصحفي السيادي',
    manifestoDesc: 'تعمل الوكالة العراقية الصينية في ظل إطار أخلاقي لا يساوم ملتزم بالنزاهة الواقعية المطلقة، والدقة اللغوية ثلاثية اللغات، والعمق الجيوسياسي. نحن نرفض الإثارة لصالح البحث الأولي الموثوق والقياسات الرسمية المعيارية.',
    milestoneTitle: 'المحطات الاستراتيجية',
    milestones: [
      { year: '٢٠٢١', title: 'التأسيس الدبلوماسي', desc: 'توقيع البروتوكولات الثنائية بين المجالس الأكاديمية والإعلامية في بكين وبغداد للتبادل المعرفي الفوري.' },
      { year: '٢٠٢٣', title: 'اتفاقية البصرة اللوجستية', desc: 'تفعيل مركز البصرة لتقديم التعريفات الجمركية وإحصاءات الشحن الفورية لأساطيل الحاويات في ميناء الفاو.' },
      { year: '٢٠٢٥', title: 'محرك الترجمة الآلي الثلاثي', desc: 'إطلاق مصفوفة الترجمة الخاصة لتعريب التقارير وسياقها في الكردية والعربية والصينية والإنجليزية.' },
      { year: '٢٠٢٦', title: 'البث المباشر وبوابة التسوية', desc: 'إطلاق بوابة البث المباشر وبوابة التسوية السيادية لمعاملات الدينار واليوان الرقمي.' }
    ],
    councilTitle: 'المجلس التنفيذي ومدراء المكاتب الإقليمية',
    council: [
      { 
        name: 'هنر جبار', 
        role: 'الرئيس التنفيذي ورئيس التحرير', 
        bio: 'القائد الاستراتيجي ورئيس تحرير الوكالة العراقية الصينية، يوجه التميز الإعلامي الثنائي والأبحاث الجيوسياسية والتحليلات المؤسسية المستقلة عبر مكاتب بغداد وبكين والبصرة.' 
      },
      { 
        name: 'د. لي وي مين (Dr. Li Weimin)', 
        role: 'مدير مكتب اتصال بكين ومجلس التعاون الأكاديمي', 
        bio: 'باحث ومستشار بارز في العلاقات الدبلوماسية والاقتصاد الكلي الصيني العربي، يشرف على الحوارات الوزارية والندوات الأكاديمية والعمليات التحريرية في شرق آسيا.' 
      },
      { 
        name: 'القبطان طارق المنصور', 
        role: 'مدير مركز البصرة البحري ومكتب متابعة ميناء الفاو', 
        bio: 'خبير اللوجستيات البحرية وأبحاث البنية التحتية، يتولى المتابعة اللحظية لحركة الحاويات والتعريفات الجمركية ومسار طريق التنمية الاستراتيجي.' 
      },
      { 
        name: 'د. ريزان بارزاني', 
        role: 'مدير مكتب أربيل ومصفوفة الترجمة والتعريب', 
        bio: 'أكاديمية وباحثة في السياسات الإقليمية، تدير بروتوكولات التعريب السياقي للكردية السورانية والعربية والصينية وتغطيات التجارة في شمال العراق.' 
      }
    ],
    joinEditorialTitle: 'الانضمام إلى شبكة التحرير والزمالة الدبلوماسية',
    joinEditorialSubtitle: 'دعوة للمراسلين البارزين، واقتصاديي التنمية، والمترجمين، وزملاء السياسات',
    joinEditorialDesc: 'تفتح الوكالة العراقية الصينية باب الانضمام لنخبة الصحفيين الاستقصائيين، ومحللي التجارة الثنائية، والباحثين الأكاديميين لتعزيز مكاتب التحرير السيادية في بكين وبغداد والبصرة وأربيل. يحصل الزملاء المختارون على انتساب رسمي للمكاتب، وبطاقات اعتماد صحفية رقمية موثقة، والوصول المباشر لمنظومة النشر المركزية.',
    joinEditorialBtn: 'تقديم ملف الاعتماد الصحفي والتحريري',
    joinEditorialHighlights: [
      { label: '٤ مكاتب سيادية', detail: 'بكين • بغداد • البصرة • أربيل' },
      { label: '٤ لغات معتمدة', detail: 'الماندرين • العربية • الكردية • الإنجليزية' },
      { label: 'معايير تدقيق صارمة', detail: 'تحقق من المصادر الدبلوماسية الأولية' },
      { label: 'توزيع مركزي مباشر', detail: 'متزامن مع مركز القيادة الإداري' }
    ],
    contactTitle: 'الاتصالات المباشرة مع المكاتب السيادية',
    contactSubtitle: 'أرسل برقية تليكس مشفرة مباشرة إلى غرف الأخبار والمكاتب الإقليمية المحددة.',
    formName: 'اسم المرسل',
    formEmail: 'البريد الإلكتروني الرسمي',
    formCompany: 'المؤسسة / الشركة التابعة',
    formBureau: 'المكتب المقصود',
    formMessage: 'نص رسالة التليكس',
    bureauList: [
      { id: 'baghdad', label: 'مكتب بغداد الرئيسي والأمانة العامة' },
      { id: 'beijing', label: 'مكتب بكين والارتباط الدبلوماسي' },
      { id: 'basra', label: 'مركز البصرة ومديرية اللوجستيات البحرية' },
      { id: 'erbil', label: 'مكتب أربيل والديسك الإقليمي للشمال' }
    ],
    submit: 'إرسال برقية التليكس المشفرة',
    submitting: 'تأمين الاتصال وتشفير البيانات...',
    required: 'هذا الحقل مطلوب',
    successTitle: 'تم تأكيد إرسال التليكس السيادي',
    successDesc: 'تم تشفير استفسارك الدبلوماسي وتوجيهه بأمان إلى المكتب الإقليمي المعين. سيتم إرسال حزمة الرد الآمنة إلى بريدك الإلكتروني المقدم.',
    telexNo: 'رقم مرجع الإرسال',
    routingBureau: 'المكتب المستلم',
    timestamp: 'وقت التسجيل (UTC)',
    reset: 'إرسال برقية جديدة'
  },
  zh: {
    title: '关于伊中通讯社传媒集团 (ICA)',
    subtitle: '连接东亚与中东的主权级战略枢纽与信息走廊',
    intro: "伊中通讯社传媒集团（ICA）是连接中华人民共和国与伊拉克共和国的战略、主权与文化桥梁。目前，本机构已演进为多模态情报生态系统，整合了实时广播遥测、高端媒体档案（ICA+）以及主权结算网关，赋能外交采编报道、宏观经济分析与跨境企业商业情报。",
    importanceTitle: '战略重要性与经济走廊',
    importanceDesc: '伊中通讯社的核心价值在于将英语、阿拉伯语、索拉尼库尔德语及普通话报道融汇为高度统一的主权采编声音。随着双边经贸往来及重大基础设施投资（如“一带一路”倡议、法奥大港项目以及主权结算系统）的持续深化，迫切需要一个权威的实时平台，提供精确的市场指标、地缘战略评估和企业级物流通量遥测。',
    futureTitle: '未来愿景、战略走廊与主权情报',
    futureDesc: '展望未来，伊中通讯社正由双边新闻出版机构全面演进为跨国企业情报与外交智库联合体。在制度层面，本机构深化双边高校学术联盟、智库研讨及部委级别对话；在经济层面，依托实时金融数据流、已核验企业名录与能源指标，赋能现代丝绸之路沿线跨境投资与供应链协同。',
    corridorTitle: '中伊经济走廊与法奥大港超级工程',
    corridorDesc: '古丝绸之路的当代复兴深植于现代跨国大基建。伊拉克南部法奥大港工程与连接波斯湾及欧洲的发展之路（Development Road）走廊，构成了全球贸易的变革性中轴。伊中通讯社对能源特许经营权、集装箱通量动态、海关现代通关系统以及中伊部委合资项目展开全天候深度追踪。',
    sovereigntyTitle: '三语语言主权与主权采编严谨性',
    sovereigntyDesc: '跨文化新闻的精准性远不止于字面逐词翻译，更要求严谨的法理与文化语境本地化。伊中通讯社运行专有的多语言转译矩阵，涵盖中文普通话、阿拉伯语、索拉尼库尔德语与英语。驻社采编官与政策研究员确保每份政策简报、市场快讯与外交电传均完全忠实于原始法律与文化内涵。',
    telemetryTitle: '各分社实时遥测与网络安全状态',
    telemetrySubtitle: '伊中通讯社主权级新闻编辑室加密联络通道实时延迟与运行状态。',
    bureausLive: [
      { city: '北京总部办事处', region: '中国', status: '高安全 / 实时同步', latency: '14ms', focus: '外交事务与宏观经济分析' },
      { city: '巴格达采编总社', region: '伊拉克', status: '高安全 / 实时同步', latency: '28ms', focus: '立法政策与能源综合事务' },
      { city: '巴士拉海洋枢纽', region: '伊拉克', status: '运行中 / 法奥港观察室', latency: '22ms', focus: '集装箱航运与海关监管' },
      { city: '埃尔比勒分社', region: '库尔德斯坦地区', status: '运行中 / 实时同步', latency: '31ms', focus: '区域商贸与高校学术交流' }
    ],
    pillarsTitle: '主权通讯社六大制度支柱',
    pillarsSubtitle: '支撑本机构三语情报网络与官方采编准则的底层战略架构。',
    pillars: [
      { 
        title: '外交与宏观经济战略情报', 
        desc: '对双边条约、部委行政令及中阿合作论坛进行严格核验的高标准深度采编。' 
      },
      { 
        title: '法奥大港与发展之路全时遥测', 
        desc: '对港口泊位、集装箱通量及贯通伊拉克至欧洲的铁路走廊进行专属数据跟踪。' 
      },
      { 
        title: '双边结算与主权支付体系', 
        desc: '集成三语支付网关，支持第纳尔与数字人民币跨境结算，赋能双边贸易与流动性。' 
      },
      { 
        title: '三语语境本地化转译矩阵', 
        desc: '专有语言算法精确协调中文、阿拉伯语、库尔德语及英语法理术语，杜绝语义损耗。' 
      },
      { 
        title: '中阿联合智库与学术高层论坛', 
        desc: '同行评审政策文集、大学联合研究基金及联通巴格达、巴士拉与北京的学术研讨。' 
      },
      { 
        title: '认证企业名录与能源指标走廊', 
        desc: '实时炼油基准价格、关税清关统计与严格审核跨国合资资质的权威企业名录。' 
      }
    ],
    manifestoTitle: '主权新闻采编准则宣言',
    manifestoDesc: '伊中通讯社恪守严苛的职业道德准则，坚持事实绝对严谨、三语表述精准与地缘政治深度。我们坚决摒弃耸动式噱头，恪守权威第一手信源核验、官方数据遥测与多维区域战略研判。',
    milestoneTitle: '战略发展历程',
    milestones: [
      { year: '2021', title: '外交合作奠基', desc: '北京与巴格达学术及媒体委员会签署双边协议，启动实时智力成果与学术互通。' },
      { year: '2023', title: '巴士拉物流协定', desc: '巴士拉枢纽正式激活，向法奥港集装箱船队提供实时海关费率与航运宏观统计。' },
      { year: '2025', title: '三语本地化转译引擎', desc: '通讯社自主研发转译矩阵上线，实现报道在库尔德语、阿拉伯语、中文及英语的高保真语境转化。' },
      { year: '2026', title: '直播门户与结算网关', desc: '上线沉浸式直播门户与主权结算网关，支持第纳尔与数字人民币双边交易。' }
    ],
    councilTitle: '执行委员会与各分社理事长',
    council: [
      { 
        name: '胡纳尔·贾巴尔 (Hunar Jabbar)', 
        role: '首席执行官兼总编辑', 
        bio: '伊中通讯社战略领导人兼总编辑，统筹巴格达、北京、巴士拉及埃尔比勒等主权分社的双边采编卓越体系、地缘战略智库与企业分析。' 
      },
      { 
        name: '李伟民 博士 (Dr. Li Weimin)', 
        role: '北京联络处主任兼中阿学术委员会主管', 
        bio: '中阿外交战略与宏观经济资深学者，负责部委高层专访、跨国学术论坛以及东亚采编枢纽的战略协调。' 
      },
      { 
        name: '塔里克·曼苏尔 船长 (Capt. Tariq Al-Mansoor)', 
        role: '巴士拉海洋枢纽与法奥大港观察室主管', 
        bio: '海事物流与基建资深专家，主理法奥大港集装箱通量遥测、海湾关税监测以及发展之路（Development Road）多式联运走廊专题研究。' 
      },
      { 
        name: '雷赞·巴尔扎尼 博士 (Dr. Rezan Barzani)', 
        role: '埃尔比勒分社主任兼三语转译矩阵主管', 
        bio: '资深跨语种学者与区域政策研究员，掌管索拉尼库尔德语、阿拉伯语与中文的高保真语境本地化矩阵及伊拉克北部经贸报道。' 
      }
    ],
    joinEditorialTitle: '加入主权采编网络与智库研究员计划',
    joinEditorialSubtitle: '诚聘资深特派记者、宏观经济分析师、翻译专家及政策研究员',
    joinEditorialDesc: '伊中通讯社正面向全球公开选聘资深调查记者、双边贸易分析师与智库学者，以充实设在北京、巴格达、巴士拉与埃尔比勒的主权编辑部。入选研究员将获得官方分社任职凭证、数字化主权记者证认证以及直通中央管理调度中枢的发稿与编纂权限。',
    joinEditorialBtn: '提交采编认证资质卷宗',
    joinEditorialHighlights: [
      { label: '4 大主权分社', detail: '北京 • 巴格达 • 巴士拉 • 埃尔比勒' },
      { label: '4 种工作语言', detail: '中文普通话 • 阿拉伯语 • 库尔德语 • 英语' },
      { label: '同行评审准则', detail: '一手外交信息来源与严密事实核查' },
      { label: '中央直通发稿', detail: '全线接入管理调度中心数据库' }
    ],
    contactTitle: '分社直联主权加密公文电传',
    contactSubtitle: '向特定区域分社新闻室与理事处发送加密公文电传。',
    formName: '咨询人姓名',
    formEmail: '官方联络邮箱',
    formCompany: '所属机构 / 公司名称',
    formBureau: '受理目标分社',
    formMessage: '电传通讯公文正文',
    bureauList: [
      { id: 'baghdad', label: '巴格达总部新闻室与总秘书处' },
      { id: 'beijing', label: '北京分社与外交事务联络处' },
      { id: 'basra', label: '巴士拉枢纽与海洋航运监管处' },
      { id: 'erbil', label: '埃尔比勒分社与北部事务观察室' }
    ],
    submit: '发送加密公文电传',
    submitting: '正在构建安全隧道并加密文书...',
    required: '此项为必填项',
    successTitle: '电传公文发送确认',
    successDesc: '您的外交及商贸咨询已安全加密并路由至指定的分社机构。安全回复函件将发送至您留下的专业电子邮箱。',
    telexNo: '电传传送回执哈希',
    routingBureau: '受理路由机构',
    timestamp: '登记时间 (UTC)',
    reset: '发送新电传'
  },
  ckb: {
    title: 'دەربارەی گرووپی ئاژانسی عێراقی - چینی (ICA)',
    subtitle: 'دەروازەی سەربەخۆ بۆ بەستنەوەی ڕۆژهەڵاتی ئاسیا و ڕۆژهەڵاتی ناوەڕاست',
    intro: "گرووپی ئاژانسی عێراقی - چینی (ICA) پردێکی ستراتیژی، سەربەخۆ و کولتوورییە لە نێوان کۆماری گەلی چین و کۆماری عێراق. ئێستا گەشەی کردووە بۆ سیستمێکی هەواڵگری فرە-ڕەهەند، کە پێکدێت لە داتای پەخشی ڕاستەوخۆ، ئەرشیفی میدیایی نایاب (ICA+)، و دەروازەی یەکلاییکردنەوەی دارایی بۆ ئاسانکاری لە ڕۆژنامەگەری دیپلۆماسي و شیکاری ئابووری گەورە.",
    importanceTitle: 'گرنگی ستراتیژی و دەروازە ئابوورییەکان',
    importanceDesc: 'گرنگی ئاژانسی عێراقی - چینی لە توانایدا بۆ یەکخستنی ڕاپۆرتەکان بە چوار زمان - ئینگلیزی، عەرەبی، کوردی (سۆرانی)، و چینی مەندارین - بۆ دەنگێکی یەکگرتووی سەرنووسەرایەتی دەردەکەوێت. لەگەڵ بەردەوامی فراوانبوونی بازرگانی دووقۆڵی و وەبەرهێنانەکانی ژێرخان (وەک دەستپێشخەری پشتوێن و ڕێگا، بەندەری گەورەی فاو، و سیستەمی یەکلاییکردنەوەی دارایی)، پێویستییەکی حەتمی هەیە بە پلاتفۆرمێکی باوەڕپێکراوی کاتی ڕاستەقینە.',
    futureTitle: 'تواناکانی داهاتوو، دیدگا و دەروازە سەربەخۆیەکان',
    futureDesc: 'لە داهاتوودا، ئاژانسی عێراقی - چینی پەرەدەسێنێت لە بڵاوکراوەیەکی هەواڵییەوە بۆ سەنتەرێکی گشتگیری زانیاری دامەزراوەیی و هەواڵگری دیپلۆماسی. لە ڕووی دامەزراوەییەوە، هاوپەیمانییە ئەکادیمییەکان، کۆڕبەندی لێکۆڵینەوە و دیالۆگی وەزاری ئاسانتر دەکات. لە ڕووی ئابوورییەوە، داتاکانی بازاڕ و پێڕستی بازرگانییەکان وەبەرهێنانی سنووربەزێن بە درێژایی ڕێگای ئاوریشم خێراتر دەکەن.',
    corridorTitle: 'دەروازە ئابوورییە چین و عێراقییەکان و بەندەری فاو',
    corridorDesc: 'بوژانەوەی ڕێگای ئاوریشمی کۆن لەسەر بنەمای پڕۆژە گەورەکانی ژێرخانی مۆدێرن دامەزراوە. بەندەری فاو لە باشووری عێراق، لەگەڵ پڕۆژەی ڕێگای گەشەپێدان کە کەنداوی بە ئەوروپا دەبەستێتەوە لە ڕێگەی تورکیاوە، تەوەرێکی گۆڕانکارییە بۆ بازرگانی جیهانی. ئاژانسی عێراقی - چینی ڕووپۆشی قووڵی لێکۆڵینەوەیی پێشکەش دەکات بۆ گرێبەستەکانی وزە، پێوانەکانی هەناردەکردن، و پڕۆژە هاوبەشەکانی نێوان کۆمپانیا چینییەکان و وەزارەتە عێراقییەکان.',
    sovereigntyTitle: 'سەربەخۆیی زمانەوانی سێزمانە و پاکی سەرنووسەرایەتی',
    sovereigntyDesc: 'وردبینی لە ڕۆژنامەگەری نێوان کولتوورەکاندا پێویستی بە زیاتر لە وەرگێڕانی ڕووت هەیە؛ بەڵکو پێویستی بە خۆماڵیکردنی قووڵی چوارچێوەیی هەیە. ئاژانسی عێراقی - چینی ماتریکسی تایبەتی وەرگێڕان و خۆماڵیکردن بە زمانەکانی چینی مەندارین، عەرەبی، کوردی سۆرانی و ئینگلیزی بەڕێوە دەبات. سەرنووسەر و توێژەرەکانمان دڵنیایی دەدەن کە هەر کورتەیەکی سیاسی، پێڕستێکی بازاڕ و بروسکەیەکی دیپلۆماسی پارێزگاری لە وردبینی ڕەهای خۆی دەکات.',
    telemetryTitle: 'داتای ڕاستەقینەی نووسینگەکان و دۆخی تۆڕ',
    telemetrySubtitle: 'پێوانەکانی پەیوەندی مشەفەرکراوی کاتی ڕاستەقینە لە نووسینگە سەربەخۆیەکانی ئاژانسی عێراقی - چینی.',
    bureausLive: [
      { city: 'نووسینگەی پەکین', region: 'چین', status: 'پارێزراو / هاوکاتکراو', latency: '14ms', focus: 'کاروباری دیپلۆماسی و ئابووری گەورە' },
      { city: 'نووسینگەی بەغداد', region: 'عێراق', status: 'پارێزراو / هاوکاتکراو', latency: '28ms', focus: 'سیاسەتی یاسادانان و وزە' },
      { city: 'سەنتەری دەریایی بەسرە', region: 'عێراق', status: 'چالاک / بەندەری فاو', latency: '22ms', focus: 'لۆجیستی کۆنتێنەر و گومرگ' },
      { city: 'نووسینگەی هەولێر', region: 'هەرێمی کوردستان', status: 'چالاک / هاوکاتکراو', latency: '31ms', focus: 'بازرگانی هەرێمی و ئەکادیمیا' }
    ],
    pillarsTitle: 'شەش کۆڵەکەی دامەزراوەیی ئاژانسی سەربەخۆ',
    pillarsSubtitle: 'نەخشەسازی ستراتیژی بۆ پاڵپشتیکردنی زانیاری سێزمانە و بەڵگەنامەی فەرمی ڕۆژنامەوانی.',
    pillars: [
      { 
        title: 'زانیاری دیپلۆماسی و ئابووری گەورە', 
        desc: 'ڕاپۆرتی باوەڕپێکراو و بێلایەن لەسەر ڕێککەوتننامە دوولایەنەکان، بڕیارە وەزارییەکان و کۆڕبەندەکانی چین و عەرەب.' 
      },
      { 
        title: 'چاودێری بەندەری فاو و پڕۆژەی ڕێگای گەشەپێدان', 
        desc: 'چاودێری کاتی ڕاستەقینەی جووڵەی کۆنتێنەرەکان، وێستگەکانی کەشتیوانی و هێڵی ئاسنی بەستنەوەی عێراق بە ئەوروپا.' 
      },
      { 
        title: 'یەکلاییکردنەوەی دوولایەنە و پارەدانی دارایی', 
        desc: 'دەروازەیەکی پارەدانی سێزمانە بۆ ئاسانکاری لە مامەڵەکانی دینار و یوان بۆ بازرگانی و گەشتوگوزار.' 
      },
      { 
        title: 'ماتریکسی خۆماڵیکردنی زمانی سێزمانە', 
        desc: 'سیستەمی پێشکەوتووی زمانەوانی بۆ هاوتەکردنی دەستەواژە یاساییەکان لە نێوان مەندارین، عەرەبی، کوردی و ئینگلیزی.' 
      },
      { 
        title: 'ناوەندی بیرکردنەوە و گوتاری ئەکادیمی چین و عەرەب', 
        desc: 'توێژینەوەی ئەکادیمی باوەڕپێکراو، زەمالەی زانکۆیی و کۆڕبەندی هاوبەشی نێوان بەغداد، بەسرە و پەکین.' 
      },
      { 
        title: 'پێڕستی کۆمپانیا باوەڕپێکراوەکان و شیکاری وزە', 
        desc: 'پێوانەی ڕاستەوخۆی پاڵاوگەکانی نەوت، ئامارەکانی گومرگ و داتابەیسی وردبینیکراوی کۆمپانیا بازرگانییەکان.' 
      }
    ],
    manifestoTitle: 'بەیاننامەی ڕۆژنامەوانی سەربەخۆ',
    manifestoDesc: 'ئاژانسی عێراقی - چینی کار دەکات لەسەر بنەمایەکی ئەخلاقی توند کە پابەندە بە ڕاستی ڕه‌های زانیاری، وردبینی زمانەوانی سێزمانە، و قووڵی جیۆپۆلەتیکی. ئێمە هەواڵی هەڵخەڵەتێنەر ڕەت دەکەینەوە لە پێناو توێژینەوەی سەرەتایی باوەڕپێکراو.',
    milestoneTitle: 'قۆناغە ستراتیژییەکان',
    milestones: [
      { year: '٢٠٢١', title: 'بناغەی دیپلۆماسی', desc: 'پڕۆتۆکۆڵە دوولایەنەکان لە نێوان ئەنجومەنە ئەکادیمییەکان لە پەکین و بەغداد واژۆ کران بۆ ئاڵوگۆڕی فیکری کاتی ڕاستەقینە.' },
      { year: '٢٠٢٣', title: 'ڕێککەوتنی لۆجیستی بەسرە', desc: 'سەنتەری بەسرە چالاککرا بۆ دابینکردنی گومرگی بازرگانی کاتی ڕاستەقینە و ئامارەکانی گواستنەوەی دەریایی لە بەندەری فاو.' },
      { year: '٢٠٢٥', title: 'ماتڕیکسی وەرگێڕانی سێزمانە', desc: 'دەستپێکردنی ماتریکسی وەرگێڕانی سەربەخۆ بۆ خۆماڵیکردنی ڕاپۆرتەکان لە نێوان کوردی، عەرەبی، چینی و ئینگلیزی.' },
      { year: '٢٠٢٦', title: 'پەخشی ڕاستەوخۆ و دەروازەی یەکلاییکردنەوە', desc: 'دەستپێکردنی دەروازەی پەخشی ڕاستەوخۆ و دەروازەی یەکلاییکردنەوەی دارایی بۆ مامەڵەکانی دینار و یوان.' }
    ],
    councilTitle: 'ئەنجومەنی جێبەجێکردن و بەڕێوبەرانی نووسینگە هەرێمییەکان',
    council: [
      { 
        name: 'هونەر جەبار', 
        role: 'بەڕێوەبەری جێبەجێکار و سەرنووسەر', 
        bio: 'سەرکردەی ستراتیژی و سەرنووسەری ئاژانسی عێراقی - چینی، ڕێبەرایەتی نووسینگەکانی بەغداد، پەکین و بەسرە دەکات بۆ برەودان بە میدیای باوەڕپێکراو، توێژینەوەی جیۆپۆلەتیکی و شیکاری سەربەخۆ.' 
      },
      { 
        name: 'د. لی وێی مین (Dr. Li Weimin)', 
        role: 'بەڕێوەبەری نووسینگەی پەکین و پەیوەندییە ئەکادیمییەکان', 
        bio: 'توێژەری باڵای پەیوەندییە دیپلۆماسییەکان و ئابووری گەورەی چین و عەرەب، سەرپەرشتی چاوپێکەوتنە فەرمییەکان و ئاڵوگۆڕی ئەکادیمی دەکات لە ڕۆژهەڵاتی ئاسیا.' 
      },
      { 
        name: 'کاپتن تاریق مەنسوور', 
        role: 'بەڕێوەبەری سەنتەری دەریایی بەسرە و دیسکی بەندەری فاو', 
        bio: 'شارەزای لۆجیستی دەریایی و ژێرخان، سەرپەرشتی ئامارەکانی بەندەری فاو، پێوانەی گومرگ و پڕۆژەی ڕێگای گەشەپێدان دەکات.' 
      },
      { 
        name: 'د. ڕێزان بارزانی', 
        role: 'بەڕێوەبەری نووسینگەی هەولێر و ماتریکسی سێزمانە', 
        bio: 'زمانەوان و شیکەرەوەی سیاسەتی هەرێمی، سەرپەرشتیاری ماتریکسی خۆماڵیکردنی سۆرانی، عەرەبی و چینی و بازرگانی باکووری عێراق.' 
      }
    ],
    joinEditorialTitle: 'پەیوەندی بکە بە تۆڕی سەرنووسەرایەتی و ئەندامێتی دیپلۆماسی',
    joinEditorialSubtitle: 'بانگەواز بۆ پەیامنێرانی باڵا، ئابووریناسان، وەرگێڕان و توێژەرانی سیاسەت',
    joinEditorialDesc: 'ئاژانسی عێراقی - چینی دەرگای کراوەیە بۆ ڕۆژنامەنووسانی لێکۆڵەر، شیکەرەوەکانی بازرگانی دووقۆڵی و توێژەرانی ئەکادیمی بۆ بەهێزکردنی نووسینگەکانمان لە پەکین، بەغداد، بەسرە و هەولێر. ئەندامانی وەرگیراو باجی فەرمی ڕۆژنامەوانی دیجیتاڵی وەردەگرن و دەستڕاگەیشتنی ڕاستەوخۆیان دەبێت بە پلاتفۆرمی سەرەکی بەڕێوەبردن.',
    joinEditorialBtn: 'پێشکەشکردنی داواکاری و بەڵگەنامەی ڕۆژنامەوانی',
    joinEditorialHighlights: [
      { label: '٤ نووسینگەی سەربەخۆ', detail: 'پەکین • بەغداد • بەسرە • هەولێر' },
      { label: '٤ زمانی کارپێکراو', detail: 'مەندارین • عەرەبی • کوردی • ئینگلیزی' },
      { label: 'پێوەری وردبینیکراو', detail: 'باوەڕپێکراوی سەرچاوەی دیپلۆماسی سەرەتایی' },
      { label: 'هاوکاتکردنی ناوەندی', detail: 'بەستراوەتەوە بە ناوەندی بەڕێوەبردن' }
    ],
    contactTitle: 'پەیوەندی ڕاستەوخۆ لەگەڵ نووسینگە سەربەخۆکان',
    contactSubtitle: 'بروسکەیەکی تەلێکسی مشەفەرکراو بنێرە بۆ ئۆفیسە هەرێمییە دیاریکراوەکان.',
    formName: 'ناوی داواکار',
    formEmail: 'ئیمەیڵی فەرمی',
    formCompany: 'دەزگا یان کۆمپانیا',
    formBureau: 'نووسینگەی مەبەست',
    formMessage: 'دەقی بروسکەی تەلێکس',
    bureauList: [
      { id: 'baghdad', label: 'ژووری هەواڵ و سکرتاریەتی گشتی بەغداد' },
      { id: 'beijing', label: 'نووسینگەی پەکین و پەیوەندییە دیپلۆماسییەکان' },
      { id: 'basra', label: 'سەنتەری بەسرە و بەڕێوبەرایەتی لۆجیستی دەریایی' },
      { id: 'erbil', label: 'نووسینگەی هەولێر و دیسکی باکوور' }
    ],
    submit: 'ناردنی بروسکەی تەلێکس',
    submitting: 'پاراستنی پەیوەندی و مشەفەرکردن...',
    required: 'ئەم خانەیە پێویستە',
    successTitle: 'ناردنی تەلێکس پشتڕاستکرایەوە',
    successDesc: 'داواکارییە دیپلۆماسییەکەت مشەفەرکرا و بە سەلامەتی ڕەوانەی نووسینگەی دیاریکراو کرا. وەڵامی فەرمی دەنێردرێت بۆ ئیمەیڵە فەرمییەکەت.',
    telexNo: 'ژمارەی تەلێکسی نێردراو',
    routingBureau: 'نووسینگەی چارەسەرکردن',
    timestamp: 'کاتی تۆمارکردن (UTC)',
    reset: 'ناردنی بروسکەیەکی نوێ'
  }
};

interface ContactState {
  name: string;
  email: string;
  company: string;
  bureau: string;
  message: string;
}

export function About() {
  const { lang } = useParams<{ lang: Locale }>();
  const currentLang = ['en', 'ar', 'zh', 'ckb'].includes(lang || '') ? (lang as Locale) : 'en';
  const t = translations[currentLang];
  const m = t.milestones;
  const c = t.council;

  const [formData, setFormData] = useState<ContactState>({
    name: '',
    email: '',
    company: '',
    bureau: 'baghdad',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [telexRef, setTelexRef] = useState('');
  const [errors, setErrors] = useState<Partial<ContactState>>({});

  const isRtl = currentLang === 'ar' || currentLang === 'ckb';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactState> = {};
    if (!formData.name.trim()) newErrors.name = t.required;
    
    if (!formData.email.trim()) {
      newErrors.email = t.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.required;
    }

    if (!formData.company.trim()) newErrors.company = t.required;
    if (!formData.message.trim()) newErrors.message = t.required;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSending(true);

    const generatedRef = 'TLX-' + Math.floor(Math.random() * 90000 + 10000) + '-' + Array.from({length: 4}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase();

    try {
      const res = await fetch('/api/public/telexes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          bureau: formData.bureau,
          message: formData.message,
          telexRef: generatedRef
        })
      });

      if (!res.ok) {
        throw new Error('Telex transmission failed.');
      }

      setTelexRef(generatedRef);
      setSendSuccess(true);
    } catch (err: any) {
      console.error(err);
      setErrors(prev => ({ ...prev, message: err.message || 'System transmission error' }));
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      bureau: 'baghdad',
      message: ''
    });
    setSendSuccess(false);
    setTelexRef('');
  };

  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0: return <Compass className="w-5 h-5 text-brand-800 dark:text-brand-400" />;
      case 1: return <Anchor className="w-5 h-5 text-brand-800 dark:text-brand-400" />;
      case 2: return <Cpu className="w-5 h-5 text-brand-800 dark:text-brand-400" />;
      case 3: return <BookOpen className="w-5 h-5 text-brand-800 dark:text-brand-400" />;
      default: return <TrendingUp className="w-5 h-5 text-brand-800 dark:text-brand-400" />;
    }
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 shadow-xs border-x border-brand-800/10 dark:border-neutral-800 p-4 sm:p-6 md:p-8 text-start" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Title & Sovereign Subtitle */}
      <div className="border-b-4 border-brand-800 pb-4 mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-brand-800 dark:text-white uppercase">
          {t.title}
        </h2>
        <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-bold mt-2 uppercase tracking-widest">
          {t.subtitle}
        </p>
      </div>

      {/* Intro Essay block */}
      <div className="prose prose-neutral dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed text-neutral-800 dark:text-neutral-200 space-y-6">
        <p className="font-bold text-lg sm:text-xl leading-relaxed text-justify">{t.intro}</p>
        
        {/* Two Columns Grid for Project Importance & Future */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 sm:gap-8 mt-6 border-y border-neutral-200 dark:border-neutral-800 py-6 min-w-0">
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-black text-brand-800 dark:text-white uppercase flex items-center gap-2">
              <Building2 className="w-5 h-5 text-brand-800 dark:text-brand-400" />
              {t.importanceTitle}
            </h3>
            <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 text-justify leading-relaxed">
              {t.importanceDesc}
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-black text-brand-800 dark:text-white uppercase flex items-center gap-2">
              <Globe className="w-5 h-5 text-brand-800 dark:text-brand-400" />
              {t.futureTitle}
            </h3>
            <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 text-justify leading-relaxed">
              {t.futureDesc}
            </p>
          </div>
        </div>

        {/* Additional Descriptive Sections on Economic Corridors & Linguistic Sovereignty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-4 pb-4">
          <div className="space-y-3 bg-neutral-50 dark:bg-neutral-800/60 p-6 border border-neutral-200 dark:border-neutral-800 rounded-xs">
            <h3 className="text-lg font-black text-brand-800 dark:text-white uppercase flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-800 dark:text-brand-400" />
              {t.corridorTitle}
            </h3>
            <p className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300 text-justify leading-relaxed">
              {t.corridorDesc}
            </p>
          </div>
          <div className="space-y-3 bg-neutral-50 dark:bg-neutral-800/60 p-6 border border-neutral-200 dark:border-neutral-800 rounded-xs">
            <h3 className="text-lg font-black text-brand-800 dark:text-white uppercase flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-800 dark:text-brand-400" />
              {t.sovereigntyTitle}
            </h3>
            <p className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300 text-justify leading-relaxed">
              {t.sovereigntyDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Sovereign Journalistic Manifesto & Live Bureau Telemetry Section */}
      <div className="mt-8 sm:mt-12 bg-white dark:bg-neutral-800/80 border-2 border-brand-800 p-6 md:p-8 space-y-8 rounded-xs">
        <div>
          <h3 className="text-xl md:text-2xl font-black uppercase text-brand-800 dark:text-white border-b-2 border-brand-800 pb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-800 dark:text-brand-400" />
            {t.manifestoTitle}
          </h3>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-3 leading-relaxed text-justify ">
            {t.manifestoDesc}
          </p>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-brand-800 pb-2 mb-4 gap-2">
            <h3 className="text-lg md:text-xl font-black uppercase text-brand-800 dark:text-white flex items-center gap-2">
              <Radio className="w-5 h-5 text-brand-800 dark:text-brand-400 animate-pulse" />
              {t.telemetryTitle}
            </h3>
            <span className="text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 font-bold uppercase tracking-wider rounded-xs self-start sm:self-auto">
              {t.telemetrySubtitle}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.bureausLive.map((bureau, i) => (
              <div key={i} className="border border-neutral-200 dark:border-neutral-700 bg-paper-50 dark:bg-neutral-900 p-4 flex flex-col justify-between space-y-2 rounded-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-ink-900 dark:text-white">{bureau.city}</h4>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">{bureau.region}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 border border-emerald-200 dark:border-emerald-800 rounded-xs">
                    {bureau.status}
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 flex justify-between items-center text-xs font-mono">
                  <span className="text-neutral-600 dark:text-neutral-400">{bureau.focus}</span>
                  <span className="text-brand-800 dark:text-brand-400 font-bold flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    {bureau.latency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Institutional Pillars Section */}
      <div className="mt-12 sm:mt-16">
        <div className="border-b-2 border-brand-800 pb-3 mb-6">
          <h3 className="text-xl md:text-2xl font-black uppercase text-brand-800 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-800 dark:text-brand-400" />
            {t.pillarsTitle}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider mt-1">
            {t.pillarsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 min-w-0">
          {t.pillars.map((pillar, idx) => (
            <div 
              key={idx} 
              className={`p-5 bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 hover:border-brand-800 dark:hover:border-brand-600 transition-all duration-300 shadow-xs flex flex-col justify-between space-y-3 ${
                idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-brand-50 dark:bg-brand-950/40 rounded-xs">
                    {getPillarIcon(idx)}
                  </div>
                  <span className="text-xs font-black text-neutral-400 dark:text-neutral-500">
                    0{idx + 1}
                  </span>
                </div>
                <h4 className="font-black text-base text-brand-800 dark:text-white leading-snug">
                  {pillar.title}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed text-justify">
                  {pillar.desc}
                </p>
              </div>
              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-700/60 flex items-center gap-1.5 text-xs font-bold text-brand-800 dark:text-brand-400 uppercase tracking-wider">
                <FileCheck className="w-3.5 h-3.5" />
                Verified Institutional Protocol
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Milestones and Advisory Council */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 sm:mt-16 items-start">
        
        {/* Left Section: Interactive Timelines (Full RTL Alignment Support) */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-xl md:text-2xl font-black uppercase text-brand-800 dark:text-white border-b-2 border-brand-800 pb-2 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-800 dark:text-brand-400" />
            {t.milestoneTitle}
          </h3>
          
          <div className="relative ltr:border-l-2 rtl:border-r-2 border-neutral-200 dark:border-neutral-700 ltr:pl-6 rtl:pr-6 ltr:ml-3 rtl:mr-3 space-y-8">
            {m.map((milestone, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: isRtl ? 10 : -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {/* Node Bullet - positioned precisely according to writing direction */}
                <div className={`absolute ${isRtl ? '-right-[33px]' : '-left-[33px]'} top-1 bg-white dark:bg-neutral-900 border-2 border-brand-800 group-hover:bg-brand-800 w-3.5 h-3.5 transition-colors duration-200`} />
                
                <span className="text-xs font-black text-brand-800 dark:text-brand-400 uppercase tracking-wider block">
                  {milestone.year}
                </span>
                <h4 className="text-base md:text-lg font-bold text-ink-900 dark:text-white mt-0.5">
                  {milestone.title}
                </h4>
                <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 mt-1 text-justify leading-relaxed">
                  {milestone.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Section: Council List with 4 Regional Bureau Directors */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-xl md:text-2xl font-black uppercase text-brand-800 dark:text-white border-b-2 border-brand-800 pb-2 flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-800 dark:text-brand-400" />
            {t.councilTitle}
          </h3>

          <div className="space-y-4">
            {c.map((member, index) => (
              <div key={index} className="bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 p-4 shadow-sm hover:border-brand-800 transition-all duration-200 rounded-xs">
                <h4 className="font-bold text-base text-ink-900 dark:text-white flex items-center gap-1.5">
                  {member.name}
                </h4>
                <span className="text-xs font-bold text-brand-800 dark:text-brand-400 uppercase tracking-wider block mt-0.5">
                  {member.role}
                </span>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed text-justify">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Editorials / Join Us CTA: Enriched, Formalized & Synchronized */}
      <div className="mt-12 sm:mt-16 bg-brand-800 text-white p-6 sm:p-8 md:p-12 rounded-xs shadow-md border border-brand-800 relative overflow-hidden text-start">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Globe className="w-48 h-48 text-white" />
        </div>
        <div className="relative z-10 flex flex-col items-start max-w-3xl">
          <span className="text-xs uppercase font-bold tracking-[0.25em] bg-white/10 px-3 py-1 mb-3 text-white">
            {t.joinEditorialSubtitle}
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 text-white">
            {t.joinEditorialTitle}
          </h3>
          <p className="text-xs sm:text-sm md:text-base opacity-90 leading-relaxed mb-6 text-justify">
            {t.joinEditorialDesc}
          </p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-8 border-y border-white/20 py-4">
            {t.joinEditorialHighlights.map((hl, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-xs uppercase font-bold text-white/70">
                  {hl.label}
                </span>
                <span className="text-xs font-bold text-white mt-0.5">
                  {hl.detail}
                </span>
              </div>
            ))}
          </div>

          <Link 
            to={`/${currentLang}/join`} 
            className="bg-white text-brand-800 hover:bg-paper-50 px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-all shadow-sm flex items-center gap-3 cursor-pointer self-start"
          >
            <UserPlus className="w-4 h-4 text-brand-800" />
            <span>{t.joinEditorialBtn}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>
      </div>

      {/* Diplomatic Bureau Telex inquiry Form */}
      <div className="mt-12 sm:mt-16 bg-white dark:bg-neutral-800/80 border-2 border-brand-800 p-6 md:p-8 relative rounded-xs">
        <div className="border-b-2 border-double border-brand-800 pb-3 mb-6">
          <h3 className="text-xl md:text-2xl font-black uppercase text-brand-800 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-800 dark:text-brand-400" />
            {t.contactTitle}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" />
            {t.contactSubtitle}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!sendSuccess ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit} 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                    {t.formName} <span className="text-brand-800">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full text-xs border border-neutral-300 dark:border-neutral-700 bg-paper-50 dark:bg-neutral-900 text-ink-900 dark:text-white focus:border-brand-800 p-2.5 focus:outline-none focus:bg-white dark:focus:bg-neutral-900"
                  />
                  {errors.name && <p className="text-xs font-bold text-brand-800 mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                    {t.formEmail} <span className="text-brand-800">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full text-xs border border-neutral-300 dark:border-neutral-700 bg-paper-50 dark:bg-neutral-900 text-ink-900 dark:text-white focus:border-brand-800 p-2.5 focus:outline-none focus:bg-white dark:focus:bg-neutral-900"
                  />
                  {errors.email && <p className="text-xs font-bold text-brand-800 mt-1">{errors.email}</p>}
                </div>

                {/* Company / Affiliation */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                    {t.formCompany} <span className="text-brand-800">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full text-xs border border-neutral-300 dark:border-neutral-700 bg-paper-50 dark:bg-neutral-900 text-ink-900 dark:text-white focus:border-brand-800 p-2.5 focus:outline-none focus:bg-white dark:focus:bg-neutral-900"
                  />
                  {errors.company && <p className="text-xs font-bold text-brand-800 mt-1">{errors.company}</p>}
                </div>

                {/* Bureau Destination */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                    {t.formBureau}
                  </label>
                  <select 
                    name="bureau"
                    value={formData.bureau}
                    onChange={handleInputChange}
                    className="w-full text-xs border border-neutral-300 dark:border-neutral-700 bg-paper-50 dark:bg-neutral-900 text-ink-900 dark:text-white p-2.5 focus:outline-none focus:border-brand-800 appearance-none"
                  >
                    {t.bureauList.map(b => (
                      <option key={b.id} value={b.id}>{b.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col justify-between space-y-4">
                {/* Message Body */}
                <div className="flex-grow flex flex-col">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                    {t.formMessage} <span className="text-brand-800">*</span>
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full flex-grow text-xs border border-neutral-300 dark:border-neutral-700 bg-paper-50 dark:bg-neutral-900 text-ink-900 dark:text-white focus:border-brand-800 p-2.5 focus:outline-none focus:bg-white dark:focus:bg-neutral-900 resize-none"
                  />
                  {errors.message && <p className="text-xs font-bold text-brand-800 mt-1">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button 
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-brand-800 hover:bg-brand-700 text-white p-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  {isSending ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>{t.submitting}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{t.submit}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-4 space-y-4"
            >
              <CheckCircle className="w-12 h-12 text-brand-800 mx-auto animate-bounce" />
              <div>
                <h4 className="text-lg font-black text-brand-800 uppercase">
                  {t.successTitle}
                </h4>
                <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider mt-1">
                  {t.successDesc}
                </p>
              </div>

              {/* Telex receipt */}
              <div className="max-w-md mx-auto bg-neutral-50 dark:bg-neutral-800 border-2 border-dotted border-neutral-300 dark:border-neutral-700 p-4 text-xs space-y-2 text-start">
                <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-700 pb-1.5">
                  <span className="text-neutral-400 uppercase text-xs">{t.telexNo}</span>
                  <span className="font-bold text-brand-800">{telexRef}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-700 pb-1.5">
                  <span className="text-neutral-400 uppercase text-xs">{t.routingBureau}</span>
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">
                    {t.bureauList.find(b => b.id === formData.bureau)?.label || formData.bureau}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400 uppercase text-xs">{t.timestamp}</span>
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">{new Date().toUTCString()}</span>
                </div>
              </div>

              <button 
                onClick={handleReset}
                className="bg-brand-800 hover:bg-brand-700 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors duration-300 cursor-pointer shadow-xs"
              >
                {t.reset}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
