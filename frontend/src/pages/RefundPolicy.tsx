import './PolicyPage.css';
import { useMetaPageEvents } from '../hooks/useMetaPageEvents';

const RefundPolicy = () => {
  useMetaPageEvents('Return & Refund Policy', { params: { content_category: 'Policy' } });

  return (
    <main className="policy-page">
      <div className="main-container">
      <h1>Return & Refund Policy</h1>
      <p>Effective Date: November 2025</p>
      <p>Website: www.wedobrandz.com</p>
      <p>Contact Email: contact@wedobrandz.com</p>
      <p>Phone: +91 91222 89578</p>
      <p>
        At We Do Brandz, a part of IMAGICITY, every project is handled with creativity, dedication, and clear communication.
        Since our services are custom-built to meet each client’s unique needs, our refund terms are structured to ensure
        fairness for both sides.
      </p>
      <h2>1. Project Initiation</h2>
      <p>
        A project officially begins after receiving the advance payment and written confirmation from the client. Once a
        project starts, it involves internal planning, design allocation, and resource commitment — hence, refunds are handled
        carefully as per the conditions below.
      </p>
      <h2>2. Refund Eligibility</h2>
      <p>Refunds may be issued only under the following conditions:</p>
      <ul>
        <li>
          Before project initiation: Up to 80% of the advance may be refunded, based on administrative or setup expenses
          incurred.
        </li>
        <li>
          After project initiation: Refunds are not applicable for completed or in-progress work since creative hours and
          resources are already utilized.
        </li>
        <li>
          If We Do Brandz fails to deliver: A full or partial refund may be considered based on the percentage of undelivered
          work, after internal review.
        </li>
      </ul>
      <h2>3. No Refund Policy Applies To:</h2>
      <ul>
        <li>Change of mind or project direction after work has begun.</li>
        <li>Delays caused by client-side inaction, missing feedback, or lack of communication.</li>
        <li>Services involving third-party tools, ads, or plugins (e.g., domain purchases, hosting, ad credits, etc.).</li>
        <li>Completed projects where final files, creatives, or deliverables have been shared.</li>
      </ul>
      <h2>4. Revisions and Corrections</h2>
      <p>
        We encourage clients to review all drafts and request changes during the revision stage. Revisions are included as per
        the proposal, but additional iterations or new requests beyond scope are chargeable.
      </p>
      <h2>5. Refund Process</h2>
      <p>All refund requests must be sent via email to contact@wedobrandz.com with:</p>
      <ul>
        <li>Project name</li>
        <li>Payment proof</li>
        <li>Reason for refund request</li>
      </ul>
      <p>
        Once received, our finance team will review the case within 7 working days and communicate the decision. Approved
        refunds will be processed within 10–15 business days through the original payment method.
      </p>
      <h2>6. Contact Information</h2>
      <p>For queries or refund requests, please contact us:</p>
      <p>Email: contact@wedobrandz.com</p>
      <p>Phone: +91 91222 89578</p>
      <p>Website: www.wedobrandz.com</p>
    </div>
  </main>
  );
};

export default RefundPolicy;
