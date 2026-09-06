const fs = require('fs');
let content = fs.readFileSync('src/components/Layout.tsx', 'utf8');

content = content.replace(
  "import { useI18n } from '../hooks/useI18n';",
  "import { useI18n } from '../hooks/useI18n';\nimport { useSiteStore } from '../store/useSiteStore';\nimport { AlertTriangle } from 'lucide-react';"
);

content = content.replace(
  "export function Layout({ lang, children }: { lang: Locale; children: ReactNode }) {\n  const { t } = useI18n(lang);",
  "export function Layout({ lang, children }: { lang: Locale; children: ReactNode }) {\n  const { t } = useI18n(lang);\n  const { siteName, systemMaintenance } = useSiteStore();"
);

// Maintenance banner
const maintenanceBanner = `
      {systemMaintenance && (
        <div className="w-full bg-red-600 text-white text-center py-2 px-4 font-bold text-sm tracking-wide flex justify-center items-center gap-2">
          <AlertTriangle size={16} /> 
          System Maintenance: Some features may be temporarily read-only while enterprise upgrades are deployed across regional hubs.
        </div>
      )}
`;

content = content.replace(
  '<div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-sans flex flex-col items-center">',
  '<div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-sans flex flex-col items-center">' + maintenanceBanner
);

content = content.replace(
  /'Iraq-China Daily Media Group'/g,
  "`${siteName} Media Group`"
);
content = content.replace(
  /Iraq-China Daily Media Group/g,
  "${siteName} Media Group"
);

fs.writeFileSync('src/components/Layout.tsx', content);
