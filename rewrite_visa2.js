import fs from 'fs';
let code = fs.readFileSync('src/components/VisaFlightSection.tsx', 'utf8');

code = code.replace(/text-base font-bold text-white group-hover:text-brand-800/g, 'text-base font-bold text-ink-900 group-hover:text-brand-800');
code = code.replace(/text-xs text-gray-400 line-clamp-2 leading-relaxed/g, 'text-xs text-gray-600 line-clamp-2 leading-relaxed');
// wait, the previous replace was text-white group-hover:text-amber-400 replaced with text-ink-900 group-hover:text-brand-800? 
// No, I did text-white group-hover:text-amber-400 -> text-ink-900 group-hover:text-brand-800 but maybe it didn't match.

fs.writeFileSync('src/components/VisaFlightSection.tsx', code);
