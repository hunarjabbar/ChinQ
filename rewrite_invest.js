import fs from 'fs';
let code = fs.readFileSync('src/components/InvestIraq.tsx', 'utf8');

code = code.replace(/text-gray-300/g, 'text-gray-300');
code = code.replace(/bg-ink-900 p-6 border border-gray-800/g, 'bg-white/5 p-6 border border-white/10');
code = code.replace(/text-gray-500/g, 'text-gray-400');

fs.writeFileSync('src/components/InvestIraq.tsx', code);
