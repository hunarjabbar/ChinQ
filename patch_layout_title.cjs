const fs = require('fs');
let content = fs.readFileSync('src/components/Layout.tsx', 'utf8');

content = content.replace(
  "export function Layout({ lang, children }: { lang: Locale; children: ReactNode }) {\n  const { t } = useI18n(lang);\n  const { siteName, systemMaintenance } = useSiteStore();",
  "import { useEffect } from 'react';\nexport function Layout({ lang, children }: { lang: Locale; children: ReactNode }) {\n  const { t } = useI18n(lang);\n  const { siteName, systemMaintenance } = useSiteStore();\n  useEffect(() => {\n    document.title = siteName;\n  }, [siteName]);"
);

fs.writeFileSync('src/components/Layout.tsx', content);
