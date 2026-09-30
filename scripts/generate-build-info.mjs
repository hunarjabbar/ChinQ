import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

let commit = 'unknown';
let branch = 'main';

try {
  commit = execSync('git rev-parse --short HEAD', { stdio: ['pipe', 'pipe', 'pipe'] }).toString().trim();
  branch = execSync('git rev-parse --abbrev-ref HEAD', { stdio: ['pipe', 'pipe', 'pipe'] }).toString().trim();
} catch (e) {
  console.log('fatal: not a git repository (or any of the parent directories): .git');
  console.log('Git info not available for build-info.json');
}

const buildInfo = {
  version: '0.0.0',
  commit,
  branch,
  builtAt: new Date().toISOString(),
  environment: process.env.NODE_ENV || 'production'
};

fs.writeFileSync('build-info.json', JSON.stringify(buildInfo, null, 2));
if (fs.existsSync('public')) {
  fs.writeFileSync('public/build-info.json', JSON.stringify(buildInfo, null, 2));
}
if (fs.existsSync('dist')) {
  fs.writeFileSync('dist/build-info.json', JSON.stringify(buildInfo, null, 2));
}
if (fs.existsSync('build')) {
  fs.writeFileSync('build/build-info.json', JSON.stringify(buildInfo, null, 2));
}

console.log('✅ Generated build-info.json');
