import { useMemo } from 'react';
import { useLocale } from '../context/LocaleContext';
import { buildLocalePath } from '../utils/locale';

export const useLocalePath = () => {
  const locale = useLocale();
  return useMemo(() => (path = '/') => buildLocalePath(locale, path), [locale]);
};
