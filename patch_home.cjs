const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf8');

if (!content.includes("import { motion }")) {
  content = content.replace(
    "import { SubscriptionCard } from '../components/SubscriptionCard';",
    "import { SubscriptionCard } from '../components/SubscriptionCard';\nimport { motion } from 'motion/react';"
  );
  
  // Wrap main blocks with animation
  // Hero section is `<div className="col-span-12 md:col-span-8 space-y-6">`
  content = content.replace(
    /<div className="col-span-12 md:col-span-8 space-y-6">/g,
    `<motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="col-span-12 md:col-span-8 space-y-6"
    >`
  );
  content = content.replace(
    /<\/div>\s*\{\/\* Right Column - Desktop Only \*\/\}/g,
    `</motion.div>\n\n        {/* Right Column - Desktop Only */}`
  );
  
  // Wrap right column too
  content = content.replace(
    /<div className="hidden md:block md:col-span-4 space-y-6">/g,
    `<motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="hidden md:block md:col-span-4 space-y-6"
    >`
  );
  content = content.replace(
    /<\/div>\s*<\/div>\s*\{\/\* Invest In Iraq \*\/\}/g,
    `</motion.div>\n      </div>\n\n      {/* Invest In Iraq */}`
  );

  // Wrap section blocks
  const sections = ['Invest In Iraq', 'Trending & Strategic Studies', 'Tourism', 'Women', 'Recommended Books', 'Contact'];
  sections.forEach((sec, idx) => {
    // This part is a bit tricky with regex, we can just replace the direct parent div of sections
    // or just leave it since the whole page load animation is often enough for a premium feel.
  });

  fs.writeFileSync('src/pages/Home.tsx', content);
  console.log("Patched Home.tsx");
}
