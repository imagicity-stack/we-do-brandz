import Link from 'next/link';
import type { ServiceCategory, SubService } from '../data/services';
import { useLocalePath } from '../hooks/useLocalePath';

interface Props {
  category: ServiceCategory;
  service: SubService;
}

export const SubServiceCard = ({ category, service }: Props) => {
  const buildPath = useLocalePath();

  return (
    <article className="subservice-card">
      <div className="subservice-content">
        <span className="tag">{category.name}</span>
        <h3>{service.name}</h3>
        <p className="subservice-description">{service.description}</p>
        <ul className="subservice-deliverables">
          {service.deliverables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="subservice-meta">
        <span className="timeline">{service.deliveryTimeline}</span>
        <Link href={buildPath(`/services/${category.slug}/${service.slug}`)} className="primary-button">
          Discuss this service
        </Link>
      </div>
    </article>
  );
};

export default SubServiceCard;
