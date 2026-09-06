const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

if (!cssContent.includes('--color-brand-800')) {
  const themeBlock = `
  --color-brand-50: #fcf1f1;
  --color-brand-100: #fae1e1;
  --color-brand-200: #f5c8c8;
  --color-brand-300: #eea3a3;
  --color-brand-400: #e37474;
  --color-brand-500: #d64848;
  --color-brand-600: #c22f2f;
  --color-brand-700: #a32222;
  --color-brand-800: #990000;
  --color-brand-900: #7a0000;
  --color-brand-950: #420b0b;

  --color-ink-900: #1A1A1A;
  --color-paper-50: #FAFAFA;
`;
  cssContent = cssContent.replace('@theme {', '@theme {' + themeBlock);
  fs.writeFileSync(cssPath, cssContent);
  console.log("Updated index.css");
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      content = content.replace(/text-\[\#990000\]/g, 'text-brand-800');
      content = content.replace(/bg-\[\#990000\]/g, 'bg-brand-800');
      content = content.replace(/border-\[\#990000\]/g, 'border-brand-800');
      content = content.replace(/ring-\[\#990000\]/g, 'ring-brand-800');
      content = content.replace(/outline-\[\#990000\]/g, 'outline-brand-800');
      content = content.replace(/fill-\[\#990000\]/g, 'fill-brand-800');
      
      content = content.replace(/hover:bg-\[\#7a0000\]/g, 'hover:bg-brand-900');
      content = content.replace(/hover:text-\[\#7a0000\]/g, 'hover:text-brand-900');
      
      content = content.replace(/text-\[\#1A1A1A\]/g, 'text-ink-900');
      content = content.replace(/bg-\[\#1A1A1A\]/g, 'bg-ink-900');
      content = content.replace(/border-\[\#1A1A1A\]/g, 'border-ink-900');
      
      content = content.replace(/bg-\[\#FAFAFA\]/g, 'bg-paper-50');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log("Updated", fullPath);
      }
    }
  }
}

processDirectory(path.join(__dirname, 'src'));
