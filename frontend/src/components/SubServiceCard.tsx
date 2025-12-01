import Link from 'next/link';
import { useLocale } from '../context/LocaleContext';
import type { ServiceCategory, SubService } from '../data/services';
import { useLocalePath } from '../hooks/useLocalePath';
import { localizePriceLabel } from '../utils/currency';

interface Props {
  category: ServiceCategory;
  service: SubService;
}

export const SubServiceCard = ({ category, service }: Props) => {
  const locale = useLocale();
  const buildPath = useLocalePath();
  const localizedPrice = localizePriceLabel(locale, service.priceLabel);

  return (
    <div className="subservice-card">
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
        <div className="price-block">
          <span className="price">{localizedPrice}</span>
          <span className="timeline">{service.deliveryTimeline}</span>
          {service.priceNote && <small>{localizePriceLabel(locale, service.priceNote)}</small>}
        </div>
        <Link href={buildPath(`/services/${category.slug}/${service.slug}`)} className="primary-button">
          Book now
        </Link>
      </div>
    </div>
  );
};

export default SubServiceCard;
