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
    
    let newCode = code.replace(/bg-brand-800 hover:bg-brand-800/g, 'bg-brand-800 hover:bg-brand-700');
    newCode = newCode.replace(/hover:bg-brand-800 hover:text-white text-gray-900/g, 'hover:bg-brand-800 hover:text-white text-gray-900');
    
    // There are cases where it's border-2 border-brand-800 hover:bg-brand-800
    newCode = newCode.replace(/border-brand-800 hover:bg-brand-800/g, 'border-brand-800 hover:bg-brand-700');

    if (newCode !== code) {
      fs.writeFileSync(filePath, newCode);
      console.log('Updated hover states in', filePath);
    }
  }
});
