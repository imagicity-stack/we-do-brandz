import Link from 'next/link';
import { serviceCategories } from '../data/services';
import { useLocalePath } from '../hooks/useLocalePath';

export const ServiceHighlights = () => {
  const buildPath = useLocalePath();
  const servicesPath = buildPath('/services');

  return (
    <section className="section">
      <div className="main-container">
        <h2>Services crafted for modern brands</h2>
        <p className="section-intro">
          From positioning workshops to performance media, our teams plug directly into your growth roadmap.
        </p>
        <div className="grid grid-2">
          {serviceCategories.map((category) => (
            <div className="highlight-card" key={category.id}>
              <span className="tag">{category.name}</span>
              <h3>{category.tagline}</h3>
              <p>{category.summary}</p>
              <div className="chip-list">
                {category.subServices.slice(0, 3).map((item) => (
                  <span className="chip" key={item.id}>
                    {item.name}
                  </span>
                ))}
              </div>
              <Link href={`${servicesPath}#${category.slug}`} className="text-link">
                View deliverables
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
