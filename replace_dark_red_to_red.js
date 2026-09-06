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
    
    const replacements = [
      [/bg-brand-900/g, 'bg-brand-800'],
      [/from-brand-900/g, 'from-brand-800'],
      [/via-brand-900/g, 'via-brand-800'],
      [/to-brand-900/g, 'to-brand-800'],
      [/border-brand-900/g, 'border-brand-800']
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
