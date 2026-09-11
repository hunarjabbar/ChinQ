import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load .env if present
dotenv.config();

const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');

// Read existing config if present as fallback
let existing = {};
if (fs.existsSync(configPath)) {
  try {
    existing = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch {
    existing = {};
  }
}

const rawProjId = process.env.FIREBASE_PROJECT_ID || existing.projectId;
const projectId = (rawProjId && !rawProjId.includes('@')) ? rawProjId : 'engaged-tracer-h07pf';

const rawAppId = process.env.FIREBASE_APP_ID || existing.appId;
const appId = (rawAppId && !rawAppId.includes('@')) ? rawAppId : '1:488766988633:web:a0b286a82d90ac8ac2ac48';

const rawApiKey = process.env.FIREBASE_API_KEY || existing.apiKey;
const apiKey = (rawApiKey && !rawApiKey.includes('@')) ? rawApiKey : 'AIzaSyC9Hyow4Fg8oyYAVGaxUT08OhUdXqGpoHo';

function clean(val, fallback) {
  if (val && typeof val === 'string' && !val.includes('@')) return val;
  return fallback;
}

const config = {
  projectId,
  appId,
  apiKey,
  authDomain: clean(process.env.FIREBASE_AUTH_DOMAIN || existing.authDomain, `${projectId}.firebaseapp.com`),
  firestoreDatabaseId: clean(process.env.FIREBASE_FIRESTORE_DATABASE_ID || existing.firestoreDatabaseId, 'ai-studio-ica-7791f91c-ed43-489c-beef-0c2bdc487d41'),
  storageBucket: clean(process.env.FIREBASE_STORAGE_BUCKET || existing.storageBucket, `${projectId}.firebasestorage.app`),
  messagingSenderId: clean(process.env.FIREBASE_MESSAGING_SENDER_ID || existing.messagingSenderId, '488766988633'),
  measurementId: clean(process.env.FIREBASE_MEASUREMENT_ID || existing.measurementId, ''),
  oAuthClientId: clean(process.env.FIREBASE_OAUTH_CLIENT_ID || existing.oAuthClientId, '488766988633-fe9c8m199ulnr79d99fcha917a6nu3nt.apps.googleusercontent.com'),
  recaptchaSiteKey: clean(process.env.FIREBASE_RECAPTCHA_SITE_KEY || process.env.RECAPTCHA_SITE_KEY || existing.recaptchaSiteKey, '')
};

fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf8');
console.log(`[build] Generated firebase-applet-config.json for project: ${config.projectId}`);
