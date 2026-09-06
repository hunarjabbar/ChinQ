const fs = require('fs');
let content = fs.readFileSync('src/components/Header.tsx', 'utf8');

content = content.replace(
  "import { LanguageSwitcher } from './LanguageSwitcher';",
  "import { LanguageSwitcher } from './LanguageSwitcher';\nimport { useSiteStore } from '../store/useSiteStore';"
);

content = content.replace(
  "export function Header({ lang }: { lang: Locale }) {",
  "export function Header({ lang }: { lang: Locale }) {\n  const siteName = useSiteStore(state => state.siteName);"
);

content = content.replace(
  "IRAQ-CHINA DAILY",
  "{siteName.toUpperCase()}"
);

fs.writeFileSync('src/components/Header.tsx', content);
