import { initPwaInstallCapture } from './lib/pwaInstall';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure beforeinstallprompt is captured as early as possible before React mounts
initPwaInstallCapture();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.warn('SW registration failed:', error);
    });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
