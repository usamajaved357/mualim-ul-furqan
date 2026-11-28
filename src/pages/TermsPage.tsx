import { Link } from 'react-router';
import { site } from '@/config/site';
import { LegalPage, type LegalSection } from './LegalPage';

const email = site.contact.email;
const Email = () => <a href={`mailto:${email}`}>{email}</a>;

/** The academy's notice period for moving or cancelling a booked class. */
const NOTICE_HOURS = 12;
/** Discount on each additional child from the same family (keep in step with pricing/data.ts). */
const SIBLING_DISCOUNT = '10%';

/**
 * Terms of service: the academy's real policies (agreed with the owner, November 2026): payment by Payoneer,
 * 12 hours' notice to reschedule, cancel any time with no refund for the month already paid, 10% sibling
 * discount.
 */
const sections: LegalSection[] = [
  {
    id: 'about',
    title: 'About these terms',
    body: (
      <>
        <p>
          These terms apply to every class booked with {site.name}, an online Quran academy run by{' '}
          {site.teacher.name}. By booking a free class or paying for a plan, you agree to them. "You" means
          the parent or guardian who books for a child, or the adult learner who books for themselves.
        </p>
        <p>
          We have kept them short and plain. If anything is unclear, email <Email /> or message us on WhatsApp
          at {site.contact.whatsappDisplay} before you book.
        </p>
      </>
    ),
  },
  {
    id: 'free-class',
    title: 'Your free class',
    body: (
      <ul>
        <li>Your first 30-minute class is free, with no payment or card details needed.</li>
        <li>
          It is a real lesson: the teacher gets to know the learner, checks their level and suggests a plan.
        </li>
        <li>You are under no obligation to continue. One free class per learner.</li>
      </ul>
    ),
  },
  {
    id: 'classes',
    title: 'How classes work',
    body: (
      <ul>
        <li>
          All classes are live and one-on-one on Google Meet. The private link is sent to you by email when
          you book.
        </li>
        <li>
          Plan lessons are 30 minutes (45 minutes for Hifz), at fixed weekly times agreed with you, with the
          same teacher every week.
        </li>
        <li>
          You need a phone, tablet or laptop with a camera and microphone, and a stable internet connection.
          Headphones help.
        </li>
        <li>
          Please join on time. If the learner joins late, the class still ends at the usual time. If the
          learner has not joined 15 minutes after the start and we have not heard from you, the class counts
          as taken.
        </li>
        <li>You receive a progress report every month.</li>
      </ul>
    ),
  },
  {
    id: 'plans-and-payment',
    title: 'Plans and payment',
    body: (
      <ul>
        <li>
          Plans are monthly and paid in advance, by <strong>Payoneer</strong>. We send a payment request
          before each month starts, and your weekly class times are confirmed once it is paid.
        </li>
        <li>
          Prices are set and billed in US dollars. Prices shown in other currencies on the website are a guide
          at recent exchange rates; the amount on your Payoneer request is the amount due. Any fees your bank
          or card provider charges are yours.
        </li>
        <li>
          <strong>Sibling discount:</strong> {SIBLING_DISCOUNT} off the plan for the second and each
          additional child from the same family.
        </li>
        <li>
          If a payment has not arrived 7 days after it is due, we may pause classes until it does. We will
          always message you first.
        </li>
        <li>
          We may change our prices. Current students get at least one month's notice, and the new price only
          applies from the next month you pay for.
        </li>
      </ul>
    ),
  },
  {
    id: 'rescheduling',
    title: 'Rescheduling and missed classes',
    body: (
      <ul>
        <li>
          <strong>If you can't make a class</strong>, tell us at least {NOTICE_HOURS} hours before it starts
          and we will move it to another time that suits you, within the same month where possible.
        </li>
        <li>
          With less than {NOTICE_HOURS} hours' notice, or if the learner does not attend, the class counts as
          taken and is not made up.
        </li>
        <li>
          <strong>If we have to cancel</strong> a class (for example because the teacher is unwell), we will
          let you know as early as we can, and you choose a make-up class or a refund for that class.
        </li>
        <li>For Eid and other holidays, we tell you in advance and reschedule the classes affected.</li>
      </ul>
    ),
  },
  {
    id: 'cancelling',
    title: 'Cancelling and refunds',
    body: (
      <ul>
        <li>
          You can stop at any time. Just tell us before your next month starts and you will not be asked to
          pay again. There is no minimum term and no cancellation fee.
        </li>
        <li>
          Payments for a month that has already started are not refunded, but you keep your remaining classes
          for that month.
        </li>
        <li>The one exception: classes we cancel and cannot make up are always refunded.</li>
        <li>These terms do not affect any rights you have under the consumer law where you live.</li>
      </ul>
    ),
  },
  {
    id: 'child-safety',
    title: 'Child safety',
    body: (
      <ul>
        <li>
          Parents and guardians are welcome to watch any class, in person or by joining the same Google Meet
          link. Nothing happens behind closed doors.
        </li>
        <li>
          Classes only take place on the private link sent to the parent or adult learner. We never contact a
          child directly outside class without the parent's agreement.
        </li>
        <li>For young children, please make sure a parent or another adult is at home during the lesson.</li>
      </ul>
    ),
  },
  {
    id: 'conduct',
    title: 'Respect in class',
    body: (
      <p>
        We teach with patience and kindness, and ask the same of learners and families. We may end a class
        early or stop teaching a learner, after first speaking with the parent, if there is abusive or unsafe
        behaviour. In that case, unused paid classes for the month are refunded.
      </p>
    ),
  },
  {
    id: 'recordings-and-materials',
    title: 'Recordings and materials',
    body: (
      <p>
        Classes are only recorded if you ask, and recordings are shared privately with you for practice at
        home. Please do not post recordings or our teaching materials publicly or share them outside your
        family. See our{' '}
        <Link viewTransition to="/privacy">
          privacy policy
        </Link>{' '}
        for how we handle personal information.
      </p>
    ),
  },
  {
    id: 'responsibility',
    title: 'Our responsibility',
    body: (
      <p>
        We will always teach with care and skill. We cannot guarantee a set pace of progress, because every
        learner moves at their own speed, and we are not responsible for problems with your internet
        connection, device or Google Meet that are outside our control. Nothing in these terms limits any
        responsibility that cannot be limited by law.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes and contact',
    body: (
      <p>
        If we change these terms, we will update this page and the date at the top, and tell current families
        about any change that affects them before it applies. Questions, complaints or anything else: email{' '}
        <Email /> or message us on WhatsApp at {site.contact.whatsappDisplay}. We usually reply within a few
        hours.
      </p>
    ),
  },
];

export function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      updated="25 November 2026"
      intro="The simple rules for free classes, payment, rescheduling, cancelling and keeping children safe online."
      sections={sections}
    />
  );
}
