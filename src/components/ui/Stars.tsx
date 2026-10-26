const STAR = 'M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5L2.6 9.3l6.5-.9z';

export function Star({ size = 16, color = 'var(--color-amber)' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
      <path d={STAR} fill={color} />
    </svg>
  );
}

/** Five-star row. Pass `label` so screen readers hear the rating. */
export function Stars({ size = 16, color, label }: { size?: number; color?: string; label?: string }) {
  return (
    <span className="inline-flex gap-px" role={label ? 'img' : undefined} aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} color={color} />
      ))}
    </span>
  );
}
