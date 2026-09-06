import fs from 'fs';
let code = fs.readFileSync('src/pages/BooksPage.tsx', 'utf8');

code = code.replace(/<button\s+onClick=\{\(\) => handleDownload\(activeBook\.id\)\}[\s\S]*?<\/button>/m, `<button onClick={() => window.location.href = 'mailto:library@iraqchinadaily.media'} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-bold uppercase rounded-xs transition-colors cursor-pointer bg-brand-800 hover:bg-red-800 text-white"><Download className="w-4 h-4" /><span>Request Academic Copy</span></button>`);

fs.writeFileSync('src/pages/BooksPage.tsx', code);
