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
    
    // Specifically target backgrounds and borders that are ink-900
    // The user wants to replace "black color" in them to the "red color palette" (brand color).
    // Let's replace bg-ink-900 with bg-brand-900
    // and from-ink-900 to from-brand-900, etc.
    let changed = false;
    
    const replacements = [
      [/bg-ink-900/g, 'bg-brand-900'],
      [/from-ink-900/g, 'from-brand-900'],
      [/via-ink-900/g, 'via-brand-900'],
      [/to-ink-900/g, 'to-brand-900'],
      [/border-ink-900/g, 'border-brand-900']
    ];

    let newCode = code;
    replacements.forEach(([regex, replacement]) => {
        newCode = newCode.replace(regex, replacement);
    });

    if (newCode !== code) {
      fs.writeFileSync(filePath, newCode);
      console.log('Updated', filePath);
    }
  }
});
