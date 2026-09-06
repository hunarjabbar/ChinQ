import fs from 'fs';
let code = fs.readFileSync('src/components/RecommendedBooksSection.tsx', 'utf8');

code = code.replace(/text-red-400/g, 'text-brand-300');
code = code.replace(/bg-red-800/g, 'bg-brand-900');
code = code.replace(/hover:bg-red-800/g, 'hover:bg-brand-900');
code = code.replace(/bg-neutral-900/g, 'bg-ink-900');
code = code.replace(/bg-neutral-800/g, 'bg-white/10');
code = code.replace(/border-neutral-800/g, 'border-white/10');
code = code.replace(/bg-neutral-950/g, 'bg-black/50');
code = code.replace(/bg-black\/90/g, 'bg-ink-900');
code = code.replace(/text-amber-300/g, 'text-brand-300');
code = code.replace(/border-amber-300\/20/g, 'border-brand-300/20');
code = code.replace(/bg-emerald-700/g, 'bg-green-700');
code = code.replace(/text-amber-600/g, 'text-brand-800');

fs.writeFileSync('src/components/RecommendedBooksSection.tsx', code);
