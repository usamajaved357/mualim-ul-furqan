import { site } from '@/config/site';
import { LegalPage } from './LegalPage';

/** Template only: fill in your real policies before launch. */
export function TermsPage() {
  return (
    <LegalPage title="Terms of service" updated="[Date]">
      <p>These terms apply to classes booked with {site.name}.</p>
      <h2>Free trial</h2>
      <p>Your first 30-minute class is free and you are under no obligation to continue.</p>
      <h2>Payment</h2>
      <p>Plans are paid monthly in advance by [card / PayPal].</p>
      <h2>Rescheduling &amp; cancellations</h2>
      <p>[Your notice period, e.g. 12 hours, and what happens to missed classes.]</p>
      <h2>Refunds</h2>
      <p>[Your refund policy.]</p>
      <h2>Child safety</h2>
      <p>Parents or guardians are welcome to attend any class. Classes take place on private links only.</p>
    </LegalPage>
  );
}
