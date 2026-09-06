import fs from 'fs';
let code = fs.readFileSync('src/components/VisaFlightSection.tsx', 'utf8');

code = code.replace(/bg-slate-950/g, 'bg-ink-900');
code = code.replace(/border-indigo-950\/60/g, 'border-brand-800');
code = code.replace(/from-indigo-900\/15/g, 'from-brand-800/20');
code = code.replace(/bg-amber-500\/10/g, 'bg-brand-800/20');
code = code.replace(/border-amber-500\/30/g, 'border-brand-800/40');
code = code.replace(/text-amber-400/g, 'text-brand-800');
code = code.replace(/bg-indigo-600/g, 'bg-brand-800');
code = code.replace(/hover:bg-indigo-500/g, 'hover:bg-brand-700');
code = code.replace(/bg-slate-900\/90/g, 'bg-paper-50');
code = code.replace(/border-slate-800/g, 'border-ink-900/10');
code = code.replace(/hover:border-amber-500\/50/g, 'hover:border-brand-800');
code = code.replace(/border-slate-700/g, 'border-ink-900');
code = code.replace(/text-indigo-400/g, 'text-brand-800');
code = code.replace(/text-slate-400/g, 'text-gray-400');
code = code.replace(/text-slate-500/g, 'text-gray-500');
code = code.replace(/text-slate-200/g, 'text-ink-900');
code = code.replace(/text-white group-hover:text-amber-400/g, 'text-ink-900 group-hover:text-brand-800');
code = code.replace(/text-emerald-400/g, 'text-ink-900');
code = code.replace(/shadow-indigo-600\/25/g, 'shadow-brand-800/20');
code = code.replace(/bg-gradient-to-t from-slate-950 via-slate-950\/20 to-transparent/g, 'bg-gradient-to-t from-ink-900 via-transparent to-transparent');

// But wait, it's bg-ink-900 in the parent, so text-white would be better.
// Ah, the card bg was bg-slate-900/90. I changed it to bg-paper-50.
// Then the text should be text-ink-900.
// Let's refine it.

fs.writeFileSync('src/components/VisaFlightSection.tsx', code);
