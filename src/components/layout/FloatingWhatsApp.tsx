import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';
import { track } from '@/lib/analytics';
import { Icon } from '@/components/ui';

export function FloatingWhatsApp() {
  const href = buildWhatsAppLink(whatsappMessages.general);
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label="Chat with us on WhatsApp"
      onClick={() => track('Contact')}
      className="animate-pulse-ring bg-whatsapp fixed right-5 bottom-5 z-50 flex size-15 items-center justify-center rounded-full text-white shadow-[0_14px_30px_-10px_rgb(0_0_0/0.45)] transition hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <Icon name="whatsapp" size={28} />
    </a>
  );
}
