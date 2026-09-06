const fs = require('fs');
let content = fs.readFileSync('src/components/Header.tsx', 'utf8');

if (!content.includes("import { motion }")) {
  content = content.replace(
    "import { LanguageSwitcher } from './LanguageSwitcher';",
    "import { LanguageSwitcher } from './LanguageSwitcher';\nimport { motion } from 'motion/react';"
  );
  
  content = content.replace(
    /<header className="w-full bg-white border-b-4 border-double border-ink-900 sticky top-0 z-40 shadow-sm">/g,
    `<motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full bg-white border-b-4 border-double border-ink-900 sticky top-0 z-40 shadow-sm"
    >`
  );
  
  content = content.replace(
    /<\/header>/g,
    `</motion.header>`
  );
  
  fs.writeFileSync('src/components/Header.tsx', content);
  console.log("Patched Header.tsx with motion");
}
