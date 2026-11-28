import { handleGeo } from './handlers';

const geo = async (request: Request) =>
  (await handleGeo({ request, env: {} }).json()) as { country: string | null };

describe('GET /api/geo', () => {
  it("returns the visitor's country from Cloudflare", async () => {
    const request = Object.assign(new Request('https://x/api/geo'), { cf: { country: 'GB' } });
    expect(await geo(request)).toEqual({ country: 'GB' });
  });

  it('falls back to the CF-IPCountry header', async () => {
    expect(await geo(new Request('https://x/api/geo', { headers: { 'CF-IPCountry': 'ca' } }))).toEqual({
      country: 'CA',
    });
  });

  it('returns null when the country is unknown, and is never cached', async () => {
    expect(await geo(new Request('https://x/api/geo'))).toEqual({ country: null });
    expect(await geo(new Request('https://x/api/geo', { headers: { 'CF-IPCountry': 'XX' } }))).toEqual({
      country: null,
    });
    expect(
      handleGeo({ request: new Request('https://x/api/geo'), env: {} }).headers.get('Cache-Control'),
    ).toBe('no-store');
  });
});
