const fs = require('fs');

let code = fs.readFileSync('src/components/WomenSection.tsx', 'utf-8');

// Filter Tabs update (Selectors 1 & 2)
code = code.replace(
  `className="flex flex-wrap items-center gap-1.5"`,
  `className="flex flex-wrap items-center gap-2 p-1 bg-white/50 dark:bg-neutral-800 rounded-md border border-gray-200/50 dark:border-neutral-700/50"`
);
// We need to do it globally for the filters since there are two
code = code.replace(
  `className="flex flex-wrap items-center gap-1.5"`,
  `className="flex flex-wrap items-center gap-2 p-1 bg-white/50 dark:bg-neutral-800 rounded-md border border-gray-200/50 dark:border-neutral-700/50"`
);

// Update Filter buttons
code = code.replace(
  /className={`px-2\.5 py-1 text-xs transition-colors rounded-xs cursor-pointer \${([^}]*)}`}/g,
  `className={\`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer shadow-sm \${$1}\`}`
);
code = code.replace(
  /className={`px-2\.5 py-1 text-xs transition-colors \${([^}]*)}`}/g,
  `className={\`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer shadow-sm \${$1}\`}`
);

// Badges update (Selectors 3, 4, 5, 6)
code = code.replace(
  `<span className="bg-brand-800 text-white text-xs px-2 py-0.5 font-bold uppercase tracking-wider border border-white/20">`,
  `<span className="bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs px-2.5 py-1 font-black uppercase tracking-widest border border-white/20 rounded-sm shadow-sm">`
);

code = code.replace(
  `<span className="bg-brand-800 text-white text-xs px-2 py-0.5 font-bold uppercase tracking-wider">`,
  `<span className="bg-brand-800 text-white text-[10px] sm:text-xs px-2.5 py-1 font-black uppercase tracking-widest rounded-sm shadow-sm">`
);

// Subtitle update (Selectors 7, 8, 9)
code = code.replace(
  `<p className="text-xs font-bold text-brand-800 dark:text-brand-400 line-clamp-1">`,
  `<p className="text-xs sm:text-sm font-black tracking-wide text-brand-800 dark:text-brand-400 uppercase line-clamp-1">`
);

fs.writeFileSync('src/components/WomenSection.tsx', code);
console.log("Updated WomenSection.tsx");
