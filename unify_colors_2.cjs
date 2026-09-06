const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      content = content.replace(/text-\[\#ff4444\]/g, 'text-red-500');
      content = content.replace(/text-\[\#ffbaba\]/g, 'text-red-200');
      content = content.replace(/text-\[\#FF3333\]/g, 'text-red-500');
      content = content.replace(/border-\[\#FF3333\]/g, 'border-red-500');
      
      content = content.replace(/text-\[\#3B3A39\]/g, 'text-ink-900');
      content = content.replace(/text-\[\#2B2A29\]/g, 'text-ink-900');
      
      content = content.replace(/text-\[\#555555\]/g, 'text-gray-500');
      
      content = content.replace(/text-\[\#B02A2A\]/g, 'text-brand-800');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log("Updated", fullPath);
      }
    }
  }
}

processDirectory(path.join(__dirname, 'src'));
