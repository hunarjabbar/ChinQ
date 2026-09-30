import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { FirebaseProvider } from './components/FirebaseProvider';
import './index.css';
import '@flaticon/flaticon-uicons/css/all/all.css';

// Global error handlers to intercept dynamic bundle loading failures and trigger automatic recovery
if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => {
    const msg = e.message || '';
    if (
      msg.includes('Failed to fetch dynamically imported module') ||
      msg.includes('Importing a module script failed') ||
      msg.includes('error loading dynamically imported module')
    ) {
      console.warn('Recovering from dynamic chunk import failure, reloading...');
      window.location.reload();
    }
  }, true);

  window.addEventListener('unhandledrejection', (e) => {
    const reason = e.reason && e.reason.message ? e.reason.message : '';
    if (
      reason.includes('Failed to fetch dynamically imported module') ||
      reason.includes('Importing a module script failed') ||
      reason.includes('error loading dynamically imported module')
    ) {
      console.warn('Recovering from unhandled dynamic import rejection, reloading...');
      window.location.reload();
    }
  });
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </React.StrictMode>
  );
}
