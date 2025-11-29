import './PolicyPage.css';
import { useMetaPageEvents } from '../hooks/useMetaPageEvents';

const TermsAndConditions = () => {
  useMetaPageEvents('Terms and Conditions', { params: { content_category: 'Policy' } });

  return (
    <main className="policy-page">
      <div className="main-container">
      <h1>Terms and Conditions</h1>
      <p>Effective Date: November 2025</p>
      <p>Website: www.wedobrandz.com</p>
      <p>Contact Email: contact@wedobrandz.com</p>
      <p>Phone: +91 91222 89578</p>
      <p>
        Welcome to We Do Brandz, a creative marketing and design agency under IMAGICITY. By accessing or using our website and
        services, you agree to the following Terms and Conditions. Please read them carefully before proceeding.
      </p>
      <h2>1. Use of Website</h2>
      <p>You agree to use this website for lawful purposes only. You must not:</p>
      <ul>
        <li>Engage in activities that disrupt or damage the site.</li>
        <li>Attempt to hack, modify, or misuse our website or systems.</li>
        <li>Use our content, designs, or materials without permission.</li>
      </ul>
      <p>We reserve the right to restrict or terminate access to anyone violating these terms.</p>
      <h2>2. Services and Payments</h2>
      <ul>
        <li>All projects, packages, and deliverables are discussed and confirmed through written communication (email or signed proposal).</li>
        <li>Advance payments are mandatory to initiate any project.</li>
        <li>Pricing is exclusive of applicable taxes unless stated otherwise.</li>
        <li>Delays in payment may result in project suspension or late fees.</li>
      </ul>
      <h2>3. Intellectual Property</h2>
      <ul>
        <li>All creative materials, content, and designs developed by We Do Brandz remain our property until full payment is received.</li>
        <li>
          After final payment, intellectual property rights for the specific deliverables transfer to the client, unless otherwise stated in
          writing.
        </li>
        <li>You agree not to resell, redistribute, or claim ownership of any creative work without our consent.</li>
      </ul>
      <h2>4. Revisions and Approvals</h2>
      <ul>
        <li>Each project includes a specific number of revisions as mentioned in the proposal.</li>
        <li>Additional revisions or changes beyond the agreed scope will incur extra charges.</li>
        <li>Approval of final deliverables signifies acceptance of all terms and completion of the project.</li>
      </ul>
      <h2>5. Cancellations and Refunds</h2>
      <ul>
        <li>If a client wishes to cancel before project initiation, up to 80% of the advance may be refunded depending on administrative or setup costs.</li>
        <li>Once a project has started, no refunds will be provided for the work already completed.</li>
        <li>Any refund, if applicable, will be processed within 10–15 working days from the date of approval.</li>
      </ul>
      <h2>6. Limitation of Liability</h2>
      <p>We Do Brandz and its parent company IMAGICITY shall not be liable for:</p>
      <ul>
        <li>Any indirect, incidental, or consequential damages arising from the use of our services.</li>
        <li>Losses due to website downtime, technical errors, or third-party service disruptions.</li>
      </ul>
      <p>Our total liability will not exceed the amount paid by the client for the specific project.</p>
      <h2>7. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites or tools. We do not control or take responsibility for their content or practices.
        Users are advised to review their terms and privacy policies before interacting with them.
      </p>
      <h2>8. Modifications</h2>
      <p>
        We may update or change these Terms and Conditions at any time without prior notice. Continued use of our website or services after
        updates means you accept the revised terms.
      </p>
      <h2>9. Governing Law</h2>
      <p>These Terms shall be governed by and interpreted under the laws of India, with exclusive jurisdiction in Hazaribagh, Jharkhand.</p>
      <h2>10. Contact Information</h2>
      <p>For any questions regarding these Terms, contact us at:</p>
      <p>Email: contact@wedobrandz.com</p>
      <p>Phone: +91 91222 89578</p>
      <p>Website: www.wedobrandz.com</p>
    </div>
  </main>
  );
};

export default TermsAndConditions;
