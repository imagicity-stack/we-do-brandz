import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import RefundPolicy from '../../src/pages/RefundPolicy';
import { isLocale, Locale, SUPPORTED_LOCALES } from '../../src/utils/locale';

type PageProps = { locale: Locale };

export default function RefundPolicyPage(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  return <RefundPolicy />;
}

export const getStaticProps: GetStaticProps<PageProps> = ({ params }) => {
  const locale = params?.locale;

  if (!isLocale(locale as string)) {
    return { notFound: true };
  }

  return {
    props: {
      locale: locale as Locale
    }
  };
};

export const getStaticPaths: GetStaticPaths = () => ({
  paths: SUPPORTED_LOCALES.map((locale) => ({ params: { locale } })),
  fallback: false
});
