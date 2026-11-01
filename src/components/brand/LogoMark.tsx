import { useId } from 'react';

/** Ogee mihrab arch, and the gold frame set just inside it. */
const ARCH =
  'M7 61V29.5C7 19 15.5 12.5 23.5 8.2C27.6 6 30.6 4.2 32 1.5C33.4 4.2 36.4 6 40.5 8.2C48.5 12.5 57 19 57 29.5V61Q57 63 55 63H9Q7 63 7 61Z';
const FRAME =
  'M11.3 59V30C11.3 21.6 18.4 16.1 25.4 12.3C28.7 10.5 30.9 9 32 7.1C33.1 9 35.3 10.5 38.6 12.3C45.6 16.1 52.7 21.6 52.7 30V59Z';
/** Left page of the open Quran; the right page is its mirror image. */
const PAGE =
  'M31.2 39.7C27.5 36.9 22.6 36.1 17 37.4Q16 37.6 16 38.6V46.1Q16 47.1 17 46.9C22.6 45.7 27.5 46.4 31.2 49.1Z';
/** The crossed boards of the rehal (Quran stand). */
const REHAL = 'M19.5 45L42 57.2M44.5 45L22 57.2';

function Pages() {
  return (
    <>
      <path d={PAGE} />
      <path d={PAGE} transform="matrix(-1 0 0 1 64 0)" />
    </>
  );
}

interface LogoMarkProps {
  size?: number;
  className?: string;
}

/**
 * Brand mark: a gold-edged mihrab arch with an eight-pointed star (the Rub el Hizb from the Mushaf) glowing above
 * an open Quran on its rehal.
 */
export function LogoMark({ size = 48, className }: LogoMarkProps) {
  // Gradient ids must be unique per instance (header and footer both render the mark).
  const id = useId().replace(/[^\w-]/g, '');
  const emerald = `${id}-emerald`;
  const gold = `${id}-gold`;
  const glow = `${id}-glow`;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden focusable="false" className={className}>
      <defs>
        <linearGradient id={emerald} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#17a078" />
          <stop offset="1" stopColor="#08513e" />
        </linearGradient>
        <linearGradient id={gold} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde7ae" />
          <stop offset="1" stopColor="#e2a540" />
        </linearGradient>
        <radialGradient id={glow}>
          <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={ARCH} fill={`url(#${emerald})`} stroke={`url(#${gold})`} strokeWidth="1.2" />
      <path d={FRAME} fill="none" stroke={`url(#${gold})`} strokeWidth="1" opacity="0.75" />
      <circle cx="32" cy="22" r="13" fill={`url(#${glow})`} />
      <g fill={`url(#${gold})`}>
        <rect x="27.19" y="17.19" width="9.62" height="9.62" />
        <rect x="27.19" y="17.19" width="9.62" height="9.62" transform="rotate(45 32 22)" />
      </g>
      <circle cx="32" cy="22" r="2.1" fill="#118464" />
      <path d={REHAL} stroke={`url(#${gold})`} strokeWidth="2.6" strokeLinecap="round" />
      <g fill="#b9781f" transform="translate(0 1.7)">
        <Pages />
      </g>
      <g fill={`url(#${gold})`}>
        <Pages />
      </g>
    </svg>
  );
}
