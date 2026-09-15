import type { BeforeInstallPromptEvent } from '../types/pwa';

type PromptListener = (prompt: BeforeInstallPromptEvent | null) => void;

let deferredPrompt: BeforeInstallPromptEvent | null = null;
const listeners = new Set<PromptListener>();
let isInitialized = false;

function notifyListeners(): void {
  listeners.forEach((callback) => {
    try {
      callback(deferredPrompt);
    } catch (err) {
      console.warn('Error in beforeinstallprompt listener:', err);
    }
  });
}

/**
 * Initializes early capture for beforeinstallprompt and appinstalled events.
 * Attaches listeners synchronously before React mounts to ensure events aren't missed.
 * Safe to call multiple times (idempotent).
 */
export function initPwaInstallCapture(): void {
  if (typeof window === 'undefined' || isInitialized) return;
  isInitialized = true;

  window.addEventListener('beforeinstallprompt', (event: BeforeInstallPromptEvent) => {
    // Prevent default mini-infobar or browser auto-prompt
    event.preventDefault();
    deferredPrompt = event;
    notifyListeners();
  });

  window.addEventListener('appinstalled', () => {
    // App was successfully installed; invalidate prompt so it cannot be reused
    deferredPrompt = null;
    notifyListeners();
  });
}

// Auto-run on module evaluation if running in a browser environment
initPwaInstallCapture();

/**
 * Returns the currently cached BeforeInstallPromptEvent, if one has already fired.
 */
export function getDeferredPrompt(): BeforeInstallPromptEvent | null {
  return deferredPrompt;
}

/**
 * Clears the stored prompt (e.g. after prompt() has been called and resolved).
 */
export function clearDeferredPrompt(): void {
  deferredPrompt = null;
  notifyListeners();
}

/**
 * Subscribes to changes in the deferred install prompt.
 * Immediately invokes the callback if a prompt is already cached.
 * Returns an unsubscribe cleanup function.
 */
export function onBeforeInstallPrompt(callback: PromptListener): () => void {
  listeners.add(callback);
  if (deferredPrompt) {
    callback(deferredPrompt);
  }
  return () => {
    listeners.delete(callback);
  };
}
