/**
 * Thin wrapper around the Meta (Facebook) Pixel.
 * Every call is a safe no-op when no pixel ID is configured.
 */
type FbqArgs = [command: 'init' | 'track' | 'trackCustom', ...rest: unknown[]];
type Fbq = ((...args: FbqArgs) => void) & { queue?: unknown[]; loaded?: boolean; version?: string };

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export type TrackedEvent = 'PageView' | 'Lead' | 'Contact' | 'Schedule' | 'ViewContent';

let initialised = false;

export function initMetaPixel(pixelId: string): void {
  if (initialised || !pixelId || typeof window === 'undefined') return;
  initialised = true;

  const queue: unknown[] = [];
  const fbq: Fbq = Object.assign((...args: FbqArgs) => void queue.push(args), {
    queue,
    loaded: true,
    version: '2.0',
  });
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  fbq('init', pixelId);
  fbq('track', 'PageView');
}

export function track(event: TrackedEvent, params?: Record<string, string | number>): void {
  window.fbq?.('track', event, params);
}
