import NotFound from '../src/pages/NotFound';
import { buildLocalePath, detectLocale } from '../src/utils/locale';

export default function Custom404() {
  const locale = detectLocale();
  const homePath = buildLocalePath(locale, '/');
  const servicesPath = buildLocalePath(locale, '/services');

  return <NotFound homePath={homePath} servicesPath={servicesPath} />;
}
