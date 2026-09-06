const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  "import { useSiteStore } from './store/useSiteStore';\n",
  ""
);

content = content.replace(
  "import { AdminMarketData } from './pages/AdminMarketData';",
  "import { AdminMarketData } from './pages/AdminMarketData';\nimport { useSiteStore } from './store/useSiteStore';"
);

const themeApplier = `
function ThemeApplier() {
  const { brandColor, inkColor, paperColor } = useSiteStore();
  
  useEffect(() => {
    const root = document.documentElement;
    if (brandColor) {
      root.style.setProperty('--color-brand-800', brandColor);
      root.style.setProperty('--color-brand-900', \`color-mix(in srgb, \${brandColor} 80%, black)\`);
    }
    if (inkColor) {
      root.style.setProperty('--color-ink-900', inkColor);
    }
    if (paperColor) {
      root.style.setProperty('--color-paper-50', paperColor);
    }
  }, [brandColor, inkColor, paperColor]);
  
  return null;
}
`;

content = content.replace(
  "const queryClient = new QueryClient();",
  "const queryClient = new QueryClient();\n" + themeApplier
);

content = content.replace(
  "<QueryClientProvider client={queryClient}>",
  "<QueryClientProvider client={queryClient}>\n      <ThemeApplier />"
);

fs.writeFileSync('src/App.tsx', content);
