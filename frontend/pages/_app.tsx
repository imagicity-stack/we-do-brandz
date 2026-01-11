import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useRef, useState } from 'react';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import ScrollToTopButton from '../src/components/ScrollToTopButton';
import { LocaleProvider } from '../src/context/LocaleContext';
import { detectLocale, isLocale, Locale } from '../src/utils/locale';
import { trackMetaEvent } from '../src/utils/metaPixel';

import '../src/index.css';
import '../src/components/AboutPreview.css';
import '../src/components/ContactCTA.css';
import '../src/components/ContactForm.css';
import '../src/components/Footer.css';
import '../src/components/Header.css';
import '../src/components/Hero.css';
import '../src/components/SearchBar.css';
import '../src/components/ServiceCarousel.css';
import '../src/components/ServiceHighlights.css';
import '../src/components/SubServiceCard.css';
import '../src/pages/About.css';
import '../src/pages/Contact.css';
import '../src/pages/FAQ.css';
import '../src/pages/NotFound.css';
import '../src/pages/PolicyPage.css';
import '../src/pages/ServiceDetail.css';
import '../src/pages/Services.css';

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

const AppLayout = ({ children, locale }: { children: ReactNode; locale: Locale }) => (
  <LocaleProvider value={locale}>
    <MetaPixelTracker />
    <Header />
    {children}
    <Footer />
    <ScrollToTopButton />
  </LocaleProvider>
);

function MyApp({ Component, pageProps }: AppProps<{ locale?: Locale }>) {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>('us');

  useEffect(() => {
    const localeFromProps = pageProps.locale;
    if (localeFromProps && isLocale(localeFromProps)) {
      setLocale(localeFromProps);
      return;
    }

    const localeParam = router.query.locale;
    const localeFromRoute = Array.isArray(localeParam) ? localeParam[0] : localeParam;
    if (isLocale(localeFromRoute)) {
      setLocale(localeFromRoute);
      return;
    }

    setLocale(detectLocale());
  }, [pageProps.locale, router.query.locale]);

  return (
    <AppLayout locale={locale}>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default MyApp;
