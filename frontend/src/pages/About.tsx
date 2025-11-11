import './About.css';

const About = () => (
  <main className="about-page">
    <section className="about-hero">
      <div className="main-container">
        <span className="tag">About Us</span>
        <h1>Meet the team behind We do Brandz</h1>
        <p>
          We are an integrated marketing agency on a mission to help ambitious businesses build unforgettable brands. Our
          strategists, designers, developers, and media specialists co-create experiences that move audiences and grow market
          share.
        </p>
      </div>
    </section>
    <section className="section">
      <div className="main-container about-mission-grid">
        <div className="card">
          <h2>Our mission</h2>
          <p>
            We combine bold creative with smart analytics to craft brands that perform. Every project is a partnership, and we
            obsess over translating your business goals into standout visual identity, campaigns, and digital experiences.
          </p>
        </div>
        <div className="card">
          <h2>What we believe</h2>
          <ul className="about-beliefs">
            <li><strong>Strategy first:</strong> Every output is anchored in a clear positioning and message framework.</li>
            <li><strong>Execution matters:</strong> Quality is non-negotiable—from pitch deck to paid campaign.</li>
            <li><strong>Momentum always:</strong> We iterate fast, ship faster, and keep measuring to maximize growth.</li>
          </ul>
        </div>
      </div>
    </section>
    <section className="section about-values">
      <div className="main-container">
        <h2>Why brands choose us</h2>
        <div className="grid grid-3">
          <div className="card">
            <h3>Integrated team</h3>
            <p>Brand strategists, growth marketers, and creators operating as a single squad for your business.</p>
          </div>
          <div className="card">
            <h3>Proven playbooks</h3>
            <p>Battle-tested frameworks for launches, rebrands, and ongoing digital growth across industries.</p>
          </div>
          <div className="card">
            <h3>Transparent collaboration</h3>
            <p>Weekly syncs, accessible dashboards, and clear KPIs so you always know where we&apos;re headed.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default About;
