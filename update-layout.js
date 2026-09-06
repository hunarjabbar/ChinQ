import fs from 'fs';
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

// Add import
code = code.replace(
  "import { SocialFooterShowcase, FloatingSocialDock } from './SocialLinks';",
  "import { SocialFooterShowcase, FloatingSocialDock } from './SocialLinks';\nimport { NewsletterSignup } from './NewsletterSignup';"
);

// Insert NewsletterSignup component
const newsletterBlock = `
        {/* Newsletter Signup */}
        <div className="w-full border-t border-gray-100 pt-10 pb-4">
          <NewsletterSignup lang={lang} />
        </div>
        
        {/* Global Social Media Syndicate Channels */}
`;

code = code.replace(
  "{/* Global Social Media Syndicate Channels */}",
  newsletterBlock
);

fs.writeFileSync('src/components/Layout.tsx', code);
