import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  'function LangWrapper() {\n  const { lang } = useParams<{ lang: string }>();',
  'function LangWrapper() {\n  const { lang } = useParams<{ lang: string }>();\n  const location = useLocation();'
);

fs.writeFileSync('src/App.tsx', code);
