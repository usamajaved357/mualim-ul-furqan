import { Link } from 'react-router';
import { site } from '@/config/site';
import { LegalPage, type LegalSection } from './LegalPage';

const email = site.contact.email;
const Email = () => <a href={`mailto:${email}`}>{email}</a>;

/**
 * Privacy policy. Written to match what the site and the academy actually do (booking through Google
 * Calendar/Meet with Gmail confirmations, WhatsApp, Payoneer, Cloudflare hosting, no tracking cookies). Update
 * it whenever that changes, for example if the Meta Pixel is switched on (VITE_META_PIXEL_ID).
 */
const sections: LegalSection[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: (
      <>
        <p>
          {site.name} is an online Quran academy offering live, one-on-one classes in Noorani Qaida, Nazra,
          Tajweed, Hifz and Duas. It is run by {site.teacher.name}, our founder and lead teacher, from
          Pakistan, and teaches children and adults in the UK, the US and Europe.
        </p>
        <p>
          In this policy, "we", "us" and "our" mean {site.name}, and "you" means the parent, guardian or adult
          learner who books or takes classes with us. We are responsible for the personal information
          described here. To contact us about it, email <Email /> or message us on WhatsApp at{' '}
          {site.contact.whatsappDisplay}.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-collect',
    title: 'What we collect',
    body: (
      <>
        <p>We only ask for what we need to arrange and teach your classes:</p>
        <ul>
          <li>
            <strong>When you book a free class:</strong> your name and email address, your WhatsApp number if
            you choose to give it, whether the class is for your child or for you, your child's first name,
            the course, the time you pick, your time zone, and any notes you add (for example your child's age
            or level).
          </li>
          <li>
            <strong>While you study with us:</strong> the class schedule, attendance, lesson notes, progress
            reports and homework we send you.
          </li>
          <li>
            <strong>When you message us:</strong> the messages you send by email or WhatsApp, and your number
            or address.
          </li>
          <li>
            <strong>When you pay:</strong> your name, email and the payment details shown on the Payoneer
            request (amount, date, plan). We never see or store your card or bank details; Payoneer handles
            them.
          </li>
          <li>
            <strong>Class recordings:</strong> only if you ask us to record a class.
          </li>
          <li>
            <strong>Technical information:</strong> when you visit the website, our hosting provider
            (Cloudflare) and Google Fonts receive your IP address and basic browser details, as every website
            does, to deliver the pages and fonts securely.
          </li>
        </ul>
        <p>
          We do not ask for children's surnames, dates of birth, photos or school details, and we never ask
          for payment details on the website.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use-it',
    title: 'How we use it',
    body: (
      <>
        <ul>
          <li>To book your free class, create your private Google Meet link and send your confirmation.</li>
          <li>To schedule and teach classes, track progress and send monthly reports.</li>
          <li>To reply to your questions and keep you informed about your classes and schedule changes.</li>
          <li>To send payment requests and keep records of payments.</li>
          <li>To keep classes safe and resolve any problem or complaint.</li>
        </ul>
        <p>
          <strong>Our legal reasons</strong> (under UK and EU data protection law): most of this is needed to
          provide the classes you ask for (performing our agreement with you). Replying to enquiries and
          keeping our teaching records is in our legitimate interests. Payment records are kept because the
          law requires it. Recordings are made only with your consent, which you can withdraw at any time.
        </p>
        <p>
          We never sell your information, never use it for advertising, and never send marketing messages
          unless you ask to hear from us.
        </p>
      </>
    ),
  },
  {
    id: 'who-we-share-it-with',
    title: 'Who we share it with',
    body: (
      <>
        <p>
          We use a small number of trusted services to run the academy. They only process your information to
          provide their service to us:
        </p>
        <ul>
          <li>
            <strong>Google</strong> (Google Calendar, Google Meet and Gmail): your booking is added to our
            calendar, the class takes place on a private Google Meet link, and confirmation emails are sent
            from our Gmail account. Google also sends you its own calendar invitation.
          </li>
          <li>
            <strong>WhatsApp</strong> (Meta): if you message us or receive homework and practice notes there.
          </li>
          <li>
            <strong>Payoneer</strong>: to send payment requests and receive payments.
          </li>
          <li>
            <strong>Cloudflare</strong>: hosts the website and the booking service.
          </li>
        </ul>
        <p>
          We do not share your information with anyone else, unless the law requires it or it is needed to
          protect a child's safety.
        </p>
      </>
    ),
  },
  {
    id: 'international-transfers',
    title: 'International transfers',
    body: (
      <p>
        We teach from Pakistan, and the services above store data in the United States and other countries.
        This means your information is handled outside the UK and the European Economic Area. Where those
        providers transfer data internationally, they use recognised safeguards such as the UK International
        Data Transfer Addendum and the EU Standard Contractual Clauses. We keep the information we hold
        ourselves to a minimum and protect it as described below.
      </p>
    ),
  },
  {
    id: 'children',
    title: "Children's privacy",
    body: (
      <>
        <p>
          Classes for children are booked by a parent or guardian, not by the child. We only collect a child's
          first name, along with the learning notes and progress records that come from teaching them.
        </p>
        <p>
          Every class takes place on a private Google Meet link sent to the parent. Parents and guardians are
          always welcome to watch any lesson, and we never contact a child directly outside class without the
          parent's agreement.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and your browser',
    body: (
      <>
        <p>
          The website does not use advertising or analytics cookies, and does not track you across other
          sites. The only thing it saves in your browser is the currency you choose on the pricing section, so
          prices stay in your currency next time. You can clear it at any time in your browser settings.
        </p>
        <p>
          If we ever add advertising or analytics tools, such as the Meta Pixel, we will update this page
          first and ask for your consent where the law requires it.
        </p>
      </>
    ),
  },
  {
    id: 'how-long-we-keep-it',
    title: 'How long we keep it',
    body: (
      <ul>
        <li>
          <strong>Free class bookings:</strong> if you do not continue after the free class, we delete your
          details within 6 months.
        </li>
        <li>
          <strong>Students:</strong> we keep class and progress records while you study with us and for 12
          months after your last class, in case you return.
        </li>
        <li>
          <strong>Payment records:</strong> kept for as long as tax and accounting law requires.
        </li>
        <li>
          <strong>Recordings:</strong> deleted within 30 days of being shared with you.
        </li>
      </ul>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    body: (
      <>
        <p>You can ask us at any time to:</p>
        <ul>
          <li>tell you what information we hold about you or your child and send you a copy;</li>
          <li>correct anything that is wrong or out of date;</li>
          <li>delete your information (unless we must keep a payment record by law);</li>
          <li>stop or limit how we use it, or object to how we use it;</li>
          <li>withdraw your consent to recordings.</li>
        </ul>
        <p>
          Email <Email /> and we will reply within one month. If you are not happy with our answer, you can
          complain to your data protection authority: in the UK, the Information Commissioner's Office
          (ico.org.uk); in the EU, the authority in your country.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: 'How we keep it safe',
    body: (
      <p>
        Your information is kept in password-protected accounts, the website and booking service only work
        over encrypted connections (HTTPS), and student records are only used by the people who teach and run
        the academy. No system is perfectly secure, but if something ever went wrong that affected your
        information, we would tell you promptly.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        If we change how we use personal information, we will update this page and the date at the top. If the
        change is significant, we will also let current families know by email or WhatsApp. See also our{' '}
        <Link to="/terms">terms of service</Link>.
      </p>
    ),
  },
];

export function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="25 November 2026"
      intro="What we collect when you book or study with us, why we need it, who helps us handle it, and how to have it deleted."
      sections={sections}
    />
  );
}
