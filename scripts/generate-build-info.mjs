import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

let commit = 'unknown';
let branch = 'main';

try {
  commit = execSync('git rev-parse --short HEAD 2>/dev/null', { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim() || 'unknown';
  branch = execSync('git rev-parse --abbrev-ref HEAD 2>/dev/null', { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim() || 'main';
} catch (e) {
  // Git info not available in container environments
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
