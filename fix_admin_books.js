import fs from 'fs';
let code = fs.readFileSync('src/pages/AdminBooks.tsx', 'utf8');

if (!code.includes("import { AdminLayout }")) {
  code = code.replace("import React,", "import { AdminLayout } from '../components/AdminLayout';\nimport React,");
}

code = code.replace(/return \(\s*<div className="max-w-7xl mx-auto p-4">/g, 'return (\n    <AdminLayout>\n      <div className="max-w-7xl mx-auto p-4">');
code = code.replace(/<\/div>\n\s*\);\n}/g, '</div>\n    </AdminLayout>\n  );\n}');

fs.writeFileSync('src/pages/AdminBooks.tsx', code);
