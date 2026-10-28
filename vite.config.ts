import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv, type Plugin } from 'vite';
import { defineConfig } from 'vitest/config';

/**
 * Replaces %SITE_URL% in index.html with VITE_SITE_URL (trailing slash removed). Social crawlers don't run JS,
 * so og:image must be absolute in the static HTML. Unset, the URLs fall back to root-relative paths.
 */
function siteUrlInHtml(siteUrl: string): Plugin {
  return { name: 'site-url-in-html', transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl) };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = (env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '');

  return {
    plugins: [react(), tailwindcss(), siteUrlInHtml(siteUrl)],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
      css: false,
    },
  };
});
