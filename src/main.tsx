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

import React, { Component, ErrorInfo, ReactNode } from 'react';

class RootErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("RootErrorBoundary caught a critical error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif', color: '#721c24', backgroundColor: '#f8d7da', margin: '24px', borderRadius: '8px', border: '1px solid #f5c6cb' }}>
          <h2 style={{ marginTop: 0, fontWeight: 'bold', fontSize: '1.25rem' }}>Critical Application Error</h2>
          <p style={{ marginBottom: '16px' }}>The application encountered an unexpected error during initialization and could not recover. Please check the browser console for detailed logs.</p>
          <pre style={{ backgroundColor: '#fff', padding: '12px', overflowX: 'auto', fontSize: '0.875rem', border: '1px solid #f5c6cb', borderRadius: '4px', marginBottom: '16px' }}>
            {this.state.error?.toString() || 'Unknown Error'}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{ padding: '8px 16px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Reload Application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>
);
