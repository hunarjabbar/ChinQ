const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let code = fs.readFileSync(filePath, 'utf-8');
    let original = code;
    
    code = code.replace(/font-serif /g, "");
    code = code.replace(/font-serif/g, "");
    code = code.replace(/text-\[9px\]/g, "text-xs");
    code = code.replace(/text-\[10px\]/g, "text-xs");
    code = code.replace(/font-mono /g, "");
    
    if (code !== original) {
      fs.writeFileSync(filePath, code);
      console.log(`Refined fonts in ${filePath}`);
    }
  }
});
