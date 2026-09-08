const fs = require('fs');

const fileNames = ['src/pages/Home.tsx'];

fileNames.forEach(file => {
  if (fs.existsSync(file)) {
    let code = fs.readFileSync(file, 'utf-8');
    
    // Replace font-serif with font-sans (or just remove if it makes sense)
    // Actually, tailwind default is sans. Let's replace "font-serif" with ""
    code = code.replace(/font-serif /g, "");
    code = code.replace(/font-serif/g, "");
    
    // Replace small illegible fonts
    code = code.replace(/text-\[9px\]/g, "text-xs");
    code = code.replace(/text-\[10px\]/g, "text-xs");
    
    // Replace font-mono with font-sans
    code = code.replace(/font-mono /g, "");
    
    fs.writeFileSync(file, code);
    console.log(`Refined fonts in ${file}`);
  }
});
