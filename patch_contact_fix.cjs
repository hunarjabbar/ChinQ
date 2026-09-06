const fs = require('fs');
let content = fs.readFileSync('src/components/ContactUs.tsx', 'utf8');

content = content.replace(
  "import { Locale } from '../types';",
  "import { Locale } from '../types';\nimport { useSiteStore } from '../store/useSiteStore';"
);

content = content.replace(
  "export function ContactUs({ lang }: { lang: Locale }) {",
  "export function ContactUs({ lang }: { lang: Locale }) {\n  const { contactEmail } = useSiteStore();"
);

fs.writeFileSync('src/components/ContactUs.tsx', content);
