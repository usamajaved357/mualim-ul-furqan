import { useEffect, useState } from 'react';
import { currencyForCountry, guessCountry, usd, type LocalCurrency } from '../lib/pricing';
import { ratesSnapshot } from '../ratesSnapshot';

/** Older versions remembered the picked currency or country; every visit now starts from the visitor's location. */
function forgetOldChoice() {
  try {
    localStorage.removeItem('muf.currency');
    localStorage.removeItem('muf.country');
  } catch {
    /* storage unavailable (private mode) */
  }
}

function firstGuess(): string | undefined {
  try {
    return guessCountry(
      Intl.DateTimeFormat().resolvedOptions().timeZone,
      typeof navigator === 'undefined' ? undefined : navigator.language,
    );
  } catch {
    return undefined;
  }
}

async function getJson<T>(url: string, signal: AbortSignal): Promise<T | null> {
  const res = await fetch(url, { signal });
  return res.ok ? ((await res.json()) as T) : null;
}

/**
 * Which country's currency to show prices in, and today's rate for it.
 *
 * The country is the visitor's IP country (/api/geo, from Cloudflare), with a guess from their time zone until that
 * answers. A country picked from the menu applies until the page is reloaded; it is deliberately not remembered. Rates come from /api/rates (refreshed daily),
 * starting from the bundled snapshot so prices show at once. A currency without a rate falls back to US dollars.
 */
export function useLocalCurrency() {
  const [choice, setChoice] = useState<string | null>(null);
  const [detected, setDetected] = useState<string | undefined>(firstGuess);
  const [rates, setRates] = useState<Record<string, number>>(ratesSnapshot);

  useEffect(() => {
    forgetOldChoice();
    const controller = new AbortController();
    const ignore = () => {
      /* offline, blocked or local dev: keep the guess and the snapshot */
    };
    getJson<{ country: string | null }>('/api/geo', controller.signal)
      .then((data) => data?.country && setDetected(data.country))
      .catch(ignore);
    getJson<{ rates?: Record<string, number> }>('/api/rates', controller.signal)
      .then((data) => {
        if (data?.rates && data.rates.USD === 1) setRates(data.rates);
      })
      .catch(ignore);
    return () => controller.abort();
  }, []);

  const country = choice ?? detected;
  const code = currencyForCountry(country);
  const rate = rates[code];
  const currency: LocalCurrency = rate ? { code, rate } : usd;

  return { country, currency, rates, setCountry: setChoice, auto: !choice };
}
