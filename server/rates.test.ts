import { cleanRates, handleRates } from './rates';

/** 40 made-up currencies (AAA, BAA, …) so a feed passes the size check. */
const many = Object.fromEntries(
  Array.from({ length: 40 }, (_, i) => [
    `${String.fromCharCode(65 + (i % 26))}${String.fromCharCode(65 + Math.floor(i / 26))}A`,
    i + 1,
  ]),
);

const reply = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

describe('cleanRates', () => {
  it('keeps valid codes, upper-cases them and pins USD to 1', () => {
    const rates = cleanRates({ ...many, gbp: 0.75, USD: 0.99, BAD: -1, NOPE: 2, X: 'a' })!;
    expect(rates.GBP).toBe(0.75);
    expect(rates.USD).toBe(1);
    expect(rates.BAD).toBeUndefined();
    expect(rates.NOPE).toBeUndefined();
  });

  it('rejects a feed with too few currencies', () => {
    expect(cleanRates({ GBP: 0.75 })).toBeNull();
  });
});

describe('GET /api/rates', () => {
  it('serves the main feed', async () => {
    const fetcher = vi.fn(async () =>
      reply({ result: 'success', time_last_update_unix: 1_795_824_151, rates: { ...many, PKR: 280 } }),
    );
    const res = await handleRates(fetcher as unknown as typeof fetch);
    const body = (await res.json()) as { date: string; rates: Record<string, number> };
    expect(res.status).toBe(200);
    expect(body.date).toBe('2026-11-28');
    expect(body.rates.PKR).toBe(280);
    expect(res.headers.get('Cache-Control')).toContain('max-age=3600');
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('falls back to the second feed', async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(reply({ result: 'error' }))
      .mockResolvedValueOnce(reply({ date: '2026-11-28', usd: { ...many, pkr: 281 } }));
    const body = (await (await handleRates(fetcher as unknown as typeof fetch)).json()) as {
      rates: Record<string, number>;
    };
    expect(body.rates.PKR).toBe(281);
  });

  it('answers 502 when every feed is down', async () => {
    const fetcher = vi.fn(async () => reply({}, 500));
    expect((await handleRates(fetcher as unknown as typeof fetch)).status).toBe(502);
  });
});
