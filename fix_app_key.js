import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes("const location = useLocation();")) {
  code = code.replace(
    'import { Routes, Route, Navigate, Outlet, useParams } from \'react-router-dom\';',
    'import { Routes, Route, Navigate, Outlet, useParams, useLocation } from \'react-router-dom\';'
  );

  code = code.replace(
    'const { lang } = useParams<{ lang: string }>();',
    'const { lang } = useParams<{ lang: string }>();\n  const location = useLocation();'
  );
  
  code = code.replace(
    /<ErrorBoundary lang=\{lang\}>/g,
    '<ErrorBoundary key={location.key} lang={lang}>'
  );

  fs.writeFileSync('src/App.tsx', code);
}
