import { useState } from 'react';
import { faqs } from '../data/faqs';
import './FAQ.css';
import { useMetaPageEvents } from '../hooks/useMetaPageEvents';

const FAQ = () => {
  useMetaPageEvents('FAQ', { params: { content_category: 'Frequently Asked Questions' } });

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <main className="faq-page">
      <section className="faq-hero">
        <div className="main-container">
          <span className="tag">FAQ</span>
          <h1>Answers to questions we hear most often</h1>
          <p>
            Can&apos;t find what you need? Reach out to our team and we&apos;ll happily share more about deliverables, workflows, or
            custom packages.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="main-container faq-list">
          {faqs.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <div className={`faq-item ${isOpen ? 'open' : ''}`} key={item.question}>
                <button className="faq-question" onClick={() => setOpenIndex(isOpen ? -1 : index)}>
                  {item.question}
                  <span>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <p className="faq-answer">{item.answer}</p>}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default FAQ;
