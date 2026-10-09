# Rollback Procedure - ICA Ecosystem Baseline

## Overview
This document outlines the strict rollback procedure for restoring the Iraqi-Chinese Agency (ICA) public website and CISE Command Hub to the baseline state.

## 1. Environment & State Check
- **Baseline Timestamp**: `20261009-034200`
- **Data Layer**: Prisma ORM with SQLite (`/tmp/dev2.db` in production, `prisma/dev2.db` locally)
- **Runtime**: Node.js ESM with Express & Vite SPA

## 2. Restoration Steps
1. **Restore Codebase**:
   - Revert files to the baseline state captured in `/baseline/20261009-034200/code/`.
2. **Restore Database**:
   - Copy `prisma/dev2.db` to `/tmp/dev2.db` (production) or retain local SQLite file.
3. **Re-install & Build**:
   ```bash
   npm install --frozen-lockfile
   npm run build
   ```
4. **Start Service**:
   ```bash
   npm start
   ```

## 3. Verification Steps
- Verify HTTP health check: `curl http://0.0.0.0:3000/api/health`
- Verify 15 canonical sections in composition engine.
- Verify 0 TypeScript errors: `npm run lint`

## 4. Escalation Contact
- Lead Systems Architect & QA Director: `hunar.jabbar70@gmail.com`
