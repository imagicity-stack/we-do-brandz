import { useMemo } from 'react';
import { serviceCategories } from '../data/services';
import SubServiceCard from '../components/SubServiceCard';
import './Services.css';

const Services = () => {
  const categoryAnchors = useMemo(
    () =>
      serviceCategories.map((category) => ({
        id: category.slug,
        name: category.name,
        summary: category.summary
      })),
    []
  );

  return (
    <main className="services-page">
      <section className="services-hero">
        <div className="main-container">
          <span className="tag">Our Services</span>
          <h1>Brand, marketing, and content squads tailored to your growth stage.</h1>
          <p>
            Choose from modular services or combine them into a full-stack growth engine. Every engagement includes strategy,
            execution, and measurable outcomes.
          </p>
          <div className="services-pill-row">
            {categoryAnchors.map((category) => (
              <a key={category.id} href={`#${category.id}`} className="pill-link">
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {serviceCategories.map((category) => (
        <section className="section" id={category.slug} key={category.id}>
          <div className="main-container">
            <div className="category-header">
              <span className="tag">{category.name}</span>
              <h2>{category.tagline}</h2>
              <p className="section-intro">{category.summary}</p>
            </div>
            <div className="stacked-list">
              {category.subServices.map((service) => (
                <SubServiceCard key={service.id} category={category} service={service} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
};

export default Services;
