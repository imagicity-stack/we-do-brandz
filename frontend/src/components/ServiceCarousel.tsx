import { useRef } from 'react';
import type { ServiceCategory, SubService } from '../data/services';
import SubServiceCard from './SubServiceCard';

type Props = {
  category: ServiceCategory;
  services: SubService[];
};

export const ServiceCarousel = ({ category, services }: Props) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: 'left' | 'right') => {
    const track = scrollerRef.current;
    if (!track) return;

    const slide = track.querySelector<HTMLElement>('.carousel-slide');
    const cardWidth = slide?.clientWidth ?? 320;
    const gap = 24;

    track.scrollBy({
      left: direction === 'left' ? -(cardWidth + gap) : cardWidth + gap,
      behavior: 'smooth'
    });
  };

  return (
    <div className="services-carousel">
      <div className="carousel-track" ref={scrollerRef}>
        {services.map((service) => (
          <div className="carousel-slide" key={service.id}>
            <SubServiceCard category={category} service={service} />
          </div>
        ))}
      </div>
      <div className="carousel-controls" aria-label={`${category.name} carousel controls`}>
        <button type="button" onClick={() => scrollByAmount('left')} aria-label="Scroll left">
          ←
        </button>
        <button type="button" onClick={() => scrollByAmount('right')} aria-label="Scroll right">
          →
        </button>
      </div>
    </div>
  );
};

export default ServiceCarousel;
