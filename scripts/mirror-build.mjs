import fs from 'node:fs';
import path from 'node:path';

const distPath = path.join(process.cwd(), 'dist');
const buildPath = path.join(process.cwd(), 'build');

if (!fs.existsSync(distPath)) {
  console.error('❌ dist directory not found! Cannot mirror build.');
  process.exit(1);
}

// Clean or create build directory
if (fs.existsSync(buildPath)) {
  fs.rmSync(buildPath, { recursive: true, force: true });
}
fs.mkdirSync(buildPath, { recursive: true });

// Copy everything from dist to build recursively
fs.cpSync(distPath, buildPath, { recursive: true });

console.log('✅ Successfully mirrored dist build artifacts into build directory!');
