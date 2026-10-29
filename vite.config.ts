import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import type { IncomingMessage } from 'node:http';
import { loadEnv, type Plugin } from 'vite';
import { defineConfig } from 'vitest/config';

/**
 * Replaces %SITE_URL% in index.html with VITE_SITE_URL (trailing slash removed). Social crawlers don't run JS,
 * so og:image must be absolute in the static HTML. Unset, the URLs fall back to root-relative paths.
 */
function siteUrlInHtml(siteUrl: string): Plugin {
  return { name: 'site-url-in-html', transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl) };
}

/**
 * Serves functions/api/*.ts at /api/* during `npm run dev`, the same way Cloudflare Pages Functions do in
 * production. Server secrets (GOOGLE_*, RESEND_API_KEY…) are read from .env and never reach the browser.
 */
function pagesFunctionsInDev(serverEnv: Record<string, string>): Plugin {
  const readBody = (req: IncomingMessage) =>
    new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      req.on('data', (c: Buffer) => chunks.push(c));
      req.on('end', () => resolve(Buffer.concat(chunks)));
      req.on('error', reject);
    });

  return {
    name: 'pages-functions-in-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api', async (req, res, next) => {
        const route = (req.url ?? '/').split('?')[0]!.replace(/^\/+|\/+$/g, '');
        if (!/^[a-z-]+$/.test(route)) return next();
        try {
          const mod = await server.ssrLoadModule(`/functions/api/${route}.ts`);
          const method = (req.method ?? 'GET').toUpperCase();
          const handler = mod[`onRequest${method[0]}${method.slice(1).toLowerCase()}`] ?? mod.onRequest;
          if (!handler) {
            res.statusCode = 405;
            return res.end();
          }
          const body = method === 'GET' || method === 'HEAD' ? undefined : await readBody(req);
          const request = new Request(`http://${req.headers.host}/api${req.url}`, {
            method,
            headers: req.headers as Record<string, string>,
            body,
          });
          const response: Response = await handler({ request, env: serverEnv });
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (error) {
          server.config.logger.error(String(error));
          next(error);
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const serverEnv = { BOOKING_DEMO: 'true', ...loadEnv(mode, process.cwd(), '') };
  const siteUrl = (env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '');

  return {
    plugins: [react(), tailwindcss(), siteUrlInHtml(siteUrl), pagesFunctionsInDev(serverEnv)],
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
