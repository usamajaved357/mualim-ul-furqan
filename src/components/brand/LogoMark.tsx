const palettes = {
  emerald: { arch: '#0B5D4B', detail: '#E8CF94' },
  gold: { arch: '#E8CF94', detail: '#0A2A24' },
} as const;

interface LogoMarkProps {
  size?: number;
  variant?: keyof typeof palettes;
  className?: string;
}

/** Brand mark: a mihrab arch holding an open Quran beneath a star. */
export function LogoMark({ size = 48, variant = 'emerald', className }: LogoMarkProps) {
  const { arch, detail } = palettes[variant];
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden focusable="false" className={className}>
      <path d="M8 62V30C8 17 21 9 32 2C43 9 56 17 56 30V62Z" fill={arch} />
      <path
        d="M13 58V31C13 21 23 14 32 8.5C41 14 51 21 51 31V58Z"
        fill="none"
        stroke={detail}
        strokeWidth="1.6"
      />
      <path d="M32 17l1.6 3.4 3.7.5-2.7 2.6.7 3.7L32 25.5l-3.3 1.7.7-3.7-2.7-2.6 3.7-.5z" fill={detail} />
      <path
        d="M18 40C24 36.5 29 36.5 32 39.5C35 36.5 40 36.5 46 40V51C40 47.5 35 47.5 32 50.5C29 47.5 24 47.5 18 51Z"
        fill={detail}
      />
      <path d="M32 39.5V50.5" stroke={arch} strokeWidth="1.4" />
    </svg>
  );
}
