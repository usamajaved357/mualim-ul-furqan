/**
 * Typed access to build-time environment variables.
 * All values are optional so the site still renders with placeholders.
 */
const read = (value: string | undefined): string => (value ?? '').trim();

export const env = {
  whatsappNumber: read(import.meta.env.VITE_WHATSAPP_NUMBER).replace(/\D/g, ''),
  metaPixelId: read(import.meta.env.VITE_META_PIXEL_ID),
  siteUrl: read(import.meta.env.VITE_SITE_URL) || 'https://www.example.com',
} as const;
