/**
 * Refreshes src/features/pricing/ratesSnapshot.ts, the exchange rates the site shows until /api/rates answers.
 *
 *   npm run rates:snapshot
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const res = await fetch('https://open.er-api.com/v6/latest/USD');
const body = await res.json();
if (body.result !== 'success') throw new Error(`Rates feed failed: ${JSON.stringify(body).slice(0, 200)}`);

const date = new Date(body.time_last_update_unix * 1000).toISOString().slice(0, 10);
const entries = Object.entries(body.rates).map(([code, rate]) => `  ${code}: ${+rate.toPrecision(6)},`);
const out = `/**
 * Fallback exchange rates (units per US dollar) from ExchangeRate-API, ${date}. Used until /api/rates answers, or if
 * it cannot. Refresh with: npm run rates:snapshot
 */
export const RATES_DATE = '${date}';

export const ratesSnapshot: Record<string, number> = {
${entries.join('\n')}
};
`;
const target = fileURLToPath(new URL('../../src/features/pricing/ratesSnapshot.ts', import.meta.url));
writeFileSync(target, out);
console.log(`Wrote ${entries.length} rates from ${date}`);
