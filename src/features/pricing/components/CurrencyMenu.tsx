import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import countryToCurrency from 'country-to-currency';
import { Icon } from '@/components/ui';
import { cn } from '@/lib/cn';
import { currencyForCountry } from '../lib/pricing';

interface CountryOption {
  code: string;
  name: string;
  currency: string;
  currencyName: string;
  symbol: string;
}

/** Shown first, after the visitor's own country: where most families are. */
const POPULAR = ['US', 'GB', 'CA', 'AU', 'IE', 'DE', 'AE', 'SA'];

function displayNames(type: 'region' | 'currency') {
  try {
    return new Intl.DisplayNames(['en'], { type });
  } catch {
    return null;
  }
}

function symbolOf(currency: string): string {
  try {
    const part = new Intl.NumberFormat('en', { style: 'currency', currency, currencyDisplay: 'narrowSymbol' })
      .formatToParts(0)
      .find((p) => p.type === 'currency');
    return part?.value ?? currency;
  } catch {
    return currency;
  }
}

/** Every country with a currency we have a rate for, by English name. */
function buildOptions(rates: Record<string, number>): CountryOption[] {
  const regions = displayNames('region');
  const currencies = displayNames('currency');
  return Object.keys(countryToCurrency)
    .map((code) => {
      const currency = currencyForCountry(code);
      const name = regions?.of(code) ?? code;
      return {
        code,
        name,
        currency,
        currencyName: currencies?.of(currency) ?? currency,
        symbol: symbolOf(currency),
      };
    })
    .filter((o) => rates[o.currency] && o.name !== o.code && !/unknown/i.test(o.name))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function Flag({ code, className }: { code: string; className?: string }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      alt=""
      width={20}
      height={15}
      loading="lazy"
      className={cn(
        'h-[15px] w-5 shrink-0 rounded-[3px] object-cover shadow-[0_0_0_1px_rgb(15_31_26/0.12)]',
        className,
      )}
    />
  );
}

/**
 * Searchable country menu for the pricing section: picking a country shows prices in its currency. Opens on the
 * visitor's own country; type a country, currency name or code ("pound", "PKR") to filter.
 */
export function CurrencyMenu({
  country,
  currency,
  rates,
  onSelect,
}: {
  country: string | undefined;
  currency: string;
  rates: Record<string, number>;
  onSelect: (country: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const id = useId();

  const options = useMemo(() => buildOptions(rates), [rates]);
  const current = options.find((o) => o.code === country);

  /** Search results; with no search, the visitor's country and popular ones first, then everyone A–Z. */
  const { shown, divider } = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q) {
      const matches = options.filter((o) =>
        [o.name, o.code, o.currency, o.currencyName].some((field) => field.toLowerCase().includes(q)),
      );
      return { shown: matches, divider: -1 };
    }
    const top = [country, ...POPULAR].filter((c, i, all): c is string => !!c && all.indexOf(c) === i);
    const first = top.map((c) => options.find((o) => o.code === c)).filter((o): o is CountryOption => !!o);
    return { shown: [...first, ...options.filter((o) => !top.includes(o.code))], divider: first.length };
  }, [options, query, country]);

  const close = (focusButton = false) => {
    setOpen(false);
    setQuery('');
    if (focusButton) button.current?.focus();
  };

  // Focus the search box as the menu opens.
  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  // Close on a click outside.
  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (root.current?.contains(event.target as Node)) return;
      setOpen(false);
      setQuery('');
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  // Keep the highlighted option in view while using the arrow keys.
  useEffect(() => {
    list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const choose = (option: CountryOption | undefined) => {
    if (!option) return;
    onSelect(option.code);
    close(true);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') setActive((i) => Math.min(i + 1, shown.length - 1));
    else if (event.key === 'ArrowUp') setActive((i) => Math.max(i - 1, 0));
    else if (event.key === 'Home') setActive(0);
    else if (event.key === 'End') setActive(shown.length - 1);
    else if (event.key === 'Enter') choose(shown[active]);
    else if (event.key === 'Escape') close(true);
    else return;
    event.preventDefault();
  };

  const openMenu = () => {
    setActive(0);
    setOpen(true);
  };

  return (
    <div ref={root} className="relative">
      <button
        ref={button}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        onClick={() => (open ? close() : openMenu())}
        className="glass hover:border-brand/30 flex min-h-12 cursor-pointer items-center gap-3 rounded-full py-2 pr-4 pl-4 text-[15px] transition-[box-shadow,border-color] duration-300"
      >
        {current ? <Flag code={current.code} /> : <Icon name="globe" size={18} className="text-brand" />}
        <span className="font-bold">{current?.name ?? 'Choose your country'}</span>
        <span className="bg-mint text-brand rounded-full px-2.5 py-0.5 text-[13px] font-bold">
          {currency}
          {current?.currency === currency && current.symbol !== currency ? ` ${current.symbol}` : ''}
        </span>
        <Icon
          name="chevron-down"
          size={16}
          strokeWidth={2.4}
          className={cn('text-muted transition-transform duration-300', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+10px)] left-1/2 z-30 w-[min(380px,calc(100vw-32px))] -translate-x-1/2">
          <div className="card animate-fade-up flex flex-col overflow-hidden rounded-[24px] p-2 text-left [animation-duration:0.35s]">
            <label className="border-line bg-parchment flex items-center gap-2.5 rounded-2xl border px-3.5">
              <Icon name="search" size={17} strokeWidth={2.2} className="text-muted shrink-0" />
              <input
                ref={input}
                role="combobox"
                aria-expanded
                aria-controls={`${id}-list`}
                aria-activedescendant={shown[active] ? `${id}-${shown[active].code}` : undefined}
                aria-label="Search countries or currencies"
                placeholder="Search country or currency"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                className="placeholder:text-muted min-h-11 w-full bg-transparent text-[15px] outline-none"
              />
            </label>
            <ul
              ref={list}
              id={`${id}-list`}
              role="listbox"
              aria-label="Country"
              className="mt-2 max-h-[min(340px,50vh)] overflow-y-auto overscroll-contain"
            >
              {shown.length === 0 && (
                <li className="text-muted px-3 py-6 text-center text-sm">No country or currency matches.</li>
              )}
              {shown.map((option, i) => {
                const selected = option.code === country;
                return (
                  // Keys are handled by the search box (combobox with aria-activedescendant), so options only need clicks.
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                  <li
                    key={option.code}
                    id={`${id}-${option.code}`}
                    role="option"
                    aria-selected={selected}
                    data-index={i}
                    onPointerMove={() => setActive(i)}
                    onClick={() => choose(option)}
                    className={cn(
                      'flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 text-[15px]',
                      i === active && 'bg-mint/70',
                      i === divider && 'border-line mt-1 border-t pt-1',
                    )}
                  >
                    <Flag code={option.code} />
                    <span
                      className={cn(
                        'min-w-0 flex-1 truncate',
                        selected ? 'text-brand font-bold' : 'font-semibold',
                      )}
                    >
                      {option.name}
                    </span>
                    <span className="text-muted shrink-0 text-[13px] font-semibold">
                      {option.currency} {option.symbol !== option.currency ? option.symbol : ''}
                    </span>
                    {selected && (
                      <Icon name="check" size={15} strokeWidth={3} className="text-brand shrink-0" />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
