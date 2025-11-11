import './PolicyPage.css';

const PrivacyPolicy = () => (
  <main className="policy-page">
    <div className="main-container">
      <h1>Privacy Policy</h1>
      <p>
        We do Brandz is committed to protecting your personal data. This policy outlines how we collect, use, and safeguard
        information when you use our website, book services, or interact with our team.
      </p>
      <h2>What we collect</h2>
      <p>
        We collect details submitted through enquiry forms, service booking forms, and payment checkout including your name,
        contact information, brand information, and project requirements.
      </p>
      <h2>How we use your data</h2>
      <ul>
        <li>To respond to enquiries and provide proposals.</li>
        <li>To create invoices, Razorpay orders, and manage engagements.</li>
        <li>To send project updates and marketing communication (with opt-out).</li>
      </ul>
      <h2>Data retention</h2>
      <p>
        We retain data for as long as necessary to deliver services and comply with legal obligations. You may request deletion
        of your information by contacting hello@wedobrandz.com.
      </p>
    </div>
  </main>
);

export default PrivacyPolicy;
