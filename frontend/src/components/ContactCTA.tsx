import Link from 'next/link';
import { useLocalePath } from '../hooks/useLocalePath';

export const ContactCTA = () => {
  const buildPath = useLocalePath();
  return (
    <section className="section contact-cta">
      <div className="main-container contact-cta-inner">
        <div>
          <span className="tag">Ready to grow?</span>
          <h2>Book a discovery call and see how we can help.</h2>
          <p>
            Share your growth goals, current challenges, and we&apos;ll map a roadmap tailored to your brand.
          </p>
        </div>
        <Link href={buildPath('/contact')} className="primary-button">
          Book a call
        </Link>
      </div>
    </section>
  );
};

export default ContactCTA;
