import fs from 'fs';
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

if (!code.includes('IcaPlusSection')) {
  code = code.replace(
    "import { ChineseProductsShowcase } from '../components/ChineseProductsShowcase';",
    "import { ChineseProductsShowcase } from '../components/ChineseProductsShowcase';\nimport { IcaPlusSection } from '../components/IcaPlusSection';"
  );
  
  code = code.replace(
    "<BricsSection lang={lang as Locale} />",
    "<IcaPlusSection />\n        <BricsSection lang={lang as Locale} />"
  );
  
  fs.writeFileSync('src/pages/Home.tsx', code);
  console.log('Home.tsx patched');
}
