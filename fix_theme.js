import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

const replacement = `
    if (brandColor) {
      root.style.setProperty('--color-brand-800', brandColor);
      root.style.setProperty('--color-brand-900', \`color-mix(in srgb, \${brandColor} 80%, black)\`);
      root.style.setProperty('--color-brand-700', \`color-mix(in srgb, \${brandColor} 85%, white)\`);
      root.style.setProperty('--color-brand-500', \`color-mix(in srgb, \${brandColor} 60%, white)\`);
      root.style.setProperty('--color-brand-400', \`color-mix(in srgb, \${brandColor} 45%, white)\`);
      root.style.setProperty('--color-brand-300', \`color-mix(in srgb, \${brandColor} 30%, white)\`);
      root.style.setProperty('--color-brand-100', \`color-mix(in srgb, \${brandColor} 10%, white)\`);
      root.style.setProperty('--color-brand-50', \`color-mix(in srgb, \${brandColor} 5%, white)\`);
    }
`;

code = code.replace(
  /if \(brandColor\) \{[\s\S]*?root\.style\.setProperty\('--color-brand-900', `color-mix[^`]*`\);\s*\}/,
  replacement.trim()
);

fs.writeFileSync('src/App.tsx', code);
