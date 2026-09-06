import fs from 'fs';
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = code.replace(/bg-\[#1A1A1A\]/g, 'bg-ink-900');
code = code.replace(/from-neutral-900 via-\[#1A1A1A\] to-neutral-900/g, 'from-ink-900 via-ink-900 to-ink-900');
code = code.replace(/divide-\[#1A1A1A\]\/10/g, 'divide-ink-900/10');
code = code.replace(/bg-neutral-800/g, 'bg-ink-900/80');
code = code.replace(/from-neutral-800 to-neutral-900/g, 'from-ink-900/80 to-ink-900');
code = code.replace(/bg-gray-200/g, 'bg-ink-900/10');
code = code.replace(/bg-gray-50/g, 'bg-paper-50');

fs.writeFileSync('src/pages/Home.tsx', code);
