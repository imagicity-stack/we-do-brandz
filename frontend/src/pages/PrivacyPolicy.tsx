import { useMetaPageEvents } from '../hooks/useMetaPageEvents';

const PrivacyPolicy = () => {
  useMetaPageEvents('Privacy Policy', { params: { content_category: 'Policy' } });

  return (
    <main className="policy-page">
      <div className="main-container">
        <h1>Privacy Policy</h1>
        <p>Effective Date: November 2025</p>
        <p>Website: www.wedobrandz.com</p>
        <p>Contact Email: contact@wedobrandz.com</p>
        <p>Phone: +1 (415) 555-0198</p>
        <p>
          We Do Brandz (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy Policy explains how we
          collect, use, and safeguard your information when you visit our website or engage our services.
        </p>
        <h2>1. Information We Collect</h2>
        <p>We may collect personal and non-personal information when you:</p>
        <ul>
          <li>Fill out forms or request services on our website.</li>
          <li>Communicate with us through email or phone.</li>
          <li>Interact with our social media or marketing campaigns.</li>
        </ul>
        <p>Types of information include:</p>
        <ul>
          <li>Name, email, phone number, and company details.</li>
          <li>Project details or service requests.</li>
          <li>Browser information, device type, IP address, and usage data through analytics tools.</li>
        </ul>
        <h2>2. How We Use Your Information</h2>
        <p>We use your data to:</p>
        <ul>
          <li>Provide, operate, and improve our services.</li>
          <li>Respond to your queries and manage projects efficiently.</li>
          <li>Send updates, offers, or newsletters (you can unsubscribe anytime).</li>
          <li>Maintain security, detect fraud, and comply with legal obligations.</li>
        </ul>
        <h2>3. Data Sharing and Disclosure</h2>
        <p>We do not sell your personal data. However, we may share information with:</p>
        <ul>
          <li>Trusted third-party vendors assisting in web hosting, analytics, or marketing.</li>
          <li>Legal authorities when required by law.</li>
        </ul>
        <p>These partners are required to maintain confidentiality and use data only for agreed purposes.</p>
        <h2>4. Data Security</h2>
        <p>
          We implement reasonable security measures to protect your data. However, no method of online transmission is 100%
          secure, and we cannot guarantee absolute security.
        </p>
        <h2>5. Cookies and Tracking</h2>
        <p>
          We may use cookies, pixels, or similar technologies for analytics and marketing. You can manage cookie preferences in
          your browser settings.
        </p>
        <h2>6. Your Rights</h2>
        <p>You may request to:</p>
        <ul>
          <li>Access or update your personal information.</li>
          <li>Request deletion of your data, subject to legal obligations.</li>
          <li>Opt out of marketing communications.</li>
        </ul>
        <p>To exercise your rights, contact us at contact@wedobrandz.com.</p>
        <h2>7. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites or tools. We are not responsible for their content or privacy
          practices. Please review their policies before sharing information.
        </p>
        <h2>8. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. Continued use of our website or services after updates constitutes
          acceptance of the revised policy.
        </p>
        <h2>9. Contact Us</h2>
        <p>For privacy-related questions, contact us at:</p>
        <p>Email: contact@wedobrandz.com</p>
        <p>Phone: +1 (415) 555-0198</p>
        <p>Website: www.wedobrandz.com</p>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
