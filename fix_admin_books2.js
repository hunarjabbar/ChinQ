import fs from 'fs';
let code = fs.readFileSync('src/pages/AdminBooks.tsx', 'utf8');

if (!code.includes("import { AdminLayout }")) {
  code = "import { AdminLayout } from '../components/AdminLayout';\n" + code;
}

if (!code.includes("<AdminLayout>")) {
  code = code.replace(/return \(\s*<div className="max-w-7xl mx-auto p-4 md:p-8">/, 'return (\n    <AdminLayout>\n      <div className="max-w-7xl mx-auto p-4 md:p-8">');
}

fs.writeFileSync('src/pages/AdminBooks.tsx', code);
