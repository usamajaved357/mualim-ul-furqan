/**
 * One-time helper: signs the academy's Google account in and prints GOOGLE_REFRESH_TOKEN.
 *
 *   1. Google Cloud Console → enable "Google Calendar API".
 *   2. APIs & Services → Credentials → Create OAuth client ID → type "Desktop app".
 *   3. Put GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env, then run: npm run google:auth
 *   4. Sign in with the account whose calendar should receive bookings, then copy the printed token.
 */
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

const env = Object.fromEntries(
  (() => {
    try {
      return readFileSync('.env', 'utf8').split('\n');
    } catch {
      return [];
    }
  })()
    .map((line) => line.match(/^\s*([A-Z_]+)\s*=\s*"?([^"]*)"?\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2]]),
);
const clientId = process.env.GOOGLE_CLIENT_ID || env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || env.GOOGLE_CLIENT_SECRET;
if (!clientId || !clientSecret) {
  console.error('Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env first.');
  process.exit(1);
}

const PORT = 53682;
const redirectUri = `http://127.0.0.1:${PORT}/callback`;
const scopes = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.freebusy',
];
const authUrl =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes.join(' '),
  });

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', redirectUri);
  if (url.pathname !== '/callback') return res.writeHead(404).end();
  const code = url.searchParams.get('code');
  if (!code) return res.writeHead(400).end(`Sign-in failed: ${url.searchParams.get('error') ?? 'no code'}`);

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });
  const tokens = await tokenRes.json();
  if (!tokens.refresh_token) {
    res.writeHead(500).end('No refresh token returned. See the terminal.');
    console.error(tokens);
  } else {
    res
      .writeHead(200, { 'Content-Type': 'text/plain' })
      .end('Done. You can close this tab and return to the terminal.');
    console.log('\nAdd this to .env and to Cloudflare Pages (as a secret):\n');
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`);
  }
  server.close();
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('Open this URL, sign in with the academy Google account and allow calendar access:\n');
  console.log(authUrl + '\n');
});
