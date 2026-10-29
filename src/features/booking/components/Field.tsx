import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

const control =
  'border-line-strong text-ink placeholder:text-[#9aa5a1] focus:border-brand w-full rounded-xl border-[1.5px] bg-white px-3.5 text-[15px] outline-none transition-colors focus:shadow-[0_0_0_4px_rgb(11_93_75/0.12)] aria-[invalid=true]:border-[#c2413b]';

interface FieldShellProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
}

function Shell({ id, label, hint, error, className, children }: FieldShellProps & { children: ReactNode }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-[13px] font-bold">
        {label}
        {hint && <span className="text-muted font-semibold"> · {hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[13px] font-semibold text-[#c2413b]">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({
  id,
  label,
  hint,
  error,
  className,
  ...input
}: FieldShellProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Shell id={id} label={label} hint={hint} error={error} className={className}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(control, 'min-h-12')}
        {...input}
      />
    </Shell>
  );
}

export function TextAreaField({
  id,
  label,
  hint,
  error,
  className,
  ...input
}: FieldShellProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Shell id={id} label={label} hint={hint} error={error} className={className}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(control, 'min-h-22 resize-y py-3')}
        {...input}
      />
    </Shell>
  );
}
