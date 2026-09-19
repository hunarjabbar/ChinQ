const fs = require('fs');
let content = fs.readFileSync('src/pages/About.tsx', 'utf8');

const keys = {
  en: {
    joinEditorialTitle: 'Join the Editorial Network',
    joinEditorialDesc: 'We are expanding our trilingual editorial bureaus. Join our network of policy analysts, bilingual journalists, and researchers.',
    joinEditorialBtn: 'Apply for Editorial Partnership',
  },
  ar: {
    joinEditorialTitle: 'الانضمام إلى شبكة التحرير',
    joinEditorialDesc: 'نحن نقوم بتوسيع مكاتب التحرير ثلاثية اللغات الخاصة بنا. انضم إلى شبكتنا من محللي السياسات والصحفيين ثنائيي اللغة والباحثين.',
    joinEditorialBtn: 'التقدم بطلب للشراكة التحريرية',
  },
  zh: {
    joinEditorialTitle: '加入编辑网络',
    joinEditorialDesc: '我们正在扩展三语编辑分社。加入由政策分析师、双语记者和研究人员组成的网络。',
    joinEditorialBtn: '申请编辑合作伙伴关系',
  },
  ckb: {
    joinEditorialTitle: 'پەیوەندی بکە بە تۆڕی سەرنووسەرایەتییەکان',
    joinEditorialDesc: 'ئێمە خەریکی فراوانکردنی نووسینگە سێزمانەکانمانین. پەیوەندی بکە بە تۆڕی شیکەرەوەکانی سیاسەت، ڕۆژنامەنووسان و توێژەران.',
    joinEditorialBtn: 'پێشکەشکردنی داواکاری بۆ هاوبەشی سەرنووسەرایەتی',
  }
};

for (const lang of ['en', 'ar', 'zh', 'ckb']) {
  const insertStr = `    joinEditorialTitle: '${keys[lang].joinEditorialTitle}',\n    joinEditorialDesc: '${keys[lang].joinEditorialDesc}',\n    joinEditorialBtn: '${keys[lang].joinEditorialBtn}',\n    contactTitle:`;
  const regex = new RegExp(`    contactTitle:`, 'g');
  // We need to only replace the one inside the specific lang block.
  // A simpler way: just string replace the first occurrence after `lang: {`
  const langIndex = content.indexOf(`${lang}: {`);
  const contactIndex = content.indexOf('contactTitle:', langIndex);
  
  content = content.substring(0, contactIndex) + insertStr + content.substring(contactIndex + 'contactTitle:'.length);
}

fs.writeFileSync('src/pages/About.tsx', content);
