/**
 * Exchange rates for the pricing section: units of each currency per US dollar. Fetched from a free public feed
 * (ExchangeRate-API's open access endpoint, with the fawazahmed0 currency API as a backup), kept in Cloudflare's
 * edge cache for six hours, so visitors' browsers never call a third party and the feeds see a handful of calls a day.
 */

export interface RatesPayload {
  /** Day the rates were published, YYYY-MM-DD. */
  date: string;
  rates: Record<string, number>;
}

const EDGE_TTL_SECONDS = 6 * 60 * 60;
const CACHE_KEY = 'https://mualimulfurqan.internal/rates/usd';

/** Keeps only sane entries: three-letter codes with positive finite rates, and USD at exactly 1. */
export function cleanRates(raw: Record<string, unknown>): Record<string, number> | null {
  const rates: Record<string, number> = {};
  for (const [code, value] of Object.entries(raw)) {
    const key = code.toUpperCase();
    if (/^[A-Z]{3}$/.test(key) && typeof value === 'number' && Number.isFinite(value) && value > 0) {
      rates[key] = value;
    }
  }
  if (Object.keys(rates).length < 30) return null;
  rates.USD = 1;
  return rates;
}

type Source = { url: string; parse: (body: unknown) => RatesPayload | null };

const sources: Source[] = [
  {
    // https://www.exchangerate-api.com/docs/free (attribution shown under the currency menu)
    url: 'https://open.er-api.com/v6/latest/USD',
    parse: (body) => {
      const b = body as { result?: string; time_last_update_unix?: number; rates?: Record<string, unknown> };
      if (b.result !== 'success' || !b.rates) return null;
      const rates = cleanRates(b.rates);
      const date = new Date((b.time_last_update_unix ?? 0) * 1000).toISOString().slice(0, 10);
      return rates && { date, rates };
    },
  },
  {
    // https://github.com/fawazahmed0/exchange-api
    url: 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
    parse: (body) => {
      const b = body as { date?: string; usd?: Record<string, unknown> };
      const rates = b.usd ? cleanRates(b.usd) : null;
      return rates && { date: b.date ?? '', rates };
    },
  },
];

async function fromSources(fetcher: typeof fetch): Promise<RatesPayload | null> {
  for (const source of sources) {
    try {
      const res = await fetcher(source.url, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const payload = source.parse(await res.json());
      if (payload) return payload;
    } catch {
      /* try the next source */
    }
  }
  return null;
}

const edgeCache = () => (globalThis as { caches?: { default?: Cache } }).caches?.default;

/** GET /api/rates → { date, rates }. 502 if every feed is down (the site then keeps its bundled snapshot). */
export async function handleRates(fetcher: typeof fetch = fetch): Promise<Response> {
  const cache = edgeCache();
  const cached = await cache?.match(CACHE_KEY);
  if (cached) return cached;

  const payload = await fromSources(fetcher);
  if (!payload) {
    return new Response(JSON.stringify({ error: 'Rates unavailable' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }
  const response = new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': `public, max-age=3600, s-maxage=${EDGE_TTL_SECONDS}`,
    },
  });
  await cache?.put(CACHE_KEY, response.clone());
  return response;
}
