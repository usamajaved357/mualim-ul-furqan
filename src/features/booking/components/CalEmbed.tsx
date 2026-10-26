import { Icon } from '@/components/ui';
import { env } from '@/config/env';

/**
 * Cal.com inline booking. Set VITE_CAL_LINK (e.g. "your-name/free-trial").
 * Cal.com shows slots in the visitor's own time zone automatically.
 */
export function CalEmbed({ calLink = env.calLink }: { calLink?: string }) {
  if (!calLink) {
    return (
      <div className="border-line-strong text-muted flex flex-1 flex-col items-center justify-center gap-2.5 rounded-2xl border-[1.5px] border-dashed p-5 text-center text-[15px]">
        <Icon name="calendar" size={36} strokeWidth={1.5} className="text-brand" />
        Booking calendar appears here once <code className="bg-cream rounded px-1.5">VITE_CAL_LINK</code> is
        set.
      </div>
    );
  }
  return (
    <iframe
      title="Book a free trial class"
      src={`https://cal.com/${calLink}?embed=true&theme=light`}
      loading="lazy"
      className="min-h-[560px] w-full flex-1 rounded-2xl border-0"
    />
  );
}
