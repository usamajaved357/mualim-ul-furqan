import { site } from '@/config/site';
import { LegalPage } from './LegalPage';

/** Template only: have it reviewed for UK GDPR / EU GDPR / US requirements before launch. */
export function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="[Date]">
      <p>
        {site.name} ("we") provides online Quran classes. This page explains what personal information we
        collect and how we use it.
      </p>
      <h2>What we collect</h2>
      <p>
        The name, email, phone/WhatsApp number and time zone you give us when booking, your child's first name
        and age, and class notes and progress records.
      </p>
      <h2>How we use it</h2>
      <p>
        To schedule and teach classes, send progress reports and reply to your messages. We never sell your
        data.
      </p>
      <h2>Recordings</h2>
      <p>Classes are only recorded if you ask, and recordings are shared privately with you.</p>
      <h2>Cookies &amp; analytics</h2>
      <p>[Describe Meta Pixel / analytics use and how visitors can opt out.]</p>
      <h2>Contact</h2>
      <p>For any privacy question or to delete your data, email {site.contact.email}.</p>
    </LegalPage>
  );
}
