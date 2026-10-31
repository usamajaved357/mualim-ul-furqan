import { anchors } from '@/config/site';

export function AnnouncementBar() {
  return (
    <div className="bg-ink px-4 py-2 text-center text-[13px] text-white/80 sm:text-sm">
      <span className="bg-gold-deep mr-2 rounded-full px-2 py-0.5 text-[11px] font-extrabold tracking-wide text-white uppercase">
        New
      </span>
      Classes every day, shown in your own time zone.{' '}
      <a
        href={anchors.book}
        className="hover:text-gold font-bold whitespace-nowrap text-white underline-offset-2"
      >
        Book your free class →
      </a>
    </div>
  );
}
