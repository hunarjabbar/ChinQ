const fs = require('fs');
let content = fs.readFileSync('src/components/Layout.tsx', 'utf8');

if (!content.includes("import { motion }")) {
  content = content.replace(
    "import { useEffect } from 'react';",
    "import { useEffect } from 'react';\nimport { motion } from 'motion/react';"
  );
  fs.writeFileSync('src/components/Layout.tsx', content);
  console.log("Added motion import to Layout.tsx");
}
