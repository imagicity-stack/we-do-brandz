import Hero from '../components/Hero';
import ServiceHighlights from '../components/ServiceHighlights';
import AboutPreview from '../components/AboutPreview';
import ContactCTA from '../components/ContactCTA';
import { useMetaPageEvents } from '../hooks/useMetaPageEvents';

const Home = () => {
  useMetaPageEvents('Home', { params: { content_category: 'Landing Page' } });

  return (
    <main>
      <Hero />
      <AboutPreview />
      <ServiceHighlights />
      <ContactCTA />
    </main>
  );
};

export default Home;
