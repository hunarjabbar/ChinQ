const fs = require('fs');
let content = fs.readFileSync('src/components/Layout.tsx', 'utf8');

if (!content.includes("import { motion }")) {
  content = content.replace(
    "import { useEffect } from 'react';",
    "import { useEffect } from 'react';\nimport { motion } from 'motion/react';"
  );
  
  // The children are rendered directly:
  // <MarketTicker lang={lang} />
  // {children}
  // <EnterpriseSidebar lang={lang} />
  
  content = content.replace(
    "{children}",
    `<motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full flex flex-col items-center flex-grow"
      >
        {children}
      </motion.main>`
  );

  fs.writeFileSync('src/components/Layout.tsx', content);
  console.log("Patched Layout.tsx with motion");
}
