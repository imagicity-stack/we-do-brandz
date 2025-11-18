import { createContext, ReactNode, useContext } from 'react';
import type { Locale } from '../utils/locale';

const LocaleContext = createContext<Locale>('in');

export const LocaleProvider = ({ value, children }: { value: Locale; children: ReactNode }) => (
  <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
);

export const useLocale = () => useContext(LocaleContext);

export default LocaleContext;
