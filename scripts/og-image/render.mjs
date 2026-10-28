/**
 * Renders template.html to public/og.jpg (1200×630) with headless Chrome over the DevTools protocol.
 * Needs Chrome (override the path with CHROME_PATH) and network access for Google Fonts. No npm deps.
 *
 *   npm run og:render
 */
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const WIDTH = 1200;
const HEIGHT = 630;
const JPEG_QUALITY = 88;

const here = fileURLToPath(new URL('.', import.meta.url));
const template = pathToFileURL(join(here, 'template.html')).href;
const output = join(here, '../../public/og.jpg');
const chromePath = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

/** Resolves true only if both brand fonts actually loaded (an empty FontFace list means a fallback font). */
const FONTS_READY = `Promise.all([
  document.fonts.load('700 60px Ruwudu', 'معلم الفرقان'),
  document.fonts.load('800 66px "Plus Jakarta Sans"'),
]).then((sets) => document.fonts.ready.then(() => sets.every((faces) => faces.length > 0)))`;

const profile = mkdtempSync(join(tmpdir(), 'og-chrome-'));
const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=0',
  `--user-data-dir=${profile}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--hide-scrollbars',
  'about:blank',
]);

try {
  const { port } = new URL(await devToolsUrl(chrome));
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page = targets.find((target) => target.type === 'page');
  const cdp = await connect(page.webSocketDebuggerUrl);

  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await cdp.send('Page.enable');
  const loaded = cdp.once('Page.loadEventFired');
  await cdp.send('Page.navigate', { url: template });
  await loaded;

  const fonts = await cdp.send('Runtime.evaluate', { expression: FONTS_READY, awaitPromise: true });
  if (fonts.result.value !== true) throw new Error('Brand fonts did not load. Check access to Google Fonts.');

  const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: JPEG_QUALITY });
  writeFileSync(output, Buffer.from(data, 'base64'));
  cdp.close();
  console.log(`Wrote ${output}`);
} finally {
  if (chrome.exitCode === null) {
    const exited = new Promise((resolve) => chrome.once('exit', resolve));
    chrome.kill();
    await exited;
  }
  rmSync(profile, { recursive: true, force: true });
}

/** Reads the browser's DevTools WebSocket URL from Chrome's stderr. */
function devToolsUrl(child) {
  return new Promise((resolve, reject) => {
    let log = '';
    const timer = setTimeout(() => reject(new Error(`Chrome did not start:\n${log}`)), 15_000);
    child.on('error', (error) =>
      reject(new Error(`Could not launch Chrome at ${chromePath}: ${error.message}`)),
    );
    child.stderr.on('data', (chunk) => {
      log += chunk;
      const match = log.match(/DevTools listening on (ws:\/\/\S+)/);
      if (match) {
        clearTimeout(timer);
        resolve(match[1]);
      }
    });
  });
}

/** Minimal Chrome DevTools Protocol client: request/response by id, plus one-shot event listeners. */
function connect(url) {
  const ws = new WebSocket(url);
  const pending = new Map();
  const listeners = new Map();
  let nextId = 0;

  ws.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (message.id === undefined) {
      listeners.get(message.method)?.(message.params);
      listeners.delete(message.method);
      return;
    }
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  });

  const client = {
    send: (method, params = {}) =>
      new Promise((resolve, reject) => {
        const id = ++nextId;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      }),
    once: (method) => new Promise((resolve) => listeners.set(method, resolve)),
    close: () => ws.close(),
  };

  return new Promise((resolve, reject) => {
    ws.addEventListener('open', () => resolve(client));
    ws.addEventListener('error', () => reject(new Error(`Could not connect to ${url}`)));
  });
}
