import { useState } from 'react';
import type { CurrencyCode } from '@/types/domain';
import { detectCurrency } from '../lib/pricing';

const STORAGE_KEY = 'muf.currency';

function initialCurrency(): CurrencyCode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'USD' || saved === 'GBP' || saved === 'EUR') return saved;
  } catch {
    /* storage unavailable (private mode) */
  }
  return detectCurrency(typeof navigator === 'undefined' ? undefined : navigator.language);
}

/** Currency preference: browser locale by default, remembered once chosen. */
export function useCurrency() {
  const [currency, setCurrencyState] = useState<CurrencyCode>(initialCurrency);
  const setCurrency = (next: CurrencyCode) => {
    setCurrencyState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };
  return [currency, setCurrency] as const;
}
