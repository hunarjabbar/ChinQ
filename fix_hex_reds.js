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
    
    let newCode = code.replace(/accent-\[#990000\]/g, 'accent-brand-800');
    newCode = newCode.replace(/from-\[#990000\]/g, 'from-brand-800');
    newCode = newCode.replace(/to-\[#770000\]/g, 'to-brand-900');
    newCode = newCode.replace(/bg-\[#800000\]/g, 'bg-brand-950'); // Found an arbitrary one earlier
    
    if (newCode !== code) {
      fs.writeFileSync(filePath, newCode);
      console.log('Updated hex in', filePath);
    }
  }
});
