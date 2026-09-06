const fs = require('fs');
let content = fs.readFileSync('src/pages/JoinUs.tsx', 'utf8');

content = content.replace(
  "import { useI18n } from '../hooks/useI18n';",
  "import { useI18n } from '../hooks/useI18n';\nimport { useSiteStore } from '../store/useSiteStore';"
);

content = content.replace(
  "export function JoinUs() {\n  const { lang } = useParams<{ lang: Locale }>();\n  const { t } = useI18n(lang!);\n  const [isSubmitting, setIsSubmitting] = useState(false);",
  "export function JoinUs() {\n  const { lang } = useParams<{ lang: Locale }>();\n  const { t } = useI18n(lang!);\n  const { siteName } = useSiteStore();\n  const [isSubmitting, setIsSubmitting] = useState(false);"
);

content = content.replace(
  /Iraq-China Daily/g,
  "${siteName}"
);

// We need to fix the string interpolation in JSX
content = content.replace(
  /\{siteName\}/g,
  "{siteName}"
);

// Wait, the string replacements in JSON objects (translations) need to be variables or we can just replace them with siteName if we convert them to functions, or just leave translations hardcoded as they were because they are outside the component scope.
// Ah, `translations` is defined outside the component.
fs.writeFileSync('src/pages/JoinUs.tsx', content);
