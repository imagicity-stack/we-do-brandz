import { Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import ServiceDetail from './pages/ServiceDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicy from './pages/RefundPolicy';
import NotFound from './pages/NotFound';
import LocationPrompt from './components/LocationPrompt';
import ScrollToTopButton from './components/ScrollToTopButton';
import { LocaleProvider } from './context/LocaleContext';
import { detectLocale, isLocale } from './utils/locale';
import { useLocalePath } from './hooks/useLocalePath';

const CountryRedirect = () => {
  const locale = detectLocale();
  return <Navigate to={`/${locale}`} replace />;
};

const LocalizedNotFound = () => {
  const buildPath = useLocalePath();
  return <NotFound homePath={buildPath('/')} servicesPath={buildPath('/services')} />;
};

const DefaultNotFound = () => {
  const locale = detectLocale();
  return <NotFound homePath={`/${locale}`} servicesPath={`/${locale}/services`} />;
};

const LocaleShell = () => {
  const params = useParams<{ locale?: string }>();
  const localeParam = params.locale;

  if (!isLocale(localeParam)) {
    return <Navigate to={`/${detectLocale()}`} replace />;
  }

  return (
    <LocaleProvider value={localeParam}>
      <div className="app">
        <LocationPrompt />
        <Header />
        <Outlet />
        <Footer />
        <ScrollToTopButton />
      </div>
    </LocaleProvider>
  );
};

const App = () => (
  <Routes>
    <Route path="/" element={<CountryRedirect />} />
    <Route path="/:locale/*" element={<LocaleShell />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="services/:serviceSlug/:subServiceSlug" element={<ServiceDetail />} />
      <Route path="faq" element={<FAQ />} />
      <Route path="contact" element={<Contact />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="refund-and-return-policy" element={<RefundPolicy />} />
      <Route path="*" element={<LocalizedNotFound />} />
    </Route>
    <Route path="*" element={<DefaultNotFound />} />
  </Routes>
);

export default App;
