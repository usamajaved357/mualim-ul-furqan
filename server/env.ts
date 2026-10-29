/** Server-side secrets. Set them in Cloudflare Pages → Settings → Variables and Secrets (or .env locally). */
export interface Env {
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  GOOGLE_REFRESH_TOKEN?: string;
  /** Calendar that receives bookings; "primary" is the owner's main calendar. */
  GOOGLE_CALENDAR_ID?: string;
  RESEND_API_KEY?: string;
  /** Verified sender, e.g. "Mualim Ul Furqan <bookings@yourdomain.com>". */
  EMAIL_FROM?: string;
  /** Where new-booking notifications go. */
  OWNER_EMAIL?: string;
  /**
   * "true" lets bookings succeed with neither Google nor email configured (nothing is created or sent).
   * On by default in `npm run dev`; leave unset in production so a booking is never silently lost.
   */
  BOOKING_DEMO?: string;
}

export interface GoogleConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  calendarId: string;
}

/** Google credentials, or null in demo mode (no calendar access configured). */
export function googleConfig(env: Env): GoogleConfig | null {
  const clientId = env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = env.GOOGLE_CLIENT_SECRET?.trim();
  const refreshToken = env.GOOGLE_REFRESH_TOKEN?.trim();
  if (!clientId || !clientSecret || !refreshToken) return null;
  return { clientId, clientSecret, refreshToken, calendarId: env.GOOGLE_CALENDAR_ID?.trim() || 'primary' };
}
