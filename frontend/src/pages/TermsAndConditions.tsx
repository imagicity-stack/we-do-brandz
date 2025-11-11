import './PolicyPage.css';

const TermsAndConditions = () => (
  <main className="policy-page">
    <div className="main-container">
      <h1>Terms and Conditions</h1>
      <p>
        These terms govern the services provided by We do Brandz. By booking a service you agree to these terms and any
        project-specific agreements shared with you.
      </p>
      <h2>Engagement</h2>
      <p>
        Services commence after payment confirmation or receipt of an executed contract. Project timelines are shared during
        kickoff and may adjust based on scope or client feedback cycles.
      </p>
      <h2>Payments</h2>
      <ul>
        <li>All prices are listed in INR and processed securely via Razorpay.</li>
        <li>For retainers and ongoing engagements, invoices are issued monthly in advance.</li>
        <li>Ad spends or third-party costs are billed separately unless otherwise stated.</li>
      </ul>
      <h2>Intellectual property</h2>
      <p>
        Final deliverables become yours upon full payment. We reserve the right to showcase non-confidential work in our
        portfolio.
      </p>
    </div>
  </main>
);

export default TermsAndConditions;
