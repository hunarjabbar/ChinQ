import fs from 'node:fs';
import path from 'node:path';

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  console.error('❌ dist directory not found after build!');
  process.exit(1);
}

// Mirror dist into build directory for deployment runners expecting build/
if (fs.existsSync('build')) {
  fs.rmSync('build', { recursive: true, force: true });
}
fs.cpSync('dist', 'build', { recursive: true });

// Move server.js into build/ if needed? No, keep it in root too.
if (fs.existsSync('server.js')) {
  fs.copyFileSync('server.js', 'build/server.js');
}

console.log('✅ Build artifacts successfully mirrored from dist/ to build/');
