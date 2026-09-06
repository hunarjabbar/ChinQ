import fs from 'fs';
let file = 'src/pages/LivePortal.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/border-\[#ff4444\]\/30/g, 'border-brand-500/30');
code = code.replace(/bg-\[#ff4444\]/g, 'bg-brand-500');
code = code.replace(/shadow-\[0_0_8px_rgba\(255,68,68,0\.8\)\]/g, 'shadow-[0_0_8px_var(--color-brand-500)]');
code = code.replace(/shadow-\[0_4px_20px_rgba\(153,0,0,0\.3\)\]/g, 'shadow-[0_4px_20px_var(--color-brand-900)]');

fs.writeFileSync(file, code);

// MarketIndicesSection.tsx
file = 'src/components/MarketIndicesSection.tsx';
code = fs.readFileSync(file, 'utf8');
code = code.replace(/#f43f5e/g, 'var(--color-brand-500)');
fs.writeFileSync(file, code);

// SocialLinks.tsx - keep brand colors for social icons? 
// YouTube #FF0000, Sina Weibo #E6162D. These are literal brand colors for those platforms, so it's probably better to keep them.

console.log('Fixed hex refs');
