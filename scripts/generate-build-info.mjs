import { execSync } from 'child_process';
import fs from 'fs';

function generateBuildInfo() {
  let commitHash = 'unknown';
  let commitShortHash = 'unknown';
  let commitMessage = 'unknown';
  let branch = 'main';

  try {
    commitHash = execSync('git rev-parse HEAD').toString().trim();
    commitShortHash = execSync('git rev-parse --short HEAD').toString().trim();
    commitMessage = execSync('git log -1 --format=%s').toString().trim();
    branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  } catch (e) {
    console.warn('Git info not available for build-info.json');
  }

  const info = {
    commitHash,
    commitShortHash,
    commitMessage,
    commitTimestamp: new Date().toISOString(),
    buildTimestamp: new Date().toISOString(),
    buildId: 'ICA-SUMMIT-2026-v1.0',
    branch,
    nodeVersion: process.version
  };

  fs.writeFileSync('build-info.json', JSON.stringify(info, null, 2));
  console.log('✅ Generated build-info.json');
}

generateBuildInfo();
