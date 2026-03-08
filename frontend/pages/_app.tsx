import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import ScrollToTopButton from '../src/components/ScrollToTopButton';
import { trackMetaEvent } from '../src/utils/metaPixel';

import '../src/index.css';
import '../src/components/Header.css';
import '../src/components/Footer.css';
import '../src/pages/Home.css';
import '../src/components/ContactForm.css';
import '../src/components/ServiceCarousel.css';
import '../src/components/SubServiceCard.css';
import '../src/pages/About.css';
import '../src/pages/Contact.css';
import '../src/pages/FAQ.css';
import '../src/pages/ServiceDetail.css';
import '../src/pages/Services.css';
import '../src/pages/PolicyPage.css';

const MetaPixelTracker = () => {
  const router = useRouter();
  const lastTrackedPath = useRef<string>();

  useEffect(() => {
    const path = router.asPath;
    if (lastTrackedPath.current === path) return;
    lastTrackedPath.current = path;
    trackMetaEvent('PageView', { content_name: path });
  }, [router.asPath]);

  return null;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MetaPixelTracker />
      <Header />
      <Component {...pageProps} />
      <Footer />
      <ScrollToTopButton />
    </>
  );
}

export default MyApp;
