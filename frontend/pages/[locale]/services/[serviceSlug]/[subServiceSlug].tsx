import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import ServiceDetail from '../../../../src/pages/ServiceDetail';
import { findSubService, serviceCategories } from '../../../../src/data/services';
import { isLocale, Locale, SUPPORTED_LOCALES } from '../../../../src/utils/locale';

type PageProps = { locale: Locale };

export default function ServiceDetailPage(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  return <ServiceDetail />;
}

export const getStaticProps: GetStaticProps<PageProps> = ({ params }) => {
  const locale = params?.locale;
  const serviceSlug = params?.serviceSlug as string;
  const subServiceSlug = params?.subServiceSlug as string;

  if (!isLocale(locale as string)) {
    return { notFound: true };
  }

  const match = findSubService(serviceSlug, subServiceSlug);
  if (!match) {
    return { notFound: true };
  }

  return {
    props: {
      locale: locale as Locale
    }
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = SUPPORTED_LOCALES.flatMap((locale) =>
    serviceCategories.flatMap((category) =>
      category.subServices.map((service) => ({
        params: { locale, serviceSlug: category.slug, subServiceSlug: service.slug }
      }))
    )
  );

  return { paths, fallback: false };
};
