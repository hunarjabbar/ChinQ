const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const regex = /import\s+(?:\{\s*([a-zA-Z0-9_]+)\s*\}|([a-zA-Z0-9_]+))\s+from\s+['"]([^'"]+)['"];/g;

let lazyDeclarations = '';
let newContent = content;
let toReplace = [];

let match;
while ((match = regex.exec(content)) !== null) {
  const isNamed = !!match[1];
  const name = match[1] || match[2];
  const path = match[3];

  if (path.startsWith('./pages/')) {
    toReplace.push({
      original: match[0],
      name,
      path,
      isNamed
    });
  }
}

for (const rep of toReplace) {
  newContent = newContent.replace(rep.original + '\n', '');
  if (rep.isNamed) {
    lazyDeclarations += `const ${rep.name} = lazy(() => import('${rep.path}').then(m => ({ default: m.${rep.name} })));\n`;
  } else {
    lazyDeclarations += `const ${rep.name} = lazy(() => import('${rep.path}'));\n`;
  }
}

// Ensure Suspense and lazy are imported
if (!newContent.includes('import { Suspense, lazy } from \'react\';') && !newContent.includes('lazy } from \'react\'')) {
  newContent = newContent.replace("import { useEffect } from 'react';", "import { useEffect, Suspense, lazy } from 'react';");
}

// Insert lazy declarations after imports
newContent = newContent.replace(/const queryClient = new QueryClient\(\);/, `const queryClient = new QueryClient();\n\n${lazyDeclarations}`);

// Wrap RouterProvider with Suspense
newContent = newContent.replace('<RouterProvider router={router} />', '<Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="w-12 h-12 border-4 border-brand-800 border-t-transparent rounded-full animate-spin"></div></div>}>\n          <RouterProvider router={router} />\n        </Suspense>');

fs.writeFileSync('src/App.tsx', newContent);
