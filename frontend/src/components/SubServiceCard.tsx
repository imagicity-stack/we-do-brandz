import { Link } from 'react-router-dom';
import type { ServiceCategory, SubService } from '../data/services';
import './SubServiceCard.css';

interface Props {
  category: ServiceCategory;
  service: SubService;
}

export const SubServiceCard = ({ category, service }: Props) => (
  <div className="subservice-card">
    <div>
      <span className="tag">{category.name}</span>
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <ul>
        {service.deliverables.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
    <div className="subservice-meta">
      <div className="price-block">
        <span className="price">{service.priceLabel}</span>
        <span className="timeline">{service.deliveryTimeline}</span>
        {service.priceNote && <small>{service.priceNote}</small>}
      </div>
      <Link to={`/services/${category.slug}/${service.slug}`} className="primary-button">
        Book now
      </Link>
    </div>
  </div>
);

export default SubServiceCard;
