import fs from 'fs';
import path from 'path';

console.log('--- CSS Constraints & LTR/RTL Logical Properties Linter ---');

const cssPath = path.resolve('src/index.css');
if (!fs.existsSync(cssPath)) {
  console.error(`CSS file not found at ${cssPath}`);
  process.exit(1);
}

const css = fs.readFileSync(cssPath, 'utf-8');

let errors = 0;
let warnings = 0;

// Rule 1: No overflow: hidden on html, body, or main
const forbiddenRootOverflow = /(?:html|body|main)\s*\{[^}]*overflow(?:-x|-y)?\s*:\s*hidden/i;
if (forbiddenRootOverflow.test(css)) {
  console.error('[ERROR] Rule 4.3.1: Found "overflow: hidden" on html, body, or main selector. This suppresses viewport scrolling.');
  errors++;
} else {
  console.log('[PASS] Rule 4.3.1: No "overflow: hidden" on root html/body/main elements.');
}

// Rule 2: Root wrapper max-width below 100%
const rootWrapperBadMaxWidth = /#root\s*\{[^}]*max-width\s*:\s*(?!100%)[^;]+;/i;
if (rootWrapperBadMaxWidth.test(css)) {
  console.error('[ERROR] Rule 4.3.2: Root wrapper (#root) has max-width below 100%.');
  errors++;
} else {
  console.log('[PASS] Rule 4.3.2: Root wrapper (#root) max-width is compliant (100% or fluid).');
}

// Rule 3: 100vh warning (suggesting 100dvh)
const vhMatches = (css.match(/100vh/g) || []).length;
if (vhMatches > 0) {
  console.warn(`[WARN] Rule 4.3.3: Found ${vhMatches} instances of "100vh". Consider replacing with "100dvh" to account for dynamic mobile browser chrome.`);
  warnings++;
} else {
  console.log('[PASS] Rule 4.3.3: No rigid 100vh usages detected.');
}

// Rule 4: Directional properties flagging
const physicalProps = ['margin-left', 'margin-right', 'padding-left', 'padding-right', 'border-left', 'border-right'];
let foundPhysicalProps = 0;
physicalProps.forEach(prop => {
  const regex = new RegExp(`\\b${prop}\\s*:`, 'g');
  const count = (css.match(regex) || []).length;
  if (count > 0) {
    foundPhysicalProps += count;
  }
});

if (foundPhysicalProps > 0) {
  console.log(`[INFO] Rule 4.3.4: Found ${foundPhysicalProps} physical direction properties. Note: Logical properties (margin-inline, padding-inline, inset-inline) should be preferred for bidirectional layouts.`);
} else {
  console.log('[PASS] Rule 4.3.4: All properties adhere to bidirectional logical standards.');
}

console.log(`\nLinter completed with ${errors} error(s) and ${warnings} warning(s).`);

if (errors > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
