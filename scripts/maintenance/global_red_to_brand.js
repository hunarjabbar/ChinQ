import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let code = fs.readFileSync(filePath, 'utf8');
    
    // Replace all red and rose colors
    // Pattern: (bg|text|border|ring|shadow|from|via|to|accent)-(red|rose)-([0-9]{2,3})
    // Note: there are also arbitrary opacity variants like text-red-500/50 -> text-brand-500/50
    // So we match the numeric part and any trailing characters before a quote, space, etc.
    
    // Wait, simpler regex: \b(bg|text|border|ring|shadow|from|via|to|accent|fill|stroke)-(red|rose)-([0-9]{2,3})\b
    const regex = /\b(bg|text|border|ring|shadow|from|via|to|accent|fill|stroke|focus:ring|focus:border|hover:bg|hover:text|hover:border|group-hover:text)-(red|rose)-([0-9]{2,3})\b/g;
    
    let newCode = code.replace(regex, (match, p1, p2, p3) => {
      return `${p1}-brand-${p3}`;
    });
    
    // Also handle HEX colors if any hardcoded reds are there, but the user specifically mentioned "the global red colors", which likely means the Tailwind classes.
    // e.g. #990000 -> var(--color-brand-800) ... but they are probably using Tailwind classes mostly.
    
    if (newCode !== code) {
      fs.writeFileSync(filePath, newCode);
      console.log('Updated', filePath);
    }
  }
});
