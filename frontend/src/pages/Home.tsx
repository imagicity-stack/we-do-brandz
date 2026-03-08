const Home = () => {
  return (
    <main>
      <section className="showcase">
        <div className="main-container showcase-inner">
          <p className="showcase-eyebrow">Creative partner for modern brands</p>
          <h1>One simple studio to design your brand, website, and growth engine.</h1>
          <p className="showcase-text">
            We help founders and teams turn ideas into premium digital experiences with a clear story and measurable outcomes.
          </p>
          <div className="showcase-actions">
            <a href="#contact" className="primary-button">
              Let&apos;s build together
            </a>
            <a href="#work" className="secondary-button">
              View sample outcomes
            </a>
          </div>
          <div className="showcase-metrics">
            <article>
              <strong>120+</strong>
              <span>launches delivered</span>
            </article>
            <article>
              <strong>4.8/5</strong>
              <span>average partner rating</span>
            </article>
            <article>
              <strong>3x</strong>
              <span>average conversion lift</span>
            </article>
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="main-container">
          <h2>What we do</h2>
          <div className="grid grid-3">
            <article className="card">
              <h3>Brand Identity</h3>
              <p>Naming, messaging, and visual systems that help your business stand out and stay consistent.</p>
            </article>
            <article className="card">
              <h3>Website Design</h3>
              <p>High-converting websites built with clear UX, smart content flow, and polished interactions.</p>
            </article>
            <article className="card">
              <h3>Growth Campaigns</h3>
              <p>Creative ad concepts, landing pages, and testing plans that move from traffic to revenue.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="process" className="section">
        <div className="main-container process-board">
          <h2>Our process</h2>
          <ol>
            <li>
              <span>01</span> Discover goals, audience, and positioning.
            </li>
            <li>
              <span>02</span> Shape the brand system and website blueprint.
            </li>
            <li>
              <span>03</span> Launch, optimize, and scale what works.
            </li>
          </ol>
        </div>
      </section>

      <section id="work" className="section">
        <div className="main-container">
          <h2>Recent impact</h2>
          <div className="grid grid-2">
            <article className="card">
              <h3>D2C wellness startup</h3>
              <p>Rebrand + ecommerce redesign delivered a 62% increase in conversion rate in 90 days.</p>
            </article>
            <article className="card">
              <h3>B2B SaaS company</h3>
              <p>Positioning refresh and funnel rebuild cut CAC by 34% while boosting qualified demos.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="main-container contact-banner">
          <h2>Ready for a cleaner, stronger website?</h2>
          <p>Tell us your goals and we&apos;ll map a creative plan with clear next steps.</p>
          <a className="primary-button" href="mailto:connect@wedobrandz.com">
            connect@wedobrandz.com
          </a>
        </div>
      </section>
    </main>
  );
};

export default Home;
