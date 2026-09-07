const fs = require('fs');
let content = fs.readFileSync('src/components/ContactUs.tsx', 'utf8');

content = content.replace(
  "import { useState, FormEvent } from 'react';",
  "import { useState, FormEvent } from 'react';\nimport { useSiteStore } from '../store/useSiteStore';"
);

content = content.replace(
  "export function ContactUs({ lang }: { lang: Locale }) {\n  const { t } = useI18n(lang);",
  "export function ContactUs({ lang }: { lang: Locale }) {\n  const { t } = useI18n(lang);\n  const { contactEmail } = useSiteStore();"
);

content = content.replace(
  "<div>hq@iraqi-chineseagency.com</div>",
  "<div>{contactEmail}</div>"
);

fs.writeFileSync('src/components/ContactUs.tsx', content);
