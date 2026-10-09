export type RendererMode = 'legacy' | 'composition';

export function getRendererMode(): RendererMode {
  const mode = (typeof process !== 'undefined' && process.env?.PUBLIC_SITE_RENDERER) ||
               (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_PUBLIC_SITE_RENDERER);
  if (mode === 'composition') return 'composition';
  return 'legacy';
}

export function isCompositionMode(): boolean {
  return getRendererMode() === 'composition';
}

export function getRendererModeForRoute(routeKey: string): RendererMode {
  const envKey = routeKey.toUpperCase();
  const perRoute = (typeof process !== 'undefined' && process.env?.[`PUBLIC_SITE_RENDERER_${envKey}`]) ||
                   (typeof import.meta !== 'undefined' && (import.meta as any).env?.[`VITE_PUBLIC_SITE_RENDERER_${envKey}`]);
  if (perRoute === 'composition') return 'composition';
  if (perRoute === 'legacy') return 'legacy';
  return getRendererMode();
}
