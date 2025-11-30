import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { serviceCategories } from '../data/services';
import ServiceCarousel from '../components/ServiceCarousel';
import './Services.css';
import { useMetaPageEvents } from '../hooks/useMetaPageEvents';

const Services = () => {
  useMetaPageEvents('Services', { params: { content_category: 'Services Overview' } });

  const [searchParams] = useSearchParams();
  const searchTerm = (searchParams.get('q') || '').trim().toLowerCase();
  const hasSearch = searchTerm.length > 0;

  const filteredCategories = useMemo(
    () =>
      serviceCategories
        .map((category) => ({
          ...category,
          subServices: hasSearch
            ? category.subServices.filter((service) =>
                `${service.name} ${service.description}`.toLowerCase().includes(searchTerm)
              )
            : category.subServices
        }))
        .filter((category) => category.subServices.length > 0),
    [hasSearch, searchTerm]
  );

  const categoryAnchors = useMemo(
    () =>
      serviceCategories.map((category) => ({
        id: category.slug,
        name: category.name,
        summary: category.summary
      })),
    []
  );

  const anchorList = hasSearch
    ? filteredCategories.map((category) => ({ id: category.slug, name: category.name, summary: category.summary }))
    : categoryAnchors;

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
            {anchorList.map((category) => (
              <a key={category.id} href={`#${category.id}`} className="pill-link">
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {hasSearch && (
        <div className="main-container search-context">
          Showing results for <strong>{searchTerm}</strong>
        </div>
      )}

      {filteredCategories.map((category) => (
        <section className="section" id={category.slug} key={category.id}>
          <div className="main-container">
            <div className="category-header">
              <span className="tag">{category.name}</span>
              <h2>{category.tagline}</h2>
              <p className="section-intro">{category.summary}</p>
            </div>
            <ServiceCarousel category={category} services={category.subServices} />
          </div>
        </section>
      ))}

      {filteredCategories.length === 0 && (
        <div className="main-container search-context muted">No services matched your search.</div>
      )}
    </main>
  );
};

export default Services;
