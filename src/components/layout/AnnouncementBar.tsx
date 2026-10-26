import { anchors } from '@/config/site';

export function AnnouncementBar() {
  return (
    <div className="bg-night px-4 py-2.5 text-center text-sm text-[#e8e2d2]">
      <span className="text-gold font-bold">New:</span> evening &amp; weekend slots now open for UK, US and
      Europe ·{' '}
      <a href={anchors.book} className="hover:text-gold font-bold text-white underline-offset-2">
        Book your free class →
      </a>
    </div>
  );
}
